import { chromium } from '/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args:['--no-sandbox'] });
const out=[];
for (const d of ['taller','pizarra']) for (const pg of ['home','acompanamiento-mensual','trabajo']) for (const [w,h] of [[1440,900],[390,844]]) {
  const ctx = await b.newContext({ viewport:{width:w,height:h} });
  const p = await ctx.newPage();
  await p.goto(`http://127.0.0.1:8780/${d}/${pg}.html`, { waitUntil:'networkidle' });
  const H = await p.evaluate(()=>document.documentElement.scrollHeight);
  for (let y=0;y<H;y+=300){ await p.evaluate(y=>scrollTo(0,y),y); await p.waitForTimeout(30); }
  await p.waitForTimeout(600);
  const r = await p.evaluate(()=>{
    const cv=document.createElement('canvas').getContext('2d');
    const rgba=(c)=>{ cv.clearRect(0,0,1,1); cv.fillStyle='#000'; cv.fillStyle=c; cv.fillRect(0,0,1,1); const d=cv.getImageData(0,0,1,1).data; return [d[0],d[1],d[2],d[3]/255]; };
    const parse=(s)=>{ const m=s.match(/rgba?\(([^)]+)\)/); if(!m) return rgba(s); const p=m[1].split(/[ ,\/]+/).filter(Boolean).map(Number); return [p[0],p[1],p[2],p.length>3?p[3]:1]; };
    const lum=([r,g,b])=>{const f=c=>{c/=255;return c<=0.03928?c/12.92:((c+0.055)/1.055)**2.4}; return 0.2126*f(r)+0.7152*f(g)+0.0722*f(b);};
    const cr=(a,b)=>{const L1=lum(a),L2=lum(b);return (Math.max(L1,L2)+0.05)/(Math.min(L1,L2)+0.05);};
    const over=(top,bot)=>{const a=top[3]; return [top[0]*a+bot[0]*(1-a),top[1]*a+bot[1]*(1-a),top[2]*a+bot[2]*(1-a),1];};
    const IMGBG={ 'marcador-papel':[255,254,250,1], 'marcador':[244,244,128,1], 'mancha':[236,98,39,1] };
    function fondo(el){
      const capas=[]; let unknown=null;
      for(let e=el;e;e=e.parentElement){
        const cs=getComputedStyle(e);
        const bi=cs.backgroundImage;
        if(bi && bi!=='none'){
          const k=Object.keys(IMGBG).find(k=>bi.includes('/'+k+'.svg'));
          if(k && !e.classList.contains('mk--espera')){ capas.push(IMGBG[k]); break; }
          if(!k && !/cruz\.svg/.test(bi)) unknown=unknown||bi.slice(0,60);
        }
        const c=parse(cs.backgroundColor);
        if(c[3]>0){ capas.push(c); if(c[3]>=1) break; }
      }
      let bg=[255,255,255,1];
      for(let i=capas.length-1;i>=0;i--) bg=over(capas[i],bg);
      return {bg,unknown};
    }
    const res=[]; const tw=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
    while(tw.nextNode()){
      const n=tw.currentNode; if(!n.data.trim()) continue; const el=n.parentElement;
      if(!el.checkVisibility({visibilityProperty:true,opacityProperty:true})) continue;
      const rect=el.getBoundingClientRect(); if(rect.width<2||rect.height<2) continue;
      if(el.closest('.d-sr')) continue;
      const cs=getComputedStyle(el);
      let op=1; for(let e=el;e;e=e.parentElement) op*=parseFloat(getComputedStyle(e).opacity);
      const fg=parse(cs.color); fg[3]*=op;
      const {bg,unknown}=fondo(el);
      const col=over(fg,bg);
      const ratio=cr(col,bg);
      const fs=parseFloat(cs.fontSize), fw=parseInt(cs.fontWeight);
      const big= fs>=24 || (fs>=18.66 && fw>=700);
      res.push({t:n.data.trim().slice(0,40),fs,fw,ratio:Math.round(ratio*100)/100,need:big?3:4.5,fg:cs.color,bg:bg.slice(0,3).map(Math.round).join(','),unknown,cls:el.className&&el.className.baseVal===undefined?el.className.slice(0,40):''});
    }
    return res;
  });
  const fails=r.filter(x=>x.ratio<x.need), unk=r.filter(x=>x.unknown);
  const min=r.reduce((a,x)=>x.ratio<a.ratio?x:a,{ratio:99});
  out.push({d,pg,w,nodos:r.length,fallas:fails.length,min:min.ratio+' '+min.t,unk:unk.length});
  if(fails.length) console.log(d,pg,w,'FALLAS',JSON.stringify(fails.slice(0,8)));
  if(unk.length) console.log(d,pg,w,'sin evaluar (imagen de fondo)',JSON.stringify(unk.slice(0,3).map(x=>[x.t,x.unknown])));
  await ctx.close();
}
console.table(out);
await b.close();
