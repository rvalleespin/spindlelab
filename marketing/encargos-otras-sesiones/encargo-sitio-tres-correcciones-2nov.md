# Encargo al sitio: tres correcciones (una frase, dominio y código, el cargo)

**De:** la troncal · **Fecha:** 2-nov-2026
**Para:** la sesión que construye el sitio (obra E13, rama `claude/magical-franklin-ckfki2`). No se le puede escribir: solo lee
archivos en `main` o el texto que Ramón le pega. Por eso el bloque de abajo se entiende solo.
**Decide:** Ramón ya decidió las tres. El merge a `main` sigue siendo suyo.
**Verificado sobre:** `origin/main` `c377dfd6`, la rama de la obra `5dd37d8d` y las 22 páginas vivas de spindlelab.cl,
leídas el 2-nov hacia las 12:50.

## Bloque para pegar (Ramón copia solo lo que va entre las dos líneas con tres acentos graves)

```
Hola. Ramón decidió tres correcciones al sitio ya publicado, spindlelab.cl (dos el 30-oct y la del cargo el 2-nov). Ninguna está todavía en las 22 páginas: la troncal lo comprobó en vivo.
Trabaja en tu rama de siempre (claude/magical-franklin-ckfki2) y edita el texto en la fuente (carpeta marketing/oficina/obras-web/spindlelab-v3/e13/texto/), no en las copias de spindlelab-astro/; las copias se regeneran con extraer-texto.mjs.

1. Frase de «Quién está detrás» (home) y su gemela de «De dónde sale SpindleLab» (/nosotros/). Hoy: «casi nunca en el anuncio, casi siempre en el lugar al que el anuncio lleva». Debe decir: «muchas veces no en el anuncio, sino en el lugar al que el anuncio lleva». Ramón aprobó esta versión y puede mejorarla después: no está cerrada.
2. Dominio y código. Ramón confirmó el 30-oct el hecho (el dominio queda a nombre del cliente y el código se entrega completo); las palabras exactas de abajo son una propuesta de la troncal que él puede ajustar. En la home, columna «En tu sitio», «Va en tu dominio.» pasa a «Va en tu dominio, a tu nombre. Y te entregamos el código completo.» Opcional: una línea igual en /servicios/desarrollo-web/. No agregues nada más (ni hosting, ni licencias, ni plazos).
3. Cargo: «Fundador», sin «director». Hoy dice «Fundador y director» en la home, en /nosotros/ (título y firma), en la firma de los 7 artículos del blog y en llms.txt (dos líneas). Mira también si alguna imagen para compartir lleva el cargo escrito: la troncal vio las 22 y ninguna lo lleva; confírmalo al armar.

No cambies precios, enlaces ni nada más. Después: construir el sitio, pasar la revisión de Javiera en una conversación aparte (el texto ya es público, así que esa revisión es obligatoria), preparar de nuevo la versión que se publica (el corte) y abrir la solicitud de cambio (PR) hacia main. Ramón la aprueba con el botón «Merge pull request».
El detalle exacto (archivo, clave y texto actual de cada cambio) está en marketing/encargos-otras-sesiones/encargo-sitio-tres-correcciones-2nov.md, en main cuando Ramón junte el PR de la troncal.
```

---

## 1. Lo que midió la troncal (2-nov, sobre el sitio vivo)

- **Las 22 URL del sitemap responden 200.** El sitio vivo coincide con `main` en todo lo que busqué: `llms.txt` es idéntico byte
  a byte y cada texto citado abajo sale igual en vivo. La rama de la obra solo difiere de `main` en el sitemap (ver 4.7).
  Las 16 copias de `src/data/archivo/texto/*.json` en `main` son idénticas a sus 16 fuentes `e13/texto/*.json` de la rama
  (mismo contenido y misma huella sha256): 16 de 16.
- **«Fundador y director» en vivo:**

  | Página | Veces |
  |---|---|
  | `/` | 1 (el rótulo de «Quién está detrás») |
  | `/nosotros/` | 3 (`<title>`, `og:title` y la firma) |
  | Cada uno de los 7 artículos | 1 (la firma del autor) |
  | `llms.txt` | 2 (líneas 5 y 33) |
  | Las otras 13 páginas | 0 |

  El `jobTitle` del JSON-LD de `#autor-ramon` ya dice «Fundador de SpindleLab: sitios web a medida y marketing con IA»,
  sin «director».
