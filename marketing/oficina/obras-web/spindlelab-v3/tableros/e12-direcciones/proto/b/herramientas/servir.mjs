// Servidor local de la dirección B (E12, paso 2). Lucía, 17-oct-2026.
//
// Sirve la raíz del repo como archivos estáticos y responde /api/chequeo con el chequeo DE
// VERDAD: importa `chequear()` de spindlelab-astro/functions/api/chequeo.js (solo lo lee; no se
// toca ese archivo) y le pasa un fetch que sale por el proxy de la sesión (EnvHttpProxyAgent de
// undici, el mismo que ya trae spindlelab-astro/node_modules). Nada se publica: escucha en
// 127.0.0.1 y se apaga con Ctrl+C o al matar el proceso.
//
// Uso:  node servir.mjs [puerto]        (por defecto 8791)
//       → http://127.0.0.1:8791/marketing/oficina/obras-web/spindlelab-v3/tableros/e12-direcciones/proto/b/

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const AQUI = path.dirname(fileURLToPath(import.meta.url));
// herramientas → b → proto → e12-direcciones → tableros → spindlelab-v3 → obras-web → oficina → marketing → raíz
const RAIZ = path.resolve(AQUI, '../../../../../../../../..');
const PUERTO = Number(process.argv[2] || 8791);

const undici = await import(pathToFileURL(path.join(RAIZ, 'spindlelab-astro/node_modules/undici/index.js')).href);
const agente = new undici.EnvHttpProxyAgent();
const fetchPorProxy = (url, opts = {}) => undici.fetch(url, { ...opts, dispatcher: agente });
const { chequear } = await import(pathToFileURL(path.join(RAIZ, 'spindlelab-astro/functions/api/chequeo.js')).href);

const TIPOS = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.woff2': 'font/woff2',
  '.webm': 'video/webm', '.mp4': 'video/mp4', '.txt': 'text/plain; charset=utf-8', '.ico': 'image/x-icon',
};

const servidor = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://127.0.0.1:${PUERTO}`);
  if (url.pathname === '/api/chequeo') {
    let cuerpo, estado = 200;
    try {
      cuerpo = await chequear(url.searchParams.get('dominio') || '', fetchPorProxy);
      if (!cuerpo.ok) estado = 400;
    } catch {
      estado = 500;
      cuerpo = { ok: false, error: 'No pudimos completar el chequeo. Inténtalo de nuevo.' };
    }
    res.writeHead(estado, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
    res.end(JSON.stringify(cuerpo));
    return;
  }
  let ruta = path.normalize(decodeURIComponent(url.pathname)).replace(/^([/\\])+/, '');
  let archivo = path.join(RAIZ, ruta);
  if (!archivo.startsWith(RAIZ)) { res.writeHead(403); res.end(); return; }
  try {
    let st = fs.statSync(archivo);
    if (st.isDirectory()) { archivo = path.join(archivo, 'index.html'); st = fs.statSync(archivo); }
    const tipo = TIPOS[path.extname(archivo).toLowerCase()] || 'application/octet-stream';
    // Los videos piden rangos: sin 206 Chromium no los deja adelantar ni repetir.
    const rango = req.headers.range && /bytes=(\d*)-(\d*)/.exec(req.headers.range);
    if (rango) {
      const ini = rango[1] ? Number(rango[1]) : 0;
      const fin = rango[2] ? Number(rango[2]) : st.size - 1;
      res.writeHead(206, { 'Content-Type': tipo, 'Content-Range': `bytes ${ini}-${fin}/${st.size}`,
        'Accept-Ranges': 'bytes', 'Content-Length': fin - ini + 1, 'Cache-Control': 'no-store' });
      fs.createReadStream(archivo, { start: ini, end: fin }).pipe(res);
      return;
    }
    res.writeHead(200, { 'Content-Type': tipo, 'Content-Length': st.size, 'Accept-Ranges': 'bytes', 'Cache-Control': 'no-store' });
    fs.createReadStream(archivo).pipe(res);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('No existe en el prototipo: ' + url.pathname);
  }
});

servidor.listen(PUERTO, '127.0.0.1', () => {
  console.log(`B en http://127.0.0.1:${PUERTO}/marketing/oficina/obras-web/spindlelab-v3/tableros/e12-direcciones/proto/b/`);
});
