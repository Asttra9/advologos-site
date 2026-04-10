import { CONTACT_CHANNELS, NAV_LINKS, SITE_CONFIG } from '@/lib/constants';
import { AdvologosLogo } from './advologos-logo';
import { NewsletterSignup } from './newsletter-signup';
import { Facebook, Instagram, Mail } from 'lucide-react';

const ICON_MAP: Record<string, typeof Instagram> = {
  Instagram,
  Facebook,
  Mail,
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="mt-auto border-t border-[rgba(184,196,204,0.1)] footer-gradient-border"
      role="contentinfo"
    >
      <div className="max-w-[1160px] mx-auto px-5 md:px-12 py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-8 mb-10">
          <div className="flex flex-col gap-3">
            <AdvologosLogo className="text-2xl" />
            <p className="text-[13px] text-[var(--prata)] leading-[1.65] max-w-[280px]">
              {SITE_CONFIG.description}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="text-[10px] font-bold tracking-[0.16em] uppercase text-[var(--crimson-lt)] mb-1">
              Navegação
            </div>
            <ul className="flex flex-col gap-2.5 list-none">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="footer-nav-link text-[var(--nevoa)] text-[13px] font-medium tracking-[0.03em] transition-colors duration-300 hover:text-[var(--editorial)] hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#faq"
                  className="footer-nav-link text-[var(--nevoa)] text-[13px] font-medium tracking-[0.03em] transition-colors duration-300 hover:text-[var(--editorial)] inline-block"
                >
                  Perguntas frequentes
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <div className="text-[10px] font-bold tracking-[0.16em] uppercase text-[var(--crimson-lt)] mb-1">
              Contato
            </div>
            <div className="flex flex-wrap gap-3">
              {CONTACT_CHANNELS.map((channel) => {
                const IconComponent = ICON_MAP[channel.icon];
                const isMail = channel.href.startsWith('mailto:');

                return (
                  <a
                    key={channel.label}
                    href={channel.href}
                    target={isMail ? undefined : '_blank'}
                    rel={isMail ? undefined : 'noopener noreferrer'}
                    aria-label={channel.label}
                    className="footer-social-btn flex items-center gap-2 rounded-full border border-[rgba(184,196,204,0.12)] px-3 py-2 text-[12px] text-[var(--nevoa)] no-underline hover:border-[var(--crimson)] hover:text-[var(--crimson-lt)] hover:bg-[rgba(139,30,45,0.08)]"
                  >
                    <span className="flex h-5 w-5 items-center justify-center">
                      {IconComponent && <IconComponent className="h-4 w-4" />}
                    </span>
                    <span>{channel.label}</span>
                  </a>
                );
              })}
            </div>
            <p className="text-[11px] text-[var(--nevoa)] leading-[1.5] mt-1">
              Canais revisados para manter os links públicos atualizados.
            </p>
          </div>

          <NewsletterSignup />
        </div>

        <div className="pt-6 border-t border-[rgba(184,196,204,0.06)] flex flex-col sm:flex-row justify-between items-center gap-3">
          <small className="text-[10px] text-[var(--nevoa)] opacity-50 font-mono tracking-wide flex items-center gap-3 flex-wrap justify-center">
            <span>© 2022 — {currentYear} {SITE_CONFIG.name}.</span>
            <span className="footer-copyright-separator" aria-hidden="true" />
            <span>Uso e aplicação sujeitos às diretrizes de marca.</span>
          </small>
          <p className="text-[10px] text-[var(--nevoa)] opacity-40 tracking-wide">
            Marcas jurídicas com presença, clareza e autoridade.
          </p>
        </div>
      </div>
    </footer>
  );
}
