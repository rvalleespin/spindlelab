# Mapa de ideas — qué entra a SpindleLab y qué se arma aparte

**14-oct-2026.** Pedido de Ramón: *"antes de armar nada, el mapa de ideas: las que debería
incorporar a SpindleLab y las que se arman aparte"*. Cierra también el encargo
[E13](encargos-otras-sesiones/E13-sesion-analisis-de-videos.md), que pedía los tres veredictos
pendientes del video de Agustín Medina.

**Nada de lo de abajo se construye todavía.** Es el mapa, no la orden.

---

## La regla con la que quedó clasificado

No es gusto. Son tres preguntas, en este orden:

1. **¿Pasa descarte 0?** ¿El software que el cliente ya tiene instalado vende esto como módulo?
   Si sí, muere ahí. (Diez minutos; mató el proyecto 02 y el agente de voz.)
2. **¿Qué se reutiliza del cliente 1 al 10?** Si lo que se rearma es la integración o la lógica
   del negocio, no hay apalancamiento: es una pega, no un producto.
3. **¿Dónde vive su mejor versión?**
   - **Dentro de SpindleLab** si usa el oficio que ya se cobra y su mejor resultado es que la
     agencia cierre más. No tiene comprador propio: tiene comprador *del mismo* cliente.
   - **Aparte** si tiene comprador propio, precio propio y **urgencia propia** — y sobre todo si
     puede facturar sin que Ramón esté sentado al frente.

---

## A. Entran a SpindleLab (fortalecen el pilar)

