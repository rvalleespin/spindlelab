import { normalizarDominio, destinoPermitido, chequear, mensajeDeFallo, buscarEnlacesPolitica, detectarCmp, onRequestGet,
         esPaginaDeBloqueo, armadoConJavaScript, comoSeArma, destinoDeMetaRefresh,
         buscarPoliticaEnDatos } from '/tmp/vyc-sub-wt/verificaycumple/functions/api/chequeo.js';
import fs from 'node:fs';
import { onRequest as middleware } from '/tmp/vyc-sub-wt/verificaycumple/functions/_middleware.js';

let ok = 0, malo = 0;
const eq = (nombre, real, esperado) => {
  const bien = JSON.stringify(real) === JSON.stringify(esperado);
  if (bien) ok++; else { malo++; console.log(`  FALLA ${nombre}\n    esperado: ${JSON.stringify(esperado)}\n    real:     ${JSON.stringify(real)}`); }
};

console.log('=== 1. normalizarDominio: las notaciones de IP que se colaban ===');
for (const d of ['127.0.0.1', '127.1', '0177.0.0.1', '0x7f.0.0.1', '2130706433',
                 '10.0.0.1', '169.254.169.254', '192.168.1.1', '[::1]', '0x7f000001',
                 '1.2.3.4.', '8.8.8.8']) {
  const r = normalizarDominio(d);
  eq(`rechaza ${d}`, r.error, 'Escribe un dominio, no una dirección IP.');
}

console.log('=== 2. normalizarDominio: los dominios de verdad siguen pasando ===');
for (const [entrada, salida] of [
  ['spindlelab.cl', 'spindlelab.cl'],
  // El www ya no se borra (23-sep): se revisa lo que la persona escribió.
  ['https://www.bcn.cl/algo', 'www.bcn.cl'],
  ['WWW.Ejemplo.CL', 'www.ejemplo.cl'],
  ['MiCasa123.cl', 'micasa123.cl'],
  ['sub.dominio.co.uk', 'sub.dominio.co.uk'],
  ['tienda-2024.cl', 'tienda-2024.cl'],
  ['n1.cl', 'n1.cl'],
  ['http://ejemplo.cl:80/', 'ejemplo.cl'],
]) eq(`acepta ${entrada}`, normalizarDominio(entrada).dominio, salida);

console.log('=== 3. normalizarDominio: lo que ya rechazaba, sigue rechazado ===');
eq('localhost', normalizarDominio('localhost').error, 'Ese destino no se puede revisar.');
eq('algo.internal', normalizarDominio('algo.internal').error, 'Ese destino no se puede revisar.');
eq('metadata.google.internal', normalizarDominio('metadata.google.internal').error, 'Ese destino no se puede revisar.');
eq('puerto raro', normalizarDominio('ejemplo.cl:8080').error, 'No podemos revisar puertos personalizados.');
eq('correo', normalizarDominio('hola@spindlelab.cl').error, 'Escribe un dominio, no un correo.');
eq('vacío', normalizarDominio('   ').error, 'Escribe un dominio.');
eq('sin punto', normalizarDominio('ejemplo').error, 'Eso no parece un dominio válido.');

console.log('=== 4. destinoPermitido ===');
for (const [u, esperado] of [
  ['https://spindlelab.cl/privacidad/', true],
  ['http://spindlelab.cl/privacidad/', true],
  ['https://spindlelab.cl:443/x', true],
  ['https://spindlelab.cl:8443/x', false],
  ['https://127.0.0.1/', false],
  ['https://127.1/', false],
  ['http://0177.0.0.1:80/', false],
  ['http://[::1]/', false],
  ['http://localhost/', false],
  ['http://metadata.google.internal/computeMetadata/v1/', false],
  ['file:///etc/passwd', false],
  ['data:text/html,hola', false],
  ['javascript:alert(1)', false],
  ['ftp://ejemplo.cl/x', false],
  ['no-es-una-url', false],
  ['https://spindlelab.cl./x', true],
]) eq(`destinoPermitido ${u}`, destinoPermitido(u), esperado);

/* ---------- fetch de mentira, para probar las redirecciones ---------- */
const HTML = '<!doctype html><html lang="es-CL"><body><a href="/privacidad/">Política de privacidad</a></body></html>';

function fakeFetch(rutas) {
  const vistas = [];
  const f = async (url) => {
    vistas.push(url);
    const r = rutas[url];
    if (!r) throw new Error('sin ruta: ' + url);
    return {
      status: r.status,
      url,
      headers: { get: (k) => (k.toLowerCase() === 'location' ? r.location || null : k.toLowerCase() === 'content-length' ? null : null) },
      text: async () => r.body || '',
    };
  };
  f.vistas = vistas;
  return f;
}

console.log('=== 5. redirecciones seguidas a mano ===');
{
  const f = fakeFetch({
    'https://ejemplo.cl/': { status: 301, location: 'https://www.ejemplo.cl/' },
    'https://www.ejemplo.cl/': { status: 200, body: HTML },
    'https://www.ejemplo.cl/privacidad/': { status: 200, body: '<html>política</html>' },
  });
  const r = await chequear('ejemplo.cl', f);
  eq('sigue un 301 y puntúa', r.ok, true);
  eq('la política se resolvió contra la URL final', f.vistas.includes('https://www.ejemplo.cl/privacidad/'), true);
  eq('https en verde tras el 301', r.items.find((i) => i.id === 'https').ok, true);
}
{
  const f = fakeFetch({
    'https://ejemplo.cl/': { status: 302, location: 'http://127.0.0.1:8080/admin' },
    'http://ejemplo.cl/': { status: 302, location: 'http://127.0.0.1:8080/admin' },
  });
  const r = await chequear('ejemplo.cl', f);
  eq('redirección a loopback: no se puntúa', r.ok, false);
  eq('y nunca se pidió el destino prohibido', f.vistas.some((u) => u.includes('127.0.0.1')), false);
}
{
  const f = fakeFetch({
    'https://ejemplo.cl/': { status: 302, location: 'https://ejemplo.cl/' },
    'http://ejemplo.cl/': { status: 302, location: 'http://ejemplo.cl/' },
  });
  const r = await chequear('ejemplo.cl', f);
  eq('bucle de redirecciones: corta', r.ok, false);
  eq('y no da más de los saltos permitidos', f.vistas.length <= 12, true);
}
{
  const f = fakeFetch({
    'https://ejemplo.cl/': { status: 301, location: null },
    'http://ejemplo.cl/': { status: 301, location: null },
  });
  const r = await chequear('ejemplo.cl', f);
  eq('3xx sin Location: falla honesto, no informe', r.ok, false);
  // El mensaje cambió a propósito: ya no culpa al dominio, dice que no pudimos seguir al sitio.
  eq('mensaje honesto', r.error, mensajeDeFallo('destino'));
  eq('es una falla del sitio, sin código inventado', [r.tipo, r.codigo], ['sitio', undefined]);
}
{
  const f = fakeFetch({
    'https://ejemplo.cl/': { status: 200, body: HTML },
    'https://ejemplo.cl/privacidad/': { status: 301, location: 'https://ejemplo.cl/legal/' },
    'https://ejemplo.cl/legal/': { status: 200, body: '<html>política</html>' },
  });
  const r = await chequear('ejemplo.cl', f);
  eq('la política redirigida cuenta como alcanzable', r.items.find((i) => i.id === 'politica').ok, true);
}
{
  // El enlace de política apunta a un destino que no vamos a pedir jamás.
  const f = fakeFetch({
    'https://ejemplo.cl/': { status: 200, body: '<!doctype html><html lang="es"><a href="http://169.254.169.254/latest/meta-data/">política de privacidad</a></html>' },
  });
  const r = await chequear('ejemplo.cl', f);
  eq('política apuntando a metadata: no se pide', f.vistas.some((u) => u.includes('169.254')), false);
  eq('y el ítem queda en rojo, no en verde', r.items.find((i) => i.id === 'politica').ok, false);
}

console.log('=== 6. el camino normal no cambió ===');
{
  const f = fakeFetch({
    'https://ejemplo.cl/': { status: 200, body: HTML },
    'https://ejemplo.cl/privacidad/': { status: 200, body: '<html>política</html>' },
  });
  const r = await chequear('ejemplo.cl', f);
  // Era 73: el sitio de prueba no tiene rastreadores y aun así perdía el ítem del gestor. Ahora
  // "no vimos rastreadores" queda sin confirmar (pueden cargar con JavaScript) y no cuenta, y
  // lang ya no puntúa. Política + HTTPS = 14 de 14.
  eq('puntaje del sitio de prueba', r.puntaje, 100);
  eq('una sola petición a la portada', f.vistas.filter((u) => u === 'https://ejemplo.cl/').length, 1);
}
{
  const f = fakeFetch({
    'https://ejemplo.cl/': { status: 526 },
    'http://ejemplo.cl/': { status: 200, body: HTML },
    'http://ejemplo.cl/privacidad/': { status: 200, body: '<html>x</html>' },
  });
  const r = await chequear('ejemplo.cl', f);
  eq('TLS roto (526) sigue cayendo a http', r.ok, true);
  eq('y https queda en rojo', r.items.find((i) => i.id === 'https').ok, false);
}

console.log('=== 7. los errores ya no son un código crudo ===');
{
  const f = fakeFetch({ 'https://ejemplo.cl/': { status: 403 }, 'http://ejemplo.cl/': { status: 403 } });
  const r = await chequear('ejemplo.cl', f);
  eq('403 devuelve el codigo aparte', r.codigo, 403);
  eq('403 no menciona el numero en el mensaje', /403/.test(r.error), false);
  // Cambió a propósito: el correo ya no va en el texto, la portada pone el botón y el mailto.
  eq('403 no lleva el correo en el texto', /@/.test(r.error), false);
  eq('403 es falla del sitio', r.tipo, 'sitio');
}
for (const [status, debeDecir] of [[404, /portada no existe/], [429, /bajar el ritmo/],
                                   [526, /certificado/], [530, /no encontramos un sitio/i],
                                   [503, /su propio servidor/], [418, /no nos entreg/]]) {
  const m = mensajeDeFallo(status);
  eq(`mensaje ${status} es humano`, debeDecir.test(m), true);
  eq(`mensaje ${status} no lleva el numero`, new RegExp(String(status)).test(m), false);
}


/* ================================================================== *
 * 23-sep: lo que cambió a propósito tras la revisión previa al empuje *
 * ================================================================== */

// Doble más parecido al runtime: respeta la señal de aborto (el reloj de `traer`), puede
// tardar, colgarse hasta que lo corten, o lanzar como lanza un fetch sin DNS.
function fakeRed(rutas) {
  const vistas = [];
  const f = (url, opts = {}) => {
    vistas.push(url);
    const r = rutas[url];
    if (!r) return Promise.reject(new Error('sin ruta: ' + url));
    return new Promise((res, rej) => {
      const responder = () => res({
        status: r.status, url,
        headers: { get: (k) => (k.toLowerCase() === 'location' ? r.location || null : null) },
        text: async () => r.body || '',
      });
      const abortar = () => { clearTimeout(t); rej(new Error('abortado')); };
      if (opts.signal) {
        if (opts.signal.aborted) return abortar();
        opts.signal.addEventListener('abort', abortar, { once: true });
      }
      const t = r.cuelga ? null : setTimeout(responder, r.retardo || 0);
    });
  };
  f.vistas = vistas;
  return f;
}
const pagina = (cuerpo, lang = 'es-CL') => `<!doctype html><html lang="${lang}"><head></head><body>${cuerpo}</body></html>`;
const conPolitica = (extra = '') => pagina('<footer><a href="/privacidad/">Política de privacidad</a></footer>' + extra);
// Un menú de verdad. Desde I2-5 (23-sep) una portada sin ningún enlace navegable se trata
// como armada con JavaScript, así que las portadas de prueba que quieran ser HTML normal
// tienen que enlazar a alguna parte, igual que una portada real.
const MENU = '<nav>' + ['Inicio', 'Nosotros', 'Servicios', 'Contacto'].map((t, i) => `<a href="/p${i}/">${t}</a>`).join('') + '</nav>';
const item = (r, id) => r.items && r.items.find((i) => i.id === id);

