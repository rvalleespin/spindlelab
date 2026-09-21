# ✅ PUBLICADO — Post personal (LinkedIn personal de Ramón)

**Publicado el dom 21-sep-2026**, no el miércoles 24 como estaba planificado: Ramón dio el
pase de tono y dijo de subirlo de inmediato. `urn:li:activity:7507936204286308353`, público,
con el primer comentario abajo, los dos firmados por él (no por la página).

**Ojo con la cadencia:** salió el mismo día que el post de la página (el lanzamiento, por la
mañana). Son dos piezas distintas y no se pisan en contenido, pero sí se juntan en el tiempo.
La próxima pieza del perfil personal no debería ser esta semana.

**Por qué existe:** el 21-sep salió por la **página** el lanzamiento de Verifica y Cumple
(`urn:li:activity:7507924615218823168`), en voz plural. El perfil personal no puede repetir
esa misma historia en singular. Este es el otro ángulo.

**Ángulo:** construí un chequeo que se niega a decir si alguien cumple, y esa misma regla me
deja a mí sin un punto que sé que merezco. Podría hacerme la excepción y no la hago.

## Cuerpo del post (copiar y pegar)

Soy fundador de SpindleLab y construí un chequeo que se niega a decirte si cumples.

Es para la Ley 21.719, la nueva ley de protección de datos, que entra en vigencia a fin de año. Mira un sitio y muestra qué señales están y cuáles faltan, con la instrucción para corregir cada una. Ahí se detiene.

Lo que quiere cualquiera que pregunta por esto es un sí o un no. Lo entiendo. Pero si le digo "cumples" a alguien que no cumple, el que queda expuesto a la multa es él y el que firmó esa frase soy yo.

Mi trabajo es decirle a alguien qué le falta en su propio sitio. Si afirmo más de lo que puedo probar, no me queda mucho más que ofrecerle.

Y hay cosas que no se ven desde afuera. Si un rastreador dispara antes o después de que el visitante dio permiso, por ejemplo: eso no está en el código que uno puede leer. Hay que abrir la página en un navegador y mirar el orden en que ocurren las cosas.

Podría levantar un navegador en cada consulta. Se demora, y aun así daría una sospecha y no una prueba. Lo dejé afuera, y escribí en el sitio una parte que dice qué no revisa.

Esa limitación me pegó a mí. Mi gestor de consentimiento es propio, y el chequeo reconoce por nombre los de proveedores conocidos. El mío no está en esa lista, así que no me da el punto. Lo verifiqué a mano, abriendo mi sitio en el navegador: el rastreador de Meta no se carga si nadie aceptó, y el de Google parte con el permiso denegado.

Agregar la excepción me toma nada. No la agregué. Si me hago una excepción a mí, el resultado de cualquier otro vale menos.

Un sello que diga "listo" se vende mejor que una lista de lo que decidí no mirar. Lo sé. Prefiero la lista.

Dejo el chequeo en el primer comentario, por si quieres ver qué te muestra del tuyo, y qué no.

## Primer comentario (copiar y pegar)

Acá está: https://verificaycumple.pages.dev
Escribes tu dominio y corre ahí mismo. Si te aparece algo raro y no cachas qué hacer, escríbeme y lo vemos.

---

## Verificación

### Voz y formato (contra `voz-spindlelab/corpus.md` §1 y la ficha de cliente)

- Registro **singular** en todo el cuerpo, texto puro, sin imagen. ✅
- Se presenta como fundador en la primera línea, como el post ancla del 1-sep. ✅
- **No** abre con "revisé el sitio de…" ni "le pregunté a ChatGPT…" (regla vetada). ✅
- Concede antes de contradecir ("Lo entiendo. Pero si le digo…"), el movimiento del corpus. ✅
- Dice la parte incómoda de verdad, y es verificable: su propio chequeo le quita un punto y
  él elige no arreglárselo. ✅
- Cierra bajo ("Prefiero la lista" / "por si quieres ver qué te muestra del tuyo, y qué no"). ✅
- Cero guiones largos, cero transiciones de relleno, cero plural del negocio, cero hashtags.
  Contado carácter por carácter, no a ojo. ✅
