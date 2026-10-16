// generar.mjs — piezas reales de E9 (Bruno, 14-oct-2026)
//
// Dos fases, re-ejecutables:
//   1 · CAPTURA: pide los datos reales a los dominios propios y los guarda crudos, con fecha, en
//       crudo/<fecha de Chile>/ junto a un registro.json (url, método, user-agent, status, hora UTC
//       y de Chile, sha256 del cuerpo). Si una captura falla, queda el fallo en el registro y la
//       pieza que dependía de ella NO se hace. Nunca se rellena a mano.
//   2 · RENDER: arma cada pieza en HTML (html/), la rinde a PNG 2x con Playwright (salida/), saca
//       el JPEG reducido con croma completo, mide el oro (manual §07b) y escribe manifiesto.json.
//       Todo texto de una pieza es subcadena literal de su crudo o un conteo derivado de él con la
//       fórmula escrita en el manifiesto: el render lo comprueba y, si no cuadra, la pieza no sale.
//
// Uso (desde cualquier carpeta):
//   node generar.mjs                       captura hoy y rinde todo
//   node generar.mjs --sin-captura         rinde desde el crudo más nuevo (o --fecha=AAAA-MM-DD)
//   node generar.mjs --solo=l1,k2          rinde solo esas piezas (prefijo del id)
//   node generar.mjs --campo=l1:brasa      rinde una pieza de lectura en otro campo (archivo aparte)
//   node generar.mjs --sin-captura --paleta=e10 --solo=l2,l4,v1
//                                          rinde las de lectura en la paleta del lock E10 (papel y ciruela de
//                                          tableros/e10-direcciones/proto/e10/tokens.css; Instrument Sans,
//                                          IBM Plex Sans y Mono). Sale aparte, en salida-e10/, html-e10/ y
//                                          manifiesto-e10.json: no toca las piezas de E9. Campos: papel (el
//                                          de siempre), ciruela, amarillo, lima (--campo=v1:lima).
//   CHROME=<ruta> si el Chromium no está en /opt/pw-browsers (en la Mac, sin CHROME usa el de Playwright).
//
// Reglas que el script hace cumplir: cero datos tipeados, cero dominios de prospectos (las corridas del
// 31-ago se archivan solo con sus agregados), radio 6 NO horneado (lo pone el sitio), Manrope del sitio
// (Gabarito no va en piezas), texto al 100 % de opacidad y contraste ≥ 4,5:1 medido en las de lectura.

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const AQUI = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(AQUI, '../../../../../..');
const rel = (p) => path.relative(AQUI, p).split(path.sep).join('/');
const ARG = Object.fromEntries(process.argv.slice(2).map((a) => {
  const m = a.match(/^--([^=]+)(?:=(.*))?$/); return m ? [m[1], m[2] ?? true] : [a, true];
}));
const { chromium } = await import(pathToFileURL(path.join(REPO, 'spindlelab-astro/node_modules/playwright/index.mjs')).href);
const CHROME = process.env.CHROME || ['/opt/pw-browsers/chromium-1194/chrome-linux/chrome'].find((p) => fs.existsSync(p));
const VISTA_PREVIA = (ARG['vista-previa'] || 'https://claude-magical-franklin-ckfk.spindlelab-v2.pages.dev').replace(/\/$/, '');
const DOMINIOS = ['spindlelab.cl', 'verifica.spindlelab.cl'];

// ───────────────────────────── utilidades ─────────────────────────────
const sha = (b) => crypto.createHash('sha256').update(b).digest('hex');
function chile(d) {
  const p = Object.fromEntries(new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Santiago', year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZoneName: 'longOffset',
  }).formatToParts(d).map((x) => [x.type, x.value]));
  const off = (p.timeZoneName || 'GMT').replace('GMT', '') || '+00:00';
  return `${p.year}-${p.month}-${p.day}T${p.hour === '24' ? '00' : p.hour}:${p.minute}:${p.second}${off}`;
}
const escribir = (p, c) => { fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, c); };
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const py = (...a) => JSON.parse(execFileSync('python3', ['-I', path.join(AQUI, 'medir.py'), ...a], { encoding: 'utf8' }));
function git(...a) { try { return execFileSync('git', ['-C', REPO, ...a], { encoding: 'utf8' }); } catch { return null; } }

// Tokens de campo leídos de driftime.css (la fuente de verdad del sitio), no copiados a mano.
// Con --paleta=e10 (Lucía, 16-oct-2026) se leen de los tokens del lock E10, también sin copiarlos a mano.
const E10 = ARG.paleta === 'e10';
const E10_DIR = path.join(AQUI, '../../tableros/e10-direcciones/proto');
const CAMPOS = {};
if (E10) {
  const TK = fs.readFileSync(path.join(E10_DIR, 'e10/tokens.css'), 'utf8');
  const tk = (n) => { const m = TK.match(new RegExp(`--${n}:\\s*(#[0-9a-fA-F]{6})`)); if (!m) throw new Error(`no encontré --${n} en tokens.css de E10`); return m[1].toLowerCase(); };
  // Texto ciruela sobre los claros y papel sobre ciruela: los pares del lock §3 (16,27 a 18,71:1).
  CAMPOS.papel = { fondo: tk('papel'), texto: tk('ciruela') };
  CAMPOS.ciruela = { fondo: tk('ciruela'), texto: tk('papel') };
  CAMPOS.amarillo = { fondo: tk('amarillo'), texto: tk('ciruela') };
  CAMPOS.lima = { fondo: tk('lima'), texto: tk('ciruela') };
} else {
  const CSS = fs.readFileSync(path.join(REPO, 'spindlelab-astro/src/styles/driftime.css'), 'utf8');
  for (const c of ['brasa', 'navy', 'petroleo', 'ciruela']) {
    const f = CSS.match(new RegExp(`--d-${c}:\\s*(#[0-9a-fA-F]{6})`)); const t = CSS.match(new RegExp(`--d-${c}-t:\\s*(#[0-9a-fA-F]{6})`));
    if (!f || !t) throw new Error(`no encontré --d-${c} / --d-${c}-t en driftime.css`);
    CAMPOS[c] = { fondo: f[1].toLowerCase(), texto: t[1].toLowerCase() };
  }
}
// Fondos de estudio de los mockups (mockups/README.md y manual §07b). Ninguno cerca del oro.
const ESTUDIO = { verifica: '#C3C8EE', 'combeau-fotografia': '#C5CFC0' };

const FECHA = ARG.fecha || (ARG['sin-captura']
  ? fs.readdirSync(path.join(AQUI, 'crudo')).filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d)).sort().pop()
  : chile(new Date()).slice(0, 10));
const CRUDO = path.join(AQUI, 'crudo', FECHA);
const SALIDA = path.join(AQUI, E10 ? 'salida-e10' : 'salida');
const HTML = path.join(AQUI, E10 ? 'html-e10' : 'html');
const MANIFIESTO = path.join(AQUI, E10 ? 'manifiesto-e10.json' : 'manifiesto.json');
const FUENTE_CHECK = E10 ? "500 40px 'Instrument Sans'" : '500 40px Manrope';

// ───────────────────────────── 1 · CAPTURA ─────────────────────────────
// User-agents reales, leídos de la documentación de cada empresa en el momento de capturar.
const UA_DOCS = [
  { id: 'ua-openai', url: 'https://platform.openai.com/docs/bots' },
  { id: 'ua-perplexity', url: 'https://docs.perplexity.ai/guides/bots' },
  { id: 'ua-anthropic', url: 'https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler' },
];
// Anthropic publica solo el token (ClaudeBot), no la cadena completa. Esta es la que se ve en los
// registros de servidor; lo que se prueba es el filtro por nombre de agente, y el nombre es el token.
const UA_CLAUDEBOT = 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; ClaudeBot/1.0; +claudebot@anthropic.com)';

