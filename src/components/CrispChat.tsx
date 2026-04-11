import { useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
 
declare global {
  interface Window {
    $crisp: unknown[]
    CRISP_WEBSITE_ID: string
  }
}
 
const CRISP_WEBSITE_ID = '18ba135b-f954-46f3-9cc0-504fffe6899b'
 
export function CrispChat() {
  const { user, isAuthenticated } = useAuth()
 
  // Injeta o script do Crisp uma única vez
  useEffect(() => {
    window.$crisp = []
    window.CRISP_WEBSITE_ID = CRISP_WEBSITE_ID
 
    const script = document.createElement('script')
    script.src = 'https://client.crisp.chat/l.js'
    script.async = true
    document.head.appendChild(script)
 
    return () => {
      document.head.removeChild(script)
      delete (window as unknown as Record<string, unknown>).$crisp
      delete (window as unknown as Record<string, unknown>).CRISP_WEBSITE_ID
    }
  }, [])
 
  // Identifica o usuário logado no Crisp
  useEffect(() => {
    if (!window.$crisp) return
 
    if (isAuthenticated && user) {
      window.$crisp.push(['set', 'user:email', [user.email]])
      window.$crisp.push(['set', 'user:nickname', [user.nome]])
    } else {
      // Usuário deslogou — limpa a sessão do Crisp
      window.$crisp.push(['do', 'session:reset'])
    }
  }, [isAuthenticated, user])
 
  return null
}
