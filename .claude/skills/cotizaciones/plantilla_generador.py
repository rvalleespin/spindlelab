# -*- coding: utf-8 -*-
"""PLANTILLA de cotización PDF · SpindleLab.

Es la SPL-COT-2026-015 (galería de arte, sep-2026), enviada tal cual. Para una nueva:
  1. Copiar a COTIZACIONES/SPL-COT-AAAA-NNN_generador.py (junto a logo-spindlelab-nuevo.png).
  2. Cambiar: SALIDA, REFERENCIAS, N.º/Proyecto/Fecha/Cliente del encabezado, "El proyecto",
     la tabla de planes (precios SOLO los publicados en el sitio), fases (qué se hace),
     hosting/correos (borrar la sección si no aplica), adicionales y alcance.
  3. Correr con un Python que tenga reportlab (ver SKILL.md) y revisar el render página por página.
"""
import os
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_RIGHT, TA_CENTER
from reportlab.platypus import (SimpleDocTemplate, Paragraph, Spacer, Table,
                                TableStyle, HRFlowable, KeepTogether, Image, CondPageBreak)

AQUI = os.path.dirname(os.path.abspath(__file__))
SALIDA = os.path.join(AQUI, "SPL-COT-2026-015_galeria_arte_virtual.pdf")

# Referencias de dirección de arte: (categoría, referencia, qué tomamos).
# Vacía = la sección no se imprime. Llenar con las referencias que eligió Ramón.
REFERENCIAS = [
    ("Galería curada",
     "<b>Studio Iron</b> · studio-iron.com",
     "Es una galería en línea de piezas de autor, y el modelo más cercano a lo que quieres. Tomamos "
     "el crédito visible en cada obra, el fondo neutro, el recorrido por artista y la venta integrada"),
    ("Portafolio de imagen",
     "<b>PRODn</b> (Art + Commerce) · prodn.com",
     "El índice de trabajos como archivo: cada pieza con título y autor en mayúsculas, y una "
     "interfaz reducida a lo justo"),
    ("Estudio de diseño",
     "<b>Quatrième Étage</b> · quatriemeetage.studio",
     "La navegación mínima arriba, el espacio en blanco y una tipografía limpia que no compite "
     "con la obra"),
    ("Portafolio de autor",
     "<b>Artem Taradash</b> · taradash.me",
     "Las piezas numeradas a ancho completo, la mezcla de tipografía serif y sans, y un "
     "desplazamiento pausado, sin efectos"),
]

# Paleta oficial SpindleLab
NEGRO = colors.HexColor("#131A22")      # --ink
GRIS = colors.HexColor("#555555")
GRIS_CLARO = colors.HexColor("#F7F5F0") # --paper
ACENTO = colors.HexColor("#C9A227")     # --gold
LINEA = colors.HexColor("#E5E1D8")      # --line

doc = SimpleDocTemplate(
    SALIDA, pagesize=letter,
    leftMargin=22*mm, rightMargin=22*mm, topMargin=18*mm, bottomMargin=18*mm,
    title="Cotización SpindleLab · Galería de arte virtual",
    author="SpindleLab · Ramón Vallejos Espíndola")

ss = getSampleStyleSheet()
st_h = ParagraphStyle("h", parent=ss["Heading2"], fontName="Helvetica-Bold",
                      fontSize=13, textColor=NEGRO, spaceBefore=14, spaceAfter=6)
