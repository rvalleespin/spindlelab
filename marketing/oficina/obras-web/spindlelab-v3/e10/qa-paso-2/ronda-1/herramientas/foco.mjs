import { chromium } from '/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args:['--no-sandbox'] });
for (const d of ['taller','pizarra']) {
  const p = await b.newPage({viewport:{width:1440,height:900}});
  await p.goto(`http://127.0.0.1:8780/${d}/home.html`,{waitUntil:'networkidle'});
  const seq=[];
  for (let i=0;i<14;i++){ await p.keyboard.press('Tab'); seq.push(await p.evaluate(()=>{const e=document.activeElement; const cs=getComputedStyle(e); return (e.id||e.tagName)+':'+(e.getAttribute('aria-label')||e.textContent.trim().slice(0,22))+' ['+cs.outlineStyle+' '+cs.outlineWidth+' '+cs.outlineColor+']';})); }
  const a11y = await p.evaluate(()=>({ label: !!document.querySelector('label[for="chq-dominio"]') || !!document.getElementById('chq-dominio').getAttribute('aria-label'),
    imgsAlt:[...document.images].map(i=>[i.getAttribute('src').split('/').pop(),i.getAttribute('alt')]).slice(0,12),
    heroImgs:[...document.images].slice(0,3).map(i=>i.getAttribute('loading')+'/'+i.getAttribute('fetchpriority')) }));
  console.log('==',d); seq.forEach(s=>console.log('  ',s)); console.log(JSON.stringify(a11y,null,0));
  await p.close();
}
await b.close();
