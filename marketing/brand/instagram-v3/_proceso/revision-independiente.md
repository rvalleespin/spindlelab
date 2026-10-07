# Revisión independiente del manual v3.0 y el kit (7-oct-2026)

Revisora en contexto limpio, contra el sitio, la spec y los detectores anti-slop. Revisó el estado del commit `ca212d9`.

**Veredicto: rechazado** · 4 bloqueantes · 9 menores

## 1. [bloqueante] manual-de-marca.md §10.3 y §10.4 (líneas 459-460 y 499-547) contra instagram-v3/base.css:35-48, campo.css:4, carrusel.css, README «Cómo se edita» 2 y «Zonas»

**Qué:** El capítulo de Instagram del manual describe un kit que no existe. La línea 459-460 dice que «el kit las cumple», pero el manual y el kit no coinciden en casi ninguna medida: margen, ancho útil, toda la escala de texto, el filete, la etiqueta y el wordmark del cierre. Quien produzca la próxima pieza con el manual va a obtener otra cosa que con el kit, y nadie va a poder auditarla contra una sola fuente.

**Evidencia:** Medido en el render del kit, con valor del manual entre paréntesis: margen 72 (90, l.503), con texto desde x=72 y «AHÍ SE CORTA» hasta x=992. Ancho útil 936 (900, l.504). Display 130/132/136/140 (108, l.530). h1 76 (100). h2 56/52/48 (61). Guía 44 (55). Descripción del campo 44 (50). Cuerpo 40 (47). Precio 36 (44). Interlínea del ojillo 1,3 (1,5). Llamado del cierre 36 px 500 (guía 55 px 400, l.609). Filete 2 px en el entregable (3, l.506): Chrome trunca 2,769 a 4 px de dispositivo a 2x. Etiqueta con relleno 12/20, 73,5 de alto y blur 16 (14/22, 78 y 17, l.547). Wordmark del cierre 197 (190, l.581). El README fija 72 y 936. Tabla completa en qa/manual-vs-kit.tsv.

**Arreglo propuesto:** Elegir una sola fuente y alinear la otra en la misma pasada. Opción A: llevar el kit a los valores del manual, que siguen el principio que el propio manual declara (sitio a 390 × 2,77): base.css --d-m 90, --t-h1 100, --t-h2 61, guía 55, cuerpo 47, precio 44, display 108 y llamado en guía, y después volver a rendir y medir. Opción B: reescribir §10.3 y §10.4 con los valores del kit y explicar por qué se apartan del ×2,77. En los dos casos hay que corregir la línea 459-460 y la tabla de Zonas y el paso 2 del README.

## 2. [bloqueante] instagram-v3/carrusel-3-dato.html:6 (.cifra b 460px) contra manual §10.6 l.580 y §10.7 l.599

**Qué:** La lámina interior del dato pone la cifra «8» a 460 px. El manual lo prohíbe con todas sus letras: en el interior la cifra va en h1 (100 px, 500), porque una cifra gigante es un segundo grito. Además falta «la fuente en rótulo» que pide la línea 580: el rótulo de serie nombra el tema, no dice dónde se revisa el dato.

**Evidencia:** Render: «8» a 460 px peso 500, caja 72-325 × 374-1002, que se ve como 166 px en un teléfono de 390. En la misma lámina, el texto más grande después de la cifra es el h2 de 56. El único rótulo es «Los 21 chequeos de visibilidad en IA · 3 de 5». Captura: qa/capturas/h390-carrusel.png (tercer panel).

**Arreglo propuesto:** Llevar la cifra al rol h1 de la escala que se adopte en el defecto 1, en papel y peso 500, y agregar la fuente como rótulo en gris (por ejemplo, la ruta del artículo en spindlelab.cl/blog/…). Si la cifra es el gancho, sube a la portada con las reglas del display.

## 3. [bloqueante] instagram-v3/post-foto.html:7-16 y README (tabla de tipos, «Foto con texto encima») contra manual §07b l.326-327, §10.6 l.577 y §10.10 l.641

