# Abogados: los 51 vírgenes, medidos hasta el final (5-oct-2026)

Banco: `ventas/abogados-medidos-5oct.csv`. Origen de los leads: `ventas/contactos-abogados-santiago.csv`
(cosecha de Apollo). **Los 51 son todos los abogados que quedaban vírgenes** después del cruce
del 5-oct. Ninguno choca con `lista-exclusion.csv`, y Gmail no devuelve hilo para ninguno de los
dominios: verificado por búsqueda antes de escribir.

**Todos los correos del CSV son catch-all.** El MX acepta cualquier dirección, así que la casilla
puede no existir. Es la causa de los tres rebotes duros del lote de DiarioEmprende. Hay que contar
con rebotes acá también.

## El resultado en una línea

De 51 vírgenes salieron **10 correos**. Eso es un 20%, bastante peor que la merma del 69% que
tenía estimada. **El vertical de abogados rinde menos de lo que la lista sugiere**, y abajo está
el por qué.

| Estado | N |
|---|---|
| borrador escrito | 10 |
| falta medir con sonda | 14 |
| sitio caído (el dominio no sirve página) | 5 |
| sin hallazgo (0 a 2 cookies en las dos corridas) | 5 |
| **fuera de perfil: vende protección de datos** | **5** |
| medido, hallazgo flojo, sin escribir | 4 |
| fuera de perfil: no es Chile | 2 |
| ya cumple, no es prospecto | 1 |
| fuera de perfil: área de datos en el estudio | 1 |
| fuera de ticket (estudio grande) | 1 |
| fuera de perfil: mal etiquetado en Apollo | 1 |
| ángulo Desarrollo Web, no VyC | 1 |

## La trampa propia de este vertical

**Cinco de 51 venden protección de datos.** No es un detalle: son abogados, y la 21.719 es la
oportunidad comercial del año en su rubro. `fontaineycia.cl` ofrece su propio instrumento para
medir la preparación de una empresa ante la ley. `altlegal.cl`, `peritum.cl`,
`schneiderabogados.cl` y `vmklegal.cl` la tienen como área de práctica. Escribirles sería
ofrecerle el servicio al competidor.

Sumado a `obh.cl`, donde un socio tiene diplomado en protección de datos, son **6 de 51 (12%)**
que hay que descartar por esto. En clínicas esto no pasaba nunca.

> **Regla para los próximos lotes de abogados:** antes de sondear, buscar en la portada
> `protección de datos`, `datos personales` y `21.719`. Si aparece como área de práctica o como
> servicio, el lead se descarta sin gastar la sonda. Si aparece solo en el pie (política propia)
> o en el CV de un socio, se evalúa aparte.

## Y una sorpresa que vale anotar

**`estudioveragua.cl` tiene el consentimiento bien implementado.** No es que tenga el aviso puesto:
el código inyecta Analytics **solo si la persona acepta**, el rechazo no carga nada, y la decisión
se puede cambiar desde el pie. La sonda devolvió 0 cookies y solo pedidos de tipografía. Es el
primer sitio chileno de los que hemos medido que está de verdad en orden.

No es prospecto de VyC. Podría serlo del resto del motor, pero eso es otra conversación.

## Lo que midió la sonda, y lo que no sobrevivió

Dos corridas por sitio, pasiva de 11 s y después mouse y scroll. **Nueve de los diez correos
tienen el mismo conteo en las dos corridas.** El décimo no:

- **`castaneda.cl` dio 10 cookies en la primera corrida y 6 en la segunda.** Las cuatro que
  desaparecieron eran las del componente del slider. El correo se reescribió: quedó el hecho que
  sí es estable en ambas corridas (el sitio carga un componente desde un CDN gratuito de terceros,
  `slider.bestfreecdn.com`) y se sacó el número de cookies.

También se cayeron dos afirmaciones antes de escribirse:

- **`chll.cl` "usa la versión vieja de Analytics que Google abandonó".** Falso: tiene la cookie
  de una propiedad antigua **y** una propiedad nueva. Tener las dos no es usar solo la vieja.