st_body = ParagraphStyle("b", parent=ss["Normal"], fontSize=10, leading=14.5, textColor=NEGRO)
st_small = ParagraphStyle("s", parent=ss["Normal"], fontSize=8.5, leading=12, textColor=GRIS)
st_right = ParagraphStyle("r", parent=st_body, alignment=TA_RIGHT)
st_cell = ParagraphStyle("c", parent=ss["Normal"], fontSize=9.5, leading=13, textColor=NEGRO)
st_cell_c = ParagraphStyle("cc", parent=st_cell, alignment=TA_CENTER)
st_pkg = ParagraphStyle("pkg", parent=st_cell_c, fontName="Helvetica-Bold", fontSize=10.5)
st_pkg_w = ParagraphStyle("pkgw", parent=st_pkg, textColor=colors.white)
st_cell_w = ParagraphStyle("cw", parent=st_cell, textColor=colors.white)
st_cell_cw = ParagraphStyle("ccw", parent=st_cell_c, textColor=colors.white)
st_price = ParagraphStyle("pr", parent=st_cell_c, fontName="Helvetica-Bold", fontSize=12)

TABLA_BASE = [
    ("BACKGROUND", (0,0), (-1,0), NEGRO),
    ("GRID", (0,0), (-1,-1), 0.5, LINEA),
    ("VALIGN", (0,0), (-1,-1), "TOP"),
    ("ROWBACKGROUNDS", (0,1), (-1,-1), [colors.white, GRIS_CLARO]),
    ("TOPPADDING", (0,0), (-1,-1), 5),
    ("BOTTOMPADDING", (0,0), (-1,-1), 5),
]

E = []
A = E.append

# ---------- Encabezado ----------
logo = Image(os.path.join(AQUI, "logo-spindlelab-nuevo.png"), width=50*mm, height=50*mm*146/805)
logo.hAlign = "LEFT"
head = Table([
    [logo,
     Paragraph("SEO, visibilidad en IA y desarrollo web<br/>Ramón Vallejos Espíndola<br/>"
               "hola@spindlelab.cl", ParagraphStyle("hd", parent=st_small, alignment=TA_RIGHT))],
], colWidths=[95*mm, 71*mm])
head.setStyle(TableStyle([("VALIGN", (0,0), (-1,-1), "TOP")]))
A(head)
A(Spacer(1, 2))
A(HRFlowable(width="100%", thickness=2, color=NEGRO))
A(Spacer(1, 6))

meta = Table([
    [Paragraph("<b>Documento:</b> Cotización de proyecto", st_body),
     Paragraph("<b>N.º:</b> SPL-COT-2026-015", st_right)],
    [Paragraph("<b>Proyecto:</b> Galería de arte virtual, bilingüe y autoadministrable", st_body),
     Paragraph("<b>Fecha:</b> 22 de septiembre de 2026", st_right)],
    [Paragraph("<b>Cliente:</b> María Loreto Hernández", st_body),
     Paragraph("<b>Validez:</b> 30 días", st_right)],
], colWidths=[110*mm, 56*mm])
meta.setStyle(TableStyle([
    ("VALIGN", (0,0), (-1,-1), "TOP"),
    ("BOTTOMPADDING", (0,0), (-1,-1), 2),
    ("TOPPADDING", (0,0), (-1,-1), 2),
    ("LEFTPADDING", (0,0), (-1,-1), 0),
    ("RIGHTPADDING", (0,0), (-1,-1), 0),
]))
A(meta)

# ---------- Concepto ----------
A(Paragraph("El proyecto", st_h))
A(Paragraph(
    "Diseño y desarrollo de una galería de arte virtual en español e inglés, sobre tu dominio .com. "
    "El sitio parte con al menos tres artistas, cada uno con su página y su obra, y está pensado "
    "para crecer: sumar artistas, obras y exposiciones con el tiempo sin rehacer nada. La obra es "
    "la protagonista, con espacio, buena luz y una navegación que se aparta para dejarla hablar.", st_body))
A(Spacer(1, 4))
A(Paragraph(
    "Tú administras el contenido desde un panel propio: subes una obra, editas sus datos en ambos "
    "idiomas y ordenas cómo aparece en la galería, sin depender de nadie.", st_body))

