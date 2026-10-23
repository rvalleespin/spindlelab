// Clara, defecto 8: sirve el dist de la prueba, abre las tres páginas a ocho anchos, lee el title y el og:title del DOM
// y guarda la primera pantalla. Uso: node render.mjs <dist> <salida>
import { pathToFileURL } from 'node:url';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const { chromium } = await import(pathToFileURL('/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs').href);
const [DIST, SALIDA] = process.argv.slice(2);
fs.mkdirSync(SALIDA, { recursive: true });
const TIPOS = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.mjs': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.woff2': 'font/woff2', '.webm': 'video/webm', '.mp4': 'video/mp4', '.json': 'application/json', '.ico': 'image/x-icon' };
const servidor = http.createServer((req, res) => {
  let f = path.join(DIST, decodeURIComponent(req.url.split('?')[0]));
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
  if (!fs.existsSync(f)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'content-type': TIPOS[path.extname(f)] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
});
await new Promise((r) => servidor.listen(0, '127.0.0.1', r));
const puerto = servidor.address().port;
const navegador = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const RUTAS = ['auditoria-seo-tecnica', 'acompanamiento-mensual', 'redes-sociales'];
const ANCHOS = [[360, 800], [390, 844], [768, 1024], [834, 1194], [1024, 768], [1194, 834], [1440, 900], [1920, 1080]];
const out = [];
try {
  for (const slug of RUTAS) {
    for (const [w, h] of ANCHOS) {
      const ctx = await navegador.newContext({ viewport: { width: w, height: h }, reducedMotion: 'reduce' });
      const p = await ctx.newPage();
      await p.goto(`http://127.0.0.1:${puerto}/v3/servicios/${slug}/`, { waitUntil: 'load' });
      await p.waitForTimeout(400);
      const r = await p.evaluate(() => ({
        title: document.title,
        og: document.querySelector('meta[property="og:title"]')?.content,
        h1: document.querySelector('h1')?.innerText.replace(/\s+/g, ' ').trim(),
        miga: document.querySelector('nav[aria-label] ol, .miga, [aria-label="Miga"], [aria-label="Ruta"]')?.innerText.replace(/\s+/g, ' ').trim() ?? null,
        anchoDoc: document.documentElement.scrollWidth,
      }));
      await p.screenshot({ path: path.join(SALIDA, `${slug}-${w}.png`) });
      out.push({ slug, ancho: w, alto: h, ...r });
      await ctx.close();
    }
  }
} finally {
  await navegador.close();
  servidor.close();
}
fs.writeFileSync(path.join(SALIDA, 'titulos.json'), JSON.stringify(out, null, 1) + '\n');
for (const o of out) console.log(o.slug, o.ancho, '|', o.title, '| og=', o.og === o.title, '| h1:', o.h1, '| scrollWidth', o.anchoDoc);
