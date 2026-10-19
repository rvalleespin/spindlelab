#!/usr/bin/env node
// Lo que una captura no muestra en las rutas de la tanda 5 (método, diagnóstico, nosotros, contacto, el blog y sus siete
// artículos), sobre el build. Diego, 19-oct-2026.
//
//   · Señales (senales-obra.md §1.2 a §1.5, §2.6, §2.8 a §2.11 y §4): un JSON-LD que parsea, sin @id repetidos ni Review,
//     AggregateRating o VideoObject; la BreadcrumbList igual a la miga visible; la FAQPage con las mismas preguntas que
//     se ven; title ≤ 60 y description de 120 a 160 (los siete artículos quedan como están: Simón §2.9); noindex; la
//     imagen al compartir existe, 1200 × 630, JPEG, ≤ 200 kB.
//   · En toda página: cero «54 → 94», «36 → 73», «<!--», a[href^="#"], «IA propietaria», «modelos RAG», «despliegue de
//     modelos», praxi.coach, «en pausa», «fuera de línea», driftime.css; un h1; a lo más un corchete; los montos a la
//     vista están, como texto, en oferta-v3.json o servicios-v3.json.
//   · La plantilla interior (spec §2.4) a 1440: el h2 de cada sección en c1–c4 y pegajoso a 88; el contenido en c5–c12.
//     A 1024, el h2 arriba y sin pegarse. Ninguna franja.
//   · Contacto: el formulario de producción (action, hidden, name e id, .contact-form, .form-status, .form-success,
//     v3-contacto.js) y entero sobre el pliegue a 1440 × 900 con el aviso de cookies abierto; un envío que sale bien
//     muestra «Listo.» con el foco; uno que falla deja el botón con su texto; ?sitio= llena el campo del sitio.
//   · Diagnóstico: el chequeo en c1–c8 con los ids de producción; con una respuesta de /api/chequeo (guardada en
//     e12/inventario/crudo/), el resultado se pinta en la misma columna y aparece el h2 oculto del resultado.
//   · Artículos: el índice de la barra marca la sección a la vista; bajo 1194, la barra abre, lleva a la sección y se
//     cierra; la tabla se desplaza dentro de su caja; cada enlace interno con su ruta y su fragmento existe.
//   · Los enlaces internos responden 200 y sus fragmentos existen; área de toque a 390 con puntero grueso; cero errores.
// Uso: node comprobar-tanda-5.mjs [--salida medidas.json]
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync, writeFileSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { execSync } from 'node:child_process';

const AQUI = dirname(fileURLToPath(import.meta.url));
const REPO = execSync('git rev-parse --show-toplevel', { cwd: AQUI }).toString().trim();
const ASTRO = join(REPO, 'spindlelab-astro');
const DIST = join(ASTRO, 'dist');
const E12 = join(REPO, 'marketing/oficina/obras-web/spindlelab-v3/e12');
const { chromium } = await import(pathToFileURL(join(ASTRO, 'node_modules/playwright/index.mjs')).href);
const AREA = readFileSync(join(E12, 'qa-paso-2/vuelta-1/herramientas/area-toque-390.js'), 'utf8');
const CHEQUEO = readFileSync(join(E12, 'inventario/crudo/chequeo-bernardocombeau.cl.json'), 'utf8');
const i = process.argv.indexOf('--salida');
const SALIDA = i > 0 ? process.argv[i + 1] : null;
const ARTICULOS = JSON.parse(readFileSync(join(ASTRO, 'src/data/blog-v3/_indice.json'), 'utf8')).map((p) => p.slug);
const INTERIORES = ['/v3/metodo/', '/v3/diagnostico/', '/v3/nosotros/', '/v3/contacto/'];
const RUTAS = [...INTERIORES, '/v3/blog/', ...ARTICULOS.map((s) => `/v3/blog/${s}/`)];

