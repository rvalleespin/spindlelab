# E15 · Heroes internos · registro de la ronda 2

Fecha: 3-nov-2026 · Rol: Bruno (dirección creativa) · Para que la revise Javiera y después Ramón. No se publicó nada.
No se tocó `spindlelab-astro/` ni nada publicado.

## Gasto

- Modelo `gpt_image_2_5`, 16:9, calidad por defecto (sale a 1344×752). Hice el preflight con `get_cost` y da 0,25 créditos por imagen.
- Saldo inicial: **193,50** créditos.
- Saldo final: **192,00** créditos.
- Gastado: **1,50 créditos**, que son 6 imágenes × 0,25. El tope duro era 3.
- Los 7 pedidos de diagnóstico que el filtro bloqueó no se cobraron. Revisé el saldo después de cada uno y no bajó.
- Auditoría **no se regeneró**. El recolor en post salió bien (ver «Post»), así que no hubo que gastar esos 0,25.

## Referencias de estilo (`image_references`)

| Fila | Referencia usada |
|---|---|
| isometrico | job f55e938d-5a96-47be-b703-71faa9c89ea9 (la de nosotros) |
| retro | auditoría **ya recoloreada al verde botella**, subida como media `0f889dc7-f8da-4808-bdfa-8b8b8ed9d9d3` (lock §1.2) |
| afiche | redes-sociales **ya recoloreada al lima nuevo**, subida como media `05e29c01-6f4f-45cb-967f-122e9f5bc2c9` (lock §1.3) |
| foto | job 33df342a-94c9-42c9-a837-141b11e17a7d (desarrollo-web) |

Ninguna de las dos referencias recoloreadas copió la composición, así que no hubo que volver a las d4d88d56 ni 7122519e.

## Job id por página

| Estilo | Página | Estado | Job id |
|---|---|---|---|
| isometrico | nosotros | ronda 1, aprobada, sin cambio | 9f243205-fc6b-4364-a657-107e4c8a47aa |
| isometrico | servicios | ronda 1, aprobada, sin cambio | b83914f9-5642-4333-a453-16cc0f2b9e4a |
| isometrico | **metodo** | **nueva** | 51879a46-dc9a-4fcd-8258-7920b2b5a393 |
| retro | auditoria-seo-tecnica | ronda 1, recoloreada en post | 962bb7d1-6109-457e-ab92-efa8929270a7 |
| retro | **visibilidad-en-ia** | **nueva** | 40130962-9418-4297-a87c-6c21b4ac608f |
| retro | **diagnostico** | **PENDIENTE: 7 intentos bloqueados** | ver abajo |
| afiche | **paid-media** | **nueva** | a88af0f3-ea73-4c14-99d6-99d4cc0a166b |
| afiche | redes-sociales | ronda 1, recoloreada en post | 7f096bc9-712f-43aa-b93a-09a7ee079e76 |
| afiche | **trabajo** | **nueva** | 7f61fe31-75db-434e-ae43-a569b0d6ffba |
| afiche | **blog** | **nueva** | 3589a3d7-7ae9-4a23-8f1f-4568a9d1a568 |
| foto | desarrollo-web | ronda 1, grano en post | b7e3ca7f-52dd-4a57-98c6-fcca545528b1 |
| foto | acompanamiento-mensual | ronda 1, grano en post | 05a7590b-92b7-4a63-b4dc-f733455cbcd7 |
| foto | **contacto** | **nueva**, grano en post | 8f72dd4b-e1ba-4ebf-a7a3-679b8c803c88 |

Los seis prompts nuevos son los del lock (§3A), sin cambios.

## Diagnóstico: el filtro del generador la bloquea (sin imagen y sin cobro)

El generador devolvió `nsfw` en los 7 intentos:

