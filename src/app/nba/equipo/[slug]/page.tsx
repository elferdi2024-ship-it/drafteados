// filepath: src/app/nba/equipo/[slug]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { basketball } from "@/lib/data/basketball/composite-provider";
import { ScoreboardCard } from "@/components/nba/ScoreboardCard";
import { TeamLogo } from "@/components/nba/TeamLogo";

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

  const [games, standings] = await Promise.all([
    basketball.getGames({ teamId: team.id }),
    basketball.getStandings(),
  ]);

  const allStandings = [...standings.east, ...standings.west];
  const teamStanding = allStandings.find((s) => s.team.id === team.id);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
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
        className="rounded-3xl border border-[var(--hub-border)] bg-[var(--hub-surface)] p-6 sm:p-10 shadow-2xl relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
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
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[var(--hub-accent)] block mb-1">
              CONFERENCIA {team.conference.toUpperCase()} · DIVISIÓN {team.division.toUpperCase()}
            </span>
            <h1
              className="text-3xl sm:text-5xl font-black text-[var(--hub-text)] uppercase tracking-tight leading-none"
              style={{ fontFamily: "var(--hub-font-display)" }}
            >
              {team.name}
            </h1>
            <p className="text-xs sm:text-sm text-[var(--hub-text-muted)] font-mono mt-1">
              {team.city} · Sigla: {team.abbreviation}
            </p>
          </div>
        </div>

        {/* Record Badge */}
        {teamStanding && (
          <div className="flex items-center gap-4 bg-[var(--hub-surface-2)] p-4 rounded-2xl border border-white/5 shrink-0">
            <div className="text-center">
              <span
                className="text-3xl sm:text-4xl font-black text-white block leading-none"
                style={{ fontFamily: "var(--hub-font-display)" }}
              >
                {teamStanding.wins}-{teamStanding.losses}
              </span>
              <span className="text-[10px] font-mono uppercase text-[var(--hub-text-dim)] tracking-wider">
                RÉCORD ACTUAL
              </span>
            </div>

            <div className="w-px h-10 bg-white/10" />

            <div className="text-center">
              <span
                className="text-3xl sm:text-4xl font-black text-[var(--hub-accent)] block leading-none"
                style={{ fontFamily: "var(--hub-font-display)" }}
              >
                #{teamStanding.conferenceRank}
              </span>
              <span className="text-[10px] font-mono uppercase text-[var(--hub-text-dim)] tracking-wider">
                POSICIÓN
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Partidos de la Franquicia */}
      <section className="space-y-4">
        <h2
          className="text-2xl sm:text-3xl font-black text-[var(--hub-text)] uppercase tracking-tight"
          style={{ fontFamily: "var(--hub-font-display)" }}
        >
          PARTIDOS RECIENTES Y PROGRAMADOS
        </h2>

        {games.length === 0 ? (
          <p className="text-sm text-[var(--hub-text-muted)]">No hay partidos registrados para este equipo.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {games.map((game) => (
              <ScoreboardCard key={game.id} game={game} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
