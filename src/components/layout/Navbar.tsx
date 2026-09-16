// filepath: src/components/layout/Navbar.tsx
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Trophy, ChevronRight } from "lucide-react";
import { YoutubeIcon } from "@/components/ui/Icons";
import { NAV_LINKS } from "@/data/drafteados";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

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

          {/* Desktop Navigation (Excluye Pick'em repetido; vive en el CTA dedicado de la derecha) */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {NAV_LINKS.filter((link) => link.href !== "/pickem").map((link) => {
              const isInternal = link.href.startsWith("/") && !link.href.startsWith("/#");
              const linkClasses = `px-3.5 py-1.5 text-sm font-medium transition-colors duration-200 rounded-full relative group ${
                isScrolled
                  ? "text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
                  : "text-zinc-300 hover:text-white hover:bg-white/5"
              }`;

              if (isInternal) {
                return (
                  <Link key={link.name} href={link.href} className={linkClasses}>
                    {link.name}
                    <span className="absolute bottom-1 left-3.5 right-3.5 h-[2px] bg-[#FF5A1F] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center" />
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
                  {link.name}
                  <span className="absolute bottom-1 left-3.5 right-3.5 h-[2px] bg-[#FF5A1F] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center" />
                </a>
              );
            })}
          </nav>

          {/* Right Actions: Theme Toggle + Pick'em CTA Sobrio + YouTube CTA */}
          <div className="hidden md:flex items-center gap-2.5">
            <button
              type="button"
              onClick={toggleTheme}
              className={`p-2.5 rounded-full border transition-all duration-300 focus:outline-none flex items-center justify-center cursor-pointer ${
                isScrolled
                  ? "border-black/10 dark:border-white/15 bg-black/5 dark:bg-white/5 text-zinc-800 dark:text-zinc-200 hover:border-[#FF5A1F]/50 hover:text-[#FF5A1F]"
                  : "border-white/15 bg-white/10 text-white hover:border-[#FF5A1F] hover:text-[#FF5A1F]"
              }`}
              aria-label={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
              title={theme === "dark" ? "Activar modo claro" : "Activar modo oscuro"}
            >
              {mounted && theme === "dark" ? (
                <Sun className="w-4 h-4 text-amber-400 transition-transform hover:rotate-45" />
              ) : (
                <Moon className="w-4 h-4 text-zinc-700 dark:text-zinc-300 transition-transform hover:-rotate-12" />
              )}
            </button>

            {/* Botón Pick'em: Sobrio, delicado pero con distinción visual y micro-dot luminoso */}
            <MagneticButton
              variant="outline"
              size="sm"
              href="/pickem"
              className={`group gap-2 rounded-full border transition-all duration-300 backdrop-blur-md px-3.5 py-1.5 text-xs font-semibold tracking-wide normal-case ${
                isScrolled
                  ? "border-[#FF5A1F]/40 hover:border-[#FF5A1F] bg-[#FF5A1F]/[0.07] hover:bg-[#FF5A1F]/[0.16] text-zinc-900 dark:text-zinc-100 shadow-[0_2px_12px_rgba(255,90,31,0.10)] hover:shadow-[0_4px_20px_rgba(255,90,31,0.22)]"
                  : "border-[#FF5A1F]/40 hover:border-[#FF5A1F] bg-black/40 hover:bg-[#FF5A1F]/[0.15] text-white shadow-[0_2px_12px_rgba(255,90,31,0.15)] hover:shadow-[0_4px_22px_rgba(255,90,31,0.28)]"
              }`}
            >
              <Trophy className="w-3.5 h-3.5 text-[#FF5A1F] transition-transform duration-300 group-hover:scale-110" />
              <span>Jugar Pick'em</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F] shadow-[0_0_6px_#FF5A1F]" />
            </MagneticButton>

            <MagneticButton
              variant="secondary"
              size="sm"
              href="https://www.youtube.com/@DrafteadosNBA"
              target="_blank"
              rel="noopener noreferrer"
              className="gap-1.5"
            >
              <YoutubeIcon className="w-4 h-4" />
              <span className="hidden lg:inline">YouTube</span>
            </MagneticButton>
          </div>

          {/* Mobile Actions: Theme Toggle + Mobile Menu Trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              className={`p-2 rounded-lg border transition-all focus:outline-none ${
                isScrolled
                  ? "border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-zinc-800 dark:text-zinc-200"
                  : "border-white/10 bg-white/10 text-white"
              }`}
              aria-label={theme === "dark" ? "Modo claro" : "Modo oscuro"}
            >
              {mounted && theme === "dark" ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
              )}
            </button>

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
                        <span className={link.href === "/pickem" ? "text-[#FF5A1F]" : ""}>
                          {link.name}
                        </span>
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
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-zinc-100 font-medium text-sm transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    {theme === "dark" ? (
                      <Sun className="w-4 h-4 text-amber-400" />
                    ) : (
                      <Moon className="w-4 h-4 text-zinc-700" />
                    )}
                    <span>Modo {theme === "dark" ? "Oscuro" : "Claro"}</span>
                  </span>
                  <span className="text-xs uppercase tracking-wider text-[#FF5A1F] font-bold">
                    Cambiar a {theme === "dark" ? "Claro" : "Oscuro"}
                  </span>
                </button>
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
