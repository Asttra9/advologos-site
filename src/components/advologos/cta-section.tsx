'use client';

import { useState, useEffect, useRef, useCallback, type FormEvent } from 'react';
import { toast } from 'sonner';
import { ArrowUpRight, CheckCircle2, RotateCcw, Loader2, Shield, Clock, CheckCircle, MessageCircle, Sparkles } from 'lucide-react';
import { ScrollReveal } from './scroll-reveal';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { WHATSAPP_URL } from '@/lib/constants';

interface FormData {
  name: string;
  email: string;
  whatsapp: string;
  message: string;
}

const DRAFT_KEY = 'advologos-contact-draft';
const DEBOUNCE_MS = 500;

function loadDraft(): FormData {
  if (typeof window === 'undefined') return { name: '', email: '', whatsapp: '', message: '' };
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (raw) return JSON.parse(raw) as FormData;
  } catch {
    // ignore
  }
  return { name: '', email: '', whatsapp: '', message: '' };
}

function saveDraft(data: FormData) {
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
  } catch {
    // ignore
  }
}

function clearDraft() {
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch {
    // ignore
  }
}

export function CTASection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [messageLen, setMessageLen] = useState(0);
  const [draftSaved, setDraftSaved] = useState(false);
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', whatsapp: '', message: '' });
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  // Load draft on mount
  useEffect(() => {
    const draft = loadDraft();
    setFormData(draft);
    setMessageLen(draft.message.length);
  }, []);

  // Autosave on form data change
  const handleFieldChange = useCallback((field: keyof FormData, value: string) => {
    setFormData((prev) => {
      const next = { ...prev, [field]: value };
      // Debounced save
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        saveDraft(next);
        setDraftSaved(true);
        setTimeout(() => setDraftSaved(false), 1800);
      }, DEBOUNCE_MS);
      return next;
    });
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data: FormData = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      whatsapp: (form.elements.namedItem('whatsapp') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    };

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || 'Erro ao enviar mensagem');
      }

      setSubmitSuccess(true);
      setMessageLen(0);
      clearDraft();
      setFormData({ name: '', email: '', whatsapp: '', message: '' });
      toast.success('Mensagem enviada com sucesso!', {
        description: 'Entraremos em contato em até 24 horas.',
      });
      form.reset();
    } catch (err) {
      toast.error('Erro ao enviar mensagem', {
        description: err instanceof Error ? err.message : 'Tente novamente mais tarde.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppSubmit = () => {
    const text = encodeURIComponent(
      `Olá! Meu nome é ${formData.name}. E-mail: ${formData.email}. WhatsApp: ${formData.whatsapp}. Mensagem: ${formData.message}`
    );
    window.open(`${WHATSAPP_URL}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      id="cta"
      className="py-[88px] md:py-[140px]"
      aria-label="Formulário de contato"
    >
      <div className="max-w-[1160px] mx-auto px-5 md:px-12">
        <ScrollReveal>
          <div className="section-divider mb-14">
            <div className="section-divider-diamond" />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="cta-outer-ring bg-[rgba(255,255,255,0.025)] border border-[rgba(139,30,45,0.22)] p-2 rounded-[2rem] max-w-[900px] mx-auto">
            <div className="bg-[linear-gradient(135deg,rgba(255,71,95,0.13)_0%,rgba(26,26,34,0.97)_60%)] rounded-[calc(2rem-8px)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.07)] px-5 py-12 md:py-[72px] text-center md:px-16">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-[rgba(139,30,45,0.12)] border border-[rgba(139,30,45,0.3)] px-3 py-1 text-[10px] font-semibold tracking-[0.2em] uppercase text-[var(--editorial)] mb-7 justify-center mx-auto">
                Pronto para começar?
              </div>

              <h2 className="font-serif text-[clamp(32px,5.5vw,64px)] text-[var(--editorial)] leading-[1.05] tracking-[-0.02em] mb-[18px]">
                A presença que o
                <br />
                mercado <em className="text-[var(--crimson)] italic">percebe</em>
                <br />
                começa aqui.
              </h2>

              <p className="text-[var(--prata)] text-[16px] leading-[1.7] max-w-[480px] mx-auto mb-4">
                Solicite uma proposta sem compromisso. Analisamos seu contexto e apresentamos o pacote adequado para onde você está e para onde quer chegar.
              </p>

              {/* WhatsApp doubt link */}
              <a
                href={`${WHATSAPP_URL}?text=${encodeURIComponent('Olá, tenho uma dúvida sobre os pacotes da Advologos.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[13px] text-[var(--nevoa-lt)] hover:text-[#25D366] transition-colors duration-300 mb-8"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                Tem dúvidas? Fale pelo WhatsApp
              </a>

              {!submitSuccess ? (
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="max-w-[480px] mx-auto mb-8 flex flex-col gap-4 text-left"
                  noValidate
                >
                  <div className="flex flex-col">
                    <Label htmlFor="cta-name" className="text-[11px] font-semibold tracking-[0.08em] uppercase text-[var(--prata)] mb-1.5">
                      Nome
                    </Label>
                    <Input
                      id="cta-name"
                      name="name"
                      placeholder="Seu nome completo"
                      required
                      value={formData.name}
                      onChange={(e) => handleFieldChange('name', e.target.value)}
                      className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(184,196,204,0.15)] rounded-xl py-4 px-4 text-[var(--editorial)] text-sm font-[inherit] transition-all duration-300 placeholder:text-[var(--nevoa)] focus:border-[var(--crimson)] focus:bg-[rgba(255,255,255,0.05)]"
                    />
                  </div>

                  <div className="flex flex-col">
                    <Label htmlFor="cta-email" className="text-[11px] font-semibold tracking-[0.08em] uppercase text-[var(--prata)] mb-1.5">
                      E-mail
                    </Label>
                    <Input
                      id="cta-email"
                      name="email"
                      type="email"
                      placeholder="seu@email.com"
                      required
                      value={formData.email}
                      onChange={(e) => handleFieldChange('email', e.target.value)}
                      className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(184,196,204,0.15)] rounded-xl py-4 px-4 text-[var(--editorial)] text-sm font-[inherit] transition-all duration-300 placeholder:text-[var(--nevoa)] focus:border-[var(--crimson)] focus:bg-[rgba(255,255,255,0.05)]"
                    />
                  </div>

                  <div className="flex flex-col">
                    <Label htmlFor="cta-whatsapp" className="text-[11px] font-semibold tracking-[0.08em] uppercase text-[var(--prata)] mb-1.5">
                      WhatsApp
                    </Label>
                    <Input
                      id="cta-whatsapp"
                      name="whatsapp"
                      type="tel"
                      placeholder="(11) 99999-9999"
                      required
                      value={formData.whatsapp}
                      onChange={(e) => handleFieldChange('whatsapp', e.target.value)}
                      className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(184,196,204,0.15)] rounded-xl py-4 px-4 text-[var(--editorial)] text-sm font-[inherit] transition-all duration-300 placeholder:text-[var(--nevoa)] focus:border-[var(--crimson)] focus:bg-[rgba(255,255,255,0.05)]"
                    />
                  </div>

                  <div className="flex flex-col">
                    <Label htmlFor="cta-message" className="text-[11px] font-semibold tracking-[0.08em] uppercase text-[var(--prata)] mb-1.5">
                      Mensagem
                    </Label>
                    <Textarea
                      id="cta-message"
                      name="message"
                      placeholder="Conte-nos sobre seu projeto e seus objetivos..."
                      rows={4}
                      required
                      maxLength={1000}
                      value={formData.message}
                      onChange={(e) => {
                        setMessageLen(e.target.value.length);
                        handleFieldChange('message', e.target.value);
                      }}
                      className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(184,196,204,0.15)] rounded-xl py-4 px-4 text-[var(--editorial)] text-sm font-[inherit] transition-all duration-300 placeholder:text-[var(--nevoa)] focus:border-[var(--crimson)] focus:bg-[rgba(255,255,255,0.05)] resize-none"
                    />
                    <span className={`text-[10px] mt-1 text-right transition-colors duration-300 ${
                      messageLen > 900 ? 'text-[var(--crimson-lt)]' : 'text-[var(--nevoa)]'
                    }`}>
                      {messageLen}/1000 caracteres
                    </span>
                  </div>

                  {/* Draft saved indicator */}
                  <div className="relative">
                    <span className={`draft-saved ${draftSaved ? 'draft-saved-visible' : ''}`}>
                      Rascunho salvo
                    </span>
                  </div>

                  {/* Submit buttons */}
                  <div className="flex flex-col gap-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-ripple inline-flex items-center justify-center gap-2.5 rounded-full bg-[var(--crimson)] text-[var(--editorial)] text-[12px] font-bold tracking-[0.1em] uppercase py-3.5 pl-6 pr-3.5 border-none cursor-pointer transition-all duration-400 [transition-timing-function:var(--ease-spring)] hover:bg-[var(--crimson-dp)] active:scale-[0.98] w-full disabled:opacity-70 disabled:cursor-not-allowed cta-btn-magnetic cta-btn-shine"
                    >
                      {isSubmitting ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <>
                          Enviar mensagem
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(0,0,0,0.22)] text-sm transition-transform duration-400 [transition-timing-function:var(--ease-spring)] hover:translate-x-[1px] hover:-translate-y-[1px] hover:scale-[1.08]">
                            <ArrowUpRight className="h-4 w-4" />
                          </span>
                        </>
                      )}
                    </button>

                    {/* WhatsApp alternative button — only shown when name is filled */}
                    {formData.name.trim().length > 0 && (
                      <button
                        type="button"
                        onClick={handleWhatsAppSubmit}
                        className="whatsapp-cta-btn inline-flex items-center justify-center gap-2.5 rounded-full bg-transparent border border-[rgba(37,211,102,0.35)] text-[#25D366] text-[12px] font-semibold tracking-[0.08em] uppercase py-3 px-6 cursor-pointer transition-all duration-400 [transition-timing-function:var(--ease-spring)] hover:bg-[rgba(37,211,102,0.08)] hover:border-[rgba(37,211,102,0.55)] active:scale-[0.98] w-full"
                      >
                        <MessageCircle className="h-4 w-4" />
                        Enviar via WhatsApp
                      </button>
                    )}
                  </div>
                </form>
              ) : (
                <div
                  role="status"
                  aria-live="polite"
                  className="cta-success-state max-w-[480px] mx-auto mb-8 p-10 bg-[rgba(255,255,255,0.02)] border border-[rgba(184,196,204,0.1)] rounded-3xl flex flex-col items-center gap-4"
                >
                  <div className="relative w-16 h-16 rounded-full bg-[rgba(34,197,94,0.1)] border border-[rgba(34,197,94,0.25)] flex items-center justify-center cta-success-icon">
                    <CheckCircle2 className="h-8 w-8 text-[#22C55E]" />
                  </div>
                  <div className="text-center cta-success-text">
                    <h3 className="font-serif text-[clamp(22px,4vw,26px)] text-[var(--editorial)] mb-2">
                      Mensagem enviada!
                    </h3>
                    <p className="text-[var(--prata)] text-sm">
                      Entraremos em contato em até 24 horas.
                    </p>
                  </div>
                  <button
                    onClick={() => { setSubmitSuccess(false); setMessageLen(0); }}
                    className="inline-flex items-center gap-2 rounded-full bg-transparent border border-[rgba(184,196,204,0.2)] text-[var(--prata)] text-[12px] font-semibold tracking-[0.08em] uppercase py-3 px-5 cursor-pointer transition-all duration-400 [transition-timing-function:var(--ease-spring)] hover:border-[rgba(184,196,204,0.4)] hover:text-[var(--editorial)]"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Enviar nova mensagem
                  </button>
                </div>
              )}

              {/* Trust indicators */}
              <div className="mt-7 flex items-center justify-center gap-5">
                <div className="group flex items-center gap-1.5 transition-colors duration-300 cursor-default">
                  <Shield className="h-[14px] w-[14px] text-[var(--nevoa)] group-hover:text-[var(--crimson-lt)] transition-colors duration-300" />
                  <span className="text-[11px] text-[var(--nevoa)] group-hover:text-[var(--prata)] transition-colors duration-300">
                    Dados protegidos
                  </span>
                </div>
                <div className="w-px h-3 bg-[rgba(184,196,204,0.12)]" />
                <div className="group flex items-center gap-1.5 transition-colors duration-300 cursor-default">
                  <Clock className="h-[14px] w-[14px] text-[var(--nevoa)] group-hover:text-[var(--crimson-lt)] transition-colors duration-300" />
                  <span className="text-[11px] text-[var(--nevoa)] group-hover:text-[var(--prata)] transition-colors duration-300">
                    Resposta em até 24h
                  </span>
                </div>
                <div className="w-px h-3 bg-[rgba(184,196,204,0.12)]" />
                <div className="group flex items-center gap-1.5 transition-colors duration-300 cursor-default">
                  <CheckCircle className="h-[14px] w-[14px] text-[var(--nevoa)] group-hover:text-[var(--crimson-lt)] transition-colors duration-300" />
                  <span className="text-[11px] text-[var(--nevoa)] group-hover:text-[var(--prata)] transition-colors duration-300">
                    Sem compromisso
                  </span>
                </div>
              </div>


            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
