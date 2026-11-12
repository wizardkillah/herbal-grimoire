import test from 'node:test';
import assert from 'node:assert/strict';
import { createGameServer, assetPath, root, PORT_BUSY_MESSAGE } from './serve-game.mjs';
import { relative } from 'node:path';

test('an occupied port is rejected rather than silently changing the save origin', async () => {
  const first = createGameServer();
  await new Promise(resolve => first.listen(0,'127.0.0.1',resolve));
  const second = createGameServer();
  try {
    const error = await new Promise(resolve => {
      second.once('error',resolve);
      second.listen(first.address().port,'127.0.0.1');
    });
    assert.equal(error.code,'EADDRINUSE');assert.equal(second.listening,false);
    assert.match(PORT_BUSY_MESSAGE,/Exportar partida/);
  } finally { await new Promise(resolve => first.close(resolve)); }
});

test('the launcher serves the built game, video ranges and no project secrets', async () => {
  const server = createGameServer();
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const url = `http://127.0.0.1:${server.address().port}`;
  try {
    const index = await fetch(url);
    assert.equal(index.status, 200);
    assert.match(await index.text(), /<title>Grimorio Herbal<\/title>/);
    const health = await (await fetch(url + '/__grimorio_launcher')).json();
    assert.equal(health.app, 'grimorio-herbal');
    const range = await fetch(url, { headers:{ Range:'bytes=0-9' } });
    assert.equal(range.status, 206);
    assert.equal((await range.arrayBuffer()).byteLength, 10);
    assert.equal((await fetch(url, { headers:{ Range:'bytes=999999999-' } })).status, 416);
    assert.equal((await fetch(url + '/.env.local')).status, 404);
    assert.equal((await fetch(url, { method:'POST' })).status, 405);
    assert.equal((await fetch(url, { method:'HEAD' })).headers.get('content-type'), 'text/html; charset=utf-8');
    for (const path of ['/%2e%2e%5c.env.local','/..%5c..%5cpackage.json']) {
      const resolved = assetPath(path);
      assert.ok(resolved === null || !relative(root,resolved).startsWith('..'));
    }
  } finally { await new Promise(resolve => server.close(resolve)); }
});
