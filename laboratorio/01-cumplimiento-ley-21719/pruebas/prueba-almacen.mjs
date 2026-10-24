/**
 * Pruebas del almacén de pedidos (functions/api/almacen.js).
 *
 *   node prueba-almacen.mjs
 *
 * ESTO NO ES UN SIMULACRO. Corre contra SQLite de verdad —el `node:sqlite` que trae Node 24—
 * con el MISMO esquema que se aplicó a D1. Es el mismo motor que corre debajo de D1, así que
 * una consulta que funciona acá funciona allá, y una que falla acá habría fallado en producción.
 *
 * El adaptador de abajo traduce la forma de llamar de D1 a la de node:sqlite. Son seis líneas
 * y es lo único fingido: el SQL, el esquema y el motor son los reales.
 *
 * Lo que cuidan, en orden de importancia:
 *
 *   1. Que un evento se procese UNA SOLA VEZ, aunque lleguen dos reintentos a la vez. La
 *      defensa es la clave primaria y un INSERT OR IGNORE, no un `if` en el handler.
 *   2. Que dos procesos no se pisen el estado. El UPDATE lleva el estado esperado en el WHERE.
 *   3. Que no se guarden datos de facturación de alguien que todavía no pagó.
 *   4. Que la vista pública no filtre el informe ni los datos de facturación.
 */

import { DatabaseSync } from 'node:sqlite';
import { rutaEnElRepo } from './rutas.mjs';

const A = await import(rutaEnElRepo('verificaycumple/functions/api/almacen.js', 'ALMACEN_JS'));
const P = await import(rutaEnElRepo('verificaycumple/functions/api/pedidos.js', 'PEDIDOS_JS'));

let ok = 0, malo = 0;
const eq = (n, r, e) => {
  if (JSON.stringify(r) === JSON.stringify(e)) ok++;
  else { malo++; console.log(`  FALLA ${n}: esperado ${JSON.stringify(e)}, real ${JSON.stringify(r)}`); }
};
const cierto = (n, v) => eq(n, Boolean(v), true);
const falso = (n, v) => eq(n, Boolean(v), false);

/**
 * «No lanza» es una afirmación de verdad, no ceremonia.
 *
 * Tres de las seis mutaciones de este archivo —quitar el OR IGNORE, sacar el estado del WHERE,
 * y caerse la lista blanca de columnas— hacen que SQLite tire una excepción, y entonces la
 * prueba MUERE en vez de fallar. En la corrida de la batería eso se ve como «sin línea de
 * cierre», que es fácil de confundir con otra cosa. Además, en producción una excepción acá
 * sería un 500 y Mercado Pago reintentaría ocho veces el mismo error.
 */
const noLanza = async (n, fn) => {
  try { await fn(); ok++; }
  catch (e) { malo++; console.log(`  FALLA ${n}: lanzó ${e && e.message}`); }
};

/**
 * El adaptador. D1 llama `.prepare(sql).bind(...).run()`; node:sqlite llama
 * `.prepare(sql).run(...)`. Esto es lo único que se traduce.
 */
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
  // EL MISMO esquema que se aplicó a D1, leído del mismo módulo. Si uno cambia, cambia el otro.
  for (const sentencia of P.ESQUEMA.split(';')) {
    if (sentencia.trim()) s.exec(sentencia + ';');
  }
  return comoD1(s);
}

const DATOS = () => ({
  id: P.nuevoIdPedido(),
  dominio: 'ejemplo.cl',
  url_medida: 'https://www.ejemplo.cl/',
  senales_contratadas: ['carga', 'cookies'],
  senales_fuera: ['politica'],
  informe_json: JSON.stringify({ puntaje: 30 }),
  monto_neto: 149000,
  monto_total: 177310,
  correo: 'cliente@ejemplo.cl',
  utm_source: 'ig', utm_campaign: 'vyc-rubros', utm_content: 'contadores-b',
});

/* ================================================================== */
console.log('=== 1. el esquema del módulo se aplica sin errores sobre SQLite real ===');
{
  const db = baseNueva();
  const p = await A.crearPedido(db, DATOS());
  cierto('se creó', Boolean(p.id));
  eq('nace en creado, no en pagado', p.estado, P.ESTADOS.CREADO);
}