console.log('=== 8. el contrato de la respuesta ===');
{
  const f = fakeRed({
    'https://ejemplo.cl/': { status: 301, location: 'https://www.ejemplo.cl/' },
    'https://www.ejemplo.cl/': { status: 200, body: conPolitica() },
    'https://www.ejemplo.cl/privacidad/': { status: 200, body: '<html>política</html>' },
  });
  const r = await chequear('Ejemplo.cl', f);
  eq('dominio: como se escribió, en minúsculas', r.dominio, 'ejemplo.cl');
  eq('revisado: la URL que de verdad se leyó', r.revisado, 'https://www.ejemplo.cl/');
  eq('bloques en orden', r.bloques.map((b) => b.id), ['politica', 'seguridad', 'consentimiento']);
  eq('cada ítem bajo su bloque', r.items.map((i) => [i.bloque, i.id, i.peso]), [['politica', 'politica', 8], ['seguridad', 'https', 6], ['consentimiento', 'cmp', 6]]);
  eq('ok === (estado === ok)', r.items.every((i) => i.ok === (i.estado === 'ok')), true);
  eq('arreglo null solo si ok', r.items.every((i) => (i.arreglo === null) === (i.estado === 'ok')), true);
  // El permiso queda sin confirmar: el sitio de prueba no trae rastreadores en su HTML, y eso no
  // prueba que no los cargue después (F1, 23-sep).
  eq('contadores', [r.pendientes, r.sinConfirmar], [0, 1]);
  eq('lang ya no puntúa: es informativo', [!!item(r, 'lang'), r.informativos.some((i) => i.id === 'lang')], [false, true]);
  eq('revisadoEn es ISO', !Number.isNaN(Date.parse(r.revisadoEn)), true);
  eq('el sub de política habla del Art. 14 ter', /Art\. 14 ter/.test(r.bloques[0].sub), true);
  eq('el sub de seguridad dice que NO es del Art. 14 ter', /No es uno de los 12 puntos del Art\. 14 ter/.test(r.bloques[1].sub), true);
  eq('nadie dice que el 14 ter "exige" HTTPS', r.bloques.some((b) => /exige/.test(b.sub)), false);
}
{
  const r = await chequear('localhost', fakeRed({}));
  eq('entrada inválida: tipo entrada', [r.ok, r.tipo, r.codigo], [false, 'entrada', undefined]);
  eq('con una IP también', (await chequear('10.0.0.1', fakeRed({}))).tipo, 'entrada');
}

console.log('=== 9. permiso antes de cargar rastreadores: los cuatro casos ===');
const GA = '<script async src="https://www.googletagmanager.com/gtag/js?id=G-X"></script>';
const PIXEL = "<script>!function(f,b,e,v){}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','1');</script>";
async function conCuerpo(extra) {
  return chequear('ejemplo.cl', fakeRed({
    'https://ejemplo.cl/': { status: 200, body: conPolitica(extra) },
    'https://ejemplo.cl/privacidad/': { status: 200, body: '<html>política</html>' },
  }));
}
{
  // F1: www.clinicasantamaria.cl, falabella.com y grupodentalblue.cl no traen ningún patrón en
  // su HTML y en Chrome cargan GA4, el Pixel o Clarity sin aviso. "No vimos" no es verde.
  const r = await conCuerpo('');
  const cmp = item(r, 'cmp');
  eq('sin rastreadores a la vista: sin-confirmar, no ok', [cmp.estado, cmp.ok], ['sin-confirmar', false]);
  eq('y no suma ni resta: 14 de 14', [r.puntaje, r.pendientes, r.sinConfirmar], [100, 0, 1]);
  eq('no va a prioridades (no se le vende el kit)', r.prioridades.length, 0);
  eq('ya no dice que no hay nada que bloquear', /no hay nada que bloquear/.test(cmp.detalle), false);
  eq('dice por qué no lo sabemos', /Muchos sitios los cargan después con JavaScript, y eso no lo vemos desde acá/.test(cmp.detalle), true);
  eq('arreglo: la prueba de incógnito', /ventana de incógnito, no aceptes nada/.test(cmp.arreglo), true);
  eq('arreglo: dónde se miran las cookies (LC-7)', /En Chrome: clic derecho, Inspeccionar, pestaña Aplicación, Cookies\./.test(cmp.arreglo), true);
  // I2-3: y además dice que la revisión a mano tiene un costo, que se conversa antes.
  eq('arreglo: la revisión a mano sin prometerla gratis y con el costo dicho (LC-11, I2-3)',
     cmp.arreglo.endsWith('Si quieres, lo miramos a mano en un navegador: pregúntanos y te decimos cuánto cuesta.'), true);
  eq('título neutro', cmp.titulo, 'Permiso antes de cargar rastreadores');
}
{
  // I2-1: abogadospyme.cl (CookieAdmin) y entel.cl (OneTrust) salían en verde y los dos
  // cargan rastreadores antes de que nadie acepte. Que el gestor esté instalado no dice que
  // bloquee, y eso solo se ve en un navegador.
  const r = await conCuerpo(GA + '<script id="Cookiebot" src="https://consent.cookiebot.com/uc.js" data-cbid="abc"></script>');
  const cmp = item(r, 'cmp');
  eq('rastreadores como script normal + CMP reconocido: sin-confirmar, no ok (I2-1)', [cmp.estado, cmp.ok], ['sin-confirmar', false]);
  eq('y lo dice sin culpar al sitio (I2-1)',
     cmp.detalle, 'Detectamos Cookiebot, un gestor de consentimiento conocido, y también Google Analytics (GA4) ' +
     'en tu portada. Desde afuera no podemos confirmar que tu gestor los bloquee hasta que la persona acepta, ' +
     'así que esto no suma ni resta.');
  eq('y el arreglo es la prueba de incógnito (I2-1)',
     /Para salir de la duda, abre tu sitio en una ventana de incógnito.*Si aparecen, tu gestor no está bloqueando los rastreadores\./.test(cmp.arreglo), true);
  eq('no suma ni resta: 14 de 14, y no va a prioridades', [r.puntaje, r.pendientes, r.sinConfirmar, r.prioridades.length], [100, 0, 1, 0]);
}
{
  const r = await conCuerpo('<script src="https://consent.cookiebot.com/uc.js" data-cbid="abc"></script>');
  eq('CMP reconocido sin rastreadores a la vista: sigue ok', [item(r, 'cmp').estado, r.sinConfirmar], ['ok', 0]);
}
{
  // El gestor sí queda en verde cuando no hay nada que bloquear a la vista: los rastreadores
  // vienen retenidos (no se ejecutan hasta que algo les cambia el tipo).
  const retenido = '<script type="text/plain" data-cookieconsent="statistics" src="https://www.googletagmanager.com/gtag/js?id=G-X"></script>';
  const r = await conCuerpo(retenido + '<script id="Cookiebot" src="https://consent.cookiebot.com/uc.js" data-cbid="abc"></script>');
  eq('CMP + todos los rastreadores retenidos: ok', [item(r, 'cmp').estado, r.sinConfirmar], ['ok', 0]);
  eq('y el proveedor igual se informa', r.informativos.find((i) => i.id === 'proveedores').detalle.startsWith('Encontramos: Google Analytics (GA4).'), true);
  // Uno retenido y otro como script normal: el normal manda.
  const r2 = await conCuerpo(retenido + PIXEL + '<script id="Cookiebot" src="https://consent.cookiebot.com/uc.js" data-cbid="abc"></script>');
  eq('CMP + uno retenido y otro normal: sin-confirmar, y solo nombra el normal',
     [item(r2, 'cmp').estado, /y también Meta Pixel en tu portada/.test(item(r2, 'cmp').detalle)], ['sin-confirmar', true]);
}
{
  const r = await conCuerpo(GA + "<script>gtag('consent', 'default', { analytics_storage: 'denied' });</script>" +
    '<script id="Cookiebot" src="https://consent.cookiebot.com/uc.js" data-cbid="abc"></script>');
  eq('CMP + Consent Mode declarado: ok', item(r, 'cmp').estado, 'ok');
}
{
  const r = await conCuerpo(GA + "<script>gtag('consent', 'default', { analytics_storage: 'denied' });</script>");
  eq('rastreadores + Consent Mode inline: sin-confirmar', item(r, 'cmp').estado, 'sin-confirmar');
  eq('sin-confirmar no puntúa: 14 de 14', r.puntaje, 100);
  eq('se cuenta aparte', [r.pendientes, r.sinConfirmar], [0, 1]);
  eq('no va a prioridades', r.prioridades.length, 0);
  eq('ok false, para páginas viejas', item(r, 'cmp').ok, false);
  // LC-4: una declaración de Consent Mode no prueba que haya aviso (spindlelab.cl la declara en
  // "granted" dentro del cargador post-aceptación).
  eq('Consent Mode: "suele ir con" un aviso, no "es" uno (LC-4)',
     /una declaración de Google Consent Mode en tu HTML, que suele ir con un aviso de permiso hecho a medida\./.test(item(r, 'cmp').detalle), true);
  eq('ya no dice "configuración de permiso hecha a medida"', /configuración de permiso hecha a medida/.test(item(r, 'cmp').detalle), false);
  eq('y dice cómo salir de la duda, con dónde mirar', /incógnito.*clic derecho, Inspeccionar, pestaña Aplicación, Cookies/.test(item(r, 'cmp').arreglo), true);
  // LC-11: la revisión a mano no se ofrece como si fuera gratis.
  eq('revisión a mano: "pregúntanos", no "lo podemos revisar"', [/lo podemos revisar a mano/.test(item(r, 'cmp').arreglo), /Si quieres, lo miramos a mano en un navegador: pregúntanos y te decimos cuánto cuesta\./.test(item(r, 'cmp').arreglo)], [false, true]);
}
{
  const r = await conCuerpo(GA + '<script type="text/plain" data-category="analytics">cargarPixel()</script>');
  eq('rastreadores + scripts retenidos por categoría: sin-confirmar', item(r, 'cmp').estado, 'sin-confirmar');
}
{
  const r = await conCuerpo(GA + PIXEL);
  const cmp = item(r, 'cmp');
  eq('rastreadores y nada más: pendiente', cmp.estado, 'pendiente');
  eq('puntaje sobre 20: 14/20', r.puntaje, 70);
  eq('va a prioridades', r.prioridades.map((p) => p.titulo), ['Permiso antes de cargar rastreadores']);
  eq('arreglo: acto afirmativo (Art. 12)', /acto afirmativo \(Art\. 12\)/.test(cmp.arreglo), true);
  // LC-8 b: con las palabras del brief §2.4, no solo "un acto afirmativo".
  eq('arreglo: previo e inequívoco (brief §2.4)', /consentimiento sea previo e inequívoco, y que se manifieste mediante un acto afirmativo/.test(cmp.arreglo), true);
  eq('arreglo: no le atribuye casilla ni silencio al artículo', /premarcad|silencio|casilla/i.test(cmp.arreglo), false);
  eq('arreglo: el banner es la forma habitual, no la ley', /forma habitual/.test(cmp.arreglo), true);
}
{
  const r = await conCuerpo(GA + PIXEL);
  const prov = r.informativos.find((i) => i.id === 'proveedores').detalle;
  eq('Art. 27-28 solo para transferencias fuera de Chile', /Si alguno procesa datos fuera de Chile.*cláusulas contractuales.*nivel adecuado de protección \(Art\. 27-28\)/.test(prov), true);
  eq('ya no dice "su propio acuerdo de tratamiento"', /propio acuerdo/.test(prov), false);
  // LC-8 c: el brief dice "un nivel adecuado de protección", sin "país de destino".
  eq('sin "país de destino" (LC-8 c)', /país de destino/.test(prov), false);
}
{
  // I2-6: con SOLO Tag Manager no sabemos qué carga adentro. jaukencosmetica.cl salía
  // pendiente, con el kit ofrecido, y en Chrome no dispara ni un rastreador ni deja una
  // cookie. Un "no lo sabemos" no puede restar (la misma regla del resto del ítem).
  const r = await conCuerpo('<script src="https://www.googletagmanager.com/gtm.js?id=GTM-1"></script>');
  const cmp = item(r, 'cmp');
  eq('solo GTM: sin-confirmar, no pendiente (I2-6)', [cmp.estado, cmp.ok], ['sin-confirmar', false]);
  eq('solo GTM: no suma ni resta ni va a prioridades', [r.puntaje, r.pendientes, r.sinConfirmar, r.prioridades.length], [100, 0, 1, 0]);
  eq('solo GTM: dice que no vemos adentro', /Desde afuera no vemos qué carga Tag Manager: ahí adentro puede estar tu aviso de cookies, o rastreadores que parten sin pedir permiso\./.test(cmp.detalle), true);
  eq('solo GTM: el arreglo es comprobar, no comprar', [/Para salir de la duda, abre tu sitio en una ventana de incógnito/.test(cmp.arreglo), /instala un banner|banner que los bloquea/i.test(cmp.arreglo)], [true, false]);
  eq('solo GTM: dónde se miran las cookies', /En Chrome: clic derecho, Inspeccionar, pestaña Aplicación, Cookies\./.test(cmp.arreglo), true);
}
{
  // LC-7: con GTM y algún proveedor más sí hay algo concreto que bloquear, así que sigue
  // pendiente, y a quien ya tiene un banner cargado desde GTM no se le dice que instale uno
  // (xmslatam.com: GA4, GTM y Clarity).
  const r = await conCuerpo(GA + '<script src="https://www.googletagmanager.com/gtm.js?id=GTM-1"></script>');
  const cmp = item(r, 'cmp');
  eq('GTM con otro proveedor: pendiente', cmp.estado, 'pendiente');
  eq('GTM con otro proveedor: primero comprobar el aviso que ya tenga',
     cmp.arreglo.startsWith('Si ya tienes un aviso de cookies cargado desde Tag Manager, compruébalo: abre tu sitio en una ventana de incógnito'), true);
  eq('GTM con otro proveedor: dónde se miran las cookies', /En Chrome: clic derecho, Inspeccionar, pestaña Aplicación, Cookies\./.test(cmp.arreglo), true);
  eq('GTM con otro proveedor: si no hay aviso, lo que pide la ley', /Si no tienes aviso: la ley pide que el consentimiento sea previo e inequívoco, y que se manifieste mediante un acto afirmativo \(Art\. 12\)\./.test(cmp.arreglo), true);
}
{
  // I2-7: gtag/js sirve a tres productos y el id dice cuál. abogadospyme.cl solo trae
  // id=AW-733918915 (remarketing de Google Ads) y se informaba como Analytics.
  const prov = async (src) => (await conCuerpo(`<script async src="${src}"></script>`))
    .informativos.find((i) => i.id === 'proveedores').detalle;
  eq('gtag AW-: Google Ads (I2-7)', (await prov('https://www.googletagmanager.com/gtag/js?id=AW-733918915')).startsWith('Encontramos: Google Ads.'), true);
  eq('gtag DC-: Google Ads', (await prov('https://www.googletagmanager.com/gtag/js?id=DC-1234567')).startsWith('Encontramos: Google Ads.'), true);
  eq('gtag G-: Google Analytics (GA4)', (await prov('https://www.googletagmanager.com/gtag/js?id=G-J40ABC')).startsWith('Encontramos: Google Analytics (GA4).'), true);
  eq('gtag UA- u otro: Google (gtag)', (await prov('https://www.googletagmanager.com/gtag/js?id=UA-12345-1')).startsWith('Encontramos: Google (gtag).'), true);
  eq('gtag sin id: Google (gtag)', (await prov('https://www.googletagmanager.com/gtag/js')).startsWith('Encontramos: Google (gtag).'), true);
  // Los dos en la misma portada se nombran los dos, sin repetir.
  const dos = await conCuerpo('<script src="https://www.googletagmanager.com/gtag/js?id=G-1"></script>' +
    '<script src="https://www.googletagmanager.com/gtag/js?id=AW-2"></script>' +
    '<script src="https://www.googletagmanager.com/gtag/js?id=G-3"></script>');
  eq('dos productos de gtag: los dos, una vez cada uno',
     dos.informativos.find((i) => i.id === 'proveedores').detalle.startsWith('Encontramos: Google Analytics (GA4), Google Ads.'), true);
}
{
  // LC-8 d: los 12 puntos tienen que estar disponibles al público; la política es uno de ellos.
  const r = await conCuerpo('');
  const sub = r.bloques.find((b) => b.id === 'politica').sub;
  eq('sub de política: al menos 12 puntos, entre ellos la política (LC-8 d)',
     sub, 'El Art. 14 ter pide tener disponible al público en tu sitio al menos 12 puntos de información, entre ellos tu política de tratamiento con su fecha y versión.');
}

