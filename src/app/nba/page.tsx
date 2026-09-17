// filepath: src/app/nba/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Trophy, Flame, AlertCircle, Calendar, Users, BarChart3, ChevronRight } from "lucide-react";
import { basketball } from "@/lib/data/basketball/composite-provider";
import { ScoreboardCard } from "@/components/nba/ScoreboardCard";
import { SectionHeader } from "@/components/nba/SectionHeader";
import { MiniStandings } from "@/components/nba/MiniStandings";
import { MiniLeaders } from "@/components/nba/MiniLeaders";
import { CountdownClock } from "@/components/nba/CountdownClock";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "NBA Hub · Marcadores, Clasificación y Estadísticas",
  description:
    "El cuartel general de la NBA para los Buques. Marcadores en directo, clasificación Este/Oeste, calendario 2026/27, plantillas de las 30 franquicias y Pick'em oficial.",
  openGraph: {
    title: "NBA Hub de los Buques · Resultados, Marcadores y Clasificación en Vivo",
    description:
      "Seguí la jornada NBA con la mirada de Drafteados. Marcadores oficiales en tiempo real, tabla de posiciones y plantillas actualizadas.",
    url: "https://drafteados.com/nba",
    siteName: "Drafteados",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "/images/og-nba.png",
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
    images: ["/images/og-nba.png"],
  },
};

