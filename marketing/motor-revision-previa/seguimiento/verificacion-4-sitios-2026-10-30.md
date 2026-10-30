# Verificación manual de 4 sitios sin verificar · 30-oct-2026

Origen: candidatos del piloto Vibe que el motor marcó con hallazgo pero que no pasaron por los dos verificadores independientes y no estaban en Microsoft. Se revisaron fichas, capturas de las dos etapas (r1-A antes del primer gesto, r1-B después) y el HTML de la portada. Sin subagentes.

**Resultado: ninguno de los 4 recibe primer toque con el texto estándar.** Los cuatro quedan sin borrador.

| Sitio | Qué midió el motor | Qué se ve al revisar | Veredicto |
|---|---|---|---|
| beckerabogados.cl (V97) | C1: `_ga` y `_ga_G9Q1GY0NYG` en fase B | Etapa A sin aviso; etapa B (tras desplazarse) muestra el banner "Valoramos tu privacidad" con Rechazar todo / Aceptar todo / Personalizar. `aviso_en_dom` A=false, B=true en todas las pasadas | No escribir. "En tu portada no vi ningún aviso" sería falso para quien lo abre y se desplaza. Trampa conocida: el aviso aparece después del primer gesto |
| quantumabogados.cl (V26) | C1: `_fbp`, `_clck`, `_clsk` en fase A; gcs=G100 | Banner visible en ambas etapas ("Tu privacidad importa"). Su página Compliance trata la protección de datos y la Ley 21.719 como "parte central de nuestro enfoque" | No escribir. El texto estándar es falso (tiene aviso) y además ofrece compliance con datos personales: filtro de competidor (estrategia §9 y §11) |
| coeficiente.cl (V59) | Solo cookies de Google Analytics en fase A, sin aviso | Sin aviso en A ni B. 1 `<form>` sin campo de correo ni teléfono. F10 marcado, pero F10 no es confiable | No escribir. GA sin formulario que recoja datos ni grabación ni publicidad: bajo el criterio de corte de Ramón |
| cepd.cl (V115) | Solo cookies de Google Analytics en fase A, sin aviso | Sin aviso en A ni B. 0 formularios; 2 teléfonos y un correo publicados | No escribir. Mismo criterio de corte |

## Lo que queda registrado como lección
- **El aviso que aparece tras el primer gesto** (becker) es el caso que más fácil se cuela como falso positivo. Si la ficha trae `aviso_en_dom` con A=false y B=true, el texto "no vi ningún aviso" no se puede usar.
- **Que el motor marque C1 no basta**: de estos 4 candidatos sin verificar, 0 sirvieron. Se suma a los 13 de 62 descartados por los verificadores independientes en el piloto (cerca de 21%). Un hallazgo del motor sin segunda mirada no entra a la cola de primer toque.
- Quantum (y firmas con página de compliance que cite la 21.719) deben revisarse como posibles competidores antes de redactar, no después.

## Qué no se hizo
- No se creó ningún borrador ni se tocó el CSV maestro de envíos.
- Queda abierta, sin aprobar, la idea de un ángulo alternativo para Quantum ("tiene aviso, pero Meta y Clarity guardaron cookies antes de que respondiera"). Se descarta mientras Quantum cuente como competidor.
