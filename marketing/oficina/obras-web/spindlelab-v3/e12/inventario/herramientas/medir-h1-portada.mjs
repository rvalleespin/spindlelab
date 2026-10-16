// El h1 de la portada de bernardocombeau.cl: cómo viene servido y cómo lo lee una máquina (E12, inventario).
//
// Cierra el defecto 13 del acta del paso 1: el inventario decía que el h1 «se lee pegado» y su crudo
// (h1-bernardocombeau.cl.tsv) solo contaba h1. Esto mide la frase con su propio método:
//   - servido: el marcado del <h1> tal como llega en la respuesta (sin JS), sacado del cuerpo de la respuesta;
//   - textContent: lo que lee un programa que junta el texto del nodo (buscadores, lectores de IA, extractores);
//   - innerText: lo que se ve, con los <br> convertidos en saltos de línea.
// No guarda el HTML completo: trae los datos de contacto de Bernardo. Guarda su sha256 y su tamaño.
//
// Uso: node medir-h1-portada.mjs <salida.json>
import { pathToFileURL } from 'node:url';
import { writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

const { chromium } = await import(
  pathToFileURL('/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs').href
);

const URL_PORTADA = 'https://bernardocombeau.cl/';

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args: ['--no-sandbox'],
});
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const medidoEn = new Date().toISOString();
const resp = await page.goto(URL_PORTADA, { waitUntil: 'load', timeout: 90000 });
const cuerpo = await resp.text();
const h1Servidos = cuerpo.match(/<h1[\s>][\s\S]*?<\/h1>/g) || [];

const dom = await page.evaluate(() =>
  [...document.querySelectorAll('h1')].map((h) => ({
    outerHTML: h.outerHTML,
    textContent: h.textContent,
    innerText: h.innerText,
  }))
);

const salida = {
  url: URL_PORTADA,
  medidoEn,
  status: resp.status(),
  navegador: `Chromium ${browser.version()} headless (Playwright), 1440 × 900, desde el contenedor de la sesión por su proxy`,
  metodo:
    'Cuerpo de la respuesta de page.goto (HTML servido, sin JS): se extrae cada <h1>…</h1> con una expresión regular. ' +
    'Después del evento load: document.querySelectorAll("h1") y, de cada uno, textContent e innerText.',
  htmlServido: { bytes: Buffer.byteLength(cuerpo), sha256: createHash('sha256').update(cuerpo).digest('hex'), guardado: false },
  h1Servidos,
  h1EnElDom: dom,
  lectura: dom.map((h) => ({
    textContentTraeConstruyedirigiendo: h.textContent.includes('construyedirigiendo'),
    innerTextSeparaConSalto: /construye\s*\n\s*dirigiendo/.test(h.innerText),
  })),
};

writeFileSync(process.argv[2], JSON.stringify(salida, null, 1) + '\n');
console.log(JSON.stringify(salida.lectura), salida.h1Servidos.length, 'h1 servidos;', dom.length, 'en el DOM');
await browser.close();
