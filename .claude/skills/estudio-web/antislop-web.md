# Detector anti-slop web (castellano, código y estructura)

> Complemento de `refero-design/references/anti-ai-slop.md`, que cubre el slop
> **visual** general (indigo, tarjetas por defecto, dark por defecto, serif editorial
> en automático, emoji como iconos, promediado de referencias, roles de token,
> gráficos falsos). **Ese documento se corre completo igual.** Acá va lo que no
> cubre: el castellano, el marcado, y los patrones de estructura de un sitio.
>
> Lo escribe y lo corre Javiera en la fase 4. Lucía, Clara y Diego lo leen **antes**
> de producir: un defecto evitado no necesita ronda de corrección.

---

## A · Copy en castellano (de dónde viene el olor a IA)

### A1 · Los verbos de folleto
"Impulsa", "potencia", "transforma", "revoluciona", "maximiza", "optimiza tu
presencia", "lleva tu negocio al siguiente nivel". Son verbos sin referente: no dicen
qué pasa, dicen que algo bueno pasa.
**Regla:** el verbo del headline nombra una acción concreta del visitante o un hecho
verificable del servicio. Si el headline funciona igual para una inmobiliaria y para
una clínica dental, no dice nada.

### A2 · El relleno de apertura
"En un mundo cada vez más digital…", "Hoy más que nunca…", "La inteligencia
artificial está cambiando la forma en que…". Es carraspeo antes de hablar.
**Regla:** la primera frase entra en materia. Si se puede borrar el primer párrafo
completo sin perder información, estaba de relleno (y hay que borrarlo).

### A3 · El tricolon automático
"Rápido, seguro y confiable". "Estrategia, ejecución y resultados". Tres adjetivos o
tres sustantivos en serie, sin que el tercero aporte nada. La IA lo produce porque
el ritmo suena bien.
**Regla:** si el tercer elemento se puede borrar y la frase mejora, era ritmo, no
contenido. Máximo una serie de tres por página, y que los tres sean distintos.

### A4 · "No solo X, sino Y"
Construcción de contraste vacía ("no solo diseñamos sitios, construimos presencia").
Prima hermana de "más que una agencia, un socio estratégico".
**Regla:** prohibida salvo que el contraste sea real y verificable.

### A5 · La pregunta retórica y el cierre "¿Listo para…?"
"¿Sabías que el 70% de las búsquedas…?" y el CTA final "¿Listo para empezar?".
**Regla:** una pregunta en una página, y solo si la respuesta es un dato propio real.
El CTA dice qué pasa al hacer clic ("Pedir el diagnóstico de 1 página"), no pregunta
si estás listo.

### A6 · Mayúsculas al estilo inglés
"Diseño Web Profesional En Chile". En castellano el título va en mayúscula inicial y
nombres propios, nada más.
**Regla:** sin Title Case. Ni en H1, ni en botones, ni en nav.

### A7 · El castellano que no es de acá
"Os ayudamos", "coste", "móvil", "ordenador", "vale" — español de España en un sitio
es-CL. Y al revés: modismos chilenos cerrados en un sitio que vende a EE.UU.
**Regla:** el sitio declara `lang="es-CL"` y se escribe en el registro de su ficha.
"Celular", "computador", "costo". Tratamiento (tú / usted) **consistente en toda la
página**: mezclar los dos es el tell más visible de texto cosido por partes.

### A8 · La raya como golpe de efecto
Prohibida por el manual de marca, y es el tell de escritura IA más señalado.
**Regla:** la raya separa una aclaración dentro de una frase, no remata una idea.
Si va antes del punto final y suena a conclusión, se borra.

### A9 · Prueba social que no existe
"Más de 100 clientes satisfechos", "99% de satisfacción", tira de logos, testimonios
con nombre inventado, "nuestro equipo de expertos" cuando el equipo es una persona.
**Regla (innegociable, es regla de marca y además riesgo legal):** cero cifras,
logos, testimonios o plurales de tamaño sin respaldo verificable. Si no hay caso con
permiso, el espacio queda con un hallazgo real generalizado, o no existe.

### A10 · Sobreescritura
La IA escribe de más. El test está en `anti-ai-slop.md`: si borrar 30% del copy
mejora la página, hay que seguir borrando.

