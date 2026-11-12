// ══════════════════════════════════════════════════════════════════════
//  IngredientModal — Popup de propiedades de un ingrediente
// ══════════════════════════════════════════════════════════════════════
import { useEffect } from "react";
import { getIngProps } from "../../data/ingredientProps.js";

const S = {
  overlay: {
    position: "fixed", inset: 0, zIndex: 200,
    background: "rgba(0,0,0,.72)",
    backdropFilter: "blur(6px)",
    display: "flex", alignItems: "center", justifyContent: "center",
    padding: 16,
    animation: "fadeIn .18s ease",
  },
  card: (c) => ({
    position: "relative",
    background: "linear-gradient(145deg,rgba(8,14,8,.97),rgba(12,6,20,.97))",
    border: `1px solid ${c}55`,
    borderRadius: "var(--r-lg)",
    boxShadow: `0 0 48px ${c}30, 0 24px 64px rgba(0,0,0,.8)`,
    padding: "24px 22px 20px",
    maxWidth: 400, width: "100%",
    maxHeight: "88vh", overflowY: "auto",
    display: "flex", flexDirection: "column", gap: 14,
    scrollbarWidth: "thin",
    scrollbarColor: "var(--green-900) transparent",
    animation: "scaleIn .2s cubic-bezier(.34,1.56,.64,1)",
  }),
  closeBtn: {
    position: "absolute", top: 12, right: 12,
    width: 28, height: 28, borderRadius: "50%",
    background: "rgba(255,255,255,.07)",
    border: "1px solid rgba(255,255,255,.12)",
    color: "var(--text-muted)", cursor: "pointer",
    fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center",
    transition: "all .15s",
  },
  header: { display: "flex", alignItems: "flex-start", gap: 12 },
  dot: (c) => ({
    width: 16, height: 16, borderRadius: "50%",
    background: c, flexShrink: 0, marginTop: 3,
    boxShadow: `0 0 10px ${c}88`,
  }),
  nameBlock: { flex: 1 },
  commonName: {
    fontFamily: "var(--font-title)", fontSize: 18, fontWeight: 700,
    color: "var(--text-bright)", lineHeight: 1.2, letterSpacing: ".3px",
  },
  latinName: {
    fontFamily: "var(--font-body)", fontSize: 11,
    color: "var(--text-muted)", fontStyle: "italic", marginTop: 2,
  },
  regionBadge: (c) => ({
    display: "inline-block", marginTop: 4,
    fontFamily: "var(--font-title)", fontSize: 8, letterSpacing: "1px",
    padding: "2px 7px", borderRadius: 20,
    background: `${c}18`, color: c,
    border: `1px solid ${c}44`,
  }),
  divider: { borderColor: "rgba(255,255,255,.06)", borderStyle: "solid", borderWidth: "1px 0 0 0" },
  desc: {
    fontFamily: "var(--font-body)", fontSize: 12.5,
    color: "var(--text-mid)", lineHeight: 1.65,
  },
  sectionLabel: {
    fontFamily: "var(--font-title)", fontSize: 8.5,
    letterSpacing: "2px", color: "var(--text-muted)",
    textTransform: "uppercase", marginBottom: 6,
  },
  pillsWrap: { display: "flex", flexWrap: "wrap", gap: 5 },
  pill: (c) => ({
    fontFamily: "var(--font-body)", fontSize: 11,
    padding: "3px 10px", borderRadius: "var(--r-full)",
    background: `${c}18`, color: c, border: `1px solid ${c}44`,
  }),
  usesList: {
    margin: 0, padding: "0 0 0 16px",
    fontFamily: "var(--font-body)", fontSize: 12,
    color: "var(--text-mid)", lineHeight: 1.75,
  },
  cautionBox: {
    background: "rgba(220,60,60,.1)",
    border: "1px solid rgba(220,60,60,.3)",
    borderRadius: "var(--r-md)", padding: "8px 12px",
    fontFamily: "var(--font-body)", fontSize: 11.5,
    color: "#ff9090", lineHeight: 1.55,
    display: "flex", gap: 8, alignItems: "flex-start",
  },
  xpBox: (c) => ({
    background: `${c}10`, border: `1px solid ${c}30`,
    borderRadius: "var(--r-md)", padding: "8px 12px",
    display: "flex", gap: 8, flexWrap: "wrap",
  }),
  xpBadge: (bg, col, border) => ({
    fontFamily: "var(--font-title)", fontSize: 9, letterSpacing: ".5px",
    padding: "2px 8px", borderRadius: 20,
    background: bg, color: col, border: `1px solid ${border}`,
  }),
  addBtn: (c, selected) => ({
    fontFamily: "var(--font-title)", fontSize: 11, letterSpacing: "1.5px",
    padding: "10px 0", borderRadius: "var(--r-md)", cursor: "pointer",
    border: `1px solid ${c}66`,
    background: selected ? `${c}28` : `${c}14`,
    color: selected ? "var(--text-bright)" : c,
    textAlign: "center", transition: "all .2s",
    textTransform: "uppercase",
  }),
};

