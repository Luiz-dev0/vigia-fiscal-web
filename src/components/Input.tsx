import React from 'react';
import { cn } from '../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, icon, error, ...props }, ref) => {
    return (
      <div className="space-y-2 w-full">
        {label && <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">{label}</label>}
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              'w-full rounded-2xl border-2 border-slate-50 bg-slate-50/50 px-4 py-3 text-sm font-medium transition-all duration-300 focus:border-vigia-blue/20 focus:bg-white focus:outline-none focus:ring-4 focus:ring-vigia-blue/5 disabled:opacity-50 placeholder:text-slate-300',
              icon && 'pl-12',
              error && 'border-red-100 bg-red-50/30 focus:border-red-200 focus:ring-red-100/20',
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="text-xs font-bold text-red-500 ml-1">{error}</p>}
      </div>
    );
  }
);
