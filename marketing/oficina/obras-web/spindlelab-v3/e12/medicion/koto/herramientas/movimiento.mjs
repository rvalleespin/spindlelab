// E12 · Koto · movimiento: scroll suave o nativo, «scrub» o tiempo, encabezado que se pliega,
// paso entre páginas y qué cambia con prefers-reduced-motion.
// Uso: node movimiento.mjs <dir-crudo> <dir-capturas>   → <dir-crudo>/movimiento.json
import fs from 'node:fs';
import path from 'node:path';
import { PAGINAS, abrirNavegador, contexto, cargar, aceptarCookies, SEL_FN } from './comun.mjs';

const [dirCrudo, dirCapt] = process.argv.slice(2);
const out = {};
const nav = await abrirNavegador();

async function abrir(id, ancho, extra = {}) {
  const ctx = await contexto(nav, ancho, extra);
  await ctx.addInitScript(SEL_FN);
  const p = await ctx.newPage();
  out[`carga_${id}_${ancho}${extra.reducedMotion === 'reduce' ? '_reducido' : ''}`] = await cargar(p, PAGINAS[id]);
  await aceptarCookies(p);
  return { ctx, p };
}
// muestrea por cuadro (rAF) una función dentro de la página durante ms milisegundos
const muestrear = (p, fnTexto, ms) => p.evaluate(([fnTexto, ms]) => new Promise(res => {
  const f = new Function('return (' + fnTexto + ')()');
  const t0 = performance.now(); const m = [];
  const paso = () => { const t = performance.now() - t0; m.push([Math.round(t), f()]); if (t < ms) requestAnimationFrame(paso); else res(m); };
  requestAnimationFrame(paso);
}), [fnTexto, ms]);

