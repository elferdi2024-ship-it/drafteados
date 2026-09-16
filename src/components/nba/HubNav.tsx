// filepath: src/components/nba/HubNav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Flame, Trophy, Calendar, ListOrdered, Users, ArrowUpRight } from "lucide-react";

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
    <header className="sticky top-0 z-40 bg-[var(--hub-bg)]/90 backdrop-blur-md border-b border-[var(--hub-border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 gap-4">
          {/* Logo Drafteados -> Link a Home Marketing ('/') */}
          <Link
            href="/"
            className="flex items-center gap-3 shrink-0 group transition-transform active:scale-95"
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
                className="font-black text-xl sm:text-2xl text-[var(--hub-text)] tracking-tight leading-none group-hover:text-[var(--hub-accent)] transition-colors"
                style={{ fontFamily: "var(--hub-font-display)" }}
              >
                NBA HUB
              </span>
              <span className="text-[10px] font-mono font-bold tracking-widest text-[var(--hub-accent)] uppercase leading-none mt-0.5">
                LOS BUQUES
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = item.exact
                ? pathname === item.href
                : pathname.startsWith(item.href);
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition-all ${
                    isActive
                      ? "bg-[var(--hub-accent)] text-white shadow-md shadow-[var(--hub-accent)]/20"
                      : "text-[var(--hub-text-muted)] hover:text-[var(--hub-text)] hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Direct CTA to Pick'em */}
          <div className="flex items-center gap-3">
            <Link
              href="/pickem"
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-[var(--hub-accent-soft)] hover:bg-[var(--hub-accent)] text-[var(--hub-accent)] hover:text-white border border-[var(--hub-accent)]/40 transition-all font-mono font-bold text-xs uppercase tracking-wider group shrink-0"
            >
              <span>PICK&apos;EM</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Mobile Horizontal Sub-Nav */}
        <div className="flex md:hidden items-center gap-1.5 overflow-x-auto py-2.5 border-t border-white/[0.04] no-scrollbar -mx-4 px-4">
          {NAV_ITEMS.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-mono font-bold tracking-wider uppercase shrink-0 transition-colors ${
                  isActive
                    ? "bg-[var(--hub-accent)] text-white shadow-sm"
                    : "bg-[var(--hub-surface-2)] text-[var(--hub-text-muted)] hover:text-[var(--hub-text)] border border-white/5"
                }`}
              >
                <Icon className="w-3 h-3" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
