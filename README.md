# Grimorio Herbal

[![CI](https://github.com/wizardkillah/herbal-grimoire/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/wizardkillah/herbal-grimoire/actions/workflows/ci.yml) [![License: ISC](https://img.shields.io/badge/license-ISC-blue.svg)](LICENSE)

Herbolario educativo presentado como un juego de taller, pensado primero para PC. Conserva el arte y los videos del invernadero.

## Ejecutar

Con Node.js y las dependencias instaladas:

```sh
npm install
npm run dev
```

Abre la dirección local que imprime Vite. `npm run build` genera `dist`; `npm run preview` sirve esa compilación. `npm test` verifica reglas, progresión, guardado y que todos los encargos tengan solución.

## La primera noche del taller

En Encargos mágicos, selecciona hasta tres porciones (puedes repetir ingredientes), elige una técnica y compara las cuatro propiedades con el encargo. Conjurar una fórmula nueva entrega 15 XP. Cada encargo se recompensa una sola vez con 80 XP y 60 semillas; dos encargos permiten comprar un cuarto espacio por 100 semillas. Bruma ofrece pistas gratuitas. Los ingredientes son ilimitados y los fallos no penalizan: esta demo se centra en aprender las combinaciones.

Hay 101 ingredientes y presentaciones, tres técnicas y seis encargos secuenciales. Al terminar puedes continuar descubriendo fórmulas. El grimorio permite recuperar las proporciones exactas de una receta.

Los puntos de los encargos mágicos son ficticios y solo se muestran en ese modo. Las fichas educativas tienen fuentes propias; no constituyen una evaluación de las mezclas. El motor de juego es local. Bruma incorpora consultas opcionales a Gemini, que requieren internet y una clave en el servidor; las acciones del taller y las fichas siguen disponibles sin esas consultas. Una vez cargado, el motor no necesita conexión; todavía no hay service worker para instalarlo o abrirlo desde cero sin un servidor disponible.

El progreso se guarda en localStorage bajo `grimorio_workshop_v1`, separado del prototipo anterior. Pertenece al navegador y al origen (incluido el puerto). Borrar los datos del navegador elimina la partida. La opción Nueva partida pide confirmación y reinicia solo la demo.

## Estructura

- `src/game/rules.js`: catálogo, contratos, mezclas, economía y validación del guardado.
- `src/game/Workshop.jsx`: taller, compañero, resultados y grimorio.
- `src/game/WorkshopScene.jsx`: ilustraciones y reproducción de videos por personaje y resultado.
- `src/game/artwork.css`: composición del invernadero, selección de personaje y controles de video.
- `src/game/workshop.css`: interfaz adaptable y movimiento reducido.
- `src/game/rules.test.js`: pruebas del motor.

El prototipo v8 y su servicio Gemini se conservan en el repositorio, pero no forman parte del punto de entrada activo. Próximas decisiones: probar el ritmo con jugadores, profundizar encargos y preparar distribución para Windows. No se incluyen todavía instalador, sincronización en nube ni publicación en tiendas.

## Arte y videos del taller

La interfaz utiliza tres ilustraciones y cuatro clips seleccionados de la carpeta `Grimorio Herbal`. Las escenas del mago y de la herbolaria aparecen en el taller y en la cabecera; una tercera ilustración acompaña el grimorio. El selector de alquimista cambia la escena y los clips, sin modificar las reglas ni las recompensas.

Al conjurar se reproduce una animación de mezcla; si el encargo se completa, se reproduce la celebración del personaje. Los videos duran cinco segundos, no tienen audio y se cargan al activar una mezcla. Se pueden pausar, reanudar, repetir o desactivar. El resultado se calcula inmediatamente y el botón Ver resultado permite consultarlo sin esperar a que termine el video.

La preferencia de movimiento reducido del sistema muestra la ilustración estática. Si un video falla, la partida sigue disponible con su imagen de respaldo. El personaje y la preferencia de animación se guardan por separado del progreso.

Los originales se conservaron. Las copias de distribución están en `public/media`: imágenes WebP y video H.264 de 960 px de ancho, 24 fps y carga progresiva. Los siete recursos ocupan aproximadamente 5,3 MiB en total; solo se descarga el clip utilizado. `public/media/sources.json` relaciona cada archivo distribuido con su original.

## Taller herbal y cuaderno

El modo inicial es Taller libre: combina ingredientes con nombres comunes, registra una receta y anota un título, observaciones y el origen del conocimiento. Cada combinación nueva aporta 15 XP; no completa encargos automáticamente. Los seis encargos siguen disponibles en el modo Encargos mágicos.

Herbolario contiene 101 entradas con identidad o presentación, colección y estado de documentación. Incluye fichas con fuentes y entradas recuperadas pendientes de revisión; estas últimas no reciben propiedades medicinales inventadas. Bruma comenta el ingrediente seleccionado. Las porciones y técnicas son una simulación: no se calculan dosis, extracción, interacciones, eficacia ni seguridad para consumo. Una hipótesis escrita por el jugador no es un resultado experimental real.

Las notas se guardan con el progreso local. Se conservan los identificadores antiguos para migrar las partidas; `rocio` se muestra ahora como Agua potable. Borrar el progreso elimina también el cuaderno. Las fuentes se consultaron en septiembre de 2026; deben revisarse editorialmente al ampliar el catálogo.

## Próxima etapa: expediciones de recolección (pendiente)

El siguiente módulo será una salida corta al bosque o la montaña: recorrer el entorno, reconocer una planta con ayuda de la mascota y volver al taller con ingredientes. El inventario y los minijuegos aún no están implementados; actualmente la despensa es ilimitada. Se deben diseñar especies según hábitat, identificación, respeto al entorno y reconocimiento de las personas y comunidades que comparten sus saberes. No convertir la recolección de corteza o plantas protegidas en una recompensa indiscriminada.

## Recuperación del catálogo original

Se recuperaron las 121 entradas de las nueve listas de `src/data/ingredients.js`, incluidas todas las medicinales, tés, cocina, artesanales, bebidas y bases. Las repeticiones se unifican mediante `LEGACY_ALIASES`, conservando nombres alternativos para búsqueda. El catálogo final tiene 101 ingredientes y presentaciones: 90 tras integrar el catálogo anterior con el taller y 11 incorporaciones regionales. Incluye la ruda mencionada en el informe v7, aunque faltaba en la lista de código.

La ampliación incluye melisa, ortiga, ruda, salvia, tilo, uña de gato, sangre de grado, chanca piedra, hercampuri, maca y yacón. Las dos últimas se incluyen como referencias botánicas/alimentarias. No se presenta esta selección como un inventario exhaustivo de América Latina ni como las 103 especies del MINSAL.

El Herbolario y la despensa permiten buscar sin tildes y filtrar por colección regional, tipo de colección y, en la despensa, parte/presentación. Las regiones son colecciones editoriales, no afirmaciones de origen exclusivo. Las antiguas descripciones de propiedades de v8 no se importaron como evidencia. Los nombres botánicos heredados que aún no están contrastados llevan una indicación explícita.

`node scripts/export-catalog.mjs` regenera `public/catalogo-ingredientes.md`, descargable desde Herbolario, con la lista completa y una correspondencia de las 121 entradas originales. Las pruebas comprueban que todas son accesibles y que sus recetas se conservan al recargar.

## Panel visual de Bruma e informe técnico

Cada una de las 101 entradas dispone de una imagen local con fuente, autor y licencia. Son 89 archivos únicos, con lado mayor mínimo de 960 px y aproximadamente 28,84 MiB en total. Las variantes pueden compartir una referencia; las leyendas aclaran cuando se muestra la planta de origen o una presentación diferente.

«Explorar con Bruma» abre Reconocer, Usos y cuidados y Fuentes y créditos. Incluye ampliación de imagen y tres puntos de observación por ingrediente. Las casillas son una ayuda de lectura temporal; no certifican la identificación. Veinte entradas enlazan descripciones botánicas de NC State Extension; las demás guías son orientativas. Se mantienen las fichas medicinales pendientes sin inventar propiedades.

El informe completo está en [docs/Informe_Tecnico_Grimorio_Herbal.md](docs/Informe_Tecnico_Grimorio_Herbal.md), con versión [HTML imprimible](docs/Informe_Tecnico_Grimorio_Herbal.html). Incluye arquitectura, catálogo, persistencia, licencias, limitaciones, pruebas y etapas de distribución. Se regenera con `python scripts/render-technical-report.py`.

Los créditos están en `public/media/ingredients/CREDITOS.md` y `credits.json`. `npm test` ejecuta 27 pruebas, incluidas cobertura de imágenes, archivos locales y concordancia de créditos. Los scripts de recopilación requieren Python con Pillow y acceso a las API públicas de Wikimedia; conservan los nombres de archivo revisados. Cualquier cambio de imagen necesita revisión visual y editorial antes de publicar el manifiesto.
## Abrir con doble clic en Windows

Abre **Jugar Grimorio Herbal.cmd** en la carpeta principal. El lanzador prepara la compilación si falta o si hay cambios y abre el navegador predeterminado. Requiere Node.js y las dependencias del proyecto (`npm install` una vez si faltan).

El servidor se ejecuta en segundo plano, solo en `127.0.0.1:5173`. Volver a abrir el lanzador reutiliza el servidor. Se conserva esa dirección para mantener las partidas del navegador. Cerrar la pestaña no borra el progreso; el servidor permanece disponible hasta cerrar sesión o reiniciar Windows. Los registros de inicio se guardan en `.launcher`.

Para verificar el servidor del lanzador: `node --test scripts/serve-game.test.mjs` después de compilar el juego.


## Respaldar, importar e imprimir el cuaderno

La barra «Conserva tu cuaderno» permite exportar la partida en un JSON `grimorio-save/1`, revisar un archivo antes de importarlo e imprimir las recetas guardadas con sus observaciones y origen del conocimiento. Guarda las notas que estés editando antes de exportar o imprimir; los borradores sin guardar no se incluyen.

La importación admite archivos de hasta 5 MiB y valida estructura, recetas, progresión y notas antes de ofrecer «Reemplazar mi partida». Cancelar o elegir un archivo inválido conserva la partida actual. Se reutiliza `restore()` para normalizar datos; XP y semillas se recalculan. Si el navegador no puede guardar el reemplazo, la importación se detiene. No se incluyen preferencias visuales ni se combinan dos cuadernos.

El puerto ocupado no elimina los datos: estos permanecen en el navegador y origen anteriores. El lanzador mantiene el puerto 5173 y muestra un aviso para exportar desde la instancia anterior cuando no puede iniciarse. No cambia a otro puerto automáticamente.

Los originales de `Grimorio Herbal/` permanecen en disco y se excluyen de Git. El código histórico y sus dependencias se conservan fuera de la ruta activa; no se ha modificado ni leído `.env.local`. Esta entrega no amplía contenido medicinal ni incorpora PWA o minijuegos.


## Bruma con Gemini

Selecciona ingredientes en el taller y pulsa **Crear mezcla**. Bruma consulta automáticamente a Gemini e interpreta la pócima completa. Bruma enlaza las propiedades documentadas en una explicación cálida de la mezcla, con una sola nota final: «Esto es una simulación». Las fichas y sus fuentes quedan disponibles en un desplegable.

El lanzador y `npm run dev` sirven la conexión desde el servidor local. Configuración en `.env.gemini.local` (ignorado por Git):

```ini
GEMINI_API_KEY=tu_clave
GEMINI_MODEL=gemini-3.6-flash
```

No uses una variable `VITE_` para esta clave. Se lee en el servidor y no se incorpora al navegador. Se envían a Google la pregunta, la selección y sus fichas del catálogo; no se envían las notas ni el historial del cuaderno. Cada creación inicia una consulta independiente y puede consumir cuota o facturación del proveedor. Cambiar ingredientes o navegar entre secciones no inicia otra consulta. No hay reintentos automáticos. Sin conexión o cuota, las fichas locales siguen disponibles.

La integración usa [generateContent de Gemini](https://ai.google.dev/api/generate-content), respuestas JSON y un límite local de diez consultas por minuto, una simultánea y cincuenta y cinco segundos de espera. Prueba real satisfactoria el 13 de septiembre de 2026 con Gemini 3.6 Flash; Google rechazó 2.5 Flash para este acceso. El servicio Gemini del prototipo antiguo continúa inactivo.


## Jardín y expediciones

En **Jardín** hay tres bancales para matico, cedrón, lavanda, caléndula y romero. Siembra, riega, cuida la tierra y da luz para cosechar una unidad y ganar 25 XP. Son ciclos por acciones: no necesitas esperar horas ni dejar el juego abierto.

En **Explorar** puedes entrar al bosque o la montaña. Cada salida genera tres hallazgos en un mapa de 5 × 5, con doce pasos y pistas de proximidad. Solo puedes avanzar a una casilla vecina; volver por un camino también consume pasos. Cada hallazgo entrega una planta y 10 XP, con 30 XP extra por el primer descubrimiento de esa especie. Puedes volver al refugio conservando lo obtenido. La rareza y los lugares son reglas ficticias del juego.

La cesta permite abrir la ficha con sus créditos o llevar una planta al caldero. El catálogo del taller sigue disponible y la cesta es una colección acumulativa, sin gasto de unidades al preparar. Cultivos, cesta, experiencia y expedición activa se guardan y se incluyen en los respaldos. Los archivos antiguos comienzan con un jardín vacío sin perder sus recetas. Estos minijuegos son locales y no hacen consultas a Gemini.


La adaptación del plan v9 está en [docs/PROMPT_MAESTRO_Minijuegos_v9_Adaptado.md](docs/PROMPT_MAESTRO_Minijuegos_v9_Adaptado.md). Los hallazgos también desbloquean sus semillas de forma permanente para el jardín, incluidos los de partidas anteriores. Las vistas de naturaleza se cargan al abrirlas. El documento distingue esta integración de las fases pendientes de 3D, personaje 2D, procedencia y compost.


## Preguntar a Bruma

La sección **Preguntar** permite consultar al herbolario de IA sobre beneficios, propiedades, usos, reconocimiento y combinaciones. Se pueden añadir hasta cuatro plantas a la consulta; también se adjuntan las fichas de las plantas del catálogo nombradas en la pregunta. Se llega desde la navegación, desde «Preguntar a Bruma» en cada tarjeta o ficha del Herbolario y desde la interpretación de una pócima. «Llevar al caldero» carga las plantas de la consulta en el taller.

La ruta es `POST /api/bruma/ask` en `scripts/bruma-api.mjs`, con los mismos límites que la interpretación de pócimas. Las fichas con datos prevalecen; Bruma puede completar con conocimiento general distinguiendo tradición, estudios y falta de evidencia. No entrega dosis ni diagnósticos. Cada respuesta se marca como generada por IA. Se envían a Google la pregunta, las fichas y hasta seis turnos previos; el cuaderno no se envía. La conversación vive en memoria y no se guarda. Si el lanzador ya estaba abierto, hay que reiniciar su servidor para activar la ruta.

Autor: Francois Rojo. Las ilustraciones y videos del taller son creación propia del autor con OpenArt.


## Fichas documentadas (11 de noviembre de 2026)

94 de las 101 entradas tienen ahora una fuente enlazada (antes 30). Las fichas resumen lo que dice cada fuente, sin dosis: MINSAL (Medicamentos Herbarios Tradicionales), monografías de la EMA, NCCIH, FDA, OMS, IARC, NC State Extension, Purdue, SANBI, NIDDK y la extensión de la Universidad de Georgia. Vainilla y yuzu siguen como «Ficha por revisar». Cera de abejas, vinagre, leche de coco, jarabe y agua tónica tienen una descripción del taller sin fuente externa. Ocho fichas que eran solo referencia botánica (manzanilla, menta, llantén, melisa, ortiga, ruda, salvia y tilo) incorporan los usos tradicionales y precauciones del MINSAL y la EMA. Es verificación documental; falta la revisión por una persona competente. Las cifras «30 con fuente / 71 por revisar» de secciones anteriores y del informe técnico corresponden al corte de septiembre.


## Ambiente y animaciones

`src/game/immersion.css` reúne el movimiento del taller: luciérnagas y niebla de fondo (`Ambience.jsx`), paneo lento de las ilustraciones, entradas escalonadas de paneles y tarjetas, transición entre secciones, brillo del botón Crear mezcla, caída de las porciones al caldero y animación de Bruma (flota, parpadea, mueve la cola y se agita mientras piensa). Sobre la ilustración del caldero se dibujan brillo, fuego, vapor y chispas que aumentan con cada porción añadida, y un destello al crear la mezcla (dorado si se completa un encargo).

Todo es decorativo. El botón «Animaciones activadas» lo apaga junto con los videos, y la preferencia de movimiento reducido del sistema lo desactiva por completo. `src/game/sound.js` añade sonidos opcionales sintetizados con Web Audio (sin archivos): empiezan apagados y se activan con el botón «Sonido» de la cabecera; la preferencia se guarda en `gh_workshop_sound`.


## Más clips del taller

`python scripts/add-workshop-clips.py` convierte nueve clips adicionales de los originales de `Grimorio Herbal/` (mismo formato que los cuatro primeros) y los registra en `public/media/sources.json`. Ahora hay 13 clips, unos 15 MiB en total; solo se descarga el que se reproduce.

Cada personaje tiene tres clips de mezcla, dos o tres de celebración y uno de «ajuste», que se muestra en Encargos mágicos cuando la mezcla no cumple el encargo. `WorkshopScene.jsx` rota los clips de cada momento para que mezclas seguidas no repitan la misma animación.


## Bruma ilustrada

Bruma usa ahora el personaje del conjunto «Merlin» (gata negra de ojos ámbar con sombrero morado de estrellas), creado por el autor en OpenArt. `python scripts/prepare-bruma-media.py "<carpeta de originales>"` quita el fondo verde y genera en `public/media/bruma` seis retratos WebP transparentes, seis clips WebM con transparencia (VP9, 360 px) y un icono; unos 3 MiB en total, registrados en `sources.json`.

`src/game/Bruma.jsx` muestra el estado que corresponde: saluda al llegar, piensa mientras Gemini responde, se rodea de un aura al recibir la respuesta, descansa en calma y se duerme tras 90 segundos sin actividad. Aparece en el panel del taller, en la sección Preguntar y, como icono, en la ficha de cada planta. Con las animaciones desactivadas, con movimiento reducido o en Safari (que no reproduce la transparencia de estos clips) se muestran los retratos fijos. El clip de caminar está convertido pero aún sin uso. Sustituye al dibujo vectorial anterior.
