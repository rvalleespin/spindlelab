// El cambio del 23-sep que dejó lineal la lectura del HTML y del robots.txt de spindlelab.cl
// (ver prueba-cpu-hostil.mjs) prometía no cambiar ningún resultado: cada función nueva tenía
// que devolver exactamente lo que devolvía su regex. Esto lo comprueba contra la versión de
// justo antes, sacada de git, con entradas al azar armadas de las piezas que esas funciones
// miran: etiquetas sin cerrar, comillas sueltas, varios content=, títulos con y sin pregunta,
// bloques JSON-LD con @graph y sameAs, y robots.txt con fines de línea raros.
//
// Se compara la salida entera de `chequear` (sin la hora) y de `bloqueaBot`. Las entradas son
// cortas a propósito: la versión vieja es cuadrática y con entradas largas no terminaría.
//
// Antes de subir el cambio se hizo además, fuera de este archivo: cada función contra su
// regex con 4,2 millones de cadenas, y 60 portadas reales (hasta 2,4 MB) enteras y cortadas en
// 30 puntos, 1.860 comparaciones. Cero diferencias.
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

// El chequeo a probar. Esta rama lleva una versión vieja de spindlelab-astro/, así que por
// defecto se lee del worktree de main, como hacen las demás pruebas de esta carpeta; con
// CHEQUEO_SPL se apunta a otra copia.
const RUTA = process.env.CHEQUEO_SPL || '/tmp/spl-main-wt/spindlelab-astro/functions/api/chequeo.js';
const nuevo = await import(RUTA);

// La versión de justo antes de este cambio, sacada del historial (no de un archivo suelto: el
// ./chequeo-viejo.mjs que importaban las pruebas viejas nunca se versionó y por eso no corrían
// en ningún otro lado). El repo sale del propio archivo de prueba, así que funciona desde
// cualquier worktree, incluido el del iCloud Drive de Ramón: la ruta sale de fileURLToPath y
// no de URL.pathname, que la deja con %20 y %7E y hace fallar a git. Si este cambio se rebasa
// sobre otro que toque el chequeo, hay que mover el commit al que quede justo antes.
const VIEJO = process.env.CHEQUEO_VIEJO_COMMIT || 'a453333';
const repo = execFileSync('git', ['-C', fileURLToPath(new URL('.', import.meta.url)), 'rev-parse', '--show-toplevel'], { encoding: 'utf8' }).trim();
const fuenteVieja = execFileSync('git', ['-C', repo, 'show', `${VIEJO}:spindlelab-astro/functions/api/chequeo.js`]);
const viejo = await import('data:text/javascript;base64,' + fuenteVieja.toString('base64'));

let semilla = Number(process.env.SEMILLA || 23);
const azar = () => ((semilla = (semilla * 1103515245 + 12345) % 2147483648) / 2147483648);
const elegir = (a) => a[Math.floor(azar() * a.length)];

let ok = 0, malo = 0;
function comparar(nombre, entrada, a, b) {
  if (a === b) { ok++; return; }
  malo++;
  if (malo <= 5) console.log(`  DISTINTO ${nombre}\n    entrada: ${JSON.stringify(entrada).slice(0, 300)}\n    antes:   ${a.slice(0, 300)}\n    ahora:   ${b.slice(0, 300)}`);
}

function fake(portada, robots) {
  return async (url) => {
    const cuerpo = url.endsWith('/') ? portada : url.endsWith('robots.txt') ? robots : url.endsWith('sitemap.xml') ? '<urlset></urlset>' : '';
    return {
      status: url.endsWith('llms.txt') ? 404 : 200,
      url,
      headers: { get: (k) => (k.toLowerCase() === 'content-length' ? String(Buffer.byteLength(cuerpo)) : null) },
      text: async () => cuerpo,
    };
  };
}
const salida = async (mod, portada, robots) => JSON.stringify({ ...(await mod.chequear('ejemplo.cl', fake(portada, robots))), revisadoEn: 0 });

// Piezas de largo distinto, para que un valor distinto casi siempre dé un largo distinto en el
// detalle ("62 caracteres.", "Encontramos 3 título(s)...").
const PIEZAS = ['<', '>', '"', "'", ' ', '\n', '\r', '?', 'x', 'abc', '=',
  '<title', '<TITLE>', '<title>', '</title>', '</Title>', 'Un título que mide bastante',
  '<meta', '<META ', ' name="description"', "name='description'", 'NAME="Description"', 'name="description\'',
  'content="', "content='", 'CONTENT="', ' content="corto"', 'una descripción de largo medio',
  '<h2', '<H3', '<h2>', '<h3 class="x">', '</h2>', '</h3>', '</H2>', '¿pregunta?', '<h1>', '<h1',
  '<script', '<script>', '</script>', '</SCRIPT>', '<style>', '<style', '</style>',
  ' type="application/ld+json"', "type='application/ld+json'", '{"@type":"Dentist","sameAs":["a","b","c"]}',
  '{"@graph":[{"@type":"Person","jobTitle":"x"},{"@type":"FAQPage"}]}', '[[{"@type":"Organization","address":"x","telephone":"1"}]]',
  '<link', ' rel="canonical"', "rel='canonical'", '<html', '<HTML', ' lang="es"', "lang='EN'", 'lang="e',
  'palabra otra más ', '<>', '<<', '>>', '\t', '\u2028', 'ñ'];

