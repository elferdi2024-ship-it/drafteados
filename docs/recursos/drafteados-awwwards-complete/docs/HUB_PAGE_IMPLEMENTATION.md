# Guía de implementación — 5 rutas Hub (DRAF-011 + 015 + 016)

Usar componentes de `@/components/ui` y `@/components/nba`.  
Copy exacto de `docs/COPY_DECK.md`.

---

## Patrón común

```tsx
import { PageHeader } from "@/components/ui";
import { Callout } from "@/components/ui";
// datos + GameCard / tablas según ruta
```

1. **Una sola nav** (layout Hub) — sin chips duplicados bajo el título.  
2. **PageHeader** con eyebrow / title / description del Copy Deck.  
3. Contenido.  
4. **EmptyState / ErrorState / Skeleton** según estado de datos.

---

## `/nba` — Hoy

```tsx
<PageHeader
  eyebrow={`NBA HUB · LOS BUQUES · ${fechaLegible}`}
  title="Hoy en la NBA"
  description="Marcadores, clasificación y lo que importa hoy."
/>

{/* Countdown solo aquí */}
{/* Lista de GameCard: partidos de hoy / próximos */}
```

- Eliminar segunda fila de navegación (Clasificación / Calendario / 30 equipos chips).  
- Countdown: no repetir en Calendario.

---

## `/nba/calendario`

```tsx
<PageHeader
  eyebrow="NBA HUB · LOS BUQUES · TEMPORADA 2026/27"
  title="Calendario"
  description="Todos los partidos · Horarios España y EE.UU."
/>

{/* ChipGroup: todos | pretemporada | este | oeste */}
{/* Input buscar: placeholder "Buscar equipo, ciudad o pabellón…" */}
{/* GameCard por partido, agrupados por día */}
```

Empty: `No hay partidos para esta fecha.`  
Búsqueda sin resultados: `Ningún partido coincide con la búsqueda.`

---

## `/nba/clasificacion`

```tsx
<PageHeader
  eyebrow="NBA HUB · LOS BUQUES · TEMPORADA 2026/27"
  title="Clasificación"
  description="Tabla actual · Este y Oeste."
/>

{/* Si pretemporada / datos no oficiales: */}
<Callout variant="warning" title="Pretemporada">
  Pretemporada · Los resultados no cuentan para la clasificación oficial.
</Callout>

<table>
  <StandingsTableHead />
  <tbody>
    {teams.map(t => (
      <StandingsRow key={t.tricode} team={t} tier={tierFor(t.rank)} />
    ))}
  </tbody>
</table>
```

Crónica larga del campeón: colapsar o mover a página de equipo; no dominar la vista.

---

## `/nba/lideres`

```tsx
<PageHeader
  eyebrow="NBA HUB · LOS BUQUES · PRETEMPORADA 2026/27"
  title="Líderes"
  description="Líderes de la última temporada regular."
/>

<Callout variant="warning">
  Datos de la temporada 2025/26. Se actualizan al inicio de la temporada regular.
</Callout>

{/* ChipGroup: puntos | asistencias | rebotes | … */}
{/* Top 3 + tabla */}
```

---

## `/nba/equipos`

```tsx
<PageHeader
  eyebrow="NBA HUB · LOS BUQUES · FRANQUICIAS"
  title="Equipos"
  description="Las 30 franquicias · Roster, stats y calendario."
/>

{/* Grid 30 únicos — cero duplicados — logos con onError fallback */}
```

---

## Estados de datos (todas las rutas)

| Estado | Componente |
|--------|------------|
| Loading | `GameCardSkeleton` / skeletons de tabla |
| Empty | `EmptyState` + copy deck |
| Error | `ErrorState` + onRetry |

---

## Checklist por PR

- [ ] Copy del deck (no improvisar)  
- [ ] Sin nav duplicada  
- [ ] Tokens `--color-*` (no grises hardcodeados)  
- [ ] Logos con fallback  
- [ ] Build + smoke mobile  
