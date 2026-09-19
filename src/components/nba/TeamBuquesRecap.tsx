// filepath: src/components/nba/TeamBuquesRecap.tsx
import React from "react";
import type { BuquesRecap, BuquesQuote, BuquesSpeaker } from "@/types/buques-recap";
import { Button } from "@/components/ui/Button";
import { YoutubeIcon } from "@/components/ui/Icons";
import { BuquesVideoEmbed } from "./BuquesVideoEmbed";
import {
  Quote,
  UserPlus,
  UserMinus,
  CheckCircle2,
} from "lucide-react";

interface TeamBuquesRecapProps {
  recap: BuquesRecap | null | undefined;
}

function formatSpeaker(speaker: BuquesSpeaker): { label: string; bg: string; text: string } {
  const s = String(speaker).toLowerCase();
  if (s === "sergio") {
    return { label: "Sergio", bg: "bg-blue-500/15 border-blue-500/30", text: "text-blue-500 dark:text-blue-400" };
  }
  if (s === "jose") {
    return { label: "José", bg: "bg-emerald-500/15 border-emerald-500/30", text: "text-emerald-500 dark:text-emerald-400" };
  }
  return { label: "Sergio & José", bg: "bg-[var(--color-brand-primary)]/15 border-[var(--color-brand-primary)]/30", text: "text-[var(--color-brand-primary)]" };
}

