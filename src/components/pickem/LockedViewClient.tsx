// filepath: src/components/pickem/LockedViewClient.tsx
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Lock, Trophy, Share2, CheckCircle2, Sparkles } from 'lucide-react';
import { ShareCardModal } from './ShareCardModal';

interface LockedPickItem {
  id: string;
  pointsAwarded: number;
  status: string;
  typeName: string;
  category: string;
  points: number;
  selectionName: string;
  selectionSub: string;
  isUnderdog?: boolean;
}

interface LockedViewClientProps {
  username: string;
  userPicks: LockedPickItem[];
  potentialPoints: number;
}

export function LockedViewClient({
  username,
  userPicks,
  potentialPoints,
}: LockedViewClientProps) {
  const [shareModalOpen, setShareModalOpen] = useState(false);

  return (
    <>
      {/* Banner Superior */}
      <div className="text-center space-y-4 mb-12">
        <div className="w-16 h-16 bg-[#FF5A1F]/15 border border-[#FF5A1F]/40 rounded-2xl flex items-center justify-center mx-auto text-[#FF5A1F] shadow-xl">
          <Lock className="w-8 h-8" />
        </div>
        <div className="inline-flex items-center gap-1.5 bg-[#181818] border border-white/10 text-xs font-semibold text-[#8B8B8B] px-3.5 py-1 rounded-full uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
          REGISTRADO OFICIALMENTE
        </div>
        <h1 className="font-title text-5xl sm:text-7xl tracking-tight text-[#F5F5F5] uppercase">
          TUS PREDICCIONES ESTÁN SELLADAS
        </h1>
        <p className="text-base sm:text-lg text-[#8B8B8B] max-w-md mx-auto">
          Ahora bancátela, Buque. Los puntos se actualizarán automáticamente a medida que se dispute la temporada regular.
        </p>

        {username && (
          <div className="text-base font-semibold text-[#FF5A1F] pt-1 font-title tracking-wider">
            @{username} · {potentialPoints} PUNTOS EN JUEGO
          </div>
        )}

        {/* Botones de acción */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <Link
            href="/pickem/leaderboard"
            className="inline-flex items-center gap-2 bg-[#181818] hover:bg-[#222222] border border-white/10 text-[#F5F5F5] font-title text-xl px-6 py-3 rounded-2xl transition-colors"
          >
            <Trophy className="w-5 h-5 text-[#FF5A1F]" />
            TABLA DE POSICIONES
          </Link>
          <button
            onClick={() => setShareModalOpen(true)}
            className="inline-flex items-center gap-2 bg-[#FF5A1F] hover:bg-[#FF6B35] text-white font-title text-xl px-8 py-3 rounded-2xl transition-transform hover:scale-105 shadow-xl shadow-[#FF5A1F]/30"
          >
            <Share2 className="w-5 h-5" />
            COMPARTIR TARJETA
          </button>
        </div>
      </div>

      {/* Lista resumen */}
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-2">
          <h2 className="font-title text-2xl text-[#F5F5F5] tracking-wide">
            RESUMEN DE TUS 13 PREDICCIONES
          </h2>
          <span className="text-xs text-[#8B8B8B] font-semibold">
            {userPicks.length}/13 BLOQUEADAS
          </span>
        </div>

        {userPicks.length === 0 ? (
          <div className="bg-[#111111] border border-white/10 rounded-2xl p-8 text-center text-sm text-[#8B8B8B]">
            No tenés predicciones bloqueadas para esta temporada todavía.{' '}
            <Link href="/pickem/picks" className="text-[#FF5A1F] hover:underline font-bold">
              Hacé tus predicciones acá.
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {userPicks.map((pick, i) => (
              <div
                key={pick.id || i}
                className="sports-card rounded-2xl p-4 flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#8B8B8B]">
                      {pick.category}
                    </span>
                    <span className="text-xs text-[#555555]">•</span>
                    <span className="text-xs text-[#FF5A1F] font-title">{pick.points} PUNTOS</span>
                    {pick.isUnderdog && (
                      <span className="badge-underdog text-[9px] font-black px-1.5 py-0.2 rounded flex items-center gap-0.5">
                        <Sparkles className="w-2.5 h-2.5" />
                        x1.5
                      </span>
                    )}
                  </div>
                  <div className="font-title text-xl text-[#F5F5F5] leading-tight">
                    {pick.typeName}
                  </div>
                  <div className="text-sm font-bold text-white mt-1">
                    {pick.selectionName}
                  </div>
                  <div className="text-xs text-[#8B8B8B]">
                    {pick.selectionSub}
                  </div>
                </div>

                <div className="w-9 h-9 rounded-xl bg-[#181818] border border-white/10 flex items-center justify-center text-[#10B981]">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Share Card Modal */}
      <ShareCardModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        username={username}
        potentialPoints={potentialPoints}
      />
    </>
  );
}
