# Traspaso a la sesión de búsqueda de leads: hallazgos verificados listos para redactar (16-oct-2026)

**De:** sesión del motor de revisión previa · **Rama:** `claude/motor-revision-previa-build` (también en `main` hasta el PR #48; lo de hoy está solo en la rama hasta que se mergee).
**Qué cambia respecto del traspaso anterior** (`encargo-motor-a-sesion-de-leads.md`): el hallazgo ya viene verificado. Ramón pidió que **toda la parte del hallazgo sea del motor** y que tu sesión **escriba los correos**, con el tono y estilo que ya tienes. No hace falta traer nada de tu sesión al motor: la voz está en `.claude/skills/voz-spindlelab` y la estrategia §7.

## 1. Antes de empezar (importante)
- Tu sesión figura **archivada**, con **25 commits sin subir** y parches locales del motor sin commit. **No sobrescribas nada.** Sube tus commits a una rama tuya, o descártalos solo si Ramón lo confirma.
- Trae esta rama: `git fetch origin claude/motor-revision-previa-build`. Los arreglos que reportaste (rutas con espacios, falso "ya contactado", `--sin-corte` en el lote, ids de 2 letras) ya están en `main` desde el PR #48. Si tus parches locales hacen algo distinto, compáralos con `git diff` antes de pisar.

## 2. Qué recibes
`marketing/motor-revision-previa/entregas/para-emilia-2026-10-16-contactos-existentes/` (ver su `LEEME.md`). Sin Apollo: salió de los contactos que ya tenías en `ventas/`.
- **24 verificados** para redactar (C1 cookies, F1 formulario sin política, F10 sin contacto en la primera pantalla); 1 no tiene correo, así que **23 con adónde enviar**. Otros 4 verificados ya recibieron correo (cruce por correo exacto en Gmail) y salen como `No enviar: ya contactado`. Cada uno trae `hechos_verificados` (lo que dos revisores independientes midieron por su cuenta) y `advertencias_de_la_verificacion`.
- 3 de los 24 son **cookies CON aviso**: otra frase y gancho más débil. Nunca decir que no tienen aviso.
- **No escribir:** 1 retenido por identidad, 1 no concluyente (el dominio solo redirige a otro sitio), 3 que la verificación refutó, 32 sin verificar, y los descartados.

## 3. Qué hizo el motor distinto hoy
La verificación sacó de 33 hallazgos "fuertes": 3 falsos (el sitio sí tenía contacto: "CONTATO" en el menú, teléfono visible en la portada, página de hosting "en construcción"), 1 que solo redirige a otro dominio y 1 de identidad dudosa, y cambió la frase de 3 (el sitio sí tenía aviso de cookies). El motor se corrigió: detecta C1 con aviso como variante, F10 reconoce "contato" y teléfono visible, corta páginas de hosting en construcción, avisa si el dominio redirige a otro sitio o es una plantilla sin personalizar, y marca "no concluyente" si la portada no carga. Detalle: `marketing/motor-revision-previa/verificacion-independiente/README.md`.

## 4. Qué sigue sin estar probado
- **Nadie ha enviado nada con esta entrega: no hay dato de conversión.** Propuesta de Ramón y mía: una prueba de 15 correos con el gancho del motor contra 15 con el gancho anterior, mismo día y mismo remitente, y registrar la respuesta **por tipo de oferta** (columna `oferta` en el registro de envíos; eso lo toca el troncal).
- La verificación es de máquina, desde una IP de EE. UU. Las frases de arreglo que no son del kit siguen siendo BORRADOR.
- La estrategia §7 y la skill `agente-outbound` todavía dicen "sin pedir reunión"; la puerta es la llamada de 20 minutos (decisión de Ramón). Lo actualiza el troncal.

## 5. Cómo volver a medir
`node marketing/motor-revision-previa/motor/lote.mjs <csv> --out <carpeta> --concurrencia 4`, luego `preparar-verificacion.mjs`, la verificación independiente y `exportar-emilia.mjs --verificados <json>`. Ver los README de la carpeta del motor. El lote no sigue corriendo si la sesión queda inactiva: es reanudable, se vuelve a lanzar el mismo comando.

## 6. Qué necesita el motor de ti
Respuestas reales (quién contesta y a qué oferta) para saber si el hallazgo convierte. Dejarlas en el registro de envíos con la oferta que se usó.
