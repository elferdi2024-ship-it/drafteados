// filepath: src/app/nba/equipo/[slug]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { basketball } from "@/lib/data/basketball/composite-provider";
import { TeamLogo } from "@/components/nba/TeamLogo";
import { TeamTabsView } from "@/components/nba/TeamTabsView";
import { TeamBuquesRecap } from "@/components/nba/TeamBuquesRecap";
import { getBuquesRecap } from "@/lib/buques-recap";

import type { Metadata } from "next";
import { getTeamLogoUrl, getTeamNbaId } from "@/lib/basketball/nbaIds";
import { getTeamBySlug, getTeamByTricode } from "@/lib/nba/teamAssets";

import { MOCK_TEAMS } from "@/lib/data/basketball/mock-data";

import { buildMetadata, SITE_URL } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, sportsTeamJsonLd } from "@/lib/seo/jsonld";

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
    return buildMetadata({
      title: "Equipo no encontrado",
      description: "La franquicia NBA especificada no existe en Drafteados.",
      noIndex: true,
    });
  }

  return buildMetadata({
    title: `${team.name} | Roster, stats y calendario`,
    description: `Ficha oficial de ${team.name} (${team.abbreviation}) en Drafteados. Plantilla completa con salarios, próximos partidos, resultados y posición en la Conferencia ${team.conference === "East" ? "Este" : "Oeste"}.`,
    path: `/nba/equipo/${team.slug}`,
    image: `${SITE_URL}/images/og-nba.png`,
  });
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

  const [teamSchedule, standings, roster, buquesRecap] = await Promise.all([
    basketball.getTeamSchedule(team.slug),
    basketball.getStandings(),
    basketball.getRoster(team.slug),
    getBuquesRecap(team.slug),
  ]);

  const allStandings = [...standings.east, ...standings.west];
  const teamStanding = allStandings.find(
    (s) =>
      s.team.id === team.id ||
      s.team.slug === team.slug ||
      s.team.abbreviation === team.abbreviation
  );

  const { recent, upcoming } = teamSchedule;
  const brand = getTeamBySlug(team.slug) || getTeamByTricode(team.abbreviation);
  const primaryColor = brand?.primary || team.primaryColor || "#FF5A1F";
  const nbaId = brand?.teamId || getTeamNbaId(team.abbreviation, team.name);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Inicio", path: "/" },
            { name: "NBA Hub", path: "/nba" },
            { name: "Equipos", path: "/nba/equipos" },
            { name: team.name, path: `/nba/equipo/${team.slug}` },
          ]),
          sportsTeamJsonLd({
            name: team.name,
            url: `${SITE_URL}/nba/equipo/${team.slug}`,
            logo: getTeamLogoUrl(nbaId) || undefined,
          }),
        ]}
      />
      {/* Back to teams link */}
      <Link
        href="/nba/equipos"
        className="inline-flex items-center gap-2 text-xs font-sans font-semibold text-[var(--hub-accent)] hover:text-[var(--hub-accent-hover)] uppercase tracking-wider transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>VOLVER A EQUIPOS</span>
      </Link>

      {/* Team Header Banner */}
      <div
        className="rounded-3xl border border-[var(--hub-border)] p-6 sm:p-10 shadow-sm relative overflow-hidden flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
        style={{
          borderLeft: `6px solid ${primaryColor}`,
          background: `linear-gradient(135deg, ${primaryColor}18 0%, var(--hub-surface) 55%)`,
        }}
      >
        {/* Top Brand Accent */}
        <div
          className="absolute top-0 left-0 right-0 h-1.5"
          style={{
            background: `linear-gradient(90deg, ${primaryColor}, ${brand?.secondary || primaryColor})`,
          }}
        />

        {/* Franchise Watermark Backdrop */}
        <div className="absolute -right-8 -bottom-10 opacity-[0.06] dark:opacity-[0.12] pointer-events-none select-none">
          <TeamLogo
            tricode={team.abbreviation}
            slug={team.slug}
            teamId={brand?.teamId}
            name={team.name}
            size={240}
          />
        </div>

        <div className="flex items-center gap-6 relative z-10">
          <TeamLogo
            tricode={team.abbreviation}
            slug={team.slug}
            teamId={brand?.teamId}
            name={team.name}
            primaryColor={primaryColor}
            size={96}
            className="drop-shadow-lg"
          />

          <div>
            <div className="flex items-center gap-2 mb-2">
              <span
                className="text-xs font-sans font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-md border"
                style={{
                  color: primaryColor,
                  borderColor: `${primaryColor}40`,
                  backgroundColor: `${primaryColor}10`,
                }}
              >
                CONF. {team.conference.toUpperCase()} · DIV. {team.division.toUpperCase()}
              </span>
            </div>
            <h1
              className="text-3xl sm:text-5xl font-black text-[var(--hub-text)] uppercase tracking-tight leading-none"
              style={{ fontFamily: "var(--hub-font-display)" }}
            >
              {team.name}
            </h1>
            <p className="text-xs sm:text-sm text-[var(--hub-text-secondary)] mt-2">
              {team.city} · Tricode: <strong className="font-mono text-[var(--hub-text)]">{team.abbreviation}</strong> · {roster.length} Jugadores en Plantilla
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

      {/* Narrativa Buques: Análisis editorial Drafteados */}
      {buquesRecap && (
        <TeamBuquesRecap
          recap={buquesRecap}
          primaryColor={primaryColor}
          teamSlug={team.slug}
        />
      )}

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
