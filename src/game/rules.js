import { spendStock } from './nature-v9.js';
import { newNature, restoreNature, natureXP } from './nature.js';
import { expandCatalog } from './catalog.js';
import { REGIONAL } from './regional.js';
// Magical properties are fictional game rules, not medicinal claims.
export const AXES = { luz: 'Luz', calma: 'Calma', calor: 'Calor', vigor: 'Vigor' };
const CORE_INGREDIENTS = [
  ['matico', 'Matico', 'Hoja', '#a3ba6a', [2, 0, 0, 2]],
  ['cedron', 'Cedrón', 'Hoja', '#c9d785', [1, 3, 0, 0]],
  ['boldo', 'Boldo', 'Hoja', '#729b70', [0, 1, 0, 3]],
  ['muna', 'Muña', 'Hoja', '#8dbfa9', [1, 2, 0, 1]],
  ['canelo', 'Canelo', 'Corteza', '#ce9569', [0, 0, 2, 2]],
  ['lavanda', 'Lavanda', 'Flor', '#bca2df', [0, 4, 0, 0]],
  ['calendula', 'Caléndula', 'Flor', '#e9bc62', [3, 0, 1, 0]],
  ['jazmin', 'Jazmín', 'Flor', '#e1dac1', [2, 2, 0, 0]],
  ['hibisco', 'Hibisco (flor de Jamaica)', 'Cáliz', '#d98a9f', [0, 1, 1, 2]],
  ['romero', 'Romero', 'Hoja', '#94b982', [1, 0, 1, 2]],
  ['jengibre', 'Jengibre', 'Rizoma', '#d7a571', [0, 0, 4, 0]],
  ['canela', 'Canela', 'Corteza', '#c38d75', [1, 1, 2, 0]],
  ['naranja', 'Cáscara de naranja', 'Fruto', '#eeb46e', [3, 0, 1, 0]],
  ['maqui', 'Maqui', 'Fruto', '#b496c8', [0, 1, 0, 3]],
  ['miel', 'Miel', 'Base', '#dfc575', [2, 1, 1, 0]],
  ['rocio', 'Agua potable', 'Base', '#9bcdd5', [1, 2, 0, 1]],
].map(([id, name, family, color, values]) => ({ id, name, family, color, stats: Object.fromEntries(Object.keys(AXES).map((key, i) => [key, values[i]])) }));

export const INGREDIENTS = [...expandCatalog(CORE_INGREDIENTS), ...REGIONAL];

