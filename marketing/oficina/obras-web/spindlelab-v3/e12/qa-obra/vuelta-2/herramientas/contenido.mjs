// Javiera, QA de obra E12, vuelta 1. Lo que se lee del contenido y las señales de las 27 rutas, sobre el build:
//   · head: title, description, canonical, robots, Open Graph, theme-color, iconos, precargas (senales-obra.md §1.2-1.3)
//   · JSON-LD parseado: tipos, @id repetidos, los tres del Layout una vez, tipos vetados (§1.5), Praxi sin offers/url/
//     sameAs, Combeau con #fotografia y #modelo, conceptos con genre y disambiguatingDescription, BreadcrumbList = miga
//   · el HTML servido: <!-- -->, a[href^="#"], praxi.coach, «en pausa», «fuera de línea», puntajes 54 → 94 y 36 → 73
//   · el texto a la vista: los precios (cada «$…» igual, como texto, a uno de los JSON), las palabras vetadas
//   · cada og:image: existe, JPEG, 1200 × 630, ≤ 200 kB
// Uso: node contenido.mjs
import { readFileSync, writeFileSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { execSync } from 'node:child_process';
import { ASTRO, QA, RUTAS, servir, lanzar } from './comun.mjs';

const DIST = join(ASTRO, 'dist');
const JSONS = readFileSync(join(ASTRO, 'src/data/oferta-v3.json'), 'utf8') + readFileSync(join(ASTRO, 'src/data/servicios-v3.json'), 'utf8');
const srv = await servir();
const nav = await lanzar();
const ctx = await nav.newContext({ viewport: { width: 1440, height: 900 } });
await ctx.addInitScript(() => { try { localStorage.setItem('spindlelab_consent', 'denied'); } catch (e) {} });
const R = [];
const VETADOS_TIPO = ['Review', 'AggregateRating', 'VideoObject', 'LocalBusiness', 'MedicalClinic', 'LegalService', 'AccountingService', 'Organization'];
const VETADAS = [/praxi\.coach/i, /en pausa/i, /fuera de l[ií]nea/i, /54\s*(→|->|a)\s*94/, /36\s*(→|->|a)\s*73/, /IA propietaria/i, /modelos RAG/i, /despliegue de modelos/i,
  /LAB_STATUS|DEPLOYMENT_CYCLE|LAB_01/, /\b40 ?%/, /\+150 ?%/];

for (const ruta of RUTAS) {
  const f = join(DIST, ruta, 'index.html');
  const html = readFileSync(f, 'utf8');
  const p = await ctx.newPage();
  await p.goto(srv.url + ruta, { waitUntil: 'networkidle' });
  const d = await p.evaluate(() => {
    const meta = (sel) => document.querySelector(sel)?.getAttribute('content') ?? null;
    const ld = [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => { try { return JSON.parse(s.textContent); } catch (e) { return { ERROR: String(e) }; } });
    const miga = [...document.querySelectorAll('nav[aria-label="Miga de pan"] li, .miga li')].map((li) => li.textContent.replace(/·/g, '').trim()).filter(Boolean);
    return {
      title: document.title, description: meta('meta[name="description"]'), canonical: document.querySelector('link[rel="canonical"]')?.href,
      robots: meta('meta[name="robots"]'), themeColor: meta('meta[name="theme-color"]'),
      og: Object.fromEntries([...document.querySelectorAll('meta[property^="og:"]')].map((m) => [m.getAttribute('property'), m.getAttribute('content')])),
      iconos: [...document.querySelectorAll('link[rel~="icon"],link[rel="apple-touch-icon"]')].map((l) => l.getAttribute('href')),
      precargas: [...document.querySelectorAll('link[rel="preload"]')].map((l) => l.getAttribute('href')),
      ld, miga,
      texto: document.body.innerText,
      alts: [...document.querySelectorAll('img')].map((i) => i.getAttribute('alt')),
      enlaces: [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href')),
      bodyLenis: document.body.hasAttribute('data-lenis-prevent'),
    };
  });
  await p.close();
  // JSON-LD
  const nodos = d.ld.flatMap((g) => (g['@graph'] ? g['@graph'] : [g]));
  const porId = {};
  for (const n of nodos) if (n['@id']) (porId[n['@id']] ||= []).push(n['@type']);
  const ids = Object.entries(porId);
  const tipos = nodos.map((n) => n['@type']).flat();
  const todoLd = JSON.stringify(d.ld);
  const bc = nodos.find((n) => n['@type'] === 'BreadcrumbList');
  const bcNombres = bc ? bc.itemListElement.map((x) => x.name) : null;
  const r = {
    ruta, title: d.title, tl: [...d.title].length, description: d.description, dl: d.description ? [...d.description].length : 0,
    canonical: d.canonical, robots: d.robots, themeColor: d.themeColor, og: d.og, iconos: d.iconos, precargas: d.precargas, bodyLenis: d.bodyLenis,
    ldErrores: d.ld.filter((x) => x.ERROR).length, ldScripts: d.ld.length, tipos,
    idRepetidos: ids.filter(([, t]) => t.length > 1).map(([i, t]) => `${i} ×${t.length} (${t.join(',')})`),
    layoutUnaVez: ['https://spindlelab.cl/#org', 'https://spindlelab.cl/#website', 'https://spindlelab.cl/#autor-ramon'].map((i) => `${i.split('#')[1]}:${(porId[i] || []).length}`),
    tiposVetados: tipos.filter((t) => VETADOS_TIPO.includes(t)),
    miga: d.miga, breadcrumb: bcNombres, migaIgual: bcNombres ? JSON.stringify(bcNombres) === JSON.stringify(d.miga) : null,
    comentarios: (html.match(/<!--/g) || []).length,
    hrefAlmohadilla: (html.match(/href="#/g) || []).length,
    vetadasHtml: VETADAS.filter((re) => re.test(html)).map(String),
    vetadasTexto: VETADAS.filter((re) => re.test(d.texto)).map(String),
    externos: [...new Set(d.enlaces.filter((h) => /^https?:/.test(h)))],
    alts: d.alts,
  };
  // Precios a la vista (los artículos del blog quedan fuera: cuerpo verbatim, desvíos tanda 5 §5)
  const precios = [...new Set((d.texto.match(/\$\s?\d{1,3}(?:\.\d{3})+(?:\/mes)?/g) || []))];
  r.precios = precios; r.preciosFueraDeJson = /\/blog\/[^/]+\/$/.test(ruta) ? 'artículo (verbatim)' : precios.filter((x) => !JSONS.includes(x.replace(/\s/g, '')));
  // og:image
  const og = d.og['og:image'];
  if (og) {
    const local = join(DIST, new URL(og).pathname);
    if (existsSync(local)) {
      const info = execSync(`python3 -c "from PIL import Image; i=Image.open('${local}'); print(i.format, i.size[0], i.size[1])"`).toString().trim();
      r.ogImagen = `${info} ${statSync(local).size} B${/\?v=\d/.test(og) ? '' : ' SIN ?v='}`;
    } else r.ogImagen = 'NO EXISTE ' + local;
  }
  r.ld = d.ld;
  R.push(r);
  process.stdout.write('.');
}
await nav.close(); await srv.cerrar();
writeFileSync(join(QA, 'crudos', 'contenido.json'), JSON.stringify(R, null, 1));
console.log();
for (const r of R) {
  const pb = [];
  if (r.ldErrores) pb.push(`JSON-LD que no parsea: ${r.ldErrores}`);
  if (r.idRepetidos.length) pb.push(`@id repetidos: ${r.idRepetidos.join('; ')}`);
  if (r.layoutUnaVez.some((x) => !x.endsWith(':1'))) pb.push(`Layout: ${r.layoutUnaVez}`);
  if (r.tiposVetados.length) pb.push(`tipos vetados: ${r.tiposVetados}`);
  if (r.migaIgual === false) pb.push(`miga ${JSON.stringify(r.miga)} ≠ breadcrumb ${JSON.stringify(r.breadcrumb)}`);
  if (r.comentarios) pb.push(`<!-- ×${r.comentarios}`);
  if (r.hrefAlmohadilla) pb.push(`href="#…" ×${r.hrefAlmohadilla}`);
  if (r.vetadasHtml.length || r.vetadasTexto.length) pb.push(`vetadas: html ${r.vetadasHtml} · texto ${r.vetadasTexto}`);
  if (Array.isArray(r.preciosFueraDeJson) && r.preciosFueraDeJson.length) pb.push(`precios fuera de los JSON: ${r.preciosFueraDeJson}`);
  if (r.robots !== 'noindex, nofollow') pb.push(`robots: ${r.robots}`);
  if (!r.bodyLenis) pb.push('body sin data-lenis-prevent');
  if (r.themeColor !== '#060606') pb.push(`theme-color ${r.themeColor}`);
  console.log(`${r.ruta}  title ${r.tl} · desc ${r.dl} · og ${r.ogImagen} · tipos ${[...new Set(r.tipos)].join(',')} · precios ${r.precios.join(' ')}${pb.length ? '\n   ⚠ ' + pb.join('\n   ⚠ ') : ''}`);
}
