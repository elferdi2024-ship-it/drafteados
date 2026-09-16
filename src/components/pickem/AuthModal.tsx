// filepath: src/components/pickem/AuthModal.tsx
"use client";

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { X, Mail, Lock, Loader2, ArrowRight, CheckCircle2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'login' | 'signup';
  redirectTo?: string;
}

export function AuthModal({ isOpen, onClose, defaultMode = 'login', redirectTo = '/pickem/picks' }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup'>(defaultMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  if (!isOpen) return null;

  const supabase = createClient();

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError(null);
      const origin = window.location.origin;
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${origin}/auth/callback?next=${encodeURIComponent(redirectTo)}`,
        },
      });
      if (error) throw error;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al iniciar con Google');
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      setLoading(true);
      setError(null);

      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(redirectTo)}`,
          },
        });
        if (error) throw error;
        setMagicLinkSent(true);
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        onClose();
        window.location.reload();
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error en la autenticación');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-[#111111] border border-[#282828] rounded-2xl p-6 md:p-8 shadow-2xl text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#8B8B8B] hover:text-[#F5F5F5] transition-colors p-1 rounded-lg"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {magicLinkSent ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-[#FF5A1F]/10 border border-[#FF5A1F]/30 rounded-2xl flex items-center justify-center mx-auto text-[#FF5A1F]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="font-title text-3xl tracking-tight text-[#F5F5F5]">¡REVISÁ TU CORREO!</h2>
            <p className="text-[#8B8B8B] text-sm max-w-xs mx-auto">
              Te enviamos un enlace de confirmación a <span className="text-[#F5F5F5] font-semibold">{email}</span>. Hacé clic para entrar a la cancha.
            </p>
            <button
              onClick={onClose}
              className="mt-4 inline-flex items-center justify-center bg-[#181818] hover:bg-[#222222] text-[#F5F5F5] font-title text-lg px-6 py-2 rounded-lg border border-[#282828]"
            >
              ENTENDIDO
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-title text-xl tracking-tight text-[#F5F5F5]">DRAFTEADOS</span>
                <span className="bg-[#FF5A1F] text-white font-title text-xs tracking-widest px-1.5 py-0.5 rounded-sm">
                  PICK'EM
                </span>
              </div>
              <h2 className="font-title text-3xl md:text-4xl tracking-tight text-[#F5F5F5]">
                {mode === 'login' ? 'IDENTIFICATE, BUQUE' : 'SUMATE AL JUEGO'}
              </h2>
              <p className="text-sm text-[#8B8B8B] mt-1">
                {mode === 'login'
                  ? 'Entrá para salvar tus picks y pelear en el leaderboard.'
                  : 'Creá tu cuenta gratis y demostrá quién manda en la NBA.'}
              </p>
            </div>

            {error && (
              <div className="mb-5 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs leading-relaxed">
                {error}
              </div>
            )}

            {/* Google OAuth Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-white hover:bg-neutral-100 text-[#111111] font-semibold text-sm py-3 px-4 rounded-xl transition-all hover:scale-[1.01] active:scale-[0.99] mb-5 disabled:opacity-50 shadow-sm"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
                />
                <path
                  fill="#4285F4"
                  d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3 0-.8.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15.2c0 2.8.7 5.5 1.9 7.9l3.7-2.9z"
                />
                <path
                  fill="#34A853"
                  d="M12 23.5c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2-6.4-4.8L1.9 16.9C3.7 20.6 7.5 23.5 12 23.5z"
                />
              </svg>
              Continuar con Google
            </button>

            <div className="relative flex items-center justify-center mb-5">
              <div className="border-t border-[#282828] w-full" />
              <span className="bg-[#111111] px-3 text-xs text-[#8B8B8B] uppercase tracking-wider">
                o con correo
              </span>
            </div>

            {/* Email Form */}
            <form onSubmit={handleEmailAuth} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-[#8B8B8B] uppercase tracking-wider mb-1.5">
                  Correo electrónico
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B8B8B]" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="buque@ejemplo.com"
                    className="w-full bg-[#181818] border border-[#282828] focus:border-[#FF5A1F] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#F5F5F5] placeholder-[#666666] outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#8B8B8B] uppercase tracking-wider mb-1.5">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B8B8B]" />
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mínimo 6 caracteres"
                    className="w-full bg-[#181818] border border-[#282828] focus:border-[#FF5A1F] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#F5F5F5] placeholder-[#666666] outline-none transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-[#FF5A1F] hover:bg-[#FF6B35] text-white font-title text-xl tracking-wider py-3 rounded-xl transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 mt-2"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <span>{mode === 'login' ? 'ENTRAR A LA CANCHA' : 'CREAR CUENTA'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Toggle Mode */}
            <div className="mt-6 text-center text-xs text-[#8B8B8B]">
              {mode === 'login' ? (
                <>
                  ¿No tenés cuenta todavía?{' '}
                  <button
                    type="button"
                    onClick={() => { setMode('signup'); setError(null); }}
                    className="text-[#FF5A1F] hover:underline font-semibold"
                  >
                    Registrate acá
                  </button>
                </>
              ) : (
                <>
                  ¿Ya tenés cuenta?{' '}
                  <button
                    type="button"
                    onClick={() => { setMode('login'); setError(null); }}
                    className="text-[#FF5A1F] hover:underline font-semibold"
                  >
                    Iniciá sesión
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
