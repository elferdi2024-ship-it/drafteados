// filepath: src/components/sections/SocialMarqueeStrip.tsx
"use client";

import React from "react";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { YoutubeIcon, SpotifyIcon, InstagramIcon, TwitterXIcon } from "@/components/ui/Icons";
import { ShoppingBag, Plane, ExternalLink, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

interface SocialChannel {
  name: string;
  handle: string;
  badge: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
}

const SOCIAL_CHANNELS: SocialChannel[] = [
  {
    name: "YouTube",
    handle: "@DrafteadosNBA",
    badge: "+880K Buques",
    href: "https://www.youtube.com/@DrafteadosNBA",
    icon: YoutubeIcon,
    accentColor: "#FF0000",
  },
  {
    name: "3+1 Podcast",
    handle: "Daimiel & Calderón",
    badge: "Top Baloncesto",
    href: "https://open.spotify.com/show/0xkHMHfTleDMkGi0DymhMX",
    icon: SpotifyIcon,
    accentColor: "#1DB954",
  },
  {
    name: "Buques Club",
    handle: "Tienda Oficial",
    badge: "Drop Exclusivo",
    href: "https://www.buquesclub.com/",
    icon: ShoppingBag,
    accentColor: "#FF5A1F",
  },
  {
    name: "X / Twitter",
    handle: "@Drafteados",
    badge: "Directos NBA",
    href: "https://twitter.com/drafteados",
    icon: TwitterXIcon,
    accentColor: "#FFFFFF",
  },
  {
    name: "Instagram",
    handle: "@drafteados",
    badge: "Comunidad Viva",
    href: "https://instagram.com/drafteados",
    icon: InstagramIcon,
    accentColor: "#E4405F",
  },
  {
    name: "Viajes USA",
    handle: "TripDouble x Drafteados",
    badge: "Plazas Limitadas",
    href: "https://tripdouble.com/es/drafteados/",
    icon: Plane,
    accentColor: "#FF5A1F",
  },
];

export function SocialMarqueeStrip({ className }: { className?: string }) {
  return (
    <section
      aria-label="Canales y Redes Oficiales de Drafteados"
      className={cn(
        "relative z-20 py-4 sm:py-5 bg-white/95 dark:bg-[#0B0B0D] border-y border-black/10 dark:border-white/10 overflow-hidden transition-colors duration-300",
        "[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        className
      )}
    >
      <InfiniteSlider gap={24} duration={32} durationOnHover={80} reverse={false}>
        {SOCIAL_CHANNELS.map((channel) => {
          const Icon = channel.icon;
          return (
            <a
              key={channel.name}
              href={channel.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3.5 px-4 py-2.5 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/8 dark:border-white/10 hover:border-[#FF5A1F]/50 hover:bg-black/[0.06] dark:hover:bg-white/[0.08] transition-all duration-300 shadow-sm hover:shadow-[0_6px_25px_rgba(255,90,31,0.18)] hover:-translate-y-0.5 whitespace-nowrap cursor-pointer"
            >
              {/* Channel Icon */}
              <div className="w-8 h-8 rounded-xl bg-black/5 dark:bg-white/10 flex items-center justify-center text-zinc-700 dark:text-zinc-200 group-hover:text-[#FF5A1F] transition-colors shrink-0">
                <Icon className="w-4 h-4" />
              </div>

              {/* Channel Name & Handle */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white group-hover:text-[#FF5A1F] transition-colors">
                    {channel.name}
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#FF5A1F]/10 text-[#FF5A1F]">
                    {channel.badge}
                  </span>
                </div>
                <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono">
                  {channel.handle}
                </span>
              </div>

              {/* External Arrow Indicator */}
              <ExternalLink className="w-3.5 h-3.5 text-zinc-400 group-hover:text-[#FF5A1F] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-1" />
            </a>
          );
        })}
      </InfiniteSlider>
    </section>
  );
}
