import { newPage, sleep } from './cdp.mjs';
import fs from 'node:fs';
const HIDE = `[class*="cookie-notice"]{display:none!important}`;
const out=[];
for (const vp of [1440, 390]) {
  const p = await newPage(); await p.setViewport(vp);
  await p.goto('https://www.studio-iron.com/events', 6000);
  await p.evaluate(`(()=>{const s=document.createElement('style');s.textContent=${JSON.stringify(HIDE)};document.head.appendChild(s);})()`);
  for (let y = 0; y < 3000; y += 300) { await p.evaluate(`scrollTo(0,${y})`); await sleep(400); }
  await p.evaluate('scrollTo(0,0)'); await sleep(3000);
  const info = await p.evaluate(`(()=>{ const imgs=[...document.querySelectorAll('main img')].map(i=>({src:i.currentSrc.slice(0,80), complete:i.complete, nw:i.naturalWidth, op:getComputedStyle(i).opacity, cls:i.className.slice(0,60), r:i.getBoundingClientRect().toJSON()})); return imgs; })()`);
  console.log(vp, JSON.stringify(info).slice(0,1500));
  await p.shot(`caps/events-${vp}-v0-espera.jpg`);
  const items = await p.evaluate(`(()=>{const out=[]; let i=0; for(const t of ['Studio Iron at Brompton','12 – 20 Sept','Level 1, 3 Cromwell']){ const e=[...document.querySelectorAll('main *')].find(e=>{let s=''; for(const n of e.childNodes) if(n.nodeType===3) s+=n.textContent; return s.trim().startsWith(t)}); if(!e) continue; e.setAttribute('data-ev',i); const r=e.getBoundingClientRect(); const s=getComputedStyle(e); out.push({i,txt:t,x:r.left,y:r.top,w:r.width,h:r.height,color:s.color,fs:s.fontSize,fw:s.fontWeight,shadow:s.textShadow}); i++;} return out;})()`);
  for (const it of items) {
    await p.evaluate(`document.querySelector('[data-ev="${it.i}"]').scrollIntoView({block:'center'})`); await sleep(1500);
    const r = await p.evaluate(`document.querySelector('[data-ev="${it.i}"]').getBoundingClientRect().toJSON()`);
    const a=`data/overimg/ev-${vp}-${it.i}-a.png`, b=`data/overimg/ev-${vp}-${it.i}-b.png`;
    await p.shotPng(a);
    await p.evaluate(`document.querySelector('[data-ev="${it.i}"]').style.setProperty('color','transparent','important')`); await sleep(100);
    await p.shotPng(b);
    await p.evaluate(`document.querySelector('[data-ev="${it.i}"]').style.removeProperty('color')`); await sleep(300);
    out.push({label:'events', vp, txt:it.txt, a, b, color:it.color, fs:it.fs, fw:it.fw, shadow:it.shadow, rect:{x:r.x,y:r.y,w:r.width,h:r.height}});
  }
  await p.shot(`caps/events-${vp}-titulo-sobre-foto.jpg`);
  await p.close();
}
fs.writeFileSync('data/overimg-events.json', JSON.stringify(out,null,1));
