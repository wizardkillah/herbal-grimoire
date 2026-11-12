import test from 'node:test';
import assert from 'node:assert/strict';
import { initialState, brew, restore } from './rules.js';
import { newNature, natureAction as act, natureXP, restoreNature } from './nature.js';
import { spendStock, timedPlot, solid, worldNodes, ZONES } from './nature-v9.js';
import { importSave, exportSave } from './save-file.js';

test('legacy units migrate honestly and spending plus compost is atomic',()=>{
  const legacy={plots:[null,null,null],harvests:2,finds:0,collection:{matico:2},rare:[],trip:null};
  const n=restoreNature(legacy);assert.deepEqual(n.stock.matico,{'legacy:dry':2});
  const state={...initialState(),nature:n};const result=brew(state,['matico'],'infusion',{useHarvest:true,challenge:false});
  assert.equal(result.state.nature.stock.matico['legacy:dry'],1);assert.equal(result.state.nature.compost.raw,1);
  assert.deepEqual(result.result.provenance,[{id:'matico',origin:'legacy',quality:'dry'}]);
  assert.throws(()=>spendStock(n,['matico','matico','matico']),/suficientes/);assert.equal(n.stock.matico['legacy:dry'],2);
  assert.throws(()=>brew(state,['cedron'],'infusion',{useHarvest:true}),/suficientes/);assert.equal(state.nature.compost.raw,0);
  assert.deepEqual(importSave(exportSave(result.state)).state,result.state);
  const oldFile=JSON.parse(exportSave(state));oldFile.state.nature=legacy;assert.deepEqual(importSave(JSON.stringify(oldFile)).state.nature,n);
});
test('paused growth recovers elapsed time and survives watering, compost and transplant',()=>{
  const now=1000000;let n=act(newNature(),{type:'plant',plot:0,id:'matico',slow:true,now});
  assert.equal(timedPlot(n.plots[0],now-5000,0).stage,0);
  assert.equal(timedPlot(n.plots[0],now+36*3600000,0).stage,3);
  assert.equal(act(n,{type:'harvest',plot:0,now:now+1000}),n);
  n={...n,compost:{raw:10,fertilizer:0,batch:null}};n=act(n,{type:'compost'});assert.equal(n.compost.fertilizer,2);
  n=act(n,{type:'fertilize',plot:0});n=act(n,{type:'fertilize',plot:0});
  n=act(n,{type:'transplant',from:0,to:2});assert.equal(n.plots[0],null);assert.equal(n.plots[2].soil,100);
  n=act(n,{type:'care',plot:2,care:'water',now:now+36*3600000});
  assert.deepEqual(restoreNature(n),n);
  n=act(n,{type:'harvest',plot:2,now:now+36*3600000});assert.equal(n.stock.matico['cultivated:excellent'],1);
  assert.equal(act(n,{type:'harvest',plot:2}),n);
});
test('compost batches are awarded once after eight hours',()=>{
  let n={...newNature(),compost:{raw:11,fertilizer:0,batch:null}};n=act(n,{type:'compost',slow:true,now:1000});
  assert.equal(n.compost.raw,1);assert.equal(n.compost.batch.amount,2);
  assert.equal(act(n,{type:'finishCompost',now:2000}),n);
  n=act(n,{type:'finishCompost',now:1000+8*3600000});assert.equal(n.compost.fertilizer,2);
  assert.equal(act(n,{type:'finishCompost',now:1000+9*3600000}),n);
});
test('world enforces unlocks, node proximity, respawn, capacity and discovery rewards',()=>{
  let n=newNature();assert.equal(act(n,{type:'worldEnter',zone:'costa'}),n);
  const node=worldNodes(n.world)[0];assert.equal(act(n,{type:'worldHarvest',key:node.key,quality:'excellent',now:1000}),n);
  n={...n,world:{...n.world,x:node.x,y:node.y+1}};
  n=act(n,{type:'worldHarvest',key:node.key,quality:'excellent',now:1000});assert.equal(n.collection.matico,3);assert.equal(n.world.bag,3);assert.equal(natureXP(n),40);
  assert.equal(act(n,{type:'worldHarvest',key:node.key,quality:'excellent',now:2000}),n);
  const back=act(n,{type:'worldReturn'});assert.equal(back.world.bag,0);assert.equal(back.world.steps,60);assert.equal(back.collection.matico,3);
  n={...n,world:{...n.world,bag:20}};assert.equal(act(n,{type:'worldHarvest',key:node.key,quality:'fresh',now:4*3600000}),n);
  n={...n,world:{...n.world,x:11,y:3}};n=act(n,{type:'worldLore'});assert.equal(natureXP(n),60);assert.equal(act(n,{type:'worldLore'}),n);
  assert.deepEqual(importSave(exportSave({...initialState(),nature:n})).state.nature,n);
});
test('all world screens are connected and every node and landmark is reachable',()=>{
  for(const zone of Object.keys(ZONES))for(let screen=0;screen<3;screen++){
    const visited=new Set(['7,7']),todo=[[7,7]];
    while(todo.length){const [x,y]=todo.shift();for(const [dx,dy]of [[1,0],[-1,0],[0,1],[0,-1]]){const nx=x+dx,ny=y+dy,key=`${nx},${ny}`;if(!solid(screen,nx,ny)&&!visited.has(key)){visited.add(key);todo.push([nx,ny]);}}}
    for(const node of [...worldNodes({zone,screen}),{x:11,y:2},{x:0,y:4},{x:14,y:4}])assert.ok(visited.has(`${node.x},${node.y}`));
  }
  let n=newNature();n={...n,world:{...n.world,x:13,y:4}};n=act(n,{type:'worldMove',dx:1,dy:0});assert.equal(n.world.screen,1);assert.equal(n.world.x,1);
  assert.deepEqual(restore(JSON.stringify({...initialState(),nature:n})).nature,n);
});
