import React from 'react';
import { useToast } from '../../context/ToastContext';
import { CheckCircle2, AlertTriangle, Info, AlertOctagon, X } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-md w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => {
        let bgStyle = 'bg-slate-900/90 border-slate-700 text-slate-100';
        let IconComponent = Info;
        let iconColor = 'text-cyan-400';

        if (toast.type === 'success') {
          bgStyle = 'bg-slate-900/95 border-emerald-500/40 text-slate-100 shadow-emerald-950/40';
          IconComponent = CheckCircle2;
          iconColor = 'text-emerald-400';
        } else if (toast.type === 'warning') {
          bgStyle = 'bg-slate-900/95 border-amber-500/40 text-slate-100 shadow-amber-950/40';
          IconComponent = AlertTriangle;
          iconColor = 'text-amber-400';
        } else if (toast.type === 'emergency' || toast.type === 'error') {
          bgStyle = 'bg-slate-900/95 border-rose-500/50 text-slate-100 shadow-rose-950/50';
          IconComponent = AlertOctagon;
          iconColor = 'text-rose-400';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border backdrop-blur-xl shadow-2xl transition-all duration-300 transform translate-y-0 ${bgStyle}`}
          >
            <IconComponent className={`w-5 h-5 flex-shrink-0 mt-0.5 ${iconColor}`} />
            <div className="flex-1 text-sm leading-snug font-medium">
              {toast.message}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-200 transition-colors p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ToastContainer;
