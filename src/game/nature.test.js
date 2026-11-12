import test from 'node:test';
import assert from 'node:assert/strict';
import { newNature, natureAction as act, treasures, natureXP, restoreNature } from './nature.js';
import { initialState, restore, xpOf } from './rules.js';
import { exportSave, importSave } from './save-file.js';

test('garden requires three ordered cares and only a harvest grants XP once',()=>{
  let n=newNature();n=act(n,{type:'plant',plot:0,id:'matico'});
  assert.equal(act(n,{type:'plant',plot:0,id:'cedron'}),n);
  assert.equal(act(n,{type:'harvest',plot:0}),n);
  assert.equal(act(n,{type:'care',plot:0,care:'light'}),n);
  for(const care of ['water','soil','light'])n=act(n,{type:'care',plot:0,care});
  assert.equal(natureXP(n),0);n=act(n,{type:'harvest',plot:0});
  assert.equal(natureXP(n),25);assert.equal(n.collection.matico,1);
  assert.equal(act(n,{type:'harvest',plot:0}),n);
});
test('expeditions require adjacent moves, consume revisits and reward each cell once',()=>{
  let n=act(newNature(),{type:'start',route:'bosque',seed:7});
  assert.equal(act(n,{type:'start',route:'montana',seed:8}),n);
  assert.equal(act(n,{type:'move',cell:0}),n);
  const target=treasures(n.trip)[0];
  while(n.trip.path.at(-1)%5!==target.cell%5)n=act(n,{type:'move',cell:n.trip.path.at(-1)+(n.trip.path.at(-1)%5<target.cell%5?1:-1)});
  while(n.trip.path.at(-1)!==target.cell)n=act(n,{type:'move',cell:n.trip.path.at(-1)-5});
  assert.ok(n.collection[target.id]);const xp=natureXP(n),quantity=n.collection[target.id];
  const previous=n.trip.path.at(-2);n=act(n,{type:'move',cell:previous});n=act(n,{type:'move',cell:target.cell});
  assert.equal(n.collection[target.id],quantity);assert.equal(natureXP(n),xp);
  while(n.trip.path.length<13)n=act(n,{type:'move',cell:n.trip.path.at(-2)});
  assert.equal(act(n,{type:'move',cell:previous}),n);
  n=act(n,{type:'return'});assert.equal(n.trip,null);assert.equal(natureXP(n),xp);
});
test('garden, collection, expedition and earned XP survive backups and old saves migrate',()=>{
  let state=initialState();state.nature=act(state.nature,{type:'plant',plot:1,id:'lavanda'});
  state.nature=act(state.nature,{type:'care',plot:1,care:'water'});
  state.nature=act(state.nature,{type:'start',route:'montana',seed:45});
  state.nature=act(state.nature,{type:'move',cell:17});
  assert.deepEqual(importSave(exportSave(state)).state,state);
  assert.deepEqual(restore(JSON.stringify(state)),state);
  const legacy={...state};delete legacy.nature;assert.deepEqual(restore(JSON.stringify(legacy)).nature,newNature());
  const file=JSON.parse(exportSave(state));file.state.nature.trip.path.push(0);
  assert.throws(()=>importSave(JSON.stringify(file)),/expedición/);
  assert.equal(xpOf(state),natureXP(state.nature));
  assert.deepEqual(restoreNature({plots:[{id:'inventada',stage:99}],harvests:-2,trip:{route:'bogus'}}),newNature());
});
test('all expedition maps have three distinct reachable treasures',()=>{
  for(const route of ['bosque','montana'])for(let seed=0;seed<100;seed++){
    const loot=treasures({route,seed});assert.equal(new Set(loot.map(t=>t.cell)).size,3);
    assert.ok(loot.every(t=>t.cell>=0&&t.cell<20));
  }
});

test('existing rare discoveries unlock cultivation and survive backup with planted seedlings',()=>{
  const empty=newNature();assert.equal(act(empty,{type:'plant',plot:0,id:'canelo'}),empty);
  const legacy={...initialState(),nature:{...empty,finds:1,rare:['canelo'],collection:{canelo:1}}};
  const loaded=importSave(exportSave(legacy)).state;
  loaded.nature=act(loaded.nature,{type:'plant',plot:0,id:'canelo'});
  assert.equal(loaded.nature.plots[0].id,'canelo');
  assert.deepEqual(importSave(exportSave(loaded)).state,loaded);
  for(const care of ['water','soil','light'])loaded.nature=act(loaded.nature,{type:'care',plot:0,care});
  loaded.nature=act(loaded.nature,{type:'harvest',plot:0});
  assert.equal(loaded.nature.collection.canelo,2);assert.equal(natureXP(loaded.nature),65);
});
