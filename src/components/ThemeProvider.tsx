'use client';

import { useEffect, useState } from 'react';
import { useThemeStore } from '@/store/useThemeStore';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useThemeStore((s) => s.theme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme, mounted]);

  // Prevent flash — render dark by default until hydrated
  return <>{children}</>;
}
