# Desvíos de Clara: tres correcciones al sitio publicado (2-nov)

**Clara (copy de interfaz), 2-nov-2026.** Rama `claude/magical-franklin-ckfki2`, sobre `5dd37d8d`.
**Qué se hizo:** se pasaron al texto las tres correcciones que Ramón decidió sobre el sitio ya publicado: una frase de «Quién
está detrás» y de /nosotros/, dominio y código, y el cargo. El mapa exacto (archivo, clave, texto actual y nuevo) es el del
encargo de la troncal, `marketing/encargos-otras-sesiones/encargo-sitio-tres-correcciones-2nov.md` (en `origin/main`), §2.
Se siguió tal cual.

**Archivos:**
- fuentes en `e13/texto/`: `home`, `nosotros`, `blog`, `desarrollo-web` y `comun` (solo un `por_que`);
- sus copias con huella en `spindlelab-astro/src/data/archivo/texto/`, regeneradas con `extraer-texto.mjs`;
- `spindlelab-astro/public/llms.txt`, líneas 5 y 33;
- fuera de lo publicado: `e13/herramientas/portada-30oct.mjs` (`PROY.pie`), `e13/herramientas/barrer-terminos.mjs` (un
  término nuevo) y `spec-visual.md` (fila 6 de la tabla de la home).

Cada elemento que cambió lleva en su JSON `estado: "cambia"`, `antes`, `por_que` y `origen` con la decisión y su fecha.

## 1 · Qué cambié, por qué, de dónde sale

| # | Qué cambié | Por qué | De dónde sale |
|---|---|---|---|
| 1a | `home.quien.p2`: «casi nunca en el anuncio, casi siempre en el lugar al que el anuncio lleva» pasa a «muchas veces no en el anuncio, sino en el lugar al que el anuncio lleva». El resto del párrafo, igual | Ramón no dejó escrita la razón. Lectura mía, no suya: «casi nunca» y «casi siempre» afirmaban una proporción sin dato, como la frase que ya salió de /diagnostico/ (`fuentes/desvios-v2.md`). Cambia el tono, no la idea | Decisión de Ramón, aprobada el 2-nov-2026 (puede afinarla después) |
| 1b | `nosotros.idea.1`: la misma cláusula, cambiada igual | Es la gemela de 1a | Ídem |
| 2a | `home.problema.sitio.2`: «Va en tu dominio.» pasa a «Va en tu dominio, a tu nombre. Y te entregamos el código completo.» Corregidos su `nota`, `fuente` y `origen`, que decían que «a tu nombre» no estaba confirmado | Es el argumento de propiedad de la columna «En tu sitio». Las palabras son la propuesta de la troncal y Ramón puede ajustarlas | Ramón confirmó el 30-oct-2026; aplicado el 2-nov |
| 2b | `dw.incluye.7`: suma «a tu nombre» y la oración «Te entregamos el código completo.» Su `condicion` (si el plan incluye comprar el dominio) sigue abierta | Que la página del servicio no diga menos que la portada. Sin hosting, licencias ni plazos: no están confirmados | Ídem |
| 3a | `home.quien.pie`: «Ramón Vallejos · Fundador de SpindleLab» | El cargo es «Fundador», sin «director» | Decisión de Ramón, 2-nov-2026 |
| 3b | `nosotros.json`, `title` (y con él el `og:title`): «Ramón Vallejos, fundador · SpindleLab» (37 caracteres; antes 48). El cambio se anota al final de `senales` | Ídem. El guardián de largos (`interiores.mjs`, title ≤ 60) pasa | Ídem |
| 3c | `nosotros.rol`: «Ramón Vallejos · Fundador de SpindleLab · Chile» | Ídem | Ídem |
| 3d | `articulo.autor` (los 7 artículos, una sola clave): «Ramón Vallejos · Fundador de SpindleLab». Vuelve a la firma de antes del 30-oct | Ídem | Ídem |
| 3e | `llms.txt` línea 5: «lo dirige Ramón Vallejos, su fundador, que viene…» | Ídem | Ídem |
| 3f | `llms.txt` línea 33: «Ramón Vallejos, fundador de SpindleLab: de dónde viene…» | Ídem | Ídem |
| 3, registro | `comun.entidad.cargo`, solo su `por_que`: la firma corta ya no dice «director». El `texto` (jobTitle) no cambia: nunca lo dijo | Que el registro no mienta | Ídem |
| 3, registro | En 3a, 3c y 3d se reescribió el `origen`. Antes atribuía el cargo con «director» a «Decisión de Ramón, 30-oct» | Según la troncal, el 30-oct Ramón dijo «dejar en fundador» y el sitio salió con «Fundador y director». Si el registro no se corrige, la próxima pasada cree que «director» fue lo decidido | Encargo de la troncal, §2 |
| 3, fuera de lo publicado | `portada-30oct.mjs`, `PROY.pie`; `spec-visual.md`, fila 6 de la home; término nuevo en `barrer-terminos.mjs`: `['cargo con «director»', /fundador y director\|director de SpindleLab/gi]` | Que la herramienta mida con el cargo de hoy y que el barrido lo atrape si vuelve. El término no toca «directorios» | Ídem |

