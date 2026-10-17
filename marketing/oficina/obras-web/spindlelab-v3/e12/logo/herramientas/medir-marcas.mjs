// E12 · logo · cómo resuelven su marca Koto y Accept & Proceed (medido en el navegador, no de memoria).
// Uso: node medir-marcas.mjs <salida.json> <dir-capturas>
// Chromium 141 (/opt/pw-browsers/chromium-1194) con Playwright del repo, por el proxy del entorno.
// Mide, en la home a 1440 (dpr 1) y 390 (dpr 2, como teléfono): el elemento del logo (etiqueta, SVG o
// imagen, caja, color, cuántos trazados), la letra y el tamaño del nav que lo acompaña, la marca con el
// encabezado plegado (Koto) y los favicon que declara cada sitio. Recorta el logo a 4x para mirarlo.
// Las capturas y los favicon bajados son para estudio interno: nada de esto entra al sitio.
import { pathToFileURL } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';
const { chromium } = await import(pathToFileURL('/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs').href);

const [, , SALIDA, CAPT] = process.argv;
if (!SALIDA || !CAPT) { console.error('uso: node medir-marcas.mjs <salida.json> <dir-capturas>'); process.exit(1); }
fs.mkdirSync(CAPT, { recursive: true });

const SITIOS = {
  koto: { url: 'https://koto.com/', logo: 'a[href="/"]:has(svg[viewBox="0 0 52 26"])' },
  ap: { url: 'https://acceptandproceed.com/', logo: 'a.header-logo-link' },
};
const ANCHOS = {
  1440: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 },
  390: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
};

const nav = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  proxy: process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY } : undefined,
});

async function cargar(p, url) {
  for (let i = 1; i <= 5; i++) {
    try {
      await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
      await p.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {});
      await p.evaluate(() => document.fonts.ready);
      await p.waitForTimeout(2000);
      const ok = await p.evaluate(() => !document.body.innerText.includes('Application error') && document.styleSheets.length > 0);
      if (ok) return i;
    } catch (e) { console.error('intento', i, String(e).slice(0, 120)); }
    await p.waitForTimeout(1500 * i);
  }
  throw new Error('no cargó ' + url);
}

