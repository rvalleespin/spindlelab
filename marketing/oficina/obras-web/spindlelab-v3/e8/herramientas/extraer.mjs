/**
 * extraer.mjs · E8, paso 0. Saca el copy de las 21 rutas públicas del v3, tal como las
 * pinta el navegador, a un JSON que después se compara con comparar.mjs.
 *
 * POR QUÉ EXISTE. En el v3 mucho texto visible no sale del JSON sino de parches en la
 * plantilla (CORRIGE, LIMPIEZA, PROPIO, los .replace de Método, constantes fijadas en la
 * página). Leer el JSON o las plantillas no dice qué ve el visitante; leer el HTML servido
 * sí. Con un extractor sobre la base y otro sobre el resultado, «sin cambio visible» deja
 * de ser una promesa y pasa a ser un diff vacío.
 *
 * USO
 *   node extraer.mjs <baseURL> <salida.json> [opciones]
 *     <baseURL>        origen que sirve el dist, p. ej. http://127.0.0.1:8791
 *     --dist <dir>     lista las rutas desde ese dist (index.html bajo v3/) en vez de
 *                      recorrer enlaces desde /v3/
 *     --rutas a,b      solo esas rutas (/v3/metodo/,/v3/contacto/)
 *     --excluir a,b    por defecto las maquetas: /v3/a/,/v3/b/,/v3/c/,/v3/maqueta-inicial/
 *     --esperadas N    sale con código 3 si no encuentra exactamente N rutas
 *     --ancho 1440 --alto 900
 *
 * QUÉ SACA, por ruta (todo en orden del documento):
 *   head          title, meta description y robots, og:*, twitter:*, canonical.
 *   ranuras       cada elemento con texto propio: h1-h6, p, li, dt, dd, th, td, figcaption,
 *                 label, legend, button, summary, blockquote, caption, option; los a/span
 *                 que no están dentro de otro bloque; y cualquier contenedor con texto suelto
 *                 (un div con texto directo). Texto con los espacios colapsados; el espacio
 *                 duro se conserva y en el archivo queda escrito como  . Clave estable
 *                 «ruta#ancla>tag:n» (ancla: el id más cercano, o «§id» de la sección que lo
 *                 titula con aria-labelledby, o el bloque de primer nivel, p. ej.
 *                 «footer.d-pie»), hash corto del texto y las zonas en que cae.
 *                 Se incluye también el texto oculto (pestañas no elegidas, menú cerrado,
 *                 aviso de cookies, «En esta guía» con hidden), marcado `oculto: true`:
 *                 es copy igual, y un cambio ahí también tiene que verse.
 *   atributos     alt, aria-label, placeholder, title, y value de los input submit, button,
 *                 reset y hidden y de los <button value>.
 *   jsonld        cada <script type="application/ld+json"> aplanado a pares
 *                 ruta-de-json → texto (solo strings). Los números y booleanos (precios de
 *                 las Offer) van aparte, en jsonldOtros, para que un precio también se vea.
 *   zonasCerradas por zona que no se toca, el hash del innerHTML tal como sale del build
 *                 (se lee el HTML servido, no el DOM vivo, así un script no lo mueve).
 *   invariantes   los name de cada formulario, los id chq-*, y los precios del texto visible.
 *
 * DETERMINISMO. Sin fechas ni contadores en la salida. El aviso de cookies se cierra antes
 * de cargar (localStorage spindlelab_consent = 'denied', lo que lee public/js/consent-banner.js),
 * así que ni Analytics ni el Pixel se cargan y el control del pie dice siempre «Cookies:
 * rechazadas». Toda petición a otro origen se corta. Los <details> se abren antes de leer.
 * En el hash de las zonas se quitan los atributos data-astro-cid-* (y las clases astro-*):
 * son el ámbito del <style> del componente y pueden cambiar con una edición que no toca la zona.
 */

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath, pathToFileURL } from 'node:url';

const AQUI = path.dirname(fileURLToPath(import.meta.url));
const RAIZ_REPO = path.resolve(AQUI, '../../../../../..');

