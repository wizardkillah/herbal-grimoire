# Informe técnico — Grimorio Herbal

**Fecha de corte:** 13 de septiembre de 2026.  
**Producto:** herbolario interactivo y taller experimental presentado como juego.  
**Alcance:** implementación local del repositorio; evaluación técnica y editorial.  
**Estado:** prototipo funcional para navegador, con distribución final pendiente.

## 1. Propósito y conclusión técnica

Grimorio Herbal conserva una ambientación mágica, pero utiliza nombres comunes de plantas e ingredientes reales. Su finalidad es consultar conocimientos herbales, registrar hipótesis y conservar recetas junto con su procedencia. Bruma es la guía de consulta. El taller permite combinar ingredientes virtuales; un modo opcional conserva los encargos y las recompensas del juego.

La arquitectura actual permite continuar desarrollándolo como aplicación web para PC sin abandonar la posibilidad de una aplicación instalable. El núcleo no necesita un modelo de IA para resolver combinaciones ni entregar recompensas. La prioridad técnica es completar y revisar el contenido, consolidar las fichas visuales y consolidar el respaldo de cuadernos ya implementado antes de añadir expediciones o una tienda de distribución.

La palabra «experimental» describe un espacio de exploración y registro. No existe una simulación química, farmacológica ni clínica: el programa no calcula dosis, concentración, extracción, interacciones, eficacia ni seguridad. Las fotografías y descripciones son recursos de consulta y comparación, no un sistema que certifique la identidad de una planta encontrada en terreno.

## 2. Alcance funcional

| Área | Comportamiento disponible |
|---|---|
| Taller libre | Selección repetible de ingredientes, elección de técnica, registro de combinaciones y XP por descubrimiento. |
| Encargos mágicos | Seis desafíos secuenciales con requisitos numéricos ficticios, pistas y recompensas. |
| Despensa | Catálogo integrado, búsqueda por nombre y alias, filtros por colección y parte o presentación. |
| Herbolario | Consulta de identidad, parte utilizada, estado documental, contenido educativo y fuentes. |
| Grimorio | Historial de recetas, recuperación de proporciones y técnica, notas editables y procedencia. |
| Bruma | Orientación contextual sobre ingredientes y pistas del modo mágico. |
| Ambientación | Dos personajes, ilustraciones del invernadero, animaciones de mezcla y celebración. |
| Persistencia | Partida y notas en el navegador; preferencias de personaje y animación separadas. |

No se incluyen todavía cuentas, servidor de recetas, sincronización entre dispositivos, inventario limitado, expediciones jugables, reconocimiento automático por cámara, multijugador, pagos ni instalador. Las plantas regionales forman colecciones editoriales: una etiqueta «Chile» no declara origen exclusivo ni condición de especie nativa.

## 3. Arquitectura y dependencias

El punto de entrada es `index.html`, que carga `src/main.jsx`. React monta `App`, y este componente monta el taller actual. Vite prepara el servidor de desarrollo y la compilación estática en `dist`. La interfaz y el motor se ejecutan en el navegador; no hay backend activo.

```text
index.html → main.jsx → App.jsx → Workshop.jsx
                                    ├─ rules.js → catalog.js / regional.js
                                    ├─ Herbarium.jsx → BrumaPanel.jsx
                                    │                  ├─ herbs.js / identification.js
                                    │                  └─ ingredient-images.json → public/media/ingredients
                                    ├─ WorkshopScene.jsx → public/media
                                    └─ localStorage: progreso, notas y preferencias
```

| Archivo o directorio | Responsabilidad |
|---|---|
| `src/game/Workshop.jsx` | Estado de interfaz, selección, navegación, registro, resultados y guardado. |
| `src/game/rules.js` | Ingredientes activos, técnicas, encargos, evaluación, economía, restauración y notas. |
| `src/game/catalog.js` | Integración del catálogo anterior, alias, búsqueda y colecciones. |
| `src/game/regional.js` | Incorporaciones regionales con referencias de procedencia. |
| `src/game/herbs.js` | Resúmenes educativos y estado de documentación. |
| `src/game/Herbarium.jsx` | Consulta del herbolario, filtros y editor de notas. |
| `src/game/BrumaPanel.jsx` | Diálogo de Bruma, pestañas, imágenes, ampliación y observaciones. |
| `src/game/identification.js` | Rasgos y orientación visual de las 101 entradas. |
| `src/game/ingredient-images.json` | Referencias visuales, dimensiones, fuente, licencia y atribución. |
| `src/game/catalog-assets.test.js` | Cobertura de fichas, archivos locales y coherencia de créditos. |
| `scripts/collect-ingredient-images.py` | Recuperación de imágenes y metadatos públicos; reutiliza la selección revisada. |
| `scripts/publish-ingredient-images.mjs` | Publicación del manifiesto y los créditos de imágenes. |
| `scripts/render-technical-report.py` | Generación del informe HTML imprimible desde Markdown. |
| `src/game/WorkshopScene.jsx` | Selección y reproducción de medios, preferencias de movimiento y respaldo. |
| `src/game/*.css` | Diseño adaptable, composición visual y estilos del taller y las fichas. |
| `src/game/rules.test.js` | Pruebas unitarias e invariantes de progresión y catálogo. |
| `scripts/export-catalog.mjs` | Generación del catálogo descargable y correspondencias históricas. |
| `public/media/sources.json` | Correspondencia entre medios del taller y originales aportados. |

