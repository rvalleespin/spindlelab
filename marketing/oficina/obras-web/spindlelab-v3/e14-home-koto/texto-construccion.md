# Home E14 · qué id va en qué componente (para Diego)

**2-nov-2026 · Clara (copy de interfaz).** El texto aprobado por Ramón (`texto-home-propuesta.md`, «me gusta este
acercamiento a la referencia… listo») ya está en `e13/texto/home.json` y copiado con `extraer-texto.mjs`
(`--comprobar` en verde). Componente por componente, como el prototipo `prototipo/index.html`. Nada de texto a
mano en el `.astro`: todo sale de `t('<id>')`.

**El build de hoy sigue pasando.** Las secciones de E13 que salen (problema, para quién, cómo, soluciones, pruebas,
quién, preguntas y el cierre viejo) están en `home.json → retiradas_e14`, intactas, solo porque `index.astro` de
E13 todavía las lee. **Cuando rehagas `index.astro`, borra `retiradas_e14` en el mismo commit** (es borrar, no
escribir texto) y vuelve a correr `extraer-texto.mjs home`. Lo mismo con `desarrollo-web.json → retirados_e14`.
Los ids nuevos no chocan con ninguno viejo.

## 1 · Portada (igual que hoy)

Mismos ids, sin cambios: `home.portada.video`, `.pausa`, `.rotulo`, `.h1` (tinta/gris), `.entradilla`, `.boton`
(amarillo, `#portada-cta`), `.microcopy`, `.secundario`, `.og-alt`.

## 2 · La línea (sube renglón a renglón)

| Componente | Id |
|---|---|
| Frase grande, dos tintas | `home.linea` → `.tinta` en blanco, `.gris` en gris, seguido en el mismo párrafo |

Va como `h2` (el gris pasa de 13 palabras a propósito: es la frase de Koto, no un h2 de sección). Si la dejas como
`<p>`, avisa y cambio el rol.

## 3 · Trabajo (panel fijo + tarjetas)

| Componente | Id |
|---|---|
| Rótulo fijo, tinta | `home.trabajo.rotulo` («Trabajo») |
| Rótulo fijo, parte gris que cambia por máscara | `home.trabajo.combeau.nombre` / `home.trabajo.verifica.nombre` |
| Ficha mono de cada pieza | `home.trabajo.combeau.ficha` / `home.trabajo.verifica.ficha` |
| Bajada de cada pieza | `home.trabajo.combeau.texto` / `home.trabajo.verifica.texto` |
| Aviso de Verifica (siempre con la pieza) | `home.trabajo.verifica.aviso` |
| **Pie bajo la imagen de Verifica** | `home.trabajo.verifica.pie` («La persona a caballo de esta portada está generada con IA.») |
| Enlace de Combeau (y `data-cursor`) | `home.trabajo.combeau.boton` → `/trabajo/combeau/` |
| Enlace de Verifica | `home.trabajo.verifica.boton` → externo, flecha ↗ + `comun.externo` oculto |
| Corchete final | `home.trabajo.todo` (compara el `(2)` con `trabajo.texto.entradas.length`, como hoy) |

Medios de la sección (en `home.json → secciones[trabajo].medios`, con su alt o descripción): el recorrido de
Combeau (video, `aria-hidden`, descripción de `combeau.medio.descripcion`), `combeau-modelo-169` (alt de
`caso-combeau.json`, no el del prototipo) y `verifica-y-cumple-53`. **El pie de Verifica es obligatorio con la -53
y con la -45**: en las dos se ve la persona a caballo entera (Javiera, `comparacion-koto.md` §5.1). En el prototipo
falta; vuelve aquí.

## 4 · Banda grande · Sitio web a medida

| Componente | Id |
|---|---|
| Título dos tintas | `home.sitio.h2` |
| Párrafo | `home.sitio.texto` (lleva «Va en tu dominio, a tu nombre. Y te entregamos el código completo.» con punto, como lo decidió Ramón; el prototipo tiene coma) |
| Precio | `home.sitio.precio` → `igualQue(oferta.momentos[0].planes[0].p, …)` |
| Enlace | `home.sitio.boton` → `enlaceDe('desarrollo-web', 'home.sitio.boton')` |
| Imagen | `combeau-panel-colecciones-169` con su alt **y su pie** (ver `medios` de la sección) hasta que Ramón decida si pide capturas nuevas del panel |

## 5 · Banda grande · Búsqueda y visibilidad en IA

