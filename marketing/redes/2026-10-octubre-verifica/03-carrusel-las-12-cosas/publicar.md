# Pieza 3 · Carrusel "Las 12 cosas" · Verifica y Cumple

**Formato:** carrusel de feed, 6 láminas de 1080×1080
**Cuenta:** `spindlelab.cl`. Esta es la pieza de **archivo**: la que se guarda, se busca y se
manda por privado meses después. El alcance lo va a hacer tu cuenta personal compartiéndola.
**Estado:** ✅ **PUBLICADO el 29-sep-2026** en `spindlelab.cl` →
`instagram.com/p/Dd3uPldESqj/`. Seis láminas en orden, recorte "Original" (sin recortar), sin
filtro, y con **la etiqueta de IA activada** porque la sheriff es una imagen fotorrealista
generada con IA. Decisión de Ramón en el momento de publicar.

**Archivos**

| Archivo | Qué es |
|---|---|
| `lamina-01.png` … `lamina-06.png` | los seis renders, 1080×1080, mirados uno por uno |
| `carrusel.html` | la fuente, autocontenida. Cada lámina se pide por `?s=N` |
| `render.sh` | rehace las seis, o una suelta: `./render.sh 4` |
| `hero-fiscalizador.png`, `hero-nubes.webp` | copiados del sitio, sin regenerar |
| `archivo-black-latin*.woff2` | la tipografía, local, para que el render no dependa de la red |

**El orden de subida es 01 → 06.** Instagram respeta el orden en que se seleccionan, no el
alfabético: hay que tocarlas de a una y en orden.

---

## De dónde sale el texto

**De la sección "Lo que pide la ley" del sitio en producción**, que ya los tiene numerados
01 a 12 y cada uno con su línea explicativa. Se usa **tal cual**: ya está aprobado y
publicado, y así el carrusel y la página dicen lo mismo palabra por palabra.

⚠️ **La primera versión de este carrusel usó los títulos de `/api/doce-puntos` y salió mal.**
Esos títulos están escritos para contestar *"¿lo encontramos en tu política?"*; la lista del
sitio está escrita para contestar *"¿qué significa esto?"*. Son dos trabajos distintos. De ahí
salieron los tres problemas que Ramón marcó: letras en vez de números, enunciados sin explicar,
y un cierre mal redactado.

**Si hay que rehacerlo: el texto se copia del sitio, no del endpoint.**

### Los doce y su literal en la ley

Los números 01 a 12 corresponden, en ese orden, a los literales **a) a l)** del **Art. 14 ter
de la ley 19.628** (los introduce el artículo primero de la 21.719). Verificados el 28-sep-2026
contra el PDF del **Diario Oficial N° 44.023** del 13-dic-2024, **CVE 2583630**, leídos del
documento completo. No salieron de la API de la BCN, que entrega esta ley truncada.

| Nº | Literal | | Nº | Literal |
|---|---|---|---|---|
| 01 | a) | | 07 | g) |
| 02 | b) | | 08 | h) |
| 03 | c) | | 09 | i) |
| 04 | d) | | 10 | j) |
| 05 | e) | | 11 | k) |
| 06 | f) | | 12 | l) |

**En las piezas van números, no letras.** En la ley son literales, pero en redes una letra no
significa nada y se lee como una lista arbitraria. La correspondencia queda acá, que es donde
sirve si alguien discute un punto.

---

## El texto del post

Va en **plural**: es la marca hablando, no tú. Una sola opción, no acumular.

> La ley pide que tu sitio tenga doce cosas publicadas sobre qué haces con los datos de las
> personas. Están en el artículo 14 ter, escritas en un idioma que no es el de nadie.
>
> Acá van las doce, dichas como se hablan.
>
> No hay que ser abogado para revisarlas. Y si quieres, abrimos tu política y buscamos cada
> una: te decimos cuáles vimos y cuáles no.
>
> verifica.spindlelab.cl

**Si lo compartes a tu historia**, ahí sí va en primera persona singular y en una línea:
`Me tocó leer el artículo entero. Lo dejé traducido acá.`

**Lo que no se escribe:** "link en la bio" (el bio de `spindlelab.cl` apunta a
`spindlelab.cl/diagnostico/`, que es otro producto), ninguna cifra de multa, ninguna cuenta
regresiva, y nada que insinúe que el chequeo dice si cumples. **No lo dice.**

---

## Texto alternativo, lámina por lámina

1. Cielo azul eléctrico. Una etiqueta verde lima dice "Ley 21.719, artículo 14 ter". En letras
   enormes, "12" en verde lima, y debajo "cosas que tu sitio tiene que publicar". A la derecha,
   una sheriff vestida de rosa fucsia cruza el cielo en un caballo rosado con un documento en
   alto.
