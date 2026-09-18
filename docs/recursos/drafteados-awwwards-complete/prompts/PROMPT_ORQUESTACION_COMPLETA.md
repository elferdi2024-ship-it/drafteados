# PROMPT MAESTRO — Orquestación Drafteados Awwwards (resto del trabajo)

**Copiá y pegá este prompt entero** en Antigravity, Cursor, Claude Code u otro agente con acceso al repo.

---

## ROL

Sos el agente de implementación del rediseño **Drafteados Awwwards**.  
El design system, tokens, componentes base y copy **ya están en el repo** y el **build pasó**.  
Tu trabajo es **enchufar todo a las páginas reales**, limpiar datos y cerrar los tickets pendientes **sin reinventar el sistema**.

---

## CONTEXTO (NO REINVENTAR)

Ya existe y debés **reutilizar**:

| Recurso | Ubicación típica |
|---------|------------------|
| Tokens Light/Dark | `src/styles/tokens.css` + `src/app/globals.css` |
| UI | `@/components/ui` → Button, Badge, Card, Chip, ChipGroup, PageHeader, Callout, EmptyState, ErrorState, Skeleton |
| NBA | `@/components/nba` → GameCard, StandingsRow, StandingsTableHead |
| Nav | `@/components/layout` → FloatingIslandNav (opcional en home; Hub puede usar header propio unificado) |
| Copy final | `docs/COPY_DECK.md` |
| Tickets | `docs/recursos/.../tickets` o `tickets/PHASE_0_AND_1_TICKETS.md` |
| Guía Hub | `docs/HUB_PAGE_IMPLEMENTATION.md` |
| ADR tema Hub | `docs/ADR-hub-theme.md` → **Hub dark por defecto** |
| Audit datos | `docs/DATA_AUDIT.md` |

**Prohibido:**
- Inventar nuevos subtítulos o frases tipo “pulso de la liga”, “mirada de…”, “¡Ups!”
- Crear un segundo design system o hardcodear grises/naranjas fuera de tokens
- Dejar la doble navegación (nav superior + chips bajo el título en Hoy)
- Shippear logos rotos o equipos duplicados
- Animaciones pesadas que rompan `prefers-reduced-motion`

---

## OBJETIVO

Dejar el **NBA Hub** (`/nba` y subrutas) consumiendo el design system + copy deck, con datos limpios y estados loading/empty/error.  
Home y Pick’em: solo alinear lo crítico (copy genérico residual + no romper build).

---

## PLAN DE EJECUCIÓN (ORDEN OBLIGATORIO)

### Fase A — Headers y nav (DRAF-010, DRAF-011)

1. En las **5 rutas** del Hub:
   - `/nba`
   - `/nba/calendario`
   - `/nba/clasificacion` (o el slug real del proyecto)
   - `/nba/lideres`
   - `/nba/equipos`
2. Reemplazar bloques de título/subtítulo por `<PageHeader />` con strings **exactos** de `COPY_DECK.md`.
3. Eliminar cualquier **segunda fila de chips de navegación** bajo el título en Hoy.
4. Asegurar **una sola nav** de secciones del Hub.

**DoD:** Las 5 páginas muestran PageHeader correcto; no hay nav duplicada; `npm run build` OK.

---

### Fase B — Datos equipos (DRAF-012, DRAF-005)

1. Completar o ejecutar auditoría según `DATA_AUDIT.md`.
2. `/nba/equipos`: **exactamente 30** franquicias, sin duplicados.
3. Logos: URL válida o fallback (iniciales); **nunca** icono de archivo roto (`onError`).
4. Conferencias Este/Oeste coherentes.

**DoD:** Grid de 30 únicos; cero placeholders rotos; build OK.

---

### Fase C — Callouts y countdown (DRAF-013, DRAF-014)

1. Countdown **solo en Hoy** (`/nba`), no en Calendario.
2. En **Líderes**: `<Callout>` con  
   `Datos de la temporada 2025/26. Se actualizan al inicio de la temporada regular.`  
   (si los datos siguen siendo de referencia).
3. En **Clasificación**: callout de pretemporada si aplica.

**DoD:** Sin countdown duplicado; callouts visibles donde correspondan.

---

### Fase D — GameCard en feeds (DRAF-015)

1. Sustituir cards de partido legacy en **Hoy** y **Calendario** por `<GameCard />`.
2. Mapear status: `scheduled` | `live` | `final`.
3. Pasar `statusLabel`, tricodes, scores, `logoUrl`, broadcast si existe.
4. Loading: `<GameCardSkeleton />`. Empty/Error: componentes UI + copy deck.

**DoD:** Partidos reales renderizan con GameCard; estados de red cubiertos.

---

### Fase E — Clasificación con StandingsRow (si hay tabla)

1. Usar `<StandingsTableHead />` + `<StandingsRow />`.
2. Tiers: playoffs (1–6), play-in (7–10), lottery (11–15) según reglas NBA.
3. Stats con `tabular-nums` / `data-stat`.

**DoD:** Tabla legible desktop + mobile (scroll o cards si hace falta).

---

### Fase F — Copy residual home (opcional pero recomendado)

1. Buscar en home strings de la **lista negra** del Copy Deck y reemplazar.
2. Cards “Universo”: textos del deck (Buques Club, 3+1, Viajes, Hub, Pick’em).

**DoD:** Grep sin matches de frases prohibidas.

---

### Fase G — Verificación final

```bash
npm run build
```

- [ ] Build 0 errors  
- [ ] Hub dark (tokens), sin grises hardcodeados en headers nuevos  
- [ ] Mobile smoke: nav, headers, una lista de partidos, equipos  
- [ ] No regresión Pick’em / home hero  

---

## REGLAS TÉCNICAS

1. Imports desde barrels: `@/components/ui`, `@/components/nba`.
2. Tema: no forzar `#FAFAFA` en layout Hub; respetar `ADR-hub-theme.md` (dark default).
3. Si un componente del pack no compila en este repo, **arreglar tipos con el mínimo diff** (como se hizo con Card/GameCard); no reescribir el diseño.
4. Commits pequeños por fase (A, B, C…).
5. No añadir dependencias nuevas salvo que falte `clsx` / `tailwind-merge`.

---

## CRITERIOS DE ÉXITO GLOBAL

| Criterio | Hecho cuando |
|----------|----------------|
| Sistema visual | Páginas Hub usan tokens + PageHeader + componentes pack |
| Voice | Cero AI slop en Hub (y home si Fase F) |
| Datos | 30 equipos, logos OK, callouts de temporada |
| UX | Una nav; loading/empty/error en feeds de partidos |
| Calidad | `npm run build` pass |

---

## SI ALGO NO ESTÁ EN EL REPO

Si faltan archivos del pack (`EmptyState`, `ChipGroup`, `HUB_PAGE_IMPLEMENTATION.md`, etc.), créalos según el design system ya presente (tokens + patrones de Button/Card) **antes** de seguir con las páginas.

---

## RESPUESTA QUE DEBÉS DAR AL TERMINAR

1. Lista de archivos tocados por fase.  
2. Screenshots o descripción de las 5 rutas Hub.  
3. Resultado de `npm run build`.  
4. Tickets equivalentes cerrados (010–016).  
5. Riesgos / TODOs residuales (Pick’em deep, motion, perf hero).

---

**Empezá por Fase A ahora. No saltees el orden. No reescribas el design system.**
