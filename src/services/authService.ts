import api from './api';
import { LoginRequest, RegistroRequest, TokenResponse } from '../types';

export const authService = {
  async login(data: LoginRequest): Promise<TokenResponse> {
    const response = await api.post<TokenResponse>('/auth/entrar', data);
    return response.data;
  },
  async register(data: RegistroRequest): Promise<TokenResponse> {
    const response = await api.post<TokenResponse>('/auth/registrar', data);
    return response.data;
  },
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};
