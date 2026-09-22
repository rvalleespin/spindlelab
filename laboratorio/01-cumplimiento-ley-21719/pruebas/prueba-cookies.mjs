import fs from 'node:fs';
import vm from 'node:vm';
const RUTA = '/tmp/spl-main-wt/spindlelab-astro/public/js/consent-banner.js';
const SRC = fs.readFileSync(RUTA, 'utf8');

let ok = 0, malo = 0;
const eq = (n, r, e) => { if (JSON.stringify(r) === JSON.stringify(e)) ok++; else { malo++; console.log(`  FALLA ${n}: esperado ${JSON.stringify(e)}, real ${JSON.stringify(r)}`); } };

function nuevoEl(tag, hechos) {
  return {
    tagName: tag.toUpperCase(), id: '', type: '', hidden: false, textContent: '', innerHTML: '',
    style: {}, children: [], parentNode: null, attrs: {}, _click: [],
    setAttribute(k, v) { this.attrs[k] = v; }, getAttribute(k) { return this.attrs[k] ?? null; },
    appendChild(c) { c.parentNode = this; this.children.push(c); return c; },
    insertBefore(c, ref) { c.parentNode = this; const i = this.children.indexOf(ref); this.children.splice(i < 0 ? this.children.length : i, 0, c); return c; },
    addEventListener(ev, fn) { if (ev === 'click') this._click.push(fn); },
    querySelector(sel) { return sel === 'p' ? this._p : sel === 'button' ? this._btn : null; },
    querySelectorAll() { return []; },
    focus() { hechos.focoEn = this.id; },
    click() { this._click.slice().forEach((f) => f()); },
  };
}

function correr({ bloqueado = false, guardado = null, metaCorriendo = false, conAncla = true } = {}) {
  const hechos = { recargas: 0, gtag: [], metaInit: 0, borradas: [], creados: [] };
  const oyentes = {};
  const almacen = { v: guardado };
  const el = (t) => { const e = nuevoEl(t, hechos); hechos.creados.push(e); return e; };

  const banner = el('div'); banner.id = 'cookie-banner'; banner.hidden = true;
  const parrafo = el('p'); parrafo.innerHTML = 'Usamos Google Analytics y Meta Pixel.'; banner._p = parrafo;
  const aceptar = el('button'); aceptar.id = 'cookie-accept';
  const rechazar = el('button'); rechazar.id = 'cookie-reject'; banner._btn = rechazar;
  const ancla = el('a'); ancla.textContent = 'Política de privacidad'; ancla.attrs.href = '/privacidad/';
  const fila = el('div'); fila.appendChild(ancla);
  const pie = el('footer'); pie.appendChild(fila);
  pie.querySelectorAll = (sel) => (sel.includes('privacidad') ? (conAncla ? [ancla] : []) : conAncla ? [ancla] : []);

  let cookies = '_ga=1; _ga_ABC=2; _fbp=3; ajena=no';
  const doc = {
    head: el('head'), body: el('body'),
    getElementById(id) {
      if (id === 'cookie-banner') return banner;
      if (id === 'cookie-accept') return aceptar;
      if (id === 'cookie-reject') return rechazar;
      return hechos.creados.find((e) => e.id === id) ?? null;
    },
    querySelector: (sel) => (sel === 'footer' ? pie : null),
    createElement: el, createTextNode: (t) => ({ nodeType: 3, textContent: t, parentNode: null }),
    activeElement: { id: '' },
    get cookie() { return cookies; },
    set cookie(v) {
      const n = v.split('=')[0];
      if (/expires=Thu, 01 Jan 1970/.test(v)) { hechos.borradas.push(n); cookies = cookies.split('; ').filter((c) => c.split('=')[0] !== n).join('; '); }
    },
  };

  const ctx = {
    document: doc,
    location: { hostname: 'spindlelab.cl', reload() { hechos.recargas++; } },
    gtag: (...a) => hechos.gtag.push(a),
    setTimeout, clearTimeout,
    getComputedStyle: () => ({ color: 'rgb(1,2,3)', fontSize: '12px', fontWeight: '400', fontFamily: 'X', letterSpacing: 'normal', lineHeight: '16px' }),
  };
  ctx.window = ctx;
  ctx.window.addEventListener = (ev, fn) => { oyentes[ev] = fn; };
  ctx.window.__spindlelabMetaInited = metaCorriendo;
  ctx.window.__spindlelabInitMeta = () => { hechos.metaInit++; ctx.window.__spindlelabMetaInited = true; };
  Object.defineProperty(ctx, 'localStorage', {
    get() { if (bloqueado) throw new Error('almacenamiento bloqueado'); return { getItem: () => almacen.v, setItem: (k, v) => { almacen.v = v; } }; },
  });

  vm.createContext(ctx);
  vm.runInContext(SRC, ctx, { filename: RUTA });

  const buscar = () => hechos.creados.find((e) => e.id === 'cookie-preferencias') ?? null;
  const aviso = () => hechos.creados.find((e) => e.id === 'cookie-aviso') ?? null;
  return { ctx, doc, banner, aceptar, rechazar, hechos, oyentes, almacen, control: buscar, aviso, get cookies() { return cookies; } };
}

