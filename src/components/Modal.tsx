import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children, footer }: ModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-xl bg-white rounded-[40px] shadow-2xl shadow-blue-900/20 overflow-hidden border border-slate-100"
          >
            <div className="flex items-center justify-between px-10 py-8 border-b border-slate-50">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">{title}</h3>
              <Button variant="ghost" size="icon" onClick={onClose} className="rounded-2xl hover:bg-slate-50">
                <X className="w-6 h-6 text-slate-400" />
              </Button>
            </div>
            <div className="px-10 py-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
              {children}
            </div>
            {footer && (
              <div className="px-10 py-8 bg-slate-50/50 border-t border-slate-50 flex justify-end gap-4">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
