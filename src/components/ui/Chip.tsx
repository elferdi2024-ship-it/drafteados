"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

/** Filter chip / segmented control item */
export function Chip({ className, active = false, children, ...props }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-[var(--radius-sm)] px-3 py-1.5",
        "text-xs font-bold uppercase tracking-wider font-sans",
        "transition-colors duration-[var(--duration-fast)]",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-border-accent)]",
        active
          ? "bg-[var(--color-brand-primary)] text-white shadow-sm"
          : "bg-[var(--color-surface-1)] text-[var(--color-text-secondary)] border border-[var(--color-border-subtle)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-text-primary)]",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
