/**
 * Pruebas del pedido (functions/api/pedidos.js).
 *
 *   node prueba-pedidos.mjs
 *
 * Lo que cuidan, en orden de importancia:
 *
 *   1. Que lo vendido quede CONGELADO. El instrumento se mueve —el catálogo de rastreadores ya
 *      creció, el puntaje de spindlelab.cl pasó de 73 a 100 en dos días por un cambio de
 *      reglas, y el arreglo del falso rojo movió sitios de 77 a 100— y lo que alguien compró
 *      no puede moverse con él.
 *
 *   2. Que el id del pedido cumpla la regla de Mercado Pago Y sea imposible de adivinar. Es la
 *      llave con la que alguien entra a ver su pedido.
 *
 *   3. Que el cuerpo de la orden sea exactamente el que Mercado Pago espera. Los nombres y
 *      tipos salen de su referencia leída el 23-oct-2026, no de memoria.
 *
 *   4. Que la máquina de estados aguante que la misma notificación llegue varias veces, porque
 *      Mercado Pago reintenta cada 15 minutos hasta recibir un 200.
 */

import { rutaEnElRepo } from './rutas.mjs';

const RUTA = rutaEnElRepo('verificaycumple/functions/api/pedidos.js', 'PEDIDOS_JS');
const m = await import(RUTA);

let ok = 0, malo = 0;
const eq = (n, r, e) => {
  if (JSON.stringify(r) === JSON.stringify(e)) ok++;
  else { malo++; console.log(`  FALLA ${n}: esperado ${JSON.stringify(e)}, real ${JSON.stringify(r)}`); }
};
const cierto = (n, v) => eq(n, Boolean(v), true);
const falso = (n, v) => eq(n, Boolean(v), false);
const lanza = (n, fn) => {
  try { fn(); malo++; console.log(`  FALLA ${n}: no lanzó`); }
  catch { ok++; }
};

const item = (id, titulo) => ({ id, titulo, estado: 'pendiente' });

