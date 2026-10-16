// QA E12 paso 1, vuelta 1 (Javiera) · vuelve a medir koto.com y acceptandproceed.com en el navegador,
// sin usar las herramientas de Lucía, y deja los valores crudos para compararlos con su medicion.json.
// Uso: node remedir-referentes.mjs <salida.json> <carpeta-capturas>
import { pathToFileURL } from 'node:url';
import fs from 'node:fs';
const { chromium } = await import(pathToFileURL('/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs').href);

const [salida, capturas] = process.argv.slice(2);
const nav = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  proxy: process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY } : undefined,
});
const res = { fecha: new Date().toISOString(), navegador: nav.version(), koto: {}, ap: {} };

async function abrir(url, comprobar, intentos = 6) {
  let ultimo;
  for (let i = 1; i <= intentos; i++) {
    const ctx = await nav.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, timezoneId: 'America/Santiago', locale: 'es-CL' });
    await ctx.route(/player\.vimeo\.com\/video\//, r => r.abort());
    const p = await ctx.newPage();
    try {
      await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
      await p.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {});
      await p.evaluate(() => document.fonts.ready);
      await p.waitForTimeout(2500);
      const ok = await p.evaluate(comprobar);
      if (ok === true) return { ctx, p, intento: i };
      ultimo = ok;
    } catch (e) { ultimo = String(e).slice(0, 200); }
    await ctx.close();
    await new Promise(r => setTimeout(r, 1500 * i));
  }
  throw new Error('no cargó ' + url + ' ' + JSON.stringify(ultimo));
}

const estilo = (sel) => {
  const e = document.querySelector(sel);
  if (!e) return null;
  const s = getComputedStyle(e); const r = e.getBoundingClientRect();
  return { sel, texto: (e.innerText || '').trim().slice(0, 60), familia: s.fontFamily, tam: s.fontSize, peso: s.fontWeight, interlinea: s.lineHeight,
    interletra: s.letterSpacing, color: s.color, fondo: s.backgroundColor, x: Math.round(r.x * 10) / 10, w: Math.round(r.width * 10) / 10,
    transicion: s.transition, padIzq: s.paddingLeft, padDer: s.paddingRight };
};

// ---------- Koto
{
  const { ctx, p, intento } = await abrir('https://koto.com/', () => {
    const f = [...document.fonts].filter(f => f.status === 'loaded').map(f => f.family);
    return (f.includes('gtKotoheimCondensed') && document.querySelector('[data-ref-showreel-title-title]')) ? true : { fuentes: [...new Set(f)] };
  });
  res.koto.intento = intento;
  // aviso de cookies, si aparece
  await p.evaluate(() => { const b = document.querySelector('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll'); if (b) b.click(); });
  await p.waitForTimeout(800);
  res.koto.home = await p.evaluate((estiloSrc) => {
    const estilo = eval(estiloSrc);
    const out = {};
    out.display = estilo('[data-ref-showreel-title-title]');
    out.fondoHtml = getComputedStyle(document.documentElement).backgroundColor;
    out.fondoBody = getComputedStyle(document.body).backgroundColor;
    out.contenedorTitulo = estilo('[data-ref-showreel-title-container] > div');
    // enlace de navegación (Work)
    const work = [...document.querySelectorAll('[data-ref-header-bar-expanded] a p')].find(n => /work/i.test(n.textContent));
    if (work) { const s = getComputedStyle(work); out.navWork = { texto: work.textContent.trim(), transicionPropiedad: s.transitionProperty, duracion: s.transitionDuration, curva: s.transitionTimingFunction, color: s.color, familia: s.fontFamily, tam: s.fontSize }; }
    out.anchoDocumento = document.documentElement.clientWidth;
    return out;
  }, estilo.toString());
  // cursor sobre el showreel: mover el mouse al centro y buscar la etiqueta «PLAY»
  await p.mouse.move(500, 400); await p.waitForTimeout(300);
  await p.mouse.move(720, 420, { steps: 4 }); await p.waitForTimeout(500);
  res.koto.cursor = await p.evaluate(() => {
    const cands = [...document.querySelectorAll('body *')].filter(e => e.children.length <= 2 && /^\s*play\s*$/i.test(e.textContent || ''));
    const out = cands.slice(0, 4).map(e => {
      // la caja con fondo: sube hasta encontrar un fondo con alfa o un backdrop-filter
      let c = e, caja = null;
      for (let i = 0; i < 5 && c; i++, c = c.parentElement) {
        const s = getComputedStyle(c);
        if (s.backdropFilter !== 'none' || (s.backgroundColor !== 'rgba(0, 0, 0, 0)' && s.backgroundColor !== 'transparent')) { caja = { fondo: s.backgroundColor, desenfoque: s.backdropFilter, radio: s.borderRadius, padding: s.padding, posicion: s.position }; break; }
      }
      const s = getComputedStyle(e); const r = e.getBoundingClientRect();
      return { texto: e.textContent.trim(), familia: s.fontFamily, tam: s.fontSize, caja: s.textTransform, rect: [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)], cajaFondo: caja };
    });
    const sobre = document.elementFromPoint(720, 420);
    return { etiquetas: out, cursorSistemaBajoElMouse: sobre ? getComputedStyle(sobre).cursor : null };
  });
  await p.mouse.move(-10, -10);
  await p.screenshot({ path: capturas + '/koto-home-1440-remedido.jpg', type: 'jpeg', quality: 70 });
  await ctx.close();

  // /work: barra lateral y muro
  const w = await abrir('https://koto.com/work', () => {
    const f = [...document.fonts].filter(f => f.status === 'loaded').map(f => f.family);
    return (f.includes('gtKotoheimCondensed') && document.querySelector('[data-ref-sidebar-title]')) ? true : { fuentes: [...new Set(f)] };
  });
  await w.p.evaluate(() => { const b = document.querySelector('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll'); if (b) b.click(); });
  await w.p.waitForTimeout(800);
  res.koto.trabajo = await w.p.evaluate((estiloSrc) => {
    const estilo = eval(estiloSrc);
    const h1 = estilo('[data-ref-sidebar-title] > h1');
    const lado = document.querySelector('[data-ref-sidebar-title]');
    let barra = null;
    if (lado) { let c = lado; for (let i = 0; i < 6 && c; i++, c = c.parentElement) { const r = c.getBoundingClientRect(); if (r.width > 250 && r.width < 400) { barra = { ancho: Math.round(r.width * 10) / 10, x: Math.round(r.x) }; break; } } }
    return { h1, barra, fondoHtml: getComputedStyle(document.documentElement).backgroundColor };
  }, estilo.toString());
  await w.p.screenshot({ path: capturas + '/koto-trabajo-1440-remedido.jpg', type: 'jpeg', quality: 70 });
  await w.ctx.close();
}

