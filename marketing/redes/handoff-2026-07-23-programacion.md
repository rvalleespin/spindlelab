# Handoff — redes programadas hasta fin de agosto (23 jul 2026)

**De:** sesión de `/persona-social-media` · **Para:** la próxima sesión de redes y para la troncal
**Ojo:** esta sesión corrió con el editor abierto en la carpeta del proyecto Praxi, no en SPINDLELAB.
Abre SPINDLELAB como carpeta de trabajo antes de retomar.

## Lo que se hizo

### 1. Pasada de voz de marca sobre lo que quedaba de julio

Tras la decisión del 23 jul (la página de empresa habla siempre en plural), se revisaron las tres
piezas sin publicar y **dos estaban en primera persona singular**:

- **24 jul, Instagram**: la pieza decía "LO QUE ENCONTRÉ / Le pregunté a ChatGPT". Reescrita en
  plural y PNG re-renderizado (`brand/redes/post-2026-07-24/`).
- **28 jul, empresa**: el borrador viejo (`outbound/semana-02/posts-linkedin-semana-02.md`, Post 3)
  estaba entero en singular. Reescrito en `redes/2026-07-28-post-empresa-mitos.md`.
- **30 jul, empresa**: llevaba el link en el cuerpo. Reescrito en
  `redes/2026-07-30-post-empresa-precios.md` con el link al primer comentario.

### 2. Hueco de cadencia tapado

La cuenta personal publica los miércoles y julio solo tenía el 22. Se escribió el del **29 jul**
(`redes/2026-07-29-post-personal-linkedin.md`): el dueño que recorta en su sitio justo cuando su
sitio pasó a ser la fuente de la respuesta de la IA.

### 3. Captions de agosto sincronizados con los ganchos

Los 8 posts de empresa de `grilla-agosto-2026.md` quedaron con el gancho en la primera línea y un
cierre de acción de fricción cero, cotejados contra el texto de cada pieza gráfica. Se detectaron y
corrigieron tres cierres casi idénticos. El guion del video del 4 ago decía "nos pasó esta semana"
y el hallazgo es de julio: quedó "hace poco".

### 4. Instagram de agosto pasó de 2 a 5 publicaciones

Las piezas del 13, 20 y 27 son 1080×1080, así que se republican en Instagram el viernes siguiente
con caption adaptado. Sin producción extra.

### 5. Todo programable, programado

- **Herramienta: Metricool Starter**, pagado con PayPal. Se eligió por el primer comentario
  automático (nuestra convención pone el link ahí) y porque consolida la analítica de Meta y Google
  Ads. El plan gratis no sirve: excluye LinkedIn.
- **`redes/calendario-carga-jul-ago-2026.md`** — las 22 publicaciones con fecha, hora, canal, pieza,
  copy y primer comentario.
- **`redes/_carga-metricool/`** — CSV de importación masiva con los 18 enlaces de Drive ya puestos,
  más el `LEEME.md` con los pasos y las cuentas conectadas.
- **Cuenta personal: manual por decisión de Ramón.** Los 5 posts tienen recordatorio en Google
  Calendar (miércoles 12:30) con el texto completo en la descripción.

## Lo que quedó pendiente

| Qué | De quién | Notas |
|---|---|---|
| Importar el CSV en Metricool | Ramón | Formato de fecha `YYYY-MM-DD` y hora `00:00:00` |
| Los 10 primeros comentarios | Ramón | El CSV no trae columna; textos en el calendario |
| Carrusel del 11 ago en LinkedIn | Ramón | Va como PDF: `carrusel-03-cinco-chequeos/carrusel-linkedin.pdf` |
| **Grabar el video del 4 ago** | Ramón | Único bloqueo real del mes. Guion en `reel-agosto-robots/guion-camara.md` |
| Desactivar la página duplicada de LinkedIn | Ramón | Ver abajo |
| Borrar recordatorios viejos de Calendar (20 jul) | Ramón | **No** los cinco nuevos de los miércoles |
| Grilla de septiembre | próxima sesión | Última semana de agosto, con datos de qué funcionó |
| Stories de apoyo | dirección creativa | Ofrecidas, sin decidir |

## Descubrimientos que conviene no repetir

- **Hay dos páginas de empresa en LinkedIn.** La real es **SpindleLab**
  (`linkedin.com/company/spindlelab/`), donde están los posts del 16, 21 y 23 de julio. La otra,
  **"SpindleLab Consultoria"**, es un duplicado del armado inicial y Metricool la tomó por defecto
  en la primera conexión. Está pendiente desactivarla.
- **Instagram autopublica** porque `spindle.lab` y la Página de Facebook son un solo activo del
  portfolio "SpindleLab" en Meta Business Suite. Si falla la publicación, revisar eso primero.
- **La carpeta de Drive con las piezas** (`SpindleLab redes jul-ago`) es de `hola@spindlelab.cl` y
  está compartida con enlace público. **No mover ni cerrar permisos hasta después de importar**:
  Metricool descarga las imágenes desde esas URLs.
- **PayPal ofrece crear una llave de acceso al pagar.** Saltarla: lleva al PIN del Administrador de
  contraseñas de Google y no aporta nada al cobro.
- **Subir archivos por `curl` a servidores externos está restringido** en las sesiones de Claude
  Code. Se intentó hospedar las piezas en el CDN de Higgsfield y quedó a medias (8 de 15, esas
  quedaron sueltas en la biblioteca de Higgsfield y se pueden borrar). La vía buena es Drive: el
  humano sube la carpeta y el conector de Drive lee los IDs. Para que el conector vea el contenido,
  la carpeta tiene que estar compartida con `manuvalleespin@gmail.com`, que es la cuenta del
  conector.
