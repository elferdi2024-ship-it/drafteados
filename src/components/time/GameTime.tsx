// filepath: src/components/time/GameTime.tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/cn";
import {
  formatGameTime,
  type RegionId,
} from "@/lib/time/regions";
import { useTimezone } from "./TimezoneContext";

export interface GameTimeProps {
  /** ISO tip-off in real time (from API) */
  iso: string;
  className?: string;
  /** Show ET secondary line (default true) */
  showEt?: boolean;
  /** Size variants: sm, md, lg (hero) */
  size?: "sm" | "md" | "lg";
  /** Optional manual override */
  regionId?: RegionId;
  /** Optional layout orientation */
  align?: "left" | "center" | "right";
}

/**
 * Componente de visualización de hora de partido para audiencia hispana.
 * Primario: Hora local con bandera del país seleccionado (persistente globalmente).
 * Secundario: Referencia oficial ET (Eastern Time).
 */
export function GameTime({
  iso,
  className,
  showEt = true,
  size = "md",
  regionId: regionProp,
  align = "left",
}: GameTimeProps) {
  const { regionId: globalRegionId } = useTimezone();
  const effectiveRegionId = regionProp ?? globalRegionId;

  const formatted = formatGameTime(iso, effectiveRegionId);

  const alignClass =
    align === "center"
      ? "items-center text-center"
      : align === "right"
        ? "items-end text-right"
        : "items-start text-left";

  const timeClass =
    size === "lg"
      ? "text-2xl sm:text-3xl font-black font-display tracking-tight text-[var(--color-text-primary)]"
      : size === "sm"
        ? "text-xs sm:text-sm font-bold text-[var(--color-text-primary)]"
        : "text-sm sm:text-base font-bold text-[var(--color-text-primary)]";

  return (
    <div className={cn("inline-flex flex-col gap-0.5", alignClass, className)}>
      <div className={cn("inline-flex items-center gap-1.5 tabular", timeClass)}>
        {/* Bandera CDN oficial nítida */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={formatted.region.flagUrl}
          alt={formatted.region.label}
          width={18}
          height={13}
          className="w-4 h-3 object-cover rounded-xs shrink-0 shadow-xs border border-black/10 dark:border-white/10 select-none"
        />
        <span>
          {size === "lg" ? formatted.local : formatted.localTime}
        </span>
      </div>
      {showEt ? (
        <span className="text-[11px] font-mono text-[var(--color-text-muted)] tracking-wider">
          {formatted.et}
        </span>
      ) : null}
      <span className="sr-only">
        {formatted.local} ({formatted.region.label})
      </span>
    </div>
  );
}
