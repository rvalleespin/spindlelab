# 05 · Ocelo · texto de interfaz (Clara)

Escrito antes de construir, para la home y la interior «La evaluación». Registro: **tú** en toda la página, plural
de marca para lo que la clínica hace («te medimos»), castellano de Chile. Cada afirmación clínica sale de la tabla 4
de `ficha.md`; lo que no está ahí, no se dice. Revisión humana antes de mostrarse: Ramón.

---

## 0 · Lo que no cambia en ninguna pantalla

| Slot | Texto | Trabajo |
|---|---|---|
| Rótulo fijo (franja superior, las dos páginas) | CONCEPTO DE SPINDLELAB · OCELO NO EXISTE | Que una captura de cualquier pantalla diga lo que es |
| Interruptor (apagado) | Encender la luz | Lo que pasa al tocarlo |
| Interruptor (encendido) | Apagar la luz | |
| Ayuda del interruptor (lector de pantalla) | La página parte a oscuras porque después de operarse la luz molesta unos días. Puedes encenderla. | El porqué de la sala oscura |
| Enlace a la interior | La evaluación | |
| CTA del encabezado | Pedir evaluación | Lleva al formulario |
| Pie | Ocelo · Providencia, Santiago. Dirección ficticia. | |
| Pie, aviso | Concepto de SpindleLab, 2026. Ocelo no existe y sus médicos tampoco. Nada de esta página es una indicación médica: si tienes una duda sobre tus ojos, pregúntale a un oftalmólogo. | La ficción dicha completa, y el límite sanitario |

## 1 · Home

### 1.1 · La carta (primera pantalla)

Cada fila de la carta es una palabra de cinco letras, como las filas de una carta de verdad, y lleva a su sección. Al
lado, en chico, lo que hay ahí.

| Fila (logMAR) | Palabra | Al lado | Destino |
|---|---|---|---|
| 1,0 | OCELO (el logotipo) | | |
| 0,9 | MEDIR | ¿Soy candidato? | #candidato |
| 0,8 | LÁSER | LASIK o PRK | #comparar |
| 0,7 | LENTE | Monofocal o multifocal | #comparar (segunda comparación) |
| 0,6 | NUNCA | Lo que no te vamos a prometer | #prometer |
| 0,5 | QUIÉN | Quiénes operarían | #quienes |
| 0,4 | DUDAS | Preguntas, en texto | #preguntas |
| 0,3 | PEDIR | Pedir una evaluación | #pedir |
| 0,2 | Concepto de SpindleLab: Ocelo no existe. | | (la fila más chica es la que se lee) |

**Junto a la carta:**

- Antetítulo (mono): CIRUGÍA REFRACTIVA Y DE CATARATAS · PROVIDENCIA
- **H1:** Antes de hablar de operar, te medimos los ojos.
- Bajada: Si dejar los lentes o sacarte una catarata te conviene lo decide un examen: el grosor y la forma de tu
  córnea, si tu graduación dejó de cambiar, tu edad y tu lágrima. A veces la respuesta es que no.
- CTA: Ver qué se mide en la evaluación → `la-evaluacion/`

**Descartes del H1:**
1. «¿Puedes dejar los lentes? Lo dice tu córnea, no un aviso.» Es una pregunta en el H1, y la respuesta («depende»)
   no es un dato. Fuera.
2. «Primero el examen. Después, si corresponde, la cirugía.» Bueno, pero sirve igual para una clínica de rodilla:
   no pasa el test de intercambio.
3. **Elegido:** «Antes de hablar de operar, te medimos los ojos.» Nombra el rubro (ojos, operar), contradice la
   promesa del rubro («chao lentes») y dice qué hace la clínica primero.

### 1.2 · ¿Soy candidato? (#candidato)

- Rótulo (mono): MEDIR
- **H2:** ¿Soy candidato?
- Bajada: Lo deciden estas mediciones. Ninguna se ve en el espejo.

