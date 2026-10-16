// Primer reconocimiento de acceptandproceed.com: carga la home, lista scripts, globals de librerías,
// enlaces de navegación y @font-face. Uso: node explorar.mjs [url]
import { pathToFileURL } from 'node:url';
const { chromium } = await import(pathToFileURL('/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs').href);
const url = process.argv[2] || 'https://acceptandproceed.com/';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
const reqs = [];
page.on('response', (r) => reqs.push({ url: r.url(), status: r.status(), type: r.request().resourceType() }));
const resp = await page.goto(url, { waitUntil: 'networkidle', timeout: 90000 }).catch((e) => ({ err: String(e) }));
console.log('status', resp?.status?.(), resp?.err || '');
await page.waitForTimeout(3000);
const info = await page.evaluate(() => {
  const scripts = [...document.scripts].map((s) => s.src || ('inline:' + s.textContent.slice(0, 120).replace(/\s+/g, ' ')));
  const globals = ['gsap', 'ScrollTrigger', 'Lenis', 'lenis', 'barba', 'Barba', 'THREE', 'Swup', 'swup', 'Motion', 'framerMotion', '__NEXT_DATA__', '__NUXT__', 'Webflow', 'jQuery', '$', 'LocomotiveScroll', 'Highway', 'Taxi', 'Alpine', 'Vue', 'React', 'Splitting', 'SplitText', 'Flip', '__remixContext', '__sveltekit', 'Shopify', 'wp']
    .filter((g) => { try { return typeof window[g] !== 'undefined'; } catch { return false; } });
  const nav = [...document.querySelectorAll('a')].map((a) => ({ t: a.textContent.trim().replace(/\s+/g, ' ').slice(0, 60), h: a.getAttribute('href') })).slice(0, 80);
  const fonts = [];
  for (const ss of document.styleSheets) { try { for (const r of ss.cssRules) if (r.constructor.name === 'CSSFontFaceRule') fonts.push(r.cssText.slice(0, 300)); } catch (e) { fonts.push('noaccess:' + ss.href); } }
  const docFonts = [...document.fonts].map((f) => `${f.family} ${f.weight} ${f.style} ${f.status}`);
  return { title: document.title, gen: document.querySelector('meta[name=generator]')?.content, html: document.documentElement.className, body: document.body.className, h: document.documentElement.scrollHeight, scripts, globals, nav, fonts, docFonts, stylesheets: [...document.styleSheets].map((s) => s.href) };
});
console.log(JSON.stringify(info, null, 1));
console.log('fonts/js reqs:', JSON.stringify(reqs.filter((r) => /font|script|stylesheet/.test(r.type) || /\.(woff2?|ttf|otf)/.test(r.url)).map((r) => r.status + ' ' + r.type + ' ' + r.url), null, 1));
await page.screenshot({ path: process.argv[3] || '/tmp/claude-0/ap-explorar.jpg', type: 'jpeg', quality: 70 });
await browser.close();
