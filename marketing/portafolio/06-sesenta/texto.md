# 06 · Sesenta · texto de interfaz (Clara)

Escrito antes de construir, para la home y la interior «¿Qué artículo dice tu carta?». Registro: **tú** en toda la
página; plural de marca solo para lo que el estudio hace («te respondemos»); castellano de Chile. Cada afirmación
legal sale de la tabla 4 de `ficha.md`; lo que no está ahí, no se dice. Revisión humana antes de mostrarse: Ramón.

Lo que manda sobre el tono: quien lee esto fue despedido hace días y está asustado. El rubro le habla a gritos
(«¿te despidieron? llama ya», «juicio ganado»). Aquí se le habla como a un adulto con un plazo: el dato primero,
el miedo después, y nunca una promesa.

---

## 0 · Lo que no cambia en ninguna pantalla

| Slot | Texto | Trabajo |
|---|---|---|
| Sello fijo (franja superior, las dos páginas) | CONCEPTO DE SPINDLELAB · SESENTA NO EXISTE | Que una captura de cualquier pantalla diga lo que es |
| Marca | SESENTA | |
| Navegación (1440) | El plazo · Tu carta · El finiquito · Qué traer | Las cuatro cosas que la persona viene a hacer |
| CTA del encabezado | Escribirnos | Lleva al formulario |
| Pie | Sesenta · derecho laboral, del lado del trabajador. Santiago centro, dirección ficticia. | |
| Pie, aviso | Concepto de SpindleLab, 2026. Sesenta no existe y sus abogados tampoco. Nada de esta página es asesoría legal: si te despidieron, lleva tu carta a un abogado o a la Inspección del Trabajo. | La ficción completa y el límite del rubro |
| Pie, fuentes | Código del Trabajo (Biblioteca del Congreso, texto vigente al 23-jul-2026) y Dirección del Trabajo, consultados el 16-oct-2026. | De dónde salen los números |

## 1 · Home

La suma del escrito titula las secciones: cada una lleva su rótulo («Primer otrosí», «Segundo otrosí») encima del
título en palabras de la persona. Así se lee como un escrito sin que la persona tenga que saber qué es un otrosí.

### 1.1 · En lo principal (primera pantalla)

- Rótulo: EN LO PRINCIPAL
- **H1:** Tienes 60 días hábiles para demandar desde que te despidieron.
- Bajada: Se cuentan de lunes a sábado, sin domingos ni feriados. Esto es lo que conviene hacer hoy.
- Qué hacer hoy:
  1. **Guarda la carta y el sobre.** La causal y la fecha que dice la carta son las que se discuten después.
  2. **Anota el día en que dejaste de trabajar.** El plazo corre desde el día siguiente.
  3. **No firmes el finiquito sin leerlo.** Si lo firmas, puedes escribir que te reservas el derecho a demandar.
- CTA: Contar cuántos días te quedan → `#plazo`
- Enlace: Ver qué dice tu carta → `#carta`

**La suma** (papel, Courier: el índice de la página escrito como la suma de un escrito):

> EN LO PRINCIPAL: qué hacer hoy. PRIMER OTROSÍ: cuántos días te quedan. SEGUNDO OTROSÍ: qué dice tu carta. TERCER
> OTROSÍ: antes de firmar el finiquito. CUARTO OTROSÍ: qué traer a la primera reunión. QUINTO OTROSÍ: cómo se cobra.
> SEXTO OTROSÍ: preguntas. SÉPTIMO OTROSÍ: escribirnos.

Pie de la suma: «Así empieza un escrito: lo principal y, después, cada otrosí.»

**Descartes del H1:**
1. «Te despidieron. ¿Y ahora qué?» Pregunta retórica y no da ningún dato. Fuera.
2. «Defendemos tus derechos laborales.» Sirve para cualquier estudio del país y no dice nada que la persona no
   suponga. No pasa el test de intercambio.
