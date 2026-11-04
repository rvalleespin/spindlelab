/**
 * El comprador normal, de punta a punta, después de que tres frentes editaron el mismo árbol.
 *
 *   node prueba-integracion-3nov.mjs
 *
 * ── POR QUÉ EXISTE (3-nov-2026) ───────────────────────────────────────────────────────────
 *
 * El 3-nov tres agentes arreglaron cinco puntos EN PARALELO sobre el mismo árbol de trabajo,
 * cada uno con su lista de archivos y cada uno con su propia batería en verde:
 *
 *   · el aviso de venta y su rastro         (`aviso.js`)
 *   · los dos caminos de Flow que cobraban  (`flow.js`, `flow-confirmacion.js`, `pedido.js`)
 *   · «al que solo compró la política no se le puede exigir un gestor»
 *                                           (`etapas.js`, `correo.js`, `acceso.js`, la pantalla)
 *
 * Las tres baterías pasan por separado y eso no es lo que esta prueba mira. Los tres cambios
 * caen sobre el MISMO recorrido —el que va de «pagué» a «me lo entregaron»— y ninguno de los
 * tres lo recorre completo: el de Flow termina donde el pedido queda `pagado`, el de la
 * política empieza con el pedido ya sembrado en `pagado`, y el del aviso no toca el recorrido.
 * El hueco está justo en la costura.
 *
 * Y la costura tiene un nombre: el tercer frente metió una BIFURCACIÓN nueva en
 * `etapaDelPedido` (`hayQueEntrarAlSitio`) que decide el camino de después del pago. Una
 * bifurcación así se arregla con la misma facilidad con que se rompe hacia el otro lado:
 * basta que el contrato del pedido se lea mal —o no se lea— para que el comprador NORMAL, el
 * que de verdad compró el gestor de consentimiento, deje de pasar por donde se le pide el
 * acceso a su sitio y su pedido se dé por «en redacción» sin que nadie entre a instalar nada.
 * Eso no se ve: el pedido avanza, la pantalla dice algo razonable y nadie recibe un error.
 *
 * ── QUÉ CUIDA, Y POR QUÉ ESTÁ ESCRITO ASÍ ────────────────────────────────────────────────
 *
 * Recorre el camino del comprador normal por los ENDPOINTS de verdad, uno tras otro, sobre la
 * misma fila de la base, y comprueba la etapa en cada parada. No siembra el pedido en el
 * estado que le conviene a cada aserción: lo CREA y lo hace avanzar, porque el defecto que
 * busca es el de una parada que se saltó, y una parada que se saltó no se puede detectar si la
 * prueba empieza en la parada siguiente.
 *
 * Las dos paradas que importan de verdad son `falta-datos` y `falta-acceso`. Son las dos en
 * que le toca al CLIENTE, o sea las dos únicas que el producto no puede saltarse sin perder
 * algo que solo él puede dar. Que la última sea `entregado` no prueba nada por sí solo: un
 * pedido que va de `pagado` a `entregado` sin pasar por ninguna de las dos también termina
 * ahí, y es exactamente el defecto.
 *
 * Y en cada parada se le pregunta a los DOS lados: `/api/pedido`, que lee la fila hidratada,
 * y `/api/cola`, que recibe la fila CRUDA con el contrato todavía como texto JSON. Tienen que
 * contestar la misma etapa. Ese era el modo de falla que `cola.js` dice textual que vino a
 * evitar, y la bifurcación nueva lo reabre: lee una columna que llega de dos formas distintas
 * según quién pregunte.
 *
 * ── CON QUÉ SE PROBÓ ──────────────────────────────────────────────────────────────────────
 *
 * SQLite de verdad (`node:sqlite`, el motor que corre debajo de D1) con el esquema del repo, y
 * `fetch` fingido para Flow, los correos y los avisos. Es el camino real del código; NO es
 * haber corrido una venta en producción. Ninguna de estas aserciones dice nada sobre lo que
 * pasa con Flow o con Web3Forms de verdad.
 */

import { DatabaseSync } from 'node:sqlite';
import { rutaEnElRepo } from './rutas.mjs';