console.log('=== 10. patrones de CMP: el loader, no una mención ni un resto ===');
for (const [html, esperado, nombre] of [
  ["<link rel='stylesheet' id='cmplz-general-css' href='/wp-content/plugins/complianz-gdpr/assets/css/cookieblocker.min.css'>", null, 'Complianz: solo la hoja de estilo que quedó (ceoclinicadental.cl)'],
  ['<div id="cmplz-cookiebanner-container"></div>', 'Complianz', 'Complianz: el contenedor del banner'],
  ['<script src="/wp-content/plugins/complianz-gdpr/cookiebanner/js/complianz.min.js"></script>', 'Complianz', 'Complianz: el script del banner'],
  ['<p>Usamos Cookiebot en otros proyectos.</p><a href="https://www.cookiebot.com/">cookiebot.com</a>', null, 'Cookiebot: mención en el texto'],
  ['<script id="Cookiebot" src="https://consent.cookiebot.com/uc.js"></script>', 'Cookiebot', 'Cookiebot: el loader'],
  ['<p>La cookie OptanonConsent guarda tu elección.</p>', null, 'OneTrust: el nombre de su cookie en un texto'],
  ['<script src="https://cdn.cookielaw.org/scripttemplates/otSDKStub.js" data-domain-script="x"></script>', 'OneTrust', 'OneTrust: el loader'],
  ['<a href="https://www.iubenda.com/privacy-policy/1" class="iubenda-black"></a><script src="https://cdn.iubenda.com/iubenda.js"></script>', null, 'iubenda: el botón de la política no es un banner'],
  ['<script src="https://cs.iubenda.com/autoblocking/123.js"></script>', 'iubenda', 'iubenda: el autoblocking'],
  ['<link rel="stylesheet" href="/wp-content/plugins/cookie-law-info/legacy/public/css/cookie-law-info-public.css">', null, 'CookieYes (plugin): solo CSS'],
  ['<script src="https://abogadospyme.cl/wp-content/plugins/cookieadmin/assets/js/consent.js?ver=1.2.2"></script>', 'CookieAdmin', 'CookieAdmin: el script (abogadospyme.cl)'],
  ['<a href="https://account.usercentrics.eu/login/1">Login</a>', null, 'Usercentrics: un enlace a su login'],
]) eq(nombre, detectarCmp(html), esperado);

console.log('=== 11. el enlace a la política ===');
const BASE = 'https://ejemplo.cl/';
const urls = (html) => buscarEnlacesPolitica(html, BASE).map((c) => c.url);
{
  // abogadospyme.cl: el HTML de adentro del enlace medía 232 y 591 caracteres.
  const spans = '<span class="elementor-item elementor-sub-item">' + '<span class="x">'.repeat(20) + 'Políticas de Privacidad y Términos del Servicio' + '</span>'.repeat(21);
  eq('interior largo (>120): se encuentra', urls(`<a href="https://ejemplo.cl/nosotros-politicas-de-privacidad-y-terminos-del-servicio/" class="menu">${spans}</a>`),
     ['https://ejemplo.cl/nosotros-politicas-de-privacidad-y-terminos-del-servicio/']);
}
eq('área de práctica "Protección de Datos Personales": no (araya.cl)',
   urls('<a href="https://ejemplo.cl/areas-de-practica/proteccion-de-datos-personales-2/">Protección de Datos Personales</a>'), []);
eq('"protección de datos" solo, en la raíz: no',
   urls('<a href="/proteccion-de-datos-personales/">Protección de datos personales</a>'), []);
eq('página de servicio sobre la ley: no (xmslatam.com)',
   urls('<a href="/servicios/ley-de-proteccion-de-datos/">Política de datos para empresas</a>'), []);
eq('post fechado: no', urls('<a href="/2024/05/nuestra-politica-de-privacidad-cambio/">Política de privacidad</a>'), []);
eq('post largo en la raíz sin rótulo de política: no',
   urls('<a href="/nueva-ley-de-privacidad-en-chile-lo-que-debes-saber/">Nueva ley de privacidad en Chile: lo que tu empresa debe saber antes de diciembre</a>'), []);
eq('PDF de política en /uploads/ fechado: sí',
   urls('<a href="/wp-content/uploads/2023/05/Politica-de-Privacidad.pdf">Descarga</a>'), ['https://ejemplo.cl/wp-content/uploads/2023/05/Politica-de-Privacidad.pdf']);
eq('/privacy-policy/: sí (jaukencosmetica.cl)', urls('<a href="/privacy-policy/">Privacy Policy</a>'), ['https://ejemplo.cl/privacy-policy/']);
eq('aviso legal: sí', urls('<a href="/aviso-legal">Aviso legal</a>'), ['https://ejemplo.cl/aviso-legal']);
eq('política de tratamiento de datos: sí', urls('<a href="/legal/">Política de Tratamiento de Datos Personales</a>'), ['https://ejemplo.cl/legal/']);
eq('entidades y mayúsculas', urls('<a href="/p?id=3">POL&Iacute;TICA DE PRIVACIDAD</a>'), ['https://ejemplo.cl/p?id=3']);
eq('aria-label cuenta como texto', urls('<a href="/x/" aria-label="Política de privacidad"><svg></svg></a>'), ['https://ejemplo.cl/x/']);
eq('la política de Google del aviso de reCAPTCHA: no',
   urls('<a href="https://policies.google.com/privacy">Política de privacidad</a>'), []);
eq('una política alojada fuera (iubenda) sí cuenta',
   urls('<a href="https://www.iubenda.com/privacy-policy/123">Política de privacidad</a>'), ['https://www.iubenda.com/privacy-policy/123']);
eq('fragmento, mailto y "#" se ignoran o se limpian',
   urls('<a href="#privacidad">Privacidad</a><a href="mailto:privacidad@ejemplo.cl">privacidad@ejemplo.cl</a><a href="/privacidad/#top">Privacidad</a>'), ['https://ejemplo.cl/privacidad/']);
