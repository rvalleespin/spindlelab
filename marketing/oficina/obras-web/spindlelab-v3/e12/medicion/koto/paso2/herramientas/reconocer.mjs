// E12 · Koto · paso 2 · qué páginas hay: enlaces del encabezado, del menú abierto y del pie en la home,
// y la lista completa de casos de /work con su tipo y año (lo que dice la pieza del índice).
// Uso: node reconocer.mjs <salida.json>
import fs from 'node:fs';
import { abrirNavegador, contexto, cargar, aceptarCookies } from '../../herramientas/comun.mjs';

const [salida] = process.argv.slice(2);
const nav = await abrirNavegador();
const ctx = await contexto(nav, 1440);
const p = await ctx.newPage();
const out = { fecha: new Date().toISOString() };

await cargar(p, 'https://koto.com/');
await aceptarCookies(p);
const enlaces = () => p.evaluate(() => {
  const vistos = new Map();
  for (const a of document.querySelectorAll('a[href]')) {
    const href = a.getAttribute('href');
    if (!href) continue;
    const r = a.getBoundingClientRect();
    const dentro = a.closest('header, nav, footer, [id*=menu], [data-ref*=menu], [data-ref*=footer], [data-ref*=header]');
    const zona = dentro ? (dentro.tagName.toLowerCase() + (dentro.id ? '#' + dentro.id : '') + ([...dentro.attributes].filter(x => x.name.startsWith('data-ref')).map(x => '[' + x.name + ']').join(''))) : 'cuerpo';
    const k = href + '|' + zona;
    if (!vistos.has(k)) vistos.set(k, { href, texto: (a.innerText || a.getAttribute('aria-label') || '').trim().replace(/\s+/g, ' ').slice(0, 60), zona, visible: r.width > 0 && r.height > 0 });
  }
  return [...vistos.values()];
});
out.homeEnlaces = await enlaces();
// el pie: bajar al fondo
await p.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }));
await p.waitForTimeout(1500);
out.homeEnlacesAlFondo = await enlaces();

await cargar(p, 'https://koto.com/work');
await aceptarCookies(p);
out.casos = await p.evaluate(() => {
  const res = [];
  const vistos = new Set();
  for (const a of document.querySelectorAll('#main a[href^="/projects/"], main a[href^="/projects/"]')) {
    const href = a.getAttribute('href');
    if (vistos.has(href)) continue; vistos.add(href);
    res.push({ href, texto: (a.innerText || '').trim().replace(/\s+/g, ' ').slice(0, 120) });
  }
  return res;
});
fs.writeFileSync(salida, JSON.stringify(out, null, 1));
await nav.close();
console.log('ok', out.homeEnlaces.length, out.homeEnlacesAlFondo.length, out.casos.length);