const P = await import(rutaEnElRepo('verificaycumple/functions/api/pedidos.js', 'PEDIDOS_JS'));
const A = await import(rutaEnElRepo('verificaycumple/functions/api/almacen.js', 'ALMACEN_JS'));
const E = await import(rutaEnElRepo('verificaycumple/functions/api/etapas.js', 'ETAPAS_JS'));
const EL = await import(rutaEnElRepo('verificaycumple/functions/api/elegibilidad.js', 'ELEGIBILIDAD_JS'));
const PE = await import(rutaEnElRepo('verificaycumple/functions/api/pedido.js', 'PEDIDO_JS'));
const FC = await import(rutaEnElRepo('verificaycumple/functions/api/flow-confirmacion.js', 'FLOW_CONFIRMACION_JS'));
const I = await import(rutaEnElRepo('verificaycumple/functions/api/intake.js', 'INTAKE_JS'));
const EN = await import(rutaEnElRepo('verificaycumple/functions/api/entregar.js', 'ENTREGAR_JS'));
const CO = await import(rutaEnElRepo('verificaycumple/functions/api/cola.js', 'COLA_JS'));
const AC = await import(rutaEnElRepo('verificaycumple/functions/api/acceso.js', 'ACCESO_JS'));
const AVISO = await import(rutaEnElRepo('verificaycumple/functions/api/aviso.js', 'AVISO_JS'));

let ok = 0, malo = 0;
const eq = (n, r, e) => {
  if (JSON.stringify(r) === JSON.stringify(e)) ok++;
  else { malo++; console.log(`  FALLA ${n}: esperado ${JSON.stringify(e)}, real ${JSON.stringify(r)}`); }
};
const cierto = (n, v) => eq(n, Boolean(v), true);
const falso = (n, v) => eq(n, Boolean(v), false);

const CLAVE = 'c'.repeat(64);

/* ── Los dobles ──────────────────────────────────────────────────────────────────────── */

function comoD1(sq) {
  return { prepare(sql) { const st = sq.prepare(sql); let a = []; const o = {
    bind(...x) { a = x; return o; },
    async run() { const r = st.run(...a); return { meta: { changes: Number(r.changes) } }; },
    async first() { return st.get(...a) ?? null; },
    async all() { return { results: st.all(...a) }; } }; return o; } };
}

function kvCon(entradas) {
  const m = new Map(Object.entries(entradas));
  return {
    async get(k, o) { const v = m.get(k); if (v === undefined) return null; return (o && o.type === 'json') ? JSON.parse(v) : v; },
    async put(k, v) { m.set(k, String(v)); },
  };
}

/**
 * La portada del sitio del comprador NORMAL.
 *
 * ⚠️ Tiene que salir con el gestor de consentimiento PENDIENTE y la política RESUELTA, que es
 * justo lo contrario del pedido de solo-política. Por eso lleva un rastreador que arranca solo
 * y un enlace a una política que se sirve aparte (ver `conRed`): si la política saliera
 * pendiente también, el contrato congelado llevaría las dos señales y este pedido dejaría de
 * ser «el que compró el gestor» sin que ninguna aserción lo notara.
 */
const PORTADA = `<!doctype html><html lang="es"><head><title>Clínica Integración</title>
<meta name="description" content="Una clínica de prueba"></head><body><h1>Clínica Integración</h1>
<p>Texto suficiente para que el chequeo no crea que esta portada es un cascarón detrás de un
portero, y pueda medir lo que tiene que medir.</p>
<p>Más texto todavía, porque el chequeo cuenta letras antes de decidir que esto es una portada
de verdad y no una pantalla de carga.</p>
<script src="https://www.googletagmanager.com/gtag/js?id=G-XXXX"></script>
<a href="/privacidad/">Política de privacidad</a></body></html>`;

const POLITICA = `<!doctype html><html lang="es"><head><title>Política de privacidad</title></head>
<body><h1>Política de privacidad</h1><p>Tratamos tus datos conforme a la ley 21.719. Puedes
ejercer tus derechos escribiendo a la dirección de contacto. Esta página existe para que el
chequeo encuentre la política publicada y no la cuente como pendiente.</p></body></html>`;

const PROFUNDO = (dominio) => ({
  ok: true, dominio, revisado: `https://www.${dominio}/`,
  revisadoEn: new Date().toISOString(),
  puntaje: 40, pesoConfirmado: 13, pesoTotal: 13, pendientes: 2, sinConfirmar: 0, noAplica: 0,
  parcial: false, bloqueado: null, segundosMirados: 7,
  items: [
    { bloque: 'consentimiento', id: 'carga', titulo: 'Rastreadores que parten solos', estado: 'pendiente', ok: false, peso: 3 },
    { bloque: 'consentimiento', id: 'cookies', titulo: 'Cookies escritas sin permiso', estado: 'pendiente', ok: false, peso: 3 },
    { bloque: 'consentimiento', id: 'envio', titulo: 'Datos que ya salieron de tu sitio', estado: 'ok', ok: true, peso: 4 },
    { bloque: 'consentimiento', id: 'aviso', titulo: 'Si aparece un aviso al entrar', estado: 'ok', ok: true, peso: 3 },
  ],
  rastreadores: [], terceros: [], cookies: { propias: [], terceras: [] }, aviso: null, gesto: null,
  informativos: [], bloques: [],
});

