/**
 * El comprador al que NO se le puede pedir un acceso a su sitio.
 *
 *   node prueba-solo-politica.mjs
 *
 * ── POR QUÉ EXISTE (3-nov-2026) ───────────────────────────────────────────────────────────
 *
 * El 2-nov `politica` entró a `CIERRA_EL_KIT`: el kit también se le vende a quien solo le
 * falta publicar su política de privacidad, que según la medición que movió la decisión es
 * cerca de la mitad de los sitios reales de las listas de prospección.
 *
 * La decisión quedó instalada donde se COBRA —la compuerta de elegibilidad, el texto de la
 * oferta, la lista de «lo que incluye tu kit»— y no quedó instalada en ninguna parte de lo que
 * pasa DESPUÉS del pago. Una auditoría lo encontró: todo pedido pagado se frenaba en «ahora
 * necesitamos entrar a tu sitio», con el detalle «para instalar el gestor de consentimiento».
 * O sea que a alguien que compró un borrador de texto se le exigía una cuenta de administrador
 * de su propio sitio, para un trabajo que no existe en su compra, justo en el momento en que
 * ya pagó y lo único que puede hacer es arrepentirse.
 *
 * ── LO QUE ESTE ARCHIVO CUIDA, Y LO QUE NO ───────────────────────────────────────────────
 *
 * Cuida los DOS compradores, siempre juntos, en la misma sección. El riesgo de un arreglo así
 * no es que el caso nuevo siga roto: es que el viejo se rompa sin que nadie mire. Si estas
 * aserciones solo hablaran del comprador de solo-política, bastaría con no pedirle NUNCA el
 * acceso a nadie para dejarlas todas verdes, y el kit de verdad —el que instala un gestor— se
 * quedaría sin poder entrar a ningún sitio.
 *
 * Y cuida lo que la persona LEE, no el nombre de la etapa. Una aserción sobre el nombre se
 * pondría roja el día que alguien lo cambie sin romper nada, y se quedaría verde el día que
 * alguien deje el nombre y meta la frase del acceso en el detalle. Lo que no puede pasar es
 * que al comprador del borrador se le pida entrar a su sitio, lo diga quien lo diga.
 *
 * ── CON QUÉ SE PROBÓ ──────────────────────────────────────────────────────────────────────
 *
 * SQLite de verdad (`node:sqlite`, el mismo motor que corre debajo de D1) con el esquema del
 * repo, y `fetch` fingido para los correos y los avisos. Es el camino real del código; NO es
 * haber corrido una venta en producción.
 */

import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import http from 'node:http';
import { spawn } from 'node:child_process';
import { rutaEnElRepo } from './rutas.mjs';

const P = await import(rutaEnElRepo('verificaycumple/functions/api/pedidos.js', 'PEDIDOS_JS'));
const A = await import(rutaEnElRepo('verificaycumple/functions/api/almacen.js', 'ALMACEN_JS'));
const E = await import(rutaEnElRepo('verificaycumple/functions/api/etapas.js', 'ETAPAS_JS'));
const C = await import(rutaEnElRepo('verificaycumple/functions/api/correo.js', 'CORREO_JS'));
const AC = await import(rutaEnElRepo('verificaycumple/functions/api/acceso.js', 'ACCESO_JS'));
const EL = await import(rutaEnElRepo('verificaycumple/functions/api/elegibilidad.js', 'ELEGIBILIDAD_JS'));
const I = await import(rutaEnElRepo('verificaycumple/functions/api/intake.js', 'INTAKE_JS'));
const EN = await import(rutaEnElRepo('verificaycumple/functions/api/entregar.js', 'ENTREGAR_JS'));
const CO = await import(rutaEnElRepo('verificaycumple/functions/api/cola.js', 'COLA_JS'));
const HTML = fs.readFileSync(
  rutaEnElRepo('verificaycumple/public/pedido/index.html', 'VYC_PEDIDO_HTML'), 'utf8');

let ok = 0, malo = 0;
const eq = (n, r, e) => {
  if (JSON.stringify(r) === JSON.stringify(e)) ok++;
  else { malo++; console.log(`  FALLA ${n}: esperado ${JSON.stringify(e)}, real ${JSON.stringify(r)}`); }
};
const cierto = (n, v) => eq(n, Boolean(v), true);
const falso = (n, v) => eq(n, Boolean(v), false);

function comoD1(sq) {
  return { prepare(sql) { const st = sq.prepare(sql); let a = []; const o = {
    bind(...x) { a = x; return o; },
    async run() { const r = st.run(...a); return { meta: { changes: Number(r.changes) } }; },
    async first() { return st.get(...a) ?? null; },
    async all() { return { results: st.all(...a) }; } }; return o; } };
}

function conRed() {
  const antes = globalThis.fetch;
  const salidas = [];
  globalThis.fetch = async (u, o) => {
    let cuerpo = {};
    try { cuerpo = JSON.parse(String((o && o.body) || '{}')); } catch { cuerpo = {}; }
    salidas.push({ host: new URL(String(u)).host, cuerpo });
    return { ok: true, status: 200, json: async () => ({ success: true, id: 'x' }) };
  };
  return { salidas, soltar() { globalThis.fetch = antes; } };
}

const CLAVE = 'c'.repeat(64);
const ID_POLITICA = 'vyc_' + 'a'.repeat(32);
const ID_GESTOR = 'vyc_' + 'b'.repeat(32);

