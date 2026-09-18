"use client";

import * as React from "react";
import { cn } from "@/lib/cn";
import { Badge } from "@/components/ui/Badge";

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

function TeamLogo({ url, tricode }: { url?: string; tricode: string }) {
  const [failed, setFailed] = React.useState(false);
  if (!url || failed) {
    return (
      <span className="inline-flex size-6 items-center justify-center rounded bg-[var(--color-surface-2)] text-[9px] font-bold text-[var(--color-text-muted)]">
        {tricode.slice(0, 3)}
      </span>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={url}
      alt=""
      width={24}
      height={24}
      className="size-6 object-contain"
      onError={() => setFailed(true)}
    />
  );
}

const tierBar: Record<RankTier, string> = {
  playoffs: "border-l-2 border-l-[var(--color-state-win)]",
  "play-in": "border-l-2 border-l-[var(--color-brand-primary)]",
  lottery: "border-l-2 border-l-transparent",
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
        "h-11 border-b border-[var(--color-border-subtle)] transition-colors",
        tierBar[tier],
        onClick && "cursor-pointer",
        selected
          ? "bg-[var(--color-brand-soft)]"
          : "hover:bg-[var(--color-surface-2)]",
        className
      )}
    >
      <td className="w-9 px-2 text-center text-xs font-bold text-[var(--color-text-muted)]">
        {team.rank}
      </td>
      <td className="px-2">
        <div className="flex items-center gap-2 min-w-0">
          <TeamLogo url={team.logoUrl} tricode={team.tricode} />
          <span className="truncate text-sm font-semibold text-[var(--color-text-primary)]">
            <span className="md:hidden">{team.tricode}</span>
            <span className="hidden md:inline">{team.name}</span>
          </span>
        </div>
      </td>
      <td
        data-stat
        className="w-11 px-1 text-right text-sm font-semibold tabular text-[var(--color-state-win)]"
      >
        {team.wins}
      </td>
      <td
        data-stat
        className="w-11 px-1 text-right text-sm font-semibold tabular text-[var(--color-state-loss)]"
      >
        {team.losses}
      </td>
      <td
        data-stat
        className="w-[60px] px-1 text-right text-sm tabular text-[var(--color-text-muted)]"
      >
        {team.pct}
      </td>
      <td
        data-stat
        className="w-12 px-1 text-right text-sm tabular text-[var(--color-text-muted)]"
      >
        {team.gb}
      </td>
      <td className="w-14 px-1 text-center">
        {team.streak ? (
          <Badge type={streakType as "streak-w" | "streak-l" | "muted"}>
            {team.streak}
          </Badge>
        ) : null}
      </td>
      <td className="hidden w-14 px-2 text-right text-xs text-[var(--color-text-muted)] sm:table-cell">
        {team.l10}
      </td>
    </tr>
  );
}

export function StandingsTableHead() {
  return (
    <thead className="sticky top-0 z-10 bg-[var(--color-surface-2)]">
      <tr className="h-9 text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
        <th className="w-9 px-2 font-bold">#</th>
        <th className="px-2 text-left font-bold">Equipo</th>
        <th className="w-11 px-1 text-right font-bold">W</th>
        <th className="w-11 px-1 text-right font-bold">L</th>
        <th className="w-[60px] px-1 text-right font-bold">PCT</th>
        <th className="w-12 px-1 text-right font-bold">GB</th>
        <th className="w-14 px-1 text-center font-bold">STRK</th>
        <th className="hidden w-14 px-2 text-right font-bold sm:table-cell">L10</th>
      </tr>
    </thead>
  );
}