eq('repetidos (menú de escritorio y de celular) se cuentan una vez',
   urls('<a href="/privacidad/">Privacidad</a><a href="/privacidad/">Privacidad</a>'), ['https://ejemplo.cl/privacidad/']);
eq('el más fuerte primero: href con privacidad antes que un aviso legal que aparece antes',
   urls('<a href="/legal">Aviso legal</a> <a href="/politica-de-privacidad/">Ver</a>'), ['https://ejemplo.cl/politica-de-privacidad/', 'https://ejemplo.cl/legal']);
eq('del mismo sitio antes que alojada fuera',
   urls('<a href="https://www.iubenda.com/privacy-policy/1">Privacidad</a><a href="/privacidad">Privacidad</a>'), ['https://ejemplo.cl/privacidad', 'https://www.iubenda.com/privacy-policy/1']);
eq('un <a> sin cerrar no se come al siguiente',
   urls('<a href="/inicio">Inicio <a href="/privacidad/">Privacidad</a>'), ['https://ejemplo.cl/privacidad/']);
{
  // contadorparapyme.cl: /privacidad y /aviso-legal dan 404. Se prueban dos y se para.
  const f = fakeRed({
    'https://ejemplo.cl/': { status: 200, body: pagina('<a href="/privacidad">Directiva de privacidad</a><a href="/aviso-legal">Aviso legal</a><a href="/politica-de-datos">Política de datos</a>') },
    'https://ejemplo.cl/privacidad': { status: 404 },
    'https://ejemplo.cl/aviso-legal': { status: 404 },
    'https://ejemplo.cl/politica-de-datos': { status: 200, body: 'x' },
  });
  const r = await chequear('ejemplo.cl', f);
  eq('enlaces rotos: pendiente', item(r, 'politica').estado, 'pendiente');
  eq('y el detalle dice que la página no existe', /responde que no existe/.test(item(r, 'politica').detalle), true);
  eq('se prueban como máximo dos', f.vistas.includes('https://ejemplo.cl/politica-de-datos'), false);
  eq('el arreglo habla del enlace, no de publicar una política', /Revisa el enlace/.test(item(r, 'politica').arreglo), true);
}
{
  const f = fakeRed({
    'https://ejemplo.cl/': { status: 200, body: pagina('<a href="/privacidad">Privacidad</a><a href="/aviso-legal">Aviso legal</a>') },
    'https://ejemplo.cl/privacidad': { status: 404 },
    'https://ejemplo.cl/aviso-legal': { status: 200, body: '<html>aviso</html>' },
  });
  const r = await chequear('ejemplo.cl', f);
  eq('el primero roto, el segundo abre: ok', item(r, 'politica').estado, 'ok');
  eq('en verde dice que NO leímos el contenido', /No leímos su contenido/.test(item(r, 'politica').detalle), true);
  // LC-9: el que abrió es un "Aviso legal", y un aviso legal puede no ser una política de privacidad.
  eq('en verde no afirma más de lo que vimos (LC-9)', /tu política de privacidad o aviso legal, y la página abre/.test(item(r, 'politica').detalle), true);
}
{
  const f = fakeRed({
    'https://ejemplo.cl/': { status: 200, body: pagina('<a href="/politica">Política de privacidad</a>') },
    'https://ejemplo.cl/politica': { status: 404 },
  });
  const r = await chequear('ejemplo.cl', f);
  eq('roto también dice "o aviso legal" (LC-9)', /^Encontramos un enlace a tu política de privacidad o aviso legal, pero esa página responde que no existe\.$/.test(item(r, 'politica').detalle), true);
  eq('no pendiente: se dice "no encontramos" sin inventar el contenido de la política (LC-8 d)',
     /al menos 12 puntos de información/.test(item(await chequear('ejemplo.cl', fakeRed({ 'https://ejemplo.cl/': { status: 200, body: pagina(MENU) } })), 'politica').arreglo), true);
}
{
  const f = fakeRed({
    'https://ejemplo.cl/': { status: 200, body: pagina('<a href="/privacidad/">Privacidad</a>') },
    'https://ejemplo.cl/privacidad/': { status: 301, location: 'https://ejemplo.cl/' },
  });
  const r = await chequear('ejemplo.cl', f);
  eq('un enlace que vuelve a la portada no es una política', [item(r, 'politica').estado, /vuelta a tu portada/.test(item(r, 'politica').detalle)], ['pendiente', true]);
}
{
  // Pages sin 404.html devuelve la portada con 200 para cualquier ruta.
  const cuerpo = pagina('<a href="/privacidad/">Privacidad</a>');
  const f = fakeRed({ 'https://ejemplo.cl/': { status: 200, body: cuerpo }, 'https://ejemplo.cl/privacidad/': { status: 200, body: cuerpo } });
  eq('una "política" que es la portada otra vez: no', item(await chequear('ejemplo.cl', f), 'politica').estado, 'pendiente');
}

console.log('=== 12. www: se respeta lo escrito y se prueba la otra variante ===');
{
  const f = fakeRed({
    'https://www.ejemplo.cl/': { status: 200, body: conPolitica() },
    'https://www.ejemplo.cl/privacidad/': { status: 200, body: 'p' },
  });
  const r = await chequear('www.ejemplo.cl', f);
  eq('escribió www: se empieza por www', [r.ok, f.vistas[0], r.dominio], [true, 'https://www.ejemplo.cl/', 'www.ejemplo.cl']);
  eq('y no se toca el dominio pelado', f.vistas.includes('https://ejemplo.cl/'), false);
  eq('sin informativo de dirección', r.informativos.some((i) => i.id === 'direccion'), false);
}
for (const [nombre, pelado] of [
  ['sin DNS / sin conexión (bancoestado.cl)', null],
  ['bucle (centroodontologicomaipu.cl)', { status: 301, location: 'https://ejemplo.cl/' }],
  ['530 de Cloudflare', { status: 530 }],
  ['certificado roto (526)', { status: 526 }],
]) {
  const rutas = {
    'https://www.ejemplo.cl/': { status: 200, body: conPolitica() },
    'https://www.ejemplo.cl/privacidad/': { status: 200, body: 'p' },
    'http://ejemplo.cl/': { status: 200, body: pagina('http') },
  };
  if (pelado) rutas['https://ejemplo.cl/'] = pelado;
  const f = fakeRed(rutas);
  const r = await chequear('ejemplo.cl', f);
  eq(`pelado con ${nombre}: se revisa www`, [r.ok, r.revisado], [true, 'https://www.ejemplo.cl/']);
  eq(`pelado con ${nombre}: el informe lo dice`, r.informativos.some((i) => i.id === 'direccion' && /Sin www/.test(i.detalle)), true);
}
{
  const f = fakeRed({ 'https://ejemplo.cl/': { status: 200, body: conPolitica() }, 'https://ejemplo.cl/privacidad/': { status: 200, body: 'p' } });
  const r = await chequear('www.ejemplo.cl', f);
  eq('escribió www y no existe: se revisa sin www', [r.ok, r.revisado, r.dominio], [true, 'https://ejemplo.cl/', 'www.ejemplo.cl']);
}
{
  const f = fakeRed({ 'https://ejemplo.cl/': { status: 403 }, 'https://www.ejemplo.cl/': { status: 200, body: conPolitica() } });
  const r = await chequear('ejemplo.cl', f);
  eq('un 403 es el sitio respondiendo: no se prueba www', [r.ok, r.codigo, f.vistas.includes('https://www.ejemplo.cl/')], [false, 403, false]);
}
{
  // La variante pasa por el mismo portón: www redirige a metadata y nunca se pide.
  const f = fakeRed({
    'https://www.ejemplo.cl/': { status: 302, location: 'http://169.254.169.254/latest/meta-data/' },
    'http://ejemplo.cl/': { status: 302, location: 'http://127.0.0.1/' },
  });
  const r = await chequear('ejemplo.cl', f);
  eq('variante hacia metadata: no se pide', f.vistas.some((u) => u.includes('169.254') || u.includes('127.0.0.1')), false);
  eq('y no hay informe', r.ok, false);
}
{
  const f = fakeRed({ 'http://ejemplo.cl/': { status: 200, body: conPolitica() }, 'http://ejemplo.cl/privacidad/': { status: 200, body: 'p' } });
  const r = await chequear('ejemplo.cl', f);
  eq('sin https ni www: cae a http', [r.ok, r.revisado, item(r, 'https').estado], [true, 'http://ejemplo.cl/', 'pendiente']);
  eq('primero se probó www', f.vistas.includes('https://www.ejemplo.cl/'), true);
}
{
  const r = await chequear('ejemplo.cl', fakeRed({ 'https://ejemplo.cl/': { status: 530 }, 'https://www.ejemplo.cl/': { status: 530 } }));
  eq('530 en las dos: sin código (es de Cloudflare, no del sitio)', [r.ok, r.tipo, r.codigo, /No encontramos un sitio publicado/.test(r.error)], [false, 'sitio', undefined, true]);
}
{
  const f = fakeRed({ 'https://ejemplo.cl/': { status: 301, location: 'https://ejemplo.cl/' }, 'https://www.ejemplo.cl/': { status: 301, location: 'https://www.ejemplo.cl/' } });
  const r = await chequear('ejemplo.cl', f);
  eq('bucle en las dos: sin código inventado', [r.ok, r.tipo, r.codigo], [false, 'sitio', undefined]);
  eq('y el mensaje habla del bucle sin número', [/bucle de redirecciones/.test(r.error), /508/.test(r.error)], [true, false]);
  eq('ni http:// tras un bucle', f.vistas.includes('http://ejemplo.cl/'), false);
}
{
  const r = await chequear('ejemplo.cl', fakeRed({}));
  eq('nada conecta: mensaje de conexión, sin código', [r.ok, r.tipo, r.codigo, r.error], [false, 'sitio', undefined, mensajeDeFallo('conexion')]);
}
{
  const r = await chequear('ejemplo.cl', fakeRed({ 'https://ejemplo.cl/': { status: 526 }, 'https://www.ejemplo.cl/': { status: 526 } }));
  eq('526 sin salida: mensaje del certificado, sin código', [/certificado/.test(r.error), r.codigo], [true, undefined]);
}
{
  const r = await chequear('ejemplo.cl', fakeRed({ 'https://ejemplo.cl/': { status: 503 } }));
  eq('503 del servidor del sitio: con código', [r.codigo, r.tipo], [503, 'sitio']);
}

console.log('=== 13. los mensajes de falla ===');
for (const k of ['tiempo', 'conexion', 'destino', 'bucle', 'pesada', 'vacia', 401, 403, 404, 410, 429, 500, 503, 525, 526, 530, 418]) {
  const m = mensajeDeFallo(k);
  eq(`${k}: sin correo`, /@/.test(m), false);
  eq(`${k}: sin raya larga`, /—/.test(m), false);
  eq(`${k}: sin voseo`, /\b(tenés|podés|querés|revisá|intentá|escribinos)\b/i.test(m), false);
}
eq('tiempo: no culpa al dominio', /revisa el dominio/i.test(mensajeDeFallo('tiempo')), false);
eq('tiempo: dice que no respondió a tiempo', /no respondió a tiempo/.test(mensajeDeFallo('tiempo')), true);

