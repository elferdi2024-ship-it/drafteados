"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Users } from "lucide-react";
import { YoutubeIcon } from "@/components/ui/Icons";

const TOTAL_FRAMES = 192;
const FRAME_DIR = "/frames/";
const FRAME_PAD = 4;
const LERP_FACTOR = 0.18;

function getFrameUrl(index: number): string {
  const frameNumber = String(index + 1).padStart(FRAME_PAD, "0");
  return `${FRAME_DIR}frame_${frameNumber}.jpg`;
}

export function HeroCanvasScrub() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  const [isFirstFrameReady, setIsFirstFrameReady] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const currentDrawnIndexRef = useRef(-1);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);

  // High-DPI draw frame with object-fit: cover and bidirectional nearest-neighbor fallback
  const drawFrame = useCallback((idx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const clampedIdx = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(idx)));
    const images = imagesRef.current;
    let img = images[clampedIdx];

    // Nearest-neighbor search if frame is still downloading
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

    // object-fit: cover scaling
    const scale = Math.max(cw / imgW, ch / imgH);
    const dw = imgW * scale;
    const dh = imgH * scale;
    const dx = (cw - dw) / 2;
    const dy = (ch - dh) / 2;

    ctx.drawImage(img, dx, dy, dw, dh);
    currentDrawnIndexRef.current = clampedIdx;

    if (!isFirstFrameReady) {
      setIsFirstFrameReady(true);
    }
  }, [isFirstFrameReady]);

  // Handle high-DPI canvas resizing
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(window.innerWidth * dpr);
    canvas.height = Math.round(window.innerHeight * dpr);
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (ctx) {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
    }

    if (currentDrawnIndexRef.current >= 0) {
      drawFrame(currentDrawnIndexRef.current);
    }
  }, [drawFrame]);

  // Single frame loader helper
  const loadFrame = useCallback((index: number, onDone?: () => void) => {
    if (imagesRef.current[index]) {
      if (onDone) onDone();
      return;
    }
    const img = new window.Image();
    img.onload = () => {
      imagesRef.current[index] = img;
      if (index === 0 && currentDrawnIndexRef.current < 0) {
        drawFrame(0);
      }
      if (onDone) onDone();
    };
    img.onerror = () => {
      if (onDone) onDone();
    };
    img.src = getFrameUrl(index);
  }, [drawFrame]);

  // Lookahead predictive preloader around current index
  const preloadAhead = useCallback((currentIdx: number) => {
    const start = Math.max(0, currentIdx - 4);
    const end = Math.min(TOTAL_FRAMES - 1, currentIdx + 22);
    for (let i = start; i <= end; i++) {
      if (!imagesRef.current[i]) {
        loadFrame(i);
      }
    }
  }, [loadFrame]);

  // Concurrent background loading pool
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

  // Synchronize text panels with scroll progress
  const updateTextPanels = useCallback((progress: number) => {
    // Scroll indicator fades out before 12% progress
    if (scrollIndicatorRef.current) {
      const indOpacity = Math.max(0, 1 - progress * 8.5);
      scrollIndicatorRef.current.style.opacity = indOpacity.toString();
      scrollIndicatorRef.current.style.transform = `translateY(${progress * 25}px)`;
    }

    if (eyebrowRef.current && titleRef.current && subtitleRef.current && ctasRef.current) {
      if (progress < 0.20) {
        eyebrowRef.current.style.opacity = "1";
        eyebrowRef.current.style.transform = "translateY(0px)";
        titleRef.current.style.opacity = "1";
        titleRef.current.style.transform = "scale(1) translateY(0px)";
        subtitleRef.current.style.opacity = "1";
        subtitleRef.current.style.transform = "translateY(0px)";
        ctasRef.current.style.opacity = "1";
        ctasRef.current.style.transform = "scale(1) translateY(0px)";
        ctasRef.current.style.pointerEvents = "auto";
      } else if (progress <= 0.48) {
        const norm = (progress - 0.20) / 0.28; // normalized 0 to 1
        const opacity = Math.max(0, 1 - norm).toString();
        const scale = (1 + norm * 0.08).toString();
        const translateY = `${-norm * 40}px`;

        eyebrowRef.current.style.opacity = opacity;
        eyebrowRef.current.style.transform = `translateY(${-norm * 20}px)`;

        titleRef.current.style.opacity = opacity;
        titleRef.current.style.transform = `scale(${scale}) translateY(${translateY})`;

        subtitleRef.current.style.opacity = opacity;
        subtitleRef.current.style.transform = `translateY(${translateY})`;

        ctasRef.current.style.opacity = opacity;
        ctasRef.current.style.transform = `scale(${1 - norm * 0.04}) translateY(${-norm * 20}px)`;
        ctasRef.current.style.pointerEvents = (1 - norm) > 0.1 ? "auto" : "none";
      } else {
        eyebrowRef.current.style.opacity = "0";
        titleRef.current.style.opacity = "0";
        subtitleRef.current.style.opacity = "0";
        ctasRef.current.style.opacity = "0";
        ctasRef.current.style.pointerEvents = "none";
      }
    }
  }, []);

  // Check prefers-reduced-motion
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(motionQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    motionQuery.addEventListener("change", handler);
    return () => motionQuery.removeEventListener("change", handler);
  }, []);

  // Frame initialization & priority preloading
  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas, { passive: true });

    // 1. Immediately preload the first 15 frames for instant FCP
    for (let i = 0; i < 15; i++) {
      loadFrame(i);
    }

    // 2. Start concurrent background pool for remaining frames
    startBackgroundPool();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [loadFrame, resizeCanvas, startBackgroundPool]);

  // Main 60 FPS LERP loop & scroll tracking
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

    // 60 FPS tick loop
    const tick = () => {
      const diff = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(diff) < 0.0001) {
        currentProgressRef.current = targetProgressRef.current;
      } else {
        currentProgressRef.current += diff * LERP_FACTOR;
      }

      const frameF = currentProgressRef.current * (TOTAL_FRAMES - 1);
      const frameI = Math.round(frameF);

      drawFrame(frameI);
      updateTextPanels(currentProgressRef.current);
      preloadAhead(frameI);

      rafIdRef.current = requestAnimationFrame(tick);
    };

    rafIdRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [drawFrame, isReducedMotion, loadFrame, preloadAhead, updateTextPanels]);

  return (
    <section
      id="scroll-driver"
      ref={containerRef}
      className={`relative w-full bg-[#0A0A0A] ${
        isReducedMotion ? "h-screen" : "h-[220vh] md:h-[280vh]"
      }`}
    >
      {/* Sticky Fullscreen Viewport holding the Canvas */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-[#0A0A0A]">
        {/* Instant LCP Poster Layer (rendered before Canvas takes over) */}
        <div
          className={`absolute inset-0 z-0 select-none transition-opacity duration-500 ${
            isFirstFrameReady ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <Image
            src="/frames/frame_0001.jpg"
            alt="Drafteados Basketball Court Logo"
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
          className="absolute inset-0 w-full h-full block z-0"
        />

        {/* Cinematic Multi-layer Gradient Overlays for Guaranteed AA Contrast */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-black/60"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 z-10 pointer-events-none bg-radial-[circle_at_center,_transparent_40%,_rgba(10,10,10,0.8)_100%]"
        />

        {/* Orange Brand Aura */}
        <div
          aria-hidden="true"
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] rounded-full bg-[#FF5A1F]/15 blur-[120px] pointer-events-none z-10"
        />

        {/* Hero Foreground Content */}
        <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 max-w-5xl mx-auto w-full pt-16 sm:pt-12 select-none">
          {/* Eyebrow Pill */}
          <div
            ref={eyebrowRef}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-black/50 backdrop-blur-md mb-4 sm:mb-6 shadow-sm will-change-transform"
          >
            <span className="flex h-2 w-2 rounded-full bg-[#FF5A1F] animate-pulse" />
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-zinc-200">
              DESDE 2017 &bull; TU CASA NBA
            </span>
          </div>

          {/* Main Headline */}
          <h1
            ref={titleRef}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight text-white leading-[0.92] drop-shadow-[0_12px_40px_rgba(0,0,0,0.95)] will-change-transform"
            style={{ fontFamily: "var(--font-title)" }}
          >
            Bienvenidos a{" "}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FF7A45] to-[#FF5A1F] drop-shadow-[0_10px_45px_rgba(255,90,31,0.5)]">
              Tu Casa NBA
            </span>
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="mt-5 sm:mt-7 text-base sm:text-xl md:text-2xl text-zinc-200 max-w-2xl font-normal leading-relaxed drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] will-change-transform"
          >
            La comunidad que vive el baloncesto como nadie. Análisis riguroso,
            debates sin filtro y pasión pura cada madrugada.
          </p>

          {/* Action CTAs */}
          <div
            ref={ctasRef}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 w-full max-w-md sm:max-w-none will-change-transform"
          >
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

        {/* Scroll Indicator */}
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
          className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A0A] to-transparent z-10 pointer-events-none"
        />
      </div>
    </section>
  );
}
