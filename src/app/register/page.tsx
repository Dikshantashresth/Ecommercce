'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { UserPlus, ArrowRight, AlertCircle } from 'lucide-react';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [isClient, setIsClient] = useState(false);
  const { user, login } = useAuthStore();
  const router = useRouter();

  useEffect(() => { setIsClient(true); }, []);
  useEffect(() => { if (isClient && user) router.push('/'); }, [isClient, user, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!username.trim()) { setError('Username is required'); return; }
    if (username.trim() !== 'user123') { setError('Registration is restricted. Only "user123" can register in this demo.'); return; }
    const success = login(username.trim());
    if (success) router.push('/');
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-950 px-4">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="w-full max-w-md relative">
        <Link href="/" className="block mb-10 text-center">
          <span className="text-3xl font-extrabold bg-gradient-to-r from-teal-500 to-emerald-500 bg-clip-text text-transparent tracking-tighter">Inovate.</span>
        </Link>
        <div className="bg-white dark:bg-zinc-900/80 backdrop-blur-xl border border-gray-200 dark:border-white/5 rounded-2xl p-8 shadow-xl dark:shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center"><UserPlus className="h-5 w-5 text-emerald-500" /></div>
            <div><h1 className="text-xl font-bold text-gray-900 dark:text-white">Create account</h1><p className="text-sm text-gray-500 dark:text-zinc-500">Join the automation revolution</p></div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-zinc-400 mb-2">Username</label>
              <input type="text" value={username} onChange={(e) => { setUsername(e.target.value); setError(''); }} placeholder="Choose a username" className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-950 border border-gray-300 dark:border-zinc-800 rounded-xl text-gray-900 dark:text-zinc-200 placeholder-gray-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-sm" autoFocus />
            </div>
            {error && (
              <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl px-4 py-3">
                <AlertCircle className="h-4 w-4 flex-shrink-0" /><span>{error}</span>
              </div>
            )}
            <button type="submit" className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-3 rounded-xl transition-all active:scale-[0.98]">
              <span>Create Account</span><ArrowRight className="h-4 w-4" />
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500 dark:text-zinc-500">Already have an account?{' '}<Link href="/login" className="text-teal-500 hover:text-teal-400 font-medium transition-colors">Sign in</Link></p>
          </div>
        </div>
        <p className="text-center text-xs text-gray-400 dark:text-zinc-600 mt-6">Demo mode — only <code className="text-teal-600 dark:text-teal-500/80 bg-teal-500/5 px-1.5 py-0.5 rounded">user123</code> can register</p>
      </div>
    </div>
  );
}
