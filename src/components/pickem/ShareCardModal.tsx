// filepath: src/components/pickem/ShareCardModal.tsx
"use client";

import { useState, useEffect, useRef } from 'react';
import { X, Copy, Check, Download, Share2, Loader2, Image as ImageIcon } from 'lucide-react';

export interface SharePickItem {
  typeName: string;
  selectionName: string;
  category?: string;
  points?: number;
  isUnderdog?: boolean;
}

interface ShareCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
  potentialPoints: number;
  picks?: SharePickItem[];
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
  fillColor?: string,
  strokeColor?: string,
  lineWidth = 1
) {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  if (fillColor) {
    ctx.fillStyle = fillColor;
    ctx.fill();
  }
  if (strokeColor) {
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  }
  ctx.restore();
}

export function ShareCardModal({
  isOpen,
  onClose,
  username,
  potentialPoints,
  picks = [],
}: ShareCardModalProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedImage, setCopiedImage] = useState(false);
  const [isGenerating, setIsGenerating] = useState(true);

  // Renderizado en Canvas 1080x1350 (formato 4:5 vertical para redes)
  useEffect(() => {
    if (!isOpen) return;

    setIsGenerating(true);
    const canvas = canvasRef.current || document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1350;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    // 1. Fondo gradiente oscuro (#0A0A0C)
    const bgGradient = ctx.createLinearGradient(0, 0, 1080, 1350);
    bgGradient.addColorStop(0, '#0E0E12');
    bgGradient.addColorStop(0.5, '#09090B');
    bgGradient.addColorStop(1, '#050507');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, 1080, 1350);

    // 2. Glow naranja en la parte superior
    const glow = ctx.createRadialGradient(540, 0, 50, 540, 0, 600);
    glow.addColorStop(0, 'rgba(255, 90, 31, 0.22)');
    glow.addColorStop(1, 'rgba(255, 90, 31, 0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, 1080, 700);

    // 3. Marco perimetral decorativo
    drawRoundedRect(
      ctx,
      36,
      36,
      1080 - 72,
      1350 - 72,
      32,
      undefined,
      'rgba(255, 90, 31, 0.25)',
      2
    );

    // 4. Header
    // Kicker
    ctx.font = 'bold 22px monospace';
    ctx.fillStyle = '#FF5A1F';
    ctx.fillText("DRAFTEADOS PICK'EM · TEMPORADA 2026/27", 72, 110);

    // Título Principal
    ctx.font = '900 46px Impact, -apple-system, sans-serif';
    ctx.fillStyle = '#F5F5F5';
    ctx.fillText('PRONÓSTICO OFICIAL DE LOS BUQUES', 72, 170);

    // Barra de Usuario & Puntos
    drawRoundedRect(ctx, 72, 205, 936, 76, 18, '#141418', 'rgba(255, 255, 255, 0.08)', 1);

    // Handle @usuario
    ctx.font = 'bold 28px -apple-system, sans-serif';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(`@${username || 'buque_anonimo'}`, 100, 252);

    // Tag Puntos Potenciales
    drawRoundedRect(ctx, 680, 217, 310, 52, 14, '#FF5A1F');
    ctx.font = 'bold 22px monospace';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(`POTENCIAL: ${potentialPoints} PTS`, 710, 251);

    // 5. Grid de picks clave (Hasta 6 picks destacados)
    const displayPicks = picks.length > 0 ? picks.slice(0, 6) : [
      { typeName: 'MVP', selectionName: 'Luka Doncic', category: 'PREMIOS', points: 25 },
      { typeName: 'CAMPEÓN NBA', selectionName: 'Boston Celtics', category: 'FINAL', points: 30 },
      { typeName: 'MÁXIMO ANOTADOR', selectionName: 'Shai Gilgeous-Alexander', category: 'STATS', points: 15 },
      { typeName: 'DPOY', selectionName: 'Victor Wembanyama', category: 'PREMIOS', points: 20 },
      { typeName: 'CAMPEÓN ESTE', selectionName: 'New York Knicks', category: 'EQUIPOS', points: 20 },
      { typeName: 'CAMPEÓN OESTE', selectionName: 'Oklahoma City Thunder', category: 'EQUIPOS', points: 20 },
    ];

    const cardW = 448;
    const cardH = 240;
    const gapX = 40;
    const gapY = 26;
    const startX = 72;
    const startY = 320;

    displayPicks.forEach((p, idx) => {
      const col = idx % 2;
      const row = Math.floor(idx / 2);
      const x = startX + col * (cardW + gapX);
      const y = startY + row * (cardH + gapY);

      // Card background
      drawRoundedRect(ctx, x, y, cardW, cardH, 22, '#151519', 'rgba(255, 255, 255, 0.1)', 1.5);

      // Top line accent
      drawRoundedRect(ctx, x + 24, y, cardW - 48, 3, 2, '#FF5A1F');

      // Category / Type Name
      ctx.font = 'bold 18px monospace';
      ctx.fillStyle = '#FF5A1F';
      ctx.fillText(p.typeName.toUpperCase(), x + 24, y + 45);

      // Points tag
      ctx.font = 'bold 16px monospace';
      ctx.fillStyle = '#8B8B8B';
      ctx.fillText(`${p.points || 15} PTS`, x + cardW - 100, y + 45);

      // Selection Name (Large)
      ctx.font = '900 32px Impact, -apple-system, sans-serif';
      ctx.fillStyle = '#FFFFFF';
      
      // Truncar si es muy largo
      let selName = p.selectionName;
      if (selName.length > 20) {
        selName = selName.substring(0, 18) + '...';
      }
      ctx.fillText(selName.toUpperCase(), x + 24, y + 115);

      // Underdog badge si aplica
      if (p.isUnderdog) {
        drawRoundedRect(ctx, x + 24, y + 155, 175, 34, 8, 'rgba(251, 191, 36, 0.15)', 'rgba(251, 191, 36, 0.5)', 1);
        ctx.font = 'bold 13px monospace';
        ctx.fillStyle = '#FBBF24';
        ctx.fillText('SORPRESA x1.5', x + 38, y + 177);
      } else {
        ctx.font = '15px -apple-system, sans-serif';
        ctx.fillStyle = '#71717A';
        ctx.fillText('Pronóstico sellado', x + 24, y + 175);
      }
    });

    // 6. Footer & Desafío Social
    const footerY = 1140;
    // Línea divisoria
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(72, footerY);
    ctx.lineTo(1008, footerY);
    ctx.stroke();

    // Call to Action
    ctx.font = '900 40px Impact, -apple-system, sans-serif';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText('¿PODÉS GANARME, BUQUE?', 72, footerY + 65);

    ctx.font = 'bold 24px monospace';
    ctx.fillStyle = '#FF5A1F';
    ctx.fillText('JUGÁ GRATIS EN DRAFTEADOS.COM/PICKEM', 72, footerY + 110);

    // Tag Drafteados Oficial
    ctx.font = 'bold 16px monospace';
    ctx.fillStyle = '#71717A';
    ctx.fillText('OFICIAL DE LOS BUQUES · 2026/27', 670, footerY + 110);

    const generatedUrl = canvas.toDataURL('image/png');
    setDataUrl(generatedUrl);
    setIsGenerating(false);
  }, [isOpen, username, potentialPoints, picks]);

  if (!isOpen) return null;

  const shareText = `¡Ya sellé mis 13 predicciones para la temporada NBA en Drafteados Pick'em! Voy por ${potentialPoints} puntos con mis pronósticos. ¿Te animás a ganarme, Buque?`;

  const handleCopyLink = () => {
    const url = window.location.origin + `/pickem`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyImage = async () => {
    if (!canvasRef.current) return;
    try {
      canvasRef.current.toBlob(async (blob) => {
        if (blob && navigator.clipboard && window.ClipboardItem) {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ]);
          setCopiedImage(true);
          setTimeout(() => setCopiedImage(false), 2500);
        }
      });
    } catch {
      handleCopyLink();
    }
  };

  const handleDownload = () => {
    if (!dataUrl) return;
    const link = document.createElement('a');
    link.download = `drafteados-pickem-${username || 'buque'}-2026.png`;
    link.href = dataUrl;
    link.click();
  };

  const handleShareTwitter = () => {
    const url = window.location.origin + `/pickem`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank');
  };

  const handleShareWhatsApp = () => {
    const url = window.location.origin + `/pickem`;
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText} ${url}`)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-xl bg-[#121212] border border-white/10 rounded-3xl p-5 sm:p-7 shadow-2xl flex flex-col max-h-[95vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10 shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-black uppercase text-[#FF5A1F] tracking-widest">
                TARJETA OFICIAL 1080×1350
              </span>
              <span className="text-[10px] font-mono text-zinc-400 bg-white/5 px-2 py-0.5 rounded">
                HISTORIAS / X
              </span>
            </div>
            <h3 className="font-title text-2xl sm:text-3xl text-[#F5F5F5] tracking-tight leading-none mt-1">
              COMPARTÍ TUS PICKS
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#8B8B8B] hover:text-white p-2 rounded-xl transition-colors bg-white/5 cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hidden Canvas for High-Resolution Export */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Card Preview (Aspect Ratio 4:5) */}
        <div className="flex-1 min-h-0 overflow-y-auto my-1 rounded-2xl border border-white/10 bg-black flex items-center justify-center p-2 relative shadow-inner">
          {isGenerating || !dataUrl ? (
            <div className="py-20 text-center space-y-2 text-zinc-400">
              <Loader2 className="w-8 h-8 text-[#FF5A1F] mx-auto animate-spin" />
              <p className="font-mono text-xs uppercase tracking-wider">Generando tarjeta en alta resolución...</p>
            </div>
          ) : (
            <img
              src={dataUrl}
              alt="Drafteados Pick'em 1080x1350 Share Card"
              className="max-h-[52vh] w-auto object-contain rounded-xl shadow-2xl"
            />
          )}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-4 shrink-0 border-t border-white/10 mt-3">
          <button
            onClick={handleDownload}
            disabled={!dataUrl}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#FF5A1F] hover:bg-[#FF6B35] text-white font-title text-base sm:text-lg tracking-wider transition-all shadow-md shadow-[#FF5A1F]/25 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>DESCARGAR</span>
          </button>

          <button
            onClick={handleCopyImage}
            disabled={!dataUrl}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#1c1c20] hover:bg-[#25252b] text-white font-title text-base sm:text-lg tracking-wider transition-colors border border-white/10 cursor-pointer"
          >
            {copiedImage ? <Check className="w-4 h-4 text-[#10B981]" /> : <ImageIcon className="w-4 h-4 text-zinc-300" />}
            <span>{copiedImage ? '¡COPIADA!' : 'COPIAR'}</span>
          </button>

          <button
            onClick={handleShareTwitter}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-black hover:bg-[#151515] text-white font-title text-base sm:text-lg tracking-wider transition-colors border border-white/20 cursor-pointer"
          >
            <span className="font-sans font-black text-sm">𝕏</span>
            <span>TWITTER</span>
          </button>

          <button
            onClick={handleShareWhatsApp}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] font-title text-base sm:text-lg tracking-wider transition-colors border border-[#25D366]/30 cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>WHATSAPP</span>
          </button>
        </div>
      </div>
    </div>
  );
}