| Rótulo mono | Título | Texto |
|---|---|---|
| PAQUIMETRÍA | El grosor de tu córnea | El láser saca tejido de la córnea, así que tiene que quedar suficiente. Si es delgada, el LASIK puede quedar descartado y el PRK seguir en pie. |
| TOPOGRAFÍA | La forma de tu córnea | Un mapa de su superficie. Busca un queratocono, aunque sea inicial: con uno, no se opera la córnea. |
| REFRACCIÓN | Que tu graduación haya dejado de cambiar | Si tu receta cambió en el último año, todavía no es momento: operarías una graduación que se va a mover. |
| EDAD | Tu edad | Desde los 18 años, y mejor pasados los 21. Pasados los 40 llega la presbicia, y el láser que corrige la miopía no la corrige. |
| LÁGRIMA | Tu lágrima | Con ojo seco severo, la cirugía lo puede empeorar. Se mide antes, no después. |

- Aparte, para catarata: Si lo tuyo es catarata, la pregunta es otra. No hay una edad para operarla: se opera cuando
  ya te quita lo que necesitas hacer, como manejar de noche o leer.
- Enlace: Ver la evaluación completa, paso por paso → `la-evaluacion/`

### 1.3 · El comparador (#comparar)

- Rótulo: LÁSER · LENTE
- **H2:** ¿Más nítido en el rojo o en el verde?
- Bajada: En el examen, esa pregunta afina tu graduación: se miran letras negras sobre los dos colores y se compara.
  Acá la usamos igual, para comparar dos opciones lado a lado.
- Pestañas: «LASIK o PRK» · «Monofocal o multifocal»

**LASIK o PRK** (todo en 24 px o más: va sobre rojo y verde)

| Rojo: LASIK | Verde: PRK |
|---|---|
| Se levanta una lámina fina de la córnea, se corrige debajo y se vuelve a poner. | Se corrige en la superficie, sin lámina. |
| Pide una córnea con grosor suficiente. | Sirve cuando la córnea es delgada. |
| La vista se aclara más rápido. | La recuperación es más lenta y los primeros días molesta más. |

Pie: Ninguna es mejor en general. Te conviene la que tu córnea permite.

**Monofocal o multifocal** (lentes intraoculares, en la cirugía de catarata)

| Rojo: Monofocal | Verde: Multifocal |
|---|---|
| Enfoca a una sola distancia, casi siempre lejos. | Enfoca lejos y cerca a la vez. |
| Para leer vas a usar lentes. | Puede que uses menos lentes para leer. |
| Menos halos alrededor de las luces. | La mayoría ve un halo leve alrededor de las luces de noche. |

Pie: Si manejas mucho de noche, eso pesa. Lo conversamos con tu biometría en la mano.

### 1.4 · Lo que no te vamos a prometer (#prometer)

- Rótulo: NUNCA
- **H2:** Lo que no te vamos a prometer
- Bajada: El rubro vende un resultado. Preferimos decirte antes lo que ninguna cirugía garantiza.

| Promesa (tachada) | Lo que sí es cierto |
|---|---|
| Que vas a ver perfecto sin lentes. | Nadie lo puede garantizar antes de operar. Puede quedar una graduación pequeña, que se corrige con lentes o con un retoque. |
| Que nunca más vas a usar lentes. | Pasados los 40 llega la presbicia, operado o no. |
| Que de noche vas a ver igual que antes. | Pueden aparecer halos o destellos alrededor de las luces. A veces se van con el tiempo; a veces no. |
| Que tus ojos no se van a secar. | Casi todos tienen ojo seco después del LASIK. Suele pasar en un mes; en algunas personas dura más. |
| Que después de la catarata no vas a volver a ver borroso. | Años después, la cápsula que sostiene el lente se puede nublar. Se abre con un láser, en la consulta. |

### 1.5 · Quiénes (#quienes)

- Rótulo: QUIÉN
- **H2:** Quiénes operarían
- Bajada: Ocelo es un concepto y estas dos personas también. No ponemos foto ni número de registro: un número
  inventado podría ser el de alguien que existe.

