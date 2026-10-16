import { chromium } from '/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args:['--no-sandbox'] });
const ctx = await b.newContext({ viewport:{width:1440,height:900} });
const p = await ctx.newPage();
await p.goto('https://www.theready.com/working-together', { waitUntil:'networkidle', timeout:90000 });
for (let y=0;y<9000;y+=500){ await p.evaluate(y=>scrollTo(0,y),y); await p.waitForTimeout(150); }
await p.evaluate(()=>scrollTo(0,0)); await p.waitForTimeout(1500);
const r = await p.evaluate(()=>{
  const paths=[...document.querySelectorAll('svg path')].filter(pt=>{const cs=getComputedStyle(pt);return cs.stroke && cs.stroke!=='none' && parseFloat(cs.strokeWidth)>5});
  return paths.slice(0,10).map(pt=>{const cs=getComputedStyle(pt);const svg=pt.ownerSVGElement;let host=svg.parentElement;while(host&&!/^(H1|H2|H3|H4|P)$/.test(host.tagName))host=host.parentElement;
   return {stroke:cs.stroke,sw:cs.strokeWidth,lc:cs.strokeLinecap,host:host&&host.tagName,hfs:host&&getComputedStyle(host).fontSize,txt:svg.parentElement.textContent.trim().slice(0,40),svgcls:svg.getAttribute('class')||svg.parentElement.className}});
});
console.log(JSON.stringify(r,null,1));
await b.close();
