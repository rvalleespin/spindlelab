// E13 · 30-oct · la portada nueva, el botón amarillo y la sección 2, medidos en el render. Lucía, 30-oct-2026.
//
// Lo que decidió Ramón el 30-oct (titular «En redes arriendas.», el recuadro «Hablemos de tu sitio», el botón y el del
// encabezado en amarillo lleno, la sección 2 en dos columnas) se mide sobre el sitio construido. Mientras el texto de
// Clara y el código de Diego no estén en el build, --inyectar pone en el DOM el texto elegido y las reglas de
// spec-visual.md §1.1 (--a-accion) y spec-home.md §12 (la portada y la sección 2), tal como las escribe la spec: lo que
// se mide es lo que Diego tiene que construir. Con el build ya hecho, se corre SIN --inyectar y tiene que dar lo mismo.
//
// Guarda en <salida>:
//   1. primera-pantalla.json: por tamaño y con el aviso de cookies abierto y cerrado, las cajas del rótulo, el h1 (y sus
//      líneas), el botón, el microcopy, el enlace y la entradilla; dónde empieza el aviso; el margen del botón sobre el
//      aviso (o sobre el borde de la pantalla); si algo tapa el botón (elementsFromPoint en el centro y las esquinas); y
//      el botón del encabezado (caja, fila sin desborde), sin plegar y plegado, con el contorno del foco contra la placa.
//   2. portada-render.json + velo-*.png: lo que lee contraste-portada.py de E12, sin cambios (el velo pintado sobre un
//      blanco puro, cada línea de texto, el medio). El «campo» es el botón amarillo: su «borde» es su relleno, así que
//      «bordeCampo» da el amarillo contra lo que lo rodea, cuadro por cuadro (WCAG 1.4.11).
//   3. seccion-2.json + s2-<ancho>.png: la sección 2 a 390, 768, 834, 1024, 1194 y 1440: columnas, filetes alineados
//      fila por fila, ancho de texto, alto de la sección y desborde.
//   4. cap-*.png: la primera pantalla con el aviso abierto a 360 × 800, 390 × 844 y 1440 × 900, y el encabezado.
//
// Uso: node portada-30oct.mjs <url-base> <carpeta-salida> [--inyectar]
import { pathToFileURL } from 'node:url';
import fs from 'node:fs';
const { chromium } = await import(pathToFileURL('/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs').href);

const [base, dir, bandera] = process.argv.slice(2);
const INYECTAR = bandera === '--inyectar';
fs.mkdirSync(dir, { recursive: true });

// ---------------------------------------------------------------- el texto que eligió Ramón (30-oct) y la spec
const TEXTO = {
  rotulo: 'Sitios web a medida y marketing con IA',
  tinta: 'En redes arriendas.',
  gris: 'Tu sitio es lo único que es tuyo.',
  entradilla: 'El anuncio, el post, la búsqueda en Google y la respuesta de ChatGPT llevan a la misma dirección. Diseñamos y programamos esa dirección a medida, con un panel para que la edites tú, y conectamos lo demás a ella.',
  boton: 'Hablemos de tu sitio',
  microcopy: 'Si ya tienes uno, te lo revisamos gratis y en un día hábil te mandamos lo que encontramos. Si no, te contamos cómo lo haríamos y cuánto cuesta.',
  secundario: 'Ver cómo hacemos un sitio y cuánto cuesta',
  secundarioDestino: '/servicios/desarrollo-web/',
  cab: 'Hablemos',
  s2h2: 'Todo lo que haces para vender termina en tu sitio',
  s2p: 'El anuncio en Google, el post en Instagram, la respuesta de ChatGPT cuando alguien pregunta por tu rubro. Todos mandan a la persona al mismo lugar. Si ese lugar no explica bien lo que haces, o el formulario no te avisa cuando alguien escribe, lo que pagaste para traerla se pierde ahí.',
  redes: ['La plataforma decide a quién le muestra lo que publicas.', 'Tu cuenta depende de sus reglas.', 'Si te vas, tus seguidores se quedan.'],
  sitio: ['Tú decides qué dice y en qué orden.', 'Va en tu dominio.', 'Google y las IA pueden leerlo y citarlo.', 'Quien te escribe llega a tu correo.'],
  s2cierre: 'Por eso partimos por el sitio. Después le conectamos lo demás: que Google y ChatGPT lo entiendan, los anuncios en Google, tus redes y la medición de cada mes. No te decimos que dejes las redes: también las gestionamos.',
};
// Las reglas, copiadas de spec-visual.md §1.1 y §4.1 (el token y sus estados) y de spec-home.md §12 (la sección 2).
const CSS = `
body.a-body { --a-accion: #ffe800; --a-accion-pasar: #e9d400; --a-accion-apretado: #d4c100; }
.a-body .boton--accion { background: var(--a-accion); color: var(--a-lienzo); }
.a-body .boton--accion:hover { background: var(--a-accion-pasar); }
.a-body .boton--accion:active { background: var(--a-accion-apretado); }
.a-body .int-par { display: grid; grid-template-columns: minmax(0, 1fr); margin-block: 32px; }
.a-body .int-par__t { margin-bottom: 12px; }
.a-body .int-par__lista + .int-par__t { margin-top: 32px; }
@media (min-width: 834px) {
  .a-body .int-par { grid-template-columns: repeat(2, minmax(0, 1fr)); grid-template-rows: auto repeat(4, auto); column-gap: var(--a-g); }
  .a-body .int-par__lista + .int-par__t { margin-top: 0; }
  .a-body .int-par > .int-par__t:nth-of-type(1) { grid-area: 1 / 1; }
  .a-body .int-par > .int-par__t:nth-of-type(2) { grid-area: 1 / 2; }
  .a-body .int-par > .int-par__lista:nth-of-type(1) { grid-area: 2 / 1 / 6 / 2; }
  .a-body .int-par > .int-par__lista:nth-of-type(2) { grid-area: 2 / 2 / 6 / 3; }
  .a-body .int-par__lista { display: grid; grid-template-rows: subgrid; }
  .a-body .int-par__lista > li { padding-right: 24px; }
}`;

