import * as nuevo from '/tmp/spl-main-wt/spindlelab-astro/functions/api/chequeo.js';
import { execFileSync } from 'node:child_process';

// La versión vieja sale del historial de git (c2616e9), igual que en prueba-gemelo-completa:
// el ./chequeo-viejo.mjs que se importaba nunca se versionó y esta tabla no corría.
const VIEJO = 'c2616e9dbe20d05d9e2edd973e76e7b7fdf9b09a';
const fuenteVieja = execFileSync('git', ['-C', '/tmp/spl-main-wt', 'show', `${VIEJO}:spindlelab-astro/functions/api/chequeo.js`]);
const viejo = await import('data:text/javascript;base64,' + fuenteVieja.toString('base64'));

const PORTADA = '<!doctype html><html lang="es-CL"><head><title>T</title><meta name="description" content="d"></head><body><h1>H</h1></body></html>';
// La misma portada, pero con todo lo que el chequeo premia. Sirve para la prueba de que un
// robots.txt ilegible no RESTA: acá lo demás vale 84 de 84, así que si restara se vería.
const PORTADA_PERFECTA = `<!doctype html><html lang="es-CL"><head>
<title>Clinica Ejemplo, dental en Providencia</title>
<meta name="description" content="Atencion dental integral en Providencia, con especialistas, urgencias y convenios con isapres. Agenda en linea.">
<link rel="canonical" href="https://ejemplo.cl/">
<script type="application/ld+json">{"@context":"https://schema.org","@graph":[
{"@type":"Dentist","name":"Clinica Ejemplo","url":"https://ejemplo.cl","telephone":"+56221234567","email":"hola@ejemplo.cl","address":{"@type":"PostalAddress","streetAddress":"Av. Ejemplo 100","addressLocality":"Providencia"},"sameAs":["https://instagram.com/x","https://facebook.com/x","https://linkedin.com/company/x"],"datePublished":"2026-01-10","dateModified":"2026-09-01"},
{"@type":"Person","name":"Dra. Ejemplo","jobTitle":"Odontologa","knowsAbout":"Implantologia"},
{"@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Atienden urgencias?","acceptedAnswer":{"@type":"Answer","text":"Si."}}]}]}</script>
</head><body><h1>Clinica Ejemplo</h1>
<h2>Que atenciones hacemos?</h2><h3>Cuanto demora una urgencia?</h3>
<p>${'Atendemos en Providencia desde 1990 con especialistas en cada area. '.repeat(40)}</p>
</body></html>`;
const ROBOTS_BLOQUEA = "User-agent: OAI-SearchBot\nDisallow: /\n\nUser-agent: ChatGPT-User\nDisallow: /\n\nUser-agent: GPTBot\nDisallow: /\n";

