---
tags: [arquitectura]
archivos: [src/game/save-file.js, src/game/BackupControls.jsx, src/game/PrintableGrimorio.jsx]
---
# Persistencia y respaldos

- La partida vive en `localStorage` bajo `grimorio_workshop_v1`. Pertenece al navegador **y al origen, incluido el puerto**: por eso el lanzador fija `127.0.0.1:5173` y no cambia de puerto solo.
- `restore()` tolera JSON corrupto, rechaza versiones desconocidas, descarta recetas inválidas y recalcula valores derivados.
- Notas por receta: título (140), observaciones (2.000), origen del conocimiento (500).
- **Exportar / importar**: JSON con esquema `grimorio-save/1`, máximo 5 MiB, validación completa y vista previa antes de «Reemplazar mi partida». Incluye jardín, cesta y expedición activa.
- **Imprimir**: cuaderno en A4 sin los puntos ficticios.

> [!important] Consecuencia para publicar
> Si el juego se publica en una dirección web, las partidas locales de `127.0.0.1:5173` no aparecen allí. El camino es exportar e importar. Ver [[Checklist de publicación]].

Pendiente declarado: comprobar el archivo descargado y la salida impresa en un navegador normal.
