# Pieza 4 · Reel "¿Estás seguro?" · Verifica y Cumple

**Archivo a subir:** `reel.mp4` · 1080×1920 · 16 s · 30 cuadros/s · **sin audio**.
**Cuenta:** `@spindle.lab`, y compartir a tu historia personal. Reels es la única superficie
de esa cuenta con descubrimiento real; el feed es archivo.
**Estado:** ⛔ **sin publicar.** Nada sale de acá sin tu ojo encima.

**Archivos**

| Archivo | Qué es |
|---|---|
| `reel.mp4` | el montaje final, hecho con `ffmpeg` acá mismo |
| `reel.html` | la fuente. Cada cuadro se pide por `?f=N` y se dibuja solo en función de N |
| `render.sh` | rehace los 480 cuadros y remonta. Un tramo suelto: `./render.sh 240 341` |
| `hero-fiscalizador.png`, `hero-nubes.webp` | copiados del sitio, sin regenerar |
| `archivo-black-latin*.woff2` | la tipografía, local |

---

## Las cifras son de una medición real, hecha el 28-sep

Este Reel no ilustra una idea: cuenta algo que pasó. Lo medimos el mismo día que el chequeo
profundo empezó a funcionar, y estas son las cifras textuales:

| | |
|---|---|
| Chequeo rápido, el que solo lee el código | **100** |
| Chequeo profundo, el que abre un navegador | **0** |
| Rastreadores que cargaron solos | **6** |
| Primera carga | **5.341 ms** |
| Primer envío de datos | **7.240 ms** |
| Cookies escritas sin tocar nada | **6** |
| Aviso de cookies | **ninguno** |
| Tiempo mirando, sin un solo clic | **25 s** |

⚠️ **El sitio no se nombra, y no se nombra nunca.** Es un prospecto real y la regla de marca
es que las empresas se generalizan. "Un sitio" no le quita nada al argumento.

⚠️ **Si vuelves a usar estas cifras en otra pieza, vuelve a medirlas.** Un sitio cambia. La
medición de septiembre que estaba anotada en el repo seguía siendo cierta, pero eso se
comprobó corriendo el chequeo de nuevo, no confiando en la nota.

---

## 1. Antes de subir: ponle audio desde la app

**El MP4 va mudo a propósito.** No tenemos música con licencia y no vale la pena inventarla.

Al subirlo, **elige un audio de tendencia dentro de Instagram**, en el paso de edición. Un Reel
mudo rinde peor y el audio de tendencia es una de las señales con que Instagram reparte
alcance. La pieza no depende del ritmo: no hay nada que sincronizar.

## 2. La portada

El primer cuadro ya es la pregunta y funciona sola. Si prefieres una con la sheriff dentro,
en el selector de portada anda al **segundo 11 o 12**: ahí está entera y con el documento en
alto.

---

## 3. Los seis tramos

| Tramo | Cuadros | Qué dice |
|---|---|---|
| 1 | 0–71 | **¿ESTÁS SEGURO?** · *Tu sitio se ve bien. No es lo mismo que estar bien.* |
| 2 | 72–149 | **UN SITIO SACÓ 100 DE 100.** · *En la revisión rápida, la que solo lee el código.* |
| 3 | 150–239 | **LO ABRIMOS EN UN NAVEGADOR Y NO TOCAMOS NADA.** · *Veinticinco segundos mirando. Ni un clic.* |
| 4 | 240–341 | **6 rastreadores · 6 cookies · 0 avisos** · *El primero partió a los 5 segundos. A los 7 ya habían salido datos.* |
| 5 | 342–401 | **MISMO SITIO. MISMO DÍA. OTRA HISTORIA.** · *No estaba mal hecho. Es que nadie lo había mirado.* |
| 6 | 402–479 | **MIRA EL TUYO GRATIS.** + la dirección completa |

---

## 4. El texto del post

Va en **plural**: es la marca. Una sola opción.

> Revisamos un sitio con la herramienta rápida, esa que lee el código y nada más. Sacó 100
> de 100.
>
> Después lo abrimos en un navegador de verdad y lo dejamos ahí, sin tocar nada. A los cinco
> segundos ya había partido el primer rastreador. A los siete ya habían salido datos de la
> visita. Al final: seis rastreadores, seis cookies, ningún aviso.
>
> No estaba mal hecho. Es que nadie lo había mirado con los ojos que corresponden.
>
> Si quieres ver qué hace el tuyo: verifica.spindlelab.cl. Sin registro, no pedimos tu correo.

**Si lo compartes a tu historia**, primera persona singular y una línea:
`Esto es lo que me tiene despierto últimamente.`

**Lo que no se escribe:** "link en la bio" (el bio de `@spindle.lab` apunta a otro producto),
ninguna cifra de multa, ninguna cuenta regresiva, el nombre del sitio medido, y nada que
insinúe que el chequeo dice si cumples. **No lo dice.**

