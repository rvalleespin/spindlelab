// Injected in page: window.__C = { extract(label), toHex(str) }
(() => {
  const cv = document.createElement('canvas'); cv.width = cv.height = 1;
  const cx = cv.getContext('2d', { willReadFrequently: true });
  const cache = new Map();
  function parse(c) {
    if (!c) return null;
    if (cache.has(c)) return cache.get(c);
    let r = null;
    const m = c.match(/^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:\s*[,/]\s*([\d.]+%?))?\s*\)$/);
    if (m) {
      let a = m[4] === undefined ? 1 : (m[4].endsWith('%') ? parseFloat(m[4]) / 100 : parseFloat(m[4]));
      r = [Math.round(+m[1]), Math.round(+m[2]), Math.round(+m[3]), +a.toFixed(3)];
    } else if (c === 'transparent') r = [0, 0, 0, 0];
    else {
      cx.clearRect(0, 0, 1, 1); cx.fillStyle = 'rgba(1,2,3,0)'; cx.fillStyle = c; cx.fillRect(0, 0, 1, 1);
      const d = cx.getImageData(0, 0, 1, 1).data;
      r = [d[0], d[1], d[2], +(d[3] / 255).toFixed(3)];
    }
    cache.set(c, r); return r;
  }
  const hx = (n) => n.toString(16).padStart(2, '0');
  function key(rgba) { return '#' + hx(rgba[0]) + hx(rgba[1]) + hx(rgba[2]) + (rgba[3] < 1 ? '@' + rgba[3] : ''); }
  function lum(r, g, b) { const f = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); }
  function ratio(a, b) { const la = lum(...a), lb = lum(...b); return +((Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05)).toFixed(2); }
  function over(fg, bg) { const a = fg[3]; return [Math.round(fg[0] * a + bg[0] * (1 - a)), Math.round(fg[1] * a + bg[1] * (1 - a)), Math.round(fg[2] * a + bg[2] * (1 - a)), 1]; }
  function region(e) {
    const c = (x) => e.closest(x);
    if (c('[class*="cookie-notice"]')) return 'cookie';
    if (c('[class*="cart-module"]')) return 'cart';
    if (c('#shop-menu-panel') || c('[class*="shop-menu"]')) return 'menu-design';
    if (c('[class*="mobile-menu"], [class*="mobileMenu"], [class*="menu-module"]')) return 'menu';
    if (c('[class*="search"]')) return 'search';
    if (c('header')) return 'header';
    if (c('footer')) return 'footer';
    if (c('[role="dialog"], dialog, [class*="drawer"], [class*="Drawer"], [class*="enquir"], [class*="Enquir"]')) return 'drawer';
    return 'main';
  }
  function sel(e) {
    let s = e.tagName.toLowerCase();
    const cl = (typeof e.className === 'string' ? e.className : (e.className && e.className.baseVal) || '').trim();
    if (cl) s += '.' + cl.split(/\s+/).slice(0, 4).join('.');
    return s.slice(0, 140);
  }
  function directText(e) {
    let t = '';
    for (const n of e.childNodes) if (n.nodeType === 3) t += n.textContent;
    return t.replace(/\s+/g, ' ').trim();
  }
  function effBg(e) {
    // composite stack of backgrounds from root down to e
    const chain = []; let x = e;
    while (x && x.nodeType === 1) { chain.push(x); x = x.parentElement; }
    let bg = [255, 255, 255, 1]; let imgBehind = false;
    for (let i = chain.length - 1; i >= 0; i--) {
      const s = getComputedStyle(chain[i]);
      const b = parse(s.backgroundColor);
      if (b && b[3] > 0) bg = over(b, bg);
      if (s.backgroundImage && s.backgroundImage !== 'none' && !s.backgroundImage.includes('gradient')) imgBehind = true;
    }
    return { bg, imgBehind };
  }
  function effOpacity(e) { let o = 1, x = e; while (x && x.nodeType === 1) { o *= parseFloat(getComputedStyle(x).opacity); x = x.parentElement; } return o; }
  function visible(e, r) {
    if (r.width < 1 || r.height < 1) return false;
    try { return e.checkVisibility({ opacityProperty: true, visibilityProperty: true }); } catch { return true; }
  }
  let MEDIA = null;
  function overImage(e, r) {
    if (!MEDIA) MEDIA = [...document.querySelectorAll('img, video, picture, [style*="background-image"]')].map(m => { const q = m.getBoundingClientRect(); return { l: q.left + scrollX, t: q.top + scrollY, r: q.right + scrollX, b: q.bottom + scrollY, el: m }; }).filter(q => q.r - q.l > 20 && q.b - q.t > 20);
    const cxp = r.left + r.width / 2 + scrollX, cyp = r.top + r.height / 2 + scrollY;
    return MEDIA.some(q => !q.el.contains(e) && !e.contains(q.el) && cxp >= q.l && cxp <= q.r && cyp >= q.t && cyp <= q.b && getComputedStyle(q.el).opacity !== '0');
  }

  function extract(label, rootSel) {
    MEDIA = null;
    const agg = new Map(); const pairs = new Map();
    const add = (prop, rgba, e, opts = {}) => {
      if (!rgba || rgba[3] === 0) return;
      const k = prop + '|' + key(rgba) + '|' + (opts.vis ? 'v' : 'h');
      let a = agg.get(k);
      if (!a) { a = { prop, hex: key(rgba), rgba, visible: !!opts.vis, count: 0, area: 0, chars: 0, regions: {}, samples: [] }; agg.set(k, a); }
      a.count++; a.area += opts.area || 0; a.chars += opts.chars || 0;
      const rg = region(e); a.regions[rg] = (a.regions[rg] || 0) + 1;
      if (a.samples.length < 6) { const sg = sel(e) + (opts.txt ? ' «' + opts.txt.slice(0, 40) + '»' : '') + ' [' + rg + ']'; if (!a.samples.includes(sg)) a.samples.push(sg); }
    };
    const R = rootSel ? document.querySelector(rootSel) : null;
    const all = R ? [R, ...R.querySelectorAll('*')] : [document.documentElement, ...document.querySelectorAll('body, body *')];
    for (const e of all) {
      const s = getComputedStyle(e);
      if (s.display === 'none') continue;
      const r = e.getBoundingClientRect();
      const vis = visible(e, r);
      const area = Math.round(r.width * r.height);
      const tag = e.tagName;
      const svgShape = e instanceof SVGElement && !(e instanceof SVGSVGElement);
      // text
      const dt = directText(e);
      if (dt && !svgShape) {
        const c = parse(s.color);
        add('color', c, e, { vis, chars: dt.length, txt: dt });
        if (vis) {
          const { bg, imgBehind } = effBg(e);
          const op = effOpacity(e);
          const fgEff = over([c[0], c[1], c[2], c[3] * op], bg);
          const oi = imgBehind || overImage(e, r);
          const pk = key(fgEff) + ' on ' + key(bg) + (oi ? ' (over image)' : '');
          let p = pairs.get(pk);
          if (!p) { p = { fg: key(fgEff), fgDeclared: key(c), opacity: +op.toFixed(2), bg: key(bg), overImage: !!oi, ratio: ratio(fgEff, bg), chars: 0, count: 0, samples: [], sizes: {} }; pairs.set(pk, p); }
          p.chars += dt.length; p.count++;
          const fs = s.fontSize + '/' + s.fontWeight; p.sizes[fs] = (p.sizes[fs] || 0) + dt.length;
          if (p.samples.length < 5) p.samples.push('«' + dt.slice(0, 30) + '» ' + sel(e).slice(0, 60) + ' [' + region(e) + '] ' + fs);
        }
      }
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') {
        add('color', parse(s.color), e, { vis, txt: 'input:' + (e.name || e.type) });
        const ph = getComputedStyle(e, '::placeholder');
        if (e.placeholder) add('placeholder', parse(ph.color), e, { vis, txt: e.placeholder });
        add('caret', parse(s.caretColor), e, { vis });
        add('accent', s.accentColor === 'auto' ? null : parse(s.accentColor), e, { vis });
      }
      if (!svgShape) {
        add('background', parse(s.backgroundColor), e, { vis, area });
        if (s.backgroundImage && s.backgroundImage.includes('gradient')) {
          for (const m of s.backgroundImage.matchAll(/(rgba?\([^)]*\)|oklch\([^)]*\)|lab\([^)]*\)|color\([^)]*\))/g)) add('gradient', parse(m[1]), e, { vis, area, txt: s.backgroundImage.slice(0, 80) });
        }
        for (const side of ['Top', 'Right', 'Bottom', 'Left']) {
          if (parseFloat(s['border' + side + 'Width']) > 0 && s['border' + side + 'Style'] !== 'none') add('border', parse(s['border' + side + 'Color']), e, { vis, txt: side + ' ' + s['border' + side + 'Width'] });
        }
        if (s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) > 0) add('outline', parse(s.outlineColor), e, { vis, txt: s.outlineWidth + ' ' + s.outlineStyle });
        if (s.textDecorationLine && s.textDecorationLine !== 'none' && (dt || e.innerText)) add('text-decoration', parse(s.textDecorationColor), e, { vis, txt: s.textDecorationLine + ' ' + (dt || '').slice(0, 20) });
        if (s.boxShadow && s.boxShadow !== 'none') for (const m of s.boxShadow.matchAll(/(rgba?\([^)]*\))/g)) add('box-shadow', parse(m[1]), e, { vis, txt: s.boxShadow.slice(0, 60) });
        if (s.columnRuleStyle !== 'none' && parseFloat(s.columnRuleWidth) > 0) add('column-rule', parse(s.columnRuleColor), e, { vis });
        for (const pe of ['::before', '::after']) {
          const ps = getComputedStyle(e, pe);
          if (!ps.content || ps.content === 'none' || ps.content === 'normal' || ps.display === 'none') continue;
          add('pseudo-bg' + pe, parse(ps.backgroundColor), e, { vis, area: (parseFloat(ps.width) || 0) * (parseFloat(ps.height) || 0), txt: 'content=' + ps.content.slice(0, 20) });
          if (ps.content !== '""') add('pseudo-color' + pe, parse(ps.color), e, { vis, txt: 'content=' + ps.content.slice(0, 20) });
          for (const side of ['Top', 'Bottom']) if (parseFloat(ps['border' + side + 'Width']) > 0 && ps['border' + side + 'Style'] !== 'none') add('pseudo-border' + pe, parse(ps['border' + side + 'Color']), e, { vis });
        }
      } else {
        if (s.fill && s.fill !== 'none' && !s.fill.startsWith('url')) add('svg-fill', parse(s.fill), e, { vis, area });
        if (s.stroke && s.stroke !== 'none' && !s.stroke.startsWith('url')) add('svg-stroke', parse(s.stroke), e, { vis, area });
      }
    }
    // selection
    const selS = getComputedStyle(document.body, '::selection');
    const selection = { bg: selS.backgroundColor, color: selS.color };
    const theme = [...document.querySelectorAll('meta[name="theme-color"]')].map(m => m.content);
    const imgs = [...document.querySelectorAll('img')].map(i => { const r = i.getBoundingClientRect(); const p = i.parentElement; return { w: Math.round(r.width), h: Math.round(r.height), bg: getComputedStyle(i).backgroundColor, pbg: p ? getComputedStyle(p).backgroundColor : null, op: getComputedStyle(i).opacity, filter: getComputedStyle(i).filter, mix: getComputedStyle(i).mixBlendMode }; });
    const imgBgs = {}; for (const i of imgs) { const k = 'img:' + i.bg + ' | parent:' + i.pbg + ' | op:' + i.op + ' | filter:' + i.filter + ' | blend:' + i.mix; imgBgs[k] = (imgBgs[k] || 0) + 1; }
    const rootVars = {};
    const rs = getComputedStyle(document.documentElement);
    for (let i = 0; i < rs.length; i++) { const n = rs[i]; if (n.startsWith('--')) { const v = rs.getPropertyValue(n).trim(); if (/(#[0-9a-f]{3,8}\b|rgb|oklch|lab\(|hsl|color\()/i.test(v)) rootVars[n] = v + ' => ' + key(parse(v) || [0, 0, 0, 0]); } }
    return { label, url: location.href, title: document.title, scrollH: document.documentElement.scrollHeight, w: innerWidth, colors: [...agg.values()], pairs: [...pairs.values()], selection, theme, imgCount: imgs.length, imgBgs, rootVars, htmlBg: getComputedStyle(document.documentElement).backgroundColor, bodyBg: getComputedStyle(document.body).backgroundColor, bodyColor: getComputedStyle(document.body).color };
  }
  function toHex(list) { return list.map(c => [c, key(parse(c) || [0, 0, 0, 0])]); }
  window.__C = { extract, toHex, parse, key, ratio };
})();
