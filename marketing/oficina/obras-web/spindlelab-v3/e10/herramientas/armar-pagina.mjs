// Arma referentes.html (página privada con db) desde referentes.json.
// Uso: node armar-pagina.mjs <carpeta-referentes>
import { readFileSync, writeFileSync } from 'node:fs';
const dir = process.argv[2];
const data = JSON.parse(readFileSync(dir + '/referentes.json', 'utf8'));
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const total = data.lineas.reduce((a, l) => a + l.referentes.length, 0);
const fechaLarga = (() => { const [y, m, d] = data.fecha.split('-').map(Number); const meses = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']; return `${d}-${meses[m - 1]}-${y}`; })();
const TIPO = { 'servicios-b2b': 'servicios B2B', 'independiente': 'independiente', 'estudio': 'estudio', 'producto': 'producto', 'otro': 'otro' };
const host = (u) => { try { return new URL(u).host.replace(/^www\./, ''); } catch { return u; } };

const tarjeta = (r) => `
<article class="ref" id="r${r.n}" data-id="${esc(r.id)}">
  <header class="ref__cab">
    <span class="ref__n">${r.n}</span>
    <div class="ref__nom">
      <h3>${esc(r.nombre)}</h3>
      <p class="ref__meta"><a href="${esc(r.url)}" target="_blank" rel="noopener">${esc(host(r.url))}</a> · ${esc(TIPO[r.tipo] || r.tipo)}</p>
    </div>
  </header>
  <div class="ref__vistas">
    <figure class="ref__d"><a href="${esc(r.img1440)}" target="_blank" rel="noopener" aria-label="Ampliar la captura de escritorio de ${esc(r.nombre)}"><img src="${esc(r.img1440)}" alt="${esc(r.nombre)} en escritorio, primera pantalla" loading="lazy" width="1440" height="900"></a><figcaption>Escritorio · toca para ampliar</figcaption></figure>
    <figure class="ref__m"><a href="${esc(r.img390)}" target="_blank" rel="noopener" aria-label="Ampliar la captura de teléfono de ${esc(r.nombre)}"><img src="${esc(r.img390)}" alt="${esc(r.nombre)} en teléfono, primera pantalla" loading="lazy" width="780" height="1688"></a><figcaption>Teléfono</figcaption></figure>
  </div>
  <details class="ref__completa"><summary>Ver la página completa</summary><img src="${esc(r.imgCompleta)}" alt="${esc(r.nombre)}, página completa reducida" loading="lazy"></details>
  <dl class="ref__notas">
    <div><dt>Qué se toma</dt><dd>${esc(r.que_se_toma)}</dd></div>
    <div><dt>Por qué se siente cálido</dt><dd>${esc(r.por_que_calido)}</dd></div>
  </dl>
  ${r.riesgo ? `<details class="ref__ojo"><summary>Lo que no se toma y los riesgos</summary><p>${esc(r.riesgo)}</p></details>` : ''}
  <div class="ref__voto" role="group" aria-label="Tu marca para el ${r.n}">
    <button type="button" class="v" data-v="si" aria-pressed="false">Sí</button>
    <button type="button" class="v" data-v="no" aria-pressed="false">No</button>
    <label class="ref__com"><span class="sr">Comentario sobre el ${r.n}</span><textarea id="c-${esc(r.id)}" rows="2" placeholder="Comentario (opcional): qué te gusta o qué no"></textarea></label>
    <p class="ref__estado" aria-live="polite"></p>
  </div>
</article>`;

const secciones = data.lineas.map((l) => `
<section class="linea" id="linea-${esc(l.k)}">
  <div class="linea__cab"><p class="linea__k">Línea ${esc(l.k.toUpperCase())}</p><h2>${esc(l.nombre)}</h2><p class="linea__tesis">${esc(l.tesis)}</p>${l.nota ? `<p class="linea__nota">${esc(l.nota)}</p>` : ''}</div>
  ${l.referentes.map(tarjeta).join('\n')}
</section>`).join('\n');

const html = `<title>Referentes del sitio</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&family=Newsreader:opsz,wght@6..72,500&display=swap">
<style>
/* Una mesa de revisión: tarjetas numeradas en columna, la decisión al pie de cada una. */
:root {
  --fondo: #f3f1ec; --hoja: #fbfaf7; --tinta: #1d1b17; --gris: #5f5a51; --filete: #dcd7cc;
  --si: #2f6b3a; --si-fondo: #e3eee2; --no: #8a2f22; --no-fondo: #f3e2dd; --foco: #1d1b17;
  --f-titulo: 'Newsreader', Georgia, serif; --f-texto: 'IBM Plex Sans', system-ui, sans-serif; --f-dato: 'IBM Plex Mono', ui-monospace, monospace;
  --r: 6px;
}
@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) {
  --fondo: #171614; --hoja: #201e1b; --tinta: #efebe3; --gris: #a8a196; --filete: #36322c;
  --si: #8fc79a; --si-fondo: #22352a; --no: #e4998c; --no-fondo: #3d2520; --foco: #efebe3; color-scheme: dark; } }
:root[data-theme="dark"] {
  --fondo: #171614; --hoja: #201e1b; --tinta: #efebe3; --gris: #a8a196; --filete: #36322c;
  --si: #8fc79a; --si-fondo: #22352a; --no: #e4998c; --no-fondo: #3d2520; --foco: #efebe3; color-scheme: dark; }
* { box-sizing: border-box; }
body { margin: 0; background: var(--fondo); color: var(--tinta); font: 400 16px/1.55 var(--f-texto); }
img { max-width: 100%; height: auto; display: block; }
a { color: inherit; }
.envoltorio { max-width: 980px; margin: 0 auto; padding-block: 36px 96px; padding-left: max(16px, env(safe-area-inset-left, 0px)); padding-right: max(16px, env(safe-area-inset-right, 0px)); }
h1, h2, h3 { font-family: var(--f-titulo); font-weight: 500; margin: 0; text-wrap: balance; letter-spacing: -0.01em; }
h1 { font-size: clamp(2rem, 5vw, 3rem); line-height: 1.08; }
h2 { font-size: clamp(1.5rem, 3.4vw, 2rem); line-height: 1.15; }
h3 { font-size: 1.35rem; line-height: 1.2; }
p { margin: 0; }
.dato { font-family: var(--f-dato); font-size: 0.8125rem; color: var(--gris); }
.cab { display: grid; gap: 14px; padding-bottom: 28px; border-bottom: 1px solid var(--filete); }
.cab ol { margin: 0; padding-left: 20px; display: grid; gap: 4px; max-width: 64ch; }
.cuenta { display: flex; flex-wrap: wrap; gap: 8px 18px; font-family: var(--f-dato); font-size: 0.875rem; }
.cuenta b { font-weight: 500; }
.aviso { padding: 12px 14px; border: 1px solid var(--filete); border-radius: var(--r); background: var(--hoja); max-width: 64ch; }
.indice { display: flex; flex-wrap: wrap; gap: 8px; margin: 0; padding: 0; list-style: none; }
.indice a { display: inline-block; padding: 6px 10px; border: 1px solid var(--filete); border-radius: var(--r); text-decoration: none; font-size: 0.875rem; background: var(--hoja); }
.linea { padding-top: 56px; display: grid; gap: 22px; }
.linea__cab { display: grid; gap: 6px; max-width: 64ch; }
.linea__k { font-family: var(--f-dato); font-size: 0.8125rem; color: var(--gris); text-transform: uppercase; letter-spacing: 0.08em; }
.linea__tesis { color: var(--gris); }
.linea__nota { max-width: 64ch; margin-top: 8px; font-size: 0.9375rem; }
.ref { background: var(--hoja); border: 1px solid var(--filete); border-radius: var(--r); padding: 18px; display: grid; gap: 14px; scroll-margin-top: 12px; }
.ref[data-voto="si"] { border-color: var(--si); }
.ref[data-voto="no"] { border-color: var(--no); }
.ref__cab { display: grid; grid-template-columns: auto minmax(0, 1fr); gap: 14px; align-items: baseline; }
.ref__n { font-family: var(--f-dato); font-size: 1.5rem; font-variant-numeric: tabular-nums; color: var(--gris); min-width: 2ch; }
.ref__meta { font-family: var(--f-dato); font-size: 0.8125rem; color: var(--gris); overflow-wrap: anywhere; }
.ref__vistas { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 0.28fr); gap: 12px; align-items: start; }
.ref__vistas figure { margin: 0; display: grid; gap: 6px; }
.ref__vistas figure a { display: block; border: 1px solid var(--filete); border-radius: 4px; overflow: hidden; background: var(--fondo); }
.ref__vistas figcaption { font-family: var(--f-dato); font-size: 0.75rem; color: var(--gris); }
.ref__com textarea::placeholder { color: var(--gris); opacity: 1; }
.ref__completa summary, .ref__ojo summary { cursor: pointer; font-size: 0.9375rem; color: var(--gris); }
.ref__ojo p { margin-top: 8px; max-width: 64ch; color: var(--gris); font-size: 0.9375rem; }
.ref__completa img { margin-top: 10px; max-width: 480px; width: 100%; border: 1px solid var(--filete); border-radius: 4px; }
.ref__notas { margin: 0; display: grid; gap: 8px; }
.ref__notas div { display: grid; grid-template-columns: 11rem minmax(0, 1fr); gap: 12px; }
.ref__notas dt { font-size: 0.875rem; color: var(--gris); }
.ref__notas dd { margin: 0; max-width: 64ch; }
.ref__voto { display: grid; grid-template-columns: auto auto minmax(0, 1fr); gap: 10px; align-items: start; padding-top: 12px; border-top: 1px solid var(--filete); }
.v { font: 500 1rem var(--f-texto); padding: 10px 20px; border-radius: var(--r); border: 1px solid var(--filete); background: transparent; color: var(--tinta); cursor: pointer; min-height: 44px; }
.v[data-v="si"][aria-pressed="true"] { background: var(--si-fondo); border-color: var(--si); color: var(--si); }
.v[data-v="no"][aria-pressed="true"] { background: var(--no-fondo); border-color: var(--no); color: var(--no); }
.v:disabled { opacity: 0.5; cursor: default; }
.ref__com textarea { width: 100%; font: 400 0.9375rem/1.45 var(--f-texto); color: var(--tinta); background: var(--fondo); border: 1px solid var(--filete); border-radius: var(--r); padding: 9px 10px; resize: vertical; min-height: 44px; }
.ref__estado { grid-column: 1 / -1; font-family: var(--f-dato); font-size: 0.75rem; color: var(--gris); min-height: 1em; }
:focus-visible { outline: 2px solid var(--foco); outline-offset: 2px; }
.sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
@media (max-width: 640px) {
  .ref__vistas { grid-template-columns: minmax(0, 1fr); }
  .ref__m { width: min(100%, 300px); }
  .ref__notas div { grid-template-columns: minmax(0, 1fr); gap: 2px; }
  .ref__voto { grid-template-columns: 1fr 1fr; }
  .ref__com { grid-column: 1 / -1; }
}
@media (prefers-reduced-motion: no-preference) { .ref { transition: border-color .2s; } }
</style>

<main class="envoltorio">
<header class="cab">
  <p class="dato">SpindleLab · E10 · ${esc(fechaLarga)} · Lucía, dirección de arte</p>
  <h1>Referentes para el sitio nuevo</h1>
  <p style="max-width:64ch">${total} sitios reales en ${data.lineas.length} líneas distintas. Ninguno usa bandas de color como recurso principal y todos buscan verse cálidos y de confianza. Marca cada uno y, si quieres, deja una línea de por qué: con tus sí y tus no, Lucía arma las dos direcciones.</p>
  <ol>
    <li>Mira las dos capturas: escritorio y teléfono. Abajo está la página completa.</li>
    <li>Toca <b>Sí</b> o <b>No</b>. El comentario es opcional y se guarda solo.</li>
    <li>No hace falta marcar todos: con los que te llamen la atención basta.</li>
  </ol>
  <p style="max-width:64ch">Un sí es un sí al rasgo que dice «Qué se toma», no al color ni al rubro de ese sitio. Lo que un sitio hace con la escritura no entra: el texto de tu sitio se queda.</p>
  <p class="dato" style="max-width:64ch">Un dato para elegir: el punto dorado del wordmark (#C9A227) contrasta poco sobre los fondos claros de A, B y C (2,2 a 2,4 a 1) y bien sobre los oscuros de D (5,7 a 7,7 a 1), aunque sobre un negro cálido el dorado tira a mostaza. Se resuelve en el lock.</p>
  <p class="cuenta" aria-live="polite"><span>Marcados <b id="n-marcados">0</b> de ${total}</span><span>Sí <b id="n-si">0</b></span><span>No <b id="n-no">0</b></span></p>
  <p class="aviso" id="sin-db" hidden>Esta vista no puede guardar tus marcas. Respóndeme en el chat con los números, por ejemplo «sí: 2, 7, 11; no: 5».</p>
  <nav aria-label="Líneas"><ul class="indice">${data.lineas.map((l) => `<li><a href="#linea-${esc(l.k)}">${esc(l.k.toUpperCase())} · ${esc(l.nombre)}</a></li>`).join('')}</ul></nav>
</header>
${secciones}
</main>

<script>
(function () {
  const tarjetas = [...document.querySelectorAll('.ref')];
  const estado = {};
  function pintar() {
    let si = 0, no = 0;
    for (const t of tarjetas) {
      const e = estado[t.dataset.id] || {};
      t.dataset.voto = e.voto || '';
      t.querySelectorAll('.v').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.v === e.voto)));
      const ta = t.querySelector('textarea');
      if (document.activeElement !== ta && typeof e.comentario === 'string') ta.value = e.comentario;
      if (e.voto === 'si') si++; else if (e.voto === 'no') no++;
    }
    document.getElementById('n-si').textContent = si;
    document.getElementById('n-no').textContent = no;
    document.getElementById('n-marcados').textContent = si + no;
  }
  function sinGuardar() {
    document.getElementById('sin-db').hidden = false;
    tarjetas.forEach(t => { t.querySelectorAll('.v, textarea').forEach(el => el.disabled = true); });
  }
  tarjetas.forEach(t => t.querySelectorAll('.v, textarea').forEach(el => el.disabled = true));
  const pUse = window.claude && window.claude.use ? window.claude.use('db') : Promise.resolve(null);
  pUse.then(async (db) => {
    if (!db) return sinGuardar();
    let puede = null;
    try { const u = await window.claude.use('user'); puede = u ? await u.can('data.write') : null; } catch (e) {}
    if (puede === false) return sinGuardar();
    tarjetas.forEach(t => t.querySelectorAll('.v, textarea').forEach(el => el.disabled = false));
    const col = db.collection('marcas');
    col.onSnapshot((snap) => {
      for (const d of snap.docs) estado[d.id] = d.data() || {};
      pintar();
    }, () => { const a = document.getElementById('sin-db'); a.textContent = 'Se cortó la conexión con tus marcas. Recarga la página; si sigue, respóndeme en el chat con los números.'; a.hidden = false; });
    const enCurso = {};
    async function guardar(id, cambio, nota) {
      const t = tarjetas.find(x => x.dataset.id === id);
      const msg = t.querySelector('.ref__estado');
      const cuerpo = Object.assign({ voto: null, comentario: '' }, estado[id], cambio, { actualizado: new Date().toISOString() });
      estado[id] = cuerpo; pintar();
      while (enCurso[id]) { try { await enCurso[id]; } catch (e) {} }
      msg.textContent = 'Guardando…';
      enCurso[id] = col.doc(id).set(cuerpo);
      try { await enCurso[id]; msg.textContent = nota; }
      catch (e) {
        msg.textContent = (e && e.code === 'invalid_argument') ? 'Esta vista no puede guardar. Respóndeme por el chat.' : 'No se pudo guardar. Prueba de nuevo en un momento.';
        if (e && e.code === 'invalid_argument') sinGuardar();
      }
      finally { enCurso[id] = null; }
    }
    tarjetas.forEach(t => {
      const id = t.dataset.id;
      t.querySelectorAll('.v').forEach(b => b.addEventListener('click', () => {
        const actual = (estado[id] || {}).voto;
        const nuevo = actual === b.dataset.v ? null : b.dataset.v;
        guardar(id, { voto: nuevo }, nuevo ? 'Guardado' : 'Marca quitada');
      }));
      const ta = t.querySelector('textarea'); let timer;
      const enviar = () => { clearTimeout(timer); const v = ta.value.trim(); if (v !== ((estado[id] || {}).comentario || '')) guardar(id, { comentario: v }, 'Comentario guardado'); };
      ta.addEventListener('input', () => { clearTimeout(timer); timer = setTimeout(enviar, 1200); });
      ta.addEventListener('blur', enviar);
    });
  });
})();
</script>
`;
writeFileSync(dir + '/referentes.html', html);
const imgs = data.lineas.flatMap((l) => l.referentes.flatMap((r) => [r.img1440, r.img390, r.imgCompleta]));
writeFileSync(dir + '/files.json', JSON.stringify(Object.fromEntries(imgs.map((p) => [p, p]))));
console.log('ok', total, 'referentes,', imgs.length, 'imágenes');