/* ================================================================== */
console.log('=== 2. lo guardado vuelve igual, con las listas deserializadas ===');
{
  const db = baseNueva();
  const d = DATOS();
  await A.crearPedido(db, d);
  const leido = await A.leerPedido(db, d.id);

  eq('el dominio', leido.dominio, 'ejemplo.cl');
  eq('las señales vuelven como lista, no como texto', leido.senales_contratadas, ['carga', 'cookies']);
  eq('y las de afuera también', leido.senales_fuera, ['politica']);
  eq('el monto congelado', leido.monto_total, 177310);
  eq('la UTM entera', [leido.utm_source, leido.utm_campaign, leido.utm_content], ['ig', 'vyc-rubros', 'contadores-b']);
  eq('el informe se guardó como texto', typeof leido.informe_json, 'string');
  eq('un id que no existe devuelve null', await A.leerPedido(db, 'vyc_noexiste'), null);
  eq('un id vacío tampoco revienta', await A.leerPedido(db, null), null);
}

/* ================================================================== */
console.log('=== 3. EL EVENTO REPETIDO: solo el primero pasa ===');
{
  const db = baseNueva();
  const r1 = await A.registrarEvento(db, 'ev_12345', { tipo: 'payment' });
  cierto('el primero es nuevo', r1.primeraVez);

  // Mercado Pago reintenta hasta ocho veces. Las siete siguientes no pueden pasar.
  await noLanza('registrar el mismo evento otra vez NO lanza', () =>
    A.registrarEvento(db, 'ev_12345', { tipo: 'payment' }));
  const resto = [];
  for (let i = 0; i < 7; i++) resto.push(await A.registrarEvento(db, 'ev_12345', { tipo: 'payment' }));
  falso('ninguno de los siete reintentos pasa', resto.some((r) => r.primeraVez));
  eq('y todos dicen por qué', [...new Set(resto.map((r) => r.motivo))].sort(), ['repetido']);

  // Otro evento distinto sí pasa.
  cierto('un evento distinto sí es nuevo', (await A.registrarEvento(db, 'ev_99999')).primeraVez);
  eq('sin clave no se registra nada', (await A.registrarEvento(db, null)).motivo, 'sin-clave');
}

/* ================================================================== */
console.log('=== 4. EL ESTADO NO SE PISA ===');
{
  const db = baseNueva();
  const d = DATOS();
  await A.crearPedido(db, d);

  await noLanza('mover el estado NO lanza', () =>
    A.marcarEstado(db, d.id, P.ESTADOS.CREADO, P.ESTADOS.CREADO, { mp_payment_id: '0' }));
  const m = await A.marcarEstado(db, d.id, P.ESTADOS.CREADO, P.ESTADOS.PAGADO,
    { mp_payment_id: '777', pagado_en: '2026-10-23T12:00:00Z' });
  cierto('se movió', m.movido);
  eq('quedó pagado', (await A.leerPedido(db, d.id)).estado, P.ESTADOS.PAGADO);
  eq('y guardó el id del pago', (await A.leerPedido(db, d.id)).mp_payment_id, '777');

  // El segundo reintento cree que el pedido sigue en `creado`. No puede pisarlo.
  const segundo = await A.marcarEstado(db, d.id, P.ESTADOS.CREADO, P.ESTADOS.PAGADO, { mp_payment_id: 'OTRO' });
  falso('el que llega tarde no mueve nada', segundo.movido);
  eq('y dice por qué', segundo.motivo, 'ya-se-movio');
  eq('el id del pago NO se pisó', (await A.leerPedido(db, d.id)).mp_payment_id, '777');

  // Una transición que la máquina no permite ni siquiera toca la base.
  const invalida = await A.marcarEstado(db, d.id, P.ESTADOS.PAGADO, P.ESTADOS.RECHAZADO);
  falso('pagado no vuelve a rechazado', invalida.movido);
  eq('el motivo', invalida.motivo, 'transicion-invalida');
  eq('y el pedido sigue pagado', (await A.leerPedido(db, d.id)).estado, P.ESTADOS.PAGADO);
}

