// E12 · Koto · capturas de página completa como las ve quien baja: una pantalla por vez.
// Koto anima con el scroll (GSAP ScrollTrigger con «scrub»): lo que entra se revela según la
// posición y se esconde de nuevo al volver arriba. Una captura de página completa tomada desde
// arriba muestra esos bloques en negro. Por eso se baja pantalla por pantalla, se espera a que
// asiente lo que aparece, se toma la ventana y después coser.py arma los tramos (≤4000 px de
// imagen, JPEG 80). El encabezado fijo y lo pegajoso aparecen en cada pantalla: así se ven.
// Uso: node capturar.mjs <id> <ancho> <dir-cuadros>
import fs from 'node:fs';
import path from 'node:path';
import { PAGINAS, abrirNavegador, contexto, cargar, aceptarCookies, recorrer } from './comun.mjs';

const [id, anchoArg, dir] = process.argv.slice(2);
const ancho = +anchoArg;
fs.mkdirSync(dir, { recursive: true });
const nav = await abrirNavegador();
const ctx = await contexto(nav, ancho);
const p = await ctx.newPage();
await cargar(p, PAGINAS[id]);
await aceptarCookies(p);
await recorrer(p, { paso: 0.5, espera: 150 }); // primera pasada: carga diferida de imágenes y pósteres
await p.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
const { vh, alto, maxY } = await p.evaluate(() => ({ vh: innerHeight, alto: document.documentElement.scrollHeight, maxY: document.documentElement.scrollHeight - innerHeight }));
const cuadros = [];
for (let y = 0, n = 0; ; n++) {
  const yy = Math.min(y, maxY);
  await p.evaluate(yy => window.scrollTo({ top: yy, behavior: 'instant' }), yy);
  await p.waitForTimeout(750);
  const real = await p.evaluate(() => Math.round(scrollY));
  const f = path.join(dir, `${id}-${ancho}-cuadro-${String(n).padStart(3, '0')}.png`);
  await p.screenshot({ path: f });
  cuadros.push({ archivo: f, y: real });
  if (yy >= maxY) break;
  y += vh;
}
fs.writeFileSync(path.join(dir, `${id}-${ancho}-cuadros.json`), JSON.stringify({ id, ancho, dpr: ancho === 390 ? 2 : 1, vh, alto, cuadros }, null, 1));
await nav.close();
console.log('ok', id, ancho, cuadros.length, 'cuadros', alto, 'px');
