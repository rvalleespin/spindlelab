/**
 * La portada DIBUJANDO los 12 puntos. Se levanta `verificaycumple/index.html` en un Chrome
 * de verdad, servido por HTTP, y se le contesta `/api/doce-puntos` con el cuerpo REAL que
 * produce `functions/api/doce-puntos.js`. Lo que se comprueba es lo que quedó en pantalla.
 *
 *   node prueba-portada-doce.mjs
 *
 * POR QUÉ EXISTE ESTA PRUEBA, que es lo que no hay que borrar de acá:
 *
 * El 26-sep la sección de los 12 puntos salía VACÍA en producción, por el camino de éxito y
 * sin un solo error en consola. La API contesta `{ ok, dominio, revisado, seccion }` con los
 * doce dentro de `seccion`, y la portada los buscaba en la raíz: `data.puntos` era
 * `undefined`, la lista salía de largo 0 y el código borraba la sección entera.
 *
 * Las 247 comprobaciones de `prueba-doce-puntos.mjs` no lo pillaron, y no podían: afirman la
 * forma anidada (`r.cuerpo.seccion.fuente`) contra el código que la produce. Las dos partes
 * salían del mismo supuesto, así que la prueba confirmaba el error en vez de encontrarlo. Es
 * la tercera vez que este equipo tropieza con lo mismo (ver LEEME.md, "el doble de prueba
 * miente").
 *
 * Por eso ESTA prueba no mira el JSON. Mira la pantalla:
 *   - el HTML de la portada es el archivo real, servido sin tocarle una línea;
 *   - los cuerpos de las tres APIs los genera el código real de los tres endpoints;
 *   - el sitio que se revisa es el propio Verifica y Cumple: su portada y su política, leídas
 *     del disco. Nada de HTML inventado para la ocasión;
 *   - quien decide si pasa es el navegador: si la sección queda vacía, falla.
 *
 * Esto es agnóstico a la forma del JSON a propósito. Si mañana alguien aplana la respuesta en
 * la API y se olvida de la portada, o al revés, esta prueba se cae igual. Esa es toda la
 * gracia: la prueba y el arreglo ya no salen del mismo supuesto.
 *
 * Rutas:
 *   VYC_SITIO       carpeta `verificaycumple/`. Sin ella, se busca en el repo (rutas.mjs),
 *                   que además imprime cuál eligió: una prueba que no dice qué archivo
 *                   cargó no deja descubrir que cargó el equivocado.
 *   VYC_INDEX_HTML  forzar el archivo `index.html` concreto.
 *   CHROME          binario de Chrome (default el Chrome del Mac).
 */

import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import os from 'node:os';
import { spawn } from 'node:child_process';
import { rutaEnElRepo } from './rutas.mjs';

const SITIO = process.env.VYC_SITIO
  || path.dirname(rutaEnElRepo('verificaycumple/index.html', 'VYC_INDEX_HTML'));
const CHROME = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

let ok = 0, malo = 0;
const eq = (n, r, e) => {
  if (JSON.stringify(r) === JSON.stringify(e)) ok++;
  else { malo++; console.log(`  FALLA ${n}: esperado ${JSON.stringify(e)}, real ${JSON.stringify(r)}`); }
};
const cierto = (n, r) => eq(n, !!r, true);

for (const f of ['index.html', 'privacidad/index.html', 'functions/api/doce-puntos.js',
  'functions/api/chequeo.js', 'functions/api/profundo.js']) {
  if (!fs.existsSync(path.join(SITIO, f))) {
    console.log(`No encuentro ${f} bajo ${SITIO}. Pasa VYC_SITIO con la carpeta verificaycumple/.`);
    process.exit(1);
  }
}
if (!fs.existsSync(CHROME)) {
  console.log(`No encuentro Chrome en ${CHROME}. Pasa CHROME con la ruta al binario.`);
  process.exit(1);
}

const doce = await import(path.join(SITIO, 'functions/api/doce-puntos.js'));
const chequeoMod = await import(path.join(SITIO, 'functions/api/chequeo.js'));
const profundoMod = await import(path.join(SITIO, 'functions/api/profundo.js'));

const PORTADA_REAL = fs.readFileSync(path.join(SITIO, 'index.html'), 'utf8');
const POLITICA_REAL = fs.readFileSync(path.join(SITIO, 'privacidad/index.html'), 'utf8');

/* ================================================================== *
 * 1. Los cuerpos reales de las tres APIs.                             *
 *                                                                     *
 * El doble es el SITIO REVISADO, no la respuesta: lo que se le sirve  *
 * al endpoint son dos páginas del propio Verifica y Cumple leídas del *
 * disco, y la respuesta la calcula su código sin ayuda.               *
 * ================================================================== */

