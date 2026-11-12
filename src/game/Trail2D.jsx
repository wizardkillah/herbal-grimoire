import { useEffect, useRef, useState } from 'react';
import { ZONES, worldNodes, near, solid } from './nature-v9.js';
import { natureXP } from './nature.js';

function Cutting({onFinish,onCancel}) {
  const cursor=useRef(null),position=useRef(.5),[scores,setScores]=useState([]),[assisted,setAssisted]=useState(()=>matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(()=>{if(assisted)return;let frame;const start=performance.now();const tick=now=>{position.current=(Math.sin((now-start)/450)+1)/2;if(cursor.current)cursor.current.style.left=`${position.current*100}%`;frame=requestAnimationFrame(tick);};frame=requestAnimationFrame(tick);return()=>cancelAnimationFrame(frame);},[assisted]);
  function cut(){const delta=Math.abs(position.current-.5),score=assisted?1:delta<.1?2:delta<.25?1:0;const next=[...scores,score];if(next.length===3){const mean=next.reduce((a,b)=>a+b,0)/3;onFinish(mean>=1.5?'excellent':mean>=.6?'fresh':'dry');}else setScores(next);}
  return <section className="gh-cutting" aria-label="Corte de recolección"><h3>Un corte cuidadoso</h3><p>Tres cortes. Detén la aguja en el centro verde para mejorar el cuidado de tu hallazgo. {scores.length} / 3 realizados.</p><label><input type="checkbox" checked={assisted} onChange={e=>setAssisted(e.target.checked)}/> Recolectar sin precisión temporal (calidad fresca)</label>{!assisted&&<div className="gh-cut-bar" aria-hidden="true"><span/><i ref={cursor}/></div>}<button className="gh-nature-primary" onClick={cut}>{assisted?'Recoger con calma':'Cortar'}</button><button onClick={onCancel}>Cancelar recolección</button></section>;
}
function makeAtlas(){const atlas=document.createElement('canvas');atlas.width=128;atlas.height=192;const c=atlas.getContext('2d');for(let row=0;row<4;row++)for(let frame=0;frame<4;frame++){const x=frame*32,y=row*48; c.fillStyle='#35463e';c.fillRect(x+8,y+41,17,4);c.fillStyle='#e0c8a0';c.fillRect(x+12,y+14,11,10);c.fillStyle='#645478';c.fillRect(x+8,y+25,18,16);c.fillStyle='#aa8c60';c.fillRect(x+8,y+33,18,3);c.fillStyle='#443951';c.fillRect(x+6,y+11,22,5);c.fillRect(x+10,y+7,14,5);c.fillRect(x+13,y+2,8,6);c.fillStyle='#dccc90';c.fillRect(x+17,y+8,3,3);c.fillStyle='#493f38';c.fillRect(x+9,y+39,6,5+(frame%2?2:0));c.fillRect(x+21,y+39,5,5+(frame%2?0:2));if(row!==1){c.fillStyle='#33453f';c.fillRect(x+(row===2?12:20),y+18,2,3);}}return atlas;}

export default function Trail2D({n,act,name,onLegacy}) {
  const canvas=useRef(null),world=useRef(n.world),held=useRef(null),dispatch=useRef(act),[cut,setCut]=useState(null),[facing,setFacing]=useState(0);const direction=useRef(0),cutActive=useRef(false);cutActive.current=!!cut;world.current=n.world;dispatch.current=act;
  const w=n.world,zone=ZONES[w.zone],nearNode=worldNodes(w).find(node=>near(w,node)&&(w.nodes[node.key]||0)<=Date.now()),loreKey=`${w.zone}:${w.screen}`,nearLore=near(w,{x:11,y:2});
  useEffect(()=>{if(cut)held.current=null;},[cut]);
  useEffect(()=>{
    const element=canvas.current,ctx=element.getContext('2d'),atlas=makeAtlas();let raf,last=performance.now(),acc=0,moveElapsed=0;const reduced=matchMedia('(prefers-reduced-motion: reduce)');
    const mappings={ArrowUp:[0,-1,1],w:[0,-1,1],ArrowDown:[0,1,0],s:[0,1,0],ArrowLeft:[-1,0,2],a:[-1,0,2],ArrowRight:[1,0,3],d:[1,0,3]};
    const down=e=>{if(!cutActive.current&&mappings[e.key]){e.preventDefault();held.current=mappings[e.key];}},up=()=>{held.current=null;},blur=()=>{held.current=null;acc=0;};
    element.addEventListener('keydown',down);element.addEventListener('keyup',up);element.addEventListener('blur',blur);window.addEventListener('blur',blur);document.addEventListener('visibilitychange',blur);
    function tick(now){raf=requestAnimationFrame(tick);const elapsed=Math.min((now-last)/1000,.1);last=now;if(document.hidden)return;acc+=elapsed;
      while(acc>=1/60){acc-=1/60;moveElapsed+=1/60;if(!cutActive.current&&held.current&&moveElapsed>.18){moveElapsed=0;const [dx,dy,face]=held.current;direction.current=face;dispatch.current({type:'worldMove',dx,dy},'');}}
      const state=world.current,colors=ZONES[state.zone].colors;ctx.imageSmoothingEnabled=false;ctx.fillStyle=colors[0];ctx.fillRect(0,0,480,288);
      for(let y=0;y<9;y++)for(let x=0;x<15;x++){if(solid(state.screen,x,y)){ctx.fillStyle=colors[1];ctx.fillRect(x*32,y*32,32,32);ctx.fillStyle=colors[2];ctx.fillRect(x*32+4,y*32+4,23,18);}else if((x+y*3+state.screen)%7===0){ctx.fillStyle=colors[2];ctx.fillRect(x*32+14,y*32+22,3,5);}}
      ctx.fillStyle='#e4d7ac';for(const x of [0,14]){ctx.fillRect(x*32,128,32,32);ctx.fillStyle=colors[1];ctx.fillText(x===0?'‹':'›',x*32+12,149);ctx.fillStyle='#e4d7ac';}
      for(const node of worldNodes(state)){const waiting=(state.nodes[node.key]||0)>Date.now();ctx.fillStyle=waiting?'#827456':'#334f35';ctx.fillRect(node.x*32+13,node.y*32+9,5,23);if(!waiting){ctx.fillStyle='#496d41';ctx.fillRect(node.x*32+4,node.y*32+7,12,10);ctx.fillRect(node.x*32+17,node.y*32+2,10,13);ctx.fillStyle='#e5ce7e';ctx.fillRect(node.x*32+19,node.y*32+3,4,4);}}
      ctx.fillStyle='#7b6950';ctx.fillRect(11*32+6,2*32+8,21,22);ctx.fillStyle='#e7dba4';ctx.fillRect(11*32+10,2*32+10,13,9);
      const frame=held.current&&!reduced.matches?Math.floor(now/130)%4:0;ctx.drawImage(atlas,frame*32,direction.current*48,32,48,state.x*32,state.y*32-16,32,48);
      const nearNode=worldNodes(state).find(node=>near(state,node)&&(state.nodes[node.key]||0)<=Date.now());
      if(nearNode){ctx.strokeStyle='#f4e6ad';ctx.lineWidth=2;ctx.strokeRect(nearNode.x*32+1,nearNode.y*32+1,30,30);}
    }
    raf=requestAnimationFrame(tick);return()=>{cancelAnimationFrame(raf);element.removeEventListener('keydown',down);element.removeEventListener('keyup',up);element.removeEventListener('blur',blur);window.removeEventListener('blur',blur);document.removeEventListener('visibilitychange',blur);};
  },[]);
  function move(dx,dy,face){direction.current=face;setFacing(face);act({type:'worldMove',dx,dy},'');}
  function finish(quality){act({type:'worldHarvest',key:cut.key,quality},`Recogiste ${name(cut.id)}. La semilla y la cosecha están en tu jardín y tu cesta.`);setCut(null);}
  return <><div className="gh-zone-select" role="group" aria-label="Elegir zona">{Object.entries(ZONES).map(([id,z])=><button key={id} disabled={natureXP(n)<z.unlock||!!cut} aria-pressed={w.zone===id} onClick={()=>act({type:'worldEnter',zone:id},`Entraste a ${z.name}.`)}>{z.name}{natureXP(n)<z.unlock?` · ${z.unlock} XP de naturaleza`:''}</button>)}</div>
    <div className="gh-trail-hud"><strong>{zone.name} · tramo {w.screen+1} / 3</strong><span>{w.steps} pasos · Morral {w.bag} / 20</span><button onClick={()=>{setCut(null);act({type:'worldReturn'},'Volviste al refugio. Morral entregado y pasos recuperados.');}}>Volver al refugio</button></div>
    <canvas ref={canvas} width="480" height="288" className="gh-pixel-world" tabIndex={cut?-1:0} aria-label={`Mapa recorrible. ${zone.name}, tramo ${w.screen+1}. Posición columna ${w.x+1}, fila ${w.y+1}. Usa flechas o los controles de dirección.`}/>
    <div className="gh-trail-controls" aria-label="Dirección">{[[0,-1,1,'Arriba'],[-1,0,2,'Izquierda'],[0,1,0,'Abajo'],[1,0,3,'Derecha']].map(([dx,dy,face,label])=><button key={label} disabled={!!cut||!w.steps} onClick={()=>move(dx,dy,face)}>{label}</button>)}</div>
    <p className="gh-position" role="status">Columna {w.x+1}, fila {w.y+1} · {nearNode?`${name(nearNode.id)} a tu alcance`:'Busca plantas de hojas oscuras y señal dorada.'}</p>
    <div className="gh-care"><button disabled={!nearNode||w.bag>=20||!w.steps||!!cut} onClick={()=>setCut(nearNode)}>Recolectar {nearNode?name(nearNode.id):'planta cercana'}</button><button disabled={!nearLore||!!cut||w.lore.includes(loreKey)} onClick={()=>act({type:'worldLore'},`Descubriste ${zone.lore[w.screen]}. +20 XP. Un nuevo lugar en tu cuaderno de viaje.`)}>Observar punto de interés</button><button disabled={!!cut} onClick={onLegacy}>Explorar por casillas</button></div>
    {cut&&<Cutting key={cut.key} onFinish={finish} onCancel={()=>setCut(null)}/>}
    <details className="gh-travel-book"><summary>Cuaderno de viaje · {w.lore.length} lugares</summary>{w.lore.length?w.lore.map(key=>{const [id,screen]=key.split(':');return <article key={key}><h4>{ZONES[id].lore[Number(screen)]}</h4><p>Un rincón de {ZONES[id].name.toLowerCase()} para detenerte, observar las plantas y recordar el camino de vuelta. Lugar ficticio del taller.</p></article>}):<p>Busca los carteles del sendero y obsérvalos de cerca.</p>}</details>
    <p className="gh-muted">Cruza los pasos laterales de la fila 5 para cambiar de tramo. Los nodos vuelven en tres horas; puedes visitar otras zonas. Los biomas y ubicaciones representan un mundo ficticio.</p>
  </>;
}
