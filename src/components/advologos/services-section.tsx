'use client';

import { useRef, useState } from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { ScrollReveal } from './scroll-reveal';
import { SERVICES, WHATSAPP_URL } from '@/lib/constants';
import type { ServiceItem } from '@/lib/constants';

function ServiceCard({
  service,
  isMonthly,
}: {
  service: ServiceItem;
  isMonthly: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const hasMonthlyPlan = Boolean(service.monthlyPrice);
  const showMonthly = isMonthly && hasMonthlyPlan;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    if (cardRef.current) {
      cardRef.current.style.transform = `perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) scale(1.01)`;
    }
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)';
    }
  };

  return (
    <div className={`relative h-full ${service.featured ? 'z-[2]' : ''}`}>
      {service.featured && (
        <span
          className="badge-shimmer absolute -top-3 right-6 bg-[var(--crimson)] text-[var(--editorial)] text-[9px] font-bold tracking-[0.15em] uppercase rounded-full px-3 py-1 shadow-lg z-10"
          style={{
            backgroundImage:
              'linear-gradient(110deg, var(--crimson) 0%, var(--crimson-lt) 40%, var(--crimson) 60%, var(--crimson-dp) 100%)',
          }}
        >
          Mais popular
        </span>
      )}

      {isMonthly && !hasMonthlyPlan && (
        <span className="absolute -top-2.5 right-6 text-[8px] font-semibold tracking-[0.1em] uppercase text-[var(--nevoa)] bg-[rgba(255,255,255,0.04)] border border-[rgba(184,196,204,0.1)] rounded-full px-2.5 py-0.5 z-10">
          Pagamento único
        </span>
      )}

      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`group h-full shimmer-on-hover card-glow bg-[rgba(255,255,255,0.025)] border p-[5px] rounded-[1.5rem] transition-[transform,box-shadow] duration-[300ms] ease-out cursor-default hover:-translate-y-1 [transform-style:preserve-3d] ${
          service.featured
            ? 'scale-[1.03] border-[rgba(139,30,45,0.4)] shadow-[0_20px_40px_rgba(0,0,0,0.4),0_0_40px_rgba(139,30,45,0.15)] hover:scale-[1.03] hover:shadow-[0_24px_48px_rgba(0,0,0,0.5),0_0_50px_rgba(139,30,45,0.2)]'
            : 'border-[rgba(184,196,204,0.1)]'
        }`}
      >
        <div
          className={`rounded-[calc(1.5rem-5px)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] p-10 h-full flex flex-col ${
            service.featured
              ? 'bg-[linear-gradient(145deg,rgba(139,30,45,0.14)_0%,rgba(26,26,34,0.98)_60%)]'
              : 'bg-[var(--ardosia)]'
          }`}
        >
          <div className="text-[9px] font-bold tracking-[0.2em] uppercase text-[var(--editorial)] bg-[rgba(139,30,45,0.12)] border border-[rgba(139,30,45,0.3)] rounded-full py-[3px] px-2.5 inline-block w-fit mb-6">
            {service.tier}
          </div>

          <h3 className="font-serif text-[34px] font-normal text-[var(--editorial)] leading-none tracking-[-0.01em] mb-1.5">
            {service.name}
          </h3>

          {service.meaning && (
            <p className="font-serif text-[13px] italic text-[var(--crimson-lt)] mb-6">
              {service.meaning}
            </p>
          )}

          <p className="text-[13px] text-[var(--prata)] leading-[1.7] mb-8 flex-1 !max-w-none">
            {service.description}
          </p>

          <ul className="flex flex-col gap-2.5 mb-3 list-none">
            {service.items.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 text-[13px] text-[var(--prata-lt)] leading-[1.5]"
              >
                <span className="w-1 h-1 rounded-full bg-[var(--crimson)] flex-shrink-0 mt-1.5" />
                {item}
              </li>
            ))}
          </ul>

          {showMonthly && service.monthlyExtraItems && service.monthlyExtraItems.length > 0 && (
            <div className="pricing-transition mb-4 pt-3 border-t border-[rgba(139,30,45,0.2)]">
              <div className="flex items-center gap-1.5 mb-2.5">
                <Sparkles className="h-3 w-3 text-[var(--crimson-lt)]" />
                <span className="text-[9px] font-bold tracking-[0.14em] uppercase text-[var(--crimson-lt)]">
                  Exclusivo assinatura
                </span>
              </div>
              <ul className="flex flex-col gap-2 list-none">
                {service.monthlyExtraItems.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-[13px] text-[var(--editorial)] leading-[1.5]"
                  >
                    <span className="w-1 h-1 rounded-full bg-[var(--crimson-lt)] flex-shrink-0 mt-1.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="pricing-transition mt-auto font-serif text-[13px] text-[var(--nevoa)] mb-4 pt-4">
            {showMonthly ? (
              <>
                A partir de&nbsp;
                <span className="text-[22px] text-[var(--editorial)] tracking-[-0.02em]">
                  {service.monthlyPrice}
                </span>
                {service.monthlyContractLabel && (
                  <span className="block text-[10px] text-[var(--nevoa)] mt-1">
                    {service.monthlyContractLabel}
                  </span>
                )}
              </>
            ) : (
              <>
                A partir de&nbsp;
                <span className="text-[22px] text-[var(--editorial)] tracking-[-0.02em]">
                  {service.price}
                </span>
              </>
            )}
          </div>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn-ripple flex items-center gap-2 text-[11px] font-bold tracking-[0.1em] uppercase rounded-full py-[11px] px-[11px] pl-[18px] cursor-pointer no-underline transition-all duration-400 [transition-timing-function:var(--ease-spring)] w-fit hover:translate-x-[1px] hover:-translate-y-[1px] ${
              service.featured
                ? 'bg-[var(--crimson)] border border-[var(--crimson)] text-[var(--editorial)] hover:bg-[var(--crimson-dp)] hover:border-[var(--crimson-dp)]'
                : 'bg-transparent border border-[rgba(184,196,204,0.18)] text-[var(--prata)] hover:border-[var(--crimson)] hover:text-[var(--editorial)] hover:bg-[rgba(139,30,45,0.1)]'
            }`}
          >
            Solicitar proposta
            <span className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-[rgba(255,255,255,0.06)] text-xs transition-transform duration-400 [transition-timing-function:var(--ease-spring)] group-hover:translate-x-[1px] group-hover:-translate-y-[1px]">
              <ArrowUpRight className="h-3 w-3" />
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

export function ServicesSection() {
  const [isMonthly, setIsMonthly] = useState(false);

  return (
    <section
      id="servicos"
      className="py-20 border-b border-[rgba(184,196,204,0.08)] md:py-32"
      aria-label="Serviços"
    >
      <div className="max-w-[1160px] mx-auto px-5 md:px-12">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2.5 text-[10px] font-bold tracking-[0.18em] uppercase text-[var(--crimson-lt)] mb-5">
            <span className="block w-5 h-px bg-[var(--crimson-lt)] flex-shrink-0" />
            02 — Serviços
          </div>
        </ScrollReveal>

        <ScrollReveal delay={1}>
          <h2 className="section-heading-accent font-serif text-[clamp(32px,4.5vw,56px)] font-normal text-[var(--editorial)] leading-[1.08] tracking-[-0.015em] mb-5">
            Quatro níveis.
            <br />
            Um sistema coerente.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={2}>
          <p className="text-[var(--prata)] text-[15px] leading-[1.8] max-w-[620px]">
            Cada pacote é estruturado para um momento específico da trajetória do profissional jurídico. Não existe hierarquia de importância, existe adequação ao contexto e ao escopo do projeto.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={3}>
          <div className="flex flex-col items-center mt-10 mb-8 gap-2">
            <div className="inline-flex items-center bg-[rgba(255,255,255,0.04)] border border-[rgba(184,196,204,0.1)] rounded-full p-[3px]">
              <button
                type="button"
                onClick={() => setIsMonthly(false)}
                className={`relative text-[11px] font-bold tracking-[0.1em] uppercase px-5 py-2 rounded-full transition-all duration-300 cursor-pointer border-0 ${
                  !isMonthly
                    ? 'bg-[var(--crimson)] text-[var(--editorial)]'
                    : 'bg-transparent text-[var(--nevoa)] hover:text-[var(--prata)]'
                }`}
              >
                Pagamento único
              </button>
              <button
                type="button"
                onClick={() => setIsMonthly(true)}
                className={`relative text-[11px] font-bold tracking-[0.1em] uppercase px-5 py-2 rounded-full transition-all duration-300 cursor-pointer border-0 ${
                  isMonthly
                    ? 'bg-[var(--crimson)] text-[var(--editorial)]'
                    : 'bg-transparent text-[var(--nevoa)] hover:text-[var(--prata)]'
                }`}
              >
                Assinatura mensal
              </button>
            </div>
            {isMonthly && (
              <span className="text-[10px] text-[var(--nevoa)] tracking-wide">
                Disponível para Autoritas e Imperium
              </span>
            )}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={4}>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:items-stretch md:gap-[10px]">
            {SERVICES.map((service) => (
              <ServiceCard key={service.name} service={service} isMonthly={isMonthly} />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
