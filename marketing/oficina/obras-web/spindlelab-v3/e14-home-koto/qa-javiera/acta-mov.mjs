// QA E14 (Javiera, 2-nov-2026): la home CONSTRUIDA al bajar con la rueda, a 1440 y 390, con y sin movimiento reducido.
// Guarda por paso: recorte de la portada, renglones de la línea, panel del trabajo, tarjeta activa y opacidades, nombre,
// entrada de las bandas, filas del contacto y la foto; y cuadros en las posiciones clave.
// Uso: node acta-mov.mjs <url> <carpeta-salida>
import { chromium } from '/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs';
import { writeFileSync, mkdirSync } from 'node:fs';
const [URL, OUT] = process.argv.slice(2);
mkdirSync(OUT, { recursive: true });
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome' });
const res = {};
for (const [w, h, dpr, mob] of [[1440, 900, 1, false], [390, 844, 2, true]]) {
  for (const red of ['no-preference', 'reduce']) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: dpr, isMobile: mob, hasTouch: mob, reducedMotion: red });
    const p = await ctx.newPage();
    const errores = [];
    p.on('pageerror', (e) => errores.push(String(e)));
    p.on('console', (m) => { if (m.type() === 'error') errores.push(m.text()); });
    await p.goto(URL, { waitUntil: 'networkidle' });
    await p.evaluate(() => { const c = document.getElementById('cookie-banner'); if (c) c.remove(); });
    await p.waitForTimeout(600);
    const total = await p.evaluate(() => document.documentElement.scrollHeight - innerHeight);
    const serie = [];
    const clave = new Set();
    const paso = 40;
    for (let y = 0; y <= total + paso; y += paso) {
      if (mob) await p.evaluate((y) => scrollTo(0, y), y); else await p.mouse.wheel(0, paso);
      await p.waitForTimeout(mob ? 30 : 45);
      const d = await p.evaluate(() => {
        const q = (s) => document.querySelector(s);
        const op = (e) => (e ? +getComputedStyle(e).opacity : null);
        const rec = q('.portada-v--recoge .portada-v__medio');
        const panel = q('[data-panel]');
        const tarj = [...document.querySelectorAll('[data-tarjeta]')];
        return {
          y: Math.round(scrollY),
          sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth,
          clip: rec ? getComputedStyle(rec).clipPath : null,
          lin: [...document.querySelectorAll('.k-l__in')].map((e) => e.style.transform.replace(/translateY\(|\)/g, '')),
          panel: panel ? { op: op(panel), top: Math.round(panel.getBoundingClientRect().top), pos: getComputedStyle(panel).position } : null,
          nombre: q('[data-nombre]:not(article)')?.textContent?.trim(),
          tarj: tarj.map((t) => ({ top: Math.round(t.getBoundingClientRect().top), op: +getComputedStyle(t).opacity, act: t.classList.contains('activa') })),
          entra: [...document.querySelectorAll('[data-entra]')].map((f) => getComputedStyle(f.firstElementChild).getPropertyValue('--e')),
          filas: [...document.querySelectorAll('[data-fila]')].map((f) => getComputedStyle(f).getPropertyValue('--f') + '|' + op(f.firstElementChild)),
          foto: (() => { const f = q('[data-foto]'); if (!f) return null; const i = f.querySelector('img') || f; return { vista: f.classList.contains('vista'), tr: getComputedStyle(i).transform, top: Math.round(f.getBoundingClientRect().top) }; })(),
          amov: document.documentElement.classList.contains('a-mov'),
        };
      });
      serie.push(d);
      if (y >= total) break;
    }
    res[`${w}-${red}`] = { total, errores, serie };
    if (red === 'no-preference' || w === 1440) {
      // cuadros en posiciones clave, bajando de verdad hasta cada una
      const pos = w === 1440 ? [0, 300, 600, 900, 1300, 1700, 2100, 2500, 2900, 3300, 3700, 4400, 5200, total] : [0, 500, 1000, 1500, 2000, 2500, 3000, 3600, 4400, 5200, 6000, total];
      await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(300);
      let cur = 0;
      for (const y of pos) {
        while (cur < Math.min(y, total)) { const s = Math.min(120, Math.min(y, total) - cur); if (mob) await p.evaluate((v) => scrollTo(0, v), cur + s); else await p.mouse.wheel(0, s); cur += s; await p.waitForTimeout(25); }
        await p.waitForTimeout(700);
        await p.screenshot({ path: `${OUT}/${w}-${red === 'reduce' ? 'red' : 'mov'}-y${String(Math.min(y, total)).padStart(4, '0')}.jpg`, type: 'jpeg', quality: 55 });
      }
    }
    await ctx.close();
  }
}
writeFileSync(`${OUT}/serie.json`, JSON.stringify(res));
await b.close();
