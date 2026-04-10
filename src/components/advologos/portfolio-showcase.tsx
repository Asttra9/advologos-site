'use client';

import { useState, useRef, useCallback } from 'react';
import { Check, Sparkles } from 'lucide-react';
import { ScrollReveal } from './scroll-reveal';

interface PortfolioProject {
  client: string;
  specialty: string;
  plan: string;
  category: string;
  description: string;
  results: string[];
  tags: string[];
  gradient: string;
}

const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    client: 'Identidade Inicial',
    specialty: 'Fundação para posicionamento',
    plan: 'Signum',
    category: 'Marca Base',
    description: 'Escopo pensado para advogados e escritórios em fase de organização visual e primeira presença pública coerente.',
    results: ['Logotipo e sistema visual base', 'Manual essencial de uso', 'Assinatura e aplicações iniciais'],
    tags: ['Identidade', 'Manual', 'Aplicações'],
    gradient: 'linear-gradient(135deg, rgba(139,30,45,0.25) 0%, rgba(26,26,34,0.95) 60%)',
  },
  {
    client: 'Marca Profissional',
    specialty: 'Materiais consistentes',
    plan: 'Nomen',
    category: 'Profissional',
    description: 'Para advogados que já possuem base visual e precisam de materiais profissionais alinhados para impressionar em cada ponto de contato.',
    results: ['Cartão de visitas profissional', 'Papel timbrado diagramado', 'Kit completo para redes sociais'],
    tags: ['Profissional', 'Cartão', 'Redes Sociais'],
    gradient: 'linear-gradient(135deg, rgba(155,163,173,0.15) 0%, rgba(26,26,34,0.95) 60%)',
  },
  {
    client: 'Rebranding Completo',
    specialty: 'Reposicionamento com critério',
    plan: 'Autoritas',
    category: 'Reposicionamento',
    description: 'Formato para quem já atua no mercado, mas precisa alinhar percepção, mensagem e presença digital com mais autoridade.',
    results: ['Reposicionamento visual documentado', 'Aplicações digitais alinhadas', 'Templates estratégicos'],
    tags: ['Rebranding', 'Templates', 'Website'],
    gradient: 'linear-gradient(135deg, rgba(165,37,53,0.2) 0%, rgba(13,13,15,0.95) 60%)',
  },
  {
    client: 'Sistema de Marca',
    specialty: 'Escala com consistência',
    plan: 'Imperium',
    category: 'Sistema Visual',
    description: 'Projeto voltado a operações que precisam aplicar a marca em múltiplos canais com documentação robusta e critérios claros.',
    results: ['Brand guidelines ampliado', 'Estratégia de conteúdo base', 'Aplicações multi-canal'],
    tags: ['Guidelines', 'Estratégia', 'Escalabilidade'],
    gradient: 'linear-gradient(135deg, rgba(107,21,32,0.22) 0%, rgba(26,26,34,0.95) 55%)',
  },
  {
    client: 'Website Institucional',
    specialty: 'Presença digital principal',
    plan: 'Autoritas',
    category: 'Presença Digital',
    description: 'Escopo de presença digital para quem precisa traduzir posicionamento em um website claro, coerente e alinhado à marca.',
    results: ['Arquitetura visual para site', 'Hierarquia de conteúdo', 'CTA e presença institucional'],
    tags: ['Website', 'Conteúdo', 'Hierarquia'],
    gradient: 'linear-gradient(135deg, rgba(139,30,45,0.18) 0%, rgba(20,20,28,0.95) 65%)',
  },
  {
    client: 'Templates Operacionais',
    specialty: 'Rotina visual consistente',
    plan: 'Autoritas',
    category: 'Aplicações',
    description: 'Conjunto de peças para manter coerência no cotidiano da operação, da proposta comercial às publicações de presença digital.',
    results: ['Templates para conteúdo', 'Peças institucionais', 'Sistema replicável pela equipe'],
    tags: ['Templates', 'Rotina', 'Operação'],
    gradient: 'linear-gradient(135deg, rgba(139,30,45,0.2) 0%, rgba(22,22,30,0.95) 55%)',
  },
  {
    client: 'Guidelines Interativo',
    specialty: 'Documentação viva da marca',
    plan: 'Imperium',
    category: 'Documentação',
    description: 'Entrega para equipes que precisam operar a marca com autonomia, clareza de uso e padrão replicável em novos canais.',
    results: ['Critérios de aplicação', 'Regras de uso por contexto', 'Base para expansão sem ruído'],
    tags: ['Documentação', 'Governança', 'Marca'],
    gradient: 'linear-gradient(135deg, rgba(165,37,53,0.15) 0%, rgba(18,18,24,0.95) 60%)',
  },
];

