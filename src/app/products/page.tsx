'use client';

import { useState, useMemo } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductGrid from '@/components/home/ProductGrid';
import { mockProducts } from '@/data/products';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';

type SortOption = 'latest' | 'rating' | 'name-asc';

const sortLabels: Record<SortOption, string> = {
  latest: 'Latest',
  rating: 'Top Rated',
  'name-asc': 'Name: A → Z',
};

const categories = ['All', ...Array.from(new Set(mockProducts.map((p) => p.category)))];

export default function ProductsPage() {
  const [sortBy, setSortBy] = useState<SortOption>('latest');
  const [category, setCategory] = useState('All');
  const [sortOpen, setSortOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = [...mockProducts];
    if (category !== 'All') list = list.filter((p) => p.category === category);
    switch (sortBy) {
      case 'rating': list.sort((a, b) => b.rating - a.rating); break;
      case 'name-asc': list.sort((a, b) => a.name.localeCompare(b.name)); break;
    }
    return list;
  }, [sortBy, category]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-10">
        <div className="mb-10">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-gray-900 dark:from-white to-gray-400 dark:to-zinc-400 bg-clip-text text-transparent mb-2">All Products</h1>
          <p className="text-gray-500 dark:text-zinc-500">Browse our full collection of smart automation technology.</p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setCategory(cat)} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${category === cat ? 'bg-teal-500 text-white' : 'bg-gray-100 dark:bg-zinc-900 text-gray-600 dark:text-zinc-400 border border-gray-200 dark:border-zinc-800 hover:border-gray-400 dark:hover:border-zinc-600 hover:text-gray-900 dark:hover:text-zinc-200'}`}>
                {cat}
              </button>
            ))}
          </div>

          <div className="relative">
            <button onClick={() => setSortOpen(!sortOpen)} className="flex items-center gap-2 bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-gray-700 dark:text-zinc-300 hover:border-gray-400 dark:hover:border-zinc-600 transition-colors">
              <SlidersHorizontal className="h-4 w-4 text-gray-400 dark:text-zinc-500" />
              <span>{sortLabels[sortBy]}</span>
              <ChevronDown className={`h-4 w-4 text-gray-400 dark:text-zinc-500 transition-transform ${sortOpen ? 'rotate-180' : ''}`} />
            </button>
            {sortOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setSortOpen(false)} />
                <div className="absolute right-0 top-12 z-50 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl shadow-xl dark:shadow-2xl overflow-hidden min-w-[200px]">
                  {(Object.keys(sortLabels) as SortOption[]).map((key) => (
                    <button key={key} onClick={() => { setSortBy(key); setSortOpen(false); }} className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${sortBy === key ? 'bg-teal-500/10 text-teal-600 dark:text-teal-400' : 'text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800'}`}>
                      {sortLabels[key]}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <p className="text-sm text-gray-500 dark:text-zinc-500 mb-4">
          Showing {filtered.length} product{filtered.length !== 1 ? 's' : ''}{category !== 'All' && ` in ${category}`}
        </p>

        <ProductGrid products={filtered} />
      </main>
      <Footer />
    </div>
  );
}
