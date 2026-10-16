// E12 · Koto · paso 2 · el único cambio de color atado al scroll que apareció en 27 recorridos: en /services,
// la sección que está a la vista pasa su texto de gris (#989898) a blanco y las demás vuelven a gris.
// Mide qué propiedad lo hace, su transición declarada y la curva real (color leído en cada cuadro al
// cruzar el límite entre dos secciones), y en qué punto de la ventana cambia.
// Uso: node tinta.mjs <dir-crudo>
import fs from 'node:fs';
import path from 'node:path';
import { abrirNavegador, contexto, cargar, aceptarCookies, recorrer, SEL_FN } from '../../herramientas/comun.mjs';

const [dirCrudo] = process.argv.slice(2);
const nav = await abrirNavegador();
const ctx = await contexto(nav, 1440);
const p = await ctx.newPage();
await cargar(p, 'https://koto.com/services');
await aceptarCookies(p);
await p.evaluate(SEL_FN);
await recorrer(p, { paso: 0.5, espera: 140 });
const secciones = await p.evaluate(() => [...document.querySelectorAll('[id^="section-"]')].map(s => { const r = s.getBoundingClientRect(); const cs = getComputedStyle(s); return { id: s.id, y: Math.round(r.top + scrollY), h: Math.round(r.height), color: cs.color, transicion: cs.transition, clases: (typeof s.className === 'string' ? s.className : '').slice(0, 200) }; }));
// cruzar de una a la siguiente: el borde superior de la segunda a tres cuartos de la ventana, y bajar 600 px en
// seis saltos de 100 (uno cada 60 ms) mientras se lee el color en cada cuadro
// las de servicio (strategy → brand); «our-services» está dos veces y no cambia
const cons = secciones.filter(s => /transition|color 0/.test(s.transicion) || s.transicion.includes('color'));
const [s1, s2] = cons.length >= 2 ? cons : secciones.slice(2, 4);
const vh = await p.evaluate(() => innerHeight);
await p.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), s2.y - Math.round(vh * 0.75));
await p.waitForTimeout(1200);
const antes = await p.evaluate(([a, b]) => [getComputedStyle(document.getElementById(a)).color, getComputedStyle(document.getElementById(b)).color], [s1.id, s2.id]);
const muestras = p.evaluate(([a, b]) => new Promise(res => { const t0 = performance.now(); const xs = []; const f = () => { const t = performance.now() - t0; xs.push({ t: Math.round(t), a: getComputedStyle(document.getElementById(a)).color, b: getComputedStyle(document.getElementById(b)).color }); if (t < 1200) requestAnimationFrame(f); else res(xs); }; requestAnimationFrame(f); }), [s1.id, s2.id]);
let y = s2.y - Math.round(vh * 0.75);
for (let i = 0; i < 6; i++) { y += 100; await p.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), y); await p.waitForTimeout(60); }
const curva = await muestras;
const umbral = await p.evaluate(([b]) => { const r = document.getElementById(b).getBoundingClientRect(); return { topDeLaSegundaEnLaVentana: Math.round(r.top), vh: innerHeight }; }, [s2.id]);
const anims = await p.evaluate(() => document.getAnimations().filter(a => a.effect && a.effect.target && a.effect.target.closest && a.effect.target.closest('[id^="section-"]')).map(a => ({ prop: a.transitionProperty || a.animationName, dur: a.effect.getTiming().duration, curva: a.effect.getTiming().easing })).slice(0, 10));
await nav.close();
const res = { fecha: new Date().toISOString(), pagina: 'https://koto.com/services', secciones, cruce: { de: s1.id, a: s2.id, antes, umbral, curva, animsAlCruzar: anims } };
fs.writeFileSync(path.join(dirCrudo, 'tinta.json'), JSON.stringify(res, null, 1));
console.log('ok tinta', JSON.stringify(secciones.map(s => [s.id, s.color, s.transicion])).slice(0, 600));
