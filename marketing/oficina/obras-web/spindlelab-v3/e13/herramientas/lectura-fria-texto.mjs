// Lectura en frío de la obra E13 (brief §7, criterio 4): el texto que ve un lector en el sitio CONSTRUIDO, no en el JSON de Clara.
// Misma extracción que e12/cierre/herramientas/criterio13-texto.mjs (recorre el DOM en orden, solo lo visible, a 1440 × 900 y con
// el aviso de cookies ya contestado; una línea por bloque con su papel entre corchetes), pero autónoma: sirve el dist/ ella misma.
//
// Uso: node lectura-fria-texto.mjs <dist> <carpeta-con-node_modules> <salida.txt> [/,/servicios/]
//   <carpeta-con-node_modules>: una copia de spindlelab-astro/ que tenga node_modules (el build del scratchpad); ahí se resuelve playwright.
import { writeFileSync, existsSync, createReadStream, statSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join, extname } from 'node:path';
import http from 'node:http';

const [DIST, ASTRO, SALIDA, RUTAS] = process.argv.slice(2);
if (!DIST || !ASTRO || !SALIDA) { console.error('Uso: lectura-fria-texto.mjs <dist> <carpeta-con-node_modules> <salida.txt> [rutas]'); process.exit(2); }
const { chromium } = createRequire(join(ASTRO, 'package.json'))('playwright');
const rutas = (RUTAS || '/').split(',');
const TIPOS = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.woff2': 'font/woff2', '.mp4': 'video/mp4', '.webm': 'video/webm' };
const servir = () => new Promise((ok) => {
  const s = http.createServer((req, res) => {
    let f = join(DIST, decodeURIComponent(new URL(req.url, 'http://x').pathname));
    if (existsSync(f) && statSync(f).isDirectory()) f = join(f, 'index.html');
    if (!existsSync(f)) { res.writeHead(404).end('no'); return; }
    res.writeHead(200, { 'content-type': TIPOS[extname(f)] ?? 'application/octet-stream' });
    createReadStream(f).pipe(res);
  });
  s.listen(0, () => ok({ url: `http://127.0.0.1:${s.address().port}`, cerrar: () => new Promise((r) => s.close(r)) }));
});
const lanzar = () => chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });

const srv = await servir();
const nav = await lanzar();
const partes = [];
for (const ruta of rutas) {
  const ctx = await nav.newContext({ viewport: { width: 1440, height: 900 } });
  await ctx.addInitScript(() => { try { localStorage.setItem('spindlelab_consent', 'denied'); } catch (e) {} });
  const p = await ctx.newPage();
  await p.goto(srv.url + ruta, { waitUntil: 'networkidle' });
  await p.waitForTimeout(800);
  const lineas = await p.evaluate(() => {
    const visible = (el) => {
      if (!el || el.nodeType !== 1) return false;
      if (el.closest('#cookie-banner, #cookie-aviso, [hidden]')) return false;
      const cs = getComputedStyle(el);
      if (cs.visibility === 'hidden' || cs.display === 'none') return false;
      return el.getClientRects().length > 0;
    };
    const BLOQUE = 'h1,h2,h3,h4,h5,h6,p,li,dt,dd,figcaption,button,label,summary,td,th,blockquote';
    const papel = (el) => {
      const t = el.tagName.toLowerCase();
      if (/^h[1-6]$/.test(t)) return 'TITULAR';
      if (t === 'figcaption') return 'PIE';
      if (t === 'label') return 'CAMPO';
      if (t === 'li') return el.querySelector('a') ? 'ENLACE O BOTÓN' : 'ÍTEM';
      if (t === 'a' || t === 'button' || t === 'summary') return 'ENLACE O BOTÓN';
      return 'TEXTO';
    };
    const out = [];
    const vistos = new Set();
    const w = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
    let n;
    while ((n = w.nextNode())) {
      if (n.nodeType === 1) {
        const t = n.tagName.toLowerCase();
        if ((t === 'img' || t === 'video') && visible(n)) {
          const alt = t === 'img' ? n.getAttribute('alt') : (n.getAttribute('aria-label') || n.getAttribute('title'));
          if (alt) out.push(`[${t === 'img' ? 'IMAGEN' : 'VIDEO'}: ${alt.trim()}]`);
        }
        if (n.matches('input[placeholder], textarea[placeholder]') && visible(n)) out.push(`[CAMPO, dice adentro] ${n.getAttribute('placeholder')}`);
        continue;
      }
      const txt = n.textContent.replace(/\s+/g, ' ').trim();
      if (!txt) continue;
      const padre = n.parentElement;
      if (!visible(padre) || padre.closest('script,style,noscript,template,svg')) continue;
      let cont = padre.closest(BLOQUE) || padre.closest('a') || padre;
      while (cont !== document.body && getComputedStyle(cont).display.startsWith('inline') && !cont.matches('a,button,label')) cont = cont.parentElement;
      if (vistos.has(cont)) continue;
      vistos.add(cont);
      const texto = (cont.innerText || '').replace(/\s*\n\s*/g, ' · ').replace(/\s+/g, ' ').trim();
      if (texto) out.push(`[${papel(cont)}] ${texto}`);
    }
    return out;
  });
  partes.push(`=== PÁGINA ${ruta} ===\n${lineas.join('\n')}`);
  await ctx.close();
}
await nav.close();
await srv.cerrar();
writeFileSync(SALIDA, partes.join('\n\n') + '\n');
console.log(`${SALIDA}: ${partes.map((x) => x.split('\n').length).join(' + ')} líneas`);
process.exit(0);
