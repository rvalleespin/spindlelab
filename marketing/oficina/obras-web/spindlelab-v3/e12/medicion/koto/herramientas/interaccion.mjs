// E12 · Koto · interacción: cursor propio, hovers de proyectos y enlaces, menú, widgets, índice.
// Uso: node interaccion.mjs <dir-crudo> <dir-capturas>
// Deja <dir-crudo>/interaccion.json y recortes en <dir-capturas>/detalle-*.jpg.
// El mouse se mueve con page.mouse (eventos reales de puntero); el hover se mide comparando
// getComputedStyle del elemento y sus descendientes antes y 700 ms después de entrar.
import fs from 'node:fs';
import path from 'node:path';
import { PAGINAS, abrirNavegador, contexto, cargar, aceptarCookies, recorrer, SEL_FN } from './comun.mjs';

const [dirCrudo, dirCapt] = process.argv.slice(2);
const out = {};
const nav = await abrirNavegador();

const PROPS = ['transform', 'scale', 'translate', 'opacity', 'filter', 'backgroundColor', 'color', 'borderRadius', 'width', 'height', 'clipPath', 'textDecorationLine', 'boxShadow', 'outline', 'top', 'left', 'inset'];
const FOTO = `window.__foto = function (root, max = 80) {
  const els = [root, ...root.querySelectorAll('*')].slice(0, max);
  return els.map(e => { const s = getComputedStyle(e); const o = { sel: window.__sel(e) }; for (const p of ${JSON.stringify(PROPS)}) o[p] = s[p]; const r = e.getBoundingClientRect(); o.rect = [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)]; return o; });
};
window.__dif = function (a, b) {
  const d = [];
  for (let i = 0; i < Math.min(a.length, b.length); i++) {
    for (const k of Object.keys(a[i])) { if (k === 'sel') continue; const x = JSON.stringify(a[i][k]), y = JSON.stringify(b[i][k]); if (x !== y) d.push({ sel: a[i].sel, prop: k, antes: a[i][k], despues: b[i][k] }); }
  }
  return d;
};`;

async function pagina(id, ancho, extra = {}) {
  const ctx = await contexto(nav, ancho, extra);
  await ctx.addInitScript(SEL_FN);
  await ctx.addInitScript(FOTO);
  const p = await ctx.newPage();
  await cargar(p, PAGINAS[id]);
  await aceptarCookies(p);
  return { ctx, p };
}
const recorte = async (p, nombre, x, y, w, h) => {
  const vw = p.viewportSize().width, vh = p.viewportSize().height;
  const cx = Math.max(0, Math.round(x)), cy = Math.max(0, Math.round(y));
  const clip = { x: cx, y: cy, width: Math.min(Math.round(w), vw - cx), height: Math.min(Math.round(h), vh - cy) };
  await p.screenshot({ path: path.join(dirCapt, `detalle-${nombre}.jpg`), type: 'jpeg', quality: 85, clip });
  return `detalle-${nombre}.jpg`;
};
const cursorEstado = (p) => p.evaluate(() => {
  const c = document.querySelector('[data-ref-cursor]'); if (!c) return null;
  const s = getComputedStyle(c); const r = c.getBoundingClientRect(); const caja = c.firstElementChild; const sc = caja ? getComputedStyle(caja) : null;
  return { texto: c.innerText.trim(), display: s.display, opacidad: s.opacity, rect: [r.x, r.y, r.width, r.height].map(v => Math.round(v * 10) / 10), styleInline: c.getAttribute('style'), transicion: s.transition, caja: sc && { fondo: sc.backgroundColor, desenfoque: sc.backdropFilter, radio: sc.borderRadius, padding: sc.padding, color: sc.color, gap: sc.columnGap }, letra: (() => { const t = c.querySelector('span'); if (!t) return null; const ts = getComputedStyle(t); return { familia: ts.fontFamily.split(',')[0], tamano: ts.fontSize, caja: ts.textTransform, interletra: ts.letterSpacing }; })() };
});
const cursorSistema = (p, x, y) => p.evaluate(([x, y]) => { const e = document.elementFromPoint(x, y); return e ? { sel: window.__sel(e), cursor: getComputedStyle(e).cursor } : null; }, [x, y]);

