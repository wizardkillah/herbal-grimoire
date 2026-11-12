import { Component, lazy, Suspense, useState } from 'react';
import { INGREDIENTS } from './rules.js';
import { natureAction, natureXP } from './nature.js';
import { ORIGINS, QUALITIES } from './nature-v9.js';
import Garden from './GardenV9.jsx';
import images from './ingredient-images.json';
import './nature.css';
import './nature-v9.css';
const Trail=lazy(()=>import('./Trail2D.jsx'));
const Legacy=lazy(()=>import('./LegacyNature.jsx'));
const name=id=>INGREDIENTS.find(i=>i.id===id)?.name||id;
class SceneBoundary extends Component {
  state={error:false};
  static getDerivedStateFromError(){return {error:true};}
  render(){return this.state.error?<section className="gh-panel"><p role="alert">No se pudo abrir esta vista. Tu partida está guardada.</p><button onClick={()=>this.setState({error:false})}>Volver a intentar</button></section>:this.props.children;}
}
export default function NatureGames(props){
  const {mode,state,setState,onOpenHerb,onUse}=props;
  const [notice,setNotice]=useState(''),[legacy,setLegacy]=useState(false);const n=state.nature;
  function act(action,text){setState(current=>({...current,nature:natureAction(current.nature,action)}));setNotice(text);}
  if(legacy)return <><button onClick={()=>setLegacy(false)}>Volver a La Senda</button><Suspense fallback={<p role="status">Abriendo el mapa…</p>}><Legacy {...props}/></Suspense></>;
  return <section className="gh-nature"><header className="gh-nature-banner"><div><p className="gh-eyebrow">{mode==='jardin'?'EL INVERNADERO':'LA SENDA'}</p><h2>{mode==='jardin'?'El jardín de Bruma':'Más allá del invernadero'}</h2><p>{mode==='jardin'?'Cultiva a tu ritmo, cuida la tierra y conserva tus cosechas.':'Camina por el territorio, encuentra semillas y vuelve con nuevas historias.'}</p></div><div className="gh-nature-score"><strong>{natureXP(n)} XP</strong><span>experiencia de naturaleza</span><small>{n.harvests} cosechas · {n.finds} hallazgos</small></div></header><p className="gh-nature-notice" role="status">{notice}</p>
  <SceneBoundary key={mode}><Suspense fallback={<p role="status">Preparando el paisaje…</p>}>{mode==='jardin'?<Garden n={n} act={act} name={name}/>:<Trail n={n} act={act} name={name} onLegacy={()=>setLegacy(true)}/>}</Suspense></SceneBoundary>
  <section className="gh-basket" id="nature-basket" tabIndex={-1}><p className="gh-eyebrow">DEL TERRITORIO A TU CALDERO</p><h3>La cesta del herbolario</h3><p>Elige una cosecha para preparar una mezcla con sus unidades. También puedes usar libremente el catálogo del taller.</p><div className="gh-basket-items">{Object.entries(n.collection).map(([id,total])=>{const stock=n.stock[id]||{},available=Object.values(stock).reduce((a,b)=>a+b,0);return <article key={id}><img src={images[id].src} alt={name(id)} loading="lazy"/><div><strong>{name(id)}</strong><small>{available} disponibles · {total} recogidas en total</small>{Object.entries(stock).map(([key,qty])=>{const [origin,quality]=key.split(':');return <small key={key}>{qty} · {ORIGINS[origin]} · {QUALITIES[quality]}</small>})}<button onClick={()=>onOpenHerb(id)}>Ficha y créditos</button><button disabled={!available} onClick={()=>onUse(id)}>Llevar al taller</button></div></article>;})}</div>{!Object.keys(n.collection).length&&<p>Tu cesta está vacía. Siembra o explora para llenarla.</p>}</section></section>;
}
