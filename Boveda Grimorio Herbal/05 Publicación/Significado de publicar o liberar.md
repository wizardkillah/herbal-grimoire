---
tags: [publicacion, decision]
fecha: 2026-11-11
---
# Significado de publicar o liberar

Son tres decisiones distintas que se pueden tomar por separado.

## A. Publicar el juego (que cualquiera pueda jugarlo)

**Qué significa**: desplegar la compilación en una dirección web. El código puede seguir privado.

- El juego pasa de herramienta personal a **producto con audiencia**: cada ficha, aviso y respuesta de Bruma se vuelve una afirmación pública del autor.
- Las 71 fichas pendientes quedan a la vista. Publicarlas marcadas como pendientes es legítimo si la versión se presenta como beta.
- Bruma con IA: o se desactiva en la versión pública, o se monta un backend con límites por usuario y presupuesto. Hoy el servidor solo acepta el origen local.
- Hay que cumplir la atribución de las fotos y aclarar los derechos del arte ([[Licencias]]).
- Se necesitan un aviso sanitario visible y una nota de privacidad (el guardado es local; con IA, la selección viaja a Google).
- Las partidas actuales no migran solas al nuevo origen ([[Persistencia y respaldos]]).

## B. Liberar el código (código abierto)

**Qué significa**: hacer público el repositorio con una licencia.

- `package.json` ya declara **ISC**, una licencia permisiva: cualquiera podría copiar, modificar, vender o cerrar el código con solo conservar el aviso de autoría. Si no es lo que se quiere, hay que cambiarla **antes** de abrir.
- Es **irrevocable** para lo ya publicado: se puede cambiar la licencia de versiones futuras, no retirar la de las liberadas.
- El titular es Francois Rojo, autor único: la decisión es personal y no requiere acuerdos con terceros.
- Todo lo que esté en el repositorio queda expuesto para siempre, incluido el historial. Hoy eso juega a favor: hay un solo commit y no contiene claves.
- Abre la puerta a contribuciones (fichas, traducciones, correcciones botánicas), pero exige tiempo de mantenimiento y reglas editoriales claras para que nadie agregue propiedades sin fuente.
- La licencia del código **no cubre** fotos, arte, videos ni textos de las fichas.

## C. Liberar el contenido (catálogo y fichas)

**Qué significa**: permitir que otros reutilicen los textos y el catálogo, por ejemplo bajo CC BY-SA 4.0.

- Es donde está el mayor valor social: un catálogo herbal en español con fuentes es reutilizable por docentes y otros proyectos.
- Requiere que los resúmenes sean redacción propia y no copia de las monografías citadas.
- Los saberes comunitarios no públicos no deberían liberarse sin permiso de quienes los comparten.

## Recomendación

1. **Ahora**: confirmar todo el trabajo en Git y subirlo al remoto privado. Es independiente de cualquier decisión de publicación.
2. **Primero publicar (A) como beta educativa**, en sitio estático, con Bruma local y la IA desactivada, aviso sanitario y créditos. Es reversible y permite probar el ritmo con jugadores reales.
3. **Después liberar código (B) y contenido (C) juntos**, tras cumplir la [[Checklist de publicación]]: código bajo licencia permisiva (ISC o MIT), fichas y catálogo bajo CC BY-SA 4.0, fotos con su licencia original, y nombre, logotipo y arte del taller reservados.
4. Si preocupa que un tercero cierre y comercialice una copia, elegir AGPL-3.0 para el código en lugar de ISC.

> [!note] Alcance de esta nota
> Es un análisis técnico y de producto, no asesoría legal. Los puntos sobre derechos de autor, términos de OpenArt y regulación sanitaria conviene confirmarlos con una persona abogada antes de la publicación.

Ver [[Análisis de impacto]], [[Checklist de publicación]], [[Plantilla - Decisión]].
