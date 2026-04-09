'use client';

import { Play, Clock, Monitor, Layers } from 'lucide-react';
import { toast } from 'sonner';
import { ScrollReveal } from './scroll-reveal';

const FEATURE_BADGES = [
  { icon: Clock, label: '2 min' },
  { icon: Monitor, label: 'HD Quality' },
  { icon: Layers, label: 'Processo Completo' },
];

export function VideoCta() {
  const handlePlay = () => {
    toast.info('Em breve: vídeo disponível');
  };

  return (
    <section
      id="video"
      className="py-20 border-b border-[rgba(184,196,204,0.08)] md:py-32"
      aria-label="Vídeo institucional"
    >
      <div className="max-w-[1160px] mx-auto px-5 md:px-12">
        <ScrollReveal>
          <div className="relative aspect-video rounded-2xl overflow-hidden cursor-pointer group video-placeholder-container">
            {/* Cinematic dark gradient background */}
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(13,13,15,0.95)_0%,rgba(26,26,34,0.9)_40%,rgba(139,30,45,0.12)_100%)]" />

            {/* Subtle grid pattern */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(184,196,204,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(184,196,204,0.3) 1px, transparent 1px)',
                backgroundSize: '60px 60px',
              }}
            />

            {/* Vignette overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(13,13,15,0.6)_100%)]" />

            {/* Feature badges */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 z-10 pointer-events-none">
              {FEATURE_BADGES.map((badge) => (
                <span
                  key={badge.label}
                  className="video-feature-badge inline-flex items-center gap-1.5 text-[9px] font-bold tracking-[0.1em] uppercase text-[var(--crimson-lt)] bg-[rgba(13,13,15,0.7)] border border-[rgba(139,30,45,0.3)] rounded-full px-2.5 py-1 backdrop-blur-sm"
                >
                  <badge.icon className="h-3 w-3" />
                  {badge.label}
                </span>
              ))}
            </div>

            {/* Play button */}
            <button
              type="button"
              onClick={handlePlay}
              className="relative z-10 flex items-center justify-center w-16 h-16 md:w-[72px] md:h-[72px] rounded-full bg-[var(--crimson)] text-[var(--editorial)] video-shimmer-btn hover:scale-110 transition-all duration-500 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--crimson)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--grafite)]"
              aria-label="Reproduzir vídeo"
            >
              {/* Pulse ring */}
              <span className="absolute inset-0 rounded-full bg-[var(--crimson)] video-pulse-ring" aria-hidden="true" />

              <Play className="relative z-10 h-7 w-7 md:h-8 md:w-8 ml-1 fill-[var(--editorial)]" />
            </button>

            {/* Simulated progress bar */}
            <div className="absolute bottom-0 left-0 right-0 z-10 h-[3px] bg-[rgba(255,255,255,0.06)]">
              <div className="video-progress-bar h-full w-[8%] rounded-r-full" />
            </div>
          </div>
        </ScrollReveal>

        {/* Text below video */}
        <div className="mt-8 text-center">
          <ScrollReveal delay={1}>
            <h2 className="font-serif text-[clamp(24px,3vw,40px)] font-normal text-[var(--editorial)] leading-[1.15] tracking-[-0.01em] mb-3">
              Veja como transformamos marcas
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={2}>
            <p className="text-[var(--prata)] text-[15px] leading-[1.8] max-w-[520px] mx-auto">
              Em 2 minutos, entenda nosso processo de criação e os resultados que entregamos.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
