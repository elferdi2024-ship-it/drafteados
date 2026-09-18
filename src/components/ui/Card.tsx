import * as React from "react";
import { cn } from "@/lib/cn";

export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  /** Interactive = hover elevation + pointer */
  interactive?: boolean;
  /** Featured = accent border / soft brand */
  featured?: boolean;
  as?: React.ElementType;
  href?: string;
}

export const Card = React.forwardRef<HTMLElement, CardProps>(
  (
    {
      className,
      interactive = false,
      featured = false,
      as: Comp = "div",
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Comp
        ref={ref as any}
        className={cn(
          "rounded-[var(--radius-md)] border bg-[var(--color-surface-1)]",
          "border-[var(--color-border-subtle)] shadow-[var(--shadow-card)]",
          "transition-all duration-[var(--duration-normal)] ease-[var(--ease-out)]",
          interactive &&
            "cursor-pointer hover:border-[var(--color-border-strong)] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-0.5",
          featured &&
            "border-[var(--color-border-accent)] bg-[var(--color-brand-soft)]",
          className
        )}
        {...(props as any)}
      >
        {children}
      </Comp>
    );
  }
);

Card.displayName = "Card";

export function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex items-center justify-between gap-3 px-[18px] pt-4", className)}
      {...props}
    />
  );
}

export function CardBody({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("px-[18px] py-4", className)} {...props} />;
}

export function CardFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 border-t border-[var(--color-border-subtle)] px-[18px] py-3",
        className
      )}
      {...props}
    />
  );
}
