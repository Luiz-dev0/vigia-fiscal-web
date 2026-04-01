import { useEffect, useState } from 'react';
import { CheckCircle2, Clock, CreditCard, Lock, ShieldCheck } from 'lucide-react';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { billingService } from '@/services/billingService';
import { cn } from '@/lib/utils';
import type { PlanoResponse } from '@/types';

export function SubscriptionPage() {
  const [plans, setPlans] = useState<PlanoResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState<string | null>(null);

  useEffect(() => {
    billingService.listarPlanos()
      .then(setPlans)
      .catch(() => console.error('Erro ao carregar planos'))
      .finally(() => setLoading(false));
  }, []);

  async function handleSubscribe(priceId: string) {
    setSubmitting(priceId);
    try {
      await billingService.assinar({ plan: priceId });
      alert('Assinatura iniciada com sucesso!');
    } catch {
      alert('Erro ao processar assinatura. Tente novamente.');
    } finally {
      setSubmitting(null);
    }
  }

  return (
    <div className="space-y-8">
      {/* Banner Trial */}
      <div className="bg-amber-50 border-2 border-amber-100 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-black text-amber-900 uppercase tracking-tight">Período de Teste Ativo</h4>
            <p className="text-sm text-amber-700 font-medium mt-0.5">
              Seu trial gratuito termina em <strong>7 dias</strong>. Assine para continuar monitorando.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Minha Assinatura</h1>
        <p className="text-slate-500 font-medium mt-1 text-sm">
          Escolha o plano ideal para o seu volume de monitoramento.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-100 border-t-vigia-blue" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {plans.map((plan) => {
            const isPro = plan.nome.toLowerCase() === 'pro';
            return (
              <Card
                key={plan.priceId}
                className={cn(
                  'flex flex-col relative',
                  isPro && 'ring-2 ring-vigia-blue shadow-xl shadow-blue-900/10 scale-[1.02]'
                )}
              >
                {isPro && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-vigia-blue text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                    Mais Popular
                  </div>
                )}

                <div className="space-y-4 mb-6">
                  <h3 className="text-xl font-black text-slate-900 uppercase">{plan.nome}</h3>
                  <p className="text-sm text-slate-500 font-medium">{plan.descricao}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm font-black text-slate-400">R$</span>
                    <span className="text-4xl font-black text-slate-900">{plan.preco}</span>
                    <span className="text-sm font-bold text-slate-400">/mês</span>
                  </div>
                </div>

                <div className="flex-1 space-y-3 mb-8">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-vigia-blue shrink-0" />
                    <span className="text-sm font-bold text-slate-700">
                      {plan.limiteCnpjs === 0 ? 'CNPJs ilimitados' : `${plan.limiteCnpjs} CNPJ${plan.limiteCnpjs > 1 ? 's' : ''}`}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-vigia-blue shrink-0" />
                    <span className="text-sm font-bold text-slate-700">Alertas WhatsApp + E-mail</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-vigia-blue shrink-0" />
                    <span className="text-sm font-bold text-slate-700">Suporte prioritário</span>
                  </div>
                </div>

                <Button
                  variant={isPro ? 'primary' : 'outline'}
                  className="w-full h-12"
                  onClick={() => handleSubscribe(plan.priceId)}
                  loading={submitting === plan.priceId}
                >
                  Assinar {plan.nome}
                </Button>
              </Card>
            );
          })}
        </div>
      )}

      <div className="flex flex-wrap justify-center gap-10 pt-8 opacity-40">
        {[
          { icon: ShieldCheck, label: 'LGPD Compliant' },
          { icon: Lock, label: 'SSL Secure' },
          { icon: CreditCard, label: 'PCI DSS' },
        ].map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-2">
            <Icon className="w-5 h-5 text-slate-400" />
            <span className="text-xs font-black uppercase tracking-widest text-slate-400">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
