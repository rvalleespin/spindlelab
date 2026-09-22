import * as vyc from '/tmp/vyc-sub-wt/verificaycumple/functions/api/chequeo.js';
let ok=0, malo=0;
const eq=(n,r,e)=>{ if(JSON.stringify(r)===JSON.stringify(e)) ok++; else {malo++; console.log(`  FALLA ${n}: esperado ${JSON.stringify(e)}, real ${JSON.stringify(r)}`);} };

const HTML = '<!doctype html><html lang="es-CL"><body><a href="/privacidad/">Política de privacidad</a><form><input type="checkbox" name="acepto"> Acepto</form></body></html>';
function cuerpo(t){ const b=new TextEncoder().encode(t); let i=0;
  return new ReadableStream({ pull(c){ if(i>=b.length){c.close();return;} c.enqueue(b.slice(i,i+65536)); i+=65536; } }); }
function fake(rutas){ return async (url) => { const r = rutas[url]; if(!r) throw new Error('sin ruta '+url);
  return { status:r.status, url, body: cuerpo(r.body||''),
    headers:{get:(k)=> k.toLowerCase()==='location' ? (r.location||null) : k.toLowerCase()==='content-length' ? String(r.largo!=null?r.largo:new TextEncoder().encode(r.body||'').length) : null} }; }; }

console.log('=== Verifica y Cumple por la rama de streaming ===');
{
  const r = await vyc.chequear('ejemplo.cl', fake({
    'https://ejemplo.cl/': { status:200, body:HTML },
    'https://ejemplo.cl/privacidad/': { status:200, body:'<html>política</html>' } }));
  eq('camino normal', r.ok, true);
  eq('la política se alcanza', r.items.find(i=>i.id==='politica').ok, true);
  eq('https en verde', r.items.find(i=>i.id==='https').ok, true);
  console.log('  puntaje:', r.puntaje);
}
{
  const grande = HTML + '<!-- ' + 'x'.repeat(4_000_000) + ' -->';
  const r = await vyc.chequear('ejemplo.cl', fake({ 'https://ejemplo.cl/': { status:200, body:grande } }));
  eq('portada de 4 MB: sin informe', r.ok, false);
  eq('y lo dice', /pesa más de lo que este chequeo/.test(r.error), true);
}
{
  const r = await vyc.chequear('ejemplo.cl', fake({ 'https://ejemplo.cl/': { status:200, body:HTML, largo: 9_999_999 } }));
  eq('lectura corta: sin informe', r.ok, false);
}
{
  const r = await vyc.chequear('ejemplo.cl', fake({
    'https://ejemplo.cl/': { status:301, location:'https://www.ejemplo.cl/' },
    'https://www.ejemplo.cl/': { status:200, body:HTML },
    'https://www.ejemplo.cl/privacidad/': { status:200, body:'<html>p</html>' } }));
  eq('redirección por streaming', r.ok, true);
}
console.log(`\n${ok} bien, ${malo} mal`);
process.exit(malo?1:0);
