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

## El hallazgo incómodo — y ya arreglado (la parte que vende sola)

Corrí el chequeo contra mi propio sitio, spindlelab.cl, el 9 de septiembre. **Sacó 36 de
100.** Sin política de privacidad, sin gestor de consentimiento, con GA4 + Meta Pixel
corriendo sin pedir permiso, y el formulario de contacto mandando nombre y correo a un
tercero sin checkbox de consentimiento.

Revisando el formulario para arreglar eso encontré algo peor, sin relación con la ley: un
bug real dejaba el botón "Enviando…" pegado para siempre — el mensaje nunca llegaba a
ningún lado. No hay forma de saber cuántos correos se perdieron así, en silencio, antes de
encontrarlo.

**Lo arreglé todo el mismo día — 12 días después, el 21 de septiembre, spindlelab.cl saca
73 de 100.** Política real, formulario funcionando, consentimiento antes de tratar datos,
Analytics y Meta Pixel bloqueados hasta que alguien dice que sí.

**Por qué contarlo en una llamada:** no es "miren mi herramienta." Es "construí algo tan
honesto que me delató a mí primero, lo arreglé, y acá está el antes y el después." Es el
mismo movimiento que ya funcionó con el chequeo de visibilidad en IA (publicar precios y
método, 1-sep-2026) — mostrar el instrumento en vez de prometer el resultado.

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
4. Si el momento lo permite, cerrar con el antes y después de SpindleLab (36 → 73) — genera
   más confianza que cualquier testimonio, porque no es un testimonio: es una auto-auditoría
   publicada, con el arreglo real detrás.

---

## Borrador de post público (LinkedIn, voz personal singular)

**Estado:** borrador v2 (21-sep, actualizado con el arreglo real). Sin pasar por revisión de
tono ni por Ramón. No publicar tal cual.

### Cuerpo

Hace unas semanas construí un chequeo gratuito para la Ley 21.719, la nueva ley de
protección de datos de Chile.

Antes de publicarlo lo corrí sobre mi propio sitio.

spindlelab.cl sacó 36 de 100.

Sin política de privacidad. Sin gestor de consentimiento. Con Analytics y Meta Pixel
corriendo sin pedir permiso.

Y revisando el formulario de contacto encontré algo peor, sin relación con la ley: un error
en el código dejaba el botón "Enviando…" pegado para siempre. El mensaje nunca llegaba a
ningún lado. No tengo forma de saber cuántos correos se perdieron así, en silencio, antes de
que lo encontrara.

Pasé el día arreglando todo: el formulario, el consentimiento antes de pedir datos, la
política de privacidad, los trackers bloqueados hasta que alguien dice que sí.

spindlelab.cl ahora saca 73.

No lo cuento para presumir un número. Lo cuento porque así funciona esto: construyes el
instrumento, lo apuntas primero a ti mismo, y arreglas lo que encuentra. No lo que se ve
mejor en una reunión de ventas.

Si tienes un formulario de contacto, ya estás tratando datos personales. La ley no
distingue tamaño de empresa.

Lo dejo en el primer comentario, por si quieres ver qué encuentra en el tuyo.

### Primer comentario

Acá está: https://verificaycumple.pages.dev — escribes tu dominio y en segundos sabes qué te
falta. Sin registro, sin guardar lo que revisas.

### Verificación de tono (Renata)

- [ ] Sin em-dash de efecto, sin relleno de transición.
- [ ] Cero cifras sin fuente — 36 y 73 son resultados reales, verificados el 9-sep y el
      21-sep-2026 respectivamente.
- [ ] Sin alarmismo — no menciona la multa máxima, no dice "cumples" ni "no cumples".
- [ ] Voz singular, primera persona — coherente con el corpus (`voz-spindlelab/corpus.md`).
- [ ] Falta: pase de tono de Ramón antes de publicar. **No está listo para salir.**
