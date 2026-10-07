"""Pixel census of full-page 1440 PNGs: share of exact UI neutrals vs photography."""
import glob, json, numpy as np
from PIL import Image
Image.MAX_IMAGE_PIXELS = None
UI = {'#ffffff': (255, 255, 255), '#0a0a0a': (10, 10, 10), '#000000': (0, 0, 0), '#f4f4f5': (244, 244, 245), '#f0f0f0': (240, 240, 240), '#e4e4e7': (228, 228, 231), '#d4d4d8': (212, 212, 216), '#71717b': (113, 113, 123), '#52525c': (82, 82, 92), '#e2e2e2': (226, 226, 226), '#ebebeb': (235, 235, 235), '#f6f6f6': (246, 246, 246)}
out = {}
for f in sorted(glob.glob('/Users/ramon/m369-recovery/scratch/v3/color/data/*-1440-full.png')):
    im = np.asarray(Image.open(f).convert('RGB')).astype(np.int16)
    h, w, _ = im.shape
    n = h * w
    res = {'h': h}
    for k, v in UI.items():
        res[k] = round(float((np.abs(im - np.array(v)).max(axis=2) <= 1).sum()) / n * 100, 2)
    lum = 0.2126 * im[..., 0] + 0.7152 * im[..., 1] + 0.0722 * im[..., 2]
    res['lum>=245'] = round(float((lum >= 245).sum()) / n * 100, 1)
    res['lum<=20'] = round(float((lum <= 20).sum()) / n * 100, 1)
    # chroma: pixels with saturation (max-min) > 40 => colour in photos
    ch = im.max(axis=2) - im.min(axis=2)
    res['chroma>40'] = round(float((ch > 40).sum()) / n * 100, 1)
    # rows that are entirely pure white (blank bands)
    white_rows = (np.abs(im - 255).max(axis=2) <= 1).all(axis=1)
    res['white_rows%'] = round(float(white_rows.sum()) / h * 100, 1)
    out[f.split('/')[-1].replace('-1440-full.png', '')] = res
json.dump(out, open('/Users/ramon/m369-recovery/scratch/v3/color/data/pixels-1440.json', 'w'), indent=1)
for k, v in out.items(): print(k, v)