/**
 * Lo que en este producto se llama «un comprador de solo-política» y «el comprador normal».
 *
 * ⚠️ LAS SEÑALES NO SE ESCRIBEN A MANO ACÁ, SE PIDEN A LA COMPUERTA.
 *
 * Es la diferencia entre probar el camino de la venta y probar un molde inventado. Si acá
 * pusiera `['politica']` a mano y mañana la compuerta congelara otra cosa para ese mismo
 * sitio —por ejemplo, metiendo `casilla` en el contrato—, la prueba seguiría verde sobre un
 * pedido que ya no puede ocurrir, y el pedido que SÍ ocurre nunca se probaría.
 *
 * Así que el contrato sale de `elegibilidad()` + `congelarContrato()`, igual que en la compra.
 */
function contratoDe(itemsPendientes) {
  const informe = {
    revisado: 'https://ejemplo.cl/',
    puntaje: 43,
    items: itemsPendientes.map((i) => ({ ...i, estado: 'pendiente' })),
  };
  const ele = EL.elegibilidad({ rapido: informe });
  if (!ele.puede) throw new Error(`la compuerta no deja comprar: ${ele.motivo}`);
  return P.congelarContrato({
    informe: { rapido: informe },
    elegibilidad: ele,
    montoNeto: 149000,
    montoTotal: 177310,
    urlMedida: 'https://ejemplo.cl/',
  });
}

const SOLO_POLITICA = contratoDe([{ id: 'politica', titulo: 'Enlace a tu política de privacidad' }]);
const CON_GESTOR = contratoDe([{ id: 'cmp', titulo: 'Permiso antes de cargar rastreadores' }]);

/** La base con los dos pedidos pagados, para poder compararlos lado a lado. */
async function baseConLosDos() {
  const sq = new DatabaseSync(':memory:');
  for (const q of P.ESQUEMA.split(';')) if (q.trim()) sq.exec(q + ';');
  const db = comoD1(sq);
  const sembrar = async (id, dominio, correo, contrato) => {
    await A.crearPedido(db, { id, dominio, correo, ...contrato });
    await A.marcarEstado(db, id, 'creado', 'pagado', { pagado_en: '2026-11-03T12:00:00.000Z' });
  };
  await sembrar(ID_POLITICA, 'solopolitica.cl', 'politica@ejemplo.cl', SOLO_POLITICA);
  await sembrar(ID_GESTOR, 'congestor.cl', 'gestor@ejemplo.cl', CON_GESTOR);
  return { db, sq };
}

const DATOS = {
  razon_social: 'Clínica Ejemplo SpA', rut: '76.086.428-5',
  giro: 'Servicios médicos', direccion: 'Av. Siempre Viva 742',
};

const postearIntake = (cuerpo, db) => {
  const fondo = [];
  return { fondo, p: I.onRequestPost({
    request: new Request('https://verifica.spindlelab.cl/api/intake', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cuerpo),
    }),
    env: { VYC_PEDIDOS: db }, waitUntil: (x) => fondo.push(x) }) };
};

/* ── CÓMO SE DETECTA «ACÁ SE LE ESTÁ PIDIENDO ENTRAR A SU SITIO» ─────────────────────────
 *
 * El primer intento fue un regex sobre el texto entero buscando «acceso», «entrar»,
 * «instalar». Se puso rojo donde no había defecto, y la prueba tenía la culpa: los textos
 * nuevos NIEGAN esas mismas palabras («No hace falta que nos des acceso a tu sitio», «no hay
 * nada que instalar»). Un buscador de palabras no distingue pedir de tranquilizar, y una
 * aserción que no distingue eso es un candado contra la frase que hace falta escribir.
 *
 * Así que se mira FRASE por frase: una frase que habla de entrar al sitio y no lleva una
 * negación es un pedido. Es lo que de verdad no puede pasar, y da un diagnóstico útil, porque
 * la falla imprime la frase exacta que sobra en vez de un `true` contra un `false`.
 */
const HABLA_DE_ENTRAR = /acceso|entrar|invitaci[óo]n|instala|gestor de consentimiento|administrador/i;
const NIEGA = /\b(?:no|nunca|sin|tampoco|ninguna?)\b/i;

function frasesQuePiden(texto) {
  return String(texto)
    .replace(/<[^>]+>/g, ' ')
    .split(/(?<=[.:;])\s+|\n+/)
    .map((f) => f.trim())
    .filter((frase) => frase && HABLA_DE_ENTRAR.test(frase) && !NIEGA.test(frase));
}

function frasesQuePidenEntrar(etapa) {
  return frasesQuePiden([etapa.titulo, etapa.detalle, etapa.queHacer, etapa.loQueSigue,
    ...(etapa.recordatorios || [])].filter(Boolean).join(' '));
}

/* ================================================================== */
console.log('=== 1. la compuerta y el contrato: de qué estamos hablando ===');
{
  // Que el caso exista de verdad. Si la compuerta dejara de aceptar un sitio cuyo único
  // pendiente es la política, este archivo entero estaría probando un cliente imaginario.
  eq('un sitio al que solo le falta la política SÍ puede comprar',
    SOLO_POLITICA.senales_contratadas, ['politica']);
  cierto('y el normal contrata algo del gestor',
    CON_GESTOR.senales_contratadas.some((id) => !E.SIN_ENTRAR_AL_SITIO.has(id)));

  // El criterio, en los dos sentidos. Es la aserción que se cae si alguien hace que la función
  // conteste siempre lo mismo, en cualquiera de las dos direcciones.
  falso('al de solo-política no hay que entrarle al sitio',
    E.hayQueEntrarAlSitio({ senales_contratadas: SOLO_POLITICA.senales_contratadas }));
  cierto('al normal sí',
    E.hayQueEntrarAlSitio({ senales_contratadas: CON_GESTOR.senales_contratadas }));

  // Un contrato que mezcla: la política NO dispensa del acceso si hay algo más que sí lo pide.
  // Es el caso real de un sitio con rastreadores Y sin política publicada.
  cierto('con política y gestor juntos, hay que entrar',
    E.hayQueEntrarAlSitio({ senales_contratadas: ['politica', 'cmp'] }));
  // `casilla` es editar el formulario del cliente: eso se hace adentro de su sitio.
  cierto('la casilla del formulario también se arregla adentro',
    E.hayQueEntrarAlSitio({ senales_contratadas: ['politica', 'casilla'] }));

  // Falla hacia pedir el acceso. Equivocarse hacia no pedirlo dejaría un pedido diciendo
  // «estamos trabajando» sin que nadie pueda trabajar, y el cliente sin forma de saberlo.
  cierto('sin contrato legible, se pide el acceso igual',
    E.hayQueEntrarAlSitio({ senales_contratadas: null }));
  cierto('con un JSON roto, también', E.hayQueEntrarAlSitio({ senales_contratadas: '{' }));
}

