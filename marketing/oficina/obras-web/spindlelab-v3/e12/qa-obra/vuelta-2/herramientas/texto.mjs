// Javiera, QA de obra E12, vuelta 2 (sin cambios de método desde la vuelta 1). El texto de Clara, «tal cual»: por cada elemento de texto-obra.json (salvo los de
// uso «referencia», que son notas para el constructor) se busca su «texto» en la página construida: en el texto del
// documento (textContent, espacios colapsados) o en un atributo (alt, aria-label, placeholder, content, value, title).
// Lo que no aparece se lista para mirarlo uno por uno: puede ser un texto condicionado (estado de error, resultado del
// chequeo), uno que Clara dejó para otra pieza, o un cambio no declarado. Lo común («comun») se busca en la home.
// Uso: node texto.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { QA, REPO, servir, lanzar } from './comun.mjs';

const T = JSON.parse(readFileSync(join(REPO, 'marketing/oficina/obras-web/spindlelab-v3/e12/texto/texto-obra.json'), 'utf8'));
const norm = (s) => s.replace(/ /g, ' ').replace(/\s+/g, ' ').trim();
const elementos = (x, out = []) => {
  if (Array.isArray(x)) x.forEach((v) => elementos(v, out));
  else if (x && typeof x === 'object') {
    if (x.id && typeof x.texto === 'string') out.push(x);
    Object.values(x).forEach((v) => elementos(v, out));
  }
  return out;
};
const srv = await servir();
const nav = await lanzar();
const ctx = await nav.newContext({ viewport: { width: 1440, height: 900 } });
await ctx.addInitScript(() => { try { localStorage.setItem('spindlelab_consent', 'denied'); } catch (e) {} });
const p = await ctx.newPage();
const corpus = {};
async function leer(ruta) {
  if (corpus[ruta]) return corpus[ruta];
  await p.goto(srv.url + ruta, { waitUntil: 'networkidle' });
  corpus[ruta] = await p.evaluate(() => {
    const attrs = [];
    for (const e of document.querySelectorAll('*')) for (const a of ['alt', 'aria-label', 'placeholder', 'content', 'value', 'title', 'data-ir', 'data-pausar', 'data-seguir'])
      if (e.hasAttribute(a)) attrs.push(e.getAttribute(a));
    const ld = [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => s.textContent).join(' ');
    return { texto: document.body.textContent, head: document.title + ' ' + attrs.join(' | '), ld };
  });
  for (const k of Object.keys(corpus[ruta])) corpus[ruta][k] = norm(corpus[ruta][k]);
  return corpus[ruta];
}
const R = [];
const paginas = [{ id: 'comun', ruta: '/v3/', secciones: T.comun }, ...T.paginas];
for (const pg of paginas) {
  const c = await leer(pg.ruta);
  for (const e of elementos(pg.secciones)) {
    if (e.uso === 'referencia') continue;
    const t = norm(e.texto);
    const enTexto = c.texto.includes(t), enAttr = c.head.includes(t), enLd = c.ld.includes(t);
    R.push({ pagina: pg.id, ruta: pg.ruta, id: e.id, rol: e.rol, uso: e.uso || null, estado: e.estado, condicion: e.condicion || null, donde: e.donde || null, texto: t, ok: enTexto || enAttr, enTexto, enAttr, enLd });
  }
  // title y description
  if (pg.title) R.push({ pagina: pg.id, ruta: pg.ruta, id: `${pg.id}.title`, rol: 'title', texto: pg.title, ok: c.head.includes(norm(pg.title)) });
  if (pg.description) R.push({ pagina: pg.id, ruta: pg.ruta, id: `${pg.id}.description`, rol: 'description', texto: pg.description, ok: c.head.includes(norm(pg.description)) });
  process.stdout.write('.');
}
await nav.close(); await srv.cerrar();
writeFileSync(join(QA, 'crudos', 'texto.json'), JSON.stringify(R, null, 1));
const faltan = R.filter((r) => !r.ok);
console.log(`\n${R.length} textos de Clara buscados en ${paginas.length} páginas; ${R.length - faltan.length} aparecen tal cual; ${faltan.length} no.`);
for (const f of faltan) console.log(`✗ ${f.ruta} ${f.id} [${f.rol}${f.uso ? ' · ' + f.uso : ''} · ${f.estado}${f.condicion ? ' · condición: ' + String(f.condicion).slice(0, 60) : ''}] «${f.texto.slice(0, 110)}»`);
