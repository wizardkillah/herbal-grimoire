import { useEffect, useRef, useState } from 'react';
import { BookOpen, Leaf, MagnifyingGlassPlus, Sparkle, X } from '@phosphor-icons/react';
import { HERBS } from './herbs.js';
import { IDENTIFICATION } from './identification.js';
import IMAGES from './ingredient-images.json';
import './bruma.css';
import './bruma-avatar.css';

export function IngredientPhoto({ ingredient, detailed = false }) {
  const [failed, setFailed] = useState(false);
  const photo = IMAGES[ingredient.id];
  useEffect(() => setFailed(false), [ingredient.id]);
  if (!photo?.src || failed) return <div className="gh-photo-missing"><Leaf size={32} /><span>{failed ? 'No se pudo cargar la imagen.' : 'Imagen pendiente de incorporación.'}</span>{photo?.sourceUrl && <a href={photo.sourceUrl} target="_blank" rel="noreferrer">Consultar la referencia original</a>}</div>;
  return <figure className={`gh-ingredient-photo ${detailed ? 'detailed' : ''}`}><img src={photo.src} width={photo.width} height={photo.height} alt={photo.caption || `Referencia visual de ${ingredient.name}`} loading={detailed ? 'eager' : 'lazy'} decoding="async" onError={() => setFailed(true)} />{detailed && <figcaption>{photo.caption}<br /><span>{photo.author} · {photo.license}</span><div><a href={photo.sourceUrl} target="_blank" rel="noreferrer">Ficha de la imagen ↗</a>{photo.licenseUrl && <a href={photo.licenseUrl} target="_blank" rel="noreferrer">Licencia ↗</a>}<a href={photo.originalUrl} target="_blank" rel="noreferrer"><MagnifyingGlassPlus size={14} /> Abrir imagen original</a></div></figcaption>}</figure>;
}

