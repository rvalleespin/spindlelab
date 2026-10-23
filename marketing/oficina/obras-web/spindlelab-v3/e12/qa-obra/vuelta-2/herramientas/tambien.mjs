// Javiera, QA de obra E12, vuelta 2. La línea «También: Paid Media…» de la home (spec §2.1, fila 5: desde 1194 «en una
// línea en c5–c12»; bajo 1194 con el tope de 493, defecto 5): ancho, alto de línea y número de líneas en los ocho anchos.
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { QA, ANCHOS, servir, lanzar } from './comun.mjs';
const srv = await servir(); const nav = await lanzar(); const R = [];
for (const [w, h] of Object.entries(ANCHOS)) {
  const ctx = await nav.newContext({ viewport: { width: +w, height: h } });
  await ctx.addInitScript(() => { try { localStorage.setItem('spindlelab_consent', 'denied'); } catch (e) {} });
  const p = await ctx.newPage(); await p.goto(srv.url + '/v3/', { waitUntil: 'networkidle' });
  R.push({ w: +w, ...(await p.evaluate(() => {
    const e = document.querySelector('.servicios__tambien'); const r = document.createRange(); r.selectNodeContents(e);
    const lineas = new Set([...r.getClientRects()].map((x) => Math.round(x.top))).size;
    return { ancho: Math.round(r.getBoundingClientRect().width), lineas, caracteres: e.textContent.trim().length, x: Math.round(e.getBoundingClientRect().left) };
  })) });
  await ctx.close();
}
await nav.close(); await srv.cerrar();
writeFileSync(join(QA, 'crudos', 'tambien.json'), JSON.stringify(R, null, 1));
for (const r of R) console.log(`${r.w}: ${r.ancho} px, ${r.lineas} línea(s), ${r.caracteres} caracteres, x = ${r.x}`);
