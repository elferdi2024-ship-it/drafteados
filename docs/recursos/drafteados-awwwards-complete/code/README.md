# Drafteados — Tokens + UI + NBA Components (drop-in)

## Estructura

```
src/
  app/globals.css
  styles/tokens.css
  lib/cn.ts
  components/
    ui/
      Button.tsx Badge.tsx Card.tsx Chip.tsx PageHeader.tsx Callout.tsx index.ts
    nba/
      GameCard.tsx StandingsRow.tsx index.ts
    layout/
      FloatingIslandNav.tsx index.ts
```

## Install

```bash
npm i clsx tailwind-merge
```

Fonts (next/font): Bebas Neue **o** Clash Display (elegir una), Plus Jakarta Sans, JetBrains Mono.

```tsx
// app/layout.tsx
import "./globals.css";
<html lang="es" data-theme="dark">
```

## Imports

```tsx
import { Button, Badge, Card, Chip, PageHeader, Callout } from "@/components/ui";
import { GameCard, StandingsRow, StandingsTableHead } from "@/components/nba";
import { FloatingIslandNav } from "@/components/layout";
```

## Theme

- `:root` = **dark**
- Light: `document.documentElement.setAttribute("data-theme", "light")`

## Copy

Usar strings de `docs/COPY_DECK.md` — no inventar subtítulos.

## Tickets

Ver `tickets/PHASE_0_AND_1_TICKETS.md`.
