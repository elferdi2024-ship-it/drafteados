// filepath: src/app/nba/partido/[id]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Trophy } from "lucide-react";
import { basketball } from "@/lib/data/basketball/composite-provider";
import { LiveBadge } from "@/components/nba/LiveBadge";
import { TeamLogo } from "@/components/nba/TeamLogo";

export const revalidate = 60;

export async function generateStaticParams() {
  const games = await basketball.getGames({});
  return games.map((g) => ({ id: g.id }));
}

export default async function GameDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const game = await basketball.getGame(id);

  if (!game) {
    notFound();
  }

  const isLive = game.status === "live";
  const isFinal = game.status === "final";
  const awayWon = isFinal && (game.awayScore ?? 0) > (game.homeScore ?? 0);
  const homeWon = isFinal && (game.homeScore ?? 0) > (game.awayScore ?? 0);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back button */}
      <Link
        href="/nba"
        className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[var(--hub-accent)] hover:text-[var(--hub-accent-hover)] uppercase tracking-wider transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>VOLVER AL HUB</span>
      </Link>

      {/* Big Match Card */}
      <div className="rounded-3xl border border-[var(--hub-border)] bg-[var(--hub-surface)] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Glow */}
        {isLive && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--hub-accent)] to-emerald-400" />
        )}

        {/* State header */}
        <div className="flex items-center justify-between gap-4 border-b border-white/[0.08] pb-4 mb-8">
          <LiveBadge
            status={game.status}
            period={game.period}
            clock={game.clock}
          />
          {game.arena && (
            <div className="flex items-center gap-1.5 text-xs font-mono text-[var(--hub-text-dim)]">
              <MapPin className="w-3.5 h-3.5" />
              <span>{game.arena}</span>
            </div>
          )}
        </div>

        {/* Scoreboard Showdown */}
        <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-6 text-center">
          {/* Away Team */}
          <div className="flex flex-col items-center gap-3">
            <TeamLogo
              abbreviation={game.awayTeam.abbreviation}
              name={game.awayTeam.name}
              primaryColor={game.awayTeam.primaryColor}
              size="xl"
            />
            <div>
              <h2
                className={`text-2xl sm:text-3xl font-black uppercase tracking-tight ${
                  awayWon ? "text-[var(--hub-text)]" : "text-[var(--hub-text-muted)]"
                }`}
                style={{ fontFamily: "var(--hub-font-display)" }}
              >
                {game.awayTeam.name}
              </h2>
              <span className="text-xs font-mono text-[var(--hub-text-dim)] uppercase">
                {game.awayTeam.city} · {game.awayTeam.conference}
              </span>
            </div>
          </div>

          {/* Big Scores / VS */}
          <div className="flex flex-col items-center justify-center py-4">
            {game.awayScore !== undefined && game.homeScore !== undefined ? (
              <div className="flex items-center justify-center gap-4">
                <span
                  className={`text-6xl sm:text-7xl font-black tabular-nums ${
                    awayWon ? "text-[var(--hub-accent)]" : "text-[var(--hub-text)]"
                  }`}
                  style={{ fontFamily: "var(--hub-font-display)" }}
                >
                  {game.awayScore}
                </span>
                <span className="text-3xl font-mono text-[var(--hub-text-dim)]">-</span>
                <span
                  className={`text-6xl sm:text-7xl font-black tabular-nums ${
                    homeWon ? "text-[var(--hub-accent)]" : "text-[var(--hub-text)]"
                  }`}
                  style={{ fontFamily: "var(--hub-font-display)" }}
                >
                  {game.homeScore}
                </span>
              </div>
            ) : (
              <div className="text-3xl font-mono font-bold text-[var(--hub-text-dim)] uppercase tracking-widest">
                VS
              </div>
            )}
            <span className="text-xs font-mono font-bold uppercase text-[var(--hub-text-dim)] mt-2">
              {isLive ? `Cuarto ${game.period} · ${game.clock}` : isFinal ? "Partido Finalizado" : "Próximo partido"}
            </span>
          </div>

          {/* Home Team */}
          <div className="flex flex-col items-center gap-3">
            <TeamLogo
              abbreviation={game.homeTeam.abbreviation}
              name={game.homeTeam.name}
              primaryColor={game.homeTeam.primaryColor}
              size="xl"
            />
            <div>
              <h2
                className={`text-2xl sm:text-3xl font-black uppercase tracking-tight ${
                  homeWon ? "text-[var(--hub-text)]" : "text-[var(--hub-text-muted)]"
                }`}
                style={{ fontFamily: "var(--hub-font-display)" }}
              >
                {game.homeTeam.name}
              </h2>
              <span className="text-xs font-mono text-[var(--hub-text-dim)] uppercase">
                {game.homeTeam.city} · {game.homeTeam.conference}
              </span>
            </div>
          </div>
        </div>

        {/* Linescore por cuartos si el partido está en juego o terminado */}
        {(isLive || isFinal) && (
          <div className="mt-8 pt-6 border-t border-white/[0.08] overflow-x-auto no-scrollbar">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[var(--hub-text-dim)] mb-3">
              MARCADOR CUARTO POR CUARTO
            </h3>
            <table className="w-full text-center font-mono text-xs">
              <thead>
                <tr className="border-b border-white/5 text-[var(--hub-text-dim)]">
                  <th className="text-left py-2 font-normal">EQUIPO</th>
                  <th className="py-2 font-normal">Q1</th>
                  <th className="py-2 font-normal">Q2</th>
                  <th className="py-2 font-normal">Q3</th>
                  <th className="py-2 font-normal">Q4</th>
                  <th className="py-2 font-bold text-[var(--hub-text)]">TOTAL</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr>
                  <td className="text-left py-2.5 font-bold text-[var(--hub-text)]">{game.awayTeam.abbreviation}</td>
                  <td className="py-2.5 text-[var(--hub-text-muted)]">28</td>
                  <td className="py-2.5 text-[var(--hub-text-muted)]">24</td>
                  <td className="py-2.5 text-[var(--hub-text-muted)]">31</td>
                  <td className="py-2.5 text-[var(--hub-text-muted)]">{game.period && game.period >= 4 ? "26" : "–"}</td>
                  <td className="py-2.5 font-black text-base text-[var(--hub-accent)]">{game.awayScore ?? "–"}</td>
                </tr>
                <tr>
                  <td className="text-left py-2.5 font-bold text-[var(--hub-text)]">{game.homeTeam.abbreviation}</td>
                  <td className="py-2.5 text-[var(--hub-text-muted)]">30</td>
                  <td className="py-2.5 text-[var(--hub-text-muted)]">27</td>
                  <td className="py-2.5 text-[var(--hub-text-muted)]">25</td>
                  <td className="py-2.5 text-[var(--hub-text-muted)]">{game.period && game.period >= 4 ? "29" : "–"}</td>
                  <td className="py-2.5 font-black text-base text-[var(--hub-accent)]">{game.homeScore ?? "–"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pick'em connection */}
      <div className="rounded-2xl border border-[var(--hub-accent)]/20 bg-[var(--hub-surface-2)] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-[var(--hub-accent)]" />
            <span className="text-xs font-mono font-bold uppercase text-[var(--hub-accent)] tracking-wider">
              IMPACTO EN TU BOLETA DE PICKS
            </span>
          </div>
          <p className="text-sm text-[var(--hub-text)] font-semibold">
            ¿Tenés a candidatos de {game.awayTeam.name} o {game.homeTeam.name} en tus 13 pronósticos?
          </p>
          <p className="text-xs text-[var(--hub-text-muted)]">
            Los triunfos y estadísticas individuales de esta noche inciden directamente en las carreras de MVP, Anotador y Conferencia.
          </p>
        </div>

        <Link
          href="/pickem/picks"
          className="px-5 py-2.5 rounded-xl bg-[var(--hub-accent)] hover:bg-[var(--hub-accent-hover)] text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors shrink-0"
        >
          REVISAR MIS PICKS
        </Link>
      </div>

      {/* SEO Structured Data Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SportsEvent",
            "name": `${game.awayTeam.name} vs ${game.homeTeam.name}`,
            "startDate": game.date,
            "eventStatus": isFinal ? "https://schema.org/EventCompleted" : isLive ? "https://schema.org/EventMovedOnline" : "https://schema.org/EventScheduled",
            "location": {
              "@type": "Place",
              "name": game.arena || "NBA Arena",
            },
            "competitor": [
              {
                "@type": "SportsTeam",
                "name": game.awayTeam.name,
              },
              {
                "@type": "SportsTeam",
                "name": game.homeTeam.name,
              },
            ],
          }),
        }}
      />
    </div>
  );
}
