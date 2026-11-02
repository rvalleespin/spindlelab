# Home nueva, composición Koto · propuesta de texto

**2-nov-2026 · Clara (copy de interfaz).** Propuesta para revisión de Ramón. No toca `e13/texto/*.json`
ni nada publicado: cuando Ramón la apruebe, recién ahí se pasa a `home.json` y a las páginas internas.

**Lo que cambia, en números.** La home publicada tiene **1.400 palabras** visibles en nueve secciones
(contadas sobre `e13/texto/home.json`, sin notas internas). Esta propuesta tiene **586**, en nueve bloques,
contadas por slot con `contar-palabras.py` (en esta carpeta) (todo lo que se lee en pantalla, incluidos botones, precios y fichas; sin
encabezado ni pie, que son comunes). Sin la pieza opcional de spindlelab.cl, **567**. Queda bajo el piso de 600
a propósito: en Koto la imagen es la que habla y cada palabra de más compite con ella. Si Ramón quiere más
texto, el lugar donde rinde es la ficha de cada pieza de trabajo, no las bandas.

**La forma, como Koto** (lock `e12/lock-koto.md` §2.8): cada bloque abre con un **rótulo en dos tintas**, la
primera parte en blanco y la continuación en gris, en la misma línea. Debajo, una o dos frases, el precio si
corresponde y el enlace a la página donde está el detalle. Una imagen por bloque.

---

## 1 · Sección → texto → palabras → imagen

Las barras `/` separan slots. Lo que va entre «» es texto en pantalla; lo demás es indicación.

