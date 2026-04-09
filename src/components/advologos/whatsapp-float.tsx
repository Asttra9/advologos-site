'use client';

import { useState, useEffect, useCallback } from 'react';
import { MessageCircle } from 'lucide-react';
import { WHATSAPP_URL } from '@/lib/constants';

export function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 800);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = useCallback(() => {
    window.open(WHATSAPP_URL, '_blank', 'noopener,noreferrer');
  }, []);

  return (
    <div
      className={`group fixed bottom-6 left-6 z-[60] transition-all duration-300 ${
        visible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-4 opacity-0 pointer-events-none'
      }`}
    >
      {/* Tooltip */}
      <span className="absolute bottom-1/2 left-full mb-0 ml-3 translate-y-1/2 whitespace-nowrap rounded-lg bg-[var(--ardosia)] px-3 py-1.5 text-xs font-medium text-[var(--editorial)] shadow-lg opacity-0 transition-opacity duration-200 group-hover:opacity-100 pointer-events-none">
        Conversar no WhatsApp
      </span>

      <button
        onClick={handleClick}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#25D366]/50 focus:ring-offset-2 focus:ring-offset-[var(--grafite)]"
        aria-label="Conversar no WhatsApp"
      >
        {/* Pulse ring */}
        <span
          className="absolute inset-0 rounded-full bg-[#25D366] animate-[whatsapp-pulse_2s_ease-out_infinite]"
          aria-hidden="true"
        />
        <MessageCircle className="h-6 w-6 relative z-10" />
      </button>
    </div>
  );
}
