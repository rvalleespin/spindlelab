# Hoja de seguimiento del motor (octubre 2026)

`envios-motor-2026-10.csv` registra, por cada correo del primer lote del motor, **qué oferta llevaba** (`oferta`: F10 contacto a la vista, F1 formulario sin política, C1 cookie de Meta) y **en qué ola salió**. Es lo único que dirá si el método convierte mejor que el anterior.

Cómo llenarla (Ramón o Raquel, a mano):
- `fecha_toque1/2/3`: el día en que se envió cada uno.
- `respondio`: `si` o `no`. `tipo_respuesta`: `interesado`, `pide llamada`, `rechazo`, `derivó a otra persona`, `rebote`.

No reemplaza `ventas/enviados/REGISTRO-enviados.csv` (ese registro es del troncal). Cuando haya 10 o más filas con fecha, comparar la respuesta por `oferta` y por `ola`, y contra el método anterior (~5 %, 7 de 142).
