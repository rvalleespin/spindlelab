import { chromium } from '/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args:['--no-sandbox'] });
const P = { home:'/v3/', 'acompanamiento-mensual':'/v3/servicios/acompanamiento-mensual/', trabajo:'/v3/trabajo/' };
async function bloques(url){
  const ctx = await b.newContext({ viewport:{width:1440,height:900}, javaScriptEnabled:false });
  const p = await ctx.newPage(); await p.goto(url,{waitUntil:'networkidle'});
  const r = await p.evaluate(()=>{
    document.querySelectorAll('[data-rotulo-foto],[data-cinta],#cookie-banner').forEach(e=>e.remove());
    const main=document.querySelector('main')||document.body;
    // top-level blocks: headings sequence
    return [...document.querySelectorAll('h1,h2,h3,h4,p,li,figcaption,label,button,a')].filter(e=>!e.parentElement.closest('h1,h2,h3,h4,p,li,figcaption,label,button,a')).map(e=>e.textContent.replace(/\s+/g,' ').trim()).filter(Boolean);
  });
  await ctx.close(); return r;
}
import fs from "node:fs"; const all={};
for (const [nom,ruta] of Object.entries(P)){
  const base=await bloques('http://127.0.0.1:8781'+ruta);
  for (const d of ['taller','pizarra']){
    const pr=await bloques(`http://127.0.0.1:8780/${d}/${nom}.html`);
    // find moved blocks: LCS-ish: report blocks whose index order differs
    all[d+"-"+nom]={base,pr};
  }
}
fs.writeFileSync("orden.json",JSON.stringify(all));
await b.close();
