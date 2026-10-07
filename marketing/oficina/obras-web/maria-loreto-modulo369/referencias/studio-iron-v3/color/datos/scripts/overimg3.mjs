import { newPage, sleep } from './cdp.mjs';
import fs from 'node:fs';
const HIDE = `[class*="cookie-notice"]{display:none!important}`;
const B = 'https://www.studio-iron.com';
const T = [['home','/',['London Design Festival','The group exhibition','Discover','Black Metal Edit','The Black Metal Edit explores','Discover the edit']],
           ['ldf','/pages/london-design-festival',['Chaise Diable','Atelier Moore x Camille','A natural, larger','Nikita Bag','Hand-built from reclaimed','Shop now']],
           ['black-metal','/pages/black-metal',['Stem vase','In addition to their','Chainmail Chair (2021)','Chainmail chair is a new','Shop now']]];
const out = [];
for (const vp of [1440, 390]) {
  const p = await newPage(); await p.setViewport(vp);
  for (const [label, path, texts] of T) {
    await p.goto(B + path, 3500);
    await p.evaluate(`(()=>{const s=document.createElement('style');s.textContent=${JSON.stringify(HIDE)};document.head.appendChild(s);})()`);
    const H = await p.evaluate('document.documentElement.scrollHeight'); const ih = await p.evaluate('innerHeight');
    for (let y = 0; y < H; y += Math.round(ih * 0.5)) { await p.evaluate(`scrollTo(0,${y})`); await sleep(250); }
    let k = 0;
    for (const t of texts) {
      const found = await p.evaluate(`(() => { const els=[...document.querySelectorAll('main *, section *, [class*=wrapper] *')].filter(e=>!e.closest('header')).filter(e=>{let s=''; for(const n of e.childNodes) if(n.nodeType===3) s+=n.textContent; return s.trim().startsWith(${JSON.stringify(t)}) && e.checkVisibility({opacityProperty:true,visibilityProperty:true});}); return els.map((e,i)=>{e.setAttribute('data-t'+${k}, i); return i;}).length; })()`);
      for (let j = 0; j < Math.min(found, 2); j++) {
        const sel = `[data-t${k}="${j}"]`;
        await p.evaluate(`document.querySelector('${sel}').scrollIntoView({block:'center'})`); await sleep(1800);
        const info = await p.evaluate(`(() => { const e=document.querySelector('${sel}'); const r=e.getBoundingClientRect(); const s=getComputedStyle(e); const st=document.elementsFromPoint(r.left+Math.min(10,r.width/2), r.top+r.height/2).slice(0,8).map(z=>z.tagName+'.'+String(z.className).slice(0,30)+' bgimg:'+(getComputedStyle(z).backgroundImage||'').slice(0,60)+' op:'+getComputedStyle(z).opacity); return {x:r.left,y:r.top,w:r.width,h:r.height,color:s.color,fs:s.fontSize,fw:s.fontWeight,shadow:s.textShadow, stack:st}; })()`);
        if (info.w < 2 || info.y < 0 || info.y + info.h > ih) continue;
        const a = `data/overimg/v2-${label}-${vp}-${k}-${j}-a.png`, b = `data/overimg/v2-${label}-${vp}-${k}-${j}-b.png`;
        await p.shotPng(a);
        await p.evaluate(`(()=>{const e=document.querySelector('${sel}'); e.style.setProperty('color','transparent','important'); e.style.setProperty('text-decoration-color','transparent','important');})()`); await sleep(120);
        await p.shotPng(b);
        await p.evaluate(`(()=>{const e=document.querySelector('${sel}'); e.style.removeProperty('color'); e.style.removeProperty('text-decoration-color');})()`);
        if (j === 0) await p.shot(`caps/overimg-${label}-${vp}-${k}.jpg`);
        out.push({ label, vp, txt: t, i: `${k}-${j}`, a, b, color: info.color, fs: info.fs, fw: info.fw, shadow: info.shadow, rect: info, stack: info.stack });
      }
      k++;
    }
    console.log('ok', label, vp);
  }
  await p.close();
}
fs.writeFileSync('data/overimg2.json', JSON.stringify(out, null, 1));
