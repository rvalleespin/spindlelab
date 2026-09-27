/**
 * "Volver a medirlo" cuando la revisión nueva no sale: el informe que la persona estaba
 * leyendo NO puede desaparecer. Se levanta `verificaycumple/index.html` en un Chrome de
 * verdad, servido por HTTP, y las tres APIs las contesta el código real de `functions/api/`.
 *
 *   node prueba-portada-rehacer.mjs
 *
 * POR QUÉ EXISTE:
 *
 * `rehacer=1` se empezó a honrar el 25-sep (antes el botón prometía una medición nueva y
 * devolvía la guardada). Eso abrió un caso que nadie miró: la lectura de la caché se salta,
 * los contadores no, y con el cupo del día agotado la API contesta una falla. La portada
 * llamaba a `renderFallaProfunda`, que pisaba la sección entera, y el informe que la persona
 * tenía en pantalla —el que pidió, el que esperó medio minuto— se perdía por apretar un
 * botón. Se recuperaba reenviando el formulario, pero eso no lo dice nadie.
 *
 * Y la tarjeta de falla terminaba en "si necesitas más ahora, escríbenos" sin decir dónde:
 * sus dos párrafos pasan por `escapar()`, así que el texto de la API no puede traer enlace.
 *
 * Esta prueba no mira el JSON de la API ni el código de la portada: mira lo que queda EN
 * PANTALLA después de apretar el botón. El informe guardado es una medición real de uhc.cl
 * (`medidas-25sep/uhc.json`, Chrome por CDP el 25-sep) pasada por el `armarInforme` de
 * verdad; el tope del día lo produce el `profundo()` de verdad contra una KV falsa con el
 * contador ya en su tope. Lo único de mentira es la KV y el sitio que se le sirve al chequeo
 * rápido.
 *
 * LA COSTURA CON LOS 12 PUNTOS, Y LA ASERCIÓN QUE NO PODÍA FALLAR (26-sep):
 *
 * La portada decide con `falloElNavegador = !informeGuardado` si la lista de los 12 puntos
 * tiene que agregar "A tu política sí llegamos, aunque a tu sitio no". Con el informe
 * guardado abajo esa frase es FALSA: al sitio sí llegamos, en la medición que sigue en
 * pantalla.
 *
 * La versión anterior de esta prueba afirmaba eso buscando la frase en el DOM… mientras le
 * contestaba `{ ok: false }` a `/api/doce-puntos`. Con ese cuerpo `renderDocePuntos` no
 * corre nunca, la frase no puede aparecer bajo NINGUNA implementación, y la aserción daba
 * verde con el arreglo puesto, con el arreglo revertido y con la costura forzada a emitirse
 * siempre. Era la única prueba de ese arreglo, así que el arreglo estaba sin cubrir.
 *
 * Ahora `/api/doce-puntos` la contesta su código real, la lista se dibuja de verdad, y la
 * costura se comprueba por los DOS lados:
 *   - con informe guardado (caso 1), la lista NO puede decir que no llegamos al sitio;
 *   - sin nada que conservar (caso 2), la lista SÍ tiene que decirlo.
 * Y antes de afirmar cualquiera de las dos cosas se comprueba que la lista esté dibujada con
 * sus doce ítems. Una frase que falta porque la sección está vacía no prueba nada.
 *
 * Rutas, igual que `prueba-portada-doce.mjs`:
 *   VYC_SITIO       carpeta `verificaycumple/`. Sin ella, se busca en el repo (rutas.mjs),
 *                   que además imprime cuál eligió.
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
const MEDIDAS = new URL('./medidas-25sep/', import.meta.url);

let ok = 0, malo = 0;
const eq = (n, r, e) => {
  if (JSON.stringify(r) === JSON.stringify(e)) ok++;
  else { malo++; console.log(`  FALLA ${n}: esperado ${JSON.stringify(e)}, real ${JSON.stringify(r)}`); }
};
const cierto = (n, r) => eq(n, !!r, true);
const falso = (n, r) => eq(n, !!r, false);

for (const f of ['index.html', 'privacidad/index.html', 'functions/api/chequeo.js',
  'functions/api/profundo.js', 'functions/api/doce-puntos.js']) {
  if (!fs.existsSync(path.join(SITIO, f))) {
    console.log(`No encuentro ${f} bajo ${SITIO}. Pasa VYC_SITIO con la carpeta verificaycumple/.`);
    process.exit(1);
  }
}
if (!fs.existsSync(CHROME)) {
  console.log(`No encuentro Chrome en ${CHROME}. Pasa CHROME con la ruta al binario.`);
  process.exit(1);
}

const chequeoMod = await import(path.join(SITIO, 'functions/api/chequeo.js'));
const profundoMod = await import(path.join(SITIO, 'functions/api/profundo.js'));
const doceMod = await import(path.join(SITIO, 'functions/api/doce-puntos.js'));

const PORTADA_REAL = fs.readFileSync(path.join(SITIO, 'index.html'), 'utf8');
const POLITICA_REAL = fs.readFileSync(path.join(SITIO, 'privacidad/index.html'), 'utf8');

const DOMINIO = 'uhc.cl';          // el que llega con informe guardado
const DOMINIO_SIN = 'pdnd.cl';     // el que falla de entrada, sin nada que conservar
const IP = '9.9.9.9';

// La frase que la portada agrega a la lista de los 12 SOLO cuando el navegador no abrió el
// sitio. Se escribe una vez acá porque las dos mitades de la costura la usan, una para
// exigirla y la otra para prohibirla.
const FRASE_NO_LLEGAMOS = 'aunque a tu sitio no';

/* ================================================================== *
 * 1. Lo que va a contestar la API: su propio código.                  *
 * ================================================================== */