El manifiesto declara React y React DOM `^19.2.5`, Vite `^5.3.1`, el complemento React `^4.3.1` y Phosphor Icons `^2.1.7`. Estos rangos no equivalen a una certificación de versiones actuales o de ausencia de vulnerabilidades; el archivo de bloqueo fija las versiones resueltas. También permanecen dependencias del prototipo anterior, entre ellas `@google/generative-ai`, que no forman parte del motor activo.

Se conservan `GrimorioHerbalV8.jsx`, `grimorio_herbal_v7.jsx` y módulos antiguos. No son la ruta ejecutada por `App`. Conviene inventariarlos como legado y retirarlos o archivarlos de manera explícita cuando se cierre la transición, evitando que un cambio de importación reactive accidentalmente otro modelo de datos o de seguridad.

## 4. Catálogo, identidad y evidencia

El catálogo contiene **101 ingredientes y presentaciones**. Se recuperaron 121 registros de las nueve listas originales, unificando repeticiones con `LEGACY_ALIASES`. La integración produjo 90 entradas y añadió 11 referencias regionales: melisa, ortiga, ruda, salvia, tilo, uña de gato, sangre de grado, chanca piedra, hercampuri, maca y yacón.

No son 101 especies medicinales diferentes: se incluyen preparados, tés, frutos, bases, bebidas e insumos artesanales. Varias presentaciones pueden proceder de la misma especie. Esta distinción evita inflar la cobertura botánica o atribuir propiedades de una planta a cualquier producto que la contenga.

Cada ingrediente activo tiene un identificador estable, nombre común, familia o presentación, color, puntos del juego, colección, alias y región editorial. Las fichas educativas actuales añaden nombre botánico o identidad pendiente, parte, categoría documental, resumen, precaución y referencia. Algunos campos se representan como posiciones de un arreglo; funciona para el prototipo, pero objetos con campos nombrados facilitarían validación y mantenimiento al crecer el contenido.

**Corte documental de las fichas educativas:** 30 entradas contienen un enlace de fuente y 71 están marcadas «Ficha por revisar». Tener una fuente no implica contar con una monografía clínica completa.

| Categoría de ficha | Cantidad |
|---|---:|
| Uso tradicional | 7 |
| Botánica y patrimonio | 1 |
| Uso alimentario | 5 |
| Evidencia específica | 1 |
| Composición estudiada | 1 |
| Base de preparación | 1 |
| Referencia botánica | 14 |
| Ficha por revisar | 71 |

El contenido distingue tradición, identidad botánica, composición y evidencia sobre preparados específicos. Los resúmenes del MINSAL, EMA y otras instituciones no validan mezclas del jugador. Los datos medicinales heredados del prototipo no se incorporaron automáticamente como evidencia. El identificador histórico `rocio` se mantiene por compatibilidad, pero se muestra como «Agua potable».

Para una edición pública se recomienda un flujo editorial por entrada: resolver especie y sinónimos; documentar parte y preparación; separar uso tradicional de evidencia clínica; registrar restricciones con referencia concreta; revisar identificación y confusiones; fechar la revisión; y aprobar la ficha por una persona competente. Los saberes comunitarios requieren atribución y permiso de publicación según su procedencia, especialmente cuando el conocimiento no sea público.

## 5. Panel detallado de Bruma y fotografías

Bruma abre un diálogo desde «Explorar con Bruma» en cada tarjeta y desde la ficha contextual del taller. Conserva nombre común, identidad botánica y parte utilizada, y organiza el contenido en tres pestañas: Reconocer, Usos y cuidados, y Fuentes y créditos. «Llevar al taller» devuelve el ingrediente a la selección existente.

La pestaña Reconocer presenta tres puntos por entrada. Veinte fichas incluyen rasgos resumidos de NC State Extension con su enlace; las otras 81 contienen guías de observación o de presentación expresamente orientativas. Son dimensiones editoriales distintas de las 30 fichas educativas con fuentes medicinales, alimentarias o botánicas. No se completaron propiedades pendientes por inferencia.

Las casillas permiten seguir la lectura y muestran el número de rasgos marcados. Son estado temporal del componente: se borran al cerrar y no generan una puntuación de identidad, diagnóstico, comestibilidad o seguridad. Las pestañas admiten flechas, Inicio y Fin; el diálogo nativo limita la interacción al panel, se cierra con Escape y devuelve el foco al control de apertura o a la tarjeta correspondiente.

