// filepath: src/app/nba/layout.tsx
import type { Metadata } from "next";
import { HubNav } from "@/components/nba/HubNav";
import { SITE_URL } from "@/lib/seo/config";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "NBA Hub · Marcadores en Vivo, Clasificación y Estadísticas | Drafteados",
    template: "%s | Drafteados NBA",
  },
  description:
    "El cuartel general de la NBA para los Buques. Marcadores en directo, partidos de hoy, clasificación Este/Oeste, campeón vigente NY Knicks y estadísticas oficiales 2026/27.",
  keywords: [
    "NBA en vivo",
    "partidos NBA hoy",
    "resultados NBA",
    "clasificacion NBA",
    "campeon NBA Knicks",
    "lideres NBA",
    "Drafteados NBA",
    "Los Buques",
    "calendario NBA 2026",
  ],
  alternates: {
    canonical: `${SITE_URL}/nba`,
  },
  openGraph: {
    title: "NBA Hub de los Buques · Resultados, Marcadores y Clasificación en Vivo",
    description:
      "Marcadores en directo, clasificación Este y Oeste, calendario oficial y estadísticas de la NBA.",
    url: `${SITE_URL}/nba`,
    siteName: "Drafteados",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/images/og-nba.png`,
        secureUrl: `${SITE_URL}/images/og-nba.png`,
        width: 1200,
        height: 630,
        alt: "NBA Hub · Drafteados",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NBA Hub · Los Buques | Drafteados",
    description:
      "Marcadores oficiales, clasificación Este/Oeste y el análisis diario de la NBA.",
    site: "@drafteados",
    creator: "@drafteados",
    images: [`${SITE_URL}/images/og-nba.png`],
  },
};

export default function NbaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--hub-bg)] text-[var(--hub-text)] font-sans antialiased selection:bg-[var(--hub-accent)] selection:text-white pb-16">
      <HubNav />
      {children}
    </div>
  );
}
