import React, { useState } from 'react';
import { ShieldCheck, Mail, Lock, User, Phone, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { useAuth } from '@/contexts/AuthContext';

export const RegisterPage = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await authService.register({ nome, email, senha, whatsapp });
      signIn(response.token, response);
      navigate('/dashboard');
    } catch (err: unknown) {
      const apiErr = err as { message?: string };
      setError(apiErr.message ?? 'Erro ao criar conta. Verifique os dados informados.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <div className="max-w-6xl w-full bg-white rounded-[40px] shadow-2xl shadow-blue-900/10 overflow-hidden flex flex-col md:flex-row min-h-[800px] border border-slate-100">
        {/* Left Side - Info */}
        <div className="md:w-[45%] bg-vigia-navy p-16 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-vigia-blue rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-400 rounded-full blur-[120px]" />
          </div>

          <div className="space-y-12 relative z-10">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="p-2 bg-vigia-blue rounded-xl group-hover:scale-110 transition-transform duration-500">
                <ShieldCheck className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-black tracking-tighter">Vigia Fiscal</h1>
            </Link>
            
            <div className="space-y-4">
              <h2 className="text-5xl font-black leading-[1.1] tracking-tight">
                Domine sua rotina <span className="text-vigia-blue">fiscal</span>.
              </h2>
              <p className="text-slate-400 font-medium text-lg max-w-sm">
                Junte-se a milhares de empresas que automatizaram seu monitoramento SEFAZ.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { title: 'Segurança Máxima', desc: 'Criptografia de ponta a ponta para seus dados.' },
                { title: 'Trial de 14 Dias', desc: 'Comece agora sem precisar de cartão de crédito.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-5 items-start bg-white/5 backdrop-blur-sm p-5 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors duration-500">
                  <div className="mt-1 p-1.5 bg-vigia-blue/20 rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-vigia-blue" />
                  </div>
                  <div>
                    <h4 className="font-bold text-base">{item.title}</h4>
                    <p className="text-sm text-slate-400 mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative mt-4">
              <div className="absolute inset-0 bg-gradient-to-t from-vigia-navy via-transparent to-transparent z-10" />
              <img 
                src="https://picsum.photos/seed/vigia-security/600/400" 
                alt="Security Preview" 
                className="rounded-[32px] shadow-2xl border border-white/10 opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          <div className="pt-10 border-t border-white/10 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 relative z-10">
            <span>Certificado SSL Seguro</span>
            <div className="flex gap-1">
              <div className="w-1 h-1 bg-vigia-blue rounded-full animate-pulse" />
              <div className="w-1 h-1 bg-vigia-blue rounded-full animate-pulse delay-75" />
            </div>
            <span>Vigia Fiscal © 2026</span>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="md:w-[55%] p-16 md:p-24 flex flex-col justify-center bg-white relative">
          <div className="max-w-md mx-auto w-full space-y-12">
            <div className="space-y-3">
              <h3 className="text-4xl font-black text-slate-900 tracking-tight">Criar sua conta</h3>
              <p className="text-slate-500 font-medium">Comece seu trial gratuito de 14 dias hoje mesmo.</p>
            </div>

            <form className="space-y-6" onSubmit={handleRegister}>
              {error && (
                <div className="p-4 bg-red-50 text-red-600 text-xs font-bold rounded-2xl border border-red-100 animate-in slide-in-from-top-2 duration-300">
                  {error}
                </div>
              )}
              
              <div className="grid grid-cols-1 gap-6">
                <Input 
                  label="Nome Completo" 
                  placeholder="Como devemos te chamar?" 
                  icon={<User className="w-5 h-5" />}
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
                
                <Input 
                  label="E-mail Corporativo" 
                  placeholder="ex: voce@empresa.com.br" 
                  icon={<Mail className="w-5 h-5" />}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input 
                    label="WhatsApp" 
                    placeholder="(00) 00000-0000" 
                    icon={<Phone className="w-5 h-5" />}
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                  />
                  <Input 
                    label="Senha" 
                    type="password" 
                    placeholder="Mín. 8 caracteres" 
                    icon={<Lock className="w-5 h-5" />}
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-4 pt-4">
                <Button type="submit" className="w-full py-5 text-base group" disabled={loading}>
                  {loading ? 'Criando Acesso...' : 'Criar Conta e Começar Trial'}
                  {!loading && <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                </Button>
                
                <div className="flex items-center justify-center gap-2 py-2 px-4 bg-blue-50/50 rounded-2xl border border-blue-100/50">
                  <ShieldCheck className="w-4 h-4 text-vigia-blue" />
                  <span className="text-[10px] font-black text-vigia-blue uppercase tracking-widest">Sem cartão de crédito necessário</span>
                </div>
              </div>
            </form>

            <div className="text-center space-y-10">
              <p className="text-sm font-bold text-slate-500">
                Já possui uma fortaleza? <Link to="/login" className="text-vigia-blue hover:underline">Entrar no sistema</Link>
              </p>
              
              <div className="space-y-4">
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Empresas que confiam</p>
                <div className="flex justify-center gap-8 opacity-20 grayscale hover:opacity-40 transition-opacity duration-500">
                  <img src="https://picsum.photos/seed/l1/60/30" alt="Partner" className="h-6" referrerPolicy="no-referrer" />
                  <img src="https://picsum.photos/seed/l2/60/30" alt="Partner" className="h-6" referrerPolicy="no-referrer" />
                  <img src="https://picsum.photos/seed/l3/60/30" alt="Partner" className="h-6" referrerPolicy="no-referrer" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
