// filepath: src/components/sections/NbaHubTeaser.tsx
import React from "react";
import Link from "next/link";
import { 
  Flame, 
  Trophy, 
  Calendar, 
  BarChart3, 
  ArrowRight, 
  Activity, 
  ChevronRight,
  ShieldAlert
} from "lucide-react";

export function NbaHubTeaser() {
  const features = [
    {
      title: "Marcadores en Vivo",
      desc: "Scores en tiempo real, parciales cuarto a cuarto y reloj de posesión.",
      href: "/nba",
      tag: "EN DIRECTO",
      icon: Activity,
      accent: "from-orange-500/20 to-red-500/5",
      badgeColor: "bg-red-500/15 text-red-500 border-red-500/30",
    },
    {
      title: "Clasificación Este & Oeste",
      desc: "Posición al día, récord local/visitante, zona Playoff y Play-In sin filtros.",
      href: "/nba/clasificacion",
      tag: "STANDINGS",
      icon: Trophy,
      accent: "from-amber-500/20 to-orange-500/5",
      badgeColor: "bg-amber-500/15 text-amber-500 border-amber-500/30",
    },
    {
      title: "Calendario Interactivo",
      desc: "Filtra por franquicia y conferencia para no perderte las noches grandes.",
      href: "/nba/calendario",
      tag: "OFICIAL",
      icon: Calendar,
      accent: "from-blue-500/20 to-cyan-500/5",
      badgeColor: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    },
    {
      title: "Líderes Estadísticos",
      desc: "Top anotadores, pasadores, reboteadores y taponadores de la temporada.",
      href: "/nba/lideres",
      tag: "ESTADÍSTICAS",
      icon: BarChart3,
      accent: "from-emerald-500/20 to-teal-500/5",
      badgeColor: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30",
    },
  ];

  return (
    <section className="relative z-20 py-16 sm:py-24 bg-white dark:bg-[#070708] border-y border-black/5 dark:border-white/10 transition-colors duration-300 overflow-hidden">
      {/* Dynamic Background Accents */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 pointer-events-none select-none overflow-hidden"
      >
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#FF5A1F]/10 blur-[150px] rounded-full" />
        <div className="absolute inset-0 opacity-25 dark:opacity-15 [background-image:linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] dark:[background-image:linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:40px_40px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner Card Container */}
        <div className="relative rounded-3xl p-8 sm:p-12 lg:p-14 bg-zinc-50 dark:bg-[#0E0E10] border border-black/10 dark:border-white/10 shadow-[0_12px_45px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden">
          {/* Top Subtle Brand Watermark */}
          <div className="absolute top-0 right-0 p-8 sm:p-12 pointer-events-none select-none opacity-5 dark:opacity-[0.04] overflow-hidden">
            <span 
              className="text-8xl sm:text-9xl font-black uppercase text-black dark:text-white leading-none block"
              style={{ fontFamily: "var(--font-title)" }}
            >
              NBA
            </span>
          </div>

          {/* Header Row */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-black/10 dark:border-white/10">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2.5 text-xs font-mono font-bold tracking-widest text-[#FF5A1F] uppercase mb-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5A1F] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF5A1F]" />
                </span>
                <span>NUEVA SECCIÓN &bull; TEMPORADA 2026/27</span>
              </div>

              <h2
                className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-zinc-900 dark:text-white leading-[0.95]"
                style={{ fontFamily: "var(--font-title)" }}
              >
                NBA HUB &bull; <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5A1F] to-[#FF8A50]">LOS BUQUES</span>
              </h2>

              <p className="mt-4 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed">
                El centro de mando para seguir la NBA en directo. Resultados instantáneos, clasificaciones de ambas conferencias, calendario con tus franquicias favoritas y el pulso diario con la mirada de Drafteados.
              </p>
            </div>

            {/* Hub Quick CTAs */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="/nba"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#FF5A1F] hover:bg-[#FF7A45] text-white font-bold text-sm uppercase tracking-wider transition-all shadow-[0_4px_20px_rgba(255,90,31,0.35)] hover:shadow-[0_6px_28px_rgba(255,90,31,0.5)] active:scale-95"
                style={{ fontFamily: "var(--font-title)" }}
              >
                <span>Entrar al NBA Hub</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              
              <Link
                href="/pickem"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/15 text-zinc-800 dark:text-zinc-200 font-bold text-sm uppercase tracking-wider transition-all"
                style={{ fontFamily: "var(--font-title)" }}
              >
                <Trophy className="w-4 h-4 text-[#FF5A1F]" />
                <span>Jugar Pick'em</span>
              </Link>
            </div>
          </div>

          {/* 4 Feature Mini-Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 pt-8">
            {features.map((feat) => {
              const Icon = feat.icon;
              return (
                <Link
                  key={feat.title}
                  href={feat.href}
                  className="group relative rounded-2xl p-5 bg-white dark:bg-[#151518] border border-black/5 dark:border-white/10 hover:border-[#FF5A1F]/50 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 shadow-sm hover:shadow-lg"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${feat.accent} opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none`} />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="w-9 h-9 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-center justify-center text-zinc-700 dark:text-zinc-300 group-hover:text-[#FF5A1F] group-hover:border-[#FF5A1F]/30 transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className={`text-[10px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded-md border ${feat.badgeColor}`}>
                        {feat.tag}
                      </span>
                    </div>

                    <h3 
                      className="text-lg sm:text-xl font-black uppercase text-zinc-900 dark:text-white tracking-wide group-hover:text-[#FF5A1F] transition-colors"
                      style={{ fontFamily: "var(--font-title)" }}
                    >
                      {feat.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal">
                      {feat.desc}
                    </p>
                  </div>

                  <div className="relative z-10 mt-4 pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-xs font-mono font-bold text-zinc-600 dark:text-zinc-400 group-hover:text-[#FF5A1F] transition-colors">
                    <span>Ver sección</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
