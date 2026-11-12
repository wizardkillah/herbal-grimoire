import { restoreNature } from './nature.js';
import { evaluate, QUESTS, restore } from './rules.js';

export const SAVE_SCHEMA = 'grimorio-save/1';
export const MAX_SAVE_BYTES = 5 * 1024 * 1024;
const object = value => value !== null && typeof value === 'object' && !Array.isArray(value);
function validateState(state) {
  if (!object(state) || state.version !== 1 || !Array.isArray(state.completed) || !Array.isArray(state.discoveries)
    || typeof state.upgraded !== 'boolean' || !Number.isSafeInteger(state.attempts) || state.attempts < 0
    || (state.notebook !== undefined && !object(state.notebook))) throw new Error('La estructura de la partida no es válida.');
  if (state.completed.length > QUESTS.length || state.completed.some((id,n) => QUESTS[n].id !== id)
    || (state.upgraded && state.completed.length < 2)) throw new Error('La progresión del archivo no es válida.');
  if (state.nature !== undefined) {
    const stable = value => JSON.stringify(value, (key,v) => object(v) ? Object.fromEntries(Object.entries(v).sort(([a],[b])=>a.localeCompare(b))) : v);
    if (stable(state.nature.schemaVersion === undefined ? {...restoreNature(state.nature),...state.nature} : state.nature) !== stable(restoreNature(state.nature))) throw new Error('El jardín o la expedición del respaldo no son válidos.');
  }
  const keys = new Set();
  for (const entry of state.discoveries) {
    if (!object(entry)) throw new Error('El archivo contiene una receta inválida.');
    const recipe = evaluate(entry.ids, entry.method, state.upgraded ? 4 : 3);
    if (entry.key !== recipe.key || keys.has(recipe.key)) throw new Error('Hay recetas duplicadas o identificadores inconsistentes.');
    keys.add(recipe.key);
  }
  for (const [key,note] of Object.entries(state.notebook || {})) {
    if (!keys.has(key) || !object(note)) throw new Error('Hay notas sin una receta válida.');
    for (const [field,max] of [['title',140],['observation',2000],['origin',500]]) {
      if (typeof note[field] !== 'string' || note[field].length > max) throw new Error('Una nota tiene un formato o longitud inválidos.');
    }
  }
}
export function exportSave(state, date = new Date()) {
  validateState(state);
  return JSON.stringify({ schema:SAVE_SCHEMA, exportedAt:date.toISOString(), state:restore(JSON.stringify(state)) },null,2);
}
export function importSave(raw) {
  if (typeof raw !== 'string' || new TextEncoder().encode(raw).length > MAX_SAVE_BYTES) throw new Error('El respaldo supera el límite de 5 MB.');
  let file;
  try { file = JSON.parse(raw); } catch { throw new Error('El archivo no contiene un JSON válido.'); }
  if (!object(file) || file.schema !== SAVE_SCHEMA) throw new Error('Este archivo no es un respaldo compatible de Grimorio Herbal.');
  if (typeof file.exportedAt !== 'string' || !Number.isFinite(Date.parse(file.exportedAt))) throw new Error('La fecha del respaldo no es válida.');
  validateState(file.state);
  return { state:restore(JSON.stringify(file.state)), exportedAt:file.exportedAt };
}
