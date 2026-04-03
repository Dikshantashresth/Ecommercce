'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/store/useCartStore';
import { showToast } from '@/components/ui/Toast';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import Image from 'next/image';

export default function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { items, updateQuantity, removeItem, getTotal } = useCartStore();

  useEffect(() => {
    setIsClient(true);
    const handleToggle = () => setIsOpen((prev) => !prev);
    document.addEventListener('toggle-cart', handleToggle);
    return () => document.removeEventListener('toggle-cart', handleToggle);
  }, []);

  if (!isClient) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
            className="fixed top-0 right-0 w-full sm:w-[400px] h-full bg-white dark:bg-zinc-950 border-l border-gray-200 dark:border-white/10 z-50 flex flex-col will-change-transform transform-gpu"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200 dark:border-white/10 flex justify-between items-center bg-gray-50 dark:bg-zinc-900/50">
              <div className="flex items-center space-x-3">
                <ShoppingBag className="text-teal-500 h-6 w-6" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your Cart</h2>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
                <X className="h-5 w-5 text-gray-500 dark:text-zinc-400" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto w-full p-6 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 dark:text-zinc-500">
                  <ShoppingBag className="h-16 w-16 mb-4 opacity-30" />
                  <p>Your cart is empty.</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 bg-gray-50 dark:bg-zinc-900/50 p-3 rounded-2xl border border-gray-200 dark:border-white/5">
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 dark:bg-zinc-950 flex-shrink-0 relative">
                      <Image src={item.image} alt={item.name} fill sizes="80px" className="object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold text-sm line-clamp-1 pr-2 text-gray-900 dark:text-white">{item.name}</h4>
                        <button onClick={() => { removeItem(item.id); showToast(`${item.name} removed`, 'error'); }} className="text-gray-400 dark:text-zinc-500 hover:text-red-500 transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="text-teal-600 dark:text-teal-400 font-bold text-sm">${(item.price * item.quantity).toFixed(2)}</div>
                      <div className="flex items-center space-x-3 mt-1 bg-white dark:bg-zinc-950 w-fit rounded-lg p-1 border border-gray-200 dark:border-zinc-800">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-md transition-colors">
                          <Minus className="h-3 w-3 text-gray-500 dark:text-zinc-400" />
                        </button>
                        <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-md transition-colors">
                          <Plus className="h-3 w-3 text-gray-500 dark:text-zinc-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-zinc-900/80">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-500 dark:text-zinc-400 font-medium">Subtotal</span>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">${getTotal().toFixed(2)}</span>
                </div>
                <button className="w-full py-4 bg-teal-500 hover:bg-teal-400 text-white font-bold rounded-xl transition-colors">Checkout (Demo)</button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
