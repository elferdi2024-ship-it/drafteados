import * as React from "react";
import { cn } from "@/lib/cn";
import { Button } from "./Button";

export interface EmptyStateProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  action?: React.ReactNode;
  className?: string;
}

/** Empty state — copy from COPY_DECK, never “¡Ups!” */
export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-surface-1)] px-6 py-12 text-center",
        className
      )}
    >
      <p className="text-base font-semibold text-[var(--color-text-primary)]">{title}</p>
      {description ? (
        <p className="mt-2 max-w-sm text-sm text-[var(--color-text-muted)]">{description}</p>
      ) : null}
      {action ? (
        <div className="mt-6">{action}</div>
      ) : actionLabel && onAction ? (
        <Button variant="secondary" size="sm" className="mt-6" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}