// ---------- HOME 1440: cursor sobre el showreel, seguimiento, proyecto destacado, enlace del nav ----------
{
  const { ctx, p } = await pagina('home', 1440);
  const o = out.home1440 = {};
  o.cursorReposo = await cursorEstado(p);
  // sobre el showreel
  await p.mouse.move(300, 300); await p.waitForTimeout(300);
  await p.mouse.move(720, 420, { steps: 8 }); await p.waitForTimeout(700);
  o.cursorShowreel = await cursorEstado(p);
  o.cursorSistemaShowreel = await cursorSistema(p, 720, 420);
  o.recorteCursorShowreel = await recorte(p, 'cursor-showreel-1440', 720 - 160, 420 - 70, 320, 140);
  // seguimiento: salto de 400 px en un solo evento, muestreo por cuadro
  await p.mouse.move(500, 400); await p.waitForTimeout(800);
  await p.evaluate(() => { window.__seg = []; const c = document.querySelector('[data-ref-cursor]'); const t0 = performance.now(); const f = () => { const r = c.getBoundingClientRect(); window.__seg.push([Math.round(performance.now() - t0), Math.round((r.x + r.width / 2) * 10) / 10, Math.round((r.y + r.height / 2) * 10) / 10, c.style.left, c.style.top]); if (performance.now() - t0 < 1200) requestAnimationFrame(f); }; requestAnimationFrame(f); });
  await p.mouse.move(900, 500);
  await p.waitForTimeout(1400);
  o.seguimiento = { desde: [500, 400], hasta: [900, 500], muestras: await p.evaluate(() => window.__seg) };
  // ¿qué pasa con el texto del cursor en otras zonas? Fuera del showreel (encabezado)
  await p.mouse.move(150, 40, { steps: 5 }); await p.waitForTimeout(600);
  o.cursorSobreNav = await cursorEstado(p);
  // hover de enlace del nav (WORK)
  // el enlace WORK que de verdad se ve arriba (el que está bajo el punto, no el del menú plegado)
  const navLink = await p.evaluate(() => { const a = [...document.querySelectorAll('a[href="/work"]')].find(a => { const r = a.getBoundingClientRect(); if (r.width === 0 || r.top > 120) return false; const e = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2); return e && a.contains(e); }); if (!a) return null; const r = a.getBoundingClientRect(); window.__navA = a; return { x: r.x, y: r.y, w: r.width, h: r.height, sel: window.__sel(a), html: a.outerHTML.replace(/<path[^>]*>/g, '').slice(0, 1400) }; });
  o.navLink = navLink;
  if (navLink) {
    await p.mouse.move(700, 600); await p.waitForTimeout(500);
    const a0 = await p.evaluate(() => window.__foto(window.__navA, 30));
    await recorte(p, 'nav-reposo-1440', 0, 0, 640, 80);
    await p.mouse.move(navLink.x + navLink.w / 2, navLink.y + navLink.h / 2, { steps: 6 });
    await p.waitForTimeout(120);
    const a1 = await p.evaluate(() => window.__foto(window.__navA, 30));
    await p.waitForTimeout(600);
    const a2 = await p.evaluate(() => window.__foto(window.__navA, 30));
    o.navHover = { a120ms: await p.evaluate(([a, b]) => window.__dif(a, b), [a0, a1]), a720ms: await p.evaluate(([a, b]) => window.__dif(a, b), [a0, a2]) };
    o.recorteNavHover = await recorte(p, 'nav-hover-1440', 0, 0, 640, 80);
    o.anims_navHover = await p.evaluate(() => document.getAnimations().filter(a => a.effect && a.effect.target && window.__navA.contains(a.effect.target)).map(a => ({ tipo: a.constructor.name, nombre: a.animationName || a.transitionProperty, dur: a.effect.getTiming().duration, curva: a.effect.getTiming().easing, kf: a.effect.getKeyframes().map(k => ({ o: k.offset, tf: k.transform, e: k.easing })) })));
  }
  // proyecto destacado: bajar hasta la sección «Our work» y pasar el mouse por la primera pieza
  const feat = await p.evaluate(() => { const s = document.querySelector('#section-our-work'); return s ? s.getBoundingClientRect().top + scrollY : null; });
  if (feat !== null) {
    await p.evaluate(y => window.scrollTo({ top: y + 40, behavior: 'instant' }), feat); await p.waitForTimeout(1200);
    const tile = await p.evaluate(() => { const a = [...document.querySelectorAll('#section-our-work a[href*="/projects/"]')].find(a => { const r = a.getBoundingClientRect(); return r.width > 300 && r.top > 0 && r.top < innerHeight - 200; }); if (!a) return null; window.__tile = a; const r = a.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height, href: a.getAttribute('href'), sel: window.__sel(a) }; });
    o.destacado = tile;
    if (tile) {
      await p.mouse.move(60, 600); await p.waitForTimeout(500);
      const t0 = await p.evaluate(() => window.__foto(window.__tile, 60));
      o.destacadoCapas = await p.evaluate(() => [...window.__tile.querySelectorAll('*')].map(e => { const s = getComputedStyle(e); return { sel: window.__sel(e), fondo: s.backgroundColor, opacidad: s.opacity, clase: typeof e.className === 'string' ? e.className.slice(0, 200) : '' }; }).filter(x => x.fondo !== 'rgba(0, 0, 0, 0)' || x.opacidad !== '1'));
      o.recorteDestacadoReposo = await recorte(p, 'destacado-reposo-1440', tile.x - 10, Math.max(0, tile.y - 10), tile.w + 20, Math.min(tile.h + 20, 880));
      await p.mouse.move(tile.x + tile.w / 2, tile.y + Math.min(tile.h, 600) / 2, { steps: 10 }); await p.waitForTimeout(800);
      const t1 = await p.evaluate(() => window.__foto(window.__tile, 60));
      o.destacadoHover = await p.evaluate(([a, b]) => window.__dif(a, b), [t0, t1]);
      o.cursorDestacado = await cursorEstado(p);
      o.cursorSistemaDestacado = await cursorSistema(p, tile.x + tile.w / 2, tile.y + Math.min(tile.h, 600) / 2);
      o.recorteDestacadoHover = await recorte(p, 'destacado-hover-1440', tile.x - 10, Math.max(0, tile.y - 10), tile.w + 20, Math.min(tile.h + 20, 880));
    }
  }
  // widgets («::»)
  await p.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' })); await p.waitForTimeout(800);
  o.controles = await p.evaluate(() => { const c = document.querySelector('[data-ref-header-controls]'); return c && { texto: c.innerText.replace(/\s+/g, ' ').trim(), html: c.outerHTML.replace(/<path[^>]*>/g, '').slice(0, 2500) }; });
  const wbtn = await p.evaluate(() => { const b = [...document.querySelectorAll('[data-ref-header-controls] button')].filter(b => { const r = b.getBoundingClientRect(); return r.width > 0 && r.height > 0; }).pop(); if (!b) return null; const r = b.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2, rect: [r.x, r.y, r.width, r.height].map(Math.round), texto: b.innerText.trim() }; });
  o.botonWidgets = wbtn;
  if (wbtn) {
    await p.mouse.click(wbtn.x, wbtn.y); await p.waitForTimeout(1200);
    o.widgets = await p.evaluate(() => { const w = document.querySelector('#widgets'); if (!w) return null; const r = w.getBoundingClientRect(); return { rect: [r.x, r.y, r.width, r.height].map(Math.round), texto: w.innerText.replace(/\s+/g, ' | ').trim().slice(0, 900) }; });
    await p.screenshot({ path: path.join(dirCapt, 'detalle-widgets-1440.jpg'), type: 'jpeg', quality: 80 });
    o.recorteWidgets = 'detalle-widgets-1440.jpg';
    await p.keyboard.press('Escape'); await p.mouse.click(wbtn.x, wbtn.y).catch(() => {}); await p.waitForTimeout(600);
  }
  o.reloj = await p.evaluate(() => { const t = [...document.querySelectorAll('[data-ref-header-controls] *, header *')].map(e => e.childNodes.length === 1 && e.firstChild.nodeType === 3 ? e.textContent.trim() : '').filter(t => /\d{1,2}:\d{2}/.test(t)); return t.slice(0, 4); });
  await ctx.close();
}

