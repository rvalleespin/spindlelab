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

function correr({ bloqueado = false, guardado = null, metaCorriendo = false, gaCorriendo = metaCorriendo, conMeta = true, conAncla = true, cookiesIniciales = '_ga=1; _ga_ABC=2; _fbp=3; ajena=no', conFbq = false } = {}) {
  const hechos = { recargas: 0, gtag: [], metaInit: 0, gaInit: 0, borradas: [], creados: [], fbq: [] };
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

  let cookies = cookiesIniciales;
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
  ctx.window.__spindlelabMetaInited = conMeta && metaCorriendo;
  if (conMeta) ctx.window.__spindlelabInitMeta = () => { if (ctx.window.__spindlelabMetaInited) return; hechos.metaInit++; ctx.window.__spindlelabMetaInited = true; };
  // Como la cabecera nueva: gtag.js solo se pide acá, una vez.
  if (conFbq) ctx.fbq = (...a) => hechos.fbq.push(a.join(' '));
  ctx.window.__spindlelabGAInited = gaCorriendo;
  ctx.window.__spindlelabInitGA = () => { if (ctx.window.__spindlelabGAInited) return; hechos.gaInit++; ctx.window.__spindlelabGAInited = true; };
  Object.defineProperty(ctx, 'localStorage', {
    get() { if (bloqueado) throw new Error('almacenamiento bloqueado'); return { getItem: () => almacen.v, setItem: (k, v) => { almacen.v = v; } }; },
  });

  vm.createContext(ctx);
  vm.runInContext(SRC, ctx, { filename: RUTA });

  const buscar = () => hechos.creados.find((e) => e.id === 'cookie-preferencias') ?? null;
  const aviso = () => hechos.creados.find((e) => e.id === 'cookie-aviso') ?? null;
  return { ctx, doc, banner, aceptar, rechazar, hechos, oyentes, almacen, control: buscar, aviso, get cookies() { return cookies; } };
}

// Otra pestaña escribe en localStorage y ESTA recibe el evento: así ocurre de verdad.
const otraPestana = (m, valor) => { m.almacen.v = valor; m.oyentes.storage({ key: 'spindlelab_consent', newValue: valor }); };
const botones = (el) => { const out = []; const rec = (n) => { (n.children || []).forEach((c) => { if (c.tagName === 'BUTTON') out.push(c); rec(c); }); }; rec(el); return out; };

