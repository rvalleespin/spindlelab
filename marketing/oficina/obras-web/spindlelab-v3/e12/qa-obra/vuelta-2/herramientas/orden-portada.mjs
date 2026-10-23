// Javiera, QA de obra E12, vuelta 2. Spec §2.1 («El chequeo bajo 834», 23-oct): bajo 834 el orden a la vista es rótulo,
// h1, chequeo y entradilla, con 16 entre rótulo y h1 y 24 entre h1 y chequeo y entre chequeo y entradilla; el DOM no
// cambia (el lector de pantalla lee la entradilla antes del chequeo) y el Tab tampoco. Desde 834, como antes.
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { QA, servir, lanzar } from './comun.mjs';
const srv = await servir(); const nav = await lanzar(); const R = [];
for (const [w, h] of [[360, 800], [390, 844], [768, 1024], [833, 1112], [834, 1112], [1440, 900]]) {
  const t = w < 834;
  const ctx = await nav.newContext({ viewport: { width: w, height: h }, hasTouch: t, isMobile: t });
  await ctx.addInitScript(() => { try { localStorage.setItem('spindlelab_consent', 'denied'); } catch (e) {} });
  const p = await ctx.newPage(); await p.goto(srv.url + '/v3/', { waitUntil: 'networkidle' });
  const m = await p.evaluate(() => {
    const pv = document.querySelector('.portada-v');
    const q = (s) => pv.querySelector(s);
    const rot = q('.portada-v__decl > :first-child'), h1 = q('h1'), chq = q('.portada-v__chequeo'), ent = q('.entradilla');
    const c = (e) => { const r = e.getBoundingClientRect(); return { top: Math.round(r.top), bottom: Math.round(r.bottom), left: Math.round(r.left), w: Math.round(r.width) }; };
    const b = { rotulo: c(rot), h1: c(h1), chequeo: c(chq), entradilla: c(ent) };
    const orden = Object.entries(b).sort((x, y) => x[1].top - y[1].top || x[1].left - y[1].left).map((x) => x[0]);
    const docOrden = [rot, h1, chq, ent].map((e) => ({ e, i: [...pv.querySelectorAll('*')].indexOf(e) })).sort((x, y) => x.i - y.i).map((x) => x.e === rot ? 'rotulo' : x.e === h1 ? 'h1' : x.e === chq ? 'chequeo' : 'entradilla');
    const enfocables = [...ent.querySelectorAll('a,button,input,select,textarea,[tabindex]')].length;
    return { cajas: b, ordenVisual: orden, ordenDom: docOrden, huecos: { rotuloH1: b.h1.top - b.rotulo.bottom, h1Chequeo: b.chequeo.top - b.h1.bottom, chequeoEntradilla: b.entradilla.top - b.chequeo.bottom }, enfocablesEnEntradilla: enfocables, rotuloTag: rot.tagName + '.' + rot.className };
  });
  R.push({ w, h, ...m }); await ctx.close();
}
await nav.close(); await srv.cerrar();
writeFileSync(join(QA, 'crudos', 'orden-portada.json'), JSON.stringify(R, null, 1));
for (const r of R) console.log(`${r.w}×${r.h}: a la vista ${r.ordenVisual.join(' → ')} · DOM ${r.ordenDom.join(' → ')} · huecos ${JSON.stringify(r.huecos)} · enfocables en la entradilla ${r.enfocablesEnEntradilla} · (${r.rotuloTag})`);