# ---------- Referencias de dirección de arte (opcional) ----------
if REFERENCIAS:
    A(Paragraph("Referencias de dirección de arte", st_h))
    A(Paragraph(
        "Partimos de estos cuatro sitios. La última columna dice qué tomamos de cada uno para tu galería:", st_body))
    A(Spacer(1, 6))
    filas = [[Paragraph("<b>Categoría</b>", st_cell_w), Paragraph("<b>Referencia</b>", st_cell_w),
              Paragraph("<b>Qué tomamos para tu galería</b>", st_cell_w)]]
    for cat, ref, toma in REFERENCIAS:
        filas.append([Paragraph(cat, st_cell), Paragraph(ref, st_cell), Paragraph(toma, st_cell)])
    arte = Table(filas, colWidths=[28*mm, 62*mm, 76*mm], repeatRows=1)
    arte.setStyle(TableStyle(TABLA_BASE))
    A(arte)

# ---------- Paquetes ----------
A(CondPageBreak(90*mm))
A(Paragraph("Opciones de inversión", st_h))

def li(*items):
    return Paragraph("<br/>".join("•&nbsp;" + i for i in items), st_cell)

pkg = Table([
    [Paragraph("", st_cell), Paragraph("SITIO ESENCIAL", st_pkg_w),
     Paragraph("SITIO COMPLETO ★", st_pkg), Paragraph("PLATAFORMA A MEDIDA", st_pkg_w)],
    [Paragraph("<b>Ideal para</b>", st_cell),
     Paragraph("Abrir la galería con tres artistas, en un idioma", st_cell_c),
     Paragraph("Una galería bilingüe que crece contigo", st_cell_c),
     Paragraph("Vender obra en línea desde el lanzamiento", st_cell_c)],
    [Paragraph("<b>Páginas</b>", st_cell),
     li("Home y hasta 5 páginas", "Una página por artista (3)", "Sobre la galería y contacto"),
     li("Home y hasta 12 páginas", "Artistas y exposiciones que creas tú desde el panel",
        "Ficha individual por obra"),
     li("Todo lo del Sitio Completo", "Páginas sin tope", "Tienda: carro, pago en línea, envíos y términos")],
    [Paragraph("<b>Panel propio</b>", st_cell),
     li("Editar textos e imágenes tú misma", "Capacitación de uso (1 sesión)"),
     li("Subir, editar y ordenar obras", "Ficha de obra con técnica, medidas, año y disponibilidad",
        "Botón «consultar por esta obra»", "Capacitación de uso (1 sesión)"),
     li("Todo lo del Sitio Completo", "Precio y stock por obra (pieza única o edición)",
        "Marcar obra como vendida")],
    [Paragraph("<b>Idiomas</b>", st_cell),
     Paragraph("Uno (español)", st_cell_c), Paragraph("Español e inglés", st_cell_c),
     Paragraph("Multi-idioma", st_cell_c)],
    [Paragraph("<b>Técnico</b>", st_cell),
     li("Diseño a medida", "SEO técnico base: schema, velocidad, indexación"),
     li("Diseño a medida", "SEO técnico y puesta a punto AEO/GEO",
        "Datos de obra listos para sumar la tienda sin rehacer el sitio"),
     li("Todo lo del Sitio Completo", "Integración de pagos (medio definido contigo)")],
    [Paragraph("<b>Plazo</b>", st_cell),
     Paragraph("~3 semanas", st_cell_c), Paragraph("~4 a 6 semanas", st_cell_c),
     Paragraph("Se define contigo", st_cell_c)],
    [Paragraph("<b>Revisiones</b>", st_cell),
     Paragraph("2 rondas", st_cell_c), Paragraph("3 rondas", st_cell_c),
     Paragraph("Se define contigo", st_cell_c)],
    [Paragraph("<b>Valor (CLP + IVA)</b>", st_cell),
     Paragraph("$690.000", st_price), Paragraph("$1.190.000", st_price),
     Paragraph("Se cotiza tras una reunión", st_cell_c)],
], colWidths=[30*mm, 43*mm, 45*mm, 48*mm], repeatRows=1)

