const hs=[...document.querySelectorAll('main h1, main h2, main h3')].filter(h=>h.getClientRects().length).map(h=>h.tagName+': '+h.textContent.trim().replace(/\s+/g,' ').slice(0,70));
const t=document.body.innerText; const i=t.search(/Paid Media|redes/i); 
return hs.join('\n')+'\n--- línea redes/paid: '+t.slice(Math.max(0,i-120), i+160).replace(/\n/g,' ⏎ ');
