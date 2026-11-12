# Grimorio Herbal · Plan maestro de minijuegos v9 adaptado

Este documento adapta PROMPT_MAESTRO_Minijuegos_Grimorio_v9.md al proyecto activo. Sustituye sus referencias técnicas a v8; no es una declaración de que todas las fases estén implementadas.

## 1. Base real que se conserva

Grimorio Herbal es un taller experimental educativo con recetas, fichas documentadas y una ambientación de juego. El catálogo permanece disponible sin bloquear la experimentación detrás de cosechas o temporizadores.

| Responsabilidad | Fuente actual |
|---|---|
| Entrada | src/App.jsx → src/game/Workshop.jsx |
| Motor, recetas y experiencia | src/game/rules.js |
| Catálogo único | INGREDIENTS, compuesto desde catalog.js y regional.js |
| Propiedades y fuentes | src/game/herbs.js |
| Imágenes y licencias | ingredient-images.json y public/media/ingredients/ |
| Reglas de naturaleza | src/game/nature.js |
| Jardín y expediciones actuales | src/game/NatureGames.jsx y nature.css |
| Respaldo e importación | src/game/save-file.js y BackupControls.jsx |
| Respuesta de Bruma | BrumaChat.jsx y scripts/bruma-api.mjs |
| Distribución local | Jugar Grimorio Herbal.cmd y scripts/serve-game.mjs |

La aplicación usa React 19 y Vite, estilos CSS propios y almacenamiento local. Firebase, Cloud Run, TWA, Tailwind y Framer Motion no son requisitos ni infraestructura activa de esta adaptación. Los módulos v8 siguen siendo legado; no se reconectan sus sistemas de XP o Gemini.

Los ingredientes actuales tienen id, name, family, color y stats de juego. Las propiedades medicinales pertenecen a HERBS, no a stats. No duplicar nombres o inventar especies para rellenar un mapa.

## 2. Contrato de integración adaptado

Workshop conserva la propiedad de la partida. Las vistas de minijuegos reciben estado y acciones; las mutaciones pasan por funciones puras. No crear una segunda cuenta de experiencia o un almacenamiento paralelo que pueda contradecir los respaldos.

Contrato actual de NatureGames: mode, state, setState, onOpenHerb y onUse. natureAction valida si una acción es posible; natureXP deriva la experiencia; restoreNature recupera datos compatibles. Llevar al taller carga un ingrediente sin consultar a Gemini. Solo Crear mezcla inicia la interpretación de Bruma.

Para vistas futuras más complejas, añadir src/game/nature/ con greenhouse/, trail/ y ui/. Conservar nature.js como fachada de reglas mientras se extraen módulos. La nueva escena y el motor nunca importan Workshop. No imponer el gameBridge de v8 ni llamar a useXP.js legado.

Los archivos autorizados por esta adaptación incluyen Workshop, rules, nature, save-file, BackupControls, sus pruebas, nuevas vistas, estilos, documentación, package.json y configuración si resulta necesaria. La lista cerrada del documento original no sirve para esta arquitectura.

## 3. Guardado y compatibilidad

Conservar grimorio_workshop_v1 y el formato de respaldo grimorio-save/1 mientras los cambios sean aditivos y tengan migración. La propiedad nature guarda bancales, cosechas, hallazgos, colección, rarezas y expedición activa. No crear gh9_inventory/gh9_garden/gh9_trail como copias de datos existentes.

Antes de incorporar procedencia, salud, tiempo o compost, definir una versión interna nature.schemaVersion, migrar el estado actual y ampliar la validación estricta del respaldo. Nunca descartar una partida compatible por agregar un campo. Los datos corruptos del módulo se recuperan sin borrar recetas ni notas. Una importación inválida debe rechazarse antes de reemplazar la partida.

Las futuras fechas serán epoch ms UTC. Calcular crecimiento a partir de diferencias de tiempo, con avance negativo limitado a cero. Esto evita fallos de reloj; no constituye protección contra trampas. Un juego local editable no puede garantizar un bloqueo resistente a manipular localStorage.

## 4. Bucle y economía

Explorar → descubrir plantas y semillas → cultivar → guardar cosechas → preparar en el taller → obtener restos para compost.

**Implementado ahora:** cinco semillas iniciales gratuitas; encontrar una especie en una expedición desbloquea su cultivo de forma permanente. Los hallazgos anteriores también cuentan. La cesta conserva unidades acumuladas y permite abrir la ficha o cargar una planta en el caldero.

**Experiencia actual:** 25 XP por cosecha; 10 XP por hallazgo; 30 XP adicionales por primera especie encontrada; las recetas y los encargos mantienen sus recompensas existentes. No se vuelve a premiar una casilla ya recogida. No se altera el saldo de semillas de los encargos.

