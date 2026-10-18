const out=[];
for (const m of document.querySelectorAll('main img, main video')) {
  const fig = m.closest('figure'); const cap = fig ? (fig.querySelector('figcaption')||{}).textContent : null;
  let nxt = null; if(!cap){ let e = m.closest('div,figure'); for(let k=0;k<4&&e&&!nxt;k++){ const s=e.nextElementSibling; if(s&&/ejemplo|generad/i.test(s.textContent)) nxt=s.textContent; e=e.parentElement; } }
  out.push(((m.currentSrc||m.getAttribute('src')||(m.querySelector('source')||{}).src||'').split('/').pop()) + ' | ' + (m.getAttribute('alt')||m.getAttribute('aria-label')||'').slice(0,110) + ' || ' + ((cap||nxt||'')).replace(/\s+/g,' ').trim().slice(0,120));
}
return out.join('\n');
