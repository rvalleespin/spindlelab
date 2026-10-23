// E12 · spec sobre A · las decisiones de los defectos 2, 3 y 4 del acta de la obra (vuelta 1), renderizadas en los ocho
// tamaños de la obra sobre el build, con el aviso de cookies abierto (primera visita) y movimiento reducido: la home
// (el chequeo antes de la entradilla bajo 834; el aviso en una fila desde 834), Tonela y Doceavo («Concepto» en la
// barra, la barra sobre el aviso) y Auditoría SEO técnica sin franja. Lo inyectado es PROPUESTA_CSS de
// obra-v1-defectos.mjs y los mismos cambios del DOM. Una hoja por página: los ocho tamaños, de 360 a 1920, a 420 px de alto.
// Lucía, 23-oct-2026. Uso: node obra-v1-ocho-anchos.mjs <carpeta de salida>
import { readFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ANCHOS, servir, lanzar } from '../../qa-obra/vuelta-1/herramientas/comun.mjs';

const sal = process.argv[2]; mkdirSync(sal, { recursive: true });
const AQUI = dirname(fileURLToPath(import.meta.url));
const CSS = readFileSync(join(AQUI, 'obra-v1-defectos.mjs'), 'utf8').split('export const PROPUESTA_CSS = `')[1].split('`;')[0];
const srv = await servir(); const nav = await lanzar();
const RUTAS = { home: '/v3/', tonela: '/v3/trabajo/tonela/', doceavo: '/v3/trabajo/doceavo/', auditoria: '/v3/servicios/auditoria-seo-tecnica/' };
for (const [n, ruta] of Object.entries(RUTAS)) {
  const tiros = [];
  for (const [w, h] of Object.entries(ANCHOS).map(([a, b]) => [+a, b])) {
    const t = w < 834;
    const ctx = await nav.newContext({ viewport: { width: w, height: h }, hasTouch: t, isMobile: t, reducedMotion: 'reduce' });
    const p = await ctx.newPage(); await p.goto(srv.url + ruta, { waitUntil: 'networkidle' });
    await p.addStyleTag({ content: CSS });
    await p.evaluate(() => {
      document.querySelector('figure.franja')?.remove();                       // §2.4: Auditoría sin franja
      const nombre = document.querySelector('.barra summary > .rotulo');        // §2.3: «Concepto» en la barra
      const tipo = [...document.querySelectorAll('.lateral__ficha .rotulo')].map((e) => e.textContent.trim().split(' · ')[0])[0];
      if (nombre && tipo === 'Concepto') {
        const a = document.createElement('span'); a.className = 'rotulo'; a.setAttribute('aria-hidden', 'true'); a.textContent = '·';
        const b = document.createElement('span'); b.className = 'rotulo barra__tipo'; b.textContent = tipo; nombre.after(a, b);
      }
      const barra = document.querySelector('.a-body .barra'); const aviso = document.getElementById('cookie-banner');   // §2.3: sobre el aviso
      if (barra && aviso && getComputedStyle(aviso).display !== 'none') barra.style.bottom = `${aviso.getBoundingClientRect().height + 8}px`;
    });
    await p.waitForTimeout(400);
    tiros.push({ w, h, b64: (await p.screenshot()).toString('base64') });
    await ctx.close();
  }
  const H = 420;
  const ctx = await nav.newContext({ viewport: { width: 400, height: H } });
  const p = await ctx.newPage();
  await p.setContent(`<body style="margin:0;background:#c00;display:flex;gap:8px;width:max-content">${tiros.map((x) => `<img style="height:${H}px;width:${Math.round(x.w * H / x.h)}px" src="data:image/png;base64,${x.b64}">`).join('')}</body>`);
  await p.screenshot({ path: join(sal, `obra-v1-ocho-anchos-${n}.jpg`), type: 'jpeg', quality: 78, fullPage: true });
  await ctx.close();
  console.log('ok', n);
}
await nav.close(); await srv.cerrar();
