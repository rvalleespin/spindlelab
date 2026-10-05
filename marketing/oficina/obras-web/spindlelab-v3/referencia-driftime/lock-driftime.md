# Lock de referencia — driftime.com, medido

**5-oct-2026.** Ramón fijó driftime como la vara del sitio entero, no solo del hero:
`driftime.com` · `2025.driftime.com` · `/work/global-center-for-health-diplomacy-and-inclusion`
· `/work/the-finnish-institute-of-uk-and-ireland` · `/work/secure-energy-project`.

Todo lo de abajo está **medido en el navegador**, no recordado. Evidencia en esta carpeta:
`medicion-driftime.json` (estilos computados por elemento), capturas completas, y las
pantallas recorridas con la rueda en el scratchpad de la sesión.

> **Por qué este documento existe.** driftime ya era la dominante de la v3, pero el equipo
> anterior dejó escrito que no la pudo renderizar: Chromium rechazaba el certificado del
> proxy. La v3 se construyó contra una referencia que nadie miró. Resuelto el 5-oct
> agregando la CA del proxy al almacén NSS del navegador (sin desactivar la verificación).

---

## 1 · Lo que driftime ES (la tesis, en una línea)

**Un sistema de imágenes con una tipografía display escasa.** No un sistema de color.
Los cuatro campos de color existen, pero lo que carga cada pantalla es la fotografía: el
hero tiene 4 imágenes, cada servicio tiene su fila de 4, los casos son galerías. El color
es el fondo; la imagen es el contenido; la letra gritona aparece cinco veces.

## 2 · Tipografía (medida)

| Rol | Familia | Escritorio | Celular | Peso | Interlínea | Tracking | Caja |
|---|---|---|---|---|---|---|---|
| Display (h1 home, títulos de servicio) | **landour** | 120 px | 60 px | 800 | 0,90 | normal | MAYÚSCULAS |
| Título de caso (h1 interno) | **Geist** | 60 px | — | 500 | 1,10 | −1,2 px | normal |
| Título de sección / artículo (h2·h3) | Geist | 30 px | 24 px | 500 | 1,40 | −0,6 px | normal |
| Subtítulo en caso (h3) | Geist | 24 px | — | 500 | 1,40 | normal | normal |
| Párrafo guía | Geist | 24 px | 20 px | **400** | 1,50 | normal | normal |
| Texto secundario | Geist | 18 px | — | 400 | 1,50 | normal | normal, en gris medio |
| Enlace / navegación | Geist | 16 px | 16 px | 400 | 1,50 | normal | normal |
| Botón | Geist | 14 px | — | 500 | 1,50 | normal | normal |

**La regla que importa: escasez.** En toda la home, `landour` aparece en **5 elementos**
contra **517** en Geist. El display es solo: el titular del hero, los cuatro nombres de
servicio y el wordmark del pie. Los casos internos **ni siquiera lo usan** en su h1: el
título del caso va en Geist 60 px peso 500. Todo lo demás es una sans tranquila, grande y
de peso normal. Lo que se lee como "fuerte" en driftime es el contraste entre esos cinco
gritos y el silencio del resto.

## 3 · Color (medido)

| Rol | Valor | Nota |
|---|---|---|
| Lienzo | negro puro / `lab(6.8 …)` ≈ #111 | casi todo el sitio |
| Superficie de módulo | gris oscuro al 80 % | 35 usos: menú, píldoras, celdas |
| Texto | `lab(95.9 …)` ≈ crema muy claro | nunca blanco puro |
| Texto secundario | gris medio `lab(51 …)` | |
| Campo 1 · Strategy | `oklch(0.321 0.011 122)` oliva oscuro | texto en crema amarilla `oklch(0.92 0.068 76)` |
| Campo 2 · Brand | `oklch(0.290 0.085 262)` navy | |
| Campo 3 · Digital | `oklch(0.582 0.208 34)` brasa saturada | el único campo claro |
| Campo 4 · Reporting | `oklch(0.275 0.048 327)` ciruela | |

Cada campo tiene su propio color de texto, un tinte claro de su mismo tono.

## 4 · Forma

- **Un radio: 6 px.** 152 elementos en la home. Cero píldoras redondas salvo las etiquetas.
- **Gutter ~16 px** entre imágenes. Márgenes laterales ~40 px en escritorio, ~20 en celular.
- **Botones chicos**: 14 px, fondo crema, texto oscuro, radio 6. Nunca un botón grande.
- **Etiquetas**: píldoras en módulo gris oscuro, 12–13 px, una activa en crema.

## 5 · Estructura de la home (de arriba a abajo)

1. **Hero** — titular display apoyado en la parte baja del viewport + **fila de 4 obras** en
   el mismo primer pantallazo. La obra está arriba del pliegue.
2. **Presentación** — un solo párrafo guía en Geist 24 px + un botón chico. Mucho negro.
3. **Cuatro servicios, campos pegajosos apilados** (`position: sticky`, cada uno tapa al
   anterior). Cada campo: título display · dos píldoras · descripción de 2-3 líneas · línea
   de precio (`Fixed Fee | £15K + VAT`, **el precio a la vista**) · uno o dos botones chicos
   · **fila de 4 imágenes**.
