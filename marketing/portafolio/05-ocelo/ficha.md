# 05 · Ocelo · ficha

**Pieza de concepto del portafolio E12** · Bruno (dirección creativa y construcción), con el texto de Clara
(`texto.md`) y los hechos verificados con el método de Simón (esta ficha). 16 y 17-oct-2026, rama
`claude/magical-franklin-ckfki2`. Manda `../plan-e12.md` §8; reglas en `../README.md`.

**Ocelo no existe.** Es un centro de cirugía refractiva y de cataratas inventado, en Providencia, con dos
oftalmólogos inventados. Nada de lo que dice su sitio ocurrió, y nada es una indicación médica.

---

## 1 · Quién sería

Un centro de cirugía refractiva (dejar los lentes: LASIK, PRK) y de cataratas (cambiar el cristalino por un lente
intraocular) en Providencia. Lo busca un adulto que quiere dejar los lentes, alguien de 60 o más con una catarata
que ya le quita la noche, o el hijo que le busca clínica. Pregunta largo y con miedo, y pregunta antes de llamar.

## 2 · El nombre

| Comprobación | Resultado | Cuándo |
|---|---|---|
| `ocelo.cl` en NIC Chile | Libre | 16-oct-2026, 20:45:45 (`../plan-e12-evidencia.json`, `elegidos`) |
| Búsqueda web: «"Ocelo" óptica OR oftalmología OR clínica Chile» y «"Ocelo" marca OR empresa OR lentes OR anteojos» | Ningún negocio con ese nombre | 16-oct-2026 (misma evidencia, `busqueda_web_16oct`) |

Por qué suena inventado: «ocelo» es el ojo simple de algunos insectos. Es una palabra rara y no un apellido, y tiene
cinco letras, como cada fila de una carta de optotipos, con dos O y una C, que son letras de esa carta.

## 3 · Los dos oftalmólogos (ficticios)

| Nombre | Lo que haría | Registro Nacional de Prestadores Individuales |
|---|---|---|
| **Leonor Ibarbia Saelzer** | Cirugía refractiva: LASIK y PRK | 0 prestadores registrados con «Leonor Ibarbia Saelzer», «Leonor Ibarbia», «Ibarbia Saelzer» ni «Ibarbia», como médico cirujano ni como tecnólogo médico |
| **Matías Cerdeña Olave** | Cataratas y lentes intraoculares | 0 con «Matías Cerdeña Olave», «Matías Cerdeña», «Cerdeña Olave» ni «Cerdeña», en las dos profesiones |

- **Fuente:** `rnpi.superdesalud.gob.cl`, consultado el **16-oct-2026 a las 21:00 (Chile)**. Solo se pidió el
  conteo de coincidencias (el mismo endpoint público que usa la página para contar por profesión); no se bajó ningún
  dato personal. Control: «Juan Pérez» devuelve 37 médicos cirujanos y 7 tecnólogos médicos, así que un cero
  significa algo. El detalle está en `_herramientas/rnpi-nombres.json`.
- **Sin foto, sin número de registro, sin cara.** Donde iría el registro, el sitio dice por qué no está.
- **Se repite** el día que la pieza entre al índice de `/trabajo/`.

## 4 · Hechos de norma y de práctica clínica (los únicos que el sitio afirma)

Regla del plan §4.2: ningún número ni afirmación clínica que no esté en esta tabla, con su fuente y la fecha de
consulta. Consultado el **16 y 17-oct-2026**. AAO = American Academy of Ophthalmology (páginas para pacientes,
revisadas por oftalmólogos); EyeWiki es la enciclopedia clínica de la AAO.

### 4.1 · La carta y los optotipos (la identidad)

