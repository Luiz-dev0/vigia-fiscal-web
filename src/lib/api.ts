import axios, { AxiosError } from 'axios';
import { env } from '@/env';

export interface ApiError {
  message: string;
  status: number;
}

const api = axios.create({
  baseURL: env.apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('vf_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('vf_token');
      localStorage.removeItem('vf_user');
      window.location.href = '/login';
    }
    const apiError: ApiError = {
      message:
        (error.response?.data as { message?: string })?.message ??
        error.message ??
        'Erro inesperado',
      status: error.response?.status ?? 0,
    };
    return Promise.reject(apiError);
  }
);

export default api;