/* ================================================================== */
console.log('=== 1. el id del pedido: regla de Mercado Pago e imposible de adivinar ===');
{
  const id = m.nuevoIdPedido();
  cierto('cumple la regla de external_reference', m.ID_VALIDO_MP.test(id));
  cierto('bajo los 64 caracteres', id.length <= 64);
  falso('sin guiones del uuid (el formato queda parejo)', /-/.test(id.slice(4)));
  falso('sin caracteres prohibidos por la doc', /[[\]().'@]/.test(id));

  // Mil ids seguidos, todos distintos: si se repitieran, dos pedidos compartirían llave.
  const muchos = new Set(Array.from({ length: 1000 }, () => m.nuevoIdPedido()));
  eq('mil ids, mil distintos', muchos.size, 1000);

  // Con un uuid dado, el id es determinista: así se puede fijar en una prueba.
  eq('determinista con un uuid dado',
    m.nuevoIdPedido('aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee'), 'vyc_aaaaaaaabbbbccccddddeeeeeeeeeeee');
}

/* ================================================================== */
console.log('=== 2. lo vendido queda congelado, no referenciado ===');
{
  const informe = { puntaje: 30, revisado: 'https://www.ejemplo.cl/', items: [item('carga', 'x')] };
  const eleg = {
    puede: true,
    cierra: [item('carga', 'Rastreadores que parten solos'), item('cmp', 'Permiso antes de cargar')],
    noCierra: [item('politica', 'Enlace a tu política de privacidad')],
  };
  const c = m.congelarContrato({ informe, elegibilidad: eleg, montoNeto: 149000, montoTotal: 177310, urlMedida: null });

  eq('guarda qué señales se contrataron', c.senales_contratadas, ['carga', 'cmp']);
  eq('y cuáles quedaron fuera', c.senales_fuera, ['politica']);
  eq('toma la URL medida del informe si no se da otra', c.url_medida, 'https://www.ejemplo.cl/');
  eq('el monto queda congelado', [c.monto_neto, c.monto_total], [149000, 177310]);
  cierto('lleva la fecha de congelado', /^\d{4}-\d{2}-\d{2}T/.test(c.congelado_en));

  // LA PRUEBA QUE IMPORTA: el informe se guarda como COPIA, no como referencia. Si se mutara
  // el original, el pedido no debe cambiar.
  //
  // El tipo se comprueba ANTES de parsear, y no es ceremonia: guardar el objeto en vez de su
  // texto hacía que `JSON.parse` lanzara un SyntaxError y la prueba MURIERA en vez de fallar.
  // Una prueba que muere se ve, en la corrida de la batería, como «sin línea de cierre», que
  // es fácil de confundir con otra cosa. Mejor que falle y diga qué pasó.
  eq('el informe se guarda como TEXTO, no como objeto', typeof c.informe_json, 'string');
  const guardado = typeof c.informe_json === 'string' ? JSON.parse(c.informe_json) : {};
  eq('el informe se guardó entero', guardado.puntaje, 30);
  informe.puntaje = 100;
  informe.items.push(item('inventado', 'algo que no estaba'));
  const releer = () => (typeof c.informe_json === 'string' ? JSON.parse(c.informe_json) : {});
  eq('mutar el original NO toca el pedido', releer().puntaje, 30);
  eq('ni le agrega señales', (releer().items || []).length, 1);

  // Y las listas de señales tampoco son referencias vivas.
  eleg.cierra.push(item('aviso', 'otra'));
  eq('agregar señales después no cambia lo contratado', c.senales_contratadas, ['carga', 'cmp']);
}

/* ================================================================== */
console.log('=== 3. no se congela un contrato de quien no puede comprar ===');
{
  lanza('sin elegibilidad', () => m.congelarContrato({ informe: {}, elegibilidad: null, montoNeto: 1, montoTotal: 1 }));
  lanza('con puede=false', () => m.congelarContrato({
    informe: {}, elegibilidad: { puede: false, cierra: [], noCierra: [] }, montoNeto: 1, montoTotal: 1 }));
}

/* ================================================================== */
console.log('=== 4. el cuerpo de la orden es el que Mercado Pago espera ===');
{
  const id = m.nuevoIdPedido('11111111-2222-3333-4444-555555555555');
  const cuerpo = m.armarOrdenMP({
    idPedido: id,
    correo: 'cliente@ejemplo.cl',
    montoTotal: 177310,
    titulo: 'Kit de implementación · Verifica y Cumple',
    urls: { exito: 'https://v.cl/ok', pendiente: 'https://v.cl/esperando', rechazo: 'https://v.cl/no' },
  });

  eq('type solo acepta online', cuerpo.type, 'online');
  eq('processing_mode solo acepta manual', cuerpo.processing_mode, 'manual');
  eq('total_amount va como STRING', typeof cuerpo.total_amount, 'string');
  eq('y sin decimales, que el peso no tiene', cuerpo.total_amount, '177310');
  eq('el external_reference es nuestro id', cuerpo.external_reference, id);
  eq('payer.email, que es obligatorio', cuerpo.payer.email, 'cliente@ejemplo.cl');
  eq('un item', cuerpo.items.length, 1);
  eq('unit_price también string', typeof cuerpo.items[0].unit_price, 'string');
  eq('quantity entero', cuerpo.items[0].quantity, 1);
  eq('las urls de vuelta van en config.online', Object.keys(cuerpo.config.online).sort(),
    ['failure_url', 'pending_url', 'success_url']);

  // NO existe campo de moneda en Orders: el CLP sale de la cuenta del vendedor. Mandar uno
  // sería inventar un campo.
  falso('no manda currency_id', 'currency_id' in cuerpo);
  falso('ni dentro del item', 'currency_id' in cuerpo.items[0]);
  // La URL del webhook se configura en el panel, no en el cuerpo.
  falso('no manda notification_url', 'notification_url' in cuerpo);

  // El tope de 256 de la doc.
  const largo = m.armarOrdenMP({ idPedido: id, correo: 'a@b.cl', montoTotal: 1000,
    titulo: 'x'.repeat(400), urls: { exito: 'a', pendiente: 'b', rechazo: 'c' } });
  eq('el título se recorta a 256', largo.items[0].title.length, 256);
}

/* ================================================================== */
console.log('=== 5. la orden no se arma con datos que Mercado Pago va a rechazar ===');
{
  const urls = { exito: 'a', pendiente: 'b', rechazo: 'c' };
  lanza('id con caracteres prohibidos', () => m.armarOrdenMP({
    idPedido: 'pedido (uno)', correo: 'a@b.cl', montoTotal: 1000, titulo: 't', urls }));
  lanza('id con arroba', () => m.armarOrdenMP({
    idPedido: 'ped@ido', correo: 'a@b.cl', montoTotal: 1000, titulo: 't', urls }));
  lanza('id de más de 64', () => m.armarOrdenMP({
    idPedido: 'a'.repeat(65), correo: 'a@b.cl', montoTotal: 1000, titulo: 't', urls }));
  lanza('sin correo', () => m.armarOrdenMP({
    idPedido: 'ok_1', correo: '', montoTotal: 1000, titulo: 't', urls }));
  lanza('monto con decimales', () => m.armarOrdenMP({
    idPedido: 'ok_1', correo: 'a@b.cl', montoTotal: 1000.5, titulo: 't', urls }));
  lanza('monto cero', () => m.armarOrdenMP({
    idPedido: 'ok_1', correo: 'a@b.cl', montoTotal: 0, titulo: 't', urls }));
  lanza('monto negativo', () => m.armarOrdenMP({
    idPedido: 'ok_1', correo: 'a@b.cl', montoTotal: -1000, titulo: 't', urls }));
}

/* ================================================================== */
console.log('=== 6. las UTM se guardan enteras, no reducidas a un origen ===');
{
  const u = m.utmsDe('https://verifica.spindlelab.cl/?utm_source=ig&utm_medium=paid&utm_campaign=vyc-rubros&utm_content=contadores-b&utm_term=ley');
  eq('las cinco', u, {
    utm_source: 'ig', utm_medium: 'paid', utm_campaign: 'vyc-rubros',
    utm_content: 'contadores-b', utm_term: 'ley',
  });
  // Lo que importa de verdad: distinguir el conjunto y la creatividad, que el «origen» de
  // lista cerrada del chequeo no distingue.
  eq('distingue el conjunto', u.utm_campaign, 'vyc-rubros');
  eq('y la creatividad', u.utm_content, 'contadores-b');

  eq('sin utm, objeto vacío', m.utmsDe('https://verifica.spindlelab.cl/'), {});
  eq('url inválida no revienta', m.utmsDe('esto no es una url'), {});
  eq('url nula tampoco', m.utmsDe(null), {});
  // No se normaliza a una lista cerrada: es un dato de campaña y se guarda tal cual.
  eq('un valor desconocido se guarda igual',
    m.utmsDe('https://v.cl/?utm_source=algo-que-nadie-previo').utm_source, 'algo-que-nadie-previo');
  eq('un valor larguísimo se recorta',
    m.utmsDe('https://v.cl/?utm_source=' + 'x'.repeat(500)).utm_source.length, 200);
}

/* ================================================================== */
console.log('=== 7. la máquina de estados aguanta la notificación repetida ===');
{
  const E = m.ESTADOS;
  // Mercado Pago reintenta cada 15 minutos hasta recibir un 200. El mismo evento VA a llegar
  // varias veces, y procesarlo de nuevo tiene que ser inofensivo.
  cierto('creado → creado (reintento)', m.transicionValida(E.CREADO, E.CREADO));
  cierto('pagado → pagado (reintento)', m.transicionValida(E.PAGADO, E.PAGADO));

  cierto('creado → pagado', m.transicionValida(E.CREADO, E.PAGADO));
  cierto('creado → rechazado', m.transicionValida(E.CREADO, E.RECHAZADO));
  cierto('pagado → entregado', m.transicionValida(E.PAGADO, E.ENTREGADO));
  cierto('pagado → devuelto', m.transicionValida(E.PAGADO, E.DEVUELTO));
  cierto('rechazado → creado (reintenta el pago)', m.transicionValida(E.RECHAZADO, E.CREADO));

  // LO QUE NO PUEDE PASAR SOLO. Una vez confirmado contra la API, una notificación posterior
  // no degrada el pedido: eso se mira a mano.
  falso('pagado → rechazado NO', m.transicionValida(E.PAGADO, E.RECHAZADO));
  falso('pagado → creado NO', m.transicionValida(E.PAGADO, E.CREADO));
  falso('entregado → pagado NO', m.transicionValida(E.ENTREGADO, E.PAGADO));
  falso('devuelto no sale de ahí', m.transicionValida(E.DEVUELTO, E.PAGADO));
  falso('creado → entregado se salta el pago', m.transicionValida(E.CREADO, E.ENTREGADO));
  falso('un estado inventado no transiciona', m.transicionValida('loquesea', E.PAGADO));
  falso('ni como destino', m.transicionValida(E.CREADO, 'loquesea'));
}

/* ================================================================== */
console.log('=== 8. el esquema guarda lo congelado y protege contra el evento repetido ===');
{
  const s = m.ESQUEMA;
  for (const col of ['senales_contratadas', 'informe_json', 'monto_neto', 'monto_total', 'url_medida']) {
    cierto(`la tabla guarda ${col}`, new RegExp(`\\b${col}\\b`).test(s));
  }
  for (const col of m.CAMPOS_UTM) {
    cierto(`guarda ${col}`, new RegExp(`\\b${col}\\b`).test(s));
  }
  // Los datos de facturación van DESPUÉS del pago, pero la columna existe desde el principio.
  for (const col of ['razon_social', 'rut', 'giro', 'direccion']) {
    cierto(`tiene la columna ${col} para después del pago`, new RegExp(`\\b${col}\\b`).test(s));
  }
  cierto('hay tabla de eventos de Mercado Pago', /CREATE TABLE IF NOT EXISTS eventos_mp/.test(s));
  cierto('con el id como clave primaria, para que el repetido sea imposible',
    /eventos_mp \(\s*\n\s*id\s+TEXT PRIMARY KEY/.test(s));
  cierto('el informe final tiene dónde guardarse', /informe_final_json/.test(s));
  // Lo que NO debe estar: nada de la tarjeta, nunca.
  falso('no hay columna de tarjeta', /tarjeta|card|cvv|numero_tarjeta/i.test(s));
}

console.log(`\n${ok} bien, ${malo} mal`);
process.exit(malo ? 1 : 0);
