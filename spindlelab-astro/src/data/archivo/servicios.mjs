// LOS SERVICIOS DE A (obra E12, corrida 2, tanda 4). Diego, 19-oct-2026; orden y comprobaciones al día en la obra E13.
//
// Lo que comparten /servicios/, Desarrollo web y los cinco servicios de [slug].astro: el orden de los seis (el de la
// página de servicios), el siguiente de cada uno, los trozos de un texto de Clara con sus enlaces, y la comprobación de
// los precios. Los precios y los nombres salen de oferta-v3.json y servicios-v3.json (la obra E13 corrigió su texto, no
// ningún monto ni nombre): aquí solo se leen y se comparan, como texto, con lo que escribió Clara (brief E12 §6.4, spec
// §6.9). Un precio de Clara que no esté en los JSON hace caer el build.
//
// Es .mjs y no .ts a propósito: Tailwind (tailwind.config.mjs, que no se toca) lee las palabras de los .astro y .ts de
// src/, y una que coincida con una clase cambiaría el CSS de las páginas publicadas (desvios.md, tanda 1, punto 6).
import oferta from '../oferta-v3.json';
import servicios from '../servicios-v3.json';

export const SITIO = 'https://spindlelab.cl';

// ---- Los seis, en el orden de la página de servicios: los cuatro bloques del documento de textos §4 en el orden de
// Soluciones de la home desde el 30-oct (Ramón: el sitio primero y lo demás conectado a él; acta de QA del 30-oct, menor
// 11): Sitio web a medida (Desarrollo web), Búsqueda y visibilidad en IA (Auditoría, Visibilidad), Anuncios en Google y
// redes (Paid Media, Redes) y Acompañamiento mensual. Hasta el 30-oct el sitio iba tercero. Es también el orden del
// ItemList del JSON-LD y el de «Siguiente», en ciclo (Acompañamiento vuelve a Desarrollo web). Los nombres y los destinos
// salen de oferta-v3.json, que conserva su forma (la home lee momentos[] y tambien[]); lo único que se fija aquí es el orden.
const POR_BLOQUE = [
  'desarrollo-web',
  'auditoria-seo-tecnica',
  'visibilidad-en-ia',
  'paid-media',
  'redes-sociales',
  'acompanamiento-mensual',
];
const FILAS = [...oferta.momentos.flatMap((m) => m.items), ...oferta.tambien];
export const ORDEN = POR_BLOQUE.map((slug) => {
  const it = FILAS.find((f) => f.href.split('/').filter(Boolean).pop() === slug);
  if (!it) throw new Error(`servicios.mjs: «${slug}» no está en oferta-v3.json`);
  return { nombre: it.n, href: it.href, slug };
});
if (ORDEN.length !== FILAS.length) throw new Error('servicios.mjs: oferta-v3.json trae servicios que ORDEN no ordena');

export function siguiente(slug) {
  const i = ORDEN.findIndex((s) => s.slug === slug);
  if (i < 0) throw new Error(`servicios.mjs: «${slug}» no está en oferta-v3.json`);
  return ORDEN[(i + 1) % ORDEN.length];
}

export function nombreDe(slug) {
  const s = ORDEN.find((x) => x.slug === slug);
  if (!s) throw new Error(`servicios.mjs: «${slug}» no está en oferta-v3.json`);
  return s.nombre;
}

// ---- Un texto de Clara partido en sus enlaces («enlaces»: { "el chequeo": "/diagnostico/" }), sin cambiar una
// letra: cada frase se enlaza la primera vez que aparece. Si una frase no está en el texto, el build se cae.
export function trozos(texto, enlaces = {}) {
  const salida = [];
  let resto = texto;
  for (const [frase, href] of Object.entries(enlaces)) {
    const i = resto.indexOf(frase);
    if (i < 0) throw new Error(`trozos: falta «${frase}» en «${texto}»`);
    if (i > 0) salida.push({ texto: resto.slice(0, i) });
    salida.push({ texto: frase, href });
    resto = resto.slice(i + frase.length);
  }
  if (resto) salida.push({ texto: resto });
  if (salida.map((t) => t.texto).join('') !== texto) throw new Error(`trozos: el texto cambió al partirlo: «${texto}»`);
  return salida;
}

// ---- Los precios de cada servicio, como los dicen los JSON: los planes de Desarrollo web en oferta-v3.json; los de los
// otros cinco, la sección de planes de servicios-v3.json; y la «p» de su fila en oferta-v3.json.
export function preciosDe(slug) {
  const fila = [...oferta.momentos.flatMap((m) => m.items), ...oferta.tambien].find((it) => it.href.endsWith(`/${slug}/`));
  if (!fila) throw new Error(`preciosDe: «${slug}» no está en oferta-v3.json`);
  const lista = [fila.p];
  if (slug === 'desarrollo-web') lista.push(...oferta.momentos[0].planes.map((p) => p.p));
  else {
    const s = servicios[slug];
    if (!s) throw new Error(`preciosDe: «${slug}» no está en servicios-v3.json`);
    const planes = s.secciones.find((x) => Array.isArray(x.planes));
    lista.push(...planes.planes.map((p) => p.precio));
  }
  return lista;
}

// Los montos de un texto: «$390.000», «$590.000/mes».
const montos = (t) => t.match(/\$\d{1,3}(?:\.\d{3})*(?:\/mes)?/g) || [];

// Que una línea de precio de Clara diga, como texto, montos que están en los JSON de ese servicio, y que diga el precio de
// entrada (el primer plan con monto). Devuelve la línea tal cual.
export function comprobarPrecio(linea, slug, donde) {
  const delDato = preciosDe(slug).join(' | ');
  const suyos = montos(linea);
  if (!suyos.length) throw new Error(`${donde}: la línea de precio «${linea}» no dice ningún monto`);
  for (const m of suyos) {
    if (!delDato.includes(m)) throw new Error(`${donde}: «${m}» no está en los precios de «${slug}» (${delDato})`);
  }
  const entrada = montos(delDato)[0];
  if (!linea.includes(entrada)) throw new Error(`${donde}: la línea «${linea}» no dice el precio de entrada ${entrada}`);
  if (!linea.includes('+ IVA')) throw new Error(`${donde}: la línea «${linea}» no dice «+ IVA» (spec §7, 5-oct)`);
  return linea;
}

// Que un texto (una entradilla, una respuesta) solo diga montos que están en los JSON de ese servicio.
export function soloMontosDe(texto, slug, donde) {
  const delDato = preciosDe(slug).join(' | ');
  for (const m of montos(texto)) {
    if (!delDato.includes(m)) throw new Error(`${donde}: «${m}» no está en los precios de «${slug}»`);
  }
  return texto;
}

// «Desde $390.000 + IVA» → 390000 (el minPrice del OfferCatalog de Desarrollo web, en CLP sin IVA, igual al JSON).
export function monto(p) {
  const m = p.match(/\$(\d{1,3}(?:\.\d{3})*)/);
  return m ? Number(m[1].replace(/\./g, '')) : null;
}
