"""E12 · logo final · el giro de la tortera, como prueba (Bruno, 19-oct-2026).

Uso: python3 -I giro.py <dir-logo> <google-sans-flex.woff2>
Deja en <dir-logo>/final/movimiento/: logo-grande-giro.svg (el corte grande con la tortera separada en dos capas y la
muesca) y giro.html (la demo, con el CSS que haría falta en el sitio).

La idea, y por qué no es una escala: una tortera gira alrededor de la vara, y un disco que gira sobre su eje se ve
igual en cada instante. Una escala horizontal (de 1 a −1, lo que proponía caminos.md §4) muestra un disco que se da
vuelta como una moneda, que es otro movimiento. Lo único que deja ver un giro es una marca que corre por el canto:
aquí, una muesca negativa que pasa de izquierda a derecha por el frente del canto (x = rx·sen θ, ancho ∝ cos θ, oculta
en la mitad de atrás y detrás de la vara), dos vueltas que frenan, en 1,6 s (primero probé tres en 1,2 s: la
primera vuelta duraba 130 ms y la muesca saltaba en vez de correr). En reposo la muesca queda detrás de la
vara, así que el logo quieto es idéntico al de logo-grande-*.svg.
"""
import math
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import huso as H  # noqa: E402
import final as FIN  # noqa: E402

LOGO, LETRA = os.path.abspath(sys.argv[1]), sys.argv[2]
OUT = os.path.join(LOGO, "final", "movimiento")
os.makedirs(OUT, exist_ok=True)

C = FIN.CORTES["grande"]
P = C["tortera"]
c = H.K.Corte(LETRA, {**FIN.FIJOS, **C["instancia"]})
esc = H.CAP / c.cap
palabra, med = H.palabra(c, P, C["ajuste"])
s = med["asta"]
cx, cy = med["cx"], med["centro_tortera"]
rx, ry = P["ancho"] * s / 2, P["alto"] * s / 2
canto = P["canto"] * s
ryc = ry - canto / 2
lleno = P["lleno"]
sx0, sx1 = med["vara_x"]
banda = H.union([H.elipse(cx, cy - canto / 2, rx, ryc, lleno), H.rect(cx - rx, cy - canto / 2, cx + rx, cy + canto / 2)])
cara = H.elipse(cx, cy + canto / 2, rx, ryc, lleno)
luna = H.resta(H.elipse(cx, cy + canto / 2 - P["filete"] * s, rx, ryc, lleno), cara)
vara = H.rect(sx0, -1, sx1, cy + ry + 1)
region_canto = H.resta(H.resta(H.resta(banda, cara), luna), vara)
# restar la región exacta falla (bordes que coinciden con los de la palabra): se resta la región ensanchada 0,02
# unidades hacia los cuatro lados, y el canto exacto se dibuja encima; la diferencia no llega a un píxel ni a 2000 px


def movido(path, dx, dy):
    q = H.nuevo()
    path.draw(H.TransformPen(q.getPen(), (1, 0, 0, 1, dx, dy)))
    return q


holgura = H.union([movido(region_canto, dx, dy) for dx, dy in ((0.02, 0), (-0.02, 0), (0, 0.02), (0, -0.02))])
estatico = H.resta(palabra, holgura)

b = palabra.bounds
X0, Y0, W, Hh = b[0], -b[3], b[2] - b[0], b[3] - b[1]
f = H._f
# muesca: un rectángulo centrado en cx (y hacia abajo), que el CSS mueve y achica
mw = 0.4 * s
m_y0, m_y1 = -(cy + canto / 2 + 1), -(cy - ry - 1)
svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{f(X0)} {f(Y0)} {f(W)} {f(Hh)}" role="img" aria-label="SpindleLab" class="logo-giro">'
       f'<title>SpindleLab</title><defs><mask id="canto-muesca" maskUnits="userSpaceOnUse" x="{f(X0)}" y="{f(Y0)}" width="{f(W)}" height="{f(Hh)}">'
       f'<rect x="{f(X0)}" y="{f(Y0)}" width="{f(W)}" height="{f(Hh)}" fill="#fff"/>'
       f'<rect class="muesca" x="{f(cx - mw / 2)}" y="{f(m_y0)}" width="{f(mw)}" height="{f(m_y1 - m_y0)}" fill="#000"/></mask></defs>'
       f'<path fill="currentColor" d="{H.a_svg_d(estatico, 0)}"/>'
       f'<path fill="currentColor" mask="url(#canto-muesca)" d="{H.a_svg_d(region_canto, 0)}"/></svg>\n')
open(os.path.join(OUT, "logo-grande-giro.svg"), "w").write(svg)

# fotogramas clave: dos vueltas que frenan (θ = 2·2π·(1 − (1 − t)²)), 61 paradas lineales
pasos = []
for i in range(61):
    t = i / 60
    th = 2 * 2 * math.pi * (1 - (1 - t) ** 2)
    co = math.cos(th)
    dx = rx * 0.94 * math.sin(th)
    esc_x = max(co, 0.0)
    pasos.append(f"  {t * 100:.2f}% {{ transform: translateX({dx:.2f}px) scaleX({esc_x:.3f}); }}")
keyframes = "@keyframes giro-tortera {\n" + "\n".join(pasos) + "\n}\n"
css = ("/* El giro de la tortera (logo grande). En reposo la muesca queda detrás de la vara: el logo quieto no cambia.\n"
       "   Corre una vez al cargar y otra al pasar el mouse o el foco por el logo; con movimiento reducido, nunca. */\n"
       ".logo-giro .muesca { transform-box: fill-box; transform-origin: 50% 50%; transform: scaleX(0); }\n"
       "@media (prefers-reduced-motion: no-preference) {\n"
       "  .logo-giro .muesca { animation: giro-tortera 1600ms linear 300ms 1 both; }\n"
       "  a:hover > .logo-giro .muesca, a:focus-visible > .logo-giro .muesca { animation-name: giro-tortera-otra; }\n"
       "}\n" + keyframes + keyframes.replace("giro-tortera {", "giro-tortera-otra {"))
# Nota: translateX va en unidades del viewBox porque la muesca vive dentro del SVG (transform-box: fill-box).
html = f"""<!doctype html><html lang="es-CL"><meta charset="utf-8"><title>Giro de la tortera</title>
<style>
html,body{{margin:0;background:#060606;color:#fff;font:13px/1.4 system-ui,sans-serif}}
main{{padding:40px;display:flex;flex-direction:column;gap:40px;align-items:flex-start}}
a{{color:#fff;display:inline-block}} a:focus-visible{{outline:2px solid #fff;outline-offset:6px}}
.g svg{{height:160px;display:block}} .m svg{{height:48px;display:block}}
p{{max-width:70ch;color:#bbb}}
{css}
</style>
<main>
<a href="#" class="g" aria-label="SpindleLab, inicio">{svg}</a>
<a href="#" class="m" aria-label="SpindleLab, inicio">{svg.replace('canto-muesca', 'canto-muesca-2')}</a>
<p>Prueba del giro: la muesca corre por el canto de la tortera dos vueltas que frenan, al cargar y al pasar el mouse o el foco. Con movimiento reducido no corre.</p>
</main></html>
"""
open(os.path.join(OUT, "giro.html"), "w").write(html)
open(os.path.join(OUT, "giro.css"), "w").write(css)
print("giro listo:", OUT, "rx", round(rx, 2), "s", round(s, 2))
