// E12 · Koto · cómo cuentan los casos: estructura (índice lateral) y si dan cifras, en los 35 casos
// del índice de trabajo. Solo texto: se bloquean imágenes, video y letras para que cargue rápido.
// Uso: node casos.mjs <dir-crudo>   → <dir-crudo>/casos.json
import fs from 'node:fs';
import path from 'node:path';
import { abrirNavegador } from './comun.mjs';

const [dirCrudo] = process.argv.slice(2);
const nav = await abrirNavegador();
const ctx = await nav.newContext({ viewport: { width: 1440, height: 900 } });
await ctx.route(/player\.vimeo\.com|\.(mp4|webm|woff2?|ttf)(\?|$)|\/_next\/image|cdn\.sanity\.io\/images/, r => r.abort());
const p = await ctx.newPage();

async function ir(url) {
  for (let i = 0; i < 4; i++) {
    try {
      await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
      await p.waitForSelector('#project-main, main', { timeout: 15000 });
      await p.waitForTimeout(800);
      const ok = await p.evaluate(() => !document.body.innerText.includes('Application error') && document.title.length > 0);
      if (ok) return true;
    } catch (e) {}
    await p.waitForTimeout(1500 * (i + 1));
  }
  return false;
}

await ir('https://koto.com/work');
const lista = await p.evaluate(() => [...new Set([...document.querySelectorAll('#main a[href^="/projects/"]')].map(a => a.getAttribute('href')))]);
const casos = [];
for (const href of lista) {
  const ok = await ir('https://koto.com' + href);
  if (!ok) { casos.push({ href, error: 'no cargó' }); continue; }
  const c = await p.evaluate(() => {
    const cont = document.querySelector('#project-content') || document.querySelector('#project-main') || document.querySelector('main');
    const texto = cont.innerText.replace(/ /g, ' ');
    const lateral = [...document.querySelectorAll('#project-main a[href^="#"], #project-main button')].map(e => (e.innerText || '').trim()).filter(t => t && t.length < 40 && !/toggle|widget|menu/i.test(t));
    const secciones = [...document.querySelectorAll('[id]')].filter(e => cont.contains(e) && e.id && !/^(project|video|widgets|menu|main)/.test(e.id)).map(e => e.id).slice(0, 20);
    const h = [...cont.querySelectorAll('h1,h2,h3')].map(x => (x.innerText || '').trim()).filter(Boolean).slice(0, 20);
    const ficha = [...document.querySelectorAll('#project-main *')].filter(e => e.children.length === 0 && typeof e.innerText === 'string' && /^[A-Z0-9 ,·&+-]+$/.test(e.innerText.trim()) && e.innerText.trim().length > 2 && getComputedStyle(e).fontFamily.includes('Mono')).map(e => e.innerText.trim()).slice(0, 8);
    const oraciones = texto.split(/(?<=[.!?])\s+|\n+/).map(s => s.trim()).filter(Boolean);
    const conCifra = oraciones.filter(s => /\d/.test(s) && !/^\d{1,2}:\d{2}/.test(s) && !/©|20\d\d—|^\d+$/.test(s));
    const pct = oraciones.filter(s => /\d+(\.\d+)?\s?%/.test(s));
    const mult = oraciones.filter(s => /\b\d+(\.\d+)?x\b|\b\d+(\.\d+)?×/.test(s));
    const plata = oraciones.filter(s => /[$€£]\s?\d|\b\d+(\.\d+)?\s?(million|billion|bn|m)\b/i.test(s));
    const palabrasResultado = oraciones.filter(s => /\b(increase|grew|growth|uplift|result(ed|s)?|impact|boost|engagement|conversion|award|won)\b/i.test(s));
    const cita = [...cont.querySelectorAll('blockquote, [class*=quote]')].map(q => (q.innerText || '').trim().slice(0, 200));
    return { titulo: document.title, palabras: texto.split(/\s+/).length, lateral: [...new Set(lateral)].slice(0, 14), secciones, h, ficha, conCifra: conCifra.slice(0, 14), nConCifra: conCifra.length, pct, mult, plata: plata.slice(0, 6), palabrasResultado: palabrasResultado.slice(0, 6), cita };
  });
  casos.push({ href, ...c });
  console.error('ok', href, c.nConCifra, c.pct.length);
}
await nav.close();
const resumen = {
  casos: casos.length,
  conPorcentaje: casos.filter(c => c.pct && c.pct.length).map(c => c.href),
  conMultiplicador: casos.filter(c => c.mult && c.mult.length).map(c => c.href),
  conCifraDeDinero: casos.filter(c => c.plata && c.plata.length).map(c => c.href),
  conAlgunaCifra: casos.filter(c => c.nConCifra > 0).length,
  estructurasLaterales: Object.entries(casos.reduce((m, c) => { const k = (c.lateral || []).join(' / '); m[k] = (m[k] || 0) + 1; return m; }, {})).sort((a, b) => b[1] - a[1]).slice(0, 12),
};
fs.writeFileSync(path.join(dirCrudo, 'casos.json'), JSON.stringify({ fecha: new Date().toISOString(), resumen, casos }, null, 1));
console.log('ok casos', JSON.stringify(resumen).slice(0, 600));
