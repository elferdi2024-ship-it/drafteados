// filepath: src/components/sections/CommunityBuque.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useInView } from "framer-motion";
import { COMMUNITY_METRICS, FOUNDERS, COMMUNITY_TESTIMONIALS } from "@/data/drafteados";
import { Quote, ArrowUpRight } from "lucide-react";
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
  const foundersHeaderRef = useRef<HTMLDivElement>(null);
  const foundersGridRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
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
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
            },
          }
        );
      }

      // Metrics cards
      const metrics = metricsRef.current?.children;
      if (metrics && metrics.length > 0) {
        gsap.fromTo(
          metrics,
          { opacity: 0, y: 40, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: metricsRef.current,
              start: "top 82%",
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
              start: "top 85%",
            },
          }
        );
      }

      // Founders cards
      const founders = foundersGridRef.current?.children;
      if (founders && founders.length > 0) {
        gsap.fromTo(
          founders,
          { opacity: 0, y: 40, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: foundersGridRef.current,
              start: "top 82%",
            },
          }
        );
      }

      // Testimonials cards
      const testimonials = testimonialsRef.current?.children;
      if (testimonials && testimonials.length > 0) {
        gsap.fromTo(
          testimonials,
          { opacity: 0, y: 40, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: testimonialsRef.current,
              start: "top 85%",
            },
          }
        );
      }

      // Manifesto block
      if (manifestoRef.current) {
        gsap.fromTo(
          manifestoRef.current,
          { opacity: 0, y: 45, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: manifestoRef.current,
              start: "top 85%",
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
      className="relative z-20 py-24 sm:py-36 bg-[#F4F4F6] dark:bg-[#0B0B0D] border-y border-black/5 dark:border-white/5 overflow-hidden transition-colors duration-300"
    >
      {/* Subtle Court Lines Background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-5 dark:opacity-5 flex items-center justify-center"
      >
        <div className="w-[600px] h-[600px] rounded-full border-[12px] border-black dark:border-white" />
        <div className="absolute w-[850px] h-[2px] bg-black dark:bg-white" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header - Editorial, Anti-Slop */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="flex items-center justify-center gap-2.5 text-xs font-mono font-bold tracking-[0.25em] text-[#FF5A1F] uppercase mb-4">
            <span className="w-2 h-0.5 bg-[#FF5A1F]" />
            <span>03 &bull; SENTIMIENTO Y PERTENENCIA</span>
            <span className="w-2 h-0.5 bg-[#FF5A1F]" />
          </div>

          <h2
            className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase text-zinc-900 dark:text-white tracking-tight"
            style={{ fontFamily: "var(--font-title)" }}
          >
            Somos Buques
          </h2>
          <p className="mt-4 text-xl sm:text-2xl text-zinc-600 dark:text-zinc-300 font-medium leading-relaxed">
            No somos espectadores pasivos de highlights de 30 segundos. Somos una familia que se reconoce en cualquier cancha del mundo.
          </p>
        </div>

        {/* Animated Metrics Strip */}
        <div ref={metricsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-20 sm:mb-28">
          {COMMUNITY_METRICS.map((metric) => (
            <div
              key={metric.id}
              className="relative p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#121214] border border-black/8 dark:border-white/10 shadow-sm dark:shadow-none flex flex-col items-center text-center group hover:border-[#FF5A1F]/40 transition-all duration-300 hover:-translate-y-1"
            >
              <div
                className="text-5xl sm:text-6xl lg:text-7xl font-black text-zinc-900 dark:text-white group-hover:text-[#FF5A1F] transition-colors"
                style={{ fontFamily: "var(--font-title)" }}
              >
                +<AnimatedCounter target={metric.value} suffix={metric.suffix} />
              </div>

              <div className="mt-3 text-base sm:text-lg font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">
                {metric.label}
              </div>

              <p className="mt-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-xs leading-relaxed font-normal">
                {metric.description}
              </p>
            </div>
          ))}
        </div>

        {/* Founders Spotlight (José & Sergio) */}
        <div className="mb-20 sm:mb-28">
          <div ref={foundersHeaderRef} className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#FF5A1F] block mb-2">
              LA VOZ Y LA PASIÓN
            </span>
            <h3
              className="text-3xl sm:text-5xl font-black uppercase text-zinc-900 dark:text-white tracking-tight"
              style={{ fontFamily: "var(--font-title)" }}
            >
              Los Capitanes del Buque
            </h3>
            <p className="mt-2 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
              Dos amigos que unieron su amor por la NBA para construir la mayor comunidad de baloncesto en español del planeta.
            </p>
          </div>

          <div ref={foundersGridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {FOUNDERS.map((founder) => (
              <div
                key={founder.name}
                className="group relative rounded-3xl p-8 sm:p-10 bg-white dark:bg-[#131315] border border-black/8 dark:border-white/10 hover:border-[#FF5A1F]/40 transition-all duration-300 shadow-sm dark:shadow-xl flex flex-col justify-between"
              >
                <div className="flex items-start gap-5">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 border border-black/10 dark:border-white/10 shadow-md bg-zinc-900">
                    <Image
                      src={founder.avatar}
                      alt={founder.name}
                      fill
                      sizes="96px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF5A1F] block mb-0.5">
                      {founder.role}
                    </span>
                    <h4
                      className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white uppercase tracking-tight"
                      style={{ fontFamily: "var(--font-title)" }}
                    >
                      {founder.name}
                    </h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono mt-0.5">
                      {founder.handle}
                    </p>
                  </div>
                </div>

                <p className="mt-6 text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
                  {founder.bio}
                </p>

                <div className="mt-6 pt-5 border-t border-black/5 dark:border-white/5 flex items-start gap-3">
                  <Quote className="w-4 h-4 text-[#FF5A1F] shrink-0 mt-0.5 opacity-80" />
                  <p className="text-xs sm:text-sm italic text-zinc-500 dark:text-zinc-400">
                    &ldquo;{founder.quote}&rdquo;
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community Voices / Testimonials */}
        <div className="mb-20 sm:mb-28">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#FF5A1F] block mb-2">
              HISTORIAS REALES
            </span>
            <h3
              className="text-3xl sm:text-4xl font-black uppercase text-zinc-900 dark:text-white tracking-tight"
              style={{ fontFamily: "var(--font-title)" }}
            >
              Lo que se vive en el Buque
            </h3>
            <p className="mt-2 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
              Testimonios de miembros que comparten esta pasión alrededor del mundo.
            </p>
          </div>

          <div ref={testimonialsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {COMMUNITY_TESTIMONIALS.map((test) => (
              <div
                key={test.id}
                className="relative p-7 rounded-3xl bg-white dark:bg-[#121215] border border-black/8 dark:border-white/10 shadow-sm dark:shadow-none flex flex-col justify-between hover:border-[#FF5A1F]/30 transition-all duration-300 hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold uppercase text-[#FF5A1F]">
                      {test.roleBadge}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500">
                      {test.timeWithUs}
                    </span>
                  </div>

                  <p className="text-sm text-zinc-700 dark:text-zinc-300 italic leading-relaxed">
                    &ldquo;{test.quote}&rdquo;
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
                  <h5 className="text-sm font-bold text-zinc-900 dark:text-white">
                    {test.author}
                  </h5>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">
                    {test.location}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Manifesto Block */}
        <div
          ref={manifestoRef}
          className="relative rounded-3xl p-8 sm:p-14 lg:p-16 bg-white dark:bg-gradient-to-br dark:from-[#18181B] dark:to-[#121212] border border-black/10 dark:border-white/15 overflow-hidden shadow-xl dark:shadow-2xl"
        >
          <div
            aria-hidden="true"
            className="absolute -right-10 -bottom-10 w-96 h-96 bg-[#FF5A1F]/10 rounded-full blur-[100px] pointer-events-none"
          />

          <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
            <Quote className="w-8 h-8 text-[#FF5A1F] mb-6 opacity-70" />

            <h3
              className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase text-zinc-900 dark:text-white leading-tight mb-6"
              style={{ fontFamily: "var(--font-title)" }}
            >
              El Manifiesto de la Madrugada
            </h3>

            <blockquote className="text-base sm:text-xl lg:text-2xl text-zinc-700 dark:text-zinc-300 font-normal leading-relaxed italic">
              &ldquo;No somos espectadores de highlights de 30 segundos. Somos los
              que nos quedamos despiertos hasta las 4:30 de la madrugada analizando un
              tercer cuarto entre Portland y Utah, los que debatimos la defensa de
              bloqueos con datos y respeto, y los que encontramos en el baloncesto
              una casa compartida.&rdquo;
            </blockquote>

            <div className="mt-8 flex flex-col sm:flex-row items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-black/10 dark:border-white/20">
                  <Image
                    src="/images/logo.png"
                    alt="Drafteados"
                    fill
                    sizes="32px"
                    className="object-cover"
                  />
                </div>
                <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-zinc-700 dark:text-zinc-300">
                  Familia Drafteados &bull; Desde 2017
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
                <span>Unirme al Buque</span>
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
