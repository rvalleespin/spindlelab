# Traspaso: turismo y hoteles, listo para sondear (preparado 5-oct-2026)

Decidido con Ramón el 5-oct: **el próximo lote es turismo y hoteles, no más abogados.** La razón
está en `ventas/LEEME-abogados-5oct.md`: en abogados el 12% del lote vende protección de datos y
el vertical rindió 20%. Acá ese riesgo no existe.

**El barrido barato ya está hecho.** La próxima sesión parte directo en las sondas.

## Los 21 leads

Salen de los 35 vírgenes que quedaban en `ventas/virgenes-cruce-5oct.csv`, de dos bancos de
Apollo: `contactos-apollo-CON-GANCHO.csv` (12) y `contactos-apollo-turismo-lote2.csv` (9).
Los nombres y correos están en esos CSV. **Fuente del lead = Apollo**, así que la línea de baja es
la variante de Apollo (sección 6 de la estrategia).

⚠️ No verifiqué si son catch-all. Hay que mirar la columna `estado` de cada CSV antes de escribir:
en abogados los 51 lo eran, y eso explica rebotes.

## Lo que el barrido ya descartó o marcó (5 de 21)

| Dominio | Qué pasó | Qué hacer |
|---|---|---|
| `rosen.cl` | el título es "Rosen Cyber \| Rosen Chile": es la marca de colchones, **no un hotel en Temuco** | descartar, mal etiquetado en Apollo |
| `hotelcarmenere.com` | devuelve 404 con "ConnectYourDomain Error \| Wix.com": **el dominio no está conectado a su sitio** | no es lead de VyC, es ángulo Desarrollo Web |
| `elementos-chile.com` | sin respuesta en los tres prefijos (https, https://www, http://www) | descartar por ahora, reintentar en una semana |
| `aparthotelmontepiedra.cl` | 503 persistente en los tres prefijos: servidor caído | reintentar en una semana |
| `7k-lodge.com` | **403 Forbidden** en los tres prefijos, 358 bytes | la sonda usa Chrome de verdad y puede pasar. Probar con sonda. Si también da 403, el bloqueo **es** el hallazgo, pero del ángulo AEO (invisible a los buscadores y a la IA), no de VyC |

`weskar.cl` daba 000 y **sí responde con `www.`** (46 KB). Está vivo, va a la lista de sondear.

## Los 16 para sondear

Dos corridas cada uno, pasiva de 11 s y después mouse y scroll. `probe.mjs` se recupera con:

```bash
git show 0d685b3:marketing/lanzamiento-vyc-23sep/seguimientos/probe.mjs > probe.mjs
```

Chrome en el puerto 9530, headless, perfil aparte. Uso: `node probe.mjs <url> <slug> <outdir>`.

**Lo que ya sé de los 16, del HTML estático:**

| Dominio | Priv | Form | GA/GTM | Motor de reserva | Aviso de cookies |
|---|---|---|---|---|---|
| `terrantai.com` | 0 | 0 | 13 | SimpleBooking | **sí (Complianz)** |
| `tantakuy.cl` | 8 | 4 | 2 | sí | ninguno |
| `cascada.travel` | 2 | 0 | 13 | — | ninguno |
| `weskar.cl` | 0 | 3 | 5 | Booking.com | ninguno |
| `hoteloceanic.cl` | 0 | 6 | 0 | sí | ninguno |
| `puyuhuapilodge.com` | 0 | 0 | 4 | Cloudbeds | ninguno |
| `suizandina.com` | 0 | 0 | 0 | — | ninguno |
| `chelenko.com` | 0 | 1 | 0 | sí | ninguno |
| `tungulu.cl` | 0 | 1 | 0 | sí | ninguno |
| `aguasdelmonte.cl` | 0 | 0 | 0 | sí | ninguno |
| `hotelcristobalcolon.cl` | 0 | 0 | 0 | Booking.com | ninguno |
| `hotelkennedy.cl` | 0 | 0 | 0 | sí | ninguno |
| `laturbina.cl` | 0 | 0 | 0 | sí | ninguno |
| `taka.cl` | 0 | 0 | 0 | — | ninguno |
| `director.cl` | 0 | 0 | 0 | sí | ninguno |
| `almalodge.cl` | 0 | 0 | 0 | — | ninguno |

## Por dónde atacar, en orden

1. **`terrantai.com` primero.** Es el único con aviso de cookies puesto, y tiene 13 referencias a
   Analytics y Tag Manager. Si el aviso no frena, es el hallazgo más fuerte que existe: el
   prospecto ya decidió que le importa y gastó en ponerlo. En abogados los dos correos más fuertes
   del lote fueron justo de este tipo (`totalabogados.cl` y `soytrabajador.cl`).
2. **`tantakuy.cl`.** Tiene política (8 menciones) y 4 formularios y ningún aviso. Mismo ángulo:
   el texto está escrito y el sitio no lo cumple.
3. **`hoteloceanic.cl`.** Seis formularios, cero mención de privacidad. El formulario es el
   hallazgo que más pesa y es el que usó Ramón en su propio post de LinkedIn.
4. **`weskar.cl`, `puyuhuapilodge.com`, `cascada.travel`.** Analítica cargada y motor de reserva.
5. El resto, que en HTML estático se ven limpios. **Ahí la sonda es imprescindible**, no
   opcional: `director.cl` (2.990 bytes) y `almalodge.cl` (3.970 bytes) son cáscaras JS y el HTML
   no dice nada de lo que realmente cargan.

## El ángulo propio de este vertical, y por qué debería rendir más

En abogados el hallazgo era casi siempre "Analytics cargó sin avisar". Acá hay algo más concreto:
**14 de 16 tienen motor de reserva** (Cloudbeds, SimpleBooking, widgets de Booking.com, formularios
propios). Por ahí pasan nombre, correo, teléfono, fechas y en varios casos el pago, y va a un
tercero.

Eso es más fácil de explicar y se siente más caro que una cookie de medición. **Conviene construir
el correo alrededor del motor de reserva cuando se pueda**, y usar las cookies como el dato de
prueba, no como el titular.

## Las dos cosas que hay que verificar, no suponer

1. **Si el motor de reserva está en un dominio de terceros, hay que comprobar qué recibe.** Vale
   la regla de las tres cosas distintas (sección 3 de la estrategia): que el widget **cargue** no
   es que **reciba** los datos. Decir "tu motor de reservas le manda los datos a X" sin verlo en la
   pestaña de red es exactamente el error refutable en dos minutos.
2. **Fuera de ticket.** `hotelkennedy.cl` ahora es **Wyndham Garden Kennedy**, una franquicia de
   cadena con 1,1 MB de sitio: el que decide probablemente no está en Chile. `puyuhuapilodge.com`
   y `cascada.travel` (EcoCamp Patagonia) son operaciones grandes. No descartar de entrada, pero
   mirar quién es el decisor antes de gastar la sonda. Y recordar que **`awasi.com` saca 100/100
   en el chequeo y es de los peores sitios reales que hemos medido**: en este rubro el puntaje
   miente más que en otros.

## Y los filtros que ya son regla

Antes de escribir, en este orden:

1. **Exclusión por correo Y por dominio** contra `ventas/lista-exclusion.csv` (37 filas). Falla
   cerrado.
2. **Gmail**, que es donde está el estado real: `search_threads` por dominio. Los 21 dieron cero
   hilos al 5-oct, pero hay que repetirlo porque Ramón manda a mano entremedio.
3. **¿Vende lo mismo que nosotros?** En hoteles no aplica, pero el filtro es barato: buscar
   `protección de datos`, `datos personales` y `21.719` en la portada.
4. **Un 200 no es una página.** Para afirmar que alguien tiene o no tiene política, pedir una ruta
   inventada y comparar tamaño y título. Tres dominios de abogados respondieron 200 en las seis
   rutas de política y servían la portada en todo.
5. **Dos corridas.** Lo que cambie entre corridas no entra al correo. Van tres lotes seguidos en
   que la segunda corrida bota una frase.

## Estado del resto del embudo al cerrar el 5-oct

- **21 borradores esperando en Gmail.** Los **11 de ayer están con estrella** (mandar primero);
  los **10 de abogados de hoy, sin estrella** (mandar después). El filtro los separa solo.
- **35 vírgenes** en `virgenes-cruce-5oct.csv`: estos 21 de turismo más 14 de otros rubros
  (3 abogados sueltos, 3 de salud, 2 contadores, 6 del lote de expansión).
- **25 clínicas sin medir** en `ventas/clinicas-sin-contactar-5oct.csv`.
- **14 abogados con sitio vivo sin sondear**, en `ventas/abogados-medidos-5oct.csv`. Antes de
  sondearlos, pasarles el filtro del punto 3.

---

## Cruce contra el lote de hoteles del 25-sep (verificado 13-oct)

El cruce del 5-oct no podía ver este solape, porque el lote del 25-sep **no estaba en ningún
`ventas/*.csv`**: vivía dentro de `marketing/rutinas-prompt-copiloto-2026-09-22.txt`. Ahora está
en `ventas/contactos-hoteles-25sep.csv` (43 direcciones, fuente Apollo).

**Once de los 21 leads de este traspaso son el mismo dominio que alguien del lote del 25-sep:**
`aguasdelmonte.cl`, `almalodge.cl`, `chelenko.com`, `hotelkennedy.cl`, `laturbina.cl`,
`puyuhuapilodge.com`, `suizandina.com`, `taka.cl`, `tantakuy.cl`, `tungulu.cl`, `weskar.cl`.

**Verificado en Gmail: ninguno de los once recibió correo nunca.** El lote del 25-sep fue una
cosecha de 43 de la que solo se contactó a una parte (Awasi, Hoteles Cumbres, Time, Patagonia Camp,
Las Torres, Casa Higueras, Puerta del Sur, Glampi, Hotel Alaia, Las Majadas, Cascada de las Ánimas,
Santuario del Río, Luna de Pirque y Hare Nua, todos ya en tope). **Los 21 siguen vírgenes.**

⚠️ **Pero ojo con la dirección:** para esos once, el lote del 25-sep tiene un contacto distinto al
del banco de Apollo que usa este traspaso. Ejemplo: en el 25-sep weskar.cl figura como
`juanjose@weskar.cl`. Son dos personas de la misma empresa. **Se escribe a una sola**, y el tope de
3 es por empresa, no por casilla. Antes de escribir, revisar las dos direcciones del dominio.

La línea de baja es la variante Apollo en los dos casos, así que eso no cambia.

---

## Resultado de las sondas (13-oct, dos corridas)

Los 16 sondeados, dos corridas cada uno. **Quince de dieciséis dieron el mismo conteo en las dos.**
Detalle en `ventas/turismo-medidos-13oct.csv`.

**5 escritos:** `cascada.travel`, `terrantai.com`, `hoteloceanic.cl`, `weskar.cl`,
`puyuhuapilodge.com`.

**El rendimiento del vertical: 5 de 21, un 24%.** Apenas mejor que abogados (20%) y bastante peor
de lo que la pinta del barrido sugería. La causa no es el prospecto, es que **nueve de los
dieciséis estaban limpios o casi**: cero a tres cookies, y de infraestructura.

### Lo que no sobrevivió, y es la parte útil

- **`hoteloceanic.cl` cambió entre corridas:** 4 pasivas y 9 al gesto la primera vez, 9 pasivas
  la segunda. **Lo estable es el total de nueve, no el momento.** El correo dice nueve y no dice
  "cuatro quieto y nueve al moverte".
- **`weskar.cl` y `puyuhuapilodge.com` cargan SiteMinder y Cloudbeds, pero solo archivos** (CSS,
  JavaScript, tipografías) y **sin dejar una sola cookie del motor**. Decir que su motor de
  reservas recibe datos habría sido el error refutable en dos minutos. Los correos no lo dicen.
- **`hotelcristobalcolon.cl` tenía Booking.com en el HTML estático y CERO peticiones a Booking en
  el navegador real.** Era un enlace o un sello, no un widget.
- **`7k-lodge.com` da 403 también en Chrome de verdad:** 2 peticiones y la pantalla de error. El
  bloqueo es real y es hallazgo de AEO, no de VyC.

> **La corrección al ángulo del vertical:** el barrido estático decía que 14 de 16 tenían motor de
> reserva, y de ahí salió la idea de construir el correo alrededor de eso. **Medido en el
> navegador, el motor solo deja rastro en uno: `cascada.travel`.** En los demás carga y no escribe
> nada. El ángulo del motor de reservas sirve, pero hay que ganárselo caso a caso.

### Los que no se escribieron

- **`tantakuy.cl` ya cumple:** cero cookies en los dos tramos y las dos corridas, con 137
  peticiones, política publicada y formularios con casilla. Segundo sitio chileno del pipeline que
  llega en orden, después de `estudioveragua.cl`.
- **Sin hallazgo** (todo cookie de infraestructura o de sesión): `hotelkennedy.cl` —que además es
  franquicia de cadena—, `almalodge.cl`, `taka.cl`, `aguasdelmonte.cl`, `hotelcristobalcolon.cl`,
  `laturbina.cl`.
- **Hallazgo flojo, medidos y sin escribir:** `chelenko.com` y `tungulu.cl`, con un formulario sin
  política cada uno y cero cookies.
- **`director.cl` es ángulo de Desarrollo Web:** renderiza 4,4 KB con un nombre, un teléfono de
  reservas y un Instagram. No es un sitio. Y Apollo lo tiene como `45bydirector.com`, que está
  caído: el dominio vivo es `director.cl`.

---

## ⚠️ Volumen del 13-oct: 27 correos en un día

Los cinco de turismo salieron el 13-oct a las 22:32. Ese mismo día ya habían salido 19 a las
16:03-16:05 (la tanda de toque 2 del copiloto, con los duplicados incluidos) y 3 más a las 22:32
(Río León, ICCS y el toque 3 de Explora).

**Total del día: 27 correos desde hola@spindlelab.cl**, en dos ráfagas de minuto y medio cada una.

La rampa documentada es de **15 → 30 → 50 por semana**, y la nota dice textual: *"es reputación de
dominio, no capacidad de producción; no se excede aunque se puedan generar más"*. Veintisiete en
un día es media semana de tope en una tarde.

Y el patrón importa tanto como el número: **muchos correos casi idénticos en noventa segundos** es
justo lo que puntúan los filtros. Sumado a que tres destinatarios recibieron el mismo correo dos
veces ese día, es la peor combinación posible para la reputación del dominio.

**No hubo rebotes al cierre del 13-oct.** Pero el daño de reputación no se manifiesta como rebote:
se manifiesta como entrega a spam, que es invisible desde acá.

> **Lo que conviene hacer:** no enviar nada el 14 ni el 15. La corrida del copiloto del 14 va a
> dejar borradores; que se queden en la carpeta. Y cuando se retome, de a pocos y espaciados, no
> en ráfaga.
