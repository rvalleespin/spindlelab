/**
 * La cuenta de uso: de dónde llegó la visita y cómo se anota.
 *
 *   node prueba-uso.mjs
 *
 * POR QUÉ EXISTE:
 *
 * El 30-sep-2026 la campaña salió a Instagram y no había forma de contestar "¿entró
 * alguien?". El chequeo rápido no dejaba ningún registro y las métricas de Cloudflare
 * cuentan archivos servidos, no personas. Se agregaron contadores en KV.
 *
 * LO QUE ESTA PRUEBA CUIDA, y no es el conteo:
 *
 * 1. QUE LA MEDICIÓN AGUANTE LA VARA DEL PRODUCTO. Este sitio le dice a la gente que su
 *    sitio no debería rastrear a nadie sin permiso. Si su propia instrumentación guardara
 *    una IP, un dominio consultado o una URL, el producto entero se cae. Acá se comprueba
 *    que las llaves que se escriben NO contienen nada de eso.
 *
 * 2. QUE `utm_source` NO PUEDA FABRICAR LLAVES. Ese parámetro lo escribe quien visita y
 *    termina siendo parte de una llave de KV. Si se aceptara tal cual, cualquiera podría
 *    generar miles de llaves distintas con un bucle. La lista de orígenes es CERRADA y esta
 *    prueba la ataca con basura a propósito: rutas, comillas, saltos de línea, cadenas
 *    largas, unicode. Todo tiene que caer en 'otro'.
 *
 *    ⚠️ Si alguien "mejora" esto dejando pasar el utm tal cual, esta prueba se pone roja.
 *    Esa es toda su razón de ser.
 *
 * 3. QUE NUNCA REVIENTE NI BLOQUEE. Si el KV no está, o `get` falla, o `put` falla, el
 *    visitante no se puede enterar. Una medición que rompe el producto que mide no sirve.
 *
 * Ruta: PROFUNDO_JS, o se busca en el repo (rutas.mjs).
 */
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
import { rutaEnElRepo } from './rutas.mjs';

const RUTA = rutaEnElRepo('verificaycumple/functions/api/profundo.js', 'PROFUNDO_JS');
const { origenDeLaVisita, origenDeLaPagina, ORIGENES_VALIDOS, anotarUso, TTL_USO_S } = await import(RUTA);

let ok = 0, malo = 0;
const eq = (n, r, e) => {
  if (JSON.stringify(r) === JSON.stringify(e)) ok++;
  else { malo++; console.log(`  FALLA ${n}: esperado ${JSON.stringify(e)}, real ${JSON.stringify(r)}`); }
};

// Un `url` de mentira con los parámetros que haga falta.
const conUtm = (v) => new URL('https://verifica.spindlelab.cl/?utm_source=' + encodeURIComponent(v));
const sinUtm = new URL('https://verifica.spindlelab.cl/');

/* ================================================================== *
 * EL CALL SITE, QUE ES DONDE VIVÍA EL BUG                             *
 *                                                                     *
 * Las dos piezas pueden estar perfectas y el endpoint seguir ciego si *
 * no le pasa el parámetro. Eso es literalmente lo que pasó: la        *
 * función existía y el call site le daba el referer de la llamada a   *
 * la API. Diez días de campaña contados como `propio`.                *
 * ================================================================== */
{
  const CHEQUEO = rutaEnElRepo('verificaycumple/functions/api/chequeo.js', 'CHEQUEO_JS');
  const Q = await import(pathToFileURL(CHEQUEO).href);

  const pedir = async (query, referer) => {
    const kv = kvFalso();
    const antes = globalThis.fetch;
    // El sitio de afuera, fingido: una página mínima que el chequeo pueda leer sin red.
    globalThis.fetch = async () => new Response(
      '<!doctype html><html lang="es"><head><title>x</title></head><body><p>hola</p></body></html>',
      { status: 200, headers: { 'Content-Type': 'text/html' } });
    try {
      const headers = new Headers();
      if (referer) headers.set('Referer', referer);
      // Sin `waitUntil`: así el contador se espera y se puede leer al volver.
      await Q.onRequestGet({
        request: new Request(`https://verifica.spindlelab.cl/api/chequeo?${query}`, { headers }),
        env: { VYC_TOPES: kv },
      });
    } finally { globalThis.fetch = antes; }
    return [...kv.datos.keys()].filter((k) => k.startsWith('uso:origen:')).map((k) => k.split(':').pop());
  };

  const hoy = new Date().toISOString().slice(0, 10);
  eq('el endpoint anota el origen que manda la página',
    await pedir('dominio=x.cl&origen=meta', 'https://verifica.spindlelab.cl/'), ['meta']);
  // ⚠️ El caso exacto del bug: la llamada viene de nuestra propia página. Sin el parámetro,
  // el referer la delata como `propio` y la campaña desaparece.
  eq('sin el parámetro vuelve a ser propio, que era el defecto',
    await pedir('dominio=x.cl', 'https://verifica.spindlelab.cl/'), ['propio']);
  eq('un origen inventado no llega a la llave',
    await pedir('dominio=x.cl&origen=loquesea', 'https://verifica.spindlelab.cl/'), ['propio']);
  eq('y la llave lleva la fecha de hoy', hoy.length, 10);
}

