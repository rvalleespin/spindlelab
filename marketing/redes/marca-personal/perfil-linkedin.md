# Kit de perfiles: LinkedIn de Ramón, página de SpindleLab e Instagram

Lo que Ramón pega a mano en los perfiles. Arriba va la versión vigente; abajo queda la anterior como historia.

---

## Versión 2-nov-2026 (vigente): sitio nuevo

**Preparado por:** Renata (agente-copywriter) · lunes 2-nov-2026
**Estado:** listo para que Ramón lo revise y lo pegue a mano. Ninguna sesión entra a estas cuentas ni publica nada.
**Por qué cambia:** el viernes 30-oct salió el sitio nuevo con la línea que decidió Ramón. Rótulo: «Sitios web a medida y marketing con IA». Titular de la home: «En redes arriendas. Tu sitio es lo único que es tuyo.» Acción principal: «Hablemos de tu sitio», que lleva a `/contacto/`.
**De dónde sale cada frase:** el sitio vivo, leído con `curl` el 2-nov (`/`, `/contacto/`, `/nosotros/`, `/metodo/`, `/llms.txt`), y `spindlelab-astro/src/data/archivo/texto/*.json`. Nada que no diga el sitio.
**Lo que cambia respecto de agosto:**
- No se nombran agencias ni clientes del pasado. La trayectoria se dice como en `/nosotros/`: años en agencias de medios y de marketing.
- La acción es «Hablemos de tu sitio». El chequeo sigue existiendo, se llama «chequeo» y va segundo.
- El plazo que se puede decir es «un día hábil». «24 horas» y «mini-diagnóstico» no se usan.
- El panel para editar textos y fotos viene en todos los planes de Desarrollo web (Ramón, 30-oct).

**Cómo se contaron los caracteres:** `python3 -c 'print(len("..."))'` sobre el texto exacto de cada bloque; los saltos de línea cuentan uno. Límites de cada campo entre paréntesis.

### 1. Perfil personal de Ramón (singular)

#### Titular (máx. 220 caracteres)

**A, recomendada (62 de 220):**
```
Fundador de SpindleLab: sitios web a medida y marketing con IA
```

**B (157 de 220):**
```
Fundador de SpindleLab · Sitios web a medida y marketing con IA · Parto por tu sitio y le conecto la búsqueda en Google y en las IA, los anuncios y las redes
```

*Recomendación: la A.* Es, palabra por palabra, el `jobTitle` que el sitio declara para Ramón en sus datos estructurados (`/nosotros/` y la home), así que LinkedIn y el sitio describen igual a la misma persona. Y es corta: en comentarios y en resultados de búsqueda LinkedIn suele recortar el titular, y la A se lee entera. La B explica el método, pero eso ya lo hace el Acerca de.

#### Acerca de (máx. 2.600 caracteres) · 1.161 caracteres, 209 palabras contando las dos direcciones

```
Soy Ramón Vallejos, fundador de SpindleLab. Hago sitios web a medida y marketing con IA.

Trabajé años en agencias de medios y de marketing. Ahí vi dónde se pierde lo que una marca invierte para atraer clientes: casi nunca en el anuncio, casi siempre en el lugar al que el anuncio lleva.

Por eso parto por el sitio. Lo diseño y lo programo, con un panel para que lo edites tú, y le conecto la búsqueda en Google y en las IA, los anuncios y las redes. No te pido que dejes las redes, pero ahí arriendas, y lo que traen tiene que terminar en algo tuyo.

Trabajo con agentes de IA dentro del equipo y respondo yo por cada entrega. El código lo reviso antes de que llegue a tu sitio.

También construí dos herramientas abiertas y gratis: el chequeo de spindlelab.cl/diagnostico y Verifica y Cumple, para la Ley 21.719 de datos personales.

Estudié Comunicación Publicitaria en la Universidad Andrés Bello y tengo un máster en Marketing Digital y E-commerce de la Universidad de Barcelona.

Hablemos de tu sitio. Si ya tienes uno, te lo reviso gratis y en un día hábil te mando lo que encontré. Si no, te cuento cómo lo haría y cuánto cuesta.
spindlelab.cl/contacto
```

*Notas de tono.* La primera línea es lo que se ve antes del «ver más», y por eso ya dice qué hace. El párrafo de las redes concede antes de contradecir, que es como habla Ramón en lo publicado («No te pido que dejes las redes, pero ahí arriendas»). Sin cifras, sin clientes, sin agencias por su nombre, sin raya, y los dos puntos aparecen solo dos veces. Si hay que cortar para llegar a 200 palabras, sale «El código lo reviso antes de que llegue a tu sitio.», pero es la frase que contesta la duda obvia sobre los agentes de IA.

#### Experiencia: el cargo en SpindleLab

