#!/usr/bin/env node
// Lo que una captura no muestra en /v3/servicios/, Desarrollo web y los cinco servicios, sobre el build (obra E12,
// tanda 4). Diego, 19-oct-2026.
//
//   · Señales (senales-obra.md §1.2, §1.5, §2.7 y §4): un JSON-LD que parsea, sin @id repetidos ni Review,
//     AggregateRating o VideoObject; la BreadcrumbList igual a la miga visible; la FAQPage con las mismas preguntas que
//     se ven; la description del Service igual a la de la página; title ≤ 60 y description de 120 a 160; noindex; la
//     imagen al compartir existe, mide 1200 × 630, es JPEG, pesa ≤ 200 kB y su alt empieza con «SpindleLab: ».
//   · Precios (brief §6.4, spec §6.9): cada monto a la vista, en el title, la description o una Offer del grafo está,
//     como texto, en oferta-v3.json o servicios-v3.json.
//   · En toda página: cero «54 → 94», «36 → 73», «<!--», a[href^="#"], «IA propietaria», «modelos RAG», «despliegue de
//     modelos», praxi.coach, «en pausa», «fuera de línea»; un h1; a lo más un corchete.
//   · La plantilla (spec §2.4): a 1440 el h2 de cada sección en c1–c4 y pegajoso a 88; el contenido desde c5 (x = 370),
//     hasta c12 (1070) o c16 (1424); a 1024 el h2 arriba y sin pegarse. La franja: 2,39 desde 834 y 16:9 bajo 834,
//     dentro de los márgenes, radio 6, con la imagen nítida desde 834 (la de 1920) y la de la spec bajo 834.
//   · Desarrollo web: las fases (sin movimiento reducido, la del medio de la ventana en blanco y las otras en gris; con
//     movimiento reducido, todas en blanco); las tres piezas con el círculo del cursor («Ver el caso», «Ver el concepto»).
//   · Los enlaces internos de las siete responden 200 y sus fragmentos existen.
//   · Área de toque a 390 con puntero grueso (la herramienta del paso 2); cero errores de consola.
// Uso: node comprobar-tanda-4.mjs [--salida medidas.json]
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync, writeFileSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { execSync } from 'node:child_process';

const AQUI = dirname(fileURLToPath(import.meta.url));
const REPO = execSync('git rev-parse --show-toplevel', { cwd: AQUI }).toString().trim();
const ASTRO = join(REPO, 'spindlelab-astro');
const DIST = join(ASTRO, 'dist');
const { chromium } = await import(pathToFileURL(join(ASTRO, 'node_modules/playwright/index.mjs')).href);
const AREA = readFileSync(join(REPO, 'marketing/oficina/obras-web/spindlelab-v3/e12/qa-paso-2/vuelta-1/herramientas/area-toque-390.js'), 'utf8');
const i = process.argv.indexOf('--salida');
const SALIDA = i > 0 ? process.argv[i + 1] : null;
const SLUGS = ['desarrollo-web', 'visibilidad-en-ia', 'auditoria-seo-tecnica', 'acompanamiento-mensual', 'redes-sociales', 'paid-media'];
const RUTAS = ['/v3/servicios/', ...SLUGS.map((s) => `/v3/servicios/${s}/`)];
// Auditoría SEO técnica salió de esta lista el 23-oct: ya no lleva franja (spec §2.4; acta de la obra, vuelta 1, defecto 3)
const CON_FRANJA = { 'desarrollo-web': 'combeau-fotografia-169', 'visibilidad-en-ia': 'chequeo-239' };

// Los montos de los JSON, como texto
const montos = (t) => t.match(/\$\d{1,3}(?:\.\d{3})*(?:\/mes)?/g) || [];
const DATO = readFileSync(join(ASTRO, 'src/data/oferta-v3.json'), 'utf8') + readFileSync(join(ASTRO, 'src/data/servicios-v3.json'), 'utf8');
const MONTOS = new Set(montos(DATO));
const NUMEROS = new Set([...MONTOS].map((m) => Number(m.replace(/[$.]|\/mes/g, ''))));

const TIPOS = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.webp': 'image/webp', '.woff2': 'font/woff2', '.ico': 'image/x-icon', '.mp4': 'video/mp4',
  '.webm': 'video/webm', '.json': 'application/json', '.jpg': 'image/jpeg' };
