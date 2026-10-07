import { newPage } from './cdp.mjs';
import fs from 'node:fs';
const p = await newPage();
await p.setViewport(1440);
await p.goto('https://www.studio-iron.com/', 5000);
await p.shot('caps/discover-home-1440-v0.jpg');
const info = await p.evaluate(`(() => {
  const links=[...document.querySelectorAll('a[href]')].map(a=>({h:a.href.split('#')[0], t:(a.innerText||a.getAttribute('aria-label')||'').trim().slice(0,40)}));
  const seen=new Set(); const out=[];
  for(const l of links){ if(!l.h.includes('studio-iron.com')) continue; if(seen.has(l.h)) continue; seen.add(l.h); out.push(l);} 
  const fixed=[...document.querySelectorAll('body *')].filter(e=>{const s=getComputedStyle(e);return (s.position==='fixed'||s.position==='sticky') && e.offsetWidth>0}).map(e=>({tag:e.tagName,id:e.id,cls:(e.className&&e.className.baseVal===undefined?e.className:'').toString().slice(0,80),pos:getComputedStyle(e).position,txt:(e.innerText||'').slice(0,80)}));
  return {title:document.title, links:out, fixed, h:document.documentElement.scrollHeight};
})()`);
fs.writeFileSync('data/discover.json', JSON.stringify(info, null, 1));
console.log(info.title, info.h); console.log(JSON.stringify(info.fixed,null,0)); console.log(info.links.map(l=>l.h+'  |'+l.t).join('\n'));
await p.close();
