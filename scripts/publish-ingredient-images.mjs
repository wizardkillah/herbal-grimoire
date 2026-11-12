import { readFileSync, writeFileSync, statSync } from 'node:fs';
import { INGREDIENTS } from '../src/game/rules.js';
const candidates = JSON.parse(readFileSync(new URL('../.media-review/ingredients/candidates.json', import.meta.url), 'utf8'));
const notes = {
  naranja: 'Fruto de naranja como referencia del origen de la cáscara; no muestra una ralladura.',
  lim_c: 'Fruto de limón como referencia del origen de la cáscara.',
  pomelo_art: 'Fruto de pomelo como referencia del origen de la ralladura.',
  canela: 'Canela de Ceilán (Cinnamomum verum) en la referencia. No representa todas las canelas.',
  tequila: 'Cultivo de agave como referencia de materia prima; no muestra tequila terminado.',
  mosto: 'Uva prensada en una etapa de elaboración. La foto no verifica fermentación.',
  eucalipto: 'Referencia de Eucalyptus globulus. Las hojas juveniles y adultas presentan formas diferentes.',
  bailahuen: 'El archivo está identificado como Haplopappus baylahuen fluehmannii. El nombre bailahuén abarca varias especies.',
  anis_t: 'Planta de Illicium verum; la referencia muestra follaje, no un fruto seco.',
  sangre_grado: 'Árbol de sangre de grado en el Jardín Botánico de Lima; no acredita la composición de un látex envasado.',
  cera: 'Cera de abejas durante su fusión. La fotografía no verifica pureza ni aditivos.',
  yacon: 'Flor de yacón como referencia de la planta de origen; no muestra las raíces utilizadas como alimento.',
  ron_a: 'Presentación representativa de ron. El color mostrado no corresponde necesariamente a ron blanco.',
  jlim: 'Fruto y follaje de limón como referencia de origen; no muestra jugo preparado.',
  chicha: 'Presentación comercial de chicha clarificada. Las recetas y materias primas varían entre regiones y productores.',
  paico: 'Muestra botánica de paico con hojas e inflorescencias; no equivale a la planta completa en terreno.',
  maca: 'Plantas de maca en cultivo. El órgano engrosado permanece bajo el suelo en esta referencia.',
  jarabe: 'Jarabe de azúcar durante la preparación; la imagen no determina su concentración.',
  tonica: 'Agua tónica bajo iluminación normal y ultravioleta; el brillo no representa su color habitual.',
  ortiga: 'Hojas de ortiga con orugas. Los insectos no son un rasgo de identificación de la planta.',
};
const water = ['rocio','agua_c','a75','a85','a100','agua_f'];
const alcohol = ['alc_b','alc_neut'];
const drawings = ['Köhler', 'Woodwill', 'NGM_', 'Rosa_centifolia_foliacea'];
const manifest = {};
for (const i of INGREDIENTS) {
 const c = candidates[i.id];
 if (!c?.src) continue;
 const drawing = drawings.some(word => c.file.includes(word)) || c.file.includes('Koeh-');
 const caption = water.includes(i.id) ? 'Referencia genérica de agua: no certifica potabilidad ni representa la temperatura indicada.' : alcohol.includes(i.id) ? 'Referencia de etanol. La imagen no confirma composición, graduación ni uso alimentario del producto.' : notes[i.id] || `${drawing ? 'Lámina botánica' : 'Imagen'} de referencia para ${i.name.toLowerCase()}. Puede mostrar la planta de origen o una presentación del ingrediente.`;
 const fields = ['src','sourceUrl','originalUrl','author','license','licenseUrl','width','height','file','subject'];
 manifest[i.id] = Object.fromEntries(fields.map(key => [key,c[key]]));
 manifest[i.id].caption = caption;
 manifest[i.id].mediaType = drawing ? 'Ilustración botánica' : 'Fotografía de referencia';
 manifest[i.id].bytes = statSync(new URL('../public'+c.src, import.meta.url)).size;
 manifest[i.id].reviewedAt = '2026-09-10';
 for (const key of ['licenseUrl','sourceUrl','originalUrl']) if (manifest[i.id][key]?.startsWith('//')) manifest[i.id][key] = 'https:'+manifest[i.id][key];
}
writeFileSync(new URL('../src/game/ingredient-images.json',import.meta.url), JSON.stringify(manifest,null,2)+'\n');
writeFileSync(new URL('../public/media/ingredients/credits.json',import.meta.url), JSON.stringify(manifest,null,2)+'\n');
const unique = [...new Map(Object.values(manifest).map(x=>[x.src,x])).values()];
const lines = ['# Créditos de las imágenes de ingredientes','',`${Object.keys(manifest).length} entradas cubiertas por ${unique.length} archivos. Las variantes pueden compartir una referencia expresamente rotulada.`, '', 'Las imágenes conservan la licencia indicada por cada archivo en Wikimedia Commons. Las miniaturas se obtuvieron del proveedor; el original enlazado conserva su resolución. La licencia de una imagen no certifica la identidad taxonómica ni los usos medicinales.',''];
for (const i of INGREDIENTS) if(manifest[i.id]) {const p=manifest[i.id];lines.push(`## ${i.name}`, '', p.caption, '', `Autor: ${p.author}`, '', `[Archivo y atribución](${p.sourceUrl}) · [Licencia: ${p.license}](${p.licenseUrl || p.sourceUrl}) · [Original](${p.originalUrl})`, '');}
writeFileSync(new URL('../public/media/ingredients/CREDITOS.md', import.meta.url), lines.join('\n'));
console.log(JSON.stringify({covered:Object.keys(manifest).length,total:INGREDIENTS.length,files:unique.length,bytes:unique.reduce((n,p)=>n+p.bytes,0),minWidth:Math.min(...unique.map(p=>p.width))}));
