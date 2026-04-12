'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Scale, Diamond, Triangle } from 'lucide-react';
import { ScrollReveal } from './scroll-reveal';
import { TESTIMONIALS, PILLARS } from '@/lib/constants';

const ICON_MAP = {
  scale: Scale,
  diamond: Diamond,
  triangle: Triangle,
} as const;

const SWIPE_THRESHOLD = 50;

function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const touchStartRef = useRef<number | null>(null);
  const touchCurrentRef = useRef<number | null>(null);
  const isSwipingRef = useRef(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX;
    touchCurrentRef.current = e.touches[0].clientX;
    isSwipingRef.current = true;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isSwipingRef.current || touchStartRef.current === null) return;
    touchCurrentRef.current = e.touches[0].clientX;
    const diff = touchCurrentRef.current - touchStartRef.current;
    setSwipeOffset(diff);
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (touchStartRef.current === null || touchCurrentRef.current === null) {
      setSwipeOffset(0);
      isSwipingRef.current = false;
      return;
    }

    const diff = touchCurrentRef.current - touchStartRef.current;

    if (Math.abs(diff) >= SWIPE_THRESHOLD) {
      if (diff < 0) {
        next();
      } else {
        prev();
      }
    }

    setSwipeOffset(0);
    touchStartRef.current = null;
    touchCurrentRef.current = null;
    isSwipingRef.current = false;
  }, [next, prev]);

  return (
    <div
      className="bg-[rgba(255,255,255,0.025)] border border-[rgba(184,196,204,0.1)] p-[5px] rounded-[1.25rem] overflow-hidden card-glow"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="bg-[var(--ardosia)] rounded-[calc(1.25rem-5px)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] p-5 md:p-7 min-h-[clamp(200px,30vw,220px)] flex flex-col"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Testimonial slides — absolute-stacked with CSS transitions */}
        <div className="flex-1 relative">
          {TESTIMONIALS.map((t, i) => {
            const initials = t.author
              .split(' ')
              .filter((w) => w.length > 2)
              .slice(0, 2)
              .map((w) => w[0])
              .join('');

            const isActive = i === current;

            return (
              <div
                key={i}
                className={[
                  'absolute inset-0 flex flex-col testimonial-swipe',
                  'transition-[opacity,transform] duration-[400ms]',
                  isActive
                    ? 'translate-y-0 opacity-100'
                    : i < current
                      ? '-translate-y-3 opacity-0 pointer-events-none'
                      : 'translate-y-3 opacity-0 pointer-events-none',
                ].join(' ')}
                style={{
                  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                  ...(isActive && swipeOffset
                    ? {
                        transform: `translateX(${swipeOffset}px)`,
                        transitionTimingFunction: 'none',
                      }
                    : {}),
                }}
                aria-hidden={!isActive}
              >
                <blockquote className="relative font-serif text-[clamp(15px,3.5vw,17px)] italic text-[var(--prata-lt)] leading-[1.5] mb-3.5 pt-5">
                  <span className="quote-mark">&ldquo;</span>
                  {t.quote}&rdquo;
                </blockquote>
                <div className="flex flex-col items-center gap-2.5">
                  <div className="relative">
                    <div className="absolute inset-[-6px] rounded-full bg-[radial-gradient(circle,rgba(139,30,45,0.25)_0%,transparent_70%)] pointer-events-none" />
                    <div
                      className="w-[clamp(44px,10vw,52px)] h-[clamp(44px,10vw,52px)] rounded-full p-[2px]"
                      style={{
                        background:
                          'radial-gradient(circle at 30% 30%, var(--crimson), rgba(139,30,45,0.15), transparent)',
                      }}
                    >
                      <div className="w-full h-full rounded-full bg-[var(--ardosia)] flex items-center justify-center text-[var(--crimson-lt)] text-[clamp(13px,2.5vw,15px)] font-bold font-serif">
                        {initials}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-0.5">
                    <span className="font-serif italic text-[clamp(12px,2.5vw,13px)] text-[var(--crimson-lt)]">
                      {t.author}
                    </span>
                    <cite className="text-[clamp(10px,2vw,11px)] text-[var(--nevoa)] not-italic tracking-[0.06em] uppercase">
                      {t.role}
                    </cite>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dots */}
        <div className="flex gap-2.5 justify-center mt-5 pt-4 border-t border-[rgba(184,196,204,0.06)]">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Depoimento ${i + 1}`}
              className={`h-[8px] rounded-full transition-all duration-300 ${
                i === current
                  ? 'w-[28px] bg-[var(--crimson)] shadow-[0_0_8px_rgba(139,30,45,0.4)]'
                  : 'w-[8px] bg-[rgba(184,196,204,0.2)] hover:bg-[rgba(184,196,204,0.4)] active:scale-90'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function AuthoritySection() {
  return (
    <section
      id="autoridade"
      className="py-20 border-b border-[rgba(184,196,204,0.08)] md:py-32 section-gradient-crimson"
      aria-label="Por que a Advologos"
    >
      <div className="max-w-[1160px] mx-auto px-5 md:px-12">
        <div className="grid grid-cols-1 gap-12 items-center md:grid-cols-2 md:gap-20">
          {/* Left text + pillars */}
          <div>
            <ScrollReveal>
              <div className="inline-flex items-center gap-2.5 text-[10px] font-bold tracking-[0.18em] uppercase text-[var(--crimson-lt)] mb-5">
                <span className="block w-5 h-px bg-[var(--crimson-lt)] flex-shrink-0" />
                05 — Por que a Advologos
              </div>
            </ScrollReveal>

            <ScrollReveal delay={1}>
              <h2 className="section-heading-accent font-serif text-[clamp(32px,4.5vw,56px)] font-normal text-[var(--editorial)] leading-[1.08] tracking-[-0.015em] mb-5">
                A marca que
                <br />
                entrega é a
                <br />
                que demonstra.
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={2}>
              <p className="text-[var(--prata)] text-[15px] leading-[1.8] max-w-[620px] mb-9">
                Não vendemos branding genérico com verniz jurídico. Somos especialistas no mercado legal e cada
                decisão de design é fundamentada na realidade do profissional que advoga.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={3}>
              <div className="flex flex-col gap-2.5">
                {PILLARS.map((pillar) => {
                  const Icon = ICON_MAP[pillar.icon];
                  return (
                    <div key={pillar.title} className="flex gap-4 items-start">
                      <div className="w-9 h-9 rounded-lg bg-[rgba(139,30,45,0.1)] border border-[rgba(139,30,45,0.22)] flex-shrink-0 flex items-center justify-center text-[var(--crimson-lt)]">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="text-[14px] font-semibold text-[var(--editorial)] mb-0.5">
                          {pillar.title}
                        </div>
                        <div className="text-[12.5px] text-[var(--prata)] leading-[1.55] !max-w-none">
                          {pillar.text}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>
          </div>

          {/* Right carousel + OAB */}
          <div className="flex flex-col gap-2.5">
            <ScrollReveal delay={2}>
              <div className="flex flex-col gap-2.5">
                <TestimonialCarousel />

                {/* OAB Notice */}
                <div className="bg-[rgba(255,255,255,0.025)] border border-[rgba(184,196,204,0.08)] p-1 rounded-[1rem]">
                  <div className="bg-[var(--ardosia-md)] rounded-[calc(1rem-4px)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.04)] px-4 py-3.5 md:px-5 md:py-4">
                    <div className="text-[clamp(8px,1.8vw,9px)] font-bold tracking-[0.16em] uppercase text-[var(--crimson-lt)] mb-1.5">
                      Conformidade OAB
                    </div>
                    <p className="text-[clamp(11.5px,2.5vw,12px)] text-[var(--prata)] leading-[1.5] !max-w-none">
                      Todo o trabalho desenvolvido pela Advologos respeita integralmente o{' '}
                      <strong>Provimento 205/2021</strong> do Conselho Federal da OAB — que regulamenta a
                      publicidade e o marketing na advocacia. Nenhuma entrega viola as regras de publicidade
                      ética da profissão.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
