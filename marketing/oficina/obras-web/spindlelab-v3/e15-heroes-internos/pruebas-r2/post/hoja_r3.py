# Ronda 3 · uso: python3 hoja_r3.py <dir pruebas-r3>  -> hoja.jpg (16:9, 640x360) y hoja-45.jpg (recorte 4:5 central, 288x360)
import sys
from PIL import Image, ImageDraw, ImageFont
out=sys.argv[1]
rows=[('isometrico',['nosotros','servicios','metodo']),
      ('retro',['auditoria-seo-tecnica','visibilidad-en-ia','diagnostico']),
      ('afiche',['paid-media','redes-sociales','trabajo','blog']),
      ('foto',['desarrollo-web','acompanamiento-mensual','contacto'])]
f=ImageFont.truetype('/usr/share/fonts/opentype/inter/Inter-Medium.otf',22)
fs=ImageFont.truetype('/usr/share/fonts/opentype/inter/Inter-Medium.otf',15)
def hoja(TW,TH,dst,crop45,font,G=24,LH=40):
    W=G+4*(TW+G); H=G+4*(LH+TH+G)
    sheet=Image.new('RGB',(W,H),'#060606'); d=ImageDraw.Draw(sheet); y=G
    for est,slugs in rows:
        x=G
        for s in slugs:
            d.text((x,y+8),f'{est} · {s}',fill='white',font=font)
            im=Image.open(f'{out}/{s}.webp').convert('RGB')
            if crop45:  # recorte 4:5 central a alto completo, como en el celular
                w=round(im.height*4/5); l=(im.width-w)//2; im=im.crop((l,0,l+w,im.height))
            im=im.resize((TW,round(im.height*TW/im.width)),Image.LANCZOS)
            top=(im.height-TH)//2; sheet.paste(im.crop((0,top,TW,top+TH)),(x,y+LH))
            x+=TW+G
        y+=LH+TH+G
    sheet.save(dst,quality=88); print(dst,sheet.size)
hoja(640,360,f'{out}/hoja.jpg',False,f)
hoja(288,360,f'{out}/hoja-45.jpg',True,fs)
