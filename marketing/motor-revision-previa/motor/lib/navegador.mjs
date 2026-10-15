// Sonda de dos tramos por CDP (estrategia §3). Cero clics.
//   Tramo A: cargar y esperar ~11 s sin tocar nada.
//   Tramo B: mousemove + rueda (sin clics) y esperar ~9 s mas.
// Registra POR SEPARADO: peticiones (cargo / envio), cookies (y quien las escribe) y capturas.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';

const dormir = (ms) => new Promise((r) => setTimeout(r, ms));

export function buscarChromium() {
  const cand = [process.env.CHROME_BIN, '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'].filter(Boolean);
  for (const c of cand) if (fs.existsSync(c)) return c;
  const base = '/opt/pw-browsers';
  if (fs.existsSync(base)) for (const d of fs.readdirSync(base)) {
    const p = path.join(base, d, 'chrome-linux', 'chrome');
    if (fs.existsSync(p)) return p;
  }
  throw new Error('No encuentro Chromium. Define CHROME_BIN.');
}

class CDP {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl); this.id = 0; this.pend = new Map(); this.manejadores = [];
    this.listo = new Promise((res, rej) => {
      this.ws.addEventListener('open', () => res());
      this.ws.addEventListener('error', () => rej(new Error('ws error')));
    });
    this.ws.addEventListener('message', (ev) => {
      const m = JSON.parse(ev.data);
      if (m.id !== undefined && this.pend.has(m.id)) {
        const { res, rej } = this.pend.get(m.id); this.pend.delete(m.id);
        m.error ? rej(new Error(JSON.stringify(m.error))) : res(m.result);
      } else if (m.method) for (const h of this.manejadores) h(m);
    });
  }
  on(fn) { this.manejadores.push(fn); }
  send(method, params = {}, sessionId) {
    const id = ++this.id;
    this.ws.send(JSON.stringify(sessionId ? { id, method, params, sessionId } : { id, method, params }));
    return new Promise((res, rej) => {
      this.pend.set(id, { res, rej });
      setTimeout(() => { if (this.pend.has(id)) { this.pend.delete(id); rej(new Error('timeout ' + method)); } }, 45000);
    });
  }
  cerrar() { try { this.ws.close(); } catch {} }
}

// Cookies de medicion o publicidad, por nombre. Quien las escribe es el script del proveedor,
// aunque queden en el dominio del sitio ("primera parte por dominio" NO es "propia").
export const COOKIES_RASTREO = [
  [/^_ga(_|$)/, 'Google Analytics'], [/^_gid$/, 'Google Analytics'], [/^_gat/, 'Google Analytics'],
  [/^_gcl_/, 'Google Ads'], [/^IDE$|^test_cookie$|^_gac_/, 'Google Ads'],
  [/^_fbp$|^_fbc$|^fr$/, 'Meta'], [/^_clck$|^_clsk$|^CLID$/, 'Microsoft Clarity'],
  [/^_hj/, 'Hotjar'], [/^_rdt_uuid$/, 'Reddit'], [/^_uet/, 'Microsoft Ads'],
  [/^__hstc$|^__hssc$|^__hssrc$|^hubspotutk$/, 'HubSpot'], [/^_ttp$|^_tt_/, 'TikTok'],
  [/^_pin_unauth$|^_pinterest/, 'Pinterest'], [/^li_|^lidc$|^bcookie$|^UserMatchHistory$/, 'LinkedIn'],
  [/^ajs_|^_hp2_/, 'Analitica de terceros'],
];
export function proveedorDeCookie(nombre) {
  for (const [re, prov] of COOKIES_RASTREO) if (re.test(nombre)) return prov;
  return null;
}

