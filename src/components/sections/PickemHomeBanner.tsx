"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Trophy, Flame, Shield, ArrowRight, Sparkles, CheckCircle2, ChevronRight } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";

const PREVIEW_CARDS = [
  {
    name: "Luka Dončić",
    team: "Dallas Mavericks",
    category: "GALARDONES",
    predName: "MVP de la Temporada",
    points: 100,
    img: "https://cdn.nba.com/headshots/nba/latest/1040x760/1629029.png",
    color: "#00538C",
    isUnderdog: false,
  },
  {
    name: "Victor Wembanyama",
    team: "San Antonio Spurs",
    category: "LÍDERES",
    predName: "Máximo Taponador",
    points: 60,
    img: "https://cdn.nba.com/headshots/nba/latest/1040x760/1641705.png",
    color: "#C4CED4",
    isUnderdog: false,
  },
  {
    name: "Shai Gilgeous-Alexander",
    team: "Oklahoma City Thunder",
    category: "LÍDERES",
    predName: "Máximo Anotador",
    points: 60,
    img: "https://cdn.nba.com/headshots/nba/latest/1040x760/1628983.png",
    color: "#007AC1",
    isUnderdog: true,
  },
];

export function PickemHomeBanner() {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden bg-gradient-to-b from-background via-black/5 dark:via-white/[0.02] to-background border-y border-black/10 dark:border-white/10">
      {/* Background glow atmospheric blurs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#FF5A1F]/15 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-[#FF5A1F]/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-3xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-[#121212]/80 backdrop-blur-2xl p-6 sm:p-10 lg:p-14 overflow-hidden shadow-2xl">
          {/* Subtle Court Line Pattern */}
          <div className="absolute -right-20 -bottom-20 w-96 h-96 border-[40px] border-[#FF5A1F]/5 rounded-full pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left: Headline & Copy */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF5A1F]/10 border border-[#FF5A1F]/30 text-[#FF5A1F] font-mono text-xs font-bold uppercase tracking-wider mb-5">
                <Flame className="w-3.5 h-3.5 animate-pulse" />
                <span>NUEVA EXPERIENCIA OFICIAL &bull; TEMPORADA 2026/27</span>
              </div>

              {/* Title */}
              <h2
                className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-zinc-900 dark:text-white leading-[0.92] mb-5"
                style={{ fontFamily: "var(--font-title)" }}
              >
                DRAFTEADOS <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5A1F] via-[#FF7A45] to-[#FF5A1F]">
                  PICK'EM NBA
                </span>
              </h2>

              {/* Description */}
              <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 font-normal leading-relaxed max-w-xl mb-8">
                El juego definitivo de predicciones para la comunidad del Buque. Pronostica los 13 galardones oficiales de la NBA, colecciona los cromos oficiales de tus estrellas y compite por la cima del ranking global.
              </p>

              {/* Value Props Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full mb-8">
                <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
                  <div className="w-8 h-8 rounded-xl bg-[#FF5A1F]/15 flex items-center justify-center text-[#FF5A1F] flex-shrink-0">
                    <Trophy className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-zinc-900 dark:text-white block">13 GALARDONES</span>
                    <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-sans">De MVP al Anillo</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
                  <div className="w-8 h-8 rounded-xl bg-[#FF5A1F]/15 flex items-center justify-center text-[#FF5A1F] flex-shrink-0">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-zinc-900 dark:text-white block">CROMOS HD</span>
                    <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-sans">CDN Oficial NBA</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
                  <div className="w-8 h-8 rounded-xl bg-[#FF5A1F]/15 flex items-center justify-center text-[#FF5A1F] flex-shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-zinc-900 dark:text-white block">UNDERDOG 1.5X</span>
                    <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-sans">Multiplicador clave</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <MagneticButton
                  variant="primary"
                  size="lg"
                  href="/pickem"
                  className="w-full sm:w-auto shadow-[0_4px_30px_rgba(255,90,31,0.45)] border border-white/20 gap-2 text-base font-bold"
                >
                  <Trophy className="w-5 h-5 text-white" />
                  <span>Hacer mis Predicciones</span>
                </MagneticButton>

                <Link
                  href="/pickem/leaderboard"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-black/10 dark:border-white/15 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-zinc-900 dark:text-white font-semibold text-sm transition-all text-center flex items-center justify-center gap-2 group"
                >
                  <span>Ver Clasificación</span>
                  <ArrowRight className="w-4 h-4 text-[#FF5A1F] group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right: Authentic Trading Cards Teaser */}
            <div className="lg:col-span-5 relative flex items-center justify-center py-4 sm:py-8">
              <div className="relative w-full max-w-sm h-[380px] sm:h-[420px] flex items-center justify-center">
                {PREVIEW_CARDS.map((card, idx) => {
                  const offsets = [
                    "-rotate-12 -translate-x-16 sm:-translate-x-20 scale-90 z-10 opacity-70",
                    "rotate-12 translate-x-16 sm:translate-x-20 scale-90 z-10 opacity-70",
                    "rotate-0 translate-x-0 scale-100 z-20 shadow-2xl shadow-black/80",
                  ];
                  const style = offsets[idx];

                  return (
                    <div
                      key={card.name}
                      className={`absolute w-[220px] sm:w-[240px] aspect-[2/3] rounded-2xl border-2 border-white/20 bg-gradient-to-b from-[#1E1E1E] via-[#121212] to-[#0A0A0A] p-3 text-white transition-all duration-500 hover:scale-105 hover:z-30 hover:opacity-100 hover:rotate-0 cursor-pointer overflow-hidden ${style}`}
                    >
                      {/* Card Header */}
                      <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-2">
                        <span className="font-mono text-[9px] uppercase tracking-wider text-[#FF5A1F] font-bold">
                          {card.category}
                        </span>
                        <span className="font-mono text-[10px] font-bold text-white bg-[#FF5A1F]/20 px-1.5 py-0.5 rounded">
                          +{card.points} PTS
                        </span>
                      </div>

                      {/* Card Image */}
                      <div className="relative h-[200px] sm:h-[220px] w-full flex items-center justify-center overflow-hidden">
                        <div
                          className="absolute inset-0 opacity-20 blur-xl rounded-full"
                          style={{ backgroundColor: card.color }}
                        />
                        <Image
                          src={card.img}
                          alt={card.name}
                          width={240}
                          height={190}
                          unoptimized
                          className="relative z-10 object-contain max-h-[190px] drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)]"
                        />
                      </div>

                      {/* Card Footer Plaque */}
                      <div className="mt-2 border-t border-white/10 pt-2 text-left">
                        <span className="font-mono text-[9px] text-zinc-400 block uppercase">
                          {card.predName}
                        </span>
                        <h4
                          className="font-black text-xl tracking-tight text-white uppercase truncate leading-tight"
                          style={{ fontFamily: "var(--font-title)" }}
                        >
                          {card.name.split(" ").slice(-1)[0]}
                        </h4>
                        <span className="text-[10px] text-zinc-400 font-sans block truncate">
                          {card.team}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