El manifiesto visual cubre **101 de 101 entradas con 89 archivos únicos**: 88 fotografías y una lámina botánica de jengibre. Las variantes de agua, cítricos, bebidas y otras presentaciones pueden compartir referencia. Todos los archivos distribuidos tienen un lado mayor de al menos 960 píxeles, comprobado al decodificar los archivos locales; la mayoría se solicitó a 1280 píxeles de ancho. Ocupan 30.243.883 bytes, aproximadamente 28,84 MiB. No se ampliaron artificialmente imágenes pequeñas para cumplir esa medida.

Cada registro conserva ruta local, dimensiones reales, tamaño, autor, licencia, enlace al archivo de Commons, original, leyenda de presentación y fecha de revisión. Las licencias encontradas son CC BY, CC BY-SA, CC0 o dominio público; sus versiones se conservan por archivo. Las 89 imágenes fueron inspeccionadas en hojas de contacto, y se sustituyeron coincidencias incorrectas de las búsquedas antes de publicar el manifiesto.

La imagen del panel se muestra completa con `object-fit: contain`, permite ampliación y enlaza el original. Las tarjetas usan carga diferida. Si un archivo falla, aparece un mensaje y un acceso a su fuente. Las leyendas explican casos como agave en lugar de tequila, flor de yacón en lugar de raíz, planta de limón en lugar de jugo, o imagen genérica de agua sin temperatura verificable.

La calidad visual, la identidad taxonómica y la licencia son comprobaciones diferentes. El proveedor conserva descripciones aportadas por sus colaboradores; esta revisión visual no es una certificación taxonómica profesional. La fotografía de una planta tampoco verifica pureza, graduación o composición de un producto comercial. Para la edición pública queda pendiente ampliar vistas diagnósticas por especie, documentar confusiones específicas y realizar revisión botánica especializada.

## 6. Motor de combinaciones y economía

`evaluate` acepta ingredientes conocidos, una técnica válida y de una a tres porciones; la mejora permite cuatro. Se pueden repetir ingredientes. La clave de receta combina técnica y lista ordenada de identificadores: cambiar el orden no crea un descubrimiento nuevo, pero cambiar proporciones o técnica sí puede hacerlo.

Los ejes luz, calma, calor y vigor suman valores de ingredientes más un modificador de técnica y se limitan a un mínimo de cero. Solo expresan las reglas ficticias de los encargos. Infusionar suma dos de calma y resta uno de calor; macerar suma dos de luz y uno de calor; moler suma dos de vigor y resta uno de luz.

Una receta nueva aporta 15 XP. Cada encargo completado aporta 80 XP y 60 semillas una sola vez. Ampliar el caldero cuesta 100 semillas y se aplica una única vez. Los ingredientes son ilimitados; fallar no consume recursos ni penaliza. El modo libre registra recetas sin completar encargos. XP y semillas se calculan a partir de descubrimientos, encargos y mejora, en lugar de confiar en cifras arbitrarias guardadas.

La ampliación del catálogo asigna valores uniformes a muchos ingredientes incorporados. Esto permite utilizarlos en el taller, pero no representa un balance individual elaborado para los 101 registros. Es adecuado para el objetivo educativo actual; futuros encargos deberán evitar que la selección se perciba como una escala medicinal.

## 7. Persistencia y compatibilidad

La partida usa la clave `grimorio_workshop_v1`. Su estructura contiene versión, encargos completados, descubrimientos, mejora, número de intentos y notas por clave de receta. Las notas admiten título de 140 caracteres, observaciones de 2.000 y origen de 500. Se guardan solo para recetas existentes.

La restauración tolera JSON corrupto, rechaza versiones desconocidas, conserva el prefijo válido de encargos, descarta recetas inválidas, deduplica descubrimientos y recalcula sus claves. Una mejora solo se restaura cuando hay al menos dos encargos completados. Las partidas anteriores sin cuaderno reciben un cuaderno vacío; se conservan los identificadores para evitar perder recetas por cambios de nombre.

El almacenamiento pertenece al navegador y al origen, incluido el puerto. Cambiar de navegador o dirección no traslada la partida. Borrar los datos locales la elimina. La interfaz avisa cuando el navegador rechaza el guardado y pide confirmación antes de iniciar una nueva partida.

La barra «Conserva tu cuaderno» exporta archivos JSON con schema `grimorio-save/1`, fecha y estado normalizado. Importar valida el archivo completo antes de presentar una vista previa y exigir confirmación de reemplazo. Se rechazan recetas inválidas, duplicados, notas huérfanas, progresión incoherente y archivos mayores de 5 MiB. XP y semillas se recalculan con las reglas existentes. Un fallo de escritura en localStorage impide reemplazar el estado en memoria. El archivo descargable del catálogo sigue siendo un documento independiente del respaldo personal. `localStorage` es síncrono y tiene límites; un historial mucho mayor o fotografías personales justificaría IndexedDB y una política de tamaño.