/* ================================================================== *
 * EL ORIGEN QUE DECLARA LA PÁGINA                                     *
 *                                                                     *
 * `origenDeLaVisita` mira el referer y la URL de la LLAMADA A LA API, *
 * que la hace nuestra propia página: su referer es siempre el sitio y *
 * su URL no lleva utm. Por eso TODO caía en `propio` y el contador    *
 * por origen no podía ver una campaña pagada.                         *
 * ================================================================== */
{
  const api = new URL('https://verifica.spindlelab.cl/api/chequeo?dominio=x.cl');
  const refPropio = 'https://verifica.spindlelab.cl/';

  // Sin lo declarado, es exactamente el defecto: la llamada de nuestra página es «propio».
  eq('el respaldo sigue siendo lo de antes', origenDeLaVisita(refPropio, api), 'propio');

  // Con lo declarado, manda la página.
  for (const v of ['meta', 'instagram', 'linkedin', 'facebook', 'whatsapp', 'correo',
    'buscador', 'propio', 'directo', 'otro']) {
    eq(`declarado ${v}`, origenDeLaPagina(v, refPropio, api), v);
  }
  eq('se acepta con mayúsculas y espacios', origenDeLaPagina('  META ', refPropio, api), 'meta');

  // ⚠️ Y NADA FUERA DE LA LISTA, porque esto termina siendo una llave de KV y lo escribe
  // quien visita. Sin la lista, un bucle fabricaría miles de llaves.
  for (const malo of ['', null, undefined, 'loquesea', '../../x', 'meta2', 'a b',
    'uso:rapido:2026-11-02', '__proto__', 'constructor']) {
    eq(`${JSON.stringify(malo)} no se cree: cae al respaldo`,
      origenDeLaPagina(malo, refPropio, api), 'propio');
  }

  // El respaldo es el de antes, no un valor fijo: sin referer tiene que dar directo.
  eq('sin nada declarado y sin referer, directo', origenDeLaPagina('', '', api), 'directo');

  // La lista blanca y la lista cerrada declarada en el comentario son la misma.
  const marcaServidor = fs.readFileSync(RUTA.replace('file://', ''), 'utf8')
    .match(/ORIGENES-CERRADOS:([^\n]*)/)[1].trim().split(/\s+/).sort();
  eq('ORIGENES_VALIDOS es la lista declarada', [...ORIGENES_VALIDOS].sort(), marcaServidor);
}

/* ================================================================== *
 * 1. El referer, traducido a una palabra.                             *
 * ================================================================== */
{
  const casos = [
    ['', 'directo'], [null, 'directo'], [undefined, 'directo'],

    ['https://instagram.com/', 'instagram'],
    ['https://www.instagram.com/p/abc/', 'instagram'],
    ['https://l.instagram.com/?u=x', 'instagram'],

    ['https://linkedin.com/feed/', 'linkedin'],
    ['https://www.linkedin.com/company/x', 'linkedin'],
    ['https://lnkd.in/abc', 'linkedin'],

    ['https://facebook.com/x', 'facebook'],
    ['https://m.facebook.com/x', 'facebook'],
    ['https://fb.me/x', 'facebook'],

    ['https://www.google.com/', 'buscador'],
    ['https://google.cl/search?q=x', 'buscador'],
    ['https://www.bing.com/', 'buscador'],
    ['https://duckduckgo.com/', 'buscador'],

    ['https://verifica.spindlelab.cl/', 'propio'],
    ['https://spindlelab.cl/blog/x', 'propio'],

    ['https://ejemplo.cl/', 'otro'],
    ['no soy una url', 'otro'],
    ['javascript:alert(1)', 'otro'],
  ];
  for (const [ref, esperado] of casos) {
    eq(`referer ${JSON.stringify(ref)}`, origenDeLaVisita(ref, sinUtm), esperado);
  }
}

