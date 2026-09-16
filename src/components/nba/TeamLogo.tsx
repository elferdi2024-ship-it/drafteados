// filepath: src/components/nba/TeamLogo.tsx
"use client";

import { useState } from "react";
import { getTeamLogoUrl, getTeamNbaId } from "@/lib/basketball/nbaIds";

interface TeamLogoProps {
  abbreviation: string;
  name: string;
  primaryColor?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}

const SIZE_MAP = {
  xs: "w-5 h-5 p-0 rounded",
  sm: "w-7 h-7 p-0.5 rounded-md",
  md: "w-9 h-9 p-0.5 rounded-lg",
  lg: "w-14 h-14 p-1 rounded-xl",
  xl: "w-20 h-20 sm:w-24 sm:h-24 p-1.5 rounded-2xl",
};

export function TeamLogo({
  abbreviation,
  name,
  primaryColor,
  size = "md",
  className = "",
}: TeamLogoProps) {
  const [error, setError] = useState(false);
  const nbaId = getTeamNbaId(abbreviation, name);
  const logoUrl = nbaId ? getTeamLogoUrl(nbaId) : null;

  return (
    <div
      className={`${SIZE_MAP[size]} flex items-center justify-center shrink-0 bg-[var(--hub-surface-2)] border border-[var(--hub-border)] relative overflow-hidden shadow-sm transition-transform duration-200 group-hover:scale-105 ${className}`}
      style={{
        borderColor: primaryColor ? `${primaryColor}40` : undefined,
      }}
    >
      {logoUrl && !error ? (
        <img
          src={logoUrl}
          alt={name}
          className="w-full h-full object-contain filter drop-shadow-sm"
          onError={() => setError(true)}
          loading="lazy"
        />
      ) : (
        <span
          className="font-mono font-bold text-xs"
          style={{ color: primaryColor || "var(--hub-text)" }}
        >
          {abbreviation}
        </span>
      )}
    </div>
  );
}
