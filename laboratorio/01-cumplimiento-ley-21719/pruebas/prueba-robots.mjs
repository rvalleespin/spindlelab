import * as nuevo from '/tmp/spl-main-wt/spindlelab-astro/functions/api/chequeo.js';
import { execFileSync } from 'node:child_process';

// La versión vieja sale del historial de git (c2616e9), igual que en prueba-gemelo-completa:
// el ./chequeo-viejo.mjs que se importaba nunca se versionó y esta tabla no corría.
const VIEJO = 'c2616e9dbe20d05d9e2edd973e76e7b7fdf9b09a';
const fuenteVieja = execFileSync('git', ['-C', '/tmp/spl-main-wt', 'show', `${VIEJO}:spindlelab-astro/functions/api/chequeo.js`]);
const viejo = await import('data:text/javascript;base64,' + fuenteVieja.toString('base64'));

const PORTADA = '<!doctype html><html lang="es-CL"><head><title>T</title><meta name="description" content="d"></head><body><h1>H</h1></body></html>';
const ROBOTS_BLOQUEA = "User-agent: OAI-SearchBot\nDisallow: /\n\nUser-agent: ChatGPT-User\nDisallow: /\n\nUser-agent: GPTBot\nDisallow: /\n";

function fake({ robotsBody, robotsLargo, robotsStatus = 200, robotsNull = false, soloWww = false }) {
  const base = {
    'https://ejemplo.cl/': { body: PORTADA, status: 200 },
    'https://ejemplo.cl/robots.txt': { body: robotsBody, status: robotsStatus },
    'https://ejemplo.cl/llms.txt': { body: '', status: 404 },
    'https://ejemplo.cl/sitemap.xml': { body: '<?xml version="1.0"?><urlset></urlset>', status: 200 },
  };
  // soloWww: el mismo sitio, pero vive en www y sin www no conecta (clinicasantamaria.cl).
  const rutas = soloWww
    ? Object.fromEntries(Object.entries(base).map(([u, r]) => [u.replace('https://', 'https://www.'), r]))
    : base;
  return async (url) => {
    if (robotsNull && url.endsWith('robots.txt')) throw new Error('cayó la red');
    const r = rutas[url];
    if (!r) throw new Error('no conecta: ' + url);
    const cuerpo = r.body || '';
    const largo = url.endsWith('robots.txt') && robotsLargo != null ? robotsLargo : new TextEncoder().encode(cuerpo).length;
    return { status: r.status, url,
      headers: { get: (k) => k.toLowerCase()==='content-length' ? String(largo) : (k.toLowerCase()==='server'?'nginx':null) },
      text: async () => cuerpo };
  };
}

// Tres estados: VERDE (lo miramos y está bien), rojo (lo miramos y hay algo que corregir) y
// "no sé" (no pudimos leer el archivo, así que no suma ni resta).
const marca = (i) => (i.estado || (i.ok ? 'ok' : 'pendiente'));
const bots = (r) => r.items.filter(i => i.id.startsWith('bots-'))
  .map(i => `${i.id}=${{ ok: 'VERDE', pendiente: 'rojo', 'sin-confirmar': 'no sé' }[marca(i)]}`).join(' ');
const detalle = (r, id) => (r.items.find(i => i.id === id) || {}).detalle || '';

console.log('CASO                                   ver     puntaje  señales de bots');
const nuevas = {};
for (const [nombre, cfg] of [
  ['robots honesto que BLOQUEA',        { robotsBody: ROBOTS_BLOQUEA }],
  ['robots que declara 5000, da 106',   { robotsBody: ROBOTS_BLOQUEA, robotsLargo: 5000 }],
  ['sin robots.txt (404)',              { robotsBody: '', robotsStatus: 404 }],
  ['robots.txt no responde',            { robotsBody: '', robotsNull: true }],
  // Un firewall que deja pasar la portada y bloquea /robots.txt es corriente. Hasta el 23-sep
  // estas cuatro filas decían VERDE y "No tienes robots.txt, así que nada está bloqueado".
  ['robots.txt 403 (firewall)',         { robotsBody: '', robotsStatus: 403 }],
  ['robots.txt 401',                    { robotsBody: '', robotsStatus: 401 }],
  ['robots.txt 429',                    { robotsBody: '', robotsStatus: 429 }],
  ['robots.txt 500',                    { robotsBody: '', robotsStatus: 500 }],
  ['BLOQUEA, sitio que solo vive en www', { robotsBody: ROBOTS_BLOQUEA, soloWww: true }],
]) {
  for (const [v, mod] of [['vieja', viejo], ['nueva', nuevo]]) {
    const r = await mod.chequear('ejemplo.cl', fake(cfg));
    if (v === 'nueva') nuevas[nombre] = r;
    console.log(`${nombre.padEnd(38)} ${v.padEnd(7)} ${r.ok ? String(r.puntaje).padStart(3) + '     ' + bots(r) : '  -     sin informe: ' + r.error.slice(0, 60)}`);
  }
  const rn = nuevas[nombre];
  console.log(`   dice: "${rn.ok ? detalle(rn,'bots-indices').slice(0,120) : rn.error.slice(0,120)}"`);
}

// La tabla es para mirarla; esto es lo que no puede retroceder.
let ok = 0, malo = 0;
const eq = (n, real, esp) => { if (JSON.stringify(real) === JSON.stringify(esp)) ok++; else { malo++; console.log(`  FALLA ${n}: esperado ${JSON.stringify(esp)}, real ${JSON.stringify(real)}`); } };
const verde = (r, id) => r.items.find(i => i.id === id).ok;
eq('robots que no responde: nunca en verde', verde(nuevas['robots.txt no responde'], 'bots-indices'), false);
eq('robots cortado: nunca en verde', verde(nuevas['robots que declara 5000, da 106'], 'bots-indices'), false);
eq('solo en www: hay informe', nuevas['BLOQUEA, sitio que solo vive en www'].ok, true);
eq('solo en www: el robots.txt que manda es el de www', verde(nuevas['BLOQUEA, sitio que solo vive en www'], 'bots-indices'), false);

// Lo que no leímos no suma ni resta: los tres ítems del robots.txt salen del denominador, y
// el texto no puede afirmar que el archivo no existe.
for (const st of [403, 401, 429, 500]) {
  const nombre = st === 403 ? 'robots.txt 403 (firewall)' : `robots.txt ${st}`;
  const r = nuevas[nombre];
  for (const id of ['bots-indices', 'bots-asistentes', 'bots-entrenamiento']) {
    eq(`${st}: ${id} no sale en verde`, verde(r, id), false);
    eq(`${st}: ${id} queda sin confirmar`, marca(r.items.find(i => i.id === id)), 'sin-confirmar');
  }
  eq(`${st}: los 16 puntos salen del denominador`, r.pesoConfirmado, r.pesoTotal - 16);
  eq(`${st}: no se afirma que el archivo no exista`, /No tienes robots\.txt/.test(detalle(r, 'bots-indices')), false);
}
// Y el 404 sigue siendo un verde honesto: ahí el sitio sí nos dijo que el archivo no está.
eq('404: sigue en verde', verde(nuevas['sin robots.txt (404)'], 'bots-indices'), true);
eq('404: nada sale del denominador', nuevas['sin robots.txt (404)'].pesoConfirmado, nuevas['sin robots.txt (404)'].pesoTotal);
console.log(`\n${ok} bien, ${malo} mal`);
process.exit(malo ? 1 : 0);