console.log('=== 1. camino normal ===');
{
  const m = correr({});
  eq('banner visible en la primera visita', m.banner.hidden, false);
  eq('control montado sin decisión', m.control().textContent, 'Cookies');
  m.aceptar.click();
  eq('acepto: se guarda', m.almacen.v, 'granted');
  eq('acepto: el control lo dice', m.control().textContent, 'Cookies: aceptadas');
  eq('acepto: Meta arranca', m.hechos.metaInit, 1);
  eq('acepto: gtag concedido', m.hechos.gtag[0][2].analytics_storage, 'granted');
  m.rechazar.click();
  eq('rechazo: se guarda', m.almacen.v, 'denied');
  eq('rechazo: gtag denegado', m.hechos.gtag[m.hechos.gtag.length-1][2].analytics_storage, 'denied');
  eq('rechazo: borra las propias', m.hechos.borradas.filter((c,i,a)=>a.indexOf(c)===i).sort(), ['_fbp','_ga','_ga_ABC']);
  eq('rechazo: no toca la ajena', m.cookies, 'ajena=no');
}

console.log('=== 2. almacenamiento bloqueado ===');
{
  const m = correr({ bloqueado: true });
  eq('el control existe igual', !!m.control(), true);
  m.aceptar.click();
  eq('acepto: el control lo dice (antes se quedaba en "Cookies")', m.control().textContent, 'Cookies: aceptadas');
  eq('y avisa que no se puede recordar', /no nos deja guardar/.test(m.aviso().textContent), true);
  m.rechazar.click();
  eq('rechazo: el control lo dice', m.control().textContent, 'Cookies: rechazadas');
  eq('avisa que va a recargar', /Recargamos la página/.test(m.aviso().textContent), true);
  eq('todavía no recargó (son 1,8 s)', m.hechos.recargas, 0);
  await new Promise((r) => setTimeout(r, 2100));
  eq('y recarga, porque el Pixel estaba corriendo (antes NO recargaba)', m.hechos.recargas, 1);
}

console.log('=== 2b. la recarga se cancela si vuelves a decidir dentro de esos 1,8 s ===');
{
  const m = correr({});
  m.aceptar.click();
  m.rechazar.click();
  eq('hay una recarga en camino', /Recargamos la página/.test(m.aviso().textContent), true);
  m.aceptar.click();
  await new Promise((r) => setTimeout(r, 2100));
  eq('no se recargó', m.hechos.recargas, 0);
  eq('y quedó en lo último que elegiste', m.almacen.v, 'granted');
}

console.log('=== 3. otra pestaña ===');
{
  const m = correr({ guardado: 'granted', metaCorriendo: true });
  eq('arranca en aceptadas', m.control().textContent, 'Cookies: aceptadas');
  m.oyentes.storage({ key: 'spindlelab_consent', newValue: 'denied' });
  eq('el control se entera', m.control().textContent, 'Cookies: rechazadas');
  eq('apaga Analytics acá', m.hechos.gtag[m.hechos.gtag.length-1][2].analytics_storage, 'denied');
  eq('borra las cookies', m.hechos.borradas.filter((c,i,a)=>a.indexOf(c)===i).sort(), ['_fbp','_ga','_ga_ABC']);
  eq('NO recarga sola la otra pestaña', m.hechos.recargas, 0);
  eq('pero avisa que hay que recargar', /recarga esta página/.test(m.aviso().textContent), true);
}
{
  const m = correr({ guardado: 'granted' });
  m.oyentes.storage({ key: 'otra_cosa', newValue: 'x' });
  eq('un evento de otra clave no toca nada', m.control().textContent, 'Cookies: aceptadas');
}

console.log('=== 4. pie sin enlace a la política (el 404) ===');
{
  const m = correr({ conAncla: false });
  eq('el control aparece igual', !!m.control(), true);
}

console.log(`\n${ok} bien, ${malo} mal`);
process.exit(malo ? 1 : 0);