console.log('=== 14. tiempo lineal con HTML hecho para hacer sufrir ===');
{
  // Medido el 23-sep con las regex viejas: 24 KB de '<a href="x" ' = 24 s de CPU (política),
  // 48 KB de '<html ' = 240 ms (lang), 56 KB de '<input ' en un form = 380 ms (casilla).
  const casos = {
    'enlaces sin cerrar': '<a href="x" '.repeat(240_000),
    'html sin cerrar': '<html '.repeat(480_000),
    'inputs sin cerrar en un form': '<form>' + '<input '.repeat(400_000) + '</form>',
    'muchos forms y un input al final': '<form></form>'.repeat(200_000) + '<input type=checkbox>',
    'scripts sin cerrar': '<script '.repeat(330_000),
    'enlaces con interior enorme': ('<a href="/privacidad/">' + 'x'.repeat(5000)).repeat(500),
    // Y HTML válido pero enorme: muchos enlaces cerrados, todos con pinta de política.
    'enlaces cerrados': '<a href="/x">x</a>'.repeat(160_000),
    'enlaces distintos con texto de política': Array.from({ length: 50_000 }, (_, i) => `<a href="/privacidad-${i}/">Política de privacidad</a>`).join(''),
    // 23-sep, lo nuevo: los datos de un sitio armado con JavaScript, la raíz vacía y la página de
    // bloqueo. Todos llevan una marca de SPA para que el análisis llegue hasta el final.
    'datos: "url":" sin cerrar, repetido': '<app-root ng-version="1"></app-root>' + '"url":"'.repeat(350_000),
    'datos: clave y un mar de espacios': '<app-root ng-version="1"></app-root>' + ('"url"' + ' '.repeat(50_000)).repeat(50),
    'datos: \\"href\\" escapado, miles distintos': '<app-root ng-version="1"></app-root><script>self.__next_f.push([1,"' +
      Array.from({ length: 50_000 }, (_, i) => `\\"href\\":\\"/politica-de-privacidad-${i}\\"`).join(',') + '"])</script>',
    'datos: valores de 300 caracteres pegados': '<app-root ng-version="1"></app-root>' + ('"href":"/' + 'a'.repeat(400)).repeat(6_000),
    'raíz vacía y miles de etiquetas': '<div id="root"></div>' + '<b>'.repeat(900_000),
    'raíz vacía y un script sin cerrar': '<div id="root"></div>' + '<script>' + 'x'.repeat(2_500_000),
    'raíz vacía y comentarios sin cerrar': '<div id="root"></div>' + '<!--'.repeat(700_000),
    'raíz vacía y scripts que abren y cierran': '<div id="root"></div>' + '<script></script>'.repeat(150_000),
  };
  for (const [nombre, html] of Object.entries(casos)) {
    const f = fakeRed({ 'https://ejemplo.cl/': { status: 200, body: html }, 'https://ejemplo.cl/privacidad/': { status: 404 } });
    const t0 = performance.now();
    const r = await chequear('ejemplo.cl', f);
    const ms = performance.now() - t0;
    console.log(`  ${nombre} (${(html.length / 1e6).toFixed(1)} MB): ${ms.toFixed(0)} ms`);
    eq(`${nombre}: responde`, typeof r.ok, 'boolean');
    eq(`${nombre}: bajo 1,5 s`, ms < 1500, true);
  }
}
{
  // R1, 23-sep: las rutas de plugin y la de Meta Pixel llevaban `[^"'\s]*`, y esa clase
  // incluye la barra. Con la semilla repetida, sin comillas ni espacios, cada inicio recorría
  // todo lo que quedaba: 847 ms con 200 KB y 4,6 minutos con 2,8 MB, que en Pages muere por
  // límite de CPU. Con `[^"'\s]{0,160}` la misma entrada queda en decenas de ms. Una fila por
  // semilla, con el presupuesto apretado: si alguien vuelve a soltar el tope, esto se cae.
  const SEMILLAS = ['/plugins/cookie-law-info/', '/plugins/cookieadmin/', '/plugins/real-cookie-banner/',
    '/plugins/borlabs-cookie/', '/plugins/gdpr-cookie-compliance/', '/plugins/cookie-notice/',
    'connect.facebook.net/', '/plugins/complianz-gdpr/'];
  for (const semilla of SEMILLAS) {
    const cuerpo = semilla.repeat(Math.ceil(2_800_000 / semilla.length)).slice(0, 2_800_000);
    const html = '<html lang="es"><head><title>T</title></head><body>' + cuerpo + '</body></html>';
    const f = fakeRed({ 'https://ejemplo.cl/': { status: 200, body: html } });
    const t0 = performance.now();
    const r = await chequear('ejemplo.cl', f);
    const ms = performance.now() - t0;
    console.log(`  semilla ${semilla} (2,8 MB): ${ms.toFixed(0)} ms`);
    eq(`semilla ${semilla}: responde`, r.ok, true);
    eq(`semilla ${semilla}: bajo 250 ms`, ms < 250, true);
  }
  // Y el tope no puede romper las rutas reales de cada plugin.
  for (const [html, esperado] of [
    ['<script src="https://x.cl/wp-content/plugins/cookie-law-info/lite/frontend/js/script.min.js?ver=3.2.3"></script>', 'CookieYes'],
    ['<script src="https://abogadospyme.cl/wp-content/plugins/cookieadmin/assets/js/consent.js?ver=1.2.2"></script>', 'CookieAdmin'],
    ['<script src="/wp-content/plugins/cookieadmin-pro/assets/js/consent.min.js"></script>', 'CookieAdmin'],
    ['<script src="/wp-content/plugins/real-cookie-banner/public/dist/banner.js?ver=4.7.1"></script>', 'Real Cookie Banner'],
    ['<script src="/wp-content/plugins/real-cookie-banner-pro/public/dist/banner.js"></script>', 'Real Cookie Banner'],
    ['<script src="/wp-content/plugins/borlabs-cookie/assets/javascript/borlabs-cookie.min.js"></script>', 'Borlabs Cookie'],
    ['<script src="/wp-content/plugins/gdpr-cookie-compliance/dist/scripts/main.js?ver=4.14"></script>', 'GDPR Cookie Compliance'],
    ['<script src="/wp-content/plugins/cookie-notice/js/front.min.js?ver=2.4.16"></script>', 'Cookie Notice'],
  ]) eq(`la ruta real sigue calzando: ${esperado}`, detectarCmp(html), esperado);
  const conPixel = await chequear('ejemplo.cl', fakeRed({
    'https://ejemplo.cl/': { status: 200, body: conPolitica('<script src="https://connect.facebook.net/es_LA/fbevents.js"></script>') },
    'https://ejemplo.cl/privacidad/': { status: 200, body: 'p' },
  }));
  eq('la ruta real de Meta Pixel sigue calzando',
     conPixel.informativos.find((i) => i.id === 'proveedores').detalle.startsWith('Encontramos: Meta Pixel.'), true);
}

console.log('=== 15. no-store en todas las respuestas ===');
{
  const r400 = await onRequestGet({ request: new Request('https://verifica.spindlelab.cl/api/chequeo?dominio=localhost') });
  eq('400: no-store', [r400.status, r400.headers.get('cache-control')], [400, 'no-store']);
  eq('400: tipo entrada', (await r400.json()).tipo, 'entrada');
  const fetchReal = globalThis.fetch;
  try {
    globalThis.fetch = fakeRed({ 'https://ejemplo.cl/': { status: 200, body: conPolitica() }, 'https://ejemplo.cl/privacidad/': { status: 200, body: 'p' } });
    const r200 = await onRequestGet({ request: new Request('https://verifica.spindlelab.cl/api/chequeo?dominio=ejemplo.cl') });
    eq('200: no-store', [r200.status, r200.headers.get('cache-control')], [200, 'no-store']);
    // Un cuerpo que no es texto hace fallar el análisis: es la forma de llegar al 500.
    globalThis.fetch = async (url) => ({ status: 200, url, headers: { get: () => null }, text: async () => 123 });
    const r500 = await onRequestGet({ request: new Request('https://verifica.spindlelab.cl/api/chequeo?dominio=ejemplo.cl') });
    const j500 = await r500.json();
    eq('500: no-store', [r500.status, r500.headers.get('cache-control')], [500, 'no-store']);
    eq('500: tipo sitio y sin correo', [j500.ok, j500.tipo, /@/.test(j500.error)], [false, 'sitio', false]);
  } finally {
    globalThis.fetch = fetchReal;
  }
}

console.log('=== 16. el middleware que muda pages.dev al dominio definitivo ===');
async function porMiddleware(u) {
  let siguio = false;
  const r = await middleware({ request: new Request(u), next: async () => { siguio = true; return new Response('estático'); } });
  return { status: r.status, location: r.headers.get('location'), siguio };
}
eq('pages.dev con ruta y consulta: 301 al dominio nuevo',
   await porMiddleware('https://verificaycumple.pages.dev/privacidad/?dominio=x.cl&a=1'),
   { status: 301, location: 'https://verifica.spindlelab.cl/privacidad/?dominio=x.cl&a=1', siguio: false });
eq('la API también se muda', (await porMiddleware('https://verificaycumple.pages.dev/api/chequeo?dominio=x.cl')).location,
   'https://verifica.spindlelab.cl/api/chequeo?dominio=x.cl');
eq('la raíz', (await porMiddleware('https://verificaycumple.pages.dev/')).location, 'https://verifica.spindlelab.cl/');
eq('vista previa de un despliegue: pasa', await porMiddleware('https://3f2a1b9c.verificaycumple.pages.dev/'), { status: 200, location: null, siguio: true });
eq('vista previa de rama: pasa', (await porMiddleware('https://laboratorio-ley-21719.verificaycumple.pages.dev/x')).siguio, true);
eq('el dominio nuevo: pasa', (await porMiddleware('https://verifica.spindlelab.cl/')).siguio, true);
eq('localhost: pasa', (await porMiddleware('http://localhost:8781/')).siguio, true);
eq('un host que solo se le parece: pasa', (await porMiddleware('https://verificaycumple.pages.dev.evil.cl/')).siguio, true);

console.log('=== 17. el peor caso de espera ===');
{
  // Todo se cuelga hasta que lo cortan. Tiene que rendirse con "no respondió a tiempo" en
  // unos 16 s (un intento más una segunda ronda en paralelo), no en 24 ni en 40.
  const colgado = fakeRed({
    'https://ejemplo.cl/': { cuelga: true }, 'https://www.ejemplo.cl/': { cuelga: true }, 'http://ejemplo.cl/': { cuelga: true },
  });
  // El peor caso CON informe: el pelado se cuelga, www contesta justo antes del corte y el
  // enlace de la política se cuelga. Es la suma más larga que el código permite.
  const lento = fakeRed({
    'https://ejemplo.cl/': { cuelga: true }, 'http://ejemplo.cl/': { cuelga: true },
    'https://www.ejemplo.cl/': { status: 200, body: pagina('<a href="/privacidad/">Privacidad</a><a href="/aviso-legal">Aviso legal</a>'), retardo: 7500 },
    'https://www.ejemplo.cl/privacidad/': { cuelga: true }, 'https://www.ejemplo.cl/aviso-legal': { cuelga: true },
  });
  const medir = async (f) => { const t0 = Date.now(); const r = await chequear('ejemplo.cl', f); return { r, s: (Date.now() - t0) / 1000 }; };
  const [a, b] = await Promise.all([medir(colgado), medir(lento)]);
  console.log(`  todo colgado: ${a.s.toFixed(1)} s · peor caso con informe: ${b.s.toFixed(1)} s`);
  eq('todo colgado: mensaje de tiempo, sin código', [a.r.ok, a.r.error, a.r.codigo], [false, mensajeDeFallo('tiempo'), undefined]);
  eq('todo colgado: se rinde en menos de 17 s', a.s < 17, true);
  eq('peor caso con informe: hay informe', b.r.ok, true);
  // LC-3: que la política tarde es un límite nuestro (o un sitio lento), no un enlace roto. Antes
  // quedaba pendiente, restaba 8 puntos y el arreglo culpaba al enlace.
  eq('peor caso con informe: la política colgada queda sin confirmar', [item(b.r, 'politica').estado, /no respondió a tiempo, así que no la pudimos abrir\. No lo contamos ni a favor ni en contra\./.test(item(b.r, 'politica').detalle)], ['sin-confirmar', true]);
  eq('peor caso con informe: y no culpa al enlace', /Revisa el enlace/.test(item(b.r, 'politica').arreglo), false);
  eq('peor caso con informe: menos de 25 s', b.s < 25, true);
}

