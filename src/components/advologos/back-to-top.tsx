'use client';

import { useState, useEffect, useCallback } from 'react';
import { ArrowUp } from 'lucide-react';

const CIRCLE_SIZE = 32;
const CIRCLE_STROKE = 2;
const CIRCLE_RADIUS = (CIRCLE_SIZE - CIRCLE_STROKE) / 2;
const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;

export function BackToTop() {
  const [visible, setVisible] = useState(false);
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

  return (
    <button
      onClick={scrollToTop}
      className={`group fixed bottom-6 right-6 z-[70] flex items-center justify-center rounded-full bg-[var(--crimson)] text-[var(--editorial)] transition-all [transition-timing-function:var(--ease-spring)] ${
        visible
          ? 'translate-y-0 opacity-100 scale-100 [transition-duration:600ms] hover:bg-[var(--crimson-dp)] hover:scale-110 hover:shadow-[0_0_22px_rgba(139,30,45,0.5),0_0_44px_rgba(139,30,45,0.2)] focus:outline-none focus:ring-2 focus:ring-[var(--crimson-lt)] focus:ring-offset-2 focus:ring-offset-[var(--grafite)]'
          : 'translate-y-8 opacity-0 pointer-events-none scale-75 [transition-duration:300ms]'
      }`}
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
        {/* Progress circle with conditional glow at ≥95% */}
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
          className={`btt-progress-circle${scrollPercent >= 95 ? ' btt-progress-glow' : ''}`}
          transform={`rotate(-90 ${CIRCLE_SIZE / 2} ${CIRCLE_SIZE / 2})`}
        />
      </svg>

      {/* Arrow icon */}
      <ArrowUp className="h-4 w-4 relative z-10" strokeWidth={2.5} />

      {/* Percentage text — more prominent at 100% */}
      {scrollPercent > 10 && (
        <span className={`btt-percent-text${scrollPercent >= 100 ? ' btt-percent-complete' : ''}`}>
          {Math.round(scrollPercent)}%
        </span>
      )}

      {/* Pure CSS tooltip — appears on hover */}
      <span className="absolute -top-10 right-0 bg-[var(--ardosia)] text-[var(--editorial)] text-[11px] font-medium px-3 py-1.5 rounded-lg border border-[rgba(184,196,204,0.1)] shadow-lg whitespace-nowrap pointer-events-none opacity-0 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0">
        Voltar ao topo
      </span>
    </button>
  );
}