function fake({
  robotsBody, robotsLargo, robotsStatus = 200, robotsNull = false, robotsBucle = false,
  soloWww = false, portada = PORTADA, llms = { body: '', status: 404 },
}) {
  const base = {
    'https://ejemplo.cl/': { body: portada, status: 200 },
    'https://ejemplo.cl/robots.txt': { body: robotsBody, status: robotsStatus, bucle: robotsBucle },
    'https://ejemplo.cl/llms.txt': llms,
    'https://ejemplo.cl/sitemap.xml': { body: '<?xml version="1.0"?><urlset></urlset>', status: 200 },
  };
  // soloWww: el mismo sitio, pero vive en www y sin www no conecta (clinicasantamaria.cl).
  const rutas = soloWww
    ? Object.fromEntries(Object.entries(base).map(([u, r]) => [u.replace('https://', 'https://www.'), r]))
    : base;
  let n = 0;
  return async (url) => {
    if (robotsNull && url.endsWith('robots.txt')) throw new Error('cayó la red');
    // El bucle redirige en CADA salto y nunca repite dirección, que es el caso que el corte
    // por direcciones vistas no atrapa: el chequeo se queda sin saltos y pone un 508 suyo.
    const r = rutas[url] || (rutas[url.split('?')[0]] || {}).bucle && rutas[url.split('?')[0]];
    if (!r) throw new Error('no conecta: ' + url);
    if (r.bucle) {
      const destino = url.split('?')[0] + '?n=' + ++n;
      return { status: 301, url, headers: { get: (k) => k.toLowerCase() === 'location' ? destino : null }, text: async () => '' };
    }
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
  ['robots.txt 503',                    { robotsBody: '', robotsStatus: 503 }],
  ['robots cortado, sin bloqueo en lo que leimos', { robotsBody: 'User-agent: *\nAllow: /\n', robotsLargo: 5000 }],
  // El 508 no lo responde nadie: lo ponemos nosotros al cortar una cadena de redirecciones
  // que no llega nunca al archivo. Es nuestro propio límite, así que menos todavía puede
  // salir en verde. Hasta el 23-sep caía en la misma rama que el 404.
  ['robots.txt en bucle (508 nuestro)', { robotsBucle: true }],
  // Las dos respuestas que SÍ significan que el archivo no está, y por eso siguen en verde.
  ['robots.txt 410 (se fue)',           { robotsBody: '', robotsStatus: 410 }],
  ['robots.txt 200 vacío',              { robotsBody: '', robotsStatus: 200 }],
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

// Lo que no leímos no suma ni resta: los tres ítems del robots.txt salen del denominador, el
// texto no puede afirmar que el archivo no existe, y tampoco puede colarse en la lista de
// prioridades (no sabemos si hay algo que corregir, así que no hay nada que pedirle a nadie).
const IDS_ROBOTS = ['bots-indices', 'bots-asistentes', 'bots-entrenamiento'];
const TITULOS_ROBOTS = IDS_ROBOTS.map((id) => nuevas['sin robots.txt (404)'].items.find(i => i.id === id).titulo);
const ILEGIBLES = [
  'robots.txt 403 (firewall)', 'robots.txt 401', 'robots.txt 429', 'robots.txt 500',
  'robots.txt 503', 'robots.txt en bucle (508 nuestro)', 'robots.txt no responde',
  // Cortado y sin bloqueo en lo que alcanzamos a leer: la regla que bloquea puede estar justo
  // en el pedazo que falta. Cortado CON un bloqueo leído es otra cosa, y sigue siendo rojo:
  // eso lo mide la fila "robots cortado: nunca en verde", más arriba.
  'robots cortado, sin bloqueo en lo que leimos',
];
for (const nombre of ILEGIBLES) {
  const r = nuevas[nombre];
  eq(`${nombre}: hay informe`, r.ok, true);
  for (const id of IDS_ROBOTS) {
    eq(`${nombre}: ${id} no sale en verde`, verde(r, id), false);
    eq(`${nombre}: ${id} queda sin confirmar`, marca(r.items.find(i => i.id === id)), 'sin-confirmar');
  }
  eq(`${nombre}: los 16 puntos salen del denominador`, r.pesoConfirmado, r.pesoTotal - 16);
  eq(`${nombre}: no se afirma que el archivo no exista`, /No tienes robots\.txt/.test(detalle(r, 'bots-indices')), false);
  eq(`${nombre}: el detalle dice que no suma ni resta`, /no suma ni resta/.test(detalle(r, 'bots-indices')), true);
  // Un "no lo sabemos" no es una prioridad a corregir.
  eq(`${nombre}: no se cuela en las prioridades`, r.prioridades.filter(p => TITULOS_ROBOTS.includes(p.titulo)).length, 0);
}
// Y el motivo se dice, porque no es lo mismo un firewall que un bucle de redirecciones.
eq('403: el detalle dice que no nos dieron permiso', /no tenemos permiso/.test(detalle(nuevas['robots.txt 403 (firewall)'], 'bots-indices')), true);
eq('508: el detalle dice que nos mandaron de una dirección a otra', /de una dirección a otra/.test(detalle(nuevas['robots.txt en bucle (508 nuestro)'], 'bots-indices')), true);
eq('508: el 508 lo ponemos nosotros, no lo respondió el sitio', /respondió 508|código 508/.test(detalle(nuevas['robots.txt en bucle (508 nuestro)'], 'bots-indices')), false);

// Las tres respuestas que SÍ medimos siguen en verde y dentro del denominador: un 404 y un
// 410 son el sitio diciéndonos que el archivo no está, y un 200 vacío es el archivo, vacío.
for (const [nombre, frase] of [
  ['sin robots.txt (404)', /No tienes robots\.txt/],
  ['robots.txt 410 (se fue)', /No tienes robots\.txt/],
  ['robots.txt 200 vacío', /está vacío/],
]) {
  const r = nuevas[nombre];
  for (const id of IDS_ROBOTS) eq(`${nombre}: ${id} en verde`, verde(r, id), true);
  eq(`${nombre}: nada sale del denominador`, r.pesoConfirmado, r.pesoTotal);
  eq(`${nombre}: el detalle lo dice`, frase.test(detalle(r, 'bots-indices')), true);
}

// La prueba de que NO RESTA, en los dos extremos. El mismo sitio, con el robots.txt legible
// (404) y con el robots.txt ilegible (403). Si restara, los 16 puntos se verían faltando.
//
// Extremo A: todo lo demás en verde. Con 404 son 100; si el robots ilegible restara, serían
// 84. Tiene que seguir siendo 100: no sabemos nada de esos tres, y no saber no castiga.
const perfecta404 = await nuevo.chequear('ejemplo.cl', fake({ portada: PORTADA_PERFECTA, robotsBody: '', robotsStatus: 404, llms: { body: '# Ejemplo\n', status: 200 } }));
const perfecta403 = await nuevo.chequear('ejemplo.cl', fake({ portada: PORTADA_PERFECTA, robotsBody: '', robotsStatus: 403, llms: { body: '# Ejemplo\n', status: 200 } }));
eq('extremo A: con robots 404 el sitio perfecto saca 100', perfecta404.puntaje, 100);
eq('extremo A: con robots ilegible sigue sacando 100 (no resta)', perfecta403.puntaje, 100);
eq('extremo A: y los 16 puntos salieron de la cuenta', perfecta403.pesoConfirmado, perfecta403.pesoTotal - 16);

// Extremo B: el sitio pelado. Acá se ve que tampoco SUMA. Con 404 los tres verdes valen 16
// puntos reales; con 403 el puntaje es el del resto, ni el de antes ni el de antes menos 16.
const pelada404 = nuevas['sin robots.txt (404)'];
const pelada403 = nuevas['robots.txt 403 (firewall)'];
const sinRobots = pelada404.items.filter(i => i.estado === 'ok' && !IDS_ROBOTS.includes(i.id)).reduce((a, i) => a + i.peso, 0);
eq('extremo B: con robots 404 los tres verdes sí suman', pelada404.puntaje, Math.round(100 * (sinRobots + 16) / pelada404.pesoTotal));
eq('extremo B: con robots ilegible el puntaje es el del resto, sobre el resto',
  pelada403.puntaje, Math.round(100 * sinRobots / (pelada403.pesoTotal - 16)));
console.log(`\n${ok} bien, ${malo} mal`);
process.exit(malo ? 1 : 0);