/* ================================================================== */
console.log('=== 2. después de pagar: a cada uno se le pide lo que su compra necesita ===');
{
  const { db, sq } = await baseConLosDos();

  // Los dos empiezan igual, y eso está bien: los datos de la empresa hacen falta en los dos
  // casos, porque el borrador de la política va en los dos kits.
  const crudo = (id) => sq.prepare('SELECT * FROM pedidos WHERE id = ?').get(id);
  eq('los dos parten pidiendo los datos de la empresa',
    [E.etapaDelPedido(crudo(ID_POLITICA)).etapa, E.etapaDelPedido(crudo(ID_GESTOR)).etapa],
    [E.ETAPAS.FALTA_DATOS, E.ETAPAS.FALTA_DATOS]);

  // ⚠️ Pero ya acá se bifurca lo que se le ANUNCIA. Al de solo-política no se le puede decir
  // «después te pedimos un acceso», porque después no se lo vamos a pedir.
  const datosPol = E.etapaDelPedido(crudo(ID_POLITICA));
  const datosGes = E.etapaDelPedido(crudo(ID_GESTOR));
  eq('al de solo-política no se le anuncia un acceso que no va a llegar',
    frasesQuePidenEntrar(datosPol), []);
  cierto('al normal sí se le anuncia', frasesQuePidenEntrar(datosGes).length > 0);

  // La regla que ya estaba escrita en el código: la frase nombra EXACTAMENTE los campos que el
  // formulario pide. Al de solo-política no se le pide la plataforma, así que no se nombra.
  falso('no le pide la plataforma', /plataforma/i.test(datosPol.queHacer));
  cierto('y al normal sí', /plataforma/i.test(datosGes.queHacer));

  // Manda sus datos. El de solo-política NO manda plataforma: su formulario no la dibuja.
  const red = conRed();
  const x = postearIntake({ id: ID_POLITICA, ...DATOS }, db);
  const r = await x.p; await Promise.all(x.fondo);
  const y = postearIntake({ id: ID_GESTOR, ...DATOS, plataforma: 'wordpress' }, db);
  const r2 = await y.p; await Promise.all(y.fondo);
  red.soltar();

  eq('el intake del de solo-política se acepta sin plataforma', r.status, 200);
  eq('y el del normal también', r2.status, 200);

  // ⚠️ GUARDA. Si el intake fallara, lo de abajo leería `etapa` de un cuerpo de error y
  // reventaría con un TypeError: el archivo se cortaría acá y ninguna de las aserciones que
  // nombran el problema de verdad llegaría a correr.
  const jPol = (await r.json()) || {};
  const jGes = (await r2.json()) || {};
  const etPol = jPol.etapa || {};
  const etGes = jGes.etapa || {};

  // ═══ LA ASERCIÓN QUE DEFINE ESTE ARCHIVO ═══
  //
  // Con los datos de su empresa adentro, al de solo-política ya no le falta nada: el borrador
  // se redacta con eso. Su pantalla no puede pedirle entrar a su sitio de ninguna forma.
  eq('al de solo-política NO se le pide nada para entrar a su sitio',
    frasesQuePidenEntrar(etPol), []);
  eq('y no le toca a él mover el pedido', etPol.quienActua, E.ACTUA.NOSOTROS);
  eq('no se le pide nada más', etPol.queHacer, null);
  cierto('pero se le dice qué estamos haciendo', (etPol.detalle || '').length > 20);
  cierto('y qué va a pasar después', (etPol.loQueSigue || '').length > 10);

  // ═══ Y LA QUE IMPIDE «ARREGLARLO» ROMPIENDO EL CASO NORMAL ═══
  //
  // Al que compró el gestor hay que entrarle al sitio, y ahí el pedido SÍ se detiene a
  // esperarlo. Si esta se pusiera verde pasando a todos por el camino de la política, el kit
  // de verdad se quedaría sin poder instalar nada.
  eq('al normal el pedido se detiene esperando el acceso', etGes.etapa, E.ETAPAS.FALTA_ACCESO);
  eq('y le toca a él', etGes.quienActua, E.ACTUA.CLIENTE);
  cierto('con las instrucciones de su plataforma al lado', jGes.acceso && jGes.acceso.pasos);
  cierto('y el texto para reenviarle a quien lo administre',
    jGes.acceso && jGes.acceso.textoParaReenviar);

  // La ayuda del acceso no se arma dos veces: la condición vive en `etapaDelPedido`. Al de
  // solo-política le llega `null` sin que `acceso.js` tenga que preguntar nada.
  eq('el de solo-política no recibe instrucciones de acceso',
    AC.ayudaDeAcceso(crudo(ID_POLITICA), E.etapaDelPedido(crudo(ID_POLITICA))), null);

  // Nada de esto le quitó el acceso al normal por el camino: las dos filas siguen distintas.
  eq('ninguno de los dos quedó con fecha de acceso que nadie dio',
    [crudo(ID_POLITICA).acceso_recibido_en, crudo(ID_GESTOR).acceso_recibido_en], [null, null]);
}

