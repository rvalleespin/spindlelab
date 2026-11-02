#!/usr/bin/env node
// Desborde horizontal de 360 a 1920 en las tres páginas de E14, bajando la página entera; y el estado con movimiento
// reducido a 1440 (sin html.a-mov, tarjetas al 100 %). Uso: node desborde.mjs <base>
import { pathToFileURL, fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
import { join, dirname } from 'node:path';
const AQUI = dirname(fileURLToPath(import.meta.url));
const REPO = execSync('git rev-parse --show-toplevel', { cwd: AQUI }).toString().trim();
const { chromium } = await import(pathToFileURL(join(REPO, 'spindlelab-astro/node_modules/playwright/index.mjs')).href);
const base = process.argv[2];
const nav = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome' });
const RUTAS = ['/', '/trabajo/', '/servicios/desarrollo-web/'];
const malos = [];
for (const w of [360, 390, 430, 768, 834, 1024, 1194, 1280, 1440, 1920]) {
  const ctx = await nav.newContext({ viewport: { width: w, height: 900 } });
  for (const r of RUTAS) {
    const p = await ctx.newPage();
    await p.goto(base + r, { waitUntil: 'networkidle' });
    let peor = 0;
    const alto = await p.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y <= alto; y += 450) {
      await p.evaluate((v) => scrollTo(0, v), y);
      await p.waitForTimeout(30);
      peor = Math.max(peor, await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth));
    }
    if (peor > 0) malos.push(`${r} a ${w}: ${peor}px`);
    await p.close();
  }
  await ctx.close();
}
console.log(malos.length ? malos.join('\n') : 'sin desborde de 360 a 1920 (10 anchos × 3 páginas)');
const ctx = await nav.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
const p = await ctx.newPage();
await p.goto(base + '/', { waitUntil: 'networkidle' });
await p.evaluate(() => scrollTo(0, document.querySelector('#trabajo').offsetTop + 600));
await p.waitForTimeout(300);
console.log('reducido:', JSON.stringify(await p.evaluate(() => ({
  mov: document.documentElement.classList.contains('a-mov'),
  tarjetas: [...document.querySelectorAll('.k-tf__tarjeta')].map((t) => getComputedStyle(t).opacity),
  panel: getComputedStyle(document.querySelector('#trabajo [data-panel]')).opacity,
  recorte: getComputedStyle(document.querySelector('.portada-v__medio')).clipPath,
  filas: [...document.querySelectorAll('[data-fila]')].map((f) => getComputedStyle(f).opacity),
  videoPausado: [...document.querySelectorAll('video')].every((v) => v.paused),
}))));
await nav.close();
