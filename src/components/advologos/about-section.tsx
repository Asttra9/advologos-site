'use client';

import { useEffect, useRef, useState } from 'react';
import { Target, Palette, Wrench } from 'lucide-react';
import { ScrollReveal } from './scroll-reveal';
import { AnimatedNumber } from './animated-number';

const PILLARS = [
  {
    icon: Target,
    title: 'Estratégia',
    description:
      'Cada marca começa com posicionamento. Definimos arcos narrativos alinhados ao mercado jurídico.',
  },
  {
    icon: Palette,
    title: 'Design',
    description:
      'Criamos sistemas visuais completos — do logotipo à papelaria — com coerência estética.',
  },
  {
    icon: Wrench,
    title: 'Implementação',
    description:
      'Acompanhamos a aplicação da marca em todos os pontos de contato digitais e físicos.',
  },
];

export function AboutSection() {
  return (
    <section
      id="sobre"
      className="py-20 border-b border-[rgba(184,196,204,0.08)] md:py-32"
      aria-label="Sobre a Advologos"
    >
      <div className="max-w-[1160px] mx-auto px-5 md:px-12">
        <ScrollReveal>
          <div className="section-wave-separator mb-14" />
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-12 items-start md:grid-cols-2 md:gap-20">
          {/* Left — heading + description */}
          <div>
            <ScrollReveal>
              <div className="inline-flex items-center gap-2.5 text-[10px] font-bold tracking-[0.18em] uppercase text-[var(--crimson-lt)] mb-5">
                <span className="block w-5 h-px bg-[var(--crimson-lt)] flex-shrink-0" />
                05 — Por que a Advologos
              </div>
            </ScrollReveal>

            <ScrollReveal delay={1}>
              <div className="about-heading-glow relative inline-block">
                <h2 className="section-heading-accent font-serif text-[clamp(32px,4.5vw,56px)] font-normal text-[var(--editorial)] leading-[1.08] tracking-[-0.015em] mb-5 relative z-10">
                  Não somos uma agência genérica.
                  <br />
                  Somos especialistas em marcas jurídicas.
                </h2>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={2}>
              <p className="text-[var(--prata)] text-[15px] leading-[1.8] max-w-[540px] mb-6">
                A Advologos nasceu de uma constatação: o mercado jurídico é um dos
                mais regulados do Brasil, mas a forma como profissionais e escritórios
                se comunicam visualmente ainda é tratada como acessório. Mudamos essa
                realidade — com método, critério e conhecimento profundo das regras
                que governam a advocacia.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={3}>
              <p className="text-[var(--prata)] text-[15px] leading-[1.8] max-w-[540px]">
                Cada projeto é conduzido por profissionais que entendem tanto branding
                quanto o Provimento 205/2021 da OAB. Não fazemos adaptações genéricas —
                construímos sistemas de marca sob medida para quem atua no direito.
              </p>
            </ScrollReveal>
          </div>

          {/* Right — 3 pillar cards */}
          <div className="flex flex-col gap-4">
            {PILLARS.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <ScrollReveal key={pillar.title} delay={i + 1}>
                  <div className="about-pillar-card bg-[rgba(255,255,255,0.025)] border border-[rgba(184,196,204,0.08)] p-1 rounded-[1.25rem] card-glow card-lift shimmer-on-hover">
                    <div className="bg-[var(--ardosia)] rounded-[calc(1.25rem-5px)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] px-6 py-5 flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-[rgba(139,30,45,0.1)] border border-[rgba(139,30,45,0.22)] flex-shrink-0 flex items-center justify-center text-[var(--crimson-lt)]">
                        <Icon className="h-[18px] w-[18px]" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <h3 className="font-serif text-[16px] text-[var(--editorial)] leading-tight">
                          {pillar.title}
                        </h3>
                        <p className="text-[13px] text-[var(--prata)] leading-[1.6] !max-w-none">
                          {pillar.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        {/* Animated stats */}
        <ScrollReveal delay={4}>
          <div className="mt-16 grid grid-cols-3 gap-4 max-w-[540px]">
            <div className="text-center">
              <div className="font-serif text-[clamp(28px,4vw,36px)] text-[var(--crimson-lt)] leading-none mb-1">
                <AnimatedNumber value={3} duration={1200} />
              </div>
              <div className="text-[10px] font-semibold tracking-[0.12em] uppercase text-[var(--nevoa)]">
                Pilares
              </div>
            </div>
            <div className="text-center">
              <div className="font-serif text-[clamp(28px,4vw,36px)] text-[var(--crimson-lt)] leading-none mb-1">
                <AnimatedNumber value={5} duration={1400} />
              </div>
              <div className="text-[10px] font-semibold tracking-[0.12em] uppercase text-[var(--nevoa)]">
                Etapas
              </div>
            </div>
            <div className="text-center">
              <div className="font-serif text-[clamp(28px,4vw,36px)] text-[var(--crimson-lt)] leading-none mb-1">
                <AnimatedNumber value={4} duration={1600} />
              </div>
              <div className="text-[10px] font-semibold tracking-[0.12em] uppercase text-[var(--nevoa)]">
                Pacotes
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
