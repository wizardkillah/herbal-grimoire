---
tags: [arquitectura, juego]
archivos: [src/game/nature.js, src/game/nature-v9.js, src/game/NatureGames.jsx, src/game/GardenV9.jsx, src/game/Greenhouse3D.jsx, src/game/Trail2D.jsx]
---
# Jardín y expediciones

## Jardín

Tres bancales; semillas iniciales de matico, cedrón, lavanda, caléndula y romero. Ciclo por acciones: agua → tierra → luz → cosecha (1 unidad, 25 XP). Sin temporizadores ni muerte de plantas.

## Explorar

Bosque o montaña: mapa de 5 × 5, tres hallazgos, doce pasos, pistas de proximidad. 10 XP por hallazgo y 30 XP extra la primera vez de cada especie. Encontrar una especie desbloquea su semilla para siempre. La rareza y las ubicaciones son **ficticias**.

## Plan v9 (fases)

| Fase | Entrega | Estado según el plan |
|---|---|---|
| A | Reglas, migración, carga diferida, semillas desde hallazgos | Implementada |
| B | Procedencia de lotes, inventario transaccional, compost | Pendiente |
| C | Jardín espacial por estaciones | Pendiente |
| D | Escena 3D opcional | Pendiente (ya existe `Greenhouse3D.jsx` con three.js) |
| E | Cultivo pausado con tiempo | Pendiente |
| F | Pantalla 2D con personaje | Pendiente (ya existe `Trail2D.jsx`) |
| G | Pantallas conectadas y zonas nuevas | Pendiente |
| H | Perfilado, pulido, decisión de distribución | Pendiente |

Conviene actualizar el plan con lo que `Greenhouse3D.jsx`, `Trail2D.jsx`, `GardenV9.jsx` y `nature-v9.js` realmente entregan. Fuente: `docs/PROMPT_MAESTRO_Minijuegos_v9_Adaptado.md`.

Cultivar y explorar nunca llaman a Gemini ([[Bruma y Gemini]]).
