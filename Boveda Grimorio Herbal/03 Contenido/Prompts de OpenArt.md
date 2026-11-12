---
tags: [contenido, arte]
---
# Prompts de OpenArt para nuevos clips

Guía para generar animaciones nuevas con el mismo estilo del mago y la herbolaria. Los prompts van en inglés porque los modelos de imagen y video responden mejor así; las notas van en español.

## Cómo usar esta guía

1. **Clips del taller (sección A):** usa *imagen a video* y sube como primer fotograma la ilustración que ya tiene el juego. Así el clip empieza exactamente en la imagen fija y la transición no se nota. Es lo que hacen los 13 clips actuales.
   - Mago: `Grimorio Herbal/openart-gpt-image-2-edit-1_1778358181100_d6b75d44.png`
   - Herbolaria: `Grimorio Herbal/openart-gpt-image-2-edit-1_1778358386956_87724fd0.png`
2. **Escenas nuevas (secciones B a E):** primero genera la ilustración fija con el prompt de imagen. Sube una de las dos ilustraciones actuales como **referencia de estilo** para que salga igual. Después anima esa ilustración con los prompts de video.
3. Guarda cada resultado en `Grimorio Herbal/` y dime el nombre de archivo que le corresponde en la tabla; yo lo convierto y lo conecto al juego.

## Ajustes para todos los clips

| Ajuste | Valor |
|---|---|
| Proporción | 4:3 (igual que las ilustraciones, 1344 × 1008) |
| Duración | 5 segundos |
| Audio | Sin audio |
| Cámara | Fija, sin zoom ni paneo |
| Primer fotograma | La ilustración fija, sin cambios |

Añade siempre este bloque al final de cada prompt de **video**:

```text
Static locked camera, no zoom, no pan, no cuts. Keep the character's face, clothing and proportions exactly as in the first frame. Keep the dark-outlined illustrated fantasy style, rich emerald greens and warm candle gold. Smooth, gentle motion. No text, no captions, no watermark.
```

Y este bloque de estilo al final de cada prompt de **imagen**:

```text
Detailed digital fantasy illustration with clean dark outlines, storybook game-art style, rich emerald green palette with warm golden candlelight and glowing green magic, gothic iron-and-glass greenhouse at night, lush hanging herbs, lavender and potted plants, soft volumetric mist, highly detailed, 4:3 aspect ratio. No text, no letters, no watermark.
```

Prompt negativo, si el modelo lo admite:

```text
camera movement, zoom, morphing face, extra fingers, extra limbs, deformed hands, text, letters, watermark, logo, photorealistic, 3d render, blurry, flicker, scene change
```

## A. El taller (imagen a video sobre las ilustraciones actuales)

Genera cada clip dos veces: una con la ilustración del mago y otra con la de la herbolaria. En los prompts, cambia `the wizard` por `the herbalist` y `his` por `her`.

### A1. Calma — reemplaza la imagen fija mientras no pasa nada

Archivo: `mago-calma.mp4`, `herbolaria-calma.mp4`. **Debe poder repetirse en bucle**: pide que el último fotograma sea igual al primero.

```text
The wizard stands calmly beside the cauldron, breathing slowly and blinking. Green steam drifts lazily up from the cauldron, candle flames flicker, a few tiny glowing motes float through the air, hanging plants sway very slightly. The small creature on his shoulder turns its head once. Nothing else changes. Seamless loop: the last frame matches the first frame.
```

Para la herbolaria, sustituye la criatura por: `The hummingbird beside her hovers in place with fast wings.`

### A2. Añadir un ingrediente

Archivo: `mago-anadir.mp4`, `herbolaria-anadir.mp4`.

```text
The wizard takes a small bunch of fresh green leaves from his belt pouch and drops them into the cauldron. The surface ripples, a soft green sparkle rises where the leaves land, and the steam briefly brightens. He lowers his hand and returns to his starting pose.
```

### A3. Infusionar

Archivo: `mago-infusion.mp4`, `herbolaria-infusion.mp4`.

```text
The wizard lifts a steaming copper kettle and pours a thin stream of hot water into the cauldron. Pale green vapor blooms upward in soft curls, dried leaves and flower petals swirl on the surface, and the glow of the cauldron turns a gentle golden green.
```

### A4. Macerar

Archivo: `mago-macerar.mp4`, `herbolaria-macerar.mp4`.

```text
The wizard lowers a large glass jar filled with herbs into view, pours amber liquid over them and seals it with a cork. Inside the jar the herbs drift slowly as the liquid deepens in color, tiny bubbles rise, and a warm amber light pulses softly through the glass.
```