---

## B · Estructura de página (los patrones que delatan)

### B1 · Las tres tarjetas idénticas
Icono arriba, título de dos palabras, dos líneas de descripción, por triplicado, con
el mismo borde. Es la forma por defecto de "tenemos servicios".
**Regla:** si los tres servicios no tienen el mismo peso en el negocio, no van con
el mismo peso visual. Una jerarquía real (uno dominante + dos secundarios, o una
lista editorial) lee a decisión; tres cajas iguales leen a plantilla.

### B2 · "¿Por qué elegirnos?" con cuatro razones genéricas
Experiencia, compromiso, resultados, atención personalizada. Lo dice todo el mundo,
o sea que no lo dice nadie.
**Regla:** la sección o se construye con hechos específicos y comprobables, o se
elimina. Casi siempre se elimina y la página mejora.

### B3 · FAQ inventado
Preguntas que nadie hizo, escritas para rellenar `FAQPage`. Estructura correcta,
contenido falso: la IA que lo lea va a citar una pregunta que no es la del mercado.
**Regla:** el FAQ sale de preguntas reales (correos, llamadas, el chat de ventas).
Tres reales valen más que ocho inventadas, y el schema es igual de válido.

### B4 · La fila de métricas
`+500 proyectos · 10 años · 24/7 · 98%`. Ver A9.
**Regla:** cada número con su fuente, o fuera.

### B5 · Formulario de siete campos
Nombre, apellido, empresa, cargo, teléfono, tamaño, presupuesto, mensaje. Nadie lo
llena.
**Regla:** solo los campos que se usan para responder. Cada campo extra se justifica
por escrito.

### B6 · El hero de 100vh con todo centrado
Texto centrado, botón debajo, degradé detrás, nada que mirar. Ocupa una pantalla
completa para decir una frase.
**Regla:** el primer viewport muestra qué se vende, a quién, y la siguiente sección
empezando (un borde de contenido visible invita al scroll). Composición asimétrica
por defecto; el centrado se justifica.

### B7 · El stack de secciones intercambiable
Hero → features → testimonios → CTA → footer, sin que el orden responda a nada.
**Regla:** el orden de las secciones responde al recorrido del brief: qué tiene que
entender el visitante primero para que lo segundo le importe.