**Qué:** post-foto es una foto a sangre, sin radio, con texto encima. El manual define post-foto como «una foto como pieza (radio 6, en su proporción, sin texto encima) · titular en caja normal» y prohíbe «texto sobre una foto (salvo la etiqueta de pieza)». El sitio tampoco tiene ninguna foto a sangre con texto encima: .d-sangre lleva margen y radio. Es además la miniatura de la grilla que más se parece a una plantilla genérica de Instagram (foto con titular encima).

**Evidencia:** Render: img domino.jpg en 0,270–1080,1350, con radio 0 (no aparece en la lista de radios). El titular h1 de 76 px, en y 193-548, pisa la foto desde y=270, y el llamado, en y 1228-1277, va sobre el piso de la foto. El render.mjs del kit incluso tiene un modo «sobre-foto» para medir este caso. El titular es h1 76 (el manual pide h2 61 para post-foto, l.533).

**Arreglo propuesto:** Componer post-foto como lo define el manual: la foto como .pieza con radio, en su proporción (domino.jpg es 1:1), y el titular y el llamado en el lienzo negro, fuera de la foto. Si la foto a sangre se quiere conservar, eso es una decisión de dirección que Ramón tiene que tomar, y después hay que escribirla en §07b y §10.6; hoy el kit contradice el manual.

## 4. [bloqueante] instagram-v3/post-foto.html:20 (texto del h1) contra spindlelab-astro/src/pages/v3/index.astro:212-215

**Qué:** El titular recorta la presentación de la home justo antes de su referente. Queda «…el primero en llegar no es una persona.» y nunca dice quién es. El sitio dejó escrito que esa omisión fue el bloqueante de las dos direcciones del 2-oct, así que el estándar del proyecto ya está fijado.

**Evidencia:** Texto del sitio: «Tu sitio está escrito para personas. Pero cada vez más, el primero en llegar no es una persona: es la máquina que responde cuando alguien pregunta por tu rubro.» Comentario en index.astro:212-213: «El referente va entero: «es la máquina que responde…». Su falta fue el bloqueante de las dos direcciones del 2-oct.» Texto del kit: «Tu sitio está escrito para personas. Cada vez más, el primero en llegar no es una persona.»

**Arreglo propuesto:** Restituir el referente, por ejemplo «…el primero en llegar no es una persona: es la máquina que responde cuando alguien pregunta por tu rubro.», o acortar a otra frase real que lo contenga. Al cambiar el largo hay que volver a medir que quepa.

## 5. [menor] post-campo-desarrollo(.html, -oro), post-campo-continuidad, post-campo-visibilidad, story-portada (campo.css:8 .pieza flex 1 1 0 + object-fit cover) contra manual §10.3 l.513-515 y §07b l.326-327

**Qué:** Las imágenes de los post-campo y de la story se recortan para llenar la caja que queda libre. El manual pide que cada pieza vaya en su proporción y sin recorte. En Desarrollo, el notebook y el teléfono del mockup quedan cortados por abajo.

**Evidencia:** Proporción natural contra proporción mostrada: mock-combeau-modelo-ancho 1,33 (4:3) → 2,33 (936×402); escritorio 2,39 → 2,01 (936×466); hilos 1,67 → 1,77; en story-portada, domino 1:1 → 3,12 (936×300). Captura: salida/post-campo-desarrollo.jpg, donde la base de los dos dispositivos queda fuera.

**Arreglo propuesto:** Dar a cada pieza su aspect-ratio natural y dejar que el resto del alto sea lienzo de campo (como .d-fila--hero en el sitio), o escribir en §10.3 una excepción para el móvil, que es lo que hace el sitio a 390 con sus campos (driftime.css:205), y declararla.

## 6. [menor] post-campo-alcance.html y post-campo-visibilidad.html (línea .precio) contra manual §10.8 l.617 («umbral de entrada de un servicio») y oferta-v3.json

**Qué:** Un único «Desde» va bajo dos servicios, pero el umbral es solo de uno de ellos, y el lector entiende que vale para los dos. El sitio muestra el precio de cada servicio en su propia pestaña.

