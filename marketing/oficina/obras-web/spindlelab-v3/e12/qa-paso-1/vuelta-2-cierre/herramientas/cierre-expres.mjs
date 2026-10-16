// QA E12 paso 1, vuelta 2 · cierre exprés (Javiera, 16-oct-2026). Comprueba en el render los cuatro defectos de texto
// (15 a 18) que el commit 7e9f380 dice cerrar, sin leer el razonamiento de quien los cerró.
//
// 1. Sirve tableros/e12-laboratorio con `python3 -m http.server` en un puerto libre de 127.0.0.1 y envuelve
//    tablero.html como lo envuelve el publicador (doctype, head, body) interceptando su respuesta: el archivo sale
//    del servidor, no de una copia.
// 2. A 360 y 390 (táctil, dpr 2), 768 y 1440: desborde medido en la página (scrollWidth contra clientWidth), número
//    de h1, y el texto visible: que estén las frases nuevas y no las viejas.
// 3. A 390 y 1440: captura de cada elemento tocado (pie de la tabla de A&P, fila del cobalto, fila del cursor y la
//    línea de «No tomamos»), con su propio desborde y el contraste de su texto sobre su fondo real.
// 4. Apaga el servidor y comprueba que el puerto quedó libre.
// Uso: node cierre-expres.mjs <salida.json> <carpeta-capturas>
import fs from 'node:fs';
import net from 'node:net';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { pathToFileURL } from 'node:url';
const { chromium } = await import(pathToFileURL('/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs').href);

const [salida, capturas] = process.argv.slice(2);
fs.mkdirSync(capturas, { recursive: true });
const BASE = '/home/user/spindlelab/marketing/oficina/obras-web/spindlelab-v3/tableros/e12-laboratorio';

const libre = () => new Promise(r => { const s = net.createServer(); s.listen(0, '127.0.0.1', () => { const p = s.address().port; s.close(() => r(p)); }); });
const PUERTO = await libre();
const URL_T = `http://127.0.0.1:${PUERTO}/tablero.html`;
const servidor = spawn('python3', ['-I', '-m', 'http.server', String(PUERTO), '--bind', '127.0.0.1', '--directory', BASE], { stdio: 'ignore' });
for (let i = 0; i < 40; i++) { try { if ((await fetch(URL_T)).ok) break; } catch (e) {} await new Promise(r => setTimeout(r, 150)); }

const R = { fecha: new Date().toISOString(), puerto: PUERTO, anchos: {}, elementos: {} };
const nav = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', proxy: process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY, bypass: '127.0.0.1' } : undefined });
R.navegador = nav.version();

const FRASES = {
  nuevas: {
    d15: 'Filetes de 1 px: en las etiquetas de cada pieza y en una tabla.',
    d17_cita: '«únicamente para estados activos, cursores magnéticos y telemetría de código vivo»',
    d17_no: 'Magnético, no: el círculo va donde va el puntero; ni Koto ni A&P lo atraen',
    d18: 'la de Koto llega al 90 % en menos de un tercio de lo que tarda la de A&P (261 contra 850 ms)',
  },
  viejas: {
    d15: 'El único lugar con filetes de 1 px',
    d17: 'para estados activos, cursor y telemetría viva',
    d18: 'una cuarta parte',
  },
};
const ELEMENTOS = {
  'ap-filetes-pie': `figure:has(img[src="img/ap-tabla-filetes.jpg"])`,
  'brief-cobalto': `ol.puntos > li:has-text("cursores magnéticos")`,
  'brief-cursor': `ol.puntos > li:has-text("Ver despliegue")`,
  'no-tomamos-261-850': `.dos-listas li:has-text("261 contra 850")`,
};

const ANCHOS = [
  { w: 360, ctx: { viewport: { width: 360, height: 800 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true } },
  { w: 390, ctx: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true }, capturas: true },
  { w: 768, ctx: { viewport: { width: 768, height: 1024 } } },
  { w: 1440, ctx: { viewport: { width: 1440, height: 900 } }, capturas: true },
];

