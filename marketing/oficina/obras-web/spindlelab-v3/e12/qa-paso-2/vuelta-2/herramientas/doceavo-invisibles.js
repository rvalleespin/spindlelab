// Doceavo a 390: los nodos de texto cuyo color es igual a su fondo (contraste 1). ¿Qué son, se ven, los oye un lector?
const out = {}; let n = 0;
const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let t;
while ((t = tw.nextNode())) {
  const el = t.parentElement; const s = getComputedStyle(el);
  if (!t.textContent.trim() || s.display === 'none') continue;
  if (s.color === s.backgroundColor || (getComputedStyle(el.parentElement).backgroundColor === s.color)) {
    n++; const anc = el.closest('[aria-hidden="true"]'); const cont = el.closest('section,figure,div[class]');
    const k = (cont ? cont.tagName + '.' + cont.className : '?') + ' | aria-hidden ' + !!anc + ' | ' + el.tagName + '.' + el.className;
    out[k] = (out[k] || 0) + 1;
  }
}
return { n, out };
