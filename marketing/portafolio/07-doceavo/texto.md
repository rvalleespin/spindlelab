# 07 · Doceavo · texto de interfaz (Clara)

Escrito antes de construir, para la home y la interior «Calendario». Registro: **tú** en toda la página, plural de
marca para lo que el estudio hace («te escribimos»), castellano de Chile. Cada fecha sale de `ficha.md` §4; lo que no
está ahí, no se dice. Revisión humana antes de mostrarse: Ramón.

**Lo que cambia solo.** El sitio sabe en qué mes estás. Los textos marcados con `{ }` se calculan con la fecha del
día y las tablas de la ficha; aquí van como se ven el **viernes 16 de octubre de 2026**, el día de las capturas.

---

## 0 · Lo que no cambia en ninguna pantalla

| Slot | Texto | Trabajo |
|---|---|---|
| Nota al margen (fija, las dos páginas) | NOTA AL MARGEN · Concepto de SpindleLab. Doceavo no existe, su contadora tampoco, y nada de esto ocurrió. | Que una captura de cualquier pantalla diga lo que es, en el idioma del libro contable |
| Navegación | Este mes · Cada mes · Servicios · Preguntas · Calendario | Las palabras de quien busca; «Calendario» es la interior |
| CTA del encabezado | Escribir al estudio | Lleva al formulario |
| Pie | Doceavo, estudio contable · Concepción, Biobío. Dirección ficticia. | |
| Pie, aviso | Concepto de SpindleLab, 2026. El estudio, su contadora y su rutina de trabajo son ficticios. Las fechas son las del calendario del SII de 2026, consultadas el 16 de octubre de 2026: si alguna no coincide con sii.cl, manda sii.cl. | La ficción dicha completa, y el límite: las fechas se confirman en la fuente |

## 1 · Home

### 1.1 · Primera pantalla

- Antetítulo (mono): ESTUDIO CONTABLE · PYMES E INDEPENDIENTES · CONCEPCIÓN
- **H1:** {El IVA de septiembre se declara hasta el martes 20 de octubre.}
- Bajada: {Es el plazo del F29 si facturas electrónico y pagas en sii.cl. Si no, venció el martes 13.} Somos un estudio
  contable para pymes e independientes: llevamos tu contabilidad y te decimos, con fecha, lo que vence cada mes.
- CTA: Ver octubre día por día → `#este-mes` · enlace: El calendario de 2026 → `calendario/`

**Descartes del H1:**
1. «Tu contabilidad al día, sin sorpresas.» Lo dice cualquier contador del país y cualquier app de finanzas: no pasa el
   test de intercambio.
2. «No te enteres por el SII de lo que vencía.» Mejor, pero describe el miedo y no lo que se ofrece.
3. **Elegido:** la fecha. Lo que este estudio vende es una fecha, así que el titular **es** el producto, y cambia solo
   cada mes. Nadie más del rubro puede escribirlo en su portada, porque nadie más la actualiza.

**Junto al titular, «El año en doce»** (figura):
- Título: 2026 en doce
- Leyenda: En rojo, lo que vence. Lleno, el mes en curso.
- Lista «Lo que vence en {octubre}» (cada fila: día, día de la semana, qué):
  - 13 · mar · F29, en general · {venció}
  - 13 · mar · Cotizaciones de septiembre, pagadas por internet · {venció}
  - {Hoy, viernes 16}
  - 20 · mar · F29, si facturas electrónico
  - 28 · mié · F29 sin movimiento, si no vendiste nada

### 1.2 · Este mes (#este-mes)

- Rótulo (mono): {OCTUBRE 2026}
- **H2:** {Octubre}, día por día
- Bajada: Lo que vence, lo que hacemos nosotros y lo que te toca a ti. {Hoy es viernes 16.}
- Cabeceras de columna: Día · Vence · Hacemos · Te toca