**Lo que se queda a propósito:**
- **El verbo «dirige»** (`home.quien.p1`, `nosotros.description`, `llms.txt` línea 5). La decisión es sobre el cargo. Si Ramón
  prefiere otro verbo, es una palabra en cada uno (encargo §5).
- **`PROY.quien` de `portada-30oct.mjs`** sigue con «casi nunca en el anuncio…». Es el texto base del 30-oct que esa
  herramienta inyecta para fijar el techo de alto, no el texto publicado (ya difería antes de hoy). El encargo pidió solo
  `PROY.pie`.
- **La historia no se reescribe:** `e13/lectura-fria/`, `desvios/texto-30oct.md`, `copy/sitio-propio-direcciones.md` y
  `acta-qa-30oct.md` quedan como están. Lo que corrigen está aquí.

## 2 · 2a en una fila, no en dos

El encargo ofrecía partir la fila nueva en dos (`home.problema.sitio.2` «Va en tu dominio, a tu nombre.» y una nueva
`home.problema.sitio.5` «Te entregamos el código completo.»), y decía que no hacía falta tocar código. **Sí hacía falta:**
`index.astro` tiene un guardián que cae si la lista más larga deja de tener 4 filas («home, sección 2: la lista más larga ya no
tiene 4 filas»), y la regla `.int-par` de `archivo.css` cuenta 4 filas desde 834 (`repeat(4, auto)` y `grid-area … / 6 / …`,
`spec-home.md` §12.2). Partirla obligaba a Diego a tocar las dos cosas y a volver a medir una sección de 5 filas contra 3.

Va en una fila. **Medido** sobre el build de esta rama contra uno de `origin/main`, en Chromium sin cabeza, sección 2 de `/`:

| Ancho | Líneas de la fila nueva | Alto de la sección (main → rama) | Filetes entre columnas | Desborde |
|---|---|---|---|---|
| 390 | 2 | 843 → 864 | apiladas | 0 |
| 768 | 1 | 787 → 787 | apiladas | 0 |
| 834 | 2 | 640 → 661 | alineados | 0 |
| 1024 | 2 | 625 → 646 | alineados | 0 |
| 1194 | 2 | 602 → 623 | alineados | 0 |
| 1440 | 2 | 606 → 627 | alineados | 0 |

A 1440 la fila corta en «Va en tu dominio, a tu nombre. Y te / entregamos el código completo.», con el mismo alto que «La
plataforma decide a quién le muestra lo / que publicas.» en la otra columna: la columna no se rompe. Son 21 px más de alto.
Las mediciones de Diego (`portada-30oct.mjs` sin `--inyectar`) y de Javiera (peso, lectura en frío) siguen siendo suyas.

## 3 · Lo que esto cierra (sin reescribir donde estaba abierto)

