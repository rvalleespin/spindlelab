// Render + medición de la dirección A2, con VIEWPORT REAL (Playwright), no el
// clamping de --window-size del headless CLI.
import { chromium } from 'playwright';
import path from 'node:path';

const DIR = '/home/user/spindlelab/marketing/oficina/obras-web/spindlelab-v3/tableros/direccion-A2';
const URL = 'file://' + path.join(DIR, 'tablero.html');
const DOMINIO = 'constructorahermanosperez.cl'; // 28 caracteres

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
});

const vistas = [
  { n: '1440', width: 1440, height: 900, movil: false },
  { n: '768', width: 768, height: 1024, movil: false },
  { n: '390', width: 390, height: 844, movil: true },
  { n: '360', width: 360, height: 800, movil: true },
];

// --- contraste WCAG, calculado, no estimado ---
const sonda = () => {
  function srgb(c) {
    c /= 255;
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  }
  function lum([r, g, b]) {
    return 0.2126 * srgb(r) + 0.7152 * srgb(g) + 0.0722 * srgb(b);
  }
  function parse(s) {
    if (!s) return null;
    // Chromium devuelve color-mix() resuelto como color(srgb r g b / a), con los
    // canales en 0-1. Si no se contempla, el par se mide contra el fondo del padre
    // y sale un numero bonito que no es el real.
    let m = s.match(/color\(srgb\s+([\d.eE+-]+)\s+([\d.eE+-]+)\s+([\d.eE+-]+)(?:\s*\/\s*([\d.eE+-]+))?\)/);
    if (m) return [+m[1] * 255, +m[2] * 255, +m[3] * 255, m[4] === undefined ? 1 : +m[4]];
    m = s.match(/rgba?\(([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:[,\s/]+([\d.]+))?/);
    if (!m) return null;
    return [+m[1], +m[2], +m[3], m[4] === undefined ? 1 : +m[4]];
  }
  function fondoEfectivo(el) {
    // Compone los fondos hacia arriba hasta encontrar uno opaco.
    let capas = [];
    let n = el;
    while (n && n.nodeType === 1) {
      const bg = parse(getComputedStyle(n).backgroundColor);
      if (bg && bg[3] > 0) {
        capas.push(bg);
        if (bg[3] === 1) break;
      }
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
  function contraste(el) {
    const cs = getComputedStyle(el);
    let fg = parse(cs.color);
    const bg = fondoEfectivo(el);
    if (!fg) return null;
    if (fg[3] < 1) fg = [0, 1, 2].map((k) => fg[k] * fg[3] + bg[k] * (1 - fg[3]));
    const op = parseFloat(cs.opacity);
    if (op < 1) fg = [0, 1, 2].map((k) => fg[k] * op + bg[k] * (1 - op));
    const L1 = lum(fg), L2 = lum(bg);
    const r = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
    return Math.round(r * 100) / 100;
  }

  const d = document.documentElement;
  const vh = window.innerHeight;
  const banner = document.getElementById('cookie-banner');
  const br = banner.getBoundingClientRect();

  // --- accionables del primer viewport: ¿se pueden pulsar de verdad? ---
  const sel = [
    ['wordmark', '.wordmark'],
    ['contacto cabecera', '.nav-contacto'],
    ['botón de menú', '.btn-menu'],
    ['campo del dominio', '#chq-dominio'],
    ['botón del chequeo', '#chq-btn'],
    ['segunda puerta', '.puerta-cta'],
    ['enlace trabajo', '.siguiente a'],
    ['rechazar cookies', '#cookie-reject'],
    ['aceptar cookies', '#cookie-accept'],
  ];
  const accionables = sel.map(([nombre, s]) => {
    const el = document.querySelector(s);
    if (!el) return { nombre, existe: false };
    const r = el.getBoundingClientRect();
    const x = Math.round(r.left + r.width / 2);
    const y = Math.round(r.top + r.height / 2);
    const enPantalla = r.top >= 0 && r.bottom <= vh;
    let top = document.elementFromPoint(x, y);
    if (!enPantalla) {
      el.scrollIntoView({ block: 'center' });
      const r2 = el.getBoundingClientRect();
      top = document.elementFromPoint(Math.round(r2.left + r2.width / 2), Math.round(r2.top + r2.height / 2));
      window.scrollTo(0, 0);
    }
    const alcanzable = !!top && (top === el || el.contains(top) || top.contains(el));
    const tapadoPorBanner = !!top && (top === banner || banner.contains(top));
    return {
      nombre,
      top: Math.round(r.top), bottom: Math.round(r.bottom),
      alto: Math.round(r.height), ancho: Math.round(r.width),
      sobreElPliegue: enPantalla,
      encimaDelAviso: r.bottom <= Math.round(br.top),
      alcanzable, tapadoPorBanner,
      quienEstaArriba: top ? (top.id || top.className || top.tagName) : null,
    };
  });

  // --- el campo: ¿cabe un dominio real? ---
  const inp = document.getElementById('chq-dominio');
  const cs = getComputedStyle(inp);
  const campo = {
    fontSize: cs.fontSize,
    fontFamily: cs.fontFamily.split(',')[0].replace(/["']/g, ''),
    fontWeight: cs.fontWeight,
    clientWidth: inp.clientWidth,
    scrollWidth: inp.scrollWidth,
    desborda: inp.scrollWidth > inp.clientWidth + 1,
    visible: Math.min(100, Math.round((inp.clientWidth / Math.max(inp.scrollWidth, 1)) * 100)),
  };

  // --- dorado: UN uso por vista ---
  const dorados = [...document.querySelectorAll('*')]
    .filter((el) => {
      const s = getComputedStyle(el);
      return [s.color, s.backgroundColor, s.borderTopColor, s.borderLeftColor].some((c) =>
        /201,\s*162,\s*39/.test(c)
      );
    })
    .map((el) => el.className || el.tagName);

  // --- contrastes que importan ---
  const pares = {
    'rótulo del campo sobre navy': '.rotulo-campo',
    'texto del campo sobre su superficie': '#chq-dominio',
    'placeholder sobre su superficie': null,
    'nota atenuada sobre navy': '.nota',
    'cláusula del método (b) sobre navy': '.nota b',
    'botón del chequeo': '#chq-btn',
    'rótulo sobre brasa': '.puerta .rotulo',
    'titular de la puerta sobre brasa': '.puerta-titulo',
    'botón de la puerta': '.puerta-cta',
    'h1 sobre el lienzo': '.decir h1',
    'bajada sobre el lienzo': '.bajada',
    'rótulo de la sección siguiente': '.siguiente .rotulo',
    'aviso de cookies, párrafo': '#cookie-banner p',
  };
  const contrastes = {};
  for (const [k, s] of Object.entries(pares)) {
    if (!s) continue;
    const el = document.querySelector(s);
    if (el) contrastes[k] = contraste(el);
  }
  // placeholder: se mide con su color computado sobre el fondo de la caja
  {
    const caja = document.querySelector('.caja-campo');
    const bgc = fondoEfectivo(caja);
    const ph = getComputedStyle(inp, '::placeholder').color;
    let fg = parse(ph);
    if (fg) {
      if (fg[3] < 1) fg = [0, 1, 2].map((k) => fg[k] * fg[3] + bgc[k] * (1 - fg[3]));
      const L1 = lum(fg), L2 = lum(bgc);
      contrastes['placeholder sobre su superficie'] =
        Math.round(((Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05)) * 100) / 100;
    }
  }

  // --- tipografía: ¿cargó Manrope o cayó al fallback? ---
  const fuentes = {
    h1: getComputedStyle(document.querySelector('.decir h1')).fontFamily.split(',')[0].replace(/["']/g, ''),
    wordmark: getComputedStyle(document.querySelector('.wordmark')).fontFamily.split(',')[0].replace(/["']/g, ''),
    avisoCookies: getComputedStyle(document.querySelector('#cookie-banner p')).fontFamily.split(',')[0].replace(/["']/g, ''),
    manropeCargada: document.fonts.check('700 20px Manrope'),
    gabaritoCargada: document.fonts.check('400 20px Gabarito'),
    interCargada: document.fonts.check('400 14px Inter'),
  };

  // lineas de verdad: getClientRects sobre un BLOQUE devuelve la caja, no las
  // lineas. Hay que medirlas con un Range sobre el nodo de texto.
  function lineas(el) {
    const r = document.createRange();
    r.selectNodeContents(el);
    const ys = new Set([...r.getClientRects()].map((x) => Math.round(x.top)));
    return ys.size;
  }
  const h1 = document.querySelector('.decir h1');
  const baj = document.querySelector('.bajada');
  const banda = document.querySelector('.banda');
  const inst = document.querySelector('.instrumento');
  const pta = document.querySelector('.puerta');

  return {
    clientWidth: d.clientWidth,
    scrollWidth: d.scrollWidth,
    overflowHorizontal: d.scrollWidth > d.clientWidth,
    alturaVentana: vh,
    avisoCookies: { top: Math.round(br.top), alto: Math.round(br.height), visible: br.top < vh },
    pliegueUtil: Math.round(br.top), // lo que queda realmente a la vista
    banda: { top: Math.round(banda.getBoundingClientRect().top), alto: Math.round(banda.getBoundingClientRect().height) },
    instrumento: { ancho: Math.round(inst.getBoundingClientRect().width), alto: Math.round(inst.getBoundingClientRect().height) },
    puerta: { ancho: Math.round(pta.getBoundingClientRect().width), alto: Math.round(pta.getBoundingClientRect().height) },
    h1: { texto: h1.textContent.trim(), top: Math.round(h1.getBoundingClientRect().top), bottom: Math.round(h1.getBoundingClientRect().bottom), fontSize: getComputedStyle(h1).fontSize, lineas: lineas(h1), caracteres: h1.textContent.trim().length, palabras: h1.textContent.trim().split(/\s+/).length },
    bajada: { top: Math.round(baj.getBoundingClientRect().top), bottom: Math.round(baj.getBoundingClientRect().bottom), lineas: lineas(baj), caracteres: baj.textContent.trim().length },
    rotuloCampoLineas: lineas(document.querySelector('.rotulo-campo')),
    notaLineas: lineas(document.querySelector('.nota')),
    puertaTituloLineas: lineas(document.querySelector('.puerta-titulo')),
    siguiente: (() => { const e = document.querySelector('.siguiente'); const r = e.getBoundingClientRect(); return { top: Math.round(r.top), bottom: Math.round(r.bottom), encimaDelAviso: r.top < Math.round(br.top) }; })(),
    palabrasDelHero: document.querySelector('.hero').innerText.trim().split(/\s+/).filter(Boolean).length + document.querySelector('.nav-contacto').innerText.trim().split(/\s+/).length,
    campo,
    accionables,
    contrastes,
    fuentes,
    usosDeOro: dorados,
  };
};

// Cuántos caracteres caben de verdad en el campo, medidos uno a uno.
const capacidad = () => {
  const inp = document.getElementById('chq-dominio');
  const previo = inp.value;
  let n = 0;
  for (let i = 1; i <= 80; i++) {
    inp.value = 'n'.repeat(i);
    if (inp.scrollWidth > inp.clientWidth + 1) break;
    n = i;
  }
  // el mismo conteo con la mezcla real de un dominio chileno
  const muestra = 'constructorahermanosperez.cl';
  const larga = 'sociedadcomercialdelvalleylopez.cl';
  let m = 0;
  for (let i = 1; i <= muestra.length; i++) {
    inp.value = muestra.slice(0, i);
    if (inp.scrollWidth > inp.clientWidth + 1) break;
    m = i;
  }
  let L = 0;
  for (let i = 1; i <= larga.length; i++) {
    inp.value = larga.slice(0, i);
    if (inp.scrollWidth > inp.clientWidth + 1) break;
    L = i;
  }
  inp.value = previo;
  return { caracteresN: n, caracteresDominioReal: m, largoMuestra: muestra.length, caracteresDominioLargo: L, largoDominioLargo: larga.length };
};

const salida = {};
for (const v of vistas) {
  const ctx = await browser.newContext({
    viewport: { width: v.width, height: v.height },
    deviceScaleFactor: 2,
    isMobile: v.movil,
    hasTouch: v.movil,
    userAgent: v.movil
      ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
      : undefined,
  });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);

  const reposo = await page.evaluate(sonda);
  const cap = await page.evaluate(capacidad);

  if (v.n === '1440' || v.n === '390') {
    await page.screenshot({ path: `${DIR}/reposo-${v.n}.png` });
  }

  // --- ESTADO DE USO: tecleado de verdad, no value= puesto a mano ---
  await page.click('#chq-dominio');
  await page.type('#chq-dominio', DOMINIO, { delay: 8 });
  await page.waitForTimeout(250);
  const tecleadoConFoco = await page.evaluate(sonda);

  if (v.n === '1440' || v.n === '390') {
    // la captura de tecleado se toma con el foco fuera, para que se vea el estado
    // de reposo del campo CON el dominio dentro (que es lo que mira el visitante
    // justo antes de apretar el botón).
    await page.evaluate(() => document.activeElement.blur());
    await page.waitForTimeout(150);
    await page.screenshot({ path: `${DIR}/tecleado-${v.n}.png` });
  }
  const tecleado = await page.evaluate(sonda);

  if (v.n === '390') {
    await page.evaluate(() => {
      const i = document.getElementById('chq-dominio');
      i.value = '';
      i.focus();
    });
    await page.waitForTimeout(250);
    await page.screenshot({ path: `${DIR}/foco-390.png` });
  }

  salida[v.n] = { viewport: `${v.width}x${v.height}`, reposo, capacidadDelCampo: cap, tecleadoConFoco, tecleado };
  await ctx.close();
}
await browser.close();
console.log(JSON.stringify(salida, null, 2));
