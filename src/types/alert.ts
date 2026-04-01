export type AlertEventType =
  | 'PRAZO_CANCELAMENTO'
  | 'NOTA_REJEITADA'
  | 'NOTA_CANCELADA'
  | 'NOTA_DENEGADA';

export type AlertChannel = 'WHATSAPP' | 'EMAIL';

export interface AlertRuleRequest {
  cnpjId?: string;
  eventType: AlertEventType;
  channel: AlertChannel;
  destination: string;
  minutesBefore: number;
}

export interface AlertRuleResponse {
  id: string;
  tenantId: string;
  cnpjId?: string;
  eventType: AlertEventType;
  channel: AlertChannel;
  destination: string;
  minutesBefore: number;
  active: boolean;
  createdAt: string;
}
