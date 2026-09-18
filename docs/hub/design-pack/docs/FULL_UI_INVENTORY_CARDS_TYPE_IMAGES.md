# Drafteados — Inventario completo: tarjetas, tipografía, imágenes

**Squad:** Art Direction · UI Design · Motion · Front · Content · QA  
**Objetivo:** Un solo lenguaje visual en home, Hub, partido, equipo, clasificación, líderes, Pick’em.

---

## 1. TIPOGRAFÍA (sistema cerrado)

### Familias (máximo 3)
| Token | Familia | Uso exclusivo |
|-------|---------|----------------|
| `--font-display` | **Una sola:** Bebas Neue *o* Clash Display | H1 página, scores grandes, “VS”, countdown dígitos, hero home |
| `--font-sans` | Plus Jakarta Sans | Nav, body, labels, cards, tablas (headers) |
| `--font-mono` | JetBrains Mono | W-L, PCT, GB, stats numéricas, opcional horas |

### Escala (Hub + producto)
| Nombre | Size / line / weight | Uso |
|--------|----------------------|-----|
| `display-xl` | 48–64px / 0.95 / display | Hero home only |
| `display-lg` | 40–48px / 0.95 / display | H1 Hub (“Hoy en la NBA”) |
| `display-md` | 28–32px / 1 / display | Scores en vivo / final |
| `title-sm` | 18–20px / 1.2 / sans semibold | Títulos de sección |
| `body` | 15–16px / 1.5 / sans regular | Descripciones |
| `label` | 11–12px / 1.3 / sans bold uppercase tracking | Eyebrows, chips |
| `stat` | 14–16px / 1 / mono tabular | Celdas de tabla |
| `meta` | 12–13px / 1.4 / sans | Arena, ET, secondary |

### Reglas
- Nunca 2 familias display a la vez.
- Nunca display en párrafos largos.
- Tablas: header `label`, celdas `stat`.
- Match hero nombres de equipo: `display-lg` o `title` sans black — **consistente en las 30 landings**.

---

## 2. INVENTARIO DE TARJETAS (todas)

### 2.1 Hub — GameCard
**Pregunta que responde:** ¿Quién juega, a qué hora *mía*, y cómo lo abro?
- GameTime local + ET
- Logos 40px CDN
- Status badge
- CTA “Ver previa” / Boxscore
- Hover elevación 2px

### 2.2 Hub — Countdown / Opening Night card
**Pregunta:** ¿Cuánto falta para la temporada?
- Dígitos display + labels meta
- Sin ruido; 1 CTA opcional a calendario

### 2.3 Hub — Stat strip cards (Opening Night, Campeón, etc.)
**Pregunta:** Un dato de contexto
- Logo si aplica
- Label uppercase + valor strong
- Altura uniforme en el row

### 2.4 Hub — MiniStandings card
**Pregunta:** ¿Cómo va el Este/Oeste en resumen?
- 5–6 filas, logo 20–24px
- Link “Ver tabla completa”
- STRK badges

### 2.5 Hub — MiniLeaders card
**Pregunta:** ¿Quién manda en una stat?
- Headshot 32px + nombre + PPG
- Link a /lideres

### 2.6 Hub — Pick’em promo card
**Pregunta:** ¿Por qué jugar picks ahora?
- Primary CTA
- 3 bullets cortos máximo

### 2.7 Partido — Match hero
**Pregunta:** ¿Qué partido es y a qué hora lo veo?
- Logos 64–80px
- GameTime lg
- Rank + record
- Team color wash

### 2.8 Partido — Narrative keys (3 cards)
**Pregunta:** ¿Por qué verlo?
- Número + una frase con dato
- Sin párrafos

### 2.9 Partido — Compare bars
**Pregunta:** ¿Quién entra mejor?
- Barras con color de franquicia
- 4–6 métricas máx.

### 2.10 Partido — Rotation / lineup columns
**Pregunta:** ¿Quién puede saltar a la cancha?
- Headshot + nombre + 1 meta (no solo salario)
- Label “Rotación reciente” si no hay quinteto oficial

