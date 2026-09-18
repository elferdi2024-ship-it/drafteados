# Drafteados — Horarios hispanoamérica + craft UI (botones, menú, tarjetas)

**Objetivo:** que el Hub se sienta “Tu casa NBA” para España y toda Hispanoamérica, con UI de nivel producto premium (Awwwards-adjacent).

---

## 1. HORARIOS MULTI-REGIÓN

### 1.1 Principio de producto
- El partido en la NBA se agenda en **ET (America/New_York)** como fuente de verdad.
- El usuario ve **su hora local** primero; ET como secundario.
- Nunca mostrar solo ET sin contexto.

### 1.2 Regiones prioritarias (v1)

| Código | País / región | IANA timezone | Bandera emoji | Notas |
|--------|---------------|---------------|---------------|--------|
| ES | España | `Europe/Madrid` | 🇪🇸 | CET/CEST |
| AR | Argentina | `America/Argentina/Buenos_Aires` | 🇦🇷 | UTC−3 fijo |
| UY | Uruguay | `America/Montevideo` | 🇺🇾 | UTC−3 |
| CL | Chile | `America/Santiago` | 🇨🇱 | horarios de verano |
| CO | Colombia | `America/Bogota` | 🇨🇴 | UTC−5 |
| MX | México (CDMX) | `America/Mexico_City` | 🇲🇽 | CST/CDT |
| PE | Perú | `America/Lima` | 🇵🇪 | UTC−5 |
| VE | Venezuela | `America/Caracas` | 🇻🇪 | |
| US-ET | Referencia NBA | `America/New_York` | 🇺🇸 | Siempre visible como “ET” |

v1.1 opcional: `America/Sao_Paulo` 🇧🇷 (comunidad BR grande en NBA).

### 1.3 UX de selector
**Persistencia:** `localStorage['drafteados-tz-region']` = `ES` | `AR` | …

**UI sugerida:**
- Chip en header del Hub: `🇪🇸 01:00` o `🇦🇷 21:00`
- Tap → sheet/dropdown con lista de países (bandera + nombre + hora de ejemplo del próximo partido)
- En cards de partido: **hora grande en zona elegida** + subtítulo `7:00 PM ET`

**Componente:** `<GameTime date={iso} />`  
**Componente:** `<TimezonePicker />`

### 1.4 Formato de hora
- España: `01:00` + “peninsular” o solo hora si el chip ya dice ES
- Latam: `21:00` formato 24h (preferido en AR/UY/CL/CO) o 12h en MX según convención local — **default 24h** salvo MX opcional 12h
- Siempre incluir día si no es “hoy”: `dom 4 oct · 21:00`

### 1.5 Implementación técnica
```ts
// src/lib/time/regions.ts
export const REGIONS = [
  { id: "ES", label: "España", tz: "Europe/Madrid", flag: "🇪🇸" },
  { id: "AR", label: "Argentina", tz: "America/Argentina/Buenos_Aires", flag: "🇦🇷" },
  // ...
] as const;

export function formatGameTime(iso: string, regionId: string) {
  const region = REGIONS.find(r => r.id === regionId) ?? REGIONS[0];
  return new Intl.DateTimeFormat("es", {
    timeZone: region.tz,
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(iso));
}
```

Detectar default: `Intl.DateTimeFormat().resolvedOptions().timeZone` mapeado a región más cercana; fallback `ES` o `AR` según analytics después.

---

## 2. SISTEMA DE BOTONES (rediseño)

### 2.1 Principios
- Un solo radio: `12px` (md) / `9999px` solo en pills de nav/chips
- Altura táctil mínima **44px** (mobile) / **40px** desktop compact
- No más de **2** botones primarios por vista
- Estado focus-visible con anillo naranja marca

### 2.2 Variantes
| Variant | Uso | Estilo |
|---------|-----|--------|
| `primary` | CTA principal (Pick’em, YouTube, Jugar) | bg naranja `#F97316`, texto blanco, hover `#EA580C`, sombra suave |
| `secondary` | Acción alternativa | surface + border subtle, texto primary |
| `ghost` | Terciario | transparent / soft orange bg |
| `outline` | Secundario fuerte | border strong, bg transparent |
| `danger` | Raro | solo destructivo |
| `live` | En vivo | verde live + glow mínimo |

