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
  Activity,
  Flame,
  ArrowUpRight,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const iconMap = {
  ShoppingBag,
  Plane,
  Mic,
  Trophy,
  Activity,
  Flame,
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
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            clearProps: "all",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Cards staggered reveal (with clearProps to guarantee permanent visibility)
      const cards = cardsRef.current?.children;
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            clearProps: "all",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    // Refresh ScrollTrigger after paint
    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="universo"
      className="relative z-20 py-20 sm:py-28 lg:py-32 scroll-mt-16 sm:scroll-mt-20 bg-[#FAFAFA] dark:bg-[#0A0A0A] transition-colors duration-300 overflow-hidden"
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

      </div>

      <div className="relative max-w-7xl xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="flex items-center justify-center gap-2.5 text-xs font-mono font-bold tracking-[0.25em] text-[#FF5A1F] uppercase mb-3">
            <span className="w-2 h-0.5 bg-[#FF5A1F]" />
            <span>02 &bull; EXTENSIÓN DE MARCA</span>
            <span className="w-2 h-0.5 bg-[#FF5A1F]" />
          </div>

          <h2
            className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-zinc-900 dark:text-white tracking-tight leading-tight"
            style={{ fontFamily: "var(--font-title)" }}
          >
            UNIVERSO DRAFTEADOS
          </h2>
          <p className="mt-2 sm:mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed max-w-2xl mx-auto">
            Podcast original con Daimiel y Calderón, viajes a la NBA, tienda oficial, centro de estadísticas y juego oficial.
          </p>
        </div>

        {/* Ecosistema Universe Cards Grid (5 Pilares en 1 Fila en PC) */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 lg:gap-4 xl:gap-5">
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
                className="group relative rounded-3xl p-5 sm:p-5 bg-white dark:bg-[#121214] border border-black/10 dark:border-white/10 hover:border-[#FF5A1F]/60 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-[0_4px_25px_rgba(0,0,0,0.04)] dark:shadow-none hover:shadow-[0_20px_45px_rgba(255,90,31,0.16)] hover:-translate-y-1.5 scroll-mt-28 focus:outline-none"
              >
                {/* Background Card Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-15 dark:opacity-30 group-hover:opacity-50 dark:group-hover:opacity-80 transition-opacity duration-500 pointer-events-none`}
                />

                {/* Card Top & Visual */}
                <div className="relative z-10">
                  {/* Clean Visual Media Showcase Frame */}
                  <div className="relative w-full h-44 sm:h-48 rounded-2xl overflow-hidden mb-4 bg-zinc-100/80 dark:bg-zinc-900/80 border border-black/5 dark:border-white/10 flex items-center justify-center group-hover:border-[#FF5A1F]/30 transition-colors">
                    {item.id === "viajes-usa" ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 20vw"
                          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 pointer-events-none" />
                      </div>
                    ) : item.id === "pickem-nba" ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 20vw"
                          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 pointer-events-none" />
                      </div>
                    ) : item.id === "buques-club" ? (
                      <div className="relative w-full h-full flex items-center justify-center p-4 bg-gradient-to-b from-[#FF5A1F]/10 via-[#FF5A1F]/5 to-transparent dark:from-[#FF5A1F]/15 dark:to-transparent">
                        <div className="relative w-32 h-32 transition-transform duration-500 group-hover:scale-110">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            sizes="180px"
                            className="object-contain drop-shadow-[0_12px_24px_rgba(255,90,31,0.25)]"
                          />
                        </div>
                      </div>
                    ) : item.id === "podcast-3mas1" ? (
                      <div className="relative w-full h-full flex items-center justify-center p-4 bg-gradient-to-b from-zinc-200/50 via-zinc-100/50 to-transparent dark:from-zinc-800/40 dark:via-zinc-900/60 dark:to-zinc-950">
                        <div className="relative w-32 h-32 transition-transform duration-500 group-hover:scale-110">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            sizes="180px"
                            className="object-contain drop-shadow-[0_12px_28px_rgba(0,0,0,0.35)]"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="relative w-full h-full flex items-center justify-center p-4 bg-gradient-to-b from-zinc-200/50 via-zinc-100/50 to-transparent dark:from-zinc-800/40 dark:via-zinc-900/60 dark:to-zinc-950">
                        <div className="relative w-32 h-32 transition-transform duration-500 group-hover:scale-110">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            sizes="180px"
                            className="object-contain drop-shadow-[0_12px_28px_rgba(0,0,0,0.35)]"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Clean Meta Bar */}
                  <div className="flex items-center justify-between gap-2 mb-3 pb-2.5 border-b border-black/5 dark:border-white/8">
                    <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold tracking-wider text-[#FF5A1F] uppercase truncate">
                      <Icon className="w-3.5 h-3.5 text-[#FF5A1F] shrink-0" />
                      <span className="truncate">{item.badge}</span>
                    </div>

                    <span
                      className="w-7 h-7 rounded-full border border-black/10 dark:border-white/15 flex items-center justify-center text-zinc-600 dark:text-zinc-400 group-hover:text-white group-hover:bg-[#FF5A1F] group-hover:border-[#FF5A1F] transition-all shrink-0"
                      aria-hidden="true"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-xl sm:text-2xl font-black uppercase text-zinc-900 dark:text-white tracking-tight leading-none group-hover:text-[#FF5A1F] transition-colors"
                    style={{ fontFamily: "var(--font-title)" }}
                  >
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2.5 text-xs sm:text-[13px] text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal line-clamp-3">
                    {item.description}
                  </p>
                </div>

                {/* Card Bottom Section */}
                <div className="relative z-10 mt-5 pt-3.5 border-t border-black/5 dark:border-white/8 flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 truncate">
                    {item.stats}
                  </span>

                  <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-zinc-900 dark:text-white group-hover:text-[#FF5A1F] transition-colors shrink-0">
                    <span>{item.ctaText}</span>
                    <ArrowUpRight className="w-3 h-3 text-[#FF5A1F] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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
