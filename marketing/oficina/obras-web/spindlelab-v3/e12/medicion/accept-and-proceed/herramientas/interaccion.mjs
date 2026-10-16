// Interacción en acceptandproceed.com, medida con el mouse de Playwright (hover real, no simulado por CSS):
// cursor propio (reposo, sobre proyecto, sobre enlace y botón; cómo sigue al mouse), hover de tarjetas,
// enlaces de la cabecera, botones y etiquetas; cabecera que se esconde al bajar; reloj de inactividad;
// «Read More» del caso; menú a 390 y desde qué ancho aparece.
// Uso: node interaccion.mjs <salida.json> <carpeta-capturas>
import { pathToFileURL } from 'node:url';
import { writeFileSync, mkdirSync } from 'node:fs';
const { chromium } = await import(pathToFileURL('/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs').href);
const [out, cap] = process.argv.slice(2);
mkdirSync(cap, { recursive: true });
const R = {};
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] });
const shot = async (page, name, clip) => {
  if (clip) { // recorte dentro del viewport
    const v = page.viewportSize();
    const x = Math.max(0, Math.min(clip.x, v.width - 10)), y = Math.max(0, Math.min(clip.y, v.height - 10));
    clip = { x, y, width: Math.max(10, Math.min(clip.width, v.width - x)), height: Math.max(10, Math.min(clip.height, v.height - y)) };
  }
  return page.screenshot({ path: `${cap}/${name}.jpg`, type: 'jpeg', quality: 80, ...(clip ? { clip } : {}) });
};
// Los iframes de Vimeo no reproducen en este Chromium (sin H.264) y, al fallar, toman el foco y
// desplazan la página hasta ellos (medido: /work saltaba a scrollY 4643 sin tocar nada). Se bloquean:
// queda el póster que el sitio pone debajo, que es lo que se ve antes de que arranque el video.
const nuevoContexto = async (opts) => { const c = await browser.newContext(opts); await c.route(/player\.vimeo\.com/, (r) => r.abort()); await c.addInitScript(() => { const st = () => { const e = document.createElement('style'); e.textContent = 'iframe[src*="player.vimeo.com"]{visibility:hidden !important}'; (document.head || document.documentElement).appendChild(e); }; if (document.documentElement) st(); else document.addEventListener('DOMContentLoaded', st); }); return c; };
const hideVimeo = (page) => page.addStyleTag({ content: 'iframe[src*="player.vimeo.com"]{visibility:hidden !important}' });

const cursorState = (page) => page.evaluate(() => {
  const c = document.querySelector('.custom-cursor');
  const w = document.querySelector('.custom-cursor-wrap');
  const t = document.querySelector('.custom-cursor-text');
  const g = document.querySelector('.custom-cursor-text-grid');
  const cs = getComputedStyle(c), ts = getComputedStyle(t);
  const b = c.getBoundingClientRect();
  return {
    clases: c.className, centro: { x: Math.round(b.left + b.width / 2), y: Math.round(b.top + b.height / 2) }, tam: `${Math.round(b.width * 10) / 10}x${Math.round(b.height * 10) / 10}`,
    fondo: cs.backgroundColor, backdrop: cs.backdropFilter, radio: cs.borderRadius, opacidad: cs.opacity, minW: cs.minWidth, minH: cs.minHeight, transicion: `${cs.transitionProperty} ${cs.transitionDuration} ${cs.transitionTimingFunction}`,
    texto: t.innerText, textoVisible: g.classList.contains('text-visible'), textoFuente: `${ts.fontFamily.split(',')[0]} ${ts.fontSize} ${ts.fontWeight} ${ts.color} pad ${ts.paddingLeft}/${ts.paddingRight}`,
    wrapDisplay: getComputedStyle(w).display, wrapTransform: getComputedStyle(w).transform, cursorNativo: getComputedStyle(document.body).cursor,
  };
});

