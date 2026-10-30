# Texto del sitio nuevo: «lo único tuyo es el sitio» (borrador para elegir)

**Renata (copy), 30-oct-2026, a pedido de Ramón.** Rama `claude/magical-franklin-ckfki2`, con la obra E13 ya fusionada (`9039b52`).
**Estado: BORRADOR para que Ramón elija.** No está aplicado al sitio. Cuando elija, Clara lo pasa al flujo de texto (`e13/texto/*.json` → `extraer-texto.mjs`), se corre el barrido y Javiera revisa.

## Brief en una línea
SpindleLab, home del sitio nuevo: que el dueño de una empresa que vive de redes y anuncios sienta que **su sitio es lo único que de verdad es suyo**, y pida la revisión gratis de una página.

## Por qué cambia el titular
Ramón, 30-oct: *«"Te llegan consultas. Veamos dónde se cae el resto." queda muerto. No calienta a nadie. El negocio principal es el desarrollo web: es la pieza del motor a la que apelo como "spindle".»*

**Lo respalda un hecho:** según `modelo-de-negocio-v1-BORRADOR.md` §1, **lo único que SpindleLab ha vendido son sitios web** (Combeau y María Loreto). El SEO/AEO por correo frío lleva 0 clientes.

**La idea que trajo de Instagram:** «en las redes, todo lo de tu negocio no es tuyo; lo único tuyo es el sitio».
- No la copiamos tal cual: es la frase de otra persona.
- Las tres direcciones la dicen con palabras nuestras.

**Es la misma idea que ya publicó la marca el 1-sep** (corpus de voz, §2): *«Estás pagando para que lleguen. Meta empuja. Google empuja. Los dos llevan al mismo lugar: tu sitio.»*

## Lo que se puede afirmar (y lo que no)
- **Sí:**
  - en Instagram o LinkedIn, la plataforma decide a quién le muestra lo que publicas;
  - la cuenta depende de sus reglas;
  - los seguidores no se exportan;
  - el sitio va en tu dominio (`desarrollo-web.json`: «Publicamos el sitio en tu dominio»);
  - lo editas tú con el panel;
  - es código propio, sin WordPress.
- **Por confirmar con Ramón antes de escribirlo:**
  - «la dirección está a tu nombre»: que el dominio quede registrado a nombre del cliente;
  - si el código o el repositorio se le entrega al cliente.

  Si las dos cosas son ciertas, son el mejor argumento de propiedad que hay.
- **No:**
  - cifras de alcance orgánico ni «Instagram cierra cuentas todos los días»: no hay fuente;
  - ningún resultado prometido: la regla del modelo sigue, se promete método y no resultados.
- **Ojo de coherencia:** SpindleLab **también vende gestión de redes y pauta**. El mensaje no puede ser «deja las redes»: es «lo que traen las redes tiene que terminar en algo tuyo».

## Tres direcciones para la portada (capturas en `maquetas/`)

Las tres comparten:
- **El rótulo nuevo:** «Sitios web a medida y marketing con IA». Pone primero lo que de verdad se vende y conserva la categoría del modelo.
- **El botón:** «Pedir la revisión de una página».
- **El microcopy de siempre.**

Cambian el H1 (dos tintas: blanco + gris) y la entradilla.

### A · «En redes arriendas» (recomendada para la portada)
- **H1:** **En redes arriendas.** *Tu sitio es lo único que es tuyo.*
- **Entradilla:** En Instagram o LinkedIn la plataforma decide quién ve lo que publicas, y tu cuenta sigue ahí mientras cumplas sus reglas. Tu sitio queda en tu dominio y lo editas tú. Lo diseñamos y programamos a medida, y lo dejamos preparado para que Google y ChatGPT entiendan a qué te dedicas.
- **Por qué funciona:**
  - Es la idea de Instagram en tres palabras chilenas («arriendas») y una frase que se puede repetir.
  - Le habla al lector desde algo que ya siente: pagó por seguidores, armó su cuenta, y sabe que no manda ahí.
  - A 390 cabe en dos líneas.
- **Riesgo:** puede leerse como «las redes no sirven», justo cuando vendemos gestión de redes. Lo resuelve la sección 2 (abajo).

### B · «Todo termina en tu sitio»
- **H1:** **Todo lo que haces para vender** *termina en tu sitio. Por eso partimos por ahí.*
- **Entradilla:** El anuncio, el post, la búsqueda en Google y la respuesta de ChatGPT llevan a la misma dirección. Diseñamos y programamos esa dirección a medida, con un panel para que la edites tú, y conectamos lo demás a ella.
- **Por qué funciona:**
  - Es la idea del eje: el spindle, la pieza al centro del motor.
  - Explica por qué se parte por el sitio, sin pelearse con las redes ni con la pauta.
  - Es la frase publicada del 1-sep, crecida.
- **Riesgo:** calienta menos que A. Es más razonable que emocionante, y a 390 ocupa tres líneas.

