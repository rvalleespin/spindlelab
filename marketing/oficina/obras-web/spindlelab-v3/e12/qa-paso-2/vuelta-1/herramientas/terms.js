const t=document.body.innerText.replace(/\s+/g,' ');
const terms=['SEO técnico','SEO','AEO','GEO','schema','Schema','Core Web Vitals','indexación','Rastreo','datos estructurados','CMS','Decap','Netlify','Cloudflare','API','Supabase','Resend','llms.txt','robots','sitemap','JSON-LD','RIR','deload','Vitest','tsc','build','hosting','dominio','HTTPS','Search Console','share-of-voice','keywords','Paid Media'];
const out={};
for(const k of terms){const i=t.indexOf(k); if(i<0) continue; out[k]=t.slice(Math.max(0,i-60),i+110);}
return out;
