---
tags: [calidad]
---
# Pruebas

`npm test` usa el ejecutor nativo de Node. Resultado del 11-nov-2026: **32 pruebas, 32 pasan**, en unos 0,6 s.

| Archivo | Cubre |
|---|---|
| `src/game/rules.test.js` | Mezclas, encargos resolubles, recompensa única, mejora, restauración ante corrupción, notas, catálogo original accesible, fichas pendientes honestas |
| `src/game/nature.test.js`, `nature-v9.test.js` | Orden de cuidados, cosecha, movimiento, pasos, recompensas, persistencia |
| `src/game/catalog-assets.test.js` | Cobertura de imágenes, archivos locales, créditos coincidentes |
| `scripts/bruma-api.test.mjs` | Contexto de confianza, clave no devuelta al cliente, rechazos, cuota |
| `scripts/serve-game.test.mjs` | Servidor del lanzador (se ejecuta aparte, tras compilar) |

## Lo que no se prueba

Interfaz de extremo a extremo, accesibilidad (no hay auditoría WCAG), exactitud médica, correspondencia foto–especie, enlaces externos, seguridad de dependencias. No hay integración continua.

Ver [[Riesgos y pendientes]].
