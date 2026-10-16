# Brief 02 — Agente de agendamiento por WhatsApp

**Abierto:** 10-sep-2026 · **Pedido por:** Ramón ("probemos el caso Emma")
**Estado:** ☠️ **MUERTA — 10-sep-2026, por decisión de Ramón.** Nada construido, nada vendido.
**Motivo:** el mercado está tomado por los dueños del software que la clínica ya usa (Dentalink,
Medilink y AgendaPro venden hoy el mismo agente). Ver §3-bis(a). No reabrir sin que cambie ese
hecho — y el hecho solo cambia si un incumbente se retira, no si aparece una idea nueva de
funcionalidad.

---

## 1. Qué es, y de dónde sale

Un asistente por WhatsApp que **agenda, reagenda y cancela citas solo**, manda recordatorios,
y **deriva a una persona los casos delicados**.

**Caso de referencia** (video *"Cómo crear un Negocio de UNA Persona con Claude"*, Agustín
Medina): una alumna llamada Emma lo construyó para una consulta ginecológica real. **$1.500 de
pago inicial + $300/mes**, unos $3.000 acumulados con ese único cliente, en producción desde
febrero. Lo armó **por capas**: primero agendar, después recordatorios, después seguimiento.

> Estos números vienen del video, contados por su autor, que vende una comunidad de pago.
> **No están verificados y no se usan como proyección de nada.** Son el origen de la idea, no
> evidencia de mercado.

## 2. Por qué se eligió esta y no las otras tres del video

De los cuatro productos vendibles del video, este es **el único donde el cliente número diez
cuesta bastante menos que el primero**. El mismo sistema sirve a consultas médicas, dentistas,
veterinarias, salones, kinesiólogos, talleres: cambia el calendario y el tono, no la lógica.

Eso es la diferencia entre un negocio y una pega. Los otros tres (contenido automatizado,
cotizador, máquina de propuestas) se rehacen bastante en cada cliente, o le venden a un
comprador que paga poco.

Además el dolor es **medible en plata**: horas contestando el teléfono, más las citas que no
llegan. El recordatorio automático ataca el no-show, que es pérdida directa y contable.

## 3. Lo que NO sabemos, y hay que averiguar antes de construir

Esto es lo primero, y no es opcional. En el proyecto 01 se construyó sobre datos de blogs de
proveedores y **seis de ellos resultaron falsos** al contrastarlos con la fuente oficial.

**a) ¿El mercado ya está tomado?** Es la pregunta que puede matar el proyecto en una tarde.
En Chile hay software de agendamiento establecido para clínicas y salones. Si ya resuelven el
agendamiento por WhatsApp, la oportunidad no es "agendar": es el hueco que ellos dejan.
**Aplicar el paso 3 del radar** (`laboratorio/herramientas/radar-de-ideas.md`): quiénes cobran,
cuánto, y **las quejas repetidas contra ellos** en reseñas verificables.

**b) ¿Cuánto cuesta de verdad WhatsApp?** La API de WhatsApp Business no es gratis ni
inmediata: hay verificación de negocio, y el precio se cobra por conversación, no por mensaje.
Hay que averiguar el costo real en Chile y por qué vía (Meta directo, o un proveedor
intermediario), porque **ese costo se come el margen del retainer** si el cliente tiene
volumen. Sin este número no se puede poner precio.

**c) ¿Qué vertical?** Salud, veterinaria, belleza y talleres tienen dolores parecidos pero
reglas muy distintas. Elegir una y no "todas".

**d) La restricción de datos.** Una agenda de pacientes es un fichero de datos personales, y en
salud son datos sensibles. Quien opere el sistema queda como tercero que los trata. Eso implica
contrato con el cliente, decidir qué se guarda y qué no, y un compromiso de seguridad. **No es
un impedimento; es un costo que hay que conocer antes de cotizar.**

---

## 3-bis. Las respuestas (sondeo del 10-sep-2026)

