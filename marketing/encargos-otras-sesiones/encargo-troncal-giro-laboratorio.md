# Encargo · El giro del 16-oct: SpindleLab como estudio de diseño y tecnología

**Fecha:** 16-oct-2026, 14:05 (Chile)
**De:** el estudio web, al encuadrar la obra E12 del v3. Lo escribe Mauro.
**Para:** la troncal (Tomás).
**Decide y edita:** la troncal, con Ramón. Desde la rama del estudio web (`claude/magical-franklin-ckfki2`) no se
toca ningún documento compartido de seguimiento ni de marca: este encargo solo avisa qué cambió y dónde puede quedar
desalineado.

---

## 0 · En dos líneas

1. Ramón cambió el posicionamiento: SpindleLab se presenta como **estudio de diseño y tecnología («laboratorio
   digital») que también hace SEO técnico y visibilidad en IA**. Precios y oferta no cambian.
2. Varios documentos compartidos todavía dicen que SpindleLab es una consultoría de SEO técnico y visibilidad en IA.
   Cuáles se actualizan, cuándo y con qué palabras lo decides tú con Ramón.

## 1 · Qué cambió, y de dónde sale

**La fuente es una transcripción, no un documento de Ramón.** Lo que escribió en la sesión del estudio web el 16-oct
(entre las 13:50 y las 14:00) está copiado tal cual en
`marketing/oficina/obras-web/spindlelab-v3/e12/insumos-ramon-16oct.md` (commit `2618cb4`). Según el protocolo de
CLAUDE.md, antes de canonizarlo en un documento de nivel 1 a 3, confírmalo con él.

Sus cuatro respuestas, resumidas (el texto completo está en ese archivo, §4):

| Tema | Lo que decidió |
|---|---|
| Posicionamiento | Estudio de diseño y tecnología que **también** hace SEO técnico y visibilidad en IA. Esos servicios y el chequeo quedan como servicios y como la parte «Logic» que se puede comprobar. **Precios y oferta siguen**, idénticos a `spindlelab-astro/src/data/oferta-v3.json` y `servicios-v3.json` |
| Stack del sitio | Astro + Tailwind + Motion. No Next.js |
| Casos | Solo lo medido. Donde no hay métrica, no se pone |
| Referencia | Koto (koto.com) manda y el brief que pegó orienta; segundo referente, Accept & Proceed |

**Cómo lo lee el estudio web** (`marketing/oficina/obras-web/spindlelab-v3/e12/brief-de-obra.md` §1 y §2, que espera
la compuerta 1 de Ramón):

- **La frase de trabajo:** «SpindleLab es un estudio de diseño y tecnología: diseñamos y programamos sitios y
  herramientas a medida, y lo que construimos se puede medir. También hacemos SEO técnico y visibilidad en IA, como
  servicios y como la parte que se comprueba.» Es una propuesta para el sitio, no el texto final: el copy lo escribe
  Clara y lo prueba con lectores fríos.
- **Lo que no dice:** «IA propietaria», «modelos RAG», «programamos inteligencia» como hecho. El inventario no tiene
  un solo proyecto de IA a medida para un cliente.
- **El comprador:** el estudio web asume que es el mismo (dueños, socios y gerentes de pymes B2B y estudios), y se lo
  pregunta a Ramón en la compuerta 1 (pregunta 1), porque los textos que pegó le hablan al «C-Level» y al «CTO».
  Si Ramón dice que el giro busca otro comprador, eso es tuyo: lista, canales y estrategia.

**Qué no cambió:** los seis servicios, sus planes y precios; el chequeo de 21 señales; el mini-diagnóstico; la regla
de cero prueba social inventada; «No te prometo. Te muestro.».

## 2 · Dónde puede quedar desalineado

Leído el 16-oct en la rama `claude/magical-franklin-ckfki2` (base `947e6e1`). Verifica cada línea contra `main` antes
de editar: algunas pueden estar distintas allá.

