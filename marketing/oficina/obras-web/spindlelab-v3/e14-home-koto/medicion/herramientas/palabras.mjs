import { abrir, cargarKoto, cookies } from './comun.mjs';
const { nav, p } = await abrir(1440);
await cargarKoto(p); await cookies(p);
console.log(JSON.stringify(await p.evaluate(() => {
  // texto visible del flujo (sin capas fijas), contando solo nodos con opacidad efectiva > 0 al final del recorrido
  const fijo = (e) => { for (let x = e; x; x = x.parentElement) { const cs = getComputedStyle(x); if (cs.position === 'fixed' || cs.display === 'none' || cs.visibility === 'hidden') return true; } return false; };
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let total = 0, n; const por = {};
  while ((n = w.nextNode())) { const e = n.parentElement; if (!e || fijo(e) || ['SCRIPT','STYLE','NOSCRIPT'].includes(e.tagName)) continue; const r = e.getBoundingClientRect(); if (!r.width) continue; const k = n.textContent.trim().split(/\s+/).filter(Boolean).length; total += k; const banda = Math.floor((r.top + scrollY) / 900); por[banda] = (por[banda] || 0) + k; }
  const medios = [...document.querySelectorAll('img,video')].filter(m => !fijo(m)).map(m => m.getBoundingClientRect()).filter(r => r.width * r.height > 150 * 150);
  const area = medios.reduce((a, r) => a + r.width * r.height, 0);
  return { palabras: total, porPantalla: por, medios: medios.length, alto: document.documentElement.scrollHeight, areaMediosSobrePagina: +(area / (document.documentElement.scrollHeight * innerWidth)).toFixed(3) };
})));
await nav.close();
