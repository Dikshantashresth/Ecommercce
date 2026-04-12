'use client';

import { Product } from '@/data/products';
import { MessageCircle, Mail, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEnquiryStore } from '@/store/useEnquiryStore';

export default function ProductCard({ product }: { product: Product }) {
  const router = useRouter();
  const openEnquiryModal = useEnquiryStore((s) => s.openEnquiryModal);

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(`https://wa.me/9779800000000?text=${encodeURIComponent(`Hi, I'm interested in the ${product.name}.`)}`, '_blank');
  };

  const handleEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openEnquiryModal(product.name);
  };

  const navigateToDetail = () => {
    router.push(`/product/${product.id}`);
  };

  return (
    <div 
      onClick={navigateToDetail}
      className="cursor-pointer group relative bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-white/5 overflow-hidden transition-transform duration-300 will-change-transform transform-gpu hover:scale-[1.02] hover:-translate-y-1 h-full flex flex-col shadow-sm dark:shadow-none"
    >
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none z-30" />

      {/* Image */}
      <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100 dark:bg-zinc-950 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-zinc-900 to-transparent z-10 opacity-40 dark:opacity-60" />
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover object-center transition-transform duration-300 ease-out will-change-transform transform-gpu group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 z-20">
          <span className="px-2.5 py-1 text-[11px] font-semibold bg-white/90 dark:bg-zinc-950/80 backdrop-blur-md text-gray-700 dark:text-zinc-300 rounded-full border border-gray-200 dark:border-zinc-800">
            {product.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col relative z-10">
        <h3 className="text-sm font-bold text-gray-900 dark:text-zinc-100 leading-tight line-clamp-1 mb-1.5 flex-1 p-1">
          {product.name}
        </h3>
        
        <p className="text-xs text-gray-500 dark:text-zinc-500 mb-4 line-clamp-2 px-1">
          {product.description}
        </p>

        <div className="mt-auto grid grid-cols-2 gap-2 pt-2 border-t border-gray-100 dark:border-zinc-800/50">
          <button
            onClick={handleWhatsApp}
            className="w-full flex items-center justify-center gap-1.5 bg-emerald-50 dark:bg-emerald-500/10 hover:bg-emerald-500 text-emerald-600 dark:text-emerald-400 hover:text-white py-2 rounded-xl text-xs font-semibold transition-colors active:scale-95 z-20"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            <span>WhatsApp</span>
          </button>
          <button
            onClick={handleEmail}
            className="w-full flex items-center justify-center gap-1.5 bg-gray-100 dark:bg-zinc-800 hover:bg-teal-500 text-gray-700 dark:text-zinc-300 hover:text-white py-2 rounded-xl text-xs font-semibold transition-colors active:scale-95 z-20"
          >
            <Mail className="h-3.5 w-3.5" />
            <span>Email</span>
          </button>
        </div>
      </div>
    </div>
  );
}
