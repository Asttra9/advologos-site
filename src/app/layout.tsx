import type { Metadata } from 'next';
import { DM_Serif_Display, Plus_Jakarta_Sans, Fira_Code } from 'next/font/google';
import { Toaster } from 'sonner';
import { FACEBOOK_URL, INSTAGRAM_URL, SITE_CONFIG } from '@/lib/constants';
import './globals.css';

const dmSerif = DM_Serif_Display({
  variable: '--font-dm-serif',
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets: ['latin'],
  display: 'swap',
});

const firaCode = Fira_Code({
  variable: '--font-fira-code',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  alternates: {
    canonical: '/',
  },
  keywords: [
    'branding jurídico',
    'identidade visual advocacia',
    'marketing jurídico',
    'marca para advogados',
    'design para escritórios de advocacia',
    'Advologos',
    'posicionamento jurídico',
    'presença digital advogado',
  ],
  authors: [{ name: SITE_CONFIG.name }],
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/logo.svg',
  },
  openGraph: {
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    type: 'website',
    locale: 'pt_BR',
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.tagline,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.ogImage],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${SITE_CONFIG.url}/#organization`,
  name: SITE_CONFIG.name,
  description: SITE_CONFIG.description,
  url: SITE_CONFIG.url,
  email: SITE_CONFIG.contactEmail,
  areaServed: {
    '@type': 'Country',
    name: 'Brazil',
  },
  serviceType: 'Branding Jurídico',
  sameAs: [INSTAGRAM_URL, FACEBOOK_URL],
  knowsAbout: [
    'Branding jurídico',
    'Identidade visual para advogados',
    'Presença digital para escritórios',
    'Posicionamento de marca no mercado legal',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${dmSerif.variable} ${jakarta.variable} ${firaCode.variable} antialiased`}
      >
        <a href="#main-content" className="skip-to-content">
          Pular para conteúdo
        </a>
        {children}
        <Toaster
          position="top-center"
          richColors
          closeButton
          toastOptions={{
            duration: 5000,
          }}
        />
      </body>
    </html>
  );
}
