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
import { Quote, ArrowUpRight, Newspaper, Calendar, MapPin, Sparkles } from "lucide-react";
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
  const originRef = useRef<HTMLDivElement>(null);
  const foundersHeaderRef = useRef<HTMLDivElement>(null);
  const foundersGridRef = useRef<HTMLDivElement>(null);
  const pressRef = useRef<HTMLDivElement>(null);
  const manifestoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Top header
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 92%",
              once: true,
            },
          }
        );
      }

      // Metrics cards
      const metrics = metricsRef.current?.children;
      if (metrics && metrics.length > 0) {
        gsap.fromTo(
          metrics,
          { opacity: 0, y: 35, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: metricsRef.current,
              start: "top 92%",
              once: true,
            },
          }
        );
      }

      // Origin of Buque
      if (originRef.current) {
        gsap.fromTo(
          originRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: originRef.current,
              start: "top 92%",
              once: true,
            },
          }
        );
      }

      // Founders header
      if (foundersHeaderRef.current) {
        gsap.fromTo(
          foundersHeaderRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: foundersHeaderRef.current,
              start: "top 92%",
              once: true,
            },
          }
        );
      }

      // Founders cards
      const founders = foundersGridRef.current?.children;
      if (founders && founders.length > 0) {
        gsap.fromTo(
          founders,
          { opacity: 0, y: 35, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: foundersGridRef.current,
              start: "top 92%",
              once: true,
            },
          }
        );
      }

      // Press / Milestones
      if (pressRef.current) {
        gsap.fromTo(
          pressRef.current,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: pressRef.current,
              start: "top 92%",
              once: true,
            },
          }
        );
      }

      // Manifesto
      if (manifestoRef.current) {
        gsap.fromTo(
          manifestoRef.current,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: manifestoRef.current,
              start: "top 92%",
              once: true,
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
      id="comunidad"
      className="relative z-20 py-16 sm:py-24 lg:py-32 scroll-mt-16 sm:scroll-mt-20 bg-[#F4F4F5] dark:bg-[#0E0E11] transition-colors duration-300 overflow-hidden content-auto"
    >
      {/* Background Ambience */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none overflow-hidden select-none"
      >
        <div className="absolute inset-0 opacity-40 dark:opacity-20 [background-image:linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:[background-image:linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,black_40%,transparent_100%)]" />
        <div className="absolute top-1/4 -right-20 w-[550px] h-[550px] bg-[#FF5A1F]/8 blur-[180px] rounded-full" />
        <div className="absolute bottom-10 -left-20 w-[500px] h-[500px] bg-[#38BDF8]/6 blur-[160px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header - Official Authentic Voice */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="flex items-center justify-center gap-2 text-xs font-mono font-bold tracking-[0.25em] text-[#FF5A1F] uppercase mb-3">
            <span className="w-2 h-0.5 bg-[#FF5A1F]" />
            <span>03 &bull; NUESTRA COMUNIDAD &bull; SOMOS BUQUES</span>
            <span className="w-2 h-0.5 bg-[#FF5A1F]" />
          </div>

          <h2
            className="text-3xl sm:text-6xl lg:text-7xl font-black uppercase text-zinc-900 dark:text-white tracking-tight leading-tight"
            style={{ fontFamily: "var(--font-title)" }}
          >
            ¡Muchas Gracias, Buques!
          </h2>

          <p className="mt-3 sm:mt-4 text-sm sm:text-lg text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed">
            Todo lo que hemos conseguido ha sido posible por vosotros. Una comunidad sólida en España y Latinoamérica unida por el baloncesto.
          </p>
        </div>

        {/* High-Density Scoreboard Stat Ribbon */}
        <div
          ref={metricsRef}
          className="grid grid-cols-3 gap-2 sm:gap-6 mb-4 sm:mb-6"
        >
          {COMMUNITY_METRICS.map((metric) => (
            <div
              key={metric.id}
              className="relative rounded-2xl sm:rounded-3xl p-3 sm:p-7 bg-white dark:bg-[#151518] border border-black/8 dark:border-white/10 shadow-sm dark:shadow-none flex flex-col items-center text-center justify-center overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FF5A1F] to-transparent opacity-60" />
              <div
                className="text-2xl sm:text-5xl lg:text-6xl font-black text-zinc-900 dark:text-white tracking-tight"
                style={{ fontFamily: "var(--font-title)" }}
              >
                <AnimatedCounter
                  target={metric.value}
                  suffix={metric.suffix}
                  prefix={metric.prefix}
                />
              </div>
              <h3 className="mt-1 sm:mt-2 text-[10px] sm:text-sm font-mono font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
                {metric.label}
              </h3>
              <p className="hidden md:block mt-1 text-xs text-zinc-500 dark:text-zinc-400 max-w-[220px]">
                {metric.description}
              </p>
            </div>
          ))}
        </div>

        {/* Social Platforms Sub-Ribbon (Mobile Tap-Friendly) */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 overflow-x-auto scrollbar-none pb-2 mb-10 sm:mb-16">
          {SOCIAL_COMMUNITY_STATS.map((social) => (
            <a
              key={social.platform}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white dark:bg-[#151518] border border-black/8 dark:border-white/10 text-[11px] sm:text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-300 hover:border-[#FF5A1F] hover:text-[#FF5A1F] transition-all shrink-0 shadow-xs"
            >
              <span className="text-zinc-900 dark:text-white font-bold">{social.platform}:</span>
              <span className="text-[#FF5A1F] font-bold">{social.count}</span>
            </a>
          ))}
        </div>

        {/* Authentic Origin Lore Block */}
        <div
          ref={originRef}
          className="mb-14 sm:mb-24 rounded-3xl p-6 sm:p-10 lg:p-12 bg-white dark:bg-[#151518] border border-black/8 dark:border-white/10 shadow-sm relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF5A1F]/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-widest text-[#FF5A1F] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{BUQUE_ORIGIN.subtitle}</span>
            </div>

            <h3
              className="text-2xl sm:text-4xl font-black uppercase text-zinc-900 dark:text-white tracking-tight mb-4"
              style={{ fontFamily: "var(--font-title)" }}
            >
              {BUQUE_ORIGIN.title}
            </h3>

            <p className="text-sm sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
              {BUQUE_ORIGIN.story}
            </p>

            <div className="mt-5 pt-4 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                {BUQUE_ORIGIN.highlight}
              </span>
              <span className="text-xs font-mono font-bold uppercase text-[#FF5A1F]">
                Drafteados &bull; 2017 &ndash; 2026
              </span>
            </div>
          </div>
        </div>

        {/* Los Capitanes del Buque */}
        <div className="mb-16 sm:mb-28">
          <div ref={foundersHeaderRef} className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#FF5A1F] block mb-2">
              LIDERAZGO &bull; FUNDADORES
            </span>
            <h3
              className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase text-zinc-900 dark:text-white tracking-tight"
              style={{ fontFamily: "var(--font-title)" }}
            >
              Los Capitanes del Buque
            </h3>
            <p className="mt-2 text-xs sm:text-base text-zinc-600 dark:text-zinc-400">
              José y Sergio crearon Drafteados en 2017. Dos visiones complementarias unidas por el juego.
            </p>
          </div>

          <div
            ref={foundersGridRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10"
          >
            {FOUNDERS.map((founder) => (
              <div
                key={founder.number}
                className="group relative rounded-3xl bg-white dark:bg-[#121215] border border-black/8 dark:border-white/10 overflow-hidden shadow-sm dark:shadow-none hover:border-[#FF5A1F]/40 transition-all duration-300 flex flex-col"
              >
                {/* Visual Media Header */}
                <div className="relative w-full h-72 sm:h-96 lg:h-[420px] bg-zinc-900 overflow-hidden shrink-0">
                  <Image
                    src={founder.avatar}
                    alt={founder.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-top filter grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Kicker badge */}
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] sm:text-xs font-mono font-bold text-white border border-white/20">
                      #{founder.number} &bull; {founder.tagline}
                    </span>
                  </div>

                  {/* Founder Name on Media Bottom */}
                  <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
                    <h4
                      className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-white"
                      style={{ fontFamily: "var(--font-title)" }}
                    >
                      {founder.name}
                    </h4>
                    <span className="text-xs sm:text-sm font-mono text-[#FF5A1F] font-bold">
                      {founder.role}
                    </span>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-5 sm:p-7 flex-1 flex flex-col justify-between">
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                    {founder.bio}
                  </p>

                  <div className="mt-4 pt-4 border-t border-black/5 dark:border-white/5">
                    <blockquote className="text-xs sm:text-sm italic text-zinc-800 dark:text-zinc-200 border-l-2 border-[#FF5A1F] pl-3 py-0.5">
                      &ldquo;{founder.quote}&rdquo;
                    </blockquote>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {founder.specialties.map((spec) => (
                        <span
                          key={spec}
                          className="px-2.5 py-1 rounded-md bg-black/[0.03] dark:bg-white/[0.04] text-[10px] sm:text-[11px] font-mono text-zinc-600 dark:text-zinc-400 border border-black/5 dark:border-white/5"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sala de Prensa & Coberturas Reales (Replaces Fake Testimonials) */}
        <div ref={pressRef} className="mb-16 sm:mb-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-10 gap-3">
            <div>
              <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#FF5A1F] block mb-1">
                SALA DE PRENSA &bull; HITOS
              </span>
              <h3
                className="text-2xl sm:text-4xl font-black uppercase text-zinc-900 dark:text-white tracking-tight"
                style={{ fontFamily: "var(--font-title)" }}
              >
                Coberturas &amp; Grandes Citas
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                Desde las Finales de la NBA en EE.UU. hasta el Teatro Rialto en plena Gran Vía de Madrid.
              </p>
            </div>

            <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500 self-start sm:self-end">
              Prensa Oficial Drafteados
            </span>
          </div>

          {/* Swipeable on Mobile, 3-Col Grid on Desktop */}
          <div className="flex overflow-x-auto scrollbar-none snap-x snap-mandatory gap-3 sm:gap-6 lg:gap-6 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 pb-3">
            {PRESS_MILESTONES.map((item) => (
              <div
                key={item.id}
                className="flex-shrink-0 w-[290px] sm:w-auto snap-start relative p-5 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#121215] border border-black/8 dark:border-white/10 shadow-sm dark:shadow-none flex flex-col justify-between hover:border-[#FF5A1F]/40 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2 py-0.5 rounded-md bg-[#FF5A1F]/10 text-[#FF5A1F] text-[10px] font-mono font-bold uppercase">
                      {item.category}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {item.date}
                    </span>
                  </div>

                  <h4 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white leading-snug">
                    {item.title}
                  </h4>

                  <p className="mt-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#FF5A1F]" />
                    {item.location}
                  </span>
                  <span className="text-[#FF5A1F] font-semibold text-[10px] uppercase">
                    {item.highlight}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Manifesto Block - Authentic Drafteados Mission */}
        <div
          ref={manifestoRef}
          className="relative rounded-3xl p-6 sm:p-10 lg:p-14 bg-white dark:bg-gradient-to-br dark:from-[#18181B] dark:to-[#121212] border border-black/8 dark:border-white/15 overflow-hidden shadow-sm dark:shadow-2xl"
        >
          <div
            aria-hidden="true"
            className="absolute -right-10 -bottom-10 w-96 h-96 bg-[#FF5A1F]/10 rounded-full blur-[100px] pointer-events-none"
          />

          <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
            <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-[#FF5A1F] mb-3 sm:mb-4 opacity-70" />

            <h3
              className="text-xl sm:text-3xl lg:text-4xl font-black uppercase text-zinc-900 dark:text-white leading-tight mb-3 sm:mb-5"
              style={{ fontFamily: "var(--font-title)" }}
            >
              Nuestra Misión
            </h3>

            <blockquote className="text-sm sm:text-lg lg:text-xl text-zinc-700 dark:text-zinc-300 font-normal leading-relaxed italic">
              &ldquo;Acercamos la cultura NBA a los aficionados hispanohablantes que quieren entenderla, compartirla y vivirla. Informamos, generamos contexto y conversación alrededor de la mejor liga de baloncesto del mundo.&rdquo;
            </blockquote>

            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center gap-3 sm:gap-6 w-full justify-center">
              <div className="flex items-center gap-2">
                <div className="relative w-7 h-7 rounded-full overflow-hidden border border-black/10 dark:border-white/20 shrink-0">
                  <Image
                    src="/images/logo.png"
                    alt="Drafteados"
                    fill
                    sizes="28px"
                    className="object-cover"
                  />
                </div>
                <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-widest text-zinc-700 dark:text-zinc-300">
                  Drafteados &bull; Tu Casa NBA
                </span>
              </div>

              <MagneticButton
                variant="primary"
                size="sm"
                href="https://www.youtube.com/@DrafteadosNBA"
                target="_blank"
                rel="noopener noreferrer"
              >
                <YoutubeIcon className="w-4 h-4 text-white" />
                <span>Suscribirse en YouTube</span>
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
