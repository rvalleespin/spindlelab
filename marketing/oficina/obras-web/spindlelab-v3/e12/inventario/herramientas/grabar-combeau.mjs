// E12 · inventario · grabaciones de los dos sitios de Combeau (encargo del paso 2, §5; defecto 3 del acta del paso 2).
// Diego, 18-oct-2026. Permiso: compuerta 1, punto 2 («no se necesita más permiso», dicho por Ramón el 16-oct).
//
// Qué hace: abre https://bernardocombeau.cl/ y https://bernardocombeau.cl/modelo/ en Chromium headless, solo con GET y
// scroll (no hace clic, no escribe en ningún campo, no envía ningún formulario), recorre la página una vez para que
// carguen las imágenes diferidas, vuelve arriba y graba un recorrido cuadro a cuadro: la posición del scroll de cada
// cuadro la fija una curva (quieto 1 s arriba, baja con aceleración suave, quieto 1 s abajo) y cada cuadro es una
// captura del viewport. Los sitios no tienen animaciones ligadas al scroll (0 elementos [data-reveal] o «reveal» /
// «fade», medido antes de grabar), así que el cuadro a cuadro muestra lo mismo que vería una persona.
//
// Dónde se detiene: en /modelo/ el recorrido termina antes de la sección de medidas (#details) y del pie de contacto
// (#booking, con su correo y su WhatsApp): datos personales que el caso no necesita. En la portada el pie no tiene
// datos de contacto (0 enlaces mailto:, tel: o WhatsApp) y se llega al final.
//
// El panel (/admin/) pide iniciar sesión con la cuenta de GitHub de Bernardo. Sin esa sesión no se graba: queda la
// captura de la pantalla de entrada, sin hacer clic en el botón.
//
// Uso: node grabar-combeau.mjs <carpeta-de-cuadros> <carpeta-de-salida> <archivo-de-registro.json>
// (corrida del inventario: cuadros en el scratchpad, salida en e12/inventario/grabaciones/, registro en
// e12/inventario/crudo/grabaciones-combeau.json)
// Después, ffmpeg arma cada recorrido (lo hace este mismo script).
import { pathToFileURL } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';

const { chromium } = await import(pathToFileURL('/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs').href);
const [cuadrosDir, salidaDir, registroArchivo] = process.argv.slice(2);
if (!cuadrosDir || !salidaDir || !registroArchivo) throw new Error('uso: node grabar-combeau.mjs <cuadros> <salida> <registro.json>');
fs.mkdirSync(salidaDir, { recursive: true });

const FPS = 30;
const QUIETO = 1; // segundos quieto al principio y al final
const GRABACIONES = [
  { id: 'combeau-fotografia', url: 'https://bernardocombeau.cl/', segundos: 10, hasta: null },
  { id: 'combeau-modelo', url: 'https://bernardocombeau.cl/modelo/', segundos: 12, hasta: '#details' },
];
const ANCHOS = [
  { ancho: 1440, alto: 810, dpr: 1, movil: false },
  { ancho: 390, alto: 844, dpr: 2, movil: true },
];

const suave = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2); // cúbica de entrada y salida
const sha = (f) => crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex');
const sonda = (f) => JSON.parse(execFileSync('ffprobe', ['-v', 'error', '-select_streams', 'v:0', '-show_entries',
  'stream=codec_name,width,height,r_frame_rate:format=duration,size', '-of', 'json', f], { encoding: 'utf8' }));

const navegador = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const registro = { herramienta: 'e12/inventario/herramientas/grabar-combeau.mjs', chromium: navegador.version(), fps: FPS, grabaciones: [], panel: null };

