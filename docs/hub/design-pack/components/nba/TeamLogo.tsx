"use client";

import * as React from "react";
import { cn } from "@/lib/cn";
import {
  NBA_TEAMS,
  getNbaLogoUrl,
  getTeamByTricode,
  normalizeTricode,
} from "@/lib/nba/teamAssets";

export interface TeamLogoProps {
  tricode?: string;
  teamId?: number;
  size?: number;
  className?: string;
  alt?: string;
  variant?: "primary" | "global";
}

/**
 * Logo oficial cdn.nba.com + fallback iniciales con color de franquicia.
 */
export function TeamLogo({
  tricode,
  teamId,
  size = 40,
  className,
  alt,
  variant = "primary",
}: TeamLogoProps) {
  const team =
    (tricode ? getTeamByTricode(tricode) : undefined) ||
    (teamId
      ? Object.values(NBA_TEAMS).find((t) => t.teamId === teamId)
      : undefined);

  const resolvedTricode =
    team?.tricode || (tricode ? normalizeTricode(tricode) : "?");
  const primary = team?.primary ?? "#737373";
  const onPrimary = team?.onPrimary ?? "#FFFFFF";

  const id = teamId ?? team?.teamId;
  const src = id ? getNbaLogoUrl(id, variant) : tricode ? getNbaLogoUrl(tricode, variant) : "";

  const [failed, setFailed] = React.useState(!src);

  if (failed || !src) {
    return (
      <span
        role="img"
        aria-label={alt || resolvedTricode}
        className={cn(
          "inline-flex shrink-0 items-center justify-center rounded-full text-[10px] font-bold tracking-wide",
          className
        )}
        style={{
          width: size,
          height: size,
          backgroundColor: primary,
          color: onPrimary,
        }}
      >
        {resolvedTricode.slice(0, 3)}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt || resolvedTricode}
      width={size}
      height={size}
      className={cn("object-contain", className)}
      style={{ width: size, height: size }}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
