// QA E12 paso 2, vuelta 2 (Javiera; copia de la vuelta 1). Teclado, movimiento reducido, pausa de lo que se mueve solo, cursor con puntero
// grueso, ficha pegajosa de los casos, medios para el negro fuera de medios, y el chequeo corrido.
// Uso: node interacciones.mjs <base-url-de-e12-direcciones> <salida.json> <dir-capturas>
import { pathToFileURL } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';
const { chromium } = await import(pathToFileURL('/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs').href);
const [base, salida, dirCap] = process.argv.slice(2);
fs.mkdirSync(dirCap, { recursive: true });
const RUTA = { home: '', trabajo: 'trabajo/', praxi: 'trabajo/praxi/', sesenta: 'trabajo/sesenta/', 'desarrollo-web': 'servicios/desarrollo-web/' };
const nav = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--autoplay-policy=no-user-gesture-required'] });
const R = { fecha: new Date().toISOString(), vistas: {} };
const url = (d, v) => `${base}/proto/${d}/${RUTA[v]}`;

function fondoEn() {
  window.__fondoEn = (x, y, salvo) => {
    const cv = document.createElement('canvas'); cv.width = cv.height = 1; const cx = cv.getContext('2d');
    const rgba = (s) => { cx.clearRect(0, 0, 1, 1); cx.fillStyle = 'rgba(0,0,0,0)'; cx.fillStyle = s; cx.fillRect(0, 0, 1, 1); const d = cx.getImageData(0, 0, 1, 1).data; return [d[0], d[1], d[2], d[3] / 255]; };
    let c = [255, 255, 255]; const capas = [];
    for (const e of document.elementsFromPoint(Math.max(0, Math.min(innerWidth - 1, x)), Math.max(0, Math.min(innerHeight - 1, y)))) {
      if (salvo && (e === salvo || salvo.contains(e))) continue;
      if (/^(IMG|VIDEO|CANVAS)$/.test(e.tagName)) return null;
      const k = rgba(getComputedStyle(e).backgroundColor); if (k[3] > 0) { capas.push(k); if (k[3] >= 0.999) break; }
    }
    const h = rgba(getComputedStyle(document.documentElement).backgroundColor); if (h[3] > 0) c = h.slice(0, 3);
    for (let i = capas.length - 1; i >= 0; i--) { const k = capas[i]; c = [0, 1, 2].map((j) => k[j] * k[3] + c[j] * (1 - k[3])); }
    return c;
  };
  window.__lumc = (c) => { const f = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2]); };
  window.__crc = (a, b) => { const x = __lumc(a), y = __lumc(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
  window.__rgbac = (s) => { const cv = document.createElement('canvas'); cv.width = cv.height = 1; const cx = cv.getContext('2d'); cx.fillStyle = s; cx.fillRect(0, 0, 1, 1); const d = cx.getImageData(0, 0, 1, 1).data; return [d[0], d[1], d[2], d[3] / 255]; };
}

async function teclado(d, v, ancho) {
  const ctx = await nav.newContext({ viewport: { width: ancho, height: ancho > 1000 ? 900 : 844 } });
  const p = await ctx.newPage();
  await p.goto(url(d, v), { waitUntil: 'load' }); await p.waitForTimeout(900);
  await p.evaluate(fondoEn);
  const paradas = []; let primero = null;
  for (let i = 0; i < 90; i++) {
    await p.keyboard.press('Tab'); await p.waitForTimeout(90);
    const info = await p.evaluate(() => {
      const el = document.activeElement; if (!el || el === document.body) return null;
      const s = getComputedStyle(el); const r = el.getBoundingClientRect();
      const visible = r.width > 0 && r.height > 0 && r.bottom > 0 && r.top < innerHeight && r.right > 0 && r.left < innerWidth && s.visibility !== 'hidden';
      let anillo = null;
      const ow = parseFloat(s.outlineWidth) || 0;
      if (s.outlineStyle !== 'none' && ow >= 1) {
        const col = __rgbac(s.outlineColor);
        const off = parseFloat(s.outlineOffset) || 0;
        const fx = r.left - off - ow / 2 - 3, fy = r.top + r.height / 2;
        const fondo = __fondoEn(fx < 0 ? r.right + off + ow + 3 : fx, fy, el);
        anillo = { tipo: 'outline', ancho: ow, color: s.outlineColor, cr: fondo ? +__crc(col, fondo).toFixed(2) : null };
      } else if (s.boxShadow && s.boxShadow !== 'none') anillo = { tipo: 'box-shadow', v: s.boxShadow.slice(0, 60) };
      else if (s.textDecorationLine && s.textDecorationLine.includes('underline')) anillo = { tipo: 'subrayado' };
      const nombre = (el.getAttribute('aria-label') || el.textContent || el.getAttribute('placeholder') || el.value || '').replace(/\s+/g, ' ').trim().slice(0, 40);
      return { tag: el.tagName.toLowerCase(), nombre, visible, fv: el.matches(':focus-visible'), anillo, y: Math.round(r.top + scrollY) };
    });
    if (!info) continue;
    const k = `${info.tag}|${info.nombre}|${info.y}`;
    if (primero === k) break; if (!primero) primero = k;
    paradas.push(info);
    if (i === 3 || i === 12) await p.screenshot({ path: path.join(dirCap, `foco-${d}-${v}-${ancho}-${i}.jpg`), type: 'jpeg', quality: 70 });
  }
  await ctx.close();
  const sinAnillo = paradas.filter((x) => x.visible && (!x.anillo || (x.anillo.cr !== undefined && x.anillo.cr !== null && x.anillo.cr < 3)));
  const invisibles = paradas.filter((x) => !x.visible);
  return { paradas: paradas.length, sinAnillo, invisibles, muestra: paradas.slice(0, 6) };
}

async function reducido(d, v, ancho) {
  const ctx = await nav.newContext({ viewport: { width: ancho, height: ancho > 1000 ? 900 : 844 }, reducedMotion: 'reduce' });
  const p = await ctx.newPage();
  await p.goto(url(d, v), { waitUntil: 'load' }); await p.waitForTimeout(1500);
  const leer = () => p.evaluate(() => {
    const vids = [...document.querySelectorAll('video')].map((x) => ({ paused: x.paused, t: +x.currentTime.toFixed(2), autoplay: x.hasAttribute('autoplay') }));
    const anims = document.getAnimations().filter((a) => a.playState === 'running').map((a) => ({ t: a.effect && a.effect.target ? a.effect.target.className || a.effect.target.tagName : '?', it: a.effect ? a.effect.getTiming().iterations : null }));
    const escondidos = [...document.querySelectorAll('main *')].filter((e) => { const s = getComputedStyle(e); return +s.opacity === 0 && e.getClientRects().length && e.textContent.trim().length > 20; }).length;
    const circ = document.querySelector('.circulo, [class*="circulo"], [data-circulo], .cursor');
    return { vids, anims, escondidos, circulo: circ ? getComputedStyle(circ).display + '/' + getComputedStyle(circ).visibility : 'no existe', clases: document.documentElement.className };
  });
  const a = await leer();
  const s1 = await p.screenshot(); await p.waitForTimeout(2000); const s2 = await p.screenshot();
  // recorrer y volver a mirar
  const alto = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < alto; y += 700) { await p.evaluate((yy) => scrollTo(0, yy), y); await p.waitForTimeout(80); }
  await p.waitForTimeout(800);
  const b = await leer();
  await ctx.close();
  return { inicio: a, despues: b, pantallaIgual: Buffer.compare(s1, s2) === 0, bytesDistintos: s1.length !== s2.length };
}

