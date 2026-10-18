// El rótulo «Concepto» de una pieza: dónde está, si es fijo o pegajoso, su tamaño, y si sigue a la vista después de bajar 1500 px.
const cands = [...document.querySelectorAll('body *')].filter(e => /concepto/i.test(e.textContent) && e.children.length <= 3 && e.textContent.trim().length < 160);
const res = cands.map(e => { let pos = '', x = e; while (x && x !== document.body) { const p = getComputedStyle(x).position; if (p === 'fixed' || p === 'sticky') { pos = p + ' en ' + x.tagName.toLowerCase() + '.' + x.className; break; } x = x.parentElement; } const r = e.getBoundingClientRect(); return { t: e.textContent.replace(/\s+/g, ' ').trim().slice(0, 90), fs: getComputedStyle(e).fontSize, top: Math.round(r.top), pos }; }).filter(o => o.top < innerHeight && o.top > -50);
scrollTo(0, 1500);
const despues = cands.filter(e => { const r = e.getBoundingClientRect(); return r.top >= 0 && r.bottom <= innerHeight && r.width > 0; }).map(e => e.textContent.replace(/\s+/g, ' ').trim().slice(0, 60));
scrollTo(0, 0);
return { primera: res.slice(0, 4), aLaVistaTras1500: [...new Set(despues)].slice(0, 3) };