for (const reducido of [false, true]) {
  const etq = reducido ? 'reducido' : 'normal';
  const o = out[`home1440_${etq}`] = {};
  const { ctx, p } = await abrir('home', 1440, { reducedMotion: reducido ? 'reduce' : 'no-preference' });
  o.htmlClase = await p.evaluate(() => document.documentElement.className);
  o.matchMedia = await p.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches);

  // 1 · rueda: un solo evento de 100 px, ¿salta o se interpola?
  await p.mouse.move(700, 450);
  const rueda = p.evaluate(() => new Promise(res => { const t0 = performance.now(); const m = []; const f = () => { m.push([Math.round(performance.now() - t0), Math.round(scrollY * 10) / 10]); if (performance.now() - t0 < 900) requestAnimationFrame(f); else res(m); }; requestAnimationFrame(f); }));
  await p.waitForTimeout(50);
  await p.mouse.wheel(0, 100);
  o.ruedaUnEvento100px = await rueda;
  await p.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' })); await p.waitForTimeout(800);

  // 2 · el párrafo de presentación (SplitText por líneas) y el título del showreel: ¿scrub o tiempo?
  const objetivo = await p.evaluate(() => { const e = document.querySelector('[data-ref-showreel-intro]'); return e ? e.getBoundingClientRect().top + scrollY : null; });
  o.intro = { top: objetivo };
  if (objetivo !== null) {
    const leer = `() => [...document.querySelectorAll('[data-ref-showreel-intro] > p > div > div')].slice(0, 4).map(e => getComputedStyle(e).transform).concat([getComputedStyle(document.querySelector('[data-ref-showreel-intro]')).transform, getComputedStyle(document.querySelector('[data-ref-showreel-title-subtitle]') || document.body).opacity])`;
    const series = [];
    for (const y of [150, 300, 450, 600, 900]) {
      await p.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), y);
      const m = await muestrear(p, leer, 700);
      series.push({ scrollY: y, primero: m[0], a100ms: m.find(x => x[0] >= 100), a300ms: m.find(x => x[0] >= 300), ultimo: m[m.length - 1], cuadros: m.length });
    }
    o.intro.series = series;
  }
  // 3 · el encabezado: se pliega al bajar (transiciones CSS)
  await p.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' })); await p.waitForTimeout(1200);
  o.encabezadoArriba = await p.evaluate(() => { const b = document.querySelector('[data-ref-header-bar]'); const r = b.getBoundingClientRect(); return { rect: [r.x, r.y, r.width, r.height].map(Math.round), texto: b.innerText.replace(/\s+/g, ' ').trim().slice(0, 120) }; });
  await p.evaluate(() => window.scrollTo({ top: 700, behavior: 'instant' }));
  await p.waitForTimeout(60);
  o.encabezadoTransiciones = await p.evaluate(() => document.getAnimations().filter(a => a.effect && a.effect.target && a.effect.target.closest && a.effect.target.closest('[data-ref-header-bar]')).map(a => ({ tipo: a.constructor.name, prop: a.transitionProperty || a.animationName, dur: a.effect.getTiming().duration, retardo: a.effect.getTiming().delay, curva: a.effect.getTiming().easing, sel: window.__sel(a.effect.target) })));
  await p.waitForTimeout(1200);
  o.encabezadoAbajo = await p.evaluate(() => { const b = document.querySelector('[data-ref-header-bar]'); const r = b.getBoundingClientRect(); return { rect: [r.x, r.y, r.width, r.height].map(Math.round), texto: b.innerText.replace(/\s+/g, ' ').trim().slice(0, 120) }; });
  if (!reducido) {
    await p.screenshot({ path: path.join(dirCapt, 'detalle-encabezado-plegado-1440.jpg'), type: 'jpeg', quality: 85, clip: { x: 0, y: 0, width: 720, height: 90 } });
    await p.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' })); await p.waitForTimeout(1200);
    await p.screenshot({ path: path.join(dirCapt, 'detalle-encabezado-abierto-1440.jpg'), type: 'jpeg', quality: 85, clip: { x: 0, y: 0, width: 1440, height: 90 } });
  }
  // 4 · el pie: bloques que aparecen con el scroll
  const pie = await p.evaluate(() => { const e = document.querySelector('[data-ref-footer-section]'); return e ? e.getBoundingClientRect().top + scrollY : null; });
  if (pie !== null) {
    const leerPie = `() => [...document.querySelectorAll('[data-ref-footer-section]')].map(e => getComputedStyle(e).opacity)`;
    const s = [];
    for (const d of [-900, -700, -500, -300, 0]) {
      await p.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), pie + d);
      const m = await muestrear(p, leerPie, 500);
      s.push({ scrollY: Math.round(pie + d), primero: m[0], ultimo: m[m.length - 1] });
    }
    o.pie = { top: Math.round(pie), series: s };
  }
  // 5 · paso entre páginas: clic en WORK y ver qué anima
  await p.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' })); await p.waitForTimeout(1000);
  const work = await p.evaluate(() => { const a = [...document.querySelectorAll('a[href="/work"]')].find(a => { const r = a.getBoundingClientRect(); if (!r.width || r.top > 120) return false; const e = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2); return e && a.contains(e); }); if (!a) return null; const r = a.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; });
  if (work) {
    await p.evaluate(() => { window.__trans = new Map(); const t0 = performance.now(); const f = () => { for (const a of document.getAnimations()) { const k = (a.transitionProperty || a.animationName) + '|' + (a.effect && a.effect.target ? window.__sel(a.effect.target) : ''); if (!window.__trans.has(k)) window.__trans.set(k, { t: Math.round(performance.now() - t0), tipo: a.constructor.name, prop: a.transitionProperty || a.animationName, dur: a.effect.getTiming().duration, retardo: a.effect.getTiming().delay, curva: a.effect.getTiming().easing, sel: a.effect && a.effect.target ? window.__sel(a.effect.target) : null }); } if (performance.now() - t0 < 2500) requestAnimationFrame(f); }; requestAnimationFrame(f); window.__urlLog = []; const u0 = performance.now(); const g = () => { window.__urlLog.push([Math.round(performance.now() - u0), location.pathname, Math.round(scrollY)]); if (performance.now() - u0 < 2500) setTimeout(g, 50); }; g(); });
    await p.mouse.click(work.x, work.y);
    if (!reducido) { await p.waitForTimeout(220); await p.screenshot({ path: path.join(dirCapt, 'detalle-paso-de-pagina-220ms-1440.jpg'), type: 'jpeg', quality: 80 }); }
    await p.waitForTimeout(2600);
    o.pasoDePagina = await p.evaluate(() => ({ animaciones: [...(window.__trans ? window.__trans.values() : [])].filter(a => a.prop !== 'play-record').slice(0, 60), url: (window.__urlLog || []).filter((x, i, arr) => i === 0 || x[1] !== arr[i - 1][1]) })).catch(e => ({ error: String(e).slice(0, 160) }));
    o.pasoDePaginaNota = 'si la lista sale vacía o con error, la navegación recargó el documento (las variables de la página anterior se pierden)';
    o.pasoDePaginaUrlFinal = p.url();
  }
  await ctx.close();
}

