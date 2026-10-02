# Traspaso: mini-diagnóstico para Focus Contable (Eduardo Bascur)

**Para la sesión que corra la skill `mini-diagnostico` (Valen).** Esto es el contrato
que ella pide: cliente/servicio + prospecto + el hallazgo previo del outbound.

## ⏰ Lo primero: el plazo ya está apretado

Eduardo pidió el diagnóstico el **miércoles 1-oct a las 12:08 (Santiago)**. El correo
prometía **24 horas**. O sea que al 2-oct ya está en el límite o pasado. La skill dice
que el plazo es regla sagrada y que un diagnóstico tarde perdió el momento: **esto va
primero en la cola, y si no sale hoy hay que avisarle a Eduardo que llega mañana**, no
dejarlo en silencio.

## El prospecto

| | |
|---|---|
| Persona | **Eduardo Bascur**, Director de Operaciones |
| Correo | `eduardohb@hbcontadores.cl` (ojo: **@hbcontadores.cl**, no @focuscontable) |
| Teléfono | +56 9 6167 3894 |
| Empresa | **Focus Contable** / HB Contadores — dos marcas del mismo dueño |
| Sitio a auditar | **focuscontable.cl** |
| Rubro | Contadores y asesoría tributaria. Vende además **cursos** ($25.000 a $70.000) con carrito y aula virtual |
| Ciudad | Puerto Montt (Valle Volcanes 5202) |
| YouTube | `@eduardobascurimpuestos` — "Eduardo Bascur \| Impuestos". **Relevante**: ya produce contenido, y eso cambia la recomendación |
| Hilo en Gmail | asunto `focuscontable.cl vende cursos y no tiene política de privacidad`, threadId `1a0f2aceca48e041` |
| Fuente del lead | Guía de DiarioEmprende (`ventas/contactos-diarioemprende-30sep.csv`) |

Lo que escribió, textual: *"Me interesa poder obtener un diagnóstico gratis que
comentas y así poder evaluar la situación actual de nuestra empresa en ese sentido."*

## El hallazgo previo, ya medido — REÚSALO, no lo rehagas

Medido con la sonda CDP el 30-sep (dos tramos, navegador real, cero clics):

- **No deja ninguna cookie en la primera visita.** Usa **Plausible**, no Google
  Analytics. Eso está bien hecho y hay que decírselo: es la concesión que da
  credibilidad al resto.
- Terceros que carga: `plausible.io`, `fonts.googleapis.com`, `cdnjs.cloudflare.com`,
  `s.w.org`. Nada de publicidad ni rastreo cruzado.
- **Cero enlaces legales en todo el sitio**: ni política de privacidad ni términos.
- Tiene **carrito y aula virtual**: ahí alguien deja nombre, correo y paga.
- 120 peticiones en la primera carga.

⚠️ **NO confundas con `contotal.cl`.** Ese es OTRO prospecto del mismo lote, también
contador y también de Los Lagos. Los hallazgos de las imágenes apuntando a
`localhost:10023` y del `info@example.com` en la portada son **de contotal.cl**, NO de
focuscontable.cl. Mezclarlos sería inventar un hallazgo.

El JSON crudo de la sonda y las capturas quedaron en el scratchpad de la sesión del
30-sep, que ya no existe. Si necesitas el detalle, **vuelve a medir**: el script está
en el commit `0d685b3`, en `marketing/lanzamiento-vyc-23sep/seguimientos/probe.mjs`
(se recupera con `git show 0d685b3:<ruta>`), y necesita Chrome headless escuchando en
el puerto 9530.

## Lo que falta y hay que hacer de verdad

1. **Auditar con herramientas, no a ojo.** `curl` sobre focuscontable.cl: status,
   title, meta description, JSON-LD, `robots.txt`, `sitemap.xml`. La jerarquía de la
   skill manda: **un bloqueo de entrada le gana a cualquier arreglo de schema**, así
   que el robots.txt se revisa primero. Si `curl` da error de SSL self-signed, es el
   proxy de salida del entorno, no el sitio: reintenta con `-k`.
2. **La parte que necesita al humano: qué contesta ChatGPT.** El correo prometió
   literalmente *"qué responde hoy ChatGPT cuando preguntan por un contador en Puerto
   Montt"*. **Esto hay que correrlo de verdad**, no redactarlo. Se puede con el
   navegador de la app (`preview_start` sobre chatgpt.com) o lo corre Ramón y te pasa
   el resultado. **Si no se corre, no se afirma**: se redacta como riesgo general sin
   inventar qué apareció.
3. **Una sola corrección de mayor impacto**, elegida por jerarquía, no por orden de
   aparición. Y con el mapa de 3-4 pasos: el paso 1 se regala, los otros son el
   trabajo que se contrata. Si la única necesidad visible es la que regalas, la venta
   muere.
4. **El correlativo.** En el historial completo (`git log --all`) existen
   **SPL-DIAG-2026-001, 002 y 006**. Faltan 003, 004 y 005: no están ni en el árbol ni
   en el historial, así que o nunca existieron o viven fuera de git. El siguiente
   seguro es **007**, pero confírmalo con Ramón antes de numerar.
5. **Renderizar y MIRAR el PDF** antes de entregar. Tiene que caber en una página.

## Dos cosas del caso que conviene aprovechar

- **El ángulo de la ley es el gancho, no el diagnóstico.** Él respondió a un correo
  sobre política de privacidad, pero pidió evaluar "la situación actual de nuestra
  empresa". El diagnóstico es el del motor completo (sitio + visibilidad en Google y
  en IA); lo de la política entra como uno de los hallazgos, no como el tema.
- **Tiene canal de YouTube con contenido tributario propio.** Eso es material que ya
  existe y que hoy probablemente no está trabajando para el sitio. Es un ángulo fuerte
  y verificable, y no requiere que él produzca nada nuevo.

## Reglas que no se negocian en este caso

- **El documento lo aprueba Ramón antes de salir.** La skill no envía.
- **Cero hallazgos inventados**, ni uno. La credibilidad es el producto.
- **No abras el documento con lo que no se hizo.** La honestidad metodológica va en la
  letra chica del pie.
- **Nunca el puntaje del chequeo automático**, y nunca decir que alguien "cumple".
- Al terminar, el pipeline (`ventas/pipeline.md`) pasa a **"Diagnóstico enviado"**.

## Archivos que la sesión nueva debería leer

- `.claude/skills/mini-diagnostico/SKILL.md` — el método.
- `marketing/oficina/clientes/spindlelab.md` — la ficha: plantilla, remitente, plazo.
- `.claude/skills/voz-spindlelab/` (SKILL.md + corpus.md) — **la voz, por ejemplos.**
  Sección 8 del corpus: el descarte del outbound del 30-sep, que es justo el error de
  tono a evitar.
- `ventas/contactos-diarioemprende-30sep.csv` — la fila de focuscontable.cl.
- `marketing/diagnosticos/SPL-DIAG-2026-006-legalprisma/` — el último hecho, como
  referencia de formato.
