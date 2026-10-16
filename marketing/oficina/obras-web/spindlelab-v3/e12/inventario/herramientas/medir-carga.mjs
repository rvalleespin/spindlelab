// Carga y peso de las páginas en vivo, medidos desde el contenedor de la sesión (E12, inventario).
//
// ES MEDICIÓN DE LABORATORIO, NO DE USUARIOS REALES: un solo origen (este contenedor, que sale por
// el proxy de la sesión), sin limitar CPU ni red, caché frío en cada corrida (contexto nuevo), sin
// aceptar el aviso de cookies y sin hacer scroll. Los tiempos dicen cómo se comportó cada página
// aquí y hoy; no son Core Web Vitals de campo ni lo que ve un visitante en Santiago con 4G.
//
// Unidad: kB = 1.000 bytes. Hasta el 16-oct a las 18:45 la consola dividía por 1.024 y lo escribía «KB»,
// y de ahí salieron los KiB rotulados kB del inventario (acta del paso 1, defecto 13). El JSON guarda bytes.
//
// Uso: node medir-carga.mjs <salida.json> [corridas=3]
import { pathToFileURL } from 'node:url';
import { writeFileSync } from 'node:fs';

const { chromium } = await import(
  pathToFileURL('/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs').href
);

const PAGINAS = [
  ['spindlelab.cl (producción, v2)', 'https://spindlelab.cl/'],
  ['bernardocombeau.cl', 'https://bernardocombeau.cl/'],
  ['bernardocombeau.cl/modelo/', 'https://bernardocombeau.cl/modelo/'],
  ['verifica.spindlelab.cl', 'https://verifica.spindlelab.cl/'],
  ['v3, vista previa noindex: /v3/', 'https://claude-magical-franklin-ckfk.spindlelab-v2.pages.dev/v3/'],
  ['v3, vista previa noindex: /v3/trabajo/', 'https://claude-magical-franklin-ckfk.spindlelab-v2.pages.dev/v3/trabajo/'],
];
const ANCHOS = [
  { nombre: '390', viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true },
  { nombre: '1440', viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, isMobile: false, hasTouch: false },
];
const CORRIDAS = Number(process.argv[3] || 3);
const ESPERA_TRAS_LOAD_MS = 4000;

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args: ['--no-sandbox'],
});

async function medirUna(url, ancho) {
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
    reqs.set(e.requestId, { url: e.response.url, tipo: e.type, status: e.response.status, bytes: 0 });
  });
  cdp.on('Network.loadingFinished', (e) => {
    const r = reqs.get(e.requestId);
    if (r) r.bytes = e.encodedDataLength;
  });
  // LCP y CLS: observadores con buffer, puestos antes de navegar.
  await page.addInitScript(() => {
    window.__lcp = null;
    window.__cls = 0;
    new PerformanceObserver((l) => {
      for (const e of l.getEntries()) window.__lcp = { t: e.startTime, el: e.element ? e.element.tagName : null, tam: e.size };
    }).observe({ type: 'largest-contentful-paint', buffered: true });
    new PerformanceObserver((l) => {
      for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value;
    }).observe({ type: 'layout-shift', buffered: true });
  });
  const t0 = Date.now();
  const resp = await page.goto(url, { waitUntil: 'load', timeout: 90000 });
  const msHastaLoad = Date.now() - t0;
  await page.waitForTimeout(ESPERA_TRAS_LOAD_MS);
  const nav = await page.evaluate(() => {
    const n = performance.getEntriesByType('navigation')[0];
    const fcp = performance.getEntriesByName('first-contentful-paint')[0];
    return {
      ttfb: n ? Math.round(n.responseStart) : null,
      dcl: n ? Math.round(n.domContentLoadedEventEnd) : null,
      load: n ? Math.round(n.loadEventEnd) : null,
      fcp: fcp ? Math.round(fcp.startTime) : null,
      lcp: window.__lcp ? Math.round(window.__lcp.t) : null,
      lcpElemento: window.__lcp ? window.__lcp.el : null,
      cls: Math.round(window.__cls * 1000) / 1000,
      documentoBytesDecodificados: n ? n.decodedBodySize : null,
      protocolo: n ? n.nextHopProtocol : null,
      ancho: document.documentElement.scrollWidth,
    };
  });
  const host = new URL(url).host;
  const lista = [...reqs.values()];
  const porTipo = {};
  let total = 0;
  let terceros = 0;
  for (const r of lista) {
    total += r.bytes;
    porTipo[r.tipo] = (porTipo[r.tipo] || 0) + r.bytes;
    let h = '';
    try { h = new URL(r.url).host; } catch { h = ''; }
    if (h && h !== host && !r.url.startsWith('data:')) terceros += r.bytes;
  }
  const hostsTerceros = [...new Set(lista.map((r) => { try { return new URL(r.url).host; } catch { return ''; } }).filter((h) => h && h !== host))];
  await ctx.close();
  return {
    status: resp ? resp.status() : null,
    msHastaLoadDesdeNode: msHastaLoad,
    ...nav,
    pedidos: lista.length,
    bytesTransferidos: total,
    bytesTerceros: terceros,
    hostsTerceros,
    bytesPorTipo: porTipo,
  };
}

