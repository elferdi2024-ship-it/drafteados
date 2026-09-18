"use client";

import * as React from "react";
import { cn } from "@/lib/cn";
import {
  formatGameTime,
  resolveRegionId,
  type RegionId,
} from "@/lib/time/regions";

export interface GameTimeProps {
  /** ISO tip-off in real time (from API) */
  iso: string;
  className?: string;
  /** Show ET secondary line */
  showEt?: boolean;
  /** Large local time for heroes */
  size?: "sm" | "md" | "lg";
  regionId?: RegionId;
}

/**
 * Hora del partido orientada al usuario hispano.
 * Primary = zona elegida; secondary = ET.
 */
export function GameTime({
  iso,
  className,
  showEt = true,
  size = "md",
  regionId: regionProp,
}: GameTimeProps) {
  const [regionId, setRegionId] = React.useState<RegionId>(
    regionProp ?? "ES"
  );

  React.useEffect(() => {
    setRegionId(regionProp ?? resolveRegionId());
    const onTz = (e: Event) => {
      const detail = (e as CustomEvent).detail as { regionId: RegionId };
      if (detail?.regionId) setRegionId(detail.regionId);
    };
    window.addEventListener("drafteados:tz-change", onTz);
    return () => window.removeEventListener("drafteados:tz-change", onTz);
  }, [regionProp]);

  const formatted = formatGameTime(iso, regionId);

  const timeClass =
    size === "lg"
      ? "text-2xl md:text-3xl font-bold font-display tracking-wide"
      : size === "sm"
        ? "text-sm font-bold"
        : "text-base font-bold";

  return (
    <div className={cn("flex flex-col gap-0.5", className)}>
      <p
        className={cn(
          timeClass,
          "tabular-nums text-[var(--color-text-primary)]"
        )}
      >
        <span className="mr-1.5" aria-hidden>
          {formatted.region.flag}
        </span>
        {size === "lg" ? formatted.local : formatted.localTime}
      </p>
      {showEt ? (
        <p className="text-xs text-[var(--color-text-muted)]">{formatted.et}</p>
      ) : null}
      {size !== "lg" && size !== "sm" ? (
        <p className="sr-only">
          {formatted.local} ({formatted.region.label})
        </p>
      ) : null}
    </div>
  );
}
