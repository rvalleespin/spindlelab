# Campañas con landing para Spotify: ¿se puede, entra en lo que hacemos, cuánto se cobra?

- **Fecha:** 2026-09-09 · **Autor:** Gonzalo (`persona-paid-media`) · **Estado:** propuesta, no cotización enviada.
- **Aprueba:** Ramón (precio, alcance y cualquier gasto).
- **Origen:** consulta entrante. Objetivo declarado del que pregunta: *captar oyentes en Spotify a través de una landing*.
- **Precios citados:** los publicados hoy en spindlelab.cl, verificados en vivo el 2026-09-09 (`/servicios/desarrollo-web/`, `/servicios/paid-media/`, `/servicios/redes-sociales/`). No son cifras nuevas.

---

## 1. Respuesta corta

| Pregunta | Respuesta |
|---|---|
| ¿Es posible? | **Sí, y la landing no es un rodeo: es la única arquitectura que permite medir y optimizar.** Spotify no entrega píxel ni evento de conversión a un anunciante externo, así que la landing propia es el único lugar donde se puede instalar medición. |
| ¿Está dentro de las capacidades? | **Sí, con una brecha real: el video.** La landing y la gestión de campaña son dos productos ya publicados del catálogo. Lo que hoy no producimos internamente es el creativo en video, que es justo donde se gana o se pierde una campaña de música. |
| ¿Cuánto se cobra? | **Landing desde $390.000 + IVA (pago único) y gestión de campaña desde $350.000/mes + IVA**, con la inversión publicitaria aparte y a nombre del cliente. Un lanzamiento acotado de un mes queda en torno a **$740.000 + IVA + pauta**. Detalle en §5. |
| ¿Qué NO se promete? | Oyentes, streams o seguidores garantizados. Se compromete **costo por clic a Spotify medido**, no un número de oyentes. El motivo es técnico y está en §2. |

---

## 2. Por qué la landing, y qué se puede medir de verdad

**El problema de fondo:** Spotify es una plataforma cerrada para el anunciante. No hay píxel de Spotify que se pueda poner en una campaña de Meta o Google, no hay API de conversiones que devuelva "esta persona escuchó", y no se pueden pegar parámetros UTM a un enlace de Spotify y leerlos después. Si la campaña manda el clic directo a `open.spotify.com`, la plataforma de anuncios queda ciega: optimiza hacia el clic más barato, que casi nunca es el oyente.

**Lo que resuelve la landing:**

1. Es el único lugar donde instalamos el píxel del cliente.
2. El clic al botón de Spotify se convierte en un **evento propio** ("clic a Spotify"), y eso es lo que la campaña optimiza. Ahí aparece la señal de intención que en música no existe de entrada.
3. Ese evento alimenta **retargeting** (quien entró y no hizo clic) y **audiencias similares** construidas sobre gente que sí fue a escuchar. Es el activo que hace que el mes 2 rinda mejor que el mes 1.
4. Permite capturar algo que el artista se queda: correo o WhatsApp. Sin eso, la pauta le construye audiencia a Spotify y al artista no le queda nada cuando la campaña se apaga. Esta es, comercialmente, la parte más subvalorada de la landing.

**Lo que la landing NO resuelve, y va por escrito en la cotización:** el último tramo no es atribuible. Un clic a Spotify no es un stream, ni un guardado, ni un seguidor. Spotify for Artists entrega oyentes, seguidores y fuentes de escucha **a nivel agregado**, sin atribución por clic. Entonces el reporte tiene dos capas y se explican por separado:

- **Capa dura (verificable):** impresiones, clics, visitas a la landing, eventos "clic a Spotify" y su costo. Sale del píxel y de la plataforma, con captura.
- **Capa de correlación (leída, no atribuida):** delta de oyentes mensuales y seguidores en Spotify for Artists en la ventana de campaña contra la ventana previa. Se presenta como correlación, nunca como atribución.

