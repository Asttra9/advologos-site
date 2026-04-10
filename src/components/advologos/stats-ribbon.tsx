'use client';

import { useState, useEffect, useCallback } from 'react';
import { AnimatedNumber } from './animated-number';
import { ScrollReveal } from './scroll-reveal';

interface StatItem {
  value: number;
  label: string;
  suffix?: string;
}

const STATS: StatItem[] = [
  {
    value: 5000,
    suffix: '+',
    label: 'Marcas entregues',
  },
  {
    value: 90,
    suffix: '%',
    label: 'Taxa de aprovação',
  },
  {
    value: 4,
    suffix: ' anos',
    label: 'De operação',
  },
  {
    value: 12,
    suffix: 'x',
    label: 'Média de retorno',
  },
];

function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function LiveVisitorCounter() {
  const [viewers, setViewers] = useState<number | null>(null);

  const tick = useCallback(() => {
    setViewers((prev) => {
      if (prev === null) return randomBetween(12, 38);
      const delta = randomBetween(-2, 3);
      const next = prev + delta;
      return Math.max(12, Math.min(38, next));
    });
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydration-safe: must defer random init to client
    tick();

    const delay = randomBetween(8000, 15000);
    const id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [tick]);

  // SSR fallback — renders identical markup on server & client
  if (viewers === null) {
    return (
      <div className="flex items-center justify-center gap-1.5 mt-3 select-none opacity-0" aria-hidden="true">
        <span className="relative flex h-2 w-2">
          <span className="absolute inset-0 rounded-full bg-[#22C55E] opacity-75 animate-ping" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22C55E]" />
        </span>
        <span className="text-[clamp(9px,1.3vw,11px)] text-[var(--nevoa)] tracking-[0.02em]">
          &nbsp;
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-1.5 mt-3 select-none">
      <span className="relative flex h-2 w-2" aria-hidden="true">
        <span className="absolute inset-0 rounded-full bg-[#22C55E] opacity-75 animate-ping" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22C55E]" />
      </span>
      <span className="text-[clamp(9px,1.3vw,11px)] text-[var(--nevoa)] tracking-[0.02em]">
        {viewers} pessoas estão vendo este site agora
      </span>
    </div>
  );
}

export function StatsRibbon() {
  return (
    <section
      id="numeros"
      className="relative py-8 border-y border-[rgba(184,196,204,0.08)] bg-[rgba(26,26,34,0.5)] stats-ribbon-shimmer"
      aria-label="Números da Advologos"
    >
      <div className="max-w-[1160px] mx-auto px-5 md:px-12">
        <ScrollReveal>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
            {STATS.map((stat) => (
              <div key={stat.label} className="stat-glow-border card-lift">
                <div className="flex flex-col items-center text-center gap-2 py-2 md:py-0">
                  <AnimatedNumber
                    value={stat.value}
                    suffix={stat.suffix}
                    className="stat-value-glow font-serif text-[clamp(28px,4vw,40px)] text-[var(--crimson-lt)] leading-none tracking-[-0.02em]"
                  />
                  <div className="text-[10px] font-bold tracking-[0.14em] uppercase text-[var(--nevoa)]">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <LiveVisitorCounter />

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-4 select-none max-w-[700px] mx-auto">
            {['Branding Jurídico Especializado', 'OAB Compliant', 'Provimento 205/2021', 'Sem dependência contínua'].map(
              (tag) => (
                <span
                  key={tag}
                  className="text-[clamp(9px,1.2vw,10px)] font-semibold tracking-[0.1em] uppercase text-[var(--nevoa)] whitespace-nowrap"
                >
                  {tag}
                </span>
              )
            )}
            <span className="hidden sm:inline text-[rgba(184,196,204,0.15)]" aria-hidden="true">·</span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
