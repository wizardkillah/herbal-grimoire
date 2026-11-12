import { INGREDIENTS, METHODS, evaluate } from './rules.js';

export default function PrintableGrimorio({ state }) {
  return <section className="gh-printbook" aria-label="Grimorio para imprimir">
    <header><h1>Mi Grimorio Herbal</h1><p>Cuaderno de recetas virtuales · {state.discoveries.length} recetas guardadas</p></header>
    {state.discoveries.map(discovery => {
      const recipe = evaluate(discovery.ids,discovery.method,4);
      const note = state.notebook[discovery.key];
      return <article key={discovery.key}>
        <h2>{note?.title || recipe.name}</h2>
        <p><strong>Técnica virtual:</strong> {METHODS.find(m => m.id === discovery.method).name}</p>
        <p><strong>Porciones virtuales, sin equivalencia en dosis:</strong> {[...new Set(discovery.ids)].map(id => `${discovery.ids.filter(x => x === id).length} × ${INGREDIENTS.find(i => i.id === id).name}`).join(' · ')}</p>
        <h3>Observaciones e hipótesis</h3><p>{note?.observation || 'Sin observaciones guardadas.'}</p>
        <h3>Origen del conocimiento</h3><p>{note?.origin || 'Origen aún no registrado.'}</p>
      </article>;
    })}
    <footer>Recetas virtuales sin validación terapéutica ni de seguridad. Este cuaderno no indica dosis ni instrucciones para consumo.</footer>
  </section>;
}
