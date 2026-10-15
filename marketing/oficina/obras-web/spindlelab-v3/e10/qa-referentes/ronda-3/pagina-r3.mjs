// QA ronda 3 · referentes.html · desborde, imágenes, contraste, foco y contrato del script de db
// Uso: node pagina-r3.mjs <carpeta-salida> (con python3 -m http.server 8765 sirviendo ../../referentes)
import { chromium } from '/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs';
import fs from 'node:fs';
const OUT = process.argv[2];
const BASE = 'http://127.0.0.1:8765/';
const crudo = fs.readFileSync(new URL('../../referentes/referentes.html', import.meta.url), 'utf8');
// Esqueleto como lo pone el Artifact al publicar: doctype, charset y viewport
const esqueleto = '<!doctype html><html><head><meta charset=utf8><meta name=viewport content="width=device-width,initial-scale=1,viewport-fit=cover"><style>*,*::before,*::after{box-sizing:border-box}body{margin:0}</style></head><body>' + crudo + '</body></html>';
const nav = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const res = {};

async function abrir({ ancho, alto = 900, esquema = 'light', modo = 'esqueleto', init = null, dsf = 1 }) {
  const ctx = await nav.newContext({ viewport: { width: ancho, height: alto }, colorScheme: esquema, deviceScaleFactor: dsf });
  const p = await ctx.newPage();
  const errores = []; p.on('pageerror', e => errores.push(String(e))); p.on('console', m => { if (m.type() === 'error') errores.push(m.text()); });
  if (init) await p.addInitScript(init);
  if (modo === 'esqueleto') {
    await p.route(BASE + 'esqueleto.html', r => r.fulfill({ status: 200, contentType: 'text/html; charset=utf-8', body: esqueleto }));
    await p.goto(BASE + 'esqueleto.html', { waitUntil: 'load' });
  } else {
    await p.goto(BASE + 'referentes.html', { waitUntil: 'load' });
  }
  return { ctx, p, errores };
}
async function recorrer(p) {
  await p.evaluate(async () => { for (let y = 0; y < document.documentElement.scrollHeight; y += 400) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 40)); } window.scrollTo(0, 0); });
  await p.waitForTimeout(800);
}
const medirDesborde = p => p.evaluate(() => {
  const de = document.documentElement, cw = de.clientWidth;
  const fuera = [...document.querySelectorAll('body *')].filter(e => { const r = e.getBoundingClientRect(); return r.width && (r.right > cw + 0.5 || r.left < -0.5); }).slice(0, 8).map(e => e.tagName + '.' + e.className + ' ' + Math.round(e.getBoundingClientRect().right));
  return { scrollWidth: de.scrollWidth, clientWidth: cw, bodyScroll: document.body.scrollWidth, fuera };
});

// 1 · Desborde: crudo (como pide el encargo) y con esqueleto, a 390/768/1440, claro y oscuro, con y sin <details> abiertos
for (const modo of ['crudo', 'esqueleto']) for (const ancho of [390, 768, 1440]) for (const esquema of ['light', 'dark']) {
  if (modo === 'crudo' && esquema === 'dark') continue;
  const { ctx, p } = await abrir({ ancho, esquema, modo });
  await recorrer(p);
  const cerrado = await medirDesborde(p);
  await p.evaluate(() => document.querySelectorAll('details').forEach(d => d.open = true));
  await recorrer(p);
  const abierto = await medirDesborde(p);
  const imgs = await p.evaluate(() => { const a = [...document.images]; return { total: a.length, cargadas: a.filter(i => i.complete && i.naturalWidth > 0).length, rotas: a.filter(i => !(i.complete && i.naturalWidth > 0)).map(i => i.getAttribute('src')) }; });
  res[`desborde-${modo}-${ancho}-${esquema}`] = { cerrado, abierto, imgs };
  if (modo === 'esqueleto') {
    await p.evaluate(() => document.querySelectorAll('details').forEach(d => d.open = false));
    await p.screenshot({ path: `${OUT}/pagina-${ancho}-${esquema}.png`, fullPage: ancho === 390, clip: ancho === 390 ? { x: 0, y: 0, width: 390, height: 3200 } : undefined });
  }
  await ctx.close();
}

