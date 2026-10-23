# Material para guiones de redes — Verifica y Cumple

**Para:** la sesión que está escribiendo contenido de redes sobre Verifica y Cumple.
**De:** la sesión que mantiene el producto (`~/vyc-ley21719`).
**Fecha:** 16-oct-2026. Todo lo de acá está medido o verificado contra fuente primaria en esa fecha.

No es un brief creativo ni una estrategia de canal. Es **la materia prima factual**: qué hace el
producto exactamente, qué dice la ley exactamente, qué encontramos midiendo de verdad, y qué
no se puede decir. Los ángulos del final son sugerencias; lo que no es negociable son los
hechos y las prohibiciones.

---

## 1. Qué es el producto, en concreto

`verifica.spindlelab.cl` — página gratis, **sin registro y sin dejar correo**. Dos niveles:

| | Qué hace | Cuánto demora |
|---|---|---|
| **Chequeo rápido** | Lee el código de la página y su política de privacidad | ~2 segundos |
| **Revisión con navegador** | Abre el sitio en un navegador limpio y lo **mira sin tocar nada** | ~30 segundos (26–28 observando) |

La diferencia entre los dos es el corazón del producto y hay que entenderla para escribir:
el rápido **lee lo que el sitio dice**; el profundo **mira lo que el sitio hace**. Un sitio
puede tener la política perfecta y estar filtrando datos igual.

**Tope técnico real:** 20 revisiones profundas por IP al día, **80 en total al día** para todo
el sitio. Si una pieza funciona de verdad, 80 es el techo. Hoy (16-oct) el tope se agotó con
pruebas internas. No es un dato para publicar, es para que nadie prometa capacidad infinita.

### Lo que el producto NUNCA dice

Está escrito en su propia salida, literal: *"Esto describe lo que vimos; no dice si cumples o
no la ley, y no es asesoría legal."* Tiene tres estados por punto: **encontrado**,
**pendiente**, **sin confirmar**. Cuando no puede leer algo, **declina en vez de puntuar** — no
inventa un número. Eso es una virtud vendible, no un disclaimer a esconder.

---

## 2. Qué mide la revisión con navegador (4 chequeos, 2 bloques)

Peso total 13 puntos. Esto es textual del producto.

**Bloque 1 — "Qué corre antes de que alguien diga que sí"**
> Abrimos tu sitio en un navegador y no tocamos nada: ni un clic, ni un botón de aceptar. Todo
> lo que aparece acá pasó sin que nadie diera permiso.

- **Rastreadores que parten solos** (peso 3)
- **Cookies escritas sin permiso** (peso 3)
- **Datos que ya salieron de tu sitio** (peso 4) ← el más pesado, y con razón

**Bloque 2 — "El aviso de cookies"**
> La ley pide que el consentimiento sea previo e inequívoco, y que se manifieste mediante un
> acto afirmativo (Art. 12). Acá miramos si aparece algo en pantalla donde la persona pueda
> decir que sí o que no.

- **Si aparece un aviso al entrar** (peso 3)

**Informativo, no puntúa:** con cuántos dominios de terceros habló el sitio. *"Cada petición
lleva al menos la dirección IP de quien visita y desde qué página venía."*

**El método, que vale contarlo:** navegador limpio sin cookies ni historial, se mueve el mouse
y se baja la página, y **no se hace ningún clic a propósito** — para no aceptar sin querer un
aviso y terminar midiendo un sitio con el permiso ya dado.

---

## 3. El hallazgo real del 16-oct (el mejor material que tenemos)

Medimos el sitio de una universidad chilena grande. **Puntaje 0 de 100.**

Tenía el aviso de cookies **bien hecho**: cuatro botones, incluido RECHAZAR y PERSONALIZAR. El
texto del propio aviso decía que solo activan las cookies opcionales con consentimiento
explícito.

Y antes de que nadie lo tocara, en 28 segundos de observación:

