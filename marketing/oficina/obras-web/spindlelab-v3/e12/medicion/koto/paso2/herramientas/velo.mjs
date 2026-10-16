// E12 · Koto · paso 2 · el velo del índice: al pasar el mouse sobre una pieza, las demás se oscurecen.
// Mide qué elemento lo hace, su color y opacidad, y la curva real: la opacidad del velo de otra pieza
// leída en cada cuadro (requestAnimationFrame) durante 700 ms al entrar y al salir, más las
// transiciones que reporta getAnimations(). Lo mismo en el destacado de la home.
// Uso: node velo.mjs <dir-crudo>
import fs from 'node:fs';
import path from 'node:path';
import { abrirNavegador, contexto, cargar, aceptarCookies, recorrer, SEL_FN } from '../../herramientas/comun.mjs';

const [dirCrudo] = process.argv.slice(2);
const nav = await abrirNavegador();
const ctx = await contexto(nav, 1440);
const p = await ctx.newPage();
await cargar(p, 'https://koto.com/work');
await aceptarCookies(p);
await p.evaluate(SEL_FN);
await recorrer(p, { paso: 0.5, espera: 140 });
await p.mouse.move(5, 5);
await p.waitForTimeout(600);

const piezas = await p.evaluate(() => [...document.querySelectorAll('#main a[href^="/projects/"]')].filter(a => { const r = a.getBoundingClientRect(); return r.width > 300 && r.left > 300 && r.top >= 0 && r.bottom <= innerHeight + 400; }).slice(0, 3).map(a => { const r = a.getBoundingClientRect(); return { href: a.getAttribute('href'), x: r.x, y: r.y, w: r.width, h: r.height }; }));
const [a, b] = piezas;
// el velo de la pieza b: se busca con el mouse ya sobre a (antes del hover no tiene fondo), y se vuelve a reposo
await p.mouse.move(a.x + a.w / 2, a.y + a.h / 3);
await p.waitForTimeout(900);
await p.evaluate((hrefB) => {
  const pb = [...document.querySelectorAll(`#main a[href="${hrefB}"]`)].find(x => x.getBoundingClientRect().width > 300);
  // el velo es la capa con fondo negro translúcido que cubre la pieza
  const cands = [pb, ...pb.querySelectorAll('*')].filter(e => { const bg = getComputedStyle(e).backgroundColor; return bg !== 'rgba(0, 0, 0, 0)' && /\/ 0\.\d+\)|rgba\(\d+, \d+, \d+, 0\.\d+\)/.test(bg) && e.getBoundingClientRect().width > 300; });
  window.__velo = cands[0] || null;
  window.__leer = () => { const v = window.__velo; if (!v) return {}; const s = getComputedStyle(v); return { op: +(+s.opacity).toFixed(3), bg: s.backgroundColor, estilo: v.getAttribute('style') }; };
}, b.href);
const veloInfo = await p.evaluate(() => { const v = window.__velo; if (!v) return null; const s = getComputedStyle(v); return { sel: window.__sel(v), clases: v.className, bg: s.backgroundColor, transicion: s.transition, opacidadConHover: s.opacity, estilo: v.getAttribute('style') }; });
await p.mouse.move(5, 5);
await p.waitForTimeout(1000);
const muestrear = () => new Promise(res => { const t0 = performance.now(); const xs = []; const f = () => { const t = performance.now() - t0; xs.push({ t: Math.round(t), ...window.__leer() }); if (t < 700) requestAnimationFrame(f); else res(xs); }; requestAnimationFrame(f); });
const promEntrar = p.evaluate(muestrear);
await p.mouse.move(a.x + a.w / 2, a.y + a.h / 3);
const entrar = await promEntrar;
const animsEntrar = await p.evaluate(() => document.getAnimations().map(x => ({ prop: x.transitionProperty || x.animationName, dur: x.effect.getTiming().duration, retardo: x.effect.getTiming().delay, curva: x.effect.getTiming().easing, sel: x.effect.target ? window.__sel(x.effect.target) : null })));
await p.waitForTimeout(400);
const promSalir = p.evaluate(muestrear);
await p.mouse.move(5, 5);
const salir = await promSalir;
await nav.close();
const res = { fecha: new Date().toISOString(), pagina: 'https://koto.com/work', piezaConMouse: a.href, piezaMedida: b.href, velo: veloInfo, entrar, salir, animsEntrar: animsEntrar.slice(0, 40) };
fs.writeFileSync(path.join(dirCrudo, 'velo.json'), JSON.stringify(res, null, 1));
console.log('ok velo', JSON.stringify(veloInfo).slice(0, 300));