function inyectar(T) {
  const q = (s) => document.querySelector(s);
  q('.portada-v__decl .rotulo').textContent = T.rotulo;
  q('#portada-titulo .tinta').textContent = T.tinta;
  q('#portada-titulo .gris').textContent = T.gris;
  q('.portada-v__decl .entradilla').textContent = T.entradilla;
  const cta = q('#portada-cta');
  cta.classList.replace('boton--claro', 'boton--accion');
  cta.firstChild.textContent = T.boton;
  const chicos = document.querySelectorAll('.portada-v__accion > .chico');
  chicos[0].textContent = T.microcopy;
  const a = chicos[1].querySelector('a'); a.textContent = T.secundario; a.setAttribute('href', T.secundarioDestino);
  const cab = q('.cab__cta'); if (cab) { cab.classList.replace('boton--claro', 'boton--accion'); cab.textContent = T.cab; }
  const s2 = q('#h-problema').closest('section');
  const rot = s2.querySelector('.int-sec__cab .rotulo'); if (rot) rot.remove();
  q('#h-problema').innerHTML = `<span class="tinta">${T.s2h2}</span>`;
  const li = (x) => `<li><p class="cuerpo">${x}</p></li>`;
  s2.querySelector('.int-sec__cuerpo').innerHTML = `<p class="cuerpo caja">${T.s2p}</p>
    <div class="int-par">
      <h3 class="t-titulo int-par__t">En redes</h3><ul class="int-lista int-par__lista">${T.redes.map(li).join('')}</ul>
      <h3 class="t-titulo int-par__t">En tu sitio</h3><ul class="int-lista int-par__lista">${T.sitio.map(li).join('')}</ul>
    </div>
    <p class="cuerpo caja">${T.s2cierre}</p>`;
}

const caja = (el) => { if (!el) return null; const r = el.getBoundingClientRect(); return { x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1), b: +(r.y + r.height).toFixed(1), r: +(r.x + r.width).toFixed(1) }; };

async function abrir(nav, w, h, { aviso, scroll = 0 }) {
  const movil = w < 834;
  const ctx = await nav.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, isMobile: movil, hasTouch: movil, reducedMotion: 'reduce' });
  if (!aviso) await ctx.addInitScript(() => { try { localStorage.setItem('spindlelab_consent', 'denied'); } catch (e) {} });
  const p = await ctx.newPage();
  await p.goto(base + '/', { waitUntil: 'load' });
  if (INYECTAR) { await p.evaluate(inyectar, TEXTO); await p.addStyleTag({ content: CSS }); }
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(250);
  if (scroll) { await p.evaluate((y) => window.scrollTo(0, y), scroll); await p.waitForTimeout(400); }
  return { ctx, p };
}

