'use client';

import { useRef, useCallback } from 'react';
import { AnimatedNumber } from './animated-number';
import { ScrollReveal } from './scroll-reveal';

const SIGNALS = [
  {
    value: 7,
    suffix: 's',
    title: 'Primeiros segundos são decisivos',
    description:
      'É o tempo que um potencial cliente leva para formar uma opinião sobre um escritório com base na identidade visual.',
  },
  {
    value: 3,
    suffix: 'x',
    title: 'Percepção multiplica conversão',
    description:
      'Escritórios com identidade estruturada convertem até três vezes mais consultas em clientes do que os sem sistema de marca.',
  },
  {
    value: 92,
    suffix: '%',
    title: 'Decisão antes do primeiro contato',
    description:
      'A maioria dos clientes pesquisa o escritório online e já chega com uma opinião formada sobre competência antes de qualquer conversa.',
  },
];

function StatCard({ stat, index }: { stat: (typeof SIGNALS)[number]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty('--mouse-x', `${x}%`);
    el.style.setProperty('--mouse-y', `${y}%`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty('--mouse-x', '50%');
    el.style.setProperty('--mouse-y', '50%');
  }, []);

  return (
    <div
      key={stat.title}
      className={`bg-[rgba(255,255,255,0.025)] border border-[rgba(184,196,204,0.08)] p-[5px] rounded-[1.25rem] shimmer-on-hover card-glow card-lift transition-all duration-500 [transition-timing-function:var(--ease-spring)] ${index === 0 ? 'animated-border shadow-[0_0_40px_rgba(139,30,45,0.06),0_0_80px_rgba(139,30,45,0.03)]' : 'hover:shadow-[0_0_20px_rgba(139,30,45,0.04),0_8px_32px_rgba(0,0,0,0.2)]'}`}
    >
        <div
          ref={cardRef}
          className="glass-hover-card bg-[var(--ardosia)] rounded-[calc(1.25rem-5px)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.06),inset_0_0_0_1px_rgba(255,255,255,0.03)] p-7 flex items-center gap-6 relative"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
        {/* Corner accent stripe */}
        <div className="absolute top-0 right-0 w-8 h-8 overflow-hidden rounded-tr-[calc(1.25rem-5px)] pointer-events-none" aria-hidden="true">
          <div className="card-corner-accent-line absolute top-0 right-0 w-[2px] h-full bg-gradient-to-b from-[var(--crimson-lt)] to-transparent opacity-[0.3]" />
          <div className="card-corner-accent-line absolute top-0 right-0 h-[2px] w-full bg-gradient-to-l from-[var(--crimson-lt)] to-transparent opacity-[0.3]" />
        </div>
        <AnimatedNumber
          value={stat.value}
          suffix={stat.suffix}
          className="font-serif text-[clamp(42px,5.8vw,64px)] font-normal text-[var(--crimson-lt)] leading-none tracking-[-0.03em] flex-shrink-0 relative z-[2] min-w-[86px] drop-shadow-[0_0_12px_rgba(165,37,53,0.15)]"
        />
        <div className="text-[clamp(13px,1.6vw,14px)] text-[var(--prata)] leading-[1.6] relative z-[2]">
          <strong className="block text-[var(--editorial)] text-[clamp(14px,1.7vw,15px)] font-semibold mb-1">
            {stat.title}
          </strong>
          {stat.description}
        </div>
      </div>
    </div>
  );
}

export function ProblemSection() {
  return (
    <section
      id="problema"
      className="py-20 border-b border-[rgba(184,196,204,0.08)] md:py-32 section-gradient-dark"
      aria-label="O problema"
    >
      <div className="max-w-[1160px] mx-auto px-5 md:px-12">
        <ScrollReveal>
          <div className="section-divider mb-14">
            <div className="section-divider-diamond [width:8px] [height:8px] [opacity:0.8] drop-shadow-[0_0_8px_rgba(139,30,45,0.4)]" />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-12 items-center md:grid-cols-2 md:gap-20">
          {/* Left text */}
          <div>
            <ScrollReveal>
              <div className="inline-flex items-center gap-2.5 text-[10px] font-bold tracking-[0.18em] uppercase text-[var(--crimson-lt)] mb-5">
                <span className="block w-5 h-px bg-[var(--crimson-lt)] flex-shrink-0" />
                01 — O Problema
              </div>
            </ScrollReveal>

            <ScrollReveal delay={1}>
              <h2 className="section-heading-accent font-serif text-[clamp(32px,4.5vw,56px)] font-normal text-[var(--editorial)] leading-[1.08] tracking-[-0.015em] mb-5">
                Percepção é
                <br />
                precedente.
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={2}>
              <p className="text-[var(--prata)] text-[clamp(14px,1.7vw,15px)] leading-[1.8] max-w-[620px]">
                No mercado jurídico, o cliente contrata quem parece mais competente, não necessariamente quem é. Uma marca inconsistente não é apenas um problema estético — é um problema de negócio.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={3}>
              <div className="bg-[rgba(139,30,45,0.07)] border border-[rgba(139,30,45,0.18)] rounded-lg p-5 mt-7 text-[clamp(12px,1.5vw,13px)] text-[var(--prata)] leading-[1.65] transition-all duration-500 [transition-timing-function:var(--ease-spring)] hover:bg-[rgba(139,30,45,0.1)] hover:border-[rgba(139,30,45,0.28)] hover:shadow-[0_0_24px_rgba(139,30,45,0.06)]">
                <strong className="text-[var(--crimson-lt)]">A verdade inconveniente:</strong> um advogado brilhante com marca genérica compete em desvantagem com um colega mediano bem posicionado. A Advologos corrige essa equação — sem comprometer a ética profissional exigida pelo Provimento 205/2021 da OAB.
              </div>
            </ScrollReveal>
          </div>

          {/* Right stats */}
          <div className="flex flex-col gap-0.5">
            <ScrollReveal delay={2}>
              <div className="flex flex-col gap-2">
                {SIGNALS.map((stat, i) => (
                  <StatCard key={stat.title} stat={stat} index={i} />
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