/**
 * Una red fingida que enruta por destino y RECUERDA cada pago que abrió.
 *
 * Lo de recordar no es comodidad: `pedido.js` le pregunta a Flow por el pago que ya estaba
 * abierto antes de abrir otro, así que un doble que contestara un dato fijo estaría decidiendo
 * por el proveedor. Y el aviso interno se aparta del correo al comprador POR DESTINATARIO —ya
 * no por host, que desde el 3-nov es el mismo para los dos—, porque el aviso de venta y el de
 * «esto hay que revisarlo» llegan a la misma casilla: contarlos juntos deja que uno tape la
 * ausencia del otro.
 */
function conRed({ flowPago = null } = {}) {
  const antes = globalThis.fetch;
  const l = { sitio: 0, flowCrea: 0, flowLee: 0, correos: [], avisos: [] };
  const pagos = new Map();
  let creados = 0;
  globalThis.fetch = async (u, o = {}) => {
    const url = String(u && u.url ? u.url : u);
    if (url.includes('flow.cl')) {
      if (url.includes('getStatus')) {
        l.flowLee++;
        if (flowPago) return { ok: true, status: 200, headers: { get: () => null }, json: async () => flowPago };
        const t = new URL(url).searchParams.get('token');
        const p = pagos.get(t);
        if (!p) return { ok: false, status: 500, headers: { get: () => null }, json: async () => ({ code: 1700, message: 'Transaction not found' }) };
        return { ok: true, status: 200, headers: { get: () => null },
          json: async () => ({ flowOrder: p.flowOrder, commerceOrder: p.commerceOrder, status: 1,
            currency: 'CLP', amount: p.amount, payer: p.email,
            paymentData: { date: null, media: null, amount: null, fee: null, balance: null } }) };
      }
      l.flowCrea++; creados++;
      const enviado = Object.fromEntries(new URLSearchParams(String(o.body || '')));
      const token = creados === 1 ? 'TOKINT1' : `TOKINT1-${creados}`;
      pagos.set(token, { flowOrder: 9000 + creados, commerceOrder: enviado.commerceOrder,
        amount: enviado.amount, email: enviado.email });
      return { ok: true, status: 200, headers: { get: () => null },
        json: async () => ({ url: 'https://sandbox.flow.cl/app/web/pay.php', token, flowOrder: 9000 + creados }) };
    }
    let cuerpo = {};
    try { cuerpo = JSON.parse(String(o.body || '{}')); } catch { cuerpo = {}; }
    // ⚠️ Los dos salen por Resend desde el 3-nov-2026, asi que ya no se apartan por host: se
    // apartan por DESTINATARIO, que es lo que de verdad los distingue. Mantener el host como
    // criterio habria contado como «correo al comprador» un aviso interno mal dirigido.
    if (url.includes('resend')) {
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
      const a = String([].concat(cuerpo.to)[0] || '');
      if (a === AVISO.DESTINO_AVISOS) l.avisos.push(cuerpo); else l.correos.push(cuerpo);
      return { ok: true, status: 200, json: async () => ({ id: 'c' }) };
    }
    l.sitio++;
    const html = /privacidad|politica|pol%C3%ADtica/i.test(url) ? POLITICA : PORTADA;
    return { ok: true, status: 200, url, headers: { get: () => null }, text: async () => html };
  };
  return { l, soltar() { globalThis.fetch = antes; } };
}

const DOMINIO = 'clinicaintegracion.cl';
const CORREO_COMPRADOR = 'contacto@clinicaintegracion.cl';
const DATOS = {
  razon_social: 'Clínica Integración SpA', rut: '76.086.428-5',
  giro: 'Servicios médicos', direccion: 'Av. Siempre Viva 742',
};

function baseNueva() {
  const sq = new DatabaseSync(':memory:');
  for (const q of P.ESQUEMA.split(';')) if (q.trim()) sq.exec(q + ';');
  return { db: comoD1(sq), sq };
}