3. **Elegido:** «Tienes 60 días hábiles para demandar desde que te despidieron.» Es el dato que la persona necesita
   el primer día, es de ley (art. 168) y explica el nombre del estudio sin decirlo.

### 1.2 · Primer otrosí: cuántos días te quedan (`#plazo`)

- Rótulo: PRIMER OTROSÍ
- **H2:** Cuántos días te quedan
- Bajada: Pon el día en que dejaste de trabajar y el 60 baja hasta los días hábiles que te quedan.
- Campo: **Día en que dejaste de trabajar**
- Ayuda del campo: Es el día de la separación. Si la carta llegó después, igual se cuenta desde ese día.
- Botón: Contar
- Bajo el número: días hábiles te quedan / día hábil te queda
- Resultado: Tu día 60 es el {fecha}. · Si reclamas en la Inspección del Trabajo, el plazo se suspende mientras dura
  el reclamo, pero nunca pasa del día 90: el {fecha}.
- Línea de tiempo (rótulos): Dejaste de trabajar · Hoy · Día 60 · Día 90, con reclamo
- **Estado vacío:** Todavía no pones una fecha. El 60 es el plazo completo.
- **Error, fecha futura:** Esa fecha todavía no llega. Pon el día en que dejaste de trabajar.
- **Error, fecha anterior a 2026:** Este contador trae los feriados de 2026 y 2027. Para una fecha anterior,
  pregúntale a un abogado.
- **Pasó el 60, no el 90:** Según esta cuenta, tu día 60 fue el {fecha}. Si reclamaste en la Inspección del Trabajo
  antes, el plazo quedó suspendido mientras duró el reclamo; el tope es el día 90: el {fecha}.
- **Pasó el 90:** Según esta cuenta, ya pasaron más de 90 días hábiles. Puede haber otras acciones con otro plazo,
  como la nulidad por cotizaciones impagas, que tiene seis meses. Pregúntale a un abogado.
- Cómo cuenta: De lunes a sábado; no cuentan domingos ni feriados nacionales (Dirección del Trabajo). Empieza el día
  siguiente al de la separación, porque los plazos son de días completos (Código Civil, art. 48). Código del Trabajo,
  art. 168.
- Aviso: Es una cuenta referencial. No conoce los feriados regionales ni tu caso, y no reemplaza que un abogado lea tu
  carta.

### 1.3 · Segundo otrosí: qué dice tu carta (`#carta`)

- Rótulo: SEGUNDO OTROSÍ
- **H2:** Qué artículo dice tu carta
- Bajada: Busca el número que cita tu carta de despido. De ese artículo depende qué se discute, quién prueba qué y qué
  te corresponde.
- Selector: Mi carta dice · Art. 159 · Art. 160 · Art. 161 · No dice ninguno
- La carta de ejemplo (papel, Courier, los datos tachados): «Carta de ejemplo. Los datos están tachados.»

| Opción | Título | Qué suele significar | De qué depende |
|---|---|---|---|
| 159 | Se terminó el plazo o la obra | Una causa que la ley trata como objetiva: venció el plazo fijo, terminó la obra o faena, o hubo caso fortuito. No te acusa de nada. | De si el contrato era de verdad a plazo: si seguiste trabajando después del vencimiento o te lo renovaron por segunda vez, pasó a ser indefinido. Si el juez no da por acreditada la causal, el despido se entiende hecho por el 161. |
| 160 | Te acusan de algo | Una conducta grave: falta de probidad, inasistencias, abandono, incumplimiento grave del contrato, entre otras. Es la causal que termina el contrato sin indemnización. | De los hechos. La carta tiene que describirlos, y en el juicio el empleador prueba primero y no puede cambiarlos por otros. Mira si tu carta dice qué, cuándo y dónde, o solo copia el nombre de la causal. |
| 161 | Necesidades de la empresa | Razones de la empresa, no algo que hiciste. La carta debe decir el monto total que te van a pagar. Si trabajaste un año o más, hay indemnización por años de servicio; si no te avisaron con 30 días, además, la del aviso previo. | De si las razones de la carta son concretas y ciertas. Y no se puede usar contra quien está con licencia médica. Ojo: la carta es una oferta de pago; si no estás de acuerdo con la causal, no la aceptes al firmar sin escribir tu reserva. |
| Ninguno | No cita ningún artículo | La ley exige la carta por escrito, con la causal y los hechos. Un despido sin causal legal también se puede llevar al juzgado. | Anota cómo te lo comunicaron, quién y cuándo, y guarda cualquier mensaje o correo. |

