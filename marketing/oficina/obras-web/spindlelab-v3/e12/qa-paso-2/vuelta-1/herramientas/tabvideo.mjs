import { pathToFileURL } from 'node:url';
import fs from 'node:fs';
const { chromium } = await import(pathToFileURL('/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs').href);
const crudo = fs.readFileSync('/home/user/spindlelab/marketing/oficina/obras-web/spindlelab-v3/tableros/e12-direcciones/tablero.html', 'utf8');
const corte = crudo.search(/<\/style>\s*/) + 8;
const env = `<!doctype html><html lang="es-CL"><head>${crudo.slice(0, corte)}</head><body>${crudo.slice(corte)}</body></html>`;
const URL_T = 'http://127.0.0.1:47311/marketing/oficina/obras-web/spindlelab-v3/tableros/e12-direcciones/__t.html';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', proxy: { server: process.env.HTTPS_PROXY, bypass: '127.0.0.1' } });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
await ctx.route(URL_T, (r) => r.fulfill({ status: 200, contentType: 'text/html; charset=utf-8', body: env }));
const p = await ctx.newPage();
await p.goto(URL_T, { waitUntil: 'networkidle' });
for (let i = 0; i < 40; i++) { await p.keyboard.press('Tab'); const t = await p.evaluate(() => document.activeElement.tagName); if (t === 'VIDEO') break; }
await p.waitForTimeout(400);
const info = await p.evaluate(() => { const v = document.activeElement; v.scrollIntoView({ block: 'center' }); const r = v.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height, controls: v.controls, tab: v.tabIndex, shadowFocus: !!(v.shadowRoot) }; });
await p.waitForTimeout(300);
const r2 = await p.evaluate(() => { const r = document.activeElement.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; });
await p.screenshot({ path: 'video-foco.png', clip: { x: Math.max(0, r2.x - 12), y: Math.max(0, r2.y - 12), width: Math.min(1440, r2.w + 24), height: Math.min(900, r2.h + 24) } });
// imágenes perezosas: forzar eager y esperar
const rotas = await p.evaluate(async () => { const im = [...document.images]; document.querySelectorAll('details').forEach((d) => d.open = true); im.forEach((i) => { i.loading = 'eager'; }); await Promise.all(im.map((i) => i.decode().catch(() => null))); return im.filter((i) => !(i.complete && i.naturalWidth > 0)).map((i) => i.getAttribute('src')); });
console.log(JSON.stringify(info), 'rotas tras eager', JSON.stringify(rotas));
await b.close();
