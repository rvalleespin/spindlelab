import { chromium } from '/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome' });
for (const [w,h,dpr,mob] of [[1440,900,1,false],[390,844,2,true],[768,1024,1,false]]) {
  const p = await (await b.newContext({viewport:{width:w,height:h},deviceScaleFactor:dpr,isMobile:mob,hasTouch:mob})).newPage();
  await p.goto('http://localhost:8742/',{waitUntil:'networkidle'});
  await p.evaluate(()=>document.getElementById('cookie-banner')?.remove());
  const tot = await p.evaluate(()=>document.documentElement.scrollHeight);
  for (let y=0;y<tot;y+=200){ await p.evaluate(v=>scrollTo(0,v),y); await p.waitForTimeout(20);}
  const r = await p.evaluate(()=>{const e=[...document.querySelectorAll('.k-fila__rot')].find(x=>x.textContent.includes('Si tienes'));e.scrollIntoView({block:'center'});const b=e.getBoundingClientRect();return {w:Math.round(b.width),h:Math.round(b.height),lh:parseFloat(getComputedStyle(e).lineHeight),sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth}});
  await p.waitForTimeout(900);
  const r2 = await p.evaluate(()=>{const e=[...document.querySelectorAll('.k-fila__rot')].find(x=>x.textContent.includes('Si tienes'));return {op:getComputedStyle(e.closest('.k-fila__in')||e).opacity}});
  await p.screenshot({path:`${process.argv[2]}/rotulo-${w}.jpg`,type:'jpeg',quality:60});
  console.log(w, JSON.stringify(r), JSON.stringify(r2));
}
await b.close();