- Fuente bajo cada opción: «Código del Trabajo, arts. 159 y 168» · «arts. 160, 162 y 454» · «arts. 161, 162, 163 y
  169» · «arts. 162 y 168».
- Enlace bajo cada opción: Leer el 159 completo (o 160, 161) → `que-dice-tu-carta/#art-159`; en «Ninguno», Leer
  qué pasa sin causal → `que-dice-tu-carta/#ninguno`.
- **La nulidad**, debajo del lector: Además del artículo, mira el párrafo de las cotizaciones. Si no estaban pagadas al
  despedirte, el despido no termina el contrato hasta que el empleador las pague. Eso es la nulidad del despido. →
  Leer sobre la nulidad (`que-dice-tu-carta/#nulidad`)
- Aviso: Esto es lo que suele significar, no lo que significa en tu caso. Eso lo dice quien lea tu carta completa.

### 1.4 · Tercer otrosí: antes de firmar el finiquito (`#finiquito`)

- Rótulo: TERCER OTROSÍ
- **H2:** Antes de firmar el finiquito
- Bajada: El finiquito es el papel que cierra la relación laboral y dice qué se pagó. Lo que firmas ahí cuenta: léelo
  con calma.
- El finiquito de ejemplo (papel, Courier, los datos tachados) con cinco notas al margen, en el orden del papel:
  1. **La causal.** Que sea la misma de tu carta.
  2. **Cada monto.** Si no estás de acuerdo con uno, igual te tienen que pagar lo que no se discute.
  3. **Las cotizaciones.** Antes de que firmes, el ministro de fe debe pedir que acrediten que están pagadas.
  4. **La reserva.** Aquí puedes escribir que te reservas el derecho a demandar. Antes de firmar, no después.
  5. **Dónde se firma.** Ante un ministro de fe: inspector del trabajo, notario, oficial del Registro Civil o
     secretario municipal. También en el sitio de la Dirección del Trabajo, y eso es voluntario.
- Al pie: El empleador tiene 10 días hábiles desde la separación para tener el finiquito listo y el pago a tu
  disposición. Si ya firmaste y crees que hubo error, presión o engaño, también se puede reclamar, dentro del mismo
  plazo de 60 días. Código del Trabajo, art. 177.

### 1.5 · Cuarto otrosí: qué traer a la primera reunión (`#traer`)

- Rótulo: CUARTO OTROSÍ
- **H2:** Qué traer a la primera reunión
- Bajada: Con estos papeles tu caso se puede leer en una sola conversación. Si te falta alguno, ven igual.
- La hoja (papel, Courier, imprimible), título: PRIMERA REUNIÓN · QUÉ TRAER
  - La carta de despido y el sobre, si llegó por correo.
  - El finiquito, firmado o no, si te lo dieron.
  - Tu contrato de trabajo y sus anexos.
  - Tus últimas liquidaciones de sueldo.
  - El certificado de cotizaciones de tu AFP.
  - El comprobante del reclamo en la Inspección del Trabajo, si lo hiciste.
  - Correos o mensajes que tengan que ver con el despido.
  - Al pie de la hoja: Día en que dejé de trabajar: ______ · Sesenta. Concepto de SpindleLab: este estudio no existe.