/* ================================================================== *
 * 2. utm_source manda sobre el referer, pero solo si es conocido.     *
 * ================================================================== */
{
  eq('utm conocido gana al referer',
    origenDeLaVisita('https://www.google.com/', conUtm('instagram')), 'instagram');
  eq('utm en mayúsculas se normaliza',
    origenDeLaVisita('', conUtm('INSTAGRAM')), 'instagram');
  eq('utm con espacios alrededor se limpia',
    origenDeLaVisita('', conUtm('  linkedin  ')), 'linkedin');
  eq('sin utm se cae al referer',
    origenDeLaVisita('https://instagram.com/', sinUtm), 'instagram');
}

/* ================================================================== *
 * 3. LA DE SEGURIDAD: basura en utm_source NO puede salir viva.       *
 * ================================================================== */
{
  const BASURA = [
    'a'.repeat(500),
    '../../../etc/passwd',
    'uso:rapido:2026-09-30',          // intento de pisar otra llave
    'tope:global:2026-09-30',          // intento de pisar un TOPE
    '"; DROP TABLE',
    'con espacio y símbolos !@#$%^&*()',
    'salto\nde\nlinea',
    '\u0000nulo',
    '🐴',
    'instagram-falso',
    'INSTAGRAMM',
  ];
  let todosOtro = 0;
  for (const v of BASURA) {
    const r = origenDeLaVisita('', conUtm(v));
    if (r === 'otro') todosOtro++;
    else { malo++; console.log(`  FALLA utm basura ${JSON.stringify(v.slice(0, 40))} devolvió ${JSON.stringify(r)}`); }
  }
  eq('toda la basura de utm_source cae en "otro"', todosOtro, BASURA.length);
}

/* ================================================================== *
 * 4. Qué se escribe en KV. Un KV de mentira que anota todo.           *
 * ================================================================== */
function kvFalso() {
  const datos = new Map();
  const puestas = [];
  return {
    datos, puestas,
    async get(k) { return datos.has(k) ? datos.get(k) : null; },
    async put(k, v, opt) { datos.set(k, v); puestas.push({ k, v, opt }); },
  };
}

{
  const kv = kvFalso();
  const dia = new Date('2026-09-30T15:00:00Z');
  await anotarUso(kv, 'rapido', 'instagram', dia);

  eq('escribe dos llaves: la del chequeo y la del origen',
    kv.puestas.map((p) => p.k).sort(),
    ['uso:origen:2026-09-30:instagram', 'uso:rapido:2026-09-30']);
  eq('las dos parten en 1', kv.puestas.map((p) => p.v), ['1', '1']);
  eq('con el vencimiento de 90 días',
    kv.puestas.every((p) => p.opt && p.opt.expirationTtl === TTL_USO_S), true);
  eq('y 90 días son exactamente eso', TTL_USO_S, 60 * 60 * 24 * 90);
}

{
  const kv = kvFalso();
  const dia = new Date('2026-09-30T15:00:00Z');
  await anotarUso(kv, 'profundo', 'directo', dia);
  await anotarUso(kv, 'profundo', 'directo', dia);
  await anotarUso(kv, 'profundo', 'instagram', dia);
  eq('el contador del día suma', kv.datos.get('uso:profundo:2026-09-30'), '3');
  eq('y cada origen lleva el suyo', kv.datos.get('uso:origen:2026-09-30:directo'), '2');
  eq('sin mezclarse con el otro', kv.datos.get('uso:origen:2026-09-30:instagram'), '1');
}

