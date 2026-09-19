// filepath: src/components/nba/TeamBuquesRecap.tsx
import React from "react";
import type { BuquesRecap, BuquesQuote, BuquesSpeaker } from "@/types/buques-recap";
import { Button } from "@/components/ui/Button";
import { YoutubeIcon } from "@/components/ui/Icons";
import { BuquesVideoEmbed } from "./BuquesVideoEmbed";
import { BuquesAnalysisCollapsible } from "./BuquesAnalysisCollapsible";
import { PlayerHeadshot } from "./PlayerHeadshot";
import {
  Quote,
  UserPlus,
  UserMinus,
  CheckCircle2,
  Eye,
  BadgeCheck,
} from "lucide-react";

interface TeamBuquesRecapProps {
  recap: BuquesRecap | null | undefined;
  primaryColor?: string;
  teamSlug?: string;
}

function formatSpeaker(speaker: BuquesSpeaker): {
  label: string;
  initial: string;
  bg: string;
  text: string;
  avatarBg: string;
} {
  const s = String(speaker).toLowerCase();
  if (s === "sergio") {
    return {
      label: "Sergio",
      initial: "S",
      bg: "bg-blue-500/10 border-blue-500/30",
      text: "text-blue-600 dark:text-blue-400",
      avatarBg: "bg-blue-500 text-white",
    };
  }
  if (s === "jose") {
    return {
      label: "José",
      initial: "J",
      bg: "bg-emerald-500/10 border-emerald-500/30",
      text: "text-emerald-600 dark:text-emerald-400",
      avatarBg: "bg-emerald-500 text-white",
    };
  }
  return {
    label: "Sergio & José",
    initial: "D",
    bg: "bg-[var(--color-brand-primary)]/10 border-[var(--color-brand-primary)]/30",
    text: "text-[var(--color-brand-primary)]",
    avatarBg: "bg-[var(--color-brand-primary)] text-white",
  };
}

function formatMovementType(type: string): { label: string; className: string } {
  const t = type.toLowerCase();
  if (t === "trade") {
    return {
      label: "TRASPASO",
      className: "bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30",
    };
  }
  if (t === "fa") {
    return {
      label: "AGENTE LIBRE",
      className: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30",
    };
  }
  if (t === "draft") {
    return {
      label: "DRAFT",
      className: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
    };
  }
  return {
    label: type.toUpperCase(),
    className: "bg-zinc-500/15 text-zinc-600 dark:text-zinc-400 border-zinc-500/30",
  };
}

