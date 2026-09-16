# DRAFTEADOS PICK'EM — GUÍA COMPLETA Y ESPECIFICACIÓN TÉCNICA
**Producto Oficial de la Comunidad de Buques · Temporada NBA 2026/27**  
**Versión:** 1.0  
**Fecha de Publicación:** 15 de Septiembre de 2026  
**Módulo:** `/pickem`  

---

## 1. VISIÓN GENERAL Y FILOSOFÍA DEL PRODUCTO

**Drafteados Pick'em** es un juego social y competitivo de pronósticos deportivos diseñado específicamente para la comunidad de **Drafteados** (los "Buques"). 

A diferencia de un formulario estático, un SaaS corporativo o una copia genérica de fantasy sports, Pick'em está concebido como una **experiencia de cromos y tarjetas de colección deportivas (Trading Cards)** de alto impacto visual y adrenalina competitiva.

### 1.1. Tono y Voz de Marca
- **Directo, competitivo y apasionado:** Cero burocracia corporativa.
- **Identidad de los Buques:** Fórmulas como *«¿A quién te jugás?»*, *«Te la jugaste»*, *«Ahora bancátela»*, *«Locked»*.
- **100% en español:** Con modismos y léxico natural de la comunidad hispanohablante de baloncesto.

### 1.2. Ciclo de Vida del Usuario (Game Loop)
```
DESCUBRIR ➔ ELEGIR ➔ REVISAR ➔ BLOQUEAR ➔ VIVIR LA TEMPORADA ➔ PUNTUAR ➔ RANKING ➔ COMPARTIR
```
1. **Descubrir:** El usuario entra a `/pickem` y comprende las reglas en menos de 10 segundos.
2. **Elegir:** Selecciona sus 13 pronósticos con buscadores rápidos y filtros tácticos.
3. **Revisar:** Visualiza el progreso (X/13) en un HUD pegajoso en tiempo real.
4. **Bloquear:** Sella sus predicciones antes del salto inicial oficial con confirmación definitiva (*"Ahora bancátela"*).
5. **Vivir la temporada:** Sigue los 82 partidos de la temporada regular NBA.
6. **Puntuar:** El motor server-side calcula puntos de forma idempotente con cada partido oficial.
7. **Ranking:** Aparece en la tabla global de posiciones con su `@username`, puntos y efectividad.
8. **Compartir:** Comparte su tarjeta oficial en redes desafiando a otros Buques.

---

## 2. REGLAS DEL JUEGO Y CATÁLOGO DE PREDICCIONES (13 PICKS)

El MVP consta exactamente de **13 predicciones oficiales**, balanceadas para sumar un máximo teórico de **320 puntos**.

| # | Predicción | Categoría | Tipo de Selección | Puntos | Criterio de Resolución |
|---|------------|-----------|-------------------|--------|------------------------|
| 1 | **Máximo Anotador** | `ESTADÍSTICAS` | Jugador | **20 pts** | Mayor promedio de puntos por partido (PPG) al cierre de la fase regular. |
| 2 | **Líder en Asistencias** | `ESTADÍSTICAS` | Jugador | **20 pts** | Mayor promedio de asistencias por partido (APG). |
| 3 | **Líder en Rebotes** | `ESTADÍSTICAS` | Jugador | **20 pts** | Mayor promedio de rebotes por partido (RPG). |
| 4 | **Líder en Triples** | `ESTADÍSTICAS` | Jugador | **20 pts** | Mayor cantidad total de triples convertidos (3PM). |
| 5 | **Líder en Robos** | `ESTADÍSTICAS` | Jugador | **20 pts** | Mayor promedio de recuperaciones por partido (SPG). |
| 6 | **Líder en Tapones** | `ESTADÍSTICAS` | Jugador | **20 pts** | Mayor promedio de bloqueos por partido (BPG). |
| 7 | **MVP de la Temporada** | `PREMIOS` | Jugador | **30 pts** | Ganador oficial del Trofeo Michael Jordan otorgado por la NBA. |
| 8 | **Defensor del Año (DPOY)** | `PREMIOS` | Jugador | **25 pts** | Ganador oficial del Trofeo Hakeem Olajuwon. |
| 9 | **Novato del Año (ROY)** | `PREMIOS` | Jugador | **25 pts** | Ganador oficial del Trofeo Wilt Chamberlain. |
| 10 | **Mejor Récord Global** | `EQUIPOS` | Franquicia | **20 pts** | Franquicia con mayor cantidad de victorias en la tabla general de la NBA. |
| 11 | **Campeón del Este** | `EQUIPOS` | Franquicia | **30 pts** | Ganador de las Finales de la Conferencia Este (solo franquicias del Este). |
| 12 | **Campeón del Oeste** | `EQUIPOS` | Franquicia | **30 pts** | Ganador de las Finales de la Conferencia Oeste (solo franquicias del Oeste). |
| 13 | **Campeón de la NBA** | `FINAL` | Franquicia | **50 pts** | Campeón del Trofeo Larry O'Brien y anillo de la temporada. |

