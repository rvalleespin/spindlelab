# Lanzamiento de Verifica y Cumple — 23-sep-2026

Todo esto está **escrito y verificado, pero sin enviar ni publicar**. El envío lo hace Ramón.

El sitio sí está publicado: **https://verifica.spindlelab.cl** (el viejo `verificaycumple.pages.dev`
redirige solo).

## Qué hay acá

| Archivo | Qué es | Cuántos |
|---|---|---|
| `correos-hoteles-clinicas/` | Los 12 borradores que ya estaban en Gmail, reescritos | 10 (2 descartados) |
| `correos-abogados-30.txt` | Lote nuevo, para pegar de a uno | 30 |
| `lote-abogados-23sep.csv` | El mismo lote en tabla | 30 |
| `post-linkedin-tres-mitos.md` | Post de la página + comentario del perfil personal | 1 |

## La regla con la que se escribieron

**Cada correo afirma solo lo que se ve abriendo ese sitio en un navegador limpio, sin hacer
un solo clic.** No lo que dice el chequeo automático, que solo lee el código y por eso muchas
veces declina.

Eso importa porque el chequeo y la realidad no coinciden: **awasi.com saca 100/100** y es de
los peores casos reales. El chequeo no ejecuta JavaScript, ve Tag Manager, no puede confirmar
nada y prefiere no acusar. Por eso el correo va con el hallazgo, nunca con el puntaje.

Tres revisiones sucesivas sacaron afirmaciones que no aguantaban una segunda mirada. Las más
instructivas:

- Decir que el Pixel de Meta "recibió la visita" cuando lo único visible es que el script carga
  y deja su cookie. **Cargar, escribir una cookie y enviar datos son tres cosas distintas.**
- Frases que eran ciertas en dos de tres corridas. Si el desarrollador del prospecto abre el
  sitio una vez y no lo ve, el correo queda desmentido. Fuera.
- Conteos que cambiaban al recontar. Se reemplazaron por "todos los enlaces de la portada".

## Descartados, y por qué

- **Ópticas CL Visión**: no tiene sitio. Es una plantilla de WordPress sin terminar.
- **SG Fertility**: el dominio no sirve página (HTTPS roto, 404).
- Del lote de abogados: 8 sin hallazgo, 4 donde el chequeo declinó, y `estudionavarro.cl`,
  que promociona "Protección de datos Ley 21.719" en su propia portada.

## Antes de mandar

1. **Borra de Gmail los 12 borradores viejos.** Enlazan al dominio anterior y cuelgan de la
   fecha del 1 de diciembre. Los de acá los reemplazan.
2. **Ten la lista de exclusión antes del primer envío.** Los 40 correos ofrecen darse de baja
   y la política dice que guardas ese correo para no volver a escribir. Si alguien lo pide,
   hay que cumplirlo.
3. **De a uno, desde tu correo.** Nada de envío masivo.
4. El post va en la página, en plural, y Ramón lo comparte desde su perfil con el comentario
   en singular que está en el archivo. El link, en el primer comentario.

## Pendiente de abogado

La base de legitimidad del punto 04 de la política (`/privacidad/`) dice "interés legítimo"
para el outbound. Es lo habitual, pero es una calificación legal y conviene que la confirme.
