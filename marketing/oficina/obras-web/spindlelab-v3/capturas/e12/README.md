# Capturas de cierre · obra E12 · SpindleLab v3 sobre A · Archivo

**23-oct-2026, 11:15 a 11:25 (Chile; reloj del contenedor en UTC, 14:15 a 14:25) · Mauro, cierre (fase 5).**
Las 27 rutas de `/v3/` a 390, 768 y 1440, desde el build de la rama `claude/magical-franklin-ckfki2` en `f3044fc`
(`spindlelab-astro/` sin cambios desde `f2fe7b4`, la obra que Javiera auditó en la vuelta 2 de la QA de obra). Antes de
capturar: `npm run build` (33 páginas, exit 0), `npm run verificar -- --prefijo /v3/` a 390, 768 y 1440 (27 páginas, sin
hallazgos en los tres) y `construccion/comparar-produccion.mjs` («Iguales byte a byte»). Los registros están en
`e12/cierre/crudos/`.

## Qué hay

| Carpeta o archivo | Qué es | Tamaño |
|---|---|---|
| `primera/<ruta>-<ancho>.jpg` | La primera pantalla: 390 × 844, 768 × 1024 y 1440 × 900 (spec §4.4), a su tamaño | 81 archivos, 6,0 MB |
| `completa/<ruta>-<ancho>.jpg` | La página entera, a 390 px de ancho la del teléfono y a la mitad (384 y 720 px) las de 768 y 1440 | 81 archivos, 11,8 MB |
| `hoja-primera-390.jpg`, `-768`, `-1440` | Las 27 primeras pantallas de cada ancho en una hoja, en el orden del mapa (brief §3) | 3 hojas, 1,2 MB |

`<ruta>` es el camino sin `/v3/` y con `_` en vez de `/` (`home`, `trabajo_praxi`, `servicios_desarrollo-web`,
`blog_que-es-aeo-geo`…), como en las capturas de Javiera.

## Cómo se tomaron

`e12/cierre/herramientas/capturas.mjs` (con el servidor, el Chromium 1194 y la lista de rutas de Javiera,
`qa-obra/vuelta-2/herramientas/comun.mjs`, sin cambios) y `reducir.py`, que las comprime y arma las hojas.

- **Con el aviso de cookies ya contestado** (rechazado), para que se vea la página. El aviso abierto lo midió Javiera en
  los ocho tamaños de la obra (`qa-obra/vuelta-2/crudos/aviso.log`) y no tapa nada de lo que §4.3 de la spec pide.
- **Bajo 834, en un contexto táctil:** sin el círculo del cursor, como en un teléfono o una tableta.
- **La primera pantalla, a los 1,2 s de cargada**, con los videos corriendo (la portada muestra un cuadro del hilo de
  oro, no el póster). **La página entera, después de recorrerla** de arriba abajo, para que cada bloque llegue a su
  estado final.
- 81 de 81 sin errores de consola, sin pedidos fallidos y sin 404.

**Un efecto de la captura, no de la página:** en la página entera de los casos y los artículos bajo 1194, la barra
flotante (con «NOMBRE · CONCEPTO» en los conceptos) aparece una sola vez, al pie de la primera pantalla, donde estaba
fija al tomar la captura. En el navegador va pegada al pie de la ventana todo el tiempo.

## Lo que miré

Las tres hojas de primera pantalla enteras, la primera pantalla de la home a 1440 a tamaño real y la página entera de
la home (390, 768 y 1440), `/trabajo/` a 768, Praxi, Combeau, Tonela y Desarrollo web a 1440 y Tonela a 390. Nada
roto: la portada con la frase abajo a la izquierda y el chequeo a la derecha a 1440, y el chequeo antes de la entradilla
a 390; la cinta como primera sección; el muro de dos columnas con «CONCEPTO» en los cuatro conceptos; Auditoría SEO
técnica sin franja; el hueco nombrado de las pantallas internas de Praxi, punteado; Combeau sin su ficha de medidas; la
foto de Ramón en Nosotros y en la home; el pie con «Cookies: rechazadas». Lo que no se ve en una captura (foco, áreas
de toque, contraste, movimiento) está medido en el acta (`e12/acta-obra.md`).
