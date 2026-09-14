"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { COMMUNITY_METRICS } from "@/data/drafteados";
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
      className="relative z-20 py-24 sm:py-36 bg-[#0B0B0C] border-y border-white/5 overflow-hidden"
    >
      {/* Subtle Basketball Court Key Lines Background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-5 flex items-center justify-center"
      >
        <div className="w-[600px] h-[600px] rounded-full border-[12px] border-white" />
        <div className="absolute w-[850px] h-[2px] bg-white" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-xs font-semibold uppercase tracking-widest mb-4">
            <Flame className="w-3.5 h-3.5 text-[#FF5A1F]" />
            SENTIMIENTO Y PERTENENCIA
          </div>
          <h2
            className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase text-white tracking-tight"
            style={{ fontFamily: "var(--font-title)" }}
          >
            Somos Buques
          </h2>
          <p className="mt-4 text-xl sm:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 via-white to-zinc-400 font-medium">
            Más que una audiencia. Una forma de entender el baloncesto.
          </p>
        </div>

        {/* Animated Metrics Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 mb-20 sm:mb-28">
          {COMMUNITY_METRICS.map((metric) => (
            <div
              key={metric.id}
              className="relative p-8 rounded-3xl bg-[#121212] border border-white/10 flex flex-col items-center text-center group hover:border-[#FF5A1F]/40 transition-colors"
            >
              <div
                className="text-5xl sm:text-6xl lg:text-7xl font-black text-white group-hover:text-[#FF5A1F] transition-colors"
                style={{ fontFamily: "var(--font-title)" }}
              >
                +<AnimatedCounter target={metric.value} suffix={metric.suffix} />
              </div>

              <div className="mt-3 text-base sm:text-lg font-bold text-zinc-200 uppercase tracking-wider">
                {metric.label}
              </div>

              <p className="mt-2 text-xs sm:text-sm text-zinc-400 max-w-xs leading-relaxed">
                {metric.description}
              </p>
            </div>
          ))}
        </div>

        {/* Manifesto Block */}
        <div className="relative rounded-3xl p-8 sm:p-14 lg:p-16 bg-gradient-to-br from-[#18181B] to-[#121212] border border-white/15 overflow-hidden shadow-2xl">
          <div
            aria-hidden="true"
            className="absolute -right-10 -bottom-10 w-96 h-96 bg-[#FF5A1F]/10 rounded-full blur-[100px] pointer-events-none"
          />

          <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-[#FF5A1F]/15 border border-[#FF5A1F]/30 flex items-center justify-center text-[#FF5A1F] mb-6">
              <Quote className="w-6 h-6" />
            </div>

            <h3
              className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase text-white leading-tight mb-6"
              style={{ fontFamily: "var(--font-title)" }}
            >
              El Manifiesto de la Madrugada
            </h3>

            <blockquote className="text-base sm:text-xl lg:text-2xl text-zinc-300 font-normal leading-relaxed italic">
              &ldquo;No somos espectadores de highlights de 30 segundos. Somos los
              que nos quedamos despiertos hasta las 4:30 de la madrugada analizando un
              tercer cuarto entre Portland y Utah, los que debatimos la defensa de
              bloqueos con datos y respeto, y los que encontramos en el baloncesto
              una casa compartida.&rdquo;
            </blockquote>

            <div className="mt-8 flex items-center gap-3">
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/20">
                <Image
                  src="/images/logo.png"
                  alt="Drafteados"
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              </div>
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-zinc-300">
                Familia Drafteados &bull; Desde 2017
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
