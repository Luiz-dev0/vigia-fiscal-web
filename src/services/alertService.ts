import api from './api';
import { AlertRuleRequest, AlertRuleResponse } from '../types';

export const alertService = {
  async listar(): Promise<AlertRuleResponse[]> {
    const response = await api.get<AlertRuleResponse[]>('/alertas');
    return response.data;
  },
  async criar(data: AlertRuleRequest): Promise<AlertRuleResponse> {
    const response = await api.post<AlertRuleResponse>('/alertas', data);
    return response.data;
  },
  async buscar(id: string): Promise<AlertRuleResponse> {
    const response = await api.get<AlertRuleResponse>(`/alertas/${id}`);
    return response.data;
  },
  async remover(id: string): Promise<void> {
    await api.delete(`/alertas/${id}`);
  },
};
