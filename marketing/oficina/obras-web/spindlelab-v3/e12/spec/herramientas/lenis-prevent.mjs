// E12 · spec sobre A · ¿se puede apagar Lenis en /v3/ sin tocar Layout.astro? Lucía, 19-oct-2026.
// Layout.astro crea Lenis en toda página (salvo con movimiento reducido) con { duration: 1.1, easing expo, smoothWheel:
// true, syncTouch: false } y, además, intercepta los clics en a[href^="#"] para llevarlos con lenis.scrollTo. No se
// puede evitar que cargue sin tocar el Layout (es un módulo que Astro empaqueta en todas sus páginas). Lo que se mide
// aquí es si se lo puede dejar SIN EFECTO desde la página, con la API del propio Lenis 1.3.26 (el de
// spindlelab-astro/node_modules): el atributo data-lenis-prevent en un contenedor de toda la página (lenis.mjs:609) y
// los enlaces internos escritos con su ruta (/v3/x/#id), que el selector a[href^="#"] del Layout no toma.
// Mide, con la misma configuración del Layout, cuatro casos: (1) Lenis tal cual; (2) Lenis con data-lenis-prevent en el
// contenedor; (3) sin Lenis (scroll nativo de referencia); y el salto a un ancla con href="#x" contra href="/ruta/#x".
// Uso: node lenis-prevent.mjs <salida.json>
import { pathToFileURL } from 'node:url';
import fs from 'node:fs';
const { chromium } = await import(pathToFileURL('/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs').href);
const LENIS = '/home/user/spindlelab/spindlelab-astro/node_modules/lenis/dist/lenis.mjs';
const [salida] = process.argv.slice(2);
const version = JSON.parse(fs.readFileSync('/home/user/spindlelab/spindlelab-astro/node_modules/lenis/package.json', 'utf8')).version;

const pagina = (conLenis, prevenir) => `<!doctype html><html><head><meta charset="utf-8"><style>
html{scroll-behavior:smooth} html.lenis{scroll-behavior:auto;height:auto} html.lenis body{height:auto}
.lenis [data-lenis-prevent]{overscroll-behavior:contain} body{margin:0;background:#060606;color:#fff;font:16px sans-serif}
.alto{height:8000px} #destino{position:absolute;top:5000px}</style></head><body>
<div ${prevenir ? 'data-lenis-prevent' : ''} class="alto"><p><a id="a1" href="#destino">ancla con #</a> · <a id="a2" href="/prueba/#destino">ancla con ruta</a></p><div id="destino">destino</div></div>
${conLenis ? `<script type="module">
import Lenis from '/lenis.mjs';
// la misma configuración y el mismo manejo de anclas de src/layouts/Layout.astro
const lenis = new Lenis({ duration: 1.1, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true, syncTouch: false });
document.documentElement.classList.add('lenis');
const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); }; requestAnimationFrame(raf);
document.querySelectorAll('a[href^="#"]').forEach((a) => { a.addEventListener('click', (e) => { const id = a.getAttribute('href'); if (!id || id === '#') return; const d = document.querySelector(id); if (!d) return; e.preventDefault(); lenis.scrollTo(d, { offset: 0 }); }); });
window.__lenisListo = true;
</script>` : '<script>window.__lenisListo = true;</script>'}
</body></html>`;

const nav = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const R = { cuando: new Date().toISOString(), chromium: nav.version(), lenis: version, casos: {} };
async function caso(nombre, conLenis, prevenir) {
  const ctx = await nav.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  await p.route('**/lenis.mjs', (r) => r.fulfill({ path: LENIS, contentType: 'text/javascript' }));
  await p.route('**/prueba/', (r) => r.fulfill({ body: pagina(conLenis, prevenir), contentType: 'text/html' }));
  await p.goto('http://local.test/prueba/');
  await p.waitForFunction(() => window.__lenisListo === true);
  await p.waitForTimeout(300);
  // una muesca de rueda (100 px) sobre el contenido, y la posición cada 16 ms durante 1,2 s
  await p.mouse.move(700, 450);
  const t0 = Date.now();
  await p.mouse.wheel(0, 100);
  const rueda = [];
  for (let i = 0; i < 75; i++) { rueda.push([Date.now() - t0, await p.evaluate(() => Math.round(scrollY))]); await p.waitForTimeout(16); }
  const llega = (f) => { const x = rueda.find(([, y]) => y >= f * 100); return x ? x[0] : null; };
  // anclas: dónde queda la página 50 ms y 1,2 s después del clic, y si cambió el hash (lo que mueve el foco del teclado)
  const anclas = {};
  for (const id of ['a1', 'a2']) {
    await p.evaluate(() => { window.scrollTo({ top: 0, behavior: 'instant' }); history.replaceState(null, '', '/prueba/'); });
    await p.waitForTimeout(300);
    await p.click('#' + id);
    await p.waitForTimeout(50);
    const a50 = await p.evaluate(() => Math.round(scrollY));
    await p.waitForTimeout(1150);
    anclas[id] = { href: await p.getAttribute('#' + id, 'href'), a50ms: a50, a1200ms: await p.evaluate(() => Math.round(scrollY)), hash: await p.evaluate(() => location.hash) };
  }
  R.casos[nombre] = { rueda: { al90: llega(0.9), al99: llega(0.99), final: rueda[rueda.length - 1][1], muestras: rueda.slice(0, 20) }, anclas };
  await ctx.close();
}
await caso('lenis-tal-cual', true, false);
await caso('lenis-con-data-lenis-prevent', true, true);
await caso('sin-lenis', false, false);
await nav.close();
fs.writeFileSync(salida, JSON.stringify(R, null, 1));
for (const [k, v] of Object.entries(R.casos)) console.log(k, 'rueda 90 %:', v.rueda.al90, 'ms · 99 %:', v.rueda.al99, 'ms · ancla #:', JSON.stringify(v.anclas.a1), '· ancla con ruta:', JSON.stringify(v.anclas.a2));
