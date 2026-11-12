// ══════════════════════════════════════════════════════════════════════
//  GRIMORIO HERBAL v8 — Tabla de XP y tipos de preparación
// ══════════════════════════════════════════════════════════════════════

export const XP_TABLE = {
  // Verde – Medicinales
  infusion: 35, unguento: 45, tintura: 55, decoccion: 40, elixir: 70, cataplasma: 25,
  // Verde – Tés
  te_clasico: 30, blend_floral: 45, te_ceremonial: 60, cold_brew: 40, te_latte: 45, kombucha_te: 60,
  // Oscuro – Brebajes
  coctel: 40, shot: 22, macerado: 55, sangria: 45, pisco_sour: 60, fermentado: 65,
  // Oscuro – Artesanales
  limoncello: 70, narancello: 70, licor_hierbas: 80, amaro: 85, bitter: 65, cordial: 60,
  // Bonuses
  perIng: 6, highPot: 25, localHerb: 10, raro: 12,
};

export const calcXP = (tipo, ings = [], pot = 6) => {
  let total = (XP_TABLE[tipo] || 35) + ings.length * XP_TABLE.perIng;
  if (pot >= 8) total += XP_TABLE.highPot;
  total += ings.filter(i => i.region === "chile" || i.region === "andina").length * XP_TABLE.localHerb;
  total += ings.filter(i => i.raro).length * XP_TABLE.raro;
  return total;
};

export const TIPOS_VERDE = [
  { id: "infusion",  label: "Infusión",     xp: 35, color: "#4a9eff" },
  { id: "unguento",  label: "Ungüento",     xp: 45, color: "#8bc34a" },
  { id: "tintura",   label: "Tintura",      xp: 55, color: "#ff9800" },
  { id: "decoccion", label: "Decocción",    xp: 40, color: "#e91e63" },
  { id: "elixir",    label: "Elixir",       xp: 70, color: "#9c27b0" },
  { id: "cataplasma",label: "Cataplasma",   xp: 25, color: "#795548" },
];
export const TIPOS_TE = [
  { id: "te_clasico",   label: "Té Clásico",    xp: 30, color: "#70b060" },
  { id: "blend_floral", label: "Blend Floral",  xp: 45, color: "#e06080" },
  { id: "te_ceremonial",label: "Ceremonial",    xp: 60, color: "#c04020" },
  { id: "cold_brew",    label: "Cold Brew",     xp: 40, color: "#40a0c0" },
  { id: "te_latte",     label: "Latte de Té",   xp: 45, color: "#c08040" },
  { id: "kombucha_te",  label: "Kombucha",      xp: 60, color: "#80c040" },
];
export const TIPOS_OSCURO = [
  { id: "coctel",    label: "Cóctel",    xp: 40, color: "#ff6080" },
  { id: "shot",      label: "Shot",      xp: 22, color: "#ff9030" },
  { id: "macerado",  label: "Macerado",  xp: 55, color: "#a070d0" },
  { id: "sangria",   label: "Sangría",   xp: 45, color: "#c03050" },
  { id: "pisco_sour",label: "Pisco Sour",xp: 60, color: "#f0d030" },
  { id: "fermentado",label: "Fermentado",xp: 65, color: "#6040c0" },
];
export const TIPOS_ART = [
  { id: "limoncello",   label: "Limoncello",    xp: 70, color: "#e8d820" },
  { id: "narancello",   label: "Narancello",    xp: 70, color: "#f07020" },
  { id: "licor_hierbas",label: "Licor Hierbas", xp: 80, color: "#50a840" },
  { id: "amaro",        label: "Amaro",         xp: 85, color: "#604080" },
  { id: "bitter",       label: "Bitter",        xp: 65, color: "#804020" },
  { id: "cordial",      label: "Cordial",       xp: 60, color: "#e09020" },
];

export const TIPOS_BY_SUBPATH = {
  med:       TIPOS_VERDE,
  te:        TIPOS_TE,
  brebaje:   TIPOS_OSCURO,
  artesanal: TIPOS_ART,
};
