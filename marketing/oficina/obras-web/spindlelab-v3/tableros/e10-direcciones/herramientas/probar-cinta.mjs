// probar-cinta.mjs — la cinta de los prototipos E10 cumple el lock §14 (Lucía, 16-oct-2026).
// Mide en el navegador: velocidad (px/s, por tiempo), que el botón la pausa y la vuelve a mover, que con
// prefers-reduced-motion: reduce parte quieta y desde el margen, que es aria-hidden y que no es un encabezado.
// Sirve proto/ en 8770 antes. Uso: node herramientas/probar-cinta.mjs  → img/cinta-prueba.json
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const AQUI = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const REPO = path.resolve(AQUI, '../../../../../..');
const { chromium } = await import(pathToFileURL(path.join(REPO, 'spindlelab-astro/node_modules/playwright/index.mjs')).href);
const nav = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const casos = [['taller', 'home'], ['taller', 'acompanamiento-mensual'], ['pizarra', 'home']];
const out = [];
const x = (pg) => pg.evaluate(() => new DOMMatrix(getComputedStyle(document.querySelector('.cinta__pista')).transform).m41);
for (const [d, p] of casos) {
  for (const w of [1440, 390]) {
    const r = { direccion: d, pagina: p, ancho: w };
    let ctx = await nav.newContext({ viewport: { width: w, height: 900 } });
    let pg = await ctx.newPage();
    await pg.goto(`http://127.0.0.1:8770/${d}/${p}.html`, { waitUntil: 'networkidle' });
    await pg.evaluate(() => document.querySelector('[data-cinta]').scrollIntoView({ block: 'center' }));
    await pg.waitForTimeout(600);
    const a = await x(pg); const t0 = Date.now(); await pg.waitForTimeout(2000); const b = await x(pg); const dt = (Date.now() - t0) / 1000;
    r.velocidad_px_s = +((a - b) / dt).toFixed(1);
    r.hacia = b < a ? 'izquierda' : 'quieta o derecha';
    const boton = pg.locator('.cinta__pausa');
    r.boton = { rotulo: await boton.getAttribute('aria-label'), enfocable: await boton.evaluate((e) => e.tabIndex >= 0), caja: await boton.evaluate((e) => { const q = e.getBoundingClientRect(); return [Math.round(q.width), Math.round(q.height)]; }) };
    await boton.click(); await pg.waitForTimeout(300);
    const c = await x(pg); await pg.waitForTimeout(1200); const e = await x(pg);
    r.pausa = { aria_pressed: await boton.getAttribute('aria-pressed'), movio_px_en_1_2s: +Math.abs(c - e).toFixed(1) };
    await boton.click(); await pg.waitForTimeout(300);
    const f = await x(pg); await pg.waitForTimeout(1000); const g = await x(pg);
    r.reanuda = { aria_pressed: await boton.getAttribute('aria-pressed'), movio_px_en_1s: +Math.abs(f - g).toFixed(1) };
    r.semantica = await pg.evaluate(() => { const c = document.querySelector('[data-cinta]'); return { aria_hidden: c.querySelector('.cinta').getAttribute('aria-hidden'), dentro_de_encabezado: !!c.closest('h1,h2,h3,h4,h5,h6'), h1_en_la_pagina: document.querySelectorAll('h1').length }; });
    await ctx.close();
    ctx = await nav.newContext({ viewport: { width: w, height: 900 }, reducedMotion: 'reduce' });
    pg = await ctx.newPage();
    await pg.goto(`http://127.0.0.1:8770/${d}/${p}.html`, { waitUntil: 'networkidle' });
    await pg.evaluate(() => document.querySelector('[data-cinta]').scrollIntoView({ block: 'center' }));
    const h = await x(pg); await pg.waitForTimeout(1500); const i = await x(pg);
    r.movimiento_reducido = { quieta: h === i && h === 0, primer_item_x: await pg.evaluate(() => Math.round(document.querySelector('.cinta__grupo > span').getBoundingClientRect().left)),
      boton_dice_pausada: await pg.locator('.cinta__pausa').getAttribute('aria-pressed') };
    await ctx.close();
    r.ok = r.hacia === 'izquierda' && Math.abs(r.velocidad_px_s - 30) < 3 && r.pausa.movio_px_en_1_2s < 0.5 && r.pausa.aria_pressed === 'true' && r.reanuda.movio_px_en_1s > 20
      && r.movimiento_reducido.quieta && r.semantica.aria_hidden === 'true' && !r.semantica.dentro_de_encabezado && r.semantica.h1_en_la_pagina === 1;
    out.push(r); console.log(r.ok ? 'ok ' : 'MAL', d, p, w, r.velocidad_px_s + ' px/s', 'pausa', r.pausa.movio_px_en_1_2s, 'reducido', r.movimiento_reducido.quieta, 'x0', r.movimiento_reducido.primer_item_x);
  }
}
await nav.close();
fs.writeFileSync(path.join(AQUI, 'img/cinta-prueba.json'), JSON.stringify({ fecha: new Date().toISOString(), regla: 'lock-the-ready.md §4 y §14', casos: out }, null, 1));
