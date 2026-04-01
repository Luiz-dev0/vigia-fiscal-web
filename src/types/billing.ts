export type SubscriptionStatus =
  | 'ACTIVE'
  | 'TRIAL'
  | 'OVERDUE'
  | 'CANCELLED'
  | 'INCOMPLETE';

export interface AssinaturaRequest {
  plan: string;
}

export interface AssinaturaResponse {
  subscriptionId: string;
  status: SubscriptionStatus;
  plan: string;
  currentPeriodEnd: string;
}

export interface PlanoResponse {
  nome: string;
  preco: string;
  limiteCnpjs: number;
  descricao: string;
  priceId: string;
}
