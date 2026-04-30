import api from '@/lib/api';
import type { CertificadoResponse } from '../types';

export const certificadoService = {

  async upload(cnpjId: string, pfxFile: File, senha: string): Promise<CertificadoResponse> {
    const formData = new FormData();
    formData.append('arquivo', pfxFile);
    formData.append('senha', senha);

    const response = await api.post<CertificadoResponse>(
      `/certificados/${cnpjId}`,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
    return response.data;
  },

  async buscar(cnpjId: string): Promise<CertificadoResponse> {
    const response = await api.get<CertificadoResponse>(`/certificados/${cnpjId}`);
    return response.data;
  },

  async remover(cnpjId: string): Promise<void> {
    await api.delete(`/certificados/${cnpjId}`);
  },
};