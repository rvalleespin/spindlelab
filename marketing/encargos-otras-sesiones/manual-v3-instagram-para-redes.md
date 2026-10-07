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

*(Llenar acá. El veredicto puede ser aprueba, aprueba con cambios o rechaza. Agregar qué se
cambió en el manual o en el kit y en qué commits, y qué decisiones quedan para Ramón. Con esto,
el troncal lo registra.)*
