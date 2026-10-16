import { chromium } from '/home/user/spindlelab/spindlelab-astro/node_modules/playwright/index.mjs';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
async function firma(url, w) {
  const p = await (await b.newContext({ viewport: { width: w, height: 900 }, javaScriptEnabled: false })).newPage();
  await p.goto(url);
  const r = await p.evaluate(() => {
    const ids = [...document.querySelectorAll('[id^="chq"], #chequeo')].map(e => {
      const at = [...e.attributes].filter(a => !['class', 'style'].includes(a.name)).map(a => `${a.name}=${a.value}`).sort().join(' ');
      return `${e.tagName.toLowerCase()} ${at}`;
    });
    const f = document.querySelector('#chq-form');
    const campos = f ? [...f.querySelectorAll('input,button,label,select,textarea,output,p,div')].map(e => e.tagName.toLowerCase() + ':' + [...e.attributes].filter(a => !['class', 'style'].includes(a.name)).map(a => `${a.name}=${a.value}`).sort().join(',') + ':' + (e.children.length ? '' : e.textContent.trim())) : [];
    // orden del hero
    const h1 = document.querySelector('h1').getBoundingClientRect().top + scrollY;
    const fr = f.getBoundingClientRect().top + scrollY;
    const obra = document.querySelector('[class*="fila"], [class*="obras"], .d-obras, .d-fila');
    return { ids, campos, y_form: Math.round(fr), y_h1: Math.round(h1), h1: document.querySelector('h1').textContent.replace(/\s+/g, ' ').trim(), eyebrow: document.querySelector('h1').previousElementSibling?.textContent.trim() };
  });
  await p.context().close(); return r;
}
for (const w of [1440, 390]) {
  const d = await firma('http://127.0.0.1:8781/v3/', w);
  for (const dir of ['taller', 'pizarra']) {
    const x = await firma(`http://127.0.0.1:8780/${dir}/home.html`, w);
    const igualIds = JSON.stringify(d.ids) === JSON.stringify(x.ids), igualCampos = JSON.stringify(d.campos) === JSON.stringify(x.campos);
    console.log(w, dir, 'ids iguales', igualIds, 'campos iguales', igualCampos, 'form y', d.y_form, '→', x.y_form, 'h1 y', d.y_h1, '→', x.y_h1, 'h1', JSON.stringify(x.h1), x.h1 === d.h1);
    if (!igualIds) { console.log('  build', d.ids); console.log('  proto', x.ids); }
    if (!igualCampos) { const A = new Set(d.campos), B = new Set(x.campos); console.log('  solo build', d.campos.filter(c => !B.has(c))); console.log('  solo proto', x.campos.filter(c => !A.has(c))); }
  }
}
await b.close();
