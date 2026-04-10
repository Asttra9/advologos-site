'use client';

const MARQUEE_ITEMS = [
  'Branding Jurídico',
  'Posicionamento',
  'Identidade Visual',
  'Presença Digital',
  'Legal Design',
  'Brand Guidelines',
];

function LogoSet() {
  return (
    <>
      {MARQUEE_ITEMS.map((name) => (
        <span key={name} className="marquee-item flex items-center gap-8 whitespace-nowrap px-4">
          <span className="text-[14px] font-semibold tracking-[0.08em] uppercase text-[var(--nevoa)] opacity-40">
            {name}
          </span>
          <span className="text-[var(--nevoa)] opacity-20 text-[10px]">●</span>
        </span>
      ))}
    </>
  );
}

export function SocialProofMarquee() {
  return (
    <div
      aria-label="Frentes de atuação"
      className="py-5 border-y border-[rgba(184,196,204,0.06)] overflow-hidden marquee-fade-mask"
    >
      <div className="marquee-track">
        <LogoSet />
        <LogoSet />
        <LogoSet />
        <LogoSet />
      </div>
    </div>
  );
}
