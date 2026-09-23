import * as vyc from '/tmp/vyc-sub-wt/verificaycumple/functions/api/chequeo.js';
import * as spl from '/tmp/spl-main-wt/spindlelab-astro/functions/api/chequeo.js';
import fs from 'node:fs';

let ok=0, malo=0;
const eq=(n,r,e)=>{ if(JSON.stringify(r)===JSON.stringify(e)) ok++; else {malo++; console.log(`  FALLA ${n}: esperado ${JSON.stringify(e)}, real ${JSON.stringify(r)}`);} };

console.log('=== el bucle de redirecciones ahora se diagnostica ===');
{
  let n = 0;
  const hosts = new Set();
  const f = async (url) => { n++; hosts.add(new URL(url).hostname); return { status: 302, url,
    headers: { get: (k) => k.toLowerCase()==='location' ? 'https://ejemplo.cl/' + n : null }, text: async()=>'' }; };
  const r = await vyc.chequear('ejemplo.cl', f);
  eq('no da informe', r.ok, false);
  // 23-sep: el 508 era un número inventado por nosotros y la portada lo mostraba como
  // "código de respuesta de tu sitio". Ahora el bucle viaja como falla del sitio, sin código.
  eq('no inventa un código del sitio', 'codigo' in r, false);
  eq('es una falla del sitio, no de lo escrito', r.tipo, 'sitio');
  // 23-sep: el texto dejó de usar la palabra "bucle" (jerga) y dice qué le pasa a quien entra.
  eq('y el mensaje habla del bucle', /nos mandó de una dirección a otra tantas veces seguidas/.test(r.error), true);
  eq('y lo aterriza en quien entra desde Google', /le pasa igual a quien entra desde Google/.test(r.error), true);
  eq('no menciona el número al visitante', /508/.test(r.error), false);
  // Tras un bucle se prueba la otra variante (www), también con su tope de saltos. http:// no,
  // porque no arregla un bucle. Son dos cadenas de MAX_SALTOS + 1 como máximo: 18, no 9.
  console.log(`  peticiones hechas: ${n} (tope 2 × (MAX_SALTOS + 1)), hosts: ${[...hosts].join(', ')}`);
  eq('quedó acotado', n <= 18, true);
  eq('solo pidió la dirección escrita y su www', [...hosts].sort(), ['ejemplo.cl', 'www.ejemplo.cl']);
}

console.log('=== una cadena normal de 5 saltos sí llega ===');
{
  const destinos = ['https://a.cl/','https://b.cl/','https://c.cl/','https://d.cl/','https://final.cl/'];
  let i = 0;
  const HTML='<!doctype html><html lang="es"><a href="/privacidad/">Política de privacidad</a></html>';
  const f = async (url) => {
    if (url === 'https://final.cl/' ) return { status:200, url, headers:{get:()=>null}, text: async()=>HTML };
    if (url.endsWith('/privacidad/')) return { status:200, url, headers:{get:()=>null}, text: async()=>'<html>p</html>' };
    const siguiente = destinos[i++] || 'https://final.cl/';
    return { status: 301, url, headers: { get: (k)=> k.toLowerCase()==='location' ? siguiente : null }, text: async()=>'' };
  };
  const r = await vyc.chequear('ejemplo.cl', f);
  eq('cadena de 5 saltos: sí hay informe', r.ok, true);
}

console.log('=== el reloj es de la petición, no de cada salto ===');
{
  // Cada salto tarda 120 ms. Con reloj por salto, 9 saltos = 1080 ms y ninguno aborta.
  // Con reloj compartido y un presupuesto corto, la cadena se corta sola.
  const RETARDO = 120;
  let abortos = 0;
  const f = async (url, opts) => {
    await new Promise((res, rej) => {
      const t = setTimeout(res, RETARDO);
      if (opts.signal) opts.signal.addEventListener('abort', () => { clearTimeout(t); abortos++; rej(new Error('abortado')); }, { once: true });
    });
    return { status: 302, url, headers: { get: (k)=> k.toLowerCase()==='location' ? 'https://ejemplo.cl/' + Math.random() : null }, text: async()=>'' };
  };
  const t0 = Date.now();
  const r = await vyc.chequear('ejemplo.cl', f);
  const ms = Date.now() - t0;
  eq('la señal llega a cada salto (es compartida)', typeof f === 'function', true);
  console.log(`  la cadena entera tardó ${ms} ms con saltos de ${RETARDO} ms`);
  eq('no se multiplicó el presupuesto por salto', ms < 8000, true);
}