export default function BrumaPanel({ ingredient, onClose, onAdd, onAsk }) {
  const dialog = useRef(null);
  const title = useRef(null);
  const [section, setSection] = useState('reconocer');
  const [checked, setChecked] = useState([]);
  const [zoom, setZoom] = useState(false);
  const herb = HERBS[ingredient.id];
  const detail = IDENTIFICATION[ingredient.id];
  const photo = IMAGES[ingredient.id];
  useEffect(() => {
    const previous = document.activeElement;
    const element = dialog.current;
    element.showModal();
    title.current?.focus();
    return () => { element.close(); if (previous?.isConnected && previous !== document.body) previous.focus(); else document.getElementById(`herb-open-${ingredient.id}`)?.focus(); };
  }, []);
  const tabs = [['reconocer', 'Reconocer'], ['saberes', 'Usos y cuidados'], ['fuentes', 'Fuentes y créditos']];
  return <dialog ref={dialog} className={`gh-bruma-dialog ${zoom ? 'photo-zoom' : ''}`} aria-labelledby="bruma-title" onCancel={e => { e.preventDefault(); onClose(); }}>
    <header><div><img className="gh-bruma-icon" src="/media/bruma/icono.png" alt="" width="54" height="54" /><div><p className="gh-eyebrow">BRUMA · TU GUÍA DEL HERBOLARIO</p><h2 id="bruma-title" ref={title} tabIndex={-1}>{ingredient.name}</h2><p>{herb[0]}</p></div></div><button className="gh-bruma-close" onClick={onClose} aria-label="Cerrar panel de Bruma"><X size={22} /></button></header>
    <div className="gh-bruma-content"><div className="gh-bruma-visual"><IngredientPhoto ingredient={ingredient} detailed /><button className="gh-zoom" aria-pressed={zoom} onClick={() => setZoom(v => !v)}><MagnifyingGlassPlus size={17} />{zoom ? 'Volver a la ficha' : 'Ampliar imagen en el panel'}</button></div>
    <div className="gh-bruma-reading"><div className="gh-bruma-tabs" role="tablist" aria-label="Contenido de la ficha">{tabs.map(([id, label], index) => <button key={id} role="tab" id={`bruma-tab-${id}`} aria-selected={section === id} aria-controls={`bruma-page-${id}`} tabIndex={section === id ? 0 : -1} onClick={() => setSection(id)} onKeyDown={e => { let n; if (e.key === 'ArrowRight') n = (index + 1) % tabs.length; if (e.key === 'ArrowLeft') n = (index + tabs.length - 1) % tabs.length; if (e.key === 'Home') n = 0; if (e.key === 'End') n = tabs.length - 1; if (n !== undefined) { e.preventDefault(); setSection(tabs[n][0]); document.getElementById(`bruma-tab-${tabs[n][0]}`)?.focus(); } }}>{label}</button>)}</div>
      <section role="tabpanel" id={`bruma-page-${section}`} aria-labelledby={`bruma-tab-${section}`} tabIndex={0}>
        {section === 'reconocer' && <><p className="gh-bruma-quote">«Mira la planta completa y después los detalles. Una sola coincidencia cuenta poco: cada hoja, flor y fruto añade contexto.»</p><p><strong>Parte o presentación:</strong> {herb[1]}</p><span className="gh-pill">{detail.evidence}</span><h3>En qué fijarte</h3><div className="gh-observation-checks">{detail.features.map((feature, n) => <label key={feature}><input type="checkbox" checked={checked.includes(n)} onChange={() => setChecked(old => old.includes(n) ? old.filter(x => x !== n) : [...old, n])} /><span>{feature}</span></label>)}</div><p className="gh-observation-status" role="status">{checked.length} de {detail.features.length} rasgos marcados · Ayuda de lectura, no resultado de identificación. Las marcas se borran al cerrar.</p><h3>Confusiones y límites</h3><p>{detail.confusion}</p>{detail.sourceUrl && <a href={detail.sourceUrl} target="_blank" rel="noreferrer">Consultar descripción botánica ↗</a>}</>}
        {section === 'saberes' && <><span className="gh-pill">{herb[2]}</span><h3>Conocimiento registrado</h3><p>{herb[3]}</p><h3>Cuidados y alcance</h3><p>{herb[4]}</p><p>Esta ficha no incluye dosis ni certifica mezclas. En el Grimorio puedes conservar tus hipótesis y reconocer a las personas o comunidades de quienes aprendiste.</p>{herb[6] ? <a href={herb[6]} target="_blank" rel="noreferrer">{herb[5]} ↗</a> : <p className="gh-muted">{herb[5]}</p>}</>}
        {section === 'fuentes' && <><h3>Descripción e identificación</h3><p>{detail.sourceTitle}</p>{detail.sourceUrl ? <a href={detail.sourceUrl} target="_blank" rel="noreferrer">Abrir referencia botánica ↗</a> : <p>Los puntos de observación orientan la comparación visual. No constituyen una clave taxonómica revisada por especialistas.</p>}<h3>Usos documentados</h3>{herb[6] ? <a href={herb[6]} target="_blank" rel="noreferrer">{herb[5]} ↗</a> : <p>Ficha medicinal pendiente de revisión; no se atribuyen propiedades nuevas.</p>}<h3>Imagen</h3>{photo?.src ? <><p>{photo.author} · {photo.license}</p><p>{photo.caption}</p><a href={photo.sourceUrl} target="_blank" rel="noreferrer">Autor, licencia y archivo original ↗</a><p>La foto es una referencia de la especie, producto o presentación indicada. Su licencia corresponde a la imagen; no valida el contenido medicinal.</p></> : <p>Imagen pendiente.</p>}<p className="gh-muted">Revisión editorial: septiembre de 2026.</p></>}
      </section>{onAsk && <button className="gh-bruma-add gh-bruma-ask-link" onClick={() => { onClose(); onAsk(ingredient.id); }}><Sparkle size={18} /> Preguntar a Bruma sobre {ingredient.name}</button>}<button className="gh-bruma-add" onClick={() => { onClose(); onAdd(ingredient); }}><BookOpen size={18} /> Llevar al taller</button>
    </div></div>
  </dialog>;
}
