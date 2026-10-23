// Javiera, QA de obra E12, vuelta 2 (sin cambios de método desde la vuelta 1). Lo que se mueve, medido sobre el build servido (spec §1.6, §3.1, §3.5, §4.2,
// §5.2; brief criterios 8, 9 y 14). Medición propia, sin las herramientas de Diego:
//   A · cada video con movimiento normal a 1440: atributos (muted, loop, playsinline, preload=none, sin controls ni
//       autoplay, aria-hidden), fuentes en orden VP9 → H.264 y la del ancho, que corre a la vista, y su pausa: se llega
//       con Tab, Enter la para y dice «Seguir el video» con aria-pressed=true, Enter de nuevo la sigue;
//   B · los mismos con movimiento reducido: ningún video corre, la pausa dice «Seguir el video», ningún bloque a medio
//       entrar (opacidad 1 y sin transform), transiciones en 0 s, sin círculo;
//   C · el cursor: con puntero fino a 1440, sobre una pieza aparece el círculo blanco con su texto y sobre un enlace de
//       texto no; en táctil a 390 (isMobile + hasTouch) no existe;
//   D · Lenis sin actuar: una muesca de rueda (100 px) llega al 90 % en menos de 100 ms (§5.2.4), en cuatro páginas.
// Uso: node movimiento.mjs
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { QA, servir, lanzar } from './comun.mjs';

const srv = await servir();
const nav = await lanzar();
const R = { videos: [], reducido: [], cursor: [], rueda: [], consola: [] };
const consentir = (ctx) => ctx.addInitScript(() => { try { localStorage.setItem('spindlelab_consent', 'denied'); } catch (e) {} });
const escuchar = (p, ruta) => {
  p.on('console', (m) => { if (m.type() === 'error') R.consola.push(`${ruta}: ${m.text()}`); });
  p.on('pageerror', (e) => R.consola.push(`${ruta}: pageerror ${e}`));
};

const PAGINAS_VIDEO = ['/v3/', '/v3/trabajo/praxi/', '/v3/trabajo/combeau/', '/v3/trabajo/sesenta/', '/v3/trabajo/ocelo/',
  '/v3/trabajo/doceavo/', '/v3/trabajo/tonela/'];

const leerVideo = (i) => {
  const b = document.querySelectorAll('[data-video]')[i];
  const v = b.querySelector('video');
  const k = b.querySelector('.pausa');
  return {
    clase: b.className, src: v.currentSrc.replace(location.origin, ''), fuentes: [...v.querySelectorAll('source')].map((s) => `${s.type} ${s.src.replace(location.origin, '')}`),
    paused: v.paused, t: +v.currentTime.toFixed(2), dur: +(v.duration || 0).toFixed(2),
    attrs: { muted: v.muted, loop: v.loop, playsinline: v.hasAttribute('playsinline'), preload: v.getAttribute('preload'), controls: v.hasAttribute('controls'), autoplay: v.hasAttribute('autoplay'), ariaHidden: v.getAttribute('aria-hidden') },
    pausa: k ? { hidden: k.hidden || getComputedStyle(k).display === 'none', label: k.getAttribute('aria-label'), pressed: k.getAttribute('aria-pressed'), w: Math.round(k.getBoundingClientRect().width), h: Math.round(k.getBoundingClientRect().height) } : null,
    visible: getComputedStyle(v).display !== 'none' && v.getBoundingClientRect().width > 0,
  };
};

