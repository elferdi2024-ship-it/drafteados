# DRAFTEADOS — FIGMA-READY DESIGN TOKENS & COMPONENT SPECIFICATION
**Version:** 1.0.0 · **Target Standard:** Awwwards Site of the Day / Developer Award  
**Stack Alignment:** Next.js 15+ / React 19 / Tailwind CSS v4 / Framer Motion / Lenis Smooth Scroll  
**Design Environment:** Figma Variables (Modes: Light / Dark) + Auto-Layout 5.0 + Component Properties

---

## 1. FIGMA ARCHITECTURE & VARIABLE COLLECTIONS

### 1.1 Colecciones en Figma
Configurar las siguientes 4 Colecciones en Figma (`Local Variables`):

1. **`01_Primitives`**: Valores crudos independientes del contexto (paleta pura de colores, escalas numéricas de espaciado, radio, timing).
2. **`02_Semantic`**: Alias funcionales según propósito (`bg-surface`, `text-primary`, `border-subtle`, `accent-live`). Contiene 2 Modos: **`Light`** (Default) y **`Dark`**.
3. **`03_Components`**: Mapeo directo de tokens a slots específicos de componentes (`button-primary-bg`, `card-game-border`, `chip-live-radar`).
4. **`04_Dimensions`**: Escalas de layout, grid, max-widths, breakpoints y espaciado auto-layout.

---

## 2. COLOR TOKEN SYSTEM

### 2.1 Primitivos (`01_Primitives/Color`)

```
Primitives/Color/
├── Orange/
│   ├── 50:  #FFF7ED
│   ├── 100: #FFEDD5
│   ├── 200: #FED7AA
│   ├── 300: #FDBA74
│   ├── 400: #FB923C
│   ├── 500: #F97316 (Brand Accent Core)
│   ├── 600: #EA580C (Brand Accent Hover)
│   ├── 700: #C2410C
│   └── 900: #7C2D12
├── Coral/
│   ├── 500: #FF5A1F (Legacy Brand Punch)
│   └── 600: #E04810
├── Neutral/
│   ├── 0:   #FFFFFF (Pure White)
│   ├── 50:  #FAFAFA (Canvas Light)
│   ├── 100: #F5F5F5 (Surface Light)
│   ├── 200: #E5E5E5 (Border Light)
│   ├── 300: #D4D4D4
│   ├── 400: #A3A3A3 (Muted Light)
│   ├── 500: #737373
│   ├── 600: #525252
│   ├── 700: #404040
│   ├── 800: #262626 (Border Dark)
│   ├── 850: #1C1C1E
│   ├── 900: #171717 (Surface Dark)
│   ├── 950: #0D0D0E (Canvas Sub-dark)
│   └── 1000: #0A0A0A (Canvas True Dark)
├── Semantic/
│   ├── Live-Green: #16A34A
│   ├── Live-Green-Glow: rgba(22, 163, 74, 0.25)
│   ├── Loss-Red:   #DC2626
│   ├── Loss-Red-Soft: rgba(220, 38, 38, 0.12)
│   ├── East-Blue:  #2563EB (Light) / #3B82F6 (Dark)
│   └── West-Purple:#9333EA (Light) / #A855F7 (Dark)
```

---

### 2.2 Semantic Variables (`02_Semantic/Color` - Light vs Dark Mode)

