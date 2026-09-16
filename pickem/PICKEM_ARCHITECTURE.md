# DRAFTEADOS PICK'EM — ARCHITECTURE
**Mission 01 Output**  
Versión 1.0

---

## 1. Visión de Alto Nivel

```
                    DRAFTEADOS (Landing actual)
                              │
                              ▼
                    ┌─────────────────────┐
                    │   /pickem (módulo)  │
                    └─────────────────────┘
                              │
          ┌───────────────────┼───────────────────┐
          ▼                   ▼                   ▼
     Auth Layer          Game Engine         Data Layer
   (Supabase Auth)    (Predictions +       (Provider
                      Scoring + Lock)       Abstraction)
          │                   │                   │
          └───────────────────┼───────────────────┘
                              ▼
                         PostgreSQL
                         (Supabase)
                              │
                    ┌─────────┴─────────┐
                    ▼                   ▼
               Leaderboard           Profiles
               + Share Cards
```

**Principio rector**:  
«Build the rules before the pixels.»  
«Make it feel like a game, not a form.»

---

## 2. Decisiones de Integración

**Pick’em vive como pestaña/sección dentro de la web actual.**

- Ruta base: `/pickem`
- Layout propio (puede compartir header mínimo o tener el suyo)
- Mismos design tokens (colores, tipografía, motion)
- Misma marca y tono
- Cero impacto en la landing de marketing

**Hosting**: Cloudflare Pages (compatible con el despliegue actual).  
**Auth + Database**: Supabase (recomendado y elegido).

---

## 3. Capas de la Arquitectura

### 3.1 UI Layer
- Componentes específicos de Pick’em (`components/pickem/`)
- Mobile-first (referencia 390×844)
- Design system heredado + tokens nuevos si hacen falta
- GSAP para motion funcional (selección, lock, reveal de scores)

### 3.2 Application Layer
- Server Actions / Route Handlers de Next.js
- Validación de input con Zod
- Orquestación de lock, scoring y share

### 3.3 Domain Logic (el corazón)
```
lib/pickem/
├── predictions.ts      → CRUD + validación de selecciones
├── locking.ts          → lógica de deadline y status
├── scoring.ts          → resolvePrediction + idempotencia
├── rules.ts            → PredictionRule interface
└── leaderboard.ts      → cálculo / consulta de ranking
```

### 3.4 Data Access
- Clientes Supabase (browser + server + service role solo en server)
- RLS estricto: un usuario solo toca sus predicciones y su perfil

### 3.5 Provider Layer (Sports Data)
```
interface BasketballDataProvider {
  getTeams(): Promise<Team[]>
  getPlayers(params?: PlayerQuery): Promise<Player[]>
  getStandings(season: string): Promise<Standing[]>
  getPlayerSeasonStats(season: string): Promise<PlayerSeasonStats[]>
  // ...
}
```

Implementaciones:
- `MockProvider` → desarrollo y MVP
- Futuro: BallDontLie / nba_api / Sportradar

**Nunca** llamar a APIs externas desde el frontend.

### 3.6 External
- Supabase Auth (Google + email)
- Supabase Storage (avatares y headshots cacheados)
- Cloudflare Pages (deploy)
- (Futuro) Cron / Workers para sync de stats

---

## 4. Modelo de Datos (MVP)

### Tablas esenciales

**profiles**  
`id` (FK auth.users), `username` (unique), `display_name`, `avatar_url`, timestamps

**seasons**  
`id`, `name`, `season_year`, `status`, `lock_at`, `rules_version`, dates

**teams**  
`id`, `provider`, `provider_team_id`, `name`, `abbreviation`, `conference`, `logo_url`, `primary_color`...

**players**  
`id`, `provider`, `provider_player_id`, `display_name`, `team_id`, `position`, `headshot_url`...

**prediction_types**  
`id`, `slug`, `name`, `category`, `selection_type` (player/team), `points`, `active`, `rules_json`

**predictions**  
`id`, `user_id`, `season_id`, `prediction_type_id`, `player_id` / `team_id`, `status` (OPEN | LOCKED | CORRECT | INCORRECT | VOID), `locked_at`, `points_awarded`  
Unique constraint: `(user_id, season_id, prediction_type_id)`

**scoring_events**  
Auditoría de cada resolución (idempotencia)

**leaderboard** (vista o materializada)  
`user_id`, `season_id`, `total_points`, `correct_predictions`, `accuracy`

### RLS
- Usuario solo lee/escribe sus propias predicciones y perfil
- Leaderboard es público (solo lectura)
- Admin usa service role

---

## 5. Flujos Clave

### 5.1 Auth Flow
1. Usuario entra a `/pickem`
2. Si no está autenticado → modal / página de login (Google prioritario)
3. Al crear cuenta → trigger crea `profile` con username
4. Middleware protege rutas de picks, review, lock, profile

### 5.2 Prediction Flow
1. Usuario ve lista de predicciones + progreso (ej. 4/13)
2. Selecciona jugador o equipo (selector rápido + búsqueda)
3. Puede cambiar hasta el lock
4. En Review ve resumen
5. Lock → server valida deadline + escribe `status = LOCKED` + `locked_at`

### 5.3 Scoring Flow
1. Admin (o job) carga resultados reales de la temporada
2. `resolvePrediction(prediction, result)` → CORRECT / INCORRECT / VOID + puntos
3. Se crea `scoring_event` (idempotente)
4. Se actualiza `points_awarded` y status
5. Leaderboard se recalcula

### 5.4 Share Flow
1. Usuario genera share card desde sus picks
2. Server renderiza imagen (Satori / OG)
3. Usuario descarga o comparte directamente

---

## 6. Provider Architecture

```
Frontend / Server Actions
          │
          ▼
   BasketballDataProvider (interface)
          │
    ┌─────┴─────┐
    ▼           ▼
MockProvider  RealProvider (futuro)
    │
    ▼
Normalize + Validate (Zod)
    │
    ▼
Postgres (teams, players, stats snapshots)
```

Ventajas:
- Desarrollo offline completo
- Cambio de proveedor sin tocar UI
- Datos siempre normalizados

---

## 7. Seguridad

- Nunca exponer `service_role` al cliente
- Validación server-side de todo lo que modifica estado
- Points son derivados (el cliente nunca envía puntos)
- Rate limiting en endpoints de escritura
- RLS + policies claras
- Admin solo por lista de emails o claims

---

## 8. Escalabilidad Futura (sin implementar ahora)

La arquitectura ya contempla:
- Ligas privadas (`leagues` + `league_members`)
- Playoffs / series
- Weekly picks (campaigns genéricos)
- Badges
- Historial por temporada
- Confidence points

Todo se puede añadir sin reescribir el core.

---

## 9. Principios de Diseño Técnico

1. **Server-authoritative** en scoring y lock
2. **Idempotencia** en resolución de predicciones
3. **Provider abstraction** desde el día 1
4. **Mobile-first**
5. **Design tokens compartidos** con la landing
6. **Tono Drafteados** en copy, microcopy y errores
7. **Simplicidad primero**, capacidad de crecer después

---

## 10. Diagrama de Módulos

```
pickem/
├── ui/                 → pantallas y componentes visuales
├── domain/             → rules, scoring, locking
├── data/               → supabase queries + providers
├── auth/               → helpers de sesión y perfil
└── share/              → generación de cards
```

---

**Fin del PICKEM_ARCHITECTURE.md**