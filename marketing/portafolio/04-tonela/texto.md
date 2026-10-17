# 04 · Tonela · texto de interfaz (Clara)

Pase sobre el sitio construido el 17-oct-2026 (home e «Inspección y certificación»). Lo que queda aquí es el texto que
vale; si el HTML y este archivo no coinciden, se corrige el HTML. Registro: **tú** en toda la página, plural de marca
para lo que la empresa hace («te preguntamos», «examinamos»), castellano de Chile. Cada afirmación técnica sale de la
tabla de hechos de `ficha.md` (verificada por Simón, ver abajo); lo que no está ahí, no se dice. Revisión humana antes
de mostrarse: Ramón.

**La voz.** Tonela no tiene corpus porque no existe. Se calibró con cómo habla el que compra (un jefe de mantención o
un prevencionista): frases cortas, verbos de oficio (izar, amarrar, dar de baja), cero adjetivos de catálogo. Si una
frase no la diría un supervisor en la charla de cinco minutos antes del turno, se reescribió.

---

## 0 · Lo que se repite en las dos páginas

| Slot | Texto | Trabajo |
|---|---|---|
| Rótulo fijo (arriba a la derecha en escritorio, abajo en el celular) | **CONCEPTO** · De SpindleLab. Tonela no existe y nada de esto ocurrió. | Que una captura de cualquier pantalla diga lo que es |
| Navegación | Tabla de carga · Catálogo · Inspección · Preguntas · Cotizar | Nombres de lo que hay, no de departamentos |
| Atajo del encabezado en el celular | Tabla de carga | Lo que más se busca en este rubro |
| Pie, dirección | Bodega en Antofagasta: ficticia. Teléfono y correo: ficticios. | Ningún dato que pueda ser de alguien |
| Pie, ficción | **Tonela es un concepto de SpindleLab (2026).** La empresa no existe: no tiene clientes, faenas ni certificaciones. El sitio muestra oficio de identidad, contenido y datos estructurados. | La ficción dicha completa |
| Pie, fuentes (home) | De dónde salen las cifras: código de color (CERTEX, Mennens), factores de modo (Hoffmann, LEEA), consultadas el 16-oct-2026 | Que cada número tenga dueño |

## 1 · Home

### 1.1 · Primera pantalla

**H1:** Cada color levanta un peso. El amarre decide cuánto.

| Candidato | Por qué no |
|---|---|
| Eslingas, estrobos, cadenas y grilletes para el norte | Es el rótulo de un galpón: dice qué hay, no por qué comprarle a este |
| La tabla de carga que tu proveedor no te da | Contra un tercero; suena a aviso y promete algo que la tabla misma ya muestra abajo |
| **Cada color levanta un peso. El amarre decide cuánto.** | **Elegido.** Pasa el test de intercambio (no sirve para ningún otro rubro), dice la idea de la marca (el color es la capacidad) y abre la pregunta que contesta la tabla |

**Rótulo:** Izaje · Antofagasta (ficticio)

**Bajada:** Eslingas de poliéster, estrobos, cadenas y grilletes para faenas, puertos y obras del norte, con taller de
inspección. Antes de venderte una eslinga te preguntamos cómo vas a izar.

**CTA principal:** Calcular en la tabla de carga → baja a la tabla (y entonces eliges el amarre y lees tu capacidad).
**Enlace secundario:** Qué revisamos en una eslinga → abre la interior.

**Descripción de las bandas** (para lector de pantalla): Ocho eslingas colgadas de una barra, de la más liviana a la
más pesada: violeta 1 t, verde 2 t, amarilla 3 t, gris 4 t, roja 5 t, café 6 t, azul 8 t y naranja 10 t.

### 1.2 · La tabla de carga

- Rótulo: La tabla de carga
- H2: Cuánto levanta cada color, según cómo amarres
- Bajada: Elige el modo de amarre y cada fila muestra su capacidad. El color de la eslinga dice cuánto levanta en tiro
  directo; el amarre la sube o la baja.
- Modos: Directo (factor 1) · Ahorcado (factor 0,8) · Canasto paralelo (hasta 7° · factor 2) · Canasto 7° a 45°
  (factor 1,4) · Canasto 45° a 60° (factor 1)
- Aviso, siempre visible bajo la tabla: **Tabla referencial.** Factores de modo de la EN 1492-1 para eslingas de
  poliéster, tal como los publican los fabricantes. La capacidad que manda es la de la etiqueta de tu eslinga, y el
  plan de izaje lo firma una persona calificada en la faena. Desde naranja, la fila vale para 10 t; las de más
  capacidad se calculan con su etiqueta.

**El ángulo** (el control que acompaña a la tabla)

