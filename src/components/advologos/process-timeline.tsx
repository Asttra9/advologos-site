'use client';

import { MessageSquare, Search, LayoutDashboard, CheckCircle } from 'lucide-react';
import { ScrollReveal } from './scroll-reveal';

const TIMELINE_STEPS = [
  {
    number: 1,
    title: 'Primeiro contato',
    description:
      'Envie sua mensagem pelo WhatsApp ou formulário. O retorno acontece pelo canal informado, com contexto e sem resposta automática genérica.',
    Icon: MessageSquare,
  },
  {
    number: 2,
    title: 'Diagnóstico inicial',
    description:
      'Analisamos seu cenário atual e apresentamos um plano personalizado — sem compromisso.',
    Icon: Search,
  },
  {
    number: 3,
    title: 'Projeto em andamento',
    description:
      'Acompanhe cada etapa em tempo real. Revisões documentadas e aprovação por fase.',
    Icon: LayoutDashboard,
  },
  {
    number: 4,
    title: 'Entrega + documentação',
    description:
      'Marca entregue com brand guidelines, arquivos originais e instruções de uso completas.',
    Icon: CheckCircle,
  },
];

export function ProcessTimeline() {
  return (
    <section
      id="processo"
      className="py-20 border-b border-[rgba(184,196,204,0.08)] md:py-32"
      aria-label="Processo de atendimento"
    >
      <div className="max-w-[1160px] mx-auto px-5 md:px-12">
        {/* Section header */}
        <ScrollReveal>
          <div className="inline-flex items-center gap-2.5 text-[10px] font-bold tracking-[0.18em] uppercase text-[var(--crimson-lt)] mb-5">
            <span className="block w-5 h-px bg-[var(--crimson-lt)] flex-shrink-0" />
            08 — Como funciona
          </div>
        </ScrollReveal>

        <ScrollReveal delay={1}>
          <h2 className="section-heading-accent font-serif text-[clamp(32px,4.5vw,56px)] font-normal text-[var(--editorial)] leading-[1.08] tracking-[-0.015em] mb-5">
            Do primeiro contato
            <br />
            à marca entregue.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={2}>
          <p className="text-[var(--prata)] text-[15px] leading-[1.8] max-w-[620px] mb-16">
            Um processo claro, documentado e sem surpresas. Você acompanha cada fase e aprova antes de avançar.
          </p>
        </ScrollReveal>

        {/* Timeline — Desktop: horizontal / Mobile: vertical */}
        <div className="relative">
          {/* Desktop horizontal timeline */}
          <div className="hidden md:block relative">
            {/* Connecting line */}
            <div className="absolute top-[32px] left-[64px] right-[64px] h-px bg-[rgba(139,30,45,0.25)]" />

            <div className="grid grid-cols-4 gap-6 relative">
              {TIMELINE_STEPS.map((step, i) => {
                const StepIcon = step.Icon;
                return (
                  <ScrollReveal key={step.number} delay={i + 1}>
                    <div className="flex flex-col items-center text-center relative">
                      {/* Step number circle */}
                      <div className="relative z-10 mb-5">
                        <div className="w-16 h-16 rounded-full bg-[var(--crimson)] flex items-center justify-center shadow-[0_0_20px_rgba(139,30,45,0.3)] transition-transform duration-300 hover:scale-110">
                          <StepIcon className="h-6 w-6 text-[var(--editorial)]" />
                        </div>
                        <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[var(--grafite)] border border-[rgba(139,30,45,0.4)] flex items-center justify-center text-[10px] font-bold text-[var(--crimson-lt)]">
                          {step.number}
                        </span>
                      </div>

                      {/* Content */}
                      <h3 className="font-serif text-[16px] text-[var(--editorial)] leading-[1.3] mb-2.5">
                        {step.title}
                      </h3>
                      <p className="text-[13px] text-[var(--prata)] leading-[1.6] max-w-[220px]">
                        {step.description}
                      </p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>

          {/* Mobile vertical timeline */}
          <div className="md:hidden relative pl-10">
            {/* Connecting line */}
            <div className="absolute top-[16px] left-[15px] bottom-[16px] w-px bg-[rgba(139,30,45,0.25)]" />

            <div className="flex flex-col gap-8">
              {TIMELINE_STEPS.map((step, i) => {
                const StepIcon = step.Icon;
                return (
                  <ScrollReveal key={step.number} delay={i + 1}>
                    <div className="relative flex items-start gap-5">
                      {/* Step number circle */}
                      <div className="relative z-10 flex-shrink-0 -ml-[25px]">
                        <div className="w-8 h-8 rounded-full bg-[var(--crimson)] flex items-center justify-center shadow-[0_0_12px_rgba(139,30,45,0.3)]">
                          <StepIcon className="h-3.5 w-3.5 text-[var(--editorial)]" />
                        </div>
                        <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[var(--grafite)] border border-[rgba(139,30,45,0.4)] flex items-center justify-center text-[8px] font-bold text-[var(--crimson-lt)]">
                          {step.number}
                        </span>
                      </div>

                      {/* Content */}
                      <div>
                        <h3 className="font-serif text-[15px] text-[var(--editorial)] leading-[1.3] mb-1.5">
                          {step.title}
                        </h3>
                        <p className="text-[13px] text-[var(--prata)] leading-[1.6]">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
