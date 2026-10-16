// E12 · Koto · el aviso de cookies (antes de aceptarlo): forma, letra y si el texto corre.
// Uso: node aviso.mjs <dir-crudo> <dir-capturas>   → <dir-crudo>/aviso.json + detalle-aviso-cookies-*.jpg
import fs from 'node:fs';
import path from 'node:path';
import { abrirNavegador, contexto, cargar, SEL_FN } from './comun.mjs';

const [dirCrudo, dirCapt] = process.argv.slice(2);
const nav = await abrirNavegador();
const ctx = await contexto(nav, 1440);
await ctx.addInitScript(SEL_FN);
const p = await ctx.newPage();
await cargar(p, 'https://koto.com/');
await p.waitForTimeout(1500);
const leer = () => p.evaluate(() => {
  const d = document.querySelector('#CybotCookiebotDialog'); if (!d) return null;
  const r = d.getBoundingClientRect(); const s = getComputedStyle(d);
  const corre = [...d.querySelectorAll('*')].find(e => getComputedStyle(e).animationName && getComputedStyle(e).animationName !== 'none');
  const txt = [...d.querySelectorAll('*')].find(e => e.children.length === 0 && (e.innerText || '').length > 40);
  const ts = txt ? getComputedStyle(txt) : null;
  return { rect: [r.x, r.y, r.width, r.height].map(Math.round), fondo: s.backgroundColor, desenfoque: s.backdropFilter, radio: s.borderRadius,
    animacion: corre ? { sel: window.__sel(corre), nombre: getComputedStyle(corre).animationName, duracion: getComputedStyle(corre).animationDuration, curva: getComputedStyle(corre).animationTimingFunction, iteraciones: getComputedStyle(corre).animationIterationCount, transform: getComputedStyle(corre).transform } : null,
    letra: ts && { familia: ts.fontFamily.split(',')[0], tamano: ts.fontSize, peso: ts.fontWeight, color: ts.color },
    botones: [...d.querySelectorAll('button, a')].filter(b => b.getBoundingClientRect().width > 0).map(b => { const br = b.getBoundingClientRect(); return { texto: (b.innerText || b.getAttribute('aria-label') || '').trim().slice(0, 40), rect: [br.x, br.y, br.width, br.height].map(Math.round), fondo: getComputedStyle(b).backgroundColor }; }) };
});
const a0 = await leer();
if (a0) await p.screenshot({ path: path.join(dirCapt, 'detalle-aviso-cookies-t0-1440.jpg'), type: 'jpeg', quality: 85, clip: { x: Math.max(0, a0.rect[0] - 20), y: a0.rect[1] - 20, width: Math.min(1440 - Math.max(0, a0.rect[0] - 20), a0.rect[2] + 40), height: a0.rect[3] + 40 } });
await p.waitForTimeout(3000);
const a3 = await leer();
if (a0) await p.screenshot({ path: path.join(dirCapt, 'detalle-aviso-cookies-t3s-1440.jpg'), type: 'jpeg', quality: 85, clip: { x: Math.max(0, a0.rect[0] - 20), y: a0.rect[1] - 20, width: Math.min(1440 - Math.max(0, a0.rect[0] - 20), a0.rect[2] + 40), height: a0.rect[3] + 40 } });
fs.writeFileSync(path.join(dirCrudo, 'aviso.json'), JSON.stringify({ t0: a0, t3s: a3 }, null, 1));
await nav.close();
console.log('ok aviso', JSON.stringify(a0).slice(0, 300));
