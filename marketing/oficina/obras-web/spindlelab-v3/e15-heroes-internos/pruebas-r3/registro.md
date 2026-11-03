# E15 · Heroes internos · registro de la ronda 3

Fecha: 3-nov-2026 · Rol: Bruno (dirección creativa). Va primero a Javiera, en un subagente limpio, y después a Ramón.
No se publicó nada. No toqué `spindlelab-astro/` ni nada publicado.

## Gasto

- Usé `gpt_image_2_5` en 16:9 con la calidad por defecto (sale a 1344×752). Según el preflight con `get_cost`, cada imagen
  cuesta **0,25 créditos**.
- Saldo inicial: **192,00** créditos.
- Saldo final: **190,75** créditos.
- Gasté **1,25 créditos**: 4 imágenes más 1 repetición de método. El tope duro era 2.
- El filtro no bloqueó nada. Diagnóstico salió a la primera con la referencia verde, así que no hizo falta la variante
  «vintage sphygmomanometer gauge».

## Referencias de estilo (`image_references`, igual que en la ronda 2)

| Fila | Referencia |
|---|---|
| isometrico | job f55e938d-5a96-47be-b703-71faa9c89ea9 |
| retro | media 0f889dc7-f8da-4808-bdfa-8b8b8ed9d9d3 (auditoría recoloreada al verde botella) |
| afiche | media 05e29c01-6f4f-45cb-967f-122e9f5bc2c9 (redes-sociales recoloreada al lima) |
| foto | job 33df342a-94c9-42c9-a837-141b11e17a7d |

Los prompts son los del lock (R3.5) sin cambios. Lo único distinto es la repetición de método (ver abajo).

## Job id por página

| Estilo | Página | Estado en la ronda 3 | Job id |
|---|---|---|---|
| isometrico | nosotros | aprobada, copia de r2 | 9f243205-fc6b-4364-a657-107e4c8a47aa |
| isometrico | servicios | aprobada, copia de r2 | b83914f9-5642-4333-a453-16cc0f2b9e4a |
| isometrico | **metodo** | **nueva** (la repetición) | **894fe3a1-a380-4bfb-86f8-91e4e011ae5c** |
| retro | auditoria-seo-tecnica | aprobada, copia de r2 | 962bb7d1-6109-457e-ab92-efa8929270a7 |
| retro | visibilidad-en-ia | aprobada, copia de r2 | 40130962-9418-4297-a87c-6c21b4ac608f |
| retro | **diagnostico** | **nueva** | **be0ba391-3df9-4ae7-a9bb-096801dedccd** |
| afiche | paid-media | aprobada, papel a impreso en post | a88af0f3-ea73-4c14-99d6-99d4cc0a166b |
| afiche | redes-sociales | aprobada, papel a impreso en post | 7f096bc9-712f-43aa-b93a-09a7ee079e76 |
| afiche | **trabajo** | **nueva**, papel a impreso en post | **2915cc78-e54a-4dfb-8098-a24294606df2** |
| afiche | blog | aprobada, papel a impreso en post | 3589a3d7-7ae9-4a23-8f1f-4568a9d1a568 |
| foto | desarrollo-web | aprobada, copia de r2 | b7e3ca7f-52dd-4a57-98c6-fcca545528b1 |
| foto | acompanamiento-mensual | aprobada, copia de r2 | 05a7590b-92b7-4a63-b4dc-f733455cbcd7 |
| foto | **contacto** | **nueva**, con grano en post | **cf8709d9-2c17-47c3-81cc-f3e3358194ef** |

**La primera versión de método se descartó** (job f3993f03-e478-4b92-8408-0e377cc27473). Salió con **cinco** cajones
en vez de cuatro, y entre la pieza abierta de abajo y el cajón que se abre quedaba uno cerrado, con frente y manija. Se
leía como «una fase que se salta», que es justo lo contrario de la idea. Para la repetición reforcé el prompt del lock
sin cambiar la escena: «exactly four drawers, no more, stacked directly on top of one another», conté los cajones desde
el suelo y agregué «Reading upwards there is no closed drawer between the two lit ones: lit, lit, dark, dark».

## Post (PIL; los scripts están en `../pruebas-r2/post/`)

- `build_r3.py` arma las 13 y `hoja_r3.py` arma las dos hojas. En `post.py` agregué `paper_print` y `medir_papel`, y
  dejé intacto lo de la ronda 2.
- **Aprobadas sin post nuevo** (nosotros, servicios, auditoria-seo-tecnica, visibilidad-en-ia, desarrollo-web y
  acompanamiento-mensual): son copia byte a byte de `pruebas-r2/`.
- **diagnostico → verde botella** con el mismo mapa de degradado (`gradmap_retro`, §1.7). Del generador salió con las
  luces a 102° y el fondo a 134°, bajo la banda. Medido después: luces a **119°** y fondo a **141°** con L 0,13.
  Auditoría está en 114° y 141°, así que la fila queda pareja.
