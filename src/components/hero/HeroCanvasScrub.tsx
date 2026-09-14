"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Users, ChevronDown, Flame } from "lucide-react";
import { YoutubeIcon } from "@/components/ui/Icons";

const TOTAL_FRAMES = 96;
const FRAME_DIR = "/frames/";
const FRAME_PAD = 4;
const LERP_FACTOR = 0.12;

function getFrameUrl(index: number): string {
  const frameNumber = String(index + 1).padStart(FRAME_PAD, "0");
  return `${FRAME_DIR}frame_${frameNumber}.webp`;
}

export function HeroCanvasScrub() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Beat 1: Intro / CTAs
  const beat1Ref = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  // Beat 2: Community & Mission (Swoop into center court "D")
  const beat2Ref = useRef<HTMLDivElement>(null);

  // Beat 3: Tip-off Transition
  const beat3Ref = useRef<HTMLDivElement>(null);

  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [firstFrameLoaded, setFirstFrameLoaded] = useState(false);

  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const currentDrawnIndexRef = useRef(-1);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const isRunningRef = useRef(false);

  // High-DPI draw frame with mathematical object-fit: cover and nearest-neighbor fallback
  const drawFrame = useCallback((idx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const clampedIdx = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(idx)));
    const images = imagesRef.current;
    let img = images[clampedIdx];

    // Nearest-neighbor search if frame is still in transit
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let d = 1; d < TOTAL_FRAMES; d++) {
        const prev = clampedIdx - d;
        if (prev >= 0 && images[prev]?.complete && images[prev]?.naturalWidth) {
          img = images[prev];
          break;
        }
        const next = clampedIdx + d;
        if (next < TOTAL_FRAMES && images[next]?.complete && images[next]?.naturalWidth) {
          img = images[next];
          break;
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const imgW = img.naturalWidth;
    const imgH = img.naturalHeight;

    const scale = Math.max(cw / imgW, ch / imgH);
    const dw = imgW * scale;
    const dh = imgH * scale;
    const dx = (cw - dw) / 2;
    const dy = (ch - dh) / 2;

    ctx.drawImage(img, dx, dy, dw, dh);
    currentDrawnIndexRef.current = clampedIdx;
  }, []);

  // Responsive High-DPI canvas resizing
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);

    const ctx = canvas.getContext("2d", { alpha: false });
    if (ctx) {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
    }

    if (currentDrawnIndexRef.current >= 0) {
      drawFrame(currentDrawnIndexRef.current);
    }
  }, [drawFrame]);

  // Frame preloader helper
  const loadFrame = useCallback((index: number, onDone?: () => void) => {
    if (imagesRef.current[index]) {
      onDone?.();
      return;
    }
    const img = new window.Image();
    img.onload = () => {
      imagesRef.current[index] = img;
      if (index === 0) {
        setFirstFrameLoaded(true);
        if (currentDrawnIndexRef.current < 0) {
          drawFrame(0);
        }
      }
      onDone?.();
    };
    img.onerror = () => {
      onDone?.();
    };
    img.src = getFrameUrl(index);
  }, [drawFrame]);

  // Lookahead predictive window around active frame
  const preloadAhead = useCallback((currentIdx: number) => {
    const start = Math.max(0, currentIdx - 3);
    const end = Math.min(TOTAL_FRAMES - 1, currentIdx + 16);
    for (let i = start; i <= end; i++) {
      if (!imagesRef.current[i]) {
        loadFrame(i);
      }
    }
  }, [loadFrame]);

  // Background download queue
  const startBackgroundPool = useCallback(() => {
    const queue: number[] = [];
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      if (!imagesRef.current[i]) {
        queue.push(i);
      }
    }

    const concurrency = 6;
    let active = 0;

    const next = () => {
      if (queue.length === 0) return;
      while (active < concurrency && queue.length > 0) {
        const idx = queue.shift();
        if (idx === undefined || imagesRef.current[idx]) continue;
        active++;
        loadFrame(idx, () => {
          active--;
          next();
        });
      }
    };

    next();
  }, [loadFrame]);

  // Direct DOM manipulation for cinematic 60 FPS multi-beat typography
  const updateNarrativeBeats = useCallback((p: number) => {
    // 1. Scroll helper indicator (disappears early)
    if (scrollIndicatorRef.current) {
      const indOp = Math.max(0, 1 - p * 10);
      scrollIndicatorRef.current.style.opacity = indOp.toFixed(3);
      scrollIndicatorRef.current.style.transform = `translateY(${p * 30}px)`;
    }

    // 2. Beat 1: Intro / CTAs (0.00 -> 0.30)
    if (beat1Ref.current) {
      if (p <= 0.18) {
        beat1Ref.current.style.opacity = "1";
        beat1Ref.current.style.transform = "scale(1) translateY(0px)";
        beat1Ref.current.style.pointerEvents = "auto";
      } else if (p <= 0.30) {
        const norm = (p - 0.18) / 0.12;
        const op = Math.max(0, 1 - norm);
        const scale = 1 + norm * 0.06;
        const ty = -norm * 30;
        beat1Ref.current.style.opacity = op.toFixed(3);
        beat1Ref.current.style.transform = `scale(${scale.toFixed(3)}) translateY(${ty.toFixed(1)}px)`;
        beat1Ref.current.style.pointerEvents = op > 0.1 ? "auto" : "none";
      } else {
        beat1Ref.current.style.opacity = "0";
        beat1Ref.current.style.pointerEvents = "none";
        beat1Ref.current.style.transform = "scale(1.06) translateY(-30px)";
      }
    }

    // 3. Beat 2: Community Statement (0.34 -> 0.72) - Crisp & focused
    if (beat2Ref.current) {
      if (p < 0.34) {
        beat2Ref.current.style.opacity = "0";
        beat2Ref.current.style.pointerEvents = "none";
        beat2Ref.current.style.transform = "scale(0.95) translateY(24px)";
      } else if (p <= 0.44) {
        const norm = (p - 0.34) / 0.10;
        const op = Math.min(1, norm);
        const scale = 0.95 + norm * 0.05;
        const ty = 24 - norm * 24;
        beat2Ref.current.style.opacity = op.toFixed(3);
        beat2Ref.current.style.transform = `scale(${scale.toFixed(3)}) translateY(${ty.toFixed(1)}px)`;
        beat2Ref.current.style.pointerEvents = "auto";
      } else if (p <= 0.62) {
        beat2Ref.current.style.opacity = "1";
        beat2Ref.current.style.transform = "scale(1) translateY(0px)";
        beat2Ref.current.style.pointerEvents = "auto";
      } else if (p <= 0.72) {
        const norm = (p - 0.62) / 0.10;
        const op = Math.max(0, 1 - norm);
        const scale = 1 + norm * 0.05;
        const ty = -norm * 24;
        beat2Ref.current.style.opacity = op.toFixed(3);
        beat2Ref.current.style.transform = `scale(${scale.toFixed(3)}) translateY(${ty.toFixed(1)}px)`;
        beat2Ref.current.style.pointerEvents = "none";
      } else {
        beat2Ref.current.style.opacity = "0";
        beat2Ref.current.style.pointerEvents = "none";
      }
    }

    // 4. Beat 3: Tip-off Cue (0.76 -> 0.96)
    if (beat3Ref.current) {
      if (p < 0.76) {
        beat3Ref.current.style.opacity = "0";
        beat3Ref.current.style.pointerEvents = "none";
        beat3Ref.current.style.transform = "translateY(16px)";
      } else if (p <= 0.84) {
        const norm = (p - 0.76) / 0.08;
        beat3Ref.current.style.opacity = norm.toFixed(3);
        beat3Ref.current.style.transform = `translateY(${(16 - norm * 16).toFixed(1)}px)`;
        beat3Ref.current.style.pointerEvents = "auto";
      } else if (p <= 0.92) {
        beat3Ref.current.style.opacity = "1";
        beat3Ref.current.style.transform = "translateY(0px)";
        beat3Ref.current.style.pointerEvents = "auto";
      } else {
        const norm = (p - 0.92) / 0.08;
        beat3Ref.current.style.opacity = Math.max(0, 1 - norm).toFixed(3);
        beat3Ref.current.style.transform = `translateY(${(-norm * 16).toFixed(1)}px)`;
        beat3Ref.current.style.pointerEvents = "none";
      }
    }
  }, []);

  // Motion preference detection
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(motionQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    motionQuery.addEventListener("change", handler);
    return () => motionQuery.removeEventListener("change", handler);
  }, []);

  // Preload initialization
  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas, { passive: true });

    for (let i = 0; i < 12; i++) {
      loadFrame(i);
    }
    startBackgroundPool();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [loadFrame, resizeCanvas, startBackgroundPool]);

  // Main 60 FPS LERP & scroll tracking
  useEffect(() => {
    if (isReducedMotion) {
      loadFrame(0, () => drawFrame(0));
      return;
    }

    const onScroll = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const maxScroll = rect.height - window.innerHeight;
      if (maxScroll <= 0) return;
      const currentScroll = -rect.top;
      targetProgressRef.current = Math.min(1, Math.max(0, currentScroll / maxScroll));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    isRunningRef.current = true;
    let rafId: number;

    const tick = () => {
      if (!isRunningRef.current) return;

      const diff = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(diff) < 0.0001) {
        currentProgressRef.current = targetProgressRef.current;
      } else {
        currentProgressRef.current += diff * LERP_FACTOR;
      }

      const progress = currentProgressRef.current;
      const frameF = progress * (TOTAL_FRAMES - 1);
      const frameI = Math.round(frameF);

      drawFrame(frameI);
      updateNarrativeBeats(progress);
      preloadAhead(frameI);

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      isRunningRef.current = false;
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [drawFrame, isReducedMotion, loadFrame, preloadAhead, updateNarrativeBeats]);

  return (
    <section
      id="scroll-driver"
      ref={containerRef}
      className={`relative w-full bg-[#0A0A0A] ${
        isReducedMotion ? "h-screen h-[100dvh]" : "h-[240vh] md:h-[300vh]"
      }`}
    >
      {/* Sticky Fullscreen Viewport holding the Canvas */}
      <div className="sticky top-0 h-screen h-[100dvh] w-full overflow-hidden flex flex-col items-center justify-center bg-[#0A0A0A]">
        {/* Instant LCP Poster Layer */}
        <div
          className={`absolute inset-0 z-0 select-none transition-opacity duration-700 pointer-events-none ${
            firstFrameLoaded ? "opacity-0" : "opacity-100"
          }`}
        >
          <Image
            src="/frames/frame_0001.webp"
            alt="Drafteados Basketball Arena"
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        {/* 60 FPS 2D Canvas Engine */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block z-0 pointer-events-none"
        />

        {/* Cinematic Multi-layer Gradient Overlays for Guaranteed AA Contrast */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-[#0A0A0A] via-black/45 to-black/65"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 z-10 pointer-events-none bg-radial-[circle_at_center,_transparent_35%,_rgba(10,10,10,0.85)_100%]"
        />

        {/* Orange Brand Atmosphere Aura */}
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-[#FF5A1F]/15 blur-[140px] pointer-events-none z-10"
        />

        {/* ============================================================ */}
        {/* BEAT 1: INTRO HERO (0% -> 28% Scroll)                        */}
        {/* ============================================================ */}
        <div
          ref={beat1Ref}
          className="absolute z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 max-w-5xl mx-auto w-full pt-16 sm:pt-12 select-none will-change-transform"
        >
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-black/50 backdrop-blur-md mb-4 sm:mb-6 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-[#FF5A1F] animate-pulse" />
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-zinc-200">
              DESDE 2017 &bull; TU CASA NBA
            </span>
          </div>

          {/* Main Headline */}
          <h1
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight text-white leading-[0.92] drop-shadow-[0_12px_40px_rgba(0,0,0,0.95)]"
            style={{ fontFamily: "var(--font-title)" }}
          >
            Bienvenidos a{" "}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FF7A45] to-[#FF5A1F] drop-shadow-[0_10px_45px_rgba(255,90,31,0.5)]">
              Tu Casa NBA
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-5 sm:mt-7 text-base sm:text-xl md:text-2xl text-zinc-200 max-w-2xl font-normal leading-relaxed drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
            La comunidad que vive el baloncesto como nadie. Análisis riguroso,
            debates sin filtro y pasión pura cada madrugada.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 w-full max-w-md sm:max-w-none">
            <MagneticButton
              variant="primary"
              size="lg"
              href="https://www.youtube.com/@DrafteadosNBA"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <YoutubeIcon className="w-5 h-5 text-white" />
              <span>Ver el canal</span>
            </MagneticButton>

            <MagneticButton
              variant="secondary"
              size="lg"
              href="#comunidad"
              className="w-full sm:w-auto"
            >
              <Users className="w-5 h-5 text-[#FF5A1F]" />
              <span>Conoce a los Buques</span>
            </MagneticButton>
          </div>
        </div>

        {/* ============================================================ */}
        {/* BEAT 2: THE COMMUNITY CORE (30% -> 66% Scroll)              */}
        {/* ============================================================ */}
        <div
          ref={beat2Ref}
          style={{ opacity: 0 }}
          className="absolute z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 max-w-4xl mx-auto w-full select-none pointer-events-none will-change-transform"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#FF5A1F]/30 bg-[#FF5A1F]/10 backdrop-blur-md mb-4 shadow-sm">
            <Flame className="w-3.5 h-3.5 text-[#FF5A1F]" />
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.25em] uppercase text-[#FF7A45]">
              +880.000 EN LA COMUNIDAD &bull; EL SHOW #1
            </span>
          </div>

          <h2
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-[0.95] drop-shadow-[0_12px_40px_rgba(0,0,0,0.95)]"
            style={{ fontFamily: "var(--font-title)" }}
          >
            Donde cada madrugada{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FF7A45] to-[#FF5A1F]">
              cobra sentido
            </span>
          </h2>

          <p className="mt-4 sm:mt-6 text-sm sm:text-lg md:text-xl text-zinc-300 max-w-2xl leading-relaxed drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
            Partidos en directo, scouting exhaustivo de las estrellas y el debate más
            auténtico. Construido noche a noche por y para amantes del juego.
          </p>

          {/* Social Proof Stats Strip */}
          <div className="mt-6 sm:mt-8 grid grid-cols-3 gap-3 sm:gap-8 max-w-xl w-full border-t border-white/10 pt-6">
            <div>
              <p className="text-2xl sm:text-4xl font-black text-white" style={{ fontFamily: "var(--font-title)" }}>
                +880K
              </p>
              <p className="text-[10px] sm:text-xs uppercase tracking-widest text-zinc-400 mt-0.5">
                Buques Activos
              </p>
            </div>
            <div>
              <p className="text-2xl sm:text-4xl font-black text-[#FF5A1F]" style={{ fontFamily: "var(--font-title)" }}>
                +2.500
              </p>
              <p className="text-[10px] sm:text-xs uppercase tracking-widest text-zinc-400 mt-0.5">
                Episodios
              </p>
            </div>
            <div>
              <p className="text-2xl sm:text-4xl font-black text-white" style={{ fontFamily: "var(--font-title)" }}>
                8 Años
              </p>
              <p className="text-[10px] sm:text-xs uppercase tracking-widest text-zinc-400 mt-0.5">
                Liderando la NBA
              </p>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* BEAT 3: TIP-OFF CUE (72% -> 96% Scroll)                     */}
        {/* ============================================================ */}
        <div
          ref={beat3Ref}
          style={{ opacity: 0 }}
          className="absolute z-20 flex flex-col items-center justify-center text-center px-4 max-w-lg mx-auto w-full select-none pointer-events-none will-change-transform"
        >
          <span className="text-[11px] sm:text-xs font-bold tracking-[0.35em] uppercase text-[#FF5A1F] mb-2">
            SALTO INICIAL
          </span>
          <h3
            className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight"
            style={{ fontFamily: "var(--font-title)" }}
          >
            Descubre lo último
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-zinc-400 max-w-sm">
            Nuestros análisis más recientes, debates calientes y scouting al detalle.
          </p>
          <div className="mt-4 flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/15 animate-bounce">
            <ChevronDown className="w-4 h-4 text-[#FF5A1F]" />
          </div>
        </div>

        {/* Helper Scroll Indicator (Intro) */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-6 sm:bottom-8 z-20 flex flex-col items-center gap-2 pointer-events-none will-change-transform"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-400 font-medium">
            Haz Scroll para Entrar
          </span>
          <div className="w-5 h-8 rounded-full border border-white/30 flex items-start justify-center p-1 bg-black/30 backdrop-blur-sm">
            <div className="w-1.5 h-2 rounded-full bg-[#FF5A1F] animate-bounce" />
          </div>
        </div>

        {/* Bottom seamless transition fade */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-[#0A0A0A] to-transparent z-10 pointer-events-none"
        />
      </div>
    </section>
  );
}
