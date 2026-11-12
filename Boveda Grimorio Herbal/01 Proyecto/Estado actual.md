---
tags: [proyecto, estado]
fecha: 2026-11-11
---
# Estado actual

**Prototipo funcional para navegador, pensado primero para PC.** Distribución final pendiente.

## Qué funciona

| Área | Estado |
|---|---|
| Taller libre y Encargos mágicos (6 encargos) | Funciona — [[Motor de reglas]] |
| Herbolario con 101 entradas, búsqueda y filtros | Funciona — [[Catálogo de ingredientes]] |
| Panel de Bruma (Reconocer / Usos y cuidados / Fuentes) | Funciona |
| Bruma con Gemini: interpreta pócimas | Opcional, requiere clave en servidor local — [[Bruma y Gemini]] |
| Bruma con Gemini: preguntas libres (sección Preguntar) | Nuevo, 11-nov-2026; probado con una consulta real |
| Grimorio con notas, exportar, importar, imprimir | Funciona — [[Persistencia y respaldos]] |
| Jardín (3 bancales) y Explorar (bosque, montaña) | Funciona — [[Jardín y expediciones]] |
| Lanzador de doble clic en Windows | Funciona — [[Lanzador y scripts]] |

## Qué no existe todavía

Cuentas, sincronización, PWA/instalador, multijugador, pagos, reconocimiento por cámara, revisión botánica profesional, auditoría de accesibilidad ni de seguridad.

## Estado del repositorio

- Remoto: GitHub, **privado**, último push 5-sep-2026.
- Un solo commit («Commit inicial»). Cambios sin confirmar en 8 archivos y carpetas completas sin seguimiento: `src/game/`, `scripts/`, `docs/`, `public/`, `README.md`, el lanzador.
- `package.json` dice versión 8.0.0 aunque el trabajo activo corresponde al taller nuevo y al plan v9.
- Verificación del 11-nov-2026: `npm test` → 34 de 34 pruebas pasan y `npm run build` compila.

Ver [[Riesgos y pendientes]] y [[Hoja de ruta]].
