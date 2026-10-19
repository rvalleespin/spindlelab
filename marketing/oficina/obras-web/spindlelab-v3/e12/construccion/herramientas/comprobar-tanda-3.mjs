#!/usr/bin/env node
// Lo que una captura no muestra en las seis páginas de caso de A, sobre el build (obra E12, tanda 3). Diego, 19-oct-2026.
//
//   · Señales (senales-obra.md §4): un JSON-LD que parsea, con WebPage, el caso y la BreadcrumbList igual a la miga
//     visible; cero Review, AggregateRating, VideoObject, Offer, Organization, LocalBusiness, MedicalClinic,
//     LegalService, AccountingService. Praxi: su SoftwareApplication sin offers ni url, cero href a praxi.coach, cero
//     «en pausa» y «fuera de línea». Combeau: los id «fotografia» y «modelo»; cero mailto:, tel:, wa.me ni sus medidas
//     en el HTML o en un alt. Conceptos: «Concepto» en el title, la description y el disambiguatingDescription.
//   · En toda página: cero «54 → 94», «36 → 73», «<!--», a[href^="#"]; un solo corchete; un h1.
//   · La ficha mono a la vista sin scroll y sin nada encima a 1440 × 900, 390 × 844 y 360 × 800 (spec §2.3).
//   · El índice de secciones: la sección a la vista se marca (aria-current, el punto de 3 px en su fila) desde 1194, y
//     en la barra flotante bajo 1194; elegir una sección en la barra cierra la lista y lleva a la sección.
//   · La cruz de registro: dos desde 1194, ninguna bajo 1194.
//   · El medio principal: el video del ancho grande desde 834; bajo 834 en los conceptos, la imagen 4:5 y sin pausa.
//   · Los enlaces de la home y del índice a los casos responden y sus fragmentos existen.
//   · Área de toque a 390 con puntero grueso (la herramienta del paso 2).
// Uso: node comprobar-tanda-3.mjs [--salida medidas.json]
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync, writeFileSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { execSync } from 'node:child_process';

const AQUI = dirname(fileURLToPath(import.meta.url));
const REPO = execSync('git rev-parse --show-toplevel', { cwd: AQUI }).toString().trim();
const DIST = join(REPO, 'spindlelab-astro', 'dist');
const { chromium } = await import(pathToFileURL(join(REPO, 'spindlelab-astro/node_modules/playwright/index.mjs')).href);
const AREA = readFileSync(join(REPO, 'marketing/oficina/obras-web/spindlelab-v3/e12/qa-paso-2/vuelta-1/herramientas/area-toque-390.js'), 'utf8');
const i = process.argv.indexOf('--salida');
const SALIDA = i > 0 ? process.argv[i + 1] : null;
const CASOS = ['praxi', 'combeau', 'sesenta', 'ocelo', 'doceavo', 'tonela'];
const CONCEPTOS = ['sesenta', 'ocelo', 'doceavo', 'tonela'];

const TIPOS = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.webp': 'image/webp', '.woff2': 'font/woff2', '.ico': 'image/x-icon', '.mp4': 'video/mp4',
  '.webm': 'video/webm', '.json': 'application/json', '.jpg': 'image/jpeg' };
