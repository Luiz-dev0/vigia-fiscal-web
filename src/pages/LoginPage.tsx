import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Lock, Mail, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { useAuth } from '@/contexts/AuthContext';
import { authService } from '@/services/authService';
import type { ApiError } from '@/lib/api';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signIn } = useAuth();
  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await authService.login({ email, senha });
      signIn(response.token, response);
      navigate('/dashboard');
    } catch (err) {
      const apiErr = err as ApiError;
      setError(apiErr.message ?? 'Erro ao entrar. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-5xl w-full bg-white rounded-[40px] shadow-2xl shadow-blue-900/10 overflow-hidden flex flex-col md:flex-row min-h-[680px] border border-slate-100">

        {/* Lado esquerdo */}
        <div className="md:w-[45%] bg-vigia-navy p-14 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-vigia-blue rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-400 rounded-full blur-[120px]" />
          </div>

          <div className="space-y-10 relative z-10">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="p-2 bg-vigia-blue rounded-xl">
                <ShieldCheck className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-xl font-black tracking-tighter">Vigia Fiscal</h1>
            </Link>

            <div className="space-y-3">
              <h2 className="text-4xl font-black leading-tight tracking-tight">
                Sua fortaleza <span className="text-vigia-blue">digital</span> fiscal.
              </h2>
              <p className="text-slate-400 font-medium leading-relaxed">
                Monitore suas NF-es em tempo real com segurança de nível bancário.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { title: 'Consulta SEFAZ 24/7', desc: 'Sincronização automática a cada 5 minutos.' },
                { title: 'Alertas Inteligentes', desc: 'WhatsApp e Email no momento do evento.' },
                { title: 'Gestão Centralizada', desc: 'Todos os CNPJs em um único painel.' },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex gap-4 items-start bg-white/5 p-4 rounded-2xl border border-white/10"
                >
                  <CheckCircle2 className="w-5 h-5 text-vigia-blue mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm">{item.title}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 relative z-10">
            Vigia Fiscal © 2026 — Protocolo SSL 256-bit
          </p>
        </div>

        {/* Lado direito */}
        <div className="md:w-[55%] p-14 md:p-20 flex flex-col justify-center">
          <div className="max-w-sm mx-auto w-full space-y-10">
            <div className="space-y-2">
              <h3 className="text-3xl font-black text-slate-900 tracking-tight">
                Bem-vindo de volta
              </h3>
              <p className="text-slate-500 font-medium text-sm">
                Acesse seu painel de monitoramento fiscal.
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleLogin}>
              {error && (
                <div className="p-4 bg-red-50 text-red-600 text-xs font-bold rounded-2xl border border-red-100">
                  {error}
                </div>
              )}

              <Input
                label="E-mail"
                type="email"
                placeholder="voce@empresa.com.br"
                icon={<Mail className="w-4 h-4" />}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <div className="space-y-1">
                <div className="flex justify-between items-center px-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                    Senha
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-xs font-bold text-vigia-blue hover:underline"
                  >
                    Esqueceu?
                  </Link>
                </div>
                <Input
                  type="password"
                  placeholder="Sua senha"
                  icon={<Lock className="w-4 h-4" />}
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 group"
                loading={loading}
              >
                Entrar no Sistema
                {!loading && (
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                )}
              </Button>
            </form>

            <p className="text-center text-sm font-bold text-slate-500">
              Não tem conta?{' '}
              <Link to="/register" className="text-vigia-blue hover:underline">
                Criar conta grátis
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