const nav = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const VISTAS = [[320, 568], [360, 640], [360, 800], [375, 667], [390, 844], [414, 896], [768, 1024], [834, 1112], [1024, 768], [1194, 834], [1280, 800], [1440, 900], [1920, 1080]];

// ---------------------------------------------------------------- 1 · primera pantalla, con el aviso abierto y cerrado
const PP = { cuando: new Date().toISOString(), base, inyectado: INYECTAR, chromium: nav.version(), vistas: [] };
for (const [w, h] of VISTAS) {
  for (const aviso of [true, false]) {
    const { ctx, p } = await abrir(nav, w, h, { aviso });
    const d = await p.evaluate(({ cajaSrc }) => {
      const caja = new Function('return ' + cajaSrc)();
      const q = (s) => document.querySelector(s);
      const ban = q('#cookie-banner');
      const avisoArriba = ban && !ban.hidden && getComputedStyle(ban).display !== 'none' ? ban.getBoundingClientRect().y : null;
      const cta = q('#portada-cta');
      const c = caja(cta);
      const puntos = [[c.x + c.w / 2, c.y + c.h / 2], [c.x + 2, c.y + 2], [c.r - 2, c.y + 2], [c.x + 2, c.b - 2], [c.r - 2, c.b - 2]];
      const tapado = puntos.filter(([x, y]) => { if (y >= innerHeight || y < 0) return true; const e = document.elementFromPoint(x, y); return !e || !(e === cta || cta.contains(e)); }).length;
      const h1 = q('#portada-titulo');
      const rg = document.createRange(); rg.selectNodeContents(h1);
      const lineasH1 = new Set([...rg.getClientRects()].map((r) => Math.round(r.y))).size;
      const chicos = document.querySelectorAll('.portada-v__accion > .chico');
      const cab = q('.cab__cta');
      return {
        avisoArriba, rotulo: caja(q('.portada-v__decl .rotulo')), h1: caja(h1), lineasH1, entradilla: caja(q('.portada-v__decl .entradilla')),
        boton: c, botonFondo: getComputedStyle(cta).backgroundColor, botonTexto: getComputedStyle(cta).color, botonTextoLiteral: cta.textContent.trim(),
        microcopy: caja(chicos[0]), enlace: caja(chicos[1]?.querySelector('a')), puntosTapados: tapado,
        cab: caja(cab), cabFondo: cab ? getComputedStyle(cab).backgroundColor : null, cabTexto: cab?.textContent.trim(),
        cabFila: caja(q('.cab__fila')), medio: caja(q('.portada-v__medio')), sw: document.documentElement.scrollWidth, vw: innerWidth, vh: innerHeight,
      };
    }, { cajaSrc: caja.toString() });
    const limite = d.avisoArriba ?? h;
    d.margenBoton = +(limite - d.boton.b).toFixed(1);
    d.botonEntero = d.boton.b <= limite && d.puntosTapados === 0;
    d.h1Entero = d.h1.b <= limite;
    d.microcopyEntero = d.microcopy.b <= limite;
    d.enlaceEntero = d.enlace ? d.enlace.b <= limite : null;
    d.vista = `${w}x${h}`; d.aviso = aviso;
    PP.vistas.push(d);
    if (aviso && ['360x800', '390x844', '1440x900', '360x640'].includes(d.vista)) await p.screenshot({ path: `${dir}/cap-${d.vista}-aviso.png` });
    console.log(`${d.vista} aviso ${aviso ? 'abierto' : 'cerrado'}: h1 ${d.lineasH1} líneas (${d.h1.y}–${d.h1.b}); botón ${d.boton.y}–${d.boton.b} (${d.boton.w} de ancho); ${d.avisoArriba ? 'aviso desde ' + d.avisoArriba.toFixed(0) : 'sin aviso'}; margen ${d.margenBoton}; tapado ${d.puntosTapados}/5; microcopy hasta ${d.microcopy.b}; enlace hasta ${d.enlace?.b}; fondo ${d.botonFondo}; cab ${d.cab ? d.cab.w + '×' + d.cab.h + ' en ' + d.cab.x + '–' + d.cab.r : '—'} desborde ${d.sw - d.vw}`);
    await ctx.close();
  }
}

