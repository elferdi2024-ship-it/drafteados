// filepath: src/components/nba/MiniStandings.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import type { Standing } from "@/types/basketball";
import { getTeamLogoUrl, getTeamNbaId } from "@/lib/basketball/nbaIds";

interface MiniStandingsProps {
  standings: {
    east: Standing[];
    west: Standing[];
  };
  limit?: number;
}

export function MiniStandings({ standings, limit = 5 }: MiniStandingsProps) {
  const [conference, setConference] = useState<"east" | "west">("east");
  const list = (conference === "east" ? standings.east : standings.west).slice(0, limit);

  return (
    <div className="rounded-2xl border border-[var(--hub-border)] bg-[var(--hub-surface)] p-4 sm:p-5 shadow-lg shadow-black/40">
      {/* Header with Conference Tabs */}
      <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-white/[0.06]">
        <div>
          <span className="text-[10px] font-mono uppercase font-bold text-[var(--hub-accent)] tracking-widest block">
            CLASIFICACIÓN RÁPIDA
          </span>
          <h3
            className="text-xl sm:text-2xl font-black text-[var(--hub-text)] uppercase tracking-tight leading-none mt-0.5"
            style={{ fontFamily: "var(--hub-font-display)" }}
          >
            TOP CONFERENCIA
          </h3>
        </div>

        <div className="flex items-center gap-1 bg-[var(--hub-surface-2)] p-1 rounded-xl border border-white/5">
          <button
            onClick={() => setConference("east")}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer ${
              conference === "east"
                ? "bg-[var(--hub-accent)] text-white shadow-sm"
                : "text-[var(--hub-text-muted)] hover:text-[var(--hub-text)]"
            }`}
          >
            ESTE
          </button>
          <button
            onClick={() => setConference("west")}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer ${
              conference === "west"
                ? "bg-[var(--hub-accent)] text-white shadow-sm"
                : "text-[var(--hub-text-muted)] hover:text-[var(--hub-text)]"
            }`}
          >
            OESTE
          </button>
        </div>
      </div>

      {/* Table Rows */}
      <div className="space-y-2">
        {list.map((item) => {
          const nbaId = getTeamNbaId(item.team.abbreviation);
          const logoUrl = nbaId ? getTeamLogoUrl(nbaId) : null;
          const isStreakWin = item.streak?.startsWith("W");

          return (
            <div
              key={item.team.id}
              className="flex items-center justify-between p-2 rounded-xl hover:bg-white/[0.03] transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-5 text-center text-xs font-mono font-bold text-[var(--hub-text-dim)]">
                  {item.conferenceRank}
                </span>

                <div className="w-6 h-6 rounded-md flex items-center justify-center p-0.5 bg-[#18181a] border border-white/10 shrink-0">
                  {logoUrl ? (
                    <img
                      src={logoUrl}
                      alt={item.team.name}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  ) : (
                    <span className="text-[10px] font-mono font-bold text-white">
                      {item.team.abbreviation}
                    </span>
                  )}
                </div>

                <div className="truncate">
                  <span className="text-sm font-bold text-[var(--hub-text)] truncate block">
                    {item.team.name}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-right shrink-0">
                <span className="text-xs font-mono font-bold tabular-nums text-[var(--hub-text)]">
                  {item.wins}-{item.losses}
                </span>

                <span className="text-[11px] font-mono text-[var(--hub-text-dim)] tabular-nums hidden sm:inline-block w-12">
                  .{Math.round(item.winPct * 1000)}
                </span>

                {item.streak && (
                  <span
                    className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                      isStreakWin
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                        : "bg-red-500/10 text-red-400 border border-red-500/30"
                    }`}
                  >
                    {item.streak}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Link */}
      <div className="mt-4 pt-3 border-t border-white/[0.06] text-center">
        <Link
          href="/nba/clasificacion"
          className="text-xs font-mono font-bold text-[var(--hub-accent)] hover:text-[var(--hub-accent-hover)] tracking-wider uppercase inline-flex items-center gap-1 transition-colors"
        >
          <span>VER TABLA COMPLETA (30 EQUIPOS)</span>
          <span>&rarr;</span>
        </Link>
      </div>
    </div>
  );
}
