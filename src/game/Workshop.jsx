import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { BookOpen, Leaf, Sparkle, Flask, ArrowRight, Check, Plus, X, Coins, Moon, Hammer, SpeakerHigh, SpeakerSlash } from '@phosphor-icons/react';
import WorkshopScene, { CHARACTERS, loadArtPreference } from './WorkshopScene.jsx';
import { AXES, INGREDIENTS, METHODS, QUESTS, SAVE_KEY, initialState, restore, evaluate, brew, upgrade, xpOf, coinsOf } from './rules.js';
import './workshop.css';
import './artwork.css';
import './herbarium.css';
import { HERBS } from './herbs.js';
import { matchesIngredient } from './catalog.js';
import { Herbarium, RecipeNote, CatalogFilters } from './Herbarium.jsx';
import { saveRecipeNote } from './rules.js';
import BackupControls from './BackupControls.jsx';
import PrintableGrimorio from './PrintableGrimorio.jsx';
import BrumaChat, { useBrumaPotion } from './BrumaChat.jsx';
import BrumaAsk, { useBrumaAsk } from './BrumaAsk.jsx';
import Ambience from './Ambience.jsx';
import Bruma, { useIdle } from './Bruma.jsx';
import { play, setSound } from './sound.js';
import './immersion.css';

const NatureGames = lazy(() => import('./NatureGames.jsx'));

function Stats({ stats }) {
  return <div className="gh-stats">{Object.entries(AXES).map(([key, label]) => <span key={key} className={`gh-stat gh-${key}`}><i />{label} <strong>{stats[key]}</strong></span>)}</div>;
}

