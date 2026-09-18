# Drafteados — Search Console & SEO Ops Launch Checklist

Protocolo de verificación, rastreo e indexación para el despliegue de producción.

---

## 1. Verificación de Propiedades en Buscadores

### Google Search Console (GSC)
1. **Método Recomendado (Dominio Completo)**:
   - Registro tipo DNS TXT en el proveedor de DNS (`Cloudflare` / registrador):
     ```text
     google-site-verification=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
     ```
2. **Método Alternativo (Prefijo de URL)**:
   - Añadir tag HTML o archivo de verificación en `public/` si DNS no está disponible.
3. **Verificación de Entornos**:
   - Registrar `https://drafteados.com` (canónico).
   - Comprobar redirección automática `http://` -> `https://` y `https://www.drafteados.com` -> `https://drafteados.com` (301 permanente).

### Bing Webmaster Tools
1. Importación directa desde Google Search Console verificada con 1 clic.
2. Comprobar integración de IndexNow (opcional para indexación instantánea de partidos).

---

## 2. Envío de Sitemap y Comprobación de Robots

1. **Envío de Sitemap**:
   - URL canónica a enviar en GSC: `https://drafteados.com/sitemap.xml`.
   - Verificar estado: **Correcto** (Total de URLs: 38 entre estáticas y equipos).
2. **Validación de `robots.txt`**:
   - URL: `https://drafteados.com/robots.txt`.
   - Comprobar que no hay bloqueos indeseados sobre `/nba/`, `/pickem` o assets estáticos.
   - Confirmar bloqueo estricto sobre `/pickem/picks`, `/pickem/review`, `/pickem/profile`, `/pickem/locked` y endpoints de API/Auth.

---

## 3. URLs Prioritarias para Inspección Post-Deploy (URL Inspection Tool)

Ejecutar la herramienta **Inspección de URLs** y solicitar indexación inicial en este orden:

| Prioridad | URL Canónica | Tipo de Contenido | Schema Validado |
|-----------|--------------|-------------------|-----------------|
| **P0** | `https://drafteados.com/` | Home Principal | `Organization`, `WebSite` |
| **P0** | `https://drafteados.com/nba` | NBA Hub (Hoy) | `BreadcrumbList` |
| **P0** | `https://drafteados.com/nba/clasificacion` | Clasificación | `BreadcrumbList` |
| **P0** | `https://drafteados.com/nba/calendario` | Calendario 2026/27 | `BreadcrumbList` |
| **P0** | `https://drafteados.com/nba/lideres` | Líderes Estadísticos | `BreadcrumbList` |
| **P0** | `https://drafteados.com/nba/equipos` | 30 Franquicias | `BreadcrumbList` |
| **P0** | `https://drafteados.com/pickem` | Pick'em Landing | `WebApplication`, `SportsEvent` |
| **P1** | `https://drafteados.com/pickem/leaderboard` | Ranking Público | `BreadcrumbList` |
| **P1** | `https://drafteados.com/nba/equipo/celtics` | Ficha de Equipo | `SportsTeam`, `BreadcrumbList` |
| **P1** | `https://drafteados.com/nba/equipo/lakers` | Ficha de Equipo | `SportsTeam`, `BreadcrumbList` |
| **P1** | `https://drafteados.com/nba/partido/401902644` | Detalle Partido | `SportsEvent`, `BreadcrumbList` |

---

## 4. Auditoría de Rich Results & Validaciones Externas

1. **Google Rich Results Test** (`https://search.google.com/test/rich-results`):
   - Probar `https://drafteados.com/` -> Debe detectar `Organization` y `WebSite` sin advertencias.
   - Probar `/nba/equipo/[slug]` -> Debe detectar `SportsTeam` y `BreadcrumbList`.
   - Probar `/nba/partido/[id]` -> Debe detectar `SportsEvent` con fechas válidas en formato ISO 8601.
2. **Social Debuggers**:
   - Facebook Sharing Debugger (`https://developers.facebook.com/tools/debug/`).
   - Twitter Card Validator / OpenGraph.xyz (`https://www.opengraph.xyz/`).
   - Confirmar resolución de imagen 1200x630 y etiqueta de sitio `@drafteados`.

---

## 5. Monitoreo Post-Lanzamiento (Días 1–14)

- **Día 1**: Confirmar respuesta HTTP 200 en `sitemap.xml` y `robots.txt`.
- **Día 3**: Revisar informe de **Páginas indexadas** en GSC. Confirmar que las rutas con `noindex` (`/pickem/picks`, etc.) se excluyen correctamente bajo el filtro *"Excluida por etiqueta noindex"*.
- **Día 7**: Evaluar informe de **Core Web Vitals** (Experiencia en la página móvil) para asegurar LCP < 2.5s y CLS = 0.
- **Día 14**: Inspeccionar impresiones y CTR de palabras clave orgánicas ("clasificación nba", "drafteados pickem", "calendario nba").
