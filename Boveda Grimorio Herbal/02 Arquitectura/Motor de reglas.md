---
tags: [arquitectura, juego]
archivo: src/game/rules.js
---
# Motor de reglas

Funciones puras en `src/game/rules.js`: `evaluate`, `brew`, `upgrade`, `xpOf`, `coinsOf`, `restore`, `saveRecipeNote`.

## Mezclas

- De 1 a 3 porciones (4 con la mejora del caldero); se pueden repetir ingredientes.
- La clave de receta es técnica + ingredientes ordenados: el orden no crea una receta nueva; proporciones y técnica sí.
- Cuatro ejes ficticios: **Luz, Calma, Calor, Vigor**. Se suman los valores de los ingredientes y el modificador de la técnica, con mínimo cero.

| Técnica | Efecto |
|---|---|
| Infusionar | +2 calma, −1 calor |
| Macerar | +2 luz, +1 calor |
| Moler | +2 vigor, −1 luz |

## Economía

- Receta nueva: 15 XP.
- Encargo (6, secuenciales): 80 XP y 60 semillas, una sola vez.
- Ampliar caldero: 100 semillas, una vez.
- Ingredientes ilimitados; fallar no penaliza.
- XP y semillas **se derivan** de lo descubierto, no se confía en cifras guardadas.

> [!note] Límite conocido
> Muchos ingredientes incorporados tienen valores uniformes (1/1/1/1). Sirve para jugar, pero no hay balance individual. Los ejes nunca deben leerse como escala medicinal.

Ver [[Persistencia y respaldos]], [[Pruebas]].