- **6 rastreadores ya habían partido:** Google Analytics (a los 7,0s), Google Tag Manager
  (8,3s), el Pixel de Meta (8,3s), Hotjar (8,3s), Google Ads (12,8s), el Pixel de TikTok (12,9s).
- **10 cookies escritas** sin permiso.
- **Datos de la visita ya enviados** a cuatro destinos: Analytics a los 12,8s, Meta a los
  12,9s, Google Ads a los 13,4s, TikTok a los 15,4s.
- **17 dominios de terceros** contactados.

La frase que el producto escribió solo, y que es el mejor copy disponible:

> **"El aviso está, y no está reteniendo nada."**

Ese es el ángulo central de toda la campaña. No es "no tienes aviso" (eso ofende y es fácil de
refutar). Es **"tienes el aviso, te costó plata, y no está haciendo lo que crees"**. Le habla a
alguien que ya hizo el esfuerzo y cree estar cubierto.

**REGLA DURA: en la pieza publicada no se nombra el sitio.** Es "una universidad chilena", o
mejor todavía, se cuenta el patrón sin el rubro. El dato es real y auditable internamente; el
nombre no se publica. Esto no es cautela excesiva: es la regla de la casa y además es lo que
hace que el prospecto no tenga miedo de medirse.

### Aviso importante antes de escribir: nuestra propia página saca 77

Medido hoy con el instrumento mismo:

| Sitio | Puntaje profundo | Por qué |
|---|---|---|
| `spindlelab.cl` | **100** | Sin rastreadores, sin cookies, sin envíos. El aviso quedó **"sin confirmar"**, y el puntaje se calcula solo sobre lo que pudo confirmar — no lo da por bueno ni por malo. |
| `verifica.spindlelab.cl` | **77** | Las tres revisiones de rastreo en orden. **Pendiente: no aparece ningún aviso de cookies.** |

Alguien va a revisar `verifica.spindlelab.cl` **con** `verifica.spindlelab.cl`. Es lo primero que
haría yo. Y va a ver un pendiente.

Hay defensa legítima — la página no carga ningún rastreador ni escribe ninguna cookie, así que
no hay nada que consentir — pero el instrumento igual lo marca pendiente, y en una pieza no se
alcanza a explicar el matiz. **No construir ninguna pieza sobre "mírame a mí" ni invitar a
chequear nuestro propio dominio** hasta que esto se resuelva. Está anotado para la sesión que
mantiene el producto; no es trabajo de contenido.

---

## 4. Los 12 puntos del Art. 14 ter

El producto los revisa y los lista, **sin que entren al puntaje** (son para comparar). Nombres
como están publicados, y el texto literal de la ley al lado. Usar los nombres cortos en las
piezas; el texto legal sirve para no decir una imprecisión.

| | Nombre publicado | Lo que pide la ley (literal) |
|---|---|---|
| a | Tu política, con su fecha y su versión | La política de tratamiento de datos personales que haya adoptado, la fecha y versión de la misma. |
| b | Quién responde por los datos | La individualización del responsable de datos y su representante legal y la identificación del encargado de prevención, si existiere. |
| c | Por dónde te escriben las personas | El domicilio postal, la dirección de correo electrónico, el formulario de contacto o la identificación del medio tecnológico equivalente… mediante el cual se le notifican las solicitudes que realicen los titulares. |
| d | Qué datos tratas, para qué, con qué permiso y a quién se los entregas | Las categorías, clases o tipos de datos que trata; la descripción genérica del universo de personas…; los destinatarios…; las finalidades…; la base de legitimidad del tratamiento… |
| e | Cómo proteges los datos que guardas | La política y las medidas de seguridad adoptadas para proteger las bases de datos personales que administra. |
| f | Los cinco derechos de cada persona sobre sus datos | …acceso, rectificación, supresión, oposición y portabilidad de sus datos personales. |
| g | Que se puede reclamar ante la Agencia | El derecho… de recurrir ante la Agencia, en caso de que el responsable rechace o no responda oportunamente las solicitudes. |
| h | Si los datos salen de Chile | …la transferencia de datos personales a un tercer país u organización internacional y si éstos ofrecen o no un nivel adecuado de protección. |
| i | Cuánto tiempo guardas los datos | El periodo durante el que se conservarán los datos personales. |
| j | De dónde salen los datos | La fuente de la cual provienen los datos personales y, en su caso, si proceden de fuentes de acceso público. |
| k | Que se puede retirar el permiso cuando uno quiera | …la existencia del derecho a retirarlo en cualquier momento, sin que ello afecte a la licitud del tratamiento basado en el consentimiento previo a su retirada. |
| l | Si algo decide solo sobre las personas | La existencia de decisiones automatizadas, incluida la elaboración de perfiles… información significativa sobre la lógica aplicada, así como las consecuencias previstas… |

