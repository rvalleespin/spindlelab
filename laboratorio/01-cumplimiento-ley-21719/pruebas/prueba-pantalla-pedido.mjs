/**
 * La pantalla del pedido: lo que la persona ve y lo que toca.
 *
 *   node prueba-pantalla-pedido.mjs
 *
 * Acá no se prueba texto con un `grep`: se EXTRAE del HTML la expresión que arma el enlace de
 * «Escríbenos» y se evalúa con un pedido de mentira. Una prueba que busca una frase pasa igual
 * si mañana la frase se arma de otra forma; esta compara el enlace que de verdad sale.
 */

const RAIZ = '/Users/ramon/vyc-ley21719/verificaycumple';
process.env.VYC_PEDIDO_HTML = process.env.VYC_PEDIDO_HTML || `${RAIZ}/public/pedido/index.html`;

import { readFileSync } from 'node:fs';
import { rutaEnElRepo } from './rutas.mjs';

const HTML = readFileSync(rutaEnElRepo('verificaycumple/public/pedido/index.html', 'VYC_PEDIDO_HTML'), 'utf8');

let ok = 0, malo = 0;
const eq = (n, r, e) => {
  if (JSON.stringify(r) === JSON.stringify(e)) ok++;
  else { malo++; console.log(`  FALLA ${n}: esperado ${JSON.stringify(e)}, real ${JSON.stringify(r)}`); }
};
const cierto = (n, v) => eq(n, Boolean(v), true);
const falso = (n, v) => eq(n, Boolean(v), false);

/* ── Se saca del HTML el tramo que arma el «Escríbenos» y se ejecuta ─────────────────────
 *
 * Se extrae en vez de copiarse: una copia en la prueba probaría la copia.
 */
function enlaceEscribenos(p, e) {
  const i = HTML.indexOf("var sitioCorreo = p.dominio");
  if (i < 0) throw new Error('no encuentro el tramo del «Escríbenos» en el HTML');
  const fin = HTML.indexOf("'\">Escríbenos</a>';", i);
  if (fin < 0) throw new Error('no encuentro el final del tramo');
  const codigo = HTML.slice(i, fin + "'\">Escríbenos</a>';".length);
  // eslint-disable-next-line no-new-func
  const f = new Function('p', 'e', 'encodeURIComponent', `let html = ''; ${codigo} return html;`);
  return f(p, e, encodeURIComponent);
}

const ID = 'vyc_' + '2'.repeat(32);
const PEDIDO = { id: ID, dominio: 'www.udp.cl' };
const html = enlaceEscribenos(PEDIDO, { etapa: 'falta-acceso' });

const href = (html.match(/href="([^"]+)"/) || [])[1] || '';
const url = new URL(href.replace(/&amp;/g, '&'));
const asunto = url.searchParams.get('subject') || '';
const cuerpo = url.searchParams.get('body') || '';

console.log('=== 1. el enlace va a nuestra casilla ===');
eq('es un mailto', url.protocol, 'mailto:');
eq('a hola@spindlelab.cl', url.pathname, 'hola@spindlelab.cl');

console.log('=== 2. el asunto habla del SITIO, no de un número ===');
{
  // EL DEFECTO, que vio Ramón usando la pantalla: el asunto era «Pedido vyc_2288…» y la primera
  // línea del cuerpo repetía el mismo id. Treinta y seis caracteres que no le dicen nada a
  // quien escribe, dos veces, en un correo que recién está redactando. Parecía un ticket.
  eq('el asunto nombra el sitio', asunto, 'Pedido de www.udp.cl');
  falso('y NO lleva el id', asunto.includes(ID));
  cierto('el cuerpo abre hablando del sitio', cuerpo.startsWith('Hola, les escribo por mi pedido de www.udp.cl:'));
  falso('y la apertura no lleva el id', cuerpo.split('\n')[0].includes(ID));
}

console.log('=== 3. pero el número SÍ viaja, al final ===');
{
  // Sin el id tendríamos que preguntárselo, y es lo único que identifica su pedido sin
  // ambigüedad. La diferencia no es si va: es DÓNDE va.
  cierto('el id está en el cuerpo', cuerpo.includes(ID));
  const lineas = cuerpo.split('\n').filter((l) => l.trim());
  cierto('en la última línea', lineas[lineas.length - 1].includes(ID));
  cierto('después de una línea divisoria', /--\s*\nNúmero de pedido:/.test(cuerpo));
  cierto('con espacio en blanco para escribir en medio', /:\n\n\n/.test(cuerpo));
}

console.log('=== 4. sin dominio no queda un hueco raro ===');
{
  const sinDominio = enlaceEscribenos({ id: ID }, { etapa: 'falta-acceso' });
  const u2 = new URL(((sinDominio.match(/href="([^"]+)"/) || [])[1] || '').replace(/&amp;/g, '&'));
  eq('el asunto se lee igual', u2.searchParams.get('subject'), 'Pedido de mi sitio');
  falso('sin dejar «Pedido de »', /Pedido de\s*$/.test(u2.searchParams.get('subject')));
}

console.log(`\n${ok} bien, ${malo} mal`);
process.exit(malo ? 1 : 0);
