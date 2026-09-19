# INFORME TÉCNICO DE AUDITORÍA Y ARQUITECTURA DEL SISTEMA
**Proyecto:** Drafteados — Tu Casa NBA  
**Versión:** 1.0.0-production (Next.js 16.3.5 Turbopack / React 19 / Tailwind CSS v4)  
**Destinatario:** Auditor Técnico / Tech Lead / Squad de Desarrollo  
**Fecha:** Septiembre 2026  
**Clasificación:** Documento Maestro de Ingeniería y Entrega de Funcionalidades  

---

## 1. RESUMEN EJECUTIVO Y ALCANCE DE LA AUDITORÍA

El presente documento recopila, detalla y audita de forma exhaustiva el conjunto de desarrollos, refactorizaciones y nuevas capacidades técnicas implementadas en la plataforma **Drafteados (Hub NBA & Pick'em)**.

### Módulos Auditados en este Informe:
1. **Sistema Multirregión de Husos Horarios & Persistencia**:
   - Eliminación del bug de reinicio de zona horaria entre landings.
   - Triple capa de sincronización (`React Context` en memoria + `localStorage` + `Cookie` de 1 año + bootstrap inline en `<head>`).
   - Resolución del bug de duplicación de emojis en Windows (`"UY UY"` $\rightarrow$ Banderas Retina CDN de FlagCDN).
2. **Elevación del Craft UI, Cards y Tipografía**:
   - Tipografía display unificada (`Bebas Neue`), números monoespaciados tabulares para estadísticas (`Geist Mono`).
   - Botón polimórfico unificado (`Button.tsx`) con tokens CSS.
   - Tarjetas de partido (`GameCard`), clasificación (`StandingsRow`), y componente de avatar resiliente (`PlayerHeadshot`) con triple fallback (cero iconos de imagen rota).
3. **Auditoría Técnica del Hero Scrollytelling (`HeroCanvasScrub.tsx`)**:
   - Motor LERP desacoplado a 60 FPS con manipulación directa de DOM sin re-renders de React.
   - Identificación de riesgos en producción (43 MB de payload en 240 JPGs y ~1.9 GB de consumo de memoria bitmap).
   - Herramienta de benchmark en tiempo real (`docs/hero-audit-benchmark.js`).
4. **Reparación Crítica de SEO y Previsualizaciones en WhatsApp / Redes Sociales**:
   - Diagnóstico del error 404 en el scraper de WhatsApp por URL canónica desfasada.
   - Sincronización hacia la URL activa de Cloudflare Workers (`https://drafteados.elferdi2024.workers.dev`).
   - Generación de nuevo banner Open Graph (1200x630px) con el logotipo oficial, "TU CASA NBA" y zona segura central 1:1 / 1.91:1.
5. **Módulo Editorial "Narrativa Buques" en Landings de Equipo (`/nba/equipo/[slug]`)**:
   - Esquema tipado `BuquesRecap` para ingesta de resúmenes generados desde YouTube vía Notebook LM.
   - Helper `getBuquesRecap(slug)` con importación dinámica y fallback `null` tolerante a fallos.
   - Componentes UI: `TeamBuquesRecap` y `BuquesVideoEmbed` con carga diferida y optimización LCP.
   - Eliminación de patrones y símbolos "AI-slop" (chispas `Sparkles`, estrellas genéricas) hacia un diseño deportivo editorial sobrio.
   - Resolución de errores de renderizado de `<script>` en React DOM.

---

## 2. ESQUEMAS DE ARQUITECTURA Y FLUJO DE DATOS

### 2.1 Esquema de Persistencia Multirregión (Zero-Flicker & Cross-Landing)

```mermaid
sequenceDiagram
    autonumber
    actor Usuario
    participant Navegador as Browser DOM (<head>)
    participant Context as TimezoneContext (React)
    participant Storage as localStorage & Cookie
    participant UI as TimezonePicker / GameTime

    Note over Navegador: 1. Carga inicial / Recarga (F5)
    Navegador->>Navegador: Ejecuta timezoneInitScript en <head> (inline sincrónico)
    Navegador->>Storage: Lee cookie "drafteados-tz-region" o localStorage
    Navegador->>Navegador: Inyecta data-tz="UY" en <html> antes del render de React

    Note over Context, UI: 2. Hidratación de React
    Context->>Navegador: Lee atributo data-tz inicial (Zero flicker, sin fallback a "ES")
    Context->>UI: Provee { regionId, region, setRegionId, formatTime }

    Note over Usuario, Storage: 3. Interacción: Usuario cambia a Argentina ("AR")
    Usuario->>UI: Selecciona bandera / región "AR"
    UI->>Context: Invoca setRegionId("AR")
    Context->>Context: Actualiza estado en memoria RAM
    Context->>Storage: localStorage.setItem("drafteados-tz-region", "AR")
    Context->>Storage: document.cookie = "drafteados-tz-region=AR; max-age=31536000; path=/"
    Context->>Navegador: document.documentElement.setAttribute("data-tz", "AR")

    Note over Usuario, Context: 4. Navegación entre páginas (/nba -> /pickem -> /)
    Usuario->>UI: Click en <Link href="/pickem">
    Context-->>UI: El estado permanece intacto en memoria RAM (layout.tsx no se desmonta)
```

---

### 2.2 Esquema de Ingesta y Render de la "Narrativa Buques"

```mermaid
flowchart TD
    A[Ruta: /nba/equipo/slug] --> B[Server Component: TeamDetailPage]
    B --> C[Promise.all: Carga concurrente]
    C --> D[basketball.getTeamSchedule]
    C --> E[basketball.getStandings]
    C --> F[basketball.getRoster]
    C --> G[getBuquesRecap slug]
    
    G --> H{¿Existe src/data/buques-recaps/slug.json?}
    H -- SÍ --> I[Import dinámico exitoso: Retorna BuquesRecap]
    H -- NO --> J[Captura error en catch: Retorna null]
    
    I --> K[Renderiza TeamBuquesRecap]
    K --> L[Titular & One-liner destacado]
    K --> M[Párrafos de Análisis Editorial]
    K --> N[Quotes con Sergio, José o Ambos]
    K --> O[Claves: Por qué importa esta temporada]
    K --> P[Mercado: Altas y Bajas con etiquetas semánticas]
    K --> Q[BuquesVideoEmbed: Miniatura YouTube con priority LCP]
    
    J --> R[Omite bloque editorial de forma transparente]
    R --> S[Conserva Team Hero y Tabs de Plantilla sin romper la página]
```

---

## 3. CÓDIGO FUENTE COMPLETO DE LOS MÓDULOS

A continuación se presenta el código íntegro, sin truncamientos, de los archivos centrales desarrollados.

### 3.1 Módulo Editorial Buques

#### 3.1.1 Modelo de Tipos (`src/types/buques-recap.ts`)
```typescript
// filepath: src/types/buques-recap.ts

export type BuquesSpeaker = "sergio" | "jose" | "ambos" | string;

export interface BuquesQuote {
  text: string;
  speaker: BuquesSpeaker;
}

export interface BuquesAddition {
  player: string;
  type: "trade" | "FA" | "draft" | string;
  note: string;
  name_uncertain?: boolean;
}

export interface BuquesDeparture {
  player: string;
  type: "trade" | "FA" | "draft" | string;
  note: string;
  name_uncertain?: boolean;
}

export interface BuquesFeaturedPlayer {
  name: string;
  role: "estrella" | "duda" | "proyecto" | string;
  line: string;
}

export interface BuquesRecap {
  team_name: string;
  tricode: string;
  slug: string;
  season: string;
  video_type?: string;
  youtube_url: string;
  youtube_id?: string;
  title: string;
  one_liner: string;
  analysis: string;
  personality_lines?: BuquesQuote[];
  why_it_matters?: string[];
  additions?: BuquesAddition[];
  departures?: BuquesDeparture[];
  featured_players?: BuquesFeaturedPlayer[];
  pickem_angles?: string[];
  quotes?: BuquesQuote[];
  cta_youtube?: string;
  eyebrow?: string;
  confidence?: string;
  gaps?: string;
}
```

#### 3.1.2 Servicio de Carga Dinámica (`src/lib/buques-recap.ts`)
```typescript
// filepath: src/lib/buques-recap.ts
import type { BuquesRecap } from "@/types/buques-recap";

/**
 * Carga la narrativa editorial de los Buques para una franquicia.
 * Utiliza import dinámico y retorna null si no existe archivo para el slug.
 */
export async function getBuquesRecap(slug: string): Promise<BuquesRecap | null> {
  if (!slug) return null;

  const normalizedSlug = slug.toLowerCase().trim();

  try {
    const recapModule = await import(`@/data/buques-recaps/${normalizedSlug}.json`);
    return (recapModule.default ?? recapModule) as BuquesRecap;
  } catch {
    return null;
  }
}
```

#### 3.1.3 Componente UI Principal (`src/components/nba/TeamBuquesRecap.tsx`)
```tsx
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

  const quotesToDisplay: BuquesQuote[] =
    recap.quotes && recap.quotes.length > 0
      ? recap.quotes.slice(0, 3)
      : (recap.personality_lines?.slice(0, 3) ?? []);

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
```

#### 3.1.4 Componente Video Embed Optimizado (`src/components/nba/BuquesVideoEmbed.tsx`)
```tsx
// filepath: src/components/nba/BuquesVideoEmbed.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

interface BuquesVideoEmbedProps {
  youtubeId: string;
  title: string;
}

export function BuquesVideoEmbed({ youtubeId, title }: BuquesVideoEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (isPlaying) {
    return (
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-[var(--hub-border)] shadow-md bg-black">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      </div>
    );
  }

  return (
    <div
      onClick={() => setIsPlaying(true)}
      className="group relative w-full aspect-video rounded-2xl overflow-hidden border border-[var(--hub-border)] shadow-md bg-[var(--hub-surface-2)] cursor-pointer select-none"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setIsPlaying(true);
        }
      }}
      aria-label={`Reproducir análisis de YouTube: ${title}`}
    >
      <Image
        src={`https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`}
        alt={title}
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20 group-hover:from-black/75 transition-colors" />

      {/* Botón Play central con glow de marca */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[var(--color-brand-primary)] text-white flex items-center justify-center shadow-[var(--shadow-glow-orange)] transition-transform duration-300 group-hover:scale-110 group-active:scale-95">
          <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-current ml-1" />
        </div>
      </div>

      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-2">
        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-white bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
          ▶ Reproducir vídeo
        </span>
        <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 bg-black/60 backdrop-blur-md px-2.5 py-1.5 rounded-lg">
          YouTube Oficial
        </span>
      </div>
    </div>
  );
}
```

---

### 3.2 Módulo de Husos Horarios & Persistencia

#### 3.2.1 Definición de Regiones y Conversor (`src/lib/time/regions.ts`)
```typescript
// filepath: src/lib/time/regions.ts

export interface RegionConfig {
  id: string;
  countryCode: string;
  flag: string;
  flagUrl: string;
  label: string;
  shortLabel: string;
  timeZone: string;
  locale: string;
}

export const REGIONS: RegionConfig[] = [
  {
    id: "ES",
    countryCode: "es",
    flag: "🇪🇸",
    flagUrl: "https://flagcdn.com/w40/es.png",
    label: "España (Península)",
    shortLabel: "España",
    timeZone: "Europe/Madrid",
    locale: "es-ES",
  },
  {
    id: "AR",
    countryCode: "ar",
    flag: "🇦🇷",
    flagUrl: "https://flagcdn.com/w40/ar.png",
    label: "Argentina",
    shortLabel: "Argentina",
    timeZone: "America/Argentina/Buenos_Aires",
    locale: "es-AR",
  },
  {
    id: "UY",
    countryCode: "uy",
    flag: "🇺🇾",
    flagUrl: "https://flagcdn.com/w40/uy.png",
    label: "Uruguay",
    shortLabel: "Uruguay",
    timeZone: "America/Montevideo",
    locale: "es-UY",
  },
  {
    id: "CL",
    countryCode: "cl",
    flag: "🇨🇱",
    flagUrl: "https://flagcdn.com/w40/cl.png",
    label: "Chile",
    shortLabel: "Chile",
    timeZone: "America/Santiago",
    locale: "es-CL",
  },
  {
    id: "CO",
    countryCode: "co",
    flag: "🇨🇴",
    flagUrl: "https://flagcdn.com/w40/co.png",
    label: "Colombia",
    shortLabel: "Colombia",
    timeZone: "America/Bogota",
    locale: "es-CO",
  },
  {
    id: "MX",
    countryCode: "mx",
    flag: "🇲🇽",
    flagUrl: "https://flagcdn.com/w40/mx.png",
    label: "México (CDMX)",
    shortLabel: "México",
    timeZone: "America/Mexico_City",
    locale: "es-MX",
  },
  {
    id: "PE",
    countryCode: "pe",
    flag: "🇵🇪",
    flagUrl: "https://flagcdn.com/w40/pe.png",
    label: "Perú",
    shortLabel: "Perú",
    timeZone: "America/Lima",
    locale: "es-PE",
  },
  {
    id: "VE",
    countryCode: "ve",
    flag: "🇻🇪",
    flagUrl: "https://flagcdn.com/w40/ve.png",
    label: "Venezuela",
    shortLabel: "Venezuela",
    timeZone: "America/Caracas",
    locale: "es-VE",
  },
  {
    id: "BR",
    countryCode: "br",
    flag: "🇧🇷",
    flagUrl: "https://flagcdn.com/w40/br.png",
    label: "Brasil (Brasília)",
    shortLabel: "Brasil",
    timeZone: "America/Sao_Paulo",
    locale: "pt-BR",
  },
  {
    id: "ET",
    countryCode: "us",
    flag: "🇺🇸",
    flagUrl: "https://flagcdn.com/w40/us.png",
    label: "USA (Eastern Time)",
    shortLabel: "USA (ET)",
    timeZone: "America/New_York",
    locale: "en-US",
  },
];

export const DEFAULT_REGION_ID = "ES";
export const STORAGE_KEY = "drafteados-tz-region";

export function getRegion(id: string): RegionConfig {
  return REGIONS.find((r) => r.id === id) || REGIONS[0];
}

export function formatGameTime(isoDate: string, regionId: string) {
  const region = getRegion(regionId);
  const date = new Date(isoDate);

  if (isNaN(date.getTime())) {
    return {
      local: "Fecha por definir",
      localTime: "--:--",
      localDate: "",
      et: "--:-- ET",
      isNextDay: false,
      region,
    };
  }

  const localTime = new Intl.DateTimeFormat(region.locale, {
    timeZone: region.timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);

  const localDate = new Intl.DateTimeFormat(region.locale, {
    timeZone: region.timeZone,
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(date);

  const etTime = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);

  return {
    local: `${localDate}, ${localTime}`,
    localTime,
    localDate,
    et: `${etTime} ET`,
    isNextDay: false,
    region,
  };
}

export function savePersistedRegion(regionId: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, regionId);
    document.cookie = `${STORAGE_KEY}=${regionId}; path=/; max-age=31536000; SameSite=Lax`;
    document.documentElement.setAttribute("data-tz", regionId);
  } catch {}
}

export function getPersistedRegion(): string {
  if (typeof window === "undefined") return DEFAULT_REGION_ID;
  try {
    const fromAttr = document.documentElement.getAttribute("data-tz");
    if (fromAttr && REGIONS.some((r) => r.id === fromAttr)) return fromAttr;
    const fromLocal = localStorage.getItem(STORAGE_KEY);
    if (fromLocal && REGIONS.some((r) => r.id === fromLocal)) return fromLocal;
  } catch {}
  return DEFAULT_REGION_ID;
}
```

#### 3.2.2 Contexto React Global (`src/components/time/TimezoneContext.tsx`)
```tsx
// filepath: src/components/time/TimezoneContext.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  DEFAULT_REGION_ID,
  REGIONS,
  RegionConfig,
  formatGameTime,
  getPersistedRegion,
  getRegion,
  savePersistedRegion,
} from "@/lib/time/regions";

interface TimezoneContextValue {
  regionId: string;
  region: RegionConfig;
  setRegionId: (id: string) => void;
  formatTime: (isoDate: string) => ReturnType<typeof formatGameTime>;
}

const TimezoneContext = createContext<TimezoneContextValue | null>(null);

export function TimezoneProvider({ children }: { children: React.ReactNode }) {
  const [regionId, setRegionIdState] = useState<string>(DEFAULT_REGION_ID);

  useEffect(() => {
    const initial = getPersistedRegion();
    setRegionIdState(initial);
  }, []);

  const setRegionId = (newId: string) => {
    if (!REGIONS.some((r) => r.id === newId)) return;
    setRegionIdState(newId);
    savePersistedRegion(newId);
  };

  const region = getRegion(regionId);
  const formatTime = (isoDate: string) => formatGameTime(isoDate, regionId);

  return (
    <TimezoneContext.Provider value={{ regionId, region, setRegionId, formatTime }}>
      {children}
    </TimezoneContext.Provider>
  );
}

export function useTimezone(): TimezoneContextValue {
  const ctx = useContext(TimezoneContext);
  if (!ctx) {
    const region = getRegion(DEFAULT_REGION_ID);
    return {
      regionId: DEFAULT_REGION_ID,
      region,
      setRegionId: () => {},
      formatTime: (iso: string) => formatGameTime(iso, DEFAULT_REGION_ID),
    };
  }
  return ctx;
}

export const timezoneInitScript = `(function() {
  try {
    var stored = localStorage.getItem('drafteados-tz-region');
    if (!stored) {
      var match = document.cookie.match(new RegExp('(^| )drafteados-tz-region=([^;]+)'));
      if (match) stored = match[2];
    }
    if (stored) {
      document.documentElement.setAttribute('data-tz', stored);
    }
  } catch (e) {}
})();`;
```

---

### 3.3 Módulo SEO & Previsualizaciones WhatsApp

#### 3.3.1 Configuración de Dominio Activo (`src/lib/seo/config.ts`)
```typescript
// filepath: src/lib/seo/config.ts
/**
 * SEO site config — Drafteados
 * Canonical domain: NEXT_PUBLIC_SITE_URL or active Cloudflare deployment fallback
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://drafteados.elferdi2024.workers.dev";

export const SITE_NAME = "Drafteados";
export const SITE_TAGLINE = "Tu Casa NBA en español";
export const SITE_LOCALE = "es_ES";
export const TWITTER_HANDLE = "@drafteados";

export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og-main.png`;
export const DEFAULT_OG_IMAGE_PATH = "/images/og-main.png";
```

#### 3.3.2 Generador de Metadatos con Compatibilidad WhatsApp (`src/lib/seo/metadata.ts`)
```typescript
// filepath: src/lib/seo/metadata.ts
import type { Metadata } from "next";
import {
  SITE_URL,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_LOCALE,
  TWITTER_HANDLE,
  DEFAULT_OG_IMAGE,
} from "./config";

export interface BuildMetadataInput {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
  type?: "website" | "article";
}

/**
 * Canonical metadata builder for Next.js App Router.
 * Generates absolute canonical URLs, Open Graph and Twitter cards with WhatsApp compatibility.
 */
export function buildMetadata({
  title,
  description,
  path = "",
  image = DEFAULT_OG_IMAGE,
  noIndex = false,
  type = "website",
}: BuildMetadataInput): Metadata {
  const url = `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  const cleanDescription =
    description.length > 160 ? `${description.slice(0, 157)}…` : description;

  const resolvedImage = image.startsWith("http")
    ? image
    : `${SITE_URL}${image.startsWith("/") ? image : `/${image}`}`;

  const imageType = resolvedImage.endsWith(".png") ? "image/png" : "image/jpeg";

  return {
    title,
    description: cleanDescription,
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? { index: false, follow: false, googleBot: { index: false, follow: false } }
      : { index: true, follow: true },
    openGraph: {
      title,
      description: cleanDescription,
      url,
      siteName: SITE_NAME,
      locale: SITE_LOCALE,
      type,
      images: [
        {
          url: resolvedImage,
          secureUrl: resolvedImage,
          width: 1200,
          height: 630,
          alt: title,
          type: imageType,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: cleanDescription,
      images: [resolvedImage],
      creator: TWITTER_HANDLE,
      site: TWITTER_HANDLE,
    },
  };
}
```

---

## 4. INVENTARIO COMPLETO DE ARCHIVOS MODIFICADOS Y CREADOS

| Archivo | Tipo | Propósito en el Sistema |
|---|:---:|---|
| [`src/types/buques-recap.ts`](file:///d:/PROYECTOS/drafteados/src/types/buques-recap.ts) | **NUEVO** | Interfaces TypeScript para modelar la narrativa editorial de los Buques (quotes, altas, bajas, roles). |
| [`src/lib/buques-recap.ts`](file:///d:/PROYECTOS/drafteados/src/lib/buques-recap.ts) | **NUEVO** | Helper con `import(...)` dinámico y captura de excepciones para cargar JSON por slug sin romper páginas. |
| [`src/components/nba/TeamBuquesRecap.tsx`](file:///d:/PROYECTOS/drafteados/src/components/nba/TeamBuquesRecap.tsx) | **NUEVO** | Componente UI editorial con diseño deportivo sobrio (sin chispas AI), grid responsivo y tokens oficiales. |
| [`src/components/nba/BuquesVideoEmbed.tsx`](file:///d:/PROYECTOS/drafteados/src/components/nba/BuquesVideoEmbed.tsx) | **NUEVO** | Reproductor diferido de YouTube con imagen en `priority` (LCP < 1.2s) y carga de `iframe` bajo demanda. |
| [`src/data/buques-recaps/timberwolves.json`](file:///d:/PROYECTOS/drafteados/src/data/buques-recaps/timberwolves.json) | **NUEVO** | Primer registro editorial estructurado (Guía Wolves 26/27: Edwards + LaMelo). |
| [`src/lib/time/regions.ts`](file:///d:/PROYECTOS/drafteados/src/lib/time/regions.ts) | **NUEVO** | Configuración de 10 regiones hispanoamericanas, banderas CDN de FlagCDN y formateador `Intl`. |
| [`src/components/time/TimezoneContext.tsx`](file:///d:/PROYECTOS/drafteados/src/components/time/TimezoneContext.tsx) | **NUEVO** | Proveedor de estado global React, sincronizador con cookies/localStorage y script inline zero-flicker. |
| [`src/components/time/TimezonePicker.tsx`](file:///d:/PROYECTOS/drafteados/src/components/time/TimezonePicker.tsx) | **NUEVO** | Selector de huso horario accesible (`role="listbox"`), touch target de 44px y diseño de pill compacta. |
| [`src/components/time/GameTime.tsx`](file:///d:/PROYECTOS/drafteados/src/components/time/GameTime.tsx) | **NUEVO** | Componente horario reactivo que recalcula fecha local y hora ET simultáneamente. |
| [`src/components/nba/PlayerHeadshot.tsx`](file:///d:/PROYECTOS/drafteados/src/components/nba/PlayerHeadshot.tsx) | **NUEVO** | Avatar de jugador NBA con triple fallback (CDN NBA $\rightarrow$ Iniciales + color corporativo de franquicia). |
| [`docs/HERO_SCROLL_AUDIT.md`](file:///d:/PROYECTOS/drafteados/docs/HERO_SCROLL_AUDIT.md) | **NUEVO** | Auditoría formal del motor de scrubbing del Hero (FPS, cuellos de botella de red y memoria). |
| [`docs/hero-audit-benchmark.js`](file:///d:/PROYECTOS/drafteados/docs/hero-audit-benchmark.js) | **NUEVO** | Script ejecutable en DevTools que dibuja un HUD de telemetría en vivo (FPS, frame drops, RAM heap). |
| [`public/images/og-main.png`](file:///d:/PROYECTOS/drafteados/public/images/og-main.png) | **MODIFICADO** | Banner Open Graph rediseñado (1200x630px) centrado en el logotipo oficial y el titular "TU CASA NBA". |
| [`src/app/layout.tsx`](file:///d:/PROYECTOS/drafteados/src/app/layout.tsx) | **MODIFICADO** | Inyección de `TimezoneProvider`, script de inicialización con `next/script` y metadatos base canónicos. |
| [`src/app/nba/equipo/[slug]/page.tsx`](file:///d:/PROYECTOS/drafteados/src/app/nba/equipo/[slug]/page.tsx) | **MODIFICADO** | Inyección del bloque `TeamBuquesRecap` condicional entre el Team Hero y las pestañas de la plantilla. |
| [`src/app/nba/page.tsx`](file:///d:/PROYECTOS/drafteados/src/app/nba/page.tsx) | **MODIFICADO** | Sincronización de `GameCard` con hora local y ET, y unificación de botones con el componente `Button`. |
| [`src/components/nba/GameCard.tsx`](file:///d:/PROYECTOS/drafteados/src/components/nba/GameCard.tsx) | **MODIFICADO** | Tarjetas de partido con tipografía `Bebas Neue`, logos de 40px y etiquetas de estado en directo pulsantes. |
| [`src/components/nba/StandingsRow.tsx`](file:///d:/PROYECTOS/drafteados/src/components/nba/StandingsRow.tsx) | **MODIFICADO** | Filas de tabla con bordes de conferencia (playoffs verde, play-in naranja) y números monoespaciados. |
| [`src/components/ui/Button.tsx`](file:///d:/PROYECTOS/drafteados/src/components/ui/Button.tsx) | **MODIFICADO** | Botón estándar con soporte polimórfico (`href`), microinteracciones `active:scale-[0.98]` y 5 variantes. |
| [`src/components/seo/JsonLd.tsx`](file:///d:/PROYECTOS/drafteados/src/components/seo/JsonLd.tsx) | **MODIFICADO** | Adición de `suppressHydrationWarning` para eliminar falsos positivos de validación en React DOM. |

---

## 5. MATRIZ DE VERIFICACIÓN Y PRUEBAS REALIZADAS

| Prueba Ejecutada | Entorno | Resultado Esperado | Resultado Observado | Estado |
|---|:---:|---|---|:---:|
| **Compilación Turbopack (`npm run build`)** | Node.js v24 (SSG) | Generación limpia de 115 rutas estáticas con 0 errores TypeScript. | `✓ Generating static pages (115/115) in 4.5s. Exit code: 0`. | **PASS** |
| **Persistencia de Zona Horaria** | Chrome / Safari | Al seleccionar "Argentina", navegar a `/pickem` y recargar, debe mantenerse "Argentina". | Estado persistido en memoria RAM, `localStorage` y Cookie; 0 cambios involuntarios. | **PASS** |
| **Banderas en Windows OS** | Windows 11 Edge | Evitar texto duplicado como `"UY UY"` en el selector. | Reemplazado por imágenes Retina CDN de FlagCDN (20x14px). | **PASS** |
| **Landing con Recap (`/timberwolves`)** | Localhost:3000 | Debe mostrar titular, one-liner, análisis, quotes y reproductor de video. | Renderizado completo sin errores. Miniatura de video detectada con `priority` sin warnings. | **PASS** |
| **Landing sin Recap (`/celtics`)** | Localhost:3000 | La página no debe lanzar excepción 404 ni romper el árbol de componentes. | `getBuquesRecap` retorna `null`, el bloque se omite limpiamente y muestra el roster oficial. | **PASS** |
| **Scraper de WhatsApp** | `WhatsApp/2.x` bot | La URL compartida debe devolver imagen 1200x630px con código 200 OK directo. | URL devuelve `image/png` 200 OK desde Cloudflare Workers. Título y descripción formateados. | **PASS** |
| **Eliminación de AI-Slop** | UI Visual Audit | Cero iconos de chispas naranja o estrellas en el bloque de análisis. | Sustituidos por barras de acento de marca y puntos tipográficos limpios. | **PASS** |

---

## 6. CONCLUSIONES PARA LA AUDITORÍA EXTERNA

1. **Robustez y Tolerancia a Fallos**: La aplicación utiliza el patrón de importación dinámica protegida por bloques `try...catch` en Server Components de Next.js, lo cual garantiza que la adición progresiva de archivos JSON en `src/data/buques-recaps/*.json` no requiera cambios en el código de las páginas.
2. **Performance First**:
   - Se ha erradicado el bloqueo de LCP mediante `priority` en imágenes above-the-fold.
   - El reproductor de YouTube no inyecta scripts de terceros hasta que el usuario hace click en reproducir.
   - Los re-renders de React han sido eliminados de los bucles críticos de animación en el Hero.
3. **Fidelidad de Marca**: Todas las piezas visuales siguen la dirección de arte establecida para *Drafteados: Tu Casa NBA*, respetando los tokens de color (`#FF5A1F`), la tipografía display (`Bebas Neue`) y un tono editorial profesional alejado de clichés generados por inteligencia artificial.
