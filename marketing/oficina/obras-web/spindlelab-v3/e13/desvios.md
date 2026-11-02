# Desvíos y decisiones abiertas · obra E13 (el sitio nuevo sobre el modelo nuevo)

**26-oct-2026.** Esto es lo que Ramón necesita para cerrar la obra: qué le pido, con el valor que se usó mientras no respondía, y dónde el sitio construido se aparta de lo que decían el brief y la spec. El detalle por área está en `desvios/*.md` (seis archivos, uno por rol); aquí va solo lo que cambia una decisión.

## 1 · Lo que te pido, en orden de importancia

| # | Qué | Valor usado | Si dices otra cosa |
|---|---|---|---|
| 1 | **Mirar el sitio** (30 minutos; cómo: ver `lista-publicacion.md` o el mensaje de entrega) | Pendiente | Todo lo que no te guste sale como una lista corta y se corrige en una tarde |
| 2 | **Elegir el hero**: H-A (el botón «Pedir la revisión de una página» a la derecha, donde estaba el chequeo) o H-B (el botón bajo el texto, a la izquierda). Capturas: `capturas/hero-HA-1440.jpg`, `hero-HB-1440.jpg`, `hero-HA-390.jpg` | **H-A**. Con el aviso de cookies abierto el botón se ve en todos los tamaños; H-B deja 4 px de holgura a 1194 y 1024 | Cambiar a H-B es una hora de Diego y una vuelta de medición |
| 3 | Las **cuatro decisiones** del 26-oct: el look se conserva · raíz y no `/v3/` · casos: Combeau y Verifica y Cumple (salen Praxi y los cuatro conceptos) · informe mensual y sin promesa de monitoreo de menciones ni de puntaje a 3 meses | Los de la propuesta | Ver `brief-de-obra.md` §1, columna «Si dice otra cosa» |
| 4 | **Hechos tuyos que el sitio dice y nadie más puede confirmar** (están en tu voz o sobre tu trabajo) | Como estaban en el sitio que ya viste el 24-oct, salvo lo marcado | Cada uno es una frase |
| 5 | **Cuándo publicar** (decides tú y confirmas el merge en el mismo turno) | Propuesta de calendario en la entrega | |

### Los hechos de la fila 4

1. **Combeau.** Se nombra con su sitio, su panel y su book; el permiso es verbal (16-oct) y las fichas de la troncal dicen otra cosa. «Hoy lo opera él» **salió** de la home y del caso porque no hay registro de uso después del 23-sep: queda «hecho para que él lo opere» y «no tenemos un número ni una fecha de uso que mostrar». El caso conserva descripciones de cómo funciona («Él carga sus series solo, desde un panel», «entra con su cuenta de GitHub») que también están en presente: tampoco hay registro de uso. Si Bernardo publicó solo y lo puedes confirmar con evidencia, se vuelve a escribir.
2. **Verifica y Cumple.** La home dice que antes de publicarlo corriste el chequeo sobre tu propio sitio, que «salió mal» y que al arreglarlo encontraste un formulario que perdía mensajes. Confirma que se puede decir así (sin puntajes).
3. **Tu trayectoria** en «Quién está detrás» y Nosotros: «ocho marcas nacionales» (Universal McCann) y «cuatro países» (Graphene IPG). Están en el sitio vigente y en el CV cerrado, pero tu memoria dice que las cifras de agencias no van al texto de SpindleLab. «Más de cinco años» **salió** (la suma real es de 4 años y 9 meses).
4. **«Tomo pocos proyectos a la vez» y «reviso yo lo que te entrego»** (home y Nosotros): afirmaciones de capacidad. Una lectora en frío no creyó la primera («escasez planeada»).
5. **«Uso agentes de IA para el trabajo que se repite»**: los tres lectores en frío lo notaron y a uno le dio desconfianza («¿cuánto lo hizo un robot?»). Está solo en esas dos páginas.
6. **NDA**: «Podemos firmar uno si lo necesitas». No hay ninguno firmado: confirma que estás dispuesto.
7. **Los tres ejemplos de rubro** (consultora, clínica, restaurante) en «Para empresas que ya venden» son ejemplos de cliente ideal, no clientes atendidos.
8. **¿La conversación de 20 minutos y la propuesta son gratis?** El texto dice solo que el precio queda por escrito antes de empezar. Probablemente lo son: una frase tuya.
9. **La quinta pregunta frecuente** («¿Hay contrato de permanencia?») salió de las lecturas en frío, no de un prospecto real.

## 2 · Lo que el sitio ya no promete (y que revisó una persona independiente, fila por fila)

