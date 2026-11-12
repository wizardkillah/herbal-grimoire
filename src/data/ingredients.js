// ══════════════════════════════════════════════════════════════════════
//  GRIMORIO HERBAL v8 — Base de datos de ingredientes (85+ items)
// ══════════════════════════════════════════════════════════════════════

// ── CAMINO VERDE: Hierbas medicinales ────────────────────────────────
export const H_MED = [
  { id:"manzanilla", n:"Manzanilla",     lat:"Matricaria chamomilla",    c:"#f5c842", region:"universal" },
  { id:"valeriana",  n:"Valeriana",      lat:"Valeriana officinalis",    c:"#9c7c52", region:"universal" },
  { id:"lavanda",    n:"Lavanda",        lat:"Lavandula angustifolia",   c:"#9b72cf", region:"universal" },
  { id:"jengibre",   n:"Jengibre",       lat:"Zingiber officinale",      c:"#c8783a", region:"universal" },
  { id:"romero",     n:"Romero",         lat:"Rosmarinus officinalis",   c:"#4a7c59", region:"universal" },
  { id:"menta",      n:"Menta",          lat:"Mentha piperita",          c:"#2d8a4e", region:"universal" },
  { id:"eucalipto",  n:"Eucalipto",      lat:"Eucalyptus globulus",      c:"#4a8a6e", region:"universal" },
  { id:"tomillo",    n:"Tomillo",        lat:"Thymus vulgaris",          c:"#7a9e4a", region:"universal" },
  { id:"calendula",  n:"Caléndula",      lat:"Calendula officinalis",    c:"#f4a820", region:"universal" },
  { id:"boldo",      n:"Boldo",          lat:"Peumus boldus",            c:"#5a7a3a", region:"chile" },
  { id:"llanten",    n:"Llantén",        lat:"Plantago major",           c:"#5c8a30", region:"chile" },
  { id:"matico",     n:"Matico",         lat:"Buddleja globosa",         c:"#3a7a5a", region:"chile" },
  { id:"bailahuen",  n:"Bailahuén",      lat:"Haplopappus baylahuen",    c:"#d4a030", region:"chile" },
  { id:"cedron",     n:"Cedrón",         lat:"Aloysia citrodora",        c:"#a0c040", region:"chile" },
  { id:"canelo",     n:"Canelo",         lat:"Drimys winteri",           c:"#8a5a3a", region:"chile" },
  { id:"paico",      n:"Paico",          lat:"Dysphania ambrosioides",   c:"#4a8a40", region:"andina" },
  { id:"muna",       n:"Muña",           lat:"Minthostachys mollis",     c:"#6a9a50", region:"andina" },
  { id:"quillay",    n:"Quillay",        lat:"Quillaja saponaria",       c:"#a07040", region:"chile" },
  { id:"miel_m",     n:"Miel de Abejas", lat:"Apis mellifera",           c:"#f0a500", region:"universal" },
  { id:"ajo",        n:"Ajo",            lat:"Allium sativum",           c:"#e8e0c0", region:"universal" },
];

