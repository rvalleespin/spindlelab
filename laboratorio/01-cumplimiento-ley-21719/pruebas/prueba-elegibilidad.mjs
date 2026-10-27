/**
 * Pruebas de la compuerta de venta (functions/api/elegibilidad.js).
 *
 *   node prueba-elegibilidad.mjs
 *
 * Lo que estas pruebas cuidan, en orden de importancia:
 *
 *   1. Que NO se le pueda vender a quien no tiene nada que el kit cierre. Es el caso que la
 *      regla vieja (`pendientes > 0`, en el navegador) no veía, y el que haría que alguien
 *      pague por instalar un gestor de consentimiento en un sitio que no carga ni un rastreador.
 *
 *   2. Que no se cotice a ciegas un sitio que no se pudo medir. Bloqueado y parcial son dos
 *      formas de saber menos de lo que parece, y las dos terminan igual.
 *
 *   3. Que la compuerta viva en el servidor. Una regla que solo corre en el navegador no es una
 *      regla: es una sugerencia.
 *
 * Los casos de tuane.cl y unab.cl son MEDICIONES REALES del 23-oct-2026, no inventadas.
 */

import { rutaEnElRepo } from './rutas.mjs';

const RUTA = rutaEnElRepo('verificaycumple/functions/api/elegibilidad.js', 'ELEGIBILIDAD_JS');
const m = await import(RUTA);

let ok = 0, malo = 0;
const eq = (n, r, e) => {
  if (JSON.stringify(r) === JSON.stringify(e)) ok++;
  else { malo++; console.log(`  FALLA ${n}: esperado ${JSON.stringify(e)}, real ${JSON.stringify(r)}`); }
};
const cierto = (n, v) => eq(n, Boolean(v), true);
const falso = (n, v) => eq(n, Boolean(v), false);

const item = (id, titulo, estado, peso) => ({ id, titulo, estado, peso, ok: estado === 'ok' });

/* ================================================================== */
console.log('=== 1. sin ningún informe no se cotiza, y no es culpa del sitio ===');
{
  const r = m.elegibilidad({});
  falso('no puede comprar', r.puede);
  eq('el motivo lo dice', r.motivo, m.MOTIVOS.SIN_INFORME);
  cierto('y el texto no culpa al sitio', /todavía no/i.test(r.detalle));
  falso('no inventa señales', r.cierra.length || r.noCierra.length);
}

/* ================================================================== */
console.log('=== 2. un sitio que no se pudo medir no se cotiza a ciegas ===');
{
  // Las tres formas de no haber medido. Son distintas entre sí y las tres bloquean igual.
  const limpios = [item('carga', 'Rastreadores que parten solos', 'pendiente', 3)];

  const bloqueado = m.elegibilidad({ profundo: { bloqueado: 'portero', puntaje: null, items: limpios } });
  falso('bloqueado: no se cotiza', bloqueado.puede);
  eq('bloqueado: el motivo', bloqueado.motivo, m.MOTIVOS.NO_SE_PUDO_MEDIR);

  const parcial = m.elegibilidad({ profundo: { parcial: true, puntaje: 70, items: limpios } });
  falso('parcial: no se cotiza', parcial.puede);
  eq('parcial: el motivo', parcial.motivo, m.MOTIVOS.NO_SE_PUDO_MEDIR);

  const sinPuntaje = m.elegibilidad({ profundo: { puntaje: null, items: limpios } });
  falso('sin puntaje: no se cotiza', sinPuntaje.puede);

  // CADA GUARDIA, SOLO. Los tres casos de arriba traían `puntaje: null` además de su propia
  // señal, así que se tapaban entre ellos: al quitar la guarda de `bloqueado` la prueba seguía
  // verde porque la salvaba la del puntaje. Una prueba que pasa por el motivo equivocado no
  // está probando lo que dice. Hoy en la práctica un sitio bloqueado sale con puntaje null,
  // pero eso es una consecuencia del chequeo, no una garantía de esta compuerta.
  const soloBloqueado = m.elegibilidad({ profundo: { bloqueado: 'portero', puntaje: 60, items: limpios } });
  falso('bloqueado SOLO, con puntaje y todo: no se cotiza', soloBloqueado.puede);
  eq('bloqueado solo: el motivo', soloBloqueado.motivo, m.MOTIVOS.NO_SE_PUDO_MEDIR);

  const soloParcial = m.elegibilidad({ profundo: { parcial: true, puntaje: 85, items: limpios } });
  falso('parcial SOLO, con puntaje y todo: no se cotiza', soloParcial.puede);

  cierto('el texto dice que no vimos, no que esté bien',
    /no vimos/i.test(bloqueado.detalle) && /ni a favor ni en contra|no es un resultado a favor/i.test(bloqueado.detalle));
}