- Rótulo: El ángulo baja la capacidad
- Lectura (cambia con el control): «2,8 t» / «La verde de 2 t en canasto a 30°: factor 1,4.»
- Sobre 60°: «No se iza» / «Sobre 60° la tabla termina: ningún factor vale ahí.» En el dibujo: SOBRE 60°, NO SE IZA.
- Label del control: Ángulo de cada ramal con la vertical
- Selector: Eslinga (1 a 10, cada botón con su nombre para lector de pantalla: «Violeta, 1 t»)

### 1.3 · Catálogo

- Rótulo: Catálogo
- H2: Lo que vendemos, ordenado por lo que levanta
- Bajada: Eslingas de poliéster, planas o redondas, con su etiqueta azul cosida. Sin precios en el sitio: dependen del
  largo y de la cantidad, y antes de cotizar preguntamos cómo vas a izar.
- Enlace: Cotizar con tu maniobra → contacto
- Cada fila: «Eslinga violeta» / «1 t en tiro directo» / «Plana o redonda · largo a pedido» (la naranja: «10 t o más
  en tiro directo»)
- Sin color, a propósito:
  - **Estrobos de cable.** Se piden por la carga que marca su placa. No usan el código de color de las eslingas
    textiles, y no se lo ponemos.
  - **Cadenas.** Su capacidad va marcada en la placa del ramal. Tienen su propia norma, sus propios criterios de
    descarte y ningún color que leer.
  - **Grilletes.** La carga de trabajo viene estampada en el cuerpo. Se eligen por esa cifra y por el pasador, no por
    color.

### 1.4 · Inspección (bloque en la home)

- Rótulo: Taller de inspección
- H2: Una eslinga se revisa antes de cada uso y, al menos una vez al año, a fondo
- Cuerpo: La primera revisión es tuya, a la vista y antes de izar. La segunda la hace una persona competente, que fija
  el período según el uso y el ambiente, y deja registro. Esa la hacemos en el taller: cada eslinga sale con su
  registro, apta o dada de baja, nunca «más o menos».
- Enlace: Qué revisamos y cuándo se da de baja → interior
- El registro (plantilla vacía): «Plantilla · sin datos» / «Registro de inspección de eslinga textil». Campos sin
  llenar dicen «sin llenar», «ficticio» o «la de la etiqueta»: ningún número de serie ni fecha que parezca real.

### 1.5 · Lo que no hacemos (sobre tinta)

- H2: Cinco cosas que no vas a conseguir aquí
1. Venderte una eslinga sin saber cómo vas a izar. / Preguntamos el peso, el amarre y el ángulo. Si no lo sabes, te
   ayudamos a averiguarlo antes de cotizar.
2. Firmar tu plan de izaje. / Lo firma una persona calificada en tu faena. La tabla de este sitio es una referencia, no
   un plan.
3. Ponerle color a un estrobo, una cadena o un grillete. / El código de color es de las eslingas textiles. Extenderlo a
   otros elementos confunde justo donde no hay que confundirse.
4. Devolver al servicio una eslinga cortada. / Si cumple un criterio de descarte, se da de baja y te lo decimos por
   escrito.
5. Venderte eslingas para izar personas. / La norma de las eslingas textiles no cubre ese uso.

### 1.6 · Preguntas largas (en texto, sin acordeón)

Las cinco son las que el comprador le hace hoy a una IA o a un PDF en inglés. Mismo texto en el `FAQPage`.

1. ¿Qué eslinga uso para levantar 3 toneladas en canasto?
2. ¿Cada cuánto hay que inspeccionar una eslinga?
3. ¿Cuándo se da de baja una eslinga?
4. ¿Qué significa el color de una eslinga?
5. ¿Por qué el ahorcado levanta menos que el tiro directo?

(Respuestas en `sitio/index.html`, sección `#preguntas`; cada cifra es un producto de la tabla.)

### 1.7 · Contacto (tres campos)

- H2: Cuéntanos qué vas a levantar
- Bajada: Con tres datos te decimos qué eslinga y qué amarre corresponden, o que lo tuyo necesita otra cosa.
- Campos y ayudas:
  - Qué vas a levantar · «Un motor, una bobina, una viga, un contenedor.»
  - Cuánto pesa, en toneladas · «Si no lo sabes exacto, el de la placa o la guía de despacho.»
  - En qué faena, puerto u obra · «La comuna o el recinto basta.»
- Botón: Pedir la recomendación de amarre (…y entonces te contestan qué eslinga y qué amarre)
- Junto al botón: Este formulario es parte del concepto y no envía nada.
- Error del peso: Escribe el peso en toneladas. Si no lo sabes, el de la placa o la guía sirve.
- Al enviar: No se envió nada: Tonela es un concepto. En un sitio real, aquí te diríamos quién te responde y cuándo.

## 2 · Interior: Inspección y certificación