const mediana = (xs) => {
  const v = xs.filter((x) => typeof x === 'number').sort((a, b) => a - b);
  if (!v.length) return null;
  const m = Math.floor(v.length / 2);
  return v.length % 2 ? v[m] : Math.round((v[m - 1] + v[m]) / 2);
};

const salida = {
  medidoEn: new Date().toISOString(),
  metodo:
    'Chromium 141 headless (Playwright 1.63.0 de spindlelab-astro), desde el contenedor de la sesión por su proxy con verificación TLS. ' +
    `Caché desactivado y contexto nuevo en cada corrida; ${CORRIDAS} corridas por página y ancho; espera de ${ESPERA_TRAS_LOAD_MS} ms tras el evento load; ` +
    'sin scroll, sin aceptar cookies, sin limitar CPU ni red. Bytes = encodedDataLength de CDP (lo transferido, con cabeceras). ' +
    'Medición de laboratorio, no de usuarios reales.',
  paginas: [],
};

for (const [nombre, url] of PAGINAS) {
  for (const ancho of ANCHOS) {
    const corridas = [];
    for (let i = 0; i < CORRIDAS; i++) {
      try {
        corridas.push(await medirUna(url, ancho));
      } catch (e) {
        corridas.push({ error: String(e.message).slice(0, 200) });
      }
    }
    const ok = corridas.filter((c) => !c.error);
    const fila = {
      nombre,
      url,
      ancho: ancho.nombre,
      mediana: {
        ttfb: mediana(ok.map((c) => c.ttfb)),
        fcp: mediana(ok.map((c) => c.fcp)),
        lcp: mediana(ok.map((c) => c.lcp)),
        dcl: mediana(ok.map((c) => c.dcl)),
        load: mediana(ok.map((c) => c.load)),
        cls: ok.length ? ok.map((c) => c.cls).sort((a, b) => a - b)[Math.floor(ok.length / 2)] : null,
        pedidos: mediana(ok.map((c) => c.pedidos)),
        bytesTransferidos: mediana(ok.map((c) => c.bytesTransferidos)),
        bytesTerceros: mediana(ok.map((c) => c.bytesTerceros)),
      },
      corridas,
    };
    salida.paginas.push(fila);
    console.log(
      `${nombre} @${ancho.nombre}: ttfb ${fila.mediana.ttfb} · fcp ${fila.mediana.fcp} · lcp ${fila.mediana.lcp} · load ${fila.mediana.load} ms · ` +
        `${fila.mediana.pedidos} pedidos · ${Math.round((fila.mediana.bytesTransferidos || 0) / 1000)} kB (${Math.round((fila.mediana.bytesTerceros || 0) / 1000)} kB de terceros) · cls ${fila.mediana.cls}`
    );
  }
}

writeFileSync(process.argv[2], JSON.stringify(salida, null, 1));
await browser.close();
