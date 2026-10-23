/**
 * Pruebas de la verificación de firma del webhook de Mercado Pago.
 *
 *   node prueba-firma-mp.mjs
 *
 * Esto cuida la pieza por la que se puede marcar un pedido como pagado. Si falla, cualquiera
 * con la URL del webhook cobra gratis. Por eso es la prueba más paranoica de la casa.
 *
 * EL VECTOR CONOCIDO viene del ejemplo oficial de Mercado Pago para Orders API, leído el
 * 23-oct-2026. Es un manifiesto real publicado por ellos:
 *
 *   data.id      ORD01M28P44G5FG8RJPM579EH56FV   (en mayúsculas, como llega)
 *   x-request-id 2066ca19-c6f1-498a-be75-1923005edd06
 *   ts           1742505638683
 *   manifiesto   id:ord01m28p44g5fg8rjpm579eh56fv;request-id:2066ca19-...;ts:1742505638683;
 *
 * Mercado Pago no publica la clave secreta con que generó SU hash, así que no se puede
 * comprobar su `v1`. Lo que sí se comprueba, y es lo que importa: que con una clave nuestra el
 * HMAC de Web Crypto da lo mismo que el de Node (el camino del ejemplo oficial), y que las
 * tres equivocaciones clásicas del manifiesto dan un hash DISTINTO.
 */

import { createHmac } from 'node:crypto';
import { rutaEnElRepo } from './rutas.mjs';

const RUTA = rutaEnElRepo('verificaycumple/functions/api/firma-mp.js', 'FIRMA_MP_JS');
const m = await import(RUTA);

let ok = 0, malo = 0;
const eq = (n, r, e) => {
  if (JSON.stringify(r) === JSON.stringify(e)) ok++;
  else { malo++; console.log(`  FALLA ${n}: esperado ${JSON.stringify(e)}, real ${JSON.stringify(r)}`); }
};
const cierto = (n, v) => eq(n, Boolean(v), true);
const falso = (n, v) => eq(n, Boolean(v), false);

const DATA_ID = 'ORD01M28P44G5FG8RJPM579EH56FV';
const REQUEST_ID = '2066ca19-c6f1-498a-be75-1923005edd06';
const TS = '1742505638683';
const MANIFIESTO_OFICIAL =
  'id:ord01m28p44g5fg8rjpm579eh56fv;request-id:2066ca19-c6f1-498a-be75-1923005edd06;ts:1742505638683;';
const SECRETO = 'una-clave-secreta-de-prueba';

const nodeHmac = (sec, msg) => createHmac('sha256', sec).update(msg).digest('hex');

/* ================================================================== */
console.log('=== 1. el manifiesto, carácter por carácter ===');
{
  const hecho = m.armarManifiesto({ dataId: DATA_ID, requestId: REQUEST_ID, ts: TS });
  eq('calza con el del ejemplo oficial', hecho, MANIFIESTO_OFICIAL);
  cierto('termina en punto y coma', hecho.endsWith(';'));
  falso('no tiene ni un espacio', / /.test(hecho));
  cierto('el data.id va en minúsculas', hecho.includes('id:ord01m28'));
  falso('y NO en mayúsculas', hecho.includes('ORD01M28'));
  cierto('la etiqueta es request-id, con guion', hecho.includes(';request-id:'));
  falso('y NO x-request-id', hecho.includes('x-request-id:'));
}

/* ================================================================== */
console.log('=== 2. un campo ausente se quita entero, no queda vacío ===');
{
  // La doc: «Si alguno de los valores no está presente, debes removerlo del manifest». Pasa de
  // verdad con las notificaciones estilo IPN, que llegan sin data.id.
  const sinData = m.armarManifiesto({ requestId: REQUEST_ID, ts: TS });
  eq('sin data.id', sinData, `request-id:${REQUEST_ID};ts:${TS};`);
  falso('no deja "id:" colgando', sinData.includes('id:;'));

  const sinReq = m.armarManifiesto({ dataId: DATA_ID, ts: TS });
  eq('sin request-id', sinReq, `id:${DATA_ID.toLowerCase()};ts:${TS};`);

  const soloTs = m.armarManifiesto({ ts: TS });
  eq('solo ts: el ts NO es condicional', soloTs, `ts:${TS};`);

  // Una cadena vacía cuenta como ausente, no como presente-con-valor-vacío.
  eq('data.id vacío se trata como ausente',
    m.armarManifiesto({ dataId: '', requestId: REQUEST_ID, ts: TS }), `request-id:${REQUEST_ID};ts:${TS};`);
}

/* ================================================================== */
console.log('=== 3. Web Crypto da lo mismo que Node (el camino del ejemplo oficial) ===');
{
  const nuestro = await m.hmacHex(SECRETO, MANIFIESTO_OFICIAL);
  eq('mismo hash', nuestro, nodeHmac(SECRETO, MANIFIESTO_OFICIAL));
  cierto('64 caracteres hex en minúscula', /^[0-9a-f]{64}$/.test(nuestro));
}

