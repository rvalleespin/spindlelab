/**
 * El párrafo de cierre del chequeo profundo, mirado EN PANTALLA.
 *
 *   node prueba-portada-cierre.mjs
 *
 * POR QUÉ EXISTE:
 *
 * El 26-sep se acotaron los cuatro ítems en verde: dejaron de afirmar en absoluto que el
 * sitio no cargó rastreadores y pasaron a decir "de los que buscamos", porque eso es lo
 * único que el catálogo permite saber. El párrafo de cierre del informe se quedó atrás y
 * seguía diciendo "tu sitio no cargó rastreadores ni guardó nada antes de pedir permiso".
 *
 * No es una frase menor: es la más citable del informe, la que queda en la captura de
 * pantalla, y la que se lee DESPUÉS de instalar el kit, cuando el gestor ya está puesto. Es
 * el momento del producto en que menos se puede prometer de más.
 *
 * QUÉ LA HACE DISTINTA DE MIRAR EL TEXTO A OJO:
 *
 * Esta prueba no comprueba que el cierre diga una frase concreta. Comprueba que lo que el
 * cierre AFIRMA no contradiga la MEDICIÓN que lo produjo. El caso se arma con datos reales:
 *
 *   - la medición de uhc.cl del 25-sep (`medidas-25sep/uhc.json`), un prospecto limpio de
 *     verdad, con sus dos cookies propias;
 *   - más el aviso de cookies que instala el kit, que es lo que lleva al informe a los
 *     cuatro verdes y a "Nada pendiente": exactamente el informe de después de la entrega;
 *   - más una cookie `_ym_uid` de primera parte. Es Yandex Metrica, un rastreador de
 *     verdad, y está medida así en el censo del 26-sep (sodimac.cl). NO está en nuestro
 *     catálogo, y esa es la gracia: el informe sale igual de verde, así que cualquier cosa
 *     que el cierre afirme sobre rastreadores o sobre lo que el sitio guardó es una
 *     afirmación que la medición desmiente.
 *
 * Que `_ym_uid` sea un rastreador lo sabe la PRUEBA (por el censo), no el código. Si el
 * código lo supiera, la prueba y el arreglo saldrían del mismo supuesto y esto no probaría
 * nada, que es el error que en este proyecto ya se cometió cuatro veces.
 *
 * Y se mira la pantalla, no el string: el HTML es `index.html` tal cual, servido por HTTP,
 * y el cuerpo de `/api/profundo` lo calcula el código real del endpoint. Si mañana alguien
 * arregla la frase en una copia que no es la que se despliega, esto se cae igual.
 *
 * Rutas, igual que las otras dos pruebas de portada:
 *   VYC_SITIO       carpeta `verificaycumple/`. Sin ella se busca en el repo (rutas.mjs).
 *   VYC_INDEX_HTML  forzar el `index.html` concreto.
 *   CHROME          binario de Chrome.
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
const MEDIDAS26 = new URL('./medidas-26sep/', import.meta.url);

let ok = 0, malo = 0;
const eq = (n, r, e) => {
  if (JSON.stringify(r) === JSON.stringify(e)) ok++;
  else { malo++; console.log(`  FALLA ${n}: esperado ${JSON.stringify(e)}, real ${JSON.stringify(r)}`); }
};
const cierto = (n, r) => eq(n, !!r, true);
const falso = (n, r) => eq(n, !!r, false);

for (const f of ['index.html', 'privacidad/index.html', 'functions/api/chequeo.js',
  'functions/api/profundo.js']) {
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

const PORTADA_REAL = fs.readFileSync(path.join(SITIO, 'index.html'), 'utf8');
const POLITICA_REAL = fs.readFileSync(path.join(SITIO, 'privacidad/index.html'), 'utf8');

const DOMINIO = 'uhc.cl';
const IP = '4.4.4.4';

/* ================================================================== *
 * 1. El caso, armado con mediciones reales.                           *
 * ================================================================== */

console.log('=== 0. el caso: el informe de después del kit, con un rastreador fuera del catálogo ===');

// El rastreador de primera parte que no reconocemos, sacado del censo y no de una lista
// escrita a mano. El censo guarda las cookies como "nombre@dominio".
const censo = JSON.parse(fs.readFileSync(new URL('censo.json', MEDIDAS26), 'utf8'));
const medidasYandex = censo.sitios.flatMap((s) => (s.nombresDeCookies || [])
  .filter((n) => /^_ym_/.test(n)).map((n) => ({ sitio: s.dominio, cookie: n })));
cierto('el censo del 26-sep trae cookies de Yandex Metrica medidas de verdad', medidasYandex.length > 0);
cierto('y quedaron escritas como propias del sitio que las puso',
  medidasYandex.every((x) => x.cookie.split('@')[1].replace(/^\./, '').endsWith(x.sitio)));