## 8. Seguridad y privacidad

El taller activo no solicita cuentas. Bruma ofrece respuestas opcionales mediante Gemini; el motor que evalúa recetas y recompensas sigue siendo local. Las notas permanecen en el navegador según la implementación local. Las imágenes del catálogo se sirven desde el propio proyecto; abrir las fuentes, licencias u originales sí genera navegación hacia sus proveedores. No se consulta Wikimedia al abrir una ficha. La política final de privacidad deberá describir también el alojamiento que se elija.

Los textos del usuario se renderizan como texto React; no se interpreta HTML introducido en el cuaderno. Los límites de longitud y la validación de restauración protegen consistencia básica, pero no constituyen protección antifraude: quien controle su almacenamiento local puede alterar su partida. No se necesita un sistema antitrampas para un taller personal sin competición.

El servicio Gemini legado obtiene una variable `VITE_GEMINI_API_KEY`. No se inspeccionaron secretos durante este informe. Ese servicio no se ha reactivado. La nueva integración usa scripts/bruma-api.mjs en el servidor, con configuración separada y límites de uso; no incorpora la clave al frontend. Mantener el servicio fuera del punto de entrada activo evita depender de él para la jugabilidad actual.

No se realizó una auditoría formal de seguridad de dependencias, pruebas de penetración ni revisión jurídica. Antes de publicar deben revisarse encabezados HTTP, política de contenido, dependencias y tratamiento de datos según el alojamiento elegido. No existe hoy un servidor que reciba o respalde las notas.

## 9. Accesibilidad, interacción y medios

La interfaz usa botones y campos nativos, etiquetas de navegación, estados presionados, anuncios de estado y aviso de error de guardado. El resultado puede recibir foco. Las imágenes del taller tienen texto alternativo y los controles de reproducción permiten pausar, reanudar o repetir. La preferencia del sistema de movimiento reducido evita la animación de video.

Tres WebP y cuatro MP4 del taller ocupan aproximadamente 5,3 MiB. Los clips seleccionados son H.264, de cinco segundos, sin audio, con ancho de 960 píxeles y 24 fps. Se cargan al activar una mezcla. El cálculo del resultado es inmediato e independiente de la reproducción; ante error se conserva la ilustración de respaldo. Los archivos originales permanecen en la carpeta de materiales aportados.

La existencia de controles accesibles no equivale a conformidad WCAG certificada. Quedan por sistematizar navegación completa con teclado, lector de pantalla, contraste, ampliación de texto, recuperación del foco al abrir y cerrar paneles y comportamiento en ventanas estrechas. La carga de un catálogo visual requiere dimensiones reservadas, carga diferida y errores de imagen comprensibles para evitar saltos y paneles vacíos.

## 10. Pruebas y reproducibilidad

```sh
npm install
npm test
npm run build
npm run dev
```

`npm run preview` permite servir la compilación localmente. En un entorno de integración continua con archivo de bloqueo se recomienda `npm ci`. Vite configura el puerto 5173; el terminal informa la dirección efectiva si ese puerto está ocupado.

Las trece pruebas del motor existentes al inicio de esta ampliación verifican: invariancia al orden; efecto de proporciones y técnica; rechazo de entradas inválidas; recompensa única; solución alcanzable de los seis encargos; pistas de Bruma; coste y persistencia de la mejora; tolerancia a datos corruptos; separación del modo libre; migración de nombres y cuaderno; límites de notas; cobertura de los registros originales; búsqueda regional y alias; y marcado honesto de fichas pendientes. Algunas pruebas cubren varias condiciones en un mismo caso.

Las pruebas de reglas no verifican por sí mismas correspondencia de una foto con una especie, exactitud médica, funcionamiento de enlaces externos, contraste o comportamiento visual. Esas dimensiones necesitan revisión editorial y verificación de interfaz. El apartado 15 distingue los controles ejecutados en esta entrega de los pendientes.

## 11. Distribución: PC, PWA e instalador

La base web actual sirve para una primera versión enfocada en PC. Permite distribuir el mismo taller mediante navegador y mantener un único núcleo. La aplicación no es todavía una PWA: no incluye service worker que permita abrirla desde cero sin conexión ni un flujo de instalación validado. Que una partida ya cargada funcione sin solicitudes del motor no implica disponibilidad inicial offline.

La siguiente decisión puede tomarse por etapas: primero completar fichas y respaldo del cuaderno; luego desplegar una versión web estable con HTTPS; después añadir manifiesto, caché versionada, pruebas de actualización y almacenamiento offline; finalmente evaluar un contenedor de escritorio si se necesita instalador, acceso a archivos o distribución en tiendas. La selección concreta entre tecnologías de empaquetado requiere una evaluación posterior de requisitos y soporte vigente, no se da por implementada en este informe.

