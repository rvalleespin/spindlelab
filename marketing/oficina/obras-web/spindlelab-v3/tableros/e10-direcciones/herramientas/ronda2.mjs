// ronda2.mjs — comprobaciones de los arreglos de la ronda 2 de QA que no mide otra herramienta (Lucía, 16-oct-2026).
//   · defecto 6: el chequeo a 360 y 390. Escribe «constructoraandesur.cl» y «ferreteriaroma.cl» en el campo y mide si el
//     dominio se ve entero (scrollWidth del campo ≤ clientWidth) y el ancho útil del campo.
//   · defecto 5: el filete de 1 px que nace del borde (un ::before o ::after de 1 px de alto en ciruela que parte en x ≤ 0):
//     cuántos por página y cuántos a la vista a la vez, a 1440.
//   · defectos 3 y 8: cada marcador, con su largo en palabras, si está en un titular o en una frase de lectura, y si cierra
//     su oración (termina en punto, o lo que sigue dentro del bloque empieza con punto o no hay nada).
// Sirve proto/ en 8770 antes. Uso: node herramientas/ronda2.mjs → img/ronda2.json
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const AQUI = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const REPO = path.resolve(AQUI, '../../../../../..');
const { chromium } = await import(pathToFileURL(path.join(REPO, 'spindlelab-astro/node_modules/playwright/index.mjs')).href);
const BASE = process.env.BASE || 'http://127.0.0.1:8770';
const nav = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const out = { fecha: new Date().toISOString(), chequeo: [], filetes: {}, marcadores: {} };

for (const d of ['taller', 'pizarra']) for (const w of [360, 390, 768]) {
  const pg = await (await nav.newContext({ viewport: { width: w, height: 844 }, reducedMotion: 'reduce' })).newPage();
  await pg.goto(`${BASE}/${d}/home.html`, { waitUntil: 'networkidle' });
  await pg.evaluate(() => document.fonts.ready);
  for (const dom of ['constructoraandesur.cl', 'ferreteriaroma.cl']) {
    await pg.fill('#chq-dominio', dom);
    const r = await pg.evaluate(() => {
      const i = document.getElementById('chq-dominio'), cs = getComputedStyle(i), b = document.getElementById('chq-btn');
      const util = i.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      const ib = i.getBoundingClientRect(), bb = b.getBoundingClientRect();
      return { util: Math.round(util), entero: i.scrollWidth <= i.clientWidth, apilado: bb.top >= ib.bottom - 1, boton_ancho: Math.round(bb.width) };
    });
    out.chequeo.push({ direccion: d, ancho: w, dominio: dom, ...r });
    console.log(`chequeo ${d} ${w} «${dom}»: útil ${r.util} px, ${r.entero ? 'se ve entero' : 'NO SE VE ENTERO'}, ${r.apilado ? 'botón debajo' : 'en fila'}`);
  }
  await pg.close();
}

for (const d of ['taller', 'pizarra']) for (const p of ['home', 'acompanamiento-mensual', 'trabajo']) {
  const pg = await (await nav.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' })).newPage();
  await pg.goto(`${BASE}/${d}/${p}.html`, { waitUntil: 'networkidle' });
  await pg.evaluate(() => document.fonts.ready);
  const r = await pg.evaluate(() => {
    const fil = [];
    for (const el of document.querySelectorAll('main *')) for (const ps of ['::before', '::after']) {
      const cs = getComputedStyle(el, ps);
      if (cs.content === 'none' || cs.height !== '1px' || cs.display === 'none') continue;
      const er = el.getBoundingClientRect();
      // el ::before de bloque arranca en el borde del contenido menos el margen negativo; el ::after absoluto, en su left
      const izq = ps === '::before' ? er.left + parseFloat(cs.marginLeft) : er.left + parseFloat(cs.left);
      if (izq > 1) continue;
      fil.push({ en: `${el.tagName.toLowerCase()}${ps} «${el.textContent.trim().slice(0, 30)}»`, y: Math.round(er.top + scrollY), ancho: cs.width });
    }
    let aLaVez = 0;
    for (const a of fil) aLaVez = Math.max(aLaVez, fil.filter((b) => b.y >= a.y && b.y < a.y + innerHeight).length);
    const mks = [...document.querySelectorAll('.mk')].map((m) => {
      const bloque = m.closest('h1, h2, h3, p, li, dd');
      const r = document.createRange(); r.setStartAfter(m); r.setEnd(bloque, bloque.childNodes.length);
      const despues = r.toString().trim();
      return { texto: m.textContent.trim(), palabras: m.textContent.trim().split(/\s+/).length, en: bloque.tagName.toLowerCase() + '.' + (bloque.className || '').split(' ')[0],
        titular: /^h[1-3]$/i.test(bloque.tagName),
        // cierra su oración: el marcador termina en punto (o lo que sigue empieza con él, o no sigue nada en el bloque)
        cierra_la_frase: /[.!?…]$/.test(m.textContent.trim()) || /^[.!?…]/.test(despues) || despues === '', despues: despues.slice(0, 40) };
    });
    return { filetes: fil, filetes_a_la_vista: aLaVez, marcadores: mks };
  });
  out.filetes[`${d}/${p}`] = { n: r.filetes.length, a_la_vista: r.filetes_a_la_vista, donde: r.filetes };
  out.marcadores[`${d}/${p}`] = r.marcadores;
  console.log(`${d}/${p}: filetes ${r.filetes.length} (a la vista ${r.filetes_a_la_vista}) · ${r.filetes.map((f) => f.en).join(' | ')}`);
  for (const m of r.marcadores) console.log(`   mk «${m.texto}» ${m.palabras} pal. en ${m.en}${m.titular ? ' (titular)' : ''} ${m.cierra_la_frase ? 'cierra su oración' : 'NO CIERRA, sigue: «' + m.despues + '»'}`);
  await pg.close();
}
await nav.close();
fs.writeFileSync(path.join(AQUI, 'img/ronda2.json'), JSON.stringify(out, null, 1));
