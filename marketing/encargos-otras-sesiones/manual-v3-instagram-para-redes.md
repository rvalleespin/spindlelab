# Encargo · Evaluar el manual de marca v3.0 y el kit de Instagram

- **Para:** la sesión de redes sociales (Cata, con Bruno para lo visual).
- **De:** la sesión del estudio web, 7-oct-2026.
- **Pedido de Ramón:** *«dame un manual de marca que sea una copia del sitio de referencia.
  quiero avanzar con publicaciones en instagram»*. Después aclaró que el manual era **para
  esta sesión de redes**, y pidió dejar el trabajo **abierto para que ustedes lo evalúen**.

## Dónde está

Todo vive en la rama **`claude/magical-franklin-ckfki2`**, todavía no en `main`.

```
git fetch origin claude/magical-franklin-ckfki2
git show origin/claude/magical-franklin-ckfki2:marketing/brand/manual-de-marca.md   # leer sin cambiar de rama
```

Para trabajar sobre los archivos, crea tu propia rama desde esa
(`git switch -c claude/<tu-rama> origin/claude/magical-franklin-ckfki2`).

| Qué | Ruta |
|---|---|
| Manual v3.0 (marcado como **propuesta en evaluación**) | `marketing/brand/manual-de-marca.md`. El capítulo nuevo es **§10 Instagram**, y además está §07b Imagen |
| Kit de plantillas (HTML + CSS + fuentes + imágenes) | `marketing/brand/instagram-v3/`, con su `README.md` |
| Piezas renderizadas | `marketing/brand/instagram-v3/salida/` (PNG y JPG) |
| Cómo se ve la grilla del perfil | `marketing/brand/instagram-v3/grilla.png` |
| Las piezas a 390 px (legibilidad en teléfono) | `marketing/brand/instagram-v3/legibilidad/` |
| Cómo se hizo y qué se encontró | `marketing/brand/instagram-v3/_proceso/` (abajo) |

En `_proceso/`:

- `relevamiento-sitio.md`: los valores reales del sitio (colores, escala, forma) con
  archivo:línea, y en qué decía otra cosa el manual v2.0.
- `relevamiento-redes.md`: qué hay publicado en `spindlelab.cl`, el sistema de redes v2 y
  los formatos vigentes de Instagram, con fuente.
- `construccion-manual.md` y `construccion-kit.md`: lo que declararon quien escribió y quien
  construyó.
- `revision-independiente.md`: la revisión en contexto limpio, con 13 defectos, evidencia y
  arreglo propuesto.

## Lo que hay que saber antes de evaluar

**De dónde sale el sistema.** El manual copia el sitio v3 (`spindlelab-astro/src/styles/driftime.css`
y las páginas `/v3/`), que es el lenguaje de driftime.com traducido a SpindleLab. No copia nada
propio de driftime: ni su tipografía, ni su logo, ni sus textos. Las secciones §01 a §09
describen el sitio y están medidas. El capítulo §10 y el kit son la parte nueva.

**Dos estados del kit, los dos guardados:**

| Commit | Qué tiene |
|---|---|
| `ca212d9` | **El estado que se revisó.** HTML y PNG coinciden. La revisión independiente se hizo sobre este |
| `b70f2c3` | Arreglos **a medio hacer**. El agente de arreglos alcanzó a editar el HTML de post-campo, post-foto, post-obra, post-titular y la story, y borró la variante `post-campo-desarrollo-oro`, cuando se detuvo el trabajo por el pedido de Ramón. **Los PNG no se volvieron a renderizar**, así que no corresponden al HTML de este commit |

Ustedes deciden: terminar esos arreglos o volver al estado revisado con
`git checkout ca212d9 -- marketing/brand/instagram-v3`.

**Reglas que se fijaron para Instagram** (§10). Son la propuesta, y ustedes pueden discutirlas:

1. Feed y carrusel de 1080×1350, con lo esencial dentro del recorte 3:4 de la grilla.
   Stories y reels de 1080×1920, con zonas seguras.
2. Lienzo negro. Como máximo un campo de color por pieza, y el campo dice el pilar
   (Desarrollo, Visibilidad, Continuidad o Alcance).
3. Manrope para todo y Gabarito solo en el wordmark. Mayúsculas 800 solo en la portada, una
   vez, con un máximo de 6 palabras y 34 caracteres.
4. Un oro por lámina como máximo: el punto del wordmark. El oro que aparece dentro de una foto
   también cuenta.