function respuesta(cuerpo, status, url) {
  const bytes = new TextEncoder().encode(cuerpo);
  return {
    status, url,
    headers: { get: (k) => (k.toLowerCase() === 'content-length' ? String(bytes.length) : null) },
    get body() { return new ReadableStream({ start(c) { c.enqueue(bytes); c.close(); } }); },
    clone() { return respuesta(cuerpo, status, url); },
    text: async () => cuerpo,
  };
}

// Corre un endpoint con el sitio de mentira puesto en `globalThis.fetch`, que es de donde
// los tres sacan las páginas del prospecto.
async function correr(modulo, ruta, rutas, { env = {}, ip = '' } = {}) {
  const anterior = globalThis.fetch;
  globalThis.fetch = async (url) => {
    const r = rutas[String(url)];
    if (r === undefined) throw new Error('no conecta: ' + url);
    return respuesta(r, 200, String(url));
  };
  try {
    const request = {
      url: 'https://verifica.spindlelab.cl' + ruta,
      headers: { get: (k) => (k === 'CF-Connecting-IP' ? ip : null) },
    };
    const r = await modulo.onRequestGet({ request, env });
    return { status: r.status, texto: await r.text() };
  } finally { globalThis.fetch = anterior; }
}

const CON_POLITICA = {
  'https://ejemplo.cl/': PORTADA_REAL,
  'https://ejemplo.cl/privacidad/': POLITICA_REAL,
};
// El mismo sitio, con el enlace a la política apuntando a una página que no abre. Es el caso
// del enlace muerto, que es donde la sección tiene que salir entera y en gris.
const SIN_POLITICA = { 'https://ejemplo.cl/': PORTADA_REAL };

const DOMINIO = 'ejemplo.cl';
const RUTA_CHEQUEO = '/api/chequeo?dominio=' + DOMINIO;
const RUTA_DOCE = '/api/doce-puntos?dominio=' + DOMINIO;

const cuerpoChequeo = await correr(chequeoMod, RUTA_CHEQUEO, CON_POLITICA);
const cuerpoDoceLegible = await correr(doce, RUTA_DOCE, CON_POLITICA);
const cuerpoDoceSinLeer = await correr(doce, RUTA_DOCE, SIN_POLITICA);
// Sin binding de navegador la revisión profunda declina, que es lo que pasa en local y lo que
// activa la costura ("A tu política sí llegamos, aunque a tu sitio no").
const cuerpoProfundo = await correr(profundoMod, '/api/profundo?dominio=' + DOMINIO, CON_POLITICA);
// Y el tope diario alcanzado: la API contesta ok:false. La sección tampoco puede evaporarse ahí.
const kvLleno = {
  get: async (k) => (k.includes('tope:doce:ip') ? String(profundoMod.TOPE_IP_DIA) : null),
  put: async () => {},
};
const cuerpoDoceTope = await correr(doce, RUTA_DOCE, CON_POLITICA,
  { env: { VYC_TOPES: kvLleno }, ip: '9.9.9.9' });

console.log('=== los cuerpos que se le van a servir a la portada ===');
const jDoceLegible = JSON.parse(cuerpoDoceLegible.texto);
const jDoceSinLeer = JSON.parse(cuerpoDoceSinLeer.texto);
const jDoceTope = JSON.parse(cuerpoDoceTope.texto);
eq('el chequeo rápido sale bien', JSON.parse(cuerpoChequeo.texto).ok, true);
eq('los 12 puntos salen bien', jDoceLegible.ok, true);
eq('con la política leída', (jDoceLegible.seccion || {}).legible, true);
eq('y con los doce', ((jDoceLegible.seccion || {}).puntos || []).length, 12);
eq('sin política legible también salen los doce', ((jDoceSinLeer.seccion || {}).puntos || []).length, 12);
eq('con el tope alcanzado, la API declina', jDoceTope.ok, false);
eq('y el profundo declina sin navegador', JSON.parse(cuerpoProfundo.texto).ok, false);

/* ================================================================== *
 * 2. La portada, en Chrome, servida por HTTP.                         *
 * ================================================================== */

