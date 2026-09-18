import * as React from "react";
import { cn } from "@/lib/cn";
import { Button } from "./Button";

export interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = "No se pudieron cargar los datos.",
  description,
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={cn(
        "flex flex-col items-center justify-center rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-surface-1)] px-6 py-12 text-center",
        className
      )}
    >
      <p className="text-base font-semibold text-[var(--color-text-primary)]">{title}</p>
      {description ? (
        <p className="mt-2 max-w-sm text-sm text-[var(--color-text-muted)]">{description}</p>
      ) : null}
      {onRetry ? (
        <Button variant="primary" size="sm" className="mt-6" onClick={onRetry}>
          Reintentar
        </Button>
      ) : null}
    </div>
  );
}
