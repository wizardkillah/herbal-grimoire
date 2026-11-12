---
tags: [arquitectura, ia]
archivos: [scripts/bruma-api.mjs, src/game/BrumaChat.jsx, src/game/BrumaPanel.jsx]
---
# Bruma y Gemini

Bruma es la guía del taller: una gata negra de ojos ámbar con sombrero morado de estrellas. Desde el 11-nov-2026 usa los retratos y clips del conjunto «Merlin» del autor (`public/media/bruma`, componente `Bruma.jsx`), con cinco estados: saluda, calma, piensa, habla y duerme. Tiene tres caras:

1. **Local**: panel con Reconocer, Usos y cuidados, Fuentes y créditos; pistas de los encargos. No necesita red.
2. **Con IA**: al pulsar «Crear mezcla», `BrumaChat` llama a `POST /api/bruma`; `scripts/bruma-api.mjs` reconstruye las fichas desde el catálogo de confianza y consulta `generateContent` de Gemini (modelo por defecto `gemini-3.6-flash`).

3. **Preguntas libres** (desde el 11-nov-2026): sección «Preguntar». `BrumaAsk.jsx` llama a `POST /api/bruma/ask`. Admite hasta cuatro plantas elegidas, detecta las plantas del catálogo nombradas en la pregunta y adjunta sus fichas, y envía hasta seis turnos previos. Las fichas prevalecen; Bruma puede completar con conocimiento general distinguiendo tradición, estudios y falta de evidencia. Sin dosis ni diagnósticos. Cada respuesta lleva la nota «generada por IA». La conversación no se guarda.

Accesos: navegación, tarjeta y ficha del Herbolario, y «Seguir preguntando» tras interpretar una pócima. «Llevar al caldero» pasa las plantas de la consulta al taller.

## Controles

- Clave en `.env.gemini.local` o variables del proceso; **nunca** en variables `VITE_` ni en el navegador.
- Solo acepta el origen local; 10 consultas por minuto, una simultánea, 55 s de espera, sin reintentos automáticos.
- Se envían a Google la selección o la pregunta y sus fichas; no las notas ni el cuaderno.
- En la interpretación de pócimas, las instrucciones limitan a Bruma a las fichas. En las preguntas libres puede usar conocimiento general, por lo que el riesgo de error es mayor y la nota de IA es obligatoria.

> [!warning] Lo que esto implica al publicar
> - En un alojamiento estático (GitHub Pages, Netlify sin funciones) **Bruma con IA no funciona**: no hay servidor.
> - Con un backend público, cada visitante consume cuota de la clave del proyecto y el límite actual es global, no por usuario.
> - Las instrucciones reducen el riesgo de afirmaciones falsas, pero no lo eliminan.
>
> Ver [[Significado de publicar o liberar]].
