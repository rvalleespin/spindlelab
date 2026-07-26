# 17. Manuel García Sobarzo — Clínica NúcleoSalud (nucleosalud.cl)

**Decisor:** Manuel García Sobarzo · `manuel.garcia@nucleosalud.cl` · Pedro Aguirre Cerda · Tanda 2
**Re-verificado:** 25 jul 2026, 20:46 — **403 confirmado de nuevo**

**Hallazgo:** el servidor (nginx) responde **403 Forbidden** a toda solicitud automatizada, en
`nucleosalud.cl` y en `www.nucleosalud.cl`. No entrega una línea de HTML. Verificado dos veces
hoy. Es el mismo patrón de Alberto Rosenberg en Tanda 1, pero más severo: ahí el bloqueo dependía
del identificador del navegador, acá es total.

**Antes de enviar:** abrir el sitio en un navegador normal. Si tampoco carga para personas, el
hallazgo es otro (sitio caído) y el correo debe reescribirse con el tono de aviso del de Bollëk.

---

**Asunto:** nucleosalud.cl responde "acceso denegado" a los buscadores

Estimado Manuel:

Encontré algo técnico en nucleosalud.cl que vale la pena que alguien del equipo revise.

El servidor responde con un error de acceso denegado (403) ante cualquier solicitud automatizada,
tanto en nucleosalud.cl como en la versión con www. No entrega contenido: el bloqueo ocurre antes
de que se lea una sola línea de la página. Lo verifiqué dos veces hoy.

Es el tipo de problema que puede pasar años sin detectarse, porque desde un navegador el sitio se
ve normal y nadie del equipo entra de otra forma. Pero las herramientas que necesitan leerlo,
incluidos los rastreadores que alimentan a Google y a los motores de IA, se topan con la puerta
cerrada.

Dicho de otro modo: no es que el contenido no convenza, es que no alcanza a ser leído.

Me dedico a SEO técnico y visibilidad en motores de IA para clínicas de salud y estética.
¿Le preparo un mini-diagnóstico de 1 página en 48 horas? Gratis, sin compromiso.

SpindleLab — SEO técnico y visibilidad en IA · spindlelab.cl
