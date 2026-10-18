// Las líneas mono bajo cada portada de «Lo que construimos» (defecto 14): nombre y línea de cada entrada.
const out = [];
for (const a of document.querySelectorAll('main a[href*="/trabajo/"]')) {
  const t = a.innerText.replace(/\s+/g, ' ').trim();
  if (t) out.push(t.slice(0, 160));
}
return out;