// Lee el logo: caja, qué es (SVG con trazados, imagen, texto), su color y la letra del nav vecino.
async function leerLogo(p, sel) {
  return p.evaluate((sel) => {
    const a = document.querySelector(sel);
    if (!a) return { error: 'no está ' + sel };
    const r = a.getBoundingClientRect();
    const svg = a.querySelector('svg');
    const img = a.querySelector('img');
    const out = { selector: sel, caja: { x: +r.x.toFixed(1), y: +r.y.toFixed(1), ancho: +r.width.toFixed(1), alto: +r.height.toFixed(1) } };
    out.contenedores = []; { let e = (svg || img || a).parentElement; let n = 0; while (e && n < 4) { out.contenedores.push({ etiqueta: e.tagName.toLowerCase(), clase: (e.getAttribute('class') || '').slice(0, 220), transform: getComputedStyle(e).transform }); e = e.parentElement; n++; } }
    if (svg) {
      const rs = svg.getBoundingClientRect();
      const trazos = [...svg.querySelectorAll('path,rect,circle,ellipse,polygon,polyline,line')];
      const fills = [...new Set(trazos.map(t => getComputedStyle(t).fill))];
      out.tipo = 'svg';
      out.svg = {
        viewBox: svg.getAttribute('viewBox'),
        ancho: +rs.width.toFixed(1), alto: +rs.height.toFixed(1),
        proporcion: +(rs.width / rs.height).toFixed(3),
        trazados: trazos.length,
        tipos: trazos.map(t => t.tagName.toLowerCase()),
        relleno: fills,
        clase: svg.getAttribute('class'),
        tieneTexto: !!svg.querySelector('text'),
        titulo: (svg.querySelector('title') || {}).textContent || null,
        aria: a.getAttribute('aria-label') || svg.getAttribute('aria-label') || null,
        largoMarcado: svg.outerHTML.length,
      };
    }
    if (img) {
      const ri = img.getBoundingClientRect();
      out.tipo = 'imagen';
      out.imagen = {
        src: img.currentSrc || img.src, natural: [img.naturalWidth, img.naturalHeight],
        ancho: +ri.width.toFixed(1), alto: +ri.height.toFixed(1), proporcion: +(ri.width / ri.height).toFixed(3),
        alt: img.getAttribute('alt'),
      };
    }
    if (!svg && !img) { out.tipo = 'texto'; out.texto = a.textContent.trim(); }
    // El nav que acompaña: el primer enlace visible que no sea el logo, a la misma altura.
    // (Koto no usa <header> ni <nav>: se busca cualquier enlace con texto a la altura del logo, a su derecha)
    const cy = r.top + r.height / 2;
    const enlaces = [...document.querySelectorAll('a')]
      .filter(e => e !== a && !a.contains(e) && e.textContent.trim() && e.getBoundingClientRect().width > 0)
      .filter(e => { const q = e.getBoundingClientRect(); return Math.abs(q.top + q.height / 2 - cy) < 24 && q.left > r.right; })
      .sort((m, n) => m.getBoundingClientRect().left - n.getBoundingClientRect().left);
    const vecino = enlaces[0];
    if (vecino) {
      // la letra que se ve es la del elemento que tiene el texto, no la del enlace
      const tw = document.createTreeWalker(vecino, NodeFilter.SHOW_TEXT, { acceptNode: n => n.textContent.trim() ? 1 : 3 });
      const nodo = tw.nextNode();
      const cs = getComputedStyle(nodo ? nodo.parentElement : vecino);
      const rv = vecino.getBoundingClientRect();
      out.navVecino = {
        texto: vecino.textContent.trim().slice(0, 30), letra: cs.fontFamily.split(',')[0], tamano: cs.fontSize,
        peso: cs.fontWeight, mayusculas: cs.textTransform, interletra: cs.letterSpacing, color: cs.color,
        x: +rv.x.toFixed(1), distanciaDesdeLogo: +(rv.x - (r.x + r.width)).toFixed(1),
      };
      out.altoLogoSobreTamanoNav = +(r.height / parseFloat(cs.fontSize)).toFixed(2);
    }
    out.fondoBajoLogo = (() => {
      let e = a; while (e) { const bg = getComputedStyle(e).backgroundColor; if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') return bg; e = e.parentElement; }
      return getComputedStyle(document.documentElement).backgroundColor;
    })();
    return out;
  }, sel);
}

async function favicons(p) {
  return p.evaluate(() => [...document.querySelectorAll('link[rel*="icon"], link[rel="mask-icon"], meta[name="theme-color"]')]
    .map(l => ({ rel: l.getAttribute('rel') || l.getAttribute('name'), href: l.href || l.getAttribute('content'), sizes: l.getAttribute('sizes'), type: l.getAttribute('type') })));
}

const resultado = { medido: new Date().toISOString(), navegador: 'Chromium 141 (chromium-1194) headless', sitios: {} };
for (const [clave, s] of Object.entries(SITIOS)) {
  resultado.sitios[clave] = { url: s.url, anchos: {} };
  for (const ancho of [1440, 390]) {
    const ctx = await nav.newContext({ ...ANCHOS[ancho], timezoneId: 'America/Santiago', locale: 'es-CL' });
    await ctx.route(/player\.vimeo\.com\/video\//, r => r.abort());
    const p = await ctx.newPage();
    const intento = await cargar(p, s.url);
    // cookies de Koto (Cookiebot): se aceptan para que no tapen el encabezado
    await p.evaluate(() => { const b = document.querySelector('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll'); if (b) b.click(); });
    await p.waitForTimeout(800);
    const reg = { intento, arriba: await leerLogo(p, s.logo) };
    const loc = p.locator(s.logo).first();
    const caja = await loc.boundingBox();
    if (caja) {
      const pad = 12;
      await p.screenshot({ path: path.join(CAPT, `${clave}-logo-${ancho}.png`), clip: { x: Math.max(0, caja.x - pad), y: Math.max(0, caja.y - pad), width: caja.width + pad * 2, height: caja.height + pad * 2 } });
      await p.screenshot({ path: path.join(CAPT, `${clave}-encabezado-${ancho}.png`), clip: { x: 0, y: 0, width: ANCHOS[ancho].viewport.width, height: Math.min(140, ANCHOS[ancho].viewport.height) } });
    }
    // Encabezado plegado: se baja la página y se vuelve a medir.
    await p.mouse.wheel(0, 1600).catch(() => {});
    await p.evaluate(() => window.scrollBy(0, 1600));
    await p.waitForTimeout(1500);
    reg.plegado = await leerLogo(p, s.logo);
    const caja2 = await p.locator(s.logo).first().boundingBox().catch(() => null);
    if (caja2) await p.screenshot({ path: path.join(CAPT, `${clave}-encabezado-plegado-${ancho}.png`), clip: { x: 0, y: 0, width: ANCHOS[ancho].viewport.width, height: Math.min(140, ANCHOS[ancho].viewport.height) } });
    if (ancho === 1440) {
      reg.favicon = await favicons(p);
      // el logo a 4x, para mirar su construcción
      await p.evaluate(() => window.scrollTo(0, 0));
      await p.waitForTimeout(1200);
      const ctx4 = await nav.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 4 });
      await ctx4.route(/player\.vimeo\.com\/video\//, r => r.abort());
      const p4 = await ctx4.newPage();
      await cargar(p4, s.url);
      await p4.evaluate(() => { const b = document.querySelector('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll'); if (b) b.click(); });
      await p4.waitForTimeout(800);
      const c4 = await p4.locator(`${s.logo} svg, ${s.logo} img`).first().boundingBox();
      if (c4) await p4.screenshot({ path: path.join(CAPT, `${clave}-logo-4x.png`), clip: { x: c4.x - 4, y: c4.y - 4, width: c4.width + 8, height: c4.height + 8 } });
      // los favicon declarados, bajados para mirarlos
      reg.faviconBajado = [];
      for (const f of reg.favicon.filter(f => f.href && /^https?:/.test(f.href)).slice(0, 6)) {
        try {
          const r = await ctx4.request.get(f.href, { timeout: 30000 });
          const ext = (f.href.split('?')[0].match(/\.(png|ico|svg|jpg|webp)$/i) || [, 'bin'])[1].toLowerCase();
          const nombre = `${clave}-favicon-${(f.sizes || f.rel || 'x').replace(/\W+/g, '-')}.${ext}`;
          const cuerpo = await r.body();
          fs.writeFileSync(path.join(CAPT, nombre), cuerpo);
          reg.faviconBajado.push({ href: f.href, estado: r.status(), tipo: r.headers()['content-type'], bytes: cuerpo.length, archivo: nombre });
        } catch (e) { reg.faviconBajado.push({ href: f.href, error: String(e).slice(0, 120) }); }
      }
      await ctx4.close();
    }
    resultado.sitios[clave].anchos[ancho] = reg;
    await ctx.close();
    console.error('ok', clave, ancho);
  }
}
await nav.close();
fs.writeFileSync(SALIDA, JSON.stringify(resultado, null, 2));
console.log('escrito', SALIDA);
