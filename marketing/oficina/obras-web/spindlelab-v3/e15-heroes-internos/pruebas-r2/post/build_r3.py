# Ronda 3 · uso: python3 build_r3.py <dir post> <dir PNG nuevos r3> <dir pruebas-r2> <dir salida pruebas-r3>
import sys,os,shutil; sys.path.insert(0,sys.argv[1])
from post import *
g,r2,out=sys.argv[2],sys.argv[3],sys.argv[4]
os.makedirs(out,exist_ok=True)
def save(im,slug): im.save(f'{out}/{slug}.webp','WEBP',quality=88,method=6); return im
# 1. Aprobadas sin cambio: copia byte a byte de r2
for s in ['nosotros','servicios','auditoria-seo-tecnica','visibilidad-en-ia','desarrollo-web','acompanamiento-mensual']:
    shutil.copy(f'{r2}/{s}.webp',f'{out}/{s}.webp')
# 2. Nuevas
save(resize1200(Image.open(f'{g}/metodo-b.png').convert('RGB')),'metodo')           # sin post
save(gradmap_retro(resize1200(Image.open(f'{g}/diagnostico.png'))),'diagnostico')   # verde botella §1.7
save(grain(resize1200(Image.open(f'{g}/contacto.png').convert('RGB')),sigma=6,seed=15),'contacto')  # grano §1.6
# trabajo: retoque de la segunda barra de la etiqueta izquierda, paper_shift a ~90 y luego impreso
im=Image.open(f'{g}/trabajo.png').convert('RGB')
from PIL import ImageDraw, ImageFilter
a=np.asarray(im,float)
# polígono de la barra borrosa (coordenadas en 1344x752), medido sobre una ampliación con grilla; queda dentro de la etiqueta
poly=[(580,320),(582.5,333),(615,324),(610,307.5)]
mk=Image.new('L',im.size,0); ImageDraw.Draw(mk).polygon(poly,fill=255)
mk=np.asarray(mk.filter(ImageFilter.GaussianBlur(0.8)),float)[...,None]/255
tag=a[288:297,584:597].reshape(-1,3).mean(0)          # papel de la etiqueta, sobre la barra buena
rng=np.random.default_rng(15); fill=tag+rng.normal(0,5,a.shape)
a=a*(1-mk)+fill*mk
im=Image.fromarray(a.clip(0,255).astype(np.uint8))
base=hue_p90(im)[0]; tgt=base
for _ in range(3):
    o=paper_shift(im,base,tgt); tgt+=90-hue_p90(o)[0]
save(paper_print(resize1200(paper_shift(im,base,tgt))),'trabajo')
# 3. Los otros tres afiches: impreso sobre el webp de r2 (ya en ~90)
for s in ['paid-media','redes-sociales','blog']:
    save(paper_print(Image.open(f'{r2}/{s}.webp').convert('RGB')),s)
for s in ['paid-media','redes-sociales','trabajo','blog']:
    print(s,'papel H,S,V antes', medir_papel(Image.open(f'{r2}/{s}.webp')),'después',medir_papel(Image.open(f'{out}/{s}.webp')),'p90',hue_p90(Image.open(f'{out}/{s}.webp')))