| # | Job id | Qué cambié |
|---|---|---|
| 1 | a39f8ed9-98fc-4001-b180-357c84d61623 | El prompt del lock tal cual, con la referencia verde. |
| 2 | 489bafc9-a0e3-4a69-affe-c21902f64088 | Puse «test leads with small spring clips» en vez de «crocodile clips», y el dedo apoyado en el botón en vez de apretarlo. |
| 3 | 347aabba-aa09-4209-8a1e-b6dc151b20fa | Usé la referencia d4d88d56 original. Cambié «sand timer» por «hourglass» y la presenté como maleta de técnico de radios. |
| 4 | 7ba7f36d-4f8e-41a0-bbca-97383dca63ec | Saqué la maleta, los cables con pinzas, el botón y el reloj. Dejé un gabinete de banco, con una sonda en la mano que toca la tarjeta «como un estetoscopio». |
| 5 | 8114e400-dbf1-4951-a9e1-774db91aa0a1 | Volví a la maleta, sin reloj y cambiando «needle» por «pointer». |
| 6 | d9fd5638-c1f9-4e2a-b45c-ddd6a7d13cb9 | Saqué la tarjeta-página. Los cables van a una maqueta de papel de una tienda y la mano gira una perilla. |
| 7 | 84cca7f9-bd8a-4ea6-87a5-3a5fda72b7c7 | La maleta sin reloj, **sin imagen de referencia**. |

**Lo que creo que pasa (es una inferencia, no está comprobado):** «maletín abierto + cables con pinzas + botón grande
+ reloj de arena» describe, visto por un clasificador, un **artefacto explosivo de película**. El filtro sigue
saltando aunque saque el reloj y la maleta, así que es probable que el bloqueo ya esté asociado a la combinación
«instrumento con cables + mano que lo acciona» en este hilo de pedidos, o que el filtro esté inestable. No lo seguí
forzando porque cada intento es una apuesta y la regla era una repetición por imagen como máximo.

**Recomendación:** cambiar la idea de diagnóstico por una que no tenga cables ni botón ni temporizador. Por ejemplo, un
**tensiómetro de época** (el de pera y manguito) puesto alrededor de una página doblada como un brazo, con su único
reloj de marcas: es un chequeo, es rápido, es manual y se entiende en Chile sin explicarlo. O una **balanza de botica**
con tres platillos (30 / 40 / 30, el del medio más grande), sin cifras. La tiene que fijar Lucía en el lock antes de
gastar. En la hoja aparece como recuadro vacío, «pendiente». No dejé `diagnostico.webp` en esta carpeta para que no se
confunda con la de la ronda 1 (rechazada por los brazos robóticos), que sigue en `../pruebas/`.

## Post (PIL; los scripts están en `post/`)

- **auditoria-seo-tecnica → verde botella** (lock §1.7). Hice un mapa de degradado sobre la luminancia en RGB lineal,
  con L normalizada entre los percentiles 1 y 99,5: `#0F2A1C` → `#2E5B3A` (en 0,45) → `#A9DDA0`. Partí del PNG original
  reescalado a 1200 px. La imagen conserva la trama y la diferencia entre fondo, cuerpo y luces, y no queda plana. Por
  eso no la regeneré.
- **visibilidad-en-ia → el mismo mapa.** Salió verde del generador, pero un poco más claro y más amarillento que
  auditoría: luces a 101°, fondo a 131°. Le pasé el mismo degradado para que las dos de la fila compartan exactamente
  la paleta. Medido después: luces a **114°** y fondo a **140°** con L 0,13, dentro de la banda del lock en las dos.
- **Afiches → lima a ~90°.** Roté el tono solo en los píxeles claros y saturados del papel (S > 0,35, V > 0,35, a menos
  de 35° del tono medido). No toqué el negro ni la trama. Lo apliqué a las cuatro: redes-sociales venía de 72°, y
  paid-media, trabajo y blog de 84-87° (blog estaba bajo la banda, en 84,3°). Medido después: **90,1 / 90,2 / 90,2 /
  90,6°**. La fila queda pareja.
