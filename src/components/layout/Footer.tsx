"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SOCIAL_LINKS } from "@/data/drafteados";
import { ArrowUp, Send, Check } from "lucide-react";
import { YoutubeIcon, InstagramIcon, TwitterXIcon, SpotifyIcon } from "@/components/ui/Icons";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-20 bg-[#070708] border-t border-white/10 pt-20 pb-12 overflow-hidden text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-white/10">
          {/* Col 1: Brand & Claim */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="relative w-11 h-11 rounded-full overflow-hidden transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/images/logo.png"
                  alt="Drafteados"
                  fill
                  sizes="48px"
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span
                  className="text-2xl font-black tracking-wider text-white uppercase group-hover:text-[#FF5A1F] transition-colors"
                  style={{ fontFamily: "var(--font-title)" }}
                >
                  Drafteados
                </span>
                <span className="text-[10px] tracking-[0.25em] text-zinc-400 uppercase font-medium">
                  Tu Casa NBA &bull; Desde 2017
                </span>
              </div>
            </Link>

            <p className="mt-4 text-sm text-zinc-400 leading-relaxed max-w-sm">
              La plataforma de referencia en español para los verdaderos
              enamorados del baloncesto. Análisis táctico, podcast y comunidad
              viva.
            </p>

            <div className="mt-6 flex items-center gap-3">
              {SOCIAL_LINKS.map((item) => {
                let icon = <span className="text-xs font-bold">{item.name[0]}</span>;
                if (item.name === "YouTube") icon = <YoutubeIcon className="w-4 h-4" />;
                if (item.name === "Instagram") icon = <InstagramIcon className="w-4 h-4" />;
                if (item.name.includes("X")) icon = <TwitterXIcon className="w-4 h-4" />;
                if (item.name === "Spotify") icon = <SpotifyIcon className="w-4 h-4" />;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.name}
                    className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-[#FF5A1F] hover:border-[#FF5A1F]/50 hover:bg-[#FF5A1F]/10 transition-all"
                  >
                    {icon}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Col 2: Contenidos */}
          <div className="lg:col-span-2">
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4">
              Contenidos
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#contenidos" className="hover:text-white transition-colors">
                  Últimos vídeos
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@Drafteados/playlists"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Debates NBA
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@Drafteados"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Especiales Draft
                </a>
              </li>
              <li>
                <a
                  href="https://open.spotify.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  3+1 Podcast
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Universo */}
          <div className="lg:col-span-2">
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4">
              Universo
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#universo" className="hover:text-white transition-colors">
                  Buques Club
                </a>
              </li>
              <li>
                <a href="#universo" className="hover:text-white transition-colors">
                  Viajes a EE.UU.
                </a>
              </li>
              <li>
                <a href="#universo" className="hover:text-white transition-colors">
                  Campus &amp; Eventos
                </a>
              </li>
              <li>
                <a href="#comunidad" className="hover:text-white transition-colors">
                  Comunidad Buques
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div className="lg:col-span-4">
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-3">
              Newsletter de la Madrugada
            </h4>
            <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
              Recibe cada viernes el resumen con los mejores análisis, avisos de drops
              exclusivos y plazas para los viajes a la NBA.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
                <Check className="w-4 h-4" />
                <span>¡Te has unido a la Newsletter de la Casa!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-[#121212] border border-white/10 text-white placeholder-zinc-600 text-xs focus:outline-none focus:border-[#FF5A1F]"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-[#FF5A1F] hover:bg-[#FF6D38] text-white font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Unirme</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Credits & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-6">
            <span>&copy; {new Date().getFullYear()} Drafteados S.L. Todos los derechos reservados.</span>
            <a href="#" className="hover:text-white transition-colors">
              Aviso Legal
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Privacidad &amp; Cookies
            </a>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <span>Volver arriba</span>
            <ArrowUp className="w-4 h-4 text-[#FF5A1F]" />
          </button>
        </div>
      </div>
    </footer>
  );
}