for (const a of ANCHOS) {
  const ctx = await nav.newContext({ timezoneId: 'America/Santiago', locale: 'es-CL', ...a.ctx });
  await ctx.route(URL_T, async r => {
    const resp = await r.fetch();
    const crudo = await resp.text();
    const corte = crudo.indexOf('<div class="marco">');
    const envuelto = `<!doctype html><html lang="es-CL"><head>${crudo.slice(0, corte)}</head><body>${crudo.slice(corte)}</body></html>`;
    await r.fulfill({ response: resp, body: envuelto, headers: { ...resp.headers(), 'content-type': 'text/html; charset=utf-8' } });
  });
  const p = await ctx.newPage();
  const errores = [];
  p.on('pageerror', e => errores.push('página: ' + String(e)));
  p.on('response', r => { if (r.status() >= 400) errores.push(r.status() + ' ' + r.url()); });
  await p.goto(URL_T, { waitUntil: 'load', timeout: 60000 });
  await p.evaluate(() => document.fonts.ready);
  // bajar la página entera para que carguen las imágenes diferidas, y volver arriba
  await p.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight / 2) { scrollTo(0, y); await new Promise(r => setTimeout(r, 40)); }
    scrollTo(0, 0);
  });
  await p.waitForTimeout(400);
  const m = await p.evaluate(({ nuevas, viejas }) => {
    const de = document.documentElement;
    const texto = document.body.innerText.replace(/\s+/g, ' ');
    return {
      scrollWidth: de.scrollWidth, clientWidth: de.clientWidth, desborde: de.scrollWidth > de.clientWidth,
      h1: document.querySelectorAll('h1').length,
      nuevasPresentes: Object.fromEntries(Object.entries(nuevas).map(([k, v]) => [k, texto.includes(v)])),
      viejasPresentes: Object.fromEntries(Object.entries(viejas).map(([k, v]) => [k, texto.includes(v)])),
      rayasEnTextoVisible: (texto.match(/[—–]/g) || []).length,
      magnEnTextoVisible: (texto.match(/magn/gi) || []).length,
      fuentes: ['Mona Sans', 'DM Mono', 'Google Sans Flex'].map(f => [f, [...document.fonts].some(x => x.family.replace(/"/g, '') === f && x.status === 'loaded')]),
    };
  }, FRASES);
  m.errores = errores;
  R.anchos[a.w] = m;

  if (a.capturas) {
    for (const [nombre, sel] of Object.entries(ELEMENTOS)) {
      const loc = p.locator(sel);
      const n = await loc.count();
      const el = loc.first();
      await el.scrollIntoViewIfNeeded();
      await p.waitForFunction(s => {
        const e = document.querySelector('figure:has(img[src="img/ap-tabla-filetes.jpg"]) img');
        return !e || (e.complete && e.naturalWidth > 0);
      }, null, { timeout: 15000 });
      await p.waitForTimeout(250);
      const medida = await el.evaluate(e => {
        const parse = c => { const x = c.match(/[\d.]+/g).map(Number); return { r: x[0], g: x[1], b: x[2], a: x.length > 3 ? x[3] : 1 }; };
        const lum = ({ r, g, b }) => [r, g, b].map(v => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }).reduce((s, v, i) => s + v * [0.2126, 0.7152, 0.0722][i], 0);
        const fondo = n => { let capas = []; for (let x = n; x; x = x.parentElement) { const c = parse(getComputedStyle(x).backgroundColor); if (c.a > 0) { capas.push(c); if (c.a >= 1) break; } } let base = capas.pop() || { r: 255, g: 255, b: 255, a: 1 }; while (capas.length) { const c = capas.pop(); base = { r: c.r * c.a + base.r * (1 - c.a), g: c.g * c.a + base.g * (1 - c.a), b: c.b * c.a + base.b * (1 - c.a), a: 1 }; } return base; };
        const nodos = [];
        const w = document.createTreeWalker(e, NodeFilter.SHOW_TEXT);
        for (let t = w.nextNode(); t; t = w.nextNode()) {
          if (!t.textContent.trim()) continue;
          const pe = t.parentElement, cs = getComputedStyle(pe);
          if (cs.display === 'none' || cs.visibility === 'hidden') continue;
          let c = parse(cs.color); let op = 1; for (let x = pe; x; x = x.parentElement) op *= Number(getComputedStyle(x).opacity);
          const bg = fondo(pe); const a = c.a * op;
          const comp = { r: c.r * a + bg.r * (1 - a), g: c.g * a + bg.g * (1 - a), b: c.b * a + bg.b * (1 - a) };
          const L1 = lum(comp), L2 = lum(bg); const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
          nodos.push({ texto: t.textContent.trim().slice(0, 60), px: parseFloat(cs.fontSize), peso: cs.fontWeight, ratio: Math.round(ratio * 100) / 100 });
        }
        const r = e.getBoundingClientRect();
        return { caja: { x: Math.round(r.x), ancho: Math.round(r.width) }, scrollWidth: e.scrollWidth, clientWidth: e.clientWidth, dentroDelViewport: r.left >= 0 && r.right <= document.documentElement.clientWidth + 0.5, texto: e.innerText.replace(/\s+/g, ' ').slice(0, 600), nodos, minimoRatio: Math.min(...nodos.map(n => n.ratio)) };
      });
      const archivo = `${nombre}-${a.w}.jpg`;
      await el.screenshot({ path: path.join(capturas, archivo), type: 'jpeg', quality: 82 });
      R.elementos[`${nombre}-${a.w}`] = { selector: sel, coincidencias: n, captura: archivo, ...medida };
    }
  }
  await ctx.close();
}
await nav.close();
servidor.kill('SIGTERM');
await new Promise(r => servidor.on('exit', r));
R.servidorApagado = await new Promise(r => { const s = net.connect(PUERTO, '127.0.0.1'); s.on('connect', () => { s.destroy(); r(false); }); s.on('error', () => r(true)); });
fs.writeFileSync(salida, JSON.stringify(R, null, 1));
console.log(JSON.stringify({ anchos: Object.fromEntries(Object.entries(R.anchos).map(([k, v]) => [k, { sw: v.scrollWidth, cw: v.clientWidth, h1: v.h1, nuevas: v.nuevasPresentes, viejas: v.viejasPresentes, rayas: v.rayasEnTextoVisible, magn: v.magnEnTextoVisible, fuentes: v.fuentes, errores: v.errores }])), elementos: Object.fromEntries(Object.entries(R.elementos).map(([k, v]) => [k, { n: v.coincidencias, sw: v.scrollWidth, cw: v.clientWidth, dentro: v.dentroDelViewport, min: v.minimoRatio }])), servidorApagado: R.servidorApagado }, null, 1));
