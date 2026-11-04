/**
 * Los dos endpoints de Flow: la vuelta del comprador y la notificacion de pago.
 *
 *   node prueba-flow-endpoints.mjs
 *
 * ── POR QUE EXISTE (29-oct-2026) ────────────────────────────────────────────────────────
 *
 * La vuelta nacio de un error real encontrado pagando en el sandbox: Flow devuelve al
 * comprador con un POST, y `/pedido/` es estatico, asi que Cloudflare contesta 405 con CERO
 * bytes. Pantalla en blanco justo despues de pagar $177.310.
 *
 *     GET  /pedido/  ->  200 · 18.909 bytes
 *     POST /pedido/  ->  405 ·      0 bytes
 *
 * Se habia verificado con GET y se dio por bueno. Un GET no prueba nada sobre un POST.
 *
 * La notificacion es la que mueve el pedido a `pagado`, o sea la que decide si alguien recibe
 * el kit. Todo lo que se comprueba aca es dinero.
 */

import { DatabaseSync } from 'node:sqlite';
import { rutaEnElRepo } from './rutas.mjs';

const V = await import(rutaEnElRepo('verificaycumple/functions/api/flow-vuelta.js', 'FLOW_VUELTA_JS'));
const C = await import(rutaEnElRepo('verificaycumple/functions/api/flow-confirmacion.js', 'FLOW_CONFIRMACION_JS'));
const P = await import(rutaEnElRepo('verificaycumple/functions/api/pedidos.js', 'PEDIDOS_JS'));
const A = await import(rutaEnElRepo('verificaycumple/functions/api/almacen.js', 'ALMACEN_JS'));
const AVISO = await import(rutaEnElRepo('verificaycumple/functions/api/aviso.js', 'AVISO_JS'));

let ok = 0, malo = 0;
const eq = (n, r, e) => {
  if (JSON.stringify(r) === JSON.stringify(e)) ok++;
  else { malo++; console.log(`  FALLA ${n}: esperado ${JSON.stringify(e)}, real ${JSON.stringify(r)}`); }
};
const cierto = (n, v) => eq(n, Boolean(v), true);
const falso = (n, v) => eq(n, Boolean(v), false);

/* ── El andamio ───────────────────────────────────────────────────────────────────────── */

function comoD1(sqlite) {
  return {
    prepare(sql) {
      const st = sqlite.prepare(sql);
      let args = [];
      const api = {
        bind(...a) { args = a; return api; },
        async run() { const r = st.run(...args); return { meta: { changes: Number(r.changes) } }; },
        async first() { return st.get(...args) ?? null; },
        async all() { return { results: st.all(...args) }; },
      };
      return api;
    },
  };
}

function baseNueva() {
  const s = new DatabaseSync(':memory:');
  for (const sent of P.ESQUEMA.split(';')) if (sent.trim()) s.exec(sent + ';');
  return { db: comoD1(s), crudo: s };
}

const ID = 'vyc_' + 'a'.repeat(32);

async function pedidoNuevo(db, estado) {
  await A.crearPedido(db, {
    id: ID, dominio: 'ejemplo.cl', correo: 'alguien@ejemplo.cl',
    senales_contratadas: ['cmp'], senales_fuera: [], informe_json: '{}',
    monto_neto: 149000, monto_total: 177310,
  });
  if (estado && estado !== 'creado') await A.marcarEstado(db, ID, 'creado', estado, {});
  return db;
}

/** Un pago como los que devuelve Flow de verdad: `amount` es TEXTO, y lo acreditado trae decimales. */
const PAGO = (x = {}) => ({
  flowOrder: 11368296, commerceOrder: ID, requestDate: '2026-10-29 22:34:04',
  status: 2, subject: 'Kit', currency: 'CLP', amount: '177310',
  payer: 'alguien@ejemplo.cl',
  paymentData: { date: '2026-10-29 22:38:02', media: 'Webpay', amount: '177310.00', fee: '32.00', balance: 962 },
  ...x,
});

