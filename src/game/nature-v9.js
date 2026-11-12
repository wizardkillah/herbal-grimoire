// Reglas de procedencia, cultivo pausado y mundo. Los parámetros son lúdicos.
export const ORIGINS = { legacy:'Sin procedencia registrada', cultivated:'Cultivada en el jardín', wild:'Recolectada en la senda' };
export const QUALITIES = { dry:'Seca', fresh:'Fresca', excellent:'Cuidado excelente' };
export const STOCK_KEYS = Object.keys(ORIGINS).flatMap(o=>Object.keys(QUALITIES).map(q=>`${o}:${q}`));
export const ZONES = {
  limari:{name:'Quebrada del Limarí',herbs:['matico','cedron','boldo'],unlock:0,colors:['#c7aa73','#88714d','#456344'],lore:['El refugio de piedra','Las terrazas del sendero','La vertiente imaginada']},
  bosque:{name:'Bosque de niebla',herbs:['canelo','maqui','matico'],unlock:40,colors:['#71856a','#334d40','#a3b18b'],lore:['El árbol del encuentro','El claro silencioso','El puente cubierto']},
  montana:{name:'Sendero de altura',herbs:['muna','romero','canelo'],unlock:80,colors:['#b3b9ae','#656e72','#728363'],lore:['La piedra del horizonte','El paso de los vientos','El mirador']},
  costa:{name:'Borde costero',herbs:['hinojo','manzanilla','calendula'],unlock:120,colors:['#d8c59c','#74989a','#7f936b'],lore:['El refugio de las dunas','El camino de arena','El faro del regreso']},
};
export const freshWorld=()=>({zone:'limari',screen:0,x:7,y:7,steps:60,bag:0,nodes:{},lore:[]});
export const natureExtras=()=>({schemaVersion:2,stock:{},compost:{raw:0,fertilizer:0,batch:null},world:freshWorld()});
const safe=(v,max=1000000)=>Number.isSafeInteger(v)&&v>=0&&v<=max;
export function normalizeExtras(raw,collection) {
  const result=natureExtras();
  for(const [id,total] of Object.entries(collection)) {
    const old=raw.schemaVersion===undefined;
    const entries=old?{'legacy:dry':total}:Object.fromEntries(STOCK_KEYS.filter(k=>safe(raw.stock?.[id]?.[k])&&raw.stock[id][k]>0).map(k=>[k,raw.stock[id][k]]));
    if(Object.values(entries).reduce((a,b)=>a+b,0)<=total && Object.keys(entries).length) result.stock[id]=entries;
  }
  const c=raw.compost;
  if(c){result.compost.raw=safe(c.raw)?c.raw:0;result.compost.fertilizer=safe(c.fertilizer)?c.fertilizer:0;
    if(c.batch&&safe(c.batch.startedAt,8640000000000000)&&safe(c.batch.amount)&&c.batch.amount>0)result.compost.batch={startedAt:c.batch.startedAt,amount:c.batch.amount};}
  const w=raw.world;
  if(w&&ZONES[w.zone]&&safe(w.screen,2)&&safe(w.x,14)&&safe(w.y,8)&&safe(w.steps,60)&&safe(w.bag,20)&&!solid(w.screen,w.x,w.y)) {
    result.world={...freshWorld(),zone:w.zone,screen:w.screen,x:w.x,y:w.y,steps:w.steps,bag:w.bag};
    for(const [key,value] of Object.entries(w.nodes||{}))if(/^(limari|bosque|montana|costa):[0-2]:[0-2]$/.test(key)&&safe(value,8640000000000000))result.world.nodes[key]=value;
    result.world.lore=Array.isArray(w.lore)?[...new Set(w.lore.filter(k=>/^(limari|bosque|montana|costa):[0-2]$/.test(k)))]:[];
  }
  return result;
}
export function addStock(n,id,origin,quality,qty=1) {
  const key=`${origin}:${quality}`;
  return {...n,stock:{...n.stock,[id]:{...n.stock[id],[key]:(n.stock[id]?.[key]||0)+qty}}};
}
export function spendStock(n,ids) {
  const stock=structuredClone(n.stock),used=[];
  for(const id of ids){const key=STOCK_KEYS.find(k=>(stock[id]?.[k]||0)>0);if(!key)throw new Error('No hay suficientes unidades en tu cesta para esta mezcla. Puedes usar el catálogo libre.');stock[id][key]--;if(!stock[id][key])delete stock[id][key];if(!Object.keys(stock[id]).length)delete stock[id];const [origin,quality]=key.split(':');used.push({id,origin,quality});}
  return {nature:{...n,stock},used};
}
export function timedPlot(p,now=Date.now(),index=0) {
  if(!p?.mode)return p;
  const elapsed=Math.max(0,now-p.plantedAt),water=Math.max(0,100-Math.max(0,now-p.wateredAt)/3600000*4);
  const duration=(p.id==='canelo'?72:36)*3600000;
  return {...p,stage:elapsed>=duration?3:elapsed>=duration*.45?2:elapsed>=duration*.1?1:0,water:Math.round(water),light:[45,70,90][index%3],soil:p.soil};
}
export function normalizePlot(p) {
  if(!p.mode)return {id:p.id,stage:p.stage};
  if(p.mode!=='slow'||!safe(p.plantedAt,8640000000000000)||!safe(p.wateredAt,8640000000000000)||!safe(p.soil,100))return null;
  return {id:p.id,stage:p.stage,mode:'slow',plantedAt:p.plantedAt,wateredAt:p.wateredAt,soil:p.soil};
}
export function compostAction(n,a,now) {
  const c=n.compost;
  if(a.type==='compost'&&c.raw>=5){const amount=Math.floor(c.raw/5);if(a.slow){if(c.batch)return n;return {...n,compost:{...c,raw:c.raw-amount*5,batch:{startedAt:now,amount}}};}return {...n,compost:{...c,raw:c.raw-amount*5,fertilizer:Math.min(1000000,c.fertilizer+amount)}};}
  if(a.type==='finishCompost'&&c.batch&&now-c.batch.startedAt>=8*3600000)return {...n,compost:{...c,fertilizer:Math.min(1000000,c.fertilizer+c.batch.amount),batch:null}};
  if(a.type==='fertilize'&&n.plots[a.plot]?.mode==='slow'&&c.fertilizer>0&&n.plots[a.plot].soil<100)return {...n,compost:{...c,fertilizer:c.fertilizer-1},plots:n.plots.map((p,i)=>i===a.plot?{...p,soil:Math.min(100,p.soil+25)}:p)};
  if(a.type==='transplant'&&n.plots[a.from]&&!n.plots[a.to]&&Number.isInteger(a.to)&&a.to>=0&&a.to<n.plots.length)return {...n,plots:n.plots.map((p,i)=>i===a.to?n.plots[a.from]:i===a.from?null:p)};
  return n;
}
export function solid(screen,x,y){return x<0||x>14||y<0||y>8||(y===0||y===8)||(x===0||x===14)&&y!==4||((screen+2)%5+3===x&&y>=2&&y<=3);}
export function worldNodes(w){return [{x:3,y:2},{x:10,y:5},{x:5,y:6}].map((p,i)=>({...p,index:i,key:`${w.zone}:${w.screen}:${i}`,id:ZONES[w.zone].herbs[(i+w.screen)%3]}));}
export const near=(a,b)=>Math.abs(a.x-b.x)+Math.abs(a.y-b.y)<=1;
export function worldAction(n,a,now,xp) {
  const w=n.world;
  if(a.type==='worldEnter'&&ZONES[a.zone]&&xp>=ZONES[a.zone].unlock)return {...n,world:{...w,zone:a.zone,screen:0,x:7,y:7}};
  if(a.type==='worldReturn')return {...n,world:{...w,screen:0,x:7,y:7,steps:60,bag:0}};
  if(a.type==='worldMove'&&w.steps>0&&[[1,0],[-1,0],[0,1],[0,-1]].some(([dx,dy])=>dx===a.dx&&dy===a.dy)){
    let x=w.x+a.dx,y=w.y+a.dy,screen=w.screen;
    if(x===14&&y===4&&screen<2){screen++;x=1;}else if(x===0&&y===4&&screen>0){screen--;x=13;}else if(x===0||x===14)return n;
    if(solid(screen,x,y))return n;return {...n,world:{...w,x,y,screen,steps:w.steps-1}};
  }
  if(a.type==='worldLore'&&near(w,{x:11,y:2})){const key=`${w.zone}:${w.screen}`;return w.lore.includes(key)?n:{...n,world:{...w,lore:[...w.lore,key]}};}
  if(a.type==='worldHarvest'){
    const node=worldNodes(w).find(node=>node.key===a.key);
    if(!node||!near(w,node)||(w.nodes[node.key]||0)>now||w.bag>=20||w.steps<=0||!['dry','fresh','excellent'].includes(a.quality))return n;
    const qty=Math.min(a.quality==='excellent'?3:a.quality==='fresh'?2:1,20-w.bag);
    let next=addStock(n,node.id,'wild',a.quality,qty);
    return {...next,collection:{...n.collection,[node.id]:(n.collection[node.id]||0)+qty},finds:n.finds+1,rare:n.rare.includes(node.id)?n.rare:[...n.rare,node.id],world:{...w,bag:w.bag+qty,steps:Math.max(0,w.steps-1),nodes:{...w.nodes,[node.key]:now+3*3600000}}};
  }
  return n;
}
