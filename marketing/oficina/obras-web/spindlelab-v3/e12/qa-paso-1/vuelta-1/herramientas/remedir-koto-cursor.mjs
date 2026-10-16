// QA E12 paso 1, vuelta 1 (Javiera) · segunda pasada en Koto: la etiqueta del cursor ([data-ref-cursor])
// sobre el showreel y la barra lateral de /work (ancestros con su ancho).
// Uso: node remedir-koto-cursor.mjs <salida.json> <carpeta-capturas>
import { pathToFileURL } from 'node:url';
import fs from 'node:fs';
const { chromium } = await import(pathToFileURL('/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs').href);
const [salida, capturas] = process.argv.slice(2);
const nav = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', proxy: process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY } : undefined });
const res = { fecha: new Date().toISOString() };

async function abrir(url, listo) {
  for (let i = 1; i <= 6; i++) {
    const ctx = await nav.newContext({ viewport: { width: 1440, height: 900 }, timezoneId: 'America/Santiago', locale: 'es-CL' });
    await ctx.route(/player\.vimeo\.com\/video\//, r => r.abort());
    const p = await ctx.newPage();
    try {
      await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
      await p.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {});
      await p.waitForTimeout(2500);
      if (await p.evaluate(listo)) return { ctx, p, intento: i };
    } catch (e) {}
    await ctx.close(); await new Promise(r => setTimeout(r, 1500 * i));
  }
  throw new Error('no cargó ' + url);
}
const leer = () => {
  const c = document.querySelector('[data-ref-cursor]'); if (!c) return null;
  const caja = c.firstElementChild; const sc = caja ? getComputedStyle(caja) : null; const t = c.querySelector('span');
  const r = c.getBoundingClientRect();
  return { texto: c.innerText.trim(), rect: [r.x, r.y, r.width, r.height].map(v => Math.round(v)), styleInline: c.getAttribute('style'),
    caja: sc && { fondo: sc.backgroundColor, desenfoque: sc.backdropFilter, radio: sc.borderRadius, padding: sc.padding },
    letra: t && { familia: getComputedStyle(t).fontFamily.split(',')[0], tam: getComputedStyle(t).fontSize, caja: getComputedStyle(t).textTransform } };
};
{
  const { ctx, p, intento } = await abrir('https://koto.com/', () => !!document.querySelector('[data-ref-cursor]') && [...document.fonts].some(f => f.status === 'loaded' && f.family === 'gtKotoheimMono'));
  res.intentoHome = intento;
  await p.evaluate(() => { const b = document.querySelector('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll'); if (b) b.click(); });
  await p.waitForTimeout(600);
  await p.mouse.move(300, 300); await p.waitForTimeout(300);
  await p.mouse.move(720, 420, { steps: 8 }); await p.waitForTimeout(700);
  res.cursorShowreel = await p.evaluate(leer);
  res.cursorSistema = await p.evaluate(() => { const e = document.elementFromPoint(720, 420); return e ? getComputedStyle(e).cursor : null; });
  await p.screenshot({ path: capturas + '/koto-cursor-showreel-remedido.jpg', type: 'jpeg', quality: 75, clip: { x: 560, y: 350, width: 320, height: 140 } });
  // salto de 400 px: ¿dónde está la etiqueta en el primer cuadro?
  await p.mouse.move(500, 400); await p.waitForTimeout(600);
  await p.evaluate(() => { window.__s = []; const c = document.querySelector('[data-ref-cursor]'); const t0 = performance.now(); const f = () => { const r = c.getBoundingClientRect(); window.__s.push([Math.round(performance.now() - t0), Math.round(r.x + r.width / 2), Math.round(r.y + r.height / 2)]); if (performance.now() - t0 < 300) requestAnimationFrame(f); }; requestAnimationFrame(f); });
  await p.mouse.move(900, 500); await p.waitForTimeout(500);
  res.seguimiento = await p.evaluate(() => window.__s.slice(0, 6));
  await ctx.close();
}
{
  const { ctx, p } = await abrir('https://koto.com/work', () => !!document.querySelector('[data-ref-sidebar-title]'));
  res.barra = await p.evaluate(() => {
    const out = []; let c = document.querySelector('[data-ref-sidebar-title]');
    for (let i = 0; i < 8 && c; i++, c = c.parentElement) { const r = c.getBoundingClientRect(); const s = getComputedStyle(c); out.push({ tag: c.tagName.toLowerCase(), clase: (c.className || '').toString().slice(0, 90), x: Math.round(r.x), w: Math.round(r.width * 10) / 10, pad: s.paddingLeft + ' ' + s.paddingRight, fondo: s.backgroundColor, pos: s.position }); }
    return out;
  });
  await ctx.close();
}
await nav.close();
fs.writeFileSync(salida, JSON.stringify(res, null, 1));
console.log(JSON.stringify(res, null, 1));