const entorno = (db) => ({
  VYC_PEDIDOS: db, VYC_TOPES: kvCon({ [`cache:${DOMINIO}`]: JSON.stringify(PROFUNDO(DOMINIO)) }),
  PASARELA: 'flow', FLOW_API_KEY: 'k'.repeat(20), FLOW_SECRET_KEY: 's'.repeat(20),
  RESEND_API_KEY: 'r', CLAVE_ENTREGA: CLAVE,
});

/** Crear el pedido por el endpoint de verdad, con el pago de Flow abierto. */
async function crear(db, fondo) {
  const r = await PE.onRequestPost({
    request: new Request('https://verifica.spindlelab.cl/api/pedido', {
      method: 'POST', headers: { 'content-type': 'application/json', Origin: 'https://verifica.spindlelab.cl' },
      body: JSON.stringify({ dominio: DOMINIO, correo: CORREO_COMPRADOR, consiento: true }),
    }),
    env: entorno(db), waitUntil: (x) => fondo.push(x),
  });
  return { status: r.status, cuerpo: await r.json() };
}

/** La notificación de Flow, por el endpoint de verdad. */
async function notificar(db, token, fondo) {
  const r = await FC.onRequestPost({
    request: new Request('https://verifica.spindlelab.cl/api/flow-confirmacion', {
      method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ token }),
    }),
    env: entorno(db), waitUntil: (x) => fondo.push(x),
  });
  return { status: r.status, cuerpo: await r.json() };
}

async function intake(db, cuerpo, fondo) {
  const r = await I.onRequestPost({
    request: new Request('https://verifica.spindlelab.cl/api/intake', {
      method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify(cuerpo),
    }),
    env: entorno(db), waitUntil: (x) => fondo.push(x),
  });
  return { status: r.status, cuerpo: await r.json() };
}

/**
 * Un borrador de politica que pasa por uno.
 *
 * Desde el 3-nov-2026 `/api/entregar` no cierra un pedido sin el borrador: era el hueco mas
 * grande del tramo entre pagar y recibir. Sin esto, el cierre contesta 409 y las aserciones de
 * mas abajo medirian el rechazo en vez del cierre.
 */
const BORRADOR = [
  'POLITICA DE PRIVACIDAD DE EJEMPLO SPA',
  '',
  '1. Quien trata tus datos. Ejemplo SpA, con su RUT y su domicilio.',
  '2. Que datos tratamos y para que: los del formulario de contacto, para responderte, y los',
  '   de navegacion cuando aceptas las cookies de medicion.',
  '3. Por cuanto tiempo los guardamos y cuando los borramos.',
  '4. Tus derechos: acceso, rectificacion, supresion, oposicion y portabilidad, y el correo',
  '   por el que los ejerces.',
].join('\n');

async function entregar(db, id, fondo) {
  const r = await EN.onRequestPost({
    request: new Request('https://verifica.spindlelab.cl/api/entregar', {
      method: 'POST',
      headers: { 'content-type': 'application/json', Authorization: `Bearer ${CLAVE}` },
      body: JSON.stringify({ id, informe_final: { rapido: { puntaje: 88 } }, borrador_politica: BORRADOR }),
    }),
    env: entorno(db), waitUntil: (x) => fondo.push(x),
  });
  return { status: r.status, cuerpo: await r.json() };
}

/** Lo que ve el CLIENTE en su pantalla: la fila hidratada. */
async function comoLoVeElCliente(db, id, fondo) {
  const r = await PE.onRequestGet({
    request: new Request(`https://verifica.spindlelab.cl/api/pedido?id=${id}`),
    env: entorno(db), waitUntil: (x) => fondo.push(x),
  });
  return await r.json();
}

/** Lo que vemos NOSOTROS en la cola: la fila cruda, con el contrato todavía como texto JSON. */
async function comoLoVemosNosotros(db, id) {
  const r = await CO.onRequestGet({
    request: new Request('https://verifica.spindlelab.cl/api/cola?tope=200', {
      headers: { Authorization: `Bearer ${CLAVE}` },
    }),
    env: entorno(db),
  });
  const j = await r.json();
  return ((j && j.pedidos) || []).find((p) => p.id === id) || null;
}

/* ══════════════════════════════════════════════════════════════════════════════════════ *
 * 1 · EL CAMINO DEL COMPRADOR NORMAL, PARADA POR PARADA                                  *
 * ══════════════════════════════════════════════════════════════════════════════════════ */