async function pausa(d, v) {
  const ctx = await nav.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  await p.goto(url(d, v), { waitUntil: 'load' }); await p.waitForTimeout(1200);
  const alto = await p.evaluate(() => document.documentElement.scrollHeight);
  const res = [];
  for (let y = 0; y < alto; y += 600) {
    await p.evaluate((yy) => scrollTo(0, yy), y); await p.waitForTimeout(900);
    const vivos = await p.evaluate(() => [...document.querySelectorAll('video')].map((x, i) => ({ i, src: (x.currentSrc || '').split('/').pop(), corre: !x.paused && x.currentTime > 0, loop: x.loop, dur: isFinite(x.duration) ? x.duration : null, enVista: (() => { const r = x.getBoundingClientRect(); return r.bottom > 0 && r.top < innerHeight; })() })).filter((x) => x.corre && x.enVista));
    for (const vv of vivos) {
      if (res.find((r) => r.i === vv.i)) continue;
      const r = await p.evaluate((i) => {
        const x = document.querySelectorAll('video')[i];
        let c = x.parentElement, btn = null;
        for (let k = 0; k < 4 && c && !btn; k++, c = c.parentElement) btn = c.querySelector('button');
        if (!btn) return { boton: false };
        btn.focus();
        return { boton: true, nombre: btn.getAttribute('aria-label') || btn.textContent.trim(), foco: document.activeElement === btn, tab: btn.tabIndex };
      }, vv.i);
      if (r.boton && r.foco) { await p.keyboard.press('Enter'); await p.waitForTimeout(400); r.pausadoConEnter = await p.evaluate((i) => document.querySelectorAll('video')[i].paused, vv.i); }
      res.push({ ...vv, ...r });
    }
  }
  await ctx.close();
  return res;
}

