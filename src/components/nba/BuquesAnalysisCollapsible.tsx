// filepath: src/components/nba/BuquesAnalysisCollapsible.tsx
"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, BookOpen } from "lucide-react";

interface BuquesAnalysisCollapsibleProps {
  paragraphs: string[];
  primaryColor?: string;
}

export function BuquesAnalysisCollapsible({
  paragraphs,
  primaryColor,
}: BuquesAnalysisCollapsibleProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!paragraphs || paragraphs.length === 0) return null;

  const firstParagraph = paragraphs[0];
  const remainingParagraphs = paragraphs.slice(1);
  const hasMore = remainingParagraphs.length > 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[var(--hub-text)]">
        <BookOpen
          className="w-4 h-4"
          style={{ color: primaryColor || "var(--color-brand-primary)" }}
        />
        <span>EL ANÁLISIS DE DRAFTEADOS</span>
        {hasMore && (
          <span className="text-[10px] font-mono text-[var(--hub-text-dim)] ml-auto">
            {isExpanded ? `${paragraphs.length} párrafos` : "Lectura rápida"}
          </span>
        )}
      </div>

      <div className="relative text-[var(--hub-text-secondary)] text-sm sm:text-base leading-relaxed space-y-4">
        {/* Primer párrafo siempre visible */}
        <p className="text-justify sm:text-left text-[var(--hub-text)] font-normal">
          {firstParagraph}
        </p>

        {/* Párrafos restantes cuando está expandido */}
        {isExpanded &&
          remainingParagraphs.map((p, idx) => (
            <p
              key={idx}
              className="text-justify sm:text-left animate-in fade-in duration-300"
            >
              {p}
            </p>
          ))}

        {/* Gradiente de fade si está colapsado y hay más contenido */}
        {!isExpanded && hasMore && (
          <div
            className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none bg-gradient-to-t from-[var(--hub-surface)] to-transparent"
            aria-hidden="true"
          />
        )}
      </div>

      {/* Botón toggle */}
      {hasMore && (
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider py-2 px-3.5 rounded-xl border border-[var(--hub-border)] bg-[var(--hub-surface-2)] text-[var(--hub-text)] hover:bg-[var(--hub-border)]/30 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
          style={{
            borderColor: isExpanded ? primaryColor : undefined,
          }}
          aria-expanded={isExpanded}
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-3.5 h-3.5" />
              <span>Mostrar menos</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-3.5 h-3.5" />
              <span>Leer análisis completo ({remainingParagraphs.length} párrafos más)</span>
            </>
          )}
        </button>
      )}
    </div>
  );
}
