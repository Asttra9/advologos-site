'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { ScrollReveal } from './scroll-reveal';

interface Testimonial {
  name: string;
  oab: string;
  city: string;
  area: string;
  quote: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Dr. Ricardo Mendes',
    oab: 'OAB/SP 324.567',
    city: 'São Paulo, SP',
    area: 'Direito Tributário',
    quote:
      'A Advologos transformou completamente a forma como meus clientes me percebem. O logotipo e a identidade visual transmitiram exatamente a seriedade e a sofisticação que eu buscava para o meu escritório de advocacia tributária. O resultado superou todas as minhas expectativas e hoje recebo elogios constantes de pares e clientes.',
    rating: 5,
  },
  {
    name: 'Dra. Camila Ferreira',
    oab: 'OAB/RJ 187.432',
    city: 'Rio de Janeiro, RJ',
    area: 'Direito Trabalhista',
    quote:
      'Eu tinha uma ideia muito vaga do que queria para minha marca pessoal, e a equipe da Advologos conseguiu traduzir exatamente aquilo que eu não sabia expressar. As cores, a tipografia e os materiais entregues refletem com precisão a autoridade que construí ao longo de anos de atuação no direito trabalhista.',
    rating: 5,
  },
  {
    name: 'Dr. André Oliveira',
    oab: 'OAB/MG 98.765',
    city: 'Belo Horizonte, MG',
    area: 'Direito Empresarial',
    quote:
      'Quando decidi reposicionar meu escritório, sabia que precisava de um parceiro que entendesse as nuances do mercado jurídico. A Advologos não apenas criou uma marca visualmente impecável — ela desenvolveu toda uma linguagem de comunicação que fortaleceu minha presença digital e gerou resultados concretos na captação de clientes.',
    rating: 5,
  },
  {
    name: 'Dra. Juliana Costa',
    oab: 'OAB/PR 156.234',
    city: 'Curitiba, PR',
    area: 'Direito Civil',
    quote:
      'Contratei a Advologos no pacote Autoritas e o investimento se pagou rapidamente. A landing page, os templates para redes sociais e o manual de marca me deram uma estrutura profissional que antes eu não tinha. Meus processos de captação se tornaram muito mais fluidos e orgânicos.',
    rating: 5,
  },
  {
    name: 'Dr. Felipe Santos',
    oab: 'OAB/DF 45.891',
    city: 'Brasília, DF',
    area: 'Direito Criminal',
    quote:
      'No direito criminal, a confiança é tudo. A Advologos entendeu isso desde o primeiro contato e criou uma identidade que transmite credibilidade sem parecer intimidadora. Cada detalhe do projeto — do logotipo ao papel timbrado — foi pensado para reforçar a minha autoridade perante clientes e colegas da advocacia.',
    rating: 5,
  },
];

