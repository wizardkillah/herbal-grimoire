// ══════════════════════════════════════════════════════════════════════
//  IngredientChip — Chip de ingrediente seleccionado en el caldero
// ══════════════════════════════════════════════════════════════════════
export default function IngredientChip({ ing, onRemove }) {
  return (
    <button
      onClick={() => onRemove(ing.id)}
      title={`Quitar ${ing.n}`}
      style={{
        display: "flex", alignItems: "center", gap: 5,
        background: `${ing.c}22`,
        border: `1px solid ${ing.c}66`,
        borderRadius: "var(--r-full)",
        padding: "4px 10px",
        cursor: "pointer",
        animation: "fadeIn .2s ease",
        transition: "all .15s",
      }}
      onMouseEnter={e => { e.currentTarget.style.background = "rgba(220,60,60,.18)"; e.currentTarget.style.borderColor = "rgba(220,60,60,.45)"; }}
      onMouseLeave={e => { e.currentTarget.style.background = `${ing.c}22`; e.currentTarget.style.borderColor = `${ing.c}66`; }}
    >
      <span style={{ width: 8, height: 8, borderRadius: "50%", background: ing.c, flexShrink: 0, display: "block" }} />
      <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-bright)", whiteSpace: "nowrap" }}>
        {ing.n}
      </span>
    </button>
  );
}
