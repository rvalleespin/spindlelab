# Encargo · El giro del 16-oct: SpindleLab como estudio de diseño y tecnología

**Fecha:** 16-oct-2026, 14:05 (Chile) · **actualizado a las 19:50** con la compuerta 1 de E12: el manual de marca
antiguo queda sin efecto en diseño (§5)
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
- Compuerta 1 de E12 (16-oct, 19:20 a 19:45): sección «Compuerta 1» del brief; fila del 16-oct (compuerta 1) en el §7
  de `spec-visual.md`; «Estado al 16-oct, 19:50» en `pendientes-traspaso-revisados.md` §2; el paso 2, en
  `marketing/oficina/obras-web/spindlelab-v3/e12/encargo-paso-2.md`.

---

## 5 · Actualización del 16-oct, 19:50: el manual de marca antiguo queda sin efecto en diseño

**Qué decidió Ramón.** En la compuerta 1 de E12 (16-oct, entre las 19:20 y las 19:45): «en diseño regirse por la
referencia. el manual antiguo se olvida. ahora tenemos que cambiar». Registro: `e12/brief-de-obra.md`, sección
«Compuerta 1», punto 7. Como en §1, la fuente es la conversación de Ramón con la sesión del estudio web, copiada por
esa sesión: no hay un documento suyo. Confírmalo con él antes de canonizarlo en un documento de nivel 1 a 3.

**Cómo lo lee el estudio web** (supuesto reversible en una línea: «en diseño» limita la decisión al aspecto):

| Queda sin efecto en diseño | Sigue |
|---|---|
| `marketing/brand/manual-de-marca.md` v3.0: §02 wordmark, §03 monograma, §04 color (el lienzo negro y los cuatro campos), §05 tipografía (Manrope, Gabarito, Inter), §06 el punto dorado (`#C9A227` y la regla de un uso por pieza), §07 forma y movimiento, §07b imagen, y §10 Instagram en lo que es aspecto (color por pilar, escala, retícula; los formatos y zonas seguras son de la plataforma) | §08 voz; cero prueba social inventada; ningún prospecto ni cliente nombrado sin permiso; ninguna raya usada como golpe; todo lo público pasa por revisión humana. §01 (esencia) ya estaba en revisión por el giro (§2 de este encargo) |

**De dónde sale la identidad nueva.** De E12, después de la compuerta 2: Ramón elige entre dos direcciones sobre base
negra con juegos de blanco u otros colores (A Archivo, con Google Sans Flex; B Banco, con Mona Sans; DM Mono en las
dos) y ve dos o tres caminos de wordmark de Bruno. Cuando esté elegida, el estudio web te deja un encargo en esta
carpeta con la letra, los colores con su rol y contraste, y el logo, para que el manual nuevo se escriba desde ahí.
Quién lo escribe y cuándo lo decides tú con Ramón. **Hasta entonces no hay identidad nueva que aplicar**: lo único
público es la vieja.

**Lo que decides tú mientras tanto: qué hacen las piezas de redes y el outbound que hoy usan el manual viejo.** Dónde
vive (leído el 16-oct en la rama `claude/magical-franklin-ckfki2`; verifica contra `main`):

| Dónde | Qué usa del manual viejo |
|---|---|
| `CLAUDE.md`, «Brand & content rules» (`:120-121`) y «Render a brand/social asset» (`:105`) | El oro escaso `#C9A227` como regla no negociable, Gabarito y Inter, y `Gabarito.woff2` + `inter.woff2` en cada carpeta de pieza. Es configuración: la cambia Ramón o quien él autorice, y cada sesión la lee al arrancar |
| `marketing/oficina/clientes/spindlelab.md:13` | «Oro `#C9A227` escaso (un uso por pieza)» en el contrato de marca de la ficha |
| `contexto-agente-spindlelab.md` | El brief fundacional, que ya venía atrasado (§2) |
| `marketing/brand/instagram-v3/`, `marketing/brand/og-v3/`, `marketing/brand/redes/portada-facebook/`, `marketing/brand/logo/`, `marketing/brand/firmas/` | El kit de Instagram, las imágenes OG, la portada de Facebook, el logo y las firmas de correo |
| `marketing/redes/2026-10-octubre/` y `2026-10-octubre-verifica/` | Las piezas de octubre por publicar, armadas con el manual viejo |
| `marketing/plantillas/mini-diagnostico/` (plantilla, guía y las dos letras) y `marketing/plantillas/cotizaciones/plantilla-cotizacion.html`, con `.claude/skills/cotizaciones/plantilla_generador.py` | Los dos documentos que recibe un prospecto: el mini-diagnóstico y la cotización |
| `marketing/oficina/memoria/bruno-direccion-creativa.md` y las skills que producen piezas (`persona-director-creativo`, `persona-social-media`) | Lo que Bruno y Cata recuerdan como regla. Si cambian las skills, recrear las sesiones largas (`CLAUDE.md`, «Skills are scanned once») |

Tres caminos, para que elijas con Ramón (el estudio web no decide esto):

1. **Seguir con el manual viejo en lo que ya circula** (redes, firmas, mini-diagnóstico, cotización) hasta que la
   identidad nueva esté elegida, sin producir activos de marca nuevos que habría que rehacer (kits, plantillas,
   portadas). El sitio nuevo no se publica antes de la compuerta 2 ni de R1, así que nadie ve dos marcas a la vez
   hasta entonces.
2. **Pausar las piezas visuales nuevas** hasta la compuerta 2. Cuesta cadencia en LinkedIn e Instagram.
3. **Piezas de transición** sin oro ni Gabarito. Cuesta un tercer lenguaje que tampoco va a quedar.

La lectura del estudio web, que no es decisión: la 1 es la más barata, porque la identidad nueva todavía no existe y
el sitio no sale antes que ella.

**Otras dos cosas de la misma compuerta que tocan documentos tuyos:**

- **Bernardo Combeau** (punto 2): «no se necesita más permiso. ya lo pedí hace un rato». El caso puede llevar
  grabaciones de su sitio y de su panel y una medición fechada. La ficha de Bernardo (`oficina/clientes/bernardo-combeau.md:15`, «Caso público NO
  autorizado todavía») y `ventas/pipeline.md:26` («Permiso de caso público: aún no pedido») no lo reflejan; si lo registras, es con la confirmación de Ramón y sin respaldo escrito
  de Bernardo en el repo.
- **Praxi entra como caso del sitio de SpindleLab** (punto 3): «podría entrar praxi como caso ya que creó un sitio y
  una app». La ficha de Praxi (`marketing/oficina/clientes/praxi.md:5-6`) dice que es una marca distinta y que al
  producir para Praxi se olvida la identidad de la agencia; eso sigue valiendo para Praxi, pero desde ahora SpindleLab
  la muestra como trabajo propio. Si la ficha o el organigrama tienen que decirlo, es tuyo.

**Desde aquí no se toca** el manual, `CLAUDE.md`, las fichas, el pipeline, el plan ni las piezas de redes o de outbound.
