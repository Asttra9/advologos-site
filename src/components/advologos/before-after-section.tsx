'use client';

import { Check } from 'lucide-react';
import { ScrollReveal } from './scroll-reveal';

const BEFORE_AFTER_CASES = [
  {
    client: 'Advocacia individual em estruturação',
    specialty: 'Escopo inicial de marca',
    plan: 'Signum',
    metric: { value: 'Clareza', label: 'objetivo principal' },
    before: ['Logo isolado', 'Aplicações sem padrão', 'Tom de voz inconsistente', 'Presença digital improvisada'],
    after: ['Sistema visual base', 'Diretrizes de uso', 'Pontos de contato padronizados', 'Marca operável desde o primeiro ciclo'],
  },
  {
    client: 'Profissional em fase de consolidação',
    specialty: 'Profissionalização dos pontos de contato',
    plan: 'Nomen',
    metric: { value: 'Profissionalização', label: 'objetivo principal' },
    before: ['Identidade sem desdobramentos', 'Perfil e bio sem critério', 'Materiais profissionais ausentes', 'Apresentação fragmentada'],
    after: ['Cartão e papel timbrado alinhados', 'Bio e foto de perfil padronizadas', 'Kit inicial para redes sociais', 'Presença mais consistente em cada contato'],
  },
  {
    client: 'Escritório boutique em rebranding',
    specialty: 'Reposicionamento de percepção',
    plan: 'Autoritas',
    metric: { value: 'Consistência', label: 'objetivo principal' },
    before: ['Peças desconectadas', 'Website e social sem unidade', 'Mensagem pouco precisa', 'Materiais comerciais genéricos'],
    after: ['Posicionamento documentado', 'Aplicações digitais coerentes', 'Templates estratégicos', 'Proposta visual unificada'],
  },
  {
    client: 'Operação jurídica com presença fragmentada',
    specialty: 'Estruturação ampliada de marca',
    plan: 'Imperium',
    metric: { value: 'Autoridade', label: 'objetivo principal' },
    before: ['Marca sem sistema', 'Múltiplos canais sem critério', 'Baixa coerência visual', 'Falta de documentação interna'],
    after: ['Arquitetura visual escalável', 'Guidelines completos', 'Presença digital integrada', 'Base para expansão com consistência'],
  },
];

export function BeforeAfterSection() {
  return (
    <section
      id="resultados"
      className="py-20 border-b border-[rgba(184,196,204,0.08)] md:py-32"
      aria-label="Resultados de Branding"
    >
      <div className="max-w-[1160px] mx-auto px-5 md:px-12">
        {/* Section header */}
        <ScrollReveal>
          <div className="inline-flex items-center gap-2.5 text-[10px] font-bold tracking-[0.18em] uppercase text-[var(--crimson-lt)] mb-5">
            <span className="block w-5 h-px bg-[var(--crimson-lt)] flex-shrink-0" />
            10 — Resultados
          </div>
        </ScrollReveal>

        <ScrollReveal delay={1}>
          <h2 className="section-heading-accent font-serif text-[clamp(32px,4.5vw,56px)] font-normal text-[var(--editorial)] leading-[1.08] tracking-[-0.015em] mb-5">
            Antes da Advologos.
            <br />
            Depois da marca.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={2}>
          <p className="text-[var(--prata)] text-[15px] leading-[1.8] max-w-[620px] mb-14">
            Referências de transformação típicas para quem deixa de tratar marca como peça solta e passa a operar com sistema.
          </p>
        </ScrollReveal>

        {/* Before/After cards */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-5">
          {BEFORE_AFTER_CASES.map((item, i) => (
            <ScrollReveal key={item.client} delay={i + 3}>
              <div className="h-full bg-[rgba(255,255,255,0.025)] border border-[rgba(184,196,204,0.08)] rounded-2xl p-5 md:p-6 hover:border-[rgba(184,196,204,0.18)] transition-all duration-500 shimmer-on-hover flex flex-col">
                {/* Client header */}
                <div className="mb-4">
                  <h3 className="font-serif text-[17px] font-normal text-[var(--editorial)] leading-[1.3] mb-1">
                    {item.client}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-[var(--nevoa)]">
                      {item.specialty}
                    </span>
                    <span className="text-[10px] font-bold tracking-[0.12em] uppercase text-[var(--crimson-lt)] bg-[rgba(139,30,45,0.12)] border border-[rgba(139,30,45,0.25)] rounded-full px-2.5 py-0.5">
                      {item.plan}
                    </span>
                  </div>
                </div>

                {/* Before / After panels */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3">
                  {/* ANTES */}
                  <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(184,196,204,0.06)] rounded-lg p-4 h-full">
                    <span className="text-[10px] font-bold tracking-[0.12em] uppercase text-[var(--nevoa)] block mb-3">
                      Antes
                    </span>
                    <ul className="flex flex-col gap-2 list-none">
                      {item.before.map((text) => (
                        <li
                          key={text}
                          className="text-[12px] text-[var(--nevoa)] leading-[1.5] flex items-start gap-2"
                        >
                          <span className="text-[var(--crimson-dp)] mt-px flex-shrink-0">×</span>
                          {text}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* DEPOIS */}
                  <div className="bg-[rgba(139,30,45,0.06)] border border-[rgba(139,30,45,0.15)] rounded-lg p-4 h-full">
                    <span className="text-[10px] font-bold tracking-[0.12em] uppercase text-[var(--crimson-lt)] block mb-3">
                      Depois
                    </span>
                    <ul className="flex flex-col gap-2 list-none">
                      {item.after.map((text) => (
                        <li
                          key={text}
                          className="text-[12px] text-[var(--editorial)] leading-[1.5] flex items-start gap-2"
                        >
                          <Check className="h-3 w-3 text-[var(--crimson-lt)] mt-px flex-shrink-0" />
                          {text}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Result metric divider */}
                <div className="mt-auto pt-5 border-t border-[rgba(184,196,204,0.08)] text-center">
                  <span className="font-serif text-[28px] text-[var(--crimson-lt)] leading-[1.1] block">
                    {item.metric.value}
                  </span>
                  <span className="text-[10px] font-medium tracking-[0.08em] uppercase text-[var(--nevoa)] mt-1 block">
                    {item.metric.label}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