pkg.setStyle(TableStyle([
    ("BACKGROUND", (1,0), (-1,0), NEGRO),
    ("BACKGROUND", (2,0), (2,0), ACENTO),
    ("BACKGROUND", (0,1), (0,-1), GRIS_CLARO),
    ("BACKGROUND", (1,-1), (-1,-1), GRIS_CLARO),
    ("GRID", (0,0), (-1,-1), 0.5, LINEA),
    ("BOX", (2,0), (2,-1), 1.2, ACENTO),
    ("VALIGN", (0,0), (-1,-1), "TOP"),
    ("TOPPADDING", (0,0), (-1,-1), 5),
    ("BOTTOMPADDING", (0,0), (-1,-1), 5),
    ("LEFTPADDING", (0,0), (-1,-1), 5),
    ("RIGHTPADDING", (0,0), (-1,-1), 5),
]))
A(pkg)
A(Spacer(1, 4))
A(Paragraph("★ Te recomendamos el Sitio Completo porque es el plan que cubre todo lo que pediste: dos idiomas "
            "y un panel para administrar artistas y obras. Además deja lista la base para sumar la tienda después "
            "sin rehacer el sitio. Los precios son los publicados en spindlelab.cl/servicios/desarrollo-web y "
            "no incluyen IVA (19%).", st_small))

# ---------- Fases ----------
A(Paragraph("Fases de ejecución (aplican a todos los planes)", st_h))
A(Paragraph(
    "Cualquiera de los tres planes se trabaja en cinco fases, y cada una termina con algo concreto "
    "que revisas. Nada avanza a la fase siguiente sin tu aprobación.", st_body))
A(Spacer(1, 6))

fases = Table([
    [Paragraph("<b>Fase</b>", st_cell_w), Paragraph("<b>Qué se hace</b>", st_cell_w),
     Paragraph("<b>Entregable</b>", st_cell_w), Paragraph("<b>Pago asociado</b>", st_cell_cw)],
    [Paragraph("<b>1. Descubrimiento</b>", st_cell),
     Paragraph("Reunión inicial, revisión de artistas y obra, dirección de arte con referentes y definición de hosting y correos", st_cell),
     Paragraph("Brief creativo aprobado", st_cell),
     Paragraph("30% al iniciar", st_cell_c)],
    [Paragraph("<b>2. Diseño</b>", st_cell),
     Paragraph("Propuesta visual de las páginas clave (home, página de artista y ficha de obra) antes de escribir código", st_cell),
     Paragraph("Diseño aprobado", st_cell),
     Paragraph("–", st_cell_c)],
    [Paragraph("<b>3. Desarrollo</b>", st_cell),
     Paragraph("Construcción del sitio y del panel, con avances visibles en una URL de prueba", st_cell),
     Paragraph("Sitio y panel funcionando en staging", st_cell),
     Paragraph("40% al aprobar staging", st_cell_c)],
    [Paragraph("<b>4. QA y contenido</b>", st_cell),
     Paragraph("Carga inicial de obra, pruebas en dispositivos y en ambos idiomas, rendimiento, SEO y rondas de revisión del plan", st_cell),
     Paragraph("Checklist de calidad", st_cell),
     Paragraph("–", st_cell_c)],
    [Paragraph("<b>5. Lanzamiento</b>", st_cell),
     Paragraph("Conexión del dominio .com, SSL, correos, analítica, publicación y capacitación del panel. Incluye 30 días de garantía", st_cell),
     Paragraph("Sitio en producción", st_cell),
     Paragraph("30% contra entrega", st_cell_c)],
], colWidths=[30*mm, 72*mm, 34*mm, 30*mm], repeatRows=1)
fases.setStyle(TableStyle(TABLA_BASE))
A(fases)

