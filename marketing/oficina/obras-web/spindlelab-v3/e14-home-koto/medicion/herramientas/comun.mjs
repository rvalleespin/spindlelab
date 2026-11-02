import { pathToFileURL } from 'node:url';
const { chromium } = await import(pathToFileURL('/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs').href);
export const ANCHOS = {
  1440: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 },
  390: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
};
export async function abrir(ancho, extra={}) {
  const nav = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome',
    proxy: process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY } : undefined });
  const ctx = await nav.newContext({ ...ANCHOS[ancho], timezoneId: 'America/Santiago', locale: 'es-CL', ...extra });
  await ctx.route(/player\.vimeo\.com\/video\//, r => r.abort());
  const p = await ctx.newPage();
  return { nav, ctx, p };
}
export async function cargarKoto(p, intentos=6) {
  let ult;
  for (let i=1;i<=intentos;i++) {
    try {
      await p.goto('https://koto.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });
      await p.waitForLoadState('networkidle', { timeout: 20000 }).catch(()=>{});
      await p.evaluate(() => document.fonts.ready);
      await p.waitForTimeout(2000);
      const ok = await p.evaluate(() => ({ gsap: window.gsapVersions||null, err: document.body.innerText.includes('Application error'), h: document.documentElement.scrollHeight,
        fuentes:[...new Set([...document.fonts].filter(f=>f.status==='loaded').map(f=>f.family))] }));
      if (ok.gsap && !ok.err && ok.fuentes.includes('gtKotoheimCondensed')) return { intento:i, ...ok };
      ult = ok;
    } catch(e) { ult = String(e).slice(0,200); }
    await p.waitForTimeout(1500*i);
  }
  throw new Error('no cargó '+JSON.stringify(ult));
}
export async function cookies(p) {
  await p.evaluate(() => { const b = document.querySelector('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll'); if (b) b.click(); });
  await p.waitForTimeout(700);
}
