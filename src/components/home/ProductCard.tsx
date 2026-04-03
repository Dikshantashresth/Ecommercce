'use client';

import { Product } from '@/data/products';
import { useCartStore } from '@/store/useCartStore';
import { useAuthStore } from '@/store/useAuthStore';
import { ShoppingCart } from 'lucide-react';
import { showToast } from '@/components/ui/Toast';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      showToast('Please sign in to add items to cart', 'warning');
      router.push('/login');
      return;
    }

    addItem(product);
    showToast(`${product.name} added to cart`, 'success');
  };

  return (
    <Link href={`/product/${product.id}`}>
      <div className="group relative bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-white/5 overflow-hidden transition-transform duration-300 will-change-transform transform-gpu hover:scale-[1.02] hover:-translate-y-1 h-full flex flex-col shadow-sm dark:shadow-none">
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
          <div className="flex justify-between items-start mb-1.5">
            <h3 className="text-sm font-bold text-gray-900 dark:text-zinc-100 leading-tight line-clamp-1 flex-1 pr-2">
              {product.name}
            </h3>
            <span className="text-teal-600 dark:text-teal-400 font-bold text-sm whitespace-nowrap">
              ${product.price.toFixed(2)}
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-zinc-500 mb-4 line-clamp-2 flex-1">
            {product.description}
          </p>

          <button
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center gap-2 bg-gray-100 dark:bg-zinc-800 hover:bg-teal-500 text-gray-700 dark:text-zinc-300 hover:text-white py-2 rounded-xl text-sm font-semibold transition-colors active:scale-95"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </Link>
  );
}