| Nombre | Lo que hace | Nota |
|---|---|---|
| Leonor Ibarbia Saelzer | Cirugía refractiva: LASIK y PRK. | Persona ficticia. |
| Matías Cerdeña Olave | Cataratas y lentes intraoculares. | Persona ficticia. |

- Nota al pie: Revisamos los dos nombres en el Registro Nacional de Prestadores Individuales de la Superintendencia de
  Salud el 16 de octubre de 2026. Ninguno es el de un prestador registrado.
- En vez de foto: las iniciales dibujadas en la retícula de la carta (LI, MC). Alt: «Iniciales LI dibujadas en una
  retícula de cinco por cinco» / «Iniciales MC…».

### 1.6 · Preguntas (#preguntas)

- Rótulo: DUDAS
- **H2:** Preguntas, contestadas en texto
- Sin acordeón: todas abiertas, cada pregunta es un H3.

1. **¿Puedo operarme la miopía si tengo la córnea delgada?** Depende de cuán delgada sea y de cuánta graduación haya
   que corregir. El LASIK necesita más córnea que el PRK, porque hace una lámina; con una córnea delgada, el PRK a veces
   sigue siendo posible. Lo dice la paquimetría, no una regla general.
2. **¿LASIK o PRK: cuál es mejor?** Ninguno en general. Con el LASIK la vista se aclara más rápido; el PRK no hace
   lámina y por eso sirve en córneas más delgadas, a cambio de una recuperación más lenta y unos primeros días más
   molestos. Te conviene el que tu córnea permite.
3. **¿A qué edad se opera una catarata?** No hay una edad. Se opera cuando la catarata ya te impide hacer lo que
   necesitas, como manejar de noche o leer. Si los síntomas son leves, a veces basta con cambiar los lentes.
4. **¿Me voy a quedar sin lentes para siempre?** No te lo podemos asegurar. La cirugía puede bajar cuánto los usas,
   pero pasados los 40 casi todos necesitan lentes para leer, operados o no, y para manejar de noche a veces siguen
   haciendo falta.
5. **¿Cuánto cuesta?** No publicamos un precio porque depende de la evaluación: la técnica que corresponda, si se
   opera uno o los dos ojos y, en catarata, el lente que elijas. Te lo decimos por escrito después de medirte.
6. **¿Puedo ir manejando a la evaluación?** Mejor no. Para mirar el fondo del ojo te dilatamos la pupila, y la vista
   queda borrosa y sensible a la luz por unas horas.

### 1.7 · Pedir una evaluación (#pedir)

- Rótulo: PEDIR
- **H2:** Pedir una evaluación
- Bajada: Déjanos tu nombre y cómo contactarte. Te llamamos para darte hora y decirte qué hacer antes, por ejemplo,
  cuántos días dejar los lentes de contacto.
- **Lo que mueve el precio** (sin precios): la técnica que corresponda · si son uno o los dos ojos · en catarata, el
  lente que elijas.

| Slot | Texto |
|---|---|
| Label 1 | Tu nombre |
| Label 2 | Correo o teléfono |
| Ayuda 2 | Solo para darte hora. |
| Grupo | Qué te trae |
| Opciones | Quiero dejar los lentes · Tengo catarata · Todavía no sé |
| Botón | Pedir evaluación |
| Error 1 | Escribe tu nombre. |
| Error 2 | Escribe un correo o un teléfono para poder llamarte. |
| Aviso junto al botón | Es un concepto: este formulario no envía nada. |
| Confirmación | No se envió nada: Ocelo es un concepto de SpindleLab. Si esto fuera real, te llamaríamos para darte hora. |

## 2 · Interior: La evaluación

- Miga: Inicio / La evaluación
- Antetítulo (mono): LA EVALUACIÓN · ANTES DE CUALQUIER CIRUGÍA
- **H1:** La evaluación, paso por paso
- Bajada: Esto es lo que te medimos, qué decide cada medición y en qué orden. Puede que la conclusión sea no
  operarte. También es una respuesta.
