"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ExternalLink } from "lucide-react";
import { YoutubeIcon } from "@/components/ui/Icons";
import { NAV_LINKS } from "@/data/drafteados";
import { MagneticButton } from "@/components/ui/MagneticButton";

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
            ? "bg-[#0A0A0A]/85 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl"
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
                className="text-xl sm:text-2xl font-black tracking-wider text-white uppercase group-hover:text-[#FF5A1F] transition-colors"
                style={{ fontFamily: "var(--font-title)" }}
              >
                Drafteados
              </span>
              <span className="text-[9px] tracking-[0.25em] text-zinc-400 uppercase -mt-1 font-medium hidden sm:block">
                Tu Casa NBA
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="px-3.5 py-1.5 text-sm font-medium text-zinc-300 hover:text-white transition-colors duration-200 rounded-full hover:bg-white/5 relative group"
              >
                {link.name}
                <span className="absolute bottom-1 left-3.5 right-3.5 h-[2px] bg-[#FF5A1F] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center" />
              </a>
            ))}
          </nav>

          {/* Right Action */}
          <div className="hidden md:flex items-center gap-3">
            <MagneticButton
              variant="primary"
              size="sm"
              href="https://www.youtube.com/@DrafteadosNBA"
              target="_blank"
              rel="noopener noreferrer"
              className="gap-2"
            >
              <YoutubeIcon className="w-4 h-4" />
              <span>Ver en YouTube</span>
            </MagneticButton>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-zinc-300 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
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
            className="fixed inset-0 top-[60px] z-40 bg-[#0A0A0A]/95 backdrop-blur-2xl px-6 py-8 flex flex-col justify-between md:hidden border-t border-white/10"
          >
            <div className="flex flex-col gap-4">
              {NAV_LINKS.map((link, idx) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="text-2xl font-bold uppercase tracking-wider text-zinc-200 hover:text-[#FF5A1F] transition-colors py-2 border-b border-white/5"
                  style={{ fontFamily: "var(--font-title)" }}
                >
                  {link.name}
                </motion.a>
              ))}
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
              <p className="text-center text-xs text-zinc-500 pt-2">
                &copy; {new Date().getFullYear()} Drafteados &bull; Tu Casa NBA
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