/* ================================================================== */
console.log('=== 5. solo se escriben las columnas de la lista blanca ===');
{
  const db = baseNueva();
  const d = DATOS();
  await A.crearPedido(db, d);
  // Un campo que no está permitido se ignora en silencio; lo que NO puede pasar es que se
  // arme SQL con un nombre que venga de afuera.
  await noLanza('un campo no permitido NO lanza, se ignora', () =>
    A.marcarEstado(db, d.id, P.ESTADOS.CREADO, P.ESTADOS.CREADO, { 'x; DROP TABLE pedidos;--': 1 }));
  const m = await A.marcarEstado(db, d.id, P.ESTADOS.CREADO, P.ESTADOS.PAGADO, {
    mp_payment_id: '1', correo: 'otro@malo.cl', estado: 'inventado', 'x; DROP TABLE pedidos;--': 1,
  });
  cierto('igual se movió', m.movido);
  const p = await A.leerPedido(db, d.id);
  eq('el correo NO se cambió', p.correo, 'cliente@ejemplo.cl');
  eq('el estado es el que corresponde', p.estado, P.ESTADOS.PAGADO);
  cierto('la tabla sigue existiendo', Boolean(await A.leerPedido(db, d.id)));
}

/* ================================================================== */
console.log('=== 6. la facturación solo se guarda sobre un pedido PAGADO ===');
{
  const db = baseNueva();
  const d = DATOS();
  await A.crearPedido(db, d);

  const antes = await A.guardarIntake(db, d.id, { razon_social: 'Ejemplo SpA', rut: '11.111.111-1' });
  falso('antes de pagar NO se guarda', antes.guardado);
  eq('y dice por qué', antes.motivo, 'no-pagado-o-no-existe');
  eq('la columna sigue vacía', (await A.leerPedido(db, d.id)).razon_social, null);

  await A.marcarEstado(db, d.id, P.ESTADOS.CREADO, P.ESTADOS.PAGADO);
  const despues = await A.guardarIntake(db, d.id, {
    razon_social: 'Ejemplo SpA', rut: '11.111.111-1', giro: 'Servicios', direccion: 'Calle 1',
    plataforma: 'WordPress', correo: 'intento@pisar.cl',
  });
  cierto('después de pagar sí', despues.guardado);
  eq('solo los campos permitidos', despues.campos.sort(),
    ['direccion', 'giro', 'plataforma', 'razon_social', 'rut']);
  const p = await A.leerPedido(db, d.id);
  eq('se guardó la razón social', p.razon_social, 'Ejemplo SpA');
  eq('y el correo NO se pisó', p.correo, 'cliente@ejemplo.cl');

  eq('sin campos válidos no hace nada',
    (await A.guardarIntake(db, d.id, { loquesea: 1 })).motivo, 'sin-campos');

  // LA LISTA BLANCA, MEZCLADA CON CAMPOS LEGÍTIMOS.
  //
  // Agregado el 24-oct, y vale aclarar por qué, porque la primera versión de este comentario
  // decía algo falso. Al mutar `guardarIntake` quitándole la lista blanca, la prueba del
  // ENDPOINT del intake siguió verde —el endpoint filtra por su cuenta y nunca le pasa un campo
  // ajeno—, y de ahí salió la conclusión apresurada de que la defensa no estaba cubierta. No es
  // cierto: las aserciones de más arriba de este mismo archivo sí la pillan. Lo que había
  // pasado es que se mutó un archivo y se corrió la prueba de otro.
  //
  // Lo que esto suma de verdad es el caso de campos buenos y malos MEZCLADOS en una sola
  // llamada, que es como llegaría un intento real: un `{loquesea: 1}` a secas cae en «sin
  // campos» por otro motivo y no ejercita el filtro.
  const antesDeColar = await A.leerPedido(db, d.id);
  const colado = await A.guardarIntake(db, d.id, {
    giro: 'Servicios médicos',
    monto_total: 1, monto_neto: 1, estado: 'entregado', correo: 'otro@sitio.cl',
    informe_json: '{}', mp_order_id: 'ORD_FALSA', id: 'otro_id',
  });
  cierto('guarda lo legítimo', colado.guardado);
  eq('y SOLO lo legítimo', colado.campos, ['giro']);
  const despuesDeColar = await A.leerPedido(db, d.id);
  eq('el giro entró', despuesDeColar.giro, 'Servicios médicos');
  eq('el monto no se movió', despuesDeColar.monto_total, antesDeColar.monto_total);
  eq('ni el estado', despuesDeColar.estado, antesDeColar.estado);
  eq('ni el correo', despuesDeColar.correo, antesDeColar.correo);
  eq('ni el informe', despuesDeColar.informe_json, antesDeColar.informe_json);
  eq('ni el id', despuesDeColar.id, d.id);
}