export const METHODS = [
  { id: 'infusion', name: 'Infusionar', detail: '+2 calma · −1 calor', bonus: { calma: 2, calor: -1 } },
  { id: 'macerar', name: 'Macerar', detail: '+2 luz · +1 calor', bonus: { luz: 2, calor: 1 } },
  { id: 'moler', name: 'Moler', detail: '+2 vigor · −1 luz', bonus: { vigor: 2, luz: -1 } },
];
export const QUESTS = [
  { id: 'farol', who: 'Elena · Guardiana del invernadero', title: 'Una luz entre las hojas', text: 'Las plantas duermen. Necesito encender mi farol sin despertarlas ni quemar sus hojas.', method: 'infusion', min: { luz: 5, calma: 3 }, max: { calor: 2 }, hint: 'Combina dos fuentes de luz con una hoja tranquila. El jazmín también ilumina.', reply: 'Las hojas siguen dormidas y el sendero brilla. Esta noche nadie se perderá.' },
  { id: 'abrigo', who: 'Tomás · Cartero de la cordillera', title: 'Un bolsillo de verano', text: 'La niebla apagó las señales del paso. Busco una brasa luminosa que me mantenga despierto.', method: 'macerar', min: { calor: 5, luz: 3 }, max: { calma: 2 }, hint: 'El jengibre guarda cuatro puntos de calor. Macerar suma luz y calor.', reply: '¡Ya distingo las señales! Tus brasas viajarán conmigo hasta el último refugio.' },
  { id: 'semilla', who: 'Inés · Jardinera de las ruinas', title: 'El jardín que recuerda', text: 'Una semilla de piedra espera bajo el patio. Necesito vigor, sin demasiado calor, para despertarla.', method: 'moler', min: { vigor: 8 }, max: { calor: 2 }, hint: 'El boldo y el maqui tienen mucho vigor. Moler añade dos puntos más.', reply: 'La primera raíz cruzó la piedra. Ven mañana: tendremos un jardín.' },
  { id: 'sueno', who: 'Baltasar · Relojero nocturno', title: 'Silencio para las campanas', text: 'Mis campanas sueñan en voz alta. Prepara una esencia serena y tenue para que dejen descansar al pueblo.', method: 'infusion', min: { calma: 9 }, max: { luz: 2 }, hint: 'Lavanda y cedrón suman siete de calma; la infusión completa el encargo.', reply: 'Escucha… por primera vez en cien años, el reloj sabe guardar silencio.' },
  { id: 'aurora', who: 'Elena · Guardiana del invernadero', title: 'El sol en una botella', text: 'La flor del sol abre una sola vez al año. Necesita mucha luz y una brasa suave para encontrar el amanecer.', method: 'macerar', min: { luz: 8, calor: 4 }, max: { calma: 2 }, hint: 'Caléndula y cáscara de naranja aportan luz. La miel puede completar el calor.', reply: 'Sus pétalos se abrieron. Guardaré una semilla para tu taller.' },
  { id: 'equilibrio', who: 'Bruma · Compañero del taller', title: 'El sello de las cuatro estaciones', text: 'El taller está listo para despertar. Reúne las cuatro propiedades en una mezcla molida y equilibrada.', method: 'moler', min: { luz: 3, calma: 3, calor: 3, vigor: 3 }, max: {}, hint: 'Busca ingredientes que aporten varias propiedades. Jazmín, canela y romero se complementan.', reply: 'El sello resplandece. Ya no eres visitante: este taller tiene alquimista.' },
];
export const SAVE_KEY = 'grimorio_workshop_v1';
export const initialState = () => ({ version: 1, completed: [], discoveries: [], upgraded: false, attempts: 0, notebook: {}, nature: newNature() });
export function evaluate(ids, methodId, capacity = 3) {
  const method = METHODS.find(m => m.id === methodId);
  if (!method || !Array.isArray(ids) || ids.length === 0 || ids.length > capacity || ids.some(id => !INGREDIENTS.some(i => i.id === id))) throw new Error('Elige entre uno y ' + capacity + ' ingredientes y una técnica.');
  const stats = Object.fromEntries(Object.keys(AXES).map(key => [key, Math.max(0, ids.reduce((sum, id) => sum + INGREDIENTS.find(i => i.id === id).stats[key], 0) + (method.bonus[key] || 0))]));
  const name = ({ infusion: 'Infusión', macerar: 'Maceración', moler: 'Mezcla molida' })[methodId] + ' de ' + [...new Set(ids)].map(id => INGREDIENTS.find(i => i.id === id).name).join(' + ');
  return { key: `${methodId}:${[...ids].sort().join(',')}`, ids: [...ids], method: methodId, stats, name };
}
export function requirements(result, quest) {
  if (!quest) return [];
  return [
    { label: METHODS.find(m => m.id === quest.method).name, met: result.method === quest.method },
    ...Object.entries(quest.min).map(([key, value]) => ({ label: `${AXES[key]} ≥ ${value}`, met: result.stats[key] >= value })),
    ...Object.entries(quest.max).map(([key, value]) => ({ label: `${AXES[key]} ≤ ${value}`, met: result.stats[key] <= value })),
  ];
}
export const xpOf = state => state.discoveries.length * 15 + state.completed.length * 80 + natureXP(state.nature);
export const coinsOf = state => state.completed.length * 60 - (state.upgraded ? 100 : 0);
export function brew(state, ids, method, { challenge = true, useHarvest = false } = {}) {
  const result = evaluate(ids, method, state.upgraded ? 4 : 3);
  const transaction = useHarvest ? spendStock(state.nature,ids) : {nature:state.nature,used:[]};
  const nature={...transaction.nature,compost:{...transaction.nature.compost,raw:Math.min(1000000,transaction.nature.compost.raw+ids.length)}};
  const fresh = !state.discoveries.some(d => d.key === result.key);
  const quest = challenge ? QUESTS[state.completed.length] : null;
  const checks = requirements(result, quest);
  const success = Boolean(quest && checks.every(c => c.met));
  return {
    state: { ...state, nature, attempts: state.attempts + 1, discoveries: fresh ? [...state.discoveries, { key: result.key, ids: result.ids, method }] : state.discoveries, completed: success ? [...state.completed, quest.id] : state.completed },
    result: { ...result, provenance:transaction.used, fresh, checks, quest, success, earned: (fresh ? 15 : 0) + (success ? 80 : 0) },
  };
}
export function upgrade(state) {
  return state.upgraded || coinsOf(state) < 100 ? state : { ...state, upgraded: true };
}
export function restore(raw) {
  try {
    const data = JSON.parse(raw);
    if (data?.version !== 1 || !Array.isArray(data.completed) || !Array.isArray(data.discoveries)) return initialState();
    const completed = [];
    for (const quest of QUESTS) {
      if (data.completed[completed.length] !== quest.id) break;
      completed.push(quest.id);
    }
    const upgraded = data.upgraded === true && completed.length >= 2;
    const discoveries = [];
    const seen = new Set();
    for (const entry of data.discoveries) {
      try {
        const result = evaluate(entry.ids, entry.method, upgraded ? 4 : 3);
        if (!seen.has(result.key)) { discoveries.push({ key: result.key, ids: result.ids, method: result.method }); seen.add(result.key); }
      } catch { /* Ignore invalid individual records without losing the whole save. */ }
    }
    const notebook = Object.fromEntries(discoveries.filter(d => data.notebook?.[d.key]).map(d => [d.key, sanitizeNote(data.notebook[d.key])]));
    return { version: 1, completed, discoveries, upgraded, notebook, nature: restoreNature(data.nature), attempts: Number.isSafeInteger(data.attempts) && data.attempts >= 0 ? data.attempts : 0 };
  } catch { return initialState(); }
}

export function sanitizeNote(note) {
  return Object.fromEntries([['title', 140], ['observation', 2000], ['origin', 500]].map(([key, max]) => [key, typeof note?.[key] === 'string' ? note[key].slice(0, max) : '']));
}
export function saveRecipeNote(state, key, note) {
  if (!state.discoveries.some(d => d.key === key)) return state;
  return { ...state, notebook: { ...state.notebook, [key]: sanitizeNote(note) } };
}
