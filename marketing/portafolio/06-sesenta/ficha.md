# 06 · Sesenta · ficha

**Pieza de concepto del portafolio E12** · Bruno (dirección creativa y construcción), con el texto de Clara
(`texto.md`) y los hechos verificados con el método de Simón (esta ficha). 16 y 17-oct-2026, rama
`claude/magical-franklin-ckfki2`. Manda `../plan-e12.md` §9; reglas en `../README.md`.

**Sesenta no existe.** Es un estudio de derecho laboral inventado, en Santiago centro, que representaría a
trabajadores, con dos abogados inventados. Nada de lo que dice su sitio ocurrió, no llevó ninguna causa, y nada de
lo que dice es asesoría legal.

---

## 1 · Quién sería

Un estudio que representa a trabajadores, nunca a empresas: despido injustificado, autodespido, nulidad del despido
por cotizaciones impagas y tutela de derechos fundamentales. Lo busca, desde el celular, alguien a quien despidieron
esta semana, con dos cosas en la mano: una fecha y una carta. Pregunta cuánto plazo le queda y qué significa el
artículo que cita su carta.

## 2 · El nombre

| Comprobación | Resultado | Cuándo |
|---|---|---|
| `sesenta.cl` en NIC Chile | Libre | 16-oct-2026, 20:45:46 CLST (`../plan-e12-evidencia.json`, `elegidos`) |
| Búsqueda web: «"Sesenta" abogados laboral Chile estudio» | Ningún estudio con ese nombre | 16-oct-2026 (misma evidencia, `busqueda_web_16oct`) |

Por qué suena inventado: es el plazo, no un apellido. En Chile los estudios se llaman como sus socios, y un número
como nombre se lee como invento.

## 3 · Los dos abogados (ficticios)

| Nombre | Lo que haría | Buscador de abogados del Poder Judicial |
|---|---|---|
| **Rocío Velarde Quintral** | Despido injustificado y autodespido | «No se encontraron registros» para «Rocío Velarde Quintral», «Rocio Velarde Quintral», «Rocío Velarde» y los apellidos «Velarde Quintral» |
| **Fermín Achondo Lizana** | Nulidad del despido y tutela | «No se encontraron registros» para «Fermín Achondo Lizana», «Fermin Achondo Lizana», «Fermín Achondo» y los apellidos «Achondo Lizana» |

- **Fuente:** `pjud.cl/transparencia/busqueda-de-abogados`, «Búsqueda por Nombre», consultado el **16-oct-2026 entre
  las 23:30 y las 23:45 (Chile)** y de nuevo el 17-oct a las 00:2x. Se guardó solo el conteo de coincidencias, ningún dato de nadie
  (`_herramientas/pjud-nombres.mjs` y `pjud-nombres.json`). Control: «Juan Pérez» devuelve resultados (la primera
  página muestra 5), así que un cero significa algo.
- **Una nota de método:** el buscador rechaza las ráfagas («La URL solicitada ha sido rechazada») y una respuesta
  rechazada no es un cero. La herramienta abre una sesión nueva por consulta, espera entre una y otra y marca como
  `null` lo que no se pudo leer. La corrida guardada (17-oct, 00:2x Chile) tiene las diez consultas válidas: los dos
  controles con resultados y las ocho de los nombres ficticios con «No se encontraron registros». **Se repite** el día
  que la pieza entre al índice de `/trabajo/`, con calma.
- **Sin foto, sin cara, sin número de registro, sin rol de causa.** Donde iría el dato, el sitio dice por qué no
  está. Una búsqueda web de «"Velarde Quintral" OR "Achondo Lizana" abogado Chile» (16-oct) no devolvió a nadie con
  esos nombres.

## 4 · Hechos de norma (los únicos que el sitio afirma)

Regla del plan §4.2: ningún número ni afirmación legal que no esté en esta tabla, con su fuente y la fecha de
consulta. **Código del Trabajo:** DFL 1 de 2002, texto vigente bajado de la Biblioteca del Congreso
(`leychile.cl/Consulta/obtxml?opt=7&idNorma=207436`, versión del 23-jul-2026) el **16-oct-2026**. Los extractos
literales están en `_herramientas/fuentes-16oct.json`.

### 4.1 · El plazo (el contador)

