import React, { useEffect, useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Lock, 
  Globe, 
  Zap, 
  Users, 
  FileJson, 
  Headphones,
  CreditCard,
  Clock,
  Calendar,
  XCircle
} from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { cn } from '../lib/utils';
import { billingService } from '../services/billingService';
import { PlanoResponse } from '../types';

export const SubscriptionPage = () => {
  const [plans, setPlans] = useState<PlanoResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlans = async () => {
      setLoading(true);
      try {
        const data = await billingService.listarPlanos();
        setPlans(data);
      } catch (error) {
        console.error('Erro ao buscar planos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const handleSubscribe = async (planId: string) => {
    setSubmitting(planId);
    try {
      // In a real app, this might redirect to a checkout page
      await billingService.assinar({ planId });
      alert('Assinatura iniciada com sucesso!');
    } catch (error) {
      console.error('Erro ao assinar plano:', error);
      alert('Erro ao processar assinatura. Tente novamente.');
    } finally {
      setSubmitting(null);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* Trial Banner */}
      <div className="bg-amber-50/50 border-2 border-amber-100 rounded-[32px] p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg shadow-amber-900/5">
        <div className="flex items-center gap-6 text-center md:text-left flex-col md:flex-row">
          <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 shadow-inner">
            <Clock className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h4 className="text-lg font-black text-amber-900 tracking-tight uppercase">Período de Teste Ativo</h4>
            <p className="text-sm text-amber-700 font-medium">Seu trial gratuito termina em <span className="font-black">7 dias</span>. Assine agora para manter o monitoramento.</p>
          </div>
        </div>
        <Button variant="ghost" className="w-full md:w-auto text-amber-700 font-black hover:bg-amber-100 rounded-2xl px-8">Ver Planos Disponíveis</Button>
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Minha Assinatura</h1>
        <p className="text-slate-500 font-medium">Gerencie seu plano e visualize os detalhes do seu faturamento.</p>
      </div>

      {/* Current Plan Card */}
      <Card className="p-10 border-none shadow-xl shadow-slate-200/50 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-blue-100 transition-colors duration-500" />
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 relative z-10">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Plano Atual</span>
              <span className="px-3 py-1 bg-blue-50 text-vigia-blue text-[10px] font-black uppercase tracking-widest rounded-lg border border-blue-100/50 shadow-sm">Trial Gratuito</span>
            </div>
            <div className="space-y-2">
              <h2 className="text-4xl font-black text-slate-900 tracking-tight">Plano Básico</h2>
              <p className="text-lg text-slate-400 font-medium italic">Acesso completo por 7 dias sem custo.</p>
            </div>
            <div className="flex items-center gap-2 text-sm font-bold text-slate-500 bg-slate-50 inline-flex px-4 py-2 rounded-2xl border border-slate-100">
              <Calendar className="w-4 h-4 text-slate-300" />
              Expira em <span className="text-slate-900 ml-1">14 de Agosto, 2024</span>
            </div>
          </div>
          <Button variant="secondary" className="w-full md:w-auto px-10 h-14 shadow-lg shadow-slate-900/5">Gerenciar Assinatura</Button>
        </div>
      </Card>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 pt-10">
        {loading ? (
          <div className="col-span-3 flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-100 border-t-vigia-blue mx-auto"></div>
          </div>
        ) : plans.map((plan) => (
          <Card 
            key={plan.id} 
            className={cn(
              'relative flex flex-col p-10 space-y-10 transition-all duration-500 border-none shadow-xl shadow-slate-200/50 group',
              plan.nome === 'Pro' && 'ring-4 ring-vigia-blue/10 scale-105 z-10 shadow-2xl shadow-blue-900/10'
            )}
            padding="none"
          >
            {plan.nome === 'Pro' && (
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-vigia-navy to-vigia-blue text-white text-[10px] font-black uppercase tracking-[0.2em] px-6 py-2 rounded-full shadow-lg shadow-blue-900/20">
                Mais Popular
              </div>
            )}
            
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase">{plan.nome}</h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">{plan.descricao}</p>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-black text-slate-300 uppercase tracking-widest">R$</span>
                <span className="text-5xl font-black text-slate-900 tracking-tighter">
                  {new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 0 }).format(plan.valorMensal)}
                </span>
                <span className="text-sm font-bold text-slate-400">/mês</span>
              </div>
            </div>

            <div className="flex-1 space-y-5">
              <div className="flex gap-4 items-start group/item">
                <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-vigia-blue group-hover/item:scale-110 transition-transform">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="text-sm text-slate-700 font-bold">Monitoramento de {plan.limiteCnpjs} CNPJs</span>
              </div>
              <div className="flex gap-4 items-start group/item">
                <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-vigia-blue group-hover/item:scale-110 transition-transform">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="text-sm text-slate-700 font-bold">Alertas via E-mail e WhatsApp</span>
              </div>
              <div className="flex gap-4 items-start group/item">
                <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-vigia-blue group-hover/item:scale-110 transition-transform">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="text-sm text-slate-700 font-bold">Suporte Prioritário 24/7</span>
              </div>
            </div>

            <Button 
              variant={plan.nome === 'Pro' ? 'primary' : 'outline'} 
              className={cn(
                'w-full h-16 font-black uppercase tracking-widest text-xs shadow-lg transition-all duration-300',
                plan.nome === 'Pro' ? 'shadow-blue-900/20 hover:scale-[1.02]' : 'border-2 shadow-slate-900/5'
              )}
              onClick={() => handleSubscribe(plan.id)}
              loading={submitting === plan.id}
            >
              Assinar Plano {plan.nome}
            </Button>
          </Card>
        ))}
      </div>

      {/* Trust Badges */}
      <div className="pt-20 text-center space-y-12">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-1 bg-slate-100 rounded-full" />
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Segurança de nível bancário com criptografia AES-256</p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-12 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-700">
          <div className="flex items-center gap-3 group cursor-default">
            <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-vigia-blue transition-colors">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <span className="text-xs font-black uppercase tracking-widest">LGPD Compliant</span>
          </div>
          <div className="flex items-center gap-3 group cursor-default">
            <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-vigia-blue transition-colors">
              <Lock className="w-6 h-6" />
            </div>
            <span className="text-xs font-black uppercase tracking-widest">SSL Secure</span>
          </div>
          <div className="flex items-center gap-3 group cursor-default">
            <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-vigia-blue transition-colors">
              <CreditCard className="w-6 h-6" />
            </div>
            <span className="text-xs font-black uppercase tracking-widest">PCI DSS</span>
          </div>
        </div>

        <p className="text-xs text-slate-400 font-bold">
          Dúvidas sobre os planos? <a href="#" className="text-vigia-blue font-black hover:underline underline-offset-4">Fale com um consultor</a> ou acesse nossa <a href="#" className="text-vigia-blue font-black hover:underline underline-offset-4">Central de Ajuda</a>.
        </p>
      </div>
    </div>
  );
};