2. Fondo crema. Tres puntos numerados en un cuadro verde lima. 01, tu política de datos:
   publicada, con su fecha y su número de versión. 02, quién responde: qué empresa responde y
   quién la representa. 03, a quién escribirle: un correo o formulario para que la persona pida
   lo suyo.
3. 04, qué datos pides y para qué: qué recoges, con qué fin, con qué permiso y a quién se los
   pasas. 05, cómo los cuidas: qué medidas tomas para que no se filtren. 06, los cinco
   derechos: ver sus datos, corregirlos, borrarlos, oponerse a que los uses y llevárselos.
4. 07, que puede reclamar ante la Agencia de Protección de Datos Personales. 08, si los mandas
   fuera de Chile: a qué países y con qué nivel de protección. 09, cuánto los guardas: por
   cuánto tiempo conservas cada dato.
5. 10, de dónde salieron: el origen de los datos que tienes. 11, que puede arrepentirse:
   retirar el permiso cuando quiera. 12, si decide una máquina: si algo automático decide sobre
   una persona, hay que decirlo.
6. Cielo azul. "¿Cuántas de las 12 tienes?" en blanco y verde lima. Debajo, que abrimos tu
   política y buscamos cada una, y que buscamos si el punto aparece, no si lo que dice alcanza.
   Abajo, sobre un bloque verde lima, la dirección verifica.spindlelab.cl.

---

## Decisiones de diseño (por si hay que rehacerla)

- **Cada punto lleva dos cosas: el título corto y la línea que explica.** Sin la segunda, el
  punto no dice nada y el carrusel es una lista de encabezados. Fue la corrección de Ramón y
  tenía razón: "Los cinco derechos" no significa nada hasta que dice cuáles son.
- **Números, no letras.** Ver arriba.
- **El cierre pregunta "¿Cuántas de las 12 tienes?", no "¿Las tienes?".** No es un sí o no: el
  chequeo devuelve un número, y la pregunta tiene que ser la que el producto contesta. La
  primera versión decía "¿Las tienes las 12?", que además estaba mal escrito.
- **Seis láminas y no trece.** Una por punto sería la versión obvia y es la que nadie termina
  de pasar. De a tres se lee en un scroll y se guarda entera.
- **Crema en el contenido, azul en las puntas.** El azul es para llamar; el crema es para leer.
  Es el mismo reparto que hace el sitio entre el hero y las secciones de texto.
- **El titular de la portada va con `nowrap` y en 62 px.** Con el corte automático quedaban
  "SITIO" y "DEJAR" colgando solos: cinco líneas y ninguna del mismo largo. El tamaño no es
  redondo, es el resultado de medir para que las dos líneas terminen antes del brazo de la
  sheriff. **Si cambia el texto, hay que volver a medir.**
- **La honestidad va en el cierre, no en letra chica.** "Buscamos si el punto aparece, no si lo
  que dice alcanza. Eso lo ve un abogado." Es la frase que nos separa de prometer cumplimiento,
  y va en el mismo cuerpo que el resto.
- **La sheriff entra entera en las dos láminas azules.** En una versión del cierre la corrí para
  despejar el texto y le corté la cabeza y el documento, que es *el* gesto de la campaña: ella
  trae algo. Una sheriff decapitada no sirve aunque el texto se lea perfecto.
- **El `display` de las láminas sale de un solo lugar en el CSS.** La regla `.lista` declaraba
  su propio `display` y pisaba el `display:none` de `.lamina` con la misma especificidad: las
  cuatro listas quedaban siempre visibles y apiladas, y las seis capturas salían idénticas.
  Está anotado en el HTML. Si se agrega un tipo nuevo de lámina, no le pongas `display`.
- **Probado a 168 px.** La portada aguanta y es la que carga la grilla. El cuerpo de las láminas
  de lista no se lee a ese tamaño, y está bien: son la segunda lectura, la que pasa cuando ya
  entraste.

---

## Antes de subirla

- **Ninguna empresa, ningún competidor y ningún prospecto se nombra**, tampoco contestando
  mensajes.
- **Si alguien pregunta si cumple o no:** el chequeo dice qué está publicado y qué falta, no
  dictamina cumplimiento, y la parte legal la ve su abogado. Está escrito así en el sitio y
  conviene contestar con esas mismas palabras.
- **Si alguien corrige un punto:** se revisa contra el PDF del Diario Oficial antes de
  contestar, no contra la memoria ni contra la BCN. La cita truncada ya nos costó una vez.
- **Queda pendiente anotarla en `marketing/redes/QUE-HAY-PUBLICADO.md`.** Se anota cuando
  salga, no antes.

## Cómo se mide

Chequeos corridos en Cloudflare (Workers & Pages → `verificaycumple` → Métricas →
Solicitudes) el día que se sube y el siguiente. Y guardados del propio Instagram, que para
esta pieza dicen más que los "me gusta": es material de consulta, no de aplauso.