/* ================================================================== */
console.log('=== 4. las tres equivocaciones clásicas dan OTRO hash ===');
{
  const bueno = await m.hmacHex(SECRETO, MANIFIESTO_OFICIAL);
  const sinPuntoYComa = await m.hmacHex(SECRETO, MANIFIESTO_OFICIAL.slice(0, -1));
  const conMayusculas = await m.hmacHex(SECRETO,
    MANIFIESTO_OFICIAL.replace('ord01m28p44g5fg8rjpm579eh56fv', DATA_ID));
  const conEspacios = await m.hmacHex(SECRETO, MANIFIESTO_OFICIAL.replace(/;/g, '; '));
  falso('sin el punto y coma final no coincide', bueno === sinPuntoYComa);
  falso('con el data.id en mayúsculas no coincide', bueno === conMayusculas);
  falso('con espacios tras los ; no coincide', bueno === conEspacios);
}

/* ================================================================== */
console.log('=== 5. partir la cabecera x-signature ===');
{
  eq('el caso normal', m.partirFirma(`ts=${TS},v1=abc`), { ts: TS, v1: 'abc' });
  eq('con espacios alrededor', m.partirFirma(` ts = ${TS} , v1 = abc `), { ts: TS, v1: 'abc' });
  // Se comparan los VALORES, no la serialización: JSON.stringify respeta el orden de las
  // claves y acá el orden es justo lo que no importa.
  const alReves = m.partirFirma(`v1=abc,ts=${TS}`);
  eq('el orden no importa: ts', alReves.ts, TS);
  eq('el orden no importa: v1', alReves.v1, 'abc');
  // Se parte por el PRIMER '=', no por todos: un valor con '=' adentro no debe romperse.
  eq('un valor con = adentro sobrevive', m.partirFirma('ts=1,v1=ab=cd').v1, 'ab=cd');
  eq('cabecera vacía', m.partirFirma(''), null);
  eq('cabecera que no es texto', m.partirFirma(null), null);
  eq('basura sin = se ignora', m.partirFirma('holaquetal'), {});
}

/* ================================================================== */
console.log('=== 6. una firma correcta se acepta ===');
{
  const v1 = await m.hmacHex(SECRETO, MANIFIESTO_OFICIAL);
  const r = await m.verificarFirma({
    dataId: DATA_ID, requestId: REQUEST_ID,
    cabeceraFirma: `ts=${TS},v1=${v1}`, secreto: SECRETO,
  });
  cierto('válida', r.valida);
  eq('el motivo', r.motivo, m.MOTIVOS.VALIDA);

  // Y en MAYÚSCULAS también, por si algún día cambia la forma en que lo mandan.
  const rMay = await m.verificarFirma({
    dataId: DATA_ID, requestId: REQUEST_ID,
    cabeceraFirma: `ts=${TS},v1=${v1.toUpperCase()}`, secreto: SECRETO,
  });
  cierto('un v1 en mayúsculas también vale', rMay.valida);
}

/* ================================================================== */
console.log('=== 7. todo lo que debe RECHAZARSE, y sin reventar ===');
{
  const v1 = await m.hmacHex(SECRETO, MANIFIESTO_OFICIAL);
  const base = { dataId: DATA_ID, requestId: REQUEST_ID, secreto: SECRETO };

  const casos = [
    ['sin cabecera',            { ...base, cabeceraFirma: null },                         m.MOTIVOS.SIN_CABECERA],
    ['cabecera vacía',          { ...base, cabeceraFirma: '' },                           m.MOTIVOS.SIN_CABECERA],
    ['sin v1',                  { ...base, cabeceraFirma: `ts=${TS}` },                   m.MOTIVOS.CABECERA_MALFORMADA],
    ['sin ts',                  { ...base, cabeceraFirma: `v1=${v1}` },                   m.MOTIVOS.CABECERA_MALFORMADA],
    ['v1 truncado',             { ...base, cabeceraFirma: `ts=${TS},v1=${v1.slice(0, 30)}` }, m.MOTIVOS.V1_MALFORMADO],
    ['v1 que no es hex',        { ...base, cabeceraFirma: `ts=${TS},v1=${'z'.repeat(64)}` },  m.MOTIVOS.V1_MALFORMADO],
    ['v1 vacío',                { ...base, cabeceraFirma: `ts=${TS},v1=` },               m.MOTIVOS.CABECERA_MALFORMADA],
    ['firma de otro',           { ...base, cabeceraFirma: `ts=${TS},v1=${'a'.repeat(64)}` }, m.MOTIVOS.NO_COINCIDE],
    ['sin secreto',             { dataId: DATA_ID, requestId: REQUEST_ID, cabeceraFirma: `ts=${TS},v1=${v1}` }, m.MOTIVOS.SIN_SECRETO],
  ];
  for (const [nombre, args, motivo] of casos) {
    const r = await m.verificarFirma(args);
    falso(`${nombre}: rechazada`, r.valida);
    eq(`${nombre}: el motivo`, r.motivo, motivo);
  }

  // EL FALLO DEL EJEMPLO OFICIAL: su timingSafeEqual LANZA con largos distintos o con
  // undefined. Acá ninguno de los nueve casos de arriba puede lanzar, y eso es lo que separa
  // un 401 de un 500.
  cierto('ninguno de los rechazos lanzó una excepción', true);
}

