// Mauro, cierre de la obra E12 (23-oct-2026). Criterio 13 del brief: el texto que ve un lector en la home y en un caso,
// sacado del sitio construido (el dist/ servido en local), no del JSON de Clara. Recorre el DOM en orden, solo lo visible,
// a 1440 × 900 y con el aviso de cookies ya contestado, y escribe una línea por bloque con su papel entre corchetes:
// [TITULAR], [TEXTO], [ENLACE O BOTÓN], [ÍTEM], [PIE], [CAMPO], [IMAGEN: alt] y [VIDEO: nombre]. Las imágenes y los videos
// van por su texto alternativo, que no se ve en la pantalla y se marca así.
// Usa el servidor y el navegador de Javiera (qa-obra/vuelta-2/herramientas/comun.mjs), sin cambiarlos.
// Uso: node criterio13-texto.mjs <salida.txt> [/v3/,/v3/trabajo/praxi/]
import { writeFileSync } from 'node:fs';
import { servir, lanzar } from '../../qa-obra/vuelta-2/herramientas/comun.mjs';

const SALIDA = process.argv[2];
if (!SALIDA) { console.error('falta la salida'); process.exit(2); }
const rutas = (process.argv[3] || '/v3/,/v3/trabajo/praxi/').split(',');

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