async function tactil(d, v) {
  const ctx = await nav.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, deviceScaleFactor: 2 });
  const p = await ctx.newPage();
  await p.goto(url(d, v), { waitUntil: 'load' }); await p.waitForTimeout(1000);
  const m = await p.evaluate(() => ({ fino: matchMedia('(pointer: fine)').matches, grueso: matchMedia('(pointer: coarse)').matches, clases: document.documentElement.className }));
  const enlace = p.locator('a:has(img), a:has(video)').first();
  if (await enlace.count()) { try { await enlace.scrollIntoViewIfNeeded(); const bb = await enlace.boundingBox(); if (bb) await p.touchscreen.tap(bb.x + 5, bb.y + 5); } catch (e) {} }
  await p.waitForTimeout(400);
  const c = await p.evaluate(() => { const circ = document.querySelector('.circulo, [class*="circulo"]'); if (!circ) return 'no existe'; const s = getComputedStyle(circ); const r = circ.getBoundingClientRect(); return `${s.display}/${s.visibility}/${Math.round(r.width)}x${Math.round(r.height)}/op${s.opacity}`; });
  await ctx.close();
  return { ...m, circulo: c };
}

async function caso(d, v) {
  const out = {};
  for (const ancho of [1440, 390]) {
    const ctx = await nav.newContext({ viewport: { width: ancho, height: ancho > 1000 ? 900 : 844 } });
    const p = await ctx.newPage();
    await p.goto(url(d, v), { waitUntil: 'load' }); await p.waitForTimeout(900);
    const alto = await p.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < alto; y += 800) { await p.evaluate((yy) => scrollTo(0, yy), y); await p.waitForTimeout(60); }
    await p.evaluate((h) => scrollTo(0, h / 2 - 450), alto); await p.waitForTimeout(900);
    out[ancho] = await p.evaluate(() => {
      const lado = document.querySelector('aside') || document.querySelector('[class*="barra"], [class*="lateral"], [class*="ficha"]');
      const r = lado ? lado.getBoundingClientRect() : null;
      const rotulos = [...document.querySelectorAll('main section [class*="rotulo"], main section h2, main [data-seccion] [class*="rotulo"]')].map((e) => e.textContent.trim()).filter((t) => /problema|hip[oó]tesis|soluci[oó]n|la pieza|sin m[eé]trica|resultado/i.test(t));
      const activa = [...document.querySelectorAll('[aria-current="true"], [aria-current="location"], .activa, [data-activa="si"], .es-activa')].map((e) => e.textContent.trim().slice(0, 30));
      const main = document.querySelector('main'); const primeraSeccion = main ? main.querySelector('section') : null;
      return { lado: lado ? { tag: lado.tagName.toLowerCase(), cls: lado.className, top: Math.round(r.top), bottom: Math.round(r.bottom), alto: innerHeight, pos: getComputedStyle(lado).position } : null, rotulos, activa, ladoArriba: lado && primeraSeccion ? Math.round(lado.getBoundingClientRect().top - primeraSeccion.getBoundingClientRect().top) : null };
    });
    await p.screenshot({ path: path.join(dirCap, `caso-${d}-${v}-${ancho}-mitad.jpg`), type: 'jpeg', quality: 70 });
    await ctx.close();
  }
  return out;
}

