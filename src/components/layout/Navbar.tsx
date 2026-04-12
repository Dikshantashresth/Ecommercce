"use client";

import { Search, User, LogOut, Menu, X, Sun, Moon } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useThemeStore } from "@/store/useThemeStore";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Services", href: "/#services" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [isClient, setIsClient] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const [query, setQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const handleSearch = (e: React.SubmitEvent<HTMLElement>) => {
    e.preventDefault();
    const trimmed = query.trim();
    setQuery("")
    if (trimmed) {
      router.replace(`/search?q=${encodeURIComponent(trimmed)}`);
      setMobileOpen(false);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-lg bg-white/80 dark:bg-zinc-950/80 border-b border-gray-200 dark:border-white/5 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <span className="text-2xl font-extrabold bg-gradient-to-r from-teal-500 to-emerald-500 bg-clip-text text-transparent tracking-tighter">
              neuraforge.
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "text-teal-500"
                    : "text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop search */}
          <form
            onSubmit={handleSearch}
            className="flex-1 max-w-xs hidden lg:block"
          >
            <div className="relative group">
              <input
                type="text"
                className="block w-full pl-4 pr-4 py-2 border border-gray-300 dark:border-zinc-800 rounded-full bg-gray-100 dark:bg-zinc-900/50 text-gray-900 dark:text-zinc-200 placeholder-gray-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all text-sm"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="absolute inset-y-0 right-4 cursor-pointer pl-0 flex items-center">
                <button type="submit" className="cursor-pointer">
                  <Search className="h-4 w-4 text-gray-400 dark:text-zinc-500 group-focus-within:text-teal-500 transition-colors" />
                </button>
              </div>
            </div>
          </form>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            {isClient && (
              <button
                onClick={toggleTheme}
                className="p-2 text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </button>
            )}

            {/* Auth */}
            {isClient && user ? (
              <div className="hidden sm:flex items-center gap-2">
                <div className="flex items-center gap-2 bg-gray-100 dark:bg-zinc-800/80 rounded-full py-1.5 px-3 border border-gray-200 dark:border-zinc-700/50">
                  <User className="h-4 w-4 text-teal-500" />
                  <span className="text-sm font-medium text-gray-800 dark:text-zinc-200">
                    {user.username}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="p-2 text-gray-400 dark:text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-400/10 rounded-full transition-colors"
                  title="Logout"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden sm:flex items-center gap-2 text-sm font-semibold bg-teal-500/10 hover:bg-teal-500 text-teal-600 dark:text-teal-400 hover:text-white rounded-full py-2 px-4 transition-colors"
              >
                <User className="h-4 w-4" />
                <span>Sign In</span>
              </Link>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-white/5 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl">
          <div className="px-4 py-4 space-y-4">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400 dark:text-zinc-500" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-9 pr-4 py-2.5 border border-gray-300 dark:border-zinc-800 rounded-xl bg-gray-50 dark:bg-zinc-900 text-gray-900 dark:text-zinc-200 placeholder-gray-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-teal-500 text-sm"
                  placeholder="Search products..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
            </form>

            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? "bg-teal-500/10 text-teal-600 dark:text-teal-400"
                      : "text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-900"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="pt-2 border-t border-gray-200 dark:border-zinc-800">
              {isClient && user ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-teal-500" />
                    <span className="text-sm font-medium">{user.username}</span>
                  </div>
                  <button
                    onClick={logout}
                    className="text-sm text-red-500 font-medium"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center justify-center gap-2 w-full bg-teal-500 text-white font-semibold py-2.5 rounded-xl text-sm"
                >
                  <User className="h-4 w-4" />
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
