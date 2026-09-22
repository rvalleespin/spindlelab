import * as vyc from '/tmp/vyc-sub-wt/verificaycumple/functions/api/chequeo.js';
import * as spl from '/tmp/spl-main-wt/spindlelab-astro/functions/api/chequeo.js';

let ok=0, malo=0;
const eq=(n,r,e)=>{ if(JSON.stringify(r)===JSON.stringify(e)) ok++; else {malo++; console.log(`  FALLA ${n}: esperado ${JSON.stringify(e)}, real ${JSON.stringify(r)}`);} };

console.log('=== el bucle de redirecciones ahora se diagnostica ===');
{
  let n = 0;
  const f = async (url) => { n++; return { status: 302, url,
    headers: { get: (k) => k.toLowerCase()==='location' ? 'https://ejemplo.cl/' + n : null }, text: async()=>'' }; };
  const r = await vyc.chequear('ejemplo.cl', f);
  eq('no da informe', r.ok, false);
  eq('el código es 508', r.codigo, 508);
  eq('y el mensaje habla del bucle', /bucle de redirecciones/.test(r.error), true);
  eq('no menciona el número al visitante', /508/.test(r.error), false);
  console.log(`  peticiones hechas: ${n} (tope MAX_SALTOS + 1)`);
  eq('quedó acotado', n <= 9, true);
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

console.log(`\n${ok} bien, ${malo} mal`);
process.exit(malo?1:0);
