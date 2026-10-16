// Librerías y su uso real: versiones expuestas, tweens vivos de GSAP, errores de consola, Webflow,
// Lenis, Finsweet. Uso: node librerias.mjs <salida.json>
import { pathToFileURL } from 'node:url';
import { writeFileSync } from 'node:fs';
const { chromium } = await import(pathToFileURL('/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs').href);
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] });
const R = {};
for (const u of ['https://acceptandproceed.com/', 'https://acceptandproceed.com/work', 'https://acceptandproceed.com/work/ibm-watsonx-orchestrate', 'https://acceptandproceed.com/about']) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  await ctx.route(/player\.vimeo\.com/, (r) => r.abort());
  const page = await ctx.newPage();
  const errores = [];
  page.on('pageerror', (e) => errores.push(String(e.message).slice(0, 160)));
  page.on('console', (m) => { if (m.type() === 'error' && !/vimeo|ERR_FAILED|net::/.test(m.text())) errores.push('console: ' + m.text().slice(0, 160)); });
  await page.goto(u, { waitUntil: 'load', timeout: 90000 });
  await page.waitForTimeout(3000);
  R[u] = { errores, ...(await page.evaluate(() => ({
    gsap: window.gsap ? { version: gsap.version, tweensVivos: gsap.globalTimeline.getChildren(true, true, true).length, plugins: ['CustomEase', 'Observer', 'ScrollTrigger', 'SplitText', 'Flip'].filter((p) => window[p]) } : null,
    lenis: window.Lenis ? { clase: document.documentElement.className, version: (window.lenisVersion || null) } : null,
    webflow: { ix2: !!(window.Webflow && Webflow.require && Webflow.require('ix2')), generador: document.querySelector('meta[name=generator]')?.content || null, sitio: document.documentElement.getAttribute('data-wf-site'), pagina: document.documentElement.getAttribute('data-wf-page') },
    finsweet: [...document.querySelectorAll('[fs-accordion-element],[fs-a11y-element],[fs-cmsfilter-element]')].length,
    tresD: !!window.THREE, framer: !!window.__framer_importFromPackage, barba: !!window.barba, motionOne: !!window.Motion,
    iframesVimeo: document.querySelectorAll('iframe[src*="vimeo"]').length, videosNativos: document.querySelectorAll('video').length,
    pesoRecursos: Math.round(performance.getEntriesByType('resource').reduce((a, r) => a + (r.transferSize || 0), 0) / 1024) + ' KB transferidos (sin Vimeo)',
  }))) };
  await ctx.close();
}
writeFileSync(process.argv[2], JSON.stringify(R, null, 1));
console.log(JSON.stringify(R, null, 1));
await browser.close();