const servidor = createServer((req, res) => {
  let f = join(DIST, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (existsSync(f) && statSync(f).isDirectory()) f = join(f, 'index.html');
  if (!existsSync(f)) { res.writeHead(404); res.end(); return; }
  const d = readFileSync(f);
  const tipo = TIPOS[extname(f)] || 'application/octet-stream';
  const r = req.headers.range;
  if (r && /^bytes=\d*-\d*$/.test(r)) {
    const [a, b] = r.slice(6).split('-'); const s = a ? +a : 0; const e = b ? +b : d.length - 1;
    res.writeHead(206, { 'Content-Type': tipo, 'Content-Range': `bytes ${s}-${e}/${d.length}`, 'Accept-Ranges': 'bytes', 'Content-Length': e - s + 1 });
    res.end(d.subarray(s, e + 1)); return;
  }
  res.writeHead(200, { 'Content-Type': tipo, 'Content-Length': d.length }); res.end(d);
});
await new Promise((r) => servidor.listen(0, '127.0.0.1', r));
const BASE = `http://127.0.0.1:${servidor.address().port}`;
const nav = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--autoplay-policy=no-user-gesture-required'] });
async function abrir(ruta, w, h, extra = {}) {
  const ctx = await nav.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, ...extra });
  await ctx.addInitScript(() => { try { localStorage.setItem('spindlelab_consent', 'denied'); } catch (e) {} });
  const p = await ctx.newPage();
  const errores = [];
  p.on('pageerror', (e) => errores.push(String(e)));
  p.on('console', (m) => { if (m.type() === 'error') errores.push(m.text()); });
  await p.goto(BASE + ruta, { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  return { ctx, p, errores };
}

const R = { casos: {}, enlaces: {}, fallas: [] };
const falla = (m) => { R.fallas.push(m); };
try {
  for (const caso of CASOS) {
    const ruta = `/v3/trabajo/${caso}/`;
    const html = readFileSync(join(DIST, `v3/trabajo/${caso}/index.html`), 'utf8');
    const C = (R.casos[caso] = {});
    // ---- el HTML servido
    const prohibidos = ['54 → 94', '36 → 73', '<!--', 'href="#', 'en pausa', 'fuera de línea', 'praxi.coach"', 'href="https://praxi.coach'];
    C.prohibidos = prohibidos.filter((x) => html.toLowerCase().includes(x.toLowerCase()));
    if (C.prohibidos.length) falla(`${caso}: ${C.prohibidos.join(', ')}`);
    if (caso === 'combeau') {
      C.contacto = ['mailto:', 'tel:', 'wa.me', 'Hair', 'Eyes', 'estatura', ' cm', 'años'].filter((x) => html.includes(x));
      if (C.contacto.length) falla(`combeau: ${C.contacto.join(', ')}`);
    }
    // ---- JSON-LD
    const bloques = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
    const nodos = bloques.flatMap((b) => b['@graph'] || [b]);
    const tipos = nodos.map((n) => n['@type']).flat();
    C.tipos = tipos;
    const vetados = ['Review', 'AggregateRating', 'VideoObject', 'Offer', 'Organization', 'LocalBusiness', 'MedicalClinic', 'LegalService', 'AccountingService'];
    const deEstaPagina = bloques.slice(1).flatMap((b) => b['@graph'] || [b]);
    const malos = JSON.stringify(deEstaPagina).match(new RegExp(`"(${vetados.join('|')})"`, 'g'));
    if (malos) falla(`${caso}: tipos vetados en su grafo: ${malos}`);
    const ids = nodos.map((n) => n['@id']).filter(Boolean);
    C.idsRepetidos = ids.filter((x, j) => ids.indexOf(x) !== j);
    if (C.idsRepetidos.length) falla(`${caso}: @id repetidos ${C.idsRepetidos}`);
    const bc = nodos.find((n) => n['@type'] === 'BreadcrumbList');
    C.breadcrumb = bc ? bc.itemListElement.map((x) => x.name) : null;
    if (caso === 'praxi') {
      const app = nodos.find((n) => n['@type'] === 'SoftwareApplication');
      C.app = { offers: 'offers' in app, url: 'url' in app, sameAs: 'sameAs' in app };
      if (C.app.offers || C.app.url || C.app.sameAs) falla('praxi: la app con offers, url o sameAs');
    }
    if (CONCEPTOS.includes(caso)) {
      const cw = nodos.find((n) => n['@id'] && n['@id'].endsWith('#caso'));
      const title = html.match(/<title>([^<]*)<\/title>/)[1];
      const desc = html.match(/<meta name="description" content="([^"]*)"/)[1];
      C.concepto = { title: /concepto/i.test(title), description: /concepto/i.test(desc), disamb: /concepto/i.test(cw.disambiguatingDescription || ''), genre: cw.genre };
      if (!C.concepto.title || !C.concepto.description || !C.concepto.disamb) falla(`${caso}: falta «concepto» en las señales`);
    }
    // ---- 1440 × 900
    {
      const { ctx, p, errores } = await abrir(ruta, 1440, 900);
      const v = await p.evaluate(() => {
        const ficha = document.querySelector('.lateral__ficha .rotulo');
        const r = ficha.getBoundingClientRect();
        const enCentro = document.elementFromPoint(r.x + Math.min(r.width, 60) / 2, r.y + r.height / 2);
        const miga = [...document.querySelectorAll('.miga li')].map((li) => li.textContent.replace('·', '').trim());
        return {
          h1: document.querySelectorAll('h1').length,
          corchetes: [...document.querySelectorAll('a')].filter((a) => /^\[/.test(a.textContent.trim())).length,
          ficha: { texto: ficha.textContent, arriba: Math.round(r.top), abajo: Math.round(r.bottom), libre: ficha.contains(enCentro) },
          miga,
          ids: ['fotografia', 'modelo'].filter((x) => document.getElementById(x)),
          cruces: [...document.querySelectorAll('.caso-bloque > .caso-sec')].filter((s) => getComputedStyle(s, '::before').content !== 'none').length,
          siguiente: { href: document.querySelector('.siguiente .medio-enlace').getAttribute('href'), texto: document.querySelector('#h-siguiente').textContent },
          principal: (() => { const vi = document.querySelector('.medio-principal video'); return vi ? vi.currentSrc.split('/').pop() : null; })(),
          lateral: (() => { const l = document.querySelector('.lateral'); const s = getComputedStyle(l); return { posicion: s.position, top: s.top, alto: Math.round(l.getBoundingClientRect().height), desborda: l.scrollHeight > l.clientHeight }; })(),
          barraVisible: getComputedStyle(document.querySelector('.barra')).display !== 'none',
        };
      });
      C.a1440 = v;
      if (v.h1 !== 1) falla(`${caso}: ${v.h1} h1`);
      if (v.corchetes !== 1) falla(`${caso}: ${v.corchetes} corchetes`);
      if (!v.ficha.libre || v.ficha.abajo > 900) falla(`${caso}: la ficha no está a la vista a 1440`);
      if (JSON.stringify(v.miga) !== JSON.stringify(C.breadcrumb)) falla(`${caso}: la miga ${v.miga} no es la BreadcrumbList ${C.breadcrumb}`);
      if (caso === 'combeau' && v.ids.length !== 2) falla('combeau: faltan #fotografia o #modelo');
      if (v.cruces !== 2) falla(`${caso}: ${v.cruces} cruces a 1440`);
      if (v.barraVisible) falla(`${caso}: la barra flotante a 1440`);
      // el índice: llevar «Solución» al 30 % de la ventana y mirar qué se marcó
      await p.evaluate(() => { const s = document.getElementById('solucion'); scrollTo(0, s.getBoundingClientRect().top + scrollY - innerHeight * 0.3); });
      await p.waitForTimeout(700);
      C.indice1440 = await p.evaluate(() => {
        const a = document.querySelector('.lateral__indice a[aria-current]');
        const punto = document.querySelector('.lateral__punto');
        const m = new DOMMatrixReadOnly(getComputedStyle(punto).transform);
        return { activa: a && a.textContent, filaY: a && a.offsetTop, puntoY: Math.round(m.m42), barra: document.querySelector('[data-barra-activa]').textContent };
      });
      if (C.indice1440.activa !== 'Solución' || Math.abs(C.indice1440.filaY - C.indice1440.puntoY) > 1) falla(`${caso}: el índice a 1440 ${JSON.stringify(C.indice1440)}`);
      C.errores1440 = errores;
      if (errores.length) falla(`${caso}: errores a 1440 ${errores}`);
      await ctx.close();
    }
    // ---- 1024 × 768: sin barra lateral, sin cruces, con la barra flotante
    {
      const { ctx, p } = await abrir(ruta, 1024, 768);
      C.a1024 = await p.evaluate(() => ({
        cruces: [...document.querySelectorAll('.caso-bloque > .caso-sec')].filter((s) => getComputedStyle(s, '::before').content !== 'none').length,
        barra: getComputedStyle(document.querySelector('.barra')).display !== 'none',
        indiceLateral: getComputedStyle(document.querySelector('.lateral__indice')).display !== 'none',
        principal: (() => { const r = document.querySelector('.medio-principal .medio').getBoundingClientRect(); return [Math.round(r.width), Math.round(r.height)]; })(),
      }));
      if (C.a1024.cruces !== 0 || !C.a1024.barra || C.a1024.indiceLateral) falla(`${caso}: a 1024 ${JSON.stringify(C.a1024)}`);
      await ctx.close();
    }
    // ---- 390 × 844 y 360 × 800, con puntero grueso
    for (const [w, h] of [[390, 844], [360, 800]]) {
      const { ctx, p, errores } = await abrir(ruta, w, h, { hasTouch: true, isMobile: true });
      const v = await p.evaluate(() => {
        const ficha = document.querySelector('.lateral__ficha .rotulo');
        const r = ficha.getBoundingClientRect();
        const enCentro = document.elementFromPoint(r.x + Math.min(r.width, 60) / 2, r.y + r.height / 2);
        const vi = document.querySelector('.medio-principal video');
        const caja = document.querySelector('.medio-principal .medio').getBoundingClientRect();
        return {
          ficha: { arriba: Math.round(r.top), abajo: Math.round(r.bottom), libre: ficha.contains(enCentro) },
          principal: { caja: [Math.round(caja.x), Math.round(caja.width), Math.round(caja.height)], pausa: !document.querySelector('.medio-principal .pausa').hidden },
          barraArriba: Math.round(document.querySelector('.barra').getBoundingClientRect().top),
          imagenQuieta: (() => { const img = document.querySelector('.medio-principal img'); return img.currentSrc.split('/').pop(); })(),
        };
      });
      await p.waitForTimeout(1500);
      v.videoPrincipal = await p.evaluate(() => { const vi = document.querySelector('.medio-principal video'); return vi.currentSrc.split('/').pop(); });
      if (w === 390) v.area = await p.evaluate(`(() => { ${AREA} })()`);
      C[`a${w}`] = v;
      if (CONCEPTOS.includes(caso) && (!v.ficha.libre || v.ficha.abajo > h)) falla(`${caso}: «Concepto · 2026» no está a la vista a ${w}`);
      if (CONCEPTOS.includes(caso) && (v.principal.pausa || v.videoPrincipal)) falla(`${caso}: video principal bajo 834`);
      if (v.principal.caja[0] !== 0 || Math.abs(v.principal.caja[2] - v.principal.caja[1] * 1.25) > 1) falla(`${caso}: el medio principal no es 4:5 a sangre a ${w}`);
      if (w === 390 && v.area.n) falla(`${caso}: ${v.area.n} controles bajo 44 a 390`);
      if (errores.length) falla(`${caso}: errores a ${w} ${errores}`);
      if (w === 390) {
        // la barra: abrir, elegir «La pieza», que se cierre y lleve ahí
        await p.click('.barra summary'); await p.waitForTimeout(200);
        const abierta = await p.evaluate(() => document.querySelector('.barra details').open);
        await p.click('.barra ul a[href$="#la-pieza"]'); await p.waitForTimeout(800);
        C.barra390 = await p.evaluate((ab) => ({
          abierta: ab, cerradaDespues: !document.querySelector('.barra details').open, hash: location.hash,
          seccionArriba: Math.round(document.getElementById('la-pieza').getBoundingClientRect().top),
          activa: document.querySelector('[data-barra-activa]').textContent,
        }), abierta);
        if (!C.barra390.abierta || !C.barra390.cerradaDespues || C.barra390.hash !== '#la-pieza' || C.barra390.activa !== 'La pieza') falla(`${caso}: la barra ${JSON.stringify(C.barra390)}`);
      }
      await ctx.close();
    }
  }
  // ---- los enlaces de la home y del índice a los casos
  for (const ruta of ['/v3/', '/v3/trabajo/']) {
    const html = readFileSync(join(DIST, ruta.replace(/^\//, ''), 'index.html'), 'utf8');
    const hrefs = [...new Set([...html.matchAll(/href="(\/v3\/trabajo\/[a-z-]+\/[^"]*)"/g)].map((m) => m[1]))];
    R.enlaces[ruta] = [];
    for (const href of hrefs) {
      const [camino, frag] = href.split('#');
      const res = await fetch(BASE + camino);
      const cuerpo = await res.text();
      const fragOk = !frag || new RegExp(`id="${frag}"`).test(cuerpo);
      R.enlaces[ruta].push({ href, estado: res.status, fragmento: frag ? fragOk : null });
      if (res.status !== 200 || !fragOk) falla(`${ruta}: ${href} → ${res.status}${frag ? ` (#${frag} ${fragOk ? 'existe' : 'no existe'})` : ''}`);
    }
  }
} finally {
  await nav.close();
  servidor.close();
}
console.log(JSON.stringify(R, null, 1));
if (SALIDA) writeFileSync(SALIDA, JSON.stringify(R, null, 1) + '\n');
console.error(R.fallas.length ? `\n${R.fallas.length} falla(s):\n  ${R.fallas.join('\n  ')}` : '\nSin fallas.');
process.exit(R.fallas.length ? 1 : 0);
