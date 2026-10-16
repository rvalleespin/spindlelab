# Portafolio E12 · Plan de las cuatro piezas de concepto

**16-oct-2026 · Bruno (dirección creativa) · obra E12, paso 2** · rama `claude/magical-franklin-ckfki2` · encargo
recibido a las 19:50 (Chile); nombres comprobados a las 20:36 y de nuevo a las 20:45 (hora que marca NIC Chile).
**Manda** la sección «Compuerta 1» de `marketing/oficina/obras-web/spindlelab-v3/e12/brief-de-obra.md` (puntos 4, 5 y
7), después `e12/encargo-paso-2.md` §3, las reglas de `README.md` (esta carpeta) y el lock de Lucía
(`e12/lock-koto.md` §20 y §21, commit `7755d24`). Aprueba **Ramón**, en la compuerta 2. La evidencia de nombres y
precios está en `plan-e12-evidencia.json`, al lado de este archivo.

**Lo que no se mueve:** nada se publica; `spindlelab-astro/` no se toca; cero cifras de resultado, cero testimonios,
ningún prospecto nombrado; ninguna generación pagada sin el OK de Ramón. En este plan: **0 llamadas a generar y 0
créditos gastados**; de Higgsfield solo se consultó saldo, modelos y precios (§11).

---

## 0 · En corto

| Carpeta | Marca | Rubro | Quién sería (ficticio) | Lienzo | Recurso propio |
|---|---|---|---|---|---|
| `04-tonela` | **Tonela** | Industrial B2B: izaje | Proveedor de eslingas, estrobos, cadenas y grilletes, con taller de inspección de esos elementos, para faenas mineras, puertos y constructoras del norte (Antofagasta) | Blanco frío, con los ocho colores de la norma | La tabla de carga por color |
| `05-ocelo` | **Ocelo** | Clínica: oftalmología | Centro de cirugía refractiva y de cataratas en Providencia, con dos oftalmólogos ficticios | La sala a oscuras, con la luz que se enciende | La carta de optotipos y la C de Landolt |
| `06-sesenta` | **Sesenta** | Estudio legal: laboral, del lado del trabajador | Estudio que representa a trabajadores despedidos (despido injustificado, autodespido, nulidad por cotizaciones impagas, tutela), en Santiago centro | Azul de ropa de trabajo | El plazo de 60 días hábiles y la suma del escrito |
| `07-doceavo` | **Doceavo** | Servicios profesionales: contable y tributario | Estudio contable para pymes e independientes (contabilidad mensual, F29, remuneraciones, Operación Renta), en Concepción | Verde pálido de libro contable | El año en doce |

1. **Se empieza de cero** (nombre, identidad y sitio). De las tres piezas que hay se toma el método, no la forma
   (§2). La razón que más pesa se encontró hoy: **los tres nombres existentes ya son de empresas reales** (§1).
2. **Las cuatro se construyen opuestas** en lienzo, letra, forma del logo, densidad y temperatura (§3): cuatro
   identidades, no una plantilla con cuatro colores.
3. **La pieza que va más lejos (vista 4 del tablero) es Sesenta**, porque es la del rubro donde más vendemos (§9).
4. **Las cuatro se terminan sin generar nada.** Donde una foto o un clip sumaría, está cotizado: unos 75 créditos
   para las cuatro. La cuenta tiene 0 créditos y no admite recargas sueltas, así que el costo real es un mes del plan
   PLUS, USD 49. Decide Ramón (§11).

---

## 1 · Hallazgo: los nombres de 01, 02 y 03 ya son de alguien

Regla 2 del `README.md`: «Si el nombre se pudiera confundir con alguien que existe, se cambia». Consultado hoy en
NIC Chile y abriendo lo que sirve cada dominio:

| Pieza | Dominio | Lo que hay |
|---|---|---|
| 01 Raigal | `raigal.cl`, registrado el 07-03-2025 | Sitio vivo de una empresa de **arquitectura y construcción** llamada Raigal (título servido, en la evidencia) |
| 03 Deslinde | `deslinde.cl`, registrado el 03-11-2018 por M&F Servicios Integrales | Sitio vivo: Deslinde, **gestión inmobiliaria y arquitectura urbana** |
| 02 Aplomo | `aplomo.cl`, registrado el 01-07-2008 | Redirige a `aplomochile.com` (404 hoy): la marca está tomada aunque el sitio no responda |

**Lo que implica:**

- **Raigal está hoy en el índice del v3 y en la tira de su home** (vista previa con noindex; `README.md`, fila 01).
  No puede salir a producción con ese nombre. Cuando Diego construya la vista 2 (`/trabajo/`), las cuatro piezas nuevas
  la reemplazan; hasta entonces, el aviso queda aquí.
- La comprobación de Deslinde del 29-sep buscó estudios de abogados con ese nombre y no encontró ninguno; no miró el
  dominio. **Desde hoy la comprobación tiene dos pasos**, como pide el encargo §3.1: el `.cl` en NIC Chile y una
  búsqueda web con fecha. Si el dominio está tomado, el nombre se descarta aunque el dueño sea de otro rubro.

---

## 2 · ¿Base o de cero? De cero, y por qué

1. **Los nombres** (§1). Cambiar el nombre y conservar todo lo demás sería conservar lo que Ramón ya juzgó.
2. **Ramón ya lo dijo el 29-sep:** «lo que me muestras es algo bastante genérico» (`03-deslinde/ficha.md`). El
   problema está en los huesos: cada pieza es una sola página larga, **sin identidad**. El «logo» es el nombre escrito
   en la letra del sitio, el color no tiene roles fuera de esa página y no hay ninguna aplicación fuera del sitio.
   La página de caso de Koto pide de 11 a 16 filas de medios (lock §21.2: mediana de 5 secciones con 2 filas cada
   una; §21.5: el caso más corto, WhatsApp, 11 filas y 16 medios), y el grueso va en Identidad y Aplicación (Lyft: 0 · 1 ·
   7 · 6 · 1 filas por sección). Elevarlas obliga a hacer la identidad, que es empezar de nuevo.
