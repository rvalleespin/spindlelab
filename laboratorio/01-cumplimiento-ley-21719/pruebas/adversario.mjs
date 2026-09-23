const m = await import('/tmp/spl-main-wt/spindlelab-astro/functions/api/chequeo.js');
function fake(html){ return async (url) => ({ status: url.endsWith('/') ? 200 : 404, url,
  headers:{get:(k)=> k.toLowerCase()==='content-length' ? String(new TextEncoder().encode(url.endsWith('/')?html:'').length) : null}, text: async()=> url.endsWith('/') ? html : '' }); }
async function medir(nombre, html) {
  const kb=(new TextEncoder().encode(html).length/1024).toFixed(0);
  const t=Date.now();
  try { const r = await m.chequear('ejemplo.cl', fake(html)); console.log(nombre.padEnd(44), kb.padStart(5)+' KB', String(Date.now()-t).padStart(7)+' ms', 'ok='+r.ok); }
  catch(e){ console.log(nombre.padEnd(44), kb.padStart(5)+' KB', String(Date.now()-t).padStart(7)+' ms', 'REVIENTA: '+e.constructor.name+' '+e.message.slice(0,40)); }
}
const cab = (extra='') => '<html lang="es"><head><title>T</title><meta name="description" content="d">'+extra+'</head>';
let o='{"@type":"Thing"}'; for(let i=0;i<100000;i++) o='{"a":'+o+'}';
await medir('JSON-LD anidado 100.000 niveles', cab('<script type="application/ld+json">'+o+'</script>')+'<body><h1>h</h1></body></html>');
await medir('una < que no cierra nunca', cab()+'<body><h1>h</h1><'+'a'.repeat(2000000)+'</body></html>');
await medir('30.000 <h2>', cab()+'<body>'+'<h2>Un titulo bastante largo sin pregunta</h2>'.repeat(30000)+'</body></html>');
await medir('prosa normal de 2,8 MB', cab()+'<body><p>'+'palabra '.repeat(360000)+'</p></body></html>');
// Desde el 23-sep, una portada de menos de 16 KB pasa además por el detector de páginas de
// bloqueo (esPaginaDeBloqueo), que recorre el HTML con indexOf, en tiempo lineal. El detector
// solo tarda menos de 0,1 ms con estas entradas (medido; prueba-gemelo-completa §12 exige
// menos de 2 ms).
//
// PENDIENTE, y no es del detector: el chequeo ENTERO con miles de "<" sin cerrar crece al
// cuadrado. Lo que crece son las regex que ya estaban en chequear() (la que borra etiquetas,
// `<[^>]+>`, y las de title, description, canonical, lang y JSON-LD con `[^>]+`). Medido el
// 23-sep, igual antes y después de agregar el detector: 100 ms con 16 KB, 1,6 s con 64 KB y
// 4,6 s con 100 KB de "<". Verifica y Cumple ya pasó por esto y recorre las etiquetas en
// tiempo lineal (su `etiquetas()`); spindlelab.cl todavía no. Las dos filas de abajo lo dejan
// a la vista: si alguien lo arregla, la de 64 KB tiene que bajar a pocos ms.
await medir('16 KB de "<" sin cerrar', '<'.repeat(16000));
await medir('64 KB de "<" sin cerrar (PENDIENTE: cuadrático)', '<'.repeat(64000));
await medir('16 KB de "<script" sin cerrar', '<script'.repeat(2285));
await medir('16 KB de "<a " sin cerrar', '<a '.repeat(5333));
await medir('aviso de bloqueo de 15 KB sin enlaces', '<p>Acceso denegado.</p>' + '<p>'.repeat(5000));
await medir('robots gigante con 50.000 reglas', cab()+'<body><h1>h</h1></body></html>');

// Desde que se dejó de borrar el www, una portada que no abre en la forma escrita se vuelve a
// pedir en la otra. Dos cosas que un sitio hostil podría aprovechar, medidas:
// 1) que el HTML pesado se analice dos veces: no pasa, porque la otra forma solo se prueba
//    cuando la primera NO trajo portada, así que el análisis corre una sola vez;
// 2) que las peticiones se dupliquen: con un bucle que nunca repite dirección, cada lectura
//    gasta MAX_SALTOS + 1 y el total se dobla. Se imprime para tenerlo a la vista.
//    Corregido el 23-sep: el comentario decía que pasarse de las 50 subpeticiones del plan
//    gratis daba "el mismo 508 de antes", y era falso. La petición 51 lanza, la lectura de la
//    otra forma se caía entera y el mensaje terminaba siendo "No pudimos abrir tu sitio, ni con
//    www ni sin www", que es otra cosa y además mentía: el www nunca se llegó a pedir de
//    verdad. Eran 126 peticiones. Desde R5 la portada se lee sola y primero, así que el bucle
//    en las dos formas gasta 18 y el veredicto sí es el 508 del bucle.
function fakeSoloWww(html){ const f = fake(html); return async (url, o) => { if (!url.startsWith('https://www.')) throw new Error('no conecta'); return f(url, o); }; }
async function medirWww(nombre, html) {
  const kb=(new TextEncoder().encode(html).length/1024).toFixed(0);
  const t=Date.now();
  try { const r = await m.chequear('ejemplo.cl', fakeSoloWww(html)); console.log(nombre.padEnd(44), kb.padStart(5)+' KB', String(Date.now()-t).padStart(7)+' ms', 'ok='+r.ok, 'dominio='+r.dominio); }
  catch(e){ console.log(nombre.padEnd(44), kb.padStart(5)+' KB', String(Date.now()-t).padStart(7)+' ms', 'REVIENTA: '+e.constructor.name+' '+e.message.slice(0,40)); }
}
await medirWww('prosa de 2,8 MB, solo en www', cab()+'<body><p>'+'palabra '.repeat(360000)+'</p></body></html>');
await medirWww('una < que no cierra nunca, solo en www', cab()+'<body><h1>h</h1><'+'a'.repeat(2000000)+'</body></html>');
{
  let n = 0;
  const t = Date.now();
  const r = await m.chequear('ejemplo.cl', async (url) => { n++; return { status: 302, url, headers: { get: (k) => k.toLowerCase() === 'location' ? url.split('?')[0] + '?p=' + n : null }, text: async () => '' }; });
  console.log('bucle sin repetir dirección, en las dos formas'.padEnd(44), '    -   ', String(Date.now()-t).padStart(7)+' ms', 'ok='+r.ok, 'codigo='+r.codigo, 'peticiones='+n);
}