// --- argumentos -------------------------------------------------------------
const args = process.argv.slice(2);
const posicionales = [];
const opciones = {};
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a.startsWith('--')) {
    const v = args[i + 1];
    if (v !== undefined && !v.startsWith('--')) { opciones[a.slice(2)] = v; i++; }
    else opciones[a.slice(2)] = true;
  } else posicionales.push(a);
}
if (posicionales.length < 2) {
  console.error('Uso: node extraer.mjs <baseURL> <salida.json> [--dist <dir>] [--rutas a,b] [--excluir a,b] [--esperadas N] [--ancho 1440] [--alto 900]');
  process.exit(2);
}
const BASE = posicionales[0].replace(/\/+$/, '');
const SALIDA = path.resolve(posicionales[1]);
const ANCHO = Number(opciones.ancho ?? 1440);
const ALTO = Number(opciones.alto ?? 900);
const EXCLUIR = (typeof opciones.excluir === 'string' ? opciones.excluir : '/v3/a/,/v3/b/,/v3/c/,/v3/maqueta-inicial/')
  .split(',').filter(Boolean);
const ESPERADAS = opciones.esperadas !== undefined ? Number(opciones.esperadas) : null;
const excluida = (r) => EXCLUIR.some((x) => r === x || r.startsWith(x));

// --- Playwright y Chromium --------------------------------------------------
// La herramienta vive fuera de spindlelab-astro/ (para no ensuciar el diff de la
// publicación), así que importa el Playwright del proyecto por ruta.
const modPw = process.env.PLAYWRIGHT_MODULE
  ?? path.join(RAIZ_REPO, 'spindlelab-astro/node_modules/playwright/index.mjs');
const { chromium } = await import(pathToFileURL(modPw).href);

function buscarChromium() {
  if (process.env.CHROMIUM_PATH && fs.existsSync(process.env.CHROMIUM_PATH)) return process.env.CHROMIUM_PATH;
  const fijo = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
  if (fs.existsSync(fijo)) return fijo;
  for (const raiz of [process.env.PLAYWRIGHT_BROWSERS_PATH, '/opt/pw-browsers'].filter(Boolean)) {
    if (!fs.existsSync(raiz)) continue;
    for (const dir of fs.readdirSync(raiz).sort()) {
      if (!dir.startsWith('chromium-')) continue;
      for (const rel of ['chrome-linux/chrome', 'chrome-mac/Chromium.app/Contents/MacOS/Chromium']) {
        const p = path.join(raiz, dir, rel);
        if (fs.existsSync(p)) return p;
      }
    }
  }
  const mac = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  return fs.existsSync(mac) ? mac : undefined;
}

// --- zonas ------------------------------------------------------------------
// `cerrada`: no se toca en E8, y se guarda el hash de su innerHTML. Las demás solo marcan
// las ranuras (para filtrar y para agrupar lo común del menú y el pie).
// `ruta`: expresión que limita la zona a ciertas rutas.
const ZONAS = [
  { id: 'hero', sel: 'section.d-hero', cerrada: true, ruta: '^/v3/$' },
  { id: 'pres', sel: '.d-pres', cerrada: true, ruta: '^/v3/$' },
  // «La línea del campo Desarrollo» (plan E8): viene del tablero de la home aprobado el 5-oct.
  { id: 'campo-desarrollo-linea', sel: 'section[aria-labelledby="t-desarrollo"] .d-desc', cerrada: true, ruta: '^/v3/$' },
  // La bio de Ramón, constantes presentacion, trayectoriaEti, trayectoria, porque y primero
  // de nosotros.astro. «Cómo trabajo» (puntos) y los rótulos nuevos no son bio.
  {
    id: 'bio',
    sel: [
      '.d-retrato-nos__txt > p.d-guia',
      'section[aria-labelledby="s-tra"]',
      'section[aria-labelledby="s-por"] .d-texto-nos',
      'section[aria-labelledby="s-apa"] .d-texto-nos > p.d-guia',
    ].join(', '),
    cerrada: true,
    ruta: '^/v3/nosotros/$',
  },
  // «Te lo muestro antes de que pagues nada.»: singular o plural lo elige Ramón (R4).
  { id: 'r4-singular', sel: 'section[aria-labelledby="s-apa"] .d-eti .d-chico', cerrada: true, ruta: '^/v3/nosotros/$' },
  // El cuerpo del artículo (data/blog-v3/<slug>.html) y lo que la cabeza lee de ese archivo.
  { id: 'articulo-cuerpo', sel: '.d-prosa-art', cerrada: true, ruta: '^/v3/blog/[^/]+/$' },
  { id: 'articulo-cabeza', sel: 'main > article > header h1, main > article > header .d-autor-art', cerrada: true, ruta: '^/v3/blog/[^/]+/$' },
  // El aviso de cookies es de Layout.astro y consent-banner.js: no se tocan.
  { id: 'aviso-cookies', sel: '#cookie-banner', cerrada: true },
  // Marcas sin hash.
  { id: 'articulo', sel: 'main > article', cerrada: false, ruta: '^/v3/blog/[^/]+/$' },
  { id: 'formulario', sel: 'form.contact-form', cerrada: false },
  { id: 'chq', sel: '[id^="chq-"]', cerrada: false },
  { id: 'menu', sel: '[data-modulo-nav], #menu-overlay', cerrada: false },
  { id: 'pie', sel: 'footer.d-pie', cerrada: false },
];

