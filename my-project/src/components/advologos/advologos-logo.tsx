interface AdvologosLogoProps {
  className?: string;
}

export function AdvologosLogo({ className = '' }: AdvologosLogoProps) {
  return (
    <span className={`font-serif text-[var(--editorial)] ${className}`}>
      Advo<span className="text-[var(--crimson)]">logos</span>
    </span>
  );
}