# ---------- Hosting y correos ----------
A(Paragraph("Hosting, dominio y correos", st_h))
A(Paragraph(
    "Si te preocupa que una galería con muchas imágenes en alta calidad necesite un hosting caro, no "
    "es el caso. El sitio se publica como páginas ya armadas, y cada imagen se prepara en varios "
    "tamaños antes de subirla. Así, un teléfono descarga la versión liviana y una pantalla grande la "
    "de alta resolución.", st_body))
A(Spacer(1, 4))
A(Paragraph(
    "Te proponemos esta infraestructura. Todo queda contratado a tu nombre, para que sea tuyo aunque "
    "algún día dejes de trabajar con nosotros. La configuración va incluida en los tres planes.", st_body))
A(Spacer(1, 6))
infra = Table([
    [Paragraph("<b>Qué</b>", st_cell_w), Paragraph("<b>Solución propuesta</b>", st_cell_w),
     Paragraph("<b>Costo de terceros</b>", st_cell_cw)],
    [Paragraph("Hosting", st_cell),
     Paragraph("Cloudflare Pages. Sirve el sitio desde servidores en todo el mundo, permite uso comercial y no "
               "cobra por visitas. Admite hasta 20.000 archivos, suficiente para varios artistas y cientos de obras", st_cell),
     Paragraph("$0 en su plan gratuito", st_cell_c)],
    [Paragraph("Dominio", st_cell),
     Paragraph("Tu dominio .com se queda donde lo compraste. Nosotros lo conectamos al sitio", st_cell),
     Paragraph("Renovación anual con tu proveedor", st_cell_c)],
    [Paragraph("Correos, opción A", st_cell),
     Paragraph("Zoho Mail. Hasta 5 casillas con tu dominio (por ejemplo hola@ y ventas@), de 5 GB cada una, "
               "en la web y en la app del teléfono", st_cell),
     Paragraph("$0 en su plan gratuito", st_cell_c)],
    [Paragraph("Correos, opción B", st_cell),
     Paragraph("Google Workspace Business Starter. Gmail con tu dominio, 30 GB por casilla, más Drive y Meet", st_cell),
     Paragraph("desde $6.500 por casilla al mes", st_cell_c)],
], colWidths=[30*mm, 100*mm, 36*mm], repeatRows=1)
infra.setStyle(TableStyle(TABLA_BASE))
A(infra)
A(Spacer(1, 4))
A(Paragraph("Valores publicados por cada proveedor en septiembre de 2026. Los cobra el proveedor directamente "
            "y pueden cambiar. Si la galería llega a crecer mucho más de lo previsto, las imágenes se pueden "
            "mover a un almacenamiento aparte, de bajo costo, sin tocar el sitio.", st_small))

# ---------- Adicionales ----------
A(CondPageBreak(60*mm))
A(Paragraph("Servicios adicionales (opcionales)", st_h))
add = Table([
    [Paragraph("<b>Servicio</b>", st_cell_w), Paragraph("<b>Descripción</b>", st_cell_w), Paragraph("<b>Valor (CLP + IVA)</b>", st_cell_cw)],
    [Paragraph("Tienda de obras", st_cell),
     Paragraph("Cuando quieras vender en línea, sumamos la tienda a tu Sitio Completo: carro, pago en línea, "
               "stock por obra y confirmación de compra. Se trabaja como una Plataforma a Medida", st_cell),
     Paragraph("Se cotiza tras una reunión", st_cell_c)],
    [Paragraph("Mantención mensual", st_cell),
     Paragraph("Actualizaciones, respaldos, monitoreo y soporte, hasta 4 horas al mes", st_cell),
     Paragraph("$50.000 / mes", st_cell_c)],
    [Paragraph("Ronda extra", st_cell),
     Paragraph("Una ronda de revisión más allá de las que incluye tu plan", st_cell),
     Paragraph("$40.000", st_cell_c)],
], colWidths=[36*mm, 95*mm, 35*mm], repeatRows=1)
add.setStyle(TableStyle(TABLA_BASE))
A(add)