console.log('=== 1. camino normal ===');
{
  const m = correr({});
  eq('banner visible en la primera visita', m.banner.hidden, false);
  eq('control montado sin decisión', m.control().textContent, 'Cookies');
  m.aceptar.click();
  eq('acepto: se guarda', m.almacen.v, 'granted');
  eq('acepto: el control lo dice', m.control().textContent, 'Cookies: aceptadas');
  eq('acepto: Meta arranca', m.hechos.metaInit, 1);
  eq('acepto: se pide gtag.js, una sola vez', m.hechos.gaInit, 1);
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
  otraPestana(m, 'denied');
  eq('el control se entera', m.control().textContent, 'Cookies: rechazadas');
  eq('apaga Analytics acá', m.hechos.gtag[m.hechos.gtag.length-1][2].analytics_storage, 'denied');
  eq('borra las cookies', m.hechos.borradas.filter((c,i,a)=>a.indexOf(c)===i).sort(), ['_fbp','_ga','_ga_ABC']);
  eq('NO recarga sola la otra pestaña', m.hechos.recargas, 0);
  eq('pero avisa que hay que recargar', /recarga esta página/.test(m.aviso().textContent), true);
  eq('y ya no promete que Analytics dejó de medir (no es cierto hasta recargar)', /dejamos de medir/.test(m.aviso().textContent), false);
  eq('nombra lo que sigue corriendo', /Analytics y el Pixel de Meta dejen de correr/.test(m.aviso().textContent), true);
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

console.log('=== 5. el Pixel corriendo manda sobre de dónde venía la decisión ===');
{
  // La página cargó con el permiso ya dado, así que el Pixel arrancó desde el <head>. Otra
  // pestaña rechaza, y recién después esta persona pulsa Rechazar acá. Con la condición
  // vieja (que exigía estado previo 'granted') no se recargaba y fbq seguía vivo.
  const m = correr({ guardado: 'granted', metaCorriendo: true });
  otraPestana(m, 'denied');
  eq('tras el aviso de la otra pestaña, el estado ya es rechazado', m.control().textContent, 'Cookies: rechazadas');
  m.control().click();
  m.rechazar.click();
  eq('igual avisa que va a recargar', /Recargamos la página/.test(m.aviso().textContent), true);
  await new Promise((r) => setTimeout(r, 2100));
  eq('y recarga, porque el Pixel seguía vivo', m.hechos.recargas, 1);
}
{
  // Y al revés: si el Pixel nunca arrancó, rechazar no recarga a nadie.
  const m = correr({});
  m.rechazar.click();
  await new Promise((r) => setTimeout(r, 2100));
  eq('sin Pixel corriendo no hay recarga', m.hechos.recargas, 0);
}

console.log('=== 6. sin aceptar, gtag.js no se pide nunca ===');
{
  const m = correr({});
  m.rechazar.click();
  eq('rechazar en la primera visita no pide gtag.js', m.hechos.gaInit, 0);
  eq('ni manda nada a gtag()', m.hechos.gtag.length, 0);
  eq('ni inicializa el Pixel', m.hechos.metaInit, 0);
  await new Promise((r) => setTimeout(r, 2100));
  eq('ni recarga, porque no había nada corriendo', m.hechos.recargas, 0);
}
{
  const m = correr({});
  eq('sin decidir tampoco se pide', m.hechos.gaInit, 0);
}

console.log('=== 7. si solo corre Analytics, también recarga, y lo dice bien ===');
{
  const m = correr({ conMeta: false });
  m.aceptar.click();
  eq('se cargó Analytics', m.hechos.gaInit, 1);
  m.rechazar.click();
  eq('el aviso nombra solo a Analytics, en singular', /para que Analytics deje de correr/.test(m.aviso().textContent), true);
  await new Promise((r) => setTimeout(r, 2100));
  eq('y recarga (antes solo recargaba si corría el Pixel)', m.hechos.recargas, 1);
}

console.log('=== 8. rechazado = sin cookies de medición al abrir cualquier página ===');
{
  // Quedó un _ga escrito tarde por un gtag.js que bajó después del rechazo.
  const m = correr({ guardado: 'denied' });
  eq('al cargar con "rechazadas" se barren las propias', m.hechos.borradas.filter((c,i,a)=>a.indexOf(c)===i).sort(), ['_fbp','_ga','_ga_ABC']);
  eq('y la ajena queda', m.cookies, 'ajena=no');
}
{
  const m = correr({ guardado: 'granted', gaCorriendo: true, metaCorriendo: true });
  eq('con "aceptadas" no se toca nada al cargar', m.hechos.borradas.length, 0);
}
{
  const m = correr({});
  eq('sin decisión también se barre (cookies heredadas de cuando se cargaba sin preguntar)', m.hechos.borradas.filter((c,i,a)=>a.indexOf(c)===i).sort(), ['_fbp','_ga','_ga_ABC']);
}

console.log('=== 9. las cookies del vinculador de Google (_gcl_) también se van ===');
{
  const m = correr({ guardado: 'granted', gaCorriendo: true, metaCorriendo: true, cookiesIniciales: '_ga=1; _gcl_au=1.1.9; _gcl_aw=GCL.1.x; _fbp=3; ajena=no' });
  m.control().click();
  m.rechazar.click();
  const borradas = m.hechos.borradas.filter((c,i,a)=>a.indexOf(c)===i).sort();
  eq('se borran _gcl_au y _gcl_aw', borradas.includes('_gcl_au') && borradas.includes('_gcl_aw'), true);
  eq('y la ajena queda', m.cookies, 'ajena=no');
}

console.log('=== 10. el aviso de la otra pestaña no se borra solo ===');
{
  const m = correr({ guardado: 'granted', gaCorriendo: true, metaCorriendo: true });
  otraPestana(m, 'denied');
  eq('trae un botón para recargar', botones(m.aviso()).some((b) => b.textContent === 'Recargar ahora'), true);
  eq('y uno para cerrarlo', botones(m.aviso()).some((b) => b.textContent === 'Cerrar'), true);
  await new Promise((r) => setTimeout(r, 5600));
  eq('a los 5,6 s sigue visible (antes se borraba a los 5)', m.aviso().hidden, false);
  const boton = botones(m.aviso()).find((b) => b.textContent === 'Recargar ahora');
  boton.click();
  eq('el botón recarga', m.hechos.recargas, 1);
}
{
  const m = correr({});
  m.aceptar.click();
  await new Promise((r) => setTimeout(r, 5600));
  eq('un aviso de confirmación normal sí se va solo', m.aviso().hidden, true);
}

console.log('=== 11. botón Atrás: la página vuelve congelada del bfcache ===');
{
  // La página A tenía todo corriendo. En otra página se rechazó. Se vuelve con Atrás.
  const m = correr({ guardado: 'granted', gaCorriendo: true, metaCorriendo: true });
  m.almacen.v = 'denied';
  m.oyentes.pageshow({ persisted: true });
  eq('el control se entera', m.control().textContent, 'Cookies: rechazadas');
  eq('y recarga, porque tenía Analytics y el Pixel corriendo', m.hechos.recargas, 1);
}
{
  const m = correr({ guardado: 'granted', gaCorriendo: true, metaCorriendo: true });
  m.oyentes.pageshow({ persisted: true });
  eq('si no cambió nada, no recarga', m.hechos.recargas, 0);
}
{
  const m = correr({ guardado: 'granted', gaCorriendo: true, metaCorriendo: true });
  m.almacen.v = 'denied';
  m.oyentes.pageshow({ persisted: false });
  eq('una carga normal (no bfcache) no pasa por acá', m.hechos.recargas, 0);
}

console.log('=== 12. el Pixel: se le retira el permiso, y nunca se le devuelve en caliente ===');
{
  const m = correr({ guardado: 'granted', gaCorriendo: true, metaCorriendo: true, conFbq: true });
  otraPestana(m, 'denied');
  eq('al rechazar en otra pestaña, revoke', m.hechos.fbq.includes('consent revoke'), true);
  otraPestana(m, 'granted');
  eq('al volver a aceptar NO se hace grant (retiene y replayaría lo de mientras)', m.hechos.fbq.includes('consent grant'), false);
}

console.log('=== 13. una sola fuente de verdad sobre el permiso ===');
{
  const m = correr({});
  eq('sin decidir: sin permiso', m.ctx.__spindlelabHayPermiso(), false);
  m.aceptar.click();
  eq('aceptado: con permiso', m.ctx.__spindlelabHayPermiso(), true);
  m.rechazar.click();
  eq('rechazado: sin permiso', m.ctx.__spindlelabHayPermiso(), false);
}
{
  const m = correr({ guardado: 'granted', gaCorriendo: true, metaCorriendo: true });
  otraPestana(m, 'denied');
  eq('rechazado desde otra pestaña: sin permiso acá también', m.ctx.__spindlelabHayPermiso(), false);
}

console.log('=== 14. botón Atrás cuando el evento storage llega ANTES que pageshow ===');
{
  const m = correr({ guardado: 'granted', gaCorriendo: true, metaCorriendo: true });
  m.almacen.v = 'denied';
  otraPestana(m, 'denied');
  eq('el storage no recarga solo', m.hechos.recargas, 0);
  m.oyentes.pageshow({ persisted: true });
  eq('pero el pageshow que sigue sí (antes veía "sin cambios" y no recargaba)', m.hechos.recargas, 1);
}

console.log('=== 15. bfcache con eventos viejos encolados: no se reprocesa un rechazo superado ===');
{
  // Chrome real: pageshow, luego storage:denied (viejo), luego storage:granted. Hoy vale 'granted'.
  const m = correr({ guardado: 'granted', gaCorriendo: true, metaCorriendo: true, conFbq: true });
  m.almacen.v = 'granted';
  m.oyentes.pageshow({ persisted: true });
  m.oyentes.storage({ key: 'spindlelab_consent', newValue: 'denied' });
  m.oyentes.storage({ key: 'spindlelab_consent', newValue: 'granted' });
  eq('al Pixel no se le retiró el permiso', m.hechos.fbq.includes('consent revoke'), false);
  eq('no quedó un aviso falso en pantalla', !m.aviso() || m.aviso().hidden, true);
  eq('y el pie dice lo que vale', m.control().textContent, 'Cookies: aceptadas');
  eq('y no recargó sin razón', m.hechos.recargas, 0);
}

console.log('=== 16. el aviso de la otra pestaña se quita si después se acepta ===');
{
  const m = correr({ guardado: 'granted', gaCorriendo: true, metaCorriendo: true, conFbq: true });
  otraPestana(m, 'denied');
  eq('aparece el aviso', m.aviso().hidden, false);
  otraPestana(m, 'granted');
  eq('y se va al volver a aceptar', m.aviso().hidden, true);
}

console.log('=== 17. al volver con Atrás tras decidir en otra página, el banner no vuelve a preguntar ===');
{
  const m = correr({});
  eq('empieza preguntando', m.banner.hidden, false);
  m.almacen.v = 'granted';
  m.oyentes.pageshow({ persisted: true });
  m.oyentes.storage({ key: 'spindlelab_consent', newValue: 'granted' });
  eq('ya no pregunta (antes el banner quedaba abierto)', m.banner.hidden, true);
  eq('y midió, porque se aceptó', m.hechos.gaInit, 1);
}

console.log('=== 18. volver a aceptar en una página con el Pixel revocado la recarga ===');
{
  const m = correr({ conFbq: true });
  m.aceptar.click();
  m.rechazar.click();
  m.control().click();
  m.aceptar.click();
  eq('lo avisa', /medición arranque de cero/.test(m.aviso().textContent), true);
  await new Promise((r) => setTimeout(r, 2100));
  eq('y recarga una sola vez', m.hechos.recargas, 1);
  eq('quedó aceptado', m.almacen.v, 'granted');
}

console.log('=== 19. almacenamiento bloqueado: rechazar no dice "quedaron" ===');
{
  const m = correr({ bloqueado: true });
  m.aceptar.click();
  m.control().click();
  m.rechazar.click();
  eq('dice que no se pudo guardar', /no nos deja guardar/.test(m.aviso().textContent), true);
  eq('y no dice "quedaron"', /quedaron/.test(m.aviso().textContent), false);
}

console.log('=== 20. abrir el banner cierra el aviso que lo taparía ===');
{
  const m = correr({ guardado: 'granted', gaCorriendo: true, metaCorriendo: true });
  otraPestana(m, 'denied');
  eq('aviso fijo visible', m.aviso().hidden, false);
  m.control().click();
  eq('al abrir el banner, el aviso se cierra', m.aviso().hidden, true);
}

console.log(`\n${ok} bien, ${malo} mal`);
process.exit(malo ? 1 : 0);