console.log('=== 18. F2: una página de bloqueo que llega con 200 no se puntúa ===');
// La landing chica de verdad de R3: título, h1, formulario con casilla premarcada y el pie
// estándar del aviso de reCAPTCHA, que trae exactamente dos enlaces.
const LANDING_RECAPTCHA = '<!DOCTYPE html><html lang="es"><head><title>Dra. Pérez · Kinesiología</title></head><body>' +
  '<h1>Kinesiología a domicilio en Ñuñoa</h1><p>Agenda tu evaluación. Te respondemos el mismo día.</p>' +
  '<form action="/enviar" method="post"><label>Nombre <input name="nombre"></label><label>Teléfono <input name="fono"></label>' +
  '<label><input type="checkbox" name="ok" checked> Acepto que me contacten</label><button>Enviar</button></form>' +
  '<p class="legal">Este sitio está protegido por reCAPTCHA y se aplican la <a href="https://policies.google.com/privacy">Política de privacidad</a> ' +
  'y las <a href="https://policies.google.com/terms">Condiciones del servicio</a> de Google.</p></body></html>';
{
  // El HTML exacto que www.bancoestado.cl le devolvió a nuestro lector el 23-sep (650 bytes).
  const BANCO = fs.readFileSync('/private/tmp/claude-501/-Users-ramon-Library-Mobile-Documents-com-apple-CloudDocs-SPINDLELAB/befb9f93-f301-497e-a5c3-ea7342366826/scratchpad/verif/integracion/home-www.bancoestado.cl.html', 'utf8');
  eq('el HTML guardado es el de la evidencia', [BANCO.length > 600 && BANCO.length < 700, /se ha restringido este acceso/.test(BANCO)], [true, true]);
  eq('esPaginaDeBloqueo: bancoestado', esPaginaDeBloqueo(BANCO), true);
  const f = fakeRed({ 'https://www.bancoestado.cl/': { status: 200, body: BANCO } });
  const r = await chequear('www.bancoestado.cl', f);
  eq('bancoestado: sin informe, falla del sitio con el mensaje del firewall', [r.ok, r.tipo, r.codigo, r.error], [false, 'sitio', undefined, mensajeDeFallo('vacia')]);
  eq('bancoestado: no se pidió nada más (ni política ni variantes)', f.vistas, ['https://www.bancoestado.cl/']);
  // Como en vivo: el pelado no conecta y www responde con el bloqueo.
  const r2 = await chequear('bancoestado.cl', fakeRed({ 'https://www.bancoestado.cl/': { status: 200, body: BANCO } }));
  eq('bancoestado.cl por www: tampoco hay informe', [r2.ok, r2.error], [false, mensajeDeFallo('vacia')]);
}
{
  // Imperva/Incapsula: trae html/head/body, pero el texto es el del bloqueo y no hay enlaces.
  const incapsula = '<html style="height:100%"><head><META NAME="ROBOTS" CONTENT="NOINDEX, NOFOLLOW"></head><body style="margin:0px;height:100%"><iframe id="main-iframe" src="/_Incapsula_Resource?CWUDNSAI=1" frameborder=0 width="100%" height="100%">Request unsuccessful. Incapsula incident ID: 123-456</iframe></body></html>';
  eq('Incapsula con esqueleto: es bloqueo', esPaginaDeBloqueo(incapsula), true);
  // AWS WAF responde 202 con un desafío de JavaScript.
  const aws = '<!DOCTYPE html><html lang="en"><head><title></title><script src="https://abc.token.awswaf.com/abc/challenge.js"></script></head><body><noscript><h1>JavaScript is disabled</h1>In order to continue, we need to verify that you\'re not a robot. This requires JavaScript. Enable JavaScript and then reload the page.</noscript></body></html>';
  const r = await chequear('ejemplo.cl', fakeRed({ 'https://ejemplo.cl/': { status: 202, body: aws } }));
  eq('desafío de AWS WAF (202): sin informe', [r.ok, r.tipo, r.error], [false, 'sitio', mensajeDeFallo('vacia')]);
  eq('JSON o texto suelto en la portada: tampoco se puntúa', esPaginaDeBloqueo('{"status":"ok"}'), true);
}
{
  // Lo que NO es bloqueo: portadas chicas de verdad.
  for (const [nombre, html] of [
    ['portada mínima con <title>', '<!doctype html><title>Hola</title><p>Sitio en construcción</p>'],
    ['portada mínima con <html>', '<html><p>Hola</p></html>'],
    ['formulario con reCAPTCHA y menú', pagina('<nav><a href="/">Inicio</a><a href="/servicios">Servicios</a><a href="/contacto">Contacto</a></nav><form><input name="correo"></form><p>Este sitio está protegido por reCAPTCHA.</p>')],
    ['post largo que habla de accesos bloqueados', pagina('<h1>Cómo evitar que tu cuenta quede bloqueada</h1><p>' + 'Texto del artículo con consejos para pymes. '.repeat(60) + '</p>')],
    ['"captcha" solo en un script', pagina('<script src="https://www.google.com/recaptcha/api.js"></script><h1>Clínica</h1><p>Agenda tu hora.</p>')],
    // R3, 23-sep: el pie estándar del aviso de reCAPTCHA trae exactamente DOS enlaces (la
    // política y las condiciones de Google), así que una landing de una sola página con
    // formulario calzaba entera con la regla 2 y recibía "tu sitio no nos entregó HTML". Es
    // falso (sí entregó HTML) y le niega el informe justo al cliente que buscamos.
    ['landing de una página con el aviso de reCAPTCHA (2 enlaces)', LANDING_RECAPTCHA],
  ]) eq(`no es bloqueo: ${nombre}`, esPaginaDeBloqueo(html), false);
  {
    const r = await chequear('kine.cl', fakeRed({ 'https://kine.cl/': { status: 200, body: LANDING_RECAPTCHA } }));
    eq('la landing con reCAPTCHA sí recibe informe (R3)', [r.ok, item(r, 'politica').estado, item(r, 'casilla').estado], [true, 'pendiente', 'pendiente']);
    // Con un tercer enlace tiene que dar exactamente lo mismo: el número de enlaces ya no
    // decide si hay informe.
    const r3 = await chequear('kine.cl', fakeRed({ 'https://kine.cl/': { status: 200, body: LANDING_RECAPTCHA.replace('<h1>', '<a href="https://wa.me/56900000000">WhatsApp</a><h1>') } }));
    eq('y con un tercer enlace, el mismo resultado', [r3.ok, r3.puntaje], [r.ok, r.puntaje]);
  }
  {
    // Las frases de aviso de verdad siguen reconociéndose, que es lo que la lista corta podría
    // haber roto.
    for (const [nombre, texto] of [
      ['Cloudflare Turnstile', '<html><head><title></title></head><body><h2>Verify you are human</h2><p>This may take a few seconds.</p></body></html>'],
      ['Cloudflare "checking your browser"', '<html><head><title>Just a moment...</title></head><body><h1>Checking your browser before accessing the site.</h1></body></html>'],
      ['Google "unusual traffic"', '<html><head><title>Error</title></head><body><p>Our systems have detected unusual traffic from your computer network.</p></body></html>'],
    ]) eq(`sigue siendo bloqueo: ${nombre}`, esPaginaDeBloqueo(texto), true);
  }
  const r = await chequear('ejemplo.cl', fakeRed({
    'https://ejemplo.cl/': { status: 200, body: '<!doctype html><title>Hola</title><p>Sitio en construcción</p><a href="/privacidad/">Privacidad</a>' },
    'https://ejemplo.cl/privacidad/': { status: 200, body: '<html>p</html>' },
  }));
  eq('una portada chica de verdad sí tiene informe', [r.ok, item(r, 'politica').estado], [true, 'ok']);
}
{
  // R4, 23-sep: una portada que solo redirige con <meta http-equiv="refresh"> (corriente en
  // hosting compartido: un index.html que lleva a /es/ o a /wordpress/). Antes se puntuaba
  // como si fuera la página; después caía en la guardia del HTML ilegible y el mensaje
  // culpaba a un firewall que no existe. Ahora se sigue una vez, por el mismo portón.
  const destino = conPolitica();
  const f = fakeRed({
    'https://refresh.cl/': { status: 200, body: '<meta http-equiv="refresh" content="0; url=https://refresh.cl/es/">' },
    'https://refresh.cl/es/': { status: 200, body: destino },
    'https://refresh.cl/privacidad/': { status: 200, body: '<html>p</html>' },
  });
  const r = await chequear('refresh.cl', f);
  eq('meta refresh: se sigue y hay informe', [r.ok, r.revisado, item(r, 'politica').estado], [true, 'https://refresh.cl/es/', 'ok']);
  eq('meta refresh: el informe lo dice', r.informativos.some((i) => i.id === 'refresco' && /meta refresh/.test(i.detalle)), true);
  eq('meta refresh: la política se resolvió contra la dirección nueva', f.vistas.includes('https://refresh.cl/privacidad/'), true);
  // El destino pasa por el mismo portón que todo lo demás.
  const malo = fakeRed({ 'https://refresh.cl/': { status: 200, body: '<meta http-equiv="refresh" content="0;url=http://169.254.169.254/latest/meta-data/">' } });
  const rm = await chequear('refresh.cl', malo);
  eq('meta refresh hacia metadata: no se pide', malo.vistas.some((u) => u.includes('169.254')), false);
  eq('y sin informe, con un mensaje que no habla de firewall', [rm.ok, /firewall/.test(rm.error), /manda a quien entra hacia otra dirección/.test(rm.error)], [false, false, true]);
  // Si el destino tampoco sirve, el mensaje es el propio, no el del firewall.
  const roto = await chequear('refresh.cl', fakeRed({
    'https://refresh.cl/': { status: 200, body: '<meta http-equiv="refresh" content="0; url=/es/">' },
    'https://refresh.cl/es/': { status: 404 },
  }));
  eq('meta refresh a una página que no existe: mensaje propio', [roto.ok, roto.error], [false, mensajeDeFallo('refresco')]);
  // Lo que NO se sigue: una recarga sola (sin url) y una espera larga.
  for (const [nombre, contenido] of [['sin url', '600'], ['espera larga', '600; url=/es/'], ['vacío', '']]) {
    eq(`meta refresh ${nombre}: no se sigue`, destinoDeMetaRefresh(`<meta http-equiv="refresh" content="${contenido}">`, 'https://refresh.cl/'), null);
  }
  eq('meta refresh hacia la misma dirección: no se sigue', destinoDeMetaRefresh('<meta http-equiv="refresh" content="0; url=/">', 'https://refresh.cl/'), null);
  eq('meta refresh con comillas y mayúsculas', destinoDeMetaRefresh('<META HTTP-EQUIV="Refresh" CONTENT="0; URL=\'/es/\'">', 'https://refresh.cl/'), 'https://refresh.cl/es/');
}

