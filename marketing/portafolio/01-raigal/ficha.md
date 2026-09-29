# Raigal — implantología y rehabilitación oral

> **PIEZA DE CONCEPTO. Raigal no existe.** No es un cliente, no es un caso, y nada de lo
> que dice el sitio ocurrió. Se construyó para mostrar cómo trabaja la agencia en un rubro
> YMYL donde todavía no hay un caso liberado. Las reglas de la serie están en
> [`../README.md`](../README.md).

## Por qué este rubro

Implantología es el mejor primer caso para SpindleLab, por cuatro razones concretas:

- **Es YMYL duro.** Salud, dinero, decisión irreversible. Google y los motores de IA
  aplican su criterio más estricto acá, así que la capa técnica (autoría verificable,
  datos estructurados, contenido citable) no es adorno: es la condición de entrada.
- **El ticket aguanta el trabajo.** Una rehabilitación completa se cotiza en millones de
  pesos. Un sitio que gana esa decisión se paga solo, cosa que no pasa en un rubro de
  ticket bajo.
- **La decisión es lenta y se investiga.** Nadie pone un implante por impulso. Hay semanas
  de búsqueda, comparación y miedo, que es exactamente el terreno donde un motor de IA se
  volvió el primer consultor.
- **Las preguntas son largas y específicas**, que es el formato que un motor de IA cita:
  «¿cuánto cuesta un implante dental en Santiago?», «¿qué pasa si no tengo hueso
  suficiente?», «¿me puedo poner un implante si fumo?». La competencia responde eso con
  una landing de «agenda tu hora», que no es una respuesta.

## La marca ficticia

- **Nombre:** Raigal. Es un adjetivo real del español: «de la raíz, o relativo a ella».
  Se eligió porque conecta con el oficio sin ser una broma dental, y porque es raro
  suficiente para no chocar con una consulta que exista.
- **Posicionamiento:** especialista, no clínica general. Un solo tipo de problema,
  resuelto a fondo.
- **Tono:** preciso y tranquilo. Sin urgencia, sin superlativos, sin promesa de resultado.
  En un rubro donde el paciente llega con miedo, el que baja la voz gana.
- **La idea que ordena el diseño:** *el procedimiento es frío; la decisión no.* De ahí el
  contraste del sistema visual — lienzo hueso cálido para la parte humana, un único acero
  frío reservado a lo técnico (medidas, etapas, datos).
- **Profesional:** Dra. Irene Solar de Pablo, cirujano dentista. **Ficticia.** Sus
  credenciales, su registro y su trayectoria están inventados y se rotulan como tales en
  el propio sitio. En un sitio real esto sería lo primero a verificar, porque la
  publicidad sanitaria en Chile exige que el profesional exista y esté registrado.

## Bloqueo visual (de dónde sale el diseño)

Investigado con Refero antes de componer. Su catálogo tiene poca odontología real, así que
la referencia se armó con tres piezas adyacentes:

| Aporte | Fuente | Qué se toma |
|---|---|---|
| Base | [leandra-isler.ch](https://www.leandra-isler.ch) | Lienzo cálido ámbar-hueso, tipografía enorme y pesada en casi-negro, composición de afiche, aire generoso. Es la consulta de un profesional, no una cadena. |
| Detalle | [spacelab.co.uk](https://spacelab.co.uk) | Fotografía como bloque de borde vivo, vacío grande, rótulos chicos y precisos. |
| Detalle | [abetterlou.com](https://abetterlou.com) | Un solo acento contenido, imagen desaturada, autoridad tranquila de base científica. |

**Lo que se rechaza a propósito:** el azul sanitario, las tarjetas pastel redondeadas, las
fotos recortadas en círculo, el dentista de stock sonriendo con los brazos cruzados, y la
píldora como forma por defecto. Es el aspecto que tiene el 90% del rubro y es justamente
lo que hace que todos se vean iguales.

**Tipografía:** Archivo (titulares, pesada y apretada) + Newsreader (cuerpo, serif). Es
deliberadamente distinta del sistema de SpindleLab (Manrope sola): la voz del sitio es la
del cliente, no la de la agencia. La serif en el cuerpo además aguanta la lectura larga,
que en YMYL es la mitad del trabajo.

## Lo que la pieza demuestra

1. **Un mundo visual propio**, que no es el de SpindleLab. Es el punto de tener portafolio.
2. **La capa AEO completa y visible:** grafo JSON-LD con `Dentist`, `MedicalProcedure`,
   `FAQPage` y `Person` con credenciales; preguntas largas respondidas en formato citable;
   rangos de precio publicados.
3. **Honestidad YMYL como argumento de venta**, no como letra chica: una sección que dice
   qué *no* se puede prometer. Es lo que la competencia no hace y lo que un motor de IA
   premia al elegir a quién citar.

## Estado

- [x] Ficha y bloqueo visual
- [x] Home construida (`sitio/index.html`)
- [x] **Las ranuras de foto se eliminaron.** La primera versión dejaba marcos tramados con
      el rótulo «Ranura 01 · 16:9» y la dirección de arte escrita encima. Eso se lee como
      wireframe, que es exactamente lo que delata una maqueta hecha con IA, y en una pieza
      de portafolio pesa más que la honestidad de dejar el hueco marcado. Se reemplazaron
      por contenido que sí corresponde dibujar: un **corte técnico del implante en el
      hueso**, con cotas reales (Ø 4,1 mm, 10 mm) y leyenda, y una **barra de tiempo a
      escala** donde las anchuras son proporcionales a la duración de cada etapa.
- [ ] **Fotografía, si se suma después.** Mejoraría el hero y la sección de la
      especialista, pero la pieza ya no depende de ella. Higgsfield exige plan de pago
      para generar (no basta con créditos); las alternativas son subir de plan, stock
      dirigido o una sesión real.
- [ ] Páginas internas (procedimiento, la especialista, precios)
- [ ] Revisión humana antes de usar esto con un prospecto
