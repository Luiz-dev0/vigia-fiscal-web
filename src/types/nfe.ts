export type NfeStatus =
  | 'PENDENTE'
  | 'AUTORIZADA'
  | 'CANCELADA'
  | 'DENEGADA'
  | 'REJEITADA'
  | 'INUTILIZADA'
  | 'ERRO_PROCESSAMENTO';

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
  destinatarioCnpj: string;
  destinatarioNome: string;
  ultimoEvento?: string;
  cnpjId: string;
  criadoEm: string;
  atualizadoEm: string;
  statusManifestacao: string | null;
}