import api from '@/lib/api';
import { ManifestacaoResponse } from '../types';

export const manifestacaoService = {
  async manifestar(
    nfeId: string,
    tipoEvento: string,
    senha: string
  ): Promise<ManifestacaoResponse> {
    const response = await api.post<ManifestacaoResponse>(`/manifestacoes/${nfeId}`, {
      tipoEvento,
      senha,
    });
    return response.data;
  },

  async listar(nfeId: string): Promise<ManifestacaoResponse[]> {
    const response = await api.get<ManifestacaoResponse[]>(`/manifestacoes/${nfeId}`);
    return response.data;
  },
};