import { abrir } from './comun.mjs';
const { nav, p } = await abrir(1440);
await p.goto('https://spindlelab.cl/', { waitUntil: 'networkidle', timeout: 60000 });
console.log(JSON.stringify(await p.evaluate(() => { const medios = [...document.querySelectorAll('main img, main video')].map(m => m.getBoundingClientRect()).filter(r => r.width * r.height > 150 * 150); const vis = []; const seen = new Set(); for (const r of medios) { const k = Math.round(r.top) + ':' + Math.round(r.left); if (!seen.has(k)) { seen.add(k); vis.push(r); } } return { medios: vis.length, area: +(vis.reduce((a, r) => a + r.width * r.height, 0) / (document.documentElement.scrollHeight * innerWidth)).toFixed(3) }; })));
await nav.close();
