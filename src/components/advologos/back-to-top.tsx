'use client';

import { useState, useEffect, useCallback } from 'react';
import { ArrowUp } from 'lucide-react';

const CIRCLE_SIZE = 32;
const CIRCLE_STROKE = 2;
const CIRCLE_RADIUS = (CIRCLE_SIZE - CIRCLE_STROKE) / 2;
const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? Math.min((scrollY / docHeight) * 100, 100) : 0;

      setVisible(scrollY > 600);
      setScrollPercent(percent);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const dashOffset = CIRCLE_CIRCUMFERENCE - (scrollPercent / 100) * CIRCLE_CIRCUMFERENCE;

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="fixed bottom-6 right-6 z-[60] flex items-center justify-center rounded-full bg-[var(--crimson)] text-[var(--editorial)] shadow-lg shadow-[rgba(139,30,45,0.3)] transition-all duration-300 hover:bg-[var(--crimson-dp)] hover:scale-110 hover:shadow-[rgba(139,30,45,0.5)] focus:outline-none focus:ring-2 focus:ring-[var(--crimson-lt)] focus:ring-offset-2 focus:ring-offset-[var(--grafite)]"
      aria-label="Voltar ao topo"
      style={{ width: CIRCLE_SIZE + 12, height: CIRCLE_SIZE + 12 }}
    >
      {/* SVG circular progress */}
      <svg
        className="btt-progress-svg"
        width={CIRCLE_SIZE}
        height={CIRCLE_SIZE}
        viewBox={`0 0 ${CIRCLE_SIZE} ${CIRCLE_SIZE}`}
        aria-hidden="true"
      >
        {/* Background circle */}
        <circle
          cx={CIRCLE_SIZE / 2}
          cy={CIRCLE_SIZE / 2}
          r={CIRCLE_RADIUS}
          fill="none"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth={CIRCLE_STROKE}
        />
        {/* Progress circle */}
        <circle
          cx={CIRCLE_SIZE / 2}
          cy={CIRCLE_SIZE / 2}
          r={CIRCLE_RADIUS}
          fill="none"
          stroke="var(--editorial)"
          strokeWidth={CIRCLE_STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRCLE_CIRCUMFERENCE}
          strokeDashoffset={dashOffset}
          className="btt-progress-circle"
          transform={`rotate(-90 ${CIRCLE_SIZE / 2} ${CIRCLE_SIZE / 2})`}
        />
      </svg>

      {/* Arrow icon */}
      <ArrowUp className="h-4 w-4 relative z-10" strokeWidth={2.5} />

      {/* Percentage text */}
      {scrollPercent > 10 && (
        <span className="btt-percent-text">
          {Math.round(scrollPercent)}%
        </span>
      )}

      {/* Tooltip */}
      {hovered && (
        <span className="absolute -top-10 right-0 bg-[var(--ardosia)] text-[var(--editorial)] text-[11px] font-medium px-3 py-1.5 rounded-lg border border-[rgba(184,196,204,0.1)] shadow-lg whitespace-nowrap pointer-events-none animate-in fade-in slide-in-from-bottom-1 duration-200">
          Voltar ao topo
        </span>
      )}
    </button>
  );
}
