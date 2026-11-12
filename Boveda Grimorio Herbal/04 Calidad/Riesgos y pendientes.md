---
tags: [calidad, riesgos]
---
# Riesgos y pendientes

| Prioridad | Riesgo | Acción |
|---|---|---|
| **Crítica** | Casi todo el trabajo activo no está en Git; un único commit del 5-sep-2026 | Confirmar los cambios y subirlos al remoto privado |
| Media | Fichas documentadas el 11-nov-2026 sin revisión experta; 2 pendientes (vainilla, yuzu) | Revisión por una persona competente — [[Fichas educativas]] |
| Alta | Fotos y nombres pueden inducir identificaciones erróneas | Revisión botánica; documentar confusiones |
| Alta | Derechos del arte generado y de los originales | [[Arte y videos]], [[Licencias]] |
| Alta | Sin archivo LICENSE; falta formalizar la licencia elegida por el autor | Decisión formal — [[Significado de publicar o liberar]] |
| Media | Bruma con IA no funciona en alojamiento estático y gasta cuota si se expone | [[Bruma y Gemini]] |
| Media | Bebidas y bases artesanales en el catálogo | Etiquetar presentación; definir público |
| Media | Sin PWA ni estrategia de actualización | [[Hoja de ruta]] |
| Media | `Workshop.jsx` concentra responsabilidades; código en líneas muy densas | Separar y formatear antes de abrir a contribuciones |
| Media | [[Código legado]] con patrón inseguro de clave | Archivar o retirar |
| Media | Sin pruebas de interfaz ni auditoría de accesibilidad | [[Pruebas]] |
| Baja | `.claude/settings.local.json` está versionado | Revisarlo y sacarlo del repositorio |
| Baja | Versión 8.0.0 no refleja el estado real | Definir numeración al publicar |
| Baja | Documentación atrasada respecto del código 3D/2D | Actualizar informe y plan v9 |

Sobre secretos: `.env.local` y `.env.gemini.local` están ignorados y nunca se confirmaron en Git; no se encontraron claves en los archivos fuente revisados.
