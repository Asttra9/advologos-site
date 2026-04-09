'use client';

import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { ScrollReveal } from './scroll-reveal';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { FAQ_ITEMS } from '@/lib/constants';

export function FAQSection() {
  const [query, setQuery] = useState('');

  const filteredItems = useMemo(() => {
    if (!query.trim()) return FAQ_ITEMS;
    const lower = query.toLowerCase();
    return FAQ_ITEMS.filter(
      (item) =>
        item.question.toLowerCase().includes(lower) ||
        item.answer.toLowerCase().includes(lower)
    );
  }, [query]);

  return (
    <section
      id="faq"
      className="py-20 border-b border-[rgba(184,196,204,0.08)] md:py-32"
      aria-label="Perguntas frequentes"
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
            06 — Perguntas Frequentes
          </div>
        </ScrollReveal>

        <ScrollReveal delay={1}>
          <h2 className="section-heading-accent font-serif text-[clamp(32px,4.5vw,56px)] font-normal text-[var(--editorial)] leading-[1.08] tracking-[-0.015em] mb-5">
            Dúvidas comuns.
            <br />
            Respostas diretas.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={3}>
          <p className="text-[var(--prata)] text-[15px] leading-[1.8] max-w-[620px] mb-14">
            Antes de qualquer projeto, respondemos com clareza. Nossa abordagem é
            documentada, transparente e construída sobre o que o Provimento da
            OAB permite — e incentiva.
          </p>
        </ScrollReveal>

        {/* Search input */}
        <ScrollReveal delay={2}>
          <div className="relative mb-3 max-w-[480px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--nevoa)] pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar perguntas..."
              className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(184,196,204,0.15)] rounded-xl py-3 px-4 pl-10 text-[var(--editorial)] text-sm placeholder:text-[var(--nevoa)] focus:border-[var(--crimson)] focus:outline-none transition-colors duration-300"
              aria-label="Buscar perguntas frequentes"
            />
          </div>

          {/* Counter */}
          <p className="text-[11px] text-[var(--nevoa)] mb-8">
            Exibindo {filteredItems.length} de {FAQ_ITEMS.length} perguntas
          </p>
        </ScrollReveal>

        {/* No results message */}
        {filteredItems.length === 0 && (
          <div className="faq-empty-state py-12 text-center">
            <p className="text-[var(--prata)] text-[15px]">
              Nenhum resultado para &lsquo;{query}&rsquo;
            </p>
            <p className="text-[var(--nevoa)] text-[13px] mt-2">
              Tente buscar com outras palavras-chave.
            </p>
          </div>
        )}

        {/* FAQ items */}
        <Accordion type="single" collapsible className="flex flex-col gap-3">
          {FAQ_ITEMS.map((item, index) => {
            const isHidden = query.trim() !== '' && !filteredItems.includes(item);
            return (
              <div
                key={item.question}
                className={`faq-item-wrap faq-item-hover transition-all duration-500 [transition-timing-function:var(--ease-expo)] ${
                  isHidden
                    ? 'faq-item-hidden opacity-0 max-h-0 overflow-hidden pointer-events-none mb-0'
                    : 'opacity-100 max-h-[600px]'
                }`}
              >
                <ScrollReveal delay={index + 1}>
                  <div className="bg-[rgba(255,255,255,0.025)] border border-[rgba(184,196,204,0.08)] p-1 rounded-[1rem]">
                    <AccordionItem
                      value={item.question}
                      className="border-0 rounded-[calc(1rem-4px)] bg-[var(--ardosia)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] px-6 py-5"
                    >
                      <AccordionTrigger className="text-[var(--editorial)] font-semibold text-[14px] leading-snug hover:text-[var(--crimson-lt)] hover:no-underline transition-colors duration-200 py-0 gap-4 [&>svg:last-child]:text-[var(--crimson-lt)] [&>svg:last-child]:size-4 [&>svg:last-child]:shrink-0">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-[var(--prata)] text-[13px] leading-[1.65] pt-3 pb-0">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </div>
                </ScrollReveal>
              </div>
            );
          })}
        </Accordion>
      </div>
    </section>
  );
}
