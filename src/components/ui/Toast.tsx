'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertTriangle, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning';

interface ToastData {
  id: number;
  message: string;
  type: ToastType;
}

let toastId = 0;

// Global toast function — call from anywhere
export function showToast(message: string, type: ToastType = 'success') {
  document.dispatchEvent(
    new CustomEvent('show-toast', { detail: { id: ++toastId, message, type } })
  );
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const { id, message, type } = (e as CustomEvent).detail;
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => removeToast(id), 3500);
    };
    document.addEventListener('show-toast', handler);
    return () => document.removeEventListener('show-toast', handler);
  }, [removeToast]);

  const icons = {
    success: <CheckCircle className="h-5 w-5 text-emerald-400 flex-shrink-0" />,
    error: <XCircle className="h-5 w-5 text-red-400 flex-shrink-0" />,
    warning: <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0" />,
  };

  const borders = {
    success: 'border-emerald-500/30',
    error: 'border-red-500/30',
    warning: 'border-amber-500/30',
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 max-w-sm">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 60, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className={`flex items-center gap-3 bg-zinc-900/95 backdrop-blur-lg px-4 py-3 rounded-xl border ${borders[toast.type]} shadow-2xl`}
          >
            {icons[toast.type]}
            <span className="text-sm text-zinc-200 flex-1">{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
