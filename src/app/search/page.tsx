'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductGrid from '@/components/home/ProductGrid';
import { mockProducts } from '@/data/products';
import { SearchX } from 'lucide-react';
import Link from 'next/link';

function SearchResults() {
  const searchParams = useSearchParams();
  const q = searchParams.get('q') || '';

  const results = mockProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(q.toLowerCase()) ||
      p.category.toLowerCase().includes(q.toLowerCase()) ||
      p.description.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-10">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-zinc-500 mb-8">
          <Link href="/" className="hover:text-teal-500 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-gray-800 dark:text-zinc-300">Search</span>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Results for{' '}
            <span className="bg-gradient-to-r from-teal-500 to-emerald-400 bg-clip-text text-transparent">&ldquo;{q}&rdquo;</span>
          </h1>
          <p className="text-gray-500 dark:text-zinc-500 mt-2">{results.length} product{results.length !== 1 ? 's' : ''} found</p>
        </div>

        {results.length > 0 ? (
          <ProductGrid products={results} />
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 rounded-2xl bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-white/5 flex items-center justify-center mb-6">
              <SearchX className="h-10 w-10 text-gray-400 dark:text-zinc-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-700 dark:text-zinc-300 mb-2">No results found</h2>
            <p className="text-gray-500 dark:text-zinc-500 max-w-md mb-6">We couldn&apos;t find any products matching &ldquo;{q}&rdquo;. Try searching with different keywords.</p>
            <Link href="/" className="bg-teal-500 hover:bg-teal-400 text-white font-semibold px-6 py-2.5 rounded-full transition-colors">Browse All Products</Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" /></div>}>
      <SearchResults />
    </Suspense>
  );
}
