// QA E12 paso 2, vuelta 2 (Javiera, 18-oct-2026). Punto 4 de la corrida y criterios 8, 12 y 13: busca en el texto visible
// (y en alt/aria-label) de las 8 páginas de concepto y de las 10 vistas de A y B:
//  - cifras de resultado: porcentajes, multiplicadores («3x», «×3»), «+N», conteos de clientes/pacientes/casos/usuarios;
//  - testimonios: comillas seguidas de un nombre con raya o coma al pie;
//  - promesas: garantiza, asegura, éxito, gana(mos), 100 %;
//  - IA prohibida: «IA propietaria», «modelo(s) RAG», «despliegue de modelos», «40 %», «+150 %»;
//  - enlaces a praxi.coach.
// No juzga: lista cada aparición con su contexto para revisarla a mano en el acta.
// Uso: node honestidad.mjs <base-del-servidor> <salida.json>
import { pathToFileURL } from 'node:url';
import fs from 'node:fs';
const { chromium } = await import(pathToFileURL('/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs').href);
const [base, salida] = process.argv.slice(2);
const P = 'marketing/portafolio/';
const D = 'marketing/oficina/obras-web/spindlelab-v3/tableros/e12-direcciones/proto/';
const RUTAS = [
  P + '04-tonela/sitio/', P + '04-tonela/sitio/inspeccion/', P + '05-ocelo/sitio/', P + '05-ocelo/sitio/la-evaluacion/',
  P + '06-sesenta/sitio/', P + '06-sesenta/sitio/que-dice-tu-carta/', P + '07-doceavo/sitio/', P + '07-doceavo/sitio/calendario/',
  ...['a', 'b'].flatMap((d) => ['', 'trabajo/', 'trabajo/praxi/', 'trabajo/sesenta/', 'servicios/desarrollo-web/'].map((v) => D + d + '/' + v)),
];
const PATRONES = {
  porcentaje: /[^.\n]{0,50}\d+(?:[.,]\d+)?\s?%[^.\n]{0,40}/g,
  multiplicador: /[^.\n]{0,40}(?:\b\d+\s?[x×]\b(?!\s?\d)|×\s?\d+\b)[^.\n]{0,40}/g,
  masN: /[^.\n]{0,40}\+\s?\d+[^.\n]{0,30}/g,
  conteo: /[^.\n]{0,40}\b\d[\d.]*\s+(?:clientes|pacientes|casos ganados|usuarios|personas atendidas|empresas|leads|visitas|descargas|suscriptores)[^.\n]{0,30}/gi,
  testimonio: /[«“"][^»”"]{20,200}[»”"]\s*(?:—|–|-|,)\s*[A-ZÁÉÍÓÚ][a-záéíóúñ]+(?:\s[A-ZÁÉÍÓÚ][a-záéíóúñ]+)?/g,
  promesa: /[^.\n]{0,50}\b(?:garantiza\w*|asegura\w*|éxito|ganamos|100\s?%)\b[^.\n]{0,50}/gi,
  iaProhibida: /IA propietaria|modelos? RAG|despliegue de modelos|\b40\s?%|\+\s?150\s?%/gi,
};
const nav = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const R = { fecha: new Date().toISOString(), paginas: {} };
for (const r of RUTAS) {
  const ctx = await nav.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  await p.goto(base.replace(/\/$/, '') + '/' + r, { waitUntil: 'load' });
  await p.waitForTimeout(700);
  const { texto, attrs, praxiCoach } = await p.evaluate(() => ({
    texto: document.body.innerText,
    attrs: [...document.querySelectorAll('[alt],[aria-label]')].map((e) => e.getAttribute('alt') || e.getAttribute('aria-label')).join('\n'),
    praxiCoach: [...document.querySelectorAll('a[href]')].map((a) => a.href).filter((h) => /praxi\.coach/.test(h)),
  }));
  const todo = texto + '\n' + attrs;
  const hall = {};
  for (const [k, re] of Object.entries(PATRONES)) {
    const m = [...new Set((todo.match(re) || []).map((s) => s.replace(/\s+/g, ' ').trim()))];
    if (m.length) hall[k] = m;
  }
  R.paginas[r.replace(P, 'portafolio/').replace(D, 'proto/')] = { hallazgos: hall, praxiCoach };
  console.log(r.replace(P, '').replace(D, ''), Object.fromEntries(Object.entries(hall).map(([k, v]) => [k, v.length])), praxiCoach.length ? 'praxi.coach ' + praxiCoach.length : '');
  await ctx.close();
}
fs.writeFileSync(salida, JSON.stringify(R, null, 1));
await nav.close();
