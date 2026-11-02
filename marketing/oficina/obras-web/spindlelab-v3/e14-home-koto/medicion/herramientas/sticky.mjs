import { abrir } from './comun.mjs';
const { nav, p } = await abrir(1440);
await p.goto('https://spindlelab.cl/', { waitUntil: 'networkidle', timeout: 60000 });
console.log(JSON.stringify(await p.evaluate(() => [...document.querySelectorAll('main *')].filter(e => getComputedStyle(e).position === 'sticky').map(e => { const b = e.getBoundingClientRect(); return { c: (e.className||'').toString().slice(0,60), top: getComputedStyle(e).top, w: Math.round(b.width), h: Math.round(b.height), txt: e.innerText.trim().slice(0, 50).replace(/\n/g,' | '), padreH: Math.round(e.parentElement.getBoundingClientRect().height) }; })), null, 0));
await nav.close();