/* ================================================================== */
console.log('=== 3. el correo de pago: no promete un trámite que no va a pedir ===');
{
  const pol = { id: ID_POLITICA, dominio: 'solopolitica.cl', correo: 'politica@ejemplo.cl',
    monto_total: 177310, senales_contratadas: SOLO_POLITICA.senales_contratadas };
  const ges = { id: ID_GESTOR, dominio: 'congestor.cl', correo: 'gestor@ejemplo.cl',
    monto_total: 177310, senales_contratadas: CON_GESTOR.senales_contratadas };

  const mPol = C.correoDePago(pol);
  const mGes = C.correoDePago(ges);

  // Es el PRIMER correo que recibe después de pagar. Si acá le anuncia un acceso temporal y su
  // pantalla no se lo pide nunca, son dos versiones del producto en el mismo minuto.
  eq('al de solo-política no se le anuncia un acceso', frasesQuePiden(mPol.text), []);
  eq('ni en el HTML', frasesQuePiden(mPol.html), []);
  cierto('al normal sí, en el texto', frasesQuePiden(mGes.text).length > 0);
  cierto('y en el HTML', frasesQuePiden(mGes.html).length > 0);

  // Lo que los dos SÍ llevan: el enlace, que es su única credencial, y los datos que se piden.
  for (const [quien, m] of [['solo-política', mPol], ['normal', mGes]]) {
    cierto(`${quien}: lleva el enlace del pedido`, m.text.includes(C.enlaceDelPedido(m.to[0] === pol.correo ? ID_POLITICA : ID_GESTOR)));
    cierto(`${quien}: pide la razón social`, /razón social/i.test(m.text));
    falso(`${quien}: el rótulo no lleva el número de pasos escrito a mano`,
      /son dos pasos|son tres pasos|un solo paso/i.test(m.text));
  }

  // Y se le dice en voz alta, porque es la duda que le queda a quien ya pagó.
  cierto('al de solo-política se le dice que no le vamos a pedir entrar',
    /no te vamos a pedir acceso a tu sitio/i.test(mPol.text));
  falso('y al normal no se le dice eso, porque sería falso',
    /no te vamos a pedir acceso a tu sitio/i.test(mGes.text));

  // El HTML no se rompió al armarse en lista: la negrita de la frase del contraseña sigue.
  cierto('el normal conserva la negrita de «nunca te vamos a pedir tu contraseña»',
    /<strong>Nunca te vamos a pedir tu contraseña\.<\/strong>/.test(mGes.html));
}