{
  const kv = kvFalso();
  await anotarUso(kv, 'rapido', 'instagram', new Date('2026-09-30T23:59:59Z'));
  await anotarUso(kv, 'rapido', 'instagram', new Date('2026-10-01T00:00:01Z'));
  eq('el día cambia con la fecha UTC, no se acumula',
    [kv.datos.get('uso:rapido:2026-09-30'), kv.datos.get('uso:rapido:2026-10-01')], ['1', '1']);
}

/* ================================================================== *
 * 5. LA INVARIANTE DEL PRODUCTO: en las llaves no hay nada de nadie.  *
 * ================================================================== */
{
  const kv = kvFalso();
  const dia = new Date('2026-09-30T15:00:00Z');
  // Se golpea con todo lo que un visitante podría controlar.
  for (const v of ['instagram', 'a'.repeat(200), '../../x', 'uso:rapido:2026-01-01', '🐴']) {
    await anotarUso(kv, 'rapido', origenDeLaVisita('https://ejemplo.cl/pagina-secreta?q=juan@correo.cl', conUtm(v)), dia);
  }
  await anotarUso(kv, 'profundo', origenDeLaVisita('https://instagram.com/', sinUtm), dia);

  const FORMA = /^uso:(rapido|profundo):\d{4}-\d{2}-\d{2}$|^uso:origen:\d{4}-\d{2}-\d{2}:(instagram|linkedin|facebook|whatsapp|correo|buscador|propio|directo|otro)$/;
  const llaves = [...kv.datos.keys()];
  const malas = llaves.filter((k) => !FORMA.test(k));
  eq('ninguna llave se sale de la forma permitida', malas, []);

  const texto = llaves.join(' ');
  eq('ninguna llave lleva el dominio del referer', texto.includes('ejemplo.cl'), false);
  eq('ninguna llave lleva la ruta visitada', texto.includes('pagina-secreta'), false);
  eq('ninguna llave lleva un correo', texto.includes('juan@correo.cl'), false);
  eq('ninguna llave lleva el utm crudo', texto.includes('aaaa'), false);
  eq('y son pocas y acotadas', llaves.length <= 6, true);
}

/* ================================================================== *
 * 6. Nunca revienta ni bloquea al visitante.                          *
 * ================================================================== */
{
  let reventó = false;
  try { await anotarUso(null, 'rapido', 'instagram'); } catch { reventó = true; }
  eq('sin KV no hace nada y no revienta', reventó, false);

  const kvRoto = {
    async get() { throw new Error('KV caído'); },
    async put() { throw new Error('KV caído'); },
  };
  reventó = false;
  try { await anotarUso(kvRoto, 'rapido', 'instagram'); } catch { reventó = true; }
  eq('con el KV caído tampoco revienta', reventó, false);

  const kvPutRoto = {
    async get() { return '5'; },
    async put() { throw new Error('sin cuota de escritura'); },
  };
  reventó = false;
  try { await anotarUso(kvPutRoto, 'profundo', 'directo'); } catch { reventó = true; }
  eq('si solo falla la escritura, tampoco', reventó, false);

  reventó = false;
  try { origenDeLaVisita(undefined, undefined); } catch { reventó = true; }
  eq('origenDeLaVisita sin url no revienta', reventó, false);
  eq('y contesta directo', origenDeLaVisita(undefined, undefined), 'directo');
}

