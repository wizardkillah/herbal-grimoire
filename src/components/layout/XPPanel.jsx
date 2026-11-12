// ══════════════════════════════════════════════════════════════════════
//  XPPanel — Barra de XP y rango del jugador (sección 8.1 doc v8)
//  Contraste WCAG AA garantizado: todos los textos ≥ 4.5:1
// ══════════════════════════════════════════════════════════════════════
import { getProgress, getNextRank } from "../../data/ranks.js";

const S = {
  panel: (rank, anim) => ({
    background: "linear-gradient(135deg,rgba(0,0,0,.76),rgba(10,5,2,.92))",
    border: `1px solid ${rank.color}44`,
    borderRadius: "var(--r-lg)",
    padding: "14px 18px",
    boxShadow: anim ? `0 0 60px ${rank.aura}` : `0 0 20px ${rank.aura}`,
    transition: "box-shadow .8s",
    position: "relative", overflow: "hidden",
  }),
  flashOverlay: {
    position: "absolute", inset: 0,
    background: "radial-gradient(ellipse at center,rgba(252,211,77,.3),transparent 70%)",
    animation: "lvFlash 1.5s ease-out forwards",
    pointerEvents: "none",
  },
  auraOverlay: (rank) => ({
    position: "absolute", inset: 0,
    background: `radial-gradient(ellipse at 25% 50%,${rank.aura},transparent 65%)`,
    pointerEvents: "none",
  }),
  row: {
    display: "flex", alignItems: "center", gap: 12, marginBottom: 10, position: "relative",
  },
  avatarCircle: (rank, anim) => ({
    width: 54, height: 54, borderRadius: "50%",
    background: `radial-gradient(circle,${rank.color}33,rgba(0,0,0,.5))`,
    border: `2px solid ${rank.color}88`,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 26, cursor: "pointer", flexShrink: 0,
    boxShadow: `0 0 20px ${rank.color}44`,
    animation: anim ? "iconPop .7s cubic-bezier(.34,1.56,.64,1)" : "none",
  }),
  info: { flex: 1 },
  rankName: (rank) => ({
    fontFamily: "var(--font-title)", fontSize: 16, fontWeight: 600,
    color: "var(--text-gold)",                 /* contraste ~9:1 */
    textShadow: `0 0 14px ${rank.color}55`,
    lineHeight: 1.2,
  }),
  motto: {
    fontFamily: "var(--font-body)", fontSize: 13, fontStyle: "italic",
    color: "var(--text-mid)",                  /* contraste ~7:1 */
    marginTop: 3,
  },
  levelBadge: (rank) => ({
    fontFamily: "var(--font-title)", fontSize: 11, fontWeight: 700,
    color: "var(--text-gold)",
    background: `${rank.color}22`,
    border: `1px solid ${rank.color}55`,
    borderRadius: 20, padding: "2px 10px",
    flexShrink: 0,
  }),
  barWrap: {
    height: 10, background: "rgba(255,255,255,.06)",
    borderRadius: 5, overflow: "hidden", position: "relative",
    border: "1px solid rgba(34,197,94,0.15)",
  },
  barFill: (pct, rank) => ({
    height: "100%", width: `${pct}%`,
    background: `linear-gradient(90deg,${rank.fA},${rank.color})`,
    borderRadius: 5,
    boxShadow: `0 0 10px ${rank.color}88`,
    transition: "width 1.4s cubic-bezier(.4,0,.2,1)",
    position: "relative",
  }),
  barShimmer: {
    position: "absolute", inset: 0,
    background: "linear-gradient(90deg,transparent,rgba(255,255,255,.28),transparent)",
    animation: "shimBar 2.5s ease-in-out infinite",
  },
  xpRow: {
    display: "flex", justifyContent: "space-between",
    marginTop: 5, fontSize: 11,
    fontFamily: "var(--font-title)", letterSpacing: ".3px",
  },
  xpCurrent: { color: "var(--green-400)" },
  xpNext:    { color: "var(--text-muted)" },
  xpGain: (rank) => ({
    color: "var(--text-gold)", marginLeft: 6, fontWeight: 700,
    animation: "xpPop 2s ease-out forwards",
  }),
};

export default function XPPanel({ xp, rank, next, newXP, anim, gender, onAvatarClick }) {
  const pct   = getProgress(xp, rank, next);
  const title = gender === "F" ? rank.titleF : rank.titleM;

  return (
    <div style={S.panel(rank, anim)}>
      {anim && <div style={S.flashOverlay} />}
      <div style={S.auraOverlay(rank)} />

      <div style={S.row}>
        <div
          style={S.avatarCircle(rank, anim)}
          onClick={onAvatarClick}
          title="Editar avatar"
          role="button"
          tabIndex={0}
          onKeyDown={e => e.key === "Enter" && onAvatarClick?.()}
          aria-label="Abrir editor de avatar"
        >
          {/* Avatar mini SVG placeholder — se reemplaza en FASE 4 */}
          <span style={{ fontSize: 20 }}>🧙</span>
        </div>

        <div style={S.info}>
          <div style={S.rankName(rank)}>{title}</div>
          <div style={S.motto}>{rank.lore}</div>

          <div style={S.barWrap}>
            <div style={S.barFill(pct, rank)}>
              <div style={S.barShimmer} />
            </div>
          </div>

          <div style={S.xpRow}>
            <span style={S.xpCurrent}>
              {xp.toLocaleString("es-CL")} XP
              {newXP > 0 && (
                <span style={S.xpGain(rank)}>+{newXP} ✦</span>
              )}
            </span>
            {next ? (
              <span style={S.xpNext}>
                {next.xp.toLocaleString("es-CL")} → Nv.{next.level}
                {next.darkXP ? " 🔓" : ""}
              </span>
            ) : (
              <span style={{ ...S.xpNext, color: "var(--text-gold)", fontFamily: "var(--font-title)", letterSpacing: 2 }}>
                ✦ MÁXIMO ✦
              </span>
            )}
          </div>
        </div>

        <div style={S.levelBadge(rank)}>Nv.{rank.level}</div>
      </div>
    </div>
  );
}
