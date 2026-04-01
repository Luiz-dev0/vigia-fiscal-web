import React from 'react';
import { cn } from '../lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ className, padding = 'md', children, ...props }) => {
  const paddings = {
    none: '',
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={cn(
        'bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden',
        paddings[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