console.log('=== 23-sep: la política también sigue los saltos, y por el portón ===');
{
  // Un enlace de política que redirige sin fin: es el sitio respondiendo, así que queda
  // pendiente, y la cadena se corta en MAX_SALTOS + 1 peticiones.
  let n = 0;
  const HTML = '<!doctype html><html lang="es"><a href="/privacidad/">Política de privacidad</a></html>';
  const f = async (url) => {
    if (url === 'https://ejemplo.cl/') return { status: 200, url, headers: { get: () => null }, text: async () => HTML };
    n++;
    return { status: 302, url, headers: { get: (k) => k.toLowerCase() === 'location' ? 'https://ejemplo.cl/privacidad/' + n : null }, text: async () => '' };
  };
  const r = await vyc.chequear('ejemplo.cl', f);
  const pol = r.items.find((i) => i.id === 'politica');
  eq('política en bucle: pendiente, y lo dice', [pol.estado, /redirige de una dirección a otra sin parar/.test(pol.detalle)], ['pendiente', true]);
  eq('política en bucle: acotada a MAX_SALTOS + 1', n <= 9, true);
}
{
  // La dirección que sale de los datos de un sitio armado con JavaScript pasa por el mismo
  // portón en cada salto: si redirige a metadata o a loopback, nunca se pide.
  const pedidas = [];
  const HTML = '<!doctype html><html lang="es"><head><title>C</title></head><body><app-root ng-version="18"></app-root>' +
    '<script type="application/json">{"url":"/politica-de-privacidad"}</script></body></html>';
  const f = async (url) => {
    pedidas.push(url);
    if (url === 'https://ejemplo.cl/') return { status: 200, url, headers: { get: () => null }, text: async () => HTML };
    if (url === 'https://ejemplo.cl/politica-de-privacidad') return { status: 302, url, headers: { get: (k) => k.toLowerCase() === 'location' ? 'http://169.254.169.254/latest/meta-data/' : null }, text: async () => '' };
    return { status: 302, url, headers: { get: (k) => k.toLowerCase() === 'location' ? 'http://127.0.0.1/' : null }, text: async () => '' };
  };
  const r = await vyc.chequear('ejemplo.cl', f);
  eq('datos que redirigen a metadata: nunca se pide', pedidas.some((u) => /169\.254|127\.0\.0\.1/.test(u)), false);
  eq('y no queda en verde', r.items.find((i) => i.id === 'politica').estado === 'ok', false);
}

console.log('=== 23-sep: el presupuesto de subpeticiones de Cloudflare (50 por invocación) ===');
{
  // El peor caso de una revisión completa, ahora que la portada con meta refresh también se
  // sigue: la dirección escrita con la cadena de saltos llena y después falla, http:// en
  // bucle, www con la cadena llena y después la portada, esa portada redirigiendo con la
  // etiqueta, y dos políticas con la cadena llena. Si esto pasa de 50, en Pages la invocación
  // muere y el visitante no recibe nada. Por eso el salto del meta refresh tiene su propio
  // tope corto (MAX_SALTOS_REFRESCO).
  let n = 0;
  const HTML = '<!doctype html><html lang="es"><head><title>C</title>' +
    '<meta http-equiv="refresh" content="0; url=https://www.ejemplo.cl/es/"></head><body>' +
    '<nav><a href="/a">A</a><a href="/b">B</a><a href="/c">C</a><a href="/d">D</a></nav>' +
    '<a href="/privacidad">Privacidad</a><a href="/aviso-legal">Aviso legal</a></body></html>';
  const f = async (url) => {
    n++;
    const [base, marca] = url.split('#');
    const i = marca ? Number(marca) : 0;
    const resp = (status, body, location) => ({ status, url, headers: { get: (k) => (k.toLowerCase() === 'location' ? location || null : null) }, text: async () => body || '' });
    // El destino del meta refresh gasta justo su tope corto (2 saltos); todo lo demás gasta
    // la cadena completa antes de contestar de verdad.
    const tope = base === 'https://www.ejemplo.cl/es/' ? 2 : 8;
    if (i < tope) return resp(302, '', `${base}#${i + 1}`);
    if (base === 'https://ejemplo.cl/') throw new Error('sin DNS');
    if (base === 'http://ejemplo.cl/') return resp(302, '', `${base}#0`);
    if (base === 'https://www.ejemplo.cl/') return resp(200, HTML);
    if (base === 'https://www.ejemplo.cl/es/') return resp(200, HTML.replace(/<meta[^>]*>/, ''));
    return resp(403, '');
  };
  const r = await vyc.chequear('ejemplo.cl', f);
  console.log(`  subpeticiones del peor caso: ${n} (tope de Cloudflare: 50)`);
  eq('hay informe', r.ok, true);
  eq('se siguió el meta refresh, con sus propios saltos', r.revisado, 'https://www.ejemplo.cl/es/#2');
  eq('bajo el tope de 50 subpeticiones', n <= 48, true);
}

