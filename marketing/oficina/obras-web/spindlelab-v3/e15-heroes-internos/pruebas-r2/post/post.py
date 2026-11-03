import sys, numpy as np
from PIL import Image, ImageFilter
import colorsys

def hexrgb(h): h=h.lstrip('#'); return np.array([int(h[i:i+2],16) for i in (0,2,4)],float)/255
def s2l(c): return np.where(c<=0.04045,c/12.92,((c+0.055)/1.055)**2.4)
def l2s(c): return np.where(c<=0.0031308,c*12.92,1.055*np.power(np.clip(c,0,None),1/2.4)-0.055)

def resize1200(im):
    w,h=im.size; return im.resize((1200,round(h*1200/w)),Image.LANCZOS)

def gradmap_retro(im):
    a=np.asarray(im.convert('RGB'),float)/255
    lin=s2l(a); L=0.2126*lin[...,0]+0.7152*lin[...,1]+0.0722*lin[...,2]
    Ls=l2s(L)  # perceptual-ish 0..1
    # normalize luminance range (percentiles) to use full map
    lo,hi=np.percentile(Ls,1),np.percentile(Ls,99.5)
    t=np.clip((Ls-lo)/(hi-lo),0,1)
    stops=[(0,hexrgb('#0F2A1C')),(0.45,hexrgb('#2E5B3A')),(1,hexrgb('#A9DDA0'))]
    out=np.zeros_like(a)
    for (t0,c0),(t1,c1) in zip(stops[:-1],stops[1:]):
        m=(t>=t0)&(t<=t1); f=((t-t0)/(t1-t0))[...,None]
        c=l2s(s2l(c0)*(1-f)+s2l(c1)*f)
        out[m]=c[m]
    return Image.fromarray((np.clip(out,0,1)*255).round().astype(np.uint8))

def lima_shift(im, target=90):
    hsv=np.asarray(im.convert('RGB').convert('HSV'),float)
    H,S,V=hsv[...,0],hsv[...,1]/255,hsv[...,2]/255
    hue=H*360/255
    w=np.clip((S-0.35)/0.2,0,1)*np.clip((V-0.35)/0.15,0,1)*np.clip(1-np.abs(hue-74)/40,0,1)
    a=np.asarray(im.convert('RGB'),float)/255
    # rotate hue per pixel via colorsys vectorized approx: use HSV
    newhue=(hue+(target-74)*w)%360
    import numpy as _n
    h=newhue/60; i=_n.floor(h)%6; f=h-_n.floor(h)
    p=V*(1-S); q=V*(1-S*f); tt=V*(1-S*(1-f))
    r=_n.choose(i.astype(int),[V,q,p,p,tt,V]); g=_n.choose(i.astype(int),[tt,V,V,q,p,p]); b=_n.choose(i.astype(int),[p,p,tt,V,V,q])
    rgb=_n.stack([r,g,b],-1)
    return Image.fromarray((_n.clip(rgb,0,1)*255).round().astype(_n.uint8))

def grain(im, sigma=6, seed=15):
    a=np.asarray(im.convert('RGB'),float)
    rng=np.random.default_rng(seed)
    n=rng.normal(0,1,a.shape[:2]).astype(np.float32)
    ni=Image.fromarray(((n*40)+128).clip(0,255).astype(np.uint8))
    nb=np.asarray(ni.filter(ImageFilter.GaussianBlur(0.6)),float)-128
    nb=nb/nb.std()*sigma
    L=(0.299*a[...,0]+0.587*a[...,1]+0.114*a[...,2])/255
    wt=4*L*(1-L)
    out=a+(nb*wt)[...,None]
    return Image.fromarray(out.clip(0,255).round().astype(np.uint8))

def hue_p90(im):
    a=np.asarray(im.convert('RGB'),float)/255
    L=0.299*a[...,0]+0.587*a[...,1]+0.114*a[...,2]
    m=L>=np.percentile(L,90)
    px=a[m]; mean=px.mean(0)
    h,l,s=colorsys.rgb_to_hls(*mean); return round(h*360,1), round(l,3), round(s,3)
def bg(im):
    a=np.asarray(im.convert('RGB'),float)/255
    L=0.299*a[...,0]+0.587*a[...,1]+0.114*a[...,2]
    m=L<=np.percentile(L,10); mean=a[m].mean(0)
    h,l,s=colorsys.rgb_to_hls(*mean); return round(h*360,1), round(l,3), round(s,3)

def paper_shift(im, base, target=90):
    a=np.asarray(im.convert('RGB'),float)/255
    mx=a.max(-1); mn=a.min(-1); V=mx; d=mx-mn; S=np.where(mx>0,d/np.maximum(mx,1e-6),0)
    r,g,b=a[...,0],a[...,1],a[...,2]
    h=np.zeros_like(mx); dd=np.maximum(d,1e-6)
    h=np.where(mx==r,((g-b)/dd)%6,np.where(mx==g,(b-r)/dd+2,(r-g)/dd+4))*60
    w=np.clip((S-0.35)/0.2,0,1)*np.clip((V-0.35)/0.15,0,1)*np.clip(1-np.abs(h-base)/35,0,1)
    nh=(h+(target-base)*w)%360/60; i=np.floor(nh).astype(int)%6; f=nh-np.floor(nh)
    p=V*(1-S); q=V*(1-S*f); t=V*(1-S*(1-f))
    R=np.choose(i,[V,q,p,p,t,V]); G=np.choose(i,[t,V,V,q,p,p]); B=np.choose(i,[p,p,t,V,V,q])
    return Image.fromarray((np.clip(np.stack([R,G,B],-1),0,1)*255).round().astype(np.uint8))
