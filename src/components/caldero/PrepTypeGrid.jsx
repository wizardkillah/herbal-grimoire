// ══════════════════════════════════════════════════════════════════════
//  PrepTypeGrid — Cuadrícula 3×2 de tipos de preparación
//  Íconos SVG inline, sin dependencias externas.
// ══════════════════════════════════════════════════════════════════════

// ── Íconos SVG por tipo ───────────────────────────────────────────────
const ICONS = {
  // Verde – Medicinales
  infusion:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round"><path d="M8 3v3m4-3v3m4-3v3M5 8h14l-1 10H6L5 8z"/><path d="M7 8c0-2 10-2 10 0"/></svg>,
  unguento:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round"><rect x="6" y="8" width="12" height="12" rx="2"/><path d="M9 8V6a3 3 0 016 0v2"/><path d="M9 14h6"/></svg>,
  tintura:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round"><path d="M9 3h6l1 5H8L9 3z"/><path d="M8 8l-2 10a2 2 0 002 2h8a2 2 0 002-2L18 8"/><circle cx="12" cy="15" r="1.5" fill="currentColor"/></svg>,
  decoccion:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round"><path d="M6 18c0 1.1.9 2 2 2h8a2 2 0 002-2V9H6v9z"/><path d="M4 9h16M9 5v4m6-4v4"/><path d="M9 13c1 1.5 3 1.5 4 0s3-1.5 4 0"/></svg>,
  elixir:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round"><path d="M10 2h4l2 5-4 3-4-3 2-5z"/><path d="M8 10l-3 9a1 1 0 001 1h12a1 1 0 001-1l-3-9"/><circle cx="12" cy="16" r="2" fill="currentColor" opacity=".5"/></svg>,
  cataplasma: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round"><rect x="4" y="10" width="16" height="8" rx="3"/><path d="M8 10V7a4 4 0 018 0v3"/><path d="M7 14h10"/></svg>,
  // Verde – Tés
  te_clasico:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round"><path d="M6 8h12l-1.5 9H7.5L6 8z"/><path d="M18 10h2a2 2 0 010 4h-2"/><path d="M9 4c0 0 1-1 3-1s3 1 3 1"/></svg>,
  blend_floral: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M12 3c0 4-3 6-3 9m3-9c0 4 3 6 3 9M3 12c4 0 6-3 9-3m-9 3c4 0 6 3 9 3m0-12c0 4-3 6-3 9m3-9c0 4 3 6 3 9"/></svg>,
  te_ceremonial:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round"><path d="M12 3L9 9H3l5 4-2 7 6-4 6 4-2-7 5-4h-6z"/></svg>,
  cold_brew:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round"><path d="M8 3h8v3l2 2v10a2 2 0 01-2 2H8a2 2 0 01-2-2V8l2-2V3z"/><path d="M10 12h4M12 10v4"/></svg>,
  te_latte:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round"><path d="M7 8h10l-1 11H8L7 8z"/><path d="M5 8h14M9 5c0-1 1-2 3-2s3 1 3 2"/><path d="M9 12c1 1 5 1 6 0"/></svg>,
  kombucha_te:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round"><path d="M8 4h8v4l2 2v8a2 2 0 01-2 2H8a2 2 0 01-2-2v-8l2-2V4z"/><circle cx="12" cy="13" r="2"/><path d="M10 8h4"/></svg>,
  // Oscuro – Brebajes
  coctel:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round"><path d="M4 4l16 0-8 9v7m-3 0h6"/><circle cx="17" cy="6" r="2" fill="currentColor" opacity=".4"/></svg>,
  shot:       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round"><path d="M9 3h6l1 15H8L9 3z"/><path d="M8 10h8"/></svg>,
  macerado:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round"><path d="M7 3h10v4l2 3v8a2 2 0 01-2 2H7a2 2 0 01-2-2v-8l2-3V3z"/><path d="M9 7h6M10 12l-1 4m5-4l1 4"/></svg>,
  sangria:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round"><path d="M5 4h14l-2 12a3 3 0 01-3 3H10a3 3 0 01-3-3L5 4z"/><circle cx="10" cy="10" r="1.5" fill="currentColor"/><circle cx="14" cy="12" r="1" fill="currentColor"/></svg>,
  pisco_sour: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round"><path d="M4 5l16 0-7 8v7m-2 0h4"/><path d="M15 7c0-1.5 2-2 2-3.5"/><circle cx="16" cy="5" r="1" fill="currentColor"/></svg>,
  fermentado: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round"><path d="M8 3h8v3a8 8 0 01-8 0V3z"/><path d="M6 6h12v11a3 3 0 01-3 3H9a3 3 0 01-3-3V6z"/><path d="M10 10c.5 2 3.5 2 4 0"/></svg>,
  // Oscuro – Artesanales
  limoncello:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round"><path d="M10 3h4l1 3-3 2-3-2 1-3z"/><path d="M7 8l-2 13h14L17 8H7z"/><path d="M9 14c1 1.5 5 1.5 6 0"/></svg>,
  narancello:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round"><circle cx="12" cy="10" r="5"/><path d="M12 5v-2m-3 2-1-2m8 2 1-2M7 21h10M9 17l1 4m4-4-1 4"/></svg>,
  licor_hierbas: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round"><path d="M9 2h6l2 6H7L9 2z"/><path d="M7 8v11a2 2 0 002 2h6a2 2 0 002-2V8"/><path d="M10 13c.5 1 3.5 1 4 0"/></svg>,
  amaro:         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round"><path d="M12 3l3 4h4l-3 4 1 5-5-3-5 3 1-5-3-4h4z"/></svg>,
  bitter:        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round"><path d="M11 3h2l1 4 3-1-1 3 3 1-3 1 1 3-3-1-1 4h-2l-1-4-3 1 1-3-3-1 3-1-1-3 3 1z"/></svg>,
  cordial:       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round"><path d="M9 3h6v2a5 5 0 010 10H9a5 5 0 010-10V3z"/><path d="M12 15v6m-2 0h4"/></svg>,
};