| Token Name | Light Mode Value | Dark Mode Value | Uso & Contexto Figma |
|---|---|---|---|
| `color/bg/canvas` | `#FAFAFA` (`Neutral-50`) | `#0A0A0A` (`Neutral-1000`) | Fondo global de página |
| `color/bg/surface-1` | `#FFFFFF` (`Neutral-0`) | `#171717` (`Neutral-900`) | Cards base, modales, drawers |
| `color/bg/surface-2` | `#F5F5F5` (`Neutral-100`) | `#262626` (`Neutral-800`) | Headers de tabla, hover en rows |
| `color/bg/surface-3` | `#E5E5E5` (`Neutral-200`) | `#303030` (`Neutral-750`) | Segmented controls, chips inactivos |
| `color/border/subtle` | `rgba(0,0,0, 0.08)` | `rgba(255,255,255, 0.08)` | Separadores y bordes estándar |
| `color/border/strong` | `#D4D4D4` (`Neutral-300`) | `#404040` (`Neutral-700`) | Hover en cards, inputs activos |
| `color/border/accent` | `#F97316` | `#F97316` | Focus state, tabs seleccionadas |
| `color/text/primary` | `#0A0A0A` (`Neutral-1000`) | `#FAFAFA` (`Neutral-50`) | Títulos H1-H4, scores, nombres |
| `color/text/secondary` | `#404040` (`Neutral-700`) | `#D4D4D4` (`Neutral-300`) | Subtítulos, párrafos de apoyo |
| `color/text/muted` | `#737373` (`Neutral-500`) | `#A3A3A3` (`Neutral-400`) | Timestamps, metadata, labels |
| `color/text/dim` | `#A3A3A3` (`Neutral-400`) | `#737373` (`Neutral-500`) | Placeholders, separadores |
| `color/brand/primary` | `#F97316` (`Orange-500`) | `#F97316` (`Orange-500`) | Botones CTA, insignias clave |
| `color/brand/hover` | `#EA580C` (`Orange-600`) | `#EA580C` (`Orange-600`) | Hover en elementos brand |
| `color/brand/soft` | `#FFF7ED` (`Orange-50`) | `rgba(249, 115, 22, 0.15)` | Badges de marca, highlights |
| `color/state/live` | `#16A34A` | `#16A34A` | Indicador partido en vivo |
| `color/state/live-soft`| `rgba(22, 163, 74, 0.12)` | `rgba(22, 163, 74, 0.20)` | Fondo badge En Vivo |
| `color/state/win` | `#16A34A` | `#16A34A` | Victorias en tabla / racha W |
| `color/state/loss` | `#DC2626` | `#DC2626` | Derrotas en tabla / racha L |

---

## 3. TYPOGRAPHY SYSTEM

### 3.1 Familias Tipográficas
1. **Display / Hero / Punch**: `Bebas Neue` (o `Clash Display` / `Syne` como alternativa high-fashion).
2. **UI / Body / Lectura**: `Plus Jakarta Sans` o `Inter`.
3. **Tabular Data / Stats / Time**: `JetBrains Mono` / `Geist Mono` con `font-variant-numeric: tabular-nums;`.

### 3.2 Escala Tipográfica (Figma Text Styles)

| Style Name | Font Family | Weight | Size (px/rem) | Line Height | Letter Spacing | Case | Uso Principal |
|---|---|---|---|---|---|---|---|
| `Display/Hero` | Bebas Neue | Regular (400) | `72px` (4.5rem) | `0.9` (65px) | `+0.04em` | UPPERCASE | Títulos gigantes Home & Hub |
| `Display/1` | Bebas Neue | Regular (400) | `48px` (3.0rem) | `0.95` (46px) | `+0.03em` | UPPERCASE | Headers de sección, Marcadores |
| `Display/2` | Bebas Neue | Regular (400) | `32px` (2.0rem) | `1.0` (32px) | `+0.02em` | UPPERCASE | Nombres de equipo en Card |
| `Heading/1` | Plus Jakarta | Bold (700) | `24px` (1.5rem) | `1.2` (29px) | `-0.02em` | Sentence | Títulos de módulos y vistas |
| `Heading/2` | Plus Jakarta | SemiBold (600)| `20px` (1.25rem)| `1.25` (25px)| `-0.015em`| Sentence | Subtítulos y Card Titles |
| `Heading/3` | Plus Jakarta | SemiBold (600)| `16px` (1.0rem) | `1.3` (21px) | `-0.01em` | Sentence | Nombres de jugadores, grupos |
| `Body/Large` | Plus Jakarta | Regular (400) | `16px` (1.0rem) | `1.5` (24px) | `0em` | Sentence | Bajadas editoriales, lead copy |
| `Body/Default`| Plus Jakarta | Regular (400) | `14px` (0.875rem)| `1.45` (20px)| `0em` | Sentence | UI general, descripciones |
| `Body/Small` | Plus Jakarta | Medium (500) | `12px` (0.75rem) | `1.4` (17px) | `+0.01em` | Sentence | Metadata, leyendas de tabla |
| `Stat/Score` | JetBrains Mono | Bold (700) | `32px` (2.0rem) | `1.0` (32px) | `-0.04em` | Numeric | Puntos partido en vivo / final |
| `Stat/Value` | JetBrains Mono | SemiBold (600)| `18px` (1.125rem)| `1.1` (20px) | `-0.02em` | Numeric | PPG, RPG, APG, Récord W-L |
| `Badge/Caps` | Plus Jakarta | Bold (700) | `11px` (0.6875rem)| `1.0` (11px)| `+0.08em` | UPPERCASE | Tags En Vivo, Este, Oeste, Q4 |

