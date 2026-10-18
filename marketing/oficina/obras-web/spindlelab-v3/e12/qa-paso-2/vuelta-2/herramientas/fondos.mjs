// QA E12 paso 2, vuelta 2 (Javiera, 18-oct-2026). Criterio 4 reescrito (encargo, fila del 18-oct):
//  - html y body computan #060606;
//  - fuera de img/video/canvas/picture y de sus marcos (figure, .medio), ningún bloque pinta un fondo claro o de color
//    más grande que un control. «Claro o de color» = luminancia >= 0,05 o croma (max-min de RGB) >= 40 sobre 255, una vez
//    compuesto sobre el lienzo. Se listan todos con su área, y aparte los que son controles (a, button, input, label, summary).
// No usa las herramientas de Mauro ni de Lucía: recorre el DOM entero, resuelve el color por canvas y compone la opacidad.
// Uso: node fondos.mjs <base-url-de-e12-direcciones> <salida.json>
import { pathToFileURL } from 'node:url';
import fs from 'node:fs';
const { chromium } = await import(pathToFileURL('/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs').href);
const [base, salida] = process.argv.slice(2);
const RUTA = { home: '', trabajo: 'trabajo/', praxi: 'trabajo/praxi/', sesenta: 'trabajo/sesenta/', 'desarrollo-web': 'servicios/desarrollo-web/' };
const nav = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const R = { fecha: new Date().toISOString(), vistas: {} };
for (const d of ['a', 'b']) for (const v of Object.keys(RUTA)) {
  const ctx = await nav.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  await p.goto(`${base}/proto/${d}/${RUTA[v]}`, { waitUntil: 'load' });
  await p.waitForTimeout(800);
  const alto = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < alto; y += 600) { await p.evaluate((yy) => scrollTo(0, yy), y); await p.waitForTimeout(80); }
  await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(500);
  const r = await p.evaluate(() => {
    const cv = document.createElement('canvas'); cv.width = cv.height = 1; const cx = cv.getContext('2d', { willReadFrequently: true });
    const rgba = (s) => { cx.clearRect(0, 0, 1, 1); cx.fillStyle = 'rgba(0,0,0,0)'; cx.fillStyle = s; cx.fillRect(0, 0, 1, 1); const q = cx.getImageData(0, 0, 1, 1).data; return [q[0], q[1], q[2], q[3] / 255]; };
    const lum = (c) => { const f = (x) => { x /= 255; return x <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4); }; return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2]); };
    const opac = (el) => { let o = 1; for (let e = el; e && e.nodeType === 1; e = e.parentElement) o *= parseFloat(getComputedStyle(e).opacity); return o; };
    const MEDIO = 'img,video,canvas,picture,iframe,svg image';
    const enMarco = (el) => !!el.closest('figure, .medio, picture') || !!el.querySelector(MEDIO) && el.querySelectorAll('*').length < 6;
    const html = getComputedStyle(document.documentElement).backgroundColor, body = getComputedStyle(document.body).backgroundColor;
    const lista = [];
    for (const el of document.querySelectorAll('body *')) {
      if (el.matches(MEDIO)) continue;
      const s = getComputedStyle(el);
      if (s.display === 'none' || s.visibility === 'hidden') continue;
      const c = rgba(s.backgroundColor);
      if (c[3] === 0) continue;
      const a = c[3] * opac(el);
      if (a < 0.02) continue;
      const comp = [0, 1, 2].map((i) => c[i] * a + 6 * (1 - a));
      const L = lum(comp), croma = Math.max(...comp) - Math.min(...comp);
      if (L < 0.05 && croma < 40) continue; // neutro oscuro: lienzo y placas
      const b = el.getBoundingClientRect(); const area = Math.round(b.width * b.height);
      if (area < 1) continue;
      const control = el.matches('a,button,input,select,textarea,label,summary,[role=button]') || !!el.closest('a,button,label,summary');
      lista.push({ el: el.tagName.toLowerCase() + (typeof el.className === 'string' && el.className ? '.' + el.className.trim().split(/\s+/).slice(0, 2).join('.') : ''), color: comp.map(Math.round), L: +L.toFixed(3), w: Math.round(b.width), h: Math.round(b.height), area, control, marco: enMarco(el), y: Math.round(b.top + scrollY) });
    }
    lista.sort((x, y) => y.area - x.area);
    const fueraDeMarco = lista.filter((x) => !x.marco);
    const controles = fueraDeMarco.filter((x) => x.control);
    const bloques = fueraDeMarco.filter((x) => !x.control);
    return { html, body, mayorControl: controles[0] || null, bloquesNoControl: bloques.slice(0, 12), nBloquesNoControl: bloques.length, enMarco: lista.filter((x) => x.marco).length };
  });
  R.vistas[`${d}-${v}`] = r;
  console.log(d, v, r.html, r.body, 'mayor control', r.mayorControl && r.mayorControl.area, 'bloques no control', r.nBloquesNoControl, r.bloquesNoControl.slice(0, 3).map((x) => `${x.el} ${x.w}x${x.h} L${x.L}`).join(' | '));
  await ctx.close();
}
fs.writeFileSync(salida, JSON.stringify(R, null, 1));
await nav.close();
