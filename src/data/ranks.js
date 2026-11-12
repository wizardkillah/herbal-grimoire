// ══════════════════════════════════════════════════════════════════════
//  GRIMORIO HERBAL v8 — Sistema de Rangos
// ══════════════════════════════════════════════════════════════════════

export const RANKS = [
  { level: 1,  xp: 0,     color: "#4ade80", aura: "rgba(74,222,128,.28)",
    titleM: "Aprendiz de Hierbas",    titleF: "Aprendiza de Hierbas",
    fA: "#14532d", fB: "#22c55e", fC: "#86efac",
    lore: "Los aromas te llaman. Apenas aprendes a escuchar.",
    bg: "radial-gradient(ellipse at 18% 22%, #080f08, #060c06 55%, #04080a)",
    darkXP: null },
  { level: 2,  xp: 80,    color: "#4ade80", aura: "rgba(74,222,128,.3)",
    titleM: "Herbolario Novicio",     titleF: "Herbolaria Novicia",
    fA: "#15803d", fB: "#4ade80", fC: "#bbf7d0",
    lore: "El bosque te reconoce. Las raíces guardan secretos.",
    bg: "radial-gradient(ellipse at 18% 22%, #080f08, #060e0a 55%, #04080e)",
    darkXP: null },
  { level: 3,  xp: 250,   color: "#22c55e", aura: "rgba(34,197,94,.3)",
    titleM: "Destilador de Esencias", titleF: "Destiladora de Esencias",
    fA: "#15803d", fB: "#22c55e", fC: "#4ade80",
    lore: "Tus manos huelen a tierra y resinas. La medicina fluye.",
    bg: "radial-gradient(ellipse at 18% 22%, #080f08, #060e08 55%, #040810)",
    darkXP: null },
  { level: 4,  xp: 580,   color: "#d97706", aura: "rgba(217,119,6,.3)",
    titleM: "Alquimista Iniciado",    titleF: "Alquimista Iniciada",
    fA: "#92400e", fB: "#d97706", fC: "#fcd34d",
    lore: "El fuego obedece. La alquimia revela su faz oculta...",
    bg: "radial-gradient(ellipse at 18% 22%, #100804, #0c0604 55%, #080404)",
    darkXP: null },
  { level: 5,  xp: 1100,  color: "#a78bfa", aura: "rgba(167,139,250,.4)",
    titleM: "Alquimista del Umbral",  titleF: "Alquimista del Umbral",
    fA: "#7c3aed", fB: "#a78bfa", fC: "#ddd6fe",
    lore: "El Umbral se abre. Lo oscuro te llama.",
    bg: "radial-gradient(ellipse at 18% 22%, #0f0820, #0c0618 55%, #08041000)",
    darkXP: 1100,
    unlockMsg: "Brebajes Oscuros y Licores Artesanales desbloqueados." },
  { level: 6,  xp: 2000,  color: "#a78bfa", aura: "rgba(167,139,250,.4)",
    titleM: "Mago Bifronte",          titleF: "Maga Bifronte",
    fA: "#7c3aed", fB: "#a78bfa", fC: "#ddd6fe",
    lore: "Luz y sombra danzan en tus manos.",
    bg: "radial-gradient(ellipse at 18% 22%, #140a28, #0e0620 55%, #0a0418)",
    darkXP: 1100 },
  { level: 7,  xp: 3500,  color: "#7c3aed", aura: "rgba(124,58,237,.45)",
    titleM: "Señor del Brebaje",      titleF: "Señora del Brebaje",
    fA: "#3b0764", fB: "#7c3aed", fC: "#a78bfa",
    lore: "El pisco tiembla. Las hierbas y el alcohol danzan.",
    bg: "radial-gradient(ellipse at 18% 22%, #180830, #100628 55%, #080420)",
    darkXP: 1100 },
  { level: 8,  xp: 5500,  color: "#a78bfa", aura: "rgba(167,139,250,.48)",
    titleM: "Archimago Dual",         titleF: "Archimaga Dual",
    fA: "#3b0764", fB: "#7c3aed", fC: "#ddd6fe",
    lore: "Medicina, aromas, caos y arte. No hay distinción.",
    bg: "radial-gradient(ellipse at 18% 22%, #1a0a38, #120830 55%, #0a0628)",
    darkXP: 1100 },
  { level: 9,  xp: 8500,  color: "#ddd6fe", aura: "rgba(221,214,254,.52)",
    titleM: "Gran Druida Oscuro",     titleF: "Gran Druida Oscura",
    fA: "#7c3aed", fB: "#a78bfa", fC: "#ffffff",
    lore: "Los cielos son tus ingredientes.",
    bg: "radial-gradient(ellipse at 18% 22%, #200c40, #180a38 55%, #100830)",
    darkXP: 1100 },
  { level: 10, xp: 14000, color: "#fcd34d", aura: "rgba(252,211,77,.55)",
    titleM: "El Innombrable",         titleF: "La Innombrable",
    fA: "#92400e", fB: "#fcd34d", fC: "#ffffff",
    lore: "Más allá del grimorio. Eres la pócima misma.",
    bg: "radial-gradient(ellipse at 18% 22%, #280a50, #200848 55%, #180640)",
    darkXP: 1100 },
];

export const getRank = (xp) => {
  let r = RANKS[0];
  for (const rk of RANKS) { if (xp >= rk.xp) r = rk; else break; }
  return r;
};
export const getNextRank = (level) => RANKS.find(r => r.level === level + 1) || null;
export const getProgress = (xp, cur, nxt) =>
  !nxt ? 100 : Math.min(100, ((xp - cur.xp) / (nxt.xp - cur.xp)) * 100);
