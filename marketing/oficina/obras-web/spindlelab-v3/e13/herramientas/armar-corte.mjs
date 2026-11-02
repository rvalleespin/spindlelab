#!/usr/bin/env node
// Arma el CORTE de la obra E13: lo que se lleva a `main` para publicar el sitio nuevo en la raíz, sin traer los ~486 MB de
// documentos y capturas de la rama de la obra (las rutinas en la nube clonan `main`).
//
// El corte = el árbol de `origin/main` + `spindlelab-astro/` de la rama de la obra (con el sitio ya en la raíz) + un puñado
// de documentos. Se arma en un worktree desechable fuera de iCloud, desde `origin/main`, nunca mezclando historias.
//
//   git fetch origin
//   git worktree add --detach <carpeta fuera de iCloud> origin/main        # (o -b claude/v3-publicacion para el día real)
//   node armar-corte.mjs --destino <esa carpeta> [--origen <worktree de la obra>] [--node-modules <carpeta con node_modules>]
//
// Qué hace, en orden (cada paso imprime lo que hizo):
//   1. Reemplaza spindlelab-astro/ del destino por el de la obra (rsync --delete; sin node_modules, dist, .astro ni .wrangler).
//   2. Devuelve a la versión de `origin/main` lo que es de producción y esta obra no toca: functions/, _headers, _redirects,
//      public/js/, /privacidad/, 404.html y lo que esas dos páginas estáticas piden (style.css, site-header.js).
//   3. En 404.html y /privacidad/ (páginas estáticas del diseño anterior que esta obra no rehace) cambia dos enlaces que
//      apuntarían a nada en el sitio nuevo: «Evidencia» (/#evidencia) pasa a «Trabajo» (/trabajo/) y «El Taller» a «Blog»;
//      y sus tres <link> de icono (el favicon del v2, con su punto dorado) pasan a los cinco de A, la i con su disco de Bruno
//      (/v3/marca/, ?v=6, los mismos de layout-a.ts): un solo favicon en todo el sitio (acta de QA del 30-oct, menor 14).
//      /favicon.ico de la raíz no se toca aquí: ya es el de Bruno en la obra (llega con el paso 1). Y la línea de marca del
//      pie de /privacidad/ («Marketing y crecimiento con IA para empresas que ya venden.», la del 23-oct) pasa a la del 30-oct,
//      «Sitios web a medida y marketing con IA.» (comun.pie.marca de Clara): el barrido de términos la marca como
//      posicionamiento anterior (acta de QA del 30-oct, menor 12).
//   4. Copia los documentos mínimos de la obra a marketing/oficina/obras-web/spindlelab-v3/e13/.
//   5. Verifica que lo protegido quedó idéntico a main (diff vacío) y lista el resumen del corte contra main.
// NO hace commit, NO empuja y NO construye: eso lo hace quien ejecuta la lista de publicación (lista-publicacion.md).
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync, cpSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

