// QA ronda 1 · referentes E10 · mide en el navegador las afirmaciones de cada tarjeta
import { chromium } from '/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs';
import fs from 'node:fs';

const urls = fs.readFileSync(process.argv[2], 'utf8').trim().split('\n').map(l => l.split(' '));
const solo = process.argv[3] ? process.argv[3].split(',') : null;
const out = {};
const nav = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  proxy: { server: process.env.HTTPS_PROXY },
});

async function cerrarCookies(p) {
  for (const t of ['Allow all', 'Accept All', 'Accept all', 'Accept', 'Aceptar', 'Got it', 'Ok', 'OK', 'No thanks']) {
    const b = p.getByRole('button', { name: t, exact: true });
    try { if (await b.first().isVisible({ timeout: 300 })) { await b.first().click({ timeout: 1500 }); return t; } } catch {}
  }
  return null;
}

const medir = () => {
  const vis = el => { const r = el.getBoundingClientRect(); const s = getComputedStyle(el); return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none' && parseFloat(s.opacity) > 0.05; };
  const bgDe = el => { while (el) { const c = getComputedStyle(el).backgroundColor; if (c && c !== 'rgba(0, 0, 0, 0)' && c !== 'transparent') return c; el = el.parentElement; } return 'none'; };
  const textos = [];
  for (const el of document.querySelectorAll('h1,h2,h3,h4,p,a,span,li,div,em,strong,blockquote')) {
    const own = [...el.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent.trim()).join(' ').trim();
    if (own.length < 3 || !vis(el)) continue;
    const r = el.getBoundingClientRect();
    const s = getComputedStyle(el);
    textos.push({ tag: el.tagName, txt: own.slice(0, 60), top: Math.round(r.top + scrollY), left: Math.round(r.left), fam: s.fontFamily.slice(0, 60), size: s.fontSize, w: s.fontWeight, style: s.fontStyle, color: s.color, bg: bgDe(el), tt: s.textTransform });
  }
  const primeros = textos.filter(t => t.top < innerHeight).sort((a, b) => parseFloat(b.size) - parseFloat(a.size)).slice(0, 8);
  const fuentes = [...new Set([...document.fonts].filter(f => f.status === 'loaded').map(f => `${f.family.replace(/"/g, '')} ${f.weight} ${f.style}`))].slice(0, 25);
  return {
    title: document.title,
    htmlBg: getComputedStyle(document.documentElement).backgroundColor,
    bodyBg: getComputedStyle(document.body).backgroundColor,
    bodyColor: getComputedStyle(document.body).color,
    alto: document.documentElement.scrollHeight,
    sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth,
    primeros, fuentes, todos: textos,
  };
};

for (const [n, id, url] of urls) {
  if (solo && !solo.includes(id)) continue;
  out[id] = { n, url };
  for (const [w, h] of [[1440, 900], [390, 844]]) {
    const ctx = await nav.newContext({ viewport: { width: w, height: h }, reducedMotion: id === 'd1-olsonkundig' ? 'reduce' : 'no-preference' });
    const p = await ctx.newPage();
    let status = null;
    try {
      const r = await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
      status = r && r.status();
      await p.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
      await p.waitForTimeout(1500);
      const c = await cerrarCookies(p);
      // recorre la página para disparar las apariciones
      const alto = await p.evaluate(() => document.documentElement.scrollHeight);
      for (let y = 0; y < Math.min(alto, 14000); y += 700) { await p.evaluate(y => scrollTo(0, y), y); await p.waitForTimeout(120); }
      await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(600);
      const m = await p.evaluate(medir);
      out[id][w] = { status, finalUrl: p.url(), cookies: c, ...m, todos: w === 1440 ? m.todos : undefined };
      if (w === 390) out[id][w].izquierdaMin = Math.min(...m.todos.filter(t => t.top < 2500).map(t => t.left));
    } catch (e) { out[id][w] = { status, error: String(e).slice(0, 200) }; }
    await ctx.close();
  }
  console.error('ok', n, id);
}
await nav.close();
fs.writeFileSync(process.argv[4] || 'medicion.json', JSON.stringify(out, null, 1));