> Cualquiera que prometa "X oyentes por $Y garantizados" está comprando bots o playlists pagadas. Eso no solo no lo hacemos: expone al artista a que Spotify le retire el tema y le retenga regalías por *streaming* artificial. Es un argumento de venta, no solo una advertencia.

---

## 3. Qué canal, y por qué acá se rompe la filosofía de la casa

La casa compra medios con criterio de **alta intención** (Google, búsqueda, frase y exacta). **En música ese criterio no aplica y hay que decirlo en voz alta antes de montar nada:** nadie busca en Google a un artista que todavía no conoce. La demanda no se captura, se interrumpe.

| Canal | Rol en este caso |
|---|---|
| **Meta (Instagram y Facebook, formato Reels vertical)** | El motor. El descubrimiento de música vive ahí y el interés frío sí funciona, al revés que en B2B. La intención se fabrica con el evento del píxel, no se busca en el buscador. |
| **Google / YouTube** | Secundario. Solo tiene sentido para búsquedas de marca (el nombre del artista o del tema, cuando ya hay demanda) y remarketing. No es el canal de captación. |
| **Herramientas propias de Spotify** (Marquee, Showcase, Discovery Mode, su gestor de anuncios) | **Por verificar, no lo afirmo de memoria.** Dependen del mercado y de la elegibilidad de la cuenta del artista (distribuidora, catálogo mínimo). Se revisan dentro de Spotify for Artists en la primera sesión de onboarding, con captura. Si están disponibles, son complemento del embudo, no reemplazo. |

**Consecuencia operativa:** este encargo lo lidera Fran (`persona-meta-ads`), no yo. Yo entro por la arquitectura de medición, el umbral de corte y el criterio de compra.

---

## 4. ¿Está dentro de las capacidades? Auditoría honesta

Mismo criterio de `marketing/capacidad-servicios.md`: ✅ ejecutable hoy · ⚠️ con limitaciones o manual · ❌ falta herramienta o acceso.

| Pieza | ¿Hoy? | Detalle |
|---|---|---|
| Landing de campaña con medición | ✅ | Es un producto publicado: **Página de Campaña**, entrega en ~1 semana, diseño a medida, medición desde el primer día. Lo ejecuta Diego (`persona-disenador-web`). |
| Píxel, evento personalizado, audiencias y similares | ✅ | Es trabajo estándar de Fran. La oficina además tiene herramientas de Meta por API (campañas, conjuntos, anuncios, audiencias, eventos de píxel, insights), lo que acelera el montaje. Requiere que el cliente nos dé acceso a **su** Business Manager: la cuenta y el píxel van a su nombre, nunca al nuestro. |
| Montaje, optimización y reporte de la campaña | ✅ | Núcleo del servicio de pauta ya publicado. |
| **Creativo en video** | ⚠️ **La brecha real** | El catálogo dice explícito que *el creativo lo pone el cliente*. Bruno entrega clips y overlays, pero no hay compositor de video en el entorno: el montaje final lo hace una persona en CapCut. Una campaña de música consume del orden de 6 a 10 variantes de video al mes. **O el artista los provee (lo normal, tiene material de sobra), o se cotiza aparte, o se excluye por contrato.** Si esto no queda claro antes de firmar, el proyecto se convierte en producción audiovisual no cotizada. |
| Pre-save / pre-add antes del estreno | ⚠️ | Un enlace a Spotify es trivial; un *pre-save* real no: exige autorización OAuth del fan contra la API de Spotify. Es desarrollo, no una landing. Recomendación: usar una herramienta especializada del mercado (costo mensual bajo, a nombre del artista) y no construirla, salvo que se cotice como Plataforma a Medida. |
| Medición del objetivo declarado (oyentes) | ⚠️ | Exige **acceso de lectura a Spotify for Artists del cliente**, igual que pedimos Search Console en el onboarding de SEO. Sin ese acceso solo medimos hasta el clic, y hay que decirlo antes de cotizar, no después. |
| Garantizar oyentes o streams | ❌ | No es una brecha de herramienta: no es atribuible ni comprable de forma legítima. Ver §2. |

