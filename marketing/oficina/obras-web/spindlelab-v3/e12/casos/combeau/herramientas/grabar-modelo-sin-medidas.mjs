// E12 · caso Combeau en A · el book de modelo sin sus medidas personales.
// Diego, 19-oct-2026. Permiso: compuerta 1, punto 2 («no se necesita más permiso», Ramón, 16-oct). Recorte: compuerta 2,
// pregunta 7, por defecto («a Combeau se le recortan sus medidas personales: edad, estatura, pelo, ojos»), y defecto 21
// del acta del paso 2 aplicado a A.
//
// Por qué existe: las grabaciones del inventario (e12/inventario/grabaciones/combeau-modelo-*.mp4, 18-oct) se detienen
// antes de #details, pero sí muestran la línea que va bajo el retrato de portada («Santiago, Chile · 46 · 185 cm · Grey
// Hair · Blue Eyes», spans .meta-item): a 390 desde el primer cuadro, a 1440 entre los 2,5 y los 4,5 s. Y la cinta de la
// home de A (proto/a/medios/cinta.*) la muestra en su tramo «Combeau, modelo» (12 a 14 s). Esto graba de nuevo, del
// sitio vivo, un tramo que no la muestra, en vez de tapar la línea con un parche: lo que se ve es su sitio tal cual.
//
// Qué hace, en https://bernardocombeau.cl/modelo/ a 1440 × 810 (dpr 1) y 390 × 844 (dpr 2), solo con GET y scroll (ningún
// clic, ningún campo, ningún formulario):
//   1. carga la página, recorre una vez para las imágenes diferidas y vuelve arriba;
//   2. mide la línea de medidas (el bloque que contiene los .meta-item), #book, #reel, #polaroids, #details y #booking;
//   3. graba un recorrido cuadro a cuadro desde justo debajo de la línea (el retrato ya salió por arriba) hasta antes de
//      #reel, cuya sección no tiene estilos propios (inventario-casos §2.8) y tras la que vienen las polaroids y la ficha;
//   4. en CADA cuadro comprueba, con el DOM, que la línea de medidas, #reel, #polaroids, #details, #booking y todo enlace
//      mailto:, tel: o de WhatsApp quedan fuera del viewport; si uno entra, se detiene con error;
//   5. saca la primera pantalla (scroll 0) recortada sobre la línea: a 1440 la línea queda bajo el pliegue y el
//      viewport entero sirve; a 390 se corta 8 px sobre ella.
// Uso: node grabar-modelo-sin-medidas.mjs <carpeta-de-cuadros> <registro.json>
import { pathToFileURL } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';

const { chromium } = await import(pathToFileURL('/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs').href);
const [cuadrosDir, registroArchivo] = process.argv.slice(2);
if (!cuadrosDir || !registroArchivo) throw new Error('uso: node grabar-modelo-sin-medidas.mjs <cuadros> <registro.json>');

const URL_MODELO = 'https://bernardocombeau.cl/modelo/';
const FPS = 30;
const SEGUNDOS = 8;
const QUIETO = 0.6;          // segundos quieto al principio y al final
const MARGEN = 12;           // px CSS entre la línea (o #reel) y el borde del viewport
const ANCHOS = [
  { ancho: 1440, alto: 810, dpr: 1, movil: false },
  { ancho: 390, alto: 844, dpr: 2, movil: true },
];
const suave = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const navegador = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const registro = {
  herramienta: 'e12/casos/combeau/herramientas/grabar-modelo-sin-medidas.mjs', url: URL_MODELO,
  chromium: navegador.version(), fps: FPS, grabaciones: [],
};

