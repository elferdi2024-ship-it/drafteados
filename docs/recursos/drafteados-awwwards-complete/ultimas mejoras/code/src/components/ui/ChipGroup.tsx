"use client";

import * as React from "react";
import { cn } from "@/lib/cn";
import { Chip } from "./Chip";

export interface ChipOption {
  id: string;
  label: string;
}

export interface ChipGroupProps {
  options: ChipOption[];
  value: string;
  onChange: (id: string) => void;
  className?: string;
  /** Accessible name for the group */
  "aria-label"?: string;
}

/** Single-select filter row — one active chip at a time */
export function ChipGroup({
  options,
  value,
  onChange,
  className,
  "aria-label": ariaLabel = "Filtros",
}: ChipGroupProps) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={cn(
        "flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className
      )}
    >
      {options.map((opt) => (
        <Chip
          key={opt.id}
          active={value === opt.id}
          onClick={() => onChange(opt.id)}
        >
          {opt.label}
        </Chip>
      ))}
    </div>
  );
}
