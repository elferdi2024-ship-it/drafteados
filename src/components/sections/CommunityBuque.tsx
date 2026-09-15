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
            duration: 1.05,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: metricsRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
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
              start: "top 90%",
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
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: foundersGridRef.current,
              start: "top 90%",
              once: true,
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
            duration: 1.05,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: testimonialsRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
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
      id="comunidad"
      className="relative z-20 py-24 sm:py-36 bg-[#F4F4F6] dark:bg-[#0B0B0D] border-y border-black/5 dark:border-white/5 overflow-hidden transition-colors duration-300 content-auto"
    >
      {/* Dynamic Tactical Basketball Chalkboard Background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none overflow-hidden select-none"
      >
        {/* Coordinate blueprint grid */}
        <div className="absolute inset-0 opacity-40 dark:opacity-20 [background-image:linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:[background-image:linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,black_40%,transparent_100%)]" />

        {/* Tactical Dot Matrix */}
        <div className="absolute inset-0 opacity-35 dark:opacity-25 [background-image:radial-gradient(rgba(0,0,0,0.12)_1px,transparent_1px)] dark:[background-image:radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,black_30%,transparent_100%)]" />

        {/* Ambient Stadium Glows */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[600px] bg-[#FF5A1F]/10 blur-[180px] rounded-full" />
        <div className="absolute bottom-1/4 right-10 w-[450px] h-[450px] bg-amber-500/5 blur-[160px] rounded-full" />

        {/* Giant Watermark Typography */}
        <div className="absolute top-[28%] left-0 right-0 overflow-hidden opacity-[0.03] dark:opacity-[0.04] text-center">
          <span
            className="text-[140px] sm:text-[220px] font-black uppercase text-black dark:text-white whitespace-nowrap block"
            style={{ fontFamily: "var(--font-title)" }}
          >
            LA PIZARRA &bull; SOMOS BUQUES
          </span>
        </div>

        {/* Authentic SVG Basketball Court Tactical Blackboard */}
        <svg
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[900px] opacity-10 dark:opacity-15 text-zinc-900 dark:text-white pointer-events-none"
          viewBox="0 0 1200 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Half court boundary */}
          <rect x="100" y="50" width="1000" height="800" rx="16" stroke="currentColor" strokeWidth="2.5" />
          
          {/* Center jump circle & half-court division line */}
          <line x1="100" y1="450" x2="1100" y2="450" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" />
          <circle cx="600" cy="450" r="120" stroke="currentColor" strokeWidth="2" />
          <circle cx="600" cy="450" r="40" stroke="currentColor" strokeWidth="1.5" />

          {/* Three-Point Arc */}
          <path
            d="M 280 50 L 280 200 A 350 350 0 0 0 920 200 L 920 50"
            stroke="currentColor"
            strokeWidth="2.5"
          />

          {/* Key / Paint Lane */}
          <rect x="440" y="50" width="320" height="380" stroke="currentColor" strokeWidth="2" />
          {/* Free Throw Circle */}
          <circle cx="600" cy="430" r="110" stroke="currentColor" strokeWidth="2" />
          <circle cx="600" cy="430" r="110" stroke="currentColor" strokeWidth="2" strokeDasharray="8 8" />
          {/* Backboard & Hoop */}
          <line x1="530" y1="110" x2="670" y2="110" stroke="currentColor" strokeWidth="4" />
          <circle cx="600" cy="135" r="28" stroke="currentColor" strokeWidth="2.5" />

          {/* Key / Lane hash marks */}
          <line x1="420" y1="200" x2="440" y2="200" stroke="currentColor" strokeWidth="2" />
          <line x1="420" y1="260" x2="440" y2="260" stroke="currentColor" strokeWidth="2" />
          <line x1="420" y1="320" x2="440" y2="320" stroke="currentColor" strokeWidth="2" />
          <line x1="760" y1="200" x2="780" y2="200" stroke="currentColor" strokeWidth="2" />
          <line x1="760" y1="260" x2="780" y2="260" stroke="currentColor" strokeWidth="2" />
          <line x1="760" y1="320" x2="780" y2="320" stroke="currentColor" strokeWidth="2" />

          {/* Tactical Play Diagram (Pick & Roll + Backdoor Cut chalkboard markings) */}
          <defs>
            <marker id="chalk-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 8 5 L 0 9 z" fill="currentColor" />
            </marker>
          </defs>
          <path
            d="M 360 280 Q 420 180 540 180"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeDasharray="6 5"
            markerEnd="url(#chalk-arrow)"
          />
          <line x1="510" y1="240" x2="550" y2="240" stroke="currentColor" strokeWidth="3" />
          <line x1="530" y1="240" x2="530" y2="270" stroke="currentColor" strokeWidth="2" />
          <path
            d="M 680 320 Q 640 220 620 170"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeDasharray="6 5"
            markerEnd="url(#chalk-arrow)"
          />
          <circle cx="350" cy="290" r="16" stroke="currentColor" strokeWidth="2" />
          <text x="350" y="295" textAnchor="middle" fill="currentColor" fontSize="13" fontFamily="monospace" fontWeight="bold">1</text>
          <circle cx="690" cy="330" r="16" stroke="currentColor" strokeWidth="2" />
          <text x="690" y="335" textAnchor="middle" fill="currentColor" fontSize="13" fontFamily="monospace" fontWeight="bold">2</text>
          <circle cx="530" cy="285" r="16" stroke="currentColor" strokeWidth="2" />
          <text x="530" y="290" textAnchor="middle" fill="currentColor" fontSize="13" fontFamily="monospace" fontWeight="bold">5</text>
        </svg>
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
              className="relative p-8 sm:p-10 rounded-3xl bg-white/90 dark:bg-[#121214]/90 backdrop-blur-sm border border-black/10 dark:border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.04)] dark:shadow-none flex flex-col items-center text-center group hover:border-[#FF5A1F]/50 transition-all duration-300 hover:-translate-y-1"
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
        <div className="mb-24 sm:mb-36">
          <div ref={foundersHeaderRef} className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
            <div className="flex items-center justify-center gap-2.5 text-xs font-mono font-bold tracking-[0.25em] text-[#FF5A1F] uppercase mb-3">
              <span className="w-2 h-0.5 bg-[#FF5A1F]" />
              <span>LOS CAPITANES DEL BUQUE</span>
              <span className="w-2 h-0.5 bg-[#FF5A1F]" />
            </div>
            <h3
              className="text-4xl sm:text-6xl font-black uppercase text-zinc-900 dark:text-white tracking-tight"
              style={{ fontFamily: "var(--font-title)" }}
            >
              La Voz y La Pizarra
            </h3>
            <p className="mt-3 text-base sm:text-xl text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed">
              Dos amigos que unieron el rigor analítico de la madrugada y la emoción compartida para construir la mayor casa de baloncesto en español.
            </p>
          </div>

          <div ref={foundersGridRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            {FOUNDERS.map((founder) => (
              <div
                key={founder.name}
                className="group relative rounded-3xl p-6 sm:p-8 lg:p-9 bg-white/90 dark:bg-[#121215]/90 backdrop-blur-md border border-black/10 dark:border-white/10 hover:border-[#FF5A1F]/60 transition-all duration-500 shadow-[0_10px_35px_rgba(0,0,0,0.05)] dark:shadow-2xl hover:shadow-[0_25px_60px_rgba(255,90,31,0.18)] hover:-translate-y-1.5 flex flex-col justify-between"
              >
                {/* Ambient Card Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF5A1F]/5 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl" />

                <div className="relative z-10">
                  {/* High-Impact Portrait Showcase */}
                  <div className="relative w-full h-80 sm:h-[420px] rounded-2xl overflow-hidden mb-7 bg-zinc-950 border border-black/5 dark:border-white/10 shadow-lg">
                    <Image
                      src={founder.avatar}
                      alt={founder.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover object-top sm:object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Dark gradient vignette for seamless integration */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent pointer-events-none" />

                    {/* Top Broadcast Graphic Overlays */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 pointer-events-none">
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/75 backdrop-blur-md border border-white/15 text-[11px] font-mono font-bold tracking-wider text-white uppercase shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F] animate-pulse" />
                        <span>{founder.tagline}</span>
                      </div>
                      <div className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-mono font-medium text-zinc-300">
                        <span>{founder.handle}</span>
                      </div>
                    </div>

                    {/* Bottom Cinematic Title Overlay */}
                    <div className="absolute bottom-5 left-5 right-5 pointer-events-none">
                      <div className="flex items-end justify-between gap-4">
                        <div>
                          <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#FF5A1F] block mb-1">
                            {founder.role}
                          </span>
                          <h4
                            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight leading-none"
                            style={{ fontFamily: "var(--font-title)" }}
                          >
                            {founder.name}
                          </h4>
                        </div>
                        <span
                          className="text-5xl sm:text-6xl font-black text-white/15 select-none leading-none shrink-0"
                          style={{ fontFamily: "var(--font-title)" }}
                        >
                          {founder.number}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Tactical Specialty Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {founder.specialties.map((spec) => (
                      <span
                        key={spec}
                        className="px-2.5 py-1 rounded-md bg-black/[0.04] dark:bg-white/[0.05] border border-black/8 dark:border-white/10 text-[11px] font-mono font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  {/* Biography Story */}
                  <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
                    {founder.bio}
                  </p>
                </div>

                {/* Highlight Signature Quote Card */}
                <div className="relative z-10 mt-6 pt-4 border-t border-black/5 dark:border-white/8">
                  <div className="border-l-2 border-[#FF5A1F] pl-4 py-1.5 bg-[#FF5A1F]/5 dark:bg-[#FF5A1F]/10 rounded-r-xl">
                    <p className="text-xs sm:text-sm italic font-medium text-zinc-800 dark:text-zinc-200 leading-relaxed">
                      &ldquo;{founder.quote}&rdquo;
                    </p>
                  </div>
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
                className="relative p-7 rounded-3xl bg-white dark:bg-[#121215] border border-black/10 dark:border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.04)] dark:shadow-none flex flex-col justify-between hover:border-[#FF5A1F]/40 transition-all duration-300 hover:-translate-y-1"
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