/**
 * Reemplaza `fetch` y reparte por destino.
 *
 * ⚠️ NO se finge `leerPagoFlow`: se finge la RED. Asi la prueba pasa por la firma real, por el
 * armado real de la peticion y por el parseo real de la respuesta. Fingir la funcion habria
 * dejado sin probar justo la parte que ya fallo una vez.
 */
function conRed({ pago = PAGO(), flowCae = false } = {}) {
  const viejo = globalThis.fetch;
  const avisos = [];
  globalThis.fetch = async (url, opciones) => {
    const u = String(url);
    if (u.includes('/payment/getStatus')) {
      if (flowCae) return new Response('nope', { status: 500 });
      return new Response(JSON.stringify(pago), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }
    // Todo lo demas son avisos: el correo al comprador y el aviso de venta.
    //
    // ⚠️ SE GUARDA EL DESTINATARIO, NO EL HOST (3-nov-2026). Hasta hoy el aviso interno salia
    // por Web3Forms y el correo al comprador por Resend, asi que el host alcanzaba para saber
    // cual era cual. Ahora los dos salen por Resend y el host los iguala: una asercion sobre
    // el host daria verde con el aviso interno mandado al comprador, o al reves.
    //
    // Y se guarda el cuerpo ENTERO, no un recorte de 400 caracteres: con Resend el texto del
    // mensaje va dentro del JSON y lo que hay que leer —el motivo, el «que hacer»— cae mas
    // alla de ese corte.
    const enviado = (opciones && opciones.body) ? String(opciones.body) : '';
    let destino = '(sin destinatario)';
    try { destino = String([].concat(JSON.parse(enviado).to)[0] || destino); } catch { /* queda el de arriba */ }
    avisos.push({ destino, texto: enviado });
    return new Response('{}', { status: 200, headers: { 'Content-Type': 'application/json' } });
  };
  return { avisos, soltar() { globalThis.fetch = viejo; } };
}

// Las credenciales que el endpoint necesita para hacer su trabajo completo. `RESEND_API_KEY`
// entro el 3-nov-2026: desde que los avisos internos salen por Resend, un entorno sin ella deja
// al endpoint sin poder avisar, y entonces «se avisa a una persona» acusaria la falta de la
// clave en vez del defecto que la asercion vigila. Va en el entorno de TODAS las secciones por
// eso; que la clave ausente se note es cosa de `prueba-aviso.mjs`.
const CRED = { FLOW_API_KEY: 'clave-de-prueba', FLOW_SECRET_KEY: 'secreto-de-prueba',
  RESEND_API_KEY: 'clave-de-prueba' };
const notificar = (token = 'TOK123') =>
  new Request('https://verifica.spindlelab.cl/api/flow-confirmacion', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ token }).toString(),
  });

/** Espera a los avisos que el endpoint manda con `waitUntil`. */
function contexto(request, env) {
  const fondo = [];
  return { ctx: { request, env, waitUntil: (p) => fondo.push(p) }, async listo() { await Promise.all(fondo); } };
}

