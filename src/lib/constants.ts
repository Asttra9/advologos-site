const normalizedSiteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://advologos.space.z.ai')
  .trim()
  .replace(/\/+$/, '');

export const SITE_CONFIG = {
  name: 'Advologos',
  tagline: 'Marcas jurídicas com presença, clareza e autoridade.',
  headerTitle: 'Branding e presença digital para advogados e escritórios.',
  description:
    'A Advologos estrutura a forma como o mercado percebe quem advoga. Branding jurídico especializado com identidade visual, presença digital e autoridade de marca.',
  url: normalizedSiteUrl,
  ogImage: '/og-image.svg',
  contactEmail: (process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'advologos@gmail.com').trim(),
};

export const WHATSAPP_URL =
  (process.env.NEXT_PUBLIC_WHATSAPP_URL ?? 'https://wa.me/message/6MYA5WTYF5DEH1').trim();

export const INSTAGRAM_URL =
  (process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? 'https://www.instagram.com/advologos/').trim();

export const FACEBOOK_URL =
  (process.env.NEXT_PUBLIC_FACEBOOK_URL ?? 'https://www.facebook.com/advologos').trim();

export const NAV_LINKS = [
  { href: '#problema', label: 'Por que' },
  { href: '#servicos', label: 'Serviços' },
  { href: '#metodo', label: 'Método' },
  { href: '#autoridade', label: 'Autoridade' },
  { href: '#faq', label: 'FAQ' },
  { href: '#cta', label: 'Contato' },
];

export const CONTACT_CHANNELS = [
  {
    icon: 'Instagram' as const,
    href: INSTAGRAM_URL,
    label: 'Instagram',
  },
  {
    icon: 'Facebook' as const,
    href: FACEBOOK_URL,
    label: 'Facebook',
  },
  {
    icon: 'Mail' as const,
    href: `mailto:${SITE_CONFIG.contactEmail}`,
    label: 'E-mail',
  },
];

export interface ServiceItem {
  tier: string;
  name: string;
  meaning?: string;
  description: string;
  items: string[];
  price: string;
  monthlyPrice?: string;
  monthlyContractLabel?: string;
  monthlyExtraItems?: string[];
  featured?: boolean;
}

export const SERVICES: ServiceItem[] = [
  {
    tier: 'Entrada',
    name: 'Signum',
    meaning: '"A marca que te distingue"',
    description:
      'Fundação visual completa para profissionais que iniciam sua presença de marca no mercado jurídico. Todos os arquivos necessários para começar.',
    items: [
      'Logotipo Vetorial',
      'Símbolo PNG',
      "Marca D'Água",
      'Logo Foto de Perfil para Redes Sociais',
      'Assinatura de e-mail profissional',
      'Mockups 3D com aplicações reais da sua marca',
      'Arquivos Originais',
    ],
    price: 'R$ 89,90',
  },
  {
    tier: 'Profissional',
    name: 'Nomen',
    meaning: '"O nome que profissionaliza"',
    description:
      'Tudo do Signum, mais os materiais profissionais que transformam uma marca visual em uma presença completa. Para quem está pronto para impressionar em cada ponto de contato.',
    items: [
      'Tudo do pacote Signum',
      'Cartão de Visitas Profissional (Arte)',
      'Papel Timbrado Profissional (Word)',
      'Kit redes sociais (3 Templates para Post e 3 Templates para Stories)',
    ],
    price: 'R$ 139,99',
  },
  {
    tier: 'Recomendado',
    name: 'Autoritas',
    meaning: '"A autoridade que se constrói"',
    description:
      'Branding completo com presença digital estruturada. Para profissionais que querem ser percebidos como referência em sua área de atuação.',
    items: [
      'Tudo do Nomen, expandido',
      'Landing Page',
      'Manual da marca',
      'Perfil Instagram estratégico',
      '10 templates de conteúdo',
      'Proposta comercial diagramada',
      'Cartão de visita + papelaria',
    ],
    price: 'R$ 290',
    monthlyPrice: 'R$ 59,99/mês',
    monthlyContractLabel: 'Contrato mínimo: 6 meses',
    monthlyExtraItems: [
      'Suporte mensal dedicado',
      'Atualizações de templates trimestrais',
      'Relatório de desempenho digital',
    ],
    featured: true,
  },
  {
    tier: 'Premium',
    name: 'Imperium',
    meaning: '"A presença que precede a conversa"',
    description:
      'Sistema completo de marca e presença digital para escritórios que precisam comunicar autoridade em múltiplos canais com consistência absoluta.',
    items: [
      'Tudo do Autoritas, ampliado',
      'Site completo multi-página',
      'Estratégia de conteúdo 90 dias',
      'Brand guidelines interativo',
      'Consultoria de posicionamento',
      'Suporte mensal 3 meses',
    ],
    price: 'R$ 890',
    monthlyPrice: 'R$ 99,99/mês',
    monthlyContractLabel: 'Contrato mínimo: 1 ano',
    monthlyExtraItems: [
      'Suporte prioritário contínuo',
      'Atualizações contínuas de conteúdo',
      'Consultoria trimestral de posicionamento',
      'Adaptação visual para novos canais',
    ],
  },
];