function formatMovementType(type: string): { label: string; className: string } {
  const t = type.toLowerCase();
  if (t === "trade") {
    return { label: "TRASPASO", className: "bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30" };
  }
  if (t === "fa") {
    return { label: "AGENTE LIBRE", className: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30" };
  }
  if (t === "draft") {
    return { label: "DRAFT", className: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30" };
  }
  return { label: type.toUpperCase(), className: "bg-zinc-500/15 text-zinc-600 dark:text-zinc-400 border-zinc-500/30" };
}

export function TeamBuquesRecap({ recap }: TeamBuquesRecapProps) {
  if (!recap) return null;

  // Seleccionar 2-3 quotes representativas
  const quotesToDisplay: BuquesQuote[] =
    recap.quotes && recap.quotes.length > 0
      ? recap.quotes.slice(0, 3)
      : (recap.personality_lines?.slice(0, 3) ?? []);

  // Párrafos del análisis editorial
  const paragraphs = recap.analysis ? recap.analysis.split("\n\n").filter(Boolean) : [];

  return (
    <section
      aria-label="Narrativa Buques"
      className="rounded-3xl border border-[var(--hub-border)] bg-[var(--hub-surface)] p-6 sm:p-10 shadow-sm relative overflow-hidden space-y-8"
    >
      {/* Accent Brand Gradient Bar */}
      <div
        className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[var(--color-brand-primary)] via-[#FF8A50] to-[var(--color-brand-primary)]"
        aria-hidden="true"
      />

      {/* Header: Eyebrow + Title + One Liner */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-[var(--color-brand-primary)]/15 border border-[var(--color-brand-primary)]/30 text-[var(--color-brand-primary)]">
            <span className="w-2 h-2 rounded-full bg-[var(--color-brand-primary)]" />
            {recap.eyebrow || "GUÍA BUQUES · 26/27"}
          </span>

          {recap.season && (
            <span className="text-xs font-mono font-medium text-[var(--hub-text-dim)] uppercase px-2.5 py-0.5 rounded-md bg-[var(--hub-surface-2)] border border-[var(--hub-border)]">
              {recap.season}
            </span>
          )}

          {recap.confidence && (
            <span className="text-[11px] font-mono uppercase text-emerald-600 dark:text-emerald-400 ml-auto hidden sm:inline-block">
              Análisis Verificado
            </span>
          )}
        </div>

        <h2
          className="text-2xl sm:text-4xl lg:text-5xl font-black text-[var(--hub-text)] uppercase tracking-tight leading-tight"
          style={{ fontFamily: "var(--hub-font-display)" }}
        >
          {recap.title}
        </h2>

        {/* One Liner Callout */}
        {recap.one_liner && (
          <div className="border-l-4 border-[var(--color-brand-primary)] bg-[var(--color-brand-primary)]/[0.06] p-4 sm:p-5 rounded-r-2xl">
            <p className="text-sm sm:text-base font-medium text-[var(--hub-text)] leading-relaxed italic">
              "{recap.one_liner}"
            </p>
          </div>
        )}
      </div>

      {/* Main Grid: Left Column (Analysis & Quotes) + Right Column (Video & Market Movements) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Editorial Analysis */}
          <div className="space-y-4 text-[var(--hub-text-secondary)] text-sm sm:text-base leading-relaxed">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-brand-primary)]">
              <span className="w-2.5 h-0.5 bg-[var(--color-brand-primary)]" />
              <span>EL ANÁLISIS DE DRAFTEADOS</span>
            </div>
            {paragraphs.map((p, idx) => (
              <p key={idx} className="text-justify sm:text-left">
                {p}
              </p>
            ))}
          </div>

          {/* Personality Quotes */}
          {quotesToDisplay.length > 0 && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[var(--hub-text)]">
                <Quote className="w-4 h-4 text-[var(--color-brand-primary)]" />
                <span>FRASES DE LA GUÍA</span>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {quotesToDisplay.map((q, idx) => {
                  const spk = formatSpeaker(q.speaker);
                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-[var(--hub-surface-2)] border border-[var(--hub-border)] relative flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <p className="text-xs sm:text-sm font-medium text-[var(--hub-text)] italic leading-snug">
                        "{q.text}"
                      </p>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-[10px] font-mono font-bold uppercase tracking-wider shrink-0 self-start sm:self-center ${spk.bg} ${spk.text}`}
                      >
                        {spk.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Why It Matters / Claves de la temporada */}
          {recap.why_it_matters && recap.why_it_matters.length > 0 && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[var(--hub-text)]">
                <CheckCircle2 className="w-4 h-4 text-[var(--color-brand-primary)]" />
                <span>POR QUÉ IMPORTA ESTA TEMPORADA</span>
              </div>
              <div className="space-y-2.5">
                {recap.why_it_matters.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-[var(--hub-surface-2)]/60 border border-[var(--hub-border)]"
                  >
                    <span className="font-mono text-xs font-black text-[var(--color-brand-primary)] shrink-0 mt-0.5">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <p className="text-xs sm:text-sm text-[var(--hub-text-secondary)] leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column (5 cols): Video Embed + Altas & Bajas */}
        <div className="lg:col-span-5 space-y-6">
          {/* YouTube Video Section */}
          <div className="space-y-3">
            {recap.youtube_id && (
              <BuquesVideoEmbed youtubeId={recap.youtube_id} title={recap.title} />
            )}

            {recap.youtube_url && (
              <Button
                href={recap.youtube_url}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="md"
                className="w-full justify-center"
                iconLeft={<YoutubeIcon className="w-4 h-4 text-white" />}
              >
                <span>{recap.cta_youtube || "Ver análisis completo en YouTube"}</span>
              </Button>
            )}
          </div>

          {/* Jugadores Clave / Roles */}
          {recap.featured_players && recap.featured_players.length > 0 && (
            <div className="p-5 rounded-2xl bg-[var(--hub-surface-2)] border border-[var(--hub-border)] space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[var(--hub-text)]">
                <span className="w-2.5 h-0.5 bg-[var(--color-brand-primary)]" />
                <span>JUGADORES BAJO LA LUPA</span>
              </div>
              <div className="space-y-2.5">
                {recap.featured_players.map((fp, idx) => (
                  <div key={idx} className="text-xs space-y-1 border-b border-[var(--hub-border)] pb-2.5 last:border-b-0 last:pb-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-[var(--hub-text)]">{fp.name}</span>
                      <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded bg-black/10 dark:bg-white/10 text-[var(--hub-text-dim)]">
                        {fp.role}
                      </span>
                    </div>
                    <p className="text-[var(--hub-text-secondary)] text-[11px] leading-relaxed">
                      {fp.line}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Altas y Bajas (Mercado) */}
          {((recap.additions && recap.additions.length > 0) ||
            (recap.departures && recap.departures.length > 0)) && (
            <div className="p-5 rounded-2xl bg-[var(--hub-surface-2)] border border-[var(--hub-border)] space-y-5">
              {/* Altas */}
              {recap.additions && recap.additions.length > 0 && (
                <div className="space-y-2.5">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>ALTAS ({recap.additions.length})</span>
                  </div>
                  <div className="space-y-2">
                    {recap.additions.map((item, idx) => {
                      const tag = formatMovementType(item.type);
                      return (
                        <div
                          key={idx}
                          className="flex items-start justify-between gap-2 text-xs bg-[var(--hub-surface)] p-2 rounded-lg border border-[var(--hub-border)]"
                        >
                          <div>
                            <span className="font-semibold text-[var(--hub-text)] block">
                              {item.player}
                            </span>
                            <span className="text-[11px] text-[var(--hub-text-dim)]">
                              {item.note}
                            </span>
                          </div>
                          <span
                            className={`text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded border shrink-0 ${tag.className}`}
                          >
                            {tag.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Bajas */}
              {recap.departures && recap.departures.length > 0 && (
                <div className="space-y-2.5">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-red-500 dark:text-red-400">
                    <UserMinus className="w-3.5 h-3.5" />
                    <span>BAJAS ({recap.departures.length})</span>
                  </div>
                  <div className="space-y-2">
                    {recap.departures.map((item, idx) => {
                      const tag = formatMovementType(item.type);
                      return (
                        <div
                          key={idx}
                          className="flex items-start justify-between gap-2 text-xs bg-[var(--hub-surface)] p-2 rounded-lg border border-[var(--hub-border)]"
                        >
                          <div>
                            <span className="font-semibold text-[var(--hub-text)] block">
                              {item.player}
                            </span>
                            <span className="text-[11px] text-[var(--hub-text-dim)]">
                              {item.note}
                            </span>
                          </div>
                          <span
                            className={`text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded border shrink-0 ${tag.className}`}
                          >
                            {tag.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
