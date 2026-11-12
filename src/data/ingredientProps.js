// ══════════════════════════════════════════════════════════════════════
//  GRIMORIO HERBAL v8 — Propiedades de ingredientes (para modal)
// ══════════════════════════════════════════════════════════════════════

export const ING_PROPS = {
  // ─────────────────────────────────────────────────────────────────
  //  H_MED — Hierbas medicinales
  // ─────────────────────────────────────────────────────────────────
  manzanilla: {
    desc: "Planta herbácea de flores blancas y amarillas, una de las hierbas medicinales más utilizadas en el mundo.",
    props: ["Calmante", "Antiinflamatorio", "Antiespasmódico", "Digestivo"],
    uses: ["Insomnio y ansiedad leve", "Dolor menstrual y cólicos", "Gastritis e inflamación gástrica", "Inflamaciones cutáneas"],
    caution: "Evitar en alergia a Asteráceas. No superar dosis terapéutica en embarazo.",
  },
  valeriana: {
    desc: "Raíz de aroma intenso con potente acción sobre el sistema nervioso central. Usada desde la antigüedad para el insomnio.",
    props: ["Sedante", "Ansiolítico", "Hipnótico suave", "Relajante muscular"],
    uses: ["Insomnio y dificultad para dormir", "Ansiedad y nerviosismo", "Migraña tensional", "Espasmos musculares"],
    caution: "No combinar con alcohol ni benzodiacepinas. Puede causar somnolencia diurna.",
  },
  lavanda: {
    desc: "Arbusto aromático con flores violetas. Su aceite esencial es uno de los más estudiados en aromaterapia.",
    props: ["Ansiolítico", "Antidepresivo suave", "Antiséptico", "Cicatrizante"],
    uses: ["Ansiedad y estrés", "Insomnio leve", "Quemaduras y heridas superficiales", "Cefaleas"],
    caution: "Uso externo generalmente seguro. Oral: no superar dosis recomendada.",
  },
  jengibre: {
    desc: "Rizoma tropical de sabor picante. Uno de los antiinflamatorios naturales más potentes y versátiles.",
    props: ["Antiinflamatorio", "Antiemético", "Digestivo", "Circulatorio", "Analgésico"],
    uses: ["Náuseas y vómitos (viaje, embarazo)", "Dolor articular y muscular", "Resfríos y gripe", "Digestión pesada"],
    caution: "Precaución con anticoagulantes. En embarazo, dosis moderadas. Puede causar ardor gástrico.",
  },
  romero: {
    desc: "Hierba aromática mediterránea usada en medicina popular para estimular la circulación y la memoria.",
    props: ["Estimulante circulatorio", "Antioxidante", "Antimicrobiano", "Tónico hepático"],
    uses: ["Mala circulación", "Fatiga mental y concentración", "Dolor de cabeza tensional", "Alopecia (uso externo)"],
    caution: "Evitar en epilepsia y embarazo en dosis elevadas. No usar aceite esencial puro internamente.",
  },
  menta: {
    desc: "Hierba refrescante con alto contenido en mentol. Ampliamente usada para problemas digestivos y respiratorios.",
    props: ["Antiespasmódico", "Digestivo", "Descongestionante", "Analgésico tópico", "Refrescante"],
    uses: ["Síndrome de intestino irritable", "Náuseas y flatulencias", "Congestión nasal", "Dolor de cabeza (tópico)"],
    caution: "No usar en niños menores de 2 años. Evitar en reflujo severo.",
  },
  eucalipto: {
    desc: "Árbol nativo de Australia, naturalizado en Chile. Sus hojas son ricas en eucaliptol, potente expectorante.",
    props: ["Expectorante", "Antiséptico respiratorio", "Antiviral", "Broncodilatador suave"],
    uses: ["Bronquitis y tos", "Sinusitis", "Congestión nasal", "Aromaterapia respiratoria"],
    caution: "No ingerir aceite esencial puro. Evitar en niños pequeños. Puede irritar mucosas en exceso.",
  },
  tomillo: {
    desc: "Hierba aromática mediterránea, potente antiséptico natural con timol como principio activo principal.",
    props: ["Antiséptico", "Expectorante", "Antifúngico", "Antioxidante"],
    uses: ["Tos y bronquitis", "Infecciones respiratorias", "Infecciones urinarias leves", "Mal aliento"],
    caution: "Evitar en embarazo en dosis altas. Posible alergia cruzada con Lamiáceas.",
  },
  calendula: {
    desc: "Flor dorada con extraordinarias propiedades cicatrizantes y antiinflamatorias para uso tópico y oral.",
    props: ["Cicatrizante", "Antiinflamatorio", "Antifúngico", "Inmunomodulador"],
    uses: ["Heridas y quemaduras", "Dermatitis y eccema", "Úlceras gástricas", "Inflamación pélvica"],
    caution: "Alergia potencial en sensibles a Asteráceas. Evitar en embarazo en dosis altas oral.",
  },
  boldo: {
    desc: "Arbusto endémico de Chile. El más representativo de la fitoterapia chilena, con acción hepatoprotectora única.",
    props: ["Hepatoprotector", "Colerético", "Digestivo", "Antiespasmódico", "Antioxidante"],
    uses: ["Enfermedades del hígado y vesícula", "Cálculos biliares", "Dispepsia y flatulencias", "Estreñimiento leve"],
    caution: "NO usar en embarazo ni lactancia. En dosis altas puede ser hepatotóxico. Consultar médico si hay daño hepático grave.",
  },
  llanten: {
    desc: "Hierba silvestre chilena con propiedades antiinflamatorias y expectorantes. Crece en casi todo el país.",
    props: ["Expectorante", "Emoliente", "Antiinflamatorio", "Cicatrizante"],
    uses: ["Tos y bronquitis crónica", "Gastritis", "Heridas e infecciones piel", "Inflamación de mucosas"],
    caution: "Generalmente seguro. Evitar en alergia comprobada a la planta.",
  },
  matico: {
    desc: "Arbusto chileno-andino ampliamente usado para heridas y problemas digestivos. Conocido como 'hierba del soldado'.",
    props: ["Astringente", "Cicatrizante", "Antiulceroso", "Hemostático"],
    uses: ["Úlceras gástricas", "Heridas infectadas", "Diarrea", "Hemorragias leves"],
    caution: "No usar en embarazo en dosis terapéuticas altas.",
  },
  bailahuen: {
    desc: "Arbusto endémico chileno. Uno de los más importantes en medicina tradicional mapuche para problemas digestivos.",
    props: ["Digestivo", "Colerético", "Hepático", "Antiparasitario"],
    uses: ["Problemas hepáticos y biliares", "Parasitosis intestinal", "Dispepsia", "Dolor abdominal"],
    caution: "Evitar en embarazo. No sobrepasar dosis recomendada.",
  },
  cedron: {
    desc: "Hierba aromática chilena con intenso aroma a limón. Muy apreciada para calmar el sistema nervioso.",
    props: ["Sedante suave", "Digestivo", "Antiespasmódico", "Carminativo"],
    uses: ["Ansiedad y nerviosismo", "Insomnio leve", "Cólicos digestivos", "Jaquecas nerviosas"],
    caution: "Uso moderado en embarazo. Fotosensibilizante en uso tópico.",
  },
  canelo: {
    desc: "Árbol sagrado del pueblo mapuche, el más venerado de Chile. Sus hojas y corteza tienen propiedades medicinales únicas.",
    props: ["Antiinflamatorio", "Antimicrobiano", "Cicatrizante", "Febrífico"],
    uses: ["Inflamaciones en general", "Infecciones respiratorias", "Heridas y úlceras", "Fiebre"],
    caution: "Planta de alto simbolismo cultural. Respetar su uso tradicional. Consultar dosis con experto en fitoterapia.",
  },
  paico: {
    desc: "Hierba andina usada ancestralmente para desparasitación. Aroma fuerte característico.",
    props: ["Antiparasitario", "Carminativo", "Antiespasmódico", "Antifúngico"],
    uses: ["Parásitos intestinales", "Flatulencias y cólicos", "Problemas menstruales", "Infecciones fúngicas leves"],
    caution: "Tóxico en dosis altas. Contraindicado en embarazo y niños pequeños. Solo dosis bajas terapéuticas.",
  },
  muna: {
    desc: "Hierba aromática andina, familiar de la menta. Usada por pueblos andinos para el soroche (mal de altura).",
    props: ["Digestivo", "Carminativo", "Circulatorio", "Adaptógeno suave"],
    uses: ["Mal de altura (soroche)", "Flatulencias y digestión lenta", "Dolores reumáticos", "Cansancio"],
    caution: "Generalmente seguro en dosis usuales.",
  },
  quillay: {
    desc: "Árbol chileno cuya corteza contiene saponinas naturales. Históricamente usado como jabón natural y expectorante.",
    props: ["Expectorante", "Emulsionante natural", "Inmunomodulador", "Antimicrobiano"],
    uses: ["Bronquitis y tos persistente", "Limpieza cutánea", "Estimulación inmune", "Infecciones respiratorias"],
    caution: "Uso oral con precaución — las saponinas en exceso son irritantes gastrointestinales.",
  },
  miel_m: {
    desc: "Producto natural de las abejas, con propiedades antibacterianas, nutritivas y cicatrizantes reconocidas mundialmente.",
    props: ["Antibacteriano natural", "Cicatrizante", "Nutritivo", "Antioxidante", "Expectorante suave"],
    uses: ["Heridas y quemaduras (tópico)", "Tos e irritación garganta", "Gastritis", "Potenciador de infusiones"],
    caution: "NO dar a menores de 1 año (riesgo botulismo). Controlar en diabetes.",
  },
  ajo: {
    desc: "Bulbo de extraordinarias propiedades medicinales. Uno de los antibióticos naturales más poderosos conocidos.",
    props: ["Antibiótico natural", "Antifúngico", "Cardioprotector", "Hipotensor", "Inmunoestimulante"],
    uses: ["Infecciones respiratorias", "Hipertensión arterial", "Aterosclerosis", "Parasitosis", "Inmunidad baja"],
    caution: "Interacción con anticoagulantes y antihipertensivos. Puede irritar mucosa gástrica en ayunas.",
  },

  // ─────────────────────────────────────────────────────────────────
  //  H_TE — Bases de té
  // ─────────────────────────────────────────────────────────────────
  te_verde: {
    desc: "Camellia sinensis sin oxidar. El té más rico en catequinas y L-teanina. Origen China/Japón.",
    props: ["Antioxidante potente", "Estimulante suave", "Termogénico", "Neuroprotector"],
    uses: ["Concentración y claridad mental", "Metabolismo y control peso", "Salud cardiovascular", "Protección celular"],
    caution: "Cafeína moderada. Evitar en insomnio severo y gestantes. No tomar en ayunas si hay gastritis.",
  },
  te_negro: {
    desc: "Té completamente oxidado, con mayor contenido de cafeína y cuerpo que el verde. Base del English Breakfast.",
    props: ["Estimulante", "Antioxidante", "Digestivo post-comida", "Astringente"],
    uses: ["Energía y alerta matutina", "Digestión tras comidas grasas", "Diarrea leve (astringente)", "Concentración"],
    caution: "Alto contenido de cafeína. Limitar en insomnio, ansiedad, hipertensión.",
  },
  te_blanco: {
    desc: "Yemas y hojas más jóvenes de Camellia sinensis, apenas procesadas. El té más delicado y antioxidante.",
    props: ["Antioxidante muy alto", "Antienvejecimiento", "Suave estimulante", "Antibacteriano"],
    uses: ["Salud de la piel", "Antienvejecimiento celular", "Relajación suave", "Salud dental"],
    caution: "Cafeína baja. Generalmente bien tolerado.",
  },
  te_oolong: {
    desc: "Té semi-oxidado de China y Taiwán. Balance único entre la frescura del verde y la calidez del negro.",
    props: ["Antioxidante", "Termogénico", "Digestivo", "Equilibrante"],
    uses: ["Control de peso", "Salud metabólica", "Concentración sostenida", "Digestión y absorción de grasas"],
    caution: "Cafeína moderada. El Wulong tiene efecto termogénico moderado.",
  },
  rooibos: {
    desc: "Planta sudafricana sin cafeína. Roja y dulce naturalmente. La mejor alternativa al té para niños y embarazadas.",
    props: ["Sin cafeína", "Antioxidante (aspalathina)", "Antiinflamatorio", "Relajante"],
    uses: ["Bebida nocturna", "Niños y embarazadas", "Alergias e inflamación", "Insomnio leve"],
    caution: "Prácticamente sin contraindicaciones. Seguro para todas las edades.",
  },
  mate: {
    desc: "Infusión ancestral del Río de la Plata. Rica en mateína (cafeína), vitaminas y minerales. Energizante único.",
    props: ["Estimulante potente", "Rico en vitaminas B", "Termogénico", "Digestivo", "Saciante"],
    uses: ["Energía y rendimiento físico", "Concentración prolongada", "Control de apetito", "Fatiga"],
    caution: "Alta cafeína. Contraindicado en HTA, insomnio, ansiedad. Bebida muy caliente asociada a cáncer esofágico.",
  },
  jazmin: {
    desc: "Flor de jazmín sumamente aromática. Usada para perfumar tés verdes y como calmante emocional.",
    props: ["Ansiolítico", "Aromático", "Antidepresivo suave", "Afrodisíaco"],
    uses: ["Ansiedad y estrés", "Depresión leve", "Insomnio emocional", "Blend perfumado"],
    caution: "Generalmente seguro. Posible alergia en sensibles.",
  },
  rosa_t: {
    desc: "Pétalos de rosa centifolia. Aromáticos, elegantes y con suaves propiedades medicinales.",
    props: ["Astringente", "Antioxidante", "Antiinflamatorio", "Afrodisíaco", "Tónico uterino"],
    uses: ["Dolor menstrual", "Blend floral aromático", "Salud de la piel", "Equilibrio emocional"],
    caution: "Usar pétalos sin tratar con pesticidas. Seguro en cantidades usuales.",
  },
  hibisco: {
    desc: "Flor ácida y roja de Hibiscus sabdariffa. Antioxidante potente y uno de los mejores tés para la presión.",
    props: ["Hipotensor", "Diurético", "Antioxidante muy alto", "Refrescante", "Vitamina C natural"],
    uses: ["Presión arterial alta", "Sobrepeso e inflamación", "Fiebre (bebida fría)", "Salud renal"],
    caution: "Puede bajar la presión significativamente. Precaución con hipotensores. Evitar en embarazo.",
  },
  lavanda_t: {
    desc: "Flores de lavanda para té. El mismo perfil relajante de la lavanda medicinal en formato aromático.",
    props: ["Ansiolítico", "Sedante suave", "Antiespasmódico", "Aromático floral"],
    uses: ["Ansiedad y nerviosismo", "Insomnio", "Cefaleas tensionales", "Blend floral elegante"],
    caution: "No sobrepasar dosis usuales. Puede potenciar sedantes.",
  },
  azahar: {
    desc: "Flores de naranjo amargo. Suave sedante natural con maravilloso aroma. Muy usado en meditación.",
    props: ["Ansiolítico", "Sedante suave", "Antiespasmódico", "Digestivo"],
    uses: ["Nerviosismo e insomnio", "Espasmos digestivos", "Meditación y relajación", "Palpitaciones nerviosas"],
    caution: "Seguro en dosis usuales. Interacción potencial con sedantes farmacológicos.",
  },
  man_t: {
    desc: "Manzanilla en formato de té aromático. Mismas propiedades calmantes y digestivas.",
    props: ["Calmante", "Digestivo", "Antiinflamatorio", "Suave"],
    uses: ["Ansiedad leve", "Digestión y gases", "Insomnio suave", "Niños (cólico)"],
    caution: "Alergias en sensibles a Asteráceas.",
  },
  nar_c: {
    desc: "Cáscara de naranja deshidratada. Aporta vitamina C, aroma cítrico vibrante y sabor dulce-amargo.",
    props: ["Vitamina C", "Digestivo", "Antioxidante", "Aromático cítrico"],
    uses: ["Blend cítrico", "Digestión post-comida", "Inmunidad", "Saborizante natural"],
    caution: "Usar orgánica o bien lavada. La cáscara acumula pesticidas.",
  },
  lim_c: {
    desc: "Cáscara de limón deshidratada. Ácida, aromática, con limoneno antioxidante y propiedades digestivas.",
    props: ["Digestivo", "Vitamina C", "Antioxidante", "Antimicrobiano suave"],
    uses: ["Blend cítrico refrescante", "Digestión pesada", "Resfríos", "Detox"],
    caution: "Preferir ecológica. La cáscara convencional tiene alta carga de pesticidas.",
  },
  bergamota: {
    desc: "Cítrico italiano que da el sabor característico al Earl Grey. Tiene propiedades ansiolíticas únicas.",
    props: ["Ansiolítico", "Antidepresivo suave", "Digestivo", "Antimicrobiano", "Cardioprotector"],
    uses: ["Ansiedad y depresión leve", "Earl Grey y blends gourmet", "Salud cardiovascular", "Digestión"],
    caution: "Fotosensibilizante si se usa aceite tópico. Bergapteno puede interactuar con algunos fármacos.",
  },
  pomelo_c: {
    desc: "Cáscara de pomelo/toronja. Ácida y amarga, con propiedades diuréticas y antioxidantes.",
    props: ["Diurético", "Antioxidante", "Digestivo amargo", "Vitamina C"],
    uses: ["Blend cítrico amargo", "Diuresis y depuración", "Digestión lenta", "Sabor gourmet"],
    caution: "El pomelo inhibe enzimas CYP3A4. Precaución con muchos fármacos (estatinas, anticoagulantes, etc.).",
  },
  canela_t: {
    desc: "Corteza de canela ceilanesa. Especialmente cálida en tés de invierno. Hipoglucemiante natural.",
    props: ["Hipoglucemiante", "Antimicrobiano", "Antioxidante", "Calefactor", "Digestivo"],
    uses: ["Control glucemia en diabetes tipo 2", "Resfríos e infecciones", "Blend invernal", "Cólicos menstruales"],
    caution: "Canela casia tiene cumarina (hepatotóxica en exceso). Preferir canela de Ceilán.",
  },
  cardamomo: {
    desc: "Especia aromática de la India. Sabor único que combina lo cítrico, lo mentolado y lo floral.",
    props: ["Digestivo", "Carminativo", "Antiséptico oral", "Estimulante suave"],
    uses: ["Digestión y flatulencias", "Mal aliento", "Tés especiados (chai)", "Náuseas"],
    caution: "Generalmente seguro. Puede irritar en exceso.",
  },
  jengibre_t: {
    desc: "Jengibre en formato de té. Las mismas propiedades antiinflamatorias y digestivas concentradas.",
    props: ["Antiinflamatorio", "Antiemético", "Circulatorio", "Calefactor"],
    uses: ["Náuseas (viaje, embarazo)", "Dolor articular", "Resfríos", "Digestión pesada"],
    caution: "Mismo perfil que jengibre medicinal. Precaución con anticoagulantes.",
  },
  anis_t: {
    desc: "Frutos de anís estrella con potente aroma a regaliz. Digestivo y expectorante clásico.",
    props: ["Carminativo", "Expectorante", "Antiespasmódico", "Galactagogo"],
    uses: ["Flatulencias y cólicos", "Tos y bronquitis", "Producción de leche materna", "Espasmos digestivos"],
    caution: "No confundir con anís estrella japonés (tóxico). Usar solo Illicium verum.",
  },
  clavo_t: {
    desc: "Botones florales de clavo de olor. Uno de los analgésicos naturales más potentes, con eugenol.",
    props: ["Analgésico dental", "Antiséptico potente", "Antifúngico", "Carminativo"],
    uses: ["Dolor de muelas (tópico)", "Infecciones bucales", "Flatulencias", "Tés especiados navideños"],
    caution: "En dosis altas puede ser hepatotóxico. Uso oral moderado. Evitar aceite puro en mucosas.",
  },
  pimienta_r: {
    desc: "Frutos del molle o pimiento rosado. Andino, aromático y suavemente picante. Pariente del matico.",
    props: ["Antioxidante", "Antimicrobiano", "Digestivo", "Circulatorio suave"],
    uses: ["Blend gourmet", "Digestión", "Circulación periférica", "Sabor exótico andino"],
    caution: "No confundir con pimienta negra. Seguro en cantidades usuales.",
  },
  miel_t: {
    desc: "Miel de abeja como endulzante y potenciador. Aporta dulzura natural y propiedades antibacterianas al té.",
    props: ["Antibacteriano", "Emoliente", "Nutritivo", "Potenciador de blend"],
    uses: ["Endulzar tés sin azúcar refinada", "Tos e irritación garganta", "Potenciar propiedades medicinales"],
    caution: "No agregar a agua muy caliente (destruye enzimas). Controlar en diabetes.",
  },
  vanilla_t: {
    desc: "Vainilla natural de Vanilla planifolia. El perfil aromático más amado del mundo con suaves propiedades ansiolíticas.",
    props: ["Aromático", "Ansiolítico suave", "Antioxidante (vainillina)", "Antidepresivo suave"],
    uses: ["Blend aromático premium", "Ansiedad suave", "Sabor gourmet", "Tés de invierno"],
    caution: "Usar vainilla real, no artificial. La vainillina artificial tiene menos propiedades.",
  },
  stevia_t: {
    desc: "Planta andina con glicósidos esteviólicos 300 veces más dulce que el azúcar. Sin calorías.",
    props: ["Edulcorante natural", "Hipoglucemiante suave", "Sin calorías", "Antioxidante"],
    uses: ["Endulzar sin calorías", "Diabetes y sobrepeso", "Hipertensión suave", "Tés medicinales"],
    caution: "Puede bajar levemente la glucosa. Precaución en hipoglucemia.",
  },
  panela_t: {
    desc: "Azúcar de caña sin refinar. Conserva minerales y melaza que el azúcar blanca pierde. Endulzante ancestral.",
    props: ["Endulzante natural", "Minerales traza", "Energético", "Aporta cuerpo al blend"],
    uses: ["Endulzar tés y blends", "Reemplazar azúcar refinada", "Hidratación (suero casero)"],
    caution: "Contiene azúcar. Controlar en diabetes y sobrepeso.",
  },

  // ─────────────────────────────────────────────────────────────────
  //  H_OSCURO — Ingredientes de brebajes
  // ─────────────────────────────────────────────────────────────────
  lim_o: {
    desc: "Limón fresco, ingrediente fundamental de la coctelería. Su jugo aporta acidez equilibrante.",
    props: ["Ácido equilibrante", "Vitamina C", "Aromático cítrico", "Conservante natural"],
    uses: ["Pisco Sour", "Cócteles cítricos", "Equilibrar dulzor", "Realzar sabores"],
    caution: "Puede afectar esmalte dental en exceso.",
  },
  nar_o: {
    desc: "Naranja fresca para cócteles. Aporta dulzura cítrica, vitamina C y cuerpo a los brebajes.",
    props: ["Dulce cítrico", "Aromático", "Vitamina C", "Colorante natural"],
    uses: ["Sangría", "Cócteles tropicales", "Macerados cítricos", "Garnish"],
    caution: "Interacción del zumo con algunos fármacos (ver pomelo).",
  },
  framb: {
    desc: "Frambuesa fresca o congelada. Aroma intenso, color rojizo vibrante y acidez deliciosa.",
    props: ["Antioxidante muy alto", "Ácido delicado", "Colorante natural intenso", "Aromático frutal"],
    uses: ["Cócteles fruticolas", "Macerados de licor", "Sangría", "Brebajes de verano"],
    caution: "Sin contraindicaciones en cantidades normales.",
  },
  maracuya: {
    desc: "Fruta tropical de aroma inconfundible. Aporta acidez exótica y color amarillo intenso.",
    props: ["Ansiolítico natural (pasiflora)", "Ácido tropical", "Aromático exótico", "Vitaminas A y C"],
    uses: ["Cócteles tropicales", "Macerados exóticos", "Equilibrar brebajes dulces", "Aroma tropical único"],
    caution: "Puede tener efecto sedante leve. Precaución combinado con alcohol en cantidad.",
  },
  menta_o: {
    desc: "Menta fresca para cócteles. Aromática, refrescante y clásica en Mojito y Mint Julep.",
    props: ["Refrescante", "Digestivo", "Aromático intenso", "Clásico coctelero"],
    uses: ["Mojito y cócteles de menta", "Garnish aromático", "Digestión post-cocktail", "Macerados refrescantes"],
    caution: "En coctelería solo aromático/saborizante. Sin contraindicaciones.",
  },
  jengibre_o: {
    desc: "Jengibre fresco o en rodajas para cócteles. Aporta picor, calidez y complejidad al brebaje.",
    props: ["Picante cálido", "Aromático especiado", "Digestivo", "Antiemético"],
    uses: ["Moscow Mule", "Dark and Stormy", "Cócteles especiados", "Macerados de invierno"],
    caution: "Precaución con anticoagulantes.",
  },
  canela_o: {
    desc: "Canela en rama para macerados y cócteles calientes. Aporta calidez y profundidad aromática.",
    props: ["Especiado cálido", "Aromático", "Antimicrobiano suave", "Digestivo"],
    uses: ["Sangría caliente", "Ponches y glühwein", "Macerados especiados", "Cócteles de otoño-invierno"],
    caution: "Canela casia: cumarina en exceso. Preferir Ceilán para macerados largos.",
  },
  albahaca: {
    desc: "Hierba aromática mediterránea, fresca e intensa. Cada vez más usada en coctelería de autor.",
    props: ["Aromático intenso", "Antioxidante", "Digestivo suave", "Antiinflamatorio"],
    uses: ["Smash de albahaca", "Macerados herbales", "Cócteles de autor", "Gin & Tonic botánico"],
    caution: "Sin contraindicaciones en coctelería.",
  },
  rosa_o: {
    desc: "Pétalos de rosa para brebajes. Aportan romance, aroma floral y un color rosado único.",
    props: ["Aromático floral", "Colorante natural", "Suave astringente", "Antioxidante"],
    uses: ["Macerados florales", "Cócteles románticos", "Infusiones de licor", "Garnish"],
    caution: "Usar pétalos sin tratar con pesticidas.",
  },
  miel_o: {
    desc: "Miel en coctelería. Endulzante natural que aporta profundidad y aroma.",
    props: ["Endulzante natural", "Aromático", "Antibacteriano", "Suavizante"],
    uses: ["Bee's Knees", "Gold Rush", "Ponches calientes", "Endulzar macerados"],
    caution: "Disolver en agua tibia antes de agregar a cócteles fríos.",
  },
  anis_o: {
    desc: "Anís estrella para cócteles. El sabor característico del Pastis, Sambuca y Ouzo.",
    props: ["Aromático intenso a regaliz", "Digestivo", "Carminativo", "Tradicional Mediterráneo"],
    uses: ["Macerados anisados", "Ponches digestivos", "Brebajes de autor", "Combinado con gin"],
    caution: "Intenso: usar con moderación. No confundir con anís estrella japonés (tóxico).",
  },
  hierbabuena: {
    desc: "Prima de la menta, más suave y aromática. Favorita en Medio Oriente y coctelería española.",
    props: ["Refrescante", "Digestivo suave", "Aromático", "Menos mentolada que la menta"],
    uses: ["Mojito cubano", "Tés de menta marroquí", "Limonadas con hierbas", "Infusiones frescas"],
    caution: "Sin contraindicaciones en uso culinario-coctelero.",
  },

  // ─────────────────────────────────────────────────────────────────
  //  LICORES — Bases alcohólicas
  // ─────────────────────────────────────────────────────────────────
  pisco: {
    desc: "Aguardiente de uva producido en Chile y Perú. DO Pisco Chileno: valles de Atacama y Coquimbo. 35-43° GL.",
    props: ["Base clásica chilena", "Perfil frutal-floral", "Raro chileno ✦", "35-43% alcohol"],
    uses: ["Pisco Sour", "Terremoto", "Macerados andinos", "Cócteles patrimoniales"],
    caution: "Consumo responsable. El alcohol es perjudicial para la salud en exceso.",
  },
  aguard: {
    desc: "Aguardiente de orujo o caña. Destilado tradicional con alto contenido alcohólico. Base para macerados.",
    props: ["Base alta graduación", "Perfil rústico", "Raro regional ✦", "40-50% alcohol"],
    uses: ["Macerados herbales", "Licores artesanales", "Ponches del campo"],
    caution: "Alta graduación. Consumo muy moderado.",
  },
  chicha: {
    desc: "Bebida fermentada de uva o maíz ancestral. Parte fundamental de la cultura andina y mapuche.",
    props: ["Fermentado ancestral", "Bajo en alcohol", "Probiótico natural", "Raro patrimonial ✦"],
    uses: ["Cócteles patrimoniales", "Sangría criolla", "Terremotos", "Mezclas artesanales"],
    caution: "Verificar calidad artesanal. Fermentación natural puede variar en alcohol.",
  },
  mosto: {
    desc: "Jugo de uva fermentado en proceso inicial. Intenso, dulce y con baja graduación alcohólica.",
    props: ["Fermentado suave", "Dulce viníco", "Antioxidantes de uva", "Andino ✦"],
    uses: ["Base de sangría", "Cócteles dulces", "Mezclas otoñales"],
    caution: "Gradación variable. Consumo moderado.",
  },
  ron: {
    desc: "Destilado de caña de azúcar. Caribeño por excelencia, con perfil dulce, melaza y vainilla.",
    props: ["Dulce caribeño", "Notas de melaza y vainilla", "40-50% alcohol", "Versátil"],
    uses: ["Mojito", "Dark and Stormy", "Macerados tropicales", "Ponches"],
    caution: "Consumo responsable.",
  },
  vodka: {
    desc: "Destilado neutro de cereal o papa. La base más versátil de la coctelería por su neutralidad.",
    props: ["Neutro y versátil", "40% alcohol", "Sin sabor dominante", "Base universal"],
    uses: ["Macerados (base neutra)", "Cosmopolitan", "Moscow Mule", "Infusiones herbales"],
    caution: "Consumo responsable.",
  },
  gin: {
    desc: "Destilado de enebro con botánicos. El más botánico de los destilados, ideal para maridajes con hierbas.",
    props: ["Botánico e intenso", "Enebro dominante", "40-47% alcohol", "Maridaje herbal ideal"],
    uses: ["Gin & Tonic botánico", "Macerados con hierbas", "Negroni", "Martini"],
    caution: "Consumo responsable.",
  },
  tequila: {
    desc: "Destilado de agave azul de México. Terroso, herbáceo y único. DO Tequila.",
    props: ["Terroso y herbáceo", "Agave azul 100%", "38-55% alcohol", "Mexicano DOC"],
    uses: ["Margarita", "Paloma", "Shots", "Macerados mexicanos"],
    caution: "Consumo responsable.",
  },
  vino_t: {
    desc: "Vino tinto de uva. Chile es uno de los mejores productores del mundo. Base de sangría y macerados.",
    props: ["Antioxidante (resveratrol)", "Tánico y frutal", "12-15% alcohol", "Maridaje robusto"],
    uses: ["Sangría española", "Ponche caliente", "Macerados de frutas", "Tinto de verano"],
    caution: "Consumo moderado. Interacción con anticoagulantes.",
  },
  vino_b: {
    desc: "Vino blanco de uva. Más fresco y delicado que el tinto. Ideal para cócteles de verano.",
    props: ["Fresco y afrutado", "Ácido equilibrado", "10-13% alcohol", "Versátil"],
    uses: ["Kir", "Sangría blanca", "Spritz", "Macerados ligeros"],
    caution: "Consumo moderado.",
  },
  cerveza_a: {
    desc: "Cerveza artesanal chilena. El movimiento craft ha producido estilos únicos con lúpulo, malta y adjuntos locales.",
    props: ["Lúpulo aromático", "Malta compleja", "4-8% alcohol", "Artesanal local"],
    uses: ["Michelada", "Shandies", "Macerados de cerveza", "Cócteles hoppy"],
    caution: "Consumo moderado.",
  },
  kombucha: {
    desc: "Té fermentado con SCOBY. Probiótico natural, con pequeña graduación alcohólica. Trendy y saludable.",
    props: ["Probiótico potente", "Ácido y complejo", "0.5-3% alcohol", "Fermentado vivo ✦"],
    uses: ["Cócteles 'saludables'", "Spritz de kombucha", "Macerados probióticos", "Brebajes de autor"],
    caution: "Contiene algo de alcohol. Diabéticos: verificar azúcares. Embarazo: precaución.",
  },

  // ─────────────────────────────────────────────────────────────────
  //  H_ART — Artesanales (cítricos, hierbas, especias, alcohol)
  // ─────────────────────────────────────────────────────────────────
  lim_art: {
    desc: "Ralladura de limón deshidratada. Esencia aromática del limoncello. Limoneno concentrado.",
    props: ["Limoneno aromático", "Vitamina C", "Antibacteriano", "Esencia cítrica"],
    uses: ["Limoncello artesanal", "Licor cítrico", "Macerado express", "Amaro cítrico"],
    caution: "Usar limón ecológico. Pesticidas se concentran en ralladura.",
  },
  nar_art: {
    desc: "Ralladura de naranja para narancello y licores. Aroma dulce-cítrico intenso.",
    props: ["Aromático dulce-cítrico", "Antioxidante", "Esencia de naranja", "Narancello base"],
    uses: ["Narancello", "Licor de naranja", "Triple Sec artesanal", "Amaro cítrico"],
    caution: "Preferir naranja ecológica.",
  },
  berg_art: {
    desc: "Bergamota para licores artesanales. El aroma del Earl Grey en formato concentrado.",
    props: ["Aromático único", "Ansiolítico", "Bergapteno activo", "Gourmet"],
    uses: ["Limoncello bergamota", "Licores florales", "Bitter premium", "Amaro aromático"],
    caution: "Fotosensibilizante. Interacción con fármacos que usan CYP3A4.",
  },
  limeta: {
    desc: "Lima/limeta. Más floral y aromática que el limón. Fundamental en coctelería tropical.",
    props: ["Aromático floral-cítrico", "Ácido suave", "Vitamina C", "Tropical"],
    uses: ["Limoncello de lima", "Caipirinha artesanal", "Licor tropical", "Macerado fresco"],
    caution: "Preferir ecológica para ralladura.",
  },
  pomelo_art: {
    desc: "Ralladura de pomelo para licores amargos. Aporta amargor noble y aroma particular.",
    props: ["Amargo noble", "Diurético", "Antioxidante", "Bergapteno"],
    uses: ["Bitter de pomelo", "Amaro cítrico", "Licor digestivo", "Macerado premium"],
    caution: "Interacción significativa con fármacos (inhibidor CYP3A4).",
  },
  yuzu: {
    desc: "Cítrico japonés rarísimo, cruce de mandarina y limón silvestre. Aroma inconfundible y exótico. ✦",
    props: ["Aroma único exótico", "Raro ✦", "Antioxidante", "Vitamina C alta"],
    uses: ["Licor de yuzu artesanal", "Amaro japonés", "Bitter premium exótico", "Macerado gourmet"],
    caution: "Escaso y costoso. Usar con moderación para apreciar su rareza.",
  },
  nar_am: {
    desc: "Naranja amarga de Sevilla. Base histórica del Cointreau y el Grand Marnier. Amargo intenso. ✦",
    props: ["Amargo intenso", "Raro ✦", "Aromático complejo", "Digestivo potente"],
    uses: ["Triple Sec artesanal", "Amaro clásico", "Cointreau casero", "Bitter digestivo"],
    caution: "Muy amarga. Usar en proporciones pequeñas. Interacción fármacos (bergapteno).",
  },
  mandarina: {
    desc: "Mandarina fresca para macerados. El más dulce de los cítricos, aromático y accesible.",
    props: ["Dulce cítrico", "Aromático suave", "Vitamina C", "Fácil macerado"],
    uses: ["Mandarinello", "Licor cítrico dulce", "Macerado fácil", "Amaro suave"],
    caution: "Preferir ecológica para ralladura.",
  },
  menta_art: {
    desc: "Menta fresca para licores artesanales. La base del limoncello de menta y licor de hierbas.",
    props: ["Refrescante intenso", "Mentol activo", "Digestivo", "Clásico herbal"],
    uses: ["Licor de menta artesanal", "Crème de Menthe casero", "Amaro mentolado", "Digestivo de verano"],
    caution: "Usar menta fresca de calidad certificada.",
  },
  albah_art: {
    desc: "Albahaca fresca para licores de hierbas. Sabor anisado, floral y único.",
    props: ["Aromático anisado", "Antioxidante", "Digestivo", "Herbal fino"],
    uses: ["Licor de hierbas artesanal", "Amaro italiano estilo", "Digestivo de autor", "Infusión herbal premium"],
    caution: "Usar hojas frescas sin marchitar.",
  },
  romero_art: {
    desc: "Romero para licores artesanales. Aporta notas resinosas, pino y complejidad herbácea.",
    props: ["Resinoso y herbal", "Antioxidante alto", "Antimicrobiano", "Complejo"],
    uses: ["Amaro de romero", "Licor de hierbas mediterráneo", "Bitter herbal", "Digestivo"],
    caution: "En alta concentración puede ser irritante. Macerar tiempo moderado.",
  },
  tomillo_art: {
    desc: "Tomillo para licores. Aporta timol, antibacteriano natural y sabor herbal intenso.",
    props: ["Timol antiséptico", "Herbal intenso", "Digestivo", "Antimicrobiano"],
    uses: ["Amaro herbal", "Licor de hierbas provenzal", "Bitter digestivo", "Herbal complejo"],
    caution: "Uso moderado en maceración. Timol puede ser irritante en exceso.",
  },
  lavanda_art: {
    desc: "Lavanda para licores. El aroma más reconocible del mundo herbal, en formato destilado.",
    props: ["Floral intenso", "Ansiolítico", "Único y delicado", "Aromático"],
    uses: ["Licor de lavanda", "Amaro floral", "Gin de lavanda artesanal", "Digestivo floral"],
    caution: "Muy perfumado. Usar en pequeñas cantidades — domina el blend.",
  },
  cedron_art: {
    desc: "Cedrón chileno para licores. Aroma a limón único, inconfundible y muy valorado en licorería artesanal.",
    props: ["Lemony chileno", "Ansiolítico suave", "Aromático exclusivo", "Regional ✦"],
    uses: ["Licor de cedrón chileno", "Amaro regional", "Digestivo herbal nativo", "Macerado patrimonial"],
    caution: "Fotosensibilizante. Usar con moderación.",
  },
  hinojo: {
    desc: "Semillas y hojas de hinojo. Sabor anisado fresco, digestivo potente. Base del Pastis artesanal.",
    props: ["Anisado fresco", "Digestivo potente", "Carminativo", "Galactagogo"],
    uses: ["Licor de hinojo", "Pastis artesanal", "Amaro digestivo", "Absinthe artesanal"],
    caution: "No confundir con cicuta (parecida). Usar semillas de calidad. Galactagogo: usar con cuidado.",
  },
  canela_art: {
    desc: "Canela en rama para maceración larga. Aporta profundidad, calidez y notas dulces al licor.",
    props: ["Especiado cálido", "Complejo y profundo", "Antimicrobiano", "Digestivo"],
    uses: ["Canela al Pisco", "Licor de canela", "Amaro especiado", "Ponche artesanal"],
    caution: "Preferir Ceilán para macerados largos (menos cumarina).",
  },
  vaini_art: {
    desc: "Vaina de vainilla real para licores. Insustituible: la vainilla artificial no aporta las mismas moléculas. ✦",
    props: ["Aromático premium ✦", "Vainillina natural", "Antioxidante", "Complementa todo"],
    uses: ["Licor de vainilla artesanal", "Potenciar cítricos y especias", "Amaro dulce", "Licor de crema"],
    caution: "Usar vainas Bourbon, Tahití o México. La artificial no tiene mismo efecto.",
  },
  card_art: {
    desc: "Cardamomo para licores artesanales. Su complejidad aromática es extraordinaria en pequeñas dosis.",
    props: ["Aromático complejo", "Digestivo potente", "Cítrico-especiado-floral", "Exótico"],
    uses: ["Amaro escandinavo estilo", "Aquavit artesanal", "Licor de especias indio", "Digestivo premium"],
    caution: "Muy potente. Una vaina basta para aromatizar un litro.",
  },
  clavo_art: {
    desc: "Clavo de olor para macerados artesanales. Eugenol potente y analgésico natural.",
    props: ["Eugenol analgésico", "Antiséptico", "Aromático muy intenso", "Cálido"],
    uses: ["Ponche navideño artesanal", "Amaro de especias", "Licor invernal", "Complejidad aromática"],
    caution: "Extremadamente potente. Usar solo 2-3 clavos por litro.",
  },
  azafran: {
    desc: "El ingrediente más caro del mundo. Estigmas de Crocus sativus. Aporta color dorado y aroma único. ✦",
    props: ["Colorante dorado natural ✦", "Antidepresivo", "Antioxidante", "Digestivo exótico"],
    uses: ["Licor de azafrán premium", "Amaro dorado", "Digestivo italiano estilo", "Licor de lujo"],
    caution: "En dosis muy altas (gramos) puede ser tóxico. En coctelería, dosis mínimas por su precio.",
  },
  jeng_art: {
    desc: "Jengibre para licores artesanales. Aporta picor cálido, digestión y complejidad.",
    props: ["Picante cálido", "Digestivo", "Antiinflamatorio", "Complejo herbal"],
    uses: ["Limoncello picante", "Ginger Beer artesanal", "Amaro de jengibre", "Licor digestivo"],
    caution: "Precaución con anticoagulantes.",
  },
  anis_art: {
    desc: "Anís estrella para licores. Base del Pastis, Anisette y bebidas anisadas mediterráneas.",
    props: ["Regaliz intenso", "Digestivo", "Carminativo", "Tradicional mediterráneo"],
    uses: ["Anisette artesanal", "Pastis casero", "Ouzo estilo", "Amaro anisado"],
    caution: "Anetol puede acumularse. Usar con moderación. Solo Illicium verum.",
  },
  alc_neut: {
    desc: "Alcohol neutro de cereal o papa a 96°. La base perfecta para todo licor artesanal por su neutralidad absoluta.",
    props: ["Neutro 96°", "Sin impurezas", "Base universal", "Extrae aromas eficientemente"],
    uses: ["Base de limoncello", "Macerados artesanales", "Amaro", "Todo licor casero"],
    caution: "96° GL. Siempre diluir antes de consumir. Nunca beber sin diluir.",
  },
  pisco_art: {
    desc: "Pisco base para licores artesanales chilenos. Aporta identidad local a todo lo que toca. ✦",
    props: ["Identidad chilena ✦", "Raro regional", "Frutal-floral", "35-43% alcohol"],
    uses: ["Limoncello al Pisco", "Licor de hierbas andino", "Amaro patrimonial", "Macerado con identidad"],
    caution: "Consumo responsable.",
  },
  vodka_art: {
    desc: "Vodka premium como base alternativa. Más neutro que el pisco, deja brillar los botánicos.",
    props: ["Neutro y limpio", "40% alcohol", "Base versátil", "Sin intervención en aroma"],
    uses: ["Limoncello neutro", "Licores de hierbas delicados", "Macerados florales"],
    caution: "Consumo responsable.",
  },
  grappa: {
    desc: "Destilado italiano de orujo de uva. Rústico, complejo y con carácter propio. Difícil base pero única. ✦",
    props: ["Rústico complejo ✦", "Orujo de uva", "Alta graduación 38-60°", "Italiano DOC"],
    uses: ["Amaro italiano auténtico", "Macerado premium", "Licor de hierbas grappa base", "Digestivo complejo"],
    caution: "Alta graduación. Consumo muy moderado.",
  },

  // ─────────────────────────────────────────────────────────────────
  //  BASES
  // ─────────────────────────────────────────────────────────────────
  agua_c:   { desc: "Agua caliente hervida. Base fundamental para infusiones medicinales.", props: ["Vehículo caliente", "Extrae principios activos"], uses: ["Infusiones", "Decocciones"], caution: null },
  agua:     { desc: "Agua mineral o filtrada. Base neutra para preparaciones frías o a temperatura ambiente.", props: ["Vehículo neutro", "Sin sabor dominante"], uses: ["Tinturas", "Macerados acuosos"], caution: null },
  miel_b:   { desc: "Miel como base emulsionante para ungüentos y preparaciones externas.", props: ["Emulsionante natural", "Cicatrizante", "Antibacteriano"], uses: ["Ungüentos", "Cataplasmas dulces"], caution: "No usar en heridas profundas sin consulta médica." },
  cera:     { desc: "Cera de abeja pura. Base clásica para pomadas, bálsamos y ungüentos sólidos.", props: ["Emoliente", "Protector", "Consistencia sólida"], uses: ["Ungüentos", "Bálsamos labiales", "Pomadas herbal"], caution: null },
  alc_b:    { desc: "Alcohol de uso farmacéutico para tinturas y extracciones.", props: ["Extractor potente", "Conservante", "Antiséptico"], uses: ["Tinturas herbales", "Extractos", "Antiséptico tópico"], caution: "Solo uso externo en concentraciones altas. Tinturas: dosis terapéutica." },
  vinagre:  { desc: "Vinagre de manzana fermentado. Vehículo ácido para oxymeles y preparaciones herbales.", props: ["Ácido conservante", "Probiótico suave", "Extractor"], uses: ["Oxymeles", "Tinturas en vinagre", "Uso tópico"], caution: "Diluir siempre. No aplicar sin diluir en heridas." },
  a75:      { desc: "Agua a 75°C. Temperatura ideal para tés verdes y blancos delicados.", props: ["Temperatura baja"], uses: ["Té verde", "Té blanco", "Tés delicados"], caution: null },
  a85:      { desc: "Agua a 85°C. Temperatura perfecta para oolongs y la mayoría de tés de hierbas.", props: ["Temperatura media"], uses: ["Oolong", "Tés de hierbas"], caution: null },
  a100:     { desc: "Agua hirviendo a 100°C. Ideal para tés negros, pu-erh y rooibos.", props: ["Temperatura alta"], uses: ["Té negro", "Pu-erh", "Rooibos"], caution: null },
  leche:    { desc: "Leche entera para Chai Latte y tés cremosos.", props: ["Cremoso", "Proteínas", "Calcio"], uses: ["Chai Latte", "Té con leche", "Matcha Latte"], caution: "Intolerancia a la lactosa." },
  leche_av: { desc: "Leche de avena vegetal. Versátil, dulce y con beta-glucanos.", props: ["Vegetal", "Beta-glucanos", "Dulce natural"], uses: ["Latte vegano", "Chai vegano", "Matcha"], caution: "Verificar sin aditivos. Puede contener trazas gluten." },
  lco_b:    { desc: "Leche de coco. Cremosa, tropical y con ácidos grasos únicos (láurico).", props: ["Tropical cremoso", "Ácido láurico", "Sin lactosa"], uses: ["Chai de coco", "Matcha tropical", "Blend exótico"], caution: "Alta en grasas saturadas. Moderar en dieta restrictiva." },
  agua_f:   { desc: "Agua fría para cold brew. Extracción lenta que produce té menos amargo y más suave.", props: ["Baja acidez", "Extracción suave", "Refrescante"], uses: ["Cold brew té verde", "Cold brew café", "Infusiones frías"], caution: null },
  hielo:    { desc: "Hielo en cubos. Enfría y diluciona el cóctel de forma controlada.", props: ["Enfriante", "Diluyente controlado"], uses: ["Todos los cócteles fríos", "On the rocks"], caution: null },
  jlim:     { desc: "Jugo de limón fresco exprimido. Elemento ácido fundamental del Pisco Sour.", props: ["Ácido equilibrante", "Vitamina C"], uses: ["Pisco Sour", "Cócteles sours", "Equilibrar dulzor"], caution: null },
  jarabe:   { desc: "Jarabe simple 1:1 azúcar-agua. Base dulce universal de la coctelería profesional.", props: ["Dulce disoluble", "No cristaliza"], uses: ["Todos los cócteles dulces", "Mojito", "Pisco Sour"], caution: null },
  tonica:   { desc: "Agua tónica con quinina. Amarga y efervescente. El alma del Gin & Tonic.", props: ["Quinina amarga", "Efervescente", "Refrescante"], uses: ["Gin & Tonic", "Vodka Tonic", "Spritz"], caution: "Quinina puede interactuar con anticoagulantes." },
  jnar:     { desc: "Jugo de naranja fresco. Aporta dulzura cítrica y vitamina C.", props: ["Dulce cítrico", "Vitamina C"], uses: ["Harvey Wallbanger", "Destornillador", "Spritz"], caution: null },
  champan:  { desc: "Champán o cava espumante. Burbujas elegantes para cócteles de celebración.", props: ["Efervescente", "Ácido y levaduras"], uses: ["Kir Royal", "French 75", "Mimosa", "Spritz"], caution: null },
  cerveza_b:{ desc: "Cerveza de base para cócteles. Lager, ale o stout según el perfil buscado.", props: ["Lúpulo", "Malta", "Efervescente"], uses: ["Michelada", "Shandy", "Submarino"], caution: null },
  alc_a:    { desc: "Alcohol neutro de 96° para licores artesanales. Base perfecta.", props: ["Neutro puro", "Extractor óptimo"], uses: ["Limoncello", "Todo licor artesanal"], caution: "Siempre diluir antes de consumir." },
  pisco_a:  { desc: "Pisco como base de licores patrimoniales chilenos.", props: ["Identidad chilena", "35-43°"], uses: ["Limoncello al Pisco", "Amaro patrimonial"], caution: null },
  vodka_a:  { desc: "Vodka premium como base neutra alternativa.", props: ["Neutro", "40°"], uses: ["Licores delicados", "Macerados florales"], caution: null },
  ron_a:    { desc: "Ron blanco como base tropical y dulce.", props: ["Caña tropical", "40°"], uses: ["Licores caribeños", "Macerado de frutas tropicales"], caution: null },
  agua_r:   { desc: "Agua para diluir el alcohol base hasta graduación de consumo (25-30°).", props: ["Diluyente neutro"], uses: ["Ajustar graduación del licor"], caution: "Usar agua filtrada o destilada para mejor resultado." },
};

// ── Fallback para ingredientes sin datos específicos ──────────────────
export const getFallbackProps = (ing) => ({
  desc: `${ing.n}${ing.lat ? ` (${ing.lat})` : ""}. ${
    ing.region === "chile" ? "Ingrediente nativo o tradicional de Chile." :
    ing.region === "andina" ? "Ingrediente de tradición andina." :
    "Ingrediente de uso universal en preparaciones herbales."
  }`,
  props: ing.raro ? ["Ingrediente raro ✦", "Propiedades especiales"] : ["Ingrediente herbal", "Uso tradicional"],
  uses: ["Consultar con herbolario local"],
  caution: null,
});

export const getIngProps = (ing) => ING_PROPS[ing.id] || getFallbackProps(ing);
