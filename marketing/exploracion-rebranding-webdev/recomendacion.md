# Exploración del rebranding «Desarrollo Web + AEO incorporado» — vista de decisión

**Rama:** `claude/rebranding-webdev-exploracion` · **27-sep-2026** · No se tocó `main`, no se mergeó,
no se publicó nada, **los precios quedaron exactamente como estaban.**

> **Qué es esto:** la maqueta del hero nuevo, construida y mirada, más lo que aparece cuando se
> construye de verdad. No viene aprobado. Viene para decidir.

---

## 1. Qué se construyó

Los cimientos que se pidieron, y solo eso:

| Archivo | Qué cambió |
|---|---|
| `tailwind.config.mjs` | Paleta estricta (tinta, papel, pluma) **agregada, no sustituida**, y escala tipográfica fluida con `clamp` |
| `src/layouts/Layout.astro` | Lenis (scroll suave), precarga de Gabarito, slot `head`, fondo de `body` configurable |
| `src/styles/global.css` | Reglas de Lenis y apagado del `scroll-behavior` nativo cuando Lenis está activo |
| `src/components/HeroV2.astro` | **Nuevo.** El hero Driftime. `Hero.astro` queda intacto |
| `src/pages/v2.astro` | **Nueva.** Ruta de maqueta `/v2/`, con `noindex` |

La home actual no se tocó: su render es **byte a byte idéntico** al de antes de empezar
(493.061 bytes en las dos capturas). Las dos versiones se pueden comparar en paralelo.

**Ver:** `renders/01-home-actual-escritorio.png` · `renders/02-v2-hero-escritorio.png` ·
`renders/03-v2-hero-movil.png` · `renders/05-v2-quiebre-tinta-a-papel.png`

---

## 2. El mensaje, lado a lado

| | **Home actual** | **Maqueta V2** |
|---|---|---|
| **Titular** | «Un **motor** de adquisición. No cuatro servicios sueltos.» | «Sitios web preparados para la IA**.**» |
| **A quién le habla** | A quien tiene varios servicios sueltos y ninguno rinde | A quien va a construir o rehacer su sitio |
| **Prueba visual** | Video de fondo (el hilo de oro) | Ninguna. Solo tipografía |
| **Dorados en la primera vista** | **Dos** (punto del wordmark + la palabra «motor») | **Uno** (el punto final del titular) |
| **CTA principal** | «Agenda tu diagnóstico» | «Agenda tu diagnóstico» (sin cambio) |
| **Puerta secundaria** | «Chequea tu sitio gratis» | «Ya tengo sitio, quiero ver qué lo frena» |

**Lo que mejora de verdad, y no es poco:** la versión nueva se ve más segura. El hero actual
compite consigo mismo (video, dos dorados, tres bloques de texto y dos enlaces en la primera
pantalla). El nuevo dice una cosa y se calla. Para vender criterio técnico, callarse vende más.

---

## 3. Lo que apareció al construirlo (no se ve en el texto de la propuesta)

**a) El hero puro deja los dos botones fuera de la pantalla.** Con `py-32/py-48` fijo, la sección
medía **970 px en una ventana de 813 px**: el párrafo arrancaba en 806 y los dos CTA quedaban
abajo de la línea. En un notebook de 1440×900 se veía el titular y **nada más**, ni el botón ni la
puerta para el que ya tiene sitio. Está capturado en
`renders/04-v2-hero-sin-corregir-cta-bajo-la-linea.png`.
**Corregido** pasando el aire a `clamp(2rem, 9vh, 10rem)`: crece en monitores altos y se ajusta en
notebooks. Ahora entra completo en escritorio (813/813) y en móvil (844/844), sin desborde lateral.
Vale la pena saberlo: *«solo una o dos oraciones visibles a la vez»* y *«que se pueda hacer clic»*
compiten, y hay que resolverlo a propósito.

**b) El gris pluma #5D6673 no pasa contraste.** Sobre tinta da **3,0:1** y AA pide 4,5:1 para
cuerpo. El repo ya tenía esto resuelto: usa **#9AA4B0** («gris pluma elevado», **6,9:1**), y por eso
la paleta implementada no coincide con la del manual. La maqueta usa el elevado para el cuerpo y
deja el #5D6673 para hairlines y metadatos. Tu propia regla pedía «alto contraste», así que las dos
partes de la instrucción se contradecían y se resolvió a favor del contraste.

**c) La regla de un dorado por vista hoy no se cumple.** La home actual gasta dos en la primera
pantalla. Si se adopta V2 hay que elegir: o el punto del wordmark en `Nav.astro` deja de ser dorado
(que es lo que hace la maqueta), o el dorado del titular se va al CTA. Es una línea de código, pero
es una decisión.

**d) Manrope no está y traerla tiene costo.** Las tipografías se auto-alojan a propósito: Google
Fonts se sacó porque le entregaba la IP de cada visitante en cada página. Manrope habría que
descargarla y alojarla igual. La maqueta usa Inter, que ya está.

