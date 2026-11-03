import { abrir, cargarKoto, cookies } from './comun.mjs';
const O = process.argv[2]; const ancho = Number(process.argv[3]||1440);
const { nav, p } = await abrir(ancho);
await cargarKoto(p); await cookies(p);
await p.evaluate(() => scrollTo(0,0)); await p.waitForTimeout(1500);
// la estructura del encabezado
const info = await p.evaluate(() => {
  const h = document.querySelector('header') || document.querySelector('nav');
  const out = []; const walk = (el, d) => { if (d>5) return; const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
    if (r.width>0 && r.top<120) out.push({ tag: el.tagName, cls: (el.className&&el.className.baseVal===undefined?el.className:'').toString().slice(0,60), x:Math.round(r.x), y:Math.round(r.y), w:Math.round(r.width), h:Math.round(r.height), bg: cs.backgroundColor, tr: cs.transition.slice(0,120), txt: (el.children.length?'':el.textContent.trim().slice(0,20)) });
    [...el.children].forEach(c=>walk(c,d+1)); };
  if (h) walk(h,0); return { tag: h && h.tagName, out };
});
console.log(JSON.stringify(info).slice(0,4000));
// umbral: bajando de a 20 px
for (const y of [10, 40, 80, 120, 200, 400]) { await p.evaluate(y=>scrollTo(0,y), y); await p.waitForTimeout(1600); await p.screenshot({ path:`${O}/k${ancho}-umbral-${y}.png`, clip:{x:0,y:0,width:ancho,height:90} }); }
await p.evaluate(() => scrollTo(0,0)); await p.waitForTimeout(2000);
// la animación al plegarse: cuadros cada 60 ms
await p.evaluate(() => scrollTo(0,600));
const t0 = Date.now(); for (let i=0;i<25;i++){ await p.screenshot({ path:`${O}/k${ancho}-baja-${String(i).padStart(2,'0')}.png`, clip:{x:0,y:0,width:ancho,height:90} }); }
console.log('baja ms', Date.now()-t0);
await p.waitForTimeout(1500);
await p.evaluate(() => scrollTo(0,0));
const t1 = Date.now(); for (let i=0;i<25;i++){ await p.screenshot({ path:`${O}/k${ancho}-sube-${String(i).padStart(2,'0')}.png`, clip:{x:0,y:0,width:ancho,height:90} }); }
console.log('sube ms', Date.now()-t1);
await nav.close();
