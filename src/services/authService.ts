import api from '@/lib/api';
import type { LoginRequest, RegistroRequest, TokenResponse } from '@/types';

export const authService = {
  async login(data: LoginRequest): Promise<TokenResponse> {
    const response = await api.post<TokenResponse>('/auth/entrar', data);
    return response.data;
  },

  async register(data: RegistroRequest): Promise<TokenResponse> {
    const response = await api.post<TokenResponse>('/auth/registrar', data);
    return response.data;
  },

  logout(): void {
    sessionStorage.removeItem('vf_token');
    sessionStorage.removeItem('vf_user');
  },
};