// el botón del encabezado plegado (scroll 1200): su caja contra la placa y el contorno del foco (2 px a 3 px)
PP.plegado = [];
for (const [w, h] of [[320, 568], [360, 800], [390, 844], [768, 1024], [834, 1112], [1024, 768], [1194, 834], [1440, 900]]) {
  const { ctx, p } = await abrir(nav, w, h, { aviso: false, scroll: 1200 });
  await p.focus('.cab__cta');
  await p.waitForTimeout(150);
  const d = await p.evaluate(({ cajaSrc }) => {
    const caja = new Function('return ' + cajaSrc)();
    const cab = document.querySelector('.cab__cta');
    const placa = document.querySelector('.cab__placa');
    const cs = getComputedStyle(cab);
    const b = caja(cab), pl = caja(placa);
    const off = parseFloat(cs.outlineOffset), ow = parseFloat(cs.outlineWidth);
    const anillo = { y0: b.y - off - ow, y1: b.b + off + ow, x0: b.x - off - ow, x1: b.r + off + ow };
    return { plegada: document.querySelector('.cab').classList.contains('cab--plegada'), boton: b, placa: pl, placaOpacidad: getComputedStyle(placa).opacity,
      contorno: { color: cs.outlineColor, ancho: ow, distancia: off, estilo: cs.outlineStyle }, anillo,
      anilloDentroDeLaPlaca: { arriba: anillo.y0 >= pl.y, abajo: anillo.y1 <= pl.b, izquierda: anillo.x0 >= pl.x, derecha: anillo.x1 <= pl.r },
      filaSinDesborde: b.r <= pl.r - 12 + 0.5 };
  }, { cajaSrc: caja.toString() });
  d.vista = `${w}x${h}`;
  PP.plegado.push(d);
  if (['390x844', '1440x900'].includes(d.vista)) await p.screenshot({ path: `${dir}/cap-${d.vista}-plegado-foco.png`, clip: { x: 0, y: 0, width: w, height: 90 } });
  console.log(`plegado ${d.vista}: plegada ${d.plegada}; botón ${d.boton.x}–${d.boton.r} × ${d.boton.y}–${d.boton.b}; placa ${d.placa.x}–${d.placa.r} × ${d.placa.y}–${d.placa.b}; anillo ${d.anillo.y0}–${d.anillo.y1}; dentro ${JSON.stringify(d.anilloDentroDeLaPlaca)}; contorno ${d.contorno.color} ${d.contorno.ancho}px a ${d.contorno.distancia}px`);
  await ctx.close();
}
fs.writeFileSync(`${dir}/primera-pantalla.json`, JSON.stringify(PP, null, 1));

// ---------------------------------------------------------------- 2 · lo que lee contraste-portada.py (E12, sin cambios)
const R = { cuando: new Date().toISOString(), url: base, inyectado: INYECTAR, chromium: nav.version(), vistas: [] };
for (const [w, h] of VISTAS) {
  const { ctx, p } = await abrir(nav, w, h, { aviso: false });
  const datos = await p.evaluate(({ cajaSrc }) => {
    const caja = new Function('return ' + cajaSrc)();
    const out = { lineas: [] };
    const portada = document.querySelector('.portada-v');
    out.portada = caja(portada);
    out.medio = caja(document.querySelector('.portada-v__medio'));
    out.pie = caja(document.querySelector('.portada-v__pie'));
    out.cab = caja(document.querySelector('.cab'));
    const w = document.createTreeWalker(portada, NodeFilter.SHOW_TEXT);
    while (w.nextNode()) {
      const t = w.currentNode;
      if (!t.textContent.trim()) continue;
      const el = t.parentElement;
      // la pausa y el botón llevan su propio relleno (placa, amarillo): su texto se mide como par de tokens, no sobre el video
      if (el.closest('button, .boton, [aria-hidden="true"], .solo-lector')) continue;
      const cs = getComputedStyle(el);
      const rg = document.createRange(); rg.selectNodeContents(t);
      for (const r of rg.getClientRects()) {
        if (r.width < 1 || r.height < 1) continue;
        out.lineas.push({ texto: t.textContent.trim().slice(0, 40), sel: el.tagName.toLowerCase() + (el.className ? '.' + String(el.className).split(' ').join('.') : ''), x: r.x, y: r.y, w: r.width, h: r.height, color: cs.color, tam: parseFloat(cs.fontSize), peso: +cs.fontWeight });
      }
    }
    const cta = document.querySelector('#portada-cta');
    out.campo = { ...caja(cta), borde: getComputedStyle(cta).backgroundColor };
    out.boton = caja(cta);
    out.h1 = caja(document.querySelector('h1'));
    return out;
  }, { cajaSrc: caja.toString() });
  // el velo, sin texto y con el video cambiado por un blanco puro (visibility no mueve nada)
  await p.addStyleTag({ content: '.portada-v__pie *, .portada-v .pausa { visibility: hidden !important; } .portada-v__medio > * { visibility: hidden !important; } .portada-v__medio { background: #fff !important; }' });
  await p.waitForTimeout(100);
  const png = `${dir}/velo-${w}x${h}.png`;
  await p.screenshot({ path: png, fullPage: true, clip: { x: 0, y: datos.portada.y, width: w, height: Math.min(datos.portada.h, 4000) } });
  Object.assign(datos, { velo: png.split('/').pop(), ancho: w, alto: h, archivo: 'hilo-1920' });
  R.vistas.push(datos);
  await ctx.close();
}
fs.writeFileSync(`${dir}/portada-render.json`, JSON.stringify(R, null, 1));

