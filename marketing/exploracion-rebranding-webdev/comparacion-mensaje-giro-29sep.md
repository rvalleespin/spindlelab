# El mensaje antes y después del giro · v3

**Fecha:** 29-sep-2026 · **Rama:** `claude/rebranding-webdev-exploracion`
**Mandato:** instrucción directa de Ramón en sesión (ver nota al final sobre los documentos).

El giro: **el centro pasa a ser el sitio web.** El AEO deja de venderse como servicio
central y pasa a ser la especificación del producto, o sea la razón por la que este sitio
vale más que el de al lado.

---

## 1 · El orden del recorrido

La home muestra la oferta como cuatro campos de color, uno por pantalla. El orden **es**
el mensaje: el primero es lo que la marca dice que hace.

| | Antes | Ahora |
|---|---|---|
| 01 | **VISIBILIDAD** (navy) | **DESARROLLO** (brasa) |
| 02 | **DESARROLLO** (brasa) | **VISIBILIDAD** (navy) |
| 03 | CONTINUIDAD (petróleo) | CONTINUIDAD (petróleo) |
| 04 | ALCANCE (ciruela) | ALCANCE (ciruela) |

El color viaja con el panel, así que el campo más fuerte de la paleta queda además
primero. Eso ya era deliberado (el naranja se le dio al pilar); ahora el pilar también
abre.

---

## 2 · El argumento de Desarrollo Web

Este es el cambio que más importa, porque el texto anterior era indefendible.

**Antes**
> Sitios a medida, sin plantillas ni WordPress, con panel para que edites tú.

**Ahora**
> El sitio nace legible para las máquinas que hoy recomiendan tu negocio. Lo compruebas
> con el mismo chequeo, sobre tu dominio, antes y después.

**Por qué cambió, con la evidencia del propio repo.** «A medida, sin plantillas» no
diferencia: lo dice la competencia con esas mismas palabras. No hace falta creer en la
palabra de nadie, está en la investigación de agosto que ya estaba en el repo:

> «El mercado está **partido en dos que usan las mismas palabras**: plantilla
> (Wix/WordPress) que ancla abajo, y **a medida con SEO técnico** que ancla 2-4× más
> arriba.» — `marketing/inteligencia-mercado/2026-08-precios-mercado.md`

Y la ficha de BigBudá lista como propio: «diseño a medida (cero plantilla) · código
propio · panel para editar tú el contenido · SEO técnico desde el primer commit». Es casi
palabra por palabra lo que decía la v3.

Construir el hero sobre eso metía a SpindleLab a competir justo donde tiene menos
historia, menos casos y menos logos que todos ellos.

**El argumento nuevo sí es propio** porque se apoya en dos hechos que solo tiene esta
casa: el chequeo demuestra el problema gratis antes de cobrar, y se puede volver a correr
sobre el sitio entregado. Nadie más publica un instrumento que lo deje en evidencia.

**Lo «a medida» no desapareció, bajó de rango.** Sigue en la lista de lo que incluye el
servicio, como ficha técnica, que es su lugar. Es cierto y el cliente lo pregunta; lo que
no puede es ser el mensaje.

---

## 3 · El AEO: de servicio central a especificación

**Antes** (bajada del índice de servicios)
> El eje es el SEO técnico, la visibilidad en motores de IA y el desarrollo web.
> Completamos la ruta con Google y Meta Ads. El contenido creativo lo entregas tú y
> nosotros lo hacemos funcionar.

**Ahora**
> El centro es tu sitio. Lo construimos para que las máquinas que hoy recomiendan tu
> negocio puedan leerlo, y eso se comprueba sobre tu propio dominio. Si ya tienes sitio y
> no lo vas a rehacer, hay una puerta para eso.

La nota del campo Desarrollo lo dice explícito: *«El SEO técnico y el AEO van puestos
desde el primer commit, no parchados al final. Esa es la especificación del producto, no
un servicio aparte.»*

También se corrigieron dos textos en `servicios-v3.json` que nombraban a Visibilidad en
IA como «el eje del motor». Ahora el eje es el sitio y la pauta lo acelera.

---

## 4 · La puerta para quien ya tiene sitio

El nicho donde hay tracción mayoritariamente **no va a rehacer su sitio**, así que la
puerta tiene que estar dicha y no sobreentendida. El campo Visibilidad la lleva ahora en
su nota:

> Si tu sitio funciona y no lo vas a rehacer, esta es la puerta. No hace falta
> reconstruir para que una IA pueda citarte.

---

## 5 · Lo que NO cambió

- **Los precios.** Los seis, idénticos. Verificado comparando el conjunto completo contra
  el commit anterior: mismo servicio, misma cadena de texto.
- **El hero.** Sigue siendo la pregunta sobre si la IA te nombra, con el campo del chequeo
  ahí mismo. El brief ya lo pedía así y ya estaba construido.
- **El bloque del problema.** Sigue con el dato propio (67 de 69 sitios revisados), no con
  afirmaciones genéricas.
- **El bloque de herramientas gratis** (chequeo, Verifica y Cumple, metodología publicada).
- **Ningún competidor se nombra.** El patrón se cuenta en abstracto.
- **No se promete monitoreo continuo de menciones en IA** en ninguna parte.

---

## 6 · Verificación

- Barrido de las 20 páginas v3 a 390 px: sin hallazgos (contraste sobre píxel renderizado,
  desborde, `h1` únicos, JSON-LD, `alt`, enlaces internos).
- Pantallas revisadas renderizadas: home (hero y los campos 01 y 02), índice de servicios
  y página de Desarrollo Web.

---

## Nota sobre los documentos citados en el encargo

El encargo llegó por la troncal y decía que el giro estaba canonizado en
`marketing/oficina/clientes/spindlelab.md` y bajado a una **sección 0** nueva del brief,
más cuatro fichas de competidor y un estudio de categoría del 28-sep.

**Nada de eso está en el repo.** Se verificó dos veces, antes y después de `git pull`, en
`main` y en esta rama:

- El brief no tiene sección 0; su sección 1 sigue diciendo que la tesis es el chequeo.
- La ficha de cliente sigue diciendo que se vende «SEO técnico + visibilidad en motores de
  IA (AEO/GEO)… más la línea de Desarrollo Web».
- No existe `2026-09-28-estudio-categoria-aeo-chile.md`.
- Hay **2** fichas de competidor (Agencia Bull y Brand&Co, ambas del 27-sep), no 4. No hay
  ninguna mención a AnonimoDsn en todo el repo.

Los cambios de esta rama se aplicaron sobre la **instrucción directa de Ramón en sesión**,
que era completa y suficiente por sí sola. Queda anotado para que el registro diga de
dónde salió el mandato y no de un documento que no existe. Si la troncal tiene ese trabajo
local, hay que pushearlo: hasta que eso pase, el brief y la ficha contradicen al sitio.
