'use client';

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

export function StatsRibbon() {
  return (
    <section
      className="relative py-8 border-y border-[rgba(184,196,204,0.08)] bg-[rgba(26,26,34,0.5)]"
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
                    className="font-serif text-[clamp(28px,4vw,40px)] text-[var(--crimson-lt)] leading-none tracking-[-0.02em]"
                  />
                  <div className="text-[10px] font-bold tracking-[0.14em] uppercase text-[var(--nevoa)]">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
