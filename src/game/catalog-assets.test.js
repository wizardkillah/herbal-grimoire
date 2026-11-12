import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, statSync } from 'node:fs';
import { INGREDIENTS } from './rules.js';
import { IDENTIFICATION } from './identification.js';

const images = JSON.parse(readFileSync(new URL('./ingredient-images.json', import.meta.url), 'utf8'));
const credits = JSON.parse(readFileSync(new URL('../../public/media/ingredients/credits.json', import.meta.url), 'utf8'));

test('every selectable ingredient has a local attributed visual reference', () => {
  assert.deepEqual(Object.keys(images).sort(), INGREDIENTS.map(i => i.id).sort());
  for (const ingredient of INGREDIENTS) {
    const p = images[ingredient.id];
    assert.match(p.src, /^\/media\/ingredients\/[a-f0-9]{16}\.(jpg|jpeg|png|webp)$/);
    assert.equal(statSync(new URL('../../public' + p.src, import.meta.url)).size, p.bytes);
    for (const field of ['author', 'license', 'caption', 'file']) assert.ok(p[field]?.trim(), `${ingredient.id}: ${field}`);
    assert.ok(p.width > 0 && p.height > 0);
    assert.match(p.sourceUrl, /^https:\/\/commons\.wikimedia\.org\//);
    assert.match(p.originalUrl, /^https:\/\/upload\.wikimedia\.org\//);
    assert.doesNotMatch(p.license, /non-free|fair use|\bNC\b|\bND\b/i);
  }
});

test('distributed credits match the references displayed in Bruma', () => {
  assert.deepEqual(credits, images);
});

test('all ingredients can open a recognition panel with explicit source status', () => {
  assert.deepEqual(Object.keys(IDENTIFICATION).sort(), INGREDIENTS.map(i => i.id).sort());
  for (const ingredient of INGREDIENTS) {
    const p = IDENTIFICATION[ingredient.id];
    assert.equal(p.features.length, 3);
    assert.ok(p.features.every(x => typeof x === 'string' && x.length > 20));
    assert.ok(p.confusion && p.evidence && p.sourceTitle);
    if (p.sourceUrl) assert.match(p.sourceUrl, /^https:\/\/plants\.ces\.ncsu\.edu\/plants\//);
    else assert.equal(p.evidence, 'Observación orientativa');
  }
});
