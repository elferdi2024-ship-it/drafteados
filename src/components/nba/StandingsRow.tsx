// filepath: src/components/nba/StandingsRow.tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/cn";
import { Badge } from "@/components/ui/Badge";
import { TeamLogo } from "./TeamLogo";

export type RankTier = "playoffs" | "play-in" | "lottery";

export interface StandingsTeam {
  rank: number;
  tricode: string;
  name: string;
  logoUrl?: string;
  wins: number;
  losses: number;
  pct: string;
  gb: string;
  streak?: string;
  l10?: string;
}

export interface StandingsRowProps {
  team: StandingsTeam;
  tier?: RankTier;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

const tierBar: Record<RankTier, string> = {
  playoffs: "border-l-4 border-l-[var(--color-state-win)]",
  "play-in": "border-l-4 border-l-[var(--color-brand-primary)]",
  lottery: "border-l-4 border-l-transparent",
};

export function StandingsRow({
  team,
  tier = "lottery",
  selected = false,
  onClick,
  className,
}: StandingsRowProps) {
  const streakType =
    team.streak?.startsWith("W") || team.streak?.startsWith("G")
      ? "streak-w"
      : team.streak?.startsWith("L") || team.streak?.startsWith("P")
        ? "streak-l"
        : "muted";

  return (
    <tr
      onClick={onClick}
      className={cn(
        "h-12 border-b border-[var(--color-border-subtle)] transition-colors duration-150 select-none",
        tierBar[tier],
        onClick && "cursor-pointer",
        selected
          ? "bg-[var(--color-brand-soft)]"
          : "hover:bg-[var(--color-surface-2)]",
        className
      )}
    >
      <td className="w-9 px-2 text-center text-xs font-bold font-mono text-[var(--color-text-muted)]">
        {team.rank}
      </td>
      <td className="px-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <TeamLogo tricode={team.tricode} name={team.name} size={28} className="shrink-0 drop-shadow-sm" />
          <span className="truncate text-sm font-semibold text-[var(--color-text-primary)]">
            <span className="md:hidden font-mono font-bold">{team.tricode}</span>
            <span className="hidden md:inline">{team.name}</span>
          </span>
        </div>
      </td>
      <td
        data-stat
        className="w-12 px-1 text-right text-sm font-black tabular-nums text-[var(--color-state-win)] font-mono"
      >
        {team.wins}
      </td>
      <td
        data-stat
        className="w-12 px-1 text-right text-sm font-black tabular-nums text-[var(--color-state-loss)] font-mono"
      >
        {team.losses}
      </td>
      <td
        data-stat
        className="w-[64px] px-1 text-right text-xs font-mono tabular-nums text-[var(--color-text-muted)]"
      >
        {team.pct}
      </td>
      <td
        data-stat
        className="w-12 px-1 text-right text-xs font-mono tabular-nums text-[var(--color-text-muted)]"
      >
        {team.gb}
      </td>
      <td className="w-16 px-1 text-center">
        {team.streak ? (
          <Badge type={streakType as "streak-w" | "streak-l" | "muted"}>
            {team.streak}
          </Badge>
        ) : null}
      </td>
      <td className="hidden w-16 px-2 text-right text-xs font-mono tabular-nums text-[var(--color-text-muted)] sm:table-cell">
        {team.l10}
      </td>
    </tr>
  );
}

export function StandingsTableHead() {
  return (
    <thead className="sticky top-0 z-10 bg-[var(--color-surface-2)] border-b border-[var(--color-border-subtle)]">
      <tr className="h-10 text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
        <th className="w-9 px-2 font-bold text-center">#</th>
        <th className="px-2 text-left font-bold">Equipo</th>
        <th className="w-12 px-1 text-right font-bold">W</th>
        <th className="w-12 px-1 text-right font-bold">L</th>
        <th className="w-[64px] px-1 text-right font-bold">PCT</th>
        <th className="w-12 px-1 text-right font-bold">GB</th>
        <th className="w-16 px-1 text-center font-bold">STRK</th>
        <th className="hidden w-16 px-2 text-right font-bold sm:table-cell">L10</th>
      </tr>
    </thead>
  );
}
