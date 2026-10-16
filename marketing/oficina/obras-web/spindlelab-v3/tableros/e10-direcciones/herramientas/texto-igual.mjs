// texto-igual.mjs — el texto visible de cada prototipo E10 es el de la misma página en dist/v3 (Lucía, 16-oct-2026).
//
// Cómo se compara (en el navegador, a 1440 y a 390, con JavaScript apagado en las dos páginas para que el
// aviso de cookies y los scripts del sitio no cambien lo que se ve):
//   · Se recorren los nodos de texto visibles (checkVisibility), fuera de <script>, <noscript>, <template>.
//   · Cada nodo se agrupa en su ancestro «de texto» más externo (p, h1-h6, li, a, button, label, figcaption,
//     span, b, time…): ese es un FRAGMENTO, con su texto visible unido y los espacios normalizados. Envolver
//     palabras en un <span> (el marcador) no cambia el fragmento; reordenar bloques tampoco cambia el conjunto.
//   · Se compara el MULTICONJUNTO de fragmentos del build y del prototipo: tiene que ser idéntico. Se informa
//     además si el ORDEN de lectura es el mismo (la secuencia de caracteres sin espacios; los prototipos pueden
//     reordenar bloques: es composición).
//   · El placeholder del campo del chequeo se cuenta como fragmento (se ve).
// Excepciones declaradas (lo único que el prototipo agrega), cada una comprobada aparte:
//   · los rótulos «Foto por generar · F<n> · …» (data-rotulo-foto): tienen que empezar así;
//   · la cinta (data-cinta, aria-hidden): cada ítem tiene que estar LITERAL en la página publicada de origen.
//   · del build se excluye el aviso de cookies (#cookie-banner), que el encargo pide quitar.
//
// Sirve proto/ en 8770 y spindlelab-astro/dist en 8771 antes. Uso: node herramientas/texto-igual.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const AQUI = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const REPO = path.resolve(AQUI, '../../../../../..');
const DIST = path.join(REPO, 'spindlelab-astro/dist');
const { chromium } = await import(pathToFileURL(path.join(REPO, 'spindlelab-astro/node_modules/playwright/index.mjs')).href);
const PROTO = 'http://127.0.0.1:8770';
const BUILD = 'http://127.0.0.1:8771';

const PAGINAS = { home: '/v3/', 'acompanamiento-mensual': '/v3/servicios/acompanamiento-mensual/', trabajo: '/v3/trabajo/' };
const DIRS = ['taller', 'pizarra'];
const ANCHOS = [[1440, 900], [390, 844]];

function extraer() {
  const SEL = 'h1,h2,h3,h4,h5,h6,p,li,a,button,label,figcaption,span,b,strong,em,i,small,time,dt,dd,summary,th,td,caption,legend';
  const fuera = (el) => el.closest('script,style,noscript,template,[data-rotulo-foto],[data-cinta],#cookie-banner');
  const vis = (el) => el.checkVisibility({ visibilityProperty: true });
  const norm = (s) => s.replace(/\s+/g, ' ').trim();
  const visibleDe = (raiz) => {
    let t = ''; const w = document.createTreeWalker(raiz, NodeFilter.SHOW_TEXT);
    while (w.nextNode()) { const n = w.currentNode; const el = n.parentElement; if (el && !fuera(el) && vis(el)) t += n.data; }
    return norm(t);
  };
  const fragmentos = []; const vistos = new Set(); let orden = '';
  const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (tw.nextNode()) {
    const n = tw.currentNode; if (!n.data.trim()) continue;
    const el = n.parentElement; if (!el || fuera(el) || !vis(el)) continue;
    orden += n.data;
    let tope = null; for (let e = el; e && e !== document.body; e = e.parentElement) if (e.matches(SEL)) tope = e;
    if (tope) { if (!vistos.has(tope)) { vistos.add(tope); const t = visibleDe(tope); if (t) fragmentos.push(t); } }
    else fragmentos.push(norm(n.data));
  }
  for (const i of document.querySelectorAll('input[placeholder]')) if (vis(i)) fragmentos.push('placeholder: ' + i.placeholder);
  return {
    fragmentos, orden: orden.replace(/\s+/g, ''),
    rotulos: [...document.querySelectorAll('[data-rotulo-foto]')].map((e) => norm(e.textContent)),
    cintas: [...document.querySelectorAll('[data-cinta]')].map((c) => ({ clave: c.dataset.cinta,
      items: [...c.querySelector('.cinta__grupo').children].filter((s) => !s.classList.contains('cinta__sep')).map((s) => norm(s.textContent)) })),
    imagenes_d: [...document.images].filter((i) => /assets\/img\/d\//.test(i.getAttribute('src') || '')).length,
  };
}

function multiconjunto(a) { const m = new Map(); for (const x of a) m.set(x, (m.get(x) || 0) + 1); return m; }
function diferencia(a, b) { // lo que está en a y no en b (con repeticiones)
  const mb = multiconjunto(b); const out = [];
  for (const x of a) { const n = mb.get(x) || 0; if (n) mb.set(x, n - 1); else out.push(x); }
  return out;
}
// Texto publicado de una página del build (para comprobar la cinta): sin etiquetas, con entidades básicas.
function textoPublicado(rel) {
  const h = fs.readFileSync(path.join(DIST, rel), 'utf8').replace(/<script\b[\s\S]*?<\/script>/g, ' ').replace(/<style\b[\s\S]*?<\/style>/g, ' ');
  return h.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/\s+/g, ' ');
}
const ORIGEN_CINTA = {
  'taller-home': 'v3/index.html',
  'taller-acompanamiento': 'v3/servicios/acompanamiento-mensual/index.html',
  'pizarra-home': 'v3/blog/21-chequeos-visibilidad-ia/index.html',
};

