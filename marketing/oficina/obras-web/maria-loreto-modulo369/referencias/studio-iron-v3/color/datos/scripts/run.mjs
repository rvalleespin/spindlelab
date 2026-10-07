import { newPage, sleep } from './cdp.mjs';
import fs from 'node:fs';
const INPAGE = fs.readFileSync(new URL('./inpage.js', import.meta.url), 'utf8');
const HIDE = `[class*="cookie-notice"]{display:none!important}`;
const B = 'https://www.studio-iron.com';
const PAGES = [
  ['home', '/'],
  ['coleccion-all', '/collections/all-objects'],
  ['disenador-gast', '/collections/gast-studio'],
  ['producto-tubular', '/products/tubular-chair'],
  ['art', '/art'],
  ['artista-phil-hale', '/artists/phil-hale'],
  ['obra-record-separator', '/artists/phil-hale/record-separator'],
  ['events', '/events'],
  ['evento-brompton', '/events/studio-iron-at-brompton-design-district'],
  ['about', '/pages/about'],
  ['ldf', '/pages/london-design-festival'],
  ['black-metal', '/pages/black-metal'],
  ['privacy', '/pages/privacy'],
  ['search', '/search'],
  ['account', '/account'],
  ['404', '/esta-ruta-no-existe-369'],
];
const only = process.argv[2] ? process.argv[2].split(',') : null;
const vps = process.argv[3] ? process.argv[3].split(',').map(Number) : [1440, 390];
const sheets = new Map();

async function scrollThrough(p) {
  const H = await p.evaluate('document.documentElement.scrollHeight');
  const ih = await p.evaluate('innerHeight');
  for (let y = 0; y < Math.min(H, 26000); y += Math.round(ih * 0.8)) { await p.evaluate(`scrollTo(0,${y})`); await sleep(220); }
  await p.evaluate('scrollTo(0,document.documentElement.scrollHeight)'); await sleep(600);
  await p.evaluate('scrollTo(0,0)'); await sleep(900);
}

async function hoverProbe(p, label) {
  const cands = await p.evaluate(`(() => {
    const els=[...document.querySelectorAll('a, button, [role=button], summary, input, select, textarea, label')];
    const seen=new Set(); const out=[]; let i=0;
    for(const e of els){ const r=e.getBoundingClientRect(); if(r.width<2||r.height<2) continue; if(!e.checkVisibility({opacityProperty:true,visibilityProperty:true})) continue;
      const cl=(typeof e.className==='string'?e.className:'').trim().split(/\\s+/).slice(0,5).join('.');
      const sig=e.tagName+'.'+cl+'|'+(e.closest('header')?'H':e.closest('footer')?'F':'M')+'|'+(e.querySelector('img')?'img':'')+'|'+(e.children.length);
      if(seen.has(sig)) continue; seen.add(sig); e.setAttribute('data-cp', i); out.push({i, sig, txt:(e.innerText||e.getAttribute('aria-label')||'').trim().slice(0,40)}); i++; if(i>=45) break; }
    return out; })()`);
  const READ = (i) => `(() => { const e=document.querySelector('[data-cp="${i}"]'); if(!e) return null; const pick=(x)=>{const s=getComputedStyle(x); const a=getComputedStyle(x,'::after'); const b4=getComputedStyle(x,'::before'); return {after:a.content==='none'?'':(a.backgroundColor+' tf '+a.transform+' w '+a.width+' op '+a.opacity+' tr '+a.transitionDuration), before4:b4.content==='none'?'':(b4.backgroundColor+' tf '+b4.transform+' w '+b4.width+' op '+b4.opacity),color:s.color,bg:s.backgroundColor,bt:s.borderTopColor,bb:s.borderBottomColor,bw:s.borderBottomWidth,op:s.opacity,td:s.textDecorationLine,tdc:s.textDecorationColor,tdo:s.textUnderlineOffset,outline:s.outlineStyle+' '+s.outlineWidth+' '+s.outlineColor+' off '+s.outlineOffset,tf:s.transform,filter:s.filter,shadow:s.boxShadow,tr:s.transitionProperty+' '+s.transitionDuration+' '+s.transitionTimingFunction}};
    const kids=[...[...e.querySelectorAll('img, video')].slice(0,4), ...[...e.querySelectorAll('span, p, h2, h3, div')].slice(0,6)];
    return {self:pick(e), kids:kids.map(k=>({tag:k.tagName+'.'+(typeof k.className==='string'?k.className.split(' ').slice(0,2).join('.'):''), ...pick(k)}))}; })()`;
  const doc = await p.send('DOM.getDocument', { depth: -1 });
  const results = [];
  for (const c of cands) {
    const rect = await p.evaluate(`(() => { const e=document.querySelector('[data-cp="${c.i}"]'); e.scrollIntoView({block:'center'}); const r=e.getBoundingClientRect(); return {x:r.left+r.width/2,y:r.top+r.height/2}; })()`);
    await p.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 3, y: 899 - 3 });
    await sleep(500);
    const before = await p.evaluate(READ(c.i));
    await p.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: rect.x, y: rect.y });
    await sleep(800);
    const hover = await p.evaluate(READ(c.i));
    await p.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 3, y: 899 - 3 });
    await sleep(400);
    let focus = null;
    try {
      const q = await p.send('DOM.querySelector', { nodeId: doc.root.nodeId, selector: `[data-cp="${c.i}"]` });
      if (q.nodeId) {
        await p.send('CSS.forcePseudoState', { nodeId: q.nodeId, forcedPseudoClasses: ['focus', 'focus-visible'] });
        await sleep(300);
        focus = await p.evaluate(READ(c.i));
        await p.send('CSS.forcePseudoState', { nodeId: q.nodeId, forcedPseudoClasses: [] });
      }
    } catch (e) { focus = { err: String(e).slice(0, 100) }; }
    const diff = (a, b) => { const d = {}; if (!a || !b) return d; for (const k of Object.keys(a.self)) if (a.self[k] !== b.self[k]) d['self.' + k] = [a.self[k], b.self[k]]; a.kids.forEach((ka, j) => { const kb = b.kids[j]; if (!kb) return; for (const k of Object.keys(ka)) if (k !== 'tag' && ka[k] !== kb[k]) d['kid' + j + '(' + ka.tag + ').' + k] = [ka[k], kb[k]]; }); return d; };
    results.push({ ...c, before: before && before.self, hoverDiff: diff(before, hover), focusDiff: diff(before, focus) });
  }
  return results;
}

