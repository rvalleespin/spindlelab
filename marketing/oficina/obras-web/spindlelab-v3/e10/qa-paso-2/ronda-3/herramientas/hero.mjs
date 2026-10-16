// Ronda 2 · hero y chequeo: atributos del formulario idénticos al build, orden (chequeo → titular → obras),
// el botón no tapa el campo; cinta (velocidad, pausa, movimiento reducido); techos del marcador; espacios de foto.
import { chromium } from '/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const form = () => [...document.querySelectorAll('[id^="chq-"], form [name], form input, form button')].map(e => [e.tagName, ...['id','name','type','placeholder','aria-describedby','aria-label','for','autocomplete','inputmode','required','novalidate','data-contacto','action','method'].map(a => e.getAttribute(a))].join('|'));
const out = {};
for (const w of [1440, 390]) {
  for (const [n, url] of [['dist', 'http://127.0.0.1:8781/v3/'], ['taller', 'http://127.0.0.1:8780/taller/home.html'], ['pizarra', 'http://127.0.0.1:8780/pizarra/home.html']]) {
    const p = await (await b.newContext({ viewport: { width: w, height: w === 390 ? 844 : 900 } })).newPage();
    await p.goto(url, { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready);
    const r = await p.evaluate((f) => {
      const F = eval(f); const y = (s) => { const e = document.querySelector(s); return e ? Math.round(e.getBoundingClientRect().top + scrollY) : null; };
      const campo = document.querySelector('#chq-dominio').getBoundingClientRect(), btn = document.querySelector('#chq-btn').getBoundingClientRect();
      const solapa = !(btn.left >= campo.right || btn.right <= campo.left || btn.top >= campo.bottom || btn.bottom <= campo.top);
      const enCampo = document.elementFromPoint(campo.right - 6, campo.top + campo.height / 2);
      return { form: F(), yForm: y('#chq-form'), yH1: y('h1'), yObras: y('img[src*="obra/"]'), campo: [Math.round(campo.left), Math.round(campo.right)], btn: [Math.round(btn.left), Math.round(btn.right)], botonDentroDelCampo: solapa, bordeDerechoDelCampoEs: enCampo?.id || enCampo?.tagName };
    }, `(${form})`);
    out[`${n}-${w}`] = r;
    console.log(n, w, 'form', r.yForm, 'h1', r.yH1, 'obras', r.yObras, 'campo', r.campo, 'btn', r.btn, 'solapa', r.botonDentroDelCampo, r.bordeDerechoDelCampoEs);
  }
  const base = JSON.stringify(out[`dist-${w}`].form);
  console.log(w, 'atributos del chequeo iguales al build: taller', JSON.stringify(out[`taller-${w}`].form) === base, '· pizarra', JSON.stringify(out[`pizarra-${w}`].form) === base, '·', out[`dist-${w}`].form.length, 'nodos');
}
await b.close();