console.log('=== 1. portadas al azar: salida completa de chequear ===');
{
  const N = Number(process.env.VUELTAS || 20000);
  for (let i = 0; i < N; i++) {
    let portada = '';
    for (let k = Math.floor(azar() * 30); k > 0; k--) portada += elegir(PIEZAS);
    comparar('portada', portada, await salida(viejo, portada, ''), await salida(nuevo, portada, ''));
  }
  console.log(`  ${N} portadas`);
}

console.log('=== 2. una portada normal cortada en cualquier punto ===');
{
  const PORTADA = `<!doctype html><html lang="es-CL"><head>
<title>Clínica Ejemplo, dental en Providencia</title>
<meta name="description" content="Atención dental integral en Providencia, con especialistas, urgencias y convenios.">
<link rel="canonical" href="https://ejemplo.cl/">
<script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"Dentist","name":"X","address":{"@type":"PostalAddress"},"telephone":"1","sameAs":["a","b","c"]},{"@type":"FAQPage"}]}</script>
<style>h2{color:red}</style></head><body><h1>Clínica</h1>
<h2>¿Atienden urgencias?</h2><p>Sí, de lunes a sábado.</p><h3>¿Tienen convenios?</h3><p>Con Fonasa e isapres.</p>
<script>if (a < b) { x = "<h2>?</h2>"; }</script><p>${'Texto de la portada. '.repeat(40)}</p></body></html>`;
  for (let corte = 0; corte <= PORTADA.length; corte++) {
    const p = PORTADA.slice(0, corte);
    comparar(`cortada en ${corte}`, p, await salida(viejo, p, ''), await salida(nuevo, p, ''));
  }
  console.log(`  ${PORTADA.length + 1} cortes`);
}

console.log('=== 3. robots.txt al azar: bloqueaBot para cada robot ===');
{
  const LINEAS = ['User-agent: *', 'User-agent: GPTBot', 'user-agent:gptbot', 'USER-AGENT :  ClaudeBot', 'User-agent: OAI-SearchBot #x',
    'Disallow: /', 'Disallow:', 'disallow : /', 'Allow: /', 'Allow: /*', 'Disallow: *', 'Disallow: /*', 'Disallow: /x', 'Allow:',
    'Sitemap: https://x/s.xml', '# comentario', 'Crawl-delay: 1', '', '   ', 'Disallow: / # nada', 'User-agent: CCBot\rDisallow: /',
    'Disallow: /\u2028x', 'User-agent:\u00a0*', 'Disallow:\t/', 'User agent: *', 'User-agent: ChatGPT-User', 'Disallow: /\r',
    '\ufeffUser-agent: *', ':', 'Disallow'];
  const FINES = ['\n', '\r\n', '\n', '\r'];
  const BOTS = ['OAI-SearchBot', 'Claude-SearchBot', 'PerplexityBot', 'ChatGPT-User', 'Claude-User', 'Perplexity-User',
    'GPTBot', 'ClaudeBot', 'Google-Extended', 'CCBot', '*'];
  const N = Number(process.env.VUELTAS_ROBOTS || 50000);
  for (let i = 0; i < N; i++) {
    let robots = '';
    for (let k = Math.floor(azar() * 12); k > 0; k--) robots += elegir(LINEAS) + elegir(FINES);
    const a = JSON.stringify(BOTS.map((b) => viejo.bloqueaBot(robots, b)));
    const b = JSON.stringify(BOTS.map((b) => nuevo.bloqueaBot(robots, b)));
    comparar('robots.txt', robots, a, b);
  }
  // Y el camino entero, con los diez robots leyendo el mismo archivo una sola vez.
  const portada = '<html lang="es"><head><title>Título de prueba</title></head><body><h1>x</h1></body></html>';
  for (let i = 0; i < 2000; i++) {
    let robots = '';
    for (let k = Math.floor(azar() * 12); k > 0; k--) robots += elegir(LINEAS) + elegir(FINES);
    comparar('chequear con robots.txt', robots, await salida(viejo, portada, robots), await salida(nuevo, portada, robots));
  }
  console.log(`  ${N} robots.txt x ${BOTS.length} robots, y 2000 por el camino entero`);
}

console.log(`\n${ok} iguales, ${malo} distintas`);
process.exit(malo ? 1 : 0);