// ---------- TRABAJO 1440: el índice, hover de pieza, filtro ----------
{
  const { ctx, p } = await pagina('trabajo', 1440);
  const o = out.trabajo1440 = {};
  await recorrer(p, { paso: 0.6, espera: 150 });
  o.indice = await p.evaluate(() => {
    const items = [...document.querySelectorAll('#main a[href*="/projects/"]')].filter(a => { const r = a.getBoundingClientRect(); return r.width >= 500; });
    const vistos = new Set();
    return items.filter(a => { const h = a.getAttribute('href'); if (vistos.has(h)) return false; vistos.add(h); return true; }).map((a, i) => {
      const r = a.getBoundingClientRect(); const m = a.querySelector('video, img'); const mr = m ? m.getBoundingClientRect() : null;
      const ts = [...a.querySelectorAll('p, span, h2, h3')].filter(e => e.children.length === 0 && e.innerText.trim()).map(e => e.innerText.trim());
      return { i, href: a.getAttribute('href'), x: Math.round(r.x), y: Math.round(r.y + scrollY), w: Math.round(r.width), h: Math.round(r.height), medio: mr && { tag: m.tagName.toLowerCase(), w: Math.round(mr.width), h: Math.round(mr.height), proporcion: +(mr.width / mr.height).toFixed(3) }, textos: ts.slice(0, 5) };
    });
  });
  const sideb = await p.evaluate(() => { const s = [...document.querySelectorAll('#main *')].find(e => /md:w-sidebar/.test(e.className) && e.getBoundingClientRect().width > 200); if (!s) return null; const r = s.getBoundingClientRect(); const st = getComputedStyle(s); return { sel: window.__sel(s), x: Math.round(r.x), w: Math.round(r.width), posicion: st.position, top: st.top, texto: s.innerText.replace(/\s+/g, ' ').trim().slice(0, 400) }; });
  o.barraLateral = sideb;
  // recorte del índice (primera pantalla) y hover de una pieza
  await p.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' })); await p.waitForTimeout(900);
  await p.mouse.move(100, 800); await p.waitForTimeout(400);
  o.recorteIndice = await recorte(p, 'indice-1440', 0, 0, 1440, 900);
  await p.evaluate(() => window.scrollTo({ top: 300, behavior: 'instant' })); await p.waitForTimeout(900);
  const tile = await p.evaluate(() => { const a = [...document.querySelectorAll('#main a[href*="/projects/"]')].find(a => { const r = a.getBoundingClientRect(); return r.width >= 500 && r.top >= 0 && r.bottom < innerHeight; }); if (!a) return null; window.__tile = a; const r = a.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height, href: a.getAttribute('href'), html: a.outerHTML.replace(/<path[^>]*>/g, '').replace(/srcset="[^"]*"/g, '').slice(0, 2500) }; });
  o.piezaHover = tile;
  if (tile) {
    const t0 = await p.evaluate(() => window.__foto(window.__tile, 60));
    await recorte(p, 'indice-pieza-reposo-1440', tile.x - 8, tile.y - 8, tile.w + 16, tile.h + 16);
    await p.mouse.move(tile.x + tile.w * 0.4, tile.y + tile.h * 0.4, { steps: 10 });
    await p.waitForTimeout(130);
    const tA = await p.evaluate(() => window.__foto(window.__tile, 60));
    o.animsPieza130 = await p.evaluate(() => document.getAnimations().filter(a => a.effect && a.effect.target && window.__tile.contains(a.effect.target)).map(a => ({ tipo: a.constructor.name, nombre: a.animationName || a.transitionProperty, dur: a.effect.getTiming().duration, retardo: a.effect.getTiming().delay, curva: a.effect.getTiming().easing, sel: window.__sel(a.effect.target) })));
    await p.waitForTimeout(700);
    const t1 = await p.evaluate(() => window.__foto(window.__tile, 60));
    o.piezaDif130 = await p.evaluate(([a, b]) => window.__dif(a, b), [t0, tA]);
    o.piezaDif830 = await p.evaluate(([a, b]) => window.__dif(a, b), [t0, t1]);
    o.cursorPieza = await cursorEstado(p);
    o.cursorSistemaPieza = await cursorSistema(p, tile.x + tile.w * 0.4, tile.y + tile.h * 0.4);
    o.recortePiezaHover = await recorte(p, 'indice-pieza-hover-1440', tile.x - 8, tile.y - 8, tile.w + 16, tile.h + 16);
    o.recorteCursorPieza = await recorte(p, 'cursor-pieza-1440', tile.x + tile.w * 0.4 - 140, tile.y + tile.h * 0.4 - 60, 280, 120);
  }
  // filtro: el botón «Filter»
  const fbtn = await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(b => /^filter/i.test(b.innerText.trim()) && b.getBoundingClientRect().width > 0); if (!b) return null; const r = b.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2, rect: [r.x, r.y, r.width, r.height].map(Math.round) }; });
  o.botonFiltro = fbtn;
  if (fbtn) {
    await p.mouse.click(fbtn.x, fbtn.y); await p.waitForTimeout(1300);
    o.filtroAbierto = await p.evaluate(() => { const t = [...document.querySelectorAll('body *')].find(e => e.innerText && e.innerText.trim().startsWith('I’m curious about') && e.getBoundingClientRect().width > 200); if (!t) return null; const r = t.getBoundingClientRect(); return { rect: [r.x, r.y, r.width, r.height].map(Math.round), texto: t.innerText.replace(/\s+/g, ' | ').slice(0, 900) }; });
    await p.screenshot({ path: path.join(dirCapt, 'detalle-filtro-1440.jpg'), type: 'jpeg', quality: 80 });
    o.recorteFiltro = 'detalle-filtro-1440.jpg';
  }
  await ctx.close();
}