**Matiz que el producto declara y las piezas deben respetar:** busca si cada punto *aparece
mencionado*, no si está bien dicho ni si alcanza. Una política puede cubrir un punto con otras
palabras y no reconocerlo. Nunca escribir "te faltan 5 puntos" como veredicto.

---

## 5. La ley, verificada contra fuente primaria

Verificado 3-sep-2026 contra BCN/Ley Chile (idNorma 1209272) y corregido 23-sep-2026 contra el
**Diario Oficial N° 44.023 del 13-dic-2024, CVE 2583630**.

**Lo cierto:**
- Promulgada 25-nov-2024, publicada 13-dic-2024. **Vigencia plena: 1 de diciembre de 2026**
  (artículo primero transitorio: "el día primero del mes vigésimo cuarto posterior a la
  publicación").
- Modifica la Ley 19.628, que pasa a llamarse "sobre protección de los datos personales".
- Aplica a **toda organización que trate datos personales en Chile, sin importar su tamaño**.
  Una pyme con formulario de contacto ya está tratando datos personales.
- Art. 12: el consentimiento debe ser **previo, inequívoco y por un acto afirmativo**.

**Lo que el mercado dice mal — y nosotros no repetimos:**

1. **"20.000 UTM o 4% de los ingresos" no son dos techos paralelos.** Es escalonado:
   leves → amonestación o hasta 5.000 UTM; graves → hasta 10.000 UTM; gravísimas → hasta
   20.000 UTM. El 2%/4% de ingresos **solo entra en reincidencia** (2+ sanciones en 30 meses)
   de una empresa que **no** sea de menor tamaño (Ley 20.416). Decirle a una pyme en su primera
   falta que puede pagar 4% de sus ingresos es mentir.
2. **"Notificación de brechas en 72 horas" NO está en la ley.** Eso es RGPD europeo. El Art. 14
   sexies dice "por los medios más expeditos posibles y **sin dilaciones indebidas**", sin
   plazo numérico. **Sacar "72 horas" de cualquier pieza.**
3. **"Derechos ARCOP" no es el acrónimo de esta ley.** Son acceso, rectificación, supresión,
   oposición y portabilidad (Art. 14 ter f). Como jerga de mercado pasa; como cita legal, no.
4. **El delegado de protección de datos NO es obligatorio.** Art. 50: el responsable
   "**podrá** designar". Es facultativo, parte del modelo de prevención opcional. A diferencia
   del RGPD. No prometerle a nadie que "necesita nombrar un delegado".
5. **La amonestación en vez de multa para pymes no es permanente ni automática.** Art. sexto
   transitorio: solo los **primeros 12 meses** desde la vigencia (dic-2026 a dic-2027), y dice
   que la Agencia "**podrá**" — discrecional, con fecha de vencimiento.

---

### ⚠️ La postergación: hay un proyecto, NO hay una ley (verificado el 23-oct-2026)

Varios sitios chilenos están publicando titulares del tipo **"Chile posterga al 2027 la Ley
21.719"**. **Eso es falso hoy, o al menos prematuro**, y repetirlo sería exactamente el error
que estas reglas prohíben: tratar un proyecto como si fuera texto vigente.

Lo verificado el 23-oct-2026 contra BCN/Ley Chile (`idNorma=1209272`), que es el texto oficial:

- La ficha de la ley dice, en su cabecera: **"Entra en vigencia el 01-DIC-2026"**, con la marca
  **"TIENE TEXTO DIFERIDO"**. Versión: *Con Vigencia Diferida por Fecha - 01-DIC-2026*.
- Última modificación registrada: **05-FEB-2026, Ley 21.806**. No es una postergación.
- El **Boletín 18.623-07** aparece en esa misma ficha bajo **"Proyectos de Modificación"**, o
  sea pendiente. En la lista del Senado figura **"En tramitación"**, con la columna "Ley"
  **vacía**; otros boletines de esa lista sí muestran "Publicado" con su número de ley.

**Qué propone ese proyecto** (ingresado por el Ejecutivo el 1-sep-2026, con suma urgencia):
mover la vigencia al 1-dic-2027, ampliar el Consejo Directivo de la Agencia de tres a cinco
miembros y ensanchar la amonestación por escrito del primer año.

**La regla para el contenido, mientras esto no cambie:**

- Se dice **"entra en vigencia el 1 de diciembre de 2026"**, porque es lo que dice el texto
  oficial hoy. Al 23-oct son **39 días**.
- **No** se dice "se postergó", "ahora es 2027" ni "tienes un año más". No es cierto todavía.
- Si el tema aparece, se dice completo y en ese orden: *hay un proyecto del Gobierno para
  moverla a 2027, está en el Senado, y mientras no se apruebe y se publique la fecha sigue
  siendo el 1 de diciembre de 2026.*
- **Esto hay que volver a verificarlo antes de publicar cualquier pieza que nombre la fecha.**
  Puede cambiar de un día para otro, y una pieza que diga la fecha equivocada envejece mal y
  en público. Se mira la cabecera de `bcn.cl/leychile/navegar?idNorma=1209272` — necesita
  navegador, carga con JavaScript y el fetch directo devuelve una página de espera.

Hay un ángulo de contenido legítimo acá, y es de los buenos: **medio mercado está diciendo que
la ley se postergó cuando no se ha postergado.** Eso se puede contar sin nombrar a nadie, y
encaja con lo único que diferencia a este producto, que es decir con precisión lo que se
verificó y lo que no.

---

## 6. Precios, como están publicados

- **Kit de implementación: desde $149.000 + IVA**, una vez. Instala el gestor de
  consentimiento y corrige lo que salió pendiente.
- **Revisión trimestral: desde $39.000 + IVA al mes.** Revisan el sitio al cierre de cada
  trimestre y mandan el informe; si una señal se rompió desde la revisión anterior, avisan.

Referencia de mercado, **para calibrar el discurso, no para publicar ni comparar en una
pieza**: hay agencias cobrando ~$90.000 + IVA por un diagnóstico **manual** y ~$464.000 IVA
incluido por la implementación. Nuestro chequeo es gratis, automático e instantáneo. **No se
nombra a nadie, no se compara con "otras agencias" en una pieza pública.**

---

## 7. Lo que NO se puede decir (no negociable)

- **Nunca "cumples" ni "no cumples".** El chequeo describe señales técnicas presentes o
  ausentes. Decirle "cumples" a quien no cumple lo expone a una multa y nos expone a nosotros.
- **Nada de asesoría legal.** El texto de la política y la evaluación jurídica son de abogado.
  Nosotros hacemos la capa técnica.
- **Nada de alarmismo. El gancho es la fecha y el hecho, no el miedo.** Específicamente: **la
  multa no se usa como gancho.** Ni 20.000 UTM, ni el 4%, ni en un titular, ni en un overlay.
- **Cero cifras, clientes o testimonios inventados.** Cero prueba social que no exista.
- **Nunca nombrar un prospecto, un cliente ni un competidor** en una pieza pública. Los
  hallazgos se generalizan.
- **No citar como texto literal de la ley algo que es inferencia o jerga.** Ver §5.
- **Voz:** primera persona singular para lo observacional ("revisé el sitio", "le pregunté"),
  plural para lo que entrega el negocio ("entregamos"). La cuenta personal de LinkedIn es
  siempre singular.
- **Cero rayas largas (—) como golpe de efecto.** Es el tell de IA más marcado y está prohibido
  en las reglas de tono de la casa.
- **Un solo uso del dorado `#C9A227`** por pieza visual.

---

## 8. Ángulos que el material aguanta (sugerencias, no mandato)

Ordenados por qué tan bien los respalda un hecho medido.

1. **"El aviso está, y no está reteniendo nada."** El más fuerte, y es copy que el producto
   escribió solo. Caso real del §3: aviso con botón RECHAZAR, y seis rastreadores ya corriendo.
   Le habla a quien ya hizo el esfuerzo. No acusa: avisa.
2. **Los segundos.** "A los 7 segundos ya había salido el primer dato. Nadie había tocado
   nada." La precisión temporal es lo que hace creíble el hallazgo, y nadie más la muestra.
3. **Leer vs. mirar.** Dos chequeos, dos preguntas distintas: qué dice tu sitio y qué hace tu
   sitio. El caso del §3 da el par real medido: **30 en el rápido, 0 en el profundo**. El
   código se veía a medias; el comportamiento era peor que el código.
4. **Sin registro, sin correo.** En un mercado donde todo diagnóstico pide el mail antes de
   mostrar nada, no pedir nada es diferenciador real y verificable en dos clics.
5. **Los 12 puntos como lista concreta.** Es el único contenido donde la ley se vuelve
   accionable sin abogado. Funciona en carrusel.
6. **"Describe, no certifica."** La honestidad del instrumento como argumento de venta: cuando
   no puede leer algo, lo dice en vez de inventar un puntaje.

**El ángulo que NO funciona:** "se viene la multa, apúrate". Está prohibido y además es lo que
ya hace todo el mercado.

---

## 9. Qué está publicado hoy (16-oct)

Dos piezas de esta campaña salieron a Instagram (`@spindlelab.cl`), y además como stories en la
cuenta personal y la de la empresa:

- Carrusel **"Las 12 cosas"** — `instagram.com/p/Dd3uPldESqj/`
- Reel **"¿Estás seguro?"** — `instagram.com/reel/Dd6dAemM6E2/`

Fuentes en `marketing/redes/2026-10-octubre-verifica/03-carrusel-las-12-cosas/` y
`04-reel-estas-seguro/`. El estado real de canales se lee de
`marketing/redes/QUE-HAY-PUBLICADO.md`, no de memoria.

**Dato interno que conviene saber y no publicar:** desde que salieron esas piezas, los
contadores de uso del sitio no registran **ninguna** revisión de origen orgánico. Todo lo
medido es tráfico propio. Es decir: el producto funciona, el contenido salió, y la demanda
todavía no aparece. Por eso el próximo contenido tiene que ser mejor, no solo más.

---

## 10. Dónde verificar cada cosa

| Qué | Dónde |
|---|---|
| Los 12 puntos y su texto legal | `verifica.spindlelab.cl/api/doce-puntos?dominio=<x>` |
| Qué mide la revisión profunda | `verifica.spindlelab.cl/api/profundo?dominio=<x>` |
| La ley, verificada y con correcciones | `~/vyc-ley21719/laboratorio/01-cumplimiento-ley-21719/brief.md` §2 y §5 |
| Precios | la página viva, sección de precios |
| Reglas de voz | `marketing/brand/manual-de-marca.md` y la skill `voz-spindlelab` |