### C · «Casa arrendada»
- **H1:** **Si tu negocio vive en Instagram,** *vive en una casa arrendada.*
- **Entradilla:** La plataforma decide quién ve lo que publicas y con qué reglas sigues ahí. Tu sitio es tuyo: tu dominio, tus textos, tu formulario. Lo diseñamos y programamos a medida, con un panel para que lo edites tú, y lo preparamos para que Google y ChatGPT entiendan a qué te dedicas.
- **Por qué funciona:** abre en la situación del lector, con el condicional que usa Ramón en sus posts («Si te están cobrando "GEO"…»), y la imagen de la casa arrendada se entiende sin explicar.
- **Riesgo:** deja fuera a quien no vive de Instagram (una consultora B2B vive de LinkedIn y de referidos), y es la más alarmista de las tres.

### Recomendación: A en la portada y B como la sección que sigue
- **A engancha y B explica.** Juntas arman el arco: «lo tuyo es el sitio» → «todo lo que haces para vender termina ahí» → «por eso lo construimos primero, y conectamos lo demás».
- **Así se resuelve el riesgo de A** sin bajarle el tono a la portada.

## Cómo sigue la home con A + B (borrador)

### 2 · Reemplaza a «Dónde puede caerse una consulta»
- **H2:** Todo lo que haces para vender termina en tu sitio
- **Párrafo:** El anuncio en Google, el post en Instagram, la respuesta de ChatGPT cuando alguien pregunta por tu rubro. Todos mandan a la persona al mismo lugar. Si ese lugar no explica bien lo que haces, o el formulario no te avisa cuando alguien escribe, lo que pagaste para traerla se pierde ahí.
- **Dos columnas:**

| En redes | En tu sitio |
|---|---|
| La plataforma decide a quién le muestra lo que publicas. | Tú decides qué dice y en qué orden. |
| Tu cuenta depende de sus reglas. | Va en tu dominio *(«a tu nombre», si Ramón lo confirma)*. |
| Si te vas, tus seguidores se quedan. | Google y las IA pueden leerlo y citarlo. |
| | Quien te escribe llega a tu correo. |

- **Cierre:** No te decimos que dejes las redes: también las gestionamos. Te decimos que lo que traen termine en algo tuyo.

### 3 · Para quién (ajuste)
- **H2:** Para empresas que ya venden *(queda)*.
- **Segundo párrafo nuevo:** Si estás partiendo y todavía no tienes sitio, también es por acá: es lo primero que hacemos.

### 5 · Soluciones (orden nuevo: el sitio primero)
1. **Sitio web a medida**, como el eje: Diseñado y programado para tu negocio, sin plantillas ni WordPress, con un panel para que edites tú. Desde una página de campaña hasta un sitio de doce páginas. *(Precio sin cambios: desde $390.000 + IVA.)*
2. **Lo que se conecta al sitio:** Búsqueda y visibilidad en IA · Anuncios en Google y redes · Acompañamiento mensual. Sus textos de hoy quedan, con una frase de enlace a lo de arriba.

### 7 · Quién está detrás (una línea nueva, opcional)
> SpindleLab viene de *spindle*, el huso: la pieza que gira al centro y donde se enrolla el hilo. En lo que hacemos, esa pieza es tu sitio.

Amarra el nombre, el logo El huso y el video del hilo de oro de la portada. **Ramón confirma** que ese es el origen del nombre.

### 8 · Preguntas frecuentes (una pregunta nueva, primera de la lista)
- **¿Por qué un sitio, si ya tengo Instagram?**
- Porque Instagram es de Instagram. Sirve para que te conozcan, y está bien usarlo. Pero el alcance lo decide la plataforma, y la cuenta depende de sus reglas. El sitio va en tu dominio: ahí llegan tus anuncios, ahí te encuentra Google y ahí te escriben.

### Señales (lo que cambia por fuera)
- **`title`:** SpindleLab · Sitios web a medida y marketing con IA
- **`description`:** Diseñamos y programamos sitios a medida, con panel para que edites tú, y conectamos a ellos tu búsqueda, tus anuncios y tus redes. Revisión gratis de una página.
- **Por regenerar:** la imagen al compartir de la home (lleva el titular horneado), `llms.txt` y la descripción de `#org`.

## Lo que decide Ramón
1. **El titular:** A, B o C, o una mezcla. La recomendación es A en la portada y B como la sección 2.
2. **El rótulo:** «Sitios web a medida y marketing con IA», que deja atrás «Marketing y crecimiento con IA para empresas que ya venden» como primera línea.
3. **Dos hechos:** si el dominio queda a nombre del cliente y si se le entrega el código.
4. **La línea del spindle** en «Quién está detrás».

## Lo que sigue cuando elija
1. Clara aplica el texto en el flujo de JSON, en la home y en lo que arrastra:
   - Desarrollo web;
   - `/servicios/`;
   - metas;
   - `llms.txt`;
   - la imagen al compartir.
2. Barrido de términos y de rayas.
3. Javiera en un subagente limpio, con una lectura en frío de la home nueva.
4. Corte de publicación y lectura final de Ramón.

**Fuera del sitio:** el outbound y las bios de LinkedIn todavía dicen la línea anterior. Lo anoto para la troncal.
