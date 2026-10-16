# Oro por vista (manual §07b: tono 38-54°, sat >= 0,5, brillo >= 0,5; HSV de PIL), sobre capturas de página
# completa tomadas con --disable-lcd-text (capg.mjs). Quita el punto del wordmark (caja de oro en los últimos
# 1000 px) y busca la ventana de un viewport con más píxeles oro. Umbral: 0,05 % del viewport.
import glob, os, sys
from PIL import Image, ImageChops, ImageDraw
def mask(img):
    h,s,v=img.convert('HSV').split()
    hm=h.point(lambda x:255 if 27<=x<=38 else 0); sm=s.point(lambda x:255 if x>=128 else 0); vm=v.point(lambda x:255 if x>=128 else 0)
    return ImageChops.multiply(ImageChops.multiply(hm,sm),vm)
for f in sorted(glob.glob(sys.argv[1] if len(sys.argv)>1 else 'capg/*.png')):
    im=Image.open(f).convert('RGB'); W,H=im.size; vh=900 if W==1440 else 844
    m=mask(im); bot=m.crop((0,H-1000,W,H)).getbbox(); dot=(bot[0],bot[1]+H-1000,bot[2],bot[3]+H-1000) if bot else None
    m2=m.copy()
    if dot and (dot[2]-dot[0])<60: ImageDraw.Draw(m2).rectangle(dot,fill=0)
    worst=(0,None)
    for y in range(0,max(1,H-vh+1),50):
        n=m2.crop((0,y,W,y+vh)).histogram()[255]
        if n>worst[0]: worst=(n,y)
    thr=0.0005*W*vh
    print(os.path.basename(f),'punto',dot,'| fuera del punto, peor vista:',worst[0],'px en y',worst[1],'| umbral',int(thr),'SEGUNDO ORO' if worst[0]>thr else 'limpio')