- **Cero cifras en el cuerpo**, salvo el nombre de la ley (ver nota de edición abajo). El
  formato de la cuenta personal las prohíbe porque "suenan robóticas". ✅
- Autoridad por capacidad y resultado. Cero contraste con agencias, cero competidores
  nombrados, cero "ellos". ✅
- Primer comentario: **dos líneas, un solo link**, sin hashtags, y no repite el post. ✅
- Largo: 339 palabras, en el rango del post ancla. ✅

### Hechos (cada afirmación, contra su fuente)

| Afirmación del post | Verificado contra |
|---|---|
| La Ley 21.719 entra en vigencia a fin de año | `brief.md` §2: vigencia plena 1-dic-2026, artículo primero transitorio |
| El chequeo describe señales y nunca certifica cumplimiento | `brief.md` §5 (guardrail) y la ficha de venta |
| Cada señal que no pasa trae la instrucción para corregirla | `brief.md` §5 |
| Decirle "cumples" a quien no cumple lo expone a él y a Ramón | ficha de venta, textual |
| Si un rastreador dispara antes o después del consentimiento no se ve en el HTML | `brief.md` §4.C: requiere renderizar en un navegador real |
| Levantar un navegador por consulta es lento y solo daría una heurística | `brief.md` §4.C, "conclusión de factibilidad" |
| El sitio declara explícitamente qué no revisa | verificado en el HTML desplegado: existe la sección "Lo que no revisa" |
| Su gestor de consentimiento es propio y el chequeo no le da el punto | **verificado en vivo el 21-sep** contra `/api/chequeo?dominio=spindlelab.cl`: puntaje 73, único ítem en rojo `cmp`, con el detalle "puede que uses uno propio no listado" |
| Meta no se carga sin consentimiento; Google parte en denegado | `brief.md` registro del 21-sep (commit `362b88f`): "Consent Mode v2 arranca en `denied`; Meta Pixel no se inicializa hasta que hay consentimiento". La distinción entre los dos está dicha con precisión, no en bloque |

**Sin alarmismo:** menciona la multa como consecuencia, nunca un monto ni un porcentaje.
El brief documenta por qué citar el techo de 20.000 UTM o el 4% sin su matiz es incorrecto
además de feo.

### Distinción frente al post de la página

Ninguno de los cinco puntos que ya salieron por la página aparece acá, ni reformulado: no
está el puntaje 36, no está el arco 36 → 73, no está el bug del botón "Enviando…", no está
"corrimos el chequeo sobre nuestro propio sitio", no está "si tienes un formulario de
contacto ya estás tratando datos personales". El post se sostiene solo para alguien que
nunca vio el de la página.

### Nota de edición (una sola, hecha a mano sobre la salida del proceso)

El texto generado decía "la nueva ley de protección de datos" sin nombrarla, por aplicar la
regla de "cero cifras" también al número de la ley. **Se restituyó "Ley 21.719"**: el número
de una ley es su nombre, no una métrica, y sin él el post pierde toda búsqueda de alguien
que esté justo buscando ese término en LinkedIn. Si Ramón prefiere la versión sin el número,
se borra "la Ley 21.719, " y la frase sigue funcionando.

### Cómo se eligió este ángulo

Se escribieron y juzgaron tres ángulos distintos (leer el texto oficial de la ley / no
certificar / el miedo como técnica de venta), cada uno con tres jueces independientes: voz,
distinción y verificación adversarial de hechos. Los otros dos se descartaron por una razón
concreta: **ambos viven de cifras**. El del miedo sacó las mejores notas, pero su columna
vertebral son cuatro cifras seguidas (montos, porcentajes, ventana de meses, artículos), y
sin ellas no existe. El de "leí la ley" tenía el mismo problema en chico, y además le
atribuía en público a terceros un error que ningún archivo documenta, que es exactamente el
pecado que el post denunciaba. Este ángulo aguanta sin una sola cifra.
