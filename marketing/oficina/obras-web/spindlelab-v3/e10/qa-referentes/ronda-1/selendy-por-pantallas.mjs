// Evidencia QA: Selendy Gay por pantallas (cada sección capturada cuando está en vista)
import { chromium } from '/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs';
const nav = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', proxy: { server: process.env.HTTPS_PROXY } });
const ctx = await nav.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
await p.goto('https://www.selendygay.com', { waitUntil: 'domcontentloaded', timeout: 45000 });
await p.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
const alto = await p.evaluate(() => document.documentElement.scrollHeight);
let i = 0;
for (let y = 0; y < alto; y += 900) { await p.evaluate(y => scrollTo(0, y), y); await p.waitForTimeout(1800); await p.screenshot({ path: `sg-${String(i++).padStart(2,'0')}.png` }); }
console.log(alto, i);
await nav.close();