**Cargo (máx. 100):** `Fundador` (8)
**Empresa:** SpindleLab (la página de la empresa, para que salga el logo) · fecha de inicio: la real, la pone Ramón.
**Descripción (máx. 2.000) · 369 caracteres:**
```
SpindleLab hace sitios web a medida y marketing con IA. El sitio es el eje. Lo diseño y lo programo a medida, con un panel para que lo edites tú, y le conecto la búsqueda en Google y en las IA, los anuncios, las redes y la medición de cada mes.

Cada solución tiene su precio de partida publicado en spindlelab.cl, más IVA.

Hablemos de tu sitio: spindlelab.cl/contacto
```

#### Destacados

Reemplazan a los dos de agosto (el chequeo y la guía de agencias AEO/GEO, que es de la línea anterior).

1. **Hablemos de tu sitio** → `https://spindlelab.cl/contacto/?utm_source=linkedin&utm_medium=social&utm_campaign=perfil-ramon`
   Título (20): `Hablemos de tu sitio`
   Descripción (131): `Si ya tienes sitio, te lo reviso gratis y en un día hábil te mando lo que encontré. Si no, te cuento cómo lo haría y cuánto cuesta.`
2. **El chequeo** → `https://spindlelab.cl/diagnostico/?utm_source=linkedin&utm_medium=social&utm_campaign=perfil-ramon-chequeo`
   Título (41): `Chequea si tu sitio está listo para la IA`
   Descripción (140): `21 chequeos sobre tu dominio, gratis y sin registro, con la metodología publicada. Mide si la IA puede entender tu sitio, no si hoy te cita.`

El UTM es para que una consulta que llegue por acá traiga `linkedin` en el correo del formulario (`/contacto/` guarda fuente, medio y campaña en campos ocultos). No había convención de UTM para LinkedIn en el repo; esta sigue la de Instagram (`medio=social`, la campaña dice de dónde).

### 2. Página de empresa SpindleLab en LinkedIn (plural)

**Eslogan (máx. 120) · 38:**
```
Sitios web a medida y marketing con IA
```
Es el rótulo de la casa tal como lo dice el sitio en su título y en sus datos estructurados. El titular («En redes arriendas…») abre la descripción, no el eslogan.

**Sitio web:** `https://spindlelab.cl`

**Descripción general (máx. 2.000).**

*Corta, la recomendada (599 de 2.000):*
```
En redes arriendas. Tu sitio es lo único que es tuyo.

El anuncio, el post, la búsqueda en Google y la respuesta de ChatGPT llevan a la misma dirección. Diseñamos y programamos esa dirección a medida, con un panel para que la edites tú, y le conectamos la búsqueda en Google y en las IA, los anuncios, las redes y la medición de cada mes.

Cada solución publica su precio de partida en spindlelab.cl, más IVA.

Hablemos de tu sitio. Si ya tienes uno, te lo revisamos gratis y en un día hábil te mandamos lo que encontramos. Si no, te contamos cómo lo haríamos y cuánto cuesta.
spindlelab.cl/contacto
```

*Larga, opcional (1.758 de 2.000):*
```
En redes arriendas. Tu sitio es lo único que es tuyo.

El anuncio, el post, la búsqueda en Google y la respuesta de ChatGPT llevan a la misma dirección. Diseñamos y programamos esa dirección a medida, con un panel para que la edites tú, y le conectamos lo demás. No te decimos que dejes las redes. También las gestionamos.

Hacemos sitios web a medida, desde una página de campaña hasta una plataforma con integraciones propias, y el panel para editar textos y fotos viene en todos los planes. Sobre el sitio que ya tienes, revisamos si Google y las IA pueden visitarlo y entender a qué te dedicas, y cómo te describen ChatGPT, Gemini y Perplexity. Gestionamos anuncios en Google y tus redes en LinkedIn y Meta. Y si quieres seguir, medimos cada mes con el mismo criterio, con informe y reunión.

Partimos por una revisión gratis. Después conversamos 20 minutos por videollamada y, si hay trabajo que hacer, te mandamos por escrito qué hacemos, en qué fases y cuánto cuesta. Cada fase termina con algo que apruebas antes de seguir. Cada solución publica su precio de partida en spindlelab.cl, más IVA. No prometemos consultas, ventas ni menciones en una IA. Lo que dejamos por escrito es el método, los entregables y los plazos.

Detrás de SpindleLab está Ramón Vallejos, su fundador, que viene de años en agencias de medios y de marketing. Trabaja con agentes de IA dentro del equipo y responde por cada entrega. También construyó dos herramientas abiertas y gratis: el chequeo de spindlelab.cl/diagnostico y Verifica y Cumple, para la Ley 21.719 de datos personales.

Hablemos de tu sitio. Si ya tienes uno, te lo revisamos gratis y en un día hábil te mandamos lo que encontramos. Si no, te contamos cómo lo haríamos y cuánto cuesta.
spindlelab.cl/contacto
```

