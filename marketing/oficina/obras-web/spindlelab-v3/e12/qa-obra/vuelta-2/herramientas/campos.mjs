// Javiera, QA de obra E12, vuelta 1. Spec §3.4, techos de campo, medidos sin las herramientas de Diego: captura de
// página completa a 1440 con movimiento reducido (cada video en su póster) y la caja de cada medio (.medio) de main.
// La cuenta la hace campos.py: la regla de la spec (campo-medios.py de Lucía, es_campo copiada sin cambios) y, al lado,
// una lectura por tono (la parte del marco con saturación ≥ 0,45 y valor ≥ 0,35, o luminancia ≥ 0,45) para los medios
// donde un degradé reparte el color en varias cubetas y la regla de la cubeta no lo ve.
// Uso: node campos.mjs <carpeta de salida (fuera del repo)>
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { RUTAS, nombre, servir, lanzar, recorrer } from './comun.mjs';
const sal = process.argv[2]; mkdirSync(sal, { recursive: true });
const srv = await servir(); const nav = await lanzar();
for (const ruta of RUTAS) {
  const ctx = await nav.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  await ctx.addInitScript(() => { try { localStorage.setItem('spindlelab_consent', 'denied'); } catch (e) {} });
  const p = await ctx.newPage();
  await p.goto(srv.url + ruta, { waitUntil: 'networkidle' });
  await recorrer(p); await p.waitForTimeout(400);
  const info = await p.evaluate(() => {
    const cajas = [...document.querySelectorAll('main .medio')].map((m) => { const r = m.getBoundingClientRect(); const img = m.querySelector('img'); return { x: r.left + scrollX, y: r.top + scrollY, w: r.width, h: r.height, src: img ? img.currentSrc.replace(location.origin, '') : '', clase: m.className }; }).filter((c) => c.w > 0 && c.h > 0);
    return { cajas, ancho: document.documentElement.scrollWidth, alto: document.documentElement.scrollHeight };
  });
  const n = nombre(ruta);
  await p.screenshot({ path: join(sal, `${n}.png`), fullPage: true });
  writeFileSync(join(sal, `${n}.json`), JSON.stringify({ ruta, ...info }));
  await ctx.close(); process.stdout.write('.');
}
await nav.close(); await srv.cerrar(); console.log();
