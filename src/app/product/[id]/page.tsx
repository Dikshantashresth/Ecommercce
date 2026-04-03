'use client';

import { use, useState, useEffect } from 'react';
import { mockProducts } from '@/data/products';
import { useCartStore } from '@/store/useCartStore';
import { useAuthStore } from '@/store/useAuthStore';
import { showToast } from '@/components/ui/Toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ReviewSection from '@/components/product/ReviewSection';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Minus, Plus, Star, ArrowLeft, Package, Zap, Wifi, Ruler, Weight, Box, ChevronRight } from 'lucide-react';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = mockProducts.find((p) => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const user = useAuthStore((s) => s.user);
  const router = useRouter();

  useEffect(() => { setIsClient(true); }, []);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center py-24">
          <Package className="h-16 w-16 text-gray-300 dark:text-zinc-700 mb-4" />
          <h1 className="text-2xl font-bold text-gray-700 dark:text-zinc-300 mb-2">Product not found</h1>
          <p className="text-gray-500 dark:text-zinc-500 mb-6">The product you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/" className="bg-teal-500 hover:bg-teal-400 text-white font-semibold px-6 py-2.5 rounded-full transition-colors">Go Home</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!isClient) return;
    if (!user) { showToast('Please sign in to add items to cart', 'warning'); router.push('/login'); return; }
    addItem(product, quantity);
    showToast(`${quantity}× ${product.name} added to cart`, 'success');
  };

  const specIcons: Record<string, React.ReactNode> = { weight: <Weight className="h-4 w-4" />, dimensions: <Ruler className="h-4 w-4" />, power: <Zap className="h-4 w-4" />, connectivity: <Wifi className="h-4 w-4" />, material: <Box className="h-4 w-4" /> };
  const specLabels: Record<string, string> = { weight: 'Weight', dimensions: 'Dimensions', power: 'Power', connectivity: 'Connectivity', material: 'Material' };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-zinc-500 mb-6">
          <Link href="/" className="hover:text-teal-500 transition-colors">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-gray-800 dark:text-zinc-300 truncate max-w-[200px]">{product.name}</span>
        </div>

        <button onClick={() => router.back()} className="flex items-center gap-2 text-sm text-gray-500 dark:text-zinc-400 hover:text-teal-500 mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4" />Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            <div className="aspect-square bg-gray-100 dark:bg-zinc-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-white/5 mb-4 relative">
              <Image src={product.images[selectedImage]} alt={product.name} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button key={i} onClick={() => setSelectedImage(i)} className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors relative ${selectedImage === i ? 'border-teal-500' : 'border-gray-200 dark:border-zinc-800 hover:border-gray-400 dark:hover:border-zinc-600 opacity-60 hover:opacity-100'}`}>
                    <Image src={img} alt="" fill sizes="80px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <span className="inline-flex w-fit px-3 py-1 text-xs font-semibold bg-gray-100 dark:bg-zinc-900 text-gray-500 dark:text-zinc-400 rounded-full border border-gray-200 dark:border-zinc-800 mb-4">{product.category}</span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2">{product.name}</h1>
            <p className="text-gray-500 dark:text-zinc-400 text-base mb-6 italic">&ldquo;{product.tagline}&rdquo;</p>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < Math.round(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-300 dark:text-zinc-700'}`} />
                ))}
              </div>
              <span className="text-sm text-gray-500 dark:text-zinc-400">{product.rating} · {product.reviewsCount} reviews</span>
            </div>

            <div className="mb-8">
              <span className="text-4xl font-extrabold text-teal-600 dark:text-teal-400">${product.price.toFixed(2)}</span>
              <span className="text-sm ml-3">{product.stock > 0 ? <span className="text-emerald-500">In Stock ({product.stock})</span> : <span className="text-red-500">Out of Stock</span>}</span>
            </div>

            <p className="text-gray-600 dark:text-zinc-400 leading-relaxed mb-8">{product.description}</p>

            <div className="flex items-center gap-4 mb-10">
              <div className="flex items-center bg-gray-100 dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 overflow-hidden">
                <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="px-4 py-3 text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-zinc-800 transition-colors"><Minus className="h-4 w-4" /></button>
                <span className="px-5 py-3 text-base font-bold min-w-[50px] text-center border-x border-gray-200 dark:border-zinc-800">{quantity}</span>
                <button onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))} className="px-4 py-3 text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-zinc-800 transition-colors"><Plus className="h-4 w-4" /></button>
              </div>
              <button onClick={handleAddToCart} disabled={product.stock === 0} className="flex-1 flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 disabled:bg-gray-200 dark:disabled:bg-zinc-800 disabled:text-gray-400 dark:disabled:text-zinc-600 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition-colors active:scale-[0.98]">
                <ShoppingCart className="h-5 w-5" /><span>Add to Cart — ${(product.price * quantity).toFixed(2)}</span>
              </button>
            </div>

            <div className="mb-8">
              <h3 className="text-sm font-bold text-gray-700 dark:text-zinc-300 uppercase tracking-wider mb-3">Key Features</h3>
              <div className="grid grid-cols-2 gap-2">
                {product.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 bg-gray-50 dark:bg-zinc-900/60 rounded-lg px-3 py-2.5 border border-gray-200 dark:border-white/5 text-sm text-gray-700 dark:text-zinc-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-500 flex-shrink-0" />{f}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-700 dark:text-zinc-300 uppercase tracking-wider mb-3">Specifications</h3>
              <div className="bg-gray-50 dark:bg-zinc-900/60 rounded-xl border border-gray-200 dark:border-white/5 divide-y divide-gray-200 dark:divide-zinc-800/50">
                {Object.entries(product.specs).map(([key, value]) => value && (
                  <div key={key} className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-2 text-gray-500 dark:text-zinc-500">{specIcons[key]}<span className="text-sm">{specLabels[key]}</span></div>
                    <span className="text-sm text-gray-800 dark:text-zinc-200 font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <ReviewSection productId={id} />
      </main>
      <Footer />
    </div>
  );
}
