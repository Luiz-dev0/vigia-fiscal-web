import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('pt-BR');
}

export function formatDateTime(dateString: string): string {
  return new Date(dateString).toLocaleString('pt-BR');
}

export function formatCnpj(cnpj: string): string {
  const digits = cnpj.replace(/\D/g, '');
  return digits.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    '$1.$2.$3/$4-$5'
  );
}

export function truncateChave(chave: string): string {
  if (chave.length <= 12) return chave;
  return `${chave.substring(0, 8)}...${chave.substring(chave.length - 4)}`;
}
