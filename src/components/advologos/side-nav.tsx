'use client';

import { useState, useEffect, useCallback } from 'react';

interface NavSection {
  id: string;
  label: string;
}

const SECTIONS: NavSection[] = [
  { id: 'hero', label: 'Hero' },
  { id: 'problema', label: 'Problema' },
  { id: 'servicos', label: 'Serviços' },
  { id: 'metodo', label: 'Método' },
  { id: 'sobre', label: 'Sobre' },
  { id: 'autoridade', label: 'Autoridade' },
  { id: 'faq', label: 'FAQ' },
  { id: 'cta', label: 'CTA' },
];

export function SideNav() {
  const [activeSection, setActiveSection] = useState('hero');
  const [hoveredDot, setHoveredDot] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    // Don't show on mobile
    const checkMobile = () => {
      setIsVisible(window.innerWidth > 1024 && !window.matchMedia('(hover: none)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(section.id);
            }
          });
        },
        {
          rootMargin: '-30% 0px -60% 0px',
          threshold: 0,
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  if (!isVisible) return null;

  return (
    <nav
      className="side-nav-container"
      aria-label="Navegação por seções"
      role="navigation"
    >
      <div className="side-nav-track">
        {/* Vertical connecting line */}
        <div className="side-nav-line" />

        {SECTIONS.map((section, index) => {
          const isActive = activeSection === section.id;
          const isHovered = hoveredDot === section.id;

          return (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              onMouseEnter={() => setHoveredDot(section.id)}
              onMouseLeave={() => setHoveredDot(null)}
              className={`side-nav-dot ${isActive ? 'side-nav-dot-active' : ''}`}
              aria-label={`Ir para ${section.label}`}
              aria-current={isActive ? 'true' : undefined}
              style={{ top: `${index * (100 / (SECTIONS.length - 1))}%` }}
            >
              {/* Tooltip */}
              <span className={`side-nav-tooltip ${isHovered || isActive ? 'side-nav-tooltip-visible' : ''}`}>
                {section.label}
              </span>

              {/* Dot */}
              <span
                className={`side-nav-dot-inner ${isActive ? 'side-nav-dot-inner-active' : ''}`}
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
}
