import { newPage, sleep } from './cdp.mjs';
import fs from 'node:fs';
const INPAGE = fs.readFileSync('./inpage.js', 'utf8');
const HIDE = `[class*="cookie-notice"]{display:none!important}`;
const B = 'https://www.studio-iron.com';
const res = {};
async function prep(p, url) { await p.goto(url, 3500); await p.evaluate(INPAGE); await p.evaluate(`(()=>{const s=document.createElement('style');s.textContent=${JSON.stringify(HIDE)};document.head.appendChild(s);})()`); await sleep(400); }
async function scoped(p, label, sel) {
  const ok = await p.evaluate(`(() => { document.querySelectorAll('[data-scope]').forEach(e=>e.removeAttribute('data-scope')); const e=document.querySelector(${JSON.stringify(sel)}); if(!e) return false; e.setAttribute('data-scope','1'); return true; })()`);
  if (!ok) return { err: 'nf ' + sel };
  return await p.evaluate(`__C.extract(${JSON.stringify(label)}, '[data-scope="1"]')`);
}
{
  const p = await newPage(); await p.setViewport(1440);
  await prep(p, B + '/');
  const c = await p.evaluate(`(()=>{const b=[...document.querySelectorAll('header button')].find(x=>x.innerText.trim()==='Design'); const r=b.getBoundingClientRect(); return {x:r.left+r.width/2,y:r.top+r.height/2}})()`);
  await p.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: c.x, y: c.y }); await sleep(1000);
  res.submenu = await scoped(p, 'submenu-1440', '[class*="dynamic-menu-module__qpp75q__submenu"]');
  res.designAfter = await p.evaluate(`(()=>{const b=[...document.querySelectorAll('header button')].find(x=>x.innerText.trim()==='Design'); const a=getComputedStyle(b,'::after'); return {tf:a.transform, bg:a.backgroundColor, h:a.height, bottom:a.bottom}})()`);
  // hover a submenu thumbnail
  const th = await p.evaluate(`(()=>{const a=document.querySelector('[class*="dynamic-menu-module__qpp75q__submenu"] a'); if(!a) return null; a.setAttribute('data-th','1'); const r=a.getBoundingClientRect(); return {x:r.left+r.width/2,y:r.top+r.height/2-30}})()`);
  const rd = `(()=>{const a=document.querySelector('[data-th]'); const s=getComputedStyle(a); const i=a.querySelector('img'); const t=[...a.querySelectorAll('*')].find(x=>x.childNodes[0]&&x.childNodes[0].nodeType===3&&x.innerText.trim()); return {op:s.opacity, img: i?[getComputedStyle(i).opacity,getComputedStyle(i).transform,getComputedStyle(i).filter,getComputedStyle(i.parentElement).backgroundColor].join(' | '):null, txt: t?[getComputedStyle(t).color,getComputedStyle(t).textDecorationLine,getComputedStyle(t).opacity].join(' | '):null}})()`;
  if (th) { await p.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: c.x, y: c.y + 12 }); await sleep(200); res.thBefore = await p.evaluate(rd); await p.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: th.x, y: th.y }); await sleep(900); res.thAfter = await p.evaluate(rd); await p.shot('caps/ov-1440-menu-design-hover2.jpg'); }
  // Enquire button state
  await prep(p, B + '/artists/phil-hale/record-separator');
  await p.evaluate(`[...document.querySelectorAll('button,a')].find(b=>/^enquire$/i.test(b.innerText.trim())).click()`); await sleep(1300);
  res.enquireBtn = await p.evaluate(`(()=>{const b=[...document.querySelectorAll('button')].find(x=>/send enquiry/i.test(x.innerText)); const s=getComputedStyle(b); return {disabled:b.disabled, bg:s.backgroundColor, color:s.color, op:s.opacity, cls:b.className}})()`);
  res.enquireInputs = await p.evaluate(`[...document.querySelectorAll('input.peer')].map(i=>{const s=getComputedStyle(i); const l=i.parentElement.querySelector('label'); return {bg:s.backgroundColor, bb:s.borderBottomColor+' '+s.borderBottomWidth, h:i.offsetHeight, label:l?getComputedStyle(l).color+' '+getComputedStyle(l).fontSize:null}})`);
  // focus the drawer Name input (no typing)
  await p.evaluate(`document.querySelector('input.peer').focus()`); await sleep(500);
  res.enquireFocus = await p.evaluate(`(()=>{const i=document.querySelector('input.peer'); const s=getComputedStyle(i); const l=i.parentElement.querySelector('label'); return {bg:s.backgroundColor, bb:s.borderBottomColor+' '+s.borderBottomWidth, outline:s.outlineStyle+' '+s.outlineWidth+' '+s.outlineColor, shadow:s.boxShadow, label:l?getComputedStyle(l).color+' '+getComputedStyle(l).fontSize+' '+getComputedStyle(l).transform:null}})()`);
  await p.shot('caps/ov-1440-enquire-focus.jpg');
  await p.close();
}
{
  const p = await newPage(); await p.setViewport(390);
  await prep(p, B + '/');
  await p.evaluate(`[...document.querySelectorAll('header button')].find(x=>x.getAttribute('aria-label')==='Open menu').click()`); await sleep(1200);
  res.mobileMenu = await scoped(p, 'mobile-menu-390', '#mobile-menu');
  res.mobileDesignClick = await p.evaluate(`(()=>{const b=[...document.querySelectorAll('#mobile-menu button')].find(x=>/design/i.test(x.innerText)); if(!b) return 'nf'; b.click(); return b.innerText})()`); await sleep(1200);
  await p.shot('caps/ov-390-menu-design.jpg');
  res.mobileMenuDesign = await scoped(p, 'mobile-menu-design-390', '#mobile-menu');
  await p.close();
}
fs.writeFileSync('data/followup.json', JSON.stringify(res, null, 1));
const show = (ex) => { if (!ex || !ex.colors) return console.log(ex); for (const c of ex.colors.filter(c => c.visible).sort((a, b) => a.prop.localeCompare(b.prop))) console.log('  ', c.prop, c.hex, c.count, Math.round(c.area), c.chars, c.samples.slice(0, 2).join(' || ')); };
console.log('submenu'); show(res.submenu); console.log(res.designAfter, res.thBefore, res.thAfter);
console.log(res.enquireBtn, res.enquireInputs, res.enquireFocus);
console.log('mobile'); show(res.mobileMenu); console.log(res.mobileDesignClick); console.log('mobile design'); show(res.mobileMenuDesign);
