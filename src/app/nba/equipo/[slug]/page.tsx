// filepath: src/app/nba/equipo/[slug]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { basketball } from "@/lib/data/basketball/composite-provider";
import { TeamLogo } from "@/components/nba/TeamLogo";
import { TeamTabsView } from "@/components/nba/TeamTabsView";

export const revalidate = 3600;

export async function generateStaticParams() {
  const teams = await basketball.getTeams();
  return teams.map((t) => ({ slug: t.slug }));
}

export default async function TeamDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const team = await basketball.getTeam(slug);

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