/* ================================================================== *
 * 7. La copia del cliente NO puede separarse de la del servidor.      *
 *                                                                     *
 * El formulario necesita el origen del lado del cliente y no puede    *
 * preguntarle al servidor, así que la lista está repetida en          *
 * `index.html`. Dos copias de una regla es exactamente cómo empieza   *
 * un desvío silencioso: alguien arregla una y la otra queda mintiendo.*
 *                                                                     *
 * Esto no compara las listas: compara el COMPORTAMIENTO. Los mismos   *
 * casos pasan por las dos implementaciones y tienen que coincidir.    *
 * ================================================================== */
{
  const INDEX = rutaEnElRepo('verificaycumple/public/index.html', 'VYC_INDEX_HTML');
  const html = fs.readFileSync(INDEX, 'utf8');

  eq('el formulario tiene el campo oculto del origen',
    /name="Llego de"/.test(html), true);
  eq('y el nombre del campo va sin tildes, que Web3Forms rompe',
    /name="Lleg[oó] de"/.test(html) && !/name="Llegó de"/.test(html), true);

  // Las dos marcas, una en cada archivo.
  const marca = (txt) => {
    const m = txt.match(/ORIGENES-CERRADOS:([^\n]*)/);
    return m ? m[1].trim().split(/\s+/).sort() : null;
  };
  const listaCliente = marca(html);
  const listaServidor = marca(fs.readFileSync(RUTA.replace('file://', ''), 'utf8'));
  eq('la página declara su lista cerrada', Array.isArray(listaCliente) && listaCliente.length > 0, true);
  eq('el servidor declara la suya', Array.isArray(listaServidor) && listaServidor.length > 0, true);
  eq('y las dos listas son la misma', listaCliente, listaServidor);

  /* ── EL ORIGEN TIENE QUE VIAJAR A LA API (2-nov-2026) ──────────────────────────────
   *
   * El contador por origen era ciego: `origenDeLaVisita` recibía el referer y la URL de la
   * LLAMADA A LA API, que la hace esta misma página con `fetch`. Su referer es siempre
   * verifica.spindlelab.cl y su URL no lleva ningún utm, así que TODO caía en `propio`.
   * Comprobado en el KV de producción: desde el 23-oct no existe una llave que no sea
   * `propio`, con una campaña pagada corriendo.
   *
   * El arreglo es que la página mande su propio origen. Esto lo comprueba EJECUTANDO la
   * función de la página, no grepeándola: un grep ve el nombre y no el ámbito ni el valor,
   * y acá el modo de falla es silencioso —el parámetro sale vacío y todo vuelve a contarse
   * como `propio`, que se ve igual que el bug original—.
   */
  {
    const sacar = (nombre) => {
      const ini = html.indexOf(`function ${nombre}(`);
      if (ini < 0) return null;
      let i = html.indexOf('{', ini), nivel = 0, fin = i;
      for (; i < html.length; i++) {
        if (html[i] === '{') nivel++;
        else if (html[i] === '}') { nivel--; if (nivel === 0) { fin = i + 1; break; } }
      }
      return html.slice(ini, fin);
    };
    const fuenteParam = sacar('paramOrigen');
    const fuenteExterno = sacar('origenExterno');
    eq('la página tiene paramOrigen', typeof fuenteParam === 'string', true);

    // Se arma con las MISMAS dependencias que tiene en la página, inyectadas.
    const hacer = (referer, busqueda) => new Function('document', 'location', `
      var _origen = null;
      ${fuenteExterno}
      ${fuenteParam}
      return paramOrigen;
    `)({ referrer: referer }, { search: busqueda })();

    eq('un utm de meta viaja como meta', hacer('', '?utm_source=meta'), '&origen=meta');
    eq('instagram orgánico viaja como instagram',
      hacer('https://instagram.com/', ''), '&origen=instagram');
    eq('sin referer viaja como directo', hacer('', ''), '&origen=directo');
    eq('un utm inventado viaja como otro', hacer('', '?utm_source=loquesea'), '&origen=otro');
    // Y nunca un valor fuera de la lista cerrada: es parte de una llave de KV.
    const sueltos = ['../../x', 'a b', '"', 'meta;rm -rf'].map((v) => hacer('', '?utm_source=' + encodeURIComponent(v)));
    eq('nada fuera de la lista llega a la llave', [...new Set(sueltos)], ['&origen=otro']);

    /* ⚠️ Y TIENE QUE ESTAR EN UN ÁMBITO QUE LOS FETCH VEAN.
     *
     * El <script> grande de la página tiene DOS funciones anónimas que se ejecutan solas y
     * no se ven entre sí: la primera lleva el chequeo y hace los fetch; la segunda lleva el
     * formulario. El 2-nov-2026 `paramOrigen` se escribió dentro de la segunda y el chequeo
     * entero dejó de funcionar: ReferenceError en el call site, que el `try` de la página
     * convertía en «No pudimos completar el chequeo».
     *
     * No lo vio la revisión de sintaxis (el archivo parsea perfecto), no lo vio la consola
     * (el error quedaba atrapado), y no lo habría visto ninguna de las aserciones de arriba,
     * que comprueban que la función EXISTE y qué DEVUELVE. Un grep ve el nombre, no el
     * ámbito. Se vio sirviendo la versión anterior en el mismo servidor y comparando las
     * peticiones del navegador: tres contra cero.
     *
     * Esto lo ata de la única forma estática que de verdad corresponde: las dos funciones
     * se definen ANTES de que se abra el primer IIFE, o sea en el ámbito del script, que es
     * el único que las dos mitades comparten.
     */
    const abreIIFE = html.indexOf("(function () {\n  const form = document.getElementById('form-chequeo')");
    eq('se encontró dónde abre el primer IIFE', abreIIFE > 0, true);
    eq('origenExterno se define fuera de los IIFE',
      html.indexOf('function origenExterno(') < abreIIFE, true);
    eq('paramOrigen también', html.indexOf('function paramOrigen()') < abreIIFE, true);
    eq('y hay una sola copia de cada una',
      [html.split('function origenExterno(').length - 1,
       html.split('function paramOrigen()').length - 1], [1, 1]);

    // Y las dos llamadas a la API lo tienen que mandar. Esto SÍ es un grep, y es un guardia:
    // la prueba de arriba demuestra que la función produce el valor, esta que se usa.
    eq('el chequeo rápido manda el origen',
      /api\/chequeo\?dominio='[\s\S]{0,80}paramOrigen\(\)/.test(html), true);
    eq('el profundo también',
      /api\/profundo\?dominio='[\s\S]{0,120}paramOrigen\(\)/.test(html), true);
  }

  // Se saca la función de la página tal cual está y se corre acá.
  const inicio = html.indexOf('function origenExterno(');
  let fin = html.indexOf('{', inicio), nivel = 0;
  for (let i = fin; i < html.length; i++) {
    if (html[i] === '{') nivel++;
    else if (html[i] === '}') { nivel--; if (nivel === 0) { fin = i + 1; break; } }
  }
  const fuente = html.slice(inicio, fin);
  eq('se pudo extraer origenExterno de la página', fuente.startsWith('function origenExterno('), true);

  const origenExterno = new Function(`${fuente}; return origenExterno;`)();

  // Los mismos casos por las dos puertas. Si una deriva, esto se cae.
  const CASOS = [
    ['', ''], [null, ''],
    ['https://instagram.com/', ''],
    ['https://www.instagram.com/p/x', ''],
    ['https://l.instagram.com/?u=x', ''],
    ['https://linkedin.com/', ''], ['https://lnkd.in/x', ''],
    ['https://m.facebook.com/x', ''], ['https://fb.me/x', ''],
    ['https://www.google.com/', ''], ['https://google.cl/search?q=x', ''],
    ['https://duckduckgo.com/', ''], ['https://www.bing.com/', ''],
    ['https://verifica.spindlelab.cl/', ''], ['https://spindlelab.cl/x', ''],
    ['https://ejemplo.cl/', ''], ['no soy una url', ''],
    ['https://www.google.com/', '?utm_source=instagram'],
    ['', '?utm_source=LINKEDIN'],
    ['', '?utm_source=' + encodeURIComponent('uso:rapido:2026-01-01')],
    ['', '?utm_source=' + encodeURIComponent('a'.repeat(300))],
    ['', '?utm_source=' + encodeURIComponent('🐴')],
    ['https://instagram.com/', '?utm_source='],
  ];
  let iguales = 0;
  for (const [ref, busqueda] of CASOS) {
    const servidor = origenDeLaVisita(ref, new URL('https://verifica.spindlelab.cl/' + busqueda));
    const cliente = origenExterno(ref, busqueda);
    if (servidor === cliente) iguales++;
    else {
      malo++;
      console.log(`  FALLA desvío cliente/servidor en ${JSON.stringify([ref, busqueda])}: servidor ${JSON.stringify(servidor)}, página ${JSON.stringify(cliente)}`);
    }
  }
  eq('las dos implementaciones contestan igual en todos los casos', iguales, CASOS.length);
}

console.log(`\n${ok} bien, ${malo} mal`);
process.exit(malo ? 1 : 0);
