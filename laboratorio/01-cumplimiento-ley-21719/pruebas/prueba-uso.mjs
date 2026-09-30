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
import { rutaEnElRepo } from './rutas.mjs';

const RUTA = rutaEnElRepo('verificaycumple/functions/api/profundo.js', 'PROFUNDO_JS');
const { origenDeLaVisita, anotarUso, TTL_USO_S } = await import(RUTA);

let ok = 0, malo = 0;
const eq = (n, r, e) => {
  if (JSON.stringify(r) === JSON.stringify(e)) ok++;
  else { malo++; console.log(`  FALLA ${n}: esperado ${JSON.stringify(e)}, real ${JSON.stringify(r)}`); }
};

// Un `url` de mentira con los parámetros que haga falta.
const conUtm = (v) => new URL('https://verifica.spindlelab.cl/?utm_source=' + encodeURIComponent(v));
const sinUtm = new URL('https://verifica.spindlelab.cl/');

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

console.log(`\n${ok} bien, ${malo} mal`);
process.exit(malo ? 1 : 0);
