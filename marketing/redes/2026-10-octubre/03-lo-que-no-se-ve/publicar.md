# Pieza 3 de 3 · Lo que un chequeo automático no puede ver

**Formato:** 1 imagen de feed, 1080×1080
**Cuenta:** @spindlelab.cl (Instagram) · voz de marca, plural
**Archivos:** `pieza.html` (fuente) · `pieza.png` (render mirado, 1080×1080)
**Estado:** ⛔ **PUBLICADO Y ELIMINADO el 25-sep-2026.** Salió a las ~18:40
(`instagram.com/p/DduVT6Dkr0N/`) y Ramón la bajó el mismo día: quedaba fuera de la línea
editorial de la campaña de Verifica, que se decidió aparte esa tarde. **No es un problema de
esta pieza**, que estaba correcta y verificada; es que la campaña cambió de estética.
El argumento sirve y conviene rehacerlo en el sistema de Verifica: ver
`marketing/encargos-otras-sesiones/verifica-campana-linea-propia.md`.

---

## Pie de foto (listo para pegar)

100 de 100 en nuestro chequeo, contando solo lo que alcanzamos a ver. Y es de los peores casos que hemos revisado.

El chequeo lee el HTML y no ejecuta JavaScript. Ve que hay un gestor de etiquetas instalado y no tiene cómo saber qué carga adentro.

Ese mismo sitio, abierto en un navegador de verdad, a los diez segundos ya había escrito cookies de Google Analytics, Google Ads, el Pixel de Meta y el de Reddit. Sin ningún aviso en pantalla.

Por eso, cuando no podemos verlo, lo escribimos tal cual: no lo sabemos. No suma ni resta puntos, y nada sin confirmar se muestra en verde.

Un número redondo se ve mejor que un vacío. Preferimos que el resultado signifique algo.

El chequeo de la Ley 21.719 está en verifica.spindlelab.cl

---

## Texto alternativo (accesibilidad, campo "Alt")

Pieza oscura de SpindleLab. En dorado y grande, la cifra "100 de 100,", y pegado debajo
"contando solo lo que alcanzamos a ver". Después: "Y de los peores sitios que hemos
revisado". Al pie, la frase "Preferimos decir no lo sabemos antes que dar por bueno lo que
no podemos ver".

---

## Etiquetas (opcionales, cortar si sobran)

#Ley21719 #ProteccionDeDatos #SEOtécnico #PrivacidadChile

---

## Antes de publicar

- **Esta va tercera del lote**, después del carrusel de los tres mitos y de la cifra del
  artículo 50. Sola pierde: es la que hace creíbles a las otras dos.
- **El sitio del caso no se nombra ni en el pie ni respondiendo comentarios.** Es un prospecto
  real y no hay permiso. Si alguien pregunta cuál es, se generaliza.
- **No escribir "link en la bio".** El bio apunta a `spindlelab.cl/diagnostico/`, que es el
  chequeo de visibilidad en IA, otro producto. Esta pieza manda a `verifica.spindlelab.cl` y
  por eso la dirección va escrita completa.
- Queda pendiente la decisión de §1 del encargo: archivar lo de julio (navy + serif, marca
  muerta) o dejar que el bloque nuevo lo empuje hacia abajo.
- **Cómo se mide:** chequeos corridos en Cloudflare (Workers & Pages → verificaycumple →
  Métricas → Solicitudes) el día de la publicación y el siguiente. No por reacciones.

## Pendiente para el resto del lote

- **El hashtag de datos va sin tilde: `#ProteccionDeDatos`.** En Instagram `#Protección…` y
  `#Proteccion…` son dos etiquetas distintas y parten la cuenta del lote en dos.
  Estado al 25-sep: esta pieza ya quedó sin tilde y `02-cifra-articulo-50` y el carrusel también se corrigieron (tenían la tilde).
  Falta corregirlo en `01-carrusel-tres-mitos/publicar.md` (línea 38), que todavía lo lleva
  con tilde. No es mi carpeta, así que lo dejo anotado y no lo toco.

## Decisiones de diseño (por si hay que rehacerla)

- **El titular no puede publicar el 100 pelado.** Corrido el 25-sep, el chequeo devuelve 100
  sobre `awasi.com`, pero con 1 señal en `sin-confirmar`, y en ese caso la página viva no
  imprime un 100 a secas: imprime "de 100, contando solo lo que alcanzamos a ver. Hay 1 señal
  que no pudimos mirar, así que no entra en ese número", y el anillo sale en tono parcial, no
  verde. La versión anterior de esta pieza se saltaba justo esa salvaguarda y se contradecía
  con su propio remate. El titular ahora dice lo mismo que el producto, palabra por palabra.
  **Si se vuelve a tocar, se corre el chequeo primero** y el número se ajusta a lo que
  devuelva ese día: `curl -s "https://verifica.spindlelab.cl/api/chequeo?dominio=awasi.com"`
- **La cifra sigue mandando.** El 100 subió a 92px en dorado; lo que cambió es que ya no va
  solo. La aclaración va pegada abajo a 40px en crema, no en gris ni en letra chica: si se
  achica más, vuelve a leerse como descargo al pie y el problema regresa.
- **Un solo dorado**, en "100 de 100,". Por eso el punto del wordmark va en blanco `#f2efe8`.
- **Verde petróleo solo en la etiqueta** de arriba. No entra en el cuerpo.
- "no lo sabemos" va en gris `#9aa4b0` a propósito: la pieza dice que nada sin confirmar se
  muestra en verde, así que pintarlo de verde se contradecía consigo mismo.
- Se probó una variante con la aclaración y el remate al mismo cuerpo (50px). Se descartó:
  las dos ideas se fundían en un bloque y "de los peores sitios que hemos revisado" perdía
  el golpe. La jerarquía 92 → 40 → 62 es a propósito.
- Sin cifra de multa, sin fecha de vigencia, sin el "36 a 73", sin competidores. El gancho es
  la contradicción del 100 de 100, que es un hecho nuestro.
