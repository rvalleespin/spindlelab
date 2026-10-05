# Portada de la Página de Facebook — SpindleLab

**Encargo de:** sesión de Meta Ads · **Ejecutado por:** sesión de contenido en redes (`/persona-social-media`) · **Fecha:** 20 jul 2026.

## Entregable

- **Archivo final para subir:** `marketing/brand/redes/portada-facebook.png` (copia de `portada-facebook/portada-facebook.png`).
- **Dimensiones:** 1640 × 624 px (ratio 2.63:1), PNG. Exacto a lo que pide Facebook para portada de Página.

## Concepto elegido: A (foto + velo de tinta)

Misma familia visual que `banner-linkedin.png`, pero con el copy **centrado** por la zona segura de Facebook (el avatar tapa el borde inferior izquierdo en escritorio; los lados se recortan en móvil).

- **Fondo:** generado con Higgsfield (modelo `soul_location`, 21:9, 2560×1072). Escritorio editorial con luz natural, mood agencia creativa, sin personas, sin texto, sin clichés de IA. Se generaron 2 variantes (`fondo-a.png` elegida, `fondo-b.png` alternativa) y se eligió A por ser más rica visualmente. No se usó `foto-banner-original.jpg` porque el encargo pidió generar imagen nueva con Higgsfield.
- **Velo de tinta `#131A22`:** base 0.55 en todo + refuerzo radial al centro (hasta ~0.75) para legibilidad del texto. Cumple la regla ≥50%.
- **Wordmark:** `SpindleLab.` en Gabarito semibold, texto papel `#F7F5F0`, punto dorado `#C9A227` (único uso de dorado en la pieza — el separador "·" del CTA es gris pluma, no dorado).
- **Promesa:** "SEO técnico y visibilidad en IA".
- **CTA (gris, chico):** "Mini-diagnóstico gratis · spindlelab.cl".

## Fuente editable

- `portada-facebook.html` + `Gabarito.woff2` + `inter.woff2` + `fondo-a.png` en esta carpeta.
- Para regenerar tras un cambio: `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 --window-size=1640,624 --screenshot=portada-facebook.png "file://<ruta absoluta>/portada-facebook.html"` y volver a copiar el PNG a `marketing/brand/redes/`.

## Subida

**✅ Subida y confirmada por Ramón (jul 2026).** La portada quedó puesta en la Página `facebook.com/profile.php?id=61592147941168`.

Aprendizaje del proceso: la subida por navegador automatizado se bloqueó porque el `file_upload` de la sesión solo acepta archivos compartidos con esa sesión, no un PNG generado localmente (rechazó tanto la ruta de iCloud como el scratchpad). La hizo Ramón manualmente. El paso que fija la portada es el botón azul **"Guardar cambios"** al final de la previsualización — sin él, queda en preview y no persiste. Para la próxima, si se quiere subir por navegador desde esta sesión, hay que adjuntar el PNG al chat primero.
