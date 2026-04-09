'use client';

import { useEffect, useRef, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';
import { ScrollReveal } from './scroll-reveal';
import { useSmoothScroll } from './smooth-anchor';

export function Hero() {
  const glowRef = useRef<HTMLDivElement>(null);
  const glow2Ref = useRef<HTMLDivElement>(null);
  const scrollTo = useSmoothScroll();

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const normalizedX = e.clientX / window.innerWidth - 0.5;
    const normalizedY = e.clientY / window.innerHeight - 0.5;

    if (glowRef.current) {
      glowRef.current.style.transform = `translate(${normalizedX * 24}px, ${normalizedY * 24}px)`;
    }

    if (glow2Ref.current) {
      glow2Ref.current.style.transform = `translate(${normalizedX * -16}px, ${normalizedY * -16}px)`;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] items-center overflow-hidden"
      aria-label="Seção principal"
    >
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Main glow (top-right) */}
        <div
          ref={glowRef}
          className="absolute -top-[10%] -right-[8%] h-[780px] w-[780px] rounded-full bg-[radial-gradient(circle,rgba(139,30,45,0.1)_0%,rgba(139,30,45,0.03)_50%,transparent_70%)] transition-transform duration-[1200ms] [transition-timing-function:var(--ease-spring)]"
        />
        {/* Second glow (bottom-left, prata silver) */}
        <div
          ref={glow2Ref}
          className="absolute -bottom-[5%] -left-[5%] h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,rgba(184,196,204,0.04)_0%,transparent_70%)] animate-[glow-float_6s_ease-in-out_infinite] transition-transform duration-[1200ms] [transition-timing-function:var(--ease-spring)]"
        />
        {/* Vertical lines */}
        <div className="absolute top-0 bottom-0 w-px left-[28%] bg-[linear-gradient(to_bottom,transparent,rgba(184,196,204,0.05),transparent)]" />
        <div className="absolute top-0 bottom-0 w-px right-[22%] opacity-50 bg-[linear-gradient(to_bottom,transparent,rgba(184,196,204,0.05),transparent)]" />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'linear-gradient(rgba(184,196,204,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(184,196,204,0.3) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* Bottom gradient line */}
      <div className="hero-gradient-line" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-[1] w-full max-w-[1160px] mx-auto px-6 pt-32 pb-20 md:px-12 md:pt-[160px] md:pb-[120px]">
        <ScrollReveal>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[rgba(139,30,45,0.12)] border border-[rgba(139,30,45,0.3)] px-3 py-1 text-[10px] font-semibold tracking-[0.2em] uppercase text-[var(--editorial)] mb-7">
            Branding & Presença Digital Jurídica
          </div>
        </ScrollReveal>

        <ScrollReveal delay={1}>
          <h1 className="font-serif text-[clamp(42px,9.5vw,116px)] font-normal leading-[0.9] tracking-[-0.025em] text-[var(--editorial)] mb-3.5 md:text-[clamp(60px,9.5vw,116px)]">
            Marcas jurídicas
            <br />
            com <em className="text-[var(--crimson)] italic">presença,</em>
            <br />
            clareza e <span className="gradient-text">autoridade</span>.
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={2}>
          <p className="font-serif text-[clamp(18px,2.4vw,30px)] italic text-[var(--nevoa)] leading-[1.35] mb-12 md:mb-[52px]">
            A Advologos estrutura a forma como o mercado
            <br className="hidden md:block" />
            {' '}
            <span className="hero-typewriter">
              percebe quem advoga.
            </span>
          </p>
        </ScrollReveal>

        <ScrollReveal delay={3}>
          <div className="grid grid-cols-1 gap-8 max-w-[900px] mb-14 md:grid-cols-2 md:mb-14 md:gap-10">
            <p className="text-[var(--prata)] text-[15px] leading-[1.8]">
              A maioria dos escritórios perde clientes para concorrentes tecnicamente inferiores. O que está faltando não é competência — é a forma como ela é percebida.
            </p>
            <p className="text-[var(--prata)] text-[15px] leading-[1.8]">
              Não fazemos logotipos. Arquitetamos identidades que comunicam autoridade antes da primeira conversa. Cada detalhe tem uma razão estrutural.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={4}>
          <div className="flex flex-col items-stretch gap-4 md:flex-row md:items-center md:gap-4">
            <a
              href="#servicos"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('#servicos');
              }}
              className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[var(--crimson)] text-[var(--editorial)] no-underline text-[12px] font-bold tracking-[0.1em] uppercase py-3.5 pl-6 pr-3.5 border-none cursor-pointer transition-all duration-400 [transition-timing-function:var(--ease-spring)] hover:bg-[var(--crimson-dp)] active:scale-[0.98]"
            >
              Ver pacotes
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(0,0,0,0.22)] text-sm transition-transform duration-400 [transition-timing-function:var(--ease-spring)]">
                <ChevronDown className="h-4 w-4" />
              </span>
            </a>
            <a
              href="#metodo"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('#metodo');
              }}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-transparent border border-[rgba(184,196,204,0.2)] text-[var(--prata)] no-underline text-[12px] font-semibold tracking-[0.08em] uppercase py-3.5 px-5 cursor-pointer transition-all duration-400 [transition-timing-function:var(--ease-spring)] hover:border-[rgba(184,196,204,0.4)] hover:text-[var(--editorial)]"
            >
              Como funciona
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={5}>
          <div className="flex flex-wrap gap-2 mt-16 pt-10 border-t border-[rgba(184,196,204,0.08)] md:mt-16 md:pt-10">
            {['Identidade Visual', 'Presença Digital', 'Autoridade de Marca', 'Branding Jurídico', 'Legal Design', 'OAB Compliant'].map(
              (tag, i) => (
                <div
                  key={tag}
                  className={`text-[10px] font-bold tracking-[0.12em] uppercase py-1.5 px-3.5 ${
                    i < 3
                      ? 'rounded-full bg-[rgba(139,30,45,0.12)] border border-[rgba(139,30,45,0.3)] text-[var(--editorial)]'
                      : 'rounded-[3px] border border-[rgba(184,196,204,0.15)] text-[var(--editorial)]'
                  }`}
                >
                  {tag}
                </div>
              )
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
