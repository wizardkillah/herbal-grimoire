import test from 'node:test';
import assert from 'node:assert/strict';
import { exportSave, importSave, MAX_SAVE_BYTES } from './save-file.js';
import { initialState, evaluate, brew, restore, upgrade, coinsOf, xpOf, QUESTS, INGREDIENTS, requirements, saveRecipeNote } from './rules.js';

test('backup round trip preserves recipes and notes and recalculates rewards', () => {
  let state = brew(initialState(), ['matico','matico'], 'infusion', {challenge:false}).state;
  state = saveRecipeNote(state,state.discoveries[0].key,{title:'Mi receta',observation:'Hipótesis, no resultado',origin:'Cuaderno familiar'});
  assert.deepEqual(importSave(exportSave(state)).state,state);
  const file = JSON.parse(exportSave(state));file.state.xp=999999;file.state.coins=999999;
  const restored = importSave(JSON.stringify(file)).state;
  assert.equal(xpOf(restored),15);assert.equal(coinsOf(restored),0);
  assert.equal(restored.xp,undefined);
});
test('invalid imports throw instead of resetting or partially replacing a save', () => {
  const state = brew(initialState(),['boldo'],'infusion',{challenge:false}).state;
  const original = JSON.stringify(state);
  const file = JSON.parse(exportSave(state));
  const bad = patch => JSON.stringify({...file,state:{...file.state,...patch}});
  for (const raw of ['{', '{}', JSON.stringify({...file,schema:'other/1'}), bad({discoveries:[{ids:['missing'],method:'infusion',key:'x'}]}),bad({completed:['equilibrio']}),bad({notebook:{unknown:{title:'x',observation:'',origin:''}}}),bad({discoveries:[...state.discoveries,...state.discoveries]}),' '.repeat(MAX_SAVE_BYTES+1)]) assert.throws(() => importSave(raw));
  assert.equal(JSON.stringify(state),original);
});

test('properties depend on proportions and technique, not ingredient order', () => {
  const a = evaluate(['cedron', 'jazmin', 'calendula'], 'infusion');
  const b = evaluate(['calendula', 'jazmin', 'cedron'], 'infusion');
  assert.equal(a.key, b.key);
  assert.deepEqual(a.stats, { luz: 6, calma: 7, calor: 0, vigor: 0 });
  assert.notEqual(a.key, evaluate(a.ids, 'macerar').key);
  assert.equal(evaluate(['jengibre', 'jengibre'], 'infusion').stats.calor, 7);
});
test('invalid ingredients, techniques, empty mixes and excess capacity are rejected', () => {
  for (const [ids, method] of [[[], 'infusion'], [['missing'], 'infusion'], [['miel'], 'invalid'], [Array(4).fill('miel'), 'infusion']]) assert.throws(() => evaluate(ids, method));
  assert.doesNotThrow(() => evaluate(Array(4).fill('miel'), 'infusion', 4));
});
test('failed contract still records discovery; repetitions do not farm XP or coins', () => {
  const first = brew(initialState(), ['boldo'], 'infusion');
  assert.equal(first.result.success, false);
  assert.equal(xpOf(first.state), 15);
  const repeat = brew(first.state, ['boldo'], 'infusion');
  assert.equal(repeat.result.earned, 0);
  assert.equal(repeat.state.discoveries.length, 1);
  assert.equal(coinsOf(repeat.state), 0);
});
test('all six contracts have reachable solutions before upgrading', () => {
  let state = initialState();
  for (const quest of QUESTS) {
    let solution;
    outer: for (const a of INGREDIENTS) for (const b of INGREDIENTS) for (const c of INGREDIENTS) {
      const ids = [a.id, b.id, c.id];
      if (requirements(evaluate(ids, quest.method), quest).every(r => r.met)) { solution = ids; break outer; }
    }
    assert.ok(solution, `No solution for ${quest.id}`);
    const next = brew(state, solution, quest.method);
    assert.ok(next.result.success);
    state = restore(JSON.stringify(next.state));
  }
  assert.deepEqual(state.completed, QUESTS.map(q => q.id));
  assert.equal(coinsOf(state), 360);
  const freePlay = brew(state, ['rocio'], 'infusion');
  assert.equal(freePlay.result.success, false);
  assert.equal(freePlay.state.completed.length, 6);
});
test('the combinations suggested by Bruma satisfy every contract', () => {
  const solutions = [
    ['jazmin', 'calendula', 'cedron'], ['jengibre', 'naranja'],
    ['boldo', 'maqui'], ['lavanda', 'cedron'],
    ['calendula', 'naranja', 'miel'], ['jazmin', 'canela', 'romero'],
  ];
  QUESTS.forEach((quest, index) => assert.ok(requirements(evaluate(solutions[index], quest.method), quest).every(c => c.met), quest.id));
});
test('upgrade requires earned funds, charges once and survives reload', () => {
  const empty = initialState();
  assert.equal(upgrade(empty), empty);
  let state = brew(empty, ['jazmin', 'calendula'], 'infusion').state;
  state = brew(state, ['jengibre', 'naranja'], 'macerar').state;
  assert.equal(coinsOf(state), 120);
  state = upgrade(state);
  assert.equal(coinsOf(state), 20);
  assert.equal(upgrade(state), state);
  state = brew(state, ['matico', 'matico', 'matico', 'matico'], 'moler').state;
  assert.deepEqual(restore(JSON.stringify(state)), state);
});
test('restore tolerates corruption, invalid records and forged derived values', () => {
  for (const raw of ['bad json', 'null', '{}', '{"version":9}']) assert.deepEqual(restore(raw), initialState());
  const state = restore(JSON.stringify({ ...initialState(), completed: ['farol', 'invalid', 'semilla'], upgraded: true, attempts: -2, coins: 9999, discoveries: [{ ids: ['bad'], method: 'infusion' }, { ids: ['miel'], method: 'infusion' }, { ids: ['miel'], method: 'infusion' }, null] }));
  assert.deepEqual(state.completed, ['farol']);
  assert.equal(state.upgraded, false);
  assert.equal(state.discoveries.length, 1);
  assert.equal(state.attempts, 0);
  assert.equal(coinsOf(state), 60);
});

