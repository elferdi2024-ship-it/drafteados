// filepath: src/components/nba/TeamLogo.tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/cn";
import {
  NBA_TEAMS,
  getNbaLogoUrl,
  getTeamByTricode,
  getTeamBySlug,
  normalizeTricode,
} from "@/lib/nba/teamAssets";

export interface TeamLogoProps {
  tricode?: string;
  abbreviation?: string; // Legacy alias
  name?: string;         // Legacy alias
  slug?: string;
  teamId?: number | string;
  primaryColor?: string; // Brand color override
  size?: number | "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  alt?: string;
  variant?: "primary" | "global";
}

const SIZE_NUMERIC_MAP: Record<string, number> = {
  xs: 20,
  sm: 28,
  md: 36,
  lg: 56,
  xl: 80,
};

export function TeamLogo({
  tricode,
  abbreviation,
  name,
  slug,
  teamId,
  primaryColor,
  size = 40,
  className,
  alt,
  variant = "primary",
}: TeamLogoProps) {
  const code = tricode || abbreviation || "";
  const numericSize = typeof size === "number" ? size : SIZE_NUMERIC_MAP[size] || 36;

  const team =
    (code ? getTeamByTricode(code) : undefined) ||
    (slug ? getTeamBySlug(slug) : undefined) ||
    (name ? getTeamBySlug(name) : undefined) ||
    (teamId
      ? Object.values(NBA_TEAMS).find((t) => String(t.teamId) === String(teamId))
      : undefined);

  const resolvedTricode = team?.tricode || (code ? normalizeTricode(code) : "?");
  const primary = primaryColor || team?.primary || "#737373";
  const onPrimary = team?.onPrimary || "#FFFFFF";

  const resolvedId = teamId || team?.teamId;
  const src = resolvedId
    ? getNbaLogoUrl(resolvedId, variant)
    : code
    ? getNbaLogoUrl(code, variant)
    : slug
    ? getNbaLogoUrl(slug, variant)
    : "";

  const [failed, setFailed] = React.useState(!src);

  React.useEffect(() => {
    setFailed(!src);
  }, [src]);

  if (failed || !src) {
    return (
      <span
        role="img"
        aria-label={alt || name || resolvedTricode}
        className={cn(
          "inline-flex shrink-0 items-center justify-center rounded-full text-[10px] font-bold tracking-wide select-none shadow-sm",
          className
        )}
        style={{
          width: numericSize,
          height: numericSize,
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
      alt={alt || name || resolvedTricode}
      width={numericSize}
      height={numericSize}
      className={cn("object-contain shrink-0 filter drop-shadow-sm transition-transform duration-200", className)}
      style={{ width: numericSize, height: numericSize }}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
