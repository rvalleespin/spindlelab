import * as nuevo from '/tmp/spl-main-wt/spindlelab-astro/functions/api/chequeo.js';
import { execFileSync } from 'node:child_process';

// La versión vieja sale del historial de git (c2616e9, la de antes de "El chequeo de
// /diagnostico/ deja de inventar informes"), igual que en prueba-gemelo-completa y
// prueba-robots. El import apuntaba a un ./chequeo-viejo.mjs que vivía en el scratchpad de una
// sesión y nunca se versionó, así que esta medición no corría en ningún otro lado. Se importa
// como data: para no escribir nada en disco.
const VIEJO = 'c2616e9dbe20d05d9e2edd973e76e7b7fdf9b09a';
const fuenteVieja = execFileSync('git', ['-C', '/tmp/spl-main-wt', 'show', `${VIEJO}:spindlelab-astro/functions/api/chequeo.js`]);
const viejo = await import('data:text/javascript;base64,' + fuenteVieja.toString('base64'));

// Una portada realista y pesada: mucho marcado repetido, varios bloques JSON-LD,
// formularios, scripts. Es el perfil de un WordPress grande, no ruido plano.
function portada(kb) {
  const bloque = `
<section class="tarjeta"><h2>Servicio</h2><p>Texto de relleno con <a href="/x">enlaces</a> y <strong>énfasis</strong>.</p>
<form action="/contacto"><input type="text" name="n"><input type="checkbox" name="acepto"> Acepto la política<button>Enviar</button></form>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"Service","name":"Servicio"}</script>
</section>`;
  const veces = Math.ceil((kb * 1024) / bloque.length);
  return `<!doctype html><html lang="es-CL"><head><title>Grande</title>
<meta name="description" content="Una descripción larga y normal para una portada pesada de verdad.">
<script type="application/ld+json">{"@context":"https://schema.org","@type":"Dentist","name":"X","sameAs":["https://a","https://b"]}</script>
</head><body><h1>Grande</h1>` + bloque.repeat(veces) + `</body></html>`;
}

function fake(html) {
  const rutas = {
    'https://ejemplo.cl/': html,
    'https://ejemplo.cl/robots.txt': 'User-agent: *\nAllow: /\n',
    'https://ejemplo.cl/llms.txt': '',
    'https://ejemplo.cl/sitemap.xml': '<?xml version="1.0"?><urlset><url><loc>https://ejemplo.cl/</loc></url></urlset>',
  };
  return async (url) => {
    const cuerpo = rutas[url] ?? '';
    return {
      status: url.endsWith('llms.txt') ? 404 : 200, url,
      headers: { get: (k) => k.toLowerCase() === 'content-length' ? String(new TextEncoder().encode(cuerpo).length) : (k.toLowerCase()==='server' ? 'nginx' : null) },
      text: async () => cuerpo,
    };
  };
}

console.log('tamaño   versión   tiempo (5 corridas, mediana)   puntaje');
for (const kb of [50, 500, 900, 2000, 2900]) {
  const html = portada(kb);
  const real = Math.round(new TextEncoder().encode(html).length / 1024);
  for (const [nombre, mod] of [['vieja', viejo], ['nueva', nuevo]]) {
    const t = [];
    let r;
    for (let i = 0; i < 5; i++) {
      const a = process.hrtime.bigint();
      r = await mod.chequear('ejemplo.cl', fake(html));
      t.push(Number(process.hrtime.bigint() - a) / 1e6);
    }
    t.sort((x, y) => x - y);
    const p = r.ok ? `${r.puntaje}/100` : 'sin informe';
    console.log(`${String(real).padStart(4)} KB  ${nombre.padEnd(8)} ${t[2].toFixed(1).padStart(8)} ms                    ${p}`);
  }
}