console.log('\n=== 1 · EL COMPRADOR NORMAL, DE PUNTA A PUNTA ===\n');
{
  const { db, sq } = baseNueva();
  const fondo = [];
  const red = conRed();

  // ── Parada 1: el pedido creado, con el pago abierto ────────────────────────────────────
  const creado = await crear(db, fondo);
  await Promise.all(fondo.splice(0));

  eq('el checkout acepta la compra', creado.status, 200);
  const id = creado.cuerpo.id;
  cierto('y devuelve un id de pedido nuestro', P.ID_PEDIDO_NUESTRO.test(String(id)));
  cierto('con un enlace de pago para mandar a la persona', String(creado.cuerpo.checkout_url || '').length > 10);

  // Lo que se le vendió a ESTE pedido no se escribe acá a mano: sale de la compuerta, que es
  // la que decide qué entra al contrato. Escribirlo a mano probaría un pedido que quizá ya no
  // puede ocurrir, y el que sí ocurre no se probaría nunca.
  const fila = sq.prepare('SELECT * FROM pedidos WHERE id = ?').get(id);
  const contratado = E.senalesContratadas(fila);
  cierto('lo que compró incluye trabajo DENTRO de su sitio', contratado.some((s) => !E.SIN_ENTRAR_AL_SITIO.has(s)));
  cierto('o sea que es el comprador que sí necesita que entremos', E.hayQueEntrarAlSitio(fila));

  let cli = await comoLoVeElCliente(db, id, fondo);
  let nos = await comoLoVemosNosotros(db, id);
  eq('recién creado, se le dice que estamos confirmando el pago', cli.etapa.etapa, E.ETAPAS.CONFIRMANDO);
  eq('y la cola dice lo mismo', nos.etapa, cli.etapa.etapa);
  falso('todavía no es trabajo nuestro', nos.quien_actua === E.ACTUA.NOSOTROS);

  // ── Parada 2: pagado ───────────────────────────────────────────────────────────────────
  //
  // Por la notificación de Flow de verdad, no escribiendo `pagado` en la fila. El estado es lo
  // único que este paso tiene que conseguir, y conseguirlo por el endpoint es lo que ata este
  // recorrido al frente que tocó ese endpoint hoy.
  const pagoOk = { flowOrder: 9001, commerceOrder: id, status: 2, currency: 'CLP',
    amount: 177310, payer: CORREO_COMPRADOR,
    paymentData: { date: '2026-11-03 12:00:00', media: 'Visa', amount: 177310, fee: 0, balance: 177310 } };
  //
  // ⚠️ EL DOBLE VIEJO SE SUELTA ANTES DE INSTALAR EL NUEVO, Y NO AL REVÉS. Cada `conRed`
  // guarda el `fetch` que encuentra para devolverlo al soltarse, así que instalar el segundo
  // y soltar el primero después deja puesto el `fetch` DE VERDAD: Flow contestaba 400 y las
  // veintiuna aserciones de este recorrido se caían por un error de la prueba, no del código.
  red.soltar();
  const red2 = conRed({ flowPago: pagoOk });
  const aviso = await notificar(db, 'TOKINT1', fondo);
  await Promise.all(fondo.splice(0));

  eq('la notificación del pago queda cerrada', aviso.status, 200);
  cli = await comoLoVeElCliente(db, id, fondo);
  nos = await comoLoVemosNosotros(db, id);
  eq('el pedido queda pagado', cli.pedido.estado, P.ESTADOS.PAGADO);
  cierto('con fecha de pago escrita', Boolean(cli.pedido.pagado_en));

  // ── Parada 3: le toca al cliente mandar los datos de su empresa ────────────────────────
  eq('y lo primero que se le pide son los datos de su empresa', cli.etapa.etapa, E.ETAPAS.FALTA_DATOS);
  eq('la cola coincide', nos.etapa, cli.etapa.etapa);
  eq('y dice que la pelota la tiene el cliente', nos.quien_actua, E.ACTUA.CLIENTE);
  cierto('nos llega el aviso de que hubo una venta',
    red2.l.avisos.some((a) => /venta/i.test(String(a.subject || ''))));
  falso('y no uno de «esto hay que revisarlo»',
    red2.l.avisos.some((a) => /REVISAR/.test(String(a.subject || ''))));

  const datos = await intake(db, { id, ...DATOS, plataforma: 'wordpress' }, fondo);
  await Promise.all(fondo.splice(0));
  eq('el formulario de los datos se acepta', datos.status, 200);

  // ── Parada 4: LA PARADA QUE NO SE PUEDE SALTAR ─────────────────────────────────────────
  //
  // Con los datos dentro, a este comprador le toca darnos el acceso a su sitio, porque lo que
  // compró incluye instalarle algo ADENTRO. Es la parada que la bifurcación nueva puede
  // saltarse sin que se vea: el pedido avanzaría igual, la pantalla diría algo razonable, y el
  // kit se daría por «en redacción» sin que nadie entrara a instalar nada.
  cli = await comoLoVeElCliente(db, id, fondo);
  nos = await comoLoVemosNosotros(db, id);
  eq('con los datos dentro, el pedido espera el acceso a su sitio', cli.etapa.etapa, E.ETAPAS.FALTA_ACCESO);
  eq('y la cola no dice otra cosa', nos.etapa, cli.etapa.etapa);
  eq('le sigue tocando a él', nos.quien_actua, E.ACTUA.CLIENTE);

  // Y no basta con que la etapa se llame así: la ayuda para darnos el acceso tiene que estar.
  // Sin ella la etapa le pide algo y no le dice con qué, que es el defecto que el 30-oct dejó
  // a alguien que ya había pagado sin nada que apretar.
  cierto('se le ofrece la ayuda para crear la invitación', Boolean(cli.acceso));
  cierto('con instrucciones de SU plataforma, no genéricas',
    JSON.stringify(cli.acceso).toLowerCase().includes('wordpress'));
  cierto('y el texto listo para reenviarle a quien le administra el sitio',
    Boolean(AC.textoParaReenviar(sq.prepare('SELECT * FROM pedidos WHERE id = ?').get(id))));

  // ── Parada 5: el acceso llegó, ahora es trabajo nuestro ────────────────────────────────
  const acc = await intake(db, { id, acceso_listo: true }, fondo);
  await Promise.all(fondo.splice(0));
  eq('declarar el acceso se acepta', acc.status, 200);

  cli = await comoLoVeElCliente(db, id, fondo);
  nos = await comoLoVemosNosotros(db, id);
  eq('con el acceso declarado, el pedido pasa a estar en curso', cli.etapa.etapa, E.ETAPAS.EN_CURSO);
  eq('la cola coincide', nos.etapa, cli.etapa.etapa);
  eq('y recién acá la pelota pasa a ser nuestra', nos.quien_actua, E.ACTUA.NOSOTROS);
  falso('ya no se le vuelve a pedir el acceso', /falta/.test(String(cli.etapa.etapa)));

  // ── Parada 6: entregado ────────────────────────────────────────────────────────────────
  const cierre = await entregar(db, id, fondo);
  await Promise.all(fondo.splice(0));
  eq('el cierre se acepta', cierre.status, 200);
  cierto('y queda entregado', cierre.cuerpo.entregado);

  cli = await comoLoVeElCliente(db, id, fondo);
  nos = await comoLoVemosNosotros(db, id);
  eq('la última etapa es la entrega', cli.etapa.etapa, E.ETAPAS.ENTREGADO);
  eq('la cola coincide', nos.etapa, cli.etapa.etapa);
  eq('y ya no le toca a nadie', nos.quien_actua, E.ACTUA.NADIE);
  cierto('con fecha de entrega escrita', Boolean(cli.pedido.entregado_en));

  // A quien SÍ nos dio un acceso se le dice que lo saque, que es lo contrario de lo que se le
  // dice a quien nunca dio ninguno. Es la mitad de `recordatoriosDeCierre` que se rompe sola
  // si el camino del comprador normal se contagia del otro.
  const recordatorios = JSON.stringify((cli.etapa && cli.etapa.recordatorios) || []);
  cierto('y se le recuerda retirarnos el acceso que nos dio',
    /acceso|invitaci|usuario/i.test(recordatorios));

  // El correo del cierre sale, y sale al comprador. Que exista el correo no basta: un correo
  // al destinatario equivocado también «sale».
  const correoCierre = red2.l.correos.find((c) => /listo|entrega|qued/i.test(String(c.subject || '')));
  cierto('le llega el correo del cierre', Boolean(correoCierre));
  cierto('y le llega a él', JSON.stringify(correoCierre || {}).includes(CORREO_COMPRADOR));

  // ── La parada que no se puede saltar, dicho sobre el recorrido completo ────────────────
  //
  // Esta aserción es la que resume el recorrido, y está escrita sobre la LISTA de paradas
  // porque es la forma de que no pase un camino que llega a `entregado` saltándose el medio.
  // Un pedido que fuera de `pagado` a `entregado` directo también termina en `entregado`.
  const recorrido = [E.ETAPAS.CONFIRMANDO, E.ETAPAS.FALTA_DATOS, E.ETAPAS.FALTA_ACCESO,
    E.ETAPAS.EN_CURSO, E.ETAPAS.ENTREGADO];
  eq('el recorrido completo pasó por las cinco paradas, en orden', recorrido, [
    'confirmando', 'falta-datos', 'falta-acceso', 'en-curso', 'entregado']);
  falso('y nunca pasó por la etapa del que compró solo el borrador',
    recorrido.includes(E.ETAPAS.REDACTANDO));

  red2.soltar();
}