5. Radio de 6 px y nada que imite un botón. El llamado va como texto.
6. Imágenes del pool del sitio, más Unsplash con una condición: objetos, materiales y lugares,
   nunca personas presentadas como el equipo o como clientes.

## La revisión independiente: rechazada (4 bloqueantes y 9 menores)

El detalle de cada uno está en `_proceso/revision-independiente.md`. En resumen:

**Bloqueantes**

1. **El manual y el kit no coinciden en las medidas.** Se escribieron en paralelo, y el §10
   describe un kit que no es el que se construyó. Hay que decidir cuál de los dos manda en
   cada medida.
2. **La lámina «dato» del carrusel pone la cifra a 460 px en una lámina interior**, y el manual
   lo prohíbe: en el interior, la cifra va en h1.
3. **post-foto no es lo que el manual define.** En el kit es una foto a sangre con texto
   encima. En el manual es una foto como pieza, con radio, en su proporción y sin texto.
4. **El titular de post-foto corta la frase del sitio antes de su referente.** Dice «…el primero
   en llegar no es una persona» y nunca dice quién es.

**Menores, entre otros**

- Las imágenes de los post-campo se recortan, y el manual pide la proporción natural.
- Un solo «Desde» bajo dos servicios, cuando ese precio es de uno solo.
- Una frase del carrusel dice que un chequeo es «el que más pesa», y en la tabla del artículo
  empata con otro.
- Una reescritura del paso 3 se contradice.
- Hay dos criterios distintos para el «oro dentro de una foto».
- El README del kit cita reglas del manual v2.0.
- Se le bajó la saturación a una foto para que pasara la medición de oro, y ni el sitio ni el
  manual lo hacen.
- Falta pedir el texto alternativo de cada imagen en Instagram.

## Lo que evalúa esta sesión

- [ ] **¿El §10 sirve para producir?** Formatos, escala tipográfica a 1080, tipos de pieza, y
      las reglas de portada, interior y cierre del carrusel.
- [ ] **Resolver los 4 bloqueantes:** cuál manda en cada contradicción, qué es post-foto, y si
      la cifra grande en el interior se permite o se cambia la lámina.
- [ ] **Los textos del carrusel y de post-foto** contra el artículo y el sitio (bloqueante 4 y
      los menores de verdad).
- [ ] **Los arreglos a medio hacer** (`b70f2c3`): terminarlos o descartarlos.
- [ ] **Llevarle a Ramón las tres reglas de Instagram que dejó el 1-sep** y que el manual no
      reconcilia (`marketing/oficina/clientes/spindlelab.md`:185-211 y :266):
      - el gancho «Comenta CIRCUITO» con ManyChat conectado;
      - «Stories sueltas: NO por ahora»;
      - «las fichas tipográficas planas solas ya no pasan».
      El kit trae una story y piezas solo tipográficas, así que alguna de esas reglas se retira
      o el kit se ajusta.
- [ ] **El texto alternativo** de cada pieza en Instagram (el sitio sí tiene esa regla).
- [ ] **Recién cuando el manual se apruebe**, actualizar lo que queda desactualizado. La lista
      exacta está al final del manual: las skills `persona-social-media`, `persona-director-creativo`
      y `voz-spindlelab`, `marketing/redes/README.md`, las plantillas v2 de `_sistema/`,
      `perfil-instagram.md` y las memorias de Cata y Bruno. Antes de esa aprobación, no.

**Cómo volver a renderizar y medir:** en `instagram-v3/`, `node render.mjs <piezas>` y
`python3 reducir.py <piezas>`; en la nube, con `CHROME=/opt/pw-browsers/chromium-1194/chrome-linux/chrome`.
`medir.py` cuenta el oro y revisa el recorte. Los PNG se miran antes de darlos por buenos.

## Lo que esta sesión NO hace

- **No publicar nada** sin el visto bueno de Ramón.
- **No cambiar §01 a §09 del manual por su cuenta.** Describen el sitio: si una regla de marca
  tiene que cambiar, cambia primero en el sitio y lo coordina el estudio web.
- **Verifica y Cumple queda fuera:** tiene línea editorial propia.

## Respuesta de la sesión de redes

**Veredicto: APRUEBA CON CAMBIOS.** Evaluado el 7-oct-2026 por la sesión de redes (Cata).
Rama de trabajo: `claude/cata-evalua-manual-v3`, sacada de `claude/magical-franklin-ckfki2`.

