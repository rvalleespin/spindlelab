// Capturas de dos entradas del índice que no tenían imagen: spindlelab.cl (la portada que se
// publica hoy) y el chequeo de 21 señales (/v3/diagnostico/). Salen del build local de
// spindlelab-astro (dist/), servido aparte en solo lectura: no se toca spindlelab-astro ni se
// llama a producción. Lucía, 17-oct-2026.
//
// Uso: python3 -m http.server 8792 --bind 127.0.0.1 --directory spindlelab-astro/dist &
//      node capturas-obra.mjs http://127.0.0.1:8792 <carpeta de salida>

import path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';

const AQUI = path.dirname(fileURLToPath(import.meta.url));
const RAIZ = path.resolve(AQUI, '../../../../../../../../..');
const { chromium } = await import(pathToFileURL(path.join(RAIZ, 'spindlelab-astro/node_modules/playwright/index.mjs')).href);

const base = process.argv[2] || 'http://127.0.0.1:8792';
const salida = process.argv[3];
const navegador = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const pagina = await navegador.newPage({ viewport: { width: 1440, height: 1080 }, deviceScaleFactor: 1 });
for (const [ruta, nombre] of [['/', 'obra-spindlelab-cl.png'], ['/v3/diagnostico/', 'obra-chequeo.png']]) {
  await pagina.goto(base + ruta, { waitUntil: 'networkidle' });
  // El aviso de cookies tapa la portada: se rechaza en esta pestaña (queda en su almacenamiento local, nada sale a la red).
  const rechazar = pagina.getByRole('button', { name: 'Rechazar' });
  if (await rechazar.count()) await rechazar.first().click();
  await pagina.evaluate(() => document.fonts.ready);
  await pagina.waitForTimeout(6000); // el aviso «quedaron rechazadas» se va solo
  await pagina.screenshot({ path: path.join(salida, nombre) });
  console.log(nombre, await pagina.title());
}
await navegador.close();
