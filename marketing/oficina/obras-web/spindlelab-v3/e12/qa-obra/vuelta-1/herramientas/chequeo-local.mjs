// Javiera, QA de obra E12, vuelta 1. Brief §7, criterio 12: «corrido con chequeo.js sobre el build servido en local,
// el sitio saca lo mismo o más que el build del 16-oct». El chequeo lee la raíz de un dominio (inventario-casos §4.4),
// así que la portada que se le sirve es la home v3 (la que va a la raíz al publicar) y robots.txt, llms.txt y
// sitemap.xml son los del build. Se usa chequear() de functions/api/chequeo.js (sin cambios en la obra) con un fetch
// que contesta desde el dist/, para el build de hoy y para el del 16-oct (947e6e1: spindlelab-astro igual a 03d1bb3).
// También la raíz de producción (/) de los dos, que tiene que salir igual.
// Uso: node chequeo-local.mjs <dist-16oct> <dist-hoy> <salida.json>
import { readFileSync, existsSync, statSync, writeFileSync } from 'node:fs';
import { join, extname } from 'node:path';
import { pathToFileURL } from 'node:url';
import { ASTRO } from './comun.mjs';

const { chequear } = await import(pathToFileURL(join(ASTRO, 'functions/api/chequeo.js')).href);
const [d16, dHoy, salida] = process.argv.slice(2);
const TIPOS = { '.html': 'text/html; charset=utf-8', '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml' };

function fetchDesde(dist, portada) {
  return async (url) => {
    const u = new URL(url);
    let ruta = u.pathname === '/' ? portada : u.pathname;
    let f = join(dist, decodeURIComponent(ruta));
    if (existsSync(f) && statSync(f).isDirectory()) f = join(f, 'index.html');
    if (!existsSync(f)) return new Response('no', { status: 404, headers: { 'content-type': 'text/html' } });
    return new Response(readFileSync(f), { status: 200, headers: { 'content-type': TIPOS[extname(f)] || 'application/octet-stream' } });
  };
}
const R = {};
for (const [nombre, dist, portada] of [['16oct-v3', d16, '/v3/index.html'], ['hoy-v3', dHoy, '/v3/index.html'], ['16oct-raiz', d16, '/index.html'], ['hoy-raiz', dHoy, '/index.html']]) {
  const r = await chequear('spindlelab.cl', fetchDesde(dist, portada));
  R[nombre] = r;
  const items = (r.items || r.chequeos || r.resultados || []);
  console.log(nombre, 'ok', r.ok, 'puntaje', r.puntaje ?? r.score ?? r.total, r.error || '');
}
// Ítem por ítem, lo que cambia entre el 16-oct y hoy en la home v3
const lista = (r) => (r.items || r.chequeos || r.grupos?.flatMap((g) => g.items) || []);
const a = lista(R['16oct-v3']), b = lista(R['hoy-v3']);
const dif = [];
for (const x of b) { const y = a.find((z) => (z.id || z.nombre) === (x.id || x.nombre)); if (!y || JSON.stringify(y.ok ?? y.estado) !== JSON.stringify(x.ok ?? x.estado)) dif.push({ item: x.id || x.nombre, antes: y?.ok ?? y?.estado, hoy: x.ok ?? x.estado }); }
console.log('ítems que cambian (home v3):', JSON.stringify(dif));
writeFileSync(salida, JSON.stringify({ cuando: new Date().toISOString(), R, dif }, null, 1));
