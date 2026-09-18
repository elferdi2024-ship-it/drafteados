// filepath: src/components/layout/Navbar.tsx
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Trophy, ChevronRight } from "lucide-react";
import { YoutubeIcon } from "@/components/ui/Icons";
import { NAV_LINKS } from "@/data/drafteados";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ThemeToggle } from "@/components/theme";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/90 dark:bg-[#0A0A0A]/85 backdrop-blur-xl border-b border-black/10 dark:border-white/10 py-3 shadow-xl"
            : "bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="Drafteados - Inicio"
          >
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden transition-transform duration-300 group-hover:scale-105 group-hover:rotate-6">
              <Image
                src="/images/logo.png"
                alt="Drafteados Logo"
                fill
                priority
                sizes="48px"
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span
                className={`text-xl sm:text-2xl font-black tracking-wider uppercase group-hover:text-[#FF5A1F] transition-colors ${
                  isScrolled ? "text-zinc-900 dark:text-white" : "text-white"
                }`}
                style={{ fontFamily: "var(--font-title)" }}
              >
                Drafteados
              </span>
              <span
                className={`text-[9px] tracking-[0.25em] uppercase -mt-1 font-medium hidden sm:block ${
                  isScrolled ? "text-zinc-500 dark:text-zinc-400" : "text-zinc-400"
                }`}
              >
                Tu Casa NBA
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2 lg:gap-4 xl:gap-6">
            {NAV_LINKS.filter((link) => link.href !== "/pickem").map((link) => {
              const isInternal = link.href.startsWith("/") && !link.href.startsWith("/#");
              const isNbaHub = link.href === "/nba";
              const linkClasses = `relative py-1 text-xs lg:text-[13px] font-mono font-bold uppercase tracking-wider whitespace-nowrap transition-colors duration-200 group flex items-center gap-1.5 ${
                isNbaHub
                  ? "text-[#FF5A1F]"
                  : isScrolled
                  ? "text-zinc-700 dark:text-zinc-300 hover:text-[#FF5A1F] dark:hover:text-[#FF5A1F]"
                  : "text-zinc-300 hover:text-white"
              }`;

              const innerContent = (
                <>
                  {isNbaHub && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F] shadow-[0_0_6px_#FF5A1F] shrink-0" />
                  )}
                  <span>{link.name}</span>
                  <span className="absolute -bottom-0.5 left-0 w-0 h-[2px] bg-[#FF5A1F] group-hover:w-full transition-all duration-200 origin-left" />
                </>
              );

              if (isInternal) {
                return (
                  <Link key={link.name} href={link.href} className={linkClasses}>
                    {innerContent}
                  </Link>
                );
              }

              return (
                <a
                  key={link.name}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className={linkClasses}
                >
                  {innerContent}
                </a>
              );
            })}
          </nav>

          {/* Right Actions: Theme Toggle + Pick'em CTA + YouTube CTA */}
          <div className="hidden md:flex items-center gap-2.5">
            <ThemeToggle size="sm" />

            {/* Botón Pick'em */}
            <Link
              href="/pickem"
              className={`group flex items-center gap-2 rounded-full border transition-all duration-300 px-3.5 py-1.5 text-xs font-mono font-bold tracking-wider uppercase whitespace-nowrap ${
                isScrolled
                  ? "border-[#FF5A1F]/40 hover:border-[#FF5A1F] bg-[#FF5A1F]/10 hover:bg-[#FF5A1F]/20 text-zinc-900 dark:text-zinc-100 shadow-sm"
                  : "border-[#FF5A1F]/50 hover:border-[#FF5A1F] bg-black/40 hover:bg-[#FF5A1F]/20 text-white shadow-sm"
              }`}
            >
              <Trophy className="w-3.5 h-3.5 text-[#FF5A1F] transition-transform duration-300 group-hover:scale-110" />
              <span>Jugar Pick'em</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F] shadow-[0_0_6px_#FF5A1F]" />
            </Link>

            {/* Botón YouTube Oficial */}
            <a
              href="https://www.youtube.com/@DrafteadosNBA"
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase whitespace-nowrap transition-all duration-300 border cursor-pointer ${
                isScrolled
                  ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 border-black/10 dark:border-white/10 hover:bg-[#FF5A1F] dark:hover:bg-[#FF5A1F] dark:hover:text-white shadow-sm"
                  : "bg-white/15 hover:bg-[#FF5A1F] text-white border-white/20 hover:border-[#FF5A1F] shadow-sm"
              }`}
            >
              <YoutubeIcon className="w-4 h-4 text-[#FF5A1F] group-hover:text-white transition-colors" />
              <span className="hidden lg:inline">YouTube</span>
            </a>
          </div>

          {/* Mobile Actions: Theme Toggle + Mobile Menu Trigger */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle size="sm" />

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors focus:outline-none ${
                isScrolled
                  ? "text-zinc-800 dark:text-zinc-200 hover:bg-black/5 dark:hover:bg-white/10"
                  : "text-zinc-300 hover:text-white hover:bg-white/10"
              }`}
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-[60px] z-40 bg-white/95 dark:bg-[#0A0A0A]/95 backdrop-blur-2xl px-6 py-8 flex flex-col justify-between md:hidden border-t border-black/10 dark:border-white/10"
          >
            <div className="flex flex-col gap-1 overflow-y-auto max-h-[calc(100vh-200px)] pr-1">
              {NAV_LINKS.map((link, idx) => {
                const isInternal = link.href.startsWith("/") && !link.href.startsWith("/#");
                const rowClasses = "text-2xl sm:text-3xl font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200 hover:text-[#FF5A1F] transition-colors py-3 border-b border-black/5 dark:border-white/5 flex items-center justify-between";

                if (isInternal) {
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.04 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={rowClasses}
                        style={{ fontFamily: "var(--font-title)" }}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className={link.href === "/pickem" || link.href === "/nba" ? "text-[#FF5A1F]" : ""}>
                            {link.name}
                          </span>
                          {"badge" in link && link.badge && (
                            <span className="text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#FF5A1F]/15 text-[#FF5A1F] border border-[#FF5A1F]/30">
                              {link.badge}
                            </span>
                          )}
                        </div>
                        <ChevronRight className="w-4 h-4 text-zinc-400" />
                      </Link>
                    </motion.div>
                  );
                }

                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    onClick={() => setMobileMenuOpen(false)}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    className={rowClasses}
                    style={{ fontFamily: "var(--font-title)" }}
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 text-zinc-400" />
                  </motion.a>
                );
              })}

              <div className="pt-2">
                <div className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-zinc-100 font-medium text-sm">
                  <span className="flex items-center gap-2.5">
                    <span>Modo visual</span>
                  </span>
                  <ThemeToggle size="sm" />
                </div>
              </div>
            </div>

            <div className="pt-6 flex flex-col gap-3">
              <a
                href="https://www.youtube.com/@DrafteadosNBA"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#FF5A1F] text-white font-semibold text-center shadow-lg"
              >
                <YoutubeIcon className="w-5 h-5" />
                <span>Suscríbete en YouTube</span>
              </a>
              <p className="text-center text-xs text-zinc-500 dark:text-zinc-400 pt-2">
                &copy; {new Date().getFullYear()} Drafteados &bull; Tu Casa NBA
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
