// E12 · caso Combeau en A · las primeras pantallas de los dos sitios, a 1440 y 390, en dpr 2, para las imágenes fijas
// del caso. Diego, 19-oct-2026. Mismo permiso y misma regla que grabar-modelo-sin-medidas.mjs: solo GET y scroll; en
// /modelo/ la captura se corta 8 px sobre la línea de medidas (.meta-item) si cae dentro del viewport, y se comprueba
// con el DOM que ni la línea ni un enlace de contacto quedan dentro del recorte.
// Uso: node capturar-portadas.mjs <carpeta-de-salida> <registro.json>
import { pathToFileURL } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';

const { chromium } = await import(pathToFileURL('/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs').href);
const [salida, registroArchivo] = process.argv.slice(2);
if (!salida || !registroArchivo) throw new Error('uso: node capturar-portadas.mjs <salida> <registro.json>');
fs.mkdirSync(salida, { recursive: true });

const SITIOS = [
  { id: 'fotografia', url: 'https://bernardocombeau.cl/' },
  { id: 'modelo', url: 'https://bernardocombeau.cl/modelo/' },
];
const ANCHOS = [
  { ancho: 1440, alto: 900, dpr: 2, movil: false },
  { ancho: 390, alto: 844, dpr: 2, movil: true },
];
const navegador = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const registro = { herramienta: 'e12/casos/combeau/herramientas/capturar-portadas.mjs', chromium: navegador.version(), capturas: [] };

for (const s of SITIOS) {
  for (const a of ANCHOS) {
    const ctx = await navegador.newContext({ viewport: { width: a.ancho, height: a.alto }, deviceScaleFactor: a.dpr,
      isMobile: a.movil, hasTouch: a.movil, locale: 'es-CL' });
    const p = await ctx.newPage();
    const r = await p.goto(s.url, { waitUntil: 'load', timeout: 60000 });
    await p.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
    await p.evaluate(async () => {
      for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight * 0.6) { scrollTo(0, y); await new Promise((t) => setTimeout(t, 250)); }
      scrollTo(0, 0); await new Promise((t) => setTimeout(t, 800));
    });
    await p.waitForLoadState('networkidle', { timeout: 8000 }).catch(() => {});
    const m = await p.evaluate(() => {
      const items = [...document.querySelectorAll('.meta-item')];
      const top = items.length ? Math.min(...items.map((i) => i.getBoundingClientRect().top + scrollY)) : null;
      const contacto = [...document.querySelectorAll('a[href^="mailto:"], a[href^="tel:"], a[href*="wa.me"], a[href*="whatsapp"]')]
        .map((e) => e.getBoundingClientRect().top + scrollY);
      return { lineaTop: top === null ? null : Math.round(top), contacto: contacto.map(Math.round), inner: innerHeight };
    });
    const alto = m.lineaTop !== null ? Math.min(m.inner, m.lineaTop - 8) : m.inner;
    if (m.contacto.some((y) => y < alto)) throw new Error(`${s.id} ${a.ancho}: un enlace de contacto cae en el recorte`);
    const archivo = path.join(salida, `${s.id}-${a.ancho}-primera.png`);
    await p.screenshot({ path: archivo, clip: { x: 0, y: 0, width: a.ancho, height: alto } });
    registro.capturas.push({ id: s.id, url: s.url, estado: r.status(), ancho: a.ancho, dpr: a.dpr, altoCss: alto,
      lineaDeMedidasTop: m.lineaTop, corte: m.lineaTop !== null && alto < m.inner ? '8 px sobre la línea de medidas' : 'viewport entero',
      archivo: path.basename(archivo), cuandoUTC: new Date().toISOString() });
    await ctx.close();
  }
}
await navegador.close();
fs.writeFileSync(registroArchivo, JSON.stringify(registro, null, 1) + '\n');
console.log(JSON.stringify(registro, null, 1));
