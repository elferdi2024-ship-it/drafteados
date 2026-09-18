// filepath: src/components/nba/HubNav.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Flame, Trophy, Calendar, ListOrdered, Users, ArrowUpRight } from "lucide-react";
import { ThemeToggle } from "@/components/theme";
import { TimezonePicker } from "@/components/time/TimezonePicker";
import { Button } from "@/components/ui/Button";

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  exact?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { href: "/nba", label: "HOY", icon: Flame, exact: true },
  { href: "/nba/calendario", label: "CALENDARIO", icon: Calendar },
  { href: "/nba/clasificacion", label: "CLASIFICACIÓN", icon: ListOrdered },
  { href: "/nba/lideres", label: "LÍDERES", icon: Trophy },
  { href: "/nba/equipos", label: "EQUIPOS", icon: Users },
];

export function HubNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 bg-[var(--color-canvas)]/90 backdrop-blur-md border-b border-[var(--color-border-subtle)] transition-colors duration-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 gap-2 sm:gap-4">
          {/* Logo Drafteados -> Link a Home Marketing ('/') */}
          <Link
            href="/"
            className="flex items-center gap-2.5 sm:gap-3 shrink-0 group transition-transform active:scale-95 focus-visible:outline-2 focus-visible:outline-[var(--color-border-accent)] rounded-lg p-1"
            aria-label="Volver a la Home principal"
          >
            <Image
              src="/images/logo.png"
              alt="Drafteados"
              width={34}
              height={34}
              className="w-8 h-8 sm:w-9 sm:h-9 object-contain drop-shadow"
            />
            <div className="flex flex-col">
              <span
                className="font-black text-xl sm:text-2xl text-[var(--color-text-primary)] tracking-tight leading-none group-hover:text-[var(--color-brand-primary)] transition-colors"
                style={{ fontFamily: "var(--font-display)" }}
              >
                NBA HUB
              </span>
              <span className="text-[10px] font-mono font-bold tracking-widest text-[var(--color-brand-primary)] uppercase leading-none mt-0.5">
                TU CASA NBA
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5" aria-label="Navegación NBA Hub">
            {NAV_ITEMS.map((item) => {
              const isActive = item.exact
                ? pathname === item.href
                : pathname.startsWith(item.href);
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-sans font-semibold tracking-wider uppercase transition-all duration-150 ${
                    isActive
                      ? "bg-[var(--color-brand-primary)] text-white shadow-sm"
                      : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-2)]"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Actions: Timezone Picker + Theme Toggle + CTA to Pick'em */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Selector de Horarios Hispano */}
            <TimezonePicker compact />

            {/* Theme Toggle */}
            <ThemeToggle size="sm" />

            {/* CTA Pick'em */}
            <Button
              href="/pickem"
              variant="primary"
              size="sm"
              iconRight={<ArrowUpRight className="w-3.5 h-3.5" />}
              className="hidden sm:inline-flex text-xs uppercase tracking-wider font-semibold"
            >
              PICK&apos;EM
            </Button>
          </div>
        </div>

        {/* Mobile Horizontal Sub-Nav */}
        <div className="flex lg:hidden items-center gap-1.5 overflow-x-auto py-2.5 border-t border-[var(--color-border-subtle)] no-scrollbar -mx-4 px-4">
          {NAV_ITEMS.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-sans font-semibold tracking-wider uppercase shrink-0 transition-all duration-150 ${
                  isActive
                    ? "bg-[var(--color-brand-primary)] text-white shadow-sm"
                    : "bg-[var(--color-surface-2)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] border border-[var(--color-border-subtle)]"
                }`}
              >
                <Icon className="w-3 h-3" />
                <span>{item.label}</span>
              </Link>
            );
          })}
          {/* Mobile direct button for Pick'em */}
          <Link
            href="/pickem"
            className="sm:hidden flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-sans font-bold tracking-wider uppercase shrink-0 bg-[var(--color-brand-primary)] text-white shadow-sm"
          >
            <span>PICK&apos;EM</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </header>
  );
}
