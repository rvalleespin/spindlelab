import * as nuevo from '/tmp/spl-main-wt/spindlelab-astro/functions/api/chequeo.js';
import * as viejo from './chequeo-viejo.mjs';

let ok = 0, malo = 0;
const eq = (n, real, esp) => {
  if (JSON.stringify(real) === JSON.stringify(esp)) ok++;
  else { malo++; console.log(`  FALLA ${n}\n    esperado: ${JSON.stringify(esp)}\n    real:     ${JSON.stringify(real)}`); }
};

const PORTADA = `<!doctype html><html lang="es-CL"><head>
<title>Clínica Ejemplo — Dental en Providencia</title>
<meta name="description" content="Atención dental integral en Providencia, con especialistas, urgencias y convenios. Agenda en línea.">
<link rel="canonical" href="https://ejemplo.cl/">
<script type="application/ld+json">{"@context":"https://schema.org","@type":"Dentist","name":"Clínica Ejemplo","url":"https://ejemplo.cl","telephone":"+56221234567","address":{"@type":"PostalAddress","addressLocality":"Providencia"},"sameAs":["https://instagram.com/x","https://facebook.com/x"]}</script>
</head><body><h1>Clínica Ejemplo</h1><p>Texto.</p></body></html>`;

const ROBOTS = "User-agent: *\nAllow: /\n";
const SITEMAP = '<?xml version="1.0"?><urlset><url><loc>https://ejemplo.cl/</loc></url></urlset>';

// fetch de mentira configurable
function fake(rutas, { largoDeclarado = null, servidor = 'nginx' } = {}) {
  const vistas = [];
  const f = async (url, opts) => {
    vistas.push(url);
    const r = rutas[url];
    if (r === undefined) throw new Error('sin ruta: ' + url);
    const cuerpo = r.body || '';
    // Un servidor normal declara lo que entrega. `largo`/`largoDeclarado` se usan solo
    // cuando la prueba quiere simular a propósito un origen que miente o corta.
    const largo = r.largo != null ? r.largo
      : (largoDeclarado != null && url.endsWith('/') ? largoDeclarado
      : new TextEncoder().encode(cuerpo).length);
    return {
      status: r.status,
      url,
      headers: { get: (k) => {
        const kk = k.toLowerCase();
        if (kk === 'location') return r.location || null;
        if (kk === 'content-length') return largo != null ? String(largo) : null;
        if (kk === 'server') return r.servidor || servidor;
        return null;
      } },
      text: async () => cuerpo,
    };
  };
  f.vistas = vistas;
  return f;
}

const rutasNormales = (extra = {}) => ({
  'https://ejemplo.cl/': { status: 200, body: PORTADA },
  'https://ejemplo.cl/robots.txt': { status: 200, body: ROBOTS },
  'https://ejemplo.cl/llms.txt': { status: 404, body: '' },
  'https://ejemplo.cl/sitemap.xml': { status: 200, body: SITEMAP },
  ...extra,
});

console.log('=== 1. EL BUG: la portada pesada ya no se puntúa inventando ===');
const GRANDE = PORTADA + '<!-- ' + 'x'.repeat(1_200_000) + ' -->';
const ENORME = PORTADA + '<!-- ' + 'x'.repeat(4_000_000) + ' -->';
let puntajeNormal;
{
  const rV = await viejo.chequear('ejemplo.cl', fake(rutasNormales()));
  const rN = await nuevo.chequear('ejemplo.cl', fake(rutasNormales()));
  puntajeNormal = rV.puntaje;
  eq('página normal: el puntaje no cambió', rN.puntaje, rV.puntaje);
  console.log(`  (puntaje de la página de prueba: ${rV.puntaje}, igual en las dos versiones)`);

  // ANTES: la MISMA página, con 1,2 MB de contenido real, pasaba el tope viejo de 900 KB,
  // devolvía texto vacío y se puntuaba igual.
  const pesada = rutasNormales({ 'https://ejemplo.cl/': { status: 200, body: GRANDE } });
  const pV = await viejo.chequear('ejemplo.cl', fake(pesada));
  eq('ANTES: la misma página pesada daba informe', pV.ok, true);
  const ausentes = pV.items.filter(i => !i.ok).map(i => i.id);
  console.log(`  ANTES -> ${pV.puntaje}/100 (contra ${rV.puntaje} de la misma página liviana); marcados ausentes: ${ausentes.slice(0,6).join(', ')}`);

  // AHORA: 1,2 MB cabe en el tope nuevo (3 MB), se lee entera y da el mismo veredicto.
  const pN = await nuevo.chequear('ejemplo.cl', fake(pesada));
  eq('AHORA: 1,2 MB se lee entera', pN.ok, true);
  eq('y da el mismo puntaje que la versión liviana', pN.puntaje, rV.puntaje);

  // Por encima del tope nuevo: no se puntúa, se dice.
  const pE = await nuevo.chequear('ejemplo.cl', fake(rutasNormales({ 'https://ejemplo.cl/': { status: 200, body: ENORME } })));
  eq('4 MB: no da informe', pE.ok, false);
  eq('y lo dice sin inventar', /pesa más de lo que este chequeo/.test(pE.error), true);

  // Lectura corta: el origen declara 1,2 MB y entrega 700 bytes.
  const pC = await nuevo.chequear('ejemplo.cl', fake(rutasNormales(), { largoDeclarado: 1_200_000 }));
  eq('lectura corta: no da informe', pC.ok, false);
  const pCv = await viejo.chequear('ejemplo.cl', fake(rutasNormales(), { largoDeclarado: 1_200_000 }));
  eq('ANTES la lectura corta sí daba informe', pCv.ok, true);
}

