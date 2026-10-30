#!/usr/bin/env node
// El aire entre los párrafos de la biografía («Quién está detrás» de la home y la bio de /nosotros/), que la spec fija en
// 16 px desde el 30-oct (spec-home criterio 22; spec-visual §2.1 fila 6; acta de QA del 30-oct, menor 4), y el alto de la
// home tras recorrerla (criterio 5). Lucía y Diego, 30-oct-2026.
// Mide, a 390 y 1440: los `p.cuerpo` hijos directos de `.quien__txt`, la distancia entre el borde de abajo de uno y el de
// arriba del siguiente (lo que el ojo ve como aire), y el `gap` y el `margin-top` calculados. Deja un recorte de la
// sección de cada página para mirarlo.
// Uso: node quien-aire-30oct.mjs <url base> <carpeta de salida>
import { pathToFileURL, fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import fs from 'node:fs';

const AQUI = dirname(fileURLToPath(import.meta.url));
const REPO = execSync('git rev-parse --show-toplevel', { cwd: AQUI }).toString().trim();
const { chromium } = await import(pathToFileURL(join(REPO, 'spindlelab-astro/node_modules/playwright/index.mjs')).href);
const [base, dir] = process.argv.slice(2);
if (!base || !dir) { console.error('Uso: node quien-aire-30oct.mjs <url base> <carpeta de salida>'); process.exit(2); }
fs.mkdirSync(dir, { recursive: true });

const nav = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const R = [];
let mal = 0;
for (const ancho of [390, 1440]) {
  for (const ruta of ['/', '/nosotros/']) {
    const ctx = await nav.newContext({ viewport: { width: ancho, height: ancho < 500 ? 844 : 900 }, deviceScaleFactor: 1 });
    await ctx.addInitScript(() => { try { localStorage.setItem('spindlelab_consent', 'denied'); } catch (e) {} });
    const p = await ctx.newPage();
    await p.goto(base.replace(/\/$/, '') + ruta, { waitUntil: 'networkidle' });
    const alto = await p.evaluate(async () => {
      for (let y = 0; y < document.documentElement.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 40)); }
      window.scrollTo(0, 0); await new Promise((r) => setTimeout(r, 300));
      return document.documentElement.scrollHeight;
    });
    const m = await p.evaluate(() => {
      const caja = document.querySelector('.quien__txt');
      if (!caja) return null;
      const ps = [...caja.children].filter((e) => e.matches('p.cuerpo'));
      const aire = ps.slice(1).map((e, i) => +(e.getBoundingClientRect().top - ps[i].getBoundingClientRect().bottom).toFixed(1));
      const cs = getComputedStyle(caja);
      return { parrafos: ps.length, aire, gap: cs.rowGap, margenes: ps.map((e) => getComputedStyle(e).marginTop) };
    });
    if (!m) { console.log(`${ancho} ${ruta}: sin .quien__txt`); mal++; await ctx.close(); continue; }
    const bien = m.aire.every((a) => Math.abs(a - 16) <= 0.5);
    if (!bien) mal++;
    const sec = await p.$('.quien');
    if (sec) await sec.screenshot({ path: join(dir, `quien-${ruta === '/' ? 'home' : 'nosotros'}-${ancho}.jpg`), type: 'jpeg', quality: 80 });
    R.push({ ancho, ruta, altoPagina: alto, ...m, bien });
    console.log(`${String(ancho).padStart(4)} ${ruta.padEnd(11)} ${m.parrafos} párrafos, aire ${m.aire.join(' · ')} px (gap ${m.gap}, margin-top ${[...new Set(m.margenes)].join('/')}) → ${bien ? '16 px' : 'NO'}; alto de la página ${alto}`);
    await ctx.close();
  }
}
await nav.close();
fs.writeFileSync(join(dir, 'quien-aire.json'), JSON.stringify(R, null, 1) + '\n');
process.exit(mal ? 1 : 0);
