---
tags: [arquitectura]
---
# Arquitectura

Aplicación de una sola página. El motor y la interfaz corren en el navegador; el único servidor es local y solo sirve archivos y la ruta `/api/bruma`.

```text
index.html → src/main.jsx → App.jsx → game/Workshop.jsx
                                        ├─ rules.js → catalog.js / regional.js
                                        ├─ Herbarium.jsx → BrumaPanel.jsx
                                        │                   ├─ herbs.js / identification.js
                                        │                   └─ ingredient-images.json → public/media/ingredients
                                        ├─ BrumaChat.jsx → POST /api/bruma → scripts/bruma-api.mjs → Gemini
                                        ├─ NatureGames.jsx / GardenV9.jsx / Greenhouse3D.jsx / Trail2D.jsx → nature.js, nature-v9.js
                                        ├─ BackupControls.jsx / PrintableGrimorio.jsx → save-file.js
                                        ├─ WorkshopScene.jsx → public/media
                                        └─ localStorage (grimorio_workshop_v1)
```

## Ambiente y animaciones (11-nov-2026)

- `immersion.css`: todo el movimiento decorativo, apagable con el botón de animaciones (`.gh-still`) y con movimiento reducido.
- `Ambience.jsx`: luciérnagas y niebla de fondo.
- `WorkshopScene.jsx`: brillo, fuego, vapor y chispas sobre el caldero, que crecen con las porciones (`charge`), y destello al crear.
- `sound.js`: sonidos opcionales sintetizados con Web Audio, apagados por defecto.

## Dependencias

React 19, Vite 5, `@phosphor-icons/react`, `clsx`, `three` 0.186.0 (escena de invernadero) y `@google/generative-ai` (solo la usa el [[Código legado]]). `vite` y el complemento de React figuran como dependencias de ejecución; deberían ser de desarrollo.

## Observaciones

- `Workshop.jsx` concentra mucho estado (≈21 KB en 163 líneas muy largas). Buena parte del código de `src/game/` está escrito en líneas densas, lo que dificulta revisar diferencias y recibir contribuciones.
- Las fichas usan arreglos posicionales en vez de objetos con campos nombrados ([[Fichas educativas]]).
- `Greenhouse3D.jsx` y `Trail2D.jsx` existen en el código pero el informe técnico (corte 13-sep-2026) aún las describe como fases pendientes: la documentación va por detrás del código.

Detalle por módulo: [[Motor de reglas]], [[Persistencia y respaldos]], [[Bruma y Gemini]], [[Jardín y expediciones]], [[Lanzador y scripts]].
