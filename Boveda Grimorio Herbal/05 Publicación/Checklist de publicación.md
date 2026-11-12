---
tags: [publicacion, checklist]
---
# Checklist de publicación

## Paso 0 — Proteger el trabajo
- [ ] Confirmar en Git `src/game/`, `scripts/`, `docs/`, `public/`, `README.md` y los cambios pendientes
- [ ] Subir al remoto privado
- [ ] Sacar `.claude/settings.local.json` del repositorio

## Publicar el juego (beta)
- [ ] Definir el público objetivo y si incluye menores
- [ ] Aviso sanitario visible al iniciar, no solo en las fichas
- [ ] Decidir Bruma con IA: desactivada, o backend con límite por usuario y tope de gasto
- [ ] Página de créditos accesible desde el inicio
- [ ] Nota de privacidad: guardado local; envío a Google si hay IA
- [ ] Verificar los términos de OpenArt para el arte y los videos
- [ ] Elegir alojamiento con HTTPS; revisar encabezados y política de contenido
- [ ] Probar la exportación descargada y la impresión en un navegador normal
- [ ] Instrucciones para migrar partidas con exportar e importar
- [ ] `npm audit` y revisión de dependencias
- [ ] Prueba de ritmo con jugadores reales

## Liberar el código
- [ ] Decisión del autor (Francois Rojo) sobre la licencia
- [ ] Añadir LICENSE y aviso de licencias por tipo de recurso
- [ ] Archivar o retirar el [[Código legado]] y la dependencia `@google/generative-ai`
- [ ] Mover `vite` y el complemento de React a dependencias de desarrollo
- [ ] Formatear el código de `src/game/` para que sea revisable
- [ ] Guía de contribución con la regla editorial: ninguna propiedad sin fuente
- [ ] Integración continua que ejecute `npm test`
- [ ] Actualizar el informe técnico y el plan v9 al estado real
- [ ] Definir la numeración de versiones

## Liberar el contenido
- [ ] Revisar que los resúmenes sean redacción propia
- [ ] Licencia del catálogo y las fichas
- [ ] Revisión botánica y sanitaria por una persona competente
- [ ] Política de atribución y permiso para saberes comunitarios

Contexto: [[Significado de publicar o liberar]], [[Riesgos y pendientes]].