/* ================================================================== */
console.log('=== 1. LA VUELTA: un POST no puede terminar en blanco ===');
{
  const vuelta = (metodo, qs) => V.onRequest({
    request: new Request(`https://verifica.spindlelab.cl/api/flow-vuelta${qs}`, { method: metodo }),
  });

  const r = await vuelta('POST', `?id=${ID}`);
  // ⚠️ LA ASERCION QUE CUIDA EL ERROR QUE ESTO ARREGLA. Un 302 deja al navegador libre de
  // repetir el POST contra `/pedido/`, que es el 405 vacio del que venimos. Solo el 303
  // obliga a convertirlo en GET. Un cambio de 303 a 302 se lee como inofensivo y devuelve
  // la pantalla en blanco intacta.
  eq('un POST con id contesta 303 (no 302, no 200)', r.status, 303);
  eq('y manda a la pantalla del pedido con su id',
    r.headers.get('Location'), `https://verifica.spindlelab.cl/pedido/?id=${ID}`);
  eq('sin cachear', r.headers.get('Cache-Control'), 'no-store');

  const g = await vuelta('GET', `?id=${ID}`);
  eq('un GET hace lo mismo', g.status, 303);
  eq('y al mismo lugar', g.headers.get('Location'), `https://verifica.spindlelab.cl/pedido/?id=${ID}`);

  // Un id que no es nuestro no entra a la pagina: esa pantalla sabe decir «no encontramos este
  // pedido», que es una respuesta, y meterle un valor ajeno en el query no mejora nada.
  for (const malo2 of ['../../etc', 'vyc_NOPE', '<script>', '', 'vyc_' + 'a'.repeat(31)]) {
    const m = await vuelta('POST', `?id=${encodeURIComponent(malo2)}`);
    eq(`un id invalido (${JSON.stringify(malo2).slice(0, 18)}) va a /pedido/ pelado`,
      m.headers.get('Location'), 'https://verifica.spindlelab.cl/pedido/');
  }
  const sin = await vuelta('POST', '');
  eq('sin id tambien', sin.headers.get('Location'), 'https://verifica.spindlelab.cl/pedido/');
  eq('y sigue siendo 303', sin.status, 303);
}

/* ================================================================== */
console.log('=== 2. LA NOTIFICACION: cuando NO hay que reintentar (200) ===');
{
  const { db } = baseNueva();
  const red = conRed();
  // Sin token no hay nada que preguntar, y reintentar no lo va a inventar.
  const sinToken = await C.onRequestPost({
    request: new Request('https://x/api/flow-confirmacion', { method: 'POST', body: new URLSearchParams().toString(),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }),
    env: { VYC_PEDIDOS: db, ...CRED },
  });
  eq('sin token contesta 200', sinToken.status, 200);
  eq('y lo dice', (await sinToken.json()).motivo, 'sin-token');
  red.soltar();
}
{
  // ⚠️ LA ASIMETRIA DE ESTE BLOQUE ES EL PUNTO, y la primera version de esta prueba la tenia
  // al reves: puso `vyc_bbb…`, que TIENE nuestro formato (la `b` es hexadecimal), y exigio un
  // 200. El codigo contesto 503 y tenia razon.
  //
  // Son dos casos distintos y terminan distinto a proposito:
  //
  //   - Un `commerceOrder` que NO tiene nuestra forma nunca fue un pedido nuestro. Reintentar
  //     no lo va a convertir en uno: 200, se cierra.
  //   - Uno que SI tiene nuestra forma y no esta en la base es otra cosa. El pedido se inserta
  //     ANTES de abrir el pago, asi que si falta, lo probable es una carrera o una lectura que
  //     fallo. Ahi 200 significaria un pago cobrado que nadie marca nunca; 503 significa unos
  //     reintentos y unas lineas de registro. La diferencia de costo entre equivocarse para un
  //     lado y para el otro es una venta perdida contra un poco de ruido.
  for (const ajeno of ['otra-tienda-999', 'ORD-123', '', 'vyc_zzz', 'vyc_' + 'a'.repeat(31)]) {
    const { db } = baseNueva();
    await pedidoNuevo(db, 'creado');
    const red = conRed({ pago: PAGO({ commerceOrder: ajeno }) });
    const r = await C.onRequestPost({ request: notificar(), env: { VYC_PEDIDOS: db, ...CRED } });
    red.soltar();
    eq(`un commerceOrder que no es nuestro (${JSON.stringify(ajeno).slice(0, 18)}) contesta 200`, r.status, 200);
    eq('y no se reintenta', (await r.json()).motivo, 'referencia-ajena');
  }

  // Y la otra cara: formato nuestro, pero no esta. Ese SI se reintenta.
  const { db } = baseNueva();
  const red = conRed({ pago: PAGO({ commerceOrder: 'vyc_' + 'b'.repeat(32) }) });
  const r = await C.onRequestPost({ request: notificar(), env: { VYC_PEDIDOS: db, ...CRED } });
  red.soltar();
  eq('con formato nuestro pero ausente, 503', r.status, 503);
  eq('para que Flow vuelva a intentar', (await r.json()).motivo, 'pedido-todavia-no-esta');
}

