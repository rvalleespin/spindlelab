# Finales · uso: python3 hoja_finales.py <dir webp finales> <dir salida>
# hoja.jpg: las trece en 16:9 (640x360). hoja-45.jpg: las trece 4:5 tal como salen (288x360), no un recorte.
import sys
from PIL import Image, ImageDraw, ImageFont
src, out = sys.argv[1], sys.argv[2]
rows=[('isometrico',['nosotros','servicios','metodo']),
      ('retro',['auditoria-seo-tecnica','visibilidad-en-ia','diagnostico']),
      ('afiche',['paid-media','redes-sociales','trabajo','blog']),
      ('foto',['desarrollo-web','acompanamiento-mensual','contacto'])]
f=ImageFont.truetype('/usr/share/fonts/opentype/inter/Inter-Medium.otf',22)
fs=ImageFont.truetype('/usr/share/fonts/opentype/inter/Inter-Medium.otf',15)
def hoja(TW,TH,suf,dst,font,G=24,LH=40):
    W=G+4*(TW+G); H=G+4*(LH+TH+G)
    sheet=Image.new('RGB',(W,H),'#060606'); d=ImageDraw.Draw(sheet); y=G
    for est,slugs in rows:
        x=G
        for s in slugs:
            d.text((x,y+8),f'{est} · {s}',fill='white',font=font)
            im=Image.open(f'{src}/{s}-{suf}.webp').convert('RGB').resize((TW,TH),Image.LANCZOS)
            sheet.paste(im,(x,y+LH)); x+=TW+G
        y+=LH+TH+G
    sheet.save(dst,quality=88); print(dst,sheet.size)
hoja(640,360,'169',f'{out}/hoja.jpg',f)
hoja(288,360,'45',f'{out}/hoja-45.jpg',fs)
