# Presentación de marca y servicios · SpindleLab (v2, 3-sep-2026)

Mazo de 18 láminas para presentar SpindleLab a gerencias de marketing y de negocio, pensado
para la conversación de 20 minutos que pide un prospecto después del diagnóstico. Sale de la
reunión de revisión de marca del 2-sep-2026; la v2 aplica los comentarios de Ramón del 3-sep.
La lectura estratégica está en `marketing/estrategia-presentacion-marca-2026-09.md`.

**Estado: borrador para pase humano de Ramón. Nada de esto se envía sin ese pase.**

## Archivos

| Archivo | Qué es |
|---|---|
| `presentacion-marca.html` | Fuente única. 18 láminas 1920×1080, sistema visual v2 (tokens del sitio en producción). Se ve en el navegador (↑↓ navega) y se imprime a PDF. |
| `presentacion-marca.pdf` | Render listo para enviar (Chrome headless, 18 páginas). Regenerar tras cada cambio del HTML. |
| `Gabarito.woff2` · `manrope.woff2` · `inter.woff2` · `fondo-hilo.jpg` | Fuentes y fondo con ruta relativa, para que la carpeta sea autocontenida (misma regla que `marketing/redes/`). |

## Guion para los 20 minutos

El mazo se puede recorrer entero en 20 minutos o usar por bloques. Orden sugerido:

| Minuto | Láminas | Qué se dice |
|---|---|---|
| 0 a 3 | 2, 3 | Situación actual con cuatro cifras y el circuito: "ya pagas pauta y se corta donde se cobra". Es donde el gerente tiene que sentir que el problema ya le está costando. |
| 3 a 6 | 4, 5 | Evidencia de su rubro: los 69 sitios y las ocho cosas que casi nadie tiene puestas. Si el prospecto es de un rubro medido, mostrar su propio puntaje aquí. |
| 6 a 9 | 6, 7, 8 | La idea madre (motor frente a servicios sueltos), el método en semanas y cómo se mide. Es el bloque de "por qué se puede creer". |
| 9 a 12 | 9, 10 | Benchmark con nombres y precios. Dejar que lea la tabla; no comentar a los competidores, solo las casillas. |
| 12 a 16 | 11, 12, 13, 14 | Soluciones y cómo se ve un encargo: 30 días, 60 días, el informe quincenal. Decir en voz alta que son escenarios ilustrativos. |
| 16 a 19 | 15, 16, 17 | Trayectoria, quién está detrás y lo que no prometemos. |
| 19 a 20 | 18 | Cómo empezar: el chequeo hoy, el diagnóstico en 24 horas. Cerrar bajo. |

Si hay menos tiempo: 2, 3, 6, 9, 12, 18.

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

- Lámina 2: cuatro cifras de fuente primaria, verificadas el 3-sep-2026. Barómetro Digital de Chile 2026 (Fundación Nativo Digital y Movistar, n>1.400, publicado 20-may-2026): 76 % usa IA, 41 % para buscar y resumir. Forrester, Buyers' Journey Survey 2026 (~18.000 compradores, 21-ene-2026): 94 % usó IA en su última compra; la IA generativa supera al sitio del proveedor y al vendedor como fuente. Bain & Company (19-feb-2025): 60 % de búsquedas sin clic, tráfico orgánico 15 a 25 % menor. Semrush (9-jun-2025): visitante desde IA vale 4,4× en conversión. La frase "el primero que entra se queda con la respuesta" es lectura propia del mapa de citaciones de agosto (los motores repiten listicles), no una cifra.
- Láminas 4 y 5: las 69 corridas del chequeo público del 31-ago-2026 (`marketing/metricas/corridas-chequeo-2026-08-31.md`). Empresas no nombradas.
- Lámina 4: spindlelab.cl 85/100 en su propio chequeo, corrido el 2-sep-2026 vía `/api/chequeo`. Volver a correrlo antes de presentar; si cambió, actualizar.
- Láminas 9 y 10: benchmark con nombres. Cada casilla y cada precio se verificó en el sitio de la agencia el 2-sep-2026 (15 agentes de investigación, detalle con URL y cita en el registro de competidores). Contradice a propósito la regla del brief de comunicación de no nombrar competidores: es material comercial de mano a mano, por decisión de Ramón. Solo hechos verificables, sin adjetivos. Ojo con Bigbuda: su copy dice "desde $590.000" para SEO+AEO+GEO, pero su tabla de planes pone ese precio al plan solo-SEO; el mazo usa la tabla ($890.000).
- Lámina 11: precios de partida vigentes en el sitio al 2-sep-2026.
- Lámina 15: casos reales generalizados. Se nombran solo con permiso escrito.
- Lámina 16: bio pública de `/nosotros/` (CV = conjunto cerrado, sin contraste con las agencias).

**Escenarios ilustrativos, etiquetados como tales en la lámina**

- Lámina 12 (corredora de propiedades, 30 días): el punto de partida es la mediana real del rubro; la curva es proyección de trabajo.
- Lámina 13 (clínica dental, 60 días): costo por clic y presupuesto salen de la planificación real de Google Ads; formularios y menciones son metas, no historia.
- Lámina 14 (informe quincenal): simulación del formato con cifras de ejemplo.

**Plazos que el mazo compromete (v2):** diagnóstico 24 h · línea base y plan 5 días hábiles · implementación 2 a 3 semanas · monitoreo quincenal. La página /metodo/ del sitio todavía dice 1 semana / 1 a 2 semanas / 2 a 6 semanas: hay que alinearla antes de usar el mazo en serio.

Cuando exista el primer caso público con permiso y datos, reemplaza a las láminas 12 a 14. Ese es el pendiente más valioso de todo el mazo.

## Checklist antes de enviar a un prospecto

- [ ] Pase de tono de Ramón (voz plural de negocio; singular solo en la lámina 16).
- [ ] Volver a correr `https://spindlelab.cl/api/chequeo?dominio=spindlelab.cl` y actualizar el 85 si cambió.
- [ ] Confirmar los "desde" contra `spindlelab.cl/servicios` y los plazos contra `/metodo/`.
- [ ] Revisar que los precios de la lámina 10 sigan vigentes en los sitios de las agencias (cambian; la fecha de verificación va en la lámina).
- [ ] Si el prospecto es de un rubro medido (inmobiliarias, contadores), agregar una lámina con su propio puntaje del chequeo antes de la 12.
- [ ] Exportar el PDF de nuevo y mirar las 18 páginas.
