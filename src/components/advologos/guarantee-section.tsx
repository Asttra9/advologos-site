'use client';

import { ShieldCheck, CheckCircle, RefreshCcw, Handshake } from 'lucide-react';
import { ScrollReveal } from './scroll-reveal';

const TRUST_POINTS = [
  {
    icon: CheckCircle,
    label: 'Satisfação garantida',
  },
  {
    icon: RefreshCcw,
    label: 'Ajustes inclusos',
  },
  {
    icon: Handshake,
    label: 'Sem pegadinhas',
  },
];

export function GuaranteeSection() {
  return (
    <section
      id="garantia"
      className="py-16 md:py-24 border-b border-[rgba(184,196,204,0.08)]"
      aria-label="Garantia Advologos"
    >
      <div className="max-w-[800px] mx-auto px-5 md:px-12">
        <ScrollReveal>
          <div className="guarantee-card relative rounded-2xl border border-[rgba(184,196,204,0.1)] bg-[rgba(26,26,34,0.6)] backdrop-blur-md p-8 md:p-12 text-center overflow-hidden">
            {/* Subtle radial glow behind shield */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[320px] h-[200px] pointer-events-none opacity-40 guarantee-glow" />

            {/* Shield icon */}
            <div className="relative z-10 flex justify-center mb-6">
              <div className="guarantee-shield-wrap flex items-center justify-center w-[72px] h-[72px] md:w-[84px] md:h-[84px] rounded-full border border-[rgba(139,30,45,0.25)] bg-[rgba(139,30,45,0.08)]">
                <ShieldCheck
                  className="h-9 w-9 md:h-10 md:w-10 text-[var(--crimson-lt)]"
                  strokeWidth={1.5}
                />
              </div>
            </div>

            {/* Headline */}
            <h2 className="relative z-10 font-serif text-[clamp(24px,4vw,36px)] font-normal text-[var(--editorial)] leading-[1.15] tracking-[-0.015em] mb-4">
              Garantia Advologos
            </h2>

            {/* Description */}
            <p className="relative z-10 text-[var(--prata)] text-[clamp(14px,2vw,16px)] leading-[1.75] max-w-[540px] mx-auto mb-10">
              Se em até 14 dias após a entrega final você não estiver 100% satisfeito com
              sua marca, realizamos ajustes sem custo adicional. Sua satisfação é nosso
              compromisso.
            </p>

            {/* Divider */}
            <div className="relative z-10 flex items-center justify-center gap-3 mb-10">
              <span className="block w-12 h-px bg-gradient-to-r from-transparent to-[rgba(139,30,45,0.3)]" />
              <span className="block w-1.5 h-1.5 bg-[var(--crimson)] rounded-full opacity-50 rotate-45" />
              <span className="block w-12 h-px bg-gradient-to-l from-transparent to-[rgba(139,30,45,0.3)]" />
            </div>

            {/* Trust points */}
            <ScrollReveal delay={2}>
              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-6">
                {TRUST_POINTS.map((point) => {
                  const Icon = point.icon;
                  return (
                    <div
                      key={point.label}
                      className="guarantee-point flex flex-col items-center gap-2.5 p-4 rounded-xl border border-[rgba(184,196,204,0.06)] bg-[rgba(255,255,255,0.015)] transition-all duration-300 hover:bg-[rgba(139,30,45,0.05)] hover:border-[rgba(139,30,45,0.15)]"
                    >
                      <Icon
                        className="h-5 w-5 text-[var(--crimson)]"
                        strokeWidth={1.8}
                      />
                      <span className="text-[var(--prata)] text-[13px] font-semibold tracking-wide">
                        {point.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
