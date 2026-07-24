# Carga masiva en Metricool — julio y agosto 2026

Todo lo necesario para dejar programado el bimestre en una sola sesión. Armado 23 jul 2026.
El contenido de cada publicación está razonado en `../calendario-carga-jul-ago-2026.md`; esto es
solo la mecánica de subirlo.

## Qué hay acá

| Archivo | Qué es |
|---|---|
| `piezas/` | Las 15 imágenes, renombradas por fecha. Esta carpeta se sube a Drive |
| `carga-metricool-empresa.csv` | 14 publicaciones: página de LinkedIn + Instagram. **Este es el que se importa** |
| `carga-metricool-personal.csv` | 5 publicaciones personales. **No se importa** (ver abajo); queda como respaldo |
| `generar-csv.py` | El script que generó los CSV. Si cambia un copy, se edita acá y se vuelve a correr |

## La cuenta personal va a mano (decisión de Ramón, 23 jul)

El perfil personal **no se conecta a Metricool**: esos 5 posts se publican manualmente, para
mantener la cuenta personal fuera de la automatización. Los recordatorios ya están en Google
Calendar (miércoles 12:30, hora de Chile, del 29 jul al 26 ago) **con el texto completo en la
descripción**, así que se publica copiando desde el propio evento, sin abrir ningún archivo.

Por eso solo se importa `carga-metricool-empresa.csv`. La marca personal existe en Metricool para
la analítica, pero sin publicación programada.

## Cuentas conectadas (23 jul 2026)

Herramienta contratada: **Metricool Starter**, pagado con PayPal (es el único medio de pago
disponible). Al pagar, PayPal ofrece crear una llave de acceso: se salta, porque lleva al PIN del
Administrador de contraseñas de Google y no aporta nada al cobro.

| Marca en Metricool | Canal | Cuenta correcta |
|---|---|---|
| SpindleLab (empresa) | LinkedIn | Página **SpindleLab** → `linkedin.com/company/spindlelab/` |
| SpindleLab (empresa) | Instagram | `spindle.lab` (cuenta Profesional/Empresa) |
| Personal | LinkedIn | Perfil personal de Ramón, no una página |

⚠️ **Hay dos páginas de empresa en LinkedIn.** La primera conexión de Metricool tomó
**"SpindleLab Consultoria"**, que es un duplicado creado durante el armado inicial. La página real,
donde están los posts del 16, 21 y 23 de julio, se llama **"SpindleLab"** (`/company/spindlelab/`).
Si alguna vez hay que reconectar, es esa. El duplicado se desactiva desde Herramientas de
administrador para no repartir seguidores ni duplicar la entidad de marca.

Instagram publica automáticamente porque `spindle.lab` está vinculada a la Página de Facebook: en
Meta Business Suite aparecen como un solo activo del portfolio "SpindleLab". Si algún día falla la
autopublicación, ese vínculo es lo primero que hay que revisar.

## Pasos

### 1. ✅ Hecho — piezas en Drive y enlaces dentro del CSV

Las 15 imágenes están en la carpeta de Drive **"SpindleLab redes jul-ago"**
(`drive.google.com/drive/folders/19kScPYwkPmshwQQmP3r1SQEe8a3ZD1XZ`), compartida con enlace público,
y `carga-metricool-empresa.csv` ya trae los 18 enlaces puestos en las columnas `Picture Url`.
No hay nada que pegar a mano.

> ⚠️ **No cambies los permisos de esa carpeta ni muevas los archivos hasta después de importar.**
> Metricool descarga las imágenes desde esas URLs; si dejan de ser públicas, la importación entra
> sin las piezas. Si alguna imagen falla, sube el permiso de la carpeta a **Editor**: es lo que
> pide la documentación de Metricool para enlaces de Drive y es la causa más común de una
> importación a medias.
>
> La carpeta es de `hola@spindlelab.cl` y está compartida además con `manuvalleespin@gmail.com`.

### 2. Importa el CSV en la marca de empresa

Planificador → menú de tres puntos junto al filtro → **Importar CSV**. Al importar, Metricool
pregunta el formato de fecha y hora: elige **`YYYY-MM-DD`** y **`00:00:00`**, que es como están
escritos los archivos. Es el error más común de la importación.

Antes de confirmar, Metricool muestra una previsualización. Revisa ahí que las fechas coincidan con
el calendario y que ninguna publicación haya caído en otra red.

### 3. Agrega los primeros comentarios

Ocho publicaciones de LinkedIn llevan link en el primer comentario. **El CSV no trae esa columna**,
así que hay que abrir esas ocho en el planificador y pegarlo con el ícono de comentario. Los textos
están en `../calendario-carga-jul-ago-2026.md`, en cada entrada.

Son: 28 jul, 30 jul, 4 ago, 6 ago, 11 ago, 13 ago, 18 ago, 20 ago, 25 ago y 27 ago.

### 4. Las tres que van a mano

No entran por CSV y hay que crearlas dentro de Metricool:

- **4 ago, LinkedIn + Instagram** — el video a cámara. No existe todavía: falta grabarlo.
- **11 ago, LinkedIn** — el carrusel va como documento PDF para que quede deslizable.
  El archivo es `../carrusel-03-cinco-chequeos/carrusel-linkedin.pdf`. Si Metricool no acepta
  documentos de LinkedIn, esa publicación se sube directo en LinkedIn.

## Cuando termines

Marca en `../calendario-carga-jul-ago-2026.md` qué quedó programado, y borra los recordatorios de
julio de Google Calendar para que no te avisen de algo que ya está en piloto automático.
