import { newPage, sleep } from './cdp.mjs';
import fs from 'node:fs';
const INPAGE = fs.readFileSync(new URL('./inpage.js', import.meta.url), 'utf8');
const HIDE = `[class*="cookie-notice"]{display:none!important}`;
const B = 'https://www.studio-iron.com';
const res = {};

async function prep(p, url) {
  await p.goto(url, 3500);
  await p.evaluate(INPAGE);
  await p.evaluate(`(()=>{const s=document.createElement('style');s.textContent=${JSON.stringify(HIDE)};document.head.appendChild(s);})()`);
  await sleep(400);
}
const clickText = (scope, re) => `(() => { const el=[...document.querySelectorAll('${scope}')].find(b=>${re}.test((b.innerText||b.getAttribute('aria-label')||'').trim())); if(!el) return 'nf'; el.click(); return (el.innerText||el.getAttribute('aria-label')||'').trim().slice(0,40); })()`;
const center = (scope, re) => `(() => { const el=[...document.querySelectorAll('${scope}')].find(b=>${re}.test((b.innerText||b.getAttribute('aria-label')||'').trim())); if(!el) return null; const r=el.getBoundingClientRect(); return {x:r.left+r.width/2,y:r.top+r.height/2}; })()`;
// find the largest fixed/absolute element that became visible after an action
const NEWVIS = `(() => { const out=[]; for (const e of document.querySelectorAll('body *')) { const s=getComputedStyle(e); if(!['fixed','absolute','sticky'].includes(s.position)) continue; const r=e.getBoundingClientRect(); if(r.width<200||r.height<150) continue; if(!e.checkVisibility({opacityProperty:true,visibilityProperty:true})) continue; if (r.right<=0||r.left>=innerWidth||r.bottom<=0||r.top>=innerHeight) continue; out.push({cls:(typeof e.className==='string'?e.className:'').slice(0,90), id:e.id, pos:s.position, bg:s.backgroundColor, z:s.zIndex, x:Math.round(r.left), y:Math.round(r.top), w:Math.round(r.width), h:Math.round(r.height), backdrop:s.backdropFilter}); } return out; })()`;

async function scoped(p, label, sel) {
  await p.evaluate(`document.querySelectorAll('[data-scope]').forEach(e=>e.removeAttribute('data-scope'))`);
  const ok = await p.evaluate(`(() => { const e=document.querySelector(${JSON.stringify(sel)}); if(!e) return false; e.setAttribute('data-scope','1'); return true; })()`);
  if (!ok) return { label, err: 'scope not found ' + sel };
  return await p.evaluate(`__C.extract(${JSON.stringify(label)}, '[data-scope="1"]')`);
}

