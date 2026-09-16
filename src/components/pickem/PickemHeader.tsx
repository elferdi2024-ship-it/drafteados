// filepath: src/components/pickem/PickemHeader.tsx
"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, User, LogOut, Trophy } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { AuthModal } from './AuthModal';
import type { User as SupabaseUser } from '@supabase/supabase-js';

interface Profile {
  username: string;
  display_name: string | null;
  avatar_url: string | null;
}

export function PickemHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
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
          .from('profiles')
          .select('username, display_name, avatar_url')
          .eq('id', user.id)
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
          .from('profiles')
          .select('username, display_name, avatar_url')
          .eq('id', currentUser.id)
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
    window.location.href = '/pickem';
  };

  const openAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
    setIsOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#080808]/90 backdrop-blur-xl border-b border-[#282828]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Brand */}
            <div className="flex items-center gap-6">
              <Link href="/pickem" className="flex items-center gap-2 group">
                <span className="font-title text-2xl tracking-tight text-[#F5F5F5] group-hover:text-white transition-colors">
                  DRAFTEADOS
                </span>
                <span className="bg-[#FF5A1F] text-white font-title text-sm tracking-widest px-2 py-0.5 rounded-sm">
                  PICK'EM
                </span>
              </Link>

              {/* Navigation links */}
              <nav className="hidden md:flex items-center gap-5 text-sm font-medium">
                <Link href="/pickem/picks" className="text-[#8B8B8B] hover:text-[#F5F5F5] transition-colors">
                  Picks
                </Link>
                <Link href="/pickem/leaderboard" className="text-[#8B8B8B] hover:text-[#F5F5F5] transition-colors flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5 text-[#FF5A1F]" />
                  Ranking
                </Link>
              </nav>
            </div>

            {/* Right: Desktop Actions */}
            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2.5 bg-[#181818] hover:bg-[#222222] border border-[#282828] py-1.5 px-3 rounded-xl transition-colors"
                  >
                    <div className="w-7 h-7 rounded-full bg-[#FF5A1F]/20 border border-[#FF5A1F]/40 flex items-center justify-center text-[#FF5A1F] font-title text-sm">
                      {profile?.username ? profile.username.substring(0, 2).toUpperCase() : <User className="w-4 h-4" />}
                    </div>
                    <span className="text-sm font-semibold text-[#F5F5F5]">
                      @{profile?.username || 'buque'}
                    </span>
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-[#111111] border border-[#282828] rounded-xl shadow-2xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                      <Link
                        href={`/pickem/profile/${profile?.username || 'me'}`}
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-[#F5F5F5] hover:bg-[#181818] transition-colors"
                      >
                        <User className="w-4 h-4 text-[#8B8B8B]" />
                        Mi Perfil
                      </Link>
                      <Link
                        href="/pickem/picks"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-[#F5F5F5] hover:bg-[#181818] transition-colors"
                      >
                        <span className="text-[#FF5A1F] font-bold">13</span>
                        Mis Predicciones
                      </Link>
                      <div className="border-t border-[#282828] my-1" />
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        Cerrar Sesión
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <button 
                    onClick={() => openAuth('login')}
                    className="text-sm font-medium text-[#8B8B8B] hover:text-[#F5F5F5] transition-colors px-2 py-1"
                  >
                    INICIAR SESIÓN
                  </button>
                  <Link 
                    href="/pickem/picks"
                    className="bg-[#FF5A1F] hover:bg-[#FF6B35] text-white font-title text-lg tracking-wider px-6 py-2 rounded-md transition-colors"
                  >
                    JUGAR AHORA
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-[#8B8B8B] hover:text-[#F5F5F5] p-2"
                aria-label="Abrir menú"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden bg-[#111111] border-b border-[#282828]">
            <div className="px-4 pt-3 pb-6 space-y-3">
              <Link 
                href="/pickem/picks"
                onClick={() => setIsOpen(false)}
                className="block text-[#F5F5F5] font-semibold text-base py-2"
              >
                Mis Picks
              </Link>
              <Link 
                href="/pickem/leaderboard"
                onClick={() => setIsOpen(false)}
                className="block text-[#8B8B8B] font-semibold text-base py-2"
              >
                Ranking Global
              </Link>

              <div className="border-t border-[#282828] pt-3" />

              {user ? (
                <div className="space-y-3">
                  <div className="text-sm text-[#8B8B8B]">
                    Conectado como <span className="text-white font-bold">@{profile?.username || 'buque'}</span>
                  </div>
                  <Link
                    href={`/pickem/profile/${profile?.username || 'me'}`}
                    onClick={() => setIsOpen(false)}
                    className="block text-sm text-[#F5F5F5] py-1"
                  >
                    Ver mi Perfil
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left text-sm text-red-400 py-1"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              ) : (
                <div className="space-y-3 pt-2">
                  <button 
                    onClick={() => openAuth('login')}
                    className="w-full text-center text-sm font-medium text-[#8B8B8B] hover:text-[#F5F5F5] py-2 border border-[#282828] rounded-md transition-colors"
                  >
                    INICIAR SESIÓN
                  </button>
                  <Link 
                    href="/pickem/picks"
                    className="block text-center bg-[#FF5A1F] hover:bg-[#FF6B35] text-white font-title text-xl tracking-wider px-6 py-3 rounded-md transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    JUGAR AHORA
                  </Link>
                </div>
              )}
            </div>
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
