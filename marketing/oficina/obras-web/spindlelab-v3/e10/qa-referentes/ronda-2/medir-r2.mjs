// QA ronda 2 · referentes E10 · mide lo que cambió en las tarjetas 10, 11 y 12 (y la URL de 8)
// Uso: node medir-r2.mjs <carpeta-salida>
import { chromium } from '/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs';
import fs from 'node:fs';

const OUT = process.argv[2];
const UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36';
const nav = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  proxy: { server: process.env.HTTPS_PROXY },
});
const res = {};

async function abrir(url, { reduced = false, w = 1440, h = 900 } = {}) {
  const ctx = await nav.newContext({ viewport: { width: w, height: h }, userAgent: UA, reducedMotion: reduced ? 'reduce' : 'no-preference' });
  const p = await ctx.newPage();
  const r = await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await p.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
  await p.waitForTimeout(2000);
  for (const t of ['Accept All', 'Allow all', 'No thanks', 'Ok']) {
    const b = p.getByRole('button', { name: t, exact: true });
    try { if (await b.first().isVisible({ timeout: 300 })) { await b.first().click({ timeout: 1500 }); break; } } catch {}
  }
  const alto = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < Math.min(alto, 16000); y += 450) { await p.evaluate(v => scrollTo(0, v), y); await p.waitForTimeout(250); }
  await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(500);
  return { ctx, p, status: r && r.status(), final: p.url() };
}

// 12 · Hoare: titular y usos del dorado en texto
{
  const { ctx, p, status } = await abrir('https://www.hoaresbank.co.uk');
  res.hoare = { status, ...(await p.evaluate(() => {
    const vis = el => { const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
    const out = { titular: null, dorados: [] };
    const h = [...document.querySelectorAll('h1,h2')].filter(vis).sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top)[0];
    if (h) { const s = getComputedStyle(h); out.titular = { txt: h.textContent.trim().slice(0, 60), fam: s.fontFamily, size: s.fontSize, w: s.fontWeight, tt: s.textTransform }; }
    for (const el of document.querySelectorAll('*')) {
      const own = [...el.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent.trim()).join(' ').trim();
      if (own.length < 2 || !vis(el)) continue;
      const m = getComputedStyle(el).color.match(/\d+/g).map(Number);
      const [r, g, b] = m; // dorado: r > g > b, saturado, no gris
      if (r > 110 && r - b > 50 && g - b > 25 && r - g < 60) out.dorados.push({ txt: own.slice(0, 40), color: getComputedStyle(el).color, top: Math.round(el.getBoundingClientRect().top + scrollY) });
    }
    return out;
  })) };
  await ctx.close();
}

// 10 · Selendy Gay: acento de color, imágenes del cuerpo, fondos de sección
{
  const { ctx, p, status } = await abrir('https://www.selendygay.com');
  res.selendy = { status, ...(await p.evaluate(() => {
    const vis = el => { const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
    const acentos = {};
    for (const el of document.querySelectorAll('a,span,button,svg,path')) {
      if (!vis(el)) continue;
      const s = getComputedStyle(el);
      for (const c of [s.color, s.backgroundColor, s.fill, s.stroke]) {
        const m = (c || '').match(/\d+(\.\d+)?/g); if (!m) continue;
        const [r, g, b] = m.map(Number);
        if (r > 180 && r - g > 80 && r - b > 60) acentos[c] = (acentos[c] || 0) + 1;
      }
    }
    const imgs = [...document.querySelectorAll('img')].filter(vis).map(i => ({ src: i.currentSrc.split('/').pop().slice(0, 60), alt: (i.alt || '').slice(0, 40), w: Math.round(i.getBoundingClientRect().width), top: Math.round(i.getBoundingClientRect().top + scrollY) })).filter(i => i.w > 150);
    const fondos = {};
    for (const el of document.querySelectorAll('section,div,main,footer')) {
      const r = el.getBoundingClientRect(); if (r.width < 1200 || r.height < 200) continue;
      const c = getComputedStyle(el).backgroundColor; if (c === 'rgba(0, 0, 0, 0)') continue;
      fondos[c] = (fondos[c] || 0) + Math.round(r.height);
    }
    return { acentos, imgs, fondos, alto: document.documentElement.scrollHeight };
  })) };
  await ctx.close();
}

// 11 · Olson Kundig: las frases del relato, su letra y el fondo pardo
{
  const { ctx, p, status } = await abrir('https://olsonkundig.com', { reduced: true });
  res.olson = { status, ...(await p.evaluate(() => {
    const vis = el => { const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
    const frases = [];
    for (const el of document.querySelectorAll('h1,h2,h3,p,div')) {
      if (!vis(el)) continue;
      const s = getComputedStyle(el);
      if (parseFloat(s.fontSize) < 36) continue;
      const own = [...el.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent.trim()).join(' ').trim();
      if (own.length < 10) continue;
      const a = el.querySelector('a');
      frases.push({ txt: el.textContent.trim().replace(/\s+/g, ' ').slice(0, 120), fam: s.fontFamily.slice(0, 30), size: s.fontSize, w: s.fontWeight, enlace: a ? a.textContent.trim() : null });
    }
    const fondos = {};
    for (const el of [document.documentElement, document.body, ...document.querySelectorAll('section,div,main,footer')]) {
      const r = el.getBoundingClientRect(); if (r.width < 1200) continue;
      const c = getComputedStyle(el).backgroundColor; if (c === 'rgba(0, 0, 0, 0)') continue;
      fondos[c] = Math.max(fondos[c] || 0, Math.round(r.height));
    }
    return { frases, fondos, alto: document.documentElement.scrollHeight };
  })) };
  await ctx.close();
}

// 3 · Priya Parker: la barra naranja y su botón de cierre
{
  const { ctx, p, status } = await abrir('https://www.priyaparker.com');
  res.priya = { status, ...(await p.evaluate(() => {
    const bar = [...document.querySelectorAll('div,section,aside')].find(el => /out now/i.test(el.textContent) && el.getBoundingClientRect().top < 5 && el.getBoundingClientRect().height < 120 && el.getBoundingClientRect().height > 20);
    if (!bar) return { barra: 'no está' };
    const close = bar.querySelector('button, [aria-label*="lose" i], .sqs-announcement-bar-close');
    return { barra: getComputedStyle(bar).backgroundColor, alto: Math.round(bar.getBoundingClientRect().height), cierre: close ? (close.getAttribute('aria-label') || close.className || close.tagName) : 'sin botón' };
  })) };
  // ¿se cierra limpio con su ×?
  const x = p.locator('.sqs-announcement-bar-close, button[aria-label*="lose" i]').first();
  try { await x.click({ timeout: 3000 }); await p.waitForTimeout(800); res.priya.trasCierre = await p.evaluate(() => [...document.querySelectorAll('div')].some(el => /out now/i.test(el.textContent) && el.getBoundingClientRect().top < 5 && el.getBoundingClientRect().height > 20 && el.getBoundingClientRect().height < 120) ? 'sigue visible' : 'cerrada'); await p.screenshot({ path: `${OUT}/priya-sin-barra-1440.jpg`, type: 'jpeg', quality: 70 }); } catch (e) { res.priya.trasCierre = 'no se pudo: ' + e.message.slice(0, 80); }
  await ctx.close();
}

fs.writeFileSync(`${OUT}/medicion-r2.json`, JSON.stringify(res, null, 1));
console.log(JSON.stringify(res, null, 1).slice(0, 9000));
await nav.close();
