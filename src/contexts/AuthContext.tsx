import React, { createContext, useContext, useEffect, useState } from 'react';
import type { TokenResponse } from '@/types';

interface AuthContextData {
  user: TokenResponse | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (token: string, user: TokenResponse) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<TokenResponse | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = sessionStorage.getItem('vf_token');
    const storedUser = sessionStorage.getItem('vf_user');

    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser) as TokenResponse);
      } catch {
        sessionStorage.removeItem('vf_token');
        sessionStorage.removeItem('vf_user');
      }
    }

    setIsLoading(false);
  }, []);

  function signIn(newToken: string, newUser: TokenResponse) {
    sessionStorage.setItem('vf_token', newToken);
    sessionStorage.setItem('vf_user', JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  }

  function signOut() {
    sessionStorage.removeItem('vf_token');
    sessionStorage.removeItem('vf_user');
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        isLoading,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
}
