import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkle, X } from '@phosphor-icons/react';
import { INGREDIENTS } from './rules.js';
import './bruma-ask.css';

const MAX_PLANTS = 4;
const nameOf = id => INGREDIENTS.find(i => i.id === id)?.name || id;
const SORTED = [...INGREDIENTS].sort((a, b) => a.name.localeCompare(b.name, 'es'));

// Conversation with Bruma. It lives in the workshop so it survives moving between sections; it is not saved.
export function useBrumaAsk() {
  const [turns, setTurns] = useState([]);
  const [plants, setPlants] = useState([]);
  const [draft, setDraft] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const request = useRef(null);
  useEffect(() => () => request.current?.abort(), []);

  function clear() { request.current?.abort(); request.current = null; setTurns([]); setPlants([]); setDraft(''); setBusy(false); setError(''); }
  function addPlant(id) { setPlants(old => old.includes(id) || old.length >= MAX_PLANTS ? old : [...old, id]); }
  function removePlant(id) { setPlants(old => old.filter(x => x !== id)); }
  function focusPlants(ids) { setPlants([...new Set(ids)].slice(0, MAX_PLANTS)); setError(''); }

  async function ask(text) {
    const question = text.trim();
    if (!question || busy) return;
    request.current?.abort();
    const controller = new AbortController(); request.current = controller;
    const history = turns.map(({ role, text }) => ({ role, text }));
    setDraft(question); setError(''); setBusy(true);
    try {
      const response = await fetch('/api/bruma/ask', { method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: controller.signal, body: JSON.stringify({ question, ids: plants, history }) });
      if (!response.headers.get('content-type')?.includes('application/json')) throw new Error('Reabre el juego con el lanzador actualizado para conectar a Bruma.');
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'No se pudo consultar a Bruma.');
      if (request.current !== controller) return;
      setTurns(old => [...old, { role: 'user', text: question }, { role: 'bruma', text: data.reply, ingredients: data.ingredients }]);
      setDraft('');
    } catch (e) {
      if (request.current === controller && e.name !== 'AbortError') setError(e.message || 'No hay conexión con Bruma.');
    } finally { if (request.current === controller) setBusy(false); }
  }
  return { turns, plants, draft, busy, error, setDraft, ask, clear, addPlant, removePlant, focusPlants };
}

function suggestions(plants) {
  if (plants.length === 1) {
    const name = nameOf(plants[0]);
    return [`¿Qué propiedades y beneficios se atribuyen a ${name}?`, `¿Cómo reconozco ${name} y con qué se puede confundir?`, `¿Con qué plantas del herbolario combina bien ${name}?`];
  }
  if (plants.length > 1) {
    const names = plants.map(nameOf).join(', ');
    return [`¿Qué aporta cada planta de esta combinación: ${names}?`, `¿Qué técnica conviene para preparar ${names}?`, `¿Hay algún cuidado conocido al combinar ${names}?`];
  }
  return ['¿Qué plantas se usan tradicionalmente para la digestión?', '¿Qué diferencia hay entre infusión, decocción y maceración?', 'Propón una receta relajante con plantas del herbolario.'];
}

