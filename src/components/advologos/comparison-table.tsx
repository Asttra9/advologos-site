'use client';

import { Check, ChevronRight } from 'lucide-react';
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

const FEATURE_ROWS = buildFeatureRows();

function buildFeatureRows(): ComparisonRow[] {
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

export function ComparisonTable() {
  const signumTotal = getFeatureCount(FEATURE_ROWS, 'signum');
  const nomenTotal = getFeatureCount(FEATURE_ROWS, 'nomen');
  const autoritasTotal = getFeatureCount(FEATURE_ROWS, 'autoritas');
  const imperiumTotal = getFeatureCount(FEATURE_ROWS, 'imperium');

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
            Veja a progressão real de cada pacote e compare, no mesmo quadro, os recursos incluídos em cada nível.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={3}>
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
                {FEATURE_ROWS.map((feature, index) => (
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

                <tr className="border-b border-[rgba(184,196,204,0.12)] comparison-row">
                  <td className="text-[11px] font-bold tracking-[0.12em] uppercase text-[var(--nevoa)] pr-4 pl-0">
                    Preço
                  </td>
                  {PACKAGE_KEYS.map((key) => (
                    <td
                      key={key}
                      className={`py-3.5 px-3 ${
                        key === 'autoritas' ? 'comparison-featured-cell comparison-featured-col' : ''
                      }`}
                    >
                      <span className="flex flex-col items-center justify-center text-center">
                        <span
                          className={`text-[clamp(15px,2vw,18px)] font-bold ${
                            SERVICE_MAP[key].featured ? 'text-[var(--crimson-lt)]' : 'text-[var(--prata)]'
                          }`}
                        >
                          {SERVICE_MAP[key].price}
                        </span>
                      </span>
                    </td>
                  ))}
                </tr>

                <tr className="comparison-total-row">
                  <td className="text-[11px] font-bold tracking-[0.12em] uppercase text-[var(--nevoa)] pr-4 pl-0">
                    Total de recursos
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="flex items-center justify-center text-[16px] font-semibold text-[var(--prata)]">
                      {signumTotal}
                      <span className="text-[10px] font-normal text-[var(--nevoa)] ml-1">
                        / {FEATURE_ROWS.length}
                      </span>
                    </span>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="flex items-center justify-center text-[16px] font-semibold text-[var(--prata)]">
                      {nomenTotal}
                      <span className="text-[10px] font-normal text-[var(--nevoa)] ml-1">
                        / {FEATURE_ROWS.length}
                      </span>
                    </span>
                  </td>
                  <td className="py-3.5 px-3 comparison-featured-cell comparison-featured-col">
                    <span className="flex items-center justify-center text-[16px] font-semibold text-[var(--crimson-lt)]">
                      {autoritasTotal}
                      <span className="text-[10px] font-normal text-[var(--nevoa)] ml-1">
                        / {FEATURE_ROWS.length}
                      </span>
                    </span>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="flex items-center justify-center text-[16px] font-semibold text-[var(--prata)]">
                      {imperiumTotal}
                      <span className="text-[10px] font-normal text-[var(--nevoa)] ml-1">
                        / {FEATURE_ROWS.length}
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