| # | Sección | Texto | Palabras | Imagen que la acompaña |
|---|---|---|---|---|
| 1 | **Portada** (igual que hoy) | Rótulo «Sitios web a medida y marketing con IA» / h1 «En redes arriendas. Tu sitio es lo único que es tuyo.» / entradilla «El anuncio, el post, la búsqueda en Google y la respuesta de ChatGPT llevan a la misma dirección. Diseñamos y programamos esa dirección a medida, con un panel para que la edites tú, y conectamos lo demás a ella.» / botón amarillo «Hablemos de tu sitio» → `/contacto/` / microcopy «Si ya tienes uno, te lo revisamos gratis y en un día hábil te mandamos lo que encontramos. Si no, te contamos cómo lo haríamos y cuánto cuesta.» / secundario «Ver cómo hacemos un sitio y cuánto cuesta» → `/servicios/desarrollo-web/` / «Pausar el video» | 101 | El video del hilo de oro, como hoy (real). |
| 2 | **La línea** (la «We make ambitious ideas…» de Koto) | Blanco: «Todo lo que haces para vender termina en tu sitio.» / gris, seguido: «Si ahí no se entiende lo que haces, o el formulario no te avisa cuando alguien escribe, lo que pagaste para traer a esa persona se pierde.» | 37 | Ninguna: es la pausa entre el video y el trabajo, como en Koto. |
| 3a | **Trabajo** · rótulo fijo a la izquierda | Blanco «Trabajo» / gris, cambia con la pieza: «Bernardo Combeau», «Verifica y Cumple», «spindlelab.cl» | (en 3a a 3c) | — |
| 3a | Pieza · Bernardo Combeau | Ficha mono «Cliente · Sitio web · 2026» / «Bernardo es fotógrafo de retrato y modelo. Tiene dos sitios en el mismo dominio y un panel donde él mismo sube sus series.» / «Ver el caso» → `/trabajo/combeau/` | 35 | Dos tarjetas reales que se apilan: el recorrido en video del sitio de fotografía (`combeau-fotografia-recorrido-1440`) y el book (`combeau-modelo-169`). |
| 3b | Pieza · Verifica y Cumple | Ficha «Propio · Herramienta · 2026» / «Revisa un sitio contra la Ley 21.719 de datos personales. Lo probamos primero en el nuestro y salió mal. Al arreglarlo apareció un formulario que perdía mensajes sin avisar.» / aviso «No es asesoría legal ni certifica que cumples.» / pie «La persona a caballo de esta portada está generada con IA.» (solo si va `verifica-y-cumple-45`) / «Abrir Verifica y Cumple ↗» → `https://verifica.spindlelab.cl/` | 60 | Real: `verifica-y-cumple-45` (lleva el pie obligatorio) o `-53`; con la `-53` el pie se borra. |
| 3c | Pieza · spindlelab.cl (**opcional**, ver §4) | Ficha «Propio · Sitio web · 2026» / «Lo diseñamos y programamos a medida, como los que hacemos para clientes.» | 19 | Real: captura de una página interna de este sitio, **no** de la portada (el hilo de oro no va en un marco de trabajo, `spec-home.md` §5). |
| 3d | Cierre del trabajo | «[ Todo el trabajo ] (2)» → `/trabajo/` | 6 | — |
| 4 | **Sitio web a medida** | Blanco «Sitio web a medida» / gris «con un panel para que edites tú.» / «Diseñado y programado para tu negocio, desde una página de campaña hasta un sitio de doce páginas. Va en tu dominio, a tu nombre, y te entregamos el código completo.» / «Desde $390.000 + IVA» / «Ver Desarrollo web» → `/servicios/desarrollo-web/` | 48 | Real, **pendiente**: captura del panel de Combeau (Ramón lo autorizó; las capturas no han llegado). Espacio marcado en el prototipo. |
| 5 | **Búsqueda y visibilidad en IA** | Blanco «Búsqueda y visibilidad en IA» / gris «que Google y ChatGPT entiendan a qué te dedicas.» / «Revisamos si pueden visitar tu sitio y te dejamos un plan ordenado por impacto. Que puedan visitarlo es el requisito para que te nombren, no una garantía.» / «Desde $400.000 + IVA · una vez» / «Ver Visibilidad en IA» → `/servicios/visibilidad-en-ia/` / «Ver Auditoría SEO técnica» → `/servicios/auditoria-seo-tecnica/` / pie de la imagen «Chequeo abierto, gratis y sin registro» + «Hacer el chequeo» → `/diagnostico/` | 65 | Real: captura del chequeo (`/diagnostico/`) con un resultado de spindlelab.cl, nunca de un prospecto. |
| 6 | **Anuncios en Google y redes** | Blanco «Anuncios en Google y redes» / gris «que llevan a tu sitio.» / «Google Ads para quien ya está buscando lo que vendes, y gestión de redes con calendario, pauta y reporte.» / «Desde $350.000/mes + IVA. La inversión en pauta va aparte.» / «Ver Paid Media (Google)» → `/servicios/paid-media/` / «Ver Gestión de redes sociales» → `/servicios/redes-sociales/` | 48 | Generada con IA (Higgsfield), cuando se apruebe: un celular con un resultado de búsqueda que abre un sitio. Sin marcas reales, sin personas, sin cifras. |
| 7 | **Acompañamiento mensual** | Blanco «Acompañamiento mensual» / gris «para sostener lo que ya hiciste.» / «Implementamos y medimos cada mes con el mismo criterio, con informe y reunión, y decidimos juntos qué toca después.» / «Desde $590.000/mes + IVA» / «Ver Acompañamiento mensual» → `/servicios/acompanamiento-mensual/` | 34 | Generada con IA, cuando se apruebe: una mesa de trabajo con un informe impreso **sin gráficos ni números legibles** (un gráfico inventado es un resultado inventado). |
| 8 | **Cómo partimos** | Blanco «Cómo partimos» / gris «antes de cobrarte nada.» / «Nos pasas la dirección de tu sitio y te devolvemos lo que encontramos. Después hablamos 20 minutos y, si hay trabajo, recibes por escrito qué hacemos, en qué fases y cuánto cuesta cada una.» / «Leer el método» → `/metodo/` | 43 | Generada con IA, cuando se apruebe: una hoja con fases sobre una mesa, texto no legible. Sin personas. |
| 9 | **Contacto** (la «Contact / Press and careers» de Koto, en filas) | Blanco «Contacto» / gris «Partamos por tu sitio, lo tengas o no.» / fila «Proyectos»: «Te respondemos dentro de un día hábil.» + botón amarillo «Hablemos de tu sitio» → `/contacto/` / fila «Correo»: «hola@spindlelab.cl» → `mailto:` / fila «Quién responde»: «Ramón Vallejos · Fundador» / «Viene de años en agencias de medios y de marketing. Ahí vio dónde se pierde lo que una marca invierte para atraer clientes: muchas veces no en el anuncio, sino en el lugar al que el anuncio lleva.» / «Escribe el código con agentes de IA, y lo revisa y aprueba él antes de que llegue a tu sitio.» / «Conocer a Ramón» → `/nosotros/` | 90 | Real: la foto de Ramón (`ramon-vallejos-34`), donde Koto pone la foto del estudio. Alt: «Ramón Vallejos, de camisa celeste, sobre fondo oscuro.» |
| | **Total** | | **586** (567 sin 3c) | 9 bloques: 5 con imagen real (una pendiente), 3 generadas, la línea sin imagen. |

