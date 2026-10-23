// Javiera, QA de obra E12, vuelta 2. Antislop §A sobre el texto a la vista de las 27 rutas, leído del navegador
// (innerText sin lo que va con aria-hidden ni solo-lector): verbos de folleto (A1), relleno de apertura (A2), «no solo…
// sino» (A4), «¿Listo para…?» y preguntas por página (A5), Title Case en title, h1, h2, h3, botones y menú (A6),
// castellano de España y usted/vos (A7), raya (A8), prueba social (A9). Los artículos van verbatim (tanda 5) y se marcan.
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { QA, RUTAS, servir, lanzar } from './comun.mjs';
const P = {
  'A1 folleto': /\b(impuls\w*|potenci[ao]\w*|transform\w* tu|revoluciona\w*|maximiza\w*|lleva tu negocio|siguiente nivel|soluciones a (tu|su) medida)\b/gi,
  'A2 relleno': /(en un mundo cada vez|hoy más que nunca|la inteligencia artificial está cambiando)/gi,
  'A4 no solo': /\bno solo\b[^.]{0,80}\bsino\b|\bmás que (una|un) \w+, (un|una)\b/gi,
  'A5 listo': /¿\s*(estás |están )?listo/gi,
  'A7 españa': /(?<!\p{L})(os|vosotros|coste|móvil|ordenador|guay)(?!\p{L})/giu,
  'A7 usted/vos': /(?<!\p{L})(usted|ustedes|vos|tenés|podés|querés|sabés)(?!\p{L})/giu,
  'A8 raya': /—/g,
  'A9 prueba social': /(\+\d+ (clientes|proyectos)|\d+ ?% de satisfacción|clientes satisfechos|nuestro equipo de expertos)/gi,
};
const srv = await servir(); const nav = await lanzar(); const R = [];
for (const ruta of RUTAS) {
  const ctx = await nav.newContext({ viewport: { width: 1440, height: 900 } });
  await ctx.addInitScript(() => { try { localStorage.setItem('spindlelab_consent', 'denied'); } catch (e) {} });
  const p = await ctx.newPage(); await p.goto(srv.url + ruta, { waitUntil: 'networkidle' });
  const m = await p.evaluate(() => {
    document.querySelectorAll('[aria-hidden="true"], .solo-lector, .sr-only, script, style, #cookie-banner').forEach((e) => e.remove());
    const texto = document.body.innerText.replace(/\s+/g, ' ');
    // cada nodo de texto de títulos, botones, menú y summary por separado (un h3 con nombre y bajada son dos textos)
    const titulos = [['title', document.title]];
    for (const e of document.querySelectorAll('h1,h2,h3,button,nav a,summary')) {
      const w = document.createTreeWalker(e, NodeFilter.SHOW_TEXT); let n;
      while ((n = w.nextNode())) { const t = n.textContent.replace(/\s+/g, ' ').trim(); if (t) titulos.push([e.tagName.toLowerCase(), t]); }
    }
    return { texto, titulos };
  });
  const hall = {};
  for (const [k, re] of Object.entries(P)) { const v = [...new Set((m.texto.match(re) || []).map((x) => x.toLowerCase()))]; if (v.length) hall[k] = v; }
  // A6: una palabra con mayúscula que no va después de un punto, dos puntos o «·», y que no es nombre propio ni sigla
  const PROPIOS = /^(SEO|IA|AEO|GEO|SII|IVA|ChatGPT|Google|SpindleLab|Praxi|Combeau|Bernardo|LinkedIn|Meta|Instagram|Facebook|Paid|Media|Chile|Santiago|Gemini|Perplexity|Claude|Ramón|Vallejos|Tonela|Ocelo|Sesenta|Doceavo|Verifica|Cumple|Ads|CMS|Astro|Netlify|Cloudflare|Haiku|Sonnet|Antofagasta|Web|Vitals|Core|Search|Console|Analytics|Pixel|Ley|Código|Trabajo|Página|Sitio|Plataforma|Campaña|Esencial|Completo|Básico|Estándar|Crecimiento|Antes|Fintechs?|Decap|GitHub|Next\.js|Supabase|Anthropic|Gmail|Pages|E-E-A-T|JSON-LD|HTTPS?|URL|PDF|API|CL|UTC-3|Bing|Copilot|Schema|OpenAI|Apple|Lighthouse|Cuentas|Inicio)$/;
  const tc = [];
  for (const [tag, s] of m.titulos) {
    const w = s.split(/\s+/);
    for (let i = 1; i < w.length; i++) {
      const pal = w[i].replace(/^[«(¿¡"]+|[»).,:;?!"]+$/g, '');
      if (/^\p{Lu}/u.test(pal) && !PROPIOS.test(pal) && pal !== pal.toUpperCase() && !/[.:·?!]$/.test(w[i - 1]) && w[i - 1] !== '·') { tc.push(`${tag}: «${s.slice(0, 80)}» (${pal})`); break; }
    }
  }
  R.push({ ruta, articulo: /\/blog\/.+\/$/.test(ruta), preguntas: (m.texto.match(/¿/g) || []).length, hallazgos: hall, titleCase: [...new Set(tc)] });
  await ctx.close();
}
await nav.close(); await srv.cerrar();
writeFileSync(join(QA, 'crudos', 'copy-detector.json'), JSON.stringify(R, null, 1));
for (const r of R) console.log(`${r.ruta}${r.articulo ? ' (artículo, verbatim)' : ''} | ¿: ${r.preguntas} | ${JSON.stringify(r.hallazgos)} | A6: ${r.titleCase.length ? r.titleCase.join(' · ') : '0'}`);