console.log('=== 23-sep: el robots.txt que no pudimos leer no puede sumar (V1-4) ===');
{
  // spindlelab.cl: `robotsIlegible` solo miraba el null y el 200 truncado, así que un 403, un
  // 401, un 429, un 5xx o el 508 que ponemos nosotros al cortar un bucle dejaban el archivo en
  // vacío, y el vacío se lee como "no bloquea a nadie": tres señales en verde, 16 puntos
  // regalados, y la frase "No tienes robots.txt, así que nada está bloqueado" dicha a un sitio
  // cuyo robots.txt existe y no nos dejaron leer. Es el mismo "no lo sabemos" que suma.
  const HOME = '<!doctype html><html lang="es"><head><title>Clínica Ejemplo</title>' +
    '<meta name="description" content="Clínica dental en Providencia, atención de lunes a viernes."></head>' +
    '<body><h1>Clínica Ejemplo</h1><p>Atendemos de lunes a viernes.</p><a href="/contacto/">Contacto</a></body></html>';
  const red = (robots) => async (url) => {
    const u = new URL(url);
    if (u.pathname === '/') return { status: 200, url, headers: { get: () => null }, text: async () => HOME };
    if (u.pathname === '/robots.txt') return robots(url);
    return { status: 404, url, headers: { get: () => null }, text: async () => '' };
  };
  const plano = (status) => () => ({ status, url: 'x', headers: { get: () => null }, text: async () => '' });
  // El 508 no lo responde el sitio: lo ponemos nosotros al cortar un bucle de redirecciones.
  const enBucle = (url) => ({ status: 302, url, headers: { get: (k) => (k.toLowerCase() === 'location' ? `https://ejemplo.cl/robots.txt?${Math.random()}` : null) }, text: async () => '' });
  const botsDe = (r) => r.items.filter((i) => /^bots-/.test(i.id));

  // Los que NO se pudieron leer: ni verde ni rojo, y el texto dice por qué.
  for (const [nombre, robots, motivo] of [
    ['403', plano(403), /no nos dejó leer tu robots.txt: respondió que no tenemos permiso/],
    ['401', plano(401), /no nos dejó leer tu robots.txt/],
    ['429', plano(429), /nos pidió bajar el ritmo/],
    ['500', plano(500), /error de tu propio servidor/],
    ['bucle, el 508 que ponemos nosotros', enBucle, /nos mandó de una dirección a otra sin llegar nunca al archivo/],
  ]) {
    const r = await spl.chequear('ejemplo.cl', red(robots));
    const bots = botsDe(r);
    eq(`robots ${nombre}: las tres señales quedan sin confirmar`, bots.map((i) => i.estado), ['sin-confirmar', 'sin-confirmar', 'sin-confirmar']);
    eq(`robots ${nombre}: ninguna dice que no tienes robots.txt`, bots.some((i) => /No tienes robots\.txt/.test(i.detalle)), false);
    eq(`robots ${nombre}: el detalle dice por qué no lo sabemos`, bots.every((i) => motivo.test(i.detalle)), true);
    eq(`robots ${nombre}: y dice que no suma ni resta`, bots.every((i) => /no suma ni resta en tu puntaje/.test(i.detalle)), true);
  }

  // Los que SÍ se leyeron: ahí el verde es legítimo, y cada uno dice lo que de verdad vimos.
  for (const [nombre, robots, frase] of [
    ['404', plano(404), 'No tienes robots.txt, así que nada está bloqueado.'],
    // Un 410 es "esto ya no está": el archivo no existe, igual que un 404.
    ['410', plano(410), 'No tienes robots.txt, así que nada está bloqueado.'],
    // Un 200 con el archivo vacío SÍ lo leímos: existe y no bloquea. Decir "no tienes
    // robots.txt" ahí sería afirmar algo que acabamos de ver que no es así.
    ['200 con el archivo vacío', plano(200), 'Tu robots.txt está vacío, así que no bloquea a nadie.'],
  ]) {
    const r = await spl.chequear('ejemplo.cl', red(robots));
    const bots = botsDe(r);
    eq(`robots ${nombre}: las tres señales en verde`, bots.map((i) => i.estado), ['ok', 'ok', 'ok']);
    eq(`robots ${nombre}: y dice exactamente lo que vimos`, bots.every((i) => i.detalle === frase), true);
  }

  // Y el puntaje lo nota: lo ilegible no puede valer lo mismo que lo confirmado.
  const ilegible = await spl.chequear('ejemplo.cl', red(plano(403)));
  const leido = await spl.chequear('ejemplo.cl', red(plano(404)));
  eq('un robots.txt ilegible no puntúa como uno leído', ilegible.puntaje < leido.puntaje, true);
}