- **Imágenes.** Miré una por una las 22 tarjetas para compartir (`og-e12-*.jpg`, las versiones que sirve el sitio) y los dos
  retratos (`ramon-vallejos-34.webp` y `ramon-vallejos-avatar.jpg`). Las tarjetas llevan logo y titular, y las seis de servicio
  suman un precio; las de `/trabajo/` y `/trabajo/combeau/` llevan capturas de los sitios de los casos; los retratos son
  fotos sin texto. Ninguna lleva cargo. El generador de las tres de 30-oct (`e13/herramientas/og-30oct.mjs`) tampoco: lee
  solo el h1 y el rótulo de la home.
- **La frase «casi nunca en el anuncio…»:** 1 vez en `/` y 1 en `/nosotros/`. En ningún otro lugar del sitio.
- **«Va en tu dominio.»:** 1 vez en `/`, columna «En tu sitio».

## 2. Mapa exacto

Las rutas de «Fuente» son las que se editan, bajo `marketing/oficina/obras-web/spindlelab-v3/` en la rama de la obra. «Copia»
es el mismo texto en `spindlelab-astro/src/data/archivo/texto/` de `main`: **no se edita a mano**, la regenera
`extraer-texto.mjs`. Las líneas son las de `5dd37d8d` (fuente) y `c377dfd6` (copia).

### Corrección 3: cargo «Fundador», sin «director»

El formato tiene que seguir siendo «nombre · rol»: `blog.mjs` parte el autor en el primer « · » y `interiores.mjs` exige
`igualQue(firma.nombre, 'Ramón Vallejos')`.

| # | Dónde se ve | Fuente (línea) | Copia (línea) | Clave | Texto actual, literal | Texto nuevo |
|---|---|---|---|---|---|---|
| 3a | `/`, «Quién está detrás» | `e13/texto/home.json` L733 | L738 | `texto.secciones[6].elementos[1]`, id `home.quien.pie` | «Ramón Vallejos · Fundador y director de SpindleLab» | «Ramón Vallejos · Fundador de SpindleLab» |
| 3b | `/nosotros/`, `<title>` y `og:title` | `e13/texto/nosotros.json` L6 | L11 | `texto.title` | «Ramón Vallejos, fundador y director · SpindleLab» | «Ramón Vallejos, fundador · SpindleLab» |
| 3c | `/nosotros/`, la firma | `e13/texto/nosotros.json` L78 | L83 | `texto.secciones[0].elementos[6]`, id `nosotros.rol` | «Ramón Vallejos · Fundador y director de SpindleLab · Chile» | «Ramón Vallejos · Fundador de SpindleLab · Chile» |
| 3d | Los 7 artículos (una sola clave) | `e13/texto/blog.json` L139 | L144 | `texto.secciones[1].elementos[2]`, id `articulo.autor` | «Ramón Vallejos · Fundador y director de SpindleLab» | «Ramón Vallejos · Fundador de SpindleLab» |
| 3e | `llms.txt`, línea 5 | `spindlelab-astro/public/llms.txt` (sin copia: se edita directo en la rama) | igual en `main` | línea 5 | «SpindleLab lo dirige Ramón Vallejos, su fundador y director, que viene de años en agencias de medios y de marketing.» | «SpindleLab lo dirige Ramón Vallejos, su fundador, que viene de años en agencias de medios y de marketing.» |
| 3f | `llms.txt`, línea 33 | ídem | ídem | línea 33 | «Ramón Vallejos, fundador y director de SpindleLab: de dónde viene, cómo trabaja y qué puedes esperar.» | «Ramón Vallejos, fundador de SpindleLab: de dónde viene, cómo trabaja y qué puedes esperar.» |

Además, en esos mismos elementos (3a, 3c, 3d) hay que actualizar `antes`, `por_que` y `origen`. Hoy atribuyen el cargo a
«Decisión de Ramón, 30-oct». La troncal tiene anotado que ese día Ramón dijo «dejar en fundador» y que el sitio salió con
«Fundador y director»; la decisión explícita es la del 2-nov. Si el registro no se corrige, la próxima pasada cree que
«director» es lo decidido.

- **Registro sin efecto en pantalla.** `e13/texto/comun.json`, `texto.entidad[1]` (id `comun.entidad.cargo`): su `texto` ya
  dice «Fundador de SpindleLab: sitios web a medida y marketing con IA» y **no se toca**. Su `por_que` (fuente L184, copia
  L189) dice «En pantalla, la firma corta es «Fundador y director de SpindleLab» (home.quien.pie y nosotros.rol)»: es lo
  único de `comun.json` que menciona «director», y hay que ponerlo al día para que el registro no mienta.
