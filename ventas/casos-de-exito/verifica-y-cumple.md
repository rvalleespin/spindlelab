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
- **Es un servicio de SpindleLab** (decisión de Ramón, 21-sep-2026, que revirtió el "Camino
  B" de marca aparte). El responsable del tratamiento en la política de privacidad es
  **SpindleLab SpA, RUT 78.474.925-8**, no Ramón como persona natural (confirmado por Ramón
  el 21-sep). Para la llamada: **tanto el kit como la suscripción se facturan por la SpA** —
  son ofertas nuevas, así que caen del lado nuevo de la regla de corte del 24-jul.

## Cómo se cobra

Ambos precios están publicados en el sitio (mismo estándar de transparencia que el resto de
SpindleLab) — no hace falta cotizar en la llamada, solo confirmar el alcance.

- **Kit de implementación — desde $149.000 + IVA, una vez.** Instalación y configuración de
  un gestor de consentimiento, ajustes técnicos según lo que el chequeo detecte, plantilla de
  política de privacidad (para que la revise su abogado) y verificación final con el mismo
  chequeo. No incluye asesoría legal; el valor se ajusta según lo que el chequeo real
  muestre.
- **Suscripción de vigilancia — desde $39.000 + IVA al mes, mínimo 2 trimestres.**
  Re-chequeo trimestral automático, alerta si el puntaje baja (alguien agregó un tracker o
  algo del banner se rompió sin que nadie lo note) y el registro de actividades de
  tratamiento al día. **No reemplaza el kit — lo sostiene.** El cumplimiento no es
  instalar y olvidar: un sitio cambia, y las señales se pueden volver a romper.

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
5. La suscripción se ofrece **después** de cerrar el kit, no antes — es el paso siguiente
   ("esto lo deja arreglado hoy; la suscripción es para que se mantenga así"), no una venta
   aparte que compite por atención con el arreglo puntual.

---

## Post público (LinkedIn, página de SpindleLab — voz plural)

**Estado: ✅ publicado el 21-sep-2026** por la página de SpindleLab
(`urn:li:activity:7507924615218823168`), con el link del chequeo en el primer comentario,
también como página. Texto v3, reescrito en registro plural después de que Ramón decidiera
que Verifica y Cumple es un servicio de SpindleLab, no un proyecto suyo aparte. Calibrado
contra `voz-spindlelab/corpus.md` (pieza plural del 1-sep). Queda transcrito acá tal como
salió; el canon de voz está en el corpus.

### Cuerpo

Publicamos un chequeo gratuito para la Ley 21.719, la nueva ley de protección de datos de Chile.

Antes de publicarlo lo corrimos sobre nuestro propio sitio.

spindlelab.cl sacó 36 de 100.

Sin política de privacidad. Sin gestor de consentimiento. Con Analytics y el Pixel de Meta corriendo antes de que nadie diera permiso.

Y revisando el formulario de contacto para arreglar eso apareció algo peor, sin relación con la ley: un error en el código dejaba el botón "Enviando…" pegado para siempre. El mensaje no llegaba a ninguna parte. No tenemos cómo saber cuántos correos se perdieron así, en silencio, antes de que lo encontráramos.

Pasamos el día arreglando todo: el formulario, el consentimiento antes de pedir datos, la política de privacidad, los rastreadores bloqueados hasta que alguien dice que sí.

spindlelab.cl ahora saca 73.

No lo contamos para presumir un número. Lo contamos porque así funciona esto: construyes el instrumento, lo apuntas primero a ti mismo, y arreglas lo que encuentra. No lo que se ve mejor en una reunión de ventas.

Si tienes un formulario de contacto, ya estás tratando datos personales. La ley no distingue tamaño de empresa, y entra en plena vigencia el 1 de diciembre de 2026.

Dejamos el chequeo en el primer comentario, por si quieres ver qué encuentra en el tuyo.

### Primer comentario

Acá está: https://verificaycumple.pages.dev

Escribes tu dominio y en segundos sabes qué te falta. Gratis, sin registro, y no guardamos el dominio que revisas. Cada señal que no pases viene con la instrucción de cómo corregirla.

### Verificación de tono

- [x] Registro plural, la marca explicando lo que entrega. No mezcla con la historia
      personal de Ramón (que era el problema de la v2, ya desactualizada por la decisión
      de marca).
- [x] Cero guiones largos de efecto y cero transiciones de relleno.
- [x] Abre con un hecho pelado ("Publicamos un chequeo gratuito..."), cierra bajo ("Dejamos
      el chequeo en el primer comentario"), como las dos piezas del corpus.
- [x] Dice la parte incómoda: que el instrumento nos delató a nosotros primero, y que hubo
      correos perdidos sin saber cuántos.
- [x] Cifras reales y verificadas: 36 (9-sep) y 73 (21-sep), medidas con el chequeo público.
- [x] Sin alarmismo: no menciona la multa máxima, no dice "cumples" ni "no cumples".
- [x] Pase de tono de Ramón: dado el 21-sep ("sí, reescríbelo para la voz de SpindleLab"
      → "dale, súbelo a la página de SpindleLab").

### El perfil personal de Ramón: publicado, con otro ángulo

Salió por la página, así que el post personal no podía repetir el mismo texto en singular.
Se escribió uno nuevo, con un ángulo distinto: **el chequeo se niega a decir si alguien
cumple, y esa misma regla le quita a Ramón un punto en su propio sitio que él elige no
arreglarse.** ✅ Publicado el 21-sep (`urn:li:activity:7507936204286308353`); texto en
`marketing/redes/2026-09-septiembre/21-dom-personal-no-certifico/publicar.md`.

**Sirve también en la llamada,** aunque no se publique: es la respuesta corta a "¿y esto me
certifica que cumplo?". No, y el porqué es lo que hace que el resultado valga. **Sin decidir todavía.**