La revisión independiente del 23-oct listó 25 afirmaciones del v3 anterior que no se sostenían. La QA de la ronda 1 las comprobó una por una en el sitio construido: 16 cerradas, 6 cerradas de otra manera, 1 con un residuo, 1 abierta en un verbo (Combeau, ya corregida) y 1 abierta por decisión tuya (el permiso verbal). Cambios que se notan: «24 horas» pasó a «un día hábil»; «mini-diagnóstico» y «diagnóstico gratis» a «revisión»; sin monitoreo doble quincenal ni compromiso de puntaje; sin «aumentar tu probabilidad de cita»; sin partners, sin «más de cinco años», sin «es el mismo chequeo que le pasamos a cada sitio que construimos»; los dos artículos del blog que daban consejos opuestos sobre los robots de IA ahora dicen lo mismo.

## 3 · Decisiones de diseño y de operación que tomé por ti (y puedes revertir)

| Qué | Por qué | Revertir |
|---|---|---|
| El chequeo ya no está en la portada: es un enlace («Chequear mi sitio ahora, sin registro») | El brief pide una sola acción principal: pedir la revisión | Rehacer el hero: una vuelta |
| Encabezado **pegajoso** también en celular, con el botón «Pedir la revisión» siempre a la vista; «Contacto» sale del menú bajo 834 px (el botón lleva al mismo destino) | La revisión midió que el botón de contacto se perdía al bajar y no cabían seis ítems | Si lo prefieres no pegajoso, se pierde el botón siempre visible |
| El **pie** suma Chequeo gratis, Política de privacidad, LinkedIn e Instagram | El chequeo de Verifica y Cumple busca justo el enlace a la política, y un instrumento público se voltea contra quien lo publica | Sacar la fila |
| `/trabajo/combeau/` lleva pie como las demás páginas (antes no) | Sin pie no había control de cookies tras contestar el aviso | |
| **Seis rótulos mono** sobre los títulos de la home (El problema, Método SpindleLab…) no se pintan | Decisión de oficio: menos etiquetas sobre los títulos | Seis ids de texto y listo |
| La revisión de una página es **«un día hábil»**, no «24 horas» | La revisión de Eduardo tardó 31 horas | |
| `/privacidad/` y la página 404 **siguen con el diseño anterior** (cambian solo dos enlaces del menú) | No son parte de esta obra; la política tiene dos `h1` y dos grises bajo 4,5:1 que ya traía | Es otra obra pequeña |
| Los **nombres de plan** siguen en Title Case («Página de Campaña», «Sitio Esencial»…) | El brief congela los nombres y también pide cero Title Case: se contradice; ganó no tocar lo publicado | Cambiar el nombre obliga a cambiar los guardianes y los precios publicados |
| El blog: sin las cifras de terceros con nombre (Nitten, Maqui) y sin invitar a «medirnos con esta vara»; los **rangos de mercado** de «¿Cuánto cuesta el SEO técnico?» quedan como estimaciones (evidencia media) | Fuente circular | Quitar los rangos, dejando solo tus tres precios |
| Redes sociales pasa a **informe mensual** (el sitio vigente decía quincenal) | Una sola cadencia en todas partes | Seis frases |
| «Línea base de presencia en IA» queda **una sola vez**, como parte de la auditoría de pago de Visibilidad en IA | Es un trabajo manual tuyo; `capacidad-servicios.md` lo marca como no escalable más allá de 1 o 2 clientes | Reescribir dos planes y el título |

## 4 · Desvíos de la spec y del brief (con quién los declaró)

- **Spec de la home:** `.portada-v__medio` con `max-height: 28svh` solo en pantallas bajas (con la condición de alto, no solo de ancho); la hora del encabezado se oculta solo ahí y no en el pie; áreas de toque de 44 px en los enlaces de texto de las filas; relleno del pie para que no quede bajo el aviso de cookies; sin línea de marca ni © en el pie; la fila de Verifica y Cumple lleva su aviso («No es asesoría legal ni certifica que cumples») bajo el enlace. `desvios/home-construccion.md`.
- **Spec E12 (`spec-visual.md`) §2:** el caso de Combeau llevaba «Siguiente» y no tenía pie; sin «Siguiente» (hay un solo caso) y con pie. `desvios/trabajo.md`.
- **Muro de `/trabajo/`:** las dos portadas (Combeau y Verifica y Cumple) en la misma proporción 5:3; el filtro Cliente/Propio/Concepto **salió** (con dos entradas no filtra nada). `desvios/trabajo.md`.
- **Brief §7.8 (peso):** primera carga de la home 1.398 kB; recorrida entera 1.561 kB (el criterio quedó aclarado en el historial del brief: primera carga ≤ 1,5 MB y recorrida ≤ 1,6 MB).
- **Brief §7.4 (lectura en frío):** los tres lectores entienden qué hace la empresa, para quién y el primer paso; en la ronda 1 tropezaron con términos sin explicar y se reescribieron (la segunda lectura está en el acta).
- **Campo opcional «¿Cuántas personas son en la empresa?»** en el formulario: **no se agregó** (tocaría los campos protegidos del formulario). Es decisión 9 de `copy-secciones-v1.2.md`.
- **Brief §7.12 (sitemap):** el sitemap suma dos URL, no una: `/trabajo/` y `/trabajo/combeau/` (22 en total: las 20 vivas de `main` más esas dos). Lo dice `lista-publicacion.md`.
- **Imágenes al compartir:** las 22 rutas llevan una imagen propia con su titular (`og-e12-<ruta>.jpg`, versión `?v=2`; `?v=3` en las tres que se regeneraron después de la segunda QA). La del sitio anterior (`og-posicionamiento.jpg`) queda solo como valor por defecto del `Layout`.
- **Conversión a raíz antes de la QA:** el script `herramientas/convertir-a-raiz.mjs` reescribió las rutas de todo el sitio y dejó las copias de texto distintas de sus fuentes (defecto 2 de la QA); se corrigió con `herramientas/prefijo-fuentes.mjs` y la huella quedó en 16 de 16 «igual».