- **Fuera de lo que se publica, también lleva el cargo viejo:** `e13/herramientas/portada-30oct.mjs` L265 (la cadena
  `PROY.pie`, de medición; si se vuelve a correr, mide con el ancho del cargo anterior) y `spec-visual.md` L343. Los
  archivos de `e13/lectura-fria/` y `e13/desvios/texto-30oct.md` son historia: no se reescriben; la corrección se anota en
  el archivo de desvíos nuevo.
- **Para que no vuelva:** agregar un término a `e13/herramientas/barrer-terminos.mjs` (lista `TERMINOS`), por ejemplo
  `['cargo con «director»', /fundador y director|director de SpindleLab/gi]`. Hoy el barrido no lo tiene.

### Corrección 1: la frase

Se cambia solo la cláusula; el resto de cada párrafo queda igual. Los dos elementos están hoy en `estado: "nuevo"`:
pasan a `"cambia"` con su `antes`.

| # | Dónde se ve | Fuente (línea) | Copia (línea) | Clave | Texto actual, literal |
|---|---|---|---|---|---|
| 1a | `/`, «Quién está detrás» | `e13/texto/home.json` L752 | L757 | `texto.secciones[6].elementos[3]`, id `home.quien.p2` | «Ahí vio dónde se pierde lo que una marca invierte para atraer clientes: casi nunca en el anuncio, casi siempre en el lugar al que el anuncio lleva. SpindleLab parte de esa idea. Construimos el sitio como el eje del negocio y le conectamos la búsqueda, la pauta, las redes y la medición.» |
| 1b | `/nosotros/`, «De dónde sale SpindleLab» | `e13/texto/nosotros.json` L151 | L156 | `texto.secciones[1].elementos[1]`, id `nosotros.idea.1` | «En las agencias vio dónde se pierde lo que una marca invierte para atraer clientes: casi nunca en el anuncio, casi siempre en el lugar al que el anuncio lleva. Un sitio que no explica bien lo que se vende, o un formulario que no avisa cuando alguien escribe, basta para perder lo que costó traer a esa persona.» |

**Cláusula nueva (la que eligió Ramón, en ambos):** «muchas veces no en el anuncio, sino en el lugar al que el anuncio
lleva». Queda: «…atraer clientes: muchas veces no en el anuncio, sino en el lugar al que el anuncio lleva. SpindleLab parte…»
y «…atraer clientes: muchas veces no en el anuncio, sino en el lugar al que el anuncio lleva. Un sitio que…».

**Nota de contexto:** en la QA del 30-oct (vuelta 2) esta frase fue la que 2 de 3 lectores en frío citaron como lo que les
hizo sentido (`acta-qa-30oct.md`). Cambia el tono, no la idea, y el texto se mide otra vez (ver 4.5). La razón de Ramón para
suavizarla no me la dijo; mi lectura, que es mía y no suya, es que «casi nunca» y «casi siempre» afirman una proporción sin
dato, y el sitio ya sacó otra afirmación así de `/diagnostico/` (`fuentes/desvios-v2.md` L107). Que Clara la use o no.

### Corrección 2: dominio a nombre del cliente y código completo

| # | Dónde se ve | Fuente (línea) | Copia (línea) | Clave | Texto actual, literal | Texto propuesto |
|---|---|---|---|---|---|---|
| 2a | `/`, sección 2, columna «En tu sitio», fila 2 | `e13/texto/home.json` L197 | L202 | `texto.secciones[1].elementos[9]`, id `home.problema.sitio.2` | «Va en tu dominio.» | «Va en tu dominio, a tu nombre. Y te entregamos el código completo.» |
| 2b (opcional) | `/servicios/desarrollo-web/`, «En todos los planes», ítem 7 | `e13/texto/desarrollo-web.json` L148 | L153 | `texto.secciones[1].elementos[6]`, id `dw.incluye.7` | «Lo publicamos en tu dominio, con certificado de seguridad (el candado junto a la dirección) y medición de visitas. Después tienes 30 días de garantía: si algo no funciona como se aprobó, lo corregimos.» | «Lo publicamos en tu dominio, a tu nombre, con certificado de seguridad (el candado junto a la dirección) y medición de visitas. Te entregamos el código completo. Después tienes 30 días de garantía: si algo no funciona como se aprobó, lo corregimos.» |

