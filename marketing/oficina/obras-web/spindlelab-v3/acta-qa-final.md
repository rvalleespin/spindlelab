# Acta de QA final — spindlelab-v3 en el lenguaje de driftime

**6-oct-2026.** Revisión independiente (contextos limpios, sin acceso al razonamiento de
quien construyó) sobre el build de producción. Firma: Javiera, en tres lentes.

## Veredicto

**Con reparos.** No queda ningún defecto bloqueante que pueda resolver el estudio. Lo que
queda abierto es decisión de Ramón (abajo) o espera las fotos nuevas.

| Lente | Primera revisión | Re-verificación |
|---|---|---|
| Mirada del cliente y anti-slop | con reparos · 1 bloqueante, 11 menores | con reparos · 8 cerrados, 2 diferidos (fotos), 1 reservado |
| Conversión y verdad del contenido | rechazado · 4 bloqueantes, 5 menores | con reparos · 8 cerrados, 1 reservado (puntaje de la home) |
| Marca, accesibilidad y capa técnica | rechazado · 4 bloqueantes, 9 menores | con reparos · 13 cerrados, 1 reservado (OG/Layout) |

Antes de esta QA, las nueve plantillas pasaron cada una por revisión propia (aprobadas con
menores en la 2.ª o 3.ª ronda) y por una revisión cruzada del sitio entero (14 defectos,
aplicados).

## Medición de cierre (build de producción)

- `npm run verificar -- --prefijo /v3/` a **390, 768 y 1440**: 21 páginas, **sin hallazgos**
  (contraste real, overflow, un h1, JSON-LD, alt, enlaces internos, píldoras).
- `mide.mjs` en las 21 rutas a 1440 y 390: **42 mediciones sin defecto** (cero overflow, un
  oro por vista, cinco mayúsculas 800 solo en la home, un h1, sin saltos, sin errores de JS).
- Campos de la home medidos en 12 pantallas reales: 0 % de recorte en escritorio, nada fuera
  de la ventana.
- Teclado: 0 paradas de foco tapadas (antes 111 hacia adelante y 14 hacia atrás).
- UTM: llegan al formulario en los 8 recorridos probados (antes se perdían al segundo salto).

Capturas: `capturas/final-recorrido-escritorio.jpg` y `capturas/final-recorrido-celular.jpg`.
Vista previa: https://claude-magical-franklin-ckfk.spindlelab-v2.pages.dev/v3/

## Decide Ramón

1. **Sección de preguntas en la home.** El chequeo propio da 83/100 a la home v3; con
   preguntas visibles y su FAQPage sube a ~94. driftime no la tiene.
2. ~~**Imagen al compartir (OG) y `og:type` de artículo.**~~ **Resuelto el 6-oct** con
   autorización de Ramón: imagen v3 en `marketing/brand/og-v3/`, conectada a las 21 rutas
   con props opcionales de `Layout.astro` (el sitio publicado no cambia).
3. **Plan Acompañamiento Esencial:** ¿informe mensual o quincenal? Las páginas se
   contradicen (también las publicadas).
4. **Los tres «acá»** del artículo publicado de los 21 chequeos, y la frase «¿Apareces
   cuando tus clientes preguntan?» de la bio de Nosotros.
5. **«Sitio web» obligatorio en contacto** para quien todavía no tiene sitio (hoy lleva una
   ayuda visible, sin cambiar el campo).

## Diferido

- **Fotos nuevas (Unsplash, las elige Ramón):** hay 6 fotos para 21 rutas. Con más piezas,
  los campos de la home llegan de margen a margen y `hilos.jpg` sale de las cabeceras.

## Sin publicar

Nada de esto está publicado: todo vive bajo `/v3/` con `noindex`, en la rama
`claude/magical-franklin-ckfki2`. Publicar es una decisión aparte.
