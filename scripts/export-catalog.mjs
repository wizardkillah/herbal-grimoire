import { writeFileSync } from 'node:fs';
import { INGREDIENTS } from '../src/game/rules.js';
import { HERBS } from '../src/game/herbs.js';
import { LEGACY_GROUPS, LEGACY_ALIASES, REGIONS } from '../src/game/catalog.js';
const rows = [...INGREDIENTS].sort((a,b) => a.name.localeCompare(b.name, 'es'));
const originalCount = LEGACY_GROUPS.reduce((n, [, records]) => n + records.length, 0);
const lines = ['# Catálogo de Grimorio Herbal', '', `${rows.length} ingredientes y presentaciones. Recupera las ${originalCount} entradas originales, unifica repeticiones e incorpora una ampliación regional.`, '', 'Las colecciones no indican origen exclusivo ni condición de especie nativa. La inclusión no recomienda consumo. Las fichas botánicas no equivalen a monografías terapéuticas; las pendientes están identificadas.', '', '| Ingrediente | Identidad / presentación | Colección | Estado de ficha | Fuente |', '| --- | --- | --- | --- | --- |'];
for (const i of rows) {
  const h = HERBS[i.id];
  lines.push(`| ${i.name} | ${h[0]} | ${REGIONS[i.region]} · ${i.collections.join(', ') || 'Taller original'} | ${h[2]} | ${h[6] ? `[${h[5]}](${h[6]})` : h[5]} |`);
}
lines.push('', '## Correspondencia con el catálogo anterior', '', '| Entrada original | Ingrediente actual |', '| --- | --- |');
for (const [group, records] of LEGACY_GROUPS) for (const old of records) {
  const item = rows.find(i => i.id === (LEGACY_ALIASES[old.id] || old.id));
  lines.push(`| ${group}: ${old.n} (${old.id}) | ${item.name} (${item.id}) |`);
}
writeFileSync(new URL('../public/catalogo-ingredientes.md', import.meta.url), lines.join('\n') + '\n');
console.log(`${rows.length} ingredientes; ${originalCount} entradas originales cubiertas.`);
