// filepath: src/components/pickem/PickemHero.tsx
"use client";

import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { ArrowRight, Trophy, Flame, Target, Sparkles } from 'lucide-react';

export function PickemHero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="relative px-4 pt-24 pb-28 md:pt-36 md:pb-44 overflow-hidden flex flex-col items-center justify-center text-center bg-parquet-floor border-b border-white/[0.08]">
      {/* Cinematic Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#FF5A1F]/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-[350px] h-[350px] bg-amber-500/10 rounded-full blur-[130px] pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto space-y-7"
      >
        {/* Top Kicker Badge */}
        <motion.div variants={itemVariants} className="inline-flex items-center">
          <div className="inline-flex items-center gap-2.5 bg-[#141414]/90 border border-white/15 px-4 py-1.5 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.6)] backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#FF5A1F] animate-ping" />
            <span className="font-title text-xs tracking-widest text-[#F5F5F5] uppercase">
              TEMPORADA NBA 2026/27 • PRONÓSTICO OFICIAL DE LOS BUQUES
            </span>
          </div>
        </motion.div>

        {/* Master Headline with Aggressive Typography */}
        <motion.h1 
          variants={itemVariants} 
          className="font-title text-7xl sm:text-8xl md:text-9xl lg:text-[10.5rem] leading-[0.84] tracking-tighter uppercase font-black"
        >
          ¿QUIÉN SABE MÁS<br />
          <span className="text-gradient-orange drop-shadow-[0_0_45px_rgba(255,90,31,0.45)]">
            DE LA NBA?
          </span>
        </motion.h1>

        {/* Subtitle with Attitude */}
        <motion.p 
          variants={itemVariants} 
          className="text-base sm:text-xl md:text-2xl text-[#A1A1AA] max-w-3xl mx-auto font-medium leading-relaxed"
        >
          La porra definitiva de <span className="text-[#F5F5F5] font-bold">Los Buques</span>. Hacé tus 13 predicciones, bancátela contra toda la comunidad y demostrá antes del tip-off quién tiene el verdadero anillo.
        </motion.p>

        {/* Master CTAs */}
        <motion.div 
          variants={itemVariants} 
          className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link 
            href="/pickem/picks" 
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#FF5A1F] hover:bg-[#FF6B35] text-white font-title text-2xl sm:text-3xl tracking-wider px-10 py-5 rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_45px_-5px_rgba(255,90,31,0.6)] group border border-[#FF7A35]"
          >
            <span>HACÉ TUS PICKS</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform" />
          </Link>

          <Link
            href="/pickem/leaderboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#161616] hover:bg-[#202020] border border-white/15 text-[#F5F5F5] font-title text-xl sm:text-2xl tracking-wider px-8 py-5 rounded-2xl transition-all hover:scale-102 shadow-lg"
          >
            <Trophy className="w-5 h-5 text-[#FF5A1F]" />
            <span>VER RANKING GLOBAL</span>
          </Link>
        </motion.div>

        {/* Engraved Sports Badges Bar */}
        <motion.div 
          variants={itemVariants} 
          className="pt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          <div className="bg-[#141414]/90 border border-white/10 px-4 py-2.5 rounded-xl flex items-center gap-2.5 shadow-md">
            <Target className="w-4 h-4 text-[#3B82F6]" />
            <div className="text-left leading-none">
              <span className="text-[#F5F5F5] font-title text-base font-black">13</span>{' '}
              <span className="text-[10px] text-[#A1A1AA] uppercase font-bold tracking-wider">PREDICCIONES</span>
            </div>
          </div>

          <div className="bg-[#141414]/90 border border-[#FF5A1F]/30 px-4 py-2.5 rounded-xl flex items-center gap-2.5 shadow-[0_0_20px_rgba(255,90,31,0.15)]">
            <Flame className="w-4 h-4 text-[#FF5A1F]" />
            <div className="text-left leading-none">
              <span className="text-[#FF5A1F] font-title text-base font-black">320</span>{' '}
              <span className="text-[10px] text-[#A1A1AA] uppercase font-bold tracking-wider">PUNTOS MÁXIMOS</span>
            </div>
          </div>

          <div className="bg-[#141414]/90 border border-emerald-500/30 px-4 py-2.5 rounded-xl flex items-center gap-2.5 shadow-md">
            <Sparkles className="w-4 h-4 text-[#10B981]" />
            <div className="text-left leading-none">
              <span className="text-[#10B981] font-title text-base font-black">100%</span>{' '}
              <span className="text-[10px] text-[#A1A1AA] uppercase font-bold tracking-wider">GRATIS</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