const servidor = createServer((req, res) => {
  let f = join(DIST, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (existsSync(f) && statSync(f).isDirectory()) f = join(f, 'index.html');
  if (!existsSync(f)) { res.writeHead(404); res.end(); return; }
  const d = readFileSync(f);
  res.writeHead(200, { 'Content-Type': TIPOS[extname(f)] || 'application/octet-stream', 'Content-Length': d.length }); res.end(d);
});
await new Promise((r) => servidor.listen(0, '127.0.0.1', r));
const BASE = `http://127.0.0.1:${servidor.address().port}`;
const nav = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
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
const tamanoJpeg = (f) => {
  const b = readFileSync(f);
  for (let k = 2; k < b.length;) {
    const m = b[k + 1]; const largo = b.readUInt16BE(k + 2);
    if (m >= 0xc0 && m <= 0xc3) return [b.readUInt16BE(k + 7), b.readUInt16BE(k + 5)];
    k += 2 + largo;
  }
  return null;
};

const R = { paginas: {}, fallas: [] };
const falla = (m) => R.fallas.push(m);
try {
  for (const ruta of RUTAS) {
    const slug = ruta.split('/').filter(Boolean).pop();
    const html = readFileSync(join(DIST, ruta.replace(/^\//, ''), 'index.html'), 'utf8');
    const P = (R.paginas[ruta] = {});
    // ---- el HTML servido
    const prohibidos = ['54 → 94', '36 → 73', '<!--', 'href="#', 'IA propietaria', 'modelos RAG', 'despliegue de modelos', 'praxi.coach', 'en pausa', 'fuera de línea'];
    P.prohibidos = prohibidos.filter((x) => html.toLowerCase().includes(x.toLowerCase()));
    if (P.prohibidos.length) falla(`${ruta}: ${P.prohibidos.join(', ')}`);
    const title = html.match(/<title>([^<]*)<\/title>/)[1].replace(/&amp;/g, '&');
    const desc = html.match(/<meta name="description" content="([^"]*)"/)[1].replace(/&amp;/g, '&');
    P.largos = [title.length, desc.length];
    if (title.length > 60 || desc.length < 120 || desc.length > 160) falla(`${ruta}: title ${title.length} o description ${desc.length}`);
    if (!/<meta name="robots" content="noindex, nofollow"/.test(html)) falla(`${ruta}: sin noindex`);
    const og = html.match(/<meta property="og:image" content="([^"]*)"/)[1];
    const ogAlt = html.match(/<meta property="og:image:alt" content="([^"]*)"/)[1];
    const ogArchivo = join(DIST, new URL(og).pathname);
    P.og = { og, alt: ogAlt, existe: existsSync(ogArchivo) };
    if (!P.og.existe) falla(`${ruta}: no existe ${og}`);
    else {
      P.og.px = tamanoJpeg(ogArchivo); P.og.bytes = statSync(ogArchivo).size;
      if (!P.og.px || P.og.px[0] !== 1200 || P.og.px[1] !== 630 || P.og.bytes > 200000) falla(`${ruta}: imagen al compartir ${JSON.stringify(P.og)}`);
    }
    if (!ogAlt.startsWith('SpindleLab: ')) falla(`${ruta}: og:image:alt «${ogAlt}»`);
    // ---- JSON-LD
    const bloques = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
    const nodos = bloques.flatMap((b) => b['@graph'] || [b]);
    const deEstaPagina = bloques.slice(1).flatMap((b) => b['@graph'] || [b]);
    P.tipos = deEstaPagina.map((n) => n['@type']);
    const malos = JSON.stringify(deEstaPagina).match(/"(Review|AggregateRating|VideoObject)"/g);
    if (malos) falla(`${ruta}: tipos vetados ${malos}`);
    const ids = nodos.map((n) => n['@id']).filter(Boolean);
    P.idsRepetidos = ids.filter((x, j) => ids.indexOf(x) !== j);
    if (P.idsRepetidos.length) falla(`${ruta}: @id repetidos ${P.idsRepetidos}`);
    const bc = deEstaPagina.find((n) => n['@type'] === 'BreadcrumbList');
    P.breadcrumb = bc.itemListElement.map((x) => x.name);
    const srv = deEstaPagina.find((n) => n['@type'] === 'Service');
    if (srv && srv.description !== desc) falla(`${ruta}: la description del Service no es la de la página`);
    const faq = deEstaPagina.find((n) => n['@type'] === 'FAQPage');
    P.faq = faq ? faq.mainEntity.length : 0;
    // los montos del grafo
    const enGrafo = JSON.stringify(deEstaPagina);
    const precios = [...enGrafo.matchAll(/"(?:minPrice|price)":\s*(\d+)/g)].map((m) => Number(m[1])).filter((n) => n > 0);
    for (const n of precios) if (!NUMEROS.has(n)) falla(`${ruta}: el grafo dice ${n}, que no está en los JSON`);
    for (const m of montos(enGrafo + title + desc)) if (!MONTOS.has(m)) falla(`${ruta}: «${m}» en las señales no está en los JSON`);
    // ---- 1440 × 900
    {
      const { ctx, p, errores } = await abrir(ruta, 1440, 900);
      await p.evaluate(async () => { for (let y = 0; y < document.documentElement.scrollHeight; y += 600) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); } scrollTo(0, 0); });
      const v = await p.evaluate(() => {
        const caja = (el) => { const r = el.getBoundingClientRect(); return [Math.round(r.left), Math.round(r.right)]; };
        return {
          h1: document.querySelectorAll('h1').length,
          corchetes: [...document.querySelectorAll('a')].filter((a) => /^\[/.test(a.textContent.trim())).length,
          miga: [...document.querySelectorAll('.miga li')].map((li) => li.textContent.replace('·', '').trim()),
          texto: document.querySelector('main').innerText,
          preguntas: [...document.querySelectorAll('.pregunta h3')].map((h) => h.textContent.trim()),
          cabs: [...document.querySelectorAll('.int-sec__cab')].map((c) => ({ x: caja(c), pos: getComputedStyle(c).position, top: getComputedStyle(c).top })),
          cuerpos: [...document.querySelectorAll('.int-sec__cuerpo')].map((c) => ({ x: caja(c), ancho: c.classList.contains('int-sec__cuerpo--ancho') })),
          franja: (() => {
            const m = document.querySelector('.franja .medio'); if (!m) return null;
            const r = m.getBoundingClientRect(); const img = m.querySelector('img');
            return { x: Math.round(r.left), ancho: Math.round(r.width), proporcion: +(r.width / r.height).toFixed(3), radio: getComputedStyle(m).borderTopLeftRadius, src: img.currentSrc.split('/').pop(), natural: img.naturalWidth };
          })(),
          circulo: [...document.querySelectorAll('.medio-enlace[data-ir]')].map((a) => a.getAttribute('data-ir')),
          internos: [...new Set([...document.querySelectorAll('a[href^="/"]')].map((a) => a.getAttribute('href')))],
        };
      });
      P.a1440 = { ...v, texto: undefined, internos: v.internos.length };
      if (v.h1 !== 1) falla(`${ruta}: ${v.h1} h1`);
      if (v.corchetes > 1) falla(`${ruta}: ${v.corchetes} corchetes`);
      if (JSON.stringify(v.miga) !== JSON.stringify(P.breadcrumb)) falla(`${ruta}: miga ${v.miga} ≠ BreadcrumbList ${P.breadcrumb}`);
      if (faq && JSON.stringify(v.preguntas) !== JSON.stringify(faq.mainEntity.map((q) => q.name))) falla(`${ruta}: la FAQPage no son las preguntas a la vista`);
      for (const m of montos(v.texto)) if (!MONTOS.has(m)) falla(`${ruta}: «${m}» a la vista no está en los JSON`);
      P.montosALaVista = [...new Set(montos(v.texto))];
      for (const c of v.cabs) if (c.x[0] !== 16 || c.x[1] > 371 || c.pos !== 'sticky' || c.top !== '88px') falla(`${ruta}: un h2 de sección fuera de c1–c4 o sin pegarse ${JSON.stringify(c)}`);
      for (const c of v.cuerpos) if (c.x[0] !== 370 || c.x[1] !== (c.ancho ? 1424 : 1070)) falla(`${ruta}: un contenido fuera de c5–c${c.ancho ? 16 : 12} ${JSON.stringify(c)}`);
      if (CON_FRANJA[slug]) {
        const f = v.franja;
        if (!f || f.x !== 16 || f.ancho !== 1408 || Math.abs(f.proporcion - 2.39) > 0.01 || f.radio !== '6px' || !f.src.startsWith(CON_FRANJA[slug])) falla(`${ruta}: la franja a 1440 ${JSON.stringify(f)}`);
      } else if (v.franja) falla(`${ruta}: franja que la spec no pone`);
      if (slug === 'desarrollo-web' && JSON.stringify(v.circulo) !== JSON.stringify(['Ver el caso', 'Ver el caso', 'Ver el concepto'])) falla(`${ruta}: el círculo de las piezas ${v.circulo}`);
      // los enlaces internos
      P.enlaces = [];
      for (const href of v.internos) {
        const [camino, frag] = href.split('#');
        const res = await fetch(BASE + camino);
        const cuerpo = await res.text();
        const fragOk = !frag || new RegExp(`id="${frag}"`).test(cuerpo);
        if (res.status !== 200 || !fragOk) falla(`${ruta}: ${href} → ${res.status}${frag ? ` (#${frag} ${fragOk ? 'existe' : 'no existe'})` : ''}`);
        P.enlaces.push(`${href} ${res.status}${frag ? (fragOk ? ' #ok' : ' #NO') : ''}`);
      }
      // Desarrollo web: la fase del medio de la ventana en blanco, las otras en gris
      if (slug === 'desarrollo-web') {
        await p.evaluate(() => { const f = document.querySelectorAll('.fase')[2]; scrollTo(0, f.getBoundingClientRect().top + scrollY - innerHeight * 0.45); });
        await p.waitForTimeout(500);
        P.fases = await p.evaluate(() => [...document.querySelectorAll('.fase')].map((f) => ({ vista: f.classList.contains('a-la-vista'), titulo: getComputedStyle(f.querySelector('.t-fase')).color, cuerpo: getComputedStyle(f.querySelector('.cuerpo')).color })));
        const blanco = 'rgb(255, 255, 255)'; const gris = 'rgb(152, 152, 152)';
        const ok = P.fases.every((f, k) => (k === 2 ? f.vista && f.titulo === blanco && f.cuerpo === blanco : !f.vista && f.titulo === gris && f.cuerpo === gris));
        if (!ok) falla(`${ruta}: las fases a la vista ${JSON.stringify(P.fases)}`);
      }
      if (errores.length) falla(`${ruta}: errores a 1440 ${errores}`);
      await ctx.close();
    }
    // ---- 1024 × 768: el h2 arriba de su contenido, sin pegarse
    {
      const { ctx, p } = await abrir(ruta, 1024, 768);
      P.a1024 = await p.evaluate(() => {
        const c = document.querySelector('.int-sec__cab'); const s = c.nextElementSibling;
        const f = document.querySelector('.franja .medio');
        return { pos: getComputedStyle(c).position, arriba: c.getBoundingClientRect().bottom <= s.getBoundingClientRect().top,
          franja: f ? { proporcion: +(f.getBoundingClientRect().width / f.getBoundingClientRect().height).toFixed(3), src: f.querySelector('img').currentSrc.split('/').pop() } : null };
      });
      if (P.a1024.pos === 'sticky' || !P.a1024.arriba) falla(`${ruta}: a 1024 ${JSON.stringify(P.a1024)}`);
      if (P.a1024.franja && Math.abs(P.a1024.franja.proporcion - 2.39) > 0.01) falla(`${ruta}: la franja a 1024 ${JSON.stringify(P.a1024.franja)}`);
      await ctx.close();
    }
    // ---- 390 × 844, con puntero grueso
    {
      const { ctx, p, errores } = await abrir(ruta, 390, 844, { hasTouch: true, isMobile: true });
      P.a390 = await p.evaluate(() => {
        const f = document.querySelector('.franja .medio');
        if (!f) return { franja: null };
        const r = f.getBoundingClientRect();
        return { franja: { x: Math.round(r.left), ancho: Math.round(r.width), proporcion: +(r.width / r.height).toFixed(3), radio: getComputedStyle(f).borderTopLeftRadius, src: f.querySelector('img').currentSrc.split('/').pop() } };
      });
      P.a390.area = await p.evaluate(`(() => { ${AREA} })()`);
      if (P.a390.franja && (P.a390.franja.x !== 16 || P.a390.franja.ancho !== 358 || Math.abs(P.a390.franja.proporcion - 16 / 9) > 0.01 || P.a390.franja.radio !== '6px' || /-239/.test(P.a390.franja.src))) falla(`${ruta}: la franja a 390 ${JSON.stringify(P.a390.franja)}`);
      if (P.a390.area.n) falla(`${ruta}: ${P.a390.area.n} controles bajo 44 a 390 ${JSON.stringify(P.a390.area.muestra)}`);
      if (errores.length) falla(`${ruta}: errores a 390 ${errores}`);
      await ctx.close();
    }
    // ---- movimiento reducido: las fases de Desarrollo web, todas en blanco
    if (slug === 'desarrollo-web') {
      const { ctx, p } = await abrir(ruta, 1440, 900, { reducedMotion: 'reduce' });
      P.fasesReducido = await p.evaluate(() => [...document.querySelectorAll('.fase .t-fase, .fase .cuerpo')].every((n) => getComputedStyle(n).color === 'rgb(255, 255, 255)'));
      if (!P.fasesReducido) falla(`${ruta}: con movimiento reducido no están todas en blanco`);
      await ctx.close();
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