/* ================================================================== */
console.log('=== 4. el cierre: no se le dice que borre un acceso que nunca dio ===');
{
  const { db, sq } = await baseConLosDos();
  const crudo = (id) => sq.prepare('SELECT * FROM pedidos WHERE id = ?').get(id);

  let red = conRed();
  for (const [id, extra] of [[ID_POLITICA, {}], [ID_GESTOR, { plataforma: 'wordpress' }]]) {
    const x = postearIntake({ id, ...DATOS, ...extra }, db);
    await x.p; await Promise.all(x.fondo);
  }
  // El normal declara el acceso; el de solo-política no tiene nada que declarar.
  const z = postearIntake({ id: ID_GESTOR, acceso_listo: true }, db);
  await z.p; await Promise.all(z.fondo);
  red.soltar();

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

  // Se cierran los dos por el endpoint de verdad, con medición nueva.
  const entregar = async (id) => {
    const r = await EN.onRequestPost({
      request: new Request('https://verifica.spindlelab.cl/api/entregar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${CLAVE}` },
        body: JSON.stringify({ id, informe_final: { rapido: { puntaje: 88 } },
          borrador_politica: BORRADOR }),
      }),
      env: { VYC_PEDIDOS: db, CLAVE_ENTREGA: CLAVE, RESEND_API_KEY: 'k' },
    });
    return (await r.json()) || {};
  };

  /* ⚠️ Y AL DE SOLO-POLÍTICA NO SE LE PUEDE CERRAR EL PEDIDO SIN EL BORRADOR (3-nov-2026).
   *
   * Es el único comprador cuyo kit entero ES el borrador: su sitio no se toca. Cerrarle el
   * pedido sin el texto le dejaría una pantalla que dice «tu borrador quedó listo» y un correo
   * que le pide que lo revise su abogado, sin nada que revisar. Hasta hoy se podía.
   */
  red = conRed();
  const sinBorrador = await EN.onRequestPost({
    request: new Request('https://verifica.spindlelab.cl/api/entregar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${CLAVE}` },
      body: JSON.stringify({ id: ID_POLITICA, informe_final: { rapido: { puntaje: 88 } } }),
    }),
    env: { VYC_PEDIDOS: db, CLAVE_ENTREGA: CLAVE, RESEND_API_KEY: 'k' },
  }).catch((e) => ({ status: 0, json: async () => ({ motivo: `lanzo:${e && e.message}` }) }));
  red.soltar();
  eq('sin el borrador, el pedido de solo-política no se cierra', sinBorrador.status, 409);
  eq('y el motivo lo nombra', (await sinBorrador.json()).motivo, 'falta-borrador');
  eq('el pedido sigue pagado', crudo(ID_POLITICA).estado, 'pagado');

  red = conRed();
  const cierrePol = await entregar(ID_POLITICA);
  const cierreGes = await entregar(ID_GESTOR);
  red.soltar();

  cierto('los dos se entregan', cierrePol.entregado && cierreGes.entregado);
  const recPol = (cierrePol.etapa && cierrePol.etapa.recordatorios) || [];
  const recGes = (cierreGes.etapa && cierreGes.etapa.recordatorios) || [];

  // ═══ EL DAÑO CONCRETO QUE SE ESTÁ EVITANDO ═══
  //
  // Decirle «ya puedes borrar el acceso que nos diste» a alguien que nunca dio uno lo manda a
  // buscar en su panel una invitación que no existe, y de paso le afirma que se la pedimos.
  falso('al de solo-política no se le manda borrar un acceso',
    recPol.some((r) => /borrar el acceso/i.test(r)));
  cierto('al normal sí, porque ahí es cierto',
    recGes.some((r) => /borrar el acceso/i.test(r)));

  // Lo que queda del lado de los DOS: el abogado. En ninguno de los dos casos el texto final
  // es nuestro, y en los dos se entrega un borrador.
  for (const [quien, rec] of [['solo-política', recPol], ['normal', recGes]]) {
    cierto(`${quien}: le recuerda que lo revise su abogado`, rec.some((r) => /tu abogado/i.test(r)));
    cierto(`${quien}: y que no damos asesoría legal`,
      rec.some((r) => /no damos asesoría legal/i.test(r)));
  }
  // Y al de solo-política, lo único que de verdad le queda: publicarlo.
  cierto('al de solo-política se le dice que publicar le toca a él',
    recPol.some((r) => /publicar el texto/i.test(r)));

  // El título y el detalle también. «Hicimos los cambios» en un sitio que no tocamos es una
  // afirmación falsa sobre trabajo ejecutado, que es justo lo que este producto le marca en
  // rojo a otros sitios.
  falso('no se le afirma que hicimos cambios en su sitio',
    /hicimos los cambios/i.test(JSON.stringify(cierrePol.etapa)));
  cierto('al normal sí', /hicimos los cambios/i.test(JSON.stringify(cierreGes.etapa)));
  falso('y no se le dice que su sitio quedó listo cuando sigue igual',
    /tu sitio quedó listo/i.test(cierrePol.etapa.titulo));

  // ⚠️ El correo de cierre dice LO MISMO que la pantalla, porque sale de la misma función.
  // Antes eran dos copias del texto, y la primera vez que tuvieron que decir cosas distintas
  // las dos se equivocaron igual.
  const mPol = C.correoDeEntrega(crudo(ID_POLITICA), { rapido: { puntaje: 88 } }, E.TITULOS);
  const mGes = C.correoDeEntrega(crudo(ID_GESTOR), { rapido: { puntaje: 88 } }, E.TITULOS);
  falso('el correo del de solo-política tampoco le manda borrar un acceso',
    /borrar el acceso/i.test(mPol.text));
  falso('ni en el HTML', /borrar el acceso/i.test(mPol.html));
  cierto('el del normal sí lo dice', /borrar el acceso/i.test(mGes.text));
  cierto('y en el HTML', /borrar el acceso/i.test(mGes.html));
  for (const [quien, m] of [['solo-política', mPol], ['normal', mGes]]) {
    cierto(`${quien}: el correo manda el borrador al abogado`, /tu abogado/i.test(m.text));
    falso(`${quien}: y el rótulo no lleva el número escrito a mano`,
      /dos cosas por hacer/i.test(m.text));
  }

  // ⚠️ «Esto es lo que quedó cerrado · Enlace a tu política de privacidad» se lee como si la
  // hubiéramos publicado, y el puntaje que va dos párrafos más abajo la sigue marcando
  // pendiente. La pantalla del pedido ya aclaraba esto desde el 2-nov; el correo no.
  cierto('el correo aclara que de la política va el BORRADOR',
    /te entregamos el borrador/i.test(mPol.text));
  cierto('y que la publica él', /la publicas tú/i.test(mPol.text));
  cierto('también en el HTML', /te entregamos el borrador/i.test(mPol.html));
  // Y no sale donde no corresponde: al que compró el gestor no se le vendió la política.
  falso('al normal, que no compró la política, no se le mete la nota',
    /te entregamos el borrador/i.test(mGes.text));
  // La misma aclaración que ya hace la pantalla, para que no se separen.
  cierto('la pantalla dice lo mismo con las mismas palabras',
    /te entregamos el <strong>borrador<\/strong>/.test(HTML));
  // La prueba de que de verdad es una sola fuente: lo que dice la pantalla está en el correo.
  for (const r of recPol) {
    cierto('cada recordatorio de la pantalla viaja en el correo', mPol.text.includes(r));
  }

  // ⚠️ Y EL CORREO SE COMPONE IGUAL DESDE LA FILA CRUDA QUE DESDE LA HIDRATADA.
  //
  // No es simetría por elegancia: estas dos columnas viajan como texto JSON en la fila cruda, y
  // componer el correo desde ahí lanzaba un TypeError. Importa por DÓNDE ocurre — el `await`
  // del correo de cierre pasa DESPUÉS de haber marcado el pedido como entregado, así que una
  // excepción ahí deja el trabajo entregado en la base y un 500 en la cara de quien entregó,
  // que lo más probable es que reintente. Lo encontró esta prueba al componer desde la fila.
  for (const id of [ID_POLITICA, ID_GESTOR]) {
    const desdeHidratado = C.correoDeEntrega(await A.leerPedido(db, id), null, E.TITULOS);
    const desdeCrudo = C.correoDeEntrega(crudo(id), null, E.TITULOS);
    eq(`${id.slice(4, 9)}: el correo de cierre no depende de cómo se leyó la fila`,
      desdeCrudo.text, desdeHidratado.text);
    cierto(`${id.slice(4, 9)}: y nombra lo vendido con su título, no con su id`,
      desdeCrudo.text.includes(E.TITULOS[JSON.parse(crudo(id).senales_contratadas)[0]]));
  }
}

