// QA E12 paso 1, vuelta 2 (Javiera) · relee en lo servido hoy lo que cambió en el inventario desde la vuelta 1:
// la frase del h1 de la portada de Combeau (servido, textContent, innerText), la foto beto3 en kB, y los posters
// de video de la portada de spindlelab.cl (cuántos y cuánto pesan). No guarda HTML de Combeau.
// Uso: node verificar-servido.mjs <salida.json>
import { pathToFileURL } from 'node:url';
import fs from 'node:fs';
import crypto from 'node:crypto';
const { chromium } = await import(pathToFileURL('/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs').href);
const [salida] = process.argv.slice(2);
const UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36';
const res = { fecha: new Date().toISOString(), unidad: 'kB = 1.000 bytes' };

// Node fetch no pasa por el proxy por sí solo: todo va por el navegador (que sí lo usa)
const nav = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', proxy: process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY } : undefined });
const ctx = await nav.newContext({ userAgent: UA, viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();

// 1 · h1 de Combeau
const r = await p.goto('https://bernardocombeau.cl/', { waitUntil: 'load', timeout: 60000 });
const html = await r.text();
res.combeauH1 = {
  status: r.status(),
  htmlSha256: crypto.createHash('sha256').update(html).digest('hex'),
  h1Servidos: [...html.matchAll(/<h1[^>]*>[\s\S]*?<\/h1>/g)].map(m => m[0]),
  dom: await p.evaluate(() => [...document.querySelectorAll('h1')].map(h => ({ textContent: h.textContent, innerText: h.innerText }))),
};
res.combeauH1.textContentPegado = res.combeauH1.dom.some(d => /construyedirigiendo/.test(d.textContent));
res.combeauH1.innerTextSeparado = res.combeauH1.dom.some(d => /construye\s*\n\s*dirigiendo/.test(d.innerText));

// 2 · beto3: original y por el CDN, bytes del cuerpo
const bytes = async (url, headers = {}) => {
  const rr = await ctx.request.get(url, { headers });
  const b = await rr.body();
  return { url, status: rr.status(), tipo: rr.headers()['content-type'], bytes: b.length, kB: Math.round(b.length / 1000) };
};
res.beto3 = {
  original: await bytes('https://bernardocombeau.cl/uploads/beto3.jpg'),
  cdn828: await bytes('https://bernardocombeau.cl/.netlify/images?url=%2Fuploads%2Fbeto3.jpg&w=828&h=828&q=80', { Accept: 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8' }),
};

// 3 · posters de video de spindlelab.cl: los <video poster> de la portada servida
const r2 = await ctx.request.get('https://spindlelab.cl/');
const h2 = await r2.text();
const posters = [...new Set([...h2.matchAll(/poster="([^"]+)"/g)].map(m => m[1]))];
res.spindlelabPosters = [];
for (const u of posters) res.spindlelabPosters.push(await bytes(new URL(u, 'https://spindlelab.cl/').href));
res.spindlelabPostersTotalKB = Math.round(res.spindlelabPosters.reduce((a, x) => a + x.bytes, 0) / 1000);

await nav.close();
fs.writeFileSync(salida, JSON.stringify(res, null, 1));
console.log(JSON.stringify(res, null, 1));
