// Javiera, QA de obra E12, vuelta 2 (23-oct-2026; la de la vuelta 1, ampliada como pide la spec §4.3 del 23-oct).
// Spec §4.3: «nada importante queda tapado por [el aviso de cookies] en la primera pantalla: se mide con el aviso
// abierto», y lo importante es: el campo y el botón del chequeo en la home y en /v3/diagnostico/, el «Concepto» de los
// conceptos (eso lo mide concepto-sin-scroll.mjs) y el botón del formulario de contacto a 1440 × 900. Primera visita
// (sin elección guardada), en los ocho tamaños de la obra, más 375 × 667 (fuera de los anchos: §4.4 lo deja dicho).
// Por cada control: su caja, si queda entero dentro de la ventana, y si el aviso lo tapa (cruce de cajas y, en su
// centro, qué elemento recibe el toque). Captura de la home en cada tamaño.
// Uso: node aviso.mjs
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { QA, servir, lanzar } from './comun.mjs';
const CAP = join(QA, 'capturas', 'aviso'); mkdirSync(CAP, { recursive: true });
const srv = await servir(); const nav = await lanzar(); const R = [];
const TAMANOS = [[360, 800], [390, 844], [768, 1024], [834, 1112], [1024, 768], [1194, 834], [1440, 900], [1920, 1080], [375, 667]];
for (const [ruta, sel] of [['/v3/', ['#chq-dominio', '#chq-btn']], ['/v3/diagnostico/', ['#chq-dominio', '#chq-btn']], ['/v3/contacto/', ['.contact-form button[type="submit"]']]])
  for (const [w, h] of TAMANOS) {
    const t = w < 834;
    const ctx = await nav.newContext({ viewport: { width: w, height: h }, hasTouch: t, isMobile: t });
    const p = await ctx.newPage(); await p.goto(srv.url + ruta, { waitUntil: 'networkidle' }); await p.waitForTimeout(700);
    const m = await p.evaluate((sel) => {
      const a = document.getElementById('cookie-banner');
      const abierto = a && !a.hidden && getComputedStyle(a).display !== 'none';
      const ra = abierto ? a.getBoundingClientRect() : null;
      return {
        aviso: ra ? { top: Math.round(ra.top), alto: Math.round(ra.height) } : null,
        controles: sel.map((s) => {
          const e = document.querySelector(s); const r = e.getBoundingClientRect();
          const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
          const enCentro = cy >= 0 && cy <= innerHeight ? document.elementFromPoint(cx, cy) : null;
          return { s, top: Math.round(r.top), bottom: Math.round(r.bottom), entero: r.top >= 0 && r.bottom <= innerHeight,
            recibe: enCentro ? (enCentro === e || e.contains(enCentro) ? 'él' : `${enCentro.tagName.toLowerCase()}#${enCentro.id}.${[...enCentro.classList].join('.')}`.slice(0, 50)) : 'fuera' };
        }),
      };
    }, sel);
    m.tapados = m.aviso === null ? [] : m.controles.filter((c) => c.bottom > m.aviso.top && c.top < h).map((c) => c.s);
    m.fuera = m.controles.filter((c) => !c.entero).map((c) => c.s);
    if (ruta === '/v3/') await p.screenshot({ path: join(CAP, `home-${w}x${h}.jpg`), type: 'jpeg', quality: 65 });
    R.push({ ruta, w, h, ...m }); await ctx.close();
  }
await nav.close(); await srv.cerrar();
writeFileSync(join(QA, 'crudos', 'aviso.json'), JSON.stringify(R, null, 1));
for (const r of R) console.log(`${r.ruta} ${r.w}×${r.h}: aviso ${r.aviso ? `desde ${r.aviso.top} (${r.aviso.alto} px)` : 'cerrado'} · ${r.controles.map((c) => `${c.s} ${c.top}–${c.bottom} (${c.recibe})`).join(' · ')} · tapados ${r.tapados.join(', ') || 'ninguno'} · bajo el pliegue ${r.fuera.join(', ') || 'ninguno'}`);