for (const g of GRABACIONES) {
  for (const a of ANCHOS) {
    const ctx = await navegador.newContext({ viewport: { width: a.ancho, height: a.alto }, deviceScaleFactor: a.dpr, isMobile: a.movil, hasTouch: a.movil, locale: 'es-CL', reducedMotion: 'no-preference' });
    const p = await ctx.newPage();
    const inicio = new Date().toISOString();
    // Se navega hasta `load` y la red quieta se espera aparte, con tope: la corrida del 18-oct a las 21:12 UTC (versión
    // anterior de este script) se cortó en /modelo/ a 390 y dejó sin grabar ese ancho, el panel y el registro.
    const r = await p.goto(g.url, { waitUntil: 'load', timeout: 60000 });
    await p.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
    // Carga las imágenes diferidas y vuelve arriba
    await p.evaluate(async () => {
      for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight * 0.6) { scrollTo(0, y); await new Promise((s) => setTimeout(s, 300)); }
      scrollTo(0, 0); await new Promise((s) => setTimeout(s, 800));
    });
    // En /modelo/ el video y el reel se cargan al entrar en pantalla y la red puede no quedar quieta nunca: se espera
    // hasta 10 s y se anota si llegó a quedar quieta (la primera corrida, del 18-oct, se cayó esperando sin tope).
    let redQuieta = true;
    await p.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => { redQuieta = false; });
    const medida = await p.evaluate((hasta) => {
      const H = document.documentElement.scrollHeight;
      const tope = hasta ? Math.round(document.querySelector(hasta).getBoundingClientRect().top + scrollY) : H;
      const animados = document.querySelectorAll('[data-reveal], [class*="reveal"], [class*="fade"]').length;
      const contacto = [...document.querySelectorAll('a[href^="mailto:"], a[href^="tel:"], a[href*="wa.me"], a[href*="whatsapp"]')]
        .map((e) => Math.round(e.getBoundingClientRect().top + scrollY));
      return { H, tope, animados, contacto, inner: innerHeight };
    }, g.hasta);
    const maxY = Math.max(0, Math.min(medida.H, medida.tope) - medida.inner);
    // Ningún enlace de contacto puede entrar al último cuadro
    const contactoVisible = medida.contacto.some((y) => y < maxY + medida.inner);
    if (contactoVisible) throw new Error(`${g.id} ${a.ancho}: un enlace de contacto quedaría dentro del recorrido`);

    const dir = path.join(cuadrosDir, `${g.id}-${a.ancho}`);
    fs.rmSync(dir, { recursive: true, force: true });
    fs.mkdirSync(dir, { recursive: true });
    const total = g.segundos * FPS;
    const mov = (g.segundos - 2 * QUIETO) * FPS;
    for (let i = 0; i < total; i++) {
      const t = Math.min(1, Math.max(0, (i - QUIETO * FPS) / mov));
      const y = Math.round(suave(t) * maxY);
      await p.evaluate((yy) => scrollTo(0, yy), y);
      await p.waitForTimeout(20);
      await p.screenshot({ path: path.join(dir, `c${String(i).padStart(4, '0')}.png`) });
    }
    const base = path.join(salidaDir, `${g.id}-${a.ancho}`);
    // Ancho par para H.264; a 390 los cuadros miden 780 × 1688 (dpr 2)
    execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-framerate', String(FPS), '-i', path.join(dir, 'c%04d.png'),
      '-c:v', 'libx264', '-preset', 'slow', '-crf', '24', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', `${base}.mp4`]);
    execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', path.join(dir, `c${String(Math.floor(QUIETO * FPS / 2)).padStart(4, '0')}.png`),
      '-q:v', '4', `${base}-poster.jpg`]);
    const s = sonda(`${base}.mp4`);
    const [n, d] = s.streams[0].r_frame_rate.split('/');
    registro.grabaciones.push({
      id: g.id, url: g.url, estado: r.status(), inicioUTC: inicio, finUTC: new Date().toISOString(),
      viewport: `${a.ancho} × ${a.alto}`, dpr: a.dpr, altoDocumento: medida.H, scrollHasta: maxY,
      seDetieneAntesDe: g.hasta ? `${g.hasta} (y = ${medida.tope})` : 'el final de la página',
      elementosAnimadosAlScroll: medida.animados, redQuietaAntesDeGrabar: redQuieta, enlacesDeContacto: medida.contacto.length,
      archivo: path.relative('/home/user/spindlelab', `${base}.mp4`), bytes: Number(s.format.size), sha256: sha(`${base}.mp4`),
      segundos: Number(Number(s.format.duration).toFixed(2)), cuadro: `${s.streams[0].width} × ${s.streams[0].height}`,
      codec: s.streams[0].codec_name, cuadrosPorSegundo: Number(n) / Number(d),
      poster: path.relative('/home/user/spindlelab', `${base}-poster.jpg`), posterSha256: sha(`${base}-poster.jpg`),
    });
    await ctx.close();
  }
}

// El panel: solo la pantalla de entrada, sin hacer clic en «Login with GitHub»
{
  const ctx = await navegador.newContext({ viewport: { width: 1440, height: 810 }, locale: 'es-CL' });
  const p = await ctx.newPage();
  const r = await p.goto('https://bernardocombeau.cl/admin/', { waitUntil: 'load', timeout: 60000 });
  await p.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
  await p.waitForTimeout(1500);
  const archivo = path.join(salidaDir, 'combeau-panel-entrada-1440.png');
  await p.screenshot({ path: archivo });
  const botones = await p.evaluate(() => [...document.querySelectorAll('button, a')].map((e) => e.textContent.trim()).filter(Boolean).slice(0, 6));
  registro.panel = {
    url: 'https://bernardocombeau.cl/admin/', estado: r.status(), cuandoUTC: new Date().toISOString(), botones,
    archivo: path.relative('/home/user/spindlelab', archivo), sha256: sha(archivo),
    nota: 'Pantalla de entrada del panel (Decap CMS). No se hizo clic en el botón de entrada: grabar el panel por dentro pide la sesión de GitHub de Bernardo, que esta sesión no tiene y no se pide por el chat.',
  };
  await ctx.close();
}

await navegador.close();
fs.writeFileSync(registroArchivo, JSON.stringify(registro, null, 1) + '\n');
console.log(JSON.stringify(registro, null, 1));
