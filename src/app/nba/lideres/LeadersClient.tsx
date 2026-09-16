// filepath: src/app/nba/lideres/LeadersClient.tsx
"use client";

import { useState } from "react";
import type { LeaderLine } from "@/types/basketball";
import { getPlayerHeadshotUrl, getPlayerNbaId, getTeamLogoUrl, getTeamNbaId } from "@/lib/basketball/nbaIds";

interface LeadersClientProps {
  initialLeaders: Record<string, LeaderLine[]>;
}

const STAT_TABS = [
  { id: "pts", label: "PUNTOS", unit: "PPG" },
  { id: "ast", label: "ASISTENCIAS", unit: "APG" },
  { id: "reb", label: "REBOTES", unit: "RPG" },
  { id: "fg3m", label: "TRIPLES", unit: "3PM" },
  { id: "stl", label: "ROBOS", unit: "SPG" },
  { id: "blk", label: "TAPONES", unit: "BPG" },
];

export function LeadersClient({ initialLeaders }: LeadersClientProps) {
  const [selectedStat, setSelectedStat] = useState<string>("pts");
  const lines = initialLeaders[selectedStat] || initialLeaders.pts || [];
  const currentTabMeta = STAT_TABS.find((t) => t.id === selectedStat) || STAT_TABS[0];

  return (
    <div className="space-y-6">
      {/* Pills Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {STAT_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedStat(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-bold uppercase tracking-wider transition-all shrink-0 cursor-pointer ${
              selectedStat === tab.id
                ? "bg-[var(--hub-accent)] text-white shadow-lg shadow-[var(--hub-accent)]/20"
                : "bg-[var(--hub-surface)] text-[var(--hub-text-muted)] hover:text-[var(--hub-text)] border border-[var(--hub-border)]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Podium Top 3 Cards (Desktop) */}
      {lines.length >= 3 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {lines.slice(0, 3).map((item, idx) => {
            const nbaId = getPlayerNbaId(item.player.fullName);
            const headshotUrl = nbaId ? getPlayerHeadshotUrl(nbaId, "1040x760") : null;
            const teamNbaId = getTeamNbaId(item.team.abbreviation);
            const teamLogo = teamNbaId ? getTeamLogoUrl(teamNbaId) : null;
            const isFirst = item.rank === 1;

            return (
              <div
                key={item.player.id}
                className={`rounded-2xl border p-5 relative overflow-hidden flex flex-col justify-between transition-all ${
                  isFirst
                    ? "bg-gradient-to-b from-[var(--hub-surface-2)] to-[var(--hub-surface)] border-[var(--hub-accent)]/50 shadow-xl shadow-[var(--hub-accent)]/10"
                    : "bg-[var(--hub-surface)] border-[var(--hub-border)]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                    isFirst ? "bg-[var(--hub-accent)] text-white" : "bg-white/5 text-[var(--hub-text-dim)]"
                  }`}>
                    #{item.rank}
                  </span>
                  <span className="text-[11px] font-mono text-[var(--hub-text-dim)] uppercase">
                    {item.team.name}
                  </span>
                </div>

                <div className="my-4 flex items-center gap-4">
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-black/40 border border-white/10 shrink-0 flex items-center justify-center">
                    {headshotUrl ? (
                      <img
                        src={headshotUrl}
                        alt={item.player.fullName}
                        className="w-full h-full object-cover object-top"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    ) : (
                      <span className="font-title text-2xl font-black text-white/40">
                        {item.player.firstName[0]}
                      </span>
                    )}
                  </div>

                  <div className="min-w-0">
                    <h3
                      className="text-xl sm:text-2xl font-black text-[var(--hub-text)] uppercase tracking-tight truncate leading-tight"
                      style={{ fontFamily: "var(--hub-font-display)" }}
                    >
                      {item.player.fullName}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      {teamLogo && (
                        <img src={teamLogo} alt="" className="w-4 h-4 object-contain" />
                      )}
                      <span className="text-xs font-mono text-[var(--hub-text-muted)]">
                        {item.team.abbreviation} · {item.player.position}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/[0.06] flex items-baseline justify-between">
                  <span className="text-xs font-mono text-[var(--hub-text-dim)] uppercase">
                    PROMEDIO
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span
                      className="text-3xl font-black text-[var(--hub-accent)] tabular-nums"
                      style={{ fontFamily: "var(--hub-font-display)" }}
                    >
                      {item.value.toFixed(1)}
                    </span>
                    <span className="text-xs font-mono text-[var(--hub-text-dim)]">
                      {currentTabMeta.unit}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Complete Table List */}
      <div className="rounded-2xl border border-[var(--hub-border)] bg-[var(--hub-surface)] overflow-hidden shadow-xl">
        <div className="p-4 border-b border-white/[0.06] flex items-center justify-between">
          <span className="text-xs font-mono uppercase font-bold text-[var(--hub-accent)] tracking-wider">
            TABLA GENERAL · {currentTabMeta.label}
          </span>
          <span className="text-xs font-mono text-[var(--hub-text-dim)]">
            MÍNIMO 70% DE PARTIDOS
          </span>
        </div>

        <div className="divide-y divide-white/[0.04]">
          {lines.map((item) => {
            const nbaId = getPlayerNbaId(item.player.fullName);
            const headshotUrl = nbaId ? getPlayerHeadshotUrl(nbaId, "260x190") : null;

            return (
              <div
                key={item.player.id}
                className="flex items-center justify-between p-3 sm:p-4 hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <span className={`w-6 text-center text-xs sm:text-sm font-mono font-bold ${
                    item.rank <= 3 ? "text-[var(--hub-accent)]" : "text-[var(--hub-text-dim)]"
                  }`}>
                    #{item.rank}
                  </span>

                  <div className="w-9 h-9 rounded-xl overflow-hidden bg-black/40 border border-white/10 shrink-0 flex items-center justify-center">
                    {headshotUrl ? (
                      <img
                        src={headshotUrl}
                        alt={item.player.fullName}
                        className="w-full h-full object-cover object-top"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    ) : (
                      <span className="text-xs font-mono font-bold text-white">
                        {item.player.firstName[0]}
                      </span>
                    )}
                  </div>

                  <div className="truncate">
                    <span className="text-sm sm:text-base font-bold text-[var(--hub-text)] truncate block">
                      {item.player.fullName}
                    </span>
                    <span className="text-xs font-mono text-[var(--hub-text-dim)] uppercase">
                      {item.team.name} ({item.team.abbreviation}) · {item.player.position}
                    </span>
                  </div>
                </div>

                <div className="flex items-baseline gap-1 text-right shrink-0">
                  <span
                    className="text-2xl sm:text-3xl font-black text-[var(--hub-accent)] tabular-nums"
                    style={{ fontFamily: "var(--hub-font-display)" }}
                  >
                    {item.value.toFixed(1)}
                  </span>
                  <span className="text-xs font-mono text-[var(--hub-text-dim)] hidden sm:inline">
                    {currentTabMeta.unit}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