// ── CAMINO VERDE: Aromas de té ───────────────────────────────────────
export const H_TE = [
  // Bases
  { id:"te_verde",   n:"Té Verde",         lat:"Camellia sinensis",         c:"#70b060", region:"universal", sub:"base" },
  { id:"te_negro",   n:"Té Negro",         lat:"Camellia sinensis neg.",     c:"#604030", region:"universal", sub:"base" },
  { id:"te_blanco",  n:"Té Blanco",        lat:"Camellia sinensis alba",     c:"#e0d8c8", region:"universal", sub:"base" },
  { id:"te_oolong",  n:"Oolong",           lat:"Camellia sinensis",          c:"#c08040", region:"universal", sub:"base" },
  { id:"rooibos",    n:"Rooibos",          lat:"Aspalathus linearis",        c:"#c04020", region:"universal", sub:"base" },
  { id:"mate",       n:"Yerba Mate",       lat:"Ilex paraguariensis",        c:"#608030", region:"andina",    sub:"base" },
  // Florales
  { id:"jazmin",     n:"Jazmín",           lat:"Jasminum officinale",        c:"#f0e8d8", region:"universal", sub:"floral" },
  { id:"rosa_t",     n:"Rosa",             lat:"Rosa centifolia",            c:"#e06080", region:"universal", sub:"floral" },
  { id:"hibisco",    n:"Hibisco",          lat:"Hibiscus sabdariffa",        c:"#e02060", region:"universal", sub:"floral" },
  { id:"lavanda_t",  n:"Lavanda",          lat:"Lavandula angustifolia",     c:"#9b72cf", region:"universal", sub:"floral" },
  { id:"azahar",     n:"Azahar",           lat:"Citrus aurantium flos",      c:"#fff0d0", region:"universal", sub:"floral" },
  { id:"man_t",      n:"Manzanilla",       lat:"Matricaria chamomilla",      c:"#f5c842", region:"universal", sub:"floral" },
  // Cítricos
  { id:"nar_c",      n:"Cáscara Naranja",  lat:"Citrus sinensis",            c:"#f47820", region:"universal", sub:"citrico" },
  { id:"lim_c",      n:"Cáscara Limón",    lat:"Citrus limon",               c:"#e8d84a", region:"universal", sub:"citrico" },
  { id:"bergamota",  n:"Bergamota",        lat:"Citrus bergamia",            c:"#d4e030", region:"universal", sub:"citrico" },
  { id:"pomelo_c",   n:"Pomelo",           lat:"Citrus paradisi",            c:"#f0a040", region:"universal", sub:"citrico" },
  // Especias
  { id:"canela_t",   n:"Canela",           lat:"Cinnamomum verum",           c:"#a06030", region:"universal", sub:"especia" },
  { id:"cardamomo",  n:"Cardamomo",        lat:"Elettaria cardamomum",       c:"#80a030", region:"universal", sub:"especia" },
  { id:"jengibre_t", n:"Jengibre",         lat:"Zingiber officinale",        c:"#c8783a", region:"universal", sub:"especia" },
  { id:"anis_t",     n:"Anís Estrella",    lat:"Illicium verum",             c:"#d4b060", region:"universal", sub:"especia" },
  { id:"clavo_t",    n:"Clavo",            lat:"Syzygium aromaticum",        c:"#604020", region:"universal", sub:"especia" },
  { id:"pimienta_r", n:"Pimienta Rosa",    lat:"Schinus molle",              c:"#e05060", region:"andina",    sub:"especia" },
  // Dulces
  { id:"miel_t",     n:"Miel",             lat:"Apis mellifera",             c:"#f0a500", region:"universal", sub:"dulce" },
  { id:"vanilla_t",  n:"Vainilla",         lat:"Vanilla planifolia",         c:"#f0d898", region:"universal", sub:"dulce" },
  { id:"stevia_t",   n:"Stevia",           lat:"Stevia rebaudiana",          c:"#80c040", region:"andina",    sub:"dulce" },
  { id:"panela_t",   n:"Panela",           lat:"Saccharum officinarum",      c:"#a06820", region:"universal", sub:"dulce" },
];

// ── CAMINO OSCURO: Ingredientes de brebajes ──────────────────────────
export const H_OSCURO = [
  { id:"lim_o",      n:"Limón",          c:"#e8d84a", region:"universal" },
  { id:"nar_o",      n:"Naranja",        c:"#f47820", region:"universal" },
  { id:"framb",      n:"Frambuesa",      c:"#e04070", region:"universal" },
  { id:"maracuya",   n:"Maracuyá",       c:"#f0c030", region:"universal" },
  { id:"menta_o",    n:"Menta fresca",   c:"#2d8a4e", region:"universal" },
  { id:"jengibre_o", n:"Jengibre",       c:"#c8783a", region:"universal" },
  { id:"canela_o",   n:"Canela",         c:"#a06030", region:"universal" },
  { id:"albahaca",   n:"Albahaca",       c:"#50a040", region:"universal" },
  { id:"rosa_o",     n:"Rosa",           c:"#e06080", region:"universal" },
  { id:"miel_o",     n:"Miel",           c:"#f0a500", region:"universal" },
  { id:"anis_o",     n:"Anís Estrella",  c:"#d4b060", region:"universal" },
  { id:"hierbabuena",n:"Hierbabuena",    c:"#40a060", region:"universal" },
];