console.log('=== 2. 2xx sin HTML: tampoco se puntúa ===');
{
  const r = await nuevo.chequear('ejemplo.cl', fake(rutasNormales({ 'https://ejemplo.cl/': { status: 200, body: '' } })));
  eq('sin HTML: no hay informe', r.ok, false);
  eq('mensaje honesto', /no nos entregó HTML/.test(r.error), true);
}

console.log('=== 3. las notaciones de IP que se colaban ===');
for (const d of ['127.0.0.1', '127.1', '0177.0.0.1', '0x7f.0.0.1', '169.254.169.254', '[::1]']) {
  eq(`rechaza ${d}`, nuevo.normalizarDominio(d).error, 'Escribe un dominio, no una dirección IP.');
  const vv = viejo.normalizarDominio(d);
  if (!vv.error) console.log(`  (antes ${d} pasaba como dominio: ${JSON.stringify(vv)})`);
}
for (const [e, s] of [['spindlelab.cl','spindlelab.cl'], ['https://www.bcn.cl/x','bcn.cl'], ['tienda-2024.cl','tienda-2024.cl']])
  eq(`acepta ${e}`, nuevo.normalizarDominio(e).dominio, s);

console.log('=== 4. redirecciones validadas salto a salto ===');
{
  const rutas = {
    'https://ejemplo.cl/': { status: 301, location: 'https://www.ejemplo.cl/' },
    'https://www.ejemplo.cl/': { status: 200, body: PORTADA },
    'https://ejemplo.cl/robots.txt': { status: 200, body: ROBOTS },
    'https://ejemplo.cl/llms.txt': { status: 404, body: '' },
    'https://ejemplo.cl/sitemap.xml': { status: 200, body: SITEMAP },
  };
  const f = fake(rutas);
  const r = await nuevo.chequear('ejemplo.cl', f);
  eq('sigue el 301 y puntúa', r.ok, true);
  eq('pidió el destino real', f.vistas.includes('https://www.ejemplo.cl/'), true);
}
{
  const f = fake({
    'https://ejemplo.cl/': { status: 302, location: 'http://169.254.169.254/latest/meta-data/' },
    'https://ejemplo.cl/robots.txt': { status: 200, body: ROBOTS },
    'https://ejemplo.cl/llms.txt': { status: 404, body: '' },
    'https://ejemplo.cl/sitemap.xml': { status: 200, body: SITEMAP },
  });
  const r = await nuevo.chequear('ejemplo.cl', f);
  eq('redirección a metadata: sin informe', r.ok, false);
  eq('y nunca se pidió', f.vistas.some(u => u.includes('169.254')), false);
}
{
  const f = fake({
    'https://ejemplo.cl/': { status: 302, location: 'https://ejemplo.cl/' },
    'https://ejemplo.cl/robots.txt': { status: 200, body: ROBOTS },
    'https://ejemplo.cl/llms.txt': { status: 404, body: '' },
    'https://ejemplo.cl/sitemap.xml': { status: 200, body: SITEMAP },
  });
  const r = await nuevo.chequear('ejemplo.cl', f);
  eq('bucle: corta sin colgarse', r.ok, false);
}

console.log('=== 5. las sondas de suplantación siguen funcionando ===');
{
  const rutas = rutasNormales();
  let n = 0;
  const f = async (url, opts) => {
    const ua = opts.headers['User-Agent'];
    // el CDN expulsa a los robots de IA, no al navegador
    if (url === 'https://ejemplo.cl/' && /OAI-SearchBot|ChatGPT-User|PerplexityBot/.test(ua)) {
      n++;
      return { status: 403, url, headers: { get: (k) => k.toLowerCase()==='server' ? 'cloudflare' : null }, text: async () => '' };
    }
    const r = rutas[url];
    return { status: r.status, url, headers: { get: (k) => k.toLowerCase()==='server' ? 'cloudflare' : null }, text: async () => r.body || '' };
  };
  const r = await nuevo.chequear('ejemplo.cl', f);
  eq('las 3 sondas se dispararon', n, 3);
  const item = r.items.find(i => i.id === 'servidor-ua');
  eq('el ítem detecta la expulsión', item.ok, false);
  eq('y nombra los 403', /403/.test(item.detalle), true);
}

