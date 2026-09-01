# SpindleLab (la casa)

- **Quién es / qué se le vende:** la propia agencia. Consultoría de **SEO técnico
  + visibilidad en motores de IA (AEO/GEO)** para empresas B2B y YMYL chilenas, más
  la línea de **Desarrollo Web**. Cuando la oficina trabaja "para SpindleLab" (su
  sitio, sus redes, su outbound), SpindleLab es el cliente.
- **Marca y tono (dónde vive el contrato):**
  - Manual de marca: `marketing/brand/manual-de-marca.md` (fuente de verdad).
  - Posicionamiento vigente: **"Mostramos, no prometemos"** —
    `marketing/plan-reposicionamiento-2026-08.md`. Evidencia por sobre promesa;
    nada de hype de "agencia con IA".
  - Voz: primera persona **singular** para lo observado/evidencial, **plural** para
    lo que entrega el negocio. Oro `#C9A227` escaso (un uso por pieza). Cero prueba
    social inventada; prospectos/clientes sin nombrar sin permiso.
- **Repo y ramas:** este repo (`SPINDLELAB`). Rama de producción: `main`. Sitio en
  **Astro v2**, deploy a Cloudflare Pages. `git push` no funciona desde Bash
  (Keychain) → se empuja por GitHub Desktop.
- **Restricciones:** nada de cifras/casos/testimonios inventados. Todo lo público
  pasa por revisión humana antes de salir (la marca vende criterio experto; copy
  con olor a IA es anti-credibilidad).
- **Quién aprueba:** Ramón.
- **Estado:** activo.

---

## Estado operacional — Paid media (para Gonzalo/Fran)

*Datos de cuenta de SpindleLab. Las skills de paid media son agnósticas del
cliente; su estado por cuenta vive acá.*

**Google Ads (Gonzalo):** cuenta correcta `597-527-6690` ("Spindlelab"), login
`hola@spindlelab.cl` (`authuser=1`). Existe una 2ª cuenta **vacía** en
`manuvalleespin@gmail.com` (`497-377-4579`, `authuser=0`) que Chrome abre por
defecto — verificar el número antes de diagnosticar. Acceso:
`https://ads.google.com/aw/campaigns?ocid=8402723510&authuser=1`. Campaña de
Búsqueda activa (14 jul), $1.500 CLP/día, conversión `generate_lead` desde GA4.
Criterio de corte: semana 12, ≥2 mini-diagnósticos originados en ads.

**Prospección (Dereck):** **Apollo está CANCELADO** (decisión de Ramón, 26-ago-2026,
tras el fallo de pago; los créditos se pierden — no reactivar sin su OK). Fuente
vigente: **Google Maps + curl** (validado 26-ago: JS extrae nombre+dominio → curl a
home y /contacto por email público + gancho técnico; ~65-74% usable, gratis, buzones
reales). Frentes: A = financiero/wealth · B = salud premium (dental/estética) ·
C = salud visual · D = estudios de abogados (validado 13-ago). Reglas de ICP en
`ventas/pipeline-prospeccion.md`. Los CSV caen en `ventas/contactos-*.csv` y el
**dedup contra `ventas/enviados/REGISTRO-enviados.csv` es obligatorio** antes de
pasar cualquier lista a Emilia.

**Canon de envíos (28-ago, decisión de Ramón):** máx **3 toques** por prospecto ·
**10/día** · tope duro **50/semana** (con 1 cliente activo: 25/sem; con 2: pausa).
2ª ola catch-all solo en lotes de 10-15/semana midiendo rebote: **si el rebote
supera el 5%, se corta**. Semana de Fiestas Patrias: cero lotes.

**Meta Ads (Fran):** Página FB `61592147941168` (portafolio propio `1025351160247165`);
IG profesional `@spindlelab.cl` (`17841414909841532`); cuenta publicitaria
`2050319242539058` (CLP, Santiago); **Meta Pixel `2885353628478565`** (evento `Lead`
en `/contacto/`; falta desplegar el Pixel en vivo + acumular tráfico antes de la 1ª
campaña). Primer uso previsto: **remarketing** de visitantes, no interés frío.