/* ================================================================== */
console.log('=== 3. CUANDO SI HAY QUE REINTENTAR (503) ===');
{
  // ⚠️ ESTAS TRES SON LAS QUE EVITAN UN PAGO QUE NADIE MARCA NUNCA. Flow reintenta hasta
  // recibir un 200; contestar 200 ante un fallo NUESTRO quema el unico aviso que iba a llegar.
  const { db } = baseNueva();
  await pedidoNuevo(db, 'creado');

  const red = conRed({ flowCae: true });
  const r1 = await C.onRequestPost({ request: notificar(), env: { VYC_PEDIDOS: db, ...CRED } });
  red.soltar();
  eq('si Flow no contesta, 503 para que reintente', r1.status, 503);
  eq('y se dice por que', (await r1.json()).motivo, 'no-se-pudo-releer');

  const red2 = conRed();
  const r2 = await C.onRequestPost({ request: notificar(), env: { ...CRED } });
  red2.soltar();
  eq('sin base, 503', r2.status, 503);

  const { db: vacia } = baseNueva();
  const red3 = conRed();
  const r3 = await C.onRequestPost({ request: notificar(), env: { VYC_PEDIDOS: vacia, ...CRED } });
  red3.soltar();
  eq('si el pedido todavia no esta, 503 (puede ser una carrera)', r3.status, 503);
  eq('y no se cierra en falso', (await r3.json()).motivo, 'pedido-todavia-no-esta');
}

/* ================================================================== */
console.log('=== 4. EL PAGO BUENO: marca, fecha y avisa ===');
{
  const { db, crudo } = baseNueva();
  await pedidoNuevo(db, 'creado');
  const red = conRed();
  const { ctx, listo } = contexto(notificar(), { VYC_PEDIDOS: db, ...CRED });
  const r = await C.onRequestPost(ctx);
  await listo();
  red.soltar();

  eq('contesta 200', r.status, 200);
  eq('y dice que marco', (await r.json()).accion, 'marcar');
  const f = crudo.prepare('SELECT estado, pagado_en FROM pedidos WHERE id = ?').get(ID);
  eq('el pedido queda pagado', f.estado, 'pagado');
  cierto('con fecha de pago escrita', Boolean(f.pagado_en));
  // ⚠️ Que el pedido quede marcado y nadie se entere es media funcion. La venta tiene que
  // llegarle a una persona, y eso solo se ve mirando el efecto, no que la funcion exista.
  //
  // ⚠️⚠️ Y SE MIRAN POR SEPARADO, que es la correccion de un hueco real de esta misma prueba.
  // La primera version decia `avisos.length >= 1`. Al mutar el codigo para quitar el aviso de
  // venta, la prueba siguio VERDE: el correo al comprador tapaba la ausencia del otro, porque
  // contar no es identificar. Son dos destinos distintos y se exigen los dos.
/* ⚠️ EL DESTINO DE LOS AVISOS SE LEE DE `aviso.js`, NO SE ESCRIBE ACÁ (4-nov-2026).
 *
 * Estaba escrito a mano, la dirección literal, en SEIS archivos de prueba. El día que
 * cambió —Gmail estaba mandando esos avisos a spam porque iban del subdominio de envío al
 * propio dominio de Workspace— los seis se pusieron rojos a la vez, y ninguno estaba
 * midiendo un defecto: todos separaban «aviso interno» de «correo al cliente» por una
 * dirección copiada.
 *
 * Leerla de la constante hace que ese cambio no toque ninguna prueba, y que la prueba siga
 * hablando del HECHO —esto es el aviso interno— en vez de un valor que puede mudarse. */
  const destinos = red.avisos.map((a) => a.destino);
  cierto('sale el aviso de venta (a quien vende)', destinos.includes(AVISO.DESTINO_AVISOS));
  cierto('y el correo al comprador (a quien compro)', destinos.includes('alguien@ejemplo.cl'));
}

