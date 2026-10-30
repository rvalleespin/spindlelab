#!/usr/bin/env node
// Convierte spindlelab-astro/ del v3 (rutas bajo /v3/, con noindex, junto al sitio v2) al sitio en la raíz (obra E13).
// Es la versión en Node del corte P5 y P6 de lista-publicacion.md (E7), sin sed de GNU: corre igual en el Mac y en la nube.
//
//   node convertir-a-raiz.mjs <carpeta spindlelab-astro/> [--simular]
//
// Qué hace, en orden:
//   1. Retira el v2 que ocupa las rutas del v3: src/pages/index.astro y nosotros.astro, los componentes v2 sin importador,
//      los HTML estáticos de public/{blog,servicios,contacto,diagnostico,metodo} y las maquetas a, b, c y maqueta-inicial.
//      NO toca public/privacidad, public/404.html ni lo que ellos piden (style.css, site-header.js, Gabarito): se quedan.
//   2. Sube cada plantilla de src/pages/v3/ un nivel y quita un nivel a sus imports relativos.
//   3. Quita el prefijo /v3/ SOLO de las rutas de página (servicios, metodo, nosotros, contacto, diagnostico, blog, trabajo, y
//      la home). Los archivos de medios que viven en public/v3/ (portada, cinta, medios, marca y public/v3/trabajo/<caso>/…)
//      conservan su URL: se distinguen porque la carpeta es de medios o porque el último tramo lleva extensión.
//   4. Quita el noindex de las plantillas y deja el middleware de dev solo para /privacidad/.
// Escribe un informe al final: cada ficha de /v3/ que no pudo clasificar y cada plantilla de ruta con `${…}` pegada al prefijo
// (hay que mirarlas a mano). Con --simular no escribe nada.
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync, mkdirSync, renameSync, rmSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';

const RAIZ = process.argv[2];
const SIMULAR = process.argv.includes('--simular');
if (!RAIZ || !existsSync(join(RAIZ, 'src/pages/v3'))) {
  console.error('Uso: convertir-a-raiz.mjs <carpeta spindlelab-astro/ con src/pages/v3/>');
  process.exit(2);
}
const R = (...p) => join(RAIZ, ...p);
const log = [];
const aviso = [];

const RUTAS = new Set(['servicios', 'metodo', 'nosotros', 'contacto', 'diagnostico', 'blog', 'trabajo']);
const MEDIOS = new Set(['cinta', 'marca', 'medios', 'portada']);

function caminar(dir, f) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) { if (e.name === 'node_modules' || e.name === 'dist' || e.name === '.astro') continue; caminar(p, f); }
    else f(p);
  }
}
const borrar = (rel) => {
  const p = R(rel);
  if (!existsSync(p)) return;
  log.push(`retira ${rel}`);
  if (!SIMULAR) rmSync(p, { recursive: true, force: true });
};

// ---- 1 · el v2 y las maquetas ---------------------------------------------------------------------------------------
['src/pages/index.astro', 'src/pages/nosotros.astro'].forEach(borrar);
['Contacto', 'Evidencia', 'Faq', 'Footer', 'Hero', 'HeroV2', 'Icon', 'Metodo', 'Nav', 'Nosotros', 'Problema', 'Servicios', 'ParaQuien'].forEach((c) => borrar(`src/components/${c}.astro`));
['blog', 'servicios', 'contacto', 'diagnostico', 'metodo', 'mockup-interno'].forEach((d) => borrar(`public/${d}`));
['a', 'b', 'c', 'maqueta-inicial'].forEach((m) => borrar(`src/pages/v3/${m}.astro`));

