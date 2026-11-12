// ══════════════════════════════════════════════════════════════════════
//  CalderoSVG — Caldero redondo estilo cartoon con personaje (FASE 3)
//  Sin dependencias externas, todo SVG + CSS keyframes.
// ══════════════════════════════════════════════════════════════════════
import { useState, useEffect, useRef } from "react";

// ── Paleta dinámica ────────────────────────────────────────────────────
const PALETTE = {
  verde: {
    liquid:      "#00c864",
    liquidDark:  "#004d28",
    liquidMid:   "#00a050",
    bubbleHi:    "#a0ffcc",
    bubbleMid:   "#00e070",
    bubbleLo:    "#007040",
    glow:        "rgba(0,200,100,.55)",
    glowRing:    "#00e070",
    flame:       ["#ff8800", "#ffc000", "#ff3300"],
    vapor:       "rgba(80,255,140,.22)",
    rimHi:       "#5a7a6a",
    rimLo:       "#2a3a32",
    clothes:     "#2d7a2d",
    clothesDark: "#1a4a1a",
    eyes:        "#1a7a1a",
    particle:    "#80ffb0",
  },
  oscuro: {
    liquid:      "#8030e0",
    liquidDark:  "#2a0060",
    liquidMid:   "#6020c0",
    bubbleHi:    "#e0b0ff",
    bubbleMid:   "#b060ff",
    bubbleLo:    "#5010a0",
    glow:        "rgba(160,60,255,.55)",
    glowRing:    "#b060ff",
    flame:       ["#5000e0", "#a030ff", "#ff00c0"],
    vapor:       "rgba(180,80,255,.22)",
    rimHi:       "#6a5a8a",
    rimLo:       "#2a1a3a",
    clothes:     "#4a1a8a",
    clothesDark: "#2a0a50",
    eyes:        "#9050e0",
    particle:    "#d0a0ff",
  },
};

// ── Posiciones de burbuja fijas ────────────────────────────────────────
const BUBBLE_SLOTS = [
  { x: 108, r: 15, dur: 2.5, del: 0.0 },
  { x: 135, r: 13, dur: 2.9, del: 0.8 },
  { x: 156, r: 17, dur: 2.2, del: 1.5 },
  { x: 118, r: 11, dur: 3.1, del: 2.2 },
  { x: 148, r: 12, dur: 2.7, del: 0.4 },
];

