"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Users, ChevronDown, Sparkles } from "lucide-react";
import { YoutubeIcon } from "@/components/ui/Icons";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function HeroVideoScrub() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  const [isVideoReady, setIsVideoReady] = useState(false);
  const [videoDuration, setVideoDuration] = useState(8.0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Video scrub smoothing states
  const targetTimeRef = useRef(0);
  const currentTimeRef = useRef(0);
  const isSeekingRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);

  // Setup seek smoothing loop via RAF
  const smoothSeekLoop = useCallback(() => {
    const video = videoRef.current;
    if (video && video.duration && !isSeekingRef.current) {
      const diff = targetTimeRef.current - currentTimeRef.current;
      
      // Interpolate with lerp factor (0.15 gives responsiveness with no stutter)
      if (Math.abs(diff) > 0.015) {
        currentTimeRef.current += diff * 0.18;
        // Clamp bounds
        currentTimeRef.current = Math.max(0, Math.min(video.duration, currentTimeRef.current));
        
        try {
          // Check fast seek / direct update without locking decoder
          video.currentTime = currentTimeRef.current;
        } catch {
          // Ignore transient DOM exceptions if stream isn't ready
        }
      }
    }
    rafIdRef.current = requestAnimationFrame(smoothSeekLoop);
  }, []);

  useEffect(() => {
    // Check reduced motion preference
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(motionQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };
    motionQuery.addEventListener("change", handleMotionChange);

    return () => {
      motionQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Handle metadata loading
    const handleLoadedMetadata = () => {
      if (video.duration && !isNaN(video.duration)) {
        setVideoDuration(video.duration);
        setIsVideoReady(true);
      }
    };

    const handleCanPlay = () => {
      setIsVideoReady(true);
    };

    const handleError = () => {
      console.warn("Video failed to load or unsupported codec, switching to fallback.");
      setHasError(true);
      setIsVideoReady(true);
    };

    // Fast check if already cached/loaded
    if (video.readyState >= 1) {
      handleLoadedMetadata();
    }

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("error", handleError);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("error", handleError);
    };
  }, []);

  // GSAP ScrollTrigger timeline setup
  useEffect(() => {
    if (!containerRef.current || !stickyRef.current || isReducedMotion || hasError) {
      return;
    }

    const container = containerRef.current;
    const sticky = stickyRef.current;
    const video = videoRef.current;

    // Start RAF smoothing loop
    rafIdRef.current = requestAnimationFrame(smoothSeekLoop);

    const ctx = gsap.context(() => {
      // Pin distance: 200vh on desktop, 140vh on mobile
      const pinDistance = () => (window.innerWidth < 768 ? "+=140%" : "+=200%");

      // Master timeline pinned to scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: pinDistance,
          pin: sticky,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const duration = video?.duration || videoDuration || 8.0;
            targetTimeRef.current = self.progress * (duration - 0.05);
          },
        },
      });

      // Initial state of text elements
      gsap.set([eyebrowRef.current, titleRef.current, subtitleRef.current, ctasRef.current], {
        transformOrigin: "center center",
      });

      // Cinematic text choreography tied to scroll progress
      // Phase 1 (0% to 35%): Intro impact text is prominent
      // Phase 2 (35% to 70%): Text subtly scales up and fades into background to let the video shine
      // Phase 3 (70% to 100%): Seamless transition layer prepares for Section 2
      tl.to(
        scrollIndicatorRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 0.15,
          ease: "power2.out",
        },
        0.05
      )
      .to(
        eyebrowRef.current,
        {
          opacity: 0,
          y: -25,
          duration: 0.25,
          ease: "power2.in",
        },
        0.35
      )
      .to(
        titleRef.current,
        {
          scale: 1.08,
          opacity: 0,
          y: -40,
          duration: 0.35,
          ease: "power2.in",
        },
        0.4
      )
      .to(
        subtitleRef.current,
        {
          opacity: 0,
          y: -20,
          duration: 0.3,
          ease: "power2.in",
        },
        0.42
      )
      .to(
        ctasRef.current,
        {
          opacity: 0,
          y: -20,
          scale: 0.95,
          duration: 0.25,
          ease: "power2.in",
        },
        0.45
      );
    }, container);

    return () => {
      ctx.revert();
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [isVideoReady, videoDuration, isReducedMotion, hasError, smoothSeekLoop]);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#0A0A0A]"
      style={{
        // 200vh + 100vh viewport = total container height for smooth scroll travel
        height: isReducedMotion ? "100vh" : undefined,
      }}
    >
      {/* Sticky Hero Viewport (Always 100vh) */}
      <div
        ref={stickyRef}
        className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-[#0A0A0A]"
      >
        {/* Background Poster (Instant LCP layer) */}
        <div className="absolute inset-0 z-0 select-none">
          <Image
            src="/videos/hero-poster.jpg"
            alt="Drafteados Basketball Court Logo"
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        {/* Video Canvas Layer (Active when supported & not reduced motion) */}
        {!isReducedMotion && !hasError && (
          <video
            ref={videoRef}
            playsInline
            muted
            preload="auto"
            tabIndex={-1}
            aria-hidden="true"
            className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-1000 ${
              isVideoReady ? "opacity-100" : "opacity-0"
            }`}
          >
            <source src="/videos/hero.webm" type="video/webm" />
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
        )}

        {/* Cinematic Multi-gradient Overlays (Guarantees AA Contrast) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/45 to-black/60"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 z-10 pointer-events-none bg-radial-[circle_at_center,_transparent_40%,_rgba(10,10,10,0.75)_100%]"
        />

        {/* Orange Ambient Brand Glow */}
        <div
          aria-hidden="true"
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] rounded-full bg-[#FF5A1F]/15 blur-[120px] pointer-events-none z-10"
        />

        {/* Hero Foreground Content */}
        <div
          ref={contentRef}
          className="relative z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 max-w-5xl mx-auto w-full pt-16 sm:pt-12 select-none"
        >
          {/* Eyebrow Pill */}
          <div
            ref={eyebrowRef}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-black/40 backdrop-blur-md mb-4 sm:mb-6 shadow-sm"
          >
            <span className="flex h-2 w-2 rounded-full bg-[#FF5A1F] animate-pulse" />
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-zinc-200">
              DESDE 2017 &bull; TU CASA NBA
            </span>
          </div>

          {/* Main Headline */}
          <h1
            ref={titleRef}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight text-white leading-[0.92] drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)]"
            style={{ fontFamily: "var(--font-title)" }}
          >
            Bienvenidos a{" "}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FF7A45] to-[#FF5A1F] drop-shadow-[0_10px_40px_rgba(255,90,31,0.4)]">
              Tu Casa NBA
            </span>
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="mt-5 sm:mt-7 text-base sm:text-xl md:text-2xl text-zinc-300 max-w-2xl font-normal leading-relaxed drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]"
          >
            La comunidad que vive el baloncesto como nadie. Análisis riguroso,
            debates sin filtro y pasión pura cada madrugada.
          </p>

          {/* Action CTAs */}
          <div
            ref={ctasRef}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 w-full max-w-md sm:max-w-none"
          >
            <MagneticButton
              variant="primary"
              size="lg"
              href="https://www.youtube.com/@Drafteados"
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

        {/* Scroll Indicator at Bottom */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-6 sm:bottom-8 z-20 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-400 font-medium">
            Haz Scroll para Entrar
          </span>
          <div className="w-5 h-8 rounded-full border border-white/25 flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="w-1.5 h-2 rounded-full bg-[#FF5A1F]"
            />
          </div>
        </div>

        {/* Seamless bottom transition gradient */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A0A] to-transparent z-10 pointer-events-none"
        />
      </div>
    </div>
  );
}