| Día | Vence | Hacemos | Te toca |
|---|---|---|---|
| Primer día hábil | | Cerramos el mes anterior: cuadramos tu Registro de Compras y Ventas del SII con tus papeles. | Mandarnos lo que no está en el registro: boletas de gasto, compras sin factura. |
| Tres días hábiles antes del F29 general | | Te mandamos el borrador del F29 con el monto, y la planilla de cotizaciones. | Revisarlos y avisarnos si algo no calza. |
| Feriado | {Feriado: Encuentro de Dos Mundos. Lo que vencía hoy pasa al día hábil siguiente.} | | |
| F29 general | F29, en general (pago en línea) | Lo presentamos si no facturas electrónico. | Pagar, o dejarnos el mandato al banco. |
| 13 | Cotizaciones del mes anterior, pagadas por internet | Las declaramos en Previred. | Pagarlas. |
| Hoy | {Hoy. Lo próximo: martes 20, el F29.} | | |
| PEC de facturadores | F29 con mandato al banco, si facturas electrónico | Si pagas con mandato, ya quedó enviado. | |
| PEL de facturadores | F29, si facturas electrónico y pagas en sii.cl | Lo presentamos. | Tener el saldo en la cuenta. |
| El hábil siguiente | | Te mandamos el comprobante y lo que vence el mes que viene. | Guardarlo. |
| 28 | F29 sin movimiento | Lo presentamos aunque no hayas vendido nada. | |
| Último día hábil | | Liquidaciones de sueldo del mes, antes de que pagues. | Pagar los sueldos. |

- Días sin nada: solo el número y el día de la semana.
- Nota bajo la tabla: Los días en que te escribimos son nuestra rutina; los que vencen son del SII y de la
  Superintendencia de Pensiones.

### 1.3 · Cada mes (#cada-mes)

- Rótulo: CADA MES
- **H2:** Lo que se repite cada mes
- Bajada: Doce veces al año, el mismo orden. Las fechas del SII se corren al día hábil siguiente si caen en fin de
  semana o feriado; las cotizaciones pagadas por internet, no.
- Columnas: Fecha · Qué · Quién

| Fecha | Qué | Quién |
|---|---|---|
| 12 | F29 si no facturas electrónico | Nosotros lo declaramos; tú pagas |
| 13 | Cotizaciones de tus trabajadores, pagadas por internet en Previred | Nosotros las declaramos; tú pagas |
| 20 | F29 si facturas electrónico y pagas en sii.cl | Nosotros lo declaramos; tú pagas |
| 28 | F29 sin movimiento, si ese mes no vendiste ni compraste | Nosotros |
| Fin de mes | Liquidaciones de sueldo | Nosotros las hacemos; tú pagas los sueldos |

- Subtítulo: Y una vez al año
- Bajada: En 2026 fueron estas. Las de 2027 las publica el SII; las ponemos aquí cuando salgan.

| Fecha | Qué |
|---|---|
| 27 de marzo | Declaraciones juradas de sueldos (1887) y de honorarios (1879), entre otras |
| 30 de abril | F22 de la Operación Renta, con pago |
| 8 de mayo | F22 sin pago |
| 30 de junio | Declaraciones juradas como la del balance (1847) |

### 1.4 · Lo que no hacemos (#no-hacemos)

- Rótulo: SIN SALDO
- **H2:** Lo que no hacemos
- Bajada: En un libro contable, una raya en la columna del monto quiere decir nada. Esto es lo que va con raya.

| Concepto | Monto |
|---|---|
| **Prometerte que vas a pagar menos impuestos.** Pagas lo que corresponde, y sabes cuánto antes de que venza. | — |
| **Decirte que nunca vas a tener una multa.** Te decimos la fecha con tiempo. Si un plazo se pasa, te avisamos ese mismo día y te decimos qué hacer. | — |
| **Declarar con números supuestos.** Si falta un papel, te lo pedimos antes de la fecha. | — |
| **Usar tu clave del SII para otra cosa.** Sirve para tus declaraciones. Si dejas de trabajar con nosotros, te pedimos que la cambies. | — |

