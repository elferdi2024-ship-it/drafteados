// filepath: src/app/nba/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Trophy, Flame, AlertCircle, Calendar, Users, BarChart3, ChevronRight } from "lucide-react";
import { basketball } from "@/lib/data/basketball/composite-provider";
import { PageHeader, EmptyState, Button } from "@/components/ui";
import { GameCard, TeamLogo } from "@/components/nba";
import { getTeamLogoUrl, getTeamNbaId } from "@/lib/basketball/nbaIds";
import { SectionHeader } from "@/components/nba/SectionHeader";
import { MiniStandings } from "@/components/nba/MiniStandings";
import { MiniLeaders } from "@/components/nba/MiniLeaders";
import { CountdownClock } from "@/components/nba/CountdownClock";

import { buildMetadata, SITE_URL } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";

export const revalidate = 60;

export const metadata: Metadata = buildMetadata({
  title: "Hoy en la NBA | Marcadores y clasificación",
  description:
    "El cuartel general de la NBA para los Buques. Marcadores en directo, clasificación Este/Oeste, calendario 2026/27 y plantillas oficiales.",
  path: "/nba",
  image: `${SITE_URL}/images/og-nba.png`,
});

function mapGameToCardProps(game: any) {
  const awayNbaId = getTeamNbaId(game.awayTeam.abbreviation, game.awayTeam.name);
  const homeNbaId = getTeamNbaId(game.homeTeam.abbreviation, game.homeTeam.name);

  let statusLabel = "Programado";
  if (game.status === "live") {
    statusLabel = `${game.period ? `${game.period}Q` : "EN VIVO"} ${game.clock || ""}`.trim();
  } else if (game.status === "final") {
    statusLabel = "Final";
  }

  return {
    status: (game.status === "live" ? "live" : game.status === "final" ? "final" : "scheduled") as "live" | "final" | "scheduled",
    statusLabel,
    date: game.date,
    broadcast: game.broadcast,
    arena: game.arena,
    href: `/nba/partido/${game.id}`,
    away: {
      tricode: game.awayTeam.abbreviation,
      name: game.awayTeam.name,
      record: game.awayRecord,
      logoUrl: awayNbaId ? getTeamLogoUrl(awayNbaId) : undefined,
      score: game.awayScore,
    },
    home: {
      tricode: game.homeTeam.abbreviation,
      name: game.homeTeam.name,
      record: game.homeRecord,
      logoUrl: homeNbaId ? getTeamLogoUrl(homeNbaId) : undefined,
      score: game.homeScore,
    },
  };
}

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
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: "NBA Hub", path: "/nba" },
        ])}
      />
      {/* PageHeader (DRAF-011 + COPY_DECK.md) */}
      <PageHeader
        eyebrow={`NBA HUB · LOS BUQUES · ${todayStr.toUpperCase()}`}
        title="Hoy en la NBA"
        description="Marcadores, clasificación y lo que importa hoy."
      />

      {/* Reloj Cuenta Regresiva Salto Inicial 2026/27 (Countdown solo en Hoy) */}
      <CountdownClock />

      {/* Quick Stat Strip / Claves de Temporada (Con Logos Oficiales) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="rounded-2xl border border-[var(--hub-border)] bg-[var(--hub-surface)] p-4 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-sans uppercase tracking-wider text-[var(--hub-text-muted)] font-bold">
              OPENING NIGHT
            </span>
            <div className="flex items-center -space-x-2">
              <TeamLogo tricode="BOS" size={24} />
              <TeamLogo tricode="NYK" size={24} />
            </div>
          </div>
          <span className="text-base sm:text-lg font-black text-[var(--hub-text)] mt-2 font-mono">
            20 OCTUBRE 2026
          </span>
        </div>
        <Link
          href="/nba/equipo/knicks"
          className="rounded-2xl border border-[var(--hub-border)] bg-[var(--hub-surface)] p-4 flex flex-col justify-between hover:border-[var(--hub-accent)] transition-colors group shadow-sm"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-sans uppercase tracking-wider text-[var(--hub-text-muted)] font-bold">
              CAMPEÓN · NARRATIVA BUQUES
            </span>
            <div className="flex items-center gap-1.5">
              <TeamLogo tricode="NYK" size={22} />
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
            </div>
          </div>
          <span className="text-base sm:text-lg font-black text-[var(--hub-text)] group-hover:text-[var(--hub-accent)] transition-colors mt-2">
            NY KNICKS (4-1)
          </span>
        </Link>
        <Link
          href="/nba/equipo/spurs"
          className="rounded-2xl border border-[var(--hub-border)] bg-[var(--hub-surface)] p-4 flex flex-col justify-between hover:border-[var(--hub-accent)] transition-colors group shadow-sm"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-sans uppercase tracking-wider text-[var(--hub-text-muted)] font-bold">
              SUBCAMPEÓN · NARRATIVA BUQUES
            </span>
            <TeamLogo tricode="SAS" size={22} />
          </div>
          <span className="text-base sm:text-lg font-black text-[var(--hub-text)] group-hover:text-[var(--hub-accent)] transition-colors mt-2">
            SAN ANTONIO SPURS
          </span>
        </Link>
        <div className="rounded-2xl border border-[var(--hub-border)] bg-[var(--hub-surface)] p-4 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-sans uppercase tracking-wider text-[var(--hub-text-muted)] font-bold">
              COBERTURA TOTAL
            </span>
            <div className="flex items-center -space-x-1.5 opacity-85">
              <TeamLogo tricode="LAL" size={20} />
              <TeamLogo tricode="GSW" size={20} />
              <TeamLogo tricode="DAL" size={20} />
            </div>
          </div>
          <span className="text-base sm:text-lg font-black text-[var(--hub-accent)] mt-2 font-mono">
            82 PARTIDOS + PLAYOFFS
          </span>
        </div>
      </div>

      {/* 1. Partidos / Calendario de la Jornada con GameCard */}
      <section className="space-y-4">
        <SectionHeader
          eyebrow="CALENDARIO OFICIAL · SEMANA INAUGURAL"
          title="Partidos de la jornada"
          subtitle="Horarios oficiales en tu zona horaria local con referencia NBA (ET)."
          actionHref="/nba/calendario"
          actionLabel="Ver Calendario Completo"
        />

        {games.length === 0 ? (
          <EmptyState
            title="Sin partidos en juego en este momento."
            description="Consultá la cartelera de la semana inaugural o prepará tus predicciones en el Pick'em."
            action={
              <Button href="/nba/calendario" variant="primary" size="sm">
                Ver calendario
              </Button>
            }
          />
        ) : (
          <div className="space-y-4">
            {liveGames.length > 0 && (
              <div className="space-y-3 p-4 rounded-2xl border border-[var(--hub-live)]/30 bg-[var(--hub-live-soft)]/20">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--hub-live)] motion-safe:animate-ping" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--hub-live)]">
                    EN VIVO AHORA ({liveGames.length})
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {liveGames.map((game) => (
                    <GameCard key={game.id} {...mapGameToCardProps(game)} />
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {upcomingGames.map((game) => (
                <GameCard key={game.id} {...mapGameToCardProps(game)} />
              ))}
              {finalGames.map((game) => (
                <GameCard key={game.id} {...mapGameToCardProps(game)} />
              ))}
            </div>
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
            <Button
              href="/pickem"
              variant="primary"
              size="md"
              iconRight={<ArrowRight className="w-3.5 h-3.5" />}
              className="text-xs font-mono font-bold uppercase tracking-wider"
            >
              Jugar Pick&apos;em
            </Button>
            <Button
              href="/pickem/leaderboard"
              variant="secondary"
              size="md"
              iconLeft={<Trophy className="w-3.5 h-3.5 text-[var(--color-brand-primary)]" />}
              className="text-xs font-mono font-bold uppercase tracking-wider"
            >
              Leaderboard
            </Button>
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
