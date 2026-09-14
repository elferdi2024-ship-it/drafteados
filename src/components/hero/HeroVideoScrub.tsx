"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Users } from "lucide-react";
import { YoutubeIcon } from "@/components/ui/Icons";

// Ensure ScrollTrigger registration and attach to window for debugging
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  (window as unknown as { gsap: typeof gsap; ScrollTrigger: typeof ScrollTrigger }).gsap = gsap;
  (window as unknown as { gsap: typeof gsap; ScrollTrigger: typeof ScrollTrigger }).ScrollTrigger = ScrollTrigger;
}

export function HeroVideoScrub() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Target time and seek lock
  const targetTimeRef = useRef(0);
  const isSeekingRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);

  // Smooth seek loop using requestAnimationFrame
  const performSeek = useCallback(() => {
    const video = videoRef.current;
    if (video && video.duration && !isNaN(video.duration)) {
      const target = targetTimeRef.current;
      const current = video.currentTime;
      const diff = target - current;

      // Only seek if difference is noticeable and decoder is not busy
      if (Math.abs(diff) > 0.02 && !video.seeking && !isSeekingRef.current) {
        isSeekingRef.current = true;
        
        // Use lerp interpolation for buttery smooth transitions
        const nextTime = current + diff * 0.25;
        const clampedTime = Math.max(0, Math.min(video.duration - 0.05, nextTime));
        
        video.currentTime = clampedTime;
      }
    }
    rafIdRef.current = requestAnimationFrame(performSeek);
  }, []);

  // Sync function that sets the target scrubbing position
  const syncProgress = useCallback((progress: number) => {
    const video = videoRef.current;
    const duration = (video && video.duration && !isNaN(video.duration)) ? video.duration : 8.0;
    targetTimeRef.current = progress * Math.max(0.1, duration - 0.05);

    // Direct text choreography based on progress
    if (eyebrowRef.current && titleRef.current && subtitleRef.current && ctasRef.current && scrollIndicatorRef.current) {
      // Phase 1 (0 to 0.15): Scroll indicator fades out
      const indicatorOpacity = Math.max(0, 1 - progress * 8);
      scrollIndicatorRef.current.style.opacity = indicatorOpacity.toString();
      scrollIndicatorRef.current.style.transform = `translateY(${progress * 40}px)`;

      // Phase 2 (0.15 to 0.55): Text scales up and fades out smoothly
      if (progress < 0.15) {
        eyebrowRef.current.style.opacity = "1";
        eyebrowRef.current.style.transform = "translateY(0px)";
        titleRef.current.style.opacity = "1";
        titleRef.current.style.transform = "scale(1) translateY(0px)";
        subtitleRef.current.style.opacity = "1";
        subtitleRef.current.style.transform = "translateY(0px)";
        ctasRef.current.style.opacity = "1";
        ctasRef.current.style.transform = "scale(1) translateY(0px)";
      } else {
        const textProgress = Math.min(1, (progress - 0.15) / 0.4);
        const fadeOut = Math.max(0, 1 - textProgress * 1.3);
        const scaleUp = 1 + textProgress * 0.1;
        const translateY = -textProgress * 50;

        eyebrowRef.current.style.opacity = fadeOut.toString();
        eyebrowRef.current.style.transform = `translateY(${translateY * 0.6}px)`;

        titleRef.current.style.opacity = fadeOut.toString();
        titleRef.current.style.transform = `scale(${scaleUp}) translateY(${translateY}px)`;

        subtitleRef.current.style.opacity = fadeOut.toString();
        subtitleRef.current.style.transform = `translateY(${translateY * 0.8}px)`;

        ctasRef.current.style.opacity = fadeOut.toString();
        ctasRef.current.style.transform = `scale(${1 - textProgress * 0.05}) translateY(${translateY * 0.5}px)`;
      }
    }
  }, []);

  // Listen for prefers-reduced-motion
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(motionQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    motionQuery.addEventListener("change", handler);
    return () => motionQuery.removeEventListener("change", handler);
  }, []);

  // Initialize and prime video decoder
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleSeeked = () => {
      isSeekingRef.current = false;
    };

    const handleLoadedData = () => {
      setIsVideoLoaded(true);
      // Prime decoder by attempting a play and immediate pause
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            video.pause();
            video.currentTime = 0;
          })
          .catch(() => {
            // Autoplay policy restriction is expected in some browsers
          });
      }
    };

    video.addEventListener("seeked", handleSeeked);
    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("canplay", handleLoadedData);

    // If video is already cached or ready
    if (video.readyState >= 2) {
      handleLoadedData();
    }

    return () => {
      video.removeEventListener("seeked", handleSeeked);
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("canplay", handleLoadedData);
    };
  }, []);

  // Scroll synchronization: Dual layer (GSAP ScrollTrigger + Native Wheel/Scroll fallback)
  useEffect(() => {
    if (isReducedMotion) return;

    // Start requestAnimationFrame seek loop
    rafIdRef.current = requestAnimationFrame(performSeek);

    // Native scroll calculation fallback (runs instantly and independently of any library)
    const handleNativeScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const maxDistance = rect.height - window.innerHeight;
      if (maxDistance <= 0) return;
      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / maxDistance));
      syncProgress(progress);
    };

    window.addEventListener("scroll", handleNativeScroll, { passive: true });
    window.addEventListener("resize", handleNativeScroll, { passive: true });

    // GSAP ScrollTrigger integration
    let st: ScrollTrigger | null = null;
    if (containerRef.current) {
      st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: (self) => {
          syncProgress(self.progress);
        },
      });
      ScrollTrigger.refresh();
    }

    // Trigger initial progress check
    handleNativeScroll();

    return () => {
      window.removeEventListener("scroll", handleNativeScroll);
      window.removeEventListener("resize", handleNativeScroll);
      if (st) st.kill();
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [isReducedMotion, performSeek, syncProgress]);

  return (
    <section
      ref={containerRef}
      className={`relative w-full bg-[#0A0A0A] ${
        isReducedMotion ? "h-screen" : "h-[220vh] md:h-[260vh]"
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

        {/* Video Canvas (Hardware accelerated H.264 / WebM) */}
        {!isReducedMotion && (
          <video
            ref={videoRef}
            src="/videos/hero.mp4"
            playsInline
            muted
            autoPlay={false}
            preload="auto"
            tabIndex={-1}
            aria-hidden="true"
            className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${
              isVideoLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        {/* Cinematic Multi-layer Gradient Overlays for Guaranteed AA Contrast */}
        <div
          ref={overlayRef}
          aria-hidden="true"
          className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-black/60"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 z-10 pointer-events-none bg-radial-[circle_at_center,_transparent_40%,_rgba(10,10,10,0.8)_100%]"
        />

        {/* Orange Ambient Brand Aura */}
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