const NOMBRE_YM = medidasYandex[0].cookie.split('@')[0];
falso('nuestro catálogo NO la reconoce',
  profundoMod.clasificarRastreadores([], [{ name: NOMBRE_YM, domain: '.' + DOMINIO }]).length > 0);

// La medición limpia de verdad, y el aviso que instala el kit.
const medicion = JSON.parse(fs.readFileSync(new URL('uhc.json', MEDIDAS), 'utf8'));
const yandex = { name: NOMBRE_YM, domain: '.' + DOMINIO };
const conAviso = {
  ...medicion,
  tras1: { ...medicion.tras1, cookies: [...medicion.tras1.cookies, yandex] },
  tras2: { ...medicion.tras2, cookies: [...medicion.tras2.cookies, yandex] },
  aviso: {
    ...medicion.aviso,
    avisos: [{ fuente: 'dom', texto: 'Usamos cookies para medir el sitio.',
      botones: ['Aceptar', 'Rechazar'], tieneBotonDeConsentimiento: true }],
    marcosIlegibles: [],
  },
};
const informeGuardado = profundoMod.armarInforme(conAviso, DOMINIO);

// El retrato del caso. Si esto cambia, cambió la medición o el informe, y entonces lo de
// abajo ya no está probando lo que dice probar.
eq('la medición produce un informe', informeGuardado.ok, true);
eq('sin nada pendiente, que es la rama del cierre que se prueba', informeGuardado.pendientes, 0);
eq('y sin nada sin confirmar tampoco', informeGuardado.sinConfirmar, 0);
eq('los cuatro ítems en verde', informeGuardado.items.filter((i) => i.ok).length, 4);
eq('y 100 de puntaje', informeGuardado.puntaje, 100);

// LO QUE LA MEDICIÓN DICE, y contra lo que se va a contrastar el cierre.
const cookiesEscritas = conAviso.tras2.cookies;
cierto('la medición muestra cookies escritas antes de que nadie diera permiso', cookiesEscritas.length > 0);
cierto('y una de ellas es un rastreador de verdad que el catálogo no ve',
  cookiesEscritas.some((c) => c.name === NOMBRE_YM));

// El invariante del §32 de prueba-profundo.mjs, que es de donde sale la forma de acotar y
// no de esta prueba: todo ítem en verde que hable de rastreadores dice de cuáles habla.
const verdesConRastreadores = informeGuardado.items.filter((i) => i.ok && /rastreador/i.test(i.detalle));
cierto('hay ítems en verde que hablan de rastreadores', verdesConRastreadores.length > 0);
cierto('y todos dicen de cuáles hablan',
  verdesConRastreadores.every((i) => /que buscamos/.test(i.detalle)));

/* ================================================================== *
 * 2. La portada real, servida por HTTP, con la API real.              *
 * ================================================================== */

const hoy = new Date().toISOString().slice(0, 10);
const kv = new Map([
  [`cache:${DOMINIO}`, JSON.stringify(informeGuardado)],
  [`tope:ip:${hoy}:${IP}`, '0'],
  [`tope:global:${hoy}`, '0'],
]);
const kvFalsa = {
  async get(k, o) { const v = kv.get(k); return v === undefined ? null : (o?.type === 'json' ? JSON.parse(v) : v); },
  async put(k, v) { kv.set(k, v); },
};

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

const TIPOS = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.webp': 'image/webp', '.woff2': 'font/woff2', '.ico': 'image/x-icon',
};

const conductor = (dominio) => `
<script>
(function () {
  function entregar(o) {
    var bytes = new TextEncoder().encode(JSON.stringify(o));
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
  window.addEventListener('load', function () {
    var input = document.getElementById('dominio');
    var form = document.getElementById('form-chequeo');
    var prof = document.getElementById('profundo');
    if (!input || !form || !prof) { entregar({ fatal: 'la portada no trae el formulario o #profundo' }); return; }
    input.value = '${dominio}';
    if (form.requestSubmit) form.requestSubmit();
    else form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    esperar(function () { return prof.querySelector('.panel-resolucion'); }, 12000, function (llego) {
      var panel = prof.querySelector('.panel-resolucion');
      entregar({
        llego: llego,
        roto: window.__roto || '',
        cierre: panel ? panel.textContent : '',
        kicker: panel && panel.querySelector('.kicker') ? panel.querySelector('.kicker').textContent : '',
        puntaje: !!prof.querySelector('.puntaje-caja'),
        items: prof.querySelectorAll('.items li').length,
        informe: prof.textContent
      });
    });
  });
})();
<\/script>
`;

