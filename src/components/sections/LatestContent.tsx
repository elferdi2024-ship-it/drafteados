// filepath: src/components/sections/LatestContent.tsx
"use client";

import React, { useRef, useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import { Play, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { YoutubeIcon } from "@/components/ui/Icons";
import { LATEST_VIDEOS, VideoItem } from "@/data/drafteados";
import { getLatestVideos } from "@/lib/youtube";
import { formatViews } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CATEGORIES = ["Todos", "Análisis NBA", "3+1 Podcast", "Debates", "Scouting"];

export function LatestContent() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const [videos, setVideos] = useState<VideoItem[]>(LATEST_VIDEOS);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Fetch from YouTube service on mount (uses API if configured, fallback otherwise)
  useEffect(() => {
    let isMounted = true;
    getLatestVideos(12).then((res) => {
      if (isMounted && res.videos.length > 0) {
        setVideos(res.videos);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredVideos = useMemo(() => {
    if (selectedCategory === "Todos") return videos;
    return videos.filter((v) => v.category === selectedCategory);
  }, [selectedCategory, videos]);

  // Consistent GSAP Entrance Transition from Hero
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !containerRef.current) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: section,
            start: "top 92%",
            once: true,
          },
          y: 0,
          opacity: 1,
          duration: 1.05,
          ease: "power3.out",
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  // Update scroll boundaries & active dot index
  const handleScroll = useCallback(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    setCanScrollLeft(slider.scrollLeft > 20);
    setCanScrollRight(slider.scrollLeft < slider.scrollWidth - slider.clientWidth - 20);

    const cardWidth = 360;
    const currentIdx = Math.round(slider.scrollLeft / cardWidth);
    setActiveIndex(Math.min(filteredVideos.length - 1, Math.max(0, currentIdx)));
  }, [filteredVideos.length]);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    slider.addEventListener("scroll", handleScroll, { passive: true });
    return () => slider.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Reset scroll on category change
  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.scrollTo({ left: 0, behavior: "smooth" });
    }
    setActiveIndex(0);
  }, [selectedCategory]);

  // Smooth Navigation Buttons
  const scrollByAmount = (direction: "left" | "right") => {
    const slider = sliderRef.current;
    if (!slider) return;
    const distance = direction === "left" ? -400 : 400;
    slider.scrollBy({ left: distance, behavior: "smooth" });
  };

  // Mouse Drag to Scroll
  const handleMouseDown = (e: React.MouseEvent) => {
    const slider = sliderRef.current;
    if (!slider) return;
    setIsDragging(true);
    setStartX(e.pageX - slider.offsetLeft);
    setScrollLeftState(slider.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const slider = sliderRef.current;
    if (!slider) return;
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 1.6;
    slider.scrollLeft = scrollLeftState - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Autoplay slider when not hovered
  useEffect(() => {
    if (isHovered || isDragging) return;
    const interval = setInterval(() => {
      const slider = sliderRef.current;
      if (!slider) return;
      if (slider.scrollLeft >= slider.scrollWidth - slider.clientWidth - 10) {
        slider.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        slider.scrollBy({ left: 360, behavior: "smooth" });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovered, isDragging]);

  return (
    <section
      ref={sectionRef}
      id="contenidos"
      className="relative z-20 pt-10 sm:pt-24 pb-10 sm:pb-20 scroll-mt-16 sm:scroll-mt-20 bg-gradient-to-b from-[#FF5A1F] to-[#E04810] transition-colors duration-300 overflow-hidden content-auto"
    >
      {/* Cinematic Watermark Typography */}
      <div
        aria-hidden="true"
        className="absolute -top-10 left-0 right-0 overflow-hidden select-none pointer-events-none opacity-10"
      >
        <span
          className="text-[140px] sm:text-[220px] font-black uppercase tracking-tight text-black whitespace-nowrap block"
          style={{ fontFamily: "var(--font-title)" }}
        >
          DRAFTEADOS &bull; TU CASA NBA &bull; BUQUES
        </span>
      </div>

      <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-4 sm:mb-8 gap-3 sm:gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-[0.25em] text-white/95 uppercase mb-1.5 sm:mb-3">
              <span className="w-2 h-0.5 bg-white" />
              <span>01 &bull; ¿QUÉ HACEMOS? &bull; YOUTUBE</span>
            </div>

            <h2
              className="text-3xl sm:text-6xl lg:text-7xl font-black uppercase text-white tracking-tight leading-[0.95]"
              style={{ fontFamily: "var(--font-title)" }}
            >
              ÚLTIMOS VÍDEOS &amp; ANÁLISIS
            </h2>
            <p className="mt-1.5 sm:mt-3 text-white/95 text-xs sm:text-base max-w-2xl font-normal leading-relaxed line-clamp-2 sm:line-clamp-none">
              Acercamos la cultura NBA a los aficionados hispanohablantes. Cobertura diaria en temporada regular y playoffs.
            </p>
          </div>

          {/* Carousel Action Controls (Desktop Only - Mobile swipes natively) */}
          <div className="hidden md:flex items-center gap-3 self-end">
            <a
              href="https://www.youtube.com/@DrafteadosNBA/videos"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black text-white hover:bg-zinc-900 transition-all text-xs font-mono font-bold uppercase tracking-wider shadow-md hover:scale-105 active:scale-[0.98] border border-white/10"
            >
              <YoutubeIcon className="w-4 h-4 text-[#FF5A1F]" />
              <span>Canal YouTube</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
            </a>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollByAmount("left")}
                disabled={!canScrollLeft}
                aria-label="Vídeo anterior"
                className="w-10 h-10 rounded-xl bg-black/40 hover:bg-black/80 disabled:opacity-30 disabled:hover:bg-black/40 transition-all flex items-center justify-center border border-white/20 backdrop-blur-md shadow-md focus:outline-none cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              <button
                type="button"
                onClick={() => scrollByAmount("right")}
                disabled={!canScrollRight}
                aria-label="Vídeo siguiente"
                className="w-10 h-10 rounded-xl bg-black/40 hover:bg-black/80 disabled:opacity-30 disabled:hover:bg-black/40 transition-all flex items-center justify-center border border-white/20 backdrop-blur-md shadow-md focus:outline-none cursor-pointer"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Filters Bar */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2 sm:pb-4 mb-2 sm:mb-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer shrink-0 border ${
                selectedCategory === cat
                  ? "bg-black text-white border-black shadow-sm"
                  : "bg-black/15 text-white/90 border-white/15 hover:bg-black/25 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Horizontal Marquee / Carrusel Slider */}
        <div
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={() => {
            handleMouseUp();
            setIsHovered(false);
          }}
          onMouseEnter={() => setIsHovered(true)}
          className={`flex gap-5 sm:gap-6 overflow-x-auto scrollbar-none pb-6 pt-2 select-none -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 cursor-grab ${
            isDragging ? "cursor-grabbing scroll-auto" : "scroll-smooth"
          }`}
          style={{ scrollSnapType: isDragging ? "none" : "x mandatory" }}
        >
          {filteredVideos.map((video: VideoItem, idx: number) => (
            <div
              key={video.id}
              className="flex-shrink-0 w-[260px] sm:w-[360px] md:w-[380px]"
              style={{ scrollSnapAlign: "start" }}
            >
              <a
                href={video.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                draggable={false}
                className="group relative flex flex-col rounded-2xl overflow-hidden bg-[#111113] border border-white/15 hover:border-white/40 transition-all duration-300 hover:shadow-[0_20px_45px_rgba(0,0,0,0.6)] hover:-translate-y-1.5 focus:outline-none"
              >
                {/* 16:9 Thumbnail Container - 100% Clean & Cinematic */}
                <div className="relative aspect-video w-full overflow-hidden bg-zinc-950">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    sizes="(max-width: 768px) 260px, 380px"
                    loading={idx < 3 ? "eager" : "lazy"}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Dark subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                  {/* Clean Duration Badge in Mono (Bottom Right) */}
                  <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/90 text-[10px] sm:text-[11px] font-mono font-bold text-white tracking-wider border border-white/10 backdrop-blur-sm">
                    {video.duration}
                  </div>

                  {/* Play Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30 backdrop-blur-[2px]">
                    <div className="w-12 h-12 rounded-full bg-[#FF5A1F] text-white flex items-center justify-center shadow-2xl transform scale-75 group-hover:scale-100 transition-transform duration-300 border border-white/20">
                      <Play className="w-4 h-4 fill-white ml-0.5" />
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-3 sm:p-5 flex flex-col justify-between flex-1 bg-[#111113]">
                  <div>
                    {/* Metadata Header: Category & Editorial Highlights */}
                    <div className="flex items-center justify-between gap-2 mb-1.5 sm:mb-2 text-[10px] sm:text-[11px] font-mono">
                      <div className="flex items-center gap-1.5 uppercase tracking-wider">
                        <span className="font-bold text-[#FF7A45]">{video.category}</span>
                        {video.featured && (
                          <>
                            <span className="text-zinc-600">&bull;</span>
                            <span className="font-bold text-amber-400">DESTACADO</span>
                          </>
                        )}
                      </div>
                      <span className="text-zinc-400 font-medium">{video.date}</span>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-[#FF7A45] transition-colors leading-snug line-clamp-2 min-h-[2.5rem]">
                      {video.title}
                    </h3>
                  </div>

                  <div className="mt-2.5 sm:mt-4 pt-2 sm:pt-3 border-t border-white/10 flex items-center justify-between text-[11px] sm:text-xs font-mono text-zinc-400">
                    <span>{formatViews(video.views)} views</span>
                    <span className="flex items-center gap-1 font-bold text-zinc-300 group-hover:text-[#FF7A45] transition-colors">
                      <span>Ver vídeo</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {filteredVideos.map((_, dotIdx) => (
            <button
              key={dotIdx}
              type="button"
              onClick={() => {
                const slider = sliderRef.current;
                if (!slider) return;
                slider.scrollTo({ left: dotIdx * 360, behavior: "smooth" });
              }}
              aria-label={`Ir al vídeo ${dotIdx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                dotIdx === activeIndex ? "w-8 bg-black" : "w-2 bg-black/30 hover:bg-black/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