// --- lo que corre dentro de la página ----------------------------------------
// Se serializa al navegador: no puede usar nada de este archivo.
async function extraerEnPagina({ zonas }) {
  const BLOQUES = new Set(['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'LI', 'DT', 'DD', 'TH', 'TD',
    'FIGCAPTION', 'LABEL', 'LEGEND', 'BUTTON', 'SUMMARY', 'BLOCKQUOTE', 'CAPTION', 'OPTION']);
  const ENLINEA = new Set(['A', 'SPAN']);
  const SALTAR = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEMPLATE', 'TEXTAREA']);
  const SVG = 'http://www.w3.org/2000/svg';
  const body = document.body;
  const main = document.querySelector('main');

  const firma = (el) => el.tagName.toLowerCase() + (el.classList[0] ? '.' + el.classList[0] : '');
  // Ancla de la clave: el id más cercano (el propio incluido), o la sección que lo titula
  // (aria-labelledby), o el bloque de primer nivel bajo <main> o <body>.
  const anclaDe = (el) => {
    for (let a = el; a && a !== body; a = a.parentElement) {
      if (a.id) return a.id;
      const lb = a.getAttribute('aria-labelledby');
      if (lb) return '§' + lb.trim().split(/\s+/)[0];
    }
    let a = el;
    while (a.parentElement && a.parentElement !== body && a.parentElement !== main) a = a.parentElement;
    if (a === body) return 'body';
    const hermanos = [...a.parentElement.children].filter((x) => firma(x) === firma(a));
    const k = hermanos.indexOf(a);
    return firma(a) + (k > 0 ? `(${k})` : '');
  };

  const textoDirecto = (el) => [...el.childNodes].some((n) => n.nodeType === 3 && /\S/.test(n.nodeValue));
  const enLinea = (el) => {
    const d = getComputedStyle(el).display;
    return d === 'inline' || d === 'contents';
  };

  // ------------------------------------------------------------- ranuras
  const ranuras = [];
  const buf = new Map(); // owner → partes
  const nueva = (el) => {
    if (!buf.has(el)) { buf.set(el, []); ranuras.push(el); }
    return buf.get(el);
  };
  const recorrer = (nodo, dueno) => {
    for (const n of nodo.childNodes) {
      if (n.nodeType === 3) {
        if (!dueno) continue; // no pasa: un elemento con texto directo ya es dueño
        buf.get(dueno).push(n.nodeValue);
        continue;
      }
      if (n.nodeType !== 1) continue;
      const el = n;
      if (SALTAR.has(el.tagName)) continue;
      if (el.namespaceURI === SVG && (el.localName === 'title' || el.localName === 'desc')) continue;
      if (el.tagName === 'BR') { if (dueno) buf.get(dueno).push(' '); continue; }
      let propio = null;
      if (BLOQUES.has(el.tagName)) propio = el;
      else if (!dueno && (ENLINEA.has(el.tagName) || textoDirecto(el))) propio = el;
      if (propio) {
        if (dueno) buf.get(dueno).push(' ');
        nueva(propio);
        recorrer(el, propio);
        if (dueno) buf.get(dueno).push(' ');
      } else if (dueno && !enLinea(el)) {
        buf.get(dueno).push(' ');
        recorrer(el, dueno);
        buf.get(dueno).push(' ');
      } else {
        recorrer(el, dueno);
      }
    }
  };
  recorrer(body, null);

  // Espacios colapsados SIN tocar el espacio duro: \s de JS incluye U+00A0, por eso la
  // clase va escrita a mano.
  const normal = (t) => t.replace(/[ \t\n\r\f\v]+/g, ' ').trim();

  const zonasDe = (el) => zonas.filter((z) => el.closest(z.sel)).map((z) => z.id);
  const visible = (el) => (typeof el.checkVisibility === 'function'
    ? el.checkVisibility({ visibilityProperty: true })
    : !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length));

  const cuenta = new Map();
  const salidaRanuras = [];
  for (const el of ranuras) {
    const texto = normal(buf.get(el).join(''));
    if (!texto) continue;
    const ancla = anclaDe(el);
    const tag = el.tagName.toLowerCase();
    const k = `${ancla}>${tag}`;
    const n = cuenta.get(k) ?? 0;
    cuenta.set(k, n + 1);
    const r = { ancla, tag, n, texto, zonas: zonasDe(el) };
    if (!visible(el)) r.oculto = true;
    if (el.closest('[aria-hidden="true"]')) r.ariaOculto = true;
    salidaRanuras.push(r);
  }

  // ------------------------------------------------------------- atributos
  const ATRS = ['alt', 'aria-label', 'placeholder', 'title'];
  const cuentaA = new Map();
  const atributos = [];
  const anotar = (el, attr, valor) => {
    const ancla = anclaDe(el);
    const tag = el.tagName.toLowerCase();
    const k = `${ancla}>${tag}[${attr}]`;
    const n = cuentaA.get(k) ?? 0;
    cuentaA.set(k, n + 1);
    const a = { ancla, tag, attr, n, valor: normal(valor), zonas: zonasDe(el) };
    if (!visible(el) && el.tagName !== 'INPUT') a.oculto = true;
    atributos.push(a);
  };
  for (const el of body.querySelectorAll('*')) {
    if (SALTAR.has(el.tagName) && el.tagName !== 'TEXTAREA') continue;
    for (const attr of ATRS) if (el.hasAttribute(attr)) anotar(el, attr, el.getAttribute(attr));
    if (el.tagName === 'INPUT' && /^(submit|button|reset|hidden)$/i.test(el.type) && el.hasAttribute('value')) anotar(el, 'value', el.getAttribute('value'));
    if (el.tagName === 'BUTTON' && el.hasAttribute('value')) anotar(el, 'value', el.getAttribute('value'));
    if (el.namespaceURI === SVG && (el.localName === 'title' || el.localName === 'desc')) anotar(el, 'svg-' + el.localName, el.textContent);
  }

  // ------------------------------------------------------------- head
  const head = [];
  const cuentaH = new Map();
  const ponH = (clave, valor) => {
    const n = cuentaH.get(clave) ?? 0;
    cuentaH.set(clave, n + 1);
    head.push({ clave: n ? `${clave}:${n}` : clave, valor: normal(valor ?? '') });
  };
  ponH('title', document.title);
  ponH('html[lang]', document.documentElement.getAttribute('lang') ?? '');
  for (const m of document.head.querySelectorAll('meta[name], meta[property]')) {
    const nombre = m.getAttribute('name') ?? m.getAttribute('property');
    if (/^(description|robots|author)$/i.test(nombre) || /^og:/i.test(nombre) || /^twitter:/i.test(nombre)) {
      ponH(`meta[${nombre}]`, m.getAttribute('content'));
    }
  }
  for (const l of document.head.querySelectorAll('link[rel="canonical"]')) ponH('link[canonical]', l.getAttribute('href'));

  // ------------------------------------------------------------- JSON-LD (crudo; se aplana en Node)
  const jsonld = [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => s.textContent);

  // ------------------------------------------------------------- zonas cerradas, sobre el HTML servido
  const fuente = await (await fetch(location.href, { cache: 'no-store' })).text();
  const doc = new DOMParser().parseFromString(fuente, 'text/html');
  const cerradas = {};
  for (const z of zonas.filter((x) => x.cerrada)) {
    const els = [...doc.querySelectorAll(z.sel)];
    if (!els.length) continue;
    cerradas[z.id] = { sel: z.sel, n: els.length, html: els.map((e) => e.innerHTML), texto: els.map((e) => normal(e.textContent)) };
  }

  // ------------------------------------------------------------- invariantes
  const formularios = [...document.querySelectorAll('form')].map((f) => ({
    form: f.id ? `#${f.id}` : firma(f),
    names: [...f.querySelectorAll('[name]')].map((e) => e.getAttribute('name')),
  }));
  const idsChq = [...document.querySelectorAll('[id^="chq-"]')].map((e) => e.id);

  return { head, ranuras: salidaRanuras, atributos, jsonld, cerradas, formularios, idsChq };
}

