// filepath: src/components/pickem/LockModal.tsx
"use client";

import { useState } from 'react';
import { Lock, Loader2, ArrowRight, Flame, ShieldAlert, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  isPending: boolean;
  lockError: string | null;
  potentialPoints: number;
  underdogCount: number;
}

export function LockModal({
  isOpen,
  onClose,
  onConfirm,
  isPending,
  lockError,
  potentialPoints,
  underdogCount,
}: LockModalProps) {
  const [lockedStamped, setLockedStamped] = useState(false);

  if (!isOpen) return null;

  const handleLockClick = async () => {
    // 1. Confetti explosion with Drafteados brand colors (Orange, White, Dark)
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FF5A1F', '#FFFFFF', '#141414', '#FFA366'],
        disableForReducedMotion: true,
      });
    } catch {}

    setLockedStamped(true);
    await onConfirm();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-[#141414] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#FF5A1F]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Lock / Stamp Icon */}
        <div className="relative mb-6 flex justify-center">
          {lockedStamped ? (
            <div className="animate-stamp inline-block stamp-badge font-title text-4xl px-7 py-2 rounded-xl uppercase tracking-widest font-black">
              SELLADO
            </div>
          ) : (
            <div className="w-16 h-16 bg-[#FF5A1F]/15 border border-[#FF5A1F]/40 rounded-2xl flex items-center justify-center text-[#FF5A1F] shadow-lg">
              <Lock className="w-8 h-8" />
            </div>
          )}
        </div>

        {/* Title & Copy */}
        <div className="text-center space-y-3 mb-6">
          <h2 className="font-title text-4xl sm:text-5xl tracking-tight text-[#F5F5F5] uppercase leading-[0.95]">
            AHORA BANCÁTELA
          </h2>
          <p className="text-sm text-[#A1A1AA] leading-relaxed max-w-sm mx-auto">
            Una vez que confirmás el bloqueo, <span className="text-white font-bold">no hay vuelta atrás</span>. Cero modificaciones, cero excusas. Tus 13 predicciones quedan selladas oficialmente para la temporada regular.
          </p>
        </div>

        {/* Potential Score Summary Box */}
        <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-4 mb-6 flex items-center justify-around text-center">
          <div>
            <div className="text-[10px] uppercase font-bold text-[#8B8B8B] tracking-wider mb-1">
              PUNTOS EN JUEGO
            </div>
            <div className="font-title text-3xl text-[#FF5A1F] flex items-center justify-center gap-1 font-black">
              <span>{potentialPoints}</span>
              <span className="text-sm text-[#A1A1AA]">PTS</span>
            </div>
          </div>

          <div className="w-px h-10 bg-white/10" />

          <div>
            <div className="text-[10px] uppercase font-bold text-[#8B8B8B] tracking-wider mb-1">
              SORPRESA (x1.5)
            </div>
            <div className="font-title text-3xl text-[#FBBF24] flex items-center justify-center gap-1 font-black">
              <Sparkles className="w-4 h-4 text-[#FBBF24]" />
              <span>{underdogCount}</span>
            </div>
          </div>
        </div>

        {lockError && (
          <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs text-center">
            {lockError}
          </div>
        )}

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="py-3.5 px-4 rounded-xl border border-white/10 text-sm font-semibold text-[#8B8B8B] hover:text-white hover:bg-white/5 transition-colors"
          >
            SEGUIR EDITANDO
          </button>

          <button
            type="button"
            onClick={handleLockClick}
            disabled={isPending}
            className="py-3.5 px-4 rounded-xl bg-[#FF5A1F] hover:bg-[#FF6B35] disabled:opacity-50 text-white font-title text-2xl tracking-wider transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-[#FF5A1F]/30"
          >
            {isPending ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <span>CONFIRMAR</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
