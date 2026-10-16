// E12 · Koto · qué librerías de movimiento viajan en los scripts.
// Abre cada página, junta las URL de los chunks JS cargados y busca firmas de librerías
// en su texto (dentro del navegador, con fetch del mismo origen). No guarda el código:
// solo cuenta coincidencias y saca un fragmento corto de contexto para poder citarlas.
// Uso: node librerias.mjs <salida.json> <url> [url...]
import { pathToFileURL } from 'node:url';
import fs from 'node:fs';
const { chromium } = await import(pathToFileURL('/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs').href);

const [salida, ...urls] = process.argv.slice(2);
const nav = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  proxy: process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY } : undefined,
});
const FIRMAS = {
  gsap: [/gsap\.(to|from|timeline|registerPlugin)\b/g, /GreenSock/g, /_gsap\b/g],
  ScrollTrigger: [/ScrollTrigger/g],
  SplitText: [/SplitText/g],
  'GSAP CustomEase': [/registerPlugin\(CustomEase\)|CustomEase/g],
  'GSAP Observer': [/registerPlugin\(Observer\)/g],
  'GSAP Draggable': [/registerPlugin\(Draggable\)/g],
  'GSAP InertiaPlugin': [/InertiaPlugin/g],
  'GSAP Flip': [/registerPlugin\(Flip\)/g],
  'GSAP ScrollToPlugin': [/ScrollToPlugin/g],
  'GSAP ScrollSmoother': [/ScrollSmoother/g],
  'next.js': [/__next_f|next\/dist|_next\/static/g],
  'react': [/react\.production|__reactFiber|react-dom/g],
  lenis: [/lenis/gi],
  'framer-motion / motion': [/framer-motion/g, /useMotionValue|useSpring|useScroll|AnimatePresence|motionValue/g, /MotionConfig|LazyMotion/g],
  'motion (springs)': [/stiffness/g, /damping/g],
  barba: [/barba/gi],
  swup: [/swup/gi],
  three: [/WebGLRenderer|THREE\.|three\.module/g],
  ogl: [/\bogl\b|new Renderer\(\{.*dpr/g],
  locomotive: [/locomotive/gi],
  'requestAnimationFrame': [/requestAnimationFrame/g],
  'matchMedia reduced-motion': [/prefers-reduced-motion/g],
  'View Transitions API': [/startViewTransition/g],
  'lottie': [/lottie|bodymovin/gi],
  'vimeo player': [/@vimeo\/player|player\.vimeo\.com/g],
  'cubic-bezier en JS': [/cubic-bezier\([^)]*\)/g],
  'easings con nombre': [/power[1-4]\.(in|out|inOut)|expo\.(in|out|inOut)|circ\.(in|out|inOut)|easeOutExpo|easeInOutCubic/g],
  'useGSAP': [/useGSAP/g],
  'tempus': [/tempus/gi],
  'hamo': [/\bhamo\b/g],
};
const res = {};
for (const url of urls) {
  const ctx = await nav.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  const js = new Set();
  p.on('response', r => { if (r.request().resourceType() === 'script' && r.url().includes('/_next/')) js.add(r.url()); });
  await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await p.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {});
  await p.waitForTimeout(2000);
  const lista = [...js];
  const r = await p.evaluate(async ({ lista, firmas }) => {
    const out = { chunks: lista.length, bytes: 0, firmas: {} };
    for (const u of lista) {
      let t = '';
      try { t = await (await fetch(u)).text(); } catch (e) { continue; }
      out.bytes += t.length;
      for (const [lib, pats] of Object.entries(firmas)) {
        for (const src of pats) {
          const re = new RegExp(src[0], src[1]);
          let m, n = 0; const ej = [];
          while ((m = re.exec(t)) && n < 400) { n++; if (ej.length < 3) ej.push(t.slice(Math.max(0, m.index - 70), m.index + 90).replace(/\s+/g, ' ')); }
          if (n) { out.firmas[lib] = out.firmas[lib] || []; out.firmas[lib].push({ patron: src[0], n, chunk: u.split('/').pop().split('?')[0], ejemplos: ej }); }
        }
      }
    }
    return out;
  }, { lista, firmas: Object.fromEntries(Object.entries(FIRMAS).map(([k, v]) => [k, v.map(re => [re.source, re.flags])])) });
  res[url] = r;
  await ctx.close();
  console.error('ok', url, r.chunks, 'chunks', Math.round(r.bytes / 1024), 'KB');
}
await nav.close();
fs.writeFileSync(salida, JSON.stringify(res, null, 1));