- Botón: Imprimir esta hoja

### 1.6 · Quinto otrosí: cómo se cobra (`#cobro`)

- Rótulo: QUINTO OTROSÍ
- **H2:** Cómo se cobra
- La primera conversación no se cobra.
- Si hay juicio, antes de presentar nada firmamos un contrato de honorarios. Ahí queda escrito qué parte de lo que se
  obtenga corresponde al estudio, y no hay otro honorario.
- Si no se obtiene nada, no pagas honorarios.
- Los gastos del juicio, como el receptor que notifica la demanda, te los decimos antes de hacerlos.
- Si tu sueldo está bajo cierto tope, las Oficinas de Defensa Laboral de la Corporación de Asistencia Judicial te
  pueden representar gratis. Si es tu caso, te lo decimos en la primera conversación.

### 1.7 · Sexto otrosí: preguntas (`#preguntas`)

En texto, con encabezados, sin acordeón. Cada respuesta termina con su artículo.

1. **¿Cuánto plazo tengo para demandar por despido injustificado?** 60 días hábiles contados desde la separación, es
   decir, desde el día en que dejaste de trabajar. Se cuentan de lunes a sábado y no cuentan domingos ni feriados.
   Código del Trabajo, art. 168.
2. **¿Reclamar en la Inspección del Trabajo me da más plazo?** Lo suspende mientras dura el reclamo, y sigue corriendo
   cuando termina. Con todo, no puedes ir al juzgado después de 90 días hábiles desde la separación. Art. 168.
3. **¿Puedo firmar el finiquito y demandar igual?** Sí, si al firmar escribes que te reservas el derecho a demandar.
   La reserva no impide que te paguen lo que no se discute. Art. 177.
4. **¿Qué pasa si mi empleador no pagaba mis cotizaciones?** Si no estaban pagadas al despedirte, el despido no
   termina el contrato hasta que el empleador las pague y te avise por carta certificada, y te debe las
   remuneraciones de ese tiempo. Es la nulidad del despido, y su plazo es de seis meses. Arts. 162 y 510.
5. **¿Me pueden despedir por necesidades de la empresa estando con licencia médica?** No. Esa causal no se puede usar
   contra quien está con licencia por enfermedad común, accidente del trabajo o enfermedad profesional. Art. 161.
6. **¿Y si me voy yo porque el empleador no cumple?** Es el autodespido: si el empleador incurre en ciertas causales,
   como un incumplimiento grave del contrato o el acoso, puedes poner término al contrato y demandar dentro de 60 días
   hábiles. Art. 171.

### 1.8 · Séptimo otrosí: escribirnos (`#contacto`)

- Rótulo: SÉPTIMO OTROSÍ
- **H2:** Escríbenos
- Bajada: Cuéntanos qué pasó con tus palabras. Te responde una de las dos personas de aquí abajo.
- Campos: **Tu nombre** · **Cómo te respondemos** (ayuda: Un correo o un teléfono) · **Día en que dejaste de
  trabajar** (opcional) · **Qué artículo dice tu carta** (159 · 160 · 161 · No dice ninguno · No sé) · **Qué pasó**
  (opcional)
- Botón: Enviar
- Junto al botón: Lo que escribas lo lee solo quien te va a responder.
- Error, nombre: Escribe cómo te llamas.
- Error, contacto: Escribe un correo o un teléfono para poder responderte.
- Confirmación: Esto es un concepto de SpindleLab: el formulario no envía nada y Sesenta no existe. Si te despidieron,
  lleva tu carta a un abogado o a la Inspección del Trabajo.
- **Quiénes responderían:**
  - Rocío Velarde Quintral · Despido injustificado y autodespido
  - Fermín Achondo Lizana · Nulidad del despido y tutela
  - Nota: Son personajes de este concepto. No ejercen, no tienen registro ni causas, y sus nombres no son los de
    ningún abogado habilitado (buscador del Poder Judicial, 16-oct-2026).