console.log('=== 19. F3: sitios armados con JavaScript ===');
const NG = (datos, extra = '') => pagina(`<app-root ng-version="18.2.14"></app-root><script id="ng-state" type="application/json">${datos}</script>${extra}`);
eq('marca: Angular', armadoConJavaScript('<app-root _nghost-ng-c1 ng-version="18.2.14"></app-root>'), true);
eq('marca: Next (pages)', armadoConJavaScript('<script id="__NEXT_DATA__" type="application/json">{}</script>'), true);
eq('marca: Next (app router)', armadoConJavaScript('<script>self.__next_f.push([1,""])</script>'), true);
eq('marca: Nuxt', armadoConJavaScript('<div id="__nuxt"></div><script>window.__NUXT__={}</script>'), true);
eq('marca: raíz vacía de React', armadoConJavaScript(pagina('<noscript>You need to enable JavaScript to run this app.</noscript><div id="root"></div>')), true);
// Estas dos cambiaron el 23-sep: los fixtures no tenían NINGÚN enlace, y desde I2-5 una
// portada sin enlaces navegables ya se trata como armada con JavaScript. Lo que siguen
// probando es lo de siempre: que el texto adentro de #root, y que un id="page", no son SPA.
eq('no: raíz "root" con la portada entera adentro', armadoConJavaScript(pagina('<div id="root">' + MENU + '<h1>Clínica</h1><p>' + 'Atendemos de lunes a viernes. '.repeat(20) + '</p></div>')), false);
eq('no: una portada de WordPress', armadoConJavaScript(pagina('<div id="page">' + MENU + '<p>Hola</p></div>')), false);

{
  // R2, 23-sep: Next, Nuxt y Angular Universal ponen su marca TAMBIÉN cuando la página viene
  // renderizada en el servidor. Ahí el menú y el pie sí están en el HTML, así que "no lo
  // pudimos ver" es falso: tapaba una política que de verdad falta y, por la búsqueda en los
  // datos del menú, podía terminar en un 100 verde sin que ningún <a> la enlazara.
  const menuLargo = '<nav>' + Array.from({ length: 12 }, (_, i) => `<a href="/p${i}/">Página ${i}</a>`).join('') + '</nav>';
  const prosa = '<p>' + 'Clínica dental con veinte años de experiencia en Providencia. '.repeat(6) + '</p>';
  const ssr = (marca) => pagina(`${marca}${menuLargo}<h1>Clínica</h1>${prosa}<footer>${menuLargo}</footer>`);
  for (const [nombre, marca] of [
    ['Next con render en servidor', '<script id="__NEXT_DATA__" type="application/json">{"props":{}}</script>'],
    ['Nuxt con render en servidor', '<div id="__nuxt"></div>'],
    ['Angular con render en servidor', '<app-root ng-version="17.3.0" ng-server-context="ssr"></app-root>'],
  ]) {
    eq(`no es SPA: ${nombre}`, armadoConJavaScript(ssr(marca)), false);
    const r = await chequear('clinica.cl', fakeRed({ 'https://clinica.cl/': { status: 200, body: ssr(marca) } }));
    eq(`${nombre}: la política que falta queda pendiente, no escondida`, item(r, 'politica').estado, 'pendiente');
    eq(`${nombre}: mismo resultado que sin la marca`, r.puntaje, (await chequear('clinica.cl', fakeRed({ 'https://clinica.cl/': { status: 200, body: ssr('') } }))).puntaje);
  }
  // Y el verde falso que abría la búsqueda en los datos: la ruta está en los props de Next y
  // responde 200, pero ningún <a> la enlaza.
  const conDatos = ssr('<script id="__NEXT_DATA__" type="application/json">{"props":{"paginas":[{"title":"Política de privacidad","path":"/politica-de-privacidad"}]}}</script>');
  const rv = await chequear('clinica.cl', fakeRed({
    'https://clinica.cl/': { status: 200, body: conDatos },
    'https://clinica.cl/politica-de-privacidad': { status: 200, body: '<html>p</html>' },
  }));
  eq('render en servidor: los datos del menú no dan verde (R2)', [item(rv, 'politica').estado, rv.puntaje], ['pendiente', 43]);
}
{
  // I2-5, 23-sep: entel.cl tiene cuatro <a>, los cuatro con href="#", y el pie con
  // "Privacidad" aparece solo en el navegador. No trae ninguna marca de framework (es Modyo),
  // así que salía acusado de no tener política. Solo cambia 'pendiente' por 'sin-confirmar'.
  const sinNavegar = pagina('<h1>Entel</h1><p>' + 'Planes, equipos y servicios. '.repeat(20) + '</p>' +
    '<a href="#">Menú</a><a href="#">Buscar</a><a href="javascript:void(0)">Ayuda</a><a href="mailto:hola@x.cl">Correo</a><a href="tel:+56200">Llámanos</a>');
  eq('sin ningún enlace navegable: armada con JavaScript (I2-5)', comoSeArma(sinNavegar), 'sin-enlaces');
  const r = await chequear('entel.cl', fakeRed({ 'https://entel.cl/': { status: 200, body: sinNavegar } }));
  const pol = item(r, 'politica');
  eq('sin enlaces navegables: sin-confirmar, no pendiente', [pol.estado, r.pendientes], ['sin-confirmar', 0]);
  eq('y dice lo que de verdad vimos', /En tu portada no vimos ningún enlace que lleve a otra página/.test(pol.detalle), true);
  eq('no suma: sin marca de framework, los datos del menú no se miran',
     item(await chequear('entel.cl', fakeRed({
       'https://entel.cl/': { status: 200, body: sinNavegar + '<script type="application/json">{"url":"/politica-de-privacidad"}</script>' },
       'https://entel.cl/politica-de-privacidad': { status: 200, body: '<html>p</html>' },
     })), 'politica').estado, 'sin-confirmar');
  // Un enlace navegable de verdad basta para que vuelva a ser una portada normal.
  eq('con un solo enlace navegable, ya no', comoSeArma(sinNavegar + '<a href="/contacto/">Contacto</a>'), null);
}
{
  // www.clinicasantamaria.cl: el menú viaja como JSON en el estado de Angular.
  const datos = '{"menu":[{"id":"a","title":"Términos","url":"/terminos-y-condiciones/terminos-app","enabled":true},{"id":"b","title":"Política de Privacidad","url":"/terminos-y-condiciones/terminos-y-condiciones/politica-de-privacidad","enabled":true}]}';
  eq('datos: encuentra la política en el JSON', buscarPoliticaEnDatos(NG(datos), BASE).map((c) => c.url), ['https://ejemplo.cl/terminos-y-condiciones/terminos-y-condiciones/politica-de-privacidad']);
  const f = fakeRed({
    'https://ejemplo.cl/': { status: 200, body: NG(datos) },
    'https://ejemplo.cl/terminos-y-condiciones/terminos-y-condiciones/politica-de-privacidad': { status: 200, body: '<html>política</html>' },
  });
  const r = await chequear('ejemplo.cl', f);
  const pol = item(r, 'politica');
  eq('datos + la página abre: ok', pol.estado, 'ok');
  eq('y dice de dónde salió, sin decir que vimos el enlace', /^Tu portada arma sus enlaces con JavaScript, así que no vimos el enlace como tal\. En sus datos aparece la dirección de tu política de privacidad o aviso legal, y la página abre\. No leímos su contenido/.test(pol.detalle), true);
}
{
  // Como pasa en vivo con clinicasantamaria.cl: la dirección del JSON redirige a la portada.
  const datos = '{"title":"Política de Privacidad","url":"/terminos/politica-de-privacidad"}';
  const r = await chequear('ejemplo.cl', fakeRed({
    'https://ejemplo.cl/': { status: 200, body: NG(datos) },
    'https://ejemplo.cl/terminos/politica-de-privacidad': { status: 302, location: '/' },
  }));
  const pol = item(r, 'politica');
  eq('datos + vuelve a la portada: sin confirmar, no pendiente', pol.estado, 'sin-confirmar');
  eq('y lo explica', /lleva de vuelta a tu portada\. Como no sabemos si ese enlace se muestra en tu sitio, no lo contamos ni a favor ni en contra\./.test(pol.detalle), true);
  const r404 = await chequear('ejemplo.cl', fakeRed({ 'https://ejemplo.cl/': { status: 200, body: NG(datos) }, 'https://ejemplo.cl/terminos/politica-de-privacidad': { status: 404 } }));
  eq('datos + 404: sin confirmar (el JSON puede traer ítems ocultos)', item(r404, 'politica').estado, 'sin-confirmar');
}
{
  // Las formas de escribir la comilla y la barra.
  for (const [nombre, html, esperado] of [
    ['Next app router: \\"href\\"', '<script>self.__next_f.push([1,"[\\"$\\",\\"a\\",null,{\\"href\\":\\"/politica-de-privacidad\\",\\"children\\":\\"Privacidad\\"}]"])</script>', ['https://ejemplo.cl/politica-de-privacidad']],
    ['JSON de PHP: \\/', '<script id="__NEXT_DATA__" type="application/json">{"url":"https:\\/\\/ejemplo.cl\\/privacidad\\/"}</script>', ['https://ejemplo.cl/privacidad/']],
    ['Nuxt: \\u002F', '<script>window.__NUXT__={"path":"\\u002Faviso-legal"}</script>', ['https://ejemplo.cl/aviso-legal']],
    ['en un atributo: &quot;', '<app-root ng-version="1" data-menu="{&quot;link&quot;:&quot;/politica-de-privacidad&quot;}"></app-root>', ['https://ejemplo.cl/politica-de-privacidad']],
    ['Angular viejo: &q;', '<script id="serverApp-state" type="application/json">{&q;url&q;:&q;/privacidad&q;}</script>', ['https://ejemplo.cl/privacidad']],
    ['la política de Google en los datos: no', '{"url":"https://policies.google.com/privacy"}', []],
    ['otro sitio, aunque diga privacidad: no', '{"url":"https://otra-clinica.cl/politica-de-privacidad"}', []],
    ['un post del blog: no', '{"url":"/blog/nueva-ley-de-privacidad-en-chile"}', []],
    ['un slug suelto (no sabemos de qué carpeta cuelga): no', '{"url":"politica-de-privacidad"}', []],
    ['una clave que no es de enlace: no', '{"title":"/politica-de-privacidad"}', []],
    ['un subdominio del mismo sitio: sí', '{"url":"https://legal.ejemplo.cl/privacidad"}', ['https://legal.ejemplo.cl/privacidad']],
  ]) eq(`datos: ${nombre}`, buscarPoliticaEnDatos(html, BASE).map((c) => c.url), esperado);
}
{
  // Los candidatos del JSON pasan por el mismo portón: nunca se piden.
  const datos = '{"url":"https://ejemplo.cl:8080/privacidad"} {"url":"https://127.0.0.1.ejemplo.cl/politica-de-privacidad"}';
  const f = fakeRed({ 'https://ejemplo.cl/': { status: 200, body: NG(datos) } });
  const r = await chequear('ejemplo.cl', f);
  eq('datos hacia un puerto raro o una IP metida: nunca se piden', f.vistas, ['https://ejemplo.cl/']);
  eq('y el ítem no queda en verde', item(r, 'politica').estado === 'ok', false);
}
{
  // Si hay un <a>, el JSON no se mira: un enlace de verdad pesa más que una dirección en datos.
  const f = fakeRed({
    'https://ejemplo.cl/': { status: 200, body: NG('{"url":"/datos-privacidad"}', '<footer><a href="/privacidad/">Privacidad</a></footer>') },
    'https://ejemplo.cl/privacidad/': { status: 200, body: 'p' },
  });
  const r = await chequear('ejemplo.cl', f);
  eq('con un <a>, no se piden las direcciones del JSON', [item(r, 'politica').estado, f.vistas.includes('https://ejemplo.cl/datos-privacidad')], ['ok', false]);
}
{
  // En un sitio de HTML normal, una dirección suelta en un JSON no es un enlace que alguien toque.
  const f = fakeRed({ 'https://ejemplo.cl/': { status: 200, body: pagina('<h1>Hola</h1>' + MENU + '<script type="application/ld+json">{"url":"/politica-de-privacidad"}</script>') } });
  const r = await chequear('ejemplo.cl', f);
  eq('sin marca de SPA: el JSON no se usa y queda pendiente', [item(r, 'politica').estado, f.vistas.length], ['pendiente', 1]);
}
{
  const r = await chequear('ejemplo.cl', fakeRed({ 'https://ejemplo.cl/': { status: 200, body: NG('{"menu":[{"title":"Inicio","url":"/"}]}') } }));
  const pol = item(r, 'politica');
  eq('SPA sin nada que se parezca: sin confirmar, no pendiente', pol.estado, 'sin-confirmar');
  eq('y dice por qué', /no lo pudimos ver porque tu sitio arma el menú con JavaScript/.test(pol.detalle), true);
  // I2-2: lo único confirmado es el HTTPS (6 de 20). Antes salía un 100 grande. Un número
  // sacado de una sola señal se lee como si fuera de todas, así que no hay número.
  eq('con solo el HTTPS confirmado: sin puntaje (I2-2)', [r.puntaje, r.pendientes, r.sinConfirmar], [null, 0, 2]);
  eq('y se dice cuánto pudimos confirmar', [r.pesoConfirmado, r.pesoTotal], [6, 20]);
  const vacia = await chequear('ejemplo.cl', fakeRed({ 'https://ejemplo.cl/': { status: 200, body: pagina('<noscript>Activa JavaScript.</noscript><div id="root"></div>') } }));
  eq('raíz vacía de React sin nada: sin confirmar', item(vacia, 'politica').estado, 'sin-confirmar');
}

