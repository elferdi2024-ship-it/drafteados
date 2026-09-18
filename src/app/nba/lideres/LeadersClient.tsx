// filepath: src/app/nba/lideres/LeadersClient.tsx
"use client";

import { useState } from "react";
import type { LeaderLine } from "@/types/basketball";
import { PlayerHeadshot } from "@/components/nba/PlayerHeadshot";
import { TeamLogo } from "@/components/nba/TeamLogo";

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
            type="button"
            onClick={() => setSelectedStat(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-sans font-semibold uppercase tracking-wider transition-all shrink-0 cursor-pointer ${
              selectedStat === tab.id
                ? "bg-[var(--hub-accent)] text-white shadow-sm"
                : "bg-[var(--hub-surface)] text-[var(--hub-text-secondary)] hover:text-[var(--hub-text)] border border-[var(--hub-border)]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Podium Top 3 Cards (Desktop) */}
      {lines.length >= 3 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {lines.slice(0, 3).map((item) => {
            const isFirst = item.rank === 1;

            return (
              <div
                key={item.player.id}
                className={`rounded-2xl border p-5 relative overflow-hidden flex flex-col justify-between transition-all ${
                  isFirst
                    ? "bg-gradient-to-b from-[var(--hub-surface-2)] to-[var(--hub-surface)] border-[var(--hub-accent)]/50 shadow-md shadow-[var(--hub-accent)]/5"
                    : "bg-[var(--hub-surface)] border-[var(--hub-border)] shadow-sm"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-sans font-bold px-2 py-0.5 rounded-md ${
                    isFirst ? "bg-[var(--hub-accent)] text-white" : "bg-[var(--hub-surface-2)] text-[var(--hub-text-muted)] border border-[var(--hub-border)]"
                  }`}>
                    #{item.rank}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <TeamLogo tricode={item.team.abbreviation} size={20} />
                    <span className="text-[11px] font-sans font-semibold text-[var(--hub-text-muted)] uppercase">
                      {item.team.name}
                    </span>
                  </div>
                </div>

                <div className="my-4 flex items-center gap-4">
                  <PlayerHeadshot
                    name={item.player.fullName}
                    headshotUrl={item.player.headshotUrl}
                    tricode={item.team.abbreviation}
                    size={80}
                    className="shrink-0 drop-shadow-md"
                  />

                  <div className="min-w-0">
                    <h3
                      className="text-xl sm:text-2xl font-black text-[var(--hub-text)] uppercase tracking-tight truncate leading-tight"
                      style={{ fontFamily: "var(--hub-font-display)" }}
                    >
                      {item.player.fullName}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-1">
                      <TeamLogo tricode={item.team.abbreviation} size={16} />
                      <span className="text-xs font-sans text-[var(--hub-text-muted)]">
                        {item.team.abbreviation} · {item.player.position}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[var(--hub-border)] flex items-baseline justify-between">
                  <span className="text-xs font-sans font-semibold text-[var(--hub-text-muted)] uppercase">
                    PROMEDIO
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span
                      className="text-3xl font-black text-[var(--hub-accent)] tabular-nums"
                      style={{ fontFamily: "var(--hub-font-display)" }}
                    >
                      {item.value.toFixed(1)}
                    </span>
                    <span className="text-xs font-sans font-semibold text-[var(--hub-text-muted)]">
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
      <div className="rounded-2xl border border-[var(--hub-border)] bg-[var(--hub-surface)] overflow-hidden shadow-sm">
        <div className="p-4 border-b border-[var(--hub-border)] flex items-center justify-between">
          <span className="text-xs font-sans uppercase font-bold text-[var(--hub-accent)] tracking-wider">
            TABLA GENERAL · {currentTabMeta.label}
          </span>
          <span className="text-xs font-sans text-[var(--hub-text-muted)]">
            MÍNIMO 70% DE PARTIDOS
          </span>
        </div>

        <div className="divide-y divide-[var(--hub-border)]">
          {lines.map((item) => {
            return (
              <div
                key={item.player.id}
                className="flex items-center justify-between p-3 sm:p-4 hover:bg-[var(--hub-surface-2)]/50 transition-colors"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <span className={`w-6 text-center text-xs sm:text-sm font-sans font-bold tabular-nums ${
                    item.rank <= 3 ? "text-[var(--hub-accent)]" : "text-[var(--hub-text-muted)]"
                  }`}>
                    #{item.rank}
                  </span>

                  <PlayerHeadshot
                    name={item.player.fullName}
                    headshotUrl={item.player.headshotUrl}
                    tricode={item.team.abbreviation}
                    size={40}
                  />

                  <div className="truncate">
                    <span className="text-sm sm:text-base font-bold text-[var(--hub-text)] truncate block">
                      {item.player.fullName}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs font-sans text-[var(--hub-text-muted)]">
                      <TeamLogo tricode={item.team.abbreviation} size={14} />
                      <span>{item.team.name} ({item.team.abbreviation}) · {item.player.position}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-baseline gap-1 text-right shrink-0">
                  <span
                    className="text-2xl sm:text-3xl font-black text-[var(--hub-accent)] tabular-nums"
                    style={{ fontFamily: "var(--hub-font-display)" }}
                  >
                    {item.value.toFixed(1)}
                  </span>
                  <span className="text-xs font-sans font-semibold text-[var(--hub-text-muted)] hidden sm:inline">
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
