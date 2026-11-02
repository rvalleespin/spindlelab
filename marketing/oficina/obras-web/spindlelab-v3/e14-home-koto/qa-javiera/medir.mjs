import { chromium } from '/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs';
const URL='http://localhost:8123/marketing/oficina/obras-web/spindlelab-v3/e14-home-koto/prototipo/index.html';
const OUT=process.argv[2];
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1243/chrome-linux64/chrome'});
const res={};
for (const [w,h,dpr,mob] of [[1440,900,1,false],[390,844,2,true]]){
  const p=await b.newPage({viewport:{width:w,height:h},deviceScaleFactor:dpr,isMobile:mob,hasTouch:mob});
  await p.goto(URL,{waitUntil:'networkidle'}); await p.waitForTimeout(800);
  // bajar de verdad con la rueda
  const total=await p.evaluate(()=>document.documentElement.scrollHeight);
  for(let y=0;y<total;y+=200){ await p.mouse.wheel(0,200).catch(()=>{}); if(mob) await p.evaluate(y=>scrollTo(0,y),y); await p.waitForTimeout(40);} 
  await p.waitForTimeout(500);
  const d=await p.evaluate(()=>{
    const secs=[...document.querySelectorAll('main > section, main > div, main > *')].filter(e=>e.offsetHeight>0);
    const words=t=>t.trim().split(/\s+/).filter(Boolean).length;
    return {alto:document.documentElement.scrollHeight, vh:innerHeight,
      overflow:[document.documentElement.scrollWidth,document.documentElement.clientWidth],
      h1:document.querySelectorAll('h1').length,
      palabrasTotal:words(document.querySelector('main').innerText),
      secciones:secs.map(s=>{const r=s.getBoundingClientRect();
        const medios=[...s.querySelectorAll('img,video,[class*=pendiente],[class*=generar]')].filter(m=>m.getBoundingClientRect().height>20);
        const area=medios.reduce((a,m)=>{const q=m.getBoundingClientRect();return a+q.width*q.height},0);
        return {cls:s.className.split(' ')[0]||s.tagName, alto:Math.round(r.height), palabras:words(s.innerText),
          medios:medios.map(m=>m.tagName+(m.getAttribute('src')||m.getAttribute('poster')||m.className).split('/').pop().slice(0,40)),
          areaMedios:Math.round(100*area/(r.width*r.height))}})};
  });
  res[w]=d;
  // trabajo: cuadros al bajar
  const top=await p.evaluate(()=>document.querySelector('[data-trabajo]').getBoundingClientRect().top+scrollY);
  const alto=await p.evaluate(()=>document.querySelector('[data-trabajo]').offsetHeight);
  await p.evaluate(()=>scrollTo(0,0)); await p.waitForTimeout(300);
  const serie=[];
  for(let i=0;i<=8;i++){ const y=Math.round(top - h*0.6 + i*(alto+h*0.2)/8);
    await p.evaluate(y=>scrollTo(0,y),y); await p.waitForTimeout(700);
    serie.push(await p.evaluate(y=>({y, nombre:document.querySelector('[data-nombre].gris, .trabajo__nombre [data-nombre]')?.textContent,
      panelOp:getComputedStyle(document.querySelector('[data-panel]')).opacity,
      panelTop:Math.round(document.querySelector('[data-panel]').getBoundingClientRect().top),
      piezas:[...document.querySelectorAll('.pieza-k')].map(e=>{const r=e.getBoundingClientRect();return {top:Math.round(r.top),w:Math.round(r.width),h:Math.round(r.height),op:getComputedStyle(e).opacity, tr:getComputedStyle(e).transform}})}),y));
    await p.screenshot({path:`${OUT}/trabajo-${w}-${String(i).padStart(2,'0')}.jpg`,quality:60,type:'jpeg'});
  }
  res[w].trabajo=serie;
  // portada recogida y bandas
  for (const y of [0, Math.round(h*0.5), h]) { await p.evaluate(y=>scrollTo(0,y),y); await p.waitForTimeout(400);
    await p.screenshot({path:`${OUT}/portada-${w}-y${y}.jpg`,quality:60,type:'jpeg'}); }
  await p.close();
}
// reduced motion
const p=await b.newPage({viewport:{width:1440,height:900},reducedMotion:'reduce'});
await p.goto(URL,{waitUntil:'networkidle'});
res.reducido=await p.evaluate(()=>({mov:document.documentElement.classList.contains('mov'),
  ops:[...document.querySelectorAll('.pieza-k,[data-entra],[data-foto]')].map(e=>getComputedStyle(e).opacity+'|'+getComputedStyle(e).transform+'|'+getComputedStyle(e).clipPath).slice(0,8),
  autoplay:[...document.querySelectorAll('video')].map(v=>v.paused)}));
console.log(JSON.stringify(res,null,1));
await b.close();
