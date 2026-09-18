// filepath: src/components/nba/GameCard.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardFooter } from "@/components/ui/Card";
import { TeamLogo } from "@/components/nba/TeamLogo";
import { GameTime } from "@/components/time/GameTime";
import { getTeamByTricode } from "@/lib/nba/teamAssets";
import { ChevronRight } from "lucide-react";

export type GameStatus = "scheduled" | "live" | "final";

export interface TeamSide {
  tricode: string;
  name?: string;
  record?: string;
  rank?: number;
  conference?: string;
  logoUrl?: string;
  score?: number;
}

export interface GameCardProps {
  status: GameStatus;
  away: TeamSide;
  home: TeamSide;
  /** e.g. "Hoy 21:00" · "3Q 4:12" · "Final" */
  statusLabel?: string;
  /** ISO date for tip-off time in multi-region format */
  date?: string;
  broadcast?: string;
  arena?: string;
  /** Compact for sidebars */
  mode?: "compact" | "full";
  href?: string;
  onBoxscore?: () => void;
  className?: string;
}

function TeamBlock({
  team,
  align,
  isWinner,
  showScore,
}: {
  team: TeamSide;
  align: "left" | "right";
  isWinner?: boolean;
  showScore: boolean;
}) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-1 items-center gap-3",
        align === "right" && "flex-row-reverse text-right"
      )}
    >
      <TeamLogo
        tricode={team.tricode}
        name={team.name}
        alt={team.name || team.tricode}
        size={40}
        className="shrink-0 drop-shadow-sm"
      />
      <div className="min-w-0 flex-1">
        <p
          className={cn(
            "font-display text-xl leading-none tracking-wide md:text-2xl",
            isWinner === false && showScore
              ? "text-[var(--color-text-muted)]"
              : "text-[var(--color-text-primary)]"
          )}
        >
          {team.tricode}
        </p>
        <div
          className={cn(
            "mt-1 flex items-center gap-1.5 text-xs text-[var(--color-text-muted)]",
            align === "right" && "justify-end"
          )}
        >
          {team.record ? (
            <span className="font-mono tabular">{team.record}</span>
          ) : null}
          {team.rank ? (
            <span className="font-mono text-[10px] uppercase text-[var(--color-text-dim)]">
              #{team.rank}
            </span>
          ) : null}
        </div>
      </div>
      {showScore && team.score !== undefined ? (
        <span
          data-stat
          className={cn(
            "tabular text-2xl font-black md:text-[30px] font-display",
            isWinner === false
              ? "text-[var(--color-text-muted)]"
              : "text-[var(--color-text-primary)]"
          )}
        >
          {team.score}
        </span>
      ) : null}
    </div>
  );
}

export function GameCard({
  status,
  away,
  home,
  statusLabel = "Programado",
  date,
  broadcast,
  arena,
  mode = "full",
  href,
  onBoxscore,
  className,
}: GameCardProps) {
  const showScore = status === "live" || status === "final";
  const awayWins =
    showScore &&
    away.score !== undefined &&
    home.score !== undefined &&
    away.score > home.score;
  const homeWins =
    showScore &&
    away.score !== undefined &&
    home.score !== undefined &&
    home.score > away.score;

  const badgeType =
    status === "live" ? "live" : status === "final" ? "final" : "scheduled";

  const homeBrand = getTeamByTricode(home.tricode);
  const cardStyle: React.CSSProperties = homeBrand?.primary
    ? { borderLeft: `3px solid ${homeBrand.primary}` }
    : {};

  const inner = (
    <>
      {/* Top Header: Badge Status + Broadcast / Arena */}
      <div className="flex items-center justify-between gap-2 px-4 pt-3.5">
        <Badge type={badgeType} radar={status === "live"}>
          {statusLabel}
        </Badge>
        {broadcast ? (
          <span className="truncate text-xs font-mono text-[var(--color-text-muted)]">
            {broadcast}
          </span>
        ) : arena ? (
          <span className="truncate text-xs font-mono text-[var(--color-text-dim)]">
            {arena}
          </span>
        ) : null}
      </div>

      {/* Center Match Block: Away - [GameTime / Scores] - Home */}
      <div
        className={cn(
          "flex items-center gap-2 sm:gap-3 px-4 py-4",
          mode === "compact" && "py-2.5"
        )}
      >
        <TeamBlock
          team={away}
          align="left"
          showScore={showScore}
          isWinner={status === "final" ? awayWins : undefined}
        />

        {/* Center: Hora local first con <GameTime /> si programado; o guión si scores */}
        <div className="shrink-0 px-1 text-center min-w-[80px]">
          {!showScore && date ? (
            <GameTime iso={date} align="center" size="sm" showEt={true} />
          ) : !showScore ? (
            <span className="font-display text-sm text-[var(--color-text-dim)]">
              VS
            </span>
          ) : (
            <span className="font-mono text-sm text-[var(--color-text-dim)]">–</span>
          )}
        </div>

        <TeamBlock
          team={home}
          align="right"
          showScore={showScore}
          isWinner={status === "final" ? homeWins : undefined}
        />
      </div>

      {/* Footer Meta: Arena + "Ver previa" / Boxscore */}
      {mode === "full" ? (
        <CardFooter className="px-4 py-2.5 border-t border-[var(--color-border-subtle)]/70 bg-[var(--color-surface-2)]/30 flex items-center justify-between">
          <span className="truncate text-xs text-[var(--color-text-muted)]">
            {arena ? arena : status === "live" ? "En juego" : status === "final" ? "Finalizado" : "Temporada Regular"}
          </span>
          {href ? (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--color-brand-primary)] group-hover:underline">
              <span>{status === "final" ? "Ver resumen" : "Ver previa"}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </span>
          ) : onBoxscore ? (
            <Button
              variant="ghost"
              size="sm"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                onBoxscore?.();
              }}
            >
              Boxscore
            </Button>
          ) : null}
        </CardFooter>
      ) : null}
    </>
  );

  if (href) {
    return (
      <Card
        as="a"
        href={href}
        interactive
        style={cardStyle}
        className={cn(
          "group block overflow-hidden transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)]",
          className
        )}
      >
        {inner}
      </Card>
    );
  }

  return (
    <Card
      style={cardStyle}
      className={cn(
        "overflow-hidden transition-all duration-150",
        onBoxscore && "hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)]",
        className
      )}
      interactive={!!onBoxscore}
    >
      {inner}
    </Card>
  );
}
