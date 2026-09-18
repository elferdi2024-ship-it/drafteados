"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, User, LogOut, Trophy, ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { AuthModal } from "./AuthModal";
import { ThemeToggle } from "@/components/theme";
import type { User as SupabaseUser } from "@supabase/supabase-js";

interface Profile {
  username: string;
  display_name: string | null;
  avatar_url: string | null;
}

export function PickemHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const supabase = createClient();

  useEffect(() => {

    async function loadUser() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        const { data } = await supabase
          .from("profiles")
          .select("username, display_name, avatar_url")
          .eq("id", user.id)
          .single();
        if (data) {
          setProfile(data);
        }
      }
    }

    loadUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        const { data } = await supabase
          .from("profiles")
          .select("username, display_name, avatar_url")
          .eq("id", currentUser.id)
          .single();
        if (data) {
          setProfile(data);
        }
      } else {
        setProfile(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    setUserMenuOpen(false);
    window.location.href = "/pickem";
  };

  const openAuth = (mode: "login" | "signup") => {
    setAuthMode(mode);
    setAuthModalOpen(true);
    setIsOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/90 dark:bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-black/10 dark:border-white/10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18">
            {/* Left: Brand Logo & Title */}
            <div className="flex items-center gap-6">
              <Link
                href="/"
                className="flex items-center gap-3 group focus:outline-none"
                aria-label="Drafteados - Inicio"
              >
                <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-full overflow-hidden transition-transform duration-300 group-hover:scale-105 group-hover:rotate-6 border border-black/10 dark:border-white/10">
                  <Image
                    src="/images/logo.png"
                    alt="Drafteados Logo"
                    fill
                    priority
                    sizes="48px"
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-xl sm:text-2xl font-black tracking-wider uppercase group-hover:text-[#FF5A1F] transition-colors text-zinc-900 dark:text-white"
                      style={{ fontFamily: "var(--font-title)" }}
                    >
                      Drafteados
                    </span>
                    <span
                      className="bg-[#FF5A1F] text-white font-black text-[11px] sm:text-xs tracking-widest px-2 py-0.5 rounded-md uppercase"
                      style={{ fontFamily: "var(--font-title)" }}
                    >
                      PICK'EM
                    </span>
                  </div>
                  <span className="text-[9px] tracking-[0.25em] uppercase -mt-0.5 font-medium text-zinc-500 dark:text-zinc-400 hidden sm:block">
                    Pronóstico Oficial de los Buques
                  </span>
                </div>
              </Link>

              {/* Navigation links */}
              <nav className="hidden md:flex items-center gap-1 lg:gap-2">
                <Link
                  href="/nba"
                  className="px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider text-zinc-700 dark:text-zinc-200 hover:text-[#FF5A1F] dark:hover:text-[#FF5A1F] transition-colors font-medium"
                >
                  NBA Hub
                </Link>
                <Link
                  href="/pickem/picks"
                  className="px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider text-zinc-700 dark:text-zinc-200 hover:text-[#FF5A1F] dark:hover:text-[#FF5A1F] transition-colors"
                >
                  Tablero de Picks
                </Link>
                <Link
                  href="/pickem/leaderboard"
                  className="px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider text-zinc-700 dark:text-zinc-200 hover:text-[#FF5A1F] dark:hover:text-[#FF5A1F] transition-colors"
                >
                  Clasificación
                </Link>
                <Link
                  href="/"
                  className="px-3 py-1.5 text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 hover:text-[#FF5A1F] transition-colors flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Volver a la Web</span>
                </Link>
              </nav>
            </div>

            {/* Right: Theme Toggle & User Actions */}
            <div className="hidden md:flex items-center gap-3">
              {/* Theme Toggle */}
              <ThemeToggle size="sm" />

              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2.5 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 py-1.5 px-3 rounded-full transition-colors cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-full bg-[#FF5A1F]/20 border border-[#FF5A1F]/40 flex items-center justify-center text-[#FF5A1F] font-title text-sm">
                      {profile?.username ? profile.username.substring(0, 2).toUpperCase() : <User className="w-4 h-4" />}
                    </div>
                    <span className="text-sm font-semibold text-zinc-900 dark:text-white">
                      @{profile?.username || "buque"}
                    </span>
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#121212] border border-black/10 dark:border-white/10 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                      <Link
                        href={`/pickem/profile?u=${profile?.username || "me"}`}
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-zinc-800 dark:text-zinc-200 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                      >
                        <User className="w-4 h-4 text-zinc-400" />
                        Mi Perfil
                      </Link>
                      <Link
                        href="/pickem/picks"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-zinc-800 dark:text-zinc-200 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                      >
                        <span className="text-[#FF5A1F] font-bold">13</span>
                        Mis Predicciones
                      </Link>
                      <div className="border-t border-black/5 dark:border-white/10 my-1" />
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-500 hover:bg-red-500/10 transition-colors text-left cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        Cerrar Sesión
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openAuth("login")}
                    className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-colors px-3 py-2 cursor-pointer"
                  >
                    Iniciar Sesión
                  </button>
                  <button
                    onClick={() => openAuth("signup")}
                    className="bg-[#FF5A1F] hover:bg-[#FF7A45] text-white text-xs font-mono font-bold uppercase tracking-wider px-4 py-2 rounded-full transition-all shadow-md shadow-[#FF5A1F]/20 cursor-pointer active:scale-95"
                  >
                    Crear Cuenta
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Actions */}
            <div className="flex md:hidden items-center gap-2">
              <ThemeToggle size="sm" />

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-zinc-700 dark:text-zinc-200 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors focus:outline-none"
                aria-label="Menú móvil"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-black/10 dark:border-white/10 bg-white/95 dark:bg-[#0A0A0A]/95 backdrop-blur-2xl px-4 pt-4 pb-8 space-y-3 animate-in fade-in slide-in-from-top-4 duration-200">
            <Link
              href="/nba"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between px-4 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-zinc-900 dark:text-white font-title text-xl tracking-wide uppercase active:scale-98 transition-transform"
            >
              <span>NBA Hub</span>
              <span className="font-mono text-xs text-[#FF5A1F]">→</span>
            </Link>

            <Link
              href="/pickem/picks"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between px-4 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-zinc-900 dark:text-white font-title text-xl tracking-wide uppercase active:scale-98 transition-transform"
            >
              <span>Tablero de Pronósticos</span>
              <span className="font-mono text-xs text-[#FF5A1F]">→</span>
            </Link>

            <Link
              href="/pickem/leaderboard"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between px-4 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-zinc-900 dark:text-white font-title text-xl tracking-wide uppercase active:scale-98 transition-transform"
            >
              <span>Tabla de Clasificación</span>
              <span className="font-mono text-xs text-zinc-400">→</span>
            </Link>

            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-zinc-600 dark:text-zinc-300 font-mono text-xs uppercase tracking-wider"
            >
              <ArrowLeft className="w-4 h-4 text-zinc-400" />
              <span>Volver a la Web Principal</span>
            </Link>

            {user ? (
              <div className="pt-2 border-t border-black/10 dark:border-white/10 space-y-2">
                <div className="flex items-center gap-3 px-4 py-2 text-sm text-zinc-500 dark:text-zinc-400">
                  <User className="w-4 h-4 text-[#FF5A1F]" />
                  <span>Conectado como <strong className="text-zinc-900 dark:text-white">@{profile?.username || "buque"}</strong></span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red-500/10 text-red-500 font-mono text-xs uppercase tracking-wider font-bold"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Cerrar Sesión</span>
                </button>
              </div>
            ) : (
              <div className="pt-2 border-t border-black/10 dark:border-white/10 grid grid-cols-2 gap-2">
                <button
                  onClick={() => openAuth("login")}
                  className="w-full py-3 rounded-xl border border-black/10 dark:border-white/15 bg-black/5 dark:bg-white/5 text-zinc-900 dark:text-white font-mono text-xs uppercase tracking-wider font-bold"
                >
                  Iniciar Sesión
                </button>
                <button
                  onClick={() => openAuth("signup")}
                  className="w-full py-3 rounded-xl bg-[#FF5A1F] text-white font-mono text-xs uppercase tracking-wider font-bold shadow-lg shadow-[#FF5A1F]/20"
                >
                  Crear Cuenta
                </button>
              </div>
            )}
          </div>
        )}
      </header>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultMode={authMode}
      />
    </>
  );
}
