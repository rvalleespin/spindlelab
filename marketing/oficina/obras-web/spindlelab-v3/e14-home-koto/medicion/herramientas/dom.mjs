import { abrir, cargarKoto, cookies } from './comun.mjs';
import fs from 'node:fs';
const ancho = +process.argv[2] || 1440;
const { nav, p } = await abrir(ancho);
await cargarKoto(p); await cookies(p);
const r = await p.evaluate(() => {
  const h2 = [...document.querySelectorAll('h2')].find(e => e.textContent.trim()==='Our work');
  let sec = h2; for (let i=0;i<7;i++) sec = sec.parentElement;
  // dump tree depth 7 from sec
  const dump = (e, d) => { const b=e.getBoundingClientRect(); const cs=getComputedStyle(e);
    const o = { t:e.tagName.toLowerCase(), c:(e.className&&e.className.baseVal===undefined?e.className:'').toString().slice(0,220), y:Math.round(b.top+scrollY), x:Math.round(b.left), w:Math.round(b.width), h:Math.round(b.height), pos:cs.position!=='static'?cs.position:undefined, tf:cs.transform!=='none'?cs.transform:undefined, op:cs.opacity!=='1'?cs.opacity:undefined, br:cs.borderRadius!=='0px'?cs.borderRadius:undefined, ov:cs.overflow!=='visible'?cs.overflow:undefined, txt: e.children.length===0? e.textContent.trim().slice(0,60):undefined, src: e.currentSrc? e.currentSrc.slice(0,90):undefined };
    if (d<9) o.k=[...e.children].map(c=>dump(c,d+1)); return o; };
  return { secDepth: dump(sec,0) };
});
fs.writeFileSync(`dom-${ancho}.json`, JSON.stringify(r,null,1));
await nav.close();
