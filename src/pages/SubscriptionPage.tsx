import { useEffect, useState } from 'react';
import {
  CheckCircle2,
  Clock,
  CreditCard,
  Lock,
  ShieldCheck,
  AlertTriangle,
  CalendarCheck,
  Zap,
} from 'lucide-react';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { billingService } from '@/services/billingService';
import { cn } from '@/lib/utils';
import type { PlanoResponse, StatusAssinaturaResponse } from '@/types';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatarPreco(preco: number) {
  return preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function formatarData(iso: string | null) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

function nomePlanoLegivel(plano: string | null) {
  const map: Record<string, string> = {
    BASICO: 'Básico',
    PRO: 'Pro',
    ENTERPRISE: 'Enterprise',
  };
  return plano ? (map[plano.toUpperCase()] ?? plano) : '—';
}

// FIX #1: Mapa explícito de nome → chave sem acento.
// Evita "Básico".toUpperCase() → "BÁSICO" que falhava no lookup do StripeProperties.
const PLANO_KEY_MAP: Record<string, string> = {
  'Básico': 'BASICO',
  'Pro': 'PRO',
  'Enterprise': 'ENTERPRISE',
};

// ─── Banner de status no topo ─────────────────────────────────────────────────

function StatusBanner({ status }: { status: StatusAssinaturaResponse }) {
  if (status.estado === 'TRIAL') {
    const dias = status.diasRestantes ?? 0;
    return (
      <div className="bg-amber-50 border-2 border-amber-100 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="font-black text-amber-900 text-sm uppercase tracking-tight">
              Período de teste gratuito ativo
            </p>
            <p className="text-sm text-amber-700 font-medium mt-0.5">
              {dias <= 1
                ? 'Último dia de trial! Assine agora para não perder o acesso.'
                : `Seu trial termina em ${dias} dias. Assine para continuar.`}
            </p>
          </div>
        </div>
        <p className="text-xs text-amber-600 font-bold shrink-0">
          Expira em {formatarData(status.trialEndsAt)}
        </p>
      </div>
    );
  }

  if (status.estado === 'TRIAL_EXPIRED') {
    return (
      <div className="bg-red-50 border-2 border-red-100 rounded-2xl p-5 flex items-center gap-4">
        <div className="w-11 h-11 bg-red-100 rounded-xl flex items-center justify-center text-red-600 shrink-0">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div>
          <p className="font-black text-red-900 text-sm uppercase tracking-tight">
            Período de teste encerrado
          </p>
          <p className="text-sm text-red-700 font-medium mt-0.5">
            Seu período de teste encerrou. Escolha um plano abaixo para continuar monitorando suas NF-es.
          </p>
        </div>
      </div>
    );
  }

  if (status.estado === 'OVERDUE') {
    return (
      <div className="bg-orange-50 border-2 border-orange-100 rounded-2xl p-5 flex items-center gap-4">
        <div className="w-11 h-11 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 shrink-0">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div>
          <p className="font-black text-orange-900 text-sm uppercase tracking-tight">
            Pagamento pendente
          </p>
          <p className="text-sm text-orange-700 font-medium mt-0.5">
            Houve um problema com o seu pagamento. Atualize seu método de pagamento para não perder o acesso ao monitoramento.
          </p>
        </div>
      </div>
    );
  }

  if (status.estado === 'ACTIVE') {
    return (
      <div className="bg-green-50 border-2 border-green-100 rounded-2xl p-5 flex items-center gap-4">
        <div className="w-11 h-11 bg-green-100 rounded-xl flex items-center justify-center text-green-600 shrink-0">
          <CalendarCheck className="w-5 h-5" />
        </div>
        <div>
          <p className="font-black text-green-900 text-sm uppercase tracking-tight">
            Assinatura ativa — Plano {nomePlanoLegivel(status.plano)}
          </p>
          <p className="text-sm text-green-700 font-medium mt-0.5">
            Próxima cobrança em {formatarData(status.currentPeriodEnd)}.
          </p>
        </div>
      </div>
    );
  }

  return null;
}

// ─── Card de detalhes da assinatura ativa ─────────────────────────────────────

function AssinaturaAtiva({
  status,
  onCancelar,
  cancelando,
}: {
  status: StatusAssinaturaResponse;
  onCancelar: () => void;
  cancelando: boolean;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Minha Assinatura</h1>
        <p className="text-slate-500 font-medium mt-1 text-sm">
          Gerencie seu plano e informações de cobrança.
        </p>
      </div>

      <Card className="p-8 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-[#0056b3]">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Plano atual</p>
              <p className="text-2xl font-black text-slate-900">{nomePlanoLegivel(status.plano)}</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-black uppercase tracking-widest border border-green-100">
            Ativo
          </span>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 pt-2">
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Próxima cobrança</p>
            <p className="text-sm font-bold text-slate-800">{formatarData(status.currentPeriodEnd)}</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Status</p>
            <p className="text-sm font-bold text-green-700">Em dia</p>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            className="sm:ml-auto text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 font-bold"
            onClick={onCancelar}
            loading={cancelando}
          >
            Cancelar assinatura
          </Button>
        </div>
      </Card>
    </div>
  );
}

// ─── Grade de planos (trial / expirado / cancelado) ───────────────────────────

function GradePlanos({
  plans,
  submitting,
  onSubscribe,
}: {
  plans: PlanoResponse[];
  submitting: string | null;
  onSubscribe: (priceId: string) => void;
}) {
  const featuresMap: Record<string, string[]> = {
    básico: [
      '1 CNPJ monitorado',
      'Manifestação do Destinatário',
      'Alertas por E-mail',
      'Suporte via Ticket',
      'Histórico de 3 meses',
    ],
    pro: [
      'Até 5 CNPJs',
      'Manifestação do Destinatário',
      'Alertas WhatsApp + E-mail',
      'Suporte Prioritário',
      'Histórico de 12 meses',
    ],
    enterprise: [
      'CNPJs Ilimitados',
      'Manifestação do Destinatário',
      'Alertas WhatsApp + E-mail',
      'Suporte Prioritário',
      'Histórico Ilimitado',
    ],
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Escolha seu Plano</h1>
        <p className="text-slate-500 font-medium mt-1 text-sm">
          Sem fidelidade. Mude ou cancele quando quiser.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6 items-stretch">
        {plans.map((plan) => {
          const isPro = plan.nome.toLowerCase() === 'pro';
          const features = featuresMap[plan.nome.toLowerCase()] ?? [];
          const cnpjLabel =
            plan.limiteCnpjs === 0
              ? 'CNPJs ilimitados'
              : `${plan.limiteCnpjs} CNPJ${plan.limiteCnpjs > 1 ? 's' : ''}`;

          return (
            <div
              key={plan.priceId}
              className={cn(
                'flex flex-col rounded-[2rem] border p-8 bg-white transition-all duration-300',
                isPro
                  ? 'border-[#0056b3] shadow-2xl shadow-blue-900/10'
                  : 'border-slate-200 shadow-sm hover:shadow-lg'
              )}
            >
              <div className="h-7 flex items-center justify-center mb-2">
                {isPro && (
                  <span className="bg-[#0056b3] text-white text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full shadow-md whitespace-nowrap">
                    Mais Popular
                  </span>
                )}
              </div>

              <div className="space-y-3 mb-6">
                <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">
                  {plan.nome}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">{plan.descricao}</p>
                <div className="flex items-baseline gap-1 pt-2">
                  <span className="text-sm font-bold text-slate-400">R$</span>
                  <span className="text-4xl font-black text-slate-900">{plan.preco}</span>
                  <span className="text-sm font-bold text-slate-400">/mês</span>
                </div>
              </div>

              <div className="flex-1 space-y-3 mb-8">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#0056b3] shrink-0" />
                  <span className="text-sm font-bold text-slate-700">{cnpjLabel}</span>
                </div>
                {features.slice(1).map((f) => (
                  <div key={f} className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#0056b3] shrink-0" />
                    <span className="text-sm font-medium text-slate-600">{f}</span>
                  </div>
                ))}
              </div>

              <Button
                variant={isPro ? 'primary' : 'outline'}
                className="w-full h-12 font-bold rounded-xl"
                onClick={() => onSubscribe(plan.priceId)}
                loading={submitting === plan.priceId}
              >
                Assinar {plan.nome}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Página principal ─────────────────────────────────────────────────────────

export function SubscriptionPage() {
  const [status, setStatus] = useState<StatusAssinaturaResponse | null>(null);
  const [plans, setPlans] = useState<PlanoResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState<string | null>(null);
  const [cancelando, setCancelando] = useState(false);
  const [modalCancelar, setModalCancelar] = useState(false);
  const [erro, setErro] = useState('');

  useEffect(() => {
    Promise.all([billingService.getStatus(), billingService.listarPlanos()])
      .then(([s, p]) => {
        setStatus(s);
        setPlans(p);
      })
      .catch(() => console.error('Erro ao carregar dados de assinatura'))
      .finally(() => setLoading(false));
  }, []);

  // FIX #1: usa PLANO_KEY_MAP para garantir chave sem acento (ex: "BASICO" e não "BÁSICO").
  // FIX #2: redireciona para checkoutUrl do Stripe após criar a assinatura.
  // FIX #3: console.error no catch para debug visível no DevTools.
  async function handleSubscribe(priceId: string) {
    setSubmitting(priceId);
    try {
      const plano = plans.find((p) => p.priceId === priceId);
      if (!plano) throw new Error('Plano não encontrado');

      const planKey = PLANO_KEY_MAP[plano.nome] ?? plano.nome.toUpperCase();
      console.log('[handleSubscribe] planKey enviado:', planKey);

      const response = await billingService.assinar({ plan: planKey });
      console.log('[handleSubscribe] resposta:', response);

      // FIX #2: redireciona para o Stripe Checkout se a URL for retornada
      if (response.checkoutUrl) {
        window.location.href = response.checkoutUrl;
        return; // interrompe — o usuário saiu da página
      }

      // Fallback: sem checkout (ex: ambiente de teste sem Stripe real)
      const novoStatus = await billingService.getStatus();
      setStatus(novoStatus);
    } catch (err) {
      // FIX #3: erro agora sempre aparece no console para facilitar debug
      console.error('[handleSubscribe] erro capturado:', err);
      alert('Erro ao processar assinatura. Tente novamente.');
    } finally {
      setSubmitting(null);
    }
  }

  async function handleCancelar() {
    setCancelando(true);
    setErro('');
    try {
      await billingService.cancelar();
      const novoStatus = await billingService.getStatus();
      setStatus(novoStatus);
      setModalCancelar(false);
    } catch (err) {
      console.error('[handleCancelar] erro capturado:', err);
      setErro('Erro ao cancelar assinatura. Tente novamente.');
    } finally {
      setCancelando(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-slate-100 border-t-[#0056b3]" />
      </div>
    );
  }

  const mostrarPlanos =
    !status ||
    status.estado === 'TRIAL' ||
    status.estado === 'TRIAL_EXPIRED' ||
    status.estado === 'CANCELLED' ||
    status.estado === 'INCOMPLETE';

  return (
    <div className="space-y-8 w-full">
      {status && <StatusBanner status={status} />}

      {erro && (
        <div className="bg-red-50 border-2 border-red-100 rounded-2xl p-6 text-red-700 font-bold">
          {erro}
        </div>
      )}

      {status?.estado === 'ACTIVE' && (
        <AssinaturaAtiva
          status={status}
          onCancelar={() => setModalCancelar(true)}
          cancelando={cancelando}
        />
      )}

      {mostrarPlanos && (
        <GradePlanos
          plans={plans}
          submitting={submitting}
          onSubscribe={handleSubscribe}
        />
      )}

      <div className="flex flex-wrap justify-center gap-10 pt-4 opacity-40">
        {[
          { icon: ShieldCheck, label: 'LGPD Compliant' },
          { icon: Lock, label: 'SSL Secure' },
          { icon: CreditCard, label: 'PCI DSS' },
        ].map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-2">
            <Icon className="w-4 h-4 text-slate-400" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Modal de confirmação de cancelamento */}
      {modalCancelar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-[32px] shadow-2xl shadow-slate-900/20 p-10 max-w-sm w-full mx-4 border border-slate-100">
            <div className="flex items-center justify-center w-16 h-16 rounded-[20px] bg-amber-50 mx-auto mb-5">
              <AlertTriangle size={26} className="text-amber-500" />
            </div>
            <h3 className="text-[13px] font-black uppercase tracking-[0.2em] text-slate-900 text-center mb-3">
              Cancelar Assinatura
            </h3>
            <p className="text-sm font-medium text-slate-500 text-center mb-8 leading-relaxed">
              Tem certeza que deseja cancelar sua assinatura? Você continuará com acesso até o fim do período pago.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={handleCancelar}
                disabled={cancelando}
                className="w-full py-4 rounded-[20px] bg-amber-500 text-white text-[11px] font-black uppercase tracking-widest hover:bg-amber-600 transition-all disabled:opacity-60"
              >
                {cancelando ? 'Cancelando...' : 'Sim, cancelar'}
              </button>
              <button
                onClick={() => setModalCancelar(false)}
                className="w-full py-4 rounded-[20px] border-2 border-slate-100 text-slate-500 text-[11px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all"
              >
                Manter Assinatura
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
