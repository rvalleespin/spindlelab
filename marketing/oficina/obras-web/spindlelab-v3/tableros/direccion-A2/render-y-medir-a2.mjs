// Render + medición de la dirección A2 (ronda 2), con VIEWPORT REAL (Playwright),
// no el clamping de --window-size del headless CLI.
//
// Qué mide, y por qué cada cosa está acá:
//  · El ancho del documento contra su scrollWidth en DOCE anchos, no en cuatro: el
//    bloqueante de esta ronda apareció justo en el tramo que la anterior no midió
//    (1024-1150), así que se barre el rango completo.
//  · La capacidad del campo ESCRIBIENDO con page.type, no con value= puesto a mano,
//    y buscando por bisección cuántos caracteres caben de verdad.
//  · El contraste componiendo capas y parseando el color(srgb ...) con que Chromium
//    devuelve color-mix: si no se contempla, se mide contra el fondo del padre y
//    sale un número bonito que no es el real.
//  · El contraste NO TEXTUAL del filete del campo contra las dos superficies que
//    toca (WCAG 1.4.11 pide 3:1 para el borde de un control). La ronda anterior
//    daba 2,64:1 y 2,33:1 y nadie lo había medido.
//  · elementFromPoint sobre el centro de cada accionable, con el aviso de cookies
//    real presente: es el bloqueante que mató a la dirección B.
//  · El largo de cada línea de la bajada con un Range, porque el manual §05 fija 68
//    caracteres y el token prosa rinde 82.
import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs';

const DIR = '/home/user/spindlelab/marketing/oficina/obras-web/spindlelab-v3/tableros/direccion-A2';
const TRABAJO = process.env.TRABAJO || '/tmp/claude-0/-home-user-spindlelab/756adde7-3da1-5186-9935-cf74aeaa7043/scratchpad/a2r2';
fs.mkdirSync(TRABAJO, { recursive: true });
const ARCHIVO = process.env.TABLERO || path.join(DIR, 'tablero.html');
const URL = 'file://' + ARCHIVO;

const D28 = 'constructorahermanosperez.cl';                 // 28 caracteres, largo normal
const D34 = 'sociedadcomercialdelvalleylopez.cl';           // 34 caracteres, largo

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
});

// Las cuatro vistas que se capturan + el barrido de anchos que la ronda 1 no hizo.
const vistas = [
  { n: '1600', width: 1600, height: 900, movil: false, barrido: true },
  { n: '1440', width: 1440, height: 900, movil: false },
  { n: '1439', width: 1439, height: 900, movil: false, barrido: true },
  { n: '1366', width: 1366, height: 900, movil: false, barrido: true },
  { n: '1280', width: 1280, height: 900, movil: false, barrido: true },
  { n: '1180', width: 1180, height: 900, movil: false, barrido: true },
  { n: '1179', width: 1179, height: 900, movil: false, barrido: true },
  { n: '1100', width: 1100, height: 900, movil: false, barrido: true },
  { n: '1024', width: 1024, height: 900, movil: false, barrido: true },
  { n: '1023', width: 1023, height: 900, movil: false, barrido: true },
  { n: '768', width: 768, height: 1024, movil: false },
  { n: '390', width: 390, height: 844, movil: true },
  { n: '360', width: 360, height: 800, movil: true },
];

