// QA E12 paso 1, vuelta 2 (Javiera) · complemento: dónde empieza el marco del showreel de Koto (el margen
// lateral real, porque el título queda dentro del video con un retiro propio), la barra lateral de /work y el
// ancho de las piezas del muro.
// Uso: node remedir-koto-marco.mjs <salida.json>
import { pathToFileURL } from 'node:url';
import fs from 'node:fs';
const { chromium } = await import(pathToFileURL('/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs').href);
const [salida] = process.argv.slice(2);
const nav = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', proxy: process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY } : undefined });
const res = { fecha: new Date().toISOString() };
const ctx = await nav.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, timezoneId: 'America/Santiago' });
await ctx.route(/player\.vimeo\.com\/video\//, r => r.abort());
const p = await ctx.newPage();
await p.goto('https://koto.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });
await p.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {});
await p.waitForTimeout(2500);
res.home = await p.evaluate(() => {
  const t = document.querySelector('[data-ref-showreel-title-title]');
  const cadena = [];
  let c = t; for (let i = 0; i < 9 && c; i++, c = c.parentElement) { const r = c.getBoundingClientRect(); const s = getComputedStyle(c); cadena.push({ tag: c.tagName.toLowerCase(), x: Math.round(r.x), w: Math.round(r.width), pad: s.paddingLeft, radio: s.borderRadius, dataRef: [...c.attributes].filter(a => a.name.startsWith('data-ref')).map(a => a.name).join(' ') }); }
  const vids = [...document.querySelectorAll('video, iframe, [data-ref-showreel] *')].map(v => { const r = v.getBoundingClientRect(); return { tag: v.tagName.toLowerCase(), x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), radio: getComputedStyle(v).borderRadius }; }).filter(v => v.w > 600).slice(0, 4);
  return { cadenaDelTitulo: cadena, mediosAnchos: vids };
});
await p.goto('https://koto.com/work', { waitUntil: 'domcontentloaded', timeout: 60000 });
await p.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {});
await p.waitForTimeout(2500);
res.trabajo = await p.evaluate(() => {
  const s = document.querySelector('[class*="w-sidebar"]');
  const r = s ? s.getBoundingClientRect() : null;
  const piezas = [...document.querySelectorAll('a[href^="/work/"], a[href*="koto.com/work/"]')].map(a => a.getBoundingClientRect()).filter(r => r.width > 300).slice(0, 6).map(r => ({ x: Math.round(r.x * 10) / 10, w: Math.round(r.width * 10) / 10 }));
  return { barra: r ? { x: Math.round(r.x), w: Math.round(r.width * 10) / 10, clase: String(s.className).slice(0, 80) } : null, piezas };
});
await nav.close();
fs.writeFileSync(salida, JSON.stringify(res, null, 1));
console.log(JSON.stringify(res, null, 1));