test('free workshop records recipes without completing magical contracts', () => {
  const next = brew(initialState(), ['jazmin', 'calendula', 'cedron'], 'infusion', { challenge: false });
  assert.equal(next.result.quest, null);
  assert.equal(next.result.success, false);
  assert.deepEqual(next.result.checks, []);
  assert.equal(xpOf(next.state), 15);
  assert.equal(coinsOf(next.state), 0);
});
test('legacy saves retain progress while recipe names use common ingredients', () => {
  const legacy = brew(initialState(), ['rocio', 'miel'], 'infusion').state;
  delete legacy.notebook;
  const state = restore(JSON.stringify(legacy));
  assert.equal(xpOf(state), 15);
  assert.deepEqual(state.notebook, {});
  assert.equal(evaluate(state.discoveries[0].ids, 'infusion').name, 'Infusión de Agua potable + Miel');
});
test('recipe notes persist, limit text and ignore unknown recipes', () => {
  let state = brew(initialState(), ['lavanda'], 'infusion').state;
  assert.equal(saveRecipeNote(state, 'unknown', { title: 'x' }), state);
  state = saveRecipeNote(state, state.discoveries[0].key, { title: 'Lavanda', observation: 'a'.repeat(2100), origin: 'Cuaderno familiar' });
  assert.deepEqual(restore(JSON.stringify(state)), state);
  assert.equal(Object.values(state.notebook)[0].observation.length, 2000);
});

import { LEGACY_GROUPS, LEGACY_ALIASES, matchesIngredient } from './catalog.js';
import { HERBS } from './herbs.js';
import { REGIONAL } from './regional.js';
test('every original ingredient and base resolves to a playable catalogue entry', () => {
  assert.equal(new Set(INGREDIENTS.map(i => i.id)).size, INGREDIENTS.length);
  for (const [, records] of LEGACY_GROUPS) for (const old of records) {
    const id = LEGACY_ALIASES[old.id] || old.id;
    assert.ok(INGREDIENTS.some(i => i.id === id), old.id);
    const next = brew(initialState(), [id], 'infusion', { challenge: false });
    assert.deepEqual(restore(JSON.stringify(next.state)), next.state);
    assert.equal(HERBS[id].length, 7);
  }
});
test('regional additions and original aliases are searchable with accents omitted', () => {
  for (const item of REGIONAL) {
    assert.ok(INGREDIENTS.some(i => i.id === item.id));
    assert.match(HERBS[item.id][6], /^https:\/\//);
  }
  const cedron = INGREDIENTS.find(i => i.id === 'cedron');
  assert.ok(matchesIngredient(cedron, 'cedron', 'chile', 'Herbolario'));
  assert.equal(matchesIngredient(cedron, 'cedron', 'latam'), false);
  assert.ok(matchesIngredient(INGREDIENTS.find(i => i.id === 'miel'), 'Miel de Abejas'));
  assert.ok(matchesIngredient(INGREDIENTS.find(i => i.id === 'melisa'), 'toronjil'));
  assert.equal(matchesIngredient(cedron, 'unknown'), false);
});
test('pending catalogue entries never pretend to have a medical reference', () => {
  for (const i of INGREDIENTS) {
    assert.ok(HERBS[i.id]);
    if (HERBS[i.id][2] === 'Ficha por revisar') assert.equal(HERBS[i.id][6], null);
  }
  assert.equal(INGREDIENTS.find(i => i.id === 'te_negro').latin, 'Camellia sinensis');
  assert.equal(INGREDIENTS.find(i => i.id === 'te_blanco').latin, 'Camellia sinensis');
});
