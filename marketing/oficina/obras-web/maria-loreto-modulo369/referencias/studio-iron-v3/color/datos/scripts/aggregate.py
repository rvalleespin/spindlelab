import json, glob, collections, re, sys
D = '/Users/ramon/m369-recovery/scratch/v3/color/data/'
pages = {}
for f in sorted(glob.glob(D + '*-1440.json') + glob.glob(D + '*-390.json')):
    n = f.split('/')[-1][:-5]
    if n.startswith('cookie') or n.startswith('pixels'): continue
    pages[n] = json.load(open(f))

def lum(h):
    h = h.split('@')[0]
    r, g, b = [int(h[i:i + 2], 16) / 255 for i in (1, 3, 5)]
    f = lambda v: v / 12.92 if v <= 0.04045 else ((v + 0.055) / 1.055) ** 2.4
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)
def ratio(a, b):
    la, lb = lum(a), lum(b)
    return round((max(la, lb) + 0.05) / (min(la, lb) + 0.05), 2)

# 1. colors in use (visible only)
use = collections.defaultdict(lambda: {'count': 0, 'chars': 0, 'area': 0, 'props': collections.Counter(), 'regions': collections.Counter(), 'pages': set(), 'samples': []})
for n, d in pages.items():
    for c in d['colors']:
        if not c['visible']: continue
        u = use[c['hex']]
        u['count'] += c['count']; u['chars'] += c['chars']; u['area'] += c['area']
        u['props'][c['prop']] += c['count']
        for r, k in c['regions'].items(): u['regions'][r] += k
        u['pages'].add(n)
        for s in c['samples']:
            if len(u['samples']) < 10 and c['prop'] + ': ' + s not in u['samples']: u['samples'].append(c['prop'] + ': ' + s)
hidden = collections.defaultdict(lambda: {'count': 0, 'props': collections.Counter(), 'samples': []})
for n, d in pages.items():
    for c in d['colors']:
        if c['visible'] or c['hex'] in use: continue
        h = hidden[c['hex']]; h['count'] += c['count']; h['props'][c['prop']] += c['count']
        for s in c['samples']:
            if len(h['samples']) < 4: h['samples'].append(n + ' ' + c['prop'] + ': ' + s)

rows = sorted(use.items(), key=lambda kv: -kv[1]['count'])
print('=== COLORS IN USE (visible), all pages, 1440+390 ===')
for h, u in rows:
    print(f"{h:18} n={u['count']:5} chars={u['chars']:6} area={u['area']/1e6:8.2f}Mpx pages={len(u['pages']):2} props={dict(u['props'])} regions={dict(u['regions'])}")
    for s in u['samples'][:6]: print('      ', s[:170])
print('\n=== DECLARED ON HIDDEN ELEMENTS ONLY ===')
for h, u in sorted(hidden.items(), key=lambda kv: -kv[1]['count']):
    print(h, u['count'], dict(u['props']), u['samples'][:3])

# 2. contrast pairs
pairs = collections.defaultdict(lambda: {'chars': 0, 'count': 0, 'sizes': collections.Counter(), 'samples': [], 'pages': set(), 'decl': set(), 'op': set()})
for n, d in pages.items():
    for p in d['pairs']:
        k = (p['fg'], p['bg'], p['overImage'])
        q = pairs[k]; q['chars'] += p['chars']; q['count'] += p['count']; q['pages'].add(n); q['decl'].add(p['fgDeclared']); q['op'].add(p['opacity'])
        for s, v in p['sizes'].items(): q['sizes'][s] += v
        for s in p['samples']:
            if len(q['samples']) < 6: q['samples'].append(n + ' ' + s)
print('\n=== TEXT / BACKGROUND PAIRS (effective, composited) ===')
for (fg, bg, oi), q in sorted(pairs.items(), key=lambda kv: -kv[1]['chars']):
    r = ratio(fg, bg)
    def large(s):
        px, w = s.split('/'); px = float(px[:-2]); w = int(w)
        return px >= 24 or (px >= 18.66 and w >= 700)
    small_chars = sum(v for s, v in q['sizes'].items() if not large(s))
    verdict = 'AA' if r >= 4.5 else ('AA-large-only' if r >= 3 else 'FAIL')
    print(f"{fg} on {bg}{' OVER-IMAGE' if oi else ''}: {r}:1 {verdict} chars={q['chars']} (small-text chars={small_chars}) decl={q['decl']} op={q['op']} pages={len(q['pages'])} sizes={dict(q['sizes'].most_common(6))}")
    for s in q['samples'][:3]: print('      ', s[:150])

# 3. hover / focus
print('\n=== HOVER DIFFS (1440, real mouse) ===')
hv = collections.OrderedDict()
for n, d in pages.items():
    for h in d.get('hover', []) or []:
        sig = re.sub(r'\|\d+$', '', h['sig'])
        diff = {k: v for k, v in h['hoverDiff'].items() if 'before4' not in k}
        key = (sig[:110], json.dumps(diff, sort_keys=True)[:400])
        if key not in hv: hv[key] = (n, h['txt'], diff, (h['before'] or {}).get('tr'))
for (sig, _), (n, txt, diff, tr) in hv.items():
    if diff: print(f"[{n}] {sig} «{txt[:30]}» tr={tr}\n      {json.dumps(diff)[:600]}")
print('\n=== FOCUS (forced :focus-visible) unique outlines ===')
fo = collections.Counter()
for n, d in pages.items():
    for h in d.get('hover', []) or []:
        o = h['focusDiff'].get('self.outline')
        reg = 'footer' if '|F|' in h['sig'] else ('header' if '|H|' in h['sig'] else 'main')
        if o: fo[(o[1], reg)] += 1
for k, v in fo.most_common(): print(v, k)

# 4. misc
print('\n=== PAGE META ===')
for n, d in pages.items():
    print(n, 'html', d['htmlBg'], 'body', d['bodyBg'], d['bodyColor'], 'sel', d['selection'], 'theme', d['theme'], 'imgs', d['imgCount'])
    for k, v in d['imgBgs'].items(): print('    ', v, k)
json.dump({'use': {h: {**u, 'props': dict(u['props']), 'regions': dict(u['regions']), 'pages': sorted(u['pages'])} for h, u in rows},
           'pairs': [{'fg': k[0], 'bg': k[1], 'overImage': k[2], 'ratio': ratio(k[0], k[1]), 'chars': q['chars'], 'sizes': dict(q['sizes']), 'pages': sorted(q['pages']), 'samples': q['samples'], 'declared': sorted(q['decl']), 'opacity': sorted(q['op'])} for k, q in pairs.items()]},
          open(D + 'aggregate.json', 'w'), indent=1)