// Agrupa una peticion en "cargo" (script/libreria) o "envio" (peticion con datos de visita).
export function clasificarPeticion(url) {
  let u; try { u = new URL(url); } catch { return null; }
  const h = u.host, p = u.pathname, q = u.searchParams;
  if (/google-analytics\.com$|analytics\.google\.com$/.test(h) && /collect/.test(p))
    return { prov: 'Google Analytics', tipo: 'envio', gcs: q.get('gcs'), npa: q.get('npa'), evento: q.get('en'), tid: q.get('tid') };
  if (/(^|\.)googleadservices\.com$|doubleclick\.net$/.test(h) && /conversion|pagead|ddm/.test(p))
    return { prov: 'Google Ads', tipo: 'envio', gcs: q.get('gcs'), npa: q.get('npa') };
  if (/googletagmanager\.com$/.test(h) && /gtm\.js|gtag\/js/.test(p))
    return { prov: 'Google Tag', tipo: 'carga', id: q.get('id') };
  if (/facebook\.com$/.test(h) && p === '/tr/') return { prov: 'Meta', tipo: 'envio', evento: q.get('ev') };
  if (/connect\.facebook\.net$/.test(h)) return { prov: 'Meta', tipo: 'carga' };
  if (/clarity\.ms$/.test(h)) return { prov: 'Microsoft Clarity', tipo: /collect|\/b\?/.test(p) ? 'envio' : 'carga' };
  if (/hotjar\.com$|hotjar\.io$/.test(h)) return { prov: 'Hotjar', tipo: /\/api\/|\/c\/|events/.test(p) ? 'envio' : 'carga' };
  if (/redditstatic\.com$|reddit\.com$/.test(h) && /pixel/.test(p + h)) return { prov: 'Reddit', tipo: 'carga' };
  if (/px\.ads\.linkedin\.com$|snap\.licdn\.com$/.test(h)) return { prov: 'LinkedIn', tipo: /px\./.test(h) ? 'envio' : 'carga' };
  if (/analytics\.tiktok\.com$/.test(h)) return { prov: 'TikTok', tipo: 'carga' };
  if (/hs-scripts\.com$|hsforms\.|hs-analytics\.net$|hubspot\.com$/.test(h)) return { prov: 'HubSpot', tipo: 'carga' };
  return null;
}

const JS_DOM = `(() => {
  const vis = (el) => { const r = el.getBoundingClientRect(), s = getComputedStyle(el);
    return r.width > 40 && r.height > 20 && s.visibility !== 'hidden' && s.display !== 'none' && +s.opacity > 0.05 &&
           r.bottom > 0 && r.top < innerHeight; };
  const RE_AVISO = /cookie|consentimiento|rastre|tracking|privacidad/i;
  const RE_BOTON = /acept|permit|entend|de acuerdo|rechaz|deneg|configur|preferenc|\\bok\\b|allow|accept|reject/i;
  let aviso = null;
  const SEL = '#onetrust-banner-sdk,.cmplz-cookiebanner,#cookie-law-info-bar,.cky-consent-container,#CybotCookiebotDialog,.iubenda-cs-container,#cookie-notice,.cc-window,.cc-banner,[id*="cookie" i][class*="banner" i],[class*="cookie-banner" i],[class*="cookie-consent" i],[id*="consent" i]';
  for (const el of document.querySelectorAll(SEL)) if (vis(el) && (el.innerText || '').trim().length > 15) { aviso = el; break; }
  if (!aviso) for (const el of document.querySelectorAll('div,section,aside,dialog,form')) {
    const s = getComputedStyle(el); if (!/fixed|sticky/.test(s.position)) continue;
    const t = (el.innerText || '').trim();
    if (t.length < 20 || t.length > 900 || !vis(el) || !RE_AVISO.test(t)) continue;
    if ([...el.querySelectorAll('button,a,[role=button],input[type=button]')].some((b) => RE_BOTON.test(b.innerText || b.value || ''))) { aviso = el; break; }
  }
  const txt = (document.body ? document.body.innerText : '') || '';
  const abs = (h) => { try { return new URL(h, location.href).href; } catch { return h; } };
  return JSON.stringify({
    url: location.href, titulo: document.title,
    aviso: aviso ? { texto: (aviso.innerText || '').trim().slice(0, 160),
      botones: [...aviso.querySelectorAll('button,a,[role=button]')].map((b) => (b.innerText || '').trim()).filter(Boolean).slice(0, 5),
      implicito: /al continuar navegando|al seguir navegando|continuar navegando|al navegar/i.test(aviso.innerText || '') } : null,
    formularios: [...document.forms].map((f) => ({ action: f.getAttribute('action') || '', accion_abs: (typeof f.action === 'string' ? f.action : (f.getAttribute('action') ? abs(f.getAttribute('action')) : '')), metodo: (f.method || 'get').toLowerCase(),
      campos: f.querySelectorAll('input:not([type=hidden]):not([type=submit]):not([type=checkbox]):not([type=radio]),textarea,select').length, requeridos: f.querySelectorAll('[required]').length,
      visible: vis(f), pide_correo_o_tel: !!f.querySelector('input[type=email],input[type=tel],input[name*="mail" i],input[name*="tel" i],input[name*="fono" i]') })),
    enlaces: [...document.querySelectorAll('a[href]')].map((a) => ({ h: a.getAttribute('href') || '', t: (a.innerText || a.textContent || '').trim().slice(0, 80) })).slice(0, 600),
    politica: [...document.querySelectorAll('a[href]')].filter((a) => /privacidad|privacy|cookies|datos\\s*personales|protecci(o|ó)n\\s*de\\s*datos|pol(i|í)tica/i.test((a.getAttribute('href') || '') + ' ' + (a.innerText || ''))).map((a) => ({ h: abs(a.getAttribute('href')), t: (a.innerText || '').trim().slice(0, 60) })).slice(0, 10),
    largo_texto: txt.length, muestra: txt.slice(0, 500),
    cta_en_pantalla: [...document.querySelectorAll('a,button,[role=button],input[type=submit]')].filter((e) => vis(e)).map((e) => ({ t: ((e.innerText || e.value || '').trim()).slice(0, 50), h: e.getAttribute('href') || '' }))
      .filter((x) => /^(tel:|mailto:)|wa\\.me|whatsapp/i.test(x.h) || /cotiz|contact|escr[ií]b|whatsapp|llam|agend|reserv|solicit|hablemos|conversemos|comprar|carrito|inscrib|prueba|pide/i.test(x.t)).slice(0, 8),
    formulario_en_pantalla: [...document.forms].some((f) => vis(f) && f.querySelector('input[type=email],input[type=tel],textarea')),
    estructura: { h1: document.querySelectorAll('h1').length, h2: document.querySelectorAll('h2').length, palabras: txt.split(/\\s+/).filter(Boolean).length },
  });
})()`;

