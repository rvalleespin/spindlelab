#!/usr/bin/env python3
"""Porcentaje de píxeles «dorados» de una imagen o de los cuadros de un video.

Misma ventana que spec-home.md §5: tono HSV 30 a 60°, S >= 0,45, V >= 0,45.
Uso:
  python3 medir-dorado.py <imagen.webp> [<imagen2> ...]
  python3 medir-dorado.py --video <clip.webm>      (muestrea 2 cuadros por segundo con ffmpeg)
Bruno, 2-nov-2026 (e14).
"""
import glob
import os
import subprocess
import sys
import tempfile

import numpy as np
from PIL import Image


def dorado(ruta):
    a = np.asarray(Image.open(ruta).convert("HSV")).astype(float)
    h = a[..., 0] * 360 / 255
    s = a[..., 1] / 255
    v = a[..., 2] / 255
    return ((h >= 30) & (h <= 60) & (s >= 0.45) & (v >= 0.45)).mean() * 100


def main(args):
    if args and args[0] == "--video":
        with tempfile.TemporaryDirectory() as tmp:
            subprocess.run(["ffmpeg", "-v", "error", "-i", args[1], "-vf", "fps=2",
                            os.path.join(tmp, "f_%04d.png")], check=True)
            vals = [dorado(f) for f in sorted(glob.glob(os.path.join(tmp, "*.png")))]
        print(f"{args[1]}: cuadros={len(vals)} mediana={np.median(vals):.2f}% max={max(vals):.2f}%")
        return
    for ruta in args:
        print(f"{ruta}: {dorado(ruta):.2f}%")


if __name__ == "__main__":
    main(sys.argv[1:])
