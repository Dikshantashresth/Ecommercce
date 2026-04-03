'use client';

import { Search, ShoppingCart, User, LogOut } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Navbar() {
  const [isClient, setIsClient] = useState(false);
  const cartCount = useCartStore((state) => state.getItemCount());
  const { user, logout } = useAuthStore();
  const [query, setQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-lg bg-zinc-950/80 border-b border-white/5 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-extrabold bg-gradient-to-r from-teal-400 to-emerald-500 bg-clip-text text-transparent tracking-tighter">
              Inovate.
            </span>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-xl hidden sm:block">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-zinc-500 group-focus-within:text-teal-500 transition-colors" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-4 py-2 border border-zinc-800 rounded-full leading-5 bg-zinc-900/50 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 focus:bg-zinc-900 transition-all text-sm"
                placeholder="Search products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </form>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {isClient && user ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 bg-zinc-800/80 rounded-full py-1.5 px-3 border border-zinc-700/50">
                  <User className="h-4 w-4 text-teal-400" />
                  <span className="text-sm font-medium text-zinc-200 hidden sm:inline">{user.username}</span>
                </div>
                <button
                  onClick={logout}
                  className="p-2 text-zinc-400 hover:text-red-400 hover:bg-red-400/10 rounded-full transition-all"
                  title="Logout"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 text-sm font-semibold bg-teal-500/10 hover:bg-teal-500 text-teal-400 hover:text-black rounded-full py-2 px-4 transition-all"
              >
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Sign In</span>
              </Link>
            )}

            <button
              className="relative p-2 text-zinc-400 hover:text-teal-400 transition-colors"
              onClick={() => document.dispatchEvent(new CustomEvent('toggle-cart'))}
            >
              <ShoppingCart className="h-5 w-5" />
              {isClient && cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold text-zinc-950 bg-teal-400 rounded-full shadow-[0_0_10px_rgba(20,184,166,0.5)]">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <form onSubmit={handleSearch} className="sm:hidden pb-3">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-zinc-500" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-4 py-2 border border-zinc-800 rounded-full leading-5 bg-zinc-900/50 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 text-sm"
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </form>
      </div>
    </nav>
  );
}
