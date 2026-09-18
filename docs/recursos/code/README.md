# Drafteados — Tokens + UI Primitives (drop-in)

Implementación **B** del Awwwards redesign: tokens en CSS + componentes core.

## Estructura

```
src/
  app/globals.css          # Tailwind v4 @theme + base
  styles/tokens.css        # Primitives + semantic Light/Dark
  lib/cn.ts                # clsx + tailwind-merge
  components/ui/
    Button.tsx
    Badge.tsx
    Card.tsx
    Chip.tsx
    PageHeader.tsx
    index.ts
```

## Instalación rápida

1. Copiá las carpetas a tu repo Next.js (App Router).
2. Dependencias:

```bash
npm i clsx tailwind-merge
# fonts (ejemplo next/font)
# Bebas Neue, Plus Jakarta Sans, JetBrains Mono via next/font/google o local
```

3. En `layout.tsx` (o root):

```tsx
import "./globals.css";
// opcional: data-theme en <html>
<html lang="es" data-theme="dark">
```

4. Alias `@/` → `src/` en `tsconfig.json` (ya suele estar en Next).

5. Tailwind v4: asegurate de que `globals.css` se importa y que `@import "tailwindcss"` funciona con tu setup.

## Uso

```tsx
import { Button, Badge, Card, CardBody, Chip, PageHeader } from "@/components/ui";

<PageHeader
  eyebrow="NBA HUB · LOS BUQUES · TEMPORADA 2026/27"
  title="Hoy en la NBA"
  description="Marcadores, clasificación y lo que importa hoy."
/>

<Badge type="live">EN VIVO</Badge>
<Chip active>Puntos</Chip>
<Button variant="primary" size="md">Hacé tus picks</Button>
```

## Temas

- Default CSS (`:root`) = **dark** (Hub dark / Pick’em).
- Light: `document.documentElement.setAttribute("data-theme", "light")`.

## No incluido aún (Fase 1+)

- GameCard, StandingsRow, FloatingIslandNav (specs en FIGMA_TOKENS…; implementar en Fase 1 Hub).
- Auth / datos NBA.

Ver tickets en `/artifacts/tickets/`.