### B8 · La cookie de la jerga
Secciones tituladas con el nombre interno del servicio ("AEO/GEO", "Core Web
Vitals") en vez de con lo que el visitante busca.
**Regla:** el título de sección está en las palabras del visitante; el término
técnico aparece después, como precisión.

---

## C · Código y marcado (lo que no se ve en la captura)

### C1 · Sopa de div
Cero landmarks. `<div class="header">` en vez de `<header>`, `<nav>`, `<main>`,
`<section>`, `<footer>`, `<article>`.
**Regla:** un `<main>` por página, un `<h1>` por página, jerarquía de encabezados sin
saltos (no h1 → h3), landmarks reales.

### C2 · Los valores por defecto del modelo
`#6366f1` y familia; `border-radius: 8px` en todo; `box-shadow: 0 4px 6px -1px
rgba(0,0,0,.1)`; `font-family: system-ui` sin elección tipográfica; `transition: all
.3s ease`; `gap: 1rem` en cada grilla; fondo `#f9fafb`.
**Regla:** cada valor sale de la spec, y la spec sale de las referencias. Un valor que
nadie puede justificar es un valor por defecto disfrazado.

### C3 · El degradé-mancha y la tarjeta de vidrio
Blob radial con `filter: blur(80px)` detrás del hero, tarjeta con
`backdrop-filter: blur()` encima. Es el fondo de IA genérica.
**Regla:** solo si una referencia real lo usa y la spec lo registra con su rol.

### C4 · Emoji como icono
Cubierto en `anti-ai-slop.md` (tell #5), se repite acá porque en HTML se cuela en
listas y botones.
**Regla:** SVG inline o set de iconos. Nunca 🚀 ni ✅ en la interfaz.

### C5 · `alt` de relleno
`alt="imagen"`, `alt="foto"`, `alt=""` en una imagen con contenido, `alt="."` (pasó
de verdad: 9 imágenes y ~15 alts numéricos en un sitio de cliente).
**Regla:** el `alt` describe lo que se ve, mirando la imagen. Decorativa real →
`alt=""` + `aria-hidden`.

### C6 · Accesibilidad de adorno
Foco invisible (`outline: none` sin reemplazo), contraste bajo en texto secundario
(gris claro sobre blanco), botones que son `<div onclick>`, formulario sin `<label>`.
**Regla:** foco visible y propio, contraste AA (4.5:1 texto normal, 3:1 el grande),
controles nativos, `label` asociado a cada campo.

### C7 · Peso sin control
Cuatro familias tipográficas con todos sus pesos, imágenes sin dimensionar que
mueven el layout, hero en `lazy` (el default de `<Image>` en Astro, y la causa real
de LCP malo), webfonts sin `font-display`.
**Regla:** las familias y los pesos que usa la spec y ninguno más; `width`/`height`
en toda imagen; hero con `loading="eager" fetchpriority="high"`; `font-display: swap`.

### C8 · La capa de señales ausente
Página nueva sin JSON-LD, sin canonical, sin OG, con el `<title>` de la plantilla.
**Regla:** la fase 1 define la capa de señales y la fase 4 la verifica. Una página
sin structured data es una página que los motores de IA no saben leer, y es
justamente el servicio que vende la casa.

### C9 · Publicar a medias
El archivo nuevo existe pero no está en el índice ni en `sitemap.xml`; o se
sobrescribió un asset sin subir el `?v=N` y el caché sigue sirviendo el viejo (a los
visitantes **y a tu propia verificación**).
**Regla:** publicar toca el archivo, el listado que lo enlaza y el sitemap. Asset
sobrescrito = `?v=N+1` en todas sus referencias.

---

## D · Las pruebas de fuego (pasada final, mirando la captura)

Las de `anti-ai-slop.md` (card, image, brand, copy, identity, editorial) **más**
estas tres, que son de este estudio:

**Prueba del logo tapado.** Tapa el logo y el nav en la captura del primer viewport.
Si la página podría ser de cualquier otra empresa del rubro, el lenguaje visual no
está haciendo trabajo de marca.

**Prueba del rubro cambiado.** Cambia mentalmente el copy por el de otro rubro
(dental, inmobiliaria, software contable). Si la composición sigue calzando perfecto,
es una plantilla, no un diseño para este negocio.

**Prueba del párrafo leído en voz alta.** Lee el hero en voz alta. Si no suena a algo
que una persona diría en una reunión, es prosa de IA. Este es el filtro que atrapa
A1-A5 cuando ya te acostumbraste al texto.

---

## E · Checklist de cierre (va en el acta de QA)

```
COPY            □ sin verbos de folleto  □ sin relleno de apertura
                □ sin tricolon automático  □ sin "no solo X sino Y"
                □ sin pregunta retórica ni "¿Listo para…?"
                □ sin Title Case  □ registro es-CL consistente (tú/usted)
                □ sin raya como remate  □ cero prueba social sin respaldo
                □ borrar 30% no mejora la página
ESTRUCTURA      □ sin tres tarjetas idénticas injustificadas
                □ sin "¿por qué elegirnos?" genérico  □ FAQ con preguntas reales
                □ sin fila de métricas inventadas  □ formulario mínimo
                □ hero no es 100vh centrado vacío  □ orden de secciones justificado
CÓDIGO          □ landmarks + un h1 + jerarquía sin saltos
                □ cero valores por defecto sin justificar (color, radio, sombra, fuente)
                □ sin degradé-mancha ni glass injustificados  □ cero emoji de icono
                □ alt reales  □ foco visible, contraste AA, labels
                □ imágenes dimensionadas, hero eager, font-display
                □ JSON-LD + canonical + OG + title propio
                □ índice y sitemap al día  □ ?v=N subido si se sobrescribió un asset
VISUAL          □ detector de refero-design corrido entero
PRUEBAS         □ logo tapado  □ rubro cambiado  □ leído en voz alta
```

Un ítem se puede dejar abierto **solo con una línea escrita de por qué**. Un ítem
abierto sin justificación es un defecto.