**Evidencia:** Alcance: bajo «Gestión de redes sociales · Paid Media (Google)» dice «Desde $350.000/mes + IVA», pero $350.000/mes es Paid Media y redes parte en $390.000/mes. Visibilidad: bajo «Visibilidad en IA · Auditoría SEO técnica» dice «Desde $400.000 + IVA», pero la auditoría parte en $490.000. Las cifras son exactas a oferta-v3.json; lo que falla es a qué servicio se atribuyen.

**Arreglo propuesto:** Nombrar el servicio al que pertenece el umbral, o dejar en la pieza solo el servicio cuyo precio se muestra.

## 7. [menor] carrusel-3-dato.html:13 («El chequeo que más pesa es declarar tu negocio como entidad.»)

**Qué:** La lámina afirma que ese chequeo es el único que más pesa, y en la tabla de la metodología empata. El kit copia una frase del artículo que contradice la tabla del propio artículo, y en una lámina de dato eso es una afirmación falsa.

**Evidencia:** src/data/blog-v3/21-chequeos-visibilidad-ia.html: en la tabla, «El servidor no expulsa a los robots de IA» pesa 8 y «Tu negocio está declarado como entidad» también pesa 8. Ningún otro chequeo pesa más de 8.

**Arreglo propuesto:** Reescribir como «Uno de los dos chequeos que más pesan (8 de 100)…». Aparte, avisar al dueño del blog: el artículo tiene la misma inconsistencia.

## 8. [menor] carrusel-4-interior.html:15 (paso 3)

**Qué:** La reescritura se contradice: «Y escribe títulos que sean preguntas. Once puntos, sin escribir nada nuevo.» En el artículo, «sin escribir nada nuevo» se refiere a convertir contenido existente en citable. Al cortar la frase se perdió esa idea, y leída en voz alta suena incoherente.

**Evidencia:** Artículo: «Marca tus preguntas frecuentes y escribe títulos que sean preguntas. Once puntos entre los dos, y es el trabajo que convierte contenido existente en contenido citable, sin escribir nada nuevo.»

**Arreglo propuesto:** Por ejemplo: «Y reescribe tus títulos como preguntas. Once puntos, con el contenido que ya tienes.»

## 9. [menor] manual §07b l.373-384 contra README «Cómo se edita» 4 y tabla de Mediciones; salida/post-campo-desarrollo.jpg y post-obra.jpg

**Qué:** Hay dos criterios distintos de «oro en una foto». El manual usa el tono (38-54°) y da domino-curva.jpg en 0 %. El README usa ±40 en cada canal, exige 0 fuera del punto y por ese criterio descarta domino-curva, pero exime a post-obra. Además, la tabla del README informa los valores del PNG y manda a subir el JPG.

**Evidencia:** Medido: domino-curva.jpg da 0,615 % a ±40 y 0,000 % por tono; es la luz naranja del borde izquierdo, mediana (203,128,69), y no es oro visible (qa/capturas/domino-curva-mascara.png). post-obra.jpg tiene 41 px a ±40 fuera del punto, en x 702-725 e y 944-950, de tono ~22°. post-campo-desarrollo.jpg tiene 64 px a ±40 fuera del punto (bordes de letra blanca sobre brasa, mediana 228,124,77) y el README dice 0. Por tono, todas dan 0 fuera del punto.

**Arreglo propuesto:** Fijar un solo criterio en el manual y en medir.py (el de tono describe mejor lo que se ve), corregir el paso 4 del README y medir la tabla sobre el .jpg que se sube.

## 10. [menor] instagram-v3/README.md («Decisiones abiertas» 1 y 2, regla de Raigal, tabla de tipos)

**Qué:** El README contradice al manual v3.0 en varios puntos. Cita al manual v2.0 («el punto no cambia nunca de color»), cuando la v3.0 ya resolvió el punto sobre brasa y petróleo. Da el precio como decisión abierta, mientras el manual lo escribe como regla (10.8, sin precio en 10.11). Permite Raigal en una portada si el rótulo se lee en la grilla, cuando el manual lo prohíbe en portada y en pieza única (l.579, l.641). Y describe post-foto como «una frase sobre una foto».

