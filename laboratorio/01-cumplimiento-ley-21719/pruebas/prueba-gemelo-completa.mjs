import * as nuevo from '/tmp/spl-main-wt/spindlelab-astro/functions/api/chequeo.js';
import { execFileSync } from 'node:child_process';

// La versión vieja sale del historial de git (c2616e9, la de antes de "El chequeo de
// /diagnostico/ deja de inventar informes"), no de un archivo suelto. El import apuntaba a un
// ./chequeo-viejo.mjs que vivía en el scratchpad de una sesión y nunca se versionó, así que
// esta prueba no corría en ningún otro lado. Se importa como data: para no escribir nada.
const VIEJO = 'c2616e9dbe20d05d9e2edd973e76e7b7fdf9b09a';
const fuenteVieja = execFileSync('git', ['-C', '/tmp/spl-main-wt', 'show', `${VIEJO}:spindlelab-astro/functions/api/chequeo.js`]);
const viejo = await import('data:text/javascript;base64,' + fuenteVieja.toString('base64'));

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
// El www ya no se borra: se revisa lo que la persona escribió (ver la sección 9).
for (const [e, s] of [['spindlelab.cl','spindlelab.cl'], ['https://www.bcn.cl/x','www.bcn.cl'], ['WWW.Spindlelab.cl','www.spindlelab.cl'], ['tienda-2024.cl','tienda-2024.cl']])
  eq(`acepta ${e}`, nuevo.normalizarDominio(e).dominio, s);
// Y dejar el www no abre nada que antes estuviera cerrado.
for (const d of ['www.localhost', 'www.127.0.0.1', 'www.127.0.0.1.nip.io', 'www.metadata.google.internal'])
  eq(`rechaza ${d}`, !!nuevo.normalizarDominio(d).error, true);

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
  eq('y lo informa como bucle', r.codigo, 508);
  eq('sin presentarlo como respuesta del sitio', r.codigoDelSitio, false);
  // Volver a una dirección ya pedida es un bucle seguro: se corta ahí, sin gastar los nueve
  // saltos. Antes eran 9 peticiones por lectura, 63 en total, más que las 50 subpeticiones de
  // Cloudflare en el plan gratis.
  // Y desde el 23-sep (R5) la portada se lee sola y primero: si no abre, las otras seis
  // lecturas ni salen, así que la portada se pide UNA vez y las tres sondas, ninguna.
  eq('la portada se pidió una sola vez, y las sondas ni salieron', f.vistas.filter(u => u === 'https://ejemplo.cl/').length, 1);
  eq('tampoco se pidió el robots.txt de un host que no abre', f.vistas.includes('https://ejemplo.cl/robots.txt'), false);
}
{
  // Un bucle que nunca repite dirección igual se corta en MAX_SALTOS.
  let n = 0;
  const f = async (url) => {
    if (!url.startsWith('https://ejemplo.cl/')) throw new Error('sin ruta: ' + url);
    n++;
    return { status: 302, url, headers: { get: (k) => k.toLowerCase() === 'location' ? 'https://ejemplo.cl/?p=' + n : null }, text: async () => '' };
  };
  const r = await nuevo.chequear('ejemplo.cl', f);
  eq('bucle sin repetir dirección: también 508', r.codigo, 508);
  // Es el caso caro: el corte por dirección repetida no lo atrapa, así que la cadena gasta
  // MAX_SALTOS + 1. Con las siete lecturas juntas eran 63 por host; leyendo la portada sola,
  // son 9, y como acá la otra forma tampoco conecta (el doble lanza), el total queda en 9.
  eq('bucle sin repetir dirección: 9 peticiones, no 63', n, 9);
}
{
  // El presupuesto de subpeticiones de toda la invocación. No se alcanza en ningún caso real
  // (el peor medido son 42), así que se prueba bajándolo a mano no se puede: lo que sí se
  // puede comprobar es que el peor caso real cabe. Un bucle sin repetir dirección en las dos
  // formas del dominio, que es lo más caro que sabemos producir, tiene que quedar bajo 50.
  let n = 0;
  const f = async (url) => {
    n++;
    if (n > 50) throw new Error('Too many subrequests'); // así corta Cloudflare en el plan gratis
    return { status: 302, url, headers: { get: (k) => k.toLowerCase() === 'location' ? url.split('?')[0] + '?p=' + n : null }, text: async () => '' };
  };
  const r = await nuevo.chequear('ejemplo.cl', f);
  eq('bucle en las dos formas: no llega a las 50 subpeticiones', n <= 50, true);
  eq('bucle en las dos formas: 18 peticiones (9 + 9)', n, 18);
  eq('bucle en las dos formas: veredicto de bucle, no "ni con www ni sin www"', r.codigo, 508);
  eq('bucle en las dos formas: no dice que el sitio esté caído', /ni con www/.test(r.error), false);
}
{
  // El caso que hacía falso el mensaje: bucle en la forma escrita y www sano. Antes la lectura
  // de www moría en el tope de 50 y se informaba "ni con www ni sin www" sin haberlo pedido.
  const enWww = {
    'https://www.ejemplo.cl/': { status: 200, body: PORTADA },
    'https://www.ejemplo.cl/robots.txt': { status: 200, body: ROBOTS },
    'https://www.ejemplo.cl/llms.txt': { status: 404, body: '' },
    'https://www.ejemplo.cl/sitemap.xml': { status: 200, body: SITEMAP },
  };
  const sano = fake(enWww);
  let n = 0;
  const f = async (url, opts) => {
    n++;
    if (n > 50) throw new Error('Too many subrequests');
    if (url.startsWith('https://www.')) return sano(url, opts);
    return { status: 302, url, headers: { get: (k) => k.toLowerCase() === 'location' ? url.split('?')[0] + '?p=' + n : null }, text: async () => '' };
  };
  const r = await nuevo.chequear('ejemplo.cl', f);
  eq('bucle sin www con www sano: hay informe', r.ok, true);
  eq('bucle sin www con www sano: del host que contesta', r.dominio, 'www.ejemplo.cl');
  eq('bucle sin www con www sano: 16 peticiones (9 + 1 + 6)', n, 16);
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
  eq('el ítem detecta la expulsión: es pendiente', item.estado, 'pendiente');
  eq('y nombra los 403', /403/.test(item.detalle), true);
}
{
  // Una sonda que no contestó no prueba nada, ni a favor ni en contra. Antes bastaba con que
  // NADIE hubiera recibido un 4xx para salir en verde, y eso incluía el caso en que las tres
  // sondas se caían: 8 puntos por una prueba que no llegamos a hacer, y con el detalle
  // escondido, porque la página solo muestra el detalle de lo que no cumple.
  const rutas = rutasNormales();
  const conSondasCaidas = (cuantas) => {
    let n = 0;
    return async (url, opts) => {
      const esSonda = url === 'https://ejemplo.cl/' && !/SpindleLabChequeo/.test(opts.headers['User-Agent']);
      if (esSonda && n++ < cuantas) throw new Error('la sonda no contesta');
      const r = rutas[url];
      return { status: r.status, url, headers: { get: (k) => k.toLowerCase() === 'content-length' ? String(new TextEncoder().encode(r.body || '').length) : null }, text: async () => r.body || '' };
    };
  };
  for (const [cuantas, frase] of [[3, /ninguna de las tres/], [1, /no alcanzó a responder/], [2, /no alcanzaron a responder/]]) {
    const r = await nuevo.chequear('ejemplo.cl', conSondasCaidas(cuantas));
    const it = r.items.find((i) => i.id === 'servidor-ua');
    eq(`${cuantas} sonda(s) sin respuesta: no se regala el verde`, it.estado, 'sin-confirmar');
    eq(`${cuantas} sonda(s) sin respuesta: se explica`, frase.test(it.detalle), true);
    eq(`${cuantas} sonda(s) sin respuesta: fuera del denominador`, r.pesoConfirmado, r.pesoTotal - 8);
    eq(`${cuantas} sonda(s) sin respuesta: el arreglo no manda a tocar el CDN`, /hosting o el CDN/.test(it.arreglo || ''), false);
    const rV = await viejo.chequear('ejemplo.cl', conSondasCaidas(cuantas));
    eq(`${cuantas} sonda(s) sin respuesta: la versión vieja regalaba el verde`, rV.items.find((i) => i.id === 'servidor-ua').ok, true);
  }
  // Con las tres respondiendo, nada cambia.
  const r = await nuevo.chequear('ejemplo.cl', conSondasCaidas(0));
  eq('las 3 sondas responden: sigue en verde', r.items.find((i) => i.id === 'servidor-ua').estado, 'ok');
  eq('las 3 sondas responden: nada queda fuera del denominador', r.pesoConfirmado, r.pesoTotal);
}