*Recomendación: la corta.* Dice lo mismo que la home y no obliga a mantener en LinkedIn una lista de servicios que el sitio ya tiene con precio y detalle. La larga sirve si Ramón quiere que la página se explique sola sin que nadie haga clic.

**Botón de la página (opcional):** si Ramón usa el botón personalizado, que vaya a `https://spindlelab.cl/contacto/?utm_source=linkedin&utm_medium=social&utm_campaign=pagina-boton`.

### 3. Instagram, cuenta `spindlelab.cl` (plural)

**Bio (máx. 150) · 116:**
```
Sitios web a medida y marketing con IA.
En redes arriendas. Tu sitio es lo único que es tuyo.
Hablemos de tu sitio ↓
```

**Enlaces del perfil (Instagram admite varios):**

| Orden | Título | URL |
|---|---|---|
| 1 | Hablemos de tu sitio | `https://spindlelab.cl/contacto/?utm_source=instagram&utm_medium=social&utm_campaign=bio` |
| 2 | Chequeo gratis | `https://spindlelab.cl/diagnostico/?utm_source=instagram&utm_medium=social&utm_campaign=bio-chequeo` |
| 3 | Verifica y Cumple | el que ya está puesto. Si va primero o tercero hasta el 30-nov sigue siendo la **Decisión B** de Ramón (`marketing/redes/2026-10-octubre-posicionamiento/PLAN.md`) |

**El enlace cambia de `/diagnostico/` a `/contacto/`.** La bio ahora cierra en «Hablemos de tu sitio ↓», y la flecha tiene que caer donde se habla, que es el formulario, no la home donde hay que volver a buscarlo. Es la misma regla del 25-sep al revés (si el bio invitaba a chequear, el enlace iba al chequeo).

*Sobre el UTM:* el encargo proponía `utm_medium=bio`. Lo dejo en `utm_medium=social&utm_campaign=bio`, que es la convención que ya usan `PLAN.md` §2.2 y los stickers de las piezas de octubre; con otro medio, la lectura del día 10 partiría Instagram en dos filas. De paso: desde el 30-oct el sitio guarda el UTM en todas las páginas (comprobado el 2-nov en `/`, `/contacto/` y `/nosotros/`, y el formulario lo lee de ahí), así que un enlace a la home tampoco lo perdería. No es la razón del cambio; la razón es la flecha.

**Nombre de la cuenta (opcional, máx. 30):** hoy «Spindlelab Consultoría». Propuesta: `SpindleLab · Sitios a medida` (28). El campo Nombre es el que busca Instagram. Decide Ramón; si «Consultoría» le importa, se queda.

### Qué falta para que quede aplicado

- [ ] **[TÚ] Captura de los tres perfiles como están hoy** (personal, página e Instagram), antes de cambiar nada. Ninguna sesión los vio para este kit: lo de hoy está leído del repo, no del canal.
- [ ] **[TÚ] Elegir titular** (A o B) y descripción de la página (corta o larga).
- [ ] **[TÚ] Pegar a mano**: titular, Acerca de, cargo y descripción de la experiencia, destacados, eslogan y descripción de la página. La bio y los enlaces de Instagram, **desde el teléfono** (el enlace del bio solo se cambia ahí, nota del 5-oct).
- [ ] Después de aplicar: anotar fecha y texto en `marketing/redes/QUE-HAY-PUBLICADO.md`.
- [ ] Fuera de este kit, para quien toque el sitio: el `Person` de los datos estructurados de `/nosotros/` no trae `sameAs` hacia el perfil personal de Ramón en LinkedIn (solo la organización lo trae hacia la página). Si se agrega, el titular A y el `jobTitle` quedan amarrados a la misma persona.
- El texto viejo de Instagram (`marketing/brand/redes/perfil-instagram.md`) quedó marcado como superado y apunta acá.
- Las piezas programadas que decían la línea anterior llevan arriba una nota «Antes de publicar (2-nov)» con la frase a cambiar: `marketing/redes/2026-10-octubre-posicionamiento/` (PLAN.md y piezas 01, 02 y 03) y `marketing/redes/marca-personal/banco-posts.md`.

---

## Versión 28-ago-2026 (superada el 2-nov-2026; se deja como historia)

> **No usar.** Es la línea «SEO técnico y visibilidad en IA / motor de adquisición», cierra en el chequeo como acción principal y nombra agencias y clientes del pasado, cosa que la regla vigente no permite. Se deja porque es el registro de lo que se propuso en agosto.

**Preparado por:** Renata (agente-copywriter) · 28-ago-2026
**Encargo:** `marketing/encargos-otras-sesiones/marca-personal-ramon-linkedin.md`
**Uso:** Ramón pega todo a mano en su perfil. Nada se publica desde ninguna sesión.
**Regla madre:** capacidad + resultado. Sin contraste con las agencias donde trabajó.
El CV es el conjunto cerrado de hechos del encargo; nada fuera de esa lista.

