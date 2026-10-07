import { newPage, sleep } from './cdp.mjs';
const p = await newPage(); await p.setViewport(1440);
await p.goto('https://www.studio-iron.com/pages/black-metal', 4000);
await p.evaluate(`(()=>{const s=document.createElement('style');s.textContent='[class*="cookie-notice"]{display:none!important}';document.head.appendChild(s);})()`);
const H = await p.evaluate('document.documentElement.scrollHeight');
for (let y = 0; y < H; y += 500) { await p.evaluate(`scrollTo(0,${y})`); await sleep(200); }
const r = await p.evaluate(`(()=>{const a=document.querySelector('a.group'); a.scrollIntoView({block:'center'}); const r=a.getBoundingClientRect(); const ov=a.querySelector('div.flex.flex-col'); const s=getComputedStyle(ov); const anc=[]; let x=ov; while(x&&x!==a){const cs=getComputedStyle(x); anc.push(x.tagName+'.'+String(x.className).slice(0,80)+' bg='+cs.backgroundColor+' bgimg='+cs.backgroundImage.slice(0,80)+' op='+cs.opacity+' tr='+cs.transitionDuration); x=x.parentElement;} const txt=[...ov.querySelectorAll('*')].filter(e=>e.childNodes[0]&&e.childNodes[0].nodeType===3).map(e=>e.innerText.slice(0,30)+' | '+getComputedStyle(e).color+' '+getComputedStyle(e).fontSize); return {x:r.left+r.width/2,y:r.top+r.height/2, w:r.width, h:r.height, anc, txt, ovcls:ov.className}})()`);
console.log(JSON.stringify(r, null, 1));
await sleep(800);
await p.shot('caps/black-metal-1440-tarjeta-reposo.jpg');
await p.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: r.x, y: r.y }); await sleep(1000);
await p.shot('caps/black-metal-1440-tarjeta-hover.jpg');
const after = await p.evaluate(`(()=>{const a=document.querySelector('a.group'); const ov=a.querySelector('div.flex.flex-col'); let x=ov; const anc=[]; while(x&&x!==a.parentElement){const cs=getComputedStyle(x); anc.push(x.tagName+' bg='+cs.backgroundColor+' bgimg='+cs.backgroundImage.slice(0,80)+' op='+cs.opacity+' filter='+cs.filter); x=x.parentElement;} const im=a.querySelector('img'); return {anc, img: im?getComputedStyle(im).opacity+' '+getComputedStyle(im).transform+' '+getComputedStyle(im).filter:null}})()`);
console.log(JSON.stringify(after, null, 1));
await p.close();