console.log('=== 6. los errores dejan de ser un código crudo ===');
{
  const f = fake(rutasNormales({ 'https://ejemplo.cl/': { status: 403, body: '' } }));
  const r = await nuevo.chequear('ejemplo.cl', f);
  eq('devuelve el código aparte', r.codigo, 403);
  eq('y este sí es del sitio', r.codigoDelSitio, true);
  eq('un 403 es el sitio contestando: no se prueba con www', f.vistas.some(u => u.includes('www.')), false);
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

  // Cualquier respuesta que NO sea un 200 legible, un 404 o un 410 es un robots.txt que no
  // pudimos leer. Hasta el 23-sep solo contaban el "no respondió" y el 200 cortado: un 403 de
  // firewall dejaba el archivo en vacío, y el vacío se lee más abajo como "no tienes
  // robots.txt, así que nada está bloqueado". Tres verdes y 16 puntos por un archivo que
  // nunca vimos, en el chequeo al que apunta el correo frío.
  const estadoDe = (r, id) => {
    const i = r.items.find((x) => x.id === id);
    return i.estado || (i.ok ? 'ok' : 'pendiente');
  };
  const TRES = ['bots-indices', 'bots-asistentes', 'bots-entrenamiento'];
  const PESO_ROBOTS = 7 + 7 + 2;
  for (const [st, frase] of [
    [403, /no tenemos permiso/],
    [401, /no tenemos permiso/],
    [429, /bajar el ritmo/],
    [500, /error de tu propio servidor/],
    [503, /error de tu propio servidor/],
  ]) {
    const r = await nuevo.chequear('ejemplo.cl', fake(conRobots('', null, st)));
    for (const id of TRES) eq(`robots ${st}: ${id} queda sin confirmar`, estadoDe(r, id), 'sin-confirmar');
    const det = r.items.find((i) => i.id === 'bots-indices').detalle;
    eq(`robots ${st}: no se afirma que el archivo no exista`, /No tienes robots\.txt/.test(det), false);
    eq(`robots ${st}: dice por qué no lo leímos`, frase.test(det), true);
    // Ni suma ni resta: los tres salen del denominador, como hace Verifica y Cumple.
    eq(`robots ${st}: fuera del denominador`, r.pesoConfirmado, r.pesoTotal - PESO_ROBOTS);
    const confirmados = r.items.filter((i) => i.estado !== 'sin-confirmar');
    const obtenido = confirmados.reduce((a, i) => a + (i.estado === 'ok' ? i.peso : 0), 0);
    eq(`robots ${st}: el puntaje se calcula sobre lo confirmado`, r.puntaje, Math.round((obtenido / r.pesoConfirmado) * 100));
    // Y no aparece como algo que corregir: no sabemos si hay algo que corregir.
    eq(`robots ${st}: no entra en las prioridades`, r.prioridades.some((p) => /robots de entrenamiento|índices de búsqueda|asistentes de IA/i.test(p.titulo)), false);
    const rV = await viejo.chequear('ejemplo.cl', fake(conRobots('', null, st)));
    eq(`robots ${st}: la versión vieja regalaba el verde`, verde(rV, 'bots-indices'), true);
  }

  // El 508 no lo responde ningún servidor: lo ponemos nosotros al cortar un bucle de
  // redirecciones. Cae en la misma bolsa, y por el mismo motivo: no leímos el archivo.
  {
    const enBucle = fake(rutasNormales({
      'https://ejemplo.cl/robots.txt': { status: 301, location: 'https://ejemplo.cl/robots.txt' },
    }));
    const r = await nuevo.chequear('ejemplo.cl', enBucle);
    for (const id of TRES) eq(`robots en bucle (508): ${id} queda sin confirmar`, estadoDe(r, id), 'sin-confirmar');
    eq('robots en bucle: lo dice con sus palabras', /de una dirección a otra/.test(r.items.find((i) => i.id === 'bots-indices').detalle), true);
    eq('robots en bucle: fuera del denominador', r.pesoConfirmado, r.pesoTotal - PESO_ROBOTS);
  }

  // Los dos casos en que el sitio SÍ nos dijo que el archivo no está: ahí el verde es honesto.
  for (const st of [404, 410]) {
    const r = await nuevo.chequear('ejemplo.cl', fake(conRobots('', null, st)));
    for (const id of TRES) eq(`robots ${st}: ${id} sí puede salir en verde`, estadoDe(r, id), 'ok');
    eq(`robots ${st}: nada queda fuera del denominador`, r.pesoConfirmado, r.pesoTotal);
    eq(`robots ${st}: sin señales sin confirmar`, r.sinConfirmar, 0);
  }

  // Un 200 con el archivo vacío también lo leímos: existe y no bloquea a nadie. Decir "no
  // tienes robots.txt" ahí sería afirmar algo que acabamos de ver que no es así.
  {
    const r = await nuevo.chequear('ejemplo.cl', fake(conRobots('', null, 200)));
    eq('robots vacío: sale en verde', estadoDe(r, 'bots-indices'), 'ok');
    eq('robots vacío: no se dice que no exista', /No tienes robots\.txt/.test(r.items.find((i) => i.id === 'bots-indices').detalle), false);
    eq('robots vacío: se dice que está vacío', /está vacío/.test(r.items.find((i) => i.id === 'bots-indices').detalle), true);
  }

  // Un bloqueo que SÍ leímos se informa igual, aunque el archivo venga cortado: lo que no se
  // puede es lo contrario (afirmar que está libre sin haberlo leído entero).
  {
    const r = await nuevo.chequear('ejemplo.cl', fake(conRobots(ROBOTS_BLOQUEA, 5000)));
    eq('lectura corta con bloqueo: es pendiente, no sin-confirmar', estadoDe(r, 'bots-indices'), 'pendiente');
    eq('lectura corta con bloqueo: sí entra en el denominador', r.pesoConfirmado, r.pesoTotal);
  }
}