// ---- 2 · las plantillas suben un nivel ------------------------------------------------------------------------------
const subir = [];
caminar(R('src/pages/v3'), (p) => subir.push(p));
for (const p of subir) {
  const rel = relative(R('src/pages/v3'), p);
  const destino = R('src/pages', rel);
  const nivel = rel.split('/').length - 1; // 0: primer nivel (index.astro), 1: dentro de blog/, servicios/ o trabajo/
  let txt = readFileSync(p, 'utf8');
  // «../../x» pasa a «../x» (primer nivel) y «../../../x» a «../../x» (segundo): un nivel menos en los imports y en import.meta.glob.
  const antes = nivel === 0 ? /(['"`])\.\.\/\.\.\//g : /(['"`])\.\.\/\.\.\/\.\.\//g;
  const despues = nivel === 0 ? '$1../' : '$1../../';
  txt = txt.replace(antes, despues);
  // El noindex era del v3 mientras viviera en /v3/.
  txt = txt.replace(/^[ \t]*<meta slot="head" name="robots" content="noindex, nofollow" \/>\r?\n/gm, '');
  log.push(`sube ${join('src/pages/v3', rel)} -> ${join('src/pages', rel)}`);
  if (!SIMULAR) {
    mkdirSync(dirname(destino), { recursive: true });
    writeFileSync(destino, txt);
    rmSync(p);
  }
}
if (!SIMULAR) {
  // limpiar carpetas vacías de src/pages/v3
  const vaciar = (d) => { for (const e of readdirSync(d, { withFileTypes: true })) if (e.isDirectory()) vaciar(join(d, e.name)); if (!readdirSync(d).length) rmSync(d, { recursive: true }); };
  if (existsSync(R('src/pages/v3'))) vaciar(R('src/pages/v3'));
}

// ---- 3 · el prefijo /v3/ ---------------------------------------------------------------------------------------------
const TEXTO = /\.(astro|ts|mjs|js|json|css|md)$/;
const clasificar = (ficha, siguiente) => {
  // ficha: «/v3», «/v3/» o «/v3/<x>/<y>…» (sin comillas ni query). Devuelve el texto nuevo o null si no se toca.
  if (ficha === '/v3' || ficha === '/v3/') return '/';
  const partes = ficha.split('/'); // ['', 'v3', 'servicios', 'desarrollo-web', '']
  const primero = partes[2];
  if (MEDIOS.has(primero)) return null;
  if (!RUTAS.has(primero)) { aviso.push(`ficha sin clasificar: ${ficha}`); return null; }
  const ultimo = partes.filter(Boolean).pop();
  if (/\.[A-Za-z0-9]{2,5}$/.test(ultimo)) return null; // un archivo de medios (public/v3/trabajo/<caso>/x.webp)
  if (siguiente === '$' || siguiente === '{') aviso.push(`ruta con plantilla pegada, revisar: ${ficha}\${…}`);
  return ficha.slice(3); // quita «/v3»
};
const objetivos = [];
for (const base of ['src', 'public/assets/js']) if (existsSync(R(base))) caminar(R(base), (p) => { if (TEXTO.test(p)) objetivos.push(p); });
let cambios = 0;
for (const p of objetivos) {
  const txt = readFileSync(p, 'utf8');
  const nuevo = txt.replace(/\/v3(?:\/[A-Za-z0-9_\-.]*)*\/?(?=[^A-Za-z0-9_\-.\/]|$)/g, (ficha, ...resto) => {
    const off = resto[resto.length - 2];
    const sig = txt[off + ficha.length];
    const prev = txt[off - 1];
    // «pages/v3/…» y «components/v3/…» son rutas de archivo, no de página: el carácter anterior es una letra.
    if (prev && /[A-Za-z0-9_\-]/.test(prev)) return ficha;
    const r = clasificar(ficha, sig);
    return r === null ? ficha : r;
  });
  if (nuevo !== txt) {
    cambios++;
    log.push(`prefijo ${relative(RAIZ, p)}`);
    if (!SIMULAR) writeFileSync(p, nuevo);
  }
}

// ---- 4 · config y verificador ---------------------------------------------------------------------------------------
const cfg = R('astro.config.mjs');
if (existsSync(cfg)) {
  let t = readFileSync(cfg, 'utf8');
  const nuevo = t.replace('/^\\/(blog|servicios|metodo|contacto|diagnostico|privacidad)(\\/.*)?\\/$/', '/^\\/(privacidad)(\\/.*)?\\/$/');
  if (nuevo !== t) { log.push('astro.config.mjs: el middleware de dev queda solo para /privacidad/'); if (!SIMULAR) writeFileSync(cfg, nuevo); }
  else aviso.push('astro.config.mjs: no encontré el middleware de dev que se esperaba reducir');
}

console.log(log.join('\n'));
console.log(`\n${cambios} archivos con prefijo reescrito · ${subir.length} plantillas subidas${SIMULAR ? ' (SIMULADO: no se escribió nada)' : ''}`);
if (aviso.length) { console.log('\nREVISAR A MANO:'); [...new Set(aviso)].forEach((a) => console.log(' · ' + a)); }
