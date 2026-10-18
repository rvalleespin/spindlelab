const out=[]; for(const e of document.querySelectorAll('a[href],button,input,select,summary,[role=button],video[controls]')){ const r=e.getBoundingClientRect(); if(!r.width||!r.height) continue; const s=getComputedStyle(e); if(s.visibility==='hidden') continue;
 const inline = s.display==='inline' && e.closest('p,li') && e.closest('p,li').textContent.trim().length > e.textContent.trim().length+5;
 if((r.height<44||r.width<44) && !inline) out.push([e.tagName.toLowerCase(), (e.textContent||e.getAttribute('aria-label')||'').trim().replace(/\s+/g,' ').slice(0,30), Math.round(r.width)+'x'+Math.round(r.height)]); }
return {n: out.length, menos24: out.filter(x=>{const [w,h]=x[2].split('x').map(Number); return w<24||h<24;}), muestra: out.slice(0,12)};
