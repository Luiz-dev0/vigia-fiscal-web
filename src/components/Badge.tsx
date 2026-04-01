import { cn } from '@/lib/utils';
import type { NfeStatus } from '@/types';

const statusConfig: Record<NfeStatus, { label: string; className: string }> = {
  AUTORIZADA: {
    label: 'Autorizada',
    className: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  },
  CANCELADA: {
    label: 'Cancelada',
    className: 'bg-red-50 text-red-700 border-red-100',
  },
  REJEITADA: {
    label: 'Rejeitada',
    className: 'bg-red-50 text-red-700 border-red-100',
  },
  DENEGADA: {
    label: 'Denegada',
    className: 'bg-orange-50 text-orange-700 border-orange-100',
  },
  PENDENTE: {
    label: 'Pendente',
    className: 'bg-amber-50 text-amber-700 border-amber-100',
  },
  INUTILIZADA: {
    label: 'Inutilizada',
    className: 'bg-slate-100 text-slate-600 border-slate-200',
  },
  ERRO_PROCESSAMENTO: {
    label: 'Erro',
    className: 'bg-red-100 text-red-800 border-red-200',
  },
};

interface NfeStatusBadgeProps {
  status: NfeStatus;
  className?: string;
}

export function NfeStatusBadge({ status, className }: NfeStatusBadgeProps) {
  const config = statusConfig[status] ?? {
    label: status,
    className: 'bg-slate-100 text-slate-600 border-slate-200',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border',
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
