// filepath: src/components/nba/TeamLogo.tsx
"use client";

import { useState } from "react";
import { getTeamLogoUrl, getTeamNbaId } from "@/lib/basketball/nbaIds";

interface TeamLogoProps {
  abbreviation: string;
  name: string;
  primaryColor?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const SIZE_MAP = {
  sm: "w-6 h-6 p-0.5 rounded",
  md: "w-8 h-8 p-1 rounded-lg",
  lg: "w-12 h-12 p-2 rounded-xl",
  xl: "w-20 h-20 sm:w-24 sm:h-24 p-3 rounded-2xl",
};

export function TeamLogo({
  abbreviation,
  name,
  primaryColor,
  size = "md",
  className = "",
}: TeamLogoProps) {
  const [error, setError] = useState(false);
  const nbaId = getTeamNbaId(abbreviation);
  const logoUrl = nbaId ? getTeamLogoUrl(nbaId) : null;

  return (
    <div
      className={`${SIZE_MAP[size]} flex items-center justify-center border shrink-0 bg-[#161618] relative overflow-hidden shadow-sm ${className}`}
      style={{
        borderColor: primaryColor ? `${primaryColor}50` : "rgba(255,255,255,0.1)",
      }}
    >
      {logoUrl && !error ? (
        <img
          src={logoUrl}
          alt={name}
          className="w-full h-full object-contain drop-shadow"
          onError={() => setError(true)}
        />
      ) : (
        <span
          className="font-mono font-bold text-xs"
          style={{ color: primaryColor || "#FFFFFF" }}
        >
          {abbreviation}
        </span>
      )}
    </div>
  );
}
