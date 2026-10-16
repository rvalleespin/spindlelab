// Vuelca los scripts en línea, la hoja compartida de Webflow y los <style> en línea de una página
// a una carpeta aparte (datos de terceros: se leen, no se ejecutan). Uso: node volcar-fuentes.mjs <url> <carpeta>
import { pathToFileURL } from 'node:url';
import { writeFileSync, mkdirSync } from 'node:fs';
const { chromium } = await import(pathToFileURL('/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs').href);
const [url, out] = process.argv.slice(2);
mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] });
const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
const bodies = {};
page.on('response', async (r) => { const u = r.url(); if (/website-files\.com.*\.(css|js)$/.test(u)) { try { bodies[u] = await r.text(); } catch {} } });
await page.goto(url, { waitUntil: 'networkidle', timeout: 90000 });
await page.waitForTimeout(2000);
const d = await page.evaluate(() => ({
  inline: [...document.scripts].filter((s) => !s.src).map((s) => s.textContent),
  styles: [...document.querySelectorAll('style')].map((s) => s.textContent),
  html: document.documentElement.outerHTML,
}));
const slug = new URL(url).pathname.replace(/\W+/g, '_') || 'home';
writeFileSync(`${out}/${slug}-inline-scripts.js`, d.inline.map((t, i) => `/* ---- inline ${i} ---- */\n${t}`).join('\n\n'));
writeFileSync(`${out}/${slug}-inline-styles.css`, d.styles.map((t, i) => `/* ---- style ${i} ---- */\n${t}`).join('\n\n'));
writeFileSync(`${out}/${slug}-dom.html`, d.html);
for (const [u, b] of Object.entries(bodies)) writeFileSync(`${out}/${u.split('/').pop()}`, b);
console.log(Object.keys(bodies), d.inline.length, d.styles.length);
await browser.close();