/* ================================================================== */
console.log('=== 7. el webhook encuentra el pedido por el id del pago ===');
{
  const db = baseNueva();
  const d = DATOS();
  await A.crearPedido(db, d);
  await A.marcarEstado(db, d.id, P.ESTADOS.CREADO, P.ESTADOS.PAGADO, { mp_payment_id: '123456789' });

  const hallado = await A.buscarPorPago(db, '123456789');
  eq('lo encuentra', hallado.id, d.id);
  eq('también si llega como número', (await A.buscarPorPago(db, 123456789)).id, d.id);
  eq('uno que no existe da null', await A.buscarPorPago(db, '000'), null);
  eq('sin id da null', await A.buscarPorPago(db, null), null);
}

/* ================================================================== */
console.log('=== 8. la vista pública no filtra lo que no hace falta ===');
{
  const db = baseNueva();
  const d = DATOS();
  await A.crearPedido(db, d);
  await A.marcarEstado(db, d.id, P.ESTADOS.CREADO, P.ESTADOS.PAGADO);
  await A.guardarIntake(db, d.id, { razon_social: 'Ejemplo SpA', rut: '11.111.111-1' });

  const v = A.vistaPublica(await A.leerPedido(db, d.id));
  cierto('muestra el estado', Boolean(v.estado));
  cierto('y qué se contrató', v.senales_contratadas.length > 0);

  // Lo que NO viaja: el informe entero y los datos de facturación. Lo que no se manda no se
  // puede filtrar.
  falso('no manda el informe', 'informe_json' in v);
  falso('no manda el RUT', 'rut' in v);
  falso('no manda la razón social', 'razon_social' in v);
  falso('no manda el correo', 'correo' in v);

  // Y sí dice lo único que el cliente necesita saber para actuar.
  cierto('avisa que falta el acceso', v.falta_acceso);
  await A.guardarIntake(db, d.id, { acceso_recibido_en: '2026-10-23T13:00:00Z' });
  falso('y deja de avisarlo cuando llega', A.vistaPublica(await A.leerPedido(db, d.id)).falta_acceso);

  eq('sin pedido devuelve null', A.vistaPublica(null), null);
}

/* ================================================================== */
console.log('=== 9. el recorrido entero, como pasaría de verdad ===');
{
  const db = baseNueva();
  const d = DATOS();
  await A.crearPedido(db, d);

  // Llega la notificación. Primera vez.
  const e1 = await A.registrarEvento(db, 'ev_abc', { tipo: 'payment', pedidoId: d.id });
  cierto('el evento es nuevo', e1.primeraVez);
  cierto('se marca pagado', (await A.marcarEstado(db, d.id, P.ESTADOS.CREADO, P.ESTADOS.PAGADO,
    { mp_payment_id: '555', pagado_en: new Date().toISOString() })).movido);
  await A.anotarResultado(db, 'ev_abc', 'marcado pagado');

  // Quince minutos después llega la misma. Las dos defensas actúan.
  const e2 = await A.registrarEvento(db, 'ev_abc', { tipo: 'payment', pedidoId: d.id });
  falso('el evento repetido no pasa', e2.primeraVez);
  falso('y aunque pasara, el estado no se pisa',
    (await A.marcarEstado(db, d.id, P.ESTADOS.CREADO, P.ESTADOS.PAGADO, { mp_payment_id: 'MALO' })).movido);
  eq('el id del pago sigue siendo el bueno', (await A.leerPedido(db, d.id)).mp_payment_id, '555');

  // El cliente manda sus datos y después el acceso.
  cierto('guarda la facturación', (await A.guardarIntake(db, d.id,
    { razon_social: 'X SpA', rut: '1-9', giro: 'G', direccion: 'D', plataforma: 'WordPress' })).guardado);
  cierto('y el acceso', (await A.guardarIntake(db, d.id,
    { acceso_recibido_en: new Date().toISOString() })).guardado);

  // Se entrega.
  cierto('se entrega', (await A.marcarEstado(db, d.id, P.ESTADOS.PAGADO, P.ESTADOS.ENTREGADO,
    { entregado_en: new Date().toISOString(), informe_final_json: '{"puntaje":100}' })).movido);
  const fin = await A.leerPedido(db, d.id);
  eq('estado final', fin.estado, P.ESTADOS.ENTREGADO);
  cierto('con su informe final', Boolean(fin.informe_final_json));
  eq('y lo que se vendió sigue congelado', fin.senales_contratadas, ['carga', 'cookies']);
}

console.log(`\n${ok} bien, ${malo} mal`);
process.exit(malo ? 1 : 0);