const sonda = () => {
  function srgb(c) { c /= 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); }
  function lum([r, g, b]) { return 0.2126 * srgb(r) + 0.7152 * srgb(g) + 0.0722 * srgb(b); }
  function parse(s) {
    if (!s) return null;
    let m = s.match(/color\(srgb\s+([\d.eE+-]+)\s+([\d.eE+-]+)\s+([\d.eE+-]+)(?:\s*\/\s*([\d.eE+-]+))?\)/);
    if (m) return [+m[1] * 255, +m[2] * 255, +m[3] * 255, m[4] === undefined ? 1 : +m[4]];
    m = s.match(/rgba?\(([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:[,\s/]+([\d.]+))?/);
    if (!m) return null;
    return [+m[1], +m[2], +m[3], m[4] === undefined ? 1 : +m[4]];
  }
  function fondoEfectivo(el) {
    const capas = []; let n = el;
    while (n && n.nodeType === 1) {
      const bg = parse(getComputedStyle(n).backgroundColor);
      if (bg && bg[3] > 0) { capas.push(bg); if (bg[3] === 1) break; }
      n = n.parentElement;
    }
    if (!capas.length) return [0, 0, 0];
    let out = capas[capas.length - 1].slice(0, 3);
    for (let i = capas.length - 2; i >= 0; i--) {
      const c = capas[i];
      out = [0, 1, 2].map((k) => c[k] * c[3] + out[k] * (1 - c[3]));
    }
    return out;
  }
  function ratio(a, b) {
    const L1 = lum(a), L2 = lum(b);
    return Math.round(((Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05)) * 100) / 100;
  }
  function contraste(el) {
    const cs = getComputedStyle(el);
    let fg = parse(cs.color);
    const bg = fondoEfectivo(el);
    if (!fg) return null;
    if (fg[3] < 1) fg = [0, 1, 2].map((k) => fg[k] * fg[3] + bg[k] * (1 - fg[3]));
    const op = parseFloat(cs.opacity);
    if (op < 1) fg = [0, 1, 2].map((k) => fg[k] * op + bg[k] * (1 - op));
    return ratio(fg, bg);
  }
  // Contraste de un BORDE contra la superficie de adentro y la de afuera.
  function contrasteBorde(el) {
    const cs = getComputedStyle(el);
    let bc = parse(cs.borderTopColor);
    if (!bc) return null;
    const dentro = parse(cs.backgroundColor) && parse(cs.backgroundColor)[3] === 1
      ? parse(cs.backgroundColor).slice(0, 3) : fondoEfectivo(el);
    const fuera = fondoEfectivo(el.parentElement);
    if (bc[3] < 1) bc = [0, 1, 2].map((k) => bc[k] * bc[3] + dentro[k] * (1 - bc[3]));
    return { color: cs.borderTopColor, ancho: cs.borderTopWidth, dentro: ratio(bc, dentro), fuera: ratio(bc, fuera) };
  }

  const d = document.documentElement;
  const vh = window.innerHeight;
  const banner = document.getElementById('cookie-banner');
  const br = banner.getBoundingClientRect();
  const pliegueUtil = Math.round(br.top);

  const sel = [
    ['wordmark', '.wordmark'],
    ['escribenos', '.nav-contacto'],
    ['menu', '.btn-menu'],
    ['campo', '#chq-dominio'],
    ['boton-chequeo', '#chq-btn'],
    ['puerta', '.puerta-cta'],
    ['trabajo', '.siguiente a'],
    ['cookie-aceptar', '#cookie-accept'],
  ];
  const accionables = sel.map(([n, s]) => {
    const el = document.querySelector(s);
    if (!el) return { n, existe: false };
    const r = el.getBoundingClientRect();
    const cx = Math.round(r.left + r.width / 2), cy = Math.round(r.top + r.height / 2);
    const hit = document.elementFromPoint(cx, cy);
    return {
      n, w: Math.round(r.width), h: Math.round(r.height),
      top: Math.round(r.top), bottom: Math.round(r.bottom),
      sobreElAviso: r.bottom <= pliegueUtil,
      enElViewport: r.bottom <= vh,
      alcanzable: !!hit && (el === hit || el.contains(hit) || hit.contains(el)),
      loQueResponde: hit ? (hit.id || hit.className || hit.tagName) : null,
    };
  });

  // Oro: barrido completo sobre todo lo que se pinta.
  const oro = [...document.querySelectorAll('*')].filter((el) => {
    const s = getComputedStyle(el);
    return [s.color, s.backgroundColor, s.borderTopColor, s.borderRightColor,
      s.borderBottomColor, s.borderLeftColor, s.outlineColor, s.textDecorationColor,
      s.caretColor, s.fill, s.stroke].some((c) => /201,\s*162,\s*39/.test(c || ''));
  }).map((el) => el.className || el.tagName);

  const caja = (s) => { const el = document.querySelector(s); if (!el) return null; const r = el.getBoundingClientRect(); return { w: Math.round(r.width), h: Math.round(r.height), top: Math.round(r.top), bottom: Math.round(r.bottom) }; };

  // Líneas de la bajada, con Range: getClientRects sobre el nodo de texto da las
  // líneas de verdad, no la caja del bloque.
  function lineas(s) {
    const el = document.querySelector(s);
    if (!el) return null;
    const nodo = el.firstChild;
    const rects = [...new Range()[0] ? [] : []];
    const rg = document.createRange();
    const txt = nodo.textContent;
    const cajas = (() => { rg.selectNodeContents(el); return [...rg.getClientRects()]; })();
    const filas = cajas.filter((r) => r.height > 2);
    // cuántos caracteres por línea: se avanza carácter a carácter y se cuenta el salto de y
    const out = []; let actual = 0; let y = null;
    for (let i = 0; i < txt.length; i++) {
      rg.setStart(nodo, i); rg.setEnd(nodo, i + 1);
      const r = rg.getBoundingClientRect();
      if (y === null) { y = r.top; actual = 1; continue; }
      if (Math.abs(r.top - y) > 2) { out.push(actual); y = r.top; actual = 1; } else actual++;
    }
    out.push(actual);
    return { nLineas: filas.length, caracteresPorLinea: out, maximo: Math.max(...out) };
  }

  // Palabras visibles sobre el aviso de cookies.
  function palabrasSobreElPliegue() {
    const salida = [];
    const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (w.nextNode()) {
      const n = w.currentNode;
      if (!n.textContent.trim()) continue;
      const p = n.parentElement;
      if (!p || p.closest('#cookie-banner, .pliegue, .tira')) continue;
      const cs = getComputedStyle(p);
      if (cs.display === 'none' || cs.visibility === 'hidden') continue;
      const rg = document.createRange(); rg.selectNodeContents(n);
      const r = rg.getBoundingClientRect();
      if (r.height === 0 || r.top >= pliegueUtil) continue;
      salida.push(n.textContent.trim());
    }
    const ph = document.querySelector('#chq-dominio')?.placeholder;
    if (ph) salida.push(ph);
    const t = salida.join(' ');
    return { palabras: t.split(/\s+/).filter(Boolean).length, texto: t };
  }

  const cc = document.querySelector('.caja-campo');
  const inp = document.querySelector('#chq-dominio');

  const pares = [
    ['texto del campo', '#chq-dominio'],
    ['rotulo de la banda (navy sobre papel)', '.rotulo-banda'],
    ['label del campo', '.rotulo-campo'],
    ['nota, clausula verificada', '.nota b'],
    ['nota, segunda clausula', '.nota'],
    ['peso destacado de la barra', '.pesos b'],
    ['etiqueta de la barra', '.pesos span'],
    ['boton del chequeo', '#chq-btn'],
    ['rotulo sobre brasa', '.puerta .rotulo'],
    ['titulo de la puerta', '.puerta-titulo'],
    ['linea de la puerta', '.puerta-linea'],
    ['boton de la puerta', '.puerta-cta'],
    ['antecedente', '.antes'],
    ['h1', '.decir h1'],
    ['bajada', '.bajada'],
    ['rotulo seccion siguiente', '.siguiente .rotulo'],
    ['escribenos', '.nav-contacto'],
    ['aviso de cookies, parrafo', '#cookie-banner p'],
  ];
  const contrastes = {};
  for (const [k, s] of pares) { const el = document.querySelector(s); if (el) contrastes[k] = contraste(el); }

  return {
    clientWidth: d.clientWidth,
    scrollWidth: d.scrollWidth,
    overflow: d.scrollWidth > d.clientWidth,
    alturaVentana: vh,
    pliegueUtil,
    altoDelAviso: Math.round(br.height),
    cuerpoDelCampo: getComputedStyle(inp).fontSize,
    anchoUtilDelCampo: Math.round(inp.clientWidth),
    fileteDelCampo: contrasteBorde(cc),
    bloques: {
      instrumento: caja('.instrumento'), puerta: caja('.puerta'),
      antes: caja('.antes'), h1: caja('.decir h1'), bajada: caja('.bajada'),
      pesos: caja('.pesos'), siguiente: caja('.siguiente'),
    },
    h1: { texto: document.querySelector('h1').textContent.trim(), cuerpo: getComputedStyle(document.querySelector('h1')).fontSize },
    bajadaCuerpo: getComputedStyle(document.querySelector('.bajada')).fontSize,
    puertaTituloCuerpo: getComputedStyle(document.querySelector('.puerta-titulo')).fontSize,
    lineasBajada: lineas('.bajada'),
    texto: palabrasSobreElPliegue(),
    accionables,
    oro,
    contrastes,
    fuentes: {
      manrope: document.fonts.check('700 32px Manrope'),
      gabarito: document.fonts.check('700 20px Gabarito'),
      inter: document.fonts.check('400 13.5px Inter'),
      h1Familia: getComputedStyle(document.querySelector('h1')).fontFamily,
      wordmarkFamilia: getComputedStyle(document.querySelector('.wordmark')).fontFamily,
    },
    encabezados: [...document.querySelectorAll('h1,h2,h3')].map((h) => h.tagName + ': ' + h.textContent.trim().slice(0, 46)),
  };
};

const medidas = [];
for (const v of vistas) {
  const ctx = await browser.newContext({
    viewport: { width: v.width, height: v.height },
    deviceScaleFactor: v.barrido ? 1 : 2,
    isMobile: v.movil, hasTouch: v.movil,
    userAgent: v.movil
      ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
      : undefined,
  });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(350);

  const m = await page.evaluate(sonda);

  // --- CAPACIDAD DEL CAMPO, ESCRIBIENDO DE VERDAD ---
  const cap = {};
  for (const [nombre, valor] of [['d28', D28], ['d34', D34]]) {
    await page.fill('#chq-dominio', '');
    await page.type('#chq-dominio', valor, { delay: 0 });
    const r = await page.evaluate(() => {
      const i = document.querySelector('#chq-dominio');
      return { scrollWidth: i.scrollWidth, clientWidth: i.clientWidth };
    });
    cap[nombre] = {
      caracteres: valor.length,
      scrollWidth: r.scrollWidth, clientWidth: r.clientWidth,
      visible: Math.min(100, Math.round((r.clientWidth / r.scrollWidth) * 100)),
      entero: r.scrollWidth <= r.clientWidth,
    };
  }
  // Bisección con la minúscula más ancha de Manrope.
  const topeN = await page.evaluate(() => {
    const i = document.querySelector('#chq-dominio');
    let lo = 1, hi = 120;
    const cabe = (k) => { i.value = 'n'.repeat(k); return i.scrollWidth <= i.clientWidth; };
    while (lo < hi) { const mid = Math.ceil((lo + hi) / 2); if (cabe(mid)) lo = mid; else hi = mid - 1; }
    i.value = '';
    return lo;
  });
  cap.topeConNRepetida = topeN;

  medidas.push({ vista: v.n, ...m, capacidad: cap });

  if (!v.barrido) {
    // reposo
    await page.fill('#chq-dominio', '');
    await page.evaluate(() => document.activeElement && document.activeElement.blur());
    await page.waitForTimeout(120);
    const destino = (v.n === '1440' || v.n === '390') ? DIR : TRABAJO;
    await page.screenshot({ path: path.join(destino, `reposo-${v.n}.png`) });
    // tecleado, con el foco quitado: es el estado en que el visitante mira lo que escribió
    await page.type('#chq-dominio', D28, { delay: 0 });
    await page.evaluate(() => document.activeElement && document.activeElement.blur());
    await page.waitForTimeout(120);
    await page.screenshot({ path: path.join(destino, `tecleado-${v.n}.png`) });
    // foco
    await page.fill('#chq-dominio', '');
    await page.focus('#chq-dominio');
    await page.waitForTimeout(120);
    await page.screenshot({ path: path.join(destino, `foco-${v.n}.png`) });
    // la tira de abajo
    await page.evaluate(() => document.querySelector('.tira').scrollIntoView());
    await page.waitForTimeout(150);
    await page.screenshot({ path: path.join(TRABAJO, `tira-${v.n}.png`) });
  }
  await ctx.close();
}

// --- PRUEBA DEL LOGO TAPADO: se renderiza, no se razona ---
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => { document.querySelector('.cabecera').style.visibility = 'hidden'; });
  await page.waitForTimeout(250);
  await page.screenshot({ path: path.join(TRABAJO, 'logo-tapado-1440.png') });
  await ctx.close();
}