## 5 · Lo que quedó sin corregir (menores de la QA, anotados)

7 (el texto de la columna izquierda queda a 8 a 13 px de la columna de contenido a ≥ 1194 px en seis páginas: viene de la spec aprobada), 12 (Title Case de planes, ver arriba), 14 (el chequeo propio da 94: falta un tercer perfil externo real en `sameAs`, hoy hay dos), 16 (dos hojas de fuentes sin uso en cada página: Inter y Manrope; quitarlas puede cambiar la letra del aviso de cookies), 17 (la tabla de los 21 chequeos a 390 px no muestra que se desliza) y el plural de marca frente a «SpindleLab soy yo» (los tres lectores lo notaron).

## 5 bis · Resultado de las dos QA (Javiera, contexto limpio, `acta-qa.md`)

- **Ronda 1:** Aprobado con reparos. 0 bloqueantes, 6 mayores, 12 menores. De 25 afirmaciones del v3 anterior que no se sostenían: 16 cerradas, 6 cerradas de otra manera, 1 con residuo, 1 abierta en un verbo (corregida) y 1 por decisión tuya.
- **Ronda 2:** Aprobado con reparos. De los 6 mayores, 5 cerrados y 1 que mejoró y no se cierra (la lectura en frío). **0 bloqueantes**. Un mayor nuevo (tres imágenes al compartir con las frases anteriores horneadas) que se corrigió después (`?v=3`). Regresión completa sin fallas: 17 de 17 criterios de la spec, precios idénticos a `main`, formulario y archivos protegidos sin cambios, atribución UTM 12 de 12 recorridos, chequeo propio 94.
- **Lectura en frío (criterio 4 del brief): no se cumple entero.** Tres lectores simulados sin contexto entienden qué hace SpindleLab, para quién y el primer paso (gratis, un día hábil). De los seis tropiezos de la primera lectura, cuatro desaparecieron («si Google y las IA pueden leerlo», «21 señales», «sin plantillas ni WordPress» y los dos precios para lo mismo). **Siguen dos, y no son de redacción:**
  - **«Paid Media (Google)»** (2 de 3): piden «Google Ads». El nombre del servicio está congelado por el brief. **Decisión tuya:** renombrarlo («Google Ads») o aceptar el tropiezo.
  - **«Visibilidad en IA»** (3 de 3 dudan): lo entienden, pero la frase honesta «no garantiza que te nombren» les suena a razón para no comprar. **Decisión tuya:** qué se vende en ese servicio y cómo se justifican los $400.000 sin prometer menciones.
  - **Tres frenos que aparecen en los tres lectores y que ningún texto arregla:** un solo caso, y de un fotógrafo («no de crecimiento de ventas»); el sitio parte por el sitio cuando su problema está en el seguimiento de consultas; y «SpindleLab soy yo» frente al plural del resto del sitio.
  - Javiera propone acotar el criterio 4 a la home y `/contacto/` (los primeros cinco minutos). No se cambió el criterio: queda dicho aquí.

## 6 · Fuera de esta obra, para la troncal

- **Los correos de outbound** dicen «diagnóstico gratis» y «24 horas». El sitio ya dice «revisión» y «un día hábil»: hay que alinear las plantillas o el prospecto ve dos nombres para lo mismo.
- **`ventas/pipeline.md` y `proyectos-en-curso.md`:** nadie los tocó.
- **`capacidad-servicios.md`:** si se decide prometer monitoreo de menciones o un puntaje a 3 meses, primero hay que escribir la capacidad real ahí.
