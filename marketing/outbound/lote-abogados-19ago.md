# Lote outbound — Estudios de abogados (19 ago 2026)

**Origen:** `ventas/contactos-abogados-santiago.csv` (157 estudios, decisor + email verificado).
**Tracker:** `marketing/outbound/envios-abogados-19ago.csv` (sembrado, estado `Redactado`).
**Estado:** BORRADOR para aprobación de Ramón. **No enviado.** Envío a mano desde `hola@spindlelab.cl` (Gmail web), respetando la rampa (tope 50/sem). **Emilia no envía.**

**Regla de oleadas (deliverability):**
- **1ª ola = 15 de dominio limpio** (los de abajo). Van primero.
- **2ª ola = 142 catch-all** — NO en el primer envío (riesgo de rebote). Se redactan después, en oleadas chicas.

**Método del gancho (verificado, no inventado):** por cada estudio se lee el sitio con un lector automatizado (los que usan buscadores y motores de IA) y se busca un hallazgo técnico real. Sin hallazgo verificado, no sale el correo. Hallazgo típico en abogados: **sin datos estructurados (JSON-LD) ni meta description** → la IA no "entiende" al estudio; o **bloqueo 403/Cloudflare** → invisible a los bots.

> ⚠️ **Nota de calidad:** algunos dominios de email NO coinciden con el sitio del estudio (ej. `lamtex.cl` de "Lam y Rojas" es una tienda de ropa corporativa). Esos van marcados "VERIFICAR DOMINIO" en el tracker — hay que confirmar la web real antes de escribirles.

---

## Secuencia F-D · Abogados (3 toques · día 0 / 4 / 10 · ≤120 palabras)

El **Toque 1** se personaliza 1:1 con el hallazgo real (ver borradores). Toques 2 y 3 son casi fijos:

### Toque 2 (día 4) — el costo de no aparecer
**Asunto:** Re: [asunto del toque 1]

Hola [NOMBRE]:

Quien busca abogado hoy compara antes de llamar —primero Google, ahora también ChatGPT—. Y en una categoría sensible (lo que Google llama YMYL: *tu dinero, tu vida*), los motores de IA exigen señales de confianza claras: datos estructurados, autoría identificable, coherencia entre el sitio y lo verificable. Casi ningún estudio en Chile las tiene implementadas. El primero del área que las ponga corre con ventaja.

Sigue en pie el mini-diagnóstico gratis de 1 página. Un «ok» basta para que te lo envíe en 48 h.

SpindleLab · spindlelab.cl

### Toque 3 (día 10) — cierre limpio
**Asunto:** Cierro el tema

Hola [NOMBRE]:

Último correo, prometido. Si la visibilidad de [EMPRESA] en buscadores y motores de IA no es prioridad este semestre, todo bien — te dejo el blog por si sirve más adelante: spindlelab.cl/blog.

Si en algún momento quieres el diagnóstico, la puerta queda abierta.

Buen resto de semana.

SpindleLab · spindlelab.cl

---

# Borradores de muestra (Toque 1) — para aprobar el tono

## 1. Jorge Pacheco — Pacheco Martínez y asociados · pmyasociados.cl ✅ verificado
**Cargo:** Socio y Litigante · **Áreas:** familia, laboral, sindicatos, empresas
**Hallazgo (leído hoy):** el sitio se lee bien (título + H1 claros), pero **no tiene datos estructurados (JSON-LD) ni meta description**.

**Asunto:** pmyasociados.cl no le dice a ChatGPT qué hace tu estudio — lo revisé

Hola Jorge:

Antes de escribirte leí pmyasociados.cl con las mismas herramientas automatizadas que usan Google y los motores de IA. El sitio se lee bien, pero no tiene datos estructurados —el "schema" que le avisa a una IA que son un estudio de familia y laboral en Santiago— ni meta description. Para ChatGPT o Perplexity eso hace difícil "entender" al estudio y recomendarlo cuando alguien pregunta por un abogado de familia en Santiago.

Me dedico justo a eso: SEO técnico y visibilidad en motores de IA, en rubros donde la confianza pesa —como el legal—.

¿Te preparo un mini-diagnóstico de 1 página de Pacheco Martínez en 48 horas? Gratis, sin compromiso, y te quedas con el documento.

SpindleLab — SEO técnico y visibilidad en IA · spindlelab.cl