/* ================================================================== */
console.log('=== 5. LOS OTROS ESTADOS ===');
{
  const casos = [
    ['rechazado (3)', PAGO({ status: 3, paymentData: { amount: null } }), 'rechazado', 200, 'marcar'],
    ['sin pagar (1)', PAGO({ status: 1, paymentData: { amount: null } }), 'creado', 200, 'nada'],
    ['sin observar (4)', PAGO({ status: 4 }), 'creado', 200, 'revisar'],
    ['pagado PARCIAL', PAGO({ paymentData: { amount: '90000.00' } }), 'creado', 200, 'revisar'],
    ['monto que no calza', PAGO({ amount: '1000' }), 'creado', 200, 'revisar'],
  ];
  for (const [nombre, pago, estadoEsperado, http, accion] of casos) {
    const { db, crudo } = baseNueva();
    await pedidoNuevo(db, 'creado');
    const red = conRed({ pago });
    const { ctx, listo } = contexto(notificar(), { VYC_PEDIDOS: db, ...CRED });
    const r = await C.onRequestPost(ctx);
    await listo();
    red.soltar();
    eq(`${nombre}: http`, r.status, http);
    eq(`${nombre}: accion`, (await r.json()).accion, accion);
    eq(`${nombre}: el pedido queda en`, crudo.prepare('SELECT estado FROM pedidos WHERE id = ?').get(ID).estado, estadoEsperado);
    if (accion === 'revisar') cierto(`${nombre}: y se avisa a una persona`, red.avisos.length >= 1);
  }
}

/* ================================================================== */
console.log('=== 6. LA SEGUNDA ENTREGA DEL MISMO AVISO NO HACE NADA ===');
{
  // Flow reintenta hasta recibir un 200, asi que la misma notificacion llega mas de una vez.
  // Si la segunda volviera a avisar, cada venta mandaria el correo al comprador dos veces.
  const { db, crudo } = baseNueva();
  await pedidoNuevo(db, 'creado');

  const red = conRed();
  const a = contexto(notificar(), { VYC_PEDIDOS: db, ...CRED });
  await C.onRequestPost(a.ctx); await a.listo();
  const avisosPrimera = red.avisos.length;

  const b = contexto(notificar(), { VYC_PEDIDOS: db, ...CRED });
  const r2 = await C.onRequestPost(b.ctx); await b.listo();
  red.soltar();

  eq('la segunda entrega contesta 200', r2.status, 200);
  const j = await r2.json();
  eq('sin tocar nada', j.accion, 'nada');
  eq('y dice que ya estaba resuelto', j.motivo, 'ya-resuelto');
  eq('el pedido sigue pagado', crudo.prepare('SELECT estado FROM pedidos WHERE id = ?').get(ID).estado, 'pagado');
  // Mismo criterio que arriba: por destino, no por cantidad. Si la segunda entrega repitiera
  // el correo, el comprador recibiria dos veces el mismo mensaje de que su pago entro.
  const porDestino = (d) => red.avisos.filter((a) => a.destino === d).length;
  eq('no se repite el aviso de venta', porDestino(AVISO.DESTINO_AVISOS), 1);
  eq('ni el correo al comprador', porDestino('alguien@ejemplo.cl'), 1);
  eq('y no salio nada mas', red.avisos.length, avisosPrimera);
}

/* ================================================================== */
console.log('=== 7. UN PEDIDO RESUELTO QUE RECIBE OTRA COSA SE MIRA A MANO ===');
{
  // Un pedido ya pagado que de pronto recibe un rechazo no se decide solo: puede ser un
  // reembolso, una anulacion o un error, y las tres terminan distinto.
  const { db, crudo } = baseNueva();
  await pedidoNuevo(db, 'pagado');
  const red = conRed({ pago: PAGO({ status: 3, paymentData: { amount: null } }) });
  const { ctx, listo } = contexto(notificar(), { VYC_PEDIDOS: db, ...CRED });
  const r = await C.onRequestPost(ctx);
  await listo();
  red.soltar();
  eq('contesta 200', r.status, 200);
  eq('pero manda a revisar', (await r.json()).accion, 'revisar');
  eq('y NO cambia el pedido', crudo.prepare('SELECT estado FROM pedidos WHERE id = ?').get(ID).estado, 'pagado');
  cierto('avisando a una persona', red.avisos.some((a) => a.destino === AVISO.DESTINO_AVISOS));
  // Y sin mandarle al comprador el correo de «recibimos tu pago» por un pago rechazado.
  falso('y sin escribirle al comprador', red.avisos.some((a) => a.destino === 'alguien@ejemplo.cl'));
}

