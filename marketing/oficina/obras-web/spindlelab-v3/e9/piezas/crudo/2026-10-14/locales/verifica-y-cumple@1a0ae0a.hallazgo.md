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

