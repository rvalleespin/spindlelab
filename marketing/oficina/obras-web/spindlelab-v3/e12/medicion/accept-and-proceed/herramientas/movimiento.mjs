// Movimiento en acceptandproceed.com: secuencia de carga (cuadros con su tiempo), aparición al bajar,
// transiciones vivas (getAnimations) durante la carga y la aparición, scroll suave de Lenis (opciones y
// curva medida con la rueda), transición entre páginas al hacer clic, apertura de «Read More» y vista en
// grilla del caso, y lo mismo con prefers-reduced-motion: reduce.
// Uso: node movimiento.mjs <salida.json> <carpeta-capturas> <carpeta-temporal>
import { pathToFileURL } from 'node:url';
import { writeFileSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
const { chromium } = await import(pathToFileURL('/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs').href);
const [out, cap, tmp] = process.argv.slice(2);
mkdirSync(cap, { recursive: true }); mkdirSync(tmp, { recursive: true });
const R = {};
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] });
// Vimeo bloqueado: no reproduce sin H.264 y al fallar toma el foco y desplaza la página (ver interaccion.mjs).
const nuevoContexto = async (opts) => { const c = await browser.newContext(opts); await c.route(/player\.vimeo\.com/, (r) => r.abort()); await c.addInitScript(() => { const st = () => { const e = document.createElement('style'); e.textContent = 'iframe[src*="player.vimeo.com"]{visibility:hidden !important}'; (document.head || document.documentElement).appendChild(e); }; if (document.documentElement) st(); else document.addEventListener('DOMContentLoaded', st); }); return c; };

const anims = (page) => page.evaluate(() => document.getAnimations().map((a) => { const t = a.effect?.getTiming?.() || {}; const el = a.effect?.target; return { tipo: a.constructor.name, prop: a.transitionProperty || a.animationName || '', objetivo: el ? (el.tagName.toLowerCase() + '.' + String(el.className).split(' ').slice(0, 2).join('.')) : '', duracion: t.duration, curva: t.easing, retardo: t.delay, estado: a.playState }; }));
const resumirAnims = (l) => { const m = {}; for (const a of l) { const k = `${a.tipo} ${a.prop} ${a.duracion}ms ${a.curva} delay ${a.retardo}`; (m[k] ||= { n: 0, ej: a.objetivo }).n++; } return m; };

const ruedaCurva = async (page, delta) => {
  await page.mouse.move(700, 450);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1200);
  await page.evaluate(() => { window.__s = []; const t0 = performance.now(); const f = () => { window.__s.push([Math.round(performance.now() - t0), Math.round(scrollY * 10) / 10]); if (performance.now() - t0 < 2200) requestAnimationFrame(f); }; requestAnimationFrame(f); });
  await page.mouse.wheel(0, delta);
  await page.waitForTimeout(2400);
  const s = await page.evaluate(() => window.__s);
  const fin = s[s.length - 1][1];
  const t = (p) => (s.find(([, y]) => y >= fin * p) || [null])[0];
  return { delta, final: fin, ms10: t(0.1), ms50: t(0.5), ms90: t(0.9), ms99: t(0.99), muestras: s.filter((_, i) => i % 6 === 0).slice(0, 24) };
};

