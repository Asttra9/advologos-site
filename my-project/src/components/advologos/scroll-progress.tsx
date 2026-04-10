'use client';

import { useState, useEffect, useRef } from 'react';

const SECTION_IDS = [
  { id: 'hero', name: 'Início' },
  { id: 'numeros', name: 'Números' },
  { id: 'problema', name: 'O Problema' },
  { id: 'servicos', name: 'Serviços' },
  { id: 'metodo', name: 'Método' },
  { id: 'sobre', name: 'Quem Somos' },
  { id: 'autoridade', name: 'Autoridade' },
  { id: 'faq', name: 'FAQ' },
  { id: 'cta', name: 'Contato' },
];

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [sectionName, setSectionName] = useState('');
  const [isHovering, setIsHovering] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setProgress((scrollY / docHeight) * 100);
      }

      // Determine current section
      let currentSection = '';
      for (const section of SECTION_IDS) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4) {
            currentSection = section.name;
          }
        }
      }
      setSectionName(currentSection || 'Início');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 right-0 z-[200] group"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Progress bar */}
      <div
        className="scroll-progress-bar h-[4px] origin-left"
        style={{
          transform: `scaleX(${progress / 100})`,
          transition: 'transform 0.1s linear',
          background:
            'linear-gradient(to right, var(--crimson-dp), var(--crimson), var(--crimson-lt))',
        }}
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Progresso de leitura: ${sectionName}`}
      />

      {/* Glow at leading edge */}
      <div
        className="scroll-progress-glow"
        style={{
          position: 'fixed',
          top: 0,
          left: `${progress}%`,
          width: '40px',
          height: '4px',
          transform: 'translateX(-50%)',
          pointerEvents: 'none',
          background: 'radial-gradient(ellipse at center, rgba(165,37,53,0.6) 0%, transparent 70%)',
          transition: 'left 0.1s linear',
        }}
      />

      {/* Tooltip on hover */}
      <div
        className="scroll-progress-tooltip"
        style={{
          opacity: isHovering ? 1 : 0,
          transform: isHovering ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(-4px)',
          pointerEvents: 'none',
        }}
      >
        {sectionName}
        <span className="scroll-progress-tooltip-pct">{Math.round(progress)}%</span>
      </div>
    </div>
  );
}