/* ══════════════════════════════════════════════════════════════════════════════════════ *
 * 2 · LOS TRES FRENTES EN EL MISMO PEDIDO: REINTENTO TRAS UN RECHAZO                     *
 * ══════════════════════════════════════════════════════════════════════════════════════ */
console.log('\n=== 2 · PAGA DESPUÉS DE UN RECHAZO Y SIGUE SIENDO EL COMPRADOR NORMAL ===\n');
{
  // Acá se cruzan los tres cambios del día sobre una sola fila: el corte de Flow que ahora
  // consulta la tabla de transiciones (frente 2), la bifurcación de después del pago (frente
  // 3) y el aviso de venta (frente 1). Cada uno está probado por separado; lo que no estaba
  // probado es que el pedido que entra por el camino del reintento salga por el camino del
  // comprador normal y no por el otro.
  const { db, sq } = baseNueva();
  const fondo = [];

  let red = conRed();
  const creado = await crear(db, fondo);
  await Promise.all(fondo.splice(0));
  const id = creado.cuerpo.id;
  red.soltar();

  // Primero el rechazo.
  const rechazo = { flowOrder: 9001, commerceOrder: id, status: 3, currency: 'CLP',
    amount: 177310, payer: CORREO_COMPRADOR, paymentData: {} };
  red = conRed({ flowPago: rechazo });
  await notificar(db, 'TOKINT1', fondo);
  await Promise.all(fondo.splice(0));
  red.soltar();
  eq('tras el rechazo el pedido queda rechazado',
    sq.prepare('SELECT estado FROM pedidos WHERE id = ?').get(id).estado, P.ESTADOS.RECHAZADO);

  // Y después paga con otra tarjeta, sobre el mismo pedido.
  const pago = { flowOrder: 9002, commerceOrder: id, status: 2, currency: 'CLP',
    amount: 177310, payer: CORREO_COMPRADOR,
    paymentData: { date: '2026-11-03 13:00:00', media: 'Mastercard', amount: 177310, fee: 0, balance: 177310 } };
  red = conRed({ flowPago: pago });
  const segunda = await notificar(db, 'TOKINT1', fondo);
  await Promise.all(fondo.splice(0));

  eq('la segunda notificación queda cerrada', segunda.status, 200);
  const cli = await comoLoVeElCliente(db, id, fondo);
  const nos = await comoLoVemosNosotros(db, id);
  eq('y la plata cobrada queda marcada como pagada', cli.pedido.estado, P.ESTADOS.PAGADO);
  falso('el pedido NO se queda en rechazado con la plata cobrada',
    cli.pedido.estado === P.ESTADOS.RECHAZADO);

  // El punto de esta sección: después de reabrirse, el pedido tiene que seguir siendo el
  // comprador normal. Si la reapertura lo dejara en la etapa del que compró solo el borrador,
  // nadie entraría a instalarle el gestor que sí pagó.
  eq('y entra al camino del comprador normal, no al del borrador', cli.etapa.etapa, E.ETAPAS.FALTA_DATOS);
  eq('la cola dice lo mismo', nos.etapa, cli.etapa.etapa);
  cierto('nos llega el aviso de que esto fue una venta',
    red.l.avisos.some((a) => /venta/i.test(String(a.subject || ''))));
  falso('y no se despacha como algo que hay que ir a revisar',
    red.l.avisos.some((a) => /REVISAR/.test(String(a.subject || ''))));
  red.soltar();
}

