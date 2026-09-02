# Presentación de marca y servicios · SpindleLab (septiembre 2026)

Mazo de 18 láminas para presentar SpindleLab a gerencias de marketing y de negocio.
Sale de la reunión de revisión de marca del 2-sep-2026 (faltaba una presentación con
benchmark, gráficas de alcance y "cómo se ve un encargo"). La lectura estratégica que
lo sostiene está en `marketing/estrategia-presentacion-marca-2026-09.md`.

**Estado: borrador para pase humano de Ramón. Nada de esto se envía sin ese pase.**

## Archivos

| Archivo | Qué es |
|---|---|
| `presentacion-marca.html` | Fuente única. 18 láminas 1920×1080, sistema visual v2 (tokens del sitio en producción). Se ve en el navegador (↑↓ navega) y se imprime a PDF. |
| `presentacion-marca.pdf` | Render listo para enviar (Chrome headless, 18 páginas). Regenerar tras cada cambio del HTML. |
| `Gabarito.woff2` · `manrope.woff2` · `inter.woff2` · `fondo-hilo.jpg` | Fuentes y fondo con ruta relativa, para que la carpeta sea autocontenida (misma regla que `marketing/redes/`). |

## Regenerar el PDF

```bash
cd marketing/brand/presentacion-marca
CH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome   # Mac: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
$CH --headless --no-sandbox --disable-gpu --no-pdf-header-footer \
    --print-to-pdf=presentacion-marca.pdf "file://$PWD/presentacion-marca.html"
```

Para mirar una lámina suelta como PNG (regla de Bruno: los PNG se miran antes de darse por buenos):

```bash
sed 's#</style>#.slide:not(:nth-child(4)){display:none!important}</style>#' presentacion-marca.html > /tmp/s4.html
cp *.woff2 fondo-hilo.jpg /tmp/ && bash ../../redes/_tools/render.sh /tmp/s4.html 1920 1080
```

## Qué es real y qué es ilustrativo (leer antes de presentar)

La regla de marca es cero prueba social inventada. El mazo la respeta así:

**Datos reales, con fuente en la propia lámina**

- Láminas 4 y 5: las 69 corridas del chequeo público del 31-ago-2026 (`marketing/metricas/corridas-chequeo-2026-08-31.md`). Empresas no nombradas.
- Lámina 4: spindlelab.cl 85/100 en su propio chequeo, corrido el 2-sep-2026 vía `/api/chequeo`. Volver a correrlo antes de presentar; si cambió, actualizar la cifra.
- Lámina 2: patrones de citación de terceros (quickseo.ai) y la observación de que ningún motor nombra negocios finales en la medición mensual (`marketing/metricas/test-menciones-ia.md`). El puntaje propio del test (0/15) NO aparece, por decisión de Ramón del 28-ago.
- Lámina 9: registro de competidores (`marketing/inteligencia-mercado/competidores.md`). Se describen patrones, sin nombres, por la regla de no nombrar competidores en material de cara afuera.
- Lámina 10 y 11: rangos de mercado del estudio de precios del 25-ago y precios de partida vigentes en el sitio al 2-sep-2026. Si cambian los "desde" del sitio, cambiar aquí.
- Lámina 15: casos reales generalizados (asesora de inversiones, fotógrafo, tres mini-diagnósticos). Se nombran solo cuando exista permiso escrito.
- Lámina 16: bio pública de `/nosotros/` (CV = conjunto cerrado, sin contraste con las agencias).

**Escenarios ilustrativos, etiquetados como tales en la lámina**

- Lámina 12 (corredora de propiedades): el punto de partida es la mediana real del rubro; la curva es proyección de trabajo.
- Lámina 13 (clínica dental): costo por clic y presupuesto salen de la planificación real de Google Ads; índice orgánico y menciones son metas, no historia.
- Lámina 14 (informe quincenal): simulación del formato con cifras de ejemplo.

Cuando exista el primer caso público con permiso y datos, reemplaza a las láminas 12 a 14. Ese es el pendiente más valioso de todo el mazo.

## Checklist antes de enviar a un prospecto

- [ ] Pase de tono de Ramón (voz plural de negocio; singular solo en la lámina 16).
- [ ] Volver a correr `https://spindlelab.cl/api/chequeo?dominio=spindlelab.cl` y actualizar el 85 si cambió.
- [ ] Confirmar los "desde" contra `spindlelab.cl/servicios`.
- [ ] Si el prospecto es de un rubro medido (inmobiliarias, contadores), agregar una lámina con su propio puntaje del chequeo antes de la 12.
- [ ] Exportar el PDF de nuevo y mirar las 18 páginas.
