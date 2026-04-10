'use client';

import { useState } from 'react';
import { Calculator, TrendingUp, ChevronRight } from 'lucide-react';
import { SERVICES } from '@/lib/constants';
import { AnimatedNumber } from './animated-number';
import { ScrollReveal } from './scroll-reveal';

type PlanKey = 'signum' | 'nomen' | 'autoritas' | 'imperium';

interface PlanConfig {
  key: PlanKey;
  label: string;
  tier: string;
  priceOneTime: number;
  priceMonthly: number | null;
  monthlyContractMonths: number;
  roiMultiplier: number;
  featureCount: number;
}

// Count unique items per plan (including inherited)
function countFeatures(key: PlanKey): number {
  const keyOrder: PlanKey[] = ['signum', 'nomen', 'autoritas', 'imperium'];
  const idx = keyOrder.indexOf(key);
  let count = 0;
  const seen = new Set<string>();

  for (let i = 0; i <= idx; i++) {
    const service = SERVICES.find((s) => s.name.toLowerCase() === keyOrder[i]);
    if (!service) continue;
    for (const item of service.items) {
      if (!/^tudo do/i.test(item) && !seen.has(item)) {
        seen.add(item);
        count++;
      }
    }
  }
  return count;
}

const MAX_FEATURES = countFeatures('imperium');

const PLANS: PlanConfig[] = [
  {
    key: 'signum',
    label: 'Signum',
    tier: 'Entrada',
    priceOneTime: 89.9,
    priceMonthly: null,
    monthlyContractMonths: 0,
    roiMultiplier: 5,
    featureCount: countFeatures('signum'),
  },
  {
    key: 'nomen',
    label: 'Nomen',
    tier: 'Profissional',
    priceOneTime: 139.99,
    priceMonthly: null,
    monthlyContractMonths: 0,
    roiMultiplier: 8,
    featureCount: countFeatures('nomen'),
  },
  {
    key: 'autoritas',
    label: 'Autoritas',
    tier: 'Recomendado',
    priceOneTime: 290,
    priceMonthly: 59.99,
    monthlyContractMonths: 6,
    roiMultiplier: 12,
    featureCount: countFeatures('autoritas'),
  },
  {
    key: 'imperium',
    label: 'Imperium',
    tier: 'Premium',
    priceOneTime: 890,
    priceMonthly: 99.99,
    monthlyContractMonths: 12,
    roiMultiplier: 20,
    featureCount: countFeatures('imperium'),
  },
];

const MONTH_RANGES = [3, 6, 12] as const;

