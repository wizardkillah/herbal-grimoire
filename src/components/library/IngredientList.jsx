// ══════════════════════════════════════════════════════════════════════
//  IngredientList — Biblioteca herbal con filtros + botón de info
// ══════════════════════════════════════════════════════════════════════
import { XP_TABLE } from "../../data/xp.js";
import { getIngTabsForSubpath } from "../../data/ingredients.js";

const REGION_FILTERS = [
  { id: "todas",     label: "Todas" },
  { id: "chile",     label: "🇨🇱 Chile" },
  { id: "andina",    label: "Andina" },
  { id: "universal", label: "Universal" },
];

const S = {
  card: {
    background: "rgba(0,0,0,.28)",
    border: "1px solid rgba(34,197,94,.18)",
    borderRadius: "var(--r-lg)",
    padding: 14, display: "flex", flexDirection: "column", gap: 8,
  },
  sectionLabel: {
    fontFamily: "var(--font-title)", fontSize: 9.5,
    letterSpacing: "2px", color: "var(--text-muted)",
    textTransform: "uppercase", marginBottom: 4,
  },
  tabs: { display: "flex", flexWrap: "wrap", gap: 4 },
  tab: (active) => ({
    fontFamily: "var(--font-title)", fontSize: 9, letterSpacing: "1px",
    padding: "4px 10px", borderRadius: "var(--r-sm)",
    border: `1px solid ${active ? "var(--green-700)" : "rgba(34,197,94,.18)"}`,
    background: active ? "rgba(34,197,94,.18)" : "transparent",
    color: active ? "var(--text-bright)" : "var(--text-muted)",
    cursor: "pointer", transition: "all .15s", whiteSpace: "nowrap",
  }),
  regionRow: { display: "flex", flexWrap: "wrap", gap: 4 },
  regionBtn: (active) => ({
    fontFamily: "var(--font-body)", fontSize: 10,
    padding: "3px 9px", borderRadius: "var(--r-full)",
    border: `1px solid ${active ? "var(--green-700)" : "rgba(34,197,94,.15)"}`,
    background: active ? "rgba(34,197,94,.18)" : "transparent",
    color: active ? "var(--green-400)" : "var(--text-muted)",
    cursor: "pointer", transition: "all .15s",
  }),
  list: {
    maxHeight: 260, overflowY: "auto", display: "flex",
    flexDirection: "column", gap: 3, paddingRight: 2,
    scrollbarWidth: "thin", scrollbarColor: "var(--green-900) transparent",
  },
  item: (selected, c) => ({
    background: selected ? `${c}18` : "rgba(0,0,0,.25)",
    border: `1px solid ${selected ? c + "88" : "rgba(34,197,94,.12)"}`,
    borderRadius: "var(--r-md)", padding: "7px 8px",
    cursor: "pointer", display: "flex", alignItems: "center", gap: 8,
    transition: "all .18s",
    transform: selected ? "translateX(2px)" : "none",
    width: "100%",
  }),
  dot:        (c) => ({ width: 10, height: 10, borderRadius: "50%", background: c, flexShrink: 0 }),
  names:      { flex: 1, minWidth: 0, textAlign: "left" },
  commonName: { fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.2 },
  latinName:  { fontFamily: "var(--font-body)", fontSize: 10, color: "var(--text-muted)", fontStyle: "italic", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" },
  badges:     { display: "flex", gap: 3, marginTop: 2, flexWrap: "wrap" },
  badge: (bg, col, border) => ({
    fontFamily: "var(--font-title)", fontSize: 8, letterSpacing: ".5px",
    padding: "1px 5px", borderRadius: 4,
    background: bg, color: col, border: `1px solid ${border}`,
  }),
  infoBtn: (c) => ({
    flexShrink: 0,
    width: 22, height: 22,
    borderRadius: "50%",
    border: `1px solid ${c}55`,
    background: `${c}12`,
    color: c,
    fontSize: 11, fontWeight: 700,
    cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center",
    transition: "all .15s",
    fontFamily: "var(--font-title)",
  }),
};

function IngItem({ ing, selected, onToggle, onInfo }) {
  return (
    <div style={{ display: "flex", gap: 4, alignItems: "stretch" }}>
      {/* Fila principal — click = toggle ingrediente */}
      <button
        style={S.item(selected, ing.c)}
        onClick={() => onToggle(ing)}
        onMouseEnter={e => { if (!selected) e.currentTarget.style.background = `${ing.c}0f`; }}
        onMouseLeave={e => { if (!selected) e.currentTarget.style.background = "rgba(0,0,0,.25)"; }}
        aria-pressed={selected}
      >
        <span style={S.dot(ing.c)} />
        <div style={S.names}>
          <div style={S.commonName}>{ing.n}</div>
          {ing.lat && <div style={S.latinName}>{ing.lat}</div>}
          <div style={S.badges}>
            {ing.region === "chile"   && <span style={S.badge("rgba(220,50,50,.18)","#ff8080","rgba(220,50,50,.3)")}>+{XP_TABLE.localHerb}xp chile</span>}
            {ing.region === "andina"  && <span style={S.badge("rgba(100,150,220,.18)","#a0c0ff","rgba(100,150,220,.3)")}>+{XP_TABLE.localHerb}xp andina</span>}
            {ing.raro                 && <span style={S.badge("rgba(212,175,55,.18)","var(--text-gold)","rgba(212,175,55,.3)")}>+{XP_TABLE.raro}xp raro</span>}
            {ing.sub                  && <span style={S.badge("rgba(255,255,255,.05)","var(--text-muted)","rgba(255,255,255,.1)")}>{ing.sub}</span>}
          </div>
        </div>
        {selected && <span style={{ color: "var(--green-500)", fontSize: 12, flexShrink: 0 }}>✦</span>}
      </button>

      {/* Botón ℹ — abre modal de propiedades */}
      <button
        style={S.infoBtn(ing.c)}
        onClick={e => { e.stopPropagation(); onInfo(ing); }}
        title={`Ver propiedades de ${ing.n}`}
        aria-label={`Información sobre ${ing.n}`}
        onMouseEnter={e => { e.currentTarget.style.background = `${ing.c}28`; e.currentTarget.style.borderColor = `${ing.c}99`; }}
        onMouseLeave={e => { e.currentTarget.style.background = `${ing.c}12`; e.currentTarget.style.borderColor = `${ing.c}55`; }}
      >
        ℹ
      </button>
    </div>
  );
}

export default function IngredientList({
  subpath, ingTab, filtroRegion,
  onTabChange, onRegionChange,
  ingredients, selectedIds, onToggle, onInfo,
}) {
  const tabs       = getIngTabsForSubpath(subpath);
  const showRegion = subpath === "med" || subpath === "brebaje";

  return (
    <div style={S.card}>
      <div style={S.sectionLabel}>Biblioteca Herbal</div>

      {/* Tabs de categoría */}
      {tabs.length > 1 && (
        <div style={S.tabs}>
          {tabs.map(t => (
            <button key={t.id} style={S.tab(ingTab === t.id)} onClick={() => onTabChange(t.id)}>
              {t.l}
            </button>
          ))}
        </div>
      )}

      {/* Filtros de región */}
      {showRegion && ingTab === "principal" && (
        <div style={S.regionRow}>
          {REGION_FILTERS.map(r => (
            <button key={r.id} style={S.regionBtn(filtroRegion === r.id)} onClick={() => onRegionChange(r.id)}>
              {r.label}
            </button>
          ))}
        </div>
      )}

      {/* Lista de ingredientes */}
      <div style={S.list}>
        {ingredients.length === 0 ? (
          <p style={{ color: "var(--text-muted)", fontSize: 12, fontStyle: "italic", padding: "12px 4px" }}>
            No hay ingredientes en esta categoría.
          </p>
        ) : (
          ingredients.map(ing => (
            <IngItem
              key={ing.id}
              ing={ing}
              selected={selectedIds.has(ing.id)}
              onToggle={onToggle}
              onInfo={onInfo}
            />
          ))
        )}
      </div>

      <div style={{ fontSize: 10, color: "var(--text-muted)", fontFamily: "var(--font-body)", fontStyle: "italic", textAlign: "right" }}>
        {ingredients.length} ingredientes · máx. 8 seleccionados
      </div>
    </div>
  );
}