**Ampliación prevista:** registrar lotes y procedencia como cultivada o recolectada, además de un nivel de cuidado independiente. Silvestre no debe significar automáticamente mejor calidad, mayor eficacia ni cosecha de invernadero excelente. La migración conservará unidades antiguas como procedencia no registrada. Los bonos, si se incorporan, serán experiencia lúdica y nunca potencia medicinal.

Mantener el catálogo libre. No introducir compra de energía, muro de pago ni obligación de volver a una hora. Antes de añadir consumo de lotes, definir el comportamiento de recetas repetidas y la transacción conjunta de receta, inventario y compost.

## 5. Jardín: evolución hacia el invernadero

### Base jugable actual

Tres bancales, cinco semillas iniciales y especies adicionales desbloqueadas al explorar. Crecimiento por tres cuidados ordenados: agua, tierra y luz. Sin espera real ni muerte de plantas. Es una abstracción de juego, no una guía agronómica.

### Próxima versión espacial

Un invernadero del norte chico, con hierro verde envejecido, greda, madera y luz dorada. Primero presentar estaciones seleccionables: bancales, mesa de semillas, cesta, compostera y salida. Mantener controles DOM equivalentes para teclado, lector de pantalla y dispositivos sin WebGL.

El 3D recorrible es una fase posterior, cargada dinámicamente. Evaluar three y React Three Fiber con sus versiones compatibles antes de instalarlos. Usar instancias para objetos repetidos, iluminación sencilla, DPR limitado y ausencia de postprocesado. Evitar un store adicional hasta demostrar que la escena lo necesita; animación de alta frecuencia en referencias, no estado React por fotograma.

Movimiento con WASD y controles táctiles; navegación directa a estaciones como alternativa. No capturar el puntero automáticamente. Escape devuelve el control. Colisiones sencillas con mesas y paredes. Movimiento reducido elimina inercia y transiciones; la vista por estaciones siempre funciona.

### Cultivo con tiempo y compost

Añadirlo como modalidad pausada opcional, conservando el ciclo rápido actual. No convertir las plantas existentes a horas de espera sin una migración explícita. Evitar muerte por ausencia en la primera entrega. Los tiempos y parámetros se etiquetan como equilibrio del juego; las preferencias reales de especies requieren fuentes revisadas.

La propuesta de 4 h, 12 h y 24 h se tratará como duraciones de etapas, no umbrales ambiguos. Fijar el total y su prueba antes de programar. No mostrar floración idéntica como identificación botánica para todas las especies.

Compost: crear restos únicamente cuando la receta se registra con éxito en el motor local, independientemente de Gemini. Determinar conversión, límites y recompensas sin permitir duplicación por reintentos de IA. La primera versión puede ser por acciones; si se añade espera de ocho horas, debe compartir la misma política de reloj y recuperación.

## 6. Expediciones: evolución hacia La Senda

### Base jugable actual

Bosque y montaña, mapa de 5 × 5, doce pasos, tres objetivos y pistas de proximidad. Recorrido y semilla del mapa persistentes. Se conservan hallazgos al regresar. La rareza y las ubicaciones son ficticias.

### Próxima versión con personaje

Construir primero una única pantalla Canvas 2D con sendero, colisiones, un personaje y nodos. Sin combate y sin motor externo. Controles de dirección táctiles, flechas/WASD y alternativa accesible por estaciones o casillas. Pausar al perder foco y cancelar el bucle al desmontar.

Paso fijo con límite de actualizaciones acumuladas para evitar bloqueo después de suspender la pestaña. Recursos por atlas y sin interpolación. La resolución propuesta de 480 × 270 no cabe a escala entera en todos los móviles verticales: adaptar la resolución lógica o permitir reducción controlada. No prometer simultáneamente escala entera invariable y ajuste a cualquier ancho.

Añadir luego pantallas conectadas y un corte de precisión. Este concede calidad lúdica, no calidad medicinal. Dar una alternativa sin exigencia temporal cuando el jugador lo prefiera; movimiento reducido por sí solo no resuelve la accesibilidad de una barra rápida.

Los nodos pueden recuperar disponibilidad por timestamp en una modalidad pausada. El modo rápido mantiene salidas repetibles. No introducir simultáneamente energía de 25 minutos, respawn de doce horas y semillas aleatorias escasas antes de probar el ritmo. El primer desbloqueo de semillas sigue siendo garantizado para conectar ambos minijuegos.

### Biomas y contenido

