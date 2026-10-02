# Spec visual — <cliente> · <obra> · dirección elegida: <A/B>

> El contrato de la obra. Lo escribe Lucía (`/web-direccion-arte`) después de la
> compuerta 2. Diego construye contra esto; Javiera audita contra esto. Una
> corrección que no termina escrita acá vuelve a aparecer en la pasada siguiente.

**Referencia dominante:** (nombre/URL) · **Rasgo que se preserva:** ·
**Qué sacrifica esta dirección:**

## 1 · Tokens (cada uno con su rol; un valor sin rol no es un token)
### Color
| Token | Valor | Rol exacto | Dónde NO se usa |
|---|---|---|---|
| `--fondo` | | | |
| `--acento` | | | |

### Tipografía
| Token | Familia / peso / tamaño / tracking / line-height | Se usa en |
|---|---|---|

Escala completa (display → h1 → h2 → h3 → cuerpo → chico) con sus valores a 1440 y
a 390. Nada "fluido mágico" sin decir entre qué dos valores.

### Espaciado, radio, profundidad, movimiento
Ritmo de espaciado (la escala, no "1rem donde caiga"), radios por componente,
cuándo hay sombra o borde y qué jerarquía comunica, duraciones y curvas del
movimiento y qué lo dispara.

## 2 · Composición por sección
Para cada sección, en 3-5 líneas: grilla, dónde está la tensión (qué rompe la
simetría y por qué), proporciones, qué manda el ojo primero, qué pasa a 390.

| Sección | Composición a 1440 | Qué cambia a 390 |
|---|---|---|

## 3 · Plan de media
| Slot | Qué va | Origen (real / generado / placeholder dirigido) | Ratio | Tratamiento |
|---|---|---|---|---|

Un slot con placeholder lleva dirección de arte escrita (qué imagen falta, de qué
tipo, con qué encuadre) y espacio real reservado. Nunca se reemplaza una imagen por
una caja con degradé.

## 4 · Estados e interacción
Botones (reposo/hover/foco/activo/deshabilitado), enlaces, campos de formulario,
validación, estado vacío, error, carga, nav al scrollear, menú en celular.

## 5 · Breakpoints
Cuáles, por qué ahí, y qué se reordena en cada uno.

## 6 · Capa de señales (de Simón)
JSON-LD por tipo de página, título y meta por ruta, canonical, OG, enlazado interno
previsto.

## 7 · Lo que esta spec prohíbe explícitamente
Las reglas que salieron de la compuerta 2 o de correcciones previas ("en este sitio
nunca van tarjetas con borde parejo", "el oro solo en el punto del wordmark").
Es la lista que impide la regresión entre pasadas.

## 8 · Historial de correcciones
| Fecha | Qué se corrigió | Regla o preferencia | Quién lo pidió |
|---|---|---|---|
