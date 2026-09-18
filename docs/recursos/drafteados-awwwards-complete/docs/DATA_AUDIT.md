# DRAFTEADOS — Data Audit Template (DRAF-005)

Completar en Fase 0. Objetivo: cero logos rotos, 30 equipos únicos, datos etiquetados.

## 1. Equipos (`/nba/equipos`)

| Check | Estado | Notas |
|-------|--------|-------|
| Count = 30 | ⬜ | |
| Sin duplicados | ⬜ | Listar IDs/nombres duplicados: |
| Este = 15 | ⬜ | |
| Oeste = 15 | ⬜ | |
| Logos cargan | ⬜ | Fuente CDN: |
| Fallback onError | ⬜ | |

**Duplicados encontrados:**

```
- 
```

**Logos rotos:**

```
- 
```

## 2. Clasificación

| Check | Estado | Notas |
|-------|--------|-------|
| Fuente de standings | ⬜ | API / static |
| Etiqueta temporada visible | ⬜ | oficial / pretemporada |
| W-L coherentes | ⬜ | |
| Separación Este/Oeste | ⬜ | |

## 3. Líderes

| Check | Estado | Notas |
|-------|--------|-------|
| Temporada de los stats | ⬜ | 2025/26 vs 2026/27 |
| Callout de referencia | ⬜ | |
| Fotos jugadores / fallback | ⬜ | |
| Mínimo partidos (70%) | ⬜ | |

## 4. Calendario

| Check | Estado | Notas |
|-------|--------|-------|
| Pretemporada vs regular etiquetado | ⬜ | |
| Timezone ES / ET correctos | ⬜ | |
| Partidos huérfanos / mal fechados | ⬜ | |

## 5. Reglas de producto

1. Si no es dato oficial de la temporada en curso → **callout obligatorio**.
2. Logo: URL válida o fallback iniciales; nunca icono de archivo roto.
3. Una franquicia = un slug = una card.

## 6. Acciones (crear tickets hijos)

| Acción | Ticket | Owner |
|--------|--------|-------|
| Fix duplicados equipos | DRAF-012 | |
| CDN logos | | |
| Callout líderes | DRAF-013 | |

---

*Template DRAF-005 · completar y archivar en docs/*
