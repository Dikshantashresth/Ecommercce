'use client';

import { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import HeroCarousel from '@/components/home/HeroCarousel';
import ProductGrid from '@/components/home/ProductGrid';
import { mockProducts } from '@/data/products';

export default function Home() {
  useEffect(() => {
    const handleScroll = () => {
      document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
    };
    document.addEventListener('scroll-to-products', handleScroll);
    return () => document.removeEventListener('scroll-to-products', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-20">
        <HeroCarousel />

        <div className="mt-16 sm:mt-24" id="products-section">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent mb-2">
            Latest Innovations
          </h2>
          <ProductGrid products={mockProducts} />
        </div>
      </main>

      <footer className="border-t border-white/5 bg-zinc-950 py-10 text-center text-zinc-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Inovate. MVP Simulation Environment.</p>
      </footer>
    </div>
  );
}