3. **Dos cargan señales del detector** (`refero-design/references/anti-ai-slop.md`, tell #4): Raigal se acerca al
   «editorial sereno en piloto automático» (lienzo hueso cálido, serif en el cuerpo, mucho aire; su titular es sans,
   eso lo salva a medias), y Deslinde mete una sola palabra en un bloque de realce, que es la huella que ese mismo tell
   nombra.
4. **Los oficios no son donde vendemos.** En `ventas/contactos-abogados-santiago.csv`, 156 de 157 contactos atienden
   personas y laboral es la materia que más aparece (15 filas; familia 7, penal 6, civil 6): Deslinde asesoraba al
   empleador. En salud, el outbound eligió oftalmología (`ventas/pipeline-prospeccion.md`, decisión del 9-jul):
   Raigal es implantología.
5. **Las tres cargan su letra desde Google Fonts.** Hoy, renderizadas con el Chrome de línea de comandos de este
   contenedor (que no pasa por el proxy), Aplomo y Deslinde salieron con la letra de reemplazo; con Playwright, que sí
   pasa, las tres cargan bien (`document.fonts`, 16-oct). Es un detalle técnico y no una razón de fondo, pero dice lo
   mismo: una pieza cuyo trabajo es verse terminada no puede depender de que un tercero responda.

**Lo que sí se toma de las tres** (es método, no forma):

- Las reglas de la serie (`README.md`, reglas 1 a 5).
- La lección de Raigal: si falta un activo, se dibuja el que el oficio produce. En las piezas nuevas ese activo deja
  de ser un relleno: **es el recurso de la identidad**.
- La ficción declarada dentro del JSON-LD (Deslinde: `disambiguatingDescription`), para que un motor que lee los
  datos y no el texto también sepa que la empresa no existe.
- La sección «lo que no se puede prometer» como argumento de venta (Raigal, Aplomo).
- Las razones de rubro: ticket, decisión lenta, preguntas largas.

**Qué pasa con 01 a 03:** quedan en sus carpetas como «primera serie (27 a 29-sep)», fuera del índice y sin mostrarse a
un prospecto. El `README.md` lo dice, con el hallazgo del §1, en el primer commit de producción de una pieza nueva
(este commit es solo el plan).

---

## 3 · Cuatro identidades, no una plantilla con cuatro colores

| | 04 · Tonela | 05 · Ocelo | 06 · Sesenta | 07 · Doceavo |
|---|---|---|---|---|
| **Lienzo** | Blanco frío `#F1F2EF` | Sala `#16181A`; con la luz encendida, `#F5F5F2` | Azul de trabajo `#22408A` | Verde de libro contable `#DCE6D3` |
| **El color y su único rol** | Los ocho colores de la EN 1492: cada uno es una capacidad y nada más. La marca no tiene color propio | Rojo y verde del test duocromo: solo para comparar dos opciones | El azul es el lienzo; el papel `#F3F1EA`, solo documento | Rojo `#B3261A`, solo lo que vence |
| **Letra** (todas OFL) | Big Shoulders (y su Stencil) + Barlow Semi Condensed | Logotipo dibujado en retícula 5 × 5 + Atkinson Hyperlegible Next y Mono | Schibsted Grotesk; Courier Prime solo dentro de documentos | Recursive: sans para leer, mono para cifras |
| **Forma del logo** | La palabra dentro de una etiqueta cosida | Letras de optotipo y la C de Landolt | La palabra y el 60 como sello | Retícula de 12 casillas con la del mes en curso llena |
| **Recurso propio** | Tabla de carga por color | Carta logMAR | El 60 que baja y la suma del escrito | El año en doce sobre papel columnar |
| **Densidad** | Densa, tabular | Rala, de escala extrema | Media, documental | Ordenada en columnas |
| **Temperatura** | Caliente, saturada | Neutra, a oscuras | Fría e intensa | Templada, pálida |
| **Movimiento** | Las bandas entran por capacidad; el ángulo baja la carga | La carta se achica fila a fila; se enciende la luz | El 60 baja hasta los días que te quedan | Se arranca la hoja del mes |
| **Portada en el índice** | Ocho bandas de color con su tonelaje | La C de Landolt sobre la carta encendida, franja roja y verde | Un 60 enorme cortado por el marco, con la suma en papel | El año en doce con sus puntos rojos y un 1/12 grande |
| **Lienzo contra el negro del sitio** (`#060606`) | 18,03:1 | 1,14:1 en la sala: **la portada va con la luz encendida** | 2,09:1 | 15,73:1 |

**La prueba, mirando:** se tapan los nombres y los textos de las cuatro portadas; si dos se pueden confundir por
lienzo, letra o forma, una de las dos se rehace. Por eso el contador de Sesenta es un número que baja y no una grilla
de días: una grilla lo dejaba demasiado cerca del año en doce de Doceavo.

**Ninguna usa lo que ya es de otro:** ni las letras de las direcciones A y B (Google Sans Flex, Mona Sans, DM Mono),
ni las de E10 (Instrument Sans, Plex), las del manual antiguo (Gabarito, Inter), la del v2 (Manrope) o las de 01 a 03
(Archivo, Newsreader, IBM Plex, Zilla Slab, Libre Franklin). Ninguna tiene índigo o violeta como color de marca (el
violeta de Tonela es el de 1 t en la norma y solo significa eso), ni el amarillo de Koto `#FFE800`.

---

## 4 · Reglas para las cuatro

1. **El rótulo «Concepto»** va en tres lugares:
   - **En el sitio:** dentro del primer viewport a 1440 × 900 y a 390 × 844, fijo, sin botón para cerrarlo, de 12 px
     o más y con 4,5:1 o más, con la frase entera («Concepto de SpindleLab: Tonela no existe y nada de esto ocurrió»,
     o lo que escriba Clara con ese sentido). Cada pieza lo dibuja en su idioma (Tonela, una etiqueta; Ocelo, una
     fila de la carta; Sesenta, un sello; Doceavo, una nota al margen del libro), pero primero se lee.
   - **En cada placa exportada:** un rótulo de esquina «CONCEPTO» en mono, como los rótulos de esquina de las placas
     de Koto («DISPLAY» en `e12/medicion/koto/paso2/capturas/color-lyft-1440.jpg`). Una placa suelta en una captura
     sigue diciendo lo que es.
   - **En la página de caso:** «CONCEPTO · 2026» en la ficha lateral (lock §21.5) y en la entrada del índice.
2. **Los únicos números son los de la norma, con fuente.** Tonela: EN 1492 (colores y factores de modo). Ocelo: la
   escala logMAR y la retícula de los optotipos. Sesenta: el Código del Trabajo (plazos y artículos). Doceavo: el
   calendario del SII. Nada más: ni precios, ni honorarios, ni años de trayectoria, ni clientes atendidos, ni plazos de
   entrega, ni tasas de éxito. Cada número de norma lleva su fuente y fecha de consulta en la ficha, y Simón lo
   verifica antes de que se dibuje.
3. **Ningún dato de identidad que parezca real:** ni RUT, ni número de registro de prestador, ni rol de causa, ni
   dirección con número, ni teléfono. Donde iría el dato se escribe «ficticio». Un número inventado puede ser el de
   alguien.
4. **Ninguna cara**, ni generada ni de banco: un rostro en el sitio de una clínica o de un estudio se lee como su
   profesional o su cliente. Las personas (dos oftalmólogos, dos abogados, una contadora) aparecen solo con su nombre,
   dichas como ficticias, y el nombre se busca antes en el registro público que corresponda (prestadores individuales
   de la Superintendencia de Salud; abogados del Poder Judicial) para que no sea el de alguien que ejerce.
5. **Cero testimonios, cero logos de clientes, cero cifras de resultado**, ningún prospecto, faena ni empresa real
   nombrada.
6. **Capa técnica** (la firma Simón): JSON-LD del tipo de negocio, con la ficción dentro (`disambiguatingDescription`
   en la organización y en cada persona); nunca `Review` ni `AggregateRating`; `noindex, nofollow`; preguntas largas
   en texto plano con encabezados, no en un acordeón cerrado. Propuesta: Tonela `Organization` + `Service` +
   `FAQPage`; Ocelo `MedicalClinic` + `Physician` + `MedicalProcedure` + `FAQPage`; Sesenta `LegalService` + `Person` +
   `FAQPage`; Doceavo `AccountingService` + `FAQPage`.
7. **Texto:** lo escribe Clara, con la estructura de secciones de este plan y los hechos de norma de cada ficha. Yo no
   escribo copy (límite del rol). Tuteo, ninguna raya usada como golpe, el detector A1 a A10 de
   `estudio-web/antislop-web.md`.
8. **Técnica:** HTML, CSS y JS a mano, una carpeta por pieza; fuentes `woff2` copiadas dentro, con su licencia en
   `LICENCIAS.md`; **cero peticiones a terceros** (§2, punto 5); `prefers-reduced-motion` respetado; foco visible; sin
   desborde a 360, 390, 768 y 1440; un `h1` por página. Las capturas, con Playwright y viewport exacto: en este
   contenedor Chrome con `--screenshot` pinta unos 85 px menos que la ventana pedida
   (`marketing/oficina/memoria/bruno-direccion-creativa.md`) y no pasa por el proxy.
9. **Los campos de color, dentro del techo del lock** (§20.3): en la página de caso de cada pieza, los medios claros o
   de color suman del 10 al 35 % del área y no van más de cuatro seguidos. Las cuatro marcas tienen lienzo claro o de
   color, así que una captura de su sitio ya cuenta como campo. Por eso **cada placa sale también en versión sobre
   tinta** (el negro de su marca). Sin esa versión, Tonela, Sesenta y Doceavo se pasarían del techo.

---

## 5 · Lo que se produce en este paso, por pieza (sin generación pagada)

```
marketing/portafolio/0N-<marca>/
  ficha.md       comprobación del nombre, hechos de norma con fuente, ingredientes reales
  identidad/     pliego.html y pliego.png; placas/ (cada placa en HTML y PNG); fuentes/ y LICENCIAS.md
  sitio/         index.html, una interior, fuentes/ (locales)
  movimiento/    recorrido.mjs, recorrido.webm, recorrido.mp4, poster.png
  capturas/      home e interior a 1440 y 390, página completa y primer viewport
```

1. **Ficha** (`ficha.md`), como las de 01 a 03: quién sería, comprobación del nombre (§6), hechos de norma con fuente y
   fecha, e ingredientes reales para la fila del inventario que lleva Diego (encargo §5).
2. **Pliego de identidad:** una lámina 16:9 a 2114 × 1190 (el doble del medio de Koto, 1057 × 595) con el logo (y a
   32 y 16 px), el color (cada token con su rol y su contraste medido), la letra (muestra y licencia) y el recurso
   propio. Y **las placas sueltas** que alimentan el caso, en las formas de fila de Koto (lock §21.2): 16:9
   (1057 × 595), 4:5 (525 × 656) y 1,62 (525 × 324), exportadas al doble. Cada placa en dos versiones, sobre el lienzo
   de la marca y sobre tinta (§4, punto 9).
3. **Portadas** para `/trabajo/`: 4:5, 4:3 y 5:3, las tres alturas del muro de Koto (lock §2.4). Y el medio principal
   del caso en 16:9 (1440) y 4:5 (390) (lock §21.5).
4. **Sitio:** la home completa a 1440 y 390 y una interior a 1440 y 390, en HTML de verdad, con el texto de Clara.
5. **Movimiento:** un recorrido grabado del sitio de **8 a 10 s** a 1440 × 810 (16:9, la forma del medio principal),
   con Playwright (`recordVideo`), pasado a H.264 con ffmpeg, y su `poster.png`. **Probado hoy en este contenedor:**
   la grabación funciona (VP8, 1440 × 810), pero a unos 0,9 Mbit/s queda blanda para un medio de 1057 px. Si se ve
   blanda, se graba cuadro a cuadro (el reloj de Playwright y una captura por cuadro a 30 por segundo) y se arma con
   ffmpeg. De 8 a 10 s cumple el rango de este encargo (8 a 15) y el del encargo del paso 2 (5 a 10).
6. **Comprobación:** contraste, desborde y consola sobre las páginas de la pieza (la herramienta de `npm run
   verificar` con `--base` sobre un servidor local, o una que mida lo mismo), y abro cada PNG y cada clip antes de
   darlos por hechos.

**Diferencia con el encargo del paso 2 (§3 y §8.3).** El encargo pide, para la compuerta 2, el primer viewport de
cada home y una sola home completa (la de la vista 4). Este plan pide la home completa de las cuatro y una interior
por pieza, porque la página de caso de Koto necesita de 11 a 16 filas de medios y una pantalla no las llena sin
relleno. Sigue sin ser el sitio completo: §8.3 se mantiene. **Si el tiempo no da, el piso es el del encargo**, en este
orden: Sesenta completa; después, los primeros viewports de las otras tres.

---

## 6 · Comprobación de nombres

| Nombre | `.cl` (NIC Chile, 16-oct, 20:45) | Búsqueda web (16-oct) | Por qué suena inventado |
|---|---|---|---|
| **Tonela** | Libre | Ninguna empresa con ese nombre, en izaje ni en industria | Es «tonelada» recortada: dice de qué se trata (la carga) y no es una palabra del diccionario ni un apellido |
| **Ocelo** | Libre | Ninguna clínica, óptica ni marca de lentes | «Ocelo» es el ojo simple de algunos insectos: palabra rara, no un apellido. Tiene dos O y una C, que son letras de la carta de optotipos |
| **Sesenta** | Libre | Ningún estudio con ese nombre | Es el plazo, no un apellido. En Chile los estudios se llaman como sus socios, y un número como nombre se lee como invento |
| **Doceavo** | Libre | Ninguna empresa contable con ese nombre | Una fracción (cada mes es un doceavo del año) usada como nombre: nadie se llama así |

**Descartados en el camino, con el dominio tomado:** `izo.cl` (Audiquality S.A.), `brago.cl` (Sociedad Constructora
Brago, desde 2025: además, del rubro), `overol.cl`, `arqueo.cl`, `tabula.cl`, `cuadre.cl`, `partida.cl`, `fierro.cl`,
`almanaque.cl` y `vence.cl`.

**Cómo repetirla:** `curl -s "https://www.nic.cl/registry/Whois.do?d=<nombre>.cl"`: si la página dice «Nombre de
dominio no existe», está libre. Después, la búsqueda web con el nombre entre comillas y el rubro. Lo de hoy está en
`plan-e12-evidencia.json` (los titulares que son personas naturales van omitidos). Se repite el día que la pieza entre
al índice.

---

## 7 · 04 · Tonela (industrial B2B)

**Quién sería.** Proveedor de elementos de izaje (eslingas de poliéster, estrobos de cable, cadenas y grilletes) con
taller de inspección y certificación periódica de esos elementos, para faenas mineras, puertos y constructoras del
norte. Bodega en Antofagasta, ficticia. Le compra un jefe de mantención, un prevencionista de riesgos o el encargado de
bodega de una faena.

**Por qué este oficio.** Industrial B2B con una decisión de seguridad (si una eslinga falla, se cae una carga),
compra recurrente (los elementos se inspeccionan y se reponen) y preguntas largas que hoy contesta un PDF del
fabricante en inglés: «¿qué eslinga uso para levantar 3 toneladas en canasto?», «¿cada cuánto se inspecciona una
eslinga?», «¿cuándo se da de baja?». Es opuesta a Aplomo (una constructora, una obra a la vez) en ciclo y en
comprador.

**El caso, al estilo de Koto** (Challenge, Strategy, Identity, Application, Outcome; en nuestra plantilla, lock
§21.5: Problema, Hipótesis, Solución, La pieza, Resultado):

- **Desafío.** En este rubro los sitios son catálogos copiados del fabricante: foto de producto, «solicite
  cotización» y ninguna tabla de carga en castellano. El que compra cruza tres PDF para saber qué eslinga sirve para
  su maniobra, y el sitio no le dice qué revisar ni cuándo botar lo que ya tiene.
- **Estrategia.** Que la norma sea la marca. Las eslingas de poliéster ya traen un código de colores por capacidad
  (EN 1492: violeta 1 t, verde 2 t, amarillo 3 t, gris 4 t, rojo 5 t, marrón 6 t, azul 8 t, naranja 10 t o más;
  confirmado hoy en Certex, Mennens y Dolezych, enlaces en `plan-e12-evidencia.json`). Ese código pasa a ser la paleta y la manera de
  recorrer el sitio. Y se publica lo que un proveedor guarda: la tabla de carga por modo de amarre y los criterios de
  descarte.
- **Identidad.** TONELA en Big Shoulders, dentro de una etiqueta cosida (el borde punteado de la costura), porque la
  etiqueta es el documento de cada eslinga: capacidad, material, largo, fecha y norma. La marca no tiene color propio:
  es tinta sobre blanco, y **los colores son de la carga**. Barlow Semi Condensed para tablas y cuerpo; Big Shoulders
  Stencil para lo que se marcaría con plantilla (lotes, rótulos de bodega).
- **Aplicación.** La tabla de carga por color en el centro de la home (eliges el modo de amarre y cada fila muestra
  su capacidad en ese modo); el sistema de etiquetas, una por capacidad; el certificado de inspección como documento de
  la marca (plantilla vacía, sin datos de un cliente); el rótulo de bodega; el sitio a 1440 y 390.
- **Qué muestra.** Sin métrica: es un concepto, Tonela no existe y no tuvo clientes. Lo que enseña es oficio: una
  identidad que sale de la norma del rubro en vez de decorarla, y un sitio que contesta la pregunta técnica que el
  comprador le hace a una IA.

**Pliego de identidad.**

- **Logo:** la etiqueta cosida con TONELA; a 32 y 16 px, la T sola dentro de la etiqueta.
- **Color:** lienzo `#F1F2EF` y tinta `#121314` (16,55:1). Los ocho colores de capacidad son tokens que solo
  significan su tonelaje, y cada uno lleva el texto en el par que pase 4,5:1. Medido sobre los valores de partida:
  violeta `#6B3FA0` con blanco 7,38; amarillo `#F2C200` con tinta 11,07; gris `#8C8F91` con tinta 5,72; rojo `#D22B2B`
  con blanco 5,10; marrón `#7A4A2A` con blanco 7,39; azul `#1F5FBF` con blanco 6,09; naranja `#F07D00` con tinta 6,77.
  **El verde `#2E8B3A` da 4,31 con los dos y no pasa:** oscurecido a `#237A33`, da 5,38 con blanco. Los valores finales
  se ajustan mirando el catálogo de un fabricante, no a ojo.
- **Letra:** Big Shoulders (con su corte Stencil) y Barlow Semi Condensed, las dos OFL.
- **Recurso propio:** la tabla de carga por color, con los factores de modo de amarre de la norma (directo, ahorcado,
  canasto y sus ángulos). Simón los verifica contra la tabla de la EN 1492-1 o el catálogo de un fabricante antes de
  programarla.

**Sitio.** **Home:** (1) primera pantalla con la etiqueta, las ocho bandas, la frase de Clara y el rótulo «Concepto»
como etiqueta cosida; (2) la tabla de carga por color, que funciona; (3) lo que se vende, ordenado por capacidad y sin
precios; (4) la inspección, con enlace a la interior; (5) lo que no hacemos (no vender sin saber cómo se va a izar);
(6) preguntas largas, en texto; (7) contacto con tres campos: qué levantas, cuánto pesa, en qué faena. **Interior:**
«Inspección y certificación»: qué se revisa en cada elemento, cuándo se da de baja y cada cuánto se inspecciona, con
la norma citada.

**Movimiento (8 a 10 s).** De 0 a 3 s, las ocho bandas entran de la más liviana a la más pesada. De 3 a 7 s, la página
baja a la tabla y el cursor elige «canasto»: cada fila cambia su capacidad. De 7 a 10 s, en el dibujo del ángulo los
ramales se abren y la capacidad baja con el factor.

**Portada.** Las ocho bandas a sangre en vertical, cada una con su tonelaje en Big Shoulders Stencil, y la etiqueta
TONELA cosida sobre la verde.

**Filas del caso** (unas 11 filas y 16 medios, en las formas del lock §21.2). Medio principal: el recorrido.
Estrategia: el código de la norma, 16:9. Identidad: el logo sobre tinta, 16:9; dos etiquetas (2 t y 5 t), par 4:5;
la letra, 4:5 con dos 1,62; la tabla de carga, 16:9. Aplicación: la home a 1440, 16:9; home e interior a 390, par
4:5; el certificado, el rótulo de bodega y una foto si la hay, dos 1,62 con 4:5; la interior a 1440, 16:9. Qué
muestra: «lo que lee un motor», 16:9 (la pregunta larga, su respuesta en el sitio y el JSON-LD que dice que es
concepto).

**Restricciones del rubro.** La tabla es referencial y lo dice: el plan de izaje lo firma una persona calificada en
la faena. El código de colores es de las eslingas textiles (EN 1492), no de cables ni cadenas, y el sitio no lo
extiende a ellos. Ningún organismo certificador ni acreditación nombrados. Ninguna minera, faena ni cliente.

**Foto o video generado (opcional).** Tres fotos sin personas: el estante de la bodega con las eslingas colgadas por
color (16:9); un gancho con una eslinga verde en canasto contra el cielo del desierto (4:5); eslingas enrolladas por
color, vistas desde arriba (1,62). Y un clip de 5 s: empuje lento sobre la foto del gancho. Unos 30 créditos (§11).

**Plan B, si no convence.** Galvanizado en caliente: la lentejuela del zinc dibujada en código como recurso (una
teselación de Voronoi) y el espesor en micras como único número.

**Encargo de producción.** Bruno arma en `marketing/portafolio/04-tonela/` la identidad de un proveedor de izaje que
no existe: TONELA en Big Shoulders dentro de una etiqueta cosida, la marca en tinta sobre blanco frío y los ocho
colores de la EN 1492 como único color, cada uno con su tonelaje y su par de texto a 4,5:1 (el verde, oscurecido). Lo
entrega en un pliego 16:9 y en placas 16:9, 4:5 y 1,62, sobre lienzo y sobre tinta, con «CONCEPTO» en la esquina, más
las portadas 4:5, 4:3 y 5:3. Construye en HTML, con fuentes locales, la home (bandas y rótulo en la primera pantalla,
tabla de carga que funciona, catálogo por capacidad sin precios, inspección, lo que no hacemos, preguntas en texto,
contacto de tres campos) y la interior «Inspección y certificación», a 1440 y 390, con el texto de Clara y los
factores y criterios que Simón verifique en la norma. Graba con Playwright un recorrido de 8 a 10 s a 1440 × 810 y lo
pasa a H.264. Sin precios, clientes, faenas ni certificadores; la tabla dice que es referencial. Las fotos, solo con el
OK de Ramón.

---

## 8 · 05 · Ocelo (clínica: oftalmología)

**Quién sería.** Centro de cirugía refractiva y de cataratas en Providencia, ficticio, con dos oftalmólogos ficticios.
Lo busca un adulto que quiere dejar los lentes o que tiene cataratas, o el hijo que le busca clínica.

**Por qué este oficio.** Salud es YMYL duro, y en salud el outbound eligió oftalmología (`ventas/pipeline-prospeccion.md`,
9-jul). Las preguntas son largas y personales: «¿puedo operarme la miopía si tengo la córnea delgada?», «¿LASIK o
PRK?», «¿a qué edad se opera una catarata?». Es opuesta a Raigal en el cliché que evita: no hueso cálido con serif, sino
la carta del examen.

**El caso, al estilo de Koto.**

- **Desafío.** El rubro vende un resultado («chao lentes») con fotos de antes y después. La pregunta que trae el
  paciente es otra, ¿soy candidato?, y la contesta un examen (el grosor de la córnea, si la graduación está estable,
  la edad, el ojo seco), no un banner.
- **Estrategia.** Cambiar la promesa por el examen. El sitio se ordena como la evaluación, y la carta de optotipos,
  lo primero que ve cualquier paciente, es la interfaz: la escala de letra sigue los pasos de la carta logMAR (cada
  fila, 0,1 log más chica, un factor de 1,2589), así que la jerarquía del sitio es la de un examen de la vista.
- **Identidad.** OCELO dibujado en la retícula de 5 × 5 de los optotipos (trazo de un módulo, letra de cinco), como
  las letras Sloan. El símbolo es **la C de Landolt**, un optotipo real (un anillo con una abertura de un quinto), que
  en el sitio apunta hacia donde sigue la lectura. Para leer, Atkinson Hyperlegible Next: la diseñó el Braille
  Institute para lectores con baja visión, que es parte de quien entra a este sitio. El rojo y el verde del test
  duocromo, solo para comparar dos opciones.
- **Aplicación.** La carta como primera pantalla, con cada fila llevando a una sección. La sala a oscuras con una
  luz que se enciende: después de una cirugía refractiva la luz molesta unos días, así que la página no encandila, y si
  prefieres luz, la enciendes. El comparador rojo y verde para LASIK o PRK y para lente monofocal o multifocal, que dice
  qué decide cada uno. La plantilla del informe de evaluación (qué se mide, sin datos de un paciente). La placa de la
  puerta. El sitio a 1440 y 390.
- **Qué muestra.** Sin métrica: es un concepto, Ocelo no existe y no atendió a nadie. Muestra que en salud la
  honestidad es diseño: una identidad hecha con los instrumentos del examen y una sección que dice lo que no se puede
  prometer.

**Pliego de identidad.**

- **Logo:** OCELO en la retícula y la C de Landolt. A 32 y 16 px, la C sola: a 16 px un anillo con abertura se sigue
  leyendo, que es justo lo que se le pide en el examen.
- **Color:** sala `#16181A` y luz `#F5F5F2` (16,30:1 entre ellas); gris de lectura `#9EA3A8` sobre la sala, 7,00;
  tinta `#0F0F0F` sobre la luz, 17,55. Duocromo rojo `#E0352B` y verde `#23A04A`, con letras en tinta solo desde
  24 px (dan 4,30 y 5,66: pasan el 3:1 del texto grande, no el 4,5).
- **Letra:** el logotipo, dibujado en SVG; Atkinson Hyperlegible Next y Atkinson Hyperlegible Mono, OFL.
- **Recurso propio:** la carta logMAR como escala tipográfica, y la C de Landolt.

**Sitio.** **Home:** (1) la carta: el nombre arriba, filas que se achican, cada fila lleva a una sección; el interruptor
de luz; el rótulo «Concepto» como una fila de la carta, legible; (2) ¿soy candidato?: lo que decide (córnea,
graduación estable, edad, ojo seco); (3) el comparador rojo y verde; (4) lo que no se puede prometer; (5) quiénes: dos
oftalmólogos ficticios y dicho, sin foto; (6) preguntas largas; (7) pedir la evaluación, sin precios (se dice lo que
mueve el precio). **Interior:** «La evaluación»: qué se mide (refracción, paquimetría, topografía corneal, ojo seco),
qué decide cada medición y en qué orden se hace.

**Movimiento (8 a 10 s).** De 0 a 3 s, la carta aparece fila por fila, de la grande a la chica. De 3 a 6 s, clic en
«Encender la luz» y la página pasa de la sala a la luz, como un interruptor (con movimiento reducido, el mismo cambio,
sin transición). De 6 a 10 s, baja al comparador y el cursor pasa del rojo al verde.

**Portada.** La carta encendida ocupando el cuadro, la C de Landolt arriba y una franja roja y verde abajo. **Con la
luz encendida:** la sala da 1,14:1 contra el negro del sitio y la portada se borraría.

**Filas del caso** (unas 11 filas y 15 medios). Medio principal: el recorrido. Estrategia: la carta logMAR con sus
pasos, 16:9. Identidad: el logotipo en su retícula, 16:9; la C de Landolt a cinco tamaños y a 16 px, par 4:5; la letra,
4:5 con dos 1,62; el duocromo, 16:9. Aplicación: la home a oscuras y con luz, par 4:5 a 390; la home a 1440, 16:9; el
informe de evaluación, la placa de la puerta y la foto de los lentes de prueba si la hay, dos 1,62 con 4:5; la interior
a 1440, 16:9. Qué muestra: «lo que no se puede prometer», la sección tal cual, 16:9.

**Restricciones del rubro.** Ninguna promesa de resultado clínico: ni «20/20», ni «sin lentes para siempre», ni antes y
después. Los riesgos y la presbicia, dichos. Los profesionales, ficticios y dichos, con nombres comprobados en el
Registro Nacional de Prestadores Individuales de la Superintendencia de Salud (que ninguno sea el de un médico real) y
sin número de registro. Sin precios.

**Foto o video generado (opcional).** Dos fotos sin personas: la caja de lentes de prueba abierta, en macro (16:9); la
sala a oscuras con el foróptero en primer plano y nuestra carta compuesta en la proyección (4:5). Y un clip de 5 s: el
foco corre sobre los lentes de prueba. Unos 25 créditos (§11).

**Plan B, si no convence.** La luz encendida por defecto (carta blanca, tinta y duocromo), si a oscuras se lee como un
modo oscuro de plantilla.

**Encargo de producción.** Bruno arma en `marketing/portafolio/05-ocelo/` la identidad de un centro de cirugía
refractiva y de cataratas que no existe: OCELO dibujado en la retícula de 5 × 5 de los optotipos, la C de Landolt como
símbolo (legible a 16 px), Atkinson Hyperlegible Next y Mono, la sala `#16181A` con la luz que se enciende y el rojo y
el verde del duocromo solo para comparar, con letras de 24 px o más. Lo entrega en pliego y placas (16:9, 4:5, 1,62,
sobre lienzo y sobre tinta, con «CONCEPTO» en la esquina) y portadas con la luz encendida. Construye en HTML, con
fuentes locales, la home (la carta como primera pantalla con la escala logMAR, el interruptor de luz, ¿soy candidato?,
el comparador, lo que no se puede prometer, dos oftalmólogos ficticios sin foto, preguntas en texto, pedir evaluación sin
precios) y la interior «La evaluación», a 1440 y 390, con el texto de Clara y lo que Simón verifique de una evaluación
refractiva. Graba de 8 a 10 s: la carta que aparece, la luz que se enciende y el comparador. Ninguna promesa de
resultado, ningún antes y después, ninguna cara ni número de registro. Las fotos, solo con el OK de Ramón.

---

## 9 · 06 · Sesenta (estudio legal: laboral, del lado del trabajador) · la que va más lejos

**Quién sería.** Estudio de derecho laboral que representa a trabajadores: despido injustificado, autodespido,
nulidad del despido por cotizaciones impagas, tutela de derechos fundamentales y accidentes del trabajo. Santiago
centro, ficticio, con dos abogados ficticios. Lo busca, desde el teléfono, alguien a quien despidieron esta semana.

**Por qué este oficio, y por qué va más lejos.** Es donde más vendemos: abogados es el nicho principal desde el 21-sep
(4 respuestas de 69 correos, brief §2), y en la lista de estudios casi todos atienden personas y laboral es la materia
que más aparece (§2, punto 4). Es opuesta a Deslinde, que asesoraba al empleador. Va a la vista 4 por tres razones: es
el rubro del lector que más nos importa; su recurso tiene la interacción más clara para grabar; y su paleta (azul y
papel) obliga a resolver el techo de campos del lock §20.3 con las versiones sobre tinta, que es la prueba más exigente
del juego de color.

**El caso, al estilo de Koto.**

- **Desafío.** El rubro le habla a alguien asustado con avisos de «¿te despidieron? llama ya» y con juicios ganados
  de antemano. Lo que esa persona tiene en la mano son dos cosas, una fecha y una carta, y lo que le pregunta a una IA
  depende de las dos: cuánto plazo le queda y qué significa el artículo que cita su carta.
- **Estrategia.** Ordenar todo alrededor de esas dos cosas. **La fecha:** el Código del Trabajo da 60 días hábiles
  desde la separación para ir al juzgado (art. 168; el reclamo ante la Inspección del Trabajo suspende el plazo, con un
  máximo de 90). **La carta:** el artículo que cita (159, 160 o 161) cambia todo lo que sigue. El nombre del estudio es
  el plazo.
- **Identidad.** SESENTA en Schibsted Grotesk negra (900), con el 60 como sello: el estudio se presenta como un
  timbre sobre un documento. Lienzo azul de ropa de trabajo: el color del overol, no el azul marino de los estudios.
  Los documentos (la carta, el finiquito, el escrito) van en papel y en Courier Prime, y en ningún otro lugar. La suma
  del escrito («En lo principal…», «Primer otrosí…») es la manera de titular las secciones.
- **Aplicación.** El contador: pones la fecha de tu despido y el 60 baja hasta los días hábiles que te quedan
  (referencial). El lector de la carta: 159, 160 o 161, qué suele significar cada uno y de qué depende. «Antes de firmar
  el finiquito». La hoja de la primera reunión (qué traer: la carta, el finiquito si lo hay, liquidaciones, el
  certificado de cotizaciones), imprimible. La tarjeta. El sitio a 1440 y 390.
- **Qué muestra.** Sin métrica: es un concepto, Sesenta no existe y no llevó ninguna causa. Muestra que un estudio
  puede contestar la pregunta del primer día sin prometer el juicio, y que eso, escrito en texto plano y con el plazo
  exacto, es lo que un motor de IA cita.

**Pliego de identidad.**

- **Logo:** SESENTA y el sello 60; a 32 y 16 px, el 60 solo.
- **Color:** azul `#22408A` con blanco (9,68:1) y con papel `#F3F1EA` (8,57); tinta `#111111` sobre papel, 16,71;
  celeste `#B9C6E6` sobre azul, 5,66, para el texto secundario. Nada más.
- **Letra:** Schibsted Grotesk (400 a 900) y Courier Prime solo en documentos, OFL.
- **Recurso propio:** el 60 que baja y la suma del escrito.

**Sitio.** **Home:** (1) primera pantalla: el 60, una frase de qué hacer hoy y el rótulo «Concepto» como un sello
legible; (2) el contador; (3) ¿qué artículo dice tu carta?, con enlace a la interior; (4) antes de firmar el finiquito;
(5) qué traer a la primera reunión; (6) cómo se cobra, explicado sin cifras; (7) preguntas largas; (8) contacto.
**Interior:** «¿Qué artículo dice tu carta?»: 159, 160 y 161, cada uno con lo que suele implicar y lo que determina la
respuesta, más la nulidad del despido por cotizaciones impagas.

**Una trampa que se resuelve antes de programar:** qué cuenta como día hábil para el plazo del art. 168 (si el sábado
cuenta, y qué feriados). Lo confirma Simón en la ley y en la jurisprudencia, con la fuente en la ficha. Hasta entonces,
el contador explica la regla y no cuenta.

**Movimiento (8 a 10 s).** De 0 a 3 s, el 60 y la suma en la primera pantalla. De 3 a 8 s, se escribe una fecha y el
60 baja, cifra por cifra, hasta los días que quedan. De 8 a 10 s, la página baja al lector de la carta y se elige 161.

**Portada.** Un 60 blanco enorme cortado por el marco sobre el azul, con la suma en papel y en Courier encima.

**Filas del caso** (unas 12 filas y 17 medios). Medio principal: el recorrido. Estrategia: la suma del escrito, 16:9.
Identidad: SESENTA y el sello sobre tinta, 16:9; el 60 a 32 y 16 px y la paleta con sus contrastes, par 4:5; la letra,
4:5 con dos 1,62; el contador, 16:9. Aplicación: la home a 1440, 16:9; home e interior a 390, par 4:5; la hoja de la
primera reunión, la tarjeta y la foto de la mesa si la hay, dos 1,62 con 4:5; la interior a 1440, 16:9; «antes de
firmar el finiquito», 16:9 sobre tinta. Qué muestra: la pregunta «¿cuánto plazo tengo para demandar?» y la respuesta del
sitio en texto plano, con el JSON-LD que dice que es concepto, 16:9.

**Restricciones del rubro.** Ninguna promesa de resultado judicial; ninguna tasa de éxito ni monto recuperado. Los
plazos y los artículos, exactos según el Código del Trabajo (bcn.cl), con fecha de consulta. El contador y el lector
dicen que son referenciales y que no reemplazan que un abogado lea tu carta. Los abogados, ficticios y dichos, con
nombres comprobados en el registro de abogados del Poder Judicial. Ningún rol de causa ni monto.

**Foto o video generado (opcional).** Dos fotos sin personas: una mesa vista desde arriba con un sobre, un finiquito sin
firmar y un lápiz pasta azul, con nuestros documentos compuestos encima (16:9); una chaqueta de trabajo azul colgada en
el respaldo de una silla (4:5). Unos 10 créditos (§11).

**Plan B, si no convence.** La suma del escrito como recurso principal (la página entera titulada como un escrito) y el
contador en segundo plano.

**Encargo de producción.** Bruno arma primero, en `marketing/portafolio/06-sesenta/`, la identidad de un estudio laboral
que representa a trabajadores y no existe: SESENTA en Schibsted Grotesk 900 con el 60 como sello, lienzo azul de trabajo
`#22408A`, papel y Courier Prime solo para documentos, y la suma del escrito como manera de titular. Lo entrega en
pliego y placas (16:9, 4:5, 1,62, sobre lienzo y sobre tinta para caber en el techo de campos, con «CONCEPTO» en la
esquina) y portadas 4:5, 4:3 y 5:3. Construye en HTML, con fuentes locales, la home completa (el 60 y qué hacer hoy, el
contador, el lector de la carta, antes de firmar el finiquito, qué traer, cómo se cobra sin cifras, preguntas en texto,
contacto) y la interior «¿Qué artículo dice tu carta?», a 1440 y 390, con el texto de Clara y los artículos y plazos
que Simón verifique en el Código del Trabajo, incluida la regla del sábado antes de que el contador cuente. Graba de 8
a 10 s: el 60, la fecha que lo hace bajar y el lector en 161. Es el material de la vista 4 en A y en B. Ninguna promesa
de resultado, tasa ni monto; abogados ficticios sin rol ni registro. Las fotos, solo con el OK de Ramón.

---

## 10 · 07 · Doceavo (servicios profesionales: contable y tributario)

**Quién sería.** Estudio contable y tributario para pymes e independientes: contabilidad mensual, F29, remuneraciones,
Operación Renta e inicio de actividades. Concepción, ficticio, con una contadora ficticia y su equipo sin nombres. Lo
busca el dueño de una pyme que se enteró de un vencimiento por un aviso del SII.

**Por qué este oficio.** Es el servicio profesional que ya prospectamos (32 estudios contables en
`ventas/contactos-google-maps-contadores.csv`), B2B y de plata, con preguntas largas que dependen de la fecha: «¿cuándo
vence el F29?», «¿qué pasa si declaro fuera de plazo?», «¿tengo que declarar si este mes no vendí nada?».

**El caso, al estilo de Koto.**

- **Desafío.** Los sitios del rubro dicen «asesoría integral» y «soluciones a tu medida» y terminan en un botón de
  WhatsApp. El dueño de una pyme no compra asesoría: compra no enterarse tarde. Lo que no sabe es qué vence este mes y
  qué le toca hacer a él.
- **Estrategia.** Publicar el calendario. Cada mes es un doceavo del año, con sus vencimientos (los del calendario
  del SII) y lo que el estudio hace y el día en que te escribe. El sitio sabe en qué mes estás.
- **Identidad.** «doceavo» en Recursive, con una retícula de doce casillas como símbolo: la del mes en curso va
  llena, así que **el logo cambia solo cada mes** (un dato verdadero, como el reloj de Koto). Recursive tiene un eje
  que la vuelve monoespaciada: el texto se lee en sans y las cifras se encolumnan en mono, con la misma letra. Lienzo
  verde pálido de libro contable, con sus líneas. El único color es el rojo, y solo para lo que vence: el almanaque al
  revés, donde lo rojo no es feriado sino plazo.
- **Aplicación.** El año en doce (los doce meses en miniatura con sus vencimientos); la hoja del mes, como un
  almanaque de taco que se arranca; el informe mensual que recibiría el cliente (lo pagado y lo que viene, plantilla
  sin datos); el lomo del archivador de cada mes; el sitio a 1440 y 390.
- **Qué muestra.** Sin métrica: es un concepto, Doceavo no existe y no llevó la contabilidad de nadie. Muestra un
  servicio profesional sin una sola promesa vaga: lo que se ofrece es una fecha, y la marca entera está hecha de esas
  fechas.

**Pliego de identidad.**

- **Logo:** «doceavo» y la retícula de 3 × 4 casillas con la del mes llena; a 32 y 16 px, la retícula sola.
- **Color:** verde de libro `#DCE6D3`; tinta `#141414` (14,30:1); verde oscuro `#4A5A44` para texto secundario (5,75);
  líneas de libro `#A9C0A0` (1,52: decorativas, separan y no informan); rojo de vencimiento `#B3261A` (5,08; el
  `#C8281C` del primer tanteo daba 4,32 y no pasaba).
- **Letra:** Recursive, sans y mono por su eje MONO, sin el eje casual; OFL.
- **Recurso propio:** el año en doce y el papel columnar.

**Sitio.** **Home:** (1) primera pantalla con el año en doce, el mes en curso marcado y lo que vence en él, y el rótulo
«Concepto» como nota al margen del libro; (2) este mes: qué vence y qué hacemos, día por día; (3) lo que hacemos cada
mes, en columnas (fecha, qué, quién); (4) lo que no hacemos (no prometemos pagar menos impuestos); (5) los servicios
como tabla; (6) preguntas largas; (7) contacto. **Interior:** «Calendario»: el mes en grande, con los vencimientos del
año que se muestra y su fuente (sii.cl).

**Movimiento (8 a 10 s).** De 0 a 3 s, el año en doce se llena mes a mes. De 3 a 7 s, clic en el mes en curso y la hoja
del anterior se arranca, el gesto del almanaque de taco. De 7 a 10 s, la página baja a la columna de lo que vence y la
fila de hoy queda marcada.

**Portada.** El año en doce sobre papel columnar verde, con los puntos rojos de los vencimientos y un 1/12 grande.

**Filas del caso** (unas 11 filas y 15 medios). Medio principal: el recorrido. Estrategia: el año en doce, 16:9.
Identidad: el logo con la retícula de tres meses distintos (el logo que cambia), par 4:5; la letra en sans y en mono,
4:5 con dos 1,62; el papel columnar y el rojo, 16:9 sobre tinta. Aplicación: la home a 1440, 16:9; home e interior a
390, par 4:5; la hoja del mes, el informe mensual y el lomo del archivador, dos 1,62 con 4:5; la interior a 1440, 16:9.
Qué muestra: «¿cuándo vence el F29?» y la respuesta del sitio, con su fuente, 16:9.

**Restricciones del rubro.** Las fechas exactas del calendario del SII del año que se muestre, con fuente y fecha de
consulta, y el sitio dice que se confirman en sii.cl. Ninguna promesa de pagar menos impuestos ni de «evitar multas»
como garantía. Ningún RUT ni dato de contribuyente. La contadora, ficticia y dicha.

**Foto o video generado (opcional).** Dos fotos sin personas: archivadores en una repisa con los lomos en blanco, para
componer los nuestros (16:9); un escritorio con un almanaque de taco con la hoja en blanco, para componer la nuestra
(4:5). Unos 10 créditos (§11).

**Plan B, si no convence.** La retícula de casillas numeradas de un formulario tributario como recurso, en vez del
calendario.

**Encargo de producción.** Bruno arma en `marketing/portafolio/07-doceavo/` la identidad de un estudio contable para
pymes que no existe: «doceavo» en Recursive (sans para leer, mono para cifras), una retícula de 12 casillas con la del
mes en curso llena como símbolo que cambia cada mes, lienzo verde de libro `#DCE6D3` con sus líneas y el rojo `#B3261A`
solo para lo que vence. Lo entrega en pliego y placas (16:9, 4:5, 1,62, sobre lienzo y sobre tinta, con «CONCEPTO» en la
esquina) y portadas 4:5, 4:3 y 5:3. Construye en HTML, con fuentes locales, la home (el año en doce con el mes en curso,
este mes día por día, lo que hacemos cada mes, lo que no hacemos, servicios en tabla, preguntas en texto, contacto) y la
interior «Calendario», a 1440 y 390, con el texto de Clara y las fechas que Simón verifique en el calendario del SII del
año mostrado. Graba de 8 a 10 s: el año que se llena, la hoja que se arranca y la fila de hoy. Ninguna promesa de pagar
menos ni de evitar multas, ningún RUT. Las fotos, solo con el OK de Ramón.

---

## 11 · Fotografía y video: cotizado, decide Ramón

**El estado, consultado hoy con las herramientas de Higgsfield de solo lectura** (`balance`, `models_explore` y el
cuadro de precios; ninguna de generación):

- **Saldo: 0 créditos, plan gratuito.** El cuadro de precios dice que este espacio de trabajo **no admite recargas
  sueltas ni recarga automática**: para generar hay que tomar un plan. Es lo mismo que el `README.md` ya registraba
  («exige plan de pago»).
- **Planes (USD):** PLUS, 49 al mes (1.000 créditos) o 39 al mes pagando el año; ULTRA, 129 al mes (3.000 créditos) o
  99 al mes pagando el año.

**Cuánto cuesta cada cosa** (estimado: el número exacto lo da el preflight de costo de cada generación, que no se corrió
porque se hace con la herramienta de generar):

- Una imagen con **Nano Banana Pro** a 2K: unos 1,7 créditos (el cuadro de precios equipara 1.000 créditos a 600
  generaciones). Alternativa: Seedream 4.5.
- Un clip de 5 s con **Kling 3.0**, sin sonido, desde una foto: unos 5 créditos (el cuadro equipara 1.000 créditos a
  unos 200 videos).
- Referencias medidas en el repo: `soul_location`, 0,03 por imagen, y `kling3_0_turbo`, 7,5 por 5 s (2-sep); Veo 3.1
  rápido, 22 por clip de 8 s (julio).
- El cuadro lista, para quien compre PLUS hasta el 17-oct, 365 días sin límite en Nano Banana, Seedream 4.5, GPT Image
  y otros modelos de imagen. Si sigue vigente el día que se compre, las fotos no gastan créditos. Es texto del cuadro del
  16-oct; no lo verifiqué más allá.

**Por pieza** (cada foto con 2 variantes, cada clip con 2 intentos, y 50 % de margen):

| Pieza | Fotos | Clips de 5 s | Créditos estimados | Qué suma | Sin eso |
|---|---|---|---|---|---|
| Tonela | 3 | 1 | ~30 | El mundo real de la carga: bodega, gancho, desierto | La llevan las placas, la tabla y la grabación |
| Ocelo | 2 | 1 | ~25 | La caja de lentes de prueba y la sala con el foróptero | La llevan la carta y la C |
| Sesenta | 2 | 0 | ~10 | La mesa con la carta y el finiquito; la chaqueta azul en una silla | Los documentos se dibujan |
| Doceavo | 2 | 0 | ~10 | Los archivadores por mes; el almanaque en un escritorio | La lleva el año en doce |
| **Total** | **9** | **2** | **~75** | | |

**En plata:** los ~75 créditos caben más de trece veces en un mes de PLUS, así que el costo lo pone el plan, no las
imágenes: **USD 49 por un mes**. Sin Higgsfield, la API de Gemini directa cuesta unos USD 0,04 por imagen según el
encargo de fotos de E10 (`marketing/encargos-otras-sesiones/encargo-e10-fotos-ia.md`), pero pide una clave que esta
sesión no tiene y no hace video.

**Cómo se usarían:** ninguna foto lleva personas (§4, punto 4). Cuando la foto lleve un documento o un rótulo de la
marca (la carta, el almanaque, la etiqueta), se genera sin texto y nuestro documento se compone encima en HTML; si en el
render no se ve verdadero, el documento va en su propia placa y la foto queda sola. Cada foto o clip generado se dice
generado en el caso.

**Mi recomendación:** terminar las cuatro sin generar, porque este plan las deja completas así, y decidir la foto
mirándolas en la compuerta 2, pieza por pieza. Si se paga un mes, las cuatro tandas se hacen juntas, en una sola
sesión, con el preflight de costo antes de cada una y el gasto anotado en la ficha.

---

## 12 · Orden, dueños y dependencias

| Orden | Pieza | Bruno | Clara | Simón | Depende de |
|---|---|---|---|---|---|
| 1 | Sesenta (vista 4) | Identidad, placas, portadas, sitio, recorrido | Texto del sitio y del caso | Código del Trabajo (art. 159 a 163 y 168, la regla del sábado), JSON-LD, nombres de los abogados | La identidad no depende de nadie; el sitio, del texto de Clara |
| 2 | Tonela | Igual | Igual | EN 1492 (factores de modo, criterios de descarte, frecuencia de inspección), JSON-LD | Igual |
| 3 | Ocelo | Igual | Igual | Lo que se mide en una evaluación refractiva y lo que no se puede prometer; nombres contra el registro de prestadores | Igual |
| 4 | Doceavo | Igual | Igual | Calendario del SII del año mostrado | Igual |

- **Diego:** una fila por pieza en `e12/inventario-casos.md` con sus ingredientes reales (encargo §5), y Raigal fuera
  del índice del v3 al construir la vista 2.
- **Lucía:** cómo presenta cada dirección (A y B) las mismas cuatro piezas, y los campos de color dentro del techo de
  §20.3.
- **Javiera:** QA en un subagente limpio, con el §13.
- **Commits:** al menos uno por pieza y por tramo (identidad; sitio; movimiento), solo con los archivos de esa pieza.
  El `README.md` se actualiza en el primero: la tabla con las cuatro nuevas, la primera serie como archivo, el hallazgo
  del §1 y la decisión de «una sola pieza de concepto» superada por la compuerta 1 (punto 5).

---

## 13 · Criterios de aceptación de las piezas (para Javiera)

1. Las cuatro carpetas, `04-tonela` a `07-doceavo`, con ficha, identidad, sitio, movimiento y capturas.
2. «Concepto» visible en la captura del primer viewport de cada home e interior a 1440 × 900 y 390 × 844, de 12 px o
   más y con 4,5:1 o más; en cada PNG exportado; en la ficha lateral del caso y en la entrada del índice.
3. Ningún número que no esté en la tabla de hechos de norma de su ficha, con fuente y fecha; cero precios, porcentajes,
   años y clientes; cero testimonios; cero caras; ningún RUT, registro, rol, teléfono ni dirección con número.
4. Las cuatro distintas: lienzo, letra y forma del logo distintos por pieza (§3), comprobable con las portadas lado a
   lado y sin nombres; ninguna letra de la lista del §3 (`document.fonts` y `getComputedStyle`).
5. Fuentes locales y cero peticiones a terceros (el registro de red de Playwright solo muestra archivos de la carpeta).
6. Cero nodos de texto bajo 4,5:1 (3:1 desde 24 px, o 18,66 px en negrita) en home e interior, a 1440 y 390.
7. Sin desborde a 360, 390, 768 y 1440; un `h1` por página; consola sin errores; con `prefers-reduced-motion: reduce`,
   nada se mueve solo.
8. JSON-LD que parsea, con la ficción en `disambiguatingDescription`; sin `Review` ni `AggregateRating`; `noindex,
   nofollow`.
9. Un recorrido de 8 a 10 s en H.264 a 1440 × 810, nítido a 1057 px de ancho, con su poster y el script que lo
   genera.
10. Pliego y placas en las formas de Koto (16:9, 4:5, 1,62), sobre lienzo y sobre tinta; en la página de caso, los
    campos claros y de color suman del 10 al 35 % del área.
11. Cero llamadas a generación sin el OK de Ramón escrito en el acta.

---

## 14 · Lo que decide Ramón (en la compuerta 2, junto con A o B)

1. **Los cuatro nombres**, o cuál cambiar.
2. **Ocelo a oscuras por defecto**, con la luz que se enciende, o con la luz encendida desde el principio.
3. **Si se paga generación** (§11): nada, o un mes de PLUS (USD 49) para las cuatro tandas.
4. **Sesenta como la pieza de la vista 4.**
5. **Que 01 a 03 queden como archivo** y que Raigal salga del índice del v3 (su nombre es de una empresa real, §1).

---

## Historial de correcciones

| Fecha | Corrección | Origen |
|---|---|---|
| 16-oct, 19:50 | Primera versión, con la compuerta 1 aprobada | Bruno |