// ---------------------------------------------------------------- 3 · la sección 2
const S2 = { cuando: new Date().toISOString(), inyectado: INYECTAR, vistas: [] };
for (const [w, h] of [[360, 800], [390, 844], [768, 1024], [834, 1112], [1024, 768], [1194, 834], [1440, 900], [1920, 1080]]) {
  const { ctx, p } = await abrir(nav, w, h, { aviso: false });
  const d = await p.evaluate(({ cajaSrc }) => {
    const caja = new Function('return ' + cajaSrc)();
    const s2 = document.querySelector('#h-problema').closest('section');
    const par = s2.querySelector('.int-par');
    if (!par) return { sinPar: true };
    const cols = [...par.querySelectorAll('.int-par__lista')].map((ul) => ({
      titulo: caja(ul.previousElementSibling), lista: caja(ul),
      filas: [...ul.children].map((li) => { const p = li.querySelector('p'); const rg = document.createRange(); rg.selectNodeContents(p); const rs = [...rg.getClientRects()]; return { y: caja(li).y, h: caja(li).h, lineas: new Set(rs.map((r) => Math.round(r.y))).size, textoDerecha: Math.max(...rs.map((r) => r.x + r.width)) }; }),
    }));
    const n = Math.max(...cols.map((c) => c.filas.length));
    const alineadas = cols.length === 2 && cols[0].lista.x !== cols[1].lista.x
      ? [...Array(Math.min(cols[0].filas.length, cols[1].filas.length)).keys()].map((i) => +(cols[1].filas[i].y - cols[0].filas[i].y).toFixed(1))
      : null;
    const s = caja(s2);
    const s2rect = s2.getBoundingClientRect();
    const fuera = [...s2.querySelectorAll('*')].filter((e) => e.getBoundingClientRect().right > innerWidth + 0.5).length;
    const parrafos = [...s2.querySelectorAll('.int-sec__cuerpo > p')].map(caja);
    return { seccion: { y: +(s2rect.y + scrollY).toFixed(0), alto: s.h }, h2: caja(document.querySelector('#h-problema')), cuerpo: caja(s2.querySelector('.int-sec__cuerpo')),
      parrafos, par: caja(par), columnas: cols, diferenciaFilas: alineadas, lado: cols.length === 2 && cols[0].lista.x !== cols[1].lista.x ? 'dos columnas' : 'apilado',
      separacionTextos: cols.length === 2 && cols[0].lista.x !== cols[1].lista.x ? +(cols[1].lista.x - Math.max(...cols[0].filas.map((f) => f.textoDerecha))).toFixed(1) : null,
      elementosFuera: fuera, sw: document.documentElement.scrollWidth, vw: innerWidth, altoHome: document.documentElement.scrollHeight };
  }, { cajaSrc: caja.toString() });
  d.vista = `${w}x${h}`;
  S2.vistas.push(d);
  const sec = await p.$('#h-problema >> xpath=ancestor::section');
  await sec.screenshot({ path: `${dir}/s2-${w}.png` });
  if (!d.sinPar) console.log(`s2 ${d.vista}: ${d.lado}; sección ${d.seccion.alto} px; par ${d.par.x}–${d.par.r}; columnas ${d.columnas.map((c) => c.lista.x + '–' + c.lista.r + ' (' + c.filas.map((f) => f.lineas).join('/') + ' líneas)').join(' | ')}; filas desfasadas ${JSON.stringify(d.diferenciaFilas)}; entre textos ${d.separacionTextos}; fuera ${d.elementosFuera}; desborde ${d.sw - d.vw}; home ${d.altoHome}`);
  else console.log(`s2 ${d.vista}: sin .int-par en el DOM`);
  await ctx.close();
}
fs.writeFileSync(`${dir}/seccion-2.json`, JSON.stringify(S2, null, 1));

