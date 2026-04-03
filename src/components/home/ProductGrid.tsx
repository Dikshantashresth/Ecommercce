'use client';

import { Product } from '@/data/products';
import ProductCard from './ProductCard';

export default function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="py-20 text-center bg-zinc-900/30 rounded-3xl border border-white/5 mt-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-800 mb-4">
          <span className="text-2xl">🔍</span>
        </div>
        <h3 className="text-2xl font-bold text-zinc-300">No innovations found.</h3>
        <p className="text-zinc-500 mt-2">Try adjusting your search criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