**Conclusión:** el servicio se puede entregar completo hoy salvo el video, que es una decisión comercial (lo pone el cliente) y no un impedimento técnico.

---

## 5. Precio

Todo lo de abajo está armado con **precios ya publicados**, sin inventar tarifa nueva. Tres niveles, con ★ en el recomendado, según `marketing/plantillas/cotizaciones/guia-cotizaciones.md` §1.4.

| | **Lanzamiento acotado** | ★ **Campaña sostenida** | **Artista con equipo** |
|---|---|---|---|
| **Ideal para** | Un tema, probar si el canal funciona antes de comprometerse | Un lanzamiento real, con audiencias que se acumulan mes a mes | Artista o sello que además quiere Instagram gestionado |
| **Landing (Página de Campaña)** | $390.000 pago único | $390.000 pago único | $390.000 pago único |
| **Gestión de campaña** | $350.000 por un mes (montaje + 4 semanas) | $350.000/mes (Esencial) o $550.000/mes (Pro, varias campañas o varios temas), mínimo 3 meses | $590.000/mes (Orgánico + Pauta: incluye calendario, comunidad y pauta Meta), mínimo 3 meses |
| **Total del compromiso** | **$740.000 + IVA** | **$1.440.000 + IVA** (3 meses, plan Esencial) | **$2.160.000 + IVA** (3 meses) |
| **Inversión publicitaria** | Aparte, a la tarjeta del cliente | Aparte, a la tarjeta del cliente | Aparte, a la tarjeta del cliente |

**Condiciones que van sí o sí en el documento:**

- Los valores son **fee de gestión**, no incluyen IVA (19%) ni la inversión en pauta.
- **0% de comisión sobre la pauta.** Es la política publicada de la casa y acá conviene decirla fuerte: en música es habitual que la agencia cobre un porcentaje del gasto.
- La cuenta publicitaria, el píxel y la landing quedan **a nombre del artista**. Si mañana se va, se lleva el activo.
- El creativo en video lo provee el cliente (§4).
- Mínimo 3 meses en los planes con fee mensual, salvo el Lanzamiento acotado, que es de un mes justamente para permitir probar sin amarre.

### El piso de inversión publicitaria (criterio, no cifra inventada)

No hay dato propio de esta vertical y no voy a inventar un CPC. Lo que sí es criterio duro de compra de medios: **Meta necesita del orden de 50 eventos de optimización por conjunto de anuncios por semana** para salir de la fase de aprendizaje. De ahí sale el piso, y depende del costo real del evento:

> presupuesto semanal mínimo ≈ 50 × (costo del evento "clic a Spotify")

Ese costo es exactamente lo que mide el piloto. Por eso el primer mes se optimiza hacia visitas a la landing (más volumen, más barato) y recién con dato propio se pasa a optimizar por el evento de conversión. **Antes del piloto no se compromete un costo por oyente: se compromete que en 2 semanas vamos a tener el número real.** Si el cliente no puede sostener una inversión que llegue a ese piso, la campaña no sale de aprendizaje, el dato no concluye y conviene decirlo antes de cobrar.

### Hueco de catálogo que hay que resolver (decisión de Ramón)

Hoy el sitio dice que Paid Media es **solo Google**, y que la pauta de Instagram y Facebook vive dentro de Gestión de Redes Sociales, empaquetada con orgánico y comunidad a $590.000/mes. **No existe un SKU de "pauta Meta sola".** Para este caso hay dos salidas:

1. **Cotizar por el nivel "A medida" de Paid Media** ("se cotiza tras una reunión"), usando $350.000/mes como piso equivalente al plan Esencial de Google. Es el camino limpio y no toca el sitio.
2. **Crear el SKU** de pauta social sin orgánico. Tiene sentido si aparece más de un caso así, no por uno.