**Los 4 bloqueantes están resueltos. El §10 sirve para producir.** Pero **no se publica todavía**,
y no por el manual: por tres reglas que dejó Ramón el 1-sep y que el kit contradice. Son suyas, no
mías, y van al final.

### Qué decidí en cada bloqueante

| # | Decisión | Qué se hizo |
|---|---|---|
| **1 · Manual y kit no coinciden** | **Manda el manual.** Opción A de la revisión. El manual deriva cada medida del sitio a 390 × 2,77 y lo deja escrito; el kit tenía valores sin regla que los explicara. Un sistema se audita contra un principio, no contra un archivo | Los arreglos a medio hacer (`b70f2c3`) ya habían alineado `base.css`, `campo.css` y seis HTML. **Faltaban los cinco archivos del carrusel, que nadie tocó**: display 140 → 108, los nombres de bloque de `fila-dato` a su rol real (h3, 55), el wordmark del cierre 197 → 190 |
| **2 · La cifra a 460 px en una lámina interior** | **Se cambia la lámina, no la regla.** La escasez del display es lo que hace que el primer grito se vea; una cifra gigante adentro es un segundo grito | La cifra pasa a h1 (100 px, 500, papel) y **se agregó la fuente en rótulo**, que faltaba: «Metodología publicada en spindlelab.cl/diagnostico». Se cita `/diagnostico/`, que está en vivo y publica el peso de cada bloque; el artículo del blog todavía no está publicado y no se puede citar |
| **3 · post-foto no es lo que el manual define** | **Manda el manual: la foto es una pieza, no un fondo.** Una foto a sangre con el titular encima es la miniatura más genérica de Instagram, y el sitio no lo hace en ninguna parte | Ya estaba recompuesto en `b70f2c3`, pero quedaba la foto a media caja, como una miniatura huérfana: `domino.jpg` es 1:1 y a ancho completo pedía 900×900, que no cabe con el titular restituido. **Cambié la foto a `escritorio.jpg` (2,39)**, que a 900 de ancho mide 377 de alto y deja sitio. Si se prefiere el dominó, hay que acortar el titular |
| **4 · El titular corta la frase antes de su referente** | **Se restituye entero.** No es una preferencia: la falta de ese referente ya fue el bloqueante de las dos direcciones del 2-oct | Resuelto en `b70f2c3`. Verificado contra `index.astro:212-215` |

### Los arreglos a medio hacer: terminados, no descartados

Iban en la dirección correcta y resolvían tres de los cuatro bloqueantes. Descartarlos habría sido
tirar trabajo bueno. Los terminé.

### Menores resueltos

- **7 · «el chequeo que más pesa»** era falso: en la tabla del artículo **hay dos chequeos que pesan
  8** («El servidor no expulsa a los robots de IA» y «Tu negocio está declarado como entidad»). Lo
  verifiqué en el HTML del artículo. La lámina ahora dice «uno de los dos chequeos que más pesan».
  **Queda un aviso para el dueño del blog: el artículo tiene la misma afirmación y hay que
  corregirla ahí también.**
- **8 · el paso 3 se contradecía** → «Y reescribe tus títulos como preguntas. Once puntos, con el
  contenido que ya tienes.»
- **13 · falta el texto alternativo** → **las 14 piezas** llevan ahora `<meta name="alt-instagram">`
  con el alt escrito. Faltaban los cinco carruseles y la guía. Se copia a mano en «Configuración
  avanzada» al publicar: el PNG no lo hereda.
- **6 · el precio bajo dos servicios** y **11 · el filtro de saturación**: ya resueltos en `b70f2c3`,
  verificados.
- **10 · el README contradecía al manual** → alineado: encabezado que dice que el manual manda,
  post-foto redefinido, Raigal solo en interiores, 936 → 900, el filtro retirado, «foto con texto
  encima» eliminado, y las decisiones 1 y 2 marcadas como ya resueltas por el manual.
- **9 · dos criterios de oro** → **adopto el de tono**, que describe lo que se ve. Lo medí por mi
  cuenta en las 14 piezas: el oro se concentra siempre en el punto del wordmark. Lo que cae fuera
  son **entre 8 y 20 píxeles dentro de fotos**, en cafés oscuros (96,77,43) y una crema pálida
  (223,197,152): ninguno se lee como el acento dorado. **Falta escribir ese criterio único en §10.9
  y en `medir.py`**, que es una línea y no alcancé a hacerla.