### 2.11 Partido — Fixture strip
**Pregunta:** ¿De dónde vienen y a dónde van?
- Últimos 3 / próximos 3 compactos

### 2.12 Clasificación — Honor cards (campeón narrativa)
**Pregunta:** ¿Cuál es el cuadro de honor Buques?
- Logo + badge narrativa
- Links a plantilla

### 2.13 Clasificación — Standings table/card
**Pregunta:** ¿Quién está arriba y en qué forma?
- Logo, W-L, STRK, L10
- Tier bar playoff/play-in

### 2.14 Equipo — Team hero
**Pregunta:** ¿Cómo está *mi* franquicia?
- Logo 96px, primary border, record, rank, streak

### 2.15 Equipo — Player card
**Pregunta:** ¿Quién es y qué aporta?
- Headshot, posición, age
- PTS/REB/AST si hay
- Contrato secundario (no dominante)

### 2.16 Equipos grid — Team tile
**Pregunta:** ¿A qué equipo entro?
- Logo 48px + nombre
- Hover border brand/team

### 2.17 Líderes — Leader row / podium
**Pregunta:** ¿Quién lidera la liga en X?
- Headshot, equipo logo mini, stat grande

### 2.18 Home — Universe cards
**Pregunta:** ¿Qué más es Drafteados?
- Imagen/icono, título, 1 línea, CTA
- Copy del COPY_DECK

### 2.19 Home — Content / video cards
**Pregunta:** ¿Qué veo del canal?
- Thumbnail 16:9, título, meta

### 2.20 Pick’em — Pick / rank cards
**Pregunta:** ¿Qué elijo / cómo voy?
- Misma Button + tokens; no tercera estética

---

## 3. IMÁGENES (política única)

| Tipo | Fuente | Tamaño UI | Fallback |
|------|--------|-----------|----------|
| Logo equipo | `cdn.nba.com/logos/nba/{id}/primary/L/logo.svg` | 24 / 40 / 80 / 96 | Iniciales + color team |
| Headshot | `cdn.nba.com/headshots/nba/latest/260x260/{id}.png` | 32 / 48 / 64 | Inicial del apellido |
| Thumb YouTube | API / oEmbed | 16:9 | Color surface + play icon |
| Hero home | Asset propio optimizado AVIF/WebP | full | — |
| OG default | `/og/default.png` 1200×630 | social | — |

### Reglas
- Nunca icono de archivo roto.
- `loading="lazy"` bajo el fold; `priority` solo LCP.
- Dimensiones width/height fijas para CLS.
- `next.config` remotePatterns: `cdn.nba.com`, `a.espncdn.com`, `i.ytimg.com`.

---

## 4. TOKENS DE TARJETA (compartidos)

```
radius: md (12px)
padding: 16–18px
border: color-border-subtle
bg: color-surface-1
shadow: shadow-card / hover shadow-card-hover
gap interno: 8–12px
```

Estados: default · hover · active · disabled · loading (skeleton).

---

## 5. ORDEN DE IMPLEMENTACIÓN (squad)

| Fase | Scope |
|------|--------|
| T1 | Tipografía: aplicar escala en layout Hub + home H1 |
| T2 | GameCard + Match hero (tipo + imagen + hora) |
| T3 | MiniStandings + MiniLeaders + Standings rows |
| T4 | Team hero + Player cards + Equipos grid |
| T5 | Narrative keys + Compare + Rotation + Fixture |
| T6 | Honor cards + Leaders + Universe + Video |
| T7 | Pick’em cards alineación tokens |
| T8 | QA visual light/dark + mobile + grep imágenes rotas |

---

## 6. DEFINICIÓN DE “HECHO” GLOBAL

- [ ] Una sola display font en producción  
- [ ] Todas las cards del inventario usan tokens (no grises hardcode)  
- [ ] Cero logos/headshots rotos en rutas principales  
- [ ] Hora local en toda card de partido  
- [ ] Player cards: stats visibles antes que salario  
- [ ] Home universe = copy deck  
- [ ] `npm run build` PASS  
- [ ] Smoke mobile 375px en Hoy, Partido, Clasificación, Equipo  
