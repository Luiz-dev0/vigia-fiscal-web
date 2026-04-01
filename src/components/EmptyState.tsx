import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/Button';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-20 gap-4', className)}>
      <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 shadow-inner">
        {icon}
      </div>
      <div className="text-center space-y-1">
        <p className="text-sm font-black text-slate-400 uppercase tracking-widest">
          {title}
        </p>
        {description && (
          <p className="text-xs text-slate-300 font-bold">{description}</p>
        )}
      </div>
      {action && (
        <Button onClick={action.onClick} size="sm" className="mt-2">
          {action.label}
        </Button>
      )}
    </div>
  );
}