Recomiendo la opción 1 ahora y revisar la 2 si entra un segundo cliente con la misma forma.

---

## 6. Qué preguntar antes de cotizar

1. **¿Quién es?** Artista independiente, mánager o sello. Cambia el presupuesto y quién aprueba.
2. **¿Qué se está lanzando y cuándo?** Un single tiene ventana corta; un catálogo permite campaña sostenida. La fecha manda todo el calendario.
3. **¿Cuánto puede poner en pauta al mes?** Es la pregunta que decide si el proyecto existe. Si el fee es varias veces la pauta, el modelo no le sirve al cliente (§7).
4. **¿Tiene video?** Cuánto, de qué tipo, quién lo edita. Es la brecha de §4.
5. **¿Tiene Business Manager y acceso de administrador a Spotify for Artists?** Sin lo segundo, medimos hasta el clic y nada más.
6. **¿Qué cuenta como éxito para él?** Oyentes mensuales, seguidores, lista de correos, entradas a un show. Si el objetivo real es vender entradas o merch, el embudo cambia y ahí sí hay conversión atribuible de punta a punta.

---

## 7. Cuándo conviene vender más chico, o decir que no

Es el punto que más plata ahorra. Con un artista independiente el fee de $350.000/mes va a ser mayor que su presupuesto de pauta, y esa relación es mala para él y termina mal para nosotros: paga la gestión de un gasto que no alcanza a rendir.

**Alternativa honesta cuando ese es el caso:** vender solo la **Página de Campaña** ($390.000 + IVA), entregarla con el píxel instalado, el evento configurado y una hora de acompañamiento para que él mismo levante la campaña. Se cierra un proyecto rentable, el cliente queda con el activo, y si funciona vuelve por la gestión. Es el mismo criterio de alcance corto y precio fijo que quedó anotado el 9-sep a propósito de Citable.

**Bandera estratégica para Ramón (no es decisión mía):** el ICP declarado es B2B y YMYL chileno. Un artista es B2C entretenimiento. No es una contradicción imposible (el caso Bernardo ya salió del ICP y funcionó), pero conviene tomarlo como decisión consciente: se acepta como piloto pagado de una vertical nueva y repetible (hay mucho artista independiente en Chile y casi nadie le vende medición seria), o se deriva. Lo que no conviene es que entre por inercia y termine consumiendo el ancho de banda del frente principal.

---

## 8. Riesgos que van por escrito

- **Sin garantía de oyentes, streams ni seguidores.** Se garantiza tráfico medido y una landing que convierte el clic.
- **Nada de streaming artificial:** ni bots, ni granjas de playlists, ni servicios de "oyentes garantizados". Riesgo real de retiro del tema y retención de regalías para el artista.
- **Derechos del audio en el creativo:** el video usa música del propio artista. Si mete audio de terceros, Meta puede rechazarlo o silenciarlo, y el rechazo casi nunca explica el motivo.
- **Degradación de señal en iOS:** el evento del píxel es la mejor medición disponible, no una medición perfecta. Se dice antes, no cuando aparece la diferencia entre plataforma y realidad.
- **Ventana de lectura en Spotify for Artists:** los datos se leen con desfase y a nivel agregado. El reporte de correlación se entrega con la ventana explícita.

---

## 9. Qué necesito de Ramón para avanzar

- [ ] ¿Se acepta el caso? (§7, bandera de ICP).
- [ ] ¿Se cotiza por el nivel "A medida" de Paid Media o se crea el SKU de pauta Meta sola? (§5).
- [ ] Confirmar que el creativo en video lo pone el cliente, o definir qué se cotiza si no lo tiene.
- [ ] Con esas tres respuestas, se arma la cotización formal (`SPL-COT-2026-0NN`) sobre `marketing/plantillas/cotizaciones/plantilla-cotizacion.html` y se agrega la fila al pipeline (la agrega el troncal, no esta sesión).

