"""Parse captured Studio Iron stylesheets: every declared color, with selector/state context."""
import re, glob, json, math, collections, sys

def srgb_from_linear(c):
    c = max(0.0, min(1.0, c))
    return 12.92 * c if c <= 0.0031308 else 1.055 * c ** (1 / 2.4) - 0.055

def lab_to_rgb(L, a, b):
    # CIE Lab (D50) -> XYZ D50 -> D65 (Bradford) -> linear sRGB
    fy = (L + 16) / 116; fx = fy + a / 500; fz = fy - b / 200
    e = 216 / 24389; k = 24389 / 27
    xr = fx ** 3 if fx ** 3 > e else (116 * fx - 16) / k
    yr = ((L + 16) / 116) ** 3 if L > k * e else L / k
    zr = fz ** 3 if fz ** 3 > e else (116 * fz - 16) / k
    X, Y, Z = xr * 0.3457 / 0.3585, yr, zr * (1 - 0.3457 - 0.3585) / 0.3585
    # Bradford D50->D65
    M = [[0.955473421488075, -0.02309845494876471, 0.06325924320057072],
         [-0.0283697093338637, 1.0099953980813041, 0.021041441191917323],
         [0.012314014864481998, -0.020507649298898964, 1.330365926242124]]
    X2 = M[0][0]*X + M[0][1]*Y + M[0][2]*Z
    Y2 = M[1][0]*X + M[1][1]*Y + M[1][2]*Z
    Z2 = M[2][0]*X + M[2][1]*Y + M[2][2]*Z
    r = 3.2409699419045226*X2 - 1.537383177570094*Y2 - 0.4986107602930034*Z2
    g = -0.9692436362808796*X2 + 1.8759675015077202*Y2 + 0.04155505740717559*Z2
    bb = 0.05563007969699366*X2 - 0.20397695888897652*Y2 + 1.0569715142428786*Z2
    return [round(255 * srgb_from_linear(v)) for v in (r, g, bb)]

def oklab_to_rgb(L, a, b):
    l_ = L + 0.3963377774 * a + 0.2158037573 * b
    m_ = L - 0.1055613458 * a - 0.0638541728 * b
    s_ = L - 0.0894841775 * a - 1.2914855480 * b
    l, m, s = l_ ** 3, m_ ** 3, s_ ** 3
    r = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s
    g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s
    bb = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s
    return [round(255 * srgb_from_linear(v)) for v in (r, g, bb)]

NAMED = {'white': (255, 255, 255), 'black': (0, 0, 0)}

def num(x, pct_scale=1.0):
    x = x.strip()
    if x.endswith('%'): return float(x[:-1]) / 100 * pct_scale
    if x == 'none': return 0.0
    return float(x)

def to_hex(v):
    v = v.strip().lower()
    alpha = 1.0
    try:
        if v.startswith('#'):
            h = v[1:]
            if len(h) in (3, 4): h = ''.join(c * 2 for c in h)
            rgb = [int(h[i:i + 2], 16) for i in (0, 2, 4)]
            if len(h) == 8: alpha = int(h[6:8], 16) / 255
        elif v in NAMED: rgb = list(NAMED[v])
        elif v == 'transparent': return 'transparent'
        else:
            m = re.match(r'(rgba?|lab|oklab|oklch|lch|hsla?)\((.*)\)$', v)
            if not m: return None
            fn, body = m.group(1), m.group(2)
            parts = re.split(r'[\s,/]+', body.strip())
            if '/' in body: alpha = num(body.split('/')[1])
            elif fn in ('rgba', 'hsla') and len(parts) == 4: alpha = num(parts[3])
            if fn.startswith('rgb'):
                rgb = [round(num(p, 255)) for p in parts[:3]]
            elif fn == 'lab':
                rgb = lab_to_rgb(num(parts[0], 100), num(parts[1], 125), num(parts[2], 125))
            elif fn == 'oklab':
                rgb = oklab_to_rgb(num(parts[0], 1), num(parts[1], 0.4), num(parts[2], 0.4))
            elif fn == 'oklch':
                L, C, H = num(parts[0], 1), num(parts[1], 0.4), float(parts[2].replace('deg', '')) if parts[2] != 'none' else 0
                rgb = oklab_to_rgb(L, C * math.cos(math.radians(H)), C * math.sin(math.radians(H)))
            else:
                return None
    except Exception as e:
        return None
    rgb = [max(0, min(255, c)) for c in rgb]
    s = '#%02x%02x%02x' % tuple(rgb)
    if alpha < 1: s += '@%.2f' % alpha
    return s

