import api from './api';
import { AssinaturaRequest, AssinaturaResponse, PlanoResponse } from '../types';

export const billingService = {
  async listarPlanos(): Promise<PlanoResponse[]> {
    const response = await api.get<PlanoResponse[]>('/billing/planos');
    return response.data;
  },
  async assinar(data: AssinaturaRequest): Promise<AssinaturaResponse> {
    const response = await api.post<AssinaturaResponse>('/billing/assinar', data);
    return response.data;
  },
  async cancelar(): Promise<void> {
    await api.delete('/billing/cancelar');
  },
};