/* ================================================================== */
console.log('=== 5. la cola de trabajo ve lo mismo que el cliente ===');
{
  // ── POR QUÉ ESTA SECCIÓN NO ES UN ADORNO ───────────────────────────────────────────────
  //
  // `/api/cola` le pasa a `etapaDelPedido` la fila CRUDA de `listarPedidos`, donde
  // `senales_contratadas` viene como TEXTO JSON, no como arreglo: esa consulta no hidrata.
  // Un criterio que diera por hecho el arreglo contestaría otra cosa acá que en la pantalla
  // del cliente, para el MISMO pedido, y `cola.js` existe declarando justamente que no se
  // reimplementa el criterio «porque dos criterios se contradicen en silencio».
  //
  // El síntoma sería el peor posible: quien va a atender la venta lee «Estamos trabajando en
  // tu sitio», sale a buscar un acceso que el cliente nunca va a dar, y el pedido se muere.
  const { db, sq } = await baseConLosDos();
  const red = conRed();
  for (const [id, extra] of [[ID_POLITICA, {}], [ID_GESTOR, { plataforma: 'wordpress' }]]) {
    const x = postearIntake({ id, ...DATOS, ...extra }, db);
    await x.p; await Promise.all(x.fondo);
  }
  red.soltar();

  const r = await CO.onRequestGet({
    request: new Request('https://verifica.spindlelab.cl/api/cola?estado=pagado', {
      headers: { Authorization: `Bearer ${CLAVE}` },
    }),
    env: { VYC_PEDIDOS: db, CLAVE_ENTREGA: CLAVE },
  });
  const j = (await r.json()) || {};
  const porId = Object.fromEntries((j.pedidos || []).map((p) => [p.id, p]));

  eq('la cola contesta', r.status, 200);
  cierto('y trae los dos pedidos', porId[ID_POLITICA] && porId[ID_GESTOR]);

  // La fila cruda llega con el texto JSON. Si esto dejara de ser cierto, la sección entera
  // estaría probando otra cosa y conviene que se vea.
  eq('la consulta de la cola no hidrata las señales',
    typeof sq.prepare('SELECT senales_contratadas s FROM pedidos WHERE id=?').get(ID_POLITICA).s,
    'string');

  // El mismo pedido, visto por los dos lados.
  const crudo = (id) => sq.prepare('SELECT * FROM pedidos WHERE id = ?').get(id);
  const hidratado = async (id) => A.leerPedido(db, id);
  for (const id of [ID_POLITICA, ID_GESTOR]) {
    eq(`${id.slice(4, 9)}: la cola y la pantalla dicen la misma etapa`,
      (porId[id] || {}).etapa, E.etapaDelPedido(await hidratado(id)).etapa);
    eq(`${id.slice(4, 9)}: y el mismo quién actúa`,
      (porId[id] || {}).quien_actua, E.etapaDelPedido(await hidratado(id)).quienActua);
    eq(`${id.slice(4, 9)}: leer la fila cruda da lo mismo que leerla hidratada`,
      E.etapaDelPedido(crudo(id)).etapa, E.etapaDelPedido(await hidratado(id)).etapa);
  }

  // Y los dos no son lo mismo: la cola distingue al que hay que atender sin entrar a su sitio.
  falso('los dos pedidos no caen en la misma etapa',
    porId[ID_POLITICA].etapa === porId[ID_GESTOR].etapa);
  eq('el de solo-política ya es trabajo nuestro', porId[ID_POLITICA].quien_actua, 'nosotros');
  eq('el normal está esperando al cliente', porId[ID_GESTOR].quien_actua, 'cliente');
}

/* ================================================================== */
console.log('=== 6. la pantalla del pedido: lo que hubo y no hubo que tocar ===');
{
  // ── LO QUE NO HUBO QUE TOCAR, COMPROBADO Y NO SUPUESTO ─────────────────────────────────
  //
  // La pantalla pinta `titulo`, `detalle`, `queHacer` y `loQueSigue` tal como vienen de la
  // API, así que una etapa nueva se dibuja sola. Eso era la expectativa; esto es la
  // comprobación, porque la pantalla SÍ mapea dos etapas por nombre y había que mirar cuáles.
  cierto('el título se pinta tal como viene', /escapar\(e\.titulo\)/.test(HTML));
  cierto('el detalle también', /escapar\(e\.detalle\)/.test(HTML));
  cierto('y lo que sigue', /e\.loQueSigue/.test(HTML));
  const porNombre = [...HTML.matchAll(/e\.etapa === '([a-z-]+)'/g)].map((m) => m[1]);
  /* Las que se mapean son las que montan un CONTROL, y ese es el criterio, no el número.
   *
   *   - `falta-datos`   → el formulario de la empresa.
   *   - `falta-acceso`  → las instrucciones y el botón que declara el acceso.
   *   - `sin-pago`      → el botón «Intentar el pago de nuevo» (agregado el 4-nov-2026).
   *
   * El tercero entró porque esta aserción hizo exactamente lo que tenía que hacer: se puso
   * roja y obligó a justificarlo. Y se justifica con su mismo criterio — la etapa decía
   * «puedes intentarlo de nuevo» y la pantalla dibujaba un solo botón, «Escríbenos», así que
   * el camino no-feliz más frecuente que hay terminaba en un formulario de contacto.
   *
   * Si alguien agregara acá un `e.etapa === 'redactando'`, sería una pantalla especial para
   * una etapa que no pide nada, y esto vuelve a ponerse rojo. Eso es lo que cuida. */
  eq('solo se mapean por nombre las etapas que montan un control',
    [...new Set(porNombre)].sort(), ['falta-acceso', 'falta-datos', 'sin-pago']);

  // ⚠️ LA REGLA ESTÁ ESCRITA DOS VECES —servidor y navegador— PORQUE NO HAY OTRA FORMA: el
  // formulario corre en el navegador y no puede importar nada de `functions/`. Lo que sí se
  // puede es comparar las dos listas acá, que es lo único que impide que se separen en
  // silencio el día que la de alguno cambie.
  const enElFront = HTML.match(/var SIN_ENTRAR_AL_SITIO = \[([^\]]*)\]/);
  cierto('la lista del navegador existe y se puede leer', enElFront);
  const idsFront = (enElFront ? enElFront[1] : '')
    .split(',').map((s) => s.trim().replace(/^'|'$/g, '')).filter(Boolean);
  eq('y dice exactamente lo mismo que la del servidor',
    idsFront.sort(), [...E.SIN_ENTRAR_AL_SITIO].sort());
}

