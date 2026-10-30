// Maquetas del hero: carga la home construida y cambia solo los textos de la portada, para comparar opciones.
// Uso: node maquetas-hero.mjs <url-base> <carpeta-salida> <opciones.json>
import { createRequire } from 'node:module';
import { readFileSync, mkdirSync } from 'node:fs';
const require = createRequire('/home/user/spindlelab/spindlelab-astro/package.json');
const { chromium } = require('playwright');

const [base, salida, archivo] = process.argv.slice(2);
const opciones = JSON.parse(readFileSync(archivo, 'utf8'));
mkdirSync(salida, { recursive: true });
const navegador = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });

for (const [ancho, alto] of [[1440, 900], [390, 844]]) {
  const ctx = await navegador.newContext({ viewport: { width: ancho, height: alto }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
  const p = await ctx.newPage();
  await p.goto(base + '/', { waitUntil: 'networkidle' });
  // El aviso de cookies tapa la portada en el teléfono: se contesta, como haría quien vuelve.
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find((x) => /rechazar/i.test(x.textContent)); if (b) b.click(); });
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(600);
  // Fuera el aviso de confirmación de cookies, que dura unos segundos y tapa el texto.
  await p.evaluate(() => [...document.querySelectorAll('body *')].filter((n) => n.children.length === 0 && /quedaron rechazadas/i.test(n.textContent)).forEach((n) => { (n.closest('[role=status],[aria-live],div') || n).style.display = 'none'; }));
  for (const o of opciones) {
    if (o.id !== 'actual') {
      await p.evaluate((o) => {
        const q = (s) => document.querySelector(s);
        q('.portada-v__decl .rotulo').textContent = o.rotulo;
        q('#portada-titulo .tinta').textContent = o.tinta;
        q('#portada-titulo .gris').textContent = o.gris;
        q('.portada-v__decl .entradilla').textContent = o.entradilla;
        if (o.microcopy) q('.portada-v__accion .chico').textContent = o.microcopy;
      }, o);
      await p.waitForTimeout(300);
    }
    await p.screenshot({ path: `${salida}/${o.id}-${ancho}.png` });
  }
  await ctx.close();
}
await navegador.close();
