import { chromium } from '/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args:['--no-sandbox'] });
for (const d of ['taller','pizarra']) for (const pg of ['home','acompanamiento-mensual','trabajo']) for (const w of [1440,390]) {
  const ctx = await b.newContext({ viewport:{width:w,height:900} }); const p = await ctx.newPage();
  await p.goto(`http://127.0.0.1:8780/${d}/${pg}.html`, { waitUntil:'networkidle' }); await p.evaluate(()=>document.fonts.ready);
  const r = await p.evaluate(()=>{
    const f=e=>{const cs=getComputedStyle(e);return Math.round(parseFloat(cs.fontSize))+'/'+cs.fontWeight+'/'+cs.fontFamily.split(',')[0].replace(/'/g,'')};
    const h1=document.querySelector('h1'); const h2s=[...document.querySelectorAll('h2')].map(h=>Math.round(parseFloat(getComputedStyle(h).fontSize)));
    // words wider than container in headings
    const cortes=[...document.querySelectorAll('h1,h2,h3')].filter(h=>h.scrollWidth>h.clientWidth+1).map(h=>h.textContent.trim().slice(0,30));
    const fams=new Set(); document.querySelectorAll('body *').forEach(e=>{ if([...e.childNodes].some(n=>n.nodeType==3&&n.data.trim())) fams.add(getComputedStyle(e).fontFamily.split(',')[0].replace(/'/g,'').trim()+' '+getComputedStyle(e).fontWeight)});
    return {h1:f(h1), h2:[Math.min(...h2s),Math.max(...h2s)], cortes, fams:[...fams].sort(), hyph:[...document.querySelectorAll('h1,h2')].some(h=>getComputedStyle(h).hyphens==='auto')};
  });
  console.log(d,pg,w,JSON.stringify(r));
  await ctx.close();
}
await b.close();