export default function Workshop() {
  const [state, setState] = useState(() => { try { return restore(localStorage.getItem(SAVE_KEY)); } catch { return initialState(); } });
  const [saveError, setSaveError] = useState(false);
  const [importRevision, setImportRevision] = useState(0);
  const [ids, setIds] = useState([]);
  const [useHarvest,setUseHarvest]=useState(false);
  const [method, setMethod] = useState('infusion');
  const [tab, setTab] = useState('taller');
  const [challenge, setChallenge] = useState(false);
  const [herbFocus, setHerbFocus] = useState(null);
  function openHerb(id) { setHerbFocus(id); setTab('herbario'); }
  const [ingredientSearch, setIngredientSearch] = useState('');
  const [region, setRegion] = useState('todas');
  const [collection, setCollection] = useState('Todas');
  const [filter, setFilter] = useState('Todas');
  const [result, setResult] = useState(null);
  const bruma = useBrumaPotion();
  const consult = useBrumaAsk();
  function askAbout(plantIds) { consult.focusPlants(plantIds); setTab('consulta'); }
  function brewPlants(plantIds) { setIds(plantIds.slice(0, capacity)); setResult(null); setSceneEvent(null); setTab('taller'); setMessage('Plantas de la consulta cargadas en el caldero.'); }
  const [hint, setHint] = useState(false);
  const [resetConfirm, setResetConfirm] = useState(false);
  const [character, setCharacter] = useState(() => {
    const saved = loadArtPreference('gh_workshop_character', 'mago');
    return CHARACTERS[saved] ? saved : 'mago';
  });
  const [animationEnabled, setAnimationEnabled] = useState(() => loadArtPreference('gh_workshop_animation', 'on') !== 'off');
  // Bruma greets on arrival, thinks while Gemini answers, glows when an answer lands and naps when nobody is around.
  const [brumaCue, setBrumaCue] = useState({ mood: 'saluda', n: 0 });
  const asleep = useIdle(90000);
  const answers = (bruma.answer ? 1 : 0) + consult.turns.length;
  useEffect(() => { if (answers) setBrumaCue(cue => ({ mood: 'habla', n: cue.n + 1 })); }, [answers, bruma.answer]);
  const brumaMood = bruma.busy || consult.busy ? 'piensa' : asleep ? 'duerme' : brumaCue.mood;
  const brumaAvatar = <Bruma mood={brumaMood} cue={brumaCue.n} animated={animationEnabled} />;
  const [sound, setSoundOn] = useState(() => loadArtPreference('gh_workshop_sound', 'off') === 'on');
  const [sceneEvent, setSceneEvent] = useState(null);
  const sceneSequence = useRef(0);
  const [message, setMessage] = useState('');
  const resultRef = useRef(null);
  const capacity = state.upgraded ? 4 : 3;
  const quest = challenge ? QUESTS[state.completed.length] : null;
  const visibleIngredients = INGREDIENTS.filter(i => (filter === 'Todas' || i.family === filter) && matchesIngredient({ ...i, latin: HERBS[i.id][0] }, ingredientSearch, region, collection));
  const selected = ids.map(id => INGREDIENTS.find(i => i.id === id));
  const preview = ids.length ? evaluate(ids, method, capacity) : null;
  const xp = xpOf(state);
  const rank = state.completed.length === QUESTS.length ? 'Alquimista del bosque' : state.completed.length >= 3 ? 'Guardián de esencias' : xp >= 300 ? 'Herbolario del sendero' : xp >= 100 ? 'Jardinero de Bruma' : 'Aprendiz de hierbas';

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); play('page'); }, [tab]);
  // Browsers only allow audio after a gesture, so a saved "on" preference wakes up with the first click.
  useEffect(() => {
    if (!sound) return;
    const wake = () => setSound(true);
    window.addEventListener('pointerdown', wake, { once: true });
    return () => window.removeEventListener('pointerdown', wake);
  }, []);
  function toggleSound() {
    const next = !sound;
    setSound(next); setSoundOn(next);
    try { localStorage.setItem('gh_workshop_sound', next ? 'on' : 'off'); } catch { /* Optional preference. */ }
    if (next) play('drop');
  }

  useEffect(() => {
    try { localStorage.setItem(SAVE_KEY, JSON.stringify(state)); setSaveError(false); } catch { setSaveError(true); }
  }, [state]);
  useEffect(() => {
    try {
      localStorage.setItem('gh_workshop_character', character);
      localStorage.setItem('gh_workshop_animation', animationEnabled ? 'on' : 'off');
    } catch { /* Visual preferences are optional; gameplay has its own save status. */ }
  }, [character, animationEnabled]);

  function showResult() {
    resultRef.current?.focus();
    resultRef.current?.scrollIntoView({ block: 'center', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }

  function add(ingredient) {
    if (ids.length >= capacity) return;
    setIds([...ids, ingredient.id]);
    play('drop');
    setMessage(`${ingredient.name} añadido. ${ids.length + 1} de ${capacity} espacios.`);
  }
  function conjure() {
    let next;
    try { next = brew(state, ids, method, { challenge, useHarvest }); } catch(error) { setMessage(error.message); return; }
    setState(next.state);
    setResult(next.result);
    bruma.explain([...ids], method, next.result.provenance);
    setSceneEvent({ id: ++sceneSequence.current, success: next.result.success, miss: Boolean(next.result.quest && !next.result.success) });
    play(next.result.success ? 'success' : 'brew');
    setMessage(next.result.success ? 'Encargo completado. Tu recompensa y tu fórmula están guardadas.' : 'Mezcla registrada. Consulta el resultado para anotar tus observaciones.');
    if (next.result.success) setHint(false);
  }
  function reset() {
    setUseHarvest(false);
    bruma.clear();consult.clear();
    setState(initialState()); setIds([]); setResult(null); setHint(false); setMethod('infusion'); setTab('taller'); setResetConfirm(false); setSceneEvent(null); setMessage('Nueva partida iniciada.');
  }
  function importState(next) {
    try { localStorage.setItem(SAVE_KEY, JSON.stringify(next)); }
    catch { throw new Error('El navegador no pudo guardar el respaldo. No se ha reemplazado tu partida.'); }
    setUseHarvest(false);
    bruma.clear();consult.clear();
    setState(next);setIds([]);setResult(null);setSceneEvent(null);setHint(false);
    setMethod('infusion');setResetConfirm(false);setSaveError(false);setTab('libro');
    setImportRevision(value => value + 1);
  }

  return <div className={animationEnabled ? 'gh-game' : 'gh-game gh-still'}>
    {animationEnabled && <Ambience />}
    <header className="gh-header">
      <a className="gh-brand" href="#" onClick={e => { e.preventDefault(); setTab('taller'); }}><span className="gh-brand-mark"><Leaf size={27} /></span><span>Grimorio Herbal<small>EL TALLER DE LA CORDILLERA</small></span></a>
      <nav aria-label="Secciones del juego">{[['taller', Flask, 'Taller'], ['jardin', Leaf, 'Jardín'], ['explorar', Moon, 'Explorar'], ['herbario', Leaf, 'Herbolario'], ['consulta', Sparkle, 'Preguntar'], ['libro', BookOpen, 'Grimorio']].map(([id, Icon, label]) => <button key={id} aria-current={tab === id ? 'page' : undefined} className={tab === id ? 'active' : ''} onClick={() => setTab(id)}><Icon size={19} />{label}{id === 'libro' && <span className="gh-count">{state.discoveries.length}</span>}</button>)}</nav>
      <button className="gh-sound" aria-pressed={sound} onClick={toggleSound}>{sound ? <SpeakerHigh size={15} /> : <SpeakerSlash size={15} />}{sound ? 'Sonido activado' : 'Sonido apagado'}</button><span className="gh-local"><span /> Partida local</span>
    </header>
    <main className="gh-main">
      <section className="gh-intro gh-illustrated-intro" style={{ '--scene-image': `url("${CHARACTERS[character].poster}")` }}><div><p className="gh-eyebrow"><Moon size={14} /> HERBOLARIO VIVO · TALLER EXPERIMENTAL</p><h1>Tu taller de saberes herbales</h1><p>Plantas conocidas, saberes que perduran. Explora sus fichas y escribe tus propias recetas.</p></div><div className="gh-progress"><span>{rank}</span><strong key={xp} className="gh-xp-pop">{xp} <small>XP</small></strong><progress value={state.completed.length} max={QUESTS.length} aria-label="Encargos completados" /><small>{state.completed.length} de {QUESTS.length} encargos · <Coins size={14} /> {coinsOf(state)} semillas</small></div></section>
      {saveError && <p className="gh-warning" role="alert">El navegador no permite guardar la partida. El progreso de esta sesión se perderá al cerrar o recargar.</p>}
      <div className="gh-sr" role="status">{message}</div>{message.startsWith('No hay suficientes') && <p className="gh-warning" role="alert">{message}</p>}
      <BackupControls state={state} onImport={importState} />

      <div key={tab} className="gh-view">{tab === 'taller' ? <>
        <div className="gh-mode" role="group" aria-label="Modo del taller"><button aria-pressed={!challenge} onClick={() => { setChallenge(false); setResult(null); }}>Taller libre</button><button aria-pressed={challenge} onClick={() => { setChallenge(true); setResult(null); }}>Encargos mágicos</button><p>{challenge ? 'Luz, calma, calor y vigor son puntos ficticios del juego; no describen efectos de las plantas.' : 'Explora ingredientes y guarda recetas con notas. Las porciones son virtuales, sin equivalencia en dosis reales.'}</p></div>
        {state.completed.length === QUESTS.length && <section className="gh-ending"><Sparkle size={28} /><div><h2>El taller ha despertado</h2><p>Completaste los seis encargos en {state.attempts} mezclas y descubriste {state.discoveries.length} fórmulas. El capítulo termina aquí; puedes seguir experimentando y llenar tu grimorio.</p></div><button onClick={() => setTab('libro')}>Ver mis fórmulas <ArrowRight /></button></section>}
        <div className="gh-workspace">
          <section className="gh-panel gh-library" aria-labelledby="ingredients-title"><div className="gh-panel-title"><div><p className="gh-eyebrow">01 · ESCOGE</p><h2 id="ingredients-title">La despensa</h2></div><Leaf size={24} /></div><p className="gh-muted">Cada toque añade una porción. Puedes repetir ingredientes.</p><CatalogFilters search={ingredientSearch} setSearch={setIngredientSearch} region={region} setRegion={setRegion} collection={collection} setCollection={setCollection} prefix="despensa" /><div className="gh-filters" aria-label="Filtrar ingredientes">{['Todas', ...new Set(INGREDIENTS.map(i => i.family))].map(f => <button key={f} aria-pressed={filter === f} onClick={() => setFilter(f)}>{({ Todas: 'Todas', Hoja: 'Hojas', Flor: 'Flores', 'Raíz': 'Raíces', Corteza: 'Cortezas', Fruto: 'Frutos', Base: 'Bases', Rizoma: 'Rizomas', 'Cáliz': 'Cálices', Bulbo: 'Bulbos', Semilla: 'Semillas', Planta: 'Plantas', 'Látex': 'Látex', Ingrediente: 'Otros' })[f]}</button>)}</div>
            <p className="gh-muted" role="status">{visibleIngredients.length} de {INGREDIENTS.length} ingredientes</p>{visibleIngredients.length === 0 && <p className="gh-muted">No hay coincidencias. Cambia los filtros o la búsqueda.</p>}<div className="gh-ingredients">{visibleIngredients.map(i => <div className="gh-ingredient-row" key={i.id}><button className="gh-ingredient" disabled={ids.length >= capacity} onClick={() => add(i)} aria-label={`Añadir ${i.name}`}><span className="gh-leaf" style={{ '--herb': i.color }}><Leaf weight="duotone" size={24} /></span><span className="gh-ingredient-info"><strong>{i.name}</strong><span>{challenge ? Object.entries(i.stats).filter(([, n]) => n).map(([key, n]) => <small key={key} className={`gh-${key}`}>{AXES[key]} {n}</small>) : <small>{HERBS[i.id][1]}</small>}</span></span><Plus size={15} /></button><button className="gh-ficha" aria-label={`Ver ficha de ${i.name}`} onClick={() => openHerb(i.id)}>Ficha</button></div>)}</div>
          </section>
          <section className="gh-panel gh-brewing" aria-labelledby="cauldron-title"><div className="gh-panel-title"><div><p className="gh-eyebrow">02 · EXPERIMENTA</p><h2 id="cauldron-title">Tu caldero</h2></div><span className="gh-pill">{ids.length} / {capacity} porciones</span></div>
            <div className="gh-characters" role="group" aria-label="Elige tu alquimista">{Object.entries(CHARACTERS).map(([id, art]) => <button key={id} aria-pressed={character === id} onClick={() => { setCharacter(id); setSceneEvent(null); }}><img src={art.poster} alt="" width="42" height="42" style={{ objectPosition: art.position }} /><span>{art.name}</span>{character === id && <Check size={14} />}</button>)}</div>
            <WorkshopScene character={character} event={sceneEvent} enabled={animationEnabled} charge={ids.length} onToggle={() => setAnimationEnabled(v => !v)} onResult={showResult} />
            <div className="gh-slots">{Array.from({ length: capacity }, (_, index) => <div key={index} className={selected[index] ? 'filled' : ''}>{selected[index] ? <><span>{selected[index].name}</span><button aria-label={`Quitar porción ${index + 1}: ${selected[index].name}`} onClick={() => setIds(ids.filter((_, n) => n !== index))}><X size={14} /></button></> : <span>+ Espacio {index + 1}</span>}</div>)}</div>
            <fieldset className="gh-methods"><legend>Técnica de preparación</legend>{METHODS.map(m => <button key={m.id} aria-pressed={method === m.id} onClick={() => setMethod(m.id)}><strong>{m.name}</strong><small>{challenge ? m.detail : ({ infusion: 'Preparación acuosa virtual', macerar: 'Contacto prolongado virtual', moler: 'Reducción de tamaño virtual' })[m.id]}</small></button>)}</fieldset>
            <div className="gh-preview"><span>{challenge ? 'Puntos del desafío mágico' : 'Tu experimento'}</span>{!challenge && <p>{preview?.name || 'Selecciona ingredientes para empezar.'}</p>}{challenge && <><Stats stats={preview?.stats || { luz: 0, calma: 0, calor: 0, vigor: 0 }} /></>}</div>
            <label className="gh-stock-choice"><input type="checkbox" checked={useHarvest} onChange={e=>setUseHarvest(e.target.checked)}/> Usar unidades de mi cosecha (se descuentan al crear)</label>
            <button className="gh-conjure" disabled={!ids.length || bruma.busy} onClick={conjure}><Sparkle size={21} /> Crear mezcla <ArrowRight size={19} /></button><p className="gh-footnote">Al crear, Bruma explica tu pócima con Gemini. Se envían la mezcla y sus fichas a Google; tu cuaderno no se envía. Requiere internet y consume cuota. Una fórmula nueva otorga 15 XP.</p>
          </section>
          <aside className="gh-sidebar">
            <section className="gh-panel gh-contract"><p className="gh-eyebrow">{challenge ? '03 · AYUDA AL BOSQUE' : '03 · CONSERVA EL SABER'}</p><div className="gh-contract-number">{challenge ? `ENCARGO ${Math.min(state.completed.length + 1, 6)} / 6` : 'CUADERNO EXPERIMENTAL'}</div><h2>{quest?.title || 'Una receta, una historia'}</h2><p className="gh-who">{quest?.who || 'Tu grimorio se escribe contigo'}</p><p className="gh-story">{quest?.text || 'Consulta las fichas, combina ingredientes y guarda tus observaciones en el Grimorio. Anota también de quién aprendiste: preservar el conocimiento incluye reconocer su origen.'}</p>{quest && <><div className="gh-requirements"><span>La mezcla necesita</span><strong>{METHODS.find(m => m.id === quest.method).name}</strong>{Object.entries(quest.min).map(([k, n]) => <div key={k}><span>{AXES[k]}</span><b>al menos {n}</b></div>)}{Object.entries(quest.max).map(([k, n]) => <div key={k}><span>{AXES[k]}</span><b>máximo {n}</b></div>)}</div><div className="gh-reward"><Sparkle size={17} /> 80 XP <span>+</span><Coins size={17} /> 60 semillas</div></>}</section>
            <section className={bruma.busy ? 'gh-pet thinking' : 'gh-pet'}><div className="gh-pet-heading">{brumaAvatar}<div><h3>Bruma</h3><small>Tu guía del herbolario</small></div></div><p>{hint && quest ? quest.hint : 'Prepara tu pócima. Cuando la crees, te contaré qué aporta cada planta y qué carácter tiene tu mezcla.'}</p>{quest && <button onClick={() => setHint(!hint)}>{hint ? 'Ocultar pista' : 'Pedir una pista'} <Sparkle size={14} /></button>}<BrumaChat potion={bruma} onOpenHerb={openHerb} onAsk={askAbout} /></section>
            <section className="gh-upgrade"><Hammer size={21} /><div><h3>{state.upgraded ? 'Caldero ampliado' : 'Un poco más de espacio'}</h3><p>{state.upgraded ? 'Cuatro porciones para tus próximas fórmulas.' : 'Añade un cuarto espacio al caldero.'}</p><button disabled={state.upgraded || coinsOf(state) < 100} onClick={() => { setState(upgrade(state)); setMessage('Caldero ampliado a cuatro porciones.'); }}>{state.upgraded ? 'Mejora adquirida' : 'Ampliar · 100 semillas'}</button></div></section>
          </aside>
        </div>
        {result && <section className={`gh-result ${result.success ? 'success' : ''}`} ref={resultRef} tabIndex={-1} aria-labelledby="result-title"><div><p className="gh-eyebrow">{result.fresh ? 'NUEVA FÓRMULA EN TU GRIMORIO' : 'FÓRMULA CONOCIDA'} · +{result.earned} XP</p><h2 id="result-title">{result.success ? 'Encargo completado' : result.quest ? 'La mezcla necesita un ajuste' : result.name}</h2><p>{result.success ? result.quest.reply : result.quest ? `Para «${result.quest.title}», revisa las condiciones pendientes. Puedes cambiar porciones o técnica y volver a intentar.` : 'Tu experimento está registrado. Sigue buscando nuevas combinaciones.'}</p><div className="gh-result-checks">{result.checks.map(c => <span key={c.label} className={c.met ? 'met' : 'miss'}>{c.met ? <Check size={15} /> : <X size={15} />}{c.label}</span>)}</div>{result.quest && <Stats stats={result.stats} />}<p className="gh-muted">Añade tus observaciones en el Grimorio.</p><button onClick={() => setTab('libro')}>Anotar mi receta <BookOpen size={15} /></button></div><button onClick={() => { setResult(null); setSceneEvent(null); if (result.success) setIds([]); document.getElementById('cauldron-title')?.scrollIntoView({ block: 'center', behavior: 'smooth' }); }}>{result.success ? quest ? 'Siguiente encargo' : 'Seguir explorando' : 'Ajustar mezcla'} <ArrowRight size={17} /></button></section>}
      </> : (tab === 'jardin' || tab === 'explorar') ? <Suspense fallback={<section className="gh-panel" role="status">Bruma está abriendo el jardín y los senderos…</section>}><NatureGames key={`${tab}:${importRevision}`} mode={tab} state={state} setState={setState} onOpenHerb={openHerb} onUse={id => { setUseHarvest(true);setIds([id]);setMethod('infusion');setResult(null);setSceneEvent(null);setTab('taller');setMessage('Planta de tu cesta preparada en el caldero.'); }} /></Suspense> : tab === 'consulta' ? <BrumaAsk consult={consult} onOpenHerb={openHerb} onBrew={brewPlants} avatar={brumaAvatar} /> : tab === 'herbario' ? <Herbarium focus={herbFocus} onAsk={id => askAbout([id])} onAdd={i => { if (ids.length < capacity) add(i); else setMessage('El caldero está lleno. Quita una porción para añadir este ingrediente.'); setTab('taller'); }} /> : <section className="gh-book"><div className="gh-book-heading gh-illustrated-book"><div><p className="gh-eyebrow">TU COLECCIÓN PERSONAL</p><h2>Un libro escrito con descubrimientos</h2><p>{state.discoveries.length} {state.discoveries.length === 1 ? 'fórmula' : 'fórmulas'} · Las proporciones y la técnica quedan guardadas.</p></div><BookOpen size={42} /></div>{state.discoveries.length === 0 ? <div className="gh-empty"><Leaf size={45} /><h3>La primera página te espera</h3><p>Crea una mezcla en el taller para descubrir tu primera fórmula.</p><button onClick={() => setTab('taller')}>Ir al taller <ArrowRight size={18} /></button></div> : <div className="gh-recipes">{[...state.discoveries].reverse().map(d => { const recipe = evaluate(d.ids, d.method, 4); return <article key={d.key}><p className="gh-eyebrow">{METHODS.find(m => m.id === d.method).name}</p><h3>{state.notebook[d.key]?.title || recipe.name}</h3><p>{[...new Set(d.ids)].map(id => `${d.ids.filter(x => x === id).length} × ${INGREDIENTS.find(i => i.id === id).name}`).join(' · ')}</p><RecipeNote key={`${importRevision}:${d.key}`} recipeKey={d.key} note={state.notebook[d.key]} onSave={(key, note) => setState(s => saveRecipeNote(s, key, note))} /><button onClick={() => { setIds([...d.ids]); setMethod(d.method); setResult(null); setSceneEvent(null); setTab('taller'); setMessage('Fórmula cargada en el caldero.'); }}>Preparar de nuevo <ArrowRight size={15} /></button></article>; })}</div>}</section>}</div>
      <footer className="gh-footer"><span>Herbolario con fuentes · Recetas virtuales · Guardado en este navegador</span>{resetConfirm ? <div><span>¿Borrar el progreso de esta demo?</span><button onClick={reset}>Sí, comenzar de nuevo</button><button onClick={() => setResetConfirm(false)}>Cancelar</button></div> : <button onClick={() => setResetConfirm(true)}>Nueva partida</button>}</footer>
    </main>
    <PrintableGrimorio state={state} />
  </div>;
}
