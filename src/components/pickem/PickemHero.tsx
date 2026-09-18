// filepath: src/components/pickem/PickemHero.tsx
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion, type Variants } from 'framer-motion';
import { ArrowRight, Trophy } from 'lucide-react';

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
    <section className="relative px-4 pt-16 pb-20 md:pt-24 md:pb-32 overflow-hidden flex flex-col items-center justify-center text-center bg-[#080808] text-white border-b border-white/10">
      {/* Background Architectural Grid & Subtle Stadium Glow */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute inset-0 opacity-15 [background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-[#FF5A1F]/15 blur-[180px] rounded-full" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-6xl mx-auto w-full space-y-6"
      >
        {/* 1. EYEBROW ARRIBA */}
        <motion.div variants={itemVariants} className="flex items-center justify-center gap-2.5 text-xs font-mono font-bold tracking-[0.25em] text-[#FF5A1F] uppercase">
          <span className="w-2 h-0.5 bg-[#FF5A1F]" />
          <span>TEMPORADA NBA 2026/27 &bull; PRONÓSTICO OFICIAL DE LOS BUQUES</span>
          <span className="w-2 h-0.5 bg-[#FF5A1F]" />
        </motion.div>

        {/* 2. TÍTULO MONUMENTAL ARRIBA */}
        <motion.h1 
          variants={itemVariants} 
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] leading-[0.88] tracking-tight uppercase font-black text-white"
          style={{ fontFamily: 'var(--font-title)' }}
        >
          ¿QUIÉN SABE MÁS<br />
          <span className="text-[#FF5A1F]">
            DE LA NBA?
          </span>
        </motion.h1>

        {/* 3. SUBTÍTULO */}
        <motion.p 
          variants={itemVariants} 
          className="text-base sm:text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto font-normal leading-relaxed"
        >
          La porra definitiva de <strong className="text-white font-bold">Los Buques</strong>. Hacé tus 13 predicciones, bancátela contra toda la comunidad y demostrá quién se lleva el verdadero anillo.
        </motion.p>

        {/* 4. BOTONES DE ACCIÓN */}
        <motion.div 
          variants={itemVariants} 
          className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link 
            href="/pickem/picks" 
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#FF5A1F] hover:bg-[#FF6B35] text-white text-xl sm:text-2xl tracking-wider px-9 py-4 rounded-2xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-xl shadow-[#FF5A1F]/30 uppercase font-black"
            style={{ fontFamily: "var(--font-title)" }}
          >
            <span>HACÉ TUS PICKS</span>
            <ArrowRight className="w-5 h-5" />
          </Link>

          <Link
            href="/pickem/leaderboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white/5 hover:bg-white/10 border border-white/15 text-white text-lg sm:text-xl tracking-wider px-7 py-4 rounded-2xl transition-all uppercase font-black"
            style={{ fontFamily: "var(--font-title)" }}
          >
            <Trophy className="w-5 h-5 text-[#FF5A1F]" />
            <span>VER RANKING GLOBAL</span>
          </Link>
        </motion.div>

        {/* 5. HERO CARD IMAGE COMPLETA CON RESPLANDOR AMBIENTAL */}
        <motion.div
          variants={itemVariants}
          className="relative pt-8 md:pt-12 max-w-5xl mx-auto w-full"
        >
          {/* Halo ambiental naranja detrás de la imagen */}
          <div
            aria-hidden="true"
            className="absolute -inset-4 md:-inset-10 bg-gradient-to-t from-[#FF5A1F]/30 via-[#FF5A1F]/10 to-transparent blur-3xl rounded-full pointer-events-none opacity-70"
          />

          {/* Contenedor de la imagen con borde y sombra */}
          <div className="relative rounded-2xl sm:rounded-3xl md:rounded-[2rem] overflow-hidden border border-white/15 shadow-[0_25px_80px_-15px_rgba(255,90,31,0.35)] bg-[#0A0A0A]">
            <Image
              src="/images/heropicekm.png"
              alt="Drafteados Pick'em 2026/27 - Tarjeta Oficial"
              width={1920}
              height={1080}
              priority
              className="w-full h-auto object-cover select-none pointer-events-none"
            />
            {/* Anillo de resplandor interior */}
            <div className="absolute inset-0 ring-1 ring-inset ring-white/15 rounded-2xl sm:rounded-3xl md:rounded-[2rem] pointer-events-none" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