# ---------- Referencias de precio ----------
A(KeepTogether([
    Paragraph("Referencias de precios de mercado", st_h),
    Paragraph(
        "Comparamos estos valores con fuentes públicas de precios de 2026. A nivel internacional, una "
        "agencia cobra entre USD 2.000 y 6.000 (unos CLP $1.900.000 a $5.700.000) por un sitio a medida "
        "con panel de administración y dos idiomas. En Chile, los proyectos freelance a medida van de "
        "CLP $500.000 a $2.500.000. El Sitio Completo queda bajo el rango de agencias y dentro del rango "
        "freelance local.", st_body),
    Spacer(1, 4),
    Paragraph(
        "• Precios de páginas web en Chile 2026 · forrate.cl/blog/cuanto-cuesta-pagina-web-chile<br/>"
        "• Tarifas freelance y por proyecto en Chile · tralkn.com/blog/cuanto-cuesta-pagina-web-chile<br/>"
        "• Rangos por tipo de sitio en Chile · bestsolution.cl/cuanto-cuesta-pagina-web-chile-2026<br/>"
        "• Costo de sitios desarrollados con IA (global) · chilledsites.com/blog/how-much-does-ai-website-cost<br/>"
        "• Datos de precios de desarrollo web 2026 (global) · digitalapplied.com/blog/website-development-cost-2026-complete-pricing-data<br/>"
        "• Precios publicados de SpindleLab · spindlelab.cl/servicios/desarrollo-web", st_small),
]))

# ---------- Condiciones ----------
A(KeepTogether([
    Paragraph("Condiciones comerciales", st_h),
    Paragraph(
        "El pago se hace por transferencia bancaria, en tres partes: 30% al iniciar (Fase 1), 40% al "
        "aprobar el sitio en staging (Fase 3) y 30% contra entrega en producción (Fase 5). Los plazos "
        "corren desde que recibimos el anticipo y el material: imágenes de las obras y textos. Con el "
        "pago final, el código y el diseño pasan a ser tuyos.<br/><br/>"
        "Todos los valores de esta cotización son netos, incluidos los servicios adicionales, y se les "
        "suma IVA (19%). Los costos de terceros, como dominio, correos o pasarela de pago, los pagas "
        "directamente a cada proveedor. Esta cotización es válida por 30 días desde su emisión.", st_body),
    Spacer(1, 8),
    Paragraph("<b>Alcance y límites</b>", st_body),
    Spacer(1, 2),
    Paragraph(
        "• La carga inicial incluye hasta 30 obras por artista. Las siguientes las subes tú desde el panel.<br/>"
        "• Tú nos entregas las imágenes de las obras y los textos en español e inglés: bio de cada "
        "artista, textos curatoriales y fichas.<br/>"
        "• En el Sitio Completo, las páginas de artistas, exposiciones y obras que crees desde el panel no "
        "cuentan dentro del tope de 12 páginas.<br/>"
        "• La fase de QA incluye una (1) carga final de material. Las cargas posteriores se cobran como "
        "mantención o ronda extra.<br/>"
        "• Si hay tienda, ya sea en la Plataforma a Medida o sumada después, no incluye las comisiones de "
        "la pasarela de pago ni el envío de las obras.<br/>"
        "• La garantía de 30 días cubre errores de funcionamiento del sitio y del panel entregados. No "
        "cubre cambios de diseño, contenido nuevo ni funciones adicionales.", st_body),
    Spacer(1, 14),
    HRFlowable(width="100%", thickness=1, color=LINEA),
    Spacer(1, 6),
    Paragraph("SpindleLab · Ramón Vallejos Espíndola · Fundador · hola@spindlelab.cl", st_small),
]))

doc.build(E)
print("OK", SALIDA)