export const METHOD_STEPS = [
  {
    num: '01',
    title: 'Diagnóstico de Percepção',
    text: 'Analisamos como o profissional é percebido hoje e como precisa ser percebido para atingir seus objetivos. A marca começa no problema de negócio, não no estilo.',
  },
  {
    num: '02',
    title: 'Estratégia de Posicionamento',
    text: 'Definimos o território de marca: área de atuação, público prioritário, diferencial competitivo e tom de voz. Tudo documentado antes do primeiro traço de design.',
  },
  {
    num: '03',
    title: 'Construção do Sistema Visual',
    text: 'Logotipo, cores, tipografia e elementos gráficos desenvolvidos como um sistema, não como peças isoladas. Cada decisão tem uma razão estrutural documentada.',
  },
  {
    num: '04',
    title: 'Aplicação e Presença Digital',
    text: 'A identidade é aplicada em todos os pontos de contato definidos no pacote: site, redes sociais, materiais impressos e templates operacionais.',
  },
  {
    num: '05',
    title: 'Entrega e Documentação',
    text: 'Brand guidelines completo, arquivos originais organizados e instruções de uso. A marca entregue é operável sem a Advologos, por design.',
  },
];

export const CHECKLIST_ITEMS = [
  'Alinhado ao Provimento 205/2021 da OAB',
  'Arquivos em formatos profissionais editáveis',
  'Manual de uso com todos os contextos mapeados',
  'Sistema pensado para escalar, não engavetar',
  'Sem dependência contínua de agência para operar',
  'Revisões documentadas e aprovação etapa por etapa',
];

export const PILLARS = [
  {
    icon: 'scale' as const,
    title: 'Especialização jurídica',
    text: 'Conhecemos as restrições éticas, o vocabulário técnico e a forma como o cliente jurídico toma decisões. Não é nicho, é foco.',
  },
  {
    icon: 'diamond' as const,
    title: 'Sistemas, não peças',
    text: 'Entregamos identidades que funcionam em qualquer contexto, não logotipos bonitos que perdem coerência no segundo uso.',
  },
  {
    icon: 'triangle' as const,
    title: 'Método documentado',
    text: 'Cada decisão tem uma justificativa estratégica. O cliente recebe o raciocínio, não apenas o resultado, porque marca é decisão, não gosto.',
  },
];

export const TESTIMONIALS = [
  {
    quote:
      'Conhecemos as restrições éticas, o vocabulário técnico e a forma como o cliente jurídico toma decisões.',
    author: 'Especialização jurídica',
    role: 'Escopo da operação',
  },
  {
    quote:
      'Entregamos identidades que funcionam em qualquer contexto, não logotipos bonitos que perdem coerência no segundo uso.',
    author: 'Sistemas, não peças',
    role: 'Lógica de entrega',
  },
  {
    quote:
      'Cada decisão tem uma justificativa estratégica. O cliente recebe o raciocínio, não apenas o resultado.',
    author: 'Método documentado',
    role: 'Critério aplicado',
  },
];

export const VOICE_PRINCIPLES = [
  {
    title: 'Estruturada',
    text: 'Toda comunicação tem arquitetura interna: problema, relevância e solução. Não há floreio sem função.',
  },
  {
    title: 'Precisa',
    text: 'Estruturar uma marca é diferente de criar um logo. A precisão vocabular acompanha o universo técnico do cliente jurídico.',
  },
  {
    title: 'Direta sem ser fria',
    text: 'Autoridade não exige distância. A linguagem é clara, técnica quando precisa e humana quando convém.',
  },
  {
    title: 'Sem hype',
    text: 'Nada de promessa inflada ou vocabulário de infoproduto. A categoria da Advologos é outra.',
  },
];

export const FAQ_ITEMS = [
  {
    question: 'Preciso ter um escritório grande para contratar a Advologos?',
    answer:
      'Não. Trabalhamos com advogados individualmente, sócios de escritórios de médio porte e grandes firmas. O que muda é a escala do projeto, não a qualidade da entrega. Nossa metodologia foi criada justamente para profissionais que estão construindo a presença de sua marca.',
  },
  {
    question: 'O trabalho da Advologos respeita as regras da OAB?',
    answer:
      'Integralmente. Todo nosso trabalho segue o Provimento 205/2021 do Conselho Federal da OAB, que regulamenta a publicidade na advocacia. Não utilizamos mercantilização indevida, captação de clientela ou promessas de resultados. Branding é comunicação de identidade — e isso é permitido e incentivado pelo Provimento.',
  },
  {
    question: 'Quanto tempo leva um projeto de branding?',
    answer:
      'Depende do pacote contratado. O Signum leva em média 2 a 3 dias úteis. O Autoritas, normalmente 1 semana. O Imperium depende do escopo do projeto, mas leva em média 2 a 4 semanas. Cada etapa é documentada e passível de aprovação. Não há surpresas no processo.',
  },
  {
    question: 'A Advologos cria conteúdo para redes sociais?',
    answer:
      'Criamos conteúdo sim. Fazemos templates estratégicos e guias de conteúdo para que você (ou seu time) possam usar de forma consistente. Porém, o gerenciamento de Social Media está disponível somente nos pacotes Imperium e Autoritas, via contrato de assinatura mensal.',
  },
  {
    question: 'Posso migrar de um pacote para outro durante o projeto?',
    answer:
      'Sim. Se durante o projeto surgir necessidade de mais escopo, é possível migrar para um pacote superior com abatimento proporcional do valor já investido. Não fazemos upgrade forçado — a decisão é sempre do cliente.',
  },
  {
    question: 'O que acontece se uma entrega precisar de ajuste?',
    answer:
      'Cada etapa do projeto tem revisões documentadas. Apresentamos o raciocínio estratégico por trás de cada decisão — porque marca é decisão, não gosto. Se algo não atender ao briefing, revisamos com base no documento de posicionamento aprovado. Em quatro anos de operação, nunca tivemos um projeto não finalizado.',
  },
];
