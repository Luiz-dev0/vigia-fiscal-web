import React from 'react';
import { cn } from '../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants = {
      primary: 'bg-vigia-blue text-white hover:bg-blue-700 shadow-lg shadow-blue-100 active:scale-[0.98]',
      secondary: 'bg-blue-50 text-vigia-blue hover:bg-blue-100 active:scale-[0.98]',
      outline: 'border-2 border-slate-100 bg-transparent hover:bg-slate-50 text-slate-600 hover:border-slate-200 active:scale-[0.98]',
      ghost: 'bg-transparent hover:bg-slate-50 text-slate-500 hover:text-slate-900 active:scale-[0.98]',
      danger: 'bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-100 active:scale-[0.98]',
    };

    const sizes = {
      sm: 'px-4 py-2 text-xs font-bold uppercase tracking-wider',
      md: 'px-6 py-3 text-sm font-bold',
      lg: 'px-8 py-4 text-base font-bold',
      icon: 'p-2.5',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-2xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-vigia-blue/10 disabled:opacity-50 disabled:pointer-events-none',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