**Por qué «Quién está detrás» se funde con el contacto.** Koto no tiene sección «nosotros» en su home: el
estudio aparece en el contacto, con su foto. Acá el estudio es Ramón, así que su foto y su frase van donde se
pide la acción. La sección deja de existir como bloque, pero conserva lo que importa: quién responde, de dónde
viene la idea (con la frase decidida, tal cual) y cómo se usa la IA, dicho en tercera persona como decidió Ramón
el 30-oct.

**Por qué no hay preguntas frecuentes.** Seis preguntas eran 265 palabras, la sección más larga de la home. Todas
tienen una página donde se responden mejor (§2). Koto no tiene preguntas en la home.

---

## 2 · Qué se va de la home y a qué página se mueve

«Ya está» = la página interna ya lo dice en `e13/texto/`, comprobado con búsqueda en los JSON. «Mover» = hay que
agregarlo allá cuando se apruebe esta propuesta (no lo hice: el encargo dice no editar los JSON todavía).

| Texto de hoy (id en `home.json`) | Qué pasa | Dónde queda |
|---|---|---|
| `problema.h2` y `problema.p` | Se condensan en la línea (bloque 2) | Home |
| `problema.redes.*` y `problema.sitio.*` (las dos columnas «En redes» / «En tu sitio») | Mover. Dominio y código completo siguen en la home (bloque 4) | `/servicios/desarrollo-web/`, cabecera o «incluye» |
| `problema.cierre` («No te decimos que dejes las redes: también las gestionamos») | Mover | `/servicios/redes-sociales/`, cabecera |
| `paraquien.p1` y `p2` (consultora, clínica, restaurante; «si estás partiendo») | Mover; se juntan con «¿Atienden solo ciertos rubros?» | `/servicios/`, preguntas |
| `como.1` a `como.4` | Se condensan en el bloque 8 | `/metodo/` ya está (pasos) |
| `soluciones.intro` | Se borra: cada banda trae su precio | — |
| Precio de la auditoría ($490.000) y de redes ($390.000/mes) | Salen de la home; la banda muestra el piso del bloque | Ya está en `/servicios/auditoria-seo-tecnica/` y `/servicios/redes-sociales/` |
| `soluciones.busqueda.texto` (la parte de «Visibilidad en IA busca que…») | Se condensa en el bloque 5 | `/servicios/visibilidad-en-ia/` ya está |
| `pruebas.precios.*` | Se borra: el precio está en cada banda | `/servicios/` ya está |
| `pruebas.metodo.*` | Pasa al bloque 8 | `/metodo/` |
| `pruebas.chequeo.texto` (21 chequeos en tres grupos; «no mide si hoy te citan») | Queda solo el pie y el enlace del bloque 5 | `/diagnostico/` ya está |
| `pruebas.propio.*` | Pasa a la pieza Verifica y Cumple (3b), con su aviso | Home |
| `pruebas.caso.*` («Es un caso de sitio web, no de crecimiento de ventas») | Pasa a la pieza Combeau (3a). La aclaración sale de la home porque la home ya no afirma nada sobre ventas | `/trabajo/combeau/` ya está («Sin métrica») |
| `quien.p1` (agencias de redes globales, varios países) | Mover el detalle; la home dice «agencias de medios y de marketing» | `/nosotros/` ya está |
| `quien.p2` | Queda en el contacto, con la frase decidida tal cual | Home |
| `quien.p3` (herramientas abiertas) | Se condensa a una frase en el contacto | `/nosotros/` ya está (oficio 2) |
| `quien.p4` (Universidad Andrés Bello, máster de la Universidad de Barcelona) | Mover | `/nosotros/` ya está |
| `quien.regla.1` a `3` | Se condensa en «antes de cobrarte nada» (bloque 8) | `/metodo/`, reglas; `/nosotros/` ya tiene la 1 |
| `faq.sitio` («¿Por qué un sitio, si ya tengo Instagram?») | Mover, como primera pregunta | `/servicios/desarrollo-web/`, preguntas |
| `faq.1` (cuánto cuesta) | Se borra de la home | Ya está en `/servicios/desarrollo-web/` y `/servicios/` |
| `faq.2` (qué necesitan de mí) | Se borra de la home | `/servicios/desarrollo-web/` ya está; la versión con analítica y Search Console ya está en `/metodo/` |
| `faq.3` (si el problema no es mi sitio) | Mover | `/metodo/`, preguntas o reglas |
| `faq.4` (prometen resultados) | Mover | `/servicios/`, preguntas |
| `faq.5` (permanencia) | Se borra de la home | `/servicios/acompanamiento-mensual/` ya tiene el mínimo de 3 meses |
| `contacto.h2` | Pasa a las filas del bloque 9 | Home |

