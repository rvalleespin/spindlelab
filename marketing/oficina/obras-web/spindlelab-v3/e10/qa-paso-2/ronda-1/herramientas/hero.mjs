import { chromium } from '/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args:['--no-sandbox'] });
for (const d of ['taller','pizarra']) for (const w of [390,1440]) {
const ctx = await b.newContext({ viewport:{width:w,height:900}, deviceScaleFactor:2 });
const p = await ctx.newPage(); await p.goto(`http://127.0.0.1:8780/${d}/home.html`,{waitUntil:'networkidle'}); await p.waitForTimeout(800);
const r = await p.evaluate(()=>{const i=document.querySelector('#chq-dominio').getBoundingClientRect(); const bt=document.querySelector('#chq-btn').getBoundingClientRect(); const cs=getComputedStyle(document.querySelector('#chq-btn'));
 // element at center of the input's right-bottom area
 const pts=[[i.right-10,i.bottom-4],[i.right-60,i.top+i.height/2],[i.left+i.width/2,i.top+i.height/2]].map(([x,y])=>{const e=document.elementFromPoint(x,y);return [Math.round(x),Math.round(y),e&&e.id||e.tagName]});
 return {input:[i.left,i.top,i.right,i.bottom].map(Math.round), btn:[bt.left,bt.top,bt.right,bt.bottom].map(Math.round), btnRadius:cs.borderRadius, pts};});
console.log(d,w,JSON.stringify(r));
await p.screenshot({path:`cap/hero-${d}-${w}.png`, clip:{x:0,y:0,width:w,height:900}});
await ctx.close();}
await b.close();
