'use client';

import { useState, type FormEvent } from 'react';
import { toast } from 'sonner';

export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || 'Erro ao inscrever. Tente novamente.');
        return;
      }

      setSuccess(true);
      toast.success('Inscrito com sucesso!');
    } catch {
      toast.error('Erro de conexão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="text-[10px] font-bold tracking-[0.16em] uppercase text-[var(--crimson-lt)] mb-1">
        Receba insights
      </div>

      {success ? (
        <div className="flex items-center gap-2 text-[var(--editorial)] text-[13px] font-medium">
          <svg
            className="w-4 h-4 text-[var(--crimson-lt)]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Inscrito!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            required
            aria-label="E-mail para newsletter"
            className="newsletter-input-glow bg-[rgba(255,255,255,0.03)] border border-[rgba(184,196,204,0.15)] rounded-lg px-4 py-2.5 text-[var(--editorial)] text-[13px] placeholder:text-[var(--nevoa)] focus:outline-none min-w-0 flex-1"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-[var(--crimson)] text-[var(--editorial)] text-[11px] font-bold tracking-[0.08em] uppercase rounded-lg px-4 py-2.5 border-none cursor-pointer hover:bg-[var(--crimson-dp)] transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '...' : 'Inscrever'}
          </button>
        </form>
      )}

      <p className="text-[11px] text-[var(--nevoa)] leading-[1.5] mt-1">
        Sem spam. Apenas conteúdo relevante sobre branding jurídico.
      </p>
    </div>
  );
}
