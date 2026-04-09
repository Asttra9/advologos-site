'use client';

import { Scale, ShieldCheck, Zap, Award } from 'lucide-react';
import { ScrollReveal } from './scroll-reveal';

const TRUST_ITEMS = [
  {
    icon: Award,
    label: 'Branding Jurídico Especializado',
  },
  {
    icon: Scale,
    label: 'OAB Compliant',
  },
  {
    icon: ShieldCheck,
    label: 'Provimento 205/2021',
  },
  {
    icon: Zap,
    label: 'Sem dependência contínua',
  },
];

export function TrustStrip() {
  return (
    <div className="bg-[rgba(26,26,34,0.3)] border-y border-[rgba(184,196,204,0.06)] py-5">
      <ScrollReveal>
        <div className="max-w-[1160px] mx-auto px-5 md:px-12">
          <div className="flex flex-col gap-4 grid-cols-2 md:grid md:grid-cols-4 md:gap-0">
            {TRUST_ITEMS.map((item, i) => (
              <div
                key={item.label}
                className={`trust-item-hover flex items-center gap-2 ${
                  i < TRUST_ITEMS.length - 1
                    ? 'md:border-r md:border-[rgba(184,196,204,0.1)] md:pr-6'
                    : ''
                } ${i > 0 ? 'md:pl-6' : ''}`}
              >
                <item.icon className="h-[14px] w-[14px] text-[var(--crimson-lt)] flex-shrink-0" />
                <span className="text-[11px] font-semibold tracking-[0.08em] uppercase text-[var(--nevoa)]">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
