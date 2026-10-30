/**
 * Pruebas del adaptador de Flow (functions/api/flow.js).
 *
 *   node prueba-flow.mjs
 *
 * ── LO QUE CUIDAN, EN ORDEN DE IMPORTANCIA ──────────────────────────────────────────────
 *
 * 1. LA FIRMA. Si está mal, TODAS las peticiones fallan. Y se puede comprobar de verdad, no
 *    contra mi idea de cómo funciona: la documentación de Flow trae un ejemplo con el string
 *    exacto que debe resultar. Esa aserción vale más que todas las demás juntas, porque es lo
 *    único que compara mi implementación con la de ELLOS.
 *
 * 2. QUE NADA SE MARQUE COMO PAGADO MIENTRAS NO SEPAMOS QUÉ SIGNIFICAN SUS ESTADOS. Flow no
 *    documenta qué quiere decir cada número del campo `status`. Hasta que un pago real lo
 *    muestre, el adaptador tiene que ser inútil a propósito.
 *
 * 3. Las defensas que ya aprendimos con el otro proveedor: que el pago sea de este pedido y
 *    que el monto calce exacto.
 */

import { createHmac } from 'node:crypto';
import { rutaEnElRepo } from './rutas.mjs';

const F = await import(rutaEnElRepo('verificaycumple/functions/api/flow.js', 'FLOW_JS'));

let ok = 0, malo = 0;
const eq = (n, r, e) => {
  if (JSON.stringify(r) === JSON.stringify(e)) ok++;
  else { malo++; console.log(`  FALLA ${n}: esperado ${JSON.stringify(e)}, real ${JSON.stringify(r)}`); }
};
const cierto = (n, v) => eq(n, Boolean(v), true);
const falso = (n, v) => eq(n, Boolean(v), false);

const SECRETO = 'llave-de-prueba-no-es-real';

/* ================================================================== */
console.log('=== 1. LA FIRMA, contra el ejemplo de la documentacion de Flow ===');
{
  // El ejemplo textual de https://www.flow.cl/docs/api.html:
  //   "apiKey" = "XXXX-XXXX-XXXX", "currency" = "CLP", "amount" = 5000
  //   El string ordenado para firmar deberia ser: "amount5000apiKeyXXXX-XXXX-XXXXcurrencyCLP"
  //
  // No se puede llamar a una funcion privada, asi que se comprueba por el efecto: si la firma
  // que produce el adaptador coincide con el HMAC de ESE string calculado aparte, entonces el
  // adaptador esta concatenando exactamente como Flow manda.
  const ESPERADO = 'amount5000apiKeyXXXX-XXXX-XXXXcurrencyCLP';
  const oraculo = createHmac('sha256', SECRETO).update(ESPERADO).digest('hex');

  const firma = await F.firmarFlow(
    { apiKey: 'XXXX-XXXX-XXXX', currency: 'CLP', amount: 5000 }, SECRETO);
  eq('la firma calza con el ejemplo publicado por Flow', firma, oraculo);
  eq('y es hexadecimal de 64 caracteres', /^[0-9a-f]{64}$/.test(firma), true);

  // EL ORDEN IMPORTA Y NO ES EL DE INSERCION. Si se firmara en el orden en que llegan las
  // claves, este caso daria distinto al de arriba aunque los datos sean los mismos.
  const alReves = await F.firmarFlow(
    { currency: 'CLP', amount: 5000, apiKey: 'XXXX-XXXX-XXXX' }, SECRETO);
  eq('el orden de las claves no cambia la firma', alReves, firma);

  // `s` NO se firma: es donde va la propia firma.
  const conS = await F.firmarFlow(
    { apiKey: 'XXXX-XXXX-XXXX', currency: 'CLP', amount: 5000, s: 'basura' }, SECRETO);
  eq('el parametro s se excluye de la firma', conS, firma);

  // Un valor distinto SI la cambia, o no estaria firmando nada.
  const otro = await F.firmarFlow(
    { apiKey: 'XXXX-XXXX-XXXX', currency: 'CLP', amount: 5001 }, SECRETO);
  falso('un monto distinto da otra firma', otro === firma);

  // Y la secretKey se limpia antes de usarse: una pegada con un espacio al final se ve
  // cargada en el panel y produce una firma que Flow rechaza sin decir por que.
  const conEspacios = await F.firmarFlow(
    { apiKey: 'XXXX-XXXX-XXXX', currency: 'CLP', amount: 5000 }, `  ${SECRETO}\n`);
  eq('la secretKey se recorta antes de firmar', conEspacios, firma);

  let lanzo = false;
  try { await F.firmarFlow({ a: 1 }, '   '); } catch { lanzo = true; }
  cierto('sin secretKey no firma: lanza en vez de producir algo invalido', lanzo);
}