// El informe guardado es una medición REAL, la misma que usa prueba-profundo.mjs §22.
const medicion = JSON.parse(fs.readFileSync(new URL('uhc.json', MEDIDAS), 'utf8'));
const informeGuardado = profundoMod.armarInforme(medicion, DOMINIO);
eq('la medición real produce un informe', informeGuardado.ok, true);

// La KV: la caché tiene el informe de uhc.cl, y el contador por IP ya está en su tope. Es
// exactamente el estado en el que `rehacer=1` se salta la caché y choca con el contador.
// Los 12 puntos llevan su propio contador, con otro prefijo ('tope:doce'), así que este tope
// no los toca: la lista tiene que salir igual, y de eso depende la mitad de esta prueba.
const hoy = new Date().toISOString().slice(0, 10);
const kv = new Map([
  [`cache:${DOMINIO}`, JSON.stringify(informeGuardado)],
  [`tope:ip:${hoy}:${IP}`, String(profundoMod.TOPE_IP_DIA)],
  [`tope:global:${hoy}`, '0'],
]);
const kvFalsa = {
  async get(k, o) { const v = kv.get(k); return v === undefined ? null : (o?.type === 'json' ? JSON.parse(v) : v); },
  async put(k, v) { kv.set(k, v); },
};

// El sitio que se le sirve al chequeo rápido y al de los 12 puntos es la portada y la
// política del propio Verifica y Cumple, leídas del disco, como en prueba-portada-doce.mjs.
// Acá no se prueba ninguno de los dos: se prueba lo que pasa con el informe profundo
// después, y para llegar ahí la portada necesita que el rápido salga y que la lista esté.
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
const SITIO_FALSO = {
  [`https://${DOMINIO}/`]: PORTADA_REAL,
  [`https://${DOMINIO}/privacidad/`]: POLITICA_REAL,
  [`https://${DOMINIO_SIN}/`]: PORTADA_REAL,
  [`https://${DOMINIO_SIN}/privacidad/`]: POLITICA_REAL,
};
async function correr(modulo, url, env = {}) {
  const anterior = globalThis.fetch;
  globalThis.fetch = async (u) => {
    const r = SITIO_FALSO[String(u)];
    if (r === undefined) throw new Error('no conecta: ' + u);
    return respuesta(r, 200, String(u));
  };
  try {
    const request = {
      url: 'https://verifica.spindlelab.cl' + url,
      headers: { get: (k) => (k === 'CF-Connecting-IP' ? IP : null) },
    };
    const r = await modulo.onRequestGet({ request, env });
    return { status: r.status, texto: await r.text() };
  } finally { globalThis.fetch = anterior; }
}

