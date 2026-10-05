# Auditoría de la referencia · driftime.com

**Fecha:** 29-sep-2026 · **Encargo:** Ramón, en sesión: *«haz una revisión exhaustiva del
sitio al que aspiro llegar a tener»*, con la instrucción explícita de que el manual de
marca no manda en esta decisión.

Todo lo que sigue está **medido sobre el sitio cargado en un navegador**. Lo que no pude
verificar va marcado como tal, y no hay ni una afirmación de memoria.

---

## 0 · Advertencia de método

**Su sitio no se deja medir entero.** Tres de cada cinco intentos de carga fallan
(`ERR_TOO_MANY_RETRIES`), y cuando carga, la home y la página «About Us» devuelven el
cuerpo vacío o un «This page couldn't load»: el contenido va detrás de animaciones que un
navegador sin interacción real no dispara.

Lo que sí quedó medido, en varias pasadas:

| Página | Estado |
|---|---|
| Home | medida en dos pasadas (estructura, titulares, campos, pestañas) |
| Índice de trabajo (`/work`) | medida completa |
| Página de caso (Finnish Institute) | medida completa, 23.573 px |
| Cabecera y menú | medidos |
| About Us | **no se pudo cargar** |

---

## 1 · La estructura, comparada

| | driftime | v3 de SpindleLab |
|---|---|---|
| Alto de la home | 11.097 px | 11.345 px |
| Secciones | **8** | **12** |
| Imágenes / video en la home | 25 / **0** | ~14 / 0 |
| Campos de servicio | 4, de 900-913 px | 4, de 900 px |

**Mismo largo, la mitad de los movimientos.** Ese es el hallazgo estructural principal. Su
recorrido es: hero → cuatro campos de servicio → quiénes son → últimas publicaciones. El
nuestro mete además el bloque del problema, las tres cosas, el renglón de precios, las tres
herramientas, el método y el cierre. **Seis paradas extra para decir lo mismo.**

---

## 2 · El hero

```
  THE GUIDE TO YOUR HERO™          120px · peso 800 · MAYÚSCULAS
  Driftime® are an impact-first strategic and creative partner with a
  policy-adjacent focus, working with organisations to build credibility,
  trust and leverage that drives social and environmental progress.
                                    24px · peso 400
```

Tres decisiones que importan:

1. **Es una AFIRMACIÓN de qué son**, no una pregunta al visitante ni el nombre de un
   servicio. Reclaman un rol dentro del negocio del cliente.
2. **La bajada dice el oficio en prosa normal**, sin titulares intermedios.
3. **No nombran su disciplina.** En toda la portada no aparece «SEO», «UX» ni «branding».
   Nombran a la audiencia del comprador: *funders, policymakers, commissioners*.

**Contraste con el nuestro.** Nuestro h1 es «¿Te menciona la IA?» con el chequeo debajo. Es
buen gancho y funciona, pero declara que el negocio se trata de la IA. Medido: **el 55 % del
alto de nuestra home tiene marco de IA y el 31 % de desarrollo web.**

---

## 3 · Los campos de servicio

Los cuatro tienen la misma forma, sin excepción:

```
  DIGITAL                          120px · peso 800 · MAYÚSCULAS · UNA palabra
  [ Foundations | Partnership ]    pestañas, <button role="tab">
  A streamlined website build designed to convert, communicate and hold
  up under scrutiny, because funders and policymakers form opinions fast.
  Fixed Fee    £15K + VAT
  [ Learn More ]  [ Contact Us ]
  ■ ■ ■ ■                          cuatro piezas de trabajo
```

| Campo | Fondo medido | Pestañas |
|---|---|---|
| Strategy | `oklch(0.321 0.0108 122)` oliva | Sessions · Partnership |
| Brand | `oklch(0.290 0.0851 262)` azul | Foundations · Partnership |
| Digital | `oklch(0.582 0.2077 34)` naranja | Foundations · Partnership |
| Reporting | `oklch(0.275 0.0478 327)` ciruela | Foundations · Partnership |

**Tres cosas que ya copiamos** (pestañas, tira de obra dentro del bloque, una pantalla por
servicio) y **una que no**: ellos llevan **cuatro** piezas de trabajo por campo y nosotros
dos, porque dos son las que existen.

**Una decisión suya que NO recomiendo copiar:** el mismo precio fijo (£15K + VAT) para tres
de sus cuatro servicios. Es una decisión de producto fuerte, pero nuestros seis precios son
los que son.

---

## 4 · El índice de trabajo (`/work`)

```
  OUR WORK AND PARTNERSHIPS        120px · peso 800 · MAYÚSCULAS
  ■ 10 proyectos en grilla
     cada uno: imagen grande + nombre a 16px peso 400 + rubro
```

3.298 px, **una sola sección**, 10 imágenes. Los nombres de proyecto van a **16 px peso
400**: diminutos contra el titular de 120 px. La imagen hace el trabajo; la etiqueta solo
identifica.