// ══════════════════════════════════════════════════════════════════════
export default function CalderoSVG({ camino = "verde", ingredientes = [], lastAdded = null }) {
  const p       = PALETTE[camino] || PALETTE.verde;
  const count   = ingredientes.length;
  const active  = count > 0;
  const bubbles = BUBBLE_SLOTS.slice(0, active ? Math.min(2 + count, 5) : 0);

  // Nivel del líquido (y del borde superior) — sube con ingredientes
  const liqY = active ? 106 : 145;

  // Partículas al añadir ingrediente
  const [particles, setParticles] = useState([]);
  const prevAdded = useRef(null);
  const particleTimers = useRef(new Set());
  useEffect(() => () => {
    particleTimers.current.forEach(clearTimeout);
    particleTimers.current.clear();
    prevAdded.current = null;
  }, []);
  useEffect(() => {
    if (lastAdded && lastAdded.id !== prevAdded.current) {
      prevAdded.current = lastAdded.id;
      const pid = lastAdded.id;
      setParticles(ps => [...ps, { id: pid, color: lastAdded.c || p.particle }]);
      const t = setTimeout(() => {
        setParticles(ps => ps.filter(x => x.id !== pid));
        particleTimers.current.delete(t);
      }, 900);
      particleTimers.current.add(t);
    }
  }, [lastAdded, p.particle]);

  return (
    <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "flex-end" }}>

      {/* ── Keyframes inline ── */}
      <style>{`
        @keyframes cBob    { 0%,100%{transform:translateY(0)}    50%{transform:translateY(-5px)} }
        @keyframes cStirL  { 0%,100%{transform:rotate(-22deg)}   50%{transform:rotate(22deg)}  }
        @keyframes cWaveR  { 0%,100%{transform:translateY(0) rotate(-8deg)}  50%{transform:translateY(-5px) rotate(8deg)} }
        @keyframes cBubble { 0%{transform:translateY(0) scale(1);opacity:.88}
                             65%{transform:translateY(-32px) scale(1.1);opacity:.5}
                             100%{transform:translateY(-50px) scale(.55);opacity:0} }
        @keyframes cVapor  { 0%{transform:translateY(0) scaleX(1);opacity:.4}
                             100%{transform:translateY(-28px) scaleX(1.6);opacity:0} }
        @keyframes cFlame  { 0%,100%{transform:scaleY(1) scaleX(1)}
                             40%{transform:scaleY(1.14) scaleX(.9)}
                             70%{transform:scaleY(.93) scaleX(1.07)} }
        @keyframes cGlow   { 0%,100%{opacity:.45} 50%{opacity:.85} }
        @keyframes cRing   { 0%{transform:scale(1);opacity:.9} 100%{transform:scale(1.75);opacity:0} }
        @keyframes cSpark  { 0%{transform:translate(0,0) scale(1.2);opacity:1}
                             100%{transform:translate(var(--tx),var(--ty)) scale(0);opacity:0} }
        @keyframes cLiqRise{ from{clip-path:inset(100% 0 0 0)} to{clip-path:inset(0 0 0 0)} }
      `}</style>

      <svg viewBox="0 0 260 235" width={280} height={253} style={{ overflow: "visible" }}>
        <defs>
          {/* Cuerpo del caldero */}
          <linearGradient id="cBody" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"   stopColor="#404055" />
            <stop offset="35%"  stopColor="#1e1e2e" />
            <stop offset="100%" stopColor="#0a0a14" />
          </linearGradient>

          {/* Líquido */}
          <radialGradient id="cLiq" cx="38%" cy="38%" r="62%">
            <stop offset="0%"   stopColor={p.liquid} />
            <stop offset="55%"  stopColor={p.liquidMid} />
            <stop offset="100%" stopColor={p.liquidDark} />
          </radialGradient>

          {/* Burbuja 3D */}
          <radialGradient id="cBub" cx="28%" cy="28%" r="60%">
            <stop offset="0%"   stopColor="white"       stopOpacity=".8"  />
            <stop offset="30%"  stopColor={p.bubbleHi}  stopOpacity=".75" />
            <stop offset="70%"  stopColor={p.bubbleMid} stopOpacity=".6"  />
            <stop offset="100%" stopColor={p.bubbleLo}  stopOpacity=".5"  />
          </radialGradient>

          {/* Glow exterior */}
          <radialGradient id="cGlowG" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor={p.glowRing} stopOpacity=".45" />
            <stop offset="100%" stopColor={p.glowRing} stopOpacity="0"   />
          </radialGradient>

          {/* Rim metálico */}
          <linearGradient id="cRim" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor={p.rimHi} />
            <stop offset="100%" stopColor={p.rimLo} />
          </linearGradient>

          {/* Clip interior caldero */}
          <clipPath id="cClip">
            <path d="M 70 116 Q 48 152 54 188 Q 60 214 130 217 Q 200 214 206 188 Q 212 152 190 116 Z" />
          </clipPath>
        </defs>

        {/* ═══ Glow externo bajo caldero ═══ */}
        {active && (
          <ellipse cx="130" cy="210" rx="78" ry="18"
            fill="url(#cGlowG)"
            style={{ animation: "cGlow 2.6s ease-in-out infinite" }}
          />
        )}

        {/* ═══ Llama ═══ */}
        {active && (
          <g style={{ transformOrigin: "130px 220px", animation: "cFlame 1.7s ease-in-out infinite" }}>
            <ellipse cx="130" cy="222" rx="30" ry="13" fill={p.flame[0]} opacity=".65" />
            <ellipse cx="130" cy="218" rx="20" ry="10" fill={p.flame[1]} opacity=".8"  />
            <ellipse cx="130" cy="213" rx="11" ry="7"  fill={p.flame[2]} opacity=".95" />
          </g>
        )}

        {/* ═══ Patas ═══ */}
        <g fill="#1a1a2a" stroke="#2e2e40" strokeWidth="1">
          <rect x="82"  y="215" width="20" height="13" rx="4" />
          <rect x="120" y="218" width="20" height="13" rx="4" />
          <rect x="158" y="215" width="20" height="13" rx="4" />
        </g>
        {/* Brillo patas */}
        <g fill="none" stroke="rgba(255,255,255,.07)" strokeWidth="3" strokeLinecap="round">
          <line x1="87" y1="217" x2="87" y2="225" />
          <line x1="125" y1="220" x2="125" y2="228" />
          <line x1="163" y1="217" x2="163" y2="225" />
        </g>

        {/* ═══ Cuerpo del caldero ═══ */}
        <path
          d="M 70 116 Q 48 152 54 188 Q 60 214 130 217 Q 200 214 206 188 Q 212 152 190 116 Z"
          fill="url(#cBody)" stroke="#3a3a52" strokeWidth="2"
        />
        {/* Reflejo lateral izquierdo */}
        <path d="M 78 128 Q 62 160 65 192"
          fill="none" stroke="rgba(255,255,255,.09)" strokeWidth="10" strokeLinecap="round" />
        {/* Sombra lateral derecho */}
        <path d="M 182 128 Q 196 160 193 192"
          fill="none" stroke="rgba(0,0,0,.25)" strokeWidth="8" strokeLinecap="round" />

        {/* ═══ Líquido (clipped) ═══ */}
        {active && (
          <g clipPath="url(#cClip)">
            <rect x="45" y={liqY} width="220" height={220 - liqY}
              fill="url(#cLiq)"
            />
            {/* Reflejo circular sobre la superficie */}
            <ellipse cx="105" cy={liqY + 8} rx="15" ry="4"
              fill="rgba(255,255,255,.12)" />
          </g>
        )}

        {/* ═══ Brazo izquierdo del personaje + cuchara (DEBAJO del aro) ═══ */}
        <g style={{ transformBox: "fill-box", transformOrigin: "40% 45%",
                    animation: active ? "cStirL 2.3s ease-in-out infinite" : "none" }}>
          {/* Manga */}
          <path d="M 100 110 Q 108 120 116 128"
            stroke={p.clothes} strokeWidth="11" strokeLinecap="round" fill="none" />
          {/* Brazo piel */}
          <path d="M 100 110 Q 108 120 116 128"
            stroke="#d49060" strokeWidth="7" strokeLinecap="round" fill="none" />
          {/* Mango cuchara */}
          <line x1="116" y1="128" x2="130" y2="138"
            stroke="#9090a0" strokeWidth="3.5" strokeLinecap="round" />
          {/* Cabeza cuchara */}
          <ellipse cx="134" cy="141" rx="7" ry="5"
            fill="#7070a0" stroke="#9090a0" strokeWidth="1" />
        </g>

        {/* ═══ Personaje (boba arriba/abajo) ═══ */}
        <g style={{ animation: "cBob 2.3s ease-in-out infinite" }}>

          {/* Cuerpo/túnica (detrás del aro) */}
          <rect x="106" y="106" width="48" height="22" rx="10" fill={p.clothes} />
          <rect x="110" y="106" width="40" height="18" rx="8"  fill={p.clothesDark} opacity=".4" />
          {/* Botón decorativo */}
          <circle cx="130" cy="114" r="3.5" fill={p.glowRing} opacity=".7" />
          <circle cx="130" cy="114" r="2"   fill="white"      opacity=".5" />

          {/* Brazo derecho levantado con cuchara */}
          <g style={{ transformBox: "fill-box", transformOrigin: "50% 80%",
                      animation: active ? "cWaveR 2.3s ease-in-out infinite" : "none" }}>
            {/* Manga */}
            <path d="M 158 112 Q 168 100 174 88"
              stroke={p.clothes} strokeWidth="11" strokeLinecap="round" fill="none" />
            {/* Brazo piel */}
            <path d="M 158 112 Q 168 100 174 88"
              stroke="#d49060" strokeWidth="7" strokeLinecap="round" fill="none" />
            {/* Mango */}
            <line x1="174" y1="88" x2="178" y2="75"
              stroke="#aaaabc" strokeWidth="3" strokeLinecap="round" />
            {/* Cabeza cuchara */}
            <ellipse cx="179" cy="71" rx="5" ry="4"
              fill="#8888aa" stroke="#aaaabc" strokeWidth="1" />
            {/* Destello cuchara */}
            <ellipse cx="177" cy="69" rx="2" ry="1.2"
              fill="rgba(255,255,255,.55)" />
          </g>

          {/* ── Cabeza ── */}
          {/* Sombra cabeza */}
          <ellipse cx="130" cy="96" rx="27" ry="9" fill="rgba(0,0,0,.18)" />
          {/* Cabeza */}
          <circle cx="130" cy="78" r="29" fill="#f0b87a" />
          {/* Sombra inferior cabeza (profundidad) */}
          <ellipse cx="130" cy="95" rx="21" ry="7" fill="rgba(0,0,0,.1)" />

          {/* Mejillas */}
          <circle cx="111" cy="86" r="10" fill="#e88060" opacity=".32" />
          <circle cx="149" cy="86" r="10" fill="#e88060" opacity=".32" />

          {/* Ceja izquierda */}
          <path d="M 112 69 Q 119 65 126 68"
            stroke="#8a4a20" strokeWidth="2.2" fill="none" strokeLinecap="round" />
          {/* Ceja derecha */}
          <path d="M 134 68 Q 141 65 148 69"
            stroke="#8a4a20" strokeWidth="2.2" fill="none" strokeLinecap="round" />

          {/* Ojo izquierdo */}
          <ellipse cx="119" cy="78" rx="8.5" ry="10" fill="white" />
          <circle  cx="121" cy="79" r="6"   fill={p.eyes}  />
          <circle  cx="122" cy="77" r="3.2" fill="#0a0a0a" />
          {/* Reflejo ojo */}
          <circle  cx="124" cy="75" r="1.3" fill="white" />
          <circle  cx="122" cy="80" r=".7"  fill="rgba(255,255,255,.4)" />

          {/* Ojo derecho */}
          <ellipse cx="141" cy="78" rx="8.5" ry="10" fill="white" />
          <circle  cx="139" cy="79" r="6"   fill={p.eyes}  />
          <circle  cx="140" cy="77" r="3.2" fill="#0a0a0a" />
          {/* Reflejo ojo */}
          <circle  cx="142" cy="75" r="1.3" fill="white" />
          <circle  cx="140" cy="80" r=".7"  fill="rgba(255,255,255,.4)" />

          {/* Sonrisa */}
          <path d="M 119 89 Q 130 98 141 89"
            stroke="#b05030" strokeWidth="2.2" fill="none" strokeLinecap="round" />
          {/* Dientito */}
          <rect x="125" y="90" width="10" height="4" rx="1.5" fill="white" opacity=".8" />

          {/* ── Sombrero ── */}
          {/* Ala del sombrero */}
          <ellipse cx="130" cy="52" rx="36" ry="9"   fill={p.clothesDark} />
          <ellipse cx="130" cy="50" rx="33" ry="7.5" fill={p.clothes}     />
          {/* Cuerpo del sombrero (cono) */}
          <path d="M 98 52 Q 104 28 130 7 Q 156 28 162 52 Z"
            fill={p.clothesDark} stroke={p.clothes} strokeWidth="1.2" />
          {/* Reflejo lateral sombrero */}
          <path d="M 120 46 Q 124 28 130 11"
            fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="5" strokeLinecap="round" />
          {/* Banda del sombrero */}
          <rect x="98" y="49" width="64" height="7" rx="1" fill="#0a0a18" />
          {/* Hebilla */}
          <rect x="124" y="50" width="12" height="5" rx="1" fill={p.glowRing} opacity=".6" />
        </g>

        {/* ═══ Aro superior (renderiza SOBRE el cuerpo del personaje) ═══ */}
        <ellipse cx="130" cy="116" rx="60" ry="14" fill="url(#cRim)"  stroke="#505065" strokeWidth="1.5" />
        {/* Sombra interior del aro */}
        <ellipse cx="130" cy="116" rx="53" ry="9"  fill="none" stroke="rgba(0,0,0,.55)" strokeWidth="4"   />
        {/* Brillo superior del aro */}
        <ellipse cx="130" cy="112" rx="47" ry="6"  fill="none" stroke="rgba(255,255,255,.14)" strokeWidth="1.8" />
        {/* Segundo brillo (highlight) */}
        <path d="M 82 112 Q 130 106 178 112"
          fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="3" />

        {/* ═══ Anillo de glow en superficie del líquido ═══ */}
        {active && (
          <ellipse cx="130" cy={liqY} rx="56" ry="10"
            fill="none" stroke={p.glowRing} strokeWidth="1.8" strokeOpacity=".5"
          />
        )}

        {/* ═══ Burbujas esféricas 3D ═══ */}
        {bubbles.map((b, i) => (
          <g key={`bub${i}`}
             style={{ animation: `cBubble ${b.dur}s ease-out ${b.del}s infinite` }}>
            {/* Sombra burbuja */}
            <ellipse cx={b.x + 2} cy={liqY + 2} rx={b.r * .8} ry={b.r * .4}
              fill="rgba(0,0,0,.18)" />
            {/* Burbuja */}
            <circle cx={b.x} cy={liqY - 2} r={b.r} fill="url(#cBub)" />
            {/* Reflejo pequeño en burbuja */}
            <ellipse cx={b.x - b.r * .32} cy={liqY - 2 - b.r * .32}
              rx={b.r * .22} ry={b.r * .15}
              fill="rgba(255,255,255,.7)" />
          </g>
        ))}

        {/* ═══ Vapor / steam ═══ */}
        {active && [0, 1, 2].map(i => (
          <ellipse key={`v${i}`}
            cx={98 + i * 32} cy={liqY - 12}
            rx={7 + i * 2} ry={3.5}
            fill={p.vapor}
            style={{ animation: `cVapor ${2.1 + i * 0.45}s ease-out ${i * 0.65}s infinite` }}
          />
        ))}

        {/* ═══ Anillo de energía al añadir ingrediente ═══ */}
        {particles.map(pt => (
          <ellipse key={`ring${pt.id}`}
            cx="130" cy="116" rx="60" ry="14"
            fill="none" stroke={pt.color} strokeWidth="3"
            style={{ animation: "cRing .65s ease-out forwards" }}
          />
        ))}

        {/* ═══ Partículas de destello ═══ */}
        {particles.map(pt =>
          [0, 60, 120, 180, 240, 300].map(angle => {
            const r = (angle * Math.PI) / 180;
            return (
              <circle key={`sp${pt.id}${angle}`}
                cx={130 + Math.cos(r) * 8}
                cy={116 + Math.sin(r) * 5}
                r="4" fill={pt.color}
                style={{
                  '--tx': `${Math.cos(r) * 36}px`,
                  '--ty': `${Math.sin(r) * 22}px`,
                  animation: "cSpark .7s ease-out forwards",
                  animationDelay: `${(angle / 360) * 0.15}s`,
                }}
              />
            );
          })
        )}

        {/* ═══ Texto vacío ═══ */}
        {!active && (
          <text x="130" y="172" textAnchor="middle"
            fontFamily="var(--font-title)" fontSize="9" letterSpacing="2"
            fill="rgba(255,255,255,.15)">
            CALDERO VACÍO
          </text>
        )}

        {/* ═══ Badge contador ═══ */}
        {count > 0 && (
          <g>
            <circle cx="190" cy="106" r="13" fill="#0a0a18" stroke={p.glowRing} strokeWidth="1.5" />
            <text x="190" y="111" textAnchor="middle"
              fontFamily="var(--font-title)" fontSize="11" fontWeight="bold" fill={p.glowRing}>
              {count}
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}
