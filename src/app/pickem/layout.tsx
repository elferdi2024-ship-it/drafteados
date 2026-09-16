// filepath: src/app/pickem/layout.tsx
import type { Metadata } from 'next';
import { PickemHeader } from '@/components/pickem/PickemHeader';
import { MobileAppNavigation } from '@/components/pickem/MobileAppNavigation';

export const metadata: Metadata = {
  title: "Drafteados Pick'em · Pronóstico Oficial NBA 2026/27 | Los Buques",
  description: 'Hacé tus 13 predicciones para la temporada NBA 2026/27. Multiplicador Sorpresa x1.5 para elecciones audaces, cromos de colección, rankings en vivo y la gloria oficial de los Buques.',
  keywords: [
    'Drafteados Pickem',
    'predicciones NBA 2026',
    'pronosticos NBA',
    'MVP NBA pronostico',
    'Drafteados',
    'Los Buques',
    'juego NBA gratis',
    'fantasy NBA espana',
  ],
  authors: [{ name: 'Drafteados' }],
  creator: 'Drafteados',
  publisher: 'Drafteados',
  metadataBase: new URL('https://drafteados.com'),
  alternates: {
    canonical: '/pickem',
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://drafteados.com/pickem',
    siteName: 'Drafteados',
    title: "Drafteados Pick'em · Pronóstico Oficial NBA 2026/27",
    description: 'Hacé tus 13 predicciones para la temporada NBA. Multiplicador Sorpresa x1.5, cromos de colección y ranking en vivo contra la comunidad.',
    images: [
      {
        url: '/images/og-pickem.jpg',
        width: 1200,
        height: 630,
        alt: "Drafteados Pick'em NBA - Pronóstico Oficial de los Buques",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Drafteados Pick'em · Pronóstico Oficial NBA 2026/27",
    description: '¿A quién te jugás, Buque? Hacé tus 13 predicciones y competí por la gloria en el ranking oficial.',
    creator: '@Drafteados',
    images: ['/images/og-pickem.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://drafteados.com/#organization',
      name: 'Drafteados',
      url: 'https://drafteados.com',
      logo: 'https://drafteados.com/images/logo.png',
      sameAs: [
        'https://twitter.com/drafteados',
        'https://youtube.com/c/drafteados',
        'https://instagram.com/drafteados',
      ],
    },
    {
      '@type': 'WebApplication',
      '@id': 'https://drafteados.com/pickem/#app',
      name: "Drafteados Pick'em",
      url: 'https://drafteados.com/pickem',
      applicationCategory: 'SportsApplication',
      operatingSystem: 'All',
      inLanguage: 'es',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      publisher: {
        '@id': 'https://drafteados.com/#organization',
      },
    },
    {
      '@type': 'SportsEvent',
      name: 'NBA Season 2026/27 Predictions',
      description: "Juego oficial de predicciones de la temporada NBA 2026/27 organizado por Drafteados.",
      startDate: '2026-10-22T00:00:00Z',
      endDate: '2027-06-25T00:00:00Z',
      sport: 'Basketball',
      organizer: {
        '@id': 'https://drafteados.com/#organization',
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Drafteados',
          item: 'https://drafteados.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: "Pick'em NBA",
          item: 'https://drafteados.com/pickem',
        },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: "¿Qué es Drafteados Pick'em?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Es el pronóstico oficial de la comunidad de los Buques para la temporada NBA 2026/27. Te permite predecir 13 categorías (MVP, Campeón, Líderes estadísticos y galardones) y competir en un ranking en vivo.",
          },
        },
        {
          '@type': 'Question',
          name: '¿Cómo funciona el multiplicador Sorpresa x1.5?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Si elegís un candidato que tiene menos del 15% de consenso entre la comunidad y aciertas tu predicción, sumás un multiplicador del 50% extra de puntos (x1.5 PTS).',
          },
        },
        {
          '@type': 'Question',
          name: '¿Cuándo se cierran y sellan las predicciones (Lock)?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Las predicciones se sellan definitivamente al inicio del primer partido de la noche inaugural de la temporada regular NBA. Luego de esa hora, no se admiten modificaciones.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Tiene algún costo participar en el Pick\'em?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No, Drafteados Pick\'em es 100% gratuito para toda la comunidad de los Buques.',
          },
        },
      ],
    },
  ],
};

export default function PickemLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-background text-foreground transition-colors duration-300 min-h-screen font-sans selection:bg-[#FF5A1F] selection:text-white pb-20 md:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PickemHeader />
      <main className="pt-16 sm:pt-18">
        {children}
      </main>
      <MobileAppNavigation />
    </div>
  );
}
