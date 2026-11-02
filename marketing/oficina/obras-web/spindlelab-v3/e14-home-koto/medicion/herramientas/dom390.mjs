import { abrir, cargarKoto, cookies } from './comun.mjs';
const { nav, p } = await abrir(390);
await cargarKoto(p); await cookies(p);
console.log(JSON.stringify(await p.evaluate(() => {
  const as = [...document.querySelectorAll('a')].filter(a => (a.className||'').includes('md:cursor-none') && a.className.includes('md:opacity'));
  const ow = [...document.querySelectorAll('h2')].find(h => h.textContent.trim() === 'Our work');
  const media = as.map(a => { const m = [...a.querySelectorAll('div')].find(d => d.getBoundingClientRect().height > 50 && getComputedStyle(d).borderRadius !== '0px'); const r = m.getBoundingClientRect(); const t = a.querySelector('h3').getBoundingClientRect(); return { y: Math.round(r.top + scrollY), w: Math.round(r.width), h: Math.round(r.height), radio: getComputedStyle(m).borderRadius, op: getComputedStyle(a).opacity, tituloY: Math.round(t.top + scrollY), tituloFs: getComputedStyle(a.querySelector('h3')).fontSize, tituloColor: getComputedStyle(a.querySelector('h3')).color, bajadaColor: getComputedStyle(a.querySelector('p')).color }; });
  const owr = ow.getBoundingClientRect();
  const news = [...document.querySelectorAll('img')].filter(i => (i.parentElement.className||'').includes('aspect-[16/9]') && i.getBoundingClientRect().width > 100).map(i => { const r = i.getBoundingClientRect(); return { y: Math.round(r.top + scrollY), w: Math.round(r.width), h: Math.round(r.height) }; });
  return { ourWork: { y: Math.round(owr.top + scrollY), fs: getComputedStyle(ow).fontSize, sticky: getComputedStyle(ow.closest('.pointer-events-none')).position }, media, news, alto: document.documentElement.scrollHeight };
})));
await nav.close();
