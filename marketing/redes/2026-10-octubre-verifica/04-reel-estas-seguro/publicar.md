# Pieza 4 · Reel "¿Estás seguro?" · Verifica y Cumple

**Archivo a subir:** `reel.mp4` · 1080×1920 · 16 s · 30 cuadros/s · **sin audio**.
**Cuenta:** `spindlelab.cl`, y compartir a tu historia personal. Reels es la única superficie
de esa cuenta con descubrimiento real; el feed es archivo.
**Estado:** ✅ **PUBLICADO el 30-sep-2026** en `spindlelab.cl` →
`instagram.com/reel/Dd6dAemM6E2/`. Encuadre **9:16**, portada en "¿ESTÁS SEGURO?", etiqueta de
IA activada (aparece como *"Contenido generado con IA"*), y **sin audio de tendencia**: salió
con la pista de silencio, que Instagram registró como "Audio original". Decisión de Ramón,
sabiendo el costo.

**Archivos**

| Archivo | Qué es |
|---|---|
| `reel.mp4` | el montaje final, hecho con `ffmpeg` acá mismo |
| `reel.html` | la fuente. Cada cuadro se pide por `?f=N` y se dibuja solo en función de N |
| `render.sh` | rehace los 480 cuadros y remonta. Un tramo suelto: `./render.sh 240 341` |
| `hero-fiscalizador.png`, `hero-nubes.webp` | copiados del sitio, sin regenerar |
| `archivo-black-latin*.woff2` | la tipografía, local |

---

## El ángulo: esto es sobre la confianza, no sobre un problema

**Encuadre de Ramón, 28-sep.** El dueño de un sitio pide datos. La persona se los da confiando
en que no terminen en otra parte. Esa confianza depende de algo que el dueño no puede ver. La
ley llegó para poner las mismas reglas a todos, y **Verifica existe para que el dueño sepa si
su sitio está a la altura de esa confianza.**

No es "tienes un problema". Es "esto es lo que está en juego, y te ayudamos a mirarlo".

### Dos versiones anteriores se descartaron. Conviene saber por qué

| Versión | Qué contaba | Por qué no |
|---|---|---|
| v1 | La medición: 100 en el chequeo rápido, 0 en el profundo | Ponía el foco en lo buenos que somos midiendo, no en el que mira |
| v2 | "Seis empresas ya saben que entró" | Más concreto, pero seguía siendo un hallazgo **nuestro** en vez de una razón **suya** |

La medición sigue siendo real y sigue estando en el repo. **Es buen material para otra pieza
donde el tema sea esa medición.** Acá estorbaba.

⚠️ **Si se reusan esas cifras, hay que volver a medirlas.** Un sitio cambia.

### El límite que no se cruza

En el tramo 5 **no se dice "te decimos si tu sitio es seguro"**. El chequeo no dictamina
cumplimiento y el sitio lo declara con todas sus letras. Se dice lo que de verdad hace:
*te mostramos qué hace tu sitio cuando alguien entra, y qué te falta publicar.* Es la misma
promesa, dicha sin prometer de más.

---

## 1. El audio, y dos cosas que se aprendieron subiéndolo

⚠️ **UN MP4 SIN PISTA DE AUDIO NO ENTRA POR EL SUBIDOR WEB DE INSTAGRAM.** Se queda en la zona
de arrastre con la barra girando, para siempre, **sin mensaje de error**. El campo `file` sí
tiene el archivo (se comprobó: `C:\fakepath\reel.mp4`), pero la interfaz nunca avanza. El
carrusel de imágenes había entrado sin problema; la diferencia era el video.

**El arreglo:** agregarle una pista de silencio. Entró al instante.

```bash
~/bin/ffmpeg -y -i reel.mp4 -f lavfi -i anullsrc=channel_layout=stereo:sample_rate=44100 \
  -c:v copy -c:a aac -b:a 128k -shortest reel-con-pista-de-silencio.mp4
```

El archivo que se sube es **`reel-con-pista-de-silencio.mp4`**, no `reel.mp4`.

⚠️ **El subidor web NO deja elegir audio.** En la pantalla de edición solo hay portada, acortar
y un interruptor de "Sonido activado". Y el audio **no se puede agregar después de publicar**:
para ponerle música hay que borrar el reel y volver a subirlo desde el teléfono.

⚠️ **El recorte "Original" SÍ recorta un video vertical.** Cortaba la cabecera. Hay que elegir
**9:16** explícitamente, aunque el archivo ya sea 1080×1920.

**Si se vuelve a subir desde el teléfono**, ahí sí se elige un audio de tendencia en el paso de
edición. Un Reel mudo rinde peor y el audio de tendencia es una de las señales con que Instagram
reparte alcance. **Ojo:** una cuenta profesional puede ver solo la biblioteca "Sonidos para
empresas", sin música comercial popular.

## 2. La portada

⚠️ **El primer cuadro NO es la pregunta: es cielo vacío**, porque el texto entra con fundido.
Esta nota decía lo contrario y estaba mal. En el selector de portada hay que **correr el
recuadro al segundo 2**, que es donde "¿ESTÁS SEGURO?" está entero. Es lo que se usó, y es la
mejor portada para la grilla: se lee en miniatura.

Si se prefiere una con la sheriff, va en el **segundo 11 o 12**.

---

## 3. Los seis tramos