const out = [];
for (const vp of vps) {
  const p = await newPage();
  p.on((m) => { if (m.method === 'CSS.styleSheetAdded') { const h = m.params.header; const k = (h.sourceURL && !h.isInline) ? h.sourceURL : h.styleSheetId; if (!sheets.has(k)) sheets.set(k, { id: h.styleSheetId, page: p, url: h.sourceURL, inline: h.isInline }); } });
  await p.setViewport(vp);
  let cookieDone = false;
  for (const [label, path] of PAGES) {
    if (only && !only.includes(label)) continue;
    const L = `${label}-${vp}`;
    try {
      await p.goto(B + path, 3500);
      await p.evaluate(INPAGE);
      if (!cookieDone) {
        const withCookie = await p.evaluate(`__C.extract('cookie')`);
        withCookie.colors = withCookie.colors.filter(c => c.regions.cookie);
        withCookie.pairs = withCookie.pairs.filter(c => c.samples.some(s => s.includes('[cookie]')));
        fs.writeFileSync(`data/cookie-${vp}.json`, JSON.stringify(withCookie, null, 1));
        await p.shot(`caps/cookie-${vp}.jpg`);
        cookieDone = true;
      }
      await p.evaluate(`(()=>{const s=document.createElement('style');s.id='__hide';s.textContent=${JSON.stringify(HIDE)};document.head.appendChild(s);})()`);
      await scrollThrough(p);
      await p.shot(`caps/${L}-v0.jpg`);
      const ih = await p.evaluate('innerHeight');
      await p.evaluate(`scrollTo(0,${Math.round(ih * 1.6)})`); await sleep(900);
      await p.shot(`caps/${L}-v1.jpg`);
      await p.evaluate('scrollTo(0,0)'); await sleep(600);
      const H = await p.evaluate('document.documentElement.scrollHeight');
      const W = await p.evaluate('innerWidth');
      if (vp === 1440) {
        await p.shotPng(`data/${L}-full.png`, { full: true, clip: { x: 0, y: 0, width: W, height: Math.min(H, 16000), scale: 1 } });
        await p.shot(`caps/${L}-full.jpg`, { full: true, clip: { x: 0, y: 0, width: W, height: Math.min(H, 16000), scale: 0.5 } });
      } else {
        await p.shot(`caps/${L}-full.jpg`, { full: true, clip: { x: 0, y: 0, width: W, height: Math.min(H, 12000), scale: 1 } });
      }
      const ex = await p.evaluate(`__C.extract(${JSON.stringify(L)})`);
      if (vp === 1440) ex.hover = await hoverProbe(p, L);
      fs.writeFileSync(`data/${L}.json`, JSON.stringify(ex, null, 1));
      for (const [k, s] of sheets) { if (s.page !== p || s.done) continue; try { const t = await p.send('CSS.getStyleSheetText', { styleSheetId: s.id }); const fn = 'data/css-' + (s.url && !s.inline ? s.url.split('/').pop().split('?')[0] : 'inline-' + L + '-' + s.id.replace(/\W/g, '')); fs.writeFileSync(fn.endsWith('.css') ? fn : fn + '.css', `/* ${s.url} */\n` + t.text); s.done = true; } catch (e) { s.done = true; } }
      out.push({ L, url: ex.url, title: ex.title, H: ex.scrollH, nColors: ex.colors.length });
      console.log('ok', L, ex.url, ex.title, ex.scrollH, ex.colors.length, ex.hover ? ex.hover.length : '');
    } catch (e) { console.log('ERR', L, String(e).slice(0, 300)); }
  }
  await p.close();
}
fs.writeFileSync('data/run-index.json', JSON.stringify(out, null, 1));