**e) Lenis pesa 20 kB (5,9 kB gzip) y secuestra el scroll.** Quedó detrás de
`prefers-reduced-motion` y sin `syncTouch` en móvil. Aun así conviene decirlo en voz alta: es JS
nuevo y una interacción no nativa **en el sitio de una consultora que vende rendimiento técnico**.
Si un prospecto mide el sitio, esto es lo primero que aparece.

---

## 4. La oferta reordenada (precios intactos)

Cambia el orden y el argumento. **No cambia ningún número.**

| # | Servicio | Precio vigente (+ IVA) | Rol en la jerarquía nueva |
|---|---|---|---|
| 1 | **Desarrollo Web** | $390.000 · $690.000 · $1.190.000 | La puerta de entrada. Necesidad tangible, ticket alto, ciclo corto |
| 2 | **Visibilidad en IA (AEO/GEO)** | $400.000 | El diferenciador, incorporado al sitio, no vendido aparte |
| 3 | **Auditoría SEO Técnica** | $490.000 · $690.000 (con Visibilidad IA) | **La puerta del que ya tiene sitio y no lo va a rehacer** |
| 4 | **Acompañamiento Mensual** | $590.000/mes · $790.000/mes (Pro) | Continuidad, solo después de entregar |
| 5 | **Gestión de Redes Sociales** | $390.000/mes · $590.000/mes (con pauta) | Sin cambio |
| 6 | **Paid Media (Google)** | $350.000/mes · $550.000/mes (Pro) | Sin cambio |

**Observaciones anotadas, no aplicadas** (como pedía el encargo):

- El **Acompañamiento Mensual a $590.000/mes** es el punto que más chirría al ponerlo debajo de
  Desarrollo Web, porque la casa ya fijó **$50.000/mes** de mantención con el primer cliente de
  Desarrollo Web. Son dos cosas distintas con nombres parecidos, y puestas en la misma lista se
  leen como contradicción. **No se tocó.** Queda para ti.
- La **«vigilancia de menciones en IA» no entra en la promesa** de la maqueta, según la condición 2.
  `capacidad-servicios.md` la marca ❌ porque depende de un paso manual que no escala más allá de
  1-2 clientes. El hero no la menciona y el retainer no se apoya en ella.
- La **condición 3 está cumplida**: «Ya tengo sitio, quiero ver qué lo frena» apunta a
  `/diagnostico/` y es la puerta del estudio legal de 257 artículos que nunca iba a rehacer su
  WordPress.

---

## 5. Veredicto honesto

**No conviene adoptarlo ahora.** No porque la idea esté mal, sino por tres razones concretas:

**1. Son dos decisiones distintas que llegaron pegadas.** Una es *cambiar el mensaje* a Desarrollo
Web. La otra es *reconstruir la interfaz* al estilo Driftime. No dependen entre sí: se puede
adoptar el mensaje nuevo sin tocar el diseño, y se puede subir el nivel editorial del diseño
manteniendo «Un motor de adquisición». Pegadas, un «no» a una mata a la otra, y la más barata de
las dos es la que tiene evidencia a favor.

**2. La hipótesis se prueba sin tocar el sitio, y eso ya estaba escrito.** El diagnóstico de fondo
es correcto y está respaldado: Desarrollo Web hizo los dos únicos cierres (~$1,9 M) mientras 142
correos fríos de AEO cerraron cero. Pero eso dice *por dónde entrar a conversar*, no *qué tiene que
decir la home*. Cambiar el gancho del correo y del mini-diagnóstico para los próximos **20 abogados**
cuesta casi nada y responde la misma pregunta. Si salen conversaciones que hoy no salen, ahí hay
evidencia real para rehacer la home. Si no salen, no se quemó el posicionamiento ni las horas.

**3. El timing es exactamente el patrón que ya reconociste por escrito.** El plan de 90 días vence
el **5-oct** y la retrospectiva no está hecha. Pivotar el posicionamiento antes de cerrar el ciclo
es lo que pasó el 4-ago con el frente EE.UU. y el 3-sep con el laboratorio. Y una reconstrucción
completa de UI/UX (scroll-telling, cuatro secciones nuevas, la consola de diagnóstico rediseñada)
no son las 2 horas de estos cimientos: son semanas a 6-10 h/semana, compitiendo con la entrega de
Módulo 369 (arranca 6-oct) y la ventana de Verifica y Cumple (cierra 1-dic).

### Lo que sí recomiendo hacer con esto

- **Guardar la rama.** Los cimientos (tokens, escala fluida, Lenis, el hero) ya están y no caducan.
  Cuando haya evidencia, se retoma desde acá y no desde cero.
- **Correr la prueba de los 20 abogados** con el gancho de Desarrollo Web. Costo cercano a cero.
- **Hacer la retrospectiva del 5-oct antes de decidir.** Con el resultado de la prueba adentro.
- **Si quieres una mejora visual igual:** el hallazgo (a) y el (c) se pueden aplicar a la home
  actual sin cambiar una palabra del mensaje. Sacar un dorado de la primera vista y bajarle el
  ruido al hero es media hora y mejora el sitio que ya está en el aire.

---

**Estado:** maqueta lista para mirar. Decisión, tuya.
