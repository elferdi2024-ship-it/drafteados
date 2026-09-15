// filepath: src/components/hero/HeroCanvasScrub.tsx
"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Users } from "lucide-react";
import { YoutubeIcon } from "@/components/ui/Icons";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TOTAL_FRAMES = 240;
const FRAME_PAD = 4;
const FRAME_VERSION = process.env.NEXT_PUBLIC_FRAME_VERSION || "";

function getFrameUrl(index: number, version = FRAME_VERSION): string {
  const frameNumber = String(index + 1).padStart(FRAME_PAD, "0");
  const basePath = version ? `/frames/${version}/` : "/frames/";
  return `${basePath}frame_${frameNumber}.jpg`;
}

export function HeroCanvasScrub() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Beat 1: Intro / CTAs
  const beat1Ref = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [firstFrameLoaded, setFirstFrameLoaded] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const loadingSetRef = useRef<Set<number>>(new Set());
  const currentDrawnIndexRef = useRef(-1);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const isRunningRef = useRef(false);
  const isVisibleRef = useRef(true);
  const rafIdRef = useRef<number | null>(null);
  const hasExitedHeroRef = useRef(false);

  // Device & Motion Detection
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(motionQuery.matches);
    const motionHandler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    motionQuery.addEventListener("change", motionHandler);

    const checkDevice = () => {
      const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      const isNarrow = window.innerWidth <= 768;
      const isMobileUA =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i.test(
          navigator.userAgent
        );
      setIsMobileDevice(hasTouch || isNarrow || isMobileUA);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice, { passive: true });

    return () => {
      motionQuery.removeEventListener("change", motionHandler);
      window.removeEventListener("resize", checkDevice);
    };
  }, []);

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
  const drawFrame = useCallback(
    (idx: number) => {
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
    },
    [findNearestFrame]
  );

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

  // Frame preloader helper with off-thread asynchronous decoding
  const loadFrame = useCallback(
    (index: number, onDone?: () => void) => {
      if (imagesRef.current[index] || loadingSetRef.current.has(index)) {
        onDone?.();
        return;
      }
      loadingSetRef.current.add(index);

      const img = new window.Image();
      img.onload = () => {
        // Decode off main-thread to eliminate scrolling hitch
        if ("decode" in img) {
          img
            .decode()
            .then(() => {
              loadingSetRef.current.delete(index);
              imagesRef.current[index] = img;
              if (index === 0) {
                setFirstFrameLoaded(true);
                if (currentDrawnIndexRef.current < 0) {
                  drawFrame(0);
                }
              }
              onDone?.();
            })
            .catch(() => {
              loadingSetRef.current.delete(index);
              imagesRef.current[index] = img;
              onDone?.();
            });
        } else {
          loadingSetRef.current.delete(index);
          imagesRef.current[index] = img;
          if (index === 0) {
            setFirstFrameLoaded(true);
            if (currentDrawnIndexRef.current < 0) {
              drawFrame(0);
            }
          }
          onDone?.();
        }
      };
      img.onerror = () => {
        loadingSetRef.current.delete(index);
        onDone?.();
      };
      img.src = getFrameUrl(index);
    },
    [drawFrame]
  );

  // Priority window preloading around active frame (+20 / -6 frames)
  const preloadAhead = useCallback(
    (currentIdx: number) => {
      if (hasExitedHeroRef.current) return;
      const start = Math.max(0, currentIdx - 6);
      const end = Math.min(TOTAL_FRAMES - 1, currentIdx + 20);
      for (let i = start; i <= end; i++) {
        if (!imagesRef.current[i] && !loadingSetRef.current.has(i)) {
          loadFrame(i);
        }
      }
    },
    [loadFrame]
  );

  // Continuous Sequential Preloader (Eliminates frame gap stutter)
  const startTieredPreload = useCallback(() => {
    // 1. First frame immediate
    loadFrame(0, () => {
      // 2. Load continuous sequence 0..239 in high-concurrency stream
      const queue: number[] = [];
      for (let i = 1; i < TOTAL_FRAMES; i++) {
        queue.push(i);
      }

      let qIdx = 0;
      const concurrency = 8;
      let activeWorkers = 0;

      const runWorker = () => {
        if (hasExitedHeroRef.current) return;
        while (activeWorkers < concurrency && qIdx < queue.length) {
          const idx = queue[qIdx++];
          if (imagesRef.current[idx]) continue;
          activeWorkers++;
          loadFrame(idx, () => {
            activeWorkers--;
            runWorker();
          });
        }
      };

      runWorker();
    });
  }, [loadFrame]);

  // Direct DOM choreography for narrative text & canvas exit
  const updateNarrativeBeats = useCallback((p: number) => {
    // Scroll indicator fades out rapidly in first 8%
    if (scrollIndicatorRef.current) {
      const indOp = Math.max(0, 1 - p * 8);
      scrollIndicatorRef.current.style.opacity = indOp.toFixed(3);
      scrollIndicatorRef.current.style.transform = `translateY(${p * 20}px)`;
    }

    // Hero intro text panel: subtle scale + translateY + velvety opacity
    if (beat1Ref.current) {
      if (p <= 0.12) {
        beat1Ref.current.style.opacity = "1";
        beat1Ref.current.style.transform = "scale(1) translateY(0px)";
        beat1Ref.current.style.pointerEvents = "auto";
      } else if (p <= 0.38) {
        const norm = (p - 0.12) / 0.26;
        const op = Math.max(0, 1 - norm);
        const scale = 1 + norm * 0.03;
        const ty = -norm * 24;
        beat1Ref.current.style.opacity = op.toFixed(3);
        beat1Ref.current.style.transform = `scale(${scale.toFixed(3)}) translateY(${ty.toFixed(1)}px)`;
        beat1Ref.current.style.pointerEvents = op > 0.1 ? "auto" : "none";
      } else {
        beat1Ref.current.style.opacity = "0";
        beat1Ref.current.style.pointerEvents = "none";
        beat1Ref.current.style.transform = "scale(1.03) translateY(-24px)";
      }
    }

    // Canvas exit subtle scale and blend (85% - 100%)
    if (canvasRef.current) {
      if (p > 0.85) {
        const norm = (p - 0.85) / 0.15;
        const scale = 1 - norm * 0.04;
        const op = 1 - norm * 0.35;
        canvasRef.current.style.transform = `scale(${scale.toFixed(3)})`;
        canvasRef.current.style.opacity = op.toFixed(3);
      } else {
        canvasRef.current.style.transform = "scale(1)";
        canvasRef.current.style.opacity = "1";
      }
    }
  }, []);

  // Preload initialization & resize
  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas, { passive: true });
    startTieredPreload();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [resizeCanvas, startTieredPreload]);

  // Page Load Entrance Animation (Hero Headline & Canvas)
  useEffect(() => {
    if (isReducedMotion) return;
    if (beat1Ref.current) {
      gsap.fromTo(
        beat1Ref.current,
        { opacity: 0, y: 30, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: "power3.out", delay: 0.15 }
      );
    }
  }, [isReducedMotion]);

  // Scrollytelling Engine: Dual Architecture (Desktop Sticky vs Mobile Fixed Driver)
  useEffect(() => {
    if (isReducedMotion) {
      loadFrame(0, () => drawFrame(0));
      return;
    }

    if (typeof window === "undefined") return;

    let st: ScrollTrigger | null = null;
    isRunningRef.current = true;

    // Start / Stop RAF dynamically to eliminate GPU usage when off-screen
    const startRenderLoop = () => {
      if (rafIdRef.current !== null) return;

      const tick = () => {
        if (!isRunningRef.current) return;

        if (isVisibleRef.current) {
          const diff = targetProgressRef.current - currentProgressRef.current;
          const absDiff = Math.abs(diff);

          if (absDiff < 0.00008) {
            currentProgressRef.current = targetProgressRef.current;
          } else {
            // LERP_FACTOR: 0.15 on desktop (sweet spot in 0.14 - 0.18) / 0.22 on mobile
            const baseFactor = isMobileDevice ? 0.22 : 0.15;
            const velocityBoost = Math.min(0.2, absDiff * 0.5);
            const factor = baseFactor + velocityBoost;

            currentProgressRef.current += diff * factor;
          }

          const progress = currentProgressRef.current;
          const frameF = progress * (TOTAL_FRAMES - 1);
          const frameI = Math.round(frameF);

          drawFrame(frameI);
          updateNarrativeBeats(progress);
          preloadAhead(frameI);
        }

        rafIdRef.current = requestAnimationFrame(tick);
      };

      rafIdRef.current = requestAnimationFrame(tick);
    };

    const stopRenderLoop = () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };

    // Mobile Scrollytelling Scroll Handler (zero interference, native 120Hz compositor)
    const handleMobileScroll = () => {
      const container = containerRef.current;
      const stage = stageRef.current;
      if (!container || !stage) return;

      const driverHeight = container.offsetHeight;
      const vpHeight = window.innerHeight;
      const maxScroll = driverHeight - vpHeight;
      const currentScroll = window.scrollY;

      if (maxScroll <= 0) return;

      // 1. Calculate strictly bound progress
      const progress = Math.min(1, Math.max(0, currentScroll / maxScroll));
      targetProgressRef.current = progress;

      // 2. Classical Scrollytelling Stage Pinning (eliminates CSS sticky bugs on mobile)
      if (currentScroll >= maxScroll) {
        stage.style.position = "absolute";
        stage.style.top = "auto";
        stage.style.bottom = "0px";
      } else {
        stage.style.position = "fixed";
        stage.style.top = "0px";
        stage.style.bottom = "auto";
      }

      // 3. GPU Power Saver: Completely pause RAF and hide rendering when scrolled past
      if (currentScroll > driverHeight + 80) {
        hasExitedHeroRef.current = true;
        if (isVisibleRef.current) {
          isVisibleRef.current = false;
          stage.style.visibility = "hidden";
          stage.style.pointerEvents = "none";
          stopRenderLoop();
        }
      } else {
        hasExitedHeroRef.current = false;
        if (!isVisibleRef.current) {
          isVisibleRef.current = true;
          stage.style.visibility = "visible";
          stage.style.pointerEvents = "auto";
          startRenderLoop();
        }
      }
    };

    // Desktop Scroll Handler (GSAP ScrollTrigger + Lenis)
    const setupDesktopScrub = () => {
      gsap.registerPlugin(ScrollTrigger);

      st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.1,
        onUpdate: (self) => {
          targetProgressRef.current = self.progress;
        },
        onLeave: () => {
          hasExitedHeroRef.current = true;
          isVisibleRef.current = false;
          stopRenderLoop();
        },
        onEnterBack: () => {
          hasExitedHeroRef.current = false;
          isVisibleRef.current = true;
          startRenderLoop();
        },
      });

      const onDesktopNativeScroll = () => {
        const container = containerRef.current;
        if (!container) return;
        const rect = container.getBoundingClientRect();
        const maxScroll = rect.height - window.innerHeight;
        if (maxScroll <= 0) return;
        const currentScroll = -rect.top;
        if (currentScroll < 0) {
          targetProgressRef.current = 0;
        } else if (currentScroll > maxScroll) {
          targetProgressRef.current = 1;
        }
      };

      window.addEventListener("scroll", onDesktopNativeScroll, { passive: true });

      return () => {
        window.removeEventListener("scroll", onDesktopNativeScroll);
      };
    };

    let cleanupDesktop: (() => void) | undefined;

    if (isMobileDevice) {
      window.addEventListener("scroll", handleMobileScroll, { passive: true });
      handleMobileScroll();
    } else {
      cleanupDesktop = setupDesktopScrub();
    }

    // Launch RAF initially
    startRenderLoop();

    return () => {
      isRunningRef.current = false;
      stopRenderLoop();
      if (st) st.kill();
      if (cleanupDesktop) cleanupDesktop();
      window.removeEventListener("scroll", handleMobileScroll);
    };
  }, [
    drawFrame,
    isMobileDevice,
    isReducedMotion,
    loadFrame,
    preloadAhead,
    updateNarrativeBeats,
  ]);

  return (
    <section
      id="hero-canvas-section"
      ref={containerRef}
      className={`relative w-full bg-[#0A0A0A] ${
        isReducedMotion
          ? "h-screen h-[100dvh]"
          : "h-[165vh] sm:h-[180vh] md:h-[270vh]"
      }`}
    >
      {/* Viewport Stage: Fixed Scrollytelling on Mobile / Sticky on Desktop */}
      <div
        ref={stageRef}
        className={`w-full h-screen h-[100dvh] overflow-hidden flex flex-col items-center justify-center bg-[#0A0A0A] touch-pan-y ${
          isMobileDevice ? "fixed top-0 left-0 z-10" : "sticky top-0 z-10"
        }`}
      >
        {/* Instant LCP Poster Layer */}
        <div
          className={`absolute inset-0 z-0 select-none transition-opacity duration-700 pointer-events-none ${
            firstFrameLoaded ? "opacity-0" : "opacity-100"
          }`}
        >
          <Image
            src={getFrameUrl(0)}
            alt="Drafteados Basketball Arena"
            fill
            priority
            quality={95}
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        {/* 60 FPS 2D Canvas Engine - High-Clarity Broadcast Contrast */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block z-0 pointer-events-none will-change-transform [filter:contrast(1.03)_saturate(1.06)]"
        />

        {/* Top Navigation Scrim (Only at top for navbar legibility) */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 h-28 sm:h-32 bg-gradient-to-b from-black/60 via-black/20 to-transparent pointer-events-none z-10"
        />

        {/* Bottom Transition Scrim (Only at bottom edge for seamless blend) */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-32 sm:h-36 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/30 to-transparent pointer-events-none z-10"
        />

        {/* Subtle Lens Vignette (Center 70% is crystal-clear) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-10 pointer-events-none bg-radial-[circle_at_center,_transparent_70%,_rgba(0,0,0,0.35)_100%]"
        />

        {/* Warm Orange Brand Atmosphere Glow */}
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[800px] h-[350px] sm:h-[420px] rounded-full bg-[#FF5A1F]/12 blur-[130px] pointer-events-none z-10"
        />

        {/* Hero Foreground Content */}
        <div
          ref={beat1Ref}
          className="relative z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 max-w-5xl mx-auto w-full pt-16 sm:pt-12 select-none will-change-transform"
        >
          {/* Targeted Text Scrim: Guarantees high readability while keeping the court completely vivid */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -inset-x-6 sm:-inset-x-14 -z-10 rounded-3xl bg-radial-[ellipse_at_center,_rgba(0,0,0,0.45)_0%,_transparent_75%] pointer-events-none"
          />

          {/* Eyebrow - Pure Editorial Typography */}
          <div className="flex items-center justify-center gap-2.5 text-xs font-mono font-bold tracking-[0.25em] text-[#FF5A1F] uppercase mb-4 sm:mb-6 drop-shadow-md">
            <span className="w-2 h-0.5 bg-[#FF5A1F]" />
            <span>DESDE 2017 &bull; TU CASA NBA &bull; +880K BUQUES</span>
            <span className="w-2 h-0.5 bg-[#FF5A1F]" />
          </div>

          {/* Main Headline */}
          <h1
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight text-white leading-[0.92] drop-shadow-[0_8px_25px_rgba(0,0,0,0.85)] drop-shadow-[0_20px_60px_rgba(0,0,0,0.95)]"
            style={{ fontFamily: "var(--font-title)" }}
          >
            Bienvenidos a{" "}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FF7A45] to-[#FF5A1F] drop-shadow-[0_12px_50px_rgba(255,90,31,0.55)]">
              Tu Casa NBA
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-5 sm:mt-7 text-base sm:text-xl md:text-2xl text-zinc-100 max-w-2xl font-normal leading-relaxed drop-shadow-[0_6px_20px_rgba(0,0,0,0.95)]">
            El canal de baloncesto en español más visto del mundo. Análisis táctico de madrugada, debates que duelen en el alma y una comunidad que respira NBA los 365 días del año.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 w-full max-w-md sm:max-w-none">
            <MagneticButton
              variant="primary"
              size="lg"
              href="https://www.youtube.com/@DrafteadosNBA"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto shadow-[0_4px_30px_rgba(255,90,31,0.4)]"
            >
              <YoutubeIcon className="w-5 h-5 text-white" />
              <span>Subir al Buque en YouTube</span>
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

        {/* Premium Scroll Indicator */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-6 sm:bottom-8 z-20 flex flex-col items-center gap-2.5 pointer-events-none will-change-transform"
        >
          <span className="text-[10px] tracking-[0.35em] uppercase text-zinc-200 font-bold drop-shadow-md">
            Desliza para entrar a la pista
          </span>
          <div className="w-5 h-9 rounded-full border border-white/35 flex items-start justify-center p-1 bg-black/40 backdrop-blur-md shadow-[0_0_20px_rgba(255,90,31,0.25)]">
            <div className="w-1.5 h-2.5 rounded-full bg-gradient-to-b from-[#FF5A1F] to-[#FF8A50] animate-bounce shadow-[0_0_8px_#FF5A1F]" />
          </div>
        </div>
      </div>
    </section>
  );
}
