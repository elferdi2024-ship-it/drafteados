// filepath: src/components/nba/PlayerHeadshot.tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/cn";
import { getPlayerHeadshotUrl, getPlayerNbaId } from "@/lib/basketball/nbaIds";
import { getTeamByTricode } from "@/lib/nba/teamAssets";

export interface PlayerHeadshotProps {
  name: string;
  nbaId?: number | string;
  headshotUrl?: string;
  tricode?: string;
  size?: number;
  className?: string;
  alt?: string;
}

/**
 * Headshot de jugador NBA con fallback garantizado:
 * 1. URL directa o headshot oficial NBA CDN
 * 2. Fallback con iniciales del jugador y color de franquicia
 * 3. 0 iconos de imagen rota
 */
export function PlayerHeadshot({
  name,
  nbaId,
  headshotUrl,
  tricode,
  size = 48,
  className,
  alt,
}: PlayerHeadshotProps) {
  const numericNbaId =
    typeof nbaId === "number"
      ? nbaId
      : typeof nbaId === "string" && !isNaN(Number(nbaId))
        ? Number(nbaId)
        : null;
  const resolvedNbaId = numericNbaId ?? getPlayerNbaId(name);
  const src =
    headshotUrl ||
    (resolvedNbaId ? getPlayerHeadshotUrl(resolvedNbaId, size > 64 ? "1040x760" : "260x190") : null);

  const [failed, setFailed] = React.useState(!src);

  React.useEffect(() => {
    setFailed(!src);
  }, [src]);

  const teamBrand = tricode ? getTeamByTricode(tricode) : undefined;
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase() || "NBA";

  if (failed || !src) {
    return (
      <div
        role="img"
        aria-label={alt || name}
        className={cn(
          "inline-flex shrink-0 items-center justify-center rounded-full font-mono font-bold select-none border border-[var(--color-border-subtle)]",
          className
        )}
        style={{
          width: size,
          height: size,
          backgroundColor: teamBrand?.primary ? `${teamBrand.primary}20` : "var(--color-surface-2)",
          color: teamBrand?.primary || "var(--color-text-primary)",
          fontSize: Math.max(10, Math.floor(size * 0.36)),
        }}
      >
        <span>{initials}</span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden rounded-full bg-[var(--color-surface-2)] border border-[var(--color-border-subtle)]",
        className
      )}
      style={{ width: size, height: size }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt || name}
        width={size}
        height={size}
        loading="lazy"
        onError={() => setFailed(true)}
        className="w-full h-full object-cover object-top"
      />
    </div>
  );
}
