import api from './api';
import { NfeResponse } from '../types';

export const nfeService = {
  async listar(cnpjId?: string): Promise<NfeResponse[]> {
    const response = await api.get<NfeResponse[]>('/nfes', {
      params: { cnpjId },
    });
    return response.data;
  },
  async buscarPorId(id: string): Promise<NfeResponse> {
    const response = await api.get<NfeResponse>(`/nfes/${id}`);
    return response.data;
  },
  async sincronizar(cnpjId: string): Promise<NfeResponse[]> {
    const response = await api.post<NfeResponse[]>(`/nfes/sincronizar/${cnpjId}`);
    return response.data;
  },
};
