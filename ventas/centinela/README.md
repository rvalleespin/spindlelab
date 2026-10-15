# Centinela de sitios entregados

Vigila los sitios de los clientes ya entregados. Mide siempre lo mismo, guarda la foto, la
compara con la anterior y deja un **borrador** de informe. Es la pata que convierte una entrega
puntual en una relación con un número que se mueve.

**Nació el 14-oct-2026**, de la idea 3 del video de los siete hacks
(`laboratorio/videos/2026-10-14-siete-hacks-claude-agustin-medina.md`), y del movimiento M3 del
estudio de mercado: el entregable que falta no es un caso, es un número.

## Cómo se corre

```bash
python3 ventas/centinela/centinela.py                      # todos los sitios vigilados
python3 ventas/centinela/centinela.py --dominio X.cl       # uno solo
```

Sin dependencias: solo `python3` y `curl`. Corre igual en la nube y en el Mac.

## Qué hace, exactamente

1. Llama a los **dos chequeos públicos de la casa** sobre cada dominio:
   `spindlelab.cl/api/chequeo` (visibilidad en IA, 21 señales) y
   `verifica.spindlelab.cl/api/chequeo` (Ley 21.719).
2. Guarda la foto completa en `snapshots/<dominio>-<fecha>.json`. **Esa carpeta es el histórico
   y no se borra**: sin ella no hay con qué comparar.
3. Escribe `informes/<fecha>-<dominio>.md` con el puntaje de hoy, la diferencia contra la
   medición anterior, **qué señales cambiaron de estado** (se arreglaron o se rompieron) y las
   tres correcciones prioritarias con su texto de arreglo.

## Reglas

- **No manda nada.** El informe es un borrador. El envío al cliente lo hace Ramón después de
  leerlo. Regla de la casa: nada generado sale sin pase humano.
- **Si un chequeo no responde, el informe lo dice y marca el dato como inválido.** No se publica
  un número que no se pudo medir.
- **No se cambia lo que se mide sin anotarlo.** Si mañana el chequeo suma señales, los puntajes
  dejan de ser comparables con los de antes; eso se escribe en el informe de ese día o la serie
  miente.
- **Un cliente entra agregando su fila a `clientes.json`**, con la fecha de la primera medición.
- **Lo que esto NO mide** y hay que decirlo cada vez: cuánta gente llega al sitio, cuántos
  contactan, ni si una IA de verdad lo cita hoy. Mide lo que depende del sitio.

## Cadencia sugerida

Semanal para clientes con acompañamiento activo; mensual para los entregados sin acompañamiento
(ahí el centinela es cortesía, y es la excusa honesta para volver a conversar).

## Línea base del 14-oct-2026

| Sitio | Visibilidad en IA | Ley 21.719 |
|---|---|---|
| bernardocombeau.cl | 76/100 | 43/100 |
| spindlelab.cl | 85/100 | 100/100 |
