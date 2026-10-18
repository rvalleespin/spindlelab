// QA E12 paso 2, vuelta 1 (Javiera). Compara el texto de Clara (texto-paso2.json) y el de Bruno (06-sesenta/caso.md)
// con el DOM de las diez vistas, y el texto de A contra el de B.
// Uso: node texto.mjs <base-url-de-e12-direcciones> <texto-paso2.json> <caso.md de Sesenta> <salida.json>
import { pathToFileURL } from 'node:url';
import fs from 'node:fs';
const { chromium } = await import(pathToFileURL('/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs').href);
const [base, rutaJson, rutaCaso, salida] = process.argv.slice(2);
const clara = JSON.parse(fs.readFileSync(rutaJson, 'utf8'));
const norm = (s) => String(s).replace(/[   ]/g, ' ').replace(/\s+/g, ' ').trim();

const VISTAS = { home: 'home', trabajo: 'trabajo', 'caso-praxi': 'praxi', 'desarrollo-web': 'desarrollo-web' };
const RUTA = { home: '', trabajo: 'trabajo/', praxi: 'trabajo/praxi/', sesenta: 'trabajo/sesenta/', 'desarrollo-web': 'servicios/desarrollo-web/' };

const nav = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
async function leer(dir, vista, ancho) {
  const ctx = await nav.newContext({ viewport: { width: ancho, height: 900 } });
  const p = await ctx.newPage();
  await p.goto(`${base}/proto/${dir}/${RUTA[vista]}`, { waitUntil: 'load' });
  await p.waitForTimeout(800);
  const r = await p.evaluate(() => {
    const clon = document.body.cloneNode(true);
    clon.querySelectorAll('script,style,noscript,template').forEach((e) => e.remove());
    const attrs = [];
    document.querySelectorAll('[alt],[aria-label],[title],[placeholder]').forEach((e) => ['alt', 'aria-label', 'title', 'placeholder'].forEach((a) => { const v = e.getAttribute(a); if (v) attrs.push(v); }));
    const visible = document.body.innerText;
    return { tc: clon.textContent, attrs, titulo: document.title, desc: (document.querySelector('meta[name="description"]') || {}).content || '', visible };
  });
  await ctx.close();
  return r;
}

// elementos de Clara por página (solo la opción de hero recomendada)
function elementos(pagina) {
  const out = [];
  const rec = (o, opcionNoRecomendada) => {
    if (Array.isArray(o)) { o.forEach((x) => rec(x, opcionNoRecomendada)); return; }
    if (!o || typeof o !== 'object') return;
    if (o.opciones) { o.opciones.forEach((op) => rec(op.elementos || [], !op.recomendada)); }
    if (o.rol && !opcionNoRecomendada) out.push(o);
    for (const [k, v] of Object.entries(o)) if (k !== 'opciones' && typeof v === 'object') rec(v, opcionNoRecomendada);
  };
  rec(pagina.secciones || [], false);
  return out;
}
function piezas(e) {
  const ps = [];
  if (e.tinta) ps.push(['tinta', e.tinta]);
  if (e.gris) ps.push(['gris', e.gris]);
  if (!e.tinta && e.texto) ps.push(['texto', e.texto]);
  if (e.campos) e.campos.forEach((c) => { ps.push(['rotulo', c.rotulo]); ps.push(['valor', c.valor]); });
  if (e.items) e.items.forEach((it) => ps.push(['item', it]));
  return ps;
}

