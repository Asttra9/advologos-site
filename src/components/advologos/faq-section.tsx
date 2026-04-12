'use client';

import { FAQ_ITEMS } from '@/lib/constants';
import { ScrollReveal } from './scroll-reveal';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

export function FAQSection() {
  return (
    <section
      id="faq"
      className="py-20 border-b border-[rgba(184,196,204,0.08)] md:py-32"
      aria-label="Perguntas frequentes"
    >
      <div className="max-w-[1160px] mx-auto px-5 md:px-12">
        <ScrollReveal>
          <div className="section-wave-separator mb-14" />
        </ScrollReveal>

        <ScrollReveal>
          <div className="inline-flex items-center gap-2.5 text-[10px] font-bold tracking-[0.18em] uppercase text-[var(--crimson-lt)] mb-5">
            <span className="block w-5 h-px bg-[var(--crimson-lt)] flex-shrink-0" />
            06 — Perguntas Frequentes
          </div>
        </ScrollReveal>

        <ScrollReveal delay={1}>
          <h2 className="section-heading-accent section-heading-underline font-serif text-[clamp(32px,4.5vw,56px)] font-normal text-[var(--editorial)] leading-[1.08] tracking-[-0.015em] mb-5">
            Dúvidas comuns.
            <br />
            Respostas diretas.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={2}>
          <p className="text-[var(--prata)] text-[15px] leading-[1.8] max-w-[620px] mb-14">
            Antes de qualquer projeto, respondemos com clareza. Nossa abordagem é
            documentada, transparente e construída sobre o que o Provimento da
            OAB permite — e incentiva.
          </p>
        </ScrollReveal>

        <Accordion type="single" collapsible className="flex flex-col gap-3">
          {FAQ_ITEMS.map((item, index) => (
            <ScrollReveal key={item.question} delay={index + 1}>
              <div className="faq-item-wrap faq-item-hover">
                <div className="bg-[rgba(255,255,255,0.025)] border border-[rgba(184,196,204,0.08)] p-1 rounded-[1rem]">
                  <AccordionItem
                    value={item.question}
                    className="border-0 rounded-[calc(1rem-4px)] bg-[var(--ardosia)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] px-4 py-4 md:px-6 md:py-5"
                  >
                    <AccordionTrigger className="text-[var(--editorial)] font-semibold text-[clamp(13px,3vw,14px)] leading-snug hover:text-[var(--crimson-lt)] hover:no-underline transition-colors duration-200 py-0 gap-4 [&>svg:last-child]:text-[var(--crimson-lt)] [&>svg:last-child]:size-4 [&>svg:last-child]:shrink-0">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-[var(--prata)] text-[clamp(12.5px,2.8vw,13px)] leading-[1.65] pt-3 pb-0">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