async function correr(etiqueta, opts) {
  const r = {};
  const ctx = await nuevoContexto(opts);
  const page = await ctx.newPage();
  // 1 · Secuencia de carga de /work: cuadros con su tiempo desde el inicio de la navegación.
  await page.goto('https://acceptandproceed.com/work', { waitUntil: 'commit', timeout: 90000 });
  const cuadros = [];
  for (let i = 0; i < 9; i++) {
    const t = await page.evaluate(() => Math.round(performance.now())).catch(() => null);
    const f = `${tmp}/carga-${etiqueta}-${i}.png`;
    await page.screenshot({ path: f }).catch(() => {});
    cuadros.push({ ms: t, f });
    if (i === 3) r.animacionesDuranteCarga = resumirAnims(await anims(page));
    await page.waitForTimeout(i < 5 ? 150 : 400);
  }
  r.cuadrosCarga = cuadros.map((c) => c.ms);
  execFileSync('python3', ['-I', new URL('./tira.py', import.meta.url).pathname, `${cap}/carga-secuencia-${etiqueta}.jpg`, ...cuadros.map((c) => `${c.f}:${c.ms} ms`)]);
  await page.waitForLoadState('load');
  await page.waitForTimeout(2000);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(800);
  r.htmlClases = await page.evaluate(() => document.documentElement.className);
  r.lenis = await page.evaluate(() => { try { const o = lenis.options; return { version: lenis.version || null, lerp: o.lerp, duration: o.duration, smoothWheel: o.smoothWheel, syncTouch: o.syncTouch, wheelMultiplier: o.wheelMultiplier, touchMultiplier: o.touchMultiplier, wrapper: o.wrapper === document.body ? 'document.body' : String(o.wrapper), easing: String(o.easing).slice(0, 80), isSmooth: lenis.isSmooth ?? null, clases: document.documentElement.className }; } catch (e) { return { error: String(e) }; } });
  r.placeholderTransicion = await page.evaluate(() => { const p = document.querySelector('.placeholder_wrap:not(.limited-fade-in)'); const c = p?.querySelector('.placeholder_wrap_content'); return p ? { wrap: getComputedStyle(p).transition, contenido: getComputedStyle(c).transition, antes: getComputedStyle(p, '::before').transition } : null; });
  // 2 · Rueda: una muesca (100 px) y un gesto largo (600 px).
  r.rueda100 = await ruedaCurva(page, 100);
  r.rueda600 = await ruedaCurva(page, 600);
  // 3 · Aparición al bajar: se salta a un bloque aún no visto y se toman cuadros.
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(600);
  const y = await page.evaluate(() => { const l = [...document.querySelectorAll('.placeholder_wrap')].find((p) => !p.classList.contains('fade-in-content') && p.getBoundingClientRect().top > 1500); return l ? Math.round(l.getBoundingClientRect().top + scrollY - 200) : 3000; });
  await page.evaluate((yy) => window.scrollTo(0, yy), y);
  const ap = [];
  const t0 = Date.now();
  for (let i = 0; i < 6; i++) {
    const f = `${tmp}/aparicion-${etiqueta}-${i}.png`;
    await page.screenshot({ path: f });
    ap.push({ ms: Date.now() - t0, f });
    if (i === 1) r.animacionesDuranteAparicion = resumirAnims(await anims(page));
    await page.waitForTimeout(i < 3 ? 200 : 450);
  }
  execFileSync('python3', ['-I', new URL('./tira.py', import.meta.url).pathname, `${cap}/aparicion-al-bajar-${etiqueta}.jpg`, ...ap.map((c) => `${c.f}:+${c.ms} ms`)]);
  r.aparicion = { scrollA: y, cuadrosMs: ap.map((c) => c.ms) };
  // 4 · Seguimiento del cursor con movimiento reducido (¿sigue igual?).
  await page.mouse.move(300, 450);
  await page.waitForTimeout(1200);
  await page.evaluate(() => { window.__m = []; const t0 = performance.now(); const f = () => { const b = document.querySelector('.custom-cursor').getBoundingClientRect(); window.__m.push([Math.round(performance.now() - t0), Math.round(b.left + b.width / 2)]); if (performance.now() - t0 < 1200) requestAnimationFrame(f); }; requestAnimationFrame(f); });
  await page.mouse.move(1100, 450, { steps: 1 });
  await page.waitForTimeout(1400);
  const m = await page.evaluate(() => window.__m);
  const hit = (p) => (m.find(([, x]) => (x - m[0][1]) / (1100 - m[0][1]) >= p) || [null])[0];
  r.cursorSeguimiento = { ms50: hit(0.5), ms90: hit(0.9), ms99: hit(0.99), inicio: m[0][1] };
  // 5 · Transición entre páginas: clic en una tarjeta, cuadros hasta que cambia la URL.
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1500);
  const card = page.locator('a.cms-card-link').nth(1);
  const bb = await card.boundingBox();
  await page.evaluate(() => { window.__o = []; const t0 = performance.now(); const p = document.querySelector('.placeholder_wrap:not(.limited-fade-in) .placeholder_wrap_content'); const f = () => { window.__o.push([Math.round(performance.now() - t0), getComputedStyle(p).opacity, getComputedStyle(p.parentElement).transform]); requestAnimationFrame(f); }; requestAnimationFrame(f); });
  await page.mouse.click(bb.x + bb.width / 2, bb.y + bb.height / 2);
  await page.waitForTimeout(250);
  await page.screenshot({ path: `${tmp}/salida-${etiqueta}.png` }).catch(() => {});
  const salida = await page.evaluate(() => window.__o).catch(() => null);
  r.salidaDePagina = { muestras: salida ? salida.filter((_, i) => i % 3 === 0).slice(0, 14) : 'la página ya cambió', nota: 'delayLinks(): preventDefault, fadeOutPlaceholderBlocks() y window.location tras 400 ms (600 en tema oscuro)' };
  await page.waitForURL(/\/work\/.+/, { timeout: 10000 }).catch(() => {});
  r.salidaDePagina.urlDestino = page.url();
  await ctx.close();
  return r;
}

