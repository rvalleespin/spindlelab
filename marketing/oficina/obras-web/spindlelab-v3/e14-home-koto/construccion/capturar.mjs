#!/usr/bin/env node
// Capturas de la construcción E14 (Diego, 2-nov-2026): por página y ancho, una pantalla por cada alto de ventana bajando
// con la rueda (así corre el movimiento atado al scroll), en una hoja; y la tira del trabajo fijo a 1440, en 8 posiciones.
// Uso: node capturar.mjs <base> [--chrome <ruta>]   (base: el dist servido, p. ej. http://localhost:8765)
import { pathToFileURL, fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { mkdirSync } from 'node:fs';
const AQUI = dirname(fileURLToPath(import.meta.url));
const REPO = execSync('git rev-parse --show-toplevel', { cwd: AQUI }).toString().trim();
const { chromium } = await import(pathToFileURL(join(REPO, 'spindlelab-astro/node_modules/playwright/index.mjs')).href);
const args = process.argv.slice(2);
const base = args.find((a) => /^https?:/.test(a));
const opt = (n, d) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : d; };
const CHROME = opt('--chrome', '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome');
const TMP = join(AQUI, '.tmp');
mkdirSync(TMP, { recursive: true });
const nav = await chromium.launch({ executablePath: CHROME });
const PAGINAS = [['home', '/'], ['trabajo', '/trabajo/'], ['desarrollo-web', '/servicios/desarrollo-web/']];
const datos = {};
for (const [ancho, alto] of [[1440, 900], [390, 844]]) {
  const ctx = await nav.newContext({ viewport: { width: ancho, height: alto }, deviceScaleFactor: 1, reducedMotion: 'no-preference', hasTouch: ancho < 500 });
  await ctx.addInitScript(() => { try { localStorage.setItem('cookie-consent', 'rejected'); } catch (e) {} });
  for (const [nombre, ruta] of PAGINAS) {
    const pag = await ctx.newPage();
    await pag.goto(base + ruta, { waitUntil: 'networkidle' });
    const rechazar = pag.locator('#cookie-reject');
    if (await rechazar.isVisible().catch(() => false)) await rechazar.click();
    await pag.waitForTimeout(600);
    const total = await pag.evaluate(() => document.documentElement.scrollHeight);
    const archivos = [];
    let k = 0;
    for (let y = 0; y < total; y += alto) {
      // con la rueda, de a 100 px, para que los scripts vean cada paso
      const ahora = await pag.evaluate(() => window.scrollY);
      for (let d = ahora; d < y; d += 100) { await pag.mouse.wheel(0, Math.min(100, y - d)); await pag.waitForTimeout(16); }
      await pag.waitForTimeout(700);
      const f = join(TMP, `${nombre}-${ancho}-${String(k++).padStart(2, '0')}.png`);
      await pag.screenshot({ path: f });
      archivos.push(f);
    }
    const med = await pag.evaluate(() => ({
      alto: document.documentElement.scrollHeight,
      desborde: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      h1: document.querySelectorAll('h1').length,
    }));
    datos[`${nombre}-${ancho}`] = { ...med, pantallas: archivos.length };
    execSync(`python3 ${join(AQUI, 'hoja.py')} ${join(AQUI, `${nombre}-${ancho}.jpg`)} ${ancho < 500 ? 5 : 3} ${archivos.join(' ')}`);
    await pag.close();
  }
  // la tira del trabajo fijo: 8 posiciones, desde que asoma la primera tarjeta hasta que se suelta el panel
  if (ancho === 1440) {
    const pag = await ctx.newPage();
    await pag.goto(base + '/', { waitUntil: 'networkidle' });
    await pag.waitForTimeout(500);
    const { ini, fin } = await pag.evaluate(() => {
      const s = document.querySelector('#trabajo');
      const r = s.getBoundingClientRect();
      return { ini: r.top + scrollY - innerHeight * 0.7, fin: r.bottom + scrollY - innerHeight };
    });
    const archivos = [];
    const estados = [];
    for (let i = 0; i < 8; i++) {
      const y = Math.round(ini + ((fin - ini) * i) / 7);
      const ahora = await pag.evaluate(() => window.scrollY);
      const paso = y > ahora ? 100 : -100;
      for (let d = ahora; paso > 0 ? d < y : d > y; d += paso) { await pag.mouse.wheel(0, paso > 0 ? Math.min(100, y - d) : Math.max(-100, y - d)); await pag.waitForTimeout(16); }
      await pag.waitForTimeout(800);
      const f = join(TMP, `tira-${i}.png`);
      await pag.screenshot({ path: f });
      archivos.push(f);
      estados.push(await pag.evaluate(() => ({
        y: Math.round(scrollY),
        nombre: document.querySelector('#trabajo [data-nombre]').textContent,
        panel: getComputedStyle(document.querySelector('#trabajo [data-panel]')).opacity,
        tarjetas: [...document.querySelectorAll('#trabajo .k-tf__tarjeta')].map((t) => getComputedStyle(t).opacity),
      })));
    }
    datos.tira = estados;
    execSync(`python3 ${join(AQUI, 'hoja.py')} ${join(AQUI, 'tira-trabajo-1440.jpg')} 4 ${archivos.join(' ')}`);
    await pag.close();
  }
  await ctx.close();
}
await nav.close();
execSync(`rm -rf ${TMP}`);
console.log(JSON.stringify(datos, null, 1));