// ---------------------------------------------------------------- 4 · el alto de la home, recorrida (spec-home §6, criterio 5)
// «tal como carga» es el build (con lo inyectado, si se pidió). Con --inyectar se suma «proyección»: además, el texto base
// que Ramón dejó el 30-oct para lo que no es visual (la pregunta nueva, el párrafo de quien parte, el pie y los cuatro
// párrafos de «Quién está detrás»). Clara lo afina: la proyección es para fijar el techo, no para medir su texto.
const PROY = {
  faqP: '¿Por qué un sitio, si ya tengo Instagram?',
  faqR: 'Porque Instagram es de Instagram. Sirve para que te conozcan, y está bien usarlo. Pero el alcance lo decide la plataforma, y la cuenta depende de sus reglas. El sitio va en tu dominio: ahí llegan tus anuncios, ahí te encuentra Google y ahí te escriben.',
  paraquien2: 'Si estás partiendo y todavía no tienes sitio, también es por acá: es lo primero que hacemos.',
  pie: 'Ramón Vallejos · Fundador y director de SpindleLab',
  quien: [
    'SpindleLab lo dirige Ramón Vallejos. Viene de años en agencias de medios y de marketing, algunas parte de redes globales, donde hizo producción, pauta, contenido y SEO para marcas de alcance nacional y regional, con campañas en varios países.',
    'Ahí vio dónde se pierde lo que una marca invierte para atraer clientes: casi nunca en el anuncio, casi siempre en el lugar al que el anuncio lleva. SpindleLab parte de esa idea. Construimos el sitio como el eje del negocio y le conectamos todo lo demás: la búsqueda, la pauta, las redes y la medición.',
    'Trabaja con agentes de IA dentro del equipo y revisa y aprueba el código de cada entrega. Las herramientas que usa las construyó él: un chequeo abierto que mide si la IA puede entender un sitio y otro para la Ley 21.719 de datos personales. Cualquiera puede probarlos, gratis.',
    'Estudió Comunicación Publicitaria en la Universidad Andrés Bello y tiene un máster en Marketing Digital y E-commerce de la Universidad de Barcelona.',
  ],
};
function proyectar(P) {
  const q = (s) => document.querySelector(s);
  const pq = q('#h-empresas').closest('section').querySelectorAll('.int-sec__cuerpo > p');
  if (pq[1]) pq[1].textContent = P.paraquien2;
  const qt = q('.quien__txt');
  const rotulos = qt.querySelectorAll(':scope > p.rotulo');
  rotulos[rotulos.length - 1].textContent = P.pie;
  const ps = [...qt.querySelectorAll(':scope > p.cuerpo')];
  ps.forEach((p, i) => { if (i > 0) p.remove(); });
  ps[0].outerHTML = P.quien.map((x) => `<p class="cuerpo caja">${x}</p>`).join('');
  const faq = q('#h-faq').closest('section').querySelector('.int-sec__cuerpo');
  faq.insertAdjacentHTML('afterbegin', `<div class="pregunta"><h3>${P.faqP}</h3><p class="cuerpo">${P.faqR}</p></div>`);
}
const ALTO = { cuando: new Date().toISOString(), inyectado: INYECTAR, vistas: [] };
for (const [w, h] of [[390, 844], [768, 1024], [1024, 768], [1440, 900]]) {
  for (const modo of INYECTAR ? ['tal como carga', 'proyección'] : ['tal como carga']) {
    const { ctx, p } = await abrir(nav, w, h, { aviso: false });
    if (modo === 'proyección') await p.evaluate(proyectar, PROY);
    // recorrerla: bajar de a una pantalla para que carguen las imágenes diferidas, y volver
    await p.evaluate(async () => { for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); } window.scrollTo(0, 0); });
    await p.waitForTimeout(300);
    const d = await p.evaluate(() => ({
      alto: document.documentElement.scrollHeight,
      secciones: [...document.querySelectorAll('main section')].map((s) => ({ id: s.getAttribute('aria-labelledby'), alto: Math.round(s.getBoundingClientRect().height) })),
    }));
    ALTO.vistas.push({ vista: `${w}x${h}`, modo, ...d });
    console.log(`alto ${w}x${h} (${modo}): ${d.alto} · ${d.secciones.map((s) => s.id + ' ' + s.alto).join(' · ')}`);
    await ctx.close();
  }
}
fs.writeFileSync(`${dir}/alto-home.json`, JSON.stringify(ALTO, null, 1));
await nav.close();
