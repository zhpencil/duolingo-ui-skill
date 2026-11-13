#!/usr/bin/env python3
"""Summarize a saved Figma get_file JSON: compact tree with ids, sizes, text,
fills, radii, effects, auto-layout. Usage:
  python tools/figma_dump.py FILE.json [--id 1:2] [--depth N] [--text]
"""
import json, sys, argparse

def hexc(c, a=None):
    if not c: return '?'
    r, g, b = round(c.get('r',0)*255), round(c.get('g',0)*255), round(c.get('b',0)*255)
    alpha = a if a is not None else c.get('a',1)
    s = f'#{r:02x}{g:02x}{b:02x}'
    if alpha < 1: s += f'/{alpha:.2f}'
    return s

def solid(fills):
    out=[]
    for f in fills or []:
        if f.get('visible') is False: continue
        if f.get('type')=='SOLID':
            out.append(hexc(f.get('color')))
        elif f.get('type','').startswith('GRADIENT'):
            stops=', '.join(hexc(s.get('color')) for s in f.get('gradientStops',[]))
            out.append(f"{f['type']}({stops})")
        elif f.get('type')=='IMAGE':
            out.append('IMAGE')
    return out

def effects(effs):
    out=[]
    for e in effs or []:
        if e.get('visible') is False: continue
        c=hexc(e.get('color',{}))
        out.append(f"{e.get('type')} {e.get('radius','')} {c} off={e.get('offset',{})}")
    return out

def dump(n, depth, maxdepth, showtext=True):
    t=n.get('type','')
    box=n.get('absoluteBoundingBox') or {}
    w,h=box.get('width'),box.get('height')
    line=f"{t} {n.get('id','')} \"{n.get('name','')}\""
    if t!='DOCUMENT' and t!='CANVAS':
        line+=f" {w:.1f}x{h:.1f}" if isinstance(w,(int,float)) else ''
    if n.get('cornerRadius'): line+=f" r={n['cornerRadius']}"
    if n.get('rectangleCornerRadii'): line+=f" radii={n['rectangleCornerRadii']}"
    if n.get('layoutMode'): line+=f" layout={n['layoutMode']}"
    pad=[n.get(k,0) for k in ('paddingTop','paddingRight','paddingBottom','paddingLeft')]
    if any(pad): line+=f" pad={pad}"
    if n.get('itemSpacing'): line+=f" gap={n['itemSpacing']}"
    if n.get('strokes'):
        s=[x for x in solid(n['strokes'])]
        if s: line+=f" stroke={s} w={n.get('strokeWeight')}"
    f=solid(n.get('fills'))
    if f: line+=f" fill={f}"
    bg=n.get('backgroundColor')
    if bg and t in ('CANVAS','FRAME','SECTION') and not f:
        line+=f" bg={hexc(bg)}"
    ef=effects(n.get('effects'))
    if ef: line+=f" fx=[{' ; '.join(ef)}]"
    if t=='TEXT':
        st=n.get('style',{})
        line+=f" text={n.get('characters','')!r} font={st.get('fontFamily')} {st.get('fontWeight')} {st.get('fontSize')} lh={st.get('lineHeightPx')} ls={st.get('letterSpacing')}"
    print('  '*depth + line)
    if depth>=maxdepth: return
    for c in n.get('children',[]):
        dump(c, depth+1, maxdepth, showtext)

def find(n, nid):
    if n.get('id')==nid: return n
    for c in n.get('children',[]):
        r=find(c,nid)
        if r: return r

def main():
    ap=argparse.ArgumentParser()
    ap.add_argument('file')
    ap.add_argument('--id')
    ap.add_argument('--depth', type=int, default=99)
    ap.add_argument('--maxdepth', type=int, default=None)
    args=ap.parse_args()
    data=json.load(open(args.file,encoding='utf-8'))
    root=data.get('file',data).get('document',data.get('document'))
    node=find(root,args.id) if args.id else root
    dump(node,0,args.maxdepth if args.maxdepth is not None else args.depth)

if __name__=='__main__':
    main()