const arg = (n, d = null) => { const i = process.argv.indexOf(`--${n}`); return i > -1 ? process.argv[i + 1] : d; };
const DESTINO = arg('destino');
const ORIGEN = resolve(arg('origen', execFileSync('git', ['rev-parse', '--show-toplevel']).toString().trim()));
if (!DESTINO || !existsSync(join(DESTINO, '.git'))) { console.error('Uso: armar-corte.mjs --destino <worktree de origin/main> [--origen <worktree de la obra>]'); process.exit(2); }
const D = resolve(DESTINO);
const git = (...a) => execFileSync('git', a, { cwd: D, encoding: 'utf8' });
const sh = (cmd, ...a) => execFileSync(cmd, a, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'] });

// El destino tiene que ser origin/main, limpio.
const cabeza = git('rev-parse', 'HEAD').trim();
const main = git('rev-parse', 'origin/main').trim();
if (cabeza !== main) { console.error(`El destino no está en origin/main (HEAD ${cabeza.slice(0, 8)}, origin/main ${main.slice(0, 8)}). git fetch origin y rehacer el worktree.`); process.exit(1); }
if (git('status', '--porcelain').trim()) { console.error('El destino tiene cambios sin commitear.'); process.exit(1); }
console.log(`destino en origin/main ${main.slice(0, 8)}; obra en ${git('-C', ORIGEN, 'rev-parse', '--short', 'HEAD').trim()} (${ORIGEN})`);

// 1 · el árbol de la obra
sh('rsync', '-a', '--delete', '--exclude', 'node_modules', '--exclude', 'dist', '--exclude', '.astro', '--exclude', '.wrangler', '--exclude', '.DS_Store',
  join(ORIGEN, 'spindlelab-astro') + '/', join(D, 'spindlelab-astro') + '/');
console.log('1. spindlelab-astro/ del destino reemplazado por el de la obra');

// 2 · lo de producción que se queda como en main
const DE_MAIN = [
  'spindlelab-astro/functions',
  'spindlelab-astro/public/_headers',
  'spindlelab-astro/public/_redirects',
  'spindlelab-astro/public/js',
  'spindlelab-astro/public/privacidad',
  'spindlelab-astro/public/404.html',
  'spindlelab-astro/public/assets/css/style.css',
  'spindlelab-astro/public/assets/js/site-header.js',
];
for (const p of DE_MAIN) {
  git('checkout', 'origin/main', '--', p);
}
// Lo que esas páginas estáticas piden y la obra ya no trae (fuentes, favicon, imágenes del diseño anterior): solo se devuelve
// lo que alguna de ellas nombra. Lo demás del v2 sin lector (videos y heros de las páginas que se retiran) se queda borrado.
const piden = ['spindlelab-astro/public/404.html', 'spindlelab-astro/public/privacidad/index.html', 'spindlelab-astro/public/assets/css/style.css',
  'spindlelab-astro/public/assets/js/site-header.js', 'spindlelab-astro/public/js/consent-banner.js', 'spindlelab-astro/public/fonts/inter.css']
  .filter((f) => existsSync(join(D, f))).map((f) => readFileSync(join(D, f), 'utf8')).join('\n');
const faltan = git('diff', '--name-status', 'origin/main', '--', 'spindlelab-astro/public/assets', 'spindlelab-astro/public/fonts')
  .split('\n').filter((l) => l.startsWith('D')).map((l) => l.split('\t')[1]);
for (const f of faltan) {
  const nombre = f.split('/').pop();
  if (piden.includes(nombre)) { git('checkout', 'origin/main', '--', f); console.log(`   devuelto desde main (lo nombra una página estática): ${f}`); }
}
console.log(`2. devuelto desde main: ${DE_MAIN.map((p) => p.replace('spindlelab-astro/', '')).join(', ')}`);

// 3 · enlaces e iconos de las dos páginas estáticas
const ICONOS_V2 = '<link rel="icon" type="image/svg+xml" href="/assets/img/favicon.svg?v=4"><link rel="icon" type="image/png" sizes="32x32" href="/assets/img/favicon-32.png"><link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">';
const ICONOS_A = '<link rel="icon" sizes="48x48" href="/v3/marca/favicon.ico?v=6"><link rel="icon" type="image/png" sizes="16x16" href="/v3/marca/favicon-16.png?v=6"><link rel="icon" type="image/png" sizes="32x32" href="/v3/marca/favicon-32.png?v=6"><link rel="icon" type="image/png" sizes="48x48" href="/v3/marca/favicon-48.png?v=6"><link rel="apple-touch-icon" href="/v3/marca/apple-touch-icon.png?v=6">';
let cambios = 0;
for (const rel of ['spindlelab-astro/public/404.html', 'spindlelab-astro/public/privacidad/index.html']) {
  const f = join(D, rel);
  let t = readFileSync(f, 'utf8');
  const antes = t;
  t = t.replace('<li><a href="/#evidencia">Evidencia</a></li>', '<li><a href="/trabajo/">Trabajo</a></li>');
  t = t.replace('<li><a href="/blog/">El Taller</a></li>', '<li><a href="/blog/">Blog</a></li>');
  if (!t.includes(ICONOS_V2)) { console.error(`3. ${rel}: no trae los <link> de icono del v2 tal como los busca este paso; revisar a mano`); process.exit(1); }
  t = t.replace(ICONOS_V2, ICONOS_A);
  t = t.replace('<span>Marketing y crecimiento con IA para empresas que ya venden.</span>', '<span>Sitios web a medida y marketing con IA.</span>');
  if (t !== antes) { writeFileSync(f, t); cambios++; }
}
console.log(`3. enlaces e iconos de 404.html y /privacidad/ actualizados (${cambios} archivos)`);
const raiz = execFileSync('md5sum', [join(D, 'spindlelab-astro/public/favicon.ico'), join(D, 'spindlelab-astro/public/v3/marca/favicon.ico')], { encoding: 'utf8' })
  .split('\n').filter(Boolean).map((l) => l.split(' ')[0]);
console.log(`   /favicon.ico de la raíz ${raiz[0] === raiz[1] ? 'es el de Bruno (igual a /v3/marca/favicon.ico)' : 'NO es el de Bruno: copiar e13/logo/favicon.ico a public/favicon.ico'}`);

// 4 · documentos mínimos
const E13 = 'marketing/oficina/obras-web/spindlelab-v3/e13';
mkdirSync(join(D, E13), { recursive: true });
for (const f of ['brief-de-obra.md', 'spec-home.md', 'acta-qa.md', 'lista-publicacion.md', 'desvios.md']) {
  if (existsSync(join(ORIGEN, E13, f))) cpSync(join(ORIGEN, E13, f), join(D, E13, f));
  else console.log(`   (aviso) falta ${E13}/${f} en la obra`);
}
for (const carpeta of ['herramientas', 'lectura-fria']) {
  if (existsSync(join(ORIGEN, E13, carpeta))) cpSync(join(ORIGEN, E13, carpeta), join(D, E13, carpeta), { recursive: true });
}
console.log('4. documentos mínimos copiados a ' + E13);

// 5 · lo protegido, idéntico a main
const PROTEGIDO = ['spindlelab-astro/functions', 'spindlelab-astro/public/_headers', 'spindlelab-astro/public/_redirects', 'spindlelab-astro/public/js'];
const dif = git('diff', '--stat', 'origin/main', '--', ...PROTEGIDO).trim();
console.log('5. protegido (functions/, _headers, _redirects, public/js/) contra main: ' + (dif ? 'DIFIERE\n' + dif : 'idéntico'));
git('add', '-A', '--', 'spindlelab-astro', E13);
const estado = git('diff', '--cached', '--name-status', 'origin/main');
const cuenta = { A: 0, M: 0, D: 0, R: 0 };
for (const l of estado.split('\n').filter(Boolean)) cuenta[l[0]] = (cuenta[l[0]] || 0) + 1;
console.log(`\nResumen del corte contra origin/main (en el index del destino): ${JSON.stringify(cuenta)}`);
const fuera = estado.split('\n').filter(Boolean).filter((l) => { const p = l.split('\t').pop(); return !p.startsWith('spindlelab-astro/') && !p.startsWith(E13 + '/'); });
console.log(fuera.length ? 'FUERA DE LO PERMITIDO:\n' + fuera.join('\n') : 'Nada fuera de spindlelab-astro/ y de ' + E13 + '/');
const peso = git('diff', '--cached', '--stat', 'origin/main').trim().split('\n').pop();
console.log(peso);
