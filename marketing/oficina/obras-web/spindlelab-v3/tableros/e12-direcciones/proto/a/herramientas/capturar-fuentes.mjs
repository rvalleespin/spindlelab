// Dirección A · captura de los sitios vivos que no tenían una captura plana (sin maqueta de dispositivo):
// Combeau (fotografía y modelo), Verifica y Cumple, el chequeo y spindlelab.cl. Solo GET y scroll:
// no se escribe en ningún campo ni se envía ningún formulario. Lucía, 17-oct-2026.
// Uso: node capturar-fuentes.mjs <carpeta-de-salida> [id,id]
import { pathToFileURL } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';
const { chromium } = await import(pathToFileURL('/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs').href);

const salida = process.argv[2];
fs.mkdirSync(salida, { recursive: true });
const SOLO = process.argv[3] ? process.argv[3].split(',') : null;
const SITIOS = [
  { id: 'combeau-fotografia', url: 'https://bernardocombeau.cl/' },
  { id: 'combeau-modelo', url: 'https://bernardocombeau.cl/modelo/' },
  { id: 'verifica-y-cumple', url: 'https://verifica.spindlelab.cl/' },
  { id: 'chequeo', url: 'https://spindlelab.cl/diagnostico/' },
  { id: 'spindlelab', url: 'https://spindlelab.cl/' },
];
const navegador = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const registro = [];
for (const s of SITIOS.filter(x => !SOLO || SOLO.includes(x.id))) {
  for (const [ancho, alto, dpr, movil] of [[1440, 810, 2, false], [390, 844, 2, true]]) {
    const ctx = await navegador.newContext({ viewport: { width: ancho, height: alto }, deviceScaleFactor: dpr, isMobile: movil, hasTouch: movil, locale: 'es-CL' });
    const p = await ctx.newPage();
    let estado = null;
    try {
      const r = await p.goto(s.url, { waitUntil: 'networkidle', timeout: 60000 });
      estado = r && r.status();
      // El aviso de cookies de spindlelab.cl tapa la parte de abajo: se elige «Rechazar» (no carga analítica) y nada más
      const rechazar = p.getByRole('button', { name: 'Rechazar' });
      if (await rechazar.count()) { await rechazar.first().click(); await p.waitForTimeout(400); }
      // recorre la página para que carguen las imágenes diferidas y vuelve arriba
      await p.evaluate(async () => {
        const paso = innerHeight * 0.8;
        for (let y = 0; y < document.documentElement.scrollHeight; y += paso) { scrollTo(0, y); await new Promise(r => setTimeout(r, 250)); }
        scrollTo(0, 0); await new Promise(r => setTimeout(r, 600));
      });
      await p.waitForTimeout(800);
      const base = path.join(salida, `${s.id}-${ancho}`);
      await p.screenshot({ path: `${base}-primera.png` });
      await p.screenshot({ path: `${base}-completa.png`, fullPage: true });
      const alto_doc = await p.evaluate(() => document.documentElement.scrollHeight);
      registro.push({ id: s.id, url: s.url, ancho, dpr, estado, alto_doc, cuando: new Date().toISOString() });
    } catch (e) {
      registro.push({ id: s.id, url: s.url, ancho, error: String(e).slice(0, 200) });
    }
    await ctx.close();
  }
}
await navegador.close();
fs.writeFileSync(path.join(salida, SOLO ? `registro-${SOLO.join('-')}.json` : 'registro.json'), JSON.stringify(registro, null, 1));
console.log(JSON.stringify(registro, null, 1));
