'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEnquiryStore } from '@/store/useEnquiryStore';
import { useSendQuote, QuoteFormState } from '@/hooks/useSendQuote';
import { X, Send, Loader2 } from 'lucide-react';

export default function EnquiryModal() {
  const { isOpen, closeEnquiryModal, defaultServiceName } = useEnquiryStore();
  const { sendQuote, isSending } = useSendQuote();
  
  const [form, setForm] = useState<QuoteFormState>({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  // Re-sync default service when opened
  useEffect(() => {
    if (isOpen) {
      setForm((prev) => ({
        ...prev,
        service: defaultServiceName,
        message: defaultServiceName !== 'Other' && !defaultServiceName.includes('Engineering') 
          ? `I'm interested in the ${defaultServiceName}. Please provide more details.` 
          : '',
      }));
    }
  }, [isOpen, defaultServiceName]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const success = await sendQuote(form);
    if (success) {
      setTimeout(() => closeEnquiryModal(), 400);
    }
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeEnquiryModal();
    };
    if (isOpen) document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeEnquiryModal]);

  const inputCls = "w-full px-4 py-2.5 bg-gray-50 dark:bg-zinc-900 border border-gray-300 dark:border-zinc-800 rounded-xl text-gray-900 dark:text-zinc-200 placeholder-gray-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 text-sm transition-colors";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeEnquiryModal}
            className="absolute inset-0 bg-black/40 dark:bg-black/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-white/5 flex-shrink-0 bg-white dark:bg-zinc-950 sticky top-0 z-10">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Email Inquiry</h2>
              <button
                onClick={closeEnquiryModal}
                className="p-2 text-gray-400 hover:text-gray-600 dark:text-zinc-500 dark:hover:text-zinc-300 bg-gray-100 dark:bg-zinc-900 hover:bg-gray-200 dark:hover:bg-zinc-800 rounded-full transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Form Content */}
            <div className="p-6 overflow-y-auto custom-scrollbar">
              <form id="enquiry-form" onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-zinc-400 mb-1.5">Name</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} required className={inputCls} placeholder="John Doe" disabled={isSending} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-zinc-400 mb-1.5">Email</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} required className={inputCls} placeholder="john@example.com" disabled={isSending} />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-zinc-400 mb-1.5">Phone (optional)</label>
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} className={inputCls} placeholder="+1 234 567 8900" disabled={isSending} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-zinc-400 mb-1.5">Service / Product</label>
                  <input type="text" name="service" value={form.service} onChange={handleChange} required className={inputCls} placeholder="E.g. Smart Hub" disabled={isSending} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-zinc-400 mb-1.5">Message</label>
                  <textarea name="message" value={form.message} onChange={handleChange} required rows={4} className={`${inputCls} resize-none`} placeholder="How can we help you?" disabled={isSending} />
                </div>
              </form>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-100 dark:border-white/5 flex-shrink-0 bg-gray-50 dark:bg-zinc-950/50">
              <button
                form="enquiry-form"
                type="submit"
                disabled={isSending}
                className="w-full flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 disabled:bg-teal-500/50 text-white font-bold py-3.5 px-6 rounded-xl transition-colors active:scale-[0.98]"
              >
                {isSending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                <span>{isSending ? 'Sending...' : 'Send Inquiry'}</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