console.log('=== 9. www: se revisa lo escrito, y si no abre, la otra forma ===');
{
  // Rutas del mismo sitio, pero servido en www. El robots.txt de www bloquea a OAI-SearchBot
  // para probar que las siete lecturas se rehacen en el host que sí contesta.
  const ROBOTS_WWW = "User-agent: OAI-SearchBot\nDisallow: /\n";
  const enWww = (extra = {}) => ({
    'https://www.ejemplo.cl/': { status: 200, body: PORTADA },
    'https://www.ejemplo.cl/robots.txt': { status: 200, body: ROBOTS_WWW },
    'https://www.ejemplo.cl/llms.txt': { status: 404, body: '' },
    'https://www.ejemplo.cl/sitemap.xml': { status: 200, body: SITEMAP },
    ...extra,
  });
  const sinWww = (status, extra = {}) => ({
    'https://ejemplo.cl/': { status, body: '' },
    'https://ejemplo.cl/robots.txt': { status, body: '' },
    'https://ejemplo.cl/llms.txt': { status, body: '' },
    'https://ejemplo.cl/sitemap.xml': { status, body: '' },
    ...extra,
  });

  // a) sin www no conecta (el doble lanza por cualquier ruta que no tenga): se revisa www.
  {
    const f = fake(enWww());
    const r = await nuevo.chequear('ejemplo.cl', f);
    eq('sin www no conecta: hay informe', r.ok, true);
    eq('del host que sí contesta', r.dominio, 'www.ejemplo.cl');
    eq('y lo explica', /^Revisamos www\.ejemplo\.cl porque ejemplo\.cl no respondió\..*sin www\.$/.test(r.aviso || ''), true);
    eq('el robots.txt se leyó en www', f.vistas.includes('https://www.ejemplo.cl/robots.txt'), true);
    eq('y es el que manda (bloquea a OAI-SearchBot)', /bloquea a OAI-SearchBot/.test(r.items?.find(i => i.id === 'bots-indices')?.detalle || ''), true);
    eq('primero se intentó lo escrito', f.vistas[0], 'https://ejemplo.cl/');
  }
  // b) sin www da 530 (así contesta Cloudflare cuando el nombre no tiene DNS): se revisa www.
  {
    const r = await nuevo.chequear('ejemplo.cl', fake({ ...sinWww(530), ...enWww() }));
    eq('530 sin www: informe de www', r.dominio, 'www.ejemplo.cl');
    eq('el aviso no culpa al sitio de un código', /no apunta a ningún sitio publicado/.test(r.aviso || ''), true);
  }
  // c) sin www, certificado roto (526): se revisa www.
  for (const st of [525, 526]) {
    const r = await nuevo.chequear('ejemplo.cl', fake({ ...sinWww(st), ...enWww() }));
    eq(`${st} sin www: informe de www`, r.dominio, 'www.ejemplo.cl');
    eq(`${st}: el aviso habla del certificado`, /certificado de seguridad que no sirve/.test(r.aviso || ''), true);
  }
  // d) sin www se redirige a sí mismo (centroodontologicomaipu.cl): se revisa www, y el bucle
  //    no se come las peticiones.
  {
    const bucle = {};
    for (const p of ['', 'robots.txt', 'llms.txt', 'sitemap.xml']) bucle['https://ejemplo.cl/' + p] = { status: 301, location: 'https://ejemplo.cl/' + p };
    const f = fake({ ...bucle, ...enWww() });
    const r = await nuevo.chequear('ejemplo.cl', f);
    eq('bucle sin www: informe de www', r.dominio, 'www.ejemplo.cl');
    eq('aviso del bucle', /nos mandó de una dirección a otra/.test(r.aviso || ''), true);
    // Desde R5 el host del bucle cuesta una sola petición: la portada. Las otras seis salen
    // recién en el host que contesta, así que el total baja de 14 a 8.
    eq('una sola petición en el host del bucle', f.vistas.filter(u => u.startsWith('https://ejemplo.cl/')).length, 1);
    eq('en total, lejos de las 50 subpeticiones', f.vistas.length, 8);
  }
  // e) escrito con www: se empieza ahí y, si contesta, el host sin www ni se toca.
  {
    const f = fake(enWww());
    const r = await nuevo.chequear('www.ejemplo.cl', f);
    eq('con www: informe de www', r.dominio, 'www.ejemplo.cl');
    eq('sin aviso', r.aviso, undefined);
    eq('nunca se pidió el host sin www', f.vistas.some(u => u.startsWith('https://ejemplo.cl/')), false);
    eq('siete peticiones, como siempre', f.vistas.length, 7);
  }
  // f) escrito con www y www no conecta: se revisa sin www. Antes esto funcionaba porque el www
  //    se borraba siempre; dejar de borrarlo no puede dejar afuera a los sitios sin www.
  {
    const r = await nuevo.chequear('www.ejemplo.cl', fake(rutasNormales()));
    eq('www no conecta: informe sin www', r.dominio, 'ejemplo.cl');
    eq('y el aviso lo dice al revés', /^Revisamos ejemplo\.cl porque www\.ejemplo\.cl no respondió\..*con www\.$/.test(r.aviso || ''), true);
  }
  // g) el camino normal no cambia: el host escrito contesta y www ni se pide.
  {
    const f = fake(rutasNormales());
    const r = await nuevo.chequear('ejemplo.cl', f);
    eq('normal: sin aviso', r.aviso, undefined);
    eq('normal: siete peticiones', f.vistas.length, 7);
    eq('normal: nada a www', f.vistas.some(u => u.includes('www.')), false);
  }
  // h) un 404 o un 503 es el sitio contestando: no se busca otra dirección.
  for (const st of [404, 503]) {
    const f = fake({ ...sinWww(st), ...enWww() });
    const r = await nuevo.chequear('ejemplo.cl', f);
    eq(`${st}: sin informe`, r.ok, false);
    eq(`${st}: no se probó www`, f.vistas.some(u => u.includes('www.')), false);
    eq(`${st}: el código sí es del sitio`, r.codigoDelSitio, true);
  }
  // i) las dos formas fallan: se informa lo del host escrito, no lo de www.
  {
    const bucle = { 'https://ejemplo.cl/': { status: 302, location: 'https://ejemplo.cl/' } };
    const r = await nuevo.chequear('ejemplo.cl', fake(bucle));
    eq('bucle sin www y www caído: 508 del escrito', r.codigo, 508);
    eq('508: no es del sitio', r.codigoDelSitio, false);
    eq('508: mensaje del bucle', /bucle de redirecciones/.test(r.error), true);
    const r2 = await nuevo.chequear('ejemplo.cl', fake({ ...sinWww(530), 'https://www.ejemplo.cl/': { status: 530 } }));
    eq('530 en los dos: 530', r2.codigo, 530);
    eq('530: no es del sitio', r2.codigoDelSitio, false);
    eq('530: mensaje sin el número', /530/.test(r2.error), false);
    // 23-sep (LC-14): antes decía "Revisa el dominio" también a quien lo escribió bien y cuyo
    // sitio solo se colgó. Ahora dice que probamos las dos formas y no culpa a lo escrito.
    const r3 = await nuevo.chequear('ejemplo.cl', fake({}));
    eq('ninguno conecta: dice que probamos las dos formas', r3.error, 'No pudimos abrir tu sitio, ni con www ni sin www. Si el dominio está bien escrito, puede que esté caído o lento en este momento: vuelve a intentarlo en un rato.');
    eq('ninguno conecta: ya no pide revisar el dominio', /Revisa el dominio/.test(r3.error), false);
    eq('ninguno conecta: sin código', r3.codigo, undefined);
  }
  // j) el intento con www pasa por el mismo portón: una redirección de www a la IP de
  //    metadatos nunca se pide.
  {
    const f = fake({ 'https://www.ejemplo.cl/': { status: 302, location: 'http://169.254.169.254/latest/meta-data/' } });
    const r = await nuevo.chequear('ejemplo.cl', f);
    eq('www a metadata: sin informe', r.ok, false);
    eq('y nunca se pidió', f.vistas.some(u => u.includes('169.254')), false);
    eq('www a metadata: se informa lo del host escrito', r.error, 'No pudimos abrir tu sitio, ni con www ni sin www. Si el dominio está bien escrito, puede que esté caído o lento en este momento: vuelve a intentarlo en un rato.');
  }
  // j2) si es el host escrito el que redirige a un destino prohibido, el sitio SÍ contestó: no
  //     se prueba www (la misma regla de Verifica y Cumple), aunque www tenga un sitio sano. Y el
  //     destino prohibido, por supuesto, nunca se pide.
  for (const destino of ['http://169.254.169.254/latest/meta-data/', 'http://localhost/', 'https://127.0.0.1.nip.io/']) {
    const f = fake({ ...rutasNormales(), 'https://ejemplo.cl/': { status: 302, location: destino }, ...enWww() });
    const r = await nuevo.chequear('ejemplo.cl', f);
    eq(`portón rechaza ${destino}: sin informe`, r.ok, false);
    eq(`portón rechaza ${destino}: no se probó www`, f.vistas.some(u => u.includes('www.')), false);
    eq(`portón rechaza ${destino}: nunca se pidió`, f.vistas.includes(destino), false);
    // Y el mensaje no dice "ni con www ni sin www", porque www nunca se probó: dice lo que pasó.
    eq(`portón rechaza ${destino}: el mensaje habla de la redirección`, /nos mandó a una dirección que este chequeo no puede seguir/.test(r.error), true);
  }
  // k) la otra forma pasa por el mismo validador que lo escrito.
  {
    const f = fake({});
    await nuevo.chequear('www.cl', f);
    eq('"www.cl" no se convierte en "cl"', f.vistas.some(u => u.startsWith('https://cl/')), false);
    const largo = 'a'.repeat(247) + '.cl'; // 250 caracteres: con "www." pasaría de 253
    const f2 = fake({});
    const r2 = await nuevo.chequear(largo, f2);
    eq('un nombre al límite no crece con www', f2.vistas.some(u => u.includes('www.')), false);
    // Si la otra forma no se pudo probar, el mensaje no puede decir que la probamos.
    eq('sin otra forma: no dice "ni con www ni sin www"', /ni con www/.test(r2.error), false);
    eq('sin otra forma: tampoco culpa a lo escrito', r2.error, 'No pudimos abrir tu sitio. Si el dominio está bien escrito, puede que esté caído o lento en este momento: vuelve a intentarlo en un rato.');
  }
  // l) lo que lee la persona: sin raya larga (regla de marca) y en tuteo, nunca voseo.
  {
    const avisos = [];
    for (const rutas of [enWww(), { ...sinWww(530), ...enWww() }, { ...sinWww(526), ...enWww() }]) {
      avisos.push((await nuevo.chequear('ejemplo.cl', fake(rutas))).aviso);
    }
    avisos.push((await nuevo.chequear('www.ejemplo.cl', fake(rutasNormales()))).aviso);
    for (const st of [401, 403, 404, 429, 500, 503, 508, 525, 526, 530, 418]) avisos.push(nuevo.mensajeDeFallo(st));
    // Los fallos sin portada y el de la página de bloqueo (sección 12) también los lee alguien.
    avisos.push((await nuevo.chequear('ejemplo.cl', fake({}))).error);
    avisos.push((await nuevo.chequear('a'.repeat(247) + '.cl', fake({}))).error);
    avisos.push((await nuevo.chequear('ejemplo.cl', fake({ ...rutasNormales(), 'https://ejemplo.cl/': { status: 302, location: 'http://localhost/' } }))).error);
    avisos.push((await nuevo.chequear('ejemplo.cl', fake(rutasNormales({ 'https://ejemplo.cl/': { status: 200, body: '<p>Access denied</p>' } })))).error);
    eq('todos los textos existen', avisos.every(Boolean), true);
    eq('ninguno lleva raya larga', avisos.filter(a => /—/.test(a)), []);
    eq('ninguno en voseo', avisos.filter(a => /\b(revisá|escribí|intentá|tenés|podés|querés)\b/i.test(a)), []);
  }
}

