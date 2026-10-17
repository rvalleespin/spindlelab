// E12 · compuerta 2 · El texto visible de A contra el de B, vista por vista (encargo del paso 2, criterio 14: «el mismo
// en A y en B: diff del texto visible de cada par de vistas, cero, o cada diferencia listada en el tablero con su
// motivo»). Lucía, 17-oct-2026.
//
// Sirve la carpeta del tablero en 127.0.0.1 (puerto libre), abre cada vista de proto/a y de proto/b a 1440 y a 390 con
// movimiento reducido (para que la cinta y los videos no cambien el texto mientras se lee) y junta cada nodo de texto
// que se ve (checkVisibility), sin la telemetría que cambia sola (la hora, [data-hora] y [data-reloj], y el peso de la
// visita, [data-visita]). Compara las palabras (minúsculas, sin signos) de A contra las de B y anota, por cada palabra
// que solo está en un lado, los trozos de texto donde aparece. No sale a la red: las vistas que piden algo de afuera
// fallan en silencio y eso no cambia su texto.
//
// Escribe datos/diferencias-texto.json, que armar-tablero.py lee y explica.
// Uso: node herramientas/diferencias-texto.mjs
import fs from 'node:fs';
import net from 'node:net';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const BASE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const REPO = path.resolve(BASE, '../../../../../..');
const { chromium } = await import(pathToFileURL(path.join(REPO, 'spindlelab-astro/node_modules/playwright/index.mjs')).href);
const puerto = await new Promise((res) => { const s = net.createServer(); s.listen(0, '127.0.0.1', () => { const p = s.address().port; s.close(() => res(p)); }); });
const srv = spawn('python3', ['-I', '-m', 'http.server', String(puerto), '--bind', '127.0.0.1', '--directory', BASE], { stdio: 'ignore' });
await new Promise((r) => setTimeout(r, 900));
const nav = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const VISTAS = [['home', ''], ['trabajo', 'trabajo/'], ['praxi', 'trabajo/praxi/'], ['sesenta', 'trabajo/sesenta/'], ['desarrollo-web', 'servicios/desarrollo-web/']];

async function trozos(url, ancho) {
  const ctx = await nav.newContext({ viewport: { width: ancho, height: ancho < 768 ? 844 : 900 }, reducedMotion: 'reduce', timezoneId: 'America/Santiago' });
  await ctx.route((u) => !u.href.startsWith(`http://127.0.0.1:${puerto}/`), (r) => r.abort());
  const pg = await ctx.newPage();
  await pg.goto(url, { waitUntil: 'load' });
  await pg.waitForTimeout(400);
  const t = await pg.evaluate(() => {
    const BLOQUE = 'p,li,td,th,dd,dt,h1,h2,h3,h4,h5,h6,figcaption,button,label,summary,caption,legend,a';
    const vistos = new Map();
    const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let n;
    while ((n = w.nextNode())) {
      const p = n.parentElement;
      if (!p || p.closest('script,style,noscript,template,[data-hora],[data-reloj],[data-visita]')) continue;
      if (!n.textContent.trim()) continue;
      if (!p.checkVisibility({ checkVisibilityCSS: true })) continue;
      const b = p.closest(BLOQUE) || p;
      if (!vistos.has(b)) {
        const c = b.cloneNode(true);
        c.querySelectorAll('[data-hora],[data-reloj],[data-visita],script,style').forEach((x) => x.remove());
        vistos.set(b, { texto: c.textContent.replace(/\s+/g, ' ').trim(), palabras: [] });
      }
      vistos.get(b).palabras.push(n.textContent);
    }
    return [...vistos.values()].map((v) => ({ texto: v.texto, propio: v.palabras.join(' ').replace(/\s+/g, ' ').trim() }));
  });
  await ctx.close();
  return t;
}
const palabras = (s) => s.toLowerCase().normalize('NFC').replace(/[^\p{L}\p{N}]+/gu, ' ').trim().split(' ').filter(Boolean);

const salida = { fecha: new Date().toISOString(), medidoPor: 'Lucía, herramientas/diferencias-texto.mjs', navegador: nav.version(), anchos: [1440, 390], vistas: {} };
for (const [id, ruta] of VISTAS) {
  const lado = {};
  for (const d of ['a', 'b']) {
    const t = [...(await trozos(`http://127.0.0.1:${puerto}/proto/${d}/${ruta}`, 1440)), ...(await trozos(`http://127.0.0.1:${puerto}/proto/${d}/${ruta}`, 390))];
    const cuenta = new Map();
    t.forEach((x) => palabras(x.propio).forEach((p) => cuenta.set(p, (cuenta.get(p) || 0) + 1)));
    lado[d] = { trozos: t, cuenta };
  }
  const solo = (x, y) => [...lado[x].cuenta.keys()].filter((k) => !lado[y].cuenta.has(k)).sort();
  const contexto = (d, ws) => {
    const out = [];
    for (const tr of lado[d].trozos) {
      const ps = new Set(palabras(tr.propio));
      if (ws.some((w) => ps.has(w)) && !out.includes(tr.texto)) out.push(tr.texto);
    }
    return out.sort();
  };
  const soloA = solo('a', 'b');
  const soloB = solo('b', 'a');
  salida.vistas[id] = {
    palabrasA: [...lado.a.cuenta.values()].reduce((x, y) => x + y, 0),
    palabrasB: [...lado.b.cuenta.values()].reduce((x, y) => x + y, 0),
    soloA, soloB,
    dondeA: contexto('a', soloA),
    dondeB: contexto('b', soloB),
  };
  console.log(id, 'solo A', soloA.length, 'solo B', soloB.length);
}
await nav.close();
srv.kill();
fs.writeFileSync(path.join(BASE, 'datos', 'diferencias-texto.json'), JSON.stringify(salida, null, 1) + '\n');
console.log('→ datos/diferencias-texto.json');
