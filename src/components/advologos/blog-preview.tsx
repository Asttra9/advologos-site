'use client';

import { ScrollReveal } from './scroll-reveal';
import { Clock, Calendar, Scale, BookOpen, TrendingUp } from 'lucide-react';

const BLOG_ICONS = [Scale, BookOpen, TrendingUp];
const EDITORIAL_TOPICS = [
  {
    category: 'Branding',
    title: 'Estrutura de marca para profissionais do direito',
    excerpt: 'Como transformar identidade visual, tom de voz e aplicações em um sistema coerente para o mercado jurídico.',
    status: 'Em preparação',
  },
  {
    category: 'Posicionamento',
    title: 'Presença digital com clareza regulatória',
    excerpt: 'Diretrizes para comunicar autoridade sem promessas infladas e sem violar os limites éticos da advocacia.',
    status: 'Em preparação',
  },
  {
    category: 'Mercado Legal',
    title: 'Percepção, coerência e valor percebido',
    excerpt: 'Temas editoriais que conectam forma, critério e posicionamento para escritórios e advogados.',
    status: 'Em preparação',
  },
];

export function BlogPreview() {
  return (
    <section
      id="blog"
      className="py-20 border-b border-[rgba(184,196,204,0.08)] md:py-32 section-gradient-dark"
      aria-label="Blog e Conteúdo"
    >
      <div className="max-w-[1160px] mx-auto px-5 md:px-12">
        {/* Section header */}
        <ScrollReveal>
          <div className="inline-flex items-center gap-2.5 text-[10px] font-bold tracking-[0.18em] uppercase text-[var(--crimson-lt)] mb-5">
            <span className="block w-5 h-px bg-[var(--crimson-lt)] flex-shrink-0" />
            09 — Blog &amp; Conteúdo
          </div>
        </ScrollReveal>

        <ScrollReveal delay={1}>
          <h2 className="font-serif text-[clamp(32px,4.5vw,56px)] font-normal text-[var(--editorial)] leading-[1.08] tracking-[-0.015em] mb-5">
            Insights sobre{' '}
            <br className="hidden md:block" />
            branding jurídico.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={2}>
          <p className="text-[var(--prata)] text-[15px] leading-[1.8] max-w-[620px] mb-14">
            A frente editorial da Advologos está em estruturação. Estes são os temas que orientam o conteúdo público da marca.
          </p>
        </ScrollReveal>

        {/* Article cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-5">
          {EDITORIAL_TOPICS.map((post, i) => {
            const DecorIcon = BLOG_ICONS[i] ?? Scale;
            return (
              <ScrollReveal key={post.category} delay={i + 3}>
                <article className="group block relative bg-[rgba(255,255,255,0.025)] border border-[rgba(184,196,204,0.08)] rounded-2xl p-6 hover:border-[rgba(184,196,204,0.18)] transition-all duration-500 shimmer-on-hover card-lift">
                  <span className="blog-new-badge">
                    {post.status}
                  </span>

                  {/* Placeholder image area with hover gradient overlay */}
                  <div className="h-[180px] rounded-xl mb-5 overflow-hidden relative flex items-center justify-center">
                    <div
                      className="absolute inset-0 transition-all duration-700 ease-out"
                      style={{
                        background:
                          'linear-gradient(135deg, rgba(139,30,45,0.15) 0%, rgba(26,26,34,0.95) 50%, rgba(139,30,45,0.08) 100%)',
                        backgroundSize: '200% 200%',
                        backgroundPosition: '0% 0%',
                      }}
                    />
                    <div className="blog-image-overlay" />
                    <DecorIcon className="h-12 w-12 text-[var(--crimson)] opacity-10 relative z-[1]" />
                  </div>

                  {/* Category pill */}
                  <span className="inline-block text-[10px] font-bold tracking-[0.12em] uppercase text-[var(--crimson-lt)] bg-[rgba(139,30,45,0.12)] border border-[rgba(139,30,45,0.25)] rounded-full px-3 py-1 mb-4">
                    {post.category}
                  </span>

                  {/* Title */}
                  <h3 className="font-serif text-[18px] font-normal text-[var(--editorial)] leading-[1.35] mb-3 group-hover:text-[var(--crimson-lt)] transition-colors duration-300">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-[13px] text-[var(--prata)] leading-[1.6] mb-5 !max-w-none">
                    {post.excerpt}
                  </p>

                  {/* Metadata */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-1.5 text-[11px] text-[var(--nevoa)]">
                      <Clock className="h-3.5 w-3.5" />
                      Conteúdo editorial
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-[var(--nevoa)]">
                      <Calendar className="h-3.5 w-3.5" />
                      Estrutura em andamento
                    </div>
                  </div>

                  {/* Status */}
                  <span className="inline-block text-[13px] font-semibold text-[var(--crimson-lt)] group-hover:translate-x-1 transition-transform duration-300">
                    Tema prioritário &rarr;
                  </span>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