| Componente | Id |
|---|---|
| Título dos tintas | `home.busqueda.h2` |
| Párrafo | `home.busqueda.texto` |
| Precio (uno para el bloque) | `home.busqueda.precio` → `igualQue(precioDe('visibilidad-en-ia', 0), …)` |
| Enlaces | `home.busqueda.via.boton`, `home.busqueda.aud.boton` (los dos por `enlaceDe`) |
| Pie de la imagen + enlace | `home.busqueda.pie` + `home.busqueda.chequeo` → `/diagnostico/` |
| Imagen | `prototipo/chequeo-spindlelab-169.webp`, cópiala a `public/v3/`; alt en `medios` |

## 6 · Fila de tres (quieta)

| Columna | Título (h3, dos tintas) | Párrafo | Precio | Enlaces |
|---|---|---|---|---|
| Anuncios | `home.anuncios.h2` | `home.anuncios.texto` | `home.anuncios.precio` | `home.anuncios.paid.boton`, `home.anuncios.redes.boton` |
| Acompañamiento | `home.acompanamiento.h2` | `home.acompanamiento.texto` | `home.acompanamiento.precio` | `home.acompanamiento.boton` |
| Cómo partimos | `home.partimos.h2` | `home.partimos.texto` | — | `home.partimos.boton` → `/metodo/` |

Comprobaciones que hay que trasladar: `home.anuncios.precio` ahora trae solo Paid Media; compara su primera frase
con `precioDe('paid-media', 0)` (ya no contiene el de redes). `igualQue(aco.nombre, t('home.acompanamiento.h2').tinta)`.
Las tres imágenes van con su alt **provisorio** de `medios` (escrito sobre el concepto de Bruno): cuando Bruno las
genere, me pasas los archivos y reescribo los alt mirándolas.

## 7 · Contacto en filas (absorbe «Quién está detrás»)

| Fila | Rótulo | Contenido |
|---|---|---|
| Título | — | `home.contacto.titulo` (tinta «Contacto», gris «Partamos por tu sitio, lo tengas o no.») |
| Proyectos | `home.contacto.proyectos.rotulo` | `home.contacto.proyectos.texto` + botón `home.contacto.boton` → `/contacto/` (claro, no amarillo, como la spec) |
| Correo | `home.contacto.correo.rotulo` | `home.contacto.correo.direccion` → su `destino` (mailto con asunto) |
| Quién responde | `home.contacto.quien.rotulo` | `home.contacto.quien.nombre` («Ramón Vallejos · Fundador»), `home.contacto.quien.p1`, `home.contacto.quien.p2`, enlace `home.contacto.quien.boton` → `/nosotros/` |
| Foto | — | `ramon-vallejos-34`, alt en `medios` |

## 8 · Señales y páginas internas (lo que cambia fuera de la home)

- **Home: se saca el `FAQPage` del JSON-LD.** Ya no hay preguntas visibles. Title y description no cambian.
- **`/servicios/desarrollo-web/`**: preguntas `['sitio', 1, 2, 5]` (entra `dw.faq.sitio`, que sale de la home;
  salen `dw.faq.3` y `dw.faq.4`); «En todos los planes» `['1', '2', '3', '4', '7']` (sale `dw.incluye.6`). El
  FAQPage, en el mismo orden. Borra `retirados_e14` cuando la página deje de leerlos.
- **`/servicios/`**: preguntas `[1, 2, 3, 4, 5]` (entran `servicios.faq.4` y `5`, que salen de la home;
  `servicios.faq.3.r` suma lo de «Para quién»). El FAQPage, en el mismo orden.
- Lo demás que sale de la home ya estaba en su página interna (tabla §2 de la propuesta): permanencia en
  Acompañamiento mensual, pasos en `/metodo/`, trayectoria y estudios en `/nosotros/`, «Sin métrica» en el caso.

## 9 · Desarrollo web, el recorte

Contado sobre el texto de Clara que se ve (sin planes ni glosario de `oferta-v3.json`, que no se tocan; con el
glosario de Clara): **874 → 707 palabras**. Sin la pregunta del sitio que llega de la home (55), el recorte es de
**222 palabras, 25 %**; contándola, la página baja 19 %. Precios, planes y `dw.incluye.7` (dominio y código) quedan
tal cual. Cada texto cambiado trae su `antes` y su `por_que` en el JSON.

## 10 · Lo que sigue abierto (no lo cierra este texto)

1. El año «2026» de las fichas lo confirma Ramón; si no, las fichas van sin año (`condicion` en cada una).
2. La imagen de la banda del sitio: el panel de Combeau de septiembre, con su pie, hasta que Ramón decida.
3. Un solo precio para los dos enlaces de Búsqueda: si la lectura en frío vuelve a leer dos precios para lo mismo,
   se suma el de la Auditoría junto a su enlace (`nota` en `home.busqueda.precio`).
4. Los tres ejemplos de rubro de `servicios.faq.3.r` los confirma Ramón (venían de la home con esa condición).