| Tramo | Cuadros | Qué dice |
|---|---|---|
| 1 | 0–71 | **¿ESTÁS SEGURO?** · *Tu sitio pide datos. Nombre, correo, teléfono.* |
| 2 | 72–155 | **TE LOS DAN CONFIANDO EN TI.** · *En que no terminen en otra parte.* |
| 3 | 156–239 | **PERO ESO NO SE VE.** · *Pasa por dentro de tu sitio, apenas alguien entra. No en la página que tú miras.* |
| 4 | 240–317 | **PARA ESO LLEGÓ LA LEY.** · *Las mismas reglas para todos, y las personas sabiendo a qué atenerse.* |
| 5 | 318–407 | **Y PARA ESO ESTAMOS NOSOTROS.** · *Te mostramos qué hace tu sitio cuando alguien entra, y qué te falta publicar.* |
| 6 | 408–479 | **MÍRALO GRATIS.** + la dirección completa |

**"¿Estás seguro?" funciona en los dos sentidos a la vez**, y por eso aguanta de titular:
¿estás seguro de que está bien, y está tu sitio seguro para ellos? La pieza contesta las dos.

---

## 4. El texto del post

Va en **plural**: es la marca. Una sola opción.

> Tu sitio pide datos. Un nombre, un correo, a veces un teléfono.
>
> Quien te los da está confiando en que no terminen en otra parte. Y eso no depende de cómo se
> ve tu página: depende de lo que pasa por dentro cuando alguien entra, que es justo lo que no
> se ve.
>
> Para eso llegó la Ley 21.719: las mismas reglas para todos, y las personas sabiendo a qué
> atenerse.
>
> Y para eso estamos nosotros. Te mostramos qué hace tu sitio cuando alguien entra y qué te
> falta publicar, para que puedas estar tranquilo de que quien confía en ti tiene razón.
>
> verifica.spindlelab.cl. Sin registro, no pedimos tu correo.

**Si lo compartes a tu historia**, primera persona singular y una línea:
`Si tu sitio pide datos, esto te sirve. Lo dejé gratis y sin registro.`

**Lo que no se escribe:** "link en la bio" (el bio de `spindlelab.cl` apunta a otro producto),
ninguna cifra de multa, ninguna cuenta regresiva, y nada que insinúe que el chequeo dice si
cumples. **No lo dice.**

---

## 5. Texto alternativo

Video vertical sobre un cielo azul eléctrico. En letras enormes aparece la pregunta "¿Estás
seguro?", y después: tu sitio pide datos, y quien te los da está confiando en ti, en que no
terminen en otra parte. Pero eso no se ve mirando tu sitio: pasa por dentro cuando alguien
entra. Para eso llegó la ley, y en ese momento entra galopando una sheriff vestida de rosa
fucsia con un documento en alto. Cierra con "míralo gratis" y la dirección
verifica.spindlelab.cl.

---

## 6. Decisiones de diseño (por si hay que rehacerlo)

- **La pregunta va sola.** Los dos primeros tramos no tienen personaje: solo tipografía sobre
  el cielo. Es el titular del sitio y aguanta el cuadro entero.
- **La sheriff entra EXACTO en "para eso llegó la ley" (cuadro 240).** Ella *es* eso: la ley
  que llega, y llega de tu lado. Antes de ese cuadro el cielo está vacío a propósito: todavía
  no llega nadie.
- **Mientras ella no llega, el texto baja al centro** (`.tipo.centrada`, top 470 en vez de 372).
  Si se queda arriba, la mitad de abajo del cuadro queda vacía y la pieza se ve coja. Desde el
  tramo 4 vuelve arriba, porque abajo ya galopa ella.
- ⚠️ **A 120 px caben unos 13 caracteres por línea.** Una línea más larga se parte sola y deja
  una palabra colgando: pasó con "QUIEN TE LOS DA" (15), que salió en dos líneas con "DA" solo.
  **Si escribes una línea nueva, cuéntala.** Está anotado en el CSS.
- **El caballo arranca en 952 px y no en 900.** A 900 el sombrero rozaba la segunda línea del
  pie explicativo. Es una medida tomada contra el render, no a ojo.
- **Cero susto y cero multa.** El argumento es la distancia entre "se ve bien" y "está bien",
  no el miedo. Dos competidores muestran la multa estimada en pesos; no gastar eso es el
  diferencial. Si la pieza funcionara porque asusta, estaría mal hecha.
- **La dirección va escrita completa en el cierre.** En Instagram el enlace del pie no se
  puede tocar. Nunca "link en la bio".
- **El antetítulo del cierre dice "Toma un minuto", no "Chequeo gratis".** Con "chequeo gratis"
  la palabra *gratis* aparecía dos veces en el mismo cuadro, y abajo ya está "MÍRALO GRATIS",
  que es donde se la gana. Y "un minuto" no es un decir: el chequeo rápido responde en 2
  segundos y el profundo en 28.
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

⚠️ **No con las "Solicitudes" de Cloudflare.** Esa cifra cuenta archivos servidos, no personas.

Con los **contadores de uso** en KV, que cuentan chequeos corridos y de dónde llegó la gente.
Las instrucciones para leerlos están en `marketing/redes/QUE-HAY-PUBLICADO.md`. Lo que dice si
esta pieza funcionó es `uso:origen:<fecha>:instagram`, no las vistas.
