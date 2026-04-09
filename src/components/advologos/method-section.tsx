'use client';

import { Fragment, useState, useEffect, useRef, useCallback } from 'react';
import { Check } from 'lucide-react';
import { ScrollReveal } from './scroll-reveal';
import { METHOD_STEPS, CHECKLIST_ITEMS } from '@/lib/constants';

export function MethodSection() {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const asideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    stepRefs.current.forEach((ref, index) => {
      if (!ref) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveStep(index);
            }
          });
        },
        { threshold: 0.5, rootMargin: '0px 0px -20% 0px' }
      );
      observer.observe(ref);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  // Parallax effect for aside column on desktop
  const handleScroll = useCallback(() => {
    const aside = asideRef.current;
    if (!aside) return;
    if (window.innerWidth < 768) return;

    const rect = aside.parentElement?.getBoundingClientRect();
    if (!rect) return;

    // Calculate how far the parent is scrolled through viewport
    const viewportCenter = window.innerHeight / 2;
    const parentCenter = rect.top + rect.height / 2;
    const offset = (parentCenter - viewportCenter) * 0.2;

    aside.style.transform = `translateY(${offset}px)`;
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <section
      id="metodo"
      className="py-20 border-b border-[rgba(184,196,204,0.08)] md:py-32"
      aria-label="Método"
    >
      <div className="max-w-[1160px] mx-auto px-5 md:px-12">
        <ScrollReveal>
          <div className="section-divider mb-14">
            <div className="section-divider-diamond" />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="inline-flex items-center gap-2.5 text-[10px] font-bold tracking-[0.18em] uppercase text-[var(--crimson-lt)] mb-5">
            <span className="block w-5 h-px bg-[var(--crimson-lt)] flex-shrink-0" />
            03 — Método
          </div>
        </ScrollReveal>

        <ScrollReveal delay={1}>
          <h2 className="section-heading-accent font-serif text-[clamp(32px,4.5vw,56px)] font-normal text-[var(--editorial)] leading-[1.08] tracking-[-0.015em] mb-5">
            Estrutura antes
            <br />
            de estética.
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-12 items-start mt-14 md:grid-cols-2 md:gap-20">
          {/* Steps */}
          <div className="flex flex-col gap-0.5">
            <ScrollReveal delay={2}>
              <div className="flex flex-col gap-0.5">
                {METHOD_STEPS.map((step, index) => (
                  <Fragment key={step.num}>
                    <div
                      className="bg-[rgba(255,255,255,0.025)] border border-[rgba(184,196,204,0.08)] p-1 rounded-[1rem] transition-transform duration-500 [transition-timing-function:var(--ease-spring)] hover:translate-x-1 shimmer-on-hover card-glow"
                    >
                    <div className="bg-[var(--ardosia)] rounded-[calc(1rem-4px)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] px-4 py-4 md:px-6 md:py-[22px] grid grid-cols-[36px_1fr] gap-[18px] items-start">
                      <div className="font-serif text-[28px] text-[var(--crimson-lt)] leading-none font-normal">
                        {step.num}
                      </div>
                      <div>
                        <div className="text-[14px] font-semibold text-[var(--editorial)] mb-1">
                          {step.title}
                        </div>
                        <div className="text-[12.5px] text-[var(--prata)] leading-[1.6] !max-w-none">
                          {step.text}
                        </div>
                      </div>
                    </div>
                    </div>
                    {index < METHOD_STEPS.length - 1 && (
                      <div className="step-connector" data-reveal>
                        <div className="step-connector-dot" />
                      </div>
                    )}
                  </Fragment>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Aside with parallax */}
          <div className="md:sticky md:top-[120px]">
            <ScrollReveal delay={3}>
              <div ref={asideRef} className="flex flex-col gap-3.5 will-change-transform">
                {/* Quote */}
                <div className="bg-[rgba(255,255,255,0.025)] border border-[rgba(139,30,45,0.2)] p-1.5 rounded-[1.75rem]">
                  <div className="bg-[linear-gradient(135deg,rgba(139,30,45,0.1)_0%,rgba(26,26,34,0.95)_100%)] rounded-[calc(1.75rem-6px)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] px-10 py-12">
                    <p className="font-serif text-[clamp(22px,2.8vw,30px)] text-[var(--editorial)] leading-[1.25] mb-4">
                      &ldquo;Um império pode continuar sem o imperador. Mas não há imperador sem o império.&rdquo;
                    </p>
                    <p className="text-[11px] text-[var(--nevoa)] italic tracking-[0.05em]">
                      — Princípio operacional da Advologos
                    </p>
                  </div>
                </div>

                {/* Checklist */}
                <div className="bg-[rgba(255,255,255,0.025)] border border-[rgba(184,196,204,0.1)] p-1.25 rounded-[1.25rem]">
                  <div className="bg-[var(--ardosia)] rounded-[calc(1.25rem-5px)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] px-7 py-7 pb-6">
                    <div className="text-[10px] font-bold tracking-[0.16em] uppercase text-[var(--crimson-lt)] mb-5">
                      O que diferencia nossa entrega
                    </div>
                    <ul className="flex flex-col gap-3 list-none">
                      {CHECKLIST_ITEMS.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-3 text-[13px] text-[var(--prata)]"
                        >
                          <span className="w-[18px] h-[18px] rounded-full bg-[rgba(139,30,45,0.15)] border border-[rgba(139,30,45,0.35)] flex-shrink-0 flex items-center justify-center">
                            <Check className="h-2.5 w-2.5 text-[var(--crimson-lt)]" />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Horizontal Process Timeline — desktop only */}
      <div className="mt-14 hidden md:block">
        <ScrollReveal delay={4}>
          <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(184,196,204,0.06)] rounded-xl p-5">
            <div className="relative flex items-start justify-between">
              {/* Connecting line */}
              <div className="absolute top-[9px] left-[24px] right-[24px] h-px bg-gradient-to-r from-[var(--crimson)] via-[var(--crimson)] to-[rgba(139,30,45,0.2)] opacity-30" />
              <div
                className="absolute top-[9px] left-[24px] h-px bg-[var(--crimson)] opacity-60 transition-all duration-700 ease-out"
                style={{ width: `calc(${(activeStep / (METHOD_STEPS.length - 1)) * 100}% - 0px)` }}
              />

              {/* Steps */}
              {METHOD_STEPS.map((step, index) => (
                <div
                  key={step.num}
                  ref={(el) => { stepRefs.current[index] = el; }}
                  className="relative flex flex-col items-center gap-2 z-10"
                >
                  <div
                    className={`w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                      index <= activeStep
                        ? 'bg-[var(--crimson)] border-[var(--crimson)] scale-110'
                        : 'bg-transparent border-[rgba(184,196,204,0.2)]'
                    }`}
                  >
                    <span className="text-[8px] font-bold text-[var(--editorial)] leading-none">
                      {step.num}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] tracking-[0.1em] uppercase whitespace-nowrap transition-colors duration-500 ${
                      index <= activeStep
                        ? 'text-[var(--crimson-lt)] font-semibold'
                        : 'text-[var(--nevoa)]'
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
