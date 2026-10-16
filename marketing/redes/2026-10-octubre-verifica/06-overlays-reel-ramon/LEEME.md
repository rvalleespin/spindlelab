# Overlays del reel cara a cámara de Ramón — sistema de Verifica

**16-oct-2026.** Cuatro overlays nuevos + la tarjeta de cierre que ya existía.
**Sistema visual: Verifica y Cumple.** Archivo Black, acento lima. Nada de SpindleLab acá.

## Los cinco momentos

| # | Archivo | Qué dice | Entra cuando Ramón dice |
|---|---|---|---|
| 1 | `overlay-0.png` | ¿HACE CUÁNTO QUE NADIE LO REVISA? · *Tu sitio web lleva años igual.* | desde el primer fotograma |
| 2 | `overlay-1.png` | **LEY 21.719** · LLEGÓ LA LEY. · *Si tu sitio tiene un formulario de contacto, te incluye.* | «Ahora hay una **ley**…» |
| 3 | `overlay-2.png` | ¿Y A QUIÉN LE PREGUNTAS? · *El que te hizo el sitio ya no está.* | «…a quién **preguntarle**» |
| 4 | `overlay-3.png` | **LO QUE HAGO** · NO NECESITAS UNO NUEVO. · *Necesitas que alguien lo mire y te diga qué le falta.* | «Y casi nunca es **así**» |
| 5 | `../05-overlays-video/recuadro-sitio-cuadro.png` | REVISA EL TUYO EN · **verifica.spindlelab.cl** · Sin registro. | «Hice un chequeo **gratis**…» |

Los cuatro primeros duran 3,5 s. El quinto se queda hasta el final.

## Disciplina del acento, contada

Igual que en el reel publicado: **lima 3 usos** (las dos etiquetas y la tarjeta de cierre),
**azul 0, rosa 0.** No se reparten tres acentos en una pieza.

## Verificado, no asumido

- Los cuatro PNG tienen **color-type 6 (RGBA)**, comprobado leyendo la cabecera del archivo.
- Las dos `.woff2` de Archivo Black están copiadas en esta carpeta y referenciadas relativas.
  Sin la `-ext` no salen las tildes ni la eñe, y este reel lleva É, Á, Ó y Ú en los titulares.
- **Compuestos sobre el fotograma real de Ramón**, no sobre un fondo de control:
  `PRUEBA-sobre-el-video.jpg`.

## Lo que hay que resolver en el montaje

**El texto va abajo, igual que en el reel publicado, y ahí también van los subtítulos.** Durante
esos cuatro tramos, o se ocultan los subtítulos o se suben. **No se superponen**: el overlay ya
dice la idea, y el subtítulo repitiéndola debajo es ruido.

A favor: la parte baja del cuadro mide **83 de luminancia media**, así que el texto blanco con su
sombra se lee sin necesidad de caja.

## Qué cambió respecto a la plantilla

- Titular en `--t-linea` normal (120 px) y no en `grande` (168): el primero son tres líneas y a 168
  se salía del cuadro.
- La etiqueta se oculta sola cuando va vacía, para que no deje un hueco sobre el titular.

## Reglas de contenido respetadas

Sin multa como gancho · sin «cumples» ni «no cumples» · sin prospecto, cliente ni competidor
nombrado · cero rayas largas · el dominio escrito completo, nunca «link en la bio».
