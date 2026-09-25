# Toque 2 · seguimiento del día 3 de Verifica y Cumple

**15 correos, los 15 escritos. Ninguno enviado.** No abrí Gmail, no toqué el repo, no hice
ninguna petición a web3forms. Todo está acá en texto plano, listo para pegar.

- Toque 1: enviado el **jueves 24-sep**.
- Toque 2 (esto): **domingo 27-sep**, día 3 del canon.
- Toque 3 y último: miércoles 1-oct.

Cada archivo trae `Para`, `Asunto` y cuerpo. **El asunto es `Re:` del original, así que va
como respuesta dentro del mismo hilo**, no como correo nuevo. El índice está en `indice.csv`.

---

## La decisión de fondo

Cuatro de cada cinco sitios no movieron un dedo en 48 horas. Eso deja fuera el seguimiento
fácil ("¿alcanzaste a verlo?"), que además es el que mata la conversación. **Ninguno de los
15 pregunta si leyeron el primero.** Cada uno aporta un hecho que el primer correo no tenía
y que se comprobó hoy.

Los tres tipos de material nuevo que quedaron:

1. **Una corrección propia** (time.cl). Es el único de los 15 donde Ramón se desdice antes de
   pedir nada. Si un correo de este lote abre una conversación, es ese.
2. **Un dato que el primero no dio**: cuánto dura la cookie, en qué dominio queda, a dónde van
   los enlaces, qué pide exactamente ese formulario.
3. **Un reconocimiento que faltaba**: Awasi sí tiene su política publicada y enlazada, Cumbres
   y Las Torres sí frenan a Google, Terrado sí publicó su política de cookies. Reconocerlo
   sostiene el resto del correo en vez de debilitarlo.

**Nadie quedó fuera.** Los 15 tenían algo cierto y nuevo que decir. El más delgado es Awasi
(duraciones + el reconocimiento de la política); si quieres recortar el lote a 14, ese es el
que sacaría.

---

## Qué cambió en cada sitio, y qué lleva su seguimiento

### Hoteles y turismo

| Sitio | ¿Cambió algo? | Lo nuevo del toque 2 |
|---|---|---|
| **awasi.com** | No | Duraciones: Analytics 400 días, Meta y Reddit 90. Y el reconocimiento de que su política sí está publicada, enlazada y abre |
| **hotelescumbres.cl** | No | Busqué la política por si estuviera publicada sin enlazar: el sitemap lista una sola página legal (Términos) y cuatro rutas habituales dan 404 |
| **terrado.cl** | No | Duraciones, y que el identificador de Microsoft queda en `bing.com`, no en su dominio. **Sin el conteo de cookies** (el 23 salieron 17, hoy 18) |
| **time.cl** | El sitio no. Lo que sabemos, sí | La política existe desde abril, en tres idiomas, y no hay cómo llegar a ella |
| **patagoniacamp.com** | No | Ningún enlace de la portada lleva a una política de privacidad. El primer correo nunca habló de la política, solo de cookies |

### Clínicas y estética

| Sitio | ¿Cambió algo? | Lo nuevo del toque 2 |
|---|---|---|
| **lastorres.com** | No | El `MUID` de Microsoft vive en `bing.com` con 390 días, fuera de su dominio y fuera de su alcance |
| **skinology.cl** | No | Las cuatro duraciones: Analytics 400, TikTok 390, Pinterest 365, Meta 90 |
| **revitalaser.cl** | No | El disparador incluye `touchstart` y `touchmove`: en un teléfono basta deslizar. Más la oferta de mandarle la línea literal de su código |
| **kydoft.cl** | No | A dónde van los enlaces de la portada (diez destinos) y que `/politicas` lleva a Políticas de calidad, que trata de derechos del paciente, no de datos |
| **aureamed.cl** | No | Tiene **cuatro** páginas de políticas publicadas y ninguna es la de privacidad. Los Términos no dicen privacidad, datos personales ni cookies, ni una vez |

### Estudios de abogados

| Sitio | ¿Cambió algo? | Lo nuevo del toque 2 |
|---|---|---|
| **garciaparot.cl** | No | Los campos del formulario, y que su portada no carga un solo rastreador de terceros. No tiene nada que limpiar |
| **atabogados.cl** | No | Los cuatro campos del formulario del modal, y las cero cookies |
| **delamazaycia.cl** | No | El canal de denuncias pide nombre, correo y teléfono, tiene un apartado de "Confidencialidad y tratamiento de la información", y la palabra privacidad no aparece en esa página |
| **cnsy.cl** | No | La precisión de que hay **envío**, no solo carga, y que ocurre sin tocar nada |
| **tuane.cl** | No | Los campos del formulario, y que no hay nada que limpiar |

---

## Tres cosas que verifiqué yo y que corrigen lo que me llegó

No escribí sobre los informes de re-medición sin abrirlos. Tres afirmaciones no aguantaron:

