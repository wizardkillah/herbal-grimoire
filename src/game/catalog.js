import { H_MED, H_TE, H_OSCURO, LICORES, H_ART, BASES_VERDE, BASES_TE, BASES_OSCURO, BASES_ART } from '../data/ingredients.js';

// Preserve every original record through an explicit alias, including preparation variants.
export const LEGACY_GROUPS = [
  ['Herbolario', H_MED], ['Tés y aromas', H_TE], ['Cocina', H_OSCURO],
  ['Bebidas', LICORES], ['Artesanales', H_ART],
  ['Bases', BASES_VERDE], ['Bases', BASES_TE], ['Bases', BASES_OSCURO], ['Bases', BASES_ART],
];
export const LEGACY_ALIASES = {
  miel_m: 'miel', miel_t: 'miel', miel_o: 'miel', miel_b: 'miel',
  lavanda_t: 'lavanda', lavanda_art: 'lavanda', man_t: 'manzanilla',
  jengibre_t: 'jengibre', jengibre_o: 'jengibre', jeng_art: 'jengibre',
  canela_t: 'canela', canela_o: 'canela', canela_art: 'canela',
  nar_c: 'naranja', nar_art: 'naranja', lim_art: 'lim_c',
  menta_o: 'menta', menta_art: 'menta', rosa_o: 'rosa_t',
  anis_o: 'anis_t', anis_art: 'anis_t', clavo_art: 'clavo_t',
  card_art: 'cardamomo', vaini_art: 'vanilla_t', berg_art: 'bergamota',
  albah_art: 'albahaca', romero_art: 'romero', tomillo_art: 'tomillo', cedron_art: 'cedron',
  pisco_art: 'pisco', pisco_a: 'pisco', vodka_art: 'vodka', vodka_a: 'vodka',
  alc_a: 'alc_b', agua: 'rocio', agua_r: 'rocio',
};
export const REGIONS = { todas: 'Todas las colecciones', chile: 'Chile', latam: 'Latinoamérica', general: 'Catálogo general' };
export const normalizeSearch = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
const chile = new Set(['boldo', 'llanten', 'matico', 'bailahuen', 'cedron', 'canelo', 'quillay', 'maqui']);
const latam = new Set(['paico', 'muna', 'mate', 'pimienta_r', 'stevia_t']);
const parts = {
  manzanilla: 'Flor', valeriana: 'Raíz', menta: 'Hoja', eucalipto: 'Hoja', tomillo: 'Hoja',
  llanten: 'Hoja', bailahuen: 'Hoja', paico: 'Hoja', quillay: 'Corteza', ajo: 'Bulbo',
  te_verde: 'Hoja', te_negro: 'Hoja', te_blanco: 'Hoja', te_oolong: 'Hoja', rooibos: 'Hoja', mate: 'Hoja',
  rosa_t: 'Flor', azahar: 'Flor', lim_c: 'Fruto', bergamota: 'Fruto', pomelo_c: 'Fruto',
  cardamomo: 'Semilla', anis_t: 'Fruto', clavo_t: 'Flor', pimienta_r: 'Fruto', vanilla_t: 'Fruto', stevia_t: 'Hoja',
  albahaca: 'Hoja', hierbabuena: 'Hoja', hinojo: 'Fruto', azafran: 'Flor',
};
const names = { lim_c: 'Cáscara de limón', nar_o: 'Naranja (fruto)', lim_o: 'Limón (fruto)', mosto: 'Mosto fermentado', cera: 'Cera de abejas', alc_b: 'Alcohol (base)', vinagre: 'Vinagre de manzana', leche_av: 'Bebida de avena', lco_b: 'Leche de coco', clavo_t: 'Clavo de olor', anis_t: 'Anís estrellado', alc_neut: 'Alcohol neutro 96°' };
const latin = { te_negro: 'Camellia sinensis', te_blanco: 'Camellia sinensis', azahar: 'Citrus aurantium', menta: 'Mentha × piperita' };
export function expandCatalog(core) {
  const entries = new Map(core.map(i => [i.id, { ...i, collections: [], aliases: [], latin: '', region: chile.has(i.id) ? 'chile' : latam.has(i.id) ? 'latam' : 'general' }]));
  for (const [collection, records] of LEGACY_GROUPS) for (const old of records) {
    const id = LEGACY_ALIASES[old.id] || old.id;
    if (!entries.has(id)) entries.set(id, {
      id, name: names[id] || old.n, family: parts[id] || (['Bases', 'Bebidas'].includes(collection) || old.sub === 'alcohol' ? 'Base' : old.sub === 'citrico' || collection === 'Cocina' ? 'Fruto' : 'Ingrediente'),
      color: old.c, stats: { luz: 1, calma: 1, calor: 1, vigor: 1 },
      latin: latin[id] || old.lat || '', collections: [], aliases: [],
      region: chile.has(id) ? 'chile' : latam.has(id) ? 'latam' : 'general',
    });
    const entry = entries.get(id);
    if (!entry.collections.includes(collection)) entry.collections.push(collection);
    entry.aliases.push(old.n);
    if (!entry.latin) entry.latin = latin[id] || old.lat || '';
  }
  return [...entries.values()];
}
export function matchesIngredient(i, query, region = 'todas', collection = 'Todas') {
  return (region === 'todas' || i.region === region) && (collection === 'Todas' || i.collections.includes(collection)) && normalizeSearch([i.name, i.latin, ...i.aliases].join(' ')).includes(normalizeSearch(query.trim()));
}
