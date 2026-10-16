// Capturas de Praxi para el caso de E12, desde una COPIA local del repo, nunca desde su producción.
//
// De dónde sale lo que se captura: `/home/user/praxis-coach` (clon de solo lectura, a360d7a) copiado sin
// `.git` al scratchpad de la sesión, `npm ci`, `next build` y `next start -H 127.0.0.1 -p 3917`, con estas
// variables de entorno PUESTAS EN LA LÍNEA DE COMANDOS (no se escribió ningún .env, ni en la copia ni en el
// repo): NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:9 (un puerto donde no escucha nadie: ni su Supabase
// ni ningún otro), NEXT_PUBLIC_SUPABASE_ANON_KEY=<texto de mentira>, NEXT_PUBLIC_APP_URL=http://127.0.0.1:3917.
// Sin ANTHROPIC_API_KEY, sin Mercado Pago, sin PostHog, sin Meta: esas rutas no se tocan.
//
// Qué se puede ver así: solo lo público (/, /login, /planes, /empezar). Las pantallas de la app (/home,
// /chat, /registro, /progreso, /perfil, /onboarding) redirigen a /login sin sesión (307, medido): quedan
// como hueco nombrado en el inventario, no se inventan con datos falsos.
//
// Las cifras que se ven dentro de la landing (la conversación de ejemplo, «RIR 2.1 · objetivo 2», los
// gráficos) están escritas a mano en `components/landing.tsx`: son DEMOSTRACIÓN de la propia landing, no
// datos de nadie. El inventario lo dice así.
//
// Uso: node capturar-praxi.mjs <base-url> <carpeta-salida-png> <salida.json>
import { pathToFileURL } from 'node:url';
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const { chromium } = await import(
  pathToFileURL('/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs').href
);

const [BASE = 'http://127.0.0.1:3917', SALIDA = './png', JSON_SALIDA = './capturas.json'] = process.argv.slice(2);
mkdirSync(SALIDA, { recursive: true });

const RUTAS = [
  { ruta: '/', nombre: 'landing', secciones: true, completa: true },
  { ruta: '/login', nombre: 'login', secciones: false, completa: false },
  { ruta: '/planes', nombre: 'planes', secciones: false, completa: true },
  { ruta: '/empezar', nombre: 'empezar', secciones: false, completa: true },
];
const ANCHOS = [
  { nombre: '1440', viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, isMobile: false, hasTouch: false },
  { nombre: '390', viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
];

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args: ['--no-sandbox'],
});
const version = browser.version();
const informe = { base: BASE, chromium: version, fecha_utc: new Date().toISOString(), capturas: [] };

const espera = (ms) => new Promise((r) => setTimeout(r, ms));

for (const ancho of ANCHOS) {
  for (const r of RUTAS) {
    const ctx = await browser.newContext({
      viewport: ancho.viewport,
      deviceScaleFactor: ancho.deviceScaleFactor,
      isMobile: ancho.isMobile,
      hasTouch: ancho.hasTouch,
      locale: 'es-CL',
    });
    const page = await ctx.newPage();
    const consola = [];
    const fallidas = [];
    const externas = new Set();
    page.on('console', (m) => {
      if (m.type() === 'error' || m.type() === 'warning') consola.push(`${m.type()}: ${m.text()}`);
    });
    page.on('pageerror', (e) => consola.push(`pageerror: ${e.message}`));
    page.on('requestfailed', (q) => fallidas.push(`${q.url()} · ${q.failure()?.errorText}`));
    page.on('request', (q) => {
      const u = new URL(q.url());
      if (!['127.0.0.1', 'localhost'].includes(u.hostname) && u.protocol.startsWith('http')) externas.add(u.origin);
    });

    const resp = await page.goto(BASE + r.ruta, { waitUntil: 'load' });
    await espera(2500); // las entradas «rise» de la landing duran menos que esto
    const base = `${r.nombre}-${ancho.nombre}`;
    await page.screenshot({ path: join(SALIDA, `${base}-primera.png`) });

    // Recorre la página para que los IntersectionObserver (video de la banda, gráficos) lleguen a su estado.
    const alto = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < alto; y += Math.round(ancho.viewport.height * 0.6)) {
      await page.evaluate((yy) => window.scrollTo(0, yy), y);
      await espera(250);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await espera(800);

    const datos = await page.evaluate(() => {
      const v = document.createElement('video');
      const videos = [...document.querySelectorAll('video')].map((x) => ({
        src: x.currentSrc || x.getAttribute('src') || x.querySelector('source')?.src || null,
        paused: x.paused,
        readyState: x.readyState,
        error: x.error ? x.error.code : null,
      }));
      return {
        titulo: document.title,
        h1: [...document.querySelectorAll('h1')].map((h) => h.innerText.trim()),
        alto: document.documentElement.scrollHeight,
        ancho_doc: document.documentElement.scrollWidth,
        h264: v.canPlayType('video/mp4; codecs="avc1.42E01E"'),
        videos,
        jsonld_tipos: [...document.querySelectorAll('script[type="application/ld+json"]')].flatMap((s) => {
          try {
            const j = JSON.parse(s.textContent);
            const g = j['@graph'] || [j];
            return g.map((n) => n['@type']);
          } catch {
            return ['(no parsea)'];
          }
        }),
        robots: document.querySelector('meta[name="robots"]')?.content || null,
        canonical: document.querySelector('link[rel="canonical"]')?.href || null,
      };
    });

    const archivos = [`${base}-primera.png`];
    if (r.completa) {
      await page.screenshot({ path: join(SALIDA, `${base}-completa.png`), fullPage: true });
      archivos.push(`${base}-completa.png`);
    }
    const secciones = [];
    if (r.secciones) {
      // La barra de navegación es pegajosa: en una captura por sección quedaría encima del contenido.
      // Solo para estas capturas se la deja en su sitio (arriba de la página); la vista completa ya se tomó.
      await page.addStyleTag({ content: '.lp nav, nav.nav { position: absolute !important; }' });
      const loc = page.locator('header.hero, section');
      const total = await loc.count();
      for (let i = 0; i < total; i++) {
        const el = loc.nth(i);
        const info = await el.evaluate((e) => ({
          clase: e.className,
          id: e.id || null,
          titulo: (e.querySelector('h1,h2')?.innerText || '').trim().replace(/\s+/g, ' ').slice(0, 90),
          alto: Math.round(e.getBoundingClientRect().height),
        }));
        if (info.alto < 40) continue;
        const nombre = `${base}-sec${String(i).padStart(2, '0')}.png`;
        await el.scrollIntoViewIfNeeded();
        await espera(400);
        await el.screenshot({ path: join(SALIDA, nombre) });
        secciones.push({ archivo: nombre, ...info });
      }
    }

    informe.capturas.push({
      ruta: r.ruta,
      ancho: ancho.nombre,
      viewport: ancho.viewport,
      dpr: ancho.deviceScaleFactor,
      status: resp?.status() ?? null,
      archivos,
      secciones,
      ...datos,
      externas: [...externas],
      consola,
      fallidas,
    });
    await ctx.close();
  }
}

await browser.close();
writeFileSync(JSON_SALIDA, JSON.stringify(informe, null, 2));
console.log(`ok · ${informe.capturas.length} vistas · chromium ${version}`);