console.log('=== 10. la peor espera: dos relojes, no más ===');
{
  // Un fetch que no contesta nunca hasta que el reloj aborta: 8 s el host escrito, 8 s el otro.
  // Si alguien suma otro intento (http://, por ejemplo), esto sube a 24 s y falla.
  const colgado = (u, o) => new Promise((_, rej) => o.signal.addEventListener('abort', () => rej(new Error('abortado')), { once: true }));
  const pedidas = [];
  const t0 = Date.now();
  const r = await nuevo.chequear('ejemplo.cl', (u, o) => { pedidas.push(u); return colgado(u, o); });
  const s = (Date.now() - t0) / 1000;
  console.log(`  ninguna forma conecta: ${s.toFixed(1)} s`);
  eq('sin informe', r.ok, false);
  eq('se intentó www', pedidas.includes('https://www.ejemplo.cl/'), true);
  eq('no pasa de ~16 s', s < 17, true);
}
{
  // El caso de clinicasantamaria.cl: sin www se cuelga, www contesta al tiro. Cuesta un reloj
  // (8 s) más lo que tarde www, no dos.
  const colgado = (u, o) => new Promise((_, rej) => o.signal.addEventListener('abort', () => rej(new Error('abortado')), { once: true }));
  const rapido = fake({
    'https://www.ejemplo.cl/': { status: 200, body: PORTADA },
    'https://www.ejemplo.cl/robots.txt': { status: 200, body: ROBOTS },
    'https://www.ejemplo.cl/llms.txt': { status: 404, body: '' },
    'https://www.ejemplo.cl/sitemap.xml': { status: 200, body: SITEMAP },
  });
  const t0 = Date.now();
  const r = await nuevo.chequear('ejemplo.cl', (u, o) => u.startsWith('https://www.') ? rapido(u, o) : colgado(u, o));
  const s = (Date.now() - t0) / 1000;
  console.log(`  sin www se cuelga, www contesta: ${s.toFixed(1)} s`);
  eq('sin www colgado: informe de www', r.dominio, 'www.ejemplo.cl');
  eq('sin www colgado: un reloj, no dos', s < 9, true);
}

