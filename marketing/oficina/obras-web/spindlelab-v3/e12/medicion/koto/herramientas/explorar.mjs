// E12 · Koto · primer recorrido: estructura de secciones, fondos y textos grandes de una página.
// Uso: node explorar.mjs <url> <salida-base> [ancho=1440]
// Deja <salida-base>.json y <salida-base>.png (página completa reducida a 480 de ancho para mirar).
import { pathToFileURL } from 'node:url';
import fs from 'node:fs';
const { chromium } = await import(pathToFileURL('/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs').href);

const [url, base, anchoArg] = process.argv.slice(2);
const ancho = +(anchoArg || 1440);
const nav = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  proxy: process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY } : undefined,
});
const ctx = await nav.newContext({ viewport: { width: ancho, height: ancho > 800 ? 900 : 844 }, deviceScaleFactor: 1 });
const p = await ctx.newPage();
await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
await p.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {});
await p.waitForTimeout(2000);
// Cookiebot de Koto: botón con id conocido; si no, se deja (se anota).
const cookies = await p.evaluate(() => {
  const b = document.querySelector('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll, #CybotCookiebotDialogBodyButtonAccept, [data-ref*=accept]');
  if (b) { b.click(); return b.id || b.textContent.trim(); }
  return null;
});
await p.waitForTimeout(800);
const alto = await p.evaluate(() => document.documentElement.scrollHeight);
for (let y = 0; y < alto + 900; y += 450) { await p.mouse.wheel(0, 450); await p.waitForTimeout(160); }
await p.waitForTimeout(1200);
await p.evaluate(() => scrollTo(0, 0));
await p.waitForTimeout(1200);
const datos = await p.evaluate(() => {
  const main = document.querySelector('main') || document.body;
  const secs = [];
  const recorrer = (el, prof) => {
    for (const c of el.children) {
      const r = c.getBoundingClientRect();
      if (r.height < 40 || r.width < 200) continue;
      const s = getComputedStyle(c);
      const txt = [...c.querySelectorAll('h1,h2,h3,h4,p,span,a')].filter(e => e.children.length === 0 && e.textContent.trim().length > 2).slice(0, 6).map(e => ({ t: e.textContent.trim().slice(0, 70), fs: getComputedStyle(e).fontSize, ff: getComputedStyle(e).fontFamily.split(',')[0] }));
      secs.push({ prof, tag: c.tagName, id: c.id || null, cls: (typeof c.className === 'string' ? c.className : '').slice(0, 160), top: Math.round(r.top + scrollY), h: Math.round(r.height), w: Math.round(r.width), x: Math.round(r.left), bg: s.backgroundColor, color: s.color, txt });
      if (prof < 1) recorrer(c, prof + 1);
    }
  };
  recorrer(main, 0);
  return { title: document.title, alto: document.documentElement.scrollHeight, htmlBg: getComputedStyle(document.documentElement).backgroundColor, bodyBg: getComputedStyle(document.body).backgroundColor, secs };
});
fs.writeFileSync(base + '.json', JSON.stringify({ url, ancho, cookies, ...datos }, null, 1));
await p.screenshot({ path: base + '.png', fullPage: true, scale: 'css' }).catch(e => console.error('captura', String(e).slice(0, 120)));
await nav.close();
console.log('ok', base, datos.alto);