Dirección artística: quebrada seca del Limarí, bosque húmedo, altura y costa. Las zonas nuevas se construyen una a una; empezar con una pantalla completa antes de producir ocho mapas. No inferir que una planta crece en un bioma solo por su etiqueta regional. Localización real y textos culturales requieren revisión y fuentes; el mapa ficticio puede usarse mientras tanto.

No se incorpora un Camino Oscuro ni verificación de edad como dependencia de estos minijuegos. La actividad actual se centra en plantas. El sistema de nivel 5 y doce mascotas del documento original no está activo. La noche, clima, audio y editor de mapas quedan para fases posteriores con alcance propio.

## 7. Bruma y contenido

Conservar el gato negro con sombrerito y su voz natural. La explicación de la pócima integra usos documentados en dos párrafos y termina con la nota de simulación de la interfaz. No restaurar scores de eficacia, dosificación, tiempos de efecto o sinergia clínica del prototipo.

La futura procedencia que reciba Gemini debe venir del estado validado; no inventar una recolección al amanecer o en una quebrada que el jugador no visitó. Cultivar, caminar, cosechar y consultar fichas locales no llaman a Gemini.

## 8. Rendimiento, acceso y recursos

La interfaz de naturaleza ya se carga con React.lazy y Suspense. Es un único módulo compartido por las dos vistas actuales; las futuras escenas 3D y 2D tendrán entradas separadas. No añadir manualChunks sin medir que sea necesario.

Objetivos iniciales del documento: aumento de entrada ≤5 KB gzip frente a una base medida, 3D ≤350 KB gzip y 2D ≤120 KB gzip sin assets. Son presupuestos a validar, no resultados obtenidos. Registrar también los chunks compartidos y CSS para no esconder dependencias en otro nombre.

No se declara ningún FPS o tiempo 4G sin medición en el dispositivo correspondiente. Los límites de geometría y draw calls aplican cuando exista la escena 3D, no a los paneles actuales. Revisar memoria al entrar y salir veinte veces.

Nuevos iconos: SVG coherentes. Sustituir los símbolos tipográficos del prototipo de naturaleza durante la revisión visual; no introducir emojis nuevos. Contraste AA, foco visible, controles táctiles de al menos 44 px cuando sea viable, texto sobre placas legibles y estados de carga/error recuperables. Respetar movimiento reducido y audio apagado inicialmente.

El juego local funciona servido por el launcher sin red, salvo las consultas a Gemini y enlaces externos. Esto no equivale a una PWA instalable sin servidor: service worker, instalación y sincronización requieren fases y pruebas aparte. No agregar Firebase ni telemetría B2B de forma implícita.

## 9. Orden de entrega adaptado

| Fase | Entrega comprobable | Estado |
|---|---|---|
| A | Mantener reglas actuales, migración y respaldo; carga diferida; semillas desde hallazgos | Implementada en esta adaptación |
| B | Procedencia y cuidado de lotes, migración e inventario transaccional; compost por receta | Pendiente |
| C | Jardín espacial por estaciones con controles accesibles | Pendiente |
| D | Escena 3D opcional con navegación, colisiones y medición de recursos | Pendiente |
| E | Cultivo pausado opcional con tiempo, riego y compost | Pendiente |
| F | Una pantalla 2D con personaje, colisión, recolección y alternativa accesible | Pendiente |
| G | Corte, pantallas conectadas, puntos de interés y nuevas zonas revisadas | Pendiente |
| H | Perfilado real, pulido, documentación y decisión sobre distribución instalable | Pendiente |

Cada fase debe conservar las recetas antiguas, pasar las pruebas pertinentes y ser jugable antes de ampliar el alcance. Esta adaptación no da por entregados el 3D, Canvas, clima, audio o sincronización.

## 10. Pruebas de aceptación de la adaptación actual

- Un respaldo anterior mantiene recetas, XP y cultivos.
- Encontrar una planta desbloquea su semilla, incluso si el hallazgo es anterior a esta actualización.
- Una planta sin semilla desbloqueada no se puede sembrar mediante la transición del motor.
- El cultivo desbloqueado se conserva al exportar, importar y recargar.
- El taller carga sin descargar la vista de naturaleza hasta abrirla.
- No cambian las llamadas a Gemini ni las recompensas anteriores.
- Registrar pesos reales del build; no sustituir mediciones por los objetivos del documento.


### Mediciones de esta entrega

Build de producción: entrada JS 113,53 KB gzip (antes: 116,16 KB), módulo NatureGames 3,29 KB gzip y CSS del módulo 1,39 KB gzip. La separación es de las vistas actuales, no una medición de los motores futuros. 27 pruebas del conjunto más dos del servidor; el nuevo caso verifica semilla de un hallazgo anterior, cultivo y respaldo sin pérdida. No se midieron FPS en Android ni carga sobre 4G.