**Config exacta de la campaña de Google (Gonzalo) — no reconstruir desde cero:**
Búsqueda únicamente (sin Máx. rendimiento), $1.500 CLP/día. 4 keywords en frase/exacta:
«auditoría SEO», «consultor SEO técnico», «aparecer en ChatGPT empresa», «SEO clínicas
dentales». Display y Socios desactivados. 7 sitelinks (los 4 servicios + Método + Blog +
Visibilidad en IA). UTM `utm_source=google&utm_medium=cpc&utm_campaign=auditoria-seo`.
Negativa activa: `"seoptimer"` (frase). **NO** negativizar "gratis": la oferta real *es*
un mini-diagnóstico gratis. **Chequeo de rutina cada revisión: que IA Max siga apagada**
(la reintroduce Google) — se ve en la columna "Tipo de concordancia" del informe de
términos de búsqueda.

---

## Estado operacional — Medición (Nora)

Conversión ancla: **`generate_lead`** (GA4, importada como Principal, fuente "Spindlelab
Consultoria"). Solo se dispara en el **formulario de contacto** — si el clic aterriza en
otra página, no cuenta. Umbral de corte del paid: **semana 12, ≥2 mini-diagnósticos
originados en ads** → si no se cumple, se apaga. Reportes en `marketing/reportes/`.

---

## Estado operacional — Sitio y web (Diego)

Sitio propio en **Astro v2**, deploy a Cloudflare Pages (repo `SPINDLELAB`, rama `main`).
Convenciones al publicar un post: copiar la plantilla de un post existente (mismo
header/footer, clase `.prose` para el cuerpo, `.nota` para callouts, `.faq` con
`<details>`); **JSON-LD `@graph`** con `Article` + `BreadcrumbList` + `FAQPage`, autor
siempre `{"@id":"https://spindlelab.cl/#autor-ramon"}`; enlaces internos reales a
`/servicios/...`. Al publicar, actualizar **tres cosas**: el archivo, la tarjeta en
`blog/index.html` y la línea en `sitemap.xml`. El formulario de contacto **ya captura
UTM** (sessionStorage) y dispara `generate_lead` — no reconstruirlo. Los 4 servicios:
Auditoría SEO Técnica · Visibilidad en IA · Acompañamiento Mensual · Desarrollo Web.

---

## Estado operacional — Redes (Cata)

Canales: **LinkedIn** (principal, página de empresa) e **Instagram** (`@spindlelab.cl`,
secundario). Convenciones vigentes:
- Los **links van en el primer comentario**, no en el cuerpo del post.
- El **perfil personal de Ramón sí puede compartir/comentar** los posts de la página
  (relajado el 12-jul; da el empujón inicial de alcance). Al compartir, el comentario va
  en su voz personal (1ª persona); los posts de la página los firma la marca.
- **Cadencia:** página 2 posts/semana (mar y jue); cuenta personal ~1/semana (mié).
- **Formato de la cuenta personal** (no es reciclaje del de empresa): problema del cliente
  → por qué importa ahora (sin cifras/precios, "suenan robóticas") → la solución sin
  vender → storytelling con arco → CTA suave a un servicio. No abrir con "revisé el sitio
  de…" / "le pregunté a ChatGPT…" (ya cansó).
- Fuente de hallazgos reales: auditorías de `marketing/outbound/semana-*/lote-*.md`.
  **Anonimato de prospectos:** usar el hallazgo, nunca el nombre sin permiso.
- Formatos validados y plantillas en `marketing/plantillas/linkedin-posts.md`.

---

## Estado operacional — Mini-diagnóstico (Valen)

Reglas vigentes del documento (fijadas el 31-ago-2026, tras la revisión de Ramón del
SPL-DIAG-2026-006):

- **El ancla verificable es el chequeo público… cuando coincide con lo verificado a mano**: correr
  `GET https://spindlelab.cl/api/chequeo?dominio=X` y citar el puntaje invitando a reproducirlo.
  ⚠️ **Excepción conocida (31-ago)**: en sitios tras Cloudflare el chequeo puede NO ver las reglas
  de bots que Cloudflare inyecta en el borde (limitación arquitectural, declarada en el propio
  chequeo). Si el chequeo contradice lo que viste con curl, **el número NO se cita** y el ancla
  pasa a ser la fuente directa del prospecto (su propio /robots.txt, su HTML).
- **La corrección de mayor impacto se elige con la jerarquía del propio chequeo**: acceso >
  entidad > citabilidad. Si los bots de IA no pueden entrar (robots.txt), ESA es la corrección,
  siempre; el schema viene después. "Si los bots no entran, nada más importa" es doctrina
  publicada de la casa.
- **El documento habla el idioma del dueño, no el del técnico** (regla de Ramón, 31-ago): abre
  con lo que está en juego en SU negocio (cómo le llega un cliente nuevo y quién se lo está
  llevando), los hallazgos técnicos son la evidencia, y el cierre dice qué gana en sus términos.
  Nunca abrir con lo que NO se hizo (eso va en la letra chica).
- **Regala el paso 1 y haz visible la ruta completa** (tabla de 4 pasos con estado real:
  abrir la puerta → ser entendible → ser citable → medir entero). Si lo regalado es la única
  necesidad visible, el prospecto lo arregla solo y la venta muere. Molde: SPL-DIAG-2026-006 v3.
- **El cierre presenta el motor** (regla de Ramón 31-ago): 2 líneas con el motor completo +
  "precios publicados en el sitio" + CTA de 20 minutos + el link del chequeo.
- Tagline del encabezado: "Un motor de adquisición · SEO técnico y visibilidad en IA como eje"
  (la vieja "SEO técnico · Visibilidad en IA · Desarrollo web" quedó atrás).
- Sigue igual: cero hallazgos inventados, todo verificado con curl, UNA corrección (no lista),
  render mirado antes de entregar, numeración correlativa **verificada contra `git log --all`**
  (las carpetas 003-005 existen solo en historial; no reutilizar esos números).
- Plantilla de referencia: `marketing/diagnosticos/SPL-DIAG-2026-006-legalprisma/` (v2).

## Estado operacional — Entrega SEO/AEO (Simón)

Servicio core que se cobra. Apalanca los plugins de **searchfit** (`ai-visibility` =
el diferencial, `seo-audit`, `technical-seo`, `on-page-seo`, `schema-markup`,
`competitor-analyzer`, `keyword-clustering`). Entregables por cliente en
`ventas/entregas/<cliente>/`; detalle de fases en `ventas/proyectos-en-curso.md`. Los
cambios que tocan el sitio se le encargan a Diego vía `marketing/encargos-otras-sesiones/`.

---

## Estado operacional — Inteligencia de mercado (Marco)

Estudios en `marketing/inteligencia-mercado/` (plantilla `plantilla-estudio.md`, registro
vivo `competidores.md`). ICP por defecto: B2B y YMYL chileno. Directos más relevantes hoy:
**Best Solution** (misma esquina AEO-B2B) y **Nitten** (método SAGEO + índice público
IViA). Instagram solo desde Chrome logueado; el término útil para la ola IG es
"automatizacion con ia" (no "agencia de ia", que trae agencias de viajes).

## La jerarquía documental de SpindleLab (dónde vive cada verdad)

Cuando Ramón decide algo, se escribe en el nivel que corresponde; toda sesión nueva
hereda leyendo de arriba hacia abajo. (Regla de la skill del troncal: canonizar en el
mismo turno, con fecha, porqué y fecha de revisión.)

| Nivel | Documento | Qué define |
|---|---|---|
| 1. Fundación | `contexto-agente-spindlelab.md` (raíz del repo) | Qué es SpindleLab y a quién vende |
| 2. Marca | `marketing/brand/manual-de-marca.md` | Voz, visual, lo prohibido |
| 3. Estrategia | `marketing/estrategia-marketing-spindlelab.md` | Plan 90 días, checkpoints, kill-criteria |
| 4. Estado vivo | esta ficha | Reglas operacionales vigentes por área |
| 5. Campaña | `marketing/rebranding-2026-08-brief-comunicacion.md` (v2 + addendums) + `marketing/calendario-editorial.md` | Mensaje y grilla del mes |
| 6. Tarea | `marketing/encargos-otras-sesiones/` | Qué hace cada rol esta semana |

Decisión vigente de ejemplo (31-ago): **los precios propios no se queman en piezas de
redes durante la etapa inicial** — vive en el addendum del brief v2, con revisión al
cierre de mes.

## Estado operacional — Interacción y tráfico (decisión de Ramón, 1-sep-2026)

- **Objetivo del mes: tráfico al chequeo.** Las piezas invitan a interactuar, no solo a mirar.
- **Instagram: gancho de comentarios** ("Comenta CIRCUITO y te mandamos el link por DM").
  Herramienta: **ManyChat** (partner oficial de Meta; keyword del mes: CIRCUITO). Mientras
  Ramón no conecte la cuenta, los DM se responden a mano con la plantilla del publicar.md
  del día. En IG esto no es fricción artificial: los links no son clicables y el DM es la
  entrega real.
- **LinkedIn: JAMÁS automatizar DMs** (viola los términos, arriesga la cuenta). El juego ahí:
  link en el primer comentario + pregunta genuina al cierre del post; DMs a mano si los piden.
- **Modelo de trabajo del contenido (misma fecha):** el día a día (copys, ajustes, publicar)
  se trabaja DIRECTO en la sesión troncal con los moldes de los especialistas; las sesiones
  aparte quedan para trabajos gruesos (concepto, mes completo de piezas, blogs largos, lotes).
  Origen: dos mañanas seguidas de enredo por cadenas de archivos/sesiones para piezas ya listas.

### Actualizaciones del 1-sep (Ramón, tarde)
- **Handle de Instagram cambiado: `@spindlelab.cl`** (antes @spindle.lab) — mejor recordación,
  calca el dominio. Bio apuntando a `spindlelab.cl/diagnostico` ✅.
- **ManyChat CONECTADO** ✅: keyword `CIRCUITO`, activo sobre el post del dominó (1-sep). Para
  cada post nuevo con gancho: Automation → agregar el post al trigger existente (un clic).
  Regla intacta: solo Instagram; en LinkedIn los DM van a mano.
- **Metricool ADOPTADO para programar** (revierte la decisión del 28-ago de publicación 100%
  manual — decisión de Ramón, 1-sep). Flujo: los `publicar.md` de las carpetas-día son la
  fuente; Ramón copia, programa en Metricool y listo. El pase humano sigue: nada entra a
  Metricool sin que él lo haya leído.

### Reglas de Ramón del 1-sep (tarde) — correcciones al plan de la semana
1. **Stories sueltas: NO por ahora.** Con pocos seguidores no mueven la aguja. Solo se usan
   para re-compartir publicaciones del feed (gesto manual de Ramón). El plan de stories
   independientes queda archivado hasta tener base de seguidores.
2. **TODA pieza nueva se produce bajo el MUNDO del concepto** (fotografía física del
   dominó/consecuencias, manual §06b). Las fichas tipográficas planas del sistema v2 SOLAS
   ya no pasan el pase: son sistema, no campaña. Piezas pre-concepto se RE-VISTEN antes de
   entrar a cualquier grilla.
3. **LinkedIn (empresa y personal) ya recibieron su apertura** con el dominó el mar 1.
   El anuncio v2-motor y el post ancla quedan EN RESERVA, listos, para reprogramar cuando
   Ramón lo decida — no se re-sirve un slot ya cubierto.
