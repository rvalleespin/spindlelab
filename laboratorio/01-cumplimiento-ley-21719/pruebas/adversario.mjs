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
await medir('robots gigante con 50.000 reglas', cab()+'<body><h1>h</h1></body></html>');
