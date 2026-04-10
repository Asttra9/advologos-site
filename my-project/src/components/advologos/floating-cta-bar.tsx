'use client';

import { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { WHATSAPP_URL } from '@/lib/constants';

export function FloatingCtaBar() {
  const [scrollVisible, setScrollVisible] = useState(false);
  const [cookieVisible, setCookieVisible] = useState(false);

  useEffect(() => {
    // Defer initial checks into callbacks to avoid synchronous setState in effect
    const scrollHandler = () => {
      setScrollVisible(window.scrollY > window.innerHeight);
    };

    const observer = new MutationObserver(() => {
      setCookieVisible(document.body.classList.contains('cookie-banner-visible'));
    });

    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    window.addEventListener('scroll', scrollHandler, { passive: true });

    // Schedule initial check as a microtask (technically a callback, not synchronous)
    queueMicrotask(scrollHandler);
    queueMicrotask(() => {
      setCookieVisible(document.body.classList.contains('cookie-banner-visible'));
    });

    return () => {
      window.removeEventListener('scroll', scrollHandler);
      observer.disconnect();
    };
  }, []);

  const visible = scrollVisible && !cookieVisible;

  return (
    <div
      className={`fixed bottom-20 left-1/2 -translate-x-1/2 z-[55] w-[calc(100%-24px)] max-w-[1160px] transition-all [transition-timing-function:var(--ease-expo)] ${
        visible
          ? 'translate-y-0 opacity-100 [transition-duration:600ms]'
          : 'translate-y-8 opacity-0 pointer-events-none [transition-duration:300ms]'
      }`}
      role="complementary"
      aria-label="Barra de ação rápida"
    >
      <div className="flex items-center justify-between gap-3 px-3 py-2.5 sm:px-5 sm:py-3 rounded-2xl backdrop-blur-md bg-[rgba(13,13,15,0.82)] border border-[rgba(139,30,45,0.35)] border-t-2 border-t-[var(--crimson)] shadow-[0_-4px_32px_rgba(0,0,0,0.35),0_0_16px_rgba(139,30,45,0.06)]">
        {/* Brand name — mobile + desktop */}
        <span className="font-serif text-[clamp(14px,2.5vw,18px)] text-[var(--editorial)] font-semibold tracking-[-0.01em] shrink-0">
          Advologos
        </span>

        {/* Center tagline — desktop only */}
        <span className="hidden md:block text-[clamp(11px,1.5vw,13px)] text-[var(--nevoa)] tracking-[0.04em] text-center flex-1">
          Marcas jurídicas com presença e autoridade.
        </span>

        {/* Right-aligned actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Ver pacotes link */}
          <a
            href="#servicos"
            className="inline-flex items-center gap-1.5 text-[clamp(10px,1.5vw,12px)] font-semibold tracking-[0.06em] uppercase text-[var(--prata)] hover:text-[var(--editorial)] transition-colors duration-300 px-2 py-1.5 sm:px-3"
          >
            Ver pacotes
          </a>

          {/* WhatsApp button */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366] text-white text-[clamp(10px,1.5vw,12px)] font-semibold tracking-[0.06em] uppercase py-2 px-3 sm:px-4 transition-all duration-300 [transition-timing-function:var(--ease-spring)] hover:bg-[#1EBE57] hover:shadow-[0_0_16px_rgba(37,211,102,0.35)] active:scale-[0.97]"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
