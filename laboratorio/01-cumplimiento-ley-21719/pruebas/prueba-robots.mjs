import * as nuevo from '/tmp/spl-main-wt/spindlelab-astro/functions/api/chequeo.js';
import * as viejo from './chequeo-viejo.mjs';

const PORTADA = '<!doctype html><html lang="es-CL"><head><title>T</title><meta name="description" content="d"></head><body><h1>H</h1></body></html>';
const ROBOTS_BLOQUEA = "User-agent: OAI-SearchBot\nDisallow: /\n\nUser-agent: ChatGPT-User\nDisallow: /\n\nUser-agent: GPTBot\nDisallow: /\n";

function fake({ robotsBody, robotsLargo, robotsStatus = 200, robotsNull = false }) {
  const rutas = {
    'https://ejemplo.cl/': { body: PORTADA, status: 200 },
    'https://ejemplo.cl/robots.txt': { body: robotsBody, status: robotsStatus },
    'https://ejemplo.cl/llms.txt': { body: '', status: 404 },
    'https://ejemplo.cl/sitemap.xml': { body: '<?xml version="1.0"?><urlset></urlset>', status: 200 },
  };
  return async (url) => {
    if (robotsNull && url.endsWith('robots.txt')) throw new Error('cayó la red');
    const r = rutas[url];
    const cuerpo = r.body || '';
    const largo = url.endsWith('robots.txt') && robotsLargo != null ? robotsLargo : new TextEncoder().encode(cuerpo).length;
    return { status: r.status, url,
      headers: { get: (k) => k.toLowerCase()==='content-length' ? String(largo) : (k.toLowerCase()==='server'?'nginx':null) },
      text: async () => cuerpo };
  };
}

const bots = (r) => r.items.filter(i => i.id.startsWith('bots-')).map(i => `${i.id}=${i.ok?'VERDE':'rojo'}`).join(' ');
const detalle = (r, id) => (r.items.find(i => i.id === id) || {}).detalle || '';

console.log('CASO                                   ver     puntaje  señales de bots');
for (const [nombre, cfg] of [
  ['robots honesto que BLOQUEA',        { robotsBody: ROBOTS_BLOQUEA }],
  ['robots que declara 5000, da 106',   { robotsBody: ROBOTS_BLOQUEA, robotsLargo: 5000 }],
  ['sin robots.txt (404)',              { robotsBody: '', robotsStatus: 404 }],
  ['robots.txt no responde',            { robotsBody: '', robotsNull: true }],
]) {
  for (const [v, mod] of [['vieja', viejo], ['nueva', nuevo]]) {
    const r = await mod.chequear('ejemplo.cl', fake(cfg));
    console.log(`${nombre.padEnd(38)} ${v.padEnd(7)} ${String(r.puntaje).padStart(3)}     ${bots(r)}`);
  }
  const rn = await nuevo.chequear('ejemplo.cl', fake(cfg));
  console.log(`   dice: "${detalle(rn,'bots-indices').slice(0,120)}"`);
}