---

## 4. SPACING, GRID & ELEVATION

### 4.1 Escala de Espaciado (Base 4px / 8px Grid)
- `space-1`: `4px`
- `space-2`: `8px`
- `space-3`: `12px`
- `space-4`: `16px`
- `space-5`: `20px`
- `space-6`: `24px`
- `space-8`: `32px`
- `space-10`: `40px`
- `space-12`: `48px`
- `space-16`: `64px`
- `space-20`: `80px`
- `space-24`: `96px`
- `space-32`: `128px`

### 4.2 Radios de Esquina (`Radius`)
- `radius-none`: `0px` (Tablas rígidas, divisores)
- `radius-xs`: `4px` (Badges diminutos, indicadores)
- `radius-sm`: `8px` (Botones compactos, inputs, chips)
- `radius-md`: `12px` (Game cards, dropdowns, mini-widgets)
- `radius-lg`: `16px` (Cards principales, modales, drawers)
- `radius-xl`: `24px` (Hero containers, floating navbars)
- `radius-full`: `9999px` (Pill badges, avatars, switches)

### 4.3 Sombras y Efectos Atmosféricos (`Elevation`)

```css
/* Elevation 0 (Flat) */
box-shadow: none;

/* Elevation 1 (Card Rest - Light) */
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04), 0 4px 12px rgba(0, 0, 0, 0.03);

/* Elevation 1 (Card Rest - Dark) */
box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05);

/* Elevation 2 (Card Hover / Dropdown) */
box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.04);

/* Brand Glow (Orange) */
box-shadow: 0 0 24px rgba(249, 115, 22, 0.22), 0 0 48px rgba(249, 115, 22, 0.10);

/* Live Pulse Glow (Green) */
box-shadow: 0 0 16px rgba(22, 163, 74, 0.35);

/* Glassmorphism Surface (Floating Nav & Overlays) */
background: rgba(23, 23, 23, 0.75); /* Dark */
backdrop-filter: blur(16px) saturate(180%);
border: 1px solid rgba(255, 255, 255, 0.10);
```

---

## 5. ESPECIFICACIÓN DE COMPONENTES CORE (FIGMA COMPONENT SETS)

---

### 5.1 Botón Principal (`Component: Button`)

#### Propiedades y Variantes en Figma:
- **`Variant`**: `Primary` | `Secondary` | `Outline` | `Ghost` | `Live-CTA`
- **`Size`**: `Small (36px)` | `Medium (44px)` | `Large (52px)`
- **`State`**: `Default` | `Hover` | `Active` | `Focus` | `Disabled` | `Loading`
- **`IconLeft`**: `Boolean` (Icon instance swap)
- **`IconRight`**: `Boolean` (Icon instance swap)

#### Auto-layout y Padding Specs:
| Size | Height | Padding X | Padding Y | Gap | Font Style | Border Radius |
|---|---|---|---|---|---|---|
| **Small** | `36px` | `14px` | `8px` | `6px` | `Body/Small (Bold)` | `radius-sm (8px)` |
| **Medium** | `44px` | `20px` | `10px` | `8px` | `Body/Default (SemiBold)` | `radius-sm (8px)` |
| **Large** | `52px` | `28px` | `14px` | `10px` | `Heading/3 (Bold)` | `radius-md (12px)` |

