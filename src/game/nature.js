import { natureExtras, normalizeExtras, normalizePlot, addStock, timedPlot, compostAction, worldAction, ZONES } from './nature-v9.js';
// Short, turn-based activities. Rarity and care sequences are game rules.
export const CROPS = ['matico','cedron','lavanda','calendula','romero'];
export const ROUTES = {
  bosque: { name:'Bosque de niebla', herbs:['matico','boldo','maqui'], icon:'♣' },
  montana: { name:'Sendero de la montaña', herbs:['muna','canelo','romero'], icon:'▲' },
};
export const CARE = ['water','soil','light'];
const all = [...new Set([...CROPS,...Object.values(ROUTES).flatMap(r=>r.herbs),...Object.values(ZONES).flatMap(r=>r.herbs)])];
export const newNature = () => ({...natureExtras(),plots:[null,null,null],harvests:0,finds:0,collection:{},rare:[],trip:null});
const count = (n,max=100000) => Number.isInteger(n) && n>=0 && n<=max ? n : 0;
export function restoreNature(value) {
  const n=newNature();if(!value || typeof value!=='object') return n;
  if(value.schemaVersion!==undefined&&value.schemaVersion!==2)return n;
  n.plots=n.plots.map((_,i)=>{const p=value.plots?.[i];return p && all.includes(p.id) && Number.isInteger(p.stage) && p.stage>=0 && p.stage<=3 ? normalizePlot(p) : null;});
  n.harvests=count(value.harvests);n.finds=count(value.finds);
  n.collection=Object.fromEntries(all.filter(id=>count(value.collection?.[id],200000)>0).map(id=>[id,count(value.collection[id],200000)]));
  n.rare=Array.isArray(value.rare)?[...new Set(value.rare.filter(id=>all.includes(id)&&n.collection[id]>0))]:[];
  const t=value.trip;
  if(t && ROUTES[t.route] && Number.isInteger(t.seed) && t.seed>=0 && t.seed<1000000 && Array.isArray(t.path) && t.path.length>=1 && t.path.length<=13 && t.path[0]===22 && t.path.every((p,i)=>Number.isInteger(p)&&p>=0&&p<25&&(!i||adjacent(t.path[i-1],p)))) n.trip={route:t.route,seed:t.seed,path:[...t.path]};
  return {...n,...normalizeExtras(value,n.collection)};
}
export const natureXP = n => n ? n.harvests*25+n.finds*10+n.rare.length*30+(n.world?.lore.length||0)*20 : 0;
export const adjacent = (a,b) => Math.abs(a%5-b%5)+Math.abs(Math.floor(a/5)-Math.floor(b/5))===1;
export function treasures(trip) {
  let seed=trip.seed+1;const cells=[];
  for(let i=0;i<3;i++){seed=(seed*1664525+1013904223)>>>0;let cell=seed%20;while(cells.includes(cell))cell=(cell+1)%20;cells.push(cell);}
  return cells.map((cell,i)=>({cell,id:ROUTES[trip.route].herbs[i]}));
}
function collect(n,id,rare=false) {
  return {...addStock(n,id,rare?'wild':'cultivated','fresh'),collection:{...n.collection,[id]:(n.collection[id]||0)+1},rare:rare&&!n.rare.includes(id)?[...n.rare,id]:n.rare,harvests:n.harvests+(rare?0:1),finds:n.finds+(rare?1:0)};
}
export function natureAction(n,action) {
  const now=Number.isFinite(action.now)?action.now:Date.now();
  if(action.type.startsWith('world'))return worldAction(n,action,now,natureXP(n));
  const composted=compostAction(n,action,now);if(composted!==n)return composted;
  if(action.type==='plant' && Number.isInteger(action.plot) && action.plot>=0 && action.plot<3 && !n.plots[action.plot] && (CROPS.includes(action.id)||n.rare.includes(action.id))) return {...n,plots:n.plots.map((p,i)=>i===action.plot?{id:action.id,stage:0,...(action.slow?{mode:'slow',plantedAt:now,wateredAt:now,soil:50}:{})}:p)};
  const plot=timedPlot(n.plots[action.plot],now,action.plot);
  if(action.type==='care'&&plot?.mode==='slow'&&action.care==='water')return {...n,plots:n.plots.map((p,i)=>i===action.plot?{...p,wateredAt:Math.max(now,p.wateredAt)}:p)};
  if(action.type==='care' && plot && !plot.mode && CARE[plot.stage]===action.care) return {...n,plots:n.plots.map((p,i)=>i===action.plot?{...p,stage:p.stage+1}:p)};
  if(action.type==='harvest' && plot?.stage===3 && n.harvests<100000) {
    let next=collect(n,plot.id);
    if(plot.mode){const score=(plot.water+plot.light+plot.soil)/3,quality=score>=85?'excellent':score>=55?'fresh':'dry';
      const stock={...next.stock[plot.id]};stock['cultivated:fresh']--;if(!stock['cultivated:fresh'])delete stock['cultivated:fresh'];
      next={...next,stock:{...next.stock,[plot.id]:stock}};next=addStock(next,plot.id,'cultivated',quality);
    }
    return {...next,plots:n.plots.map((p,i)=>i===action.plot?null:p)};
  }
  if(action.type==='start' && !n.trip && ROUTES[action.route] && Number.isInteger(action.seed) && action.seed>=0 && action.seed<1000000) return {...n,trip:{route:action.route,seed:action.seed,path:[22]}};
  if(action.type==='return') return n.trip?{...n,trip:null}:n;
  if(action.type==='move' && n.trip && n.trip.path.length<13 && Number.isInteger(action.cell) && action.cell>=0 && action.cell<25 && adjacent(n.trip.path.at(-1),action.cell)) {
    const found=treasures(n.trip).find(t=>t.cell===action.cell&&!n.trip.path.includes(t.cell));
    const next=found && n.finds<100000?collect(n,found.id,true):n;
    return {...next,trip:{...n.trip,path:[...n.trip.path,action.cell]}};
  }
  return n;
}