1. **aureamed.cl · "187 enlaces, uno solo legal, el mismo Términos".** Falso. Su portada
   enlaza **cuatro** páginas de políticas: conducta para pacientes, términos, envíos y
   devoluciones. Ninguna es la de privacidad, que sigue siendo el punto, pero la frase
   original se caía abriendo el pie del sitio. El correo dice las cuatro.
2. **kydoft.cl · "119 enlaces, ninguno legal".** Refutable. `/politicas` redirige a
   `/politicas-de-calidad/`, que existe y responde 200. No es de datos (habla de derechos y
   deberes del paciente), así que el correo lo nombra y explica por qué no cuenta.
3. **patagoniacamp.com · "su mapa del sitio lista 53 páginas y ninguna es de privacidad".**
   **No lo pude reproducir.** Su servidor me devolvió 503 en `page-sitemap.xml` y en las
   cuatro rutas legales, en dos intentos. Un hallazgo que depende de que el sitemap conteste
   no cumple la regla de la casa, así que **ese ángulo no entró al correo**. En su lugar va lo
   que sí está medido: ningún enlace de la portada lleva a una política.

También descarté el ángulo del **`gcs=G111` de skinology.cl**. Es la señal de consentimiento
en "concedido" sin que nadie haya preguntado, pero también es el valor por defecto cuando no
hay Consent Mode configurado. Un desarrollador responde "es el default" y tiene razón técnica.
No vale gastar el segundo toque en algo que se contesta en una línea.

Y no usé el **Universal Analytics viejo de kydoft.cl**: aparece en cuatro de las cinco corridas
que existen, no en todas.

---

## Lo verificado a mano antes de escribir

Además de leer las sondas, comprobé por mi cuenta hoy:

- `delamazaycia.cl/canal-de-denuncias/` responde 200 y la palabra "privacidad" aparece **0
  veces**; "Confidencialidad y tratamiento de la información" sí está.
- La portada de `time.cl` no contiene la cadena `privacy-policy` **ni una vez**, y
  `time.cl/privacy-policy/` responde 200 con `article:modified_time` de abril de 2026.
- El sitemap de `hotelescumbres.com` lista 63 direcciones y una sola página legal.
- Las cuatro rutas de privacidad de `hotelescumbres.com` dan 404; `/terminos-y-condiciones`, 200.
- Los Términos de `clinicaaurea.cl`: privacidad 0, datos personales 0, cookies 0.
- `terrado.cl/content/uploads/2026/06/Politica-de-Cookies.pdf` responde 200 (por eso el correo
  le reconoce que la publicó).
- Las duraciones de cookie de los diez sitios de hoteles y clínicas salen de las sondas del
  25-sep, leídas una por una.

---

## Reglas que cumple el lote

- **Cero puntajes del chequeo.** Ninguno de los 15 menciona un número del chequeo.
- **Cero mitos legales.** No aparece el delegado, ni las 72 horas, ni el 4%, ni una multa en
  pesos, ni una fecha de vigencia como palanca.
- **Cero rayas largas.** Cero urgencia fabricada. Cero "¿lo viste?".
- **Voz singular de Ramón**, y el mismo tuteo que usó cada correo original de ese hilo.
- **La línea de baja va en los 15**, textual, antes de la firma.
- **Cuerpos entre 78 y 99 palabras**, todos más cortos que su toque 1.
- Firma según el hilo: hoteles y clínicas con `hola@spindlelab.cl`, abogados con
  `spindlelab.cl`, igual que el primer correo.
- Conteos frágiles fuera: no se repite el número de cookies de Terrado ni el de enlaces de
  ningún sitio, salvo los que aguantaron dos fechas y varias corridas.

---

## Antes de mandar

1. **Revisa uno por uno.** Nada sale de acá sin tu lectura, como siempre.
2. **Responde dentro del hilo**, no crees un correo nuevo. El asunto ya viene con `Re:`.
3. **Si alguien ya respondió** al toque 1, su seguimiento **no se manda**: esa conversación va
   por donde la dejó él. El estado real está en Gmail, no en estos archivos.
4. **Si alguien pidió la baja**, sale de la lista y no recibe este correo.
5. De a uno, desde tu correo. Los 15 caben en una sentada.

**Sobre el domingo:** el canon dice día 3 y el día 3 cae domingo 27. Ninguno de los 15 nombra
un día de la semana, así que **funcionan igual el lunes 28 temprano**. Si prefieres que un
estudio de abogados no vea un correo comercial un domingo, muévelos al lunes sin tocar el
texto. Lo que no conviene es estirarlo más: el toque 3 es el miércoles 1-oct y quedarían
pegados.

## Lo que queda para el toque 3 (1-oct)

Es el último. No se vuelve a escribir después de ese, y el correo tiene que decirlo. Para
Time el cierre natural es preguntar si enlazó la política; para los cinco abogados, que la
página es media tarde de trabajo. Antes de escribirlo hay que volver a medir: si alguno
arregló algo entre medio, ese es el mejor correo del mes y sería una lástima no verlo.