console.log('=== 19 bis. I2-2: sin la mitad del peso confirmada, no hay número ===');
{
  // www.clinicasantamaria.cl salía con un 100 grande habiendo confirmado solo el HTTPS (6 de
  // 20), que según el propio informe no es uno de los 12 puntos del Art. 14 ter, mientras el
  // sitio carga gtm, gtag, fbevents y clarity sin ningún aviso.
  const santamaria = NG('{"menu":[{"title":"Política de Privacidad","url":"/terminos/politica-de-privacidad"}]}');
  const r = await chequear('ejemplo.cl', fakeRed({
    'https://ejemplo.cl/': { status: 200, body: santamaria },
    'https://ejemplo.cl/terminos/politica-de-privacidad': { status: 302, location: '/' },
  }));
  eq('solo HTTPS confirmado: puntaje null', [r.puntaje, r.pesoConfirmado, r.pesoTotal], [null, 6, 20]);
  eq('y los contadores siguen diciendo la verdad', [r.pendientes, r.sinConfirmar], [0, 2]);
  // Justo en la mitad sí hay número: política pendiente (8) + HTTPS (6) de 20 confirmados.
  const mitad = await chequear('ejemplo.cl', fakeRed({ 'https://ejemplo.cl/': { status: 200, body: pagina('<h1>Hola</h1>' + MENU) } }));
  eq('la mitad justa del peso: sí hay número', [mitad.puntaje, mitad.pesoConfirmado, mitad.pesoTotal], [43, 14, 20]);
  // falabella, wolfenson y spindlelab.cl: política y HTTPS confirmados, permiso sin confirmar.
  const conocidos = await conCuerpo('');
  eq('14 de 20 confirmados: conserva su número', [conocidos.puntaje, conocidos.pesoConfirmado, conocidos.pesoTotal], [100, 14, 20]);
}

console.log('=== 20. LC-3: la política que no pudimos leer no resta ===');
for (const [nombre, ruta, esperadoEstado, patron] of [
  ['403', { status: 403 }, 'sin-confirmar', /no dejó entrar a nuestro lector automático \(suele ser un firewall\)/],
  ['401', { status: 401 }, 'sin-confirmar', /no dejó entrar a nuestro lector automático/],
  ['429', { status: 429 }, 'sin-confirmar', /no dejó entrar a nuestro lector automático/],
  ['sin conexión', null, 'sin-confirmar', /no logramos conectarnos con esa página/],
  ['404', { status: 404 }, 'pendiente', /responde que no existe/],
  ['410', { status: 410 }, 'pendiente', /responde que no existe/],
  ['500', { status: 500 }, 'pendiente', /respondió con un error/],
  ['503', { status: 503 }, 'pendiente', /respondió con un error/],
  ['bucle', { status: 302, location: 'https://ejemplo.cl/privacidad/' }, 'pendiente', /redirige de una dirección a otra sin parar/],
]) {
  const rutas = { 'https://ejemplo.cl/': { status: 200, body: conPolitica(GA) } };
  if (ruta) rutas['https://ejemplo.cl/privacidad/'] = ruta;
  const r = await chequear('ejemplo.cl', fakeRed(rutas));
  const pol = item(r, 'politica');
  eq(`política con ${nombre}: ${esperadoEstado}`, pol.estado, esperadoEstado);
  eq(`política con ${nombre}: el detalle lo explica`, patron.test(pol.detalle), true);
  // Con GA y sin gestor, el permiso queda pendiente: HTTPS 6 + permiso 0, con o sin la política.
  eq(`política con ${nombre}: puntaje`, r.puntaje, esperadoEstado === 'sin-confirmar' ? 50 : 30);
  if (esperadoEstado === 'sin-confirmar') {
    eq(`política con ${nombre}: no va a prioridades`, r.prioridades.some((p) => p.titulo === pol.titulo), false);
    eq(`política con ${nombre}: el arreglo no culpa al enlace`, /Revisa el enlace/.test(pol.arreglo), false);
  }
}
{
  // Un enlace roto y otro que no nos dejó entrar: el segundo puede ser justo la política.
  for (const [a, b] of [[{ status: 404 }, { status: 403 }], [{ status: 403 }, { status: 404 }]]) {
    const r = await chequear('ejemplo.cl', fakeRed({
      'https://ejemplo.cl/': { status: 200, body: pagina('<a href="/privacidad">Privacidad</a><a href="/aviso-legal">Aviso legal</a>') },
      'https://ejemplo.cl/privacidad': a, 'https://ejemplo.cl/aviso-legal': b,
    }));
    eq(`${a.status} y ${b.status}: gana la duda`, [item(r, 'politica').estado, /no dejó entrar/.test(item(r, 'politica').detalle)], ['sin-confirmar', true]);
  }
}

console.log('=== 21. LC-6: la casilla del formulario, cuando la vemos, puntúa ===');
{
  const form = (checked) => `<form action="/enviar"><input type="email" name="correo"><label><input type="checkbox" name="acepto"${checked ? ' checked' : ''}> Acepto la política de privacidad</label></form>`;
  const r = await conCuerpo(form(true));
  const c = item(r, 'casilla');
  eq('premarcada: ítem en el bloque del permiso, peso 4', [c.bloque, c.id, c.titulo, c.peso], ['consentimiento', 'casilla', 'Casilla de consentimiento en tu formulario', 4]);
  eq('premarcada: pendiente, con el arreglo', [c.estado, c.arreglo], ['pendiente', 'Deja la casilla sin marcar, para que la persona la marque ella misma.']);
  eq('premarcada: el acto afirmativo como lectura, no como cita de "casilla"', /\(Art\. 12\)\. Una casilla marcada de antemano no es un acto afirmativo/.test(c.detalle), true);
  eq('premarcada: ya no termina en "ninguna pendiente"', [r.pendientes, r.puntaje], [1, 78]);
  eq('premarcada: va a prioridades', r.prioridades.map((p) => p.titulo), ['Casilla de consentimiento en tu formulario']);
  eq('premarcada: el informativo no repite lo mismo', r.informativos.some((i) => i.id === 'casilla'), false);
  eq('con la casilla, el bloque se nombra entero', r.bloques.find((b) => b.id === 'consentimiento').titulo, 'Cómo pides permiso');
  const r2 = await conCuerpo(form(false));
  eq('sin marcar: ok y sin arreglo', [item(r2, 'casilla').estado, item(r2, 'casilla').arreglo, r2.puntaje], ['ok', null, 100]);
  const r3 = await conCuerpo('');
  eq('sin formulario a la vista: no hay ítem (no se puntúa lo que no vemos)', item(r3, 'casilla'), undefined);
  eq('sin formulario: el informativo lo explica', /no lo puntuamos/.test(r3.informativos.find((i) => i.id === 'casilla').detalle), true);
  eq('sin formulario: el bloque sigue siendo el de los rastreadores', r3.bloques.find((b) => b.id === 'consentimiento').titulo, 'Permiso para los rastreadores');
}

console.log('=== 22. el texto de todas las respuestas ===');
{
  // Todo lo que la API puede decir, en los escenarios de esta prueba: sin raya larga, sin
  // voseo, sin prometer una revisión gratis, sin afirmar lo que no vimos.
  const cuerpos = ['', GA, GA + PIXEL, '<script src="https://www.googletagmanager.com/gtm.js"></script>',
    GA + "<script>gtag('consent', 'default', {});</script>", GA + '<script type="text/plain" data-category="x"></script>',
    '<form><input type="checkbox" checked> Acepto</form>', '<form><input type="checkbox"> Acepto</form>'];
  const textos = [];
  const juntar = (r) => { if (!r.ok) { textos.push(r.error); return; }
    for (const b of r.bloques) textos.push(b.titulo, b.sub);
    for (const i of r.items) textos.push(i.titulo, i.detalle, i.arreglo || '');
    for (const i of r.informativos) textos.push(i.titulo, i.detalle); };
  for (const c of cuerpos) juntar(await conCuerpo(c));
  for (const ruta of [{ status: 403 }, { status: 404 }, null]) {
    const rutas = { 'https://ejemplo.cl/': { status: 200, body: conPolitica() } };
    if (ruta) rutas['https://ejemplo.cl/privacidad/'] = ruta;
    juntar(await chequear('ejemplo.cl', fakeRed(rutas)));
  }
  juntar(await chequear('ejemplo.cl', fakeRed({ 'https://ejemplo.cl/': { status: 200, body: NG('{"url":"/politica-de-privacidad"}') }, 'https://ejemplo.cl/politica-de-privacidad': { status: 200, body: 'p' } })));
  juntar(await chequear('ejemplo.cl', fakeRed({ 'https://ejemplo.cl/': { status: 200, body: NG('{"url":"/politica-de-privacidad"}') }, 'https://ejemplo.cl/politica-de-privacidad': { status: 404 } })));
  juntar(await chequear('ejemplo.cl', fakeRed({ 'https://ejemplo.cl/': { status: 200, body: NG('{}') } })));
  const todo = textos.join('\n');
  eq('sin raya larga', /—/.test(todo), false);
  eq('sin voseo', /\b(tenés|podés|querés|revisá|intentá|escribinos|fijate|mirá|abrí|dejá|publicá)\b/i.test(todo), false);
  eq('la revisión a mano no se ofrece gratis', /lo podemos revisar a mano|gratis/i.test(todo), false);
  eq('no dice "cumples"', /\bcumples\b|\bcumple con la ley\b/i.test(todo), false);
  eq('"previo e inequívoco" donde se cita el Art. 12', todo.split('\n').filter((t) => /\(Art\. 12\)/.test(t)).every((t) => /previo e inequívoco/.test(t)), true);
  eq('nada dice "vas a necesitar" (LC-8 a)', /vas a necesitar/.test(todo), false);
}

console.log(`\n${ok} bien, ${malo} mal`);
process.exit(malo ? 1 : 0);
