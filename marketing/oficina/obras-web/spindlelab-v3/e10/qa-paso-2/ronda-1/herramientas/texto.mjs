import { chromium } from '/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args:['--no-sandbox'] });
const P = { home:'/v3/', 'acompanamiento-mensual':'/v3/servicios/acompanamiento-mensual/', trabajo:'/v3/trabajo/' };
async function leer(url, w){
  const ctx = await b.newContext({ viewport:{width:w,height:900} });
  const p = await ctx.newPage();
  await p.goto(url, { waitUntil:'networkidle' });
  const H = await p.evaluate(()=>document.body.scrollHeight);
  for (let y=0;y<H;y+=400){ await p.evaluate(y=>scrollTo(0,y),y); await p.waitForTimeout(40); }
  await p.waitForTimeout(500);
  const r = await p.evaluate(()=>{
    document.querySelectorAll('[data-rotulo-foto],[data-cinta],#cookie-banner,script,style,noscript,template').forEach(e=>e.style.setProperty('display','none','important'));
    // undo text-transform so case is source case
    const st=document.createElement('style'); st.textContent='*{text-transform:none!important}'; document.head.appendChild(st);
    const t = document.body.innerText;
    const hero = document.querySelector('h1')?.closest('section')?.innerText || '';
    const form = document.getElementById('chq-form');
    const formSig = form ? [...form.querySelectorAll('*')].map(e=>e.tagName+'#'+(e.id||'')+'['+['name','type','placeholder','aria-label','aria-describedby','required','autocomplete','inputmode','for','aria-live','role'].map(a=>e.getAttribute(a)).filter(x=>x!==null).join('|')+']').join(' ') : null;
    const out = document.getElementById('chq-out');
    return { t, hero, formSig, outSig: out? out.outerHTML.replace(/class="[^"]*"/g,'').replace(/\s+/g,' ').slice(0,600):null, h1: [...document.querySelectorAll('h1')].map(h=>h.innerText) };
  });
  await ctx.close();
  return r;
}
const words = s => s.replace(/[ ]/g,' ').split(/\s+/).filter(Boolean);
function diff(a,b){ const m=new Map(); for(const x of b) m.set(x,(m.get(x)||0)+1); const out=[]; for(const x of a){const n=m.get(x)||0; if(n) m.set(x,n-1); else out.push(x);} return out; }
for (const [nom, ruta] of Object.entries(P)) for (const w of [1440,390]) {
  const base = await leer('http://127.0.0.1:8781'+ruta, w);
  for (const d of ['taller','pizarra']) {
    const pr = await leer(`http://127.0.0.1:8780/${d}/${nom}.html`, w);
    const wb=words(base.t), wp=words(pr.t);
    const falt=diff(wb,wp), sob=diff(wp,wb);
    const seqIgual = wb.join(' ')===wp.join(' ');
    const heroIgual = words(base.hero).join(' ')===words(pr.hero).join(' ');
    console.log(d.padEnd(8), nom.padEnd(24), w, `palabras ${wb.length}/${wp.length}`, `faltan ${falt.length} sobran ${sob.length}`, seqIgual?'MISMA SECUENCIA':'secuencia distinta', 'hero', heroIgual?'igual':'DISTINTO', 'form', base.formSig===pr.formSig?'igual':'DISTINTO', 'out', base.outSig===pr.outSig?'igual':'DISTINTO', 'h1', JSON.stringify(pr.h1));
    if (falt.length) console.log('   faltan:', falt.slice(0,30).join(' '));
    if (sob.length) console.log('   sobran:', sob.slice(0,30).join(' '));
    if (!heroIgual) { console.log('   hero base:', words(base.hero).join(' ').slice(0,400)); console.log('   hero prot:', words(pr.hero).join(' ').slice(0,400)); }
    if (base.formSig!==pr.formSig) { console.log('   formB', base.formSig); console.log('   formP', pr.formSig); }
  }
}
await b.close();
