/**
 * Un campo obligatorio vacío tiene que quedar A LA VISTA cuando el navegador salta a él.
 *
 *   node prueba-campos-visibles.mjs
 *
 * EL DEFECTO, encontrado el 24-oct-2026 probando el sitio vivo con la campaña corriendo:
 * Ramón apretó «Enviar» con el correo puesto y nada más, y desde su lado no pasó nada. Sí
 * pasaba: el navegador bloquea el envío y hace scroll HASTA EL CAMPO que falta —no hasta el
 * formulario— y dibuja ahí su globo «Completa este campo». Con un header pegajoso de 66px y
 * `scroll-margin-top: 0` en los campos, ese campo aterriza DETRÁS del header y lo único que
 * asoma es el globo recortado contra el borde de arriba.
 *
 * El contenedor ya tenía su margen (`.pedir { scroll-margin-top: ... }`) desde antes, y por
 * eso el defecto era difícil de ver leyendo el CSS: el margen existía, pero en el elemento
 * equivocado. El navegador nunca hace scroll al formulario; hace scroll al campo.
 *
 * Y le pasaba igual al panel de PAGO, que es el que tiene el dinero detrás: su correo y su
 * casilla de consentimiento también estaban en cero.
 *
 * QUÉ PRUEBA ESTO Y QUÉ NO. Sin navegador no se puede medir el scroll real, así que no se
 * comprueba el píxel: se comprueba que cada control obligatorio de los dos formularios esté
 * CUBIERTO por alguna regla de `scroll-margin-top` que descuente el header. Para eso se leen
 * las reglas del `<style>` de la página y se resuelve a mano el único tipo de selector que
 * se usa acá (`.clase etiqueta` y `.clase`), en vez de buscar un texto: si mañana la regla se
 * escribe de otra forma pero sigue cubriendo los campos, esta prueba la acepta; si cubre el
 * formulario y no los campos —que es exactamente el defecto— se pone roja.
 */

const RAIZ = '/Users/ramon/vyc-ley21719/verificaycumple';
process.env.VYC_INDEX = process.env.VYC_INDEX || `${RAIZ}/public/index.html`;

import { readFileSync } from 'node:fs';
import { rutaEnElRepo } from './rutas.mjs';

const HTML = readFileSync(rutaEnElRepo('verificaycumple/public/index.html', 'VYC_INDEX'), 'utf8');

let ok = 0, malo = 0;
const eq = (n, r, e) => {
  if (JSON.stringify(r) === JSON.stringify(e)) ok++;
  else { malo++; console.log(`  FALLA ${n}: esperado ${JSON.stringify(e)}, real ${JSON.stringify(r)}`); }
};
const cierto = (n, v) => eq(n, Boolean(v), true);

/* ── Los controles obligatorios de cada formulario, sacados del propio HTML ───────────────
 *
 * Se leen de la página en vez de escribirlos acá: si mañana se agrega un campo obligatorio,
 * entra solo a la prueba. Una lista a mano se queda atrás justo cuando importa.
 */
function formulario(id) {
  const abre = HTML.indexOf(`<form id="${id}"`);
  if (abre < 0) return null;
  const cierra = HTML.indexOf('</form>', abre);
  const trozo = HTML.slice(abre, cierra);
  const clase = (trozo.match(/^<form[^>]*\sclass="([^"]+)"/) || [, ''])[1].split(/\s+/);
  const controles = [];
  for (const m of trozo.matchAll(/<(input|textarea|select)\b([^>]*)>/g)) {
    if (!/\brequired\b/.test(m[2])) continue;
    controles.push({ etiqueta: m[1], nombre: (m[2].match(/\sname="([^"]+)"/) || [, '?'])[1] });
  }
  return { id, clases: clase, controles };
}

const PEDIR = formulario('pedir');
const COMPRA = formulario('compra');

cierto('se encontró el formulario de preguntas', PEDIR);
cierto('se encontró el panel de compra', COMPRA);
cierto('el de preguntas tiene campos obligatorios', PEDIR && PEDIR.controles.length > 0);
cierto('el panel de compra tiene campos obligatorios', COMPRA && COMPRA.controles.length > 0);

/* ── Las reglas de scroll-margin-top del <style> ───────────────────────────────────────── */

const CSS = [...HTML.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]).join('\n')
  // Los comentarios pueden contener llaves y punto y coma y romperían el troceo de reglas.
  .replace(/\/\*[\s\S]*?\*\//g, '');

/** Los selectores de toda regla que fija scroll-margin-top descontando el header. */
function selectoresConMargen() {
  const fuera = [];
  for (const m of CSS.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const cuerpo = m[2];
    const decl = cuerpo.match(/scroll-margin-top\s*:\s*([^;]+)/);
    if (!decl) continue;
    // Un `scroll-margin-top: 0` no cubre nada: tiene que descontar el alto del header.
    if (!/--alto-header/.test(decl[1])) continue;
    for (const sel of m[1].split(',')) fuera.push(sel.trim());
  }
  return fuera;
}

const SELECTORES = selectoresConMargen();
cierto('hay reglas de scroll-margin-top que descuentan el header', SELECTORES.length > 0);

/**
 * ¿Este selector alcanza a este control? Se resuelven solo las dos formas que usa la página:
 * `.clase` (el contenedor) y `.clase etiqueta` (el control dentro del contenedor). Cualquier
 * otra forma se considera NO cubierta, que es el lado seguro: una prueba que ante la duda
 * dice «cubierto» es una prueba que aprueba el defecto.
 */
function alcanza(selector, form, control) {
  const partes = selector.split(/\s+/);
  if (partes.length === 1) return false;            // `.pedir` cubre el formulario, NO el campo
  if (partes.length !== 2) return false;
  const [cont, hoja] = partes;
  if (!cont.startsWith('.') || !form.clases.includes(cont.slice(1))) return false;
  return hoja === control.etiqueta;
}

for (const form of [PEDIR, COMPRA].filter(Boolean)) {
  for (const control of form.controles) {
    const cubierto = SELECTORES.some((s) => alcanza(s, form, control));
    cierto(`#${form.id}: «${control.nombre}» queda bajo el header al saltar a él`, cubierto);
  }
}

/* ── La trampa que hizo invisible el defecto ──────────────────────────────────────────────
 *
 * Que el CONTENEDOR tenga el margen no vale, y conviene dejarlo escrito: durante meses el
 * CSS tuvo `.pedir { scroll-margin-top: ... }` y eso se leía como «ya está resuelto».
 */
{
  const soloContenedor = SELECTORES.filter((s) => !s.includes(' '));
  cierto('el margen del contenedor sigue estando (no se rompió nada al agregar el de los campos)',
    soloContenedor.some((s) => s === '.pedir' || s.includes('.pedir')));
}

console.log(`\n${ok} bien, ${malo} mal`);
process.exit(malo ? 1 : 0);
