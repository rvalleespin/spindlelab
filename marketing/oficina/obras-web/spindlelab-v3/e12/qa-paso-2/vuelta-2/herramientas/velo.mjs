import { pathToFileURL } from 'node:url';
const { chromium } = await import(pathToFileURL('/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs').href);
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
for (const [d, sel] of [['a', 'main a:has(img)'], ['b', 'main tr, main a']]) {
  const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  await p.goto(`http://127.0.0.1:8841/marketing/oficina/obras-web/spindlelab-v3/tableros/e12-direcciones/proto/${d}/trabajo/`); await p.waitForTimeout(1200);
  const l = p.locator(sel).nth(1); const bb = await l.boundingBox();
  await p.mouse.move(bb.x + 40, bb.y + 40, { steps: 5 }); await p.waitForTimeout(900);
  await p.screenshot({ path: `velo-${d}.jpg`, type: 'jpeg', quality: 60 });
  const r = await p.evaluate(() => {
    const cv = document.createElement('canvas'); cv.width = cv.height = 1; const cx = cv.getContext('2d');
    const rgba = (s) => { cx.clearRect(0, 0, 1, 1); cx.fillStyle = 'rgba(0,0,0,0)'; cx.fillStyle = s; cx.fillRect(0, 0, 1, 1); const d = cx.getImageData(0, 0, 1, 1).data; return [d[0], d[1], d[2], d[3] / 255]; };
    const out = []; const tw = document.createTreeWalker(document.querySelector('main'), NodeFilter.SHOW_TEXT); let n;
    while ((n = tw.nextNode())) { const t = n.textContent.trim(); if (!t) continue; const el = n.parentElement; const rg = document.createRange(); rg.selectNodeContents(n); const q = [...rg.getClientRects()].find((x) => x.width > 1); if (!q || q.top < 0 || q.bottom > innerHeight) continue;
      const pila = document.elementsFromPoint(q.left + 3, q.top + q.height / 2); const i = pila.indexOf(el); const encima = pila.slice(0, i < 0 ? 0 : i).filter((e) => { const s = getComputedStyle(e); return rgba(s.backgroundColor)[3] > 0 && +s.opacity > 0.05; });
      if (encima.length) out.push([t.slice(0, 40), encima.map((e) => e.className + ' ' + getComputedStyle(e).backgroundColor + ' op' + getComputedStyle(e).opacity).join(';')]); }
    return out;
  });
  console.log(d, 'textos bajo una capa con fondo', r.length, JSON.stringify(r.slice(0, 6)));
}
await b.close();
