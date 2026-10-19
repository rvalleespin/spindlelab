# Arranque de la sesión de leads, con el motor integrado (19-oct-2026)

**Decisión de Ramón (19-oct):** el trabajo de leads deja de vivir en la memoria de una sesión y pasa a ser un embudo en el repo (`marketing/motor-revision-previa/05-mecanismo-de-leads.md`). La sesión de leads vuelve a existir, pero fresca y sobre `main`, y llena las etapas 1 a 3. El motor lleva 4 a 6. Solo el troncal edita los documentos compartidos.

## Antes de arrancar (lo hace Ramón, una vez)
1. En su Mac, subir el trabajo que la sesión anterior dejó sin subir (25 commits). Comandos en la respuesta de la sesión del motor del 19-oct, o:
   `cd <carpeta del repo en iCloud>` · `git status -sb` (anota la rama y el "ahead 25") · `git push -u origin <rama>`.
2. Avisar el nombre de la rama a la sesión del motor, que la lee e integra lo útil (listas, scripts, notas de método).
3. Crear la sesión de leads nueva con la rama `main` actualizada (las skills se leen solo al arrancar la sesión).

## Prompt de arranque para pegar en la sesión nueva
> Eres la sesión de leads de SpindleLab. Lee primero `CLAUDE.md`, `marketing/motor-revision-previa/05-mecanismo-de-leads.md` y `marketing/motor-revision-previa/seguimiento/LEEME.md`. Tu trabajo son las etapas 1 a 3 del embudo: conseguir dominios nuevos, sacar el correo que cada sitio publica con `motor/contactos.mjs`, y aplicar los descartes baratos. Tu entrega es un archivo CSV en `marketing/motor-revision-previa/corridas/<fecha>-<lote>/entrada.csv` con las columnas `empresa,dominio,email,tipo,fuente`. Reglas: (1) solo contactos NUEVOS: antes de entregar, cruza contra `ventas/lista-exclusion.csv`, `ventas/enviados/REGISTRO-enviados.csv`, todos los `ventas/*.csv`, `corridas/*/lista.json` y Gmail por correo exacto; (2) no gastes créditos de Vibe Prospecting sin que Ramón apruebe el costo exacto; (3) no envíes nada y no edites `pipeline.md` ni el plan de 90 días; (4) nunca crees un borrador de Gmail con `body`, solo con `htmlBody` (ver `html_correo.py`); (5) todo lo que hagas queda en una rama `claude/...` y se sube con push al terminar cada lote.

## Contrato de la entrega
| Columna | Qué es |
|---|---|
| `empresa`, `dominio` | tal como figuran en la fuente |
| `email` | el correo PUBLICADO en el sitio, con MX verificado; nunca adivinado |
| `tipo` | `generico` (buzón de rol) o `personal`; los genéricos llevan siempre la línea "¿con quién lo hablo?" |
| `fuente` | de dónde salió el dominio (Vibe, Google Maps, directorio) y la fecha |

## Reglas fijas que vienen de lo aprendido
- Precio sin "desde" en todo lo nuevo (decisión de Ramón, 19-oct). Plazo "dos o tres días": sigue pendiente de confirmar.
- El campo WEB de un directorio no es confiable: se resuelve el dominio y se mide el sitio.
- Un estudio que vende protección de datos es competidor: no se le escribe.
- Cada correo lleva la fuente real del contacto y la línea de baja.