// 6 · estudio: la lista del equipo (¿aparece con tiempo, nombre por nombre?)
{
  const { ctx, p } = await abrir('estudio', 1440);
  const o = out.estudio1440 = {};
  const top = await p.evaluate(() => { const e = document.querySelector('#section-the-team'); return e ? e.getBoundingClientRect().top + scrollY : null; });
  o.equipoTop = top;
  if (top !== null) {
    const leer = `() => { const els = [...document.querySelectorAll('#section-the-team p, #section-the-team span')].filter(e => e.children.length === 0 && e.innerText.trim()).slice(0, 12); return els.map(e => getComputedStyle(e).opacity + '|' + getComputedStyle(e).color); }`;
    const s = [];
    for (const y of [top - 700, top - 400, top - 100, top + 200]) {
      await p.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), y);
      const m = await muestrear(p, leer, 1500);
      s.push({ scrollY: Math.round(y), primero: m[0], a200: m.find(x => x[0] >= 200), a500: m.find(x => x[0] >= 500), a1000: m.find(x => x[0] >= 1000), ultimo: m[m.length - 1] });
    }
    o.equipo = s;
    // pasar el mouse por un nombre
    const nombre = await p.evaluate(() => { const e = [...document.querySelectorAll('#section-the-team p, #section-the-team span, #section-the-team button')].find(e => e.children.length === 0 && /\w+ \w+/.test(e.innerText) && e.getBoundingClientRect().top > 100 && e.getBoundingClientRect().top < innerHeight - 100); if (!e) return null; window.__nom = e; const r = e.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height, texto: e.innerText.trim(), color: getComputedStyle(e).color }; });
    o.nombre = nombre;
    if (nombre) {
      await p.mouse.move(nombre.x + nombre.w / 2, nombre.y + nombre.h / 2, { steps: 6 }); await p.waitForTimeout(700);
      o.nombreHover = await p.evaluate(() => ({ color: getComputedStyle(window.__nom).color, retrato: [...document.querySelectorAll('#section-the-team img')].filter(i => { const r = i.getBoundingClientRect(); const s = getComputedStyle(i); return r.width > 50 && r.top < innerHeight && r.bottom > 0 && parseFloat(s.opacity) > 0.5; }).map(i => { const r = i.getBoundingClientRect(); return { rect: [r.x, r.y, r.width, r.height].map(Math.round) }; }).slice(0, 3) }));
      await p.screenshot({ path: path.join(dirCapt, 'detalle-equipo-hover-1440.jpg'), type: 'jpeg', quality: 80 });
    }
  }
  await ctx.close();
}

await nav.close();
fs.writeFileSync(path.join(dirCrudo, 'movimiento.json'), JSON.stringify(out, null, 1));
console.log('ok movimiento');
