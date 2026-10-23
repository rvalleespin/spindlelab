// Javiera, QA de obra E12, vuelta 1. Spec §4.3: «Nada importante queda tapado por [el aviso de cookies] en la primera
// pantalla: se mide con el aviso abierto». Primera visita (sin elección guardada): dónde empieza el aviso y dónde están
// el campo y el botón del chequeo de la home, y el botón del formulario de contacto. Captura a 390 y 360.
// Uso: node aviso.mjs
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { QA, servir, lanzar } from './comun.mjs';
const srv = await servir(); const nav = await lanzar(); const R = [];
for (const [ruta, sel] of [['/v3/', ['#chq-dominio', '#chq-btn']], ['/v3/diagnostico/', ['#chq-dominio', '#chq-btn']], ['/v3/contacto/', ['.contact-form button[type="submit"]']]])
  for (const [w, h] of [[360, 800], [390, 844], [768, 1024], [1024, 768], [1440, 900]]) {
    const t = w < 834;
    const ctx = await nav.newContext({ viewport: { width: w, height: h }, hasTouch: t, isMobile: t });
    const p = await ctx.newPage(); await p.goto(srv.url + ruta, { waitUntil: 'networkidle' }); await p.waitForTimeout(600);
    const m = await p.evaluate((sel) => {
      const a = document.getElementById('cookie-banner'); const ra = a && getComputedStyle(a).display !== 'none' ? a.getBoundingClientRect() : null;
      return { aviso: ra ? Math.round(ra.top) : null, controles: sel.map((s) => { const r = document.querySelector(s).getBoundingClientRect(); return { s, top: Math.round(r.top), bottom: Math.round(r.bottom) }; }) };
    }, sel);
    m.tapados = m.aviso === null ? [] : m.controles.filter((c) => c.bottom > m.aviso && c.top < h).map((c) => c.s);
    if (ruta === '/v3/' && (w === 390 || w === 360)) await p.screenshot({ path: join(QA, 'capturas', `aviso-home-${w}.png`) });
    R.push({ ruta, w, h, ...m }); await ctx.close();
  }
await nav.close(); await srv.cerrar();
writeFileSync(join(QA, 'crudos', 'aviso.json'), JSON.stringify(R, null, 1));
for (const r of R) console.log(`${r.ruta} ${r.w}×${r.h}: aviso desde ${r.aviso} · ${r.controles.map((c) => `${c.s} ${c.top}–${c.bottom}`).join(' · ')} · tapados ${r.tapados.join(', ') || 'ninguno'}`);