- **Antes de venir** (caja): Deja de usar lentes de contacto el tiempo que te indiquemos al darte hora: depende del
  tipo de lente. Ven acompañado o sin manejar: te vamos a dilatar la pupila.

| Paso | H2 | Nombre técnico (mono) | Qué se hace | Qué decide |
|---|---|---|---|---|
| 1 | Conversar | ANTECEDENTES | Qué lentes usas, cuándo cambió tu receta por última vez, qué haces de noche y qué remedios tomas. | Qué mediciones pesan más en tu caso. |
| 2 | Tu graduación, con y sin gotas | REFRACCIÓN MANIFIESTA Y CICLOPLÉJICA | Te medimos con la carta, el foróptero y el test rojo y verde. Después se repite con gotas que relajan el enfoque, para que no se esconda una parte de la graduación. | Cuánto hay que corregir. |
| 3 | La forma de tu córnea | TOPOGRAFÍA Y TOMOGRAFÍA | Un mapa de la superficie de la córnea y de cómo cambia su espesor. | Si se puede operar la córnea. Con un queratocono, no. |
| 4 | El grosor de tu córnea | PAQUIMETRÍA | Cuánto mide de espesor, punto por punto. | LASIK, PRK o ninguno. |
| 5 | Tu lágrima | TIEMPO DE RUPTURA LAGRIMAL Y SCHIRMER | Cuánta lágrima haces y cuánto dura sobre el ojo. | Si hay que tratar el ojo seco antes, o si la cirugía lo empeoraría. |
| 6 | La presión y el fondo del ojo | TONOMETRÍA Y FONDO DE OJO DILATADO | Con la pupila dilatada miramos la retina y el nervio. La vista queda borrosa y sensible a la luz unas horas. | Si hay algo que tratar antes que la graduación. |
| 7 | Si es catarata: el largo de tu ojo | BIOMETRÍA | El largo del ojo y la curva de la córnea. | La potencia del lente que se te pondría. |
| 8 | La conversación final | CONCLUSIÓN | Con todo medido, te decimos qué técnica corresponde o que ninguna, y te lo dejamos por escrito junto con lo que no te podemos prometer. | Si operar, y cómo. |

- **El informe que te llevas** (H2): Una hoja con cada medición y su conclusión. Esta es la plantilla, sin datos de
  nadie.
  Campos: Refracción · Topografía · Paquimetría · Lágrima · Presión · Fondo de ojo · Biometría (si es catarata) ·
  Conclusión · Lo que no se puede prometer. Cada campo vacío dice «—».
- Cierre: CTA «Pedir una evaluación» → `../#pedir`; enlace «Volver a la carta» → `../`

## 3 · Metadatos

| Página | `<title>` | Descripción |
|---|---|---|
| Home | Ocelo · Cirugía refractiva y de cataratas (concepto) | Concepto de SpindleLab: un centro de cirugía refractiva y de cataratas que no existe, ordenado como el examen de la vista. |
| Interior | La evaluación, paso por paso · Ocelo (concepto) | Qué se mide antes de una cirugía refractiva o de catarata, qué decide cada medición y en qué orden. Concepto de SpindleLab. |

## 4 · Pasada de borrado (qué salió y por qué)

- «Tecnología de última generación», «equipo de especialistas», «años de experiencia»: no hay de dónde sacarlos y
  en un concepto serían prueba social inventada.
- El porcentaje de resultados de la AAO: es real, pero en la página de una clínica se lee como promesa.
- Un párrafo de apertura sobre «la importancia de la visión»: carraspeo (A2).
- «Rápida, segura y sin dolor»: tricolon y promesa a la vez (A3).
- La segunda línea de cada mitad del comparador, que repetía la primera con otras palabras.

## 5 · Afirmaciones por verificar antes de mostrarse

Todas las afirmaciones clínicas están en `ficha.md` §4 con su fuente. Los números del texto son: 18, 21 y 40 años,
el último año, un mes, y los valores logMAR. Nada más.
