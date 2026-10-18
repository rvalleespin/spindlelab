// E12, encargo del paso 2, criterio 4 reescrito (Mauro, 18-oct-2026; acta del paso 2, defecto 4).
// Mide en las 10 vistas (A y B × home, /trabajo/, Praxi, Sesenta, Desarrollo web) a 1440 × 900, con movimiento
// reducido y la página recorrida antes para que todo esté en su estado final:
//   - el fondo computado de html y body (el lienzo);
//   - los rectángulos de img, video, canvas y picture visibles (lo que es medio);
//   - los elementos fuera de un medio con un fondo que no es lienzo, placa ni placa activa, ordenados por área;
//   - una captura de página completa por vista (cap-<dir>-<vista>.png, en la carpeta donde se corre; no van al repo).
// Uso, desde la carpeta de salida y con la raíz del repo servida en un puerto libre (p. ej. python3 -m http.server):
//   node medir.mjs http://127.0.0.1:<puerto> crudo.json   y luego   python3 -I cobertura.py crudo.json . cobertura.json
import { pathToFileURL } from 'node:url';
const pw = await import(pathToFileURL('/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs').href);
const [, , base, salida] = process.argv;
const fs = await import('node:fs');
const vistas = { home: '', trabajo: 'trabajo/', praxi: 'trabajo/praxi/', sesenta: 'trabajo/sesenta/', 'desarrollo-web': 'servicios/desarrollo-web/' };
const nav = await pw.chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] });
const res = {};
for (const d of ['a', 'b']) for (const [k, ruta] of Object.entries(vistas)) {
  const ctx = await nav.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const p = await ctx.newPage();
  const errores = [];
  p.on('pageerror', e => errores.push(String(e)));
  await p.goto(`${base}/marketing/oficina/obras-web/spindlelab-v3/tableros/e12-direcciones/proto/${d}/${ruta}`, { waitUntil: 'networkidle' });
  const H = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < H; y += 450) { await p.evaluate(y => window.scrollTo(0, y), y); await p.waitForTimeout(40); }
  await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(400);
  const o = await p.evaluate(() => {
    const cs = e => getComputedStyle(e);
    const tokens = new Set(['rgb(6, 6, 6)', 'rgb(20, 20, 20)', 'rgb(32, 32, 32)']);
    const rects = [];
    for (const e of document.querySelectorAll('img,video,canvas,picture')) {
      const r = e.getBoundingClientRect(); const s = cs(e);
      if (r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none')
        rects.push([Math.round(r.left + scrollX), Math.round(r.top + scrollY), Math.round(r.width), Math.round(r.height)]);
    }
    const fondos = [];
    for (const e of document.querySelectorAll('body *')) {
      if (e.closest('img,video,canvas,picture,svg')) continue;
      const s = cs(e); const bg = s.backgroundColor;
      const m = bg.match(/rgba?\(([^)]+)\)/); if (!m) continue;
      const v = m[1].split(',').map(Number); const a = v.length > 3 ? v[3] : 1;
      if (a === 0 || tokens.has(bg)) continue;
      const r = e.getBoundingClientRect(); if (r.width * r.height < 1) continue;
      fondos.push({ sel: e.tagName.toLowerCase() + (e.className && typeof e.className === 'string' ? '.' + e.className.trim().split(/\s+/).join('.') : ''), bg, area: Math.round(r.width * r.height), alto: Math.round(r.height) });
    }
    fondos.sort((x, y) => y.area - x.area);
    return { html: cs(document.documentElement).backgroundColor, body: cs(document.body).backgroundColor, W: document.documentElement.scrollWidth, H: document.documentElement.scrollHeight, rects, fondos: fondos.slice(0, 8), nFondos: fondos.length };
  });
  await p.screenshot({ path: `cap-${d}-${k}.png`, fullPage: true });
  o.errores = errores;
  res[`${d}-${k}`] = o;
  console.log(d, k, o.html, o.body, o.H, 'fondos fuera de tokens:', o.nFondos, o.fondos.slice(0, 3).map(f => `${f.sel} ${f.bg} ${f.area}`).join(' | '));
  await ctx.close();
}
await nav.close();
fs.writeFileSync(salida, JSON.stringify(res, null, 1));
