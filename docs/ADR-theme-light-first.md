# ADR: Modo Claro First-Class (Alineación con drafteados.com)

- **Estado**: Aceptado y Aplicado
- **Fecha**: 17 de Septiembre 2026
- **Contexto**: La identidad oficial de marca de Drafteados (referencia: https://www.drafteados.com/) es predominantemente luminosa (Light-first): fondos claros (#FAFAFA), superficies blancas, navegación limpia y naranja enérgico (#FF5A1F / #F97316). Históricamente el NBA Hub y Pick'em se probaron en dark forzado, lo que desalineaba el producto de la marca principal.

---

## Decisiones Arquitectónicas

1. **Light Default en `:root`**:
   - `:root` define tokens semánticos claros: `--color-canvas: var(--neutral-50)`, `--color-surface-1: var(--neutral-0)`, `--color-text-primary: var(--neutral-1000)`.
   - `[data-theme="dark"]` y `.dark` definen la variante oscura completa.
   - El puente `--hub-*` se resuelve dinámicamente según el tema activo.

2. **Sin FOUC (Anti-FOUC)**:
   - Script síncrono bloqueante (`themeInitScript`) inyectado en `<head>`.
   - Comprueba `localStorage.getItem("drafteados-theme")`. Si no existe preferencia, inicializa en `'light'`.

3. **Eliminación de Hardcodes Dark**:
   - Se elimina la clase `dark` estática de `<html>` en `src/app/layout.tsx`.
   - Se elimina `data-theme="dark"` forzado en `src/app/pickem/layout.tsx`.
   - Toda la suite hereda el tema del elemento raíz `html`.

4. **Componente `<ThemeToggle />`**:
   - Botón accesible con soporte táctil (mínimo 44px) y aria-labels en español.
   - Disponible en la barra de navegación principal, en el Hub (`HubNav`) y en el Pick'em.