### A5. Moler

Archivo: `mago-moler.mp4`, `herbolaria-moler.mp4`.

```text
The wizard grinds dried herbs in a stone mortar with a pestle, using slow circular motions. Fine green powder and tiny glowing dust rise from the mortar with each turn. He tips the powder into the cauldron and it flares with a short burst of bright green sparks.
```

La herbolaria ya sostiene un mortero en su ilustración: empieza el prompt con `The herbalist grinds the herbs in the stone mortar she is holding`.

### A6. Fórmula nueva en el grimorio

Archivo: `mago-descubrimiento.mp4`, `herbolaria-descubrimiento.mp4`.

```text
A ribbon of golden light rises from the cauldron and curls through the air toward the open book in the lower right corner. The pages of the book flutter, glowing golden handwriting and a small plant drawing appear on the page, and the book settles open, softly shining. The wizard watches and nods with a slight smile.
```

En la ilustración de la herbolaria no hay libro abierto. Usa: `...curls through the air and forms a small floating page of glowing golden handwriting above her open hand, then gently fades into sparkles.`

### A7. Consultar a Bruma

Archivo: `mago-consulta.mp4`, `herbolaria-consulta.mp4`.

```text
A small black cat with bright green eyes, wearing a tiny violet wizard hat with a golden star, hops onto the rim of the stone hearth beside the cauldron and looks up at the wizard. The wizard turns his head toward the cat and listens. The cat's tail sways, its eyes glow softly, and a few golden sparkles drift around its hat.
```

## B. Bruma

> **Actualización:** Bruma ya tiene retratos y clips propios, tomados del conjunto «Merlin» (gata negra con sombrero morado de estrellas). Esta sección solo hace falta si quieres poses nuevas; en ese caso usa uno de esos retratos como referencia y pide fondo verde liso para poder recortarlo.

### B1. Retrato de Bruma (imagen)

Archivo: `bruma.webp`. Sirve para la sección Preguntar y para reemplazar el dibujo vectorial actual.

```text
A small black cat with large bright green eyes sitting upright on a wooden workbench, wearing a tiny violet pointed wizard hat with a golden band and a golden star, and a golden collar with a round pendant. Around the cat: open herbal book, glass jars of dried herbs, a mortar, a lit candle, sprigs of lavender. The cat looks directly at the viewer with a wise, friendly expression.
```

Añade el bloque de estilo.

### B2. Bruma en calma (video, bucle)

Archivo: `bruma-calma.mp4`.

```text
The black cat sits still, blinks slowly, and its tail sways gently from side to side. The candle flame flickers and a few golden motes drift past. The star on its hat twinkles once. Seamless loop: the last frame matches the first frame.
```

### B3. Bruma piensa

Archivo: `bruma-piensa.mp4`.

```text
The black cat tilts its head, looks down at the open herbal book and places one paw on the page. The pages turn by themselves, faint green glowing symbols rise from the book and circle slowly around the cat's hat. The cat's eyes glow a little brighter.
```

### B4. Bruma responde

Archivo: `bruma-responde.mp4`.

```text
The black cat looks up at the viewer, raises one paw, and a small glowing green leaf appears floating above it, turning slowly. Golden sparkles spread outward from the leaf. The cat gives a slow, satisfied blink.
```

## C. El jardín

### C1. Invernadero con bancales (imagen)

Archivo: `jardin.webp`.

```text
Interior of a gothic iron-and-glass greenhouse at dusk, seen from the front. Three long raised wooden planting beds filled with dark soil in the foreground, clay pots, a watering can, a small wooden table with seed packets and a woven basket. Climbing vines on the iron arches, hanging lanterns with warm light, moonlight through the glass roof. No people.
```

Añade el bloque de estilo.

### C2. Sembrar, regar y cosechar (videos)

Archivos: `jardin-sembrar.mp4`, `jardin-regar.mp4`, `jardin-luz.mp4`, `jardin-cosechar.mp4`.

```text
Small seeds fall onto the dark soil of the middle planting bed and sink in. A soft green glow spreads through the soil and a tiny sprout with two leaves pushes up and unfolds.
```

```text
The watering can tilts by itself and a gentle shower of water falls over the middle planting bed. Droplets sparkle in the lantern light and the small plants in the bed straighten and grow slightly taller.
```

```text
A beam of warm golden light descends through the glass roof onto the middle planting bed. The plants turn their leaves toward the light, grow fuller, and small flower buds open one by one.
```

