import * as React from "react";
import { cn } from "@/lib/cn";

export type BadgeType =
  | "live"
  | "final"
  | "scheduled"
  | "east"
  | "west"
  | "streak-w"
  | "streak-l"
  | "brand"
  | "muted";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  type?: BadgeType;
  /** Show radar ping for live */
  radar?: boolean;
}

const typeClasses: Record<BadgeType, string> = {
  live: "bg-[var(--color-state-live-soft)] text-[var(--color-state-live)] border-[color-mix(in_srgb,var(--color-state-live)_35%,transparent)]",
  final: "bg-[var(--color-surface-2)] text-[var(--color-text-muted)] border-[var(--color-border-subtle)]",
  scheduled: "bg-[var(--color-surface-2)] text-[var(--color-text-secondary)] border-[var(--color-border-subtle)]",
  east: "bg-[color-mix(in_srgb,var(--color-conf-east)_12%,transparent)] text-[var(--color-conf-east)] border-[color-mix(in_srgb,var(--color-conf-east)_30%,transparent)]",
  west: "bg-[color-mix(in_srgb,var(--color-conf-west)_12%,transparent)] text-[var(--color-conf-west)] border-[color-mix(in_srgb,var(--color-conf-west)_30%,transparent)]",
  "streak-w": "bg-[var(--color-state-live-soft)] text-[var(--color-state-win)] border-transparent",
  "streak-l": "bg-[var(--loss-red-soft)] text-[var(--color-state-loss)] border-transparent",
  brand: "bg-[var(--color-brand-soft)] text-[var(--color-brand-primary)] border-[color-mix(in_srgb,var(--color-brand-primary)_30%,transparent)]",
  muted: "bg-[var(--color-surface-2)] text-[var(--color-text-muted)] border-[var(--color-border-subtle)]",
};

export function Badge({
  className,
  type = "muted",
  radar = false,
  children,
  ...props
}: BadgeProps) {
  const showRadar = radar || type === "live";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-[var(--radius-sm)] border px-2 py-0.5",
        "text-[11px] font-bold uppercase tracking-[0.08em] font-sans",
        typeClasses[type],
        className
      )}
      {...props}
    >
      {showRadar && <span className="live-radar-dot" aria-hidden />}
      {children}
    </span>
  );
}