---

## 2. Cristóbal Sánchez — Estudio Jurídico Problemas.cl · problemas.cl ✅ verificado
**Cargo:** Abogado · **Foco:** defensa de deudas, familia, laboral, penal, civil (marca de consumo)
**Hallazgo (leído hoy):** buen contenido, título y H1 claros, pero **sin meta description ni JSON-LD**.

**Asunto:** problemas.cl: buen contenido, pero "invisible en datos" para ChatGPT

Hola Cristóbal:

Leí problemas.cl con las herramientas que usan los buscadores y los motores de IA. El contenido está bien y el foco —defensa de deudas, familia, laboral— es claro para una persona. Pero el sitio no tiene datos estructurados (schema.org) ni meta description: justo los datos que una IA necesita para saber qué hacen y recomendarlos. Hoy, quien le pregunta a ChatGPT «¿a qué abogado acudo por una deuda en Santiago?» difícilmente los verá.

A eso me dedico: SEO técnico y visibilidad en motores de IA.

¿Te preparo un mini-diagnóstico de 1 página en 48 horas? Gratis, sin compromiso, y te quedas con él.

SpindleLab — SEO técnico y visibilidad en IA · spindlelab.cl

---

## 3. Yamir Rivera — Sims Abogados · simsabogados.cl ✅ verificado
**Cargo:** Legal Director · **Áreas:** civil, laboral, familia, consumidor, tránsito, penal
**Hallazgo (leído hoy):** **falta la etiqueta de título (`<title>`)** en la portada, y tampoco hay meta description ni JSON-LD.

**Asunto:** simsabogados.cl no tiene título en su portada — lo vería cualquier buscador

Hola Yamir:

Antes de escribirte revisé simsabogados.cl con las herramientas automatizadas de los buscadores y los motores de IA. Noté algo puntual: la portada no tiene etiqueta de título —el "title" que aparece en la pestaña del navegador y en Google— y tampoco meta description ni datos estructurados. Son de los arreglos más directos, pero hoy le restan visibilidad al estudio justo cuando alguien busca «abogado laboral» o «de familia» en Google, o se lo pregunta a ChatGPT.

Me dedico a eso: SEO técnico y visibilidad en motores de IA.

¿Te preparo un mini-diagnóstico de 1 página de Sims en 48 horas? Gratis y sin compromiso.

SpindleLab — SEO técnico y visibilidad en IA · spindlelab.cl

---

## 4. Héctor Arce — Defensas en Juicio Chile · defensasenjuicio.cl ✅ verificado
**Cargo:** Abogado Jefe del Área Civil · **Marca de consumo** (defensa en juicios)
**Hallazgo (leído hoy):** el sitio devuelve **HTTP 403 (bloqueo tipo Cloudflare)** — no deja pasar a los lectores automatizados.

**Asunto:** defensasenjuicio.cl le muestra una pared a ChatGPT, no tu sitio — lo comprobé

Hola Héctor:

Antes de escribirte intenté leer defensasenjuicio.cl con las mismas herramientas automatizadas que usan los buscadores y los motores de IA. En vez del sitio, el servidor devuelve un bloqueo (error 403), la pared que corta el paso a los bots. Lo probé y se repite.

El problema: ChatGPT, Perplexity y compañía no acceden al contenido real del estudio. Todo lo que muestran queda invisible para un motor de IA cuando alguien pregunta por un abogado en Chile. No es un tema de contenido: es un bloqueo técnico puntual, de los más directos de corregir.

¿Te preparo un mini-diagnóstico de 1 página en 48 horas? Gratis, sin compromiso.

SpindleLab — SEO técnico y visibilidad en IA · spindlelab.cl

---

## Resto de la 1ª ola (pendientes de redactar tras aprobar el tono)
Vermehren (vabogados.cl), Fuentes y Asociados (redirige a fuentesjuul.cl — verificar), Cuche López (cuche.cl), RMR Laboral (rmrlaboral.com), CS Compliance (cscompliance.cl), Corral y García (corralygarcia.cl), LMA/Lagos Maclean (lmabogados.cl), Vergara Fernández Costa & Claro (vfcabogados.cl), BG Abogados (bustosgomez.cl), BCP Abogados (bcp.cl). **Lam y Rojas (lamtex.cl): verificar dominio antes.**
