import { chromium } from '/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args:['--no-sandbox'] });
const pos = (p)=>p.evaluate(()=>{const t=getComputedStyle(document.querySelector('.cinta__pista')).transform; return t==='none'?0:new DOMMatrix(t).m41;});
for (const [d,pg] of [['taller','home'],['taller','acompanamiento-mensual'],['pizarra','home']]) for (const w of [1440,390]) for (const rm of ['no-preference','reduce']) {
  const ctx = await b.newContext({ viewport:{width:w,height:900}, reducedMotion:rm });
  const p = await ctx.newPage();
  await p.goto(`http://127.0.0.1:8780/${d}/${pg}.html`, { waitUntil:'networkidle' });
  await p.evaluate(()=>document.querySelector('[data-cinta-caja]').scrollIntoView({block:'center'}));
  await p.waitForTimeout(800);
  const a=await pos(p); const t0=Date.now(); await p.waitForTimeout(2000); const bb=await pos(p); const dt=(Date.now()-t0)/1000;
  const v=(bb-a)/dt;
  // pause
  const btn=p.locator('.cinta__pausa');
  const info = await p.evaluate(()=>{const bt=document.querySelector('.cinta__pausa'); const r=bt.getBoundingClientRect(); const cs=getComputedStyle(bt); return {label:bt.getAttribute('aria-label'),pressed:bt.getAttribute('aria-pressed'),w:r.width,h:r.height, tab:bt.tabIndex, cintaHidden:document.querySelector('.cinta').getAttribute('aria-hidden'), inH:!!document.querySelector('.cinta').closest('h1,h2,h3')};});
  await btn.focus(); await p.keyboard.press('Enter'); await p.waitForTimeout(300);
  const c1=await pos(p); await p.waitForTimeout(1500); const c2=await pos(p);
  const pressed2 = await btn.getAttribute('aria-pressed');
  await p.keyboard.press('Enter'); await p.waitForTimeout(300); const e1=await pos(p); await p.waitForTimeout(1200); const e2=await pos(p);
  // offscreen
  await p.evaluate(()=>scrollTo(0,0)); await p.evaluate(()=>{ const c=document.querySelector('[data-cinta-caja]'); scrollTo(0, c.getBoundingClientRect().top+scrollY+3000); });
  await p.waitForTimeout(500);
  const fueraCls = await p.evaluate(()=>document.querySelector('[data-cinta-caja]').className);
  // reduced: start position of first item
  const startX = await p.evaluate(()=>{const s=document.querySelector('.cinta__grupo > span'); return Math.round(s.getBoundingClientRect().left);});
  const mk = await p.evaluate(()=>[...document.querySelectorAll('.mk')].map(m=>getComputedStyle(m).backgroundSize));
  console.log(d.padEnd(8),pg.padEnd(24),w,rm.padEnd(13),'v=',v.toFixed(1),'px/s |',JSON.stringify(info),'| tras pausa: Δ',(c2-c1).toFixed(1),'pressed',pressed2,'| tras reanudar Δ',(e2-e1).toFixed(1),'| fuera:',/cinta--fuera/.test(fueraCls),'| mk',JSON.stringify(mk.slice(0,2)),'| x primer ítem',startX);
  await ctx.close();
}
await b.close();
