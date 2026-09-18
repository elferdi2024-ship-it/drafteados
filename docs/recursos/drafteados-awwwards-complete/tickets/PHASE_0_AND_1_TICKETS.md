# DRAFTEADOS — Tickets Fase 0 y Fase 1

**Origen:** Awwwards Project Bible v1.0 + Figma Tokens Spec v1.0  
**Tracker:** copiar a Linear / Jira / GitHub Issues  
**Labels sugeridos:** `foundation` · `design-system` · `hub` · `copy` · `data` · `a11y` · `perf`

---

## Convención

| Campo | Valor |
|-------|--------|
| ID | `DRAF-XXX` (renumerar en tu tracker) |
| Priority | P0 = bloquea todo · P1 = crítico fase · P2 = importante |
| Estimate | T-shirt S / M / L o puntos |
| DoD | Definition of Done al final de cada ticket |

---

# FASE 0 — Fundación (1–2 semanas)

**Objetivo:** Art direction cerrada en tokens+código, copy limpio, inventario de bugs de datos, estructura de repo lista.

---

### DRAF-001 · Importar tokens CSS al repo
**Priority:** P0 · **Estimate:** S · **Labels:** `foundation` `design-system`

**Description**  
Integrar `src/styles/tokens.css` + `src/app/globals.css` del paquete drop-in. Verificar Light/Dark vía `data-theme`.

**Acceptance criteria**
- [ ] Variables `--color-*`, `--space-*`, `--radius-*` disponibles en runtime
- [ ] `data-theme="light"` y `"dark"` cambian canvas/text/border
- [ ] `prefers-reduced-motion` anula durations
- [ ] No regresiones visuales graves en home actual

**DoD:** PR merged + screenshot light/dark en staging

---

### DRAF-002 · Primitivos UI (Button, Badge, Card, Chip, PageHeader)
**Priority:** P0 · **Estimate:** M · **Labels:** `design-system`

**Description**  
Añadir componentes de `src/components/ui/*`. Storybook o ruta `/ui` de laboratorio opcional.

**Acceptance criteria**
- [ ] Button: 5 variants × 3 sizes × states (incl. loading, disabled, focus-visible)
- [ ] Badge: live (radar), final, scheduled, east, west, streaks
- [ ] Card: default / interactive / featured
- [ ] Chip: active / inactive (filtros)
- [ ] PageHeader: eyebrow + title + description + actions
- [ ] `cn()` utility operativa
- [ ] Dependencias `clsx` + `tailwind-merge` instaladas

**DoD:** Componentes exportados desde barrel; usados en al menos una página de prueba

---

### DRAF-003 · Fonts (Display + Sans + Mono)
**Priority:** P0 · **Estimate:** S · **Labels:** `design-system` `perf`

**Description**  
Cargar Bebas Neue (o Clash Display — **decidir una**), Plus Jakarta Sans, JetBrains Mono vía `next/font`. Wire a `--font-display`, `--font-sans`, `--font-mono`.

**Acceptance criteria**
- [ ] Una sola familia display en todo el producto
- [ ] `font-display` / `font-sans` / `font-mono` resuelven sin FOUT grave
- [ ] Subset o `display: swap`; preconnect si es external
- [ ] Tabular nums en stats (clase `.tabular` o `data-stat`)

**DoD:** Documentado en README del design system qué font quedó canónica

---

### DRAF-004 · Copy deck — purge AI slop
**Priority:** P0 · **Estimate:** M · **Labels:** `copy`

**Description**  
Inventario de todos los strings user-facing (Home, Hub ×5, Pick’em, footer). Reemplazar lista negra del Bible. Entregar sheet o JSON de copy final.

**Acceptance criteria**
- [ ] Cero apariciones de: “mirada de…”, “pulso diario…”, “tripulación global unida…”, “¡Ups!”
- [ ] Subtítulos Hub canónicos (Hoy / Calendario / Clasificación / Líderes / Equipos)
- [ ] Microcopy empty/error/loading definidos
- [ ] Review editorial firmado (UX writer o founder)

