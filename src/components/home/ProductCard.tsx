'use client';

import { Product } from '@/data/products';
import { useCartStore } from '@/store/useCartStore';
import { useAuthStore } from '@/store/useAuthStore';
import { ShoppingCart } from 'lucide-react';
import { showToast } from '@/components/ui/Toast';
import Link from 'next/link';
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
      <div className="group relative bg-zinc-900 rounded-2xl border border-white/5 overflow-hidden transition-all hover:bg-zinc-800/80 hover:shadow-[0_0_40px_rgba(20,184,166,0.07)] hover:-translate-y-1 h-full flex flex-col">
        {/* Image */}
        <div className="aspect-[4/3] w-full overflow-hidden bg-zinc-950 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent z-10 opacity-60" />
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
          />
          <div className="absolute top-3 left-3 z-20">
            <span className="px-2.5 py-1 text-[11px] font-semibold bg-zinc-950/80 backdrop-blur-md text-zinc-300 rounded-full border border-zinc-800">
              {product.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-1.5">
            <h3 className="text-sm font-bold text-zinc-100 leading-tight line-clamp-1 flex-1 pr-2">
              {product.name}
            </h3>
            <span className="text-teal-400 font-bold text-sm whitespace-nowrap">
              ${product.price.toFixed(2)}
            </span>
          </div>
          <p className="text-xs text-zinc-500 mb-4 line-clamp-2 flex-1">
            {product.description}
          </p>

          <button
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center gap-2 bg-zinc-800 hover:bg-teal-500 text-zinc-300 hover:text-black py-2 rounded-xl text-sm font-semibold transition-all active:scale-95"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </Link>
  );
}