**Total Máximo Posible: 320 Puntos.**

---

## 3. ARQUITECTURA TÉCNICA

### 3.1. Stack Tecnológico
- **Frontend:** Next.js 16 (App Router) + React 19 + TypeScript estricto.
- **Estilos:** Tailwind CSS v4 (`@theme inline`) + Fuentes Google (`Bebas Neue` y `Plus Jakarta Sans`).
- **Base de Datos & Auth:** Supabase (PostgreSQL 15+ con Row Level Security y Auth OAuth/Email).
- **Iconografía:** Lucide React.
- **Validación:** Zod para contratos de datos y tipado en tiempo de ejecución.

### 3.2. Modelo de Datos (PostgreSQL en Supabase)
El sistema opera sobre 7 tablas relacionales y 1 vista analítica:

1. `profiles`: Información pública de los usuarios (`id`, `username` único, `display_name`, `avatar_url`).
2. `seasons`: Gestión de temporadas NBA (`id`, `name`, `status`, `lock_at`, `season_year`).
3. `teams`: Franquicias NBA oficiales (`id`, `name`, `abbreviation`, `conference`, `primary_color`, `secondary_color`).
4. `players`: Jugadores de la liga (`id`, `display_name`, `team_id`, `position`, `jersey_number`).
5. `prediction_types`: Catálogo inmutable de las 13 categorías (`slug`, `points`, `category`, `selection_type`).
6. `predictions`: Pronósticos individuales (`user_id`, `season_id`, `prediction_type_id`, `player_id`, `team_id`, `status`, `points_awarded`).
7. `scoring_events`: Tabla de auditoría e idempotencia para evitar duplicación de puntos durante resoluciones.
8. `leaderboard` (Vista): Agrupación en tiempo real de puntos acumulados, aciertos y porcentaje de efectividad por usuario.

### 3.3. Principio Server-Authoritative
- **Cero confianza en el cliente:** El cliente web jamás calcula ni envía puntos.
- **Bloqueo estricto por servidor:** Una vez alcanzada la fecha `lock_at` o ejecutado el bloqueo, la Server Action `lockPicksAction` sella los registros en la base de datos con `status = 'LOCKED'`.
- **Modo Invitado Dual:** Los usuarios no autenticados pueden realizar sus 13 pronósticos libremente (se persisten en `localStorage`). Solo se solicita autenticación al momento de querer registrar sus puntos oficialmente en el ranking.

---

## 4. ESTRUCTURA DE RUTAS Y PANTALLAS

### 4.1. `/pickem` — Landing Oficial del Juego
- **Hero Editorial:** Título masivo `¿QUIÉN SABE MÁS DE LA NBA?` con textura de parqué de baloncesto (`bg-court-grid`) y resplandor naranja oficial.
- **Barra de Métricas:** Contadores de 13 predicciones, 320 puntos y 100% gratuito.
- **Cómo Funciona:** 4 pasos interactivos (`Elegí`, `Bloqueá`, `Viví la Temporada`, `Subí en el Ranking`).
- **Grilla de las 13 Tarjetas:** Renderizado en formato Trading Card con marca de agua, puntos y colores de categoría. Cada tarjeta es un acceso directo al selector.
- **Simulación del Podio:** Vista previa del Top 3 de la comunidad con medallas y distinciones oficiales.
- **Preguntas Frecuentes:** Acordeón con respuestas claras a las dudas habituales.

