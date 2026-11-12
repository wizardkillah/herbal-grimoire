import test from 'node:test';
import assert from 'node:assert/strict';
import { createGameServer, assetPath, root, securityHeaders, PORT_BUSY_MESSAGE } from './serve-game.mjs';
import { relative, sep } from 'node:path';

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
      // On POSIX a backslash is an ordinary character, so «..\.env.local» is one harmless file name inside root;
      // what must never happen is a first path SEGMENT of «..», i.e. escaping the root.
      assert.ok(resolved === null || relative(root,resolved).split(sep)[0] !== '..');
    }
  } finally { await new Promise(resolve => server.close(resolve)); }
});

// ---- Host check, security headers and body decoding -------------------------------------------

import http from 'node:http';

const rawRequest = (port, { method = 'GET', path = '/', headers = {}, chunks } = {}) => new Promise((resolve, reject) => {
  const req = http.request({ host: '127.0.0.1', port, method, path, headers }, res => {
    const parts = [];
    res.on('data', c => parts.push(c));
    res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: Buffer.concat(parts).toString('utf8') }));
  });
  req.on('error', reject);
  if (chunks) {
    // Send the body in separate writes, waiting between them so they travel as separate chunks.
    (async () => { for (const chunk of chunks) { req.write(chunk); await new Promise(r => setTimeout(r, 40)); } req.end(); })();
  } else req.end();
});
async function withGame(options, run) {
  const server = createGameServer(options);
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  try { await run(server.address().port); } finally { await new Promise(resolve => server.close(resolve)); }
}

test('a foreign Host header is refused on every route, not only on the API', async () => {
  await withGame({ config: () => ({ key: 'k', model: 'gemini-3.6-flash' }), fetchImpl: () => assert.fail('Unexpected external request') }, async port => {
    for (const path of ['/', '/__grimorio_launcher', '/api/bruma/status', '/assets/', '/.env.local']) {
      for (const host of ['evil.example', 'evil.example:5173', '127.0.0.1.evil.example', 'localhost.evil.example:80']) {
        const response = await rawRequest(port, { path, headers: { Host: host } });
        assert.equal(response.status, 403, `${host}${path}`);
        assert.doesNotMatch(response.body, /grimorio-herbal|root/);
      }
    }
    for (const host of [`127.0.0.1:${port}`, `localhost:${port}`]) {
      assert.equal((await rawRequest(port, { path: '/__grimorio_launcher', headers: { Host: host } })).status, 200);
    }
  });
});

test('the local server sends the same security headers as public/_headers, without HSTS', async () => {
  await withGame({}, async port => {
    for (const path of ['/', '/__grimorio_launcher']) {
      const { headers } = await rawRequest(port, { path });
      assert.match(headers['content-security-policy'], /default-src 'self'.*script-src 'self'.*frame-ancestors 'none'/);
      assert.equal(headers['x-frame-options'], 'DENY');
      assert.equal(headers['referrer-policy'], 'strict-origin-when-cross-origin');
      assert.equal(headers['strict-transport-security'], undefined);
    }
  });
  const parsed = securityHeaders();
  assert.ok(parsed['Content-Security-Policy'] && !('Strict-Transport-Security' in parsed));
  assert.deepEqual(securityHeaders(new URL('./no-such-file', import.meta.url)), {});
});

test('a request body split in the middle of an accent is decoded intact', async () => {
  const question = '¿Qué se conoce del ñandú y del boldo?';
  let sent;
  await withGame({ config: () => ({ key: 'k', model: 'gemini-3.6-flash' }), fetchImpl: async (url, options) => {
    sent = JSON.parse(JSON.parse(options.body).contents[0].parts[0].text).question;
    return new Response(JSON.stringify({ candidates: [{ finishReason: 'STOP', content: { parts: [{ text: JSON.stringify({ reply: 'Respuesta de prueba.' }) }] } }] }));
  } }, async port => {
    const body = Buffer.from(JSON.stringify({ question }), 'utf8');
    const cut = body.indexOf(Buffer.from('é', 'utf8')) + 1;          // between the two bytes of «é»
    assert.ok(cut > 0);
    const response = await rawRequest(port, { method: 'POST', path: '/api/bruma/ask', headers: { 'Content-Type': 'application/json', 'Content-Length': body.length },
      chunks: [body.subarray(0, cut), body.subarray(cut)] });
    assert.equal(response.status, 200);
    assert.equal(sent, question);
  });
});
