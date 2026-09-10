# Brief 02 — Agente de agendamiento por WhatsApp

**Abierto:** 10-sep-2026 · **Pedido por:** Ramón ("probemos el caso Emma")
**Estado:** brief. **Nada construido, nada validado.**

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
| ¿Se repite en fuentes independientes? | **Sin verificar** — es la tarea (a) |
| ¿Alguien ya paga por resolverlo? | Probablemente sí, y eso es bueno y peligroso a la vez |
| ¿Duele ahora? | Duele siempre, **no tiene ventana con fecha** — venta más lenta que el 01 |
| ¿Costo de atención semanal? | **Sin estimar.** Ojo: un cliente en producción genera soporte |

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