/* ================================================================== */
console.log('=== 2. crear el pago ===');
{
  const CRED = { apiKey: 'AK', secretKey: SECRETO, base: F.BASE_SANDBOX };
  const ID = 'vyc_' + 'a'.repeat(32);
  const URLS = { confirmacion: 'https://verifica.spindlelab.cl/api/flow-confirma',
    vuelta: 'https://verifica.spindlelab.cl/pedido/?id=' + ID };

  let visto = null;
  const red = async (u, o) => {
    visto = { url: String(u), cuerpo: o && o.body, metodo: o && o.method };
    return { ok: true, status: 200, headers: { get: () => null },
      json: async () => ({ url: 'https://sandbox.flow.cl/app/web/pay.php', token: 'TOK123', flowOrder: 77 }) };
  };
  const r = await F.crearPagoFlow(
    { idPedido: ID, correo: 'a@b.cl', monto: 177310, titulo: 'Kit', urls: URLS, timeoutSegundos: 86400 },
    CRED, red);

  cierto('crea el pago', r.ok);
  // LA CONCATENACION DE LA URL NO ES INTUITIVA: Flow devuelve url y token por separado y hay
  // que pegarlos. Quien lea solo la respuesta pensaria que `url` ya sirve.
  eq('el destino pega la url con el token',
    r.destino, 'https://sandbox.flow.cl/app/web/pay.php?token=TOK123');
  eq('va al endpoint de crear', visto.url, `${F.BASE_SANDBOX}/payment/create`);
  eq('por POST', visto.metodo, 'POST');

  const enviado = Object.fromEntries(new URLSearchParams(visto.cuerpo));
  eq('manda NUESTRO id como commerceOrder', enviado.commerceOrder, ID);
  eq('el monto', enviado.amount, '177310');
  eq('la moneda', enviado.currency, 'CLP');
  eq('el correo del comprador', enviado.email, 'a@b.cl');
  eq('todos los medios de pago', enviado.paymentMethod, String(F.TODOS_LOS_MEDIOS));
  eq('la url de confirmacion', enviado.urlConfirmation, URLS.confirmacion);
  eq('la de vuelta', enviado.urlReturn, URLS.vuelta);
  // SIN `timeout` UNA ORDEN IMPAGA QUEDA PAGABLE PARA SIEMPRE, y dos ordenes vivas por el
  // mismo kit es cobrar dos veces. Es la misma razon por la que el otro proveedor llevaba
  // expiration_time.
  eq('y el vencimiento en segundos', enviado.timeout, '86400');
  cierto('con la firma', /^[0-9a-f]{64}$/.test(enviado.s));

  // Lo que NO puede pasar sin avisar.
  eq('sin credenciales no llama a nadie',
    (await F.crearPagoFlow({ idPedido: ID, correo: 'a@b.cl', monto: 1, titulo: 'x', urls: URLS },
      { apiKey: '', secretKey: '', base: F.BASE_SANDBOX },
      async () => { throw new Error('no deberia llamarse'); })).error, 'sin-credenciales');
  eq('un monto invalido se rechaza antes de la red',
    (await F.crearPagoFlow({ idPedido: ID, correo: 'a@b.cl', monto: 0, titulo: 'x', urls: URLS },
      CRED, async () => { throw new Error('no deberia llamarse'); })).error, 'monto-invalido:0');

  // Una respuesta 200 pero sin url ni token NO es exito: el pago puede haber quedado creado
  // del otro lado, asi que se informa aparte en vez de tratarlo como un fallo de red.
  const sinUrl = await F.crearPagoFlow(
    { idPedido: ID, correo: 'a@b.cl', monto: 177310, titulo: 'Kit', urls: URLS }, CRED,
    async () => ({ ok: true, status: 200, headers: { get: () => null }, json: async () => ({}) }));
  falso('sin url ni token no es exito', sinUrl.ok);
  eq('y se dice cual es el caso', sinUrl.error, 'sin-url-ni-token');

  // El identificador de la peticion, para poder pedirle a Flow que busque en SUS registros.
  const rechazo = await F.crearPagoFlow(
    { idPedido: ID, correo: 'a@b.cl', monto: 177310, titulo: 'Kit', urls: URLS }, CRED,
    async () => ({ ok: false, status: 401, headers: { get: (h) => (String(h).toLowerCase() === 'x-request-id' ? 'rid-9' : null) },
      json: async () => ({ code: 1, message: 'Invalid signature' }) }));
  eq('un rechazo dice el estado', rechazo.error, 'http-401');
  eq('y guarda el x-request-id', rechazo.requestId, 'rid-9');
  eq('y el cuerpo de Flow', rechazo.detalleFlow.message, 'Invalid signature');
}