// 2 · Contraste de cada nodo de texto (fondos de la página son opacos y planos: se sube por los ancestros)
for (const esquema of ['light', 'dark']) {
  const { ctx, p } = await abrir({ ancho: 390, esquema });
  await p.evaluate(() => document.querySelectorAll('details').forEach(d => d.open = true));
  // un botón presionado de cada tipo para medir sus estados
  await p.evaluate(() => { const b = document.querySelectorAll('.v'); b[0].setAttribute('aria-pressed', 'true'); b[3].setAttribute('aria-pressed', 'true'); document.getElementById('sin-db').hidden = false; });
  res[`contraste-${esquema}`] = await p.evaluate(() => {
    const rgb = s => { const m = s.match(/[\d.]+/g).map(Number); return { r: m[0], g: m[1], b: m[2], a: m.length > 3 ? m[3] : 1 }; };
    const lum = c => { const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b); };
    const fondo = el => { for (let e = el; e; e = e.parentElement) { const c = rgb(getComputedStyle(e).backgroundColor); if (c.a > 0.99) return c; } return rgb(getComputedStyle(document.body).backgroundColor); };
    const out = {}; const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let n; while ((n = w.nextNode())) {
      const el = n.parentElement; if (!n.textContent.trim() || el.closest('script,style,.sr')) continue;
      const cs = getComputedStyle(el); if (el.disabled) continue;
      const t = rgb(cs.color), f = fondo(el); const L1 = lum(t), L2 = lum(f);
      const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
      const k = `${cs.color} sobre rgb(${f.r},${f.g},${f.b}) · ${cs.fontSize}`;
      if (!out[k]) out[k] = { ratio: +ratio.toFixed(2), ej: (el.className || el.tagName) + ': ' + n.textContent.trim().slice(0, 30), n: 0 };
      out[k].n++;
    }
    // placeholder del textarea
    const ta = document.querySelector('textarea'); const ph = getComputedStyle(ta, '::placeholder').color;
    out['placeholder ' + ph] = { nota: 'color del placeholder' };
    return out;
  });
  await ctx.close();
}

// 3 · Recorrido con Tab: los primeros 14 destinos y su indicador de foco
{
  const { ctx, p } = await abrir({ ancho: 390 });
  const pasos = [];
  for (let i = 0; i < 14; i++) {
    await p.keyboard.press('Tab');
    pasos.push(await p.evaluate(() => { const e = document.activeElement; const cs = getComputedStyle(e); return `${e.tagName}${e.className ? '.' + e.className : ''} «${(e.textContent || e.placeholder || '').trim().slice(0, 24)}» outline:${cs.outlineStyle} ${cs.outlineWidth} ${cs.outlineColor}`; }));
  }
  res.tab = pasos;
  await ctx.close();
}

// 4 · Sin window.claude (página fuera del visor): aviso visible y controles deshabilitados
{
  const { ctx, p, errores } = await abrir({ ancho: 390 });
  await p.waitForTimeout(500);
  res.sinClaude = await p.evaluate(() => ({ aviso: !document.getElementById('sin-db').hidden, botonesDeshabilitados: [...document.querySelectorAll('.v')].every(b => b.disabled), textareasDeshabilitadas: [...document.querySelectorAll('textarea')].every(t => t.disabled) }));
  res.sinClaude.errores = errores;
  await ctx.close();
}

