// Measure text-over-image contrast with real pixels: capture with text, then with text made transparent.
import { newPage, sleep } from './cdp.mjs';
import fs from 'node:fs';
const HIDE = `[class*="cookie-notice"]{display:none!important}`;
const B = 'https://www.studio-iron.com';
const PAGES = [['home', '/'], ['ldf', '/pages/london-design-festival'], ['black-metal', '/pages/black-metal'], ['events', '/events'], ['evento-brompton', '/events/studio-iron-at-brompton-design-district'], ['about', '/pages/about'], ['coleccion-all', '/collections/all-objects'], ['search', '/search']];
const vps = (process.argv[2] || '1440,390').split(',').map(Number);
fs.mkdirSync('data/overimg', { recursive: true });
const out = [];
for (const vp of vps) {
  const p = await newPage(); await p.setViewport(vp);
  for (const [label, path] of PAGES) {
    try {
      await p.goto(B + path, 3500);
      await p.evaluate(`(()=>{const s=document.createElement('style');s.textContent=${JSON.stringify(HIDE)};document.head.appendChild(s);})()`);
      const H = await p.evaluate('document.documentElement.scrollHeight'); const ih = await p.evaluate('innerHeight');
      for (let y = 0; y < Math.min(H, 20000); y += Math.round(ih * 0.8)) { await p.evaluate(`scrollTo(0,${y})`); await sleep(200); }
      await p.evaluate('scrollTo(0,0)'); await sleep(700);
      const cands = await p.evaluate(`(() => {
        const media=[...document.querySelectorAll('img, video')].filter(m=>m.checkVisibility({opacityProperty:true,visibilityProperty:true})).map(m=>{const q=m.getBoundingClientRect(); return {l:q.left+scrollX,t:q.top+scrollY,r:q.right+scrollX,b:q.bottom+scrollY,m}}).filter(q=>q.r-q.l>100&&q.b-q.t>100);
        const out=[]; let i=0;
        for (const e of document.querySelectorAll('body *')) {
          let t=''; for (const n of e.childNodes) if (n.nodeType===3) t+=n.textContent; t=t.trim(); if(!t) continue;
          if(!e.checkVisibility({opacityProperty:true,visibilityProperty:true})) continue;
          const r=e.getBoundingClientRect(); if(r.width<4||r.height<4) continue;
          const cx=r.left+r.width/2+scrollX, cy=r.top+r.height/2+scrollY;
          const hit=media.find(q=>!q.m.contains(e)&&cx>=q.l&&cx<=q.r&&cy>=q.t&&cy<=q.b);
          if(!hit) continue;
          // ensure the text actually sits above the media: elementsFromPoint check after scroll happens later
          e.setAttribute('data-oi', i); const s=getComputedStyle(e);
          out.push({i, txt:t.slice(0,50), color:s.color, fs:s.fontSize, fw:s.fontWeight, shadow:s.textShadow}); i++; if(i>=24) break;
        }
        return out; })()`);
      for (const c of cands) {
        const rect = await p.evaluate(`(() => { const e=document.querySelector('[data-oi="${c.i}"]'); e.scrollIntoView({block:'center'}); const r=e.getBoundingClientRect(); const top=document.elementsFromPoint(r.left+r.width/2, r.top+r.height/2); const idx=top.indexOf(e); const imgIdx=top.findIndex(z=>z.tagName==='IMG'||z.tagName==='VIDEO'); return {x:r.left,y:r.top,w:r.width,h:r.height, above: idx>=0 && (imgIdx<0 || idx<imgIdx), imgUnder: imgIdx>=0}; })()`);
        await sleep(450);
        if (!rect.above || !rect.imgUnder) { c.skip = 'not above image'; continue; }
        const clip = { x: Math.max(0, rect.x), y: Math.max(0, rect.y), width: Math.max(1, rect.w), height: Math.max(1, rect.h), scale: 1 };
        const a = `data/overimg/${label}-${vp}-${c.i}-a.png`, b = `data/overimg/${label}-${vp}-${c.i}-b.png`;
        await p.shotPng(a, { clip });
        await p.evaluate(`(()=>{const e=document.querySelector('[data-oi="${c.i}"]'); e.dataset.oldc=e.style.color; e.style.setProperty('color','transparent','important'); e.style.setProperty('text-shadow','none','important'); e.style.setProperty('text-decoration-color','transparent','important');})()`);
        await sleep(150);
        await p.shotPng(b, { clip });
        await p.evaluate(`(()=>{const e=document.querySelector('[data-oi="${c.i}"]'); e.style.removeProperty('color'); e.style.removeProperty('text-shadow'); e.style.removeProperty('text-decoration-color');})()`);
        Object.assign(c, { label, vp, a, b, rect });
        out.push(c);
      }
      console.log('ok', label, vp, cands.length, cands.filter(c => !c.skip).length);
    } catch (e) { console.log('ERR', label, vp, String(e).slice(0, 200)); }
  }
  await p.close();
}
fs.writeFileSync('data/overimg.json', JSON.stringify(out, null, 1));