#### Comportamiento visual por variante:
- **`Primary`**:
  - *Default*: Background `#F97316`, Text `#FFFFFF`, Border `none`.
  - *Hover*: Background `#EA580C`, Transform `translateY(-1px)`, Shadow `glow-accent`.
  - *Active*: Background `#C2410C`, Transform `scale(0.98)`.
  - *Disabled*: Background `#737373` con opacidad `0.4`, Text `#A3A3A3`, Cursor `not-allowed`.
- **`Outline / Glass`**:
  - *Default*: Background `transparent`, Border `1px solid var(--border-subtle)`, Text `var(--text-primary)`.
  - *Hover*: Background `var(--surface-2)`, Border `1px solid var(--border-strong)`.

---

### 5.2 Chips & Badges (`Component: Chip / Badge`)

#### Variantes:
- **`Type`**: `Live` | `Status` | `Conference` | `Pickem` | `Category`
- **`State`**: `Live-Radar` | `Final` | `Scheduled` | `East` | `West` | `Streak-W` | `Streak-L`

#### Specs Detalladas:
1. **`Badge/Live`**:
   - Background: `rgba(22, 163, 74, 0.15)`
   - Border: `1px solid rgba(22, 163, 74, 0.35)`
   - Text: `#16A34A`, `Badge/Caps` (11px UPPERCASE, bold).
   - Icono izquierdo: Dot `6px` radio completo `#16A34A` con animación CSS de anillo de radar concéntrico (`@keyframes ping`).
2. **`Badge/Conference-East`**:
   - Background: `rgba(37, 99, 235, 0.12)`
   - Border: `1px solid rgba(37, 99, 235, 0.30)`
   - Text: `#3B82F6`, label `"ESTE"`.
3. **`Badge/Conference-West`**:
   - Background: `rgba(147, 51, 234, 0.12)`
   - Border: `1px solid rgba(147, 51, 234, 0.30)`
   - Text: `#A855F7`, label `"OESTE"`.

---

### 5.3 NBA Game Card (`Component: GameCard`)

Componente central del **NBA Hub** y **Pick'em Live**.

#### Variantes de Figma:
- **`Status`**: `Scheduled` | `Live` | `Final`
- **`Mode`**: `Compact (Sidebar/Carousel)` | `Full (Grid Hub)` | `Pickem-Interactive`
- **`HasOdds`**: `Boolean`
- **`Expanded`**: `Boolean` (Despliega líderes del partido: Puntos, Rebotes, Asistencias).

#### Anatomía y Dimensiones (`Full Grid Hub`):
- **Contenedor**: Auto-layout Vertical, Ancho `100%` (mínimo `340px`, máximo `420px`), Altura `Auto`.
- **Fondo**: `var(--color-surface)` (`#171717` Dark / `#FFFFFF` Light).
- **Borde**: `1px solid var(--color-border)` (`rgba(255,255,255,0.08)`).
- **Radio**: `radius-md` (`12px`).
- **Padding Interior**: `16px` (top/bottom) x `18px` (left/right).
- **Estructura Interna**:
  1. **Header Row (Auto-layout Horizontal)**:
     - Left: Badge de Estado (`LIVE 3Q 4:12` en verde radar / `FINAL` en muted / `HOY 21:00 ET`).
     - Right: Broadcast TV Tag (`ESPN`, `NBA TV`, `League Pass`) en `Body/Small` muted.
  2. **Teams Matchup Row (Grid / Auto-layout 3 columnas: Away - Center Info - Home)**:
     - *Away Team Slot*: Logo SVG `36x36px`, Tricode `BOS` en `Display/2` (28px), Récord `42-12` en `Body/Small` muted.
     - *Center Divider / Score Slot*:
       - Si es `Live`/`Final`: Score Away `108` - Score Home `112` en `Stat/Score` (32px tabular-nums). El equipo ganador tiene `font-weight: 800` y color `text-primary`; el perdedor `text-muted`.
       - Si es `Scheduled`: `VS` estilizado en `Bebas Neue` o cuota de pronóstico Pick'em (`BOS -3.5`).
     - *Home Team Slot*: Logo SVG `36x36px`, Tricode `MIA` en `Display/2` (28px), Récord `30-24` en `Body/Small` muted.
  3. **Footer / Action Bar (Auto-layout Horizontal)**:
     - Separador superior: `1px solid var(--border-subtle)`.
     - Left: En vivo: Mini timeline cuartos (`Q1: 28-24`, `Q2: 30-31`, etc.).
     - Right: Botón `"Boxscore"` o `"Hacer Pick"` (Small size).