/* ================================================================== */
console.log('=== 3. leer el estado del pago ===');
{
  const CRED = { apiKey: 'AK', secretKey: SECRETO, base: F.BASE_SANDBOX };
  let visto = null;
  const r = await F.leerPagoFlow('TOK123', CRED, async (u) => {
    visto = String(u);
    return { ok: true, status: 200, json: async () => ({ commerceOrder: 'vyc_x', status: 2, amount: 177310 }) };
  });
  cierto('lee el pago', r.ok);
  cierto('va al endpoint de estado', visto.startsWith(`${F.BASE_SANDBOX}/payment/getStatus?`));
  const q = new URLSearchParams(visto.split('?')[1]);
  eq('manda el token', q.get('token'), 'TOK123');
  cierto('firmado', /^[0-9a-f]{64}$/.test(q.get('s')));
  eq('sin token no llama', (await F.leerPagoFlow('', CRED,
    async () => { throw new Error('no deberia llamarse'); })).error, 'sin-token');
}

/* ================================================================== */
console.log('=== 4. QUE CADA ESTADO DE FLOW HAGA LO QUE SE OBSERVO, Y NADA MAS ===');
{
  // Flow NO documenta el significado de los numeros de `status`, asi que el mapa se lleno con
  // pagos reales en el sandbox el 29-oct-2026:
  //
  //   1 = sin pagar (recien creado, paymentData en null)
  //   2 = pagado    (paymentData con fecha, medio, monto, comision y abono; visto dos veces)
  //   3 = rechazado (rechazado a proposito en el simulador, paymentData en null)
  //
  // Lo que esta prueba cuida NO es que el mapa tenga tres numeros. Es que cada numero haga lo
  // que se observo, y que lo NO observado no haga nada.
  const PEDIDO = { id: 'vyc_1', monto_total: 177310, estado: 'creado' };
  const PAGO = (x = {}) => ({ commerceOrder: 'vyc_1', amount: 177310, status: 2, ...x });

  const d1 = F.decidirDesdeFlow({ pedido: PEDIDO, pago: PAGO({ status: 1 }) });
  eq('el 1 no mueve el pedido', d1.accion, F.ACCIONES_FLOW.NADA);
  eq('y lo deja en el estado que ya tenia', d1.estado, 'creado');

  const d2 = F.decidirDesdeFlow({ pedido: PEDIDO, pago: PAGO({ status: 2 }) });
  eq('el 2 marca', d2.accion, F.ACCIONES_FLOW.MARCAR);
  eq('y el destino es pagado', d2.estado, 'pagado');

  const d3 = F.decidirDesdeFlow({ pedido: PEDIDO, pago: PAGO({ status: 3 }) });
  eq('el 3 marca', d3.accion, F.ACCIONES_FLOW.MARCAR);
  eq('y el destino es rechazado', d3.estado, 'rechazado');

  // ⚠️ LA ASERCION QUE MAS CUIDA, y no es ninguna de las de arriba.
  //
  // Flow tiene al menos un estado mas (el 4) que NO se observo. Escribirlo de memoria —«seguro
  // es anulada»— es exactamente la suposicion que el mapa existe para evitar, y es gratis de
  // hacer: una linea, nadie se entera, y si el 4 resultara ser otra cosa el error aparece
  // recien el dia que alguien pague.
  for (const n of [0, 4, 5, 99, -1]) {
    const d = F.decidirDesdeFlow({ pedido: PEDIDO, pago: PAGO({ status: n }) });
    eq(`el estado ${n}, sin observar, se revisa`, d.accion, F.ACCIONES_FLOW.REVISAR);
    eq(`el estado ${n} no mueve el pedido`, d.estado, null);
    eq(`y dice por que`, d.motivo, 'estado-sin-confirmar');
  }
  falso('el 4 NO esta en el mapa (no se agrega sin un pago que lo respalde)', 4 in F.ESTADOS_FLOW);

  // ── EL PAGO PARCIAL, que con el otro proveedor ya costo un hallazgo real ───────────────
  const parcial = F.decidirDesdeFlow({
    pedido: PEDIDO, pago: PAGO({ status: 2, paymentData: { amount: '90000.00' } }),
  });
  eq('pagado por menos de lo vendido: se revisa', parcial.accion, F.ACCIONES_FLOW.REVISAR);
  eq('y se dice que no alcanza', parcial.motivo, 'pagado-no-alcanza');
  eq('y NO se mueve el pedido', parcial.estado, null);

  // ⚠️ LA OTRA CARA, QUE ES LA QUE SE ROMPE SOLA AL "ENDURECER" LA DE ARRIBA.
  //
  // La condicion tiene que ser MENOR, no DISTINTO. En cuotas lo acreditado puede superar el
  // precio; con una comparacion por igualdad, TODA venta en cuotas quedaria sin marcar — y en
  // Chile las cuotas son lo normal, asi que seria la mayoria. Un cambio de `<` a `!==` se lee
  // como «mas estricto, mejor» y es el error mas caro posible en este archivo.
  const cuotas = F.decidirDesdeFlow({
    pedido: PEDIDO, pago: PAGO({ status: 2, paymentData: { amount: '195000.00' } }),
  });
  eq('acreditado MAYOR (cuotas con interes): se marca igual', cuotas.accion, F.ACCIONES_FLOW.MARCAR);
  eq('y queda pagado', cuotas.estado, 'pagado');

  // Lo ausente no acusa: misma regla que `DETALLES_PAGO_LIMPIO` en cobro.js. Solo vimos
  // `paymentData.amount` en un pago; exigirlo siempre convertiria cualquier variacion del
  // proveedor en ventas cobradas y sin marcar.
  for (const pd of [undefined, null, {}, { amount: null }]) {
    const d = F.decidirDesdeFlow({ pedido: PEDIDO, pago: PAGO({ status: 2, paymentData: pd }) });
    eq(`sin monto acreditado legible (${JSON.stringify(pd)}) se marca igual`, d.accion, F.ACCIONES_FLOW.MARCAR);
  }

  // Las defensas que ya aprendimos con el otro proveedor, antes incluso de mirar el estado.
  eq('un pago de otro pedido se revisa',
    F.decidirDesdeFlow({ pedido: PEDIDO, pago: PAGO({ commerceOrder: 'vyc_otro' }) }).motivo,
    'referencia-no-calza');
  eq('un monto distinto se revisa',
    F.decidirDesdeFlow({ pedido: PEDIDO, pago: PAGO({ amount: 1000 }) }).motivo, 'monto-no-calza');
  eq('un monto vacio tambien',
    F.decidirDesdeFlow({ pedido: PEDIDO, pago: PAGO({ amount: null }) }).motivo, 'monto-no-calza');
  eq('sin pago no se toca el pedido',
    F.decidirDesdeFlow({ pedido: PEDIDO, pago: null }).motivo, 'sin-pago');
  eq('sin pedido se ignora',
    F.decidirDesdeFlow({ pedido: null, pago: PAGO() }).accion, F.ACCIONES_FLOW.IGNORAR);

  // ⚠️ EL ORDEN IMPORTA: el pedido de OTRO se revisa aunque su estado sea uno que marcaria.
  // Si la comprobacion de referencia quedara despues de la del estado, un pago ajeno con
  // status 2 marcaria un pedido que no es suyo.
  eq('un pago ajeno Y pagado sigue siendo referencia-no-calza',
    F.decidirDesdeFlow({ pedido: PEDIDO, pago: PAGO({ commerceOrder: 'vyc_otro', status: 2 }) }).motivo,
    'referencia-no-calza');

  // Y el monto como string, que es como Flow lo devuelve de verdad: lo observado fue
  // `amount: "1000"` arriba y `paymentData.amount: "1000.00"` adentro. Las dos formas.
  cierto('un monto string igual calza igual',
    F.decidirDesdeFlow({ pedido: PEDIDO, pago: PAGO({ amount: '177310' }) }).motivo !== 'monto-no-calza');
  eq('un acreditado con decimales ("177310.00") no se lee como menor',
    F.decidirDesdeFlow({ pedido: PEDIDO, pago: PAGO({ status: 2, paymentData: { amount: '177310.00' } }) }).accion,
    F.ACCIONES_FLOW.MARCAR);
}

console.log(`\n${ok} bien, ${malo} mal`);
process.exit(malo ? 1 : 0);