| Hecho | Dónde se usa | Fuente |
|---|---|---|
| Cartas logMAR (Bailey y Lovie, 1976): cada fila es **0,1 log** más chica, un factor de 10^0,1 = **1,2589**; cinco letras por fila; entre letras, el ancho de una letra; entre filas, el alto de las letras de la fila siguiente | La escala tipográfica del sitio y la carta de la portada | Bailey y Lovie, «New design principles for visual acuity letter charts», *Am J Optom Physiol Opt*, 1976; resumen en el Australian College of Optometry, `aco.org.au/logmar` y su museo (`museum.aco.org.au/archive/2838-logmar-6-m-visual-acuity-chart`) |
| logMAR 0,0 equivale a la visión 6/6 (20/20); 1,0, a 6/60 | Los rótulos de fila (solo los valores logMAR) | Misma fuente |
| Letras Sloan (Louise Sloan, 1959): diez letras (C D H K N O R S V Z) dibujadas en una retícula de **5 × 5**, con el trazo de **un quinto** de la altura; son las de la carta ETDRS | El logotipo: O y C son letras Sloan | `en.wikipedia.org/wiki/Sloan_letters` (la regla del quinto lleva «cita requerida» allí); LITFL, «Louise Sloan» (`litfl.com/louise-sloan`) |
| Los optotipos de Snellen (1862) ya se construían en una retícula de 5 × 5 con trazo de un quinto; la «E que da vueltas» de las cartas para quien no lee es la E de esa retícula: tres brazos de cinco módulos | La E del logotipo | `en.wikipedia.org/wiki/Snellen_chart` (construcción de los optotipos); la fecha, de *Probebuchstaben zur Bestimmung der Sehschärfe*, 1862 |
| La L **no es** letra Sloan ni optotipo: se dibuja con las mismas reglas (5 × 5, trazo de uno) para completar el nombre | La L del logotipo | Decisión de diseño, dicha así en el pliego |
| **C de Landolt:** un anillo cuyo trazo es **un quinto** del diámetro, con una abertura del **mismo ancho**; normada como DIN 58220, hoy **ISO 8596** (vigente: ISO 8596:2017) | El símbolo | `en.wikipedia.org/wiki/Landolt_C`; ficha de la norma en `online.standard.no/en/iso-8596-2017-2`. No leí el texto normativo: la geometría sale de la descripción pública |
| **Test duocromo:** letras negras sobre un fondo partido en rojo y verde; por la aberración cromática del ojo, el rojo y el verde enfocan a distinta distancia, y con la graduación justa las letras se ven igual de nítidas en los dos lados. Se usa también con personas con daltonismo | El comparador rojo y verde | EyeWiki, «Duochrome Test» (`eyewiki.aao.org/Duochrome_Test`); `en.wikipedia.org/wiki/Duochrome_test` |
| **Atkinson Hyperlegible Next:** del Braille Institute, publicada el 10-feb-2025 como versión ampliada de la Atkinson Hyperlegible de 2019, hecha para lectores con baja visión; trae la versión Mono; gratuita, licencia OFL | La letra del sitio | Comunicado del Braille Institute (10-feb-2025), recogido en `lagrandeobserver.com/?p=1350`; `en.wikipedia.org/wiki/Atkinson_Hyperlegible`; licencia en `sitio/fuentes/OFL-*.txt` |

### 4.2 · La evaluación y lo que no se puede prometer (el texto)

| Afirmación del sitio | Fuente (texto de la fuente, resumido) |
|---|---|
| Para LASIK: **18 años** o más, idealmente pasados los **21**, cuando la vista suele dejar de cambiar | AAO, «LASIK — Laser Eye Surgery», publicada el 09-ene-2026 (`aao.org/eye-health/treatments/lasik`): «18 years or older (ideally, over 21 years old…)» |
| La graduación no debe haber cambiado mucho en el **último año** | AAO, misma página: «should not have changed much in the last year» |
| La córnea tiene que ser lo bastante gruesa y sana; una córnea muy delgada descarta el LASIK | AAO, misma página |
| El ojo seco severo puede descartar la cirugía, y el ojo seco puede empeorar después | AAO, misma página |
| Casi todos tienen ojo seco después del LASIK; suele pasar en **un mes**, en algunas personas dura más | AAO, misma página: «almost everyone… usually fade within a month» |
| Halos, destellos alrededor de las luces y sensibilidad a la luz, temporales o permanentes | AAO, misma página |
| Puede seguir haciendo falta usar lentes para algunas cosas, como leer o manejar de noche; las sub y sobrecorrecciones se corrigen con lentes o con otra cirugía láser (el «retoque») | AAO, misma página |
| El LASIK no corrige la presbicia; casi todos necesitan lentes para leer pasados los **40** | AAO, misma página: «after around age 40» |
| El PRK no hace lámina y deja más córnea intacta: sirve en córneas delgadas; su recuperación es más lenta y molesta más los primeros días | EyeWiki, «Photorefractive Keratectomy» (`eyewiki.aao.org/Photorefractive_Keratectomy`); UCLA Health, PRK |
| La evaluación: refracción manifiesta comparada con una refracción con gotas (ciclopléjica), examen completo con presión ocular y fondo de ojo dilatado, tiempo de ruptura lagrimal y prueba de Schirmer para el ojo seco | EyeWiki, «Preoperative Evaluation for LASIK Surgery» (`eyewiki.aao.org/Preoperative_Evaluation_for_LASIK_Surgery`) |
| La topografía busca queratocono; un queratocono, incluso inicial, contraindica la cirugía de la córnea. La paquimetría da el mapa del grosor | EyeWiki, «Pre-operative Topography» y «Refractive Surgery Pearls in Topography» |
| Catarata: **no hay una edad**; se considera operar cuando ya te impide hacer lo que quieres o necesitas (manejar, leer, ver de noche); con síntomas leves pueden bastar lentes nuevos | AAO, «What Are Cataracts?», publicada el 01-dic-2025 (`aao.org/eye-health/diseases/what-are-cataracts`) |
| Años después, la cápsula que sostiene el lente se puede nublar; se abre con láser (capsulotomía) | AAO, misma página |
| Biometría: el largo del ojo y la curvatura de la córnea dan la potencia del lente intraocular | EyeWiki, «Biometry for Intra-Ocular Lens (IOL) Power Calculation» |
| Lente monofocal: una sola distancia de foco, casi siempre lejos, y lentes para leer. Multifocal: lejos y cerca a la vez | AAO, «Intraocular Lenses (IOL) for Cataract Surgery», publicada el 18-jun-2026 (`aao.org/eye-health/diseases/cataracts-iol-implants`) |
| Con lente multifocal, la mayoría nota un halo leve alrededor de las luces de noche; rara vez molesta mucho | AAO, «Ask an Ophthalmologist»: halo después de cirugía de catarata con multifocal (`aao.org/eye-health/ask-ophthalmologist-q/halo-cataract-surgery-multifocal`) |
| Después de una cirugía refractiva la luz molesta unos días (por eso la sala parte a oscuras) | AAO, LASIK: «light sensitivity» entre los efectos; UCLA Health: el ojo sensible a la luz los días del lente de vendaje del PRK |

