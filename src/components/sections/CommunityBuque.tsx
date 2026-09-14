"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { COMMUNITY_METRICS, FOUNDERS } from "@/data/drafteados";
import { Flame, Globe2, HeartHandshake, ShieldCheck, Quote } from "lucide-react";

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
  return (
    <section
      id="comunidad"
      className="relative z-20 py-24 sm:py-36 bg-[#F4F4F6] dark:bg-[#0B0B0C] border-y border-black/5 dark:border-white/5 overflow-hidden transition-colors duration-300"
    >
      {/* Subtle Basketball Court Key Lines Background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-5 dark:opacity-5 flex items-center justify-center"
      >
        <div className="w-[600px] h-[600px] rounded-full border-[12px] border-black dark:border-white" />
        <div className="absolute w-[850px] h-[2px] bg-black dark:bg-white" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF5A1F]/10 border border-[#FF5A1F]/20 text-[#FF5A1F] text-xs font-semibold uppercase tracking-widest mb-4">
            <Flame className="w-3.5 h-3.5 text-[#FF5A1F]" />
            SENTIMIENTO Y PERTENENCIA
          </div>
          <h2
            className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase text-zinc-900 dark:text-white tracking-tight"
            style={{ fontFamily: "var(--font-title)" }}
          >
            Somos Buques
          </h2>
          <p className="mt-4 text-xl sm:text-2xl text-zinc-600 dark:text-zinc-300 font-medium">
            Más que una audiencia. Una forma de entender el baloncesto.
          </p>
        </div>

        {/* Animated Metrics Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-20 sm:mb-24">
          {COMMUNITY_METRICS.map((metric) => (
            <div
              key={metric.id}
              className="relative p-8 rounded-3xl bg-white dark:bg-[#121212] border border-black/8 dark:border-white/10 shadow-sm dark:shadow-none flex flex-col items-center text-center group hover:border-[#FF5A1F]/40 transition-all hover:-translate-y-1"
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

              <p className="mt-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-xs leading-relaxed">
                {metric.description}
              </p>
            </div>
          ))}
        </div>

        {/* Founders Spotlight (José & Sergio) */}
        <div className="mb-20 sm:mb-28">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#FF5A1F]">
              La Voz y la Pasión
            </span>
            <h3
              className="text-3xl sm:text-5xl font-black uppercase text-zinc-900 dark:text-white tracking-tight mt-1"
              style={{ fontFamily: "var(--font-title)" }}
            >
              Los Capitanes del Buque
            </h3>
            <p className="mt-2 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
              Dos amigos que unieron su amor por la NBA para construir la comunidad de baloncesto en español más activa del planeta.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {FOUNDERS.map((founder) => (
              <div
                key={founder.name}
                className="group relative rounded-3xl p-8 sm:p-10 bg-white dark:bg-[#131315] border border-black/8 dark:border-white/10 hover:border-[#FF5A1F]/40 transition-all duration-300 shadow-md dark:shadow-2xl flex flex-col justify-between"
              >
                <div className="flex items-start gap-5">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 border-2 border-[#FF5A1F]/30 shadow-lg bg-zinc-900">
                    <Image
                      src={founder.avatar}
                      alt={founder.name}
                      fill
                      sizes="96px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div>
                    <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#FF5A1F] bg-[#FF5A1F]/10 px-2.5 py-1 rounded-full mb-1">
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
                  <Quote className="w-5 h-5 text-[#FF5A1F] shrink-0 mt-0.5 opacity-80" />
                  <p className="text-xs sm:text-sm italic text-zinc-500 dark:text-zinc-400">
                    &ldquo;{founder.quote}&rdquo;
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Manifesto Block */}
        <div className="relative rounded-3xl p-8 sm:p-14 lg:p-16 bg-white dark:bg-gradient-to-br dark:from-[#18181B] dark:to-[#121212] border border-black/10 dark:border-white/15 overflow-hidden shadow-xl dark:shadow-2xl">
          <div
            aria-hidden="true"
            className="absolute -right-10 -bottom-10 w-96 h-96 bg-[#FF5A1F]/10 rounded-full blur-[100px] pointer-events-none"
          />

          <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-[#FF5A1F]/15 border border-[#FF5A1F]/30 flex items-center justify-center text-[#FF5A1F] mb-6">
              <Quote className="w-6 h-6" />
            </div>

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

            <div className="mt-8 flex items-center gap-3">
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-black/10 dark:border-white/20">
                <Image
                  src="/images/logo.png"
                  alt="Drafteados"
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              </div>
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-zinc-700 dark:text-zinc-300">
                Familia Drafteados &bull; Desde 2017
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
