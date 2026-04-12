'use client';

import { useCallback } from 'react';

export function useSmoothScroll() {
  const scrollTo = useCallback((href: string) => {
    const el = document.querySelector(href);
    if (!el) return;

    const nav = document.getElementById('nav');
    const navHeight = nav?.offsetHeight || 0;
    const top = el.getBoundingClientRect().top + window.scrollY - navHeight;

    window.scrollTo({ top, behavior: 'smooth' });
  }, []);

  return scrollTo;
}
