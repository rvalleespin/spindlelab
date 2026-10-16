// orden-hero.mjs — dónde quedan el chequeo, el titular y la fila de obras en el hero (Lucía, 16-oct-2026).
// Ronda 1 de QA, defecto 4: en el build el instrumento va primero (spec §0.4, decisión de Ramón con criterio de
// conversión). Mide la y (px CSS desde el borde de arriba) del formulario del chequeo, del h1 y de la primera pieza
// de obra en dist/v3 y en los dos prototipos, a 1440 y a 390, con el aviso de cookies del build quitado.
// Sirve proto/ en 8770 y spindlelab-astro/dist en 8771 antes. Uso: node herramientas/orden-hero.mjs → img/orden-hero.json
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const AQUI = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const REPO = path.resolve(AQUI, '../../../../../..');
const { chromium } = await import(pathToFileURL(path.join(REPO, 'spindlelab-astro/node_modules/playwright/index.mjs')).href);
const nav = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const casos = [['build', 'http://127.0.0.1:8771/v3/'], ['taller', 'http://127.0.0.1:8770/taller/home.html'], ['pizarra', 'http://127.0.0.1:8770/pizarra/home.html']];
const out = [];
for (const [w, h] of [[1440, 900], [390, 844]]) for (const [cual, url] of casos) {
  const pg = await nav.newPage({ viewport: { width: w, height: h }, reducedMotion: 'reduce' });
  await pg.goto(url, { waitUntil: 'networkidle' });
  const r = await pg.evaluate(() => {
    document.querySelector('#cookie-banner')?.remove();
    const y = (s) => { const e = document.querySelector(s); return e ? Math.round(e.getBoundingClientRect().top + scrollY) : null; };
    return { chequeo: y('#chq-form'), h1: y('h1'), primera_obra: y('main .d-pieza') };
  });
  const orden = Object.entries(r).filter(([, v]) => v !== null).sort((a, b) => a[1] - b[1]).map(([k]) => k);
  out.push({ cual, ancho: w, ...r, orden: orden.join(' → ') });
  console.log(w, cual.padEnd(8), JSON.stringify(r), orden.join(' → '));
  await pg.close();
}
await nav.close();
const igual = [1440, 390].every((w) => { const o = out.filter((x) => x.ancho === w); return o.every((x) => x.orden === o[0].orden); });
fs.writeFileSync(path.join(AQUI, 'img/orden-hero.json'), JSON.stringify({ fecha: new Date().toISOString(), regla: 'spec §0.4: el instrumento primero en la home', mismo_orden_que_el_build: igual, casos: out }, null, 1));
console.log(igual ? 'mismo orden que el build en las dos direcciones y los dos anchos' : 'ORDEN DISTINTO');
