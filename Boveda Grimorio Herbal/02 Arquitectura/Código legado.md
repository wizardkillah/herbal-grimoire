---
tags: [arquitectura, deuda]
---
# Código legado

No forma parte del punto de entrada activo, pero sigue en el repositorio:

- `index_vanilla_backup.html`
- `src/grimorio_herbal_v7.jsx` (1.195 líneas) y `src/GrimorioHerbalV8.jsx` (703)
- `src/components/`, `src/data/`, `src/hooks/useXP.js`
- `src/services/gemini.js`: lee `VITE_GEMINI_API_KEY`, es decir, **incrustaría la clave en el navegador** si se reactivara.

## Antes de liberar el código

Decidir entre archivarlo en una rama o etiqueta y borrarlo de `main`, o dejarlo con un aviso claro. Mantenerlo confunde a quien llegue de fuera y conserva un patrón inseguro de manejo de claves. Al retirarlo, quitar también `@google/generative-ai` de las dependencias.

Ver [[Historia de versiones]], [[Checklist de publicación]].
