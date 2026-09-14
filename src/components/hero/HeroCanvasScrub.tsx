"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Users, ChevronDown, Flame } from "lucide-react";
import { YoutubeIcon } from "@/components/ui/Icons";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TOTAL_FRAMES = 240;
const FRAME_DIR = "/frames/";
const FRAME_PAD = 4;
const LERP_FACTOR = 0.16;

function getFrameUrl(index: number): string {
  const frameNumber = String(index + 1).padStart(FRAME_PAD, "0");
  return `${FRAME_DIR}frame_${frameNumber}.jpg`;
}

export function HeroCanvasScrub() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Beat 1: Intro / CTAs
  const beat1Ref = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [firstFrameLoaded, setFirstFrameLoaded] = useState(false);

  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const loadingSetRef = useRef<Set<number>>(new Set());
  const currentDrawnIndexRef = useRef(-1);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const isRunningRef = useRef(false);

  // Find nearest loaded frame
  const findNearestFrame = useCallback((idx: number): HTMLImageElement | null => {
    const images = imagesRef.current;
    if (images[idx]?.complete && images[idx]?.naturalWidth) {
      return images[idx];
    }
    for (let d = 1; d < TOTAL_FRAMES; d++) {
      const prev = idx - d;
      if (prev >= 0 && images[prev]?.complete && images[prev]?.naturalWidth) {
        return images[prev];
      }
      const next = idx + d;
      if (next < TOTAL_FRAMES && images[next]?.complete && images[next]?.naturalWidth) {
        return images[next];
      }
    }
    return null;
  }, []);

  // High-DPI draw frame with mathematical object-fit: cover
  const drawFrame = useCallback((idx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const clampedIdx = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(idx)));
    const img = findNearestFrame(clampedIdx);

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
  }, [findNearestFrame]);

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
    if (imagesRef.current[index] || loadingSetRef.current.has(index)) {
      onDone?.();
      return;
    }
    loadingSetRef.current.add(index);

    const img = new window.Image();
    img.onload = () => {
      loadingSetRef.current.delete(index);
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
      loadingSetRef.current.delete(index);
      onDone?.();
    };
    img.src = getFrameUrl(index);
  }, [drawFrame]);

  // Priority window preloading around active frame (±15 frames)
  const preloadAhead = useCallback((currentIdx: number) => {
    const start = Math.max(0, currentIdx - 8);
    const end = Math.min(TOTAL_FRAMES - 1, currentIdx + 15);
    for (let i = start; i <= end; i++) {
      if (!imagesRef.current[i] && !loadingSetRef.current.has(i)) {
        loadFrame(i);
      }
    }
  }, [loadFrame]);

  // Tiered Preloader Engine
  // 1. Keyframe Skeleton: every 5th frame across 0..239 (48 frames total)
  // 2. Progressive background pool for remainder
  const startTieredPreload = useCallback(() => {
    // Step 1: Immediately load frame 0
    loadFrame(0, () => {
      // Step 2: Skeleton keyframes distributed across the entire 240 frames
      const skeleton: number[] = [];
      for (let i = 5; i < TOTAL_FRAMES; i += 5) {
        skeleton.push(i);
      }
      if (!skeleton.includes(TOTAL_FRAMES - 1)) {
        skeleton.push(TOTAL_FRAMES - 1);
      }

      // Concurrently load skeleton keyframes in batches of 6
      let skeletonIndex = 0;
      const concurrency = 6;
      let activeWorkers = 0;

      const runWorker = () => {
        while (activeWorkers < concurrency && skeletonIndex < skeleton.length) {
          const idx = skeleton[skeletonIndex++];
          if (imagesRef.current[idx]) continue;
          activeWorkers++;
          loadFrame(idx, () => {
            activeWorkers--;
            runWorker();
          });
        }

        // Once skeleton finishes or winds down, fill remaining intermediate frames
        if (skeletonIndex >= skeleton.length && activeWorkers === 0) {
          fillRemainingFrames();
        }
      };

      const fillRemainingFrames = () => {
        const remaining: number[] = [];
        for (let i = 0; i < TOTAL_FRAMES; i++) {
          if (!imagesRef.current[i] && !loadingSetRef.current.has(i)) {
            remaining.push(i);
          }
        }

        let remIdx = 0;
        const bgConcurrency = 4;
        let bgActive = 0;

        const runBgWorker = () => {
          while (bgActive < bgConcurrency && remIdx < remaining.length) {
            const idx = remaining[remIdx++];
            if (imagesRef.current[idx]) continue;
            bgActive++;
            loadFrame(idx, () => {
              bgActive--;
              runBgWorker();
            });
          }
        };

        runBgWorker();
      };

      runWorker();
    });
  }, [loadFrame]);

  // Direct DOM manipulation for cinematic 60 FPS text choreography
  const updateNarrativeBeats = useCallback((p: number) => {
    // Scroll helper indicator (disappears early)
    if (scrollIndicatorRef.current) {
      const indOp = Math.max(0, 1 - p * 12);
      scrollIndicatorRef.current.style.opacity = indOp.toFixed(3);
      scrollIndicatorRef.current.style.transform = `translateY(${p * 25}px)`;
    }

    // Main Hero text panel
    if (beat1Ref.current) {
      if (p <= 0.18) {
        beat1Ref.current.style.opacity = "1";
        beat1Ref.current.style.transform = "scale(1) translateY(0px)";
        beat1Ref.current.style.pointerEvents = "auto";
      } else if (p <= 0.42) {
        const norm = (p - 0.18) / 0.24; // 0 to 1
        const op = Math.max(0, 1 - norm);
        const scale = 1 + norm * 0.05;
        const ty = -norm * 30;
        beat1Ref.current.style.opacity = op.toFixed(3);
        beat1Ref.current.style.transform = `scale(${scale.toFixed(3)}) translateY(${ty.toFixed(1)}px)`;
        beat1Ref.current.style.pointerEvents = op > 0.1 ? "auto" : "none";
      } else {
        beat1Ref.current.style.opacity = "0";
        beat1Ref.current.style.pointerEvents = "none";
        beat1Ref.current.style.transform = "scale(1.05) translateY(-30px)";
      }
    }

    // Canvas exit subtle scale & blend for transition into Section 1 (82% - 100%)
    if (canvasRef.current) {
      if (p > 0.82) {
        const norm = (p - 0.82) / 0.18;
        const scale = 1 - norm * 0.04;
        canvasRef.current.style.transform = `scale(${scale.toFixed(3)})`;
      } else {
        canvasRef.current.style.transform = "scale(1)";
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
    startTieredPreload();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [resizeCanvas, startTieredPreload]);

  // ScrollTrigger + Native Touch Scroll Tracking (100% Mobile & Desktop Synced)
  useEffect(() => {
    if (isReducedMotion) {
      loadFrame(0, () => drawFrame(0));
      return;
    }

    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    // 1. Connect GSAP ScrollTrigger (synced with Lenis & mobile momentum)
    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.12,
      onUpdate: (self) => {
        targetProgressRef.current = self.progress;
      },
    });

    // 2. Native scroll listener fallback for zero-latency mobile touch
    const onScrollFallback = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const maxScroll = rect.height - window.innerHeight;
      if (maxScroll <= 0) return;
      const currentScroll = -rect.top;
      const progress = Math.min(1, Math.max(0, currentScroll / maxScroll));
      // Feed target progress smoothly
      targetProgressRef.current = progress;
    };

    window.addEventListener("scroll", onScrollFallback, { passive: true });
    onScrollFallback();

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
      st.kill();
      window.removeEventListener("scroll", onScrollFallback);
      cancelAnimationFrame(rafId);
    };
  }, [drawFrame, isReducedMotion, loadFrame, preloadAhead, updateNarrativeBeats]);

  return (
    <section
      id="hero-canvas-section"
      ref={containerRef}
      className={`relative w-full bg-[#0A0A0A] ${
        isReducedMotion ? "h-screen h-[100svh]" : "h-[320vh] sm:h-[280vh]"
      }`}
    >
      {/* Sticky Fullscreen Viewport holding the Canvas */}
      <div className="sticky top-0 h-screen h-[100svh] w-full overflow-hidden flex flex-col items-center justify-center bg-[#0A0A0A] touch-pan-y">
        {/* Instant LCP Poster Layer */}
        <div
          className={`absolute inset-0 z-0 select-none transition-opacity duration-700 pointer-events-none ${
            firstFrameLoaded ? "opacity-0" : "opacity-100"
          }`}
        >
          <Image
            src="/frames/frame_0001.jpg"
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
          className="absolute inset-0 w-full h-full block z-0 pointer-events-none will-change-transform"
        />

        {/* Cinematic Multi-layer Gradient Overlays for Guaranteed AA Contrast */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-[#0A0A0A] via-black/40 to-black/60"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 z-10 pointer-events-none bg-radial-[circle_at_center,_transparent_40%,_rgba(10,10,10,0.85)_100%]"
        />

        {/* Orange Brand Atmosphere Aura */}
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-[#FF5A1F]/15 blur-[140px] pointer-events-none z-10"
        />

        {/* Hero Foreground Content */}
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
            Esto es Tu Casa NBA. Análisis sin filtro, debates de verdad y la mejor
            comunidad de baloncesto en español.
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
              <span>Somos Buques</span>
            </MagneticButton>
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
