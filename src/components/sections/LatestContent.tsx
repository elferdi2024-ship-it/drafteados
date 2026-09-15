// filepath: src/components/sections/LatestContent.tsx
"use client";

import React, { useRef, useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import { Play, Clock, ArrowUpRight, ChevronLeft, ChevronRight, Flame, Sparkles } from "lucide-react";
import { YoutubeIcon } from "@/components/ui/Icons";
import { LATEST_VIDEOS, VideoItem } from "@/data/drafteados";
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

  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const filteredVideos = useMemo(() => {
    if (selectedCategory === "Todos") return LATEST_VIDEOS;
    return LATEST_VIDEOS.filter((v) => v.category === selectedCategory);
  }, [selectedCategory]);

  // GSAP Entrance Transition from Hero: y: 70 -> 0, opacity: 0 -> 1, power3.out
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.from(containerRef.current, {
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          end: "top 45%",
          toggleActions: "play none none reverse",
        },
        y: 60,
        opacity: 0,
        duration: 1.0,
        ease: "power3.out",
      });
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
      id="contenidos"
      ref={sectionRef}
      className="relative z-20 py-20 sm:py-28 bg-[#FF5A1F] text-white overflow-hidden selection:bg-black selection:text-white"
    >
      {/* Decorative Brand Text Backdrop */}
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
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-[0.25em] text-white/95 uppercase mb-3">
              <span className="w-2 h-0.5 bg-white" />
              <span>01 &bull; CONTENIDO RECIENTE &bull; YOUTUBE</span>
            </div>

            <h2
              className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-white tracking-tight leading-[0.95]"
              style={{ fontFamily: "var(--font-title)" }}
            >
              ÚLTIMOS VÍDEOS &amp; PIZARRA
            </h2>
            <p className="mt-3 text-white/95 text-base sm:text-lg max-w-2xl font-normal leading-relaxed">
              La actualidad de la NBA explicada con análisis táctico, scouting de futuro y el calor
              del chat de madrugada. Todo el contenido oficial de la Casa.
            </p>
          </div>

          {/* Carousel Action Controls */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <a
              href="https://www.youtube.com/@DrafteadosNBA/videos"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black text-white hover:bg-zinc-900 transition-all text-sm font-semibold shadow-lg hover:scale-105 active:scale-[0.98]"
            >
              <YoutubeIcon className="w-4 h-4 text-[#FF5A1F]" />
              <span>Canal en YouTube</span>
              <ArrowUpRight className="w-4 h-4 text-zinc-400" />
            </a>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollByAmount("left")}
                disabled={!canScrollLeft}
                aria-label="Vídeo anterior"
                className="w-11 h-11 rounded-full bg-black/40 hover:bg-black/80 disabled:opacity-30 disabled:hover:bg-black/40 transition-all flex items-center justify-center border border-white/20 backdrop-blur-md shadow-md focus:outline-none cursor-pointer"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                type="button"
                onClick={() => scrollByAmount("right")}
                disabled={!canScrollRight}
                aria-label="Vídeo siguiente"
                className="w-11 h-11 rounded-full bg-black/40 hover:bg-black/80 disabled:opacity-30 disabled:hover:bg-black/40 transition-all flex items-center justify-center border border-white/20 backdrop-blur-md shadow-md focus:outline-none cursor-pointer"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Filters Pill Bar */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-4 mb-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer shrink-0 border ${
                selectedCategory === cat
                  ? "bg-black text-white border-black shadow-md scale-105"
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
              className="flex-shrink-0 w-[300px] sm:w-[360px] md:w-[380px]"
              style={{ scrollSnapAlign: "start" }}
            >
              <a
                href={video.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                draggable={false}
                className={`group relative flex flex-col rounded-2xl overflow-hidden bg-black/95 border transition-all duration-300 hover:shadow-[0_20px_45px_rgba(0,0,0,0.6)] hover:-translate-y-2 focus:outline-none ${
                  video.featured
                    ? "border-amber-400/50 shadow-[0_0_25px_rgba(251,191,36,0.2)] ring-1 ring-amber-400/30"
                    : "border-white/15 hover:border-white/40"
                }`}
              >
                {/* 16:9 Thumbnail Container */}
                <div className="relative aspect-video w-full overflow-hidden bg-zinc-950">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    sizes="(max-width: 768px) 300px, 380px"
                    loading={idx < 3 ? "eager" : "lazy"}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Dark subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30" />

                  {/* Badges Container */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    {video.featured && (
                      <span className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-400 text-black text-[10px] font-black uppercase tracking-wider shadow-md">
                        <Sparkles className="w-3 h-3 fill-black" />
                        DESTACADO
                      </span>
                    )}
                    <span className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/15 text-[10px] font-bold uppercase tracking-wider text-white">
                      {video.category}
                    </span>
                  </div>

                  {/* Duration Pill */}
                  <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/85 text-[11px] font-mono font-semibold text-white border border-white/10">
                    <Clock className="w-3 h-3 text-[#FF5A1F]" />
                    <span>{video.duration}</span>
                  </div>

                  {/* Play Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/35 backdrop-blur-[2px]">
                    <div className="w-14 h-14 rounded-full bg-[#FF5A1F] text-white flex items-center justify-center shadow-2xl transform scale-75 group-hover:scale-100 transition-transform duration-300 border border-white/20">
                      <Play className="w-6 h-6 fill-white ml-0.5" />
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 bg-[#111113]">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-zinc-400 mb-2 font-medium">
                      <span>{formatViews(video.views)} reproducciones</span>
                      <span>&bull;</span>
                      <span className="text-zinc-300 font-semibold">{video.date}</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#FF7A45] transition-colors leading-snug line-clamp-2">
                      {video.title}
                    </h3>

                    <p className="mt-1.5 text-xs text-zinc-400 line-clamp-2 leading-relaxed font-normal">
                      {video.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-bold text-zinc-300 group-hover:text-white transition-colors">
                    <span className="flex items-center gap-1.5">
                      <YoutubeIcon className="w-4 h-4 text-[#FF5A1F]" />
                      Ver vídeo completo
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-[#FF5A1F] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
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
