import React from 'react';
import { CheckCircle2, ExternalLink, Info } from 'lucide-react';

interface ToastProps {
  message: string | null;
  type?: 'success' | 'info';
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success' }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-neutral-900/95 text-white border border-white/20 shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-3 duration-300">
      {type === 'success' ? (
        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
      ) : (
        <Info className="w-4 h-4 text-sky-400 shrink-0" />
      )}
      <span className="text-xs font-medium tracking-wide whitespace-nowrap">{message}</span>
    </div>
  );
};