// Se comprueba ANTES de levantar el navegador que el cuerpo de los 12 puntos es el bueno. Si
// la API declinara, la lista no se dibujaría y las dos aserciones de la costura volverían a
// no poder fallar, que es justo el defecto que esta versión viene a cerrar.
const cuerpoDoce = JSON.parse((await correr(doceMod, '/api/doce-puntos?dominio=' + DOMINIO,
  { VYC_TOPES: kvFalsa })).texto);
eq('la API de los 12 puntos contesta bien', cuerpoDoce.ok, true);
eq('y manda los doce', ((cuerpoDoce.seccion || {}).puntos || []).length, 12);

/* ================================================================== *
 * 2. El servidor: la portada real y las APIs, vivas.                  *
 * ================================================================== */

const TIPOS = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.webp': 'image/webp', '.woff2': 'font/woff2', '.ico': 'image/x-icon',
};

const conductor = (dominio) => `
<script>
(function () {
  function entregar(informe) {
    var bytes = new TextEncoder().encode(JSON.stringify(informe));
    var bin = '';
    for (var i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
    document.documentElement.textContent = 'RESULTADO:' + btoa(bin);
  }
  if (location.search) { entregar({ fatal: 'el envío navegó: ' + location.href }); return; }
  window.addEventListener('error', function (e) { window.__roto = String(e.message); });
  function esperar(hay, hasta, sigue) {
    var t0 = Date.now();
    (function mirar() {
      if (hay()) return sigue(true);
      if (Date.now() - t0 > hasta) return sigue(false);
      setTimeout(mirar, 50);
    })();
  }
  function doceDibujados() {
    var d = document.getElementById('doce-puntos');
    return d ? d.querySelectorAll('.items li').length : 0;
  }
  function foto(prof) {
    var enlace = prof.querySelector('.profundo-falla a');
    var doce = document.getElementById('doce-puntos');
    return {
      texto: prof.textContent,
      largo: prof.innerHTML.length,
      falla: !!prof.querySelector('.profundo-falla'),
      textoFalla: (prof.querySelector('.profundo-falla') || { textContent: '' }).textContent,
      enlace: enlace ? enlace.getAttribute('href') : null,
      textoEnlace: enlace ? enlace.textContent : null,
      puntaje: !!prof.querySelector('.puntaje-caja'),
      items: prof.querySelectorAll('.items li').length,
      boton: !!prof.querySelector('.rehacer-profundo'),
      titulos: Array.prototype.map.call(prof.querySelectorAll('h2'), function (h) { return h.textContent; }),
      hablado: (document.getElementById('estado-profundo') || { textContent: '' }).textContent,
      doce: doce ? doce.textContent : '',
      doceItems: doceDibujados()
    };
  }
  window.addEventListener('load', function () {
    var input = document.getElementById('dominio');
    var form = document.getElementById('form-chequeo');
    var prof = document.getElementById('profundo');
    if (!input || !form || !prof) { entregar({ fatal: 'la portada no trae el formulario o #profundo' }); return; }
    input.value = '${dominio}';
    if (form.requestSubmit) form.requestSubmit();
    else form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    // Se espera a las DOS secciones, no solo al informe profundo. En producción la lista de
    // los 12 aterriza a los 2 s y el informe del navegador entre 20 y 25 s después, así que
    // cuando aparece el botón la lista ya está; acá el informe viene de la caché y contesta
    // en milisegundos, y sin esta espera se podría apretar el botón antes de que la lista
    // llegue. Si se apretara antes, la respuesta de los 12 llega con la corrida ya cambiada,
    // la portada la descarta y la sección queda vacía: entonces "no dice la frase" volvería
    // a ser cierto por no haber nada escrito, que es exactamente el agujero que se cerró.
    var listo = function () {
      return (prof.querySelector('.puntaje-caja') || prof.querySelector('.profundo-falla')) && doceDibujados() >= 12;
    };
    esperar(listo, 12000, function (llego) {
      var antes = foto(prof);
      antes.llego = llego;
      var b = prof.querySelector('.rehacer-profundo');
      if (!b) { entregar({ antes: antes, despues: null, roto: window.__roto || '' }); return; }
      b.click();
      esperar(function () { return prof.querySelector('.profundo-falla'); }, 12000, function () {
        setTimeout(function () {
          entregar({ antes: antes, despues: foto(prof), roto: window.__roto || '' });
        }, 300);
      });
    });
  });
})();
<\/script>
`;