const REGION_LABELS = {
  chile:     { label: "🇨🇱 Chile", color: "#ff8080" },
  andina:    { label: "🏔 Andina",  color: "#a0c0ff" },
  universal: { label: "🌍 Universal", color: "#80c080" },
};

export default function IngredientModal({ ing, selectedIds, onToggle, onClose }) {
  if (!ing) return null;

  const props = getIngProps(ing);
  const selected = selectedIds.has(ing.id);
  const full = !selected && selectedIds.size >= 8;
  const region = REGION_LABELS[ing.region];

  // Cerrar con Escape
  useEffect(() => {
    const fn = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  // Pilares de color para propiedades
  const propColors = [
    ing.c,
    "#4ade80", "#a78bfa", "#60c0e0", "#fcd34d", "#f472b6",
  ];

  return (
    <div style={S.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={S.card(ing.c)} role="dialog" aria-modal="true" aria-label={`Propiedades de ${ing.n}`}>

        {/* Cerrar */}
        <button style={S.closeBtn} onClick={onClose}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,.14)"; e.currentTarget.style.color = "var(--text-bright)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,.07)"; e.currentTarget.style.color = "var(--text-muted)"; }}
          aria-label="Cerrar"
        >✕</button>

        {/* Header */}
        <div style={S.header}>
          <span style={S.dot(ing.c)} />
          <div style={S.nameBlock}>
            <div style={S.commonName}>{ing.n}</div>
            {ing.lat && <div style={S.latinName}>{ing.lat}</div>}
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginTop: 5 }}>
              {region && <span style={S.regionBadge(region.color)}>{region.label}</span>}
              {ing.raro && <span style={S.regionBadge("#fcd34d")}>✦ Raro</span>}
              {ing.sub  && <span style={S.regionBadge("var(--text-muted)")}>{ing.sub}</span>}
            </div>
          </div>
        </div>

        <hr style={S.divider} />

        {/* Descripción */}
        {props.desc && <p style={S.desc}>{props.desc}</p>}

        {/* Propiedades */}
        {props.props?.length > 0 && (
          <div>
            <div style={S.sectionLabel}>Propiedades</div>
            <div style={S.pillsWrap}>
              {props.props.map((p, i) => (
                <span key={i} style={S.pill(propColors[i % propColors.length])}>{p}</span>
              ))}
            </div>
          </div>
        )}

        {/* Usos tradicionales */}
        {props.uses?.length > 0 && (
          <div>
            <div style={S.sectionLabel}>Usos Tradicionales</div>
            <ul style={S.usesList}>
              {props.uses.map((u, i) => <li key={i}>{u}</li>)}
            </ul>
          </div>
        )}

        {/* XP bonus */}
        {(ing.region === "chile" || ing.region === "andina" || ing.raro) && (
          <div style={S.xpBox(ing.c)}>
            <span style={{ fontFamily: "var(--font-title)", fontSize: 9, color: "var(--text-muted)", letterSpacing: "1px", alignSelf: "center" }}>
              BONUS XP
            </span>
            {(ing.region === "chile" || ing.region === "andina") && (
              <span style={S.xpBadge("rgba(220,50,50,.18)", "#ff8080", "rgba(220,50,50,.3)")}>
                +10 XP {ing.region}
              </span>
            )}
            {ing.raro && (
              <span style={S.xpBadge("rgba(212,175,55,.18)", "var(--text-gold)", "rgba(212,175,55,.3)")}>
                +12 XP raro ✦
              </span>
            )}
          </div>
        )}

        {/* Precauciones */}
        {props.caution && (
          <div style={S.cautionBox}>
            <span style={{ fontSize: 14, flexShrink: 0 }}>⚠</span>
            <span>{props.caution}</span>
          </div>
        )}

        <hr style={S.divider} />

        {/* Botón añadir/quitar */}
        <button
          style={S.addBtn(ing.c, selected)}
          onClick={() => { onToggle(ing); onClose(); }}
          disabled={full}
          title={full ? "Máximo 8 ingredientes" : undefined}
          onMouseEnter={e => { if (!full) e.currentTarget.style.background = `${ing.c}30`; }}
          onMouseLeave={e => { e.currentTarget.style.background = selected ? `${ing.c}28` : `${ing.c}14`; }}
        >
          {selected
            ? "✦ Quitar del Caldero"
            : full
              ? "Caldero lleno (máx. 8)"
              : `+ Agregar al Caldero`}
        </button>

      </div>
    </div>
  );
}