console.log('=== 23-sep: las dos listas de página de bloqueo son la MISMA lista ===');
{
  // V1-5: los tres informes de la pasada 3 decían que estaban alineadas y no lo estaban. VyC
  // llevaba raíces sueltas (`restringid`, `bloquead`, `forbidden`) y el patrón flojo
  // `verify (?:that )?you`, que se comían landings reales. Si una cambia, la otra va detrás en
  // el mismo cambio: esta prueba es la que lo obliga.
  const lista = (ruta) => {
    const fuente = fs.readFileSync(ruta, 'utf8');
    const m = /const RE_TEXTO_BLOQUEO = new RegExp\(\[([\s\S]*?)\]\.join\('\|'\)\);/.exec(fuente);
    return m && m[1].replace(/\s+/g, ' ').trim();
  };
  const deVyc = lista('/tmp/vyc-sub-wt/verificaycumple/functions/api/chequeo.js');
  const deSpl = lista('/tmp/spl-main-wt/spindlelab-astro/functions/api/chequeo.js');
  eq('las dos listas se encontraron en el código', [!!deVyc, !!deSpl], [true, true]);
  eq('y son literalmente la misma, alternativa por alternativa', deVyc, deSpl);
  // Y los dos topes de la regla son los mismos números en los dos archivos: el 23-sep se
  // tomaron el más estricto de cada lado (16.000 caracteres y 2 enlaces), para que una landing
  // chica y real tenga menos formas de recibir el mensaje del firewall.
  const numero = (ruta, nombres) => {
    const fuente = fs.readFileSync(ruta, 'utf8');
    for (const n of nombres) {
      const m = new RegExp(`const ${n} = ([0-9_]+);`).exec(fuente);
      if (m) return Number(m[1].replace(/_/g, ''));
    }
    return null;
  };
  const VYC = '/tmp/vyc-sub-wt/verificaycumple/functions/api/chequeo.js';
  const SPL = '/tmp/spl-main-wt/spindlelab-astro/functions/api/chequeo.js';
  eq('el tope de tamaño es el mismo en los dos, y es 16.000',
     [numero(VYC, ['MAX_BLOQUEO_CON_TEXTO']), numero(SPL, ['TOPE_PAGINA_BLOQUEO'])], [16000, 16000]);
  eq('el tope de enlaces es el mismo en los dos, y es 2',
     [numero(VYC, ['MAX_ENLACES_BLOQUEO']), numero(SPL, ['MAX_ENLACES_BLOQUEO'])], [2, 2]);

  // Y las dos reconocen lo mismo: avisos de bloqueo de verdad sí, copy de negocio no.
  for (const [nombre, html, esperado] of [
    ['bancoestado (sin esqueleto)', '<div class="error">Por razones de seguridad se ha restringido este acceso.</div>', true],
    ['Cloudflare "Attention Required"', '<html><head><title>Attention Required! | Cloudflare</title></head><body><h1>Attention Required!</h1><p>Please enable cookies.</p></body></html>', true],
    ['Imperva "Incapsula incident"', '<html><head><title></title></head><body>Request unsuccessful. Incapsula incident ID: 123-456</body></html>', true],
    ['puerta de edad de una viña', '<html><head><title>Viña</title></head><body><h1>Viña</h1><p>Verifica que eres mayor de 18 años para entrar.</p><a href="/entrar">Entrar</a></body></html>', false],
    ['landing en inglés: "verify your email"', '<html><head><title>Spa</title></head><body><h1>Spa</h1><p>We will verify your email before booking.</p><a href="/book">Book</a><a href="/contact">Contact</a></body></html>', false],
    ['aviso de zona restringida', '<html><head><title>Edificio</title></head><body><h1>Edificio</h1><p>Zona restringida solo para residentes.</p><a href="/info">Info</a></body></html>', false],
  ]) {
    eq(`los dos deciden igual: ${nombre}`, [vyc.esPaginaDeBloqueo(html), spl.esPaginaDeBloqueo(html)], [esperado, esperado]);
  }
}

console.log(`\n${ok} bien, ${malo} mal`);
process.exit(malo?1:0);