// Lo único que se le agrega a la página es este conductor, al final del body: llena el campo,
// aprieta el botón como lo haría una persona, espera, y deja lo que quedó DIBUJADO en un
// marcador que se lee desde fuera. No toca ni una línea de la portada ni intercepta su fetch.
const CONDUCTOR = `
<script>
(function () {
  function entregar(informe) {
    var bytes = new TextEncoder().encode(JSON.stringify(informe));
    var bin = '';
    for (var i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
    document.documentElement.textContent = 'RESULTADO:' + btoa(bin);
  }
  // Red de seguridad: si el envío del formulario llegara a navegar de verdad, el servidor
  // vuelve a servir esta misma página con este mismo conductor y el navegador se queda en un
  // bucle de envíos hasta que alguien lo mate. Acá se corta y se dice.
  if (location.search) { entregar({ fatal: 'el envío navegó: ' + location.href }); return; }
  window.addEventListener('error', function (e) { window.__roto = String(e.message); });
  window.addEventListener('load', function () {
    var input = document.getElementById('dominio');
    var form = document.getElementById('form-chequeo');
    if (!input || !form) { entregar({ fatal: 'la portada no trae el formulario del chequeo' }); return; }
    input.value = ${JSON.stringify(DOMINIO)};
    if (form.requestSubmit) form.requestSubmit();
    else form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    setTimeout(function () {
      var d = document.getElementById('doce-puntos');
      var p = document.getElementById('profundo');
      if (!d) { entregar({ fatal: 'la portada no trae el contenedor #doce-puntos' }); return; }
      entregar({
        roto: window.__roto || '',
        largo: d.innerHTML.length,
        texto: d.textContent,
        items: d.querySelectorAll('li').length,
        verdes: d.querySelectorAll('.marca-estado.ok').length,
        grises: d.querySelectorAll('.marca-estado.sin-confirmar').length,
        titulo: (d.querySelector('h2') || { textContent: '' }).textContent,
        profundo: p ? p.textContent : '',
        rapido: (document.getElementById('resultado') || { textContent: '' }).textContent
      });
    }, 4000);
  });
})();
<\/script>
`;

const TIPOS = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.webp': 'image/webp', '.woff2': 'font/woff2', '.ico': 'image/x-icon',
};

