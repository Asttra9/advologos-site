'use client';

import { useState, useEffect, useCallback } from 'react';
import { ShieldCheck, Cookie } from 'lucide-react';

const CONSENT_KEY = 'advologos-cookie-consent';

export function CookieConsent() {
  const [hydrated, setHydrated] = useState(false);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    let bannerTimer: ReturnType<typeof setTimeout> | null = null;

    const initTimer = setTimeout(() => {
      setHydrated(true);

      const consent = localStorage.getItem(CONSENT_KEY);

      if (consent !== null) {
        setDismissed(true);
        return;
      }

      bannerTimer = setTimeout(() => {
        setVisible(true);
      }, 1200);
    }, 0);

    return () => {
      clearTimeout(initTimer);
      if (bannerTimer) {
        clearTimeout(bannerTimer);
      }
    };
  }, []);

  const handleHide = useCallback((consentValue: string) => {
    localStorage.setItem(CONSENT_KEY, consentValue);
    setIsAnimating(true);

    setTimeout(() => {
      setVisible(false);
      setDismissed(true);
      setIsAnimating(false);
    }, 400);
  }, []);

  const handleAccept = useCallback(() => handleHide('accepted'), [handleHide]);
  const handleReject = useCallback(() => handleHide('rejected'), [handleHide]);

  const handleReopen = useCallback(() => {
    localStorage.removeItem(CONSENT_KEY);
    setDismissed(false);
    setVisible(true);
    setIsAnimating(false);
  }, []);

  if (!hydrated) {
    return null;
  }

  if (dismissed && !visible) {
    return (
      <button
        onClick={handleReopen}
        aria-label="Abrir preferências de cookies"
        className="fixed bottom-4 left-4 z-[150] flex items-center gap-1.5 text-[11px] font-medium text-[var(--nevoa)] hover:text-[var(--prata)] transition-colors duration-300 cursor-pointer bg-transparent border-none p-0"
      >
        <Cookie className="h-3.5 w-3.5" />
        Cookies
      </button>
    );
  }

  return (
    <div
      role="dialog"
      aria-label="Preferências de cookies"
      aria-describedby="cookie-desc"
      className={`fixed bottom-6 left-1/2 z-[160] w-[calc(100%-32px)] max-w-[800px] -translate-x-1/2 transition-all duration-400 ease-out ${
        visible && !isAnimating
          ? 'translate-y-0 opacity-100'
          : 'translate-y-4 opacity-0 pointer-events-none'
      }`}
    >
      <div className="relative rounded-2xl border border-[rgba(184,196,204,0.1)] bg-[var(--ardosia)]/90 backdrop-blur-xl p-5 md:p-6 shadow-[0_8px_40px_rgba(0,0,0,0.4)]">
        {visible && !isAnimating && <div className="cookie-progress-bar" />}

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-5">
          <div className="flex items-start gap-3 flex-1">
            <div className="flex-shrink-0 mt-0.5">
              <ShieldCheck className="h-5 w-5 text-[var(--crimson)]" />
            </div>
            <div>
              <p className="text-[13px] font-semibold text-[var(--editorial)] mb-1">
                Privacidade & Cookies
              </p>
              <p
                id="cookie-desc"
                className="text-[12px] leading-[1.65] text-[var(--nevoa)]"
              >
                Utilizamos cookies para melhorar sua experiência, analisar o tráfego
                e personalizar conteúdo. Cookies necessários são essenciais para o
                funcionamento do site. Ao aceitar, você concorda com nossa{' '}
                <span className="text-[var(--prata)] underline underline-offset-2 decoration-[var(--prata)]/30 cursor-pointer hover:decoration-[var(--prata)]/60 transition-colors">
                  Política de Privacidade
                </span>
                .
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-shrink-0 md:flex-col md:items-stretch md:gap-2 md:min-w-[160px]">
            <button
              onClick={handleAccept}
              aria-label="Aceitar todos os cookies"
              className="flex-1 md:flex-none rounded-lg bg-[var(--crimson)] text-[var(--editorial)] text-[11px] font-bold tracking-[0.06em] uppercase px-4 py-2.5 border-none cursor-pointer transition-all duration-300 hover:bg-[var(--crimson-dp)] active:scale-[0.97]"
            >
              Aceitar todos
            </button>
            <button
              onClick={handleReject}
              aria-label="Rejeitar cookies opcionais"
              className="flex-1 md:flex-none rounded-lg bg-transparent text-[var(--prata)] text-[11px] font-semibold tracking-[0.06em] uppercase px-4 py-2.5 border border-[rgba(184,196,204,0.2)] cursor-pointer transition-all duration-300 hover:border-[rgba(184,196,204,0.4)] hover:text-[var(--editorial)] active:scale-[0.97]"
            >
              Somente necessários
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
