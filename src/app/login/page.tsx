'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, ArrowRight, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [isClient, setIsClient] = useState(false);
  const { user, login } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Redirect if already logged in
  useEffect(() => {
    if (isClient && user) {
      router.push('/');
    }
  }, [isClient, user, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim()) {
      setError('Username is required');
      return;
    }

    const success = login(username.trim());
    if (success) {
      router.push('/');
    } else {
      setError('Invalid username. Only "user123" can sign in.');
    }
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-teal-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative">
        {/* Logo */}
        <Link href="/" className="block mb-10 text-center">
          <span className="text-3xl font-extrabold bg-gradient-to-r from-teal-400 to-emerald-500 bg-clip-text text-transparent tracking-tighter">
            Inovate.
          </span>
        </Link>

        <div className="bg-zinc-900/80 backdrop-blur-xl border border-white/5 rounded-2xl p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center">
              <User className="h-5 w-5 text-teal-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Welcome back</h1>
              <p className="text-sm text-zinc-500">Sign in to your account</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => { setUsername(e.target.value); setError(''); }}
                placeholder="Enter your username"
                className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-200 placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all text-sm"
                autoFocus
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 text-black font-bold py-3 rounded-xl transition-all active:scale-[0.98]"
            >
              <span>Sign In</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-zinc-500">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="text-teal-400 hover:text-teal-300 font-medium transition-colors">
                Create one
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-zinc-600 mt-6">
          Demo mode — use username <code className="text-teal-500/80 bg-teal-500/5 px-1.5 py-0.5 rounded">user123</code>
        </p>
      </div>
    </div>
  );
}