const PLAN_COLORS: Record<string, string> = {
  Signum: 'bg-[rgba(184,196,204,0.1)] text-[var(--prata)] border-[rgba(184,196,204,0.15)]',
  Nomen: 'bg-[rgba(184,196,204,0.1)] text-[var(--prata-lt)] border-[rgba(184,196,204,0.18)]',
  Autoritas: 'bg-[rgba(139,30,45,0.12)] text-[var(--crimson-lt)] border-[rgba(139,30,45,0.3)]',
  Imperium: 'bg-[rgba(165,37,53,0.15)] text-[var(--crimson)] border-[rgba(165,37,53,0.35)]',
};

const ALL_CATEGORIES = Array.from(new Set(PORTFOLIO_PROJECTS.map((p) => p.category)));

function ProjectCard({ project, index }: { project: PortfolioProject; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Generate monogram initials
  const initials = project.client
    .replace(/^(Dr\.|Dra\.)\s/, '')
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    if (cardRef.current) {
      cardRef.current.style.transform = `perspective(800px) rotateY(${x * 2}deg) rotateX(${-y * 2}deg) scale(1.01)`;
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)';
    }
  }, []);

  return (
    <ScrollReveal delay={(index % 3) + 1}>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative rounded-2xl border border-[rgba(184,196,204,0.08)] overflow-hidden portfolio-card-glow"
      >
        {/* Card header with gradient background */}
        <div
          className="relative h-44 md:h-48 p-6 flex flex-col justify-between overflow-hidden transition-all duration-500"
          style={{ background: project.gradient }}
        >
          {/* Grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.03] transition-opacity duration-500"
            style={{
              backgroundImage:
                'linear-gradient(rgba(184,196,204,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(184,196,204,0.4) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          {/* Category tag + plan badge */}
          <div className="relative z-[2] flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-[9px] font-bold tracking-[0.12em] uppercase text-[var(--crimson-lt)] bg-[rgba(13,13,15,0.5)] border border-[rgba(139,30,45,0.2)] rounded-full px-2.5 py-1 backdrop-blur-sm">
              <Sparkles className="h-2.5 w-2.5" />
              {project.category}
            </span>
            <span className={`inline-flex text-[8px] font-bold tracking-[0.1em] uppercase rounded-full px-2 py-0.5 border ${PLAN_COLORS[project.plan] || PLAN_COLORS.Signum}`}>
              {project.plan}
            </span>
          </div>

          {/* Client monogram + name */}
          <div className="relative z-[2]">
            <div
              className="inline-flex items-center justify-center w-12 h-12 rounded-xl border border-[rgba(139,30,45,0.25)] bg-[rgba(139,30,45,0.1)] mb-3 transition-all duration-500 group-hover:scale-105 group-hover:border-[rgba(139,30,45,0.5)] group-hover:bg-[rgba(139,30,45,0.18)]"
            >
              <span className="font-serif text-[var(--editorial)] text-lg font-bold tracking-wide">
                {initials}
              </span>
            </div>
            <h3 className="font-serif text-[var(--editorial)] text-[18px] leading-tight tracking-[-0.01em]">
              {project.client}
            </h3>
            <p className="text-[var(--nevoa)] text-[11px] mt-1 tracking-wide">
              {project.specialty}
            </p>
          </div>

          {/* Decorative corner accent */}
          <div className="absolute bottom-0 right-0 w-24 h-24 opacity-[0.06] pointer-events-none">
            <div className="absolute bottom-4 right-4 w-16 h-16 border border-[var(--crimson)] rounded-tl-[40px]" />
          </div>
        </div>

        {/* Gradient border glow overlay */}
        <div className="absolute inset-0 rounded-2xl pointer-events-none z-[3] opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ boxShadow: 'inset 0 0 0 1px rgba(139,30,45,0.15), 0 0 30px rgba(139,30,45,0.06)' }} />

        {/* Card body */}
        <div className="p-5 md:p-6 bg-[rgba(13,13,15,0.4)]">
          <p className="text-[var(--prata)] text-[13px] leading-[1.7] mb-5">
            {project.description}
          </p>

          {/* Results */}
          <div className="space-y-2.5 mb-5">
            <p className="text-[9px] font-bold tracking-[0.15em] uppercase text-[var(--nevoa)]">
              Resultados
            </p>
            {project.results.map((result) => (
              <div key={result} className="flex items-start gap-2">
                <Check className="h-3.5 w-3.5 text-[var(--crimson-lt)] mt-0.5 flex-shrink-0" />
                <span className="text-[var(--editorial)] text-[12px] leading-[1.5]">{result}</span>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[rgba(184,196,204,0.06)]">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[9px] font-medium tracking-[0.06em] text-[var(--nevoa-lt)] bg-[rgba(255,255,255,0.03)] border border-[rgba(184,196,204,0.06)] rounded-md px-2 py-0.5"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}

export function PortfolioShowcase() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const filteredProjects = activeFilter
    ? PORTFOLIO_PROJECTS.filter((p) => p.category === activeFilter)
    : PORTFOLIO_PROJECTS;

  return (
    <section
      id="portfolio"
      className="py-20 md:py-32"
      aria-label="Escopos de entrega"
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
          <div className="max-w-[640px] mb-10">
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--crimson-lt)] mb-4 flex items-center gap-2">
              <span className="inline-block w-6 h-px bg-[var(--crimson)]" />
              11 — Escopos
            </p>
            <h2 className="section-heading-accent font-serif text-[clamp(32px,5vw,56px)] text-[var(--editorial)] leading-[1.05] tracking-[-0.02em] mb-5">
              Formatos de
              <br />
              <em className="text-[var(--crimson)] italic">entrega.</em>
            </h2>
            <p className="text-[var(--prata)] text-[15px] leading-[1.8]">
              Exemplos de escopo para mostrar como a Advologos distribui marca, presença digital e documentação ao longo dos pacotes.
            </p>
          </div>
        </ScrollReveal>

        {/* Filter tabs */}
        <ScrollReveal delay={1}>
          <div className="flex flex-wrap gap-2 mb-10">
            <button
              type="button"
              onClick={() => setActiveFilter(null)}
              className={`text-[10px] font-bold tracking-[0.1em] uppercase rounded-full px-3.5 py-1.5 border transition-all duration-300 cursor-pointer ${
                activeFilter === null
                  ? 'bg-[var(--crimson)] text-[var(--editorial)] border-[var(--crimson)]'
                  : 'bg-transparent text-[var(--nevoa)] border-[rgba(184,196,204,0.1)] hover:border-[rgba(139,30,45,0.3)] hover:text-[var(--crimson-lt)]'
              }`}
            >
              Todos
            </button>
            {ALL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveFilter(activeFilter === cat ? null : cat)}
                className={`text-[10px] font-bold tracking-[0.1em] uppercase rounded-full px-3.5 py-1.5 border transition-all duration-300 cursor-pointer ${
                  activeFilter === cat
                    ? 'bg-[var(--crimson)] text-[var(--editorial)] border-[var(--crimson)]'
                    : 'bg-transparent text-[var(--nevoa)] border-[rgba(184,196,204,0.1)] hover:border-[rgba(139,30,45,0.3)] hover:text-[var(--crimson-lt)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.client} project={project} index={index} />
          ))}
        </div>

        {/* Bottom stats bar */}
        <ScrollReveal delay={2}>
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-14 text-center">
            {[
              { value: '7', label: 'Escopos mapeados' },
              { value: '4', label: 'Pacotes base' },
              { value: '1 sistema', label: 'Linguagem coerente' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-serif text-[var(--crimson-lt)] text-[clamp(28px,3vw,40px)] leading-tight tracking-[-0.02em]">
                  {stat.value}
                </p>
                <p className="text-[var(--nevoa)] text-[10px] font-semibold tracking-[0.1em] uppercase mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
