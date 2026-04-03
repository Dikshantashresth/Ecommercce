'use client';

import { use, useState, useEffect } from 'react';
import { mockProducts } from '@/data/products';
import { useCartStore } from '@/store/useCartStore';
import { useAuthStore } from '@/store/useAuthStore';
import { showToast } from '@/components/ui/Toast';
import Navbar from '@/components/layout/Navbar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShoppingCart,
  Minus,
  Plus,
  Star,
  ArrowLeft,
  Package,
  Zap,
  Wifi,
  Ruler,
  Weight,
  Box,
  ChevronRight,
} from 'lucide-react';

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const product = mockProducts.find((p) => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const user = useAuthStore((s) => s.user);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center py-24">
          <Package className="h-16 w-16 text-zinc-700 mb-4" />
          <h1 className="text-2xl font-bold text-zinc-300 mb-2">Product not found</h1>
          <p className="text-zinc-500 mb-6">
            The product you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/"
            className="bg-teal-500 hover:bg-teal-400 text-black font-semibold px-6 py-2.5 rounded-full transition-all"
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!isClient) return;

    if (!user) {
      showToast('Please sign in to add items to cart', 'warning');
      router.push('/login');
      return;
    }

    addItem(product, quantity);
    showToast(`${quantity}× ${product.name} added to cart`, 'success');
  };

  const specIcons: Record<string, React.ReactNode> = {
    weight: <Weight className="h-4 w-4" />,
    dimensions: <Ruler className="h-4 w-4" />,
    power: <Zap className="h-4 w-4" />,
    connectivity: <Wifi className="h-4 w-4" />,
    material: <Box className="h-4 w-4" />,
  };

  const specLabels: Record<string, string> = {
    weight: 'Weight',
    dimensions: 'Dimensions',
    power: 'Power',
    connectivity: 'Connectivity',
    material: 'Material',
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-zinc-500 mb-6">
          <Link href="/" className="hover:text-teal-400 transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-zinc-300 truncate max-w-[200px]">
            {product.name}
          </span>
        </div>

        {/* Back */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-zinc-400 hover:text-teal-400 mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* ── Left: Images ── */}
          <div>
            <div className="aspect-square bg-zinc-900 rounded-2xl overflow-hidden border border-white/5 mb-4">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === i
                        ? 'border-teal-500 shadow-[0_0_12px_rgba(20,184,166,0.3)]'
                        : 'border-zinc-800 hover:border-zinc-600 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Right: Info ── */}
          <div className="flex flex-col">
            <span className="inline-flex w-fit px-3 py-1 text-xs font-semibold bg-zinc-900 text-zinc-400 rounded-full border border-zinc-800 mb-4">
              {product.category}
            </span>

            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-2">
              {product.name}
            </h1>

            <p className="text-zinc-400 text-base mb-6 italic">
              &ldquo;{product.tagline}&rdquo;
            </p>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.round(product.rating)
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-zinc-700'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-zinc-400">
                {product.rating} · {product.reviewsCount} reviews
              </span>
            </div>

            {/* Price */}
            <div className="mb-8">
              <span className="text-4xl font-extrabold text-teal-400">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-sm ml-3">
                {product.stock > 0 ? (
                  <span className="text-emerald-400">In Stock ({product.stock})</span>
                ) : (
                  <span className="text-red-400">Out of Stock</span>
                )}
              </span>
            </div>

            {/* Description */}
            <p className="text-zinc-400 leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-4 mb-10">
              <div className="flex items-center bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-5 py-3 text-base font-bold text-white min-w-[50px] text-center border-x border-zinc-800">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  className="px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 disabled:bg-zinc-800 disabled:text-zinc-600 disabled:cursor-not-allowed text-black font-bold py-3.5 rounded-xl transition-all active:scale-[0.98]"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Add to Cart — ${(product.price * quantity).toFixed(2)}</span>
              </button>
            </div>

            {/* Features */}
            <div className="mb-8">
              <h3 className="text-sm font-bold text-zinc-300 uppercase tracking-wider mb-3">
                Key Features
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {product.features.map((f, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 bg-zinc-900/60 rounded-lg px-3 py-2.5 border border-white/5 text-sm text-zinc-300"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-500 flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </div>

            {/* Specifications */}
            <div>
              <h3 className="text-sm font-bold text-zinc-300 uppercase tracking-wider mb-3">
                Specifications
              </h3>
              <div className="bg-zinc-900/60 rounded-xl border border-white/5 divide-y divide-zinc-800/50">
                {Object.entries(product.specs).map(
                  ([key, value]) =>
                    value && (
                      <div key={key} className="flex items-center justify-between px-4 py-3">
                        <div className="flex items-center gap-2 text-zinc-500">
                          {specIcons[key]}
                          <span className="text-sm">{specLabels[key]}</span>
                        </div>
                        <span className="text-sm text-zinc-200 font-medium">{value}</span>
                      </div>
                    )
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-white/5 bg-zinc-950 py-10 text-center text-zinc-500 text-sm mt-12">
        <p>&copy; {new Date().getFullYear()} Inovate. MVP Simulation Environment.</p>
      </footer>
    </div>
  );
}
