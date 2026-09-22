import { normalizarDominio, destinoPermitido, chequear, mensajeDeFallo } from '/tmp/vyc-sub-wt/verificaycumple/functions/api/chequeo.js';

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
  ['https://www.bcn.cl/algo', 'bcn.cl'],
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
  eq('mensaje honesto', r.error, 'No pudimos abrir el sitio. Revisa el dominio o inténtalo de nuevo.');
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
  eq('puntaje del sitio de prueba', r.puntaje, 73);
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
  eq('403 dice que hacer', /hola@spindlelab\.cl/.test(r.error), true);
}
for (const [status, debeDecir] of [[404, /portada no existe/], [429, /bajar el ritmo/],
                                   [526, /certificado/], [530, /no encontramos un sitio/i],
                                   [503, /su propio servidor/], [418, /no nos entreg/]]) {
  const m = mensajeDeFallo(status);
  eq(`mensaje ${status} es humano`, debeDecir.test(m), true);
  eq(`mensaje ${status} no lleva el numero`, new RegExp(String(status)).test(m), false);
}

console.log(`\n${ok} bien, ${malo} mal`);
process.exit(malo ? 1 : 0);