### 2.3 Tamaños
- `sm` 36–40px height, text-xs/sm, padding x 14
- `md` 44–48px, text-sm, padding x 20
- `lg` 52px, text-base, padding x 24 (hero only)

### 2.4 Detalle de craft
- Icono + label gap 8px
- Loading: spinner 16px, `aria-busy`
- Disabled: opacity 0.4, no hover
- Transición 150ms ease-out
- Nunca texto en ALL CAPS en botones largos; nav chips sí pueden ser uppercase tracking

---

## 3. MENÚ / NAVEGACIÓN

### 3.1 Header global (home)
- Fondo: blur + surface semitransparente en scroll; sólido al top
- Logo izquierda; links centro/derecha; CTAs: Pick’em primary, YouTube secondary
- Theme toggle + **Timezone chip** agrupados a la derecha
- Mobile: hamburger o bottom bar Hub; no esconder Pick’em

### 3.2 Hub nav
- Pill activa: primary filled
- Inactivas: ghost, hover surface-2
- Icono + label en desktop; icono + label corto en mobile
- Sticky con blur; altura 56–64px
- Separar visualmente “herramientas” (Hoy…Equipos) de “comunidad” (Pick’em)

### 3.3 Craft
- Indicador activo no solo color: pill con sombra 0 1px 2px
- Transición de pill con layout animation suave (Framer o CSS)
- Skip link “Ir al contenido” para a11y

---

## 4. TARJETAS (rediseño)

### 4.1 GameCard
```
┌─────────────────────────────────────┐
│ 23:00 🇦🇷     Videotron Centre    │  ← hora LOCAL dominante
│ 7:00 PM ET                          │
│                                     │
│  [Logo] MIA    VS    TOR [Logo]     │
│         #10          #6             │
│─────────────────────────────────────│
│ Programado              Ver previa →│
└─────────────────────────────────────┘
```
- Hora local ≥ 16px bold; ET ≤ 12px muted
- Logos 40px; tricode display o sans bold
- 1 línea contexto opcional: “Este · #10 vs #6”
- Hover: -2px translate + shadow
- Live: borde/acento verde + badge

### 4.2 Match hero (partido)
- Split gradient 8–12% opacity primary away / home
- Hora local enorme; ET debajo
- Timezone chip accesible desde aquí también

### 4.3 Standings row
- Logo 24px + nombre
- W/L tabular
- STRK badge color
- Hover: background surface-2
- Playoff tier: barra verde 3px left; play-in naranja

### 4.4 Team hero card
- Border-left 6px team primary
- Logo 80–96px
- Fondo gradient team primary → transparent

### 4.5 Principio
Cada tarjeta = **1 pregunta respondida**.  
Si no aporta, fusionar o eliminar.

---

## 5. TIPOGRAFÍA (refuerzo)

| Token | Familia | Uso |
|-------|---------|-----|
| `display` | Bebas Neue o Clash (una sola) | H1, scores grandes, VS |
| `sans` | Plus Jakarta Sans | UI, body, nav |
| `mono` | JetBrains Mono | stats, horas opcionales |

Escala Hub:
- H1: display 40–48px
- Section: sans 20–24px semibold
- Card title: 16px semibold
- Meta: 12–13px muted
- Score: display o mono 28–32px tabular

---

## 6. EQUIPO IMAGINARIO (roles en el prompt)

| Rol | Responsabilidad |
|-----|-----------------|
| Art direction | Cohesión home↔Hub, color, signature |
| UI design | Botones, nav, cards specs |
| Motion | 150ms, reduced-motion |
| Front engineer | Timezone lib, components, a11y |
| Content | Labels de regiones, microcopy horas |
| QA | Probar ES/AR/MX en un partido real |

---

## 7. ORDEN DE BUILD

1. `regions.ts` + `formatGameTime` + persistencia  
2. `TimezonePicker` en Hub header  
3. `GameTime` en GameCard + Match hero  
4. Rediseño Button tokens (ya existe; alinear tamaños/radios)  
5. Hub nav pills craft  
6. GameCard layout hora-local-first  
7. Standings + team hero polish  
8. QA multi-país + mobile