// 5 · Con un db simulado que sigue el contrato: snapshot inmediato con escrituras pendientes, confirmación a los 300 ms
const simulado = (opciones) => `
  (() => {
    const O = ${JSON.stringify(opciones)};
    const log = window.__log = { use: [], subs: 0, sets: [], enVuelo: {}, maxEnVuelo: 0, errores: [] };
    const docs = { 'd1-olsonkundig': { voto: 'si', comentario: 'me gusta el pardo' } };
    const oyentes = [];
    const emitir = () => { const snap = { docs: Object.entries(docs).map(([id, b]) => ({ id, exists: true, data: () => Object.freeze({ ...b }), metadata: { fromCache: false, hasPendingWrites: false } })), size: Object.keys(docs).length, empty: false, docChanges: () => [], metadata: { fromCache: false, hasPendingWrites: false } }; oyentes.forEach(f => setTimeout(() => f(snap), 0)); };
    const db = Object.freeze({
      collection: (c) => Object.freeze({
        onSnapshot: (next, err) => { log.subs++; oyentes.push(next); emitir(); return () => {}; },
        doc: (id) => Object.freeze({ set: (body) => {
          log.sets.push({ t: Math.round(performance.now()), id, body: JSON.parse(JSON.stringify(body)) });
          log.enVuelo[id] = (log.enVuelo[id] || 0) + 1; log.maxEnVuelo = Math.max(log.maxEnVuelo, log.enVuelo[id]);
          if (O.rechazar) { log.enVuelo[id]--; return Promise.reject({ code: 'invalid_argument', message: 'below level' }); }
          docs[id] = body; emitir();
          return new Promise(r => setTimeout(() => { log.enVuelo[id]--; emitir(); r(); }, 300));
        } }),
      }),
    });
    const user = Object.freeze({ can: async () => O.puede });
    window.claude = { use: (n) => { log.use.push(n); return new Promise(r => setTimeout(() => r(n === 'db' ? db : n === 'user' ? user : null), 60)); } };
  })();`;
{
  const { ctx, p, errores } = await abrir({ ancho: 390, init: simulado({ puede: null, rechazar: false }) });
  await p.waitForTimeout(2000);
  const alCargar = await p.evaluate(() => ({ sets: window.__log.sets.length, subs: window.__log.subs, use: window.__log.use, r11: document.getElementById('r11').dataset.voto, c11: document.getElementById('c-d1-olsonkundig').value, marcados: document.getElementById('n-marcados').textContent, aviso: !document.getElementById('sin-db').hidden }));
  // clic en Sí del 1
  await p.click('#r1 .v[data-v="si"]'); await p.waitForTimeout(700);
  // doble clic rápido en Sí del 2 (marca y desmarca): dos escrituras, nunca simultáneas
  await p.click('#r2 .v[data-v="si"]'); await p.click('#r2 .v[data-v="si"]'); await p.waitForTimeout(1200);
  // comentario en el 3: se escribe, pausa, y una sola escritura; luego blur sin cambios: ninguna
  await p.fill('#c-a5-priyaparker', 'el retrato sí, el amarillo no'); await p.waitForTimeout(1800);
  await p.click('#r3 h3'); await p.waitForTimeout(600);
  // comentario en 4 y clic inmediato en No del 4 (blur + clic): dos escrituras en fila, la segunda conserva el comentario
  await p.fill('#c-b1-nickparker', 'la letra sí'); await p.click('#r4 .v[data-v="no"]'); await p.waitForTimeout(1500);
  const despues = await p.evaluate(() => ({ sets: window.__log.sets, maxEnVuelo: window.__log.maxEnVuelo, subs: window.__log.subs, cuenta: ['n-marcados', 'n-si', 'n-no'].map(i => document.getElementById(i).textContent), r2: document.getElementById('r2').dataset.voto, estado4: document.querySelector('#r4 .ref__estado').textContent }));
  res.dbSimulado = { alCargar, despues, errores };
  await p.screenshot({ path: `${OUT}/pagina-390-con-marcas.png`, clip: { x: 0, y: 0, width: 390, height: 2400 } });
  await ctx.close();
}
for (const [nombre, o] of [['dbSinPermiso', { puede: false, rechazar: false }], ['dbRechaza', { puede: null, rechazar: true }]]) {
  const { ctx, p } = await abrir({ ancho: 390, init: simulado(o) });
  await p.waitForTimeout(800);
  if (o.rechazar) { await p.click('#r1 .v[data-v="si"]'); await p.waitForTimeout(500); }
  res[nombre] = await p.evaluate(() => ({ sets: window.__log.sets.length, subs: window.__log.subs, aviso: !document.getElementById('sin-db').hidden, deshabilitados: [...document.querySelectorAll('.v')].every(b => b.disabled), estado1: document.querySelector('#r1 .ref__estado').textContent }));
  await ctx.close();
}
fs.writeFileSync(`${OUT}/medicion-r3.json`, JSON.stringify(res, null, 1));
await nav.close();
console.log(JSON.stringify(res, null, 1));