- **metodo:** solo la reescalé. No necesitaba post.
- **Afiches, de fluorescente a impreso (R3.6).** El cambio va solo en el papel, con la misma máscara suave que usa
  `paper_shift`: S > 0,35, V > 0,35 y a menos de 35° de 90°. Escalé S y V para que la mediana del papel quede en
  S 0,6 y V 0,85, y no toqué el tono. El negro y la trama quedan igual.

  | Afiche | Papel antes (H, S, V) | Papel después (H, S, V) |
  |---|---|---|
  | paid-media | 90,1 · 0,837 · 0,933 | **90,0 · 0,599 · 0,851** |
  | redes-sociales | 90,2 · 0,851 · 0,937 | **90,0 · 0,604 · 0,843** |
  | trabajo | 90,0 · 0,867 · 0,941 (después de `paper_shift`; del generador venía a 86,1°) | **90,0 · 0,609 · 0,839** |
  | blog | 90,0 · 0,798 · 0,914 | **90,0 · 0,627 · 0,855** |

  Blog queda 0,02 más saturado porque partía más bajo y la escala es proporcional. En la hoja no se nota.
- **Retoque en trabajo:** la etiqueta de la copia salió con **dos** barras: la buena y una segunda, borrosa, debajo.
  Tapé la segunda con el papel de la propia etiqueta, usando un polígono que queda dentro de la etiqueta (las coordenadas
  están en `build_r3.py`) y con ruido σ 5 para que no quede liso. La foto de atrás no se toca. Lo revisé ampliado.
- **contacto → grano §1.6** (σ 6, `seed=15`, el mismo de las otras dos fotos).
- Todos los webp quedan en 1200 × 671 y calidad 88. No hay PNG en el repo. Los PNG originales están en el scratchpad de
  la sesión y en Higgsfield por job id.

## Revisión antes de entregar (lock §4 y R3.7)

- **Texto:** amplié la esfera de diagnóstico y tiene solo marcas, sin ninguna cifra. La página enrollada muestra tres
  puntos y barras. Los portaetiquetas de método están en blanco. Las etiquetas de trabajo tienen una barra cada una
  (después del retoque). La lámina de contacto tiene solo contornos, líneas de doblez punteadas y pestañas, sin letras.
- **Muletillas:** en las cuatro nuevas no hay lupa, megáfono, ícono de círculo con montañita ni brazo mecánico.
- **Diagnóstico:** hay una sola esfera, sin cables con pinzas, botón, reloj ni maleta. Lleva un tubo de goma y una pera.
- **Trabajo:** no hay cámara y todo cuelga a plomo del cordel. La plomada cae vertical y la copia cuelga de su perro.
- **Contacto:** no hay mesa ni madera ni greda, solo el fondo oliva liso y la pana. El fondo medido está a 53,9°, junto
  a desarrollo-web (52,7°) y acompañamiento (40,8°).
- **Caras:** en método salen figuras diminutas de espaldas. En el resto solo hay manos y antebrazos.
- **Dorado** (`medir-dorado.py`): 0,00 % en diagnóstico, método, trabajo y los cuatro afiches. Contacto da **0,65 %**,
  que son los tonos de la piel de las palmas, porque no hay latón ni madera. Desarrollo-web da 0,77 %, como en la ronda
  2.
- **Recorte 4:5** (`hoja-45.jpg`): método entra **entero** en el recorte, con aire a los dos lados. Trabajo (la copia, la
  plomada y la mano) y contacto (las dos manos con su tienda) también entran enteros.

## Reparos que dejo anotados para Javiera

1. **diagnostico en 4:5:** en el celular el recorte deja afuera la mano que aprieta la pera y la mitad izquierda de la
   página enrollada. Se ve el manguito con la esfera sobre una hoja con barras, pero el gesto de «tomar la presión» se
   pierde. En 16:9 se lee completo. Hay dos salidas sin regenerar: en el hero móvil, correr el `object-position` hacia
   la derecha (~60 %), o aceptarlo así. Si se regenera, hay que pedir la mano y la pera más cerca del manguito.
2. **metodo:** bajo el cajón que se abre asoma un panel oscuro con una manija muy tenue. A tamaño de hero se lee como la
   sombra del cajón abierto y la progresión (abierto, abriéndose, cerrado, cerrado) se entiende. A 100 % se puede leer
   como un quinto cajón. No lo retoqué para no inventar estructura. Si Javiera lo ve, se puede hundir en sombra en
   post.
3. **trabajo:** como la etiqueta izquierda está retocada, queda un poco más lisa que el papel del afiche. A 100 % no
   desentona.

## Lectura de dirección

- **diagnostico:** a la página le toman la presión sobre el cojín de la consulta. Es un control desde afuera, sin abrir
  nada, y se separa bien de la auditoría que tiene al lado, que abre el motor. Tiene el humor seco que pedía Ramón.
- **metodo:** ahora es un solo objeto vertical: abajo, la revisión gratis abierta y con alguien leyendo; arriba, la fase
  que se abre cuando le meten la tarjeta con lacre; y más arriba, dos cajones que esperan su tarjeta. El chiste
  (un archivador que es una casa de muñecas) se entiende sin explicarlo.
- **trabajo:** en el cordel cuelgan la copia del fotógrafo y la plomada, la herramienta que verifica que algo esté a
  plomo. Es lo único del afiche perfectamente vertical, y es la más limpia de la fila.
- **contacto:** muestra la misma tienda armada y en plano, una en cada mano: «¿de cuál hablamos?». Se ve como papel, no
  como piedra.
- **Fila afiche:** a S 0,6 y V 0,85 el lima se ve impreso y deja de brillar como marcador. Ya no compite con el amarillo
  del botón.

## Archivos

- `<slug>.webp` × 13, de 1200 px.
- `hoja.jpg`: 4 filas por estilo, 640×360 por imagen, sobre #060606 y con «estilo · slug» en blanco.
- `hoja-45.jpg`: el recorte 4:5 central de las 13 a alto completo, como se verían en el celular. Cada imagen va a
  288×360.
