import { chromium } from '/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs';
const [OUT, url, w, sel, nombre] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--disable-lcd-text'] });
const p = await (await b.newContext({ viewport: { width: +w, height: 900 }, reducedMotion: 'reduce' })).newPage();
await p.goto(url, { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready);
await p.evaluate(async () => { for (let y = 0; y < document.documentElement.scrollHeight; y += 400) { scrollTo(0, y); await new Promise(r => setTimeout(r, 30)); } });
if (sel) { const el = p.locator(sel).first(); await el.scrollIntoViewIfNeeded(); await p.evaluate((s) => { const r = document.querySelector(s).getBoundingClientRect(); scrollTo(0, scrollY + r.top - 40); }, sel); await p.waitForTimeout(400); await p.screenshot({ path: `${OUT}/${nombre}.png` }); }
else await p.screenshot({ path: `${OUT}/${nombre}.jpg`, fullPage: true, type: 'jpeg', quality: 60 });
await b.close();
