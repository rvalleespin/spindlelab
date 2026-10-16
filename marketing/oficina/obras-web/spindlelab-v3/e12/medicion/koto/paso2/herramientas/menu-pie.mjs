// E12 · Koto · paso 2 · el menú abierto, el pie y el hover: ¿alguno trae un fondo claro o de color?
//   - menú abierto a 1440 (la barra plegada se abre como tarjeta) y a 390 (capa sobre la página);
//   - el pie de la home y del estudio a 1440, y el cierre de un caso (no tiene pie: tiene «Next up»);
//   - hover sobre una pieza del índice y sobre un destacado de la home: qué cambia en la ventana
//     (cuántos píxeles y hacia qué color), y si cambia el fondo de html, body o main.
// En cada estado: fondos y colores de texto computados de lo que se ve, y una captura de la ventana.
// Uso: node menu-pie.mjs <dir-crudo> <dir-capturas>
import fs from 'node:fs';
import path from 'node:path';
import { abrirNavegador, contexto, cargar, aceptarCookies, recorrer, SEL_FN } from '../../herramientas/comun.mjs';

const [dirCrudo, dirCapt] = process.argv.slice(2);
const nav = await abrirNavegador();
const out = { fecha: new Date().toISOString() };

async function pagina(url, ancho) {
  const ctx = await contexto(nav, ancho);
  const p = await ctx.newPage();
  await cargar(p, url);
  await aceptarCookies(p);
  await p.evaluate(SEL_FN);
  return { ctx, p };
}
// fondos y textos de lo que está a la vista (cajas de más de 2000 px² con fondo, y hojas de texto)
const VISTA = () => {
  const vw = innerWidth, vh = innerHeight;
  const opac = (e) => { let o = 1; for (let x = e; x && x.nodeType === 1; x = x.parentElement) o *= +getComputedStyle(x).opacity; return o; };
  const fondos = [];
  for (const e of document.querySelectorAll('body *')) {
    const s = getComputedStyle(e);
    if (s.backgroundColor === 'rgba(0, 0, 0, 0)' && s.backdropFilter === 'none') continue;
    const r = e.getBoundingClientRect();
    if (r.width * r.height < 2000 || r.bottom <= 0 || r.top >= vh || r.right <= 0 || r.left >= vw) continue;
    const o = opac(e);
    if (o < 0.05) continue;
    fondos.push({ sel: window.__sel(e), bg: s.backgroundColor, desenfoque: s.backdropFilter, opacidad: +o.toFixed(3), x: Math.round(r.left), y: Math.round(r.top), w: Math.round(r.width), h: Math.round(r.height), radio: s.borderRadius });
  }
  const textos = [];
  for (const e of document.querySelectorAll('body *')) {
    if (![...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) continue;
    const r = e.getBoundingClientRect();
    if (r.width < 1 || r.bottom <= 0 || r.top >= vh || r.right <= 0 || r.left >= vw) continue;
    const s = getComputedStyle(e);
    const o = opac(e);
    if (o < 0.1 || s.visibility === 'hidden') continue;
    textos.push({ t: e.innerText.trim().replace(/\s+/g, ' ').slice(0, 50), ff: s.fontFamily.split(',')[0], fs: s.fontSize, color: s.color, opacidad: +o.toFixed(3), y: Math.round(r.top) });
  }
  const m = document.querySelector('main') || document.querySelector('#main');
  return { scrollY: Math.round(scrollY), html: getComputedStyle(document.documentElement).backgroundColor, body: getComputedStyle(document.body).backgroundColor, main: m ? getComputedStyle(m).backgroundColor : null, fondos: fondos.slice(0, 80), textos: textos.slice(0, 80) };
};
async function captura(p, nombre) { const f = path.join(dirCapt, nombre); await p.screenshot({ path: f, type: 'jpeg', quality: 78 }); return nombre; }
async function pix(p) { return p.screenshot({ type: 'png' }); }

// ---------- menú abierto, 1440 (home, con la barra plegada) ----------
{
  const { ctx, p } = await pagina('https://koto.com/', 1440);
  await p.evaluate(() => window.scrollTo({ top: 1400, behavior: 'instant' }));
  await p.waitForTimeout(1500);
  const o = out.menu1440 = { pagina: 'home', antes: await p.evaluate(VISTA) };
  const barra = await p.evaluate(() => { const b = document.querySelector('[data-ref-header-bar]'); if (!b) return null; const r = b.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; });
  if (barra) {
    await p.mouse.move(barra.x + barra.w / 2, barra.y + barra.h / 2, { steps: 6 });
    await p.waitForTimeout(900);
    const boton = await p.evaluate(() => { const b = [...document.querySelectorAll('[data-ref-header-bar] button')].find(b => /toggle menu/i.test(b.innerText)); if (!b) return null; const r = b.getBoundingClientRect(); return r.width ? { x: r.x + r.width / 2, y: r.y + r.height / 2 } : null; });
    if (boton) { await p.mouse.click(boton.x, boton.y); await p.waitForTimeout(1400); }
    o.abierto = await p.evaluate(VISTA);
    o.captura = await captura(p, 'menu-abierto-1440.jpg');
  }
  await ctx.close();
}
// ---------- menú abierto, 390 (estudio) ----------
{
  const { ctx, p } = await pagina('https://koto.com/about', 390);
  const o = out.menu390 = { pagina: 'estudio' };
  const b = await p.evaluate(() => { const b = [...document.querySelectorAll('[data-ref-header-controls] button')].find(b => b.innerText.trim().toLowerCase() === 'menu' && b.getBoundingClientRect().width > 0); if (!b) return null; const r = b.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; });
  if (b) { await p.touchscreen.tap(b.x, b.y); await p.waitForTimeout(1500); o.abierto = await p.evaluate(VISTA); o.captura = await captura(p, 'menu-abierto-390.jpg'); }
  await ctx.close();
}
// ---------- pie: home y estudio a 1440; cierre de caso ----------
for (const [id, url] of [['home', 'https://koto.com/'], ['estudio', 'https://koto.com/about'], ['servicios', 'https://koto.com/services'], ['caso-lyft', 'https://koto.com/projects/lyft']]) {
  const { ctx, p } = await pagina(url, 1440);
  await recorrer(p, { paso: 0.5, espera: 140 });
  await p.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }));
  await p.waitForTimeout(1600);
  const o = out['pie_' + id] = { url, vista: await p.evaluate(VISTA) };
  o.footer = await p.evaluate(() => { const f = document.querySelector('footer'); if (!f) return null; const r = f.getBoundingClientRect(); const s = getComputedStyle(f); return { bg: s.backgroundColor, color: s.color, y: Math.round(r.top + scrollY), h: Math.round(r.height), texto: f.innerText.replace(/\s+/g, ' ').slice(0, 300) }; });
  o.captura = await captura(p, `pie-${id}-1440.jpg`);
  await ctx.close();
}
// ---------- hover: pieza del índice y destacado de la home ----------
async function hover(url, ancho, buscar, nombre) {
  const { ctx, p } = await pagina(url, ancho);
  await recorrer(p, { paso: 0.5, espera: 140 });
  const caja = await p.evaluate(buscar);
  if (!caja) { await ctx.close(); return { hallado: false }; }
  await p.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), Math.max(0, caja.yPagina - 120));
  await p.waitForTimeout(1200);
  const c = await p.evaluate(buscar);
  await p.mouse.move(5, 5);
  await p.waitForTimeout(500);
  const a = await p.evaluate(VISTA);
  const imgA = await pix(p);
  await p.mouse.move(c.x + c.w * 0.5, c.y + c.h * 0.4, { steps: 8 });
  await p.waitForTimeout(1000);
  const b = await p.evaluate(VISTA);
  const imgB = await pix(p);
  const fa = path.join(dirCrudo, nombre + '-reposo.png'), fb = path.join(dirCrudo, nombre + '-hover.png');
  fs.writeFileSync(fa, imgA); fs.writeFileSync(fb, imgB);
  const capt = await captura(p, nombre + '-hover.jpg');
  await ctx.close();
  return { hallado: true, caja: c, fondoAntes: { html: a.html, body: a.body, main: a.main }, fondoDespues: { html: b.html, body: b.body, main: b.main },
    fondosNuevos: b.fondos.filter(f => !a.fondos.some(g => g.sel === f.sel && g.bg === f.bg && g.opacidad === f.opacidad)), pngReposo: path.basename(fa), pngHover: path.basename(fb), captura: capt };
}
out.hoverIndice = await hover('https://koto.com/work', 1440, () => {
  const a = [...document.querySelectorAll('#main a[href^="/projects/"]')].find(x => { const r = x.getBoundingClientRect(); return r.width > 300 && r.height > 200 && r.left > 300; });
  if (!a) return null; const r = a.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height, yPagina: r.top + scrollY, href: a.getAttribute('href') };
}, 'hover-indice-1440');
out.hoverDestacado = await hover('https://koto.com/', 1440, () => {
  const a = [...document.querySelectorAll('[data-ref-featured-project-media-landscape], a[href^="/projects/"]')].find(x => { const r = x.getBoundingClientRect(); return r.width > 500 && r.height > 250; });
  if (!a) return null; const r = a.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height, yPagina: r.top + scrollY };
}, 'hover-destacado-1440');

await nav.close();
fs.writeFileSync(path.join(dirCrudo, 'menu-pie.json'), JSON.stringify(out, null, 1));
console.log('ok menu-pie', Object.keys(out).join(' '));
