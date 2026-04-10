'use client';

import { useState } from 'react';
import { Check, ChevronRight, Sparkles } from 'lucide-react';
import { SERVICES } from '@/lib/constants';
import { ScrollReveal } from './scroll-reveal';

type PackageKey = 'signum' | 'nomen' | 'autoritas' | 'imperium';
type ComparisonRow = { name: string } & Record<PackageKey, boolean>;
type ServiceMap = Record<PackageKey, (typeof SERVICES)[number]>;

const PACKAGE_KEYS: PackageKey[] = ['signum', 'nomen', 'autoritas', 'imperium'];
const INCLUDED_PACKAGE_PATTERN = /^tudo do/i;

const SERVICE_MAP: ServiceMap = {
  signum: SERVICES.find((service) => service.name === 'Signum')!,
  nomen: SERVICES.find((service) => service.name === 'Nomen')!,
  autoritas: SERVICES.find((service) => service.name === 'Autoritas')!,
  imperium: SERVICES.find((service) => service.name === 'Imperium')!,
};

const BASE_FEATURE_ROWS = buildBaseFeatureRows();
const MONTHLY_FEATURE_ROWS = buildMonthlyFeatureRows();

function buildBaseFeatureRows(): ComparisonRow[] {
  const packageFeatures: Record<PackageKey, Set<string>> = {
    signum: new Set<string>(),
    nomen: new Set<string>(),
    autoritas: new Set<string>(),
    imperium: new Set<string>(),
  };
  const featureOrder: string[] = [];

  PACKAGE_KEYS.forEach((key, index) => {
    const service = SERVICE_MAP[key];
    const previousKey = PACKAGE_KEYS[index - 1];
    const includesPreviousPackage = service.items.some((item) => INCLUDED_PACKAGE_PATTERN.test(item));
    const features = new Set<string>(
      includesPreviousPackage && previousKey ? Array.from(packageFeatures[previousKey]) : []
    );

    service.items
      .filter((item) => !INCLUDED_PACKAGE_PATTERN.test(item))
      .forEach((item) => features.add(item));

    packageFeatures[key] = features;

    Array.from(features).forEach((feature) => {
      if (!featureOrder.includes(feature)) {
        featureOrder.push(feature);
      }
    });
  });

  return featureOrder.map((feature) => ({
    name: feature,
    signum: packageFeatures.signum.has(feature),
    nomen: packageFeatures.nomen.has(feature),
    autoritas: packageFeatures.autoritas.has(feature),
    imperium: packageFeatures.imperium.has(feature),
  }));
}

function buildMonthlyFeatureRows(): ComparisonRow[] {
  const featureOrder: string[] = [];

  [SERVICE_MAP.autoritas, SERVICE_MAP.imperium].forEach((service) => {
    service.monthlyExtraItems?.forEach((item) => {
      if (!featureOrder.includes(item)) {
        featureOrder.push(item);
      }
    });
  });

  return featureOrder.map((feature) => ({
    name: feature,
    signum: false,
    nomen: false,
    autoritas: SERVICE_MAP.autoritas.monthlyExtraItems?.includes(feature) ?? false,
    imperium: SERVICE_MAP.imperium.monthlyExtraItems?.includes(feature) ?? false,
  }));
}

function CheckCell({ included }: { included: boolean }) {
  if (included) {
    return (
      <span className="flex items-center justify-center">
        <Check className="h-[18px] w-[18px] text-[var(--crimson)]" strokeWidth={2.5} />
      </span>
    );
  }

  return (
    <span className="flex items-center justify-center text-[var(--nevoa)] text-[15px] select-none">
      —
    </span>
  );
}

function getFeatureCount(features: ComparisonRow[], key: PackageKey) {
  return features.filter((feature) => feature[key]).length;
}

function getPriceMeta(key: PackageKey, isMonthly: boolean) {
  const service = SERVICE_MAP[key];
  const showMonthly = isMonthly && Boolean(service.monthlyPrice);

  return {
    value: showMonthly ? service.monthlyPrice! : service.price,
    helper: showMonthly
      ? service.monthlyContractLabel
      : isMonthly
        ? 'Pagamento único'
        : null,
    accent: showMonthly || service.featured,
  };
}