COLOR_RE = re.compile(r'(#[0-9a-fA-F]{3,8}\b|(?:rgba?|lab|oklab|oklch|hsla?)\([^()]*\)|\bwhite\b|\bblack\b|\btransparent\b|var\(--[\w-]+(?:,[^()]*)?\))')

def parse_blocks(css):
    """yield (context_list, selector, declarations_text)"""
    css = re.sub(r'/\*.*?\*/', '', css, flags=re.S)
    stack = []; i = 0; buf = ''
    out = []
    while i < len(css):
        ch = css[i]
        if ch == '{':
            stack.append(buf.strip()); buf = ''
        elif ch == '}':
            if buf.strip():
                out.append((stack[:-1], stack[-1] if stack else '', buf.strip()))
            buf = ''
            if stack: stack.pop()
        elif ch == ';' and stack:
            buf += ch
        else:
            buf += ch
        i += 1
        # flush declarations before nested rule: handled approx by keeping buf; nested rules within rules (css nesting) rare
    return out

def main(files):
    vars_ = {}
    decls = []
    for f in files:
        css = open(f).read()
        for ctx, sel, body in parse_blocks(css):
            for d in body.split(';'):
                if ':' not in d: continue
                prop, val = d.split(':', 1)
                prop = prop.strip(); val = val.strip()
                if prop.startswith('--'):
                    if COLOR_RE.search(val): vars_.setdefault(prop, set()).add(val)
                cols = COLOR_RE.findall(val)
                if not cols: continue
                if not (prop.startswith('--') or any(k in prop for k in ('color', 'background', 'border', 'outline', 'fill', 'stroke', 'shadow', 'decoration', 'caret', 'accent'))): continue
                decls.append({'file': f.split('/')[-1], 'ctx': ' > '.join(ctx), 'sel': sel[:200], 'prop': prop, 'val': val[:160], 'cols': cols})
    return vars_, decls

if __name__ == '__main__':
    files = sorted(glob.glob('/Users/ramon/m369-recovery/scratch/v3/color/data/css-*.css'))
    files = [f for f in files if 'inline' not in f or open(f).read().count('{') > 1]
    vars_, decls = main(files)
    def resolve(c, depth=0):
        if c.startswith('var('):
            name = re.match(r'var\((--[\w-]+)', c).group(1)
            fb = c[len('var(' + name):].strip(' ,)')
            if name in vars_ and depth < 5:
                vals = sorted(vars_[name])
                r = []
                for v in vals:
                    for cc in COLOR_RE.findall(v): r.append(resolve(cc, depth + 1))
                return '|'.join(x for x in r if x) or ('var' + name)
            return to_hex(fb) if fb else name
        return to_hex(c)
    STATE = re.compile(r':(hover|focus-visible|focus-within|focus|active|disabled|checked|selection|placeholder|visited|invalid|placeholder-shown)|::(selection|placeholder|before|after|backdrop|marker)|\[aria-[\w-]+|data-\[|group-hover|peer-')
    agg = collections.defaultdict(lambda: {'n': 0, 'props': collections.Counter(), 'states': collections.Counter(), 'sels': []})
    for d in decls:
        for c in d['cols']:
            hx = resolve(c)
            if not hx: continue
            states = set(m.group(0).lstrip(':') for m in STATE.finditer(d['sel'])) or {'base'}
            for h in hx.split('|'):
                a = agg[h]; a['n'] += 1; a['props'][d['prop'] if not d['prop'].startswith('--') else 'var'] += 1
                for s in states: a['states'][s] += 1
                if len(a['sels']) < 8: a['sels'].append((d['sel'][:90] + ' {' + d['prop'] + ':' + d['val'][:60] + '}' + (' @' + d['ctx'][:40] if d['ctx'] else '')))
    rows = sorted(agg.items(), key=lambda kv: -kv[1]['n'])
    out = {'files': [f.split('/')[-1] for f in files], 'vars': {k: sorted(v) for k, v in vars_.items()}, 'colors': [{'hex': k, 'n': v['n'], 'props': dict(v['props']), 'states': dict(v['states']), 'sels': v['sels']} for k, v in rows]}
    json.dump(out, open('/Users/ramon/m369-recovery/scratch/v3/color/data/css-declared.json', 'w'), indent=1)
    # state rules of interest
    st = [d for d in decls if STATE.search(d['sel']) and not d['prop'].startswith('--')]
    json.dump(st, open('/Users/ramon/m369-recovery/scratch/v3/color/data/css-state-rules.json', 'w'), indent=1)
    if '-v' in sys.argv:
        for k, v in rows: print(k, v['n'], dict(v['props']), dict(v['states']), v['sels'][:3])
