// Maquetas del 30-oct: el texto elegido por Ramón, el botón en dos versiones del amarillo de Koto, la sección 2 y la línea
// del nombre, y el logo con la i corregida (dos versiones). Inyecta en el DOM del build; no toca el código del sitio.
// Uso: node maquetas.mjs <url-base> <carpeta-salida>
import { createRequire } from 'node:module';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
const require = createRequire('/home/user/spindlelab/spindlelab-astro/package.json');
const { chromium } = require('playwright');

const [base, salida] = process.argv.slice(2);
mkdirSync(salida, { recursive: true });

// El logo actual: la i es el subtrazo que empieza en «M175.12 0H193.62V-74.13C…» y cierra en «175.12 -74.13Z».
const logo = readFileSync('/home/user/spindlelab/spindlelab-astro/src/components/a/Logo.astro', 'utf8');
const d = logo.match(/ d="([^"]+)"/)[1];
const i0 = d.indexOf('M175.12 0H193.62V-74.13');
const i1 = d.indexOf('175.12 -74.13Z', i0) + '175.12 -74.13Z'.length;
const sinI = d.slice(0, i0) + d.slice(i1);
const asta = 'M175.12 0H193.62V-71.69H175.12Z';
const elipse = (cx, cy, rx, ry) => `M${cx - rx} ${cy}A${rx} ${ry} 0 1 0 ${cx + rx} ${cy}A${rx} ${ry} 0 1 0 ${cx - rx} ${cy}Z`;
const LOGOS = {
  'i-normal': sinI + asta + elipse(184.37, -91, 11, 11),
  'i-disco': sinI + asta + elipse(184.37, -91.5, 17, 6.5),
};
const VB = '3.34 -117.02 716.32 147.01';
for (const [k, v] of Object.entries(LOGOS)) {
  writeFileSync(`${salida}/logo-${k}.svg`, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${VB}"><path fill="#FFFFFF" d="${v}"/></svg>`);
}

const TEXTO = {
  rotulo: 'Sitios web a medida y marketing con IA',
  tinta: 'En redes arriendas.',
  gris: 'Tu sitio es lo único que es tuyo.',
  entradilla: 'El anuncio, el post, la búsqueda en Google y la respuesta de ChatGPT llevan a la misma dirección. Diseñamos y programamos esa dirección a medida, con un panel para que la edites tú, y conectamos lo demás a ella.',
  boton: 'Hablemos de tu sitio',
  microcopy: 'Si ya tienes uno, te lo revisamos gratis y en un día hábil te mandamos lo que encontramos. Si no, te contamos cómo lo haríamos y cuánto cuesta.',
  secundario: 'Ver cómo hacemos un sitio y cuánto cuesta',
  cabBoton: 'Hablemos',
  s2h2: 'Todo lo que haces para vender termina en tu sitio',
  s2p: 'El anuncio en Google, el post en Instagram, la respuesta de ChatGPT cuando alguien pregunta por tu rubro. Todos mandan a la persona al mismo lugar. Si ese lugar no explica bien lo que haces, o el formulario no te avisa cuando alguien escribe, lo que pagaste para traerla se pierde ahí.',
  redes: ['La plataforma decide a quién le muestra lo que publicas.', 'Tu cuenta depende de sus reglas.', 'Si te vas, tus seguidores se quedan.'],
  sitio: ['Tú decides qué dice y en qué orden.', 'Va en tu dominio.', 'Google y las IA pueden leerlo y citarlo.', 'Quien te escribe llega a tu correo.'],
  s2cierre: 'Por eso partimos por el sitio. Después le conectamos lo demás: que Google y ChatGPT lo entiendan, los anuncios en Google, tus redes y la medición de cada mes. No te decimos que dejes las redes: también las gestionamos.',
  nombre: 'Spindle, en inglés, es el eje: la pieza del motor que hace girar a las demás. En lo que hacemos, ese eje es tu sitio.',
};
const COLORES = {
  lleno: { background: '#FFE800', color: '#060606', border: '1px solid #FFE800' },
  contorno: { background: 'transparent', color: '#FFE800', border: '1px solid #FFE800' },
};

const navegador = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
for (const [ancho, alto] of [[1440, 900], [390, 844]]) {
  const ctx = await navegador.newContext({ viewport: { width: ancho, height: alto }, deviceScaleFactor: 2, reducedMotion: 'reduce' });
  const p = await ctx.newPage();
  await p.goto(base + '/', { waitUntil: 'networkidle' });
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find((x) => /rechazar/i.test(x.textContent)); if (b) b.click(); });
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(700);
  await p.evaluate(() => [...document.querySelectorAll('body *')].filter((n) => n.children.length === 0 && /quedaron rechazadas/i.test(n.textContent)).forEach((n) => { (n.closest('[role=status],[aria-live],div') || n).style.display = 'none'; }));
  await p.evaluate(({ T, logoD }) => {
    const q = (s) => document.querySelector(s);
    q('.portada-v__decl .rotulo').textContent = T.rotulo;
    q('#portada-titulo .tinta').textContent = T.tinta;
    q('#portada-titulo .gris').textContent = T.gris;
    q('.portada-v__decl .entradilla').textContent = T.entradilla;
    const cta = q('#portada-cta'); cta.firstChild.textContent = T.boton;
    const chicos = document.querySelectorAll('.portada-v__accion .chico');
    chicos[0].textContent = T.microcopy;
    chicos[1].querySelector('a').textContent = T.secundario;
    const cab = q('.cab__cta'); if (cab) cab.textContent = T.cabBoton;
    // El logo con la i normal en el encabezado y el pie.
    document.querySelectorAll('svg[aria-label="SpindleLab"] path').forEach((pa) => pa.setAttribute('d', logoD));
    // Sección 2
    const s2 = q('#h-problema').closest('section');
    q('#h-problema .tinta').textContent = T.s2h2;
    const cuerpo = s2.querySelector('.int-sec__cuerpo');
    const col = (t, items) => `<div><h3 class="int-lista__t tinta" style="margin-bottom:12px">${t}</h3>${items.map((x) => `<p class="cuerpo" style="padding:10px 0;border-top:1px solid rgba(255,255,255,.1)">${x}</p>`).join('')}</div>`;
    cuerpo.innerHTML = `<p class="cuerpo caja">${T.s2p}</p><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:24px;margin:32px 0">${col('En redes', T.redes)}${col('En tu sitio', T.sitio)}</div><p class="cuerpo caja">${T.s2cierre}</p>`;
    // La línea del nombre, en «Quién está detrás»
    const quien = q('#h-quien').closest('.quien__txt');
    const p1 = quien.querySelectorAll('p.cuerpo.caja')[0];
    const linea = document.createElement('p'); linea.className = 'cuerpo caja'; linea.textContent = T.nombre;
    p1.after(linea);
  }, { T: TEXTO, logoD: LOGOS['i-normal'] });
  for (const [nombre, c] of Object.entries(COLORES)) {
    await p.evaluate((c) => {
      document.querySelectorAll('#portada-cta, .cab__cta').forEach((b) => { Object.assign(b.style, c); });
    }, c);
    await p.evaluate(() => window.scrollTo(0, 0));
    await p.waitForTimeout(300);
    await p.screenshot({ path: `${salida}/portada-${nombre}-${ancho}.png` });
  }
  for (const [sel, id] of [['#h-problema', 'seccion2'], ['#h-quien', 'quien']]) {
    await p.evaluate((s) => { const el = document.querySelector(s).closest('section'); window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 70); }, sel);
    await p.waitForTimeout(500);
    await p.screenshot({ path: `${salida}/${id}-${ancho}.png` });
  }
  await ctx.close();
}

// Hoja del logo: actual y las dos opciones, a 24 px (el encabezado), 48 px y 140 px de alto, blanco sobre el lienzo.
const actualD = d;
const filas = [['Hoy (El huso)', actualD], ['Opción 1 · i normal', LOGOS['i-normal']], ['Opción 2 · i con disco', LOGOS['i-disco']]];
const svg = (dd, h) => `<svg viewBox="${VB}" style="height:${h}px;display:block"><path fill="#fff" d="${dd}"/></svg>`;
const html = `<!doctype html><meta charset="utf-8"><style>body{margin:0;background:#060606;color:#989898;font:500 13px/1.3 monospace;padding:40px}
.f{display:grid;grid-template-columns:220px auto auto 1fr;gap:48px;align-items:end;padding:28px 0;border-top:1px solid #2D2D2D}</style>
${filas.map(([t, dd]) => `<div class="f"><div>${t}</div>${svg(dd, 24)}${svg(dd, 48)}${svg(dd, 140)}</div>`).join('')}`;
const pg = await navegador.newPage({ viewport: { width: 1600, height: 760 }, deviceScaleFactor: 2 });
await pg.setContent(html);
await pg.screenshot({ path: `${salida}/logo-opciones.png`, fullPage: true });
await navegador.close();
