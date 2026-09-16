# DRAFTEADOS PICK'EM — Social Gamification Exploration

## Objetivo
Convertir Pick’em en un **juego social competitivo** que los Buques quieran compartir y pelear entre ellos, no solo un ranking frío.

---

## MVP (incluido / casi)

| Feature | Descripción | Prioridad |
|---------|-------------|-----------|
| **Leaderboard global** | Ranking por puntos + accuracy | Must |
| **Perfil público** | @username, puntos, rank, aciertos | Must |
| **Share card** | Imagen 1080×1350 con picks clave + CTA “Can you beat me?” | Must |
| **Progreso visible** | “4/13 picks” + barra de progreso | Must |

---

## Post-MVP cercano (alta retención)

### 1. Ligas privadas
- Crear liga con código de invitación
- Ranking solo entre miembros
- Nombre custom (“Los ortivas del grupo”, “Oficina”, etc.)
- Ideal para WhatsApp / Discord / amigos

### 2. Badges
Ideas con tono Drafteados:
- **Oracle** → top 1% accuracy
- **Contrarian** → picks poco populares que salieron bien
- **Perfect Pick** → temporada con 100% en una categoría
- **Champion** → acertó NBA Champion
- **Chaos Agent** → picks muy arriesgados
- **Early Bird** → lockeó entre los primeros
- **Buque Legend** → rank #1 global de la temporada

### 3. Community consensus (después de pick)
- “La comunidad eligió: OKC 27% · Boston 19%…”
- Solo se muestra **después** de que el usuario eligió (para no sesgar)

### 4. Streaks & momentos
- Notificación cuando tu pick de MVP se pone líder
- “Tu Scoring Leader acaba de hacer 50 puntos”

---

## Viral loop deseado

```
Usuario hace picks
      ↓
Genera Share Card
      ↓
Lo tira en Instagram / X / WhatsApp
      ↓
Amigo ve “Can you beat me?”
      ↓
Amigo entra y hace sus picks
      ↓
Ambos quedan en ranking / liga
      ↓
Más competencia → más shares
```

El share card es la pieza más importante del crecimiento orgánico.

---

## Tono de la gamificación
- Competitivo pero friendly
- Ligeramente provocativo (“Bancátela”, “Te la jugaste”, “Can you beat me?”)
- Nunca tóxico ni pay-to-win
- Celebrar tanto el acierto como el “casi”

---

## Lo que NO hacemos en MVP
- Confianza / multiplier de puntos
- Predicciones semanales
- Chat dentro de la app
- Notificaciones push
- Sistema de amigos completo

La arquitectura (leagues, badges, scoring_events) ya contempla el crecimiento sin reescribir el core.