| Hecho | Dónde se usa | Fuente |
|---|---|---|
| Quien considera injustificado, indebido o improcedente su despido por los arts. 159, 160 o 161, o sin causal, puede ir al juzgado **dentro de 60 días hábiles contados desde la separación** | El 60, el contador, la primera pantalla, las preguntas | Código del Trabajo, art. 168 inc. 1 |
| Un **reclamo ante la Inspección del Trabajo** dentro de ese plazo lo **suspende**; sigue corriendo cuando termina el trámite; **nunca más de 90 días hábiles** desde la separación | El contador (la marca del 90), las preguntas | Art. 168, inciso final |
| **El sábado cuenta.** Los 60 días hábiles se cuentan **de lunes a sábado, salvo feriados**; no cuentan domingos ni feriados | El contador | Dirección del Trabajo, «¿Qué plazo tiene un trabajador/a para demandar…?» (`dt.gob.cl/portal/1628/w3-article-60507.html`, modificada el 30-may-2024): «60 días hábiles (lunes a sábado, salvo feriados)» y «plazo que se cuenta de lunes a sábado» |
| Por qué no hay contradicción con el sábado inhábil que todos recuerdan: el art. 69 lo hace inhábil **solo para el feriado anual** (vacaciones); el art. 312 vale solo para la negociación colectiva | Nota del contador | Arts. 69 y 312 |
| Los plazos de días son de **días completos** y corren hasta la medianoche del último día: el día de la separación no se cuenta, la cuenta parte el día siguiente | El contador | Código Civil, arts. 48 y 49 (`idNorma=172986`) |
| El **autodespido** (el trabajador pone término porque el empleador incurrió en las causales 1, 5 o 7 del art. 160) tiene el mismo plazo: 60 días hábiles desde la terminación | Preguntas | Art. 171 inc. 1 |
| La **tutela** por un despido que vulnera derechos fundamentales: 60 días contados desde la separación, suspendido como el del 168 | Preguntas | Art. 489 inc. 2 |
| La acción de **nulidad del despido** por cotizaciones impagas prescribe en **seis meses** desde la suspensión de los servicios | Interior (nulidad), preguntas | Art. 510 inc. 3 |

**Feriados que descuenta el contador** (nacionales que caen de lunes a sábado; los de domingo no hacen falta):
2026: 1-ene, 3 y 4-abr, 1 y 21-may, 29-jun, 16-jul, 15-ago, 18 y 19-sep, 12 y 31-oct, 8 y 25-dic. 2027: 1-ene,
26 y 27-mar, 1 y 21-may, 21 y 28-jun, 16-jul, 17 y 18-sep, 11-oct, 1-nov, 8 y 25-dic. 2028 (solo para que una
separación de fines de 2027 alcance su día 90): 1-ene, 14 y 15-abr, 1-may. Fuente: `feriados.cl` (2026),
`feriados.cl/2027.php` y `2028.php`, con la ley de cada uno; consultado el 16-oct-2026. **Fuera:** los regionales
(Arica, 7-jun; Chillán y Chillán Viejo, 20-ago) y los que se declaren después. Por eso el contador acepta
separaciones del 1-ene-2026 al 31-dic-2027 y dice que es referencial.

### 4.2 · La carta (el lector y la interior)

| Hecho | Dónde se usa | Fuente |
|---|---|---|
| **Art. 159:** el contrato termina por mutuo acuerdo (1), renuncia (2), muerte (3), vencimiento del plazo (4), conclusión del trabajo o servicio (5), caso fortuito o fuerza mayor (6) | Lector, interior | Art. 159 |
| El plazo fijo que se sigue trabajando con conocimiento del empleador, o que se renueva por segunda vez, pasa a ser indefinido | Interior (159 n.º 4) | Art. 159 n.º 4 |
| **Art. 160:** termina «sin derecho a indemnización alguna» por conductas graves debidamente comprobadas (falta de probidad, acoso sexual, vías de hecho, injurias, conducta inmoral, acoso laboral), negociaciones prohibidas, inasistencias, abandono, actos temerarios, perjuicio material intencional, incumplimiento grave | Lector, interior | Art. 160 |
| **Art. 161:** necesidades de la empresa (racionalización o modernización, bajas en la productividad, cambios en el mercado o la economía); desahucio para quien representa al empleador con facultades generales de administración y para trabajadoras de casa particular | Lector, interior | Art. 161 incs. 1 y 2 |
| Las causales del 161 **no se pueden invocar** contra quien está con licencia por enfermedad común, accidente del trabajo o enfermedad profesional | Interior, preguntas | Art. 161, inciso final |
| La carta de un despido por el 159 n.º 4, 5 o 6 o por el 160 va **por escrito**, personalmente o por carta certificada, con **la causal y los hechos**, dentro de **3 días hábiles** desde la separación (6 en el caso fortuito); copia a la Inspección del Trabajo | Lector, interior | Art. 162 inc. 1 y 2 |
| Por el 161: aviso con **30 días** de anticipación o pago de la indemnización sustitutiva del aviso; la carta debe indicar **el monto total** a pagar | Interior (161) | Art. 162 inc. 4 |
| La carta del 161 es una **oferta irrevocable** de pago de las indemnizaciones; quien estima improcedente la causal y no la aceptó puede demandar | Interior (161) | Art. 169 letras a y b |
| Indemnización por años de servicio cuando el 161 se aplica a un contrato de un año o más | Interior (161), sin montos | Art. 163 inc. 1 |
| Si el juez no da por acreditada una causal del 159 o del 160, el término se entiende hecho por el 161 | Interior | Art. 168 inc. 4 |
| En el juicio por despido **el empleador prueba primero** los hechos de la carta y **no puede alegar hechos distintos** | Lector, interior, preguntas | Art. 454 n.º 1 |
| **Nulidad:** para despedir, el empleador debe informar por escrito el estado de pago de las cotizaciones hasta el último día del mes anterior, con comprobantes; si no estaban íntegras, el despido **no pone término al contrato**; puede convalidarlo pagándolas y avisando por carta certificada, y debe pagar las remuneraciones entre el despido y ese aviso | Interior (nulidad), preguntas | Art. 162 incs. 5 y 6 |

