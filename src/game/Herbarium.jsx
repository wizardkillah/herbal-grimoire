import { useState } from 'react';
import { INGREDIENTS } from './rules.js';
import { HERBS } from './herbs.js';
import BrumaPanel, { IngredientPhoto } from './BrumaPanel.jsx';
import { matchesIngredient, REGIONS } from './catalog.js';
export function Herbarium({ focus, onAdd, onAsk }) {
  const [search, setSearch] = useState('');
  const [detailId, setDetailId] = useState(focus);
  const [region, setRegion] = useState('todas');
  const [collection, setCollection] = useState('Todas');
  const found = INGREDIENTS.filter(i => matchesIngredient({ ...i, latin: HERBS[i.id][0] }, search, region, collection)).sort((a,b) => Number(b.id === focus) - Number(a.id === focus) || a.name.localeCompare(b.name, 'es'));
  return <section className="gh-herbarium"><p className="gh-eyebrow">EL CATÁLOGO COMPLETO · CHILE Y LATINOAMÉRICA</p><h2>El herbolario de Bruma</h2><p>Plantas medicinales tradicionales, tés, especias e ingredientes del catálogo original. Las colecciones regionales sirven para explorar; no indican un origen exclusivo ni que todas las especies sean nativas.</p>
    <CatalogFilters search={search} setSearch={setSearch} region={region} setRegion={setRegion} collection={collection} setCollection={setCollection} prefix="herbolario" />
    <a className="gh-catalog-download" href="/catalogo-ingredientes.md" download>Descargar lista completa y correspondencias</a><p role="status">{found.length} de {INGREDIENTS.length} ingredientes · Las fichas pendientes están identificadas.</p>
    {found.length === 0 && <p>No hay coincidencias. Prueba otro nombre o cambia los filtros.</p>}
    <div className="gh-herb-grid">{found.map(i => { const [latin, part, evidence, use, caution, source, url] = HERBS[i.id]; return <article key={i.id} className={i.id === focus ? 'focused' : ''}><IngredientPhoto ingredient={i} /><span className="gh-pill">{evidence}</span><h3>{i.name}</h3><i>{latin}</i><p className="gh-catalog-tags">{REGIONS[i.region]} · {i.collections.join(' · ') || 'Taller original'}</p><p><strong>Parte o presentación:</strong> {part}</p><p>{use}</p><p className="gh-herb-caution">{caution}</p>{url ? <a href={url} target="_blank" rel="noreferrer">{source} ↗</a> : <small>{source}</small>}<button id={`herb-open-${i.id}`} onClick={() => setDetailId(i.id)}>Explorar con Bruma</button>{onAsk && <button onClick={() => onAsk(i.id)}>Preguntar a Bruma</button>}<button onClick={() => onAdd(i)}>Llevar al taller</button></article>; })}</div><p className="gh-muted">Las fichas no indican dosis. El simulador no calcula interacciones, eficacia ni seguridad de las mezclas.</p>{detailId && <BrumaPanel key={detailId} ingredient={INGREDIENTS.find(i => i.id === detailId)} onClose={() => setDetailId(null)} onAdd={onAdd} onAsk={onAsk} />}</section>;
}
export function CatalogFilters({ search, setSearch, region, setRegion, collection, setCollection, prefix }) {
  return <div className="gh-catalog-filters"><label htmlFor={`${prefix}-search`}>Buscar ingrediente<input id={`${prefix}-search`} type="search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Nombre común o botánico…" /></label><label htmlFor={`${prefix}-region`}>Colección regional<select id={`${prefix}-region`} value={region} onChange={e => setRegion(e.target.value)}>{Object.entries(REGIONS).map(([id, name]) => <option key={id} value={id}>{name}</option>)}</select></label><label htmlFor={`${prefix}-collection`}>Tipo de colección<select id={`${prefix}-collection`} value={collection} onChange={e => setCollection(e.target.value)}>{['Todas', 'Herbolario', 'Tés y aromas', 'Cocina', 'Artesanales', 'Bases', 'Bebidas'].map(name => <option key={name}>{name}</option>)}</select></label></div>;
}
export function RecipeNote({ recipeKey, note, onSave }) {
  const [draft, setDraft] = useState(note || { title: '', observation: '', origin: '' });
  const [saved, setSaved] = useState(false);
  const field = (key, value) => { setDraft(d => ({ ...d, [key]: value })); setSaved(false); };
  return <form className="gh-note" onSubmit={e => { e.preventDefault(); onSave(recipeKey, draft); setSaved(true); }}><label>Nombre de tu receta<input maxLength={140} value={draft.title} onChange={e => field('title', e.target.value)} /></label><label>Observaciones e hipótesis<textarea maxLength={2000} value={draft.observation} onChange={e => field('observation', e.target.value)} placeholder="Qué quieres explorar, qué cambiarías…" /></label><label>Origen del conocimiento<input maxLength={500} value={draft.origin} onChange={e => field('origin', e.target.value)} placeholder="Persona, comunidad, libro o enlace; registra con su permiso" /></label><button type="submit">Guardar notas</button><span role="status">{saved ? 'Notas guardadas en este navegador.' : ''}</span></form>;
}