// ---------- 1440: /work ----------
{
  const ctx = await nuevoContexto({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto('https://acceptandproceed.com/work', { waitUntil: 'load', timeout: 90000 });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(2500);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(600);
  await hideVimeo(page);
  // Reposo: el mouse sobre un espacio vacío (columna izquierda, sobre el titular).
  await page.mouse.move(400, 250, { steps: 8 });
  await page.waitForTimeout(1500);
  R.cursorReposo = await cursorState(page);
  await shot(page, 'cursor-reposo-1440', { x: 340, y: 190, width: 120, height: 120 });
  // Sobre una tarjeta de proyecto.
  const card = page.locator('a.cms-card-link').nth(1);
  const bb = await card.boundingBox();
  const antes = await page.evaluate(() => { const i = document.querySelectorAll('a.cms-card-link')[1].querySelector('.cms-card-thumbnail-image'); return getComputedStyle(i).transform; });
  await shot(page, 'tarjeta-reposo-1440', { x: bb.x - 20, y: bb.y - 20, width: bb.width + 40, height: Math.min(900 - bb.y + 20, bb.height + 200) });
  await page.mouse.move(bb.x + bb.width * 0.55, bb.y + bb.height * 0.5, { steps: 10 });
  await page.waitForTimeout(1500);
  R.cursorSobreProyecto = await cursorState(page);
  R.tarjetaHover = await page.evaluate(() => { const a = document.querySelectorAll('a.cms-card-link')[1]; const i = a.querySelector('.cms-card-thumbnail-image'); const cs = getComputedStyle(i); return { transformImagen: cs.transform, transicion: `${cs.transitionProperty} ${cs.transitionDuration} ${cs.transitionTimingFunction}`, titulo: getComputedStyle(a.closest('.cms-card').querySelector('.cms-card-title-text')).color }; });
  R.tarjetaHover.transformAntes = antes;
  await shot(page, 'tarjeta-hover-con-cursor-1440', { x: bb.x - 20, y: bb.y - 20, width: bb.width + 40, height: Math.min(900 - bb.y + 20, bb.height + 200) });
  const c = R.cursorSobreProyecto.centro;
  await shot(page, 'cursor-sobre-proyecto-detalle-1440', { x: c.x - 110, y: c.y - 50, width: 220, height: 100 });
  // Cómo sigue al mouse: salto instantáneo de 800 px en x, muestreo por cuadro.
  await page.mouse.move(300, 450, { steps: 1 });
  await page.waitForTimeout(1500);
  await page.evaluate(() => { window.__m = []; const t0 = performance.now(); const f = () => { const b = document.querySelector('.custom-cursor').getBoundingClientRect(); window.__m.push([Math.round(performance.now() - t0), Math.round(b.left + b.width / 2)]); if (performance.now() - t0 < 1500) requestAnimationFrame(f); }; requestAnimationFrame(f); });
  await page.mouse.move(1100, 450, { steps: 1 });
  await page.waitForTimeout(1700);
  const m = await page.evaluate(() => window.__m);
  const x0 = m[0][1], dist = 1100 - x0;
  const hit = (p) => (m.find(([, x]) => (x - x0) / dist >= p) || [null])[0];
  R.cursorSeguimiento = { desde: x0, hasta: 1100, muestras: m.filter((_, i) => i % 3 === 0).slice(0, 40), ms50: hit(0.5), ms90: hit(0.9), ms99: hit(0.99), nota: 'IX2 MOUSE_MOVE continuo sobre .custom-cursor-wrap (100vw×100vh, translate −50%…+50% según la posición en el viewport), smoothing 50' };
  // Sobre un enlace de la cabecera (tipo fade-out) y su hover.
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(600);
  const nav = page.locator('a.header-nav-link').nth(1);
  const nb = await nav.boundingBox();
  const navAntes = await page.evaluate(() => { const a = document.querySelectorAll('a.header-nav-link')[1]; const cs = getComputedStyle(a); return { color: cs.color, fondo: cs.backgroundColor, radio: cs.borderRadius, padding: `${cs.paddingTop} ${cs.paddingRight}`, tam: `${a.getBoundingClientRect().width}x${a.getBoundingClientRect().height}` }; });
  await shot(page, 'cabecera-reposo-1440', { x: 600, y: 0, width: 520, height: 64 });
  await page.mouse.move(nb.x + nb.width / 2, nb.y + nb.height / 2, { steps: 6 });
  await page.waitForTimeout(700);
  R.enlaceCabecera = { antes: navAntes, hover: await page.evaluate(() => { const a = document.querySelectorAll('a.header-nav-link')[1]; const cs = getComputedStyle(a); return { color: cs.color, fondo: cs.backgroundColor, radio: cs.borderRadius }; }), actual: await page.evaluate(() => { const a = document.querySelector('a.header-nav-link.w--current'); if (!a) return null; const cs = getComputedStyle(a); return { texto: a.innerText, color: cs.color, fondo: cs.backgroundColor, radio: cs.borderRadius, tam: `${a.getBoundingClientRect().width}x${a.getBoundingClientRect().height}` }; }), cursor: await cursorState(page) };
  await shot(page, 'cabecera-hover-about-1440', { x: 600, y: 0, width: 520, height: 64 });
  // Etiqueta de proyecto (detalle).
  const tag = page.locator('.tag.project-tag').first();
  await tag.scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  const tb = await tag.boundingBox();
  await shot(page, 'etiquetas-detalle-1440', { x: tb.x - 8, y: tb.y - 8, width: 260, height: 100 });
  R.etiqueta = await page.evaluate(() => { const t = document.querySelector('.tag.project-tag'); const cs = getComputedStyle(t); const ic = t.querySelector('img'); return { tam: `${t.getBoundingClientRect().width}x${t.getBoundingClientRect().height}`, borde: `${cs.borderTopWidth} ${cs.borderTopColor}`, radio: cs.borderRadius, padding: `${cs.paddingTop} ${cs.paddingRight} ${cs.paddingBottom} ${cs.paddingLeft}`, icono: ic ? { src: ic.src.split('/').pop(), tam: `${ic.getBoundingClientRect().width}x${ic.getBoundingClientRect().height}` } : null, gap: cs.gap, texto: t.innerText }; });
  // Cabecera que se esconde: bajar y subir.
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  await page.mouse.wheel(0, 900);
  await page.waitForTimeout(1500);
  const bajando = await page.evaluate(() => ({ y: scrollY, transform: getComputedStyle(document.querySelector('.header')).transform, transicion: getComputedStyle(document.querySelector('.header')).transition }));
  await page.mouse.wheel(0, -200);
  await page.waitForTimeout(1200);
  const subiendo = await page.evaluate(() => ({ y: scrollY, transform: getComputedStyle(document.querySelector('.header')).transform }));
  R.cabeceraAlDesplazar = { bajando, subiendo, fondo: await page.evaluate(() => { const h = document.querySelector('.header'); const bg = document.querySelector('.header-bg'); return { header: `${getComputedStyle(h).backgroundColor} backdrop ${getComputedStyle(h).backdropFilter} alto ${h.getBoundingClientRect().height}`, bg: `${getComputedStyle(bg).backgroundColor} backdrop ${getComputedStyle(bg).backdropFilter}` }; }) };
  await shot(page, 'cabecera-sobre-contenido-1440', { x: 0, y: 0, width: 1440, height: 140 });
  // Reloj de inactividad: se fuerza la función del sitio (showOverlay) en vez de esperar 60 s.
  await page.evaluate(() => showOverlay());
  await page.waitForTimeout(1200);
  R.relojInactividad = await page.evaluate(() => { const o = document.querySelector('.clock-overlay'); const cs = getComputedStyle(o); const t = o.querySelector('.clock-text'); const ts = getComputedStyle(t); return { disparo: 'setTimeout de 60 000 ms sin mousemove ni scroll (script en línea)', fondo: cs.backgroundColor, backdrop: cs.backdropFilter, transicion: cs.transition, fuente: `${ts.fontFamily.split(',')[0]} ${ts.fontSize} variación ${ts.fontVariationSettings}`, texto: o.innerText.replace(/\s+/g, ' ').slice(0, 30), cursorOculto: getComputedStyle(document.querySelector('.custom-cursor-wrap')).display }; });
  await shot(page, 'reloj-inactividad-1440');
  await page.evaluate(() => hideOverlay());
  await page.waitForTimeout(500);
  // Reloj del pie.
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForTimeout(1500);
  const clock = page.locator('.header-and-footer-clock').last();
  const cb = await clock.boundingBox();
  // (el recorte del pie y del reloj sale de la captura completa: recortes.py; aquí Lenis no deja el pie a la vista)
  R.relojPie = await page.evaluate(() => { const c = document.querySelectorAll('.header-and-footer-clock'); return [...c].map((e) => ({ tam: `${Math.round(e.getBoundingClientRect().width)}x${Math.round(e.getBoundingClientRect().height)}`, fuente: getComputedStyle(e).fontSize, texto: e.innerText.replace(/\s+/g, ''), visible: getComputedStyle(e).display })); });
  // ¿Quedó vivo el carrusel del hero? (script en línea que busca .next y .main-slider_item)
  R.carruselHeroResto = await page.evaluate(() => ({ next: !!document.querySelector('.next'), slides: document.querySelectorAll('.main-slider_item').length }));
  await ctx.close();
}

// ---------- 1440: botón (Read More del caso) y caso abierto ----------
{
  const ctx = await nuevoContexto({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto('https://acceptandproceed.com/work/ibm-watsonx-orchestrate', { waitUntil: 'load', timeout: 90000 });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(2500);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(600);
  await hideVimeo(page);
  await page.evaluate(() => window.scrollTo(0, 700));
  await page.waitForTimeout(1500);
  const btn = page.locator('.button').filter({ hasText: 'Read More' }).first();
  const b = await btn.boundingBox();
  const cs0 = await btn.evaluate((e) => { const cs = getComputedStyle(e); return { fondo: cs.backgroundColor, color: cs.color, radio: cs.borderRadius, filtro: cs.filter, mezcla: cs.mixBlendMode, tam: `${e.getBoundingClientRect().width}x${e.getBoundingClientRect().height}`, padding: `${cs.paddingTop} ${cs.paddingRight} ${cs.paddingBottom} ${cs.paddingLeft}`, fuente: `${cs.fontSize}` }; });
  await shot(page, 'boton-reposo-1440', { x: b.x - 30, y: b.y - 20, width: b.width + 60, height: b.height + 40 });
  await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2, { steps: 6 });
  await page.waitForTimeout(800);
  const cs1 = await btn.evaluate((e) => { const cs = getComputedStyle(e); return { fondo: cs.backgroundColor, color: cs.color, filtro: cs.filter }; });
  R.boton = { reposo: cs0, hover: cs1, cursor: await cursorState(page) };
  await shot(page, 'boton-hover-1440', { x: b.x - 30, y: b.y - 20, width: b.width + 60, height: b.height + 40 });
  await btn.click();
  await page.waitForTimeout(1800);
  R.casoAbierto = await page.evaluate(() => { const d = document.querySelector('.case-study-hidden-details-wrap'); const b = d.getBoundingClientRect(); return { alto: Math.round(b.height), transicion: getComputedStyle(d).transition }; });
  await page.evaluate(() => window.scrollTo(0, 960));
  await page.waitForTimeout(1200);
  await shot(page, 'caso-texto-abierto-1440-a');
  await page.evaluate(() => window.scrollTo(0, 960 + 860));
  await page.waitForTimeout(1200);
  await shot(page, 'caso-texto-abierto-1440-b');
  await page.evaluate(() => window.scrollTo(0, 960 + 1720));
  await page.waitForTimeout(1200);
  await shot(page, 'caso-texto-abierto-1440-c');
  // Radio del hero del caso (transición de border-radius .7s): ¿cambia al bajar?
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1200);
  const r0 = await page.evaluate(() => { const h = document.querySelector('.case-study-s1-hero'); return h ? { radio: getComputedStyle(h).borderRadius, rect: h.getBoundingClientRect().toJSON() } : null; });
  await page.evaluate(() => window.scrollTo(0, 400));
  await page.waitForTimeout(1200);
  const r1 = await page.evaluate(() => { const h = document.querySelector('.case-study-s1-hero'); return h ? { radio: getComputedStyle(h).borderRadius, clase: h.className } : null; });
  R.heroCasoRadio = { arriba: r0, bajando400: r1 };
  await ctx.close();
}

// ---------- 390: menú ----------
{
  const ctx = await nuevoContexto({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  const page = await ctx.newPage();
  await page.goto('https://acceptandproceed.com/', { waitUntil: 'load', timeout: 90000 });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(2500);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(600);
  await hideVimeo(page);
  await shot(page, 'menu-cerrado-390', { x: 0, y: 0, width: 390, height: 120 });
  await page.locator('.header-menu-button').tap();
  await page.waitForTimeout(1800);
  await shot(page, 'menu-abierto-390');
  R.menu390 = await page.evaluate(() => {
    const w = document.querySelector('.header-nav-items-wrap');
    return { display: getComputedStyle(w).display, items: [...w.querySelectorAll('a')].filter((a) => a.getBoundingClientRect().height > 0).map((a) => { const t = a.querySelector('div') || a; const cs = getComputedStyle(t); return { texto: a.innerText.trim(), y: Math.round(a.getBoundingClientRect().top), tam: cs.fontSize, interlinea: cs.lineHeight, color: cs.color }; }), fondo: getComputedStyle(document.querySelector('.header-bg')).backgroundColor, alto: document.querySelector('.header').getBoundingClientRect().height, boton: getComputedStyle(document.querySelector('.header-menu-button')).width };
  });
  await ctx.close();
}

// ---------- ¿desde qué ancho hay menú de escritorio? ----------
R.cabeceraPorAncho = [];
for (const w of [1280, 1439, 1440, 1920]) {
  const ctx = await nuevoContexto({ viewport: { width: w, height: 900 } });
  const page = await ctx.newPage();
  await page.goto('https://acceptandproceed.com/work', { waitUntil: 'load', timeout: 90000 });
  await page.waitForTimeout(1500);
  R.cabeceraPorAncho.push({ ancho: w, ...(await page.evaluate(() => ({ botonMenu: getComputedStyle(document.querySelector('.header-menu-button')).display, nav: getComputedStyle(document.querySelector('.header-nav-items-wrap')).display, margen: getComputedStyle(document.querySelector('.header-container')).paddingLeft, columnas: getComputedStyle(document.querySelector('.cms-collection-list')).gridTemplateColumns, gap: getComputedStyle(document.querySelector('.cms-collection-list')).columnGap }))) });
  if (w === 1280) { await hideVimeo(page); await shot(page, 'cabecera-1280-menu', { x: 0, y: 0, width: 1280, height: 80 }); }
  await ctx.close();
}

writeFileSync(out, JSON.stringify(R, null, 1));
console.log(JSON.stringify(R, null, 1).slice(0, 6000));
await browser.close();