### 4.2. `/pickem/picks` — Flujo Interactivo de Pronósticos
- **HUD Pegajoso:** Barra superior fija con porcentaje de progreso y barra animada.
- **Filtros Rápidos:** Pestañas para saltar entre `TODAS (13)`, `ESTADÍSTICAS (6)`, `PREMIOS (3)`, `EQUIPOS (3)` y `FINAL (1)`.
- **Selector de Jugador (`PlayerSelector`):** Modal mobile-first con buscador reactivo y filtros por posición (`BASES Y ESCOLTAS`, `ALEROS`, `PÍVOTS`). Más de 234 jugadores NBA activos con dorsales y colores oficiales.
- **Selector de Franquicia (`TeamSelector`):** Modal con las 30 franquicias y restricción automática para selecciones con conferencia forzada.
- **Modal "Ahora Bancátela":** Diálogo de advertencia antes de confirmar el bloqueo oficial de la temporada.

### 4.3. `/pickem/locked` — Pantalla Post-Bloqueo
- Resumen completo de las 13 predicciones selladas con sellos de estado y puntos en juego.
- Enlace directo a la tabla de posiciones y botón para compartir.

### 4.4. `/pickem/leaderboard` — Tabla Global de Posiciones
- Tabla en vivo ordenada por puntos totales y efectividad.
- Distinción especial de podio (medallas dorada, plateada y de bronce).
- Estado vacío inteligente que invita a ser el primer Buque en participar si aún no hay registros.

### 4.5. `/pickem/profile/[username]` — Perfil Público del Buque
- Cabecera con avatar, `@username` y distintivo de *Buque Oficial*.
- Métricas personales: Puntos Totales, Puesto en el Ranking Global, Picks Acertados y Porcentaje de Efectividad.
- Desglose público de sus 13 pronósticos con badges de `ACERTÓ`, `FALLÓ` o `BLOQUEADO`.

### 4.6. `/auth/callback` — Manejador de Sesión OAuth
- Route Handler para intercambio de código temporal por sesión de Supabase al ingresar con Google.

---

## 5. BASE DE DATOS NBA POBLADA (234 JUGADORES + 30 EQUIPOS)

Se ejecutaron scripts de sembrado con la totalidad de franquicias y una plantilla extendida de jugadores reales:
- **30 Franquicias:** Conferencia Este (Atlantic, Central, Southeast) y Conferencia Oeste (Northwest, Pacific, Southwest) con códigos hexadecimales de color oficiales.
- **234 Jugadores:**
  - Estrellas de élite: Dončić, Gilgeous-Alexander, Antetokounmpo, Jokić, Tatum, Curry, LeBron, Edwards, Brunson, Mitchell, etc.
  - Especialistas defensivos para DPOY: Wembanyama, Gobert, Adebayo, Davis, Caruso, Daniels, etc.
  - Generación de Novatos (Draft 2024 para ROY): Zaccharie Risacher, Alex Sarr, Reed Sheppard, Stephon Castle, Matas Buzelis, Dalton Knecht, Zach Edey, Donovan Clingan, Ron Holland, etc.

---

## 6. GUÍA DE MIGRACIONES Y DESPLIEGUE EN PRODUCCIÓN

### 6.1. ¿Qué se necesita antes de hacer `git push`?

#### 1. Configurar Variables de Entorno en Cloudflare Pages
En tu panel de **Cloudflare Dashboard** > **Workers & Pages** > Seleccionar proyecto `drafteados` > **Settings** > **Environment variables**:
Agregar para **Production** y **Preview**:
```env
NEXT_PUBLIC_SUPABASE_URL = https://lagpcbofealjwgulzywv.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = sb_publishable_LACPbbprr4AKXBi0cLXS9w_8clPtxFW
SUPABASE_SERVICE_ROLE_KEY = tu_supabase_service_role_secret
```

#### 2. Configurar URL de Redirección en Supabase Auth
En tu panel de **Supabase** > **Authentication** > **URL Configuration**:
- **Site URL**: `https://drafteados.com` (o la URL de tu dominio en Cloudflare).
- **Redirect URLs**: Agregar:
  - `http://localhost:3000/auth/callback`
  - `https://drafteados.com/auth/callback`
  - `https://*.pages.dev/auth/callback`
  - `https://drafteados.pages.dev/auth/callback`

#### 3. Realizar Git Commit y Push
Desde la terminal del proyecto:
```bash
git add .
git commit -m "feat(pickem): implementacion completa del juego oficial de predicciones NBA"
git push origin main
```

Cloudflare Pages detectará automáticamente el push a la rama `main` y compilará la versión con la nueva sección `/pickem`.

---

**Drafteados Pick'em · Tu Casa NBA · 2026**
