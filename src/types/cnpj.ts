export interface CnpjRequest {
  cnpj: string;
  razaoSocial?: string;
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
  uf: string;
  active: boolean;
  lastConsultedAt: string;
}