function servidor(dominio) {
  return http.createServer(async (req, res) => {
    const url = new URL(req.url, 'http://127.0.0.1');
    const ruta = url.pathname;
    try {
      if (ruta === '/api/chequeo') {
        const r = await correr(chequeoMod, req.url);
        res.writeHead(r.status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
        return res.end(r.texto);
      }
      if (ruta === '/api/profundo') {
        const r = await correr(profundoMod, req.url, { VYC_TOPES: kvFalsa });
        res.writeHead(r.status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
        return res.end(r.texto);
      }
      if (ruta === '/api/doce-puntos') {
        // Su código real, contra el mismo sitio de disco. No es lo que se prueba acá, pero
        // tiene que salir bien: la costura entre las dos secciones solo se puede comprobar
        // si la lista está dibujada.
        const r = await correr(doceMod, req.url, { VYC_TOPES: kvFalsa });
        res.writeHead(r.status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
        return res.end(r.texto);
      }
    } catch (e) {
      res.writeHead(500); return res.end(String(e && e.stack || e));
    }
    if (ruta === '/' || ruta === '/index.html') {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      return res.end(PORTADA_REAL.replace('</body>', conductor(dominio) + '</body>'));
    }
    const enDisco = path.join(SITIO, ruta.replace(/^\/+/, ''));
    if (enDisco.startsWith(SITIO) && fs.existsSync(enDisco) && fs.statSync(enDisco).isFile()) {
      res.writeHead(200, { 'Content-Type': TIPOS[path.extname(enDisco)] || 'application/octet-stream' });
      return res.end(fs.readFileSync(enDisco));
    }
    res.writeHead(404); res.end('');
  });
}

async function enPantalla(dominio) {
  const s = servidor(dominio);
  await new Promise((r) => s.listen(0, '127.0.0.1', r));
  const puerto = s.address().port;
  const perfil = fs.mkdtempSync(path.join(os.tmpdir(), 'vyc-chrome-'));
  try {
    // NO se espera a que Chrome termine: con un perfil recién creado escribe el DOM en
    // stdout y después no se muere, y los procesos hijos siguen colgados del mismo pipe, así
    // que ni el evento 'close' ni un timeout del padre sirven. Se espera al DOM —que termina
    // en </html>— y ahí se mata el grupo entero. Es la misma receta de
    // prueba-portada-doce.mjs, y acá bajó la corrida de 3 minutos a unos segundos.
    const dom = await new Promise((listo) => {
      const ch = spawn(CHROME, [
        '--headless', '--disable-gpu', '--no-sandbox', '--no-first-run',
        '--disable-extensions', '--user-data-dir=' + perfil,
        '--virtual-time-budget=30000', '--dump-dom', `http://127.0.0.1:${puerto}/`,
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
    if (!m) return { fatal: 'la portada no llegó a entregar nada', dom: dom.slice(0, 500) };
    return JSON.parse(Buffer.from(m[1], 'base64').toString('utf8'));
  } finally {
    s.close();
    fs.rmSync(perfil, { recursive: true, force: true });
  }
}

/* ================================================================== *
 * 3. El caso: informe en pantalla y el cupo agotado.                  *
 * ================================================================== */

console.log('=== 1. el tope del día no puede borrar el informe que la persona está leyendo ===');
const v = await enPantalla(DOMINIO);
if (v.fatal) { console.log('  FATAL: ' + v.fatal + '\n' + (v.dom || '')); malo++; }
else {
  eq('ningún error de JavaScript', v.roto || '', '');
  cierto('llegó el informe guardado', v.antes && v.antes.puntaje);
  cierto('y con su botón "Volver a medirlo"', v.antes && v.antes.boton);
  const itemsAntes = v.antes.items;
  cierto('con sus hallazgos dibujados', itemsAntes > 0);
  // La precondición de la costura, afirmada y no supuesta.
  eq('y la lista de los 12 está dibujada antes de apretar nada', v.antes.doceItems, 12);
  falso('que todavía no dice que no llegamos al sitio',
    String(v.antes.doce || '').includes(FRASE_NO_LLEGAMOS));

  const d = v.despues || {};
  cierto('apretar el botón deja una tarjeta de falla', d.falla);
  // LO QUE ESTA PRUEBA EXISTE PARA CUIDAR.
  cierto('el informe sigue en pantalla', d.puntaje);
  eq('con los mismos hallazgos', d.items, itemsAntes);
  cierto('y el botón sigue, por si mañana quiere reintentar', d.boton);

  // El mensaje es el del módulo, no una copia escrita acá.
  const tope = profundoMod.FALLAS['tope-ip'].mensaje;
  cierto('la tarjeta trae el mensaje del tope', (d.textoFalla || '').includes(tope));
  cierto('y dice que lo de abajo es lo que ya tenía',
    /sigue acá abajo/.test(d.textoFalla || ''));
  // El aviso hablado, que es lo único que recibe quien usa lector de pantalla.
  cierto('el aviso hablado también lo dice', /sigue abajo/.test(d.hablado || ''));

  // El enlace que faltaba: "escríbenos" sin dirección no es un camino.
  cierto('el mensaje invita a escribir', /escríbenos/i.test(d.textoFalla || ''));
  eq('y hay un enlace de correo', String(d.enlace || '').split('?')[0], 'mailto:hola@spindlelab.cl');
  cierto('con la dirección escrita, no solo en el href',
    /hola@spindlelab\.cl/.test(d.textoEnlace || ''));

  // LA COSTURA, primera mitad. El navegador SÍ abrió el sitio —el informe está ahí mismo—,
  // así que la lista no puede decir lo contrario. Primero se afirma que la lista SIGUE
  // dibujada: sin eso, "no dice la frase" se cumpliría también con la sección vacía, que es
  // como esta aserción pasaba antes bajo cualquier implementación.
  eq('la lista de los 12 sigue dibujada después de la falla', d.doceItems, 12);
  cierto('y sigue diciendo de dónde salió',
    /no de abrir tu sitio en un navegador/.test(d.doce || ''));
  falso('la lista de los 12 no dice que no llegamos al sitio',
    String(d.doce || '').includes(FRASE_NO_LLEGAMOS));
}

console.log('=== 2. sin nada que conservar, la falla se ve como siempre (y con dirección) ===');
const w = await enPantalla(DOMINIO_SIN);
if (w.fatal) { console.log('  FATAL: ' + w.fatal + '\n' + (w.dom || '')); malo++; }
else {
  const a = w.antes || {};
  eq('ningún error de JavaScript', w.roto || '', '');
  cierto('la revisión profunda falla de entrada', a.falla);
  falso('no hay informe que mostrar', a.puntaje);
  cierto('la tarjeta lleva su título', (a.titulos || []).includes('La revisión con navegador'));
  cierto('y la frase que impide leerla como buena noticia',
    /Lo de arriba sigue en pie/.test(a.textoFalla || ''));
  eq('con el mismo enlace de correo', String(a.enlace || '').split('?')[0], 'mailto:hola@spindlelab.cl');
  falso('y sin prometer un informe que no está', /sigue acá abajo/.test(a.textoFalla || ''));

  // LA COSTURA, segunda mitad, y la que le da sentido a la primera. Acá el navegador de
  // verdad no abrió nada y no hay informe guardado que lo desmienta, así que la lista TIENE
  // que decir por qué ella sí pudo hablar. Si esta no estuviera, "no dice la frase" del caso
  // 1 se cumpliría con una portada que no dijera la frase nunca.
  eq('la lista de los 12 igual se dibujó', a.doceItems, 12);
  cierto('y dice que a la política sí se llegó', /A tu política sí llegamos/.test(a.doce || ''));
  cierto('y que al sitio no', String(a.doce || '').includes(FRASE_NO_LLEGAMOS));
}

console.log(`\n${ok} bien, ${malo} mal`);
process.exit(malo ? 1 : 0);