fs.writeFileSync(path.join(TRABAJO, 'medidas.json'), JSON.stringify(medidas, null, 2));
await browser.close();

// Resumen legible
for (const m of medidas) {
  console.log(`\n=== ${m.vista} (${m.clientWidth}x${m.alturaVentana}) ===`);
  console.log(`  doc ${m.clientWidth}/${m.scrollWidth} overflow=${m.overflow} · aviso en ${m.pliegueUtil} (${m.altoDelAviso}px)`);
  console.log(`  campo ${m.cuerpoDelCampo} · util ${m.anchoUtilDelCampo}px · d28 ${m.capacidad.d28.clientWidth}/${m.capacidad.d28.scrollWidth} ${m.capacidad.d28.visible}% · d34 ${m.capacidad.d34.visible}% · tope 'n' ${m.capacidad.topeConNRepetida}`);
  console.log(`  filete reposo: dentro ${m.fileteDelCampo.dentro}:1 · fuera ${m.fileteDelCampo.fuera}:1 (${m.fileteDelCampo.ancho})`);
  console.log(`  h1 ${m.h1.cuerpo} en ${m.bloques.h1.top}-${m.bloques.h1.bottom} · antes ${m.bloques.antes.top}-${m.bloques.antes.bottom} · bajada ${m.bajadaCuerpo} ${m.lineasBajada.nLineas} lineas max ${m.lineasBajada.maximo} car`);
  console.log(`  puerta-titulo ${m.puertaTituloCuerpo} · instrumento ${m.bloques.instrumento.w}x${m.bloques.instrumento.h} · puerta ${m.bloques.puerta.w}x${m.bloques.puerta.h}`);
  console.log(`  palabras sobre el aviso: ${m.texto.palabras} · oro: ${JSON.stringify(m.oro)}`);
  const malos = m.accionables.filter((a) => !a.alcanzable);
  console.log(`  accionables sobre el aviso: ${m.accionables.filter((a) => a.sobreElAviso).map((a) => a.n).join(', ')}`);
  console.log(`  NO alcanzables: ${malos.length ? JSON.stringify(malos) : 'ninguno'}`);
}
console.log('\n=== CONTRASTES (1440) ===');
console.log(JSON.stringify(medidas.find((m) => m.vista === '1440').contrastes, null, 1));
console.log('\n=== ENCABEZADOS ===');
console.log(medidas[0].encabezados.join('\n'));
console.log('\n=== FUENTES ===');
console.log(JSON.stringify(medidas.find((m) => m.vista === '1440').fuentes, null, 1));
