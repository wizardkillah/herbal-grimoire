// ══════════════════════════════════════════════════════════════════════
//  GRIMORIO HERBAL v8 — 12 Mascotas Mágicas (Sección 4.1 del documento)
// ══════════════════════════════════════════════════════════════════════

export const PETS = [
  { id: "cat_herbal",   nameES: "Gatito Herbal",      type: "gato",   unlockLevel: 1,
    bonus: "+5% XP en Camino Verde",   condition: "verde",  flat: 0, percent: 5,
    description: "Ronronea junto al caldero y multiplica tu experiencia herbal." },
  { id: "dog_druida",   nameES: "Perro Druida",       type: "perro",  unlockLevel: 2,
    bonus: "+8 XP plano por conjuración", condition: "any", flat: 8, percent: 0,
    description: "Leal compañero que trae ingredientes en la boca cada mañana." },
  { id: "fox_andino",   nameES: "Zorro Andino",       type: "magico", unlockLevel: 3,
    bonus: "+12 XP cuando hay hierba andina", condition: "andina", flat: 12, percent: 0,
    description: "Guardián de la cordillera. Conoce los secretos de la muña y el paico." },
  { id: "dragon_verde", nameES: "Dragoncito Verde",   type: "dragon", unlockLevel: 4,
    bonus: "+10 XP plano",             condition: "any",  flat: 10, percent: 0,
    description: "Sopla fuego verde al conjurar. Pequeño pero feroz." },
  { id: "owl_sabia",    nameES: "Lechuza Sabia",      type: "magico", unlockLevel: 5,
    bonus: "+15% XP en Camino Oscuro", condition: "oscuro", flat: 0, percent: 15,
    description: "Solo aparece de noche. Su sabiduría ilumina los caminos oscuros." },
  { id: "cat_alquimico",nameES: "Gato Alquímico Negro",type: "gato",  unlockLevel: 5,
    bonus: "+12% XP Oscuro",           condition: "oscuro", flat: 0, percent: 12,
    description: "Llamas púrpuras en sus ojos. Domina los secretos de los brebajes." },
  { id: "wolf_lunar",   nameES: "Lobo Lunar",         type: "magico", unlockLevel: 6,
    bonus: "+18 XP en level-up",       condition: "any",  flat: 18, percent: 0,
    description: "Aúlla cuando subes de nivel. La luna es su grimorio." },
  { id: "salamandra",   nameES: "Salamandra de Fuego",type: "reptil", unlockLevel: 7,
    bonus: "Cambia color según camino, +10 XP", condition: "any", flat: 10, percent: 0,
    description: "Adapta sus colores al camino activo. Elemental del fuego." },
  { id: "dragon_dorado",nameES: "Dragón Dorado",      type: "dragon", unlockLevel: 8,
    bonus: "+20 XP plano",             condition: "any",  flat: 20, percent: 0,
    description: "Chispas doradas en cada conjuración. Majestuoso y poderoso." },
  { id: "butterfly_arcana", nameES: "Mariposa Arcana",type: "hada",  unlockLevel: 9,
    bonus: "+10% XP global",           condition: "any",  flat: 0, percent: 10,
    description: "Partículas de luz en idle. Multiplica toda tu experiencia arcana." },
  { id: "leviathan",    nameES: "Leviatán Herbario",  type: "dragon", unlockLevel: 10,
    bonus: "+25 XP plano. Mascota legendaria.", condition: "any", flat: 25, percent: 0,
    description: "Efectos visuales máximos. La mascota definitiva del grimorio." },
  { id: "star_errante", nameES: "Estrella Errante",   type: "entidad",unlockLevel: 99,
    bonus: "+30% XP durante evento",   condition: "evento", flat: 0, percent: 30,
    description: "Solo aparece en eventos especiales. Efímera y extraordinaria." },
];

/** Emojis representativos por tipo (para UI simple antes de tener SVGs propios) */
export const PET_EMOJI = {
  gato: "🐱", perro: "🐕", magico: "✨", dragon: "🐉",
  reptil: "🦎", hada: "🦋", entidad: "⭐",
};

export const getPetEmoji = (pet) => PET_EMOJI[pet.type] || "✨";

export const calcPetXPBonus = (pet, basePath, hasAndinaIng) => {
  if (!pet) return 0;
  const { condition, flat, percent } = pet;
  if (condition === "verde"  && basePath !== "verde")  return 0;
  if (condition === "oscuro" && basePath !== "oscuro") return 0;
  if (condition === "andina" && !hasAndinaIng)          return 0;
  return { flat, percent };
};