**DoD:** Copy deck en `docs/COPY_DECK.md` + strings aplicados o en tickets hijos

---

### DRAF-005 · Inventario datos NBA (logos, duplicados, temporada)
**Priority:** P0 · **Estimate:** M · **Labels:** `data` `hub`

**Description**  
Auditoría de `/nba/equipos`, líderes, clasificación, calendario.

**Acceptance criteria**
- [ ] Lista de equipos duplicados y causa
- [ ] Lista de logos rotos / placeholders
- [ ] Fuente única de logos (CDN/API) documentada
- [ ] Regla de etiquetado: oficial | pretemporada | referencia 2025/26
- [ ] Ticket(s) de fix creados (Fase 1)

**DoD:** Informe en `docs/DATA_AUDIT.md` + issues hijos linkeados

---

### DRAF-006 · Decisión Hub light vs dark
**Priority:** P1 · **Estimate:** S · **Labels:** `foundation` `design-system`

**Description**  
Cerrar si el Hub migra a dark (alineado Pick’em) o permanece light con semantic tokens. Actualizar Bible + Figma modes.

**Acceptance criteria**
- [ ] Decisión escrita en docs
- [ ] Tokens default del shell Hub documentados
- [ ] Figma Semantic mode default actualizado

**DoD:** ADR corto en `docs/ADR-hub-theme.md`

---

### DRAF-007 · Estructura de carpetas y CI mínima
**Priority:** P1 · **Estimate:** S · **Labels:** `foundation`

**Description**  
Alinear repo a estructura del Bible (`components/ui`, `components/nba`, `lib`, `styles`). Lint a11y básico si existe.

**Acceptance criteria**
- [ ] Paths documentados
- [ ] ESLint/prettier no rompen UI new
- [ ] (Opcional) script `lint:a11y` o axe en CI

**DoD:** README de contribución actualizado

---

# FASE 1 — Design System en código + base Hub (1–2 semanas)

**Objetivo:** Sistema usable en producción; Hub empieza a consumir primitivos; bugs de datos críticos resueltos.

---

### DRAF-010 · Header unificado (reemplazar dobles navs)
**Priority:** P0 · **Estimate:** M · **Labels:** `design-system` `hub`

**Description**  
Un solo header. Eliminar fila de chips duplicada bajo el título en Hoy. Preparar Floating Island o header sticky según ADR.

**Acceptance criteria**
- [ ] Una sola navegación principal en Hub
- [ ] Estado activo claro (accent)
- [ ] Mobile: drawer o menú completo, targets ≥ 44px
- [ ] Links: Hoy, Calendario, Clasificación, Líderes, Equipos, Pick’em

**DoD:** QA mobile + desktop en staging

---

### DRAF-011 · Aplicar PageHeader en las 5 rutas Hub
**Priority:** P0 · **Estimate:** S · **Labels:** `hub` `copy`

**Description**  
Sustituir headers actuales por `<PageHeader />` + copy del deck.

**Acceptance criteria**
- [ ] `/nba`, `/nba/calendario`, `/nba/clasificacion`, `/nba/lideres`, `/nba/equipos`
- [ ] Eyebrow + title + description canónicos
- [ ] Sin segunda fila de nav chips

**DoD:** Screenshots de las 5 vistas

---

### DRAF-012 · Fix equipos: 30 únicos + logos
**Priority:** P0 · **Estimate:** M · **Labels:** `data` `hub`

**Description**  
Eliminar duplicados en `/nba/equipos`. Logos SVG/PNG normalizados; fallback iniciales + color.

**Acceptance criteria**
- [ ] Exactamente 30 franquicias, una card cada una
- [ ] Cero iconos de “archivo roto”
- [ ] onError → fallback
- [ ] Este / Oeste correctos

**DoD:** QA visual grid desktop + mobile

---

### DRAF-013 · Callouts de temporada / datos de referencia
**Priority:** P1 · **Estimate:** S · **Labels:** `hub` `copy` `data`