/* ================================================================== */
console.log('=== 3. si UNO de los dos informes no se pudo medir, tampoco ===');
{
  // No se compensa con el otro. El que falta es justo el que no sabemos.
  const r = m.elegibilidad({
    rapido: { puntaje: 43, items: [item('cmp', 'Permiso antes de cargar rastreadores', 'pendiente', 6)] },
    profundo: { bloqueado: 'bloqueo', puntaje: null, items: [] },
  });
  falso('no se cotiza aunque el rápido sí tenga un pendiente del kit', r.puede);
  eq('el motivo es que no se midió', r.motivo, m.MOTIVOS.NO_SE_PUDO_MEDIR);
  cierto('y dice cuál de los dos faltó', /navegador/i.test(r.detalle));
}

/* ================================================================== */
console.log('=== 4. sin pendientes no se vende nada ===');
{
  const r = m.elegibilidad({
    rapido: { puntaje: 100, items: [item('politica', 'Enlace a tu política de privacidad', 'ok', 8)] },
    profundo: { puntaje: 100, items: [item('carga', 'Rastreadores que parten solos', 'ok', 3)] },
  });
  falso('no puede comprar', r.puede);
  eq('el motivo', r.motivo, m.MOTIVOS.NADA_PENDIENTE);
  cierto('y lo dice sin sonar a rechazo', /no hay nada que el kit tenga que arreglar/i.test(r.detalle));
}

/* ================================================================== */
console.log('=== 5. EL CASO NUEVO: hay pendientes, pero ninguno lo cierra el kit ===');
{
  // tuane.cl, medido de verdad el 23-oct-2026.
  //   rápido 43: política PENDIENTE, https ok, cmp sin-confirmar
  //   profundo 100: carga ok, cookies ok, envio ok, aviso no-aplica
  // Un pendiente, y es el único que el kit no cierra. Con la regla vieja (`pendientes > 0`)
  // este sitio veía «Quiero el kit».
  const tuane = {
    rapido: {
      puntaje: 43,
      items: [
        item('politica', 'Enlace a tu política de privacidad', 'pendiente', 8),
        item('https', 'Conexión cifrada (HTTPS)', 'ok', 6),
        item('cmp', 'Permiso antes de cargar rastreadores', 'sin-confirmar', 6),
      ],
    },
    profundo: {
      puntaje: 100,
      items: [
        item('carga', 'Rastreadores que parten solos', 'ok', 3),
        item('cookies', 'Cookies escritas sin permiso', 'ok', 3),
        item('envio', 'Datos que ya salieron de tu sitio', 'ok', 4),
        item('aviso', 'Si aparece un aviso al entrar', 'no-aplica', 3),
      ],
    },
  };
  const r = m.elegibilidad(tuane);
  cierto('la regla vieja habría dicho que sí', [...tuane.rapido.items, ...tuane.profundo.items]
    .filter((i) => i.estado === 'pendiente').length > 0);
  falso('la compuerta dice que NO', r.puede);
  eq('el motivo lo nombra', r.motivo, m.MOTIVOS.NADA_QUE_EL_KIT_CIERRE);
  eq('no cierra ninguna', r.cierra.length, 0);
  eq('y nombra la que queda fuera', r.noCierra.map((i) => i.id), ['politica']);
  cierto('el texto explica de quién es esa señal', /abogado/i.test(r.detalle));
  cierto('y la nombra con las mismas palabras del chequeo',
    /Enlace a tu política de privacidad/.test(r.detalle));
}

/* ================================================================== */
console.log('=== 6. el caso que SÍ se vende ===');
{
  // unab.cl, medido de verdad el 23-oct-2026: profundo 0, los cuatro ítems pendientes.
  const r = m.elegibilidad({
    rapido: {
      puntaje: 30,
      items: [
        item('politica', 'Enlace a tu política de privacidad', 'pendiente', 8),
        item('https', 'Conexión cifrada (HTTPS)', 'ok', 6),
        item('cmp', 'Permiso antes de cargar rastreadores', 'pendiente', 6),
      ],
    },
    profundo: {
      puntaje: 0,
      items: [
        item('carga', 'Rastreadores que parten solos', 'pendiente', 3),
        item('cookies', 'Cookies escritas sin permiso', 'pendiente', 3),
        item('envio', 'Datos que ya salieron de tu sitio', 'pendiente', 4),
        item('aviso', 'Si aparece un aviso al entrar', 'pendiente', 3),
      ],
    },
  });
  cierto('puede comprar', r.puede);
  eq('el motivo', r.motivo, m.MOTIVOS.PUEDE);
  eq('cierra las cinco del gestor', r.cierra.map((i) => i.id).sort(), ['aviso', 'carga', 'cmp', 'cookies', 'envio']);
  eq('y deja fuera la política', r.noCierra.map((i) => i.id), ['politica']);
  cierto('el texto avisa que algo queda fuera', /fuera del kit/i.test(r.detalle));
}

/* ================================================================== */
console.log('=== 7. el kit cierra TODO lo pendiente: no promete de más ni de menos ===');
{
  const r = m.elegibilidad({
    profundo: {
      puntaje: 0,
      items: [
        item('carga', 'Rastreadores que parten solos', 'pendiente', 3),
        item('cookies', 'Cookies escritas sin permiso', 'pendiente', 3),
      ],
    },
  });
  cierto('puede comprar', r.puede);
  eq('cierra las dos', r.cierra.length, 2);
  eq('no queda nada fuera', r.noCierra.length, 0);
  falso('y entonces NO dice que algo queda fuera', /fuera del kit/i.test(r.detalle));
}

