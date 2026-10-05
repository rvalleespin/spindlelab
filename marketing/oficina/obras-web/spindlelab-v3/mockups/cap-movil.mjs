import { chromium } from 'playwright';
const OUT = process.argv[2];
const sitios = [
  ['combeau-fotografia', 'https://bernardocombeau.cl/'],
  ['combeau-modelo', 'https://bernardocombeau.cl/modelo/'],
  ['verifica-y-cumple', 'https://verificaycumple.pages.dev/'],
  ['raigal', 'file:///home/user/spindlelab/marketing/portafolio/01-raigal/sitio/index.html'],
];
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
for (const [slug, url] of sitios) {
  for (const [vn, w, h, dpr, mob] of [['cel', 390, 844, 3, true], ['esc', 1440, 900, 2, false]]) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: dpr, isMobile: mob, hasTouch: mob, reducedMotion: 'reduce' });
    const p = await ctx.newPage();
    try {
      await p.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
    } catch (e) { console.log('timeout', slug, vn); }
    await p.evaluate(() => document.fonts && document.fonts.ready);
    await p.waitForTimeout(1800);
    const banners = await p.evaluate(() => [...document.querySelectorAll('[id*=cookie i],[class*=cookie i],[id*=consent i],[class*=consent i]')].filter(e => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0; }).map(e => e.id || e.className).slice(0, 4));
    await p.screenshot({ path: `${OUT}/${slug}-${vn}.png` });
    console.log(slug, vn, p.url(), JSON.stringify(banners));
    await ctx.close();
  }
}
await b.close();
