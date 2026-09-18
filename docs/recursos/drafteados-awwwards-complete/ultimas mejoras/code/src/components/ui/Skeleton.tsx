import * as React from "react";
import { cn } from "@/lib/cn";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Rounded full for avatars */
  circle?: boolean;
}

/** Loading placeholder — match real layout shape, not a centered spinner */
export function Skeleton({ className, circle = false, ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "animate-pulse bg-[var(--color-surface-2)]",
        circle ? "rounded-full" : "rounded-[var(--radius-sm)]",
        className
      )}
      {...props}
    />
  );
}

export function GameCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-md)] border border-[var(--color-border-subtle)] bg-[var(--color-surface-1)] p-4",
        className
      )}
    >
      <Skeleton className="mb-4 h-5 w-24" />
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Skeleton circle className="size-9" />
          <Skeleton className="h-6 w-12" />
        </div>
        <Skeleton className="h-8 w-16" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-12" />
          <Skeleton circle className="size-9" />
        </div>
      </div>
    </div>
  );
}