console.log('=== 11. ninguna respuesta de la API se guarda en caché ===');
{
  const f0 = globalThis.fetch;
  const pedir = async (dominio) => nuevo.onRequestGet({ request: new Request('https://spindlelab.cl/api/chequeo?dominio=' + encodeURIComponent(dominio)) });
  try {
    const r1 = await pedir('');
    eq('entrada vacía: 400', r1.status, 400);
    eq('entrada vacía: no-store', r1.headers.get('cache-control'), 'no-store');

    globalThis.fetch = fake(rutasNormales());
    const r2 = await pedir('ejemplo.cl');
    eq('informe: 200', r2.status, 200);
    eq('informe: no-store', r2.headers.get('cache-control'), 'no-store');

    // El caso que motivó el cambio: un error que se reintenta tiene que volver a correr.
    globalThis.fetch = fake({});
    const r3 = await pedir('ejemplo.cl');
    eq('no pudimos abrir: 400', r3.status, 400);
    eq('no pudimos abrir: no-store', r3.headers.get('cache-control'), 'no-store');

    // Sin fetch global, chequear() revienta y cae al 500.
    delete globalThis.fetch;
    const r4 = await pedir('ejemplo.cl');
    eq('error interno: 500', r4.status, 500);
    eq('error interno: no-store', r4.headers.get('cache-control'), 'no-store');
  } finally {
    globalThis.fetch = f0;
  }
}

