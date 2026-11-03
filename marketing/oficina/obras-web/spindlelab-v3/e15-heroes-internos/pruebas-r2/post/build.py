import sys,os; sys.path.insert(0,sys.argv[1])
from post import *
g,r1,out=sys.argv[2],sys.argv[3],sys.argv[4]
os.makedirs(out,exist_ok=True)
def save(im,slug): im.save(f'{out}/{slug}.webp','WEBP',quality=88,method=6); return im
# iso: copy round1 approved + new metodo
for s in ['nosotros','servicios']: save(resize1200(Image.open(f'{r1}/{s}.png').convert('RGB')),s)
save(resize1200(Image.open(f'{g}/metodo.png').convert('RGB')),'metodo')
# retro: gradient map for both
save(gradmap_retro(resize1200(Image.open(f'{r1}/auditoria-seo-tecnica.png'))),'auditoria-seo-tecnica')
save(gradmap_retro(resize1200(Image.open(f'{g}/visibilidad-en-ia.png'))),'visibilidad-en-ia')
# afiche: paper shift to ~90 measured
def afi(path,slug):
    im=Image.open(path).convert('RGB'); base=hue_p90(im)[0]
    tgt=base; o=im
    for _ in range(3):
        o=paper_shift(im,base,tgt); m=hue_p90(o)[0]
        tgt+= (90-m)
    o=paper_shift(im,base,tgt); print(slug,'base',base,'->',hue_p90(o))
    save(resize1200(o),slug)
afi(f'{r1}/redes-sociales.png','redes-sociales')
for s in ['paid-media','trabajo','blog']: afi(f'{g}/{s}.png',s)
# foto: grain on all three
for s,src in [('desarrollo-web',r1),('acompanamiento-mensual',r1),('contacto',g)]:
    save(grain(resize1200(Image.open(f'{src}/{s}.png').convert('RGB')),sigma=6,seed=15),s)
