'use client';

import { useState, useEffect, useCallback } from 'react';
import { Menu, ArrowUpRight, MessageCircle } from 'lucide-react';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
  SheetFooter,
} from '@/components/ui/sheet';
import { NAV_LINKS, WHATSAPP_URL } from '@/lib/constants';
import { AdvologosLogo } from './advologos-logo';
import { useSmoothScroll } from './smooth-anchor';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const scrollTo = useSmoothScroll();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection('#' + entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = useCallback(
    (href: string) => {
      scrollTo(href);
    },
    [scrollTo]
  );

  return (
    <nav
      id="nav"
      role="navigation"
      aria-label="Navegação principal"
      className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 py-5 pointer-events-none md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:px-12"
    >
      {/* Logo */}
      <a
        href="#hero"
        onClick={(e) => {
          e.preventDefault();
          handleNavClick('#hero');
        }}
        className="pointer-events-auto font-serif text-[19px] text-[var(--editorial)] no-underline opacity-90 transition-opacity duration-400 [transition-timing-function:var(--ease-spring)] hover:opacity-100 md:text-[23px] md:justify-self-start"
      >
        <AdvologosLogo className="text-[19px] md:text-[23px]" />
      </a>

      {/* Desktop nav pill */}
      <div
        className={`hidden md:flex items-center gap-0.5 rounded-full px-2 py-2.5 pointer-events-auto justify-self-center backdrop-blur-2xl border transition-all duration-[700ms] [transition-timing-function:var(--ease-spring)] ${
          scrolled
            ? 'bg-[rgba(13,13,15,0.92)] shadow-[0_14px_40px_rgba(0,0,0,0.46),inset_0_1px_0_rgba(255,255,255,0.06)] border-[rgba(184,196,204,0.22)]'
            : 'bg-[rgba(13,13,15,0.64)] shadow-[0_6px_18px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.025)] border-[rgba(184,196,204,0.09)]'
        }`}
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick(link.href);
            }}
            className={`group relative rounded-full px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.1em] uppercase no-underline whitespace-nowrap transition-all duration-400 [transition-timing-function:var(--ease-spring)] ${
              activeSection === link.href
                ? 'text-[var(--editorial)] bg-[rgba(139,30,45,0.18)] border border-[rgba(139,30,45,0.35)]'
                : 'text-[var(--nevoa)] border border-transparent hover:text-[var(--prata)] hover:bg-[rgba(255,255,255,0.04)]'
            }`}
          >
            {link.label}
            <span className={`absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-[2px] rounded-full bg-[var(--crimson)] transition-all duration-500 [transition-timing-function:var(--ease-expo)] ${activeSection === link.href ? 'w-[12px] opacity-100 scale-100' : 'w-[2px] opacity-0 scale-75'}`} />
          </a>
        ))}
      </div>

      {/* Desktop CTA */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="hidden md:pointer-events-auto md:flex md:justify-self-end items-center gap-2 rounded-full bg-[var(--crimson)] text-[var(--editorial)] no-underline text-[11px] font-bold tracking-[0.1em] uppercase py-2.5 pl-4 pr-2.5 border-none cursor-pointer transition-all duration-400 [transition-timing-function:var(--ease-spring)] hover:bg-[var(--crimson-dp)] pointer-events-auto cta-btn-magnetic cta-btn-shine"
      >
        Falar agora
        <span className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-[rgba(0,0,0,0.2)] text-[13px] transition-transform duration-400 [transition-timing-function:var(--ease-spring)]">
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </a>

      {/* Mobile hamburger + Sheet */}
      <div className="flex items-center gap-3 pointer-events-auto md:hidden">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-1.5 rounded-full bg-[var(--crimson)] text-[var(--editorial)] no-underline text-[10px] font-bold tracking-[0.08em] uppercase py-2 pl-3 pr-2 border-none transition-all duration-400 [transition-timing-function:var(--ease-spring)] hover:bg-[var(--crimson-dp)] ${
            isMobileMenuOpen ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100'
          }`}
        >
          Contato
          <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-[rgba(0,0,0,0.2)]">
            <MessageCircle className="h-3 w-3" />
          </span>
        </a>

        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(184,196,204,0.2)] bg-transparent text-[var(--prata)] hover:border-[rgba(184,196,204,0.4)] hover:text-[var(--editorial)] transition-all duration-300"
              aria-label="Abrir menu de navegação"
            >
              <Menu className="h-5 w-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="advologos-sheet w-[300px] p-0">
            <SheetHeader className="p-6 pb-4 border-b border-[rgba(184,196,204,0.08)]">
              <SheetTitle className="font-serif text-2xl text-[var(--editorial)]">
                <AdvologosLogo className="text-2xl" />
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-1 p-4">
              {NAV_LINKS.map((link) => (
                <SheetClose asChild key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className={`flex items-center rounded-lg px-4 py-3 text-[13px] font-semibold tracking-[0.08em] uppercase no-underline transition-all duration-300 ${
                      activeSection === link.href
                        ? 'text-[var(--editorial)] bg-[rgba(139,30,45,0.15)]'
                        : 'text-[var(--prata)] hover:text-[var(--editorial)] hover:bg-[rgba(255,255,255,0.04)]'
                    }`}
                  >
                    {link.label}
                  </a>
                </SheetClose>
              ))}
            </div>
            <SheetFooter className="p-4 pt-0">
              <SheetClose asChild>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[var(--crimson)] text-[var(--editorial)] no-underline text-[12px] font-bold tracking-[0.1em] uppercase py-3 px-5 transition-all duration-300 hover:bg-[var(--crimson-dp)]"
                >
                  Falar agora
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