const nav = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const salida = { fecha: new Date().toISOString(), metodo: 'herramientas/texto-igual.mjs (ver la cabecera)', resultado: null, paginas: [] };
let todo = true;
for (const [nombre, ruta] of Object.entries(PAGINAS)) {
  for (const [w, h] of ANCHOS) {
    const ctxB = await nav.newContext({ viewport: { width: w, height: h }, javaScriptEnabled: false });
    const pb = await ctxB.newPage(); await pb.goto(BUILD + ruta, { waitUntil: 'networkidle' });
    const base = await pb.evaluate(extraer); await ctxB.close();
    for (const d of DIRS) {
      const ctxP = await nav.newContext({ viewport: { width: w, height: h }, javaScriptEnabled: false });
      const pp = await ctxP.newPage(); await pp.goto(`${PROTO}/${d}/${nombre}.html`, { waitUntil: 'networkidle' });
      const pr = await pp.evaluate(extraer); await ctxP.close();
      const faltan = diferencia(base.fragmentos, pr.fragmentos);
      const sobran = diferencia(pr.fragmentos, base.fragmentos);
      const rotulosOk = pr.rotulos.every((r) => /^Foto por generar · F\d+ · \S/.test(r));
      const cintas = pr.cintas.map((c) => {
        const pub = textoPublicado(ORIGEN_CINTA[c.clave]);
        const ausentes = c.items.filter((i) => !pub.includes(i));
        return { ...c, origen: 'spindlelab-astro/dist/' + ORIGEN_CINTA[c.clave], todos_publicados: ausentes.length === 0, ausentes };
      });
      const iguales = faltan.length === 0 && sobran.length === 0;
      const ok = iguales && rotulosOk && cintas.every((c) => c.todos_publicados) && pr.imagenes_d === 0;
      if (!ok) todo = false;
      salida.paginas.push({
        direccion: d, pagina: nombre, ancho: w, prototipo: `proto/${d}/${nombre}.html`, build: `dist${ruta}index.html`,
        texto_igual: iguales, fragmentos_build: base.fragmentos.length, fragmentos_prototipo: pr.fragmentos.length,
        faltan, sobran, mismo_orden_de_lectura: base.orden === pr.orden,
        excepciones: { rotulos_foto: pr.rotulos, rotulos_bien_formados: rotulosOk, cinta: cintas },
        fotos_viejas_assets_img_d: pr.imagenes_d, ok,
      });
      console.log(ok ? 'ok  ' : 'MAL ', d, nombre, w, `fragmentos ${base.fragmentos.length}/${pr.fragmentos.length}`,
        iguales ? 'texto igual' : `faltan ${faltan.length} sobran ${sobran.length}`, base.orden === pr.orden ? 'mismo orden' : 'orden reordenado',
        `rótulos ${pr.rotulos.length}`, cintas.map((c) => `cinta ${c.clave} ${c.todos_publicados ? 'publicada' : 'NO: ' + c.ausentes.join(' | ')}`).join(' '));
      if (!iguales) { console.log('   faltan:', JSON.stringify(faltan.slice(0, 8))); console.log('   sobran:', JSON.stringify(sobran.slice(0, 8))); }
    }
  }
}
await nav.close();
salida.resultado = todo ? 'IGUAL: en las 12 vistas (3 páginas × 2 direcciones × 2 anchos) el texto visible es el del build; solo se agregan los rótulos de foto y la cinta, comprobados aparte' : 'HAY DIFERENCIAS: ver «faltan» y «sobran»';
fs.writeFileSync(path.join(AQUI, 'texto-igual.json'), JSON.stringify(salida, null, 1));
console.log(salida.resultado);
process.exit(todo ? 0 : 1);
