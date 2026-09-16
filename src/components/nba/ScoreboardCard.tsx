// filepath: src/components/nba/ScoreboardCard.tsx
import Link from "next/link";
import type { Game, Team } from "@/types/basketball";
import { LiveBadge } from "./LiveBadge";
import { TeamLogo } from "./TeamLogo";

interface ScoreboardCardProps {
  game: Game;
}

function TeamScoreRow({
  team,
  score,
  isWinner,
  isLive,
}: {
  team: Team;
  score?: number;
  isWinner?: boolean;
  isLive?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3 py-1">
      <div className="flex items-center gap-3 min-w-0">
        <TeamLogo
          abbreviation={team.abbreviation}
          name={team.name}
          primaryColor={team.primaryColor}
          size="md"
        />

        <div className="truncate">
          <span className={`text-sm sm:text-base font-bold tracking-tight truncate block ${
            isWinner ? "text-[var(--hub-text)] font-black" : "text-[var(--hub-text-muted)]"
          }`}>
            {team.name}
          </span>
          <span className="text-[10px] font-mono font-semibold text-[var(--hub-text-dim)] uppercase">
            {team.city}
          </span>
        </div>
      </div>

      <div className="text-right shrink-0">
        <span
          className={`text-2xl font-black tabular-nums leading-none ${
            isLive
              ? "text-[var(--hub-accent)]"
              : isWinner
              ? "text-[var(--hub-text)]"
              : "text-[var(--hub-text-muted)]"
          }`}
          style={{ fontFamily: "var(--hub-font-display)" }}
        >
          {score !== undefined ? score : "–"}
        </span>
      </div>
    </div>
  );
}

export function ScoreboardCard({ game }: ScoreboardCardProps) {
  const isLive = game.status === "live";
  const isFinal = game.status === "final";
  const awayWon = isFinal && (game.awayScore ?? 0) > (game.homeScore ?? 0);
  const homeWon = isFinal && (game.homeScore ?? 0) > (game.awayScore ?? 0);

  return (
    <Link
      href={`/nba/partido/${game.id}`}
      className="block group rounded-2xl border border-[var(--hub-border)] bg-[var(--hub-surface)] p-4 sm:p-5 hover:border-[var(--hub-accent)]/60 transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-black/40 relative overflow-hidden"
    >
      {/* Accent strip if live */}
      {isLive && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[var(--hub-accent)] to-emerald-400" />
      )}

      {/* Header bar */}
      <div className="flex items-center justify-between gap-2 pb-3 mb-2 border-b border-white/[0.06]">
        <LiveBadge
          status={game.status}
          period={game.period}
          clock={game.clock}
        />
        {game.arena && (
          <span className="text-[11px] font-mono text-[var(--hub-text-dim)] truncate max-w-[160px]">
            {game.arena}
          </span>
        )}
      </div>

      {/* Teams Score Rows */}
      <div className="space-y-1.5 my-1">
        <TeamScoreRow
          team={game.awayTeam}
          score={game.awayScore}
          isWinner={awayWon}
          isLive={isLive}
        />
        <TeamScoreRow
          team={game.homeTeam}
          score={game.homeScore}
          isWinner={homeWon}
          isLive={isLive}
        />
      </div>

      {/* Footer / Context */}
      <div className="mt-3 pt-2.5 border-t border-white/[0.04] flex items-center justify-between text-[10px] font-mono text-[var(--hub-text-dim)]">
        <span className="uppercase">
          {game.awayTeam.conference} vs {game.homeTeam.conference}
        </span>
        <span className="group-hover:text-[var(--hub-accent)] transition-colors">
          VER DETALLE &rarr;
        </span>
      </div>
    </Link>
  );
}
