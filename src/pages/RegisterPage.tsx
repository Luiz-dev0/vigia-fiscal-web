// src/pages/RegisterPage.tsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Eye, EyeOff, Lock, Mail, Phone, ShieldCheck, User } from 'lucide-react';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { useAuth } from '@/contexts/AuthContext';
import { authService } from '@/services/authService';
import type { ApiError } from '@/lib/api';

export function RegisterPage() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [showSenha, setShowSenha] = useState(false);
  const [showConfirmarSenha, setShowConfirmarSenha] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [senhaError, setSenhaError] = useState('');
  const [aceitouTermos, setAceitouTermos] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    // valida senhas antes de qualquer chamada
    if (senha !== confirmarSenha) {
      setSenhaError('As senhas não coincidem.');
      return;
    }
    setSenhaError('');

    setLoading(true);
    setError('');
    try {
      const response = await authService.register({ nome, email, senha, whatsapp });
      signIn(response.token, response);
      navigate('/dashboard');
    } catch (err) {
      const apiErr = err as ApiError;
      setError(apiErr.message ?? 'Erro ao criar conta. Verifique os dados.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-5xl w-full bg-white rounded-[40px] shadow-2xl shadow-blue-900/10 overflow-hidden flex flex-col md:flex-row min-h-[700px] border border-slate-100">

        {/* Lado esquerdo — idêntico ao original */}
        <div className="md:w-[45%] bg-vigia-navy p-14 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-vigia-blue rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-400 rounded-full blur-[120px]" />
          </div>

          <div className="space-y-10 relative z-10">
            <Link to="/" className="flex items-center gap-3">
              <div className="p-2 bg-vigia-blue rounded-xl">
                <ShieldCheck className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-xl font-black tracking-tighter">Vigia Fiscal</h1>
            </Link>

            <div className="space-y-3">
              <h2 className="text-4xl font-black leading-tight tracking-tight">
                Domine sua rotina <span className="text-vigia-blue">fiscal</span>.
              </h2>
              <p className="text-slate-400 font-medium leading-relaxed">
                Monitore suas NF-es em tempo real com segurança e confiabilidade.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { title: 'Trial de 7 dias grátis', desc: 'Sem cartão de crédito necessário.' },
                { title: 'Segurança máxima', desc: 'Criptografia de ponta a ponta.' },
                { title: 'Suporte prioritário', desc: 'Time disponível para te ajudar.' },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex gap-4 items-start bg-white/5 p-4 rounded-2xl border border-white/10"
                >
                  <ShieldCheck className="w-5 h-5 text-vigia-blue mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm">{item.title}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 relative z-10">
            Vigia Fiscal © 2026 — LGPD Compliant
          </p>
        </div>

        {/* Lado direito */}
        <div className="md:w-[55%] p-14 md:p-20 flex flex-col justify-center">
          <div className="max-w-sm mx-auto w-full space-y-10">
            <div className="space-y-2">
              <h3 className="text-3xl font-black text-slate-900 tracking-tight">
                Criar sua conta
              </h3>
              <p className="text-slate-500 font-medium text-sm">
                7 dias grátis, sem cartão de crédito.
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleRegister}>
              {error && (
                <div className="p-4 bg-red-50 text-red-600 text-xs font-bold rounded-2xl border border-red-100">
                  {error}
                </div>
              )}

              {/* Nome */}
              <Input
                label="Nome completo"
                placeholder="Como devemos te chamar?"
                icon={<User className="w-4 h-4" />}
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />

              {/* E-mail */}
              <Input
                label="E-mail"
                type="email"
                placeholder="voce@empresa.com.br"
                icon={<Mail className="w-4 h-4" />}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              {/* Senha — linha própria com olhinho */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">
                  Senha
                </label>
                <div className="relative">
                  <Input
                    type={showSenha ? 'text' : 'password'}
                    placeholder="Mín. 8 caracteres"
                    icon={<Lock className="w-4 h-4" />}
                    value={senha}
                    onChange={(e) => {
                      setSenha(e.target.value);
                      if (senhaError) setSenhaError('');
                    }}
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowSenha((s) => !s)}
                    tabIndex={-1}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors"
                  >
                    {showSenha ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Confirmar senha — linha própria com olhinho */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">
                  Confirmar senha
                </label>
                <div className="relative">
                  <Input
                    type={showConfirmarSenha ? 'text' : 'password'}
                    placeholder="Repita a senha"
                    icon={<Lock className="w-4 h-4" />}
                    value={confirmarSenha}
                    onChange={(e) => {
                      setConfirmarSenha(e.target.value);
                      if (senhaError) setSenhaError('');
                    }}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmarSenha((s) => !s)}
                    tabIndex={-1}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors"
                  >
                    {showConfirmarSenha ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {senhaError && (
                  <p className="text-[11px] font-bold text-red-500 mt-0.5 pl-1">{senhaError}</p>
                )}
              </div>

              {/* WhatsApp — linha própria */}
              <Input
                label="WhatsApp"
                placeholder="5511999999999"
                icon={<Phone className="w-4 h-4" />}
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
              />

              {/* Termos */}
              <div className="flex items-start gap-3">
                <input
                  id="termos"
                  type="checkbox"
                  checked={aceitouTermos}
                  onChange={(e) => setAceitouTermos(e.target.checked)}
                  className="mt-1 w-4 h-4 accent-vigia-blue cursor-pointer shrink-0"
                  required
                />
                <label htmlFor="termos" className="text-xs font-medium text-slate-500 leading-relaxed">
                  Li e aceito os{' '}
                  <Link to="/termos" className="text-vigia-blue hover:underline font-bold">
                    Termos de Uso
                  </Link>{' '}
                  e a{' '}
                  <Link to="/privacidade" className="text-vigia-blue hover:underline font-bold">
                    Política de Privacidade
                  </Link>
                </label>
              </div>

              <Button type="submit" className="w-full h-12 group" loading={loading}>
                Criar conta e começar trial
                {!loading && (
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                )}
              </Button>

              <div className="flex items-center justify-center gap-2 py-2 px-4 bg-blue-50/50 rounded-2xl border border-blue-100/50">
                <ShieldCheck className="w-4 h-4 text-vigia-blue" />
                <span className="text-[10px] font-black text-vigia-blue uppercase tracking-widest">
                  Sem cartão de crédito necessário
                </span>
              </div>
            </form>

            <p className="text-center text-sm font-bold text-slate-500">
              Já tem conta?{' '}
              <Link to="/login" className="text-vigia-blue hover:underline">
                Entrar no sistema
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}