export default async function NbaHubPage() {
  const [games, standings, ptsLeaders, astLeaders, rebLeaders, fg3mLeaders] = await Promise.all([
    basketball.getScoreboard(),
    basketball.getStandings(),
    basketball.getLeaders("pts", "2026-27", 6),
    basketball.getLeaders("ast", "2026-27", 6),
    basketball.getLeaders("reb", "2026-27", 6),
    basketball.getLeaders("fg3m", "2026-27", 6),
  ]);

  const liveGames = games.filter((g) => g.status === "live");
  const upcomingGames = games.filter((g) => g.status === "scheduled");
  const finalGames = games.filter((g) => g.status === "final");

  const leadersDict = {
    pts: ptsLeaders,
    ast: astLeaders,
    reb: rebLeaders,
    fg3m: fg3mLeaders,
  };

  const todayStr = new Intl.DateTimeFormat("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date());

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Hero Header */}
      <header className="border-b border-[var(--hub-border)] pb-6">
        <div className="flex items-center gap-2 text-xs font-sans font-semibold tracking-widest text-[var(--hub-accent)] uppercase mb-2">
          <span>NBA HUB · LOS BUQUES</span>
          <span>•</span>
          <span className="capitalize">{todayStr}</span>
        </div>
        <h1
          className="text-4xl sm:text-6xl lg:text-7xl font-black text-[var(--hub-text)] uppercase tracking-tight leading-none"
          style={{ fontFamily: "var(--hub-font-display)", letterSpacing: "-0.03em" }}
        >
          HOY EN LA NBA
        </h1>
        <p className="text-sm sm:text-base text-[var(--hub-text-secondary)] mt-2 max-w-xl font-normal">
          Marcadores, clasificación y lo que importa hoy.
        </p>
      </header>

      {/* Reloj Cuenta Regresiva Salto Inicial 2026/27 */}
      <CountdownClock />

      {/* Quick Stat Strip / Claves de Temporada (Compacto & Escaneable) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="rounded-2xl border border-[var(--hub-border)] bg-[var(--hub-surface)] p-4 flex flex-col justify-between shadow-sm">
          <span className="text-[11px] font-sans uppercase tracking-wider text-[var(--hub-text-muted)] font-bold">
            OPENING NIGHT
          </span>
          <span className="text-base sm:text-lg font-black text-[var(--hub-text)] mt-1 font-mono">
            20 OCTUBRE 2026
          </span>
        </div>
        <Link
          href="/nba/equipo/knicks"
          className="rounded-2xl border border-[var(--hub-border)] bg-[var(--hub-surface)] p-4 flex flex-col justify-between hover:border-[var(--hub-accent)] transition-colors group shadow-sm"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-sans uppercase tracking-wider text-[var(--hub-text-muted)] font-bold">
              CAMPEÓN VIGENTE
            </span>
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
          </div>
          <span className="text-base sm:text-lg font-black text-[var(--hub-text)] group-hover:text-[var(--hub-accent)] transition-colors mt-1">
            NY KNICKS (4-1)
          </span>
        </Link>
        <Link
          href="/nba/equipo/spurs"
          className="rounded-2xl border border-[var(--hub-border)] bg-[var(--hub-surface)] p-4 flex flex-col justify-between hover:border-[var(--hub-accent)] transition-colors group shadow-sm"
        >
          <span className="text-[11px] font-sans uppercase tracking-wider text-[var(--hub-text-muted)] font-bold">
            SUBCAMPEÓN 2026
          </span>
          <span className="text-base sm:text-lg font-black text-[var(--hub-text)] group-hover:text-[var(--hub-accent)] transition-colors mt-1">
            SAN ANTONIO SPURS
          </span>
        </Link>
        <div className="rounded-2xl border border-[var(--hub-border)] bg-[var(--hub-surface)] p-4 flex flex-col justify-between shadow-sm">
          <span className="text-[11px] font-sans uppercase tracking-wider text-[var(--hub-text-muted)] font-bold">
            COBERTURA TOTAL
          </span>
          <span className="text-base sm:text-lg font-black text-[var(--hub-accent)] mt-1 font-mono">
            82 PARTIDOS + PLAYOFFS
          </span>
        </div>
      </div>

      {/* 1. Partidos / Calendario de la Jornada */}
      <section className="space-y-4">
        <SectionHeader
          eyebrow="CALENDARIO OFICIAL · SEMANA INAUGURAL"
          title="Partidos de la jornada"
          subtitle="Horarios oficiales para España (peninsular) y EE.UU."
          actionHref="/nba/calendario"
          actionLabel="Ver Calendario Completo"
        />

        {games.length === 0 ? (
          <div className="rounded-2xl border border-[var(--hub-border)] bg-[var(--hub-surface)] p-8 text-center space-y-2">
            <AlertCircle className="w-7 h-7 text-[var(--hub-accent)] mx-auto" />
            <p className="font-bold text-base text-[var(--hub-text)]">
              Sin partidos en juego en este momento.
            </p>
            <p className="text-xs sm:text-sm text-[var(--hub-text-muted)] max-w-md mx-auto">
              Consultá la cartelera de la semana inaugural o prepará tus predicciones en el Pick&apos;em.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {liveGames.map((game) => (
              <ScoreboardCard key={game.id} game={game} />
            ))}
            {upcomingGames.map((game) => (
              <ScoreboardCard key={game.id} game={game} />
            ))}
            {finalGames.map((game) => (
              <ScoreboardCard key={game.id} game={game} />
            ))}
          </div>
        )}
      </section>

      {/* 2. Grid Clasificación Rápida & Líderes */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <MiniStandings standings={standings} limit={6} />
        <MiniLeaders leaders={leadersDict} limit={6} />
      </section>

      {/* 3. Call to Action Editorial hacia Pick'em */}
      <section className="rounded-2xl border border-[var(--hub-accent)]/30 bg-gradient-to-r from-[var(--hub-accent)]/10 via-[var(--hub-surface)] to-[var(--hub-surface)] p-6 sm:p-8 shadow-[var(--hub-shadow)] relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold tracking-wider uppercase bg-[var(--hub-accent-soft)] text-[var(--hub-accent)] border border-[var(--hub-accent)]/20">
            <Flame className="w-3 h-3" />
            <span>PRONÓSTICO TEMPORADA 2026/27</span>
          </div>

          <h2
            className="text-2xl sm:text-4xl font-black text-[var(--hub-text)] uppercase tracking-tight leading-none"
            style={{ fontFamily: "var(--hub-font-display)", letterSpacing: "-0.03em" }}
          >
            ¿LISTO PARA EL SALTO INICIAL?
          </h2>

          <p className="text-xs sm:text-sm text-[var(--hub-text-muted)] font-normal leading-relaxed">
            Completá tus 13 predicciones oficiales de la temporada y competí contra toda la comunidad de los Buques.
          </p>

          <div className="flex items-center gap-4 text-xs font-mono text-[var(--hub-text-dim)] pt-1">
            <span>13 PREGUNTAS</span>
            <span>•</span>
            <span>PREMIOS EXCLUSIVOS</span>
            <span>•</span>
            <span>RANKING EN VIVO</span>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              href="/pickem"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--hub-accent)] hover:bg-[var(--hub-accent-hover)] text-white font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-98"
            >
              <span>Jugar Pick&apos;em</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/pickem/leaderboard"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[var(--hub-border)] bg-[var(--hub-surface-2)] hover:border-[var(--hub-accent)] text-[var(--hub-text)] font-mono font-bold text-xs uppercase tracking-wider transition-all active:scale-98"
            >
              <Trophy className="w-3.5 h-3.5 text-[var(--hub-accent)]" />
              <span>Leaderboard</span>
            </Link>
          </div>
        </div>
      </section>

      {/* SEO Structured Data Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SportsOrganization",
            "name": "Drafteados NBA Hub",
            "url": "https://drafteados.com/nba",
            "description": "El hub oficial de la NBA en español para los Buques. Marcadores en vivo, clasificación Este/Oeste y estadísticas.",
            "sport": "Basketball",
          }),
        }}
      />
    </div>
  );
}