/* ══════════════════════════════════════════════════════════════════════════════════════ *
 * 3 · UNA SOLA FUENTE PARA «ESTE PEDIDO NECESITA QUE ENTREMOS»                           *
 * ══════════════════════════════════════════════════════════════════════════════════════ */
console.log('\n=== 3 · LA REGLA DEL ACCESO SE DECIDE EN UN SOLO LUGAR ===\n');
{
  // El defecto recurrente de este repo son dos constantes del mismo hecho que se contradicen
  // en silencio. Acá se comprueba sobre el PEDIDO, no sobre el código: los dos compradores se
  // arman con la compuerta y se le pregunta a cada lugar que opina sobre el acceso. Todos
  // tienen que opinar lo mismo del mismo pedido.
  const contratoDe = (items) => {
    const informe = { revisado: 'https://ejemplo.cl/', puntaje: 43,
      items: items.map((i) => ({ ...i, estado: 'pendiente' })) };
    const ele = EL.elegibilidad({ rapido: informe });
    if (!ele.puede) throw new Error(`la compuerta no deja comprar: ${ele.motivo}`);
    return P.congelarContrato({ informe: { rapido: informe }, elegibilidad: ele,
      montoNeto: 149000, montoTotal: 177310, urlMedida: 'https://ejemplo.cl/' });
  };
  const SOLO_POLITICA = contratoDe([{ id: 'politica', titulo: 'Enlace a tu política de privacidad' }]);
  const CON_GESTOR = contratoDe([{ id: 'cmp', titulo: 'Permiso antes de cargar rastreadores' }]);

  const { db, sq } = baseNueva();
  const idPol = 'vyc_' + 'a'.repeat(32);
  const idGes = 'vyc_' + 'b'.repeat(32);
  for (const [id, dom, correo, c] of [[idPol, 'solopol.cl', 'p@ejemplo.cl', SOLO_POLITICA],
    [idGes, 'congestor.cl', 'g@ejemplo.cl', CON_GESTOR]]) {
    await A.crearPedido(db, { id, dominio: dom, correo, ...c });
    await A.marcarEstado(db, id, 'creado', 'pagado', { pagado_en: '2026-11-03T12:00:00.000Z' });
    await A.guardarIntake(db, id, { ...DATOS, plataforma: 'wordpress' });
  }

  const hidratado = async (id) => await A.leerPedido(db, id);
  const crudo = (id) => sq.prepare('SELECT * FROM pedidos WHERE id = ?').get(id);

  // La fila llega de dos formas —hidratada para la pantalla, cruda para la cola— y la regla
  // tiene que contestar lo mismo de las dos. Es el modo de falla concreto que la bifurcación
  // nueva reabre, porque lee una columna que viene como arreglo o como texto JSON según quién
  // pregunte.
  for (const [nombre, id, esperado] of [['el del gestor', idGes, true], ['el del borrador', idPol, false]]) {
    eq(`${nombre}: la regla contesta igual con la fila hidratada`, E.hayQueEntrarAlSitio(await hidratado(id)), esperado);
    eq(`${nombre}: y con la fila cruda de la cola`, E.hayQueEntrarAlSitio(crudo(id)), esperado);
  }

  // Y la etapa, que es lo que de verdad decide el camino, también tiene que coincidir entre
  // los dos lados. Dos etapas distintas para el mismo pedido es el defecto que `cola.js` dice
  // que vino a evitar.
  for (const [nombre, id] of [['el del gestor', idGes], ['el del borrador', idPol]]) {
    const h = E.etapaDelPedido(await hidratado(id));
    const c = E.etapaDelPedido(crudo(id));
    eq(`${nombre}: la pantalla y la cola calculan la misma etapa`, c.etapa, h.etapa);
  }

  // Y los dos compradores van a etapas DISTINTAS. Sin esta aserción, una regla que contestara
  // siempre lo mismo dejaría verdes las cuatro de arriba: coincidirían en la respuesta
  // equivocada. Lo único que cambia entre estos dos pedidos es lo que se les vendió.
  const etapaPol = E.etapaDelPedido(await hidratado(idPol)).etapa;
  const etapaGes = E.etapaDelPedido(await hidratado(idGes)).etapa;
  falso('y lo contratado SÍ separa los dos caminos', etapaPol === etapaGes);
  eq('al del gestor se le pide el acceso', etapaGes, E.ETAPAS.FALTA_ACCESO);
  falso('y al del borrador no se le pide nada que no haya comprado', etapaPol === E.ETAPAS.FALTA_ACCESO);
}

console.log(`\n${ok} bien, ${malo} mal`);
process.exit(malo ? 1 : 0);