/* ================================================================== */
console.log('=== 9. UN RECHAZO SEGUIDO DE UN PAGO: LA VENTA SE MARCA ===');
{
  // ── EL DEFECTO (3-nov-2026) ───────────────────────────────────────────────────────────
  //
  // Reintentar con otra tarjeta despues de un rechazo es el camino NORMAL de una compra
  // chilena. La transicion `rechazado → pagado` existe y se escribio para este caso exacto: el
  // comentario de `TRANSICIONES` en pedidos.js dice textual que sin ella «el pedido se quedaba
  // en `rechazado` con la plata ya cobrada».
  //
  // Este manejador no la alcanzaba. Cortaba antes, en «el pedido ya esta resuelto y `rechazado`
  // esta en ESTADOS_RESUELTOS», contestaba 200 con `resuelto-y-no-calza` y mandaba un aviso de
  // revision. O sea: cobrado, sin marcar y sin entregar. Y no habia red abajo —
  // `convieneRefrescar` solo mira `pendiente` o `creado`, asi que la reconciliacion de la
  // pantalla no volvia a pasar nunca por un pedido en `rechazado`— mientras el manejador de
  // Mercado Pago, que no tiene este corte, si lo rescataba.
  //
  // Ninguna de las aserciones que ya existian en este archivo se puso roja por esto.
  const { db, crudo } = baseNueva();
  await pedidoNuevo(db, 'rechazado');
  const red = conRed();   // PAGO() por defecto: status 2, monto exacto
  const { ctx, listo } = contexto(notificar(), { VYC_PEDIDOS: db, ...CRED });
  const r = await C.onRequestPost(ctx);
  await listo();
  red.soltar();
  const j = await r.json();

  eq('contesta 200', r.status, 200);
  // ⚠️⚠️ LA ASERCION QUE CUIDA LA PLATA. Lo que importa no es el codigo de la respuesta: es
  // donde queda el pedido. Un 200 con el pedido todavia en `rechazado` es exactamente el
  // defecto.
  const f = crudo.prepare('SELECT estado, pagado_en FROM pedidos WHERE id = ?').get(ID);
  eq('el pedido queda PAGADO, no en rechazado', f.estado, 'pagado');
  cierto('con fecha de pago escrita', Boolean(f.pagado_en));
  falso('y no se despacha como "no calza"', j.motivo === 'resuelto-y-no-calza');

  // ⚠️ Y QUE LA VENTA LE LLEGUE A UNA PERSONA. Un pedido marcado del que nadie se entera es
  // media funcion: nadie empieza a entregar.
  //
  // ⚠️⚠️ Y SE MIRA QUE EL AVISO SEA EL DE VENTA, NO SOLO QUE LLEGUE ALGO A ESA CASILLA. Lo delato
  // la mutacion: con el corte incondicional puesto de vuelta, «sale el aviso de venta» seguia
  // VERDE, porque el aviso de REVISION que mandaba el defecto llega al mismo buzon. Mirar el
  // destinatario identifica el canal, no el mensaje — es el mismo error que contar en vez de
  // identificar, un nivel mas abajo. Los dos asuntos los pone `aviso.js`: «Venta de Verifica y
  // Cumple ·» y «REVISAR ·».
  const internos = red.avisos.filter((a) => a.destino === AVISO.DESTINO_AVISOS);
  cierto('sale un aviso a quien vende', internos.length >= 1);
  cierto('y es el de una VENTA', internos.some((a) => a.texto.includes('Venta de Verifica y Cumple')));
  falso('no el de «esto hay que revisarlo»', internos.some((a) => a.texto.includes('REVISAR')));
  cierto('y le llega el correo al comprador (a quien compro)',
    red.avisos.some((a) => a.destino === 'alguien@ejemplo.cl'));
}

