"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Users } from "lucide-react";
import { YoutubeIcon } from "@/components/ui/Icons";

// Register ScrollTrigger and expose globally for DevTools inspection
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  (window as unknown as Record<string, unknown>).gsap = gsap;
  (window as unknown as Record<string, unknown>).ScrollTrigger = ScrollTrigger;
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

  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const targetTimeRef = useRef(0);
  const isSeekingRef = useRef(false);
  const hasPrimedRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);

  // Sync scroll progress with target playback time and text dissolution
  const syncProgress = useCallback((progress: number) => {
    const video = videoRef.current;
    if (video && video.duration && !isNaN(video.duration)) {
      targetTimeRef.current = progress * Math.max(0.1, video.duration - 0.05);
    } else {
      targetTimeRef.current = progress * (8.0 - 0.05);
    }

    // Scroll indicator fades out before 15% progress
    if (scrollIndicatorRef.current) {
      const indOpacity = Math.max(0, 1 - progress * 7);
      scrollIndicatorRef.current.style.opacity = indOpacity.toString();
      scrollIndicatorRef.current.style.transform = `translateY(${progress * 30}px)`;
    }

    // Text dissolution between 30% and 55% progress
    if (eyebrowRef.current && titleRef.current && subtitleRef.current && ctasRef.current) {
      if (progress < 0.30) {
        eyebrowRef.current.style.opacity = "1";
        eyebrowRef.current.style.transform = "translateY(0px)";
        titleRef.current.style.opacity = "1";
        titleRef.current.style.transform = "scale(1) translateY(0px)";
        subtitleRef.current.style.opacity = "1";
        subtitleRef.current.style.transform = "translateY(0px)";
        ctasRef.current.style.opacity = "1";
        ctasRef.current.style.transform = "scale(1) translateY(0px)";
      } else if (progress <= 0.55) {
        const norm = (progress - 0.30) / 0.25; // normalized 0 to 1
        const opacity = Math.max(0, 1 - norm).toString();
        const scale = (1 + norm * 0.08).toString();
        const translateY = `${-norm * 35}px`;

        eyebrowRef.current.style.opacity = opacity;
        eyebrowRef.current.style.transform = `translateY(${-norm * 20}px)`;

        titleRef.current.style.opacity = opacity;
        titleRef.current.style.transform = `scale(${scale}) translateY(${translateY})`;

        subtitleRef.current.style.opacity = opacity;
        subtitleRef.current.style.transform = `translateY(${translateY})`;

        ctasRef.current.style.opacity = opacity;
        ctasRef.current.style.transform = `scale(${1 - norm * 0.04}) translateY(${-norm * 20}px)`;
      } else {
        eyebrowRef.current.style.opacity = "0";
        titleRef.current.style.opacity = "0";
        subtitleRef.current.style.opacity = "0";
        ctasRef.current.style.opacity = "0";
      }
    }
  }, []);

  // Lerp seek loop running on requestAnimationFrame
  const performSeek = useCallback(() => {
    const video = videoRef.current;
    if (video && video.duration && !isNaN(video.duration)) {
      const target = targetTimeRef.current;
      const current = video.currentTime;
      const diff = target - current;

      if (Math.abs(diff) > 0.025 && !video.seeking && !isSeekingRef.current) {
        isSeekingRef.current = true;
        const next = current + diff * 0.28; // Lerp factor
        video.currentTime = Math.max(0, Math.min(video.duration - 0.04, next));
      }
    }

    rafIdRef.current = requestAnimationFrame(performSeek);
  }, []);

  // Listen for prefers-reduced-motion
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(motionQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    motionQuery.addEventListener("change", handler);
    return () => motionQuery.removeEventListener("change", handler);
  }, []);

  // Decoder Priming: executed ONLY ONCE on initial load to wake hardware decoder
  const primeDecoder = useCallback(() => {
    if (hasPrimedRef.current) return;
    hasPrimedRef.current = true;
    setIsVideoLoaded(true);

    const video = videoRef.current;
    if (video) {
      video.play().then(() => {
        video.pause();
        if (targetTimeRef.current === 0) {
          video.currentTime = 0;
        }
      }).catch(() => {
        // Autoplay policy fallback
      });
    }
  }, []);

  // Video initialization and seeked listener
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleSeeked = () => {
      isSeekingRef.current = false;
    };

    video.addEventListener("seeked", handleSeeked);

    if (video.readyState >= 2) {
      primeDecoder();
    } else {
      video.load();
    }

    return () => {
      video.removeEventListener("seeked", handleSeeked);
    };
  }, [primeDecoder]);

  // Dual Scroll Integration: GSAP ScrollTrigger + Native Scroll Fallback
  useEffect(() => {
    if (isReducedMotion) return;

    rafIdRef.current = requestAnimationFrame(performSeek);

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
        isReducedMotion ? "h-screen" : "h-[125vh] md:h-[160vh]"
      }`}
    >
      {/* Sticky Fullscreen Viewport (CSS sticky only, no pin: true) */}
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

        {/* Video Canvas (H.264 All-Intra video) */}
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
            onLoadedData={primeDecoder}
            onCanPlay={() => setIsVideoLoaded(true)}
            className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${
              isVideoLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

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