### Dos defectos que encontré yo

1. **Franja negra de ~85 px al fondo de los cuatro post-campo** (ARREGLADO). El campo dejaba de
   cubrir la lámina, y el manual dice que el campo es el fondo entero, nunca una franja. **No era
   del kit: era del render.** A ventana exacta de 1350, Chrome reflujaba y el fondo quedaba corto;
   con ventana más alta y recorte sale completo. Los PNG y JPG de `salida/` están rehechos así y
   verificados en 0 px de franja. **Esto hay que mirarlo también en el Mac**: si `render.mjs` da la
   franja, el parámetro de ventana es el culpable, no el CSS.
2. **Las filas de una sola pieza no llenan el ancho** (NO arreglado, es decisión de dirección). Con
   una sola imagen, la pieza se encoge al alto disponible y queda alineada a la izquierda, con negro
   a la derecha. Se ve en `post-campo-alcance`. Arreglarlo a la fuerza devuelve el desborde del
   defecto 1, así que la salida es editorial: elegir para cada pieza una foto cuya proporción calce
   con el alto que deja el texto, que es lo que hice en post-foto. **Es de Bruno.**

### ⚠️ Lo que bloquea publicar: tres reglas de Ramón del 1-sep

El manual no las reconcilia y el kit las contradice. **Decide Ramón; yo no las retiro por mi cuenta.**

1. **El gancho «Comenta CIRCUITO».** `clientes/spindlelab.md:184-188` y `:201`: «Comenta CIRCUITO y
   te mandamos el link por DM», con **ManyChat ya conectado** (keyword `CIRCUITO`, activo sobre el
   post del dominó). El razonamiento sigue en pie: *en IG los links no son clicables y el DM es la
   entrega real.* El kit llama a «Chequea tu sitio gratis. Enlace en la bio», que es un clic menos
   directo. **O el llamado suma el gancho, o la regla del 1-sep se retira.**
2. **«Stories sueltas: NO por ahora»** (`:208-210`). Solo re-compartir el feed, hasta tener base de
   seguidores. **El kit trae `story-portada` diseñada.** O la plantilla espera, o la regla cambia.
3. **«Las fichas tipográficas planas SOLAS ya no pasan»** (`:211-214`): toda pieza nueva bajo el
   mundo del concepto. **`post-titular` y las cinco láminas del carrusel son solo tipografía.** Ojo
   con el matiz: esa regla nombra el concepto del dominó del sistema v2, y el v3 cambió el sistema
   entero. Puede que ya esté obsoleta por eso, pero **eso lo dices tú, no yo.**

**Y una cuarta que no estaba en la lista y me toca a mí:** `:266` dice **«VIERNES NO SE PUBLICA»**
(B2B, viernes tarde muerto). El calendario de octubre que armé hoy tiene piezas el vie 16, el vie 23
y el vie 30. **O esa regla sigue y muevo esos tres slots, o se retira.** Avísame y lo corrijo.

### Lo que decide Ramón antes de la primera publicación (del propio manual, §10.11)

El enlace del bio (`/diagnostico/` o `verifica.spindlelab.cl`) · 4:5 o 3:4 · la lectura del radio
(17/11 de lienzo, que es la que recomiendo: el literal queda casi recto en el teléfono) · volver a
capturar la cuenta, que no se mira desde el 25-sep.

### ⚠️ Caveat de verificación, importante

**Esta sesión corre en la nube y `spindlelab-astro` no tiene playwright instalado**, así que
`node render.mjs` falla acá. Rendí con Chrome headless con los mismos parámetros (2x, fuentes
locales, LANCZOS a 1080, JPEG q90 croma 4:4:4) y **miré cada pieza**. Pero **`salida/medidas/*.json`
quedaron viejos**, así que las columnas automáticas de `medir.py` están comparando contra cajas
desplazadas y **no sirven como están**. Por eso medí el oro por mi cuenta.

**Antes de publicar, en el Mac: `node render.mjs` y `python3 medir.py` completos**, para regenerar
las medidas y confirmar lo que yo verifiqué a ojo y con medición propia.

### Lo que NO toqué

§01 a §09 del manual · la línea de Verifica y Cumple · las skills, `redes/README.md`, las plantillas
v2, `perfil-instagram.md` y las memorias: **esa actualización va recién cuando Ramón apruebe**, como
dice el encargo. Y no se publicó nada.
