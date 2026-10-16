// Reconocimiento rápido de la estructura: secciones de primer nivel, titulares, qué usa la letra
// Letterform Variations y qué elementos llevan cc="true" (cursor propio). Uso: node reconocer.mjs <url>
import { pathToFileURL } from 'node:url';
const { chromium } = await import(pathToFileURL('/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs').href);
const url = process.argv[2];
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] });
const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await page.goto(url, { waitUntil: 'load', timeout: 90000 });
await page.waitForTimeout(2500);
const r = await page.evaluate(() => {
  const sel = (el) => el.tagName.toLowerCase() + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/).slice(0, 3).join('.') : '');
  const main = document.querySelector('main') || document.body;
  const secs = [...document.body.querySelectorAll(':scope > *, main > *, .page-wrapper > *, .main-wrapper > *')].map((e) => ({ s: sel(e), y: Math.round(e.getBoundingClientRect().top + scrollY), h: Math.round(e.getBoundingClientRect().height), t: e.innerText?.trim().replace(/\s+/g, ' ').slice(0, 140) }));
  const hs = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((h) => ({ tag: h.tagName, s: sel(h), t: h.innerText.trim().replace(/\s+/g, ' ').slice(0, 160), fs: getComputedStyle(h).fontSize }));
  const lf = [...document.querySelectorAll('*')].filter((e) => /Letterform/i.test(getComputedStyle(e).fontFamily) && e.childNodes.length && [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())).map((e) => ({ s: sel(e), t: e.textContent.trim().slice(0, 60), fs: getComputedStyle(e).fontSize, vis: getComputedStyle(e).display + '/' + getComputedStyle(e).opacity }));
  const cc = [...document.querySelectorAll('[cc]')].map((e) => ({ s: sel(e), cc: e.getAttribute('cc'), type: e.getAttribute('cc-type'), text: e.getAttribute('cc-text') }));
  return { h: document.documentElement.scrollHeight, body: document.body.className, secs, hs, lf, cc };
});
console.log(JSON.stringify(r, null, 1));
await browser.close();
