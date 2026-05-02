export interface ManifestacaoRequest {
  tipoEvento: string;
  senha: string;
}

export interface ManifestacaoResponse {
  id: string;
  tipoEvento: string;
  descricaoEvento: string;
  protocolo: string;
  status: string;
  cStat: string;
  xMotivo: string;
  enviadoEm: string;
}