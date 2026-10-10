# Encargo — los encabezados de bernardocombeau.cl

**Fecha:** 2026-10-10 · **De:** sesión del rediseño del sitio de SpindleLab (v3)
**Para:** la sesión que mantiene `rvalleespin/bernardo-combeau`
**Cliente:** Bernardo Combeau (fotógrafo y modelo, Santiago)

## Por qué llega esto desde acá, y por qué no lo arreglé yo

Bernardo dio el permiso de caso público el 30-sep, así que su sitio entró al índice de
trabajo del v3 de SpindleLab. Para eso **recapturé desde el sitio vivo** en vez de usar las
copias internas que teníamos. Midiendo esas capturas aparecieron los defectos de abajo.

Su sitio no está en este repo: vive en `rvalleespin/bernardo-combeau`, fuera del alcance de
esta sesión. Así que esto va como encargo y no como push, que es la regla de la casa.

**Todo lo que sigue está verificado contra el HTML que el sitio sirve hoy**, con `curl`, no
contra una captura ni de memoria.

## El problema, en una línea

**Siete de las ocho páginas no tienen `<h1>`. La única que lo tiene, lo tiene roto.**

El `<h1>` es lo primero que lee una máquina para saber de qué trata una página. Esto es
exactamente lo que SpindleLab vende que no hay que tener, en el sitio del único caso de
desarrollo web que la casa puede mostrar. Ese es el motivo real de la urgencia, más que el
posicionamiento.

## Defecto 1 · El `<h1>` de la portada se lee pegado

Servido hoy en `https://bernardocombeau.cl/`:

```html
<h1>Un buen retrato no se toma. Se construye<br>dirigiendo a la persona hasta su mejor versión.<br><br></h1>
```

`<br>` no aporta espacio al `textContent`. Una máquina que lea ese titular lee:

> «Un buen retrato no se toma. Se construye**dirigiendo** a la persona hasta su mejor versión.»

Una palabra que no existe, justo en el titular principal.

**Arreglo** — el espacio va **antes** del `<br>`, no después. Un espacio al final de línea se
colapsa al renderizar, así que **el aspecto no cambia en nada**:

```html
<h1>Un buen retrato no se toma. Se construye <br>dirigiendo a la persona hasta su mejor versión.</h1>
```

Van además los dos `<br><br>` del final, que son aire metido dentro del encabezado: dejan
líneas vacías en el texto del titular. Si hacen falta para la composición, el aire va en el
CSS del `<h1>`, no en el marcado.

*(Este mismo defecto apareció en una pieza del portafolio de SpindleLab el 29-sep y se
corrigió igual. Mismo origen, misma solución, cero cambio visual.)*

## Defecto 2 · Siete páginas sin `<h1>`

Barrido completo del sitio, hoy:

| Ruta | `<h1>` | `<h2>` | Lo que hace de titular |
|---|---|---|---|
| `/` | 1 | 2 | el `<h1>` roto del defecto 1 |
| `/retratos` | **0** | 1 | `<h2>Retratos` |
| `/proyectos` | **0** | 1 | `<h2>Proyectos` |
| `/estudio` | **0** | 1 | `<h2>Estudio` |
| `/servicios` | **0** | 1 | `<h2>Servicios` |
| `/sobre-mi` | **0** | 1 | `<h2>Sobre mí` |
| `/contacto` | **0** | 1 | `<h2>Contacto` |
| `/modelo/` | **0** | 7 | ninguno: el primer `<h2>` es «Selected Work», que es una sección |

### Las seis interiores: cambio mecánico

En las seis, el titular de la página **ya está escrito y a la vista**, solo que marcado como
`<h2>`. Cada `<title>` lo confirma: «Retratos — Bernardo Combeau», «Estudio — Bernardo
Combeau», y así.

El arreglo es que ese elemento sea `<h1>`. Para que no cambie nada a la vista, el estilo que
hoy cuelga de `h2` tiene que acompañar al cambio, o aplicarse a los dos. Son páginas Astro
(se ve por los `data-astro-cid-*`), así que lo más probable es que salgan de una sola
plantilla y el cambio sea de una línea.

**Conviene revisar después** que el resto de los `<h2>` de cada página sigan teniendo
sentido como subsecciones del `<h1>` nuevo. En estas seis hay un solo `<h2>` por página, así
que no debería haber nada que reordenar.

### `/modelo/`: decisión, no mecánica

Acá el primer `<h2>` es «Selected Work», que es una sección, no el titular. El sujeto de la
página es la persona, y el `<title>` ya lo dice: «Bernardo Combeau — Model».

La cabecera de esa sección ya rotula `BERNARDO COMBEAU | MODEL` dentro de
`<div class="mhead-marca">`, y el héroe es un `<div class="mhero">` con la fotografía a
sangre.

Dos caminos, y la decisión necesita ver el código fuente, que yo no tengo:

- **Si esa cabecera es propia de `/modelo/`** y no una parcial compartida con el resto del
  sitio, el rótulo de marca puede ser el `<h1>` tal cual está.
- **Si es compartida**, no sirve: un `<h1>` repetido en todas las páginas no identifica a
  ninguna. Entonces el `<h1>` va en el héroe, y si la composición tiene que seguir siendo
  solo fotografía, va oculto a la vista pero presente en el documento (la clase de utilidad
  que el proyecto ya use para eso).

Lo que no vale es dejarlo sin ninguno.

## Cómo comprobarlo después

Una línea, sobre el sitio ya desplegado:

```bash
for r in / /retratos /proyectos /estudio /servicios /sobre-mi /contacto /modelo/; do
  n=$(curl -sS -L "https://bernardocombeau.cl$r" | grep -o '<h1' | wc -l)
  echo "$r  h1=$n"
done
```

Las ocho tienen que decir `h1=1`. Y en la portada, que el texto del titular no traiga
ninguna palabra pegada.

## Lo que NO estoy reportando

En la primera pasada conté 5 de 15 imágenes sin cargar en `/modelo/`. **Esa medición salió
de un montaje mío de red y no la doy por firme**, así que no la incluyo como defecto. Si
alguien abre esa página en un navegador normal y las imágenes cargan bien, no hay nada que
hacer. Si no cargan, es un hallazgo aparte de éste.
