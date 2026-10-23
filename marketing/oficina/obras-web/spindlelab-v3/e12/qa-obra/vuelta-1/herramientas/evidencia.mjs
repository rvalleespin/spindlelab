// Javiera, QA de obra E12, vuelta 1. Dos capturas de evidencia que las otras herramientas no sacan:
//   · la home a 768, sección «Cada pieza, con un dato medido», con la caja de cada párrafo marcada (spec §1.3: 493 px);
//   · el pie a 390 (táctil) con el área del logo y la del correo marcadas (spec §4.3), donde se pisan.
// Uso: node evidencia.mjs
import { join } from 'node:path';
import { QA, servir, lanzar } from './comun.mjs';
const srv = await servir(); const nav = await lanzar();
{
  const ctx = await nav.newContext({ viewport: { width: 768, height: 1024 }, hasTouch: true, isMobile: true, reducedMotion: 'reduce' });
  await ctx.addInitScript(() => { try { localStorage.setItem('spindlelab_consent', 'denied'); } catch (e) {} });
  const p = await ctx.newPage(); await p.goto(srv.url + '/v3/', { waitUntil: 'networkidle' });
  const caja = await p.evaluate(() => {
    const ps = [...document.querySelectorAll('main p.cuerpo')].filter((e) => /Él sube sus fotos|En Praxi la IA conversa/.test(e.textContent));
    for (const e of ps) e.style.outline = '1px dashed #ff3b30';
    const s = ps[0].closest('section'); s.scrollIntoView(); const r = s.getBoundingClientRect();
    return { x: 0, y: r.top + scrollY, width: innerWidth, height: Math.min(r.height, 1400) };
  });
  await p.screenshot({ path: join(QA, 'capturas', 'd5-home-768-cuerpo-736.jpg'), type: 'jpeg', quality: 70, fullPage: true, clip: caja });
  await ctx.close();
}
{
  const ctx = await nav.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, deviceScaleFactor: 2 });
  await ctx.addInitScript(() => { try { localStorage.setItem('spindlelab_consent', 'denied'); } catch (e) {} });
  const p = await ctx.newPage(); await p.goto(srv.url + '/v3/', { waitUntil: 'networkidle' });
  const caja = await p.evaluate(() => {
    const pie = document.querySelector('.pie-sitio'); const logo = pie.querySelector('a'); const correo = pie.querySelector('.pie-sitio__correo');
    logo.style.outline = '1px solid #ff3b30'; correo.style.outline = '1px dashed #30d0ff';
    pie.scrollIntoView({ block: 'end' }); const r = pie.getBoundingClientRect();
    return { x: 0, y: r.top + scrollY - 20, width: innerWidth, height: r.height + 40 };
  });
  await p.screenshot({ path: join(QA, 'capturas', 'd7-pie-390-logo-correo.png'), fullPage: true, clip: caja });
  await ctx.close();
}
await nav.close(); await srv.cerrar();
