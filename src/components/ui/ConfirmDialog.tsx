import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: 'danger' | 'warning' | 'info';
}

const variantStyles = {
  danger: {
    confirmBtn: 'bg-vermilion-600 hover:bg-vermilion-700 text-white border-vermilion-600',
    icon: 'text-vermilion-500',
  },
  warning: {
    confirmBtn: 'bg-bronze-500 hover:bg-bronze-600 text-white border-bronze-500',
    icon: 'text-bronze-500',
  },
  info: {
    confirmBtn: 'bg-ink-500 hover:bg-ink-600 text-white border-ink-500',
    icon: 'text-ink-500',
  },
};

export default function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmText = '确认删除',
  cancelText = '取消',
  onConfirm,
  onCancel,
  variant = 'danger',
}: ConfirmDialogProps) {
  const handleEsc = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onCancel();
      }
    },
    [isOpen, onCancel]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [handleEsc]);

  const styles = variantStyles[variant];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onCancel}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative bg-white rounded-lg shadow-elegant-lg max-w-md w-full mx-4 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-display text-lg font-semibold text-ink-700">{title}</h3>
                <button
                  onClick={onCancel}
                  className="p-1 text-ink-400 hover:text-ink-600 transition-colors rounded-sm"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-ink-500 leading-relaxed mb-6">{message}</p>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={onCancel}
                  className="px-4 py-2 text-sm font-medium text-ink-600 border border-cream-300 rounded-sm hover:bg-cream-100 transition-all duration-200"
                >
                  {cancelText}
                </button>
                <button
                  onClick={onConfirm}
                  className={`px-4 py-2 text-sm font-medium border rounded-sm transition-all duration-200 ${styles.confirmBtn}`}
                >
                  {confirmText}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
