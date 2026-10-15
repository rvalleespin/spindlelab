// QA ronda 2 · Hoare: el titular visible de la primera pantalla (no el h1 oculto)
import { chromium } from '/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', proxy: { server: process.env.HTTPS_PROXY } });
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await p.goto('https://www.hoaresbank.co.uk', { waitUntil: 'domcontentloaded', timeout: 45000 });
await p.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
await p.waitForTimeout(2000);
console.log(JSON.stringify(await p.evaluate(() => [...document.querySelectorAll('*')].filter(el => {
  const r = el.getBoundingClientRect(); const own = [...el.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent.trim()).join('').trim();
  return own.length > 3 && r.top < 900 && r.width > 0 && parseFloat(getComputedStyle(el).fontSize) > 30;
}).map(el => { const s = getComputedStyle(el); const r = el.getBoundingClientRect(); return { tag: el.tagName, txt: el.textContent.trim().slice(0, 50), fam: s.fontFamily, size: s.fontSize, w: s.fontWeight, tt: s.textTransform, color: s.color, left: Math.round(r.left), top: Math.round(r.top) }; }))));
await b.close();