**Evidencia:** README: «El manual v2.0 dice que el punto «no cambia nunca de color»»; «El precio en las piezas… La alternativa es ninguno»; «si no se lee, Raigal va en una lámina interior». Manual l.579: «Raigal, con su rótulo, solo aquí»; l.641: «Raigal sin su rótulo, en una portada o en una pieza única».

**Arreglo propuesto:** Alinear el README con el manual, que es la fuente de verdad, o subir al manual (10.11) lo que de verdad está abierto.

## 11. [menor] post-foto.html:15 y story-portada.html:15 (filter: saturate(0.65) sobre domino.jpg)

**Qué:** Se le baja la saturación a una foto del pool para que pase la medición de oro. Es un tratamiento que el sitio no aplica a ninguna foto y que el manual no registra; el manual resuelve el oro de una foto recortándola o quitando el punto dorado de esa vista.

**Evidencia:** Computado: filter saturate(0.65) en los dos img. Por tono, domino.jpg original da 0,006 %, y el manual §07b la da como 0 %.

**Arreglo propuesto:** Quitar el filtro y medir con el criterio único del defecto 9. Si de verdad hace falta, escribir el tratamiento en §07b con su regla.

## 12. [menor] manual §10.6, §10.8 y «Lo que queda desactualizado» contra oficina/clientes/spindlelab.md:185-207 y 266

**Qué:** El manual no reconcilia tres reglas de Instagram que Ramón dejó vigentes el 1-sep: el gancho «Comenta CIRCUITO» con ManyChat conectado, «Stories sueltas: NO por ahora» (solo re-compartir el feed) y «fichas tipográficas planas solas ya no pasan / todo bajo el mundo del concepto». El kit trae una story diseñada y piezas solo tipográficas (post-titular y el carrusel), y el manual no dice si esas reglas se retiran.

**Evidencia:** clientes/spindlelab.md:185 («Instagram: gancho de comentarios… ManyChat»), :201 («ManyChat CONECTADO»), :206-207 (stories), :208-211 (fichas tipográficas), :266 («todo con gancho CIRCUITO»). El manual solo nombra esa ficha por el precio y el primer comentario (l.710).

**Arreglo propuesto:** Que Ramón decida si esas reglas siguen vigentes, y escribir el resultado en §10.8 y §10.11: el gancho CIRCUITO junto a «Enlace en la bio» y el estado de las stories y de las fichas solo tipográficas.

## 13. [menor] manual §10.9 (Exportar y verificar) y kit (alt="" en todas las img)

**Qué:** El manual de Instagram no pide texto alternativo, aunque el sitio tiene la regla «una imagen, un alt que describe lo mismo» e Instagram permite escribir el alt de cada publicación.

**Evidencia:** §10.9, pasos 1 a 5: no hay ningún paso de alt. Todas las img del kit tienen alt="" (el PNG no lo hereda, así que tiene que escribirse en la app).

**Arreglo propuesto:** Agregar un paso 6: el alt de cada lámina se escribe en «Configuración avanzada» al publicar y describe lo que se ve, con el mismo criterio del sitio.

## Lo que está bien