/* ================================================================== */
console.log('=== 10. LO QUE LA TABLA NO PERMITE REABRIR SIGUE SIN REABRIRSE ===');
{
  // ⚠️ LA OTRA CARA, Y LA QUE IMPIDE «ARREGLARLO» ABRIENDO LA PUERTA DEL TODO.
  //
  // Lo que decide si un pedido resuelto se puede reabrir es `TRANSICIONES`, que es la misma
  // tabla que `marcarEstado` consulta — no una segunda lista escrita en el manejador. Si el
  // corte se borrara en vez de darle criterio, un aviso tardio degradaria un pedido ya
  // entregado o reabriria uno devuelto, y eso se mira a mano.
  //
  // `pagado → rechazado` NO existe en la tabla a proposito: una vez confirmado contra la API,
  // una notificacion posterior que diga otra cosa no degrada el pedido sola.
  //
  // Para llegar a `entregado` hay que pasar por `pagado`: `creado → entregado` no es una
  // transicion valida, y ahorrarse el salto intermedio dejaria el pedido en `creado` y la
  // prueba probando otra cosa.
  const casos = [
    // estado de partida, camino para llegar, lo que dice Flow, y el estado en que tiene que quedar
    ['devuelto', ['devuelto'], PAGO(), 'devuelto'],
    ['entregado', ['pagado', 'entregado'], PAGO(), 'entregado'],
    ['pagado', ['pagado'], PAGO({ status: 3, paymentData: { amount: null } }), 'pagado'],
  ];
  for (const [nombre, camino, pago, esperado] of casos) {
    const { db, crudo } = baseNueva();
    await pedidoNuevo(db, null);
    let actual = 'creado';
    for (const paso of camino) { await A.marcarEstado(db, ID, actual, paso, {}); actual = paso; }
    eq(`${nombre}: el pedido arranca ahi`, crudo.prepare('SELECT estado FROM pedidos WHERE id = ?').get(ID).estado, nombre);

    const red = conRed({ pago });
    const { ctx, listo } = contexto(notificar(), { VYC_PEDIDOS: db, ...CRED });
    const r = await C.onRequestPost(ctx);
    await listo();
    red.soltar();
    const j = await r.json();

    eq(`${nombre}: contesta 200 (no se le pide reintentar a Flow)`, r.status, 200);
    eq(`${nombre}: NO se mueve el pedido`, crudo.prepare('SELECT estado FROM pedidos WHERE id = ?').get(ID).estado, esperado);
    eq(`${nombre}: lo mira una persona`, j.accion, 'revisar');
    cierto(`${nombre}: y se le avisa`, red.avisos.some((a) => a.destino === AVISO.DESTINO_AVISOS));
    // ⚠️ Y NO se manda el correo de «tu pago entro» a quien no acaba de pagar.
    falso(`${nombre}: sin correo al comprador`, red.avisos.some((a) => a.destino === 'alguien@ejemplo.cl'));
  }
}

