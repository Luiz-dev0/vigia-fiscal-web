export type SubscriptionStatus =
  | 'ACTIVE'
  | 'TRIAL'
  | 'TRIAL_EXPIRED'
  | 'OVERDUE'
  | 'CANCELLED'
  | 'INCOMPLETE';

export interface AssinaturaRequest {
  plan: string;
}

// FIX #2: campo checkoutUrl adicionado — backend retorna a URL do Stripe Checkout
// para o usuário completar o pagamento após criar a assinatura.
export interface AssinaturaResponse {
  subscriptionId: string;
  status: SubscriptionStatus;
  plan: string;
  currentPeriodEnd: string;
  checkoutUrl: string | null;
}

export interface PlanoResponse {
  nome: string;
  preco: number;
  limiteCnpjs: number;
  descricao: string;
  priceId: string;
}

export interface StatusAssinaturaResponse {
  estado: SubscriptionStatus;
  plano: string | null;
  currentPeriodEnd: string | null;
  trialEndsAt: string | null;
  diasRestantes: number | null;
}
