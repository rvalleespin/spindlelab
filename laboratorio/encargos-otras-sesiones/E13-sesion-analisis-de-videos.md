# E13 — Cómo filtrar una idea sacada de un video, antes de escribirle un brief

**Para:** la sesión que analiza videos y saca ideas de ahí
**De:** la sesión de parte que hizo el sondeo del proyecto 02 · **10-sep-2026**
**Origen:** el proyecto 02 nació de un video y murió el mismo día. Esto existe para que la
próxima idea de esa fuente no gaste una sesión entera en descubrir lo mismo.

---

## Lo que pasó, en dos frases

El proyecto 02 salió del video *"Cómo crear un Negocio de UNA Persona con Claude"* (Agustín
Medina): un agente que agenda citas por WhatsApp, con el caso de una alumna llamada Emma. Se le
escribió un brief completo, con guardrails, plan de validación y reparos. **Diez minutos de
sondeo lo habrían matado antes de escribir la primera línea:** Dentalink, Medilink y AgendaPro
—los softwares que las clínicas y salones chilenos ya tienen instalados— **ya venden ese mismo
agente**, publicado en su página de producto.

No es culpa del video. Es que faltaba un paso.

## El paso que falta: descarte 0

**Antes de escribirle un brief a cualquier idea de video, buscar la página de producto del
software incumbente de esa vertical y leer su sección de funcionalidades y de IA.**

Si lo que ibas a construir ya es un módulo del sistema que el cliente **ya tiene instalado, ya
paga, y donde ya viven su agenda, su ficha y su cobro**, la idea está muerta. No compites contra
un producto: compites contra una casilla que el cliente ya ve todos los días, que le sale gratis
de agregar y que no le pide migrar nada.

Cuesta diez minutos. Va antes que todo lo demás, incluido el brief.
Quedó incorporado como **descarte 0** en [el radar](../herramientas/radar-de-ideas.md), §5.

## Las tres trampas de las ideas sacadas de videos

**1. Los números del video no son evidencia, son material de venta.**
El video daba "$1.500 de entrada + $300/mes". Sonaba a hallazgo. Resultó que **$299.990/mes + IVA
es el precio de lista que ya cobra [Dentipilot](https://www.dentipilot.cl/precios-software-dental-chile)
en Chile por exactamente ese producto**. O sea, el número no era una oportunidad: era el precio
de mercado, y ya lo cobra alguien que llegó antes y con la integración hecha. Quien hace el video
vende una comunidad de pago; sus cifras son su marketing.
**Regla:** de un video se extrae el **mecanismo** y la **forma de la oferta**. Nunca las cifras,
los plazos ni los "resultados". Esos no se citan, se descartan.

**2. "El mismo sistema sirve para muchos rubros" es casi siempre falso.**
Es lo que los videos venden, porque es lo que suena a apalancamiento. En el proyecto 02 la tesis
era "cambia el calendario y el tono, no la lógica". Es al revés: **lo valioso no es conversar, es
escribir en la agenda que el negocio ya usa**. Todo el foso de Dentipilot es la API de Dentalink.
Cambiar de vertical significa otra API, otro modelo de datos, otra integración. La integración
**es** el producto, y no se reutiliza.
**Pregunta obligatoria a cada idea de video:** *¿qué exactamente se reutiliza del cliente 1 al
cliente 10, y qué se vuelve a construir?* Si la respuesta honesta es "la integración se rehace",
no hay apalancamiento, hay una pega.

**3. Los videos encuentran dolores, no ventanas.**
Ya estaba anotado en el §7 del radar y se confirmó: el proyecto 02 dolía igual en marzo que en
septiembre, y por eso no tenía urgencia de compra. Compáralo con el proyecto 01, que tiene una
ley con fecha. **Una idea de video sin fecha detrás arranca en desventaja** y hay que exigirle
mucho más en los otros dos criterios.

## El procedimiento, entonces

Para cada idea que salga de un video, **en este orden**, y sin escribir brief hasta el final:

1. **Descarte 0.** ¿El incumbente ya lo vende? → si sí, se anota la fecha y el motivo y se cierra
   ahí mismo. Una línea, no un documento.
2. **La prueba de reutilización.** ¿Qué sobrevive del cliente 1 al 10? Si es la integración la
   que se rehace, se anota y se cierra.
3. **Los tres filtros del laboratorio** ([README](../README.md)): necesidad forzada, usa el
   oficio que ya existe, y costo de atención semanal **con número**.
4. **Recién ahí**, brief.

Lo que llega a brief con los cuatro pasos hechos es una idea. Lo que llega antes es una tarea
para otra sesión.

## Los otros tres productos del mismo video

El §2 del brief 02 los nombra: **contenido automatizado, cotizador, y máquina de propuestas**.
No están evaluados y **no hay que abrirles brief**. Si Ramón los quiere mirar, pasarlos por el
descarte 0 y la prueba de reutilización, y devolver **una línea por cada uno**: vive o muere, con
la URL que lo decide. Sospecha razonable de partida, del propio §2 del brief: los tres se rehacen
bastante en cada cliente o le venden a un comprador que paga poco. Confírmalo o desmiéntelo con
una fuente, no con criterio.

## Dos piezas que quedaron y que sirven para lo que venga

El proyecto 02 murió, pero dejó dos cosas verificadas que ahorran trabajo a cualquier idea futura:

- **El costo real de WhatsApp en Chile** (§3-bis b del [brief 02](../02-agente-agendamiento-whatsapp/brief.md)):
  cobro **por mensaje** desde el 1-jul-2025, no por conversación. Utility **$17,6584**, marketing
  **$78,4917**, servicio gratis. Sin verificar la empresa, 250 destinatarios/día. Si una idea de
  video toca WhatsApp, el número ya está y **no hay que volver a preguntarle a un blog** — tres
  blogs lo tenían mal.
- **El mapa del Art. 15 bis de la Ley 21.719** (§3-bis d): qué implica operar datos por cuenta de
  un cliente. Contrato obligatorio, prohibición de subcontratar sin autorización escrita, y
  **responsabilidad solidaria que no se puede delegar**. Aplica a cualquier idea donde nosotros
  operemos datos de terceros, que son casi todas las de esta fuente.

## Cierre de este encargo

Se cierra cuando la sesión de videos **confirme por escrito que aplica el descarte 0 y la prueba
de reutilización antes de proponer una idea**, y devuelva las tres líneas de los otros tres
productos del video. No requiere construir nada.