---

### 1. Titular (headline) — 3 opciones

Cada opción ataca un ángulo distinto. Las tres caben en el límite de LinkedIn (220 caracteres).

**Opción A — capacidad + para quién:**
> SEO técnico y visibilidad en IA (AEO/GEO) para empresas B2B, salud, finanzas y legal en Chile · Fundador de SpindleLab · Que aparezcas cuando tus clientes preguntan, en Google y en ChatGPT

**Opción B — resultado primero:**
> Hago que las empresas aparezcan cuando sus clientes preguntan: en Google y ahora en ChatGPT · SEO técnico + visibilidad en IA · Fundador de SpindleLab

**Opción C — prueba y transparencia:**
> Fundador de SpindleLab · SEO técnico y visibilidad en motores de IA · Método publicado, precios publicados y un chequeo gratis para comprobarlo sobre tu propio sitio

*Recomendación de Renata: la A para partir (dice qué, para quién y el resultado). La C calza mejor una vez que el post ancla del 3-sep ya circuló.*

---

### 2. "Acerca de" (una versión, ~170 palabras, voz singular)

Mismo molde que la bio de spindlelab.cl/nosotros/: quién es → trayectoria como hecho → "te lo cuento porque…" → el objetivo es que tu nombre ya esté ahí.

> Soy Ramón Vallejos. SpindleLab soy yo al frente, orquestando un motor de adquisición con el SEO técnico y la visibilidad en IA como eje.
>
> Antes pasé más de cinco años en agencias: coordiné la producción de piezas para ocho marcas nacionales en Universal McCann, trabajé la cuenta de LATAM Airlines en Graphene IPG (Chile, Perú, Ecuador y Colombia), llevé pauta de retail y B2B en Incrementa, y contenido y SEO de una cartera B2B en Maggiore. Estudié Comunicación Publicitaria en la Universidad Andrés Bello y un máster en Marketing Digital y E-commerce en la Universidad de Barcelona.
>
> En las empresas que reviso pasa casi siempre lo mismo: uno hizo el sitio, otro lleva las redes, otro la pauta, y nadie mira si la IA los nombra.
>
> Te lo cuento porque con esa experiencia puedo hacerme cargo del eje de tu operación y poner el motor a funcionar entero, no por partes.
>
> El objetivo no es solo que vendas: es que cuando alguien pregunte por tu rubro, tu nombre ya esté ahí.
>
> Chequea gratis si la IA puede leer tu sitio, sin registro: spindlelab.cl/diagnostico

*(La última línea es opcional; si el perfil se siente muy vendedor con ella, se corta y el chequeo queda solo en Destacados.)*

---

### 3. Experiencia — cargo en SpindleLab

**Cargo:** Fundador · Consultor de SEO técnico y visibilidad en IA
**Empresa:** SpindleLab · *(fecha de inicio real la pone Ramón)*

**Descripción:**

> Fundé SpindleLab para resolver un problema que veía repetirse: empresas con el sitio por un lado, las redes por otro, la pauta por otro, y nadie mirando el conjunto.
>
> SpindleLab conecta esas piezas en un solo motor de adquisición, con el SEO técnico y la visibilidad en motores de IA (ChatGPT, Gemini, Perplexity) como eje. Trabajo con rubros donde la confianza es crítica: financiero, salud, legal y B2B.
>
> El método tiene nombre y pasos publicados (Método SpindleLab: diagnóstico, estrategia AEO/GEO, implementación, monitoreo) y los precios están en el sitio.
>
> Chequea gratis si la IA puede leer tu sitio: spindlelab.cl/diagnostico

---

### 4. Destacados sugeridos (sección "Featured")

1. **El chequeo** → `https://spindlelab.cl/diagnostico`
   Título sugerido: *Chequea si la IA puede leer tu sitio (gratis, sin registro)*
   Descripción sugerida: *21 verificaciones en segundos: si ChatGPT, Gemini y Perplexity pueden leerte, entenderte y citarte. Metodología completa publicada.*

2. **La guía del blog** → `https://spindlelab.cl/blog/como-elegir-verificar-agencia-aeo-geo-chile/`
   Título sugerido: *Cómo elegir (y verificar) una agencia de AEO/GEO en Chile*
   Descripción sugerida: *Qué preguntar, qué pedir que te muestren y qué señales descartan a un proveedor. Criterios que también me aplican a mí.*

---

### Qué le falta para estar listo

- [ ] Pase humano de Ramón (elige titular, corta o deja la línea final del "Acerca de", pone la fecha de inicio en Experiencia).
- [ ] Ramón pega todo a mano en LinkedIn; ninguna sesión toca el perfil.
