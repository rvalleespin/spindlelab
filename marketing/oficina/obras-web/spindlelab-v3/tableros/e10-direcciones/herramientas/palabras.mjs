// palabras.mjs — el largo de cada palabra de la letra display, en em (Lucía, 16-oct-2026; ronda 2 de QA, defecto 2).
//
// La regla de escala del lock §13 fija el tamaño de cada titular por su palabra más larga y el ancho de su caja:
//   tamaño = min(escalón, caja ÷ palabra)
// Para eso hace falta el largo de cada palabra en em, medido con la letra de verdad (Instrument Sans 500 con su
// interletra, kerning incluido). Este script abre los seis prototipos a 1440, toma cada elemento en letra display
// (cualquier elemento en Instrument Sans: el em no depende del tamaño), mide cada palabra a 100 px con la familia, el peso y la interletra (en em) del
// elemento, y guarda el máximo de cada palabra en img/palabras.json. Mide también las líneas que la composición no
// deja partir (LINEAS): en el hero, «Ahí se corta», porque el hilo que nace del borde se corta en ese salto.
// armar-protos.py lee ese archivo y le pone a cada titular su --palabra (la más larga, × 1,01 de margen).
//
// Sirve proto/ en 8770 antes. Uso: node herramientas/palabras.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const AQUI = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const REPO = path.resolve(AQUI, '../../../../../..');
const { chromium } = await import(pathToFileURL(path.join(REPO, 'spindlelab-astro/node_modules/playwright/index.mjs')).href);
const BASE = process.env.BASE || 'http://127.0.0.1:8770';
const LINEAS = ['Ahí se corta', 'el circuito'];

const nav = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const ctx = await nav.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
const em = {};
for (const d of ['taller', 'pizarra']) for (const p of ['home', 'acompanamiento-mensual', 'trabajo']) {
  const pg = await ctx.newPage();
  await pg.goto(`${BASE}/${d}/${p}.html`, { waitUntil: 'networkidle' });
  await pg.evaluate(() => document.fonts.ready);
  const r = await pg.evaluate((lineas) => {
    const out = {};
    const probe = document.createElement('span');
    probe.style.cssText = 'position:absolute;left:-99999px;top:0;white-space:nowrap;font-size:100px;font-kerning:normal';
    document.body.appendChild(probe);
    const medir = (txt, cs) => {
      probe.style.fontFamily = cs.fontFamily; probe.style.fontWeight = cs.fontWeight;
      probe.style.letterSpacing = `${(parseFloat(cs.letterSpacing) || 0) / parseFloat(cs.fontSize)}em`;
      probe.textContent = txt;
      return probe.getBoundingClientRect().width / 100;
    };
    for (const el of document.querySelectorAll('body *')) {
      if (el.closest('.cinta, .d-sr, script, style')) continue;
      const cs = getComputedStyle(el);
      if (!/Instrument Sans/.test(cs.fontFamily)) continue;
      if (![...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) continue;
      // innerText: el <br> del hero cuenta como salto (textContent pegaría «corta» con «el»)
      const texto = (el.innerText || el.textContent).replace(/\s+/g, ' ');
      for (const m of texto.matchAll(/\S+/g)) out[m[0]] = Math.max(out[m[0]] || 0, medir(m[0], cs));
      for (const l of lineas) if (texto.includes(l)) out[l] = Math.max(out[l] || 0, medir(l, cs));
    }
    return out;
  }, LINEAS);
  for (const [k, v] of Object.entries(r)) em[k] = Math.max(em[k] || 0, v);
  await pg.close();
}
await nav.close();
const lista = Object.entries(em).sort((a, b) => b[1] - a[1]).map(([k, v]) => [k, +v.toFixed(4)]);
const orden = Object.fromEntries(lista);
fs.writeFileSync(path.join(AQUI, 'img/palabras.json'), JSON.stringify({
  nota: 'Largo de cada palabra de la letra display, en em: Instrument Sans con el peso y la interletra de cada titular, medido a 100 px en Chromium (kerning incluido). El máximo entre los estilos donde aparece. Lo escribe herramientas/palabras.mjs; lo lee armar-protos.py (lock §13, regla de escala).',
  lineas_que_no_se_parten: LINEAS,
  em: orden,
}, null, 1));
console.log(lista.length, 'palabras; las más largas:', lista.slice(0, 8).map(([k, v]) => `${k} ${v}`).join(' · '));