**Lo que el sitio no dice, a propósito:** ningún porcentaje de resultados (la AAO publica uno; en el sitio de una
clínica se leería como promesa), ninguna agudeza prometida, ningún plazo de recuperación en días, ningún precio,
ningún tiempo de suspensión de lentes de contacto (depende del lente: se dice al dar la hora), ninguna dirección con
número, teléfono, RUT ni registro.

## 5 · Color (medido con la fórmula WCAG 2.x)

| Token | Hex | Rol | Contraste |
|---|---|---|---|
| `--sala` | `#16181A` | El lienzo a oscuras | Luz sobre sala 16,30:1 |
| `--luz` | `#F5F5F2` | El lienzo con la luz encendida; la letra en la sala | Tinta sobre luz 17,55:1 |
| `--tinta` | `#0F0F0F` | La letra con la luz encendida y sobre el duocromo | |
| `--gris-sala` | `#9EA3A8` | Texto secundario en la sala | 7,00:1 sobre sala |
| `--gris-luz` | `#565B60` | Texto secundario con luz | 6,28:1 sobre luz |
| `--linea-sala` / `--linea-luz` | `#2E3236` / `#D4D6D0` | Filetes (no texto) | |
| `--rojo` | `#E0352B` | **Solo** el lado A de una comparación | Tinta sobre rojo 4,30:1: letras de **24 px o más** |
| `--verde` | `#23A04A` | **Solo** el lado B de una comparación | Tinta sobre verde 5,66:1: letras de **24 px o más** |

- La sala da **1,14:1 contra el negro del sitio** (`#060606`): en el índice, las portadas van con la luz encendida
  (luz sobre negro: 18,55:1).
- El rojo y el verde no marcan errores, ni botones, ni estados. Nunca aparecen solos.

## 6 · Ingredientes reales para la fila del inventario (encargo §5)

- **Tipo:** concepto (identidad + sitio + movimiento), 2026. **Rubro:** clínica, oftalmología.
- **Lo construido (17-oct):** pliego de identidad (`identidad/pliego.png`, 1920 × 1080); diez placas en 16:9, 4:5 y
  1,62, cada una sobre lienzo (luz) y sobre tinta (sala), con «CONCEPTO» en la esquina (`identidad/placas/`);
  portadas 4:5, 4:3 y 5:3 con la luz encendida (`identidad/portadas/`); logotipo y símbolo en SVG
  (`identidad/logo/`); home e interior «La evaluación» en HTML y CSS a mano, con el interruptor de luz y el
  comparador (`sitio/`), capturadas a 1440 y 390, a oscuras y con luz (`capturas/`); medios del caso en las formas de
  Koto (`medios/`); recorrido de 10 s en H.264 y VP9 con su póster (`movimiento/`). El caso, en `caso.md`.
- **Capa técnica:** JSON-LD `MedicalClinic` + dos `Physician` + `MedicalProcedure` + `FAQPage` en la home, y
  `MedicalWebPage` + `BreadcrumbList` + `MedicalTest` en la interior; la ficción dentro
  (`disambiguatingDescription` en la clínica y en cada persona); sin `Review` ni `AggregateRating`; `noindex,
  nofollow`; preguntas en texto con encabezados, sin acordeón.
- **Fuentes:** locales (`woff2` en `sitio/fuentes/`), cero peticiones a terceros.
- **Sin métrica:** es un concepto, Ocelo no existe y no atendió a nadie.
- **Generación:** 0 llamadas, 0 créditos.
- **Comprobado el 17-oct:** desborde 0 a 360, 390, 768 y 1440; un `h1` por página; cero nodos de texto bajo AA a
  1440 y 390; rótulo «Concepto» visible sin scroll; foco visible; nada se mueve con movimiento reducido; cero
  terceros; consola limpia (`capturas/comprobacion.json`, `_herramientas/comprobar.mjs`).