const AUTOPLAY_INTERVAL = 5000;
const TOUCH_THRESHOLD = 50;

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i < rating
              ? 'fill-[var(--crimson)] text-[var(--crimson)]'
              : 'fill-transparent text-[rgba(184,196,204,0.2)]'
          }`}
        />
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const initials = testimonial.name
    .replace(/^(Dr\.|Dra\.)\s/, '')
    .split(' ')
    .filter((w) => w.length > 2)
    .slice(0, 2)
    .map((w) => w[0])
    .join('');

  return (
    <div className="group relative bg-[rgba(255,255,255,0.025)] border border-[rgba(184,196,204,0.1)] p-[5px] rounded-[1.25rem] transition-all duration-500 hover:border-[rgba(139,30,45,0.25)] card-glow h-full">
      <div className="bg-[var(--ardosia)] rounded-[calc(1.25rem-5px)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] p-5 md:p-6 h-full flex flex-col">
        {/* Quote icon */}
        <Quote className="h-7 w-7 text-[rgba(139,30,45,0.2)] mb-4 flex-shrink-0 transition-colors duration-500 group-hover:text-[rgba(139,30,45,0.4)]" />

        {/* Stars */}
        <StarRating rating={testimonial.rating} />

        {/* Quote text */}
        <blockquote className="relative font-serif text-[clamp(14px,2.5vw,16px)] italic text-[var(--prata-lt)] leading-[1.65] my-4 flex-1">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>

        {/* Author info */}
        <div className="flex items-center gap-3 pt-4 border-t border-[rgba(184,196,204,0.06)]">
          <div className="relative flex-shrink-0">
            <div className="absolute inset-[-5px] rounded-full bg-[radial-gradient(circle,rgba(139,30,45,0.2)_0%,transparent_70%)] pointer-events-none" />
            <div
              className="w-11 h-11 rounded-full p-[2px]"
              style={{
                background:
                  'radial-gradient(circle at 30% 30%, var(--crimson), rgba(139,30,45,0.15), transparent)',
              }}
            >
              <div className="w-full h-full rounded-full bg-[var(--ardosia)] flex items-center justify-center text-[var(--crimson-lt)] text-sm font-bold font-serif">
                {initials}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="font-serif italic text-[clamp(13px,2.2vw,15px)] text-[var(--crimson-lt)] truncate">
              {testimonial.name}
            </span>
            <span className="text-[clamp(10px,1.8vw,11px)] text-[var(--nevoa)] tracking-[0.06em] uppercase leading-tight">
              {testimonial.oab}
            </span>
            <span className="text-[clamp(10px,1.8vw,11px)] text-[var(--prata)] leading-tight">
              {testimonial.area} · {testimonial.city}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const touchStartRef = useRef<number | null>(null);
  const touchCurrentRef = useRef<number | null>(null);
  const isSwipingRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Responsive: 1 per page on mobile, 2 on tablet, 3 on desktop
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const totalPages = Math.ceil(TESTIMONIALS.length / itemsPerPage);
  const safePage = Math.min(currentPage, Math.max(0, totalPages - 1));

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      if (width >= 1024) {
        setItemsPerPage(3);
      } else if (width >= 768) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(1);
      }
    }

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const next = useCallback(() => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  }, [totalPages]);

  const prev = useCallback(() => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  }, [totalPages]);

  // Auto-play
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  // Touch handling
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX;
    touchCurrentRef.current = e.touches[0].clientX;
    isSwipingRef.current = true;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isSwipingRef.current || touchStartRef.current === null) return;
    touchCurrentRef.current = e.touches[0].clientX;
    const diff = touchCurrentRef.current - touchStartRef.current;
    setSwipeOffset(diff);
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (touchStartRef.current === null || touchCurrentRef.current === null) {
      setSwipeOffset(0);
      isSwipingRef.current = false;
      return;
    }

    const diff = touchCurrentRef.current - touchStartRef.current;

    if (Math.abs(diff) >= TOUCH_THRESHOLD) {
      if (diff < 0) {
        next();
      } else {
        prev();
      }
    }

    setSwipeOffset(0);
    touchStartRef.current = null;
    touchCurrentRef.current = null;
    isSwipingRef.current = false;
  }, [next, prev]);

  const getVisibleTestimonials = () => {
    const start = safePage * itemsPerPage;
    return TESTIMONIALS.slice(start, start + itemsPerPage);
  };

  return (
    <section
      id="depoimentos"
      className="py-20 md:py-32 border-t border-[rgba(184,196,204,0.08)] section-gradient-dark"
      aria-label="Depoimentos"
    >
      <div className="max-w-[1160px] mx-auto px-5 md:px-12">
        {/* Section divider */}
        <ScrollReveal>
          <div className="section-divider mb-14">
            <div className="section-divider-diamond" />
          </div>
        </ScrollReveal>

        {/* Header */}
        <ScrollReveal>
          <div className="max-w-[640px] mb-12">
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--crimson-lt)] mb-4 flex items-center gap-2">
              <span className="inline-block w-6 h-px bg-[var(--crimson)]" />
              12 — Depoimentos
            </p>
            <h2 className="section-heading-accent font-serif text-[clamp(32px,5vw,56px)] text-[var(--editorial)] leading-[1.05] tracking-[-0.02em] mb-5">
              O que dizem
              <br />
              <em className="text-[var(--crimson)] italic">sobre nós.</em>
            </h2>
            <p className="text-[var(--prata)] text-[15px] leading-[1.8]">
              Advogados de diferentes áreas e regiões do Brasil confiaram na Advologos para transformar suas marcas. Veja o que eles têm a dizer.
            </p>
          </div>
        </ScrollReveal>

        {/* Carousel */}
        <ScrollReveal delay={1}>
          <div
            ref={containerRef}
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Testimonial cards grid */}
            <div
              className="overflow-hidden rounded-2xl"
            >
              <div
                className="grid gap-5 transition-transform duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  gridTemplateColumns: `repeat(${itemsPerPage}, 1fr)`,
                  transform: swipeOffset
                    ? `translateX(${swipeOffset}px)`
                    : undefined,
                  transition: swipeOffset ? 'none' : undefined,
                }}
              >
                {getVisibleTestimonials().map((testimonial) => (
                  <TestimonialCard key={testimonial.name} testimonial={testimonial} />
                ))}
              </div>
            </div>

            {/* Navigation arrows */}
            {totalPages > 1 && (
              <>
                <button
                  onClick={prev}
                  aria-label="Depoimento anterior"
                  className="absolute top-1/2 -translate-y-1/2 -left-3 md:-left-5 w-9 h-9 rounded-full bg-[var(--ardosia-md)] border border-[rgba(184,196,204,0.1)] flex items-center justify-center text-[var(--prata)] hover:border-[rgba(139,30,45,0.3)] hover:text-[var(--crimson-lt)] transition-all duration-300 hover:scale-105 active:scale-95 z-10 shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={next}
                  aria-label="Próximo depoimento"
                  className="absolute top-1/2 -translate-y-1/2 -right-3 md:-right-5 w-9 h-9 rounded-full bg-[var(--ardosia-md)] border border-[rgba(184,196,204,0.1)] flex items-center justify-center text-[var(--prata)] hover:border-[rgba(139,30,45,0.3)] hover:text-[var(--crimson-lt)] transition-all duration-300 hover:scale-105 active:scale-95 z-10 shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </>
            )}
          </div>

          {/* Dots */}
          {totalPages > 1 && (
            <div className="flex gap-2.5 justify-center mt-8">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  aria-label={`Página ${i + 1} de depoimentos`}
                  className={`h-[8px] rounded-full transition-all duration-300 cursor-pointer ${
                    i === safePage
                      ? 'w-[28px] bg-[var(--crimson)] shadow-[0_0_8px_rgba(139,30,45,0.4)]'
                      : 'w-[8px] bg-[rgba(184,196,204,0.2)] hover:bg-[rgba(184,196,204,0.4)] active:scale-90'
                  }`}
                />
              ))}
            </div>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}
