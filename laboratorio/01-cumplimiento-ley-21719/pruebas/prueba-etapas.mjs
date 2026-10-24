/**
 * Pruebas de las etapas del pedido (functions/api/etapas.js).
 *
 *   node prueba-etapas.mjs
 *
 * Lo que cuidan:
 *
 *   1. Que cada etapa salga de un DATO guardado, no de un paso inventado. El brief proponía
 *      seis etapas y el sistema solo sabe cinco: mostrar una barra que finge saber más es
 *      teatro, y este producto declina en vez de inventar en todas las demás partes.
 *
 *   2. Que cada etapa diga QUIÉN ACTÚA. Una pantalla en voz pasiva deja el pedido parado con
 *      la plata adentro mientras cada lado espera al otro.
 *
 *   3. Que las señales se lean del contrato CONGELADO y no del chequeo de hoy.
 */

import { rutaEnElRepo } from './rutas.mjs';

const E = await import(rutaEnElRepo('verificaycumple/functions/api/etapas.js', 'ETAPAS_JS'));
const P = await import(rutaEnElRepo('verificaycumple/functions/api/pedidos.js', 'PEDIDOS_JS'));

let ok = 0, malo = 0;
const eq = (n, r, e) => {
  if (JSON.stringify(r) === JSON.stringify(e)) ok++;
  else { malo++; console.log(`  FALLA ${n}: esperado ${JSON.stringify(e)}, real ${JSON.stringify(r)}`); }
};
const cierto = (n, v) => eq(n, Boolean(v), true);
const falso = (n, v) => eq(n, Boolean(v), false);

const ped = (extra = {}) => ({
  id: 'vyc_abc', estado: P.ESTADOS.CREADO,
  senales_contratadas: ['carga', 'cookies'], senales_fuera: ['politica'],
  acceso_recibido_en: null, ...extra,
});

/* ================================================================== */
console.log('=== 1. los cinco estados del pedido dan cinco etapas distintas ===');
{
  const casos = [
    [{ estado: P.ESTADOS.CREADO }, E.ETAPAS.CONFIRMANDO],
    [{ estado: P.ESTADOS.PAGADO, acceso_recibido_en: null }, E.ETAPAS.FALTA_ACCESO],
    [{ estado: P.ESTADOS.PAGADO, acceso_recibido_en: '2026-10-23T12:00:00Z' }, E.ETAPAS.EN_CURSO],
    [{ estado: P.ESTADOS.ENTREGADO }, E.ETAPAS.ENTREGADO],
    [{ estado: P.ESTADOS.RECHAZADO }, E.ETAPAS.SIN_PAGO],
    [{ estado: P.ESTADOS.DEVUELTO }, E.ETAPAS.DEVUELTO],
  ];
  for (const [extra, esperada] of casos) {
    eq(`${extra.estado}${extra.acceso_recibido_en ? ' con acceso' : ''}`,
      E.etapaDelPedido(ped(extra)).etapa, esperada);
  }
  eq('sin pedido, null', E.etapaDelPedido(null), null);
}

/* ================================================================== */
console.log('=== 2. cada etapa dice quién actúa, y nunca queda en voz pasiva ===');
{
  const todos = [
    { estado: P.ESTADOS.CREADO },
    { estado: P.ESTADOS.PAGADO, acceso_recibido_en: null },
    { estado: P.ESTADOS.PAGADO, acceso_recibido_en: 'x' },
    { estado: P.ESTADOS.ENTREGADO },
    { estado: P.ESTADOS.RECHAZADO },
    { estado: P.ESTADOS.DEVUELTO },
  ];
  const validos = Object.values(E.ACTUA);
  for (const extra of todos) {
    const e = E.etapaDelPedido(ped(extra));
    cierto(`${e.etapa}: nombra a alguien`, validos.includes(e.quienActua));
    cierto(`${e.etapa}: tiene título`, e.titulo && e.titulo.length > 5);
    cierto(`${e.etapa}: tiene detalle`, e.detalle && e.detalle.length > 20);
  }
}

/* ================================================================== */
console.log('=== 3. cuando le toca al cliente, se le dice QUÉ hacer ===');
{
  // Es el punto donde se muere el pedido: pagado, parado, esperando el acceso.
  const falta = E.etapaDelPedido(ped({ estado: P.ESTADOS.PAGADO, acceso_recibido_en: null }));
  eq('le toca al cliente', falta.quienActua, E.ACTUA.CLIENTE);
  cierto('y se le dice qué hacer', falta.queHacer && falta.queHacer.length > 30);

  // Las tres situaciones reales de una pyme, nombradas. Si solo se contempla «lo administro
  // yo», el caso típico —lo hizo un tercero— se queda sin salida.
  cierto('contempla que lo administre él', /si eres tú/i.test(falta.queHacer));
  cierto('contempla que lo administre otro', /otra persona|agencia/i.test(falta.queHacer));
  cierto('y contempla que no sepa', /no sabes/i.test(falta.queHacer));

  // Y nunca se le pide la contraseña.
  cierto('dice que nunca se pide la contraseña', /nunca.*contraseña/i.test(falta.detalle));

  const rechazado = E.etapaDelPedido(ped({ estado: P.ESTADOS.RECHAZADO }));
  eq('un pago rechazado también le toca a él', rechazado.quienActua, E.ACTUA.CLIENTE);
  cierto('con una salida', rechazado.queHacer && rechazado.queHacer.length > 10);
  cierto('y aclara que no se cobró', /no te cobramos/i.test(rechazado.detalle));
}