**Aviso para Simón (señales):** la home deja de tener preguntas visibles, así que el `FAQPage` del JSON-LD de la
home **se saca** (un FAQPage sin preguntas visibles es marcado engañoso). Las preguntas que se mueven entran al
FAQPage de la página que las recibe. Title y description de la home no cambian.

---

## 3 · Lo que no cambia (comprobado contra `home.json` del 30-oct)

- Rótulo «Sitios web a medida y marketing con IA», h1 «En redes arriendas. Tu sitio es lo único que es tuyo.»,
  botón amarillo «Hablemos de tu sitio» (portada y contacto: son los dos únicos botones llenos).
- «muchas veces no en el anuncio, sino en el lugar al que el anuncio lleva», palabra por palabra.
- Cargo «Fundador», sin «director».
- Dominio a nombre del cliente y código completo (bloque 4).
- Precios: los mismos números de hoy, con «+ IVA» en todos.
- Cero prueba social: ningún cliente fuera de Combeau (autorizado), ninguna cifra de resultado, ningún logo.
- Tuteo en todo; plural para lo que entrega SpindleLab, tercera persona para Ramón; sin rayas, sin Title Case,
  sin preguntas en la página.

---

## 4 · Por verificar antes de publicar, y decisiones para Ramón

1. **Año de las fichas.** «2026» en Combeau, Verifica y Cumple y spindlelab.cl lo deduje del historial del
   repositorio (los medios de Combeau entran el 19-oct-2026; el post de la Ley 21.719 es de sep-2026). Ramón
   confirma el año de entrega de cada uno, o la ficha va sin año.
2. **spindlelab.cl como pieza (3c), sí o no.** Es material real, pero hoy no está en `/trabajo/`, cuyo conteo
   dice (2). Si entra a la home, entra también al índice y el conteo pasa a (3) en todos lados. Si no, se borra
   la fila y la home queda en 567 palabras. Recomiendo que no entre todavía: un sitio propio al lado del único
   cliente se lee como relleno del muro.
3. **Panel de Combeau (bloque 4).** Va con espacio marcado hasta que lleguen las capturas. Si no llegan antes de
   publicar, la alternativa real es `combeau-fotografia-169`, pero repite la pieza 3a.
4. **Imágenes generadas (bloques 6, 7 y 8).** Nada se genera hasta que Ramón apruebe el prototipo y la
   cotización. Ninguna muestra personas ni marcas, así que no llevan aviso de imagen generada; si alguna termina
   mostrando una persona, lleva el aviso como la de Verifica.
5. **Bloque 6, «Desde $350.000/mes».** Es el piso del bloque (Paid Media). Redes parte en $390.000/mes y eso se
   ve al entrar a su página. Si Ramón prefiere los dos precios en la home, son 6 palabras más.
6. **«Te respondemos dentro de un día hábil»** es la promesa que ya está publicada; no es nueva.