### 4.3 · El finiquito

| Hecho | Dónde se usa | Fuente |
|---|---|---|
| El finiquito va por escrito y, para que el empleador lo pueda invocar, **firmado ante un ministro de fe** (inspector del trabajo, notario, oficial del Registro Civil, secretario municipal) o ratificado en el sitio de la Dirección del Trabajo | Finiquito | Art. 177 incs. 1 y 2 |
| El empleador debe otorgarlo y poner el pago a disposición **dentro de 10 días hábiles** desde la separación | Finiquito | Art. 177 inc. 1 |
| Al firmar se puede hacer **reserva de derechos**; la reserva **no impide** que te paguen las sumas no disputadas | Finiquito, preguntas | Art. 177 |
| El finiquito electrónico es **siempre voluntario**; se puede pedir el presencial | Finiquito | Art. 177 |
| Quien firmó y considera que hubo **error, fuerza o dolo** puede reclamarlo dentro del plazo del 168 | Finiquito | Art. 177 |
| Antes de ratificar un finiquito, el ministro de fe debe pedir al empleador que acredite el **pago íntegro de las cotizaciones** | Finiquito | Art. 177, inciso final |

### 4.4 · Cómo se cobra (sin cifras)

| Hecho | Fuente |
|---|---|
| Las **Oficinas de Defensa Laboral** de la Corporación de Asistencia Judicial representan gratis a trabajadores bajo un tope de remuneración, con reclamo previo en la Dirección del Trabajo | ChileAtiende, ficha 325 (consultada el 16-oct-2026). El tope y el aporte final no se publican en la pieza: son cifras |
| El modelo de cobro de Sesenta (honorarios solo sobre lo que se obtenga, fijados por escrito antes de presentar nada) | **Ficción de la pieza**: es la política de un estudio que no existe, dicha sin porcentaje |

## 5 · Lo que la pieza no dice, a propósito

- **Ningún porcentaje** (los recargos del art. 168 existen y son cifras de ley, pero en una página de abogados se
  leen como promesa de monto), **ningún monto**, ninguna tasa de éxito, ningún «años de experiencia», ningún caso.
- Ningún teléfono, RUT, dirección con número, rol de causa ni registro.
- El contador y el lector dicen, en la misma pantalla, que son **referenciales** y que no reemplazan que un abogado lea
  tu carta.

## 6 · Ingredientes reales (para la fila del inventario que lleva Diego)

- HTML, CSS y JS a mano; cero dependencias y cero peticiones a terceros.
- **Schibsted Grotesk** (variable, 400 a 900) y **Courier Prime** (400, 700 e itálica), OFL, locales
  (`sitio/fuentes/`, licencias al lado y en `LICENCIAS.md`).
- JSON-LD `LegalService` + `Person` (los dos abogados, con la ficción en `disambiguatingDescription`) + `FAQPage` en la
  home; `WebPage` + `BreadcrumbList` + `FAQPage` en la interior. Sin `Review` ni `AggregateRating`; `noindex,
  nofollow`.
- Contador de días hábiles con los feriados nacionales de 2026 y 2027 escritos en el código; lector de la carta con
  los cuatro casos; hoja imprimible de la primera reunión (`@media print`).
- Recorrido de 10 s grabado con Playwright cuadro a cuadro (30 por segundo, 1440 × 810) y armado con ffmpeg en
  H.264 y VP9, con póster JPEG (`movimiento/`). «Hoy» se fija con `?hoy=AAAA-MM-DD` para que las capturas y la
  grabación cuenten siempre igual (separación 14-sep-2026, hoy 17-oct-2026: quedan 35; día 60, viernes 27-nov-2026;
  día 90, martes 5-ene-2027, comprobado aparte en Python).
- Comprobación: `_herramientas/capturar.mjs` (contraste de cada nodo de texto, desborde, `h1`, JSON-LD, sello visible,
  terceros, consola) y `_herramientas/comprobar.mjs` (360, 390, 768 y 1440; foco; movimiento reducido; letras vetadas).
  Resultado del 17-oct: cero fallas en las cuatro capturas y en las ocho combinaciones.

## Historial de correcciones

| Fecha | Corrección | Origen |
|---|---|---|
| 16-oct, 23:50 | Primera versión: hechos del Código del Trabajo, la regla del sábado (DT), feriados y nombres | Bruno, con el método de Simón |
| 17-oct, 00:30 | Ingredientes del sitio y del recorrido, con la cuenta de ejemplo verificada | Bruno |