/* ================================================================== */
console.log('=== 4. cuando NO le toca, no se le pide nada ===');
{
  // Una pantalla que siempre pide algo entrena a la persona a ignorarla.
  for (const extra of [
    { estado: P.ESTADOS.CREADO },
    { estado: P.ESTADOS.PAGADO, acceso_recibido_en: 'x' },
    { estado: P.ESTADOS.ENTREGADO },
    { estado: P.ESTADOS.DEVUELTO },
  ]) {
    const e = E.etapaDelPedido(ped(extra));
    eq(`${e.etapa}: no le pide nada`, e.queHacer, null);
    falso(`${e.etapa}: y no le echa la culpa`, e.quienActua === E.ACTUA.CLIENTE);
  }
}

/* ================================================================== */
console.log('=== 5. las etapas que siguen dicen qué viene, y las finales no ===');
{
  const enCurso = [
    { estado: P.ESTADOS.CREADO },
    { estado: P.ESTADOS.PAGADO, acceso_recibido_en: null },
    { estado: P.ESTADOS.PAGADO, acceso_recibido_en: 'x' },
  ];
  for (const extra of enCurso) {
    const e = E.etapaDelPedido(ped(extra));
    falso(`${e.etapa}: no está terminado`, e.terminado);
    cierto(`${e.etapa}: dice qué sigue`, e.loQueSigue && e.loQueSigue.length > 10);
  }
  for (const extra of [{ estado: P.ESTADOS.ENTREGADO }, { estado: P.ESTADOS.DEVUELTO }, { estado: P.ESTADOS.RECHAZADO }]) {
    const e = E.etapaDelPedido(ped(extra));
    cierto(`${e.etapa}: terminado`, e.terminado);
    eq(`${e.etapa}: y no promete un paso más`, e.loQueSigue, null);
  }
}

/* ================================================================== */
console.log('=== 6. NO se inventan etapas que el sistema no sabe ===');
{
  // El brief proponía «revisión del alcance» y «verificación final». Ninguna de las dos tiene
  // un dato detrás: ocurren en la cabeza de quien entrega. Mostrarlas sería teatro.
  const etapas = Object.values(E.ETAPAS);
  eq('son seis etapas, no las seis del brief', etapas.length, 6);
  falso('no existe «revisión del alcance»', etapas.some((e) => /alcance/i.test(e)));
  falso('no existe «verificación final»', etapas.some((e) => /verificacion|verificación/i.test(e)));

  // Y cada etapa que existe sale de un campo guardado: estado, o acceso_recibido_en.
  const conAcceso = E.etapaDelPedido(ped({ estado: P.ESTADOS.PAGADO, acceso_recibido_en: '2026-10-23' }));
  const sinAcceso = E.etapaDelPedido(ped({ estado: P.ESTADOS.PAGADO, acceso_recibido_en: null }));
  falso('el único dato que las separa cambia la etapa', conAcceso.etapa === sinAcceso.etapa);
}

/* ================================================================== */
console.log('=== 7. las señales salen del contrato CONGELADO ===');
{
  const titulos = {
    carga: 'Rastreadores que parten solos',
    cookies: 'Cookies escritas sin permiso',
    politica: 'Enlace a tu política de privacidad',
  };
  const s = E.señalesDelPedido(ped(), titulos);
  eq('las contratadas', s.incluidas.map((i) => i.id), ['carga', 'cookies']);
  eq('con su nombre', s.incluidas[0].titulo, 'Rastreadores que parten solos');
  eq('y las que quedaron fuera', s.fuera.map((i) => i.id), ['politica']);

  // Si el catálogo cambió y ya no tenemos el título, se muestra el id en vez de inventar uno.
  eq('una señal sin título conocido muestra su id',
    E.señalesDelPedido(ped({ senales_contratadas: ['señal-vieja'] }), titulos).incluidas[0].titulo, 'señal-vieja');

  eq('sin pedido', E.señalesDelPedido(null), { incluidas: [], fuera: [] });
  eq('sin señales', E.señalesDelPedido(ped({ senales_contratadas: [], senales_fuera: [] })),
    { incluidas: [], fuera: [] });
}

/* ================================================================== */
console.log('=== 8. solo se refresca cuando el pedido se puede mover solo ===');
{
  cierto('esperando el pago, sí', E.convieneRefrescar(ped({ estado: P.ESTADOS.CREADO })));
  // En «falta el acceso» el que mueve es el cliente: refrescar cada pocos segundos gasta
  // batería y da la impresión de que algo pasa cuando no.
  falso('esperando el acceso, no', E.convieneRefrescar(ped({ estado: P.ESTADOS.PAGADO })));
  falso('trabajando, no', E.convieneRefrescar(ped({ estado: P.ESTADOS.PAGADO, acceso_recibido_en: 'x' })));
  falso('entregado, no', E.convieneRefrescar(ped({ estado: P.ESTADOS.ENTREGADO })));
  falso('sin pedido, no', E.convieneRefrescar(null));
}

console.log(`\n${ok} bien, ${malo} mal`);
process.exit(malo ? 1 : 0);