// Levanta la portada real y contesta las tres APIs con los cuerpos que ya se calcularon.
function servidor(respuestas) {
  return http.createServer((req, res) => {
    const ruta = req.url.split('?')[0];
    const api = respuestas[ruta];
    if (api) {
      res.writeHead(api.status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
      res.end(api.texto);
      return;
    }
    if (ruta === '/' || ruta === '/index.html') {
      const html = PORTADA_REAL.replace('</body>', CONDUCTOR + '</body>');
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(html);
      return;
    }
    const enDisco = path.join(SITIO, ruta.replace(/^\/+/, ''));
    if (enDisco.startsWith(SITIO) && fs.existsSync(enDisco) && fs.statSync(enDisco).isFile()) {
      res.writeHead(200, { 'Content-Type': TIPOS[path.extname(enDisco)] || 'application/octet-stream' });
      res.end(fs.readFileSync(enDisco));
      return;
    }
    res.writeHead(404); res.end('');
  });
}

async function enPantalla(respuestas) {
  const s = servidor(respuestas);
  await new Promise((r) => s.listen(0, '127.0.0.1', r));
  const puerto = s.address().port;
  const perfil = fs.mkdtempSync(path.join(os.tmpdir(), 'vyc-chrome-'));
  try {
    // --virtual-time-budget adelanta los temporizadores pero se detiene mientras haya
    // peticiones en vuelo, así que las tres APIs alcanzan a contestar de verdad. El
    // presupuesto queda por encima de los 4 s del conductor y por debajo de los 75 s del
    // plazo del chequeo profundo, que no tiene que dispararse.
    //
    // NO se espera a que Chrome termine, y esto costó dos horas de creerle a la prueba
    // colgada en vez de al reloj: con un perfil recién creado, Chrome escribe el DOM en
    // stdout y después NO se muere (con un perfil reusado sí). Ni el `timeout` de
    // execFileSync ni esperar el evento 'close' sirven, porque los procesos hijos siguen
    // colgados del mismo pipe. Así que se espera al DOM —que termina en </html>— y ahí se
    // mata el grupo entero. El plazo largo es solo la red de abajo.
    const dom = await new Promise((listo) => {
      const ch = spawn(CHROME, [
        '--headless', '--disable-gpu', '--no-sandbox', '--no-first-run',
        '--disable-extensions', '--user-data-dir=' + perfil,
        '--virtual-time-budget=20000', '--dump-dom', `http://127.0.0.1:${puerto}/`,
      ], { stdio: ['ignore', 'pipe', 'ignore'], detached: true });
      let salida = '';
      let cerrado = false;
      let muerte = null;
      const matar = () => { try { process.kill(-ch.pid, 'SIGKILL'); } catch { try { ch.kill('SIGKILL'); } catch {} } };
      const fin = () => { if (cerrado) return; cerrado = true; clearTimeout(muerte); matar(); listo(salida); };
      muerte = setTimeout(fin, 90000);
      ch.stdout.on('data', (d) => { salida += d; if (salida.includes('</html>')) fin(); });
      ch.on('close', fin);
      ch.on('error', fin);
    });
    const m = /RESULTADO:([A-Za-z0-9+/=]+)/.exec(dom);
    if (!m) return { fatal: 'la portada no llegó a entregar nada', dom: dom.slice(0, 400) };
    return JSON.parse(Buffer.from(m[1], 'base64').toString('utf8'));
  } finally {
    s.close();
    fs.rmSync(perfil, { recursive: true, force: true });
  }
}

/* ================================================================== *
 * 3. Política legible: los doce tienen que estar EN PANTALLA.         *
 * ================================================================== */

console.log('=== la política se pudo leer: la sección se dibuja con los doce ===');
{
  const v = await enPantalla({
    [RUTA_CHEQUEO.split('?')[0]]: cuerpoChequeo,
    '/api/doce-puntos': cuerpoDoceLegible,
    '/api/profundo': cuerpoProfundo,
  });
  eq('la portada entregó su informe', v.fatal || '', '');
  if (v.fatal) console.log('   ' + JSON.stringify(v.dom || ''));
  eq('ningún error de JavaScript', v.roto || '', '');
  // La que habría pillado el error del 26-sep: la sección salía con largo 0.
  cierto('la sección NO quedó vacía', (v.largo || 0) > 0);
  eq('hay doce ítems dibujados', v.items, 12);

  const s = jDoceLegible.seccion;
  eq('el título de la sección es el que mandó la API', v.titulo, s.titulo);
  for (const p of s.puntos) {
    cierto(`el punto ${p.letra}) está en pantalla`, (v.texto || '').includes(p.titulo));
  }
  cierto('dice de dónde leyó la política', (v.texto || '').includes(s.fuente));
  cierto('y se marca como informativo', /Informativo/.test(v.texto || ''));

  // Verde solo lo confirmado, y solo lo que la API confirmó entero: los puntos que la API dio
  // por encontrados PERO con algo faltando no pueden salir con visto. El número no se escribe
  // a mano, se cuenta de la respuesta.
  const enteros = s.puntos.filter((p) => p.estado === 'encontrado' && (p.faltan || []).length === 0).length;
  eq('hay un visto por cada punto confirmado entero', v.verdes, enteros);
  eq('y el resto queda sin confirmar', v.grises, 12 - enteros);

  // La costura entre las dos secciones: el navegador no abrió, así que la lista tiene que
  // decir por qué ella sí pudo hablar.
  cierto('la sección dice que la lista no depende del navegador',
    (v.texto || '').includes('no de abrir tu sitio en un navegador'));
  cierto('y que a la política sí se llegó',
    (v.texto || '').includes('A tu política sí llegamos'));
}

/* ================================================================== *
 * 4. Política que no se pudo leer: la sección igual sale, en gris.    *
 * ================================================================== */

console.log('=== la política no se pudo leer: los doce igual salen, y ninguno en verde ===');
{
  const v = await enPantalla({
    [RUTA_CHEQUEO.split('?')[0]]: cuerpoChequeo,
    '/api/doce-puntos': cuerpoDoceSinLeer,
    '/api/profundo': cuerpoProfundo,
  });
  eq('la portada entregó su informe', v.fatal || '', '');
  eq('ningún error de JavaScript', v.roto || '', '');
  cierto('la sección NO quedó vacía', (v.largo || 0) > 0);
  eq('los doce siguen dibujados', v.items, 12);
  // El principio del producto, comprobado donde se ve: nada sin confirmar sale en verde.
  eq('ni un solo visto verde', v.verdes, 0);
  eq('los doce quedan sin confirmar', v.grises, 12);
  cierto('y se explica por qué', (v.texto || '').includes(jDoceSinLeer.seccion.aviso));
}

/* ================================================================== *
 * 5. La API declina: la sección tampoco puede evaporarse.             *
 * ================================================================== */

console.log('=== la API declina: sale el bloque de falla, no un hueco ===');
{
  const v = await enPantalla({
    [RUTA_CHEQUEO.split('?')[0]]: cuerpoChequeo,
    '/api/doce-puntos': cuerpoDoceTope,
    '/api/profundo': cuerpoProfundo,
  });
  eq('la portada entregó su informe', v.fatal || '', '');
  eq('ningún error de JavaScript', v.roto || '', '');
  cierto('la sección NO quedó vacía', (v.largo || 0) > 0);
  cierto('se muestra el mensaje que mandó la API', (v.texto || '').includes(jDoceTope.error));
  eq('y no se pinta ningún visto verde', v.verdes, 0);
  cierto('el informe rápido de arriba sigue en pie', (v.rapido || '').length > 0);
}

console.log(`\n${ok} bien, ${malo} mal`);
process.exit(malo ? 1 : 0);
