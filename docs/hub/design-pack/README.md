# Drafteados Design Pack v2 — Completo

**Tu Casa NBA** · Tipografía · Color · Tarjetas · Efectos · Assets helpers

## Contenido

```
design-pack/
├── README.md
├── tokens/
│   ├── typography.json     # Escala tipográfica detallada
│   └── colors.json         # Paleta punta a punta + semantic light/dark
├── css/
│   ├── tokens-complete.css # CSS listo para pegar
│   └── tokens-app.css      # Variante app (si existe)
├── effects/
│   └── web-effects.css     # Hover, live, blur, skeleton, bars…
├── cards/
│   └── CARDS_SPEC.md       # Spec de cada tarjeta rediseñada
├── components/
│   ├── nba/                # teamAssets + TeamLogo
│   └── time/               # regions + TimezonePicker + GameTime
└── docs/
    ├── GRAPHIC_DESIGN_IMPROVEMENTS.md
    ├── COPY_DECK.md
    ├── HISPANIC_TIMEZONES_AND_UI_CRAFT.md
    └── FULL_UI_INVENTORY_CARDS_TYPE_IMAGES.md
```

## Cómo usar

1. Importar `css/tokens-complete.css` + `effects/web-effects.css` en el layout.
2. Cargar fuentes: Bebas Neue + Plus Jakarta Sans + JetBrains Mono (`next/font` o Google).
3. Implementar cards según `cards/CARDS_SPEC.md`.
4. Logos: `components/nba/teamAssets.ts` + `TeamLogo.tsx`.
5. Horarios: `components/time/*`.

## Color marca principal

| Token | Hex |
|-------|-----|
| Brand primary | `#F97316` |
| Brand hover | `#EA580C` |
| Canvas light | `#FAFAFA` |
| Surface light | `#FFFFFF` |
| Text primary light | `#0A0A0A` |
| Canvas dark | `#0A0A0A` |
| Live | `#16A34A` |
| Loss | `#DC2626` |

## Tipografía rápida

| Rol | Font | Size |
|-----|------|------|
| Hero home | Display | 64px |
| H1 Hub | Display | 48px |
| Score | Display / Mono | 24–32px |
| Body | Sans | 15px |
| Label | Sans bold caps | 11px |
| Stat | Mono tabular | 14px |

## Licencia de uso interno

Pack generado para el proyecto Drafteados. Logos NBA © NBA — uso editorial/CDN según política de la liga.
