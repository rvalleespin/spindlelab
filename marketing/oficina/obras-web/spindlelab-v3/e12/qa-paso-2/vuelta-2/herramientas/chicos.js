const o=[]; const tw=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT); let n;
while((n=tw.nextNode())){const t=n.textContent.trim(); if(!t) continue; const e=n.parentElement; const s=getComputedStyle(e); if(s.display==='none'||!e.getClientRects().length) continue; if(parseFloat(s.fontSize)<11) o.push([t.slice(0,30), s.fontSize, e.tagName, (e.className.baseVal??e.className), !!e.closest('[aria-hidden="true"]'), !!e.closest('svg'), Math.round(e.getBoundingClientRect().top+scrollY)]);}
return o;
