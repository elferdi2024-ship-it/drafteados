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
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="relative px-4 pt-24 pb-20 md:pt-36 md:pb-36 overflow-hidden flex flex-col items-center justify-center text-center bg-background border-b border-black/10 dark:border-white/10 transition-colors">
      {/* Background Architectural Grid & Subtle Stadium Glow */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute inset-0 opacity-40 dark:opacity-15 [background-image:linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)] dark:[background-image:linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[380px] bg-[#FF5A1F]/10 blur-[160px] rounded-full" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto space-y-6"
      >
        {/* Eyebrow: Pure Editorial Typography (No pills, no ping dots) */}
        <motion.div variants={itemVariants} className="flex items-center justify-center gap-2.5 text-xs font-mono font-bold tracking-[0.25em] text-[#FF5A1F] uppercase">
          <span className="w-2 h-0.5 bg-[#FF5A1F]" />
          <span>TEMPORADA NBA 2026/27 &bull; PRONÓSTICO OFICIAL DE LOS BUQUES</span>
          <span className="w-2 h-0.5 bg-[#FF5A1F]" />
        </motion.div>

        {/* Master Headline: Bebas Neue, Ultra High-Contrast */}
        <motion.h1 
          variants={itemVariants} 
          className="text-7xl sm:text-8xl md:text-9xl lg:text-[10.5rem] leading-[0.84] tracking-tighter uppercase font-black text-zinc-950 dark:text-white"
          style={{ fontFamily: 'var(--font-title)' }}
        >
          ¿QUIÉN SABE MÁS<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5A1F] to-[#FF8A50]">
            DE LA NBA?
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          variants={itemVariants} 
          className="text-base sm:text-xl md:text-2xl text-zinc-600 dark:text-zinc-300 max-w-3xl mx-auto font-normal leading-relaxed"
        >
          La porra definitiva de <strong className="text-zinc-950 dark:text-white font-bold">Los Buques</strong>. Hacé tus 13 predicciones, bancátela contra toda la comunidad y demostrá antes del tip-off quién tiene el verdadero anillo.
        </motion.p>

        {/* Master CTAs */}
        <motion.div 
          variants={itemVariants} 
          className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link 
            href="/pickem/picks" 
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#FF5A1F] hover:bg-[#FF6B35] text-white text-2xl sm:text-3xl tracking-wider px-10 py-4.5 rounded-2xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-xl shadow-[#FF5A1F]/30 uppercase font-black"
            style={{ fontFamily: "var(--font-title)" }}
          >
            <span>HACÉ TUS PICKS</span>
            <ArrowRight className="w-6 h-6" />
          </Link>

          <Link
            href="/pickem/leaderboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/15 dark:border-white/15 text-zinc-900 dark:text-white text-xl sm:text-2xl tracking-wider px-8 py-4.5 rounded-2xl transition-all uppercase font-black"
            style={{ fontFamily: "var(--font-title)" }}
          >
            <Trophy className="w-5 h-5 text-[#FF5A1F]" />
            <span>VER RANKING GLOBAL</span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