async function capturar() {
  fs.mkdirSync(CRUDO, { recursive: true });
  const registro = [];
  const nav = await chromium.launch({ executablePath: CHROME, args: ['--allow-file-access-from-files'] });
  const mayor = nav.version().split('.')[0];
  const UA_NAV = `Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${mayor}.0.0.0 Safari/537.36`;

  async function traer({ id, url, ua, guardar, validar }) {
    const t0 = new Date();
    const ent = { id, url, metodo: 'GET', user_agent: ua, hora_utc: t0.toISOString(), hora_chile: chile(t0) };
    let cuerpo = null;
    try {
      let actual = url; const cadena = [];
      let r = await fetch(actual, { headers: { 'user-agent': ua, accept: '*/*' }, redirect: 'manual', signal: AbortSignal.timeout(45000) });
      for (let i = 0; i < 5 && r.status >= 300 && r.status < 400 && r.headers.get('location'); i++) {
        cadena.push({ url: actual, status: r.status, location: r.headers.get('location') });
        actual = new URL(r.headers.get('location'), actual).href;
        r = await fetch(actual, { headers: { 'user-agent': ua, accept: '*/*' }, redirect: 'manual', signal: AbortSignal.timeout(45000) });
      }
      const buf = Buffer.from(await r.arrayBuffer());
      cuerpo = buf.toString('utf8');
      Object.assign(ent, { status: r.status, url_final: actual, redirecciones: cadena, content_type: r.headers.get('content-type'),
        cabeceras: Object.fromEntries(r.headers), bytes: buf.length, sha256: sha(buf) });
      Object.assign(ent, validar ? validar(cuerpo, r) : { ok: r.status === 200 });
      // Si no es lo que dice ser (la app HTML en vez de robots.txt), no se archiva el cuerpo con ese
      // nombre: queda su sha256 y el comienzo, que es la prueba del fallo.
      if (guardar && ent.ok) { escribir(path.join(CRUDO, guardar), buf); ent.archivo = guardar; }
      else if (!ent.ok) ent.inicio = cuerpo.slice(0, 160);
    } catch (e) { ent.ok = false; ent.error = String(e.message || e); }
    registro.push(ent);
    console.log(ent.ok ? 'ok  ' : 'FALLA', id, ent.status ?? '', ent.nota ?? ent.error ?? '');
    return { ent, cuerpo };
  }

  // 1a · documentación de user-agents → extracto literal (no se archiva el HTML de terceros entero)
  const docs = {};
  for (const d of UA_DOCS) {
    const { ent, cuerpo } = await traer({ id: d.id, url: d.url, ua: UA_NAV });
    if (!ent.ok || !cuerpo) continue;
    const lineas = [...new Set((cuerpo.match(/Mozilla\/5\.0[^<"`\\]*?(?:GPTBot|OAI-SearchBot|ChatGPT-User|PerplexityBot|Perplexity-User)\/[\d.]+;[^<"`\\]*/g) || [])
      .map((s) => s.trim()))];
    if (d.id === 'ua-anthropic') lineas.push(...new Set(cuerpo.match(/User-agent: ClaudeBot/g) || []));
    const txt = `# Extracto literal de ${d.url}\n# capturado ${ent.hora_utc} (sha256 del cuerpo completo: ${ent.sha256})\n${lineas.join('\n')}\n`;
    escribir(path.join(CRUDO, `ua/${d.id}.txt`), txt); ent.archivo = `ua/${d.id}.txt`; ent.extracto_lineas = lineas.length;
    docs[d.id] = lineas;
  }
  const pick = (id, token, sin) => (docs[id] || []).find((l) => l.includes(token + '/') && !(sin && l.includes(sin)));
  const AGENTES = [
    { id: 'gptbot', token: 'GPTBot', ua: pick('ua-openai', 'GPTBot'), fuente: 'ua/ua-openai.txt' },
    { id: 'claudebot', token: 'ClaudeBot', ua: UA_CLAUDEBOT, fuente: 'ua/ua-anthropic.txt (solo el token; la cadena completa es la de los registros de servidor)' },
    { id: 'perplexitybot', token: 'PerplexityBot', ua: pick('ua-perplexity', 'PerplexityBot'), fuente: 'ua/ua-perplexity.txt' },
    { id: 'oai-searchbot', token: 'OAI-SearchBot', ua: pick('ua-openai', 'OAI-SearchBot', 'robots.txt;'), fuente: 'ua/ua-openai.txt' },
    { id: 'navegador', token: 'Chrome', ua: UA_NAV, fuente: `Chromium ${nav.version()} de Playwright, en el formato reducido que manda Chrome de escritorio` },
  ];
  registro.push({ id: 'google-extended', ok: false, metodo: null, url: null, user_agent: null, hora_utc: new Date().toISOString(), hora_chile: chile(new Date()),
    nota: 'Google-Extended no aplica: es un token de robots.txt, no un user-agent. Google rastrea con Googlebot y el token solo decide si el texto se usa para Gemini; no hay forma de pedir la portada «como Google-Extended».' });

  for (const D of DOMINIOS) {
    const esTexto = (c, r) => /text\/plain/i.test(r.headers.get('content-type') || '') && !/^\s*<(!doctype|html)/i.test(c);
    await traer({ id: `${D}/robots.txt`, url: `https://${D}/robots.txt`, ua: UA_NAV, guardar: `${D}/robots.txt`,
      validar: (c, r) => (r.status === 200 && esTexto(c, r) && /^\s*user-agent\s*:/im.test(c))
        ? { ok: true } : { ok: false, nota: `no es un robots.txt: status ${r.status}, content-type ${r.headers.get('content-type')} (el servidor devuelve la aplicación HTML)` } });
    await traer({ id: `${D}/llms.txt`, url: `https://${D}/llms.txt`, ua: UA_NAV, guardar: `${D}/llms.txt`,
      validar: (c, r) => (r.status === 200 && esTexto(c, r)) ? { ok: true } : { ok: false, nota: `no hay llms.txt: status ${r.status}, content-type ${r.headers.get('content-type')}` } });
    await traer({ id: `${D}/sitemap.xml`, url: `https://${D}/sitemap.xml`, ua: UA_NAV, guardar: `${D}/sitemap.xml`,
      validar: (c, r) => /<urlset|<sitemapindex/.test(c)
        ? { ok: true, conteo_loc: (c.match(/<loc>/g) || []).length, tipo: /<sitemapindex/.test(c) ? 'sitemapindex' : 'urlset' }
        : { ok: false, nota: `no es un sitemap: status ${r.status}, content-type ${r.headers.get('content-type')}` } });
    for (const A of AGENTES) {
      if (!A.ua) { registro.push({ id: `${D}/portada-${A.id}`, ok: false, nota: `no se encontró el user-agent de ${A.token} en su documentación` }); continue; }
      const { ent, cuerpo } = await traer({ id: `${D}/portada-${A.id}`, url: `https://${D}/`, ua: A.ua,
        // La portada se archiva solo donde una pieza la usa (spindlelab.cl, JSON-LD). La de Verifica
        // no: su HTML público trae comentarios de código que nombran dominios de terceros, y nada
        // de terceros entra al crudo. De ella quedan el sha256 y el JSON-LD extraído.
        guardar: A.id === 'navegador' && D === 'spindlelab.cl' ? `${D}/portada.html` : null });
      ent.ua_fuente = A.fuente; ent.token = A.token;
      if (A.id === 'navegador' && ent.ok && cuerpo) {
        // JSON-LD de la portada: los bloques tal cual + la lista de @type y sus propiedades.
        const etiquetas = []; const bloques = []; const nodos = []; const errores = [];
        for (const m of cuerpo.matchAll(/(<script[^>]*type=["']?application\/ld\+json["']?[^>]*>)([\s\S]*?)<\/script>/gi)) {
          etiquetas.push(m[1]); bloques.push(m[2]);
          try {
            const j = JSON.parse(m[2]);
            for (const n of (j['@graph'] || (Array.isArray(j) ? j : [j]))) {
              nodos.push({ tipo: n['@type'], id: n['@id'] ?? null, propiedades: Object.keys(n).filter((k) => !k.startsWith('@')) });
            }
          } catch (e) { errores.push(String(e.message)); }
        }
        const t0 = new Date();
        escribir(path.join(CRUDO, `${D}/jsonld.json`), JSON.stringify({ fuente: ent.archivo || `https://${D}/ (portada no archivada; ver sha256)`, sha256_portada: ent.sha256, etiquetas, bloques, nodos, errores }, null, 1));
        registro.push({ id: `${D}/jsonld`, metodo: 'derivado', fuente: `${D}/portada.html`, sha256_fuente: ent.sha256, archivo: `${D}/jsonld.json`,
          hora_utc: t0.toISOString(), hora_chile: chile(t0), ok: nodos.length > 0 && !errores.length, nodos: nodos.length, bloques: bloques.length });
      }
    }
    await traer({ id: `${D}/chequeo-ia`, url: `https://spindlelab.cl/api/chequeo?dominio=${D}`, ua: UA_NAV, guardar: `${D}/chequeo-ia.json`,
      validar: (c) => { try { const j = JSON.parse(c); return j.ok ? { ok: true, puntaje: j.puntaje, items: j.items.length } : { ok: false, nota: j.error }; } catch (e) { return { ok: false, nota: 'no es JSON' }; } } });
  }
  // El chequeo de la Ley 21.719 (Verifica y Cumple) sobre spindlelab.cl: la tercera cifra del 36 → 73 → 100.
  await traer({ id: 'spindlelab.cl/chequeo-ley-21719', url: 'https://verifica.spindlelab.cl/api/chequeo?dominio=spindlelab.cl', ua: UA_NAV,
    guardar: 'spindlelab.cl/chequeo-ley-21719.json',
    validar: (c) => { try { const j = JSON.parse(c); return j.ok ? { ok: true, puntaje: j.puntaje } : { ok: false, nota: j.error }; } catch { return { ok: false, nota: 'no es JSON' }; } } });

  // 1b · pantallas reales con el navegador
  async function pantalla({ id, url, w, h, dpr, movil, apuntar, margen, preparar, recorte }) {
    const t0 = new Date(); const archivo = `pantallas/${id}.png`;
    const ent = { id: `pantalla/${id}`, url, metodo: 'navegador (Playwright)', user_agent: null, viewport: `${w}x${h}`, dpr, movil: !!movil, hora_utc: t0.toISOString(), hora_chile: chile(t0) };
    const ctx = await nav.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: dpr, isMobile: !!movil, hasTouch: !!movil, reducedMotion: 'reduce' });
    try {
      await ctx.addInitScript(() => { try { localStorage.setItem('spindlelab_consent', 'denied'); } catch (e) {} });
      const p = await ctx.newPage();
      ent.user_agent = await p.evaluate(() => navigator.userAgent);
      if (preparar) await preparar(p, ent);
      const r = await p.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
      ent.status = r.status();
      await p.evaluate(() => document.fonts.ready);
      if (preparar && preparar.despues) await preparar.despues(p, ent);
      if (apuntar) {
        const y = await p.evaluate(([t, m]) => {
          const el = [...document.querySelectorAll('h1,h2,h3,p,span')].find((e) => e.textContent.trim().toLowerCase() === t.toLowerCase());
          if (!el) return null;
          const top = el.getBoundingClientRect().top + scrollY - m; scrollTo(0, top); return top;
        }, [apuntar, margen]);
        if (y === null) throw new Error(`no encontré «${apuntar}» en ${url}`);
        ent.apuntado_a = apuntar; ent.scroll_y = y;
      }
      await p.waitForTimeout(1600);
      const opts = { path: path.join(CRUDO, archivo) };
      if (recorte) { Object.assign(opts, { clip: await recorte(p, ent), fullPage: true }); }
      await p.screenshot(opts);
      const buf = fs.readFileSync(path.join(CRUDO, archivo));
      Object.assign(ent, { archivo, sha256: sha(buf), bytes: buf.length, ok: ent.status === 200 });
    } catch (e) { ent.ok = false; ent.error = String(e.message || e); }
    await ctx.close();
    registro.push(ent);
    console.log(ent.ok ? 'ok  ' : 'FALLA', ent.id, ent.error ?? '');
    return ent;
  }
  // Verifica y Cumple, producto propio: dos secciones a 1440 y 390 (la cabecera fija del sitio queda).
  await pantalla({ id: 'verifica-ley-esc', url: 'https://verifica.spindlelab.cl/', w: 1440, h: 900, dpr: 2, apuntar: 'Lo que pide la ley', margen: 66 + 46 });
  await pantalla({ id: 'verifica-ley-cel', url: 'https://verifica.spindlelab.cl/', w: 390, h: 844, dpr: 3, movil: true, apuntar: 'Lo que pide la ley', margen: 99 + 30 });
  await pantalla({ id: 'verifica-revisamos-cel', url: 'https://verifica.spindlelab.cl/', w: 390, h: 844, dpr: 3, movil: true, apuntar: 'Lo que sí revisamos', margen: 99 + 26 });
  await pantalla({ id: 'verifica-como-cel', url: 'https://verifica.spindlelab.cl/', w: 390, h: 844, dpr: 3, movil: true, apuntar: 'Sin claves ni instalar nada', margen: 99 + 30 });

  // El chequeo de IA en la UI real de la vista previa /v3/diagnostico/, servido desde el JSON crudo
  // (no se vuelve a llamar a la API: lo que se ve es exactamente lo que quedó archivado).
  for (const D of DOMINIOS) {
    const f = path.join(CRUDO, `${D}/chequeo-ia.json`);
    if (!fs.existsSync(f) || !registro.find((e) => e.id === `${D}/chequeo-ia` && e.ok)) {
      registro.push({ id: `pantalla/chq-${D}`, ok: false, nota: 'sin JSON crudo del chequeo: no hay captura' }); continue;
    }
    const cuerpo = fs.readFileSync(f);
    const preparar = async (p, ent) => {
      ent.api_servida_desde = `${D}/chequeo-ia.json`; ent.api_sha256 = sha(cuerpo);
      await p.route('**/api/chequeo**', (r) => r.fulfill({ status: 200, contentType: 'application/json; charset=utf-8', body: cuerpo }));
    };
    preparar.despues = async (p) => {
      await p.fill('#chq-dominio', D); await p.click('#chq-btn');
      await p.waitForSelector('#chq-out .chq-score', { timeout: 20000 });
      await p.evaluate(() => scrollTo(0, 0));
    };
    for (const [id, sel, m] of [[`chq-out-${D}`, '#chq-out', 40], [`chq-score-${D}`, '#chq-out .chq-score', 0]]) {
      await pantalla({ id, url: `${VISTA_PREVIA}/v3/diagnostico/`, w: 1440, h: 900, dpr: 2, preparar,
        recorte: async (p, ent) => {
          const b = await p.evaluate((s) => { const r = document.querySelector(s).getBoundingClientRect(); return { x: r.left, y: r.top + scrollY, width: r.width, height: r.height }; }, sel);
          const texto = await p.evaluate((s) => document.querySelector(s).innerText, sel);
          escribir(path.join(CRUDO, `pantallas/${id}.txt`), texto); ent.texto = `pantallas/${id}.txt`; ent.caja_css = b;
          return { x: b.x - m, y: b.y - m, width: b.width + 2 * m, height: b.height + 2 * m };
        } });
    }
  }
  await nav.close();

  // 1c · fuentes locales del repo: extractos literales (con sha256 del archivo de origen y el HEAD).
  const head = (git('rev-parse', 'HEAD') || '').trim();
  function local(id, origen, contenido, nota) {
    const t0 = new Date(); const archivo = `locales/${id}`;
    escribir(path.join(CRUDO, archivo), contenido);
    const fuenteAbs = path.join(REPO, origen.split('@')[0]);
    registro.push({ id: `local/${id}`, metodo: 'lectura de archivo del repo', origen, git_head: head,
      sha256_origen: fs.existsSync(fuenteAbs) && !origen.includes('@') ? sha(fs.readFileSync(fuenteAbs)) : null,
      archivo, sha256: sha(Buffer.from(contenido)), hora_utc: t0.toISOString(), hora_chile: chile(t0), ok: true, nota });
  }
  // Corridas del 31-ago: SOLO los agregados. Las tablas «Por dominio» no se copian (cero prospectos).
  {
    const o = 'marketing/metricas/corridas-chequeo-2026-08-31.md';
    const lineas = fs.readFileSync(path.join(REPO, o), 'utf8').split('\n');
    const salida = []; let fuera = false;
    lineas.forEach((l, i) => {
      if (/^### Por dominio/.test(l)) fuera = true; else if (/^## /.test(l)) fuera = false;
      if (!fuera && (/^# |^## |^- Puntaje|^- Bajo 50|^\| Chequeo que falla|^\| Tienes preguntas frecuentes marcadas/.test(l))) {
        // Una línea que nombra un dominio (p. ej. la corrida fallida de un rubro) se corta antes del
        // paréntesis que lo trae: lo que queda sigue siendo literal, y el dominio no entra al crudo.
        const m = l.match(/\s*\([^)]*\b[a-z0-9-]+\.(?:cl|com|app|net|org)\b[^)]*\)/i);
        salida.push(`${String(i + 1).padStart(3)}: ${m ? l.slice(0, m.index) + '   [resto de la línea omitido: nombra un dominio]' : l}`);
      }
    });
    local('corridas-chequeo-2026-08-31.agregados.txt', o, `# Extracto literal (solo agregados, sin dominios) de ${o}\n# número de línea: texto\n${salida.join('\n')}\n`,
      'sin las tablas «Por dominio»: no se archiva ningún dominio de prospecto');
  }
  {
    const o = 'spindlelab-astro/src/data/obra-v3.json';
    const caso = JSON.parse(fs.readFileSync(path.join(REPO, o), 'utf8')).casos.find((c) => c.slug === 'verifica-y-cumple');
    local('obra-v3.verifica-y-cumple.json', o, JSON.stringify({ slug: caso.slug, rotulo: caso.rotulo, prueba: caso.prueba }, null, 1), 'casos[slug=verifica-y-cumple]: rotulo y prueba');
  }
  {
    const md = git('show', '1a0ae0a:ventas/casos-de-exito/verifica-y-cumple.md') || '';
    const m = md.match(/## El hallazgo incómodo[\s\S]*?(?=\n## )/);
    if (m) local('verifica-y-cumple@1a0ae0a.hallazgo.md', 'ventas/casos-de-exito/verifica-y-cumple.md@1a0ae0a', m[0] + '\n', 'sección «El hallazgo incómodo» tal cual, del commit 1a0ae0a (21-sep-2026)');
    else registro.push({ id: 'local/verifica-y-cumple@1a0ae0a', ok: false, nota: 'git show 1a0ae0a no devolvió la sección' });
  }
  {
    const o = 'spindlelab-astro/src/data/paginas-v3.json';
    const d = JSON.parse(fs.readFileSync(path.join(REPO, o), 'utf8')).diagnostico;
    local('paginas-v3.diagnostico.json', o, JSON.stringify({ title: d.title, description: d.description, h1: d.h1 }, null, 1), 'diagnostico: title, description y h1');
  }
  {
    const o = 'spindlelab-astro/src/data/blog-v3/21-chequeos-visibilidad-ia.html';
    const t = fs.readFileSync(path.join(REPO, o), 'utf8').match(/<table><thead><tr><th>Chequeo<\/th>[\s\S]*?<\/table>/);
    if (t) local('21-chequeos.tabla.html', o, t[0] + '\n', 'la tabla de los 21 chequeos con su peso, tal cual');
  }
  {
    const o = 'marketing/redes/2026-10-octubre/03-lo-que-no-se-ve/publicar.md';
    const l = fs.readFileSync(path.join(REPO, o), 'utf8').split('\n').map((x, i) => [i + 1, x]).filter(([, x]) => x.includes('chequeo de la Ley 21.719'));
    if (l.length) local('publicar-03-lo-que-no-se-ve.ley.txt', o, l.map(([n, x]) => `${n}: ${x}`).join('\n') + '\n', 'la línea que nombra «el chequeo de la Ley 21.719»');
  }
  for (const f of ['10-rediseno-mobile-editor-arreglado.png', '11-encuadre-widget-portada.png']) {
    const o = `marketing/encargos-otras-sesiones/revision-panel-admin-bernardo-capturas/${f}`;
    const log = (git('log', '--format=%h %ad', '--date=iso-strict', '--diff-filter=A', '--', o) || '').trim();
    const t0 = new Date();
    registro.push({ id: `local/combeau/${f}`, metodo: 'archivo del repo (no se copia)', origen: o, sha256: sha(fs.readFileSync(path.join(REPO, o))), entra_al_repo: log,
      hora_utc: t0.toISOString(), hora_chile: chile(t0), ok: true,
      nota: 'captura del panel de administración de bernardocombeau.cl. Sin hora de captura registrada; la revisión la fecha el 3-sep-2026 (revision-panel-admin-bernardo.md:56) y entra al repo en el commit indicado.' });
  }

  escribir(path.join(CRUDO, 'registro.json'), JSON.stringify({ fecha: FECHA, generador: 'e9/piezas/generar.mjs', capturas: registro }, null, 1));
  console.log(`registro: ${registro.length} entradas en ${rel(CRUDO)}/registro.json`);
}

// ───────────────────────────── 2 · RENDER ─────────────────────────────
const leer = (f) => fs.readFileSync(path.join(CRUDO, f), 'utf8');
const existe = (f) => fs.existsSync(path.join(CRUDO, f));
function cuerpoDe(f) {
  // Texto contra el que se comprueba: el archivo tal cual + (si es JSON) todos sus valores de texto.
  const raw = leer(f);
  if (!f.endsWith('.json')) return raw;
  const vals = []; const rec = (v) => { if (typeof v === 'string' || typeof v === 'number') vals.push(String(v)); else if (v && typeof v === 'object') Object.values(v).forEach(rec); };
  try { rec(JSON.parse(raw)); } catch {}
  return raw + '\n' + vals.join('\n');
}

const BASE_CSS = (w, h, c) => `
@font-face{font-family:'Manrope';font-style:normal;font-weight:400 800;src:url('../fuentes/manrope-latin-ext.woff2') format('woff2');unicode-range:U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}
@font-face{font-family:'Manrope';font-style:normal;font-weight:400 800;src:url('../fuentes/manrope-latin.woff2') format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${w}px;height:${h}px;overflow:hidden}
body{background:${c.fondo};color:${c.texto};font-family:'Manrope',sans-serif;font-weight:400;-webkit-font-smoothing:antialiased;position:relative;font-variant-numeric:tabular-nums}
.pie{position:absolute;left:48px;right:48px;bottom:40px;font-size:17px;line-height:1.3;font-weight:500;letter-spacing:0}
.g{padding:0}
.fil{border-top:1px solid color-mix(in srgb, ${c.texto} 32%, transparent)}
${E10 ? BASE_CSS_E10(c) : ''}`;
// Paleta E10 (lock-the-ready.md §2, §3 y §11): las cifras y los titulares en Instrument Sans 500 en caja de
// oración, las listas en IBM Plex Sans, y el pie como rótulo de IBM Plex Mono 500 en mayúsculas (+0,03em).
// Filete de 1 px en el color del texto, entero, como los de The Ready. Fuentes del tablero E10, por ruta relativa.
function BASE_CSS_E10(c) {
  const F = '../../../tableros/e10-direcciones/proto/fuentes/';
  const lat = 'unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD';
  return `
@font-face{font-family:'Instrument Sans';font-weight:400 700;src:url('${F}instrument-sans-latin.woff2') format('woff2');${lat}}
@font-face{font-family:'Instrument Sans';font-weight:400 700;src:url('${F}instrument-sans-flechas.woff2') format('woff2');unicode-range:U+2192,U+2197}
@font-face{font-family:'IBM Plex Sans';font-weight:400 700;src:url('${F}plex-sans-latin.woff2') format('woff2');${lat}}
@font-face{font-family:'IBM Plex Mono';font-weight:500;src:url('${F}plex-mono-500-latin.woff2') format('woff2');${lat}}
body{font-family:'Instrument Sans',sans-serif}
li,.pr,.x{font-family:'IBM Plex Sans',sans-serif}
.pie{font:500 15px/1.3 'IBM Plex Mono',monospace;letter-spacing:.03em;text-transform:uppercase}
.fil{border-top:1px solid ${c.texto}}
li:last-child,.fila:last-child{border-bottom-color:${c.texto}!important}
/* Instrument Sans es más angosta que Manrope: a -0,045em los ceros de «100» se tocan. */
.n{letter-spacing:-.02em!important}
`;
}
// Ajuste: baja el tamaño de un bloque marcado .ajusta hasta que su línea más ancha entre en el ancho.
const AJUSTA = `<script>document.fonts.ready.then(()=>{for(const b of document.querySelectorAll('.ajusta')){let s=parseFloat(getComputedStyle(b).fontSize);const max=b.clientWidth;const anchas=()=>Math.max(...[...b.querySelectorAll('[data-t]')].map(e=>{const r=document.createRange();r.selectNodeContents(e);return r.getBoundingClientRect().width}));while(anchas()>max&&s>12){s-=1;b.style.fontSize=s+'px'}}document.body.dataset.listo='1'})</script>`;
const pagina = (titulo, w, h, c, cuerpo, css = '') => `<!doctype html><html lang="es-CL"><head><meta charset="utf-8"><title>${esc(titulo)}</title><style>${BASE_CSS(w, h, c)}${css}</style></head><body>${cuerpo}${AJUSTA}</body></html>`;
const T = (texto, fuente, extra = '') => `<span data-t="${fuente}"${extra}>${esc(texto)}</span>`;
const G = (g) => `<span class="g" aria-hidden="true">${g}</span>`;
const SEP = (g) => ` ${G(g)} `;   // separador de lista: con espacios, para que la línea pueda cortar
const pie = (partes) => `<p class="pie">${partes.map(([t, f]) => T(t, f)).join(SEP('·'))}</p>`;
const hhmm = (hc) => hc ? hc.slice(11, 16).replace(/^0/, '') : '';

function definirPiezas(R) {
  const reg = (id) => R.capturas.find((e) => e.id === id);
  const okk = (id) => reg(id) && reg(id).ok;
  const P = [];

  // ── L1 · robots.txt de spindlelab.cl: los grupos que dejan entrar a GPTBot, PerplexityBot y ClaudeBot
  P.push({ id: 'l1-robots-spindlelab', tratamiento: 'lectura', campo: 'navy', w: 800, h: 800,
    requiere: ['spindlelab.cl/robots.txt'], fuentes: { robots: 'spindlelab.cl/robots.txt', registro: 'registro.json' },
    destino: 'campo navy: Visibilidad en IA, Auditoría SEO técnica, Diagnóstico; artículos de visibilidad en IA (destacada).',
    etiqueta_propuesta: 'spindlelab.cl · robots.txt · 14-oct-2026',
    nota: 'Las líneas tal cual del archivo, en su orden. Solo los tres robots que nombra el plan; el archivo deja entrar además a OAI-SearchBot, ChatGPT-User, Google-Extended y anthropic-ai (ver el crudo).',
    html() {
      const lineas = leer('spindlelab.cl/robots.txt').split(/\r?\n/);
      const grupos = [];
      for (const bot of ['GPTBot', 'PerplexityBot', 'ClaudeBot']) {
        const i = lineas.findIndex((l) => l.trim() === `User-agent: ${bot}`);
        if (i < 0) throw new Error(`robots.txt no tiene «User-agent: ${bot}»`);
        const g = [lineas[i].trim()]; for (let j = i + 1; j < lineas.length && lineas[j].trim() && !/^user-agent/i.test(lineas[j]); j++) g.push(lineas[j].trim());
        grupos.push([i, g]);
      }
      grupos.sort((a, b) => a[0] - b[0]);
      const r = reg('spindlelab.cl/robots.txt');
      return pagina(this.id, this.w, this.h, CAMPOS[this.campo],
        `<main class="ajusta">${grupos.map(([, g]) => `<div class="grupo">${g.map((l) => `<p>${T(l, 'robots')}</p>`).join('')}</div>`).join('')}</main>` +
        pie([[new URL(r.url).host, 'registro'], ['robots.txt', 'registro'], [r.hora_chile.slice(0, 10), 'registro']]),
        `main{position:absolute;left:48px;right:48px;top:60px;font-size:66px;line-height:1.14;font-weight:500;letter-spacing:-.02em;white-space:nowrap}
         .grupo+.grupo{margin-top:.95em}`);
    } });

  // ── L2 · lo que responde la portada de spindlelab.cl a cada user-agent
  const AG = ['gptbot', 'claudebot', 'perplexitybot', 'oai-searchbot', 'navegador'];
  P.push({ id: 'l2-respuesta-robots-spindlelab', tratamiento: 'lectura', campo: 'petroleo', w: 800, h: 680,
    requiere: AG.map((a) => `spindlelab.cl/portada-${a}`), fuentes: { registro: 'registro.json' },
    derivados: { 'GET /': { formula: 'registro: metodo «GET» + la ruta «/» de la url pedida (https://spindlelab.cl/)', valor: 'GET /' } },
    destino: 'campo petróleo: Acompañamiento mensual; también Auditoría (re-render en navy con --campo=l2:navy).',
    etiqueta_propuesta: 'spindlelab.cl · pedido con el user-agent de cada robot · 14-oct-2026',
    nota: 'Pedido con el user-agent de cada robot, desde este entorno y no desde los servidores de OpenAI, Anthropic o Perplexity: prueba el filtro por nombre de agente, no por dirección de origen (el mismo límite que declara el chequeo). Google-Extended no tiene fila: es un token de robots.txt, no un user-agent (registro).',
    html() {
      const filas = AG.map((a) => { const e = reg(`spindlelab.cl/portada-${a}`); const tok = e.user_agent.match(a === 'navegador' ? /Chrome\/[\d.]+/ : new RegExp(`${e.token}/[\\d.]+`))[0]; return [tok, String(e.status)]; });
      const r = reg('spindlelab.cl/portada-navegador');
      return pagina(this.id, this.w, this.h, CAMPOS[this.campo],
        `<main class="ajusta">${filas.map(([t, s], i) => `<div class="fila${i ? ' fil' : ''}">${T(t, 'registro')}${T(s, 'registro', ' class="st"')}</div>`).join('')}</main>` +
        pie([[new URL(r.url).host, 'registro'], ['GET /', 'd:GET /'], [r.hora_chile.slice(0, 10), 'registro']]),
        `main{position:absolute;left:48px;right:48px;top:44px;font-size:46px;line-height:1.15;font-weight:500;letter-spacing:-.02em}
         .fila{display:flex;justify-content:space-between;align-items:baseline;padding:22px 0;white-space:nowrap}
         .fila:first-child{padding-top:0}.st{font-weight:600}`);
    } });

  // ── L3 · el JSON-LD de la portada de spindlelab.cl: @type y propiedades
  P.push({ id: 'l3-jsonld-spindlelab', tratamiento: 'lectura', campo: 'brasa', w: 800, h: 860,
    requiere: ['spindlelab.cl/jsonld'], fuentes: { jsonld: 'spindlelab.cl/jsonld.json', portada: 'spindlelab.cl/portada.html', registro: 'registro.json' },
    destino: 'campo brasa: Desarrollo web (el SEO técnico va en el código); también Auditoría (--campo=l3:navy).',
    etiqueta_propuesta: 'spindlelab.cl · JSON-LD de la portada · 14-oct-2026',
    nota: 'Cada nodo del @graph con todas sus propiedades (sin las que empiezan con @), en el orden del archivo. Es la portada publicada hoy (v2): el día que la v3 vaya a la raíz, este JSON-LD cambia y la pieza se vuelve a capturar.',
    html() {
      const j = JSON.parse(leer('spindlelab.cl/jsonld.json'));
      const r = reg('spindlelab.cl/portada-navegador');
      return pagina(this.id, this.w, this.h, CAMPOS[this.campo],
        `<main><p class="tag">${T(j.etiquetas[0], 'portada')}</p>${j.nodos.map((n, i) => `<div class="nodo${i ? ' fil' : ''}"><p class="ty">${T(String(n.tipo), 'jsonld')}</p><p class="pr">${n.propiedades.map((k) => T(k, 'jsonld')).join(SEP('·'))}</p></div>`).join('')}</main>` +
        pie([[new URL(r.url).host, 'registro'], ['JSON-LD', 'chequeo'], [r.hora_chile.slice(0, 10), 'registro']]),
        `main{position:absolute;left:48px;right:48px;top:52px}
         .tag{font-size:21px;font-weight:500;margin-bottom:34px}
         .nodo{padding:22px 0 24px}.ty{font-size:46px;line-height:1.1;font-weight:600;letter-spacing:-.02em}
         .pr{font-size:21px;line-height:1.45;margin-top:10px;font-weight:400}`);
    }, fuentesExtra: { chequeo: 'spindlelab.cl/chequeo-ia.json' } });

  // ── L4 · los 21 chequeos con su peso, por bloque (el instrumento tal como responde hoy)
  P.push({ id: 'l4-21-chequeos', tratamiento: 'lectura', campo: 'petroleo', w: 1200, h: 760,
    requiere: ['spindlelab.cl/chequeo-ia', 'local/paginas-v3.diagnostico.json'], fuentes: { chequeo: 'spindlelab.cl/chequeo-ia.json', pag: 'locales/paginas-v3.diagnostico.json', registro: 'registro.json' },
    destino: 'Diagnóstico (la metodología 30/40/30 dibujada), destacada del artículo de los 21 chequeos, Acompañamiento mensual.',
    etiqueta_propuesta: 'Los 21 chequeos y su peso · 14-oct-2026',
    nota: 'Títulos, bloques y pesos tal como los devuelve /api/chequeo hoy (el instrumento, no el resultado de spindlelab.cl: la pieza no muestra qué pasó y qué no). Las sumas por bloque son derivadas. Contrastado con la tabla del artículo de los 21 chequeos: ver «cruce_articulo».',
    prep() {
      const j = JSON.parse(leer('spindlelab.cl/chequeo-ia.json'));
      if (j.items.length !== 21) throw new Error(`el chequeo devolvió ${j.items.length} chequeos, no 21`);
      const sumas = Object.fromEntries(j.bloques.map((b) => [b.id, j.items.filter((i) => i.bloque === b.id).reduce((a, i) => a + i.peso, 0)]));
      this.derivados = Object.fromEntries(j.bloques.map((b) => [`suma-${b.id}`, { valor: String(sumas[b.id]), formula: `suma de «peso» de los items con bloque «${b.id}» en chequeo-ia.json (${j.items.filter((i) => i.bloque === b.id).map((i) => i.peso).join(' + ')})` }]));
      this.derivados['21 chequeos'] = { valor: '21 chequeos', formula: 'items.length = 21 en chequeo-ia.json; la expresión «21 chequeos» es literal en paginas-v3.json (description)' };
      // Cruce con la tabla del artículo
      const tabla = existe('locales/21-chequeos.tabla.html') ? leer('locales/21-chequeos.tabla.html') : '';
      const filasArt = [...tabla.matchAll(/<tr><td>(.*?)<\/td><td>.*?<\/td><td>.*?<\/td><td>.*?<\/td><td>(\d+)<\/td><\/tr>/g)].map((m) => [m[1], +m[2]]);
      const dif = j.items.filter((i) => !filasArt.some(([t, p]) => t === i.titulo && p === i.peso)).map((i) => i.titulo);
      this.cruce_articulo = { filas_articulo: filasArt.length, coinciden: j.items.length - dif.length, distintas: dif };
      this.j = j;
    },
    html() {
      const j = this.j; const r = reg('spindlelab.cl/chequeo-ia');
      const col = (b) => `<section><p class="n">${T(this.derivados[`suma-${b.id}`].valor, `d:suma-${b.id}`)}</p><p class="b">${T(b.titulo, 'chequeo')}</p><ul>${j.items.filter((i) => i.bloque === b.id).map((i) => `<li class="fil">${T(i.titulo, 'chequeo')}${T(String(i.peso), 'chequeo', ' class="p"')}</li>`).join('')}</ul></section>`;
      return pagina(this.id, this.w, this.h, CAMPOS[this.campo], `<main>${j.bloques.map(col).join('')}</main>` +
        pie([['spindlelab.cl', 'registro'], ['21 chequeos', 'd:21 chequeos'], [r.hora_chile.slice(0, 10), 'registro']]),
        `main{position:absolute;left:48px;right:48px;top:44px;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:40px}
         .n{font-size:104px;line-height:1;font-weight:500;letter-spacing:-.04em}
         .b{font-size:24px;line-height:1.3;font-weight:600;margin:14px 0 18px}
         ul{list-style:none}li{display:flex;justify-content:space-between;gap:16px;padding:9px 0;font-size:17px;line-height:1.35}
         li:last-child{border-bottom:1px solid color-mix(in srgb, ${CAMPOS[this.campo].texto} 32%, transparent)}
         .p{font-weight:600;flex:none}`);
    } });

  // ── V1 · 36 → 73 → 100 (solo ficha de Verifica y Cumple en Trabajo)
  P.push({ id: 'v1-ley-36-73-100', tratamiento: 'lectura', campo: 'brasa', w: 1200, h: 600,
    requiere: ['spindlelab.cl/chequeo-ley-21719', 'local/obra-v3.verifica-y-cumple.json', 'local/verifica-y-cumple@1a0ae0a.hallazgo.md', 'local/publicar-03-lo-que-no-se-ve.ley.txt'],
    fuentes: { prueba: 'locales/obra-v3.verifica-y-cumple.json', ley: 'locales/publicar-03-lo-que-no-se-ve.ley.txt', registro: 'registro.json' },
    destino: 'SOLO la ficha de Verifica y Cumple en /v3/trabajo/. Nunca junto al chequeo de IA, ni en la home, ni en el JSON-LD (regla del 14-oct).',
    etiqueta_propuesta: 'spindlelab.cl en el chequeo de la Ley 21.719',
    nota: 'Cifras y fechas literales de la prueba aprobada (obra-v3.json, casos[verifica-y-cumple].prueba). 36 y 73 corroboradas en ventas/casos-de-exito/verifica-y-cumple.md@1a0ae0a («Sacó 36 de 100», «73 de 100»); el 100 corroborado hoy: verifica.spindlelab.cl/api/chequeo?dominio=spindlelab.cl devolvió puntaje 100 (spindlelab.cl/chequeo-ley-21719.json). Las flechas son glifos, no texto.',
    prep() {
      const hoy = JSON.parse(leer('spindlelab.cl/chequeo-ley-21719.json'));
      const md = leer('locales/verifica-y-cumple@1a0ae0a.hallazgo.md');
      if (hoy.puntaje !== 100) throw new Error(`el chequeo de la ley da hoy ${hoy.puntaje}, no 100: la frase del 14-oct no se sostiene`);
      if (!md.includes('36 de') || !md.includes('73 de')) throw new Error('el caso de 1a0ae0a no trae 36 y 73');
      this.corroboracion = { hoy_puntaje: hoy.puntaje, hoy_revisadoEn: hoy.revisadoEn, hoy_pesoConfirmado: hoy.pesoConfirmado, hoy_pesoTotal: hoy.pesoTotal, hoy_sinConfirmar: hoy.sinConfirmar };
    },
    html() {
      const r = reg('spindlelab.cl/chequeo-ley-21719');
      const c = (n, f, x = '') => `<div class="c"><p class="n">${T(n, 'prueba')}</p><p class="f">${T(f, 'prueba')}</p>${x}</div>`;
      return pagina(this.id, this.w, this.h, CAMPOS[this.campo],
        `<main>${c('36', '9 de septiembre')}${G('→')}${c('73', '21 de septiembre')}${G('→')}${c('100', '14 de octubre', `<p class="x">${T('ya con otra forma de puntuar', 'prueba')}</p>`)}</main>` +
        pie([['spindlelab.cl', 'registro'], ['chequeo de la Ley 21.719', 'ley'], [r.hora_chile.slice(0, 10), 'registro']]),
        `main{position:absolute;left:48px;right:48px;top:96px;display:flex;align-items:flex-start;gap:0}
         .c{flex:1 1 0}.n{font-size:176px;line-height:.9;font-weight:500;letter-spacing:-.045em}
         .f{font-size:26px;line-height:1.3;font-weight:600;margin-top:26px}.x{font-size:21px;line-height:1.35;margin-top:6px}
         main>.g{flex:none;font-size:64px;line-height:1;padding:44px 28px 0 0;font-weight:400}`);
    } });

  // ── K1 · 67 de 69 (espera OK)
  P.push({ id: 'k1-67-de-69', tratamiento: 'lectura', campo: 'navy', w: 800, h: 880, requiere_ok: true,
    requiere: ['local/corridas-chequeo-2026-08-31.agregados.txt'], fuentes: { corridas: 'locales/corridas-chequeo-2026-08-31.agregados.txt' },
    destino: 'propuesta: Diagnóstico, junto a «¿Te pueden citar?» de la metodología. Solo si Ramón lo marca (R7).',
    etiqueta_propuesta: 'Corridas del chequeo público · 31-ago-2026 · 69 sitios de dos rubros',
    nota: 'La esquina lleva la fecha del dato (31-ago-2026), no la de hoy, y no lleva dominio: la regla es «sin un solo dominio». Solo agregados: ningún dominio en la pieza ni en el crudo. Lo medido es el chequeo «faq» (nodo FAQPage o QAPage en el JSON-LD), no «responder preguntas». Ojo para la decisión: la home v3 también falla esta señal (pendientes-traspaso-detalle.md:816); la portada publicada hoy la pasa.',
    prep() {
      const t = leer('locales/corridas-chequeo-2026-08-31.agregados.txt');
      const rub = [...t.matchAll(/## (\S+) — (\d+) corridas ok/g)].map((m) => ({ rubro: m[1], n: +m[2] }));
      const fal = [...t.matchAll(/\| Tienes preguntas frecuentes marcadas \(`faq`\) \| (\d+) \|/g)].map((m) => +m[1]);
      if (rub.length !== 2 || fal.length !== 2) throw new Error('no encontré los dos rubros y sus fallas de faq');
      rub.forEach((r, i) => { r.falla = fal[i]; });
      const tot = rub.reduce((a, r) => a + r.n, 0); const fa = rub.reduce((a, r) => a + r.falla, 0);
      this.rub = rub;
      this.derivados = { '67 de 69': { valor: `${fa} de ${tot}`, formula: `fallan faq: ${rub.map((r) => r.falla).join(' + ')} = ${fa}; corridas ok: ${rub.map((r) => r.n).join(' + ')} = ${tot}` } };
      rub.forEach((r) => { this.derivados[`r-${r.rubro}`] = { valor: `${r.falla} de ${r.n}`, formula: `${r.rubro}: fila «Tienes preguntas frecuentes marcadas (\`faq\`)» = ${r.falla}; «${r.rubro} — ${r.n} corridas ok»` }; });
      if (this.derivados['67 de 69'].valor !== '67 de 69') throw new Error(`los agregados dan ${this.derivados['67 de 69'].valor}, no 67 de 69`);
    },
    html() {
      return pagina(this.id, this.w, this.h, CAMPOS[this.campo],
        `<main><p class="k">${T('Chequeo que falla', 'corridas')}</p><p class="ch">${T('Tienes preguntas frecuentes marcadas', 'corridas')}</p>
         <p class="big">${T('67 de 69', 'd:67 de 69')}</p><p class="sub">${T('Sitios que lo fallan', 'corridas')}</p>
         <div class="rubros">${this.rub.map((r) => `<div class="fila fil">${T(r.rubro, 'corridas')}${T(this.derivados[`r-${r.rubro}`].valor, `d:r-${r.rubro}`, ' class="v"')}</div>`).join('')}</div></main>` +
        pie([['Corridas del chequeo público', 'corridas'], ['31-ago-2026', 'corridas']]),
        `main{position:absolute;left:48px;right:48px;top:56px}
         .k{font-size:22px;font-weight:500}.ch{font-size:40px;line-height:1.15;font-weight:500;letter-spacing:-.02em;margin-top:10px}
         .big{font-size:184px;line-height:.95;font-weight:500;letter-spacing:-.05em;margin-top:92px;white-space:nowrap}
         .sub{font-size:26px;font-weight:500;margin-top:14px}
         .rubros{margin-top:70px}.fila{display:flex;justify-content:space-between;padding:18px 0;font-size:28px;font-weight:500}
         .fila:last-child{border-bottom:1px solid color-mix(in srgb, ${CAMPOS[this.campo].texto} 32%, transparent)}.v{font-weight:600}`);
    } });

  // ── K2 · el chequeo de IA en la UI real: spindlelab.cl 85 y verifica.spindlelab.cl 54 (espera OK)
  P.push({ id: 'k2-chequeo-ia-85-54', tratamiento: 'pantallas', campo: null, requiere_ok: true,
    requiere: DOMINIOS.map((d) => `pantalla/chq-score-${d}`),
    destino: 'propuesta: Diagnóstico o la ficha de Visibilidad en IA. Nunca junto al 36 → 73 → 100. Solo si Ramón lo marca.',
    etiqueta_propuesta: 'Dos dominios propios en el chequeo de visibilidad en IA · 14-oct-2026',
    nota: 'Las dos tarjetas de puntaje tal como las pinta /v3/diagnostico/ de la vista previa, con la respuesta servida desde el JSON crudo de hoy (no se llamó dos veces a la API). La lista completa de los 21 de cada dominio está en crudo/pantallas/chq-out-*.png por si se prefiere esa vista. AVISO: el veredicto de 70 a 89 del propio chequeo dice «…te cuestan menciones»; choca con el grep del brief §6 aunque no muestra ningún monitoreo.',
    escena() {
      const im = DOMINIOS.map((d) => ({ d, e: reg(`pantalla/chq-score-${d}`) }));
      const w = Math.round(im[0].e.caja_css.width) + 80;
      const h = Math.round(im.reduce((a, x) => a + x.e.caja_css.height, 0)) + 80 + 16;
      this.w = w; this.h = h;
      this.texto_en_pieza = im.flatMap((x) => leer(x.e.texto).split('\n').map((s) => s.trim()).filter(Boolean));
      this.fuente = { url: reg(`pantalla/chq-score-${DOMINIOS[0]}`).url, crudo: im.flatMap((x) => [x.e.archivo, x.e.texto, x.e.api_servida_desde]).map((f) => `crudo/${FECHA}/${f}`), capturado_utc: im[0].e.hora_utc, capturado_chile: im[0].e.hora_chile, api_capturada_utc: reg(`${DOMINIOS[0]}/chequeo-ia`).hora_utc };
      return pagina(this.id, w, h, { fondo: '#000000', texto: '#f7f5f0' },
        `<main>${im.map((x) => `<img src="${pathToFileURL(path.join(CRUDO, x.e.archivo)).href}" width="${Math.round(x.e.caja_css.width)}" height="${Math.round(x.e.caja_css.height)}" alt="">`).join('')}</main>`,
        `main{position:absolute;inset:40px;display:flex;flex-direction:column;gap:16px}img{display:block}`);
    } });

  // ── K3 · panel de Combeau (espera OK): editor de escritorio + editor en el teléfono
  P.push({ id: 'k3-panel-combeau', tratamiento: 'pantallas', campo: null, requiere_ok: true, w: 1600, h: 1200, fondo: ESTUDIO['combeau-fotografia'],
    requiere: ['local/combeau/11-encuadre-widget-portada.png', 'local/combeau/10-rediseno-mobile-editor-arreglado.png'],
    destino: 'propuesta: Desarrollo web, junto a la obra de Combeau. Solo con permiso ESCRITO de Bernardo (su ficha dice «caso público NO autorizado»; brief-de-obra.md:81 dice verbal el 30-sep).',
    etiqueta_propuesta: 'Combeau, fotografía · Cliente · panel de administración',
    nota: 'Capturas existentes del panel (no se pueden recapturar: piden sesión). Escritorio: el encuadre de la portada con la vista previa del sitio (1600×1100, se ve el 16:10 de arriba). Teléfono: el editor arreglado (390×844 a 1x: en el PNG 2x se ve blando; en el JPEG de 1600 queda nítido). Se lee el nombre de pila de un modelo en el campo de descripción («Antonio»): es el alt de una foto publicada del cliente, no un prospecto. Fondo salvia, el de Combeau fotografía. Sin hora en la barra del teléfono: la captura no la tiene registrada.',
    escena() {
      const o = (f) => reg(`local/combeau/${f}`).origen;
      const cel = path.join(REPO, o('10-rediseno-mobile-editor-arreglado.png'));
      const b = py('borde', cel);
      this.texto_en_pieza = ['(capturas de pantalla: el texto es el del panel capturado)'];
      const e = reg('local/combeau/11-encuadre-widget-portada.png');
      this.fuente = { archivo: [o('11-encuadre-widget-portada.png'), o('10-rediseno-mobile-editor-arreglado.png')], crudo: [`crudo/${FECHA}/registro.json (local/combeau/*: sha256 y commit)`], capturado_utc: null, capturado_chile: null, entra_al_repo: e.entra_al_repo, fechado_en_revision: '2026-09-03' };
      return { w: 1600, h: 1200, lx: '150px', ly: '215px', lw: '1120px', tx: '1120px', ty: '420px', tw: '310px', suelo: '1', fondo: this.fondo,
        esc: pathToFileURL(path.join(REPO, o('11-encuadre-widget-portada.png'))).href, cel: pathToFileURL(cel).href, barra: b.barra, tinta: b.tinta, hora: '' };
    } });

  // ── P1 · Verifica y Cumple: «Las 12 cosas» en notebook (1440) y teléfono (390)
  P.push({ id: 'p1-verifica-12-cosas', tratamiento: 'pantallas', campo: null, w: 1600, h: 1200, fondo: ESTUDIO.verifica,
    requiere: ['pantalla/verifica-ley-esc', 'pantalla/verifica-ley-cel'],
    destino: 'Desarrollo web, Trabajo (Verifica y Cumple) y cualquier interna que muestre obra. Sin cifras de resultado.',
    etiqueta_propuesta: 'Verifica y Cumple · Producto propio',
    nota: 'Capturas de hoy del sitio en vivo, la sección «Lo que pide la ley» (las 12 cosas del artículo 14 ter) a 1440 y a 390, con la cabecera fija del propio sitio. Montaje del procedimiento de mockups/README.md, fondo lavanda de Verifica. La hora de la barra del teléfono es la de la captura (registro).',
    escena() {
      const esc_ = reg('pantalla/verifica-ley-esc'), cel = reg('pantalla/verifica-ley-cel');
      const b = py('borde', path.join(CRUDO, cel.archivo));
      this.texto_en_pieza = ['(capturas de pantalla de verifica.spindlelab.cl)', hhmm(cel.hora_chile)];
      this.derivados = { hora: { valor: hhmm(cel.hora_chile), formula: `hora de Chile de la captura del teléfono (registro: ${cel.hora_chile})` } };
      this.fuente = { url: cel.url, crudo: [esc_.archivo, cel.archivo].map((f) => `crudo/${FECHA}/${f}`), capturado_utc: cel.hora_utc, capturado_chile: cel.hora_chile };
      return { w: 1600, h: 1200, lx: '150px', ly: '215px', lw: '1120px', tx: '1120px', ty: '420px', tw: '310px', suelo: '1', fondo: this.fondo,
        esc: pathToFileURL(path.join(CRUDO, esc_.archivo)).href, cel: pathToFileURL(path.join(CRUDO, cel.archivo)).href, barra: b.barra, tinta: b.tinta, hora: hhmm(cel.hora_chile) };
    } });

  // ── P2 · Verifica y Cumple: «Lo que sí revisamos» en el teléfono
  P.push({ id: 'p2-verifica-como-revisamos', tratamiento: 'pantallas', campo: null, w: 1000, h: 1100, fondo: ESTUDIO.verifica,
    requiere: ['pantalla/verifica-como-cel'],
    destino: 'Desarrollo web, Trabajo (Verifica y Cumple) y cualquier interna que muestre obra. Sin cifras de resultado.',
    etiqueta_propuesta: 'Verifica y Cumple · Producto propio',
    nota: 'Captura de hoy, a 390: la sección «Cómo revisamos tu sitio» (sin claves ni instalar nada; la fecha, lo que pide la ley y el resultado). Formato alto de los mockups (10:11). Se probó antes el bloque «Lo que sí revisamos» (fondo lima): da 0,16 % de oro por el antialias del texto oscuro sobre el lima, ver alternativas_descartadas.',
    escena() {
      const cel = reg('pantalla/verifica-como-cel');
      const b = py('borde', path.join(CRUDO, cel.archivo));
      this.texto_en_pieza = ['(captura de pantalla de verifica.spindlelab.cl)', hhmm(cel.hora_chile)];
      this.derivados = { hora: { valor: hhmm(cel.hora_chile), formula: `hora de Chile de la captura (registro: ${cel.hora_chile})` } };
      this.fuente = { url: cel.url, crudo: [`crudo/${FECHA}/${cel.archivo}`], capturado_utc: cel.hora_utc, capturado_chile: cel.hora_chile };
      return { w: 1000, h: 1100, tx: '220px', ty: '130px', tw: '560px', fondo: this.fondo,
        cel: pathToFileURL(path.join(CRUDO, cel.archivo)).href, barra: b.barra, tinta: b.tinta, hora: hhmm(cel.hora_chile) };
    } });

  // L1-L4: se marcan con lo que exigen para existir (requiere) — si falta, no hay pieza.
  for (const p of P) { p.ok_requisitos = (p.requiere || []).every(okk); p.faltan = (p.requiere || []).filter((r) => !okk(r)); }
  return P;
}

function contraste(a, b) {
  const L = (s) => { const [r, g, bb] = s.match(/[\d.]+/g).slice(0, 3).map(Number).map((v) => v / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)); return 0.2126 * r + 0.7152 * g + 0.0722 * bb; };
  const [x, y] = [L(a), L(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05);
}

async function render() {
  const R = JSON.parse(leer('registro.json'));
  const piezas = definirPiezas(R);
  // E10: las de lectura salen en papel (texto ciruela); otro campo, con --campo=<id>:<campo>.
  if (E10) for (const p of piezas) if (p.tratamiento === 'lectura') p.campo = 'papel';
  const solo = ARG.solo ? String(ARG.solo).split(',') : null;
  const variantes = ARG.campo ? String(ARG.campo).split(',').map((s) => s.split(':')) : [];
  // Un render completo parte de cero: así no quedan piezas viejas que el manifiesto ya no nombra.
  if (!solo && !variantes.length) for (const d of [SALIDA, HTML]) fs.rmSync(d, { recursive: true, force: true });
  fs.mkdirSync(SALIDA, { recursive: true }); fs.mkdirSync(HTML, { recursive: true });
  const nav = await chromium.launch({ executablePath: CHROME, args: ['--allow-file-access-from-files'] });
  const viejo = fs.existsSync(MANIFIESTO) ? JSON.parse(fs.readFileSync(MANIFIESTO, 'utf8')) : null;
  const hechas = []; const no_hechas = [];

  const trabajos = [];
  for (const p of piezas) {
    if (solo && !solo.some((s) => p.id.startsWith(s))) continue;
    trabajos.push([p, null]);
    for (const [pre, campo] of variantes) if (p.id.startsWith(pre) && p.tratamiento === 'lectura' && CAMPOS[campo]) trabajos.push([p, campo]);
  }
  for (const [p0, campoVar] of trabajos) {
    const p = campoVar ? Object.assign(Object.create(Object.getPrototypeOf(p0)), p0, { campo: campoVar, id: `${p0.id}--${campoVar}` }) : p0;
    if (!p.ok_requisitos) { no_hechas.push({ id: p.id, motivo: `falta captura: ${p.faltan.join(', ')}` }); console.log('NO  ', p.id, p.faltan.join(', ')); continue; }
    try {
      if (p.prep) p.prep();
      const ctx = await nav.newContext({ viewport: { width: p.w || 800, height: p.h || 800 }, deviceScaleFactor: 2 });
      const pg = await ctx.newPage();
      const png = path.join(SALIDA, `${p.id}.png`);
      let medicion = null;
      if (p.tratamiento === 'lectura' || p.id.startsWith('k2')) {
        const html = p.tratamiento === 'lectura' ? p.html() : p.escena();
        await pg.setViewportSize({ width: p.w, height: p.h });
        const f = path.join(HTML, `${p.id}.html`); escribir(f, html);
        await pg.goto(pathToFileURL(f).href); await pg.waitForLoadState('networkidle');
        await pg.waitForFunction(() => document.body.dataset.listo === '1');
        medicion = await pg.evaluate((FUENTE_CHECK) => {
          const opac = (e) => { let o = 1; for (let n = e; n && n.nodeType === 1; n = n.parentElement) o *= +getComputedStyle(n).opacity; return o; };
          const textos = [...document.querySelectorAll('[data-t]')].map((e) => { const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); return { t: e.textContent.replace(/\s+/g, ' ').trim(), f: e.dataset.t, color: cs.color, op: opac(e), caja: [r.left, r.top, r.right, r.bottom].map(Math.round), px: parseFloat(cs.fontSize) }; });
          const sueltos = []; const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
          while (tw.nextNode()) { const n = tw.currentNode; if (!n.textContent.trim()) continue; const el = n.parentElement; if (el.closest('[data-t],.g,script,style,title')) continue; sueltos.push(n.textContent.trim()); }
          const imgs = [...document.images].map((i) => ({ src: i.src, ok: i.complete && i.naturalWidth > 0 }));
          return { bg: getComputedStyle(document.body).backgroundColor, textos, sueltos, glifos: [...document.querySelectorAll('.g')].map((e) => e.textContent.trim()), fuente: document.fonts.check(FUENTE_CHECK), imgs, W: innerWidth, H: innerHeight };
        }, FUENTE_CHECK);
        // Comprobaciones: fuente cargada, nada fuera de caja, nada suelto, cada texto con su fuente.
        if (medicion.textos.length && !medicion.fuente) throw new Error(`${FUENTE_CHECK} no cargó`);
        if (medicion.imgs.some((i) => !i.ok)) throw new Error('una imagen no cargó');
        if (medicion.sueltos.length) throw new Error(`texto sin fuente declarada: ${medicion.sueltos.join(' | ')}`);
        const fuentes = { ...(p.fuentes || {}), ...(p.fuentesExtra || {}) };
        for (const t of medicion.textos) {
          if (t.f.startsWith('d:')) {
            const d = p.derivados && p.derivados[t.f.slice(2)];
            if (!d || d.valor !== t.t) throw new Error(`derivado «${t.t}» sin fórmula o con otro valor`);
            t.origen = `derivado: ${d.formula}`;
          } else {
            const f = fuentes[t.f]; if (!f) throw new Error(`fuente «${t.f}» no declarada`);
            if (!cuerpoDe(f).includes(t.t)) throw new Error(`«${t.t}» no está literal en ${f}`);
            t.origen = `literal en crudo/${FECHA}/${f}`;
          }
          const [x0, y0, x1, y1] = t.caja;
          if (x0 < 24 || y0 < 24 || x1 > medicion.W - 24 || y1 > medicion.H - 24) throw new Error(`«${t.t}» se sale del margen de 24 px: ${t.caja}`);
          if (t.op !== 1) throw new Error(`«${t.t}» con opacidad ${t.op}`);
          t.contraste = +contraste(t.color, medicion.bg).toFixed(2);
          if (p.tratamiento === 'lectura' && t.contraste < 4.5) throw new Error(`«${t.t}» a ${t.contraste}:1`);
        }
        await pg.screenshot({ path: png });
      } else {
        const params = p.escena();
        const f = path.join(AQUI, 'plantillas/escena.html');
        await pg.setViewportSize({ width: params.w, height: params.h });
        const qs = new URLSearchParams(Object.fromEntries(Object.entries(params).map(([k, v]) => [k, typeof v === 'number' ? v + 'px' : String(v)])));
        await pg.goto(`${pathToFileURL(f).href}?${qs}`); await pg.waitForLoadState('networkidle');
        await pg.evaluate(() => document.fonts.ready); await pg.waitForTimeout(300);
        const imgs = await pg.evaluate(() => [...document.images].map((i) => i.complete && i.naturalWidth > 0));
        if (!imgs.length || imgs.some((x) => !x)) throw new Error('una captura no cargó en la escena');
        escribir(path.join(HTML, `${p.id}.escena.json`), JSON.stringify({ plantilla: 'plantillas/escena.html', parametros: params }, null, 1));
        p.w = params.w; p.h = params.h;
        await pg.screenshot({ path: png });
      }
      await ctx.close();

      // JPEG, medidas, oro
      const jpgF = path.join(SALIDA, `${p.id}.jpg`);
      const dj = py('jpg', png, jpgF, '1600');
      const dims = JSON.parse(execFileSync('python3', ['-I', '-c', 'import sys,json;from PIL import Image;print(json.dumps(Image.open(sys.argv[1]).size))', png], { encoding: 'utf8' }));
      const oro = { png: py('oro', png), jpg: py('oro', jpgF) };

      // Versión de tablero para las que esperan OK: el mismo PNG con «Espera tu OK» arriba a la derecha.
      let tablero = null;
      if (p.requiere_ok) {
        const ctx2 = await nav.newContext({ viewport: { width: p.w, height: p.h }, deviceScaleFactor: 2 });
        const pg2 = await ctx2.newPage();
        const ft = path.join(HTML, `${p.id}-tablero.html`);
        escribir(ft, `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:'Manrope';font-weight:400 800;src:url('../fuentes/manrope-latin.woff2') format('woff2')}
*{margin:0;padding:0}html,body{width:${p.w}px;height:${p.h}px;overflow:hidden}body{position:relative}
img{display:block;width:${p.w}px;height:${p.h}px}
.sello{position:absolute;top:8px;right:8px;background:#f7f5f0;color:#000;font:600 ${p.w >= 1400 ? 24 : 16}px/1 'Manrope',sans-serif;padding:${p.w >= 1400 ? '10px 14px' : '7px 10px'};border-radius:4px;box-shadow:0 0 0 2px #000}
</style></head><body><img src="${pathToFileURL(png).href}" alt=""><div class="sello">Espera tu OK</div></body></html>`);
        await pg2.goto(pathToFileURL(ft).href); await pg2.waitForLoadState('networkidle'); await pg2.evaluate(() => document.fonts.ready);
        const pt = path.join(SALIDA, `${p.id}-tablero.png`); await pg2.screenshot({ path: pt }); await ctx2.close();
        const jt = path.join(SALIDA, `${p.id}-tablero.jpg`); py('jpg', pt, jt, '1600');
        tablero = { archivo: rel(pt), archivo_jpg: rel(jt), marca: 'Espera tu OK (texto del tablero, no de la pieza: no sale del crudo y no va al sitio)' };
      }

      const reg = (id) => R.capturas.find((e) => e.id === id);
      const textos = medicion && medicion.textos.length ? medicion.textos : null;
      const fuentePieza = p.fuente || (() => {
        const ids = p.requiere || []; const e = ids.map(reg).filter(Boolean);
        const primero = e.find((x) => x.url) || e[0];
        return { url: primero && primero.url, crudo: [...new Set(Object.values({ ...(p.fuentes || {}), ...(p.fuentesExtra || {}) }))].map((f) => `crudo/${FECHA}/${f}`),
          capturas: ids, capturado_utc: primero && primero.hora_utc, capturado_chile: primero && primero.hora_chile };
      })();
      hechas.push({
        id: p.id, archivo: rel(png), archivo_jpg: rel(jpgF), ancho: dims[0], alto: dims[1], jpg: dj,
        tratamiento: p.tratamiento, campo: p.campo, fondo: p.campo ? CAMPOS[p.campo].fondo : (p.fondo || '#000000'),
        texto_color: p.campo ? CAMPOS[p.campo].texto : null,
        fuente: fuentePieza,
        texto_en_pieza: textos ? textos.map((t) => t.t) : p.texto_en_pieza,
        texto_origen: textos ? textos.map((t) => ({ texto: t.t, origen: t.origen, px_css: t.px, contraste: t.contraste })) : undefined,
        derivados: p.derivados ? Object.entries(p.derivados).map(([k, d]) => ({ texto: d.valor, formula: d.formula })) : [],
        glifos: medicion ? [...new Set(medicion.glifos)] : [],
        contraste_min: textos && textos.length ? Math.min(...textos.map((t) => t.contraste)) : null,
        oro: { criterio: 'manual §07b: tono 38–54°, saturación ≥ 0,5, brillo ≥ 0,5; < 0,05 % es limpio', png: oro.png, jpg: oro.jpg, veredicto: oro.png.limpio && oro.jpg.limpio ? 'limpio' : 'CUENTA COMO ORO: la vista donde vaya no lleva el punto dorado' },
        requiere_ok: !!p.requiere_ok, tablero, destino: p.destino || null,
        etiqueta_propuesta: p.etiqueta_propuesta, nota: p.nota,
        ...(p.cruce_articulo ? { cruce_articulo: p.cruce_articulo } : {}),
        ...(p.corroboracion ? { corroboracion: p.corroboracion } : {}),
        html: p.tratamiento === 'lectura' || p.id.startsWith('k2') ? rel(path.join(HTML, `${p.id}.html`)) : rel(path.join(HTML, `${p.id}.escena.json`)),
      });
      console.log('ok  ', p.id, `${dims[0]}x${dims[1]}`, 'oro', oro.png.pct + '%', textos ? `contraste ≥ ${Math.min(...textos.map((t) => t.contraste))}:1` : '');
    } catch (e) {
      no_hechas.push({ id: p.id, motivo: String(e.message || e) }); console.log('NO  ', p.id, e.message);
    }
  }
  await nav.close();

  // Capturas que fallaron (y por qué): van al manifiesto aunque no tuvieran pieza.
  const fallidas = R.capturas.filter((e) => !e.ok).map((e) => ({ id: e.id, url: e.url, status: e.status ?? null, motivo: e.nota || e.error || 'falló' }));
  // Si se rindió solo una parte, se conservan las piezas del manifiesto anterior que no se tocaron.
  const previas = viejo && solo ? viejo.piezas.filter((x) => !hechas.some((h) => h.id === x.id)) : [];
  const t0 = new Date();
  const manifiesto = {
    obra: E10 ? 'E10 · piezas reales de E9 re-rendidas en la paleta del lock E10 (tablero de direcciones)' : 'E9 · piezas reales (Tanda A, primer juego)', autor: E10 ? 'Bruno (generador); paleta E10 de Lucía' : 'Bruno (persona-director-creativo)',
    ...(E10 ? { paleta: 'e10: tokens de tableros/e10-direcciones/proto/e10/tokens.css (papel, ciruela, amarillo, lima); Instrument Sans 500, IBM Plex Sans, IBM Plex Mono 500. Los datos y las reglas de texto son los mismos de E9.' } : {}),
    generado_utc: t0.toISOString(), generado_chile: chile(t0), fecha_crudo: FECHA,
    generador: 'e9/piezas/generar.mjs', como_regenerar: 'node generar.mjs (captura hoy y rinde) · node generar.mjs --sin-captura (rinde desde el crudo) · ver la cabecera del script',
    registro: `crudo/${FECHA}/registro.json`,
    reglas: [
      'Todo texto de una pieza es subcadena literal de su crudo o un conteo derivado con su fórmula (texto_origen); el render lo comprueba y si no cuadra la pieza no sale.',
      'Lectura: texto al 100 % de opacidad sobre el color del campo (tokens leídos de driftime.css), contraste medido ≥ 4,5:1, margen ≥ 24 px. Esquina inferior: dominio · qué es · fecha.',
      'Pantallas: capturas reales montadas con mockups/README.md (escena.html), sin texto agregado salvo la hora de la captura en la barra del teléfono.',
      'Sin radio horneado (lo pone el sitio). Manrope del sitio; Gabarito no va en piezas. Sin generación: nada de Higgsfield.',
      'Ninguna pieza lleva oro; se mide igual (oro.png / oro.jpg).',
    ],
    piezas: [...previas, ...hechas].sort((a, b) => a.id.localeCompare(b.id)),
    no_hechas: [...no_hechas],
    capturas_fallidas: fallidas,
    alternativas_descartadas: existe('pantallas/verifica-revisamos-cel.png') ? [{
      captura: `crudo/${FECHA}/pantallas/verifica-revisamos-cel.png`, que: 'Verifica y Cumple, bloque «Lo que sí revisamos» a 390 (fondo lima)',
      oro: py('oro', path.join(CRUDO, 'pantallas/verifica-revisamos-cel.png')),
      motivo: 'Pasa el umbral de 0,05 % por el antialias del texto oscuro sobre el lima (bordes de letra en tonos oliva de 45 a 50°). No es una zona dorada a simple vista, pero el criterio de brief §6 es numérico: se reemplazó por «Cómo revisamos tu sitio».',
    }] : [],
    crudo_util_para_el_tablero: [
      { archivo: `crudo/${FECHA}/pantallas/chq-out-spindlelab.cl.png`, que: 'el resultado completo del chequeo de IA de spindlelab.cl (85), los 21, en la UI de la vista previa' },
      { archivo: `crudo/${FECHA}/pantallas/chq-out-verifica.spindlelab.cl.png`, que: 'el resultado completo de verifica.spindlelab.cl (54)' },
    ],
    reutilizables_sin_regenerar: [
      { archivo: 'spindlelab-astro/public/assets/img/obra/mock-verifica-y-cumple-ancho.jpg', que: 'portada de Verifica y Cumple («¿Estás seguro?») en notebook y teléfono, 5-oct' },
      { archivo: 'spindlelab-astro/public/assets/img/obra/mock-verifica-y-cumple-alto.jpg', que: 'la misma portada en el teléfono, 5-oct' },
      { archivo: 'spindlelab-astro/public/assets/img/obra/mock-combeau-fotografia-ancho.jpg', que: 'bernardocombeau.cl, 5-oct' },
      { archivo: 'spindlelab-astro/public/assets/img/obra/mock-combeau-modelo-ancho.jpg', que: 'bernardocombeau.cl/modelo/, 5-oct (el -alto-2 cuenta como oro: palmera, §07b)' },
      { archivo: 'spindlelab-astro/public/assets/img/obra/mock-raigal-ancho.jpg', que: 'Raigal, SOLO con el rótulo de concepto primero' },
    ],
  };
  escribir(MANIFIESTO, JSON.stringify(manifiesto, null, 1));
  console.log(`manifiesto: ${manifiesto.piezas.length} piezas, ${no_hechas.length} no hechas, ${fallidas.length} capturas fallidas`);
}

if (!ARG['sin-captura']) await capturar();
await render();
