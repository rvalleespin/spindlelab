# Verifica y Cumple: campaña con línea editorial propia

**Para:** la sesión de dirección creativa (`persona-director-creativo`)
**De:** la sesión de Verifica y Cumple · 25-sep-2026
**Decisión de Ramón, hoy:** *"lo de la ley es totalmente aparte de lo que ya está en la grilla.
Una línea editorial totalmente distinta. De aquí para adelante, borrón y cuenta nueva."*

---

## 0. Esto REEMPLAZA el encargo anterior

⚠️ **`instagram-spindlelab-directrices.md` queda superado para todo lo que sea Verifica.**

Ese documento decía lo contrario de lo que hay que hacer ahora: que las piezas llevaran el
sistema oscuro de SpindleLab (hilo de oro, Gabarito, dorado) y que Verifica apareciera adentro
como producto con nombre. **Era mi decisión, y Ramón la revirtió hoy.** Sigue siendo válido
para el contenido de SpindleLab de siempre (SEO, visibilidad en IA); para Verifica, no.

**El borrón es literal.** El 25-sep se publicó una pieza de Verifica con el sistema oscuro de
SpindleLab (`instagram.com/p/DduVT6Dkr0N/`, "100 de 100, contando solo lo que alcanzamos a
ver") y **Ramón la eliminó el mismo día**, justamente porque quedaba fuera de la línea de la
campaña. No queda nada de Verifica en la grilla: **la campaña parte de cero**.

La pieza en sí no estaba mal y su argumento sigue sirviendo (el chequeo lee HTML y no ejecuta
JavaScript, y por eso dice "no lo sabemos" en vez de dar por bueno). **Ese contenido se
recupera, la estética no.** Rehacerlo en el sistema de Verifica es un buen candidato para el
segundo o tercer pase.

### La única pregunta abierta, y es de Ramón

¿La campaña vive en **`spindlelab.cl`** (la cuenta actual, 19 seguidores) o en una **cuenta
propia de Verifica**?

**Mi recomendación: quedarse en `spindlelab.cl` por ahora.** Con 19 seguidores, el argumento
de "proteger la grilla" no vale casi nada, y una cuenta nueva parte en cero y parte en dos el
tiempo de Ramón, que es medio día a la semana para todo. Una campaña con arte propio dentro de
una cuenta es normal. Si la campaña muestra tracción, ahí se abre cuenta.

---

## 1. El sistema visual de Verifica, leído del sitio en producción

**No lo inventes y no lo saques del repo de SpindleLab.** Está vivo en
`https://verifica.spindlelab.cl` y estos son sus tokens reales:

```
--azul-600:  #2e5bff    (el azul eléctrico del hero, el fondo protagonista)
--lima-400:  #d6ff3d    (el acento que grita: "SEGURO?", etiquetas, bloques)
--rosa-500:  #ff3ea0    (el personaje y los CTA)  ·  --rosa-700: #c21e78
--tinta-900: #17163a    (el texto sobre crema)    ·  --tinta-500: #56547a
--crema-100: #fffaf0    (el fondo de las secciones de contenido)
--crema-150: #f5eee0  · --crema-200: #f7f2ea  · --crema-50: #fffdf9
--teja-600:  #b5502c  · --teja-800: #8f3d20
--verde-700: #0d6d61  · --verde-100: #e2f1ed
--arena-300: #e2d6bf  · --ambar-100: #fbe8d6
```

**Tipografía: `Archivo Black`** para todo lo display, con `Impact` de respaldo. El cuerpo va en
la pila del sistema. **Cero Gabarito, cero Manrope**: esas son de SpindleLab.

**Los assets del personaje y del fondo ya existen**, en la rama `laboratorio/ley-21719`:

```
verificaycumple/assets/img/hero-fiscalizador.png   (el personaje, 179 KB, fondo transparente)
verificaycumple/assets/img/hero-nubes.webp         (el cielo)
```

Cópialos a la carpeta de la campaña. **No regeneres el personaje**: es el mismo que está en el
sitio y esa continuidad es justamente lo que pidió Ramón.

---

## 2. El personaje, que es la campaña

**Es una sheriff, y viene de tu lado.**

Una mujer con sombrero de sheriff, entera en rosa fucsia, montada en un caballo rosado,
cruzando un cielo azul, con un documento en alto en la mano.

Lo que comunica, en palabras de Ramón, que es quien la eligió para el sitio:

> *"Seguridad. Aquí vamos con este documento, vamos con protección."*

**Ella no viene a fiscalizarte: viene a traerte el papel que te deja tranquilo.** Es la
autoridad que pone orden en el pueblo y está de tu parte. Lo que trae no es una citación, es lo
que te protege.

⚠️ **El archivo se llama `hero-fiscalizador.png` y ese nombre engaña.** Esta sección decía
antes "la fiscalizadora que llega con el aviso" y construía sobre "viene en camino y va a
llegar". Eso es el marco de la amenaza, que es justo lo que esta marca no vende, y hubo que
parar una producción por eso. **No construyas sobre el nombre del archivo.**

**Por qué funciona, para no romperlo:**

- **El rosa desarma la autoridad.** No es un policía que intimida: es una figura pop, casi
  surrealista, que puede ser simpática sin dejar de tener autoridad. Esa mezcla es el hallazgo.
- **El caballo significa que ella se mueve hacia ti.** Es servicio, no control.
- **El documento en alto es el gesto de traer algo**, no de exigir algo.

**Territorio que esto abre** (material, no lista de tareas):

- **Lenguaje de western, en broma y en chileno.** La ley llegó al pueblo, alguien que pone las
  cosas en su lugar. Sin caricatura y sin acento gringo.
- **La estrella de sheriff como elemento que se repite.** El sitio ya tiene un escudo rosa en la
  barra superior: son la misma familia.
- **El cartel de SE BUSCA**, que es el mejor chiste disponible y vuelve concreto algo abstracto:
  *"SE BUSCA: la política de privacidad de tu sitio"*. Se entiende sin saber nada de la ley.
- **El documento como objeto que vuelve**: la política, las 12 cosas, el informe del chequeo.
  Siempre algo que ella **entrega**.

**Límite de tono, y es duro:** cero miedo y cero cifra de multa. Dos competidores muestran una
multa estimada en pesos y no gastar eso es el diferencial. **Si la pieza funciona porque asusta,
está mal hecha aunque se vea linda.**

**Registro:** plural, es la marca hablando. Chileno, tuteo, nunca voseo. Cero raya larga.

---

## 3. Motion: lo que SÍ se puede entregar, y lo que no

✅ **`ffmpeg` YA ESTÁ.** Se instaló el 25-sep-2026 a raíz de este encargo: **v6.0 en
`~/bin/ffmpeg`**, vía `npm i -g ffmpeg-static`, sin Homebrew y sin contraseña. La nota vieja de
la skill decía que no existía y por eso los Reels se entregaban siempre a medias.

**Eso cambia la entrega: ahora el MP4 terminado es posible y es lo que se espera.**

| Pieza | Cómo se produce |
|---|---|
| El movimiento (el caballo, el cielo, la llegada) | **MCP de Higgsfield**, imagen a video desde `hero-fiscalizador.png` |
| Los rótulos y la tipografía en movimiento | HTML animado renderizado a **PNG transparentes** con Chrome headless (`--default-background-color=00000000`, y verificar el canal alfa: color-type del PNG = 6) |
| El montaje | **`ffmpeg` acá mismo**, quemando los overlays sobre el clip |

Patrón de montaje:

```
ffmpeg -i clip.mp4 -i overlay.png -filter_complex "[0][1]overlay=0:0" -c:a copy out.mp4
```

**Entrega:** el MP4 terminado **más** los overlays sueltos y un `montaje.md`, porque Ramón a
veces quiere reordenar en CapCut. Lo que ya no vale es entregar solo las piezas sueltas
diciendo que el montaje no se puede hacer.

⚠️ **Corre `ffmpeg -version` antes de comprometerlo.** Si esta sesión corre en otra máquina,
puede no estar, y la instalación es la de arriba.

⚠️ **Y mira el MP4 de salida.** Un montaje que corrió sin error igual puede tener el overlay
corrido, el alfa mal o el audio fuera de sincronía. La regla de mirar el render vale igual para
video que para PNG.

**Preflight de costo obligatorio** antes de generar con Higgsfield (`get_cost:true`), y dile a
Ramón cuántos créditos vas a gastar antes de gastarlos. La recarga la hace él.

---

## 4. El formato importa más que la pieza: Reels

La cuenta tiene **19 seguidores**. Un post de feed ahí no lo ve nadie: el alcance real es cero
más lo que Ramón comparta a mano.

**Reels es la única superficie de esa cuenta con descubrimiento real.** Para una campaña que
arranca de cero, es donde hay que poner el esfuerzo. El feed sirve de archivo.

- **Reel / Story: 1080×1920.** Se diseña vertical, **no se recorta el cuadrado**.
- **Feed: 1080×1080**, para las piezas que sí funcionan quietas.
- Los tres primeros segundos cargan todo el peso. El personaje entrando al cuadro es el gancho
  que ya tenemos.

---

## 5. Tres piezas para arrancar

No una grilla del mes. Tres, se publican, se mira qué pasa.

**1. "Viene en camino" (Reel, el lanzamiento).** La fiscalizadora galopando en el cielo, el
tipo entrando en bloques de Archivo Black sobre el azul. El remate es la fecha: la ley entra en
plena vigencia el 1 de diciembre de 2026. ⚠️ Y la honestidad que nos diferencia: hay un proyecto
en el Senado (boletín 18.623-07) para moverla a 2027, y **el sitio lo declara**. Si la pieza
promete una fecha, tiene que decir eso también, o envejece el día que se vote.

**2. "¿Estás seguro?" (Reel o carrusel).** Es el titular del sitio y funciona: la pregunta sola,
en lima sobre azul, y después las cosas concretas que el chequeo mira en un sitio real. Termina
en la invitación a revisar el sitio propio.

**3. "Las 12 cosas" (carrusel de feed).** El Art. 14 ter pide doce cosas publicadas. Es
material que ya existe en el sitio, es útil aunque no compres nada, y es el tipo de pieza que
se guarda y se comparte. Crema de fondo, tinta, lima en los números.

---

## 6. Lo que no cambia, aunque cambie la estética

Esto viene de tres revisiones y de un error que hubo que corregir en vivo hoy. No se negocia:

- **Los artículos son de la ley 19.628**, no de la 21.719. La 21.719 tiene tres artículos
  permanentes; su artículo primero mete las modificaciones en la 19.628. Quien busque "el
  artículo 50 de la 21.719" no lo encuentra.
- **El 4% es solo de las infracciones gravísimas.** En las graves el porcentaje es 2%. Y
  cuidado: el Art. 35 dice que la multa alcanza *"la más gravosa entre"* hasta tres veces la
  multa base **o** ese porcentaje. No digas "el tope es 2%".
- **El delegado no es obligatorio** (Art. 50, "podrá designar"). **No existen las 72 horas**
  (Art. 14 sexies, "sin dilaciones indebidas", y solo cuando hay riesgo razonable para los
  derechos de los titulares).
- **Todo artículo se verifica en el PDF del Diario Oficial** (N° 44.023, 13-dic-2024, CVE
  2583630). ⚠️ **La API de la BCN sirve esta ley truncada.** El PDF da 403 sin User-Agent de
  navegador; pásale uno.
- **Cero competidor nombrado. Cero prospecto nombrado.** Cero cifra de multa como gancho.
- **Nada que insinúe que el chequeo dice si alguien cumple.** No lo dice.
- **Cero cifra, cliente o testimonio que no exista.**

---

## 7. Criterio de término

- [ ] Los assets salieron de `verificaycumple/assets/img/`, no regenerados.
- [ ] Tokens y `Archivo Black` leídos del sitio vivo. Cero Gabarito, cero dorado, cero hilo de oro.
- [ ] Cada pieza renderizada y **mirada**. "Debería verse bien" no es haberlo visto.
- [ ] Vertical diseñado vertical, no recortado del cuadrado.
- [ ] Si hay video: **el MP4 montado con `ffmpeg`**, más los overlays sueltos y `montaje.md`.
      Alfa verificado en los overlays, y el MP4 de salida **abierto y mirado**.
- [ ] Preflight de costo hecho y avisado antes de gastar créditos.
- [ ] Cada artículo citado verificado contra el PDF.
- [ ] Todo queda para el ojo de Ramón. Nada se publica desde un borrador.
- [ ] Anotado en `marketing/redes/QUE-HAY-PUBLICADO.md`, que ahora tiene sección de Instagram.