// ---------- Accept & Proceed
{
  const { ctx, p, intento } = await abrir('https://acceptandproceed.com/work', () => {
    const f = [...document.fonts].filter(f => f.status === 'loaded').map(f => f.family);
    return (f.some(x => /messina/i.test(x)) && document.querySelector('h1')) ? true : { fuentes: [...new Set(f)] };
  });
  res.ap.intento = intento;
  await p.waitForTimeout(2500); // la carga entra a los 600 ms y dura 1,5 s
  res.ap.trabajo = await p.evaluate((estiloSrc) => {
    const estilo = eval(estiloSrc);
    const out = {};
    out.h1 = estilo('h1');
    out.bajada = estilo('p.h4.text-grey.page-title') || estilo('p.text-grey');
    out.fondoBody = getComputedStyle(document.body).backgroundColor;
    out.fondoHtml = getComputedStyle(document.documentElement).backgroundColor;
    out.contenedor = estilo('div.container.main-grid') || estilo('.container');
    const cc = document.querySelector('.custom-cursor');
    if (cc) { const s = getComputedStyle(cc); const r = cc.getBoundingClientRect(); out.cursorReposo = { tam: Math.round(r.width) + 'x' + Math.round(r.height), fondo: s.backgroundColor, desenfoque: s.backdropFilter, radio: s.borderRadius, transicion: s.transition }; }
    out.cursorSistemaBody = getComputedStyle(document.body).cursor;
    return out;
  }, estilo.toString());
  // pasar sobre la primera tarjeta de proyecto
  const tarjeta = await p.evaluate(() => {
    const a = [...document.querySelectorAll('a[href*="/work/"]')].map(a => ({ a, r: a.getBoundingClientRect() })).find(o => o.r.width > 200 && o.r.height > 150 && o.r.top >= 0 && o.r.bottom <= innerHeight + 400);
    if (!a) return null;
    a.a.scrollIntoView({ block: 'center' });
    const r = a.a.getBoundingClientRect();
    return { href: a.a.getAttribute('href'), x: r.x + r.width / 2, y: r.y + r.height / 3, ccText: a.a.getAttribute('cc-text') };
  });
  await p.waitForTimeout(1200);
  if (tarjeta) {
    const t2 = await p.evaluate((href) => { const a = document.querySelector('a[href="' + href + '"]'); const r = a.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 3 }; }, tarjeta.href);
    await p.mouse.move(t2.x - 200, t2.y - 100); await p.waitForTimeout(300);
    await p.mouse.move(t2.x, t2.y, { steps: 5 }); await p.waitForTimeout(800);
    res.ap.cursorSobreProyecto = await p.evaluate(() => {
      const cc = document.querySelector('.custom-cursor'); if (!cc) return null;
      const s = getComputedStyle(cc); const r = cc.getBoundingClientRect();
      const txt = [...cc.querySelectorAll('*')].map(n => n.textContent.trim()).find(t => t && t.length < 30) || cc.textContent.trim();
      return { clases: cc.className, tam: (Math.round(r.width * 10) / 10) + 'x' + Math.round(r.height), fondo: s.backgroundColor, desenfoque: s.backdropFilter, texto: txt, transicion: s.transition };
    });
    res.ap.tarjeta = tarjeta;
  }
  await p.screenshot({ path: capturas + '/ap-trabajo-1440-remedido.jpg', type: 'jpeg', quality: 70 });
  await ctx.close();
}

await nav.close();
fs.writeFileSync(salida, JSON.stringify(res, null, 1));
console.log(JSON.stringify(res, null, 1));