### 1.5 · Servicios (#servicios)

- Rótulo: SERVICIOS
- **H2:** Lo que llevamos
- Columnas: Servicio · Qué incluye · Cuándo · Para quién

| Servicio | Qué incluye | Cuándo | Para quién |
|---|---|---|---|
| Contabilidad mensual | Registro de Compras y Ventas cuadrado, libros y balance | Todos los meses | Pymes con contabilidad completa o simplificada |
| IVA y F29 | Borrador con el monto antes de declarar, la declaración y el comprobante | El 12 o el 20, según cómo factures | Quien emite facturas o boletas |
| Remuneraciones | Contratos, liquidaciones, cotizaciones en Previred y la declaración jurada de sueldos | Fin de mes y el 13 | Quien tiene trabajadores |
| Operación Renta | F22 y declaraciones juradas anuales | De marzo a mayo | Empresas e independientes |
| Inicio de actividades | Elegir el régimen, dar el aviso al SII y emitir tu primer documento | Una vez | Quien parte |

- Nota: No publicamos precios: dependen de cuántos documentos emites y recibes, y de cuántos trabajadores tienes. Te
  lo decimos por escrito antes de partir.

### 1.6 · Preguntas (#preguntas)

- Rótulo: PREGUNTAS
- **H2:** Lo que nos preguntan
- Cada respuesta termina con su fuente (mono, chica).

**¿Cuándo vence el F29?**
El día 12 de cada mes, o el 20 si facturas electrónico y declaras y pagas en sii.cl. Si ese día cae en sábado, domingo
o feriado, pasa al día hábil siguiente. Se declara el mes anterior: en octubre se declara septiembre. En octubre de
2026 fueron el martes 13, porque el 12 fue feriado, y el martes 20. Las fechas de todo el año están en el calendario.
*Fuente: calendario tributario del SII, consultado el 16 de octubre de 2026.*

**¿Tengo que declarar si este mes no vendí nada?**
Sí. El F29 se presenta igual, sin movimiento y sin pago, y el calendario del SII le da plazo hasta el día 28.
*Fuente: calendario tributario del SII.*

**¿Qué pasa si declaro fuera de plazo?**
Pagas el impuesto con reajuste, con intereses por cada mes o fracción de mes de atraso y con una multa. Aunque no haya
nada que pagar, presentar tarde también puede tener multa. No te podemos prometer que nunca va a pasar; lo que hacemos
es que sepas la fecha con tiempo.
*Fuente: preguntas frecuentes del SII sobre el F29 fuera de plazo.*

**¿Cuándo se pagan las cotizaciones de mis trabajadores?**
Dentro de los primeros diez días del mes siguiente. Si las declaras y pagas por internet, hasta el 13, aunque caiga en
fin de semana o feriado.
*Fuente: Superintendencia de Pensiones.*

**¿Cuándo es la Operación Renta?**
En abril. En 2026, el F22 se pudo presentar desde el 1 de abril; con pago vencía el 30 de abril, y sin pago, el 8 de
mayo. Antes, el 27 de marzo, vencieron las declaraciones juradas de sueldos y de honorarios.
*Fuente: calendario tributario del SII y Resolución Exenta SII N° 123 de 2025.*

### 1.7 · Contacto (#contacto)

- Rótulo: CONTACTO
- **H2:** Cuéntanos qué haces
- Bajada: Con eso te decimos qué te vence a ti y cuánto costaría llevarlo. Te responde Olga Treumún, contadora. Es
  ficticia, como el estudio.
- Campos:
  - **Qué haces** (ayuda: En tus palabras, como se lo contarías a alguien.)
  - **¿Tienes trabajadores?** Sí / No
  - **¿Cómo facturas?** Electrónica / Todavía no facturo / No sé
  - **Tu correo**
