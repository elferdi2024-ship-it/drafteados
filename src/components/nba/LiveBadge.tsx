// filepath: src/components/nba/LiveBadge.tsx
import type { GameStatus } from "@/types/basketball";

interface LiveBadgeProps {
  status: GameStatus;
  period?: number;
  clock?: string;
  className?: string;
}

export function LiveBadge({ status, period, clock, className = "" }: LiveBadgeProps) {
  if (status === "live") {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-[var(--hub-live-soft)] text-[var(--hub-live)] border border-[var(--hub-live)]/30 shadow-sm ${className}`}
      >
        <span className="w-2 h-2 rounded-full bg-[var(--hub-live)] animate-ping" />
        <span>EN VIVO</span>
        {period && clock && (
          <span className="text-[var(--hub-text)]/90 font-mono font-medium tracking-tight">
            · Q{period} {clock}
          </span>
        )}
      </span>
    );
  }

  if (status === "final") {
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold tracking-wider uppercase text-[var(--hub-final)] bg-white/5 border border-white/10 ${className}`}
      >
        FINAL
      </span>
    );
  }

  if (status === "postponed") {
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold tracking-wider uppercase text-amber-500 bg-amber-500/10 border border-amber-500/30 ${className}`}
      >
        APLAZO
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold tracking-wider uppercase text-[var(--hub-scheduled)] bg-white/5 border border-white/5 ${className}`}
    >
      PROGRAMADO
    </span>
  );
}