// ── CAMINO OSCURO: Licores ───────────────────────────────────────────
export const LICORES = [
  { id:"pisco",     n:"Pisco",             c:"#d4c080", region:"chile",   raro:true },
  { id:"aguard",    n:"Aguardiente",        c:"#c89040", region:"chile",   raro:true },
  { id:"chicha",    n:"Chicha de Uva",      c:"#9050a0", region:"chile",   raro:true },
  { id:"mosto",     n:"Mosto Ferm.",        c:"#7040c0", region:"andina",  raro:true },
  { id:"ron",       n:"Ron",                c:"#a06020", region:"universal" },
  { id:"vodka",     n:"Vodka",              c:"#c0e0f0", region:"universal" },
  { id:"gin",       n:"Gin",                c:"#80c0a0", region:"universal" },
  { id:"tequila",   n:"Tequila",            c:"#c0c040", region:"universal" },
  { id:"vino_t",    n:"Vino Tinto",         c:"#803040", region:"universal" },
  { id:"vino_b",    n:"Vino Blanco",        c:"#f0e080", region:"universal" },
  { id:"cerveza_a", n:"Cerveza Artesanal",  c:"#d4a030", region:"universal" },
  { id:"kombucha",  n:"Kombucha",           c:"#a0c080", region:"universal", raro:true },
];

// ── CAMINO OSCURO: Artesanales ───────────────────────────────────────
export const H_ART = [
  { id:"lim_art",    n:"Limón (ralladura)",   c:"#f0e040", region:"universal", sub:"citrico" },
  { id:"nar_art",    n:"Naranja (ralladura)", c:"#f47820", region:"universal", sub:"citrico" },
  { id:"berg_art",   n:"Bergamota",           c:"#d4e030", region:"universal", sub:"citrico" },
  { id:"limeta",     n:"Limeta / Lima",       c:"#80c040", region:"universal", sub:"citrico" },
  { id:"pomelo_art", n:"Pomelo (ralladura)",  c:"#f0a040", region:"universal", sub:"citrico" },
  { id:"yuzu",       n:"Yuzu",                c:"#f0d020", region:"universal", sub:"citrico", raro:true },
  { id:"nar_am",     n:"Naranja Amarga",      c:"#e05010", region:"universal", sub:"citrico", raro:true },
  { id:"mandarina",  n:"Mandarina",           c:"#f06820", region:"universal", sub:"citrico" },
  { id:"menta_art",  n:"Menta fresca",        c:"#2d8a4e", region:"universal", sub:"hierba" },
  { id:"albah_art",  n:"Albahaca",            c:"#50a040", region:"universal", sub:"hierba" },
  { id:"romero_art", n:"Romero",              c:"#4a7c59", region:"universal", sub:"hierba" },
  { id:"tomillo_art",n:"Tomillo",             c:"#7a9e4a", region:"universal", sub:"hierba" },
  { id:"lavanda_art",n:"Lavanda",             c:"#9b72cf", region:"universal", sub:"hierba" },
  { id:"cedron_art", n:"Cedrón",              c:"#a0c040", region:"chile",     sub:"hierba" },
  { id:"hinojo",     n:"Hinojo",              c:"#80a040", region:"universal", sub:"hierba" },
  { id:"canela_art", n:"Canela en rama",      c:"#a06030", region:"universal", sub:"especia" },
  { id:"vaini_art",  n:"Vainilla (vaina)",    c:"#f0d898", region:"universal", sub:"especia", raro:true },
  { id:"card_art",   n:"Cardamomo",           c:"#80a030", region:"universal", sub:"especia" },
  { id:"clavo_art",  n:"Clavo de olor",       c:"#604020", region:"universal", sub:"especia" },
  { id:"azafran",    n:"Azafrán",             c:"#f0a010", region:"universal", sub:"especia", raro:true },
  { id:"jeng_art",   n:"Jengibre",            c:"#c8783a", region:"universal", sub:"especia" },
  { id:"anis_art",   n:"Anís estrella",       c:"#d4b060", region:"universal", sub:"especia" },
  { id:"alc_neut",   n:"Alcohol Neutro 96°",  c:"#d4e8f8", region:"universal", sub:"alcohol" },
  { id:"pisco_art",  n:"Pisco Base",          c:"#d4c080", region:"chile",     sub:"alcohol", raro:true },
  { id:"vodka_art",  n:"Vodka Base",          c:"#c0e0f0", region:"universal", sub:"alcohol" },
  { id:"grappa",     n:"Grappa / Orujo",      c:"#c080a0", region:"universal", sub:"alcohol", raro:true },
];