/* ================================================================== */
console.log('=== 7. el formulario, en un navegador de verdad ===');
{
  /* ── POR QUÉ ESTA SECCIÓN EXISTE, Y POR QUÉ NO ALCANZABA UN GREP ─────────────────────────
   *
   * La primera versión de la sección 6 comprobaba el formulario con dos regex sobre el
   * archivo: que apareciera `pideLaPlataforma` y que apareciera `if (f.elements[c])`. Las dos
   * pasaban. Después se mutó el código a `var pideLaPlataforma = true;` —o sea, volver a
   * pedirle la plataforma a todo el mundo, que es el defecto— y la batería entera quedó EN
   * VERDE: 84 de 84. Las dos aserciones estaban copiadas del código en vez de describir lo que
   * tiene que pasar, así que medían que el nombre siguiera escrito, no que estuviera conectado.
   *
   * Un grep ve el nombre, no el ámbito. Acá el juez es el navegador: se levanta la página real
   * contra una API falsa, se mira QUÉ CAMPOS aparecen, y se APRIETA el botón para ver qué
   * cuerpo sale. Con la mutación puesta, esto se pone rojo.
   *
   * La respuesta falsa de `/api/pedido` no está escrita a mano: la arman las mismas funciones
   * del servidor (`vistaPublica`, `etapaDelPedido`, `señalesDelPedido`, `ayudaDeAcceso`) que
   * la arman en producción. Una respuesta inventada a mano probaría la página contra una API
   * que no existe.
   */
  const CHROME = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  const PAGINA = fs.readFileSync(
    rutaEnElRepo('verificaycumple/public/pedido/index.html', 'VYC_PEDIDO_HTML'), 'utf8');

  // El conductor: espera el formulario, mira sus campos, lo llena y lo manda. Lo que reporta
  // es lo que la persona vería y lo que el navegador enviaría.
  const CONDUCTOR = `<script>
(function () {
  var reportado = false;
  function reportar(x) {
    if (reportado) return; reportado = true;
    var d = document.createElement('div');
    d.id = 'resultado';
    d.textContent = 'RESULTADO:' + btoa(unescape(encodeURIComponent(JSON.stringify(x))));
    document.body.appendChild(d);
  }
  var intentos = 0;
  var esperar = setInterval(function () {
    if (++intentos > 120) { clearInterval(esperar); reportar({ fatal: 'nunca apareció el formulario' }); return; }
    var f = document.querySelector('form.intake');
    if (!f) return;
    clearInterval(esperar);
    var campos = [].slice.call(f.querySelectorAll('[name]')).map(function (e) {
      return { nombre: e.name, etiqueta: e.tagName.toLowerCase(), obligatorio: e.required };
    });
    [].forEach.call(f.querySelectorAll('input'), function (e) { e.value = 'x'; });
    var sel = f.querySelector('select[name="plataforma"]');
    if (sel) sel.value = 'wordpress';
    f.querySelector('button[type="submit"]').click();
    setTimeout(function () {
      reportar({ campos: campos, enviado: window.__cuerpoIntake || null,
        errorJs: window.__errorJs || null,
        estado: (f.querySelector('.intake-estado') || {}).textContent || '' });
    }, 400);
  }, 50);
  window.onerror = function (m) { window.__errorJs = String(m); };
})();
<\/script>`;

  async function enElNavegador(pedidoCrudo) {
    const vista = A.vistaPublica(pedidoCrudo);
    const etapa = E.etapaDelPedido(pedidoCrudo);
    const cuerpo = {
      ok: true, pedido: vista, etapa,
      señales: E.señalesDelPedido(pedidoCrudo, E.TITULOS),
      acceso: AC.ayudaDeAcceso(pedidoCrudo, etapa),
      refrescar: false,
    };
    let recibido = null;
    const s = http.createServer((req, res) => {
      const u = new URL(req.url, 'http://127.0.0.1');
      if (u.pathname === '/api/pedido') {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        return res.end(JSON.stringify(cuerpo));
      }
      if (u.pathname === '/api/intake') {
        let crudo = '';
        req.on('data', (d) => { crudo += d; });
        return req.on('end', () => {
          try { recibido = JSON.parse(crudo); } catch { recibido = { noParsea: crudo }; }
          res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
          // Se contesta con el MISMO cuerpo para que la página no se repinte a otra etapa:
          // lo que esta sección mide es el envío, no el repintado.
          res.end(JSON.stringify(cuerpo));
        });
      }
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      // El conductor va al final, después del script de la página, y deja el cuerpo enviado
      // colgado de `window` interceptando `fetch` antes de que la página lo use.
      res.end(PAGINA
        .replace('<script>', '<script>(function(){var f=window.fetch;window.fetch=function(u,o){'
          + 'if(String(u).indexOf("/api/intake")>=0){try{window.__cuerpoIntake=JSON.parse(o.body);}catch(e){}}'
          + 'return f.apply(this,arguments);};})();</script><script>')
        .replace('</body>', CONDUCTOR + '</body>'));
    });
    await new Promise((r) => s.listen(0, '127.0.0.1', r));
    const puerto = s.address().port;
    const perfil = fs.mkdtempSync(path.join(os.tmpdir(), 'vyc-chrome-'));
    try {
      // Misma receta que `prueba-portada-rehacer.mjs`: no se espera a que Chrome muera —con un
      // perfil nuevo escribe el DOM y se queda colgado— sino al `</html>`, y ahí se mata el
      // grupo entero.
      const dom = await new Promise((listo) => {
        const ch = spawn(CHROME, [
          '--headless', '--disable-gpu', '--no-sandbox', '--no-first-run',
          '--disable-extensions', '--user-data-dir=' + perfil,
          '--virtual-time-budget=20000', '--dump-dom',
          `http://127.0.0.1:${puerto}/pedido/?id=${pedidoCrudo.id}`,
        ], { stdio: ['ignore', 'pipe', 'ignore'], detached: true });
        let salida = '', cerrado = false, muerte = null;
        const matar = () => { try { process.kill(-ch.pid, 'SIGKILL'); } catch { try { ch.kill('SIGKILL'); } catch {} } };
        const fin = () => { if (cerrado) return; cerrado = true; clearTimeout(muerte); matar(); listo(salida); };
        muerte = setTimeout(fin, 60000);
        ch.stdout.on('data', (d) => { salida += d; if (salida.includes('</html>')) fin(); });
        ch.on('close', fin);
        ch.on('error', fin);
      });
      const m = /RESULTADO:([A-Za-z0-9+/=]+)/.exec(dom);
      if (!m) return { fatal: 'la página no llegó a reportar', recibido };
      return { ...JSON.parse(Buffer.from(m[1], 'base64').toString('utf8')), recibido };
    } finally {
      s.close();
      fs.rmSync(perfil, { recursive: true, force: true });
    }
  }

  if (!fs.existsSync(CHROME)) {
    // No se salta en silencio. Una sección que no corre no acusa nada, y esta es justamente la
    // que pilló que las otras dos aserciones eran decorativas.
    eq('hay un Chrome con el que mirar la página (CHROME=... para apuntarlo)', CHROME, 'existe');
  } else {
    const { db, sq } = await baseConLosDos();
    const crudo = (id) => sq.prepare('SELECT * FROM pedidos WHERE id = ?').get(id);
    // Los dos recién pagados, sin datos de empresa: es la etapa que dibuja el formulario.
    const pol = await enElNavegador(await A.leerPedido(db, ID_POLITICA));
    const ges = await enElNavegador(await A.leerPedido(db, ID_GESTOR));

    // ⚠️ GUARDA. Sin esto, un `fatal` dejaría a las aserciones de abajo leyendo `undefined` y
    // el archivo reventaría antes de nombrar el problema.
    eq('la página del de solo-política dibujó su formulario', pol.fatal || null, null);
    eq('y la del normal también', ges.fatal || null, null);
    const campos = (r) => ((r.campos) || []).map((c) => c.nombre).sort();
    const obligatorios = (r) => ((r.campos) || []).filter((c) => c.obligatorio).map((c) => c.nombre).sort();

    eq('ningún error de JavaScript en la página del de solo-política', pol.errorJs || null, null);
    eq('ni en la del normal', ges.errorJs || null, null);

    // ═══ EL CAMPO QUE SOBRA ═══
    eq('al de solo-política no se le pide la plataforma',
      campos(pol), ['direccion', 'giro', 'razon_social', 'rut']);
    eq('y al normal sí', campos(ges), ['direccion', 'giro', 'plataforma', 'razon_social', 'rut']);
    falso('y ningún campo obligatorio de más para el de solo-política',
      obligatorios(pol).includes('plataforma'));
    cierto('mientras al normal se le exige', obligatorios(ges).includes('plataforma'));

    // ═══ Y QUE EL BOTÓN SIGA FUNCIONANDO ═══
    //
    // Es la mitad que se rompe sola: recorrer una lista fija de campos y leer `.value` de uno
    // que el formulario no dibujó revienta con un TypeError, y el envío se muere en silencio
    // justo después de que la persona apretó «Enviar mis datos». Se comprueba contra lo que
    // el SERVIDOR recibió, no contra lo que la página dice haber mandado.
    cierto('el formulario del de solo-política llega al servidor', pol.recibido);
    eq('y manda los cuatro datos, sin plataforma',
      Object.keys(pol.recibido || {}).sort(), ['direccion', 'giro', 'id', 'razon_social', 'rut']);
    cierto('el del normal también llega', ges.recibido);
    eq('con la plataforma incluida',
      Object.keys(ges.recibido || {}).sort(),
      ['direccion', 'giro', 'id', 'plataforma', 'razon_social', 'rut']);
  }
}

console.log(`\n${ok} bien, ${malo} mal`);
process.exit(malo ? 1 : 0);
