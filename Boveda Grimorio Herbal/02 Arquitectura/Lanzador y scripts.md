---
tags: [arquitectura, herramientas]
---
# Lanzador y scripts

| Archivo | Función |
|---|---|
| `Jugar Grimorio Herbal.cmd` | Doble clic en Windows: compila si hace falta y abre el navegador |
| `scripts/launch-game.mjs` | Lógica del lanzador; registros en `.launcher/` |
| `scripts/serve-game.mjs` | Sirve `dist` en `127.0.0.1:5173`; rechaza puerto ocupado |
| `scripts/bruma-api.mjs` | Ruta `/api/bruma` — [[Bruma y Gemini]] |
| `scripts/export-catalog.mjs` | Regenera `public/catalogo-ingredientes.md` |
| `scripts/collect-ingredient-images.py` | Descarga fotos y metadatos de Wikimedia (Python + Pillow) |
| `scripts/publish-ingredient-images.mjs` | Publica manifiesto y créditos |
| `scripts/render-technical-report.py` | Genera el informe HTML imprimible |

Comandos: `npm install`, `npm run dev`, `npm test`, `npm run build`, `npm run preview`.
