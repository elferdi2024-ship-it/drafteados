// filepath: src/components/nba/BuquesVideoEmbed.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

interface BuquesVideoEmbedProps {
  youtubeId: string;
  title: string;
}

export function BuquesVideoEmbed({ youtubeId, title }: BuquesVideoEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (isPlaying) {
    return (
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-[var(--hub-border)] shadow-md bg-black">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      </div>
    );
  }

  return (
    <div
      onClick={() => setIsPlaying(true)}
      className="group relative w-full aspect-video rounded-2xl overflow-hidden border border-[var(--hub-border)] shadow-md bg-[var(--hub-surface-2)] cursor-pointer select-none"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setIsPlaying(true);
        }
      }}
      aria-label={`Reproducir análisis de YouTube: ${title}`}
    >
      <Image
        src={`https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`}
        alt={title}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20 group-hover:from-black/75 transition-colors" />

      {/* Centered Glowing Play Button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[var(--color-brand-primary)] text-white flex items-center justify-center shadow-[var(--shadow-glow-orange)] transition-transform duration-300 group-hover:scale-110 group-active:scale-95">
          <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-current ml-1" />
        </div>
      </div>

      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-2">
        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-white bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
          ▶ Reproducir vídeo
        </span>
        <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 bg-black/60 backdrop-blur-md px-2.5 py-1.5 rounded-lg">
          YouTube Oficial
        </span>
      </div>
    </div>
  );
}
