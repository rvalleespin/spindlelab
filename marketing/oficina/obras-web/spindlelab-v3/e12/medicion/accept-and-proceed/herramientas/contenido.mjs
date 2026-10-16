// Contenido: texto completo del caso medido (incluido lo que esconde «Read More») en orden, con su
// elemento; y, para TODOS los casos del índice /work, la sección «Impact» (Press / Outcome / Metric)
// para contar cuántos casos dan una cifra y cómo. Uso: node contenido.mjs <salida.json>
import { pathToFileURL } from 'node:url';
import { writeFileSync } from 'node:fs';
const { chromium } = await import(pathToFileURL('/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs').href);
const out = process.argv[2];
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
await ctx.route(/player\.vimeo\.com|googletagmanager/, (r) => r.abort());
const page = await ctx.newPage();
const res = { fecha: new Date().toISOString(), casos: [] };

await page.goto('https://acceptandproceed.com/work', { waitUntil: 'load', timeout: 90000 });
await page.waitForTimeout(1500);
const casos = await page.evaluate(() => [...document.querySelectorAll('a.cms-card-link')].map((a) => ({ href: a.href, titulo: a.closest('article, .cms-card, [role=listitem]')?.querySelector('.cms-card-title-text')?.textContent.trim(), bajada: a.closest('article, .cms-card, [role=listitem]')?.querySelector('.headline')?.textContent.trim(), tags: [...(a.closest('article, .cms-card, [role=listitem]')?.querySelectorAll('.tag-text') || [])].map((t) => t.textContent.trim()) })));
res.indice = casos;

const leerCaso = async (url, completo) => {
  await page.goto(url, { waitUntil: 'load', timeout: 90000 });
  await page.waitForTimeout(1200);
  return page.evaluate((completo) => {
    const txt = (e) => (e?.textContent || '').replace(/\s+/g, ' ').trim();
    const impact = [...document.querySelectorAll('.case-study-impact-headline')].map((h) => {
      const box = h.parentElement;
      return { rotulo: txt(h), texto: txt(box).replace(txt(h), '').trim() };
    });
    const r = { url: location.href, h1: txt(document.querySelector('h1')), bajada: txt(document.querySelector('.case-study-title.text-grey')), impact };
    if (completo) {
      const main = document.querySelector('main');
      const bloques = [];
      const walker = document.createTreeWalker(main, NodeFilter.SHOW_TEXT);
      let n; let last = null;
      while ((n = walker.nextNode())) {
        const t = n.textContent.replace(/\s+/g, ' ').trim();
        if (!t || t === '‍') continue;
        const el = n.parentElement;
        if (el.closest('script,style')) continue;
        const cls = (el.className && typeof el.className === 'string') ? el.className : '';
        const tag = el.tagName.toLowerCase();
        const k = tag + '.' + cls;
        if (last && last.k === k && last.el === el.parentElement) { last.t += ' ' + t; continue; }
        last = { k, el: el.parentElement, t, tag, cls, oculto: !!el.closest('.accordion-hidden-details') || getComputedStyle(el).display === 'none' };
        bloques.push(last);
      }
      r.bloques = bloques.map(({ k, el, ...b }) => b);
      r.palabras = (main.textContent.match(/\S+/g) || []).length;
      r.numeros = (main.textContent.match(/[^.\n]{0,80}\d[\d,.]*\s?(%|x|k|m|million|billion|bn)?[^.\n]{0,60}/gi) || []).slice(0, 30);
    }
    return r;
  }, completo);
};
for (const c of casos) {
  try { res.casos.push(await leerCaso(c.href, c.href.includes('ibm-watsonx-orchestrate'))); } catch (e) { res.casos.push({ url: c.href, error: String(e) }); }
}
// Textos de la home, del índice y de estudio (titulares en orden).
for (const u of ['https://acceptandproceed.com/', 'https://acceptandproceed.com/work', 'https://acceptandproceed.com/about', 'https://acceptandproceed.com/contact']) {
  await page.goto(u, { waitUntil: 'load', timeout: 90000 });
  await page.waitForTimeout(1200);
  res[u] = await page.evaluate(() => ({
    titulares: [...document.querySelectorAll('h1,h2,h3,.page-title,.case-study-title,.quote-text,.footer-about-summary p, p.h4, p.h6')].map((h) => ({ tag: h.tagName.toLowerCase(), cls: h.className, t: h.textContent.replace(/\s+/g, ' ').trim() })).filter((x) => x.t),
    parrafos: [...document.querySelectorAll('main p, main li')].map((p) => p.textContent.replace(/\s+/g, ' ').trim()).filter(Boolean).slice(0, 80),
    title: document.title, description: document.querySelector('meta[name=description]')?.content,
  }));
}
writeFileSync(out, JSON.stringify(res, null, 1));
console.log('casos', res.casos.length);
await browser.close();