// ---------- 1440 ----------
{
  const p = await newPage(); await p.setViewport(1440);
  // Design menu
  await prep(p, B + '/');
  const c = await p.evaluate(center('header button', '/^Design$/'));
  await p.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: c.x, y: c.y }); await sleep(900);
  let st = await p.evaluate(`(()=>{const m=document.querySelector('#shop-menu-panel'); const r=m.getBoundingClientRect(); return {h:r.height, vis:m.checkVisibility({opacityProperty:true,visibilityProperty:true}), cls:m.className}})()`);
  if (!st.vis || st.h < 50) { await p.evaluate(clickText('header button', '/^Design$/')); await sleep(900); st = await p.evaluate(`(()=>{const m=document.querySelector('#shop-menu-panel'); const r=m.getBoundingClientRect(); return {h:r.height, vis:m.checkVisibility({opacityProperty:true,visibilityProperty:true}), cls:m.className}})()`); }
  res.designMenuState = st;
  await p.shot('caps/ov-1440-menu-design.jpg');
  res.designMenu = await scoped(p, 'menu-design-1440', '#shop-menu-panel');
  res.designMenuNewVis = await p.evaluate(NEWVIS);
  // hover a thumbnail in the menu
  const th = await p.evaluate(`(()=>{const a=document.querySelector('#shop-menu-panel a'); if(!a) return null; const r=a.getBoundingClientRect(); return {x:r.left+r.width/2,y:r.top+r.height/2, txt:a.innerText.trim().slice(0,30)}})()`);
  if (th) {
    const rd = `(()=>{const a=document.querySelector('#shop-menu-panel a'); const s=getComputedStyle(a); const i=a.querySelector('img'); return {op:s.opacity,color:s.color,td:s.textDecorationLine, img: i?getComputedStyle(i).opacity+' '+getComputedStyle(i).transform+' '+getComputedStyle(i).filter:null, after:getComputedStyle(a,'::after').transform}})()`;
    const before = await p.evaluate(rd);
    await p.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: th.x, y: th.y }); await sleep(800);
    const after = await p.evaluate(rd);
    res.designMenuThumbHover = { th, before, after };
    await p.shot('caps/ov-1440-menu-design-hover.jpg');
  }
  // Search overlay
  await prep(p, B + '/');
  res.searchClick = await p.evaluate(clickText('header button, header a', '/^Search$/')); await sleep(1200);
  await p.shot('caps/ov-1440-search.jpg');
  res.searchNewVis = await p.evaluate(NEWVIS);
  res.searchFull = await p.evaluate(`__C.extract('search-1440')`);
  // Bag (empty) drawer
  await prep(p, B + '/');
  res.bagClick = await p.evaluate(clickText('header button, header a', '/^Bag/')); await sleep(1200);
  await p.shot('caps/ov-1440-bag.jpg');
  res.bagNewVis = await p.evaluate(NEWVIS);
  res.bag = await scoped(p, 'bag-1440', '[class*="cart-module"]');
  // Enquire drawer on artwork (open only)
  await prep(p, B + '/artists/phil-hale/record-separator');
  res.enquireClick = await p.evaluate(clickText('button, a', '/^enquire$/i')); await sleep(1300);
  await p.shot('caps/ov-1440-enquire.jpg');
  res.enquireNewVis = await p.evaluate(NEWVIS);
  res.enquireFull = await p.evaluate(`__C.extract('enquire-1440')`);
  // focus the first text input inside the drawer (no typing, no submit)
  const f = await p.evaluate(`(()=>{const i=[...document.querySelectorAll('input[type=text],input[type=email],input:not([type]),textarea')].find(x=>x.checkVisibility()); if(!i) return null; i.focus(); const s=getComputedStyle(i); const lab=i.closest('div')&&i.closest('div').querySelector('label'); return {name:i.name, bg:s.backgroundColor, bb:s.borderBottomColor, bbw:s.borderBottomWidth, outline:s.outlineStyle+' '+s.outlineColor, color:s.color, label: lab?getComputedStyle(lab).color+' '+getComputedStyle(lab).fontSize+' '+getComputedStyle(lab).transform:null}})()`);
  await sleep(500);
  res.enquireFocus = f;
  await p.shot('caps/ov-1440-enquire-focus.jpg');
  await p.close();
}
// ---------- 390 ----------
{
  const p = await newPage(); await p.setViewport(390);
  await prep(p, B + '/');
  await p.shot('caps/ov-390-home-closed.jpg');
  res.burger = await p.evaluate(`(() => { const b=[...document.querySelectorAll('header button')].filter(x=>x.checkVisibility()); return b.map(x=>({txt:(x.innerText||'').trim().slice(0,20), aria:x.getAttribute('aria-label'), exp:x.getAttribute('aria-expanded'), cls:(x.className||'').slice(0,60)})); })()`);
  res.burgerClick = await p.evaluate(`(() => { const b=[...document.querySelectorAll('header button')].filter(x=>x.checkVisibility()).find(x=>/menu/i.test((x.getAttribute('aria-label')||'')+(x.innerText||'')+(x.className||''))); if(!b) return 'nf'; b.click(); return b.getAttribute('aria-label')||b.innerText; })()`);
  await sleep(1200);
  await p.shot('caps/ov-390-menu.jpg');
  res.mobileMenuNewVis = await p.evaluate(NEWVIS);
  res.mobileMenu = await p.evaluate(`__C.extract('mobile-menu-390')`);
  res.mobileDesign = await p.evaluate(clickText('button', '/^Design/')); await sleep(1100);
  await p.shot('caps/ov-390-menu-design.jpg');
  res.mobileMenuDesign = await p.evaluate(`__C.extract('mobile-menu-design-390')`);
  await p.close();
}
fs.writeFileSync('data/overlays.json', JSON.stringify(res, null, 1));
console.log(JSON.stringify({ d: res.designMenuState, s: res.searchClick, b: res.bagClick, e: res.enquireClick, f: res.enquireFocus, burger: res.burger, bc: res.burgerClick, md: res.mobileDesign, th: res.designMenuThumbHover }, null, 1));