console.log('=== 6. los errores dejan de ser un código crudo ===');
{
  const f = fake(rutasNormales({ 'https://ejemplo.cl/': { status: 403, body: '' } }));
  const r = await nuevo.chequear('ejemplo.cl', f);
  eq('devuelve el código aparte', r.codigo, 403);
  eq('el mensaje no es el número', /403/.test(r.error), false);
  eq('y dice qué significa', /robots de IA/.test(r.error), true);
}
for (const [st, re] of [[404,/portada no existe/],[429,/bajar el ritmo/],[526,/certificado/],[530,/no encontramos un sitio/i],[503,/su propio servidor/]]) {
  eq(`mensaje ${st}`, re.test(nuevo.mensajeDeFallo(st)), true);
  eq(`mensaje ${st} sin el número`, new RegExp(String(st)).test(nuevo.mensajeDeFallo(st)), false);
}

console.log('=== 7. equivalencia ítem por ítem en el camino normal ===');
{
  const rV = await viejo.chequear('ejemplo.cl', fake(rutasNormales()));
  const rN = await nuevo.chequear('ejemplo.cl', fake(rutasNormales()));
  eq('misma cantidad de ítems', rN.items.length, rV.items.length);
  let dif = 0;
  for (const iV of rV.items) {
    const iN = rN.items.find(x => x.id === iV.id);
    if (!iN || iN.ok !== iV.ok || iN.peso !== iV.peso) { dif++; console.log(`  DIFIERE ${iV.id}: antes ok=${iV.ok} ahora ok=${iN && iN.ok}`); }
  }
  eq('ningún ítem cambió de veredicto', dif, 0);
}

console.log('=== 8. robots.txt ilegible: no se afirma que esté abierto ===');
{
  const ROBOTS_BLOQUEA = "User-agent: OAI-SearchBot\nDisallow: /\n\nUser-agent: ChatGPT-User\nDisallow: /\n\nUser-agent: GPTBot\nDisallow: /\n";
  const conRobots = (body, largo, status = 200) => rutasNormales({ 'https://ejemplo.cl/robots.txt': { status, body, largo } });
  const verde = (r, id) => r.items.find(i => i.id === id).ok;

  // Lectura corta: el origen declara 5000 y entrega 106. Acá estuvo la regresión.
  const corto = await nuevo.chequear('ejemplo.cl', fake(conRobots(ROBOTS_BLOQUEA, 5000)));
  eq('lectura corta: los índices NO salen en verde', verde(corto, 'bots-indices'), false);
  eq('y se reporta el bloqueo real', /bloquea a OAI-SearchBot/.test(corto.items.find(i=>i.id==='bots-indices').detalle), true);
  const cortoV = await viejo.chequear('ejemplo.cl', fake(conRobots(ROBOTS_BLOQUEA, 5000)));
  eq('mismo veredicto que la versión vieja (sin regresión)', corto.puntaje, cortoV.puntaje);

  // Sin robots.txt de verdad: sí se puede afirmar que nada bloquea.
  const sin = await nuevo.chequear('ejemplo.cl', fake(conRobots('', null, 404)));
  eq('404: los índices salen en verde', verde(sin, 'bots-indices'), true);
  eq('y lo dice', /No tienes robots.txt/.test(sin.items.find(i=>i.id==='bots-indices').detalle), true);

  // robots.txt que no responde: no sabemos, y se dice.
  const caido = async (url) => {
    if (url.endsWith('robots.txt')) throw new Error('red caída');
    return fake(rutasNormales())(url);
  };
  const nr = await nuevo.chequear('ejemplo.cl', caido);
  eq('sin respuesta: no se regala el verde', verde(nr, 'bots-indices'), false);
  eq('y se explica', /no respondió/.test(nr.items.find(i=>i.id==='bots-indices').detalle), true);
  eq('el arreglo no nombra una lista vacía', /bloquea a  /.test(nr.items.find(i=>i.id==='bots-indices').arreglo || ''), false);
  const nrV = await viejo.chequear('ejemplo.cl', caido);
  eq('la versión vieja SÍ regalaba el verde acá', verde(nrV, 'bots-indices'), true);
}

console.log(`\n${ok} bien, ${malo} mal`);
process.exit(malo ? 1 : 0);
