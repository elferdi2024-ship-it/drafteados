// filepath: src/components/hero/HeroVideoScrub.tsx
"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Users } from "lucide-react";
import { YoutubeIcon } from "@/components/ui/Icons";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Easing utility — cubic ease-out for smooth deceleration
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

// Clamp utility
function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function HeroVideoScrub() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const grainRef = useRef<HTMLDivElement>(null);

  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Scrubbing state
  const targetTimeRef = useRef(0);
  const currentProgressRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);
  const lastSeekTimeRef = useRef(0);

  // Canvas rendering for mobile (avoids iOS video seek limitations)
  const useCanvasFallback = useRef(false);
  const canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null);

  // Detect mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768 || "ontouchstart" in window;
      setIsMobile(mobile);
      useCanvasFallback.current = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Reduced motion preference
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(motionQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    motionQuery.addEventListener("change", handler);
    return () => motionQuery.removeEventListener("change", handler);
  }, []);

  // Frame-accurate seek — direct assignment, no lerp needed with every-frame keyframes
  const seekToProgress = useCallback((progress: number) => {
    const video = videoRef.current;
    if (!video || !video.duration || isNaN(video.duration)) return;

    const targetTime = progress * (video.duration - 0.05);
    const clamped = clamp(targetTime, 0, video.duration - 0.05);

    // Throttle seeks to avoid overwhelming the decoder (max ~60 seeks/s)
    const now = performance.now();
    if (now - lastSeekTimeRef.current < 16) return;
    lastSeekTimeRef.current = now;

    if (!video.seeking) {
      video.currentTime = clamped;
    }
    targetTimeRef.current = clamped;

    // Canvas fallback for iOS
    if (useCanvasFallback.current && canvasRef.current && canvasCtxRef.current) {
      try {
        canvasCtxRef.current.drawImage(
          video,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
      } catch {
        // Silently handle cross-origin or decode errors
      }
    }
  }, []);

  // Cinematic choreography — all visual effects driven by scroll progress
  const choreograph = useCallback(
    (progress: number) => {
      currentProgressRef.current = progress;

      // --- VIDEO SEEK ---
      seekToProgress(progress);

      // --- CINEMATIC ZOOM (parallax) ---
      // Video scales from 1.0 → 1.18 as you scroll
      if (videoWrapRef.current) {
        const zoom = 1 + progress * 0.18;
        videoWrapRef.current.style.transform = `scale(${zoom})`;
      }

      // --- DYNAMIC VIGNETTE ---
      // Vignette intensifies from 0.15 opacity → 0.85 as scroll progresses
      if (vignetteRef.current) {
        const vignetteIntensity = 0.15 + progress * 0.7;
        vignetteRef.current.style.opacity = vignetteIntensity.toString();
      }

      // --- GRADIENT OVERLAY SHIFT ---
      // Bottom gradient grows taller and darker during scroll
      if (overlayRef.current) {
        const overlayOpacity = 0.6 + progress * 0.4;
        overlayRef.current.style.opacity = overlayOpacity.toString();
      }

      // --- FILM GRAIN ---
      if (grainRef.current) {
        const grainOpacity = 0.03 + progress * 0.06;
        grainRef.current.style.opacity = grainOpacity.toString();
      }

      // --- TEXT CHOREOGRAPHY (staggered exit) ---
      if (
        !eyebrowRef.current ||
        !titleRef.current ||
        !subtitleRef.current ||
        !ctasRef.current ||
        !scrollIndicatorRef.current
      )
        return;

      // Phase 0 (0 → 0.08): Scroll indicator fades out fast
      const indicatorFade = clamp(1 - progress / 0.08, 0, 1);
      scrollIndicatorRef.current.style.opacity = indicatorFade.toString();
      scrollIndicatorRef.current.style.transform = `translateY(${progress * 60}px)`;

      // Phase 1 (0 → 0.5): Text elements exit with staggered timing
      if (progress < 0.05) {
        // Everything visible at rest
        eyebrowRef.current.style.opacity = "1";
        eyebrowRef.current.style.transform = "translateY(0px) scale(1)";
        titleRef.current.style.opacity = "1";
        titleRef.current.style.transform = "scale(1) translateY(0px)";
        subtitleRef.current.style.opacity = "1";
        subtitleRef.current.style.transform = "translateY(0px)";
        ctasRef.current.style.opacity = "1";
        ctasRef.current.style.transform = "scale(1) translateY(0px)";
      } else {
        // Staggered exit — each element starts fading at different times
        // CTAs go first (0.05), then subtitle (0.08), then title (0.12), then eyebrow (0.15)
        const ctaStart = 0.05;
        const subStart = 0.08;
        const titleStart = 0.12;
        const eyebrowStart = 0.15;
        const duration = 0.25; // Each element takes 25% of scroll to fully exit

        // CTA exit
        const ctaT = clamp((progress - ctaStart) / duration, 0, 1);
        const ctaEased = easeOutCubic(ctaT);
        ctasRef.current.style.opacity = (1 - ctaEased).toString();
        ctasRef.current.style.transform = `scale(${1 - ctaEased * 0.08}) translateY(${ctaEased * -40}px)`;

        // Subtitle exit
        const subT = clamp((progress - subStart) / duration, 0, 1);
        const subEased = easeOutCubic(subT);
        subtitleRef.current.style.opacity = (1 - subEased).toString();
        subtitleRef.current.style.transform = `translateY(${subEased * -60}px)`;

        // Title exit — scales UP as it fades (cinematic pull-in effect)
        const titleT = clamp((progress - titleStart) / duration, 0, 1);
        const titleEased = easeOutCubic(titleT);
        const titleScale = 1 + titleEased * 0.15;
        titleRef.current.style.opacity = (1 - titleEased).toString();
        titleRef.current.style.transform = `scale(${titleScale}) translateY(${titleEased * -70}px)`;

        // Eyebrow exit
        const eyebrowT = clamp((progress - eyebrowStart) / duration, 0, 1);
        const eyebrowEased = easeOutCubic(eyebrowT);
        eyebrowRef.current.style.opacity = (1 - eyebrowEased).toString();
        eyebrowRef.current.style.transform = `translateY(${eyebrowEased * -30}px) scale(${1 - eyebrowEased * 0.1})`;
      }
    },
    [seekToProgress]
  );

  // Initialize video
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleReady = () => {
      setIsVideoLoaded(true);
      // Set to first frame
      video.currentTime = 0;
    };

    video.addEventListener("loadeddata", handleReady);
    video.addEventListener("canplay", handleReady);

    if (video.readyState >= 2) {
      handleReady();
    }

    // Initialize canvas for iOS fallback
    if (useCanvasFallback.current && canvasRef.current) {
      canvasCtxRef.current = canvasRef.current.getContext("2d");
    }

    return () => {
      video.removeEventListener("loadeddata", handleReady);
      video.removeEventListener("canplay", handleReady);
    };
  }, []);

  // Scroll synchronization — GSAP ScrollTrigger + native fallback
  useEffect(() => {
    if (isReducedMotion) return;

    // Native scroll handler (always active, zero-dependency)
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollableDistance = rect.height - window.innerHeight;
      if (scrollableDistance <= 0) return;
      const scrolled = -rect.top;
      const progress = clamp(scrolled / scrollableDistance, 0, 1);
      choreograph(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    // GSAP ScrollTrigger for smooth scrub interpolation
    let st: ScrollTrigger | null = null;
    if (containerRef.current) {
      st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3, // Tighter scrub for more responsive feel
        onUpdate: (self) => {
          choreograph(self.progress);
        },
      });
      ScrollTrigger.refresh();
    }

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (st) st.kill();
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [isReducedMotion, choreograph]);

  return (
    <section
      ref={containerRef}
      className={`relative w-full bg-[#0A0A0A] ${
        isReducedMotion ? "h-screen" : "h-[280vh] md:h-[300vh]"
      }`}
    >
      {/* Sticky Fullscreen Viewport */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-[#0A0A0A]"
      >
        {/* Poster Frame (Instant LCP layer) */}
        <div className="absolute inset-0 z-0 select-none">
          <Image
            src="/videos/hero-poster.jpg"
            alt="Drafteados Basketball Court"
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        {/* Video Canvas — hardware accelerated, zoom-capable wrapper */}
        {!isReducedMotion && (
          <div
            ref={videoWrapRef}
            className="absolute inset-0 will-change-transform origin-center"
            style={{ transform: "scale(1)" }}
          >
            <video
              ref={videoRef}
              playsInline
              muted
              autoPlay={false}
              preload="auto"
              tabIndex={-1}
              aria-hidden="true"
              className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-500 ${
                isVideoLoaded ? "opacity-100" : "opacity-0"
              }`}
            >
              {/* WebM first — VP9 scrubs better, smaller file */}
              <source src="/videos/hero.webm" type="video/webm" />
              {/* MP4 fallback — H.264 Baseline for max compat */}
              <source src="/videos/hero.mp4" type="video/mp4" />
            </video>

            {/* Canvas fallback for iOS scrubbing */}
            {isMobile && (
              <canvas
                ref={canvasRef}
                width={1920}
                height={1080}
                aria-hidden="true"
                className={`absolute inset-0 h-full w-full object-cover ${
                  useCanvasFallback.current && isVideoLoaded
                    ? "opacity-100"
                    : "opacity-0"
                } pointer-events-none`}
              />
            )}
          </div>
        )}

        {/* Cinematic Multi-layer Gradient Overlay */}
        <div
          ref={overlayRef}
          aria-hidden="true"
          className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-black/60"
          style={{ opacity: 0.6 }}
        />

        {/* Dynamic Radial Vignette — intensifies on scroll */}
        <div
          ref={vignetteRef}
          aria-hidden="true"
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            opacity: 0.15,
            background:
              "radial-gradient(ellipse 70% 60% at 50% 45%, transparent 0%, rgba(10,10,10,0.6) 55%, rgba(10,10,10,0.95) 100%)",
          }}
        />

        {/* Film Grain Overlay */}
        <div
          ref={grainRef}
          aria-hidden="true"
          className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay"
          style={{
            opacity: 0.03,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px 128px",
          }}
        />

        {/* Orange Ambient Brand Aura */}
        <div
          aria-hidden="true"
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] md:w-[700px] h-[300px] md:h-[400px] rounded-full bg-[#FF5A1F]/12 blur-[100px] md:blur-[140px] pointer-events-none z-10 animate-pulse"
          style={{ animationDuration: "4s" }}
        />

        {/* Hero Foreground Content */}
        <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 max-w-5xl mx-auto w-full pt-16 sm:pt-12 select-none">
          {/* Eyebrow Pill */}
          <div
            ref={eyebrowRef}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-black/50 backdrop-blur-md mb-4 sm:mb-6 shadow-sm will-change-[transform,opacity]"
          >
            <span className="flex h-2 w-2 rounded-full bg-[#FF5A1F] animate-pulse" />
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-zinc-200">
              DESDE 2017 &bull; TU CASA NBA
            </span>
          </div>

          {/* Main Headline */}
          <h1
            ref={titleRef}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight text-white leading-[0.92] drop-shadow-[0_12px_40px_rgba(0,0,0,0.95)] will-change-[transform,opacity]"
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
            className="mt-5 sm:mt-7 text-base sm:text-xl md:text-2xl text-zinc-200 max-w-2xl font-normal leading-relaxed drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] will-change-[transform,opacity]"
          >
            La comunidad que vive el baloncesto como nadie. Análisis riguroso,
            debates sin filtro y pasión pura cada madrugada.
          </p>

          {/* Action CTAs */}
          <div
            ref={ctasRef}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 w-full max-w-md sm:max-w-none will-change-[transform,opacity]"
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
          className="absolute bottom-6 sm:bottom-8 z-20 flex flex-col items-center gap-2 pointer-events-none will-change-[transform,opacity]"
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
          className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0A0A0A] to-transparent z-10 pointer-events-none"
        />
      </div>
    </section>
  );
}
