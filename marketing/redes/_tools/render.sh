#!/usr/bin/env bash
# render.sh <archivo.html> [ancho] [alto]  → PNG del mismo nombre, exacto al tamaño pedido.
# En el entorno cloud, Chrome pinta solo ~alto-85px del viewport que pide --window-size:
# se renderiza con holgura y se recorta al tamaño real. Verificado 31-ago-2026.
set -euo pipefail
CHROME="${CHROME:-/opt/pw-browsers/chromium-1194/chrome-linux/chrome}"
[ -x "$CHROME" ] || CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
IN="$(cd "$(dirname "$1")" && pwd)/$(basename "$1")"
W="${2:-1080}"; H="${3:-1080}"
OUT="${IN%.html}.png"
"$CHROME" --headless --no-sandbox --disable-gpu --hide-scrollbars \
  --force-device-scale-factor=1 --window-size="$W,$((H+140))" \
  --screenshot="$OUT" "file://$IN" 2>/dev/null || true
python3 - "$OUT" "$W" "$H" <<'PY'
import sys,zlib,struct
p,W,H=sys.argv[1],int(sys.argv[2]),int(sys.argv[3])
d=open(p,'rb').read(); pos=8; idat=b''; ct=2
while pos<len(d):
    ln=struct.unpack('>I',d[pos:pos+4])[0]; t=d[pos+4:pos+8]; data=d[pos+8:pos+8+ln]
    if t==b'IHDR': w,h,bd,ct=struct.unpack('>IIBB',data[:10])
    if t==b'IDAT': idat+=data
    pos+=12+ln
bpp={2:3,6:4}[ct]; stride=w*bpp; raw=zlib.decompress(idat)
out=bytearray(); prev=bytearray(stride); i=0
for y in range(h):
    f=raw[i]; i+=1; line=bytearray(raw[i:i+stride]); i+=stride
    for x in range(stride):
        a=line[x-bpp] if x>=bpp else 0; b=prev[x]; c=prev[x-bpp] if x>=bpp else 0
        if f==1: line[x]=(line[x]+a)&255
        elif f==2: line[x]=(line[x]+b)&255
        elif f==3: line[x]=(line[x]+(a+b)//2)&255
        elif f==4:
            q=a+b-c; pa,pb,pc=abs(q-a),abs(q-b),abs(q-c)
            line[x]=(line[x]+(a if (pa<=pb and pa<=pc) else (b if pb<=pc else c)))&255
    out+=line; prev=line
if (w,h)!=(W,H):
    ns=W*bpp; crop=bytearray()
    for y in range(H):
        row=out[y*stride:y*stride+ns] if y<h else bytes(ns)
        crop+=row+bytes(max(0,ns-len(row)))
    out=crop; stride=ns; w,h=W,H
body=b''.join(b'\x00'+bytes(out[y*stride:(y+1)*stride]) for y in range(h))
def chunk(t,dd):
    return struct.pack('>I',len(dd))+t+dd+struct.pack('>I',zlib.crc32(t+dd)&0xffffffff)
png=b'\x89PNG\r\n\x1a\n'+chunk(b'IHDR',struct.pack('>IIBBBBB',w,h,8,ct,0,0,0))+chunk(b'IDAT',zlib.compress(bytes(body),9))+chunk(b'IEND',b'')
open(p,'wb').write(png)
print(f"{p}  {w}x{h}  colortype={ct}")
PY
