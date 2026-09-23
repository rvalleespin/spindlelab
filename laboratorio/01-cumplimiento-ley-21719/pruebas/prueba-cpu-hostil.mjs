// El chequeo de spindlelab.cl con portadas y robots.txt armados para gastarle CPU: cada caso
// pesa entre 2 y 3 MB (el tope de lectura es 3 MB) y tiene que terminar bajo TOPE_MS de CPU.
//
// Por qué existe: el 23-sep se midió que las regex de antes crecían al cuadrado o peor con
// entradas así. La de la meta description tardaba 5,3 s de CPU con 25 KB de
// '<meta name="description" ' repetido; la de los títulos con pregunta, 7,3 s con 100 KB de
// '?'; la del texto visible, 7 s con 100 KB de '<'; el robots.txt, 4,7 s con 200 KB de
// User-agent y Disallow. Con 3 MB eran minutos por visita, en un endpoint público y sin
// autenticar. Con la versión lineal cada caso tarda entre 10 y 300 ms, y el más lento, unos
// 0,4 s (el @graph de 700.000 nodos: casi todo es JSON.parse). El tope deja margen para una
// máquina varias veces más lenta y sigue siendo cientos de veces menos que la cuadrática.
//
// La ruta del chequeo se puede cambiar con CHEQUEO_SPL=/ruta/a/chequeo.js.
const RUTA = process.env.CHEQUEO_SPL || '/tmp/spl-main-wt/spindlelab-astro/functions/api/chequeo.js';
const m = await import(RUTA);

const TOPE_MS = 2000;
const LARGO = 2_900_000; // bajo el tope de 3.000.000 bytes, para que el chequeo lo lea entero

let ok = 0, malo = 0;
const eq = (n, real, esp) => {
  if (JSON.stringify(real) === JSON.stringify(esp)) ok++;
  else { malo++; console.log(`  FALLA ${n}\n    esperado: ${JSON.stringify(esp)}\n    real:     ${JSON.stringify(real)}`); }
};

// Repite `pieza` hasta LARGO caracteres (todo ASCII, así que caracteres = bytes).
const relleno = (pieza, largo = LARGO) => pieza.repeat(Math.ceil(largo / pieza.length)).slice(0, largo);

function fake({ portada, robots = 'User-agent: *\nAllow: /\n' }) {
  const rutas = {
    'https://ejemplo.cl/': portada,
    'https://ejemplo.cl/robots.txt': robots,
    'https://ejemplo.cl/sitemap.xml': '<?xml version="1.0"?><urlset></urlset>',
  };
  return async (url) => {
    const cuerpo = rutas[url] ?? '';
    return {
      status: url in rutas ? 200 : 404,
      url,
      headers: { get: (k) => (k.toLowerCase() === 'content-length' ? String(Buffer.byteLength(cuerpo)) : null) },
      text: async () => cuerpo,
    };
  };
}

// Una cabeza normal, para que el resto de las señales tenga algo que leer.
const CABEZA = '<!doctype html><html lang="es-CL"><head><title>Clínica Ejemplo en Providencia</title>' +
  '<meta name="description" content="Atención dental integral en Providencia, con especialistas y urgencias.">' +
  '<link rel="canonical" href="https://ejemplo.cl/"></head><body><h1>Clínica</h1>';

async function caso(nombre, entrada, revisar = () => {}) {
  const f = fake(entrada);
  const a = process.cpuUsage();
  let r, error;
  try { r = await m.chequear('ejemplo.cl', f); } catch (e) { error = e; }
  const d = process.cpuUsage(a);
  const ms = (d.user + d.system) / 1000;
  const kb = Math.round(Buffer.byteLength(entrada.portada) / 1024);
  const kbRobots = entrada.robots ? Math.round(Buffer.byteLength(entrada.robots) / 1024) : 0;
  const peso = kbRobots > 1 ? `robots ${kbRobots} KB` : `${kb} KB`;
  console.log(`  ${nombre.padEnd(52)} ${peso.padStart(14)} ${ms.toFixed(0).padStart(6)} ms  ${error ? 'REVIENTA ' + error.constructor.name : r.ok ? `${r.puntaje}/100` : 'sin informe'}`);
  eq(`${nombre}: no revienta`, error ? `${error.constructor.name}: ${error.message}` : null, null);
  eq(`${nombre}: bajo ${TOPE_MS} ms de CPU`, ms < TOPE_MS, true);
  if (r) revisar(r);
}

const item = (r, id) => r.items && r.items.find((i) => i.id === id);

console.log('=== 1. etiquetas sin cerrar, 2,9 MB de cada una ===');
for (const pieza of [
  '<meta name="description" ', // la de 5,3 s con 25 KB
  '<meta content="x" ',
  '<meta ',
  '<link ',
  '<html ',
  '<title>',
  '<h2 ',
  '<h3>',
  '<script ',
  '<script>',
  '<script type="application/ld+json">',
  '<style>',
  '<a href="x" ',
  '<',
]) {
  await caso(`'${pieza}' repetido`, { portada: relleno(pieza) });
}

