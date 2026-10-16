import { chromium } from '/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args:['--no-sandbox','--disable-lcd-text','--force-color-profile=srgb'] });
for (const d of ['taller','pizarra']) for (const pg of ['home','acompanamiento-mensual','trabajo']) for (const [w,h] of [[1440,900],[390,844]]) {
  const ctx = await b.newContext({ viewport:{width:w,height:h} });
  const p = await ctx.newPage();
  await p.goto(`http://127.0.0.1:8780/${d}/${pg}.html`, { waitUntil:'networkidle' });
  const H = await p.evaluate(()=>document.documentElement.scrollHeight);
  for (let y=0;y<H;y+=300){ await p.evaluate(y=>scrollTo(0,y),y); await p.waitForTimeout(50); }
  await p.evaluate(()=>scrollTo(0,0)); await p.waitForTimeout(600);
  await p.screenshot({ path:`capg/${d}-${pg}-${w}.png`, fullPage:true });
  await ctx.close();
}
await b.close();
