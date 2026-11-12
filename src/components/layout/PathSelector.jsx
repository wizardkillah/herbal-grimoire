// ══════════════════════════════════════════════════════════════════════
//  PathSelector — Selector de Camino Verde / Oscuro
// ══════════════════════════════════════════════════════════════════════
const S = {
  wrap: {
    display: "flex", flexDirection: "column", alignItems: "center",
    gap: 8, padding: "12px 20px 8px",
  },
  toggle: {
    display: "inline-flex",
    background: "rgba(0,0,0,0.35)",
    border: "1px solid rgba(34,197,94,0.18)",
    borderRadius: 999, padding: 4, gap: 4,
  },
  pathBtn: (active, id) => ({
    fontFamily: "var(--font-title)",
    fontSize: 11, letterSpacing: ".5px",
    padding: "9px 22px", borderRadius: 999,
    border: active
      ? `1px solid ${id === "verde" ? "var(--green-700)" : "var(--purple-600)"}88`
      : "1px solid transparent",
    background: active
      ? id === "verde"
        ? "linear-gradient(135deg,rgba(20,83,45,.7),rgba(21,128,61,.5))"
        : "linear-gradient(135deg,rgba(59,7,100,.7),rgba(124,58,237,.4))"
      : "transparent",
    color: active
      ? id === "verde" ? "var(--green-300)" : "var(--purple-200)"
      : "var(--text-muted)",
    cursor: "pointer",
    transition: "all .3s",
  }),
  pathBtnLocked: {
    fontFamily: "var(--font-title)", fontSize: 11, letterSpacing: ".5px",
    padding: "9px 22px", borderRadius: 999,
    border: "1px solid rgba(124,58,237,0.2)",
    background: "transparent",
    color: "var(--text-muted)",
    cursor: "not-allowed", opacity: 0.4,
  },
  lockBanner: {
    background: "rgba(59,7,100,0.15)",
    border: "1px solid rgba(124,58,237,0.25)",
    borderRadius: 10, padding: "8px 14px",
    display: "flex", alignItems: "center", gap: 8,
    maxWidth: 460, width: "100%",
  },
  lockText: {
    fontFamily: "var(--font-body)", fontSize: 12,
    color: "var(--text-purple)", lineHeight: 1.5,
  },
};

export default function PathSelector({ path, xp, darkUnlocked, onPathChange }) {
  const xpNeeded = Math.max(0, 1100 - xp);

  return (
    <div style={S.wrap}>
      <div style={S.toggle}>
        {/* Camino Verde */}
        <button
          style={S.pathBtn(path === "verde", "verde")}
          onClick={() => onPathChange("verde")}
          aria-pressed={path === "verde"}
        >
          Camino Verde
        </button>

        {/* Camino Oscuro */}
        {darkUnlocked ? (
          <button
            style={S.pathBtn(path === "oscuro", "oscuro")}
            onClick={() => onPathChange("oscuro")}
            aria-pressed={path === "oscuro"}
          >
            Camino Oscuro
          </button>
        ) : (
          <button style={S.pathBtnLocked} disabled title="Desbloquea al nivel 5">
            🔒 Camino Oscuro
          </button>
        )}
      </div>

      {/* Banner de bloqueo con XP faltante */}
      {!darkUnlocked && (
        <div style={S.lockBanner} role="status">
          <span style={{ fontSize: 16 }}>🔒</span>
          <p style={S.lockText}>
            Al nivel 5 como{" "}
            <strong style={{ color: "var(--gold-300)" }}>Alquimista del Umbral</strong>{" "}
            se desbloquean Brebajes y Licores Artesanales.
            {xpNeeded > 0 && (
              <span style={{ color: "var(--text-purple)", marginLeft: 4 }}>
                — Faltan {xpNeeded.toLocaleString("es-CL")} XP
              </span>
            )}
          </p>
        </div>
      )}
    </div>
  );
}