function servidor(dominio) {
  return http.createServer(async (req, res) => {
    const ruta = new URL(req.url, 'http://127.0.0.1').pathname;
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
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        return res.end(JSON.stringify({ ok: false, tipo: 'nuestro', error: 'fuera de esta prueba' }));
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
    const dom = await new Promise((listo) => {
      const ch = spawn(CHROME, [
        '--headless', '--disable-gpu', '--no-sandbox', '--no-first-run',
        '--disable-extensions', '--user-data-dir=' + perfil,
        '--virtual-time-budget=30000', '--dump-dom', `http://127.0.0.1:${puerto}/`,
      ], { stdio: ['ignore', 'pipe', 'ignore'] });
      let salida = '';
      ch.stdout.on('data', (d) => { salida += d; });
      const muerte = setTimeout(() => ch.kill('SIGKILL'), 90000);
      const fin = () => { clearTimeout(muerte); listo(salida); };
      ch.on('close', fin);
      ch.on('error', fin);
    });
    const r = /RESULTADO:([A-Za-z0-9+/=]+)/.exec(dom);
    if (!r) return { fatal: 'la portada no llegó a entregar nada', dom: dom.slice(0, 500) };
    return JSON.parse(Buffer.from(r[1], 'base64').toString('utf8'));
  } finally {
    s.close();
    fs.rmSync(perfil, { recursive: true, force: true });
  }
}

/* ================================================================== *
 * 3. Lo que el cierre puede y no puede afirmar.                       *
 * ================================================================== */

console.log('=== 1. el cierre sin pendientes no puede afirmar más de lo que se midió ===');
const v = await enPantalla(DOMINIO);
if (v.fatal) { console.log('  FATAL: ' + v.fatal + '\n' + (v.dom || '')); malo++; }
else {
  eq('ningún error de JavaScript', v.roto || '', '');
  cierto('el informe llegó a pantalla', v.puntaje);
  cierto('con sus cuatro hallazgos dibujados', v.items >= 4);
  cierto('y el cierre está ahí', (v.cierre || '').length > 0);
  // La rama: sin pendientes y con cosas confirmadas. Si esto cambia, la prueba mira otra
  // cosa y hay que decirlo en vez de dar por buena una aserción que ya no aplica.
  cierto('es la rama de "nada pendiente"', /Nada pendiente/.test(v.kicker || ''));
  falso('no es la del kit', /Lo que hace el kit/.test(v.kicker || ''));
  falso('ni la de "no pudimos ver"', /No pudimos ver/.test(v.kicker || ''));

  const cierre = v.cierre || '';

  // (a) LA MEDICIÓN MUESTRA COOKIES ESCRITAS. El cierre no puede decir que no se guardó
  //     nada. Esto no es una prohibición de una palabra: es la medición desmintiéndola.
  if (cookiesEscritas.length > 0) {
    falso('no afirma que el sitio no guardó nada, porque sí guardó',
      /\b(guardó|dejó|escribió|almacenó)\s+nada\b/.test(cierre));
  }

  // (b) EL CATÁLOGO ES FINITO, y la medición trae la prueba: un rastreador de verdad que no
  //     reconocemos escribió su cookie y el informe salió verde igual. Así que toda mención
  //     a rastreadores en el cierre tiene que decir de cuáles habla, con las mismas palabras
  //     que ya usan los ítems de arriba.
  const frasesConRastreadores = cierre.split(/(?<=\.)\s+/).filter((f) => /rastreador/i.test(f));
  cierto('el cierre habla de rastreadores', frasesConRastreadores.length > 0);
  for (const f of frasesConRastreadores) {
    cierto(`el cierre dice de qué rastreadores habla: "${f.trim().slice(0, 60)}…"`,
      /que buscamos/.test(f));
  }

  // (c) Y el mismo corte sobre las cookies: lo que el ítem verde comprueba es que no quedó
  //     ninguna cookie de OTRO dominio. Eso sí se puede afirmar; "nada" no.
  cierto('el cierre acota lo de las cookies a las de otro dominio',
    !/cookie/i.test(cierre) || /de otro dominio|de otros dominios/.test(cierre));

  // (d) Lo que NO puede perderse por acotar: el cierre sigue diciendo que esto no es un
  //     certificado de cumplimiento y que la parte legal la ve un abogado.
  cierto('sigue diciendo que no dice que cumples la ley', /no dice que cumples la ley/.test(cierre));
  cierto('y que la parte legal la revisa un abogado', /la revisa tu abogado/.test(cierre));

  // (e) El contraste que hace visible el hallazgo: los ítems de arriba ya estaban acotados
  //     el 26-sep y el cierre no. Los dos textos están en la misma pantalla, y quien la lee
  //     se queda con el cierre.
  cierto('los ítems de arriba dicen "de los que buscamos"', /que buscamos/.test(v.informe || ''));
}

console.log(`\n${ok} bien, ${malo} mal`);
process.exit(malo ? 1 : 0);