### A1. Panel de visibilidad en IA con la marca del cliente — **la que vale**
De dónde sale: el video del 14-oct (Álvaro Morales, 28:01, "darle al cliente una aplicación propia
para que nuestro trabajo fuese premium"). Traducido: un panel donde el cliente ve sus mediciones
en ChatGPT/Gemini/Perplexity y el histórico de su chequeo, en su marca.
- **Descarte 0: pasa.** Ningún software que una empresa chilena ya tenga instalado ofrece esto.
  Lo ofrecen herramientas en inglés y por suscripción (Otterly USD 29/mes, Peec y Profound ~USD
  99), sin contexto chileno y sin nadie que arregle el sitio detrás.
- **Reutilización: alta.** El panel es el mismo; cambian el dominio y las consultas medidas.
- **Por qué va dentro:** es el **entregable visible** que el estudio de mercado del 14-oct dice que
  falta (movimiento M3), y es lo que justifica una auditoría de $400.000 frente a una de $150.000.
- **Lo que hay que decidir antes de construir:** si es entregable del acompañamiento mensual
  (sube el valor del plan que ya existe) o producto aparte con suscripción (otro negocio, otra
  conversación). **Recomendación: entregable.** Un producto con suscripción compite con Profound
  y pierde; un entregable compite con una agencia que manda un PDF y gana.

### A2. El cotizador, pero como componente de Desarrollo Web
De dónde sale: uno de los tres pendientes de E13. **Muere como producto suelto** (ver C3) y vive
como pieza de la línea que de verdad cierra clientes.
- **Por qué va dentro:** 2 de 2 clientes cerrados son Desarrollo Web. Un cotizador en el sitio es
  captura de leads, y el componente se reutiliza entre clientes aunque la tabla de precios no.
- **Lo que hay que decidir:** si se ofrece como extra pagado o como motivo para subir el precio
  base del sitio.

### A3. El radar de ideas — ya construido, no se vende
[`herramientas/radar-de-ideas.md`](herramientas/radar-de-ideas.md). Instrumento interno. Vale
decir en voz alta que **no es un producto**: su valor es que las próximas ideas lleguen filtradas,
y ya se cobró solo dos veces (proyecto 02 y el agente de voz).

### A4. Lo que no es idea pero va en esta columna, porque es lo que desbloquea todo
- **El caso medido propio: 36/100 (10-sep) → 100/100 (14-oct)**, corrido en vivo contra
  `verifica.spindlelab.cl/api/chequeo?dominio=spindlelab.cl`. Reproducible por cualquiera, con el
  instrumento de la casa. Es la pata que falta para entrar al cuadrante vacío del mercado.
- **`/precios` y el precio en la home:** hoy `/precios` da 404 mientras el mini-diagnóstico promete
  "precios publicados en el sitio". Horas de trabajo, tres fuentes apuntando al mismo cuello.

---

## B. Se arma aparte (una sola, y está en la hora)

### B1. Verifica y Cumple — el kit de implementación a $149.000
Tiene todo lo que define un negocio aparte: comprador propio (el dueño que recibe el chequeo en
rojo), precio decidido, dominio propio (`verifica.spindlelab.cl`, vivo), y **urgencia con fecha**
que ninguna otra idea del laboratorio tiene.
- **Lo que está vivo:** el chequeo gratis, verificado.
- **Lo que no existe:** el kit. Cero construido — ni sección, ni archivo, ni rama (auditado el
  10-sep, sigue igual). Es lo único que cobra.
- **La ventana se acortó:** el estado consolidado del 10-sep hablaba de 82 días a la vigencia
  (1-dic-2026). Hoy quedan **~48**.
- **Y hay un riesgo nuevo encima:** el proyecto que posterga la ley un año (boletín 18.623-07)
  sigue **"En tramitación"**, último movimiento 01/09/2026. Si sale, la urgencia —que es el único
  activo diferencial de esta idea— se desinfla por 12 meses.
- **Lo que esto pide no es diseño, es un criterio con fecha.** Propuesta, para que Ramón decida:
  *si al 31-oct el kit no tiene una sección comprable publicada, la idea se cierra como sprint y
  el chequeo se queda solo como gancho de la agencia* — que ya funciona en ese rol (es el toque 2
  del outbound y subió el propio sitio a 100).

---

## C. Muertas, con el motivo y la URL que lo decide

| Idea | Veredicto | Lo que lo decide |
|---|---|---|
| **02 · Agente de agendamiento por WhatsApp** | Muerta (10-sep) | [Dentipilot](https://www.dentipilot.cl/precios-software-dental-chile) ya lo vende en Chile sobre la API de Dentalink, a $299.990/mes + IVA |
| **Agente de voz para clínica dental** (video 14-oct) | Muerta (14-oct) | [Dentalink IA](https://www.softwaredentalink.com/ia/en/start): contact center que atiende "por WhatsApp y teléfono 24/7", integrado a la agenda. Es un checkbox del sistema que la clínica ya paga |
| **Contenido automatizado** (E13) | **Muerta — y no por el incumbente: por marca** | Ver C1 |
| **Máquina de propuestas** (E13) | **Muerta por comprador** | Ver C2 |
| **Cotizador como producto suelto** (E13) | **Muerta como producto; sobrevive como componente (A2)** | Ver C3 |

### C1. Contenido automatizado — muere por marca, que es peor que morir por competencia
El incumbente existe (es un módulo de las herramientas que cualquier agencia ya paga), pero no es
eso lo que la mata. La mata que **SpindleLab vende exactamente lo contrario**: el manual de marca
exige pase humano antes de publicar y declara que el copy con olor a IA es anti-credibilidad. Y
hay evidencia propia del costo: el blog en vivo acumula **68 rayas largas** en 5 artículos, el tic
que el propio manual prohíbe. Vender producción automatizada de contenido sería vender el defecto
que la casa cobra por corregir. **No se abre, ni en versión chica.**

### C2. Máquina de propuestas — muere por comprador
[PandaDoc](https://www.proposify.com/blog/pandadoc-pricing) parte en **USD 19/mes** (Starter) y
USD 49 (Business) y ya cubre propuesta, cotización, CPQ, firma y cobro; Proposify desde USD
49/usuario. ⚠️ Precios de comparativas de terceros, **no verificados en la página oficial** — si
alguna vez se reabre, se verifican antes de citarlos. El punto no es el precio: es que el
comprador de una "máquina de propuestas" es un freelance o una agencia chica, el que paga menos y
cambia de herramienta más rápido. Y se compite contra algo que cuesta USD 19.

### C3. Cotizador — muere como producto, por reutilización
Defontana lista "Cotizaciones" dentro de sus planes de ERP ([ficha de
comparasoftware](https://www.comparasoftware.com/defontana) — plan Gold/Platinum, **fuente de
México, no verificada para Chile**), y PandaDoc lo incluye desde USD 19/mes. Pero el motivo real
es el filtro 2: **la lógica de precios es distinta en cada negocio**, así que lo que se rearma por
cliente es justamente el producto. Sin apalancamiento. Como componente de un sitio, en cambio, el
código sí se reutiliza → pasa a **A2**.

---

## Lo que E13 pedía por escrito

Confirmado: **esta sesión aplica descarte 0 y la prueba de reutilización antes de proponer
cualquier idea de video**, y antes de escribir brief. Ya se aplicó dos veces con resultado de
muerte (agente de voz dental el 14-oct; los tres de arriba). Las tres líneas pedidas están en C1,
C2 y C3, cada una con la fuente que la decide. **E13 queda cerrado.**

## El resumen en cuatro líneas

- **Dentro:** el panel de visibilidad con marca del cliente (A1) es la única idea nueva que vale,
  y entra como entregable, no como producto.
- **Aparte:** solo Verifica y Cumple, y lo que necesita es un corte con fecha, no más diseño.
- **Muertas:** cinco, todas con URL. Tres de ellas se habrían ahorrado con diez minutos de
  descarte 0.
- **Lo que de verdad desbloquea el trimestre no es una idea nueva:** es el caso propio 36 → 100 y
  la página de precios que no existe.
