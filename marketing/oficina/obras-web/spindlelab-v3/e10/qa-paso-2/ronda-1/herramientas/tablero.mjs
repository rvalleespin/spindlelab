import { chromium } from '/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args:['--no-sandbox'] });
for (const w of [390,768,1440]) {
  const ctx = await b.newContext({ viewport:{width:w,height:900} }); const p = await ctx.newPage();
  const fails=[]; p.on('response', r=>{ if(r.status()>=400) fails.push(r.status()+' '+r.url()); }); p.on('requestfailed', r=>fails.push('FAIL '+r.url()+' '+r.failure()?.errorText));
  const hosts=new Set(); p.on('request', r=>hosts.add(new URL(r.url()).host));
  await p.goto('http://127.0.0.1:8782/tablero.html', { waitUntil:'networkidle' });
  await p.evaluate(()=>document.querySelectorAll('details').forEach(d=>d.open=true));
  const H=await p.evaluate(()=>document.documentElement.scrollHeight);
  for (let y=0;y<H;y+=800){ await p.evaluate(y=>scrollTo(0,y),y); await p.waitForTimeout(40); }
  await p.waitForTimeout(1500);
  const r = await p.evaluate(()=>({sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth, broken:[...document.images].filter(i=>!(i.complete&&i.naturalWidth)).map(i=>i.src).slice(0,5), n:document.images.length,
     fonts:[...document.fonts].filter(f=>f.status==='loaded').map(f=>f.family).filter((v,i,a)=>a.indexOf(v)===i), h1:document.querySelectorAll('h1').length}));
  console.log(w, JSON.stringify(r), 'fails', fails.slice(0,5), 'hosts', [...hosts]);
  if (w===390) { await p.evaluate(()=>{document.querySelectorAll('details').forEach(d=>d.open=false); scrollTo(0,0);}); await p.screenshot({path:'cap/tablero-390.png', fullPage:false}); }
  if (w===1440) { await p.evaluate(()=>{document.querySelectorAll('details').forEach(d=>d.open=false); scrollTo(0,0);}); await p.screenshot({path:'cap/tablero-1440.png', fullPage:true}); }
  await ctx.close();
}
await b.close();