// Una corrida completa. Devuelve un objeto serializable. Guarda capturas JPEG en outDir.
export async function sondear(url, { outDir, etiqueta, esperaA = 11000, esperaB = 9000, chile = false } = {}) {
  fs.mkdirSync(outDir, { recursive: true });
  const perfil = fs.mkdtempSync(path.join(os.tmpdir(), 'motor-chrome-'));
  const proxy = process.env.HTTPS_PROXY || process.env.https_proxy;
  const args = ['--headless=new', '--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage', '--remote-debugging-port=0',
    `--user-data-dir=${perfil}`, '--no-first-run', '--no-default-browser-check', '--window-size=1280,900',
    ...(proxy ? [`--proxy-server=${proxy}`] : []), 'about:blank'];
  const proc = spawn(buscarChromium(), args, { stdio: 'ignore' });
  let cdp;
  try {
    const puertoArch = path.join(perfil, 'DevToolsActivePort');
    for (let i = 0; i < 60 && !fs.existsSync(puertoArch); i++) await dormir(250);
    if (!fs.existsSync(puertoArch)) throw new Error('Chromium no arranco');
    const [puerto, ruta] = fs.readFileSync(puertoArch, 'utf8').trim().split('\n');
    cdp = new CDP(`ws://127.0.0.1:${puerto}${ruta}`);
    await cdp.listo;

    const { browserContextId } = await cdp.send('Target.createBrowserContext', { disposeOnDetach: false });
    const { targetId } = await cdp.send('Target.createTarget', { url: 'about:blank', browserContextId });
    const { sessionId } = await cdp.send('Target.attachToTarget', { targetId, flatten: true });

    let fase = 'A';
    const peticiones = [], setCookies = [], porId = new Map(), bytesPorId = new Map();
    const sesiones = new Set([sessionId]);
    cdp.on(async (m) => {
      if (m.method === 'Target.attachedToTarget') {
        const sid = m.params.sessionId; sesiones.add(sid);
        try { await cdp.send('Network.enable', {}, sid); await cdp.send('Target.setAutoAttach', { autoAttach: true, waitForDebuggerOnStart: true, flatten: true }, sid); } catch {}
        try { await cdp.send('Runtime.runIfWaitingForDebugger', {}, sid); } catch {}
        return;
      }
      if (!sesiones.has(m.sessionId)) return;
      if (m.method === 'Network.requestWillBeSent') {
        const url = m.params.request.url;
        porId.set(m.params.requestId, url);
        peticiones.push({ fase, url: url.slice(0, 400), metodo: m.params.request.method, tipo: m.params.type, clasif: clasificarPeticion(url) });
      } else if (m.method === 'Network.loadingFinished') {
        bytesPorId.set(m.params.requestId, m.params.encodedDataLength || 0);
      } else if (m.method === 'Network.responseReceivedExtraInfo') {
        const sc = m.params.headers?.['set-cookie'] || m.params.headers?.['Set-Cookie'];
        if (sc) for (const linea of String(sc).split('\n')) {
          const nombre = linea.split('=')[0].trim();
          setCookies.push({ fase, nombre, desde: porId.get(m.params.requestId) ? new URL(porId.get(m.params.requestId)).host : null });
        }
      }
    });
    await cdp.send('Network.enable', {}, sessionId);
    await cdp.send('Page.enable', {}, sessionId);
    await cdp.send('Runtime.enable', {}, sessionId);
    await cdp.send('Target.setAutoAttach', { autoAttach: true, waitForDebuggerOnStart: true, flatten: true }, sessionId);
    await cdp.send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false }, sessionId);
    if (chile) {   // zona horaria e idioma de un visitante chileno. La IP NO se puede cambiar desde aqui.
      await cdp.send('Emulation.setTimezoneOverride', { timezoneId: 'America/Santiago' }, sessionId);
      await cdp.send('Emulation.setLocaleOverride', { locale: 'es-CL' }, sessionId);
      await cdp.send('Network.setExtraHTTPHeaders', { headers: { 'Accept-Language': 'es-CL,es;q=0.9' } }, sessionId);
    }

    const foto = async (nombre) => {
      const f = await cdp.send('Page.captureScreenshot', { format: 'jpeg', quality: 55 }, sessionId);
      const archivo = `${etiqueta}-${nombre}.jpg`;
      fs.writeFileSync(path.join(outDir, archivo), Buffer.from(f.data, 'base64'));
      return archivo;
    };
    const dom = async () => {
      try { return JSON.parse((await cdp.send('Runtime.evaluate', { expression: JS_DOM, returnByValue: true }, sessionId)).result.value); }
      catch (e) { return { error: String(e.message) }; }
    };
    const cookies = async () => (await cdp.send('Network.getAllCookies', {}, sessionId)).cookies
      .map((c) => ({ nombre: c.name, dominio: c.domain, expira_dias: c.session ? 0 : Math.round((c.expires - Date.now() / 1000) / 86400) }));

    await cdp.send('Page.navigate', { url }, sessionId);
    await dormir(esperaA);
    const A = { cookies: await cookies(), dom: await dom(), captura: await foto('A') };

    fase = 'B';
    for (const [x, y] of [[300, 300], [420, 380], [560, 460], [700, 520], [820, 600]]) {
      await cdp.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x, y, button: 'none', buttons: 0 }, sessionId); await dormir(180);
    }
    for (let i = 0; i < 6; i++) {
      await cdp.send('Input.dispatchMouseEvent', { type: 'mouseWheel', x: 640, y: 450, button: 'none', buttons: 0, deltaX: 0, deltaY: 420 }, sessionId); await dormir(500);
    }
    await dormir(esperaB);
    const B = { cookies: await cookies(), dom: await dom(), captura: await foto('B') };

    let html = '';
    try { html = (await cdp.send('Runtime.evaluate', { expression: 'document.documentElement.outerHTML', returnByValue: true }, sessionId)).result.value || ''; } catch {}
    try { await cdp.send('Target.closeTarget', { targetId }); } catch {}
    const pesos = [...bytesPorId].map(([id, b]) => ({ url: (porId.get(id) || '').slice(0, 160), bytes: b })).sort((x, y) => y.bytes - x.bytes);
    const peso = { total_bytes: pesos.reduce((a, x) => a + x.bytes, 0), n_peticiones: porId.size, mas_pesados: pesos.slice(0, 4) };
    return { url, cuando: new Date().toISOString(), A, B, peticiones, setCookies, peso, html_len: html.length, html_ejecutado: html.slice(0, 400000) };
  } finally {
    if (cdp) cdp.cerrar();
    try { proc.kill('SIGKILL'); } catch {}
    try { fs.rmSync(perfil, { recursive: true, force: true }); } catch {}
  }
}


