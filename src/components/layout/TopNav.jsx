// ══════════════════════════════════════════════════════════════════════
//  TopNav — Barra de navegación superior (sección 8.1 doc v8)
// ══════════════════════════════════════════════════════════════════════
const S = {
  nav: {
    display: "flex", justifyContent: "center", gap: 2,
    padding: "8px 20px 0",
    borderBottom: "1px solid rgba(34,197,94,0.15)",
    background: "rgba(8,15,8,0.7)",
    backdropFilter: "blur(8px)",
    position: "sticky", top: 0, zIndex: 50,
  },
  btn: (active) => ({
    fontFamily: "var(--font-title)",
    fontSize: 10, letterSpacing: "2px",
    padding: "10px 16px 8px",
    background: "transparent", border: "none",
    borderBottom: `2px solid ${active ? "var(--green-500)" : "transparent"}`,
    color: active ? "var(--text-bright)" : "var(--text-muted)",
    cursor: "pointer",
    transition: "all .2s",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
  }),
};

const TABS = [
  { id: "med",       label: "Pociones Herbales" },
  { id: "te",        label: "Tés Aromáticos" },
  { id: "brebaje",   label: "Brebajes Oscuros" },
  { id: "artesanal", label: "Licores Artesanales" },
];

export default function TopNav({ subpath, darkUnlocked, onSelect }) {
  return (
    <nav style={S.nav} aria-label="Tipos de preparación">
      {TABS.map(tab => {
        const isOscuro = tab.id === "brebaje" || tab.id === "artesanal";
        const locked   = isOscuro && !darkUnlocked;
        return (
          <button
            key={tab.id}
            style={S.btn(subpath === tab.id)}
            onClick={() => !locked && onSelect(tab.id)}
            disabled={locked}
            title={locked ? "Desbloquea al nivel 5" : tab.label}
            aria-current={subpath === tab.id ? "page" : undefined}
          >
            {tab.label}
            {locked && (
              <span style={{ marginLeft: 5, opacity: 0.5, fontSize: 9 }}>🔒</span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