4. **Quiénes somos** — un párrafo + botón + **muro de 12 logos de clientes** en celdas.
5. **Novedades** — lista editorial: imagen grande a la izquierda, título 30 px a la derecha,
   bajada y fecha. No son tarjetas: son filas.
6. **Pie pegajoso que se revela** — llamado a conversar + botón, enlaces en dos columnas, y
   el **wordmark a todo el ancho**.

## 6 · Estructura de un caso (la plantilla interna)

1. Título del caso en **Geist 60 px** (no display) + una línea + dos botones chicos (uno es
   *escuchar el caso*, 12 min de audio).
2. **Imagen a sangre**: la obra en un dispositivo fotografiado en un ambiente real.
3. Nota de impacto chica a la izquierda + párrafo de entrada a la derecha.
4. Alternancia, por todo el largo:
   - **Etiqueta pegajosa a la izquierda** (el título de la sección queda fijo mientras el
     texto corre) **+ texto largo a la derecha** con subtítulos h3.
   - **Galerías en grillas asimétricas**: a sangre, 2 columnas, 1 + 2, mezclando la obra en
     contexto, piezas de marca, especímenes tipográficos, paletas.
5. Detalles del proyecto + siguiente caso + pie.

Largo: **18.000 a 23.500 px**. Es una revista, no una ficha.

## 7 · Movimiento

- Next.js + **Lenis** (scroll suave).
- Campos de servicio pegajosos que se apilan.
- Etiquetas de sección pegajosas en los casos.
- Contenido que aparece al entrar en pantalla.
- Pie pegajoso que se revela al final.
- **Celular: las filas de imágenes son carruseles horizontales**, con la siguiente imagen
  asomándose por el borde.

## 8 · Qué se transfiere a SpindleLab y qué no

| De driftime | ¿Se transfiere? | Cómo |
|---|---|---|
| Display escaso + sans tranquila grande | **Sí, es la clave** | **Dentro de Manrope**, que es la decisión aprobada por Ramón el 29-sep (manual v2.0: Manrope para titulares y cuerpo; Gabarito solo wordmark y monograma). Manrope 800 en mayúsculas hace el papel de landour **en cinco lugares**; Manrope 400 a 24 px hace el de Geist en todo lo demás. El problema de la v3 nunca fue la familia: fue usar el 800 en todas partes. *(Corregido el 5-oct: la primera versión de este lock recomendaba Gabarito + Inter, lo que revertía una decisión aprobada. Si se quiere una segunda familia para el display, como hace driftime, es decisión de Ramón y reabre el manual.)* |
| Cuatro campos pegajosos | **Sí** — la v3 ya los tiene | Desarrollo · Visibilidad · Continuidad · Alcance |
| Radio 6 px, botones chicos, píldoras | **Sí** — la v3 ya los tiene | |
| Precio a la vista en cada servicio | **Sí** | Los precios ya son públicos en el sitio. Se muestran igual, sin tocarlos. |
| Obra arriba del pliegue | **Sí** | Combeau (×2, con permiso), Verifica y Cumple (propio), Raigal (concepto, rotulado) |
| Fila de 4 imágenes por servicio | **Sí, con lo que hay** | Fotografía de campaña (hilo de oro, dominó, escritorio, ventana), tu retrato, la obra |
| Obra en dispositivos fotografiados | **Parcial** | Hoy hay capturas planas. Se puede componer localmente sobre fotografía propia, o generar ambientes (pagado). Ver decisión abierta. |
| **Muro de 12 logos de clientes** | **No** | Regla innegociable: cero prueba social inventada. Hay un cliente con permiso. Se sustituye por la obra misma. |
| Casos de 20.000 px | **No por ahora** | No hay material para eso en cada servicio. Las internas toman la plantilla (etiqueta pegajosa + texto + galería) a la escala del contenido real. |
| Audio del caso | **No** | No existe. No se simula. |
| landour | **No** | Es letra licenciada de driftime. Su papel lo hace Manrope 800, con la escasez de driftime. |

## 9 · Lo que la v3 tenía bien y lo que tenía mal, contra esto

**Bien:** los cuatro campos y sus colores (casi idénticos), el radio de 6 px, el módulo del
menú, los titulares pegajosos, las píldoras.

**Mal, y es lo que más se nota:**
1. **El display en todas partes.** Manrope 800 en mayúsculas en titulares chicos, etiquetas
   y botones. driftime lo usa cinco veces.
2. **Sin imágenes.** Los campos de la v3 son color y texto. Los de driftime son color e
   imagen. Es el tell #9 del detector de refero: *una referencia guiada por imagen colapsada
   en texto*.
3. **La obra bajo el pliegue.** driftime la pone en el primer pantallazo.
4. ~~Manrope en vez de la letra de la marca~~ — **corregido**: Manrope ES la letra de la
   marca desde el 29-sep, aprobada por Ramón. Lo que no es cierto es que driftime la use
   (usa Geist + landour), pero eso no importa: lo que se transfiere es la escasez, no la
   familia.
