// Un h1 por página, visible y no escondido al lector (ningún ancestro con aria-hidden, display:none, visibility:hidden ni inert); y el nombre del caso no duplicado con otro texto visible.
const out = [];
for (const h of document.querySelectorAll('h1')) {
  const anc = [];
  for (let e = h; e; e = e.parentElement) { const c = getComputedStyle(e); if (c.display === 'none' || c.visibility === 'hidden' || e.getAttribute('aria-hidden') === 'true' || e.inert) anc.push(e.tagName + '.' + e.className); }
  const r = h.getBoundingClientRect();
  out.push({ t: h.textContent.replace(/\s+/g, ' ').trim(), rects: h.getClientRects().length, top: Math.round(r.top), escondido: anc });
}
return out;
