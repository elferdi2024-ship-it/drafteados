// filepath: src/app/nba/calendario/page.tsx
import { basketball } from "@/lib/data/basketball/composite-provider";
import { CalendarClient } from "@/components/nba/CalendarClient";

import type { Metadata } from "next";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Calendario NBA 2026/27 · Partidos y Horarios Oficiales",
  description:
    "Todos los partidos de la temporada NBA 2026/27. Horarios para España peninsular y EE.UU., filtros por conferencia y cartelera completa.",
  openGraph: {
    title: "Calendario NBA 2026/27 · Partidos y Horarios Oficiales | Drafteados",
    description:
      "Todos los partidos de la temporada regular y pretemporada NBA con horarios locales para España y EE.UU.",
    url: "https://drafteados.com/nba/calendario",
    siteName: "Drafteados",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "/images/og-nba.png",
        width: 1200,
        height: 630,
        alt: "Calendario NBA · Drafteados",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Calendario NBA 2026/27 · Fechas y Horarios | Drafteados",
    description:
      "Todos los partidos de la temporada NBA con horarios para España y EE.UU.",
    site: "@drafteados",
    creator: "@drafteados",
    images: ["/images/og-nba.png"],
  },
};

export default async function CalendarPage() {
  const [games, teams] = await Promise.all([
    basketball.getGames({}),
    basketball.getTeams(),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <header className="border-b border-[var(--hub-border)] pb-6">
        <div className="flex items-center gap-2 text-xs font-sans font-semibold tracking-widest text-[var(--hub-accent)] uppercase mb-2">
          <span>NBA HUB · LOS BUQUES</span>
          <span>•</span>
          <span>TEMPORADA 2026/27</span>
        </div>
        <h1
          className="text-4xl sm:text-6xl font-black text-[var(--hub-text)] uppercase tracking-tight leading-none"
          style={{ fontFamily: "var(--hub-font-display)" }}
        >
          CALENDARIO
        </h1>
        <p className="text-sm sm:text-base text-[var(--hub-text-secondary)] mt-1.5 font-normal">
          Todos los partidos · Horarios España y EE.UU.
        </p>
      </header>

      {/* Interactive Calendar Client */}
      <CalendarClient initialGames={games} teams={teams} />
    </div>
  );
}
