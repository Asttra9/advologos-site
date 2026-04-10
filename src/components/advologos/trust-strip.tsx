'use client';

import { ScrollReveal } from './scroll-reveal';
import { Clock, MessageCircle, ShieldCheck, Globe } from 'lucide-react';

const TRUST_ITEMS = [
  {
    icon: Clock,
    label: 'Resposta em até 24h',
  },
  {
    icon: MessageCircle,
    label: 'Atendimento via WhatsApp',
  },
  {
    icon: ShieldCheck,
    label: 'Pagamento seguro',
  },
  {
    icon: Globe,
    label: 'Atendimento 100% digital',
  },
];

export function TrustStrip() {
  return (
    <div className="bg-[rgba(26,26,34,0.3)] border-y border-[rgba(184,196,204,0.06)] py-5 md:py-6 trust-strip-glow">
      <ScrollReveal>
        <div className="max-w-[1160px] mx-auto px-5 md:px-12">
          <div className="flex flex-col gap-3 md:gap-0 md:grid md:grid-cols-4">
            {TRUST_ITEMS.map((item, i) => (
              <div
                key={item.label}
                className={`trust-item-hover trust-item-glow trust-item-press flex items-center gap-2.5 px-3 py-2 md:px-0 md:py-0 ${
                  i < TRUST_ITEMS.length - 1
                    ? 'trust-divider-gradient md:pr-6'
                    : ''
                } ${i > 0 ? 'md:pl-6' : ''}`}
              >
                <span className="trust-icon-pulse flex-shrink-0">
                  <item.icon className="h-[14px] w-[14px] text-[var(--crimson-lt)]" />
                </span>
                <span className="text-[11px] sm:text-[11.5px] font-semibold tracking-[0.08em] uppercase text-[var(--nevoa)] leading-tight">
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
