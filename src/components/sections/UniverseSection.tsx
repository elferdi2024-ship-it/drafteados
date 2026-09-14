"use client";

import React, { useEffect, useRef } from "react";
import { UNIVERSE_ITEMS, UniverseItem } from "@/data/drafteados";
import {
  ShoppingBag,
  Plane,
  Mic,
  Trophy,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
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
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.children;
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 50,
            scale: 0.96,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 82%",
              toggleActions: "play none none none",
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
      className="relative z-20 py-24 sm:py-32 bg-[#FAFAFA] dark:bg-[#0A0A0A] transition-colors duration-300 overflow-hidden"
    >
      {/* Background Radial Glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#FF5A1F]/10 blur-[150px] pointer-events-none rounded-full"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF5A1F]/10 border border-[#FF5A1F]/25 text-[#FF5A1F] text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            MÁS ALLÁ DEL VÍDEO
          </div>
          <h2
            className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-zinc-900 dark:text-white tracking-tight leading-tight"
            style={{ fontFamily: "var(--font-title)" }}
          >
            El Universo Drafteados
          </h2>
          <p className="mt-4 text-base sm:text-xl text-zinc-600 dark:text-zinc-400 font-normal">
            Drafteados ya no es solo un canal. Es un ecosistema completo para
            quienes respiran la cultura del baloncesto los 365 días del año.
          </p>
        </div>

        {/* 2x2 Interactive Universe Cards */}
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
                className="group relative rounded-3xl p-8 sm:p-10 bg-white dark:bg-[#121212]/90 border border-black/8 dark:border-white/10 hover:border-[#FF5A1F]/50 transition-all duration-500 overflow-hidden flex flex-col justify-between shadow-md dark:shadow-none hover:shadow-[0_20px_50px_rgba(255,90,31,0.15)] hover:-translate-y-1 scroll-mt-28"
              >
                {/* Background Card Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-20 dark:opacity-40 group-hover:opacity-60 dark:group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                />

                {/* Card Top Section */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#FF5A1F]/10 dark:bg-white/5 border border-[#FF5A1F]/20 dark:border-white/10 flex items-center justify-center text-[#FF5A1F] group-hover:scale-110 group-hover:bg-[#FF5A1F] group-hover:text-white transition-all duration-300">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-xs uppercase tracking-widest font-semibold text-[#FF5A1F]">
                          {item.badge}
                        </span>
                        <div className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">
                          {item.tag}
                        </div>
                      </div>
                    </div>

                    <a
                      href={item.ctaLink}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      className="w-10 h-10 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center text-zinc-600 dark:text-zinc-400 group-hover:text-[#FF5A1F] dark:group-hover:text-white group-hover:border-[#FF5A1F]/40 dark:group-hover:border-white/30 group-hover:bg-black/5 dark:group-hover:bg-white/10 transition-all"
                      aria-label={`Ir a ${item.title}`}
                    >
                      <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>

                  <h3
                    className="text-3xl sm:text-4xl font-bold uppercase text-zinc-900 dark:text-white tracking-wide group-hover:text-[#FF5A1F] transition-colors"
                    style={{ fontFamily: "var(--font-title)" }}
                  >
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Card Bottom Section */}
                <div className="relative z-10 mt-8 pt-6 border-t border-black/5 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {item.stats && (
                    <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                      &bull; {item.stats}
                    </span>
                  )}
                  <MagneticButton
                    variant="primary"
                    size="sm"
                    href={item.ctaLink}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="w-full sm:w-auto"
                  >
                    <span>{item.ctaText}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </MagneticButton>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