console.log('=== 12. un 200 que es una página de bloqueo no se puntúa ===');
{
  // Lo que www.bancoestado.cl le contestó a nuestro lector el 23-sep-2026: un 200 de 650 bytes,
  // sin <html>, <head> ni <title>. Copiado byte a byte; el chequeo lo puntuaba con 60/100 en
  // Verifica y Cumple, y acá con lo que salga, como si fuera la portada.
  const BANCOESTADO = `<h2><span style="color: #ff0000;"><strong>Advertencia:</strong></span></h2>
<p style="text-align: justify;">Nuestros sistemas de seguridad han identificado que el navegador o la conexi&oacute;n utilizada no cumple con nuestra pol&iacute;tica de seguridad, por lo cual se ha restringido este acceso.</p>
<p>Para continuar sugerimos: eliminar temporales de internet, cambiar de navegador (browser) o de conexi&oacute;n a internet (ISP).</p>
<div><a href="http://www.bancoestado.cl"> <img src="http://www.bancoestado.cl/imagenes/comun2015/404/img/logo-banco-estado.jpg" alt="BancoEstado" /></a></div>
<div>Reference: 0.eaba1402.1790172624.94c5f555</div>`;
  eq('la copia pesa lo mismo que la real (650 bytes)', new TextEncoder().encode(BANCOESTADO).length, 650);
  const conPortada = (body) => rutasNormales({ 'https://ejemplo.cl/': { status: 200, body } });

  const rV = await viejo.chequear('ejemplo.cl', fake(conPortada(BANCOESTADO)));
  eq('ANTES: la página de bloqueo recibía puntaje', rV.ok, true);
  console.log(`  ANTES -> ${rV.puntaje}/100 sobre el aviso de bloqueo`);

  const r = await nuevo.chequear('ejemplo.cl', fake(conPortada(BANCOESTADO)));
  eq('bancoestado: sin informe', r.ok, false);
  eq('bancoestado: dice que no deja entrar a lectores automáticos', /no deja entrar a lectores automáticos/.test(r.error), true);
  eq('bancoestado: no culpa a lo escrito', /Revisa el dominio/.test(r.error), false);
  eq('bancoestado: sin código (el 200 no dice nada útil)', r.codigo, undefined);
  eq('bancoestado: detector directo', nuevo.esPaginaDeBloqueo(BANCOESTADO), true);

  // Otros avisos de firewall que llegan con 200.
  const OTROS = {
    'F5 "Request Rejected"': "<html><head><title>Request Rejected</title></head><body>The requested URL was rejected. Please consult with your administrator.<br><br>Your support ID is: 1234567890<br><br><a href='javascript:history.back();'>[Go Back]</a></body></html>",
    'Incapsula': '<html style="height:100%"><head><META NAME="ROBOTS" CONTENT="NOINDEX, NOFOLLOW"></head><body style="margin:0px;height:100%"><iframe id="main-iframe" src="/_Incapsula_Resource?CWUDNSAI=1" frameborder=0 width="100%" height="100%">Request unsuccessful. Incapsula incident ID: 123-456</iframe></body></html>',
    'Akamai "Access Denied"': '<HTML><HEAD>\n<TITLE>Access Denied</TITLE>\n</HEAD><BODY>\n<H1>Access Denied</H1>\nYou don\'t have permission to access this server.<P>\nReference&#32;&#35;18&#46;1</BODY>\n</HTML>',
    'en español, con tilde de verdad': '<!doctype html><html><head><title>Aviso</title></head><body><h1>Acceso denegado</h1><p>Tu solicitud ha sido bloqueada por razones de seguridad.</p></body></html>',
    // El desafío de navegador, que es el caso que tienta a poner "captcha" suelto en la regla.
    // No hace falta: el aviso real trae la frase entera, y la frase entera no aparece en el pie
    // de un formulario. Esta es la otra mitad del par con la landing de más abajo (R3).
    'desafío de navegador, sin la palabra captcha': '<!doctype html><html><head><title>Un momento</title></head><body><h1>ejemplo.cl</h1><p>Verifica que eres humano completando la acción de abajo.</p><p>Este proceso es automático. Tu navegador te llevará a la página en unos segundos.</p><div id="desafio"></div></body></html>',
    // Cloudflare. Lo reconocen las frases que se trajeron del gemelo de Verifica y Cumple el
    // 23-sep, cuando se alinearon las dos listas.
    'Cloudflare "Attention Required"': '<!doctype html><html><head><title>Attention Required</title></head><body><h1>Sorry, you have been blocked</h1><p>This website is using a security service to protect itself from online attacks.</p></body></html>',
    // Los tres que el gemelo de Verifica y Cumple no reconocía el 23-sep (V2-3). La lista de
    // frases es la misma en los dos archivos, así que los dos los reconocen o ninguno.
    'Distil/Imperva "Pardon Our Interruption"': '<!doctype html><html><head><title>Pardon Our Interruption</title></head><body><h1>Pardon Our Interruption</h1><p>As you were browsing something about your browser made us think you were a bot.</p></body></html>',
    'F5, el rechazo en el cuerpo': '<html><head><title>Aviso</title></head><body><p>The requested URL was rejected. Please consult with your administrator.</p><p>Your support ID is 7712.</p></body></html>',
    'Cloudflare, el interstitial de JavaScript': '<!doctype html><html><head><title>Un momento</title></head><body><h1>ejemplo.cl</h1><p>Enable JavaScript and cookies to continue</p></body></html>',
    'Cloudflare, "checking if the site connection is secure"': '<!doctype html><html><head><title>Un momento</title></head><body><p>ejemplo.cl needs to review the security of your connection before proceeding.</p><p>Checking if the site connection is secure</p></body></html>',
  };
  for (const [n, html] of Object.entries(OTROS)) {
    const x = await nuevo.chequear('ejemplo.cl', fake(conPortada(html)));
    eq(`${n}: sin informe`, x.ok, false);
    eq(`${n}: el mensaje del bloqueo`, /no deja entrar a lectores automáticos/.test(x.error || ''), true);
  }

  // Lo que NO es una página de bloqueo, aunque sea chica: se puntúa como siempre.
  const NORMALES = {
    'la portada de prueba de siempre': PORTADA,
    'sin <html>, <head> ni <title>': '<h1>Sitio en construcción</h1><p>Pronto abrimos.</p>',
    'dice "acceso restringido", pero tiene su menú': '<!doctype html><html><head><title>Colegio Ejemplo</title></head><body><nav><a href="/">Inicio</a><a href="/nosotros">Nosotros</a><a href="/admision">Admisión</a><a href="/contacto">Contacto</a></nav><p>Intranet: acceso restringido a apoderados.</p></body></html>',
    'contacto "protegido por reCAPTCHA"': '<!doctype html><html><head><title>Contacto</title></head><body><form><input name="n"></form><p>Este sitio está protegido por reCAPTCHA y se aplican la Política de privacidad y los Términos del Servicio de Google.</p><a href="/">Inicio</a></body></html>',
    // R3, el cliente objetivo: una landing de una sola página, con formulario y con el pie de
    // reCAPTCHA que trae exactamente DOS enlaces (la política y las condiciones de Google). Con
    // "captcha" suelto en la regla, este sitio quedaba sin informe y recibía "tu sitio no nos
    // entregó HTML", que además es falso: sí lo entregó. Es el mismo HTML del reproductor de la
    // pasada 2 (pasada2/verif-codigo/repro-vyc.mjs, caso 2).
    'landing de una página con el pie de reCAPTCHA (2 enlaces)': `<!DOCTYPE html><html lang="es"><head><title>Dra. Pérez · Kinesiología</title></head><body>
<h1>Kinesiología a domicilio en Ñuñoa</h1><p>Agenda tu evaluación. Te respondemos el mismo día.</p>
<form action="/enviar" method="post"><label>Nombre <input name="nombre"></label><label>Teléfono <input name="fono"></label>
<label><input type="checkbox" name="ok" checked> Acepto que me contacten</label><button>Enviar</button></form>
<p class="legal">Este sitio está protegido por reCAPTCHA y se aplican la <a href="https://policies.google.com/privacy">Política de privacidad</a> y las <a href="https://policies.google.com/terms">Condiciones del servicio</a> de Google.</p>
</body></html>`,
    'la frase solo dentro de un <script>': '<!doctype html><html><head><title>App</title><script>var e = "Access denied";</script></head><body><div id="root"></div></body></html>',
    'la frase en una portada de más de 16 KB': '<!doctype html><html><head><title>Grande</title></head><body><p>Acceso denegado a la zona de socios.</p>' + '<p>Texto de la portada.</p>'.repeat(800) + '</body></html>',
    'dice "acceso restringido" entre bastante texto, sin menú': '<!doctype html><html><head><title>Club Ejemplo</title></head><body><p>El área de socios tiene acceso restringido.</p>' + '<p>Somos un club deportivo de Ñuñoa con cuarenta años de historia.</p>'.repeat(30) + '</body></html>',
    '"just a moment" de una página de "volvemos pronto"': '<!doctype html><html><head><title>Volvemos pronto</title></head><body><h1>Just a moment</h1><p>Estamos haciendo mantención.</p></body></html>',
    // Los cuatro que el gemelo de Verifica y Cumple SÍ tomaba por bloqueo el 23-sep, con sus
    // raíces sueltas (`restringid`, `verify (that )?you`): negocios chicos de una sola página,
    // que es justo el cliente de este chequeo. Acá no pueden caer, y por eso están escritos
    // como casos y no solo como comentario. Si alguien vuelve a soltar una raíz en la lista de
    // frases, estas cuatro filas se ponen rojas.
    'puerta de edad en español (2 enlaces)': '<!doctype html><html lang="es"><head><title>Viña Ejemplo</title></head><body><h1>Viña Ejemplo</h1><p>Verifica que eres mayor de 18 años para entrar.</p><a href="/si">Sí, soy mayor</a><a href="/no">No</a></body></html>',
    'puerta de edad en inglés': '<!doctype html><html><head><title>Ejemplo Brewing</title></head><body><h1>Ejemplo Brewing</h1><p>Please verify you are of legal drinking age to continue.</p><a href="/enter">Enter</a></body></html>',
    'sala con acceso para socios': '<!doctype html><html lang="es"><head><title>Club Ejemplo</title></head><body><h1>Club Ejemplo</h1><p>El acceso a la sala está restringido a socios.</p><a href="/socios">Hazte socio</a></body></html>',
    'estacionamiento de residentes': '<!doctype html><html lang="es"><head><title>Estacionamiento Ejemplo</title></head><body><h1>Estacionamiento Ejemplo</h1><p>Zona restringida solo para residentes.</p><a href="/">Inicio</a><a href="/contacto">Contacto</a></body></html>',
    'med spa que verifica el correo': '<!doctype html><html><head><title>Ejemplo Med Spa</title></head><body><h1>Ejemplo Med Spa</h1><p>We will verify your email before booking your appointment.</p><a href="/book">Book now</a><a href="/">Home</a></body></html>',
  };
  for (const [n, html] of Object.entries(NORMALES)) {
    const x = await nuevo.chequear('ejemplo.cl', fake(conPortada(html)));
    eq(`normal, ${n}: hay informe`, x.ok, true);
    eq(`normal, ${n}: detector directo`, nuevo.esPaginaDeBloqueo(html), false);
  }

  // Lineal aunque el HTML sea hostil: el detector corre sobre páginas chicas, pero una página
  // chica llena de "<" sin cerrar es justo lo que vuelve cuadrático a un regex de etiquetas.
  for (const [n, html] of [['16.000 "<" sin cerrar', '<'.repeat(16_000)], ['"<script" sin cerrar', '<script'.repeat(2_285)], ['"<a " sin cerrar', '<a '.repeat(5_333)]]) {
    const t0 = process.hrtime.bigint();
    for (let i = 0; i < 50; i++) nuevo.esPaginaDeBloqueo(html);
    const ms = Number(process.hrtime.bigint() - t0) / 1e6 / 50;
    eq(`hostil, ${n}: menos de 2 ms`, ms < 2, true);
  }
}

console.log(`\n${ok} bien, ${malo} mal`);
process.exit(malo ? 1 : 0);