async function medios(d, v) {
  const ctx = await nav.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  await p.goto(url(d, v), { waitUntil: 'load' }); await p.waitForTimeout(900);
  const alto = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < alto; y += 700) { await p.evaluate((yy) => scrollTo(0, yy), y); await p.waitForTimeout(120); }
  await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(800);
  const r = await p.evaluate(() => {
    const out = [];
    for (const e of document.querySelectorAll('img, video, canvas, picture')) {
      const b = e.getBoundingClientRect(); if (b.width < 2 || b.height < 2) continue;
      const s = getComputedStyle(e); if (s.visibility === 'hidden' || s.display === 'none') continue;
      out.push([Math.round(b.left), Math.round(b.top + scrollY), Math.round(b.width), Math.round(b.height)]);
    }
    return { rects: out, W: document.documentElement.scrollWidth, H: document.documentElement.scrollHeight };
  });
  await p.screenshot({ path: path.join(process.env.TMPCAP, `medios-${d}-${v}.png`), fullPage: true });
  await ctx.close();
  return r;
}

async function chequeo(d) {
  const ctx = await nav.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  await p.goto(url(d, 'home'), { waitUntil: 'load' }); await p.waitForTimeout(900);
  const campo = p.locator('main input').first();
  await campo.fill('example.com');
  await campo.press('Enter');
  try { await p.waitForFunction(() => /\/100|de 100|cumple/i.test((document.querySelector('[id^="chq"], .chequeo, [class*="chequeo"]') || document.body).innerText) && !/Revisando/.test(document.body.innerText), null, { timeout: 45000 }); } catch (e) {}
  await p.waitForTimeout(1500);
  const t = await p.evaluate(() => { const e = document.querySelector('[id^="chq-res"], [id^="chq"], [class*="chequeo"]'); return (e ? e.innerText : '').slice(0, 600); });
  await p.screenshot({ path: path.join(dirCap, `chequeo-${d}-1440.jpg`), type: 'jpeg', quality: 70 });
  await ctx.close();
  return t;
}

for (const d of ['a', 'b']) for (const v of Object.keys(RUTA)) {
  const k = `${d}-${v}`; const o = {};
  o.teclado1440 = await teclado(d, v, 1440);
  o.teclado390 = await teclado(d, v, 390);
  o.reducido1440 = await reducido(d, v, 1440);
  o.reducido390 = await reducido(d, v, 390);
  o.pausa = await pausa(d, v);
  o.tactil = await tactil(d, v);
  if (v === 'praxi' || v === 'sesenta') o.caso = await caso(d, v);
  o.medios1440 = await medios(d, v);
  R.vistas[k] = o;
  console.log(k, 'tab', o.teclado1440.paradas, 'sinAnillo', o.teclado1440.sinAnillo.length, '/', o.teclado390.sinAnillo.length, 'invis', o.teclado1440.invisibles.length, '/', o.teclado390.invisibles.length, 'red vids corriendo', o.reducido1440.despues.vids.filter((x) => !x.paused).length, 'anims', o.reducido1440.despues.anims.length, 'pausa', JSON.stringify(o.pausa.map((x) => [x.src, x.dur && Math.round(x.dur), x.boton, x.pausadoConEnter])), 'tactil', JSON.stringify(o.tactil));
  fs.writeFileSync(salida, JSON.stringify(R, null, 1));
}
R.chequeo = { a: await chequeo('a'), b: await chequeo('b') };
console.log('chequeo', JSON.stringify(R.chequeo));
fs.writeFileSync(salida, JSON.stringify(R, null, 1));
await nav.close();
