# Motor de revisión previa: la jerarquía (v0, para aprobar antes de construir)

**Escribe:** sesión de construcción del motor · 14-oct-2026 · rama `claude/motor-revision-previa-build`
**Reporta a:** el troncal · **Encargo:** `marketing/encargos-otras-sesiones/encargo-motor-revision-previa.md`
**Reglas que mandan sobre este documento:** `estrategia-outbound-verifica-y-cumple.md` §2 y §3 (y las
trampas de medición del §14, que son consecuencia directa de §3).
**Estado:** nada construido. Este documento es la primera entrega y se aprueba antes del código.

---

## 0. Lo que necesita decisión de Ramón antes de construir

Cuatro puntos donde el encargo, aplicado al pie de la letra, se contradice o deja un hueco. Cada
uno tiene una propuesta; si no hay respuesta, construyo con la propuesta.

| # | Punto | Propuesta | Riesgo de la propuesta |
|---|---|---|---|
| D1 | El **bloqueo en el borde** figura como molde de capa 2, pero el encargo §3 dice que hay chequeos gratis que lo sondean, y el chequeo propio también (#3, peso 8). Por la condición 4, eso es capa 1. | Cuenta como capa 2 **solo cuando el motor nombra la capa que lo causa** (regla de Cloudflare, WAF del hosting, plugin de seguridad). Sin causa nombrada es capa 1. | Menos prospectos califican. |
| D2 | El orden de la casa (**acceso > entidad > citabilidad**, contacto primero) solo cubre la línea de visibilidad en IA. No dice dónde van los rastreadores previos al consentimiento ni la medición. | Contacto roto > acceso con causa > rastreadores antes del consentimiento > medición > entidad > duplicado indexado (§4). | Dejo segundo lugar a lo que no tiene historial y tercero a lo único probado en campo. Si prefieres lo probado primero, los rastreadores suben al segundo lugar y nada más cambia. |
| D3 | **Contacto roto.** "No hay formulario" es visible, así que no es capa 2. "Hay formulario y no entrega" sí lo es, pero probarlo exige enviar el formulario, y el motor no manda nada. | El motor solo detecta rotura **estructural** (destino que responde 404, correo de contacto cuyo dominio no tiene MX). Nunca envía un formulario de prueba. | Esta rama saldrá rara. Es lo honesto. |
| D4 | **Dónde corre.** El encargo pide sesión local en el Mac. Esta es cloud: tiene Chromium y salida a internet, pero por un proxy y con IP de datacenter. | Construyo aquí las pasadas 0 a 3. Todo lo que corra desde aquí sale como **sospecha**; la confirmación a mano y la sonda de borde se repiten en el Mac. | Las 10 corridas no pueden declarar "capa 2 confirmada" desde aquí. |

---

## 1. La frontera, en una tabla

| El motor SÍ | El motor NO |
|---|---|
| Descarta con motivo (excluido, no responde, sitio en orden). | Verifica. La palabra `verificado` la escribe un humano que abrió el sitio. |
| Dice **dónde mirar**: URL, tramo, qué cookie, qué petición. | Escribe el correo. Emilia escribe, Ramón envía. |
| Guarda la evidencia cruda (capturas, cookies, peticiones) de cada corrida. | Emite un puntaje hacia afuera. El puntaje filtra candidatos y no sale de la ficha interna. |
| Declara cuándo **no concluye** ("el HTML no alcanza", "ambas respuestas fallan"). | Envía formularios, escribe o contacta al prospecto, de ninguna forma. |
| Devuelve `sin-gancho` cuando no hay nada verdadero que decir. | Redondea o completa una evidencia para que el hallazgo quede mejor. |

---

## 2. Qué se mira y en qué orden: cinco pasadas, de la más barata a la más cara

Cada pasada puede **cortar** y salir con motivo. Ninguna pasada posterior corre sobre un sitio que
una anterior descartó.

### Pasada 0: corte previo (segundos, sin navegador)

1. **Exclusión**, por correo **y** por dominio, en `ventas/lista-exclusion.csv`. Solo lectura. La
   baja es de la empresa, no del buzón.
2. **El dominio responde** y es el sitio propio del negocio (no una red social, un directorio ni un
   parking).
3. **Marca si el HTML alcanza.** Un HTML casi vacío con un contenedor de aplicación significa que
   la pasada 1 no puede concluir nada. Es el caso awasi.com del encargo §2: el chequeo leyó HTML y
   dio 100/100. Ese sitio pasa a la pasada 2 con la nota `html-no-alcanza`.

### Pasada 1: capa 1, solo HTTP, sin ejecutar JavaScript

Lo que cualquier herramienta gratis también ve. **No produce ganchos; produce un mapa y punteros.**

- Ruta de contacto presente: formulario (y su destino), `tel:`, `mailto:`, enlace de WhatsApp, agenda.
- Analítica instalada: identificadores de Tag Manager, GA4, Ads, Meta, otros.
- Enlace a política de privacidad o aviso de cookies **en el HTML** (sin darlo por cierto: ver trampa 1 del §14).
- `robots.txt` para los agentes de IA, `llms.txt`, sitemap, JSON-LD de entidad.
- Con eso decide **qué líneas son relevantes** (Desarrollo Web, Acompañamiento, Visibilidad en IA,
  Verifica y Cumple) y qué pasadas posteriores valen la pena.

### Pasada 2: navegador, dos tramos, dos corridas

Es §3 al pie de la letra. Contexto nuevo por corrida, sin un solo clic.

- **Tramo A:** unos 11 s quieto. **Tramo B:** mouse y rueda, sin clics, y espera.
- Se registra **por tramo y por separado**: peticiones por destino, cookies (nombre, quién la
  escribe), parámetro `gcs`/`npa` de las peticiones a Google, captura de pantalla (A, B y primera
  pantalla) y el DOM ya ejecutado.
- **Las tres cosas que no son lo mismo van en columnas distintas:** el script *cargó*, *dejó una
  cookie*, *envió datos*. El motor no tiene un campo que las junte.
- **Quién escribe una cookie** se atribuye al script, no al dominio. Que `_ga` quede en tu dominio
  no la hace tuya: la escribe Google.
- **Reuso, no reescribo:** la base es `marketing/lanzamiento-vyc-23sep/seguimientos/probe.mjs`, que
  ya hace los dos tramos por CDP. Se le agrega la lectura de `gcs`, la atribución de cookies y la
  salida estructurada.

### Pasada 3: sondas dirigidas (solo corren si 1 o 2 dejaron el puntero)

| Sonda | Qué hace | Por qué no es redundante con el chequeo propio |
|---|---|---|
| **Borde** | Pide la portada con el agente de un navegador normal y con cada agente de IA que usa el chequeo. Compara. Decide por la **diferencia**, nunca por el valor absoluto. | Las corridas del 31-ago documentan que tras Cloudflare el chequeo corre de Worker a Worker y **no ve** las reglas de bots del borde (29 de 38 inmobiliarias estaban tras Cloudflare). |
| **Contenedor de medición** | Si hay un contenedor de Tag Manager, lo descarga y lee qué etiquetas y qué disparadores tiene. | Ningún chequeo gratis lo lee. Es la parte que exige oficio. |
| **Entidad dentro del sitio** | Compara el nombre en `<title>`, `og:site_name`, JSON-LD (`name` y `legalName`), pie de página y texto de la política. | El cruce con la ficha de Google y con LinkedIn **no se automatiza**: queda como puntero para la pasada a mano. |
| **Contacto estructural** | Pide por GET el destino declarado del formulario (404 = roto, 405 = vivo) y revisa si el dominio del correo de contacto tiene MX. | Un GET no es un envío. |
| **Duplicados** | Subdominios desde los registros públicos de certificados, si responden y si traen `noindex` o canónica. | **No entra en la primera versión.** Es el candidato más flojo (§3, C6); se construye si las 10 corridas lo piden. |

### Pasada 4: veredicto (cuatro condiciones, estado de evidencia y orden)

Aplica el test del §3 a cada candidato, **escribiendo la razón de cada condición**, no un puntaje.
Luego aplica las reglas de decisión del §4. El detalle de la ficha de salida va en el §7.

---

## 3. Los candidatos de capa 2, con el test de las cuatro condiciones

**Condiciones** (encargo §4-bis): **1** no se ve mirando el sitio · **2** cuesta plata o riesgo hoy,
en una frase · **3** el prospecto lo comprueba cuando se le dice dónde mirar · **4** exige oficio,
no una llamada a una API.  ✔ cumple · ◐ cumple a medias o con condición · ✘ no cumple.

| ID | Candidato | Línea | 1 | 2 | 3 | 4 | Dónde mirar (lo que se le señala) |
|---|---|---|---|---|---|---|---|
| **C5** | Ruta de contacto que existe y no entrega | Desarrollo Web | ✔ | ✔ | ◐ | ◐ | El destino del formulario. Solo rotura estructural; probar la entrega exige enviarlo (D3). |
| **C3** | Agentes de IA expulsados en el borde aunque `robots.txt` los permita | Visibilidad en IA | ✔ | ◐ | ◐ | ◐ | Respuesta del servidor según el agente, con la capa causante nombrada (D1). |
| **C1** | Rastreadores que escriben antes del consentimiento | Verifica y Cumple | ✔ | ✔ | ✔ | ✔ | Cookies del sitio a los ~10 s sin aceptar nada, y en el tramo con movimiento. |
| **C2** | Medición que no mide | Acompañamiento | ✔ | ✔ | ◐ | ✔ | El contenedor de Tag Manager y los eventos que el sitio envía. |
| **C4** | Entidad partida | Visibilidad en IA | ✔ | ◐ | ✔ | ◐ | Buscar el nombre del negocio y comparar sitio, ficha de Google y LinkedIn. |
| **C6** | Subdominio o staging viejo indexado | Visibilidad en IA | ✔ | ◐ | ✔ | ◐ | `site:` sobre el subdominio. |

### Notas de cada uno (lo que la tabla no cabe)

**C1, rastreadores antes del consentimiento.** Es el único de los seis que cumple las cuatro limpio
y el único con caso probado en campo. Reglas que lo acotan, todas de errores reales:
- Se describe la **señal**, no la obligación: "no hay aviso y se escribieron estas cookies", nunca
  "la ley exige".
- **Cargó ≠ dejó cookie ≠ envió datos.** Meta es el caso típico: carga y deja cookie sin llegar a enviar.
- **Consent Mode:** una petición a Google con `gcs=G100` es consentimiento *denegado*, y el aviso
  del sitio sí está bloqueando. `G111` es concedido; sin `gcs`, no hay Consent Mode. Se mide
  contando **cookies de medición** (`_ga`, `_gcl_au`, `_fbp`), no solo peticiones.
- **"No tiene aviso" no se lee del HTML** (la palabra `cookieconsent` puede venir de un atributo de
  otro script). Se confirma en la **captura**, y en la del tramo B también: hay avisos que aparecen
  recién tras el primer gesto.
- Variante **retrasado hasta el gesto**: no es un candidato aparte, es la razón por la que existe el
  tramo B. Hace el hallazgo más invisible para el dueño (cumple mejor la condición 1) y más
  exigente de comprobar (cumple peor la 3: hay que explicarle que mueva el mouse).

**C3, bloqueo en el borde.** Dos cosas que el encargo no dice y las fuentes sí:
1. Detectarlo es capa 1 (D1). Lo que exige oficio es **nombrar la capa**: encabezados de respuesta,
   huella del cuerpo de la página de bloqueo, desafío o 403 plano. Sin eso, no es capa 2.
2. **El arreglo vive en infraestructura ajena** (CDN, firewall, hosting del prospecto).
   `marketing/capacidad-servicios.md` marca como brecha la implementación sobre sitios que no
   construimos. La frase de arreglo de C3 no puede prometer "lo hacemos nosotros en una semana" sin
   acceso; tiene que decir quién toca qué.
3. **Una IP de datacenter puede ser el bloqueado, no el agente.** Por eso se decide por diferencia
   (mismo origen, agente normal vs agente de IA). Si ambos fallan, el resultado es `no-concluyente`.

**C2, medición que no mide.** Es el de mejor forma (el dueño cree lo contrario), y el de **peor
certeza desde afuera**: las conversiones marcadas dentro de la propiedad de GA4 son invisibles, y
una regla del panel puede convertir una visita a `/gracias` en conversión sin una sola etiqueta en
el sitio. Por eso la afirmación permitida es sobre lo que **el sitio envía** ("el contenedor no
tiene ninguna etiqueta de evento"), nunca sobre lo que la propiedad contiene ("no mides"). "Hay
eventos" tampoco prueba nada: la medición mejorada manda `scroll` y `click` sin que nadie haya
configurado una conversión. Sin clics (§3), el motor no puede ver qué se dispara al enviar un
formulario. Techo: **sospecha fuerte**, que un humano eleva o no.

**C4 y C6.** Son los dos candidatos cuya condición 2 (costo hoy) es la más blanda, y la condición 4
es parcial: lo automático es comparar texto, lo que exige oficio es interpretarlo. C4 solo se
automatiza *dentro del sitio*. C6 queda fuera de la primera versión.

### Lo que se mira pero **no** es gancho (capa 1)

Formulario ausente, teléfono sin enlace, WhatsApp con número mal formado, `llms.txt` faltante,
FAQ sin marcar, H1 duplicado, tiempos de carga, y cualquier cosa que un chequeo gratis también
escupa. Entran a la ficha como **contexto** y alimentan la ruta del mini-diagnóstico de Valen.
No compiten por el correo.

---

## 4. Cuál gana cuando hay varias cosas malas

Solo compiten los candidatos que cumplen la regla 1. Después se ordenan por la 2 a la 4.

**R1. Puerta de entrada.** Compite un candidato solo si (a) cada una de las cuatro condiciones
tiene su razón escrita, y (b) su estado es `estable`: la misma conclusión en **2 de 2** corridas
independientes. Si las corridas discrepan y una tercera sigue discrepando, se descarta. Nada de
"dos de tres". Lo que no entra queda como puntero para la pasada a mano.

**R2. Orden** (propuesta, ver D2). Es el orden del embudo del dueño, de arriba hacia abajo, y respeta
el orden de la casa donde la casa lo definió:

| Pos. | Candidato | Por qué va ahí |
|---|---|---|
| 1 | C5 contacto roto | Regla de la casa: si no hay dónde dejar los datos, nada más importa. |
| 2 | C3 acceso, con causa nombrada | Regla de la casa: acceso va antes que entidad y citabilidad. |
| 3 | C1 rastreadores previos al consentimiento | Único con prueba en campo y que cumple las cuatro limpio. |
| 4 | C2 medición | Alto valor si es cierto, pero R1 lo deja casi siempre como puntero (ver su nota). |
| 5 | C4 entidad partida | Orden de la casa: entidad antes que citabilidad. |
| 6 | C6 duplicado indexado | Condición 2 más blanda. |

**R3. Una sola.** El de mayor posición que pasó R1 es el `hallazgo`. Los demás pasan a `ruta`:
lista interna, no va en el correo, alimenta el mini-diagnóstico. Esto es el "uno, y la ruta
completa detrás" del encargo §6.

**R4. Desempate** entre candidatos de la misma posición o estado: primero el que el **dueño** puede
comprobar en 30 segundos sobre el que solo comprueba quien administra el sitio; después el que se
repitió idéntico en ambas corridas.

**R5. Sin capa 2.** Si ningún candidato pasa R1, el resultado es `sin-gancho-capa-2`, y se listan
los hechos de capa 1 como contexto. **Lo que se hace con eso lo decide el §14 de la estrategia**
(se escribe todo hecho verdadero comprobable en 30 segundos y relevante; no se escribe si el sitio
está en orden o no hay consecuencia que el dueño sienta). El motor no re-decide esa regla: solo
etiqueta la capa del hecho para que la decisión sea informada.

**R6. Cortes que anulan todo** (§14): sitio en orden → `sin-hallazgo`; sin consecuencia que el
dueño sienta → `sin-hallazgo`. "No hay nada verdadero que decir" es un resultado legítimo del motor
y se prefiere a uno inventado.

---

## 5. Lo que el motor nunca emite

- Un puntaje en nada que vaya hacia afuera.
- "Cumple" o "no cumple", una multa en pesos, o lo que la ley "exige" sobre una interpretación.
- "El Pixel/Analytics recibió la visita" cuando lo observado es que el script cargó.
- "No hay aviso de cookies" sin la captura del tramo B a la vista.
- Un conteo o una frase que cambie entre corridas.
- Un dato sobre una **persona**; solo lo que sale del sitio.
- La palabra `verificado`.

---

## 6. Cómo se mide la vara (se fija **antes** de correr, para no moverla después)

**Una corrida produce capa 2 si** al menos un candidato tiene las cuatro razones escritas, estado
`estable` y **un humano lo confirmó abriendo el sitio**. Se reportan siempre dos números por
separado, no uno:

1. **Capa 2 sospechada por el motor:** N de 10.
2. **Capa 2 confirmada a mano:** M de N. Esa razón es la precisión del motor.

- **Muestra:** 10 dominios fijados *antes* de correr, tomados por orden de los CSV vigentes de Dereck
  (`ventas/contactos-google-maps-*.csv`) que no estén excluidos ni ya contactados, sin elegir por
  cómo se ven. Solo reemplaza el que la pasada 0 descarte, y el reemplazo se anota.
- **Umbral del encargo:** si menos de 5 de 10 producen capa 2 **confirmada**, se dice que el motor
  todavía es un chequeo con más pasos, y no se sigue puliendo.
- **Desde esta sesión (D4)** solo puedo cerrar el número 1. El número 2 necesita la pasada local.
  El informe lo dirá así, sin presentar una sospecha como confirmación.
- **Los dominios** quedan en un archivo interno del repo, como las `corridas-chequeo-*`. Los
  informes al troncal usan identificadores (S01 a S10) y nada sale del repo.
- **Una hipótesis que conviene dejar registrada:** el correo que mejor resultado dio en toda la
  campaña (estrategia §14.5: pidieron el diagnóstico al día siguiente) partió de un hecho que, por la vara de capa 2, sería capa 1 (un
  formulario sin política en un sitio limpio). Es n = 1 y no prueba nada, pero sugiere que la vara
  puede estar dejando fuera algo que funciona. Propongo que el motor etiquete la capa de cada
  hallazgo y que el troncal la cruce con las respuestas cuando haya volumen. No cambia nada de lo
  que se construye ahora.

---

## 7. Qué devuelve el motor (esbozo; el formato final llega tras aprobar esto)

Una ficha por dominio, en archivo, con:

1. `resultado`: `hallazgo-capa-2` · `solo-capa-1` · `sin-gancho-capa-2` · `sin-hallazgo` · `no-concluyente` · `descartado:<motivo>`
2. `hallazgo`: el candidato ganador, **y** su estado (`sospecha` | `estable`). Nunca `verificado`.
3. `dónde mirar`: URL, tramo, qué cookie o petición, qué captura. Que quien abra el sitio lo
   encuentre en un minuto.
4. `las cuatro condiciones`: la razón escrita de cada una.
5. `evidencia`: rutas a capturas y registros crudos, y las dos corridas lado a lado.
6. `línea` y **`quién lo comprueba`** (dueño en 30 s, o quien administra el sitio).
7. `ruta`: lo demás, interno.
8. `la frase de arreglo`: **hereda el límite de `capacidad-servicios.md`**. Solo afirma capacidad y
   plazo cuando el servicio es ✅ ahí; si necesita acceso al sitio ajeno, lo dice. Se escribe en
   registro plural y cargando `voz-spindlelab`; el texto lo redacta Emilia desde esta ficha.

---

## 8. Qué construyo si se aprueba esto

En orden, y cada paso deja algo que se puede mirar:

1. Pasadas 0 y 1 (HTTP, sin navegador) + esquema de la ficha.
2. Pasada 2, extendiendo `probe.mjs` (C1 completo, con `gcs` y atribución de cookies).
3. Pasada 3: sonda de borde con causa nombrada (C3), contenedor (C2), contacto estructural (C5), entidad interna (C4).
4. Veredicto y orden (pasada 4).
5. Las 10 corridas con el pre-registro del §6, y un informe al troncal que dice cuántas fueron
   sospechadas, cuántas confirmadas y si el motor pasa el umbral.

C6 queda fuera hasta que las corridas lo pidan.
