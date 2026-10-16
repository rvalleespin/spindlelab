// E12 · Koto · piezas comunes de la medición (navegador, carga con reintentos, cookies, recorrido).
// Chromium 141 (/opt/pw-browsers/chromium-1194) con Playwright 1.63 del repo, por el proxy del entorno.
import { pathToFileURL } from 'node:url';
const { chromium } = await import(pathToFileURL('/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs').href);

export const PAGINAS = {
  home: 'https://koto.com/',
  trabajo: 'https://koto.com/work',
  caso: 'https://koto.com/projects/instagram',
  estudio: 'https://koto.com/about',
};

export const ANCHOS = {
  1440: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 },
  // 390 con dpr 2 y como teléfono (sin hover, con toque): así sirve Koto sus variantes sin `md:`.
  390: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
};

export async function abrirNavegador() {
  return chromium.launch({
    executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
    proxy: process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY } : undefined,
  });
}

// El reproductor de Vimeo (iframe player.vimeo.com/video/…) se bloquea: este Chromium no trae H.264,
// el video no corre y el iframe, al fallar, mueve el scroll de la página ~2 s después (medido en
// el caso: de 0 a 2205 px sin ninguna llamada de Koto a scrollTo; sin el iframe, se queda en 0).
// Los <video> con póster de Vimeo no se bloquean: no se reproducen, pero muestran el póster.
export async function contexto(nav, ancho, extra = {}) {
  const ctx = await nav.newContext({ ...ANCHOS[ancho], timezoneId: 'America/Santiago', locale: 'es-CL', ...extra });
  await ctx.route(/player\.vimeo\.com\/video\//, r => r.abort());
  return ctx;
}

// Carga con verificación: el proxy a veces devuelve 502 o una hoja con MIME text/plain y Next
// muestra «Application error». Se reintenta hasta que las dos hojas de Koto tengan reglas.
export async function cargar(p, url, intentos = 6) {
  let ultimo = null;
  // también se cuenta cada pedido a /_next/ que falla: si cae un trozo de JS, GSAP no arranca y la
  // página se ve igual pero no anima (pasó: una corrida de la home sin ningún ScrollTrigger).
  const fallas = [];
  // (solo /_next/static/: JS, CSS y letras; las imágenes de /_next/image se cancelan solas al
  // cambiar de srcset y no cuentan como falla)
  const alFallar = (req) => { if (req.url().includes('koto.com/_next/static/')) fallas.push((req.failure() ? req.failure().errorText : '') + ' ' + req.url().slice(-80)); };
  const alResponder = (res) => { if (res.url().includes('koto.com/_next/static/') && res.status() >= 400) fallas.push(res.status() + ' ' + res.url().slice(-80)); };
  p.on('requestfailed', alFallar);
  p.on('response', alResponder);
  for (let i = 1; i <= intentos; i++) {
    fallas.length = 0;
    try {
      const r = await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
      await p.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {});
      await p.evaluate(() => document.fonts.ready);
      await p.waitForTimeout(1800);
      const ok = await p.evaluate(async () => {
        const hojas = [...document.styleSheets].filter(s => s.href && s.href.includes('/_next/static/css/'));
        let reglas = 0; for (const s of hojas) { try { reglas += s.cssRules.length; } catch (e) {} }
        const err = document.body.innerText.includes('Application error');
        // las tres letras de Koto tienen que estar cargadas de verdad (el proxy a veces corta una)
        try { await Promise.all(['11px gtKotoheimMono', '16px gtKotoheim', '300 24px gtKotoheimCondensed'].map(f => document.fonts.load(f))); } catch (e) {}
        const fuentes = [...new Set([...document.fonts].filter(f => f.status === 'loaded').map(f => f.family))];
        return { titulo: document.title, hojas: hojas.length, reglas, err, fuentes, gsap: window.gsapVersions || null };
      });
      ok.fallas = [...fallas];
      const tres = ['gtKotoheimMono', 'gtKotoheim', 'gtKotoheimCondensed'].every(f => ok.fuentes.includes(f));
      if (ok.titulo && !ok.err && ok.hojas >= 2 && ok.reglas > 150 && tres && ok.gsap && ok.fallas.length === 0) { p.off('requestfailed', alFallar); p.off('response', alResponder); return { estado: r && r.status(), intento: i, ...ok }; }
      ultimo = ok;
    } catch (e) { ultimo = { error: String(e).slice(0, 200) }; }
    await p.waitForTimeout(1500 * i);
  }
  throw new Error('no cargó bien ' + url + ' ' + JSON.stringify(ultimo));
}

export async function aceptarCookies(p) {
  const r = await p.evaluate(() => {
    const b = document.querySelector('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll');
    if (b) { b.click(); return 'CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll'; }
    return null;
  });
  await p.waitForTimeout(700);
  return r;
}

// Recorre la página entera en pasos de 0,4 pantallas para que ScrollTrigger dispare lo que
// aparece al entrar, y vuelve arriba sin animación.
export async function recorrer(p, { paso = 0.4, espera = 230, alMedio = null } = {}) {
  const vh = await p.evaluate(() => innerHeight);
  let alto = await p.evaluate(() => document.documentElement.scrollHeight);
  let y = 0;
  while (y < alto) {
    y += Math.round(vh * paso);
    await p.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), y);
    await p.waitForTimeout(espera);
    if (alMedio) await alMedio(y);
    alto = await p.evaluate(() => document.documentElement.scrollHeight);
  }
  await p.waitForTimeout(900);
  await p.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await p.waitForTimeout(1200);
  return { vh, alto };
}

// Selector legible y repetible: desde el ancestro más cercano con id o data-ref-*, por tipo y orden.
export const SEL_FN = `
window.__sel = function (el) {
  if (!el || el.nodeType !== 1) return null;
  const partes = [];
  let e = el;
  for (let n = 0; e && e.nodeType === 1 && n < 7; n++) {
    if (e.id) { partes.unshift('#' + CSS.escape(e.id)); break; }
    const ref = [...e.attributes].find(a => a.name.startsWith('data-ref'));
    if (ref) { partes.unshift('[' + ref.name + ']'); break; }
    if (e === document.body) { partes.unshift('body'); break; }
    const tag = e.tagName.toLowerCase();
    const hermanos = e.parentElement ? [...e.parentElement.children].filter(c => c.tagName === e.tagName) : [];
    partes.unshift(hermanos.length > 1 ? tag + ':nth-of-type(' + (hermanos.indexOf(e) + 1) + ')' : tag);
    e = e.parentElement;
  }
  return partes.join(' > ');
};`;