/* ================================================================== */
console.log('=== 8. las dos señales que el kit no cierra están declaradas, no adivinadas ===');
{
  // Si alguien agrega una señal al chequeo y olvida decidir si el kit la cierra, cae del lado
  // de "no la cierra", que es el lado seguro: no se promete.
  falso('politica no la cierra el kit', m.CIERRA_EL_KIT.has('politica'));
  falso('https no la cierra el kit', m.CIERRA_EL_KIT.has('https'));
  eq('y las cinco que sí', [...m.CIERRA_EL_KIT].sort(), ['aviso', 'carga', 'cmp', 'cookies', 'envio']);
  cierto('cada una de las que no cierra tiene dicho de quién es',
    Object.keys(m.NO_LO_CIERRA_EL_KIT).every((k) => typeof m.NO_LO_CIERRA_EL_KIT[k] === 'string'));

  const nueva = m.elegibilidad({
    profundo: { puntaje: 50, items: [item('señal-nueva', 'Algo que nadie clasificó', 'pendiente', 3)] },
  });
  falso('una señal sin clasificar no se vende', nueva.puede);
  eq('cae del lado seguro', nueva.motivo, m.MOTIVOS.NADA_QUE_EL_KIT_CIERRE);
}

/* ================================================================== */
console.log('=== 9. la forma de la respuesta es siempre la misma ===');
{
  const casos = [
    {},
    { profundo: { bloqueado: 'portero', puntaje: null, items: [] } },
    { profundo: { puntaje: 100, items: [item('carga', 'x', 'ok', 3)] } },
    { profundo: { puntaje: 0, items: [item('carga', 'x', 'pendiente', 3)] } },
  ];
  for (const c of casos) {
    const r = m.elegibilidad(c);
    cierto('trae puede', typeof r.puede === 'boolean');
    cierto('trae motivo', typeof r.motivo === 'string' && r.motivo.length > 0);
    cierto('trae cierra como lista', Array.isArray(r.cierra));
    cierto('trae noCierra como lista', Array.isArray(r.noCierra));
    cierto('trae detalle con texto', typeof r.detalle === 'string' && r.detalle.length > 10);
  }
  cierto('y cuando puede, cierra nunca viene vacío',
    m.elegibilidad(casos[3]).cierra.length > 0);
}

/* ================================================================== */
console.log('=== lo que el kit ARREGLA pero no justifica vender (27-oct) ===');
{
  const inf = (...items) => ({ ok: true, puntaje: 50, items });

  // La casilla entra en el trabajo, pero NO en lo que justifica cobrar $177.310. Son dos
  // preguntas distintas y estaban mezcladas en una sola lista.
  cierto('la casilla esta en TAMBIEN_ARREGLA', m.TAMBIEN_ARREGLA.has('casilla'));
  falso('y NO en lo que justifica la venta', m.CIERRA_EL_KIT.has('casilla'));
  falso('el https no esta en ninguno de los dos',
    m.CIERRA_EL_KIT.has('https') || m.TAMBIEN_ARREGLA.has('https'));

  // UN SITIO AL QUE SOLO LE FALTA LA CASILLA NO COMPRA. Si `casilla` hubiera ido a
  // CIERRA_EL_KIT, este sitio veria el boton y pagaria 177.310 por arreglar un checkbox.
  const solaCasilla = m.elegibilidad({ rapido: inf(item('casilla', 'Casilla del formulario', 'pendiente', 1)) });
  falso('solo la casilla no habilita la compra', solaCasilla.puede);
  eq('y el motivo lo dice', solaCasilla.motivo, m.MOTIVOS.NADA_QUE_EL_KIT_CIERRE);
  cierto('con un texto que explica que igual se arregla',
    /lo arreglamos igual/.test(solaCasilla.detalle));

  // PERO SI HAY ALGO QUE SI JUSTIFICA, LA CASILLA VIAJA EN EL TRABAJO.
  const conAmbas = m.elegibilidad({ rapido: inf(
    item('cmp', 'Gestor de consentimiento', 'pendiente', 3),
    item('casilla', 'Casilla del formulario', 'pendiente', 1),
    item('https', 'Conexion segura', 'pendiente', 1),
  ) });
  cierto('con el gestor pendiente si se puede comprar', conAmbas.puede);
  eq('lo que justifica la venta es el gestor', conAmbas.cierra.map((i) => i.id), ['cmp']);
  eq('la casilla va en el trabajo', (conAmbas.tambien || []).map((i) => i.id), ['casilla']);
  eq('y el https queda fuera, declarado', conAmbas.noCierra.map((i) => i.id), ['https']);
}

console.log(`\n${ok} bien, ${malo} mal`);
process.exit(malo ? 1 : 0);