---

## 5. Texto alternativo

Video vertical sobre un cielo azul eléctrico. En letras enormes aparece la pregunta "¿Estás
seguro?", después el relato de un sitio que sacó 100 de 100 en una revisión rápida y que, al
abrirlo en un navegador sin tocar nada, dejó correr seis rastreadores, escribió seis cookies
y no mostró ningún aviso. Hacia el final entra galopando una sheriff vestida de rosa fucsia
con un documento en alto, y aparece la dirección verifica.spindlelab.cl.

---

## 6. Decisiones de diseño (por si hay que rehacerlo)

- **La pregunta va sola.** Los dos primeros tramos no tienen personaje: solo tipografía sobre
  el cielo. Es el titular del sitio y aguanta el cuadro entero.
- **La sheriff entra en el tramo 3, cuando abrimos el navegador.** La primera versión la dejaba
  para el cierre, que sonaba mejor escrito y en el render dejaba cinco de los seis tramos con
  la mitad de abajo vacía. Ella es la que va a mirar: entra cuando empieza el trabajo.
- **El caballo arranca en 952 px y no en 900.** A 900 el sombrero rozaba la segunda línea del
  pie en el tramo de los marcadores. Es una medida tomada contra el render, no a ojo.
- **Los marcadores llevan la cifra en lima y la frase en blanco**, y la columna tiene que
  terminar antes de los 900 px. Con el número en 148 px terminaba en 1.050 y se montaba encima
  del caballo. Si cambias el texto, vuelve a medir.
- **Cero susto y cero multa.** El argumento es la distancia entre "se ve bien" y "está bien",
  no el miedo. Dos competidores muestran la multa estimada en pesos; no gastar eso es el
  diferencial. Si la pieza funcionara porque asusta, estaría mal hecha.
- **"No estaba mal hecho" es la frase que sostiene el tono.** No hay villano. El sitio del
  ejemplo está bien construido; lo que faltaba era que alguien lo mirara así.
- **La dirección va escrita completa en el cierre.** En Instagram el enlace del pie no se
  puede tocar. Nunca "link en la bio".
- **El render es determinista y en serie.** Cada cuadro se dibuja solo en función de `?f=N`.
  **No lo paralelices:** Chrome headless se cuelga y los procesos quedan vivos sin escribir el
  PNG. Está documentado desde la pieza 01.
- ⚠️ **La cuelga NO es exclusiva del paralelo.** Esta pieza se trabó en serie, en el cuadro 214:
  el proceso vivo, sin escribir, y el bucle esperándolo para siempre. Por eso `render.sh` ahora
  lleva un vigilante que corta a los 25 s y una segunda pasada que rehace los cuadros perdidos.
  **No usa `timeout`**, que en macOS no viene: es un vigilante en zsh puro.
- ⚠️ **Y ojo con `(( i++ ))` en zsh con `set -e`.** El post-incremento devuelve el valor
  *anterior*: cero en la primera vuelta, que zsh lee como fallo y mata el script sin decir nada.
  Va `i=$(( i + 1 ))`. Esa línea sola costó una corrida entera.
- **Verificado sobre el MP4, no sobre los PNG.** 16,00 s · 1080×1920 · yuv420p · 30 fps. Se le
  extrajeron cuadros al video montado y se miraron, y se midió la diferencia entre cuadros
  vecinos alrededor del punto donde se reanudó la corrida: 6,40 %, dentro del rango de sus
  vecinos (4,85 a 9,47 %). No hay costura.
- **Los cuadros no van al repo.** Son 480 PNG de ~1,2 MB y esta carpeta vive en iCloud Drive.
  `render.sh` los deja en disco local y de ahí sale el MP4.

---

## 7. Antes de subirlo

- **Va después del carrusel o antes, da lo mismo, pero no el mismo día.** Son dos entradas
  distintas al mismo sitio y compiten si salen juntas.
- **Ninguna empresa, ningún competidor y ningún prospecto se nombra**, tampoco contestando
  mensajes o privados. Si alguien pregunta "¿cuál sitio?", se generaliza y punto.
- **Si alguien pregunta si cumple o no:** el chequeo dice qué está publicado y qué falta, no
  dictamina cumplimiento, y la parte legal la ve su abogado.
- **Queda pendiente anotarlo en `marketing/redes/QUE-HAY-PUBLICADO.md`.** Se anota cuando
  salga, no antes.

## Cómo se mide

Chequeos corridos en Cloudflare (Workers & Pages → `verificaycumple` → Métricas →
Solicitudes) el día que se sube y el siguiente. Por visitas al chequeo, no por vistas del
Reel: las vistas dicen cuánta gente pasó, no cuánta hizo algo.