**El registro de 2a dice lo contrario y hay que corregirlo.** El `nota` de `home.problema.sitio.2` (fuente L201, copia L206)
dice ««A tu nombre» no va: que el dominio quede registrado a nombre del cliente y que se le entregue el código no están
confirmados». Ya están confirmados. Actualizar `nota`, `fuente` y `origen` citando la confirmación de Ramón del 30-oct.
`e13/copy/sitio-propio-direcciones.md` (L29 y L30, L85, L116) y `e13/desvios/texto-30oct.md` §5 punto 4 también los dan por
abiertos: el archivo de desvíos nuevo los cierra, sin reescribir esos dos.

**Dos detalles de composición para Clara y Lucía:**

- La fila nueva es 49 caracteres más larga que la anterior, en una columna de filas cortas. Si no calza o rompe el ritmo,
  la alternativa es partirla en dos filas: `home.problema.sitio.2` «Va en tu dominio, a tu nombre.» y una nueva
  `home.problema.sitio.5` «Te entregamos el código completo.». `index.astro` (L66 a L70) lee las filas hasta que falta una, así
  que no hace falta tocar código. La columna quedaría de 5 filas contra 3: se vuelve a medir la sección 2.
- 2b se puede dejar fuera sin perder nada. Si entra, no toca precios ni los guardianes del build.

**Comprobado que ninguna otra página dice lo contrario.** Revisé las 16 fuentes de texto y el texto visible de las 22
páginas vivas buscando hosting, alojamiento, propiedad, licencia, arriendo, suscripción, servidor, «a nombre», «a tu
nombre», repositorio, traspaso, dueño, pertenece, migrar y contrato. Lo que hay es compatible:

- `dw.planes.nota` y `dw.faq.4.r`: «Para publicar necesitamos acceso a tu dominio» (o sea, el dominio es del cliente).
- `/trabajo/combeau/`: «una cuenta de GitHub, el servicio donde se guarda su sitio» (el código está en la cuenta del cliente).
- `dw.incluye.2`: «Código propio, escrito para este sitio». Ese «propio» es «hecho a medida», no «del cliente»; leído al lado de
  «te entregamos el código completo» no choca, pero conviene que Clara lo vea.
- `/servicios/` y `/servicios/auditoria-seo-tecnica/`: «te dejamos el plan y el código listos para tu equipo» es de la
  auditoría, otro entregable. No confundir.
- `llms.txt` línea 5 ya dice «esa dirección… va en el dominio de la empresa»; la FAQ de la home dice «El sitio va en tu
  dominio». Compatibles; no hace falta tocarlas.
- Respaldo fuera del sitio: la skill `cotizaciones` («Todo contratado a nombre del cliente», `SKILL.md` L54).

**No inventar matices.** Lo confirmado es solo «dominio a nombre del cliente y código completo». Nada de hosting,
licencias, plazos de traspaso ni «para siempre».

## 3. Lo que ya está bien y no hay que tocar

- **El «yo» ya salió.** `home.pruebas.propio.texto` está en plural, en vivo: «lo corrimos sobre nuestro propio sitio… lo
  corregimos». La home no tiene primera persona singular, y `/nosotros/` está en tercera persona. Aparte: el artículo
  «Cómo elegir (y verificar) una agencia de AEO/GEO» conserva en su cuerpo la primera persona singular («Le pregunté a
  ChatGPT…», «Las tres me devolvieron…»). Es texto del artículo, no el cargo ni la home, y nadie pidió tocarlo.
- **Precios, tal como están en vivo y en el JSON-LD (`minPrice`), todos más IVA:**

  | Servicio | Precios |
  |---|---|
  | Desarrollo web | $390.000, $690.000 y $1.190.000 |
  | Auditoría SEO técnica | $490.000 y $690.000 |
  | Visibilidad en IA | $400.000, $590.000 y $790.000 |
  | Paid media | $350.000 y $550.000 |
  | Redes sociales | $390.000 y $590.000 |
  | Acompañamiento mensual | $590.000 y $790.000 |

  Ninguna de las tres correcciones los toca, y el paso de QA los compara contra `origin/main`.
