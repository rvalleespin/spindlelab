import * as vyc from '/tmp/vyc-sub-wt/verificaycumple/functions/api/chequeo.js';
import fs from 'node:fs';
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
  // Era 73. Sin rastreadores a la vista, el permiso queda sin confirmar (pueden cargar con
  // JavaScript) y no cuenta; la casilla sin marcar del formulario sí cuenta, en verde.
  eq('puntaje sin rastreadores', r.puntaje, 100);
  eq('el permiso sin rastreadores a la vista: sin confirmar', r.items.find(i=>i.id==='cmp').estado, 'sin-confirmar');
  eq('la casilla sin marcar: ítem en verde, peso 4', [r.items.find(i=>i.id==='casilla')?.estado, r.items.find(i=>i.id==='casilla')?.peso], ['ok', 4]);
  eq('revisado', r.revisado, 'https://ejemplo.cl/');
}
{
  const grande = HTML + '<!-- ' + 'x'.repeat(4_000_000) + ' -->';
  const r = await vyc.chequear('ejemplo.cl', fake({ 'https://ejemplo.cl/': { status:200, body:grande } }));
  eq('portada de 4 MB: sin informe', r.ok, false);
  eq('y lo dice', /pesa más de lo que este chequeo/.test(r.error), true);
  eq('sin correo en el texto, tipo sitio', [/@/.test(r.error), r.tipo], [false, 'sitio']);
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

console.log('=== 23-sep: www, política y permiso, por la rama que corre en producción ===');
{
  // El pelado no tiene DNS (el doble lanza, como fetch en Node); www responde por streaming.
  const r = await vyc.chequear('ejemplo.cl', fake({
    'https://www.ejemplo.cl/': { status:200, body:HTML },
    'https://www.ejemplo.cl/privacidad/': { status:200, body:'<html>p</html>' } }));
  eq('pelado sin DNS: se revisa www', [r.ok, r.dominio, r.revisado], [true, 'ejemplo.cl', 'https://www.ejemplo.cl/']);
}
{
  // abogadospyme.cl: el enlace trae cientos de caracteres de spans adentro.
  const spans = '<span class="elementor-item">'.repeat(15) + 'Políticas de Privacidad' + '</span>'.repeat(15);
  const cuerpoLargo = '<!doctype html><html lang="es"><body>' + 'x'.repeat(200_000) +
    `<a href="/nosotros-politicas-de-privacidad-y-terminos-del-servicio/">${spans}</a></body></html>`;
  const r = await vyc.chequear('ejemplo.cl', fake({
    'https://ejemplo.cl/': { status:200, body:cuerpoLargo },
    'https://ejemplo.cl/nosotros-politicas-de-privacidad-y-terminos-del-servicio/': { status:200, body:'<html>p</html>' } }));
  eq('enlace de interior largo, entre trozos: se encuentra y abre', r.items.find(i=>i.id==='politica').estado, 'ok');
}
{
  // Como spindlelab.cl: GA y Pixel dentro de funciones que corren al aceptar, y Consent Mode inline.
  const gated = HTML + "<script>function iniciar(){ gtag('consent', 'default', {analytics_storage:'granted'}); var s=document.createElement('script'); s.src='https://www.googletagmanager.com/gtag/js?id=G-1'; }</script>";
  const r = await vyc.chequear('ejemplo.cl', fake({
    'https://ejemplo.cl/': { status:200, body:gated },
    'https://ejemplo.cl/privacidad/': { status:200, body:'<html>p</html>' } }));
  const cmp = r.items.find(i=>i.id==='cmp');
  eq('rastreadores con Consent Mode: sin-confirmar y fuera del puntaje', [cmp.estado, cmp.ok, r.puntaje, r.sinConfirmar, r.pendientes], ['sin-confirmar', false, 100, 1, 0]);
}
{
  const r = await vyc.chequear('ejemplo.cl', fake({ 'https://ejemplo.cl/': { status:403 } }));
  eq('403 real: con código y tipo sitio', [r.ok, r.codigo, r.tipo], [false, 403, 'sitio']);
}

console.log('=== 23-sep, segunda pasada: bloqueo, sitios armados con JavaScript y política ilegible ===');
{
  // F2: la página de bloqueo exacta de www.bancoestado.cl, por streaming.
  const BANCO = fs.readFileSync('/private/tmp/claude-501/-Users-ramon-Library-Mobile-Documents-com-apple-CloudDocs-SPINDLELAB/befb9f93-f301-497e-a5c3-ea7342366826/scratchpad/verif/integracion/home-www.bancoestado.cl.html', 'utf8');
  const r = await vyc.chequear('www.bancoestado.cl', fake({ 'https://www.bancoestado.cl/': { status:200, body:BANCO } }));
  eq('página de bloqueo con 200: sin informe', [r.ok, r.tipo, r.codigo, r.error], [false, 'sitio', undefined, vyc.mensajeDeFallo('vacia')]);
}
{
  // F3: el JSON del menú cae justo sobre el corte de un trozo de 64 KB. El decodificador junta
  // los trozos antes del análisis, así que el par se lee entero.
  const cabeza = '<!doctype html><html lang="es"><head><title>C</title></head><body><app-root ng-version="18"></app-root><!--';
  const json = '--><script type="application/json">{"title":"Política de Privacidad","url":"/terminos/politica-de-privacidad"}</script></body></html>';
  // Relleno medido en bytes para que el corte de 65536 caiga dentro de "url":"/terminos/...
  const bytes = (t) => new TextEncoder().encode(t).length;
  const hastaUrl = json.indexOf('"url"') + 8;
  const relleno = 'x'.repeat(65536 - bytes(cabeza) - bytes(json.slice(0, hastaUrl)));
  const ng = cabeza + relleno + json;
  const b = new TextEncoder().encode(ng);
  eq('el corte cae dentro del par', [new TextDecoder().decode(b.slice(65520, 65536)).endsWith('"url":"/'), new TextDecoder().decode(b.slice(65536, 65544))], [true, 'terminos']);
  const r = await vyc.chequear('ejemplo.cl', fake({
    'https://ejemplo.cl/': { status:200, body:ng },
    'https://ejemplo.cl/terminos/politica-de-privacidad': { status:200, body:'<html>p</html>' } }));
  const pol = r.items.find(i=>i.id==='politica');
  eq('datos del menú partidos entre trozos: la política se alcanza', pol.estado, 'ok');
  eq('y el detalle dice que salió de los datos', /arma sus enlaces con JavaScript/.test(pol.detalle), true);
}
{
  // LC-3: la política responde 403 a nuestro lector. No resta.
  const r = await vyc.chequear('ejemplo.cl', fake({
    'https://ejemplo.cl/': { status:200, body:HTML },
    'https://ejemplo.cl/privacidad/': { status:403 } }));
  const pol = r.items.find(i=>i.id==='politica');
  // 23-sep (I2-2): acá solo se confirmaron el HTTPS y la casilla, 10 de 24. Antes salía un
  // 100, y ese número se lee como si hubiéramos revisado todo, cuando la política y el
  // permiso (14 de peso) quedaron sin mirar. Sin la mitad del peso confirmada no hay número;
  // los estados y los contadores dicen exactamente lo mismo que antes.
  eq('política con 403: sin confirmar y fuera del puntaje', [pol.estado, r.puntaje, r.pendientes], ['sin-confirmar', null, 0]);
  eq('política con 403: y se dice cuánto se pudo confirmar', [r.pesoConfirmado, r.pesoTotal], [10, 24]);
}
{
  // LC-6 por streaming: casilla premarcada.
  const premarcada = HTML.replace('name="acepto"', 'name="acepto" checked');
  const r = await vyc.chequear('ejemplo.cl', fake({
    'https://ejemplo.cl/': { status:200, body:premarcada },
    'https://ejemplo.cl/privacidad/': { status:200, body:'<html>p</html>' } }));
  eq('casilla premarcada: pendiente y resta', [r.items.find(i=>i.id==='casilla').estado, r.pendientes, r.puntaje], ['pendiente', 1, 78]);
}

console.log(`\n${ok} bien, ${malo} mal`);
process.exit(malo?1:0);