// ---------- CASO 1440: la barra del encabezado se abre (menú) ----------
{
  const { ctx, p } = await pagina('caso', 1440);
  const o = out.caso1440 = {};
  const barra = await p.evaluate(() => { const b = document.querySelector('[data-ref-header-bar]'); const r = b.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height, texto: b.innerText.replace(/\s+/g, ' ').trim() }; });
  o.barra = barra;
  o.recorteBarra = await recorte(p, 'encabezado-caso-reposo-1440', 0, 0, 720, 90);
  await p.mouse.move(barra.x + barra.w / 2, barra.y + barra.h / 2, { steps: 6 }); await p.waitForTimeout(900);
  o.barraHover = await p.evaluate(() => { const b = document.querySelector('[data-ref-header-bar]'); const r = b.getBoundingClientRect(); const m = document.querySelector('[data-ref-header-bar-menu-desktop]'); const mr = m && m.getBoundingClientRect(); return { rect: [r.x, r.y, r.width, r.height].map(Math.round), menuAlto: mr && Math.round(mr.height), texto: b.innerText.replace(/\s+/g, ' ').trim().slice(0, 300) }; });
  o.recorteBarraHover = await recorte(p, 'encabezado-caso-hover-1440', 0, 0, 720, 520);
  const boton = await p.evaluate(() => { const b = [...document.querySelectorAll('[data-ref-header-bar] button')].find(b => /toggle menu/i.test(b.innerText)); if (!b) return null; const r = b.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2, w: r.width }; });
  if (boton && boton.w > 0) {
    await p.mouse.click(boton.x, boton.y);
    await p.waitForTimeout(100);
    o.animsMenu = await p.evaluate(() => document.getAnimations().map(a => ({ tipo: a.constructor.name, nombre: a.animationName || a.transitionProperty, dur: a.effect.getTiming().duration, retardo: a.effect.getTiming().delay, curva: a.effect.getTiming().easing, sel: a.effect.target ? window.__sel(a.effect.target) : null })).filter(a => a.nombre !== 'play-record'));
    await p.waitForTimeout(1200);
    o.menuAbierto = await p.evaluate(() => { const m = document.querySelector('[data-ref-header-bar-menu-desktop]'); const r = m && m.getBoundingClientRect(); return m && { rect: [r.x, r.y, r.width, r.height].map(Math.round), texto: m.innerText.replace(/\s+/g, ' | ').trim().slice(0, 500) }; });
    await p.screenshot({ path: path.join(dirCapt, 'detalle-menu-caso-1440.jpg'), type: 'jpeg', quality: 80 });
    o.recorteMenu = 'detalle-menu-caso-1440.jpg';
  }
  // la barra lateral del caso
  o.barraLateral = await p.evaluate(() => { const s = [...document.querySelectorAll('#main *')].find(e => typeof e.className === 'string' && /md:w-sidebar/.test(e.className) && e.getBoundingClientRect().width > 200); if (!s) return null; const r = s.getBoundingClientRect(); const st = getComputedStyle(s); return { sel: window.__sel(s), x: Math.round(r.x), w: Math.round(r.width), posicion: st.position, top: st.top, texto: s.innerText.replace(/\s+/g, ' | ').trim().slice(0, 500) }; });
  await ctx.close();
}

