import json, re, numpy as np
from PIL import Image
D = '/Users/ramon/m369-recovery/scratch/v3/color/'
import sys
items = json.load(open(D + (sys.argv[1] if len(sys.argv)>1 else 'data/overimg.json')))
def lin(c):
    c = c / 255.0
    return np.where(c <= 0.04045, c / 12.92, ((c + 0.055) / 1.055) ** 2.4)
def L(rgb):
    l = lin(rgb.astype(np.float64))
    return 0.2126 * l[..., 0] + 0.7152 * l[..., 1] + 0.0722 * l[..., 2]
res = []
for it in items:
    if it.get('skip') or 'a' not in it: continue
    m = re.match(r'rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?\)', it['color'])
    if not m:
        m2 = re.match(r'oklab\(([\d.]+)', it['color'])
        if m2 and float(m2.group(1)) > 0.99: fg = np.array([255, 255, 255.]); al = float(re.search(r'/ ([\d.]+)', it['color']).group(1)) if '/' in it['color'] else 1
        else: continue
    else:
        fg = np.array([float(m.group(i)) for i in (1, 2, 3)]); al = float(m.group(4)) if m.group(4) else 1.0
    a = np.asarray(Image.open(D + it['a']).convert('RGB')).astype(np.float64)
    b = np.asarray(Image.open(D + it['b']).convert('RGB')).astype(np.float64)
    if 'crop' in sys.argv:
        dpr = 2 if it['vp'] == 390 else 1
        r = it['rect']; x0, y0 = int(max(0, r['x']) * dpr), int(max(0, r['y']) * dpr); x1, y1 = int((r['x'] + r['w']) * dpr), int((r['y'] + r['h']) * dpr)
        a = a[y0:y1, x0:x1]; b = b[y0:y1, x0:x1]
    if a.shape != b.shape or a.size == 0: continue
    eff = fg * al + b * (1 - al)  # text colour composited per pixel
    lf, lb = L(eff), L(b)
    ratio = (np.maximum(lf, lb) + 0.05) / (np.minimum(lf, lb) + 0.05)
    glyph = np.abs(a - b).max(axis=2) > 40
    rg = ratio[glyph] if glyph.sum() > 20 else ratio.ravel()
    bgmean = b.reshape(-1, 3).mean(axis=0)
    res.append({'page': it['label'], 'vp': it['vp'], 'txt': it['txt'], 'fs': it['fs'], 'fw': it['fw'], 'color': it['color'], 'shadow': it['shadow'],
                'bg_mean': '#%02x%02x%02x' % tuple(int(x) for x in bgmean),
                'box_min': round(float(ratio.min()), 2), 'box_p5': round(float(np.percentile(ratio, 5)), 2), 'box_med': round(float(np.median(ratio)), 2),
                'glyph_min': round(float(rg.min()), 2), 'glyph_p5': round(float(np.percentile(rg, 5)), 2), 'glyph_med': round(float(np.median(rg)), 2),
                'pct_below_4.5': round(float((rg < 4.5).mean() * 100), 1), 'pct_below_3': round(float((rg < 3).mean() * 100), 1), 'file': it['b']})
json.dump(res, open(D + ('data/overimg2-contrast.json' if 'crop' in sys.argv else 'data/overimg-contrast.json'), 'w'), indent=1)
for r in res:
    print(f"{r['page']:16} {r['vp']} «{r['txt'][:34]:34}» {r['fs']}/{r['fw']} col={r['color'][:28]} bgmean={r['bg_mean']} glyph p5={r['glyph_p5']} med={r['glyph_med']} min={r['glyph_min']} <4.5:{r['pct_below_4.5']}% <3:{r['pct_below_3']}% shadow={r['shadow'][:20]}")