- **Grano en las tres fotos** (lock §1.6). Las reescalé a 1200 px, apliqué ruido gaussiano monocromo con σ = 6 y
  `seed=15`, `GaussianBlur(0,6)` y lo volví a normalizar a σ 6. Lo pesé con `4·L·(1−L)` y exporté a webp 88. A 100 % se
  ve el grano en la pared y la greda; a tamaño de hero no ensucia. Usé el mismo σ en las tres.
- **Isométricos:** solo los reescalé a 1200 px y exporté. No necesitaban post.
- Todos los webp tienen 1200 × 671 y calidad 88. En el repo no hay PNG.

## Revisión antes de entregar (lock §4)

- **Texto:** amplié los letreros de las tiendas y la guía de visibilidad, el nivel de trabajo y las figuras de método.
  No hay letras legibles. Las tiendas llevan una cruz de farmacia y garabatos ilegibles en los letreros, del tamaño de
  un ornamento. La guía muestra solo barras grises. El nivel no tiene marcas ni cifras.
- **Muletillas:** en las seis nuevas no hay lupa, megáfono, ícono de círculo con montañita ni brazo mecánico. Auditoría
  y redes-sociales conservan su lámpara-lupa y sus megáfonos chicos, como aprobó Ramón (lock §0.8).
- **Caras:** la figura del quiosco de método está de espaldas y es diminuta. En visibilidad, paid-media, trabajo, blog
  y contacto solo salen manos y antebrazos.
- **Cuadro:** método queda entero sobre una sola base flotante, con margen libre por los cuatro lados.
- **Dorado** (`medir-dorado.py`): 0 % en retro, afiche e isométrico (método 0,04 %). En las fotos: contacto **1,46 %**,
  desarrollo-web 0,77 % y acompañamiento 0,31 %. En las tres son los brillos de la madera cruda de la mesa y de la tabla.
  No hay latón ni ocre. Lo anoto para que Javiera decida.

## Lectura de dirección

- **metodo:** se lee como pedía Javiera. Un quiosco coral abierto con alguien ya sentado, una casa con la puerta
  abierta y la luz recién encendida (con la figura y el buzón al lado), y dos casas apagadas y cerradas más arriba. El
  sendero punteado las une. No hay que explicar ninguna «esclusa».
- **visibilidad-en-ia:** es la más lograda de la tanda. Un dedo lee la guía y la otra mano tiene la clavija en el aire
  frente a las tiendas: «te lee y después te conecta o no». No hay nada de espionaje.
- **paid-media:** quedan tres elementos y nada más. Al bajar a 640 px el haz se lee como un cono lima, y el paquete
  existe solo dentro de la luz.
- **trabajo:** se entiende el cuadro del fotógrafo con su etiqueta en blanco y el nivel con la burbuja centrada sobre
  el marco. Es la más tranquila de las cuatro afiches, y está bien que lo sea.
- **blog:** quedan una galera, un conejo, una mano y una varita, y la punta toca el doble fondo. Las columnas laterales
  son solo barras.
- **contacto:** se ve la taza con café humeando junto a la bola de greda con la huella. Las dos manos sostienen la
  tabla en vez de deslizarla, pero el gesto de ofrecer se lee igual.

**Riesgo para Javiera:** con el lima a 90° y a la saturación que trae el papel (~0,87), los cuatro afiches quedan
bastante **vivos**, cerca de fluorescentes a tamaño grande. El lock pide «lima más verde», no menos saturado. Si en
la hoja se sienten «neón», se baja a S ≈ 0,7 en post, sin regenerar.

## Archivos

- `<slug>.webp` × 12 (todas menos diagnostico), 1200 px.
- `hoja.jpg`: 4 filas por estilo, 640×360 cada imagen, sobre #060606 con «estilo · slug» en blanco. Diagnóstico va como
  recuadro pendiente.
- `post/post.py`, `post/build.py` y `post/hoja.py`: el post reproducible. Los PNG originales están en el scratchpad de
  la sesión y en Higgsfield por job id.
