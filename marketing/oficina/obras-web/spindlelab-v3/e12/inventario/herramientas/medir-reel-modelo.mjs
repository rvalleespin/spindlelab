// E12 · inventario · la sección «Reel» de bernardocombeau.cl/modelo/, que sale en sus grabaciones (§2.8).
// Diego, 18-oct-2026. Solo GET y scroll, como grabar-combeau.mjs: abre /modelo/ a 1440 × 810 y a 390 × 844 (dpr 2),
// carga lo diferido, y lee de #reel su posición, el estilo computado de su título y el tamaño de su iframe. Además baja
// las hojas de estilo que enlaza la página y cuenta las reglas cuyo selector nombra `.reel`.
// Uso: node medir-reel-modelo.mjs > ../crudo/reel-modelo-bernardocombeau.cl.json
import { pathToFileURL } from 'node:url';

const { chromium } = await import(pathToFileURL('/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs').href);
const URL_MODELO = 'https://bernardocombeau.cl/modelo/';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const salida = { herramienta: 'e12/inventario/herramientas/medir-reel-modelo.mjs', chromium: b.version(), url: URL_MODELO, medidoEn: new Date().toISOString(), anchos: [], hojas: [] };
let hrefs = [];
for (const a of [{ w: 1440, h: 810, d: 1, m: false }, { w: 390, h: 844, d: 2, m: true }]) {
  const c = await b.newContext({ viewport: { width: a.w, height: a.h }, deviceScaleFactor: a.d, isMobile: a.m, hasTouch: a.m, locale: 'es-CL' });
  const p = await c.newPage();
  const r = await p.goto(URL_MODELO, { waitUntil: 'load', timeout: 60000 });
  await p.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight * 0.6) { scrollTo(0, y); await new Promise((s) => setTimeout(s, 300)); }
    scrollTo(0, 0); await new Promise((s) => setTimeout(s, 800));
  });
  const m = await p.evaluate(() => {
    const sec = document.querySelector('#reel');
    const t = document.querySelector('#reel-titulo');
    const f = document.querySelector('#reel iframe').getBoundingClientRect();
    const cs = getComputedStyle(t);
    return {
      altoDocumento: document.documentElement.scrollHeight,
      reelArriba: Math.round(sec.getBoundingClientRect().top + scrollY), reelAlto: Math.round(sec.getBoundingClientRect().height),
      tituloIzquierda: Math.round(t.getBoundingClientRect().left), tituloFuente: cs.fontFamily, tituloTamano: cs.fontSize,
      iframe: `${Math.round(f.width)} × ${Math.round(f.height)}`,
      hojas: [...document.querySelectorAll('link[rel="stylesheet"]')].map((l) => l.href),
    };
  });
  hrefs = m.hojas;
  delete m.hojas;
  salida.anchos.push({ viewport: `${a.w} × ${a.h}`, dpr: a.d, estado: r.status(), ...m });
  await c.close();
}
await b.close();
for (const h of hrefs) {
  const css = await (await fetch(h)).text();
  const reglas = css.match(/[^{}]*\.reel[^{}]*\{/g) || [];
  salida.hojas.push({ href: h, bytes: Buffer.byteLength(css), reglasConPuntoReel: reglas.length });
}
console.log(JSON.stringify(salida, null, 1));