- Botón: Enviar
- Error de correo: Falta tu correo, o le falta la @.
- Error de «qué haces»: Escribe aunque sea una línea: con eso partimos.
- Confirmación (no se envía nada): Esto es un concepto: el formulario no envía nada. Si Doceavo existiera, te
  respondería Olga con lo que te vence a ti.
- Junto al formulario: Doceavo · Concepción, Biobío. Dirección ficticia. Sin teléfono y sin RUT: el estudio no existe.

## 2 · Interior «Calendario» (`calendario/`)

- Migas: Doceavo / Calendario
- Antetítulo (mono): CALENDARIO TRIBUTARIO 2026 · FUENTE: SII
- **H1:** Lo que vence en 2026, mes por mes.
- Bajada: Las fechas que le tocan a una pyme o a un independiente, sacadas del calendario del SII. Elige un mes y se
  arranca la hoja.
- Selector de meses: los doce meses (Ene a Dic); el actual va lleno. Etiqueta del grupo (lector de pantalla): Elegir
  el mes.
- La hoja del mes: el nombre del mes y el año, la grilla, y bajo cada día que vence, qué vence (F29, Cotizaciones,
  F29 sin mov., F22, DJ). Los feriados, con su nombre en chico. Hoy, lleno.
- Al lado de la hoja, «Lo que vence en {octubre}»: la misma lista de la home, con fuente.
- Grosor del taco (texto para lector de pantalla): {Quedan 3 hojas en el taco: octubre, noviembre y diciembre.}

### 2.1 · El año completo

- **H2:** El año completo
- Bajada: Todas las fechas de 2026 en una tabla. PEL es pago en línea; PEC, pago con mandato al banco.
- Columnas: Mes · F29 en general (PEC · PEL) · F29 facturador electrónico (PEC · PEL) · Sin movimiento · Cotizaciones
  por internet · Además
- «Además»: marzo: 27, declaraciones juradas de sueldos y honorarios · abril: 30, F22 con pago · mayo: 8, F22 sin
  pago · junio: 30, declaraciones juradas como la del balance.

### 2.2 · Por qué cambian las fechas

- **H2:** Por qué no es siempre el 12 y el 20
- Texto: Cuando el 12 o el 20 caen en sábado, domingo o feriado, el SII los corre al día hábil siguiente. Por eso en
  2026 el F29 de abril venció el 13, el de junio el 22 y el de septiembre el 14 y el 21. Las cotizaciones pagadas por
  internet no se corren: el 13 es el 13, aunque sea domingo.

### 2.3 · Fuente

- **H2:** De dónde salen
- Lista:
  - Calendario tributario del SII, F29 y F22 de 2026 (misiir.sii.cl).
  - Resolución Exenta SII N° 123, de 25 de septiembre de 2025, para las declaraciones juradas.
  - Superintendencia de Pensiones, para las cotizaciones.
  - feriados.cl, para los feriados de 2026.
- Cierre: Consultado el 16 de octubre de 2026. Si una fecha de esta página no coincide con sii.cl, manda sii.cl.
- CTA: Escribir al estudio → `../#contacto`

---

## Lo que borré

- «Asesoría integral», «a tu medida», «tranquilidad»: el rubro entero dice eso, y por eso el sitio no.
- Una sección «Por qué Doceavo» con cuatro razones: cada razón ya está dicha por una fecha o por la columna de lo que no
  hacemos.
- La frase «tu contadora de confianza»: confianza no se dice, se ve en que la fecha está publicada.
- Un tercer campo de contacto (teléfono): no se usa para responder, y el estudio no tiene teléfono.

## Afirmaciones a verificar antes de mostrarlo

Todas las fechas, contra `ficha.md` §4 (y el JSON de `_herramientas/`). La rutina del estudio (cierre, borrador,
comprobante, liquidaciones) es ficción declarada en el pie y en la nota bajo la tabla.
