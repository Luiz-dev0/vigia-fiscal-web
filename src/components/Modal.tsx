import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/Button';
import { cn } from '@/lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export const Modal = ({ isOpen, onClose, title, children, footer, size = 'md' }: ModalProps) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-xl',
    lg: 'max-w-2xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={cn(
          'relative w-full bg-white rounded-[32px] shadow-2xl shadow-blue-900/20 overflow-hidden border border-slate-100',
          sizes[size]
        )}
      >
        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-50">
          <h3 className="text-xl font-black text-slate-900 tracking-tight">
            {title}
          </h3>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-xl">
            <X className="w-5 h-5 text-slate-400" />
          </Button>
        </div>
        <div className="px-8 py-6 max-h-[65vh] overflow-y-auto">
          {children}
        </div>
        {footer && (
          <div className="px-8 py-6 bg-slate-50/50 border-t border-slate-50 flex justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
