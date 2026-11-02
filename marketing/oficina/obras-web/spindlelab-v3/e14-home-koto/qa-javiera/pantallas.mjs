import { chromium } from '/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs';
const URL='http://localhost:8123/marketing/oficina/obras-web/spindlelab-v3/e14-home-koto/prototipo/index.html';
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1243/chrome-linux64/chrome'});
const out={};
for (const [w,h,dpr,mob] of [[1440,900,1,false],[390,844,1,true]]){
  const p=await b.newPage({viewport:{width:w,height:h},deviceScaleFactor:dpr,isMobile:mob,hasTouch:mob});
  await p.goto(URL,{waitUntil:'networkidle'}); await p.waitForTimeout(800);
  const total=await p.evaluate(()=>document.documentElement.scrollHeight);
  let i=0; out[w]=[];
  for(let y=0;y<total;y+=Math.round(h*0.9)){ await p.evaluate(y=>scrollTo(0,y),y); await p.waitForTimeout(650);
    out[w].push(await p.evaluate(y=>({y,tarjetas:[...document.querySelectorAll('.trabajo .tarjeta')].map(t=>getComputedStyle(t).opacity).join(','),
      entra:[...document.querySelectorAll('[data-entra]')].map(e=>getComputedStyle(e).clipPath.slice(0,24)).join(' | ')}),y));
    await p.screenshot({path:`p-${w}-${String(i++).padStart(2,'0')}.jpg`,type:'jpeg',quality:55}); }
  // fin de página para foto
  await p.evaluate(()=>scrollTo(0,document.documentElement.scrollHeight)); await p.waitForTimeout(800);
  await p.screenshot({path:`p-${w}-fin.jpg`,type:'jpeg',quality:55});
  // tab: primeros 8 focos
  await p.evaluate(()=>scrollTo(0,0));
  const focos=[]; for(let k=0;k<8;k++){ await p.keyboard.press('Tab'); focos.push(await p.evaluate(()=>{const a=document.activeElement;const s=getComputedStyle(a);return (a.textContent||'').trim().slice(0,30)+' ['+s.outlineStyle+' '+s.outlineWidth+' '+s.outlineColor+']'})); }
  out[w+'tab']=focos;
  await p.close();
}
console.log(JSON.stringify(out,null,1)); await b.close();
