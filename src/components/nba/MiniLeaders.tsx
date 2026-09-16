// filepath: src/components/nba/MiniLeaders.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import type { LeaderLine, StatType } from "@/types/basketball";
import { getPlayerHeadshotUrl, getPlayerNbaId } from "@/lib/basketball/nbaIds";

interface MiniLeadersProps {
  leaders: Record<string, LeaderLine[]>;
  limit?: number;
}

const STAT_LABELS: Record<string, { label: string; unit: string }> = {
  pts: { label: "PUNTOS", unit: "PPG" },
  ast: { label: "ASISTENCIAS", unit: "APG" },
  reb: { label: "REBOTES", unit: "RPG" },
  fg3m: { label: "TRIPLES", unit: "3PM" },
};

export function MiniLeaders({ leaders, limit = 5 }: MiniLeadersProps) {
  const [stat, setStat] = useState<string>("pts");
  const currentLines = (leaders[stat] || leaders.pts || []).slice(0, limit);

  return (
    <div className="rounded-2xl border border-[var(--hub-border)] bg-[var(--hub-surface)] p-4 sm:p-5 shadow-lg shadow-black/40">
      {/* Header with Stat Pills */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-white/[0.06]">
        <div>
          <span className="text-[10px] font-mono uppercase font-bold text-[var(--hub-accent)] tracking-widest block">
            LÍDERES DE LA TEMPORADA
          </span>
          <h3
            className="text-xl sm:text-2xl font-black text-[var(--hub-text)] uppercase tracking-tight leading-none mt-0.5"
            style={{ fontFamily: "var(--hub-font-display)" }}
          >
            QUIÉN ESTÁ ROMPIÉNDOLA
          </h3>
        </div>

        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar bg-[var(--hub-surface-2)] p-1 rounded-xl border border-white/5 shrink-0">
          {Object.entries(STAT_LABELS).map(([key, { label }]) => (
            <button
              key={key}
              onClick={() => setStat(key)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer shrink-0 ${
                stat === key
                  ? "bg-[var(--hub-accent)] text-white shadow-sm"
                  : "text-[var(--hub-text-muted)] hover:text-[var(--hub-text)]"
              }`}
            >
              {key === "fg3m" ? "3PM" : key.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Leader Lines */}
      <div className="space-y-2">
        {currentLines.map((line) => {
          const nbaId = getPlayerNbaId(line.player.fullName);
          const headshotUrl = nbaId ? getPlayerHeadshotUrl(nbaId, "260x190") : null;

          return (
            <div
              key={line.player.id}
              className="flex items-center justify-between p-2 rounded-xl hover:bg-white/[0.03] transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className={`w-5 text-center text-xs font-mono font-bold ${
                  line.rank === 1 ? "text-[var(--hub-accent)]" : "text-[var(--hub-text-dim)]"
                }`}>
                  #{line.rank}
                </span>

                <div 
                  className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center bg-[#18181a] border border-white/10 shrink-0 relative"
                  style={{
                    borderColor: line.team?.primaryColor ? `${line.team.primaryColor}50` : "rgba(255,255,255,0.1)",
                  }}
                >
                  {headshotUrl ? (
                    <img
                      src={headshotUrl}
                      alt={line.player.fullName}
                      className="w-full h-full object-cover object-top"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  ) : (
                    <span className="text-xs font-mono font-bold text-white">
                      {line.player.firstName[0]}
                    </span>
                  )}
                </div>

                <div className="truncate">
                  <span className="text-sm font-bold text-[var(--hub-text)] truncate block">
                    {line.player.fullName}
                  </span>
                  <span className="text-[10px] font-mono text-[var(--hub-text-dim)] uppercase">
                    {line.team.abbreviation} · {line.player.position || "NBA"}
                  </span>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span
                  className="text-xl font-black tabular-nums text-[var(--hub-accent)]"
                  style={{ fontFamily: "var(--hub-font-display)" }}
                >
                  {line.value.toFixed(1)}
                </span>
                <span className="text-[10px] font-mono text-[var(--hub-text-dim)] block leading-none">
                  {STAT_LABELS[stat]?.unit || "VAL"}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Link */}
      <div className="mt-4 pt-3 border-t border-white/[0.06] text-center">
        <Link
          href="/nba/lideres"
          className="text-xs font-mono font-bold text-[var(--hub-accent)] hover:text-[var(--hub-accent-hover)] tracking-wider uppercase inline-flex items-center gap-1 transition-colors"
        >
          <span>VER TODOS LOS LÍDERES</span>
          <span>&rarr;</span>
        </Link>
      </div>
    </div>
  );
}
