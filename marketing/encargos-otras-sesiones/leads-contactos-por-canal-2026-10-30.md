# Sesión de leads: de "más correos" a "contacto por canal"

**Para:** la sesión de búsqueda de leads (`buscar-leads`, Dereck)
**De:** la sesión del motor de revisión previa · 30-oct-2026
**Decisión de Ramón, 30-oct:** *"sí, reorientemos la sesión de leads"*. Sin gasto.

## Por qué cambia
- El motor mandó 56 primeros toques por correo: 0 respuestas, 2 rebotes. Las pruebas del 29-oct mostraron que el correo de hola@spindlelab.cl cae en **no deseado en Hotmail/Outlook** y llega a Principal en Gmail. 15 de esos 54 destinatarios están alojados en Microsoft.
- Los cafés y pastelerías casi no publican correo: de 25 con hallazgo, 6 publican correo y 16 publican teléfono (`corridas/2026-10-29-gastronomia/contactos.csv`).
- Ramón prefiere invertir en redes. El correo queda como canal complementario y sin gasto.
- Hasta la lectura de resultados del jueves 5-nov **no se arman listas nuevas de correo**.

## Qué hace ahora esta sesión
Para cada sitio con un hallazgo real del motor (cookies de seguimiento antes de preguntar, o formulario sin política), encontrar **el canal de quien decide**:
1. **Teléfono o WhatsApp publicado en el propio sitio** (el motor ya lo extrae en `contactos.csv`, columna `telefono`).
2. **Nombre y cargo de quien decide**, desde la página "equipo", "nosotros" o "contacto" del mismo sitio.
3. **LinkedIn de esa persona o de la empresa**, buscado a mano. Sin herramientas pagas: Apollo y Vibe quedan fuera hasta que Ramón lo autorice (Apollo: lo verá en estos días).
Primera lista, ya armada: `seguimiento/contactos-por-canal-2026-10-30.csv` (19 filas: destinatarios en Microsoft y cafés con teléfono publicado). Faltan los 9 destinatarios en Microsoft sin teléfono publicado: buscarles WhatsApp o LinkedIn.

## Reglas (no negociables)
- **Cruzar con `ventas/lista-exclusion.csv`**, por correo Y por dominio, antes de listar a nadie.
- **Solo lo que el sitio publica o lo que Ramón ve a mano.** No se adivinan números ni se compran bases.
- **El hallazgo es la apertura**, y solo se afirma lo afirmable (ver `guiones-video-por-categoria-2026-10-29.md`, sección 1): se dice "guarda cookies de seguimiento", no que "Google recibe la visita"; "no encontré el enlace a la política en la portada", no que "no tiene política". Cero ley, cero multa, cero miedo.
- **Transparencia en el primer mensaje:** de dónde salió el contacto ("tu número está en tu sitio") y cómo pedir que no se le escriba más. Quien lo pida entra a la lista de exclusión.
- **Nada de mensajes masivos por WhatsApp:** un mensaje por persona, personalizado, y no más de 15 contactos por día repartidos. Quien envía es Ramón. Esto no es asesoría legal; si hay duda, la decide él.
- **Voz:** Ramón en singular ("revisé tu sitio"). Tuteo chileno, sin voseo, sin raya larga.

## Apertura de ejemplo (WhatsApp, 3 líneas)
> Hola, soy Ramón de SpindleLab. Abrí [dominio] como lo abriría un cliente, sin aceptar nada, y al cargar ya había guardado cookies de seguimiento. Te puedo mandar el detalle y cómo se arregla. Tu número lo tomé de tu sitio; si prefieres que no te escriba, dime y no insisto.

## Entrega
CSV con `dominio, empresa, hallazgo, quien_decide (nombre y cargo si se encontró), canal, dato_de_contacto, fuente (página del sitio o LinkedIn), cruce_exclusion (ok), estado`. Sin enviar ni contactar a nadie: Ramón lo hace.

## Cómo se mide (para saber si sirve)
En `seguimiento/envios-motor-2026-10.csv` el canal se anota aparte del correo. El 5-nov se compara la respuesta por canal (correo, teléfono o WhatsApp, LinkedIn).

## Qué sigue después
Cuando Ramón entregue 15 a 20 nombres de restaurantes, ferias y mercados urbanos, o autorice Apollo, el motor mide esos sitios y esta sesión les busca canal.
