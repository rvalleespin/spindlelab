// /trabajo/: cada entrada, su tipo y su línea mono (los ingredientes que lleva).
const filas = [...document.querySelectorAll('main li, main tr, main article')].filter(e => e.querySelector('a[href]') && e.innerText.trim().length > 10);
return filas.map(e => e.innerText.replace(/\s+/g, ' ').trim().slice(0, 230));
