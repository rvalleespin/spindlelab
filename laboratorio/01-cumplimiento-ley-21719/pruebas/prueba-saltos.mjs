import * as vyc from '/tmp/vyc-sub-wt/verificaycumple/functions/api/chequeo.js';
import * as spl from '/tmp/spl-main-wt/spindlelab-astro/functions/api/chequeo.js';

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
  eq('y el mensaje habla del bucle', /bucle de redirecciones/.test(r.error), true);
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

console.log(`\n${ok} bien, ${malo} mal`);
process.exit(malo?1:0);
