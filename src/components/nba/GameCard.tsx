"use client";

import * as React from "react";
import { cn } from "@/lib/cn";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardFooter } from "@/components/ui/Card";

export type GameStatus = "scheduled" | "live" | "final";

export interface TeamSide {
  tricode: string;
  name?: string;
  record?: string;
  logoUrl?: string;
  score?: number;
}

export interface GameCardProps {
  status: GameStatus;
  away: TeamSide;
  home: TeamSide;
  /** e.g. "Hoy 21:00" · "3Q 4:12" · "Final" */
  statusLabel: string;
  broadcast?: string;
  /** Compact for sidebars */
  mode?: "compact" | "full";
  href?: string;
  onBoxscore?: () => void;
  className?: string;
}

function TeamLogo({
  url,
  tricode,
  size = 36,
}: {
  url?: string;
  tricode: string;
  size?: number;
}) {
  const [failed, setFailed] = React.useState(false);
  if (!url || failed) {
    return (
      <span
        className="inline-flex items-center justify-center rounded-[var(--radius-sm)] bg-[var(--color-surface-2)] text-[10px] font-bold text-[var(--color-text-muted)]"
        style={{ width: size, height: size }}
        aria-hidden
      >
        {tricode.slice(0, 3)}
      </span>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={url}
      alt=""
      width={size}
      height={size}
      className="object-contain"
      onError={() => setFailed(true)}
    />
  );
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
        "flex min-w-0 flex-1 items-center gap-2",
        align === "right" && "flex-row-reverse text-right"
      )}
    >
      <TeamLogo url={team.logoUrl} tricode={team.tricode} />
      <div className="min-w-0">
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
        {team.record ? (
          <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">{team.record}</p>
        ) : null}
      </div>
      {showScore && team.score !== undefined ? (
        <span
          data-stat
          className={cn(
            "tabular text-2xl font-bold md:text-[32px]",
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
  statusLabel,
  broadcast,
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

  const inner = (
    <>
      <div className="flex items-center justify-between gap-2 px-[18px] pt-3.5">
        <Badge type={badgeType} radar={status === "live"}>
          {statusLabel}
        </Badge>
        {broadcast ? (
          <span className="text-xs text-[var(--color-text-muted)]">{broadcast}</span>
        ) : null}
      </div>

      <div
        className={cn(
          "flex items-center gap-2 px-[18px] py-4",
          mode === "compact" && "py-3"
        )}
      >
        <TeamBlock
          team={away}
          align="left"
          showScore={showScore}
          isWinner={status === "final" ? awayWins : undefined}
        />
        {!showScore ? (
          <span className="shrink-0 font-display text-sm text-[var(--color-text-dim)]">
            VS
          </span>
        ) : (
          <span className="shrink-0 text-[var(--color-text-dim)]">–</span>
        )}
        <TeamBlock
          team={home}
          align="right"
          showScore={showScore}
          isWinner={status === "final" ? homeWins : undefined}
        />
      </div>

      {(onBoxscore || href) && mode === "full" ? (
        <CardFooter>
          <span className="text-xs text-[var(--color-text-muted)]">
            {status === "live" ? "En curso" : status === "final" ? "Finalizado" : "Programado"}
          </span>
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
        className={cn("block overflow-hidden", className)}
      >
        {inner}
      </Card>
    );
  }

  return (
    <Card className={cn("overflow-hidden", className)} interactive={!!onBoxscore}>
      {inner}
    </Card>
  );
}