Una PWA puede satisfacer buena parte de la experiencia de una app personal. Un ejecutable añade obligaciones de firma, actualización y empaquetado que no mejoran automáticamente el contenido. El futuro modo de expediciones puede integrarse en la misma aplicación; no exige decidir un motor 3D ni migrar toda la interfaz antes de validar su jugabilidad.

## 12. Riesgos y trabajo pendiente

| Prioridad | Hallazgo | Acción y criterio de cierre |
|---|---|---|
| Alta | 71 fichas educativas pendientes al corte. | Revisar por especie y preparación; documentar uso, límites y referencia sin completar por inferencia. |
| Resuelto en esta entrega | Respaldo manual del cuaderno. | Exportación e importación versionadas, validación estricta y confirmación de reemplazo. El usuario debe conservar el archivo descargado. |
| Alta | Fotos y nombres pueden inducir identificación insuficiente. | Revisar correspondencia taxonómica, rasgos diagnósticos y confusiones; señalar referencias genéricas. |
| Alta | Derechos de medios con procedencias distintas. | Mantener atribuciones por recurso y resolver permisos de originales antes de distribución pública. |
| Media | Catálogo incluye bases artesanales y bebidas. | Hacer explícita la presentación y evitar que la disponibilidad en el caldero parezca una recomendación de ingesta. |
| Media | Aplicación sin estrategia de actualización offline. | Definir caché, migraciones, recuperación y pruebas de nueva versión antes de habilitar instalación. |
| Media | Componente principal concentra muchas responsabilidades. | Bruma ya está separado; separar despensa, resultados y cuaderno cuando la ampliación lo justifique. |
| Media | Pruebas de UI y auditoría accesible no sistematizadas. | Añadir recorridos de navegación, foco, filtros, carga fallida y persistencia en navegador. |
| Media | Código y dependencias legados. | Delimitar archivo histórico y dependencias activas; evitar reactivar el servicio anterior por accidente. |
| Posterior | Inventario y expediciones aún ausentes. | Prototipar una salida al bosque con observación, recolección virtual responsable y regreso al taller. |

El minijuego de recolección debe distinguir aprender a observar de recolectar indiscriminadamente. El respeto a hábitats, especies protegidas y saberes locales debe expresarse en sus reglas. No se han definido aún mapas, estaciones, disponibilidad por especie, costes de viaje ni economía de inventario.

## 13. Licencias y trazabilidad

`package.json` declara autoría de Francois Rojo y licencia ISC. No se encontró un archivo de licencia independiente en la raíz durante la inspección. Ese campo no resuelve automáticamente los derechos de fotografías externas, videos, ilustraciones ni fuentes documentales. Las licencias de dependencias son igualmente independientes.

`public/media/sources.json` identifica los originales del arte del taller; es un registro de procedencia, no un contrato de cesión. Para cada fotografía nueva se debe conservar el registro de fuente y atribución. Las referencias educativas deben citarse y resumirse con alcance específico, evitando copiar monografías completas o transformar una referencia botánica en una recomendación terapéutica.

## 14. Referencias técnicas y editoriales

La evidencia técnica del informe es el código y README del repositorio en la fecha de corte. Las referencias externas siguientes son ejemplos de fuentes ya enlazadas por las fichas; este informe no vuelve a certificar cada afirmación medicinal ni la disponibilidad futura de esos enlaces.

