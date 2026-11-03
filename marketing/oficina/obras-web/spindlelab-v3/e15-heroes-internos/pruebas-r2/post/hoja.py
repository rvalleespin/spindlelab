import sys
from PIL import Image, ImageDraw, ImageFont
out=sys.argv[1]; dst=sys.argv[2]
rows=[('isometrico',['nosotros','servicios','metodo']),
      ('retro',['auditoria-seo-tecnica','visibilidad-en-ia','diagnostico']),
      ('afiche',['paid-media','redes-sociales','trabajo','blog']),
      ('foto',['desarrollo-web','acompanamiento-mensual','contacto'])]
TW,TH,G,LH=640,360,24,40
W=G+4*(TW+G); H=G+4*(LH+TH+G)
sheet=Image.new('RGB',(W,H),'#060606'); d=ImageDraw.Draw(sheet)
f=ImageFont.truetype('/usr/share/fonts/opentype/inter/Inter-Medium.otf',22)
fs=ImageFont.truetype('/usr/share/fonts/opentype/inter/Inter-Regular.otf',20)
y=G
for est,slugs in rows:
    x=G
    for s in slugs:
        d.text((x,y+8),f'{est} · {s}',fill='white',font=f)
        try:
            im=Image.open(f'{out}/{s}.webp').convert('RGB')
            im=im.resize((TW,round(im.height*TW/im.width)),Image.LANCZOS)
            top=(im.height-TH)//2; sheet.paste(im.crop((0,top,TW,top+TH)),(x,y+LH))
        except FileNotFoundError:
            d.rectangle((x,y+LH,x+TW-1,y+LH+TH-1),outline='#444444',width=2)
            d.text((x+28,y+LH+140),'pendiente: el filtro del generador',fill='#bbbbbb',font=fs)
            d.text((x+28,y+LH+170),'bloqueó los 7 intentos (sin cobro)',fill='#bbbbbb',font=fs)
        x+=TW+G
    y+=LH+TH+G
sheet.save(dst,quality=88)
print(sheet.size)