- **Las 22 URL** del sitemap, con sus rutas, títulos y canonical. Solo cambia el `<title>` de `/nosotros/` (3b).
- **La línea de la casa publicada:** rótulo «Sitios web a medida y marketing con IA», titular «En redes arriendas. Tu sitio es lo
  único que es tuyo.», acción «Hablemos de tu sitio», revisión gratis de una página con respuesta en un día hábil, el panel
  en todos los planes de Desarrollo web.
- **El `jobTitle` del JSON-LD** (`comun.entidad.cargo`, texto): ya correcto.
- **`/privacidad/`** dice «representada por su fundador Ramón Vallejos Espíndola»: ya está bien.
- **Las 22 imágenes para compartir y los retratos:** no se rehacen ni se les sube la versión.
- **Lo ya integrado en la rama:** el Pixel correcto (PR #53) y la clave de IndexNow (PR #52). El árbol `spindlelab-astro/` de
  la rama es idéntico al de `main` salvo el sitemap.

## 4. Flujo, paso a paso

Los pasos 4.1 a 4.3 y 4.6 salen de leer los scripts y `lista-publicacion.md`; no los corrí. Lo no confirmado va marcado.

1. **Sincronizar.** `git fetch origin`; `git ls-remote origin refs/heads/claude/magical-franklin-ckfki2` tiene que dar el mismo
   hash que `git rev-parse HEAD` (hoy, `5dd37d8d`). *No confirmado:* si la sesión del sitio tiene commits locales sin
   subir; desde acá solo veo `origin`.
2. **Editar la fuente.** Clara: `e13/texto/home.json`, `nosotros.json`, `blog.json`, `comun.json` (solo el `por_que`) y, si
   entra 2b, `desarrollo-web.json`. En cada elemento que cambia: `antes`, `por_que`, `origen` («Decisión de Ramón, 2-nov»).
   Diego: `spindlelab-astro/public/llms.txt`, líneas 5 y 33. Los JSON de `spindlelab-astro/src/data/archivo/texto/` no se tocan.
3. **Regenerar las copias y comprobar.**
   `node marketing/oficina/obras-web/spindlelab-v3/e13/herramientas/extraer-texto.mjs home nosotros blog comun desarrollo-web`
   (siempre copia también `comun`) y luego, con el mismo script, `--comprobar`: tiene que imprimir 16 líneas «igual» y salir con 0.
4. **Construir.** `cd spindlelab-astro && npx astro build`: 22 páginas y los guardianes en verde. Si un guardián cae por el
   texto nuevo, se arregla el texto, no el guardián (`guia-para-roles.md`, sección 3).
5. **QA exprés de Javiera, en un subagente nuevo.** No en la conversación donde se editó: un revisor que oyó al
   constructor aprueba lo que entiende, no lo que ve. Y es obligatoria porque el texto está en vivo. Qué mide (todo sale de
   `lista-publicacion.md` y del acta del 30-oct):
   - cero «fundador y director» (sin importar mayúsculas) en el `dist` y en `llms.txt`, y cero «casi nunca en el anuncio»;
   - los textos nuevos, cada uno 1 vez y exactos, en `/`, `/nosotros/` y los 7 artículos;
   - `node scripts/verificar.mjs --ancho 390` (y 768, 1440) con `--excluir /privacidad/`: «Sin hallazgos»;
   - peso de la home con `peso-30oct.mjs`: primera carga a 1440 en 1.400 kB o menos. El 30-oct quedó con 1.236 bytes de margen;
     la fila de 2a suma unos 49 caracteres antes de comprimir. *No medido:* hace falta el build;
   - la sección 2 medida otra vez con `portada-30oct.mjs` (sin `--inyectar`) a 390, 768, 834, 1024, 1194 y 1440: filetes
     alineados y sin desborde;
   - lectura en frío de la home con `lectura-fria-texto.mjs` y `lectura-fria.py` (el criterio del 30-oct para texto de la
     home; no sé si Javiera la exige también para un cambio tan chico: es su decisión);
   - `barrer-terminos.mjs` sobre el `dist` (con el término nuevo), cero rayas largas o medias, precios iguales a `origin/main`.

   El veredicto va por escrito: `e13/acta-qa-2nov.md`.
6. **Dejar el registro.** Archivo nuevo `e13/desvios/texto-2nov.md` («qué cambié / por qué / de dónde sale») y una entrada
   en `spec-home.md`, sección 11 («Historial de correcciones»). Una corrección que queda en el chat vuelve como defecto en
   la pasada siguiente.
7. **Rearmar el corte** con `e13/herramientas/armar-corte.mjs` y la receta de `e13/lista-publicacion.md` (sección 2), con
   tres ajustes (el 2 es un recordatorio: la receta ya lo trae en su paso 4, pero la rama de la obra todavía tiene las fechas viejas):
   1. **No reusar `claude/v3-publicacion`.** La receta dice `-B claude/v3-publicacion` y `--force-with-lease`, pero esa rama
      hoy apunta en `origin` a `0b405842`, el commit de la línea de la casa (PR #54), que ya está dentro de `main`. Usar una
      rama nueva desde `origin/main`, por ejemplo `claude/sitio-tres-correcciones-2nov` (CLAUDE.md: ramas `claude/<descripción>`).
   2. **Regenerar el sitemap con la fecha del día de publicación** (paso 4 de la receta: `generar-sitemap.mjs dist <AAAA-MM-DD>
      --escribir public/sitemap.xml`). La rama trae 22 `lastmod` en `2026-10-26`; `main` y el sitio vivo traen 15 en
      `2026-10-30` y 7 (los artículos) en `2026-10-26`. Armar el corte sin regenerarlo retrocede las fechas. Los artículos
      toman su propio `dateModified` del JSON-LD: el 30-oct no lo subieron por cambiar solo la firma, y si Simón decide otra
      cosa se sube en el JSON del artículo, no a mano en el sitemap.
   3. **Los documentos nuevos** (`acta-qa-2nov.md`, `desvios/texto-2nov.md`) se copian a mano después del paso 3 si
      `armar-corte.mjs` no los lleva (le pasó lo mismo al acta del 30-oct, paso 3b). *No confirmado:* qué copia hoy el
      script; solo leí su cabecera.

   Antes de armar: `git fetch origin` y repetir el diff `git diff origin/main -- spindlelab-astro` contra la obra. Hoy da solo
   el sitemap, pero `main` recibe pushes todos los días. *No confirmado:* que `rsync` y la versión de Node de esa máquina
   sirvan (en la nube faltó `rsync` el 30-oct; producción usa Node 20 según `.nvmrc` y el ensayo del 26-oct fue con Node 24).
8. **PR contra `main`** desde la URL que imprime el push (`gh` no está instalado en la Mac). En el cuerpo: qué cambia en
   producción (`/`, `/nosotros/`, los 7 artículos, `llms.txt`, el sitemap y, si entra 2b, `/servicios/desarrollo-web/`), las tres
   decisiones de Ramón con su fecha y el acta de Javiera. **Ramón mergea con método «merge», nunca squash, en el mismo turno.**
   Llegar a `main` ya es publicar.
9. **Después del merge.** Verificar en vivo contra el texto nuevo, no contra el listado de Cloudflare: «Production, Active» no
   es «servido», y el borde tarda uno o dos minutos. Las 22 URL en 200; cero «fundador y director» en las 22 páginas y en
   `llms.txt`; el sitemap con 22 URL. Opcional, de `lista-publicacion.md` sección 5: avisar el cambio por IndexNow con las
   URL que cambiaron (`/`, `/nosotros/`, los 7 artículos y, si entra, `/servicios/desarrollo-web/`).

## 5. Lo que queda abierto para Ramón (no frena nada)

- **El verbo «dirige».** La decisión es sobre el cargo; el verbo queda en tres lugares: `home.quien.p1` («SpindleLab lo dirige
  Ramón Vallejos»), `nosotros.description` («Ramón Vallejos dirige SpindleLab») y `llms.txt` línea 5, donde queda «lo dirige
  Ramón Vallejos, su fundador». Propongo dejarlo; si prefiere otro verbo, es un cambio de una palabra en cada uno.
- **Si la fila de 2a se parte en dos** (ver arriba).

## 6. Sin verificar (lo que afirmo apoyado en notas y no en el original)

- La confirmación de Ramón del 30-oct («el dominio y código se le pasa completo al cliente») la tengo de la memoria de la
  troncal y del encargo de hoy, no de la conversación original.
- Que Ramón dijo «dejar en fundador» el 30-oct: misma fuente, la memoria de la troncal.
- El sentido de 4.5 para la lectura en frío y el margen de peso de la home vienen del texto de `lista-publicacion.md` y del
  acta del 30-oct; no corrí ninguna de esas herramientas.
- El estado de la sesión del sitio (si su carpeta local está al día con `origin`) no lo veo desde acá.
