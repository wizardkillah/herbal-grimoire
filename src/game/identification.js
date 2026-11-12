import { INGREDIENTS } from './rules.js';
// Observation prompts are not a taxonomic key or a safety/edibility assessment.
const nc = slug => `https://plants.ces.ncsu.edu/plants/${slug}/`;
const profiles = {
  matico: ['buddleja-globosa', 'Hojas opuestas, alargadas y de borde dentado.', 'Envés con vellosidad; superficie superior marcada por nervaduras.', 'Flores pequeñas reunidas en cabezuelas redondas amarillas o anaranjadas.'],
  lavanda: ['lavandula-angustifolia', 'Hojas estrechas, lineales, de tono verde grisáceo.', 'Flores violetas agrupadas en espigas terminales.', 'Mata ramificada, con base que se vuelve leñosa.'],
  calendula: ['calendula-officinalis', 'Capítulos amarillos o anaranjados, con numerosas flores externas alargadas.', 'Hojas simples, más anchas hacia el extremo, sobre tallos herbáceos.', 'El aspecto del capítulo cambia entre variedades; observa también el follaje.'],
  romero: ['rosmarinus-officinalis', 'Hojas muy estrechas con márgenes enrollados hacia abajo.', 'Haz verde y envés blanquecino con vellosidad.', 'Flores pequeñas de dos labios, azuladas, lilas o blancas; ramas leñosas.'],
  jengibre: ['zingiber-officinale', 'Rizoma ramificado y nudoso, con piel beige o parda.', 'Interior de color amarillo pálido; tejido que puede ser fibroso.', 'La planta tiene hojas largas y estrechas; el ingrediente es el rizoma.'],
  manzanilla: ['matricaria-chamomilla', 'Capítulos con flores blancas alrededor de un centro amarillo.', 'Follaje finamente dividido, de aspecto plumoso.', 'El centro del capítulo se eleva al madurar; no basta una flor tipo margarita para identificarla.'],
  valeriana: ['valeriana-officinalis', 'Tallos herbáceos erguidos y hojas divididas en folíolos.', 'Grupos de flores pequeñas blancas o rosadas en la parte superior.', 'La raíz seca se reconoce peor que la planta completa: comprueba procedencia y etiqueta.'],
  menta: ['mentha-x-piperita', 'Hojas opuestas con margen dentado.', 'Tallos de sección cuadrangular, a veces con tonos rojizos.', 'Flores pequeñas en agrupaciones terminales; muchas mentas se parecen entre sí.'],
  tomillo: ['thymus-vulgaris', 'Mata baja con ramas finas, leñosas en la base.', 'Hojas pequeñas, opuestas y estrechas.', 'Flores pequeñas rosadas o lilas, agrupadas en los extremos.'],
  llanten: ['plantago-major', 'Hojas anchas agrupadas en una roseta junto al suelo.', 'Varias nervaduras prominentes recorren la hoja desde la base.', 'Espigas estrechas y alargadas, sostenidas por tallos sin hojas.'],
  paico: ['dysphania-ambrosioides', 'Hojas alargadas con bordes irregulares o dentados.', 'Flores diminutas y verdosas agrupadas cerca de las hojas.', 'Tallo herbáceo ramificado; el nombre paico se aplica a distintas especies.'],
  ajo: ['allium-sativum', 'Bulbo dividido en dientes bajo envolturas delgadas y secas.', 'Hojas alargadas, aplanadas, que nacen de la base.', 'El bulbo pelado pierde rasgos: conserva información del proveedor.'],
  albahaca: ['ocimum-basilicum', 'Hojas opuestas, generalmente ovaladas; hay cultivares verdes y morados.', 'Tallos herbáceos de sección cuadrangular.', 'Flores pequeñas agrupadas hacia el extremo de las ramas.'],
  hierbabuena: ['mentha-spicata', 'Hojas dentadas y casi sin pecíolo, con poca vellosidad.', 'Tallos cuadrados y crecimiento extendido mediante rizomas.', 'Flores pequeñas lilas, rosadas o blancas en espigas terminales.'],
  hinojo: ['foeniculum-vulgare', 'Hojas muy divididas en segmentos finos como hilos.', 'Flores amarillas reunidas en umbelas, similares a pequeños paraguas.', 'Frutos secos alargados con costillas; no identificar otras umbelíferas por parecido.'],
  azafran: ['crocus-sativus', 'Flor de tonos lilas o violetas.', 'Estigmas largos de tono rojo anaranjado: esa es la parte de la especia.', 'Hojas estrechas, semejantes a pasto; una flor parecida no garantiza que sea azafrán.'],
  melisa: ['melissa-officinalis', 'Hojas opuestas, ovaladas, con borde dentado.', 'Lámina con superficie arrugada y nervaduras marcadas.', 'Hierba ramificada; las flores son pequeñas y poco vistosas.'],
  ortiga: ['urtica-dioica', 'Hojas opuestas de borde aserrado y extremo puntiagudo.', 'Pelos en hojas y tallos; algunos son urticantes, no los compruebes tocándolos.', 'Flores pequeñas verdosas en agrupaciones alargadas.'],
  salvia: ['salvia-officinalis', 'Hojas alargadas, opuestas, verde grisáceas.', 'Superficie rugosa y con vellosidad.', 'Flores de dos labios en la parte superior; base de la mata semileñosa.'],
  tilo: ['tilia-cordata', 'Hojas acorazonadas de margen aserrado.', 'Flores pequeñas reunidas en grupos asociados a una bráctea alargada.', 'Porte arbóreo; hay varias especies de tilo de aspecto similar.'],
};
const visual = {
 cedron: ['Hojas estrechas y alargadas; compara cómo se agrupan en cada nudo.', 'Observa la punta de la hoja y el relieve de las nervaduras.', 'Busca una rama completa, además de hojas sueltas.'],
 boldo: ['Hojas ovaladas, de aspecto grueso y superficie marcada.', 'Compara el borde y la disposición de las hojas en la rama.', 'Una hoja seca aislada no permite distinguir todos los llamados boldos.'],
 muna: ['Compara las hojas pequeñas y el borde de la lámina.', 'Observa cómo se disponen las hojas en el tallo.', 'Busca flores y ramificación; una foto de hojas no resuelve todas las especies similares.'],
 canelo: ['Hojas alargadas, brillantes por una cara y más pálidas por la otra.', 'Compara las flores blancas y la forma de sus pétalos.', 'Observa el árbol completo; canelo y canela no son el mismo ingrediente.'],
 jazmin: ['Compara las flores blancas y la forma de sus lóbulos.', 'Observa las hojas simples junto con la rama.', 'Hay variedades de flor doble; muchos nombres con jazmín designan otras plantas.'],
 hibisco: ['Compara los cálices carnosos rojos utilizados como ingrediente.', 'Observa la cápsula central y las piezas del cáliz que la rodean.', 'Las flores y los cálices secos no son lo mismo; otros hibiscos ornamentales son diferentes.'],
 maqui: ['Observa los frutos pequeños, redondos y oscuros cuando maduros.', 'Compara las hojas y su margen dentado.', 'No identifiques bayas oscuras solo por el color.'],
 eucalipto: ['Compara las hojas juveniles con las adultas: pueden ser muy distintas.', 'Observa la forma de las cápsulas leñosas.', 'Busca la rama y el árbol completo; existen muchas especies de eucalipto.'],
 bailahuen: ['Observa los capítulos amarillos junto con las hojas.', 'Compara el tamaño y el borde de las hojas, y la ramificación.', 'Bailahuén puede designar varias especies de Haplopappus; necesita revisión especializada.'],
 quillay: ['Compara las hojas de la rama, las flores y los frutos.', 'Observa los frutos abiertos, con piezas que se extienden hacia afuera.', 'La corteza en fragmentos no basta para verificar la especie.'],
 mate: ['Compara las hojas simples y su margen.', 'La yerba comercial está fragmentada y puede incluir tallos.', 'El color y tamaño de corte cambian con el procesamiento.'],
 rosa_t: ['Compara pétalos, hojas compuestas y tallos.', 'Observa el número y la forma de los folíolos.', 'Los pétalos solos no distinguen todas las rosas o sus tratamientos de cultivo.'],
 azahar: ['Flores blancas con estambres visibles; compara el follaje del cítrico.', 'Observa el tamaño y forma de los pétalos en la imagen.', 'Azahar no especifica por sí solo la especie del cítrico.'],
 cardamomo: ['Compara las cápsulas y sus costillas longitudinales.', 'Observa si están enteras, abiertas o molidas.', 'La presentación molida pierde rasgos; comprueba especie y lote.'],
 anis_t: ['Fruto con piezas leñosas dispuestas como una estrella.', 'Observa la forma y número de sus brazos y semillas.', 'No distingue por sí solo anís estrellado de especies tóxicas parecidas.'],
 clavo_t: ['Botones florales secos, con un extremo ensanchado.', 'El cuerpo estrecho recuerda a un pequeño clavo.', 'El polvo no permite confirmar identidad ni pureza a simple vista.'],
 pimienta_r: ['Compara los frutos rosados o rojizos en racimos.', 'Observa las hojas compuestas del árbol de referencia.', 'Pimienta rosa no pertenece al mismo género que la pimienta negra.'],
 vanilla_t: ['Compara las cápsulas alargadas comercializadas como vainas.', 'La planta es una orquídea trepadora; la foto de la flor muestra otra etapa.', 'El extracto o polvo necesita etiqueta: la imagen no confirma su composición.'],
 stevia_t: ['Observa las hojas y su margen, y cómo se unen al tallo.', 'Compara la planta completa con el producto seco.', 'Los edulcorantes procesados no tienen el mismo aspecto que las hojas.'],
 ruda: ['Compara las hojas divididas en segmentos pequeños.', 'Observa la forma de los pétalos amarillos y sus bordes.', 'Las especies de Ruta se parecen; no identifiques ni uses ruda por una sola foto.'],
 una_gato: ['Busca los ganchos curvados junto a los nudos de la liana.', 'Compara las hojas, flores y porte trepador.', 'El nombre uña de gato también se usa para plantas de otros géneros.'],
 sangre_grado: ['Compara la forma de las hojas y sus nervaduras.', 'La foto de un árbol no confirma la identidad de un látex envasado.', 'Varias especies de Croton comparten el nombre sangre de grado.'],
 chanca_piedra: ['Observa las ramillas con numerosas hojas pequeñas.', 'Busca los frutos pequeños situados bajo las ramillas.', 'Existen especies de Phyllanthus muy similares; se necesita más que una vista general.'],
 hercampuri: ['Observa el porte completo y las hojas pequeñas.', 'Compara las flores y su disposición en los tallos.', 'Un manojo seco no conserva todos los caracteres necesarios para identificarlo.'],
 maca: ['Compara el órgano engrosado comercializado y el follaje de la planta.', 'Observa las diferencias de tamaño, forma y color entre variedades.', 'El polvo requiere trazabilidad; no puede verificarse por una fotografía.'],
 yacon: ['Compara las raíces de reserva con las hojas de la planta.', 'Observa la forma alargada de las raíces y sus diferencias de tamaño.', 'La fotografía de raíces no valida productos de hojas o extractos.'],
};
export const IDENTIFICATION = {};
for (const i of INGREDIENTS) {
 const profile = profiles[i.id];
 IDENTIFICATION[i.id] = {
   kind: profile || visual[i.id] ? 'planta' : 'ingrediente',
   features: profile ? profile.slice(1) : visual[i.id] || [
     `Compara la forma y presentación de ${i.name.toLowerCase()} con la referencia.`,
     'Observa color, textura y si el ingrediente está entero, cortado, seco o procesado.',
     'Revisa el nombre, la composición y la procedencia en la etiqueta del producto.',
   ],
   sourceTitle: profile ? 'NC State Extension · descripción botánica' : 'Imagen de referencia · guía de observación',
   sourceUrl: profile ? nc(profile[0]) : null,
   evidence: profile ? 'Rasgos botánicos documentados' : 'Observación orientativa',
   confusion: 'Compara varios rasgos y consulta una fuente botánica. Marcar coincidencias no confirma identidad, comestibilidad ni seguridad.',
 };
}
const set = (ids, features, confusion) => ids.forEach(id => { IDENTIFICATION[id] = { ...IDENTIFICATION[id], kind: 'preparación', features, confusion: confusion || 'La apariencia no confirma composición, pureza ni aptitud para consumo.' }; });
set(['rocio','agua_c','a75','a85','a100','agua_f'], ['Líquido transparente: la imagen representa agua, no una temperatura específica.', 'La potabilidad no puede determinarse por transparencia, color u olor.', 'La temperatura debe medirse; no se deduce de una fotografía.']);
set(['alc_b','alc_neut','vodka'], ['La transparencia no confirma que un líquido sea etanol o vodka.', 'Comprueba etiqueta, composición, graduación y uso previsto.', 'La foto no identifica concentraciones ni detecta alcoholes tóxicos.']);
set(['naranja','nar_o','lim_c','lim_o','bergamota','pomelo_c','pomelo_art','limeta','yuzu','nar_am','mandarina'], ['Compara la corteza del cítrico, su grosor y la forma del fruto.', 'Observa los segmentos de la pulpa si la referencia muestra un corte.', 'Fruto, ralladura y cáscara seca son presentaciones diferentes; la imagen puede mostrar el fruto de origen.']);
set(['te_verde','te_negro','te_blanco','te_oolong','rooibos'], ['Observa el tamaño, enrollado y color de las hojas o fragmentos secos.', 'El procesado cambia su aspecto; una bebida preparada no identifica la planta de origen.', 'Los tés verde, negro, blanco y oolong son tipos de elaboración; rooibos procede de otra planta.']);
set(['pisco','aguard','chicha','mosto','ron','gin','tequila','vino_t','vino_b','cerveza_a','kombucha','grappa','champan','cerveza_b','ron_a'], ['La foto muestra una presentación representativa, no un análisis del contenido.', 'El color, la espuma y el envase varían según elaboración y fabricante.', 'Identifica el producto por etiqueta, materias primas y graduación declarada.']);
set(['miel','panela_t','jarabe'], ['Observa si la presentación es líquida, cristalizada o sólida.', 'Color y textura pueden variar entre lotes.', 'La apariencia no permite verificar pureza, adulteración ni composición.']);
set(['leche','leche_av','lco_b'], ['Compara la presentación líquida y la información del envase.', 'Un líquido blanco no permite distinguir leche animal de una bebida vegetal.', 'Confirma ingredientes y alérgenos mediante la etiqueta.']);
set(['jlim','jnar','tonica','vinagre'], ['Observa la presentación y el envase de referencia.', 'El color o transparencia no determina composición, acidez ni ingredientes.', 'Comprueba el tipo de producto y su lista de ingredientes.']);
set(['canela'], ['Compara los fragmentos o rollos de corteza seca.', 'El grosor y número de capas pueden variar entre especies y presentaciones.', 'No certifiques canela de Ceilán o casia solo por una foto; consulta la especie declarada.']);
set(['framb'], ['Fruto formado por muchas pequeñas unidades agrupadas.', 'Compara el color, que varía con la variedad y la maduración.', 'El aspecto por sí solo no identifica todas las especies de Rubus.']);
set(['maracuya'], ['Compara la corteza y la pulpa con numerosas semillas.', 'El color de la cáscara cambia entre variedades.', 'La foto de un fruto no identifica todas las pasifloras.']);
set(['cera'], ['Observa bloques o láminas de cera, a menudo amarillentos.', 'La forma comercial puede ser moldeada y el color variar con el procesamiento.', 'El aspecto no distingue mezclas, aditivos o pureza.']);
set(['hielo'], ['Agua congelada presentada en cubos u otras formas.', 'La transparencia puede variar con burbujas y condiciones de congelación.', 'Congelar agua no demuestra que sea potable.']);