- Dirección: Santiago centro. Dirección ficticia.

## 2 · Interior: «¿Qué artículo dice tu carta?» (`que-dice-tu-carta/`)

- Miga: Sesenta / Qué dice tu carta
- **H1:** ¿Qué artículo dice tu carta?
- Bajada: La carta de despido tiene que decir por escrito la causal y los hechos. El artículo que cita decide qué se
  discute y quién prueba qué. Aquí están los tres que puede citar, y la nulidad, que no depende del artículo.
- Suma (índice lateral): EN LO PRINCIPAL: el 159. PRIMER OTROSÍ: el 160. SEGUNDO OTROSÍ: el 161. TERCER OTROSÍ: la
  nulidad. CUARTO OTROSÍ: si no cita ninguno.

Cada sección: el número grande, «Cómo aparece en tu carta» (papel), y cuatro bloques: **Qué dice la ley** ·
**Qué suele significar** · **De qué depende** · **Plazo**. Cierra con la fuente.

### 2.1 · El 159 (`#art-159`)
- Cómo aparece: «…por la causal del artículo 159 número 4 del Código del Trabajo, esto es, vencimiento del plazo
  convenido en el contrato.»
- Qué dice la ley: El contrato termina por mutuo acuerdo, renuncia, muerte, vencimiento del plazo, conclusión del
  trabajo o servicio, o caso fortuito o fuerza mayor. En una carta de despido, los que puede invocar el empleador son
  el 4, el 5 y el 6; los otros dependen de ti o de un acuerdo.
- Qué suele significar: Una causa que la ley trata como objetiva: no te acusa de nada. La indemnización por años de
  servicio de la ley es para el 161; con el 159 hay una solo para el contrato por obra o faena.
- De qué depende: El plazo fijo pasa a indefinido si seguiste trabajando después del vencimiento con conocimiento del
  empleador, o con la segunda renovación. Si el juez no da por acreditada la causal, el despido se entiende hecho por
  el 161.
- Plazo: 60 días hábiles desde la separación.
- Fuente: Código del Trabajo, arts. 159, 163 y 168.

### 2.2 · El 160 (`#art-160`)
- Cómo aparece: «…por la causal del artículo 160 número 7 del Código del Trabajo, esto es, incumplimiento grave de las
  obligaciones que impone el contrato, fundada en los siguientes hechos: ███.»
- Qué dice la ley: Termina el contrato sin indemnización por conductas graves debidamente comprobadas (falta de
  probidad, acoso sexual, vías de hecho, injurias, conducta inmoral, acoso laboral), negociaciones prohibidas por
  escrito, inasistencias, abandono, actos temerarios, perjuicio material intencional o incumplimiento grave del
  contrato.
- Qué suele significar: Que te acusan de algo, y que por eso no hay indemnización.
- De qué depende: De los hechos. La carta tiene que describirlos, y en el juicio el empleador prueba primero y no puede
  alegar hechos distintos de los de la carta. Mira si tu carta dice qué, cuándo y dónde, o solo copia el nombre de la
  causal.
- Plazo: 60 días hábiles desde la separación.
- Fuente: Código del Trabajo, arts. 160, 162, 168 y 454.

### 2.3 · El 161 (`#art-161`)
- Cómo aparece: «…por la causal del artículo 161 inciso primero del Código del Trabajo, esto es, necesidades de la
  empresa, fundada en los siguientes hechos: ███.»
- Qué dice la ley: El empleador puede terminar el contrato por necesidades de la empresa: racionalización o
  modernización, bajas en la productividad, cambios en el mercado o en la economía. A gerentes y apoderados con
  facultades generales de administración, y a trabajadoras de casa particular, también por desahucio escrito.
