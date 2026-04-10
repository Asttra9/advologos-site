'use client';

import { ScrollReveal } from './scroll-reveal';
import { VOICE_PRINCIPLES } from '@/lib/constants';

export function VoiceSection() {
  return (
    <section
      id="voz"
      className="py-20 border-b border-[rgba(184,196,204,0.08)] md:py-32"
      aria-label="Nossa Voz"
    >
      <div className="max-w-[1160px] mx-auto px-5 md:px-12">
        {/* Section label */}
        <ScrollReveal>
          <div className="inline-flex items-center gap-2.5 text-[10px] font-bold tracking-[0.18em] uppercase text-[var(--crimson-lt)] mb-5">
            <span className="block w-5 h-px bg-[var(--crimson-lt)]" />
            07 — Nossa Voz
          </div>
        </ScrollReveal>

        {/* Heading */}
        <ScrollReveal delay={1}>
          <h2 className="section-heading-accent font-serif text-[clamp(32px,4.5vw,56px)] font-normal text-[var(--editorial)] leading-[1.08] tracking-[-0.015em] mb-5">
            A linguagem da Advologos.
          </h2>
        </ScrollReveal>

        {/* Subtitle */}
        <ScrollReveal delay={2}>
          <p className="text-[var(--prata)] text-[15px] leading-[1.8] max-w-[620px] mb-14">
            Cada palavra é uma decisão de marca. Nossa comunicação segue princípios
            estruturais que refletem a mesma precisão aplicada aos sistemas visuais
            que construímos para nossos clientes.
          </p>
        </ScrollReveal>

        {/* Principle cards — 2×2 grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {VOICE_PRINCIPLES.map((principle, i) => (
            <ScrollReveal key={principle.title} delay={i + 1}>
              <div className="bg-[rgba(255,255,255,0.025)] border border-[rgba(184,196,204,0.08)] rounded-2xl p-6 card-glow shimmer-on-hover">
                <div className="font-serif text-[clamp(24px,5vw,28px)] text-[var(--crimson-lt)] leading-none mb-3">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="font-serif text-[clamp(16px,2.2vw,18px)] text-[var(--editorial)] leading-tight mb-2">
                  {principle.title}
                </h3>
                <p className="text-[13px] text-[var(--prata)] leading-[1.65]">
                  {principle.text}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
