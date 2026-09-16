// filepath: src/app/nba/calendario/page.tsx
import { basketball } from "@/lib/data/basketball/composite-provider";
import { CalendarClient } from "@/components/nba/CalendarClient";
import { CountdownClock } from "@/components/nba/CountdownClock";

import type { Metadata } from "next";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Calendario NBA 2026/27 · Partidos y Horarios Oficiales",
  description:
    "Programación oficial y calendario de la NBA 2026/27. Horarios para España peninsular y EE.UU., filtros por conferencia y cartelera completa.",
  openGraph: {
    title: "Calendario NBA 2026/27 · Partidos y Horarios Oficiales | Drafteados",
    description:
      "Programación completa de la temporada NBA 2026/27 con horarios en vivo para España y EE.UU., sedes y filtros por equipo.",
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
      "Programación completa de la temporada NBA con horarios para España y EE.UU.",
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
        <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[var(--hub-accent)] uppercase mb-2">
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
        <p className="text-sm sm:text-base text-[var(--hub-text-muted)] mt-1.5 font-normal">
          Programación oficial de la temporada con fechas exactas, pabellones y horarios para España (peninsular) y EE.UU.
        </p>
      </header>

      {/* Reloj Cuenta Regresiva */}
      <CountdownClock />

      {/* Interactive Calendar Client */}
      <CalendarClient initialGames={games} teams={teams} />
    </div>
  );
}
