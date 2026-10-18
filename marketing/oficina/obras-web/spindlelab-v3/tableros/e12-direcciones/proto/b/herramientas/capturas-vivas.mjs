// Capturas planas de los tres sitios vivos que B mostraba con una maqueta de dispositivo (defecto 8 del acta
// del paso 2): Combeau fotografía, Combeau modelo y Verifica y Cumple. El lock pide la pieza «plana en su marco»
// (§13, punto 5, y §21.2), y A ya las tenía así. Solo GET y scroll, como capturar-fuentes.mjs de A: no se escribe
// en ningún campo ni se envía nada. Lucía (B), 18-oct-2026.
//
// Dos encuadres por sitio, a dpr 1: 1440 × 1080 (el 4:3 del visor) y 1440 × 810 (el 16:9 de «Cada pieza, con su
// prueba»). Cada uno es la primera pantalla del sitio en ese viewport, después de recorrerlo para que carguen las
// imágenes diferidas y de volver arriba.
//
// Uso: node capturas-vivas.mjs <carpeta de salida>   → <id>-<ancho>x<alto>.png y registro-vivas.json
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';

const AQUI = path.dirname(fileURLToPath(import.meta.url));
const RAIZ = path.resolve(AQUI, '../../../../../../../../..');
const { chromium } = await import(pathToFileURL(path.join(RAIZ, 'spindlelab-astro/node_modules/playwright/index.mjs')).href);

const salida = process.argv[2];
fs.mkdirSync(salida, { recursive: true });
const SITIOS = [
  { id: 'combeau-fotografia', url: 'https://bernardocombeau.cl/' },
  { id: 'combeau-modelo', url: 'https://bernardocombeau.cl/modelo/' },
  { id: 'verifica-y-cumple', url: 'https://verifica.spindlelab.cl/' },
];
const navegador = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const registro = [];
for (const s of SITIOS) {
  for (const [ancho, alto] of [[1440, 1080], [1440, 810]]) {
    const p = await navegador.newPage({ viewport: { width: ancho, height: alto }, deviceScaleFactor: 1, locale: 'es-CL' });
    const r = await p.goto(s.url, { waitUntil: 'networkidle', timeout: 60000 });
    const rechazar = p.getByRole('button', { name: 'Rechazar' });
    if (await rechazar.count()) { await rechazar.first().click(); await p.waitForTimeout(400); }
    await p.evaluate(() => document.fonts.ready);
    await p.evaluate(async () => {
      const paso = innerHeight * 0.8;
      for (let y = 0; y < document.documentElement.scrollHeight; y += paso) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 250)); }
      scrollTo(0, 0); await new Promise((r) => setTimeout(r, 600));
    });
    await p.waitForTimeout(1200);
    const archivo = path.join(salida, `${s.id}-${ancho}x${alto}.png`);
    await p.screenshot({ path: archivo });
    registro.push({ id: s.id, url: s.url, viewport: `${ancho}x${alto}`, dpr: 1, estado: r && r.status(), titulo: await p.title(), cuando: new Date().toISOString(), archivo: path.basename(archivo) });
    await p.close();
  }
}
await navegador.close();
fs.writeFileSync(path.join(salida, 'registro-vivas.json'), JSON.stringify(registro, null, 1));
console.log(JSON.stringify(registro, null, 1));
