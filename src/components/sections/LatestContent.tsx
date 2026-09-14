"use client";

import React from "react";
import Image from "next/image";
import { Play, Eye, Clock, ArrowUpRight } from "lucide-react";
import { YoutubeIcon } from "@/components/ui/Icons";
import { LATEST_VIDEOS } from "@/data/drafteados";
import { formatViews } from "@/lib/utils";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function LatestContent() {
  return (
    <section
      id="contenidos"
      className="relative z-20 py-24 sm:py-32 bg-[#0A0A0A] border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF5A1F]/10 border border-[#FF5A1F]/20 text-[#FF5A1F] text-xs font-semibold uppercase tracking-widest mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F]" />
              ESTO ES LO QUE SE ESTÁ HABLANDO AHORA
            </div>
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase text-white tracking-tight"
              style={{ fontFamily: "var(--font-title)" }}
            >
              Lo Último en la Casa
            </h2>
            <p className="mt-2 text-zinc-400 text-base sm:text-lg max-w-xl">
              Análisis post-partido, polémicas del día, debates calientes y scouting
              minucioso de las estrellas de la NBA.
            </p>
          </div>

          <div className="self-start md:self-end">
            <MagneticButton
              variant="outline"
              size="md"
              href="https://www.youtube.com/@Drafteados/videos"
              target="_blank"
              rel="noopener noreferrer"
              className="gap-2"
            >
              <span>Ver todos los vídeos</span>
              <ArrowUpRight className="w-4 h-4 text-[#FF5A1F]" />
            </MagneticButton>
          </div>
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {LATEST_VIDEOS.map((video, idx) => (
            <a
              key={video.id}
              href={video.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col rounded-2xl overflow-hidden bg-[#121212] border border-white/10 hover:border-[#FF5A1F]/40 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(255,90,31,0.15)] hover:-translate-y-1"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-video w-full overflow-hidden bg-zinc-900">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Category Badge */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-semibold uppercase tracking-wider text-zinc-200">
                  {video.category}
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded bg-black/80 text-[11px] font-mono font-medium text-zinc-200">
                  <Clock className="w-3 h-3 text-[#FF5A1F]" />
                  <span>{video.duration}</span>
                </div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-full bg-[#FF5A1F] text-white flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-zinc-400 mb-2.5">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-zinc-500" />
                      {formatViews(video.views)} views
                    </span>
                    <span>&bull;</span>
                    <span>{video.date}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-[#FF5A1F] transition-colors leading-snug line-clamp-2">
                    {video.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-zinc-400 line-clamp-2 leading-relaxed">
                    {video.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-zinc-400 group-hover:text-white transition-colors">
                  <span className="flex items-center gap-1.5">
                    <YoutubeIcon className="w-4 h-4 text-[#FF5A1F]" />
                    Ver en YouTube
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-[#FF5A1F] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