// ---------- 390: menú (en la página de estudio: en la home, el toque caía en el showreel) ----------
{
  const { ctx, p } = await pagina('estudio', 390);
  const o = out.estudio390 = {};
  const b = await p.evaluate(() => { const b = [...document.querySelectorAll('[data-ref-header-controls] button')].find(b => b.innerText.trim().toLowerCase() === 'menu' && b.getBoundingClientRect().width > 0); if (!b) return null; const r = b.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2, rect: [r.x, r.y, r.width, r.height].map(Math.round) }; });
  o.botonMenu = b;
  if (b) {
    await p.touchscreen.tap(b.x, b.y);
    await p.waitForTimeout(120);
    o.animsMenu = await p.evaluate(() => document.getAnimations().map(a => ({ tipo: a.constructor.name, nombre: a.animationName || a.transitionProperty, dur: a.effect.getTiming().duration, retardo: a.effect.getTiming().delay, curva: a.effect.getTiming().easing, sel: a.effect.target ? window.__sel(a.effect.target) : null })).filter(a => !['play-record', 'underline-link-out-transform'].includes(a.nombre)));
    await p.waitForTimeout(1500);
    o.menu = await p.evaluate(() => { const m = document.querySelector('#menu-overlay'); const vis = [...document.querySelectorAll('a, p, span')].filter(e => { const r = e.getBoundingClientRect(); const s = getComputedStyle(e); return r.width > 0 && r.left >= 0 && r.top >= 0 && r.top < innerHeight && e.children.length === 0 && (e.innerText || '').trim() && parseFloat(s.opacity) > 0.1 && !e.closest('main'); }).map(e => { const s = getComputedStyle(e); const r = e.getBoundingClientRect(); return { t: e.innerText.trim().slice(0, 40), tamano: s.fontSize, familia: s.fontFamily.split(',')[0], color: s.color, y: Math.round(r.y) }; }); return { overlay: m && { fondo: getComputedStyle(m).backgroundColor, desenfoque: getComputedStyle(m).backdropFilter }, textos: vis.slice(0, 24) }; });
    await p.screenshot({ path: path.join(dirCapt, 'detalle-menu-390.jpg'), type: 'jpeg', quality: 80 });
    o.recorteMenu = 'detalle-menu-390.jpg';
  }
  await ctx.close();
}

await nav.close();
fs.writeFileSync(path.join(dirCrudo, 'interaccion.json'), JSON.stringify(out, null, 1));
console.log('ok interaccion', Object.keys(out));