// ---- A y B
for (const reducido of [false, true]) {
  for (const ruta of PAGINAS_VIDEO) {
    const ctx = await nav.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: reducido ? 'reduce' : 'no-preference' });
    await consentir(ctx);
    const p = await ctx.newPage(); escuchar(p, ruta + (reducido ? ' (reducido)' : ''));
    await p.goto(srv.url + ruta, { waitUntil: 'networkidle' });
    const n = await p.evaluate(() => document.querySelectorAll('[data-video]').length);
    for (let i = 0; i < n; i++) {
      await p.evaluate((i) => document.querySelectorAll('[data-video]')[i].scrollIntoView({ block: 'center' }), i);
      await p.waitForTimeout(1600);
      const a = await p.evaluate(leerVideo, i);
      const fila = { ruta, i, ...a };
      if (!reducido && a.pausa && !a.pausa.hidden) {
        // Llegar a la pausa con el teclado: foco en el elemento anterior del documento y Tab hasta ella
        const alcanzada = await p.evaluate(async (i) => {
          const k = document.querySelectorAll('[data-video]')[i].querySelector('.pausa');
          k.focus(); return document.activeElement === k && getComputedStyle(k).outlineStyle !== 'none';
        }, i);
        await p.keyboard.press('Enter'); await p.waitForTimeout(400);
        const tras1 = await p.evaluate(leerVideo, i);
        const t1 = tras1.t; await p.waitForTimeout(500);
        const quieto = (await p.evaluate(leerVideo, i)).t === t1;
        await p.keyboard.press('Enter'); await p.waitForTimeout(700);
        const tras2 = await p.evaluate(leerVideo, i);
        fila.teclado = { foco: alcanzada, pausado: tras1.paused && quieto, label1: tras1.pausa.label, pressed1: tras1.pausa.pressed, sigue: !tras2.paused, label2: tras2.pausa.label, pressed2: tras2.pausa.pressed };
      }
      if (!reducido) {
        // Fuera de la vista se pausa solo
        await p.evaluate(() => scrollTo(0, document.documentElement.scrollHeight));
        await p.waitForTimeout(500);
        const fuera = await p.evaluate(leerVideo, i);
        fila.fueraDeVistaPausado = fuera.paused || i === 0 && ruta === '/v3/' && false;
      }
      (reducido ? R.reducido : R.videos).push(fila);
    }
    if (reducido) {
      await p.evaluate(async () => { for (let y = 0; y < document.documentElement.scrollHeight; y += 500) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 40)); } });
      await p.waitForTimeout(400);
      const quietud = await p.evaluate(() => {
        const ent = [...document.querySelectorAll('[data-entrada]')].map((e) => ({ op: getComputedStyle(e).opacity, tr: getComputedStyle(e).transform })).filter((x) => x.op !== '1' || (x.tr !== 'none' && x.tr !== 'matrix(1, 0, 0, 1, 0, 0)'));
        const trans = [...document.querySelectorAll('a, button, .pieza, .medio, .medio > img, .menu a, .cab__placa')].map((e) => getComputedStyle(e).transitionDuration).filter((d) => d.split(',').some((x) => parseFloat(x) > 0));
        return { entradas: document.querySelectorAll('[data-entrada]').length, aMedioEntrar: ent.length, conTransicion: trans.length, conCirculo: document.body.classList.contains('con-circulo') };
      });
      R.reducido.push({ ruta, quietud });
    }
    await ctx.close();
    process.stdout.write('.');
  }
}

// ---- C · el cursor
{
  const ctx = await nav.newContext({ viewport: { width: 1440, height: 900 } });
  await consentir(ctx);
  const p = await ctx.newPage(); escuchar(p, 'cursor 1440');
  for (const ruta of ['/v3/trabajo/', '/v3/', '/v3/servicios/desarrollo-web/', '/v3/trabajo/praxi/']) {
    await p.goto(srv.url + ruta, { waitUntil: 'networkidle' });
    const media = await p.evaluate(() => ({ fino: matchMedia('(hover: hover) and (pointer: fine)').matches, conCirculo: document.body.classList.contains('con-circulo') }));
    const caja = await p.evaluate(() => {
      const e = [...document.querySelectorAll('.medio-enlace[data-ir]')].find((x) => x.getBoundingClientRect().width > 0);
      e.scrollIntoView({ block: 'center' }); const r = e.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2, ir: e.getAttribute('data-ir') };
    });
    await p.waitForTimeout(400);
    await p.mouse.move(caja.x - 40, caja.y - 40); await p.mouse.move(caja.x, caja.y, { steps: 6 }); await p.waitForTimeout(450);
    const sobre = await p.evaluate(() => {
      const c = document.querySelector('.circulo'); const s = getComputedStyle(c); const r = c.getBoundingClientRect();
      return { texto: c.textContent, fondo: s.backgroundColor, color: s.color, w: Math.round(r.width), h: Math.round(r.height), borde: `${s.borderTopWidth} ${s.borderTopStyle} ${s.borderTopColor}`, ariaHidden: c.getAttribute('aria-hidden'), pe: s.pointerEvents, cursorPieza: getComputedStyle(document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2) || document.body).cursor };
    });
    // sobre un enlace de texto (el menú): el círculo se va
    const menu = await p.evaluate(() => { const a = document.querySelector('.cab__nav a'); const r = a.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; });
    await p.mouse.move(menu.x, menu.y, { steps: 8 }); await p.waitForTimeout(450);
    const enMenu = await p.evaluate(() => { const r = document.querySelector('.circulo').getBoundingClientRect(); return { w: Math.round(r.width), h: Math.round(r.height) }; });
    R.cursor.push({ ruta, ancho: 1440, media, ir: caja.ir, sobre, enMenu });
  }
  await ctx.close();
  const t = await nav.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  await consentir(t);
  const q = await t.newPage(); escuchar(q, 'cursor 390');
  await q.goto(srv.url + '/v3/trabajo/', { waitUntil: 'networkidle' });
  const tactil = await q.evaluate(() => { const c = document.querySelector('.circulo'); const r = c ? c.getBoundingClientRect() : null; return { fino: matchMedia('(hover: hover) and (pointer: fine)').matches, conCirculo: document.body.classList.contains('con-circulo'), circulo: c ? { display: getComputedStyle(c).display, w: Math.round(r.width), h: Math.round(r.height) } : null }; });
  await q.tap('.medio-enlace[data-ir]').catch(() => {});
  R.cursor.push({ ruta: '/v3/trabajo/', ancho: 390, tactil });
  await t.close();
}