R.normal = await correr('normal', { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
R.reducido = await correr('reducido', { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });

// 6 · Caso: «Read More» (alto en el tiempo) y botón de vista en grilla.
{
  const ctx = await nuevoContexto({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto('https://acceptandproceed.com/work/ibm-watsonx-orchestrate', { waitUntil: 'load', timeout: 90000 });
  await page.waitForTimeout(2500);
  await page.evaluate(() => window.scrollTo(0, 700));
  await page.waitForTimeout(1500);
  await page.evaluate(() => { window.__h = []; const d = document.querySelector('.case-study-hidden-details-wrap'); const t0 = performance.now(); const f = () => { window.__h.push([Math.round(performance.now() - t0), Math.round(d.getBoundingClientRect().height)]); if (performance.now() - t0 < 1600) requestAnimationFrame(f); }; requestAnimationFrame(f); });
  await page.locator('.button').filter({ hasText: 'Read More' }).first().click();
  await page.waitForTimeout(1800);
  const h = await page.evaluate(() => window.__h);
  const fin = h[h.length - 1][1];
  R.readMore = { altoFinal: fin, ms50: (h.find(([, v]) => v >= fin * 0.5) || [null])[0], ms90: (h.find(([, v]) => v >= fin * 0.9) || [null])[0], muestras: h.filter((_, i) => i % 6 === 0) };
  // Vista en grilla
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(800);
  const botones = await page.evaluate(() => [...document.querySelectorAll('.case-study-view-button')].map((b) => ({ clase: b.className, visible: b.getBoundingClientRect().width > 0, rect: b.getBoundingClientRect().toJSON() })));
  R.vistaGrilla = { botones };
  const vis = page.locator('.case-study-view-button:visible').first();
  if (await vis.count()) {
    await vis.click();
    await page.waitForTimeout(1800);
    await page.screenshot({ path: `${cap}/caso-vista-grilla-1440.jpg`, type: 'jpeg', quality: 80 });
    R.vistaGrilla.despues = await page.evaluate(() => ({ alto: document.documentElement.scrollHeight, grillas: [...document.querySelectorAll('.case-study-grid-images, .cs-block-images-collection-list')].map((g) => ({ clase: g.className, display: getComputedStyle(g).display, columnas: getComputedStyle(g).gridTemplateColumns, visible: g.getBoundingClientRect().height })) }));
  }
  await ctx.close();
}
writeFileSync(out, JSON.stringify(R, null, 1));
console.log(JSON.stringify(R, null, 1).slice(0, 9000));
await browser.close();