- Qué suele significar: Razones de la empresa, no algo que hiciste. Si trabajaste un año o más, hay indemnización por
  años de servicio; si no te avisaron con 30 días, además, la del aviso previo. La carta debe decir el monto total, y
  es una oferta de pago que no se puede retirar.
- De qué depende: De si las razones son concretas y ciertas. No se puede usar contra quien está con licencia médica.
  Si no estás de acuerdo con la causal, no la aceptes al firmar el finiquito sin escribir tu reserva.
- Plazo: 60 días hábiles desde la separación.
- Fuente: Código del Trabajo, arts. 161, 162, 163, 168 y 169.

### 2.4 · La nulidad (`#nulidad`)
- Cómo aparece: «Sus cotizaciones previsionales se encuentran pagadas hasta el último día del mes anterior, según los
  comprobantes que se adjuntan.»
- Qué dice la ley: Para despedir, el empleador tiene que informarte por escrito el estado de pago de tus cotizaciones
  hasta el último día del mes anterior, con los comprobantes. Si no estaban pagadas, el despido no pone término al
  contrato.
- Qué suele significar: No es otra causal: es un problema del despido mismo. El contrato sigue hasta que el empleador
  pague las cotizaciones y te avise por carta certificada, y te debe las remuneraciones de ese tiempo.
- De qué depende: De lo que diga el certificado de cotizaciones de tu AFP, no de lo que diga la carta.
- Plazo: Seis meses desde que dejaste de trabajar.
- Fuente: Código del Trabajo, arts. 162 y 510.

### 2.5 · Si no cita ninguno (`#ninguno`)
- Qué dice la ley: La carta va por escrito, con la causal y los hechos, entregada en persona o por carta certificada,
  con copia a la Inspección del Trabajo. Un despido sin causal legal también se puede llevar al juzgado.
- Qué hacer: Anota cómo te lo comunicaron, quién y cuándo, y guarda cualquier mensaje o correo.
- Plazo: 60 días hábiles desde la separación.
- Fuente: Código del Trabajo, arts. 162 y 168.

**Cierre:** Contar cuántos días te quedan → `../#plazo` · Escribirnos → `../#contacto`

## 3 · Metadatos

| Página | `<title>` | Descripción |
|---|---|---|
| Home | Sesenta · Despido: 60 días hábiles para demandar (concepto) | Concepto de SpindleLab: un estudio laboral que no existe. Cuántos días hábiles te quedan para demandar, qué dice tu carta y qué revisar antes del finiquito. |
| Interior | Qué artículo dice tu carta de despido · Sesenta (concepto) | Concepto de SpindleLab. Los artículos 159, 160 y 161 del Código del Trabajo y la nulidad del despido: qué suelen significar y de qué depende. |

## 4 · Lo que borré

- «Estamos contigo», «no estás solo», «luchamos por ti»: consuelo sin dato. La sección que consuela es el contador.
- Un párrafo sobre «años de experiencia» del estudio: el estudio no existe y la experiencia sería inventada.
- Los porcentajes de los recargos del art. 168: son ley, pero en una página de abogados se leen como promesa de monto.
- «Gratis» en la primera conversación como gancho de titular: queda dicho una vez, en el cobro, donde corresponde.
- Una cuarta nota del finiquito sobre el «poder liberatorio»: es doctrina de tribunales, no texto de la ley que
  tenemos en la ficha.

## 5 · Afirmaciones por verificar antes de publicar (todas con fuente en `ficha.md` §4)

60 días hábiles (168) · lunes a sábado (DT) · día siguiente (CC 48) · suspensión y tope de 90 (168) · 3 días hábiles
de la carta (162) · 30 días de aviso (162) · 10 días hábiles del finiquito (177) · reserva y pago de lo no disputado
(177) · error, fuerza o dolo (177) · licencia médica (161) · prueba primero el empleador (454) · nulidad y
convalidación (162) · seis meses (510) · autodespido (171) · Oficinas de Defensa Laboral (ChileAtiende).