**Esa distancia entre dos niveles de lectura —120 px y 16 px, sin nada en medio— es lo que
hace que sus pantallas se lean de un golpe.**

Lo clasifican por rubro, no por servicio: *Arts & Heritage · Nonprofit & Social Causes ·
Financial Services · Public & Government · Healthcare & Wellness · Professional Services*.

---

## 5 · La página de caso

Medida completa sobre 23.573 px:

| Mecanismo | Medido |
|---|---|
| Encabezados partidos en spans | **0** — son nodos de texto planos |
| Animaciones CSS declaradas | **1**, de 0,8 s con `cubic-bezier(.5, 0, .1, 1)` |
| `will-change` / `mix-blend-mode` | 0 / 0 |
| Elementos `position: sticky` | **7** |
| `<video>` en el DOM | **0**, y aun así 3 mp4 pedidos por red |
| Caja de los encabezados | **sin mayúsculas**, peso **500** |

**Dos cosas que hay que separar bien**, porque yo las tenía confundidas:

- **Las mayúsculas son para TÍTULOS DE PÁGINA** (el hero, el índice de trabajo, la palabra
  de cada campo). Verificado: «THE GUIDE TO YOUR HERO™», «OUR WORK AND PARTNERSHIPS».
- **Dentro de un artículo o caso, los encabezados van en caja baja y peso 500.**

Y lo que hace que se sienta vivo **no son efectos**: es scroll suave, composición pegajosa
y video montado solo cuando se va a ver. Cero animación tipográfica.

---

## 6 · La cabecera y el menú

La cabecera es **una placa oscura de 232×56 px con radio de 6 px**, pegada arriba a la
izquierda con 40 px de margen: el wordmark y, pegado a él, un botón de 24×24 px. Es
exactamente la forma que ya tiene la nuestra.

**El contenido del menú abierto no se pudo medir** (el overlay no se estabiliza en
headless). Lo que sí está verificado es **su arquitectura de información**, por los enlaces
del pie:

> Home · Our Work · About Us · Latest News · Contact Us · Policies · Newsletter
> \+ externos: Impact Report, Design Declares, LinkedIn

**Siete destinos de primer nivel.** El nuestro tenía seis, y dos eran anclas de la home:
no había forma de llegar a Nosotros ni al Blog. Corregido el 29-sep.

---

## 7 · El sistema, en números

| | Valor medido |
|---|---|
| Display (h1 de página, palabra de campo) | 120 px · peso 800 · mayúsculas · tracking normal |
| Cuerpo | 24 px · peso 400 |
| Etiquetas de proyecto | 16 px · peso 400 |
| Encabezados dentro de un caso | 30 px · peso 500 · caja baja |
| Radio | 6 px, sin píldoras |
| Lienzo | `lab(0 0 0)` = negro puro |
| Placa de superficie | `lab(6.83 0.37 -1.35)` ≈ `#121212` |
| Tarjeta sobre negro | `lab(12.74 0.30 -1.09)` ≈ `#1f1f1f` |
| Alto de un campo | 900-913 px, contra un viewport de 900 |

**No hay tamaño intermedio entre 120 px y 24 px.** Dos niveles de lectura, no cinco.

---

## 8 · Lo que falta hacer de nuestro lado

Ordenado por lo que más mueve la aguja:

1. **El hero.** Es la causa de que la IA siga leyéndose como el eje. Hay que afirmar qué es
   la casa. *(En curso: Ramón cerró la idea el 29-sep — «SpindleLab es el motor que une
   todas las partes de una idea de negocio y las hace funcionar».)*
2. **Cortar secciones.** Doce contra ocho. El bloque de las tres cosas y el de las
   herramientas pueden vivir en páginas internas.
3. **Un índice de trabajo de verdad.** Hoy no existe: la obra vive en una tira del hero y
   en el campo de Desarrollo. Ellos le dan una página con diez proyectos clasificados por
   rubro.
4. **Dos piezas de concepto más**, para completar la tira de cuatro por campo.
5. **Bajar los encabezados de artículo a caja baja y peso 500**, que es lo que hace la
   referencia dentro de un caso y nosotros hacemos al revés.

---

## Lo que NO hay que copiar

- **El precio único** para varios servicios. Decisión de producto suya.
- **La marca registrada en el hero.** `The Guide to your Hero™` funciona con años de
  trabajo detrás; en una casa nueva se lee a inflado.
- **Sacar el video** solo por parecernos. Ellos no tienen en la portada; nosotros lo
  medimos, lo montamos tarde y funcionaba.
- **Su sitio no se deja medir.** Eso es un defecto, no una virtud: si un navegador sin
  interacción no ve su contenido, hay motores que tampoco. Es justamente lo que esta casa
  vende que no hay que hacer.
