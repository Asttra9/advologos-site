'use client';

import { useState, useEffect } from 'react';

export function PageLoader() {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setIsVisible(false);
    }, 500);

    const removeTimer = setTimeout(() => {
      setShouldRender(false);
    }, 900);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[var(--grafite)] transition-all duration-[500ms] ease-out ${
        isVisible
          ? 'opacity-100'
          : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* Subtle background grain effect */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(139,30,45,0.15) 0%, transparent 60%)',
        }}
      />

      {/* Logo text with pulse animation */}
      <div className="relative flex flex-col items-center gap-4">
        <p className="font-serif text-[clamp(28px,5vw,48px)] tracking-[-0.02em] animate-[page-loader-pulse_1.8s_ease-in-out_infinite]" role="status" aria-live="polite">
          <span className="text-[var(--editorial)]">Advo</span>
          <span className="text-[var(--crimson)]">logos</span>
        </p>
        <div className="flex items-center gap-2">
          <span className="h-[1px] w-6 bg-[var(--ardosia-md)]" />
          <span className="text-[9px] font-semibold tracking-[0.25em] uppercase text-[var(--nevoa)]">
            Branding Jurídico
          </span>
          <span className="h-[1px] w-6 bg-[var(--ardosia-md)]" />
        </div>
      </div>
    </div>
  );
}
