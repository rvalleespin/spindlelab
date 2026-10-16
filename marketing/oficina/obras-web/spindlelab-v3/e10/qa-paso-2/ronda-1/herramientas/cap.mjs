import { chromium } from '/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args:['--no-sandbox'] });
const res = [];
for (const d of ['taller','pizarra']) for (const pg of ['home','acompanamiento-mensual','trabajo']) for (const [w,h] of [[1440,900],[390,844]]) {
  const ctx = await b.newContext({ viewport:{width:w,height:h}, deviceScaleFactor:1 });
  const p = await ctx.newPage();
  const fails=[]; p.on('response', r=>{ if(r.status()>=400) fails.push(r.status()+' '+r.url()); }); p.on('requestfailed', r=>fails.push('FAIL '+r.url()));
  const ext=[]; p.on('request', r=>{ if(!r.url().startsWith('http://127.0.0.1')) ext.push(r.url()); });
  await p.goto(`http://127.0.0.1:8780/${d}/${pg}.html`, { waitUntil:'networkidle' });
  const H = await p.evaluate(()=>document.documentElement.scrollHeight);
  for (let y=0;y<H;y+=300){ await p.evaluate(y=>scrollTo(0,y),y); await p.waitForTimeout(60); }
  await p.evaluate(()=>scrollTo(0,0)); await p.waitForTimeout(700);
  const m = await p.evaluate(()=>({ sw:document.documentElement.scrollWidth, cw:document.documentElement.clientWidth, bodySW: document.body.scrollWidth, H:document.documentElement.scrollHeight,
    wide:[...document.querySelectorAll('body *')].filter(e=>{const r=e.getBoundingClientRect(); return r.right>document.documentElement.clientWidth+1 && getComputedStyle(e).position!=='fixed' && r.width>0}).slice(0,6).map(e=>e.tagName+'.'+(e.className.baseVal??e.className)+' '+Math.round(e.getBoundingClientRect().right)),
    h1: document.querySelectorAll('h1').length,
    imgs:[...document.images].map(i=>({src:i.getAttribute('src'),ok:i.complete&&i.naturalWidth>0,alt:i.getAttribute('alt')})).filter(i=>!i.ok),
    oldImgs:[...document.querySelectorAll('img,source')].map(i=>(i.getAttribute('src')||'')+' '+(i.getAttribute('srcset')||'')).filter(s=>/assets\/img\/d\//.test(s)).length,
    bgOld: [...document.querySelectorAll('*')].map(e=>getComputedStyle(e).backgroundImage).filter(s=>/img\/d\//.test(s)).length,
    marks: document.querySelectorAll('.mk').length,
  }));
  await p.screenshot({ path:`cap/${d}-${pg}-${w}.png`, fullPage:true });
  res.push({d,pg,w,...m,fails,ext:[...new Set(ext)]});
  await ctx.close();
}
console.log(JSON.stringify(res,null,0).replace(/\},\{/g,'},\n{'));
await b.close();
