// Qué imágenes baja la portada de spindlelab.cl en la carga, y cuánto pesa cada una (E12, inventario).
//
// carga-playwright.json guarda el total por tipo, no el detalle por pedido. Esto lista cada imagen con las
// mismas condiciones que medir-carga.mjs (caché desactivado, contexto nuevo, sin scroll, sin aceptar cookies,
// 4 s tras load), para respaldar «los posters de los videos pesan de X a Y kB cada uno».
// Bytes = encodedDataLength de CDP (lo transferido, con cabeceras) y content-length de la respuesta (el archivo).
// Unidad del inventario: kB = 1.000 bytes.
//
// Uso: node medir-imagenes.mjs <salida.json>
import { pathToFileURL } from 'node:url';
import { writeFileSync } from 'node:fs';

const { chromium } = await import(
  pathToFileURL('/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs').href
);

const URL_PORTADA = 'https://spindlelab.cl/';
const ANCHOS = [
  { nombre: '390', viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true },
  { nombre: '1440', viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, isMobile: false, hasTouch: false },
];

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args: ['--no-sandbox'],
});

const salida = {
  url: URL_PORTADA,
  medidoEn: new Date().toISOString(),
  navegador: `Chromium ${browser.version()} headless (Playwright)`,
  metodo:
    'Una corrida por ancho, caché desactivado y contexto nuevo, sin scroll, sin aceptar cookies, 4000 ms tras load. ' +
    'Por cada respuesta de tipo Image: URL, bytes transferidos (encodedDataLength de CDP, con cabeceras) y content-length. ' +
    'Medición de laboratorio, no de usuarios reales.',
  unidad: 'kB = 1.000 bytes',
  anchos: [],
};

for (const ancho of ANCHOS) {
  const ctx = await browser.newContext({
    viewport: ancho.viewport,
    deviceScaleFactor: ancho.deviceScaleFactor,
    isMobile: ancho.isMobile,
    hasTouch: ancho.hasTouch,
  });
  const page = await ctx.newPage();
  const cdp = await ctx.newCDPSession(page);
  await cdp.send('Network.enable');
  await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
  const reqs = new Map();
  cdp.on('Network.responseReceived', (e) => {
    const h = Object.fromEntries(Object.entries(e.response.headers).map(([k, v]) => [k.toLowerCase(), v]));
    reqs.set(e.requestId, {
      url: e.response.url,
      tipo: e.type,
      status: e.response.status,
      contentType: h['content-type'] || null,
      contentLength: h['content-length'] ? Number(h['content-length']) : null,
      bytesTransferidos: 0,
    });
  });
  cdp.on('Network.loadingFinished', (e) => {
    const r = reqs.get(e.requestId);
    if (r) r.bytesTransferidos = e.encodedDataLength;
  });
  await page.goto(URL_PORTADA, { waitUntil: 'load', timeout: 90000 });
  await page.waitForTimeout(4000);
  await ctx.close();
  const imagenes = [...reqs.values()].filter((r) => r.tipo === 'Image');
  const total = imagenes.reduce((s, r) => s + r.bytesTransferidos, 0);
  salida.anchos.push({ ancho: ancho.nombre, imagenes, bytesImagenes: total });
  console.log(`@${ancho.nombre}: ${imagenes.length} imágenes, ${(total / 1000).toFixed(1)} kB`);
  for (const r of imagenes) console.log(`  ${(r.bytesTransferidos / 1000).toFixed(1)} kB  ${r.url}`);
}

writeFileSync(process.argv[2], JSON.stringify(salida, null, 1) + '\n');
await browser.close();