export function TeamBuquesRecap({
  recap,
  primaryColor = "var(--color-brand-primary)",
}: TeamBuquesRecapProps) {
  if (!recap) return null;

  // 1 quote destacada principal (en vez de saturar con 3 citas seguidas)
  const quotesPool: BuquesQuote[] =
    recap.quotes && recap.quotes.length > 0
      ? recap.quotes
      : (recap.personality_lines ?? []);
  const primaryQuote = quotesPool.length > 0 ? quotesPool[0] : null;

  // Párrafos del análisis editorial
  const paragraphs = recap.analysis
    ? recap.analysis.split("\n\n").filter(Boolean)
    : [];

  const videoBlock = (priority = false) => (
    <div className="space-y-3">
      {recap.youtube_id && (
        <BuquesVideoEmbed
          youtubeId={recap.youtube_id}
          title={recap.title}
          priority={priority}
        />
      )}

      {recap.youtube_url && (
        <Button
          href={recap.youtube_url}
          target="_blank"
          rel="noopener noreferrer"
          variant="primary"
          size="md"
          className="w-full justify-center shadow-sm"
          iconLeft={<YoutubeIcon className="w-4 h-4 text-white" />}
        >
          <span>{recap.cta_youtube || "Ver análisis completo en YouTube"}</span>
        </Button>
      )}
    </div>
  );

  return (
    <section
      aria-label="Narrativa Buques"
      className="rounded-3xl border border-[var(--hub-border)] p-5 sm:p-8 lg:p-10 shadow-sm relative overflow-hidden space-y-8"
      style={{
        background: `linear-gradient(135deg, ${primaryColor}10 0%, var(--hub-surface) 35%, var(--hub-surface) 100%)`,
      }}
    >
      {/* Top Accent Franchise Gradient Bar */}
      <div
        className="absolute top-0 left-0 right-0 h-1.5"
        style={{
          background: `linear-gradient(90deg, ${primaryColor}, #FF8A50, ${primaryColor})`,
        }}
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (7 cols on desktop): Header, Mobile-Video, One-Liner, Why it Matters, Quote, Collapsible Analysis */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Eyebrow + Title */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full border"
                style={{
                  backgroundColor: `${primaryColor}15`,
                  borderColor: `${primaryColor}35`,
                  color: primaryColor,
                }}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: primaryColor }}
                />
                {recap.eyebrow || "GUÍA BUQUES · 26/27"}
              </span>

              {recap.season && (
                <span className="text-xs font-mono font-medium text-[var(--hub-text-dim)] uppercase px-2.5 py-0.5 rounded-md bg-[var(--hub-surface-2)] border border-[var(--hub-border)]">
                  {recap.season}
                </span>
              )}

              {recap.confidence && (
                <span className="inline-flex items-center gap-1 text-[11px] font-mono uppercase text-emerald-600 dark:text-emerald-400 ml-auto hidden sm:inline-flex">
                  <BadgeCheck className="w-3.5 h-3.5" />
                  <span>Análisis Verificado</span>
                </span>
              )}
            </div>

            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-black text-[var(--hub-text)] uppercase tracking-tight leading-tight"
              style={{ fontFamily: "var(--hub-font-display)" }}
            >
              {recap.title}
            </h2>
          </div>

          {/* 2. Video + CTA YouTube: INMEDIATAMENTE VISIBLE EN MÓVIL (debajo de título) */}
          <div className="block lg:hidden pt-1">
            {videoBlock(false)}
          </div>

          {/* 3. One Liner Callout */}
          {recap.one_liner && (
            <div
              className="border-l-4 p-4 sm:p-5 rounded-r-2xl bg-[var(--hub-surface-2)] border-[var(--hub-border)]"
              style={{ borderLeftColor: primaryColor }}
            >
              <p className="text-sm sm:text-base font-medium text-[var(--hub-text)] leading-relaxed italic">
                "{recap.one_liner}"
              </p>
            </div>
          )}

          {/* 4. Por qué importa esta temporada: 3 Tarjetas visuales en cuadrícula */}
          {recap.why_it_matters && recap.why_it_matters.length > 0 && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[var(--hub-text)]">
                <CheckCircle2
                  className="w-4 h-4"
                  style={{ color: primaryColor }}
                />
                <span>POR QUÉ IMPORTA ESTA TEMPORADA</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {recap.why_it_matters.slice(0, 3).map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-[var(--hub-surface-2)] border border-[var(--hub-border)] flex flex-col justify-start gap-2 hover:border-[var(--color-border-hover)] transition-colors"
                  >
                    <span
                      className="font-mono text-xs font-black shrink-0"
                      style={{ color: primaryColor }}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <p className="text-xs text-[var(--hub-text-secondary)] leading-relaxed font-medium">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. Frase destacada única (Editorial Highlight) */}
          {primaryQuote && (
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[var(--hub-text)]">
                <Quote className="w-3.5 h-3.5 text-[var(--hub-text-dim)]" />
                <span>FRASE DE LA GUÍA</span>
              </div>
              {(() => {
                const spk = formatSpeaker(primaryQuote.speaker);
                return (
                  <div className="p-4 rounded-2xl bg-[var(--hub-surface-2)] border border-[var(--hub-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <p className="text-xs sm:text-sm font-medium text-[var(--hub-text)] italic leading-snug">
                      "{primaryQuote.text}"
                    </p>
                    <div
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-mono font-bold uppercase tracking-wider shrink-0 self-start sm:self-center ${spk.bg} ${spk.text}`}
                    >
                      <span
                        className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold ${spk.avatarBg}`}
                      >
                        {spk.initial}
                      </span>
                      <span>{spk.label}</span>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* 6. Análisis Editorial Colapsable */}
          <div className="pt-2">
            <BuquesAnalysisCollapsible
              paragraphs={paragraphs}
              primaryColor={primaryColor}
            />
          </div>
        </div>

        {/* Right Column (5 cols on desktop): Video Embed (Desktop), Altas/Bajas, Jugadores bajo la lupa */}
        <div className="lg:col-span-5 space-y-6">
          {/* Video + CTA YouTube: SOLO EN DESKTOP (en móvil ya apareció arriba) */}
          <div className="hidden lg:block">
            {videoBlock(true)}
          </div>

          {/* 7. Altas y Bajas (Mercado estructurado en bloques suaves verde/rojo) */}
          {((recap.additions && recap.additions.length > 0) ||
            (recap.departures && recap.departures.length > 0)) && (
            <div className="space-y-4">
              {/* Altas */}
              {recap.additions && recap.additions.length > 0 && (
                <div className="p-4 rounded-2xl bg-emerald-500/[0.04] border border-emerald-500/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>ALTAS</span>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                      {recap.additions.length}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {recap.additions.map((item, idx) => {
                      const tag = formatMovementType(item.type);
                      return (
                        <div
                          key={idx}
                          className="flex items-start justify-between gap-2.5 text-xs bg-[var(--hub-surface)] p-2.5 rounded-xl border border-emerald-500/15"
                        >
                          <div className="min-w-0">
                            <span className="font-bold text-[var(--hub-text)] block truncate">
                              {item.player}
                            </span>
                            <span className="text-[11px] text-[var(--hub-text-dim)] line-clamp-1">
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
                <div className="p-4 rounded-2xl bg-rose-500/[0.04] border border-rose-500/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                      <UserMinus className="w-3.5 h-3.5" />
                      <span>BAJAS</span>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-rose-600 dark:text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded-full">
                      {recap.departures.length}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {recap.departures.map((item, idx) => {
                      const tag = formatMovementType(item.type);
                      return (
                        <div
                          key={idx}
                          className="flex items-start justify-between gap-2.5 text-xs bg-[var(--hub-surface)] p-2.5 rounded-xl border border-rose-500/15"
                        >
                          <div className="min-w-0">
                            <span className="font-bold text-[var(--hub-text)] block truncate">
                              {item.player}
                            </span>
                            <span className="text-[11px] text-[var(--hub-text-dim)] line-clamp-1">
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

          {/* 8. Jugadores bajo la lupa: Tarjetas horizontales con Avatar / Headshot */}
          {recap.featured_players && recap.featured_players.length > 0 && (
            <div className="p-4 sm:p-5 rounded-2xl bg-[var(--hub-surface-2)] border border-[var(--hub-border)] space-y-3.5">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[var(--hub-text)]">
                <Eye className="w-4 h-4" style={{ color: primaryColor }} />
                <span>JUGADORES BAJO LA LUPA</span>
              </div>
              <div className="space-y-2.5">
                {recap.featured_players.map((fp, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 rounded-xl bg-[var(--hub-surface)] border border-[var(--hub-border)] hover:border-[var(--color-border-hover)] transition-all"
                  >
                    <PlayerHeadshot
                      name={fp.name}
                      tricode={recap.tricode}
                      size={44}
                      className="shrink-0"
                    />
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex flex-wrap items-center justify-between gap-1.5">
                        <span className="font-bold text-xs sm:text-sm text-[var(--hub-text)] truncate">
                          {fp.name}
                        </span>
                        <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[var(--hub-surface-2)] border border-[var(--hub-border)] text-[var(--hub-text-dim)] shrink-0">
                          {fp.role}
                        </span>
                      </div>
                      <p className="text-[11px] text-[var(--hub-text-secondary)] leading-relaxed">
                        {fp.line}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
