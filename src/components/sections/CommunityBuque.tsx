// filepath: src/components/sections/CommunityBuque.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useInView } from "framer-motion";
import {
  COMMUNITY_METRICS,
  FOUNDERS,
  PRESS_MILESTONES,
  BUQUE_ORIGIN,
  SOCIAL_COMMUNITY_STATS,
} from "@/data/drafteados";
import { Quote, ArrowUpRight, Calendar, MapPin } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { YoutubeIcon } from "@/components/ui/Icons";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
}: {
  target: number;
  suffix?: string;
  prefix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = target / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

export function CommunityBuque() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const foundersRef = useRef<HTMLDivElement>(null);
  const milestonesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
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

      if (metricsRef.current) {
        gsap.fromTo(
          metricsRef.current,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            clearProps: "all",
            scrollTrigger: {
              trigger: metricsRef.current,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      if (foundersRef.current) {
        gsap.fromTo(
          foundersRef.current,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            clearProps: "all",
            scrollTrigger: {
              trigger: foundersRef.current,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      if (milestonesRef.current) {
        gsap.fromTo(
          milestonesRef.current,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            clearProps: "all",
            scrollTrigger: {
              trigger: milestonesRef.current,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="comunidad"
      className="relative z-20 py-16 sm:py-24 lg:py-28 scroll-mt-16 sm:scroll-mt-20 bg-[#F4F4F5] dark:bg-[#0E0E11] transition-colors duration-300 overflow-hidden"
    >
      {/* Subtle Background Atmosphere */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none overflow-hidden select-none"
      >
        <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-[#FF5A1F]/8 blur-[180px] rounded-full" />
        <div className="absolute bottom-10 -left-20 w-[450px] h-[450px] bg-[#38BDF8]/6 blur-[160px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16 sm:space-y-20">
        {/* Section Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-xs font-mono font-bold tracking-[0.25em] text-[#FF5A1F] uppercase mb-3">
            <span className="w-2 h-0.5 bg-[#FF5A1F]" />
            <span>03 &bull; NUESTRA COMUNIDAD &bull; SOMOS BUQUES</span>
            <span className="w-2 h-0.5 bg-[#FF5A1F]" />
          </div>

          <h2
            className="text-3xl sm:text-6xl lg:text-7xl font-black uppercase text-zinc-900 dark:text-white tracking-tight leading-tight"
            style={{ fontFamily: "var(--font-title)" }}
          >
            MÁS DE 880.000 BUQUES
          </h2>

          <p className="mt-2.5 sm:mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed">
            Una tripulación global unida por la pasión, el análisis y el debate diario de la NBA.
          </p>
        </div>

        {/* 1. Scoreboard Metrics Ribbon + Social Badges */}
        <div ref={metricsRef} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6">
            {COMMUNITY_METRICS.map((metric) => (
              <div
                key={metric.id}
                className="relative rounded-2xl p-5 sm:p-7 bg-white dark:bg-[#151518] border border-black/8 dark:border-white/10 shadow-sm flex flex-col items-center text-center justify-center overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FF5A1F] to-transparent opacity-70" />
                <div
                  className="text-3xl sm:text-5xl lg:text-6xl font-black text-zinc-900 dark:text-white tracking-tight"
                  style={{ fontFamily: "var(--font-title)" }}
                >
                  <AnimatedCounter
                    target={metric.value}
                    suffix={metric.suffix}
                    prefix={metric.prefix}
                  />
                </div>
                <h3 className="mt-1 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
                  {metric.label}
                </h3>
                <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                  {metric.description}
                </p>
              </div>
            ))}
          </div>

          {/* Clean Social Platforms Pills */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar py-2">
            {SOCIAL_COMMUNITY_STATS.map((social) => (
              <a
                key={social.platform}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-[#151518] border border-black/8 dark:border-white/10 text-xs font-mono text-zinc-700 dark:text-zinc-300 hover:border-[#FF5A1F] hover:text-[#FF5A1F] transition-colors shrink-0 shadow-xs"
              >
                <span className="font-bold">{social.platform}:</span>
                <span className="text-[#FF5A1F] font-bold">{social.count}</span>
              </a>
            ))}
          </div>
        </div>

        {/* 2. Los Fundadores + Origen del Buque */}
        <div ref={foundersRef} className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-black/8 dark:border-white/10 pb-4 gap-2">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#FF5A1F] block mb-1">
                LIDERAZGO &bull; FUNDADORES
              </span>
              <h3
                className="text-2xl sm:text-4xl font-black uppercase text-zinc-900 dark:text-white tracking-tight"
                style={{ fontFamily: "var(--font-title)" }}
              >
                Los Capitanes del Buque
              </h3>
            </div>
            <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
              Desde 2017 al frente de Drafteados
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {FOUNDERS.map((founder) => (
              <div
                key={founder.number}
                className="group rounded-3xl bg-white dark:bg-[#121215] border border-black/8 dark:border-white/10 overflow-hidden shadow-sm hover:border-[#FF5A1F]/50 transition-all duration-300 flex flex-col"
              >
                <div className="relative w-full h-80 sm:h-96 lg:h-[460px] bg-zinc-900 overflow-hidden shrink-0">
                  <Image
                    src={founder.avatar}
                    alt={founder.name}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className={`object-cover ${
                      founder.number === "01" ? "object-[center_12%]" : "object-[center_8%]"
                    } group-hover:scale-102 transition-transform duration-700`}
                  />
                  {/* Localized Bottom Gradient Only Behind Text - Leaves Faces Completely Clear & Bright */}
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />

                  <div className="absolute bottom-4 left-5 right-5 z-10 text-white">
                    <h4
                      className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white drop-shadow-md"
                      style={{ fontFamily: "var(--font-title)" }}
                    >
                      {founder.name}
                    </h4>
                    <span className="text-xs font-mono text-[#FF5A1F] font-bold tracking-wider uppercase block mt-0.5 drop-shadow-sm">
                      {founder.role}
                    </span>
                  </div>
                </div>

                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-center">
                  <blockquote className="text-xs sm:text-sm italic text-zinc-700 dark:text-zinc-300 border-l-2 border-[#FF5A1F] pl-3 py-1 leading-relaxed">
                    &ldquo;{founder.quote}&rdquo;
                  </blockquote>
                </div>
              </div>
            ))}
          </div>

          {/* Compact Origin Kicker Banner */}
          <div className="rounded-2xl p-5 sm:p-6 bg-white dark:bg-[#151518] border border-black/8 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#FF5A1F] uppercase">
                <span className="w-2 h-0.5 bg-[#FF5A1F]" />
                <span>¿QUÉ SIGNIFICA SER UN BUQUE?</span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
                Inspirado orgánicamente en Devin Booker, el término “Buque” se convirtió en el emblema de liderazgo, fidelidad y amor por el baloncesto que une a la comunidad.
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-[#FF5A1F] uppercase shrink-0">
              Drafteados &bull; 2017 &ndash; 2026
            </span>
          </div>
        </div>

        {/* 3. Coberturas Reales & Manifiesto Oficial */}
        <div ref={milestonesRef} className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-black/8 dark:border-white/10 pb-4 gap-2">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#FF5A1F] block mb-1">
                SALA DE PRENSA &bull; COBERTURAS
              </span>
              <h3
                className="text-2xl sm:text-4xl font-black uppercase text-zinc-900 dark:text-white tracking-tight"
                style={{ fontFamily: "var(--font-title)" }}
              >
                Grandes Citas del Baloncesto
              </h3>
            </div>
            <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
              EE.UU., España y Eventos Oficiales
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {PRESS_MILESTONES.map((item) => (
              <div
                key={item.id}
                className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#121215] border border-black/8 dark:border-white/10 flex flex-col justify-between space-y-3 hover:border-[#FF5A1F]/40 transition-colors"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
                    <span className="font-bold text-[#FF5A1F] uppercase">{item.category}</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {item.date}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-white leading-snug">
                    {item.title}
                  </h4>
                </div>

                <div className="pt-2 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#FF5A1F]" />
                    {item.location}
                  </span>
                  <span className="text-[#FF5A1F] font-bold text-[10px] uppercase">
                    {item.highlight}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Minimalist Manifesto Card */}
          <div className="rounded-3xl p-6 sm:p-8 bg-white dark:bg-[#151518] border border-black/8 dark:border-white/15 text-center flex flex-col items-center space-y-4 shadow-sm">
            <Quote className="w-6 h-6 text-[#FF5A1F] opacity-80" />
            <blockquote className="text-sm sm:text-lg text-zinc-800 dark:text-zinc-200 italic max-w-2xl leading-relaxed">
              &ldquo;Acercamos la cultura NBA a los aficionados hispanohablantes que quieren entenderla, compartirla y vivirla con pasión y rigor.&rdquo;
            </blockquote>
            <div className="pt-2">
              <MagneticButton
                variant="primary"
                size="md"
                href="https://www.youtube.com/@DrafteadosNBA"
                target="_blank"
                rel="noopener noreferrer"
              >
                <YoutubeIcon className="w-4 h-4 text-white" />
                <span>Suscribirse en YouTube (+880K)</span>
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