```text
The full-grown plants in the middle planting bed glow softly. Several leafy stems lift gently into the air, tie themselves into a small bundle with twine, and float down into the woven basket on the table, leaving a trail of green sparkles.
```

## D. Explorar

### D1. Bosque (imagen)

Archivo: `bosque.webp`.

```text
A narrow path through a dense, humid temperate rainforest in southern Chile at twilight. Tall mossy trees, giant ferns, hanging lichen, fallen logs, small glowing mushrooms, shafts of misty moonlight, fireflies. A few medicinal plants with small flowers beside the path. No people.
```

### D2. Montaña (imagen)

Archivo: `montana.webp`.

```text
A rocky Andean mountain trail at dusk in the Chilean cordillera. Low hardy shrubs with small yellow flowers among stones, tufts of dry grass, a distant snowy peak, a clear sky with the first stars, cold mist in the valley below, warm last light on the rocks. No people.
```

Añade el bloque de estilo a ambas, pero quita la frase `gothic iron-and-glass greenhouse at night` y `lush hanging herbs, lavender and potted plants`.

### D3. Ambiente y hallazgo (videos, uno por paisaje)

Archivos: `bosque-calma.mp4`, `montana-calma.mp4` (bucle) y `bosque-hallazgo.mp4`, `montana-hallazgo.mp4`.

```text
Mist drifts slowly between the trees, fern fronds sway gently, fireflies float and blink, and a single leaf falls. Seamless loop: the last frame matches the first frame.
```

```text
One plant beside the path begins to glow with a soft green light. Its leaves lift slightly, golden sparkles rise from it in a slow spiral, and the glow pulses twice before settling into a steady shine.
```

Para la montaña, cambia la primera por: `Cold mist moves slowly across the valley, dry grass bends in the wind, stars twinkle, and a small bird crosses the sky.`

## E. Herbolario y grimorio

### E1. Gabinete del herbolario (imagen)

Archivo: `herbolario.webp`.

```text
A tall antique wooden apothecary cabinet inside the greenhouse, with dozens of small labelled drawers, shelves of glass jars filled with dried herbs, flowers and roots, bundles of herbs hanging to dry above, a brass magnifying glass and pressed plant specimens on the counter, candles on both sides. No people.
```

### E2. El gabinete se abre (video)

Archivo: `herbolario-abrir.mp4`.

```text
Several small drawers of the apothecary cabinet slide open one after another. From each drawer a dried leaf, a flower or a root rises and floats in the air, glowing softly, then they arrange themselves in a neat row above the counter.
```

### E3. Grimorio (imagen y video)

La ilustración actual del Grimorio (`guardian.webp`) es fotorrealista y no coincide con el estilo del mago y la herbolaria. Si quieres unificar, genera esta:

Archivo: `grimorio.webp`.

```text
A large ancient leather-bound herbal grimoire lying open on a wooden lectern inside the greenhouse. Hand-drawn botanical illustrations and handwritten recipes on the parchment pages, a quill and inkwell, pressed leaves between the pages, a ribbon bookmark, candles and small potion bottles around it. Soft green magical glow rising from the pages. No people.
```

Archivo: `grimorio-paginas.mp4`.

```text
The pages of the grimoire turn slowly by themselves. On each new page, golden ink draws a plant illustration and lines of handwriting appear. Small green sparkles rise from the book and the candle flames lean as the pages move.
```

## Prioridad sugerida

| Orden | Clips | Por qué |
|---|---|---|
| 1 | A1 calma (bucle) | Es lo que más se ve: el taller deja de ser una imagen fija |
| 2 | A3, A4, A5 técnicas | Cada técnica tendría su propia animación al crear la mezcla |
| 3 | B1 a B4 Bruma | Ya cubierto con el conjunto «Merlin» |
| 4 | C jardín | Hoy el jardín no tiene ilustración |
| 5 | D explorar | Hoy los mapas no tienen paisaje |
| 6 | A2, A6, A7, E | Detalles |

## Consejos para mantener el estilo

- Si un clip cambia la cara o la ropa del personaje, repítelo: es el fallo más común.
- Los clips de calma solo sirven si el último fotograma coincide con el primero; si no, se nota el salto al repetir.
- Evita que el modelo escriba texto en libros o etiquetas: suele salir ilegible.
- Genera dos o tres variantes de cada uno y elige; así llegaste a los 15 clips originales.
- Revisa que el plan de OpenArt con el que generes permita uso comercial y redistribución antes de publicar el juego.

Ver [[Arte y videos]].
