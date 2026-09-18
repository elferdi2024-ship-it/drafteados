# ADR — Tema del NBA Hub

**Estado:** Propuesto · **Fecha:** 2026-09-17  
**Ticket:** DRAF-006

## Contexto

La home y Pick’em usan atmósfera oscura/cinemática. El Hub actual en producción es canvas claro tipo dashboard. Los tokens del pack defaultan a **dark**.

## Decisión

**Hub en dark mode por defecto** (`data-theme` heredado del shell o `dark` explícito en layout `/nba`).

Motivos:
1. Una sola dirección de arte (Bible + Awwwards).
2. Pick’em y Hub comparten producto “herramienta Buques”.
3. Los semantic tokens dark ya están definidos y testeados en build.

Light mode queda disponible vía toggle global o `data-theme="light"` para preferencia de usuario, no como look por defecto del Hub.

## Consecuencias

- Layout de `/nba/*` no fuerza fondo gris `#FAFAFA` hardcodeado.
- PageHeader, GameCard y tablas usan variables `--color-*`.
- QA visual debe hacerse en dark primero; light como segundo pase.

## Alternativa rechazada

Mantener Hub solo en light: rompe cohesión con home/Pick’em y obliga a dos sistemas visuales.
