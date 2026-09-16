// filepath: src/app/nba/equipo/[slug]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { basketball } from "@/lib/data/basketball/composite-provider";
import { TeamLogo } from "@/components/nba/TeamLogo";
import { TeamTabsView } from "@/components/nba/TeamTabsView";

import type { Metadata } from "next";
import { getTeamLogoUrl, getTeamNbaId } from "@/lib/basketball/nbaIds";

import { MOCK_TEAMS } from "@/lib/data/basketball/mock-data";

export const revalidate = 3600;

export async function generateStaticParams() {
  const teams = await basketball.getTeams();
  const slugSet = new Set<string>();

  // Garantizar los 30 slugs canónicos
  for (const t of MOCK_TEAMS) {
    slugSet.add(t.slug);
  }
  for (const t of teams) {
    slugSet.add(t.slug);
  }

  return Array.from(slugSet).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  let team = await basketball.getTeam(slug);
  if (!team) {
    team =
      MOCK_TEAMS.find(
        (t) =>
          t.slug.toLowerCase() === slug.toLowerCase() ||
          t.abbreviation.toLowerCase() === slug.toLowerCase() ||
          t.id === slug
      ) || null;
  }

  if (!team) {
    return {
      title: "Equipo no encontrado | Drafteados NBA",
    };
  }

  const nbaId = getTeamNbaId(team.abbreviation, team.name);

  return {
    title: `${team.name} · Plantilla, Calendario y Resultados 2026/27`,
    description: `Ficha oficial de ${team.name} (${team.abbreviation}) en Drafteados. Plantilla completa con salarios, próximos partidos, resultados y posición en la Conferencia ${team.conference === "East" ? "Este" : "Oeste"}.`,
    openGraph: {
      title: `${team.name} · Ficha Oficial y Plantilla NBA 2026/27 | Drafteados`,
      description: `Plantilla completa con estadísticas y salarios, calendario y balance oficial de ${team.name} en la NBA.`,
      url: `https://drafteados.com/nba/equipo/${team.slug}`,
      siteName: "Drafteados",
      locale: "es_ES",
      type: "website",
      images: [
        {
          url: "/images/og-nba.png",
          width: 1200,
          height: 630,
          alt: `${team.name} - Drafteados NBA`,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${team.name} · Plantilla y Estadísticas | Drafteados NBA`,
      description: `Roster completo, calendario de partidos y balance de ${team.name}.`,
      site: "@drafteados",
      creator: "@drafteados",
      images: ["/images/og-nba.png"],
    },
  };
}

export default async function TeamDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let team = await basketball.getTeam(slug);

  if (!team) {
    team =
      MOCK_TEAMS.find(
        (t) =>
          t.slug.toLowerCase() === slug.toLowerCase() ||
          t.abbreviation.toLowerCase() === slug.toLowerCase() ||
          t.id === slug
      ) || null;
  }

  if (!team) {
    notFound();
  }

  const [teamSchedule, standings, roster] = await Promise.all([
    basketball.getTeamSchedule(team.slug),
    basketball.getStandings(),
    basketball.getRoster(team.slug),
  ]);

  const allStandings = [...standings.east, ...standings.west];
  const teamStanding = allStandings.find(
    (s) =>
      s.team.id === team.id ||
      s.team.slug === team.slug ||
      s.team.abbreviation === team.abbreviation
  );

  const { recent, upcoming } = teamSchedule;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Back button */}
      <Link
        href="/nba/equipos"
        className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[var(--hub-accent)] hover:text-[var(--hub-accent-hover)] uppercase tracking-wider transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>VOLVER A EQUIPOS</span>
      </Link>

      {/* Team Header Banner */}
      <div
        className="rounded-3xl border border-[var(--hub-border)] bg-[var(--hub-surface)] p-6 sm:p-10 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
        style={{
          borderLeftColor: team.primaryColor || undefined,
          borderLeftWidth: "6px",
        }}
      >
        <div className="flex items-center gap-5">
          <TeamLogo
            abbreviation={team.abbreviation}
            name={team.name}
            primaryColor={team.primaryColor}
            size="xl"
          />

          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[var(--hub-accent)]">
                CONFERENCIA {team.conference.toUpperCase()} · DIVISIÓN {team.division.toUpperCase()}
              </span>
            </div>
            <h1
              className="text-3xl sm:text-5xl font-black text-[var(--hub-text)] uppercase tracking-tight leading-none"
              style={{ fontFamily: "var(--hub-font-display)" }}
            >
              {team.name}
            </h1>
            <p className="text-xs sm:text-sm text-[var(--hub-text-muted)] font-mono mt-1.5">
              {team.city} · Sigla: {team.abbreviation} · {roster.length} Jugadores en Plantilla
            </p>
          </div>
        </div>

        {/* Record & Stats Badges */}
        {teamStanding && (
          <div className="flex flex-wrap items-center gap-3 sm:gap-6 bg-[var(--hub-surface-2)] p-4 sm:p-5 rounded-2xl border border-[var(--hub-border)] shrink-0">
            <div className="text-center min-w-[70px]">
              <span
                className="text-3xl sm:text-4xl font-black text-[var(--hub-text)] block leading-none"
                style={{ fontFamily: "var(--hub-font-display)" }}
              >
                {teamStanding.wins}-{teamStanding.losses}
              </span>
              <span className="text-[10px] font-mono uppercase text-[var(--hub-text-dim)] tracking-wider">
                BALANCE (25/26)
              </span>
            </div>

            <div className="w-px h-10 bg-[var(--hub-border)]" />

            <div className="text-center min-w-[60px]">
              <span
                className="text-3xl sm:text-4xl font-black text-[var(--hub-accent)] block leading-none"
                style={{ fontFamily: "var(--hub-font-display)" }}
              >
                #{teamStanding.conferenceRank}
              </span>
              <span className="text-[10px] font-mono uppercase text-[var(--hub-text-dim)] tracking-wider">
                CONF. {team.conference.toUpperCase()}
              </span>
            </div>

            {teamStanding.homeRecord && (
              <>
                <div className="w-px h-10 bg-[var(--hub-border)] hidden sm:block" />
                <div className="text-center hidden sm:block">
                  <span className="text-lg font-mono font-bold text-[var(--hub-text)] block leading-none">
                    {teamStanding.homeRecord}
                  </span>
                  <span className="text-[10px] font-mono uppercase text-[var(--hub-text-dim)] tracking-wider">
                    LOCAL
                  </span>
                </div>
              </>
            )}

            {teamStanding.streak && (
              <>
                <div className="w-px h-10 bg-[var(--hub-border)] hidden sm:block" />
                <div className="text-center hidden sm:block">
                  <span className="text-lg font-mono font-bold text-[var(--hub-accent)] block leading-none">
                    {teamStanding.streak}
                  </span>
                  <span className="text-[10px] font-mono uppercase text-[var(--hub-text-dim)] tracking-wider">
                    RACHA
                  </span>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Navegación por pestañas interactiva (Plantilla, Partidos, Stats & Picks) */}
      <TeamTabsView
        team={team}
        teamStanding={teamStanding}
        recent={recent}
        upcoming={upcoming}
        roster={roster}
      />
    </div>
  );
}