- [MINSAL — Medicinas complementarias](https://www.minsal.cl/medicinas-complementarias/).
- [EMA — Hoja de boldo](https://www.ema.europa.eu/en/medicines/herbal/boldi-folium).
- [EMA — Flores de caléndula](https://www.ema.europa.eu/en/medicines/herbal/calendulae-flos).
- [Museo Nacional de Historia Natural — El canelo](https://www.mnhn.gob.cl/noticias/arboles-urbanos-xiv-el-canelo).
- [INS Perú — Uña de gato en el jardín botánico](https://www.gob.pe/institucion/ins/noticias/748366-una-de-gato-florece-por-primera-vez-en-el-jardin-botanico-de-plantas-medicinales).

## 15. Validación de la entrega

| Comprobación | Resultado |
|---|---|
| `npm test` | 22 pruebas superadas: 13 del motor y catálogo, tres de imágenes/fichas, dos de importación/exportación y cuatro de la conexión Gemini. |
| Servidor del lanzador | Dos pruebas: servicio de archivos/rangos y rechazo de un puerto ocupado. |
| `npm run build` | Compilación correcta con Vite 5.4.21: JavaScript 383,05 kB (110,02 kB gzip), CSS 30,78 kB (7,79 kB gzip). Medios distribuidos por separado. |
| Cobertura visual | 101 entradas, sin archivos o atribuciones ausentes; créditos distribuidos idénticos al manifiesto de la interfaz. |
| Decodificación | 89 archivos legibles con dimensiones coincidentes y lado mayor mínimo de 960 px. |
| Revisión de interfaz | Diálogo, casilla, pestañas con ratón y teclado, ampliación, cierre, restauración de foco y regreso al taller comprobados en navegador. |
| Diseño adaptable | Vistas de 1440 × 1050 y 390 × 844 revisadas; sin desbordamiento horizontal de página o diálogo. |
| Consola del recorrido | Sin errores ni advertencias en la consulta realizada. |

La revisión de UI es un recorrido manual asistido, no una suite E2E automatizada ni una auditoría WCAG. No se modificó el cuaderno personal ni se registraron recetas de prueba en esta revisión. La versión HTML se revisó en navegador, incluida la portada y la estructura del índice. Se corrigió el contraste del botón de regreso al taller tras inspeccionar sus estilos efectivos.

## 16. Mantenimiento y reproducción

La instalación y ejecución siguen `npm install`, `npm run dev`, `npm test` y `npm run build`. La prueba de archivos requiere las imágenes incluidas en `public/media/ingredients`; no requiere red. La compilación copia esos medios a `dist`.

Para volver a obtener los medios, `python scripts/collect-ingredient-images.py` utiliza Python y Pillow y consulta las API públicas de Wikipedia/Commons. Prioriza los nombres de archivo del manifiesto revisado, conserva la caché en `.media-review/ingredients` y registra errores de proveedor sin atribuirles cobertura. Después se ejecuta `node scripts/publish-ingredient-images.mjs` y `npm test`. Una nueva selección exige revisar visualmente archivo, especie o presentación y licencia; el primer resultado de una búsqueda no se considera aprobación editorial.

Los créditos se distribuyen en `public/media/ingredients/CREDITOS.md` y `credits.json`. La versión JSON usada por React está en `src/game/ingredient-images.json`. El catálogo completo y las correspondencias históricas siguen disponibles en `public/catalogo-ingredientes.md`.

El informe fuente es este Markdown. `python scripts/render-technical-report.py` genera `docs/Informe_Tecnico_Grimorio_Herbal.html`, una versión autónoma con índice, tablas adaptables y estilos de impresión A4. El botón de impresión abre el diálogo del navegador; no se entrega un PDF prerenderizado.

## 17. Criterios para las siguientes etapas

| Etapa | Entregable | Criterio de aceptación |
|---|---|---|
| Edición herbal | Fichas revisadas por especie y preparación. | Cada afirmación tiene fuente y alcance; estados pendientes visibles; confusiones específicas documentadas. |
| Respaldo (implementado) | Exportación e importación versionadas del cuaderno. | Ida y vuelta sin pérdida de recetas/notas y rechazo de datos inválidos comprobados por pruebas. Vista previa y reemplazo explícito en interfaz. |
| Expedición piloto | Bosque o montaña con observación y regreso al taller. | Recorrido completo jugable, inventario virtual y reglas de recolección explícitas. |
| Instalación | PWA o contenedor de escritorio elegido según distribución. | Apertura, actualización y recuperación verificadas en plataformas objetivo. |

Salvo el respaldo indicado como implementado, estas etapas siguen pendientes.

## Referencias de identificación y medios

- [NC State Extension — Buddleja globosa](https://plants.ces.ncsu.edu/plants/buddleja-globosa/): ejemplo de fuente de rasgos botánicos. Cada una de las 20 fichas documentadas enlaza su página específica.
- [Wikimedia Commons — reutilización de contenido](https://commons.wikimedia.org/wiki/Commons:Reusing_content_outside_Wikimedia): contexto de atribución; prevalece la licencia indicada en cada archivo.
- [MediaWiki — tamaños comunes de miniaturas](https://www.mediawiki.org/wiki/Common_thumbnail_sizes/en): referencia del servicio de miniaturas empleado.

La entrega conserva la estética y la jugabilidad, amplía la consulta visual y deja trazabilidad del contenido. No equivale a aprobación clínica, clave taxonómica certificada ni inventario exhaustivo de la flora medicinal de Chile y Latinoamérica.


## 18. Mejoras seleccionadas del plan de evolución

Se aplicaron respaldo manual, impresión del cuaderno, mensajes de puerto ocupado, exclusión de originales multimedia en Git y actualización del nombre y descripción del paquete. Se conservan arquitectura, nombres, contenido educativo, arte y código histórico. No se hizo una limpieza destructiva ni se crearon commits sobre el conjunto de cambios previos.

`save-file.js` contiene validación y formato de intercambio; `BackupControls.jsx` proporciona descarga, selector y confirmación modal; `PrintableGrimorio.jsx` presenta títulos, técnicas virtuales, ingredientes, observaciones y origen. La impresión usa CSS A4 y oculta la interfaz del taller y los puntos ficticios. El pie aclara que las recetas son virtuales y no están validadas. Solo se imprimen notas guardadas, no borradores abiertos.

El servidor del lanzador rechaza puertos ocupados. Cambiar de puerto no borra físicamente una partida, pero cambia el origen desde el que se accede a localStorage; por eso no se habilitó un cambio automático. El lanzador recomienda exportar desde la instancia anterior si está disponible.

No se abordaron en esta entrega la migración del esquema editorial de fichas, nuevos lotes medicinales, reconocimiento como minijuego, PWA ni refactorización general. Esas propuestas se conservan como candidatas para etapas posteriores. La licencia y las dependencias históricas tampoco se cambiaron en esta selección.


### Verificación de respaldo e impresión (13 de septiembre)

Se probó la interfaz en un origen local de QA separado del lanzador, con un archivo sintético sin información personal. Se comprobaron vista previa, cancelación con Escape, importación confirmada, recuperación de título/observaciones/origen, persistencia tras recarga y rechazo de un JSON corrupto conservando la receta importada. Se corrigió el retorno del foco al botón Importar partida. La consola del recorrido no mostró errores.

El contenido destinado a impresión incluye ingredientes, técnica, notas y origen, sin ejes ficticios. El botón de impresión se ejecutó, pero el navegador integrado no expuso una vista de impresión verificable. Tampoco expuso el evento de descarga del respaldo, aunque la interfaz preparó el archivo sin errores y el formato exportado superó la prueba de ida y vuelta. Quedan pendientes la comprobación del archivo descargado y la salida impresa en el navegador predeterminado; no se afirma haber verificado papel o PDF final.


## 19. Bruma conectada a Gemini

Implementación del 13 de septiembre de 2026, autorizada como ampliación opcional del taller local. El botón Crear mezcla registra la receta e inicia automáticamente una interpretación de la pócima completa; no hay historial de conversación. Gemini 3.6 Flash respondió correctamente en una prueba real sobre matico. El modelo 2.5 Flash fue rechazado por el proveedor para este acceso, aunque aparecía en el listado de modelos.

### Arquitectura y datos

BrumaChat → POST /api/bruma → scripts/bruma-api.mjs → API generateContent de Google. El servidor reconstruye las fichas desde el catálogo confiable y rechaza ingredientes o métodos desconocidos. No utiliza propiedades médicas enviadas por el cliente ni los ejes ficticios de los encargos. Devuelve la respuesta generada y las fichas originales con sus fuentes, presentadas por separado.

La clave se guarda en .env.gemini.local, ignorado por Git, o en variables del proceso. No se utiliza VITE_GEMINI_API_KEY. Se transmite al proveedor en una cabecera, nunca en la URL. El servidor de distribución solo publica dist. El archivo antiguo .env.local no se modifica.

Al pulsar Crear mezcla se envían una solicitud de interpretación, los ingredientes creados y sus fichas a Google. No se envían notas ni historial del cuaderno; no se guardan conversaciones en el servidor. El usuario ve este flujo antes de consultar. El uso requiere internet y puede consumir cuota o facturación del proveedor. Las demás funciones locales siguen disponibles cuando falla la IA.

### Controles y límites

El servidor acepta el origen local, limita el cuerpo de la solicitud, valida la selección y permite una consulta simultánea y diez por minuto. Interrumpe la espera a los cincuenta y cinco segundos; no reintenta automáticamente. Presenta errores comprensibles para falta de configuración, acceso, modelo, cuota y respuesta incompleta, sin exponer mensajes internos ni claves.

Las instrucciones exigen distinguir usos tradicionales de evidencia y desconocimiento. Prohíben inventar propiedades para las 71 fichas pendientes, predecir eficacia o seguridad de mezclas, recomendar dosis o convertir puntos mágicos en efectos biológicos. La interfaz identifica las hipótesis como sin validar y muestra las propiedades y precauciones originales aparte. Estas instrucciones reducen riesgos, pero no garantizan exactitud: no existe validación clínica ni revisión automática exhaustiva de cada afirmación generada.

Cuatro pruebas de integración con proveedor simulado verifican contexto confiable, transporte de la clave sin devolución al cliente, rechazo de solicitudes inválidas y manejo de cuota o respuestas incompletas. La prueba real devolvió HTTP 200 y una respuesta completa sobre matico. Referencia de integración: [API generateContent](https://ai.google.dev/api/generate-content).


### Actualización del flujo de creación y mascota

La consulta parte del evento de creación, no de un efecto de montaje de React. El estado de Bruma vive en el taller y conserva la respuesta al navegar entre secciones. Cada solicitud captura la selección creada; cambiar luego el caldero no modifica la interpretación anterior. Crear queda deshabilitado mientras Bruma responde. Ante un fallo hay un reintento explícito que no vuelve a registrar la receta ni concede recompensas; la creación local no depende del proveedor. Restablecer o importar cancela la consulta pendiente. La interfaz muestra el envío a Google antes de crear.

La respuesta interpreta el perfil de la pócima en prosa y separa una hipótesis de efectos sin validar de los usos documentados. Las fichas por ingrediente quedan como respaldo desplegable. Bruma tiene una ilustración vectorial propia: gato negro de ojos verdes, sombrerito violeta con estrella y collar dorado, con nombre accesible. No añade descargas externas.


La verificación de interfaz en el origen de prueba 5180 confirmó que Crear mezcla muestra la interpretación automáticamente y que se conserva al ir al Grimorio y regresar. El proveedor simulado no modificó la partida principal. Una consulta real de la pócima Matico + Cedrón obtuvo HTTP 200 y respuesta completa tras ajustar el nivel de razonamiento de Gemini 3 a low y la espera máxima a 55 segundos. Este ajuste sigue la [documentación de razonamiento de Gemini](https://ai.google.dev/gemini-api/docs/generate-content/thinking). No se incorporan reintentos automáticos ni una garantía de latencia del proveedor.


### Revisión del tono de Bruma

Esta revisión sustituye el apartado visible de hipótesis y las advertencias genéricas repetidas de la versión anterior por una explicación de 90 a 160 palabras en dos párrafos. Recupera de src/services/gemini.js el tono sabio, cálido y ligeramente poético de las primeras personalidades, sin reactivar su servicio ni sus predicciones de dosis o sinergia. El contrato de respuesta ahora exige solo reply. La interfaz añade una vez «Esto es una simulación» al final y conserva las fichas con sus cuidados dentro de un desplegable.

Las afirmaciones siguen limitadas a las propiedades documentadas; no se inventan datos para fichas pendientes. Un peligro concreto pertinente puede mencionarse brevemente, sin convertir todas las respuestas en advertencias. La prueba real con matico y cedrón obtuvo HTTP 200, dos párrafos sobre sus usos tradicionales y ninguna advertencia genérica. Compilación y cuatro pruebas de integración superadas.


## 20. Jardín y expediciones jugables

Primera implementación de los minijuegos solicitados. Se añaden las secciones Jardín y Explorar a la navegación del taller, manteniendo su paleta verde, oro y tipografía. Las ilustraciones del crecimiento y los paisajes se dibujan localmente; la cesta reutiliza fotografías y créditos del catálogo.

### Reglas y recompensas

Tres bancales independientes permiten sembrar cinco especies del catálogo: matico, cedrón, lavanda, caléndula y romero. Cada ciclo requiere agua, tierra y luz en ese orden. Un cuidado incorrecto no hace avanzar ni castiga; la pista indica el siguiente paso. Cosechar una planta madura entrega una unidad y 25 XP, y libera el bancal. No hay temporizadores, compras ni consumo de semillas. El crecimiento es una representación simplificada de juego.

Bosque y montaña ofrecen mapas de 25 casillas, tres objetivos y doce movimientos ortogonales. Un generador con semilla conserva las posiciones durante toda la expedición, incluso al recargar. Las pistas cuentan objetivos sin recoger adyacentes a la posición actual. Cada hallazgo concede 10 XP; la primera vez que se encuentra esa especie concede 30 XP adicionales. Una casilla ya recogida no vuelve a dar recompensa. Se puede regresar al refugio en cualquier momento y conservar lo obtenido. Rareza y ubicaciones son ficticias, no información de distribución botánica ni un indicador de conservación.

La experiencia total suma recetas, encargos, cosechas y hallazgos. Los nuevos rangos de jardinero y herbolario aparecen a partir de 100 y 300 XP cuando no hay un rango de encargos superior. La moneda de los encargos conserva sus reglas anteriores. La cesta es acumulativa: Llevar al taller carga una planta, sin consumirla ni restringir el catálogo experimental.

### Persistencia e integración

nature.js contiene las transiciones puras, generación del mapa y recuperación del estado. NatureGames.jsx implementa la interfaz accesible mediante botones, nombres de casillas y avisos de estado; nature.css adapta los paneles a móvil y PC. rules.js incorpora nature a la partida existente sin cambiar la clave de almacenamiento. Los respaldos validan y conservan bancales, contadores, cesta, rarezas y recorrido activo. Los respaldos anteriores sin nature se migran a un jardín vacío. La importación anuncia también las cosechas y hallazgos incluidos.

No se envían datos a Gemini por cultivar o explorar. La generación de una pócima en el taller conserva su consulta ya implementada.

### Verificación

26 pruebas automatizadas superadas: cuatro nuevas cubren orden de cuidados, cosecha sin duplicación, movimiento válido, pasos y recompensas de expedición, persistencia de las actividades, compatibilidad de respaldos y mapas con objetivos distintos. Las dos pruebas adicionales del servidor también se ejecutan aparte. Compilación de producción superada.

En una partida de prueba separada (puerto 5180) se completó una cosecha de matico con 25 XP, se encontró canelo en la montaña con 40 XP iniciales y se comprobó que recargar conserva posición y pasos. Se revisaron los bancales en PC y la navegación en vista estrecha. La partida del puerto principal no se utilizó para estas pruebas.
