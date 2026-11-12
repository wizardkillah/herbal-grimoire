import { useEffect, useRef, useState } from 'react';
import './bruma-chat.css';

export function useBrumaPotion() {
  const [answer,setAnswer]=useState(null);
  const [error,setError]=useState('');
  const [busy,setBusy]=useState(false);
  const [recipe,setRecipe]=useState(null);
  const request=useRef(null);
  useEffect(() => () => request.current?.abort(),[]);
  function clear() { request.current?.abort();request.current=null;setAnswer(null);setError('');setBusy(false);setRecipe(null); }
  async function explain(ids,method,provenance=[]) {
    request.current?.abort();
    const controller=new AbortController();request.current=controller;
    setRecipe({ids,method,provenance});setAnswer(null);setError('');setBusy(true);
    try {
      const response=await fetch('/api/bruma',{method:'POST',headers:{'Content-Type':'application/json'},signal:controller.signal,body:JSON.stringify({ids,method,provenance,question:'Acabo de crear esta pócima. Cuéntame de forma natural qué aportan las propiedades de sus ingredientes y qué carácter tiene la combinación, como un herbolario que me acompaña en el taller.'})});
      if (!response.headers.get('content-type')?.includes('application/json')) throw new Error('Reabre el juego con el lanzador actualizado para conectar a Bruma.');
      const data=await response.json();
      if (!response.ok) throw new Error(data.error || 'No se pudo consultar a Bruma.');
      if(request.current===controller) setAnswer(data);
    } catch(e) { if(request.current===controller && e.name!=='AbortError') setError(e.message || 'No hay conexión con Bruma.'); }
    finally { if(request.current===controller) setBusy(false); }
  }
  return {answer,error,busy,recipe,explain,clear};
}

export default function BrumaChat({ potion, onOpenHerb, onAsk }) {
  const {answer,error,busy,recipe,explain}=potion;
  return <div className="gh-bruma-chat" aria-busy={busy}>
    <h4>Bruma interpreta tu pócima</h4>
    <div role="status" aria-live="polite">{busy ? <>Bruma está estudiando la pócima que acabas de crear<span className="gh-dots" aria-hidden="true"><i /><i /><i /></span></> : answer ? 'La explicación de tu última pócima está lista.' : !error ? 'Crea una mezcla para descubrir su interpretación.' : ''}</div>
    {error && <><p className="gh-ai-error" role="alert">{error} Tu receta sigue guardada en el Grimorio.</p><button disabled={busy} onClick={()=>explain(recipe.ids,recipe.method,recipe.provenance)}>Reintentar explicación</button></>}
    {answer && <section className="gh-ai-answer" aria-label="Respuesta de Bruma">
      <small>Pócima creada · {answer.recipe}</small>
      <p>{answer.reply}</p>
      <details><summary>Propiedades y cuidados registrados por ingrediente</summary>
        {answer.ingredients.map(ingredient=><article key={ingredient.id}>
          <strong>{ingredient.name}</strong><small>{ingredient.latin} · {ingredient.part} · {ingredient.evidence}</small>
          <p>{ingredient.summary}</p><p>{ingredient.limit}</p>
          {ingredient.sourceUrl ? <a href={ingredient.sourceUrl} target="_blank" rel="noreferrer">{ingredient.sourceName} ↗</a> : <p>Fuente medicinal pendiente de revisión.</p>}
          <button onClick={()=>onOpenHerb(ingredient.id)}>Abrir ficha de {ingredient.name}</button>
        </article>)}
      </details>
      {onAsk && recipe && <button onClick={()=>onAsk(recipe.ids)}>Seguir preguntando sobre estas plantas</button>}
      <p className="gh-ai-limit">Esto es una simulación.</p>
    </section>}
  </div>;
}