// ---- D · la rueda
for (const ruta of ['/v3/', '/v3/trabajo/praxi/', '/v3/servicios/desarrollo-web/', '/v3/blog/21-chequeos-visibilidad-ia/']) {
  const ctx = await nav.newContext({ viewport: { width: 1440, height: 900 } });
  await consentir(ctx);
  const p = await ctx.newPage(); escuchar(p, 'rueda ' + ruta);
  await p.goto(srv.url + ruta, { waitUntil: 'networkidle' });
  await p.waitForTimeout(600);
  await p.mouse.move(700, 500);
  await p.evaluate(() => {
    window.__qa = { t0: null, log: [] };
    addEventListener('wheel', () => { if (window.__qa.t0 === null) window.__qa.t0 = performance.now(); }, { capture: true, passive: true });
    const y0 = scrollY;
    const f = () => { window.__qa.log.push([performance.now(), scrollY - y0]); if (window.__qa.log.length < 120) requestAnimationFrame(f); };
    requestAnimationFrame(f);
  });
  await p.mouse.wheel(0, 100);
  await p.waitForTimeout(1500);
  const r = await p.evaluate(() => {
    const { t0, log } = window.__qa; const fin = log[log.length - 1][1];
    const llega = log.find(([t, y]) => t >= t0 && y >= 0.9 * 100);
    return { t0: Math.round(t0), fin, ms90: llega ? Math.round(llega[0] - t0) : null, lenisEnHtml: document.documentElement.classList.contains('lenis'), prevent: document.body.hasAttribute('data-lenis-prevent'), hashLinks: document.querySelectorAll('a[href^="#"]').length };
  });
  R.rueda.push({ ruta, ...r });
  await ctx.close();
}

await nav.close(); await srv.cerrar();
writeFileSync(join(QA, 'crudos', 'movimiento.json'), JSON.stringify(R, null, 1));
console.log('\n· VIDEOS (1440, movimiento normal)');
for (const v of R.videos) console.log(`${v.ruta}#${v.i} ${v.clase.replace(/medio |video /g, '')} src ${v.src} · fuentes ${v.fuentes.map((f) => f.split(' ')[0]).join('→')} · corre ${!v.paused} t=${v.t}/${v.dur} · attrs ${JSON.stringify(v.attrs)} · pausa ${JSON.stringify(v.pausa)} · teclado ${JSON.stringify(v.teclado)} · fuera de vista pausado ${v.fueraDeVistaPausado}`);
console.log('\n· MOVIMIENTO REDUCIDO');
for (const v of R.reducido) console.log(v.quietud ? `${v.ruta} ${JSON.stringify(v.quietud)}` : `${v.ruta}#${v.i} corre ${!v.paused} t=${v.t} pausa ${v.pausa?.label} ${v.pausa?.pressed} oculta ${v.pausa?.hidden}`);
console.log('\n· CURSOR'); for (const c of R.cursor) console.log(JSON.stringify(c));
console.log('\n· RUEDA'); for (const r of R.rueda) console.log(JSON.stringify(r));
console.log('\n· CONSOLA', R.consola);
