// filepath: src/components/sections/UniverseSection.tsx
"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { UNIVERSE_ITEMS } from "@/data/drafteados";
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
            stagger: 0.12,
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
      {/* Dynamic Background System */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none overflow-hidden select-none"
      >
        {/* Coordinate blueprint grid */}
        <div className="absolute inset-0 opacity-40 dark:opacity-20 [background-image:linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:[background-image:linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,black_40%,transparent_100%)]" />

        {/* Tactical Dot Matrix */}
        <div className="absolute inset-0 opacity-35 dark:opacity-25 [background-image:radial-gradient(rgba(0,0,0,0.12)_1px,transparent_1px)] dark:[background-image:radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,black_30%,transparent_100%)]" />

        {/* Ambient Stadium Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-[#FF5A1F]/10 blur-[180px] rounded-full" />
        <div className="absolute -bottom-20 left-10 w-[450px] h-[450px] bg-[#38BDF8]/5 blur-[160px] rounded-full" />

        {/* Giant Watermark Typography */}
        <div className="absolute top-1/3 left-0 right-0 overflow-hidden opacity-[0.03] dark:opacity-[0.04] text-center">
          <span
            className="text-[140px] sm:text-[220px] font-black uppercase text-black dark:text-white whitespace-nowrap block"
            style={{ fontFamily: "var(--font-title)" }}
          >
            ECOSISTEMA &bull; TRIPULACIÓN
          </span>
        </div>
      </div>

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
            De un canal de YouTube a un movimiento cultural de baloncesto. Tres grandes proyectos creados desde la pasión para vivir la NBA en todas sus dimensiones.
          </p>
        </div>

        {/* 3-Pillar Universe Cards Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {UNIVERSE_ITEMS.map((item) => {
            const Icon = iconMap[item.iconName];
            const anchorId =
              item.id === "buques-club"
                ? "tienda"
                : item.id === "viajes-usa"
                ? "viajes"
                : item.id;
            return (
              <a
                key={item.id}
                id={anchorId}
                href={item.ctaLink}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className="group relative rounded-3xl p-6 sm:p-7 bg-white dark:bg-[#121214] border border-black/10 dark:border-white/10 hover:border-[#FF5A1F]/60 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-[0_4px_25px_rgba(0,0,0,0.04)] dark:shadow-none hover:shadow-[0_20px_45px_rgba(255,90,31,0.16)] hover:-translate-y-1.5 scroll-mt-28 focus:outline-none"
              >
                {/* Background Card Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-15 dark:opacity-30 group-hover:opacity-50 dark:group-hover:opacity-80 transition-opacity duration-500 pointer-events-none`}
                />

                {/* Card Top & Visual */}
                <div className="relative z-10">
                  {/* Clean Visual Media Showcase Frame */}
                  <div className="relative w-full h-52 sm:h-56 rounded-2xl overflow-hidden mb-6 bg-zinc-100/80 dark:bg-zinc-900/80 border border-black/5 dark:border-white/10 flex items-center justify-center group-hover:border-[#FF5A1F]/30 transition-colors">
                    {item.id === "viajes-usa" ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 pointer-events-none" />
                      </div>
                    ) : item.id === "buques-club" ? (
                      <div className="relative w-full h-full flex items-center justify-center p-6 bg-gradient-to-b from-[#FF5A1F]/10 via-[#FF5A1F]/5 to-transparent dark:from-[#FF5A1F]/15 dark:to-transparent">
                        <div className="relative w-36 h-36 sm:w-40 sm:h-40 transition-transform duration-500 group-hover:scale-110">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            sizes="200px"
                            className="object-contain drop-shadow-[0_12px_24px_rgba(255,90,31,0.25)]"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="relative w-full h-full flex items-center justify-center p-6 bg-gradient-to-b from-zinc-200/50 via-zinc-100/50 to-transparent dark:from-zinc-800/40 dark:via-zinc-900/60 dark:to-zinc-950">
                        <div className="relative w-40 h-40 sm:w-44 sm:h-44 transition-transform duration-500 group-hover:scale-110">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            sizes="220px"
                            className="object-contain drop-shadow-[0_12px_28px_rgba(0,0,0,0.35)]"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Clean Meta Bar: Kicker on left, Arrow indicator on right */}
                  <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-black/5 dark:border-white/8">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-[#FF5A1F] uppercase">
                      <Icon className="w-4 h-4 text-[#FF5A1F] shrink-0" />
                      <span>{item.badge}</span>
                      <span className="text-zinc-300 dark:text-zinc-700">&bull;</span>
                      <span className="text-zinc-500 dark:text-zinc-400 font-sans font-medium lowercase text-xs">
                        {item.tag}
                      </span>
                    </div>

                    <span
                      className="w-8 h-8 rounded-full border border-black/10 dark:border-white/15 flex items-center justify-center text-zinc-600 dark:text-zinc-400 group-hover:text-white group-hover:bg-[#FF5A1F] group-hover:border-[#FF5A1F] transition-all shrink-0"
                      aria-hidden="true"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-zinc-900 dark:text-white tracking-tight leading-none group-hover:text-[#FF5A1F] transition-colors"
                    style={{ fontFamily: "var(--font-title)" }}
                  >
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                {/* Card Bottom Section */}
                <div className="relative z-10 mt-6 pt-5 border-t border-black/5 dark:border-white/8 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                    {item.stats}
                  </span>

                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white group-hover:text-[#FF5A1F] transition-colors">
                    <span>{item.ctaText}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#FF5A1F] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
