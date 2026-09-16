// filepath: src/components/pickem/ShareCardModal.tsx
"use client";

import { useState } from 'react';
import { X, Copy, Check, Download, Share2 } from 'lucide-react';

interface ShareCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
  potentialPoints: number;
}

export function ShareCardModal({
  isOpen,
  onClose,
  username,
  potentialPoints,
}: ShareCardModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const ogUrl = `/api/og/pickem?username=${encodeURIComponent(username)}&points=${potentialPoints}&season=2026/27`;
  const shareText = `¡Ya sellé mis 13 predicciones para la temporada NBA 2026/27 en Drafteados Pick'em! Voy por ${potentialPoints} puntos. ¿Te animás a ganarme, Buque?`;

  const handleCopyLink = () => {
    const url = window.location.origin + `/pickem/profile/${username}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareTwitter = () => {
    const url = window.location.origin + `/pickem/profile/${username}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank');
  };

  const handleShareWhatsApp = () => {
    const url = window.location.origin + `/pickem/profile/${username}`;
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText} ${url}`)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-2xl bg-[#141414] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
          <div>
            <span className="text-[11px] font-black uppercase text-[#FF5A1F] tracking-widest">
              TARJETA OFICIAL
            </span>
            <h3 className="font-title text-3xl text-[#F5F5F5] tracking-tight">
              COMPARTÍ TUS PICKS
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#8B8B8B] hover:text-white p-2 rounded-xl transition-colors bg-white/5"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Card Preview Image */}
        <div className="rounded-2xl overflow-hidden border border-white/15 shadow-2xl mb-6 bg-black">
          <img
            src={ogUrl}
            alt="Drafteados Pick'em Share Card"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={handleCopyLink}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#1f1f1f] hover:bg-[#282828] text-white font-title text-lg tracking-wider transition-colors border border-white/5"
          >
            {copied ? <Check className="w-4 h-4 text-[#10B981]" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? '¡COPIADO!' : 'COPIAR ENLACE'}</span>
          </button>

          <button
            onClick={handleShareTwitter}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#000000] hover:bg-[#111111] text-white font-title text-lg tracking-wider transition-colors border border-white/20"
          >
            <span className="font-sans font-black text-sm">𝕏</span>
            <span>COMPARTIR EN X</span>
          </button>

          <button
            onClick={handleShareWhatsApp}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] font-title text-lg tracking-wider transition-colors border border-[#25D366]/30"
          >
            <Share2 className="w-4 h-4" />
            <span>WHATSAPP</span>
          </button>
        </div>
      </div>
    </div>
  );
}