// --- en Node ----------------------------------------------------------------
const corto = (t, n = 8) => crypto.createHash('sha1').update(t, 'utf8').digest('hex').slice(0, n);

// Aplana un JSON a pares ruta → hoja. Un objeto con @id se nombra por su @id, así una
// pregunta nueva en un grafo no corre la ruta de los nodos que siguen.
function aplanar(v, ruta, strings, otros) {
  if (Array.isArray(v)) {
    v.forEach((x, i) => {
      const seg = x && typeof x === 'object' && !Array.isArray(x) && typeof x['@id'] === 'string' ? `[${x['@id']}]` : `[${i}]`;
      aplanar(x, ruta + seg, strings, otros);
    });
  } else if (v && typeof v === 'object') {
    for (const [k, x] of Object.entries(v)) aplanar(x, `${ruta}.${k}`, strings, otros);
  } else if (typeof v === 'string') {
    strings.push({ ruta, valor: v });
  } else {
    otros.push({ ruta, valor: v === null ? 'null' : `${typeof v}:${String(v)}` });
  }
}

// Lo que no forma parte del contenido de la zona: el ámbito de estilos de Astro y el hash
// de nombre de los archivos de /_astro/.
const limpiarHtml = (h) => h
  .replace(/\s+data-astro-cid-[a-z0-9]+(="[^"]*")?/g, '')
  .replace(/(class="[^"]*?)\s*\bastro-[a-z0-9]{8}\b/g, '$1')
  .replace(/(\/_astro\/[^"'\s]+?)\.[A-Za-z0-9_-]{8}(\.[a-z0-9]+)/g, '$1$2');

const PRECIO = /\$\s?\d{1,3}(?:\.\d{3})+|\b\d{1,3}(?:\.\d{3})+\s?CLP\b/g;

function rutasDeDist(dir) {
  const salida = [];
  const recorrer = (d, base) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      if (e.isDirectory()) recorrer(path.join(d, e.name), `${base}${e.name}/`);
      else if (e.name === 'index.html') salida.push(base);
    }
  };
  recorrer(path.join(dir, 'v3'), '/v3/');
  return salida;
}

const navegador = await chromium.launch({ executablePath: buscarChromium(), args: ['--no-sandbox', '--disable-gpu'] });
const contexto = await navegador.newContext({
  viewport: { width: ANCHO, height: ALTO },
  deviceScaleFactor: 1,
  locale: 'es-CL',
  timezoneId: 'America/Santiago',
  reducedMotion: 'reduce',
  serviceWorkers: 'block',
});
await contexto.addInitScript(() => {
  try { localStorage.setItem('spindlelab_consent', 'denied'); } catch (e) {}
});
const origen = new URL(BASE).origin;
await contexto.route('**/*', (r) => (new URL(r.request().url()).origin === origen ? r.continue() : r.abort()));
const pagina = await contexto.newPage();
const errores = [];
pagina.on('pageerror', (e) => errores.push(String(e.message ?? e)));

let pendientes;
const recorrerEnlaces = !opciones.rutas && !opciones.dist;
if (typeof opciones.rutas === 'string') pendientes = opciones.rutas.split(',').filter(Boolean);
else if (typeof opciones.dist === 'string') pendientes = rutasDeDist(path.resolve(opciones.dist)).filter((r) => !excluida(r));
else pendientes = ['/v3/'];
const vistas = new Set(pendientes);
const resultado = {};

while (pendientes.length) {
  const ruta = pendientes.shift();
  errores.length = 0;
  const res = await pagina.goto(BASE + ruta, { waitUntil: 'load' }).catch((e) => ({ status: () => 0, _e: e }));
  const estado = res?.status?.() ?? 0;
  if (estado !== 200) {
    resultado[ruta] = { estado };
    console.error(`  ${ruta}: HTTP ${estado}`);
    continue;
  }
  await pagina.evaluate(() => document.fonts && document.fonts.ready);
  await pagina.evaluate(() => document.querySelectorAll('details').forEach((d) => { d.open = true; }));
  await pagina.waitForTimeout(250);

  if (recorrerEnlaces) {
    const enlaces = await pagina.evaluate(() => [...document.querySelectorAll('a[href]')].map((a) => a.href));
    for (const h of enlaces) {
      let u;
      try { u = new URL(h); } catch { continue; }
      if (u.origin !== origen) continue;
      let p = u.pathname;
      if (!p.startsWith('/v3/') || /\.[a-z0-9]+$/i.test(p)) continue;
      if (!p.endsWith('/')) p += '/';
      if (excluida(p) || vistas.has(p)) continue;
      vistas.add(p);
      pendientes.push(p);
    }
  }

  const zonas = ZONAS.filter((z) => !z.ruta || new RegExp(z.ruta).test(ruta)).map(({ id, sel, cerrada }) => ({ id, sel, cerrada }));
  const crudo = await pagina.evaluate(extraerEnPagina, { zonas });

  const ranuras = crudo.ranuras.map((r) => ({
    clave: `${ruta}#${r.ancla}>${r.tag}:${r.n}`,
    tag: r.tag,
    texto: r.texto,
    hash: corto(r.texto),
    zonas: r.zonas,
    ...(r.oculto ? { oculto: true } : {}),
    ...(r.ariaOculto ? { ariaOculto: true } : {}),
  }));
  const atributos = crudo.atributos.map((a) => ({
    clave: `${ruta}#${a.ancla}>${a.tag}[${a.attr}]:${a.n}`,
    attr: a.attr,
    valor: a.valor,
    zonas: a.zonas,
    ...(a.oculto ? { oculto: true } : {}),
  }));
  const jsonld = [];
  const jsonldOtros = [];
  const jsonldErrores = [];
  crudo.jsonld.forEach((t, i) => {
    try {
      aplanar(JSON.parse(t), `ld${i}`, jsonld, jsonldOtros);
    } catch (e) {
      jsonldErrores.push({ script: i, error: String(e.message) });
    }
  });
  const zonasCerradas = {};
  for (const [id, z] of Object.entries(crudo.cerradas)) {
    const html = z.html.map(limpiarHtml).join('\n<!-- § -->\n');
    zonasCerradas[id] = { sel: z.sel, n: z.n, hash: corto(html, 12), hashTexto: corto(z.texto.join('\n'), 12), largo: html.length };
  }
  const precios = {};
  for (const r of ranuras) for (const m of r.texto.replace(/ /g, ' ').match(PRECIO) ?? []) precios[m] = (precios[m] ?? 0) + 1;

  resultado[ruta] = {
    estado,
    head: crudo.head,
    ranuras,
    atributos,
    jsonld,
    jsonldOtros,
    ...(jsonldErrores.length ? { jsonldErrores } : {}),
    zonasCerradas,
    invariantes: {
      formularios: crudo.formularios,
      idsChq: crudo.idsChq,
      precios: Object.fromEntries(Object.entries(precios).sort(([a], [b]) => a.localeCompare(b))),
    },
    ...(errores.length ? { erroresJs: [...errores] } : {}),
  };
  console.error(`  ${ruta}: ${ranuras.length} ranuras, ${atributos.length} atributos, ${jsonld.length} textos de JSON-LD${jsonldErrores.length ? `, ${jsonldErrores.length} JSON-LD sin parsear` : ''}`);
}
await navegador.close();

const rutas = Object.keys(resultado).sort();
const salida = {
  herramienta: 'e8/herramientas/extraer.mjs',
  base: BASE,
  ancho: ANCHO,
  alto: ALTO,
  excluidas: EXCLUIR,
  totales: {
    rutas: rutas.length,
    ranuras: rutas.reduce((t, r) => t + (resultado[r].ranuras?.length ?? 0), 0),
    atributos: rutas.reduce((t, r) => t + (resultado[r].atributos?.length ?? 0), 0),
    jsonld: rutas.reduce((t, r) => t + (resultado[r].jsonld?.length ?? 0), 0),
  },
  rutas: Object.fromEntries(rutas.map((r) => [r, resultado[r]])),
};
// El espacio duro queda escrito como   (JSON válido) para que se vea al leer el archivo.
fs.mkdirSync(path.dirname(SALIDA), { recursive: true });
fs.writeFileSync(SALIDA, JSON.stringify(salida, null, 2).replace(/ /g, '\\u00a0') + '\n');
console.error(`${rutas.length} rutas · ${salida.totales.ranuras} ranuras · ${salida.totales.atributos} atributos · ${salida.totales.jsonld} textos de JSON-LD → ${SALIDA}`);
if (ESPERADAS !== null && rutas.length !== ESPERADAS) {
  console.error(`Se esperaban ${ESPERADAS} rutas y salieron ${rutas.length}.`);
  process.exit(3);
}
