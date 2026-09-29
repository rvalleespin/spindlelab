# Pieza 3 · Carrusel "Las 12 cosas" · Verifica y Cumple

**Formato:** carrusel de feed, 6 láminas de 1080×1080
**Cuenta:** `@spindle.lab`. Esta es la pieza de **archivo**: la que se guarda, se busca y se
manda por privado meses después. El alcance lo va a hacer tu cuenta personal compartiéndola.
**Estado:** ⛔ **sin publicar.** Nada sale de acá sin tu ojo encima.

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

## De dónde salen los doce puntos

**Del Art. 14 ter de la ley 19.628**, que es donde el artículo primero de la 21.719 mete las
modificaciones. Los doce literales, de la a) a la l).

**Verificados el 28-sep-2026 contra el PDF del Diario Oficial** N° 44.023 del 13-dic-2024,
CVE 2583630, leídos del documento completo y comparados palabra por palabra con lo que sirve
el sitio. No salieron de la API de la BCN, que entrega esta ley truncada.

Los títulos en castellano llano son **los mismos que ya están publicados en el sitio** y que
devuelve `/api/doce-puntos`. No los reescribí para la pieza: si cambian allá, cambian acá.

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

**Lo que no se escribe:** "link en la bio" (el bio de `@spindle.lab` apunta a
`spindlelab.cl/diagnostico/`, que es otro producto), ninguna cifra de multa, ninguna cuenta
regresiva, y nada que insinúe que el chequeo dice si cumples. **No lo dice.**

---

## Texto alternativo, lámina por lámina

1. Cielo azul eléctrico. Una etiqueta verde lima dice "Ley 21.719, artículo 14 ter". En
   letras enormes, "12" en verde lima y debajo "cosas que tu sitio tiene que publicar". A la
   derecha, una sheriff vestida de rosa fucsia cruza el cielo en un caballo rosado con un
   documento en alto.
2. Fondo crema. Tres puntos con su letra en un cuadro verde lima: A, tu política con su fecha
   y su versión. B, quién responde por los datos. C, por dónde te escriben las personas.
3. Los puntos D, E y F: qué datos tratas y para qué, cómo proteges los datos que guardas, y
   los cinco derechos de cada persona sobre sus datos.
4. Los puntos G, H e I: que se puede reclamar ante la Agencia, si los datos salen de Chile, y
   cuánto tiempo guardas los datos.
5. Los puntos J, K y L: de dónde salen los datos, que se puede retirar el permiso cuando uno
   quiera, y si algo decide solo sobre las personas.
6. Cielo azul. "¿Las tienes las 12?" en blanco y verde lima. Debajo, que abrimos tu política y
   buscamos cada una, y que buscamos si el punto aparece, no si lo que dice alcanza. Abajo,
   sobre un bloque verde lima, la dirección verifica.spindlelab.cl.

---

## Decisiones de diseño (por si hay que rehacerla)

- **Seis láminas y no trece.** Una por punto sería la versión obvia y es la que nadie termina
  de pasar. De a tres se lee en un scroll y se guarda entera.
- **Crema en el contenido, azul en las puntas.** El azul es para llamar; el crema es para
  leer. Es el mismo reparto que hace el sitio entre el hero y las secciones de texto.
- **La letra va en el cuadro lima, no el número.** Son literales a) a l) en la ley, no puntos
  1 a 12. Si alguien va a buscar el artículo, tiene que encontrar la misma letra.
- **El pie de cada lámina dice qué letras van ahí.** Es lo que la vuelve verificable: quien
  quiera contrastar contra el texto legal sabe exactamente dónde mirar.
- **La honestidad va en el cierre, no en letra chica.** "Buscamos si el punto aparece, no si
  lo que dice alcanza. Eso lo ve un abogado." Es la frase que nos separa de prometer
  cumplimiento, y va en el mismo cuerpo que el resto.
- **La sheriff entra entera en las dos láminas azules.** En una primera versión del cierre la
  corrí para despejar el texto y le corté la cabeza y el documento, que es *el* gesto de la
  campaña: ella trae algo. Una sheriff decapitada no sirve aunque el texto se lea perfecto.
- **El `display` de las láminas sale de un solo lugar en el CSS.** La regla `.lista` declaraba
  su propio `display` y pisaba el `display:none` de `.lamina` con la misma especificidad: las
  cuatro listas quedaban siempre visibles y apiladas, y las seis capturas salían idénticas.
  Está anotado en el HTML. Si se agrega un tipo nuevo de lámina, no le pongas `display`.
- **Probado a 168 px.** La portada aguanta y es la que carga la grilla. El cuerpo de las
  láminas de lista no se lee a ese tamaño, y está bien: son la segunda lectura, la que pasa
  cuando ya entraste.

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
