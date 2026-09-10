# Caso de éxito — Verifica y Cumple

**Para quién:** apoyo de venta de Ramón (llamadas, y como base de un post público).
**No es un guion cerrado** — son los hechos verificados y cómo usarlos, cada quien lo dice
a su manera en el momento.

## El caso en una línea

Construí una herramienta gratuita que audita en segundos las señales técnicas que exige la
Ley 21.719 (protección de datos personales, Chile) en el sitio de cualquier empresa —
verificada contra el texto oficial de la ley, no contra resúmenes de blog.

## Los hechos (verificados, nada inventado)

- La Ley 21.719 entra en plena vigencia el **1 de diciembre de 2026**. Aplica a cualquier
  organización que trate datos personales, sin importar tamaño — una pyme con formulario de
  contacto ya cuenta.
- El chequeo revisa: política de privacidad enlazada y accesible, HTTPS, idioma declarado,
  gestor de consentimiento reconocido, proveedores externos detectados (Analytics, Meta
  Pixel, etc.).
- Es honesto sobre sus límites: dice explícitamente qué no puede revisar (si un rastreador
  dispara antes o después del consentimiento requiere un navegador real, no solo el HTML) —
  "cuando no podemos verificar algo, lo decimos, nunca asumimos que está bien."
- Nunca certifica cumplimiento. Solo describe señales presentes o ausentes. Es deliberado:
  decirle "cumples" a quien no cumple lo expone a una multa a él y me expone a mí.
- Verificado contra el texto oficial (BCN/Ley Chile) antes de construir — encontré 6
  correcciones sobre lo que circula en blogs de la competencia. La más importante: el mito
  de las "72 horas" para notificar brechas no existe en la ley chilena — es una confusión
  con el RGPD europeo, y varios competidores lo repiten sin haber leído el texto.

## El hallazgo incómodo (la parte que vende sola)

Corrí el chequeo contra mi propio sitio, spindlelab.cl. **Sacó 36 de 100.** Sin política de
privacidad (404 en las cuatro rutas donde debería estar), sin gestor de consentimiento, con
GA4 + Google Tag Manager + Meta Pixel corriendo, y el formulario de contacto mandando nombre
y correo a un formulario de terceros sin checkbox de consentimiento.

No lo escondí. Lo estoy corrigiendo.

**Por qué contarlo en una llamada:** no es "miren mi herramienta." Es "construí algo tan
honesto que me delató a mí primero, y así sabes que no te va a mentir a ti." Es el mismo
movimiento que ya funcionó con el chequeo de visibilidad en IA (publicar precios y método,
1-sep-2026) — mostrar el instrumento en vez de prometer el resultado.

## Cómo se construyó (la prueba técnica)

- Backend real en Cloudflare Pages Functions (`/api/chequeo`), fetch + regex sobre el HTML
  público — sin ejecutar nada, sin acceder a nada privado.
- Dos rediseños de la interfaz, sobre referencias reales del rubro, verificados con
  Playwright (desktop, mobile, dark mode, foco de teclado).
- Marca aparte de SpindleLab, firmada personalmente por Ramón — mismo estándar de "no vendo
  humo", sin diluir el posicionamiento de SEO técnico de la agencia.

## Cómo usarlo en la llamada

1. Si el prospecto trata datos de clientes (estudio de abogados, clínica, cualquiera con
   formulario): mencionar la fecha como hecho, no como amenaza.
2. Ofrecer correr el chequeo ahí mismo, en vivo, sobre su propio dominio.
3. Si sale con hallazgos: no vender el arreglo con miedo a la multa máxima. Durante el
   primer año desde la entrada en vigencia, la Agencia **puede** aplicar amonestación en
   vez de multa a una empresa pequeña, a su criterio (Art. sexto transitorio) — es
   discrecional y tiene fecha de vencimiento, no una garantía. Nombrar la multa máxima como
   si fuera lo que le va a pasar es alarmismo, y se nota; prometer que nunca va a pasar
   también es un error, por la razón contraria.
4. Si el momento lo permite, cerrar con el 36/100 de SpindleLab — genera más confianza que
   cualquier testimonio, porque no es un testimonio: es una auto-auditoría publicada.

---

## Borrador de post público (LinkedIn, voz personal singular)

**Estado:** borrador, sin pasar por revisión de tono ni por Ramón. No publicar tal cual.

### Cuerpo

Hace unos días construí un chequeo gratuito para la Ley 21.719, la nueva ley de protección
de datos de Chile, vigente desde el 1 de diciembre de 2026.

Antes de publicarlo lo corrí sobre mi propio sitio.

spindlelab.cl sacó 36 de 100.

Sin política de privacidad. Sin gestor de consentimiento. Con Google Analytics, Tag Manager
y Meta Pixel corriendo. Y el formulario de contacto mandando nombre y correo a un tercero
sin pedir consentimiento.

Lo primero que pensé fue no publicar el chequeo hasta arreglarlo.

Pero eso es exactamente lo que no quiero que haga nadie: revisar solo después de construir
la herramienta que lo delata. Así que lo dejé arriba, con mi propio resultado incluido, y
ahora estoy corrigiéndolo.

Una pyme con un simple formulario de contacto ya está tratando datos personales. La ley no
distingue tamaño.

El chequeo no certifica que cumples. Nunca lo va a decir, porque no es cierto que revisar tu
HTML pueda saberlo todo. Te dice qué señales técnicas están presentes y cuáles faltan, con
la instrucción de cómo corregir cada una. Y cuando no puede verificar algo, lo dice: no
asume que está bien.

Lo dejo en el primer comentario.

### Primer comentario

Acá está: https://verificaycumple.pages.dev — escribes tu dominio y en segundos sabes qué te
falta. Sin registro, sin guardar lo que revisas.

### Verificación de tono (Renata)

- [ ] Sin em-dash de efecto, sin relleno de transición.
- [ ] Cero cifras sin fuente — el 36/100 es el resultado real, verificado el 9-sep-2026.
- [ ] Sin alarmismo — no menciona la multa máxima, no dice "cumples" ni "no cumples".
- [ ] Voz singular, primera persona — coherente con el corpus (`voz-spindlelab/corpus.md`).
- [ ] Falta: pase de tono de Ramón antes de publicar. **No está listo para salir.**