export function ComparisonTable() {
  const [isMonthly, setIsMonthly] = useState(false);
  const activeFeatures = isMonthly
    ? [...BASE_FEATURE_ROWS, ...MONTHLY_FEATURE_ROWS]
    : BASE_FEATURE_ROWS;

  const signumTotal = getFeatureCount(activeFeatures, 'signum');
  const nomenTotal = getFeatureCount(activeFeatures, 'nomen');
  const autoritasTotal = getFeatureCount(activeFeatures, 'autoritas');
  const imperiumTotal = getFeatureCount(activeFeatures, 'imperium');

  return (
    <section
      id="comparativo"
      className="py-20 border-b border-[rgba(184,196,204,0.08)] md:py-32"
      aria-label="Comparativo de pacotes"
    >
      <div className="max-w-[1160px] mx-auto px-5 md:px-12">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2.5 text-[10px] font-bold tracking-[0.18em] uppercase text-[var(--crimson-lt)] mb-5">
            <span className="block w-5 h-px bg-[var(--crimson-lt)] flex-shrink-0" />
            Comparativo
          </div>
        </ScrollReveal>

        <ScrollReveal delay={1}>
          <h2 className="section-heading-accent font-serif text-[clamp(32px,4.5vw,56px)] font-normal text-[var(--editorial)] leading-[1.08] tracking-[-0.015em] mb-5">
            Compare os pacotes
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={2}>
          <p className="text-[var(--prata)] text-[15px] leading-[1.8] max-w-[620px] mb-10">
            Veja a progressão real de cada pacote e compare, no mesmo quadro, o formato avulso e as
            versões por assinatura de Autoritas e Imperium.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={3}>
          <div className="flex flex-col items-start mb-8 gap-2">
            <div className="inline-flex items-center bg-[rgba(255,255,255,0.04)] border border-[rgba(184,196,204,0.1)] rounded-full p-[3px]">
              <button
                type="button"
                onClick={() => setIsMonthly(false)}
                className={`relative text-[11px] font-bold tracking-[0.1em] uppercase px-5 py-2 rounded-full transition-all duration-300 cursor-pointer border-0 ${
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
                className={`relative text-[11px] font-bold tracking-[0.1em] uppercase px-5 py-2 rounded-full transition-all duration-300 cursor-pointer border-0 ${
                  isMonthly
                    ? 'bg-[var(--crimson)] text-[var(--editorial)]'
                    : 'bg-transparent text-[var(--nevoa)] hover:text-[var(--prata)]'
                }`}
              >
                Assinatura mensal
              </button>
            </div>

            {isMonthly && (
              <span className="text-[10px] text-[var(--nevoa)] tracking-wide">
                Assinatura disponível apenas para Autoritas e Imperium.
              </span>
            )}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={4}>
          <div className="overflow-x-auto comparison-table-scroll -mx-5 md:-mx-12 px-5 md:px-12">
            <table className="w-full min-w-[780px] border-collapse">
              <thead>
                <tr className="border-b border-[rgba(184,196,204,0.12)]">
                  <th className="text-left text-[11px] font-bold tracking-[0.14em] uppercase text-[var(--nevoa)] py-4 pr-4 pl-0 w-[260px]">
                    Recurso
                  </th>
                  <th className="text-center text-[11px] font-bold tracking-[0.14em] uppercase py-4 px-3">
                    <span className="text-[var(--prata)]">Signum</span>
                    <span className="block text-[9px] text-[var(--nevoa)] font-normal tracking-normal normal-case mt-0.5">
                      Entrada
                    </span>
                  </th>
                  <th className="text-center text-[11px] font-bold tracking-[0.14em] uppercase py-4 px-3">
                    <span className="text-[var(--prata)]">Nomen</span>
                    <span className="block text-[9px] text-[var(--nevoa)] font-normal tracking-normal normal-case mt-0.5">
                      Profissional
                    </span>
                  </th>
                  <th className="text-center text-[11px] font-bold tracking-[0.14em] uppercase py-4 px-3 pt-8 rounded-t-xl comparison-featured-col relative">
                    <span className="inline-block text-[9px] font-bold tracking-[0.1em] uppercase bg-[linear-gradient(135deg,var(--crimson-dp),var(--crimson-lt))] text-[var(--editorial)] px-2.5 py-0.5 rounded-full whitespace-nowrap badge-shimmer shadow-[0_2px_8px_rgba(139,30,45,0.3)] mb-1.5">
                      Mais Popular
                    </span>
                    <span className="text-[var(--editorial)]">Autoritas</span>
                    <span className="block text-[9px] text-[var(--crimson-lt)] font-normal tracking-normal normal-case mt-0.5">
                      Recomendado
                    </span>
                  </th>
                  <th className="text-center text-[11px] font-bold tracking-[0.14em] uppercase py-4 px-3">
                    <span className="text-[var(--prata)]">Imperium</span>
                    <span className="block text-[9px] text-[var(--nevoa)] font-normal tracking-normal normal-case mt-0.5">
                      Premium
                    </span>
                  </th>
                </tr>
              </thead>

              <tbody>
                {BASE_FEATURE_ROWS.map((feature, index) => (
                  <tr
                    key={feature.name}
                    className={`comparison-row border-b border-[rgba(184,196,204,0.06)] ${
                      index % 2 === 0 ? 'comparison-row-alt' : ''
                    }`}
                  >
                    <td className="text-[13px] text-[var(--prata-lt)] py-3.5 pr-4 pl-0 font-medium">
                      {feature.name}
                    </td>
                    <td className="py-3.5 px-3">
                      <CheckCell included={feature.signum} />
                    </td>
                    <td className="py-3.5 px-3">
                      <CheckCell included={feature.nomen} />
                    </td>
                    <td className="py-3.5 px-3 comparison-featured-cell comparison-featured-col">
                      <CheckCell included={feature.autoritas} />
                    </td>
                    <td className="py-3.5 px-3">
                      <CheckCell included={feature.imperium} />
                    </td>
                  </tr>
                ))}

                {isMonthly && MONTHLY_FEATURE_ROWS.length > 0 && (
                  <tr className="border-b border-[rgba(184,196,204,0.12)] bg-[rgba(139,30,45,0.08)]">
                    <td className="py-3 pr-4 pl-0">
                      <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.14em] uppercase text-[var(--crimson-lt)]">
                        <Sparkles className="h-3.5 w-3.5" />
                        Exclusivo assinatura
                      </span>
                    </td>
                    <td
                      colSpan={4}
                      className="text-[11px] text-[var(--nevoa)] leading-[1.6] px-3 text-left"
                    >
                      Benefícios recorrentes mantidos apenas nas versões mensais de Autoritas e
                      Imperium.
                    </td>
                  </tr>
                )}

                {isMonthly &&
                  MONTHLY_FEATURE_ROWS.map((feature, index) => (
                    <tr
                      key={feature.name}
                      className={`comparison-row border-b border-[rgba(184,196,204,0.06)] ${
                        index % 2 === 0 ? 'comparison-row-alt' : ''
                      }`}
                    >
                      <td className="text-[13px] text-[var(--editorial)] py-3.5 pr-4 pl-0 font-medium">
                        {feature.name}
                      </td>
                      <td className="py-3.5 px-3">
                        <CheckCell included={feature.signum} />
                      </td>
                      <td className="py-3.5 px-3">
                        <CheckCell included={feature.nomen} />
                      </td>
                      <td className="py-3.5 px-3 comparison-featured-cell comparison-featured-col">
                        <CheckCell included={feature.autoritas} />
                      </td>
                      <td className="py-3.5 px-3">
                        <CheckCell included={feature.imperium} />
                      </td>
                    </tr>
                  ))}

                <tr className="border-b border-[rgba(184,196,204,0.12)] comparison-row">
                  <td className="text-[11px] font-bold tracking-[0.12em] uppercase text-[var(--nevoa)] pr-4 pl-0">
                    Preço
                  </td>
                  {PACKAGE_KEYS.map((key) => {
                    const price = getPriceMeta(key, isMonthly);

                    return (
                      <td
                        key={key}
                        className={`py-3.5 px-3 ${
                          key === 'autoritas' ? 'comparison-featured-cell comparison-featured-col' : ''
                        }`}
                      >
                        <span className="flex flex-col items-center justify-center text-center">
                          <span
                            className={`text-[clamp(15px,2vw,18px)] font-bold ${
                              price.accent ? 'text-[var(--crimson-lt)]' : 'text-[var(--prata)]'
                            }`}
                          >
                            {price.value}
                          </span>
                          {price.helper && (
                            <span className="text-[10px] text-[var(--nevoa)] mt-1">
                              {price.helper}
                            </span>
                          )}
                        </span>
                      </td>
                    );
                  })}
                </tr>

                <tr className="comparison-total-row">
                  <td className="text-[11px] font-bold tracking-[0.12em] uppercase text-[var(--nevoa)] pr-4 pl-0">
                    Total de recursos
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="flex items-center justify-center text-[16px] font-semibold text-[var(--prata)]">
                      {signumTotal}
                      <span className="text-[10px] font-normal text-[var(--nevoa)] ml-1">
                        / {activeFeatures.length}
                      </span>
                    </span>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="flex items-center justify-center text-[16px] font-semibold text-[var(--prata)]">
                      {nomenTotal}
                      <span className="text-[10px] font-normal text-[var(--nevoa)] ml-1">
                        / {activeFeatures.length}
                      </span>
                    </span>
                  </td>
                  <td className="py-3.5 px-3 comparison-featured-cell comparison-featured-col">
                    <span className="flex items-center justify-center text-[16px] font-semibold text-[var(--crimson-lt)]">
                      {autoritasTotal}
                      <span className="text-[10px] font-normal text-[var(--nevoa)] ml-1">
                        / {activeFeatures.length}
                      </span>
                    </span>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="flex items-center justify-center text-[16px] font-semibold text-[var(--prata)]">
                      {imperiumTotal}
                      <span className="text-[10px] font-normal text-[var(--nevoa)] ml-1">
                        / {activeFeatures.length}
                      </span>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="comparison-scroll-indicator">
            <span>Deslize para ver mais</span>
            <ChevronRight className="h-3 w-3" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