console.log('=== 2. atributos enormes ===');
await caso('un <meta> con 2,9 MB de name="description" y sin content', {
  portada: '<meta ' + relleno('name="description" '),
});
await caso('un <script> con 2,9 MB de type="application/ld+json"', {
  portada: '<script ' + relleno('type="application/ld+json" '),
});
await caso('un <html> con 2,9 MB de lang="', { portada: '<html ' + relleno('lang="') });
await caso('una meta description de 2,8 MB, bien cerrada', {
  portada: CABEZA.replace('<meta name', '<meta name="description" content="' + 'a'.repeat(2_800_000) + '"><meta name'),
}, (r) => {
  // La primera meta description gana, igual que antes: 2,8 MB de largo no es una descripción útil.
  eq('descripción enorme: se lee entera y se marca como no útil', item(r, 'desc').detalle, '2800000 caracteres.');
});
await caso('una meta description sin comilla de cierre en 2,8 MB', {
  portada: '<meta name="description" content="' + 'a'.repeat(2_800_000),
});
await caso('un <h2> con 2,9 MB de "?" sin cierre', { portada: '<h2>' + relleno('?') });

console.log('=== 3. miles de etiquetas bien cerradas ===');
{
  const metas = '<meta name="x" content="y">'.repeat(100_000);
  await caso('100.000 <meta> y la descripción al final', {
    portada: '<html lang="es"><head><title>Clínica Ejemplo en Providencia</title>' + metas +
      '<meta name="description" content="' + 'd'.repeat(80) + '"></head><body><h1>x</h1></body></html>',
  }, (r) => {
    eq('100.000 <meta>: encuentra la descripción del final', item(r, 'desc').detalle, '80 caracteres.');
  });
}
await caso('60.000 títulos con pregunta', { portada: CABEZA + '<h2>¿Atienden los sábados?</h2>'.repeat(60_000) }, (r) => {
  eq('60.000 títulos con pregunta: los cuenta todos', item(r, 'preguntas').detalle, 'Encontramos 60000 título(s) con forma de pregunta.');
});
await caso('30.000 bloques JSON-LD', {
  portada: CABEZA + '<script type="application/ld+json">{"@type":"Dentist","sameAs":["a","b","c"]}</script>'.repeat(30_000),
}, (r) => {
  eq('30.000 bloques JSON-LD: los lee todos', item(r, 'jsonld').detalle, 'Encontramos 30000 nodo(s) de JSON-LD.');
});

console.log('=== 4. JSON-LD que reventaba la pila ===');
// Estos tres daban RangeError antes del 23-sep: el visitante recibía "No pudimos completar el
// chequeo" en vez de un informe.
const conJsonLd = (json) => ({ portada: CABEZA + '<script type="application/ld+json">' + json + '</script></body></html>' });
await caso('arreglos anidados 500.000 niveles', conJsonLd('['.repeat(500_000) + ']'.repeat(500_000)), (r) => {
  eq('arreglos anidados: hay informe', r.ok, true);
});
await caso('@graph anidado 200.000 niveles', conJsonLd('{"@graph":'.repeat(200_000) + '{"@type":"Dentist"}' + '}'.repeat(200_000)), (r) => {
  eq('@graph anidado: encuentra la entidad del fondo', item(r, 'entidad').ok, true);
});
await caso('@graph con 700.000 nodos', conJsonLd('{"@graph":[' + Array(700_000).fill('{}').join(',') + ',{"sameAs":["a","b","c"]}]}'), (r) => {
  eq('@graph de 700.000 nodos: cuenta los sameAs del último', item(r, 'sameas').ok, true);
});

console.log('=== 5. robots.txt hostiles ===');
const PORTADA_NORMAL = CABEZA + '<p>Texto.</p></body></html>';
await caso('una línea de 2,9 MB de "#" con un \\r al final', { portada: PORTADA_NORMAL, robots: relleno('#') + '\r' });
await caso('user-agent: con 2,9 MB de espacios y un \\r', { portada: PORTADA_NORMAL, robots: 'user-agent:' + relleno(' ') + 'x\ry' });
{
  const robots = relleno('User-agent: a\n', 1_450_000) + '\n' + relleno('Disallow: /x\n', 1_450_000);
  await caso('100.000 User-agent seguidos de 100.000 Disallow', { portada: PORTADA_NORMAL, robots });
}
{
  // El mismo volumen, pero el último grupo sí bloquea a OAI-SearchBot: tiene que seguir viéndose.
  const robots = relleno('User-agent: a\nDisallow: /x\n', 2_800_000) + '\nUser-agent: OAI-SearchBot\nDisallow: /\n';
  await caso('100.000 grupos y el bloqueo real al final', { portada: PORTADA_NORMAL, robots }, (r) => {
    eq('100.000 grupos: el bloqueo del final se ve', /bloquea a OAI-SearchBot/.test(item(r, 'bots-indices').detalle), true);
  });
}

console.log(`\n${ok} bien, ${malo} mal`);
process.exit(malo ? 1 : 0);
