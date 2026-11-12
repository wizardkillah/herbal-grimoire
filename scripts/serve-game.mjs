import http from 'node:http';
import { createReadStream, statSync } from 'node:fs';
import { resolve, relative, sep, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createBrumaHandler } from './bruma-api.mjs';

export const root = fileURLToPath(new URL('../dist/', import.meta.url));
export const PORT_BUSY_MESSAGE = 'El puerto 5173 esta ocupado. No se ha cambiado de puerto ni borrado tu partida. Si ya tienes Grimorio abierto, usa Exportar partida en esa instancia antes de cerrarla. Cierra el programa que ocupa el puerto y vuelve a abrir el lanzador.';
export function assetPath(url) {
  const pathname = decodeURIComponent(new URL(url, 'http://localhost').pathname);
  const file = resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
  const rel = relative(root, file);
  if (rel === '..' || rel.startsWith('..' + sep) || resolve(file) === resolve(root)) return null;
  return file;
}
const types = { '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.css':'text/css; charset=utf-8', '.json':'application/json; charset=utf-8', '.md':'text/plain; charset=utf-8', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.png':'image/png', '.webp':'image/webp', '.svg':'image/svg+xml', '.mp4':'video/mp4', '.woff2':'font/woff2' };
export function createGameServer(options = {}) {
  const bruma = createBrumaHandler(options);
  return http.createServer((req, res) => {
    if (req.url?.startsWith('/api/bruma')) { void bruma(req,res);return; }
    if (!['GET','HEAD'].includes(req.method)) { res.writeHead(405); return res.end(); }
    if (req.url === '/__grimorio_launcher') {
      res.writeHead(200, { 'Content-Type':'application/json', 'Cache-Control':'no-store' });
      return res.end(JSON.stringify({ app:'grimorio-herbal', root:resolve(root), brumaApi:1 }));
    }
    try {
      const file = assetPath(req.url);
      if (!file || !statSync(file).isFile()) { res.writeHead(404); return res.end(); }
      const size = statSync(file).size;
      const headers = { 'Content-Type':types[extname(file)] || 'application/octet-stream', 'Cache-Control':'no-cache', 'X-Content-Type-Options':'nosniff', 'Accept-Ranges':'bytes' };
      let start = 0, end = size - 1, status = 200;
      if (req.headers.range) {
        const match = /^bytes=(\d+)-(\d*)$/.exec(req.headers.range);
        if (!match || (start = Number(match[1])) >= size || (end = match[2] ? Math.min(Number(match[2]),size-1) : size-1) < start) {
          res.writeHead(416, { 'Content-Range':`bytes */${size}` }); return res.end();
        }
        status = 206; headers['Content-Range'] = `bytes ${start}-${end}/${size}`;
      }
      headers['Content-Length'] = Math.max(0,end-start+1);
      res.writeHead(status, headers);
      if (req.method === 'HEAD' || size === 0) return res.end();
      const stream = createReadStream(file, { start, end });
      stream.on('error', () => res.destroy());
      res.on('close', () => stream.destroy());
      stream.pipe(res);
    } catch { res.writeHead(404); res.end(); }
  });
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const server = createGameServer();
  server.on('error', error => { console.error(error.code === 'EADDRINUSE' ? PORT_BUSY_MESSAGE : error.message); process.exitCode = 1; });
  server.listen(5173, '127.0.0.1', () => console.log('Grimorio Herbal: http://127.0.0.1:5173/'));
}