| Documento | Lo que dice hoy | Por qué puede chocar |
|---|---|---|
| `contexto-agente-spindlelab.md:4` (nivel 1, fundación) | «consultoría unipersonal de SEO técnico + visibilidad en motores de IA (AEO/GEO) para empresas B2B y financieras chilenas» | El marco pasa a ser el estudio de diseño y tecnología. El archivo ya venía atrasado en otras cosas (precios, anonimato) |
| `marketing/brand/manual-de-marca.md` §01 (`:73`) | «SpindleLab hace que las empresas aparezcan cuando sus clientes preguntan, en Google y en los motores de IA.» | Es el posicionamiento del manual. La personalidad del mismo §01 ya habla de «un laboratorio de creatividad», así que puede bastar con mover esa idea al centro. El color, la letra y el wordmark (§02 a §07) cambian después de la compuerta 2 de E12, con su propio aviso; el logo y la regla del oro ya están en revisión desde el 16-oct |
| `marketing/estrategia-marketing-spindlelab.md` §1 (`:19`) y §4 (`:83-85`) | La promesa «Tus futuros clientes ya le preguntan a ChatGPT. Yo me encargo de que la respuesta seas tú.» y «especialista técnico en el problema nuevo (visibilidad en motores de IA)» | La promesa central deja de ser la del frente. El ciclo de 90 días venció el 5-oct sin retrospectiva (B27 en `pendientes-traspaso-revisados.md` §3) |
| `marketing/oficina/clientes/spindlelab.md:3-6` (ficha, nivel 4) | «Consultoría de SEO técnico + visibilidad en motores de IA (AEO/GEO) […], más la línea de Desarrollo Web» | Se invierte el orden: el estudio primero, SEO e IA como servicios. «Mostramos, no prometemos» sigue calzando |
| Ficha, Mini-diagnóstico (`:138`) | Tagline del encabezado: «Un motor de adquisición · SEO técnico y visibilidad en IA como eje» | El documento que reciben los prospectos presenta la casa con el marco anterior |
| `marketing/redes/marca-personal/perfil-linkedin.md:16-22`, `:32`, `:50` | Titulares, «Acerca de» («orquestando un motor de adquisición con el SEO técnico y la visibilidad en IA como eje») y cargo «Fundador · Consultor de SEO técnico y visibilidad en IA» | Bio y cargo de Ramón. El mismo cargo está en el JSON-LD del sitio (R5): conviene que cambien juntos |
| `marketing/brand/redes/perfil-instagram.md:8` (y la página de empresa en LinkedIn, si dice lo mismo: no se revisó) | «SEO técnico y visibilidad en IA para empresas chilenas.» | Bio pública |
| `marketing/plantillas/emails-fase0.md`, `.claude/skills/agente-outbound/SKILL.md`, `.claude/skills/mini-diagnostico/SKILL.md` | Plantillas y skills del outbound y del diagnóstico | Si el correo frío presenta una consultora de SEO y el sitio un estudio de diseño, el prospecto ve dos empresas. Ojo: la puerta del outbound a abogados es un hallazgo técnico de su sitio, y esa puerta el brief la mantiene (la parte Logic) |
| `ventas/pipeline-prospeccion.md:19-22` | Cargo objetivo por tamaño: gerente general, socio o fundador (11 a 50); gerente de marketing (51 a 200) | Solo si Ramón dice que el giro busca otro comprador (pregunta 1 del brief) |
| `ventas/pipeline.md` | Sin cambio directo: el giro no mueve ninguna fila | Si el giro cambia cómo se clasifica la fuente o la línea de servicio de un prospecto, lo decides tú |
| `marketing/plan-operativo-90-dias.md` | Plan vencido el 5-oct | Si se registra el giro, va aquí o en el plan siguiente |
| `marketing/decision-pendiente-pivote-webdev-2026-09-27.md` | «EN MANOS DE RAMÓN», con tres reparos al pivote del 27-sep | El giro del 16-oct responde en parte a esa misma pregunta (el sitio y el estudio al centro). Sus reparos siguen vigentes y el brief los respeta: el retainer no se renombra ni cambia de precio, no se promete monitoreo continuo en IA (R2 abierta) y quien no va a rehacer su sitio conserva su puerta (el chequeo, la auditoría, la visibilidad). Conviene que su estado diga qué pasó |
| `laboratorio/README.md` (raíz del repo) | «Laboratorio» = ideas de ingreso **fuera de la agencia** (3-sep) | Con el giro, «laboratorio» pasa a nombrar a la agencia misma. Dos sentidos para la misma palabra en el repo confunden a la próxima sesión |
| `CLAUDE.md:7` y las skills `agente-seo-aeo` (`:3`, «Entrega del servicio core») y `agente-troncal-marketing` (`:79`, «Simón (SEO/AEO, el servicio core)») | «a solo consultancy (SEO técnico + visibilidad en motores de IA / AEO/GEO)»; SEO e IA como «servicio core» | Los lee cada sesión al arrancar. CLAUDE.md es configuración: lo cambia Ramón o quien él autorice. Si cambian las skills, recrear las sesiones largas (CLAUDE.md, «Skills are scanned once») |

**Del sitio, para que no lo dupliques:** `spindlelab-astro/public/llms.txt` (presenta la casa como «agencia de
marketing con IA») y el `jobTitle` de `Layout.astro` (R5) son del estudio web y se resuelven en la construcción de
E12 o en la lista de publicación (`lista-publicacion.md`), con el permiso de Ramón que ya exige `Layout.astro`.

## 3 · Lo que hace el estudio web, y lo que no

- **Hace:** el brief de E12 (compuerta 1 abierta, cinco preguntas), después el lock de Koto y Accept & Proceed, dos
  direcciones para la compuerta 2, la spec y la construcción bajo `/v3/`, sin publicar.
- **No hace:** editar ninguno de los documentos del §2, ni `main`, ni el pipeline, ni el plan, ni los trackers de
  outbound. Tampoco publica nada ni reenciende Ads.
- **Necesita de vuelta:** nada para seguir. Si al canonizar el giro cambia algo que el brief asume (el comprador, la
  oferta, el orden de los servicios), avísalo con un encargo en esta carpeta.

## 4 · Registro

- Brief: `marketing/oficina/obras-web/spindlelab-v3/e12/brief-de-obra.md`.
- Decisión: fila del 16-oct (E12) en el §7 de `marketing/oficina/obras-web/spindlelab-v3/spec-visual.md`.
- Estado de la obra: «Estado al 16-oct, 14:05 (E12)» en
  `marketing/oficina/obras-web/spindlelab-v3/pendientes-traspaso-revisados.md` §2.
- En pausa: E10 (The Ready) con su encargo de fotos con IA (`encargo-e10-fotos-ia.md`), y E11 (texto).