- Miga: Tonela / Inspección y certificación
- H1: Qué revisamos en una eslinga y cuándo se da de baja
- Bajada: En el taller examinamos eslingas de poliéster, planas y redondas, con los criterios de la norma y del
  fabricante, y cada una sale con su registro. Esta página cuenta qué miramos, para que puedas revisarlas tú antes de
  cada uso.
- Al margen: Criterios: EN 1492-1 (planas) y EN 1492-2 (redondas), y lo que publica cada fabricante. Estrobos, cadenas
  y grilletes se revisan contra sus propias normas y no están en esta página.
- La cinta en revisión (dibujo bajo la portada, decorativo): la ficha cosida dice «Revisión anual · Apta · Se da de
  baja», con las dos casillas vacías. Sin resultado marcado: es una plantilla.
- **Cuándo** · H2: Tres revisiones, y solo una es del taller. Antes de cada uso (quien la usa) · Durante el trabajo
  (quien la usa) · Al menos una vez al año (una persona competente, el taller).
- **Qué se revisa** · H2: Seis lugares donde una eslinga avisa. La etiqueta · La cinta · Los bordes · Las costuras ·
  Los ojales · Los herrajes, si tiene.
- **Cuándo se da de baja** · H2: Ocho señales para sacarla de servicio. Bajada: Dibujadas sobre una cinta sin color:
  estos criterios valen igual para las ocho capacidades. Cierre: **Y ante cualquier duda, también.**
- **El registro** · H2: Cada eslinga sale con su hoja. Tres puntos: apta o dada de baja (no hay un tercer resultado);
  la próxima revisión a más tardar en un año; la que se da de baja se corta para que nadie la use por error (práctica
  de la empresa ficticia, no cita de norma).
- **Dos límites** · H2: Lo que la eslinga no aguanta. −40 °C a 100 °C · 60°.
- **Fuentes** · H2: De dónde sale cada criterio. Nota: la EN 1492-1 es de pago; se cita su ficha oficial y lo que
  publican fabricantes que fabrican bajo ella.
- Cierre: H2 «Manda tus eslingas a la revisión anual» · botón «Cotizar la revisión» → contacto de la home.

## 3 · Qué se borró o se cambió en este pase, y por qué

| Antes | Después | Por qué |
|---|---|---|
| «La cinta se pone dura y brillante, como vitrificada. Pasa cerca de una soldadura aunque no se vea quemada.» | «La fibra toma un aspecto vidrioso y, en casos extremos, se funde. Es señal de que la cinta perdió resistencia.» | Simón: la soldadura era un ejemplo inventado; la fuente dice «aspecto vidrioso» y «fibras fundidas» |
| «Si estuvo en contacto con un químico, va a revisión antes de volver a usarse.» | «…y la superficie se descascara. Si sospechas contacto con un químico, vale el último criterio: ante la duda, no se usa.» | La regla nueva no estaba en la fuente; la de la duda, sí |
| «…zonas duras, brillantes o blandas, manchas que no salen.» | «…zonas vidriosas por calor o por roce, y zonas blandas por un químico.» | «Manchas que no salen» no es un criterio de descarte publicado |
| «Un hilo cortado o suelto en esa zona es motivo de baja.» | «Una costura dañada o cortada en esa zona es motivo de baja.» | Se dice como lo dice la fuente |
| «El borde es lo primero que toca un canto vivo.» | «Un canto vivo con la eslinga en tensión la corta por el borde.» | La fuente dice «en tensión»; la primera versión era una suposición |
| Pie: «Una empresa que no existe, sin clientes, faenas ni certificaciones. Lo que muestra el sitio es oficio: identidad, contenido y datos estructurados.» | «La empresa no existe: no tiene clientes, faenas ni certificaciones. El sitio muestra oficio de identidad, contenido y datos estructurados.» | Dos series de tres seguidas; quedan las dos porque son inventario, no ritmo, pero sin el «Lo que muestra… es» de folleto |

**Detector A1 a A10, corrido sobre las dos páginas:** sin verbos de folleto, sin apertura de relleno, sin «no solo X
sino Y», sin Title Case, sin raya (ni de remate ni de aclaración), registro tú en todo, castellano de acá, sin prueba
social. Preguntas: solo las del bloque de preguntas largas, que son reales. Series de tres: «faenas, puertos y obras»
(lugares distintos) y la del pie (lo que la empresa no tiene); ninguna es ritmo.

**Lo que no se escribió y por qué:** no hay 404 (el concepto tiene dos páginas y no se publica); no hay «nosotros» ni
equipo (no hay personas que nombrar y una cara se leería como alguien real).

## 4 · Afirmaciones por verificar (todas cerradas)

Cada número y cada criterio de este texto está en la tabla de hechos de `ficha.md`, con fuente. **Simón los volvió a
consultar el 17-oct-2026 entre las 02:10 y las 02:20 UTC** (ver `ficha.md`, «Verificación de Simón»). Ninguna cifra
de resultado, precio, plazo, cliente, faena o certificador.
