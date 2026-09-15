// filepath: src/components/sections/UniverseSection.tsx
"use client";

import React, { useEffect, useRef } from "react";
import { UNIVERSE_ITEMS, UniverseItem } from "@/data/drafteados";
import {
  ShoppingBag,
  Plane,
  Mic,
  Trophy,
  ArrowUpRight,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const iconMap = {
  ShoppingBag,
  Plane,
  Mic,
  Trophy,
};

export function UniverseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Header reveal
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 1.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Cards staggered reveal
      const cards = cardsRef.current?.children;
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 45,
            scale: 0.97,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.05,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="universo"
      className="relative z-20 py-24 sm:py-32 bg-[#FAFAFA] dark:bg-[#0A0A0A] transition-colors duration-300 overflow-hidden content-auto"
    >
      {/* Subtle ambient lighting */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#FF5A1F]/8 blur-[160px] pointer-events-none rounded-full"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Editorial, Anti-Slop */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="flex items-center justify-center gap-2.5 text-xs font-mono font-bold tracking-[0.25em] text-[#FF5A1F] uppercase mb-4">
            <span className="w-2 h-0.5 bg-[#FF5A1F]" />
            <span>02 &bull; EL ECOSISTEMA DRAFTEADOS</span>
            <span className="w-2 h-0.5 bg-[#FF5A1F]" />
          </div>

          <h2
            className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-zinc-900 dark:text-white tracking-tight leading-tight"
            style={{ fontFamily: "var(--font-title)" }}
          >
            El Universo Drafteados
          </h2>
          <p className="mt-4 text-base sm:text-xl text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed">
            De un canal de YouTube a un movimiento cultural de baloncesto. Cuatro proyectos creados desde la pasión para vivir la NBA en todas sus dimensiones.
          </p>
        </div>

        {/* 2x2 Interactive Universe Cards - Spacious, Clean Typography */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {UNIVERSE_ITEMS.map((item) => {
            const Icon = iconMap[item.iconName];
            const anchorId =
              item.id === "buques-club"
                ? "tienda"
                : item.id === "viajes-usa"
                ? "viajes"
                : item.id;
            return (
              <div
                key={item.id}
                id={anchorId}
                className="group relative rounded-3xl p-7 sm:p-10 bg-white dark:bg-[#121214] border border-black/10 dark:border-white/10 hover:border-[#FF5A1F]/60 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-[0_4px_25px_rgba(0,0,0,0.04)] dark:shadow-none hover:shadow-[0_20px_45px_rgba(255,90,31,0.16)] hover:-translate-y-1 scroll-mt-28"
              >
                {/* Background Card Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-15 dark:opacity-30 group-hover:opacity-50 dark:group-hover:opacity-80 transition-opacity duration-500 pointer-events-none`}
                />

                {/* Card Top Section */}
                <div className="relative z-10">
                  {/* Clean Meta Bar: Kicker on left, Arrow action on right */}
                  <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-black/5 dark:border-white/8">
                    <div className="flex items-center gap-2.5 text-xs font-mono font-bold tracking-wider text-[#FF5A1F] uppercase">
                      <Icon className="w-4 h-4 text-[#FF5A1F] shrink-0" />
                      <span>{item.badge}</span>
                      <span className="text-zinc-300 dark:text-zinc-700">&bull;</span>
                      <span className="text-zinc-500 dark:text-zinc-400 font-sans font-medium lowercase text-xs">
                        {item.tag}
                      </span>
                    </div>

                    <a
                      href={item.ctaLink}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      className="w-8 h-8 rounded-full border border-black/10 dark:border-white/15 flex items-center justify-center text-zinc-600 dark:text-zinc-400 group-hover:text-white group-hover:bg-[#FF5A1F] group-hover:border-[#FF5A1F] transition-all cursor-pointer shrink-0"
                      aria-label={`Ir a ${item.title}`}
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-zinc-900 dark:text-white tracking-tight leading-none group-hover:text-[#FF5A1F] transition-colors"
                    style={{ fontFamily: "var(--font-title)" }}
                  >
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-4 text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                {/* Card Bottom Section */}
                <div className="relative z-10 mt-8 pt-5 border-t border-black/5 dark:border-white/8 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                    {item.stats}
                  </span>

                  <a
                    href={item.ctaLink}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white hover:text-[#FF5A1F] transition-colors py-1 cursor-pointer"
                  >
                    <span>{item.ctaText}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#FF5A1F]" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
