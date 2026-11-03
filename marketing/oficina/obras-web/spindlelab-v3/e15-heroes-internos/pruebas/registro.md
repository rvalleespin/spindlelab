# E15 · Heroes internos: registro de pruebas baratas

Fecha: 3-nov-2026 · Rol: Bruno (dirección creativa) · Para revisión de Ramón, nada publicado.

## Gasto

- Modelo `gpt_image_2_5`, 16:9, calidad por defecto (sale a 1344×752). Preflight con `get_cost`: 0,25 créditos por imagen.
- Saldo inicial: **196,75** créditos.
- Saldo final: **193,50** créditos.
- Gastado: **3,25 créditos** (13 imágenes × 0,25). Tope duro: 6.
- En el primer lote, 4 pedidos rebotaron con 503 («La creación de generaciones está ocupada»): servicios, diagnostico, redes-sociales y acompanamiento-mensual. No se cobraron. Se reintentaron esos 4 y salieron a la primera.

## Job id por página

| Estilo | Página | Ref. de estilo | Job id |
|---|---|---|---|
| isometrico | nosotros | f55e938d | 9f243205-fc6b-4364-a657-107e4c8a47aa |
| isometrico | servicios | f55e938d | b83914f9-5642-4333-a453-16cc0f2b9e4a |
| isometrico | metodo | f55e938d | 29779a76-98e8-445e-aab3-34638a4d7bab |
| retro | auditoria-seo-tecnica | d4d88d56 | 962bb7d1-6109-457e-ab92-efa8929270a7 |
| retro | visibilidad-en-ia | d4d88d56 | 9f8516dc-1f5e-4830-934a-f7a2c1e5ca3b |
| retro | diagnostico | d4d88d56 | d8abb81e-8096-4674-96fc-32347f696bfb |
| afiche | paid-media | 7122519e | 531befb6-b65e-4638-963b-a0bcf8887035 |
| afiche | redes-sociales | 7122519e | 7f096bc9-712f-43aa-b93a-09a7ee079e76 |
| afiche | trabajo | 7122519e | ea0b3684-23c5-465f-a736-263304b4b94d |
| afiche | blog | 7122519e | 64eff127-5b64-4917-ad69-88ebc430e306 |
| foto | desarrollo-web | 33df342a | b7e3ca7f-52dd-4a57-98c6-fcca545528b1 |
| foto | acompanamiento-mensual | 33df342a | 05a7590b-92b7-4a63-b4dc-f733455cbcd7 |
| foto | contacto | 33df342a | 89a3b3c7-595e-4f6a-8ac3-d797efd4cb73 |

Los prompts son los del encargo, sin cambios. Cada pedido llevó su referencia de estilo como `image_references`.

## Repeticiones

**Ninguna.** Revisé las 13 una por una y después la hoja completa: no hay texto ni números legibles, no hay caras protagonistas, no hay deformidades y todas respetan su estilo. Amplié la huincha de desarrollo-web y el metro plegable de trabajo, que eran los dos sitios donde podía colarse un número: solo tienen marcas y puntos.

## Lectura de dirección (lo que vi, para que Ramón decida)

- **isometrico (a color, como lo pidió).** *nosotros* es la más fuerte de la tanda: el navegador hecho estación al centro, con tranvía, teleférico, faro, antena, avión de papel y camión entrando y saliendo de él por líneas punteadas. Es la idea de «el sitio como eje y todo conectado» y se entiende de un vistazo. *servicios* funciona como kit de maqueta (base-página y cinco módulos con etiqueta que bajan a su enchufe). La figura que sostiene el módulo está de perfil y el pelo le tapa la cara: aceptable. *metodo*: las esclusas y el bote se leen bien, pero la «primera esclusa sin compuerta» no se distingue. La idea de que la primera etapa está abierta se pierde un poco.
- **retro (lima sobre oliva).** *auditoria* (motor-sitio abierto con etiquetas de tres tamaños) está muy lograda. El inspector sale más grande de lo pedido, de espaldas. *visibilidad-en-ia*: la trompetilla salió como megáfono, pero la idea de las máquinas que escuchan la tienda y el quiosco se lee igual. *diagnostico*: ojo con esta. Los brazos articulados de la línea de control pueden leerse como **brazos robóticos industriales**, y eso choca con la regla de «nada de robots». No la repetí porque no son robots humanoides, pero si Ramón la siente «tech», la próxima pasada pediría estaciones manuales (lupa en pedestal, calibre de banco, timbre de palanca).
- **afiche (lima y negro).** *redes-sociales* (la pinza poniendo la pieza que falta en la grilla) y *blog* (la galera en corte con el truco explicado) son las más ingeniosas del grupo. *blog* cumple justo lo que pidió Ramón: contar cómo se hace el truco, que es escribir sobre nuestro trabajo y sobre el marketing. *paid-media*: la oferta dentro de la lupa se entiende. *trabajo*: el díptico funciona, pero es la menos sorprendente de las cuatro.
- **foto (estudio oliva).** Las tres son limpias y táctiles. *desarrollo-web* (molde de sastre con forma de página) es la metáfora más clara. *contacto* (llave hecha y llave en blanco) es sutil y queda bien como invitación.

**Mi recomendación:** *nosotros*, *blog*, *redes-sociales*, *auditoria* y *desarrollo-web* ya están en el punto para pasarlas a calidad alta. Antes de subir calidad revisaría la idea de *metodo* (marcar mejor la primera esclusa abierta) y de *diagnostico* (sacar los brazos robóticos).

## Archivos

- `<slug>.webp` (1200 px de ancho, uno por página). Los PNG originales no se suben, por regla del encargo.
- `hoja.jpg`: 4 filas (isometrico, retro, afiche, foto), cada imagen a 640×360 sobre #060606 con «estilo · slug» en blanco.
