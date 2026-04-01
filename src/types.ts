export type NfeStatus = 'PENDENTE' | 'AUTORIZADA' | 'CANCELADA' | 'DENEGADA' | 'REJEITADA' | 'INUTILIZADA' | 'ERRO_PROCESSAMENTO';

export interface NfeResponse {
  id: string;
  chaveAcesso: string;
  numero: string;
  serie: string;
  dataEmissao: string;
  dataAutorizacao?: string;
  valorTotal: number;
  status: NfeStatus;
  emitenteCnpj: string;
  emitenteNome: string;
  emitenteUf?: string;
  destinatarioCnpj: string;
  destinatarioNome: string;
  destinatarioUf?: string;
  ultimoEvento?: string;
  cnpjId: string;
  modelo?: string;
  versao?: string;
  naturezaOperacao?: string;
  protocolo?: string;
  criadoEm: string;
  atualizadoEm: string;
}

export interface CnpjRequest {
  cnpj: string;
  razaoSocial: string;
  nomeFantasia?: string;
  ie?: string;
  uf: string;
  emailContato?: string;
}

export interface CnpjResponse {
  id: string;
  cnpj: string;
  razaoSocial: string;
  nomeFantasia: string;
  ie?: string;
  uf: string;
  active: boolean;
  lastConsultedAt: string;
}

export interface AssinaturaRequest {
  planId: string;
}

export interface AssinaturaResponse {
  subscriptionId: string;
  status: 'ACTIVE' | 'TRIAL' | 'OVERDUE' | 'CANCELLED' | 'INCOMPLETE';
  plan: string;
  currentPeriodEnd: string;
}

export interface RegistroRequest {
  nome: string;
  email: string;
  senha: string;
  whatsapp?: string;
}

export interface TokenResponse {
  token: string;
  tipo: string;
  nome: string;
  email: string;
}

export interface LoginRequest {
  email: string;
  senha: string;
}

export type EventType = 'CANCELAMENTO' | 'REJEICAO' | 'DENEGADA';
export type AlertChannel = 'WHATSAPP' | 'EMAIL';

export interface AlertRuleRequest {
  cnpjId: string;
  tipoEvento: EventType;
  canalNotificacao: AlertChannel;
  destino: string;
  antecedenciaMinutos: number;
}

export interface AlertRuleResponse {
  id: string;
  cnpjId: string;
  tipoEvento: EventType;
  canalNotificacao: AlertChannel;
  destino: string;
  antecedenciaMinutos: number;
  ativo: boolean;
  criadoEm: string;
}

export interface PlanoResponse {
  id: string;
  nome: string;
  valorMensal: number;
  limiteCnpjs: number;
  descricao: string;
}