for (const a of ANCHOS) {
  const ctx = await navegador.newContext({ viewport: { width: a.ancho, height: a.alto }, deviceScaleFactor: a.dpr,
    isMobile: a.movil, hasTouch: a.movil, locale: 'es-CL', reducedMotion: 'no-preference' });
  const p = await ctx.newPage();
  const inicio = new Date().toISOString();
  const r = await p.goto(URL_MODELO, { waitUntil: 'load', timeout: 60000 });
  await p.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
  await p.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight * 0.6) { scrollTo(0, y); await new Promise((s) => setTimeout(s, 300)); }
    scrollTo(0, 0); await new Promise((s) => setTimeout(s, 800));
  });
  let redQuieta = true;
  await p.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => { redQuieta = false; });

  const m = await p.evaluate(() => {
    const abs = (e) => { const b = e.getBoundingClientRect(); return { top: Math.round(b.top + scrollY), bottom: Math.round(b.bottom + scrollY) }; };
    const items = [...document.querySelectorAll('.meta-item')];
    if (!items.length) return { error: 'no hay .meta-item: la página cambió' };
    // el bloque que contiene todos los .meta-item
    let linea = items[0].parentElement;
    while (linea && !items.every((i) => linea.contains(i))) linea = linea.parentElement;
    const sec = (s) => { const e = document.querySelector(s); return e ? abs(e) : null; };
    return {
      H: document.documentElement.scrollHeight, inner: innerHeight,
      linea: { ...abs(linea), texto: items.map((i) => i.textContent.trim()).length + ' elementos .meta-item' },
      book: sec('#book'), reel: sec('#reel'), polaroids: sec('#polaroids'), details: sec('#details'), booking: sec('#booking'),
      animados: document.querySelectorAll('[data-reveal], [class*="reveal"], [class*="fade"]').length,
    };
  });
  if (m.error) throw new Error(m.error);
  const desde = m.linea.bottom + MARGEN;
  const hasta = m.reel.top - m.inner - MARGEN;
  if (hasta <= desde) throw new Error(`${a.ancho}: no hay tramo entre la línea de medidas y #reel`);

  // 5. primera pantalla, recortada sobre la línea
  await p.evaluate(() => scrollTo(0, 0));
  await p.waitForTimeout(400);
  const altoPortada = Math.min(m.inner, m.linea.top - 8);
  const portada = path.join(cuadrosDir, `modelo-${a.ancho}-portada.png`);
  fs.mkdirSync(cuadrosDir, { recursive: true });
  await p.screenshot({ path: portada, clip: { x: 0, y: 0, width: a.ancho, height: altoPortada } });

  // 3 y 4. recorrido, con la comprobación por cuadro
  const dir = path.join(cuadrosDir, `modelo-${a.ancho}`);
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
  const total = SEGUNDOS * FPS;
  const mov = (SEGUNDOS - 2 * QUIETO) * FPS;
  let peor = { linea: Infinity, reel: Infinity };
  for (let i = 0; i < total; i++) {
    const t = Math.min(1, Math.max(0, (i - QUIETO * FPS) / mov));
    const y = Math.round(desde + suave(t) * (hasta - desde));
    await p.evaluate((yy) => scrollTo(0, yy), y);
    await p.waitForTimeout(20);
    const c = await p.evaluate(() => {
      const dentro = (e) => { if (!e) return false; const b = e.getBoundingClientRect(); return b.bottom > 0 && b.top < innerHeight; };
      const items = [...document.querySelectorAll('.meta-item')];
      const contacto = [...document.querySelectorAll('a[href^="mailto:"], a[href^="tel:"], a[href*="wa.me"], a[href*="whatsapp"]')];
      const b0 = items[0].getBoundingClientRect();
      const r = document.querySelector('#reel').getBoundingClientRect();
      return {
        scrollY: Math.round(scrollY),
        lineaVisible: items.some(dentro),
        prohibidas: ['#reel', '#polaroids', '#details', '#compcard', '#booking'].filter((s) => dentro(document.querySelector(s))),
        contactoVisible: contacto.some(dentro),
        distLinea: Math.round(-b0.bottom),            // px entre la línea y el borde de arriba (positivo: fuera)
        distReel: Math.round(r.top - innerHeight),    // px entre #reel y el borde de abajo (positivo: fuera)
      };
    });
    if (c.lineaVisible || c.prohibidas.length || c.contactoVisible) {
      throw new Error(`${a.ancho}, cuadro ${i} (y=${c.scrollY}): entra ${c.lineaVisible ? 'la línea de medidas ' : ''}${c.prohibidas.join(' ')}${c.contactoVisible ? ' un enlace de contacto' : ''}`);
    }
    peor = { linea: Math.min(peor.linea, c.distLinea), reel: Math.min(peor.reel, c.distReel) };
    await p.screenshot({ path: path.join(dir, `c${String(i).padStart(4, '0')}.png`) });
  }
  registro.grabaciones.push({
    ancho: a.ancho, alto: a.alto, dpr: a.dpr, estado: r.status(), inicioUTC: inicio, finUTC: new Date().toISOString(),
    redQuietaAntesDeGrabar: redQuieta, elementosAnimadosAlScroll: m.animados, altoDocumento: m.H,
    lineaDeMedidas: m.linea, secciones: { book: m.book, reel: m.reel, polaroids: m.polaroids, details: m.details, booking: m.booking },
    recorrido: { desdeScrollY: desde, hastaScrollY: hasta, segundos: SEGUNDOS, cuadros: total, quietoSegundos: QUIETO },
    comprobacionPorCuadro: {
      cuadrosRevisados: total, lineaDeMedidasVisible: 0, seccionesProhibidasVisibles: 0, enlacesDeContactoVisibles: 0,
      margenMinimoSobreLaLinea: peor.linea, margenMinimoBajoReel: peor.reel,
      regla: 'la línea (.meta-item), #reel, #polaroids, #details, #compcard, #booking y los enlaces mailto/tel/WhatsApp fuera del viewport en cada cuadro',
    },
    portada: { archivo: path.basename(portada), alto: altoPortada, nota: altoPortada < m.inner ? `cortada 8 px sobre la línea (y=${m.linea.top})` : 'viewport entero: la línea queda bajo el pliegue' },
  });
  await ctx.close();
}
await navegador.close();
fs.writeFileSync(registroArchivo, JSON.stringify(registro, null, 1) + '\n');
console.log(JSON.stringify(registro, null, 1));
