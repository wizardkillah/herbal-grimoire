const minsal = 'https://www.minsal.cl/medicinas-complementarias/';
const report = 'https://www.minsal.cl/wp-content/uploads/2015/09/INFORME-FINAL-FITOTERAPIA-30-12-2015.pdf';
const quality = 'https://repositorio.essalud.gob.pe/bitstream/handle/20.500.12959/3948/Control%20de%20Calidad%20de%20las%20Plantas%20Medicinales.pdf?sequence=1';
// Collection labels describe this library, not exclusive geographic origin or native status.
export const REGIONAL = [
  ['melisa', 'Melisa / Toronjil', 'Melissa officinalis', 'Hoja', 'chile', 'MINSAL · Identidad y partes usadas', minsal, 'Tallos, hojas y flores', 'También conocida en Chile como toronjil o toronjil pa’ la pena.'],
  ['ortiga', 'Ortiga', 'Urtica dioica', 'Hoja', 'chile', 'MINSAL · Identidad y partes usadas', minsal, 'Hojas y ramas; raíz y rizomas en otros preparados', 'La parte usada debe registrarse: hojas y raíces no son intercambiables.'],
  ['ruda', 'Ruda', 'Ruta chalepensis', 'Hoja', 'chile', 'ISP · Listado de medicamentos herbarios tradicionales', 'https://www.ispch.cl/sites/default/files/decreto_exento_25.pdf', 'Tallos y hojas', 'Recuperada del informe v7. Contraindicada durante el embarazo; no es una bebida cotidiana.'],
  ['salvia', 'Salvia', 'Salvia officinalis', 'Hoja', 'chile', 'MINSAL · Documentación de fitoterapia', report, 'Tallos, hojas y flores', 'El nombre salvia abarca distintas especies. Esta ficha corresponde a Salvia officinalis.'],
  ['tilo', 'Tilo', 'Tilia cordata', 'Flor', 'chile', 'MINSAL · Documentación de fitoterapia', report, 'Flores y hojas', 'Se incorpora la identidad indicada en el documento; otras especies de tilo requieren su propia revisión.'],
  ['una_gato', 'Uña de gato', 'Uncaria tomentosa', 'Planta', 'latam', 'INS Perú · Jardín botánico', 'https://www.gob.pe/institucion/ins/noticias/748366-una-de-gato-florece-por-primera-vez-en-el-jardin-botanico-de-plantas-medicinales', 'Parte de preparación pendiente de revisión', 'Especie de la Amazonía peruana. No confundir con otras plantas llamadas uña de gato.'],
  ['sangre_grado', 'Sangre de grado / Sangre de drago', 'Croton lechleri', 'Látex', 'latam', 'IIAP · Cultivo de plantas medicinales', 'https://www.iiap.gob.pe/Archivos/publicaciones/CDinvestigacion/IIAP/iiap2/CapituloIII-41.htm', 'Látex · referencia botánica', 'Árbol amazónico: el nombre común también se aplica a otras especies de Croton.'],
  ['chanca_piedra', 'Chanca piedra', 'Phyllanthus niruri', 'Planta', 'latam', 'EsSalud · Control de calidad botánica', quality, 'Parte de preparación pendiente de revisión', 'La identidad botánica importa: un nombre popular no garantiza que todos los productos contengan la misma especie.'],
  ['hercampuri', 'Hercampuri', 'Gentianella alborosea', 'Planta', 'latam', 'EsSalud · Control de calidad botánica', quality, 'Parte de preparación pendiente de revisión', 'Se incorpora como referencia de la tradición herbal peruana, sin atribuir efectos a las mezclas virtuales.'],
  ['maca', 'Maca', 'Lepidium meyenii', 'Planta', 'latam', 'INIA Perú · Maca y yacón', 'https://repositorio.inia.gob.pe/items/38cca369-330e-4a4d-879c-f75b9921c982', 'Órgano de preparación pendiente de revisión', 'Especie cultivada incluida como referencia botánica y alimentaria; esta ficha no promete efectos medicinales.'],
  ['yacon', 'Yacón', 'Smallanthus sonchifolius', 'Planta', 'latam', 'INIA Perú · Maca y yacón', 'https://repositorio.inia.gob.pe/items/38cca369-330e-4a4d-879c-f75b9921c982', 'Parte de preparación pendiente de revisión', 'Registra siempre qué parte se estudia: una especie puede tener usos diferentes según el órgano vegetal.'],
].map(([id, name, latin, family, region, source, url, part, note]) => ({
  id, name, latin, family, region, source, url, part, note,
  color: region === 'chile' ? '#9ab680' : '#a8bb72',
  stats: { luz: 1, calma: 1, calor: 1, vigor: 1 }, collections: ['Herbolario'], aliases: [],
}));