// ── Bases por camino ─────────────────────────────────────────────────
export const BASES_VERDE  = [
  { id:"agua_c", n:"Agua Caliente",   c:"#ff9060" },
  { id:"agua",   n:"Agua",            c:"#a8d8ea" },
  { id:"miel_b", n:"Miel (base)",     c:"#f0a500" },
  { id:"cera",   n:"Cera Abeja",      c:"#e8c84a" },
  { id:"alc_b",  n:"Alcohol",         c:"#d4e8f8" },
  { id:"vinagre",n:"Vinagre Manzana", c:"#c8a860" },
];
export const BASES_TE     = [
  { id:"a75",    n:"Agua 75°C",       c:"#ffa060" },
  { id:"a85",    n:"Agua 85°C",       c:"#ff8040" },
  { id:"a100",   n:"Agua 100°C",      c:"#ff5020" },
  { id:"leche",  n:"Leche",           c:"#f8f0e8" },
  { id:"leche_av",n:"Leche Avena",    c:"#e8d8a0" },
  { id:"lco_b",  n:"Leche Coco",      c:"#f0f0e0" },
  { id:"agua_f", n:"Agua Fría (cold brew)", c:"#c0e8ff" },
];
export const BASES_OSCURO = [
  { id:"hielo",  n:"Hielo",           c:"#c0e8ff" },
  { id:"jlim",   n:"Jugo Limón",      c:"#f0e040" },
  { id:"jarabe", n:"Jarabe Simple",   c:"#f0c040" },
  { id:"tonica", n:"Agua Tónica",     c:"#c0f0e0" },
  { id:"jnar",   n:"Jugo Naranja",    c:"#f08020" },
  { id:"champan",n:"Champán",         c:"#f0f080" },
  { id:"cerveza_b",n:"Cerveza",       c:"#d4a030" },
];
export const BASES_ART    = [
  { id:"alc_a",  n:"Alcohol Neutro",  c:"#d4e8ff" },
  { id:"pisco_a",n:"Pisco Base",      c:"#d4c080" },
  { id:"vodka_a",n:"Vodka Base",      c:"#c0e0f0" },
  { id:"ron_a",  n:"Ron Blanco",      c:"#f0d0a0" },
  { id:"agua_r", n:"Agua Reposada",   c:"#a8d8ea" },
];

export const BASES_BY_SUBPATH = {
  med:       BASES_VERDE,
  te:        BASES_TE,
  brebaje:   BASES_OSCURO,
  artesanal: BASES_ART,
};

// ── Helpers ───────────────────────────────────────────────────────────
export const getIngredientsBySubpath = (subpath, ingTab = "principal", filtroRegion = "todas") => {
  if (subpath === "med") {
    if (ingTab === "base") return BASES_VERDE;
    return H_MED.filter(h => filtroRegion === "todas" || h.region === filtroRegion);
  }
  if (subpath === "te") {
    if (ingTab === "base") return BASES_TE;
    const subMap = { principal:"base", floral:"floral", citrico:"citrico", especia:"especia", dulce:"dulce" };
    return H_TE.filter(i => i.sub === (subMap[ingTab] || "base"));
  }
  if (subpath === "brebaje") {
    if (ingTab === "licores") return LICORES;
    if (ingTab === "base")    return BASES_OSCURO;
    return H_OSCURO.filter(h => filtroRegion === "todas" || h.region === filtroRegion);
  }
  if (subpath === "artesanal") {
    if (ingTab === "base")      return BASES_ART;
    const subMap = { citricos:"citrico", hierbas_a:"hierba", especias:"especia", alcohol_a:"alcohol" };
    return H_ART.filter(i => i.sub === (subMap[ingTab] || "citrico"));
  }
  return [];
};

export const getIngTabsForSubpath = (subpath) => {
  if (subpath === "med")       return [
    { id:"principal", l:"Hierbas" }, { id:"base", l:"Base" }
  ];
  if (subpath === "te")        return [
    { id:"principal", l:"Base Té" }, { id:"floral", l:"Floral" },
    { id:"citrico", l:"Cítrico" },   { id:"especia", l:"Especias" },
    { id:"dulce", l:"Dulces" },      { id:"base", l:"Agua" }
  ];
  if (subpath === "brebaje")   return [
    { id:"principal", l:"Ingredientes" }, { id:"licores", l:"Licores" }, { id:"base", l:"Bases" }
  ];
  if (subpath === "artesanal") return [
    { id:"citricos", l:"Cítricos" }, { id:"hierbas_a", l:"Hierbas" },
    { id:"especias", l:"Especias" }, { id:"alcohol_a", l:"Alcohol" }, { id:"base", l:"Base" }
  ];
  return [];
};
