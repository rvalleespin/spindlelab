// Prueba del reconocimiento de un control de permiso hecho a mano (23-oct-2026). Correr con:
//   node verificaycumple/pruebas/puerta-propia.mjs
// Sale con código 1 si algún caso falla. Los casos verdes son los que NO deben ganar el sello:
// una llamada sin condición, un Pixel suelto o un script externo dejan el ítem en pendiente.
import { tramosConPuerta, detectarProveedores, tramosRetenidos } from '../functions/api/chequeo.js';
import fs from 'node:fs';
const analiza = (html) => { const t = tramosRetenidos(html).concat(tramosConPuerta(html)); return detectarProveedores(html, t); };
const SNIP = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','1');fbq('track','PageView');`;
const LEE = `var c=(function(){try{return localStorage.getItem('x_consent')}catch(e){return null}})();`;
const caso = (nombre, html, esperaNormales) => {
  const r = analiza(html);
  const ok = (r.normales.length > 0) === esperaNormales;
  console.log(ok ? 'OK  ' : 'FALLA', nombre, JSON.stringify(r));
  if (!ok) process.exitCode = 1;
};
// La página real, tal como quedó publicada
const real = fs.readFileSync(new URL('../public/index.html', import.meta.url), 'utf8');
caso('portada real de VyC (puerta propia)', real, false);
caso('puerta correcta', `<script>${LEE} function ini(){ ${SNIP} } if(c === 'granted'){ ini(); }</script>`, false);
caso('Pixel suelto, sin nada', `<script>${SNIP}</script>`, true);
caso('con función pero llamada sin condición', `<script>${LEE} function ini(){ ${SNIP} } ini();</script>`, true);
caso('llamada con y sin condición', `<script>${LEE} function ini(){ ${SNIP} } if(c === 'granted'){ ini(); } ini();</script>`, true);
caso('función nunca llamada', `<script>${LEE} function ini(){ ${SNIP} }</script>`, true);
caso('un Pixel en la función y otro suelto', `<script>${LEE} function ini(){ ${SNIP} } if(c === 'granted'){ ini(); } ${SNIP}</script>`, true);
caso('no lee ningún permiso guardado', `<script>function ini(){ ${SNIP} } if(c === 'granted'){ ini(); }</script>`, true);
caso('condición que no mira granted', `<script>${LEE} function ini(){ ${SNIP} } if(c){ ini(); }</script>`, true);
caso('script con src externo', `<script src="https://connect.facebook.net/en_US/fbevents.js"></script>`, true);
caso('puerta correcta + otro script suelto con Pixel', `<script>${LEE} function ini(){ ${SNIP} } if(c === 'granted'){ ini(); }</script><script>${SNIP}</script>`, true);
caso('llaves sin cerrar', `<script>${LEE} function ini(){ ${SNIP} if(c === 'granted'){ ini(); }</script>`, true);
// tiempo con entrada hostil
const hostil = '<script>' + LEE + 'function a(){'.repeat(2000) + '</script>'.repeat(1) ;
let t = Date.now(); analiza(hostil + '<script>'.repeat(5000)); console.log('hostil ms', Date.now() - t);
t = Date.now(); analiza(('<script>' + LEE + 'x'.repeat(19000) + '</script>').repeat(200)); console.log('200 scripts grandes ms', Date.now() - t);