> **Cómo leer esto.** Todo lo de abajo se abrió y se leyó. Los precios de la competencia salen
> de sus propias páginas de planes; las quejas salen de reseñas con nombre y fecha; el costo de
> WhatsApp sale del tarifario oficial de Meta en CLP, descargado, no de un blog. Donde no pude
> verificar algo, lo digo.

### a) ¿El mercado está tomado? **Sí. Y no por un competidor lateral: por los dueños del software.**

Esta es la respuesta que mata el proyecto tal como está escrito. En las tres verticales que el
§2 nombraba como intercambiables, **el software de gestión que ya usa la clínica lanzó su propio
agente de IA que contesta WhatsApp y agenda**. No es una funcionalidad prometida: está publicada
y se vende hoy.

| Vertical | Quién manda | Qué lanzó | Fuente |
|---|---|---|---|
| Dental | **Dentalink** (Healthatom, Santiago; +8.000 clientes, +20 países) | *Contact Center IA*: "Responde WhatsApp, atiende llamadas y agenda citas automáticamente" | [softwaredentalink.com](https://www.softwaredentalink.com/inteligencia-artificial/contact-center) |
| Médico | **Medilink** (mismo dueño, Healthatom) | *Contact Center IA*, mismo producto | [softwaremedilink.com](https://www.softwaremedilink.com/inteligencia-artificial/contact-center) |
| Belleza / bienestar / estética | **AgendaPro** | *Julia* IA: "responde mensajes, agenda citas y procesa cobros las 24 horas del día, los 7 días de la semana". *Sofía* IA confirma y reagenda | [agendapro.com/blog/ia-en-agendapro](https://agendapro.com/blog/ia-en-agendapro/) |

Y encima ya hay un tercero especializado vendiendo **exactamente el producto del §1**, en Chile,
en dental, montado sobre la API de Dentalink: **Dentipilot**.

**Los precios que se cobran hoy** (todos verificados en la página de planes del propio proveedor):

| Proveedor | Producto | Precio | Fuente |
|---|---|---|---|
| AgendaPro | Individual / Básico / Premium / Pro | **$15.900 · $34.900 · $54.900 · $249.900** al mes + IVA | [agendapro.com/cl/planes](https://agendapro.com/cl/planes) |
| AgendaPro | Recordatorios WhatsApp (adicional) | **desde $5.000/mes + IVA por 50 mensajes** | [agendapro.com/cl/planes](https://agendapro.com/cl/planes) |
| Dentipilot | Plan 1500 (1.500 conversaciones/mes) | **$299.990/mes + IVA**, implementación **$390.000** | [dentipilot.cl/precios](https://www.dentipilot.cl/precios-software-dental-chile) |
| Dentipilot | Plan 3500 / Plan 6000 | **$499.990 · $759.990** al mes + IVA, implementación gratis | [dentipilot.cl/precios](https://www.dentipilot.cl/precios-software-dental-chile) |
| Reservo | Software médico | desde **US$30/mes** | [Capterra](https://www.capterra.com/p/235899/Reservo/) |

Ojo con el precio de Dentipilot: **$299.990/mes está en el mismo orden que los $300/mes del caso
Emma**. O sea, el precio de referencia del video no es un hallazgo — es el precio de lista del
mercado chileno, y ya lo está cobrando alguien que llegó antes y con la integración hecha.

**Las quejas repetidas contra ellos** (Capterra, AgendaPro, 4,8/5 sobre 158 reseñas — nota alta,
que es justamente el problema). La queja que se repite en **cinco reseñistas independientes** es
siempre la misma, y es sobre WhatsApp:

- Fernando Anibal C. (17-ago-2023): *"la mensajeria de recordatorio via whatsapp debe abonarse a parte"*
- María Isabel M. (30-ago-2023): *"seria bueno que no cobraran los mensajes de whatsapp"*
- Paola R. (8-sep-2024): *"se me termina el número de recordatorios por WhatsApp"*
- Fabián Z. (21-oct-2024): *"los costos todavía son altos para los mensajes de whtasapp"*
- Enzo D. (30-jul-2025): pide cambiar que todos los mensajes lleguen por WhatsApp

Fuente abierta y leída: [reseñas de AgendaPro en Capterra](https://www.capterra.com/p/218709/AgendaPro/reviews/)
y [página 3](https://www.capterra.com/p/218709/AgendaPro/reviews/?page=3).

**Y acá está el número que explica la queja.** AgendaPro cobra $5.000 por 50 mensajes, o sea
**$100 por mensaje**. La tarifa oficial de Meta para un mensaje de utilidad en Chile es
**$17,6584** (ver punto b). Es un **margen de ~5,7x sobre el costo real**. La queja de los cinco
reseñistas no es una impresión: es aritmética, y es el único hueco comercial nítido que encontré.

Segunda queja repetida, en cuatro reseñistas: **alzas de precio y el cobro por cada extra** —
Luis S. (1-dic-2023) *"subiendo el precio y eliminaron la función de ver las reservas
canceladas"*; José Miguel V. (10-jul-2023) *"se ha encarecido"*; Gabriela M. (14-ene-2024) *"el
precio, me parecio demasiado el aumento"*; Daniela V. (28-jun-2023) *"eso de pagar por cada cosa
extra no me gusta"*.

Tercera, la más interesante para el producto: **la lógica de agenda falla**. José Miguel V.:
*"pacientes pueden tomar horarios que no les corresponden"*. Ana Paola M. (7-jul-2023): los
recordatorios de múltiples servicios *"se envía por servicio y no por cliente"*. Es el hueco
real, y es chico.

### b) ¿Cuánto cuesta la API de WhatsApp? **Mucho menos de lo que el brief temía. Y el brief tenía el modelo de cobro equivocado.**

**Corrección al §3(b): ya no se cobra por conversación.** Meta cambió a cobro **por mensaje** el
**1-jul-2025**. La frase "el precio se cobra por conversación, no por mensaje" quedó obsoleta.
Fuente: [Meta, WhatsApp Business Platform Pricing](https://developers.facebook.com/docs/whatsapp/pricing/).

**Tarifa oficial para Chile**, descargada del tarifario en CLP de Meta (vigente 1-jul-2026):

| Categoría | Precio por mensaje |
|---|---|
| Marketing | **$78,4917** |
| Utility (recordatorios, confirmaciones) | **$17,6584** |
| Authentication | **$17,6584** |
| Service | **gratis** |

Chile tiene la tarifa de marketing **más cara de Latinoamérica** en ese tarifario (Argentina
$54,56 · Brasil $55,18 · México $26,93 · Colombia $11,04). Para recordatorios da igual: eso es
*utility*, no *marketing*. Y **Chile no accede a descuento por volumen** hasta los 100.000
mensajes de utilidad al mes, o sea nunca en este negocio.

Lo que de verdad cambia el cálculo: **las conversaciones entrantes son gratis.** Si el paciente
escribe, se abre una ventana de servicio de 24 horas y todo lo que el agente responda ahí no se
cobra. Se cobra el recordatorio que sale por iniciativa propia.

**El número que faltaba para poder poner precio:** una consulta con 400 horas al mes, con dos
recordatorios cada una, son 800 mensajes de utilidad = **$14.127 al mes** de costo Meta. Todo el
agendamiento conversacional entrante, gratis.

**Conclusión que da vuelta el reparo del brief:** el costo de WhatsApp **no se come el margen**.
Es del orden de $15.000 al mes. Lo que se come el margen del cliente hoy es el **intermediario**,
y por eso los cinco reseñistas reclaman.

**Requisitos de verificación** (fuente: [Meta, Messaging Limits](https://developers.facebook.com/docs/whatsapp/messaging-limits/)):
sin verificación de empresa, el portafolio queda limitado a **250 destinatarios únicos al día**.
Para subir a 2.000 hay que verificar la empresa con Meta (o que lo haga un socio, o entregar
2.000 mensajes con buena calidad en 30 días). De ahí escala solo. Para una consulta chica, 250
al día no es limitante; para vender a varias clínicas desde un mismo portafolio, sí.

> ⚠️ **Dos datos falsos que circulan en blogs y que descarté abriendo la fuente oficial:**
> (1) "Chile: utility $18,94 y marketing $84,17" — el tarifario oficial dice **$17,6584** y
> **$78,4917**. (2) "Desde el 1-oct-2026 se empiezan a cobrar los mensajes de servicio" — la
> página de cambios de Meta **no dice eso**; los cambios de octubre-2026 afectan a Bangladesh,
> Irak, Nepal, Sri Lanka, Kazajistán, Kuwait, Marruecos, Omán y Ucrania. **Chile no está en esa
> lista.** Si ese número entra a un modelo de precios, el modelo queda mal.

### c) ¿Qué vertical? **Ninguna de las tres del §2. Si hay que elegir una, veterinaria — y con el ánimo bajo.**

Salud (dental y médica) y belleza están tomadas por el dueño del software, que es el peor
competidor posible: ya tiene la agenda, ya tiene la ficha, ya tiene el cobro, y el agente le sale
gratis de vender porque es un módulo más.

**Veterinaria es la única que quedó fragmentada.** Ahí conviven Wirevet, PetCore, VetLink,
Veti.app, Vetzilla y el módulo veterinario de AgendaPro, sin un dominante que haya publicado un
agente conversacional. Además **baja mucho el costo del punto (d)**: el paciente es un animal, y
los datos de salud de una mascota no son datos sensibles de una persona. Lo que se trata es el
nombre y el teléfono del dueño, que es dato personal común.

**Pero el reparo de fondo es más grave que la elección de vertical**, y hay que decirlo: la tesis
del §2 —"el cliente número diez cuesta bastante menos que el primero"— **no se sostiene**. Lo que
hace valioso al agente no es conversar: es **escribir en la agenda que la clínica ya usa**. Todo
el foso de Dentipilot es la API de Dentalink. Cambiar de vertical significa integrarse con otro
software, con otra API, con otro modelo de datos. **La integración es el producto, y no se
reutiliza.** El costo del cliente diez baja solo si se queda en la misma vertical y el mismo
software — que es exactamente lo que hizo Dentipilot, y llegó antes.

### d) La restricción de datos: qué implica de verdad

Verificado contra el texto oficial de la Ley 21.719
([BCN, idNorma 1209272](https://www.bcn.cl/leychile/navegar?idNorma=1209272&f=2026-12-01)),
descargado y leído en esta sesión. **En vigencia el 1-dic-2026**, o sea a 82 días.

- **Los datos de salud son sensibles.** Art. 2 letra g): son sensibles, entre otros, *"los datos
  relativos a la salud, al perfil biológico humano, los datos biométricos"*. El motivo de consulta
  que el paciente escribe por WhatsApp es dato sensible.
- **Y exigen consentimiento expreso.** Art. 16: el tratamiento de datos sensibles *"sólo puede
  realizarse cuando el titular (...) manifiesta su consentimiento en forma expresa, otorgado a
  través de una declaración escrita, verbal o por un medio tecnológico equivalente"*.
- **Quien opera el agente es "encargado".** Art. 2 letra x): *"Tercero mandatario o encargado: la
  persona natural o jurídica que trate datos personales, por cuenta del responsable de datos"*.

**El costo real está en el Art. 15 bis, y es más caro de lo que el brief suponía:**

1. **Contrato obligatorio y con contenido mínimo**: objeto, duración, finalidad, tipo de datos,
   categorías de titulares, y derechos y obligaciones de las partes. No es un anexo de cortesía.
2. **No se puede subcontratar sin autorización específica y por escrito.** Y si se delega,
   *"continuará siendo solidariamente responsable (...) y no podrá eximirse de responsabilidad
   argumentando que ha delegado el tratamiento"*. **Esto pega directo**: el proveedor de
   WhatsApp, el modelo de lenguaje y el hosting son todos sub-encargados.
3. **Salirse del encargo te convierte en responsable.** Si se tratan los datos para un objeto
   distinto o se ceden sin autorización, *"se le considerará como responsable de datos para todos
   los efectos legales, debiendo responder personalmente por las infracciones (...) y
   solidariamente con el responsable de datos por los daños ocasionados"*. Usar las conversaciones
   de pacientes para entrenar o afinar un modelo cae acá.
4. **Deber de reportar** al responsable cualquier vulneración de seguridad, y cumplir las medidas
   de seguridad del Art. 14 bis.
5. **Al terminar, borrar o devolver.** El guardrail del §4 ("el cliente se lleva su agenda") deja
   de ser una promesa comercial: es obligación legal.
6. **Evaluación de impacto** (Art. 15 ter) cuando hay tratamiento masivo o de datos sensibles.
7. Si hay filtración de datos sensibles, hay que **avisarle también a los pacientes**, no solo a
   la Agencia.

**Traducido a plata y a trabajo:** un contrato de encargo por cliente, un registro de
sub-encargados, un procedimiento de incidentes, y borrado verificable a la salida. Es asumible,
pero es trabajo recurrente por cliente, y **la responsabilidad solidaria no se puede tercerizar**.
Con cinco clientes en producción son cinco contratos y cinco responsabilidades vivas.

> Las multas por tramo (leves hasta 5.000 UTM, graves hasta 10.000, gravísimas hasta 20.000)
> vienen de la verificación del proyecto 01, no las volví a comprobar en esta sesión: el extracto
> XML que descargué no incluye el título sancionatorio. **Tratarlas como heredadas, no como
> verificadas acá.**

### El veredicto (aceptado por Ramón el 10-sep-2026)

**El mercado está bien servido, y la idea tal como está escrita no pasa el descarte 1 del radar.**
Matar esto hoy es el resultado correcto. Lo único que sobrevivió al sondeo es un hueco angosto y
verificado: **los incumbentes cobran ~5,7x el costo real del mensaje y sus clientes lo dicen en
voz alta**. Eso es un argumento de precio, no un producto — y no alcanza para sostener un negocio
frente a alguien que ya tiene la agenda, la ficha y el cobro del cliente.

**Lo que NO se hizo y habría que hacer antes de reabrir:** las diez llamadas del §5. Nada de esto
reemplaza hablar con los dueños. Pero gastar esas diez llamadas ahora, sabiendo que el software
que ya usan lanzó el mismo agente, sería empezar por el lado caro.


## 4. Los guardrails del producto (no negociables)

- **Derivación a humano siempre disponible.** En salud, un bot que responde algo clínico es un
  problema serio. El agente agenda; no orienta, no diagnostica, no interpreta síntomas.
- **Nada se confirma sin registro.** Una cita agendada mal es un paciente que llega y no lo
  atienden. Toda acción del agente queda trazable y revisable.
- **Nunca mensajes masivos.** Recordatorios de citas propias, sí. Difusión comercial, no: eso
  quema el número y expone al cliente.
- **El cliente es dueño de sus datos.** Se va cuando quiera y se lleva su agenda.

## 5. La validación, antes de escribir una línea

**Diez llamadas a negocios de la vertical elegida**, con tres preguntas:

1. ¿Quién contesta cuando alguien pide hora, y por qué canal llega la mayoría?
2. ¿Cuánta gente no llega a su hora, y qué hacen hoy para evitarlo?
3. ¿Con qué software agendan hoy, y qué les falta?

- Si la mayoría dice "contesta la recepcionista por WhatsApp y se nos pierden horas" → hay
  negocio, y ya tienes la frase con que vendérselo.
- Si dicen "lo hace el sistema y funciona bien" → esa vertical está tomada, prueba otra.

**Esto además es el primer estreno real del radar**, que está escrito y sin probar. Si el
método no rinde acá, se corrige el radar.

## 6. Los cuatro descartes del radar, aplicados

| Filtro | Estado |
|---|---|
| ¿Se repite en fuentes independientes? | **Sí, verificado**: 5 reseñistas distintos en Capterra por el cobro de WhatsApp |
| ¿Alguien ya paga por resolverlo? | **Sí, y ahí murió**: Dentalink, Medilink y AgendaPro lanzaron el agente; Dentipilot lo vende a $299.990/mes |
| ¿Duele ahora? | Duele siempre, **no tiene ventana con fecha** — venta más lenta que el 01 |
| ¿Costo de atención semanal? | **Sigue sin estimar**, y ahora se le suma un contrato de encargo y responsabilidad solidaria por cliente (Art. 15 bis) |

## 7. El reparo de fondo

**Vender un agente que agenda citas es quedar a cargo de que funcione.** Si se cae un lunes a
las 9, llaman. Eso no es un proyecto entregado, es una responsabilidad continua, y el precio
del retainer tiene que cubrirla de verdad, no ser un extra simbólico.

Con cinco clientes son cinco sistemas en producción atendiendo gente real. Antes de vender el
primero conviene saber si ese es el negocio que se quiere.

## 8. Registro

| Fecha | Qué pasó |
|---|---|
| 2026-09-10 | Brief abierto a pedido de Ramón. Nada construido, nada validado. Pendiente: §3 completo y las diez llamadas del §5. |
| 2026-09-10 | **Sondeo del §3 completo (sesión de parte).** (a) Mercado **tomado**: Dentalink y Medilink (Healthatom) y AgendaPro ya venden agente de IA que contesta WhatsApp y agenda; Dentipilot vende el producto exacto sobre Dentalink a $299.990–$759.990/mes + IVA. Precios de AgendaPro verificados en su página de planes. Quejas repetidas: 5 reseñistas de Capterra por el cobro de WhatsApp. (b) Costo real Meta Chile, del tarifario oficial CLP: utility **$17,6584**, marketing **$78,4917**, servicio gratis, cobro **por mensaje desde 1-jul-2025** (el §3(b) decía por conversación: corregido). ~$14.000/mes para 400 citas. AgendaPro cobra $100/mensaje = **~5,7x**. Verificación Meta: 250 destinatarios/día sin verificar. (c) Vertical: ninguna de las tres; si acaso veterinaria, pero **la tesis de reutilización del §2 no se sostiene** (la integración con el software incumbente es el producto). (d) Ley 21.719 verificada contra el texto BCN: salud = dato sensible (Art. 2 g), consentimiento expreso (Art. 16), y **Art. 15 bis**: contrato obligatorio, prohibición de subcontratar sin autorización escrita, **responsabilidad solidaria indelegable**, borrado o devolución al terminar. **Veredicto: matar la idea tal como está escrita.** Pendiente y no hecho: las diez llamadas del §5. Multas por tramo heredadas del proyecto 01, no re-verificadas acá. |
| 2026-09-10 | ☠️ **Idea desechada por Ramón**, mismo día, con el sondeo del §3-bis a la vista. **Motivo:** el incumbente de cada vertical ya vende el producto; no hay ruta de ingreso que no sea competirle al dueño de la agenda, la ficha y el cobro del cliente. **Las diez llamadas del §5 no se hicieron y ya no se hacen.** Lo que sobrevive no es el proyecto sino dos piezas reutilizables: el tarifario real de WhatsApp en Chile (§3-bis b) y el mapa del Art. 15 bis (§3-bis d), que sirven a cualquier idea futura que toque WhatsApp o datos de terceros. El radar queda corregido en su propio archivo. **Cerrada. No reabrir sin hecho nuevo.** |