/* ================================================================== */
console.log('=== 8. si cambia UN dato, la firma deja de valer ===');
{
  const v1 = await m.hmacHex(SECRETO, MANIFIESTO_OFICIAL);
  const firma = `ts=${TS},v1=${v1}`;

  const otroData = await m.verificarFirma({
    dataId: 'ORD01OTROIDDISTINTO', requestId: REQUEST_ID, cabeceraFirma: firma, secreto: SECRETO });
  falso('otro data.id no valida', otroData.valida);

  const otroReq = await m.verificarFirma({
    dataId: DATA_ID, requestId: 'otro-request-id', cabeceraFirma: firma, secreto: SECRETO });
  falso('otro request-id no valida', otroReq.valida);

  const otroTs = await m.verificarFirma({
    dataId: DATA_ID, requestId: REQUEST_ID, cabeceraFirma: `ts=9999999999999,v1=${v1}`, secreto: SECRETO });
  falso('otro ts no valida', otroTs.valida);

  const otroSecreto = await m.verificarFirma({
    dataId: DATA_ID, requestId: REQUEST_ID, cabeceraFirma: firma, secreto: 'otra-clave' });
  falso('otra clave secreta no valida', otroSecreto.valida);
}

/* ================================================================== */
console.log('=== 9. la unidad del ts se detecta, no se asume ===');
{
  // La doc dice «milisegundos» y su propio ejemplo de `payment` trae segundos. Por eso esto.
  eq('trece dígitos: ya son ms', m.tsEnMilisegundos('1742505638683'), 1742505638683);
  eq('diez dígitos: eran segundos', m.tsEnMilisegundos('1704908010'), 1704908010000);
  eq('no numérico', m.tsEnMilisegundos('hola'), null);
  eq('cero', m.tsEnMilisegundos('0'), null);
}

/* ================================================================== */
console.log('=== 10. la tolerancia viene APAGADA, y es a propósito ===');
{
  const v1 = await m.hmacHex(SECRETO, MANIFIESTO_OFICIAL);
  const firma = `ts=${TS},v1=${v1}`;
  const viejisimo = Date.parse('2030-01-01T00:00:00Z');

  // Mercado Pago reintenta cada 15 minutos y no está documentado si el reintento trae el ts
  // original. Una ventana corta por defecto rechazaría reintentos legítimos.
  const apagada = await m.verificarFirma({
    dataId: DATA_ID, requestId: REQUEST_ID, cabeceraFirma: firma, secreto: SECRETO, ahoraMs: viejisimo });
  cierto('con la tolerancia apagada, un ts viejo igual vale', apagada.valida);

  const encendida = await m.verificarFirma({
    dataId: DATA_ID, requestId: REQUEST_ID, cabeceraFirma: firma, secreto: SECRETO,
    toleranciaMs: 5 * 60 * 1000, ahoraMs: viejisimo });
  falso('encendida, el mismo ts se rechaza', encendida.valida);
  eq('y el motivo lo dice', encendida.motivo, m.MOTIVOS.VENCIDA);

  const aTiempo = await m.verificarFirma({
    dataId: DATA_ID, requestId: REQUEST_ID, cabeceraFirma: firma, secreto: SECRETO,
    toleranciaMs: 5 * 60 * 1000, ahoraMs: Number(TS) + 1000 });
  cierto('encendida y a tiempo, vale', aTiempo.valida);
}

/* ================================================================== */
console.log('=== 11. la comparación recorre siempre todo ===');
{
  cierto('iguales', m.igualesEnTiempoConstante('abc', 'abc'));
  falso('distintas', m.igualesEnTiempoConstante('abc', 'abd'));
  falso('largos distintos', m.igualesEnTiempoConstante('abc', 'abcd'));
  falso('no es texto', m.igualesEnTiempoConstante('abc', null));
  falso('ninguno es texto', m.igualesEnTiempoConstante(null, undefined));
  cierto('vacías', m.igualesEnTiempoConstante('', ''));
}

console.log(`\n${ok} bien, ${malo} mal`);
process.exit(malo ? 1 : 0);
