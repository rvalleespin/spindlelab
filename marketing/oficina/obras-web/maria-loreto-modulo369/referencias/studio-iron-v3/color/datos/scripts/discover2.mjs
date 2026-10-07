import { newPage } from './cdp.mjs';
const p = await newPage();
await p.setViewport(1440);
for (const u of ['https://www.studio-iron.com/art','https://www.studio-iron.com/events','https://www.studio-iron.com/pages/about']) {
  await p.goto(u, 3000);
  const links = await p.evaluate(`[...new Set([...document.querySelectorAll('main a[href], a[href]')].map(a=>a.href.split('#')[0]))].filter(h=>h.includes('studio-iron.com')&&!h.includes('/collections/')&&!h.includes('/products/')).join('\\n')`);
  console.log('==',u, await p.evaluate('document.title'), await p.evaluate('document.documentElement.scrollHeight')); console.log(links);
}
await p.close();
