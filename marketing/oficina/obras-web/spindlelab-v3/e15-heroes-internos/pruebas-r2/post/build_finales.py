# Finales · uso: python3 build_finales.py <dir post> <dir PNG finales> <dir salida webp> <dir post PNG (scratch)>
# Entrada: <slug>-169.png (2688x1520) y <slug>-45.png (1792x2240) de Higgsfield (gpt_image_2_5, medium, 2k).
# Salida: <slug>-169.webp 1600x900 y <slug>-45.webp 900x1125, cada uno <= 150 kB (baja la calidad hasta que entra).
import sys, os, io
sys.path.insert(0, sys.argv[1])
from post import *
from PIL import ImageDraw, ImageFilter
g, out, scratch = sys.argv[2], sys.argv[3], sys.argv[4]
os.makedirs(out, exist_ok=True); os.makedirs(scratch, exist_ok=True)
TOPE = 150_000

ISO = ['nosotros', 'servicios', 'metodo']
RETRO = ['auditoria-seo-tecnica', 'visibilidad-en-ia', 'diagnostico']
AFICHE = ['paid-media', 'redes-sociales', 'trabajo', 'blog']
FOTO = ['desarrollo-web', 'acompanamiento-mensual', 'contacto']

def a_final(im, fmt):
    w, h = im.size
    if fmt == '169':  # recorte centrado a 16:9 exacto y 1600x900
        hh = round(w * 9 / 16); t = (h - hh) // 2; im = im.crop((0, t, w, t + hh))
        return im.resize((1600, 900), Image.LANCZOS)
    ww = round(h * 4 / 5); l = (w - ww) // 2; im = im.crop((l, 0, l + ww, h))
    return im.resize((900, 1125), Image.LANCZOS)

# método: hunde en sombra el panel bajo el cajón que se abre (Javiera: se leía como un cajón extra).
# Polígonos en coordenadas del PNG original, medidos sobre ampliaciones con grilla.
POLY_METODO = {'169': [(1262, 898), (1352, 890), (1352, 948), (1465, 942), (1465, 952), (1262, 1022)],
               '45': [(818, 1200), (915, 1258), (1048, 1202), (1048, 1282), (820, 1362)]}
def sombra(im, poly, k=0.55, k2=0.85):
    a = np.asarray(im, float)
    mk = Image.new('L', im.size, 0); ImageDraw.Draw(mk).polygon(poly, fill=255)
    mk = np.asarray(mk.filter(ImageFilter.GaussianBlur(4)), float)[..., None] / 255
    bl = np.asarray(im.filter(ImageFilter.GaussianBlur(7)), float)  # borra la manija y el filo
    ys = np.array([p[1] for p in poly]); y0, y1 = ys.min(), ys.max()
    gy = np.clip((np.arange(a.shape[0])[:, None, None] - y0) / (y1 - y0), 0, 1)
    fill = bl * (k + (k2 - k) * gy)  # más hondo arriba, bajo el cajón
    fill = fill + np.random.default_rng(15).normal(0, 4, a.shape)
    return Image.fromarray((a * (1 - mk) + fill * mk).clip(0, 255).astype(np.uint8))

# trabajo 16:9: la etiqueta de la copia salió con una segunda barra borrosa; se tapa con el papel de la etiqueta.
POLY_TRABAJO_169 = [(1166, 644), (1172, 654), (1228, 634), (1226, 612), (1200, 612), (1180, 626), (1166, 630)]
def una_barra(im, poly, muestra):
    a = np.asarray(im, float)
    mk = Image.new('L', im.size, 0); ImageDraw.Draw(mk).polygon(poly, fill=255)
    mk = np.asarray(mk.filter(ImageFilter.GaussianBlur(0.8)), float)[..., None] / 255
    x0, y0, x1, y1 = muestra
    tag = a[y0:y1, x0:x1].reshape(-1, 3).mean(0)
    fill = tag + np.random.default_rng(15).normal(0, 5, a.shape)
    return Image.fromarray((a * (1 - mk) + fill * mk).clip(0, 255).astype(np.uint8))

def afiche_post(im):
    base = hue_p90(im)[0]; tgt = base
    for _ in range(3):
        o = paper_shift(im, base, tgt); tgt += 90 - hue_p90(o)[0]
    return paper_print(paper_shift(im, base, tgt))

def guardar(im, name):
    im.save(f'{scratch}/{name}.png')
    for q in range(88, 14, -2):  # el retro 16:9 (grabado fino) solo entra bajo q 30
        b = io.BytesIO(); im.save(b, 'WEBP', quality=q, method=6)
        if b.tell() <= TOPE: break
    open(f'{out}/{name}.webp', 'wb').write(b.getvalue())
    print(f'{name:32s} q={q:2d} {b.tell()/1000:6.1f} kB' + ('  ** NO BAJA DE 150 kB' if b.tell() > TOPE else ''))
    return q, b.tell()

for fmt in ['169', '45']:
    for s in ISO + RETRO + AFICHE + FOTO:
        im = Image.open(f'{g}/{s}-{fmt}.png').convert('RGB')
        if s == 'metodo': im = sombra(im, POLY_METODO[fmt])
        if s == 'trabajo' and fmt == '169': im = una_barra(im, POLY_TRABAJO_169, (1185, 655, 1200, 665))
        im = a_final(im, fmt)
        if s in RETRO: im = gradmap_retro(im)                 # verde botella §1.7
        elif s in AFICHE: im = afiche_post(im)                # papel a ~90°, luego impreso S 0,6 / V 0,85 (R3.6)
        elif s in FOTO: im = grain(im, sigma=6, seed=15)      # grano §1.6
        guardar(im, f'{s}-{fmt}')