- **`copy/sitio-propio-direcciones.md`** (las líneas «Por confirmar con Ramón antes de escribirlo», la fila «Va en tu dominio
  *(«a tu nombre», si Ramón lo confirma)*» y la pregunta 3, «Dos hechos»): **cerrado.** Ramón confirmó el 30-oct que el
  dominio queda a nombre del cliente y que el código se entrega completo; lo dijo de nuevo en el bloque que pegó a esta
  sesión el 2-nov.
- **`desvios/texto-30oct.md` §5, punto 4** («Dos hechos sin confirmar»): **cerrado** por lo mismo. La home dice ahora «Va en
  tu dominio, a tu nombre. Y te entregamos el código completo.»
- **El cargo** (`texto/convenciones-e12.json`, `afirmaciones_por_verificar`, «El cargo de Ramón («Fundador de
  SpindleLab…»)»): lo confirmó Ramón el 2-nov. Ese archivo no se copia al sitio y no lo toqué.

## 4 · Verificación

| Qué | Comando | Resultado |
|---|---|---|
| Copias iguales a sus fuentes | `node e13/herramientas/extraer-texto.mjs home nosotros blog comun desarrollo-web` y luego `--comprobar` | 16 «igual», sale con 0 |
| Build con los guardianes | copia de `spindlelab-astro/` en el scratchpad, `node_modules` enlazado, `npx astro build` | 22 páginas, sin errores |
| Cero cargo viejo y cero frase vieja | `grep -ri "fundador y director"` y `grep -r "casi nunca en el anuncio"` sobre el `dist` (con `llms.txt`) | 0 y 0 |
| Textos nuevos, exactos | `grep -F` de cada uno en el `dist` | la cláusula nueva en `/` y `/nosotros/`; la fila en `/`; «Fundador de SpindleLab» como pie en `/`, firma en `/nosotros/` y `autor__rol` en los 7 artículos; title y og:title de `/nosotros/`; la línea nueva en `/servicios/desarrollo-web/` |
| Barrido de términos, con el nuevo | `barrer-terminos.mjs dist --resumen` | «cargo con «director»»: 0 (sobre el build de `origin/main`, el mismo término da 13 en 10 archivos: `/` 1, `/nosotros/` 3, cada artículo 1, `llms.txt` 2, lo que contó la troncal en vivo); rayas largas o medias: 0. Los otros términos, idénticos a `origin/main` (mini-diagnóstico solo en la URL y la imagen del artículo, «motor de IA», «agentes de IA» solo en Quién está detrás de `/` y `/nosotros/`) |
| Precios, enlaces y rutas contra `origin/main` | build de `git archive origin/main` y diff de `$…`, `minPrice`/`price`, todos los `href` y la lista de `.html` | iguales; 24 `.html` en los dos |
| Qué páginas cambian | `cmp` de cada `.html` contra `origin/main` | `/`, `/nosotros/`, los 7 artículos y `/servicios/desarrollo-web/`. `/trabajo/combeau/` difiere solo en el nombre de un `hoisted.*.js` (las dos versiones importan lo mismo en otro orden: no es texto). Fuera del HTML, `llms.txt` y el `sitemap.xml` (la rama trae el sitemap viejo; el corte lo regenera) |
| Imágenes para compartir | mirada a `og-e12-nosotros.jpg`, `og-e12-marca.jpg` y `og-e12-blog-que-es-aeo-geo.jpg`, y búsqueda de «director» en los generadores de `e13/herramientas/` | ninguna lleva cargo; ningún generador lo escribe (el único «director» estaba en `portada-30oct.mjs`, que mide, no genera imágenes) |

## 5 · Qué quedó abierto

- **Las palabras de 2a y 2b** son la propuesta de la troncal. Ramón puede ajustarlas; el hecho (dominio a nombre del cliente,
  código completo) es suyo.
- **La frase de 1a y 1b** la aprobó Ramón y puede afinarla después.
- **El verbo «dirige»**, si Ramón lo quiere cambiar (encargo §5).
- **QA de Javiera** en conversación aparte, el corte y el PR: los hace la orquestadora. Nada de esto se publicó.
