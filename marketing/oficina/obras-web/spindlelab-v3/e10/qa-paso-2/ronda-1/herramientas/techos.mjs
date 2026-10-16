import { chromium } from '/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args:['--no-sandbox'] });
for (const d of ['taller','pizarra']) for (const pg of ['home','acompanamiento-mensual','trabajo']) for (const [w,vh] of [[1440,900],[390,844]]) {
  const ctx = await b.newContext({ viewport:{width:w,height:vh} });
  const p = await ctx.newPage();
  await p.goto(`http://127.0.0.1:8780/${d}/${pg}.html`, { waitUntil:'networkidle' });
  const r = await p.evaluate((vh)=>{
    const abs=e=>{const r=e.getBoundingClientRect();return {top:r.top+scrollY,bottom:r.bottom+scrollY,left:r.left,right:r.right,w:r.width,h:r.height};};
    const mks=[...document.querySelectorAll('.mk')].map(m=>({t:m.textContent.trim(),inLink:!!m.closest('a,button'),paper:m.classList.contains('mk--papel'),...abs(m)}));
    const ovals=[...document.querySelectorAll('.ovalo, .d-pie .d-btn')].map(abs);
    const bg=[...document.querySelectorAll('section, div, figure, footer, header')].map(e=>({e,c:getComputedStyle(e).backgroundColor,...abs(e)})).filter(x=>x.w>=document.documentElement.clientWidth-2 && x.h>100);
    const bands={}; for(const x of bg){ bands[x.c]=(bands[x.c]||0)+1; }
    const H=document.documentElement.scrollHeight;
    let maxMk=0, maxOv=0;
    for(let y=0;y<H;y+=25){ const inV=o=>o.top<y+vh && o.bottom>y; maxMk=Math.max(maxMk,mks.filter(inV).length); maxOv=Math.max(maxOv,ovals.filter(inV).length); }
    return { mks:mks.map(m=>m.t+(m.inLink?' [EN ENLACE]':'')+(m.paper?' [papel]':'')), maxMkVista:maxMk, ovalos:ovals.length, maxOvaloVista:maxOv,
      bandas:Object.fromEntries(Object.entries(bands).filter(([c])=>!/rgba\(0, 0, 0, 0\)/.test(c))),
      garabatos:document.querySelectorAll('.garabato').length, manchas:document.querySelectorAll('.mancha').length, cintas:document.querySelectorAll('[data-cinta-caja]').length,
      fotoSlots:[...document.querySelectorAll('.foto-slot')].map(f=>{const r=f.getBoundingClientRect(); return Math.round(r.width)+'x'+Math.round(r.height)+' '+(f.querySelector('[data-rotulo-foto]')?.textContent.match(/F\d+/)||[''])[0];}),
      imgsSinDim:[...document.images].filter(i=>!i.getAttribute('width')||!i.getAttribute('height')).map(i=>i.getAttribute('src')).slice(0,5),
      h:[...document.querySelectorAll('h1,h2,h3,h4')].map(h=>h.tagName[1]).join(''),
      landmarks:['main','nav','header','footer'].map(t=>t+':'+document.querySelectorAll(t).length).join(' ')
    };
  }, vh);
  console.log(d,pg,w,JSON.stringify(r));
  await ctx.close();
}
await b.close();