/* ================================================================== */
console.log('=== 11. UN CONTRACARGADO NO SE REABRE SOLO ===');
{
  /* ── LA CELDA QUE ABRIO EL ARREGLO DE LA SECCION 9 (3-nov-2026) ─────────────────────────
   *
   * La seccion 9 cambio el corte «todo estado resuelto se queda quieto» por una consulta a
   * `TRANSICIONES`. Correcto: rescato `rechazado → pagado`. Pero `contracargado → pagado`
   * tambien esta en esa tabla, asi que quedo alcanzable SOLA — y eso no es mover una fila:
   * dispara el aviso interno de VENTA y le manda al comprador el correo de «recibimos tu
   * pago» por una plata que el emisor de la tarjeta ya se llevo.
   *
   * ⚠️ ESTA SECCION Y LA 9 SON PAREJA. Las dos parten de un pedido resuelto y reciben la misma
   * notificacion de pago, y tienen que terminar DISTINTO. Una guarda que cerrara las dos
   * pasaria esta y rompería la 9; una que no cerrara ninguna pasaria la 9 y rompería esta.
   */
  const { db, crudo } = baseNueva();
  await pedidoNuevo(db, null);
  // Hay que pasar por `pagado`: `creado → contracargado` existe, pero el camino real de un
  // contracargo es un cobro que despues se revierte, y partir de ahi prueba el caso de verdad.
  await A.marcarEstado(db, ID, 'creado', 'pagado', { pagado_en: new Date().toISOString() });
  await A.marcarEstado(db, ID, 'pagado', 'contracargado', {});
  eq('el pedido arranca contracargado',
    crudo.prepare('SELECT estado FROM pedidos WHERE id = ?').get(ID).estado, 'contracargado');

  const red = conRed();   // PAGO() por defecto: status 2 (pagado), monto exacto
  const { ctx, listo } = contexto(notificar(), { VYC_PEDIDOS: db, ...CRED });
  const r = await C.onRequestPost(ctx);
  await listo();
  red.soltar();
  const j = await r.json();

  // 200, porque el asunto quedo cerrado: no hay nada que Flow pueda arreglar reintentando.
  eq('contesta 200', r.status, 200);
  eq('lo mira una persona', j.accion, 'revisar');
  // ⚠️ Y CON SU PROPIO MOTIVO. «resuelto-y-no-calza» seria falso: la transicion SI calza, lo
  // que no corresponde es hacerla sola. Quien lea el aviso tiene que distinguirlo sin venir
  // al codigo.
  eq('con el motivo que corresponde', j.motivo, 'reapertura-a-mano');

  // ⚠️⚠️ LA ASERCION QUE CUIDA EL DINERO AL REVES QUE LA SECCION 9: aca lo que no puede pasar
  // es que el pedido se mueva.
  eq('el pedido SIGUE contracargado',
    crudo.prepare('SELECT estado FROM pedidos WHERE id = ?').get(ID).estado, 'contracargado');

  const internos = red.avisos.filter((a) => a.destino === AVISO.DESTINO_AVISOS);
  eq('sale un aviso a quien vende, y uno solo', internos.length, 1);
  // ⚠️ CON GUARDA, y no por prolijidad: al mutar el destino del aviso `internos` queda vacio y
  // `internos[0].texto` revienta el archivo. Una prueba que revienta acusa una sola vez; las
  // aserciones que nombran el resto del problema —y la seccion que viene— no corren.
  const elPrimero = (internos[0] || { texto: '' }).texto;
  cierto('que grita REVISAR', elPrimero.includes('REVISAR'));
  // ⚠️ Y NO el de venta. Es el mismo error que la seccion 9 ya cazo, en el otro sentido:
  // contar avisos no identifica cual salio, y los dos llegan al mismo buzon.
  falso('y NO el de una venta', elPrimero.includes('Venta de Verifica y Cumple'));
  cierto('el aviso explica que paso, sin que haya que investigar', /CONTRACARGADO/.test(elPrimero));
  cierto('y que hay que comprobar antes de moverlo',
    /panel de la pasarela|plata volvi/i.test(elPrimero));

  // ⚠️ LO MAS CARO DE TODO: el correo que le diria al comprador que su pago entro, cuando su
  // emisor acaba de revertirlo.
  falso('al comprador NO se le dice que recibimos su pago',
    red.avisos.some((a) => a.destino === 'alguien@ejemplo.cl'));
}

/* ================================================================== */
console.log('=== 8. un GET no es una notificacion ===');
{
  const r = await C.onRequest({ request: new Request('https://x/api/flow-confirmacion', { method: 'GET' }), env: {} });
  eq('contesta 405', r.status, 405);
}

console.log(`\n${ok} bien, ${malo} mal`);
process.exit(malo ? 1 : 0);
