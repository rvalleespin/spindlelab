# Encargo — los encabezados de bernardocombeau.cl

**Fecha:** 2026-10-10 · **Corregido:** 2026-10-10, ver §0
**De:** sesión del rediseño del sitio de SpindleLab (v3)
**Para:** la sesión que mantiene `rvalleespin/bernardo-combeau`
**Cliente:** Bernardo Combeau (fotógrafo y modelo, Santiago)

## 0 · Aviso: la primera versión de este encargo tenía tres errores

Se escribió midiendo **solo el HTML servido**, sin leer el código fuente del sitio. Una
revisión posterior leyó el repo y encontró que tres cosas estaban mal. Van corregidas
abajo, y se deja constancia para que nadie trabaje sobre la versión vieja:

1. **Decía que había que editar el `<h1>` de la portada.** Ese `<h1>` literal **no existe**:
   el titular es un dato.
2. **Decía que las seis interiores salían de una plantilla común y era «una línea».** No:
   son **seis ediciones más una de CSS**.
3. **Decía «siete de ocho páginas».** El sitio tiene **once rutas**; son **siete de once**,
   y el bucle de comprobación no cubría tres de ellas.

## 1 · Por qué llega esto desde otra sesión

Bernardo dio el permiso de caso público, así que su sitio entró al índice de trabajo del v3
de SpindleLab y se **recapturó desde el sitio vivo**. Midiendo esas capturas aparecieron los
defectos. Su sitio vive en `rvalleespin/bernardo-combeau`, fuera del alcance de aquella
sesión, así que esto va como encargo y no como push.

## 2 · El problema

**Siete de las once rutas no tienen `<h1>`. La única de la portada lo tiene roto.**

| Ruta | `<h1>` | Qué hace de titular |
|---|---|---|
| `/` | 1 | el `<h1>` roto del §3 |
| `/retratos` | **0** | `<h2>Retratos` |
| `/proyectos` | **0** | `<h2>Proyectos` |
| `/estudio` | **0** | `<h2>Estudio` |
| `/servicios` | **0** | `<h2>Servicios` |
| `/sobre-mi` | **0** | `<h2>Sobre mí` |
| `/contacto` | **0** | `<h2>Contacto` |
| `/modelo/` | **0** | su primer `<h2>` es «Selected Work», que es una sección |
| `/modelo/work` | 1 | correcta |
| `/modelo/motion` | 1 | correcta |
| `/modelo/commercials` | 1 | correcta |

Las tres últimas están bien y se verificaron: dan 200 con `h1=1` y título propio.

El `<h1>` es lo primero que lee una máquina para saber de qué trata una página. Es
exactamente lo que SpindleLab vende que no hay que tener, en el sitio del único caso de
desarrollo web que la casa puede mostrar.

## 3 · El titular de la portada se lee pegado

Servido hoy:

```html
<h1>Un buen retrato no se toma. Se construye<br>dirigiendo a la persona hasta su mejor versión.<br><br></h1>
```

`<br>` no aporta espacio al `textContent`, así que una máquina lee «Se construye**dirigiendo**».

**Dónde está de verdad, que no es el HTML:**

```
bernardo-site/src/data/home.json:3
  "fraseHero": "Un buen retrato no se toma. Se construye\ndirigiendo a la persona hasta su mejor versión.\n\n"

bernardo-site/src/pages/index.astro:13   const heroLines = home.fraseHero.split('\n');
bernardo-site/src/pages/index.astro:50   <h1>{heroLines.map((line, i) => <>{i > 0 && <br />}{line}</>)}</h1>
```

Los tres `<br>` son consecuencia de ese `split`, no marcado escrito a mano.

**Y por eso arreglar el dato no sirve:** `fraseHero` es un campo **que Bernardo edita él
mismo** desde el panel (`bernardo-site/public/admin/index.html:1502`), cuyo texto de ayuda
dice *«Usa una línea en blanco para forzar el salto de línea»*. El `\n\n` del final es
Bernardo haciendo lo que el panel le indica. Si se corrige `home.json`, vuelve en la próxima
edición suya.

**El arreglo durable va en la plantilla** (`index.astro:50`): unir las líneas de modo que el
`textContent` lleve espacio, e ignorar las líneas vacías del final. Conviene alinear también
la vista previa del panel, que hace el mismo `split` en `public/admin/index.html:388`.

## 4 · Las seis interiores: seis ediciones y una de CSS

El titular **ya está escrito y a la vista** en las seis, solo que marcado como `<h2>`, y cada
`<title>` lo confirma («Retratos — Bernardo Combeau», «Estudio — Bernardo Combeau»).

**No salen de una plantilla común.** Cada página tiene su propio literal
`<div class="page-head"><h2>…</h2></div>`:

```
retratos/index.astro:17 · proyectos/index.astro:17 · estudio.astro:18
servicios.astro:12      · sobre-mi.astro:20        · contacto.astro:14
```

Y el tamaño cuelga de una regla global:

```
bernardo-site/src/styles/global.css:25
  .page-head h2 { font-size: clamp(1.8rem, 4vw, 2.6rem); }
```

Al pasar a `<h1>` hay que **mover o duplicar esa regla**, o el titular cambia de tamaño a la
vista. Conviene revisar después que los `<h2>` restantes sigan teniendo sentido como
subsecciones.

## 5 · `/modelo/`: decisión, no mecánica

Su primer `<h2>` es «Selected Work», una sección. El sujeto de la página es la persona, y el
`<title>` ya lo dice: «Bernardo Combeau — Model».

- **Si la cabecera de esa sección es propia de `/modelo/`**, el rótulo de marca
  `BERNARDO COMBEAU | MODEL` puede ser el `<h1>` tal cual.
- **Si es compartida** con `/modelo/work`, `/modelo/motion` y `/modelo/commercials`, no
  sirve: esas tres ya tienen su propio `<h1>` y un segundo encabezado de nivel uno rompería
  la jerarquía. Entonces el `<h1>` va en el héroe, oculto a la vista si la composición debe
  seguir siendo solo fotografía.

## 6 · Cómo comprobarlo después

Las **once** rutas, no ocho:

```bash
for r in / /retratos /proyectos /estudio /servicios /sobre-mi /contacto \
         /modelo/ /modelo/work /modelo/motion /modelo/commercials; do
  n=$(curl -sS -L "https://bernardocombeau.cl$r" | grep -o '<h1' | wc -l)
  echo "$r  h1=$n"
done
```

Las once tienen que decir `h1=1`. Y en la portada, que el titular no traiga ninguna palabra
pegada. **El commit no cierra este encargo: lo cierra este bucle.**

## 7 · Lo que NO se reporta como defecto

En una primera pasada se contaron 5 de 15 imágenes sin cargar en `/modelo/`. **Esa medición
salió de un montaje de red y no se da por firme.** Si alguien abre esa página en un navegador
normal y cargan bien, no hay nada que hacer.

Y un dato que la primera versión usaba mal: `data-astro-cid-*` aparece **solo en `/modelo/`**,
no en las seis interiores. Que todo el sitio es Astro se ve por
`<meta name="generator" content="Astro v7.3.1">`, presente en las once rutas.