function formatBRL(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function PricingCalculator() {
  const [selectedPlan, setSelectedPlan] = useState<PlanKey>('autoritas');
  const [isMonthly, setIsMonthly] = useState(false);

  const plan = PLANS.find((p) => p.key === selectedPlan)!;
  const hasMonthly = plan.priceMonthly !== null;

  const investment = isMonthly && hasMonthly
    ? plan.priceMonthly!
    : plan.priceOneTime;

  const projectedReturn = investment * plan.roiMultiplier;

  const featurePct = Math.round((plan.featureCount / MAX_FEATURES) * 100);

  return (
    <section
      id="calculadora"
      className="py-16 md:py-24 border-b border-[rgba(184,196,204,0.08)]"
      aria-label="Calculadora de Investimento"
    >
      <div className="max-w-[1160px] mx-auto px-5 md:px-12">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2.5 text-[10px] font-bold tracking-[0.18em] uppercase text-[var(--crimson-lt)] mb-5">
            <span className="block w-5 h-px bg-[var(--crimson-lt)] flex-shrink-0" />
            04 — Calculadora de Investimento
          </div>
        </ScrollReveal>

        <ScrollReveal delay={1}>
          <h2 className="section-heading-accent font-serif text-[clamp(28px,4vw,44px)] font-normal text-[var(--editorial)] leading-[1.1] tracking-[-0.015em] mb-4">
            Simule seu retorno.
          </h2>
          <p className="text-[var(--prata)] text-[15px] leading-[1.8] max-w-[520px] mb-8">
            Selecione um plano e compare modalidades de pagamento. Veja o potencial de retorno
            estimado para cada nível de investimento.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={2}>
          <div className="bg-[rgba(255,255,255,0.025)] border border-[rgba(184,196,204,0.1)] p-[5px] rounded-[1.25rem]">
            <div className="bg-[var(--ardosia)] rounded-[calc(1.25rem-5px)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] px-5 py-6 md:px-8 md:py-8">
              {/* Plan selector */}
              <div className="flex flex-col gap-4 mb-6">
                {/* Plan buttons */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {PLANS.map((p) => {
                    const isActive = selectedPlan === p.key;
                    return (
                      <button
                        key={p.key}
                        type="button"
                        onClick={() => {
                          setSelectedPlan(p.key);
                          // Reset to one-time if plan doesn't support monthly
                          if (!p.priceMonthly) setIsMonthly(false);
                        }}
                        className={`relative text-center px-3 py-3 rounded-xl border transition-all duration-300 cursor-pointer ${
                          isActive
                            ? 'bg-[rgba(139,30,45,0.15)] border-[var(--crimson)] shadow-[0_0_16px_rgba(139,30,45,0.15)]'
                            : 'bg-[rgba(255,255,255,0.025)] border-[rgba(184,196,204,0.08)] hover:border-[rgba(184,196,204,0.2)] hover:bg-[rgba(255,255,255,0.04)]'
                        }`}
                      >
                        <div
                          className={`text-[13px] font-bold tracking-wide transition-colors duration-300 ${
                            isActive ? 'text-[var(--crimson-lt)]' : 'text-[var(--prata)]'
                          }`}
                        >
                          {p.label}
                        </div>
                        <div
                          className={`text-[10px] mt-0.5 transition-colors duration-300 ${
                            isActive ? 'text-[var(--crimson)]' : 'text-[var(--nevoa)]'
                          }`}
                        >
                          {p.tier}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Payment toggle — only show if selected plan supports monthly */}
                {hasMonthly && (
                  <div className="inline-flex items-center bg-[rgba(255,255,255,0.04)] border border-[rgba(184,196,204,0.1)] rounded-full p-[3px] self-start">
                    <button
                      type="button"
                      onClick={() => setIsMonthly(false)}
                      className={`text-[11px] font-bold tracking-[0.1em] uppercase px-5 py-2 rounded-full transition-all duration-300 cursor-pointer border-0 ${
                        !isMonthly
                          ? 'bg-[var(--crimson)] text-[var(--editorial)]'
                          : 'bg-transparent text-[var(--nevoa)] hover:text-[var(--prata)]'
                      }`}
                    >
                      Pagamento único
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsMonthly(true)}
                      className={`text-[11px] font-bold tracking-[0.1em] uppercase px-5 py-2 rounded-full transition-all duration-300 cursor-pointer border-0 ${
                        isMonthly
                          ? 'bg-[var(--crimson)] text-[var(--editorial)]'
                          : 'bg-transparent text-[var(--nevoa)] hover:text-[var(--prata)]'
                      }`}
                    >
                      Assinatura mensal
                    </button>
                  </div>
                )}
              </div>

              {/* Results grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Left column — Investment & ROI */}
                <div className="flex flex-col gap-5">
                  {/* Investment card */}
                  <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(184,196,204,0.08)] rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Calculator className="h-4 w-4 text-[var(--crimson)]" strokeWidth={1.8} />
                      <span className="text-[10px] font-bold tracking-[0.14em] uppercase text-[var(--nevoa)]">
                        {isMonthly && hasMonthly ? 'Investimento mensal' : 'Investimento total'}
                      </span>
                    </div>
                    <div className="font-serif text-[clamp(28px,4vw,38px)] text-[var(--editorial)] leading-none">
                      <AnimatedNumber
                        value={Math.round(investment * 100)}
                        prefix="R$ "
                        duration={800}
                        className="text-[var(--editorial)]"
                      />
                      <span className="text-[clamp(16px,2vw,22px)] text-[var(--nevoa)]">
                        {isMonthly && hasMonthly ? ',99/mês' : ''}
                      </span>
                    </div>
                    {!isMonthly && (
                      <p className="text-[12px] text-[var(--nevoa)] mt-2">
                        {plan.label} — pagamento único
                      </p>
                    )}
                    {isMonthly && hasMonthly && (
                      <p className="text-[12px] text-[var(--nevoa)] mt-2">
                        Contrato mínimo: {plan.monthlyContractMonths} meses
                      </p>
                    )}
                  </div>

                  {/* ROI card */}
                  <div className="bg-[rgba(139,30,45,0.06)] border border-[rgba(139,30,45,0.15)] rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp className="h-4 w-4 text-[var(--crimson-lt)]" strokeWidth={1.8} />
                      <span className="text-[10px] font-bold tracking-[0.14em] uppercase text-[var(--crimson-lt)]">
                        Potencial de retorno estimado
                      </span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <AnimatedNumber
                        value={Math.round(projectedReturn * 100)}
                        prefix="R$ "
                        duration={1200}
                        className="font-serif text-[clamp(28px,4vw,38px)] text-[var(--crimson-lt)] leading-none"
                      />
                      <span className="text-[15px] font-bold text-[var(--crimson)]">
                        ({plan.roiMultiplier}x)
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-2">
                      <ChevronRight className="h-3 w-3 text-[var(--crimson)]" />
                      <p className="text-[12px] text-[var(--nevoa)]">
                        Retorno estimado sobre {isMonthly && hasMonthly ? '12 meses' : 'o investimento'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right column — Comparison & Progress */}
                <div className="flex flex-col gap-5">
                  {/* Monthly comparison (only for plans with monthly option) */}
                  {hasMonthly && (
                    <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(184,196,204,0.08)] rounded-xl p-5">
                      <span className="text-[10px] font-bold tracking-[0.14em] uppercase text-[var(--nevoa)] block mb-4">
                        Comparativo de custos
                      </span>
                      <div className="flex flex-col gap-2.5">
                        {/* One-time row */}
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-[12px] text-[var(--prata)] whitespace-nowrap">
                            Pagamento único
                          </span>
                          <span className="text-[14px] font-bold text-[var(--editorial)]">
                            {formatBRL(plan.priceOneTime)}
                          </span>
                        </div>

                        <div className="h-px bg-[rgba(184,196,204,0.08)]" />

                        {/* Monthly rows */}
                        {MONTH_RANGES.map((months) => {
                          const monthlyTotal = plan.priceMonthly! * months;
                          const savings = plan.priceOneTime - monthlyTotal;
                          const isCheaper = savings > 0;

                          return (
                            <div key={months} className="flex flex-col gap-1">
                              <div className="flex items-center justify-between gap-3">
                                <span className="text-[12px] text-[var(--prata)] whitespace-nowrap">
                                  {months}× mensal
                                </span>
                                <div className="flex items-center gap-2">
                                  <span className="text-[14px] font-bold text-[var(--editorial)]">
                                    {formatBRL(monthlyTotal)}
                                  </span>
                                  {isCheaper && (
                                    <span className="text-[10px] font-semibold text-[var(--crimson-lt)] bg-[rgba(139,30,45,0.12)] px-2 py-0.5 rounded-full whitespace-nowrap">
                                      −{formatBRL(savings)}
                                    </span>
                                  )}
                                </div>
                              </div>
                              {/* Mini bar comparison */}
                              <div className="flex items-center gap-2">
                                <div className="flex-1 h-1.5 rounded-full bg-[rgba(255,255,255,0.06)] overflow-hidden">
                                  <div
                                    className="h-full rounded-full bg-[var(--crimson)] opacity-60 transition-all duration-500"
                                    style={{
                                      width: `${Math.min((monthlyTotal / plan.priceOneTime) * 100, 100)}%`,
                                    }}
                                  />
                                </div>
                                <span className="text-[9px] text-[var(--nevoa)] w-10 text-right tabular-nums">
                                  {Math.round((monthlyTotal / plan.priceOneTime) * 100)}%
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Feature progress bar */}
                  <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(184,196,204,0.08)] rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-bold tracking-[0.14em] uppercase text-[var(--nevoa)]">
                        Cobertura de recursos
                      </span>
                      <span className="text-[13px] font-bold text-[var(--prata)] tabular-nums">
                        <AnimatedNumber value={featurePct} suffix="%" duration={600} />
                      </span>
                    </div>
                    <div className="h-2.5 rounded-full bg-[rgba(255,255,255,0.06)] overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700 ease-out"
                        style={{
                          width: `${featurePct}%`,
                          background: `linear-gradient(90deg, var(--crimson) 0%, var(--crimson-lt) 100%)`,
                        }}
                      />
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[11px] text-[var(--nevoa)]">
                        {plan.featureCount} de {MAX_FEATURES} recursos
                      </span>
                      <span className="text-[11px] text-[var(--nevoa)]">
                        Plano {plan.label}
                      </span>
                    </div>

                    {/* Tier labels */}
                    <div className="flex flex-col gap-1.5 mt-3">
                      {PLANS.map((p) => {
                        const pct = Math.round((p.featureCount / MAX_FEATURES) * 100);
                        const isActive = p.key === selectedPlan;
                        return (
                          <div key={p.key} className="flex items-center gap-2.5">
                            <span
                              className={`text-[10px] w-[60px] text-right transition-colors duration-300 ${
                                isActive ? 'text-[var(--crimson-lt)] font-bold' : 'text-[var(--nevoa)]'
                              }`}
                            >
                              {p.label}
                            </span>
                            <div className="flex-1 h-1 rounded-full bg-[rgba(255,255,255,0.04)] overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all duration-500 ${
                                  isActive
                                    ? 'bg-[var(--crimson)]'
                                    : 'bg-[rgba(184,196,204,0.15)]'
                                }`}
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <span
                              className={`text-[9px] w-8 text-right tabular-nums transition-colors duration-300 ${
                                isActive ? 'text-[var(--crimson-lt)] font-bold' : 'text-[var(--nevoa)]'
                              }`}
                            >
                              {pct}%
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
