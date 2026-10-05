// Sonda CDP, contexto nuevo por sitio, cero clics.
//   Tramo A: cargar y esperar 11s SIN TOCAR NADA.
//   Tramo B: mousemove + scroll (sin clics) y esperar 9s mas.
// Uso: node probe.mjs <url> <slug> <outdir>
import fs from 'node:fs';
import path from 'node:path';

const [, , URL_ARG, SLUG, OUTDIR] = process.argv;
const PORT = 9530;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

class CDP {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl); this.id = 0; this.pending = new Map(); this.handlers = [];
    this.ready = new Promise((res, rej) => {
      this.ws.addEventListener('open', () => res());
      this.ws.addEventListener('error', () => rej(new Error('ws error')));
    });
    this.ws.addEventListener('message', (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.id !== undefined && this.pending.has(msg.id)) {
        const { res, rej } = this.pending.get(msg.id); this.pending.delete(msg.id);
        msg.error ? rej(new Error(JSON.stringify(msg.error))) : res(msg.result);
      } else if (msg.method) { for (const h of this.handlers) h(msg); }
    });
  }
  on(fn) { this.handlers.push(fn); }
  send(method, params = {}, sessionId) {
    const id = ++this.id;
    this.ws.send(JSON.stringify(sessionId ? { id, method, params, sessionId } : { id, method, params }));
    return new Promise((res, rej) => {
      this.pending.set(id, { res, rej });
      setTimeout(() => { if (this.pending.has(id)) { this.pending.delete(id); rej(new Error('timeout ' + method)); } }, 45000);
    });
  }
  close() { this.ws.close(); }
}

const version = await (await fetch(`http://127.0.0.1:${PORT}/json/version`)).json();
const cdp = new CDP(version.webSocketDebuggerUrl);
await cdp.ready;

const { browserContextId } = await cdp.send('Target.createBrowserContext', { disposeOnDetach: false });
const { targetId } = await cdp.send('Target.createTarget', { url: 'about:blank', browserContextId });
const { sessionId } = await cdp.send('Target.attachToTarget', { targetId, flatten: true });

let phase = 'A';
const requests = [];
const sessions = new Map([[sessionId, { type: 'page', url: URL_ARG }]]);
cdp.on(async (msg) => {
  if (msg.method === 'Target.attachedToTarget') {
    const sid = msg.params.sessionId;
    sessions.set(sid, { type: msg.params.targetInfo.type, url: msg.params.targetInfo.url });
    try {
      await cdp.send('Network.enable', {}, sid);
      await cdp.send('Target.setAutoAttach', { autoAttach: true, waitForDebuggerOnStart: true, flatten: true }, sid);
    } catch (e) {}
    try { await cdp.send('Runtime.runIfWaitingForDebugger', {}, sid); } catch (e) {}
    return;
  }
  if (!sessions.has(msg.sessionId)) return;
  if (msg.method === 'Network.requestWillBeSent') {
    requests.push({ phase, url: msg.params.request.url, method: msg.params.request.method,
      type: msg.params.type, hasPost: !!msg.params.request.hasPostData,
      via: sessions.get(msg.sessionId).type });
  }
});

await cdp.send('Network.enable', {}, sessionId);
await cdp.send('Page.enable', {}, sessionId);
await cdp.send('Runtime.enable', {}, sessionId);
await cdp.send('Target.setAutoAttach', { autoAttach: true, waitForDebuggerOnStart: true, flatten: true }, sessionId);
await cdp.send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false }, sessionId);

await cdp.send('Page.navigate', { url: URL_ARG }, sessionId);
await sleep(11000);

const cookiesA = (await cdp.send('Network.getAllCookies', {}, sessionId)).cookies;
const shotA = await cdp.send('Page.captureScreenshot', { format: 'png' }, sessionId);
fs.writeFileSync(path.join(OUTDIR, `shot-${SLUG}-A.png`), Buffer.from(shotA.data, 'base64'));

// ---- TRAMO B: mousemove + scroll. Ningun boton se presiona.
phase = 'B';
for (const [x, y] of [[300, 300], [420, 380], [560, 460], [700, 520], [820, 600]]) {
  await cdp.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x, y, button: 'none', buttons: 0 }, sessionId);
  await sleep(180);
}
for (let i = 0; i < 6; i++) {
  await cdp.send('Input.dispatchMouseEvent', { type: 'mouseWheel', x: 640, y: 450, button: 'none', buttons: 0, deltaX: 0, deltaY: 420 }, sessionId);
  await sleep(500);
}
await sleep(9000);

const cookiesB = (await cdp.send('Network.getAllCookies', {}, sessionId)).cookies;
const shotB = await cdp.send('Page.captureScreenshot', { format: 'png' }, sessionId);
fs.writeFileSync(path.join(OUTDIR, `shot-${SLUG}-B.png`), Buffer.from(shotB.data, 'base64'));

// volver arriba para la captura "primera pantalla" tras el tramo B
for (let i = 0; i < 10; i++) {
  await cdp.send('Input.dispatchMouseEvent', { type: 'mouseWheel', x: 640, y: 450, button: 'none', buttons: 0, deltaX: 0, deltaY: -600 }, sessionId);
  await sleep(120);
}
await sleep(1500);
const shotT = await cdp.send('Page.captureScreenshot', { format: 'png' }, sessionId);
fs.writeFileSync(path.join(OUTDIR, `shot-${SLUG}-top.png`), Buffer.from(shotT.data, 'base64'));

let info = {};
try {
  const r = await cdp.send('Runtime.evaluate', {
    expression: `JSON.stringify({
      u: location.href,
      t: document.title,
      links: [...document.querySelectorAll('a[href]')].map(a => ({h:a.getAttribute('href'), x:(a.innerText||a.textContent||'').trim().slice(0,90)})),
      priv: [...document.querySelectorAll('a[href]')].filter(a => /privac|cookie|datos\\s*person|proteccion\\s*de\\s*datos|protecci\\u00f3n\\s*de\\s*datos|legal|terminos|t\\u00e9rminos/i.test((a.getAttribute('href')||'')+' '+(a.innerText||''))).map(a => ({h:a.href, x:(a.innerText||'').trim().slice(0,90)})),
      bodyHasCookieWord: /cookie/i.test(document.body?document.body.innerText:''),
      body: (document.body?document.body.innerText:'').slice(0,4000),
      htmlLen: document.documentElement.outerHTML.length
    })`,
    returnByValue: true }, sessionId);
  info = JSON.parse(r.result.value);
} catch (e) { info = { err: String(e) }; }

try {
  const h = await cdp.send('Runtime.evaluate', { expression: 'document.documentElement.outerHTML', returnByValue: true }, sessionId);
  fs.writeFileSync(path.join(OUTDIR, `dom-${SLUG}.html`), h.result.value || '');
} catch (e) {}

fs.writeFileSync(path.join(OUTDIR, `cdp-${SLUG}.json`), JSON.stringify({
  arg: URL_ARG, cuando: new Date().toISOString(), info, requests, cookiesA, cookiesB,
  targets: [...sessions.values()],
}, null, 2));

const nA = requests.filter((r) => r.phase === 'A').length;
const nB = requests.filter((r) => r.phase === 'B').length;
console.log(`${SLUG} :: A(sin tocar): ${nA} pet., ${cookiesA.length} cookies | B(mousemove+scroll): +${nB} pet., ${cookiesB.length} cookies`);
try { await cdp.send('Target.closeTarget', { targetId }); } catch (e) {}
try { await cdp.send('Target.disposeBrowserContext', { browserContextId }); } catch (e) {}
cdp.close();
process.exit(0);
