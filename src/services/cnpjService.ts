import api from '@/lib/api';
import type { CnpjRequest, CnpjResponse } from '@/types';

export const cnpjService = {
  async listar(): Promise<CnpjResponse[]> {
    const response = await api.get<CnpjResponse[]>('/cnpjs');
    return response.data;
  },

  async cadastrar(data: CnpjRequest): Promise<CnpjResponse> {
    const response = await api.post<CnpjResponse>('/cnpjs', data);
    return response.data;
  },

  async buscar(id: string): Promise<CnpjResponse> {
    const response = await api.get<CnpjResponse>(`/cnpjs/${id}`);
    return response.data;
  },

  async remover(id: string): Promise<void> {
    await api.delete(`/cnpjs/${id}`);
  },
};
