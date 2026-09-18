# Tarjetas rediseñadas — especificación de implementación

Todas usan: `radius-md`, `surface-1`, `border-subtle`, `shadow-card`, tokens de tipo.

---

## GameCard

```
Padding: 16–18px
Hora local: text bold 16px + flag · ET meta 12px
Logos: 40×40 object-contain
Tricode: title-md o display-sm
Badge status: label + live-dot si live
Footer: meta | link “Ver previa”
Hover: fx-card-interactive
CSS vars opcionales: --team-primary home border-left 3px
```

## Match Hero

```
Padding: 24px
Logos: 72–80px
Team names: display-md / title
GameTime: size lg
Wash: fx-matchup-split con --away-primary / --home-primary
Badges: visitante/local, conf rank
```

## Narrative Key (×3)

```
Número circular brand o muted
Texto: body-sm, max 2 líneas
Mismo height en row (min-height 88px)
```

## Compare row

```
Label center meta
Valores mono stat a los lados
Bar: fx-stat-bar-track + two fills team colors
```

## Player Card

```
Headshot 48–56 circle
Name title-sm
Posición + age meta
Stats row: PTS REB AST in stat-lg orange for primary
Contrato: meta, secondary — never louder than stats
```

## Team Hero

```
border-left 6px solid team primary
Logo 96px
fx-team-wash
W-L display-sm · rank brand color
```

## Standings Row

```
height 44px
logo 24px
name truncate
W win-color · L loss-color · tabular
STRK badge
hover surface-2
tier: border-left 3px playoff green | play-in orange
```

## Mini Leader Row

```
rank label
headshot 32
name + team meta
PPG stat-lg brand
```

## Universe Card (home)

```
Image/icon top
Eyebrow label brand
Title title-md
Body body-sm 2 lines
CTA Button secondary or primary
```

## Honor Card (clasificación)

```
Logo 48
Badge “Narrativa Buques”
Title team display/title
Leaders list meta
Link text brand
```
