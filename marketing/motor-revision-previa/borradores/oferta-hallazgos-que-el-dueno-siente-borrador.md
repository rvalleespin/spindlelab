# Oferta por hallazgos que el dueño siente: BORRADOR para revisión de Ramón (30-oct-2026)

**Estado: borrador de texto; el precio ($149.000 + IVA) ya está decidido, la redacción espera tu revisión.** Decisión de Ramón del 30-oct: los sitios **sin** hallazgo fuerte (cookies antes de preguntar, o formulario sin política) quedan fuera. Por eso esta oferta **no se manda sola**: es la **segunda razón para responder** en sitios que ya tienen un hallazgo fuerte y además uno que el dueño ve. Hoy son 16 de los 23 pendientes con teléfono (`seguimiento/contactos-por-canal-pendientes-fuertes-2026-10-30.csv`, prioridad A).

## Qué hallazgos sirven y cuáles no
| Hallazgo | ¿Se usa? | Por qué |
|---|---|---|
| Enlace roto en la portada (F7) | Sí | Se comprueba en 10 segundos haciendo clic. |
| Portada que descarga mucho (F12) | Sí | Es un número medible: MB al abrirse. |
| Sin contacto a la vista en la primera pantalla (F10, F2) | **No, hasta verificarlo a mano** | El motor a veces no ve un teléfono escrito en el texto ni un botón flotante de WhatsApp. Un falso positivo aquí quema el correo. |
| Formulario que pide demasiado (F14) | No | Es una opinión de diseño, no un hecho. |

## Toque 2 con el segundo hallazgo (correo, respuesta en el mismo hilo)
Nuevo motivo para escribir, no una repetición. Menos de 80 palabras, sin raya larga.

**Variante portada pesada (F12):**
> Hola:
> Te escribí hace unos días por [lo anterior]. Revisando [dominio] vi otra cosa: la portada descarga [X] MB solo al abrirse, sin bajar la página. En un celular con datos eso pesa.
> Eso se arregla: dejo la portada liviana y mido cuánto baja. Cuesta $149.000 + IVA, una sola vez.
> Si quieres, lo vemos en una llamada de 20 minutos.

**Variante enlace roto (F7):**
> Hola:
> Te escribí hace unos días por [lo anterior]. Revisando [dominio] vi otra cosa: en la portada hay un enlace que lleva a una página que no existe (error 404): [dirección].
> Eso se arregla: dejo cada enlace llevando a una página que existe y reviso que no queden más rotos en la portada. Cuesta $149.000 + IVA, una sola vez.
> Si quieres, lo vemos en una llamada de 20 minutos.

(Más la línea de baja de siempre.)

## Versión WhatsApp o llamada (30 segundos)
> Soy Ramón de SpindleLab. Revisé [dominio] y vi dos cosas: [hallazgo fuerte en una frase] y [segundo hallazgo en una frase]. Te mando el detalle de las dos y cómo se arreglan, si quieres. Tu número lo tomé de tu sitio; si prefieres que no te escriba, dime y no insisto.

## Decidido por Ramón (30-oct)
- **Precio de entrada del arreglo puntual: $149.000 + IVA, una sola vez.** Alcance: lo que el correo nombra en la portada (enlaces rotos de la portada, o el peso de la portada). Sin plazo y sin promesa de resultado. Ya está cargado en el motor como `PUNTUAL` (`motor/lib/arreglo.mjs`) para F7 y F12; las mediciones nuevas lo traen en la ficha.
- Los sitios sin hallazgo fuerte quedan fuera.

## Pendiente
1. **Revisión de redacción** de los textos de arriba (siguen siendo borrador hasta que los apruebes).
2. **Para el troncal:** agregar el "Arreglo puntual de la portada, $149.000 + IVA" a `marketing/capacidad-servicios.md` (la sesión del motor no edita ese documento).
3. **F10:** si quieres usarlo, antes se verifica sitio por sitio, como se hizo con los de Vibe.