const montos = (t) => t.match(/\$\d{1,3}(?:\.\d{3})*(?:\/mes)?/g) || [];
const MONTOS = new Set(montos(readFileSync(join(ASTRO, 'src/data/oferta-v3.json'), 'utf8') + readFileSync(join(ASTRO, 'src/data/servicios-v3.json'), 'utf8')));

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
async function abrir(ruta, w, h, extra = {}, { aviso = false, antes } = {}) {
  const ctx = await nav.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, ...extra });
  if (!aviso) await ctx.addInitScript(() => { try { localStorage.setItem('spindlelab_consent', 'denied'); } catch (e) {} });
  const p = await ctx.newPage();
  const errores = [];
  p.on('pageerror', (e) => errores.push(String(e)));
  p.on('console', (m) => { if (m.type() === 'error') errores.push(m.text()); });
  if (antes) await antes(p);
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
    const esArticulo = ruta.startsWith('/v3/blog/') && ruta !== '/v3/blog/';
    const esInterior = INTERIORES.includes(ruta);
    const html = readFileSync(join(DIST, ruta.replace(/^\//, ''), 'index.html'), 'utf8');
    const P = (R.paginas[ruta] = {});
    // ---- el HTML servido
    const prohibidos = ['54 → 94', '36 → 73', '<!--', 'href="#', 'IA propietaria', 'modelos RAG', 'despliegue de modelos', 'praxi.coach', 'en pausa', 'fuera de línea', 'driftime', '/assets/img/d/'];
    P.prohibidos = prohibidos.filter((x) => html.toLowerCase().includes(x.toLowerCase()));
    if (P.prohibidos.length) falla(`${ruta}: ${P.prohibidos.join(', ')}`);
    const title = html.match(/<title>([^<]*)<\/title>/)[1].replace(/&amp;/g, '&');
    const desc = html.match(/<meta name="description" content="([^"]*)"/)[1].replace(/&amp;/g, '&');
    P.largos = [title.length, desc.length];
    if (!esArticulo && (title.length > 60 || desc.length < 120 || desc.length > 160)) falla(`${ruta}: title ${title.length} o description ${desc.length}`);
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
    if (esArticulo && !/<meta property="og:type" content="article"/.test(html)) falla(`${ruta}: og:type no es article`);
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
    for (const id of ['https://spindlelab.cl/#org', 'https://spindlelab.cl/#website', 'https://spindlelab.cl/#autor-ramon']) {
      if (ids.filter((x) => x === id).length !== 1) falla(`${ruta}: ${id} no aparece una vez`);
    }
    const bc = deEstaPagina.find((n) => n['@type'] === 'BreadcrumbList');
    P.breadcrumb = bc.itemListElement.map((x) => x.name);
    const faq = deEstaPagina.find((n) => n['@type'] === 'FAQPage');
    P.faq = faq ? faq.mainEntity.length : 0;
    if (esArticulo) {
      const art = deEstaPagina.find((n) => n['@type'] === 'Article');
      if (!art || art.image !== new URL(og).href) falla(`${ruta}: el Article no apunta a su tarjeta (${art && art.image})`);
    }
    // Los montos: los de la oferta, como texto, en los JSON. Los artículos quedan verbatim (brief §3) y el de los costos cita
    // rangos del mercado y precios de terceros, que no son la oferta: ahí solo se listan.
    if (!esArticulo) for (const m of montos(JSON.stringify(deEstaPagina) + title + desc)) if (!MONTOS.has(m)) falla(`${ruta}: «${m}» en las señales no está en los JSON`);
    if (ruta === '/v3/diagnostico/' && !deEstaPagina.find((n) => n['@type'] === 'WebApplication' && n['@id'] === 'https://spindlelab.cl/diagnostico/#chequeo')) falla(`${ruta}: sin el WebApplication de Simón`);
    if (ruta === '/v3/contacto/' && !deEstaPagina.find((n) => n['@type'] === 'ContactPage')) falla(`${ruta}: sin el ContactPage de Simón`);

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
          preguntas: [...document.querySelectorAll('.pregunta h3, .prosa .faq summary')].map((h) => h.textContent.trim()),
          cabs: [...document.querySelectorAll('.int-sec__cab')].map((c) => ({ x: caja(c), pos: getComputedStyle(c).position, top: getComputedStyle(c).top })),
          cuerpos: [...document.querySelectorAll('.int-sec__cuerpo')].map((c) => ({ x: caja(c), ancho: c.classList.contains('int-sec__cuerpo--ancho') })),
          franja: !!document.querySelector('.franja'),
          internos: [...new Set([...document.querySelectorAll('a[href^="/"]')].map((a) => a.getAttribute('href')))],
          negrita: [...document.querySelectorAll('main *')].filter((n) => n.childNodes.length && Number(getComputedStyle(n).fontWeight) >= 600).length,
          letras: [...new Set([...document.querySelectorAll('main *')].map((n) => getComputedStyle(n).fontFamily.split(',')[0].replace(/"/g, '').trim()))],
        };
      });
      P.a1440 = { ...v, texto: undefined, internos: v.internos.length };
      if (v.h1 !== 1) falla(`${ruta}: ${v.h1} h1`);
      if (v.corchetes > 1) falla(`${ruta}: ${v.corchetes} corchetes`);
      if (v.negrita) falla(`${ruta}: ${v.negrita} nodos en negrita`);
      if (v.letras.some((l) => !['Google Sans Flex', 'DM Mono'].includes(l))) falla(`${ruta}: letras ${v.letras}`);
      if (JSON.stringify(v.miga) !== JSON.stringify(P.breadcrumb)) falla(`${ruta}: miga ${v.miga} ≠ BreadcrumbList ${P.breadcrumb}`);
      if (faq && JSON.stringify(v.preguntas) !== JSON.stringify(faq.mainEntity.map((q) => q.name))) falla(`${ruta}: la FAQPage no son las preguntas a la vista`);
      if (!esArticulo) for (const m of montos(v.texto)) if (!MONTOS.has(m)) falla(`${ruta}: «${m}» a la vista no está en los JSON`);
      P.montosALaVista = [...new Set(montos(v.texto))];
      if (v.franja) falla(`${ruta}: franja que la spec no pone`);
      if (esInterior) {
        for (const c of v.cabs) if (c.x[0] !== 16 || c.x[1] > 371 || c.pos !== 'sticky' || c.top !== '88px') falla(`${ruta}: un h2 de sección fuera de c1–c4 o sin pegarse ${JSON.stringify(c)}`);
        for (const c of v.cuerpos) if (c.x[0] !== 370 || c.x[1] !== (c.ancho ? 1424 : 1070)) falla(`${ruta}: un contenido fuera de c5–c12 ${JSON.stringify(c)}`);
      }
      // los enlaces internos: responden 200 y su fragmento existe
      P.enlaces = [];
      for (const href of v.internos) {
        const [camino, frag] = href.split('#');
        const res = await fetch(BASE + camino);
        const cuerpo = await res.text();
        const fragOk = !frag || new RegExp(`id="${frag}"`).test(cuerpo);
        if (res.status !== 200 || !fragOk) falla(`${ruta}: ${href} → ${res.status}${frag ? ` (#${frag} ${fragOk ? 'existe' : 'no existe'})` : ''}`);
        P.enlaces.push(`${href} ${res.status}${frag ? (fragOk ? ' #ok' : ' #NO') : ''}`);
      }
      // diagnóstico: el chequeo en c1–c8, con los ids de producción
      if (ruta === '/v3/diagnostico/') {
        P.chequeo = await p.evaluate(() => {
          const r = document.querySelector('.int-instr').getBoundingClientRect();
          return { x: [Math.round(r.left), Math.round(r.right)], ids: ['chq-form', 'chq-dominio', 'chq-btn', 'chq-out', 'chq-error'].filter((id) => document.getElementById(id)).length,
            titulo: getComputedStyle(document.querySelector('.chequeo__titulo-res')).display };
        });
        if (P.chequeo.x[0] !== 16 || P.chequeo.x[1] !== 716 || P.chequeo.ids !== 5 || P.chequeo.titulo !== 'none') falla(`${ruta}: el chequeo ${JSON.stringify(P.chequeo)}`);
      }
      // artículos: el índice de la barra marca la sección a la vista
      if (esArticulo) {
        // la sección arriba de la pantalla, bajo el encabezado plegado, donde la deja un enlace del índice (data-linea: 120)
        await p.evaluate(() => { const s = document.querySelectorAll('.caso-bloque[id]')[2]; scrollTo(0, s.getBoundingClientRect().top + scrollY - 100); });
        await p.waitForTimeout(500);
        P.indice = await p.evaluate(() => {
          const s = document.querySelectorAll('.caso-bloque[id]')[2];
          const a = document.querySelector('.lateral__indice a[aria-current]');
          const punto = document.querySelector('.lateral__punto').getBoundingClientRect();
          const ra = a ? a.getBoundingClientRect() : null;
          return { esperada: s.id, marcada: a ? a.hash.slice(1) : null, puntoEnFila: !!ra && punto.top >= ra.top && punto.bottom <= ra.bottom,
            lateral: getComputedStyle(document.querySelector('.lateral')).position, cruces: [...document.querySelectorAll('.caso-sec')].filter((c) => getComputedStyle(c, '::before').content !== 'none').length };
        });
        if (P.indice.esperada !== P.indice.marcada || !P.indice.puntoEnFila || P.indice.lateral !== 'sticky') falla(`${ruta}: el índice del artículo ${JSON.stringify(P.indice)}`);
      }
      if (errores.length) falla(`${ruta}: errores a 1440 ${errores}`);
      await ctx.close();
    }
    // ---- 1024 × 768: el h2 arriba de su contenido, sin pegarse
    if (esInterior) {
      const { ctx, p } = await abrir(ruta, 1024, 768);
      P.a1024 = await p.evaluate(() => {
        const c = document.querySelector('.int-sec__cab'); const s = c.nextElementSibling;
        return { pos: getComputedStyle(c).position, arriba: c.getBoundingClientRect().bottom <= s.getBoundingClientRect().top };
      });
      if (P.a1024.pos === 'sticky' || !P.a1024.arriba) falla(`${ruta}: a 1024 ${JSON.stringify(P.a1024)}`);
      await ctx.close();
    }
    // ---- 390 × 844, con puntero grueso
    {
      const { ctx, p, errores } = await abrir(ruta, 390, 844, { hasTouch: true, isMobile: true });
      P.a390 = { area: await p.evaluate(`(() => { ${AREA} })()`) };
      P.a390.desborde = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      if (P.a390.area.n) falla(`${ruta}: ${P.a390.area.n} controles bajo 44 a 390 ${JSON.stringify(P.a390.area.muestra)}`);
      if (P.a390.desborde) falla(`${ruta}: desborde de ${P.a390.desborde} px a 390`);
      if (esArticulo) {
        // la barra flotante: abre, lleva a la tercera sección, se cierra y la marca
        await p.tap('.barra summary');
        await p.waitForTimeout(200);
        const abierta = await p.evaluate(() => document.querySelector('.barra details').open);
        await p.tap('.barra ul li:nth-child(3) a');
        await p.waitForTimeout(700);
        P.a390.barra = await p.evaluate(() => {
          const s = document.querySelectorAll('.caso-bloque[id]')[2];
          return { cerrada: !document.querySelector('.barra details').open, hash: location.hash.slice(1), esperada: s.id,
            arriba: Math.round(s.getBoundingClientRect().top), activa: document.querySelector('[data-barra-activa]').textContent,
            nombre: s.getAttribute('data-nombre'),
            tablas: [...document.querySelectorAll('.prosa-tabla')].map((t) => ({ caja: Math.round(t.getBoundingClientRect().width), contenido: t.scrollWidth })) };
        });
        P.a390.barra.abierta = abierta;
        const b = P.a390.barra;
        if (!abierta || !b.cerrada || b.hash !== b.esperada || b.arriba < 0 || b.arriba > 200 || b.activa !== b.nombre) falla(`${ruta}: la barra a 390 ${JSON.stringify(b)}`);
        for (const t of b.tablas) if (t.caja > 358) falla(`${ruta}: una tabla de ${t.caja} px a 390`);
      }
      if (errores.length) falla(`${ruta}: errores a 390 ${errores}`);
      await ctx.close();
    }
  }

  // ---- CONTACTO: el formulario de producción, sobre el pliegue y funcionando
  {
    const ruta = '/v3/contacto/';
    const P = R.paginas[ruta];
    const html = readFileSync(join(DIST, 'v3/contacto/index.html'), 'utf8');
    const prod = readFileSync(join(ASTRO, 'public/contacto/index.html'), 'utf8');
    const nombres = (h) => [...(h.match(/<form[\s\S]*?<\/form>/)[0]).matchAll(/name="([^"]+)"/g)].map((m) => m[1]).sort();
    const idsF = (h) => [...(h.match(/<form[\s\S]*?<\/form>/)[0]).matchAll(/id="(f-[^"]+)"/g)].map((m) => m[1]).sort();
    const ocultos = (h) => [...h.matchAll(/<input type="hidden" name="(access_key|subject|from_name)" value="([^"]*)"/g)].map((m) => `${m[1]}=${m[2]}`).sort();
    P.formulario = {
      nombres: JSON.stringify(nombres(html)) === JSON.stringify(nombres(prod)),
      // los ids de producción, todos; la v3 suma uno (f-sitio-ayuda, la ayuda del campo, desde driftime)
      ids: idsF(prod).every((x) => idsF(html).includes(x)),
      idsDeMas: idsF(html).filter((x) => !idsF(prod).includes(x)).join(' '),
      ocultos: JSON.stringify(ocultos(html)) === JSON.stringify(ocultos(prod)),
      action: (html.match(/<form[^>]*action="([^"]+)"/) || [])[1] === (prod.match(/<form[^>]*action="([^"]+)"/) || [])[1],
      clases: ['class="contact-form', 'form-status', 'form-success'].every((c) => html.includes(c)),
      script: html.includes('src="/assets/js/v3-contacto.js?v=2"'),
    };
    if (Object.entries(P.formulario).some(([k, x]) => k !== 'idsDeMas' && !x)) falla(`${ruta}: el formulario no es el de producción ${JSON.stringify(P.formulario)}`);
    // sobre el pliegue a 1440 × 900, con el aviso de cookies abierto
    {
      const { ctx, p } = await abrir(ruta, 1440, 900, {}, { aviso: true });
      P.pliegue = await p.evaluate(() => {
        const f = document.querySelector('.contact-form').getBoundingClientRect();
        const a = document.getElementById('cookie-banner');
        const ra = a && a.getClientRects().length ? a.getBoundingClientRect() : null;
        return { form: [Math.round(f.top), Math.round(f.bottom)], aviso: ra ? Math.round(ra.top) : null };
      });
      if (P.pliegue.form[1] > (P.pliegue.aviso || 900)) falla(`${ruta}: el formulario no queda entero sobre el pliegue ${JSON.stringify(P.pliegue)}`);
      await ctx.close();
    }
    // ?sitio= llena el campo; un envío que falla deja el botón con su texto y su flecha; uno que sale bien, «Listo.»
    for (const sale of [false, true]) {
      const { ctx, p, errores } = await abrir(`${ruta}?sitio=ejemplo.cl`, 1440, 900, {}, {
        antes: (pg) => pg.route('https://api.web3forms.com/**', (r) => r.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(sale ? { success: true } : { success: false, message: 'x' }) })),
      });
      const sitio = await p.inputValue('#f-sitio');
      const escribenos = await p.evaluate(() => [...document.querySelectorAll('a')].filter((a) => /contacto/.test(a.getAttribute('href'))).map((a) => a.getAttribute('href')));
      await p.fill('#f-nombre', 'Prueba'); await p.fill('#f-email', 'prueba@ejemplo.cl'); await p.check('#f-consiento');
      const antes = await p.evaluate(() => document.querySelector('.contact-form button').innerHTML);
      await p.click('.contact-form button[type=submit]');
      await p.waitForTimeout(800);
      const d = await p.evaluate(() => ({ boton: document.querySelector('.contact-form button').innerHTML, form: document.querySelector('.contact-form').hidden,
        listo: !document.querySelector('.form-success').hidden, foco: document.activeElement && document.activeElement.classList.contains('form-success'),
        estado: document.querySelector('.form-status').textContent, color: getComputedStyle(document.querySelector('.form-status')).color }));
      (P.envio ||= {})[sale ? 'sale' : 'falla'] = { sitio, escribenos, ...d, botonIgual: d.boton === antes };
      if (sitio !== 'ejemplo.cl') falla(`${ruta}: ?sitio= no llenó el campo`);
      if (escribenos.some((h) => h === '/v3/contacto/' || h.startsWith('#'))) falla(`${ruta}: un «Escríbenos» sin su ruta al formulario ${escribenos}`);
      if (sale && (!d.form || !d.listo || !d.foco)) falla(`${ruta}: el envío correcto ${JSON.stringify(d)}`);
      if (!sale && (d.form || d.listo || d.boton !== antes || d.color !== 'rgb(255, 255, 255)')) falla(`${ruta}: el envío que falla ${JSON.stringify(d)}`);
      if (errores.length) falla(`${ruta}: errores al enviar ${errores}`);
      await ctx.close();
    }
  }

  // ---- DIAGNÓSTICO: el resultado del chequeo, en la misma columna
  {
    const ruta = '/v3/diagnostico/';
    const { ctx, p, errores } = await abrir(ruta, 1440, 900, {}, { antes: (pg) => pg.route('**/api/chequeo**', (r) => r.fulfill({ status: 200, contentType: 'application/json', body: CHEQUEO })) });
    await p.fill('#chq-dominio', 'bernardocombeau.cl');
    await p.click('#chq-btn');
    await p.waitForTimeout(1000);
    const d = await p.evaluate(() => {
      const out = document.getElementById('chq-out'); const r = out.getBoundingClientRect();
      return { visible: getComputedStyle(out).display !== 'none' && r.height > 100, x: [Math.round(r.left), Math.round(r.right)], titulo: getComputedStyle(document.querySelector('.chequeo__titulo-res')).display,
        bloques: out.querySelectorAll('.chq-bloque').length };
    });
    R.paginas[ruta].resultado = d;
    if (!d.visible || d.x[0] !== 16 || d.x[1] > 716 || d.titulo === 'none' || d.bloques !== 3) falla(`${ruta}: el resultado del chequeo ${JSON.stringify(d)}`);
    if (errores.length) falla(`${ruta}: errores con el resultado ${errores}`);
    await p.screenshot({ path: join(E12, 'construccion/capturas/tanda-5/comprobar-tanda-5-diagnostico-resultado-1440.png'), fullPage: false });
    await ctx.close();
  }
} finally {
  await nav.close();
  servidor.close();
}
console.log(JSON.stringify(R, null, 1));
if (SALIDA) writeFileSync(SALIDA, JSON.stringify(R, null, 1) + '\n');
console.error(R.fallas.length ? `\n${R.fallas.length} falla(s):\n  ${R.fallas.join('\n  ')}` : '\nSin fallas.');
process.exit(R.fallas.length ? 1 : 0);