---

### 5.4 Standings Table Row (`Component: Table/StandingsRow`)

#### Variantes:
- **`RankTier`**: `Playoffs (1-6)` (Línea lateral verde `2px`) | `Play-In (7-10)` (Línea lateral naranja `2px`) | `Lottery (11-15)` (Sin línea).
- **`State`**: `Default` | `Hover` | `Selected`

#### Anatomía de Columnas:
| Posición | Columna | Ancho Figma | Alineación | Typo Style |
|---|---|---|---|---|
| Col 1 | **Rank** (`#1`) | `36px` | Centro | `Body/Small (Bold)` |
| Col 2 | **Equipo** (Logo + Nombre) | `Auto (Fill)` | Izquierda | Logo `24px` + `Heading/3` |
| Col 3 | **W** (Victorias) | `44px` | Derecha | `Stat/Value (Bold, Green)` |
| Col 4 | **L** (Derrotas) | `44px` | Derecha | `Stat/Value (Bold, Red)` |
| Col 5 | **PCT** (% Triunfos) | `60px` | Derecha | `Stat/Value (Muted)` |
| Col 6 | **GB** (Partidos atrás) | `48px` | Derecha | `Stat/Value (Muted)` |
| Col 7 | **STRK** (Racha `W4`/`L2`)| `54px` | Centro | `Badge/Caps` |
| Col 8 | **L10** (Últimos 10) | `54px` | Derecha | `Body/Small` |

---

### 5.5 Pick'em Matchup Selector (`Component: Pickem/MatchupVoting`)

#### Variantes:
- **`UserSelection`**: `None` | `AwaySelected` | `HomeSelected`
- **`Status`**: `Open` | `Locked` | `Resolved-Win` | `Resolved-Loss`

#### Comportamiento Interactivo:
- Split container con dos tarjetas adyacentes interactivas (Away vs Home).
- Al hacer hover en un equipo, se eleva (`translateY(-2px)`) y toma un halo de borde naranja (`#F97316`).
- Al seleccionar:
  - Tarjeta seleccionada: Borde `2px solid #F97316`, Fondo `rgba(249, 115, 22, 0.08)`, Checkmark animado en la esquina superior.
  - Tarjeta no seleccionada: Opacidad al `60%`, escala reducida a `0.99`.
  - Barra inferior de consenso: Barra de porcentaje en vivo (`68% comunidad eligió a BOS`).

---

### 5.6 Floating Island Navigation (`Component: Navigation/FloatingIsland`)

#### Specs de Construcción:
- **Posición**: Fija en `top: 24px`, centrada horizontalmente (`left: 50%`, `transform: translateX(-50%)`).
- **Dimensiones**: Altura `56px`, Auto-layout Horizontal, Padding `6px 12px 6px 18px`, Gap `20px`.
- **Efecto de Vidrio**:
  - Background: `rgba(17, 17, 19, 0.82)` (Dark) / `rgba(255, 255, 255, 0.88)` (Light).
  - Backdrop Blur: `20px saturate(190%)`.
  - Border: `1px solid rgba(255, 255, 255, 0.12)`.
  - Radius: `radius-full` (`9999px`).
  - Shadow: `0 20px 40px rgba(0, 0, 0, 0.35)`.
