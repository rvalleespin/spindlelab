import { chromium } from '/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args:['--no-sandbox'] });
const ctx = await b.newContext({ viewport:{width:1440,height:900} });
const p = await ctx.newPage();
await p.goto('https://www.theready.com/', { waitUntil:'networkidle', timeout:90000 });
for (let y=0;y<8000;y+=500){ await p.evaluate(y=>scrollTo(0,y),y); await p.waitForTimeout(150); }
await p.evaluate(()=>scrollTo(0,0)); await p.waitForTimeout(800);
const r = await p.evaluate(()=>{
  const out={};
  // 1) mono labels
  const monos=[...document.querySelectorAll('body *')].filter(e=>{const cs=getComputedStyle(e);return /Plex Mono/i.test(cs.fontFamily) && [...e.childNodes].some(n=>n.nodeType==3&&n.textContent.trim().length>2)});
  out.mono = monos.slice(0,12).map(e=>{const cs=getComputedStyle(e);return {t:e.textContent.trim().slice(0,40),fs:cs.fontSize,ls:cs.letterSpacing,tt:cs.textTransform,fw:cs.fontWeight}});
  // 2) header
  const h=document.querySelector('header'); const hr=h.getBoundingClientRect(); out.header={h:hr.height,pos:getComputedStyle(h).position};
  // 3) marker
  const svgs=[...document.querySelectorAll('svg')].filter(s=>s.closest('h1,h2,h3,h4,p') && s.querySelector('path'));
  out.marker = svgs.slice(0,6).map(s=>{const host=s.closest('h1,h2,h3,h4,p');const pth=s.querySelector('path');const cs=getComputedStyle(pth);return {tag:host.tagName,hfs:getComputedStyle(host).fontSize,sw:cs.strokeWidth,stroke:cs.stroke,txt:(s.parentElement.textContent||'').trim().slice(0,40), cls:s.getAttribute('class')}});
  // h1 sizes
  out.h1=[...document.querySelectorAll('h1')].map(e=>({t:e.textContent.trim().slice(0,30),fs:getComputedStyle(e).fontSize,ff:getComputedStyle(e).fontFamily.slice(0,30)}));
  return out;
});
console.log(JSON.stringify(r,null,1));
await b.close();