- Los capítulos §01 a §09 del manual coinciden con el sitio medido. Lo verifiqué con el código del sitio, un barrido de 14 rutas /v3/ a 1440 y 390 y el cálculo de contrastes. Los hex coinciden con driftime.css:18-30. Los contrastes recalculados dan exacto: gris 8,31, campos 4,70/12,56/5,03/13,40, oro 1,94/2,26/6,02/6,24/8,68, gris-2 4,12 y texto al 72 % 3,05/3,40. La escala a 1440/390 coincide (display 120/39, h1 60/36, h2 30/22, h3 24/20, cuerpo 18/17, ojillo 20/16, rótulo 13). El wordmark del módulo mide 97,5/87,8 y el gigante 284,5/73,2. En todo el render hay solo radios de 6 y 4, ningún tracking positivo, mayúsculas 5 en la home y 0 en las otras 13 rutas, 0 video, 0 data-entra y ningún Inter. Los campos ocupan 48,1 % de la home y 45,0 % de servicios, y la etiqueta mide 28 px de alto. El manual además corrige un error de su propia fuente: el gris da 8,31:1, no 6,9.
- Las fuentes de §10.1 están verificadas. La guía de anuncios de Meta pide 14/35/6 % en Reels y en Stories. Hopper HQ (18-sep-2026) da 270/670/65 px, la columna de íconos de ~230 px y el recorte de la grilla de 240 a 1680. 9to5Mac confirma el 3:4 desde el 29-may-2025. El 250/340 de stories lo corroboran varias guías; Moonb devuelve 403 desde aquí. El cambio del abajo del reel, de 340 a 672 px, está bien hecho y lleva su fuente.
- Los entregables son exactamente lo que generan los HTML actuales: mi render propio a 2x reducido con LANCZOS da diferencia 0 en las 15 piezas. Las fuentes que el navegador usó en cada nodo (CDP getPlatformFontsForNode) son solo Manrope (web) y Gabarito (web), esta solo en el wordmark; no aparece ninguna fuente de sistema y ninguna lámina desborda.
- Oro por tono: hay como máximo uno por lámina en todas las piezas y siempre es el punto del wordmark. Sobre brasa y petróleo el punto va en el color del texto, y las láminas interiores tienen 0. Las imágenes son copias byte a byte del pool del sitio (hilos.jpg es la versión recortada) y no hay ninguna de la lista negra ni de Unsplash.
- El display solo aparece en las portadas, con 24 y 28 caracteres en los titulares y una palabra en los campos, en peso 800 y sin tracking positivo; las interiores tienen 0 mayúsculas. No hay botones falsos ni píldoras: los únicos radios son 16,6 y 11,1, y el vidrio solo está en la etiqueta de pieza.
- Todo el texto pasa AA de contraste. El mínimo es 4,70 sobre brasa; la etiqueta da 6,84 y el texto sobre foto 16,91. La letra más chica es de 33 px, que se ve como 11,9 px a 390 (la etiqueta, igual que en el sitio). Reduje cada PNG a 390 de ancho, lo miré y todo se lee (qa/capturas/h390-*.png).
- Todo lo esencial cae dentro del recorte 3:4: el texto va de x 72 a 1008, dentro de 34-1046. En la story, el texto va de y 282 a 1194, dentro de 250-1580 y de la banda del reel 270-1248, y termina en x ≤ 951, lejos de la columna de íconos. Queda libre la franja del sticker.
- Verdad del contenido. Las cifras del carrusel cuadran con el artículo: bloques 30/40/30, chequeos 5/8/8, 6+8+5+6 = 25 y 6+5 = 11. Los precios son exactos a oferta-v3.json, los rótulos de obra son los de obra-v3.json, Raigal no aparece y no hay ninguna cifra, logo ni testimonio inventado. Tampoco hay «acá», voseo ni raya, y se mantiene el tú y el plural de marca.
- La grilla a 390 de ancho se lee como el sitio y no como una plantilla de Canva: lienzo negro, cuatro campos en rombo y el display que trabaja en la miniatura (qa/capturas/grilla-390.png). Lo que más huele a plantilla es post-foto (defecto 3) y el wordmark en las 9 miniaturas, que viene de la decisión 4 y que el README ya avisa.
- Anti-slop: no hay indigo, tarjetas, emoji ni franja lateral. El fondo oscuro está justificado por la aprobación del 27-sep. El tricolon «Leerte, entenderte y citarte» es contenido real (los tres bloques). En las pruebas de fuego, con el logo tapado se reconoce igual por los campos, el display y la obra real; con el rubro cambiado, la plantilla post-campo calzaría con otro rubro, porque es un kit y lo específico es el contenido; leído en voz alta suena a persona, salvo el paso 3 del carrusel-4.
- Los archivos de esta revisión están en /tmp/claude-0/-home-user-spindlelab/756adde7-3da1-5186-9935-cf74aeaa7043/scratchpad/manual-v3/qa/: analisis.txt (mediciones por pieza), manual-vs-kit.tsv, sitio.json (barrido del sitio), capturas/ y render/. No edité nada en el repo ni corrí git.