**Description**  
Componente Callout + uso en Líderes y Clasificación cuando los datos no son live 2026/27.

**Acceptance criteria**
- [ ] Texto claro: “Datos temporada 2025/26 · se actualizan al tip-off”
- [ ] Estilo soft (no alarma falsa)
- [ ] Visible en Líderes; Clasificación si aplica

**DoD:** Copy aprobado + merged

---

### DRAF-014 · Countdown solo en Hoy
**Priority:** P1 · **Estimate:** S · **Labels:** `hub`

**Description**  
Quitar countdown duplicado de Calendario (u otras). Un solo componente canónico.

**Acceptance criteria**
- [ ] Countdown en `/nba` (Hoy) únicamente — o lógica “si faltan > N días”
- [ ] Mismos tokens tipográficos Stat
- [ ] Accesible (aria-live opcional para ticks)

**DoD:** Calendario sin bloque countdown redundante

---

### DRAF-015 · GameCard v1 (Scheduled / Live / Final)
**Priority:** P1 · **Estimate:** L · **Labels:** `design-system` `hub`

**Description**  
Implementar según Figma Spec §5.3. Consumir en Hoy + Calendario.

**Acceptance criteria**
- [ ] Variants status: Scheduled | Live | Final
- [ ] Logos 36px, tricode, score tabular
- [ ] Badge live con radar
- [ ] Footer opcional (boxscore CTA)
- [ ] Compact + Full modes básicos

**DoD:** Usado en listado real de partidos; Story o demo

---

### DRAF-016 · Estados loading / empty / error (Hub data views)
**Priority:** P1 · **Estimate:** M · **Labels:** `hub` `a11y`

**Description**  
Skeletons con forma real; empty copy del deck; error + Reintentar.

**Acceptance criteria**
- [ ] Calendario, Clasificación, Líderes, Equipos cubiertos
- [ ] No spinner genérico centrado como único feedback
- [ ] Error no silencioso (UI visible)

**DoD:** Forzar empty/error en staging y validar

---

### DRAF-017 · Laboratorio `/ui` o Storybook
**Priority:** P2 · **Estimate:** S · **Labels:** `design-system`

**Description**  
Página interna con todos los primitivos para Design QA.

**Acceptance criteria**
- [ ] Button, Badge, Chip, Card, PageHeader, Callout, GameCard
- [ ] Toggle light/dark
- [ ] No indexada (noindex) si es pública

**DoD:** Link en README para el equipo

---

### DRAF-018 · Performance pass hero + fonts
**Priority:** P2 · **Estimate:** M · **Labels:** `perf`

**Description**  
Hero home: AVIF/WebP, srcset, dimensiones fijas. Fonts subset.

**Acceptance criteria**
- [ ] LCP móvil en rumbo a &lt; 2.5s (medir en staging)
- [ ] CLS sin salto de hero
- [ ] Peso imagen crítica documentado

**DoD:** Lighthouse o Web Vitals anotados en PR

---

# Orden de ejecución recomendado

```
Fase 0:  001 → 002 → 003 → 006 → 004 → 005 → 007
Fase 1:  010 → 011 → 012 → 014 → 013 → 015 → 016 → 017 → 018
```

**Bloqueantes:** 001–003 antes de cualquier UI Hub nueva.  
**Datos:** 005 alimenta 012.  
**Copy:** 004 alimenta 011 y 013.

---

# Plantilla rápida (pegar en Linear)

```
Title: DRAF-XXX · <nombre>
Priority: P0|P1|P2
Estimate: S|M|L
Labels: …

## Context
…

## Acceptance criteria
- [ ] …

## DoD
…
```

---

# Fuera de Fase 0–1 (backlog inmediato Fase 2+)

- StandingsTable completa + tiers Playoffs/Play-In  
- FloatingIslandNav en home  
- Pick’em align al design system  
- Home copy + Universo cards  
- Motion pass (Framer/Lenis con budget)  
- a11y audit completo teclado  

---

*Generado para Drafteados · Awwwards track · Sep 2026*