export default function BrumaAsk({ consult, onOpenHerb, onBrew, avatar }) {
  const { turns, plants, draft, busy, error, setDraft, ask, clear, addPlant, removePlant } = consult;
  const end = useRef(null);
  useEffect(() => { if (turns.length) end.current?.scrollIntoView({ block: 'nearest', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }); }, [turns.length, busy]);
  return <section className="gh-ask" aria-labelledby="ask-title">
    <div className="gh-ask-heading">{avatar}<div><p className="gh-eyebrow"><Sparkle size={14} /> EL HERBOLARIO RESPONDE</p><h2 id="ask-title">Pregúntale a Bruma</h2><p>Consulta beneficios, propiedades, usos, cómo reconocer una planta o cómo combinarla. Añade plantas a la consulta para que Bruma parta de sus fichas.</p></div>{turns.length > 0 && <button onClick={clear}>Nueva conversación</button>}</div>

    <div className="gh-ask-plants"><span id="ask-plants-label">Plantas en la consulta</span>
      <ul aria-labelledby="ask-plants-label">{plants.map(id => <li key={id}><button className="gh-ask-plant" onClick={() => onOpenHerb(id)} aria-label={`Abrir ficha de ${nameOf(id)}`}>{nameOf(id)}</button><button className="gh-ask-remove" onClick={() => removePlant(id)} aria-label={`Quitar ${nameOf(id)} de la consulta`}><X size={13} /></button></li>)}{plants.length === 0 && <li className="gh-muted">Ninguna: pregunta general.</li>}</ul>
      <label htmlFor="ask-add">Añadir planta<select id="ask-add" value="" disabled={plants.length >= MAX_PLANTS} onChange={e => { if (e.target.value) addPlant(e.target.value); }}><option value="">{plants.length >= MAX_PLANTS ? 'Máximo de cuatro' : 'Elegir…'}</option>{SORTED.filter(i => !plants.includes(i.id)).map(i => <option key={i.id} value={i.id}>{i.name}</option>)}</select></label>
      {plants.length > 0 && onBrew && <button onClick={() => onBrew(plants)}>Llevar al caldero <ArrowRight size={14} /></button>}
    </div>

    <div className="gh-ask-log" role="log" aria-live="polite" aria-label="Conversación con Bruma">
      {turns.length === 0 && !busy && <p className="gh-muted">Todavía no hay preguntas. Escribe la tuya o empieza con una sugerencia.</p>}
      {turns.map((turn, n) => turn.role === 'user'
        ? <p key={n} className="gh-ask-question"><span>Tú</span>{turn.text}</p>
        : <article key={n} className="gh-ask-answer"><span>Bruma</span><p>{turn.text}</p>
          {turn.ingredients?.length > 0 && <div className="gh-ask-cards"><small>Fichas consultadas:</small>{turn.ingredients.map(i => <button key={i.id} onClick={() => onOpenHerb(i.id)}>{i.name} · {i.evidence}</button>)}</div>}
          <small className="gh-ask-note">Respuesta generada por IA; puede contener errores. Las fichas con fuente son la referencia revisada. No es consejo médico.</small></article>)}
      {busy && <p className="gh-ask-question pending"><span>Tú</span>{draft}</p>}
      {busy && <p className="gh-muted" role="status">Bruma está consultando sus cuadernos<span className="gh-dots" aria-hidden="true"><i /><i /><i /></span></p>}
      <div ref={end} />
    </div>
    {error && <p className="gh-ask-error" role="alert">{error} Tu pregunta sigue en el cuadro; puedes reintentar.</p>}

    <div className="gh-ask-suggestions" role="group" aria-label="Preguntas sugeridas">{suggestions(plants).map(text => <button key={text} disabled={busy} onClick={() => ask(text)}>{text}</button>)}</div>
    <form className="gh-ask-form" onSubmit={e => { e.preventDefault(); ask(draft); }}>
      <label htmlFor="ask-question">Tu pregunta</label>
      <textarea id="ask-question" maxLength={1000} value={busy ? '' : draft} disabled={busy} onChange={e => setDraft(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); ask(draft); } }} placeholder="Por ejemplo: ¿para qué se usa el matico y qué parte se emplea?" />
      <button type="submit" disabled={busy || !draft.trim()}><Sparkle size={17} /> Preguntar</button>
    </form>
    <p className="gh-footnote">Bruma responde con Gemini: se envían a Google tu pregunta, las últimas respuestas de esta conversación y las fichas de las plantas elegidas o mencionadas. Tu cuaderno no se envía. Requiere internet y consume cuota. La conversación no se guarda al cerrar el juego.</p>
  </section>;
}