const DEFAULT_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
    <circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 3"/>
  </svg>
);

const S = {
  wrap: {
    background: "rgba(0,0,0,.28)",
    border: "1px solid rgba(34,197,94,.18)",
    borderRadius: "var(--r-lg)",
    padding: 14,
  },
  label: {
    fontFamily: "var(--font-title)", fontSize: 9.5,
    letterSpacing: "2px", color: "var(--text-muted)",
    textTransform: "uppercase", marginBottom: 10,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 6,
  },
  cell: (active, color) => ({
    display: "flex", flexDirection: "column",
    alignItems: "center", gap: 5,
    padding: "10px 6px 8px",
    borderRadius: "var(--r-md)",
    border: `1px solid ${active ? color + "99" : "rgba(34,197,94,.12)"}`,
    background: active ? `${color}22` : "rgba(0,0,0,.22)",
    cursor: "pointer",
    transition: "all .18s",
    transform: active ? "translateY(-1px)" : "none",
    boxShadow: active ? `0 4px 14px ${color}33` : "none",
  }),
  icon: (active, color) => ({
    width: 28, height: 28, color: active ? color : "var(--text-muted)",
    transition: "color .18s",
  }),
  tipoLabel: (active, color) => ({
    fontFamily: "var(--font-title)", fontSize: 9,
    letterSpacing: ".5px", textAlign: "center",
    color: active ? "var(--text-bright)" : "var(--text-muted)",
    transition: "color .18s", lineHeight: 1.2,
  }),
  xpBadge: (active, color) => ({
    fontFamily: "var(--font-body)", fontSize: 9,
    color: active ? color : "var(--text-muted)",
    opacity: active ? 1 : 0.6,
  }),
};

function TypeCell({ tipo, active, onClick }) {
  return (
    <button
      style={S.cell(active, tipo.color)}
      onClick={() => onClick(tipo.id)}
      aria-pressed={active}
      title={`${tipo.label} — ${tipo.xp} XP base`}
      onMouseEnter={e => {
        if (!active) {
          e.currentTarget.style.background = `${tipo.color}12`;
          e.currentTarget.style.borderColor = `${tipo.color}55`;
        }
      }}
      onMouseLeave={e => {
        if (!active) {
          e.currentTarget.style.background = "rgba(0,0,0,.22)";
          e.currentTarget.style.borderColor = "rgba(34,197,94,.12)";
        }
      }}
    >
      <span style={S.icon(active, tipo.color)}>
        {ICONS[tipo.id] || DEFAULT_ICON}
      </span>
      <span style={S.tipoLabel(active, tipo.color)}>{tipo.label}</span>
      <span style={S.xpBadge(active, tipo.color)}>{tipo.xp} XP</span>
    </button>
  );
}

export default function PrepTypeGrid({ tipos, selectedTipo, onSelect }) {
  return (
    <div style={S.wrap}>
      <div style={S.label}>Tipo de Preparación</div>
      <div style={S.grid}>
        {tipos.map(t => (
          <TypeCell
            key={t.id}
            tipo={t}
            active={selectedTipo === t.id}
            onClick={onSelect}
          />
        ))}
      </div>
    </div>
  );
}
