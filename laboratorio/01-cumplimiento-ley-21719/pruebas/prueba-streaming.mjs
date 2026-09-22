import * as nuevo from '/tmp/spl-main-wt/spindlelab-astro/functions/api/chequeo.js';

let ok=0, malo=0;
const eq=(n,r,e)=>{ if(JSON.stringify(r)===JSON.stringify(e)) ok++; else {malo++; console.log(`  FALLA ${n}: esperado ${JSON.stringify(e)}, real ${JSON.stringify(r)}`);} };

const PORTADA = '<!doctype html><html lang="es-CL"><head><title>T</title><meta name="description" content="d"></head><body><h1>H</h1></body></html>';
const ROBOTS = "User-agent: OAI-SearchBot\nDisallow: /\n";

// Doble CON cuerpo en streaming, que es la rama que corre en Cloudflare.
function cuerpo(texto, trozoKB = 64) {
  const bytes = new TextEncoder().encode(texto);
  const paso = trozoKB * 1024;
  let i = 0;
  let cancelado = false;
  const rs = new ReadableStream({
    pull(c) {
      if (i >= bytes.length) { c.close(); return; }
      c.enqueue(bytes.slice(i, i + paso));
      i += paso;
    },
    cancel() { cancelado = true; },
  });
  rs.__cancelado = () => cancelado;
  return rs;
}

function fake(rutas) {
  const estado = {};
  const f = async (url) => {
    const r = rutas[url];
    if (r === undefined) throw new Error('sin ruta ' + url);
    const body = r.status === 200 ? cuerpo(r.body || '', r.trozoKB) : cuerpo('');
    (estado[url] = estado[url] || []).push(body);
    return {
      status: r.status, url, body,
      headers: { get: (k) => {
        const kk = k.toLowerCase();
        if (kk === 'content-length') return r.largo != null ? String(r.largo) : String(new TextEncoder().encode(r.body || '').length);
        if (kk === 'server') return 'nginx';
        return null;
      } },
    };
  };
  f.estado = estado;
  return f;
}

const base = (extra={}) => ({
  'https://ejemplo.cl/': { status: 200, body: PORTADA },
  'https://ejemplo.cl/robots.txt': { status: 200, body: ROBOTS },
  'https://ejemplo.cl/llms.txt': { status: 404, body: '' },
  'https://ejemplo.cl/sitemap.xml': { status: 200, body: '<?xml version="1.0"?><urlset><url><loc>https://ejemplo.cl/</loc></url></urlset>' },
  ...extra,
});

console.log('=== la rama de streaming, que es la que corre en producción ===');
{
  const r = await nuevo.chequear('ejemplo.cl', fake(base()));
  eq('camino normal por streaming', r.ok, true);
  eq('el bloqueo de robots se detecta', r.items.find(i=>i.id==='bots-indices').ok, false);
  eq('el sitemap se detecta', r.items.find(i=>i.id==='sitemap').ok, true);
  console.log(`  puntaje por streaming: ${r.puntaje}`);
}
{
  // Portada de 4 MB: por encima del tope, no se puntúa.
  const grande = PORTADA + '<!-- ' + 'x'.repeat(4_000_000) + ' -->';
  const f = fake(base({ 'https://ejemplo.cl/': { status: 200, body: grande } }));
  const r = await nuevo.chequear('ejemplo.cl', f);
  eq('portada de 4 MB: sin informe', r.ok, false);
  eq('y lo dice', /pesa más de lo que este chequeo/.test(r.error), true);
  await new Promise(r=>setTimeout(r,80)); // el cancel no se espera a propósito; damos un respiro
  // La portada se pide 4 veces: una para leerla y tres sondas que ni tocan el cuerpo. El
  // stream que nos interesa es el primero, el único que se llegó a leer.
  eq('se canceló la descarga en vez de tragarse los 4 MB', f.estado['https://ejemplo.cl/'][0].__cancelado(), true);
}
{
  // Sitemap ENORME (la norma permite hasta 50 MB): tiene que seguir detectándose.
  const relleno = '<url><loc>https://ejemplo.cl/p</loc></url>';
  const sitemapEnorme = '<?xml version="1.0"?><urlset>' + relleno.repeat(120_000) + '</urlset>';
  const bytes = new TextEncoder().encode(sitemapEnorme).length;
  const f = fake(base({ 'https://ejemplo.cl/sitemap.xml': { status: 200, body: sitemapEnorme } }));
  const r = await nuevo.chequear('ejemplo.cl', f);
  console.log(`  sitemap de ${(bytes/1024/1024).toFixed(1)} MB`);
  eq('sitemap enorme: se detecta igual', r.items.find(i=>i.id==='sitemap').ok, true);
  eq('y no dice que no existe', /No encontramos/.test(r.items.find(i=>i.id==='sitemap').detalle), false);
}
{
  // robots.txt enorme: NO se puede afirmar que no bloquea.
  const robotsEnorme = '# comentario de relleno\n'.repeat(200_000) + 'User-agent: GPTBot\nDisallow: /\n';
  const f = fake(base({ 'https://ejemplo.cl/robots.txt': { status: 200, body: robotsEnorme } }));
  const r = await nuevo.chequear('ejemplo.cl', f);
  eq('robots enorme: los índices NO salen en verde', r.items.find(i=>i.id==='bots-indices').ok, false);
  eq('y se explica que no se pudo leer entero', /no nos llegó entero/.test(r.items.find(i=>i.id==='bots-indices').detalle), true);
}
{
  // Lectura corta por streaming.
  const f = fake(base({ 'https://ejemplo.cl/': { status: 200, body: PORTADA, largo: 999999 } }));
  const r = await nuevo.chequear('ejemplo.cl', f);
  eq('lectura corta de la portada: sin informe', r.ok, false);
}
console.log(`\n${ok} bien, ${malo} mal`);
process.exit(malo?1:0);