// Corrida MOVIL (390x844, UA de iPhone): carga y espera ~7 s. Mide lo que un visitante con celular ve. Sin clics.
export async function sondearMovil(url, { outDir, etiqueta, espera = 7000 } = {}) {
  fs.mkdirSync(outDir, { recursive: true });
  const perfil = fs.mkdtempSync(path.join(os.tmpdir(), 'motor-chrome-'));
  const proxy = process.env.HTTPS_PROXY || process.env.https_proxy;
  const args = ['--headless=new', '--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage', '--remote-debugging-port=0', `--user-data-dir=${perfil}`, '--no-first-run',
    ...(proxy ? [`--proxy-server=${proxy}`] : []), 'about:blank'];
  const proc = spawn(buscarChromium(), args, { stdio: 'ignore' });
  let cdp;
  try {
    const puertoArch = path.join(perfil, 'DevToolsActivePort');
    for (let i = 0; i < 60 && !fs.existsSync(puertoArch); i++) await dormir(250);
    const [puerto, ruta] = fs.readFileSync(puertoArch, 'utf8').trim().split('\n');
    cdp = new CDP(`ws://127.0.0.1:${puerto}${ruta}`); await cdp.listo;
    const { browserContextId } = await cdp.send('Target.createBrowserContext', { disposeOnDetach: false });
    const { targetId } = await cdp.send('Target.createTarget', { url: 'about:blank', browserContextId });
    const { sessionId } = await cdp.send('Target.attachToTarget', { targetId, flatten: true });
    await cdp.send('Page.enable', {}, sessionId); await cdp.send('Runtime.enable', {}, sessionId);
    await cdp.send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true }, sessionId);
    await cdp.send('Emulation.setUserAgentOverride', { userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1', acceptLanguage: 'es-CL' }, sessionId);
    await cdp.send('Emulation.setTimezoneOverride', { timezoneId: 'America/Santiago' }, sessionId);
    await cdp.send('Page.navigate', { url }, sessionId); await dormir(espera);
    const r = await cdp.send('Runtime.evaluate', { returnByValue: true, expression: `(() => {
      const vis = (el) => { const r = el.getBoundingClientRect(), s = getComputedStyle(el); return r.width > 20 && r.height > 14 && s.visibility !== 'hidden' && s.display !== 'none' && +s.opacity > 0.05 && r.bottom > 0 && r.top < innerHeight; };
      const de = document.documentElement;
      const chicos = [...document.querySelectorAll('p,li,span,a')].filter((e) => (e.innerText || '').trim().length > 20 && vis(e)).map((e) => parseFloat(getComputedStyle(e).fontSize));
      return JSON.stringify({ ancho_viewport: innerWidth, ancho_contenido: de.scrollWidth, desborde_px: de.scrollWidth - innerWidth, meta_viewport: !!document.querySelector('meta[name=viewport]'),
        cta_en_pantalla: [...document.querySelectorAll('a,button,[role=button]')].filter((e) => vis(e)).map((e) => ({ t: (e.innerText || '').trim().slice(0, 40), h: e.getAttribute('href') || '' }))
          .filter((x) => /^(tel:|mailto:)|wa\\.me|whatsapp/i.test(x.h) || /cotiz|contact|escr[ií]b|whatsapp|llam|agend|reserv|solicit|hablemos|conversemos|comprar|inscrib|prueba/i.test(x.t)).length,
        fuente_minima_px: chicos.length ? Math.min(...chicos) : null, textos_chicos_pct: chicos.length ? Math.round(100 * chicos.filter((x) => x < 12).length / chicos.length) : null });
    })()` }, sessionId);
    const datos = JSON.parse(r.result.value);
    const f = await cdp.send('Page.captureScreenshot', { format: 'jpeg', quality: 55 }, sessionId);
    const archivo = `${etiqueta}-movil.jpg`; fs.writeFileSync(path.join(outDir, archivo), Buffer.from(f.data, 'base64'));
    return { ...datos, captura: archivo };
  } finally { if (cdp) cdp.cerrar(); try { proc.kill('SIGKILL'); } catch {} try { fs.rmSync(perfil, { recursive: true, force: true }); } catch {} }
}