- **Elementos**:
  1. Logo Drafteados SVG (`Height: 24px`).
  2. Divisor vertical sutil (`1px x 20px`).
  3. Nav Links (`Home`, `NBA Hub`, `Pick'em`, `Vídeos`, `Comunidad`) con hover pill animado (`layoutId` en Framer Motion).
  4. Indicador de Partidos En Vivo con dot pulsante (`2 EN VIVO`).
  5. Botón CTA Login / Avatar de Perfil.

---

## 6. MAPEO A TAILWIND CSS v4 (`@theme`)

Este bloque de configuración sincroniza al 100% las variables de Figma con el motor de compilación Tailwind v4 en `src/app/globals.css`:

```css
@import "tailwindcss";

@theme {
  /* Brand Palettes */
  --color-brand-primary: var(--hub-accent, #F97316);
  --color-brand-hover: var(--hub-accent-hover, #EA580C);
  --color-brand-soft: var(--hub-accent-soft, rgba(249, 115, 22, 0.15));

  /* Surface & Canvas Tokens */
  --color-canvas: var(--hub-bg, #0A0A0A);
  --color-surface-1: var(--hub-surface, #171717);
  --color-surface-2: var(--hub-surface-2, #262626);
  --color-surface-3: var(--hub-surface-3, #303030);

  /* Border Tokens */
  --color-border-subtle: var(--hub-border, #262626);
  --color-border-strong: var(--hub-border-hover, #404040);
  --color-border-brand: var(--hub-accent, #F97316);

  /* Text Semantic Tokens */
  --color-text-primary: var(--hub-text, #FAFAFA);
  --color-text-secondary: var(--hub-text-secondary, #D4D4D4);
  --color-text-muted: var(--hub-text-muted, #A3A3A3);
  --color-text-dim: var(--hub-text-dim, #737373);

  /* State Tokens */
  --color-state-live: var(--hub-live, #16A34A);
  --color-state-win: var(--hub-win, #16A34A);
  --color-state-loss: var(--hub-loss, #DC2626);
  --color-conf-east: var(--hub-east, #3B82F6);
  --color-conf-west: var(--hub-west, #A855F7);

  /* Typography Fonts */
  --font-display: var(--font-title), "Bebas Neue", sans-serif;
  --font-sans: var(--font-sans), "Plus Jakarta Sans", "Inter", sans-serif;
  --font-mono: "JetBrains Mono", "Geist Mono", monospace;

  /* Elevation Shadows */
  --shadow-card-rest: 0 1px 3px rgba(0, 0, 0, 0.04), 0 4px 12px rgba(0, 0, 0, 0.03);
  --shadow-card-dark: 0 4px 20px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05);
  --shadow-glow-orange: 0 0 24px rgba(249, 115, 22, 0.25);
  --shadow-glow-live: 0 0 16px rgba(22, 163, 74, 0.35);

  /* Corner Radii */
  --radius-xs: 4px;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
}
```

---

## 7. MATRIZ DE COMPROBACIÓN PRE-FIGMA (CHECKLIST DE DISEÑADORES)

Antes de dar por finalizado un componente en Figma para pase a desarrollo:

- [ ] ¿El componente responde correctamente al switch de variables **Light** y **Dark** sin estilos hardcodeados?
- [ ] ¿Los números y estadísticas tienen activada la propiedad OpenType `tabular-nums`?
- [ ] ¿El espaciado horizontal y vertical respeta múltiplos estrictos de 4px / 8px?
- [ ] ¿Los estados interactivos (`Hover`, `Pressed`, `Focus-visible`, `Disabled`, `Skeleton-Loading`) están diseñados dentro del Component Set?
- [ ] ¿Los logos de franquicias NBA están vectorizados en formato SVG normalizado a viewbox `36x36px`?
- [ ] ¿Las cards y contenedores de datos tienen configurado `Auto-Layout` con resizing `Fill container` para comportamiento responsive fluido?
