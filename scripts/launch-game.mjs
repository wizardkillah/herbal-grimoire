import { spawn, spawnSync } from 'node:child_process';
import { existsSync, statSync, readdirSync, mkdirSync, openSync, closeSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PORT_BUSY_MESSAGE } from './serve-game.mjs';

const project = fileURLToPath(new URL('../', import.meta.url));
const gameUrl = 'http://127.0.0.1:5173/';
const dist = resolve(project,'dist');
function latest(path) {
  const stat = statSync(path);
  return stat.isDirectory() ? Math.max(stat.mtimeMs,...readdirSync(path).map(name => latest(join(path,name)))) : stat.mtimeMs;
}
async function running() {
  try {
    const response = await fetch(gameUrl+'__grimorio_launcher', { signal:AbortSignal.timeout(1500) });
    const health = await response.json();
    if (health.app === 'grimorio-herbal' && health.root.toLowerCase() === dist.toLowerCase()) return true;
  } catch {}
  try {
    const html = await (await fetch(gameUrl, { signal:AbortSignal.timeout(1500) })).text();
    return html.includes('<title>Grimorio Herbal</title>') && html.includes('/@vite/client');
  } catch { return false; }
}
try {
  const index = join(dist,'index.html');
  const inputs = ['src','public','index.html','package.json','package-lock.json','vite.config.js'];
  if (!existsSync(index) || inputs.some(path => latest(join(project,path)) > statSync(index).mtimeMs)) {
    const vite = join(project,'node_modules/vite/bin/vite.js');
    if (!existsSync(vite)) throw new Error('Faltan dependencias. Ejecuta npm install en la carpeta del juego y vuelve a abrir el lanzador.');
    console.log('Preparando la version actual de Grimorio Herbal...');
    const result = spawnSync(process.execPath,[vite,'build'],{ cwd:project,stdio:'inherit',windowsHide:true });
    if (result.status !== 0) throw new Error('No se pudo compilar el juego. Revisa los detalles anteriores.');
  }
  if (!await running()) {
    const logs = join(project,'.launcher');
    mkdirSync(logs,{recursive:true});
    const out = openSync(join(logs,'server.log'),'a');
    const err = openSync(join(logs,'server-error.log'),'a');
    const child = spawn(process.execPath,[join(project,'scripts/serve-game.mjs')],{
      cwd:project,detached:true,windowsHide:true,stdio:['ignore',out,err],
    });
    let failed = false;
    child.on('error',() => { failed = true; });
    child.unref();closeSync(out);closeSync(err);
    let ready = false;
    for (let attempt=0;attempt<30;attempt++) {
      await new Promise(resolve => setTimeout(resolve,200));
      if (await running()) { ready=true;break; }
      if (failed || child.exitCode !== null) break;
    }
    if (!ready) throw new Error(PORT_BUSY_MESSAGE + ' Detalles: .launcher/server-error.log.');
  }
  if (!process.argv.includes('--no-browser')) {
    const opened = spawnSync('powershell.exe',['-NoLogo','-NoProfile','-Command',`Start-Process '${gameUrl}'`],{windowsHide:true,stdio:'inherit'});
    if (opened.status !== 0) throw new Error('El juego esta listo. Abre manualmente '+gameUrl);
  }
  console.log('Grimorio Herbal esta listo en '+gameUrl);
} catch (error) { console.error(error.message);process.exitCode=1; }
