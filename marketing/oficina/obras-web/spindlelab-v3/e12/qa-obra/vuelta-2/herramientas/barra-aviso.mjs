// Javiera, QA de obra E12, vuelta 2. Spec §2.3 y §4.3 (23-oct): con el aviso de cookies abierto, la barra flotante va
// 8 px sobre él, en toda página con barra (los seis casos y los artículos), bajo 1194; al elegir, vuelve a 16 px del
// borde y --a-alto-aviso se va, sin animación. Por página y tamaño: la barra con el aviso abierto, con su lista abierta
// (que entre en la ventana, bajo el encabezado), después de «Rechazar», y el tipo de la barra (solo en los conceptos).
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { QA, servir, lanzar } from './comun.mjs';
const CAP = join(QA, 'capturas', 'barra'); mkdirSync(CAP, { recursive: true });
const srv = await servir(); const nav = await lanzar(); const R = [];
const RUTAS = ['/v3/trabajo/praxi/', '/v3/trabajo/combeau/', '/v3/trabajo/tonela/', '/v3/trabajo/sesenta/', '/v3/blog/que-es-aeo-geo/', '/v3/blog/21-chequeos-visibilidad-ia/'];
for (const ruta of RUTAS) for (const [w, h] of [[360, 800], [390, 844], [768, 1024], [834, 1112], [1024, 768]]) {
  const t = w < 834;
  const ctx = await nav.newContext({ viewport: { width: w, height: h }, hasTouch: t, isMobile: t });
  const p = await ctx.newPage(); await p.goto(srv.url + ruta, { waitUntil: 'networkidle' }); await p.waitForTimeout(400);
  const medir = () => p.evaluate(() => {
    const a = document.getElementById('cookie-banner'); const abierto = a && !a.hidden && getComputedStyle(a).display !== 'none';
    const b = document.querySelector('.barra'); const rb = b.getBoundingClientRect();
    const lista = b.querySelector('ul'); const rl = lista && b.querySelector('details').open ? lista.getBoundingClientRect() : null;
    const cab = document.querySelector('.cab'); const rc = cab ? cab.getBoundingClientRect() : null;
    return { aviso: abierto ? Math.round(a.getBoundingClientRect().top) : null, barraTop: Math.round(rb.top), barraBottom: Math.round(rb.bottom), aBorde: Math.round(innerHeight - rb.bottom),
      variable: document.documentElement.style.getPropertyValue('--a-alto-aviso') || null, tipo: b.querySelector('.barra__tipo')?.textContent || null,
      lista: rl ? { top: Math.round(rl.top), bottom: Math.round(rl.bottom), sobreCab: rc ? Math.round(rl.top - rc.bottom) : null } : null,
      transicion: getComputedStyle(b).transitionProperty + ' ' + getComputedStyle(b).transitionDuration,
      scrollPad: getComputedStyle(document.documentElement).scrollPaddingBottom };
  });
  const abierto = await medir();
  await p.click('.barra summary'); await p.waitForTimeout(300);
  const conLista = await medir();
  if (w === 360 || w === 1024) await p.screenshot({ path: join(CAP, `${ruta.split('/').filter(Boolean).pop()}-${w}-lista-aviso.jpg`), type: 'jpeg', quality: 60 });
  await p.click('.barra summary'); await p.waitForTimeout(200);
  await p.click('#cookie-reject'); await p.waitForTimeout(300);
  const despues = await medir();
  R.push({ ruta, w, h, abierto, conLista, despues }); await ctx.close();
}
await nav.close(); await srv.cerrar();
writeFileSync(join(QA, 'crudos', 'barra-aviso.json'), JSON.stringify(R, null, 1));
for (const r of R) console.log(`${r.ruta} ${r.w}×${r.h} · tipo ${r.abierto.tipo} · aviso ${r.abierto.aviso}: barra hasta ${r.abierto.barraBottom} (${r.abierto.aviso - r.abierto.barraBottom} px sobre él), var ${r.abierto.variable}, pad ${r.abierto.scrollPad} · lista ${JSON.stringify(r.conLista.lista)} · al rechazar: aviso ${r.despues.aviso}, barra a ${r.despues.aBorde} px del borde, var ${r.despues.variable}, pad ${r.despues.scrollPad} · transición ${r.despues.transicion}`);