- **`atasociados.cl`, `betancourtabogados.cl` y `rgcabogado.cl` "tienen política de privacidad".**
  Los tres responden 200 en `/politica-de-privacidad/`, `/privacidad/`, `/privacy-policy/` y en
  cualquier ruta inventada: sirven la portada en todo. **Un 200 no es una página.** Se comprobó
  pidiendo una ruta que no existe y comparando el tamaño y el título.

> **Regla:** para afirmar que alguien tiene política, hay que leer la página, no el código HTTP.
> La prueba es pedir una ruta inventada: si devuelve lo mismo, no hay política.

## Los 10 que se escribieron, y con qué hallazgo

Cada uno lleva un hallazgo distinto a propósito, para que el lote no se lea como plantilla.

| Dominio | El hallazgo que lleva el correo |
|---|---|
| `acia.cl` | formulario pide nombre, correo y teléfono sin decir para qué; 8 cookies; sin aviso |
| `defiendete.cl` | la portada promete cumplimiento estricto de la 21.719 y hay grabación de sesión activa sin aviso; el formulario pide RUT |
| `defensaempresarial.cl` | Google y LinkedIn reciben la visita; 2 formularios sin finalidad; sin aviso; es estudio penal |
| `totalabogados.cl` | **tiene** política y aviso, y aun así 49 cookies antes de cualquier clic; 4 de los destinos no están nombrados en la política |
| `soytrabajador.cl` | **tiene** aviso y no frena nada: 11 cookies sin tocarlo |
| `castaneda.cl` | un componente de la portada se carga desde un CDN gratuito de terceros |
| `corralygarcia.cl` | 15 avisos a la plataforma en 10 segundos; 6 cookies; sin aviso |
| `chll.cl` | 8 cookies, dos de reconocimiento de visitante recurrente; sin aviso |
| `ehabogados.cl` | 2 formularios sin finalidad declarada |
| `sycabogados.cl` | formulario sin casilla ni finalidad, y el rubro es delitos sexuales |

Los dos de "tiene aviso y no frena" son los más fuertes del lote: el prospecto ya decidió que le
importa, gastó en ponerlo, y no está funcionando. No hay que convencerlo de nada.

**Los 10 quedaron en Gmail SIN estrella**, a propósito: los 11 de ayer están **con** estrella.
Así los dos lotes no se mezclan en el filtro.

## Lo que queda para la próxima sesión

- **14 sitios vivos sin sondear.** Son los que no entraron en los dos lotes de hoy. Antes de
  sondearlos, pasarles el filtro de "¿vende protección de datos?".
- **3 de esos 14 son cáscaras JS** (`janaabogados.cl` 2,2 KB; `atasociados.cl` 12,8 KB;
  `betancourtabogados.cl` 2,8 KB). El HTML casi no trae nada, así que solo la sonda dice si
  renderizan algo.
- **`lmabogados.cl`** menciona "datos personales" 15 veces. Hay que ver si es su política propia o
  un área de práctica antes de decidir.
- **4 medidos con hallazgo flojo** (`arellanodonoso.cl`, `zegersycia.cl`, `bsslegal.cl`,
  `gcia.cl`): 3 a 5 cookies y sin aviso. Es cierto y es poco. Se pueden escribir, pero el hallazgo
  se parece demasiado entre los cuatro.
- **`recursoslaborales.cl`** tiene el sitio con el título "website under connstruction" (con la
  errata incluida). No es lead de VyC, es lead de Desarrollo Web.

## Lo que esto dice del embudo

El cuello de botella sigue siendo la medición, no la lista. Pero este lote agrega un dato que
cambia la cuenta: **en abogados, la merma es del 80%, no del 69%.** De los 111 vírgenes que
quedaban, los 51 de abogados rinden menos por lead que el resto.

Si el próximo lote de abogados rinde parecido, conviene mover el esfuerzo a un vertical donde el
prospecto no venda lo mismo que nosotros.