const res = { fecha: new Date().toISOString(), paginas: {} };
const lecturas = {};
for (const dir of ['a', 'b']) for (const v of Object.keys(RUTA)) {
  lecturas[`${dir}-${v}`] = await leer(dir, v, 1440);
  lecturas[`${dir}-${v}-390`] = await leer(dir, v, 390);
}
for (const pg of clara.paginas) {
  const vista = VISTAS[pg.id];
  const fila = { title: pg.title, description: pg.description, faltan: { a: [], b: [] }, total: 0 };
  for (const dir of ['a', 'b']) {
    const L = lecturas[`${dir}-${vista}`], L2 = lecturas[`${dir}-${vista}-390`];
    const todo = norm(L.tc + ' ' + L2.tc + ' ' + L.attrs.join(' ') + ' ' + L2.attrs.join(' '));
    if (norm(L.titulo) !== norm(pg.title)) fila.faltan[dir].push({ id: 'title', esperado: pg.title, hay: L.titulo });
    if (norm(L.desc) !== norm(pg.description)) fila.faltan[dir].push({ id: 'description', esperado: pg.description, hay: L.desc });
    for (const e of elementos(pg)) {
      for (const [parte, txt] of piezas(e)) {
        if (dir === 'a') fila.total++;
        if (!todo.includes(norm(txt))) fila.faltan[dir].push({ id: e.id, parte, texto: norm(txt).slice(0, 160), condicion: !!e.condicion || !!(e.campos || []).find((c) => c.condicion && c.valor === txt), alternativa: !!e.alternativa });
      }
    }
    // entradas del índice
    if (pg.entradas) for (const en of pg.entradas) for (const [parte, txt] of [['nombre', en.nombre], ['bajada', en.bajada], ['linea', en.linea], ['linea_corta', en.linea_corta], ['resultado', en.resultado]]) {
      if (!txt) continue;
      if (dir === 'a') fila.total++;
      if (!todo.includes(norm(txt))) fila.faltan[dir].push({ id: `entrada.${en.id}`, parte, texto: norm(txt).slice(0, 160) });
    }
  }
  res.paginas[pg.id] = fila;
}
// Sesenta: párrafos de caso.md (las líneas de texto corrido) contra A y B
const caso = fs.readFileSync(rutaCaso, 'utf8').split('\n').map((l) => l.replace(/^[-*>#|\s]+/, '').replace(/\*\*/g, '').replace(/`/g, '').trim()).filter((l) => l.length > 40 && !l.includes('|'));
res.sesenta = { lineas: caso.length, faltan: { a: [], b: [] } };
for (const dir of ['a', 'b']) {
  const L = lecturas[`${dir}-sesenta`];
  const todo = norm(L.tc + ' ' + L.attrs.join(' '));
  for (const l of caso) if (!todo.includes(norm(l))) res.sesenta.faltan[dir].push(norm(l).slice(0, 160));
}
// A contra B: oraciones del texto visible
const oraciones = (s) => new Set(norm(s.replace(/\n+/g, ' \n ')).split(/(?<=[.!?…:])\s+|\s\n\s/).map(norm).filter((x) => x.length > 3));
res.aContraB = {};
for (const v of Object.keys(RUTA)) {
  const A = oraciones(lecturas[`a-${v}`].visible), B = oraciones(lecturas[`b-${v}`].visible);
  res.aContraB[v] = { soloA: [...A].filter((x) => !B.has(x)), soloB: [...B].filter((x) => !A.has(x)) };
}
// rayas, preguntas y voseo en el texto visible
res.tics = {};
for (const [k, L] of Object.entries(lecturas)) {
  const t = L.visible;
  res.tics[k] = {
    rayas: (t.match(/.{0,40}[—–].{0,40}/g) || []).slice(0, 20),
    preguntas: (t.match(/¿[^?]{0,80}\?/g) || []).slice(0, 20),
    voseo: (t.match(/\b(tenés|podés|querés|sabés|hacés|vos)\b/gi) || []),
    usted: (t.match(/\b(usted|su sitio|le escribimos)\b/gi) || []),
    folleto: (t.match(/\b(impuls\w+|potenci\w+|transform\w+|revolucion\w+|maximiz\w+|soluciones a tu medida|siguiente nivel|¿listo para|en un mundo|hoy más que nunca|socio estratégico|no solo)\b/gi) || []),
  };
}
fs.writeFileSync(salida, JSON.stringify(res, null, 1));
await nav.close();
for (const [k, f] of Object.entries(res.paginas)) console.log(k, 'elementos', f.total, 'faltan A', f.faltan.a.length, 'faltan B', f.faltan.b.length);
console.log('sesenta lineas', res.sesenta.lineas, 'faltan A', res.sesenta.faltan.a.length, 'B', res.sesenta.faltan.b.length);
for (const [k, d] of Object.entries(res.aContraB)) console.log('A/B', k, 'soloA', d.soloA.length, 'soloB', d.soloB.length);
