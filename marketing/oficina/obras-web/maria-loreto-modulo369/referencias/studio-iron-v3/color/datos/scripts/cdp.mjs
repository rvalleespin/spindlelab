// Minimal CDP client (Node 24 global WebSocket)
import fs from 'node:fs';
const PORT = 9341;
export const UA_DESK = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36';
export const UA_IPHONE = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1';

export async function newPage() {
  const r = await fetch(`http://127.0.0.1:${PORT}/json/new?about:blank`, { method: 'PUT' });
  const t = await r.json();
  const ws = new WebSocket(t.webSocketDebuggerUrl);
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
  let id = 0; const pending = new Map(); const listeners = [];
  ws.onmessage = (ev) => {
    const m = JSON.parse(ev.data);
    if (m.id && pending.has(m.id)) { const p = pending.get(m.id); pending.delete(m.id); m.error ? p.rej(new Error(JSON.stringify(m.error))) : p.res(m.result); }
    else if (m.method) listeners.forEach(l => l(m));
  };
  const send = (method, params = {}) => new Promise((res, rej) => { const i = ++id; pending.set(i, { res, rej }); ws.send(JSON.stringify({ id: i, method, params })); });
  const page = {
    send, ws, targetId: t.id,
    on: (fn) => listeners.push(fn),
    async evaluate(expr) {
      const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
      if (r.exceptionDetails) throw new Error(JSON.stringify(r.exceptionDetails).slice(0, 800));
      return r.result.value;
    },
    async setViewport(kind) {
      if (kind === 390) {
        await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
        await send('Emulation.setUserAgentOverride', { userAgent: UA_IPHONE, platform: 'iPhone' });
        await send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 });
      } else {
        await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
        await send('Emulation.setUserAgentOverride', { userAgent: UA_DESK, platform: 'MacIntel' });
        await send('Emulation.setTouchEmulationEnabled', { enabled: false });
      }
    },
    async goto(url, waitMs = 3500) {
      const loaded = new Promise(res => { const f = (m) => { if (m.method === 'Page.loadEventFired') res(); }; listeners.push(f); setTimeout(res, 25000); });
      await send('Page.navigate', { url });
      await loaded;
      await new Promise(r => setTimeout(r, waitMs));
    },
    async shot(path, opts = {}) {
      const r = await send('Page.captureScreenshot', { format: 'jpeg', quality: 82, captureBeyondViewport: !!opts.full, ...(opts.clip ? { clip: opts.clip } : {}) });
      fs.writeFileSync(path, Buffer.from(r.data, 'base64'));
    },
    async shotPng(path, opts = {}) {
      const r = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: !!opts.full, ...(opts.clip ? { clip: opts.clip } : {}) });
      fs.writeFileSync(path, Buffer.from(r.data, 'base64'));
    },
    async close() { try { await fetch(`http://127.0.0.1:${PORT}/json/close/${t.id}`); } catch {} ws.close(); },
  };
  await send('Page.enable'); await send('Runtime.enable'); await send('DOM.enable'); await send('CSS.enable');
  return page;
}
export const sleep = (ms) => new Promise(r => setTimeout(r, ms));
