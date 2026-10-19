// E12 · spec sobre A · la portada, medida en el render (la mitad del navegador). Lucía, 19-oct-2026.
// Abre el estudio de la portada (e12/spec/portada/) en cada ancho y guarda, para contraste-portada.py:
//   1. el velo tal como lo pinta el navegador: captura PNG de la portada con el video reemplazado por un blanco puro y
//      el texto escondido (visibility, así no se mueve nada). Donde el velo vale α, el blanco queda en 255 − 249·α.
//   2. cada línea de texto de la portada (Range.getClientRects de cada nodo de texto): caja, color, tamaño y peso.
//   3. la caja de la portada y la del medio (para el recorte de object-fit: cover), el borde del campo y la pausa.
//   4. dónde quedan el campo y el botón del chequeo respecto del borde de la pantalla (criterio 10 y 14; el 360 × 800).
// Uso: node portada.mjs <url-del-estudio> <carpeta-salida>
import { pathToFileURL } from 'node:url';
import fs from 'node:fs';
const { chromium } = await import(pathToFileURL('/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs').href);

const [url, dir] = process.argv.slice(2);
fs.mkdirSync(dir, { recursive: true });
const VISTAS = [[360, 800], [375, 667], [390, 844], [414, 896], [768, 1024], [834, 1112], [1024, 768], [1194, 834], [1280, 800], [1440, 900], [1920, 1080]];
const nav = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const R = { cuando: new Date().toISOString(), url, chromium: nav.version(), vistas: [] };

const LEER = () => {
  const out = { lineas: [] };
  const caja = (el) => { const r = el.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; };
  const portada = document.querySelector('.portada-v');
  out.portada = caja(portada);
  out.medio = caja(document.querySelector('.portada-v__medio'));
  out.posicion = getComputedStyle(document.querySelector('.portada-v__medio > img')).objectPosition;
  out.pie = caja(document.querySelector('.portada-v__pie'));
  out.cab = caja(document.querySelector('.cab'));
  const w = document.createTreeWalker(portada, NodeFilter.SHOW_TEXT);
  while (w.nextNode()) {
    const t = w.currentNode;
    if (!t.textContent.trim()) continue;
    const el = t.parentElement;
    if (el.closest('button, [aria-hidden="true"], .solo-lector')) continue; // la pausa y el botón van sobre placa o blanco propio
    const cs = getComputedStyle(el);
    const rg = document.createRange(); rg.selectNodeContents(t);
    for (const r of rg.getClientRects()) {
      if (r.width < 1 || r.height < 1) continue;
      out.lineas.push({ texto: t.textContent.trim().slice(0, 40), sel: el.tagName.toLowerCase() + (el.className ? '.' + String(el.className).split(' ').join('.') : '') + (el.id ? '#' + el.id : ''), x: r.x, y: r.y, w: r.width, h: r.height, color: cs.color, tam: parseFloat(cs.fontSize), peso: +cs.fontWeight, familia: cs.fontFamily.split(',')[0].replace(/["']/g, '') });
    }
  }
  const input = document.querySelector('#chq-dominio');
  const ci = getComputedStyle(input);
  out.campo = { ...caja(input), borde: ci.borderTopColor, fondo: ci.backgroundColor, placeholder: getComputedStyle(input, '::placeholder').color };
  out.boton = caja(document.querySelector('#chq-btn'));
  out.pausa = caja(document.querySelector('.portada-v .pausa'));
  out.ayuda = caja(document.querySelector('#chq-ayuda'));
  out.h1 = caja(document.querySelector('h1'));
  out.vh = innerHeight; out.vw = innerWidth;
  return out;
};

for (const [w, h] of VISTAS) {
  const movil = w < 834;
  const ctx = await nav.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, isMobile: movil, hasTouch: movil, reducedMotion: 'reduce' });
  const p = await ctx.newPage();
  await p.goto(url + '?fondo=blanco', { waitUntil: 'load' });
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(250);
  const datos = await p.evaluate(LEER);
  // el velo, sin texto: se esconde todo lo de adentro de la portada salvo el medio (visibility no cambia el layout)
  await p.addStyleTag({ content: '.portada-v__pie *, .portada-v .pausa { visibility: hidden !important; }' });
  await p.waitForTimeout(100);
  const png = `${dir}/velo-${w}x${h}.png`;
  await p.screenshot({ path: png, fullPage: true, clip: { x: 0, y: datos.portada.y, width: w, height: Math.min(datos.portada.h, 4000) } });
  datos.velo = png.split('/').pop();
  datos.ancho = w; datos.alto = h;
  datos.archivo = 'hilo-1920'; // spec §3.1: el mismo bucle 16:9 en todos los anchos (bajo 834, en franja a sangre)
  R.vistas.push(datos);
  await ctx.close();
}
await nav.close();
fs.writeFileSync(`${dir}/portada-render.json`, JSON.stringify(R, null, 1));
for (const v of R.vistas) console.log(v.ancho + 'x' + v.alto, 'portada', Math.round(v.portada.y), Math.round(v.portada.h), 'campo', Math.round(v.campo.y), Math.round(v.campo.y + v.campo.h), 'boton', Math.round(v.boton.y + v.boton.h), 'margen', Math.round(v.alto - (v.boton.y + v.boton.h)), 'h1', Math.round(v.h1.y), Math.round(v.h1.h), 'pie', Math.round(v.pie.y), 'lineas', v.lineas.length);
