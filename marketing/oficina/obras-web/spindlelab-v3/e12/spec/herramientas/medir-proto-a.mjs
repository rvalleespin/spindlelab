// E12 · spec sobre A · lo que la spec afirma del prototipo de A, medido en el render. Lucía, 19-oct-2026.
// Chromium 141 de /opt/pw-browsers con el Playwright de spindlelab-astro. No escribe nada fuera de la salida.
// Mide, en las cinco vistas del prototipo y en 12 anchos (360 a 1920):
//   - la letra computada de cada rol (familia, tamaño, interlínea, ancho, peso) y cuántas líneas ocupa el h1
//   - el alto del encabezado, la retícula (columnas) y el ancho real de cada bloque que la spec fija
//   - en los casos y en /trabajo/: barra lateral, columna, caja del cuerpo, filas partidas y el muro
//   - en la home: dónde quedan la frase, la entradilla y el chequeo (campo y botón) en la primera pantalla
// Uso: node medir-proto-a.mjs <base-url-de-proto/a/> <salida.json>
import { pathToFileURL } from 'node:url';
import fs from 'node:fs';
const { chromium } = await import(pathToFileURL('/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs').href);

const [base, salida] = process.argv.slice(2);
const VISTAS = [['home', ''], ['trabajo', 'trabajo/'], ['caso-praxi', 'trabajo/praxi/'], ['caso-sesenta', 'trabajo/sesenta/'], ['desarrollo-web', 'servicios/desarrollo-web/']];
const ANCHOS = [[360, 800], [390, 844], [768, 1024], [833, 900], [834, 900], [1023, 768], [1024, 768], [1193, 800], [1194, 800], [1280, 800], [1440, 900], [1920, 1080]];
const nav = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const R = { cuando: new Date().toISOString(), base, chromium: nav.version(), vistas: {} };

const MEDIR = () => {
  const caja = (sel) => { const el = document.querySelector(sel); if (!el) return null; const r = el.getBoundingClientRect(); return { x: Math.round(r.x * 10) / 10, y: Math.round((r.y + scrollY) * 10) / 10, w: Math.round(r.width * 10) / 10, h: Math.round(r.height * 10) / 10 }; };
  const letra = (sel) => {
    const el = document.querySelector(sel); if (!el) return null;
    const cs = getComputedStyle(el);
    const lh = parseFloat(cs.lineHeight);
    const r = el.getBoundingClientRect();
    return { familia: cs.fontFamily.split(',')[0].replace(/["']/g, ''), tam: parseFloat(cs.fontSize), interlinea: Math.round(lh / parseFloat(cs.fontSize) * 1000) / 1000, ancho: cs.fontStretch, peso: cs.fontWeight, tracking: cs.letterSpacing, mayus: cs.textTransform, color: cs.color, lineas: lh ? Math.round(r.height / lh) : null, w: Math.round(r.width) };
  };
  const ret = document.querySelector('.reticula');
  const out = {
    ancho: innerWidth, alto: innerHeight,
    cab: caja('.cab'), cabFila: caja('.cab__fila'),
    columnas: ret ? getComputedStyle(ret).gridTemplateColumns.split(' ').length : null,
    columna1: ret ? parseFloat(getComputedStyle(ret).gridTemplateColumns.split(' ')[0]) : null,
    letras: {
      h1: letra('h1'), h2: letra('h2'), cuerpo: letra('.cuerpo'), chico: letra('.chico'), rotulo: letra('.rotulo'), dato: letra('.dato'),
      boton: letra('.boton'), titulo: letra('.t-titulo'), declaracion: letra('.t-declaracion'), siguiente: letra('.t-siguiente'),
    },
    bloques: {},
  };
  const B = out.bloques;
  for (const s of ['.portada__decl', '.portada__cinta', '.portada__lado', '.entradilla', '#chq-dominio', '#chq-btn', '#chq-ayuda', '.portada__chequeo',
    '.indice__lateral', '.muro', '.muro__col', '.lateral', '.columna', '.caso-sec', '.caso-sec__der', '.caso-sec__izq', '.fila--par', '.fila--par > .medio',
    '.medio-principal .medio', '.siguiente', '.barra', '.franja .medio', '.obra3', '.planes', '.fases', '.destacados__lista', '.prueba__medio', '.prueba__dato',
    '.servicio__cuerpo', '.quien__retrato', '.pie-sitio']) B[s] = caja(s);
  const cuerpoCaso = document.querySelector('.caso-sec__der .cuerpo');
  if (cuerpoCaso) {
    // caracteres por línea de la caja del cuerpo del caso, contados con Range sobre la primera línea completa
    const t = cuerpoCaso.firstChild && cuerpoCaso.firstChild.nodeType === 3 ? cuerpoCaso.firstChild : null;
    if (t) {
      const rg = document.createRange(); let y0 = null, n = 0, max = 0;
      for (let i = 0; i < t.length; i++) { rg.setStart(t, i); rg.setEnd(t, i + 1); const r = rg.getBoundingClientRect(); if (y0 === null) y0 = r.top; if (Math.abs(r.top - y0) > 2) { max = Math.max(max, n); n = 0; y0 = r.top; } n++; }
      out.caracteresPorLinea = max;
    }
  }
  return out;
};

for (const [nombre, ruta] of VISTAS) {
  R.vistas[nombre] = [];
  for (const [w, h] of ANCHOS) {
    const movil = w < 834;
    const ctx = await nav.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, isMobile: movil, hasTouch: movil, locale: 'es-CL', timezoneId: 'America/Santiago', reducedMotion: 'reduce' });
    const p = await ctx.newPage();
    await p.goto(base + ruta, { waitUntil: 'load' });
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(200);
    R.vistas[nombre].push(await p.evaluate(MEDIR));
    await ctx.close();
  }
}
await nav.close();
fs.writeFileSync(salida, JSON.stringify(R, null, 1));
console.log('listo', salida);
