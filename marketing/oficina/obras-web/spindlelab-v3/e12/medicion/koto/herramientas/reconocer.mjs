// E12 · Koto · reconocimiento: navegación real, scripts, globals, @font-face y hojas.
// Uso: node reconocer.mjs <url> <salida.json>
// No descarga ni guarda recursos de Koto: solo lee el DOM y las hojas en el navegador.
import { pathToFileURL } from 'node:url';
import fs from 'node:fs';
const { chromium } = await import(pathToFileURL('/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs').href);

const url = process.argv[2] || 'https://koto.com/';
const salida = process.argv[3] || 'reconocer.json';
const nav = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  proxy: process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY } : undefined,
});
const ctx = await nav.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
const red = [];
p.on('response', r => { const t = r.request().resourceType(); if (['script', 'stylesheet', 'font', 'document', 'fetch', 'xhr'].includes(t)) red.push({ t, url: r.url().slice(0, 200), status: r.status() }); });
const consola = [];
p.on('console', m => consola.push(m.type() + ': ' + m.text().slice(0, 200)));
const r = await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
await p.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {});
await p.waitForTimeout(2500);
const datos = await p.evaluate(() => {
  const base = new Set(Object.getOwnPropertyNames(window));
  const globs = Object.keys(window).filter(k => !/^(on|webkit)/.test(k)).slice(0, 400);
  const libs = {};
  for (const k of ['gsap', 'ScrollTrigger', 'Lenis', 'lenis', 'Barba', 'barba', 'Swup', 'swup', 'THREE', 'Motion', 'motion', 'framerMotion', '__NEXT_DATA__', '__NUXT__', '__next_f', 'Webflow', 'Shopify', 'Squarespace', 'jQuery', '$', 'React', 'ReactDOM', 'Vue', '__VUE__', 'Alpine', 'Swiper', 'Splide', 'LocomotiveScroll', 'Highway', 'Taxi', 'SplitText', 'Flip', 'PIXI', 'p5', 'anime', 'ScrollSmoother', '__remixContext', '__sveltekit', '___gatsby', 'Sanity', 'prismic']) {
    try { if (window[k] !== undefined) libs[k] = typeof window[k] === 'object' || typeof window[k] === 'function' ? (window[k].version || window[k].VERSION || typeof window[k]) : String(window[k]).slice(0, 80); } catch (e) { libs[k] = 'error'; }
  }
  const scripts = [...document.scripts].map(s => ({ src: s.src || null, type: s.type || null, inline: s.src ? null : s.textContent.slice(0, 160) }));
  const hojas = [];
  const fontFaces = [];
  for (const sh of document.styleSheets) {
    let reglas = null;
    try { reglas = sh.cssRules; } catch (e) { hojas.push({ href: sh.href, error: 'cors' }); continue; }
    hojas.push({ href: sh.href, reglas: reglas.length });
    for (const rl of reglas) if (rl.type === CSSRule.FONT_FACE_RULE) fontFaces.push({ hoja: sh.href, family: rl.style.getPropertyValue('font-family'), src: rl.style.getPropertyValue('src').slice(0, 300), weight: rl.style.getPropertyValue('font-weight'), style: rl.style.getPropertyValue('font-style'), display: rl.style.getPropertyValue('font-display') });
  }
  const fuentes = [...document.fonts].map(f => ({ family: f.family, weight: f.weight, style: f.style, status: f.status }));
  // variables de :root (los tokens de Tailwind v4 de Koto)
  const variables = {};
  for (const sh of document.styleSheets) {
    let rs; try { rs = sh.cssRules; } catch (e) { continue; }
    const walk = (rules) => { for (const r of rules) { if (r.cssRules && !r.selectorText) walk(r.cssRules); if (r.style && r.selectorText && /:root|:host|^html/.test(r.selectorText)) { for (const k of r.style) if (k.startsWith('--') && !k.startsWith('--tw-')) variables[k] = r.style.getPropertyValue(k).trim(); } } };
    walk(rs);
  }
  const enlaces = [...document.querySelectorAll('a[href]')].map(a => ({ txt: a.textContent.trim().replace(/\s+/g, ' ').slice(0, 60), href: a.href, enNav: !!a.closest('nav,header'), visible: a.getBoundingClientRect().width > 0 }));
  const metas = [...document.querySelectorAll('meta')].map(m => ({ n: m.name || m.getAttribute('property'), c: (m.content || '').slice(0, 160) })).filter(m => m.n);
  const gen = document.querySelector('meta[name=generator]');
  return {
    title: document.title, lang: document.documentElement.lang, generator: gen && gen.content,
    htmlClass: document.documentElement.className.slice(0, 300), bodyClass: document.body.className.slice(0, 300),
    libs, gsapVersions: window.gsapVersions || null, globs, scripts, hojas, fontFaces, fuentes, variables, enlaces, metas,
    alto: document.documentElement.scrollHeight,
    dataAttrs: [...new Set([...document.querySelectorAll('*')].flatMap(e => [...e.attributes].map(a => a.name).filter(n => n.startsWith('data-'))))].slice(0, 120),
  };
});
fs.writeFileSync(salida, JSON.stringify({ url, status: r && r.status(), finalUrl: p.url(), ...datos, red, consola: consola.slice(0, 50) }, null, 1));
await p.screenshot({ path: salida.replace(/\.json$/, '.png') });
await nav.close();
console.log('ok', salida);
